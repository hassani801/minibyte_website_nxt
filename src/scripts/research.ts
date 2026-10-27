// @ts-nocheck
/* Ported 1:1 from the original research.html <script>. Runs once on the client (see components/ResearchScript.tsx).
   gsap / three come from npm instead of CDN <script> tags, same versions (gsap 3.12.5, three r128). */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function initResearch(): void {
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
  var k='research';$$('.nav a').forEach(function(a){a.classList.toggle('on',a.dataset.sec===k)});
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
/* ---------- research page ---------- */
var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
var pad2=function(n){return (n<10?'0':'')+n};
var TEAM=['Lena Brandt','Amara Okoye','Mateo Sato','Jonas Weber'];
var STAGES=['QUESTION','EXPERIMENT','RESULT','PUBLISHED','DEPLOYED'];
var CAPN=['Artificial intelligence','Robotics','Computer vision','Embedded intelligence','Automation','Multi-agent systems','Voice and conversational AI','Intelligent infrastructure'];
var WORKS={'01':'Intelligent Operations','02':'Autonomous Systems','03':'Perception Engine','04':'Intelligence at the Edge','05':'Coordinated Intelligence','06':'Conversational Systems','07':'Fleet Console','08':'Inference Gateway','09':'Field Companion','10':'Lab Notebook Assistant'};
var PROG=[
 {t:'On-device AI',q:'How small can a model get before it stops being useful?',st:'ONGOING',stage:3,since:'2026.02',lead:0,team:4,
  why:'Cloud round trips cost time, money and privacy. If useful models run locally, whole classes of products become possible, and safer.',
  me:['Compression under controlled data shift','Five-seed evaluation on held-out sites','Energy and latency measured on real chips'],
  fd:[['−62%','model size at equal task accuracy'],['4×','faster inference on a microcontroller-class chip']],caps:[1,4],work:['04','08']},
 {t:'Embedded intelligence',q:'What does one decision really cost in energy?',st:'PROTOTYPING',stage:2,since:'2026.04',lead:2,team:3,
  why:'A sensor that lasts a month is a gadget. One that lasts a decade is infrastructure. Energy per decision decides which one we can build.',
  me:['End-to-end power measurement on prototype boards','Firmware-level scheduling experiments','Duty-cycled sensing against always-on baselines'],
  fd:[['38 µJ','per decision on the prototype board'],['11 mo','projected life on a coin cell']],caps:[4,8],work:['04']},
 {t:'Multi-agent systems',q:'Do agents that check each other beat one stronger agent?',st:'ONGOING',stage:3,since:'2026.06',lead:0,team:5,
  why:'Single agents fail quietly. If a second agent can catch the failure cheaply, long workflows become safe enough to automate.',
  me:['Planner, worker and verifier role designs','Traced replays of every failure','Cost and accuracy compared with a single-agent baseline'],
  fd:[['−41%','silent failures with a verifier agent'],['2.3×','cost of the extra check, and when it pays off']],caps:[6,5],work:['05','01','10']},
 {t:'Perception',q:'How do we keep vision reliable when the world changes?',st:'IN REVIEW',stage:3,since:'2026.09',lead:1,team:4,
  why:'Cameras that work in the lab and drift in the field are expensive to trust. Reliable perception needs calibration and monitoring, not just a better model.',
  me:['Multi-camera calibration tooling','Drift detection on live streams','Sensor-fusion benchmarks across seasons'],
  fd:[['48','cameras calibrated in one afternoon'],['−55%','false alerts after drift monitoring']],caps:[3,8],work:['03','09']},
 {t:'Voice in noise',q:'Can speech systems stay accurate beside machinery?',st:'ONGOING',stage:2,since:'2025.11',lead:2,team:3,
  why:'People who work with their hands cannot stop to type. Voice only helps them if it works at the volume of their workplace.',
  me:['Field recordings in loud environments','Noise-aware training and augmentation','Confirmation design to prevent wrong actions'],
  fd:[['94%','command accuracy at 85 dB'],['0.6 s','median response time']],caps:[7],work:['06']},
 {t:'Autonomy without GPS',q:'How far can vehicles navigate without satellites?',st:'FIELD TRIALS',stage:4,since:'2025.03',lead:1,team:6,
  why:'The places where autonomy is most useful, ports, mines and warehouses, are often where satellite positioning is least reliable.',
  me:['Lidar, camera and inertial fusion','Replay of every intervention in simulation','Supervised field trials with a safety driver'],
  fd:[['0.12 m','median localisation error'],['14 mo','of supervised field trials']],caps:[2,3],work:['02']}
];
var PUBS=[
 {y:2026,t:'PAPER',ti:'Small Models, Honest Limits: Evaluating Compression Under Distribution Shift',au:[0,2,1],p:0,v:'Conference proceedings',ab:'We compare standard and shift-aware compression across five model sizes and show where each stops being trustworthy on data from a new site.'},
 {y:2026,t:'PREPRINT',ti:'Verifier Agents Reduce Silent Failures in Multi-Step Workflows',au:[0,3],p:2,v:'Preprint server',ab:'A separate verifier agent with different instructions catches failures that a stronger single agent misses, at a measurable cost.'},
 {y:2026,t:'PAPER',ti:'Calibration Before Detection: Making Multi-Camera Tracking Deployable',au:[1,3],p:3,v:'Journal, in review',ab:'Calibration quality, not detector accuracy, explains most of the variation in multi-camera tracking across forty sites.'},
 {y:2026,t:'REPORT',ti:'Power Budgets as a First-Class Design Constraint for On-Device Inference',au:[2,0],p:1,v:'Minibyte Technical Report MTR-26-03',ab:'Setting the energy budget before choosing an architecture changes which models are worth building.'},
 {y:2026,t:'WORKSHOP',ti:'Confirmation Design for Voice Interfaces in Loud Environments',au:[2,1],p:4,v:'Workshop paper',ab:'Short confirmation prompts prevented most wrong actions while adding under a second to each command.'},
 {y:2026,t:'DATASET',ti:'YardNav: Multi-Sensor Logs from GPS-Denied Industrial Yards',au:[1,2,3],p:5,v:'Open dataset, 38 hours',ab:'Synchronised lidar, camera and inertial logs recorded across container yards in four weather conditions.'},
 {y:2025,t:'PAPER',ti:'Localisation Without Satellites: Lidar and Inertial Fusion in Container Yards',au:[1,0],p:5,v:'Conference proceedings',ab:'A fusion pipeline holds a median localisation error near twelve centimetres where satellite positioning fails.'},
 {y:2025,t:'PREPRINT',ti:'Quantisation-Aware Distillation for Microcontroller-Class Models',au:[0,2],p:0,v:'Preprint server',ab:'Distilling during quantisation keeps accuracy that post-training quantisation loses on very small models.'},
 {y:2025,t:'REPORT',ti:'A Field Guide to Sensor Drift in Long-Running Deployments',au:[1,3],p:3,v:'Minibyte Technical Report MTR-25-11',ab:'A catalogue of the drift patterns we saw over eighteen months, and the monitors that caught them.'},
 {y:2025,t:'WORKSHOP',ti:'Delegation Graphs for Planner-Worker Agent Systems',au:[0,3],p:2,v:'Workshop paper',ab:'Representing delegation as a graph makes agent failures easier to trace, replay and fix.'},
 {y:2025,t:'DATASET',ti:'NoisyCommands: Short Speech Commands Recorded Beside Machinery',au:[2,1],p:4,v:'Open dataset, 12,000 clips',ab:'Short spoken commands recorded at 70 to 95 dB beside running equipment, with transcripts and noise labels.'},
 {y:2025,t:'PAPER',ti:'Energy per Decision: Measuring Embedded Inference End to End',au:[2,3,0],p:1,v:'Journal',ab:'Measuring only the model hides most of the energy. Sensing, wake-up and radio dominate in our deployments.'}
];
var TYPES=['PAPER','PREPRINT','WORKSHOP','REPORT','DATASET'];
var STD=[['Pre-registered evaluation','We write the test, the metric and the pass mark before running the experiment.','ALWAYS'],
 ['Seeds and variance','Every number is the mean of at least five runs and carries its spread.','ALWAYS'],
 ['Ablations','We remove each component in turn to show which ones actually matter.','ALWAYS'],
 ['Negative results','Failed approaches are written up and kept, so nobody repeats them.','ALWAYS'],
 ['Open code and data','Harness, weights and data are released unless a customer or the law prevents it.','WHEN LEGAL'],
 ['Independent replication','A second engineer reproduces the result from scratch before it ships.','ALWAYS']];
var REL=[['minibyte-bench','LIBRARY','Evaluation harness for compressed and embedded models, with seeds, spreads and shift tests built in.','pip install minibyte-bench','0.4.1','Placeholder licence','Python 3.10+'],
 ['tinydistill','LIBRARY','Distillation recipes for microcontroller-class models, with quantisation in the loop.','pip install tinydistill','0.2.0','Placeholder licence','Python 3.10+'],
 ['YardNav','DATASET','Multi-sensor logs from GPS-denied industrial yards: lidar, camera and inertial, 38 hours.','minibyte-data pull yardnav','1.0','Placeholder licence','41 GB'],
 ['NoisyCommands','DATASET','Short speech commands recorded beside machinery, with transcripts and noise labels.','minibyte-data pull noisycommands','1.1','Placeholder licence','2.3 GB']];
var abbr=function(i){var n=TEAM[i].split(' ');return n[0][0]+'. '+n[1].toUpperCase()};
var authors=function(a){return a.map(function(i){return TEAM[i]}).join(', ')};

/* hero: rotating open question + marquee */
safe(function hero(){
  var T=$('#qT'),bar=$('#qBar'),no=$('#qNo'),st=$('#qSt'),lk=$('#qLink'),d=$('#qD'),i=0,N=PROG.length;
  d.innerHTML=PROG.map(function(p,k){return '<button type="button" role="tab" aria-selected="false" aria-label="Question '+(k+1)+'" data-k="'+k+'"><i></i></button>'}).join('');
  function show(k,first){
    i=(k+N)%N;var p=PROG[i];
    T.textContent=p.q;no.textContent=pad2(i+1);st.textContent=p.st;lk.href='#p-0'+(i+1);
    $$('button',d).forEach(function(b){b.setAttribute('aria-selected',+b.dataset.k===i?'true':'false')});
    if(!first&&!RM){T.classList.remove('sw');void T.offsetWidth;T.classList.add('sw')}
    bar.classList.remove('run');void bar.offsetWidth;if(!RM)bar.classList.add('run');
  }
  bar.addEventListener('animationend',function(){show(i+1)});
  d.addEventListener('click',function(e){var b=e.target.closest('button');if(b)show(+b.dataset.k)});
  show(0,true);
  var row=PUBS.slice(0,6).map(function(p){return '<span><b>'+p.y+'</b>'+p.t+' / '+esc(p.ti)+'</span>'}).join('');
  $('#marq').innerHTML=row+row.replace(/<span>/g,'<span aria-hidden="true">');
},'hero');

/* programmes */
var pgList=$('#pgList');
safe(function programmes(){
  pgList.innerHTML=PROG.map(function(p,i){var n=pad2(i+1),seg='';
    for(var k=1;k<=5;k++)seg+='<i class="'+(k<p.stage?'on':k===p.stage?'cu':'')+'"></i>';
    var pubs=PUBS.filter(function(x){return x.p===i});
    return '<article class="rs-pr" id="p-'+n+'" data-i="'+i+'">'+
     '<button type="button" class="rs-ph" id="ph-'+n+'" aria-expanded="false" aria-controls="pb-'+n+'">'+
       '<span class="n mono">P-'+n+'</span><span><h3>'+esc(p.t)+'</h3><span class="q">'+esc(p.q)+'</span></span>'+
       '<span class="rs-st"><span class="row mono"><b>'+p.st+'</b><span>SINCE '+p.since+'</span></span><span class="rs-seg" role="img" aria-label="Stage '+p.stage+' of 5: '+STAGES[p.stage-1]+'">'+seg+'</span><span class="mono mut" style="font-size:.6875rem">STAGE '+p.stage+' / '+STAGES[p.stage-1]+'</span></span>'+
       '<span class="rs-pm" aria-hidden="true"></span></button>'+
     '<div class="rs-pb" id="pb-'+n+'" role="region" aria-labelledby="ph-'+n+'" inert><div><div class="rs-pbi">'+
       '<div class="rs-pc"><div><h4 class="mono">WHY IT MATTERS</h4><p>'+esc(p.why)+'</p></div>'+
       '<div><h4 class="mono">HOW WE STUDY IT</h4><ul>'+p.me.map(function(m){return '<li>'+esc(m)+'</li>'}).join('')+'</ul></div>'+
       '<div><h4 class="mono">WHAT WE HAVE FOUND</h4><div class="rs-fd">'+p.fd.map(function(f){return '<div><b>'+esc(f[0])+'</b><span>'+esc(f[1])+'</span></div>'}).join('')+'</div></div></div>'+
       '<div class="rs-pf mono"><span>LEAD <b>'+esc(TEAM[p.lead])+'</b></span><span>TEAM <b>'+p.team+'</b></span>'+
        '<a href="#publications" data-pf="'+i+'">'+pubs.length+' PUBLICATIONS →</a>'+
        p.caps.map(function(c){return '<a href="/capabilities#c-0'+c+'">'+esc(CAPN[c-1]).toUpperCase()+' →</a>'}).join('')+
        p.work.slice(0,2).map(function(w){return '<a href="/work#p-'+w+'">CASE '+w+' / '+esc(WORKS[w]).toUpperCase()+' →</a>'}).join('')+
       '</div></div></div></div></article>'}).join('');
  pgList.addEventListener('click',function(e){
    var pf=e.target.closest('[data-pf]');if(pf){setProgFilter(+pf.dataset.pf);return}
    var h=e.target.closest('.rs-ph');if(!h)return;toggleProg(+h.parentNode.dataset.i)});
},'programmes');
function toggleProg(i,force){
  $$('.rs-pr',pgList).forEach(function(r,k){
    var on=k===i?(force===undefined?!r.classList.contains('open'):force):false;
    r.classList.toggle('open',on);$('.rs-ph',r).setAttribute('aria-expanded',on?'true':'false');
    var b=$('.rs-pb',r);if(on)b.removeAttribute('inert');else b.setAttribute('inert','');
  });
}
function openProgFromHash(first){
  var m=/^#p-0([1-6])$/.exec(location.hash||'');if(!m)return false;
  toggleProg(+m[1]-1,true);
  setTimeout(function(){var t=document.getElementById('p-0'+m[1]);if(t)scrollTo(0,t.getBoundingClientRect().top+scrollY-90)},first?500:50);
  return true;
}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#p-0"]');if(a){var m=/#p-0([1-6])$/.exec(a.getAttribute('href'));if(m)toggleProg(+m[1]-1,true)}});

/* publications */
var fType='ALL',fProg=-1,fQ='';
safe(function publications(){
  var list=$('#pbList');
  list.innerHTML=PUBS.map(function(p,i){
    var key='minibyte'+p.y+String.fromCharCode(97+i%26);
    return '<div class="rs-row" data-i="'+i+'">'+
     '<button type="button" class="rs-rh" aria-expanded="false" aria-controls="rb-'+i+'" id="rh-'+i+'"><span class="y mono">'+p.y+'</span><span class="rs-ty mono">'+p.t+'</span>'+
       '<span class="rs-rtx"><span class="rs-rt">'+esc(p.ti)+'</span><span class="rs-ra mono">'+p.au.map(abbr).join(' / ')+'</span></span><span class="pp mono">P-0'+(p.p+1)+'</span><span class="rs-pm" aria-hidden="true"></span></button>'+
     '<div class="rs-rb" id="rb-'+i+'" role="region" aria-labelledby="rh-'+i+'" inert><div><div class="rs-rbi"><div>'+
       '<p>'+esc(p.ab)+'</p><div class="m mono"><span>VENUE / '+esc(p.v).toUpperCase()+'</span><span>PROGRAMME / <a class="lnk" href="#p-0'+(p.p+1)+'">'+esc(PROG[p.p].t).toUpperCase()+'</a></span></div>'+
       '<div class="acts"><button type="button" class="rs-ab" data-cite="'+i+'">COPY CITATION</button><button type="button" class="rs-ab" disabled title="Placeholder">OPEN PDF (PLACEHOLDER)</button></div>'+
     '</div></div></div></div></div>'}).join('');
  list.addEventListener('click',function(e){
    var c=e.target.closest('[data-cite]');
    if(c){var p=PUBS[+c.dataset.cite],t='@article{minibyte'+p.y+String.fromCharCode(97+(+c.dataset.cite)%26)+',\n  title  = {'+p.ti+'},\n  author = {'+p.au.map(function(a){var n=TEAM[a].split(' ');return n[1]+', '+n[0]}).join(' and ')+'},\n  year   = {'+p.y+'},\n  note   = {Minibyte AI Research Lab, placeholder entry}\n}';
      var b=c,ok=function(){b.textContent='COPIED';setTimeout(function(){b.textContent='COPY CITATION'},1600)};
      try{navigator.clipboard.writeText(t).then(ok,function(){})}catch(x){}return}
    var h=e.target.closest('.rs-rh');if(!h)return;var r=h.parentNode,on=!r.classList.contains('open');
    r.classList.toggle('open',on);h.setAttribute('aria-expanded',on?'true':'false');var b=$('.rs-rb',r);if(on)b.removeAttribute('inert');else b.setAttribute('inert','');
  });
  var ty=$('#pbType'),pr=$('#pbProg');
  var btn=function(a,l,pressed,n){return '<button type="button" class="rs-fb mono" data-'+a+'="'+l[0]+'" aria-pressed="'+(pressed?'true':'false')+'">'+l[1]+'<i>'+n+'</i></button>'};
  ty.insertAdjacentHTML('beforeend',btn('t',['ALL','ALL'],true,PUBS.length)+TYPES.map(function(t){return btn('t',[t,t],false,PUBS.filter(function(p){return p.t===t}).length)}).join(''));
  pr.insertAdjacentHTML('beforeend',btn('p',['-1','ALL'],true,PUBS.length)+PROG.map(function(p,i){return btn('p',[i,'P-0'+(i+1)],false,PUBS.filter(function(x){return x.p===i}).length)}).join(''));
  ty.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;fType=b.dataset.t;apply()});
  pr.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;fProg=+b.dataset.p;apply()});
  $('#pbQ').addEventListener('input',function(){fQ=this.value.trim().toLowerCase();apply()});
  apply();
},'publications');
function apply(){
  var n=0;
  $$('#pbType button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===fType?'true':'false')});
  $$('#pbProg button').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.p===fProg?'true':'false')});
  $$('#pbList .rs-row').forEach(function(r){var p=PUBS[+r.dataset.i];
    var hay=(p.ti+' '+authors(p.au)+' '+p.ab+' '+PROG[p.p].t).toLowerCase();
    var on=(fType==='ALL'||p.t===fType)&&(fProg<0||p.p===fProg)&&(!fQ||hay.indexOf(fQ)>-1);
    r.classList.toggle('dim',!on);if(on)n++});
  $('#pbCnt').textContent='SHOWING '+pad2(n)+' / '+pad2(PUBS.length);
  $('#pbNone').hidden=n>0;
}
function setProgFilter(i){fProg=i;fType='ALL';var q=$('#pbQ');q.value='';fQ='';apply();goTo('#publications')}

/* study */
safe(function study(){
  var S=['The question','Method','Results','Limits','What happens next'];
  $('#stToc').innerHTML=S.map(function(s,i){return '<li><a href="#s'+(i+1)+'" data-s="s'+(i+1)+'"><span>0'+(i+1)+'</span><span>'+s+'</span></a></li>'}).join('');
  var a=[92,88,79,64,46],b=[92,90,86,79,68],L=['100%','50%','25%','12%','6%'];
  var X0=46,W=584,Y0=20,H=250,g=W/5,h='';
  [0,25,50,75,100].forEach(function(v){var y=Y0+H-H*v/100;h+='<line class="g'+(v===0?' z':'')+'" x1="'+X0+'" x2="'+(X0+W)+'" y1="'+y+'" y2="'+y+'"/><text x="'+(X0-10)+'" y="'+(y+4)+'" text-anchor="end">'+v+'</text>'});
  L.forEach(function(l,i){var x=X0+g*i+g/2,ha=H*a[i]/100,hb=H*b[i]/100;
    h+='<rect class="bar a" x="'+(x-40)+'" y="'+(Y0+H-ha)+'" width="38" height="'+ha+'"><title>Standard recipe, '+l+' size: '+a[i]+'%</title></rect>'+
       '<rect class="bar b" x="'+(x+2)+'" y="'+(Y0+H-hb)+'" width="38" height="'+hb+'"><title>Shift-aware recipe, '+l+' size: '+b[i]+'%</title></rect>'+
       '<text class="v" x="'+(x+21)+'" y="'+(Y0+H-hb-8)+'" text-anchor="middle">'+b[i]+'</text><text x="'+(x-21)+'" y="'+(Y0+H-ha-8)+'" text-anchor="middle">'+a[i]+'</text>'+
       '<text x="'+x+'" y="'+(Y0+H+22)+'" text-anchor="middle">'+l+'</text>'});
  h+='<text x="'+(X0+W/2)+'" y="'+(Y0+H+46)+'" text-anchor="middle">MODEL SIZE, % OF ORIGINAL</text><text x="0" y="12">ACCURACY UNDER SHIFT, %</text>';
  $('#stSvg').innerHTML=h;
},'study');
var tocL=$$('#stToc a');
function tocTick(){var cur=0,p=innerHeight*.35;tocL.forEach(function(a,i){var s=document.getElementById(a.dataset.s);if(s&&s.getBoundingClientRect().top<=p)cur=i});tocL.forEach(function(a,i){a.classList.toggle('on',i===cur)})}

/* standard + releases */
safe(function lists(){
  $('#sdList').innerHTML=STD.map(function(s,i){return '<div class="rs-sr" data-rv><span class="n mono">0'+(i+1)+'</span><b>'+s[0]+'</b><p>'+s[1]+'</p><span class="tg mono'+(s[2]==='ALWAYS'?' al':'')+'">'+s[2]+'</span></div>'}).join('');
  $('#rlList').innerHTML=REL.map(function(r,i){return '<article class="rs-rc" data-rv><div class="t mono"><span>R-0'+(i+1)+'</span><span>'+r[1]+'</span></div><h3>'+r[0]+'</h3><p>'+r[2]+'</p>'+
    '<dl class="mono"><div><dt>VERSION</dt><dd>'+r[4]+'</dd></div><div><dt>LICENCE</dt><dd>'+r[5]+'</dd></div><div><dt>SIZE</dt><dd>'+r[6]+'</dd></div></dl>'+
    '<div class="rs-cmd"><code>'+r[3]+'</code><button type="button" data-cmd="'+esc(r[3])+'">COPY</button></div></article>'}).join('');
  $('#rlList').addEventListener('click',function(e){var b=e.target.closest('[data-cmd]');if(!b)return;var ok=function(){b.textContent='COPIED';setTimeout(function(){b.textContent='COPY'},1600)};try{navigator.clipboard.writeText(b.dataset.cmd).then(ok,function(){})}catch(x){}});
},'lists');

/* progress + ready */
var progEl=$('#prog');
function pTick(){var d=document.documentElement.scrollHeight-innerHeight;progEl.style.transform='scaleX('+(d>0?Math.min(1,scrollY/d):0)+')'}
addEventListener('scroll',function(){pTick();tocTick()},{passive:true});pTick();tocTick();
if(!openProgFromHash(true))toggleProg(0,true);
addEventListener('hashchange',function(){openProgFromHash(false)});
setTimeout(function(){html.classList.add('ready')},RM?0:650);
onScroll();


}
