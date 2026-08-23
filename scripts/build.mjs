import { mkdir, rm, writeFile, copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, posts } from "../content/site.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs");

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const stripHtml = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const postUrl = (post) => `/${post.slug}/`;
const absUrl = (url) => new URL(url.replace(/^\//, ""), `${site.baseUrl}/`).toString();
const cta = (content) => `${site.ctaBase}&utm_content=${encodeURIComponent(content)}`;

function withCta(html) {
  return html.replaceAll(/__CTA__([a-zA-Z0-9_-]+)/g, (_, content) => cta(content));
}

function inlineMarkdown(text) {
  return esc(text)
    .replaceAll(/`([^`]+)`/g, "<code>$1</code>")
    .replaceAll(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replaceAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function renderMarkdown(markdown, { title = "" } = {}) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  const toc = [];
  let listType = "";
  let inQuote = false;
  let headingCount = 0;
  let skippedTitle = false;

  const closeList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = "";
  };

  const closeQuote = () => {
    if (!inQuote) return;
    html.push("</blockquote>");
    inQuote = false;
  };

  for (const line of lines) {
    if (!line.trim()) {
      closeList();
      closeQuote();
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      closeQuote();
      const level = heading[1].length;
      const text = heading[2].trim();
      if (!skippedTitle && level === 1 && text === title) {
        skippedTitle = true;
        continue;
      }
      const id = `md-section-${++headingCount}`;
      if (level === 2) toc.push({ id, text });
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      if (!inQuote) {
        html.push("<blockquote>");
        inQuote = true;
      }
      html.push(`<p>${inlineMarkdown(line.slice(2).trim())}</p>`);
      continue;
    }

    const unordered = line.match(/^-\s+(.+)$/);
    if (unordered) {
      closeQuote();
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${inlineMarkdown(unordered[1].trim())}</li>`);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      closeQuote();
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${inlineMarkdown(ordered[1].trim())}</li>`);
      continue;
    }

    closeList();
    closeQuote();
    html.push(`<p>${inlineMarkdown(line.trim())}</p>`);
  }

  closeList();
  closeQuote();
  return { html: html.join("\n"), toc };
}

function layout({ title, description, current = "/", body, toc = "", canonical = "/" }) {
  const pageTitle = title === site.title ? title : `${title} | ${site.title}`;
  const canonicalUrl = absUrl(canonical);
  const nav = site.nav
    .map((item) => `<a class="${current === item.href ? "active" : ""}" href="${item.href}">${item.label}</a>`)
    .join("");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(description || site.description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(pageTitle)}">
  <meta property="og:description" content="${esc(description || site.description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="twitter:card" content="summary_large_image">
  ${site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">` : ""}
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body class="${toc ? "has-toc" : "no-toc"}">
  <aside class="sidebar">
    <a class="brand" href="/">
      <span class="brand-title">${site.title}</span>
      <span class="brand-subtitle">${site.subtitle}</span>
    </a>
    <nav class="nav">${nav}</nav>
    <section class="profile">
      <div class="avatar">AI</div>
      <strong>${site.author}</strong>
      <p>ChatGPT Plus / Pro 订阅、支付失败、国内开通经验整理。</p>
    </section>
    <section class="stats">
      <span><strong>${posts.length}</strong> 文章</span>
      <span><strong>${new Set(posts.map((p) => p.category)).size}</strong> 分类</span>
      <span><strong>${new Set(posts.flatMap((p) => p.tags)).size}</strong> 标签</span>
    </section>
    <a class="sidebar-cta" href="${cta("sidebar")}" target="_blank" rel="noopener">前往 www.goplus.pro</a>
  </aside>
  <main class="main">
    ${body}
  </main>
  ${toc ? `<aside class="toc">${toc}</aside>` : ""}
  <script src="/assets/main.js"></script>
</body>
</html>`;
}

function postCard(post) {
  return `<article class="post-card">
    ${post.pinned ? `<span class="pin">置顶</span>` : ""}
    <h2><a href="${postUrl(post)}">${post.title}</a></h2>
    <div class="meta">${post.date} · ${post.category} · 阅读约 ${post.readingMinutes} 分钟</div>
    <p>${post.description}</p>
    <div class="tags">${post.tags.map((tag) => `<a href="/tags/#${encodeURIComponent(tag)}"># ${tag}</a>`).join("")}</div>
  </article>`;
}

function renderHome() {
  const pinned = posts.filter((p) => p.pinned);
  const rest = posts.filter((p) => !p.pinned);
  const body = `<section class="hero">
    <p class="eyebrow">ChatGPT Plus / Pro 国内订阅指南</p>
    <h1>国内用户开通 ChatGPT Plus，别再卡在支付这一步</h1>
    <p>围绕 Plus 开通、Pro 订阅、支付被拒、没有海外信用卡、套餐选择等问题，整理可搜索、可长期更新的教程站。</p>
    <div class="hero-actions">
      <a class="button primary" href="${cta("home_hero")}" target="_blank" rel="noopener">立即前往 www.goplus.pro</a>
      <a class="button" href="/chatgpt-payment-declined/">查看支付被拒排查</a>
    </div>
  </section>
  <section class="content-section">
    <h2>推荐阅读</h2>
    ${[...pinned, ...rest].map(postCard).join("")}
  </section>`;

  return layout({
    title: site.title,
    description: site.description,
    current: "/",
    canonical: "/",
    body
  });
}

function renderPost(post) {
  const tocItems = post.markdownToc
    ? post.markdownToc.map((item) => `<a href="#${item.id}">${item.text}</a>`).join("")
    : post.sections.map((section, index) => `<a href="#section-${index + 1}">${section.h2}</a>`).join("");
  const related = posts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);
  const postContent = post.markdownHtml
    ? `<section class="article-section markdown-body">${withCta(post.markdownHtml)}</section>`
    : post.sections
        .map(
          (section, index) => `<section id="section-${index + 1}" class="article-section">
          <h2>${section.h2}</h2>
          ${withCta(section.html)}
        </section>`
        )
        .join("");
  const body = `<article class="article">
    <header class="article-header">
      ${post.pinned ? `<span class="pin">置顶</span>` : ""}
      <h1>${post.title}</h1>
      <div class="meta">发表于 ${post.date} · 更新于 ${post.updated} · 分类：<a href="/categories/#${encodeURIComponent(post.category)}">${post.category}</a> · 阅读约 ${post.readingMinutes} 分钟</div>
      <div class="tags">${post.tags.map((tag) => `<a href="/tags/#${encodeURIComponent(tag)}"># ${tag}</a>`).join("")}</div>
    </header>
    <div class="notice">
      <strong>开通入口：</strong>
      <a href="${cta(`${post.slug}_top_notice`)}" target="_blank" rel="noopener">www.goplus.pro</a>
      <span>支持国内主流支付方式，适合没有海外卡或官方支付失败的用户。</span>
    </div>
    ${postContent}
    <section class="final-cta">
      <h2>准备开通 ChatGPT Plus / Pro？</h2>
      <p>如果你已经明确要订阅，可以直接进入自助开通入口。</p>
      <a class="button primary" href="${cta(`${post.slug}_bottom_cta`)}" target="_blank" rel="noopener">打开 www.goplus.pro</a>
    </section>
    ${
      related.length
        ? `<section class="related"><h2>相关阅读</h2>${related.map(postCard).join("")}</section>`
        : ""
    }
  </article>`;

  return layout({
    title: post.title,
    description: post.description,
    current: "",
    canonical: postUrl(post),
    toc: `<h3>文章目录</h3>${tocItems}`,
    body
  });
}

function groupBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc.set(key, [...(acc.get(key) || []), item]);
    return acc;
  }, new Map());
}

function renderArchives() {
  const body = `<section class="page"><h1>归档</h1>
    ${posts
      .map((post) => `<div class="archive-row"><time>${post.date}</time><a href="${postUrl(post)}">${post.title}</a></div>`)
      .join("")}
  </section>`;
  return layout({ title: "归档", current: "/archives/", canonical: "/archives/", body });
}

function renderTags() {
  const map = new Map();
  for (const post of posts) {
    for (const tag of post.tags) map.set(tag, [...(map.get(tag) || []), post]);
  }
  const body = `<section class="page"><h1>标签</h1>
    ${[...map.entries()]
      .map(
        ([tag, taggedPosts]) => `<section id="${encodeURIComponent(tag)}" class="term">
          <h2># ${tag}</h2>
          ${taggedPosts.map((post) => `<p><a href="${postUrl(post)}">${post.title}</a></p>`).join("")}
        </section>`
      )
      .join("")}
  </section>`;
  return layout({ title: "标签", current: "/tags/", canonical: "/tags/", body });
}

function renderCategories() {
  const map = groupBy(posts, (post) => post.category);
  const body = `<section class="page"><h1>分类</h1>
    ${[...map.entries()]
      .map(
        ([category, categoryPosts]) => `<section id="${encodeURIComponent(category)}" class="term">
          <h2>${category}</h2>
          ${categoryPosts.map((post) => `<p><a href="${postUrl(post)}">${post.title}</a></p>`).join("")}
        </section>`
      )
      .join("")}
  </section>`;
  return layout({ title: "分类", current: "/categories/", canonical: "/categories/", body });
}

function renderSitemap() {
  const links = [
    ["/", "首页"],
    ["/archives/", "归档"],
    ["/tags/", "标签"],
    ["/categories/", "分类"],
    ...posts.map((post) => [postUrl(post), post.title])
  ];
  const body = `<section class="page"><h1>站点地图</h1>
    <ul>${links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
  </section>`;
  return layout({ title: "站点地图", current: "/sitemap/", canonical: "/sitemap/", body });
}

function render404() {
  return layout({
    title: "页面不存在",
    description: "页面不存在，请返回首页查看 ChatGPT Plus 国内开通教程。",
    body: `<section class="page not-found"><h1>404</h1><p>页面不存在，可能已经移动。</p><a class="button primary" href="/">返回首页</a></section>`
  });
}

function portableHtml(route, html) {
  const depth = route === "/" ? 0 : route.split("/").filter(Boolean).length;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  return html
    .replaceAll('href="/', `href="${prefix}`)
    .replaceAll('src="/', `src="${prefix}`);
}

async function writePage(route, html) {
  const dir = route === "/" ? outDir : path.join(outDir, route);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), portableHtml(route, html));
}

async function main() {
  for (const post of posts) {
    if (!post.markdownFile) continue;
    const markdown = await readFile(path.join(root, post.markdownFile), "utf8");
    const rendered = renderMarkdown(markdown, { title: post.title });
    post.markdownHtml = rendered.html;
    post.markdownToc = rendered.toc;
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, "assets"), { recursive: true });
  await copyFile(path.join(root, "src", "style.css"), path.join(outDir, "assets", "style.css"));
  await copyFile(path.join(root, "src", "main.js"), path.join(outDir, "assets", "main.js"));

  await writePage("/", renderHome());
  for (const post of posts) await writePage(post.slug, renderPost(post));
  await writePage("archives", renderArchives());
  await writePage("tags", renderTags());
  await writePage("categories", renderCategories());
  await writePage("sitemap", renderSitemap());
  await writeFile(path.join(outDir, "404.html"), portableHtml("/", render404()));

  const sitemapUrls = [
    "/",
    "/archives/",
    "/tags/",
    "/categories/",
    "/sitemap/",
    ...posts.map(postUrl)
  ];
  await writeFile(
    path.join(outDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
      .map((url) => `  <url><loc>${absUrl(url)}</loc></url>`)
      .join("\n")}\n</urlset>\n`
  );
  await writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${absUrl("/sitemap.xml")}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
