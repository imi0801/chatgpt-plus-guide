import { revisedPosts } from './revised-posts.mjs';
import { supportingPosts } from './extra-posts.mjs';

export const site = {
  "title": "ChatGPT Plus 开通与充值指南",
  "subtitle": "ChatGPT Plus / Pro 订阅、支付被拒、无海外卡解决方案",
  "author": "AI 订阅指南",
  "description": "ChatGPT Plus 开通、微信支付宝充值条件、支付失败排查和 Plus / Pro 套餐比较。先了解购买流程、账号信息要求与订阅管理，再选择适合的渠道。",
  "baseUrl": "https://imi0801.github.io/chatgpt-plus-guide",
  "googleSiteVerification": "9tqSXTyupED9ZY-GMXMI43IVjP7X1B4ae0SKujMCWJs",
  "googleAnalyticsId": "G-V3XLJMGEV5",
  "nav": [
    {
      "label": "首页",
      "href": "/"
    },
    {
      "label": "开通指南",
      "href": "/chatgpt-plus/"
    },
    {
      "label": "微信支付宝",
      "href": "/chatgpt-plus-recharge-2026-alipay-wechat/"
    },
    {
      "label": "支付失败",
      "href": "/chatgpt-payment-declined/"
    },
    {
      "label": "套餐对比",
      "href": "/plus-vs-pro/"
    },
    {
      "label": "订阅管理",
      "href": "/chatgpt-plus-cancel-manage/"
    }
  ],
  "shortName": "AI 订阅指南",
  "updated": "2026-09-08",
  "products": {
    "recharge": {
      "url": "https://fe.dtyuedan.cn/shop/panghu",
      "label": "立即自助充值 →"
    },
    "plus": {
      "url": "https://www.goplus.pro/chatgpt-plus-recharge",
      "label": "查看 Plus 套餐与购买条件"
    },
    "pro": {
      "url": "https://www.goplus.pro/chatgpt-pro-recharge",
      "label": "咨询 Pro 档位与交付条件"
    }
  }
};

export const posts = supportingPosts.map(post => ({ ...post, ...revisedPosts[post.slug] }));
