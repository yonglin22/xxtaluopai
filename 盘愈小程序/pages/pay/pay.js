const { apiPost } = require('../../utils/request.js');
const mp = require('../../utils/mp.js');
Page({
  data: { orderNo: '', amount: '', desc: '', paying: false },
  onLoad(q) { this.setData({ orderNo: (q && q.orderNo) || '', amount: (q && q.amount) || '', desc: (q && q.desc) || '' }); },
  async pay() {
    if (this.data.paying) return;                 // 防连点：避免重复下单/多次拉起支付
    this.setData({ paying: true });
    wx.showLoading({ title: '正在下单…', mask: true });
    // 微信统一下单 total_fee 单位是「分」，这里把元换算成分传给后端
    const amountFen = Math.round((Number(this.data.amount) || 0) * 100);
    // JSAPI 支付需付款人 openid：拿一个新鲜的 wx.login code，后端用它换 openid
    const code = await new Promise((res) => { wx.login({ success: (r) => res((r && r.code) || ''), fail: () => res('') }); });
    try {
      const r = await apiPost('/api/wxpay', {
        orderNo: this.data.orderNo, amountFen, amountYuan: this.data.amount, phone: mp.getPhone(), code, desc: this.data.desc
      });
      wx.hideLoading();
      if (r.ok && r.j && r.j.timeStamp) {
        wx.requestPayment({
          timeStamp: r.j.timeStamp, nonceStr: r.j.nonceStr, package: r.j.package,
          signType: r.j.signType || 'RSA', paySign: r.j.paySign,
          success: () => {
            // 暂存到账信息，回 web-view 时通过 ?paid= 回传给 H5 补心元
            mp.setPaid(this.data.orderNo + '|' + this.data.amount);
            wx.showToast({ title: '支付成功', icon: 'success' });
            setTimeout(() => this.back(), 700);
          },
          fail: (e) => { if (!/cancel/i.test((e && e.errMsg) || '')) wx.showToast({ title: '支付未完成', icon: 'none' }); },
          complete: () => { this.setData({ paying: false }); }
        });
      } else if (!r.ok && r.statusCode === 0) {
        // 网络异常/超时（request.js 在 fail 时 statusCode=0），与「后端未接入」区分开
        this.setData({ paying: false });
        wx.showModal({ title: '网络异常', showCancel: false, confirmText: '知道了', content: '支付下单失败，请检查网络后重试。' });
      } else {
        this.setData({ paying: false });
        wx.showModal({ title: '支付未接入', showCancel: false, confirmText: '知道了',
          content: '后端统一下单 /api/wxpay 尚未接入（需商户号 + API 密钥/证书）。接好后这里用 wx.requestPayment 拉起微信支付。\n订单 ' + (this.data.orderNo || '—') + ' · ¥' + (this.data.amount || '—') });
      }
    } catch (e) {
      wx.hideLoading();
      this.setData({ paying: false });
      wx.showToast({ title: '支付发起失败，请重试', icon: 'none' });
    }
  },
  back() { const p = getCurrentPages(); if (p.length > 1) wx.navigateBack(); else wx.reLaunch({ url: '/pages/webview/webview' }); }
});
