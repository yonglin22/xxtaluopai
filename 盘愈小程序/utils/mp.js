// 混合小程序 · web-view 主机工具（整屏内嵌 H5，H5 自带毛玻璃 tabbar）
const H5_BASE = 'https://taluo-b76.pages.dev/';
function getPhone() { try { return wx.getStorageSync('py_phone') || ''; } catch (e) { return ''; } }
function setPhone(p) { try { wx.setStorageSync('py_phone', p || ''); } catch (e) {} }
// 原生支付成功后暂存「订单号|金额(元)」，下次进 web-view 通过 ?paid= 一次性回传给 H5 补心元
function getPaid() { try { return wx.getStorageSync('py_paid') || ''; } catch (e) { return ''; } }
function setPaid(v) { try { wx.setStorageSync('py_paid', v || ''); } catch (e) {} }
// 整屏 H5：?mp=1（不隐藏 H5 tabbar）+ 登录态 + 顶部安全区留白 + 支付回传 + 深链落屏 + 邀请码
function urlFull(safetop, screen, ref) {
  let u = H5_BASE + '?mp=1';
  const p = getPhone(); if (p) u += '&phone=' + encodeURIComponent(p);
  const paid = getPaid(); if (paid) { u += '&paid=' + encodeURIComponent(paid); setPaid(''); } // 读走即清，避免重复回传
  if (safetop) u += '&safetop=' + safetop;
  if (screen) u += '&screen=' + encodeURIComponent(screen); // 分享深链：进入后直接落到该屏
  if (ref) u += '&ref=' + encodeURIComponent(ref); // 邀请裂变：被邀请者进入后自动绑定上级（站内，不导流站外）
  return u;
}
module.exports = { H5_BASE, getPhone, setPhone, getPaid, setPaid, urlFull };
