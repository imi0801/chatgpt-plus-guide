# ChatGPT 订阅百科

ChatGPT Plus / Pro 的订阅问题参考站：开通流程、付款失败排查、退款与取消、额度说明和国内购买路径。

[访问网站](https://imi0801.github.io/chatgpt-plus-guide/)

## 本地运行

需要 Node.js 18+ 和 Python 3。

```sh
npm run build   # 生成 docs/
npm run dev     # http://localhost:4173/
npm test        # 构建 + SEO 检查 + 点击追踪检查
```

## 目录结构

- `content/site.mjs`：站点配置、导航、外链产品位、合并页跳转表
- `content/extra-posts.mjs`：文章元数据（slug、日期、分类、标签）
- `content/revised-posts.mjs`：核心文章正文、常见追问与更新记录
- `content/pages.mjs`：关于 / 资料核验 / 隐私三个独立页面
- `scripts/build.mjs`：静态生成，输出到 `docs/`
- `scripts/check-seo.py`、`scripts/check-tracking.mjs`：发布前检查

## 内容说明

本站为独立整理的参考指南，与 OpenAI 无隶属关系。站内购买入口为 GoPlus 的商业导流，已在<a href="https://imi0801.github.io/chatgpt-plus-guide/about/">关于本站</a>页面披露。产品功能、价格及订阅规则请以官方最新说明为准。
