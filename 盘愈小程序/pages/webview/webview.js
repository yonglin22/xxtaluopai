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
    // 先清空 src，下一帧再赋值，确保 web-view 的 src 真正经历 '' → url 而重新加载
    this.setData({ err: false, url: '', loading: true, fading: false });
    const u = mp.urlFull(0);
    wx.nextTick(() => { this.setData({ url: u }); this._splash(); });
  },
  onShareAppMessage() { return { title: '盘愈 · 自我探索与情绪疏导', path: '/pages/webview/webview' }; },
  onShareTimeline() { return { title: '盘愈 · 自我探索与情绪疏导' }; }
});
