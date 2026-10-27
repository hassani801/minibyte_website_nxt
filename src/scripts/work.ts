// @ts-nocheck
/* Ported 1:1 from the original work.html <script>. Runs once on the client (see components/WorkScript.tsx).
   gsap / three come from npm instead of CDN <script> tags, same versions (gsap 3.12.5, three r128). */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function initWork(): void {
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

/* ===== work page ===== */
html.classList.add('js');
var api={open:null,filter:null,view:null};
/* ---------- header, nav, anchors ---------- */
var hdr=$('#hdr');
var secs=$$('section[id],.ps');
function onScroll(){
  var y=scrollY;hdr.classList.toggle('scrolled',y>40);
  var probe=44,theme='ink',cur='';
  for(var i=0;i<secs.length;i++){var r=secs[i].getBoundingClientRect();if(r.top<=probe&&r.bottom>probe){theme=secs[i].classList.contains('paper')?'paper':'ink';if(secs[i].id)cur=secs[i].id}}
  hdr.classList.toggle('on-paper',theme==='paper');
  var k='work';$$('.nav a').forEach(function(a){a.classList.toggle('on',a.dataset.sec===k)});
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

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
var PROJECTS=[
 {n:'01',cat:'AI & AUTOMATION',title:'Intelligent Operations',sum:'Agents coordinating industrial workflows around the clock.',kind:'arm',seed:31,tint:.5,cls:'p1',w:1000,h:625,tags:['AI','AGENTS'],year:'2026',status:'IN OPERATION'},
 {n:'02',cat:'ROBOTICS',title:'Autonomous Systems',sum:'Perception and navigation for autonomous ground vehicles.',kind:'vehicle',seed:32,tint:.2,cls:'p2',w:700,h:875,tags:['ROBOTICS','VISION'],year:'2025',status:'FIELD TRIALS'},
 {n:'03',cat:'COMPUTER VISION',title:'Perception Engine',sum:'Multi-camera scene understanding in real time.',kind:'lens',seed:33,tint:.9,cls:'p3',w:700,h:875,tags:['VISION','EDGE'],year:'2026',status:'IN OPERATION'},
 {n:'04',cat:'EDGE AI',title:'Intelligence at the Edge',sum:'Compact models running on constrained embedded hardware.',kind:'board',seed:34,tint:.7,cls:'p4',w:1000,h:667,tags:['EDGE','AI'],year:'2025',status:'SHIPPING'},
 {n:'05',cat:'MULTI-AGENT AI',title:'Coordinated Intelligence',sum:'Specialised agents that plan, delegate and verify.',kind:'object3d',seed:35,tint:.3,cls:'p5',w:1000,h:667,tags:['AGENTS','AI'],year:'2026',status:'PILOT'},
 {n:'06',cat:'VOICE AI',title:'Conversational Systems',sum:'Low-latency voice interfaces for noisy real-world settings.',kind:'wave',seed:36,tint:.8,cls:'p6',w:800,h:800,tags:['VOICE','EDGE'],year:'2025',status:'PILOT'}
];
var DETAIL=[
 {sector:'Industrial logistics',dur:'9 months',team:'6 people',
  caps:['AI','MULTI-AGENT','AUTOMATION'],stack:['Agent orchestration','Edge inference','Event streaming','Operator console'],
  challenge:'A multi-site operation ran on hundreds of manual hand-offs between planning, dispatch and maintenance. Delays were visible only hours after they began.',
  approach:['Mapped each workflow decision and the signals that trigger it.','Built specialised agents for planning, dispatch and exceptions, with an operator approval step.','Ran the system in shadow mode against live operations before it was allowed to act.'],
  flow:['SIGNALS|Cameras, sensors and system events.','EDGE INFERENCE|Models that read the signals on site.','ORCHESTRATOR|Agents that plan and hand off work.','WORKFLOWS|Dispatch, maintenance and scheduling.','OPERATORS|People who review and direct.'],
  mets:[['PROCESSING',92,'','%'],['LATENCY',38,'↓ ','%'],['AUTONOMY',24,'',' / 7']],
  out:'Operations that keep running, with people directing instead of chasing.',
  frames:[['lab',51,.4,'Site reference frame'],['sensors',52,.2,'Sensor array detail'],['arm',53,.6,'Robotic cell, wide view']]},
 {sector:'Autonomous ground vehicles',dur:'14 months',team:'8 people',
  caps:['ROBOTICS','VISION','SENSOR FUSION'],stack:['Lidar and camera fusion','Inertial navigation','Motion planning','Simulation harness'],
  challenge:'Vehicles had to move through working yards with people, changing layouts and unreliable satellite positioning.',
  approach:['Fused camera, lidar and inertial data to localise without relying on GPS.','Replayed recorded edge cases in simulation before every field release.','Ran supervised trials with a safety driver and logged every intervention.'],
  flow:['SENSORS|Lidar, cameras and inertial units.','FUSION|One consistent view of the surroundings.','LOCALISATION|Position without satellite signal.','PLANNING|Routes that adapt to moving obstacles.','CONTROL|Steering and speed on the vehicle.'],
  mets:[['LOCALISATION ERROR',5,'< ',' cm'],['OBSTACLE RESPONSE',120,'',' ms'],['FIELD HOURS',1200,'',' h']],
  out:'Vehicles that find their way when the map and the signal both change.',
  frames:[['vehicle',61,.3,'Test vehicle, rear quarter'],['lens',62,.5,'Forward camera module'],['drone',63,.2,'Aerial survey support']]},
 {sector:'Facilities and inspection',dur:'7 months',team:'5 people',
  caps:['COMPUTER VISION','EDGE AI'],stack:['Detection and tracking models','Camera-side inference','Scene graph','Alert routing'],
  challenge:'Dozens of cameras produced footage nobody could watch. Events that mattered were found after the fact.',
  approach:['Built an evaluation set from the site\'s own footage before choosing a model.','Compressed detection and tracking to run on modules beside each camera.','Merged views into one scene model so an event is reported once.'],
  flow:['CAMERAS|Fixed and mobile video feeds.','DETECTION|Objects and people in each frame.','TRACKING|Identity carried across cameras.','SCENE MODEL|One shared picture of the site.','ALERTS|Only events that need a person.'],
  mets:[['CAMERAS',48,'',''],['FRAME LATENCY',35,'',' ms'],['FALSE ALERTS',61,'↓ ','%']],
  out:'A site that reports what happened while it is still happening.',
  frames:[['lens',71,.7,'Camera optics, close view'],['sensors',72,.4,'Camera array layout'],['lab',73,.5,'Monitoring room']]},
 {sector:'Embedded devices',dur:'6 months',team:'4 people',
  caps:['EDGE AI','EMBEDDED','AI'],stack:['Model distillation','Quantisation','On-device profiling','Firmware integration'],
  challenge:'A model that worked in the cloud had to run on a battery-powered device with no connection.',
  approach:['Distilled the large model into a small one that kept the behaviour that mattered.','Quantised and profiled it on the target chip, not in a notebook.','Tested power draw and accuracy together over full battery cycles.'],
  flow:['MODEL|The cloud model and its data.','DISTILLATION|A smaller model, same behaviour.','QUANTISATION|Lower precision, tested on hardware.','FIRMWARE|Integrated with the device software.','DEVICE|Running offline in the field.'],
  mets:[['MODEL SIZE',94,'↓ ','%'],['INFERENCE',18,'',' ms'],['OFFLINE',100,'','%']],
  out:'Intelligence that runs where the data is, with no connection required.',
  frames:[['board',81,.6,'Target board, top view'],['object3d',82,.3,'Model structure, visualised'],['sensors',83,.4,'Sensor test rig']]},
 {sector:'Knowledge operations',dur:'8 months',team:'6 people',
  caps:['MULTI-AGENT','AI','AUTOMATION'],stack:['Planner and verifier agents','Specialist agents','Task replay harness','Audit log'],
  challenge:'Complex requests needed several kinds of expertise, and a single model kept losing the thread.',
  approach:['Split the work into specialist agents with narrow, testable roles.','Added a coordinator that plans, delegates and checks each result.','Replayed real tasks through an evaluation harness after every change.'],
  flow:['REQUEST|A task in plain language.','PLANNER|Breaks it into steps.','SPECIALISTS|Agents that each do one thing well.','VERIFIER|Checks results against the brief.','RESULT|A finished, auditable answer.'],
  mets:[['TASKS COMPLETED',87,'','%'],['REVIEW TIME',52,'↓ ','%'],['AGENTS',7,'','']],
  out:'Specialist agents that hand work to each other and show their reasoning.',
  frames:[['object3d',91,.5,'Agent network, visualised'],['lab',92,.3,'Evaluation environment'],['sensors',93,.6,'Signal field']]},
 {sector:'Field operations',dur:'10 months',team:'5 people',
  caps:['VOICE','EDGE AI'],stack:['Noise-robust recognition','Wake word and command layer','Dialogue manager','Site audio dataset'],
  challenge:'Operators needed hands-free control in loud environments where standard speech systems failed.',
  approach:['Collected and labelled audio on site to train for the real noise.','Ran wake word and commands on the device so control works offline.','Designed dialogue that confirms before it acts.'],
  flow:['MICROPHONES|Close and far-field arrays.','DENOISING|Machine noise removed.','RECOGNITION|Speech to text on the device.','INTENT|What the operator wants done.','ACTION|Confirmed, then carried out.'],
  mets:[['WORD ERROR',41,'↓ ','%'],['RESPONSE',300,'',' ms'],['LANGUAGES',4,'','']],
  out:'Voice control that works at the loudest point of the site.',
  frames:[['wave',101,.7,'Speech signal, captured on site'],['board',102,.4,'On-device audio module'],['drone',103,.3,'Field deployment']]}
];
PROJECTS.push(
 {n:'07',cat:'WEB PLATFORM',title:'Fleet Console',sum:'A real-time operations dashboard that puts every robot, agent and alert on one screen.',kind:'sensors',seed:37,tint:.4,cls:'p7',w:1000,h:667,tags:['DEV','AI'],year:'2026',status:'IN OPERATION'},
 {n:'08',cat:'ML PLATFORM',title:'Inference Gateway',sum:'One API and release pipeline for serving, versioning and monitoring every model we ship.',kind:'object3d',seed:38,tint:.6,cls:'p8',w:800,h:800,tags:['DEV','AI','EDGE'],year:'2025',status:'SHIPPING'},
 {n:'09',cat:'MOBILE APP',title:'Field Companion',sum:'A mobile app that lets inspectors capture, tag and verify findings on site, offline.',kind:'drone',seed:39,tint:.3,cls:'p9',w:700,h:875,tags:['DEV','VISION'],year:'2026',status:'PILOT'},
 {n:'10',cat:'KNOWLEDGE ASSISTANT',title:'Lab Notebook Assistant',sum:'A retrieval assistant that answers questions from years of experiments, specs and reports.',kind:'portrait',seed:40,tint:.8,cls:'p10',w:1000,h:667,tags:['DEV','AI','AGENTS'],year:'2026',status:'IN OPERATION'}
);
DETAIL.push(
 {sector:'Operations software',dur:'5 months',team:'5 people',
  caps:['WEB','REAL-TIME','DESIGN SYSTEM'],stack:['TypeScript and React','WebSocket event bus','Postgres and time-series store','Role-based access'],
  challenge:'Operators switched between six tools to understand what the robots and agents were doing. Alerts arrived late and without context.',
  approach:['Interviewed operators and shadowed two full shifts to map what they actually look at.','Designed a single live map with a timeline, an alert queue and an approval inbox.','Shipped weekly to a pilot site and cut every feature nobody used.'],
  flow:['EVENTS|Robots, agents and sensors publish state.','EVENT BUS|Ordered, replayable streams.','STATE STORE|Live view plus a full history.','CONSOLE|Map, queue and timeline.','ACTIONS|Approvals sent back to the fleet.'],
  mets:[['ADOPTION',94,'','%'],['TIME TO ACT',61,'↓ ','%'],['SITES LIVE',12,'','']],
  out:'One screen the whole shift can trust, from the first alert to the final sign-off.',
  frames:[['sensors',71,.4,'Live fleet map'],['lab',72,.2,'Alert queue detail'],['board',73,.5,'Shift handover view']]},
 {sector:'Machine learning infrastructure',dur:'7 months',team:'4 people',
  caps:['API','MLOPS','OBSERVABILITY'],stack:['Python and Rust services','Container orchestration','Model registry','Tracing and drift monitors'],
  challenge:'Every team shipped models its own way. Rolling one back meant a day of manual work, and nobody could say which version was live where.',
  approach:['Defined one contract for every model: inputs, outputs, limits and health checks.','Built a gateway that routes, versions and shadows traffic between releases.','Added drift and latency monitors that block a release before it reaches production.'],
  flow:['REGISTRY|Every model, versioned and signed.','PIPELINE|Tests, evaluation and approval gates.','GATEWAY|Routing, canaries and rollbacks.','SERVING|Cloud and edge runtimes.','MONITORS|Drift, latency and cost.'],
  mets:[['ROLLBACK TIME',97,'↓ ','%'],['P95 OVERHEAD',8,'< ',' ms'],['MODELS SERVED',40,'','+']],
  out:'Models that ship on a Tuesday afternoon without anyone holding their breath.',
  frames:[['object3d',74,.6,'Release pipeline'],['board',75,.3,'Routing rules'],['wave',76,.8,'Latency monitor']]},
 {sector:'Inspection and maintenance',dur:'6 months',team:'4 people',
  caps:['MOBILE','VISION','OFFLINE-FIRST'],stack:['Cross-platform mobile','On-device vision model','Local database with sync','Photo and annotation tools'],
  challenge:'Inspectors worked from paper checklists and photo folders. Findings were typed up days later, and signal was patchy where the work happened.',
  approach:['Rode along on inspection rounds and timed each step on paper.','Built an offline-first app where the camera suggests labels and the inspector confirms.','Added background sync with conflict handling, tested in a lift shaft with no signal.'],
  flow:['CAPTURE|Photos, notes and measurements.','ON-DEVICE MODEL|Suggests labels with no network.','REVIEW|Inspector confirms or corrects.','LOCAL QUEUE|Stored safely until online.','SYNC|Merged into the central record.'],
  mets:[['REPORT TIME',70,'↓ ','%'],['OFFLINE USE',100,'','%'],['FINDINGS LOGGED',18,'','k']],
  out:'Reports finished before the inspector leaves the site.',
  frames:[['drone',77,.3,'Capture screen'],['lens',78,.7,'Label suggestion'],['sensors',79,.2,'Sync status']]},
 {sector:'Research operations',dur:'4 months',team:'4 people',
  caps:['RETRIEVAL','LLM','EVALUATION'],stack:['Document ingestion pipeline','Vector and keyword search','Citation-first answers','Evaluation harness'],
  challenge:'Years of experiment logs, specs and reports sat in separate folders. New engineers spent weeks asking colleagues where things were.',
  approach:['Indexed every source with its owner, date and version so answers carry provenance.','Built a retrieval layer that quotes its sources and refuses when it has none.','Wrote a test set of real questions and blocked releases that scored worse.'],
  flow:['SOURCES|Reports, logs, specs and tickets.','INGEST|Cleaned, chunked and attributed.','INDEX|Keyword and semantic search.','ANSWER|Short reply with citations.','FEEDBACK|Ratings feed the test set.'],
  mets:[['ANSWER RATE',88,'','%'],['SEARCH TIME',80,'↓ ','%'],['SOURCES INDEXED',52,'','k']],
  out:'New engineers get a sourced answer in seconds instead of a week of asking around.',
  frames:[['portrait',80,.8,'Question and answer view'],['lab',81,.4,'Source citation panel'],['wave',82,.6,'Evaluation results']]}
);
var EXTRA=[
 {range:'Jan to Sep 2026',client:'Multi-site logistics operator',why:'The client was losing hours to delays that people noticed too late. We built it to prove that agents could carry routine hand-offs safely, with people approving anything that mattered.',
  deliver:['Agent orchestration service','Operator approval console','Shadow-mode evaluation report'],
  tl:[['Discovery',4,'Mapped workflows, decisions and signals on site.'],['Prototype',8,'First planning and dispatch agents on recorded data.'],['Shadow mode',10,'Ran beside live operations without acting.'],['Rollout',12,'Enabled actions site by site with approval.'],['Hardening',5,'Failure drills, handover and documentation.']],
  learn:'Shadow mode earned more trust than any demo. Operators believed the numbers because they had watched the agents be wrong first.',next:'Extending the exception agent to maintenance planning at two more sites.'},
 {range:'Mar 2025 to May 2026',client:'Yard and port operator',why:'Satellite positioning failed exactly where the vehicles worked, between stacked containers. The goal was reliable autonomy that did not depend on a clear sky.',
  deliver:['Perception and localisation stack','Simulation harness with replay','Safety case for supervised operation'],
  tl:[['Data collection',10,'Recorded sensor logs across yards and weather.'],['Fusion and simulation',16,'Built localisation and a replay harness.'],['Planning',14,'Routes that adapt to people and moving loads.'],['Supervised trials',14,'Safety driver on board, every intervention logged.'],['Safety case',6,'Evidence pack for sign-off.']],
  learn:'Replaying every intervention in simulation before the next release cut repeat faults faster than any new algorithm.',next:'Trials without a safety driver in a fenced zone.'},
 {range:'Feb to Aug 2026',client:'Facilities management group',why:'Cameras were installed everywhere and watched by no one. We built the layer that turns video into structured events people can act on.',
  deliver:['Multi-camera tracking engine','Event API','Calibration toolkit'],
  tl:[['Discovery',3,'Camera audit and event definitions.'],['Calibration',6,'Tools to align cameras quickly.'],['Model work',10,'Detection and tracking tuned per site.'],['Pilot',7,'Live events to a small team.'],['Scale-out',4,'Rolled to the remaining buildings.']],
  learn:'Calibration, not the model, decided whether a site worked. We shipped a tool for it before tuning anything.',next:'Adding behaviour events such as blocked exits and tailgating.'},
 {range:'Jun to Nov 2025',client:'Consumer hardware maker',why:'The product needed on-device intelligence with no cloud round trip, on a chip with a few hundred kilobytes of memory.',
  deliver:['Compressed model family','Firmware integration kit','Power and accuracy report'],
  tl:[['Feasibility',3,'Measured the budget: memory, power and latency.'],['Model design',8,'Architecture search under hard limits.'],['Quantisation',6,'Compression with accuracy tracked per step.'],['Firmware',6,'Integration and real-device testing.'],['Validation',3,'Battery life and temperature runs.']],
  learn:'Setting the power budget first changed every later decision. Accuracy became one variable among several, not the goal.',next:'A smaller variant for the next chip generation.'},
 {range:'Jan to Aug 2026',client:'Engineering consultancy',why:'Teams were asking one agent to do everything and getting uneven results. We tested whether specialists that check each other would be more reliable.',
  deliver:['Planner, worker and verifier agents','Tracing and replay tools','Evaluation benchmark'],
  tl:[['Task study',4,'Catalogued real tasks and failure types.'],['Agent design',8,'Roles, hand-offs and tool permissions.'],['Verification loop',10,'A separate agent checks every result.'],['Pilot',9,'Used on live client work with review.'],['Evaluation',4,'Scored against a single-agent baseline.']],
  learn:'A verifier with different instructions from the worker caught more errors than a stronger worker ever did.',next:'Opening the pilot to a second team.'},
 {range:'Mar to Dec 2025',client:'Field services company',why:'Voice is the only interface that works with gloves on and hands full. The problem was making it dependable next to machinery.',
  deliver:['Noise-robust speech pipeline','Intent and confirmation layer','Headset integration'],
  tl:[['Field recordings',6,'Captured speech in real, loud environments.'],['Speech models',12,'Training and augmentation for noise.'],['Dialogue design',10,'Short commands with safe confirmations.'],['Pilot',11,'Crews used it on live jobs.'],['Tuning',4,'Latency and false-trigger fixes.']],
  learn:'Confirmation design mattered more than accuracy. Crews forgave a repeat request but never a wrong action.',next:'More languages and accents for the next region.'},
 {range:'Mar to Jul 2026',client:'Internal, built for Fleet and Operations teams',why:'Our own robots and agents produced more information than people could read. The console exists so operators can see, decide and act in one place.',
  deliver:['Web console','Event and alert service','Component library'],
  tl:[['Shadowing',2,'Two shifts observed and timed.'],['Design',4,'Map, queue and timeline prototyped.'],['Build',10,'Weekly releases to a pilot site.'],['Pilot',4,'Daily use, cut what went unused.'],['Roll-out',2,'Training and access for all sites.']],
  learn:'Deleting features did more for adoption than adding them. Every release removed something.',next:'Mobile handover view for shift changes.'},
 {range:'Jan to Jul 2025',client:'Internal platform for all Minibyte teams',why:'Shipping a model took days and relied on one person remembering the steps. The gateway makes releasing and reversing a model routine.',
  deliver:['Gateway service','Release pipeline','Monitoring dashboards'],
  tl:[['Contract design',4,'One interface every model must meet.'],['Gateway',10,'Routing, canaries and rollbacks.'],['Pipeline',8,'Automated tests and approval gates.'],['Monitoring',5,'Drift, latency and cost alerts.'],['Migration',3,'Moved existing models across.']],
  learn:'Teams adopted it because rollback became a button. The monitoring only mattered after that.',next:'Cost attribution per model and per customer.'},
 {range:'Apr to Sep 2026',client:'Inspection services client',why:'Inspectors had the knowledge but spent half their day on paperwork. The app moves the paperwork into the walk-around itself.',
  deliver:['iOS and Android app','On-device model','Sync service'],
  tl:[['Ride-alongs',3,'Timed each step of real inspection rounds.'],['Prototype',5,'Capture and review flows in a clickable build.'],['Offline engine',8,'Local storage and conflict-safe sync.'],['Pilot',7,'Twelve inspectors, two sites.'],['Polish',3,'Accessibility and glove-friendly controls.']],
  learn:'Testing in a place with no signal found more issues in one afternoon than a month of staging tests.',next:'Wider pilot and report templates per sector.'},
 {range:'Jun to Sep 2026',client:'Internal research team',why:'Knowledge lived in people and old folders. The assistant makes the lab memory searchable without making it less trustworthy.',
  deliver:['Ingestion and search service','Chat and search interface','Evaluation suite'],
  tl:[['Source audit',2,'What exists, who owns it and how fresh it is.'],['Ingestion',4,'Pipelines with owner, date and version.'],['Retrieval',5,'Hybrid search and citations.'],['Evaluation',3,'A graded question set as a release gate.'],['Launch',3,'Rolled out team by team.']],
  learn:'Refusing to answer without a source built more trust than any clever answer. People came back because it was honest.',next:'Connecting live experiment data alongside the written record.'}
];
var N=PROJECTS.length,pad=function(n){return (n<10?'0':'')+n};
var TAGS=['AI','AGENTS','ROBOTICS','VISION','EDGE','VOICE','DEV'];
var typeOf=function(p){return p.tags.indexOf('DEV')>-1?'DEVELOPMENT':'RESEARCH'};
var isLive=function(p){return p.status==='IN OPERATION'||p.status==='SHIPPING'};
var fmtM=function(m){return esc(m[2])+m[1]+esc(m[3])};
safe(function buildPage(){
  $('#scImgs').innerHTML=PROJECTS.map(function(p){return '<img data-kind="'+p.kind+'" data-w="900" data-h="1125" data-seed="'+(p.seed+300)+'" data-tint="'+p.tint+'" width="900" height="1125" alt="" aria-hidden="true">'}).join('');
  $('#scDots').innerHTML=PROJECTS.map(function(p,i){return '<button type="button" role="tab" class="'+(BITS[i]?'':'s')+'" aria-label="Project '+p.n+': '+esc(p.title)+'" aria-selected="false" data-k="'+i+'"></button>'}).join('');
  $('#pcGrid').innerHTML=PROJECTS.map(function(p,i){var d=DETAIL[i];
    return '<a class="pc" href="#p-'+p.n+'" data-i="'+i+'" data-tags="'+p.tags.join(' ')+'" data-cursor="project" data-rv style="--i:'+(i%2)+'" aria-haspopup="dialog" aria-label="Open project '+p.n+': '+esc(p.title)+'">'+
    '<div class="pc-img"><img data-kind="'+p.kind+'" data-w="1000" data-h="750" data-seed="'+(p.seed+400)+'" data-tint="'+p.tint+'" width="1000" height="750" alt="Placeholder image for '+esc(p.title)+'"><i class="scan"></i>'+
    '<span class="chip mono">'+p.n+'</span><span class="pill mono'+(isLive(p)?' live':'')+'"><i></i>'+p.status+'</span></div>'+
    '<div class="pc-body"><div class="pc-meta mono"><span>'+typeOf(p)+' / '+esc(p.cat)+'</span><span>'+p.year+'</span></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.sum)+'</p>'+
    '<dl class="pc-k">'+d.mets.slice(0,2).map(function(m){return '<div><dt class="mono">'+esc(m[0])+'</dt><dd>'+fmtM(m)+'</dd></div>'}).join('')+'</dl>'+
    '<div class="pc-foot"><span class="tagl mono">'+p.tags.map(function(t){return '<span>'+t+'</span>'}).join('')+'</span><span class="go mono">VIEW CASE <b>→</b></span></div></div></a>'}).join('');
  $('#wkList').innerHTML=PROJECTS.map(function(p,i){return '<li><a class="wi" href="#p-'+p.n+'" data-i="'+i+'" data-tags="'+p.tags.join(' ')+'" aria-haspopup="dialog" aria-label="Open project '+p.n+': '+esc(p.title)+'">'+
    '<span class="no mono">'+p.n+'</span><span class="t">'+esc(p.title)+'</span><span class="dm mono">'+p.tags.join(' / ')+'</span><span class="yr mono">'+p.year+'</span><span class="st mono">'+p.status+'</span><span class="ar" aria-hidden="true">→</span></a></li>'}).join('');
  $('#mx').innerHTML='<caption class="sr">Disciplines used in each project</caption><thead><tr><th scope="col">DISCIPLINE</th>'+PROJECTS.map(function(p){return '<th scope="col" title="'+esc(p.title)+'">'+p.n+'</th>'}).join('')+'<th scope="col" style="text-align:right">TOTAL</th></tr></thead><tbody>'+
    TAGS.map(function(t){var c=0,cells=PROJECTS.map(function(p){var on=p.tags.indexOf(t)>-1;if(on)c++;return '<td><i class="d'+(on?'':' off')+'"></i><span class="sr">'+(on?'Included':'Not included')+'</span></td>'}).join('');
      return '<tr><th scope="row"><button type="button" class="mx-b" data-f="'+t+'">'+t+'</button></th>'+cells+'<td class="tot mono">'+pad(c)+'</td></tr>'}).join('')+'</tbody>';
  $('#mxKey').innerHTML=PROJECTS.map(function(p,i){return '<li><button type="button" data-i="'+i+'"><b>'+p.n+'</b>'+esc(p.title)+'</button></li>'}).join('');
  lazyImgs(document);
},'buildPage');

safe(function showcase(){
  var fr=$('#scFrame'),imgs=$$('#scImgs img'),dots=$$('#scDots button'),bar=$('#scBar'),bot=$('#scBot'),cur=0,first=true;
  function show(i){
    cur=i;imgs.forEach(function(im,k){im.classList.toggle('on',k===i)});
    dots.forEach(function(d,k){var on=k===i;d.classList.toggle('on',on);d.setAttribute('aria-selected',on?'true':'false')});
    var p=PROJECTS[i],pl=$('#scPill');
    $('#scNo').textContent='FEATURED '+p.n+' / '+pad(N);$('#scTitle').textContent=p.title;$('#scCat').textContent=p.cat;
    pl.className='pill mono'+(isLive(p)?' live':'');$('b',pl).textContent=p.status;
    if(!first){bot.classList.remove('sw');void bot.offsetWidth;bot.classList.add('sw')}first=false;
    bar.classList.remove('run');void bar.offsetWidth;bar.classList.add('run');
  }
  bar.addEventListener('animationend',function(){show((cur+1)%N)});
  dots.forEach(function(d){d.addEventListener('click',function(){show(+d.dataset.k)})});
  fr.addEventListener('click',function(){api.open&&api.open(cur,$('#scOpen'))});
  if(FINE&&!RM){
    fr.addEventListener('pointermove',function(e){var r=fr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fr.style.setProperty('--ry',(x*7).toFixed(2)+'deg');fr.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')});
    fr.addEventListener('pointerleave',function(){fr.style.setProperty('--rx','0deg');fr.style.setProperty('--ry','0deg')});
  }
  show(0);
},'showcase');

safe(function cardFx(){
  var fx=$('#fxmap');
  $$('.pc').forEach(function(p){var im=$('img',p);
    p.addEventListener('pointerenter',function(){p.classList.add('fx');if(HAS_G&&!RM&&fx){gsap.killTweensOf(fx);gsap.fromTo(fx,{attr:{scale:0}},{attr:{scale:34},duration:.45,ease:'power2.out',onComplete:function(){gsap.to(fx,{attr:{scale:9},duration:.9,ease:'power2.inOut'})}})}});
    p.addEventListener('pointerleave',function(){if(HAS_G&&fx){gsap.killTweensOf(fx);gsap.to(fx,{attr:{scale:0},duration:.5,ease:'power2.out',onComplete:function(){p.classList.remove('fx')}})}else p.classList.remove('fx');im.style.setProperty('--px','0px');im.style.setProperty('--py','0px')});
    p.addEventListener('pointermove',function(e){var r=p.getBoundingClientRect();im.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*-16+'px');im.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*-12+'px')})});
},'cardFx');

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

/* ---------- work: filters, views, project case files ---------- */
safe(function workSystem(){
  var pad=function(n){return (n<10?'0':'')+n},N=PROJECTS.length;
  var cards=$$('.pc'),rows=$$('.wi'),fl=$('#wkFlt'),cnt=$('#wkCount'),grid=$('#pcGrid'),idx=$('#wkIdx');
  var tags=['ALL','AI','AGENTS','ROBOTICS','VISION','EDGE','VOICE','DEV'];
  fl.innerHTML=tags.map(function(t){var n=t==='ALL'?N:PROJECTS.filter(function(p){return p.tags.indexOf(t)>-1}).length;return '<button type="button" data-f="'+t+'" aria-pressed="'+(t==='ALL'?'true':'false')+'">'+t+'<i>'+pad(n)+'</i></button>'}).join('');
  var has=function(el,f){return f==='ALL'||el.dataset.tags.split(' ').indexOf(f)>-1};
  function filter(f){
    var n=0;
    $$('button',fl).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.f===f?'true':'false')});
    cards.forEach(function(c){var on=has(c,f);c.classList.toggle('dim',!on);if(on){c.removeAttribute('inert');n++}else c.setAttribute('inert','')});
    rows.forEach(function(r){r.parentNode.hidden=!has(r,f)});
    cnt.textContent='SHOWING '+pad(n)+' / '+pad(N);
  }
  fl.addEventListener('click',function(e){var b=e.target.closest('button');if(b)filter(b.dataset.f)});
  var vg=$('#vGrid'),vi=$('#vIdx');
  function view(v){var g=v==='grid';grid.hidden=!g;idx.hidden=g;vg.setAttribute('aria-pressed',g?'true':'false');vi.setAttribute('aria-pressed',g?'false':'true');if(window.ScrollTrigger)ScrollTrigger.refresh()}
  vg.addEventListener('click',function(){view('grid')});vi.addEventListener('click',function(){view('idx')});

  // index hover preview
  if(FINE&&HAS_G){
    var pv=$('#wkPv'),pim=$('#wkImg'),qx=gsap.quickTo(pv,'x',{duration:.7,ease:'power3.out'}),qy=gsap.quickTo(pv,'y',{duration:.7,ease:'power3.out'}),cu=-1;
    rows.forEach(function(r){var k=+r.dataset.i,p=PROJECTS[k];r.addEventListener('pointerenter',function(){if(k!==cu){cu=k;pim.src=imgSrc(p.kind,340,425,p.seed,p.tint)}pv.classList.add('show')})});
    idx.addEventListener('pointermove',function(e){qx(e.clientX+28);qy(e.clientY-150)});
    idx.addEventListener('pointerleave',function(){pv.classList.remove('show')});
  }

  // case file overlay
  var pd=$('#pd'),sc=$('#pdScroll'),body=$('#pdBody'),cur=-1,opener=null,io=null,mio=null;
  var blockers=[$('#main'),$('#hdr'),$('footer.foot')];
  function img(kind,w,h,seed,tint,alt){return '<img data-kind="'+kind+'" data-w="'+w+'" data-h="'+h+'" data-seed="'+seed+'" data-tint="'+tint+'" width="'+w+'" height="'+h+'" alt="'+esc(alt)+'">'}
  function render(i,sw){
    var p=PROJECTS[i],d=DETAIL[i],x=EXTRA[i],nx=PROJECTS[(i+1)%N],R=RM?'':' rv',s=function(k){return RM?'':' style="--i:'+k+'"'};
    cur=i;$('#pdPos').textContent='PROJECT '+p.n+' / '+pad(N);
    var h=[];
    h.push('<section class="pd-s ink pd-hero"><div class="wrap">'+
      '<div class="pd-kick mono'+R+'"'+s(0)+'><b>PROJECT '+p.n+'</b><span>'+typeOf(p)+'</span><span>'+esc(p.cat)+'</span><span>'+p.tags.join(' / ')+'</span></div>'+
      '<h2 class="pd-h" id="pdTitle">'+esc(p.title)+'</h2>'+
      '<p class="lead'+R+'"'+s(1)+' style="margin-top:clamp(20px,3vw,40px)">'+esc(p.sum)+'</p>'+
      '<figure class="pd-fig'+R+'"'+s(2)+'><div class="ph">'+img(p.kind,1600,686,p.seed+100,p.tint,'Placeholder hero image for '+p.title)+'</div><figcaption class="mono mut">FIG. '+p.n+' / PLACEHOLDER IMAGE</figcaption></figure>'+
      '<dl class="pd-meta mono'+R+'"'+s(3)+'>'+[['CLIENT',x.client],['TIMEFRAME',x.range],['DURATION',d.dur+' / '+x.tl.reduce(function(a,t){return a+t[1]},0)+' WEEKS'],['TEAM',d.team],['STATUS',p.status]].map(function(m){return '<div><dt>'+m[0]+'</dt><dd>'+esc(m[1])+'</dd></div>'}).join('')+'</dl></div></section>');
    h.push('<section class="pd-s paper"><div class="wrap pd-brief">'+
      '<div class="side'+R+'"><div class="lbl mono"><i></i><span>THE BRIEF</span></div>'+
      '<div class="pd-blk"><span class="mono mut">CAPABILITIES</span><div class="tagl mono">'+d.caps.map(function(c){return '<span>'+esc(c)+'</span>'}).join('')+'</div></div>'+
      '<div class="pd-blk"><span class="mono mut">STACK</span><ul class="stk">'+d.stack.map(function(c){return '<li>'+esc(c)+'</li>'}).join('')+'</ul></div>'+
      '<div class="pd-blk"><span class="mono mut">DELIVERABLES</span><ul class="stk">'+x.deliver.map(function(c){return '<li>'+esc(c)+'</li>'}).join('')+'</ul></div></div>'+
      '<div><div class="pd-blk'+R+'"><span class="mono mut">WHY WE BUILT IT</span><p class="pd-q">'+esc(x.why)+'</p></div>'+
      '<div class="pd-blk'+R+'"><span class="mono mut">THE CHALLENGE</span><p class="pd-q">'+esc(d.challenge)+'</p></div>'+
      '<div class="pd-blk'+R+'"><span class="mono mut">HOW IT WAS BUILT</span><ol class="apr">'+d.approach.map(function(a,k){return '<li><span class="mono">0'+(k+1)+'</span><span style="color:inherit;padding:0">'+esc(a)+'</span></li>'}).join('')+'</ol></div></div></div></section>');
    var tot=x.tl.reduce(function(a,t){return a+t[1]},0),acc=0;
    h.push('<section class="pd-s ink pd-tl"><div class="wrap"><div class="lbl mono'+R+'"><i></i><span>TIMELINE</span></div>'+
      '<p class="mono pd-sub" style="margin-top:12px">'+esc(x.range.toUpperCase())+' / '+tot+' WEEKS / '+x.tl.length+' PHASES</p>'+
      '<ol class="tl">'+x.tl.map(function(t,k){var l=acc/tot*100,w=t[1]/tot*100;acc+=t[1];
        return '<li class="tl-r'+R+'"'+s(k)+'><span class="tl-n mono">0'+(k+1)+'</span><div class="tl-t"><b>'+esc(t[0])+'</b><p>'+esc(t[2])+'</p></div>'+
        '<div class="tl-tr" aria-hidden="true"><i style="left:'+l.toFixed(2)+'%;width:'+w.toFixed(2)+'%"'+(k===x.tl.length-1?' class="last"':'')+'></i></div><span class="tl-w mono">'+t[1]+' WK</span></li>'}).join('')+'</ol></div></section>');
    h.push('<section class="pd-s ink pd-sys"><div class="wrap"><div class="lbl mono'+R+'"><i></i><span>THE SYSTEM</span></div>'+
      '<p class="mono pd-sub" style="margin-top:12px">SIGNAL FLOW / ILLUSTRATIVE</p>'+
      '<div class="flow-w'+R+'"><i class="sg" aria-hidden="true"></i><ol class="flow">'+d.flow.map(function(f,k){var a=f.split('|');return '<li><span class="mono mut">0'+(k+1)+'</span><b>'+esc(a[0])+'</b><p>'+esc(a[1])+'</p></li>'}).join('')+'</ol></div>'+
      '<div class="lbl mono'+R+'" style="margin-top:clamp(56px,8vw,112px)"><i></i><span>FRAMES</span></div>'+
      '<div class="pd-gal">'+
      '<figure class="gf gf1'+R+'"><div class="ph">'+img(d.frames[0][0],1100,825,d.frames[0][1],d.frames[0][2],d.frames[0][3])+'</div><figcaption class="mono">FIG. '+p.n+'.1 / '+esc(d.frames[0][3])+'</figcaption></figure>'+
      '<figure class="gf gf2'+R+'"><div class="ph">'+img(d.frames[1][0],800,1000,d.frames[1][1],d.frames[1][2],d.frames[1][3])+'</div><figcaption class="mono">FIG. '+p.n+'.2 / '+esc(d.frames[1][3])+'</figcaption></figure>'+
      '<figure class="gf gf3'+R+'"><div class="ph">'+img(d.frames[2][0],1600,686,d.frames[2][1],d.frames[2][2],d.frames[2][3])+'</div><figcaption class="mono">FIG. '+p.n+'.3 / '+esc(d.frames[2][3])+'</figcaption></figure></div></div></section>');
    h.push('<section class="pd-s paper pd-res"><div class="wrap"><div class="lbl mono'+R+'"><i></i><span>RESULTS</span></div>'+
      '<p class="mono mut" style="margin-top:12px">PLACEHOLDER VALUES, REPLACE WITH PROJECT DATA</p>'+
      '<div class="mets">'+d.mets.map(function(m){return '<div class="met"><span class="mono mut">'+esc(m[0])+'</span><b data-count="'+m[1]+'" data-prefix="'+esc(m[2])+'" data-suffix="'+esc(m[3])+'">'+esc(m[2])+m[1]+esc(m[3])+'</b></div>'}).join('')+'</div>'+
      '<p class="outcome'+R+'" style="margin-top:clamp(40px,6vw,88px)">'+esc(d.out)+'</p>'+
      '<div class="ln2"><div class="pd-blk'+R+'"><span class="mono mut">WHAT WE LEARNED</span><p class="pd-q">'+esc(x.learn)+'</p></div><div class="pd-blk'+R+'"><span class="mono mut">WHAT\'S NEXT</span><p class="pd-q">'+esc(x.next)+'</p></div></div>'+
      '<div class="pd-cta"><button class="btn pri" type="button" data-act="contact">Start a conversation <span class="ar">→</span></button>'+
      (i===0?'<button class="btn sec2" type="button" data-act="seq">View the scroll-through <span class="ar">↓</span></button>':'')+
      '<button class="btn sec2" type="button" data-act="close">Back to all work</button></div></div></section>');
    h.push('<section class="pd-s ink pd-nx"><div class="wrap"><button type="button" class="pd-next" data-act="next" data-cursor="project" aria-label="Next project: '+esc(nx.title)+'">'+
      '<span class="mono mut">NEXT PROJECT / '+nx.n+' / '+pad(N)+'</span><span class="nt">'+esc(nx.title)+'</span>'+
      '<span class="ph">'+img(nx.kind,1600,457,nx.seed+200,nx.tint,'Placeholder image for '+nx.title)+'</span></button></div><div class="pd-end"></div></section>');
    body.innerHTML=h.join('');
    if(sw){body.classList.remove('sw');void body.offsetWidth;body.classList.add('sw')}
    sc.scrollTop=0;
    $$('img[data-kind]',body).forEach(function(im,k){setTimeout(function(){im.src=imgSrc(im.dataset.kind,+im.dataset.w,+im.dataset.h,+im.dataset.seed,+im.dataset.tint||0)},k*80)});
    if(io)io.disconnect();
    if(!RM){io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{root:sc,threshold:.08});$$('.rv',body).forEach(function(el){io.observe(el)})}
    if(mio)mio.disconnect();
    var ms=$('.pd-res .mets',body);
    if(ms){mio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$$('.met b',e.target).forEach(function(b,k){runCount(b,k*.12)});mio.unobserve(e.target)}})},{root:sc,threshold:.5});mio.observe(ms)}
  }
  function open(i,from){
    opener=from||null;render(i,false);
    pd.removeAttribute('inert');pd.setAttribute('aria-hidden','false');pd.classList.add('open');
    blockers.forEach(function(b){if(b)b.setAttribute('inert','')});
    html.style.overflow='hidden';
    setTimeout(function(){try{$('#pdClose').focus({preventScroll:true})}catch(e){}},400);
  }
  function close(then){
    pd.classList.remove('open');pd.setAttribute('inert','');pd.setAttribute('aria-hidden','true');
    blockers.forEach(function(b){if(b)b.removeAttribute('inert')});
    html.style.overflow='';
    if(then)then();else if(opener&&document.contains(opener)){try{opener.focus({preventScroll:true})}catch(e){}}
  }
  function step(d){render((cur+d+N)%N,true)}
  $$('.pc,.wi').forEach(function(el){el.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();e.stopPropagation();open(+el.dataset.i,el)})});
  $$('[data-open]').forEach(function(el){el.addEventListener('click',function(){open(+el.dataset.open,el)})});
  $('#pdClose').addEventListener('click',function(){close()});
  $('#pdPrev').addEventListener('click',function(){step(-1)});
  $('#pdNext').addEventListener('click',function(){step(1)});
  body.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
    if(a==='next')step(1);else if(a==='close')close();else if(a==='contact')close(function(){goTo('#contact')});else if(a==='seq')close(function(){goTo('#case')})});
  addEventListener('keydown',function(e){if(!pd.classList.contains('open'))return;
    if(e.key==='Escape')close();else if(e.key==='ArrowRight')step(1);else if(e.key==='ArrowLeft')step(-1)});

  api.open=open;api.filter=filter;api.view=view;
  $$('.mx-b').forEach(function(b){b.addEventListener('click',function(){filter(b.dataset.f);view('grid');goTo('#projects')})});
  $$('#mxKey button').forEach(function(b){b.addEventListener('click',function(){open(+b.dataset.i,b)})});
  var hm=/^#p-0([1-6])$/.exec(location.hash);if(hm)setTimeout(function(){open(+hm[1]-1,null)},900);
},'workSystem');

safe(function scrollSystems(){
  if(!HAS_G||typeof ScrollTrigger==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);if(typeof ScrollToPlugin!=='undefined')gsap.registerPlugin(ScrollToPlugin);
  ScrollTrigger.config({ignoreMobileResize:true});
  var mm=gsap.matchMedia();
  mm.add('(min-width:900px) and (prefers-reduced-motion:no-preference)',function(){
    var cs=$('#case'),stages=$$('.stage',cs),ticks=$$('#ticks i'),nm=$('#stageName'),pin=$('.case-pin',cs),cur=-1,names=['IMAGE','SPECIFICATION','ARCHITECTURE','PERFORMANCE','OUTCOME'];
    cs.classList.add('pinned');
    function setStage(i){if(i===cur)return;cur=i;stages.forEach(function(s,k){s.classList.toggle('on',k===i)});ticks.forEach(function(t,k){t.classList.toggle('on',k===i)});nm.textContent='STAGE 0'+(i+1)+' / '+names[i];
      if(i===3)$$('.met b',cs).forEach(function(b,k){runCount(b,k*.12)})}
    setStage(0);
    ScrollTrigger.create({trigger:pin,pin:true,start:'top top',end:'+=420%',anticipatePin:1,onUpdate:function(s){setStage(clamp(Math.floor(s.progress*5),0,4))}});
    return function(){cs.classList.remove('pinned');stages.forEach(function(s){s.classList.remove('on')});cur=-1;$$('.met b',cs).forEach(function(b){b.textContent=(b.dataset.prefix||'')+b.dataset.count+(b.dataset.suffix||'')})};
  });
  (function(){var f=function(){ScrollTrigger.refresh()};if(document.readyState==='complete')f();else addEventListener('load',f)})();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.refresh()});
},'scroll');

setTimeout(function(){html.classList.add('ready');safe(function(){$$('.wh-stats dd[data-count]').forEach(function(d,k){runCount(d,.7+k*.12)})},'stats')},RM?0:650);
onScroll();


}
