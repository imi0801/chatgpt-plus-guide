# ChatGPT Plus 开通与充值指南

Google 中文搜索导流站，沿用 GitHub Pages 项目地址：
https://imi0801.github.io/chatgpt-plus-guide/

## 开发与验证

需要 Node.js 18+ 和 Python 3，无 npm 依赖。

```sh
npm run build
npm test
npm run dev
```

预览地址 http://localhost:4173/ 。构建产物在 `docs/`；请通过源文件修改，不直接改生成的 HTML。

- `content/site.mjs`：站点、导航、分析 ID、Plus / Pro 商品与首页自助充值入口配置。
- `content/revised-posts.mjs`：核心文章正文、来源与事实核验日期。
- `content/extra-posts.mjs`：全部文章基础信息与其他文章正文；同 slug 的核心文章会覆盖基础字段。
- `content/pages.mjs`：关于、商业关系、编辑说明及隐私页面。
- `scripts/build.mjs`：静态页面、canonical、索引控制、站点地图和结构化数据。
- `src/`：样式与导流点击事件。

文章支持 `seoTitle`（不追加站名）、`noindex`、`showCta`、`product`（plus/pro/recharge）、`sources`、`checkedAt`、`updated`。日期仅在实际修改或核验后手动更新。原 Markdown 充值文章已迁入核心正文，不再维护两份内容。

## 发布

保持 GitHub Pages 设置：main 分支，`/docs` 目录。合并代码前运行 `npm test`，提交源码与重新构建的 `docs/`。当前 GitHub OAuth 授权缺少 workflow scope，自动检查模板保存在 `operations/seo-check.workflow-example.yml`；由具备相应权限的维护者放入 `.github/workflows/seo-check.yml` 后启用。模板同时验证构建输出与已提交产物一致。原有文章 URL 全部保留。

本次变更在独立分支审核；合并到 main 才触发现有 Pages 发布。撤回时使用 Git revert 回退对应提交并重新发布，不重写历史。

## 抓取和索引

- HTML 已包含完整正文，不依赖客户端渲染。
- 归档、标签、分类与 HTML 导航地图使用 `noindex, follow`，不进入 XML sitemap。
- XML sitemap 仅包含可索引规范网址；不使用 priority 或 changefreq 作为排名手段。
- 404 无首页 canonical，返回首页与资源链接用绝对项目地址，支持深层错误网址。
- GitHub 项目子目录 robots.txt 只是部署说明。Google 实际读取的是 `https://imi0801.github.io/robots.txt`；根目录缺失 robots 不代表禁止抓取。
- 直接向 Search Console 提交 `https://imi0801.github.io/chatgpt-plus-guide/sitemap.xml`。本仓库没有域名根目录控制权限，不修改其他站点。

## 统计与上线复盘

执行步骤和未完成的外部接入见 [SEO 运维说明](operations/seo-runbook.md)。本地测试不代表 Search Console 已收录、GA4 实时数据已收到或订单已回传。
