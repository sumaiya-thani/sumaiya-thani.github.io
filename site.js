(function(){
var root=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var els=[].slice.call(document.querySelectorAll('[data-ar]')),en=els.map(function(e){return e.innerHTML});
var lg=document.querySelector('.lg'),mb=document.querySelector('.mb'),nav=document.querySelector('.nav'),yr=document.getElementById('y');
function split(el,txt){
var out='';txt.split('').forEach(function(ch){out+=ch===' '?' ':(ch==='.'?'<em>.</em>':'<span class="c" aria-hidden="true">'+ch+'</span>')});
el.setAttribute('aria-label',txt);el.innerHTML=out;
}
function menuLabel(){var o=nav.classList.contains('open'),ar=root.lang==='ar';mb.textContent=o?(ar?'إغلاق':'Close'):(ar?'القائمة':'Menu')}
function apply(l){
root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
els.forEach(function(e,i){
if(e.hasAttribute('data-split')){if(l==='ar'){e.removeAttribute('aria-label');e.textContent=e.getAttribute('data-ar')}else split(e,en[i]);return}
e.innerHTML=l==='ar'?e.getAttribute('data-ar'):en[i];
});
lg.textContent=l==='ar'?'English':'العربية';
lg.setAttribute('aria-label',l==='ar'?'Switch to English':'التبديل إلى العربية');
menuLabel();
yr=document.getElementById('y');if(yr)yr.textContent=new Date().getFullYear();
try{localStorage.setItem('lang',l)}catch(e){}
}
lg.addEventListener('click',function(){apply(root.lang==='ar'?'en':'ar')});
var start='en';try{if(localStorage.getItem('lang')==='ar')start='ar'}catch(e){}
apply(start);
/* mobile menu */
function set(o){nav.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);menuLabel()}
mb.addEventListener('click',function(){set(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
/* cursor + hover preview (delegated, so it survives language swaps) */
if(fine&&!rm){
var cur=document.getElementById('cur'),pv=document.getElementById('pv'),last='';
addEventListener('mousemove',function(e){
cur.classList.add('on');cur.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)';
var t=e.target.closest?e.target:null,a=t&&t.closest('a,button,summary'),d=t&&t.closest('[data-img]');
cur.classList.toggle('big',!!a);
if(d){if(last!==d.dataset.img){pv.src=d.dataset.img;last=d.dataset.img}pv.classList.add('on');pv.style.transform='translate('+(e.clientX+30)+'px,'+(e.clientY-90)+'px) rotate(-2deg)'}else{pv.classList.remove('on');last=''}
});
document.addEventListener('mouseleave',function(){cur.classList.remove('on');pv.classList.remove('on')});
}
/* filters */
var fb=document.querySelectorAll('.fl button'),its=document.querySelectorAll('.it'),em=document.querySelector('.empty');
fb.forEach(function(b){b.addEventListener('click',function(){
fb.forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');
var n=0;its.forEach(function(i){var s=b.dataset.f==='all'||i.dataset.c===b.dataset.f;i.hidden=!s;if(s)n++});
if(em)em.style.display=n?'none':'block';
})});
/* lightbox */
var lb=document.getElementById('lb');
if(lb){var li=lb.querySelector('img');
document.addEventListener('click',function(e){var im=e.target.closest&&e.target.closest('.shots img');if(im){li.src=im.src;li.alt=im.alt;lb.showModal()}});
lb.addEventListener('click',function(){lb.close()});}
})();
