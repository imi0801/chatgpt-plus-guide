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

const ext = (key, text) => `<a href="${links[key][1]}" rel="noopener" target="_blank">${text}</a>`;

export const posts = {
  "chatgpt-team-plan": post("ChatGPT Team 怎么开通？价格、人数与 Plus 区别", "ChatGPT Team 按席位计费，适合需要共享工作区和管理员的小团队。说明 Team 与 Plus 的区别、最少人数与价格去哪查、网页开通步骤、企业付款与发票，以及国内团队和第三方代开要确认的事项。", [
    section("ChatGPT Team 是什么，怎么开通", `${lead("ChatGPT Team 是 OpenAI 面向小型团队的付费工作区，按席位（每个成员一个名额）计费，在 ChatGPT 网页端从“升级计划”里选择 Team 即可开通。具体单价、最少席位数和月付 / 年付差异以官方定价页和结算页为准，本站不写固定数字。")}<p>和个人订阅相比，Team 多出来的不是某个独家模型，而是一层“组织”结构：有一个共享工作区，有管理员可以邀请和移除成员、管理席位与账单，团队内可以共享自建 GPT 和项目。官方说明中还写明，Team 工作区的对话内容默认不会被用于训练模型。</p><p>如果你只是一个人用、想要更高额度，看<a href="/chatgpt-plus/">Plus 开通指南</a>或<a href="/plus-vs-pro/">Plus 和 Pro 怎么选</a>就够了；只有当两个人以上需要统一付款、统一管理时，Team 才有意义。</p>${callout("note", `<p>OpenAI 的套餐名称和页面入口会调整，部分地区或页面上 Team 可能以新的名称出现。以${ext("pricing", "官方定价页")}和${ext("team", "Team 帮助文档")}的当前说明为准。</p>`)}`),
    section("价格与人数：按席位计费，去哪里查", `<p>Team 的计费逻辑是“单价 × 席位数 × 计费周期”。你买多少个席位就付多少份钱，席位空着也照样计费，所以开通前先数清楚真正要用的人。</p><ul><li><strong>单价</strong>：月付和年付通常不同，年付一般折算后更低，但要一次付清。具体数字以${ext("pricing", "定价页")}和结算页为准，结算页金额可能另含当地税费。</li><li><strong>最少席位数</strong>：Team 有最低席位要求，不能只买一个席位。最低数量以官方页面为准，开通时结算页会直接限制。</li><li><strong>增减席位</strong>：管理员可以在工作区设置里增加席位，新增部分一般按剩余周期计费；减少席位的生效时间和是否退差价，以账单页提示为准。</li></ul><p>预算时别忘了汇率和银行手续费。用外币卡付款的换算方法与 <a href="/chatgpt-plus-price-cny/">Plus 人民币价格怎么算</a>相同，只是乘以席位数。</p>`),
    section("Team 和 Plus 的区别", `${table(["对比项", "Plus（个人）", "Team（团队）"], [["计费方式", "每人每月 20 美元，以结算页为准", "按席位计费，单价以官方定价页为准"], ["人数", "1 人", "有最低席位要求，以官方页为准"], ["工作区", "个人账号，无共享空间", "团队共享工作区，可共享 GPT 与项目"], ["管理员", "无", "可邀请 / 移除成员、管理席位与账单"], ["数据用于训练", "可在设置中关闭", "官方说明默认不用于训练"], ["付款与发票", "个人卡，个人收据", "统一付款，可填写公司名称与税号"], ["额度", "个人额度", "每个席位有各自额度，以帮助文档为准"]])}<p>表里最容易被忽略的是“额度不共享”：Team 并不是一个大池子，五个人买五个席位，每个人拿到的是自己那份额度，额度规则见<a href="/chatgpt-plus-usage-limits/">额度怎么算</a>。另外，个人 Plus 账号加入 Team 工作区后，个人空间和团队空间是分开的，聊天记录不会自动合并。</p>`),
    section("开通步骤：网页 → 升级 → Team", `<ol><li>由准备当管理员的人登录 <a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a> 网页版。建议用公司邮箱注册的账号，便于交接。</li><li>点击账号菜单或侧栏的“升级计划”，在套餐页切换到 Team（或团队 / 企业相关选项）。</li><li>填写工作区名称，选择席位数和月付 / 年付。</li><li>进入结算页，核对总金额、税费和下次扣款日，填写付款卡与账单地址，完成银行验证。</li><li>开通后在工作区设置里用邮箱邀请成员，成员接受邀请后即占用席位。</li><li>回到账单页确认计划显示为 Team，保存收据。</li></ol><p>手机 App 里一般不能直接创建 Team 工作区，开通和席位管理请在网页端完成。成员加入后可以在 App 里切换到团队工作区使用。</p>`),
    section("企业付款与发票", `<p>Team 的收据可以在账单页下载。结算时或在账单设置里可以填写公司名称、账单地址和税号，这些信息会出现在之后的收据上；已经开出的收据能否修改，以账单页和支持回复为准，所以第一次付款前就把信息填对。</p><p>需要注意两点：</p><ul><li>OpenAI 开出的是其所在法域的收据 / 发票，不是中国的增值税发票。公司报销或入账能否使用，先问清财务的要求。</li><li>付款方式以结算页显示为准，常见的是国际信用卡。是否支持对公转账等其他方式，以官方销售或帮助文档说明为准，不要凭第三方描述判断。</li></ul><p>收据下载与抬头修改的通用做法，见<a href="/chatgpt-invoice-receipt/">ChatGPT 发票与收据怎么开</a>。</p>`),
    section("国内团队常见问题：地区与公司卡", `<p>截至核验日，中国大陆未列入 OpenAI 的 ChatGPT 支持地区，${ext("regions", "官方支持地区列表")}同样适用于 Team。这意味着国内团队开通 Team 会同时碰到两个问题：服务可用地区和付款。</p><ul><li><strong>地区</strong>：Team 是账号层面的服务，成员所在地区不符合要求时，即使管理员付了款，也可能出现无法访问或功能受限的情况。购买第三方服务不会改变官方地区限制。</li><li><strong>公司卡</strong>：国内公司常用的对公卡、单币种人民币卡往往无法完成外币线上扣款；双币信用卡要开通境外线上交易和 3DS 验证。卡被拒的排查顺序见<a href="/chatgpt-payment-declined/">支付被拒怎么办</a>。</li><li><strong>账单地址</strong>：填发卡机构登记的地址，与卡不一致是被拒的常见原因，详见<a href="/chatgpt-plus-billing-address/">账单地址怎么填</a>。</li></ul>${callout("warn", `<p>多人共用一个 Plus 账号来代替 Team，看似省钱，但会互相挤占额度、互相看到对话，还可能因为多地登录触发安全验证。人多时这类风险更明显，参考<a href="/chatgpt-plus-own-account-vs-shared/">自有账号与共享账号的区别</a>。</p>`)}`),
    section("第三方代开 Team 要确认什么", `<p>市面上有商家提供“代开 Team”或“Team 车位”。它们的形态差别很大，下单前至少问清以下几点：</p><ol><li><strong>谁是管理员</strong>：如果工作区管理员是商家，对方可以移除你、查看工作区设置，你无法自己增减席位或查看账单。</li><li><strong>你用的是不是自己的账号</strong>：用自己的邮箱接受邀请，还是商家发给你一个账号，两者的数据归属完全不同。</li><li><strong>工作区里还有谁</strong>：与陌生人同处一个工作区时，共享的 GPT、项目的可见范围需要自己检查。</li><li><strong>期限与售后</strong>：工作区被停用或席位被移除时如何补偿，是否有书面约定。</li><li><strong>要交出什么</strong>：是否需要提供密码、验证码或 Session。这些都能代表登录身份，交出前要想清楚。</li></ol><p>这些问题没有标准答案，关键是自己知道买到的是什么。没有海外卡、又只需要个人使用时，也可以比较<a href="/without-credit-card/">中国大陆购买路径</a>里的其他条件。</p>`),
    next([["chatgpt-plus", "ChatGPT Plus 怎么开通"], ["plus-vs-pro", "Plus 和 Pro 怎么选"], ["chatgpt-invoice-receipt", "ChatGPT 发票与收据怎么开"], ["chatgpt-plus-for-office", "办公场景用 Plus 的建议"]]),
  ], source("team", "pricing", "regions", "billing"), {
    summary: ["Team 按席位计费，单价与最少人数以官方定价页为准", "比 Plus 多共享工作区、管理员，数据默认不用于训练", "开通在网页端完成，国内团队先核对地区与公司卡"],
    faq: [
      ["ChatGPT Team 多少钱？", "Team 按席位计费，总价约等于单价乘以席位数，月付与年付单价不同。具体数字以官方定价页和结算页为准，结算页可能另加当地税费，本站不写固定价格。"],
      ["Team 最少要买几个席位？", "Team 有最低席位要求，不能只买一个。最低数量以官方定价页和开通时的结算页为准，结算页会直接限制可选的最小席位数。"],
      ["一个人能开 Team 吗？", "一个人需要按最低席位数付费，空着的席位也会计费，通常不划算。个人使用直接开 Plus 或 Pro 更合适，可以先看 <a href=\"/plus-vs-pro/\">Plus 和 Pro 的对比</a>。"],
      ["Team 成员的额度是共享的吗？", "不是一个共享大池子，每个席位有各自的使用额度。具体额度规则以官方帮助文档为准，高频用户多的团队要留意单人额度是否够用。"],
      ["已经是 Plus 的账号加入 Team 会怎样？", "个人空间和团队工作区是分开的，聊天记录不会自动合并。原来的 Plus 订阅是否需要手动取消，以账单页提示为准，避免个人和团队重复付费。"],
      ["Team 能开中国的增值税发票吗？", "不能。OpenAI 提供的是其所在法域的收据或发票，可以填写公司名称和税号，但不是国内增值税发票，报销前先问清财务要求。"],
    ],
    changelog: [["2026-09-19", "新增文章：说明 Team 的席位计费、与 Plus 的区别、开通步骤、企业付款与第三方代开核对项。"]],
    product: "plus",
    howto: { name: "在网页端开通 ChatGPT Team", steps: [["登录管理员账号", "用准备担任管理员的账号登录 ChatGPT 网页版。"], ["进入升级计划", "在套餐页切换到 Team。"], ["设置工作区与席位", "填写工作区名称，选择席位数和计费周期。"], ["完成结算", "核对总金额与税费，填写付款卡和账单地址并完成验证。"], ["邀请成员", "在工作区设置中用邮箱邀请成员加入。"], ["确认计划状态", "在账单页确认显示 Team 并保存收据。"]] },
  }),

  "chatgpt-go-plan": post("ChatGPT Go 是什么？和 Plus 的区别、国内能不能买", "ChatGPT Go 是 OpenAI 推出的低于 Plus 的入门付费档。说明 Go 的定位、可用地区与价格去哪查、Go 与免费版和 Plus 的对比、国内看不到 Go 的原因，以及什么人该直接选 Plus。", [
    section("ChatGPT Go 是什么", `${lead("ChatGPT Go 是 OpenAI 推出的入门付费档，价格低于 Plus，额度高于免费版、低于 Plus。国内能不能买取决于账号地区：Go 只在官方开放的地区提供，截至核验日中国大陆未列入 ChatGPT 支持地区，因此国内用户通常看不到也无法直接购买。")}<p>Go 最初只在部分国家推出，之后逐步扩展到更多地区。具体哪些地区可用、每个地区定价多少，OpenAI 会随时调整，以${ext("pricing", "官方定价页")}和账号内“升级计划”页面的实际显示为准。不同地区的 Go 可能以当地货币计价，与美元价格不一定能直接换算。</p><p>可以把 Go 理解成“免费版的加强版”：常用功能的上限提高了，但离 Plus 仍有距离。对大多数重度用户来说，它并不能替代 <a href="/chatgpt-plus/">Plus</a>。</p>`),
    section("Go、Free、Plus 对比", `${table(["对比项", "Free 免费版", "Go", "Plus"], [["价格", "免费", "低于 Plus 的入门档，以定价页为准", "每月 20 美元，以结算页为准"], ["可用地区", "官方支持地区", "仅官方开放 Go 的地区", "官方支持地区"], ["消息额度", "最低", "高于免费版", "高于 Go"], ["图片生成、文件上传等", "有限", "比免费版宽松", "更宽松"], ["高级模型与新功能", "有限或无", "部分开放，以页面为准", "更完整，新功能通常较早开放"], ["适合谁", "偶尔使用", "每天轻度使用、预算敏感", "工作学习中高频使用"]])}<p>表里没有写具体倍数，是因为各档额度会随模型和负载调整，官方也以帮助文档和页面提示为准。判断时看两个问题：你是否经常在免费版里碰到“已达上限”，以及你是否需要 Plus 独有或优先开放的能力。额度的一般规则见<a href="/chatgpt-plus-usage-limits/">ChatGPT 额度怎么算</a>。</p>${callout("note", `<p>Go 的功能清单变化较快，某项能力是否包含在 Go 里，以升级页面上的套餐对比说明为准，不要依据第三方截图或旧文章判断。</p>`)}`),
    section("为什么国内账号看不到 Go 选项", `<p>升级页面展示哪些套餐，是按账号和访问所在地区决定的。看不到 Go，最常见的原因有三个：</p><ol><li><strong>地区不在 Go 开放范围内</strong>：即使某地区支持 ChatGPT，也不一定开放 Go。中国大陆未列入 ${ext("regions", "ChatGPT 官方支持地区")}，自然不会出现 Go。</li><li><strong>登录方式或渠道不同</strong>：网页端和 App 内展示的套餐可能不同；App 内购买受商店地区影响，Apple 或 Google 账号所在地区决定能看到什么。</li><li><strong>已经是付费用户</strong>：已订阅 Plus 或 Pro 的账号，升级页面的展示会不同，是否能降级到 Go 以页面提示为准。</li></ol><p>购买第三方服务不会改变官方地区限制。用网络工具切换到开放 Go 的地区，也不能保证付款卡、账单地址与账号地区匹配，反而可能引发付款被拒或安全验证，相关风险见<a href="/chatgpt-not-available-in-your-country/">“所在国家不支持”提示怎么办</a>。</p>`),
    section("国内用户想买 Go 会遇到什么", `<p>就算页面上出现了 Go，国内用户还要过付款这一关。Go 在不同地区往往以当地货币计价，并可能要求当地的付款方式或发卡地区。国内常见的双币信用卡是否能完成支付，以结算页的实际结果为准，被拒时按<a href="/chatgpt-payment-declined/">支付被拒排查</a>处理，不要反复重试。</p><p>还有一点容易被忽略：地区定价的套餐通常和账号地区绑定。账号地区、付款卡地区和日常登录地区不一致时，后续续费、取消和退款都可能变得麻烦。</p>${callout("warn", `<p>市面上如果有“代开 Go”，先问清是在你自己的账号上开通，还是交付一个其他地区的成品账号，以及到期后如何续费。成品账号的归属和聊天记录都不在你手里，参考<a href="/chatgpt-plus-own-account-vs-shared/">自有账号与共享账号的区别</a>。</p>`)}`),
    section("Go 值不值得买", `<p>如果你所在的地区能正常购买 Go，它适合这样的人：</p><ul><li>每天都用，但主要是问答、改写、翻译等轻度任务。</li><li>免费版额度经常不够，但又用不满 Plus。</li><li>预算有限，对最新模型和新功能的优先体验没有强需求。</li></ul><p>不太适合的情况：</p><ul><li>需要长时间写代码、分析大文件、做深度研究，Go 的额度很快会用完。</li><li>工作依赖某项只在 Plus 或更高档开放的能力。</li><li>购买本身需要额外折腾（换地区、找当地卡），省下的差价可能还不够覆盖成本和风险。</li></ul>`),
    section("什么人应该直接选 Plus", `<p>对国内用户来说，Go 通常不是一个现实选项，比较时更应该看免费版和 Plus 的差距，详见 <a href="/chatgpt-plus-vs-free/">Plus 和免费版的区别</a>。以下几类用户可以直接考虑 Plus：</p><ul><li>工作或学习中每天高频使用，经常触发免费版上限。</li><li>需要经常使用图片生成、文件分析、更强的推理模型等功能。</li><li>希望付款、续费、取消都在一个支持地区较多、说明较完整的档位上完成。</li></ul><p>Plus 官方价格是每月 20 美元，换算成人民币的方法见 <a href="/chatgpt-plus-price-cny/">Plus 人民币多少钱</a>。如果 Plus 的额度也不够，再考虑 <a href="/plus-vs-pro/">Pro</a>。没有海外卡的话，可以比较<a href="/chatgpt-plus-recharge-2026-alipay-wechat/">支付宝、微信购买的条件</a>，重点看交付方式和售后约定。</p>`),
    next([["chatgpt-plus-vs-free", "Plus 和免费版有什么区别"], ["chatgpt-plus", "ChatGPT Plus 怎么开通"], ["chatgpt-not-available-in-your-country", "提示所在国家不支持怎么办"], ["chatgpt-plus-usage-limits", "额度怎么算"]]),
  ], source("pricing", "regions", "plus"), {
    summary: ["Go 是低于 Plus 的入门档，额度介于免费版和 Plus 之间", "可用地区与价格以官方定价页和账号内提示为准", "国内账号通常看不到 Go，重度用户直接选 Plus"],
    faq: [
      ["ChatGPT Go 多少钱？", "Go 是价格低于 Plus 的入门档，不同地区可能以当地货币计价，价格也可能不同。具体金额以官方定价页和账号内升级页面显示为准，本站不写固定数字。"],
      ["国内能买 ChatGPT Go 吗？", "截至核验日，中国大陆未列入 ChatGPT 官方支持地区，也不在 Go 的开放范围内，国内账号通常看不到 Go 选项。购买第三方服务不会改变官方地区限制。"],
      ["Go 和 Plus 的额度差多少？", "Go 的额度高于免费版、低于 Plus，官方会随模型和负载调整，没有固定倍数可以引用。以升级页面的套餐说明为准，额度规则可参考 <a href=\"/chatgpt-plus-usage-limits/\">额度怎么算</a>。"],
      ["已经订阅 Plus 能换成 Go 吗？", "能否降级以及何时生效，以账号内升级页面和账单页提示为准。通常需要先取消当前订阅，等到期后再选择其他档位，避免同时扣两份费用。"],
      ["为什么别人能看到 Go，我看不到？", "套餐展示和账号地区、访问地区、购买渠道有关。对方所在地区开放了 Go，或用的是开放地区的应用商店账号，就可能看到，你的账号不一定可以。"],
      ["Go 能用最新的模型吗？", "Go 能用到的模型和功能以升级页面的套餐对比为准，部分新模型和新功能通常先向 Plus 及更高档开放。依赖某项能力时，先看页面说明再决定。"],
    ],
    changelog: [["2026-09-19", "新增文章：说明 Go 的定位、与 Free 和 Plus 的对比、国内看不到 Go 的原因与选择建议。"]],
    product: "plus",
  }),

  "chatgpt-account-banned-subscription": post("ChatGPT 账号被封了怎么办？订阅还会扣费吗、能退款吗", "ChatGPT 账号被封或被停用后怎么处理：常见提示原文、官方申诉入口、订阅是否还会继续扣费、按渠道取消与申请退款，以及成品号和共享号为什么更容易被封、平时怎样预防。", [
    section("账号被封后先做什么", `${lead("ChatGPT 账号被封后，先按购买渠道确认订阅是否还在扣费并主动取消，再通过官方帮助中心提交申诉；申诉结果由 OpenAI 决定，没有人能保证恢复。退款要找实际收款方申请，网页订阅找 OpenAI，App 内订阅找 Apple 或 Google，第三方订单找商家。")}<p>顺序很重要：申诉可能需要一段时间，而订阅续费不会等你。尤其是 App 内订阅，由商店独立管理，ChatGPT 账号被停用不代表商店那边的订阅自动停止。</p><p>如果你不确定账号是被封了还是只是登录异常、网络问题，先看下一节的提示原文对照，再看<a href="/chatgpt-plus-common-errors/">常见报错汇总</a>，避免把普通错误当成封号。</p>`),
    section("常见提示原文对照", `${table(["提示原文（可能因版本不同有差异）", "大致含义", "先做什么"], [["Your account has been deactivated", "账号已被停用", "查看注册邮箱是否收到说明邮件，准备申诉"], ["You do not have an account because it has been deleted or deactivated", "账号已删除或停用", "确认是否本人曾申请删除，否则按停用处理"], ["Access denied / Unable to load", "访问被拒或加载失败，不一定是封号", "换网络、清缓存、换浏览器再试"], ["Unusual activity detected", "检测到异常活动，可能只是临时限制", "停止频繁操作，稍后再试，完成验证"], ["邮件告知违反使用政策", "因政策原因停用", "阅读邮件中的原因与申诉说明"]])}<p>提示文字会随版本调整，以你实际看到的内容为准。判断是否真的被停用，最可靠的依据是注册邮箱里来自 OpenAI 的通知邮件，以及换设备、换网络后是否仍然显示同样的提示。“无法加载”“访问被拒”这类提示更多是网络或地区问题，和账号被停用不是一回事。</p>`),
    section("怎么申诉：官方入口与准备材料", `<p>申诉只能通过 OpenAI 的官方渠道提交。常见入口是 <a href="https://help.openai.com/" rel="noopener" target="_blank">OpenAI 帮助中心</a>右下角的对话支持，或停用通知邮件里给出的申诉方式。具体入口以通知邮件和帮助中心当前说明为准。</p><ol><li>用注册账号的邮箱联系，说明账号邮箱和发现被停用的时间。</li><li>如实说明使用情况，不要编造，也不要复制网上的“申诉模板”。</li><li>如有付费订阅，附上脱敏后的收据编号，说明订阅渠道。</li><li>保存所有往来邮件，等待回复，不要反复提交同样内容。</li></ol>${callout("warn", `<p>申诉结果由 OpenAI 决定，是否恢复、需要多久都没有公开承诺。声称能“内部渠道解封”“保证恢复”的第三方服务，本站无法核实，且通常要求你交出账号凭据，风险需要自行判断。</p>`)}`),
    section("被封后订阅还会扣费吗", `<p>不能假设会自动停止。是否继续扣费取决于订阅在哪里购买，以及收款方如何处理被停用的账号，更可靠的做法是按渠道主动检查并取消：</p>${table(["购买渠道", "被封后怎么查", "取消入口"], [["ChatGPT 网页", "看收款邮件和银行卡流水是否仍有扣款", "账号无法登录时，通过帮助中心联系支持处理"], ["Apple App 内订阅", "iPhone 设置 → 姓名 → 订阅", "在系统订阅列表中直接取消"], ["Google Play 订阅", "Google Play → 订阅", "在 Play 订阅列表中直接取消"], ["第三方订单", "看订单约定", "联系商家，多为一次性交付，无自动扣费"]])}<p>App 内订阅由商店管理，即使 ChatGPT 账号无法登录，也可以在商店里取消，这一步最好第一时间完成。网页订阅在无法登录时没法自己点取消，需要联系官方支持说明情况；同时留意银行卡流水，必要时可以咨询发卡行如何处理后续扣款。各渠道的完整取消路径见<a href="/chatgpt-plus-cancel-manage/">取消订阅操作入口</a>。</p>`),
    section("能退款吗：按收款方申请", `<p>退款没有统一规则，由实际收款方按自己的政策处理：</p><ul><li><strong>网页订阅</strong>：通过帮助中心联系 OpenAI 支持，说明账号被停用和扣款情况。是否退款、退多少，以支持回复为准。</li><li><strong>Apple</strong>：在 Apple 的“报告问题”页面按订单申请，由 Apple 审核。</li><li><strong>Google Play</strong>：在 Play 的订单记录中申请退款，按 Google 的政策处理。</li><li><strong>第三方</strong>：按下单时的售后约定处理。成品号、共享号被封是否算商家责任，要看事先是否有书面约定。</li></ul><p>申请时准备好收据、扣款时间和账号邮箱。详细流程和被拒后的处理见<a href="/chatgpt-refund/">ChatGPT 退款怎么申请</a>。</p>`),
    section("成品号、共享号为什么更容易出问题", `<p>这类账号的风险来自使用方式，而不是某个具体商家：</p><ul><li><strong>多地多设备同时登录</strong>：共享号往往有多人在不同城市、不同网络下使用，登录环境频繁变化，容易触发安全验证或风控。</li><li><strong>来源不可控</strong>：成品号的注册信息、付款方式和历史使用记录你都不知道，前任使用者的行为也可能影响账号。</li><li><strong>无法自证归属</strong>：申诉时需要证明是账号所有人，而成品号的注册邮箱、付款记录往往不在你手里，申诉很难进行。</li><li><strong>内容不受控</strong>：共享账号里任何一个人提交违规内容，影响的是整个账号。</li></ul><p>两种交付方式的完整对比见<a href="/chatgpt-plus-own-account-vs-shared/">自有账号与共享账号的区别</a>。</p>`),
    section("怎么预防账号被封", `<ul><li><strong>不要频繁切换地区</strong>：截至核验日，中国大陆未列入 ${ext("regions", "ChatGPT 官方支持地区")}。频繁用 VPN 在不同国家之间切换，登录环境与账单地区反复变化，容易触发异常检测。</li><li><strong>不要共享账号</strong>：一个账号一个人用，不要把密码、验证码或 Session 交给他人。</li><li><strong>遵守使用政策</strong>：不要尝试生成违规内容，不要用脚本批量调用网页版。</li><li><strong>保护登录安全</strong>：开启多因素验证，注册邮箱保持可用，便于接收通知和申诉。</li><li><strong>保留付款凭据</strong>：收据和订单截图集中保存，出问题时能快速证明归属和申请退款。</li></ul><p>更多日常安全习惯见<a href="/chatgpt-plus-account-safety/">账号安全指南</a>。如果需要重新开通，建议注册自己长期使用的账号，而不是再买一个成品号。</p>`),
    next([["chatgpt-refund", "ChatGPT 退款怎么申请"], ["chatgpt-plus-cancel-manage", "按渠道取消订阅"], ["chatgpt-plus-account-safety", "账号安全指南"], ["chatgpt-plus-change-account", "怎么把订阅换到另一个账号"]]),
  ], source("cancel", "billing", "regions"), {
    summary: ["被封后订阅不一定自动停，要按购买渠道主动取消", "申诉走官方帮助中心，结果由 OpenAI 决定", "退款找实际收款方，共享号与成品号更难申诉"],
    faq: [
      ["账号被封后订阅会自动取消吗？", "不能这样假设。App 内订阅由 Apple 或 Google 管理，账号停用后仍可能续费，应在商店订阅列表中主动取消；网页订阅无法登录时，通过帮助中心联系官方支持处理。"],
      ["被封后还能退款吗？", "可以申请，但不保证。网页订阅找 OpenAI 支持，App 内订阅找 Apple 或 Google，第三方订单按商家约定处理。准备好收据和扣款时间，流程见 <a href=\"/chatgpt-refund/\">退款说明</a>。"],
      ["申诉一般多久有结果？", "OpenAI 没有公开承诺申诉处理时长，也不保证恢复。提交后保存往来邮件，耐心等待回复，不要反复提交相同内容，以免拖慢处理。"],
      ["看到 Access denied 是不是被封了？", "不一定。访问被拒、无法加载多与网络、地区或浏览器缓存有关。换网络和浏览器后仍提示账号已停用，并且邮箱收到了通知，才更可能是停用。"],
      ["共享号被封了找谁？", "共享号或成品号的注册邮箱和付款记录通常不在你手里，很难向官方申诉。只能按购买时和商家的约定处理，事先没有书面约定的，售后很难保障。"],
      ["被封后能用同一个邮箱重新注册吗？", "以 OpenAI 的提示和帮助中心说明为准。账号停用期间通常不能直接用同一邮箱重新注册，先走申诉流程，不要尝试绕过限制。"],
    ],
    changelog: [["2026-09-19", "新增文章：覆盖被封提示原文、申诉入口、订阅扣费与取消、退款渠道和预防建议。"]],
    product: "plus",
    showCta: false,
  }),

  "chatgpt-plus-price-cny": post("ChatGPT Plus 人民币多少钱？税费、汇率与报价怎么算", "ChatGPT Plus 官方价为每月 20 美元，折合人民币要看汇率、税费、银行手续费和购买渠道。给出换算方法、App Store 差价说明，以及判断第三方人民币报价是否合理的核对清单。", [
    section("ChatGPT Plus 折合人民币多少钱", `${lead("ChatGPT Plus 官方价格是每月 20 美元，按当日汇率折算，大约在 140–150 元人民币区间，会随汇率浮动。实际付款还可能加上当地税费和银行货币转换费，最终以结算页金额和银行账单为准。")}<p>所以“Plus 多少钱”要分成三层看：官方标价（20 美元）、结算金额（标价加税费，按账单地区计算）、你实际被扣的人民币（结算金额按发卡行汇率换算，可能再加手续费）。三者经常不一样，下面逐项拆开。</p><p>购买渠道也会影响价格：网页结算、App Store、Google Play、第三方各有各的定价方式。开通流程本身见 <a href="/chatgpt-plus/">Plus 开通指南</a>。</p>`),
    section("自己算：人民币价格的换算公式", `<p>用外币卡在网页端订阅，可以按下面的方法估算每月实际支出：</p><blockquote>人民币支出 ≈（20 美元 + 当地税费）× 发卡行结算汇率 ×（1 + 货币转换费率）</blockquote><ol><li><strong>标价</strong>：20 美元，以结算页为准。</li><li><strong>税费</strong>：结算页会按账单地址所在地区计算，部分地区为 0，部分地区会另加。</li><li><strong>汇率</strong>：用发卡行或卡组织在入账当天的结算汇率，不是你下单那一刻在网上查到的中间价。</li><li><strong>转换费</strong>：部分发卡行对外币交易收取一定比例的货币转换费，费率和是否免收以发卡行公告为准。</li></ol><p>举个只演示算法的例子：假设无税费、结算汇率为 R、转换费率为 f，那么每月支出就是 20 × R ×（1 + f）。把你卡片的实际数字代进去即可，不必依赖任何网站给出的固定人民币价格。</p>`),
    section("税费：为什么结算页比 20 美元高", `<p>官方标价通常不含税，结算页会根据你填写的账单地址所在地区加上销售税或增值税。所以同样是 Plus，不同地区的账单地址看到的总价可能不同。</p><ul><li>税费以结算页显示为准，付款前看清“总计”一栏。</li><li>账单地址必须与发卡行登记的一致，不要为了少交税随便改地址，否则容易付款被拒，见<a href="/chatgpt-plus-billing-address/">账单地址怎么填</a>。</li><li>收据上会列出税额，需要报销时可以在账单页下载，见<a href="/chatgpt-invoice-receipt/">发票与收据怎么开</a>。</li></ul>${callout("note", `<p>网页结算的币种、税费和计费周期都以结算页为准。如果页面显示了年付或其他周期选项，金额和折扣同样以结算页为准，不要按第三方文章里的数字预算。</p>`)}`),
    section("App Store、Google Play 与网页的差价", `${table(["渠道", "标价方式", "税费", "人民币支出怎么定"], [["ChatGPT 网页", "20 美元，以结算页为准", "按账单地址计算，可能另加", "外币卡按发卡行汇率换算，可能有转换费"], ["Apple App Store", "按商店地区定价，以购买页为准", "通常已含在商店价格里", "取决于 Apple ID 地区与付款方式"], ["Google Play", "按商店地区定价，以购买页为准", "按商店规则", "取决于 Google 账号地区与付款方式"], ["第三方人民币", "商家自定", "不单列", "商家报价，含服务费"]])}<p>应用商店的价格由 Apple 和 Google 按各地区单独设定，可能和网页折算价不同，这是渠道本身的定价差异。App 内购买的续费、取消和退款都要回到对应商店处理，与网页订阅互不相通，注意不要在两个渠道重复订阅，见<a href="/chatgpt-plus-mobile-app-vs-web/">App 与网页订阅的区别</a>。</p>`),
    section("第三方人民币报价包含什么", `<p>截至核验日，中国大陆未列入 ${ext("regions", "ChatGPT 官方支持地区")}，购买第三方服务不会改变官方地区限制。第三方商家的人民币报价不是官方汇率换算，而是商家自己的定价，通常包括：</p><ul><li><strong>订阅成本</strong>：商家实际支付给官方或商店的费用，含税费、汇率和手续费。</li><li><strong>服务费</strong>：商家的人工、渠道和售后成本。</li><li><strong>交付形态差异</strong>：在你自己的账号上开通、交付一个成品账号、多人共享一个账号，成本和风险完全不同，价格自然不同。</li></ul><p>所以不同商家的报价差异很大，单看价格没法比较，必须把交付形态放在一起看。三种形态的风险对比见<a href="/chatgpt-plus-own-account-vs-shared/">自有账号与共享账号的区别</a>。</p>`),
    section("怎么判断第三方报价是否合理", `<ol><li><strong>先算官方成本</strong>：用上面的公式算出自己付款时的大致人民币成本，作为参照。</li><li><strong>问清交付形态</strong>：是在自己的账号上开通，还是成品号、共享号。价格明显低于官方成本的，多半不是在你自己的账号上开通完整的一个月。</li><li><strong>问清要交出什么</strong>：是否需要密码、验证码或 Session，这些信息能代表登录身份。</li><li><strong>问清期限和续费</strong>：到期后是否自动续、怎么续，续费价格是否一样。</li><li><strong>问清售后</strong>：开通失败、中途失效如何退款，是否有书面约定。</li></ol>${callout("tip", `<p>价格远低于官方成本，要多问一句“差价从哪里来”。价格远高于官方成本，要确认多付的部分换来了什么售后。两种情况都要看交付形态和售后条款，而不是只看数字。</p>`)}<p>下单前的完整核对项见<a href="/chatgpt-plus-payment-checklist/">付款前检查清单</a>。没有海外卡的用户，可以对照<a href="/chatgpt-plus-recharge-2026-alipay-wechat/">支付宝、微信购买条件</a>比较不同路径。</p>`),
    section("省钱与避免多花钱的几点建议", `<ul><li>用免收或低收货币转换费的外币卡付款，具体以发卡行规则为准。</li><li>不要在网页和 App 同时订阅，重复订阅是最常见的多花钱原因。</li><li>不打算续费时，在账期结束前取消，见<a href="/chatgpt-auto-renew-off/">关闭自动续费</a>。</li><li>付款被拒时不要连续重试，多次预授权可能暂时占用额度，按<a href="/chatgpt-payment-declined/">支付被拒排查</a>处理。</li><li>先确认自己真的需要 Plus，轻度用户可以先看<a href="/chatgpt-plus-vs-free/">Plus 和免费版的区别</a>。</li></ul>`),
    next([["chatgpt-plus", "ChatGPT Plus 怎么开通"], ["plus-vs-pro", "Plus 和 Pro 的费用与选择"], ["chatgpt-go-plan", "ChatGPT Go 和 Plus 的区别"], ["chatgpt-plus-card-declined-reasons", "银行卡被拒的常见原因"]]),
  ], source("plus", "pricing", "billing", "regions"), {
    summary: ["Plus 官方价每月 20 美元，折合约 140–150 元随汇率浮动", "实际扣款还可能含税费和银行货币转换费", "第三方报价是商家定价，要结合交付形态判断"],
    faq: [
      ["ChatGPT Plus 一个月多少人民币？", "官方价每月 20 美元，按当日汇率折算大约在 140–150 元区间，会随汇率浮动。加上可能的税费和银行货币转换费，实际扣款以结算页和银行账单为准。"],
      ["为什么我被扣的钱比 20 美元多？", "常见原因有三个：结算页按账单地址加了税费；发卡行按入账当天汇率换算；部分发卡行收取货币转换费。对照收据和银行账单逐项核对即可。"],
      ["App Store 买 Plus 更贵还是更便宜？", "应用商店按地区单独定价，价格可能和网页折算价不同，以购买页显示为准。App 内订阅的续费和退款由 Apple 管理，与网页订阅互不相通。"],
      ["Plus 有年付吗？", "是否提供年付、年付金额和折扣，以账号内升级页面和结算页显示为准。本站不写固定年付价格，购买前看清计费周期和总金额。"],
      ["第三方报价比官方便宜很多正常吗？", "要看交付形态。在你自己的账号上开通完整一个月，成本不会低于官方价。价格明显更低时，多半是共享号或成品号，参考 <a href=\"/chatgpt-plus-own-account-vs-shared/\">自有账号与共享账号的区别</a>。"],
      ["Plus 和 Pro 价格差多少？", "Plus 每月 20 美元，Pro 有 100 美元和 200 美元两档，额度和功能不同。怎么选见 <a href=\"/plus-vs-pro/\">Plus 和 Pro 的对比</a>，实际扣款同样以结算页为准。"],
    ],
    changelog: [["2026-09-19", "新增文章：给出 Plus 人民币换算公式，说明税费、渠道差价、银行手续费与第三方报价的核对方法。"]],
    product: "plus",
  }),
};

export const meta = [
  { slug: "chatgpt-team-plan", date: "2026-09-19", category: "套餐选择", tags: ["ChatGPT Team", "团队版", "席位计费", "企业付款"], product: "plus" },
  { slug: "chatgpt-go-plan", date: "2026-09-19", category: "套餐选择", tags: ["ChatGPT Go", "入门档", "套餐对比", "支持地区"], product: "plus" },
  { slug: "chatgpt-account-banned-subscription", date: "2026-09-19", category: "账号安全", tags: ["账号被封", "申诉", "退款", "取消订阅"], product: "plus" },
  { slug: "chatgpt-plus-price-cny", date: "2026-09-19", category: "套餐选择", tags: ["Plus 价格", "人民币", "汇率", "税费"], product: "plus" },
];
