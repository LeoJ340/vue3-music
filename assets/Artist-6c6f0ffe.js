import{I as e,b as t,d as i,B as a,j as l,bB as n,o as s,a as o,m as r,F as u,r as c,l as d,v,w as k,n as p,N as y,D as f,f as m,t as C,u as x,a7 as h,s as j,x as g,J as _,L as w,_ as L}from"./index-dc3d111f.js";import{f as z}from"./artist-cb89e4bc.js";import{N as B}from"./index-507063c8.js";import"./el-empty-e729f0eb.js";const M=e("me",!1,(function(e){return t("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M24 23C26.7614 23 29 20.7614 29 18C29 15.2386 26.7614 13 24 13C21.2386 13 19 15.2386 19 18C19 20.7614 21.2386 23 24 23Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M10.022 38.332C10.3657 33.1206 14.7016 29 20 29H28C33.2914 29 37.6229 33.1097 37.9767 38.3113",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])})),W=e=>(j("data-v-f7710894"),e=e(),g(),e),H={class:"screening-condition"},I=W((()=>r("span",null,"语种:",-1))),N={class:"screening-condition"},Z=W((()=>r("span",null,"分类:",-1))),b={class:"initials-screening-condition"},A=W((()=>r("span",{style:{width:"160px"}},"筛选:",-1))),D={class:"initials"},F={"element-loading-text":"载入中...",class:"artist-list"},J=["onClick"],U={class:"flex-horizontal-center"},E=L(i({__name:"Artist",setup(e){const i=[{key:-1,text:"全部"},{key:7,text:"华语"},{key:96,text:"欧美"},{key:8,text:"日本"},{key:16,text:"韩国"},{key:0,text:"其他"}],j=[{key:-1,text:"全部"},{key:1,text:"男歌手"},{key:2,text:"女歌手"},{key:3,text:"乐队"}],g=["热门","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"],L=a({area:-1,type:-1,initial:"热门"}),W=l(1),E=n(l(50)),G=l([]),K=l(!0);const O=l(!1),P=l(!1);function Q(){O.value||(O.value=!0,z({page:W.value,limit:E.value,area:L.area,type:L.type,initial:L.initial}).then((e=>{P.value=!1,G.value.push(...e.artists),K.value=e.more})).catch((e=>{"网络异常"===e&&(P.value=!0)})).finally((()=>{O.value=!1})))}function R(){W.value++,Q()}return Q(),(e,a)=>{const l=_,n=w,z=p,E=y;return s(),o(u,null,[r("div",H,[I,(s(),o(u,null,c(i,(e=>r("span",{class:f({"condition-item":!0,active:e.key===L.area})},[t(l,{underline:!1,onClick:t=>{return i=e.key,L.area=i,W.value=1,G.value=[],void Q();var i}},{default:k((()=>[m(C(e.text),1)])),_:2},1032,["onClick"])],2))),64))]),r("div",N,[Z,(s(),o(u,null,c(j,(e=>r("span",{class:f({"condition-item":!0,active:e.key===L.type})},[t(l,{underline:!1,onClick:t=>{return i=e.key,L.type=i,W.value=1,G.value=[],void Q();var i}},{default:k((()=>[m(C(e.text),1)])),_:2},1032,["onClick"])],2))),64))]),r("div",b,[A,r("div",D,[(s(),o(u,null,c(g,(e=>r("span",{class:f({"condition-item":!0,active:e===L.initial})},[t(l,{underline:!1,onClick:t=>{return i=e,L.initial=i,W.value=1,G.value=[],void Q();var i}},{default:k((()=>[m(C(e),1)])),_:2},1032,["onClick"])],2))),64))])]),d((s(),o("div",F,[(s(!0),o(u,null,c(G.value,(e=>(s(),o("div",{class:"artist-item",onClick:t=>x(h)(e.id)},[t(n,{src:e.img1v1Url},null,8,["src"]),t(l,{underline:!1,onClick:t=>x(h)(e.id)},{default:k((()=>[m(C(e.name),1)])),_:2},1032,["onClick"]),t(x(M),{theme:"outline",size:"18",fill:"#f54c43"})],8,J)))),256))])),[[v,!P.value],[E,O.value]]),d(r("div",U,[t(z,{type:"primary",round:"",loading:O.value,onClick:R},{default:k((()=>[m("加载更多")])),_:1},8,["loading"])],512),[[v,K.value]]),d(t(B,null,null,512),[[v,P.value]])],64)}}}),[["__scopeId","data-v-f7710894"]]);export{E as default};
