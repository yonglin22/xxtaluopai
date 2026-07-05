const app = getApp();
const store = require('../../utils/store.js');
const { DOMAINS, drawCards, demoReading } = require('../../utils/tarot.js');
const { apiPost } = require('../../utils/request.js');

Page({
  data: {
    domains: DOMAINS,
    domain: '姻缘',
    text: '',
    stage: 'input',        // input | loading | result
    cards: [],
    result: null,
    showMore: false
  },

  pickDomain(e) { this.setData({ domain: e.currentTarget.dataset.k }); },
  onInput(e) { this.setData({ text: e.detail.value }); },
  toggleMore() { this.setData({ showMore: !this.data.showMore }); },

  async runReading() {
    const text = (this.data.text || '').trim();
    if (text.length < 2) { wx.showToast({ title: '先说说你在纠结什么', icon: 'none' }); return; }

    const cards = drawCards(3);
    this.setData({ stage: 'loading', cards });

    const cardsText = cards.map(c => `${c.position}·${c.name}(${c.reversed ? '逆位' : '正位'})`).join('、');
    let data = null;
    try {
      const res = await apiPost('/api/tarot', {
        domain: this.data.domain,
        situation: text,
        cardsText,
        cards: cards.map(c => ({ name: c.name, reversed: c.reversed })),
        phone: store.phone || ''
      });
      if (res.ok && res.j && res.j.perspective && !res.j.error) data = res.j;
    } catch (e) {}
    if (!data) data = demoReading(this.data.domain, text, cards);

    // 合并每张牌的含义
    const merged = cards.map((c, i) => Object.assign({}, c, {
      meaning: (data.cards && data.cards[i] && data.cards[i].meaning) || ''
    }));

    // 存历史
    try {
      const h = store.history; h.unshift({ domain: this.data.domain, text, when: Date.now(), cards: merged, data });
      store.history = h.slice(0, 50);
    } catch (e) {}

    this.setData({ stage: 'result', cards: merged, result: data, showMore: false });
    wx.pageScrollTo({ scrollTop: 0, duration: 200 });
  },

  askAgain() { this.setData({ stage: 'input', text: '', result: null, showMore: false }); },
  collect() { wx.showToast({ title: '已收藏（演示）', icon: 'none' }); },
  goShop() { wx.switchTab({ url: '/pages/shop/shop' }); }
});
