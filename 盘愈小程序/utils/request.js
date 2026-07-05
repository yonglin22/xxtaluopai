// ============================================================
// 网络请求封装 —— 复用已上线的 Cloudflare Worker 后端 /api/*
// 生产环境需在小程序后台「开发管理 · 服务器域名 · request 合法域名」
// 加入 API_BASE 域名；开发时可在开发者工具勾选「不校验合法域名」。
// ============================================================

// TODO: 换成你自己备案的域名（当前指向已上线的 Pages 地址）
const API_BASE = 'https://taluo-b76.pages.dev';

function request(path, { method = 'GET', data = {}, header = {} } = {}) {
  return new Promise((resolve) => {
    wx.request({
      url: API_BASE + path,
      method,
      data,
      header: Object.assign({ 'Content-Type': 'application/json' }, header),
      timeout: 20000,
      success(res) {
        const ok = res.statusCode >= 200 && res.statusCode < 300;
        resolve({ ok, statusCode: res.statusCode, j: res.data });
      },
      fail(err) {
        resolve({ ok: false, statusCode: 0, j: null, err: (err && err.errMsg) || '网络异常' });
      }
    });
  });
}

const apiGet = (path, data) => request(path, { method: 'GET', data });
const apiPost = (path, data) => request(path, { method: 'POST', data });

module.exports = { API_BASE, request, apiGet, apiPost };
