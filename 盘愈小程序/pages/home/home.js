const app = getApp();
const store = require('../../utils/store.js');
const { DECK } = require('../../utils/tarot.js');

Page({
  data: {
    nick: '朋友',
    todayCard: '',
    todayPos: '',
    fates: [
      { key: 'ask',  en: 'ASK · TAROT', seal: '问', title: '心里有事\n直接问牌', sub: '写下困惑 · 起牌师发牌 · 温柔回应', cta: '去说说' },
      { key: 'syn',  en: 'HÉ · PÁN',    seal: '合', title: '关系合盘',        sub: '测你和 TA 的八字契合度 · 拉 TA 一起', cta: '拉 TA 一起测' },
      { key: 'bazi', en: 'BĀ · ZÌ',     seal: '命', title: '八字命盘',        sub: '四柱五行 · 喜用忌神 · 中医体质', cta: '排我的八字' }
    ],
    moods: [
      { key: 'treehole', t: '情绪树洞',   d: '匿名写下纠结，抽牌 + 陪伴回信' },
      { key: 'capsule',  t: '时光胶囊',   d: '写一封信，寄给未来的自己' },
      { key: 'decide',   t: '两难天平',   d: '去留、选 A 还是 B？听见心里的答案' },
      { key: 'sos',      t: '深夜情绪急救', d: '撑不住时，90 秒先稳住你' }
    ]
  },

  onShow() {
    const p = store.profile;
    const phone = store.phone;
    const nick = (p && p.nick) || (phone ? ('用户' + phone.slice(-4)) : '朋友');
    // 今日牌：按当天日期取一张固定牌
    const d = new Date();
    const seed = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
    const c = DECK[seed % DECK.length];
    this.setData({ nick, todayCard: c.name, todayPos: (seed % 2 ? '逆位' : '正位') });
  },

  goAsk() { wx.switchTab({ url: '/pages/ask/ask' }); },
  goShop() { wx.switchTab({ url: '/pages/shop/shop' }); },

  onFate(e) {
    const k = e.currentTarget.dataset.k;
    if (k === 'ask') return this.goAsk();
    if (k === 'bazi') return wx.navigateTo({ url: '/pages/bazi/bazi' });
    const map = { syn: '关系合盘' };
    this.soon(map[k] || '该功能');
  },
  onMood(e) {
    const k = e.currentTarget.dataset.k;
    const map = { treehole: '情绪树洞', capsule: '时光胶囊', decide: '两难天平', sos: '深夜情绪急救' };
    this.soon(map[k] || '该功能');
  },
  soon(title) { wx.navigateTo({ url: '/pages/soon/soon?title=' + encodeURIComponent(title) }); }
});
