# ChatGPT 订阅百科

ChatGPT Plus / Pro 的订阅问题参考站：开通流程、付款失败排查、退款与取消、额度说明和国内购买路径。

线上地址：https://guide.goplus.pro （GitHub Pages 备用：https://imi0801.github.io/chatgpt-plus-guide/）

## 本地运行

需要 Node.js 18+ 和 Python 3（生成 OG 图需要 Pillow）。

```sh
npm run build    # 生成 docs/
npm run dev      # http://localhost:4173/
npm test         # 构建 + SEO 检查 + 点击追踪检查
npm run images   # 重新生成 src/og-default.png 与 src/icon-512.png
```

## 目录结构

- `content/site.mjs`：站点配置、导航、专题（category hub）定义、首页问题卡片与 FAQ、外链产品位、合并页跳转表
- `content/extra-posts.mjs`：文章元数据（slug、日期、分类、标签）与早期正文
- `content/revised-posts.mjs`：核心文章正文
- `content/expanded/group-*.mjs`：扩写与新增文章（按 slug 覆盖前两者）
- `content/CONTENT-SPEC.md`：写新文章时遵守的内容规范
- `content/pages.mjs`：关于 / 资料核验 / 隐私三个独立页面
- `scripts/build.mjs`：静态生成，输出到 `docs/`（含 sitemap、robots、CNAME）
- `scripts/check-seo.py`、`scripts/check-tracking.mjs`：发布前检查
- `src/`：样式、脚本、图标与 OG 图

## 文章字段

每篇文章是一个对象：`title`、`description`、`sections[{h2, html}]`、`summary[3]`（关键结论）、`faq[[q,a]]`、`sources`、`changelog`、`checkedAt`、`product`；可选 `howto`（生成 HowTo 结构化数据）、`showCta:false`、`seoTitle`、`midCta`。

## 部署到自定义域名

1. DNS：添加 `guide` 的 CNAME 记录指向 `imi0801.github.io`，等解析生效。
2. 把 `content/site.mjs` 里的 `customDomainReady` 改为 `true`，`npm run build` 后推送（此时才会生成 `docs/CNAME`）。
3. 仓库 Settings → Pages → Custom domain 填 `guide.goplus.pro`，勾选 Enforce HTTPS（`docs/CNAME` 已由构建生成）。
4. Google Search Console / Bing Webmaster 分别以新域名添加资源，提交 `https://guide.goplus.pro/sitemap.xml`；`content/site.mjs` 里有 Bing / 百度验证码的填写位。

## 内容说明

本站为独立整理的参考指南，与 OpenAI 无隶属关系。站内购买入口为 GoPlus 的商业导流，已在「关于本站」页面披露。产品功能、价格及订阅规则请以官方最新说明为准。
