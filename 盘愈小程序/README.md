# 盘愈 PANYU · 微信小程序（混合：原生外壳 + web-view 内容）

**架构**：原生小程序做「壳」（容器 / 登录 / 支付桥），**内容页用 `<web-view>` 内嵌已上线的 H5** ——
因此小程序里的观感、配色、动效、功能与 H5 **完全一致**（因为加载的就是 H5 本体）。

- **APPID**：`wxc4cb1b6a1c959d58`（已认证 + 微信支付已开通）

## 如何运行（开发者工具预览）
1. 微信开发者工具 → 导入项目 → 选 `盘愈小程序/` 文件夹（能直接看到 app.json 的那层）。
2. **详情 → 本地设置 → 勾选「不校验合法域名、web-view（业务域名）、TLS…」**（预览必须勾，否则 web-view 打不开）。
3. 编译 → 直接进入 H5 首页，和 H5 长得一模一样。

## 目录
```
app.json                    入口=webview，无原生 tabBar（H5 自带导航）
pages/webview               全屏 <web-view> 内嵌 H5（H5_BASE 可改成你的备案域名）
pages/login                 原生手机号登录 + 微信一键登录按钮（阶段二对接后端）
pages/pay                   原生微信支付桥（阶段二对接后端统一下单）
utils/*                     请求/存储/八字引擎（原生页备用，当前主流程走 web-view）
（home/ask/mine/bazi/astro/shop/soon 为早期纯原生页，保留备用，未接入主流程）
```

## 上线前置（重要）
- **业务域名备案**：`<web-view>` 只能加载**已 ICP 备案**的域名。`taluo-b76.pages.dev` 不能备案，
  正式上线前需把 H5 部署到**你自己的备案域名**，并在小程序后台
  「开发管理 → 开发设置 → 业务域名」添加该域名（需下载校验文件放到域名根目录）。
- 备案完成后，把 `pages/webview/webview.js` 里的 `H5_BASE` 改成你的域名即可。

## 阶段二：原生登录 & 支付桥（需 H5 少量改动 + 后端接口）
H5 运行在小程序 web-view 内时，可用微信 JSSDK 与小程序通信：
1. H5 引入 `https://res.wx.qq.com/open/js/jweixin-1.6.0.js`，用 `wx.miniProgram` 判断环境。
2. **登录**：小程序原生 `getPhoneNumber` 拿手机号 → 通过 URL 参数 / postMessage 传给 H5 自动登录
   （后端加 `/api/wxphone`：用 code 换手机号）。
3. **支付**：H5 需付款时 `wx.miniProgram.navigateTo('/pages/pay/pay?orderNo=..&amount=..')`
   → 原生 `pay` 页调后端统一下单 `/api/wxpay` → `wx.requestPayment` 拉起微信支付。

## 审核类目建议
走「工具 / 心理测评（自我认知·情绪·性格）」方向，产品定位统一为「自我探索·情绪疏导·心理陪伴」，
弱化「占卜/算命/预测」字样，每页保留免责声明。（详见对话说明）
