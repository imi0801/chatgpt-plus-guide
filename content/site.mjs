import { revisedPosts } from './revised-posts.mjs';
import { supportingPosts } from './extra-posts.mjs';
import { posts as expandedA } from './expanded/group-a.mjs';
import { posts as expandedB } from './expanded/group-b.mjs';
import { posts as expandedC, meta as metaC } from './expanded/group-c.mjs';
import { posts as expandedD, meta as metaD } from './expanded/group-d.mjs';

export const site = {
  title: "ChatGPT 订阅百科",
  tagline: "ChatGPT Plus 开通、付款与订阅管理指南",
  subtitle: "ChatGPT Plus / Pro 订阅、支付被拒、无海外卡解决方案",
  author: "ChatGPT 订阅百科编辑部",
  description: "ChatGPT Plus 怎么开通、付款失败怎么办、微信支付宝能不能用、Plus 和 Pro 怎么选。面向中国大陆用户的 ChatGPT 订阅参考站：每篇先给结论，再按情况给步骤，资料按官方帮助中心核验。",
  // Custom domain. Add the CNAME record guide.goplus.pro → imi0801.github.io in DNS, then enable it in the repo's Pages settings.
  // customDomainReady: false → 站点仍按 github.io 地址构建，不生成 CNAME，推送后旧地址照常可用。
  // DNS（guide → imi0801.github.io）配好后改为 true，重新 build 并推送，即切换到自定义域名。
  customDomainReady: false,
  customDomain: "guide.goplus.pro",
  githubPagesUrl: "https://imi0801.github.io/chatgpt-plus-guide",
  get baseUrl() { return this.customDomainReady ? `https://${this.customDomain}` : this.githubPagesUrl; },
  get domain() { return new URL(this.baseUrl).host; },
  googleSiteVerification: "9tqSXTyupED9ZY-GMXMI43IVjP7X1B4ae0SKujMCWJs",
  bingSiteVerification: "",   // Bing Webmaster → 添加站点 → HTML meta 方式，把 content 值填到这里
  baiduSiteVerification: "",  // 百度站长平台 → HTML 标签验证
  googleAnalyticsId: "G-V3XLJMGEV5",
  nav: [
    { label: "首页", href: "/" },
    { label: "开通指南", href: "/chatgpt-plus/" },
    { label: "微信支付宝", href: "/chatgpt-plus-recharge-2026-alipay-wechat/" },
    { label: "付款失败", href: "/chatgpt-payment-declined/" },
    { label: "套餐对比", href: "/plus-vs-pro/" },
    { label: "取消与退款", href: "/chatgpt-plus-cancel-manage/" },
    { label: "常见问题", href: "/faq/" },
  ],
  shortName: "ChatGPT 订阅百科",
  updated: "2026-09-19",
  products: {
    site: { url: "https://www.goplus.pro/", label: "goplus.pro" },
    recharge: { url: "https://fe.dtyuedan.cn/shop/panghu", label: "自助充值" },
    plus: { url: "https://www.goplus.pro/chatgpt-plus-recharge", label: "查看 Plus 购买条件" },
    pro: { url: "https://www.goplus.pro/chatgpt-pro-recharge", label: "咨询 Pro 档位与交付" },
  },
  // Home page: search-intent entry cards. Question first, answer second.
  intents: [
    ["ChatGPT Plus 怎么开通？", "三条路径对比、准备事项、到账确认", "chatgpt-plus"],
    ["可以用支付宝、微信付款吗？", "官网不支持；人民币付款实际发生在哪里", "chatgpt-plus-recharge-2026-alipay-wechat"],
    ["没有海外信用卡怎么办？", "中国大陆购买 Plus 的 4 条路径", "without-credit-card"],
    ["付款失败 / 银行卡被拒？", "按报错、扣款、订阅状态 3 步排查", "chatgpt-payment-declined"],
    ["Plus 和 Pro 选哪个？", "价格、额度倍数与升级判断", "plus-vs-pro"],
    ["Plus 人民币多少钱？", "官方价、汇率、税费与第三方报价", "chatgpt-plus-price-cny"],
    ["怎么取消订阅、关自动续费？", "网页、Apple、Google 入口各不同", "chatgpt-plus-cancel-manage"],
    ["扣了款但还是 Free？", "开通后怎么确认成功", "chatgpt-plus-after-open-check"],
  ],
  homeFaq: [
    ["中国大陆能开 ChatGPT Plus 吗？", "服务可用地区、付款条件和账号状态要分开核对。截至核验日中国大陆未列入官方支持地区；第三方人民币付款不改变这一条件。"],
    ["ChatGPT Plus 多少钱一个月？", "官方标价每月 20 美元，实际扣款以结算页为准，可能另加当地税费。人民币折算随汇率浮动。"],
    ["ChatGPT 官网能用支付宝或微信吗？", "不能。官方结算页只接受银行卡等国际支付方式，所有人民币付款都发生在第三方商家侧。"],
    ["付款失败但扣了钱，会退吗？", "多数是预授权冻结，通常数日内自行释放。先看账单里是「待处理」还是已入账，再决定是否申诉。"],
    ["取消订阅等于退款吗？", "不等于。取消只停止下次扣费，退款要按收款渠道（OpenAI、Apple、Google 或商家）单独申请。"],
  ],
};

// Category hubs: indexable landing pages with their own intro copy.
export const categories = [
  { name: "开通教程", slug: "kaitong", title: "ChatGPT Plus 开通教程", description: "从零开通 ChatGPT Plus：官方网页、手机 App、微信支付宝三种方式的步骤、准备事项与到账确认。", intro: "开通 ChatGPT Plus 只有三条路径：官方网页结算、Apple / Google 应用内订阅、第三方代充。这一组文章按路径拆开讲，每篇先给结论，再给可以照着做的步骤。" },
  { name: "支付问题", slug: "zhifu", title: "ChatGPT 付款失败与银行卡被拒排查", description: "ChatGPT 付款失败、银行卡被拒绝、付款未获批准、3DS 验证不通过、账单地址填写、虚拟卡限制的逐项排查指南。", intro: "付款失败的处理顺序是：先保存报错原文，再确认钱到底扣没扣，最后看账号计划状态。这一组文章按报错和场景分开，帮你找到该找银行、找官方支持还是找商家。" },
  { name: "套餐选择", slug: "taocan", title: "ChatGPT 套餐对比：Free、Go、Plus、Pro、Team", description: "ChatGPT 各档套餐的价格、额度与适用人群对比，帮你判断该不该订、订哪一档、什么时候升级。", intro: "多数人的问题不是「Plus 还是 Pro」，而是「现在是不是必须订」。这一组文章按用户类型和使用强度给出判断标准，价格一律以官方结算页为准。" },
  { name: "账号安全", slug: "zhanghao", title: "ChatGPT 账号安全、取消订阅与退款", description: "ChatGPT 取消订阅、关闭自动续费、申请退款、账号被封、换账号、Session 与代充账号风险的完整说明。", intro: "订阅管理的入口由购买渠道决定，账号风险则取决于你交出了什么。这一组文章覆盖取消、退款、被封、换账号，以及第三方代充需要提交的信息到底意味着什么。" },
  { name: "ChatGPT 订阅", slug: "dingyue", title: "ChatGPT 订阅指南：Plus、Pro 与发票", description: "ChatGPT Plus 与 Pro 的完整订阅流程、升级前检查、收据下载与报销说明。", intro: "这一组是订阅全流程的主干文章：怎么开、怎么升级、怎么拿收据。碰到具体报错或付款问题，再跳到对应的专题页。" },
  { name: "常见问题", slug: "wenti", title: "ChatGPT 订阅常见问题", description: "ChatGPT Plus / Pro 订阅的高频问题短答案合集。", intro: "把开通、付款、额度、续费取消和账号安全五类高频问题集中在一起，都给短答案。" },
  { name: "使用建议", slug: "jianyi", title: "ChatGPT Plus 值不值得买：按人群给结论", description: "学生、上班族、自媒体、程序员分别该不该开 ChatGPT Plus，以及怎么用才回本。", intro: "值不值得买，取决于你的使用强度和场景，不取决于别人的结论。这一组文章按人群拆开，每篇都给出「值得 / 不值得 / 先试免费版」的明确判断。" },
];

export const redirects = new Map([
  ["chatgpt-plus-domestic-payment-2026", { target: "/without-credit-card/", title: "ChatGPT Plus 支付方式对比" }],
  ["chatgpt-plus-faq-extended", { target: "/faq/", title: "ChatGPT Plus 国内订阅 30 个高频问题" }],
  ["chatgpt-pro-upgrade-timing", { target: "/plus-vs-pro/", title: "什么时候该从 ChatGPT Plus 升级到 Pro" }],
]);

const expanded = { ...expandedA, ...expandedB, ...expandedC, ...expandedD };
const allMeta = [...supportingPosts, ...metaC, ...metaD];

export const posts = allMeta
  .filter(post => !redirects.has(post.slug))
  .map(post => ({ ...post, ...revisedPosts[post.slug], ...expanded[post.slug] }))
  .map(post => ({ ...post, updated: post.updated || post.date }));
