const store = require('../../utils/store.js');
const { fateWXFromBirth, fateTizhi, FATE_ELCN } = require('../../utils/bazi.js');

const SHICHEN = ['不确定 / 未知','子时 23:00–01:00','丑时 01:00–03:00','寅时 03:00–05:00','卯时 05:00–07:00','辰时 07:00–09:00','巳时 09:00–11:00','午时 11:00–13:00','未时 13:00–15:00','申时 15:00–17:00','酉时 17:00–19:00','戌时 19:00–21:00','亥时 21:00–23:00'];
// 五行显示（生成序 木火土金水）+ 配色
const EL_ORDER = [
  { k: 'mu',   cn: '木', color: '#6f9e78' },
  { k: 'huo',  cn: '火', color: '#C24A38' },
  { k: 'tu',   cn: '土', color: '#C9A24E' },
  { k: 'jin',  cn: '金', color: '#b0a893' },
  { k: 'shui', cn: '水', color: '#5a6b8c' }
];

Page({
  data: {
    date: '1994-05-22', bh: 0, sex: 'female',
    shichen: SHICHEN, editing: true,
    wx: null, pillars: [], bars: [], favCN: '', avoCN: '', tizhi: null, todayMax: 0
  },

  onShow() {
    const p = store.profile;
    if (p && p.sy) {
      this.setData({
        date: p.sy + '-' + pad(p.sm) + '-' + pad(p.sd),
        bh: p.bh || 0, sex: p.sex || 'female'
      }, () => this.compute(false));
    }
  },

  onDate(e) { this.setData({ date: e.detail.value }); },
  onShichen(e) { this.setData({ bh: +e.detail.value }); },
  onSex(e) { this.setData({ sex: e.currentTarget.dataset.v }); },
  toggleEdit() { this.setData({ editing: !this.data.editing }); },

  compute(save) {
    const parts = (this.data.date || '').split('-').map(Number);
    if (parts.length !== 3 || !parts[0]) { wx.showToast({ title: '请选择出生日期', icon: 'none' }); return; }
    const bp = { sy: parts[0], sm: parts[1], sd: parts[2], bh: this.data.bh };
    const w = fateWXFromBirth(bp);
    if (!w) { wx.showToast({ title: '排盘失败', icon: 'none' }); return; }

    // 持久化到本地档案（供各排盘页共用）
    if (save !== false) {
      const prof = Object.assign({}, store.profile || {}, {
        cal: 'solar', sex: this.data.sex, by: parts[0], bm: parts[1], bd: parts[2],
        sy: parts[0], sm: parts[1], sd: parts[2], bh: this.data.bh
      });
      store.profile = prof;
    }

    const gz = (w.pillars || '').split(' ');
    const labels = ['年', '月', '日', '时'];
    const pillars = gz.map((s, i) => ({
      label: labels[i],
      gan: (s && s[0]) || '—',
      zhi: (s && s.length > 1) ? s[1] : '—'
    }));

    const maxv = Math.max.apply(null, EL_ORDER.map(e => w.scores[e.k])) || 1;
    const fav = w.favorable || [], avo = w.avoid || [];
    const bars = EL_ORDER.map(e => ({
      cn: e.cn, color: e.color, v: w.scores[e.k],
      pct: Math.round(w.scores[e.k] / maxv * 100),
      fav: fav.indexOf(e.k) >= 0, avo: avo.indexOf(e.k) >= 0
    }));

    this.setData({
      wx: w, pillars, bars,
      favCN: fav.map(k => FATE_ELCN[k]).join('') || '—',
      avoCN: avo.map(k => FATE_ELCN[k]).join('') || '—',
      dayMasterCN: FATE_ELCN[w.dayMaster],
      tizhi: fateTizhi(w),
      editing: false
    });
    wx.pageScrollTo({ scrollTop: 0, duration: 200 });
  },

  goShop() { wx.switchTab({ url: '/pages/shop/shop' }); }
});

function pad(n) { return (n < 10 ? '0' : '') + n; }
