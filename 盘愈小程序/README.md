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
- **整屏内嵌 H5**：小程序就是一整屏的 web-view（`navigationStyle: custom` 去掉原生顶栏），
  底部用 **H5 自带的毛玻璃悬浮 tabbar + 图标**，顶部按胶囊位置留安全区。无任何原生色块，观感 = H5。
- **H5 小程序模式**（`?mp=1&phone=Y&safetop=N`）：自动登录 + 顶部安全区留白；登录后自动进首页。仅 `?mp=1` 生效，独立 H5 不受影响。
- **微信一键登录**：`pages/wxlogin`（getPhoneNumber）→ 后端换手机号 → 存本地 → web-view 带 phone 自动登录。H5 里点登录跳原生登录页。
- **微信支付**：H5 充值 → `wx.miniProgram.navigateTo('/pages/pay/pay?...')` → 原生 `wx.requestPayment`。
- **微信分享**：`onShareAppMessage` / `onShareTimeline`。

> 注：之前的原生 tabBar 方案已弃用——原生 tabBar 无法做毛玻璃/自定义图标，会破坏 H5 的统一质感。现回到整屏 H5，用 H5 自己的悬浮毛玻璃 tabbar。

