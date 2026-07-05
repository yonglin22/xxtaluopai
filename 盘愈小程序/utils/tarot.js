// ============================================================
// 塔罗牌组 + 抽牌 + 领域配置 + 兜底解读（与 H5 逻辑对齐）
// ============================================================

// 大阿卡纳（22）
const MAJOR = ['愚人','魔术师','女祭司','皇后','皇帝','教皇','恋人','战车','力量','隐者','命运之轮','正义','倒吊人','死神','节制','恶魔','高塔','星星','月亮','太阳','审判','世界'];
// 小阿卡纳（四花色 × 1-10 + 侍从/骑士/皇后/国王）
const SUITS = ['权杖','圣杯','宝剑','星币'];
const RANKS = ['一','二','三','四','五','六','七','八','九','十','侍从','骑士','皇后','国王'];

const DECK = [];
MAJOR.forEach(n => DECK.push({ name: n, mark: 'major' }));
SUITS.forEach(s => RANKS.forEach(r => DECK.push({ name: s + r, mark: s })));

// 抽 n 张（洗牌 + 随机正逆位）
function drawCards(n, positions) {
  const d = DECK.slice();
  for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
  return d.slice(0, n).map((c, i) => ({
    position: (positions && positions[i]) || ['现状', '阻碍', '指引'][i] || ('位置' + (i + 1)),
    name: c.name, mark: c.mark, reversed: Math.random() < 0.5
  }));
}

// 四大领域（与 H5「问一事」一致）
const DOMAINS = [
  { key: '姻缘', en: 'Love', tip: '感情走向、暧昧、复合、关系里的心结' },
  { key: '事业', en: 'Career', tip: '工作选择、发展方向、职场处境' },
  { key: '财运', en: 'Wealth', tip: '收支、机会、要不要下这个决定' },
  { key: '运势', en: 'Luck', tip: '近期整体状态与提点' }
];

// 兜底解读（后端接不上时用，保证不空白）
function demoReading(domain, text, cards) {
  const rev = c => c.reversed ? '逆位' : '正位';
  return {
    cards: cards.map(c => ({ name: c.name, meaning: `${c.name}${rev(c)}——此刻它照见的是你心里已经隐约知道、却还没说出口的那部分。` })),
    situation: '你说的这件事，表面在纠结怎么选，其实心里已经有了倾向，只是还没允许自己承认。',
    perspective: `${cards[0] ? cards[0].name : '牌面'}摆在现状，说明你正处在一个「知道不对劲、但还没动」的阶段。真正卡住你的，不是外面的难，是你还没把它看清楚。`,
    insights: [
      '先把「我担心的」和「真正会发生的」分开——大多数怕，都比现实更大。',
      '你要的答案，其实是允许自己按心里的方向走一步。',
      '别急着一次解决全部，先做最小的那一步就好。'
    ],
    action: '今天挑一件最小的、你一直在拖的事，把它做掉——用行动打破那团模糊。',
    _demo: true
  };
}

module.exports = { DECK, drawCards, DOMAINS, demoReading, MAJOR, SUITS, RANKS };
