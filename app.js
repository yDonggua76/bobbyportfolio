const $=s=>document.querySelector(s);
const projects={
"sk-ii-main":"SK-II / Campaign Film",
"sk-ii-protection":"SK-II / Protection — 6s",
"sk-ii-cyndi":"SK-II / Cyndi Wang — 520",
"clinique-d11":"CLINIQUE / Double 11",
"el-cvd":"ESTÉE LAUDER / CVD — Gift Collection",
"jml-sage":"JO MALONE LONDON / Wood Sage & Sea Salt — FULLY AI-GENERATED",
"nike-tab":"NIKE / JA 3 — Tab Icon",
"sk-ii-uvcc":"SK-II / UVCC — Japan",
"sk-ii-vday":"SK-II / Valentine’s Day",
"sk-ii-christmas":"SK-II / Christmas Livestream — FULLY AI-GENERATED",
"ai-clinique":"CLINIQUE / Butterflies — FULLY AI-GENERATED",
"ai-drop":"MATERIAL STUDY / Golden Drop — FULLY AI-GENERATED",
"ai-pear":"JO MALONE LONDON / Pear Garden — FULLY AI-GENERATED",
"ai-bluebell":"JO MALONE LONDON / Wild Bluebell — FULLY AI-GENERATED",
"ai-hay":"JO MALONE LONDON / Hay — FULLY AI-GENERATED",
"ai-columns":"JO MALONE LONDON / Roman Columns — FULLY AI-GENERATED",
"ai-x5-city":"ESTÉE LAUDER / X5 — City — FULLY AI-GENERATED",
"ai-x5-sea":"ESTÉE LAUDER / X5 — Sea — FULLY AI-GENERATED",

'meeting':'SK-II × VML / MEETING FILM — 2026',
'mk-main':'SK-II × MAISON KITSUNÉ / PINK BOTTLE',
'mk-gift':'SK-II × MAISON KITSUNÉ / GIFT',
'mk-social':'SK-II × MAISON KITSUNÉ / MK PINK — TIKTOK',
'mk-short':'SK-II × MAISON KITSUNÉ / 6S',
'mk-jp':'SK-II × MAISON KITSUNÉ / MK PINK — JAPAN',
'bobbi-brown':'BOBBI BROWN / LUNAR NEW YEAR — AI-ASSISTED MOTION',
'sk-ii-sakura':'SK-II / SAKURA',
'jml-cny':'JO MALONE LONDON / LUNAR NEW YEAR',
'origins-holiday':'ORIGINS / HOLIDAY',
'ocean':'LA MER / OCEAN CLUB',
'sk-ii-mms':'SK-II / MMS VIDEO',
'sk-ii-cctv':'SK-II / CCTV — 15S',
'sk-ii-pt':'SK-II / PT — PRODUCT FILM',
'jml-popup':'JO MALONE LONDON / BATH & BODY — POP-UP',
'bytedance-op1':'BYTEDANCE / RECRUITMENT WEBSITE — OPTION 1',
'bytedance-op2':'BYTEDANCE / RECRUITMENT WEBSITE — OPTION 2',
'bytedance-secondary':'BYTEDANCE / RECRUITMENT WEBSITE — SECONDARY SECTION',
'vivo':'vivo / ORIGINOS — PITCH',
'nike':'NIKE / JA 3 — CHINA TOUR',
'nike-book2':'NIKE / BOOK 2 — THE PHOENIX',
'nike-aj40':'NIKE / AIR JORDAN 40',
'nike-ja3-launch':'NIKE / JA 3 — LAUNCH',
'serum':'SK-II / FACIAL TREATMENT SERUM',
'sk-ii-genoptics':'SK-II / GENOPTICS INFINITAURA ESSENCE',
'dog-grooming':'JO MALONE LONDON / DOG GROOMING — FULLY AI-GENERATED',
'jml-vineyard':'JO MALONE LONDON / FRAGRANCE STUDIES — VINEYARD / FULLY AI-GENERATED',
'jml-bergamot':'JO MALONE LONDON / FRAGRANCE STUDIES — BERGAMOT / FULLY AI-GENERATED'};
const series={bytedance:{'bytedance-op1':'OPTION 1','bytedance-op2':'OPTION 2','bytedance-secondary':'SECONDARY SECTION'},nike:{'nike-book2':'BOOK 2','nike-aj40':'AIR JORDAN 40','nike':'JA 3 — CHINA TOUR','nike-ja3-launch':'JA 3 — LAUNCH'},mk:{'mk-jp':'JAPAN','mk-main':'PRODUCT','mk-gift':'GIFT','mk-social':'TIKTOK','mk-short':'6S'},jml:{'jml-vineyard':'VINEYARD','jml-bergamot':'BERGAMOT'}};
const previews=[...document.querySelectorAll('.preview')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches,lastFocus;
function visible(v){const r=v.getBoundingClientRect();return !v.closest('[hidden]')&&!(v.closest('details:not([open])')&&!v.closest('summary'))&&r.bottom>0&&r.top<innerHeight;}
function sync(){
 previews.forEach(v=>{if(paused||document.hidden||document.querySelector('dialog[open]')||!visible(v)){v.pause();return}if(v.dataset.src&&!v.getAttribute('src'))v.src=v.dataset.src;v.play().catch(()=>{})});
 $('#motion-toggle').textContent=paused?'PLAY':'PAUSE';$('#motion-toggle').setAttribute('aria-label',paused?'Play previews':'Pause previews');
}
previews.forEach(v=>v.addEventListener('loadedmetadata',()=>{const project=v.closest('.project');if(project&&v.videoWidth&&v.videoHeight){project.style.setProperty('--ratio',`${v.videoWidth}/${v.videoHeight}`)}}));
const detailMotions=new WeakMap();
function expandSeries(section,expand){
 const content=section.querySelector(':scope > .series-content'),previous=detailMotions.get(section);
 const summary=section.querySelector(':scope > summary'),label=summary.querySelector('.disclosure-copy');
 if(label)label.textContent=expand?label.dataset.open:label.dataset.closed;
 summary.setAttribute('aria-expanded',String(expand));
 const start=section.open?content.getBoundingClientRect().height:0;
 previous?.cancel();section.open=true;content.style.overflow='hidden';
 if(expand)layoutFilms();
 const end=expand?content.scrollHeight:0;
 if(reduced.matches){section.open=expand;content.style.overflow='';sync();return}
 const motion=content.animate([{height:`${start}px`,opacity:start?1:0},{height:`${end}px`,opacity:expand?1:0}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
 detailMotions.set(section,motion);section.dataset.expanding=String(expand);sync();
 motion.onfinish=()=>{if(detailMotions.get(section)!==motion)return;section.open=expand;content.style.overflow='';detailMotions.delete(section);delete section.dataset.expanding;sync()};
}
document.querySelectorAll('details.project-entry, details.more-work').forEach(section=>{
 section.querySelector(':scope > summary').setAttribute('aria-expanded',String(section.open));
 section.addEventListener('toggle',()=>{const summary=section.querySelector(':scope > summary'),label=summary.querySelector('.disclosure-copy');if(!detailMotions.has(section)){summary.setAttribute('aria-expanded',String(section.open));if(label)label.textContent=section.open?label.dataset.open:label.dataset.closed}sync()});
 section.querySelector('summary').addEventListener('click',e=>{e.preventDefault();expandSeries(section,section.dataset.expanding?section.dataset.expanding!=='true':!section.open)});
});
document.querySelectorAll('.collapse-series').forEach(button=>button.addEventListener('click',()=>{const section=button.closest('details');expandSeries(section,false);section.querySelector('summary').focus({preventScroll:true})}));
const observer=new IntersectionObserver(sync,{threshold:.01});previews.forEach(v=>observer.observe(v));
document.addEventListener('visibilitychange',sync);$('#motion-toggle').onclick=()=>{paused=!paused;sync()};reduced.addEventListener('change',e=>{paused=e.matches;sync()});
function syncNavigation(){
 const sections=[...document.querySelectorAll('.work-category')];
 let active=sections.filter(s=>s.getBoundingClientRect().top<=100).at(-1)?.id;
 document.querySelectorAll('[data-section]').forEach(a=>{const current=a.dataset.section===active;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
}
function route(smooth=false){
 const id=location.hash.slice(1)||'top',target=document.getElementById(id);
 if(target)requestAnimationFrame(()=>{target.scrollIntoView({behavior:smooth&&!reduced.matches?'smooth':'instant'});sync();syncNavigation()});
}
window.addEventListener('hashchange',()=>route(false));
window.addEventListener('popstate',()=>route(false));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const hash=link.getAttribute('href');if(!document.getElementById(hash.slice(1)))return;event.preventDefault();if(location.hash!==hash)history.pushState(null,'',hash);route(true)}));
window.addEventListener('scroll',syncNavigation,{passive:true});
window.addEventListener('pageshow',()=>route(false));
const dialog=$('#film-dialog'),player=$('#film-player');
function openFilm(key){
 if(!projects[key])return;const firstOpen=!dialog.open;if(firstOpen)lastFocus=document.activeElement;
 const sourceVideo=document.querySelector(`[data-project="${key}"]`)?.querySelector('video')||lastFocus?.querySelector('video');
 const origin=sourceVideo?.getBoundingClientRect();setFilmRatio(sourceVideo?Number(sourceVideo.getAttribute('width'))/Number(sourceVideo.getAttribute('height')):16/9);
 const parts=projects[key].split(' / '),brand=parts.shift();
 $('#film-title').textContent=parts.join(' / ').replace(/ — (FULLY AI-GENERATED|AI-ASSISTED MOTION)| \/ FULLY AI-GENERATED/g,'');$('#film-client').textContent=brand;$('#film-client-meta').textContent=brand;
 const isPure=projects[key].includes('FULLY AI-GENERATED'),isAssisted=projects[key].includes('AI-ASSISTED');
 const entry=document.querySelector(`[data-project="${key}"]`),category=entry?.closest('.work-category')?.id;
 $('#film-kind').textContent=isPure?'Pure AI':isAssisted?'AI-assisted Motion':category==='video'||key==='meeting'?'Video':'Motion';$('#film-error').hidden=true;player.src=`assets/${key}.mp4`;player.poster=`assets/${key}.jpg`;$('#series-nav').replaceChildren();
 const variants=Object.values(series).find(group=>Object.hasOwn(group,key));
 if(variants)Object.entries(variants).forEach(([id,label])=>{const b=document.createElement('button');b.textContent=label;b.classList.toggle('current',key===id);b.setAttribute('aria-pressed',String(key===id));b.onclick=()=>openFilm(id);$('#series-nav').append(b)});
 if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');sync();player.play().catch(()=>{});animateCinema(firstOpen?origin:null);
}
document.querySelectorAll('[data-project]').forEach(b=>b.onclick=()=>openFilm(b.dataset.project));
$('#close-film').onclick=closeCinema;
dialog.addEventListener('cancel',event=>{event.preventDefault();closeCinema()});
player.addEventListener('error',()=>{if(dialog.open&&player.getAttribute('src'))$('#film-error').hidden=false});
$('#retry-film').onclick=()=>{$('#film-error').hidden=true;player.load();player.play().catch(()=>{})};
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();$('#film-error').hidden=true;document.body.classList.remove('modal-open');sync();lastFocus?.focus()});
const openingFilms=['mk-jp','meeting'];let openingIndex=0;
function selectOpening(key){
 openingIndex=openingFilms.indexOf(key);const v=$('#hero-video');if(!reduced.matches){v.animate([{opacity:.2,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});$('.opening-controls').animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:550,easing:'ease-out'})}v.poster=`assets/${key}.jpg`;v.src=`assets/${key}.mp4`;$('.hero-hit').dataset.project=key;$('.hero-hit').setAttribute('aria-label',key==='meeting'?'Play SK-II x VML Meeting film':'Play MK Pink Japan film');document.querySelectorAll('[data-hero]').forEach(a=>a.setAttribute('aria-pressed',String(a.dataset.hero===key)));sync();
}
document.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>selectOpening(b.dataset.hero));$('#hero-video').addEventListener('ended',()=>selectOpening(openingFilms[(openingIndex+1)%openingFilms.length]));
const companies=[...document.querySelectorAll('.company-button')];
function expandCompany(button){const expanding=button.getAttribute('aria-expanded')!=='true';companies.forEach(b=>{const open=b===button&&expanding;b.setAttribute('aria-expanded',String(open));document.getElementById(b.getAttribute('aria-controls')).hidden=!open});requestAnimationFrame(sync)}
companies.forEach(b=>b.onclick=()=>expandCompany(b));
const info=$('#info-dialog');$('#info-open').onclick=()=>{lastFocus=document.activeElement;info.showModal();$('#info-open').setAttribute('aria-expanded','true');document.body.classList.add('modal-open');sync()};$('#info-close').onclick=()=>info.close();info.addEventListener('close',()=>{$('#info-open').setAttribute('aria-expanded','false');document.body.classList.remove('modal-open');sync();lastFocus?.focus()});$('#view-experience').onclick=()=>{info.close();location.hash='#top';if($('#company-vml').getAttribute('aria-expanded')!=='true')expandCompany($('#company-vml'));requestAnimationFrame(()=>$('#company-vml').focus())};
const clockTime=n=>{if(!Number.isFinite(n))return '00:00';return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(Math.floor(n%60)).padStart(2,'0')}`};
function playerStatus(){
 $('#film-clock').textContent=`${clockTime(player.currentTime)} / ${clockTime(player.duration)}`;
 $('#film-seek').value=Number.isFinite(player.duration)&&player.duration>0?player.currentTime/player.duration*100:0;
 $('#film-toggle').textContent=player.paused?'PLAY':'PAUSE';$('#film-toggle').setAttribute('aria-label',player.paused?'Play film':'Pause film');
 $('#film-sound').textContent=player.muted?'SOUND ON':'SOUND OFF';$('#film-sound').setAttribute('aria-label',player.muted?'Unmute film':'Mute film');
}
['timeupdate','loadedmetadata','play','pause','volumechange','ended','emptied'].forEach(event=>player.addEventListener(event,playerStatus));
$('#film-toggle').onclick=()=>{if(player.paused)player.play().catch(()=>{});else player.pause()};
$('#film-sound').onclick=()=>{player.muted=!player.muted};
$('#film-seek').addEventListener('input',e=>{if(Number.isFinite(player.duration))player.currentTime=Number(e.target.value)/100*player.duration});
$('#film-fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen?.();else if($('.cinema-frame').requestFullscreen)$('.cinema-frame').requestFullscreen().catch(()=>{});else player.webkitEnterFullscreen?.()};

const cinema=$('.cinema-frame');let cinemaMotion,cinemaClosing=false;
function setFilmRatio(ratio){
 if(!Number.isFinite(ratio)||ratio<=0)ratio=16/9;
 cinema.style.setProperty('--film-ratio',ratio);
 const gap=innerWidth<=600?16:24;
 const width=Math.min(innerWidth-gap,(innerHeight-gap)*ratio),height=width/ratio;
 cinema.classList.toggle('is-compact',width<680);cinema.classList.toggle('is-short',height<360);
}
player.addEventListener('loadedmetadata',()=>setFilmRatio(player.videoWidth/player.videoHeight));
window.addEventListener('resize',()=>{if(dialog.open)setFilmRatio(player.videoWidth/player.videoHeight)});
function animateCinema(origin){
 cinemaClosing=false;cinemaMotion?.cancel();
 if(reduced.matches)return;
 const target=cinema.getBoundingClientRect();
 const usable=origin&&origin.width>0&&origin.height>0&&origin.bottom>0&&origin.top<innerHeight;
 const transform=usable?`translate(${origin.x+origin.width/2-target.x-target.width/2}px,${origin.y+origin.height/2-target.y-target.height/2}px) scale(${Math.max(.12,origin.width/target.width)},${Math.max(.12,origin.height/target.height)})`:'scale(.94)';
 cinemaMotion=cinema.animate([{transform,opacity:.35},{transform:'none',opacity:1}],{duration:720,easing:'cubic-bezier(.22,1,.36,1)'});
 [$('.cinema-top'),$('.cinema-title'),$('.cinema-bottom'),$('.seek-wrap')].forEach((el,i)=>el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:480,delay:120+i*75,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
}
function closeCinema(){
 if(!dialog.open||cinemaClosing)return;
 if(reduced.matches){dialog.close();return}
 cinemaClosing=true;player.pause();
 const current=getComputedStyle(cinema).transform;cinemaMotion?.cancel();
 const source=lastFocus?.querySelector('video')?.getBoundingClientRect(),target=cinema.getBoundingClientRect();
 const end=source&&source.width&&source.bottom>0&&source.top<innerHeight?`translate(${source.x+source.width/2-target.x-target.width/2}px,${source.y+source.height/2-target.y-target.height/2}px) scale(${Math.max(.12,source.width/target.width)},${Math.max(.12,source.height/target.height)})`:'scale(.94)';
 cinemaMotion=cinema.animate([{transform:current,opacity:1},{transform:end,opacity:0}],{duration:360,easing:'cubic-bezier(.4,0,.6,1)',fill:'forwards'});
 cinemaMotion.onfinish=()=>{dialog.close();cinemaMotion.cancel();cinemaClosing=false};
}
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;revealObserver.unobserve(target);if(!reduced.matches)target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'})})},{threshold:.12});
document.querySelectorAll('.project-entry,.single-entry,.film-band,.category-heading').forEach(el=>revealObserver.observe(el));
if(!reduced.matches){$('.intro').animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'none'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});$('.opening-media').animate([{opacity:0,transform:'scale(.91)'},{opacity:1,transform:'scale(1)'}],{duration:1000,delay:140,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'})}
let swipeStart;
$('.hero-hit').addEventListener('pointerdown',e=>{swipeStart={x:e.clientX,y:e.clientY}});
$('.hero-hit').addEventListener('pointerup',e=>{if(!swipeStart)return;const x=e.clientX-swipeStart.x,y=e.clientY-swipeStart.y;swipeStart=null;if(Math.abs(x)>60&&Math.abs(x)>Math.abs(y)*1.5){selectOpening(openingFilms[(openingIndex+1)%openingFilms.length]);$('.hero-hit').dataset.swiped='true'}});
$('.hero-hit').addEventListener('click',e=>{if(e.currentTarget.dataset.swiped){delete e.currentTarget.dataset.swiped;e.stopImmediatePropagation();e.preventDefault()}},true);
$('.hero-hit').addEventListener('pointercancel',()=>{swipeStart=null});
route();

