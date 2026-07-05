const { apiPost } = require('../../utils/request.js');
const mp = require('../../utils/mp.js');
Page({
  data: { orderNo: '', amount: '', desc: '' },
  onLoad(q) { this.setData({ orderNo: (q && q.orderNo) || '', amount: (q && q.amount) || '', desc: (q && q.desc) || '' }); },
  async pay() {
    const r = await apiPost('/api/wxpay', { orderNo: this.data.orderNo, amount: this.data.amount, phone: mp.getPhone() });
    if (r.ok && r.j && r.j.timeStamp) {
      wx.requestPayment({
        timeStamp: r.j.timeStamp, nonceStr: r.j.nonceStr, package: r.j.package,
        signType: r.j.signType || 'RSA', paySign: r.j.paySign,
        success: () => { wx.showToast({ title: '支付成功', icon: 'success' }); setTimeout(() => this.back(), 700); },
        fail: () => { wx.showToast({ title: '支付未完成', icon: 'none' }); }
      });
    } else {
      wx.showModal({ title: '支付未接入', showCancel: false, confirmText: '知道了',
        content: '后端统一下单 /api/wxpay 尚未接入（需商户号 + API 密钥/证书）。接好后这里用 wx.requestPayment 拉起微信支付。\n订单 ' + (this.data.orderNo || '—') + ' · ¥' + (this.data.amount || '—') });
    }
  },
  back() { const p = getCurrentPages(); if (p.length > 1) wx.navigateBack(); else wx.reLaunch({ url: '/pages/webview/webview' }); }
});
