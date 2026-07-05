Page({
  data: { title: '该功能' },
  onLoad(q) { if (q && q.title) { const t = decodeURIComponent(q.title); this.setData({ title: t }); wx.setNavigationBarTitle({ title: t }); } },
  back() { const p = getCurrentPages(); if (p.length > 1) wx.navigateBack(); else wx.switchTab({ url: '/pages/home/home' }); }
});
