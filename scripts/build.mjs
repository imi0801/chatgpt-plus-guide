import { mkdir, rm, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, posts } from '../content/site.mjs';
import { pages } from '../content/pages.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const stripHtml = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const absUrl = route => new URL(route.replace(/^\//, ''), `${site.baseUrl}/`).toString();
const postUrl = post => `/${post.slug}/`;
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('</', '<\\/')}</script>`;
const utilityRoutes = ['/archives/', '/tags/', '/categories/', '/sitemap/'];
const publishedRoutes = [];

function ctaUrl(product, article, position) {
  const url = new URL(site.products[product].url);
  url.searchParams.set('utm_source', 'github_pages');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'chatgpt_plus_guide');
  url.searchParams.set('utm_content', `${article}__${position}`);
  return url.href;
}
function ctaLink(product, article, position, className = 'button primary') {
  return `<a class="${className}" data-cta="${position}" data-product="${product}" href="${esc(ctaUrl(product, article, position))}" target="_blank" rel="noopener sponsored">${esc(site.products[product].label)}</a>`;
}
function articleHtml(post) {
  return post.sections.map((s, i) => `<section class="article-section" id="section-${i + 1}"><h2>${esc(s.h2)}</h2>${s.html}</section>`).join('\n');
}
function relatedPosts(post) {
  const explicit = new Set(post.sections.flatMap(s => [...s.html.matchAll(/href="\/([^/]+)\/"/g)].map(m => m[1])));
  return posts.filter(p => p.slug !== post.slug && !explicit.has(p.slug)).map(p => ({ post: p, score: p.tags.filter(t => post.tags.includes(t)).length + (p.category === post.category ? 2 : 0) })).filter(x => x.score > 0).sort((a,b) => b.score-a.score || b.post.updated.localeCompare(a.post.updated)).slice(0,3).map(x => x.post);
}
function layout({ title, seoTitle, description = site.description, route = '/', body, toc = '', type = 'website', structuredData = [], noindex = false, canonical = true, article = 'home' }) {
  const pageTitle = seoTitle || (route === '/' ? title : `${title} | ${site.shortName}`);
  const canonicalUrl = absUrl(route);
  const analytics = site.googleAnalyticsId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.googleAnalyticsId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(site.googleAnalyticsId)},{page_location:location.origin+location.pathname,page_referrer:document.referrer?document.referrer.split('?')[0].split('#')[0]:''});</script>` : '';
  return `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title><meta name="description" content="${esc(description)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${canonical ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
<meta property="og:type" content="${type}"><meta property="og:title" content="${esc(pageTitle)}"><meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${canonicalUrl}">` : ''}
<meta name="twitter:card" content="summary">
${site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">` : ''}
${structuredData.map(jsonLd).join('\n')}
${analytics}
<link rel="stylesheet" href="/assets/style.css"><script defer src="/assets/main.js"></script>
</head><body class="${toc ? 'has-toc' : 'no-toc'}" data-article="${esc(article)}">
<a href="#main" class="skip-link">跳到正文</a>
<aside class="sidebar"><a class="brand" href="/"><span class="brand-title">${esc(site.title)}</span><span class="brand-subtitle">开通步骤 · 支付排查 · 订阅管理</span></a>
<nav class="nav" aria-label="主导航">${site.nav.map(n => `<a href="${n.href}"${route === n.href ? ' class="active" aria-current="page"' : ''}>${esc(n.label)}</a>`).join('')}</nav>
<section class="profile"><strong>${esc(site.author)}</strong><p>先核对条件，再选择购买渠道。</p><a href="/about/">关于本站与商业关系</a></section></aside>
<main id="main" class="main">${body}
<footer class="site-footer"><p>本站为 GoPlus 提供商业导流，与 OpenAI 无隶属关系。官方规则与第三方服务条件分别说明。</p><nav aria-label="页脚">${pages.map(p=>`<a href="/${p.slug}/">${esc(p.title)}</a>`).join('')}<a href="/archives/">全部文章</a><a href="/sitemap/">站点地图</a></nav></footer></main>
${toc ? `<aside class="toc" aria-label="文章目录"><h2>文章目录</h2>${toc}</aside>` : ''}
</body></html>`;
}
function postCard(post) {
  return `<article class="post-card"><h2><a href="${postUrl(post)}">${esc(post.title)}</a></h2><div class="meta">更新于 ${post.updated} · ${esc(post.category)}</div><p>${esc(post.description)}</p></article>`;
}
function home() {
  const featured = ['chatgpt-plus', 'chatgpt-plus-recharge-2026-alipay-wechat', 'chatgpt-payment-declined', 'plus-vs-pro', 'chatgpt-plus-cancel-manage'];
  const routes = [
    ['第一次开通', '先了解地区、账号与购买条件', 'chatgpt-plus'],
    ['想用微信或支付宝', '核对商家流程、费用与资料要求', 'chatgpt-plus-recharge-2026-alipay-wechat'],
    ['付款失败或未到账', '按错误和扣款状态找到下一步', 'chatgpt-payment-declined'],
    ['比较 Plus 和 Pro', '查看价格、额度和升级判断', 'plus-vs-pro'],
  ];
  return layout({title:site.title, description:site.description, structuredData:[{'@context':'https://schema.org','@type':'WebSite',name:site.title,url:absUrl('/'),inLanguage:'zh-CN'}],body:`
<section class="hero"><p class="eyebrow">ChatGPT 订阅指南</p><h1>ChatGPT Plus 怎么开通？<br>从你的问题开始</h1>
<div class="hero-recharge"><div><strong>GoPlus 自助充值入口</strong><p>微信 / 支付宝付款，前往小店选择套餐并下单。</p></div>${ctaLink('recharge','home','hero_recharge','button primary recharge-button')}</div>
<p>查看购买条件、充值流程和支付排查。先弄清费用、账号信息要求与后续管理，再决定是否订阅。</p><div class="route-grid">${routes.map(([title,desc,slug])=>`<a class="route-card" href="/${slug}/"><strong>${title}</strong><span>${desc}</span></a>`).join('')}</div></section>
<section class="content-section"><h2>购买前先核对</h2><p>官方支持地区、付款条件和第三方交付是不同的事项。第三方充值不会改变官方地区限制；需要提交的 Session 可能包含敏感会话凭据。</p><p><a href="/chatgpt-plus-domestic-payment-2026/">比较购买渠道</a> · <a href="/chatgpt-plus-account-safety/">了解账号信息风险</a></p></section>
<section class="content-section"><h2>核心教程</h2>${featured.map(slug=>postCard(posts.find(p=>p.slug===slug))).join('')}<a href="/archives/">浏览全部文章</a></section>
<section class="content-section"><h2>已确定需要购买？</h2><p>前往 GoPlus 查看第三方报价、库存和交付条件。Plus 可查看自助购买条件，Pro 先咨询具体档位。</p><div class="hero-actions">${ctaLink('plus','home','product')}${ctaLink('pro','home','product','button')}</div></section>`});
}
function renderPost(post) {
  const sections = post.sections;
  const content = articleHtml(post);
  const schema = [
    {'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.description,datePublished:post.date,dateModified:post.updated,author:{'@type':'Organization',name:site.author,url:absUrl('/about/')},publisher:{'@type':'Organization',name:site.author,url:absUrl('/about/')},mainEntityOfPage:absUrl(postUrl(post)),url:absUrl(postUrl(post)),articleSection:post.category,inLanguage:'zh-CN'},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'首页',item:absUrl('/')},{'@type':'ListItem',position:2,name:post.title,item:absUrl(postUrl(post))}]}
  ];
  const sources = post.sources?.length ? `<section class="sources"><h2>资料来源与核验</h2><p>资料核验于 ${post.checkedAt}。价格、地区与入口可能变化，请同时查看原始说明。</p><ul>${post.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></li>`).join('')}</ul></section>` : '';
  const related = relatedPosts(post);
  return layout({title:post.title,seoTitle:post.seoTitle,description:post.description,route:postUrl(post),type:'article',article:post.slug,noindex:post.noindex===true,structuredData:schema,toc:sections.map((s,i)=>`<a href="#section-${i+1}">${esc(s.h2)}</a>`).join(''),body:`<article class="article">
<nav class="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span aria-hidden="true"> / </span><span>${esc(post.title)}</span></nav>
<header class="article-header"><h1>${esc(post.title)}</h1><p class="meta">发表于 ${post.date} · 更新于 ${post.updated} · ${esc(post.category)} · 阅读约 ${Math.max(1,Math.ceil(stripHtml(content).length/450))} 分钟</p><p class="meta">作者：<a href="/about/">${esc(site.author)}</a>${post.checkedAt ? ` · 资料核验：${post.checkedAt}` : ''}</p></header>
<details class="mobile-toc"><summary>本篇目录</summary><nav>${sections.map((s,i)=>`<a href="#section-${i+1}">${esc(s.h2)}</a>`).join('')}</nav></details>
${content}${sources}
${post.showCta === false ? '' : `<section class="final-cta"><h2>${post.product==='pro'?'需要了解 Pro 交付？':'需要比较 Plus 购买条件？'}</h2><p>以下入口前往 GoPlus 第三方服务。购买前确认账号信息要求、实际价格与售后；提交 Session 可能涉及账号访问风险。</p>${ctaLink(post.product || 'plus',post.slug,'article_end')}</section>`}
${related.length ? `<section class="related"><h2>继续阅读</h2>${related.map(postCard).join('')}</section>`:''}</article>`});
}
function utilityPage(route) {
  let title, body;
  if(route==='/archives/') {title='全部文章';body=posts.map(p=>`<div class="archive-row"><time>${p.updated}</time><a href="${postUrl(p)}">${esc(p.title)}</a></div>`).join('');}
  else if(route==='/tags/' || route==='/categories/') {
    title=route==='/tags/'?'标签':'分类';
    const groups=new Map();
    for(const p of posts) for(const term of route==='/tags/'?p.tags:[p.category]) groups.set(term,[...(groups.get(term)||[]),p]);
    body=[...groups].map(([term,items])=>`<section class="term" id="${esc(term)}"><h2>${esc(term)}</h2>${items.map(p=>`<p><a href="${postUrl(p)}">${esc(p.title)}</a></p>`).join('')}</section>`).join('');
  } else {title='站点地图';body=`<ul><li><a href="/">首页</a></li>${[...posts,...pages].map(p=>`<li><a href="/${p.slug}/">${esc(p.title)}</a></li>`).join('')}</ul>`;}
  return layout({title,route,noindex:true,article:'navigation',body:`<section class="page"><h1>${title}</h1>${body}</section>`});
}
function portableHtml(route, html) {
  const depth=route.split('/').filter(Boolean).length;
  const prefix=depth?'../'.repeat(depth):'./';
  return html.replaceAll('href="/',`href="${prefix}`).replaceAll('src="/',`src="${prefix}`);
}
async function writePage(route, html, updated, indexable=true) {
  const dir=path.join(outDir,route.replace(/^\//,''));
  await mkdir(dir,{recursive:true});
  await writeFile(path.join(dir,'index.html'),portableHtml(route,html));
  if(indexable) publishedRoutes.push({route,updated});
}
async function main() {
  const allSlugs=[...posts,...pages].map(p=>p.slug);
  if(new Set(allSlugs).size!==allSlugs.length) throw new Error('Duplicate page slug');
  for(const post of posts) {
    if(!post.sections?.length) throw new Error(`Missing sections: ${post.slug}`);
    if(!site.products[post.product]) throw new Error(`Unknown product: ${post.slug}`);
  }
  await rm(outDir,{recursive:true,force:true});
  await mkdir(path.join(outDir,'assets'),{recursive:true});
  for(const file of ['style.css','main.js']) await copyFile(path.join(root,'src',file),path.join(outDir,'assets',file));
  await writePage('/',home(),site.updated);
  for(const p of posts) await writePage(postUrl(p),renderPost(p),p.updated,!p.noindex);
  for(const p of pages) await writePage(`/${p.slug}/`,layout({title:p.title,description:p.description,route:`/${p.slug}/`,article:p.slug,body:`<section class="page"><h1>${esc(p.title)}</h1>${p.html}</section>`}),p.updated);
  for(const route of utilityRoutes) await writePage(route,utilityPage(route),site.updated,false);
  // An absolute project URL keeps links/assets working for unknown nested URLs.
  const notFound=layout({title:'页面不存在',description:'此页面不存在，请回到指南首页。',route:'/404.html',canonical:false,noindex:true,article:'404',body:'<section class="page not-found"><h1>页面不存在</h1><p>请检查网址，或返回首页选择教程。</p><a class="button" href="/">返回首页</a></section>'});
  await writeFile(path.join(outDir,'404.html'),notFound.replaceAll('href="/',`href="${site.baseUrl}/`).replaceAll('src="/',`src="${site.baseUrl}/`));
  await writeFile(path.join(outDir,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publishedRoutes.map(({route,updated})=>`  <url><loc>${absUrl(route)}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  // Project-path robots.txt is informational only: crawlers use /robots.txt at the host root.
  await writeFile(path.join(outDir,'robots.txt'),`# GitHub project deployment: submit sitemap directly in Search Console.\n# Crawlers read https://imi0801.github.io/robots.txt, not this project-path file.\nUser-agent: *\nAllow: /\nSitemap: ${absUrl('/sitemap.xml')}\n`);
  await writeFile(path.join(outDir,'.nojekyll'),'');
  console.log(`Built ${publishedRoutes.length} indexable pages and ${utilityRoutes.length} navigation pages.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
