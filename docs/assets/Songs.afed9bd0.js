import{_ as $,d as A,D as p,a8 as L,a9 as N,ab as R,as as V,ad as W,av as j,a as k,a4 as a,F as w,r as O,b as t,w as l,Q,e as U,bh as q,o as m,a5 as G,t as i,u as n,ae as E,f as b,ai as H,at as J}from"./index.809f82e6.js";import{E as K}from"./el-empty.42e189db.js";import{u as f}from"./typeFormate.f6de6737.js";import{F as M}from"./FolderPlus.4ec58b5f.js";const X={class:"flex justify-between"},Y={class:"left"},Z=["onClick"],ee={class:"right"},te={class:"cover"},ae=["onClick"],oe=["onClick"],le=A({__name:"Songs",setup(se){const x=J(),v=[{key:0,text:"\u5168\u90E8"},{key:7,text:"\u534E\u8BED"},{key:96,text:"\u6B27\u7F8E"},{key:8,text:"\u65E5\u672C"},{key:16,text:"\u97E9\u56FD"}],d=p(v[0]),s=p([]),_=p(!1);function h(){_.value=!0,q(d.value.key).then(o=>{s.value=o}).finally(()=>{_.value=!1})}h();function C(o){s.value.length=0,d.value=o,h()}const{push:y,playImmediately:F}=L();function D(){y(s.value.map(f),{replace:!0,trigger:"playAll"})}function B(o){if(o.noCopyrightRcmd)return;const g=s.value.findIndex(r=>r.id===o.id);y(s.value.map(f),{replace:!0,starIndex:g,trigger:"doubleClick"})}function S(o){x.push(`/playlist/${o}`)}return(o,g)=>{const r=N,u=R,z=V,T=K,I=W,P=j;return m(),k(w,null,[a("div",X,[a("div",Y,[(m(),k(w,null,O(v,e=>a("span",{class:G({active:e.key===d.value.key}),onClick:c=>C(e)},i(e.text),11,Z)),64))]),a("div",ee,[t(r,{type:"primary",size:"small",round:"",onClick:D},{default:l(()=>[t(n(E),{theme:"filled",size:"18",strokeWidth:2}),b("\u64AD\u653E\u5168\u90E8")]),_:1}),t(r,{size:"small",round:""},{default:l(()=>[t(n(M),{theme:"outline",size:"18",strokeWidth:2}),b("\u6536\u85CF\u5168\u90E8")]),_:1})])]),Q((m(),U(I,{"element-loading-text":"\u8F7D\u5165\u4E2D...",data:s.value,stripe:"","show-header":!1,"tooltip-effect":"light","tooltip-options":{placement:"bottom-end"},onRowDblclick:B},{empty:l(e=>[t(T,{description:"\u6682\u65E0\u97F3\u4E50"})]),default:l(()=>[t(u,{type:"index",width:"50"}),t(u,{label:"\u5C01\u9762","show-overflow-tooltip":""},{default:l(e=>[a("div",te,[a("div",{class:"cover-img",onClick:c=>n(F)(n(f)(e.row))},[t(z,{src:e.row.album.picUrl,lazy:""},null,8,["src"]),t(n(E),{theme:"filled",size:"22",strokeWidth:2})],8,ae),a("span",null,i(e.row.name),1)])]),_:1}),t(u,{label:"\u6B4C\u624B",width:"180","show-overflow-tooltip":""},{default:l(e=>[a("span",null,i(e.row.artists.map(c=>c.name).join("/")),1)]),_:1}),t(u,{label:"\u4E13\u8F91",width:"180","show-overflow-tooltip":""},{default:l(e=>[a("span",{style:{cursor:"pointer"},onClick:c=>S(e.row.album.id)},i(e.row.album.name),9,oe)]),_:1}),t(u,{label:"\u65F6\u957F",width:"100"},{default:l(e=>[a("span",null,i(n(H)(e.row.duration/1e3)),1)]),_:1})]),_:1},8,["data"])),[[P,_.value]])],64)}}});var ce=$(le,[["__scopeId","data-v-5d854af1"]]);export{ce as default};
