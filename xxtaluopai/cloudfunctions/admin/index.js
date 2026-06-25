// 客服后台：按订单号开通到账 / 查订单 / 手动调整积分。鉴权：管理员 openid 白名单 或 adminToken。
// 客服日常用法（云开发控制台 → 云函数 admin → 云端测试）：
//   { "action": "confirmOrder", "outTradeNo": "T1750...", "adminToken": "你的ADMIN_TOKEN" }
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const ADMIN_OPENIDS = (process.env.ADMIN_OPENIDS || '').split(',').map(s => s.trim()).filter(Boolean);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

function authed(event, OPENID) {
  if (ADMIN_TOKEN && event.adminToken === ADMIN_TOKEN) return true;   // 控制台/外部调用
  if (OPENID && ADMIN_OPENIDS.includes(OPENID)) return true;          // 管理员在小程序内
  return false;
}

// 按订单号入账（幂等）：pending → paid，加余额、写流水
async function creditOrder(outTradeNo) {
  const ord = (await db.collection('orders').where({ outTradeNo }).limit(1).get()).data[0];
  if (!ord) return { ok: false, error: '订单不存在：' + outTradeNo };
  const u = (await db.collection('users').where({ openid: ord.openid }).limit(1).get()).data[0];
  if (!u) return { ok: false, error: '用户不存在' };
  let balance = u.balance || 0, already = false;
  await db.runTransaction(async (t) => {
    const o = (await t.collection('orders').doc(ord._id).get()).data;
    if (o.status === 'paid') { already = true; return; }
    const cu = (await t.collection('users').doc(u._id).get()).data;
    balance = (cu.balance || 0) + ord.credits;
    await t.collection('users').doc(u._id).update({ data: { balance } });
    await t.collection('orders').doc(ord._id).update({ data: { status: 'paid', paidAt: Date.now() } });
    await t.collection('ledger').add({ data: {
      openid: ord.openid, type: 'recharge', amount: ord.credits, balanceAfter: balance,
      refType: 'order', refId: ord._id, requestId: 'order_' + outTradeNo,
      meta: { packId: ord.packId, by: 'admin' }, createdAt: Date.now()
    }});
  });
  return { ok: true, already, openid: ord.openid, credits: ord.credits, balance };
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  if (!authed(event, OPENID)) return { ok: false, error: '无权限（需管理员 openid 或 adminToken）' };
  const action = event.action || 'confirmOrder';

  if (action === 'confirmOrder') {
    if (!event.outTradeNo) return { ok: false, error: '缺少 outTradeNo' };
    return await creditOrder(String(event.outTradeNo));
  }

  // 查订单（客服核对：金额、状态、属于谁）
  if (action === 'lookupOrder') {
    const ord = (await db.collection('orders').where({ outTradeNo: String(event.outTradeNo || '') }).limit(1).get()).data[0];
    if (!ord) return { ok: false, error: '订单不存在' };
    const u = (await db.collection('users').where({ openid: ord.openid }).limit(1).get()).data[0];
    return { ok: true, order: ord, balance: u ? u.balance : null };
  }

  // 手动调整积分（按 openid，+/-）
  if (action === 'adjust') {
    const delta = parseInt(event.amount, 10) || 0;
    const u = (await db.collection('users').where({ openid: String(event.openid || '') }).limit(1).get()).data[0];
    if (!u) return { ok: false, error: '用户不存在' };
    let balance = u.balance || 0;
    await db.runTransaction(async (t) => {
      const cu = (await t.collection('users').doc(u._id).get()).data;
      balance = (cu.balance || 0) + delta;
      await t.collection('users').doc(u._id).update({ data: { balance } });
      await t.collection('ledger').add({ data: {
        openid: u.openid, type: delta >= 0 ? 'admin_grant' : 'admin_deduct', amount: delta, balanceAfter: balance,
        refType: 'admin', refId: null, meta: { reason: event.reason || '管理员调整' }, createdAt: Date.now()
      }});
    });
    return { ok: true, balance };
  }

  return { ok: false, error: '未知操作' };
};
