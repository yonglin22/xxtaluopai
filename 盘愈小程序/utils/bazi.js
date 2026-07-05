// ============================================================
// 八字 · 五行引擎（纯 JS，直接移自 H5：真节气排盘 + 扶抑/调候喜用 + 中医体质）
// 与 H5 FateWX 完全一致，保证两端排盘结果相同。
// ============================================================
const SHICHEN_HOUR = [null, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
const FATE_ELCN = { jin: '金', mu: '木', shui: '水', huo: '火', tu: '土' };

const FateWX=(function(){
  const STEMS=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  const BRANCHES=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  const STEM_EL=['mu','mu','huo','huo','tu','tu','jin','jin','shui','shui'];
  const HIDDEN={子:[['癸',1]],丑:[['己',.6],['癸',.3],['辛',.1]],寅:[['甲',.6],['丙',.3],['戊',.1]],卯:[['乙',1]],
   辰:[['戊',.6],['乙',.3],['癸',.1]],巳:[['丙',.6],['庚',.3],['戊',.1]],午:[['丁',.7],['己',.3]],
   未:[['己',.6],['丁',.3],['乙',.1]],申:[['庚',.6],['壬',.3],['戊',.1]],酉:[['辛',1]],
   戌:[['戊',.6],['辛',.3],['丁',.1]],亥:[['壬',.7],['甲',.3]]};
  const stemEl=s=>STEM_EL[STEMS.indexOf(s)];
  const GEN={mu:'huo',huo:'tu',tu:'jin',jin:'shui',shui:'mu'},CTRL={mu:'tu',tu:'shui',shui:'huo',huo:'jin',jin:'mu'};
  const genBy=x=>Object.keys(GEN).find(k=>GEN[k]===x),ctrlBy=x=>Object.keys(CTRL).find(k=>CTRL[k]===x);
  const D2R=Math.PI/180,norm=x=>((x%360)+360)%360;
  function jd(y,m,d,h){if(m<=2){y--;m+=12;}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+h/24+B-1524.5;}
  function sunLon(JD){const T=(JD-2451545)/36525,L0=norm(280.46646+36000.76983*T+.0003032*T*T),M=norm(357.52911+35999.05029*T-.0001537*T*T)*D2R;
    return norm(L0+(1.914602-.004817*T)*Math.sin(M)+(.019993-.000101*T)*Math.sin(2*M)+.000289*Math.sin(3*M));}
  function solveTerm(target,jGuess){let lo=jGuess-20,hi=jGuess+20;const f=j=>{let d=norm(sunLon(j)-target);if(d>180)d-=360;return d;};
    for(let i=0;i<50;i++){const mid=(lo+hi)/2;if(f(lo)*f(mid)<=0)hi=mid;else lo=mid;}return (lo+hi)/2;}
  function civilJDN(y,m,d){const a=Math.floor((14-m)/12),yy=y+4800-a,mm=m+12*a-3;return d+Math.floor((153*mm+2)/5)+365*yy+Math.floor(yy/4)-Math.floor(yy/100)+Math.floor(yy/400)-32045;}
  const DAY_OFFSET=((33-civilJDN(1893,12,26))%60+60)%60;
  function paipan(y,mo,d,localH,tz){
    tz=(tz==null?8:tz);const hasHour=(localH!=null);
    const JDn=jd(y,mo,d,(hasHour?localH:12)-tz),sl=sunLon(JDn);
    const lichun=solveTerm(315,jd(y,2,4,0)-tz/24);
    const solarYear=JDn>=lichun?y:y-1;
    const yStem=((solarYear-4)%10+10)%10,yBranch=((solarYear-4)%12+12)%12;
    const mIdx=Math.floor(norm(sl-315)/30),mBranch=(2+mIdx)%12,yinStem=(yStem*2+2)%10,mStem=(yinStem+mIdx)%10;
    let dayJDN=civilJDN(y,mo,d);if(hasHour&&localH>=23)dayJDN+=1;
    const dgz=((dayJDN+DAY_OFFSET)%60+60)%60,dStem=dgz%10,dBranch=dgz%12;
    const hB=Math.floor(((hasHour?localH:12)+1)/2)%12,hStem=((dStem%5)*2+hB)%10;
    return {pillars:{year:[STEMS[yStem],BRANCHES[yBranch]],month:[STEMS[mStem],BRANCHES[mBranch]],
      day:[STEMS[dStem],BRANCHES[dBranch]],hour:hasHour?[STEMS[hStem],BRANCHES[hB]]:null},dayStem:STEMS[dStem]};
  }
  function profile(y,mo,d,localH,tz){
    const pp=paipan(y,mo,d,localH,tz),P=pp.pillars,sc={jin:0,mu:0,shui:0,huo:0,tu:0};
    [P.year,P.month,P.day,P.hour].filter(Boolean).forEach(([s,b],i)=>{sc[stemEl(s)]+=1;const w=(i===1)?1.6:1;HIDDEN[b].forEach(([hs,ww])=>sc[stemEl(hs)]+=ww*w);});
    const total=Object.values(sc).reduce((a,b)=>a+b,0)||1,scores={};Object.keys(sc).forEach(k=>scores[k]=Math.round(sc[k]/total*100));
    const dayEl=stemEl(pp.dayStem),yin=genBy(dayEl),bi=dayEl,strong=sc[yin]+sc[bi],weak=sc[GEN[dayEl]]+sc[CTRL[dayEl]]+sc[ctrlBy(dayEl)];
    const shen=strong>=weak?'强':'弱';let fuFav,fuAvo;
    if(shen==='强'){fuFav=[GEN[dayEl],CTRL[dayEl],ctrlBy(dayEl)].sort((a,b)=>sc[a]-sc[b]);fuAvo=[yin,bi].sort((a,b)=>sc[b]-sc[a]);}
    else{fuFav=[yin,bi].sort((a,b)=>sc[a]-sc[b]);fuAvo=[GEN[dayEl],CTRL[dayEl],ctrlBy(dayEl)].sort((a,b)=>sc[b]-sc[a]).slice(0,2);}
    const mb=P.month[1];let tiaohou=null,thNote='';
    if('亥子丑'.indexOf(mb)>=0){tiaohou='huo';thNote='冬寒·首用火暖局';}
    else if('巳午未'.indexOf(mb)>=0){tiaohou='shui';thNote='夏燥·首用水润局';}
    else if('寅卯辰'.indexOf(mb)>=0){if(sc.huo<20){tiaohou='huo';thNote='春寒未透·宜火暖';}else if(sc.jin<15){tiaohou='jin';thNote='木旺·宜金修';}}
    else if('申酉戌'.indexOf(mb)>=0){if(sc.shui<16){tiaohou='shui';thNote='秋燥·宜水润';}else if(sc.huo<16){tiaohou='huo';thNote='金旺·宜火炼';}}
    let favorable=[];if(tiaohou&&sc[tiaohou]<38)favorable.push(tiaohou);fuFav.forEach(e=>{if(favorable.indexOf(e)<0)favorable.push(e);});favorable=[...new Set(favorable)].slice(0,2);
    let avoid=[...new Set(fuAvo)].filter(e=>favorable.indexOf(e)<0).slice(0,2);
    const ks=Object.keys(scores);
    return {scores,lack:ks.slice().sort((a,b)=>scores[a]-scores[b]).slice(0,2),excess:ks.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,1),
      favorable,avoid,dayMaster:dayEl,shen,dayStem:P.day[0],dayBranch:P.day[1],monthBranch:mb,tiaohou,tiaohouNote:thNote,pillarStems:[P.year[0],P.month[0],P.day[0],P.hour?P.hour[0]:''],
      pillars:`${P.year.join('')} ${P.month.join('')} ${P.day.join('')} ${P.hour?P.hour.join(''):'—'}`,source:'bazi'};
  }
  return {profile};
})();

// 五行 → 中医体质（移自 H5 fateTizhi）
function fateTizhi(wx) {
  const s = wx.scores;
  if (s.huo <= 12) return { key: '阳虚·偏寒', themes: ['情绪安定'], xf: '内府降真香' };
  if (s.shui <= 12) return { key: '阴虚·偏燥', themes: ['睡眠安神'], xf: '桂花养神/安息香' };
  const max = Object.keys(s).sort((a, b) => s[b] - s[a])[0];
  if (max === 'mu') return { key: '气郁·思虑', themes: ['情感决断', '焦虑纾解'], xf: '茉莉/杏花·疏肝解郁' };
  if (max === 'tu' && s.tu >= 32) return { key: '痰湿·困重', themes: ['专注定力'], xf: '龙涎香/华佗香' };
  if (s.jin <= 12) return { key: '气虚·易倦', themes: ['情绪安定'], xf: '紫瑞香' };
  return { key: '平和·守中', themes: [], xf: '沉檀龙麝' };
}

// 从出生信息取八字五行画像；bp = { sy, sm, sd, bh }（bh 为时辰下标 1-12，0/未知则不带时辰）
function fateWXFromBirth(bp) {
  if (!bp || !bp.sy) return null;
  const h = (bp.bh > 0) ? SHICHEN_HOUR[bp.bh] : null;
  try { return FateWX.profile(+bp.sy, +bp.sm, +bp.sd, h, 8); } catch (e) { return null; }
}

module.exports = { FateWX, fateTizhi, fateWXFromBirth, SHICHEN_HOUR, FATE_ELCN };
