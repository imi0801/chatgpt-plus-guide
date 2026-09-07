# SEO 上线与复盘

## 本次实施范围

已完成：静态 SEO 模板、9 篇核心指南重写、商业关系与资料核验说明、商品定向导流、点击事件、移动端宽度修正及自动检查。保留原文章 URL，不迁移域名。

尚需外部环境核验：Search Console 资源权限与基线、GA4 DebugView、goplus.pro 的承接事件、外部收银台订单回传、浏览器视觉与移动端交互验收。当前浏览器运行时返回无可用浏览器，未宣称完成截图或真实交互验收。未执行真实购买，也未制作模拟交易截图。

自动 CI 尚未启用：现有 GitHub OAuth 授权不允许写入工作流。模板已保存为 `operations/seo-check.workflow-example.yml`，本地 `npm test` 可独立运行。

## 1. Search Console 基线

使用拥有站点权限的账号打开 https://search.google.com/search-console 。选择或添加网址前缀资源 `https://imi0801.github.io/chatgpt-plus-guide/`。仓库已有验证 meta，但不能据此确认账号权限或验证成功。

1. 提交项目的 sitemap.xml，记录读取日期与状态。
2. 导出最近 28 天及可用历史搜索效果，搜索类型选“网页”；分别保存查询、页面、国家和设备报告。没有历史数据就从首个完整 28 天建立基线。
3. 检查页面索引、人工处置、安全问题；用网址检查查看核心五页：根首页、chatgpt-plus、chatgpt-plus-recharge-2026-alipay-wechat、chatgpt-payment-declined、plus-vs-pro。
4. 记录用户声明 canonical 与 Google 选择 canonical、是否抓取及未索引原因。不能只靠 site: 查询估计收录量。
5. 如使用 Search Analytics API 输出“查询×页面”，按 date/query/page 维度读取，记录日期范围、过滤条件及数据缺失限制；GSC 匿名查询不会全部显示。

结果填入 `seo-baseline.csv`。空值表示未知，不以 0 代替。保存原始导出到私有分析位置，不把账号或订单资料提交到公开仓库。

## 2. 点击事件与 GA4

保留原自定义事件 `outbound_click`，参数为 `article_id`、`cta_position`、`product`、`link_url`。`link_url` 只含目标域名和路径，不包含任意查询串。普通页脚外链不算商品导流。右键不计数，中键计一次；键盘激活跟随浏览器 click。

在 GA4 创建事件范围自定义维度：article_id、cta_position、product。用 DebugView/实时报告点击首页首屏自助小店、首页 Plus、首页 Pro、Plus 文章和 Pro 文章的入口：每次操作恰好一条 outbound_click，产品和目标路径对应。增强衡量的 `click` 是另一事件，报表不能与 outbound_click 相加计算导流量。未用订单验证前不把该事件命名为 purchase。

现有来源参数保留：utm_source=github_pages、utm_medium=referral、utm_campaign=chatgpt_plus_guide；utm_content=文章标识__位置。目标站应保留这些参数用于归因。首页首屏可直接进入 `https://fe.dtyuedan.cn/shop/panghu`，事件 product=recharge、cta_position=hero_recharge；该点击仍不代表支付成功。

## 3. goplus.pro 与订单承接（需要目标站权限）

在目标站记录商品访问、咨询、进入收银台。优先在同一 GA4 资源配置跨域衡量；确认域名归属、参数传递和实际浏览器行为后启用，不擅自改其他站点的统计配置。

外部收银台仅在有可信支付成功回调或订单导出匹配时记录 purchase，以 transaction_id 去重。不从跳转成功、按钮点击或感谢页访问猜测支付完成。回调无法接通时分别报告引流点击、咨询数和可核验订单，订单转化率标记为不可用。

当前只修改了引流站，未修改 goplus.pro、收银台或 Google 后台。商家 Plus 商品页公开 FAQ 曾出现 Grok 信息，应由目标站维护者修正；引流站没有复制这些字段。

## 4. 发布检查

- npm test 通过；源码与 docs 同步；原有 URL 不丢失。
- 部署后首页及核心文章返回 200；随机深层错误 URL 返回 404 且首页链接、CSS 正常。
- 查看源代码确认正文、canonical 和 noindex，不只看浏览器渲染。
- Rich Results Test 检查文章和面包屑；结构化数据通过不等于保证获得富结果。
- 在 390px、768px、1440px 视口检查首页、长文、对比表、目录与 CTA；除表格容器外不应横向溢出。
- 运行 PageSpeed Insights 移动端检查，先记录基线再优化。实际用户数据以可用的 CrUX / GSC 为准，不把实验室分数当排名保证。

## 5. 第 2 / 4 / 8 周复盘

每次使用一致的日期跨度，记录核心页索引、非品牌搜索曝光/点击、位置变化、CTA 点击率、可归因订单。明确品牌词过滤清单，比较时不改变定义。

按以下顺序处理：未发现先查内链与地图；抓取未索引先查内容价值与重复；已索引有曝光但点击少，结合相近位置的 CTR 检查标题；有流量少导流检查意图匹配和购买条件；有导流少成交检查目标页承接。

每周最多新增 1–2 篇有独立资料的文章。没有新证据时更新旧文，避免换词批量铺页。公开社区发帖需要另行授权，本次未向任何社区发送消息。
