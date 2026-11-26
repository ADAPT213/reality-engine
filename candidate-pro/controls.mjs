const $=id=>document.getElementById(id);
const select=$('mode'), dock=$('lenses'), video=$('video'), canvas=$('screen');
const buttons=Array.from(select.options,(option,i)=>{const b=document.createElement('button');b.textContent=option.textContent;b.onclick=()=>choose(i);dock.append(b);return b});
function choose(i){select.selectedIndex=(i+buttons.length)%buttons.length;buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===select.selectedIndex)));buttons[select.selectedIndex].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'})}
choose(select.selectedIndex);
$('hide').onclick=()=>document.body.classList.add('clean');
$('restore').onclick=()=>document.body.classList.remove('clean');
$('pause').onclick=async()=>{try{if(video.paused){await video.play();$('pause').textContent='Pause'}else{video.pause();$('pause').textContent='Resume'}}catch(e){$('status').textContent=e.message}};
$('capture').onclick=()=>{if(video.paused){$('status').textContent='Start or resume camera before capture';return}dispatchEvent(new Event('reality-capture'))};
dock.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();choose(select.selectedIndex+(e.key==='ArrowRight'?1:-1));buttons[select.selectedIndex].focus()}});

const add=(name,fn)=>{const b=document.createElement('button');b.textContent=name;b.onclick=fn;$('settings').append(b);return b};
add('Enable tracking',()=>dispatchEvent(new Event('reality-track')));
add('Charge',()=>dispatchEvent(new Event('reality-charge')));
add('Release',()=>dispatchEvent(new Event('reality-release')));
const quality=document.createElement('select');quality.setAttribute('aria-label','Quality');for(const n of ['AUTO','BATTERY','BALANCED','QUALITY','ULTRA'])quality.add(new Option(n,n));quality.onchange=()=>dispatchEvent(new CustomEvent('reality-quality',{detail:quality.value}));$('settings').append(quality);
let recorder, chunks=[],recordStream;
const record=add('Record',()=>{try{if(recorder?.state==='recording'){recorder.stop();return}if(!canvas.captureStream||!globalThis.MediaRecorder)throw Error('Recording unsupported');if(video.paused)throw Error('Start camera first');recordStream=canvas.captureStream(30);chunks=[];recorder=new MediaRecorder(recordStream);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=()=>{const blob=new Blob(chunks,{type:recorder.mimeType});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='reality-engine.'+(blob.type.includes('mp4')?'mp4':'webm');a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);recordStream.getTracks().forEach(t=>t.stop());chunks=[];record.textContent='Record'};recorder.onerror=e=>{$('status').textContent=e.error?.message??'Recording failed';recordStream?.getTracks().forEach(t=>t.stop())};recorder.start(1000);record.textContent='Stop recording'}catch(e){$('status').textContent=e.message;recordStream?.getTracks().forEach(t=>t.stop())}});
$('stop').addEventListener('click',()=>{if(recorder?.state==='recording')recorder.stop()});document.addEventListener('visibilitychange',()=>{if(document.hidden&&recorder?.state==='recording')recorder.stop()});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(e=>{$('status').textContent='Offline shell unavailable: '+e.message});
