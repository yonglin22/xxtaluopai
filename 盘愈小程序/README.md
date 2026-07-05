# 盘愈 PANYU · 微信小程序（混合：原生外壳 + web-view 内容）

**APPID** `wxc4cb1b6a1c959d58`（已认证 + 微信支付已开通）

## 架构
原生小程序做「壳」（登录 / 支付 / 分享），**内容用一整屏 `<web-view>` 内嵌已上线 H5**，
底部导航用 H5 自带的毛玻璃悬浮 tabbar，观感与 H5 完全一致。**不用原生 tabBar**——原生 tabBar
做不出毛玻璃/自定义图标，会破坏 H5 的统一质感。

## 顶部标题栏（重要）
微信规定：**页面内含 `<web-view>` 时 `navigationStyle: custom` 无效**，原生标题栏一定存在、无法隐藏。
所以不再和它对抗，而是把它「调成玻璃白」融进 H5：
- `navigationBarBackgroundColor:#F1EADC`（= H5 的米白玻璃底色，和内容无缝衔接）、`navigationBarTextStyle:black`（黑字）、
  标题只留 **「盘愈 PANYU」**（H5 在 `?mp=1` 下把 `document.title` 强制改成「盘愈 PANYU」，去掉「自我探索·情绪疏导」）。
- **去掉顶部大留白**：原生标题栏已经占了顶部安全区，H5 不再额外 `padding-top`（`safetop=0`）。
- **子页返回栏固定 + 毛玻璃**：H5 里 `.topbar`（`‹ 八字命盘` 等）在 `?mp=1` 下 `position:sticky;top:0` + 毛玻璃背景，滚动时钉在顶部。
- **一级 tab 页去掉返回栏**：星盘 / 问 / 商城 这些底部 tab 主页由悬浮 tabbar 导航，删掉多余的「返回按钮 + 标题」（`#natal/#ask/#skinshop > .topbar` 隐藏）。

## 已完成
- **整屏内嵌 H5**：小程序就是一整屏的 web-view，原生标题栏调成玻璃白只显示「盘愈 PANYU」，
  底部用 **H5 自带的毛玻璃悬浮 tabbar + 图标**。除标题栏外无任何原生色块，观感 = H5。
- **H5 小程序模式**（`?mp=1&phone=Y&safetop=N`）：自动登录 + 子页返回栏固定/毛玻璃 + tab 主页去返回栏；登录后自动进首页。仅 `?mp=1` 生效，独立 H5 不受影响。
- **微信一键登录**：`pages/wxlogin`（getPhoneNumber）→ 后端换手机号 → 存本地 → web-view 带 phone 自动登录。H5 里点登录跳原生登录页。
- **微信支付**：H5 充值 → `wx.miniProgram.navigateTo('/pages/pay/pay?...')` → 原生 `wx.requestPayment`。
- **微信分享**：`onShareAppMessage` / `onShareTimeline`。

> 注：之前的原生 tabBar 方案已弃用——原生 tabBar 无法做毛玻璃/自定义图标，会破坏 H5 的统一质感。现回到整屏 H5，用 H5 自己的悬浮毛玻璃 tabbar。

