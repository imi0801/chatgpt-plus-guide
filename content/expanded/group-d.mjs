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

export const posts = {
  "chatgpt-plus-change-account": post("换账号或换邮箱后 ChatGPT Plus 还在吗？订阅能转移吗", "ChatGPT Plus 换邮箱、换账号后订阅是否保留？说明订阅绑定账号的规则、改邮箱与新注册的区别、Apple 隐藏邮箱、两个账号同时扣费和代充到错账号的处理，以及想转给别人时的正确做法。", [
    section("先说结论：订阅跟着账号走，不跟着人走", `${lead("ChatGPT Plus 绑定的是具体的 ChatGPT 账号，不是付款人本人。在同一个账号里修改邮箱，订阅通常会跟着账号保留；另外注册一个新账号，原账号的 Plus 不会自动转过去。")}<p>很多人把“账号”“邮箱”“付款卡”当成一回事，实际上是三样东西。OpenAI 按账号记录订阅状态、聊天记录和账单；邮箱只是这个账号的登录标识之一；付款卡只是扣款来源。换卡不影响订阅归属，换邮箱要看是“同一个账号改邮箱”还是“换了一个账号”，这两种情况结果完全不同。</p><p>截至核验日，OpenAI 帮助中心没有提供把 Plus 订阅从一个账号直接转移到另一个账号的功能。遇到需要“转移”的场景，实际做法只有两种：在原账号上继续用，或者在原账号取消续费、在新账号重新订阅。</p>`),
    section("改邮箱和新注册账号的区别", `${table(["操作", "账号是否还是原来那个", "Plus 是否保留", "聊天记录"], [["在账号设置里修改登录邮箱", "是", "通常保留，以改完后的计划状态为准", "保留"], ["用新邮箱另外注册账号", "否，是新账号", "不会转移，新账号为 Free", "不会带过去"], ["同一邮箱换登录方式（如从密码改用 Google 登录）", "通常是同一账号", "通常保留", "保留"], ["原账号删除后用同一邮箱再注册", "否", "不会恢复", "不会恢复"]])}<p>修改邮箱的入口是否存在、能否使用，取决于账号类型和登录方式，<strong>以账号设置内实际显示为准</strong>。部分通过第三方身份登录的账号可能无法直接改邮箱。改完后回到设置页确认计划仍显示 Plus，再看一次下一计费日期。</p>${callout("warn", `<p>删除账号不是“换邮箱”的方法。删除后订阅、聊天记录和文件都会一并失去，且帮助中心说明被删除账号的邮箱在一段时间内可能无法重新注册。删除前务必先取消续费，并按<a href="/chatgpt-plus-cancel-manage/">取消订阅指南</a>确认状态。</p>`)}`),
    section("Apple / Google 登录的隐藏邮箱问题", `<p>用“通过 Apple 登录”注册时，如果当时选择了隐藏邮箱，ChatGPT 账号里记录的是一个 Apple 中转地址（形如随机字符 @privaterelay.appleid.com），而不是你平时用的邮箱。之后你用真实邮箱去登录或注册，系统会认为这是另一个账号，于是看起来像“Plus 不见了”。</p><p>排查方法很简单：</p><ol><li>先用当初的登录方式登录（点“Continue with Apple”或“Continue with Google”，而不是手动输邮箱）。</li><li>进入设置查看账号邮箱，记下它显示的是哪个地址。</li><li>在 Apple ID 设置里的“通过 Apple 登录”列表中，可以看到 ChatGPT 对应的中转邮箱。</li><li>找收据、联系客服时都用这个账号邮箱，而不是付款卡绑定的邮箱。</li></ol><p>Google 登录不会生成中转邮箱，但如果你有多个 Google 账号，也经常出现“用错了 Google 账号登录”的情况。确认右上角头像对应的邮箱，比看昵称可靠。更多开通后的核对项见<a href="/chatgpt-plus-after-open-check/">开通后检查清单</a>。</p>`),
    section("两个账号都在扣费怎么处理", `<p>换账号最常见的后果是：新账号订了 Plus，旧账号的订阅也没停，每月被扣两次。处理顺序如下：</p><ol><li>分别登录两个账号，在设置里查看各自的计划状态和购买渠道（网页、Apple 或 Google）。</li><li>决定保留哪一个，另一个按购买渠道取消续费：网页订阅在 ChatGPT 设置的账单管理里取消，Apple 订阅在 iPhone 设置的订阅里取消，Google 订阅在 Google Play 的订阅里取消。</li><li>取消后，当前已付的周期一般会用到期末，不会立即降级。</li><li>如果重复扣费的周期几乎没用过，可以通过实际收款方的渠道申请退款，结果以对方审核为准，具体见<a href="/chatgpt-refund/">退款说明</a>。</li></ol><p>注意“取消订阅”和“停止自动续费”在不同渠道的叫法不同，确认页面显示的是“将于某日到期”而不是“下次扣款某日”，才算真正关掉。可参考<a href="/chatgpt-auto-renew-off/">关闭自动续费</a>一文逐项核对。</p>`),
    section("第三方代充到了别的账号怎么办", `<p>通过第三方代充时，如果提交的账号信息有误，或者商家操作到了错误的账号，Plus 会落在那个账号上，OpenAI 侧无法帮你把它移到另一个账号。能做的只有联系商家：</p><ul><li>保存订单号、付款记录、你提交的账号邮箱截图。</li><li>确认错误出在哪一方：是你提交错了，还是商家操作错了。售后规则往往按这个区分。</li><li>询问商家能否撤销或重新交付，以及需要你再次提供什么信息。</li></ul><p>如果当时提交过 Session 或密码，处理完毕后建议在账号安全设置里检查登录设备并退出陌生会话，思路见<a href="/chatgpt-plus-account-safety/">账号安全注意事项</a>。不要为了“补救”再次把完整凭据发到公开群聊或不明页面。</p>`),
    section("想把 Plus 转给别人：只能取消再由对方订阅", `<p>把自己账号里的 Plus 转给家人、同事，截至核验日没有官方转赠入口。可行做法是：</p><ol><li>在你的账号里取消续费，当前周期到期后自动回到 Free。</li><li>对方在自己的账号里用自己的付款方式重新订阅。</li></ol><p>直接把自己的账号交给对方使用也能“转”过去，但聊天记录、上传文件、记忆内容和账单都会一并交出，并且后续取消、退款仍要通过账号所有者。多人共用一个账号还涉及使用条款与登录安全问题，对比可见<a href="/chatgpt-plus-own-account-vs-shared/">自有账号与共享账号的区别</a>。团队内多人需要付费功能时，更合适的是按席位计费的 <a href="/chatgpt-team-plan/">Team 方案</a>。</p>${callout("tip", `<p>需要在新账号上重新开通、但手头没有能用于官方结算的海外卡时，可以先比较<a href="/without-credit-card/">没有海外卡的购买路径</a>，再决定走哪条。</p>`)}`),
    next([["chatgpt-plus-cancel-manage", "按购买渠道取消 ChatGPT Plus"], ["chatgpt-plus-after-open-check", "开通后检查清单"], ["chatgpt-plus-account-safety", "账号安全与 Session 注意事项"], ["chatgpt-refund", "ChatGPT 退款怎么申请"]]),
  ], source("plus", "cancel", "billing"), {
    summary: ["Plus 绑定账号，不绑定付款人或付款卡", "同一账号改邮箱通常保留订阅，新注册账号不会继承", "没有官方转赠入口，只能取消后由对方自行订阅"],
    faq: [
      ["换了付款卡，Plus 会断吗？", "不会因为换卡本身中断。订阅归属在账号上，付款卡只是扣款来源。只要新卡在下个计费日能正常扣款，订阅就会继续；扣款失败才可能导致降级。"],
      ["用 Apple 登录后找不到订阅，是被取消了吗？", "多半是登录成了另一个账号。先用“通过 Apple 登录”按钮登录，查看设置里的账号邮箱是否是 Apple 中转地址，再确认该账号的计划状态。"],
      ["新账号能继承旧账号的聊天记录吗？", "不能直接继承。可以在旧账号的数据控制里导出数据留档，但导出内容不会自动导入新账号。"],
      ["旧账号取消后还能用到什么时候？", "通常可以用到当前已付周期结束，之后回到 Free。具体日期以账单管理页或应用商店订阅页显示的到期日为准。"],
      ["代充时填错了账号邮箱怎么办？", "OpenAI 侧无法移动订阅，需要联系商家处理。保留订单号和提交记录，问清对方能否撤销或重新交付，按商家售后规则执行。"],
      ["可以把 Plus 送给朋友吗？", "截至核验日没有官方转赠或礼品入口。朋友需要在自己的账号上用自己的付款方式订阅，或通过其他渠道购买并自行承担对应条件。"],
    ],
    changelog: [["2026-09-19", "新增：说明换账号、改邮箱对 Plus 订阅的影响，以及重复扣费与代充错账号的处理。"]],
    product: "plus",
    showCta: false,
    howto: { name: "换账号前后如何确认 Plus 归属", steps: [["确认登录方式", "用当初注册时的方式登录，查看设置里的账号邮箱"], ["核对计划状态", "在设置中确认哪个账号显示 Plus 及其购买渠道"], ["取消多余订阅", "对不需要的账号按购买渠道取消续费"], ["在目标账号订阅", "确认旧账号已停止续费后再在新账号开通"]] },
  }),

  "chatgpt-upgrade-button-not-working": post("ChatGPT 升级按钮灰色、点了没反应怎么办？8 种原因", "ChatGPT 升级按钮是灰色、点了没反应或打不开结算页，常见 8 种原因：地区不支持、已是 Plus、浏览器拦截、网络环境、账号受限、App 内购买未同步、Team 账号、页面故障。附排查顺序与各自处理方法。", [
    section("升级按钮点不动，先判断是哪一类问题", `${lead("ChatGPT 升级按钮灰色、点了没反应或打不开结算页，原因大致分两类：一类是账号或地区本身不满足购买条件，另一类是浏览器、网络或页面的临时问题。前一类换浏览器也没用，后一类清缓存、换浏览器通常就能排除。")}<p>动手之前先记下具体现象：是按钮根本不显示、显示但为灰色、点了没反应、跳转后白屏，还是结算页打开后报错。现象不同，对应的原因也不同。结算页打开后付款被拒属于另一个问题，请看<a href="/chatgpt-payment-declined/">支付被拒排查</a>。</p><p>截至核验日，中国大陆未列入 OpenAI 的 ChatGPT 支持地区。地区条件是购买的前提，任何浏览器设置都不会改变它，下文不提供绕过地区限制的方法。</p>`),
    section("8 种常见原因与处理", `${table(["原因", "典型表现", "处理方式"], [["所在地区不支持购买", "按钮不显示或提示不可用", "查看官方支持地区列表，按规则选择合规渠道"], ["账号已经是 Plus", "只显示管理订阅，没有升级", "到设置查看当前计划，避免重复购买"], ["浏览器插件或设置拦截", "点击无反应、弹窗被拦", "关闭广告拦截与隐私插件，允许弹窗后重试"], ["网络环境或代理节点异常", "结算页加载慢、白屏或报错", "检查网络连接稳定性，节点所在地区与规则见官方说明"], ["账号处于受限状态", "功能入口缺失或提示账号问题", "查看邮件与账号内提示，按官方指引处理"], ["App 内购买未同步", "手机已扣费，网页仍提示升级", "在 App 内使用恢复购买，确认同一账号"], ["Team / 企业工作区", "个人升级入口不存在", "切回个人工作区，或联系工作区管理员"], ["页面临时故障", "多人同时反映、刷新后恢复", "查看官方状态页，稍后再试"]])}<p>表里前两项和 Team 工作区属于“条件不满足”，浏览器相关的三项属于“环境问题”，账号受限和购买未同步要结合账号内提示判断。</p>`),
    section("地区、已订阅、Team：条件类原因", `<p><strong>地区不支持。</strong>OpenAI 只在其列出的支持地区提供 ChatGPT 服务与购买。如果系统判断当前访问不在支持范围内，升级入口可能直接不出现，或点进去后提示不可用。这是官方规则层面的限制，不是按钮坏了，具体说明见<a href="/chatgpt-not-available-in-your-country/">地区不可用提示怎么办</a>。</p><p><strong>已经是 Plus。</strong>如果账号已有有效订阅（包括在 iPhone 或安卓 App 里买的），网页上通常只会显示管理订阅，而不是升级。先到设置里看当前计划，防止同一账号或不同渠道重复购买。</p><p><strong>Team 或企业工作区。</strong>在 Team、Enterprise 等工作区里，计费由管理员统一处理，成员界面通常没有个人升级按钮。左上角或账号菜单里可以切换工作区；切回个人账号后才会看到个人计划。想了解团队方案，可看 <a href="/chatgpt-team-plan/">ChatGPT Team 说明</a>，价格按席位计费，以<a href="https://openai.com/chatgpt/pricing/" target="_blank" rel="noopener">官方定价页</a>为准。</p>`),
    section("浏览器、网络与页面：环境类原因", `<p><strong>浏览器拦截。</strong>广告拦截、隐私保护、脚本屏蔽类插件可能挡住结算页所需的脚本或弹窗，表现为点击后毫无反应。可以先暂停这些插件，允许 chatgpt.com 的弹窗和第三方 Cookie，然后刷新重试。</p><p><strong>网络环境或代理节点问题。</strong>网络不稳定会导致结算页加载失败、白屏或反复转圈。另外，访问所用的网络出口地区也会被纳入风控和地区判断，频繁切换出口可能触发额外验证。这里只说明规则：地区判断方式以 OpenAI 官方说明为准，本站不提供切换地区的操作建议。</p><p><strong>页面临时故障。</strong>OpenAI 有时会在高峰期或发布更新时出现结算服务异常。可以查看官方状态页或稍后再试。如果多人在同一时间反映同样问题，基本可以判断是临时故障，不必改动账号设置。</p>${callout("note", `<p>换浏览器、开无痕模式只能帮你排除插件、缓存和 Cookie 造成的页面问题，不会改变账号所在地区或购买资格。无痕模式下仍然打不开，说明问题不在浏览器本身，应回头检查条件类原因。</p>`)}`),
    section("账号受限与 App 内购买未同步", `<p><strong>账号受限。</strong>如果账号因为安全验证未完成、疑似违规或风控原因处于受限状态，部分功能入口可能消失。先看注册邮箱里有没有来自 OpenAI 的通知，以及账号内是否有提示横幅。处理方式以官方邮件和账号内提示为准，不要用新注册账号反复尝试付款，否则可能让情况更复杂。相关情况可参考<a href="/chatgpt-account-banned-subscription/">账号被封后订阅怎么处理</a>。</p><p><strong>App 内购买未同步。</strong>在 iPhone 或安卓上通过应用商店订阅后，网页端偶尔会延迟显示。先确认手机 App 和网页登录的是同一个账号（看邮箱，不看昵称），再在 App 设置里找“恢复购买”一类的入口。同步前不要在网页端再付一次，否则会出现两个渠道同时扣费。更多开通后核对项见<a href="/chatgpt-plus-after-open-check/">开通后检查清单</a>。</p>`),
    section("推荐的排查顺序", `<ol><li>登录后先看设置里的当前计划：已经是 Plus 就停止购买操作。</li><li>确认当前是个人工作区而不是 Team 工作区。</li><li>对照官方支持地区列表，确认自己的情况是否满足购买条件。</li><li>检查邮箱和账号内是否有受限或验证提示。</li><li>暂停浏览器插件，允许弹窗，刷新页面；仍不行就换一个浏览器或无痕模式试一次。</li><li>检查网络是否稳定，避免在加载途中频繁切换网络。</li><li>查看官方状态页，确认是否为临时故障。</li><li>以上都排除后，保存截图与报错文字，通过帮助中心联系官方支持。</li></ol><p>排查过程中不要连续多次点击付款或反复提交卡片信息，这可能触发发卡行或支付服务商的风控，反而造成<a href="/chatgpt-plus-card-declined-reasons/">卡被拒</a>。</p>`),
    section("官方入口用不了时的其他选择", `<p>如果排查后确认是地区或付款条件不满足，换浏览器、清缓存都不会让升级按钮恢复。这时应先确认自己是否在官方支持地区内使用，再考虑其他合规购买渠道，例如应用商店订阅是否在你所在地区提供。</p><p>没有能用于官方结算的海外卡时，可以比较<a href="/chatgpt-plus-recharge-2026-alipay-wechat/">第三方充值的条件与风险</a>。第三方服务不会改变官方地区限制，下单前要问清交付方式、是否需要提交账号凭据以及售后规则。</p>`),
    next([["chatgpt-payment-declined", "ChatGPT 付款被拒排查"], ["chatgpt-plus-common-errors", "ChatGPT Plus 常见报错"], ["chatgpt-not-available-in-your-country", "地区不可用提示怎么办"], ["chatgpt-plus-payment-checklist", "付款前检查清单"]]),
  ], source("plus", "regions", "billing", "team"), {
    summary: ["先分清条件类原因与浏览器、网络等环境类原因", "换浏览器或无痕模式只排除页面问题，不改变地区", "已是 Plus 或处于 Team 工作区时不会显示个人升级"],
    faq: [
      ["升级按钮是灰色的，是账号被封了吗？", "不一定。更常见的是已经订阅、处于 Team 工作区或地区条件不满足。先看设置里的当前计划和工作区，再查看邮箱与账号内是否有受限提示。"],
      ["无痕模式能打开结算页，正常模式不行，怎么办？", "说明问题出在插件、缓存或 Cookie。逐个停用插件并清除 chatgpt.com 的站点数据后重试，找到冲突的插件即可。"],
      ["手机 App 里能升级，网页不行，可以在 App 里买吗？", "可以按应用商店规则购买，但收款方是 Apple 或 Google，后续管理和退款也要回到应用商店。确认网页端没有同时订阅，避免重复扣费。"],
      ["在 Team 工作区能给自己单独开 Plus 吗？", "Team 工作区内不提供个人升级。需要切换到个人账号或个人工作区后再查看升级入口，具体以界面显示为准。"],
      ["结算页一直转圈，要不要多点几次？", "不要。连续提交可能触发支付风控，导致卡被拒或重复扣款。先检查网络和插件，稍后刷新重试，并留意银行是否已有扣款记录。"],
      ["第三方代充能解决升级按钮灰色的问题吗？", "代充只是换了付款方式，不会改变官方地区限制和账号状态。如果问题是账号受限或地区不支持，代充同样无法改变这些条件。"],
    ],
    changelog: [["2026-09-19", "新增：整理升级按钮灰色、无反应、结算页打不开的 8 种原因与排查顺序。"]],
    product: "plus",
    howto: { name: "排查 ChatGPT 升级按钮无法使用", steps: [["查看当前计划", "在设置中确认账号是否已是 Plus"], ["确认工作区", "切换到个人工作区而非 Team 工作区"], ["核对地区条件", "对照官方支持地区列表确认购买条件"], ["排除浏览器问题", "停用插件、允许弹窗、换浏览器或无痕模式重试"], ["检查网络与状态页", "保持网络稳定并查看官方状态页"], ["联系官方支持", "保存截图与报错文字后通过帮助中心反馈"]] },
  }),

  "chatgpt-invoice-receipt": post("ChatGPT 发票怎么开？收据下载、报销与代充开票", "ChatGPT 发票怎么开：官方收据在账单管理页下载，是 OpenAI 的英文收据而非国内增值税发票。说明报销要点、公司抬头填写、Apple / Google 收据位置、第三方代充能否开票与企业采购选择。", [
    section("先说结论：官方只提供英文收据，不开国内增值税发票", `${lead("ChatGPT Plus 的官方票据是 OpenAI 通过账单系统出具的 invoice / receipt，可在账号设置的账单管理页下载。它不是中国大陆的增值税发票，能否用于报销取决于你所在公司的财务制度。")}<p>很多人搜“ChatGPT 发票”，其实想解决两件事：拿到能证明付过款的凭证，以及让公司认可这笔费用。第一件事通过官方收据就能完成；第二件事不在 OpenAI 的控制范围内，需要提前和财务确认境外电子收据是否可以入账。</p><p>票据由谁出具，取决于你在哪里付的钱：网页订阅由 OpenAI 出具，App 内订阅由 Apple 或 Google 出具，第三方代充则只能找商家。下面按渠道分别说明。</p>`),
    section("不同购买渠道的票据对比", `${table(["购买渠道", "票据出具方", "在哪里获取", "是否为国内增值税发票"], [["ChatGPT 网页订阅", "OpenAI", "设置 → 账单管理页，以及付款成功邮件", "否"], ["Apple App 内订阅", "Apple", "Apple ID 购买记录或 Apple 发送的收据邮件", "否"], ["Google Play 订阅", "Google", "Google Play 订单记录或收据邮件", "否"], ["第三方代充", "商家", "向商家询问，多数只提供订单凭证", "视商家资质而定"], ["Team 等企业方案", "OpenAI", "工作区管理员的账单管理页", "否，企业开票需求以官方说明为准"]])}<p>表中“否”指 OpenAI、Apple、Google 出具的都是其自身体系的电子收据，而不是国内税务系统的发票。是否有国内主体代为开票，要看具体渠道，不要默认存在。</p>`),
    section("官方网页订阅：在账单管理页下载收据", `<ol><li>登录已订阅的 ChatGPT 账号，打开设置。</li><li>找到账户或订阅相关的栏目，点击管理订阅或账单管理入口（入口文案以页面实际显示为准，常见路径是 Settings → Billing → Manage）。</li><li>跳转到账单管理页后，在账单历史里找到对应月份，下载 invoice 或 receipt 的 PDF。</li><li>也可以在注册邮箱中搜索 OpenAI 的付款成功邮件，邮件中通常附有收据链接。</li></ol><p>用 Apple 隐藏邮箱注册的账号，收据邮件会发到 Apple 中转地址，最终转发到你的 Apple ID 邮箱，搜索时注意这一点。账号与邮箱的关系可看<a href="/chatgpt-plus-change-account/">换账号或换邮箱后 Plus 还在吗</a>。</p>${callout("tip", `<p>如果需要在收据上显示公司名称、地址或税号，可在账单管理页查看是否提供填写账单信息的选项。能填写哪些字段、是否会体现在已开出的历史收据上，以页面实际显示为准。建议在付款前或下一个计费周期前补填。</p>`)}`),
    section("拿官方收据去报销要注意什么", `<p>OpenAI 的收据是英文电子凭证，金额以美元计价，列出的主体是 OpenAI。拿去报销前，建议先和财务确认以下几点：</p><ul><li>公司是否接受境外电子收据或形式发票作为报销凭证。</li><li>是否需要同时提供信用卡账单或银行扣款记录，证明实际付款金额与汇率。</li><li>收据抬头是否必须是公司名称，还是个人名义也可以。</li><li>按月订阅的费用是否需要事先审批，归入哪个费用科目。</li></ul><p>官方标价是每月 20 美元，实际收据金额可能包含当地税费，以收据为准。信用卡账单上的人民币金额还会受汇率与外币手续费影响，两者对不上时，一般以银行扣款记录说明实际支出。价格口径可参考<a href="/chatgpt-plus-price-cny/">Plus 人民币价格说明</a>。</p>`),
    section("Apple / Google 渠道：收据在商店", `<p>通过 iPhone 或安卓 App 订阅时，收款方是 Apple 或 Google，ChatGPT 的账单管理页不会有这笔订单的收据。</p><ul><li><strong>Apple：</strong>在 Apple ID 的购买记录中可以查到订阅扣款，Apple 也会向 Apple ID 邮箱发送收据邮件。</li><li><strong>Google：</strong>在 Google Play 的订单记录中查看，收据会发送到购买所用的 Google 账号邮箱。</li></ul><p>同样地，退款、取消和更换付款方式也都在商店侧处理，详见<a href="/chatgpt-plus-cancel-manage/">按渠道管理订阅</a>和<a href="/chatgpt-plus-mobile-app-vs-web/">App 与网页订阅的区别</a>。如果公司需要统一格式的凭证，网页订阅的 OpenAI 收据通常比商店收据更容易说明用途。</p>`),
    section("第三方代充能不能开发票", `<p>第三方代充的交易对象是商家，OpenAI 不会为这笔交易出具任何票据，你的 ChatGPT 账单管理页里也可能看不到对应记录。能否开票完全取决于商家：</p><ul><li>多数商家只能提供订单截图、付款记录等订单凭证。</li><li>少数有经营资质的商家可能提供国内发票，但开票内容、税率和抬头需要事先确认。</li><li>下单前就问清能否开票、开什么类型、多久开出，而不是付款后再补。</li></ul><p>需要报销时，第三方订单凭证能否被财务认可，同样要先问财务。代充的其他条件和风险可参考<a href="/chatgpt-plus-recharge-2026-alipay-wechat/">第三方充值指南</a>，没有海外卡时也可以先看<a href="/without-credit-card/">购买路径对比</a>。</p>`),
    section("企业采购：更适合看 Team", `<p>如果是公司为多名员工购买，逐个报销个人 Plus 的收据会让财务处理变得繁琐。ChatGPT Team 由工作区统一付款、按席位计费，账单集中在管理员账号下，更方便对账；具体价格以<a href="https://openai.com/chatgpt/pricing/" target="_blank" rel="noopener">官方定价页</a>为准。</p><p>企业是否能获得特定格式的发票，或者是否支持对公付款方式，以 OpenAI 官方说明和销售渠道答复为准。选择前可以先看 <a href="/chatgpt-team-plan/">ChatGPT Team 说明</a>，以及<a href="/chatgpt-plus-for-office/">办公场景怎么选</a>。</p>`),
    next([["chatgpt-plus-cancel-manage", "按渠道管理和取消订阅"], ["chatgpt-team-plan", "ChatGPT Team 是什么"], ["chatgpt-plus-price-cny", "Plus 人民币价格说明"], ["chatgpt-refund", "ChatGPT 退款怎么申请"]]),
  ], source("billing", "cancel", "pricing", "team"), {
    summary: ["网页订阅收据在账单管理页下载，是英文电子收据", "官方收据不是国内增值税发票，能否报销看公司财务", "App 渠道收据在商店，代充能否开票要问商家"],
    faq: [
      ["ChatGPT 能开增值税专用发票吗？", "官方渠道不提供中国大陆增值税发票，只有 OpenAI 出具的英文 invoice / receipt。第三方商家能否开具国内发票取决于其资质，需要下单前确认。"],
      ["历史收据在哪里找？", "网页订阅可在设置里的账单管理页查看账单历史并下载 PDF，也可以在注册邮箱中搜索 OpenAI 付款邮件。入口文案以页面实际显示为准。"],
      ["收据上能写公司名称吗？", "可以在账单管理页查看是否提供填写公司名称、地址或税号的选项，能填哪些字段、是否影响历史收据，以页面显示为准。"],
      ["iPhone 上订阅的，为什么网页账单页没有收据？", "App 内订阅由 Apple 收款，收据在 Apple ID 的购买记录和 Apple 发送的邮件里，ChatGPT 账单管理页不会显示这笔订单。"],
      ["收据金额和信用卡扣款金额不一致？", "收据以美元计价，可能含当地税费；信用卡账单上的人民币金额受汇率和外币手续费影响。报销时可同时附上银行扣款记录说明。"],
      ["公司多人使用，怎么开票更方便？", "可以考虑 Team 方案，由工作区统一付款、账单集中管理。对公付款与发票格式等要求，以 OpenAI 官方说明和销售答复为准。"],
    ],
    changelog: [["2026-09-19", "新增：说明官方收据下载位置、报销注意事项、商店与第三方渠道的票据差异。"]],
    product: "plus",
    howto: { name: "下载 ChatGPT Plus 官方收据", steps: [["打开设置", "登录已订阅账号并进入设置"], ["进入账单管理", "点击管理订阅或账单管理入口"], ["查找账单历史", "找到需要的月份"], ["下载收据", "下载 invoice 或 receipt 的 PDF 文件"]] },
  }),

  "chatgpt-not-available-in-your-country": post("ChatGPT not available 地区不可用怎么办？", "ChatGPT 提示 not available in your country 怎么办：这是地区限制而非账号问题。说明官方支持地区规则、已订阅用户遇到提示时如何确认订阅与扣费，以及合规选项。", [
    section("先说结论：这是地区限制，不是账号出了问题", `${lead("ChatGPT 提示 not available in your country 或 unsupported country，意思是系统判断当前访问所在地区不在 OpenAI 的服务支持范围内。它是地区层面的限制，并不代表账号被封禁或订阅被取消。")}<p>截至核验日，中国大陆未列入 OpenAI 的 ChatGPT 支持地区。这类提示在中国大陆用户中较常见，但也可能出现在其他未列入支持名单的地区。OpenAI 的支持地区名单会调整，以<a href="https://help.openai.com/en/articles/7947663-chatgpt-supported-countries" target="_blank" rel="noopener">官方支持地区页面</a>为准。</p><p>需要说明的是：本站只客观说明规则，不提供任何绕过地区限制的操作指导。使用服务时应遵守 OpenAI 的使用条款以及所在地的法律法规。</p>`),
    section("几种相似提示分别是什么意思", `${table(["提示或现象", "大致含义", "是否账号问题"], [["not available in your country", "当前访问地区不在服务范围内", "否，属于地区限制"], ["unsupported country / region", "注册、登录或付款时地区不受支持", "否，属于地区限制"], ["account deactivated / suspended", "账号被停用或受限", "是，需按官方邮件处理"], ["付款时提示卡片地区不支持", "付款方式所在国家不受支持", "否，属于付款条件"], ["页面空白或加载失败", "可能是网络或页面问题", "通常不是"]])}<p>先看清楚提示原文再判断。账号停用类提示和地区提示处理方式完全不同，账号问题见<a href="/chatgpt-account-banned-subscription/">账号被封后订阅怎么处理</a>，付款地区问题见<a href="/chatgpt-payment-declined/">付款被拒排查</a>。</p>`),
    section("网络出口地区与账号注册地区是什么关系", `<p>很多人以为账号在哪个地区注册，就一直按那个地区对待。实际上，OpenAI 的帮助中心说明服务在支持地区内提供，而系统在访问、登录和付款等环节都可能对当前所在地区作出判断。也就是说，注册时的地区不代表之后每一次访问都会被视为同一地区。</p><p>具体按哪些信息判断、各环节的判断规则是什么，OpenAI 没有公开完整细节，本站也不作推测，一切以官方规则和账号内提示为准。可以确定的是：</p><ul><li>账号能注册成功，不代表在任何地区都可以使用或付款。</li><li>付款方式的发卡国家与服务地区是两件事，需要分别满足条件，参考<a href="/chatgpt-plus-billing-address/">账单地址怎么填</a>中的说明。</li><li>在不受支持的地区访问，属于使用条款层面的问题，可能影响账号状态。</li></ul>${callout("warn", `<p>本站不提供切换网络出口、修改地区信息等操作建议。以规避地区限制为目的的做法可能违反服务条款，带来账号受限的风险，后果由使用者自行承担。</p>`)}`),
    section("已经订阅了，突然出现这条提示怎么办", `<p>已经是 Plus 用户却突然看到地区提示，最担心的是钱白花了。先冷静处理，按下面顺序确认：</p><ol><li><strong>不要反复切换地区或网络尝试登录。</strong>频繁变化的访问环境可能触发额外的安全验证，使情况更复杂。</li><li><strong>确认订阅状态。</strong>如果还能进入设置，查看计划是否仍显示 Plus、下一计费日期是什么。App 内订阅可以在 Apple 或 Google 的订阅页查看。</li><li><strong>确认扣费情况。</strong>检查信用卡或商店账单，看最近是否有新的扣款，避免在无法使用的情况下继续被自动续费。</li><li><strong>决定是否停止续费。</strong>如果短期内无法在支持地区使用，可以按购买渠道关闭自动续费，当前周期一般可用到期末，参考<a href="/chatgpt-auto-renew-off/">关闭自动续费</a>。</li><li><strong>保存证据并联系收款方。</strong>对扣费有疑问时，保存截图与收据，通过实际收款方的支持渠道咨询，退款以对方审核为准，见<a href="/chatgpt-refund/">退款说明</a>。</li></ol>`),
    section("第三方代充能不能解决这个提示", `<p>不能。第三方代充只是替你完成付款这一步，它改变的是“用什么方式付钱”，不改变 OpenAI 对服务地区的限制。即使通过代充开通了 Plus，在不受支持地区访问时，同样可能出现这条提示。</p><p>这一点在下单前要想清楚：付款条件和服务可用地区需要分别核对。购买第三方服务不会改变官方地区限制，商家也无法承诺在不支持的地区可以正常使用。代充需要交出的信息和风险，可参考<a href="/chatgpt-plus-account-safety/">账号安全注意事项</a>。</p>`),
    section("合规的选择有哪些", `<ul><li><strong>在支持地区使用：</strong>如果你因学习、工作或出行位于官方支持地区，可以在当地按正常渠道订阅和使用，付款方式也需满足当地条件。</li><li><strong>通过应用商店订阅：</strong>在支持地区的 Apple 或 Google 商店中，ChatGPT App 提供应用内订阅，是否可用以商店显示为准。</li><li><strong>组织统一采购：</strong>如果所在机构位于支持地区，可以了解由组织统一购买的 <a href="/chatgpt-team-plan/">Team 方案</a>，按席位计费，价格以官方定价页为准。</li><li><strong>暂停并等待：</strong>短期内无法满足条件时，先停止自动续费，避免持续扣款，之后条件满足再重新订阅。</li></ul><p>在满足地区条件的前提下，如果只是缺少可用于官方结算的海外卡，可以比较<a href="/without-credit-card/">没有海外卡时的购买路径</a>，但任何付款路径都不会改变地区规则。</p>`),
    next([["chatgpt-upgrade-button-not-working", "升级按钮灰色或点不动怎么办"], ["chatgpt-plus-cancel-manage", "按购买渠道取消订阅"], ["chatgpt-plus-account-safety", "账号安全注意事项"], ["faq", "ChatGPT 订阅常见问题"]]),
  ], source("regions", "cancel", "billing", "pricing"), {
    summary: ["这是地区限制提示，不代表账号被封或订阅被取消", "截至核验日中国大陆未列入官方支持地区", "第三方代充只改变付款方式，不改变地区限制"],
    faq: [
      ["出现 not available in your country 是账号被封了吗？", "不是。这是地区限制提示，表示当前访问地区不在服务范围内。账号被停用会有明确的停用提示或官方邮件，两者处理方式不同。"],
      ["中国大陆能正常使用 ChatGPT 吗？", "截至核验日，中国大陆未列入 OpenAI 的 ChatGPT 支持地区。支持名单可能调整，以官方支持地区页面为准。"],
      ["已经付费的 Plus 会自动退款吗？", "不会因为出现地区提示而自动退款。需要先确认订阅和扣费状态，必要时关闭自动续费，对扣费有疑问可联系实际收款方申请，结果以审核为准。"],
      ["代充的 Plus 在不支持的地区能用吗？", "代充只完成付款，不改变官方地区限制。在不支持的地区访问，同样可能出现这条提示，商家也无法改变官方规则。"],
      ["换一个新账号能解决吗？", "不能。地区提示与账号本身无关，新账号面对的是同样的地区规则。频繁注册新账号还可能触发风控，不建议这样尝试。"],
      ["支持地区名单会变吗？", "会调整。OpenAI 会更新支持的国家和地区列表，建议以帮助中心的官方支持地区页面为准，不要依赖过时的第三方名单。"],
    ],
    changelog: [["2026-09-19", "新增：解释地区不可用提示的含义、已订阅用户的处理顺序与合规选项。"]],
    product: "plus",
    showCta: false,
  }),
};

export const meta = [
  { slug: "chatgpt-plus-change-account", date: "2026-09-19", category: "账号安全", tags: ["换账号", "换邮箱", "订阅转移", "ChatGPT Plus"], product: "plus" },
  { slug: "chatgpt-upgrade-button-not-working", date: "2026-09-19", category: "支付问题", tags: ["升级按钮", "结算页", "排查", "ChatGPT Plus"], product: "plus" },
  { slug: "chatgpt-invoice-receipt", date: "2026-09-19", category: "ChatGPT 订阅", tags: ["发票", "收据", "报销", "ChatGPT Plus"], product: "plus" },
  { slug: "chatgpt-not-available-in-your-country", date: "2026-09-19", category: "账号安全", tags: ["地区限制", "unsupported country", "支持地区", "ChatGPT Plus"], product: "plus" },
];
