import{d as e,M as a,j as l,k as t,o as s,a as o,m as i,F as n,r,b as u,w as d,l as c,v as m,e as p,aY as f,n as v,Z as h,N as k,D as w,t as y,u as b,P as x,f as _,R as g,a6 as C,aN as j,Y as z,L as I,J as F,_ as N}from"./index-dc3d111f.js";import{E as R}from"./el-empty-e729f0eb.js";import{u as W}from"./typeFormate-147c73de.js";import{N as D}from"./index-507063c8.js";import{t as P}from"./index-865c390b.js";import{F as Y}from"./FolderPlus-80526e7b.js";const A={class:"flex justify-between"},E={class:"left"},J=["onClick"],L={class:"right"},M={class:"cover"},S=["onClick"],U=N(e({__name:"Songs",setup(e){a();const N=[{key:0,text:"全部"},{key:7,text:"华语"},{key:96,text:"欧美"},{key:8,text:"日本"},{key:16,text:"韩国"}],U=l(N[0]),Z=l([]),q=l(!1),B=l(!1);function G(){q.value||(q.value=!0,f(U.value.key).then((e=>{Z.value=e})).catch((e=>{"网络异常"===e&&(B.value=!0)})).finally((()=>{q.value=!1})))}function H(){P(Z.value.map((e=>e.id)))}G();const{push:K,playImmediately:O}=t();function Q(){K(Z.value.map(W),{replace:!0,trigger:"playAll"})}function T(e){if(e.noCopyrightRcmd)return;const a=Z.value.findIndex((a=>a.id===e.id));K(Z.value.map(W),{replace:!0,starIndex:a,trigger:"doubleClick"})}return(e,a)=>{const l=v,t=z,f=I,P=F,K=R,V=h,X=k;return s(),o(n,null,[i("div",A,[i("div",E,[(s(),o(n,null,r(N,(e=>i("span",{class:w({active:e.key===U.value.key}),onClick:a=>function(e){Z.value.length=0,U.value=e,G()}(e)},y(e.text),11,J))),64))]),i("div",L,[u(l,{type:"primary",size:"small",round:"",onClick:Q},{default:d((()=>[u(b(x),{theme:"filled",size:"18",strokeWidth:2}),_("播放全部")])),_:1}),u(l,{size:"small",round:"",onClick:H,disabled:!Z.value.length},{default:d((()=>[u(b(Y),{theme:"outline",size:"18",strokeWidth:2}),_("收藏全部")])),_:1},8,["disabled"])])]),c((s(),p(V,{"element-loading-text":"载入中...",data:Z.value,stripe:"","show-header":!1,"tooltip-effect":"light","tooltip-options":{placement:"bottom-end"},onRowDblclick:T},{empty:d((e=>[u(K,{description:"暂无音乐"})])),default:d((()=>[u(t,{type:"index",width:"50"}),u(t,{label:"封面","show-overflow-tooltip":!0},{default:d((e=>[i("div",M,[i("div",{class:"cover-img",onClick:a=>b(O)(b(W)(e.row))},[u(f,{src:e.row.album.picUrl,lazy:""},null,8,["src"]),u(b(x),{theme:"filled",size:"22",strokeWidth:2})],8,S),i("span",null,y(e.row.name),1)])])),_:1}),u(t,{label:"歌手",width:"180","show-overflow-tooltip":!0},{default:d((e=>[u(g,{artists:e.row.artists},null,8,["artists"])])),_:1}),u(t,{label:"专辑",width:"180","show-overflow-tooltip":!0},{default:d((e=>[u(P,{underline:!1,onClick:a=>b(C)(e.row.album.id)},{default:d((()=>[_(y(e.row.album.name),1)])),_:2},1032,["onClick"])])),_:1}),u(t,{label:"时长",width:"100"},{default:d((e=>[i("span",null,y(b(j)(e.row.duration/1e3)),1)])),_:1})])),_:1},8,["data"])),[[m,!B.value],[X,q.value]]),c(u(D,null,null,512),[[m,B.value]])],64)}}}),[["__scopeId","data-v-07999b8b"]]);export{U as default};
