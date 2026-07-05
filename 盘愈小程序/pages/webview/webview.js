// ============================================================
// 内容页：full-screen web-view 内嵌 H5（与 H5 观感 100% 一致）
// 上线前把 H5_BASE 换成你自己的「已备案业务域名」，并在小程序后台配置。
// ============================================================
const H5_BASE = 'https://taluo-b76.pages.dev/';

Page({
  data: { url: '' },

  onLoad(query) {
    // mp=1 告诉 H5 当前运行在小程序 web-view 中（H5 据此走原生登录/支付桥，阶段二）
    // screen=xxx 可深链到 H5 具体页面（需 H5 读取该参数，阶段二）
    let url = H5_BASE + '?mp=1';
    if (query && query.screen) url += '&screen=' + encodeURIComponent(query.screen);
    this.setData({ url });
  },

  // H5 通过 wx.miniProgram.postMessage 传来的数据（仅在返回/分享/跳转等时机触发）
  onMessage(e) {
    const data = (e.detail && e.detail.data) || [];
    console.log('[webview→mp] message:', data);
  },
  onErr() {
    wx.showModal({
      title: '页面加载失败', showCancel: false, confirmText: '知道了',
      content: '请检查网络；若在真机/预览，需把 H5 域名加入小程序后台「业务域名」（开发者工具里勾选「不校验合法域名/web-view」即可预览）。'
    });
  }
});
