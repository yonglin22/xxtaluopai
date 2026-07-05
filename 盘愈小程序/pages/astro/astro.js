Page({
  data: {
    items: [
      { k: '本命星盘', d: '日月升 · 十星 · 相位' },
      { k: '八字命盘', d: '四柱五行 · 喜用忌神 · 中医体质' },
      { k: '关系合盘', d: '和 TA 的八字契合度' }
    ]
  },
  tap(e) { wx.navigateTo({ url: '/pages/soon/soon?title=' + encodeURIComponent(e.currentTarget.dataset.k) }); }
});
