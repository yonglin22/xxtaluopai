// 充值（人工开通流程，与朱砂一致）：只建「待支付」订单 + 查订单状态。
// 真正入账由 admin 云函数（客服后台「confirmOrder」）完成，前端永不直接加分。
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 套餐唯一真源（前端展示与计价都以此为准）。改价改这里。
const PACKS = [
  { id: 'p1', cny: 1, credits: 100, label: '体验' },
  { id: 'p6', cny: 6, credits: 600, label: '基础' },
  { id: 'p30', cny: 30, credits: 3300, label: '进阶', tag: '送300' },
  { id: 'p68', cny: 68, credits: 8000, label: '工作室', tag: '送1200' }
];
function outTradeNo() { return 'T' + Date.now() + Math.floor(Math.random() * 1e6); }

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const action = event.action || 'create';

  if (action === 'packs') return { ok: true, packs: PACKS };

  // 轮询订单状态：客服后台开通后变 paid，前端据此刷新余额
  if (action === 'status') {
    const ord = (await db.collection('orders').where({ outTradeNo: String(event.outTradeNo || '') }).limit(1).get()).data[0];
    if (!ord || ord.openid !== OPENID) return { ok: false, error: '订单不存在' };
    return { ok: true, status: ord.status, credits: ord.credits };
  }

  // create：仅生成「待支付」订单，返回订单号。用户照订单号去付款 + 找客服开通。
  const pack = PACKS.find((p) => p.id === event.packId);
  if (!pack) return { ok: false, error: '套餐不存在' };
  const u = (await db.collection('users').where({ openid: OPENID }).limit(1).get()).data[0];
  if (!u) return { ok: false, error: '未登录' };
  const no = outTradeNo();
  await db.collection('orders').add({ data: {
    openid: OPENID, outTradeNo: no, packId: pack.id, amountFen: pack.cny * 100,
    credits: pack.credits, status: 'pending', createdAt: Date.now()
  }});
  return { ok: true, outTradeNo: no, pack };
};
