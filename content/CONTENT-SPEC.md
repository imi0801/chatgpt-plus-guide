# 内容扩写规范（给写作代理）

站点：ChatGPT 订阅百科（guide.goplus.pro）。中文简体，面向中国大陆用户，主题只限 ChatGPT 订阅（Plus / Pro / Go / Team）的开通、付款、额度、取消、退款、账号安全。目标：Google / Bing 中文搜索前 20。

## 参考文件（先读，模仿它的语气与结构）
- `/home/claude/site/content/revised-posts.mjs` —— 站内高质量文章范例。语气：直接、克制、先给结论、不承诺成功率、不推销。
- `/home/claude/site/content/extra-posts.mjs` —— 现有文章元数据与薄文章正文（你要扩写的原文在这里）。

## 输出格式（严格）
写到指定的 `.mjs` 文件，ES module。文件头部自带这些 helper（直接复制）：

```js
const checkedAt = "2026-09-19";
const links = {
  plus: ["OpenAI：Plus 说明", "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus"],
  pro: ["OpenAI：Pro 档位与额度", "https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro"],
  payment: ["OpenAI：银行卡被拒排查", "https://help.openai.com/en/articles/7232916-why-was-my-credit-card-declined"],
  regions: ["OpenAI：ChatGPT 支持地区", "https://help.openai.com/en/articles/7947663-chatgpt-supported-countries"],
  cancel: ["OpenAI：按购买渠道取消订阅", "https://help.openai.com/en/articles/7232927-how-do-i-cancel-my-chatgpt-subscription"],
  billing: ["OpenAI：账单与发票管理", "https://help.openai.com/en/articles/8554956-chatgpt-plus-billing-faq"],
  pricing: ["OpenAI：ChatGPT 定价页", "https://openai.com/chatgpt/pricing/"],
  team: ["OpenAI：ChatGPT Team 说明", "https://help.openai.com/en/articles/8265053-what-is-chatgpt-team"],
  merchant: ["GoPlus：商家流程与账号信息要求", "https://www.goplus.pro/"],
};
const section = (h2, html) => ({ h2, html });
const table = (headers, rows) => `<div class="table-scroll" tabindex="0" role="region" aria-label="对比表，可横向滚动"><table><thead><tr>${headers.map(x => `<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(x => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const source = (...keys) => keys.map(key => ({ title: links[key][0], url: links[key][1] }));
const lead = (text) => `<p class="lead">${text}</p>`;
const callout = (kind, html) => `<div class="callout callout-${kind}">${html}</div>`; // kind: tip | warn | note
const next = (items) => section("接下来可以看", `<ul>${items.map(([slug, label]) => `<li><a href="/${slug}/">${label}</a></li>`).join("")}</ul>`);
const post = (title, description, sections, sources, extra = {}) => ({ title, description, sections, sources, checkedAt, updated: checkedAt, ...extra });
```

然后：

```js
export const posts = {
  "<slug>": post(title, description, [ section(...), ..., next([...]) ], source(...), {
    summary: ["结论一", "结论二", "结论三"],   // 3 条，每条 ≤ 40 字，放在文章开头的“关键结论”框
    faq: [[q, a], ...],                          // 至少 5 条，答案 40–120 字，可含站内链接
    changelog: [["2026-09-19", "扩写为完整指南：……"]],
    product: "plus",                             // 或 "pro"
    showCta: false,                              // 仅账号安全/取消类文章设为 false，其他省略
    howto: { name: "……", steps: [["步骤标题", "一句话说明"], ...] } // 可选：有明确操作步骤的文章加
  }),
};
// 仅新文章需要：
export const meta = [
  { slug: "<slug>", date: "2026-09-19", category: "支付问题", tags: ["…", "…"], product: "plus" },
];
```

分类只能用：`ChatGPT 订阅`、`开通教程`、`支付问题`、`套餐选择`、`账号安全`、`使用建议`、`常见问题`。

## 每篇文章的硬性要求
1. **正文（不含 FAQ）≥ 1500 个中文字符**，6–9 个 `section`。最后一个 section 必须是 `next([...])`。
2. 第一个 section 以 `lead()` 开头，**前两句直接回答标题问题**（为 featured snippet 服务）。
3. 至少 1 张 `table()` 对比表；至少 1 个 `callout()`。
4. 至少 4 个站内链接（只能链到下方 slug 列表），格式 `<a href="/slug/">锚文本</a>`。
5. 标题（title）= 用户会搜的原话，含主关键词，≤ 32 字，疑问句或“数字+名词”式。description 80–120 字，含主关键词，写清能解决什么问题。
6. 正文 HTML 只用：`p ul ol li strong em a blockquote table` 及上面的 helper。不要用 h3（h2 由 section 提供）。不要内联样式。
7. **事实纪律**：
   - 只能出现的价格：Plus 每月 20 美元；Pro 100 / 200 美元两档；其余一律写“以结算页 / 官方定价页为准”。Team、Go 不写具体价格，写“按席位计费 / 低于 Plus 的入门档”并指向官方定价页。
   - 不承诺成功率、不写“稳”“100%”“秒到”。
   - 对第三方代充保持中立：说明它是什么、要交出什么、风险在哪；不推销、不贬低。“中国大陆未列入官方支持地区”这一句在涉及地区话题时要写。
   - 不编造 OpenAI 帮助中心没有的规则；不确定就写“以账号内提示为准”。
8. 每篇结尾前一个 section 可以自然提一句：没有海外卡时可以比较第三方购买条件，并链到 `/without-credit-card/` 或 `/chatgpt-plus-recharge-2026-alipay-wechat/`。一篇最多一处，不要在 lead 里提。
9. 不要出现“本文”“笔者”“小编”；不要用 emoji；不要感叹号。

## 可链接的 slug 列表
chatgpt-plus, chatgpt-payment-declined, chatgpt-pro, without-credit-card, plus-vs-pro, faq, chatgpt-plus-recharge-2026-alipay-wechat, chatgpt-plus-payment-checklist, chatgpt-plus-card-declined-reasons, chatgpt-plus-virtual-card-guide, chatgpt-plus-billing-address, chatgpt-plus-renewal-failed, chatgpt-plus-cancel-manage, chatgpt-plus-own-account-vs-shared, chatgpt-plus-vs-free, chatgpt-plus-for-students, chatgpt-plus-for-office, chatgpt-plus-after-open-check, chatgpt-plus-mobile-app-vs-web, chatgpt-plus-account-safety, chatgpt-plus-common-errors, chatgpt-plus-workflow, chatgpt-payment-not-approved, chatgpt-refund, chatgpt-cancel-error, chatgpt-auto-renew-off, chatgpt-plus-usage-limits
新文章 slug（也可互链）：chatgpt-team-plan, chatgpt-go-plan, chatgpt-account-banned-subscription, chatgpt-plus-price-cny, chatgpt-plus-change-account, chatgpt-upgrade-button-not-working, chatgpt-invoice-receipt, chatgpt-not-available-in-your-country

## 完成后自检
运行 `node -e "import('./content/expanded/<你的文件>.mjs').then(m=>{for(const [s,p] of Object.entries(m.posts)){const n=p.sections.map(x=>x.html.replace(/<[^>]+>/g,'')).join('').length;console.log(s,n,p.faq.length,p.summary.length)}})"`，确认每篇 ≥ 1500、faq ≥ 5、summary = 3，且无语法错误。
