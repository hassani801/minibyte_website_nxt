// @ts-nocheck
/* Ported 1:1 from the original capabilities.html <script>. Runs once on the client (see components/CapabilitiesScript.tsx).
   gsap / three come from npm instead of CDN <script> tags, same versions (gsap 3.12.5, three r128). */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function initCapabilities(): void {
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const w: any = window; w.gsap = gsap; w.ScrollTrigger = ScrollTrigger; w.ScrollToPlugin = ScrollToPlugin;
'use strict';
var html=document.documentElement;
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
var HAS_G=typeof gsap!=='undefined', HAS_T=typeof THREE!=='undefined';
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))}, lerp=function(a,b,t){return a+(b-a)*t};
var sm=function(a,b,x){var t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
var ease=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
var safe=function(fn,name){try{fn()}catch(e){console.error('[minibyte] '+(name||fn.name),e)}};
var P='243,244,241', BL='70,84,255';
var BITS=[0,1,1,0,1,1,0,1];

/* ---------- header, nav, anchors ---------- */
var hdr=$('#hdr');
var secs=$$('section[id],.ps');
function onScroll(){
  var y=scrollY;hdr.classList.toggle('scrolled',y>40);
  var probe=44,theme='ink',cur='';
  for(var i=0;i<secs.length;i++){var r=secs[i].getBoundingClientRect();if(r.top<=probe&&r.bottom>probe){theme=secs[i].classList.contains('paper')?'paper':'ink';if(secs[i].id)cur=secs[i].id}}
  hdr.classList.toggle('on-paper',theme==='paper');
  var k='capabilities';$$('.nav a').forEach(function(a){a.classList.toggle('on',a.dataset.sec===k)});
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);

function goTo(id){
  var t=id==='#top'?document.body:$(id);if(!t)return;
  var y=id==='#top'?0:t.getBoundingClientRect().top+scrollY;
  if(HAS_G&&!RM&&typeof ScrollToPlugin!=='undefined')gsap.to(window,{duration:1.3,scrollTo:{y:y,autoKill:true},ease:'power3.inOut'});
  else scrollTo(0,y);
}
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
  var id=a.getAttribute('href');if(id.length<2)return;e.preventDefault();closeMenu();goTo(id);
});

var menu=$('#menu'),mbtn=$('#mbtn');
function openMenu(){menu.classList.add('open');menu.removeAttribute('inert');menu.setAttribute('aria-hidden','false');mbtn.setAttribute('aria-expanded','true');mbtn.textContent='CLOSE';html.style.overflow='hidden';var f=$('a',menu);if(f)setTimeout(function(){f.focus()},300)}
function closeMenu(){if(!menu.classList.contains('open'))return;menu.classList.remove('open');menu.setAttribute('inert','');menu.setAttribute('aria-hidden','true');mbtn.setAttribute('aria-expanded','false');mbtn.textContent='MENU';html.style.overflow='';mbtn.focus()}
mbtn.addEventListener('click',function(){menu.classList.contains('open')?closeMenu():openMenu()});
addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});
$('#copyMail').addEventListener('click',function(){
  var b=this,t='hello@minibyte.ai';
  var ok=function(){b.textContent='COPIED';setTimeout(function(){b.textContent='COPY'},1600)};
  var sel=function(){var r=document.createRange();r.selectNodeContents($('#mailTxt'));var s=getSelection();s.removeAllRanges();s.addRange(r)};
  try{navigator.clipboard.writeText(t).then(ok,sel)}catch(e){sel()}
});

/* ---------- cursor, magnetic, project interactions ---------- */
safe(function cursor(){
  if(!FINE||RM&&false)return;
  html.classList.add('has-cur');
  var dot=$('#curDot'),ring=$('#curRing'),lbl=$('#curLbl'),mx=-100,my=-100,rx=-100,ry=-100,state='';
  dot.style.transform='translate3d(-100px,-100px,0)';ring.style.transform='translate3d(-100px,-100px,0) translate(-50%,-50%)';
  addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;dot.style.transform='translate3d('+mx+'px,'+my+'px,0)'},{passive:true});
  (function tick(){rx+=(mx-rx)*.2;ry+=(my-ry)*.2;ring.style.transform='translate3d('+(rx)+'px,'+(ry)+'px,0) translate(-50%,-50%)';requestAnimationFrame(tick)})();
  function set(s){if(s===state)return;html.classList.remove('c-link','c-project','c-explore');state=s;if(s)html.classList.add('c-'+s);lbl.textContent=s==='project'?'VIEW\nPROJECT →':s==='explore'?'EXPLORE':''}
  document.addEventListener('pointerover',function(e){var t=e.target;if(!t.closest)return;var c=t.closest('[data-cursor]'),l=t.closest('a,button,input,[role=button],.row');
    if(c&&c.dataset.cursor==='project')set('project');else if(l)set('link');else if(c)set(c.dataset.cursor);else set('')});
  document.documentElement.addEventListener('mouseleave',function(){set('')});
},'cursor');

safe(function magnetic(){
  if(!FINE||!HAS_G||RM)return;
  $$('.mag').forEach(function(b){var qx=gsap.quickTo(b,'x',{duration:.5,ease:'power3.out'}),qy=gsap.quickTo(b,'y',{duration:.5,ease:'power3.out'});
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.28);qy((e.clientY-r.top-r.height/2)*.4)});
    b.addEventListener('pointerleave',function(){qx(0);qy(0)})});
},'magnetic');

/* ---------- reveals ---------- */
safe(function reveals(){
  $$('[data-split]').forEach(function(h){var parts=h.innerHTML.split(/<br\s*\/?>/i);h.innerHTML=parts.map(function(p,i){return '<span class="ln" style="--i:'+i+'"><span>'+p.trim()+'</span></span>'}).join('');h.classList.add('hd')});
  if(RM)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('[data-rv]').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight*.94){el.classList.add('rv');io.observe(el)}});
},'reveals');

/* ---------- counters ---------- */
function runCount(el,delay){
  var to=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',pad=+el.dataset.pad||0,o={v:0};
  var fmt=function(v){var s=String(Math.round(v));while(s.length<pad)s='0'+s;return pre+s+suf};
  if(!HAS_G||RM){el.textContent=fmt(to);return}
  el.textContent=fmt(0);gsap.to(o,{v:to,duration:1.6,delay:delay||0,ease:'power2.out',onUpdate:function(){el.textContent=fmt(o.v)},onComplete:function(){el.textContent=fmt(to)}});
}
/* ---------- capabilities page ---------- */
var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
var LAYERS=[
 {k:'PERCEIVE',d:'Sensing and understanding the world',z:252,caps:[2,7]},
 {k:'REASON',d:'Learning, planning and language',z:168,caps:[0,5,6]},
 {k:'ACT',d:'Moving, deciding and operating',z:84,caps:[1,4]},
 {k:'EMBED',d:'Running on real, constrained hardware',z:0,caps:[3]}
];
var WORKS={'01':'Intelligent Operations','02':'Autonomous Systems','03':'Perception Engine','04':'Intelligence at the Edge','05':'Coordinated Intelligence','06':'Conversational Systems','07':'Fleet Console','08':'Inference Gateway','09':'Field Companion','10':'Lab Notebook Assistant'};
var CAPS=[
 {n:'Artificial intelligence',s:'AI',cl:'LEARNING SYSTEMS',l:1,d:'Research and development of intelligent systems, machine learning models and applied AI.',
  do:['Model design, training and fine-tuning on your data','Evaluation suites that decide what ships','Applied research from paper to prototype','Compression and serving-cost reduction'],
  out:['Trained models with model cards','Evaluation harness and benchmarks','Reproducible training pipeline'],
  tools:['PyTorch','JAX','ONNX','Hugging Face','Weights & Biases'],dp:[9,8,7],eng:'6 to 14 weeks',seen:['01','08','10']},
 {n:'Robotics',s:'Robotics',cl:'PHYSICAL AUTONOMY',l:2,d:'Intelligent robotic systems for autonomous operation, perception and real-world environments.',
  do:['Localisation, perception and motion planning','Simulation and hardware-in-the-loop testing','Safety cases for supervised autonomy','Integration with existing mechanical platforms'],
  out:['Autonomy software stack','Simulation environment with replay','Field trial and safety report'],
  tools:['ROS 2','Gazebo','C++','Python','CAN bus'],dp:[7,8,6],eng:'4 to 12 months',seen:['02']},
 {n:'Computer vision',s:'Vision',cl:'PERCEPTION',l:0,d:'Systems that understand environments, objects, movement and visual information.',
  do:['Detection, tracking and segmentation','Multi-camera calibration and fusion','Visual inspection and anomaly detection','Real-time pipelines on edge hardware'],
  out:['Vision models and pipelines','Calibration tooling','Event API for downstream systems'],
  tools:['OpenCV','PyTorch','TensorRT','GStreamer','CVAT'],dp:[8,9,7],eng:'8 to 20 weeks',seen:['02','03','09']},
 {n:'Embedded intelligence',s:'Embedded',cl:'ON-DEVICE',l:3,d:'AI that runs closer to the hardware, optimised for constrained and real-world devices.',
  do:['Quantisation, pruning and distillation','Firmware integration on constrained chips','Power, latency and memory budgeting','Over-the-air model updates'],
  out:['Compressed model family','Firmware integration kit','Power and accuracy report'],
  tools:['TFLite Micro','Apache TVM','Rust','C','Arm Cortex-M'],dp:[6,9,6],eng:'3 to 8 months',seen:['04']},
 {n:'Automation',s:'Automation',cl:'OPERATIONS',l:2,d:'AI-powered automation for complex business and operational workflows.',
  do:['Workflow mapping and decision analysis','Agent-assisted approvals and exceptions','Integration with operations tools','Shadow-mode rollout with measured impact'],
  out:['Automated workflow services','Operator console','Impact report'],
  tools:['Python','TypeScript','Temporal','PostgreSQL','Kafka'],dp:[5,8,9],eng:'2 to 6 months',seen:['01','07']},
 {n:'Multi-agent systems',s:'Agents',cl:'COORDINATION',l:1,d:'Coordinated AI agents designed to reason, execute and collaborate across complex workflows.',
  do:['Role design: planners, workers and verifiers','Tool permissions and guardrails','Tracing, replay and failure analysis','Benchmarks against single-agent baselines'],
  out:['Agent orchestration service','Tracing and replay tools','Evaluation benchmark'],
  tools:['Python','OpenTelemetry','Redis','pgvector','Pydantic'],dp:[9,7,6],eng:'8 to 16 weeks',seen:['01','05','10']},
 {n:'Voice and conversational AI',s:'Voice',cl:'INTERFACE',l:1,d:'Intelligent voice systems and conversational interfaces for human-machine interaction.',
  do:['Speech recognition for noisy environments','Dialogue design with safe confirmations','Low-latency streaming pipelines','Accent and language adaptation'],
  out:['Speech and intent pipeline','Dialogue specification','Headset or device integration'],
  tools:['WebRTC','gRPC','PyTorch','Kaldi','ONNX Runtime'],dp:[7,8,6],eng:'3 to 8 months',seen:['06']},
 {n:'Intelligent infrastructure',s:'Infrastructure',cl:'CRITICAL SYSTEMS',l:0,d:'Sensor fusion, edge intelligence and systems designed for critical environments.',
  do:['Sensor fusion and time-series intelligence','Edge-to-cloud data architecture','Observability, drift and health monitoring','Resilient design for critical environments'],
  out:['Reference architecture','Event and monitoring platform','Runbooks and failure drills'],
  tools:['Kubernetes','Kafka','Prometheus','TimescaleDB','Rust'],dp:[5,8,9],eng:'3 to 9 months',seen:['03','07','08']}
];
var cc=function(i){return 'C-0'+(i+1)};
var picked={};

/* hero stack */
safe(function stack(){
  var s=$('#isoS'),leg=$('#isoLeg'),iso=$('#iso');
  var spots=[[[.3,.35],[.68,.62]],[[.25,.3],[.6,.4],[.45,.72]],[[.32,.5],[.7,.45]],[[.5,.5]]];
  s.innerHTML=LAYERS.map(function(L,k){
    return '<button type="button" class="cp-slab" data-k="'+k+'" data-l="L'+(k+1)+' '+L.k+'" style="--z:'+L.z+';--k:'+k+'" aria-label="Layer '+(k+1)+', '+L.k+': '+L.caps.map(function(c){return CAPS[c].n}).join(', ')+'">'+
      spots[k].map(function(p){return '<i class="dt" style="left:'+(p[0]*100)+'%;top:'+(p[1]*100)+'%"></i>'}).join('')+'</button>'}).join('');
  leg.innerHTML=LAYERS.map(function(L,k){
    return '<li><button type="button" data-k="'+k+'"><span class="l mono">L'+(k+1)+'</span><span><b>'+L.k+'</b><small>'+L.caps.map(function(c){return CAPS[c].s}).join(' / ')+'</small></span><span class="ar" aria-hidden="true">→</span></button></li>'}).join('');
  function hot(k){if(k==null){iso.removeAttribute('data-hot')}else{iso.setAttribute('data-hot',k)}
    $$('.cp-slab',iso).forEach(function(b){b.classList.toggle('hot',+b.dataset.k===k)});$$('button',leg).forEach(function(b){b.classList.toggle('hot',+b.dataset.k===k)})}
  function go(k){select(LAYERS[k].caps[0],true)}
  $$('.cp-slab',iso).concat($$('button',leg)).forEach(function(b){var k=+b.dataset.k;
    b.addEventListener('pointerenter',function(){hot(k)});b.addEventListener('pointerleave',function(){hot(null)});
    b.addEventListener('focus',function(){hot(k)});b.addEventListener('blur',function(){hot(null)});
    b.addEventListener('click',function(){go(k)})});
},'stack');

/* explorer */
var cur=-1;
var list=$('#cpList'),panel=$('#cpPanel');
safe(function explorer(){
  var h='',last=-1;
  var order=[];LAYERS.forEach(function(L,k){L.caps.forEach(function(c){order.push([k,c])})});
  order.forEach(function(o){var k=o[0],c=o[1];
    if(k!==last){h+='<div class="cp-lh mono"><span>L'+(k+1)+' / '+LAYERS[k].k+'</span><span>'+LAYERS[k].caps.length+'</span></div>';last=k}
    h+='<button type="button" role="tab" class="cp-it" id="tab-'+c+'" data-c="'+c+'" aria-selected="false" aria-controls="cpPanel" tabindex="-1"><span class="c mono">'+cc(c)+'</span><b>'+esc(CAPS[c].n)+'</b><span class="ar" aria-hidden="true">→</span></button>'});
  list.innerHTML=h;
  list.addEventListener('click',function(e){var b=e.target.closest('.cp-it');if(b)select(+b.dataset.c,false)});
  list.addEventListener('keydown',function(e){
    var k=e.key;if(k!=='ArrowDown'&&k!=='ArrowUp'&&k!=='Home'&&k!=='End')return;e.preventDefault();
    var its=$$('.cp-it',list),i=its.findIndex(function(b){return b===document.activeElement});if(i<0)i=its.findIndex(function(b){return +b.dataset.c===cur});
    i=k==='ArrowDown'?(i+1)%its.length:k==='ArrowUp'?(i-1+its.length)%its.length:k==='Home'?0:its.length-1;
    its[i].focus();select(+its[i].dataset.c,false)});
},'explorer');
function seg(v,k){var o='';for(var i=0;i<10;i++)o+='<i style="--k:'+i+'" data-on="'+(i<v?1:0)+'" data-top="'+(i===v-1?1:0)+'"></i>';return '<div class="cp-seg" role="img" aria-label="'+v+' out of 10">'+o+'</div>'}
function render(c,sw){
  var d=CAPS[c];
  var order=[];LAYERS.forEach(function(L){L.caps.forEach(function(x){order.push(x)})});var pos=order.indexOf(c);
  var nx=order[(pos+1)%order.length],pv=order[(pos-1+order.length)%order.length];
  var tot=d.dp,names=['RESEARCH','ENGINEERING','OPERATIONS'];
  panel.setAttribute('aria-labelledby','tab-'+c);
  panel.innerHTML=
   '<div class="cp-pt mono"><div class="tags"><b>'+cc(c)+'</b><span>L'+(d.l+1)+' / '+LAYERS[d.l].k+'</span><span>'+d.cl+'</span><i aria-hidden="true"></i></div>'+
   '<div class="cp-step"><button type="button" data-g="'+pv+'" aria-label="Previous capability">←</button><button type="button" data-g="'+nx+'" aria-label="Next capability">→</button></div></div>'+
   '<div><h3 class="cp-ph">'+esc(d.n)+'</h3><p class="cp-pl">'+esc(d.d)+'</p></div>'+
   '<div class="cp-spec"><div><h4 class="mono">WHAT WE DO</h4><ul>'+d.do.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>'+
   '<div><h4 class="mono">WHAT YOU RECEIVE</h4><ul>'+d.out.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div></div>'+
   '<div><h4 class="mono mut" style="font-weight:400;margin-bottom:12px">TOOLS WE REACH FOR</h4><div class="cp-tools">'+d.tools.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div></div>'+
   '<div class="cp-meters">'+tot.map(function(v,i){return '<div class="cp-m"><div class="t mono"><span>'+names[i]+'</span><b>'+v+' / 10</b></div>'+seg(v)+'</div>'}).join('')+'</div>'+
   '<div class="cp-pf"><div><h4 class="mono">TYPICAL ENGAGEMENT</h4><div class="big">'+d.eng+'</div></div>'+
   '<div><h4 class="mono">SEEN IN</h4><div class="cp-seen">'+d.seen.map(function(n){return '<a href="/work#p-'+n+'"><span>'+n+'</span>'+esc(WORKS[n])+'</a>'}).join('')+'</div></div>'+
   '<button type="button" class="cp-add" data-add="'+c+'" aria-pressed="'+(picked[c]?'true':'false')+'">'+(picked[c]?'IN BRIEF ✓':'ADD TO BRIEF +')+'</button></div>';
  if(sw){panel.classList.remove('sw');void panel.offsetWidth;panel.classList.add('sw')}
  requestAnimationFrame(function(){requestAnimationFrame(function(){$$('.cp-seg i',panel).forEach(function(i){if(i.dataset.on==='1'){i.classList.add('on');if(i.dataset.top==='1')i.classList.add('top')}})})});
}
panel.addEventListener('click',function(e){
  var g=e.target.closest('[data-g]');if(g){select(+g.dataset.g,false);return}
  var a=e.target.closest('[data-add]');if(a){var c=+a.dataset.add;setPick(c,!picked[c]);a.setAttribute('aria-pressed',picked[c]?'true':'false');a.textContent=picked[c]?'IN BRIEF ✓':'ADD TO BRIEF +'}
});
function select(c,scroll){
  if(c<0||c>7)return;
  var changed=c!==cur;cur=c;
  $$('.cp-it',list).forEach(function(b){var on=+b.dataset.c===c;b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1});
  if(changed)render(c,true);
  try{history.replaceState(null,'','#c-0'+(c+1))}catch(e){}
  if(scroll)goTo('#explorer');
}

/* method */
safe(function method(){
  var S=[['FRAME','1 to 2 wk','Is this worth building?','Scoped brief and success metric','We turn a broad ambition into one measurable outcome.'],
   ['MODEL','2 to 4 wk','Can it work on your data?','Baseline and feasibility note','A fast baseline shows what the data can and cannot do.'],
   ['PROTOTYPE','4 to 8 wk','Does it work in context?','Working prototype','A thin end-to-end slice, running beside your real process.'],
   ['PROVE','4 to 10 wk','Does it hold up in the field?','Evaluation report','Measured against the metric from stage one, not a demo.'],
   ['SHIP','4 to 8 wk','Is it safe to release?','Release and rollback plan','Production hardening, access control and a way back.'],
   ['OPERATE','Ongoing','Is it still right next month?','Monitoring and handover','Drift checks, support and a clean handover to your team.']];
  $('#cpMt').innerHTML=S.map(function(s,i){return '<div class="cp-st"><span class="n mono">0'+(i+1)+'</span><h3>'+s[0]+'</h3><span class="wk mono">'+s[1].toUpperCase()+'</span><p>'+s[4]+'</p><div class="g"><span class="mono">GATE</span><b>'+s[2]+'</b><span class="mono" style="margin-top:8px">OUTPUT</span><b>'+s[3]+'</b></div></div>'}).join('');
},'method');

/* radar */
safe(function radar(){
  var svg=$('#cpRadar'),R=210,ns='http://www.w3.org/2000/svg',lens=0,vals=CAPS.map(function(c){return c.dp[0]}),anim=null;
  var LD=['How far we can push the state of the art in each field.','How reliably we turn it into software and hardware.','How well we run it after launch.'];
  var ang=function(i){return -Math.PI/2+i*Math.PI/4};
  var pt=function(i,v){return [Math.cos(ang(i))*R*v/10,Math.sin(ang(i))*R*v/10]};
  var poly=function(v){return v.map(function(x,i){var p=pt(i,x);return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ')};
  var h='';
  [2,4,6,8,10].forEach(function(r){h+='<polygon class="ring'+(r===10?' o':'')+'" points="'+poly(CAPS.map(function(){return r}))+'"/>'});
  CAPS.forEach(function(c,i){var p=pt(i,10);h+='<line class="ax" x1="0" y1="0" x2="'+p[0].toFixed(1)+'" y2="'+p[1].toFixed(1)+'"/>'});
  h+='<polygon class="shape" id="rShape" points="'+poly(vals)+'"/>';
  CAPS.forEach(function(c,i){var p=pt(i,vals[i]);h+='<circle class="pt" data-i="'+i+'" cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="5"/>'});
  CAPS.forEach(function(c,i){var p=pt(i,10),x=Math.cos(ang(i)),a=Math.abs(x)<.3?'middle':x>0?'start':'end';
    var lx=p[0]+(Math.abs(x)<.3?0:x>0?18:-18),ly=p[1]+(Math.sin(ang(i))<-.5?-22:Math.sin(ang(i))>.5?30:6);
    h+='<g class="lb" data-i="'+i+'"><text class="n" x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" text-anchor="'+a+'">'+cc(i)+'</text><text x="'+lx.toFixed(1)+'" y="'+(ly+15).toFixed(1)+'" text-anchor="'+a+'">'+c.s.toUpperCase()+'</text></g>'});
  svg.innerHTML=h;
  var shape=$('#rShape'),pts=$$('.pt',svg);
  var rk=$('#cpRank');
  rk.innerHTML=CAPS.map(function(c,i){return '<li data-i="'+i+'"><span class="c">'+cc(i)+'</span><b>'+esc(c.n)+'</b><span class="bar"><i style="width:'+c.dp[0]*10+'%"></i></span><span class="v">'+c.dp[0]+'</span></li>'}).join('');
  $('#cpLensD').textContent=LD[0];
  function set(v){vals=v;shape.setAttribute('points',poly(v));pts.forEach(function(p,i){var q=pt(i,v[i]);p.setAttribute('cx',q[0].toFixed(1));p.setAttribute('cy',q[1].toFixed(1))})}
  function to(l){
    lens=l;var tgt=CAPS.map(function(c){return c.dp[l]}),from=vals.slice();
    $$('#cpLens button').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.v===l?'true':'false')});
    $('#cpLensD').textContent=LD[l];
    $$('li',rk).forEach(function(li,i){li.querySelector('.bar i').style.width=tgt[i]*10+'%';li.querySelector('.v').textContent=tgt[i]});
    if(anim)cancelAnimationFrame(anim);
    if(RM){set(tgt);return}
    var t0=performance.now();
    (function step(t){var k=Math.min(1,(t-t0)/700),e=1-Math.pow(1-k,3);set(from.map(function(f,i){return f+(tgt[i]-f)*e}));if(k<1)anim=requestAnimationFrame(step)})(t0);
  }
  $('#cpLens').addEventListener('click',function(e){var b=e.target.closest('button');if(b)to(+b.dataset.v)});
  function hi(i,on){pts.forEach(function(p){p.classList.toggle('on',on&&+p.dataset.i===i)});$$('.lb',svg).forEach(function(g){g.classList.toggle('on',on&&+g.dataset.i===i)});$$('li',rk).forEach(function(li){li.classList.toggle('on',on&&+li.dataset.i===i)})}
  rk.addEventListener('pointerover',function(e){var li=e.target.closest('li');if(li)hi(+li.dataset.i,true)});
  rk.addEventListener('pointerleave',function(){hi(-1,false)});
  svg.addEventListener('pointerover',function(e){var t=e.target.closest('[data-i]');if(t)hi(+t.dataset.i,true)});
  svg.addEventListener('pointerleave',function(){hi(-1,false)});
},'radar');

/* tooling, standards, faq */
safe(function lists(){
  var T=[['Models and learning',['PyTorch','JAX','ONNX','Hugging Face','scikit-learn']],
   ['Perception and robotics',['ROS 2','OpenCV','Gazebo','Open3D','GStreamer']],
   ['Data and infrastructure',['PostgreSQL','Kafka','Kubernetes','Terraform','Prometheus']],
   ['Software and interfaces',['TypeScript','React','Python','Rust','gRPC']],
   ['Devices and sensors',['NVIDIA Jetson','Arm Cortex-M','ESP32','Lidar','IMU']]];
  $('#cpTb').innerHTML=T.map(function(t,i){return '<div class="cp-tr" data-rv><h3><span class="mono">E.0'+(i+1)+'</span>'+t[0]+'</h3><ul>'+t[1].map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>'}).join('');
  var P=[['Evaluate first','Before we build, we agree how success is measured and write the test that checks it.'],['Ship with a way back','Every release has a rollback plan, a monitor and a named owner.'],['Explain what we build','No black boxes. You get the reasoning, the data lineage and the documentation.'],['Keep humans in the loop','Where a decision matters, a person approves it until the evidence says otherwise.']];
  $('#cpStd').innerHTML=P.map(function(p,i){return '<li data-rv><span class="n mono">0'+(i+1)+'</span><div><b>'+p[0]+'</b><p>'+p[1]+'</p></div></li>'}).join('');
  var Q=[['Can you work with our existing data and systems?','Yes. We start from what you have and integrate with it. If the data is not ready, the first stage tells you what is missing and how long it would take to fix.'],
   ['Who owns the models and code?','You do. We hand over source, weights, documentation and the evaluation set. Anything we reuse from our own libraries is licensed to you alongside it.'],
   ['Can the system run entirely on our premises or devices?','Yes. Embedded and on-premise deployments are a core part of the work, including environments with no outside connection.'],
   ['How do you keep the work safe and reliable?','We test against a written evaluation before every release, keep a rollback ready and add human approval wherever a decision carries real cost.'],
   ['Do you take research-only engagements?','Yes. Many projects stop at a validated prototype and a clear recommendation, and that is a perfectly good outcome.'],
   ['How soon can we start?','Usually within two to three weeks of a signed scope. A short framing stage can begin sooner.']];
  $('#cpFaq').innerHTML=Q.map(function(q,i){return '<details><summary><span class="n">0'+(i+1)+'</span><span>'+q[0]+'</span><span class="pm" aria-hidden="true"></span></summary><div class="a">'+q[1]+'</div></details>'}).join('');
},'lists');

/* brief builder */
function setPick(c,on){picked[c]=on;var inp=$('#chip-'+c);if(inp)inp.checked=on;brief()}
safe(function briefInit(){
  $('#cpChips').innerHTML=CAPS.map(function(c,i){return '<label><input type="checkbox" id="chip-'+i+'" data-c="'+i+'"><span><i>'+cc(i)+'</i>'+esc(c.n)+'</span></label>'}).join('');
  $('#cpChips').addEventListener('change',function(e){var c=+e.target.dataset.c;picked[c]=e.target.checked;brief();if(c===cur){var a=$('[data-add]',panel);if(a){a.setAttribute('aria-pressed',picked[c]?'true':'false');a.textContent=picked[c]?'IN BRIEF ✓':'ADD TO BRIEF +'}}});
  $('#cpForm').addEventListener('input',brief);$('#cpForm').addEventListener('change',brief);
  $('#briefCopy').addEventListener('click',function(){var b=this,t=brief();var ok=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy brief'},1600)};
    try{navigator.clipboard.writeText(t).then(ok,function(){var r=document.createRange();r.selectNodeContents($('#briefPre'));var s=getSelection();s.removeAllRanges();s.addRange(r)})}catch(e){}});
  brief();
},'briefInit');
function brief(){
  var ids=Object.keys(picked).filter(function(k){return picked[k]}).map(Number).sort(function(a,b){return a-b});
  var v=function(sel){var e=$(sel);return e?e.value.trim():''};
  var stage=($('input[name=stage]:checked')||{}).value||'',time=($('input[name=time]:checked')||{}).value||'';
  var lines=['Capability brief','',
   'Capabilities: '+(ids.length?ids.map(function(i){return cc(i)+' '+CAPS[i].n}).join(', '):'not chosen yet'),
   'Where we are: '+stage,'Timeframe: '+time];
  if(v('#bfGoal'))lines.push('Goal: '+v('#bfGoal'));
  var who=[v('#bfName'),v('#bfOrg')].filter(Boolean).join(', ');if(who)lines.push('','From: '+who);
  var t=lines.join('\n');
  var pre=$('#briefPre');if(pre)pre.textContent=t;
  var cnt=$('#cpCount');if(cnt)cnt.textContent=ids.length+' SELECTED';
  var a=$('#briefSend');if(a)a.href='mailto:hello@minibyte.ai?subject='+encodeURIComponent('Capability brief'+(ids.length?': '+ids.map(function(i){return CAPS[i].s}).join(', '):''))+'&body='+encodeURIComponent(t);
  return t;
}

/* rail */
var railLinks=$$('#rail a'),railSecs=railLinks.map(function(a){return document.getElementById(a.dataset.s)});
function railTick(){var p=innerHeight*.4,cur2=0;railSecs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<=p)cur2=i});railLinks.forEach(function(a,i){a.classList.toggle('on',i===cur2)})}
addEventListener('scroll',railTick,{passive:true});railTick();

/* deep link */
function fromHash(first){
  var m=/^#c-0([1-8])$/.exec(location.hash||'');
  if(m){select(+m[1]-1,false);if(first)setTimeout(function(){var t=$('#explorer');if(t)scrollTo(0,t.getBoundingClientRect().top+scrollY-0)},350)}
  else if(first)select(0,false);
}
fromHash(true);
addEventListener('hashchange',function(){fromHash(false)});
setTimeout(function(){html.classList.add('ready')},RM?0:650);
onScroll();


}
