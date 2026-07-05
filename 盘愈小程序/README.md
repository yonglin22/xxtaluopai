# 盘愈 PANYU · 微信小程序（混合：原生外壳 + web-view 内容）

**APPID** `wxc4cb1b6a1c959d58`（已认证 + 微信支付已开通）

## 架构
原生小程序做「壳」（原生 tabBar / 登录 / 支付 / 分享），**内容用 `<web-view>` 内嵌已上线 H5**，
观感与 H5 完全一致。5 个原生底部 tab 各内嵌 H5 对应页面（隐藏 H5 自带导航，避免双导航）：

| 原生 tab | H5 screen |
|---|---|
| 首页 | home |
| 星盘 | natal |
| 问 | ask |
| 商城 | skinshop |
| 我的 | mine |

## 已完成
- **原生底部 tabBar**（首页/星盘/问/商城/我的），每个 tab 一个 web-view 页深链到 H5 对应屏。
- **H5 小程序模式**（`?mp=1&tab=1&screen=X&phone=Y`）：自动登录、进指定屏、隐藏 H5 自带 tabbar。作用域仅限 `?mp=1`，独立 H5 不受影响。
- **微信一键登录**：`pages/wxlogin` 用 `getPhoneNumber` 拿 code → 后端换手机号 → 存本地 → 各 tab web-view 带 phone 自动登录。H5 里点登录会跳到原生登录页。
- **微信支付**：H5 充值下单 → `wx.miniProgram.navigateTo('/pages/pay/pay?...')` → 原生 `wx.requestPayment`。
- **微信分享**：每个 tab 页 `onShareAppMessage` / `onShareTimeline`（自定义标题）。

## 需你配合的两处后端（Cloudflare Worker，已加接口框架）
1. **一键登录** `/api/wxphone`：已写好用 `code` 换手机号的完整逻辑，只需在 Worker 环境变量配 `WX_APPID`、`WX_APPSECRET`。
2. **微信支付** `/api/wxpay`：已留统一下单框架，需配 `WX_MCHID`、`WX_PAY_KEY`（+证书），并补 JSAPI 下单实现（见 `_worker.js` 注释）。
未配置时：登录/支付会弹提示说明，不影响其他功能。

## 如何运行
1. 开发者工具导入 `盘愈小程序/`（AppID 已内置）。
2. 详情 → 本地设置 → 勾选「不校验合法域名、web-view（业务域名）、TLS…」（预览必须）。
3. 编译 → 底部 5 个原生 tab，点开各是对应的 H5 页面。

## 上线前置
- **业务域名备案**：`<web-view>` 只能加载已 ICP 备案域名。把 H5 部署到你的备案域名，配到小程序后台「业务域名」，再改 `utils/mp.js` 的 `H5_BASE`。
- 服务器域名（request 合法域名）加上后端 API 域名。

## 说明：每个 tab 是独立 web-view
原生 tabBar 下每个 tab 各自加载一次 H5（登录态通过手机号在各 tab 间保持一致）。
若想更省流/无重载，也可回到单 web-view（整页 H5 + H5 自带 tabbar）——`pages/webview` 已保留。
