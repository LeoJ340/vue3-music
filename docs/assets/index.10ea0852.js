import{_ as h,d as g,c as o,o as s,a as i,a4 as a,b as l,am as c,u as t,ae as r,t as p,ah as k,k as C,a5 as m,as as x}from"./index.809f82e6.js";import{u as z}from"./count.b035295c.js";const _={key:0,class:"play-count"},P=g({__name:"index",props:{mode:null,imageUrl:null,imageSize:null,playCount:null,iconPlacement:null,iconTransition:null},emits:["click"],setup(e,{emit:u}){const n=e,d=o(()=>{if(n.iconPlacement==="center")return{top:"50%",left:"50%",transform:"translate(-50%, -50%)"};if(n.iconPlacement==="bottom-right")return{bottom:"10px",right:"5px"}});o(()=>{});function y(){u("click")}return(f,S)=>{const v=x;return s(),i("div",{class:m(["flex",{"flex-column":e.mode==="vertical"}])},[a("div",{class:"cover-image",onClick:y},[l(v,{src:e.imageUrl,style:c({width:e.mode==="horizontal"?e.imageSize:"100%"})},null,8,["src","style"]),e.playCount?(s(),i("div",_,[l(t(r),{theme:"outline",size:"22",strokeWidth:2}),a("span",null,p(t(z)(e.playCount)),1)])):k("",!0),l(t(r),{class:"play-icon",style:c([t(d)]),theme:"filled",size:"32",strokeWidth:2},null,8,["style"])]),a("div",{class:m({"mt-5":e.mode==="vertical","ml-5":e.mode==="horizontal"})},[C(f.$slots,"default",{},void 0,!0)],2)],2)}}});var I=h(P,[["__scopeId","data-v-149626c3"]]);export{I as C};