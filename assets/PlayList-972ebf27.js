import{d as e,j as a,y as l,V as s,c as t,k as i,a0 as n,o as u,e as r,w as d,h as o,a1 as p,E as v,a as c,b as m,m as f,t as y,u as g,X as h,P as x,f as _,q as k,H as b,l as j,v as z,Q as C,T,L,U,n as W,p as w,_ as P}from"./index-dc3d111f.js";/* empty css                        */import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-4f43fd4c.js";import{u as H}from"./count-e681277b.js";import{F as I}from"./FolderPlus-80526e7b.js";import{S as D}from"./Share-6726625e.js";import{D as M}from"./Download-48887c7a.js";import{U as N}from"./UpOne-73142051.js";import"./el-empty-e729f0eb.js";const S={key:0,class:"flex",style:{margin:"20px"}},q={class:"flex-1",style:{"margin-left":"20px"}},A={class:"flex-vertical-center"},B={class:"flex-vertical-center"},E={style:{"margin-left":"10px","font-size":"12px"}},G={key:0,style:{"margin-left":"10px","font-size":"12px",color:"#a4a4a4"}},O={key:1,style:{"margin-left":"10px","font-size":"12px",color:"#a4a4a4"}},Q={class:"flex",style:{margin:"15px 0"}},R={key:0,class:"text-14"},V={class:"text-14",style:{"margin-top":"2px"}},X={style:{"margin-left":"10px"}},J={key:1,class:"flex justify-between text-14",style:{"margin-top":"2px"}},K=["innerHTML"],Y=P(e({__name:"PlayList",setup(e){const P=o(),Y=a(P.params.id),Z=a(),$=a([]),{myPlayList:ee}=l(s()),ae=t((()=>ee.value.collected.map((e=>e.id)).includes(Number(Y.value)))),le=a(!1);function se(){"undefined"!==Y.value&&p(Number(Y.value)).then((e=>{var a;Z.value=e,$.value=e.tracks,document.title=null==(a=Z.value)?void 0:a.name}))}se();const{push:te}=i();function ie(e=!0){te($.value.filter((e=>!e.noCopyrightRcmd)),{replace:e,trigger:"playAll"})}return n((async e=>{Y.value=e.params.id,se()})),(e,a)=>{const l=L,s=U,t=W,i=w,n=v;return u(),r(n,null,{default:d((()=>[Z.value?(u(),c("div",S,[m(l,{src:Z.value.coverImgUrl,class:"coverImage"},null,8,["src"]),f("div",q,[f("div",A,[f("h2",null,y(Z.value.name),1)]),f("div",B,[m(s,{src:Z.value.creator.avatarUrl},null,8,["src"]),f("span",E,y(Z.value.creator.nickname),1),Z.value.updateTime?(u(),c("span",G," 最近更新"+y(g(h)(Z.value.updateTime)),1)):(u(),c("span",O,y(g(h)(Z.value.createTime))+"创建 ",1))]),f("div",Q,[m(i,null,{default:d((()=>[m(t,{type:"primary",round:"",disabled:!$.value.length,onClick:ie},{default:d((()=>[m(g(x),{theme:"filled",size:"22"}),_("播放全部")])),_:1},8,["disabled"]),m(t,{type:"primary",round:"",disabled:!$.value.length,onClick:a[0]||(a[0]=e=>ie(!1))},{default:d((()=>[m(g(k),{theme:"filled",size:"20",strokeWidth:3})])),_:1},8,["disabled"])])),_:1}),m(t,{round:"",disabled:!$.value.length||!g(ae)},{default:d((()=>[m(g(I),{theme:"outline",size:"20",strokeWidth:2}),_("收藏 ")])),_:1},8,["disabled"]),m(t,{round:"",disabled:!$.value.length},{default:d((()=>[m(g(D),{theme:"outline",size:"20",strokeWidth:2}),_("分享 ")])),_:1},8,["disabled"]),m(t,{round:"",disabled:!$.value.length},{default:d((()=>[m(g(M),{theme:"outline",size:"20",strokeWidth:2}),_("下载全部 ")])),_:1},8,["disabled"])]),Z.value.tags&&Z.value.tags.length?(u(),c("div",R,[f("span",null,"标签："+y(Z.value.tags.join("/")),1)])):b("",!0),f("div",V,[f("span",null,"歌曲："+y(Z.value.trackCount),1),f("span",X,"播放："+y(g(H)(Z.value.playCount)),1)]),Z.value.description?(u(),c("div",J,[f("div",null,[f("span",null,"简介："+y(Z.value.description.split("\n")[0]),1),j(f("p",{innerHTML:Z.value.description.split("\n").slice(1,Z.value.description.split("\n").length).join("<br>")},null,8,K),[[z,le.value]])]),Z.value.description.split("\n").length>1?(u(),r(C(le.value?g(N):g(T)),{key:0,theme:"filled",size:"20",strokeWidth:3,onClick:a[1]||(a[1]=e=>le.value=!le.value)})):b("",!0)])):b("",!0)])])):b("",!0),m(F,{songs:$.value},null,8,["songs"])])),_:1})}}}),[["__scopeId","data-v-f327dd96"]]);export{Y as default};