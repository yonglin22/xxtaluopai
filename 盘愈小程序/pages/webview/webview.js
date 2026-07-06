const mp = require('../../utils/mp.js');
Page({
  data: { url: '', loading: true, fading: false, err: false },
  _timers: [],
  _entry: '',       // 被分享者进入时的目标屏（?screen=）
  _curScreen: '',   // H5 当前屏（bindmessage flush 时更新），供从子页分享
  onLoad(q) {
    this._entry = (q && q.screen) || '';
    this.setData({ url: mp.urlFull(0, this._entry) });
    this._splash();
  },
  onShow() {
    try { wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] }); } catch (e) {}
    const u = mp.urlFull(0, this._entry);
    if (u !== this.data.url) { this.setData({ url: u, err: false }); this._splash(); } // 登录态/支付回传时刷新
  },
  // postMessage 在「分享/后退/组件销毁」时 flush；取最后一条带 screen 的
  onMsg(e) {
    const l = (e && e.detail && e.detail.data) || [];
    for (let i = l.length - 1; i >= 0; i--) { if (l[i] && l[i].screen) { this._curScreen = l[i].screen; break; } }
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
    const u = mp.urlFull(0, this._entry);
    wx.nextTick(() => { this.setData({ url: u }); this._splash(); });
  },
  onShareAppMessage() {
    const s = this._curScreen || this._entry;
    return { title: '盘愈 · 自我探索与情绪疏导', path: '/pages/webview/webview' + (s ? ('?screen=' + s) : '') };
  },
  onShareTimeline() {
    const s = this._curScreen || this._entry;
    return { title: '盘愈 · 自我探索与情绪疏导', query: (s ? ('screen=' + s) : '') };
  }
});
