export const site = {
  title: "ChatGPT Plus 国内开通教程",
  subtitle: "ChatGPT Plus / Pro 订阅、支付被拒、无海外卡解决方案",
  author: "AI 订阅指南",
  description:
    "面向国内用户的 ChatGPT Plus 和 ChatGPT Pro 开通教程，覆盖订阅流程、支付被拒、无海外信用卡、Plus 与 Pro 区别等问题。",
  baseUrl: "https://imi0801.github.io/chatgpt-plus-guide",
  ctaBase:
    "https://www.goplus.pro?utm_source=github_pages&utm_medium=referral&utm_campaign=chatgpt_plus_guide",
  nav: [
    { label: "首页", href: "/" },
    { label: "归档", href: "/archives/" },
    { label: "标签", href: "/tags/" },
    { label: "分类", href: "/categories/" },
    { label: "站点地图", href: "/sitemap/" }
  ]
};

export const posts = [
  {
    slug: "chatgpt-plus",
    title: "国内开通 ChatGPT Plus 保姆级教程：没有海外卡也能解决订阅问题",
    description:
      "面向国内用户的 ChatGPT Plus 开通教程，讲清楚准备事项、开通流程、支付失败原因、账号安全和订阅确认方法。",
    date: "2026-08-22",
    updated: "2026-08-22",
    category: "ChatGPT 订阅",
    tags: ["ChatGPT Plus", "国内开通", "支付被拒", "无海外卡"],
    pinned: true,
    readingMinutes: 9,
    sections: [
      {
        h2: "一、为什么国内用户容易卡在 Plus 付款",
        html: `<p>很多人已经能正常登录 ChatGPT，也知道 Plus 能带来更稳定的使用体验，但最后一步经常卡在付款。常见情况包括银行卡被拒、虚拟卡无法扣款、账单地址不通过、没有海外信用卡，或者连续提交后触发风控。</p>
        <p><strong>这篇教程的目标很简单：让你先判断自己适不适合 Plus，再选择更稳的开通路径。</strong>如果你已经明确要开通，可以直接使用下面的入口。</p>`
      },
      {
        h2: "二、ChatGPT Plus 适合哪些人",
        html: `<ul>
          <li>每天都会使用 ChatGPT 写作、学习、办公、翻译或总结资料。</li>
          <li>需要更稳定的响应、更完整的工具能力和更高的使用额度。</li>
          <li>经常用 ChatGPT 辅助代码、表格、方案、脚本或图片生成。</li>
          <li>不想使用共享账号，希望把记录和资料留在自己的账号里。</li>
        </ul>
        <p>如果你只是偶尔使用 ChatGPT，可以先继续免费版。只要你已经把 ChatGPT 当成日常工作流的一部分，Plus 就更值得考虑。</p>`
      },
      {
        h2: "三、开通前准备",
        html: `<ol>
          <li><strong>一个可以正常登录的 ChatGPT 账号。</strong>先解决登录、验证、网络访问问题，再处理订阅。</li>
          <li><strong>明确要开通 Plus 还是 Pro。</strong>大多数新手先从 Plus 开始。</li>
          <li><strong>准备稳定支付路径。</strong>官方支付失败时，不建议短时间反复提交。</li>
          <li><strong>保留订阅记录。</strong>后续续费、售后、取消订阅都需要核对。</li>
        </ol>`
      },
      {
        h2: "四、推荐开通路径",
        html: `<p>如果你没有海外信用卡，或者官方支付页面一直失败，可以使用自助开通入口：</p>
        <p class="cta-line"><a href="__CTA__home_plus"><strong>www.goplus.pro</strong></a></p>
        <p>适合没有海外卡、银行卡 declined、虚拟卡失败、想使用微信或支付宝完成开通的用户。</p>`
      },
      {
        h2: "五、开通后怎么确认成功",
        html: `<ol>
          <li>回到 ChatGPT 页面并刷新。</li>
          <li>点击头像或设置入口。</li>
          <li>查看当前计划是否显示 Plus。</li>
          <li>检查模型、工具、额度是否发生变化。</li>
          <li>保存订单信息，方便后续续费或售后。</li>
        </ol>`
      },
      {
        h2: "六、不要忽视账号安全",
        html: `<p>不建议长期使用共享账号，也不建议把账号密码、验证码、Cookie 或 Session 交给陌生人。订阅开在自己的账号上，聊天记录、文件、项目上下文和工作内容都更稳定。</p>`
      }
    ]
  },
  {
    slug: "chatgpt-payment-declined",
    title: "ChatGPT Plus 支付被拒怎么办？银行卡 declined 和虚拟卡失败排查",
    description:
      "解释 ChatGPT Plus 支付被拒的常见原因，包括银行卡不支持、虚拟卡风控、账单地址不匹配、重复提交等，并给出处理建议。",
    date: "2026-08-22",
    updated: "2026-08-22",
    category: "支付问题",
    tags: ["支付被拒", "declined", "虚拟卡", "账单地址"],
    readingMinutes: 7,
    sections: [
      {
        h2: "一、支付被拒不一定是账号问题",
        html: `<p>ChatGPT Plus 或 Pro 付款失败，是国内用户最常见的问题之一。很多时候不是你操作错了，而是支付链路中的某个环节不匹配。</p>
        <p>比如银行卡不支持海外线上订阅、虚拟卡卡段被风控、账单地址不一致、网络环境异常，都会导致支付失败。</p>`
      },
      {
        h2: "二、常见失败原因",
        html: `<ul>
          <li><strong>银行卡不支持国际订阅：</strong>部分卡能日常消费，但不支持海外周期性扣款。</li>
          <li><strong>虚拟卡被风控：</strong>不同卡段、地区、余额和平台规则都会影响成功率。</li>
          <li><strong>账单地址不匹配：</strong>姓名、地区、邮编和卡片侧要求不一致时可能失败。</li>
          <li><strong>短时间重复提交：</strong>连续失败会增加后续风控概率。</li>
          <li><strong>网络环境不稳定：</strong>支付页面加载异常也会影响验证。</li>
        </ul>`
      },
      {
        h2: "三、正确处理顺序",
        html: `<ol>
          <li>已经失败多次时，先停止重复提交。</li>
          <li>确认卡片是否支持国际线上订阅。</li>
          <li>核对账单地址，不要反复复制不确定地址。</li>
          <li>必要时更换稳定开通路径。</li>
        </ol>`
      },
      {
        h2: "四、支付失败解决入口",
        html: `<p>如果你只是想完成 ChatGPT Plus / Pro 开通，可以直接使用自助入口：</p>
        <p class="cta-line"><a href="__CTA__payment_declined"><strong>www.goplus.pro</strong></a></p>`
      }
    ]
  },
  {
    slug: "chatgpt-pro",
    title: "ChatGPT Pro 国内怎么订阅？适合重度用户的开通指南",
    description:
      "说明 ChatGPT Pro 适合哪些用户、Plus 不够用时如何判断是否升级，以及国内用户订阅 Pro 的注意事项。",
    date: "2026-08-22",
    updated: "2026-08-22",
    category: "ChatGPT 订阅",
    tags: ["ChatGPT Pro", "Pro 订阅", "重度用户", "Plus 升级"],
    readingMinutes: 6,
    sections: [
      {
        h2: "一、ChatGPT Pro 适合谁",
        html: `<p>Pro 更适合高频、长时间、强依赖 ChatGPT 的用户。如果你只是日常写作和办公，Plus 通常已经够用；如果你经常遇到额度不够、任务中断、复杂研究需要连续推进，可以考虑 Pro。</p>`
      },
      {
        h2: "二、典型使用场景",
        html: `<ul>
          <li>AI 编程、项目分析、复杂错误排查。</li>
          <li>长文研究、资料库整理、报告生成。</li>
          <li>批量内容生产、脚本生成、图片创意。</li>
          <li>团队或个人工作流高度依赖 ChatGPT。</li>
        </ul>`
      },
      {
        h2: "三、先用 Plus 验证需求",
        html: `<p>第一次订阅不建议盲目直接选择 Pro。更稳的方式是先使用 Plus，观察自己是否经常遇到额度不足或任务强度过高。如果 Plus 明显不够，再升级 Pro 会更合理。</p>`
      },
      {
        h2: "四、Pro 订阅入口",
        html: `<p class="cta-line"><a href="__CTA__pro"><strong>www.goplus.pro</strong></a></p>
        <p>价格、权益、额度可能随账号和地区展示变化，最终以 ChatGPT 页面实际显示为准。</p>`
      }
    ]
  },
  {
    slug: "without-credit-card",
    title: "没有海外信用卡怎么开通 ChatGPT Plus？国内用户可行路径",
    description:
      "没有海外信用卡时如何处理 ChatGPT Plus 订阅，解释官方支付限制、虚拟卡问题和自助开通路径。",
    date: "2026-08-22",
    updated: "2026-08-22",
    category: "支付问题",
    tags: ["无海外卡", "微信支付", "支付宝", "国内支付"],
    readingMinutes: 6,
    sections: [
      {
        h2: "一、没有海外卡是最常见门槛",
        html: `<p>很多国内用户可以正常使用 ChatGPT，但没有适合官方订阅的海外信用卡。即使有虚拟卡，也可能遇到卡段、地区、账单地址或风控问题。</p>`
      },
      {
        h2: "二、不要急着反复尝试",
        html: `<p>如果官方支付失败，不建议短时间内连续提交。反复失败可能让后续支付更难通过，也会浪费大量时间。</p>`
      },
      {
        h2: "三、可以怎么解决",
        html: `<ul>
          <li>确认账号能正常登录。</li>
          <li>判断自己要 Plus 还是 Pro。</li>
          <li>选择支持国内主流支付方式的自助开通路径。</li>
          <li>开通后回到 ChatGPT 核对订阅状态。</li>
        </ul>`
      },
      {
        h2: "四、自助开通入口",
        html: `<p class="cta-line"><a href="__CTA__without_card"><strong>www.goplus.pro</strong></a></p>
        <p>适合没有海外信用卡、想用微信或支付宝、又希望订阅开在自己账号上的用户。</p>`
      }
    ]
  },
  {
    slug: "plus-vs-pro",
    title: "ChatGPT Plus 和 Pro 区别：新手应该怎么选？",
    description:
      "对比 ChatGPT Plus 和 Pro 的适用人群，帮助新手判断应该先开 Plus 还是直接选择 Pro。",
    date: "2026-08-22",
    updated: "2026-08-22",
    category: "套餐选择",
    tags: ["Plus vs Pro", "套餐区别", "订阅选择"],
    readingMinutes: 5,
    sections: [
      {
        h2: "一、先说结论",
        html: `<p><strong>大多数用户先选 Plus；只有高频重度使用，再考虑 Pro。</strong></p>
        <p>订阅计划不是越贵越好，而是要看你每个月能不能真正用上。</p>`
      },
      {
        h2: "二、Plus 更适合这些人",
        html: `<ul>
          <li>日常办公、写文章、做表格、总结资料。</li>
          <li>学习、翻译、问答、轻量代码辅助。</li>
          <li>偶尔做图片生成和资料分析。</li>
          <li>希望体验更稳定，但预算不想太高。</li>
        </ul>`
      },
      {
        h2: "三、Pro 更适合这些人",
        html: `<ul>
          <li>每天长时间高频使用 ChatGPT。</li>
          <li>经常进行复杂代码、长文研究、资料分析。</li>
          <li>Plus 额度经常不够用。</li>
          <li>工作高度依赖 ChatGPT 输出。</li>
        </ul>`
      },
      {
        h2: "四、开通入口",
        html: `<p class="cta-line"><a href="__CTA__plus_vs_pro"><strong>www.goplus.pro</strong></a></p>`
      }
    ]
  },
  {
    slug: "faq",
    title: "ChatGPT Plus / Pro 订阅常见问题",
    description:
      "整理 ChatGPT Plus 和 Pro 国内订阅常见问题，包括支付失败、共享账号、安全、开通后确认状态等。",
    date: "2026-08-22",
    updated: "2026-08-22",
    category: "常见问题",
    tags: ["FAQ", "订阅问题", "账号安全"],
    readingMinutes: 6,
    sections: [
      {
        h2: "没有海外信用卡，可以开通 ChatGPT Plus 吗？",
        html: `<p>可以。很多国内用户没有海外信用卡，或者官方支付不成功，可以选择支持国内主流支付方式的自助开通入口。</p>
        <p class="cta-line"><a href="__CTA__faq_card"><strong>www.goplus.pro</strong></a></p>`
      },
      {
        h2: "支付被拒是不是账号有问题？",
        html: `<p>通常不是。更常见的原因是银行卡、虚拟卡、账单地址、地区和风控问题。不要短时间反复提交。</p>`
      },
      {
        h2: "建议使用共享账号吗？",
        html: `<p><strong>不建议。</strong>共享账号存在聊天记录混乱、密码被改、权限被收回、数据不属于自己的问题。长期使用最好把订阅开在自己的账号上。</p>`
      },
      {
        h2: "开通后怎么确认成功？",
        html: `<ol>
          <li>刷新 ChatGPT 页面。</li>
          <li>进入头像或订阅管理页面。</li>
          <li>查看当前计划状态。</li>
          <li>检查模型和工具权限是否变化。</li>
        </ol>`
      }
    ]
  }
];
