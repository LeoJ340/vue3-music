import{al as e,aE as t,d as s,a9 as a,c as r,o as i,a as o,D as l,u as n,aa as d,H as c,a5 as u,ae as p,aK as v}from"./index-dc3d111f.js";const f=e({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:t(String),default:"solid"}}),m=s({name:"ElDivider"});const y=v(p(s({...m,props:f,setup(e){const t=e,s=a("divider"),p=r((()=>s.cssVar({"border-style":t.borderStyle})));return(e,t)=>(i(),o("div",{class:l([n(s).b(),n(s).m(e.direction)]),style:u(n(p)),role:"separator"},[e.$slots.default&&"vertical"!==e.direction?(i(),o("div",{key:0,class:l([n(s).e("text"),n(s).is(e.contentPosition)])},[d(e.$slots,"default")],2)):c("v-if",!0)],6))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]));export{y as E};
