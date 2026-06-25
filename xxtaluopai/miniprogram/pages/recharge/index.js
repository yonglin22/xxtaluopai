const app = getApp();
const api = require('../../utils/api.js');
const config = require('../../config.js');

Page({
  data: {
    packs: [], balance: 0, busy: false,
    order: null,                 // 下单后：{ outTradeNo, pack }
    serviceWechat: config.serviceWechat,
    payQr: config.payQr || '',
    polling: false
  },

  async onLoad() {
    try { await app.ready(); const r = await api.call('pay', { action: 'packs' }); this.setData({ packs: r.packs }); } catch (e) {}
    this.refreshBalance();
  },
  onShow() { this.refreshBalance(); },
  refreshBalance() { const p = app.globalData.profile; if (p) this.setData({ balance: p.balance }); },

  // 选套餐 → 下单（只建待支付订单）
  async pick(e) {
    if (this.data.busy || this.data.order) return;
    const id = e.currentTarget.dataset.id;
    this.setData({ busy: true });
    try {
      const r = await api.call('pay', { action: 'create', packId: id });
      this.setData({ order: { outTradeNo: r.outTradeNo, pack: r.pack } });
      this.startPoll(r.outTradeNo);
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '下单失败', icon: 'none' });
    } finally { this.setData({ busy: false }); }
  },

  previewQr() { if (this.data.payQr) wx.previewImage({ urls: [this.data.payQr] }); },
  copyOrderNo() { if (!this.data.order) return; wx.setClipboardData({ data: this.data.order.outTradeNo, success: () => wx.showToast({ title: '订单号已复制', icon: 'none' }) }); },
  copyWechat() { wx.setClipboardData({ data: this.data.serviceWechat, success: () => wx.showToast({ title: '客服微信已复制', icon: 'none' }) }); },
  cancelOrder() { this.setData({ order: null, polling: false }); },

  // 轮询订单：客服后台开通后变 paid → 自动到账提示
  async startPoll(no) {
    if (this.data.polling) return;
    this.setData({ polling: true });
    for (let i = 0; i < 120 && this.data.polling; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      if (!this.data.polling) return;
      try {
        const s = await api.call('pay', { action: 'status', outTradeNo: no });
        if (s.status === 'paid') {
          this.setData({ polling: false, order: null });
          const u = await api.call('user', { action: 'home' });
          this.setData({ balance: u.balance });
          if (app.globalData.profile) app.globalData.profile.balance = u.balance;
          wx.showModal({ title: '到账成功', content: '已充值 ' + s.credits + ' 积分', showCancel: false });
          return;
        }
      } catch (e) {}
    }
    this.setData({ polling: false });
  },

  onUnload() { this.setData({ polling: false }); }
});
