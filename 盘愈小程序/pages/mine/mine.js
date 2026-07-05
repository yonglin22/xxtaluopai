const mp = require('../../utils/mp.js');
Page({
  data: { url: '' },
  onLoad() { this.setData({ url: mp.url('mine') }); },
  onShow() {
    try { wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] }); } catch (e) {}
    const u = mp.url('mine');
    if (u !== this.data.url) this.setData({ url: u }); // 登录态变化时刷新
  },
  onErr() { wx.showToast({ title: '加载失败：检查网络/业务域名白名单', icon: 'none' }); },
  onShareAppMessage() { return { title: '盘愈 · 我的', path: '/pages/mine/mine' }; },
  onShareTimeline() { return { title: '盘愈 · 我的' }; }
});
