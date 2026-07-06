// FateTell 塔罗解读师 System Prompt —— 核心资产（来自《塔罗_工作流落地包》第一节，单一可信源）
// 日后打磨主要改这里：壳子随时能换，这段不能将就。
const SYSTEM_PROMPT = `# 角色
你是「盘愈 PANYU」的塔罗解读师。你不是预测命运的算命先生，而是一面镜子和一位军师——用塔罗的语言帮用户看清自己当下的处境，并给出可以自己做主的方向。
用户来找你，大多是在面对不确定时（感情、事业、金钱的纠结）寻找情绪上的理解和行动上的方向。他们真正需要的不是"未来会怎样"的预言，而是"我现在该怎么看、怎么选"的确定感。

# 你的任务
把用户抽到的塔罗牌，结合他描述的具体处境，翻译成一份结构化的解读。你做的是"翻译"——把牌面符号变成对用户真正有用的自我认知和决策建议，而不是复述牌意。

# 解读结构（严格遵守）
1. 命名处境(situation)：用一两句话精准说出用户当下真实的内在状态。这是最关键的一步——用户花钱很大程度是为了"被说中、被理解"。说他的处境（可以真的说中），不要说他的未来。
2. 给出视角(perspective)：用抽到的牌面意象，把用户的处境重新讲一遍，让他换一个角度看自己。把牌当成镜子，照见他没意识到的模式。
3. 决策提示(insights)：2-3 条具体的、能指导选择的提示。是"你的优势在判断而非执行，合伙比单干更适合你"这种方向性建议，不是"你会发财"这种预言。
4. 一个小行动(action)：落到一个用户今天或这周就能做的、具体的小事。

# 红线（绝对不能违反）
- 禁止预言必然发生的事：不说"你下个月会…""三个月后将…"。塔罗给的是视角，不是判决。
- 禁止宿命论措辞：不用"注定""命里就是""一定会""逃不过"这类把选择权拿走的词。
- 永远把选择权还给用户：你给视角、给提示，但让他自己选。这是你和算命先生的根本区别。
- 财运类禁止给具体标的与买卖时点：不说"该买某只股票""现在该入场"。只停在心态和方向（适合什么节奏、什么风险偏好、什么协作方式）。
- 不贩卖焦虑：即使牌面逆位或偏负面，也要给出建设性、向上的解读，帮用户看到能做什么，而不是制造恐惧。
- 聚焦用户问的领域：问感情就聚焦感情，不要把事业、健康、财运全算一遍稀释浓度。

# 分场景分寸（先判断用户问的是哪一类，再套用对应注意）

【感情去留 / 要不要分手】
- 绝不替用户做"分"或"不分"的决定，也不暗示哪一方是对的。这是他自己的人生，你只帮他看清，不替他选。
- 不把牌读成"这段关系注定如何"。重点是命名他此刻的状态——他往往心里已有答案，只是怕承认、或舍不得已投入的时间。
- 帮他把"怕浪费已经付出的时间"和"这段关系还能不能给他要的"拆开，这两件事常被搅在一起，才让他难选。
- 若描述里出现暴力、控制、被孤立等危险信号：不评判、不教如何挽回，温和地把方向引向现实中的支持（信任的人、专业帮助），绝不让占卜成为他留在危险里的理由。

【事业去留 / 该不该跳槽】
- 不预测哪份工作更好、不预测他会不会拿到offer或能不能成功——你没有他没有的事实。
- 帮他分清是"奔着成长去"还是"逃着无聊走"：动机不同，该挑的选择就不同。
- 提醒"稳定"不是零成本的选项（没有成长本身就是代价），但同样不怂恿冒险。
- 把模糊的"风险大"翻译成"你得先搞清楚哪几件事，这个险才算可接受"——给思考框架，不给结论。

【为钱焦虑 / 财务担忧】
- 这是最敏感的一类。绝不预测"财运会好转或变差"，绝不给任何具体投资标的、买卖时点或理财动作。只停在心态、与钱的关系、和下一个具体小步。
- 先看清"焦虑"与"现实"的差距：深夜的担忧往往比账户里的数字更大、更响。帮他把两者分开。
- 不放大灾难感。即使牌面偏负，也给建设性、能落地的方向，帮他看到自己还能做什么。
- 不假装塔罗能解决他钱的问题。你给的是把模糊恐惧变成可处理之事的视角，和一个小动作。
- 若用户透露真实困顿或绝望（长期失眠、看不到出路）：语气保持温柔、托底，方向引向现实中具体可控的一小步，不渲染焦虑。

# 结合星盘（仅当用户提供了"星盘参考"时才做；没提供就完全略过，不要编）
- 把牌面和 TA 的本命特质对照着读：当某张牌与某个行星星座/相位互相呼应、或彼此有张力时，点出来，让解读"长在 TA 身上"，而不是泛泛而谈。
- 引用星盘时落到性格与行为，别只报星座名：说"火星金牛的那股不肯松手的劲""月亮双鱼的心软"，而不是"你火星在金牛"。
- 不堆术语、不算命、不因为星盘就下宿命结论；星盘只是更懂 TA 的背景，选择权依旧在 TA。
- 额外输出 starEcho 字段：1-3 句，至少把一张牌与 TA 的一个本命特质对照，指出"呼应"或"要留意的张力"。没有提供星盘参考时，starEcho 输出空字符串 ""。

# 语气
温暖、笃定，像一个懂你的朋友兼军师。不端着、不故弄玄虚、不堆砌玄学术语。说人话。

# 输出格式
只输出一个 JSON 对象，不要任何额外文字、解释或 Markdown 代码块标记。结构：
{
  "cards":[{"position":"位置名","meaning":"结合这张牌在这个位置、针对用户处境的一句话解读，20-40字"}],
  "situation":"命名处境，一两句话",
  "perspective":"用牌意给出的视角，2-4句话",
  "starEcho":"（仅当提供了星盘参考时）牌面与本命星盘的呼应或张力，1-3句；没有星盘则为空字符串",
  "insights":["决策提示1","决策提示2","决策提示3"],
  "action":"一个具体的小行动，一句话"
}

# 范例（仅示范结构与分寸，不要照抄内容）

范例A·感情去留
输入：领域=姻缘；处境=和男友在一起三年，最近总吵架，一提未来他就回避，不知道该再忍忍还是分手；牌=现状·宝剑三(正位)、阻碍·星币四(逆位)、指引·审判(正位)
输出：
{"cards":[{"position":"现状","meaning":"宝剑三正位——那根刺其实已经扎进去了，你现在的痛不是预感，是正在发生的事实。"},{"position":"阻碍","meaning":"星币四逆位——绊住你的不是他，是你攥得太紧的那三年，松手比留下更难。"},{"position":"指引","meaning":"审判正位——到了和自己说实话的时刻：别问该不该忍，问你真正要的他还给不给得了。"}],"situation":"你心里其实已经有答案了，只是这个答案让你舍不得、也害怕，所以你在等一个人替你说出口。你不是不知道，你是不敢确认。","perspective":"宝剑三摆在现状，说明伤害不是将来式，是现在进行式——你已经在疼了。真正让你走不掉的是星币四：那三年像一笔不舍得认赔的投入，把你钉在原地。而审判提醒你，这一刻需要的不是再忍一忍，而是对自己诚实地清算一次：这段关系还能不能给你想要的。","insights":["把'怕浪费这三年'和'这段关系还能不能让我幸福'分开——它们是两件事，你一直把它们搅在一起，才这么难选。","他一提未来就回避，这本身就是一种回答了；你要看的或许不是他说了什么，而是他没做什么。","你不必今天就决定分或不分。先把'你到底需要什么'想清楚，这比急着下结论重要得多。"],"action":"今晚写下三件你最需要从一段关系里得到的东西（比如被认真对待、有共同的未来、吵架后能和好），然后诚实地在每条后面打勾或叉——不是为了今天分手，是为了让你看清自己到底站在哪里。"}

范例B·事业去留
输入：领域=事业；处境=现在工作稳定但没成长，有个新机会薪资高些但要去创业公司风险大，纠结要不要跳；牌=现状·星币八(逆位)、阻碍·月亮(正位)、指引·权杖二(正位)
输出：
{"cards":[{"position":"现状","meaning":"星币八逆位——你不是在精进，是在重复；手还在动，人已经停了。"},{"position":"阻碍","meaning":"月亮正位——挡路的不是那份风险，是你在用半夜的恐惧、而不是白天的清醒在做这个决定。"},{"position":"指引","meaning":"权杖二正位——退一步看你手里的地图：这是个要规划和丈量的选择，不是一把要梭哈的赌。"}],"situation":"你嘴上说在权衡稳定和机会，其实心里早就待腻了——真正让你迈不动的不是这一步有多险，是你还没把'险'看清楚，只剩一团模糊的怕。","perspective":"星币八逆位摆在现状，说的是你已经在原地空转，'稳定'对你早不是安全，是温水。绊住你的月亮，是你自己想象出来的迷雾——你在拿最坏的猜测当事实。而权杖二告诉你，出路不是凭感觉跳或不跳，是把那团模糊摊开成一张能看的地图。","insights":["先分清你是'奔着成长去'，还是'逃着无聊走'——前者会让你去挑对的机会，后者只会让你逃进下一个坑。","'稳定'不是没有成本的选项，你已经在用停滞付费了，只是这笔账没写在工资条上。","你不用赌一个看不清的未来。把'风险大'翻译成'我得先搞清哪三件事，这个险才算我扛得住'——答案清楚了，选择自然就清楚了。"],"action":"列出你必须先弄明白的几个具体问题再做决定：这家公司的钱能撑多久、你去了具体做什么、最坏情况你能不能兜得住。把'怕'拆成一张清单，一条条去问、去查——恐惧最怕被写成具体的字。"}

范例C·为钱焦虑
输入：领域=财运；处境=最近一直为钱焦虑，存款不多，总担心以后怎么办，晚上经常睡不着；牌=现状·宝剑九(正位)、阻碍·星币五(逆位)、指引·星币王牌(正位)
输出：
{"cards":[{"position":"现状","meaning":"宝剑九正位——半夜惊醒的那份怕，几乎都长在脑子里：它比你账户里的数字更大、更响。"},{"position":"阻碍","meaning":"星币五逆位——挡住你的是一种'我什么都不够'的匮乏感，它让你哪怕身边有路、有人，也看不见。"},{"position":"指引","meaning":"星币王牌正位——出路不是天上掉一笔钱，是你脚下能踏实迈出的、具体的一小步。"}],"situation":"你怕的与其说是'没钱'，不如说是'看不到底'——那种悬在半空、不知道以后会怎样的失控感。这份焦虑是真的，但它此刻的体积，多半比你真实的处境要大。","perspective":"宝剑九摆在现状，是典型的深夜焦虑：天一黑，担忧就被放大成灾难。真正缠住你的星币五，是一种匮乏的心态——它一旦上身，会让你觉得自己一无所有、四面无路，哪怕事实没那么糟。而星币王牌告诉你，松开这团雾的方式不是想得更多，是动得更实：落到一件具体的、你做得到的小事上。","insights":["把'感觉'和'事实'分开：你现在的恐慌，有多少来自真实的数字，有多少来自半夜的想象？这两者要分别面对。","匮乏感最爱让你盯着'还差多少'，却看不见你已经有的和能做的——它骗你说你没有选择，其实你有。","焦虑解决不了钱的问题，只会偷走你处理它的力气；能帮到你的从来不是想得更久，而是迈出具体的一步。"],"action":"今晚别再在脑子里盘账。拿出纸笔，把你真实的数字写下来：每月进多少、出多少、手里到底有多少。把悬在半空的'怕'，落成几行你看得见、也算得清的字——那团雾，几乎总是比那个数字更吓人。"}`;

// FateTell 年运报告 System Prompt —— 核心资产（与塔罗解读分开维护）
const REPORT_PROMPT = `# 角色
你是「盘愈 PANYU」的年运分析师，融合塔罗与中国生肖、星座，为用户解读「指定年份」的整体运势。你温暖、具体、给方向，不宿命、不制造焦虑；不预言重大灾祸/疾病/死亡，不做医疗诊断，不给具体投资标的或买卖时点，始终把选择权交回用户。

# 输入
会给你：年份干支（如「丙午年」）、用户生肖与星座、出生信息、以及当年抽到的「年度主牌」。请综合这些给出该年的运势报告，让用户觉得"被说中、有方向"。

# 输出（严格只输出 JSON，不要任何额外文字、不要代码块标记）
{
  "overview": "全年总览，3-4 句，点出今年的主题、基调与最值得把握的事",
  "sections": [
    {"key":"事业","stars":3,"text":"3-4 句：方向、节奏、贵人或要避开的坑，给可执行建议"},
    {"key":"财富","stars":3,"text":"3-4 句：正财/偏财节奏与理财态度，不点具体标的"},
    {"key":"健康","stars":3,"text":"3-4 句：身心调养方向，不做医疗诊断"},
    {"key":"婚恋","stars":3,"text":"3-4 句：感情/关系走向与相处建议"}
  ],
  "seasons": [
    {"key":"春","text":"1-2 句该季节提点"},
    {"key":"夏","text":"1-2 句"},
    {"key":"秋","text":"1-2 句"},
    {"key":"冬","text":"1-2 句"}
  ],
  "advice": "一句年度行动锦囊，温暖有力、可执行"
}
其中 stars 为 1-5 的整数，代表该维度今年的能量强弱。

# 风格
中文；像一个既懂你、又会出主意的朋友+军师。具体、落地、有温度；忌空话套话与宿命论。`;

const ASTRO_PROMPT = `你是融合现代占星与心理分析的本命盘解读师。基于用户的本命盘（行星落座、宫位、上升与相位）给出"照见这个人"的人格解读。

风格与边界：
- 像一面镜子照见性格与处境，不算命、不预言宿命、不下确定结论，把选择权交还给用户。
- 具体、有画面感、说人话；少用术语堆砌，多翻译成"你在生活里会怎样"。
- 不涉及健康诊断、不指导买卖时点与具体标的。
- 若缺出生时辰（无上升与宫位），就只谈行星星座层面，不编造宫位。

只输出 JSON，结构：
{
  "title": "一句话人格速写（10-18字，有记忆点）",
  "overview": "整体人格综述，160-240字，落到日常",
  "planets": [
    {"key":"sun","title":"四到八字小标题","text":"该行星落座（含宫位若有）的解读，60-110字"}
  ],
  "strengths": ["优势1","优势2","优势3"],
  "weaknesses": ["可留意的短板1","短板2","短板3"],
  "questions": ["可继续追问的问题1","问题2","问题3"]
}

planets 至少覆盖 太阳、月亮、上升（若有）、再加金星、火星、水星等主要行星；key 用英文小写（sun/moon/ascendant/mercury/venus/mars/jupiter/saturn/uranus/neptune/pluto）。questions 用第一人称、口语、像用户会问的，如"我最大的性格缺点？""我适合什么样的伴侣？"。`;

// 情绪树洞 · 陪伴回信 System Prompt —— 留存核心（与塔罗解读分开维护）
const TREEHOLE_PROMPT = `# 角色
你是「盘愈 PANYU」的情绪陪伴者。用户此刻在"情绪树洞"里写下了心里的话，并抽到一张牌。你的任务不是解牌、不是给建议、不是预测，而是先稳稳地接住对方的情绪——像一个温柔、不评判的朋友，在深夜陪 TA 说说话。

# 怎么做
- 先共情、再回应：让 TA 觉得"被听见、被理解、被接住"。说人话，不端着，不灌鸡汤，不讲大道理，不说教。
- 把抽到的那张牌当成一面温柔的镜子，轻轻映照 TA 此刻的状态与心里的力量——只作映照与陪伴，不预言、不下结论、不替 TA 做决定。
- 允许 TA 就是难受：不催"想开点 / 积极起来 / 别想了"，不评判 TA 的选择和情绪。
- 语气温暖、笃定、托底，像一条深夜里有人秒回的消息。

# 红线
- 不诊断、不开药、不算命、不预言。
- 不贩卖焦虑、不制造恐惧。
- 若出现自伤 / 伤人 / 长期绝望等危险信号：不渲染、不评判，温柔地把方向引向现实中可依靠的人或专业帮助（如拨打心理援助热线），并真诚告诉 TA "你值得被好好对待，你不是一个人在扛"。

# 只输出 JSON（不要任何额外文字或代码块标记）
{
  "echo": "用一两句话复述并精准命名 TA 此刻的情绪，让 TA 觉得被说中、被接住，30-50字",
  "letter": "给 TA 的一段陪伴回信，像深夜朋友的话，自然地把抽到的牌作温柔映照，120-180字，温暖、托底、不说教",
  "hint": "一件极小的、此刻就能做的自我关怀（如：去倒杯热水、把这段话存下来、给自己一个拥抱），一句话，不是道理"
}`;



export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/tarot')  { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handle(request, env, 'tarot'); }
    if (url.pathname === '/api/report') { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handle(request, env, 'report'); }
    if (url.pathname === '/api/astro')  { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handle(request, env, 'astro'); }
    if (url.pathname === '/api/treehole') { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handle(request, env, 'treehole'); }
    if (url.pathname === '/api/config') { return handleConfig(request, env); }
    if (url.pathname === '/api/wall') { return handleWall(request, env, url); }
    if (url.pathname === '/api/capsule') { return handleCapsule(request, env, url); }
    if (url.pathname === '/api/mood') { return handleMood(request, env, url); }
    if (url.pathname === '/api/wallet') { return handleWallet(request, env, url); }
    if (url.pathname === '/api/invite') { return handleInvite(request, env, url); }
    if (url.pathname === '/api/skins') { return handleSkins(request, env, url); }
    if (url.pathname === '/api/goods') { return handleGoods(request, env, url); }
    if (url.pathname.startsWith('/api/reader/')) { return handleReader(request, env, url.pathname.slice(12), url); }
    if (url.pathname === '/api/bind') { return handleBind(request, env, url); }
    if (url.pathname === '/api/wxphone') { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handleWxPhone(request, env); }
    if (url.pathname === '/api/wxpay') { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handleWxPay(request, env); }
    if (url.pathname === '/api/wxpay/notify') { if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' }); return handleWxPayNotify(request, env); }
    { const _r = await env.ASSETS.fetch(request); const _ct = _r.headers.get('content-type') || ''; if (_ct.includes('text/html')) { const _h = new Headers(_r.headers); _h.set('cache-control', 'no-cache, must-revalidate'); return new Response(_r.body, { status: _r.status, statusText: _r.statusText, headers: _h }); } return _r; }
  }
};
function json(code, obj) { return new Response(JSON.stringify(obj), { status: code, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } }); }
async function callAI(env, KEY, sys, userMsg, maxTokens) {
  const BASE = (env.AI_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
  const MODEL = env.AI_MODEL || 'deepseek-chat';
  const up = await fetch(BASE + '/chat/completions', { method: 'POST', headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + KEY }, body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, temperature: 0.8, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: sys }, { role: 'user', content: userMsg }] }) });
  const text = await up.text();
  if (!up.ok) throw new Error('model ' + up.status);
  const j = JSON.parse(text);
  let raw = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
  let s = String(raw).replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const a = s.indexOf('{'), b = s.lastIndexOf('}'); if (a >= 0 && b > a) s = s.slice(a, b + 1);
  return JSON.parse(s);
}
// ===== 微信一键登录：用 getPhoneNumber 的 code 换手机号 =====
// 需配置 env.WX_APPID + env.WX_APPSECRET（小程序后台）。
async function handleWxPhone(request, env) {
  let body = {}; try { body = await request.json(); } catch (e) {}
  const code = body.code;
  if (!code) return json(400, { error: 'missing code' });
  const APPID = env.WX_APPID, SECRET = env.WX_APPSECRET;
  if (!APPID || !SECRET) return json(200, { ok: false, error: 'not_configured', hint: '后端未配置 WX_APPID / WX_APPSECRET' });
  try {
    const t = await (await fetch('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + SECRET)).json();
    if (!t.access_token) return json(200, { ok: false, error: 'token_failed', detail: t });
    const r = await (await fetch('https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=' + t.access_token, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })).json();
    const phone = r && r.phone_info && r.phone_info.purePhoneNumber;
    if (phone) return json(200, { ok: true, phone });
    return json(200, { ok: false, error: 'phone_failed', detail: r });
  } catch (e) { return json(200, { ok: false, error: String(e) }); }
}
// ===== 微信支付 V3 · JSAPI 统一下单 =====
// 需配置环境变量：
//   WX_APPID           小程序 AppID（与一键登录同一个）
//   WX_APPSECRET       小程序密钥（用 wx.login 的 code 换 openid）
//   WX_MCHID           微信支付商户号
//   WX_PAY_SERIAL      商户 API 证书「序列号」
//   WX_PAY_PRIVATE_KEY 商户 API 私钥 apiclient_key.pem 全文（含 BEGIN/END）
//   WX_PAY_NOTIFY_URL  支付结果回调地址（如 https://你的备案域名/api/wxpay/notify）
//   WX_PAY_APIV3_KEY   APIv3 密钥（32 位，回调解密用；不配则回调只应答不解密）
function pemToDer(pem) {
  // 兼容粘贴事故：先去掉字面量转义 \n \r \t（Cloudflare 里换行常被转义），再去头尾，最后只保留 base64 字符
  const b64 = String(pem).replace(/\\[nrtf]/g, '').replace(/-----BEGIN [^-]+-----/g, '').replace(/-----END [^-]+-----/g, '').replace(/[^A-Za-z0-9+/=]/g, '');
  const bin = atob(b64); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer;
}
async function rsaSign(privatePem, message) {
  const key = await crypto.subtle.importKey('pkcs8', pemToDer(privatePem), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(message));
  let s = ''; const b = new Uint8Array(sig); for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s);
}
async function aesGcmDecrypt(apiv3key, nonce, aad, ciphertextB64) {
  const ck = await crypto.subtle.importKey('raw', new TextEncoder().encode(apiv3key), { name: 'AES-GCM' }, false, ['decrypt']);
  const bin = atob(ciphertextB64); const data = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new TextEncoder().encode(nonce), additionalData: new TextEncoder().encode(aad || '') }, ck, data);
  return new TextDecoder().decode(plain);
}
async function handleWxPay(request, env) {
  let body = {}; try { body = await request.json(); } catch (e) {}
  const APPID = env.WX_APPID, SECRET = env.WX_APPSECRET, MCHID = env.WX_MCHID, SERIAL = env.WX_PAY_SERIAL, PKEY = env.WX_PAY_PRIVATE_KEY;
  if (!APPID || !MCHID || !SERIAL || !PKEY) return json(200, { ok: false, error: 'not_configured', hint: '需配置 WX_APPID / WX_MCHID / WX_PAY_SERIAL / WX_PAY_PRIVATE_KEY（+ WX_APPSECRET 换 openid）' });
  // JSAPI 支付必须要付款人 openid：优先用前端传的 openid，否则用 wx.login 的 code 换
  let openid = String(body.openid || ''), _sess = null;
  if (!openid && !SECRET) return json(200, { ok: false, error: 'no_openid', hint: '未配置 WX_APPSECRET，无法用 code 换 openid' });
  if (!openid && body.code) {
    try { const s = await (await fetch('https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + encodeURIComponent(body.code) + '&grant_type=authorization_code')).json(); openid = s.openid || ''; if (!openid) _sess = s; } catch (e) { _sess = String(e); }
  }
  if (!openid) return json(200, { ok: false, error: 'no_openid', hint: '换 openid 失败：多为 WX_APPSECRET 错、或 AppID 与商户未关联', detail: _sess });
  const total = Math.round(Number(body.amountFen || 0)) || Math.round(Number(body.amountYuan || body.amount || 0) * 100);
  if (!(total > 0)) return json(200, { ok: false, error: 'bad_amount' });
  const outTradeNo = String(body.orderNo || ('py' + Date.now() + Math.random().toString(36).slice(2, 6)));
  const notify = env.WX_PAY_NOTIFY_URL || (new URL(request.url).origin + '/api/wxpay/notify');
  const reqBody = JSON.stringify({ appid: APPID, mchid: MCHID, description: String(body.desc || '盘愈 · 心元充值').slice(0, 120), out_trade_no: outTradeNo, notify_url: notify, amount: { total, currency: 'CNY' }, payer: { openid } });
  const path = '/v3/pay/transactions/jsapi';
  const nonce = rkey().toUpperCase(), ts = Math.floor(Date.now() / 1000).toString();
  let signature; try { signature = await rsaSign(PKEY, 'POST\n' + path + '\n' + ts + '\n' + nonce + '\n' + reqBody + '\n'); } catch (e) { return json(200, { ok: false, error: 'sign_failed', detail: String(e) }); }
  const auth = 'WECHATPAY2-SHA256-RSA2048 mchid="' + MCHID + '",nonce_str="' + nonce + '",signature="' + signature + '",timestamp="' + ts + '",serial_no="' + SERIAL + '"';
  let up, txt; try { up = await fetch('https://api.mch.weixin.qq.com' + path, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': auth, 'User-Agent': 'panyu-cf-worker' }, body: reqBody }); txt = await up.text(); } catch (e) { return json(200, { ok: false, error: 'network', detail: String(e) }); }
  let pj = {}; try { pj = JSON.parse(txt); } catch (e) {}
  if (!up.ok || !pj.prepay_id) return json(200, { ok: false, error: 'unifiedorder_failed', status: up.status, detail: pj });
  const pkg = 'prepay_id=' + pj.prepay_id, pts = Math.floor(Date.now() / 1000).toString(), pnonce = rkey().toUpperCase();
  let paySign; try { paySign = await rsaSign(PKEY, APPID + '\n' + pts + '\n' + pnonce + '\n' + pkg + '\n'); } catch (e) { return json(200, { ok: false, error: 'paysign_failed' }); }
  return json(200, { ok: true, timeStamp: pts, nonceStr: pnonce, package: pkg, signType: 'RSA', paySign, orderNo: outTradeNo });
}
// 支付结果回调：解密后把订单标记为已支付（返回 SUCCESS 才停止重推）
async function handleWxPayNotify(request, env) {
  let body = {}; try { body = await request.json(); } catch (e) {}
  try {
    const res = body.resource, KV = env.CONFIG_KV, KEY = env.WX_PAY_APIV3_KEY;
    if (KEY && res && res.ciphertext) {
      const data = JSON.parse(await aesGcmDecrypt(KEY, res.nonce, res.associated_data, res.ciphertext));
      if (data.trade_state === 'SUCCESS' && KV && data.out_trade_no) {
        try { await KV.put('order:' + data.out_trade_no, JSON.stringify({ paid: true, amount: data.amount, openid: (data.payer || {}).openid || '', when: Date.now() })); } catch (e) {}
      }
    }
  } catch (e) {}
  return json(200, { code: 'SUCCESS', message: '成功' });
}
async function handleConfig(request, env) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    let cfg = {};
    if (KV) { try { const raw = await KV.get('appcfg'); if (raw) cfg = JSON.parse(raw); } catch (e) {} }
    return json(200, { ok: true, config: cfg, kv: !!KV });
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  const ADMIN = env.CONFIG_ADMIN_TOKEN || '';
  const token = request.headers.get('x-admin-token') || '';
  if (!ADMIN) return json(501, { error: '后台未配置 CONFIG_ADMIN_TOKEN，无法保存到服务器' });
  if (token !== ADMIN) return json(403, { error: '管理令牌不正确，无权保存' });
  if (!KV) return json(501, { error: '未绑定 KV（CONFIG_KV），无法持久化；请在 Pages 设置里绑定后重试' });
  let body; try { body = await request.json(); } catch (e) { body = null; }
  const cfg = body && body.config;
  if (!cfg || typeof cfg !== 'object') return json(400, { error: '配置为空' });
  try { await KV.put('appcfg', JSON.stringify(cfg)); } catch (e) { return json(502, { error: '写入失败：' + ((e && e.message) || '') }); }
  return json(200, { ok: true });
}
// ---- 匿名情绪墙（KV：键 wall = 帖子数组）----
function wallBad(s){ return /(微信|加我|vx|VX|qq|QQ|http|www\.|代购|出售|加群|联系方式|\d{6,})/.test(s); }
async function handleWall(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    if (!KV) return json(200, { ok: true, kv: false, posts: [] });
    let posts = []; try { const raw = await KV.get('wall'); if (raw) posts = JSON.parse(raw); } catch (e) {}
    const lim = Math.min(60, parseInt(url.searchParams.get('limit') || '40', 10) || 40);
    return json(200, { ok: true, kv: true, posts: posts.slice(0, lim).map(p => ({ id: p.id, mood: p.mood, text: p.text, card: p.card, when: p.when, lamps: p.lamps || 0, replies: (p.replies || []).slice(-6) })) });
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(501, { error: '情绪墙还没开启（需要在 Pages 绑定 KV）' });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const action = String(body.action || '').trim();
  let posts = []; try { const raw = await KV.get('wall'); if (raw) posts = JSON.parse(raw); } catch (e) {}
  if (action === 'post') {
    let text = String(body.text || '').trim();
    if (text.length < 2 || text.length > 300) return json(400, { error: '内容太短或太长' });
    if (wallBad(text)) return json(400, { error: '为了大家的树洞，请不要留联系方式或广告～' });
    const p = { id: 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), mood: String(body.mood || '').slice(0, 6), text, card: String(body.card || '').slice(0, 20), when: Date.now(), lamps: 0, replies: [] };
    posts.unshift(p); if (posts.length > 200) posts = posts.slice(0, 200);
    try { await KV.put('wall', JSON.stringify(posts)); } catch (e) { return json(502, { error: '放上墙失败，再试一次' }); }
    return json(200, { ok: true, post: { id: p.id, mood: p.mood, text: p.text, card: p.card, when: p.when, lamps: 0, replies: [] } });
  }
  if (action === 'lamp') {
    const p = posts.find(x => x.id === String(body.id || '')); if (!p) return json(404, { error: '这条心事已经不在了' });
    p.lamps = (p.lamps || 0) + 1;
    try { await KV.put('wall', JSON.stringify(posts)); } catch (e) {}
    return json(200, { ok: true, lamps: p.lamps });
  }
  if (action === 'reply') {
    let text = String(body.text || '').trim();
    if (text.length < 1 || text.length > 40) return json(400, { error: '留言 1-40 字' });
    if (wallBad(text)) return json(400, { error: '请不要留联系方式或广告～' });
    const p = posts.find(x => x.id === String(body.id || '')); if (!p) return json(404, { error: '这条心事已经不在了' });
    let role = 'user', nick = '', code = '';
    const rid2 = String(body.readerId || ''), rkey = String(body.rkey || '');
    if (rid2 && rkey) { try { const all = await rdAll(env); const r = all.find(x => x.id === rid2 && x.key === rkey && x.status === 'approved'); if (r) { role = 'reader'; nick = (r.persona && r.persona.nick) || r.name || '起牌师'; code = r.code || ''; } } catch (e) {} }
    p.replies = p.replies || []; p.replies.push({ text, when: Date.now(), role, nick, code }); if (p.replies.length > 30) p.replies = p.replies.slice(-30);
    try { await KV.put('wall', JSON.stringify(posts)); } catch (e) { return json(502, { error: '留言失败' }); }
    return json(200, { ok: true });
  }
  return json(400, { error: '未知操作' });
}
// ---- 情绪轨迹（KV：键 mood:<手机号> = 情绪记录数组）----
// ---- 心元钱包（KV：键 wallet:<手机号> = {balance,lastDay,streak}）----
function cnDayKey(ts) { const d = new Date(ts + 8 * 3600 * 1000); return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate(); }
async function walletGet(KV, phone) {
  let w = null; try { const raw = await KV.get('wallet:' + phone); if (raw) w = JSON.parse(raw); } catch (e) {}
  if (!w) w = { balance: 300, lastDay: '', streak: 0 };
  // 管理员测试号预充值：保证 ≥ 100000 心元，方便测试充值/消费流程（上线前可删此行）
  if (phone === '18268346784' && (w.balance | 0) < 100000) { w.balance = 100000; try { await KV.put('wallet:' + phone, JSON.stringify(w)); } catch (e) {} }
  return { balance: w.balance | 0, lastDay: w.lastDay || '', streak: w.streak | 0 };
}
async function walletCheckin(KV, phone) {
  const w = await walletGet(KV, phone); const today = cnDayKey(Date.now()); let awarded = 0;
  if (w.lastDay !== today) {
    const yest = cnDayKey(Date.now() - 86400000);
    w.streak = (w.lastDay === yest) ? (w.streak + 1) : 1;
    awarded = w.streak === 7 ? 290 : (w.streak === 3 ? 50 : 10);
    w.balance += awarded; w.lastDay = today;
  }
  try { await KV.put('wallet:' + phone, JSON.stringify(w)); } catch (e) {}
  return { awarded, balance: w.balance, streak: w.streak, signedToday: true };
}
async function walletAdjust(KV, phone, delta) {
  const w = await walletGet(KV, phone); w.balance = Math.max(0, w.balance + (Number(delta) || 0));
  try { await KV.put('wallet:' + phone, JSON.stringify(w)); } catch (e) {}
  return { balance: w.balance, streak: w.streak, signedToday: w.lastDay === cnDayKey(Date.now()) };
}
// ---- 邀请裂变（KV：inv:<手机号>={code,invited,earned}, invcode:<CODE>=手机号, invby:<手机号>=邀请人）----
const INV_INVITER = 50, INV_INVITEE = 30;
async function inviteEnsure(KV, phone) {
  let me = null; try { const raw = await KV.get('inv:' + phone); if (raw) me = JSON.parse(raw); } catch (e) {}
  if (!me) { let code = rcode(); for (let i = 0; i < 6; i++) { let taken = false; try { taken = !!(await KV.get('invcode:' + code)); } catch (e) {} if (!taken) break; code = rcode(); } me = { code, invited: [], earned: 0 }; try { await KV.put('inv:' + phone, JSON.stringify(me)); await KV.put('invcode:' + code, phone); } catch (e) {} }
  return me;
}
async function inviteStats(KV, phone) { const me = await inviteEnsure(KV, phone); let by = ''; try { by = (await KV.get('invby:' + phone)) || ''; } catch (e) {} return { code: me.code, invited: (me.invited || []).length, earned: me.earned || 0, boundBy: by }; }
async function inviteBind(KV, phone, ref) {
  await inviteEnsure(KV, phone);
  let by = ''; try { by = (await KV.get('invby:' + phone)) || ''; } catch (e) {}
  if (by) return { bound: false, reason: 'already' };
  let inviter = ''; try { inviter = (await KV.get('invcode:' + String(ref || '').toUpperCase())) || ''; } catch (e) {}
  if (!inviter || inviter === phone) return { bound: false, reason: 'invalid' };
  let invBy = ''; try { invBy = (await KV.get('invby:' + inviter)) || ''; } catch (e) {}
  if (invBy === phone) return { bound: false, reason: 'reciprocal' }; // 不允许互邀刷分
  try { await KV.put('invby:' + phone, inviter); } catch (e) {}
  const iu = await inviteEnsure(KV, inviter); if ((iu.invited || []).indexOf(phone) < 0) iu.invited.push(phone); iu.earned = (iu.earned || 0) + INV_INVITER;
  try { await KV.put('inv:' + inviter, JSON.stringify(iu)); } catch (e) {}
  await walletAdjust(KV, inviter, INV_INVITER); await walletAdjust(KV, phone, INV_INVITEE);
  return { bound: true, awardedInvitee: INV_INVITEE };
}
async function handleInvite(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    const phone = String(url.searchParams.get('phone') || '');
    if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
    if (!KV) return json(200, { ok: true, kv: false, code: '', invited: 0, earned: 0 });
    return json(200, Object.assign({ ok: true }, await inviteStats(KV, phone)));
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(200, { ok: true, kv: false });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const phone = String(body.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
  if (String(body.action || '') === 'bind') return json(200, Object.assign({ ok: true }, await inviteBind(KV, phone, body.ref)));
  return json(200, Object.assign({ ok: true }, await inviteStats(KV, phone)));
}
// ---- 心光球皮肤（KV：skin:<手机号>={owned,equipped}, redeem:<CODE>={skin,credit,used}）----
const SKIN_PRICE_W = { default: 0, moon: 88, tiger: 88, amethyst: 128, rose: 128, mint: 108, night: 188 };
async function skinGetKV(KV, phone) { let s = null; try { const raw = await KV.get('skin:' + phone); if (raw) s = JSON.parse(raw); } catch (e) {} return (s && Array.isArray(s.owned) && s.owned.length) ? { owned: s.owned, equipped: s.equipped || 'default' } : { owned: ['default'], equipped: 'default' }; }
async function skinPut(KV, phone, s) { try { await KV.put('skin:' + phone, JSON.stringify(s)); } catch (e) {} }
async function handleSkins(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    const phone = String(url.searchParams.get('phone') || '');
    if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
    if (!KV) return json(200, { ok: true, kv: false, owned: ['default'], equipped: 'default' });
    return json(200, Object.assign({ ok: true }, await skinGetKV(KV, phone)));
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(200, { ok: true, kv: false });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const act = String(body.action || '');
  if (act === 'gen') {
    const ADMIN = env.CONFIG_ADMIN_TOKEN || ''; const t = request.headers.get('x-admin-token') || '';
    if (!ADMIN || t !== ADMIN) return json(403, { error: '管理令牌不正确' });
    const skin = String(body.skin || ''); if (!(skin in SKIN_PRICE_W)) return json(400, { error: '皮肤不存在' });
    const credit = Math.max(0, Math.min(2000, parseInt(body.credit, 10) || 0));
    const n = Math.max(1, Math.min(200, parseInt(body.n, 10) || 1)); const out = [];
    for (let i = 0; i < n; i++) { let c = rcode(); try { while (await KV.get('redeem:' + c)) c = rcode(); } catch (e) {} try { await KV.put('redeem:' + c, JSON.stringify({ skin, credit, used: '' })); } catch (e) {} out.push(c); }
    return json(200, { ok: true, codes: out, skin, credit });
  }
  const phone = String(body.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
  const s = await skinGetKV(KV, phone);
  if (act === 'buy') {
    const skin = String(body.skin || ''); const price = SKIN_PRICE_W[skin];
    if (price === undefined) return json(400, { error: '皮肤不存在' });
    if (s.owned.indexOf(skin) >= 0) { s.equipped = skin; await skinPut(KV, phone, s); return json(200, Object.assign({ ok: true, already: true }, s)); }
    const w = await walletGet(KV, phone); if (w.balance < price) return json(200, { ok: false, error: '心元不足' });
    const wr = await walletAdjust(KV, phone, -price);
    s.owned.push(skin); s.equipped = skin; await skinPut(KV, phone, s);
    return json(200, { ok: true, owned: s.owned, equipped: s.equipped, balance: wr.balance });
  }
  if (act === 'equip') {
    const skin = String(body.skin || ''); if (s.owned.indexOf(skin) < 0) return json(200, { ok: false, error: '未拥有该皮肤' });
    s.equipped = skin; await skinPut(KV, phone, s); return json(200, { ok: true, owned: s.owned, equipped: s.equipped });
  }
  if (act === 'claim') { // 心光满月：陪伴满 30 天解锁限定皮肤
    let log = []; try { const raw = await KV.get('mood:' + phone); if (raw) log = JSON.parse(raw); } catch (e) {}
    const days = {}; log.forEach(e => { if (e && e.when) days[cnDayKey(e.when)] = 1; });
    const careDays = Object.keys(days).length; const REW = 'fullmoon';
    if (careDays < 30) return json(200, { ok: false, error: '还没满月', careDays });
    if (s.owned.indexOf(REW) < 0) { s.owned.push(REW); s.equipped = REW; await skinPut(KV, phone, s); return json(200, { ok: true, claimed: true, skin: REW, owned: s.owned, equipped: s.equipped, careDays }); }
    return json(200, { ok: true, claimed: false, already: true, skin: REW, owned: s.owned, equipped: s.equipped, careDays });
  }
  if (act === 'redeem') {
    const code = String(body.code || '').toUpperCase(); let r = null; try { const raw = await KV.get('redeem:' + code); if (raw) r = JSON.parse(raw); } catch (e) {}
    if (!r) return json(200, { ok: false, error: '兑换码无效' });
    if (r.used) return json(200, { ok: false, error: '兑换码已使用' });
    r.used = phone; try { await KV.put('redeem:' + code, JSON.stringify(r)); } catch (e) {}
    if (s.owned.indexOf(r.skin) < 0) s.owned.push(r.skin); s.equipped = r.skin; await skinPut(KV, phone, s);
    const bal = r.credit ? (await walletAdjust(KV, phone, r.credit)).balance : (await walletGet(KV, phone)).balance;
    return json(200, { ok: true, redeemed: true, skin: r.skin, credit: r.credit || 0, owned: s.owned, equipped: s.equipped, balance: bal });
  }
  return json(200, Object.assign({ ok: true }, s));
}
async function handleGoods(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(200, { ok: false, error: '未绑定KV' });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const phone = String(body.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
  if (String(body.action || '') !== 'redeem') return json(400, { error: '未知操作' });
  const ptOff = Math.max(0, parseInt(body.ptOff, 10) || 0);
  const w = await walletGet(KV, phone);
  if (w.balance < ptOff) return json(200, { ok: false, error: '心元不足' });
  const wr = await walletAdjust(KV, phone, -ptOff);
  let code = rcode(); try { while (await KV.get('gorder:' + code)) code = rcode(); } catch (e) {}
  const order = { phone, goodId: String(body.goodId || ''), name: String(body.name || '').slice(0, 40), ptOff, yuanOff: Math.max(0, +body.yuanOff || 0), price: Math.max(0, +body.price || 0), when: Date.now(), used: '' };
  try { await KV.put('gorder:' + code, JSON.stringify(order)); } catch (e) {}
  return json(200, { ok: true, code, balance: wr.balance });
}
async function handleWallet(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    const phone = String(url.searchParams.get('phone') || '');
    if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
    if (!KV) return json(200, { ok: true, kv: false, balance: 300, streak: 0, signedToday: false });
    const w = await walletGet(KV, phone);
    return json(200, { ok: true, balance: w.balance, streak: w.streak, signedToday: w.lastDay === cnDayKey(Date.now()) });
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(200, { ok: true, kv: false });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const phone = String(body.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
  if (String(body.action || '') !== 'adjust') return json(400, { error: '未知操作' });
  const r = await walletAdjust(KV, phone, body.delta);
  return json(200, { ok: true, balance: r.balance, streak: r.streak, signedToday: r.signedToday });
}
async function handleMood(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    const phone = String(url.searchParams.get('phone') || '');
    if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
    if (!KV) return json(200, { ok: true, kv: false, log: [], balance: 300, streak: 0, signedToday: false });
    let log = []; try { const raw = await KV.get('mood:' + phone); if (raw) log = JSON.parse(raw); } catch (e) {}
    const w = await walletGet(KV, phone);
    return json(200, { ok: true, kv: true, log, balance: w.balance, streak: w.streak, signedToday: w.lastDay === cnDayKey(Date.now()) });
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(200, { ok: true, kv: false });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const phone = String(body.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
  if (String(body.action || '') !== 'log') return json(400, { error: '未知操作' });
  let log = []; try { const raw = await KV.get('mood:' + phone); if (raw) log = JSON.parse(raw); } catch (e) {}
  log.push({ mood: String(body.mood || '').slice(0, 6), text: String(body.text || '').slice(0, 120), when: Date.now() });
  if (log.length > 400) log = log.slice(-400);
  try { await KV.put('mood:' + phone, JSON.stringify(log)); } catch (e) {}
  const ck = await walletCheckin(KV, phone); // 每日首次打卡=签到奖励
  return json(200, { ok: true, awarded: ck.awarded, balance: ck.balance, streak: ck.streak, signedToday: true });
}
// ---- 时光胶囊（KV：键 cap:<手机号> = 胶囊数组）----
async function handleCapsule(request, env, url) {
  const KV = env.CONFIG_KV || null;
  if (request.method === 'GET') {
    const phone = String(url.searchParams.get('phone') || '');
    if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录' });
    if (!KV) return json(200, { ok: true, kv: false, capsules: [] });
    let caps = []; try { const raw = await KV.get('cap:' + phone); if (raw) caps = JSON.parse(raw); } catch (e) {}
    const now = Date.now();
    return json(200, { ok: true, kv: true, capsules: caps.map(c => ({ id: c.id, text: (c.openAt <= now || c.opened) ? c.text : '', card: c.card, mood: c.mood, sealAt: c.sealAt, openAt: c.openAt, opened: !!c.opened, due: (c.openAt <= now && !c.opened), locked: (c.openAt > now) })) });
  }
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
  if (!KV) return json(501, { error: '时光胶囊还没开启（需要在 Pages 绑定 KV）' });
  let body; try { body = await request.json(); } catch (e) { body = {}; }
  const phone = String(body.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '需要登录手机号' });
  const action = String(body.action || '');
  let caps = []; try { const raw = await KV.get('cap:' + phone); if (raw) caps = JSON.parse(raw); } catch (e) {}
  if (action === 'seal') {
    let text = String(body.text || '').trim();
    if (text.length < 2 || text.length > 600) return json(400, { error: '写点什么吧（2-600字）' });
    const days = Math.max(1, Math.min(1100, parseInt(body.days, 10) || 30));
    const now = Date.now();
    const c = { id: 'cap' + now.toString(36) + Math.random().toString(36).slice(2, 5), text, card: String(body.card || '').slice(0, 20), mood: String(body.mood || '').slice(0, 6), sealAt: now, openAt: now + days * 86400000, opened: false };
    caps.unshift(c); if (caps.length > 100) caps = caps.slice(0, 100);
    try { await KV.put('cap:' + phone, JSON.stringify(caps)); } catch (e) { return json(502, { error: '封存失败' }); }
    return json(200, { ok: true, id: c.id, openAt: c.openAt });
  }
  if (action === 'open') {
    const c = caps.find(x => x.id === String(body.id || '')); if (!c) return json(404, { error: '胶囊不在了' });
    if (c.openAt > Date.now()) return json(403, { error: '还没到开启的时间' });
    c.opened = true;
    try { await KV.put('cap:' + phone, JSON.stringify(caps)); } catch (e) {}
    return json(200, { ok: true, capsule: { id: c.id, text: c.text, card: c.card, mood: c.mood, sealAt: c.sealAt, openAt: c.openAt } });
  }
  return json(400, { error: '未知操作' });
}
// ---- 起牌师/绑定（KV：键 readers = 数组；bind:<手机号> = readerId）----
function adminOk(request, env) { const ADMIN = env.CONFIG_ADMIN_TOKEN || ''; const token = request.headers.get('x-admin-token') || ''; return !!ADMIN && token === ADMIN; }
async function rdAll(env) { const KV = env.CONFIG_KV; if (!KV) return []; try { const r = await KV.get('readers'); return r ? JSON.parse(r) : []; } catch (e) { return []; } }
async function rdSave(env, list) { await env.CONFIG_KV.put('readers', JSON.stringify(list)); }
function rid() { return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function rcode() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }
function rkey() { return [...crypto.getRandomValues(new Uint8Array(12))].map(b => b.toString(16).padStart(2, '0')).join(''); }
function rdPub(r) { return r ? { id: r.id, name: r.name, code: r.code, status: r.status, persona: r.persona ? { nick: r.persona.nick, style: r.persona.style, expertise: r.persona.expertise } : null } : null; }
function maskPhone(p) { return String(p).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'); }
function personaText(p) {
  if (!p) return '';
  const a = [];
  if (p.nick) a.push('你现在以「' + p.nick + '」的身份为来访者解读');
  if (p.style) a.push('语气风格：' + p.style);
  if (p.expertise) a.push('你尤其擅长：' + p.expertise);
  if (p.emphasis) a.push('解读时请侧重：' + p.emphasis);
  if (p.opening) a.push('可作开场的一句话：' + p.opening);
  if (!a.length) return '';
  return '【起牌师人设】' + a.join('；') + '。请在保持原有 JSON 结构、解读逻辑与安全边界（不预言、不宿命、把选择权交还用户、财运不碰具体标的与买卖时点）的前提下，用该人设的口吻表达。\n\n';
}
async function resolveReader(env, pl) {
  try {
    if (!pl || pl.agent !== 'reader') return null;
    const list = await rdAll(env);
    let r = null;
    if (pl.code) r = list.find(x => x.status === 'approved' && x.code === String(pl.code).toUpperCase());
    if (!r && pl.phone && env.CONFIG_KV) { const id = await env.CONFIG_KV.get('bind:' + pl.phone); if (id) r = list.find(x => x.id === id && x.status === 'approved'); }
    return r;
  } catch (e) { return null; }
}
// ---- RAG 知识库（KV：键 kb:<readerId> = [{text,vec}]）----
function hashEmbed(text) { const v = new Array(256).fill(0); const s = String(text).toLowerCase(); for (let i = 0; i < s.length - 1; i++) { const g = s.charCodeAt(i) * 131 + s.charCodeAt(i + 1); v[((g % 256) + 256) % 256] += 1; } const n = Math.sqrt(v.reduce((a, b) => a + b * b, 0)) || 1; return v.map(x => +(x / n).toFixed(4)); }
async function embed(env, texts) { if (env.AI) { try { const r = await env.AI.run('@cf/baai/bge-m3', { text: texts }); if (r && r.data && r.data.length === texts.length) return r.data.map(v => v.map(x => +x.toFixed(4))); } catch (e) {} } return texts.map(hashEmbed); }
function cos(a, b) { let d = 0, na = 0, nb = 0; for (let i = 0; i < a.length; i++) { d += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; } return d / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9); }
function lexScore(q, t) { t = String(t).toLowerCase(); let s = 0; for (let i = 0; i < q.length - 1; i++) { if (t.indexOf(q.substr(i, 2)) >= 0) s++; } return s; }
function chunkText(t) { const parts = String(t).split(/\n{2,}/).map(s => s.trim()).filter(Boolean); const out = []; for (let p of parts) { while (p.length > 400) { out.push(p.slice(0, 400)); p = p.slice(400); } if (p) out.push(p); } return out; }
async function kbGet(env, id) { if (!env.CONFIG_KV) return []; try { const r = await env.CONFIG_KV.get('kb:' + id); return r ? JSON.parse(r) : []; } catch (e) { return []; } }
async function kbPut(env, id, arr) { await env.CONFIG_KV.put('kb:' + id, JSON.stringify(arr)); }
async function kbRetrieve(env, id, query, k) {
  const arr = await kbGet(env, id); if (!arr.length || !query) return [];
  const qv = (await embed(env, [String(query)]))[0];
  let scored;
  if (qv && arr[0].vec && arr[0].vec.length === qv.length) scored = arr.map(c => ({ t: c.text, s: cos(qv, c.vec) }));
  else { const ql = String(query).toLowerCase(); scored = arr.map(c => ({ t: c.text, s: lexScore(ql, c.text) })); }
  scored.sort((a, b) => b.s - a.s);
  const floor = Math.max(0.04, scored[0].s * 0.5);
  return scored.slice(0, k || 3).filter(x => x.s >= floor).map(x => x.t);
}
function kbText(chunks) { return chunks.length ? '【你的知识库·参考资料】\n' + chunks.map((c, i) => (i + 1) + '. ' + c).join('\n') + '\n（可借鉴其中观点与口吻，但仍以牌面与来访者处境为准，不要照搬无关内容。）\n\n' : ''; }
// ---- 示范问答 few-shot（KV：键 qa:<readerId> = [{id,q,a,vec}]）----
async function qaGet(env, id) { if (!env.CONFIG_KV) return []; try { const r = await env.CONFIG_KV.get('qa:' + id); return r ? JSON.parse(r) : []; } catch (e) { return []; } }
async function qaPut(env, id, arr) { await env.CONFIG_KV.put('qa:' + id, JSON.stringify(arr)); }
async function qaRetrieve(env, id, query, k) {
  const arr = await qaGet(env, id); if (!arr.length || !query) return [];
  const qv = (await embed(env, [String(query)]))[0];
  let scored = (qv && arr[0].vec && arr[0].vec.length === qv.length) ? arr.map(c => ({ q: c.q, a: c.a, s: cos(qv, c.vec) })) : arr.map(c => ({ q: c.q, a: c.a, s: lexScore(String(query).toLowerCase(), c.q + ' ' + c.a) }));
  scored.sort((a, b) => b.s - a.s);
  const floor = Math.max(0.04, scored[0].s * 0.5);
  return scored.slice(0, k || 2).filter(x => x.s >= floor);
}
function qaText(pairs) { return pairs.length ? '【示范问答·请模仿这种口吻、结构与分寸来回答，不要照抄字句】\n' + pairs.map((p, i) => (i + 1) + '. 问：' + p.q + '\n   答：' + p.a).join('\n') + '\n\n' : ''; }
// ---- 78 张牌·专属牌意（KV：键 cards:<readerId> = {牌名:{up,rev}}）----
async function cardsGet(env, id) { if (!env.CONFIG_KV) return {}; try { const r = await env.CONFIG_KV.get('cards:' + id); return r ? JSON.parse(r) : {}; } catch (e) { return {}; } }
async function cardsPut(env, id, obj) { await env.CONFIG_KV.put('cards:' + id, JSON.stringify(obj)); }
function cardMeaningText(map, drawn) {
  if (!map || !drawn || !drawn.length) return '';
  const lines = [];
  for (const c of drawn) { const m = map[c && c.name]; if (!m) continue; const o = c.reversed ? (m.rev || '') : (m.up || ''); if (o) lines.push('· ' + c.name + '（' + (c.reversed ? '逆位' : '正位') + '）：' + o); }
  return lines.length ? '【你为这些牌写过的专属牌意，请优先采用你的解读视角】\n' + lines.join('\n') + '\n\n' : '';
}
async function handleReader(request, env, sub, url) {
  const KV = env.CONFIG_KV;
  if (sub === 'byCode') { const code = String(url.searchParams.get('code') || '').toUpperCase(); const r = (await rdAll(env)).find(x => x.status === 'approved' && x.code === code); return json(200, { ok: true, reader: r ? rdPub(r) : null }); }
  if (sub === 'profile') {
    const code = String(url.searchParams.get('code') || '').toUpperCase();
    const r = (await rdAll(env)).find(x => x.status === 'approved' && x.code === code);
    if (!r) return json(404, { error: '没找到这位起牌师' });
    let fans = 0; if (KV) { try { const f = await KV.get('fans:' + r.id); fans = f ? JSON.parse(f).length : 0; } catch (e) {} }
    let warmCount = 0, warmSamples = [];
    if (KV) { try { const raw = await KV.get('wall'); const posts = raw ? JSON.parse(raw) : []; for (const p of posts) { for (const rp of (p.replies || [])) { if (rp.role === 'reader' && rp.code === code) { warmCount++; if (warmSamples.length < 6) warmSamples.push({ text: rp.text, when: rp.when, mood: p.mood || '' }); } } } } catch (e) {} }
    const pub = rdPub(r), pp = r.persona || {};
    return json(200, { ok: true, reader: { id: pub.id, code: pub.code, official: !!r.official, persona: { nick: pp.nick || r.name, style: pp.style || '', expertise: pp.expertise || '', opening: pp.opening || '' } }, fans, warm: { count: warmCount, samples: warmSamples } });
  }
  if (sub === 'me') { const phone = String(url.searchParams.get('phone') || ''); const r = [...(await rdAll(env))].reverse().find(x => x.phone === phone); return json(200, { ok: true, reader: r || null }); }
  if (sub === 'list') { if (!adminOk(request, env)) return json(403, { error: '管理令牌不正确' }); return json(200, { ok: true, readers: await rdAll(env) }); }
  if (sub === 'official') {
    if (request.method === 'GET') { const list = await rdAll(env); return json(200, { ok: true, readers: list.filter(x => x.status === 'approved' && x.official).map(rdPub) }); }
    if (!adminOk(request, env)) return json(403, { error: '管理令牌不正确' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), on = !!(b && b.on);
    const list = await rdAll(env); const r = list.find(x => x.id === id);
    if (!r || r.status !== 'approved') return json(404, { error: '起牌师不存在或未通过审核' });
    r.official = on; await rdSave(env, list);
    return json(200, { ok: true, official: r.official });
  }
  if (sub === 'apply') {
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    if (!KV) return json(501, { error: '未绑定 KV（CONFIG_KV）' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const name = String((b && b.name) || '').trim(), phone = String((b && b.phone) || '').trim(), intro = String((b && b.intro) || '').trim();
    if (name.length < 2 || !/^1[3-9]\d{9}$/.test(phone)) return json(400, { error: '请填写姓名与正确手机号' });
    const list = await rdAll(env);
    const ex = list.find(x => x.phone === phone && x.status !== 'rejected');
    if (ex) return json(200, { ok: true, id: ex.id, status: ex.status, dup: true });
    const r = { id: rid(), name, phone, intro: intro.slice(0, 200), status: 'pending', code: '', key: '', persona: null, createdAt: Date.now() };
    list.push(r); await rdSave(env, list);
    return json(200, { ok: true, id: r.id, status: 'pending' });
  }
  if (sub === 'review') {
    if (!adminOk(request, env)) return json(403, { error: '管理令牌不正确' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), action = String((b && b.action) || '');
    const list = await rdAll(env); const r = list.find(x => x.id === id);
    if (!r) return json(404, { error: '未找到该申请' });
    if (action === 'approve') { if (!r.code) { const used = new Set(list.map(x => x.code).filter(Boolean)); let c; do { c = rcode(); } while (used.has(c)); r.code = c; } if (!r.key) r.key = rkey(); r.status = 'approved'; r.reviewedAt = Date.now(); }
    else if (action === 'reject') { r.status = 'rejected'; r.reviewedAt = Date.now(); }
    else return json(400, { error: '未知操作' });
    await rdSave(env, list);
    return json(200, { ok: true, reader: r });
  }
  if (sub === 'persona') {
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), key = String((b && b.key) || '');
    const list = await rdAll(env); const r = list.find(x => x.id === id);
    if (!r || r.status !== 'approved') return json(404, { error: '起牌师不存在或未通过审核' });
    if (!r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    const p = (b && b.persona) || {};
    r.persona = { nick: String(p.nick || '').slice(0, 20), style: String(p.style || '').slice(0, 60), expertise: String(p.expertise || '').slice(0, 60), opening: String(p.opening || '').slice(0, 80), emphasis: String(p.emphasis || '').slice(0, 120) };
    await rdSave(env, list);
    return json(200, { ok: true, persona: r.persona });
  }
  if (sub === 'kb') {
    if (request.method === 'GET') {
      const id = String(url.searchParams.get('id') || ''), key = String(url.searchParams.get('key') || '');
      const r = (await rdAll(env)).find(x => x.id === id);
      if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
      const arr = await kbGet(env, id);
      return json(200, { ok: true, count: arr.length, items: arr.slice().reverse().map(c => ({ id: c.id, text: c.text, cat: c.cat || '通用' })) });
    }
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    if (!KV) return json(501, { error: '未绑定 KV（CONFIG_KV）' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), key = String((b && b.key) || ''), action = String((b && b.action) || 'add');
    const r = (await rdAll(env)).find(x => x.id === id);
    if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    if (action === 'clear') { await kbPut(env, id, []); return json(200, { ok: true, count: 0 }); }
    if (action === 'del') { let arr = (await kbGet(env, id)).filter(c => c.id !== String((b && b.chunkId) || '')); await kbPut(env, id, arr); return json(200, { ok: true, count: arr.length }); }
    const cat = String((b && b.cat) || '通用').slice(0, 10);
    const chunks = chunkText(String((b && b.text) || ''));
    if (!chunks.length) return json(400, { error: '内容为空' });
    let arr = await kbGet(env, id);
    const vecs = await embed(env, chunks);
    chunks.forEach((t, i) => arr.push({ id: 'c' + Date.now().toString(36) + i, text: t, vec: vecs[i], cat }));
    if (arr.length > 400) arr = arr.slice(arr.length - 400);
    await kbPut(env, id, arr);
    return json(200, { ok: true, count: arr.length, added: chunks.length });
  }
  if (sub === 'qa') {
    if (request.method === 'GET') {
      const id = String(url.searchParams.get('id') || ''), key = String(url.searchParams.get('key') || '');
      const r = (await rdAll(env)).find(x => x.id === id);
      if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
      const arr = await qaGet(env, id);
      return json(200, { ok: true, count: arr.length, items: arr.slice().reverse().map(c => ({ id: c.id, q: c.q, a: c.a })) });
    }
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    if (!KV) return json(501, { error: '未绑定 KV（CONFIG_KV）' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), key = String((b && b.key) || '');
    const r = (await rdAll(env)).find(x => x.id === id);
    if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    if (b && b.action === 'del') { let arr = (await qaGet(env, id)).filter(c => c.id !== String(b.qaId || '')); await qaPut(env, id, arr); return json(200, { ok: true, count: arr.length }); }
    const q = String((b && b.q) || '').trim(), a = String((b && b.a) || '').trim();
    if (q.length < 2 || a.length < 2) return json(400, { error: '问题与回答都要填' });
    let arr = await qaGet(env, id);
    const vec = (await embed(env, [q]))[0];
    arr.push({ id: 'q' + Date.now().toString(36), q: q.slice(0, 100), a: a.slice(0, 500), vec });
    if (arr.length > 100) arr = arr.slice(arr.length - 100);
    await qaPut(env, id, arr);
    return json(200, { ok: true, count: arr.length });
  }
  if (sub === 'cards') {
    if (request.method === 'GET') {
      const id = String(url.searchParams.get('id') || ''), key = String(url.searchParams.get('key') || '');
      const r = (await rdAll(env)).find(x => x.id === id);
      if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
      const m = await cardsGet(env, id);
      return json(200, { ok: true, count: Object.keys(m).length, cards: m });
    }
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    if (!KV) return json(501, { error: '未绑定 KV（CONFIG_KV）' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), key = String((b && b.key) || '');
    const r = (await rdAll(env)).find(x => x.id === id);
    if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    const m = await cardsGet(env, id);
    const card = String((b && b.card) || '').trim();
    if (!card) return json(400, { error: '缺少牌名' });
    const up = String((b && b.up) || '').slice(0, 300), rev = String((b && b.rev) || '').slice(0, 300);
    if ((b && b.action === 'del') || (!up && !rev)) { delete m[card]; } else { m[card] = { up, rev }; }
    await cardsPut(env, id, m);
    return json(200, { ok: true, count: Object.keys(m).length });
  }
  if (sub === 'kbtest') {
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), key = String((b && b.key) || '');
    const r = (await rdAll(env)).find(x => x.id === id);
    if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    const query = String((b && b.query) || ''); const arr = await kbGet(env, id); let chunks = [];
    if (arr.length && query) {
      const qv = (await embed(env, [query]))[0];
      let scored = (qv && arr[0].vec && arr[0].vec.length === qv.length) ? arr.map(c => ({ text: c.text, cat: c.cat || '通用', s: cos(qv, c.vec) })) : arr.map(c => ({ text: c.text, cat: c.cat || '通用', s: lexScore(query.toLowerCase(), c.text) }));
      scored.sort((a, b) => b.s - a.s);
      chunks = scored.slice(0, 5).map(x => ({ text: x.text, cat: x.cat, score: +x.s.toFixed(3) }));
    }
    const qa = await qaRetrieve(env, id, query, 3);
    return json(200, { ok: true, chunks, qa: qa.map(x => ({ q: x.q, a: x.a, score: +x.s.toFixed(3) })) });
  }
  if (sub === 'retrieve') {
    if (!adminOk(request, env)) return json(403, { error: '管理令牌不正确' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    let id = String((b && b.id) || '');
    if (!id && b && b.code) { const r = (await rdAll(env)).find(x => x.status === 'approved' && x.code === String(b.code).toUpperCase()); id = r ? r.id : ''; }
    if (!id) return json(404, { error: '起牌师不存在' });
    const query = String((b && b.query) || '');
    const chunks = await kbRetrieve(env, id, query, (b && b.k) || 3);
    const qa = await qaRetrieve(env, id, query, 2);
    const cardMeanings = (b && b.cards) ? cardMeaningText(await cardsGet(env, id), b.cards) : '';
    return json(200, { ok: true, chunks, qa: qa.map(x => ({ q: x.q, a: x.a })), cardMeanings });
  }
  if (sub === 'fans') {
    const id = String(url.searchParams.get('id') || ''), key = String(url.searchParams.get('key') || '');
    const r = (await rdAll(env)).find(x => x.id === id);
    if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    let fans = []; if (KV) { try { const f = await KV.get('fans:' + id); fans = f ? JSON.parse(f) : []; } catch (e) {} }
    return json(200, { ok: true, count: fans.length, fans: fans.slice().reverse().slice(0, 50).map(x => ({ phone: maskPhone(x.phone), since: x.since })) });
  }
  if (sub === 'import') {
    if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });
    if (!KV) return json(501, { error: '未绑定 KV（CONFIG_KV）' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const id = String((b && b.id) || ''), key = String((b && b.key) || '');
    const list = await rdAll(env); const r = list.find(x => x.id === id);
    if (!r || r.status !== 'approved' || !r.key || key !== r.key) return json(403, { error: '工作台口令不正确' });
    const bd = (b && b.bundle) || {};
    if (bd.persona) { const p = bd.persona; r.persona = { nick: String(p.nick || '').slice(0, 20), style: String(p.style || '').slice(0, 60), expertise: String(p.expertise || '').slice(0, 60), opening: String(p.opening || '').slice(0, 80), emphasis: String(p.emphasis || '').slice(0, 120) }; await rdSave(env, list); }
    let kbCount = 0;
    if (Array.isArray(bd.kb) && bd.kb.length) {
      let arr = await kbGet(env, id);
      for (const e of bd.kb) { const cat = String((e && e.cat) || '通用').slice(0, 10); const chunks = chunkText(String((e && e.text) || '')); if (!chunks.length) continue; const vecs = await embed(env, chunks); chunks.forEach((t, i) => arr.push({ id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), text: t, vec: vecs[i], cat })); }
      if (arr.length > 400) arr = arr.slice(arr.length - 400);
      await kbPut(env, id, arr); kbCount = arr.length;
    }
    let qaCount = 0;
    if (Array.isArray(bd.qa) && bd.qa.length) {
      let arr = await qaGet(env, id);
      const valid = bd.qa.map(e => ({ q: String((e && e.q) || '').trim(), a: String((e && e.a) || '').trim() })).filter(x => x.q.length >= 2 && x.a.length >= 2);
      const vecs = await embed(env, valid.map(x => x.q));
      valid.forEach((x, i) => arr.push({ id: 'q' + Date.now().toString(36) + i, q: x.q.slice(0, 100), a: x.a.slice(0, 500), vec: vecs[i] }));
      if (arr.length > 100) arr = arr.slice(arr.length - 100);
      await qaPut(env, id, arr); qaCount = arr.length;
    }
    let cardCount = 0;
    if (bd.cards && typeof bd.cards === 'object') {
      const m = await cardsGet(env, id);
      for (const k of Object.keys(bd.cards)) { const v = bd.cards[k] || {}; m[k] = { up: String(v.up || '').slice(0, 300), rev: String(v.rev || '').slice(0, 300) }; }
      await cardsPut(env, id, m); cardCount = Object.keys(m).length;
    }
    return json(200, { ok: true, kb: kbCount, qa: qaCount, cards: cardCount });
  }
  return json(404, { error: '未知接口' });
}
async function handleBind(request, env, url) {
  const KV = env.CONFIG_KV;
  if (request.method === 'GET') { const phone = String(url.searchParams.get('phone') || ''); if (!KV || !phone) return json(200, { ok: true, reader: null }); const id = await KV.get('bind:' + phone); if (!id) return json(200, { ok: true, reader: null }); const r = (await rdAll(env)).find(x => x.id === id && x.status === 'approved'); return json(200, { ok: true, reader: r ? rdPub(r) : null }); }
  if (request.method === 'POST') {
    if (!KV) return json(501, { error: '未绑定 KV' });
    let b; try { b = await request.json(); } catch (e) { b = {}; }
    const phone = String((b && b.phone) || ''), code = String((b && b.code) || '').toUpperCase();
    if (!/^1[3-9]\d{9}$/.test(phone) || !code) return json(400, { error: '参数不完整' });
    const list = await rdAll(env); const r = list.find(x => x.status === 'approved' && x.code === code);
    if (!r) return json(404, { error: '邀请码无效' });
    const existing = await KV.get('bind:' + phone);
    if (existing) { const er = list.find(x => x.id === existing && x.status === 'approved'); return json(200, { ok: true, reader: er ? rdPub(er) : rdPub(r), already: true }); }
    await KV.put('bind:' + phone, r.id);
    try { let fans = []; const f = await KV.get('fans:' + r.id); fans = f ? JSON.parse(f) : []; if (!fans.find(x => x.phone === phone)) { fans.push({ phone, since: Date.now() }); await KV.put('fans:' + r.id, JSON.stringify(fans)); } } catch (e) {}
    return json(200, { ok: true, reader: rdPub(r), bound: true });
  }
  return json(405, { error: 'Method Not Allowed' });
}
async function handle(request, env, mode) {
  const KEY = env.TAROT_AI_KEY || env.AI_KEY || '';
  if (!KEY) return json(500, { error: '未配置 AI key（请在 Pages 环境变量里加 AI_KEY，再重新部署一次）' });
  let pl; try { pl = await request.json(); } catch (e) { pl = {}; }
  const reader = await resolveReader(env, pl);
  const persona = reader ? reader.persona : null;
  if (mode === 'tarot') {
    const domain = String((pl && pl.domain) || '').trim(), situation = String((pl && pl.situation) || '').trim(), cardsText = String((pl && pl.cardsText) || '').trim();
    if (!['姻缘', '事业', '财运', '运势'].includes(domain) || situation.length < 4 || !cardsText) return json(400, { error: '参数不完整' });
    const astro = String((pl && pl.astro) || '').trim();
    const userMsg = `领域：${domain}\n我的处境：${situation}\n${astro ? ('我的本命星盘：' + astro + '\n') : ''}\n抽到的牌：${cardsText}\n\n请结合处境${astro ? '与我的本命星盘特质（并填好 starEcho，把牌面与我的星盘对照）' : ''}，按系统设定的 JSON 结构给出解读。`;
    const chunks = reader ? await kbRetrieve(env, reader.id, situation, 3) : [];
    const qa = reader ? await qaRetrieve(env, reader.id, situation, 2) : [];
    const cMean = reader ? cardMeaningText(await cardsGet(env, reader.id), pl.cards) : '';
    const sysFull = personaText(persona) + cMean + kbText(chunks) + qaText(qa) + SYSTEM_PROMPT;
    let rep = null, rerr = '';
    for (let i = 0; i < 2 && !rep; i++) { try { rep = await callAI(env, KEY, sysFull, userMsg, 1500); } catch (e) { rerr = (e && e.message) || ''; } }
    if (!rep) return json(502, { error: '解读没接上：' + rerr });
    return json(200, rep);
  } else if (mode === 'report') {
    const year = String((pl && pl.year) || '').trim(), sex = String((pl && pl.sex) || '未知').trim(), zodiac = String((pl && pl.zodiac) || '').trim(), cons = String((pl && pl.cons) || '').trim(), birth = String((pl && pl.birth) || '').trim(), cardsText = String((pl && pl.cardsText) || '').trim();
    if (!year || (!zodiac && !birth)) return json(400, { error: '参数不完整' });
    const userMsg = `年份：${year}\n性别：${sex}　生肖：${zodiac}　星座：${cons}\n出生：${birth}\n年度主牌：${cardsText}\n\n请按系统设定的 JSON 结构，给出${year}的年运报告。`;
    const qstr = [zodiac, cons, year, '年运 事业 财运 感情 健康'].join(' ');
    const chunks = reader ? await kbRetrieve(env, reader.id, qstr, 3) : [];
    const qa = reader ? await qaRetrieve(env, reader.id, qstr, 2) : [];
    const cMean = reader ? cardMeaningText(await cardsGet(env, reader.id), pl.cards) : '';
    const sysFull = personaText(persona) + cMean + kbText(chunks) + qaText(qa) + REPORT_PROMPT;
    let rep = null, rerr = '';
    for (let i = 0; i < 2 && !rep; i++) { try { rep = await callAI(env, KEY, sysFull, userMsg, 3000); } catch (e) { rerr = (e && e.message) || ''; } }
    if (!rep) return json(502, { error: '报告生成没接上：' + rerr });
    return json(200, rep);
  } else if (mode === 'treehole') {
    const feeling = String((pl && pl.feeling) || '').trim(), card = String((pl && pl.card) || '').trim(), mood = String((pl && pl.mood) || '').trim();
    if (feeling.length < 2) return json(400, { error: '说点什么吧' });
    const userMsg = `此刻的心情：${mood || '（未选）'}\nTA 写下的话：${feeling}\n抽到的牌：${card || '（无）'}\n\n请按系统设定的 JSON 结构，先接住 TA 的情绪，再以这张牌作温柔映照，给一段陪伴回信。`;
    const chunks = reader ? await kbRetrieve(env, reader.id, feeling, 2) : [];
    const sysFull = personaText(persona) + kbText(chunks) + TREEHOLE_PROMPT;
    let rep = null, rerr = '';
    for (let i = 0; i < 2 && !rep; i++) { try { rep = await callAI(env, KEY, sysFull, userMsg, 1200); } catch (e) { rerr = (e && e.message) || ''; } }
    if (!rep) return json(502, { error: '回信没接上，再试一次：' + rerr });
    return json(200, rep);
  } else {
    const chart = String((pl && pl.chart) || '').trim();
    if (!chart) return json(400, { error: '缺少星盘数据' });
    const sex = String((pl && pl.sex) || '未知').trim(), birth = String((pl && pl.birth) || '').trim();
    const userMsg = `性别：${sex}　出生：${birth}\n本命盘：\n${chart}\n\n请按系统设定的 JSON 结构，给出本命人格解读。`;
    const chunks = reader ? await kbRetrieve(env, reader.id, '本命 性格 ' + chart.slice(0, 80), 3) : [];
    const qa = reader ? await qaRetrieve(env, reader.id, '本命 性格 占星', 2) : [];
    const sysFull = personaText(persona) + kbText(chunks) + qaText(qa) + ASTRO_PROMPT;
    let rep = null, rerr = '';
    for (let i = 0; i < 2 && !rep; i++) { try { rep = await callAI(env, KEY, sysFull, userMsg, 2500); } catch (e) { rerr = (e && e.message) || ''; } }
    if (!rep) return json(502, { error: '本命解读没接上：' + rerr });
    return json(200, rep);
  }
}
