// Size visible films from their native dimensions, sharing a height within each row.
function filmRatio(video){return video.videoWidth/video.videoHeight||Number(video.getAttribute('width'))/Number(video.getAttribute('height'))||16/9}
function sizeFilmCard(card,height,gap){
 const preview=card.querySelector(':scope > summary .index-preview,:scope > .index-single .index-preview');
 const videos=[...preview.querySelectorAll('video')];
 videos.forEach(v=>v.style.setProperty('--video-width',`${filmRatio(v)*height}px`));
 const width=videos.reduce((sum,v)=>sum+filmRatio(v)*height,0)+(videos.length-1)*gap;
 card.style.setProperty('--card-width',`${width}px`);card.style.setProperty('--row-height',`${height}px`);
}
function layoutFilms(){
 const mobile=innerWidth<=600,gap=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--film-gap'));
 document.querySelectorAll('.native-row').forEach(row=>{
  const width=row.clientWidth;if(!width)return;
  const cards=[...row.children],videos=[...row.querySelectorAll(':scope > .single-entry > .index-single .index-preview video,:scope > .project-entry > summary .index-preview video,:scope > .film-band .series-films video')];
  const height=(width-(videos.length-1)*gap)/videos.reduce((n,v)=>n+filmRatio(v),0);
  cards.forEach(card=>{
   if(card.classList.contains('film-band')){
    if(mobile){card.style.setProperty('--card-width',`${width}px`);return}
    const items=[...card.querySelectorAll('.project')];let total=gap*(items.length-1);
    items.forEach(item=>{const w=filmRatio(item.querySelector('video'))*height;total+=w;item.style.setProperty('--tile-width',`${w}px`);item.style.setProperty('--tile-height',`${height}px`)});
    card.style.setProperty('--card-width',`${total}px`);
   }else{
    const pv=[...card.querySelectorAll(':scope > summary .index-preview video,:scope > .index-single .index-preview video')];
    const ratio=pv.reduce((n,v)=>n+filmRatio(v),0);
    const h=mobile?Math.min((width-(pv.length-1)*gap)/ratio,pv.length===1&&ratio<1?420:Infinity):height;
    sizeFilmCard(card,h,gap);
   }
  });
 });
 document.querySelectorAll('.project-entry .series-films,#nike-popups .series-films').forEach(container=>{
  const width=container.clientWidth;if(!width)return;
  const items=[...container.querySelectorAll('.project')],allPortrait=items.every(item=>filmRatio(item.querySelector('video'))<1);
  const nike=!!container.closest('#nike-popups');
  const perRow=nike&&!mobile?4:mobile?2:allPortrait?3:2;
  if(container.dataset.columns!==String(perRow)){
   const rows=[];
   for(let i=0;i<items.length;i+=perRow){const row=document.createElement('div');row.className='film-line';items.slice(i,i+perRow).forEach(item=>row.append(item));rows.push(row)}
   container.replaceChildren(...rows);container.dataset.columns=String(perRow);
  }
  if(nike&&!mobile)return;
  for(let i=0;i<items.length;i+=perRow){
   const group=items.slice(i,i+perRow),sum=group.reduce((n,item)=>n+filmRatio(item.querySelector('video')),0);
   const h=Math.min((width-(group.length-1)*gap)/sum,mobile?360:420);
   group.forEach(item=>{item.style.setProperty('--tile-width',`${filmRatio(item.querySelector('video'))*h}px`);item.style.setProperty('--tile-height',`${h}px`)})
  }
 });
}
layoutFilms();
let layoutFrame;
const layoutObserver=new ResizeObserver(()=>{cancelAnimationFrame(layoutFrame);layoutFrame=requestAnimationFrame(layoutFilms)});
document.querySelectorAll('.project-index,.series-films').forEach(el=>layoutObserver.observe(el));
window.addEventListener('resize',()=>{cancelAnimationFrame(layoutFrame);layoutFrame=requestAnimationFrame(layoutFilms)});

document.querySelectorAll('.preview').forEach(video=>video.addEventListener('loadedmetadata',layoutFilms));
