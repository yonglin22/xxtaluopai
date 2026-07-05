const mp = require('../../utils/mp.js');
Page({
  data: { url: '' },
  onLoad() {
    let st = 66;
    try { const m = wx.getMenuButtonBoundingClientRect(); if (m && m.bottom) st = Math.round(m.bottom + 6); }
    catch (e) { try { st = (wx.getSystemInfoSync().statusBarHeight || 20) + 46; } catch (_) {} }
    this._st = st;
    this.setData({ url: mp.urlFull(st) });
  },
  onShow() {
    try { wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] }); } catch (e) {}
    const u = mp.urlFull(this._st || 66);
    if (u !== this.data.url) this.setData({ url: u }); // 登录态变化时刷新
  },
  onErr() { wx.showToast({ title: '加载失败：检查网络/业务域名白名单', icon: 'none' }); },
  onShareAppMessage() { return { title: '盘愈 · 自我探索与情绪疏导', path: '/pages/webview/webview' }; },
  onShareTimeline() { return { title: '盘愈 · 自我探索与情绪疏导' }; }
});
