import{d as f,D as r,ap as _,b9 as d,c as y,ba as v,bb as b,u as t,e as u,h as E,bc as P,o as i,at as g}from"./index.de62e014.js";import{E as k}from"./el-empty.f4f1d9ae.js";import{b as R}from"./playlist.4b120550.js";const x=f({__name:"MyPlayList",setup(L){g();const l=E(),s=r(l.params.id),{myPlayList:c}=_(d()),a=y(()=>c.value.find(e=>String(e.id)===s.value)||null),o=r([]);function n(){s.value!=="undefined"&&R(Number(s.value)).then(e=>{o.value=e})}n(),v(e=>{s.value=e.params.id,n()});const p=b(()=>P(()=>import("./index.f0031cb3.js"),["assets/index.f0031cb3.js","assets/index.3d1c84b9.css","assets/index.de62e014.js","assets/index.072d8a6a.css","assets/el-empty.f4f1d9ae.js","assets/el-empty.fd551ec9.css","assets/el-button-group.70d92cf0.js","assets/el-button-group.0687c171.css","assets/count.b035295c.js","assets/FolderPlus.89f9494a.js","assets/UpOne.4ce5ea6f.js"]));return(e,T)=>{const m=k;return t(a)?(i(),u(t(p),{key:0,"playlist-info":t(a),songs:o.value},null,8,["playlist-info","songs"])):(i(),u(m,{key:1,description:"\u6682\u65E0\u6570\u636E"}))}}});export{x as default};