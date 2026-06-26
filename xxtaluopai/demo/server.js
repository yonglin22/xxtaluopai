// FateTell 塔罗 · 演示后端（独立、零依赖，Node 18+ 自带 fetch）
// 作用：静态托管 tarot.html / tarot-app.html + 提供免登录的 /api/tarot 解读接口
// 跑：  cp .env.example .env  填好 AI_KEY  →  npm start  →  http://localhost:8888/tarot-app.html
const http = require('http');
const fs = require('fs');
const path = require('path');

// 复用小程序同一份 System Prompt（核心资产）
let SYSTEM_PROMPT = '';
try { SYSTEM_PROMPT = require('./prompt.js'); }
catch (e) { SYSTEM_PROMPT = '你是塔罗解读师。结合用户领域与处境，把抽到的牌翻译成：命名处境(situation)、视角(perspective)、2-3条决策提示(insights)、一个小行动(action)。不预言、不宿命、把选择权还给用户；财运不碰具体标的与买卖时点。只输出JSON：{"cards":[{"position":"","meaning":""}],"situation":"","perspective":"","insights":[],"action":""}'; }

// 极简 .env 读取
try {
  for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n')) {
    const s = line.trim(); if (!s || s.startsWith('#')) continue;
    const i = s.indexOf('='); if (i < 0) continue;
    const k = s.slice(0, i).trim(); if (!(k in process.env)) process.env[k] = s.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
} catch {}

const PORT = process.env.PORT || 8888;
const KEY = process.env.TAROT_AI_KEY || process.env.AI_KEY || '';
const PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase();
const BASE = (process.env.AI_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
const MODEL = process.env.AI_MODEL || (PROVIDER === 'openai' ? 'deepseek-chat' : 'claude-sonnet-4-6');

// 按 IP 限频：每小时 20 次
const hits = new Map();
function rateOk(ip) { const n = Date.now(); const e = hits.get(ip); if (!e || n > e.r) { hits.set(ip, { c: 1, r: n + 3600000 }); return true; } if (e.c >= 20) return false; e.c++; return true; }

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon' };
function readBody(req) { return new Promise((res, rej) => { let d = ''; req.on('data', c => { d += c; if (d.length > 1e6) req.destroy(); }); req.on('end', () => res(d)); req.on('error', rej); }); }
function json(res, code, obj) { res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(obj)); }

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname;

  if (p === '/api/tarot' && req.method === 'POST') {
    if (!KEY) return json(res, 500, { error: '未配置 AI key（环境变量 TAROT_AI_KEY 或 AI_KEY）' });
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '?';
    if (!rateOk(ip)) return json(res, 429, { error: '体验太频繁了，歇一会儿再来～' });
    let pl; try { pl = JSON.parse((await readBody(req)) || '{}'); } catch { pl = {}; }
    const domain = String(pl.domain || '').trim(), situation = String(pl.situation || '').trim(), cardsText = String(pl.cardsText || '').trim();
    if (!['姻缘', '事业', '财运'].includes(domain) || situation.length < 4 || !cardsText) return json(res, 400, { error: '参数不完整' });
    const userMsg = `领域：${domain}\n我的处境：${situation}\n\n抽到的牌：${cardsText}\n\n请按系统设定的 JSON 结构给出解读。`;
    try {
      let url, headers, body;
      if (PROVIDER === 'openai') {
        url = BASE + '/chat/completions';
        headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + KEY };
        body = { model: MODEL, max_tokens: 1500, temperature: 0.8, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: userMsg }] };
      } else {
        url = BASE + '/v1/messages';
        headers = { 'content-type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' };
        body = { model: MODEL, max_tokens: 1500, temperature: 0.8, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: userMsg }] };
      }
      const up = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
      const text = await up.text();
      if (!up.ok) return json(res, 502, { error: '模型调用失败' });
      const j = JSON.parse(text);
      let raw = PROVIDER === 'openai' ? ((j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '') : ((j.content || []).filter(b => b.type === 'text').map(b => b.text).join(''));
      let s = String(raw).replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
      const a = s.indexOf('{'), b = s.lastIndexOf('}'); if (a >= 0 && b > a) s = s.slice(a, b + 1);
      return json(res, 200, JSON.parse(s));
    } catch (e) { return json(res, 502, { error: '解读没接上，再试一次' }); }
  }

  // 静态文件（默认进全流程原型）
  let rel = p === '/' ? '/tarot-app.html' : p;
  const fp = path.join(__dirname, path.normalize(rel));
  if (!fp.startsWith(__dirname)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404 Not Found'); }
    res.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
});
server.listen(PORT, () => console.log('FateTell 塔罗演示已启动 → http://localhost:' + PORT + '/tarot-app.html'));
