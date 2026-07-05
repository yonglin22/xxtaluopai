const mp = require('../../utils/mp.js');
Page({
  data: { url: '' },
  onLoad() {
    // 原生标题栏已占据顶部安全区，H5 不再额外留白（safetop=0）
    this.setData({ url: mp.urlFull(0) });
  },
  onShow() {
    try { wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] }); } catch (e) {}
    const u = mp.urlFull(0);
    if (u !== this.data.url) this.setData({ url: u }); // 登录态变化时刷新
  },
  onErr() { wx.showToast({ title: '加载失败：检查网络/业务域名白名单', icon: 'none' }); },
  onShareAppMessage() { return { title: '盘愈 · 自我探索与情绪疏导', path: '/pages/webview/webview' }; },
  onShareTimeline() { return { title: '盘愈 · 自我探索与情绪疏导' }; }
});
