import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const code=await readFile(new URL('../src/main.js',import.meta.url),'utf8');
const handlers={},calls=[];
const context={
  document:{querySelectorAll:()=>[],body:{dataset:{article:'chatgpt-pro'}},addEventListener:(event,handler)=>handlers[event]=handler},
  window:{gtag:(...args)=>calls.push(args)},
  location:{href:'https://imi0801.github.io/chatgpt-plus-guide/chatgpt-pro/'},URL
};
vm.runInNewContext(code,context);
const link={href:'https://www.goplus.pro/chatgpt-pro-recharge?utm_content=test&session=DO_NOT_SEND',dataset:{cta:'article_end',product:'pro'}};
handlers.click({type:'click',button:0,target:{closest:()=>link}});
assert.equal(calls.length,1);
assert.equal(calls[0][1],'outbound_click');
assert.equal(calls[0][2].article_id,'chatgpt-pro');
assert.equal(calls[0][2].product,'pro');
assert.equal(calls[0][2].link_url,'https://www.goplus.pro/chatgpt-pro-recharge');
assert.ok(!JSON.stringify(calls).includes('DO_NOT_SEND'));
handlers.auxclick({type:'auxclick',button:2,target:{closest:()=>link}});
assert.equal(calls.length,1,'right click must not count');
handlers.auxclick({type:'auxclick',button:1,target:{closest:()=>link}});
assert.equal(calls.length,2,'middle click counts once');
handlers.click({type:'click',target:{closest:()=>null}});
assert.equal(calls.length,2,'ordinary links do not count as product clicks');
context.window.gtag=undefined;
assert.doesNotThrow(()=>handlers.click({type:'click',target:{closest:()=>link}}));
console.log('PASS: click tracking, middle/right clicks, blocked analytics, and query redaction.');
