# FateTell · 塔罗（姻缘 / 事业 / 财运）

一个微信小程序：**免费「每日一签」养习惯 → 付费「深度解读」变现 → 往私域沉淀**。
附带可在浏览器直接体验的 H5 演示。

## 目录

```
.
├── project.config.json        # 微信小程序项目配置（用微信开发者工具导入本仓库根目录）
├── miniprogram/               # 小程序前端（原生）：home日签 / ask问事 / reading解读 / mine我的 / recharge充值
├── cloudfunctions/            # 微信云开发云函数：init/login/dailysign/reading/user/pay/payCallback
├── README_部署.md             # 👉 小程序部署傻瓜手册（云开发 + 微信支付 + 类目合规）
└── demo/                      # H5 演示（独立、可单独部署，用来拿演示网址）
    ├── tarot.html            # 纯解读体验
    ├── tarot-app.html        # 全流程原型（登录/日签/问事/解读/我的/充值）
    ├── server.js             # 极简后端：静态托管 + /api/tarot（零依赖，Node18+）
    ├── prompt.js             # 解读 System Prompt（与 cloudfunctions/reading/prompt.js 同一份，核心资产）
    └── .env.example
```

## 两条线

### A. 微信小程序（正式产品）
用微信开发者工具导入**本仓库根目录**，按 [`README_部署.md`](./README_部署.md) 走：开通云开发 → 配模型 key → 上传 7 个云函数 → 跑 init 建表 → 模拟支付跑通付费闭环。

### B. H5 演示（拿一个能转发的演示网址）
本地体验：
```bash
cd demo
cp .env.example .env      # 填 AI_KEY（DeepSeek 等）
npm start                 # → http://localhost:8888/tarot-app.html
```
部署到公网（Render / 任意 Node 平台）：根目录指向 `demo/`，启动命令 `node server.js`，环境变量设 `AI_KEY`（及可选 `AI_PROVIDER/AI_BASE_URL/AI_MODEL`）。部署后访问 `你的域名/tarot-app.html`。

## 打磨「说中感」
解读质量的命门在 `demo/prompt.js` 与 `cloudfunctions/reading/prompt.js`（同一份核心 Prompt）。改这里即可，演示与小程序一致。

## 合规
财运只停在「财富心态/事业方向/决策参考」，不碰具体标的与买卖时点；不预测成败、不替人做去留/分合决定。入口与结尾均有免责声明。微信小程序占卜类目审核风险较高，建议定位往「心理/情绪/自我觉察」靠（详见 README_部署.md）。
