import{_ as k,d as g,c as o,o as a,a as s,a4 as l,b as i,am as c,u as t,ae as r,t as C,ah as m,e as p,k as x,a5 as u,as as z}from"./index.de62e014.js";import{u as P}from"./count.b035295c.js";const _={key:0,class:"play-count"},S=g({__name:"index",props:{mode:null,imageUrl:null,imageSize:null,playCount:null,iconPlacement:null,iconTransition:null},emits:["click"],setup(e,{emit:d}){const n=e,y=o(()=>{if(n.iconPlacement==="center")return{top:"50%",left:"50%",transform:"translate(-50%, -50%)"};if(n.iconPlacement==="bottom-right")return{bottom:"10px",right:"5px"}});o(()=>{});function f(){d("click")}return(v,b)=>{const h=z;return a(),s("div",{class:u(["flex",{"flex-column":e.mode==="vertical"}])},[l("div",{class:"cover-image",onClick:f},[i(h,{src:e.imageUrl,style:c({width:e.mode==="horizontal"?e.imageSize:"100%"})},null,8,["src","style"]),e.playCount?(a(),s("div",_,[i(t(r),{theme:"outline",size:"22",strokeWidth:2}),l("span",null,C(t(P)(e.playCount)),1)])):m("",!0),e.iconPlacement?(a(),p(t(r),{key:1,class:"play-icon",style:c([t(y)]),theme:"filled",size:"32",strokeWidth:2},null,8,["style"])):m("",!0)]),l("div",{class:u({"mt-5":e.mode==="vertical","ml-5":e.mode==="horizontal"})},[x(v.$slots,"default",{},void 0,!0)],2)],2)}}});var N=k(S,[["__scopeId","data-v-32b42d82"]]);export{N as C};