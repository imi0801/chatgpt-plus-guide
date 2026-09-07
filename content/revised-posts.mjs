// Reviewed against the linked sources on this date, not a build timestamp.
const checkedAt = "2026-09-07";
const links = {
  plus: ["OpenAI：Plus 说明", "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus"],
  pro: ["OpenAI：Pro 档位与额度", "https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro"],
  payment: ["OpenAI：银行卡被拒排查", "https://help.openai.com/en/articles/7232916-why-was-my-credit-card-declined"],
  regions: ["OpenAI：ChatGPT 支持地区", "https://help.openai.com/en/articles/7947663-chatgpt-supported-countries"],
  cancel: ["OpenAI：按购买渠道取消订阅", "https://help.openai.com/en/articles/7232927-how-do-i-cancel-my-chatgpt-subscription"],
  merchant: ["GoPlus：商家流程与账号信息要求", "https://www.goplus.pro/"],
};
const section = (h2, html) => ({ h2, html });
const table = (headers, rows) => `<div class="table-scroll" tabindex="0" role="region" aria-label="对比表，可横向滚动"><table><thead><tr>${headers.map(x => `<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(x => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const source = (...keys) => keys.map(key => ({ title: links[key][0], url: links[key][1] }));
const region = `<p>付款条件和服务可用地区需要分别核对。截至核验日，中国大陆未列入 OpenAI 的 ChatGPT 支持地区；购买第三方服务不会改变官方地区限制。先查看<a href="${links.regions[1]}" rel="noopener" target="_blank">官方支持地区</a>，再决定是否购买。</p>`;
const safety = `<p>GoPlus 的公开说明提到，ChatGPT 充值可能需要 Session。Session 可能包含能代表登录身份的敏感凭据，不能因为“不需要密码”就认为没有账号访问风险。不要将完整 Session、Cookie、密码或验证码发送到聊天群、公开截图或本站。若无法接受第三方接触会话信息，应停止该流程并选择符合条件的官方购买渠道。</p><p>有关信息用途、保存期限和删除方式，应在付款前向商家确认；本站没有核验商家后台的实际处理行为，也不承诺退出重登就能撤销所有凭据。</p>`;
const next = (items) => section("接下来可以看", `<ul>${items.map(([slug, label]) => `<li><a href="/${slug}/">${label}</a></li>`).join("")}</ul>`);
const post = (title, description, sections, sources, extra = {}) => ({ title, seoTitle: title, description, sections, sources, checkedAt, updated: checkedAt, ...extra });

export const revisedPosts = {
  "chatgpt-plus": post("ChatGPT Plus 怎么开通？订阅条件、步骤与到账检查", "从支持地区、购买渠道到订阅确认，逐步检查 ChatGPT Plus 开通条件，区分官方订阅和第三方充值，避免重复付款。", [
    section("先确认：你要购买的是哪一种服务", `<p>ChatGPT Plus 是个人 ChatGPT 订阅，不是 API 余额。开通前先确认自己需要更高使用额度，并核对账号、地区和付款条件。本文负责完整流程；微信支付宝的具体购买要求在<a href="/chatgpt-plus-recharge-2026-alipay-wechat/">第三方充值指南</a>中单独说明。</p>${region}`),
    section("开通前准备这四项", `<ol><li>确认要升级的账号与登录方式，记录当前计划，避免升级到另一个账号。</li><li>查看是否已有网页、Apple 或 Google 的有效订阅，避免跨渠道重复购买。</li><li>核对购买渠道的价格、币种、税费、续费规则及账号信息要求。</li><li>确认自己知道在哪里查账单和取消续费，再付款。</li></ol>`),
    section("官方网页订阅：按页面完成购买", `<ol><li>打开 <a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a>，登录需要升级的账号。</li><li>从账号菜单进入升级计划，选择 Plus。</li><li>检查结算页的金额与计费周期，填写真实付款信息并完成银行验证。</li><li>付款后查看计划状态和收据；遇到错误先保存报错文字，进入<a href="/chatgpt-payment-declined/">支付排查</a>，不要把反复付款当作验证方法。</li></ol><p>使用手机 App 购买时，先确认下载的是 OpenAI 的应用，收据由 Apple 或 Google 提供，后续管理也要回到对应商店。</p>`),
    section("第三方充值：先了解交付再下单", `<p>第三方商家支持人民币支付，不代表 OpenAI 官网直接支持相同支付方式。交易对象、凭据提交和售后规则均需单独核对。商品名中的“充值”也不意味着时长一定能叠加到现有订阅上。</p><p>如需比较条件，先读<a href="/chatgpt-plus-domestic-payment-2026/">购买渠道对比</a>；已经确定使用第三方，再查看商品页。</p>`),
    section("付款后用这份清单确认到账", `<ul><li>确认当前账号与下单账号一致。</li><li>检查计划是否显示 Plus，而不只看某个模型是否出现。</li><li>核对扣款收据、交易时间、套餐和下一计费日期。</li><li>App 内购买未同步时检查恢复购买入口；仍有问题，携带脱敏收据联系实际收款方。</li><li>计划未生效时先处理原订单，不另下一单尝试覆盖。</li></ul>`),
    next([["plus-vs-pro", "Plus 和 Pro 的费用、额度与选择"], ["chatgpt-plus-cancel-manage", "如何按购买渠道取消续费"]]),
  ], source("plus", "regions")),
  "chatgpt-plus-recharge-2026-alipay-wechat": post("ChatGPT 微信、支付宝充值：购买步骤与账号信息要求", "想用微信或支付宝购买 ChatGPT Plus？先核对第三方商品、总价、Session 要求、到账检查和退款条件，再决定是否下单。", [
    section("微信、支付宝付款给谁", `<p>本文说明第三方商家购买流程，不把人民币支付入口当作 OpenAI 官方收银台。第三方卡密是商家的订单或兑换凭证，不是能在 ChatGPT 官网通用的兑换码。</p>${region}`),
    section("第一步：检查商品和总费用", `<p>进入 Plus 商品详情页，确认购买的是自有账号充值还是成品账号、期限如何计算、已有订阅是否支持续充。商品标价、服务费、优惠条件和退款规则应一起核对；不要把最低“起价”当作最终订单金额。</p><ul><li>当前库存是否可下单，还是需要人工确认？</li><li>微信、支付宝哪种方式当前可用？</li><li>未开通、失败、重复付款分别如何处理？</li><li>交付超时多久可以联系客服，凭什么订单信息查询？</li></ul>`),
    section("第二步：先确认账号信息要求", safety),
    section("第三步：购买并保存订单凭证", `<p>确认能接受商品条件后，从商家的商品页面进入其收银台，核对商户、商品和金额再支付。保存订单号、付款时间与商家联系方式；如收到卡密，只在商家明确提供的兑换页面使用。不要在搜索广告或陌生聊天链接中提交凭据。</p><p>我们只核验公开页面，未执行测试购买；库存、实际收银台与交付步骤以订单当时显示为准。</p>`),
    section("第四步：核对交付结果，再处理续费", `<ol><li>回到原 ChatGPT 账号检查计划状态。</li><li>核对到账套餐、有效期与订单是否一致。</li><li>未到账先联系商家查询原订单，不重复购买。</li><li>有自动续费的旧渠道，按<a href="/chatgpt-plus-cancel-manage/">原渠道管理订阅</a>；不要把新充值理解成旧扣费已停止。</li></ol>`),
    section("售后：把条件问清楚再付款", `<p>第三方售后承诺由实际商家承担，不等于 OpenAI 官方退款政策。购买前保存商品与售后条款，明确什么情况可退款、怎样举证、找谁处理。不要仅凭“安全可靠”或“极速到账”判断交易条件。</p>`),
    next([["chatgpt-plus-account-safety", "Session 与账号安全注意事项"], ["without-credit-card", "没有海外卡时如何选路径"], ["chatgpt-plus-after-open-check", "开通后检查清单"]]),
  ], source("merchant", "regions")),
  "chatgpt-plus-domestic-payment-2026": post("ChatGPT Plus 支付方式对比：官方、应用商店与第三方", "比较 ChatGPT Plus 官方网页、Apple 或 Google 应用内购买、第三方充值的条件、费用和订阅管理方式。", [
    section("先按购买渠道比较", `<p>选择渠道时，既要看能否付款，也要看谁交付、谁续费、谁处理退款。下面的比较用于检查条件，不保证任何卡片或渠道一定购买成功。</p>${region}`),
    section("三类购买渠道对照", table(["渠道", "先核对", "费用", "管理与售后"], [["官方网页", "支持地区、账号与可用付款方式", "结算页币种、税费与周期", "ChatGPT 账单与官方支持"], ["Apple / Google App", "官方应用、商店地区、购买账号", "应用商店实际显示", "原购买商店；按收据定位"], ["第三方充值", "商品类型、资料要求、已有计划状态", "商家总价及服务条件", "商家订单与约定售后"]])),
    section("虚拟卡与礼品卡属于什么", `<p>虚拟卡是付款工具，不是独立的 ChatGPT 订阅渠道；仍需符合发卡地区、卡片验证和服务可用条件。礼品卡是否可用于应用内订阅取决于商店地区与规则，不能把购买余额等同于已成功订阅。不建议在确认能购买前先充值大额余额。</p>`),
    section("按三个问题选路径", `<ol><li>能否满足官方服务与付款条件？可以时，先查看官方或官方 App 内的结算。</li><li>是否愿意并能够自行管理商店余额和周期扣费？若不能，不要为了单次购买贸然增加支付工具。</li><li>是否接受第三方的账号信息要求与售后条件？若不能，就不应付款。</li></ol>`),
    next([["chatgpt-plus", "完整订阅流程"], ["chatgpt-plus-recharge-2026-alipay-wechat", "微信支付宝的实际交易对象与步骤"], ["chatgpt-plus-cancel-manage", "不同渠道的取消入口"]]),
  ], source("payment", "cancel", "regions")),
  "without-credit-card": post("没有海外信用卡怎么订阅 ChatGPT？按条件选择路径", "没有海外信用卡时，先核对服务地区、应用商店付款条件和第三方资料要求，避免为了订阅盲目开卡或购买礼品卡。", [
    section("没有海外卡，不等于只剩代充", `<p>先区分“没有信用卡”和“没有任何符合条件的付款方式”。符合条件的借记卡或应用商店购买可能是另一条路径，但能否使用要以实际结算和发行机构规则为准。</p>${region}`),
    section("情况一：人在支持地区，有当地付款方式", `<p>查看官方结算页接受的方式，联系发卡机构确认国际线上交易和订阅扣款权限。不要只因为卡不是信用卡就放弃核查，也不要购买别人代填的虚假账单地址。</p>`),
    section("情况二：已有可购买的官方手机 App", `<p>检查 App 内升级页面是否显示可购买套餐，确认 ChatGPT 账号与商店账号都正确，再核对商店付款方式。不要先买礼品卡再验证能否订阅；商店余额、地区和订阅条件需要先确认。</p>`),
    section("情况三：准备比较第三方充值", `<p>先看自有账号交付、是否需要 Session、失败退款和续费规则。第三方支持微信或支付宝并不改变官方地区限制。若无法接受其资料要求，应停止，不要因为已经付钱而被动提供更多账号权限。</p><p>下一步可查看<a href="/chatgpt-plus-recharge-2026-alipay-wechat/">付款前核对清单</a>。</p>`),
    section("暂时没有合适路径时", `<p>保留原账号和现有服务，先不要购买陌生卡片、成品号或大额商店余额。把“地区支持、可用付款方式、资料要求、售后”逐项确认后再决定，避免为解决一个支付问题增加多笔无法退回的成本。</p>`),
    next([["chatgpt-plus-domestic-payment-2026", "三类渠道费用与管理对照"], ["chatgpt-payment-declined", "已有卡但付款失败的排查"]]),
  ], source("payment", "regions")),
  "chatgpt-payment-declined": post("ChatGPT 支付失败怎么办？按报错、扣款和订阅状态排查", "区分银行卡被拒、验证失败、已扣款未到账和续费失败，按现象定位 ChatGPT 付款问题并准备支持材料。", [
    section("先记录现象，再决定找谁", `<p>先保存错误原文、出现时间、购买渠道和是否实际扣款。不要只记录“付款失败”：银行拒绝、验证中断、订单未同步需要不同处理。</p>`),
    section("按现象进入对应处理", table(["现象", "先做什么", "下一步"], [["Your card was declined", "核对卡片资料与余额，联系银行确认拒绝原因", '<a href="/chatgpt-plus-card-declined-reasons/">卡片被拒专项排查</a>'], ["3DS / authentication 报错", "检查银行验证是否完成、页面是否拦截跳转", "按下方验证步骤处理"], ["已扣款，账号仍是 Free", "核对购买账号、渠道和收据", '<a href="/chatgpt-plus-after-open-check/">到账检查</a>'], ["之前可用，本次续费失败", "核对原渠道的续费通知与付款资料", '<a href="/chatgpt-plus-renewal-failed/">续费排查</a>']])),
    section("验证窗口打不开或中途退出", `<p>先允许银行验证弹窗和重定向，完成短信或银行 App 的确认。验证期间不要刷新结算页。无法出现提示时，联系银行确认 3DS 验证权限；换浏览器只用于排除页面问题，不能改变地区或卡片本身的条件。</p>`),
    section("已扣款却未到账", `<p>先确认收据对应的账号和购买渠道；银行卡通知也可能是待处理授权，是否入账需向银行或收款方核实。应用内购买可检查恢复购买入口。第三方订单联系商家查询；官方购买联系官方支持。不要把重复购买当作恢复订阅的方法。</p>`),
    section("联系支持时提供什么", `<ul><li>报错原文与大致时间，注明时区。</li><li>付款渠道和订单或收据编号，通过该渠道的正式支持入口提交。</li><li>目前计划状态，以及已经尝试过的排查步骤。</li><li>截图先遮住完整卡号、地址和其他个人信息，不提交密码、验证码、Cookie 或完整 Session。</li></ul>`),
    next([["chatgpt-plus-billing-address", "账单地址应如何核对"], ["chatgpt-plus-payment-checklist", "付款前检查清单"]]),
  ], source("payment", "plus")),
  "chatgpt-plus-card-declined-reasons": post("Your card was declined：ChatGPT 银行卡被拒排查", "ChatGPT 提示 Your card was declined 时，按卡片信息、银行限制、3DS 和支持地区逐项检查，而不是反复换地址试卡。", [
    section("这条错误能说明什么", `<p>它说明本次卡片付款未通过，并不能仅凭这一行字确定账号被封、卡片永久失效或余额不足。拒绝细节通常需要向发卡机构确认。</p>`),
    section("先检查卡片与银行资料", `<ol><li>核对有效期、卡片信息和余额是否正确。</li><li>账单地址使用银行或发卡机构登记的信息，不使用网上复制的地址。</li><li>向银行说明本次交易时间和商户，请其核查线上、国际或周期付款限制。</li><li>若有银行验证要求，确认是否完成，不向商家提供银行验证码。</li></ol>`),
    section("给银行的询问模板", `<blockquote><p>我在购买在线订阅时收到卡片被拒提示，交易时间是［日期、时间与时区］。请核查是否存在交易拦截、国际或周期付款限制，以及是否需要完成银行身份验证。若有拒绝原因，请说明我应修改哪一项。</p></blockquote><p>通过银行官方渠道联系，模板不需要包含完整卡号或 CVC。</p>`),
    section("再核对地区资格", `<p>付款工具可用与服务地区符合要求是两件事。核查所在地和发卡地区是否满足官方条件；更换浏览器、编造地址或购买虚拟卡都不能证明这些条件已满足。</p>${region}`),
    section("银行确认无拦截后仍失败", `<p>将错误、交易时间和已完成的核查整理给官方支持。不同失败原因没有统一的“等几小时必恢复”规则，也没有保证通过的卡段；本文不提供成功率承诺。</p>`),
    next([["chatgpt-payment-declined", "其他付款与到账问题"], ["chatgpt-plus-billing-address", "账单地址核对"]]),
  ], source("payment", "regions")),
  "plus-vs-pro": post("ChatGPT Plus 和 Pro 区别：价格、额度与升级选择", "核对 ChatGPT Plus、Pro 两档官方价格与额度差异，按使用需求选择，并区分官方价格和第三方人民币报价。", [
    section("先按实际使用选择", `<p>如果目前没有持续遇到额度限制，先判断现有计划是否已能完成任务。需要更高额度或 Pro 能力时，再比较升级成本。价格相差多少可以计算，是否值得则取决于你实际节省的时间。</p>`),
    section("官方套餐对照", table(["套餐", "官方美元月费", "选择依据"], [["Plus", "$20", "日常任务，需要比免费版更高的使用额度"], ["Pro 较低额度档", "$100", "需要 Pro 能力；官方说明为 Plus 的 5 倍用量档"], ["Pro 较高额度档", "$200", "持续高强度任务；官方说明为 Plus 的 20 倍用量档"]]) + `<p>以上为核验日官方说明，不是本站报价。税费、币种和最终金额看结算页；具体模型可能有独立额度，5 倍或 20 倍不表示所有功能均按同一比例增加。API 单独计费。</p>`),
    section("用一周记录判断是否需要升级", `<ol><li>记录遇到限制的任务类型和次数。</li><li>区分额度不足、输出效果和提示方式问题，升级不保证回答正确。</li><li>估算等待或中断影响的工作时间。</li><li>查看目标套餐是否明确增加你需要的能力，再决定是否升级。</li></ol>`),
    section("官方价格与第三方报价分开看", `<p>第三方人民币报价包含商家定价和交付条件，不能直接当作官方美元月费的固定换算。比较时同时核对账号类型、期限、升级是否覆盖原订阅，以及异常处理规则。Plus 查看购买条件，Pro 先向商家确认具体档位与交付。</p>`),
    next([["chatgpt-pro", "Pro 升级前的账户与计费检查"], ["chatgpt-plus-cancel-manage", "取消和管理现有订阅"], ["chatgpt-plus", "Plus 开通流程"]]),
  ], source("plus", "pro"), { product: "plus" }),
  "chatgpt-plus-cancel-manage": post("ChatGPT 怎么取消订阅？网页、Apple、Google 操作入口", "按原购买渠道取消 ChatGPT 自动续费，核对到期时间，区分取消与退款，并处理找不到订阅的情况。", [
    section("先找收据，确认谁在扣费", `<p>取消入口由购买渠道决定。卸载 App 不会停止续费；取消也不等于退款。先查看最近的收据，确认款项来自网页、Apple、Google 还是第三方订单。</p>`),
    section("网页购买：在 ChatGPT 账单中取消", `<ol><li>登录购买时的 ChatGPT 账号。</li><li>打开账号菜单，进入 Settings（设置）。</li><li>进入 Billing（账单），在 Cancel plan 下选择取消。</li><li>保存确认结果，并核对到期日期。</li></ol><p>入口文案可能调整，找不到时以文末官方说明为准。</p>`),
    section("Apple 购买：在系统订阅中取消", `<p>在 iPhone 或 iPad 打开“设置”，点击自己的姓名，进入“订阅”，选择 ChatGPT，再取消并确认。若只显示到期日期且没有取消按钮，先核查是否已经取消。删除 ChatGPT 账号不能替代取消 Apple 的订阅。</p>`),
    section("Google Play 购买：回到商店管理", `<p>使用购买时的 Google 账号进入 Google Play 的订阅列表，选择 ChatGPT 并取消，完成确认。也可以在 <a href="https://play.google.com/store/account/subscriptions" rel="noopener" target="_blank">Google Play 网页订阅管理</a>中处理。</p>`),
    section("第三方订单：核对订单约定和旧订阅", `<p>向实际商家确认是否存在自动扣费、是否只是单次交付及到期处理方式。同时检查此前官方或商店订阅是否仍在续费。不能把另一笔充值成功理解成旧扣费已取消。</p>`),
    section("取消后还要检查什么", `<p>官方建议至少提前 24 小时取消，避免进入下一账期。取消后通常可用至已付账期结束；以取消确认页为准。需退款时另走收款渠道的退款流程。</p><p>找不到订阅时，回到收据核对账号和渠道，尤其检查是否使用 Apple 隐藏邮箱或另一个 Google 账号购买。</p>`),
    next([["chatgpt-plus-renewal-failed", "续费失败处理"], ["chatgpt-plus-after-open-check", "计划状态与收据检查"]]),
  ], source("cancel"), { showCta: false }),
  "chatgpt-plus-account-safety": post("ChatGPT 充值账号安全：密码、Session 与交付边界", "区分密码、验证码与 Session 的账号访问风险，核对第三方充值的信息要求、资料留存和异常处理。", [
    section("不提供密码也可能授予账号访问能力", safety),
    section("下单前应询问的内容", `<ul><li>需要哪些字段，为什么必须提供？</li><li>是否会接触聊天、文件或账单，是否提供明确说明？</li><li>资料保存多久，能否要求删除？</li><li>无法接受信息要求时，付款前能否退出？</li></ul><p>不要通过公开群聊或不明链接提交身份凭据。不能明确说明资料用途的流程，应先停止。</p>`),
    section("发现异常时", `<p>停止继续提交信息，通过官方账号安全设置检查登录设备并结束可疑会话；使用官方支持渠道报告异常。更改密码与退出登录的实际影响取决于认证方式，不应假定一次操作能撤销所有已泄露的凭据。</p>`),
    next([["chatgpt-plus-recharge-2026-alipay-wechat", "购买步骤与交付核对"], ["chatgpt-plus-cancel-manage", "账单和续费管理"]]),
  ], source("merchant"), { showCta: false }),
};
