// @ts-nocheck
/* Ported 1:1 from the original index.html <script>. Runs once on the client (see components/HomeScript.tsx).
   gsap / three come from npm instead of CDN <script> tags, same versions (gsap 3.12.5, three r128). */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import * as THREE from 'three';

export default function initHome(): void {
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const w: any = window; w.gsap = gsap; w.ScrollTrigger = ScrollTrigger; w.ScrollToPlugin = ScrollToPlugin; w.THREE = THREE;
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

/* ---------- shared render loop (only visible items run) ---------- */
var items=[],running=false,last=0;
function kick(){if(running||document.hidden||!items.some(function(i){return i.vis}))return;running=true;last=performance.now();requestAnimationFrame(frame)}
function frame(now){
  var dt=Math.min(.05,(now-last)/1000);last=now;var any=false;
  for(var k=0;k<items.length;k++){var it=items[k];if(it.vis){any=true;try{it.fn(dt)}catch(e){console.error(e);it.vis=false}}}
  if(any&&!document.hidden)requestAnimationFrame(frame);else running=false;
}
document.addEventListener('visibilitychange',kick);
function addLoop(el,fn){var it={el:el,fn:fn,vis:false};items.push(it);new IntersectionObserver(function(es){it.vis=es[0].isIntersecting;kick()},{rootMargin:'120px'}).observe(el);return it}
function fit(c,maxD){var r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,maxD||2),w=Math.max(1,Math.round(r.width)),h=Math.max(1,Math.round(r.height));
  if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d)}return{w:w,h:h,d:d}}
var T=0; // global animation clock, frozen with reduced motion
function clock(){return T}
addLoop(document.body,function(dt){if(!RM)T+=dt});

/* ---------- header, nav, anchors ---------- */
var hdr=$('#hdr');
var secs=$$('section[id],.ps');
function onScroll(){
  var y=scrollY;hdr.classList.toggle('scrolled',y>40);
  var probe=44,theme='ink',cur='';
  for(var i=0;i<secs.length;i++){var r=secs[i].getBoundingClientRect();if(r.top<=probe&&r.bottom>probe){theme=secs[i].classList.contains('paper')?'paper':'ink';if(secs[i].id)cur=secs[i].id}}
  hdr.classList.toggle('on-paper',theme==='paper');
  var map={work:'work',case:'work',capabilities:'capabilities',research:'research',about:'about',numbers:'about',contact:'contact'};
  var k=map[cur]||'';$$('.nav a').forEach(function(a){a.classList.toggle('on',a.dataset.sec===k)});
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

/* ---------- image painter (placeholder photography, drawn procedurally) ---------- */
function mb32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var NOISE=(function(){var c=document.createElement('canvas');c.width=c.height=160;var x=c.getContext('2d'),d=x.createImageData(160,160);for(var i=0;i<d.data.length;i+=4){var v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}x.putImageData(d,0,0);return c})();
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function metal(x,x0,y0,x1,y1){var g=x.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#16181c');g.addColorStop(.32,'#8e939a');g.addColorStop(.5,'#e4e6e7');g.addColorStop(.7,'#454a51');g.addColorStop(1,'#101215');return g}
function limb(x,ax,ay,bx,by,wd){var a=Math.atan2(by-ay,bx-ax),l=Math.hypot(bx-ax,by-ay);x.save();x.translate(ax,ay);x.rotate(a);x.fillStyle=metal(x,0,-wd/2,0,wd/2);rr(x,-wd*.25,-wd/2,l+wd*.5,wd,wd*.35);x.fill();x.restore()}
function joint(x,cx,cy,r){var g=x.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);g.addColorStop(0,'#f1f2f2');g.addColorStop(.5,'#666b72');g.addColorStop(1,'#121417');x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.fill()}
var S={
  arm:function(x,W,H){
    x.fillStyle='rgba(243,244,241,.05)';x.fillRect(0,H*.88,W,H*.12);
    var bx=W*.3,by=H*.88;x.fillStyle=metal(x,bx-W*.1,0,bx+W*.1,0);rr(x,bx-W*.09,by-H*.08,W*.18,H*.1,6);x.fill();
    var j1=[bx+W*.02,H*.52],j2=[W*.6,H*.28],j3=[W*.78,H*.5];
    limb(x,bx,by-H*.04,j1[0],j1[1],W*.075);limb(x,j1[0],j1[1],j2[0],j2[1],W*.06);limb(x,j2[0],j2[1],j3[0],j3[1],W*.04);
    joint(x,bx,by-H*.04,W*.045);joint(x,j1[0],j1[1],W*.04);joint(x,j2[0],j2[1],W*.032);joint(x,j3[0],j3[1],W*.022);
    x.strokeStyle='#cfd2d4';x.lineWidth=W*.006;x.lineCap='round';x.beginPath();x.moveTo(j3[0],j3[1]);x.lineTo(j3[0]-W*.03,j3[1]+H*.1);x.moveTo(j3[0],j3[1]);x.lineTo(j3[0]+W*.03,j3[1]+H*.1);x.stroke();
  },
  lens:function(x,W,H){
    var cx=W*.5,cy=H*.5,R=H*.42;
    for(var i=0;i<7;i++){var r=R*(1-i*.12),g=x.createRadialGradient(cx-r*.25,cy-r*.3,r*.1,cx,cy,r);g.addColorStop(0,i%2?'#3b3f46':'#aeb2b8');g.addColorStop(1,i%2?'#0d0e10':'#1b1d21');x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.fill()}
    var g2=x.createRadialGradient(cx-R*.2,cy-R*.25,0,cx,cy,R*.4);g2.addColorStop(0,'rgba(243,244,241,.45)');g2.addColorStop(.4,'rgba(60,70,120,.35)');g2.addColorStop(1,'rgba(0,0,0,.95)');x.fillStyle=g2;x.beginPath();x.arc(cx,cy,R*.4,0,7);x.fill();
    x.fillStyle='rgba(243,244,241,.85)';x.beginPath();x.ellipse(cx-R*.16,cy-R*.18,R*.07,R*.035,-.7,0,7);x.fill();
    x.strokeStyle='rgba(243,244,241,.25)';x.lineWidth=1;for(var k=0;k<6;k++){x.beginPath();x.arc(cx,cy,R*(.46+k*.09),k,k+1.1);x.stroke()}
  },
  board:function(x,W,H,R){
    x.save();x.translate(W*.5,H*.52);x.rotate(-.1);var bw=W*.74,bh=H*.62;
    var g=x.createLinearGradient(-bw/2,-bh/2,bw/2,bh/2);g.addColorStop(0,'#23262c');g.addColorStop(1,'#0a0b0d');x.fillStyle=g;rr(x,-bw/2,-bh/2,bw,bh,8);x.fill();x.strokeStyle='rgba(243,244,241,.28)';x.lineWidth=1.2;
    for(var i=0;i<46;i++){var px=(R()-.5)*bw*.9,py=(R()-.5)*bh*.9;x.beginPath();x.moveTo(px,py);var d=R()>.5;x.lineTo(px+(d?(R()-.5)*bw*.3:0),py+(d?0:(R()-.5)*bh*.3));x.stroke();x.fillStyle='rgba(243,244,241,.5)';x.beginPath();x.arc(px,py,2,0,7);x.fill()}
    var cs=Math.min(bw,bh)*.34;x.fillStyle=metal(x,-cs,-cs,cs,cs);rr(x,-cs/2,-cs/2,cs,cs,4);x.fill();x.fillStyle='#0b0c0e';rr(x,-cs/2+8,-cs/2+8,cs-16,cs-16,3);x.fill();
    x.fillStyle='rgba(243,244,241,.7)';for(var p=0;p<12;p++){var o=-cs/2+8+p*(cs-16)/11;x.fillRect(o-1,-cs/2-9,2,9);x.fillRect(o-1,cs/2,2,9);x.fillRect(-cs/2-9,o-1,9,2);x.fillRect(cs/2,o-1,9,2)}
    x.fillStyle='rgba(243,244,241,.55)';x.font='500 '+Math.round(cs*.1)+'px monospace';x.fillText('MB-01',-cs*.3,cs*.04);
    x.restore();
  },
  drone:function(x,W,H){
    var cx=W*.5,cy=H*.5;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(d){var ex=cx+d[0]*W*.28,ey=cy+d[1]*H*.2;limb(x,cx,cy,ex,ey,W*.022);var g=x.createRadialGradient(ex,ey,0,ex,ey,W*.15);g.addColorStop(0,'rgba(243,244,241,.4)');g.addColorStop(.6,'rgba(243,244,241,.12)');g.addColorStop(1,'rgba(243,244,241,0)');x.fillStyle=g;x.beginPath();x.ellipse(ex,ey-H*.02,W*.15,H*.05,0,0,7);x.fill();joint(x,ex,ey,W*.016)});
    x.fillStyle=metal(x,cx-W*.1,cy-H*.1,cx+W*.1,cy+H*.1);rr(x,cx-W*.1,cy-H*.075,W*.2,H*.15,14);x.fill();joint(x,cx,cy+H*.1,W*.038);x.fillStyle='#050607';x.beginPath();x.arc(cx,cy+H*.1,W*.016,0,7);x.fill();
  },
  sensors:function(x,W,H){
    for(var j=0;j<5;j++)for(var i=0;i<8;i++){var cx=W*(.1+i*.11)+(j%2)*W*.05,cy=H*(.18+j*.17),r=W*(.03+j*.004),g=x.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);g.addColorStop(0,'#cfd2d4');g.addColorStop(.35,'#4a4e55');g.addColorStop(1,'#0b0c0e');x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.strokeStyle='rgba(243,244,241,.2)';x.beginPath();x.arc(cx,cy,r*1.4,0,7);x.stroke()}
  },
  wave:function(x,W,H,R){
    var n=Math.floor(W/14);for(var i=0;i<n;i++){var e=Math.sin(i/n*Math.PI),h=H*(.06+.5*e*(.25+.75*R()));var g=x.createLinearGradient(0,H/2-h,0,H/2+h);g.addColorStop(0,'rgba(243,244,241,.15)');g.addColorStop(.5,'rgba(243,244,241,.95)');g.addColorStop(1,'rgba(243,244,241,.15)');x.fillStyle=g;x.fillRect(i*14+W*.02,H/2-h,6,h*2)}
  },
  lab:function(x,W,H){
    var vx=W*.5,vy=H*.42;x.strokeStyle='rgba(243,244,241,.2)';x.lineWidth=1;
    for(var i=-12;i<=12;i++){x.beginPath();x.moveTo(vx,vy);x.lineTo(vx+i*W*.12,H);x.stroke()}
    for(var k=1;k<10;k++){var y=vy+(H-vy)*Math.pow(k/10,2);x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()}
    for(var b=0;b<3;b++){var bx=W*(.18+b*.3),g=x.createLinearGradient(bx,0,bx+W*.1,H*.8);g.addColorStop(0,'rgba(243,244,241,.4)');g.addColorStop(1,'rgba(243,244,241,0)');x.fillStyle=g;x.beginPath();x.moveTo(bx,0);x.lineTo(bx+W*.07,0);x.lineTo(bx+W*.16,H*.85);x.lineTo(bx-W*.06,H*.85);x.fill()}
    [[.2,.6,.12,.22],[.62,.52,.16,.3],[.82,.64,.1,.18]].forEach(function(m){x.fillStyle=metal(x,W*m[0],0,W*(m[0]+m[2]),0);x.fillRect(W*m[0],H*m[1],W*m[2],H*m[3])});
  },
  object3d:function(x,W,H){
    var cx=W*.5,cy=H*.5,R=H*.36;x.lineWidth=1;
    for(var m=0;m<14;m++){var a=m/14*Math.PI;x.strokeStyle='rgba(243,244,241,'+(.12+.3*Math.abs(Math.cos(a)))+')';x.beginPath();x.ellipse(cx,cy,R*Math.abs(Math.cos(a)),R,.35,0,7);x.stroke()}
    for(var p=-4;p<=4;p++){var y=p/5*R,rx=Math.sqrt(R*R-y*y);x.strokeStyle='rgba(243,244,241,.2)';x.beginPath();x.ellipse(cx,cy+y*.9,rx,rx*.28,.35,0,7);x.stroke()}
    for(var d=0;d<60;d++){var th=d*2.4,ph=Math.acos(1-2*((d+.5)/60)),px=cx+R*Math.sin(ph)*Math.cos(th)*.98,py=cy+R*Math.cos(ph);x.fillStyle='rgba(243,244,241,'+(.4+.5*Math.sin(ph)*Math.sin(th))+')';x.beginPath();x.arc(px,py,2.2,0,7);x.fill()}
  },
  vehicle:function(x,W,H){
    var vx=W*.5,vy=H*.46;x.strokeStyle='rgba(243,244,241,.14)';for(var i=-8;i<=8;i++){x.beginPath();x.moveTo(vx,vy);x.lineTo(vx+i*W*.2,H);x.stroke()}
    var bx=W*.22,by=H*.62,bw=W*.56,bh=H*.2;x.fillStyle=metal(x,bx,by,bx+bw,by+bh);x.beginPath();x.moveTo(bx,by+bh);x.lineTo(bx+bw*.06,by+bh*.25);x.lineTo(bx+bw*.3,by-bh*.45);x.lineTo(bx+bw*.72,by-bh*.45);x.lineTo(bx+bw*.95,by+bh*.2);x.lineTo(bx+bw,by+bh);x.closePath();x.fill();
    x.fillStyle='rgba(8,9,11,.85)';x.beginPath();x.moveTo(bx+bw*.34,by-bh*.34);x.lineTo(bx+bw*.68,by-bh*.34);x.lineTo(bx+bw*.82,by+bh*.12);x.lineTo(bx+bw*.14,by+bh*.12);x.closePath();x.fill();
    [.22,.78].forEach(function(f){joint(x,bx+bw*f,by+bh,bh*.55)});
    var lx=bx+bw*.5,ly=by-bh*.58;x.fillStyle='#d8dadb';x.fillRect(lx-W*.02,ly-H*.025,W*.04,H*.03);
    x.strokeStyle='rgba(243,244,241,.4)';for(var r=1;r<6;r++){x.beginPath();x.arc(lx,ly,r*W*.1,Math.PI*1.05,Math.PI*1.95);x.stroke()}
  },
  portrait:function(x,W,H,R){
    var cx=W*(.46+R()*.08),hv=Math.floor(R()*3),g;
    if(hv===1){x.fillStyle='#0b0c0e';x.beginPath();x.ellipse(cx,H*.46,W*.2,H*.28,0,0,7);x.fill()}
    g=x.createLinearGradient(0,H*.66,0,H);g.addColorStop(0,'#30343b');g.addColorStop(1,'#0a0b0d');x.fillStyle=g;x.beginPath();x.ellipse(cx,H*1.04,W*.52,H*.36,0,Math.PI,0);x.fill();
    x.fillStyle='#3a3e45';rr(x,cx-W*.065,H*.5,W*.13,H*.2,W*.04);x.fill();
    g=x.createRadialGradient(cx-W*.06,H*.34,W*.02,cx,H*.38,W*.2);g.addColorStop(0,'#d4d6d8');g.addColorStop(.55,'#70757c');g.addColorStop(1,'#16181b');x.fillStyle=g;x.beginPath();x.ellipse(cx,H*.4,W*.14,H*.16,0,0,7);x.fill();
    x.fillStyle='#0b0c0e';x.beginPath();
    if(hv===0){x.ellipse(cx,H*.3,W*.15,H*.11,0,Math.PI,0);x.fill()}
    else if(hv===1){x.ellipse(cx,H*.29,W*.16,H*.12,0,Math.PI,0);x.fill()}
    else{x.ellipse(cx,H*.285,W*.15,H*.09,0,Math.PI,0);x.fill();x.beginPath();x.arc(cx,H*.15,W*.07,0,7);x.fill()}
    g=x.createLinearGradient(W*.1,0,W*.9,0);g.addColorStop(0,'rgba(243,244,241,.28)');g.addColorStop(.5,'rgba(243,244,241,0)');g.addColorStop(1,'rgba(0,0,0,.5)');x.fillStyle=g;x.fillRect(0,0,W,H);
  }
};
function paint(kind,W,H,seed,tint){
  var c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d'),R=mb32(seed*977+13),g;
  g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#14171c');g.addColorStop(1,'#050607');x.fillStyle=g;x.fillRect(0,0,W,H);
  var lx=W*(.2+R()*.6);g=x.createRadialGradient(lx,H*.12,0,lx,H*.12,H*.95);g.addColorStop(0,'rgba(243,244,241,.3)');g.addColorStop(1,'rgba(243,244,241,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  (S[kind]||S.object3d)(x,W,H,R);
  g=x.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,H*.95);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.72)');x.fillStyle=g;x.fillRect(0,0,W,H);
  if(tint){x.globalCompositeOperation='screen';x.fillStyle='rgba(40,52,205,'+(.34*tint)+')';x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over'}
  x.globalAlpha=.13;x.globalCompositeOperation='overlay';x.fillStyle=x.createPattern(NOISE,'repeat');x.fillRect(0,0,W,H);x.globalAlpha=1;x.globalCompositeOperation='source-over';
  return c.toDataURL('image/jpeg',.82);
}
var imgCache={};
function imgSrc(kind,w,h,seed,tint){var k=[kind,w,h,seed,tint].join('|');return imgCache[k]||(imgCache[k]=paint(kind,w,h,seed,tint))}
var imgIO=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var im=e.target;imgIO.unobserve(im);
  var go=function(){im.src=imgSrc(im.dataset.kind,+im.dataset.w,+im.dataset.h,+im.dataset.seed,+im.dataset.tint||0)};
  (window.requestIdleCallback||function(f){setTimeout(f,16)})(go,{timeout:400})})},{rootMargin:'900px 0px'});
function lazyImgs(root){$$('img[data-kind]',root).forEach(function(i){imgIO.observe(i)})}

/* ---------- content built from data ---------- */
var CAPS=[
 ['ARTIFICIAL INTELLIGENCE','Research and development of intelligent systems, machine learning models and applied AI.','LEARNING SYSTEMS','AI'],
 ['ROBOTICS','Intelligent robotic systems for autonomous operation, perception and real-world environments.','PHYSICAL AUTONOMY','ROBOTICS'],
 ['COMPUTER VISION','Systems that understand environments, objects, movement and visual information.','PERCEPTION','VISION'],
 ['EMBEDDED INTELLIGENCE','AI that runs closer to the hardware — optimized for constrained and real-world devices.','ON-DEVICE','EMBEDDED'],
 ['AUTOMATION','AI-powered automation for complex business and operational workflows.','OPERATIONS','AUTOMATION'],
 ['MULTI-AGENT SYSTEMS','Coordinated AI agents designed to reason, execute and collaborate across complex workflows.','COORDINATION','AGENTS'],
 ['VOICE & CONVERSATIONAL AI','Intelligent voice systems and conversational interfaces for human-machine interaction.','INTERFACE','VOICE'],
 ['INTELLIGENT INFRASTRUCTURE','Sensor fusion, edge intelligence and systems designed for critical environments.','CRITICAL SYSTEMS','INFRA']
];
var PH=['RESEARCH','BUILD','DEPLOY'];
var SERVICES=[
 ['AI RESEARCH & DEVELOPMENT','Applied research, experimentation and model development.','object3d',[0,1]],
 ['CUSTOM AI SYSTEMS','Purpose-built models and pipelines shaped around your data and constraints.','lab',[1,2]],
 ['COMPUTER VISION','Detection, tracking and scene understanding for cameras, drones and sensors.','lens',[0,2]],
 ['ROBOTICS & AUTONOMY','Perception, planning and control for machines that work in real environments.','arm',[0,2]],
 ['EDGE AI','Compact models tuned to run on-device, offline and in real time.','board',[1,2]],
 ['MULTI-AGENT ORCHESTRATION','Specialised agents that plan, hand off and verify work together.','sensors',[0,1]],
 ['VOICE AI','Speech and conversational interfaces that hold up outside the lab.','wave',[1,2]],
 ['BUSINESS PROCESS AUTOMATION','Intelligent workflows that take on repetitive operational work.','lab',[1,2]],
 ['DATA & INTELLIGENCE SYSTEMS','Pipelines, evaluation and monitoring that keep models honest over time.','sensors',[1,2]],
 ['PROTOTYPING & VALIDATION','Fast hardware and software prototypes, tested against measurable criteria.','drone',[0,1]]
];
var RES=[
 ['01','ON-DEVICE AI','Small models designed to operate locally without depending entirely on cloud infrastructure.','2026.02','ONGOING','COMPRESSION / EVALUATION',[8,7.2,6.6,5.2,4.9,3.6,3.1,2.4]],
 ['02','EMBEDDED INTELLIGENCE','Bringing intelligence closer to machines, sensors and devices.','2026.04','PROTOTYPING','FIRMWARE / SENSORS',[2,2.8,3.1,4.4,4.2,5.6,6.1,7.3]],
 ['03','MULTI-AGENT SYSTEMS','Exploring how specialized AI agents can coordinate complex tasks.','2026.06','ONGOING','PLANNING / DELEGATION',[3,4.5,3.8,5.6,5.2,6.8,6.4,7.8]],
 ['04','PERCEPTION','Computer vision and sensor intelligence for real-world environments.','2026.09','IN REVIEW','VISION / SENSOR FUSION',[6.5,5.1,5.6,4,3.7,3.9,2.6,2.2]]
];
var TEAM=[
 ['Lena Brandt','Research Lead','Small models and evaluation','t1','/team/team-1.jpg'],
 ['Amara Okoye','Research Engineer','Perception and sensor fusion','t2','/team/team-2.jpg'],
 ['Mateo Sato','AI Engineer','On-device inference','t3','/team/team-3.jpg'],
 ['Jonas Weber','Systems / Operations','Deployment and reliability','t4','/team/team-4.jpg']
];


function bitsRow(on){return BITS.map(function(b,i){return '<i class="'+(b?'':'z')+(i===on?' on':'')+'"></i>'}).join('')}



safe(function build(){
  $('#svcList').innerHTML=SERVICES.map(function(s,i){var n=String(i+1).padStart(2,'0'),a=s[3][0],b=s[3][1];
    return '<li class="row" tabindex="0" data-k="'+i+'" data-rv style="--i:'+(i%3)+'"><span class="no">'+n+'</span><div><h3>'+s[0].replace(/&/g,'&amp;')+'</h3><div class="d"><div><p>'+s[1]+'</p></div></div></div>'+
    '<span class="lc" role="img" aria-label="Works from '+PH[a].toLowerCase()+' to '+PH[b].toLowerCase()+'">'+[0,1,2].map(function(p){return '<i class="s'+(p>=a&&p<=b?' on':'')+'"></i>'}).join('')+'</span></li>'}).join('');
  $('#resList').innerHTML=RES.map(function(r,i){return '<article class="entry" id="r'+(i+1)+'" data-rv>'+
    '<div class="e-top mono"><span>RESEARCH '+r[0]+' / MB-R/00'+(i+1)+'</span><span>'+r[3]+'</span></div>'+
    '<h3>'+r[1]+'</h3><p class="abs">'+r[2]+'</p>'+
    '<figure class="fig"><svg viewBox="0 0 480 200" role="img" aria-label="Illustrative chart for '+r[1].toLowerCase()+'">'+chart(r[6])+'</svg><figcaption class="mono">FIG. 0'+(i+1)+' / ILLUSTRATIVE, NOT MEASURED DATA</figcaption></figure>'+
    '<dl class="meta mono"><div><dt>STATUS</dt><dd>'+r[4]+'</dd></div><div><dt>FIELD</dt><dd>'+r[5]+'</dd></div><div><dt>DATE</dt><dd>'+r[3]+'</dd></div></dl><a class="lnk mono" href="/research#p-0'+(i+1)+'" style="justify-self:start">OPEN THE PROGRAMME →</a></article>'}).join('');
  $('#toc').innerHTML=RES.map(function(r,i){return '<li><a href="#r'+(i+1)+'"><span>'+r[0]+'</span>'+r[1]+'</a></li>'}).join('');
  var tocA=$$('#toc a'),ents=$$('.entry');
  if(tocA.length)tocA[0].classList.add('on');
  var tocIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var k=ents.indexOf(e.target);tocA.forEach(function(a,j){a.classList.toggle('on',j===k)})}})},{rootMargin:'-35% 0px -55% 0px'});
  ents.forEach(function(en){tocIO.observe(en)});
  $('#teamGrid').innerHTML=TEAM.map(function(p,i){return '<figure class="person '+p[3]+'" data-rv>'+
    '<div class="ph"><img src="'+p[4]+'" width="720" height="900" alt="Portrait of '+p[0]+'" loading="lazy"></div>'+
    '<figcaption><h3>'+p[0]+'</h3><span class="role mono">'+p[1]+'</span><div class="tech mono"><div><span>ID / MB-P/0'+(i+1)+'</span><span>FOCUS / '+p[2]+'</span></div></div></figcaption></figure>'}).join('');
  $('#ldRow').innerHTML=BITS.map(function(b){return '<div class="ld-c"><span class="ld-d">'+b+'</span><i class="ld-b '+(b?'':'z')+'"></i></div>'}).join('');
  lazyImgs(document);
},'build');
function chart(a){var w=480,h=200,pl=34,pr=14,pt=14,pb=26,mx=Math.max.apply(0,a)*1.1,
  X=function(i){return pl+i*(w-pl-pr)/(a.length-1)},Y=function(v){return pt+(1-v/mx)*(h-pt-pb)},s='',i;
  for(i=0;i<=4;i++){var y=pt+i*(h-pt-pb)/4;s+='<line class="axis" x1="'+pl+'" y1="'+y+'" x2="'+(w-pr)+'" y2="'+y+'"/>'}
  for(i=0;i<a.length;i++)s+='<line class="tick" x1="'+X(i)+'" y1="'+(h-pb)+'" x2="'+X(i)+'" y2="'+(h-pb+5)+'"/>';
  var d=a.map(function(v,k){return (k?'L':'M')+X(k).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ');
  s+='<path class="area" d="'+d+' L'+X(a.length-1)+' '+(h-pb)+' L'+X(0)+' '+(h-pb)+'Z"/><path class="ln2" d="'+d+'"/>';
  a.forEach(function(v,k){s+='<circle class="'+(k===a.length-1?'pt':'dt')+'" cx="'+X(k).toFixed(1)+'" cy="'+Y(v).toFixed(1)+'" r="'+(k===a.length-1?4.2:2.2)+'"/>'});
  s+='<text class="tx" x="'+pl+'" y="'+(h-8)+'">RUN 01</text><text class="tx" text-anchor="end" x="'+(w-pr)+'" y="'+(h-8)+'">RUN 08</text>';
  return s}

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
safe(function counters(){
  var els=$$('#numbers [data-count]');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){runCount(e.target);io.unobserve(e.target)}})},{threshold:.5});
  els.forEach(function(el){if(!RM&&el.getBoundingClientRect().top>innerHeight)io.observe(el)});
},'counters');

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




/* service preview following the cursor */
safe(function services(){
  if(!FINE||!HAS_G)return;
  var pv=$('#svcPv'),im=$('#svcImg'),qx=gsap.quickTo(pv,'x',{duration:.7,ease:'power3.out'}),qy=gsap.quickTo(pv,'y',{duration:.7,ease:'power3.out'}),cur=-1;
  var list=$('#svcList');
  $$('.row',list).forEach(function(r){var k=+r.dataset.k;
    r.addEventListener('pointerenter',function(e){if(k!==cur){cur=k;im.src=imgSrc(SERVICES[k][2],340,425,60+k,k%3===0?.6:0)}pv.classList.add('show')});
    r.addEventListener('focus',function(){var b=r.getBoundingClientRect();im.src=imgSrc(SERVICES[k][2],340,425,60+k,0);qx(innerWidth-b.width*.1-360);qy(b.top);pv.classList.add('show')});
    r.addEventListener('blur',function(){pv.classList.remove('show')})});
  list.addEventListener('pointermove',function(e){qx(e.clientX+28);qy(e.clientY-150)});
  list.addEventListener('pointerleave',function(){pv.classList.remove('show')});
},'services');

/* ---------- 2D visuals ---------- */
function pathPt(pts,u){var L=[],tot=0,i;for(i=0;i<pts.length-1;i++){var l=Math.hypot(pts[i+1][0]-pts[i][0],pts[i+1][1]-pts[i][1]);L.push(l);tot+=l}
  var d=((u%1)+1)%1*tot;for(i=0;i<L.length;i++){if(d<=L[i]){var f=d/L[i];return [lerp(pts[i][0],pts[i+1][0],f),lerp(pts[i][1],pts[i+1][1],f)]}d-=L[i]}return pts[pts.length-1]}
function dotc(c,x,y,r,col){c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,7);c.fill()}
var byteApi={st:null,set:null};
var V=[
 function ai(c,w,h,t,k){var L=[3,5,5,3],pts=L.map(function(n,i){return Array.apply(0,Array(n)).map(function(_,j){return[w*(.14+i*.24),h*(.5+(j-(n-1)/2)*.15)]})});
   c.lineWidth=1;c.strokeStyle='rgba('+P+',.14)';for(var i=0;i<3;i++)pts[i].forEach(function(a){pts[i+1].forEach(function(b){c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke()})});
   var s=t*(.9+k*1.6),cyc=Math.floor(s/3),stg=Math.floor(s)%3,f=s%1,path=[cyc*2%3,(cyc*3+1)%5,(cyc*5+2)%5,(cyc+1)%3];
   for(var i2=0;i2<=stg;i2++){var a=pts[i2][path[i2]],b=pts[i2+1][path[i2+1]],ff=i2<stg?1:f;c.strokeStyle='rgba('+P+',.75)';c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(lerp(a[0],b[0],ff),lerp(a[1],b[1],ff));c.stroke();if(i2===stg)dotc(c,lerp(a[0],b[0],ff),lerp(a[1],b[1],ff),4,'rgb('+BL+')')}
   pts.forEach(function(l,i){l.forEach(function(p,j){var on=path[i]===j&&i<=stg+1;dotc(c,p[0],p[1],on?4.5:3,'rgba('+P+','+(on?.95:.5)+')')})})},
 function robo(c,w,h,t,k){var bx=w*.5,by=h*.82,L1=h*.3,L2=h*.26,tx=bx+Math.cos(t*(.6+k*.5))*w*.26,ty=h*.4+Math.sin(t*(.8+k*.5))*h*.1,dx=tx-bx,dy=ty-by,d=Math.min(Math.hypot(dx,dy),L1+L2-2),a=Math.atan2(dy,dx),b=Math.acos(clamp((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1)),a1=a-b,jx=bx+Math.cos(a1)*L1,jy=by+Math.sin(a1)*L1,ex=bx+Math.cos(a)*d,ey=by+Math.sin(a)*d;
   c.strokeStyle='rgba('+P+',.25)';c.lineWidth=1;c.beginPath();c.moveTo(w*.08,by+14);c.lineTo(w*.92,by+14);c.stroke();c.setLineDash([3,5]);c.beginPath();c.ellipse(bx,h*.4,w*.26,h*.1,0,0,7);c.stroke();c.setLineDash([]);
   c.lineCap='round';c.lineWidth=9;c.strokeStyle='rgba('+P+',.88)';c.beginPath();c.moveTo(bx,by);c.lineTo(jx,jy);c.lineTo(ex,ey);c.stroke();c.lineWidth=2;c.strokeStyle='#0C0E12';c.beginPath();c.moveTo(bx,by);c.lineTo(jx,jy);c.lineTo(ex,ey);c.stroke();
   c.fillStyle='rgba('+P+',.9)';c.fillRect(bx-24,by,48,12);dotc(c,bx,by,6,'#0C0E12');dotc(c,jx,jy,6,'rgba('+P+',1)');dotc(c,ex,ey,5,'rgb('+BL+')')},
 function vision(c,w,h,t,k){var cols=22,rows=13,bx=w*(.28+.22*Math.sin(t*.5)),by=h*(.3+.14*Math.cos(t*.7)),bw=w*.26,bh=h*.34;
   for(var i=0;i<cols;i++)for(var j=0;j<rows;j++){var x=w*(.05+i*.9/(cols-1)),y=h*(.08+j*.84/(rows-1)),inb=x>bx&&x<bx+bw&&y>by&&y<by+bh;dotc(c,x,y,inb?1.8:1.1,'rgba('+P+','+(inb?.85:.22)+')')}
   var sx=((t*.25*(1+k))%1)*w;var g=c.createLinearGradient(sx-40,0,sx,0);g.addColorStop(0,'rgba('+P+',0)');g.addColorStop(1,'rgba('+P+',.2)');c.fillStyle=g;c.fillRect(sx-40,0,40,h);
   c.strokeStyle='rgba('+P+',.95)';c.lineWidth=1.5;var q=14;[[bx,by,1,1],[bx+bw,by,-1,1],[bx,by+bh,1,-1],[bx+bw,by+bh,-1,-1]].forEach(function(p){c.beginPath();c.moveTo(p[0]+p[2]*q,p[1]);c.lineTo(p[0],p[1]);c.lineTo(p[0],p[1]+p[3]*q);c.stroke()});
   c.fillStyle='rgba('+P+',.9)';c.font='500 11px "Geist Mono",monospace';c.fillText('OBJ-01  '+(.9+.07*Math.sin(t)).toFixed(2),bx,by-8);dotc(c,bx+bw+8,by-12,3,'rgb('+BL+')')},
 function emb(c,w,h,t,k){var cx=w/2,cy=h/2,s=Math.min(w,h)*.2;c.lineWidth=1.5;c.strokeStyle='rgba('+P+',.8)';c.strokeRect(cx-s,cy-s,s*2,s*2);c.strokeStyle='rgba('+P+',.3)';c.strokeRect(cx-s*.6,cy-s*.6,s*1.2,s*1.2);
   c.fillStyle='rgba('+P+',.6)';c.font='500 10px "Geist Mono",monospace';c.fillText('MB-01',cx-14,cy+4);var traces=[];
   for(var i=0;i<8;i++){var o=-s+s*2*(i+.5)/8;c.fillStyle='rgba('+P+',.7)';c.fillRect(cx+o-1,cy-s-8,2,8);c.fillRect(cx+o-1,cy+s,2,8);c.fillRect(cx-s-8,cy+o-1,8,2);c.fillRect(cx+s,cy+o-1,8,2)}
   for(var j=0;j<8;j++){var q=-s+s*2*(j+.5)/8,sg=j%2?1:-1;traces.push([[cx+q,cy-s-8],[cx+q,cy-s-s*(.5+j*.07)],[cx+q+sg*(w*.12+j*8),cy-s-s*(.5+j*.07)],[cx+q+sg*(w*.12+j*8),0]]);traces.push([[cx+s+8,cy+q],[cx+s+s*(.5+j*.07),cy+q],[cx+s+s*(.5+j*.07),cy+q+sg*(h*.1)],[w,cy+q+sg*(h*.1)]])}
   c.strokeStyle='rgba('+P+',.18)';c.lineWidth=1;traces.forEach(function(p){c.beginPath();c.moveTo(p[0][0],p[0][1]);for(var m=1;m<p.length;m++)c.lineTo(p[m][0],p[m][1]);c.stroke()});
   traces.forEach(function(p,n){var u=t*(.22+k*.4)+n*.173,pt=pathPt(p,u);dotc(c,pt[0],pt[1],n===3?3.4:2,n===3?'rgb('+BL+')':'rgba('+P+',.85)')})},
 function auto(c,w,h,t,k){var n=5,xs=[],y=h*.5,bw=Math.min(54,w*.12),bh=34;for(var i=0;i<n;i++)xs.push(w*(.12+i*.19));var u=((t*.3*(1+k))%1)*(n-1);
   c.lineWidth=1;for(var i2=0;i2<n-1;i2++){c.strokeStyle='rgba('+P+','+(u>i2?.7:.2)+')';c.beginPath();c.moveTo(xs[i2]+bw/2,y);c.lineTo(xs[i2+1]-bw/2,y);c.stroke()}
   for(var i3=0;i3<n;i3++){var on=u>=i3-.2;c.fillStyle='rgba('+P+','+(on?.1:.02)+')';c.fillRect(xs[i3]-bw/2,y-bh/2,bw,bh);c.strokeStyle='rgba('+P+','+(on?.9:.35)+')';c.strokeRect(xs[i3]-bw/2,y-bh/2,bw,bh);c.fillStyle='rgba('+P+',.6)';c.font='400 10px "Geist Mono",monospace';c.fillText('0'+(i3+1),xs[i3]-6,y+4)}
   var tx=lerp(xs[Math.floor(u)]+bw/2,xs[Math.min(n-1,Math.floor(u)+1)]-bw/2,u%1);dotc(c,Math.floor(u)>=n-1?xs[n-1]:tx,y,5,'rgb('+BL+')');
   for(var q=1;q<4;q++){var tu=u-q*.25;if(tu>0){var ii=Math.floor(tu),px=lerp(xs[ii]+bw/2,xs[ii+1]-bw/2,tu%1);c.fillStyle='rgba('+P+','+(.5-q*.12)+')';c.fillRect(px-2.5,y-2.5,5,5)}}},
 function multi(c,w,h,t,k){var cx=w/2,cy=h/2,m=Math.min(w,h),ag=[];
   for(var i=0;i<7;i++){var r=m*(.1+i*.055),a=t*(.45+i*.07)*(i%2?1:-1)*(1+k*.7)+i*1.7;ag.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r])}
   c.strokeStyle='rgba('+P+',.07)';c.lineWidth=1;for(var j=0;j<7;j++){c.beginPath();c.ellipse(cx,cy,m*(.1+j*.055)*1.5,m*(.1+j*.055),0,0,7);c.stroke()}
   for(var a1=0;a1<7;a1++){for(var b1=a1+1;b1<7;b1++){var d=Math.hypot(ag[a1][0]-ag[b1][0],ag[a1][1]-ag[b1][1]);if(d<m*.34){c.strokeStyle='rgba('+P+','+(.5*(1-d/(m*.34)))+')';c.beginPath();c.moveTo(ag[a1][0],ag[a1][1]);c.lineTo(ag[b1][0],ag[b1][1]);c.stroke()}}c.strokeStyle='rgba('+P+',.1)';c.beginPath();c.moveTo(cx,cy);c.lineTo(ag[a1][0],ag[a1][1]);c.stroke()}
   dotc(c,cx,cy,6,'rgba('+P+',.9)');ag.forEach(function(p,i){dotc(c,p[0],p[1],i===0?5:3,i===0?'rgb('+BL+')':'rgba('+P+',.85)')})},
 function voice(c,w,h,t,k){var n=Math.max(12,Math.floor(w/9)),sw=((t*.22*(1+k))%1)*w;
   for(var i=0;i<n;i++){var x=i*w/n+4,env=.35+.65*Math.pow(Math.sin(t*.7+i*.05),2),amp=(.2+.8*Math.abs(Math.sin(i*.31+t*2.1)*Math.sin(i*.07-t*.9)))*env*(1+k*.35),bh=Math.max(2,amp*h*.4),near=Math.abs(x-sw)<12;
     c.fillStyle=near?'rgb('+BL+')':'rgba('+P+','+(.35+.5*amp)+')';c.fillRect(x,h/2-bh,3,bh*2)}
   c.strokeStyle='rgba('+P+',.2)';c.beginPath();c.moveTo(0,h/2);c.lineTo(w,h/2);c.stroke()},
 function infra(c,w,h,t,k){var cx=w*.5,cy=h*.56,R=Math.min(w*.46,h*.52);c.lineWidth=1;c.strokeStyle='rgba('+P+',.2)';
   for(var r=1;r<=4;r++){c.beginPath();c.arc(cx,cy,R*r/4,0,7);c.stroke()}c.beginPath();c.moveTo(cx-R,cy);c.lineTo(cx+R,cy);c.moveTo(cx,cy-R);c.lineTo(cx,cy+R);c.stroke();
   var sw=t*(.9+k*.9);for(var i=0;i<34;i++){c.strokeStyle='rgba('+P+','+(.22*(1-i/34))+')';c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(sw-i*.025)*R,cy+Math.sin(sw-i*.025)*R);c.stroke()}
   c.strokeStyle='rgba('+P+',.8)';c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(sw)*R,cy+Math.sin(sw)*R);c.stroke();
   [[.4,.5],[1.2,.8],[2,.35],[2.7,.65],[3.5,.9],[4.1,.45],[4.7,.7],[5.3,.3],[5.9,.85]].forEach(function(p,i){var d=(((sw-p[0])%(Math.PI*2))+Math.PI*2)%(Math.PI*2),al=Math.max(.18,1-d/3.2);dotc(c,cx+Math.cos(p[0])*R*p[1],cy+Math.sin(p[0])*R*p[1],i===3?4.5:3,i===3?'rgb('+BL+')':'rgba('+P+','+al+')')})}
];
safe(function byteStage(){
  var cv=$('#byteCv'),box=$('#byte'),vis=$('#byteVis'),row=$('#byteRow'),L=$('#byteL'),cur=-1,hov=0,k=0;
  var pad=function(n){return (n<10?'0':'')+n};
  row.innerHTML=CAPS.map(function(c,i){return '<button type="button" class="bd '+(BITS[i]?'one':'zero')+(i===7?' last':'')+'" data-i="'+i+'" aria-label="Capability '+(i+1)+': '+c[3]+'"><i></i><span class="mono">'+c[3]+'</span></button>'}).join('');
  var dots=$$('.bd',row);
  function setStep(i){
    if(i===cur)return;var first=cur<0;cur=i;
    if(!first)[L,vis].forEach(function(el){el.classList.remove('in');void el.offsetWidth;el.classList.add('in')});
    $('#byteN').textContent=pad(i+1);$('#byteT').textContent=CAPS[i][0];$('#byteD').textContent=CAPS[i][1];$('#byteC').textContent='CLASS / '+CAPS[i][2];$('#byteLink').href='/capabilities#c-0'+(i+1);
    $('#capNo').textContent=pad(i+1)+' / 08';$('#byteTag').textContent='MODULE '+pad(i+1)+' / LIVE';
    $('#byteTop').textContent=i===7?'BYTE COMPLETE / 01101101 = m':'BUILDING THE BYTE';
    dots.forEach(function(b,j){b.classList.toggle('on',j===i);b.classList.toggle('past',j<i);if(j===i)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
  }
  setStep(0);byteApi.set=setStep;
  dots.forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.i,st=byteApi.st;
    if(st){var y=st.start+(i+.5)/8*(st.end-st.start);if(HAS_G&&!RM)gsap.to(window,{duration:1,scrollTo:y,ease:'power2.inOut'});else scrollTo(0,y)}
    else setStep(i)})});
  vis.addEventListener('pointerenter',function(){hov=1});vis.addEventListener('pointerleave',function(){hov=0});
  addLoop(box,function(dt){var s=fit(cv,1.75),c=cv.getContext('2d');c.setTransform(s.d,0,0,s.d,0,0);c.clearRect(0,0,s.w,s.h);k+=(hov-k)*Math.min(1,dt*5);V[cur](c,s.w,s.h,T,k)});
},'byteStage');


/* 8x8 grid that resolves into the logo */
var gridP=0;
safe(function gridVis(){
  var cv=$('#gridCv'),box=$('#gridBox'),state=[],ch=0,sx=0;for(var i=0;i<64;i++)state.push(Math.random()>.5?1:0);
  var done=false;
  addLoop(box,function(dt){var s=fit(cv,2),c=cv.getContext('2d');c.setTransform(s.d,0,0,s.d,0,0);c.clearRect(0,0,s.w,s.h);
    var p=gridP,pitch=Math.min(s.w,s.h)/9,ox=(s.w-pitch*7)/2,oy=(s.h-pitch*7)/2-8;
    ch+=dt;if(ch>.22&&!RM){ch=0;for(var n=0;n<9;n++)state[Math.floor(Math.random()*64)]^=1}
    for(var r=0;r<8;r++){var lock=sm(.28+r*.05,.34+r*.05,p),keep=r===3,fade=keep?1:1-sm(.78,.95,p),yy=oy+r*pitch;if(keep)yy=lerp(yy,s.h/2-8,sm(.8,.97,p));
      for(var cI=0;cI<8;cI++){var bit=lock>.5?BITS[cI]:state[r*8+cI],last=cI===7,x=ox+cI*pitch,big=bit?pitch*.22:pitch*.1;if(lock>0&&lock<1&&Math.random()<.5)bit=state[r*8+cI];
        var rad=big*(keep?lerp(1,1.35,sm(.8,.97,p)):1),col=last&&lock>.5?'rgba('+BL+','+fade+')':'rgba(12,14,18,'+(fade*(bit?.9:.45))+')';
        if(fade<=0.01)continue;if(bit||last){dotc(c,x,yy,rad,col)}else{c.strokeStyle=col;c.lineWidth=1.2;c.beginPath();c.arc(x,yy,rad,0,7);c.stroke()}}}
    var d=p>.95;if(d!==done){done=d;box.classList.toggle('done',d)}});
},'gridVis');

/* ---------- WebGL helpers ---------- */
function mkR(cv,aa){if(!HAS_T)return null;try{var r=new THREE.WebGLRenderer({canvas:cv,antialias:aa,powerPreference:'high-performance'});r.setClearColor(0x0C0E12,1);return r}catch(e){return null}}
function sizeR(r,cv,cam,maxD){var b=cv.getBoundingClientRect(),w=Math.max(1,b.width),h=Math.max(1,b.height);r.setPixelRatio(Math.min(devicePixelRatio||1,maxD));r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();return{w:w,h:h}}
function glowTex(){var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)}
function dotTex(){var c=document.createElement('canvas');c.width=c.height=64;var x=c.getContext('2d');x.fillStyle='#fff';x.beginPath();x.arc(32,32,28,0,7);x.fill();return new THREE.CanvasTexture(c)}
function txtTex(t){var c=document.createElement('canvas');c.width=c.height=64;var x=c.getContext('2d');x.fillStyle='#F3F4F1';x.font='500 40px "Geist Mono",monospace';x.textAlign='center';x.textBaseline='middle';x.fillText(t,32,34);return new THREE.CanvasTexture(c)}
function glowSprite(col,sc,op){var s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(),color:col,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:op==null?1:op}));s.scale.set(sc,sc,1);return s}
var mouse={x:0,y:0};
addEventListener('pointermove',function(e){mouse.x=(e.clientX/innerWidth-.5)*2;mouse.y=(e.clientY/innerHeight-.5)*2},{passive:true});

/* ---------- hero: LITTLE STARS BACKGROUND ---------- */
var heroP=0;
safe(function heroScene(){
  var cv=$('#glHero');
  if(!cv){$('#top')?.classList.add('no-gl');return}
  var mob=innerWidth<760,r=mkR(cv,!mob);
  if(!r){$('#top').classList.add('no-gl');return}
  var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(36,1,.1,100);cam.position.set(0,0,11);
  scene.add(new THREE.AmbientLight(0x9aa0ad,.6));
  var G=new THREE.Group();scene.add(G);

  // particles (little stars)
  var N=mob?360:720,base=new Float32Array(N*3),dir=new Float32Array(N*3),cur=new Float32Array(N*3);
  for(var i=0;i<N;i++){
    var th=Math.random()*Math.PI*2,
        ph=Math.acos(2*Math.random()-1),
        rd=2.2+Math.pow(Math.random(),.7)*4.6,
        x=Math.sin(ph)*Math.cos(th),
        y=Math.cos(ph)*0.85,
        z=Math.sin(ph)*Math.sin(th);
    base[i*3]=x*rd; base[i*3+1]=y*rd; base[i*3+2]=z*rd;
    var sp=.6+Math.random()*1.4;
    dir[i*3]=x*sp+(Math.random()-.5);
    dir[i*3+1]=y*sp+(Math.random()-.5);
    dir[i*3+2]=z*sp+(Math.random()-.5);
  }
  var pg=new THREE.BufferGeometry();
  pg.setAttribute('position',new THREE.BufferAttribute(cur,3));
  var pm=new THREE.PointsMaterial({
    map:dotTex(),
    size:.052,
    color:0xF3F4F1,
    transparent:true,
    opacity:.65,
    depthWrite:false,
    sizeAttenuation:true,
    alphaTest:.05
  }), pts=new THREE.Points(pg,pm);
  pts.frustumCulled=false;
  G.add(pts);

  var ready=false;
  function resize(){
    sizeR(r,cv,cam,mob?1.5:1.75);
    ready=true;
  }
  new ResizeObserver(resize).observe(cv.parentElement);resize();

  addLoop($('#top'),function(dt){
    if(!ready)return;
    var p=heroP;
    var q2=Math.pow(clamp(p,0,1),1.5)*9;
    for(var k=0;k<N*3;k++)cur[k]=base[k]+dir[k]*q2;
    pg.attributes.position.needsUpdate=true;
    pm.opacity=.65*(1-sm(.05,.9,p));

    G.rotation.y=T*.07+mouse.x*.35;
    G.rotation.x=mouse.y*.2+Math.sin(T*.12)*.05;
    cam.position.x=lerp(cam.position.x,mouse.x*.5,.04);
    cam.position.y=lerp(cam.position.y,-mouse.y*.3,.04);
    cam.lookAt(0,0,0);
    r.render(scene,cam);
  });
},'hero');



/* ---------- about: particle word ---------- */
safe(function wordVis(){
  var cv=$('#wordCv'),box=$('#word'),off=document.createElement('canvas'),oc=off.getContext('2d'),samples=[],parts=[],W=0,H=0,mx=-999,my=-999,fs=0,ready=false;
  var by=0;
  function build(){var s=fit(cv,2);W=s.w;H=s.h;off.width=W;off.height=H;oc.clearRect(0,0,W,H);oc.font='500 100px Geist, sans-serif';
    var tw=oc.measureText('INTELLIGENCE').width;fs=Math.min(W*.995/tw*100,H*1.2);by=H*.9;oc.font='500 '+fs+'px Geist, sans-serif';oc.textBaseline='alphabetic';oc.fillStyle='#000';oc.fillText('INTELLIGENCE',0,by);
    var d=oc.getImageData(0,0,W,H).data;samples=[];for(var y=0;y<H;y+=3)for(var x=0;x<W;x+=3){if(d[(y*W+x)*4+3]>128)samples.push([x,y])}ready=samples.length>0}
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){build()});
  new ResizeObserver(function(){build()}).observe(box);
  box.addEventListener('pointermove',function(e){var b=cv.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top});box.addEventListener('pointerleave',function(){mx=my=-999});
  addLoop(box,function(dt){if(!ready)return;var s=fit(cv,2),c=cv.getContext('2d');c.setTransform(s.d,0,0,s.d,0,0);c.clearRect(0,0,s.w,s.h);
    c.font='500 '+fs+'px Geist, sans-serif';c.fillStyle='#0C0E12';c.fillText('INTELLIGENCE',0,by);
    if(!RM){var spawn=(mx>0?10:3);for(var i=0;i<spawn;i++){var pnt;if(mx>0){var tries=0;do{pnt=samples[(Math.random()*samples.length)|0];tries++}while(Math.hypot(pnt[0]-mx,pnt[1]-my)>90&&tries<14)}else pnt=samples[(Math.random()*samples.length)|0];
      parts.push({x:pnt[0],y:pnt[1],vx:(Math.random()*1.4+.2)*(mx>0?(pnt[0]-mx)/60+1:1),vy:(Math.random()-.6)*.9,l:1,s:Math.random()*1.8+.8,b:Math.random()<.03})}}
    for(var k=parts.length-1;k>=0;k--){var p=parts[k];p.x+=p.vx;p.y+=p.vy;p.vy+=.01;p.l-=dt*.7;if(p.l<=0){parts.splice(k,1);continue}c.fillStyle=p.b?'rgba('+BL+','+p.l+')':'rgba(12,14,18,'+p.l*.8+')';c.fillRect(p.x,p.y,p.s,p.s)}
    if(parts.length>900)parts.splice(0,parts.length-900)});
},'word');

/* ---------- loader + gsap scroll systems ---------- */
function finishLoad(){try{sessionStorage.setItem('mb','1')}catch(e){}html.classList.remove('ld');html.classList.add('ready');if(window.ScrollTrigger)ScrollTrigger.refresh()}
safe(function loader(){
  var L=$('#loader');
  if(!html.classList.contains('ld'))return;
  if(RM||!HAS_G){finishLoad();return}
  var digs=$$('.ld-d',L),dots=$$('.ld-b',L),row=$('#ldRow'),bar=$('#ldBar'),pct=$('#ldPct'),o={v:0},skipped=false;
  var tl=gsap.timeline({onComplete:finishLoad});
  tl.to(digs,{opacity:1,y:0,duration:.35,stagger:.09,ease:'power2.out'},.1)
    .to('.ld-name',{opacity:1,duration:.6},.55)
    .to(o,{v:100,duration:1.5,ease:'power1.inOut',onUpdate:function(){bar.style.transform='scaleX('+(o.v/100)+')';pct.textContent=String(Math.round(o.v)).padStart(3,'0')}},.25)
    .to(digs,{opacity:0,scale:.4,duration:.3,stagger:.03},1.85)
    .to(dots,{opacity:1,scale:1,duration:.35,stagger:.03,ease:'back.out(2)'},1.85)
    .fromTo(row,{'--cw':($('.ld-c',L).offsetWidth||48)+'px','--gap':'10px'},{'--cw':'26px','--gap':'4px',duration:.7,ease:'power3.inOut',immediateRender:false},2.25)
    .call(function(){html.classList.add('ready')},null,2.95)
    .to(L,{clipPath:'inset(0 0 100% 0)',duration:.95,ease:'power3.inOut'},2.95);
  function skip(){if(skipped)return;skipped=true;tl.timeScale(6)}
  L.addEventListener('click',skip);addEventListener('keydown',skip,{once:true});
},'loader');

safe(function scrollSystems(){
  if(!HAS_G||typeof ScrollTrigger==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);if(typeof ScrollToPlugin!=='undefined')gsap.registerPlugin(ScrollToPlugin);
  ScrollTrigger.config({ignoreMobileResize:true});
  var hero=$('#top');
  ScrollTrigger.create({trigger:hero,start:'top top',end:'bottom top',scrub:true,onUpdate:function(s){heroP=s.progress;hero.style.setProperty('--hp',s.progress.toFixed(3))}});
  ScrollTrigger.create({trigger:'#gridBox',start:'top 85%',end:'bottom 38%',scrub:true,onUpdate:function(s){gridP=s.progress}});
  if(byteApi.set){byteApi.st=ScrollTrigger.create({refreshPriority:2,trigger:'.byte-pin',pin:true,start:'top top',end:'+=700%',anticipatePin:1,onUpdate:function(s){byteApi.set(clamp(Math.floor(s.progress*8),0,7))}})}
  (function(){var f=function(){ScrollTrigger.refresh()};if(document.readyState==='complete')f();else addEventListener('load',f)})();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.refresh()});
},'scroll');


onScroll();

}
