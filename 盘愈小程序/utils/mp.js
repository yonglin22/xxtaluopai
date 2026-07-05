// ============================================================
// 混合小程序 · web-view 主机工具
// 每个原生 tab 内嵌 H5 对应 screen，并带上登录态(phone)。
// 上线前把 H5_BASE 换成你的备案域名。
// ============================================================
const H5_BASE = 'https://taluo-b76.pages.dev/';

function getPhone() { try { return wx.getStorageSync('py_phone') || ''; } catch (e) { return ''; } }
function setPhone(p) { try { wx.setStorageSync('py_phone', p || ''); } catch (e) {} }

// 构造某个 H5 屏的 web-view URL：?mp=1&tab=1&screen=X&phone=Y
function url(screen) {
  let u = H5_BASE + '?mp=1&tab=1';
  if (screen) u += '&screen=' + encodeURIComponent(screen);
  const p = getPhone();
  if (p) u += '&phone=' + encodeURIComponent(p);
  return u;
}

module.exports = { H5_BASE, getPhone, setPhone, url };
