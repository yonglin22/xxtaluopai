// ============================================================
// 盘愈 PANYU · 小程序入口（原生）
// ============================================================
const store = require('./utils/store.js');

App({
  globalData: {
    store,
    // wx.login 拿到的 code，后端可用它换 openid（阶段二：需后端加 /api/wxlogin）
    loginCode: '',
    systemInfo: null
  },

  onLaunch() {
    // 静默登录：拿 code 备用（不阻塞界面）
    wx.login({
      success: (res) => { if (res && res.code) this.globalData.loginCode = res.code; },
      fail: () => {}
    });
    try { this.globalData.systemInfo = wx.getSystemInfoSync(); } catch (e) {}
  },

  // 全局登录校验：未登录跳登录页
  requireLogin() {
    if (store.isLoggedIn()) return true;
    wx.navigateTo({ url: '/pages/wxlogin/wxlogin' });
    return false;
  }
});
