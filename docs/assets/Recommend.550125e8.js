import{aU as pe,Z as Ae,bu as Le,z as he,a$ as ze,D as $,c as D,u as e,bv as ce,J as j,L as ge,a0 as Pe,M as Ve,K as Re,V as Ue,S as _e,d as Z,j as Ce,o as g,a as A,a4 as p,e as U,w as C,Q as ee,a5 as V,aP as X,b as h,O as de,bj as Fe,R as te,T as ve,ag as G,H as Oe,k as ye,aB as oe,F as O,r as K,t as W,n as ke,B as De,I as Ie,bw as He,bx as je,a6 as Ke,a7 as We,_ as Ge,aH as Je,a8 as Qe,ao as Xe,ai as Ye,ah as Ze,by as qe,ax as xe,ar as et,i as tt,f as R,bz as x,aG as ne,ak as fe,bA as at,al as st}from"./index.92e00ce5.js";import{C as Y}from"./index.0c8dcbb2.js";import{a as nt,b as ot,c as lt,C as rt,d as it,e as ut}from"./recommend.f94e5818.js";import{u as ct}from"./typeFormate.f6de6737.js";import"./count.b035295c.js";const we=Symbol("carouselContextKey"),dt=(c,B,i)=>Ae(c.subTree).filter(d=>{var s;return Le(d)&&((s=d.type)==null?void 0:s.name)===B&&!!d.component}).map(d=>d.component.uid).map(d=>i[d]).filter(d=>!!d),vt=(c,B)=>{const i={},n=pe([]);return{children:n,addChild:s=>{i[s.uid]=s,n.value=dt(c,B,i)},removeChild:s=>{delete i[s],n.value=n.value.filter(_=>_.uid!==s)}}},ft=he({initialIndex:{type:Number,default:0},height:{type:String,default:""},trigger:{type:String,values:["hover","click"],default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:{type:String,values:["","none","outside"],default:""},indicator:{type:Boolean,default:!0},arrow:{type:String,values:["always","hover","never"],default:"hover"},type:{type:String,values:["","card"],default:""},loop:{type:Boolean,default:!0},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},pauseOnHover:{type:Boolean,default:!0}}),mt={change:(c,B)=>[c,B].every(ze)},me=300,pt=(c,B,i)=>{const{children:n,addChild:N,removeChild:d}=vt(_e(),"ElCarouselItem"),s=$(-1),_=$(null),E=$(!1),y=$(),M=D(()=>c.arrow!=="never"&&!e(T)),L=D(()=>n.value.some(r=>r.props.label.toString().length>0)),I=D(()=>c.type==="card"),T=D(()=>c.direction==="vertical"),z=ce(r=>{l(r)},me,{trailing:!0}),a=ce(r=>{H(r)},me);function f(){_.value&&(clearInterval(_.value),_.value=null)}function w(){c.interval<=0||!c.autoplay||_.value||(_.value=setInterval(()=>F(),c.interval))}const F=()=>{s.value<n.value.length-1?s.value=s.value+1:c.loop&&(s.value=0)};function l(r){if(Ue(r)){const J=n.value.filter(q=>q.props.name===r);J.length>0&&(r=n.value.indexOf(J[0]))}if(r=Number(r),Number.isNaN(r)||r!==Math.floor(r))return;const S=n.value.length,P=s.value;r<0?s.value=c.loop?S-1:0:r>=S?s.value=c.loop?0:S-1:s.value=r,P===s.value&&u(P),le()}function u(r){n.value.forEach((S,P)=>{S.translateItem(P,s.value,r)})}function o(r,S){var P,J,q,re;const Q=e(n),ie=Q.length;if(ie===0||!r.states.inStage)return!1;const Ee=S+1,Me=S-1,ue=ie-1,Te=Q[ue].states.active,$e=Q[0].states.active,Be=(J=(P=Q[Ee])==null?void 0:P.states)==null?void 0:J.active,Ne=(re=(q=Q[Me])==null?void 0:q.states)==null?void 0:re.active;return S===ue&&$e||Be?"left":S===0&&Te||Ne?"right":!1}function t(){E.value=!0,c.pauseOnHover&&f()}function k(){E.value=!1,w()}function m(r){e(T)||n.value.forEach((S,P)=>{r===o(S,P)&&(S.states.hover=!0)})}function v(){e(T)||n.value.forEach(r=>{r.states.hover=!1})}function b(r){s.value=r}function H(r){c.trigger==="hover"&&r!==s.value&&(s.value=r)}function ae(){l(s.value-1)}function Se(){l(s.value+1)}function le(){f(),w()}j(()=>s.value,(r,S)=>{u(S),S>-1&&B("change",r,S)}),j(()=>c.autoplay,r=>{r?w():f()}),j(()=>c.loop,()=>{l(s.value)}),j(()=>c.interval,()=>{le()}),j(()=>n.value,()=>{n.value.length>0&&l(c.initialIndex)});const se=pe();return ge(()=>{se.value=Pe(y.value,()=>{u()}),w()}),Ve(()=>{f(),y.value&&se.value&&se.value.stop()}),Re(we,{root:y,isCardType:I,isVertical:T,items:n,loop:c.loop,addItem:N,removeItem:d,setActiveItem:l}),{root:y,activeIndex:s,arrowDisplay:M,hasLabel:L,hover:E,isCardType:I,items:n,handleButtonEnter:m,handleButtonLeave:v,handleIndicatorClick:b,handleMouseEnter:t,handleMouseLeave:k,setActiveItem:l,prev:ae,next:Se,throttledArrowClick:z,throttledIndicatorHover:a}},ht=["onMouseenter","onClick"],gt={key:0},_t="ElCarousel",Ct=Z({name:_t}),yt=Z({...Ct,props:ft,emits:mt,setup(c,{expose:B,emit:i}){const n=c,{root:N,activeIndex:d,arrowDisplay:s,hasLabel:_,hover:E,isCardType:y,items:M,handleButtonEnter:L,handleButtonLeave:I,handleIndicatorClick:T,handleMouseEnter:z,handleMouseLeave:a,setActiveItem:f,prev:w,next:F,throttledArrowClick:l,throttledIndicatorHover:u}=pt(n,i),o=Ce("carousel"),t=D(()=>{const m=[o.b(),o.m(n.direction)];return e(y)&&m.push(o.m("card")),m}),k=D(()=>{const m=[o.e("indicators"),o.em("indicators",n.direction)];return e(_)&&m.push(o.em("indicators","labels")),(n.indicatorPosition==="outside"||e(y))&&m.push(o.em("indicators","outside")),m});return B({setActiveItem:f,prev:w,next:F}),(m,v)=>(g(),A("div",{ref_key:"root",ref:N,class:V(e(t)),onMouseenter:v[6]||(v[6]=X((...b)=>e(z)&&e(z)(...b),["stop"])),onMouseleave:v[7]||(v[7]=X((...b)=>e(a)&&e(a)(...b),["stop"]))},[p("div",{class:V(e(o).e("container")),style:oe({height:m.height})},[e(s)?(g(),U(ve,{key:0,name:"carousel-arrow-left",persisted:""},{default:C(()=>[ee(p("button",{type:"button",class:V([e(o).e("arrow"),e(o).em("arrow","left")]),onMouseenter:v[0]||(v[0]=b=>e(L)("left")),onMouseleave:v[1]||(v[1]=(...b)=>e(I)&&e(I)(...b)),onClick:v[2]||(v[2]=X(b=>e(l)(e(d)-1),["stop"]))},[h(e(de),null,{default:C(()=>[h(e(Fe))]),_:1})],34),[[te,(m.arrow==="always"||e(E))&&(n.loop||e(d)>0)]])]),_:1})):G("v-if",!0),e(s)?(g(),U(ve,{key:1,name:"carousel-arrow-right",persisted:""},{default:C(()=>[ee(p("button",{type:"button",class:V([e(o).e("arrow"),e(o).em("arrow","right")]),onMouseenter:v[3]||(v[3]=b=>e(L)("right")),onMouseleave:v[4]||(v[4]=(...b)=>e(I)&&e(I)(...b)),onClick:v[5]||(v[5]=X(b=>e(l)(e(d)+1),["stop"]))},[h(e(de),null,{default:C(()=>[h(e(Oe))]),_:1})],34),[[te,(m.arrow==="always"||e(E))&&(n.loop||e(d)<e(M).length-1)]])]),_:1})):G("v-if",!0),ye(m.$slots,"default")],6),m.indicatorPosition!=="none"?(g(),A("ul",{key:0,class:V(e(k))},[(g(!0),A(O,null,K(e(M),(b,H)=>(g(),A("li",{key:H,class:V([e(o).e("indicator"),e(o).em("indicator",m.direction),e(o).is("active",H===e(d))]),onMouseenter:ae=>e(u)(H),onClick:X(ae=>e(T)(H),["stop"])},[p("button",{class:V(e(o).e("button"))},[e(_)?(g(),A("span",gt,W(b.props.label),1)):G("v-if",!0)],2)],42,ht))),128))],2)):G("v-if",!0)],34))}});var kt=ke(yt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);const It=he({name:{type:String,default:""},label:{type:[String,Number],default:""}}),wt=(c,B)=>{const i=De(we),n=_e(),N=.83,d=$(!1),s=$(0),_=$(1),E=$(!1),y=$(!1),M=$(!1),L=$(!1),{isCardType:I,isVertical:T}=i;function z(l,u,o){const t=o-1,k=u-1,m=u+1,v=o/2;return u===0&&l===t?-1:u===t&&l===0?o:l<k&&u-l>=v?o+1:l>m&&l-u>=v?-2:l}function a(l,u){var o;const t=((o=i.root.value)==null?void 0:o.offsetWidth)||0;return M.value?t*((2-N)*(l-u)+1)/4:l<u?-(1+N)*t/4:(3+N)*t/4}function f(l,u,o){const t=i.root.value;return t?((o?t.offsetHeight:t.offsetWidth)||0)*(l-u):0}const w=(l,u,o)=>{var t;const k=e(I),m=(t=i.items.value.length)!=null?t:Number.NaN,v=l===u;!k&&!je(o)&&(L.value=v||l===o),!v&&m>2&&i.loop&&(l=z(l,u,m));const b=e(T);E.value=v,k?(M.value=Math.round(Math.abs(l-u))<=1,s.value=a(l,u),_.value=e(E)?1:N):s.value=f(l,u,b),y.value=!0};function F(){if(i&&e(I)){const l=i.items.value.findIndex(({uid:u})=>u===n.uid);i.setActiveItem(l)}}return ge(()=>{i.addItem({props:c,states:Ie({hover:d,translate:s,scale:_,active:E,ready:y,inStage:M,animating:L}),uid:n.uid,translateItem:w})}),He(()=>{i.removeItem(n.uid)}),{active:E,animating:L,hover:d,inStage:M,isVertical:T,translate:s,isCardType:I,scale:_,ready:y,handleItemClick:F}},bt=Z({name:"ElCarouselItem"}),St=Z({...bt,props:It,setup(c){const B=c,i=Ce("carousel"),{active:n,animating:N,hover:d,inStage:s,isVertical:_,translate:E,isCardType:y,scale:M,ready:L,handleItemClick:I}=wt(B),T=D(()=>{const a=`${`translate${e(_)?"Y":"X"}`}(${e(E)}px)`,f=`scale(${e(M)})`;return{transform:[a,f].join(" ")}});return(z,a)=>ee((g(),A("div",{class:V([e(i).e("item"),e(i).is("active",e(n)),e(i).is("in-stage",e(s)),e(i).is("hover",e(d)),e(i).is("animating",e(N)),{[e(i).em("item","card")]:e(y)}]),style:oe(e(T)),onClick:a[0]||(a[0]=(...f)=>e(I)&&e(I)(...f))},[e(y)?ee((g(),A("div",{key:0,class:V(e(i).e("mask"))},null,2)),[[te,!e(n)]]):G("v-if",!0),ye(z.$slots,"default")],6)),[[te,e(L)]])}});var be=ke(St,[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);const Et=Ke(kt,{CarouselItem:be}),Mt=We(be);var Tt="/vue3-music/assets/dailySongsBg.2d9b6e0f.jpg";const $t={class:"banner-item"},Bt={class:"flex-vertical-center"},Nt={class:"grid-col5"},At={class:"flex-vertical-center"},Lt={class:"grid-col3"},zt={class:"flex-vertical-center"},Pt={class:"grid-col3"},Vt={class:"text-12"},Rt={class:"flex-vertical-center"},Ut={class:"grid-col3"},Ft=Z({__name:"Recommend",setup(c){const B=Je(),{playImmediately:i}=Qe(),n=$([]);nt().then(a=>{n.value=a}).catch(a=>{a==="\u7F51\u7EDC\u5F02\u5E38"&&Xe({message:"\u7CFB\u7EDF\u5F02\u5E38",type:"error",duration:1e3,center:!0})});const N=$(0);function d(a){N.value=a}function s(a){const f=n.value.findIndex(w=>w.imageUrl===a.imageUrl);if(N.value===f){if(a.targetType===1){at([a.targetId]).then(w=>{i(w[0])});return}a.targetType===10&&st(a.targetId),a.targetType===1e3&&ne(a.targetId),a.url&&window.open(a.url,"_blank")}}const _=$([]),{hasLogin:E}=Ye(Ze());j(E,a=>{a?it().then(f=>{_.value=f.slice(0,9)}):ut(10).then(f=>{_.value=f})},{immediate:!0});function y(){B.push("/dailySongs")}const M=Ie([]);function L(a){const f=M.findIndex(w=>w.id===a);i(ct(M[f]))}qe(0).then(a=>{M.push(...a.slice(0,12))});const I=$([]);ot().then(a=>{I.value=a});function T(a){B.push(`/mv/${a}`)}const z=$();return lt().then(a=>{z.value=a}),(a,f)=>{const w=xe,F=Mt,l=Et,u=tt("router-link"),o=et;return g(),A(O,null,[h(l,{interval:4e3,type:"card",height:"220px",onChange:d},{default:C(()=>[(g(!0),A(O,null,K(n.value,(t,k)=>(g(),U(F,{key:k,onClick:m=>s(t)},{default:C(()=>[p("div",$t,[h(w,{src:t.imageUrl},null,8,["src"]),p("div",{class:"title",style:oe({backgroundColor:t.titleColor})},W(t.typeTitle),5)])]),_:2},1032,["onClick"]))),128))]),_:1}),p("div",Bt,[h(u,{to:"/discover/playlist"},{default:C(()=>[p("h3",null,[R("\u63A8\u8350\u6B4C\u5355"),h(e(x),{theme:"outline",size:"22"})])]),_:1})]),p("div",Nt,[e(E)?(g(),U(Y,{key:0,class:"relative daily-songs",mode:"vertical","image-url":e(Tt),"icon-placement":"bottom-right","icon-transition":"el-fade-in-linear",onClick:y},{default:C(()=>[h(e(rt),{theme:"outline",fill:"#ffffff",onClick:y}),h(o,{underline:!1,onClick:y},{default:C(()=>[R("\u6BCF\u65E5\u6B4C\u66F2\u63A8\u8350")]),_:1})]),_:1},8,["image-url"])):G("",!0),(g(!0),A(O,null,K(_.value,t=>(g(),U(Y,{mode:"vertical","image-url":t.picUrl,"play-count":t.playCount,"icon-placement":"bottom-right","icon-transition":"el-fade-in-linear",onClick:k=>e(ne)(t.id)},{default:C(()=>[h(o,{underline:!1,onClick:k=>e(ne)(t.id)},{default:C(()=>[R(W(t.name),1)]),_:2},1032,["onClick"])]),_:2},1032,["image-url","play-count","onClick"]))),256))]),p("div",At,[h(u,{to:"/privateMVList"},{default:C(()=>[p("h3",null,[R("\u72EC\u5BB6\u653E\u9001"),h(e(x),{theme:"outline",size:"22"})])]),_:1})]),p("div",Lt,[(g(!0),A(O,null,K(z.value,t=>(g(),U(Y,{mode:"vertical","image-url":t.picUrl,"icon-placement":"top-left","icon-transition":"only-show",onClick:k=>T(t.id)},{default:C(()=>[h(o,{underline:!1,onClick:k=>T(t.id)},{default:C(()=>[R(W(t.name),1)]),_:2},1032,["onClick"])]),_:2},1032,["image-url","onClick"]))),256))]),p("div",zt,[h(u,{to:"/discover/new/songs"},{default:C(()=>[p("h3",null,[R("\u6700\u65B0\u97F3\u4E50"),h(e(x),{theme:"outline",size:"22"})])]),_:1})]),p("div",Pt,[(g(!0),A(O,null,K(M,t=>(g(),U(Y,{mode:"horizontal","image-url":t.album.picUrl,"image-size":"100px","icon-placement":"center","icon-transition":"only-show",onClick:k=>L(t.id)},{default:C(()=>[p("p",null,W(t.name),1),p("span",Vt,[h(fe,{artists:t.artists},null,8,["artists"])])]),_:2},1032,["image-url","onClick"]))),256))]),p("div",Rt,[h(u,{to:"/video/mv"},{default:C(()=>[p("h3",null,[R("\u63A8\u8350MV"),h(e(x),{theme:"outline",size:"22"})])]),_:1})]),p("div",Ut,[(g(!0),A(O,null,K(I.value,t=>(g(),U(Y,{mode:"vertical","image-url":t.picUrl,onClick:k=>T(t.id)},{default:C(()=>[h(o,{underline:!1,onClick:k=>T(t.id)},{default:C(()=>[R(W(t.name),1)]),_:2},1032,["onClick"]),p("div",null,[h(fe,{artists:t.artists},null,8,["artists"])])]),_:2},1032,["image-url","onClick"]))),256))])],64)}}});var Wt=Ge(Ft,[["__scopeId","data-v-3682a1c6"]]);export{Wt as default};
