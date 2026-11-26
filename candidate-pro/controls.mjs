const $=id=>document.getElementById(id);
const select=$('mode'), dock=$('lenses'), video=$('video'), canvas=$('screen');
const buttons=Array.from(select.options,(option,i)=>{const b=document.createElement('button');b.textContent=option.textContent;b.onclick=()=>choose(i);dock.append(b);return b});
function choose(i){select.selectedIndex=(i+buttons.length)%buttons.length;buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===select.selectedIndex)));buttons[select.selectedIndex].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'})}
choose(select.selectedIndex);
$('hide').onclick=()=>document.body.classList.add('clean');
$('restore').onclick=()=>document.body.classList.remove('clean');
$('pause').onclick=async()=>{try{if(video.paused){await video.play();$('pause').textContent='Pause'}else{video.pause();$('pause').textContent='Resume'}}catch(e){$('status').textContent=e.message}};
$('capture').onclick=()=>{$('status').textContent='Capture unavailable: renderer does not preserve its drawing buffer.'};
dock.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();choose(select.selectedIndex+(e.key==='ArrowRight'?1:-1));buttons[select.selectedIndex].focus()}});
