const app = getApp();
const store = require('../../utils/store.js');

Page({
  data: { phone: '', balance: 0, nick: '', cartCount: 0, loggedIn: false },

  onShow() {
    const p = store.profile;
    this.setData({
      loggedIn: store.isLoggedIn(),
      phone: store.phone,
      balance: store.balance,
      nick: (p && p.nick) || (store.phone ? ('用户' + store.phone.slice(-4)) : '未登录'),
      cartCount: (store.diyCart || []).length
    });
  },

  goLogin() { wx.navigateTo({ url: '/pages/login/login' }); },
  goRecharge() { this.soon('充值'); },
  goShop() { wx.switchTab({ url: '/pages/shop/shop' }); },

  onEntry(e) {
    const map = {
      cart: '我的购物车', orders: '我的订单', archive: '档案管理',
      invite: '邀请好友', orb: '我的心光球', biz: '运营后台'
    };
    this.soon(map[e.currentTarget.dataset.k] || '该功能');
  },

  logout() {
    wx.showModal({
      title: '退出登录', content: '下次需重新登录', confirmText: '退出登录',
      success: (r) => { if (r.confirm) { store.logout(); this.onShow(); wx.reLaunch({ url: '/pages/login/login' }); } }
    });
  },
  soon(title) { wx.navigateTo({ url: '/pages/soon/soon?title=' + encodeURIComponent(title) }); }
});
