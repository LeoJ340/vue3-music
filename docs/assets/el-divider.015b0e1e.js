import{z as c,W as p,d as i,j as u,c as v,o as s,a as o,a5 as a,u as r,k as m,ah as f,am as y,n as S,a6 as h}from"./index.809f82e6.js";const _=c({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:p(String),default:"solid"}}),k=i({name:"ElDivider"}),b=i({...k,props:_,setup(n){const l=n,e=u("divider"),d=v(()=>e.cssVar({"border-style":l.borderStyle}));return(t,z)=>(s(),o("div",{class:a([r(e).b(),r(e).m(t.direction)]),style:y(r(d)),role:"separator"},[t.$slots.default&&t.direction!=="vertical"?(s(),o("div",{key:0,class:a([r(e).e("text"),r(e).is(t.contentPosition)])},[m(t.$slots,"default")],2)):f("v-if",!0)],6))}});var g=S(b,[["__file","/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);const D=h(g);export{D as E};