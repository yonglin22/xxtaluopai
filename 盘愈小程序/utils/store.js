// ============================================================
// 本地存储 + 全局状态（与 H5 的 state 对齐）
// ============================================================
const KEYS = {
  phone: 'py_phone',
  balance: 'py_balance',
  profile: 'py_profile',
  archives: 'py_archives',
  history: 'py_history',
  diycart: 'py_diycart',
  diyorders: 'py_diyorders'
};

function getS(key, def) {
  try { const v = wx.getStorageSync(key); return (v === '' || v === undefined || v === null) ? def : v; }
  catch (e) { return def; }
}
function setS(key, val) { try { wx.setStorageSync(key, val); } catch (e) {} }

const store = {
  KEYS,
  get phone() { return getS(KEYS.phone, ''); },
  set phone(v) { setS(KEYS.phone, v || ''); },
  get balance() { return +getS(KEYS.balance, 0) || 0; },
  set balance(v) { setS(KEYS.balance, +v || 0); },
  get profile() { return getS(KEYS.profile, null); },
  set profile(v) { setS(KEYS.profile, v || null); },
  get archives() { return getS(KEYS.archives, []) || []; },
  set archives(v) { setS(KEYS.archives, v || []); },
  get history() { return getS(KEYS.history, []) || []; },
  set history(v) { setS(KEYS.history, v || []); },
  get diyCart() { return getS(KEYS.diycart, []) || []; },
  set diyCart(v) { setS(KEYS.diycart, v || []); },
  get diyOrders() { return getS(KEYS.diyorders, []) || []; },
  set diyOrders(v) { setS(KEYS.diyorders, v || []); },
  isLoggedIn() { return !!this.phone; },
  logout() { this.phone = ''; }
};

module.exports = store;
