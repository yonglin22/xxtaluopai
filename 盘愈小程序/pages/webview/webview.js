const mp = require('../../utils/mp.js');
Page({
  data: { url: '', loading: true, fading: false, err: false },
  _timers: [],
  onLoad() {
    this.setData({ url: mp.urlFull(0) });
    this._splash();
  },
  onShow() {
    try { wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] }); } catch (e) {}
    const u = mp.urlFull(0);
    if (u !== this.data.url) { this.setData({ url: u, err: false }); this._splash(); } // 登录态变化时刷新
  },
  onUnload() { this._clear(); },
  onHide() { this._clear(); this.setData({ loading: false, fading: false }); },
  _clear() { (this._timers || []).forEach((t) => clearTimeout(t)); this._timers = []; },
  // 品牌加载遮罩：web-view 无加载完成事件，按时淡出遮住首屏白屏
  _splash() {
    this._clear();
    this.setData({ loading: true, fading: false });
    this._timers.push(setTimeout(() => this.setData({ fading: true }), 1100));
    this._timers.push(setTimeout(() => this.setData({ loading: false, fading: false }), 1550));
  },
  onErr() { this._clear(); this.setData({ loading: false, fading: false, err: true }); },
  retry() {
    this.setData({ err: false, url: '' });
    const u = mp.urlFull(0);
    this.setData({ url: u });
    this._splash();
  },
  onShareAppMessage() { return { title: '盘愈 · 自我探索与情绪疏导', path: '/pages/webview/webview' }; },
  onShareTimeline() { return { title: '盘愈 · 自我探索与情绪疏导' }; }
});
