// ============================================================
// 盘愈 PANYU · 小程序入口（原生外壳）
// ============================================================
const store = require('./utils/store.js');

App({
  globalData: {},

  onLaunch() {
    // 内容全在 web-view 内的 H5；登录在 wxlogin 页按需触发（wx.login 的 code 5 分钟即过期，
    // 不在此提前采集）。原生标题栏已占顶部安全区，无需 getSystemInfo。
  },

  // 未登录跳登录页（登录拦截主要由 H5 侧完成，此处为原生兜底）
  requireLogin() {
    if (store.isLoggedIn()) return true;
    wx.navigateTo({ url: '/pages/wxlogin/wxlogin' });
    return false;
  }
});
