import { mkdir, rm, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, posts, redirects, categories } from '../content/site.mjs';
import { pages } from '../content/pages.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const stripHtml = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const absUrl = route => new URL(route.replace(/^\//, ''), `${site.baseUrl}/`).toString();
const postUrl = post => `/${post.slug}/`;
const catBySlug = Object.fromEntries(categories.map(c => [c.slug, c]));
const catByName = Object.fromEntries(categories.map(c => [c.name, c]));
const catUrl = cat => `/topics/${cat.slug}/`;
const hasHub = cat => cat && posts.filter(p => p.category === cat.name).length >= 2;
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('</', '<\\/')}</script>`;
const utilityRoutes = ['/archives/', '/tags/', '/sitemap/'];
const publishedRoutes = [];
const OG_IMAGE = absUrl('/assets/og-default.png');
const wordCount = html => stripHtml(html).replace(/\s/g, '').length;

const logoSvg = `<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="8" fill="#0f6b57"/><path d="M9 17.5l4.5 4.5L23 12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="23.5" cy="9" r="2.5" fill="#e2a23b"/></svg>`;
const icon = {
  check: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>',
  doc: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3h7l4 4v10H5z"/><path d="M12 3v4h4"/></svg>',
  shield: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 2l6 2.5V10c0 4-3 6.5-6 8-3-1.5-6-4-6-8V4.5z"/></svg>',
};

const orgSchema = { '@type': 'Organization', '@id': absUrl('/#org'), name: site.author, url: absUrl('/'), logo: { '@type': 'ImageObject', url: absUrl('/assets/icon-512.png') } };
const siteSchema = { '@type': 'WebSite', '@id': absUrl('/#website'), name: site.title, alternateName: site.tagline, url: absUrl('/'), inLanguage: 'zh-CN', publisher: { '@id': absUrl('/#org') } };

function ctaUrl(product, article, position) {
  const url = new URL(site.products[product].url);
  url.searchParams.set('utm_source', site.domain);
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'chatgpt_plus_guide');
  url.searchParams.set('utm_content', `${article}__${position}`);
  return url.href;
}
function ctaLink(product, article, position, className = 'button primary') {
  return `<a class="${className}" data-cta="${position}" data-product="${product}" href="${esc(ctaUrl(product, article, position))}" target="_blank" rel="noopener sponsored">${esc(site.products[product].label)}</a>`;
}
function articleHtml(post) {
  const midIndex = post.showCta === false ? -1 : Math.min(3, post.sections.length - 2);
  return post.sections.map((s, i) => {
    const block = `<section class="article-section" id="section-${i + 1}"><h2>${esc(s.h2)}</h2>${s.html}</section>`;
    if (i !== midIndex || !post.midCta) return block;
    return `${block}<aside class="inline-cta"><p>${post.midCta}</p>${ctaLink(post.product || 'plus', post.slug, 'article_mid', 'button')}</aside>`;
  }).join('\n');
}
function relatedPosts(post, n = 4) {
  const explicit = new Set(post.sections.flatMap(s => [...s.html.matchAll(/href="\/([^/]+)\/"/g)].map(m => m[1])));
  return posts.filter(p => p.slug !== post.slug && !explicit.has(p.slug))
    .map(p => ({ post: p, score: p.tags.filter(t => post.tags.includes(t)).length + (p.category === post.category ? 2 : 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.updated.localeCompare(a.post.updated))
    .slice(0, n).map(x => x.post);
}

function header(route) {
  return `<header class="site-header"><div class="header-inner">
<a class="brand" href="/" aria-label="${esc(site.title)} 首页">${logoSvg}<span>${esc(site.title)}<small>${esc(site.tagline)}</small></span></a>
<nav class="nav" aria-label="主导航">${site.nav.map(n => `<a href="${n.href}"${route === n.href ? ' class="active" aria-current="page"' : ''}>${esc(n.label)}</a>`).join('')}</nav>
<div class="header-cta">${ctaLink('recharge', 'header', 'header_recharge', 'button accent')}</div>
</div></header>`;
}
function footer() {
  const hubs = categories.filter(hasHub);
  return `<footer class="site-footer"><div class="footer-inner">
<div><a class="brand" href="/">${logoSvg}<span>${esc(site.title)}</span></a><p>面向中国大陆用户的 ChatGPT 订阅参考站：开通、付款排查、套餐选择、取消与退款。资料按 OpenAI 帮助中心核验，更新日期标注在每篇文章里。</p><p>本站为 GoPlus 提供商业导流，与 OpenAI 无隶属关系。购买入口跳转至第三方服务，条件与售后以商家页面为准。</p></div>
<div><h3>专题</h3><ul>${hubs.map(c => `<li><a href="${catUrl(c)}">${esc(c.title)}</a></li>`).join('')}</ul></div>
<div><h3>本站</h3><ul>${pages.map(p => `<li><a href="/${p.slug}/">${esc(p.title)}</a></li>`).join('')}<li><a href="/archives/">全部文章</a></li><li><a href="/sitemap/">站点地图</a></li></ul></div>
</div><div class="footer-bottom">© ${new Date().getFullYear()} ${esc(site.author)} · 最近更新 ${site.updated} · 内容仅供参考，价格、地区与入口以官方最新说明为准。</div></footer>`;
}

function layout({ title, seoTitle, description = site.description, route = '/', body, toc = '', type = 'website', structuredData = [], noindex = false, canonical = true, article = 'home', image = OG_IMAGE, extraHead = '' }) {
  const pageTitle = seoTitle || (route === '/' ? `${site.title}：${site.tagline}` : `${title} | ${site.shortName}`);
  const canonicalUrl = absUrl(route);
  const analytics = site.googleAnalyticsId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.googleAnalyticsId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(site.googleAnalyticsId)},{page_location:location.origin+location.pathname,page_referrer:document.referrer?document.referrer.split('?')[0].split('#')[0]:''});</script>` : '';
  const verification = [
    site.googleSiteVerification && `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">`,
    site.bingSiteVerification && `<meta name="msvalidate.01" content="${esc(site.bingSiteVerification)}">`,
    site.baiduSiteVerification && `<meta name="baidu-site-verification" content="${esc(site.baiduSiteVerification)}">`,
  ].filter(Boolean).join('\n');
  const graph = [orgSchema, siteSchema, ...structuredData];
  return `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large'}">
${canonical ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
<meta name="theme-color" content="#0f6b57" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#111615" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/icon-512.png">
<meta property="og:site_name" content="${esc(site.title)}"><meta property="og:locale" content="zh_CN"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(pageTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${esc(image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
${canonical ? `<meta property="og:url" content="${canonicalUrl}">` : ''}
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(pageTitle)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(image)}">
${verification}
${extraHead}
${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}
<link rel="stylesheet" href="/assets/style.css"><script defer src="/assets/main.js"></script>
${analytics}
</head><body class="${toc ? 'has-toc' : 'no-toc'}" data-article="${esc(article)}">
<a href="#main" class="skip-link">跳到正文</a>
${header(route)}
<main id="main" class="main">${body}</main>
${footer()}
</body></html>`;
}

function postCard(post, tag = 'h3') {
  return `<article class="post-card"><${tag}><a href="${postUrl(post)}">${esc(post.title)}</a></${tag}><div class="meta">更新于 <time datetime="${post.updated}">${post.updated}</time> · ${esc(post.category)}</div><p>${esc(post.description)}</p></article>`;
}

function home() {
  const featured = ['chatgpt-plus', 'chatgpt-plus-recharge-2026-alipay-wechat', 'without-credit-card', 'chatgpt-payment-declined', 'plus-vs-pro', 'chatgpt-plus-cancel-manage'];
  const latest = [...posts].sort((a, b) => b.updated.localeCompare(a.updated)).filter(p => !featured.includes(p.slug)).slice(0, 6);
  const hubs = categories.map(c => ({ cat: c, items: posts.filter(p => p.category === c.name) })).filter(x => x.items.length >= 2);
  const faqSchema = { '@type': 'FAQPage', mainEntity: site.homeFaq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return layout({ title: site.title, description: site.description, route: '/', structuredData: [faqSchema], body: `
<div class="wrap">
<section class="hero">
  <p class="eyebrow">面向中国大陆用户 · 资料核验于 ${site.updated}</p>
  <h1>ChatGPT Plus 怎么开通、怎么付款？<br>从你的问题开始</h1>
  <p class="hero-lede">开通条件、微信支付宝的真实情况、付款失败排查、Plus 和 Pro 怎么选、取消与退款。每篇先给结论，再按情况给步骤；价格与地区一律以 OpenAI 官方说明为准。</p>
  <div class="hero-actions"><a class="button primary" href="/chatgpt-plus/">从开通指南开始</a><a class="button" href="/chatgpt-payment-declined/">付款失败了</a>${ctaLink('recharge', 'home', 'hero_recharge', 'button accent')}</div>
  <ul class="trust-strip"><li>${icon.check}${posts.length} 篇专题文章</li><li>${icon.doc}按 OpenAI 帮助中心核验</li><li>${icon.shield}商业关系公开披露</li></ul>
</section>

<section class="section" id="intents"><div class="section-head"><div><h2>按问题找答案</h2><p>点进去先看「关键结论」，再决定要不要读全文。</p></div></div>
<div class="intent-grid">${site.intents.map(([q, a, slug]) => `<a class="intent-card" href="/${slug}/"><span class="q">${esc(q)}</span><span class="a">${esc(a)}</span><span class="go">查看答案 →</span></a>`).join('')}</div></section>

<section class="section" id="topics"><div class="section-head"><div><h2>按专题浏览</h2><p>每个专题有一篇入口页，把这一类问题的处理顺序讲清楚。</p></div></div>
<div class="hub-grid">${hubs.map(({ cat, items }) => `<div class="hub-card"><h3><a href="${catUrl(cat)}">${esc(cat.title)}</a> <span class="count">${items.length} 篇</span></h3><p>${esc(cat.description)}</p><ul>${items.slice(0, 4).map(p => `<li><a href="${postUrl(p)}">${esc(p.title)}</a></li>`).join('')}</ul></div>`).join('')}</div></section>

<section class="section" id="featured"><div class="section-head"><div><h2>核心教程</h2></div><a class="more" href="/archives/">全部 ${posts.length} 篇 →</a></div>
<div class="post-list">${featured.map(slug => postCard(posts.find(p => p.slug === slug))).join('')}</div></section>

<section class="section" id="latest"><div class="section-head"><div><h2>最近更新</h2></div></div>
<div class="post-list">${latest.map(p => postCard(p)).join('')}</div></section>

<section class="section home-faq" id="faq"><div class="section-head"><div><h2>先回答五个最常问的</h2><p>完整的 30 条见<a href="/faq/">常见问题</a>。</p></div></div>
<dl>${site.homeFaq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</dl></section>

<section class="section"><div class="final-cta"><h2>已经确认条件、只差一个付款方式？</h2><p>GoPlus 提供第三方代充服务，支持微信 / 支付宝。购买前请确认账号信息要求、实际价格与售后；提交 Session 可能涉及账号访问风险，详见<a href="/chatgpt-plus-account-safety/">账号安全说明</a>。</p><div class="actions">${ctaLink('recharge', 'home', 'bottom_recharge', 'button accent')}${ctaLink('plus', 'home', 'product', 'button')}${ctaLink('pro', 'home', 'product_pro', 'button ghost')}</div></div></section>
</div>` });
}

function renderPost(post) {
  const cat = hasHub(catByName[post.category]) ? catByName[post.category] : null;
  const content = articleHtml(post);
  const url = absUrl(postUrl(post));
  const schema = [
    { '@type': 'Article', '@id': `${url}#article`, headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updated, author: { '@id': absUrl('/#org') }, publisher: { '@id': absUrl('/#org') }, mainEntityOfPage: url, url, image: OG_IMAGE, articleSection: post.category, keywords: post.tags.join(','), wordCount: wordCount(content), inLanguage: 'zh-CN', isPartOf: { '@id': absUrl('/#website') } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: absUrl('/') },
      ...(cat ? [{ '@type': 'ListItem', position: 2, name: cat.name, item: absUrl(catUrl(cat)) }] : []),
      { '@type': 'ListItem', position: cat ? 3 : 2, name: post.title, item: url },
    ] },
  ];
  if (post.faq?.length) schema.push({ '@type': 'FAQPage', mainEntity: post.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripHtml(a) } })) });
  if (post.howto?.steps?.length) schema.push({ '@type': 'HowTo', name: post.howto.name || post.title, description: post.description, step: post.howto.steps.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })) });

  const tocItems = [...post.sections.map((s, i) => [`#section-${i + 1}`, s.h2]), ...(post.faq?.length ? [['#faq', post.faqHeading || '常见追问']] : []), ...(post.changelog?.length ? [['#changelog', '更新记录']] : [])];
  const tocLinks = tocItems.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join('');
  const topPromo = `<aside class="top-promo" aria-label="推荐服务"><span class="top-promo-text"><strong>没有海外卡、不想折腾？</strong>GoPlus 提供 ChatGPT Plus / Pro 代充，微信、支付宝付款，官网 ${ctaLink('site', post.slug, 'article_top_site', 'top-promo-link')}</span>${ctaLink('recharge', post.slug, 'article_top_recharge', 'button accent small')}</aside>`;
  const keyPoints = post.summary?.length ? `<aside class="key-points" aria-label="关键结论"><h2>关键结论</h2><ol>${post.summary.map(s => `<li>${esc(s)}</li>`).join('')}</ol></aside>` : '';
  const faqBlock = post.faq?.length ? `<section class="article-section faq-block" id="faq"><h2>${esc(post.faqHeading || '常见追问')}</h2><dl>${post.faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${a}</dd>`).join('')}</dl></section>` : '';
  const changelog = post.changelog?.length ? `<section class="article-section changelog" id="changelog"><h2>更新记录</h2><ul>${post.changelog.map(([d, t]) => `<li><time datetime="${esc(d)}">${esc(d)}</time>：${esc(t)}</li>`).join('')}</ul></section>` : '';
  const sources = post.sources?.length ? `<section class="sources"><h2>资料来源与核验</h2><p>资料核验于 ${post.checkedAt}。价格、地区与入口可能变化，请同时查看原始说明。</p><ul>${post.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></li>`).join('')}</ul></section>` : '';
  const authorBox = `<aside class="author-box"><div class="avatar" aria-hidden="true">百</div><div><strong>${esc(site.author)}</strong><p>整理 ChatGPT 订阅相关的官方规则与常见问题，每篇标注核验日期与来源。不代表 OpenAI，不承诺任何第三方服务的结果。<a href="/editorial/">核验与更新原则</a> · <a href="/about/">商业关系披露</a></p></div></aside>`;
  const related = relatedPosts(post);
  const finalCta = post.showCta === false ? '' : `<section class="final-cta"><h2>${post.product === 'pro' ? '需要了解 Pro 的第三方交付？' : '没有海外卡、想比较第三方购买条件？'}</h2><p>以下入口前往 GoPlus 第三方服务，支持微信 / 支付宝。购买前确认账号信息要求、实际价格与售后；提交 Session 可能涉及账号访问风险，详见<a href="/chatgpt-plus-account-safety/">账号安全说明</a>。</p><div class="actions">${ctaLink('recharge', post.slug, 'article_end_recharge', 'button accent')}${ctaLink(post.product || 'plus', post.slug, 'article_end', 'button')}</div></section>`;
  const readingMinutes = Math.max(1, Math.ceil(wordCount(content) / 400));

  return layout({ title: post.title, seoTitle: post.seoTitle || post.title, description: post.description, route: postUrl(post), type: 'article', article: post.slug, noindex: post.noindex === true, structuredData: schema, toc: tocLinks,
    extraHead: `<meta property="article:published_time" content="${post.date}"><meta property="article:modified_time" content="${post.updated}"><meta property="article:section" content="${esc(post.category)}">`,
    body: `<div class="wrap"><div class="article-layout${tocLinks ? ' has-toc' : ''}">
<article class="article">
<nav class="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span aria-hidden="true">/</span>${cat ? `<a href="${catUrl(cat)}">${esc(cat.name)}</a><span aria-hidden="true">/</span>` : ''}<span aria-current="page">${esc(post.title)}</span></nav>
<header class="article-header">${cat ? `<a class="category" href="${catUrl(cat)}">${esc(cat.name)}</a>` : ''}<h1>${esc(post.title)}</h1><p class="meta"><span>更新于 <time datetime="${post.updated}">${post.updated}</time></span><span>发表于 <time datetime="${post.date}">${post.date}</time></span><span>阅读约 ${readingMinutes} 分钟</span>${post.checkedAt ? `<span>资料核验 ${post.checkedAt}</span>` : ''}<span>作者：<a href="/about/">${esc(site.author)}</a></span></p></header>
${topPromo}
${keyPoints}
<details class="mobile-toc"><summary>本篇目录</summary><nav>${tocLinks}</nav></details>
${content}${faqBlock}${changelog}${sources}${authorBox}${finalCta}
${related.length ? `<section class="related"><h2>继续阅读</h2><div class="post-list">${related.map(p => postCard(p)).join('')}</div></section>` : ''}
</article>
${tocLinks ? `<aside class="toc" aria-label="文章目录"><h2>本篇目录</h2><nav>${tocLinks}</nav>${post.showCta === false ? '' : `<div class="toc-cta">${ctaLink('recharge', post.slug, 'toc_recharge', 'button accent')}</div>`}</aside>` : ''}
</div></div>` });
}

function categoryPage(cat) {
  const items = posts.filter(p => p.category === cat.name).sort((a, b) => b.updated.localeCompare(a.updated));
  const route = catUrl(cat);
  const schema = [
    { '@type': 'CollectionPage', name: cat.title, description: cat.description, url: absUrl(route), isPartOf: { '@id': absUrl('/#website') }, hasPart: items.map(p => ({ '@type': 'Article', headline: p.title, url: absUrl(postUrl(p)) })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: '首页', item: absUrl('/') }, { '@type': 'ListItem', position: 2, name: cat.name, item: absUrl(route) }] },
  ];
  return layout({ title: cat.title, description: cat.description, route, article: `topic:${cat.slug}`, structuredData: schema, body: `<div class="wrap">
<header class="hub-header"><nav class="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span aria-hidden="true">/</span><span aria-current="page">${esc(cat.name)}</span></nav><h1>${esc(cat.title)}</h1><p>${esc(cat.intro)}</p></header>
<div class="hub-body"><div class="post-list">${items.map(p => postCard(p, 'h2')).join('')}</div></div></div>` });
}

function utilityPage(route) {
  let title, body;
  if (route === '/archives/') { title = '全部文章'; body = [...posts].sort((a, b) => b.updated.localeCompare(a.updated)).map(p => `<div class="archive-row"><time datetime="${p.updated}">${p.updated}</time><a href="${postUrl(p)}">${esc(p.title)}</a></div>`).join(''); }
  else if (route === '/tags/') {
    title = '标签';
    const groups = new Map();
    for (const p of posts) for (const term of p.tags) groups.set(term, [...(groups.get(term) || []), p]);
    body = [...groups].sort((a, b) => b[1].length - a[1].length).map(([term, items]) => `<section class="term" id="${esc(term)}"><h2>${esc(term)}</h2>${items.map(p => `<p><a href="${postUrl(p)}">${esc(p.title)}</a></p>`).join('')}</section>`).join('');
  } else { title = '站点地图'; body = `<ul><li><a href="/">首页</a></li>${categories.filter(hasHub).map(c => `<li><a href="${catUrl(c)}">${esc(c.title)}</a></li>`).join('')}${[...posts, ...pages].map(p => `<li><a href="/${p.slug}/">${esc(p.title)}</a></li>`).join('')}</ul>`; }
  return layout({ title, route, noindex: true, article: 'navigation', body: `<div class="wrap"><section class="page"><h1>${title}</h1>${body}</section></div>` });
}

function portableHtml(route, html) {
  const depth = route.split('/').filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  return html.replaceAll('href="/', `href="${prefix}`).replaceAll('src="/', `src="${prefix}`);
}
async function writePage(route, html, updated, indexable = true) {
  const dir = path.join(outDir, route.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), portableHtml(route, html));
  if (indexable) publishedRoutes.push({ route, updated });
}
async function writeRedirect(slug, target, oldTitle) {
  const targetUrl = absUrl(target);
  const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>页面已合并：${esc(oldTitle)} | ${esc(site.shortName)}</title>
<meta name="robots" content="noindex, follow">
<meta name="description" content="${esc(oldTitle)}已合并到新的页面，正在跳转。">
<meta http-equiv="refresh" content="0; url=${esc(targetUrl)}">
<link rel="canonical" href="${esc(targetUrl)}">
</head><body><main><h1>页面已合并：${esc(oldTitle)}</h1><p>这篇内容已并入新的页面。如果没有自动跳转，请点击<a href="${esc(targetUrl)}">前往新地址</a>。</p></main></body></html>`;
  const dir = path.join(outDir, slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

async function main() {
  const allSlugs = [...posts, ...pages].map(p => p.slug);
  if (new Set(allSlugs).size !== allSlugs.length) throw new Error('Duplicate page slug');
  for (const post of posts) {
    if (!post.sections?.length) throw new Error(`Missing sections: ${post.slug}`);
    if (!site.products[post.product]) throw new Error(`Unknown product: ${post.slug}`);
    if (!catByName[post.category]) throw new Error(`Unknown category "${post.category}" in ${post.slug}`);
  }
  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, 'assets'), { recursive: true });
  for (const file of ['style.css', 'main.js', 'favicon.svg', 'og-default.png', 'icon-512.png']) await copyFile(path.join(root, 'src', file), path.join(outDir, 'assets', file));
  await writePage('/', home(), site.updated);
  for (const p of posts) await writePage(postUrl(p), renderPost(p), p.updated, !p.noindex);
  for (const c of categories) if (hasHub(c)) await writePage(catUrl(c), categoryPage(c), posts.filter(p => p.category === c.name).map(p => p.updated).sort().at(-1));
  for (const p of pages) await writePage(`/${p.slug}/`, layout({ title: p.title, description: p.description, route: `/${p.slug}/`, article: p.slug, body: `<div class="wrap"><section class="page"><h1>${esc(p.title)}</h1>${p.html}</section></div>` }), p.updated);
  for (const [slug, { target, title }] of redirects) await writeRedirect(slug, target, title);
  for (const route of utilityRoutes) await writePage(route, utilityPage(route), site.updated, false);
  const notFound = layout({ title: '页面不存在', description: '此页面不存在，请回到指南首页。', route: '/404.html', canonical: false, noindex: true, article: '404', body: '<div class="wrap"><section class="page not-found"><h1>页面不存在</h1><p>请检查网址，或从首页按问题找答案。</p><a class="button primary" href="/">返回首页</a></section></div>' });
  await writeFile(path.join(outDir, '404.html'), notFound.replaceAll('href="/', `href="${site.baseUrl}/`).replaceAll('src="/', `src="${site.baseUrl}/`));
  await writeFile(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publishedRoutes.map(({ route, updated }) => `  <url><loc>${absUrl(route)}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absUrl('/sitemap.xml')}\n`);
  if (site.customDomainReady) await writeFile(path.join(outDir, 'CNAME'), `${site.customDomain}\n`);
  await writeFile(path.join(outDir, '.nojekyll'), '');
  console.log(`Built ${publishedRoutes.length} indexable pages (${posts.length} articles), ${redirects.size} redirects and ${utilityRoutes.length} navigation pages → ${site.baseUrl}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
