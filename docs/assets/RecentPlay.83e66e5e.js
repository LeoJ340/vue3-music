import{_ as g,d as x,D as c,bp as E,a8 as k,ar as S,a9 as b,aa as w,o as C,a as A,Q as i,R as _,a4 as s,t as B,b as e,w as n,F,f as m,u as v,ab as N,ac as P,ad as R,ae as D}from"./index.92e00ce5.js";/* empty css                        */import{_ as I}from"./index.24ab3331.js";import{N as V}from"./index.44474508.js";import"./el-empty.6570f6e4.js";import"./Download.629aea90.js";const z=o=>(R("data-v-76326514"),o=o(),D(),o),L={class:"flex-vertical-center justify-between"},$={class:"flex-vertical-center"},j=z(()=>s("h3",{class:"m-0"},"\u6BCF\u65E5\u97F3\u4E50\u63A8\u8350",-1)),G={class:"text-14",style:{"margin-left":"10px"}},O={class:"flex",style:{margin:"15px 0"}},Q=x({__name:"RecentPlay",setup(o){const l=c(!1),u=c([]),p=c(0);E().then(t=>{l.value=!1;const{total:a,songs:r}=t;p.value=a,u.value=r}).catch(t=>{t==="\u7F51\u7EDC\u5F02\u5E38"&&(l.value=!0)});const{push:y}=k();function d(t=!0){y(u.value.filter(a=>!a.noCopyrightRcmd),{replace:t,trigger:"playAll"})}return(t,a)=>{const r=S,f=b,h=w;return C(),A(F,null,[i(s("header",null,[s("div",L,[s("div",$,[j,s("span",G,"\u5171"+B(p.value)+"\u9996",1)]),e(r,{underline:!1,type:"primary",disabled:""},{default:n(()=>[m("\u6E05\u7A7A\u5217\u8868")]),_:1})]),s("div",O,[e(h,null,{default:n(()=>[e(f,{round:"",type:"primary"},{default:n(()=>[e(v(N),{theme:"filled",size:"22",onClick:d}),m("\u64AD\u653E\u5168\u90E8")]),_:1}),e(f,{round:"",type:"primary"},{default:n(()=>[e(v(P),{theme:"filled",size:"20",strokeWidth:3,onClick:a[0]||(a[0]=T=>d(!1))})]),_:1})]),_:1})])],512),[[_,!l.value]]),i(e(I,{songs:u.value},null,8,["songs"]),[[_,!l.value]]),i(e(V,null,null,512),[[_,l.value]])],64)}}});var U=g(Q,[["__scopeId","data-v-76326514"]]);export{U as default};
