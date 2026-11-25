export const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,Number.isFinite(v)?v:min));
export function normalize(raw,profile={}){const {minX=0,maxX=1,minY=0,maxY=1,sensitivity=1}=profile;const axis=(v,a,b)=>clamp((clamp((v-a)/Math.max(.001,b-a))-.5)*sensitivity+.5);return {x:axis(raw.x,minX,maxX),y:axis(raw.y,minY,maxY),intensity:clamp(raw.intensity),activation:!!raw.activation,duration:Math.max(0,raw.duration||0),confidence:clamp(raw.confidence??1)};}
export function pointer(e,r){return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,intensity:e.buttons?1:.4,activation:!!e.buttons};}
export function touch(t,r,active=true){return {x:(t.clientX-r.left)/r.width,y:(t.clientY-r.top)/r.height,intensity:active?1:0,activation:active};}
export function keyboard(s,key){const d=.06;return {...s,x:clamp(s.x+(key==='ArrowRight'?d:key==='ArrowLeft'?-d:0)),y:clamp(s.y+(key==='ArrowDown'?d:key==='ArrowUp'?-d:0)),activation:key===' '||key==='Enter',intensity:1};}
export function advance(stage){return Math.min(4,stage+1)}
