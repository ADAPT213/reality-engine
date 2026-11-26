import {test} from 'node:test';import assert from 'node:assert/strict';import {clamp,Governor,Transformation,mapPoint,Anchors,effects} from './core.mjs';
test('registry',()=>assert.equal(new Set(effects.map(x=>x.id)).size,14));
test('clamp',()=>assert.equal(clamp(3),1));
test('governor descends',()=>{const g=new Governor();for(let i=0;i<120;i++)g.update(40);assert.equal(g.config.name,'BALANCED')});
test('mirror',()=>assert.equal(mapPoint({x:.25,y:.5},[1,1],true).x,.75));
test('anchor smoothing and expiry',()=>{const a=new Anchors();a.update('hand',{x:0,y:0,confidence:1},0);a.update('hand',{x:1,y:1,confidence:1},100);assert.equal(a.get('hand',100).x,.35);assert.equal(a.get('hand',600).confidence,0)});
test('transformation lifecycle',()=>{const t=new Transformation();t.trigger();for(let i=0;i<40;i++)t.update(.1);assert.equal(t.state,'SUSTAIN');t.release();for(let i=0;i<20;i++)t.update(.1);assert.equal(t.state,'IDLE')});
