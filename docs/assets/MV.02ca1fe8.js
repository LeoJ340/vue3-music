import{_ as A,d as N,I as w,D as f,as as T,ac as j,a as n,a4 as e,b as a,w as h,F as r,r as u,i as I,o,f as y,u as l,bi as k,a5 as z,t as i,ae as E,e as S,aw as W,at as q}from"./index.809f82e6.js";import{u as $}from"./count.b035295c.js";import{e as G,f as L,g as U}from"./mv.d4baffcf.js";import{U as O,D as P}from"./UpSmall.02acaa33.js";const H={class:"flex justify-between",style:{"margin-top":"10px"}},J={class:"flex-vertical-center m-0"},K={class:"area-list"},Q=["onClick"],X={class:"mv-list"},Y=["onClick"],Z={style:{"margin-top":"5px"}},ee={class:"play-count"},te={class:"flex justify-between",style:{"margin-top":"10px"}},se={class:"flex-vertical-center m-0"},ae={class:"mv-list"},oe=["onClick"],ne={style:{"margin-top":"5px"}},ie={class:"play-count"},le={class:"flex justify-between",style:{"margin-top":"30px"}},ce={class:"flex-vertical-center m-0"},re={class:"area-list"},ue=["onClick"],_e={class:"top-mv-list"},de={class:"top-mv-item"},he={class:"flex-center",style:{width:"10%"}},pe={style:{"font-weight":"100",opacity:"0.6"}},me={class:"text-center"},ve={key:0},fe={class:"info"},ye={class:"text-14"},ke={class:"text-12"},xe=N({__name:"MV",setup(Ce){const x=["\u5185\u5730","\u6E2F\u53F0","\u6B27\u7F8E","\u65E5\u672C","\u97E9\u56FD"],_=w({area:"\u5185\u5730",limit:8}),C=f([]);function V(){L(_).then(s=>{C.value=s})}V();function D(s){_.area=s,V()}const g=f([]);G(8,1).then(s=>{g.value=s});const d=w({area:"\u5185\u5730",limit:10}),M=f([]);function F(){U(d).then(s=>{M.value=s})}function b(s){d.area=s,F()}F();const B=q();function p(s){B.push(`/mv/${s}`)}return(s,Ve)=>{const m=I("router-link"),v=T,R=j;return o(),n(r,null,[e("div",H,[a(m,{to:`/allMV?area=${_.area}`},{default:h(()=>[e("h3",J,[y("\u6700\u65B0MV"),a(l(k),{theme:"outline",size:"22"})])]),_:1},8,["to"]),e("div",K,[(o(),n(r,null,u(x,t=>e("div",{class:z(["area-item",{active:_.area===t}]),onClick:c=>D(t)},i(t),11,Q)),64))])]),e("ul",X,[(o(!0),n(r,null,u(C.value,t=>(o(),n("li",{class:"mv-item",onClick:c=>p(t.id)},[a(v,{src:t.cover,fit:"cover"},null,8,["src"]),e("div",Z,i(t.name),1),e("div",ee,[a(l(E),{theme:"outline",size:"22",strokeWidth:2}),e("span",null,i(l($)(t.playCount)),1)])],8,Y))),256))]),e("div",te,[a(m,{to:"/allMV?type=\u7F51\u6613\u51FA\u54C1"},{default:h(()=>[e("h3",se,[y("\u7F51\u6613\u51FA\u54C1"),a(l(k),{theme:"outline",size:"22"})])]),_:1})]),e("ul",ae,[(o(!0),n(r,null,u(g.value,t=>(o(),n("li",{class:"mv-item",onClick:c=>p(t.id)},[a(v,{src:t.cover,fit:"contain"},null,8,["src"]),e("div",ne,i(t.name),1),e("div",ie,[a(l(E),{theme:"outline",size:"22",strokeWidth:2}),e("span",null,i(l($)(t.playCount)),1)])],8,oe))),256))]),e("div",le,[a(m,{to:`/topMV?area=${d.area}`},{default:h(()=>[e("h3",ce,[y("MV\u6392\u884C\u699C"),a(l(k),{theme:"outline",size:"22"})])]),_:1},8,["to"]),e("div",re,[(o(),n(r,null,u(x,t=>e("div",{class:z(["area-item",{active:d.area===t}]),onClick:c=>b(t)},i(t),11,ue)),64))])]),e("ul",_e,[(o(!0),n(r,null,u(M.value,(t,c)=>(o(),n("li",de,[e("div",he,[e("div",null,[e("h2",pe,i(c+1<10?"0":"")+i(c+1),1),e("div",me,[c+1===t.lastRank?(o(),n("span",ve,"-")):(o(),S(W(c+1>t.lastRank?l(O):l(P)),{key:1,theme:"outline",size:"18",strokeWidth:3}))])])]),a(R,{style:{width:"45%"},onClick:ge=>p(t.id)},{default:h(()=>[a(v,{src:t.cover,fit:"contain",lazy:""},null,8,["src"])]),_:2},1032,["onClick"]),e("div",fe,[e("p",ye,i(t.name),1),e("p",ke,i(t.artistName),1)])]))),256))])],64)}}});var Ee=A(xe,[["__scopeId","data-v-d5e7b10e"]]);export{Ee as default};