import test from 'node:test';import assert from 'node:assert/strict';import {motion} from './camera.mjs';
test('stationary frame',()=>{const a=new Uint8Array(400);assert.equal(motion(a,a,10,10).activation,false)});
test('motion centroid and mirror',()=>{const a=new Uint8Array(400),b=a.slice();for(let y=0;y<10;y++)for(let x=0;x<2;x++)b[(y*10+x)*4]=255;const m=motion(b,a,10,10),n=motion(b,a,10,10,true);assert.ok(m.activation);assert.ok(m.x<.2);assert.ok(n.x>.8);assert.ok(Math.abs(m.x+n.x-1)<1e-9)});
