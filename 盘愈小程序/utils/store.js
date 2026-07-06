// ============================================================
// 本地存储（原生外壳）
// 注意：web-view 内 H5 跑在 taluo-b76.pages.dev，其 localStorage 与小程序 wx.storage
// 物理隔离、不互通；余额/档案等都在 H5 侧。原生侧只需 phone，经 ?phone= 桥接进 H5。
// ============================================================
const KEYS = { phone: 'py_phone' };

function getS(key, def) {
  try { const v = wx.getStorageSync(key); return (v === '' || v === undefined || v === null) ? def : v; }
  catch (e) { return def; }
}
function setS(key, val) { try { wx.setStorageSync(key, val); } catch (e) {} }

const store = {
  KEYS,
  get phone() { return getS(KEYS.phone, ''); },
  set phone(v) { setS(KEYS.phone, v || ''); },
  isLoggedIn() { return !!this.phone; },
  logout() { this.phone = ''; }
};

module.exports = store;
