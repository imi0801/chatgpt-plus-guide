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
  updated: "2026-10-12",
  products: {
    site: { url: "https://qfcc99.com/shop/panghu", label: "胖虎小店" },
    recharge: { url: "https://qfcc99.com/shop/panghu", label: "自助充值" },
    plus: { url: "https://qfcc99.com/shop/panghu", label: "查看 Plus 购买条件" },
    pro: { url: "https://qfcc99.com/shop/panghu", label: "咨询 Pro 档位与交付" },
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
  // Home page: the three official-or-third-party routes, rendered as path cards. No CNY prices here.
  paths: [
    { key: "web", tone: "brand", tag: "官方渠道", title: "官方网页结算", price: "$20 / 月", priceNote: "Plus 官方标价，Pro 从 $100 起，结算页可能另加税费", desc: "在 chatgpt.com 用海外发行的银行卡直接付款，订阅直接挂在你的账号上。", bullets: ["需要海外发行的 Visa / Mastercard 等", "取消与退款走 OpenAI 账单页", "国内发行的卡多数会在支付处理环节被拒"], fit: "有海外卡、账单地址可核对的人", href: "/chatgpt-plus/", more: "开通步骤与到账检查" },
    { key: "app", tone: "info", tag: "应用商店", title: "Apple / Google 应用内订阅", price: "$19.99 / 月", priceNote: "App Store 标价，是否含税看账单地区", desc: "在 iOS 或 Android 的 ChatGPT App 里升级，钱由 Apple 或 Google 收，订阅状态同步到账号。", bullets: ["可以用对应商店的余额或礼品卡", "取消与退款在商店的订阅管理里操作", "商店账号的地区决定能不能看到升级入口"], fit: "有美区等海外商店账号的手机用户", href: "/chatgpt-plus-mobile-app-vs-web/", more: "App 内订阅和网页订阅的区别" },
    { key: "merchant", tone: "accent", tag: "第三方代充", title: "人民币付款的第三方代充", price: "微信 / 支付宝", priceNote: "报价由商家公布，本站不维护人民币价格", desc: "把钱付给商家，由商家把订阅开到你的账号上。GoPlus 是本站披露合作的第三方服务。", bullets: ["不需要海外卡，不需要交出密码", "需要提供账号 Session 等信息，先看清风险", "售后与到账时效以商家页面承诺为准"], fit: "没有海外卡、也不想折腾商店账号的人", href: "/without-credit-card/", more: "4 条路径的条件与风险对比", cta: true },
  ],
  quickLinks: [
    ["开通指南", "/chatgpt-plus/"],
    ["付款失败", "/chatgpt-payment-declined/"],
    ["微信支付宝", "/chatgpt-plus-recharge-2026-alipay-wechat/"],
    ["Plus vs Pro", "/plus-vs-pro/"],
    ["取消与退款", "/chatgpt-plus-cancel-manage/"],
    ["人民币多少钱", "/chatgpt-plus-price-cny/"],
  ],
  steps: [
    ["保存报错原文", "截图或抄下提示的英文原文和出现时间，不同报错对应完全不同的处理。", "/chatgpt-plus-common-errors/", "报错对照表"],
    ["确认有没有真的扣款", "银行短信不等于入账，区分预授权冻结和已结算，避免重复下单。", "/chatgpt-payment-declined/", "三步排查"],
    ["核对账号订阅状态", "登录后看计划显示的是 Free 还是 Plus，App 内购先试恢复购买。", "/chatgpt-plus-after-open-check/", "到账检查"],
    ["选择处理渠道", "银行拒绝找银行，平台风控找官方支持，第三方购买找商家售后。", "/without-credit-card/", "路径对比"],
  ],
  compare: {
    columns: ["对比维度", "官方网页结算", "应用内订阅", "第三方代充"],
    rows: [
      ["需要海外卡", "需要", "需要海外商店账号与余额", "不需要"],
      ["需要交出密码", "不需要", "不需要", "正规商家不需要，但要提供 Session"],
      ["价格", "官方标价，可能加税", "商店标价，可能加税", "商家报价，含服务费"],
      ["取消入口", "OpenAI 账单页", "App Store / Google Play 订阅管理", "按商家说明，通常仍在账号内取消"],
      ["退款渠道", "OpenAI 支持", "Apple / Google", "商家售后"],
      ["主要风险", "国内卡被拒、账单地址不符", "商店地区限制、礼品卡来源", "商家可靠性、账号信息交付"],
      ["适合谁", "有稳定海外支付条件的人", "有海外商店账号的手机用户", "没有海外卡的国内用户"],
    ],
  },
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
  { name: "开通教程", slug: "kaitong", title: "ChatGPT Plus 开通教程", description: "从零开通 ChatGPT Plus：官方网页、手机 App、微信支付宝三种方式的步骤、准备事项与到账确认。", intro: "开通 ChatGPT Plus 只有三条路径：官方网页用海外卡结算、Apple 或 Google 应用内订阅、第三方代充。三条路的准备事项、到账时间和能出什么问题都不一样，这一组文章按路径拆开讲，每篇先给结论，再给可以照着做的步骤。第一次开通，先看《ChatGPT Plus 怎么开通》把条件对一遍；想用微信或支付宝付款，直接看《ChatGPT 可以用支付宝吗》；付完钱不确定有没有生效，看《开通后怎么确认成功》。" },
  { name: "支付问题", slug: "zhifu", title: "ChatGPT 付款失败与银行卡被拒排查", description: "ChatGPT 付款失败、银行卡被拒绝、付款未获批准、3DS 验证不通过、账单地址填写、虚拟卡限制的逐项排查指南。", intro: "付款失败的处理顺序是固定的：先把报错原文保存下来，再确认钱到底扣没扣，最后看账号的计划状态有没有变。顺序反了，很容易重复扣款或者找错对象。这一组文章按报错文案和场景分开，帮你判断该找发卡银行、找 OpenAI 支持还是找商家。不知道从哪开始，先看《ChatGPT 付款失败怎么办》的三步排查；看到具体英文提示，去《付款报错对照表》查原文；银行卡被拒，看《银行卡被拒绝的 8 个原因》。" },
  { name: "套餐选择", slug: "taocan", title: "ChatGPT 套餐对比：Free、Go、Plus、Pro、Team", description: "ChatGPT 各档套餐的价格、额度与适用人群对比，帮你判断该不该订、订哪一档、什么时候升级。", intro: "多数人真正的问题不是「Plus 还是 Pro」，而是「现在是不是必须订」。ChatGPT 现在有 Free、Go、Plus、Pro、Team 五档，价差从几美元到两百美元，额度和功能的差别却经常被宣传稀释。这一组文章按用户类型和使用强度给出判断标准，价格一律以官方结算页为准。先看《ChatGPT 免费版够不够用》确定要不要花钱，再看《Plus 和 Pro 区别》决定档位，经常撞上限的人直接看《Plus 额度是多少》。" },
  { name: "账号安全", slug: "zhanghao", title: "ChatGPT 账号安全、取消订阅与退款", description: "ChatGPT 取消订阅、关闭自动续费、申请退款、账号被封、换账号、Session 与代充账号风险的完整说明。", intro: "订阅管理的入口由购买渠道决定，账号风险则取决于你交出了什么。在网页订的要去网页取消，在 App 里订的要去商店管理；第三方代充需要提交的 Session 或登录信息，意味着对方能以你的身份操作账号。这一组文章覆盖取消订阅、关闭自动续费、申请退款、账号被封、换账号，以及代充的交付边界。想停掉扣费先看《自动续费怎么关》，已经被封先看《账号被封了订阅怎么办》，打算找人代充先读《充值账号安全》。" },
  { name: "ChatGPT 订阅", slug: "dingyue", title: "ChatGPT 订阅指南：Plus、Pro 与发票", description: "ChatGPT Plus 与 Pro 的完整订阅流程、升级前检查、收据下载与报销说明。", intro: "这一组是订阅全流程的主干文章：Plus 怎么开、什么时候该升到 Pro、怎么拿到收据和发票去报销。每篇都按「先确认条件、再操作、最后核对结果」的顺序写，并标注资料核验日期。第一次订阅从《ChatGPT Plus 怎么开通》开始；已经在用 Plus、考虑升级的看《ChatGPT Pro 怎么订阅》；公司报销需要票据的看《ChatGPT 发票怎么开》。碰到具体报错或付款问题，再跳到「支付问题」专题。" },
  { name: "常见问题", slug: "wenti", title: "ChatGPT 订阅常见问题", description: "ChatGPT Plus / Pro 订阅的高频问题短答案合集。", intro: "把开通、付款、额度、续费取消和账号安全五类高频问题集中在一起，每个问题只给一段能直接用的短答案，并链到对应的长文。适合已经知道自己卡在哪一步、只想快速确认答案的人。如果你的问题在这里没有找到，去「支付问题」或「账号安全」专题按场景查，那两组文章会把每一种报错和处理顺序讲完整。" },
  { name: "使用建议", slug: "jianyi", title: "ChatGPT Plus 值不值得买：按人群给结论", description: "学生、上班族、自媒体、程序员分别该不该开 ChatGPT Plus，以及怎么用才回本。", intro: "值不值得买，取决于你的使用强度和场景，不取决于别人的结论。同样是每月 20 美元，有人靠它每周省下几小时，有人开了一个月只问过三次问题。这一组文章按学生、上班族、自媒体和程序员拆开，每篇都给出「值得、不值得、先试免费版」三选一的明确判断，并说明怎么用才回本。拿不准先看《ChatGPT Plus 值得买吗》的五类用户结论；学生看《有学生优惠吗》；上班族看《怎么用才能回本》。" },
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
