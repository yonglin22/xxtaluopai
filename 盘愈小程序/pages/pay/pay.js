// ============================================================
// 原生支付页（桥）——H5 在 web-view 里需要付款时，通过
// wx.miniProgram.navigateTo('/pages/pay/pay?orderNo=..&amount=..') 跳到这里，
// 由小程序原生调 wx.requestPayment 拉起微信支付。
// 阶段二：需后端加统一下单接口 /api/wxpay（返回 timeStamp/nonceStr/package/paySign）。
// ============================================================
Page({
  data: { orderNo: '', amount: '' },
  onLoad(q) { this.setData({ orderNo: (q && q.orderNo) || '', amount: (q && q.amount) || '' }); },

  pay() {
    wx.showModal({
      title: '微信支付', showCancel: false, confirmText: '知道了',
      content: '支付桥已就绪。接入后端统一下单接口后，这里用 wx.requestPayment 拉起微信支付（订单号 ' + (this.data.orderNo || '—') + '，金额 ¥' + (this.data.amount || '—') + '）。'
    });
    // 阶段二示例：
    // const { j } = await apiPost('/api/wxpay', { orderNo, amount, openid });
    // wx.requestPayment({ timeStamp:j.timeStamp, nonceStr:j.nonceStr, package:j.package, signType:'RSA', paySign:j.paySign, success(){...} });
  },
  back() { wx.navigateBack(); }
});
