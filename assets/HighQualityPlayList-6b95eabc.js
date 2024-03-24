import{I as e,b as t,d as l,y as a,z as i,j as s,A as o,B as n,o as r,e as c,w as u,u as d,h as f,C as h,m as p,f as m,t as v,a as k,r as C,D as g,F as y,G as w,H as x,l as j,v as _,E as z,J as L,n as b,K as H,L as W,_ as B}from"./index-dc3d111f.js";import{E as I}from"./el-divider-778becdd.js";import{C as M}from"./index-570b64c6.js";import{N as D}from"./index-507063c8.js";import"./count-e681277b.js";import"./el-empty-e729f0eb.js";const R=e("filter",!0,(function(e){return t("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[t("path",{d:"M6 9L20.4 25.8178V38.4444L27.6 42V25.8178L42 9H6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null)])})),T=e("help",!0,(function(e){return t("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[t("path",{d:"M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M24 28.6248V24.6248C27.3137 24.6248 30 21.9385 30 18.6248C30 15.3111 27.3137 12.6248 24 12.6248C20.6863 12.6248 18 15.3111 18 18.6248",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M24 37.6248C25.3807 37.6248 26.5 36.5055 26.5 35.1248C26.5 33.7441 25.3807 32.6248 24 32.6248C22.6193 32.6248 21.5 33.7441 21.5 35.1248C21.5 36.5055 22.6193 37.6248 24 37.6248Z",fill:e.colors[2]},null)])})),V={class:"flex justify-between items-center"},Z={class:"cate-list"},A=["onClick"],E={class:"grid-col3"},U={class:"text-12 flex"},q={class:"text-12"},F=B(l({__name:"HighQualityPlayList",setup(e){const{currentTheme:l}=a(i()),B=s(!1),F=s([]);o().then((e=>{B.value=!1,F.value=e})).catch((e=>{"网络异常"===e&&(B.value=!0)}));const G=f(),J=s(G.query.cat||"全部"),K=n([]);function N(e){h({cat:J.value,limit:50,before:e}).then((e=>{B.value=!1,K.push(...e.playlists)})).catch((e=>{"网络异常"===e&&(B.value=!0)}))}function P(e){e!==J.value&&(K.length=0,J.value=e,N())}N();const Q=s(null);function S(e){var t;if(Q.value&&Q.value.wrapRef.scrollHeight<=e.scrollTop+(null==(t=Q.value)?void 0:t.wrapRef.offsetHeight)){N(K[K.length-1].updateTime)}}return(e,a)=>{const i=L,s=b,o=I,n=H,f=W;return r(),c(d(z),{ref_key:"scrollbarRef",ref:Q,"view-style":"padding: 0 20px;",onScroll:S},{default:u((()=>[p("header",V,[p("h3",null,[m("精品歌单"),t(i,{href:"https://music.163.com/#/topic?id=202001",target:"_blank",underline:!1,title:"如何成为精品歌单？"},{default:u((()=>[t(d(T),{theme:"outline",size:"18",strokeWidth:3})])),_:1})]),t(n,{placement:"bottom-start",width:"600",trigger:"click",effect:"dark"===d(l)?"dark":"light"},{reference:u((()=>[t(s,{round:""},{default:u((()=>[t(d(R),{theme:"outline",size:"16",strokeWidth:3}),m(v(J.value),1)])),_:1})])),default:u((()=>[p("div",{class:"all-cate",onClick:a[0]||(a[0]=e=>P("全部"))},"全部歌单"),t(o),p("div",Z,[(r(!0),k(y,null,C(F.value,(e=>(r(),k("div",{class:g(["cate-item",{active:e.name===J.value}]),onClick:t=>P(e.name)},v(e.name),11,A)))),256))])])),_:1},8,["effect"])]),p("div",E,[(r(!0),k(y,null,C(K,(e=>(r(),c(M,{mode:"horizontal","image-url":e.coverImgUrl,"image-size":"200px","play-count":e.playCount,"icon-placement":"bottom-right","icon-transition":"el-fade-in-linear",onClick:t=>d(w)(e.id)},{default:u((()=>{var l;return[t(i,{underline:!1,onClick:t=>d(w)(e.id)},{default:u((()=>[m(v(e.name),1)])),_:2},1032,["onClick"]),p("p",U,[m(" by "+v(e.creator.nickname)+" ",1),e.creator.avatarDetail?(r(),c(f,{key:0,src:null==(l=e.creator.avatarDetail)?void 0:l.identityIconUrl,style:{"margin-left":"2px",width:"15px"}},null,8,["src"])):x("",!0)]),p("p",q,v(e.copywriter),1)]})),_:2},1032,["image-url","play-count","onClick"])))),256))]),j(t(D,null,null,512),[[_,B.value]])])),_:1},512)}}}),[["__scopeId","data-v-3570f9fd"]]);export{F as default};