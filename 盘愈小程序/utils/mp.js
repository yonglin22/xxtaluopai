// 混合小程序 · web-view 主机工具（整屏内嵌 H5，H5 自带毛玻璃 tabbar）
const H5_BASE = 'https://taluo-b76.pages.dev/';
function getPhone() { try { return wx.getStorageSync('py_phone') || ''; } catch (e) { return ''; } }
function setPhone(p) { try { wx.setStorageSync('py_phone', p || ''); } catch (e) {} }
// 整屏 H5：?mp=1（不隐藏 H5 tabbar）+ 登录态 + 顶部安全区留白
function urlFull(safetop) {
  let u = H5_BASE + '?mp=1';
  const p = getPhone(); if (p) u += '&phone=' + encodeURIComponent(p);
  if (safetop) u += '&safetop=' + safetop;
  return u;
}
module.exports = { H5_BASE, getPhone, setPhone, urlFull };
