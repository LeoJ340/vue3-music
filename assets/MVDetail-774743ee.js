import{I as e,b as l,d as s,j as a,o as t,e as o,w as r,h as i,E as u,l as n,v as d,m as v,u as m,S as c,f as p,a as f,H as h,t as k,Q as C,T as x,r as y,R as j,F as g,U as b,n as w,J as z}from"./index-dc3d111f.js";import{C as _}from"./index-570b64c6.js";import{N as L}from"./index-507063c8.js";import{c as N,d as W,e as H,f as M}from"./mv-fcbe85b3.js";import{u as U}from"./count-e681277b.js";import{U as V}from"./UpOne-73142051.js";import{S as F}from"./Share-6726625e.js";import{F as D}from"./FolderPlus-80526e7b.js";import{D as S}from"./Download-48887c7a.js";import"./el-empty-e729f0eb.js";const T=e("good-two",!0,(function(e){return l("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[l("path",{d:"M4.18898 22.1733C4.08737 21.0047 5.00852 20 6.18146 20H10C11.1046 20 12 20.8954 12 22V41C12 42.1046 11.1046 43 10 43H7.83363C6.79622 43 5.93102 42.2068 5.84115 41.1733L4.18898 22.1733Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),l("path",{d:"M18 21.3745C18 20.5388 18.5194 19.7908 19.2753 19.4345C20.9238 18.6574 23.7329 17.0938 25 14.9805C26.6331 12.2569 26.9411 7.33595 26.9912 6.20878C26.9982 6.05099 26.9937 5.89301 27.0154 5.73656C27.2861 3.78446 31.0543 6.06492 32.5 8.47612C33.2846 9.78471 33.3852 11.504 33.3027 12.8463C33.2144 14.2825 32.7933 15.6699 32.3802 17.0483L31.5 19.9845H42.3569C43.6832 19.9845 44.6421 21.2518 44.2816 22.5281L38.9113 41.5436C38.668 42.4051 37.8818 43 36.9866 43H20C18.8954 43 18 42.1046 18 41V21.3745Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])})),B={class:"flex"},I={style:{flex:"2"}},Z={class:"flex-vertical-center"},A={key:0,controls:"",autoplay:"",style:{width:"90%"}},E=["src"],G={class:"flex items-center",style:{margin:"10px 0"}},J={style:{"margin-left":"5px"}},O={class:"text-14"},P={class:"flex items-center"},Q={style:{flex:"1"}},R=v("h3",null,"相关推荐",-1),$={class:"text-12 flex-vertical-center"},q=s({__name:"MVDetail",setup(e){const s=i(),q=a(s.params.id),K=a(),X=a(0),Y=a(),ee=a(),le=a(!1),se=a(!1);return N(Number(q.value)).then((e=>{se.value=!1,K.value=e})).catch((e=>{"网络异常"===e&&(se.value=!0)})),W(Number(q.value)).then((e=>{Y.value=e})),H(Number(q.value)).then((e=>{X.value=e.likedCount})),M(Number(q.value)).then((e=>{ee.value=e})),(e,s)=>{const a=b,i=w,N=z,W=u;return t(),o(W,{"view-style":"padding: 0 20px;"},{default:r((()=>{var u,b,w,z,W,H,M;return[n(v("div",B,[v("div",I,[v("div",Z,[v("a",{onClick:s[0]||(s[0]=l=>e.$router.back())},[v("h3",null,[l(m(c),{theme:"outline",size:"22",style:{"vertical-align":"bottom"}}),p("MV详情")])])]),K.value?(t(),f("video",A,[v("source",{src:null==(u=Y.value)?void 0:u.url,type:"video/mp4"},null,8,E)])):h("",!0),v("div",G,[l(a,{src:null==(b=K.value)?void 0:b.artists[0].img1v1Url},null,8,["src"]),v("span",J,k(null==(w=K.value)?void 0:w.artists.map((e=>e.name)).join("/")),1)]),v("h2",null,[p(k(null==(z=K.value)?void 0:z.name)+" ",1),(t(),o(C(le.value?m(x):m(V)),{theme:"filled",size:"22",style:{"margin-left":"10px",cursor:"pointer"},onClick:s[1]||(s[1]=e=>le.value=!le.value)}))]),v("p",O,[v("span",null,"发布："+k(null==(W=K.value)?void 0:W.publishTime),1),p("      "),v("span",null,"播放："+k(m(U)(null==(H=K.value)?void 0:H.playCount))+"次",1)]),n(v("p",null,k(null==(M=K.value)?void 0:M.desc),513),[[d,le.value]]),v("div",P,[l(i,{round:""},{default:r((()=>[l(m(T),{theme:"outline",size:"20",strokeWidth:2}),p("赞("+k(X.value)+")",1)])),_:1}),l(i,{round:""},{default:r((()=>{var e;return[l(m(D),{theme:"outline",size:"20",strokeWidth:2}),p("收藏("+k(null==(e=K.value)?void 0:e.subCount)+")",1)]})),_:1}),l(i,{round:""},{default:r((()=>{var e;return[l(m(F),{theme:"outline",size:"20",strokeWidth:2}),p("分享("+k(null==(e=K.value)?void 0:e.shareCount)+")",1)]})),_:1}),l(i,{round:""},{default:r((()=>[l(m(S),{theme:"outline",size:"20",strokeWidth:2}),p("下载MV")])),_:1})])]),v("div",Q,[R,(t(!0),f(g,null,y(ee.value,(e=>(t(),o(_,{mode:"horizontal","image-url":e.coverUrl,"image-size":"200px","play-count":e.playTime},{default:r((()=>[l(N,{underline:!1},{default:r((()=>[p(k(e.title),1)])),_:2},1024),v("p",$,[p(" by  "),l(j,{artists:e.creator.map((e=>({id:e.userId,name:e.userName})))},null,8,["artists"])])])),_:2},1032,["image-url","play-count"])))),256))])],512),[[d,!se.value]]),n(l(L,null,null,512),[[d,se.value]])]})),_:1})}}});export{q as default};
