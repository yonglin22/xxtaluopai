# 盘愈 PANYU · 微信小程序（混合：原生外壳 + web-view 内容）

**APPID** `wxc4cb1b6a1c959d58`（已认证 + 微信支付已开通）

## 架构
原生小程序做「壳」（登录 / 支付 / 分享），**内容用一整屏 `<web-view>` 内嵌已上线 H5**，
底部导航用 H5 自带的毛玻璃悬浮 tabbar，观感与 H5 完全一致。**不用原生 tabBar**——原生 tabBar
做不出毛玻璃/自定义图标，会破坏 H5 的统一质感。

## 顶部标题栏（重要）
微信规定：**页面内含 `<web-view>` 时 `navigationStyle: custom` 无效**，原生标题栏一定存在、无法隐藏。
所以不再和它对抗，而是把它「调成玻璃白」融进 H5：
- `navigationBarBackgroundColor:#FFFFFF`（**纯白**，微信原生栏只能纯色、做不了真半透明毛玻璃；用纯白最不发暖）、
  `navigationBarTextStyle:black`（黑字）、标题只留 **「盘愈 PANYU」**（H5 在 `?mp=1` 下把 `document.title` 强制改成「盘愈 PANYU」）。
  子页返回栏（H5 内）用 `rgba(255,255,255,.72)` **白色毛玻璃**。
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

## 本轮优化（审计 + 对抗式验证后落地）
- **首屏加载页**：web-view 加载 9MB H5 前先盖一层纯白玻璃品牌载入页（衬线「盘愈」+ 暗金细线，`cover-view` 才能浮在 web-view 上），~1.1s 淡出，消除冷启动白屏。
- **加载失败重试页**：web-view 出错不再只弹 toast，改为白色玻璃重试页（「重新加载」按钮，`wx.nextTick` 强制 src 变化真正重载）。
- **合规（重要）**：小程序内**移除 H5 的「分销/分佣」后台入口**并拦截其跳转——微信审核对多级分销零容忍，且与「工具/心理测评」类目严重跨类，留着大概率拒审。
- **支付加固**：下单按钮加 loading + 防连点；金额按「分」换算（`amountFen`，防 100 倍错账）；网络异常与「后端未接入」分开提示；用户主动取消不再误报「支付未完成」。
- **支付到账回传**：支付成功→原生暂存「订单号\|金额」→回 web-view 时 `?paid=` 带回 H5，**按订单号幂等补心元**（防重复到账）。*当前 `/api/wxpay` 未接，此链路暂不触发，接好后即生效。*
- **登录**：`enter()` 加幂等锁（防拒授权/skip/接口返回重复导航把 webview 弹出栈）；换手机号失败时明确提示「暂以体验身份进入」。
- **清理**：删除死文件 `utils/bazi.js` `utils/tarot.js`（含「tarot/占卜」命名，利于类目审核）；`store.js` 精简为只留 phone（H5 与小程序存储隔离，其余字段是误导性死代码）；`app.js` 去掉废弃 `getSystemInfoSync` 与无人读取的 `globalData`；`README.md` 打包忽略。

## 待办（需你提供）
- **request 合法域名**：`utils/request.js` 的 `API_BASE` 现指向未备案的 `taluo-b76.pages.dev`。真机上 `wx.request` 要求域名**已备案 + 登记到后台 request 合法域名**（与 web-view 域名白名单是两套），否则 `/api/wxphone`、`/api/wxpay` 在真机恒失败。需换成你的**备案域名**（或用微信云托管 `callContainer`）。
- **微信支付后端**：`/api/wxpay` 统一下单 + 支付回调置单（需商户号 + API 密钥/证书）。接好后「支付→到账」全链路即通（前端幂等已就绪）。

