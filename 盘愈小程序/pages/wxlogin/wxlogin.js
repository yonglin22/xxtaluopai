const mp = require('../../utils/mp.js');
const { apiPost } = require('../../utils/request.js');
Page({
  data: { loading: false },
  async onGetPhone(e) {
    if (!(e.detail && e.detail.code)) { wx.showToast({ title: '已取消授权', icon: 'none' }); return; }
    this.setData({ loading: true });
    // 用 e.detail.code 调后端换手机号（后端需用微信 AppSecret）
    const r = await apiPost('/api/wxphone', { code: e.detail.code });
    this.setData({ loading: false });
    if (r.ok && r.j && r.j.phone) {
      mp.setPhone(r.j.phone);
      wx.showToast({ title: '登录成功', icon: 'success' });
      setTimeout(() => this.back(), 500);
    } else {
      wx.showModal({ title: '登录未完成', showCancel: false, confirmText: '知道了',
        content: '后端 /api/wxphone 尚未接入（需用微信 AppSecret 以 code 换手机号）。接好后即可一键登录。' });
    }
  },
  back() { const p = getCurrentPages(); if (p.length > 1) wx.navigateBack(); else wx.switchTab({ url: '/pages/mine/mine' }); }
});
