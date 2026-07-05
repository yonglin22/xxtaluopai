const app = getApp();
const store = require('../../utils/store.js');

Page({
  data: { phone: '' },

  onPhone(e) { this.setData({ phone: e.detail.value.replace(/\D/g, '').slice(0, 11) }); },

  // 手机号登录（复用 H5 后端的手机号体系）
  doLogin() {
    const phone = this.data.phone;
    if (!/^1\d{10}$/.test(phone)) { wx.showToast({ title: '请输入正确的手机号', icon: 'none' }); return; }
    store.phone = phone;
    wx.showToast({ title: '已登录', icon: 'success' });
    setTimeout(() => this.back(), 500);
  },

  // 微信一键获取手机号（需企业主体，已认证可用）
  // 阶段二：后端加 /api/wxphone，用 e.detail.code 换取手机号后写入
  onGetPhone(e) {
    if (e.detail.errMsg && e.detail.errMsg.indexOf('ok') > -1 && e.detail.code) {
      // 拿到 dynamic code，交给后端换手机号（此处占位）
      wx.showModal({
        title: '微信一键登录', showCancel: false, confirmText: '知道了',
        content: '已拿到微信授权码。接入后端 /api/wxphone（用 code 换手机号）后即可一键登录，当前先用手机号输入登录。'
      });
    } else {
      wx.showToast({ title: '已取消授权', icon: 'none' });
    }
  },

  back() {
    const pages = getCurrentPages();
    if (pages.length > 1) wx.navigateBack();
    else wx.reLaunch({ url: '/pages/webview/webview' });
  }
});
