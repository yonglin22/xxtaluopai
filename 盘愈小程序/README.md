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
- **一级 tab 页去掉返回栏**：愈池 / 问 / 星盘 这些底部 tab 主页由悬浮 tabbar 导航，删掉多余的「返回按钮 + 标题」（`#yuchi/#ask/#natal > .topbar` 隐藏）。底栏为 **首页 / 愈池 / 问 / 星盘 / 我的**；商城下线到「我的」内可达。

## 已完成
- **整屏内嵌 H5**：小程序就是一整屏的 web-view，原生标题栏调成玻璃白只显示「盘愈 PANYU」，
  底部用 **H5 自带的毛玻璃悬浮 tabbar + 图标**。除标题栏外无任何原生色块，观感 = H5。
- **H5 小程序模式**（`?mp=1&phone=Y&safetop=N`）：自动登录 + 子页返回栏固定/毛玻璃 + tab 主页去返回栏；登录后自动进首页。仅 `?mp=1` 生效，独立 H5 不受影响。
- **微信一键登录**：`pages/wxlogin`（getPhoneNumber）→ 后端换手机号 → 存本地 → web-view 带 phone 自动登录。H5 里点登录跳原生登录页。
- **微信支付**：H5 充值 → `wx.miniProgram.navigateTo('/pages/pay/pay?...')` → 原生 `wx.requestPayment`。
- **微信分享**：`onShareAppMessage` / `onShareTimeline`。

> 注：之前的原生 tabBar 方案已弃用——原生 tabBar 无法做毛玻璃/自定义图标，会破坏 H5 的统一质感。现回到整屏 H5，用 H5 自己的悬浮毛玻璃 tabbar。

## 愈池 v2 · 公域情绪治愈玩法（第一期）
底栏第二位「愈池」是公域情绪社区，本轮按会议纪要落地了一整套玩法（H5 `renderYuchi` + `_worker.js` `handleWall`）：
- **诗句发布器**：点亮一种情绪（正/负极性）→ 写几十字诗意文案 → 投进池子。
- **情绪球 · 储蓄罐**：每投一次掉一颗球（正向暖金/负向灰），30 颗装满自动封存进「情绪架」；`balls:<手机号>` 存罐。
- **点灯 · 顶球上浮**：点亮某条心事，灯焰升起 + 服务端综合分重排让它上浮；发布者看到「收到 N 盏灯 · 刚有【等级】为你点亮」。
- **霸榜 / 沉底**：综合分＝点亮×3＋评论×2＋观看×0.15＋新贴冒泡加成；零互动且超 2h 的心事自动沉底消失。
- **会员等级**：按累计互动成长（初来乍到→夜行者→暖心常客→深夜活跃→守灯人），帖子与罐上展示徽章。
- **冷启动**：空池时预置 6 条诗句样板，新用户进来不空场。
- **观看数**：每台设备对每条心事只计一次。

### 愈池 v3 · 视觉与交互升级
- **池水 hero**：canvas 画的活水面（米白玻璃 + 暗金），一颗颗**水晶珠**（正向金/负向紫，贴合水晶珠串主题）缓缓升起，轻触荡开涟漪，投递时从发布器"跳"一颗珠进池。
- **玻璃储蓄罐**：真实玻璃罐 + 抛光水晶珠堆叠（带高光/暗边/景深），满 30 颗封存。
- **点灯交互**：点亮＝金色闪环 + 火星四溅 + 数字弹跳 + 卡片顶起上浮（重排霸榜）。
- **情绪架**（`#shelf`，`/api/shelf`）：年度情绪色彩分布（阳光/灰河流 + 比例条）、封存瓶子陈列、**永久情绪胶囊**（挑此刻永久封存，十年后回看）。

## 本轮优化（审计 + 对抗式验证后落地）
- **首屏加载页**：web-view 加载 9MB H5 前先盖一层纯白玻璃品牌载入页（衬线「盘愈」+ 暗金细线，`cover-view` 才能浮在 web-view 上），~1.1s 淡出，消除冷启动白屏。
- **加载失败重试页**：web-view 出错不再只弹 toast，改为白色玻璃重试页（「重新加载」按钮，`wx.nextTick` 强制 src 变化真正重载）。
- **合规（重要）**：小程序内**移除 H5 的「分销/分佣」后台入口**并拦截其跳转——微信审核对多级分销零容忍，且与「工具/心理测评」类目严重跨类，留着大概率拒审。
- **支付加固**：下单按钮加 loading + 防连点；金额按「分」换算（`amountFen`，防 100 倍错账）；网络异常与「后端未接入」分开提示；用户主动取消不再误报「支付未完成」。
- **支付到账回传**：支付成功→原生暂存「订单号\|金额」→回 web-view 时 `?paid=` 带回 H5，**按订单号幂等补心元**（防重复到账）。*当前 `/api/wxpay` 未接，此链路暂不触发，接好后即生效。*
- **登录**：`enter()` 加幂等锁（防拒授权/skip/接口返回重复导航把 webview 弹出栈）；换手机号失败时明确提示「暂以体验身份进入」。
- **清理**：删除死文件 `utils/bazi.js` `utils/tarot.js`（含「tarot/占卜」命名，利于类目审核）；`store.js` 精简为只留 phone（H5 与小程序存储隔离，其余字段是误导性死代码）；`app.js` 去掉废弃 `getSystemInfoSync` 与无人读取的 `globalData`；`README.md` 打包忽略。

## 分享深链 & 字体外链（本轮新增）
- **分享深链**：从任意子页分享，被分享者进入后**直达该屏**。H5 `go()` 在 `?mp=1` 下用 `wx.miniProgram.postMessage({screen})` 上报当前屏；`webview` 页 `bindmessage` 收屏，`onShareAppMessage/Timeline` 带 `?screen=`，`urlFull(safetop, screen)` 透传。
- **字体外链提速**：H5 里 4 个内联 base64 字体（PanyuSans/Song 400/700，~817KB）抽成 `fonts/*.woff2` 外链 + `<head>` preload 主字，单文件从 9.3MB 降到 ~8.2MB，首屏更快。**部署时 `fonts/` 目录要一起传。**（更大的 4MB 内联图片是另一档优化，暂未动。）

## 微信支付（后端已实现，填好密钥即通）
`_worker.js` 已实现 **微信支付 V3 · JSAPI 统一下单 + paySign + 回调解密**（`/api/wxpay`、`/api/wxpay/notify`），加密逻辑已用 Web Crypto 验证通过。开启只需在 **Cloudflare Pages → 设置 → 环境变量** 配置：

| 变量 | 说明 |
|---|---|
| `WX_APPID` | 小程序 AppID（与一键登录同一个） |
| `WX_APPSECRET` | 小程序密钥（用 `wx.login` 的 code 换 openid，JSAPI 必须） |
| `WX_MCHID` | 微信支付商户号 |
| `WX_PAY_SERIAL` | 商户 API 证书**序列号** |
| `WX_PAY_PRIVATE_KEY` | 商户 API 私钥 `apiclient_key.pem` **全文** |
| `WX_PAY_NOTIFY_URL` | 回调地址，如 `https://你的备案域名/api/wxpay/notify` |
| `WX_PAY_APIV3_KEY` | APIv3 密钥（32 位，回调解密用） |

> 前端 `pay.js` 已在下单时带上 `wx.login` 的 code 供后端换 openid；到账走前端幂等 `?paid=` 回传（已验证），回调 `notify` 另把订单落库 KV 作对账。

## 待办（需你提供）
- **request 合法域名**：`utils/request.js` 的 `API_BASE` 现指向未备案的 `taluo-b76.pages.dev`。真机上 `wx.request` 要求域名**已备案 + 登记到后台 request 合法域名**（与 web-view 域名白名单是两套），否则 `/api/wxphone`、`/api/wxpay` 在真机恒失败。需换成你的**备案域名**（或用微信云托管 `callContainer`）。
- **微信支付密钥**：按上表在 Cloudflare 配好 7 个环境变量即可开通支付。

