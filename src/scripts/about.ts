// @ts-nocheck
/* Ported 1:1 from the original about.html <script>. Runs once on the client (see components/AboutScript.tsx).
   gsap / three come from npm instead of CDN <script> tags, same versions (gsap 3.12.5, three r128). */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function initAbout(): void {
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
  var k='about';$$('.nav a').forEach(function(a){a.classList.toggle('on',a.dataset.sec===k)});
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
/* ---------- about page ---------- */
var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
var EV=[
 ['2023','A question in a garage','Two engineers, one question: can useful intelligence run where the work happens, on a small device with no cloud behind it? A few months of late nights produced a first model small enough to answer yes.',['TWO FOUNDERS','FIRST PROTOTYPE']],
 ['2024','The first system in the field','A logistics operator let us try agents on a live site, in shadow mode first. It worked, and we learned how different a result looks when someone depends on it.',['FIRST DEPLOYMENT','SHADOW MODE']],
 ['2025','A lab, not a studio','We set up research programmes, a publication standard and the first GPS-denied vehicle trials. Reproducibility stopped being a preference and became a rule.',['RESEARCH PROGRAMMES','FIELD TRIALS']],
 ['2026','Ten systems, six programmes','Ten case files across research and software, our first open releases and a larger team. The question is still the same, only the answers got more specific.',['OPEN RELEASES','TEN CASE FILES']]
];
var BEL=[
 ['Intelligence should move','Intelligence that lives only on a screen is a demo. We build systems that perceive and act where work happens, on vehicles, devices and factory floors.','Test: does it still work when we are not in the room?'],
 ['Small is a feature','A model that fits on the device is cheaper, faster, more private and easier to trust. We treat size as a design goal, not a compromise.','Test: could it run on the hardware the customer already owns?'],
 ['Measure before you claim','We write the test before the experiment, report the spread, and publish the failures. A number without its variance is an opinion.','Test: could someone else reproduce this?'],
 ['People stay in the loop','Where a decision carries real cost, a person approves it until the evidence says otherwise. Automation earns trust in steps.','Test: who is accountable when it is wrong?'],
 ['Share what we learn','We release tools and data when we can, and explain our reasoning when we cannot. The field moves faster when results can be checked.','Test: would we be comfortable showing our working?']
];
var TM=[
 {n:'Research',hc:9,d:'Asks the questions nobody has answered yet, designs the studies and decides what counts as a result.',ul:['Six research programmes','Evaluation sets and benchmarks','Papers, preprints and open datasets'],give:'Validated results and test sets',get:'Real failures from the field'},
 {n:'Engineering',hc:12,d:'Turns a promising result into software and hardware that someone else can run, maintain and trust.',ul:['Models, platforms and applications','Embedded firmware and edge runtimes','Tooling, pipelines and releases'],give:'Releasable systems and runbooks',get:'Validated results and test sets'},
 {n:'Field and operations',hc:6,d:'Installs, monitors and supports what we build, then brings back the data and problems that start the next question.',ul:['Site surveys and installation','Monitoring, drift and support','Customer training and handover'],give:'Data and problems from live use',get:'Releasable systems and runbooks'}
];
var PEOPLE=[
 ['Lena Brandt','Research Lead','Small models and evaluation','Leads the on-device and multi-agent programmes. Writes the evaluation before the experiment, and holds everyone else to it.',41,'/research#p-01','P-01 AND P-03','/team/team-1.jpg'],
 ['Amara Okoye','Research Engineer','Perception and sensor fusion','Works on vision that stays reliable as the world changes, from camera calibration to vehicles that navigate without satellites.',42,'/research#p-04','P-04 AND P-06','/team/team-2.jpg'],
 ['Mateo Sato','AI Engineer','On-device inference','Gets models onto chips with a few hundred kilobytes of memory, and measures what every decision costs in energy.',43,'/research#p-02','P-02 AND P-05','/team/team-3.jpg'],
 ['Jonas Weber','Systems and Operations','Deployment and reliability','Keeps deployed systems honest. Owns monitoring, rollbacks and the handover to the teams who run what we build.',44,'/work#p-07','FIELD CASE FILES','/team/team-4.jpg']
];
var ROLES=[
 ['Research Engineer, On-device AI','Research','Remote or hybrid','FULL TIME','Compress and evaluate models for microcontroller-class devices, and publish the results.',['Strong Python and one deep learning framework','Experience measuring accuracy under data shift','Comfort with embedded constraints is a plus']],
 ['Perception Engineer, Robotics','Engineering','Hybrid','FULL TIME','Build localisation and perception for vehicles that cannot rely on satellite positioning.',['C++ and Python in production','Sensor fusion or SLAM experience','Willingness to test outdoors']],
 ['Applied Scientist, Multi-agent systems','Research','Remote or hybrid','FULL TIME','Design and evaluate agent systems that check one another, and decide when the extra cost is worth it.',['Experience with LLM tooling and evaluation','Strong experimental discipline','Clear technical writing']],
 ['Field Systems Engineer','Field and operations','On site, travel','FULL TIME','Install, monitor and support deployed systems, and bring back the data that starts the next question.',['Linux, networking and observability','Calm under pressure at a customer site','Interest in hardware']]
];
var CUL=['We write things down. Decisions, results and failures live in documents, not heads.','Small teams own whole problems, from the question to the deployment.','Disagreement is welcome if it comes with a test.','Time to read, think and publish is part of the job.'];

/* manifesto */
var abM=$('#abM'),abHero=$('#top'),words=[];
safe(function manifesto(){
  var raw=abM.dataset.t;var parts=raw.split(/(\[[^\]]+\])/);var out='';
  parts.forEach(function(p){
    var k=p.charAt(0)==='[';var t=k?p.slice(1,-1):p;
    t.split(/\s+/).filter(Boolean).forEach(function(w){out+='<span class="w'+(k?' k':'')+'">'+esc(w)+'</span> '});
  });
  abM.innerHTML=out;words=$$('.w',abM);
  if(RM||!window.matchMedia('(min-height:480px)').matches){abM.classList.add('static');abHero.classList.add('flat')}
},'manifesto');
function mTick(){
  if(abM.classList.contains('static'))return;
  var r=abHero.getBoundingClientRect(),total=abHero.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/Math.max(1,total*.8)));
  var n=words.length,lit=Math.round(p*(n+2));
  words.forEach(function(w,i){w.classList.toggle('on',i<lit)});
  var cue=$('#abCue');if(cue)cue.style.opacity=p>.04?'0':'1';
}
/* story */
var evEls=[],yrEl=$('#abYr'),curYr='';
safe(function story(){
  $('#abEv').innerHTML=EV.map(function(e,i){return '<article class="ab-ev'+(i===0?' on':'')+'" data-y="'+e[0]+'"><span class="y mono">'+e[0]+' / 0'+(i+1)+'</span><h3>'+esc(e[1])+'</h3><p>'+esc(e[2])+'</p><ul class="mono">'+e[3].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></article>'}).join('');
  evEls=$$('.ab-ev');if(RM)evEls.forEach(function(e){e.classList.add('on')});
},'story');
function sTick(){
  if(!evEls.length)return;var p=innerHeight*.5,cur=0;
  evEls.forEach(function(e,i){if(e.getBoundingClientRect().top<=p)cur=i});
  evEls.forEach(function(e,i){e.classList.toggle('on',RM||i<=cur&&i>=cur-0||i===cur)});
  var y=evEls[cur].dataset.y;if(y!==curYr){curYr=y;yrEl.textContent=y;if(!RM){yrEl.classList.remove('sw');void yrEl.offsetWidth;yrEl.classList.add('sw')}}
}
/* beliefs */
safe(function beliefs(){
  var bl=$('#abBl');
  bl.innerHTML=BEL.map(function(b,i){return '<div class="ab-b'+(i===0?' on':'')+'" data-i="'+i+'"><button type="button" aria-expanded="'+(i===0?'true':'false')+'" aria-label="'+esc(b[0])+'"><span class="no mono">0'+(i+1)+'</span><span class="vt">'+esc(b[0])+'</span>'+
    '<span class="ab-bd"><h3>'+esc(b[0])+'</h3><p>'+esc(b[1])+'</p><span class="pr mono">'+esc(b[2])+'</span></span></button></div>'}).join('');
  function on(i){$$('.ab-b',bl).forEach(function(b,k){var o=k===i;b.classList.toggle('on',o);$('button',b).setAttribute('aria-expanded',o?'true':'false')})}
  bl.addEventListener('click',function(e){var b=e.target.closest('.ab-b');if(b)on(+b.dataset.i)});
  if(FINE)bl.addEventListener('pointerover',function(e){if(window.innerWidth<900)return;var b=e.target.closest('.ab-b');if(b&&!b.classList.contains('on'))on(+b.dataset.i)});
},'beliefs');
/* teams loop */
safe(function teams(){
  var host=$('#abLoop'),R=190,C=250,A=[-90,30,150];
  var pt=function(a,r){var t=a*Math.PI/180;return [C+Math.cos(t)*r,C+Math.sin(t)*r]};
  var arcs='';
  for(var i=0;i<3;i++){var a0=A[i]+34,a1=A[(i+1)%3]-34+(i===2?360:0);if(i===0){a1=A[1]-34}if(i===1){a1=A[2]-34}if(i===2){a1=A[0]+360-34}
    var p0=pt(a0,R),p1=pt(a1,R);arcs+='<path class="arc" d="M'+p0[0].toFixed(1)+' '+p0[1].toFixed(1)+' A'+R+' '+R+' 0 0 1 '+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+'" marker-end="url(#abAr)"/>'}
  var svg='<svg viewBox="0 0 500 500" aria-hidden="true" focusable="false"><defs><marker id="abAr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" stroke-width="1.4"/></marker></defs>'+
   '<circle class="ring" cx="250" cy="250" r="120"/><circle class="ring" cx="250" cy="250" r="'+(R+50)+'"/>'+arcs+
   '<text class="ctr b" x="250" y="246">One loop</text><text class="ctr" x="250" y="268">ASK / BUILD / LEARN</text><circle class="pulse" id="abDot" r="5" cx="250" cy="'+(250-R)+'"/></svg>';
  var nodes=TM.map(function(t,i){var p=pt(A[i],R);return '<button type="button" class="ab-node" data-i="'+i+'" style="left:'+(p[0]/5)+'%;top:'+(p[1]/5)+'%" aria-pressed="'+(i===0?'true':'false')+'"><span><b>'+esc(t.n)+'</b><span class="mono">'+pad(t.hc)+' PEOPLE</span></span></button>'}).join('');
  host.innerHTML=svg+nodes;
  var tp=$('#abTp');
  function show(i,sw){var t=TM[i];$$('.ab-node',host).forEach(function(b,k){b.setAttribute('aria-pressed',k===i?'true':'false')});
    tp.innerHTML='<h3>'+esc(t.n)+'</h3><div class="big"><b>'+pad(t.hc)+'</b><span class="mono">PEOPLE / PLACEHOLDER</span></div><p>'+esc(t.d)+'</p><ul>'+t.ul.map(function(u){return '<li>'+esc(u)+'</li>'}).join('')+'</ul>'+
     '<div class="ab-ho mono"><div><span>RECEIVES</span><b>'+esc(t.get)+'</b></div><div><span>HANDS ON</span><b>'+esc(t.give)+'</b></div></div>';
    if(sw&&!RM){tp.classList.remove('sw');void tp.offsetWidth;tp.classList.add('sw')}}
  host.addEventListener('click',function(e){var b=e.target.closest('.ab-node');if(b)show(+b.dataset.i,true)});
  show(0,false);
  var dot=$('#abDot');
  if(!RM){var t0=performance.now();(function tick(t){var a=(-90+((t-t0)/9000)*360)*Math.PI/180;dot.setAttribute('cx',(C+Math.cos(a)*R).toFixed(1));dot.setAttribute('cy',(C+Math.sin(a)*R).toFixed(1));requestAnimationFrame(tick)})(t0)}
  else dot.setAttribute('r',0);
},'teams');
function pad(n){return (n<10?'0':'')+n}
/* people */
safe(function people(){
  $('#abRs').innerHTML=PEOPLE.map(function(p,i){return '<article class="ab-pr" data-rv style="--i:'+(i%2)+'"><span class="n mono">0'+(i+1)+'</span>'+
   '<div><h3>'+esc(p[0])+'</h3><span class="rl mono">'+esc(p[1]).toUpperCase()+' / '+esc(p[2]).toUpperCase()+'</span></div>'+
   '<div><p>'+esc(p[3])+'</p><a class="lk mono" href="'+p[5]+'">'+p[6]+' →</a></div>'+
   '<div class="ph"><img src="'+p[7]+'" width="720" height="900" alt="Portrait of '+esc(p[0])+'" loading="lazy"></div></article>'}).join('');
},'people');
/* join */
safe(function join(){
  $('#abCul').innerHTML=CUL.map(function(c,i){return '<li><span class="mono">0'+(i+1)+'</span><span>'+esc(c)+'</span></li>'}).join('');
  $('#abRl').innerHTML=ROLES.map(function(r,i){return '<div class="ab-ro" data-i="'+i+'"><button type="button" class="ab-rh" aria-expanded="false" aria-controls="rb'+i+'" id="rh'+i+'"><span><b>'+esc(r[0])+'</b><small class="mono">'+r[1].toUpperCase()+' / '+r[2].toUpperCase()+'</small></span><span class="tg mono">'+r[3]+'</span><span class="ab-pm" aria-hidden="true"></span></button>'+
   '<div class="ab-rb" id="rb'+i+'" role="region" aria-labelledby="rh'+i+'" inert><div><div class="ab-rbi"><p>'+esc(r[4])+'</p><ul>'+r[5].map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
   '<a class="btn pri mag" href="mailto:hello@minibyte.ai?subject='+encodeURIComponent('Application: '+r[0])+'" style="justify-self:start">Apply by email <span class="ar">→</span></a></div></div></div></div>'}).join('');
  $('#abRl').addEventListener('click',function(e){var h=e.target.closest('.ab-rh');if(!h)return;var r=h.parentNode,on=!r.classList.contains('open');
    r.classList.toggle('open',on);h.setAttribute('aria-expanded',on?'true':'false');var b=$('.ab-rb',r);if(on)b.removeAttribute('inert');else b.setAttribute('inert','')});
},'join');
lazyImgs(document);
addEventListener('scroll',function(){mTick();sTick()},{passive:true});addEventListener('resize',function(){mTick();sTick()});
mTick();sTick();
setTimeout(function(){html.classList.add('ready')},RM?0:650);
onScroll();


}
