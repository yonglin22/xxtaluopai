const mp = require('../../utils/mp.js');
const { apiPost } = require('../../utils/request.js');
// 演示访客号：后端换手机号（需 WX_APPSECRET）没接好时，用它先让人进得去。
// 接好 /api/wxphone 后会自动走真实手机号，不再落到访客号。
const GUEST = '13800138000';
Page({
  data: { loading: false },
  async onGetPhone(e) {
    // 用户拒绝授权也别把人卡在登录页，直接以访客进入
    if (!(e.detail && e.detail.code)) { this.enter(GUEST); return; }
    this.setData({ loading: true });
    let phone = '';
    try {
      const r = await apiPost('/api/wxphone', { code: e.detail.code });
      if (r && r.ok && r.j && r.j.phone) phone = r.j.phone;
    } catch (err) {}
    this.setData({ loading: false });
    this.enter(phone || GUEST); // 后端没接好也不卡人
  },
  skip() { this.enter(GUEST); },
  enter(phone) {
    mp.setPhone(phone);
    wx.showToast({ title: '进入中…', icon: 'none', duration: 400 });
    setTimeout(() => {
      const p = getCurrentPages();
      if (p.length > 1) wx.navigateBack();          // 返回 web-view，onShow 会带 phone 重新加载 → 自动进首页
      else wx.reLaunch({ url: '/pages/webview/webview' });
    }, 300);
  }
});
