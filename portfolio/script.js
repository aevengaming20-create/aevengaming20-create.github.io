(function(){
'use strict';
var CONTACT_EMAIL='aevengaming20@gmail.com'; // the contact form opens the visitor's mail app addressed to this email
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
var menu=$('.menu'),nav=$('#nav');
menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.textContent=o?'Close':'Menu'});
var top=$('.top');window.addEventListener('scroll',function(){top.hidden=window.scrollY<400});
top.addEventListener('click',function(){window.scrollTo({top:0})});
// Home: typing effect
var t=$('#typed');
if(t){var words=['Student','Front end coder','Anime fan'],w=0,c=words[0].length,del=true,still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!still)(function tick(){var word=words[w];t.textContent=word.slice(0,c);
if(del){c--;if(c<0){del=false;w=(w+1)%words.length;c=0}}else{c++;if(c>words[w].length){del=true;c=words[w].length;return setTimeout(tick,1400)}}
setTimeout(tick,del?45:90)})()}
// About: tabs
var tabs=$$('[role=tab]');
tabs.forEach(function(b,i){
b.addEventListener('click',function(){pick(b)});
b.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:-1;if(n<0)return;var nb=tabs[(n+tabs.length)%tabs.length];nb.focus();pick(nb)})});
function pick(sel){tabs.forEach(function(b){var on=b===sel;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;$('#'+b.getAttribute('aria-controls')).hidden=!on})}
// Projects: filter
var fb=$$('[data-f]');
fb.forEach(function(b){b.addEventListener('click',function(){
fb.forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});
$$('#items [data-type]').forEach(function(c){c.hidden=!(b.dataset.f==='all'||c.dataset.type===b.dataset.f)})})});
// Contact: validation
var f=$('#form');
if(f){f.addEventListener('submit',function(e){e.preventDefault();var ok=true,st=$('#status');
[['n','Enter your name.'],['e','Enter a valid email address.'],['m','Write a message.']].forEach(function(a){
var el=$('#'+a[0]),bad=!el.value.trim()||(a[0]==='e'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
el.setAttribute('aria-invalid',bad);$('[data-for='+a[0]+']').textContent=bad?a[1]:'';if(bad)ok=false});
if(!ok){st.textContent='Fix the highlighted fields and send again.';return}
if(!CONTACT_EMAIL){st.textContent='Email is not set up yet. Please contact me on GitHub.';return}
location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Message from '+$('#n').value)+'&body='+encodeURIComponent($('#m').value+'\n\n'+$('#n').value+' ('+$('#e').value+')');
st.textContent='Opening your email app...';f.reset()})}
})();
