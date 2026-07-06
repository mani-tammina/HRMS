import{a as Ve}from"./chunk-7NMYRTZJ.js";import{a as qn,b as Fi}from"./chunk-K6CLB273.js";import{a as Un}from"./chunk-HHMVNW2S.js";import{a as he}from"./chunk-DA4OVRGX.js";import{a as $n}from"./chunk-GKMRXCVX.js";import{a as Yn}from"./chunk-C76DRQJT.js";import"./chunk-NDCRD3QG.js";import{A as hs,Aa as _s,B as Bn,Da as Ne,Fa as de,G as fs,Ga as kt,H as ee,I as ne,J as Hn,K as Wn,L as Nn,M as us,N as Vn,Q as ie,R as oe,S as gs,V as We,W as se,X as Ot,ba as ps,d as Fn,g as zn,ha as ae,na as re,qa as jn,ra as ce,ta as le,u as He,w as ds,ya as ms}from"./chunk-B3PLR2IL.js";import{$a as Q,A as es,Ba as Mt,Ca as Y,Da as I,Eb as wt,Ha as Ei,Ia as Li,Ja as Ri,K as ft,Ka as Fe,Kb as cs,L as ut,La as ze,M as we,Ma as Ct,N as Oe,Oa as C,Pa as H,Qa as q,Ra as Jt,Ta as In,Tb as ls,U as ns,Ua as En,Va as Ln,_ as M,_a as Rn,ab as Ht,bb as lt,ca as V,d as An,ea as Pt,eb as Be,ha as is,j as It,ja as F,p as ts,pb as Zt,qb as Qt,ra as S,rb as vt,sa as _,sb as os,t as Xt,ta as b,tb as ss,ua as A,ub as as,wb as rs,ya as Gt,yb as te,za as Kt}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as gt,b as pt,e as mt}from"./chunk-JHI3MBHO.js";function ln(e){return e+.5|0}var fe=(e,i,t)=>Math.max(Math.min(e,t),i);function rn(e){return fe(ln(e*2.55),0,255)}function ue(e){return fe(ln(e*255),0,255)}function Wt(e){return fe(ln(e/2.55)/100,0,1)}function bs(e){return fe(ln(e*100),0,100)}var St={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Bi=[..."0123456789ABCDEF"],Br=e=>Bi[e&15],Hr=e=>Bi[(e&240)>>4]+Bi[e&15],Xn=e=>(e&240)>>4===(e&15),Wr=e=>Xn(e.r)&&Xn(e.g)&&Xn(e.b)&&Xn(e.a);function Nr(e){var i=e.length,t;return e[0]==="#"&&(i===4||i===5?t={r:255&St[e[1]]*17,g:255&St[e[2]]*17,b:255&St[e[3]]*17,a:i===5?St[e[4]]*17:255}:(i===7||i===9)&&(t={r:St[e[1]]<<4|St[e[2]],g:St[e[3]]<<4|St[e[4]],b:St[e[5]]<<4|St[e[6]],a:i===9?St[e[7]]<<4|St[e[8]]:255})),t}var Vr=(e,i)=>e<255?i(e):"";function jr(e){var i=Wr(e)?Br:Hr;return e?"#"+i(e.r)+i(e.g)+i(e.b)+Vr(e.a,i):void 0}var $r=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Cs(e,i,t){let n=i*Math.min(t,1-t),o=(s,a=(s+e/30)%12)=>t-n*Math.max(Math.min(a-3,9-a,1),-1);return[o(0),o(8),o(4)]}function Yr(e,i,t){let n=(o,s=(o+e/60)%6)=>t-t*i*Math.max(Math.min(s,4-s,1),0);return[n(5),n(3),n(1)]}function qr(e,i,t){let n=Cs(e,1,.5),o;for(i+t>1&&(o=1/(i+t),i*=o,t*=o),o=0;o<3;o++)n[o]*=1-i-t,n[o]+=i;return n}function Ur(e,i,t,n,o){return e===o?(i-t)/n+(i<t?6:0):i===o?(t-e)/n+2:(e-i)/n+4}function Hi(e){let t=e.r/255,n=e.g/255,o=e.b/255,s=Math.max(t,n,o),a=Math.min(t,n,o),r=(s+a)/2,c,l,d;return s!==a&&(d=s-a,l=r>.5?d/(2-s-a):d/(s+a),c=Ur(t,n,o,d,s),c=c*60+.5),[c|0,l||0,r]}function Wi(e,i,t,n){return(Array.isArray(i)?e(i[0],i[1],i[2]):e(i,t,n)).map(ue)}function Ni(e,i,t){return Wi(Cs,e,i,t)}function Xr(e,i,t){return Wi(qr,e,i,t)}function Gr(e,i,t){return Wi(Yr,e,i,t)}function Ps(e){return(e%360+360)%360}function Kr(e){let i=$r.exec(e),t=255,n;if(!i)return;i[5]!==n&&(t=i[6]?rn(+i[5]):ue(+i[5]));let o=Ps(+i[2]),s=+i[3]/100,a=+i[4]/100;return i[1]==="hwb"?n=Xr(o,s,a):i[1]==="hsv"?n=Gr(o,s,a):n=Ni(o,s,a),{r:n[0],g:n[1],b:n[2],a:t}}function Jr(e,i){var t=Hi(e);t[0]=Ps(t[0]+i),t=Ni(t),e.r=t[0],e.g=t[1],e.b=t[2]}function Zr(e){if(!e)return;let i=Hi(e),t=i[0],n=bs(i[1]),o=bs(i[2]);return e.a<255?`hsla(${t}, ${n}%, ${o}%, ${Wt(e.a)})`:`hsl(${t}, ${n}%, ${o}%)`}var xs={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},ys={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Qr(){let e={},i=Object.keys(ys),t=Object.keys(xs),n,o,s,a,r;for(n=0;n<i.length;n++){for(a=r=i[n],o=0;o<t.length;o++)s=t[o],r=r.replace(s,xs[s]);s=parseInt(ys[a],16),e[r]=[s>>16&255,s>>8&255,s&255]}return e}var Gn;function tc(e){Gn||(Gn=Qr(),Gn.transparent=[0,0,0,0]);let i=Gn[e.toLowerCase()];return i&&{r:i[0],g:i[1],b:i[2],a:i.length===4?i[3]:255}}var ec=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function nc(e){let i=ec.exec(e),t=255,n,o,s;if(i){if(i[7]!==n){let a=+i[7];t=i[8]?rn(a):fe(a*255,0,255)}return n=+i[1],o=+i[3],s=+i[5],n=255&(i[2]?rn(n):fe(n,0,255)),o=255&(i[4]?rn(o):fe(o,0,255)),s=255&(i[6]?rn(s):fe(s,0,255)),{r:n,g:o,b:s,a:t}}}function ic(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Wt(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}var zi=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,je=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function oc(e,i,t){let n=je(Wt(e.r)),o=je(Wt(e.g)),s=je(Wt(e.b));return{r:ue(zi(n+t*(je(Wt(i.r))-n))),g:ue(zi(o+t*(je(Wt(i.g))-o))),b:ue(zi(s+t*(je(Wt(i.b))-s))),a:e.a+t*(i.a-e.a)}}function Kn(e,i,t){if(e){let n=Hi(e);n[i]=Math.max(0,Math.min(n[i]+n[i]*t,i===0?360:1)),n=Ni(n),e.r=n[0],e.g=n[1],e.b=n[2]}}function vs(e,i){return e&&Object.assign(i||{},e)}function Ms(e){var i={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(i={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(i.a=ue(e[3]))):(i=vs(e,{r:0,g:0,b:0,a:1}),i.a=ue(i.a)),i}function sc(e){return e.charAt(0)==="r"?nc(e):Kr(e)}var cn=class e{constructor(i){if(i instanceof e)return i;let t=typeof i,n;t==="object"?n=Ms(i):t==="string"&&(n=Nr(i)||tc(i)||sc(i)),this._rgb=n,this._valid=!!n}get valid(){return this._valid}get rgb(){var i=vs(this._rgb);return i&&(i.a=Wt(i.a)),i}set rgb(i){this._rgb=Ms(i)}rgbString(){return this._valid?ic(this._rgb):void 0}hexString(){return this._valid?jr(this._rgb):void 0}hslString(){return this._valid?Zr(this._rgb):void 0}mix(i,t){if(i){let n=this.rgb,o=i.rgb,s,a=t===s?.5:t,r=2*a-1,c=n.a-o.a,l=((r*c===-1?r:(r+c)/(1+r*c))+1)/2;s=1-l,n.r=255&l*n.r+s*o.r+.5,n.g=255&l*n.g+s*o.g+.5,n.b=255&l*n.b+s*o.b+.5,n.a=a*n.a+(1-a)*o.a,this.rgb=n}return this}interpolate(i,t){return i&&(this._rgb=oc(this._rgb,i._rgb,t)),this}clone(){return new e(this.rgb)}alpha(i){return this._rgb.a=ue(i),this}clearer(i){let t=this._rgb;return t.a*=1-i,this}greyscale(){let i=this._rgb,t=ln(i.r*.3+i.g*.59+i.b*.11);return i.r=i.g=i.b=t,this}opaquer(i){let t=this._rgb;return t.a*=1+i,this}negate(){let i=this._rgb;return i.r=255-i.r,i.g=255-i.g,i.b=255-i.b,this}lighten(i){return Kn(this._rgb,2,i),this}darken(i){return Kn(this._rgb,2,-i),this}saturate(i){return Kn(this._rgb,1,i),this}desaturate(i){return Kn(this._rgb,1,-i),this}rotate(i){return Jr(this._rgb,i),this}};function Rt(){}var Rs=(()=>{let e=0;return()=>e++})();function B(e){return e==null}function G(e){if(Array.isArray&&Array.isArray(e))return!0;let i=Object.prototype.toString.call(e);return i.slice(0,7)==="[object"&&i.slice(-6)==="Array]"}function W(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function tt(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function _t(e,i){return tt(e)?e:i}function L(e,i){return typeof e>"u"?i:e}var Fs=(e,i)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/i,Yi=(e,i)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*i:+e;function U(e,i,t){if(e&&typeof e.call=="function")return e.apply(t,i)}function $(e,i,t,n){let o,s,a;if(G(e))if(s=e.length,n)for(o=s-1;o>=0;o--)i.call(t,e[o],o);else for(o=0;o<s;o++)i.call(t,e[o],o);else if(W(e))for(a=Object.keys(e),s=a.length,o=0;o<s;o++)i.call(t,e[a[o]],a[o])}function fn(e,i){let t,n,o,s;if(!e||!i||e.length!==i.length)return!1;for(t=0,n=e.length;t<n;++t)if(o=e[t],s=i[t],o.datasetIndex!==s.datasetIndex||o.index!==s.index)return!1;return!0}function ti(e){if(G(e))return e.map(ti);if(W(e)){let i=Object.create(null),t=Object.keys(e),n=t.length,o=0;for(;o<n;++o)i[t[o]]=ti(e[t[o]]);return i}return e}function zs(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function ac(e,i,t,n){if(!zs(e))return;let o=i[e],s=t[e];W(o)&&W(s)?Ye(o,s,n):i[e]=ti(s)}function Ye(e,i,t){let n=G(i)?i:[i],o=n.length;if(!W(e))return e;t=t||{};let s=t.merger||ac,a;for(let r=0;r<o;++r){if(a=n[r],!W(a))continue;let c=Object.keys(a);for(let l=0,d=c.length;l<d;++l)s(c[l],e,a,t)}return e}function Ue(e,i){return Ye(e,i,{merger:rc})}function rc(e,i,t){if(!zs(e))return;let n=i[e],o=t[e];W(n)&&W(o)?Ue(n,o):Object.prototype.hasOwnProperty.call(i,e)||(i[e]=ti(o))}var ws={"":e=>e,x:e=>e.x,y:e=>e.y};function cc(e){let i=e.split("."),t=[],n="";for(let o of i)n+=o,n.endsWith("\\")?n=n.slice(0,-1)+".":(t.push(n),n="");return t}function lc(e){let i=cc(e);return t=>{for(let n of i){if(n==="")break;t=t&&t[n]}return t}}function jt(e,i){return(ws[i]||(ws[i]=lc(i)))(e)}function oi(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Xe=e=>typeof e<"u",Nt=e=>typeof e=="function",qi=(e,i)=>{if(e.size!==i.size)return!1;for(let t of e)if(!i.has(t))return!1;return!0};function Bs(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}var N=Math.PI,K=2*N,dc=K+N,ei=Number.POSITIVE_INFINITY,hc=N/180,et=N/2,ke=N/4,Os=N*2/3,Vt=Math.log10,Tt=Math.sign;function Ge(e,i,t){return Math.abs(e-i)<t}function Ui(e){let i=Math.round(e);e=Ge(e,i,e/1e3)?i:e;let t=Math.pow(10,Math.floor(Vt(e))),n=e/t;return(n<=1?1:n<=2?2:n<=5?5:10)*t}function Hs(e){let i=[],t=Math.sqrt(e),n;for(n=1;n<t;n++)e%n===0&&(i.push(n),i.push(e/n));return t===(t|0)&&i.push(t),i.sort((o,s)=>o-s).pop(),i}function fc(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function Te(e){return!fc(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function Ws(e,i){let t=Math.round(e);return t-i<=e&&t+i>=e}function Xi(e,i,t){let n,o,s;for(n=0,o=e.length;n<o;n++)s=e[n][t],isNaN(s)||(i.min=Math.min(i.min,s),i.max=Math.max(i.max,s))}function Dt(e){return e*(N/180)}function si(e){return e*(180/N)}function Gi(e){if(!tt(e))return;let i=1,t=0;for(;Math.round(e*i)/i!==e;)i*=10,t++;return t}function Ki(e,i){let t=i.x-e.x,n=i.y-e.y,o=Math.sqrt(t*t+n*n),s=Math.atan2(n,t);return s<-.5*N&&(s+=K),{angle:s,distance:o}}function ni(e,i){return Math.sqrt(Math.pow(i.x-e.x,2)+Math.pow(i.y-e.y,2))}function uc(e,i){return(e-i+dc)%K-N}function at(e){return(e%K+K)%K}function Ke(e,i,t,n){let o=at(e),s=at(i),a=at(t),r=at(s-o),c=at(a-o),l=at(o-s),d=at(o-a);return o===s||o===a||n&&s===a||r>c&&l<d}function it(e,i,t){return Math.max(i,Math.min(t,e))}function Ns(e){return it(e,-32768,32767)}function Ft(e,i,t,n=1e-6){return e>=Math.min(i,t)-n&&e<=Math.max(i,t)+n}function ai(e,i,t){t=t||(a=>e[a]<i);let n=e.length-1,o=0,s;for(;n-o>1;)s=o+n>>1,t(s)?o=s:n=s;return{lo:o,hi:n}}var Et=(e,i,t,n)=>ai(e,t,n?o=>{let s=e[o][i];return s<t||s===t&&e[o+1][i]===t}:o=>e[o][i]<t),Vs=(e,i,t)=>ai(e,t,n=>e[n][i]>=t);function js(e,i,t){let n=0,o=e.length;for(;n<o&&e[n]<i;)n++;for(;o>n&&e[o-1]>t;)o--;return n>0||o<e.length?e.slice(n,o):e}var $s=["push","pop","shift","splice","unshift"];function Ys(e,i){if(e._chartjs){e._chartjs.listeners.push(i);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[i]}}),$s.forEach(t=>{let n="_onData"+oi(t),o=e[t];Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value(...s){let a=o.apply(this,s);return e._chartjs.listeners.forEach(r=>{typeof r[n]=="function"&&r[n](...s)}),a}})})}function Ji(e,i){let t=e._chartjs;if(!t)return;let n=t.listeners,o=n.indexOf(i);o!==-1&&n.splice(o,1),!(n.length>0)&&($s.forEach(s=>{delete e[s]}),delete e._chartjs)}function Zi(e){let i=new Set(e);return i.size===e.length?e:Array.from(i)}var Qi=function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame}();function to(e,i){let t=[],n=!1;return function(...o){t=o,n||(n=!0,Qi.call(window,()=>{n=!1,e.apply(i,t)}))}}function qs(e,i){let t;return function(...n){return i?(clearTimeout(t),t=setTimeout(e,i,n)):e.apply(this,n),i}}var ri=e=>e==="start"?"left":e==="end"?"right":"center",rt=(e,i,t)=>e==="start"?i:e==="end"?t:(i+t)/2,Us=(e,i,t,n)=>e===(n?"left":"right")?t:e==="center"?(i+t)/2:i;function eo(e,i,t){let n=i.length,o=0,s=n;if(e._sorted){let{iScale:a,vScale:r,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=a.axis,{min:h,max:f,minDefined:u,maxDefined:g}=a.getUserBounds();if(u){if(o=Math.min(Et(c,d,h).lo,t?n:Et(i,d,a.getPixelForValue(h)).lo),l){let p=c.slice(0,o+1).reverse().findIndex(m=>!B(m[r.axis]));o-=Math.max(0,p)}o=it(o,0,n-1)}if(g){let p=Math.max(Et(c,a.axis,f,!0).hi+1,t?0:Et(i,d,a.getPixelForValue(f),!0).hi+1);if(l){let m=c.slice(p-1).findIndex(x=>!B(x[r.axis]));p+=Math.max(0,m)}s=it(p,o,n)-o}else s=n-o}return{start:o,count:s}}function no(e){let{xScale:i,yScale:t,_scaleRanges:n}=e,o={xmin:i.min,xmax:i.max,ymin:t.min,ymax:t.max};if(!n)return e._scaleRanges=o,!0;let s=n.xmin!==i.min||n.xmax!==i.max||n.ymin!==t.min||n.ymax!==t.max;return Object.assign(n,o),s}var Jn=e=>e===0||e===1,ks=(e,i,t)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-i)*K/t)),Ss=(e,i,t)=>Math.pow(2,-10*e)*Math.sin((e-i)*K/t)+1,$e={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*et)+1,easeOutSine:e=>Math.sin(e*et),easeInOutSine:e=>-.5*(Math.cos(N*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Jn(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Jn(e)?e:ks(e,.075,.3),easeOutElastic:e=>Jn(e)?e:Ss(e,.075,.3),easeInOutElastic(e){return Jn(e)?e:e<.5?.5*ks(e*2,.1125,.45):.5+.5*Ss(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let i=1.70158;return(e/=.5)<1?.5*(e*e*(((i*=1.525)+1)*e-i)):.5*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)},easeInBounce:e=>1-$e.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?$e.easeInBounce(e*2)*.5:$e.easeOutBounce(e*2-1)*.5+.5};function io(e){if(e&&typeof e=="object"){let i=e.toString();return i==="[object CanvasPattern]"||i==="[object CanvasGradient]"}return!1}function oo(e){return io(e)?e:new cn(e)}function Vi(e){return io(e)?e:new cn(e).saturate(.5).darken(.1).hexString()}var gc=["x","y","borderWidth","radius","tension"],pc=["color","borderColor","backgroundColor"];function mc(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:i=>i!=="onProgress"&&i!=="onComplete"&&i!=="fn"}),e.set("animations",{colors:{type:"color",properties:pc},numbers:{type:"number",properties:gc}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:i=>i|0}}}})}function _c(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}var Ds=new Map;function bc(e,i){i=i||{};let t=e+JSON.stringify(i),n=Ds.get(t);return n||(n=new Intl.NumberFormat(e,i),Ds.set(t,n)),n}function Je(e,i,t){return bc(i,t).format(e)}var Xs={values(e){return G(e)?e:""+e},numeric(e,i,t){if(e===0)return"0";let n=this.chart.options.locale,o,s=e;if(t.length>1){let l=Math.max(Math.abs(t[0].value),Math.abs(t[t.length-1].value));(l<1e-4||l>1e15)&&(o="scientific"),s=xc(e,t)}let a=Vt(Math.abs(s)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),c={notation:o,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(c,this.options.ticks.format),Je(e,n,c)},logarithmic(e,i,t){if(e===0)return"0";let n=t[i].significand||e/Math.pow(10,Math.floor(Vt(e)));return[1,2,3,5,10,15].includes(n)||i>.8*t.length?Xs.numeric.call(this,e,i,t):""}};function xc(e,i){let t=i.length>3?i[2].value-i[1].value:i[1].value-i[0].value;return Math.abs(t)>=1&&e!==Math.floor(e)&&(t=e-Math.floor(e)),t}var un={formatters:Xs};function yc(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(i,t)=>t.lineWidth,tickColor:(i,t)=>t.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:un.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:i=>!i.startsWith("before")&&!i.startsWith("after")&&i!=="callback"&&i!=="parser",_indexable:i=>i!=="borderDash"&&i!=="tickBorderDash"&&i!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:i=>i!=="backdropPadding"&&i!=="callback",_indexable:i=>i!=="backdropPadding"})}var me=Object.create(null),ci=Object.create(null);function dn(e,i){if(!i)return e;let t=i.split(".");for(let n=0,o=t.length;n<o;++n){let s=t[n];e=e[s]||(e[s]=Object.create(null))}return e}function ji(e,i,t){return typeof i=="string"?Ye(dn(e,i),t):Ye(dn(e,""),i)}var $i=class{constructor(i,t){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=n=>n.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(n,o)=>Vi(o.backgroundColor),this.hoverBorderColor=(n,o)=>Vi(o.borderColor),this.hoverColor=(n,o)=>Vi(o.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(i),this.apply(t)}set(i,t){return ji(this,i,t)}get(i){return dn(this,i)}describe(i,t){return ji(ci,i,t)}override(i,t){return ji(me,i,t)}route(i,t,n,o){let s=dn(this,i),a=dn(this,n),r="_"+t;Object.defineProperties(s,{[r]:{value:s[t],writable:!0},[t]:{enumerable:!0,get(){let c=this[r],l=a[o];return W(c)?Object.assign({},l,c):L(c,l)},set(c){this[r]=c}}})}apply(i){i.forEach(t=>t(this))}},J=new $i({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[mc,_c,yc]);function Mc(e){return!e||B(e.size)||B(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function hn(e,i,t,n,o){let s=i[o];return s||(s=i[o]=e.measureText(o).width,t.push(o)),s>n&&(n=s),n}function Gs(e,i,t,n){n=n||{};let o=n.data=n.data||{},s=n.garbageCollect=n.garbageCollect||[];n.font!==i&&(o=n.data={},s=n.garbageCollect=[],n.font=i),e.save(),e.font=i;let a=0,r=t.length,c,l,d,h,f;for(c=0;c<r;c++)if(h=t[c],h!=null&&!G(h))a=hn(e,o,s,a,h);else if(G(h))for(l=0,d=h.length;l<d;l++)f=h[l],f!=null&&!G(f)&&(a=hn(e,o,s,a,f));e.restore();let u=s.length/2;if(u>t.length){for(c=0;c<u;c++)delete o[s[c]];s.splice(0,u)}return a}function _e(e,i,t){let n=e.currentDevicePixelRatio,o=t!==0?Math.max(t/2,.5):0;return Math.round((i-o)*n)/n+o}function so(e,i){!i&&!e||(i=i||e.getContext("2d"),i.save(),i.resetTransform(),i.clearRect(0,0,e.width,e.height),i.restore())}function li(e,i,t,n){ao(e,i,t,n,null)}function ao(e,i,t,n,o){let s,a,r,c,l,d,h,f,u=i.pointStyle,g=i.rotation,p=i.radius,m=(g||0)*hc;if(u&&typeof u=="object"&&(s=u.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){e.save(),e.translate(t,n),e.rotate(m),e.drawImage(u,-u.width/2,-u.height/2,u.width,u.height),e.restore();return}if(!(isNaN(p)||p<=0)){switch(e.beginPath(),u){default:o?e.ellipse(t,n,o/2,p,0,0,K):e.arc(t,n,p,0,K),e.closePath();break;case"triangle":d=o?o/2:p,e.moveTo(t+Math.sin(m)*d,n-Math.cos(m)*p),m+=Os,e.lineTo(t+Math.sin(m)*d,n-Math.cos(m)*p),m+=Os,e.lineTo(t+Math.sin(m)*d,n-Math.cos(m)*p),e.closePath();break;case"rectRounded":l=p*.516,c=p-l,a=Math.cos(m+ke)*c,h=Math.cos(m+ke)*(o?o/2-l:c),r=Math.sin(m+ke)*c,f=Math.sin(m+ke)*(o?o/2-l:c),e.arc(t-h,n-r,l,m-N,m-et),e.arc(t+f,n-a,l,m-et,m),e.arc(t+h,n+r,l,m,m+et),e.arc(t-f,n+a,l,m+et,m+N),e.closePath();break;case"rect":if(!g){c=Math.SQRT1_2*p,d=o?o/2:c,e.rect(t-d,n-c,2*d,2*c);break}m+=ke;case"rectRot":h=Math.cos(m)*(o?o/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,f=Math.sin(m)*(o?o/2:p),e.moveTo(t-h,n-r),e.lineTo(t+f,n-a),e.lineTo(t+h,n+r),e.lineTo(t-f,n+a),e.closePath();break;case"crossRot":m+=ke;case"cross":h=Math.cos(m)*(o?o/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,f=Math.sin(m)*(o?o/2:p),e.moveTo(t-h,n-r),e.lineTo(t+h,n+r),e.moveTo(t+f,n-a),e.lineTo(t-f,n+a);break;case"star":h=Math.cos(m)*(o?o/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,f=Math.sin(m)*(o?o/2:p),e.moveTo(t-h,n-r),e.lineTo(t+h,n+r),e.moveTo(t+f,n-a),e.lineTo(t-f,n+a),m+=ke,h=Math.cos(m)*(o?o/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,f=Math.sin(m)*(o?o/2:p),e.moveTo(t-h,n-r),e.lineTo(t+h,n+r),e.moveTo(t+f,n-a),e.lineTo(t-f,n+a);break;case"line":a=o?o/2:Math.cos(m)*p,r=Math.sin(m)*p,e.moveTo(t-a,n-r),e.lineTo(t+a,n+r);break;case"dash":e.moveTo(t,n),e.lineTo(t+Math.cos(m)*(o?o/2:p),n+Math.sin(m)*p);break;case!1:e.closePath();break}e.fill(),i.borderWidth>0&&e.stroke()}}function Lt(e,i,t){return t=t||.5,!i||e&&e.x>i.left-t&&e.x<i.right+t&&e.y>i.top-t&&e.y<i.bottom+t}function gn(e,i){e.save(),e.beginPath(),e.rect(i.left,i.top,i.right-i.left,i.bottom-i.top),e.clip()}function pn(e){e.restore()}function Ks(e,i,t,n,o){if(!i)return e.lineTo(t.x,t.y);if(o==="middle"){let s=(i.x+t.x)/2;e.lineTo(s,i.y),e.lineTo(s,t.y)}else o==="after"!=!!n?e.lineTo(i.x,t.y):e.lineTo(t.x,i.y);e.lineTo(t.x,t.y)}function Js(e,i,t,n){if(!i)return e.lineTo(t.x,t.y);e.bezierCurveTo(n?i.cp1x:i.cp2x,n?i.cp1y:i.cp2y,n?t.cp2x:t.cp1x,n?t.cp2y:t.cp1y,t.x,t.y)}function Cc(e,i){i.translation&&e.translate(i.translation[0],i.translation[1]),B(i.rotation)||e.rotate(i.rotation),i.color&&(e.fillStyle=i.color),i.textAlign&&(e.textAlign=i.textAlign),i.textBaseline&&(e.textBaseline=i.textBaseline)}function Pc(e,i,t,n,o){if(o.strikethrough||o.underline){let s=e.measureText(n),a=i-s.actualBoundingBoxLeft,r=i+s.actualBoundingBoxRight,c=t-s.actualBoundingBoxAscent,l=t+s.actualBoundingBoxDescent,d=o.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=o.decorationWidth||2,e.moveTo(a,d),e.lineTo(r,d),e.stroke()}}function vc(e,i){let t=e.fillStyle;e.fillStyle=i.color,e.fillRect(i.left,i.top,i.width,i.height),e.fillStyle=t}function be(e,i,t,n,o,s={}){let a=G(i)?i:[i],r=s.strokeWidth>0&&s.strokeColor!=="",c,l;for(e.save(),e.font=o.string,Cc(e,s),c=0;c<a.length;++c)l=a[c],s.backdrop&&vc(e,s.backdrop),r&&(s.strokeColor&&(e.strokeStyle=s.strokeColor),B(s.strokeWidth)||(e.lineWidth=s.strokeWidth),e.strokeText(l,t,n,s.maxWidth)),e.fillText(l,t,n,s.maxWidth),Pc(e,t,n,l,s),n+=Number(o.lineHeight);e.restore()}function Ze(e,i){let{x:t,y:n,w:o,h:s,radius:a}=i;e.arc(t+a.topLeft,n+a.topLeft,a.topLeft,1.5*N,N,!0),e.lineTo(t,n+s-a.bottomLeft),e.arc(t+a.bottomLeft,n+s-a.bottomLeft,a.bottomLeft,N,et,!0),e.lineTo(t+o-a.bottomRight,n+s),e.arc(t+o-a.bottomRight,n+s-a.bottomRight,a.bottomRight,et,0,!0),e.lineTo(t+o,n+a.topRight),e.arc(t+o-a.topRight,n+a.topRight,a.topRight,0,-et,!0),e.lineTo(t+a.topLeft,n)}var wc=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Oc=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function kc(e,i){let t=(""+e).match(wc);if(!t||t[1]==="normal")return i*1.2;switch(e=+t[2],t[3]){case"px":return e;case"%":e/=100;break}return i*e}var Sc=e=>+e||0;function di(e,i){let t={},n=W(i),o=n?Object.keys(i):i,s=W(e)?n?a=>L(e[a],e[i[a]]):a=>e[a]:()=>e;for(let a of o)t[a]=Sc(s(a));return t}function ro(e){return di(e,{top:"y",right:"x",bottom:"y",left:"x"})}function xe(e){return di(e,["topLeft","topRight","bottomLeft","bottomRight"])}function ct(e){let i=ro(e);return i.width=i.left+i.right,i.height=i.top+i.bottom,i}function nt(e,i){e=e||{},i=i||J.font;let t=L(e.size,i.size);typeof t=="string"&&(t=parseInt(t,10));let n=L(e.style,i.style);n&&!(""+n).match(Oc)&&(console.warn('Invalid font style specified: "'+n+'"'),n=void 0);let o={family:L(e.family,i.family),lineHeight:kc(L(e.lineHeight,i.lineHeight),t),size:t,style:n,weight:L(e.weight,i.weight),string:""};return o.string=Mc(o),o}function Qe(e,i,t,n){let o=!0,s,a,r;for(s=0,a=e.length;s<a;++s)if(r=e[s],r!==void 0&&(i!==void 0&&typeof r=="function"&&(r=r(i),o=!1),t!==void 0&&G(r)&&(r=r[t%r.length],o=!1),r!==void 0))return n&&!o&&(n.cacheable=!1),r}function Zs(e,i,t){let{min:n,max:o}=e,s=Yi(i,(o-n)/2),a=(r,c)=>t&&r===0?0:r+c;return{min:a(n,-Math.abs(s)),max:a(o,s)}}function $t(e,i){return Object.assign(Object.create(e),i)}function hi(e,i=[""],t,n,o=()=>e[0]){let s=t||e;typeof n>"u"&&(n=ea("_fallback",e));let a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:s,_fallback:n,_getTarget:o,override:r=>hi([r,...e],i,s,n)};return new Proxy(a,{deleteProperty(r,c){return delete r[c],delete r._keys,delete e[0][c],!0},get(r,c){return Qs(r,c,()=>Fc(c,i,e,r))},getOwnPropertyDescriptor(r,c){return Reflect.getOwnPropertyDescriptor(r._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(r,c){return As(r).includes(c)},ownKeys(r){return As(r)},set(r,c,l){let d=r._storage||(r._storage=o());return r[c]=d[c]=l,delete r._keys,!0}})}function De(e,i,t,n){let o={_cacheable:!1,_proxy:e,_context:i,_subProxy:t,_stack:new Set,_descriptors:co(e,n),setContext:s=>De(e,s,t,n),override:s=>De(e.override(s),i,t,n)};return new Proxy(o,{deleteProperty(s,a){return delete s[a],delete e[a],!0},get(s,a,r){return Qs(s,a,()=>Tc(s,a,r))},getOwnPropertyDescriptor(s,a){return s._descriptors.allKeys?Reflect.has(e,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,a)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(s,a){return Reflect.has(e,a)},ownKeys(){return Reflect.ownKeys(e)},set(s,a,r){return e[a]=r,delete s[a],!0}})}function co(e,i={scriptable:!0,indexable:!0}){let{_scriptable:t=i.scriptable,_indexable:n=i.indexable,_allKeys:o=i.allKeys}=e;return{allKeys:o,scriptable:t,indexable:n,isScriptable:Nt(t)?t:()=>t,isIndexable:Nt(n)?n:()=>n}}var Dc=(e,i)=>e?e+oi(i):i,lo=(e,i)=>W(i)&&e!=="adapters"&&(Object.getPrototypeOf(i)===null||i.constructor===Object);function Qs(e,i,t){if(Object.prototype.hasOwnProperty.call(e,i)||i==="constructor")return e[i];let n=t();return e[i]=n,n}function Tc(e,i,t){let{_proxy:n,_context:o,_subProxy:s,_descriptors:a}=e,r=n[i];return Nt(r)&&a.isScriptable(i)&&(r=Ac(i,r,e,t)),G(r)&&r.length&&(r=Ic(i,r,e,a.isIndexable)),lo(i,r)&&(r=De(r,o,s&&s[i],a)),r}function Ac(e,i,t,n){let{_proxy:o,_context:s,_subProxy:a,_stack:r}=t;if(r.has(e))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+e);r.add(e);let c=i(s,a||n);return r.delete(e),lo(e,c)&&(c=ho(o._scopes,o,e,c)),c}function Ic(e,i,t,n){let{_proxy:o,_context:s,_subProxy:a,_descriptors:r}=t;if(typeof s.index<"u"&&n(e))return i[s.index%i.length];if(W(i[0])){let c=i,l=o._scopes.filter(d=>d!==c);i=[];for(let d of c){let h=ho(l,o,e,d);i.push(De(h,s,a&&a[e],r))}}return i}function ta(e,i,t){return Nt(e)?e(i,t):e}var Ec=(e,i)=>e===!0?i:typeof e=="string"?jt(i,e):void 0;function Lc(e,i,t,n,o){for(let s of i){let a=Ec(t,s);if(a){e.add(a);let r=ta(a._fallback,t,o);if(typeof r<"u"&&r!==t&&r!==n)return r}else if(a===!1&&typeof n<"u"&&t!==n)return null}return!1}function ho(e,i,t,n){let o=i._rootScopes,s=ta(i._fallback,t,n),a=[...e,...o],r=new Set;r.add(n);let c=Ts(r,a,t,s||t,n);return c===null||typeof s<"u"&&s!==t&&(c=Ts(r,a,s,c,n),c===null)?!1:hi(Array.from(r),[""],o,s,()=>Rc(i,t,n))}function Ts(e,i,t,n,o){for(;t;)t=Lc(e,i,t,n,o);return t}function Rc(e,i,t){let n=e._getTarget();i in n||(n[i]={});let o=n[i];return G(o)&&W(t)?t:o||{}}function Fc(e,i,t,n){let o;for(let s of i)if(o=ea(Dc(s,e),t),typeof o<"u")return lo(e,o)?ho(t,n,e,o):o}function ea(e,i){for(let t of i){if(!t)continue;let n=t[e];if(typeof n<"u")return n}}function As(e){let i=e._keys;return i||(i=e._keys=zc(e._scopes)),i}function zc(e){let i=new Set;for(let t of e)for(let n of Object.keys(t).filter(o=>!o.startsWith("_")))i.add(n);return Array.from(i)}function fo(e,i,t,n){let{iScale:o}=e,{key:s="r"}=this._parsing,a=new Array(n),r,c,l,d;for(r=0,c=n;r<c;++r)l=r+t,d=i[l],a[r]={r:o.parse(jt(d,s),l)};return a}var Bc=Number.EPSILON||1e-14,qe=(e,i)=>i<e.length&&!e[i].skip&&e[i],na=e=>e==="x"?"y":"x";function Hc(e,i,t,n){let o=e.skip?i:e,s=i,a=t.skip?i:t,r=ni(s,o),c=ni(a,s),l=r/(r+c),d=c/(r+c);l=isNaN(l)?0:l,d=isNaN(d)?0:d;let h=n*l,f=n*d;return{previous:{x:s.x-h*(a.x-o.x),y:s.y-h*(a.y-o.y)},next:{x:s.x+f*(a.x-o.x),y:s.y+f*(a.y-o.y)}}}function Wc(e,i,t){let n=e.length,o,s,a,r,c,l=qe(e,0);for(let d=0;d<n-1;++d)if(c=l,l=qe(e,d+1),!(!c||!l)){if(Ge(i[d],0,Bc)){t[d]=t[d+1]=0;continue}o=t[d]/i[d],s=t[d+1]/i[d],r=Math.pow(o,2)+Math.pow(s,2),!(r<=9)&&(a=3/Math.sqrt(r),t[d]=o*a*i[d],t[d+1]=s*a*i[d])}}function Nc(e,i,t="x"){let n=na(t),o=e.length,s,a,r,c=qe(e,0);for(let l=0;l<o;++l){if(a=r,r=c,c=qe(e,l+1),!r)continue;let d=r[t],h=r[n];a&&(s=(d-a[t])/3,r[`cp1${t}`]=d-s,r[`cp1${n}`]=h-s*i[l]),c&&(s=(c[t]-d)/3,r[`cp2${t}`]=d+s,r[`cp2${n}`]=h+s*i[l])}}function Vc(e,i="x"){let t=na(i),n=e.length,o=Array(n).fill(0),s=Array(n),a,r,c,l=qe(e,0);for(a=0;a<n;++a)if(r=c,c=l,l=qe(e,a+1),!!c){if(l){let d=l[i]-c[i];o[a]=d!==0?(l[t]-c[t])/d:0}s[a]=r?l?Tt(o[a-1])!==Tt(o[a])?0:(o[a-1]+o[a])/2:o[a-1]:o[a]}Wc(e,o,s),Nc(e,s,i)}function Zn(e,i,t){return Math.max(Math.min(e,t),i)}function jc(e,i){let t,n,o,s,a,r=Lt(e[0],i);for(t=0,n=e.length;t<n;++t)a=s,s=r,r=t<n-1&&Lt(e[t+1],i),s&&(o=e[t],a&&(o.cp1x=Zn(o.cp1x,i.left,i.right),o.cp1y=Zn(o.cp1y,i.top,i.bottom)),r&&(o.cp2x=Zn(o.cp2x,i.left,i.right),o.cp2y=Zn(o.cp2y,i.top,i.bottom)))}function ia(e,i,t,n,o){let s,a,r,c;if(i.spanGaps&&(e=e.filter(l=>!l.skip)),i.cubicInterpolationMode==="monotone")Vc(e,o);else{let l=n?e[e.length-1]:e[0];for(s=0,a=e.length;s<a;++s)r=e[s],c=Hc(l,r,e[Math.min(s+1,a-(n?0:1))%a],i.tension),r.cp1x=c.previous.x,r.cp1y=c.previous.y,r.cp2x=c.next.x,r.cp2y=c.next.y,l=r}i.capBezierPoints&&jc(e,t)}function fi(){return typeof window<"u"&&typeof document<"u"}function ui(e){let i=e.parentNode;return i&&i.toString()==="[object ShadowRoot]"&&(i=i.host),i}function ii(e,i,t){let n;return typeof e=="string"?(n=parseInt(e,10),e.indexOf("%")!==-1&&(n=n/100*i.parentNode[t])):n=e,n}var gi=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function $c(e,i){return gi(e).getPropertyValue(i)}var Yc=["top","right","bottom","left"];function Se(e,i,t){let n={};t=t?"-"+t:"";for(let o=0;o<4;o++){let s=Yc[o];n[s]=parseFloat(e[i+"-"+s+t])||0}return n.width=n.left+n.right,n.height=n.top+n.bottom,n}var qc=(e,i,t)=>(e>0||i>0)&&(!t||!t.shadowRoot);function Uc(e,i){let t=e.touches,n=t&&t.length?t[0]:e,{offsetX:o,offsetY:s}=n,a=!1,r,c;if(qc(o,s,e.target))r=o,c=s;else{let l=i.getBoundingClientRect();r=n.clientX-l.left,c=n.clientY-l.top,a=!0}return{x:r,y:c,box:a}}function ye(e,i){if("native"in e)return e;let{canvas:t,currentDevicePixelRatio:n}=i,o=gi(t),s=o.boxSizing==="border-box",a=Se(o,"padding"),r=Se(o,"border","width"),{x:c,y:l,box:d}=Uc(e,t),h=a.left+(d&&r.left),f=a.top+(d&&r.top),{width:u,height:g}=i;return s&&(u-=a.width+r.width,g-=a.height+r.height),{x:Math.round((c-h)/u*t.width/n),y:Math.round((l-f)/g*t.height/n)}}function Xc(e,i,t){let n,o;if(i===void 0||t===void 0){let s=e&&ui(e);if(!s)i=e.clientWidth,t=e.clientHeight;else{let a=s.getBoundingClientRect(),r=gi(s),c=Se(r,"border","width"),l=Se(r,"padding");i=a.width-l.width-c.width,t=a.height-l.height-c.height,n=ii(r.maxWidth,s,"clientWidth"),o=ii(r.maxHeight,s,"clientHeight")}}return{width:i,height:t,maxWidth:n||ei,maxHeight:o||ei}}var pe=e=>Math.round(e*10)/10;function oa(e,i,t,n){let o=gi(e),s=Se(o,"margin"),a=ii(o.maxWidth,e,"clientWidth")||ei,r=ii(o.maxHeight,e,"clientHeight")||ei,c=Xc(e,i,t),{width:l,height:d}=c;if(o.boxSizing==="content-box"){let f=Se(o,"border","width"),u=Se(o,"padding");l-=u.width+f.width,d-=u.height+f.height}return l=Math.max(0,l-s.width),d=Math.max(0,n?l/n:d-s.height),l=pe(Math.min(l,a,c.maxWidth)),d=pe(Math.min(d,r,c.maxHeight)),l&&!d&&(d=pe(l/2)),(i!==void 0||t!==void 0)&&n&&c.height&&d>c.height&&(d=c.height,l=pe(Math.floor(d*n))),{width:l,height:d}}function uo(e,i,t){let n=i||1,o=pe(e.height*n),s=pe(e.width*n);e.height=pe(e.height),e.width=pe(e.width);let a=e.canvas;return a.style&&(t||!a.style.height&&!a.style.width)&&(a.style.height=`${e.height}px`,a.style.width=`${e.width}px`),e.currentDevicePixelRatio!==n||a.height!==o||a.width!==s?(e.currentDevicePixelRatio=n,a.height=o,a.width=s,e.ctx.setTransform(n,0,0,n,0,0),!0):!1}var sa=function(){let e=!1;try{let i={get passive(){return e=!0,!1}};fi()&&(window.addEventListener("test",null,i),window.removeEventListener("test",null,i))}catch{}return e}();function go(e,i){let t=$c(e,i),n=t&&t.match(/^(\d+)(\.\d+)?px$/);return n?+n[1]:void 0}function ge(e,i,t,n){return{x:e.x+t*(i.x-e.x),y:e.y+t*(i.y-e.y)}}function aa(e,i,t,n){return{x:e.x+t*(i.x-e.x),y:n==="middle"?t<.5?e.y:i.y:n==="after"?t<1?e.y:i.y:t>0?i.y:e.y}}function ra(e,i,t,n){let o={x:e.cp2x,y:e.cp2y},s={x:i.cp1x,y:i.cp1y},a=ge(e,o,t),r=ge(o,s,t),c=ge(s,i,t),l=ge(a,r,t),d=ge(r,c,t);return ge(l,d,t)}var Gc=function(e,i){return{x(t){return e+e+i-t},setWidth(t){i=t},textAlign(t){return t==="center"?t:t==="right"?"left":"right"},xPlus(t,n){return t-n},leftForLtr(t,n){return t-n}}},Kc=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,i){return e+i},leftForLtr(e,i){return e}}};function Ae(e,i,t){return e?Gc(i,t):Kc()}function po(e,i){let t,n;(i==="ltr"||i==="rtl")&&(t=e.canvas.style,n=[t.getPropertyValue("direction"),t.getPropertyPriority("direction")],t.setProperty("direction",i,"important"),e.prevTextDirection=n)}function mo(e,i){i!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",i[0],i[1]))}function ca(e){return e==="angle"?{between:Ke,compare:uc,normalize:at}:{between:Ft,compare:(i,t)=>i-t,normalize:i=>i}}function Is({start:e,end:i,count:t,loop:n,style:o}){return{start:e%t,end:i%t,loop:n&&(i-e+1)%t===0,style:o}}function Jc(e,i,t){let{property:n,start:o,end:s}=t,{between:a,normalize:r}=ca(n),c=i.length,{start:l,end:d,loop:h}=e,f,u;if(h){for(l+=c,d+=c,f=0,u=c;f<u&&a(r(i[l%c][n]),o,s);++f)l--,d--;l%=c,d%=c}return d<l&&(d+=c),{start:l,end:d,loop:h,style:e.style}}function _o(e,i,t){if(!t)return[e];let{property:n,start:o,end:s}=t,a=i.length,{compare:r,between:c,normalize:l}=ca(n),{start:d,end:h,loop:f,style:u}=Jc(e,i,t),g=[],p=!1,m=null,x,y,v,O=()=>c(o,v,x)&&r(o,v)!==0,P=()=>r(s,x)===0||c(s,v,x),w=()=>p||O(),D=()=>!p||P();for(let k=d,T=d;k<=h;++k)y=i[k%a],!y.skip&&(x=l(y[n]),x!==v&&(p=c(x,o,s),m===null&&w()&&(m=r(x,o)===0?k:T),m!==null&&D()&&(g.push(Is({start:m,end:k,loop:f,count:a,style:u})),m=null),T=k,v=x));return m!==null&&g.push(Is({start:m,end:h,loop:f,count:a,style:u})),g}function bo(e,i){let t=[],n=e.segments;for(let o=0;o<n.length;o++){let s=_o(n[o],e.points,i);s.length&&t.push(...s)}return t}function Zc(e,i,t,n){let o=0,s=i-1;if(t&&!n)for(;o<i&&!e[o].skip;)o++;for(;o<i&&e[o].skip;)o++;for(o%=i,t&&(s+=o);s>o&&e[s%i].skip;)s--;return s%=i,{start:o,end:s}}function Qc(e,i,t,n){let o=e.length,s=[],a=i,r=e[i],c;for(c=i+1;c<=t;++c){let l=e[c%o];l.skip||l.stop?r.skip||(n=!1,s.push({start:i%o,end:(c-1)%o,loop:n}),i=a=l.stop?c:null):(a=c,r.skip&&(i=c)),r=l}return a!==null&&s.push({start:i%o,end:a%o,loop:n}),s}function la(e,i){let t=e.points,n=e.options.spanGaps,o=t.length;if(!o)return[];let s=!!e._loop,{start:a,end:r}=Zc(t,o,s,n);if(n===!0)return Es(e,[{start:a,end:r,loop:s}],t,i);let c=r<a?r+o:r,l=!!e._fullLoop&&a===0&&r===o-1;return Es(e,Qc(t,a,c,l),t,i)}function Es(e,i,t,n){return!n||!n.setContext||!t?i:tl(e,i,t,n)}function tl(e,i,t,n){let o=e._chart.getContext(),s=Ls(e.options),{_datasetIndex:a,options:{spanGaps:r}}=e,c=t.length,l=[],d=s,h=i[0].start,f=h;function u(g,p,m,x){let y=r?-1:1;if(g!==p){for(g+=c;t[g%c].skip;)g-=y;for(;t[p%c].skip;)p+=y;g%c!==p%c&&(l.push({start:g%c,end:p%c,loop:m,style:x}),d=x,h=p%c)}}for(let g of i){h=r?h:g.start;let p=t[h%c],m;for(f=h+1;f<=g.end;f++){let x=t[f%c];m=Ls(n.setContext($t(o,{type:"segment",p0:p,p1:x,p0DataIndex:(f-1)%c,p1DataIndex:f%c,datasetIndex:a}))),el(m,d)&&u(h,f-1,g.loop,d),p=x,d=m}h<f-1&&u(h,f-1,g.loop,d)}return l}function Ls(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function el(e,i){if(!i)return!1;let t=[],n=function(o,s){return io(s)?(t.includes(s)||t.push(s),t.indexOf(s)):s};return JSON.stringify(e,n)!==JSON.stringify(i,n)}function Qn(e,i,t){return e.options.clip?e[t]:i[t]}function nl(e,i){let{xScale:t,yScale:n}=e;return t&&n?{left:Qn(t,i,"left"),right:Qn(t,i,"right"),top:Qn(n,i,"top"),bottom:Qn(n,i,"bottom")}:i}function xo(e,i){let t=i._clip;if(t.disabled)return!1;let n=nl(i,e.chartArea);return{left:t.left===!1?0:n.left-(t.left===!0?0:t.left),right:t.right===!1?e.width:n.right+(t.right===!0?0:t.right),top:t.top===!1?0:n.top-(t.top===!0?0:t.top),bottom:t.bottom===!1?e.height:n.bottom+(t.bottom===!0?0:t.bottom)}}var Ao=class{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(i,t,n,o){let s=t.listeners[o],a=t.duration;s.forEach(r=>r({chart:i,initial:t.initial,numSteps:a,currentStep:Math.min(n-t.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Qi.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(i=Date.now()){let t=0;this._charts.forEach((n,o)=>{if(!n.running||!n.items.length)return;let s=n.items,a=s.length-1,r=!1,c;for(;a>=0;--a)c=s[a],c._active?(c._total>n.duration&&(n.duration=c._total),c.tick(i),r=!0):(s[a]=s[s.length-1],s.pop());r&&(o.draw(),this._notify(o,n,i,"progress")),s.length||(n.running=!1,this._notify(o,n,i,"complete"),n.initial=!1),t+=s.length}),this._lastDate=i,t===0&&(this._running=!1)}_getAnims(i){let t=this._charts,n=t.get(i);return n||(n={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},t.set(i,n)),n}listen(i,t,n){this._getAnims(i).listeners[t].push(n)}add(i,t){!t||!t.length||this._getAnims(i).items.push(...t)}has(i){return this._getAnims(i).items.length>0}start(i){let t=this._charts.get(i);t&&(t.running=!0,t.start=Date.now(),t.duration=t.items.reduce((n,o)=>Math.max(n,o._duration),0),this._refresh())}running(i){if(!this._running)return!1;let t=this._charts.get(i);return!(!t||!t.running||!t.items.length)}stop(i){let t=this._charts.get(i);if(!t||!t.items.length)return;let n=t.items,o=n.length-1;for(;o>=0;--o)n[o].cancel();t.items=[],this._notify(i,t,Date.now(),"complete")}remove(i){return this._charts.delete(i)}},Yt=new Ao,da="transparent",il={boolean(e,i,t){return t>.5?i:e},color(e,i,t){let n=oo(e||da),o=n.valid&&oo(i||da);return o&&o.valid?o.mix(n,t).hexString():i},number(e,i,t){return e+(i-e)*t}},Io=class{constructor(i,t,n,o){let s=t[n];o=Qe([i.to,o,s,i.from]);let a=Qe([i.from,s,o]);this._active=!0,this._fn=i.fn||il[i.type||typeof a],this._easing=$e[i.easing]||$e.linear,this._start=Math.floor(Date.now()+(i.delay||0)),this._duration=this._total=Math.floor(i.duration),this._loop=!!i.loop,this._target=t,this._prop=n,this._from=a,this._to=o,this._promises=void 0}active(){return this._active}update(i,t,n){if(this._active){this._notify(!1);let o=this._target[this._prop],s=n-this._start,a=this._duration-s;this._start=n,this._duration=Math.floor(Math.max(a,i.duration)),this._total+=s,this._loop=!!i.loop,this._to=Qe([i.to,t,o,i.from]),this._from=Qe([i.from,o,t])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(i){let t=i-this._start,n=this._duration,o=this._prop,s=this._from,a=this._loop,r=this._to,c;if(this._active=s!==r&&(a||t<n),!this._active){this._target[o]=r,this._notify(!0);return}if(t<0){this._target[o]=s;return}c=t/n%2,c=a&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[o]=this._fn(s,r,c)}wait(){let i=this._promises||(this._promises=[]);return new Promise((t,n)=>{i.push({res:t,rej:n})})}_notify(i){let t=i?"res":"rej",n=this._promises||[];for(let o=0;o<n.length;o++)n[o][t]()}},Pi=class{constructor(i,t){this._chart=i,this._properties=new Map,this.configure(t)}configure(i){if(!W(i))return;let t=Object.keys(J.animation),n=this._properties;Object.getOwnPropertyNames(i).forEach(o=>{let s=i[o];if(!W(s))return;let a={};for(let r of t)a[r]=s[r];(G(s.properties)&&s.properties||[o]).forEach(r=>{(r===o||!n.has(r))&&n.set(r,a)})})}_animateOptions(i,t){let n=t.options,o=sl(i,n);if(!o)return[];let s=this._createAnimations(o,n);return n.$shared&&ol(i.options.$animations,n).then(()=>{i.options=n},()=>{}),s}_createAnimations(i,t){let n=this._properties,o=[],s=i.$animations||(i.$animations={}),a=Object.keys(t),r=Date.now(),c;for(c=a.length-1;c>=0;--c){let l=a[c];if(l.charAt(0)==="$")continue;if(l==="options"){o.push(...this._animateOptions(i,t));continue}let d=t[l],h=s[l],f=n.get(l);if(h)if(f&&h.active()){h.update(f,d,r);continue}else h.cancel();if(!f||!f.duration){i[l]=d;continue}s[l]=h=new Io(f,i,l,d),o.push(h)}return o}update(i,t){if(this._properties.size===0){Object.assign(i,t);return}let n=this._createAnimations(i,t);if(n.length)return Yt.add(this._chart,n),!0}};function ol(e,i){let t=[],n=Object.keys(i);for(let o=0;o<n.length;o++){let s=e[n[o]];s&&s.active()&&t.push(s.wait())}return Promise.all(t)}function sl(e,i){if(!i)return;let t=e.options;if(!t){e.options=i;return}return t.$shared&&(e.options=t=Object.assign({},t,{$shared:!1,$animations:{}})),t}function ha(e,i){let t=e&&e.options||{},n=t.reverse,o=t.min===void 0?i:0,s=t.max===void 0?i:0;return{start:n?s:o,end:n?o:s}}function al(e,i,t){if(t===!1)return!1;let n=ha(e,t),o=ha(i,t);return{top:o.end,right:n.end,bottom:o.start,left:n.start}}function rl(e){let i,t,n,o;return W(e)?(i=e.top,t=e.right,n=e.bottom,o=e.left):i=t=n=o=e,{top:i,right:t,bottom:n,left:o,disabled:e===!1}}function dr(e,i){let t=[],n=e._getSortedDatasetMetas(i),o,s;for(o=0,s=n.length;o<s;++o)t.push(n[o].index);return t}function fa(e,i,t,n={}){let o=e.keys,s=n.mode==="single",a,r,c,l;if(i===null)return;let d=!1;for(a=0,r=o.length;a<r;++a){if(c=+o[a],c===t){if(d=!0,n.all)continue;break}l=e.values[c],tt(l)&&(s||i===0||Tt(i)===Tt(l))&&(i+=l)}return!d&&!n.all?0:i}function cl(e,i){let{iScale:t,vScale:n}=i,o=t.axis==="x"?"x":"y",s=n.axis==="x"?"x":"y",a=Object.keys(e),r=new Array(a.length),c,l,d;for(c=0,l=a.length;c<l;++c)d=a[c],r[c]={[o]:d,[s]:e[d]};return r}function yo(e,i){let t=e&&e.options.stacked;return t||t===void 0&&i.stack!==void 0}function ll(e,i,t){return`${e.id}.${i.id}.${t.stack||t.type}`}function dl(e){let{min:i,max:t,minDefined:n,maxDefined:o}=e.getUserBounds();return{min:n?i:Number.NEGATIVE_INFINITY,max:o?t:Number.POSITIVE_INFINITY}}function hl(e,i,t){let n=e[i]||(e[i]={});return n[t]||(n[t]={})}function ua(e,i,t,n){for(let o of i.getMatchingVisibleMetas(n).reverse()){let s=e[o.index];if(t&&s>0||!t&&s<0)return o.index}return null}function ga(e,i){let{chart:t,_cachedMeta:n}=e,o=t._stacks||(t._stacks={}),{iScale:s,vScale:a,index:r}=n,c=s.axis,l=a.axis,d=ll(s,a,n),h=i.length,f;for(let u=0;u<h;++u){let g=i[u],{[c]:p,[l]:m}=g,x=g._stacks||(g._stacks={});f=x[l]=hl(o,d,p),f[r]=m,f._top=ua(f,a,!0,n.type),f._bottom=ua(f,a,!1,n.type);let y=f._visualValues||(f._visualValues={});y[r]=m}}function Mo(e,i){let t=e.scales;return Object.keys(t).filter(n=>t[n].axis===i).shift()}function fl(e,i){return $t(e,{active:!1,dataset:void 0,datasetIndex:i,index:i,mode:"default",type:"dataset"})}function ul(e,i,t){return $t(e,{active:!1,dataIndex:i,parsed:void 0,raw:void 0,element:t,index:i,mode:"default",type:"data"})}function mn(e,i){let t=e.controller.index,n=e.vScale&&e.vScale.axis;if(n){i=i||e._parsed;for(let o of i){let s=o._stacks;if(!s||s[n]===void 0||s[n][t]===void 0)return;delete s[n][t],s[n]._visualValues!==void 0&&s[n]._visualValues[t]!==void 0&&delete s[n]._visualValues[t]}}}var Co=e=>e==="reset"||e==="none",pa=(e,i)=>i?e:Object.assign({},e),gl=(e,i,t)=>e&&!i.hidden&&i._stacked&&{keys:dr(t,!0),values:null},Ce=(()=>{class e{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){let t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=yo(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&mn(this._cachedMeta),this.index=t}linkScales(){let t=this.chart,n=this._cachedMeta,o=this.getDataset(),s=(f,u,g,p)=>f==="x"?u:f==="r"?p:g,a=n.xAxisID=L(o.xAxisID,Mo(t,"x")),r=n.yAxisID=L(o.yAxisID,Mo(t,"y")),c=n.rAxisID=L(o.rAxisID,Mo(t,"r")),l=n.indexAxis,d=n.iAxisID=s(l,a,r,c),h=n.vAxisID=s(l,r,a,c);n.xScale=this.getScaleForId(a),n.yScale=this.getScaleForId(r),n.rScale=this.getScaleForId(c),n.iScale=this.getScaleForId(d),n.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){let n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){let t=this._cachedMeta;this._data&&Ji(this._data,this),t._stacked&&mn(t)}_dataCheck(){let t=this.getDataset(),n=t.data||(t.data=[]),o=this._data;if(W(n)){let s=this._cachedMeta;this._data=cl(n,s)}else if(o!==n){if(o){Ji(o,this);let s=this._cachedMeta;mn(s),s._parsed=[]}n&&Object.isExtensible(n)&&Ys(n,this),this._syncList=[],this._data=n}}addElements(){let t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){let n=this._cachedMeta,o=this.getDataset(),s=!1;this._dataCheck();let a=n._stacked;n._stacked=yo(n.vScale,n),n.stack!==o.stack&&(s=!0,mn(n),n.stack=o.stack),this._resyncElements(t),(s||a!==n._stacked)&&(ga(this,n._parsed),n._stacked=yo(n.vScale,n))}configure(){let t=this.chart.config,n=t.datasetScopeKeys(this._type),o=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(o,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){let{_cachedMeta:o,_data:s}=this,{iScale:a,_stacked:r}=o,c=a.axis,l=t===0&&n===s.length?!0:o._sorted,d=t>0&&o._parsed[t-1],h,f,u;if(this._parsing===!1)o._parsed=s,o._sorted=!0,u=s;else{G(s[t])?u=this.parseArrayData(o,s,t,n):W(s[t])?u=this.parseObjectData(o,s,t,n):u=this.parsePrimitiveData(o,s,t,n);let g=()=>f[c]===null||d&&f[c]<d[c];for(h=0;h<n;++h)o._parsed[h+t]=f=u[h],l&&(g()&&(l=!1),d=f);o._sorted=l}r&&ga(this,u)}parsePrimitiveData(t,n,o,s){let{iScale:a,vScale:r}=t,c=a.axis,l=r.axis,d=a.getLabels(),h=a===r,f=new Array(s),u,g,p;for(u=0,g=s;u<g;++u)p=u+o,f[u]={[c]:h||a.parse(d[p],p),[l]:r.parse(n[p],p)};return f}parseArrayData(t,n,o,s){let{xScale:a,yScale:r}=t,c=new Array(s),l,d,h,f;for(l=0,d=s;l<d;++l)h=l+o,f=n[h],c[l]={x:a.parse(f[0],h),y:r.parse(f[1],h)};return c}parseObjectData(t,n,o,s){let{xScale:a,yScale:r}=t,{xAxisKey:c="x",yAxisKey:l="y"}=this._parsing,d=new Array(s),h,f,u,g;for(h=0,f=s;h<f;++h)u=h+o,g=n[u],d[h]={x:a.parse(jt(g,c),u),y:r.parse(jt(g,l),u)};return d}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,o){let s=this.chart,a=this._cachedMeta,r=n[t.axis],c={keys:dr(s,!0),values:n._stacks[t.axis]._visualValues};return fa(c,r,a.index,{mode:o})}updateRangeFromParsed(t,n,o,s){let a=o[n.axis],r=a===null?NaN:a,c=s&&o._stacks[n.axis];s&&c&&(s.values=c,r=fa(s,a,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,n){let o=this._cachedMeta,s=o._parsed,a=o._sorted&&t===o.iScale,r=s.length,c=this._getOtherScale(t),l=gl(n,o,this.chart),d={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:f}=dl(c),u,g;function p(){g=s[u];let m=g[c.axis];return!tt(g[t.axis])||h>m||f<m}for(u=0;u<r&&!(!p()&&(this.updateRangeFromParsed(d,t,g,l),a));++u);if(a){for(u=r-1;u>=0;--u)if(!p()){this.updateRangeFromParsed(d,t,g,l);break}}return d}getAllParsedValues(t){let n=this._cachedMeta._parsed,o=[],s,a,r;for(s=0,a=n.length;s<a;++s)r=n[s][t.axis],tt(r)&&o.push(r);return o}getMaxOverflow(){return!1}getLabelAndValue(t){let n=this._cachedMeta,o=n.iScale,s=n.vScale,a=this.getParsed(t);return{label:o?""+o.getLabelForValue(a[o.axis]):"",value:s?""+s.getLabelForValue(a[s.axis]):""}}_update(t){let n=this._cachedMeta;this.update(t||"default"),n._clip=rl(L(this.options.clip,al(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){let t=this._ctx,n=this.chart,o=this._cachedMeta,s=o.data||[],a=n.chartArea,r=[],c=this._drawStart||0,l=this._drawCount||s.length-c,d=this.options.drawActiveElementsOnTop,h;for(o.dataset&&o.dataset.draw(t,a,c,l),h=c;h<c+l;++h){let f=s[h];f.hidden||(f.active&&d?r.push(f):f.draw(t,a))}for(h=0;h<r.length;++h)r[h].draw(t,a)}getStyle(t,n){let o=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(o):this.resolveDataElementOptions(t||0,o)}getContext(t,n,o){let s=this.getDataset(),a;if(t>=0&&t<this._cachedMeta.data.length){let r=this._cachedMeta.data[t];a=r.$context||(r.$context=ul(this.getContext(),t,r)),a.parsed=this.getParsed(t),a.raw=s.data[t],a.index=a.dataIndex=t}else a=this.$context||(this.$context=fl(this.chart.getContext(),this.index)),a.dataset=s,a.index=a.datasetIndex=this.index;return a.active=!!n,a.mode=o,a}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",o){let s=n==="active",a=this._cachedDataOpts,r=t+"-"+n,c=a[r],l=this.enableOptionSharing&&Xe(o);if(c)return pa(c,l);let d=this.chart.config,h=d.datasetElementScopeKeys(this._type,t),f=s?[`${t}Hover`,"hover",t,""]:[t,""],u=d.getOptionScopes(this.getDataset(),h),g=Object.keys(J.elements[t]),p=()=>this.getContext(o,s,n),m=d.resolveNamedOptions(u,g,p,f);return m.$shared&&(m.$shared=l,a[r]=Object.freeze(pa(m,l))),m}_resolveAnimations(t,n,o){let s=this.chart,a=this._cachedDataOpts,r=`animation-${n}`,c=a[r];if(c)return c;let l;if(s.options.animation!==!1){let h=this.chart.config,f=h.datasetAnimationScopeKeys(this._type,n),u=h.getOptionScopes(this.getDataset(),f);l=h.createResolver(u,this.getContext(t,o,n))}let d=new Pi(s,l&&l.animations);return l&&l._cacheable&&(a[r]=Object.freeze(d)),d}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Co(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){let o=this.resolveDataElementOptions(t,n),s=this._sharedOptions,a=this.getSharedOptions(o),r=this.includeOptions(n,a)||a!==s;return this.updateSharedOptions(a,n,o),{sharedOptions:a,includeOptions:r}}updateElement(t,n,o,s){Co(s)?Object.assign(t,o):this._resolveAnimations(n,s).update(t,o)}updateSharedOptions(t,n,o){t&&!Co(n)&&this._resolveAnimations(void 0,n).update(t,o)}_setStyle(t,n,o,s){t.active=s;let a=this.getStyle(n,s);this._resolveAnimations(n,o,s).update(t,{options:!s&&this.getSharedOptions(a)||a})}removeHoverStyle(t,n,o){this._setStyle(t,o,"active",!1)}setHoverStyle(t,n,o){this._setStyle(t,o,"active",!0)}_removeDatasetHoverStyle(){let t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){let t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){let n=this._data,o=this._cachedMeta.data;for(let[c,l,d]of this._syncList)this[c](l,d);this._syncList=[];let s=o.length,a=n.length,r=Math.min(a,s);r&&this.parse(0,r),a>s?this._insertElements(s,a-s,t):a<s&&this._removeElements(a,s-a)}_insertElements(t,n,o=!0){let s=this._cachedMeta,a=s.data,r=t+n,c,l=d=>{for(d.length+=n,c=d.length-1;c>=r;c--)d[c]=d[c-n]};for(l(a),c=t;c<r;++c)a[c]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,n),o&&this.updateElements(a,t,n,"reset")}updateElements(t,n,o,s){}_removeElements(t,n){let o=this._cachedMeta;if(this._parsing){let s=o._parsed.splice(t,n);o._stacked&&mn(o,s)}o.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{let[n,o,s]=t;this[n](o,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){let t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);let o=arguments.length-2;o&&this._sync(["_insertElements",t,o])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}return e})();function pl(e,i){if(!e._cache.$bar){let t=e.getMatchingVisibleMetas(i),n=[];for(let o=0,s=t.length;o<s;o++)n=n.concat(t[o].controller.getAllParsedValues(e));e._cache.$bar=Zi(n.sort((o,s)=>o-s))}return e._cache.$bar}function ml(e){let i=e.iScale,t=pl(i,e.type),n=i._length,o,s,a,r,c=()=>{a===32767||a===-32768||(Xe(r)&&(n=Math.min(n,Math.abs(a-r)||n)),r=a)};for(o=0,s=t.length;o<s;++o)a=i.getPixelForValue(t[o]),c();for(r=void 0,o=0,s=i.ticks.length;o<s;++o)a=i.getPixelForTick(o),c();return n}function _l(e,i,t,n){let o=t.barThickness,s,a;return B(o)?(s=i.min*t.categoryPercentage,a=t.barPercentage):(s=o*n,a=1),{chunk:s/n,ratio:a,start:i.pixels[e]-s/2}}function bl(e,i,t,n){let o=i.pixels,s=o[e],a=e>0?o[e-1]:null,r=e<o.length-1?o[e+1]:null,c=t.categoryPercentage;a===null&&(a=s-(r===null?i.end-i.start:r-s)),r===null&&(r=s+s-a);let l=s-(s-Math.min(a,r))/2*c;return{chunk:Math.abs(r-a)/2*c/n,ratio:t.barPercentage,start:l}}function xl(e,i,t,n){let o=t.parse(e[0],n),s=t.parse(e[1],n),a=Math.min(o,s),r=Math.max(o,s),c=a,l=r;Math.abs(a)>Math.abs(r)&&(c=r,l=a),i[t.axis]=l,i._custom={barStart:c,barEnd:l,start:o,end:s,min:a,max:r}}function hr(e,i,t,n){return G(e)?xl(e,i,t,n):i[t.axis]=t.parse(e,n),i}function ma(e,i,t,n){let o=e.iScale,s=e.vScale,a=o.getLabels(),r=o===s,c=[],l,d,h,f;for(l=t,d=t+n;l<d;++l)f=i[l],h={},h[o.axis]=r||o.parse(a[l],l),c.push(hr(f,h,s,l));return c}function Po(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function yl(e,i,t){return e!==0?Tt(e):(i.isHorizontal()?1:-1)*(i.min>=t?1:-1)}function Ml(e){let i,t,n,o,s;return e.horizontal?(i=e.base>e.x,t="left",n="right"):(i=e.base<e.y,t="bottom",n="top"),i?(o="end",s="start"):(o="start",s="end"),{start:t,end:n,reverse:i,top:o,bottom:s}}function Cl(e,i,t,n){let o=i.borderSkipped,s={};if(!o){e.borderSkipped=s;return}if(o===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}let{start:a,end:r,reverse:c,top:l,bottom:d}=Ml(e);o==="middle"&&t&&(e.enableBorderRadius=!0,(t._top||0)===n?o=l:(t._bottom||0)===n?o=d:(s[_a(d,a,r,c)]=!0,o=l)),s[_a(o,a,r,c)]=!0,e.borderSkipped=s}function _a(e,i,t,n){return n?(e=Pl(e,i,t),e=ba(e,t,i)):e=ba(e,i,t),e}function Pl(e,i,t){return e===i?t:e===t?i:e}function ba(e,i,t){return e==="start"?i:e==="end"?t:e}function vl(e,{inflateAmount:i},t){e.inflateAmount=i==="auto"?t===1?.33:0:i}var wl=(()=>{class e extends Ce{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,n,o,s){return ma(t,n,o,s)}parseArrayData(t,n,o,s){return ma(t,n,o,s)}parseObjectData(t,n,o,s){let{iScale:a,vScale:r}=t,{xAxisKey:c="x",yAxisKey:l="y"}=this._parsing,d=a.axis==="x"?c:l,h=r.axis==="x"?c:l,f=[],u,g,p,m;for(u=o,g=o+s;u<g;++u)m=n[u],p={},p[a.axis]=a.parse(jt(m,d),u),f.push(hr(jt(m,h),p,r,u));return f}updateRangeFromParsed(t,n,o,s){super.updateRangeFromParsed(t,n,o,s);let a=o._custom;a&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,a.min),t.max=Math.max(t.max,a.max))}getMaxOverflow(){return 0}getLabelAndValue(t){let n=this._cachedMeta,{iScale:o,vScale:s}=n,a=this.getParsed(t),r=a._custom,c=Po(r)?"["+r.start+", "+r.end+"]":""+s.getLabelForValue(a[s.axis]);return{label:""+o.getLabelForValue(a[o.axis]),value:c}}initialize(){this.enableOptionSharing=!0,super.initialize();let t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){let n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,o,s){let a=s==="reset",{index:r,_cachedMeta:{vScale:c}}=this,l=c.getBasePixel(),d=c.isHorizontal(),h=this._getRuler(),{sharedOptions:f,includeOptions:u}=this._getSharedOptions(n,s);for(let g=n;g<n+o;g++){let p=this.getParsed(g),m=a||B(p[c.axis])?{base:l,head:l}:this._calculateBarValuePixels(g),x=this._calculateBarIndexPixels(g,h),y=(p._stacks||{})[c.axis],v={horizontal:d,base:m.base,enableBorderRadius:!y||Po(p._custom)||r===y._top||r===y._bottom,x:d?m.head:x.center,y:d?x.center:m.head,height:d?x.size:Math.abs(m.size),width:d?Math.abs(m.size):x.size};u&&(v.options=f||this.resolveDataElementOptions(g,t[g].active?"active":s));let O=v.options||t[g].options;Cl(v,O,y,r),vl(v,O,h.ratio),this.updateElement(t[g],g,v,s)}}_getStacks(t,n){let{iScale:o}=this._cachedMeta,s=o.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),a=o.options.stacked,r=[],c=this._cachedMeta.controller.getParsed(n),l=c&&c[o.axis],d=h=>{let f=h._parsed.find(g=>g[o.axis]===l),u=f&&f[h.vScale.axis];if(B(u)||isNaN(u))return!0};for(let h of s)if(!(n!==void 0&&d(h))&&((a===!1||r.indexOf(h.stack)===-1||a===void 0&&h.stack===void 0)&&r.push(h.stack),h.index===t))break;return r.length||r.push(void 0),r}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){let t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(o=>t[o].axis===n).shift()}_getAxis(){let t={},n=this.getFirstScaleIdForIndexAxis();for(let o of this.chart.data.datasets)t[L(this.chart.options.indexAxis==="x"?o.xAxisID:o.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,o){let s=this._getStacks(t,o),a=n!==void 0?s.indexOf(n):-1;return a===-1?s.length-1:a}_getRuler(){let t=this.options,n=this._cachedMeta,o=n.iScale,s=[],a,r;for(a=0,r=n.data.length;a<r;++a)s.push(o.getPixelForValue(this.getParsed(a)[o.axis],a));let c=t.barThickness;return{min:c||ml(n),pixels:s,start:o._startPixel,end:o._endPixel,stackCount:this._getStackCount(),scale:o,grouped:t.grouped,ratio:c?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){let{_cachedMeta:{vScale:n,_stacked:o,index:s},options:{base:a,minBarLength:r}}=this,c=a||0,l=this.getParsed(t),d=l._custom,h=Po(d),f=l[n.axis],u=0,g=o?this.applyStack(n,l,o):f,p,m;g!==f&&(u=g-f,g=f),h&&(f=d.barStart,g=d.barEnd-d.barStart,f!==0&&Tt(f)!==Tt(d.barEnd)&&(u=0),u+=f);let x=!B(a)&&!h?a:u,y=n.getPixelForValue(x);if(this.chart.getDataVisibility(t)?p=n.getPixelForValue(u+g):p=y,m=p-y,Math.abs(m)<r){m=yl(m,n,c)*r,f===c&&(y-=m/2);let v=n.getPixelForDecimal(0),O=n.getPixelForDecimal(1),P=Math.min(v,O),w=Math.max(v,O);y=Math.max(Math.min(y,w),P),p=y+m,o&&!h&&(l._stacks[n.axis]._visualValues[s]=n.getValueForPixel(p)-n.getValueForPixel(y))}if(y===n.getPixelForValue(c)){let v=Tt(m)*n.getLineWidthForValue(c)/2;y+=v,m-=v}return{size:m,base:y,head:p,center:p+m/2}}_calculateBarIndexPixels(t,n){let o=n.scale,s=this.options,a=s.skipNull,r=L(s.maxBarThickness,1/0),c,l,d=this._getAxisCount();if(n.grouped){let h=a?this._getStackCount(t):n.stackCount,f=s.barThickness==="flex"?bl(t,n,s,h*d):_l(t,n,s,h*d),u=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,g=this._getAxis().indexOf(L(u,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,a?t:void 0)+g;c=f.start+f.chunk*p+f.chunk/2,l=Math.min(r,f.chunk*f.ratio)}else c=o.getPixelForValue(this.getParsed(t)[o.axis],t),l=Math.min(r,n.min*n.ratio);return{base:c-l/2,head:c+l/2,center:c,size:l}}draw(){let t=this._cachedMeta,n=t.vScale,o=t.data,s=o.length,a=0;for(;a<s;++a)this.getParsed(a)[n.axis]!==null&&!o[a].hidden&&o[a].draw(this._ctx)}}return e})(),Ol=(()=>{class e extends Ce{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,o,s){let a=super.parsePrimitiveData(t,n,o,s);for(let r=0;r<a.length;r++)a[r]._custom=this.resolveDataElementOptions(r+o).radius;return a}parseArrayData(t,n,o,s){let a=super.parseArrayData(t,n,o,s);for(let r=0;r<a.length;r++){let c=n[o+r];a[r]._custom=L(c[2],this.resolveDataElementOptions(r+o).radius)}return a}parseObjectData(t,n,o,s){let a=super.parseObjectData(t,n,o,s);for(let r=0;r<a.length;r++){let c=n[o+r];a[r]._custom=L(c&&c.r&&+c.r,this.resolveDataElementOptions(r+o).radius)}return a}getMaxOverflow(){let t=this._cachedMeta.data,n=0;for(let o=t.length-1;o>=0;--o)n=Math.max(n,t[o].size(this.resolveDataElementOptions(o))/2);return n>0&&n}getLabelAndValue(t){let n=this._cachedMeta,o=this.chart.data.labels||[],{xScale:s,yScale:a}=n,r=this.getParsed(t),c=s.getLabelForValue(r.x),l=a.getLabelForValue(r.y),d=r._custom;return{label:o[t]||"",value:"("+c+", "+l+(d?", "+d:"")+")"}}update(t){let n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,o,s){let a=s==="reset",{iScale:r,vScale:c}=this._cachedMeta,{sharedOptions:l,includeOptions:d}=this._getSharedOptions(n,s),h=r.axis,f=c.axis;for(let u=n;u<n+o;u++){let g=t[u],p=!a&&this.getParsed(u),m={},x=m[h]=a?r.getPixelForDecimal(.5):r.getPixelForValue(p[h]),y=m[f]=a?c.getBasePixel():c.getPixelForValue(p[f]);m.skip=isNaN(x)||isNaN(y),d&&(m.options=l||this.resolveDataElementOptions(u,g.active?"active":s),a&&(m.options.radius=0)),this.updateElement(g,u,m,s)}}resolveDataElementOptions(t,n){let o=this.getParsed(t),s=super.resolveDataElementOptions(t,n);s.$shared&&(s=Object.assign({},s,{$shared:!1}));let a=s.radius;return n!=="active"&&(s.radius=0),s.radius+=L(o&&o._custom,a),s}}return e})();function kl(e,i,t){let n=1,o=1,s=0,a=0;if(i<K){let r=e,c=r+i,l=Math.cos(r),d=Math.sin(r),h=Math.cos(c),f=Math.sin(c),u=(v,O,P)=>Ke(v,r,c,!0)?1:Math.max(O,O*t,P,P*t),g=(v,O,P)=>Ke(v,r,c,!0)?-1:Math.min(O,O*t,P,P*t),p=u(0,l,h),m=u(et,d,f),x=g(N,l,h),y=g(N+et,d,f);n=(p-x)/2,o=(m-y)/2,s=-(p+x)/2,a=-(m+y)/2}return{ratioX:n,ratioY:o,offsetX:s,offsetY:a}}var Zo=(()=>{class e extends Ce{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){let n=t.data,{labels:{pointStyle:o,textAlign:s,color:a,useBorderRadius:r,borderRadius:c}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((l,d)=>{let f=t.getDatasetMeta(0).controller.getStyle(d);return{text:l,fillStyle:f.backgroundColor,fontColor:a,hidden:!t.getDataVisibility(d),lineDash:f.borderDash,lineDashOffset:f.borderDashOffset,lineJoin:f.borderJoinStyle,lineWidth:f.borderWidth,strokeStyle:f.borderColor,textAlign:s,pointStyle:o,borderRadius:r&&(c||f.borderRadius),index:d}}):[]}},onClick(t,n,o){o.chart.toggleDataVisibility(n.index),o.chart.update()}}}};constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){let o=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=o;else{let a=l=>+o[l];if(W(o[t])){let{key:l="value"}=this._parsing;a=d=>+jt(o[d],l)}let r,c;for(r=t,c=t+n;r<c;++r)s._parsed[r]=a(r)}}_getRotation(){return Dt(this.options.rotation-90)}_getCircumference(){return Dt(this.options.circumference)}_getRotationExtents(){let t=K,n=-K;for(let o=0;o<this.chart.data.datasets.length;++o)if(this.chart.isDatasetVisible(o)&&this.chart.getDatasetMeta(o).type===this._type){let s=this.chart.getDatasetMeta(o).controller,a=s._getRotation(),r=s._getCircumference();t=Math.min(t,a),n=Math.max(n,a+r)}return{rotation:t,circumference:n-t}}update(t){let n=this.chart,{chartArea:o}=n,s=this._cachedMeta,a=s.data,r=this.getMaxBorderWidth()+this.getMaxOffset(a)+this.options.spacing,c=Math.max((Math.min(o.width,o.height)-r)/2,0),l=Math.min(Fs(this.options.cutout,c),1),d=this._getRingWeight(this.index),{circumference:h,rotation:f}=this._getRotationExtents(),{ratioX:u,ratioY:g,offsetX:p,offsetY:m}=kl(f,h,l),x=(o.width-r)/u,y=(o.height-r)/g,v=Math.max(Math.min(x,y)/2,0),O=Yi(this.options.radius,v),P=Math.max(O*l,0),w=(O-P)/this._getVisibleDatasetWeightTotal();this.offsetX=p*O,this.offsetY=m*O,s.total=this.calculateTotal(),this.outerRadius=O-w*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-w*d,0),this.updateElements(a,0,a.length,t)}_circumference(t,n){let o=this.options,s=this._cachedMeta,a=this._getCircumference();return n&&o.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*a/K)}updateElements(t,n,o,s){let a=s==="reset",r=this.chart,c=r.chartArea,d=r.options.animation,h=(c.left+c.right)/2,f=(c.top+c.bottom)/2,u=a&&d.animateScale,g=u?0:this.innerRadius,p=u?0:this.outerRadius,{sharedOptions:m,includeOptions:x}=this._getSharedOptions(n,s),y=this._getRotation(),v;for(v=0;v<n;++v)y+=this._circumference(v,a);for(v=n;v<n+o;++v){let O=this._circumference(v,a),P=t[v],w={x:h+this.offsetX,y:f+this.offsetY,startAngle:y,endAngle:y+O,circumference:O,outerRadius:p,innerRadius:g};x&&(w.options=m||this.resolveDataElementOptions(v,P.active?"active":s)),y+=O,this.updateElement(P,v,w,s)}}calculateTotal(){let t=this._cachedMeta,n=t.data,o=0,s;for(s=0;s<n.length;s++){let a=t._parsed[s];a!==null&&!isNaN(a)&&this.chart.getDataVisibility(s)&&!n[s].hidden&&(o+=Math.abs(a))}return o}calculateCircumference(t){let n=this._cachedMeta.total;return n>0&&!isNaN(t)?K*(Math.abs(t)/n):0}getLabelAndValue(t){let n=this._cachedMeta,o=this.chart,s=o.data.labels||[],a=Je(n._parsed[t],o.options.locale);return{label:s[t]||"",value:a}}getMaxBorderWidth(t){let n=0,o=this.chart,s,a,r,c,l;if(!t){for(s=0,a=o.data.datasets.length;s<a;++s)if(o.isDatasetVisible(s)){r=o.getDatasetMeta(s),t=r.data,c=r.controller;break}}if(!t)return 0;for(s=0,a=t.length;s<a;++s)l=c.resolveDataElementOptions(s),l.borderAlign!=="inner"&&(n=Math.max(n,l.borderWidth||0,l.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let o=0,s=t.length;o<s;++o){let a=this.resolveDataElementOptions(o);n=Math.max(n,a.offset||0,a.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let o=0;o<t;++o)this.chart.isDatasetVisible(o)&&(n+=this._getRingWeight(o));return n}_getRingWeight(t){return Math.max(L(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}return e})(),Sl=(()=>{class e extends Ce{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){let n=this._cachedMeta,{dataset:o,data:s=[],_dataset:a}=n,r=this.chart._animationsDisabled,{start:c,count:l}=eo(n,s,r);this._drawStart=c,this._drawCount=l,no(n)&&(c=0,l=s.length),o._chart=this.chart,o._datasetIndex=this.index,o._decimated=!!a._decimated,o.points=s;let d=this.resolveDatasetElementOptions(t);this.options.showLine||(d.borderWidth=0),d.segment=this.options.segment,this.updateElement(o,void 0,{animated:!r,options:d},t),this.updateElements(s,c,l,t)}updateElements(t,n,o,s){let a=s==="reset",{iScale:r,vScale:c,_stacked:l,_dataset:d}=this._cachedMeta,{sharedOptions:h,includeOptions:f}=this._getSharedOptions(n,s),u=r.axis,g=c.axis,{spanGaps:p,segment:m}=this.options,x=Te(p)?p:Number.POSITIVE_INFINITY,y=this.chart._animationsDisabled||a||s==="none",v=n+o,O=t.length,P=n>0&&this.getParsed(n-1);for(let w=0;w<O;++w){let D=t[w],k=y?D:{};if(w<n||w>=v){k.skip=!0;continue}let T=this.getParsed(w),E=B(T[g]),R=k[u]=r.getPixelForValue(T[u],w),z=k[g]=a||E?c.getBasePixel():c.getPixelForValue(l?this.applyStack(c,T,l):T[g],w);k.skip=isNaN(R)||isNaN(z)||E,k.stop=w>0&&Math.abs(T[u]-P[u])>x,m&&(k.parsed=T,k.raw=d.data[w]),f&&(k.options=h||this.resolveDataElementOptions(w,D.active?"active":s)),y||this.updateElement(D,w,k,s),P=T}}getMaxOverflow(){let t=this._cachedMeta,n=t.dataset,o=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return o;let a=s[0].size(this.resolveDataElementOptions(0)),r=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(o,a,r)/2}draw(){let t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}return e})(),fr=(()=>{class e extends Ce{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){let n=t.data;if(n.labels.length&&n.datasets.length){let{labels:{pointStyle:o,color:s}}=t.legend.options;return n.labels.map((a,r)=>{let l=t.getDatasetMeta(0).controller.getStyle(r);return{text:a,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:s,lineWidth:l.borderWidth,pointStyle:o,hidden:!t.getDataVisibility(r),index:r}})}return[]}},onClick(t,n,o){o.chart.toggleDataVisibility(n.index),o.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){let n=this._cachedMeta,o=this.chart,s=o.data.labels||[],a=Je(n._parsed[t].r,o.options.locale);return{label:s[t]||"",value:a}}parseObjectData(t,n,o,s){return fo.bind(this)(t,n,o,s)}update(t){let n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){let t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((o,s)=>{let a=this.getParsed(s).r;!isNaN(a)&&this.chart.getDataVisibility(s)&&(a<n.min&&(n.min=a),a>n.max&&(n.max=a))}),n}_updateRadius(){let t=this.chart,n=t.chartArea,o=t.options,s=Math.min(n.right-n.left,n.bottom-n.top),a=Math.max(s/2,0),r=Math.max(o.cutoutPercentage?a/100*o.cutoutPercentage:1,0),c=(a-r)/t.getVisibleDatasetCount();this.outerRadius=a-c*this.index,this.innerRadius=this.outerRadius-c}updateElements(t,n,o,s){let a=s==="reset",r=this.chart,l=r.options.animation,d=this._cachedMeta.rScale,h=d.xCenter,f=d.yCenter,u=d.getIndexAngle(0)-.5*N,g=u,p,m=360/this.countVisibleElements();for(p=0;p<n;++p)g+=this._computeAngle(p,s,m);for(p=n;p<n+o;p++){let x=t[p],y=g,v=g+this._computeAngle(p,s,m),O=r.getDataVisibility(p)?d.getDistanceFromCenterForValue(this.getParsed(p).r):0;g=v,a&&(l.animateScale&&(O=0),l.animateRotate&&(y=v=u));let P={x:h,y:f,innerRadius:0,outerRadius:O,startAngle:y,endAngle:v,options:this.resolveDataElementOptions(p,x.active?"active":s)};this.updateElement(x,p,P,s)}}countVisibleElements(){let t=this._cachedMeta,n=0;return t.data.forEach((o,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&n++}),n}_computeAngle(t,n,o){return this.chart.getDataVisibility(t)?Dt(this.resolveDataElementOptions(t,n).angle||o):0}}return e})(),Dl=(()=>{class e extends Zo{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}return e})(),Tl=(()=>{class e extends Ce{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){let n=this._cachedMeta.vScale,o=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(o[n.axis])}}parseObjectData(t,n,o,s){return fo.bind(this)(t,n,o,s)}update(t){let n=this._cachedMeta,o=n.dataset,s=n.data||[],a=n.iScale.getLabels();if(o.points=s,t!=="resize"){let r=this.resolveDatasetElementOptions(t);this.options.showLine||(r.borderWidth=0);let c={_loop:!0,_fullLoop:a.length===s.length,options:r};this.updateElement(o,void 0,c,t)}this.updateElements(s,0,s.length,t)}updateElements(t,n,o,s){let a=this._cachedMeta.rScale,r=s==="reset";for(let c=n;c<n+o;c++){let l=t[c],d=this.resolveDataElementOptions(c,l.active?"active":s),h=a.getPointPositionForValue(c,this.getParsed(c).r),f=r?a.xCenter:h.x,u=r?a.yCenter:h.y,g={x:f,y:u,angle:h.angle,skip:isNaN(f)||isNaN(u),options:d};this.updateElement(l,c,g,s)}}}return e})(),Al=(()=>{class e extends Ce{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){let n=this._cachedMeta,o=this.chart.data.labels||[],{xScale:s,yScale:a}=n,r=this.getParsed(t),c=s.getLabelForValue(r.x),l=a.getLabelForValue(r.y);return{label:o[t]||"",value:"("+c+", "+l+")"}}update(t){let n=this._cachedMeta,{data:o=[]}=n,s=this.chart._animationsDisabled,{start:a,count:r}=eo(n,o,s);if(this._drawStart=a,this._drawCount=r,no(n)&&(a=0,r=o.length),this.options.showLine){this.datasetElementType||this.addElements();let{dataset:c,_dataset:l}=n;c._chart=this.chart,c._datasetIndex=this.index,c._decimated=!!l._decimated,c.points=o;let d=this.resolveDatasetElementOptions(t);d.segment=this.options.segment,this.updateElement(c,void 0,{animated:!s,options:d},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(o,a,r,t)}addElements(){let{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,o,s){let a=s==="reset",{iScale:r,vScale:c,_stacked:l,_dataset:d}=this._cachedMeta,h=this.resolveDataElementOptions(n,s),f=this.getSharedOptions(h),u=this.includeOptions(s,f),g=r.axis,p=c.axis,{spanGaps:m,segment:x}=this.options,y=Te(m)?m:Number.POSITIVE_INFINITY,v=this.chart._animationsDisabled||a||s==="none",O=n>0&&this.getParsed(n-1);for(let P=n;P<n+o;++P){let w=t[P],D=this.getParsed(P),k=v?w:{},T=B(D[p]),E=k[g]=r.getPixelForValue(D[g],P),R=k[p]=a||T?c.getBasePixel():c.getPixelForValue(l?this.applyStack(c,D,l):D[p],P);k.skip=isNaN(E)||isNaN(R)||T,k.stop=P>0&&Math.abs(D[g]-O[g])>y,x&&(k.parsed=D,k.raw=d.data[P]),u&&(k.options=f||this.resolveDataElementOptions(P,w.active?"active":s)),v||this.updateElement(w,P,k,s),O=D}this.updateSharedOptions(f,s,h)}getMaxOverflow(){let t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let c=0;for(let l=n.length-1;l>=0;--l)c=Math.max(c,n[l].size(this.resolveDataElementOptions(l))/2);return c>0&&c}let o=t.dataset,s=o.options&&o.options.borderWidth||0;if(!n.length)return s;let a=n[0].size(this.resolveDataElementOptions(0)),r=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,a,r)/2}}return e})(),Il=Object.freeze({__proto__:null,BarController:wl,BubbleController:Ol,DoughnutController:Zo,LineController:Sl,PieController:Dl,PolarAreaController:fr,RadarController:Tl,ScatterController:Al});function Ie(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}var Eo=class e{static override(i){Object.assign(e.prototype,i)}options;constructor(i){this.options=i||{}}init(){}formats(){return Ie()}parse(){return Ie()}format(){return Ie()}add(){return Ie()}diff(){return Ie()}startOf(){return Ie()}endOf(){return Ie()}},El={_date:Eo};function Ll(e,i,t,n){let{controller:o,data:s,_sorted:a}=e,r=o._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(r&&i===r.axis&&i!=="r"&&a&&s.length){let l=r._reversePixels?Vs:Et;if(n){if(o._sharedOptions){let d=s[0],h=typeof d.getRange=="function"&&d.getRange(i);if(h){let f=l(s,i,t-h),u=l(s,i,t+h);return{lo:f.lo,hi:u.hi}}}}else{let d=l(s,i,t);if(c){let{vScale:h}=o._cachedMeta,{_parsed:f}=e,u=f.slice(0,d.lo+1).reverse().findIndex(p=>!B(p[h.axis]));d.lo-=Math.max(0,u);let g=f.slice(d.hi).findIndex(p=>!B(p[h.axis]));d.hi+=Math.max(0,g)}return d}}return{lo:0,hi:s.length-1}}function On(e,i,t,n,o){let s=e.getSortedVisibleDatasetMetas(),a=t[i];for(let r=0,c=s.length;r<c;++r){let{index:l,data:d}=s[r],{lo:h,hi:f}=Ll(s[r],i,a,o);for(let u=h;u<=f;++u){let g=d[u];g.skip||n(g,l,u)}}}function Rl(e){let i=e.indexOf("x")!==-1,t=e.indexOf("y")!==-1;return function(n,o){let s=i?Math.abs(n.x-o.x):0,a=t?Math.abs(n.y-o.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(a,2))}}function vo(e,i,t,n,o){let s=[];return!o&&!e.isPointInArea(i)||On(e,t,i,function(r,c,l){!o&&!Lt(r,e.chartArea,0)||r.inRange(i.x,i.y,n)&&s.push({element:r,datasetIndex:c,index:l})},!0),s}function Fl(e,i,t,n){let o=[];function s(a,r,c){let{startAngle:l,endAngle:d}=a.getProps(["startAngle","endAngle"],n),{angle:h}=Ki(a,{x:i.x,y:i.y});Ke(h,l,d)&&o.push({element:a,datasetIndex:r,index:c})}return On(e,t,i,s),o}function zl(e,i,t,n,o,s){let a=[],r=Rl(t),c=Number.POSITIVE_INFINITY;function l(d,h,f){let u=d.inRange(i.x,i.y,o);if(n&&!u)return;let g=d.getCenterPoint(o);if(!(!!s||e.isPointInArea(g))&&!u)return;let m=r(i,g);m<c?(a=[{element:d,datasetIndex:h,index:f}],c=m):m===c&&a.push({element:d,datasetIndex:h,index:f})}return On(e,t,i,l),a}function wo(e,i,t,n,o,s){return!s&&!e.isPointInArea(i)?[]:t==="r"&&!n?Fl(e,i,t,o):zl(e,i,t,n,o,s)}function xa(e,i,t,n,o){let s=[],a=t==="x"?"inXRange":"inYRange",r=!1;return On(e,t,i,(c,l,d)=>{c[a]&&c[a](i[t],o)&&(s.push({element:c,datasetIndex:l,index:d}),r=r||c.inRange(i.x,i.y,o))}),n&&!r?[]:s}var Bl={evaluateInteractionItems:On,modes:{index(e,i,t,n){let o=ye(i,e),s=t.axis||"x",a=t.includeInvisible||!1,r=t.intersect?vo(e,o,s,n,a):wo(e,o,s,!1,n,a),c=[];return r.length?(e.getSortedVisibleDatasetMetas().forEach(l=>{let d=r[0].index,h=l.data[d];h&&!h.skip&&c.push({element:h,datasetIndex:l.index,index:d})}),c):[]},dataset(e,i,t,n){let o=ye(i,e),s=t.axis||"xy",a=t.includeInvisible||!1,r=t.intersect?vo(e,o,s,n,a):wo(e,o,s,!1,n,a);if(r.length>0){let c=r[0].datasetIndex,l=e.getDatasetMeta(c).data;r=[];for(let d=0;d<l.length;++d)r.push({element:l[d],datasetIndex:c,index:d})}return r},point(e,i,t,n){let o=ye(i,e),s=t.axis||"xy",a=t.includeInvisible||!1;return vo(e,o,s,n,a)},nearest(e,i,t,n){let o=ye(i,e),s=t.axis||"xy",a=t.includeInvisible||!1;return wo(e,o,s,t.intersect,n,a)},x(e,i,t,n){let o=ye(i,e);return xa(e,o,"x",t.intersect,n)},y(e,i,t,n){let o=ye(i,e);return xa(e,o,"y",t.intersect,n)}}},ur=["left","top","right","bottom"];function _n(e,i){return e.filter(t=>t.pos===i)}function ya(e,i){return e.filter(t=>ur.indexOf(t.pos)===-1&&t.box.axis===i)}function bn(e,i){return e.sort((t,n)=>{let o=i?n:t,s=i?t:n;return o.weight===s.weight?o.index-s.index:o.weight-s.weight})}function Hl(e){let i=[],t,n,o,s,a,r;for(t=0,n=(e||[]).length;t<n;++t)o=e[t],{position:s,options:{stack:a,stackWeight:r=1}}=o,i.push({index:t,box:o,pos:s,horizontal:o.isHorizontal(),weight:o.weight,stack:a&&s+a,stackWeight:r});return i}function Wl(e){let i={};for(let t of e){let{stack:n,pos:o,stackWeight:s}=t;if(!n||!ur.includes(o))continue;let a=i[n]||(i[n]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=s}return i}function Nl(e,i){let t=Wl(e),{vBoxMaxWidth:n,hBoxMaxHeight:o}=i,s,a,r;for(s=0,a=e.length;s<a;++s){r=e[s];let{fullSize:c}=r.box,l=t[r.stack],d=l&&r.stackWeight/l.weight;r.horizontal?(r.width=d?d*n:c&&i.availableWidth,r.height=o):(r.width=n,r.height=d?d*o:c&&i.availableHeight)}return t}function Vl(e){let i=Hl(e),t=bn(i.filter(l=>l.box.fullSize),!0),n=bn(_n(i,"left"),!0),o=bn(_n(i,"right")),s=bn(_n(i,"top"),!0),a=bn(_n(i,"bottom")),r=ya(i,"x"),c=ya(i,"y");return{fullSize:t,leftAndTop:n.concat(s),rightAndBottom:o.concat(c).concat(a).concat(r),chartArea:_n(i,"chartArea"),vertical:n.concat(o).concat(c),horizontal:s.concat(a).concat(r)}}function Ma(e,i,t,n){return Math.max(e[t],i[t])+Math.max(e[n],i[n])}function gr(e,i){e.top=Math.max(e.top,i.top),e.left=Math.max(e.left,i.left),e.bottom=Math.max(e.bottom,i.bottom),e.right=Math.max(e.right,i.right)}function jl(e,i,t,n){let{pos:o,box:s}=t,a=e.maxPadding;if(!W(o)){t.size&&(e[o]-=t.size);let h=n[t.stack]||{size:0,count:1};h.size=Math.max(h.size,t.horizontal?s.height:s.width),t.size=h.size/h.count,e[o]+=t.size}s.getPadding&&gr(a,s.getPadding());let r=Math.max(0,i.outerWidth-Ma(a,e,"left","right")),c=Math.max(0,i.outerHeight-Ma(a,e,"top","bottom")),l=r!==e.w,d=c!==e.h;return e.w=r,e.h=c,t.horizontal?{same:l,other:d}:{same:d,other:l}}function $l(e){let i=e.maxPadding;function t(n){let o=Math.max(i[n]-e[n],0);return e[n]+=o,o}e.y+=t("top"),e.x+=t("left"),t("right"),t("bottom")}function Yl(e,i){let t=i.maxPadding;function n(o){let s={left:0,top:0,right:0,bottom:0};return o.forEach(a=>{s[a]=Math.max(i[a],t[a])}),s}return n(e?["left","right"]:["top","bottom"])}function Mn(e,i,t,n){let o=[],s,a,r,c,l,d;for(s=0,a=e.length,l=0;s<a;++s){r=e[s],c=r.box,c.update(r.width||i.w,r.height||i.h,Yl(r.horizontal,i));let{same:h,other:f}=jl(i,t,r,n);l|=h&&o.length,d=d||f,c.fullSize||o.push(r)}return l&&Mn(o,i,t,n)||d}function pi(e,i,t,n,o){e.top=t,e.left=i,e.right=i+n,e.bottom=t+o,e.width=n,e.height=o}function Ca(e,i,t,n){let o=t.padding,{x:s,y:a}=i;for(let r of e){let c=r.box,l=n[r.stack]||{count:1,placed:0,weight:1},d=r.stackWeight/l.weight||1;if(r.horizontal){let h=i.w*d,f=l.size||c.height;Xe(l.start)&&(a=l.start),c.fullSize?pi(c,o.left,a,t.outerWidth-o.right-o.left,f):pi(c,i.left+l.placed,a,h,f),l.start=a,l.placed+=h,a=c.bottom}else{let h=i.h*d,f=l.size||c.width;Xe(l.start)&&(s=l.start),c.fullSize?pi(c,s,o.top,f,t.outerHeight-o.bottom-o.top):pi(c,s,i.top+l.placed,f,h),l.start=s,l.placed+=h,s=c.right}}i.x=s,i.y=a}var dt={addBox(e,i){e.boxes||(e.boxes=[]),i.fullSize=i.fullSize||!1,i.position=i.position||"top",i.weight=i.weight||0,i._layers=i._layers||function(){return[{z:0,draw(t){i.draw(t)}}]},e.boxes.push(i)},removeBox(e,i){let t=e.boxes?e.boxes.indexOf(i):-1;t!==-1&&e.boxes.splice(t,1)},configure(e,i,t){i.fullSize=t.fullSize,i.position=t.position,i.weight=t.weight},update(e,i,t,n){if(!e)return;let o=ct(e.options.layout.padding),s=Math.max(i-o.width,0),a=Math.max(t-o.height,0),r=Vl(e.boxes),c=r.vertical,l=r.horizontal;$(e.boxes,p=>{typeof p.beforeLayout=="function"&&p.beforeLayout()});let d=c.reduce((p,m)=>m.box.options&&m.box.options.display===!1?p:p+1,0)||1,h=Object.freeze({outerWidth:i,outerHeight:t,padding:o,availableWidth:s,availableHeight:a,vBoxMaxWidth:s/2/d,hBoxMaxHeight:a/2}),f=Object.assign({},o);gr(f,ct(n));let u=Object.assign({maxPadding:f,w:s,h:a,x:o.left,y:o.top},o),g=Nl(c.concat(l),h);Mn(r.fullSize,u,h,g),Mn(c,u,h,g),Mn(l,u,h,g)&&Mn(c,u,h,g),$l(u),Ca(r.leftAndTop,u,h,g),u.x+=u.w,u.y+=u.h,Ca(r.rightAndBottom,u,h,g),e.chartArea={left:u.left,top:u.top,right:u.left+u.w,bottom:u.top+u.h,height:u.h,width:u.w},$(r.chartArea,p=>{let m=p.box;Object.assign(m,e.chartArea),m.update(u.w,u.h,{left:0,top:0,right:0,bottom:0})})}},vi=class{acquireContext(i,t){}releaseContext(i){return!1}addEventListener(i,t,n){}removeEventListener(i,t,n){}getDevicePixelRatio(){return 1}getMaximumSize(i,t,n,o){return t=Math.max(0,t||i.width),n=n||i.height,{width:t,height:Math.max(0,o?Math.floor(t/o):n)}}isAttached(i){return!0}updateConfig(i){}},Lo=class extends vi{acquireContext(i){return i&&i.getContext&&i.getContext("2d")||null}updateConfig(i){i.options.animation=!1}},Mi="$chartjs",ql={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Pa=e=>e===null||e==="";function Ul(e,i){let t=e.style,n=e.getAttribute("height"),o=e.getAttribute("width");if(e[Mi]={initial:{height:n,width:o,style:{display:t.display,height:t.height,width:t.width}}},t.display=t.display||"block",t.boxSizing=t.boxSizing||"border-box",Pa(o)){let s=go(e,"width");s!==void 0&&(e.width=s)}if(Pa(n))if(e.style.height==="")e.height=e.width/(i||2);else{let s=go(e,"height");s!==void 0&&(e.height=s)}return e}var pr=sa?{passive:!0}:!1;function Xl(e,i,t){e&&e.addEventListener(i,t,pr)}function Gl(e,i,t){e&&e.canvas&&e.canvas.removeEventListener(i,t,pr)}function Kl(e,i){let t=ql[e.type]||e.type,{x:n,y:o}=ye(e,i);return{type:t,chart:i,native:e,x:n!==void 0?n:null,y:o!==void 0?o:null}}function wi(e,i){for(let t of e)if(t===i||t.contains(i))return!0}function Jl(e,i,t){let n=e.canvas,o=new MutationObserver(s=>{let a=!1;for(let r of s)a=a||wi(r.addedNodes,n),a=a&&!wi(r.removedNodes,n);a&&t()});return o.observe(document,{childList:!0,subtree:!0}),o}function Zl(e,i,t){let n=e.canvas,o=new MutationObserver(s=>{let a=!1;for(let r of s)a=a||wi(r.removedNodes,n),a=a&&!wi(r.addedNodes,n);a&&t()});return o.observe(document,{childList:!0,subtree:!0}),o}var Pn=new Map,va=0;function mr(){let e=window.devicePixelRatio;e!==va&&(va=e,Pn.forEach((i,t)=>{t.currentDevicePixelRatio!==e&&i()}))}function Ql(e,i){Pn.size||window.addEventListener("resize",mr),Pn.set(e,i)}function td(e){Pn.delete(e),Pn.size||window.removeEventListener("resize",mr)}function ed(e,i,t){let n=e.canvas,o=n&&ui(n);if(!o)return;let s=to((r,c)=>{let l=o.clientWidth;t(r,c),l<o.clientWidth&&t()},window),a=new ResizeObserver(r=>{let c=r[0],l=c.contentRect.width,d=c.contentRect.height;l===0&&d===0||s(l,d)});return a.observe(o),Ql(e,s),a}function Oo(e,i,t){t&&t.disconnect(),i==="resize"&&td(e)}function nd(e,i,t){let n=e.canvas,o=to(s=>{e.ctx!==null&&t(Kl(s,e))},e);return Xl(n,i,o),o}var Ro=class extends vi{acquireContext(i,t){let n=i&&i.getContext&&i.getContext("2d");return n&&n.canvas===i?(Ul(i,t),n):null}releaseContext(i){let t=i.canvas;if(!t[Mi])return!1;let n=t[Mi].initial;["height","width"].forEach(s=>{let a=n[s];B(a)?t.removeAttribute(s):t.setAttribute(s,a)});let o=n.style||{};return Object.keys(o).forEach(s=>{t.style[s]=o[s]}),t.width=t.width,delete t[Mi],!0}addEventListener(i,t,n){this.removeEventListener(i,t);let o=i.$proxies||(i.$proxies={}),a={attach:Jl,detach:Zl,resize:ed}[t]||nd;o[t]=a(i,t,n)}removeEventListener(i,t){let n=i.$proxies||(i.$proxies={}),o=n[t];if(!o)return;({attach:Oo,detach:Oo,resize:Oo}[t]||Gl)(i,t,o),n[t]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(i,t,n,o){return oa(i,t,n,o)}isAttached(i){let t=i&&ui(i);return!!(t&&t.isConnected)}};function id(e){return!fi()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?Lo:Ro}var At=class{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(i){let{x:t,y:n}=this.getProps(["x","y"],i);return{x:t,y:n}}hasValue(){return Te(this.x)&&Te(this.y)}getProps(i,t){let n=this.$animations;if(!t||!n)return this;let o={};return i.forEach(s=>{o[s]=n[s]&&n[s].active()?n[s]._to:this[s]}),o}};function od(e,i){let t=e.options.ticks,n=sd(e),o=Math.min(t.maxTicksLimit||n,n),s=t.major.enabled?rd(i):[],a=s.length,r=s[0],c=s[a-1],l=[];if(a>o)return cd(i,l,s,a/o),l;let d=ad(s,i,o);if(a>0){let h,f,u=a>1?Math.round((c-r)/(a-1)):null;for(mi(i,l,d,B(u)?0:r-u,r),h=0,f=a-1;h<f;h++)mi(i,l,d,s[h],s[h+1]);return mi(i,l,d,c,B(u)?i.length:c+u),l}return mi(i,l,d),l}function sd(e){let i=e.options.offset,t=e._tickSize(),n=e._length/t+(i?0:1),o=e._maxLength/t;return Math.floor(Math.min(n,o))}function ad(e,i,t){let n=ld(e),o=i.length/t;if(!n)return Math.max(o,1);let s=Hs(n);for(let a=0,r=s.length-1;a<r;a++){let c=s[a];if(c>o)return c}return Math.max(o,1)}function rd(e){let i=[],t,n;for(t=0,n=e.length;t<n;t++)e[t].major&&i.push(t);return i}function cd(e,i,t,n){let o=0,s=t[0],a;for(n=Math.ceil(n),a=0;a<e.length;a++)a===s&&(i.push(e[a]),o++,s=t[o*n])}function mi(e,i,t,n,o){let s=L(n,0),a=Math.min(L(o,e.length),e.length),r=0,c,l,d;for(t=Math.ceil(t),o&&(c=o-n,t=c/Math.floor(c/t)),d=s;d<0;)r++,d=Math.round(s+r*t);for(l=Math.max(s,0);l<a;l++)l===d&&(i.push(e[l]),r++,d=Math.round(s+r*t))}function ld(e){let i=e.length,t,n;if(i<2)return!1;for(n=e[0],t=1;t<i;++t)if(e[t]-e[t-1]!==n)return!1;return n}var dd=e=>e==="left"?"right":e==="right"?"left":e,wa=(e,i,t)=>i==="top"||i==="left"?e[i]+t:e[i]-t,Oa=(e,i)=>Math.min(i||e,e);function ka(e,i){let t=[],n=e.length/i,o=e.length,s=0;for(;s<o;s+=n)t.push(e[Math.floor(s)]);return t}function hd(e,i,t){let n=e.ticks.length,o=Math.min(i,n-1),s=e._startPixel,a=e._endPixel,r=1e-6,c=e.getPixelForTick(o),l;if(!(t&&(n===1?l=Math.max(c-s,a-c):i===0?l=(e.getPixelForTick(1)-c)/2:l=(c-e.getPixelForTick(o-1))/2,c+=o<i?l:-l,c<s-r||c>a+r)))return c}function fd(e,i){$(e,t=>{let n=t.gc,o=n.length/2,s;if(o>i){for(s=0;s<o;++s)delete t.data[n[s]];n.splice(0,o)}})}function xn(e){return e.drawTicks?e.tickLength:0}function Sa(e,i){if(!e.display)return 0;let t=nt(e.font,i),n=ct(e.padding);return(G(e.text)?e.text.length:1)*t.lineHeight+n.height}function ud(e,i){return $t(e,{scale:i,type:"scale"})}function gd(e,i,t){return $t(e,{tick:t,index:i,type:"tick"})}function pd(e,i,t){let n=ri(e);return(t&&i!=="right"||!t&&i==="right")&&(n=dd(n)),n}function md(e,i,t,n){let{top:o,left:s,bottom:a,right:r,chart:c}=e,{chartArea:l,scales:d}=c,h=0,f,u,g,p=a-o,m=r-s;if(e.isHorizontal()){if(u=rt(n,s,r),W(t)){let x=Object.keys(t)[0],y=t[x];g=d[x].getPixelForValue(y)+p-i}else t==="center"?g=(l.bottom+l.top)/2+p-i:g=wa(e,t,i);f=r-s}else{if(W(t)){let x=Object.keys(t)[0],y=t[x];u=d[x].getPixelForValue(y)-m+i}else t==="center"?u=(l.left+l.right)/2-m+i:u=wa(e,t,i);g=rt(n,a,o),h=t==="left"?-et:et}return{titleX:u,titleY:g,maxWidth:f,rotation:h}}var Le=class e extends At{constructor(i){super(),this.id=i.id,this.type=i.type,this.options=void 0,this.ctx=i.ctx,this.chart=i.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(i){this.options=i.setContext(this.getContext()),this.axis=i.axis,this._userMin=this.parse(i.min),this._userMax=this.parse(i.max),this._suggestedMin=this.parse(i.suggestedMin),this._suggestedMax=this.parse(i.suggestedMax)}parse(i,t){return i}getUserBounds(){let{_userMin:i,_userMax:t,_suggestedMin:n,_suggestedMax:o}=this;return i=_t(i,Number.POSITIVE_INFINITY),t=_t(t,Number.NEGATIVE_INFINITY),n=_t(n,Number.POSITIVE_INFINITY),o=_t(o,Number.NEGATIVE_INFINITY),{min:_t(i,n),max:_t(t,o),minDefined:tt(i),maxDefined:tt(t)}}getMinMax(i){let{min:t,max:n,minDefined:o,maxDefined:s}=this.getUserBounds(),a;if(o&&s)return{min:t,max:n};let r=this.getMatchingVisibleMetas();for(let c=0,l=r.length;c<l;++c)a=r[c].controller.getMinMax(this,i),o||(t=Math.min(t,a.min)),s||(n=Math.max(n,a.max));return t=s&&t>n?n:t,n=o&&t>n?t:n,{min:_t(t,_t(n,t)),max:_t(n,_t(t,n))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){let i=this.chart.data;return this.options.labels||(this.isHorizontal()?i.xLabels:i.yLabels)||i.labels||[]}getLabelItems(i=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(i))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){U(this.options.beforeUpdate,[this])}update(i,t,n){let{beginAtZero:o,grace:s,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=i,this.maxHeight=t,this._margins=n=Object.assign({left:0,right:0,top:0,bottom:0},n),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+n.left+n.right:this.height+n.top+n.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Zs(this,s,o),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();let c=r<this.ticks.length;this._convertTicksToLabels(c?ka(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=od(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let i=this.options.reverse,t,n;this.isHorizontal()?(t=this.left,n=this.right):(t=this.top,n=this.bottom,i=!i),this._startPixel=t,this._endPixel=n,this._reversePixels=i,this._length=n-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){U(this.options.afterUpdate,[this])}beforeSetDimensions(){U(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){U(this.options.afterSetDimensions,[this])}_callHooks(i){this.chart.notifyPlugins(i,this.getContext()),U(this.options[i],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){U(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(i){let t=this.options.ticks,n,o,s;for(n=0,o=i.length;n<o;n++)s=i[n],s.label=U(t.callback,[s.value,n,i],this)}afterTickToLabelConversion(){U(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){U(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){let i=this.options,t=i.ticks,n=Oa(this.ticks.length,i.ticks.maxTicksLimit),o=t.minRotation||0,s=t.maxRotation,a=o,r,c,l;if(!this._isVisible()||!t.display||o>=s||n<=1||!this.isHorizontal()){this.labelRotation=o;return}let d=this._getLabelSizes(),h=d.widest.width,f=d.highest.height,u=it(this.chart.width-h,0,this.maxWidth);r=i.offset?this.maxWidth/n:u/(n-1),h+6>r&&(r=u/(n-(i.offset?.5:1)),c=this.maxHeight-xn(i.grid)-t.padding-Sa(i.title,this.chart.options.font),l=Math.sqrt(h*h+f*f),a=si(Math.min(Math.asin(it((d.highest.height+6)/r,-1,1)),Math.asin(it(c/l,-1,1))-Math.asin(it(f/l,-1,1)))),a=Math.max(o,Math.min(s,a))),this.labelRotation=a}afterCalculateLabelRotation(){U(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){U(this.options.beforeFit,[this])}fit(){let i={width:0,height:0},{chart:t,options:{ticks:n,title:o,grid:s}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){let c=Sa(o,t.options.font);if(r?(i.width=this.maxWidth,i.height=xn(s)+c):(i.height=this.maxHeight,i.width=xn(s)+c),n.display&&this.ticks.length){let{first:l,last:d,widest:h,highest:f}=this._getLabelSizes(),u=n.padding*2,g=Dt(this.labelRotation),p=Math.cos(g),m=Math.sin(g);if(r){let x=n.mirror?0:m*h.width+p*f.height;i.height=Math.min(this.maxHeight,i.height+x+u)}else{let x=n.mirror?0:p*h.width+m*f.height;i.width=Math.min(this.maxWidth,i.width+x+u)}this._calculatePadding(l,d,m,p)}}this._handleMargins(),r?(this.width=this._length=t.width-this._margins.left-this._margins.right,this.height=i.height):(this.width=i.width,this.height=this._length=t.height-this._margins.top-this._margins.bottom)}_calculatePadding(i,t,n,o){let{ticks:{align:s,padding:a},position:r}=this.options,c=this.labelRotation!==0,l=r!=="top"&&this.axis==="x";if(this.isHorizontal()){let d=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1),f=0,u=0;c?l?(f=o*i.width,u=n*t.height):(f=n*i.height,u=o*t.width):s==="start"?u=t.width:s==="end"?f=i.width:s!=="inner"&&(f=i.width/2,u=t.width/2),this.paddingLeft=Math.max((f-d+a)*this.width/(this.width-d),0),this.paddingRight=Math.max((u-h+a)*this.width/(this.width-h),0)}else{let d=t.height/2,h=i.height/2;s==="start"?(d=0,h=i.height):s==="end"&&(d=t.height,h=0),this.paddingTop=d+a,this.paddingBottom=h+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){U(this.options.afterFit,[this])}isHorizontal(){let{axis:i,position:t}=this.options;return t==="top"||t==="bottom"||i==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(i){this.beforeTickToLabelConversion(),this.generateTickLabels(i);let t,n;for(t=0,n=i.length;t<n;t++)B(i[t].label)&&(i.splice(t,1),n--,t--);this.afterTickToLabelConversion()}_getLabelSizes(){let i=this._labelSizes;if(!i){let t=this.options.ticks.sampleSize,n=this.ticks;t<n.length&&(n=ka(n,t)),this._labelSizes=i=this._computeLabelSizes(n,n.length,this.options.ticks.maxTicksLimit)}return i}_computeLabelSizes(i,t,n){let{ctx:o,_longestTextCache:s}=this,a=[],r=[],c=Math.floor(t/Oa(t,n)),l=0,d=0,h,f,u,g,p,m,x,y,v,O,P;for(h=0;h<t;h+=c){if(g=i[h].label,p=this._resolveTickFontOptions(h),o.font=m=p.string,x=s[m]=s[m]||{data:{},gc:[]},y=p.lineHeight,v=O=0,!B(g)&&!G(g))v=hn(o,x.data,x.gc,v,g),O=y;else if(G(g))for(f=0,u=g.length;f<u;++f)P=g[f],!B(P)&&!G(P)&&(v=hn(o,x.data,x.gc,v,P),O+=y);a.push(v),r.push(O),l=Math.max(v,l),d=Math.max(O,d)}fd(s,t);let w=a.indexOf(l),D=r.indexOf(d),k=T=>({width:a[T]||0,height:r[T]||0});return{first:k(0),last:k(t-1),widest:k(w),highest:k(D),widths:a,heights:r}}getLabelForValue(i){return i}getPixelForValue(i,t){return NaN}getValueForPixel(i){}getPixelForTick(i){let t=this.ticks;return i<0||i>t.length-1?null:this.getPixelForValue(t[i].value)}getPixelForDecimal(i){this._reversePixels&&(i=1-i);let t=this._startPixel+i*this._length;return Ns(this._alignToPixels?_e(this.chart,t,0):t)}getDecimalForPixel(i){let t=(i-this._startPixel)/this._length;return this._reversePixels?1-t:t}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){let{min:i,max:t}=this;return i<0&&t<0?t:i>0&&t>0?i:0}getContext(i){let t=this.ticks||[];if(i>=0&&i<t.length){let n=t[i];return n.$context||(n.$context=gd(this.getContext(),i,n))}return this.$context||(this.$context=ud(this.chart.getContext(),this))}_tickSize(){let i=this.options.ticks,t=Dt(this.labelRotation),n=Math.abs(Math.cos(t)),o=Math.abs(Math.sin(t)),s=this._getLabelSizes(),a=i.autoSkipPadding||0,r=s?s.widest.width+a:0,c=s?s.highest.height+a:0;return this.isHorizontal()?c*n>r*o?r/n:c/o:c*o<r*n?c/n:r/o}_isVisible(){let i=this.options.display;return i!=="auto"?!!i:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(i){let t=this.axis,n=this.chart,o=this.options,{grid:s,position:a,border:r}=o,c=s.offset,l=this.isHorizontal(),h=this.ticks.length+(c?1:0),f=xn(s),u=[],g=r.setContext(this.getContext()),p=g.display?g.width:0,m=p/2,x=function(X){return _e(n,X,p)},y,v,O,P,w,D,k,T,E,R,z,ot;if(a==="top")y=x(this.bottom),D=this.bottom-f,T=y-m,R=x(i.top)+m,ot=i.bottom;else if(a==="bottom")y=x(this.top),R=i.top,ot=x(i.bottom)-m,D=y+m,T=this.top+f;else if(a==="left")y=x(this.right),w=this.right-f,k=y-m,E=x(i.left)+m,z=i.right;else if(a==="right")y=x(this.left),E=i.left,z=x(i.right)-m,w=y+m,k=this.left+f;else if(t==="x"){if(a==="center")y=x((i.top+i.bottom)/2+.5);else if(W(a)){let X=Object.keys(a)[0],Z=a[X];y=x(this.chart.scales[X].getPixelForValue(Z))}R=i.top,ot=i.bottom,D=y+m,T=D+f}else if(t==="y"){if(a==="center")y=x((i.left+i.right)/2);else if(W(a)){let X=Object.keys(a)[0],Z=a[X];y=x(this.chart.scales[X].getPixelForValue(Z))}w=y-m,k=w-f,E=i.left,z=i.right}let ht=L(o.ticks.maxTicksLimit,h),j=Math.max(1,Math.ceil(h/ht));for(v=0;v<h;v+=j){let X=this.getContext(v),Z=s.setContext(X),yt=r.setContext(X),st=Z.lineWidth,Ut=Z.color,Tn=yt.dash||[],Re=yt.dashOffset,sn=Z.tickWidth,Pe=Z.tickColor,an=Z.tickBorderDash||[],ve=Z.tickBorderDashOffset;O=hd(this,v,c),O!==void 0&&(P=_e(n,O,st),l?w=k=E=z=P:D=T=R=ot=P,u.push({tx1:w,ty1:D,tx2:k,ty2:T,x1:E,y1:R,x2:z,y2:ot,width:st,color:Ut,borderDash:Tn,borderDashOffset:Re,tickWidth:sn,tickColor:Pe,tickBorderDash:an,tickBorderDashOffset:ve}))}return this._ticksLength=h,this._borderValue=y,u}_computeLabelItems(i){let t=this.axis,n=this.options,{position:o,ticks:s}=n,a=this.isHorizontal(),r=this.ticks,{align:c,crossAlign:l,padding:d,mirror:h}=s,f=xn(n.grid),u=f+d,g=h?-d:u,p=-Dt(this.labelRotation),m=[],x,y,v,O,P,w,D,k,T,E,R,z,ot="middle";if(o==="top")w=this.bottom-g,D=this._getXAxisLabelAlignment();else if(o==="bottom")w=this.top+g,D=this._getXAxisLabelAlignment();else if(o==="left"){let j=this._getYAxisLabelAlignment(f);D=j.textAlign,P=j.x}else if(o==="right"){let j=this._getYAxisLabelAlignment(f);D=j.textAlign,P=j.x}else if(t==="x"){if(o==="center")w=(i.top+i.bottom)/2+u;else if(W(o)){let j=Object.keys(o)[0],X=o[j];w=this.chart.scales[j].getPixelForValue(X)+u}D=this._getXAxisLabelAlignment()}else if(t==="y"){if(o==="center")P=(i.left+i.right)/2-u;else if(W(o)){let j=Object.keys(o)[0],X=o[j];P=this.chart.scales[j].getPixelForValue(X)}D=this._getYAxisLabelAlignment(f).textAlign}t==="y"&&(c==="start"?ot="top":c==="end"&&(ot="bottom"));let ht=this._getLabelSizes();for(x=0,y=r.length;x<y;++x){v=r[x],O=v.label;let j=s.setContext(this.getContext(x));k=this.getPixelForTick(x)+s.labelOffset,T=this._resolveTickFontOptions(x),E=T.lineHeight,R=G(O)?O.length:1;let X=R/2,Z=j.color,yt=j.textStrokeColor,st=j.textStrokeWidth,Ut=D;a?(P=k,D==="inner"&&(x===y-1?Ut=this.options.reverse?"left":"right":x===0?Ut=this.options.reverse?"right":"left":Ut="center"),o==="top"?l==="near"||p!==0?z=-R*E+E/2:l==="center"?z=-ht.highest.height/2-X*E+E:z=-ht.highest.height+E/2:l==="near"||p!==0?z=E/2:l==="center"?z=ht.highest.height/2-X*E:z=ht.highest.height-R*E,h&&(z*=-1),p!==0&&!j.showLabelBackdrop&&(P+=E/2*Math.sin(p))):(w=k,z=(1-R)*E/2);let Tn;if(j.showLabelBackdrop){let Re=ct(j.backdropPadding),sn=ht.heights[x],Pe=ht.widths[x],an=z-Re.top,ve=0-Re.left;switch(ot){case"middle":an-=sn/2;break;case"bottom":an-=sn;break}switch(D){case"center":ve-=Pe/2;break;case"right":ve-=Pe;break;case"inner":x===y-1?ve-=Pe:x>0&&(ve-=Pe/2);break}Tn={left:ve,top:an,width:Pe+Re.width,height:sn+Re.height,color:j.backdropColor}}m.push({label:O,font:T,textOffset:z,options:{rotation:p,color:Z,strokeColor:yt,strokeWidth:st,textAlign:Ut,textBaseline:ot,translation:[P,w],backdrop:Tn}})}return m}_getXAxisLabelAlignment(){let{position:i,ticks:t}=this.options;if(-Dt(this.labelRotation))return i==="top"?"left":"right";let o="center";return t.align==="start"?o="left":t.align==="end"?o="right":t.align==="inner"&&(o="inner"),o}_getYAxisLabelAlignment(i){let{position:t,ticks:{crossAlign:n,mirror:o,padding:s}}=this.options,a=this._getLabelSizes(),r=i+s,c=a.widest.width,l,d;return t==="left"?o?(d=this.right+s,n==="near"?l="left":n==="center"?(l="center",d+=c/2):(l="right",d+=c)):(d=this.right-r,n==="near"?l="right":n==="center"?(l="center",d-=c/2):(l="left",d=this.left)):t==="right"?o?(d=this.left+s,n==="near"?l="right":n==="center"?(l="center",d-=c/2):(l="left",d-=c)):(d=this.left+r,n==="near"?l="left":n==="center"?(l="center",d+=c/2):(l="right",d=this.right)):l="right",{textAlign:l,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;let i=this.chart,t=this.options.position;if(t==="left"||t==="right")return{top:0,left:this.left,bottom:i.height,right:this.right};if(t==="top"||t==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:i.width}}drawBackground(){let{ctx:i,options:{backgroundColor:t},left:n,top:o,width:s,height:a}=this;t&&(i.save(),i.fillStyle=t,i.fillRect(n,o,s,a),i.restore())}getLineWidthForValue(i){let t=this.options.grid;if(!this._isVisible()||!t.display)return 0;let o=this.ticks.findIndex(s=>s.value===i);return o>=0?t.setContext(this.getContext(o)).lineWidth:0}drawGrid(i){let t=this.options.grid,n=this.ctx,o=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(i)),s,a,r=(c,l,d)=>{!d.width||!d.color||(n.save(),n.lineWidth=d.width,n.strokeStyle=d.color,n.setLineDash(d.borderDash||[]),n.lineDashOffset=d.borderDashOffset,n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(l.x,l.y),n.stroke(),n.restore())};if(t.display)for(s=0,a=o.length;s<a;++s){let c=o[s];t.drawOnChartArea&&r({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),t.drawTicks&&r({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){let{chart:i,ctx:t,options:{border:n,grid:o}}=this,s=n.setContext(this.getContext()),a=n.display?s.width:0;if(!a)return;let r=o.setContext(this.getContext(0)).lineWidth,c=this._borderValue,l,d,h,f;this.isHorizontal()?(l=_e(i,this.left,a)-a/2,d=_e(i,this.right,r)+r/2,h=f=c):(h=_e(i,this.top,a)-a/2,f=_e(i,this.bottom,r)+r/2,l=d=c),t.save(),t.lineWidth=s.width,t.strokeStyle=s.color,t.beginPath(),t.moveTo(l,h),t.lineTo(d,f),t.stroke(),t.restore()}drawLabels(i){if(!this.options.ticks.display)return;let n=this.ctx,o=this._computeLabelArea();o&&gn(n,o);let s=this.getLabelItems(i);for(let a of s){let r=a.options,c=a.font,l=a.label,d=a.textOffset;be(n,l,0,d,c,r)}o&&pn(n)}drawTitle(){let{ctx:i,options:{position:t,title:n,reverse:o}}=this;if(!n.display)return;let s=nt(n.font),a=ct(n.padding),r=n.align,c=s.lineHeight/2;t==="bottom"||t==="center"||W(t)?(c+=a.bottom,G(n.text)&&(c+=s.lineHeight*(n.text.length-1))):c+=a.top;let{titleX:l,titleY:d,maxWidth:h,rotation:f}=md(this,c,t,r);be(i,n.text,0,0,s,{color:n.color,maxWidth:h,rotation:f,textAlign:pd(r,t,o),textBaseline:"middle",translation:[l,d]})}draw(i){this._isVisible()&&(this.drawBackground(),this.drawGrid(i),this.drawBorder(),this.drawTitle(),this.drawLabels(i))}_layers(){let i=this.options,t=i.ticks&&i.ticks.z||0,n=L(i.grid&&i.grid.z,-1),o=L(i.border&&i.border.z,0);return!this._isVisible()||this.draw!==e.prototype.draw?[{z:t,draw:s=>{this.draw(s)}}]:[{z:n,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:o,draw:()=>{this.drawBorder()}},{z:t,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(i){let t=this.chart.getSortedVisibleDatasetMetas(),n=this.axis+"AxisID",o=[],s,a;for(s=0,a=t.length;s<a;++s){let r=t[s];r[n]===this.id&&(!i||r.type===i)&&o.push(r)}return o}_resolveTickFontOptions(i){let t=this.options.ticks.setContext(this.getContext(i));return nt(t.font)}_maxDigits(){let i=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/i}},en=class{constructor(i,t,n){this.type=i,this.scope=t,this.override=n,this.items=Object.create(null)}isForType(i){return Object.prototype.isPrototypeOf.call(this.type.prototype,i.prototype)}register(i){let t=Object.getPrototypeOf(i),n;xd(t)&&(n=this.register(t));let o=this.items,s=i.id,a=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+i);return s in o||(o[s]=i,_d(i,a,n),this.override&&J.override(i.id,i.overrides)),a}get(i){return this.items[i]}unregister(i){let t=this.items,n=i.id,o=this.scope;n in t&&delete t[n],o&&n in J[o]&&(delete J[o][n],this.override&&delete me[n])}};function _d(e,i,t){let n=Ye(Object.create(null),[t?J.get(t):{},J.get(i),e.defaults]);J.set(i,n),e.defaultRoutes&&bd(i,e.defaultRoutes),e.descriptors&&J.describe(i,e.descriptors)}function bd(e,i){Object.keys(i).forEach(t=>{let n=t.split("."),o=n.pop(),s=[e].concat(n).join("."),a=i[t].split("."),r=a.pop(),c=a.join(".");J.route(s,o,c,r)})}function xd(e){return"id"in e&&"defaults"in e}var Fo=class{constructor(){this.controllers=new en(Ce,"datasets",!0),this.elements=new en(At,"elements"),this.plugins=new en(Object,"plugins"),this.scales=new en(Le,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...i){this._each("register",i)}remove(...i){this._each("unregister",i)}addControllers(...i){this._each("register",i,this.controllers)}addElements(...i){this._each("register",i,this.elements)}addPlugins(...i){this._each("register",i,this.plugins)}addScales(...i){this._each("register",i,this.scales)}getController(i){return this._get(i,this.controllers,"controller")}getElement(i){return this._get(i,this.elements,"element")}getPlugin(i){return this._get(i,this.plugins,"plugin")}getScale(i){return this._get(i,this.scales,"scale")}removeControllers(...i){this._each("unregister",i,this.controllers)}removeElements(...i){this._each("unregister",i,this.elements)}removePlugins(...i){this._each("unregister",i,this.plugins)}removeScales(...i){this._each("unregister",i,this.scales)}_each(i,t,n){[...t].forEach(o=>{let s=n||this._getRegistryForType(o);n||s.isForType(o)||s===this.plugins&&o.id?this._exec(i,s,o):$(o,a=>{let r=n||this._getRegistryForType(a);this._exec(i,r,a)})})}_exec(i,t,n){let o=oi(i);U(n["before"+o],[],n),t[i](n),U(n["after"+o],[],n)}_getRegistryForType(i){for(let t=0;t<this._typedRegistries.length;t++){let n=this._typedRegistries[t];if(n.isForType(i))return n}return this.plugins}_get(i,t,n){let o=t.get(i);if(o===void 0)throw new Error('"'+i+'" is not a registered '+n+".");return o}},Bt=new Fo,zo=class{constructor(){this._init=void 0}notify(i,t,n,o){if(t==="beforeInit"&&(this._init=this._createDescriptors(i,!0),this._notify(this._init,i,"install")),this._init===void 0)return;let s=o?this._descriptors(i).filter(o):this._descriptors(i),a=this._notify(s,i,t,n);return t==="afterDestroy"&&(this._notify(s,i,"stop"),this._notify(this._init,i,"uninstall"),this._init=void 0),a}_notify(i,t,n,o){o=o||{};for(let s of i){let a=s.plugin,r=a[n],c=[t,o,s.options];if(U(r,c,a)===!1&&o.cancelable)return!1}return!0}invalidate(){B(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(i){if(this._cache)return this._cache;let t=this._cache=this._createDescriptors(i);return this._notifyStateChanges(i),t}_createDescriptors(i,t){let n=i&&i.config,o=L(n.options&&n.options.plugins,{}),s=yd(n);return o===!1&&!t?[]:Cd(i,s,o,t)}_notifyStateChanges(i){let t=this._oldCache||[],n=this._cache,o=(s,a)=>s.filter(r=>!a.some(c=>r.plugin.id===c.plugin.id));this._notify(o(t,n),i,"stop"),this._notify(o(n,t),i,"start")}};function yd(e){let i={},t=[],n=Object.keys(Bt.plugins.items);for(let s=0;s<n.length;s++)t.push(Bt.getPlugin(n[s]));let o=e.plugins||[];for(let s=0;s<o.length;s++){let a=o[s];t.indexOf(a)===-1&&(t.push(a),i[a.id]=!0)}return{plugins:t,localIds:i}}function Md(e,i){return!i&&e===!1?null:e===!0?{}:e}function Cd(e,{plugins:i,localIds:t},n,o){let s=[],a=e.getContext();for(let r of i){let c=r.id,l=Md(n[c],o);l!==null&&s.push({plugin:r,options:Pd(e.config,{plugin:r,local:t[c]},l,a)})}return s}function Pd(e,{plugin:i,local:t},n,o){let s=e.pluginScopeKeys(i),a=e.getOptionScopes(n,s);return t&&i.defaults&&a.push(i.defaults),e.createResolver(a,o,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Bo(e,i){let t=J.datasets[e]||{};return((i.datasets||{})[e]||{}).indexAxis||i.indexAxis||t.indexAxis||"x"}function vd(e,i){let t=e;return e==="_index_"?t=i:e==="_value_"&&(t=i==="x"?"y":"x"),t}function wd(e,i){return e===i?"_index_":"_value_"}function Da(e){if(e==="x"||e==="y"||e==="r")return e}function Od(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function Ho(e,...i){if(Da(e))return e;for(let t of i){let n=t.axis||Od(t.position)||e.length>1&&Da(e[0].toLowerCase());if(n)return n}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Ta(e,i,t){if(t[i+"AxisID"]===e)return{axis:i}}function kd(e,i){if(i.data&&i.data.datasets){let t=i.data.datasets.filter(n=>n.xAxisID===e||n.yAxisID===e);if(t.length)return Ta(e,"x",t[0])||Ta(e,"y",t[0])}return{}}function Sd(e,i){let t=me[e.type]||{scales:{}},n=i.scales||{},o=Bo(e.type,i),s=Object.create(null);return Object.keys(n).forEach(a=>{let r=n[a];if(!W(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);let c=Ho(a,r,kd(a,e),J.scales[r.type]),l=wd(c,o),d=t.scales||{};s[a]=Ue(Object.create(null),[{axis:c},r,d[c],d[l]])}),e.data.datasets.forEach(a=>{let r=a.type||e.type,c=a.indexAxis||Bo(r,i),d=(me[r]||{}).scales||{};Object.keys(d).forEach(h=>{let f=vd(h,c),u=a[f+"AxisID"]||f;s[u]=s[u]||Object.create(null),Ue(s[u],[{axis:f},n[u],d[h]])})}),Object.keys(s).forEach(a=>{let r=s[a];Ue(r,[J.scales[r.type],J.scale])}),s}function _r(e){let i=e.options||(e.options={});i.plugins=L(i.plugins,{}),i.scales=Sd(e,i)}function br(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function Dd(e){return e=e||{},e.data=br(e.data),_r(e),e}var Aa=new Map,xr=new Set;function _i(e,i){let t=Aa.get(e);return t||(t=i(),Aa.set(e,t),xr.add(t)),t}var yn=(e,i,t)=>{let n=jt(i,t);n!==void 0&&e.add(n)},Wo=class{constructor(i){this._config=Dd(i),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(i){this._config.type=i}get data(){return this._config.data}set data(i){this._config.data=br(i)}get options(){return this._config.options}set options(i){this._config.options=i}get plugins(){return this._config.plugins}update(){let i=this._config;this.clearCache(),_r(i)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(i){return _i(i,()=>[[`datasets.${i}`,""]])}datasetAnimationScopeKeys(i,t){return _i(`${i}.transition.${t}`,()=>[[`datasets.${i}.transitions.${t}`,`transitions.${t}`],[`datasets.${i}`,""]])}datasetElementScopeKeys(i,t){return _i(`${i}-${t}`,()=>[[`datasets.${i}.elements.${t}`,`datasets.${i}`,`elements.${t}`,""]])}pluginScopeKeys(i){let t=i.id,n=this.type;return _i(`${n}-plugin-${t}`,()=>[[`plugins.${t}`,...i.additionalOptionScopes||[]]])}_cachedScopes(i,t){let n=this._scopeCache,o=n.get(i);return(!o||t)&&(o=new Map,n.set(i,o)),o}getOptionScopes(i,t,n){let{options:o,type:s}=this,a=this._cachedScopes(i,n),r=a.get(t);if(r)return r;let c=new Set;t.forEach(d=>{i&&(c.add(i),d.forEach(h=>yn(c,i,h))),d.forEach(h=>yn(c,o,h)),d.forEach(h=>yn(c,me[s]||{},h)),d.forEach(h=>yn(c,J,h)),d.forEach(h=>yn(c,ci,h))});let l=Array.from(c);return l.length===0&&l.push(Object.create(null)),xr.has(t)&&a.set(t,l),l}chartOptionScopes(){let{options:i,type:t}=this;return[i,me[t]||{},J.datasets[t]||{},{type:t},J,ci]}resolveNamedOptions(i,t,n,o=[""]){let s={$shared:!0},{resolver:a,subPrefixes:r}=Ia(this._resolverCache,i,o),c=a;if(Ad(a,t)){s.$shared=!1,n=Nt(n)?n():n;let l=this.createResolver(i,n,r);c=De(a,n,l)}for(let l of t)s[l]=c[l];return s}createResolver(i,t,n=[""],o){let{resolver:s}=Ia(this._resolverCache,i,n);return W(t)?De(s,t,void 0,o):s}};function Ia(e,i,t){let n=e.get(i);n||(n=new Map,e.set(i,n));let o=t.join(),s=n.get(o);return s||(s={resolver:hi(i,t),subPrefixes:t.filter(r=>!r.toLowerCase().includes("hover"))},n.set(o,s)),s}var Td=e=>W(e)&&Object.getOwnPropertyNames(e).some(i=>Nt(e[i]));function Ad(e,i){let{isScriptable:t,isIndexable:n}=co(e);for(let o of i){let s=t(o),a=n(o),r=(a||s)&&e[o];if(s&&(Nt(r)||Td(r))||a&&G(r))return!0}return!1}var Id="4.5.1",Ed=["top","bottom","left","right","chartArea"];function Ea(e,i){return e==="top"||e==="bottom"||Ed.indexOf(e)===-1&&i==="x"}function La(e,i){return function(t,n){return t[e]===n[e]?t[i]-n[i]:t[e]-n[e]}}function Ra(e){let i=e.chart,t=i.options.animation;i.notifyPlugins("afterRender"),U(t&&t.onComplete,[e],i)}function Ld(e){let i=e.chart,t=i.options.animation;U(t&&t.onProgress,[e],i)}function yr(e){return fi()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}var Ci={},Fa=e=>{let i=yr(e);return Object.values(Ci).filter(t=>t.canvas===i).pop()};function Rd(e,i,t){let n=Object.keys(e);for(let o of n){let s=+o;if(s>=i){let a=e[o];delete e[o],(t>0||s>i)&&(e[s+t]=a)}}}function Fd(e,i,t,n){return!t||e.type==="mouseout"?null:n?i:e}var Di=(()=>{class e{static defaults=J;static instances=Ci;static overrides=me;static registry=Bt;static version=Id;static getChart=Fa;static register(...t){Bt.add(...t),za()}static unregister(...t){Bt.remove(...t),za()}constructor(t,n){let o=this.config=new Wo(n),s=yr(t),a=Fa(s);if(a)throw new Error("Canvas is already in use. Chart with ID '"+a.id+"' must be destroyed before the canvas with ID '"+a.canvas.id+"' can be reused.");let r=o.createResolver(o.chartOptionScopes(),this.getContext());this.platform=new(o.platform||id(s)),this.platform.updateConfig(o);let c=this.platform.acquireContext(s,r.aspectRatio),l=c&&c.canvas,d=l&&l.height,h=l&&l.width;if(this.id=Rs(),this.ctx=c,this.canvas=l,this.width=h,this.height=d,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new zo,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=qs(f=>this.update(f),r.resizeDelay||0),this._dataChanges=[],Ci[this.id]=this,!c||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Yt.listen(this,"complete",Ra),Yt.listen(this,"progress",Ld),this._initialize(),this.attached&&this.update()}get aspectRatio(){let{options:{aspectRatio:t,maintainAspectRatio:n},width:o,height:s,_aspectRatio:a}=this;return B(t)?n&&a?a:s?o/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Bt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():uo(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return so(this.canvas,this.ctx),this}stop(){return Yt.stop(this),this}resize(t,n){Yt.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){let o=this.options,s=this.canvas,a=o.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(s,t,n,a),c=o.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,uo(this,c,!0)&&(this.notifyPlugins("resize",{size:r}),U(o.onResize,[this,r],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){let n=this.options.scales||{};$(n,(o,s)=>{o.id=s})}buildOrUpdateScales(){let t=this.options,n=t.scales,o=this.scales,s=Object.keys(o).reduce((r,c)=>(r[c]=!1,r),{}),a=[];n&&(a=a.concat(Object.keys(n).map(r=>{let c=n[r],l=Ho(r,c),d=l==="r",h=l==="x";return{options:c,dposition:d?"chartArea":h?"bottom":"left",dtype:d?"radialLinear":h?"category":"linear"}}))),$(a,r=>{let c=r.options,l=c.id,d=Ho(l,c),h=L(c.type,r.dtype);(c.position===void 0||Ea(c.position,d)!==Ea(r.dposition))&&(c.position=r.dposition),s[l]=!0;let f=null;if(l in o&&o[l].type===h)f=o[l];else{let u=Bt.getScale(h);f=new u({id:l,type:h,ctx:this.ctx,chart:this}),o[f.id]=f}f.init(c,t)}),$(s,(r,c)=>{r||delete o[c]}),$(o,r=>{dt.configure(this,r,r.options),dt.addBox(this,r)})}_updateMetasets(){let t=this._metasets,n=this.data.datasets.length,o=t.length;if(t.sort((s,a)=>s.index-a.index),o>n){for(let s=n;s<o;++s)this._destroyDatasetMeta(s);t.splice(n,o-n)}this._sortedMetasets=t.slice(0).sort(La("order","index"))}_removeUnreferencedMetasets(){let{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((o,s)=>{n.filter(a=>a===o._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){let t=[],n=this.data.datasets,o,s;for(this._removeUnreferencedMetasets(),o=0,s=n.length;o<s;o++){let a=n[o],r=this.getDatasetMeta(o),c=a.type||this.config.type;if(r.type&&r.type!==c&&(this._destroyDatasetMeta(o),r=this.getDatasetMeta(o)),r.type=c,r.indexAxis=a.indexAxis||Bo(c,this.options),r.order=a.order||0,r.index=o,r.label=""+a.label,r.visible=this.isDatasetVisible(o),r.controller)r.controller.updateIndex(o),r.controller.linkScales();else{let l=Bt.getController(c),{datasetElementType:d,dataElementType:h}=J.datasets[c];Object.assign(l,{dataElementType:Bt.getElement(h),datasetElementType:d&&Bt.getElement(d)}),r.controller=new l(this,o),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){$(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){let n=this.config;n.update();let o=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!o.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;let a=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let d=0,h=this.data.datasets.length;d<h;d++){let{controller:f}=this.getDatasetMeta(d),u=!s&&a.indexOf(f)===-1;f.buildOrUpdateElements(u),r=Math.max(+f.getMaxOverflow(),r)}r=this._minPadding=o.layout.autoPadding?r:0,this._updateLayout(r),s||$(a,d=>{d.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(La("z","_idx"));let{_active:c,_lastEvent:l}=this;l?this._eventHandler(l,!0):c.length&&this._updateHoverStyles(c,c,!0),this.render()}_updateScales(){$(this.scales,t=>{dt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){let t=this.options,n=new Set(Object.keys(this._listeners)),o=new Set(t.events);(!qi(n,o)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){let{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(let{method:o,start:s,count:a}of n){let r=o==="_removeElements"?-a:a;Rd(t,s,r)}}_getUniformDataChanges(){let t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];let n=this.data.datasets.length,o=a=>new Set(t.filter(r=>r[0]===a).map((r,c)=>c+","+r.splice(1).join(","))),s=o(0);for(let a=1;a<n;a++)if(!qi(s,o(a)))return;return Array.from(s).map(a=>a.split(",")).map(a=>({method:a[1],start:+a[2],count:+a[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;dt.update(this,this.width,this.height,t);let n=this.chartArea,o=n.width<=0||n.height<=0;this._layers=[],$(this.boxes,s=>{o&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,a)=>{s._idx=a}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,o=this.data.datasets.length;n<o;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,o=this.data.datasets.length;n<o;++n)this._updateDataset(n,Nt(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){let o=this.getDatasetMeta(t),s={meta:o,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(o.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Yt.has(this)?this.attached&&!Yt.running(this)&&Yt.start(this):(this.draw(),Ra({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){let{width:o,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(o,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;let n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){let n=this._sortedMetasets,o=[],s,a;for(s=0,a=n.length;s<a;++s){let r=n[s];(!t||r.visible)&&o.push(r)}return o}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;let t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){let n=this.ctx,o={meta:t,index:t.index,cancelable:!0},s=xo(this,t);this.notifyPlugins("beforeDatasetDraw",o)!==!1&&(s&&gn(n,s),t.controller.draw(),s&&pn(n),o.cancelable=!1,this.notifyPlugins("afterDatasetDraw",o))}isPointInArea(t){return Lt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,o,s){let a=Bl.modes[n];return typeof a=="function"?a(this,t,o,s):[]}getDatasetMeta(t){let n=this.data.datasets[t],o=this._metasets,s=o.filter(a=>a&&a._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},o.push(s)),s}getContext(){return this.$context||(this.$context=$t(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){let n=this.data.datasets[t];if(!n)return!1;let o=this.getDatasetMeta(t);return typeof o.hidden=="boolean"?!o.hidden:!n.hidden}setDatasetVisibility(t,n){let o=this.getDatasetMeta(t);o.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,o){let s=o?"show":"hide",a=this.getDatasetMeta(t),r=a.controller._resolveAnimations(void 0,s);Xe(n)?(a.data[n].hidden=!o,this.update()):(this.setDatasetVisibility(t,o),r.update(a,{visible:o}),this.update(c=>c.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){let n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),Yt.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");let{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),so(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Ci[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){let t=this._listeners,n=this.platform,o=(a,r)=>{n.addEventListener(this,a,r),t[a]=r},s=(a,r,c)=>{a.offsetX=r,a.offsetY=c,this._eventHandler(a)};$(this.options.events,a=>o(a,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});let t=this._responsiveListeners,n=this.platform,o=(l,d)=>{n.addEventListener(this,l,d),t[l]=d},s=(l,d)=>{t[l]&&(n.removeEventListener(this,l,d),delete t[l])},a=(l,d)=>{this.canvas&&this.resize(l,d)},r,c=()=>{s("attach",c),this.attached=!0,this.resize(),o("resize",a),o("detach",r)};r=()=>{this.attached=!1,s("resize",a),this._stop(),this._resize(0,0),o("attach",c)},n.isAttached(this.canvas)?c():r()}unbindEvents(){$(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},$(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,o){let s=o?"set":"remove",a,r,c,l;for(n==="dataset"&&(a=this.getDatasetMeta(t[0].datasetIndex),a.controller["_"+s+"DatasetHoverStyle"]()),c=0,l=t.length;c<l;++c){r=t[c];let d=r&&this.getDatasetMeta(r.datasetIndex).controller;d&&d[s+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){let n=this._active||[],o=t.map(({datasetIndex:a,index:r})=>{let c=this.getDatasetMeta(a);if(!c)throw new Error("No dataset found at index "+a);return{datasetIndex:a,element:c.data[r],index:r}});!fn(o,n)&&(this._active=o,this._lastEvent=null,this._updateHoverStyles(o,n))}notifyPlugins(t,n,o){return this._plugins.notify(this,t,n,o)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,o){let s=this.options.hover,a=(l,d)=>l.filter(h=>!d.some(f=>h.datasetIndex===f.datasetIndex&&h.index===f.index)),r=a(n,t),c=o?t:a(t,n);r.length&&this.updateHoverStyle(r,s.mode,!1),c.length&&s.mode&&this.updateHoverStyle(c,s.mode,!0)}_eventHandler(t,n){let o={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",o,s)===!1)return;let a=this._handleEvent(t,n,o.inChartArea);return o.cancelable=!1,this.notifyPlugins("afterEvent",o,s),(a||o.changed)&&this.render(),this}_handleEvent(t,n,o){let{_active:s=[],options:a}=this,r=n,c=this._getActiveElements(t,s,o,r),l=Bs(t),d=Fd(t,this._lastEvent,o,l);o&&(this._lastEvent=null,U(a.onHover,[t,c,this],this),l&&U(a.onClick,[t,c,this],this));let h=!fn(c,s);return(h||n)&&(this._active=c,this._updateHoverStyles(c,s,n)),this._lastEvent=d,h}_getActiveElements(t,n,o,s){if(t.type==="mouseout")return[];if(!o)return n;let a=this.options.hover;return this.getElementsAtEventForMode(t,a.mode,a,s)}}return e})();function za(){return $(Di.instances,e=>e._plugins.invalidate())}function zd(e,i,t){let{startAngle:n,x:o,y:s,outerRadius:a,innerRadius:r,options:c}=i,{borderWidth:l,borderJoinStyle:d}=c,h=Math.min(l/a,at(n-t));if(e.beginPath(),e.arc(o,s,a-l/2,n+h/2,t-h/2),r>0){let f=Math.min(l/r,at(n-t));e.arc(o,s,r+l/2,t-f/2,n+f/2,!0)}else{let f=Math.min(l/2,a*at(n-t));if(d==="round")e.arc(o,s,f,t-N/2,n+N/2,!0);else if(d==="bevel"){let u=2*f*f,g=-u*Math.cos(t+N/2)+o,p=-u*Math.sin(t+N/2)+s,m=u*Math.cos(n+N/2)+o,x=u*Math.sin(n+N/2)+s;e.lineTo(g,p),e.lineTo(m,x)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function Bd(e,i,t){let{startAngle:n,pixelMargin:o,x:s,y:a,outerRadius:r,innerRadius:c}=i,l=o/r;e.beginPath(),e.arc(s,a,r,n-l,t+l),c>o?(l=o/c,e.arc(s,a,c,t+l,n-l,!0)):e.arc(s,a,o,t+et,n-et),e.closePath(),e.clip()}function Hd(e){return di(e,["outerStart","outerEnd","innerStart","innerEnd"])}function Wd(e,i,t,n){let o=Hd(e.options.borderRadius),s=(t-i)/2,a=Math.min(s,n*i/2),r=c=>{let l=(t-Math.min(s,c))*n/2;return it(c,0,Math.min(s,l))};return{outerStart:r(o.outerStart),outerEnd:r(o.outerEnd),innerStart:it(o.innerStart,0,a),innerEnd:it(o.innerEnd,0,a)}}function tn(e,i,t,n){return{x:t+e*Math.cos(i),y:n+e*Math.sin(i)}}function Oi(e,i,t,n,o,s){let{x:a,y:r,startAngle:c,pixelMargin:l,innerRadius:d}=i,h=Math.max(i.outerRadius+n+t-l,0),f=d>0?d+n+t+l:0,u=0,g=o-c;if(n){let j=d>0?d-n:0,X=h>0?h-n:0,Z=(j+X)/2,yt=Z!==0?g*Z/(Z+n):g;u=(g-yt)/2}let p=Math.max(.001,g*h-t/N)/h,m=(g-p)/2,x=c+m+u,y=o-m-u,{outerStart:v,outerEnd:O,innerStart:P,innerEnd:w}=Wd(i,f,h,y-x),D=h-v,k=h-O,T=x+v/D,E=y-O/k,R=f+P,z=f+w,ot=x+P/R,ht=y-w/z;if(e.beginPath(),s){let j=(T+E)/2;if(e.arc(a,r,h,T,j),e.arc(a,r,h,j,E),O>0){let st=tn(k,E,a,r);e.arc(st.x,st.y,O,E,y+et)}let X=tn(z,y,a,r);if(e.lineTo(X.x,X.y),w>0){let st=tn(z,ht,a,r);e.arc(st.x,st.y,w,y+et,ht+Math.PI)}let Z=(y-w/f+(x+P/f))/2;if(e.arc(a,r,f,y-w/f,Z,!0),e.arc(a,r,f,Z,x+P/f,!0),P>0){let st=tn(R,ot,a,r);e.arc(st.x,st.y,P,ot+Math.PI,x-et)}let yt=tn(D,x,a,r);if(e.lineTo(yt.x,yt.y),v>0){let st=tn(D,T,a,r);e.arc(st.x,st.y,v,x-et,T)}}else{e.moveTo(a,r);let j=Math.cos(T)*h+a,X=Math.sin(T)*h+r;e.lineTo(j,X);let Z=Math.cos(E)*h+a,yt=Math.sin(E)*h+r;e.lineTo(Z,yt)}e.closePath()}function Nd(e,i,t,n,o){let{fullCircles:s,startAngle:a,circumference:r}=i,c=i.endAngle;if(s){Oi(e,i,t,n,c,o);for(let l=0;l<s;++l)e.fill();isNaN(r)||(c=a+(r%K||K))}return Oi(e,i,t,n,c,o),e.fill(),c}function Vd(e,i,t,n,o){let{fullCircles:s,startAngle:a,circumference:r,options:c}=i,{borderWidth:l,borderJoinStyle:d,borderDash:h,borderDashOffset:f,borderRadius:u}=c,g=c.borderAlign==="inner";if(!l)return;e.setLineDash(h||[]),e.lineDashOffset=f,g?(e.lineWidth=l*2,e.lineJoin=d||"round"):(e.lineWidth=l,e.lineJoin=d||"bevel");let p=i.endAngle;if(s){Oi(e,i,t,n,p,o);for(let m=0;m<s;++m)e.stroke();isNaN(r)||(p=a+(r%K||K))}g&&Bd(e,i,p),c.selfJoin&&p-a>=N&&u===0&&d!=="miter"&&zd(e,i,p),s||(Oi(e,i,t,n,p,o),e.stroke())}var No=class extends At{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:i=>i!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(i){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,i&&Object.assign(this,i)}inRange(i,t,n){let o=this.getProps(["x","y"],n),{angle:s,distance:a}=Ki(o,{x:i,y:t}),{startAngle:r,endAngle:c,innerRadius:l,outerRadius:d,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],n),f=(this.options.spacing+this.options.borderWidth)/2,u=L(h,c-r),g=Ke(s,r,c)&&r!==c,p=u>=K||g,m=Ft(a,l+f,d+f);return p&&m}getCenterPoint(i){let{x:t,y:n,startAngle:o,endAngle:s,innerRadius:a,outerRadius:r}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],i),{offset:c,spacing:l}=this.options,d=(o+s)/2,h=(a+r+l+c)/2;return{x:t+Math.cos(d)*h,y:n+Math.sin(d)*h}}tooltipPosition(i){return this.getCenterPoint(i)}draw(i){let{options:t,circumference:n}=this,o=(t.offset||0)/4,s=(t.spacing||0)/2,a=t.circular;if(this.pixelMargin=t.borderAlign==="inner"?.33:0,this.fullCircles=n>K?Math.floor(n/K):0,n===0||this.innerRadius<0||this.outerRadius<0)return;i.save();let r=(this.startAngle+this.endAngle)/2;i.translate(Math.cos(r)*o,Math.sin(r)*o);let c=1-Math.sin(Math.min(N,n||0)),l=o*c;i.fillStyle=t.backgroundColor,i.strokeStyle=t.borderColor,Nd(i,this,l,s,a),Vd(i,this,l,s,a),i.restore()}};function Mr(e,i,t=i){e.lineCap=L(t.borderCapStyle,i.borderCapStyle),e.setLineDash(L(t.borderDash,i.borderDash)),e.lineDashOffset=L(t.borderDashOffset,i.borderDashOffset),e.lineJoin=L(t.borderJoinStyle,i.borderJoinStyle),e.lineWidth=L(t.borderWidth,i.borderWidth),e.strokeStyle=L(t.borderColor,i.borderColor)}function jd(e,i,t){e.lineTo(t.x,t.y)}function $d(e){return e.stepped?Ks:e.tension||e.cubicInterpolationMode==="monotone"?Js:jd}function Cr(e,i,t={}){let n=e.length,{start:o=0,end:s=n-1}=t,{start:a,end:r}=i,c=Math.max(o,a),l=Math.min(s,r),d=o<a&&s<a||o>r&&s>r;return{count:n,start:c,loop:i.loop,ilen:l<c&&!d?n+l-c:l-c}}function Yd(e,i,t,n){let{points:o,options:s}=i,{count:a,start:r,loop:c,ilen:l}=Cr(o,t,n),d=$d(s),{move:h=!0,reverse:f}=n||{},u,g,p;for(u=0;u<=l;++u)g=o[(r+(f?l-u:u))%a],!g.skip&&(h?(e.moveTo(g.x,g.y),h=!1):d(e,p,g,f,s.stepped),p=g);return c&&(g=o[(r+(f?l:0))%a],d(e,p,g,f,s.stepped)),!!c}function qd(e,i,t,n){let o=i.points,{count:s,start:a,ilen:r}=Cr(o,t,n),{move:c=!0,reverse:l}=n||{},d=0,h=0,f,u,g,p,m,x,y=O=>(a+(l?r-O:O))%s,v=()=>{p!==m&&(e.lineTo(d,m),e.lineTo(d,p),e.lineTo(d,x))};for(c&&(u=o[y(0)],e.moveTo(u.x,u.y)),f=0;f<=r;++f){if(u=o[y(f)],u.skip)continue;let O=u.x,P=u.y,w=O|0;w===g?(P<p?p=P:P>m&&(m=P),d=(h*d+O)/++h):(v(),e.lineTo(O,P),g=w,h=0,p=m=P),x=P}v()}function Vo(e){let i=e.options,t=i.borderDash&&i.borderDash.length;return!e._decimated&&!e._loop&&!i.tension&&i.cubicInterpolationMode!=="monotone"&&!i.stepped&&!t?qd:Yd}function Ud(e){return e.stepped?aa:e.tension||e.cubicInterpolationMode==="monotone"?ra:ge}function Xd(e,i,t,n){let o=i._path;o||(o=i._path=new Path2D,i.path(o,t,n)&&o.closePath()),Mr(e,i.options),e.stroke(o)}function Gd(e,i,t,n){let{segments:o,options:s}=i,a=Vo(i);for(let r of o)Mr(e,s,r.style),e.beginPath(),a(e,i,r,{start:t,end:t+n-1})&&e.closePath(),e.stroke()}var Kd=typeof Path2D=="function";function Jd(e,i,t,n){Kd&&!i.options.segment?Xd(e,i,t,n):Gd(e,i,t,n)}var Ti=(()=>{class e extends At{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){let o=this.options;if((o.tension||o.cubicInterpolationMode==="monotone")&&!o.stepped&&!this._pointsUpdated){let s=o.spanGaps?this._loop:this._fullLoop;ia(this._points,o,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=la(this,this.options.segment))}first(){let t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){let t=this.segments,n=this.points,o=t.length;return o&&n[t[o-1].end]}interpolate(t,n){let o=this.options,s=t[n],a=this.points,r=bo(this,{property:n,start:s,end:s});if(!r.length)return;let c=[],l=Ud(o),d,h;for(d=0,h=r.length;d<h;++d){let{start:f,end:u}=r[d],g=a[f],p=a[u];if(g===p){c.push(g);continue}let m=Math.abs((s-g[n])/(p[n]-g[n])),x=l(g,p,m,o.stepped);x[n]=t[n],c.push(x)}return c.length===1?c[0]:c}pathSegment(t,n,o){return Vo(this)(t,this,n,o)}path(t,n,o){let s=this.segments,a=Vo(this),r=this._loop;n=n||0,o=o||this.points.length-n;for(let c of s)r&=a(t,this,c,{start:n,end:n+o-1});return!!r}draw(t,n,o,s){let a=this.options||{};(this.points||[]).length&&a.borderWidth&&(t.save(),Jd(t,this,o,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}return e})();function Ba(e,i,t,n){let o=e.options,{[t]:s}=e.getProps([t],n);return Math.abs(i-s)<o.radius+o.hitRadius}var Zd=(()=>{class e extends At{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,n,o){let s=this.options,{x:a,y:r}=this.getProps(["x","y"],o);return Math.pow(t-a,2)+Math.pow(n-r,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(t,n){return Ba(this,t,"x",n)}inYRange(t,n){return Ba(this,t,"y",n)}getCenterPoint(t){let{x:n,y:o}=this.getProps(["x","y"],t);return{x:n,y:o}}size(t){t=t||this.options||{};let n=t.radius||0;n=Math.max(n,n&&t.hoverRadius||0);let o=n&&t.borderWidth||0;return(n+o)*2}draw(t,n){let o=this.options;this.skip||o.radius<.1||!Lt(this,n,this.size(o)/2)||(t.strokeStyle=o.borderColor,t.lineWidth=o.borderWidth,t.fillStyle=o.backgroundColor,li(t,o,this.x,this.y))}getRange(){let t=this.options||{};return t.radius+t.hitRadius}}return e})();function Pr(e,i){let{x:t,y:n,base:o,width:s,height:a}=e.getProps(["x","y","base","width","height"],i),r,c,l,d,h;return e.horizontal?(h=a/2,r=Math.min(t,o),c=Math.max(t,o),l=n-h,d=n+h):(h=s/2,r=t-h,c=t+h,l=Math.min(n,o),d=Math.max(n,o)),{left:r,top:l,right:c,bottom:d}}function Me(e,i,t,n){return e?0:it(i,t,n)}function Qd(e,i,t){let n=e.options.borderWidth,o=e.borderSkipped,s=ro(n);return{t:Me(o.top,s.top,0,t),r:Me(o.right,s.right,0,i),b:Me(o.bottom,s.bottom,0,t),l:Me(o.left,s.left,0,i)}}function th(e,i,t){let{enableBorderRadius:n}=e.getProps(["enableBorderRadius"]),o=e.options.borderRadius,s=xe(o),a=Math.min(i,t),r=e.borderSkipped,c=n||W(o);return{topLeft:Me(!c||r.top||r.left,s.topLeft,0,a),topRight:Me(!c||r.top||r.right,s.topRight,0,a),bottomLeft:Me(!c||r.bottom||r.left,s.bottomLeft,0,a),bottomRight:Me(!c||r.bottom||r.right,s.bottomRight,0,a)}}function eh(e){let i=Pr(e),t=i.right-i.left,n=i.bottom-i.top,o=Qd(e,t/2,n/2),s=th(e,t/2,n/2);return{outer:{x:i.left,y:i.top,w:t,h:n,radius:s},inner:{x:i.left+o.l,y:i.top+o.t,w:t-o.l-o.r,h:n-o.t-o.b,radius:{topLeft:Math.max(0,s.topLeft-Math.max(o.t,o.l)),topRight:Math.max(0,s.topRight-Math.max(o.t,o.r)),bottomLeft:Math.max(0,s.bottomLeft-Math.max(o.b,o.l)),bottomRight:Math.max(0,s.bottomRight-Math.max(o.b,o.r))}}}}function ko(e,i,t,n){let o=i===null,s=t===null,r=e&&!(o&&s)&&Pr(e,n);return r&&(o||Ft(i,r.left,r.right))&&(s||Ft(t,r.top,r.bottom))}function nh(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function ih(e,i){e.rect(i.x,i.y,i.w,i.h)}function So(e,i,t={}){let n=e.x!==t.x?-i:0,o=e.y!==t.y?-i:0,s=(e.x+e.w!==t.x+t.w?i:0)-n,a=(e.y+e.h!==t.y+t.h?i:0)-o;return{x:e.x+n,y:e.y+o,w:e.w+s,h:e.h+a,radius:e.radius}}var jo=class extends At{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(i){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,i&&Object.assign(this,i)}draw(i){let{inflateAmount:t,options:{borderColor:n,backgroundColor:o}}=this,{inner:s,outer:a}=eh(this),r=nh(a.radius)?Ze:ih;i.save(),(a.w!==s.w||a.h!==s.h)&&(i.beginPath(),r(i,So(a,t,s)),i.clip(),r(i,So(s,-t,a)),i.fillStyle=n,i.fill("evenodd")),i.beginPath(),r(i,So(s,t)),i.fillStyle=o,i.fill(),i.restore()}inRange(i,t,n){return ko(this,i,t,n)}inXRange(i,t){return ko(this,i,null,t)}inYRange(i,t){return ko(this,null,i,t)}getCenterPoint(i){let{x:t,y:n,base:o,horizontal:s}=this.getProps(["x","y","base","horizontal"],i);return{x:s?(t+o)/2:t,y:s?n:(n+o)/2}}getRange(i){return i==="x"?this.width/2:this.height/2}},oh=Object.freeze({__proto__:null,ArcElement:No,BarElement:jo,LineElement:Ti,PointElement:Zd}),$o=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Ha=$o.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function vr(e){return $o[e%$o.length]}function wr(e){return Ha[e%Ha.length]}function sh(e,i){return e.borderColor=vr(i),e.backgroundColor=wr(i),++i}function ah(e,i){return e.backgroundColor=e.data.map(()=>vr(i++)),i}function rh(e,i){return e.backgroundColor=e.data.map(()=>wr(i++)),i}function ch(e){let i=0;return(t,n)=>{let o=e.getDatasetMeta(n).controller;o instanceof Zo?i=ah(t,i):o instanceof fr?i=rh(t,i):o&&(i=sh(t,i))}}function Wa(e){let i;for(i in e)if(e[i].borderColor||e[i].backgroundColor)return!0;return!1}function lh(e){return e&&(e.borderColor||e.backgroundColor)}function dh(){return J.borderColor!=="rgba(0,0,0,0.1)"||J.backgroundColor!=="rgba(0,0,0,0.1)"}var hh={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,i,t){if(!t.enabled)return;let{data:{datasets:n},options:o}=e.config,{elements:s}=o,a=Wa(n)||lh(o)||s&&Wa(s)||dh();if(!t.forceOverride&&a)return;let r=ch(e);n.forEach(r)}};function fh(e,i,t,n,o){let s=o.samples||n;if(s>=t)return e.slice(i,i+t);let a=[],r=(t-2)/(s-2),c=0,l=i+t-1,d=i,h,f,u,g,p;for(a[c++]=e[d],h=0;h<s-2;h++){let m=0,x=0,y,v=Math.floor((h+1)*r)+1+i,O=Math.min(Math.floor((h+2)*r)+1,t)+i,P=O-v;for(y=v;y<O;y++)m+=e[y].x,x+=e[y].y;m/=P,x/=P;let w=Math.floor(h*r)+1+i,D=Math.min(Math.floor((h+1)*r)+1,t)+i,{x:k,y:T}=e[d];for(u=g=-1,y=w;y<D;y++)g=.5*Math.abs((k-m)*(e[y].y-T)-(k-e[y].x)*(x-T)),g>u&&(u=g,f=e[y],p=y);a[c++]=f,d=p}return a[c++]=e[l],a}function uh(e,i,t,n){let o=0,s=0,a,r,c,l,d,h,f,u,g,p,m=[],x=i+t-1,y=e[i].x,O=e[x].x-y;for(a=i;a<i+t;++a){r=e[a],c=(r.x-y)/O*n,l=r.y;let P=c|0;if(P===d)l<g?(g=l,h=a):l>p&&(p=l,f=a),o=(s*o+r.x)/++s;else{let w=a-1;if(!B(h)&&!B(f)){let D=Math.min(h,f),k=Math.max(h,f);D!==u&&D!==w&&m.push(pt(gt({},e[D]),{x:o})),k!==u&&k!==w&&m.push(pt(gt({},e[k]),{x:o}))}a>0&&w!==u&&m.push(e[w]),m.push(r),d=P,s=0,g=p=l,h=f=u=a}}return m}function Or(e){if(e._decimated){let i=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:i})}}function Na(e){e.data.datasets.forEach(i=>{Or(i)})}function gh(e,i){let t=i.length,n=0,o,{iScale:s}=e,{min:a,max:r,minDefined:c,maxDefined:l}=s.getUserBounds();return c&&(n=it(Et(i,s.axis,a).lo,0,t-1)),l?o=it(Et(i,s.axis,r).hi+1,n,t)-n:o=t-n,{start:n,count:o}}var ph={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,i,t)=>{if(!t.enabled){Na(e);return}let n=e.width;e.data.datasets.forEach((o,s)=>{let{_data:a,indexAxis:r}=o,c=e.getDatasetMeta(s),l=a||o.data;if(Qe([r,e.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;let d=e.scales[c.xAxisID];if(d.type!=="linear"&&d.type!=="time"||e.options.parsing)return;let{start:h,count:f}=gh(c,l),u=t.threshold||4*n;if(f<=u){Or(o);return}B(a)&&(o._data=l,delete o.data,Object.defineProperty(o,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(p){this._data=p}}));let g;switch(t.algorithm){case"lttb":g=fh(l,h,f,n,t);break;case"min-max":g=uh(l,h,f,n);break;default:throw new Error(`Unsupported decimation algorithm '${t.algorithm}'`)}o._decimated=g})},destroy(e){Na(e)}};function mh(e,i,t){let n=e.segments,o=e.points,s=i.points,a=[];for(let r of n){let{start:c,end:l}=r;l=Ai(c,l,o);let d=Yo(t,o[c],o[l],r.loop);if(!i.segments){a.push({source:r,target:d,start:o[c],end:o[l]});continue}let h=bo(i,d);for(let f of h){let u=Yo(t,s[f.start],s[f.end],f.loop),g=_o(r,o,u);for(let p of g)a.push({source:p,target:f,start:{[t]:Va(d,u,"start",Math.max)},end:{[t]:Va(d,u,"end",Math.min)}})}}return a}function Yo(e,i,t,n){if(n)return;let o=i[e],s=t[e];return e==="angle"&&(o=at(o),s=at(s)),{property:e,start:o,end:s}}function _h(e,i){let{x:t=null,y:n=null}=e||{},o=i.points,s=[];return i.segments.forEach(({start:a,end:r})=>{r=Ai(a,r,o);let c=o[a],l=o[r];n!==null?(s.push({x:c.x,y:n}),s.push({x:l.x,y:n})):t!==null&&(s.push({x:t,y:c.y}),s.push({x:t,y:l.y}))}),s}function Ai(e,i,t){for(;i>e;i--){let n=t[i];if(!isNaN(n.x)&&!isNaN(n.y))break}return i}function Va(e,i,t,n){return e&&i?n(e[t],i[t]):e?e[t]:i?i[t]:0}function kr(e,i){let t=[],n=!1;return G(e)?(n=!0,t=e):t=_h(e,i),t.length?new Ti({points:t,options:{tension:0},_loop:n,_fullLoop:n}):null}function ja(e){return e&&e.fill!==!1}function bh(e,i,t){let o=e[i].fill,s=[i],a;if(!t)return o;for(;o!==!1&&s.indexOf(o)===-1;){if(!tt(o))return o;if(a=e[o],!a)return!1;if(a.visible)return o;s.push(o),o=a.fill}return!1}function xh(e,i,t){let n=Ph(e);if(W(n))return isNaN(n.value)?!1:n;let o=parseFloat(n);return tt(o)&&Math.floor(o)===o?yh(n[0],i,o,t):["origin","start","end","stack","shape"].indexOf(n)>=0&&n}function yh(e,i,t,n){return(e==="-"||e==="+")&&(t=i+t),t===i||t<0||t>=n?!1:t}function Mh(e,i){let t=null;return e==="start"?t=i.bottom:e==="end"?t=i.top:W(e)?t=i.getPixelForValue(e.value):i.getBasePixel&&(t=i.getBasePixel()),t}function Ch(e,i,t){let n;return e==="start"?n=t:e==="end"?n=i.options.reverse?i.min:i.max:W(e)?n=e.value:n=i.getBaseValue(),n}function Ph(e){let i=e.options,t=i.fill,n=L(t&&t.target,t);return n===void 0&&(n=!!i.backgroundColor),n===!1||n===null?!1:n===!0?"origin":n}function vh(e){let{scale:i,index:t,line:n}=e,o=[],s=n.segments,a=n.points,r=wh(i,t);r.push(kr({x:null,y:i.bottom},n));for(let c=0;c<s.length;c++){let l=s[c];for(let d=l.start;d<=l.end;d++)Oh(o,a[d],r)}return new Ti({points:o,options:{}})}function wh(e,i){let t=[],n=e.getMatchingVisibleMetas("line");for(let o=0;o<n.length;o++){let s=n[o];if(s.index===i)break;s.hidden||t.unshift(s.dataset)}return t}function Oh(e,i,t){let n=[];for(let o=0;o<t.length;o++){let s=t[o],{first:a,last:r,point:c}=kh(s,i,"x");if(!(!c||a&&r)){if(a)n.unshift(c);else if(e.push(c),!r)break}}e.push(...n)}function kh(e,i,t){let n=e.interpolate(i,t);if(!n)return{};let o=n[t],s=e.segments,a=e.points,r=!1,c=!1;for(let l=0;l<s.length;l++){let d=s[l],h=a[d.start][t],f=a[d.end][t];if(Ft(o,h,f)){r=o===h,c=o===f;break}}return{first:r,last:c,point:n}}var ki=class{constructor(i){this.x=i.x,this.y=i.y,this.radius=i.radius}pathSegment(i,t,n){let{x:o,y:s,radius:a}=this;return t=t||{start:0,end:K},i.arc(o,s,a,t.end,t.start,!0),!n.bounds}interpolate(i){let{x:t,y:n,radius:o}=this,s=i.angle;return{x:t+Math.cos(s)*o,y:n+Math.sin(s)*o,angle:s}}};function Sh(e){let{chart:i,fill:t,line:n}=e;if(tt(t))return Dh(i,t);if(t==="stack")return vh(e);if(t==="shape")return!0;let o=Th(e);return o instanceof ki?o:kr(o,n)}function Dh(e,i){let t=e.getDatasetMeta(i);return t&&e.isDatasetVisible(i)?t.dataset:null}function Th(e){return(e.scale||{}).getPointPositionForValue?Ih(e):Ah(e)}function Ah(e){let{scale:i={},fill:t}=e,n=Mh(t,i);if(tt(n)){let o=i.isHorizontal();return{x:o?n:null,y:o?null:n}}return null}function Ih(e){let{scale:i,fill:t}=e,n=i.options,o=i.getLabels().length,s=n.reverse?i.max:i.min,a=Ch(t,i,s),r=[];if(n.grid.circular){let c=i.getPointPositionForValue(0,s);return new ki({x:c.x,y:c.y,radius:i.getDistanceFromCenterForValue(a)})}for(let c=0;c<o;++c)r.push(i.getPointPositionForValue(c,a));return r}function Do(e,i,t){let n=Sh(i),{chart:o,index:s,line:a,scale:r,axis:c}=i,l=a.options,d=l.fill,h=l.backgroundColor,{above:f=h,below:u=h}=d||{},g=o.getDatasetMeta(s),p=xo(o,g);n&&a.points.length&&(gn(e,t),Eh(e,{line:a,target:n,above:f,below:u,area:t,scale:r,axis:c,clip:p}),pn(e))}function Eh(e,i){let{line:t,target:n,above:o,below:s,area:a,scale:r,clip:c}=i,l=t._loop?"angle":i.axis;e.save();let d=s;s!==o&&(l==="x"?($a(e,n,a.top),To(e,{line:t,target:n,color:o,scale:r,property:l,clip:c}),e.restore(),e.save(),$a(e,n,a.bottom)):l==="y"&&(Ya(e,n,a.left),To(e,{line:t,target:n,color:s,scale:r,property:l,clip:c}),e.restore(),e.save(),Ya(e,n,a.right),d=o)),To(e,{line:t,target:n,color:d,scale:r,property:l,clip:c}),e.restore()}function $a(e,i,t){let{segments:n,points:o}=i,s=!0,a=!1;e.beginPath();for(let r of n){let{start:c,end:l}=r,d=o[c],h=o[Ai(c,l,o)];s?(e.moveTo(d.x,d.y),s=!1):(e.lineTo(d.x,t),e.lineTo(d.x,d.y)),a=!!i.pathSegment(e,r,{move:a}),a?e.closePath():e.lineTo(h.x,t)}e.lineTo(i.first().x,t),e.closePath(),e.clip()}function Ya(e,i,t){let{segments:n,points:o}=i,s=!0,a=!1;e.beginPath();for(let r of n){let{start:c,end:l}=r,d=o[c],h=o[Ai(c,l,o)];s?(e.moveTo(d.x,d.y),s=!1):(e.lineTo(t,d.y),e.lineTo(d.x,d.y)),a=!!i.pathSegment(e,r,{move:a}),a?e.closePath():e.lineTo(t,h.y)}e.lineTo(t,i.first().y),e.closePath(),e.clip()}function To(e,i){let{line:t,target:n,property:o,color:s,scale:a,clip:r}=i,c=mh(t,n,o);for(let{source:l,target:d,start:h,end:f}of c){let{style:{backgroundColor:u=s}={}}=l,g=n!==!0;e.save(),e.fillStyle=u,Lh(e,a,r,g&&Yo(o,h,f)),e.beginPath();let p=!!t.pathSegment(e,l),m;if(g){p?e.closePath():qa(e,n,f,o);let x=!!n.pathSegment(e,d,{move:p,reverse:!0});m=p&&x,m||qa(e,n,h,o)}e.closePath(),e.fill(m?"evenodd":"nonzero"),e.restore()}}function Lh(e,i,t,n){let o=i.chart.chartArea,{property:s,start:a,end:r}=n||{};if(s==="x"||s==="y"){let c,l,d,h;s==="x"?(c=a,l=o.top,d=r,h=o.bottom):(c=o.left,l=a,d=o.right,h=r),e.beginPath(),t&&(c=Math.max(c,t.left),d=Math.min(d,t.right),l=Math.max(l,t.top),h=Math.min(h,t.bottom)),e.rect(c,l,d-c,h-l),e.clip()}}function qa(e,i,t,n){let o=i.interpolate(t,n);o&&e.lineTo(o.x,o.y)}var Rh={id:"filler",afterDatasetsUpdate(e,i,t){let n=(e.data.datasets||[]).length,o=[],s,a,r,c;for(a=0;a<n;++a)s=e.getDatasetMeta(a),r=s.dataset,c=null,r&&r.options&&r instanceof Ti&&(c={visible:e.isDatasetVisible(a),index:a,fill:xh(r,a,n),chart:e,axis:s.controller.options.indexAxis,scale:s.vScale,line:r}),s.$filler=c,o.push(c);for(a=0;a<n;++a)c=o[a],!(!c||c.fill===!1)&&(c.fill=bh(o,a,t.propagate))},beforeDraw(e,i,t){let n=t.drawTime==="beforeDraw",o=e.getSortedVisibleDatasetMetas(),s=e.chartArea;for(let a=o.length-1;a>=0;--a){let r=o[a].$filler;r&&(r.line.updateControlPoints(s,r.axis),n&&r.fill&&Do(e.ctx,r,s))}},beforeDatasetsDraw(e,i,t){if(t.drawTime!=="beforeDatasetsDraw")return;let n=e.getSortedVisibleDatasetMetas();for(let o=n.length-1;o>=0;--o){let s=n[o].$filler;ja(s)&&Do(e.ctx,s,e.chartArea)}},beforeDatasetDraw(e,i,t){let n=i.meta.$filler;!ja(n)||t.drawTime!=="beforeDatasetDraw"||Do(e.ctx,n,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}},Ua=(e,i)=>{let{boxHeight:t=i,boxWidth:n=i}=e;return e.usePointStyle&&(t=Math.min(t,i),n=e.pointStyleWidth||Math.min(n,i)),{boxWidth:n,boxHeight:t,itemHeight:Math.max(i,t)}},Fh=(e,i)=>e!==null&&i!==null&&e.datasetIndex===i.datasetIndex&&e.index===i.index,Si=class extends At{constructor(i){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=i.chart,this.options=i.options,this.ctx=i.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(i,t,n){this.maxWidth=i,this.maxHeight=t,this._margins=n,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){let i=this.options.labels||{},t=U(i.generateLabels,[this.chart],this)||[];i.filter&&(t=t.filter(n=>i.filter(n,this.chart.data))),i.sort&&(t=t.sort((n,o)=>i.sort(n,o,this.chart.data))),this.options.reverse&&t.reverse(),this.legendItems=t}fit(){let{options:i,ctx:t}=this;if(!i.display){this.width=this.height=0;return}let n=i.labels,o=nt(n.font),s=o.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:c}=Ua(n,s),l,d;t.font=o.string,this.isHorizontal()?(l=this.maxWidth,d=this._fitRows(a,s,r,c)+10):(d=this.maxHeight,l=this._fitCols(a,o,r,c)+10),this.width=Math.min(l,i.maxWidth||this.maxWidth),this.height=Math.min(d,i.maxHeight||this.maxHeight)}_fitRows(i,t,n,o){let{ctx:s,maxWidth:a,options:{labels:{padding:r}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],d=o+r,h=i;s.textAlign="left",s.textBaseline="middle";let f=-1,u=-d;return this.legendItems.forEach((g,p)=>{let m=n+t/2+s.measureText(g.text).width;(p===0||l[l.length-1]+m+2*r>a)&&(h+=d,l[l.length-(p>0?0:1)]=0,u+=d,f++),c[p]={left:0,top:u,row:f,width:m,height:o},l[l.length-1]+=m+r}),h}_fitCols(i,t,n,o){let{ctx:s,maxHeight:a,options:{labels:{padding:r}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],d=a-i,h=r,f=0,u=0,g=0,p=0;return this.legendItems.forEach((m,x)=>{let{itemWidth:y,itemHeight:v}=zh(n,t,s,m,o);x>0&&u+v+2*r>d&&(h+=f+r,l.push({width:f,height:u}),g+=f+r,p++,f=u=0),c[x]={left:g,top:u,col:p,width:y,height:v},f=Math.max(f,y),u+=v+r}),h+=f,l.push({width:f,height:u}),h}adjustHitBoxes(){if(!this.options.display)return;let i=this._computeTitleHeight(),{legendHitBoxes:t,options:{align:n,labels:{padding:o},rtl:s}}=this,a=Ae(s,this.left,this.width);if(this.isHorizontal()){let r=0,c=rt(n,this.left+o,this.right-this.lineWidths[r]);for(let l of t)r!==l.row&&(r=l.row,c=rt(n,this.left+o,this.right-this.lineWidths[r])),l.top+=this.top+i+o,l.left=a.leftForLtr(a.x(c),l.width),c+=l.width+o}else{let r=0,c=rt(n,this.top+i+o,this.bottom-this.columnSizes[r].height);for(let l of t)l.col!==r&&(r=l.col,c=rt(n,this.top+i+o,this.bottom-this.columnSizes[r].height)),l.top=c,l.left+=this.left+o,l.left=a.leftForLtr(a.x(l.left),l.width),c+=l.height+o}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){let i=this.ctx;gn(i,this),this._draw(),pn(i)}}_draw(){let{options:i,columnSizes:t,lineWidths:n,ctx:o}=this,{align:s,labels:a}=i,r=J.color,c=Ae(i.rtl,this.left,this.width),l=nt(a.font),{padding:d}=a,h=l.size,f=h/2,u;this.drawTitle(),o.textAlign=c.textAlign("left"),o.textBaseline="middle",o.lineWidth=.5,o.font=l.string;let{boxWidth:g,boxHeight:p,itemHeight:m}=Ua(a,h),x=function(w,D,k){if(isNaN(g)||g<=0||isNaN(p)||p<0)return;o.save();let T=L(k.lineWidth,1);if(o.fillStyle=L(k.fillStyle,r),o.lineCap=L(k.lineCap,"butt"),o.lineDashOffset=L(k.lineDashOffset,0),o.lineJoin=L(k.lineJoin,"miter"),o.lineWidth=T,o.strokeStyle=L(k.strokeStyle,r),o.setLineDash(L(k.lineDash,[])),a.usePointStyle){let E={radius:p*Math.SQRT2/2,pointStyle:k.pointStyle,rotation:k.rotation,borderWidth:T},R=c.xPlus(w,g/2),z=D+f;ao(o,E,R,z,a.pointStyleWidth&&g)}else{let E=D+Math.max((h-p)/2,0),R=c.leftForLtr(w,g),z=xe(k.borderRadius);o.beginPath(),Object.values(z).some(ot=>ot!==0)?Ze(o,{x:R,y:E,w:g,h:p,radius:z}):o.rect(R,E,g,p),o.fill(),T!==0&&o.stroke()}o.restore()},y=function(w,D,k){be(o,k.text,w,D+m/2,l,{strikethrough:k.hidden,textAlign:c.textAlign(k.textAlign)})},v=this.isHorizontal(),O=this._computeTitleHeight();v?u={x:rt(s,this.left+d,this.right-n[0]),y:this.top+d+O,line:0}:u={x:this.left+d,y:rt(s,this.top+O+d,this.bottom-t[0].height),line:0},po(this.ctx,i.textDirection);let P=m+d;this.legendItems.forEach((w,D)=>{o.strokeStyle=w.fontColor,o.fillStyle=w.fontColor;let k=o.measureText(w.text).width,T=c.textAlign(w.textAlign||(w.textAlign=a.textAlign)),E=g+f+k,R=u.x,z=u.y;c.setWidth(this.width),v?D>0&&R+E+d>this.right&&(z=u.y+=P,u.line++,R=u.x=rt(s,this.left+d,this.right-n[u.line])):D>0&&z+P>this.bottom&&(R=u.x=R+t[u.line].width+d,u.line++,z=u.y=rt(s,this.top+O+d,this.bottom-t[u.line].height));let ot=c.x(R);if(x(ot,z,w),R=Us(T,R+g+f,v?R+E:this.right,i.rtl),y(c.x(R),z,w),v)u.x+=E+d;else if(typeof w.text!="string"){let ht=l.lineHeight;u.y+=Sr(w,ht)+d}else u.y+=P}),mo(this.ctx,i.textDirection)}drawTitle(){let i=this.options,t=i.title,n=nt(t.font),o=ct(t.padding);if(!t.display)return;let s=Ae(i.rtl,this.left,this.width),a=this.ctx,r=t.position,c=n.size/2,l=o.top+c,d,h=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),d=this.top+l,h=rt(i.align,h,this.right-f);else{let g=this.columnSizes.reduce((p,m)=>Math.max(p,m.height),0);d=l+rt(i.align,this.top,this.bottom-g-i.labels.padding-this._computeTitleHeight())}let u=rt(r,h,h+f);a.textAlign=s.textAlign(ri(r)),a.textBaseline="middle",a.strokeStyle=t.color,a.fillStyle=t.color,a.font=n.string,be(a,t.text,u,d,n)}_computeTitleHeight(){let i=this.options.title,t=nt(i.font),n=ct(i.padding);return i.display?t.lineHeight+n.height:0}_getLegendItemAt(i,t){let n,o,s;if(Ft(i,this.left,this.right)&&Ft(t,this.top,this.bottom)){for(s=this.legendHitBoxes,n=0;n<s.length;++n)if(o=s[n],Ft(i,o.left,o.left+o.width)&&Ft(t,o.top,o.top+o.height))return this.legendItems[n]}return null}handleEvent(i){let t=this.options;if(!Wh(i.type,t))return;let n=this._getLegendItemAt(i.x,i.y);if(i.type==="mousemove"||i.type==="mouseout"){let o=this._hoveredItem,s=Fh(o,n);o&&!s&&U(t.onLeave,[i,o,this],this),this._hoveredItem=n,n&&!s&&U(t.onHover,[i,n,this],this)}else n&&U(t.onClick,[i,n,this],this)}};function zh(e,i,t,n,o){let s=Bh(n,e,i,t),a=Hh(o,n,i.lineHeight);return{itemWidth:s,itemHeight:a}}function Bh(e,i,t,n){let o=e.text;return o&&typeof o!="string"&&(o=o.reduce((s,a)=>s.length>a.length?s:a)),i+t.size/2+n.measureText(o).width}function Hh(e,i,t){let n=e;return typeof i.text!="string"&&(n=Sr(i,t)),n}function Sr(e,i){let t=e.text?e.text.length:0;return i*t}function Wh(e,i){return!!((e==="mousemove"||e==="mouseout")&&(i.onHover||i.onLeave)||i.onClick&&(e==="click"||e==="mouseup"))}var Nh={id:"legend",_element:Si,start(e,i,t){let n=e.legend=new Si({ctx:e.ctx,options:t,chart:e});dt.configure(e,n,t),dt.addBox(e,n)},stop(e){dt.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,i,t){let n=e.legend;dt.configure(e,n,t),n.options=t},afterUpdate(e){let i=e.legend;i.buildLabels(),i.adjustHitBoxes()},afterEvent(e,i){i.replay||e.legend.handleEvent(i.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,i,t){let n=i.datasetIndex,o=t.chart;o.isDatasetVisible(n)?(o.hide(n),i.hidden=!0):(o.show(n),i.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){let i=e.data.datasets,{labels:{usePointStyle:t,pointStyle:n,textAlign:o,color:s,useBorderRadius:a,borderRadius:r}}=e.legend.options;return e._getSortedDatasetMetas().map(c=>{let l=c.controller.getStyle(t?0:void 0),d=ct(l.borderWidth);return{text:i[c.index].label,fillStyle:l.backgroundColor,fontColor:s,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:l.borderColor,pointStyle:n||l.pointStyle,rotation:l.rotation,textAlign:o||l.textAlign,borderRadius:a&&(r||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}},vn=class extends At{constructor(i){super(),this.chart=i.chart,this.options=i.options,this.ctx=i.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(i,t){let n=this.options;if(this.left=0,this.top=0,!n.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=i,this.height=this.bottom=t;let o=G(n.text)?n.text.length:1;this._padding=ct(n.padding);let s=o*nt(n.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=s:this.width=s}isHorizontal(){let i=this.options.position;return i==="top"||i==="bottom"}_drawArgs(i){let{top:t,left:n,bottom:o,right:s,options:a}=this,r=a.align,c=0,l,d,h;return this.isHorizontal()?(d=rt(r,n,s),h=t+i,l=s-n):(a.position==="left"?(d=n+i,h=rt(r,o,t),c=N*-.5):(d=s-i,h=rt(r,t,o),c=N*.5),l=o-t),{titleX:d,titleY:h,maxWidth:l,rotation:c}}draw(){let i=this.ctx,t=this.options;if(!t.display)return;let n=nt(t.font),s=n.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:c,rotation:l}=this._drawArgs(s);be(i,t.text,0,0,n,{color:t.color,maxWidth:c,rotation:l,textAlign:ri(t.align),textBaseline:"middle",translation:[a,r]})}};function Vh(e,i){let t=new vn({ctx:e.ctx,options:i,chart:e});dt.configure(e,t,i),dt.addBox(e,t),e.titleBlock=t}var jh={id:"title",_element:vn,start(e,i,t){Vh(e,t)},stop(e){let i=e.titleBlock;dt.removeBox(e,i),delete e.titleBlock},beforeUpdate(e,i,t){let n=e.titleBlock;dt.configure(e,n,t),n.options=t},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}},bi=new WeakMap,$h={id:"subtitle",start(e,i,t){let n=new vn({ctx:e.ctx,options:t,chart:e});dt.configure(e,n,t),dt.addBox(e,n),bi.set(e,n)},stop(e){dt.removeBox(e,bi.get(e)),bi.delete(e)},beforeUpdate(e,i,t){let n=bi.get(e);dt.configure(e,n,t),n.options=t},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}},Cn={average(e){if(!e.length)return!1;let i,t,n=new Set,o=0,s=0;for(i=0,t=e.length;i<t;++i){let r=e[i].element;if(r&&r.hasValue()){let c=r.tooltipPosition();n.add(c.x),o+=c.y,++s}}return s===0||n.size===0?!1:{x:[...n].reduce((r,c)=>r+c)/n.size,y:o/s}},nearest(e,i){if(!e.length)return!1;let t=i.x,n=i.y,o=Number.POSITIVE_INFINITY,s,a,r;for(s=0,a=e.length;s<a;++s){let c=e[s].element;if(c&&c.hasValue()){let l=c.getCenterPoint(),d=ni(i,l);d<o&&(o=d,r=c)}}if(r){let c=r.tooltipPosition();t=c.x,n=c.y}return{x:t,y:n}}};function zt(e,i){return i&&(G(i)?Array.prototype.push.apply(e,i):e.push(i)),e}function qt(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Yh(e,i){let{element:t,datasetIndex:n,index:o}=i,s=e.getDatasetMeta(n).controller,{label:a,value:r}=s.getLabelAndValue(o);return{chart:e,label:a,parsed:s.getParsed(o),raw:e.data.datasets[n].data[o],formattedValue:r,dataset:s.getDataset(),dataIndex:o,datasetIndex:n,element:t}}function Xa(e,i){let t=e.chart.ctx,{body:n,footer:o,title:s}=e,{boxWidth:a,boxHeight:r}=i,c=nt(i.bodyFont),l=nt(i.titleFont),d=nt(i.footerFont),h=s.length,f=o.length,u=n.length,g=ct(i.padding),p=g.height,m=0,x=n.reduce((O,P)=>O+P.before.length+P.lines.length+P.after.length,0);if(x+=e.beforeBody.length+e.afterBody.length,h&&(p+=h*l.lineHeight+(h-1)*i.titleSpacing+i.titleMarginBottom),x){let O=i.displayColors?Math.max(r,c.lineHeight):c.lineHeight;p+=u*O+(x-u)*c.lineHeight+(x-1)*i.bodySpacing}f&&(p+=i.footerMarginTop+f*d.lineHeight+(f-1)*i.footerSpacing);let y=0,v=function(O){m=Math.max(m,t.measureText(O).width+y)};return t.save(),t.font=l.string,$(e.title,v),t.font=c.string,$(e.beforeBody.concat(e.afterBody),v),y=i.displayColors?a+2+i.boxPadding:0,$(n,O=>{$(O.before,v),$(O.lines,v),$(O.after,v)}),y=0,t.font=d.string,$(e.footer,v),t.restore(),m+=g.width,{width:m,height:p}}function qh(e,i){let{y:t,height:n}=i;return t<n/2?"top":t>e.height-n/2?"bottom":"center"}function Uh(e,i,t,n){let{x:o,width:s}=n,a=t.caretSize+t.caretPadding;if(e==="left"&&o+s+a>i.width||e==="right"&&o-s-a<0)return!0}function Xh(e,i,t,n){let{x:o,width:s}=t,{width:a,chartArea:{left:r,right:c}}=e,l="center";return n==="center"?l=o<=(r+c)/2?"left":"right":o<=s/2?l="left":o>=a-s/2&&(l="right"),Uh(l,e,i,t)&&(l="center"),l}function Ga(e,i,t){let n=t.yAlign||i.yAlign||qh(e,t);return{xAlign:t.xAlign||i.xAlign||Xh(e,i,t,n),yAlign:n}}function Gh(e,i){let{x:t,width:n}=e;return i==="right"?t-=n:i==="center"&&(t-=n/2),t}function Kh(e,i,t){let{y:n,height:o}=e;return i==="top"?n+=t:i==="bottom"?n-=o+t:n-=o/2,n}function Ka(e,i,t,n){let{caretSize:o,caretPadding:s,cornerRadius:a}=e,{xAlign:r,yAlign:c}=t,l=o+s,{topLeft:d,topRight:h,bottomLeft:f,bottomRight:u}=xe(a),g=Gh(i,r),p=Kh(i,c,l);return c==="center"?r==="left"?g+=l:r==="right"&&(g-=l):r==="left"?g-=Math.max(d,f)+o:r==="right"&&(g+=Math.max(h,u)+o),{x:it(g,0,n.width-i.width),y:it(p,0,n.height-i.height)}}function xi(e,i,t){let n=ct(t.padding);return i==="center"?e.x+e.width/2:i==="right"?e.x+e.width-n.right:e.x+n.left}function Ja(e){return zt([],qt(e))}function Jh(e,i,t){return $t(e,{tooltip:i,tooltipItems:t,type:"tooltip"})}function Za(e,i){let t=i&&i.dataset&&i.dataset.tooltip&&i.dataset.tooltip.callbacks;return t?e.override(t):e}var Dr={beforeTitle:Rt,title(e){if(e.length>0){let i=e[0],t=i.chart.data.labels,n=t?t.length:0;if(this&&this.options&&this.options.mode==="dataset")return i.dataset.label||"";if(i.label)return i.label;if(n>0&&i.dataIndex<n)return t[i.dataIndex]}return""},afterTitle:Rt,beforeBody:Rt,beforeLabel:Rt,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let i=e.dataset.label||"";i&&(i+=": ");let t=e.formattedValue;return B(t)||(i+=t),i},labelColor(e){let t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:t.borderColor,backgroundColor:t.backgroundColor,borderWidth:t.borderWidth,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){let t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:t.pointStyle,rotation:t.rotation}},afterLabel:Rt,afterBody:Rt,beforeFooter:Rt,footer:Rt,afterFooter:Rt};function bt(e,i,t,n){let o=e[i].call(t,n);return typeof o>"u"?Dr[i].call(t,n):o}var Qa=(()=>{class e extends At{static positioners=Cn;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){let t=this._cachedAnimations;if(t)return t;let n=this.chart,o=this.options.setContext(this.getContext()),s=o.enabled&&n.options.animation&&o.animations,a=new Pi(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(a)),a}getContext(){return this.$context||(this.$context=Jh(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){let{callbacks:o}=n,s=bt(o,"beforeTitle",this,t),a=bt(o,"title",this,t),r=bt(o,"afterTitle",this,t),c=[];return c=zt(c,qt(s)),c=zt(c,qt(a)),c=zt(c,qt(r)),c}getBeforeBody(t,n){return Ja(bt(n.callbacks,"beforeBody",this,t))}getBody(t,n){let{callbacks:o}=n,s=[];return $(t,a=>{let r={before:[],lines:[],after:[]},c=Za(o,a);zt(r.before,qt(bt(c,"beforeLabel",this,a))),zt(r.lines,bt(c,"label",this,a)),zt(r.after,qt(bt(c,"afterLabel",this,a))),s.push(r)}),s}getAfterBody(t,n){return Ja(bt(n.callbacks,"afterBody",this,t))}getFooter(t,n){let{callbacks:o}=n,s=bt(o,"beforeFooter",this,t),a=bt(o,"footer",this,t),r=bt(o,"afterFooter",this,t),c=[];return c=zt(c,qt(s)),c=zt(c,qt(a)),c=zt(c,qt(r)),c}_createItems(t){let n=this._active,o=this.chart.data,s=[],a=[],r=[],c=[],l,d;for(l=0,d=n.length;l<d;++l)c.push(Yh(this.chart,n[l]));return t.filter&&(c=c.filter((h,f,u)=>t.filter(h,f,u,o))),t.itemSort&&(c=c.sort((h,f)=>t.itemSort(h,f,o))),$(c,h=>{let f=Za(t.callbacks,h);s.push(bt(f,"labelColor",this,h)),a.push(bt(f,"labelPointStyle",this,h)),r.push(bt(f,"labelTextColor",this,h))}),this.labelColors=s,this.labelPointStyles=a,this.labelTextColors=r,this.dataPoints=c,c}update(t,n){let o=this.options.setContext(this.getContext()),s=this._active,a,r=[];if(!s.length)this.opacity!==0&&(a={opacity:0});else{let c=Cn[o.position].call(this,s,this._eventPosition);r=this._createItems(o),this.title=this.getTitle(r,o),this.beforeBody=this.getBeforeBody(r,o),this.body=this.getBody(r,o),this.afterBody=this.getAfterBody(r,o),this.footer=this.getFooter(r,o);let l=this._size=Xa(this,o),d=Object.assign({},c,l),h=Ga(this.chart,o,d),f=Ka(o,d,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,a={opacity:1,x:f.x,y:f.y,width:l.width,height:l.height,caretX:c.x,caretY:c.y}}this._tooltipItems=r,this.$context=void 0,a&&this._resolveAnimations().update(this,a),t&&o.external&&o.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,o,s){let a=this.getCaretPosition(t,o,s);n.lineTo(a.x1,a.y1),n.lineTo(a.x2,a.y2),n.lineTo(a.x3,a.y3)}getCaretPosition(t,n,o){let{xAlign:s,yAlign:a}=this,{caretSize:r,cornerRadius:c}=o,{topLeft:l,topRight:d,bottomLeft:h,bottomRight:f}=xe(c),{x:u,y:g}=t,{width:p,height:m}=n,x,y,v,O,P,w;return a==="center"?(P=g+m/2,s==="left"?(x=u,y=x-r,O=P+r,w=P-r):(x=u+p,y=x+r,O=P-r,w=P+r),v=x):(s==="left"?y=u+Math.max(l,h)+r:s==="right"?y=u+p-Math.max(d,f)-r:y=this.caretX,a==="top"?(O=g,P=O-r,x=y-r,v=y+r):(O=g+m,P=O+r,x=y+r,v=y-r),w=O),{x1:x,x2:y,x3:v,y1:O,y2:P,y3:w}}drawTitle(t,n,o){let s=this.title,a=s.length,r,c,l;if(a){let d=Ae(o.rtl,this.x,this.width);for(t.x=xi(this,o.titleAlign,o),n.textAlign=d.textAlign(o.titleAlign),n.textBaseline="middle",r=nt(o.titleFont),c=o.titleSpacing,n.fillStyle=o.titleColor,n.font=r.string,l=0;l<a;++l)n.fillText(s[l],d.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+c,l+1===a&&(t.y+=o.titleMarginBottom-c)}}_drawColorBox(t,n,o,s,a){let r=this.labelColors[o],c=this.labelPointStyles[o],{boxHeight:l,boxWidth:d}=a,h=nt(a.bodyFont),f=xi(this,"left",a),u=s.x(f),g=l<h.lineHeight?(h.lineHeight-l)/2:0,p=n.y+g;if(a.usePointStyle){let m={radius:Math.min(d,l)/2,pointStyle:c.pointStyle,rotation:c.rotation,borderWidth:1},x=s.leftForLtr(u,d)+d/2,y=p+l/2;t.strokeStyle=a.multiKeyBackground,t.fillStyle=a.multiKeyBackground,li(t,m,x,y),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,li(t,m,x,y)}else{t.lineWidth=W(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;let m=s.leftForLtr(u,d),x=s.leftForLtr(s.xPlus(u,1),d-2),y=xe(r.borderRadius);Object.values(y).some(v=>v!==0)?(t.beginPath(),t.fillStyle=a.multiKeyBackground,Ze(t,{x:m,y:p,w:d,h:l,radius:y}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),Ze(t,{x,y:p+1,w:d-2,h:l-2,radius:y}),t.fill()):(t.fillStyle=a.multiKeyBackground,t.fillRect(m,p,d,l),t.strokeRect(m,p,d,l),t.fillStyle=r.backgroundColor,t.fillRect(x,p+1,d-2,l-2))}t.fillStyle=this.labelTextColors[o]}drawBody(t,n,o){let{body:s}=this,{bodySpacing:a,bodyAlign:r,displayColors:c,boxHeight:l,boxWidth:d,boxPadding:h}=o,f=nt(o.bodyFont),u=f.lineHeight,g=0,p=Ae(o.rtl,this.x,this.width),m=function(T){n.fillText(T,p.x(t.x+g),t.y+u/2),t.y+=u+a},x=p.textAlign(r),y,v,O,P,w,D,k;for(n.textAlign=r,n.textBaseline="middle",n.font=f.string,t.x=xi(this,x,o),n.fillStyle=o.bodyColor,$(this.beforeBody,m),g=c&&x!=="right"?r==="center"?d/2+h:d+2+h:0,P=0,D=s.length;P<D;++P){for(y=s[P],v=this.labelTextColors[P],n.fillStyle=v,$(y.before,m),O=y.lines,c&&O.length&&(this._drawColorBox(n,t,P,p,o),u=Math.max(f.lineHeight,l)),w=0,k=O.length;w<k;++w)m(O[w]),u=f.lineHeight;$(y.after,m)}g=0,u=f.lineHeight,$(this.afterBody,m),t.y-=a}drawFooter(t,n,o){let s=this.footer,a=s.length,r,c;if(a){let l=Ae(o.rtl,this.x,this.width);for(t.x=xi(this,o.footerAlign,o),t.y+=o.footerMarginTop,n.textAlign=l.textAlign(o.footerAlign),n.textBaseline="middle",r=nt(o.footerFont),n.fillStyle=o.footerColor,n.font=r.string,c=0;c<a;++c)n.fillText(s[c],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+o.footerSpacing}}drawBackground(t,n,o,s){let{xAlign:a,yAlign:r}=this,{x:c,y:l}=t,{width:d,height:h}=o,{topLeft:f,topRight:u,bottomLeft:g,bottomRight:p}=xe(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(c+f,l),r==="top"&&this.drawCaret(t,n,o,s),n.lineTo(c+d-u,l),n.quadraticCurveTo(c+d,l,c+d,l+u),r==="center"&&a==="right"&&this.drawCaret(t,n,o,s),n.lineTo(c+d,l+h-p),n.quadraticCurveTo(c+d,l+h,c+d-p,l+h),r==="bottom"&&this.drawCaret(t,n,o,s),n.lineTo(c+g,l+h),n.quadraticCurveTo(c,l+h,c,l+h-g),r==="center"&&a==="left"&&this.drawCaret(t,n,o,s),n.lineTo(c,l+f),n.quadraticCurveTo(c,l,c+f,l),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){let n=this.chart,o=this.$animations,s=o&&o.x,a=o&&o.y;if(s||a){let r=Cn[t.position].call(this,this._active,this._eventPosition);if(!r)return;let c=this._size=Xa(this,t),l=Object.assign({},r,this._size),d=Ga(n,t,l),h=Ka(t,l,d,n);(s._to!==h.x||a._to!==h.y)&&(this.xAlign=d.xAlign,this.yAlign=d.yAlign,this.width=c.width,this.height=c.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){let n=this.options.setContext(this.getContext()),o=this.opacity;if(!o)return;this._updateAnimationTarget(n);let s={width:this.width,height:this.height},a={x:this.x,y:this.y};o=Math.abs(o)<.001?0:o;let r=ct(n.padding),c=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&c&&(t.save(),t.globalAlpha=o,this.drawBackground(a,t,s,n),po(t,n.textDirection),a.y+=r.top,this.drawTitle(a,t,n),this.drawBody(a,t,n),this.drawFooter(a,t,n),mo(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){let o=this._active,s=t.map(({datasetIndex:c,index:l})=>{let d=this.chart.getDatasetMeta(c);if(!d)throw new Error("Cannot find a dataset at index "+c);return{datasetIndex:c,element:d.data[l],index:l}}),a=!fn(o,s),r=this._positionChanged(s,n);(a||r)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,o=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;let s=this.options,a=this._active||[],r=this._getActiveElements(t,a,n,o),c=this._positionChanged(r,t),l=n||!fn(r,a)||c;return l&&(this._active=r,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),l}_getActiveElements(t,n,o,s){let a=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(c=>this.chart.data.datasets[c.datasetIndex]&&this.chart.getDatasetMeta(c.datasetIndex).controller.getParsed(c.index)!==void 0);let r=this.chart.getElementsAtEventForMode(t,a.mode,a,o);return a.reverse&&r.reverse(),r}_positionChanged(t,n){let{caretX:o,caretY:s,options:a}=this,r=Cn[a.position].call(this,t,n);return r!==!1&&(o!==r.x||s!==r.y)}}return e})(),Zh={id:"tooltip",_element:Qa,positioners:Cn,afterInit(e,i,t){t&&(e.tooltip=new Qa({chart:e,options:t}))},beforeUpdate(e,i,t){e.tooltip&&e.tooltip.initialize(t)},reset(e,i,t){e.tooltip&&e.tooltip.initialize(t)},afterDraw(e){let i=e.tooltip;if(i&&i._willRender()){let t={tooltip:i};if(e.notifyPlugins("beforeTooltipDraw",pt(gt({},t),{cancelable:!0}))===!1)return;i.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",t)}},afterEvent(e,i){if(e.tooltip){let t=i.replay;e.tooltip.handleEvent(i.event,t,i.inChartArea)&&(i.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,i)=>i.bodyFont.size,boxWidth:(e,i)=>i.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Dr},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Qh=Object.freeze({__proto__:null,Colors:hh,Decimation:ph,Filler:Rh,Legend:Nh,SubTitle:$h,Title:jh,Tooltip:Zh}),tf=(e,i,t,n)=>(typeof i=="string"?(t=e.push(i)-1,n.unshift({index:t,label:i})):isNaN(i)&&(t=null),t);function ef(e,i,t,n){let o=e.indexOf(i);if(o===-1)return tf(e,i,t,n);let s=e.lastIndexOf(i);return o!==s?t:o}var nf=(e,i)=>e===null?null:it(Math.round(e),0,i);function tr(e){let i=this.getLabels();return e>=0&&e<i.length?i[e]:e}var of=(()=>{class e extends Le{static id="category";static defaults={ticks:{callback:tr}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){let n=this._addedLabels;if(n.length){let o=this.getLabels();for(let{index:s,label:a}of n)o[s]===a&&o.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(B(t))return null;let o=this.getLabels();return n=isFinite(n)&&o[n]===t?n:ef(o,t,L(n,t),this._addedLabels),nf(n,o.length-1)}determineDataLimits(){let{minDefined:t,maxDefined:n}=this.getUserBounds(),{min:o,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(o=0),n||(s=this.getLabels().length-1)),this.min=o,this.max=s}buildTicks(){let t=this.min,n=this.max,o=this.options.offset,s=[],a=this.getLabels();a=t===0&&n===a.length-1?a:a.slice(t,n+1),this._valueRange=Math.max(a.length-(o?0:1),1),this._startValue=this.min-(o?.5:0);for(let r=t;r<=n;r++)s.push({value:r});return s}getLabelForValue(t){return tr.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){let n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}return e})();function sf(e,i){let t=[],{bounds:o,step:s,min:a,max:r,precision:c,count:l,maxTicks:d,maxDigits:h,includeBounds:f}=e,u=s||1,g=d-1,{min:p,max:m}=i,x=!B(a),y=!B(r),v=!B(l),O=(m-p)/(h+1),P=Ui((m-p)/g/u)*u,w,D,k,T;if(P<1e-14&&!x&&!y)return[{value:p},{value:m}];T=Math.ceil(m/P)-Math.floor(p/P),T>g&&(P=Ui(T*P/g/u)*u),B(c)||(w=Math.pow(10,c),P=Math.ceil(P*w)/w),o==="ticks"?(D=Math.floor(p/P)*P,k=Math.ceil(m/P)*P):(D=p,k=m),x&&y&&s&&Ws((r-a)/s,P/1e3)?(T=Math.round(Math.min((r-a)/P,d)),P=(r-a)/T,D=a,k=r):v?(D=x?a:D,k=y?r:k,T=l-1,P=(k-D)/T):(T=(k-D)/P,Ge(T,Math.round(T),P/1e3)?T=Math.round(T):T=Math.ceil(T));let E=Math.max(Gi(P),Gi(D));w=Math.pow(10,B(c)?E:c),D=Math.round(D*w)/w,k=Math.round(k*w)/w;let R=0;for(x&&(f&&D!==a?(t.push({value:a}),D<a&&R++,Ge(Math.round((D+R*P)*w)/w,a,er(a,O,e))&&R++):D<a&&R++);R<T;++R){let z=Math.round((D+R*P)*w)/w;if(y&&z>r)break;t.push({value:z})}return y&&f&&k!==r?t.length&&Ge(t[t.length-1].value,r,er(r,O,e))?t[t.length-1].value=r:t.push({value:r}):(!y||k===r)&&t.push({value:k}),t}function er(e,i,{horizontal:t,minRotation:n}){let o=Dt(n),s=(t?Math.sin(o):Math.cos(o))||.001,a=.75*i*(""+e).length;return Math.min(i/s,a)}var nn=class extends Le{constructor(i){super(i),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(i,t){return B(i)||(typeof i=="number"||i instanceof Number)&&!isFinite(+i)?null:+i}handleTickRangeOptions(){let{beginAtZero:i}=this.options,{minDefined:t,maxDefined:n}=this.getUserBounds(),{min:o,max:s}=this,a=c=>o=t?o:c,r=c=>s=n?s:c;if(i){let c=Tt(o),l=Tt(s);c<0&&l<0?r(0):c>0&&l>0&&a(0)}if(o===s){let c=s===0?1:Math.abs(s*.05);r(s+c),i||a(o-c)}this.min=o,this.max=s}getTickLimit(){let i=this.options.ticks,{maxTicksLimit:t,stepSize:n}=i,o;return n?(o=Math.ceil(this.max/n)-Math.floor(this.min/n)+1,o>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${o} ticks. Limiting to 1000.`),o=1e3)):(o=this.computeTickLimit(),t=t||11),t&&(o=Math.min(t,o)),o}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){let i=this.options,t=i.ticks,n=this.getTickLimit();n=Math.max(2,n);let o={maxTicks:n,bounds:i.bounds,min:i.min,max:i.max,precision:t.precision,step:t.stepSize,count:t.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:t.minRotation||0,includeBounds:t.includeBounds!==!1},s=this._range||this,a=sf(o,s);return i.bounds==="ticks"&&Xi(a,this,"value"),i.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){let i=this.ticks,t=this.min,n=this.max;if(super.configure(),this.options.offset&&i.length){let o=(n-t)/Math.max(i.length-1,1)/2;t-=o,n+=o}this._startValue=t,this._endValue=n,this._valueRange=n-t}getLabelForValue(i){return Je(i,this.chart.options.locale,this.options.ticks.format)}},qo=class extends nn{static id="linear";static defaults={ticks:{callback:un.formatters.numeric}};determineDataLimits(){let{min:i,max:t}=this.getMinMax(!0);this.min=tt(i)?i:0,this.max=tt(t)?t:1,this.handleTickRangeOptions()}computeTickLimit(){let i=this.isHorizontal(),t=i?this.width:this.height,n=Dt(this.options.ticks.minRotation),o=(i?Math.sin(n):Math.cos(n))||.001,s=this._resolveTickFontOptions(0);return Math.ceil(t/Math.min(40,s.lineHeight/o))}getPixelForValue(i){return i===null?NaN:this.getPixelForDecimal((i-this._startValue)/this._valueRange)}getValueForPixel(i){return this._startValue+this.getDecimalForPixel(i)*this._valueRange}},wn=e=>Math.floor(Vt(e)),Ee=(e,i)=>Math.pow(10,wn(e)+i);function nr(e){return e/Math.pow(10,wn(e))===1}function ir(e,i,t){let n=Math.pow(10,t),o=Math.floor(e/n);return Math.ceil(i/n)-o}function af(e,i){let t=i-e,n=wn(t);for(;ir(e,i,n)>10;)n++;for(;ir(e,i,n)<10;)n--;return Math.min(n,wn(e))}function rf(e,{min:i,max:t}){i=_t(e.min,i);let n=[],o=wn(i),s=af(i,t),a=s<0?Math.pow(10,Math.abs(s)):1,r=Math.pow(10,s),c=o>s?Math.pow(10,o):0,l=Math.round((i-c)*a)/a,d=Math.floor((i-c)/r/10)*r*10,h=Math.floor((l-d)/Math.pow(10,s)),f=_t(e.min,Math.round((c+d+h*Math.pow(10,s))*a)/a);for(;f<t;)n.push({value:f,major:nr(f),significand:h}),h>=10?h=h<15?15:20:h++,h>=20&&(s++,h=2,a=s>=0?1:a),f=Math.round((c+d+h*Math.pow(10,s))*a)/a;let u=_t(e.max,f);return n.push({value:u,major:nr(u),significand:h}),n}var Uo=class extends Le{static id="logarithmic";static defaults={ticks:{callback:un.formatters.logarithmic,major:{enabled:!0}}};constructor(i){super(i),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(i,t){let n=nn.prototype.parse.apply(this,[i,t]);if(n===0){this._zero=!0;return}return tt(n)&&n>0?n:null}determineDataLimits(){let{min:i,max:t}=this.getMinMax(!0);this.min=tt(i)?Math.max(0,i):null,this.max=tt(t)?Math.max(0,t):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!tt(this._userMin)&&(this.min=i===Ee(this.min,0)?Ee(this.min,-1):Ee(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){let{minDefined:i,maxDefined:t}=this.getUserBounds(),n=this.min,o=this.max,s=r=>n=i?n:r,a=r=>o=t?o:r;n===o&&(n<=0?(s(1),a(10)):(s(Ee(n,-1)),a(Ee(o,1)))),n<=0&&s(Ee(o,-1)),o<=0&&a(Ee(n,1)),this.min=n,this.max=o}buildTicks(){let i=this.options,t={min:this._userMin,max:this._userMax},n=rf(t,this);return i.bounds==="ticks"&&Xi(n,this,"value"),i.reverse?(n.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),n}getLabelForValue(i){return i===void 0?"0":Je(i,this.chart.options.locale,this.options.ticks.format)}configure(){let i=this.min;super.configure(),this._startValue=Vt(i),this._valueRange=Vt(this.max)-Vt(i)}getPixelForValue(i){return(i===void 0||i===0)&&(i=this.min),i===null||isNaN(i)?NaN:this.getPixelForDecimal(i===this.min?0:(Vt(i)-this._startValue)/this._valueRange)}getValueForPixel(i){let t=this.getDecimalForPixel(i);return Math.pow(10,this._startValue+t*this._valueRange)}};function Xo(e){let i=e.ticks;if(i.display&&e.display){let t=ct(i.backdropPadding);return L(i.font&&i.font.size,J.font.size)+t.height}return 0}function cf(e,i,t){return t=G(t)?t:[t],{w:Gs(e,i.string,t),h:t.length*i.lineHeight}}function or(e,i,t,n,o){return e===n||e===o?{start:i-t/2,end:i+t/2}:e<n||e>o?{start:i-t,end:i}:{start:i,end:i+t}}function lf(e){let i={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},t=Object.assign({},i),n=[],o=[],s=e._pointLabels.length,a=e.options.pointLabels,r=a.centerPointLabels?N/s:0;for(let c=0;c<s;c++){let l=a.setContext(e.getPointLabelContext(c));o[c]=l.padding;let d=e.getPointPosition(c,e.drawingArea+o[c],r),h=nt(l.font),f=cf(e.ctx,h,e._pointLabels[c]);n[c]=f;let u=at(e.getIndexAngle(c)+r),g=Math.round(si(u)),p=or(g,d.x,f.w,0,180),m=or(g,d.y,f.h,90,270);df(t,i,u,p,m)}e.setCenterPoint(i.l-t.l,t.r-i.r,i.t-t.t,t.b-i.b),e._pointLabelItems=uf(e,n,o)}function df(e,i,t,n,o){let s=Math.abs(Math.sin(t)),a=Math.abs(Math.cos(t)),r=0,c=0;n.start<i.l?(r=(i.l-n.start)/s,e.l=Math.min(e.l,i.l-r)):n.end>i.r&&(r=(n.end-i.r)/s,e.r=Math.max(e.r,i.r+r)),o.start<i.t?(c=(i.t-o.start)/a,e.t=Math.min(e.t,i.t-c)):o.end>i.b&&(c=(o.end-i.b)/a,e.b=Math.max(e.b,i.b+c))}function hf(e,i,t){let n=e.drawingArea,{extra:o,additionalAngle:s,padding:a,size:r}=t,c=e.getPointPosition(i,n+o+a,s),l=Math.round(si(at(c.angle+et))),d=mf(c.y,r.h,l),h=gf(l),f=pf(c.x,r.w,h);return{visible:!0,x:c.x,y:d,textAlign:h,left:f,top:d,right:f+r.w,bottom:d+r.h}}function ff(e,i){if(!i)return!0;let{left:t,top:n,right:o,bottom:s}=e;return!(Lt({x:t,y:n},i)||Lt({x:t,y:s},i)||Lt({x:o,y:n},i)||Lt({x:o,y:s},i))}function uf(e,i,t){let n=[],o=e._pointLabels.length,s=e.options,{centerPointLabels:a,display:r}=s.pointLabels,c={extra:Xo(s)/2,additionalAngle:a?N/o:0},l;for(let d=0;d<o;d++){c.padding=t[d],c.size=i[d];let h=hf(e,d,c);n.push(h),r==="auto"&&(h.visible=ff(h,l),h.visible&&(l=h))}return n}function gf(e){return e===0||e===180?"center":e<180?"left":"right"}function pf(e,i,t){return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function mf(e,i,t){return t===90||t===270?e-=i/2:(t>270||t<90)&&(e-=i),e}function _f(e,i,t){let{left:n,top:o,right:s,bottom:a}=t,{backdropColor:r}=i;if(!B(r)){let c=xe(i.borderRadius),l=ct(i.backdropPadding);e.fillStyle=r;let d=n-l.left,h=o-l.top,f=s-n+l.width,u=a-o+l.height;Object.values(c).some(g=>g!==0)?(e.beginPath(),Ze(e,{x:d,y:h,w:f,h:u,radius:c}),e.fill()):e.fillRect(d,h,f,u)}}function bf(e,i){let{ctx:t,options:{pointLabels:n}}=e;for(let o=i-1;o>=0;o--){let s=e._pointLabelItems[o];if(!s.visible)continue;let a=n.setContext(e.getPointLabelContext(o));_f(t,a,s);let r=nt(a.font),{x:c,y:l,textAlign:d}=s;be(t,e._pointLabels[o],c,l+r.lineHeight/2,r,{color:a.color,textAlign:d,textBaseline:"middle"})}}function Tr(e,i,t,n){let{ctx:o}=e;if(t)o.arc(e.xCenter,e.yCenter,i,0,K);else{let s=e.getPointPosition(0,i);o.moveTo(s.x,s.y);for(let a=1;a<n;a++)s=e.getPointPosition(a,i),o.lineTo(s.x,s.y)}}function xf(e,i,t,n,o){let s=e.ctx,a=i.circular,{color:r,lineWidth:c}=i;!a&&!n||!r||!c||t<0||(s.save(),s.strokeStyle=r,s.lineWidth=c,s.setLineDash(o.dash||[]),s.lineDashOffset=o.dashOffset,s.beginPath(),Tr(e,t,a,n),s.closePath(),s.stroke(),s.restore())}function yf(e,i,t){return $t(e,{label:t,index:i,type:"pointLabel"})}var Go=class extends nn{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:un.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(i){return i},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(i){super(i),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){let i=this._padding=ct(Xo(this.options)/2),t=this.width=this.maxWidth-i.width,n=this.height=this.maxHeight-i.height;this.xCenter=Math.floor(this.left+t/2+i.left),this.yCenter=Math.floor(this.top+n/2+i.top),this.drawingArea=Math.floor(Math.min(t,n)/2)}determineDataLimits(){let{min:i,max:t}=this.getMinMax(!1);this.min=tt(i)&&!isNaN(i)?i:0,this.max=tt(t)&&!isNaN(t)?t:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Xo(this.options))}generateTickLabels(i){nn.prototype.generateTickLabels.call(this,i),this._pointLabels=this.getLabels().map((t,n)=>{let o=U(this.options.pointLabels.callback,[t,n],this);return o||o===0?o:""}).filter((t,n)=>this.chart.getDataVisibility(n))}fit(){let i=this.options;i.display&&i.pointLabels.display?lf(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(i,t,n,o){this.xCenter+=Math.floor((i-t)/2),this.yCenter+=Math.floor((n-o)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(i,t,n,o))}getIndexAngle(i){let t=K/(this._pointLabels.length||1),n=this.options.startAngle||0;return at(i*t+Dt(n))}getDistanceFromCenterForValue(i){if(B(i))return NaN;let t=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-i)*t:(i-this.min)*t}getValueForDistanceFromCenter(i){if(B(i))return NaN;let t=i/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-t:this.min+t}getPointLabelContext(i){let t=this._pointLabels||[];if(i>=0&&i<t.length){let n=t[i];return yf(this.getContext(),i,n)}}getPointPosition(i,t,n=0){let o=this.getIndexAngle(i)-et+n;return{x:Math.cos(o)*t+this.xCenter,y:Math.sin(o)*t+this.yCenter,angle:o}}getPointPositionForValue(i,t){return this.getPointPosition(i,this.getDistanceFromCenterForValue(t))}getBasePosition(i){return this.getPointPositionForValue(i||0,this.getBaseValue())}getPointLabelPosition(i){let{left:t,top:n,right:o,bottom:s}=this._pointLabelItems[i];return{left:t,top:n,right:o,bottom:s}}drawBackground(){let{backgroundColor:i,grid:{circular:t}}=this.options;if(i){let n=this.ctx;n.save(),n.beginPath(),Tr(this,this.getDistanceFromCenterForValue(this._endValue),t,this._pointLabels.length),n.closePath(),n.fillStyle=i,n.fill(),n.restore()}}drawGrid(){let i=this.ctx,t=this.options,{angleLines:n,grid:o,border:s}=t,a=this._pointLabels.length,r,c,l;if(t.pointLabels.display&&bf(this,a),o.display&&this.ticks.forEach((d,h)=>{if(h!==0||h===0&&this.min<0){c=this.getDistanceFromCenterForValue(d.value);let f=this.getContext(h),u=o.setContext(f),g=s.setContext(f);xf(this,u,c,a,g)}}),n.display){for(i.save(),r=a-1;r>=0;r--){let d=n.setContext(this.getPointLabelContext(r)),{color:h,lineWidth:f}=d;!f||!h||(i.lineWidth=f,i.strokeStyle=h,i.setLineDash(d.borderDash),i.lineDashOffset=d.borderDashOffset,c=this.getDistanceFromCenterForValue(t.reverse?this.min:this.max),l=this.getPointPosition(r,c),i.beginPath(),i.moveTo(this.xCenter,this.yCenter),i.lineTo(l.x,l.y),i.stroke())}i.restore()}}drawBorder(){}drawLabels(){let i=this.ctx,t=this.options,n=t.ticks;if(!n.display)return;let o=this.getIndexAngle(0),s,a;i.save(),i.translate(this.xCenter,this.yCenter),i.rotate(o),i.textAlign="center",i.textBaseline="middle",this.ticks.forEach((r,c)=>{if(c===0&&this.min>=0&&!t.reverse)return;let l=n.setContext(this.getContext(c)),d=nt(l.font);if(s=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){i.font=d.string,a=i.measureText(r.label).width,i.fillStyle=l.backdropColor;let h=ct(l.backdropPadding);i.fillRect(-a/2-h.left,-s-d.size/2-h.top,a+h.width,d.size+h.height)}be(i,r.label,0,-s,d,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),i.restore()}drawTitle(){}},Ii={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},xt=Object.keys(Ii);function sr(e,i){return e-i}function ar(e,i){if(B(i))return null;let t=e._adapter,{parser:n,round:o,isoWeekday:s}=e._parseOpts,a=i;return typeof n=="function"&&(a=n(a)),tt(a)||(a=typeof n=="string"?t.parse(a,n):t.parse(a)),a===null?null:(o&&(a=o==="week"&&(Te(s)||s===!0)?t.startOf(a,"isoWeek",s):t.startOf(a,o)),+a)}function rr(e,i,t,n){let o=xt.length;for(let s=xt.indexOf(e);s<o-1;++s){let a=Ii[xt[s]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((t-i)/(r*a.size))<=n)return xt[s]}return xt[o-1]}function Mf(e,i,t,n,o){for(let s=xt.length-1;s>=xt.indexOf(t);s--){let a=xt[s];if(Ii[a].common&&e._adapter.diff(o,n,a)>=i-1)return a}return xt[t?xt.indexOf(t):0]}function Cf(e){for(let i=xt.indexOf(e)+1,t=xt.length;i<t;++i)if(Ii[xt[i]].common)return xt[i]}function cr(e,i,t){if(!t)e[i]=!0;else if(t.length){let{lo:n,hi:o}=ai(t,i),s=t[n]>=i?t[n]:t[o];e[s]=!0}}function Pf(e,i,t,n){let o=e._adapter,s=+o.startOf(i[0].value,n),a=i[i.length-1].value,r,c;for(r=s;r<=a;r=+o.add(r,1,n))c=t[r],c>=0&&(i[c].major=!0);return i}function lr(e,i,t){let n=[],o={},s=i.length,a,r;for(a=0;a<s;++a)r=i[a],o[r]=a,n.push({value:r,major:!1});return s===0||!t?n:Pf(e,n,o,t)}var Ko=(()=>{class e extends Le{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){let o=t.time||(t.time={}),s=this._adapter=new El._date(t.adapters.date);s.init(n),Ue(o.displayFormats,s.formats()),this._parseOpts={parser:o.parser,round:o.round,isoWeekday:o.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:ar(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){let t=this.options,n=this._adapter,o=t.time.unit||"day",{min:s,max:a,minDefined:r,maxDefined:c}=this.getUserBounds();function l(d){!r&&!isNaN(d.min)&&(s=Math.min(s,d.min)),!c&&!isNaN(d.max)&&(a=Math.max(a,d.max))}(!r||!c)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=tt(s)&&!isNaN(s)?s:+n.startOf(Date.now(),o),a=tt(a)&&!isNaN(a)?a:+n.endOf(Date.now(),o)+1,this.min=Math.min(s,a-1),this.max=Math.max(s+1,a)}_getLabelBounds(){let t=this.getLabelTimestamps(),n=Number.POSITIVE_INFINITY,o=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],o=t[t.length-1]),{min:n,max:o}}buildTicks(){let t=this.options,n=t.time,o=t.ticks,s=o.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);let a=this.min,r=this.max,c=js(s,a,r);return this._unit=n.unit||(o.autoSkip?rr(n.minUnit,this.min,this.max,this._getLabelCapacity(a)):Mf(this,c.length,n.minUnit,this.min,this.max)),this._majorUnit=!o.major.enabled||this._unit==="year"?void 0:Cf(this._unit),this.initOffsets(s),t.reverse&&c.reverse(),lr(this,c,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,o=0,s,a;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,a=this.getDecimalForValue(t[t.length-1]),t.length===1?o=a:o=(a-this.getDecimalForValue(t[t.length-2]))/2);let r=t.length<3?.5:.25;n=it(n,0,r),o=it(o,0,r),this._offsets={start:n,end:o,factor:1/(n+1+o)}}_generate(){let t=this._adapter,n=this.min,o=this.max,s=this.options,a=s.time,r=a.unit||rr(a.minUnit,n,o,this._getLabelCapacity(n)),c=L(s.ticks.stepSize,1),l=r==="week"?a.isoWeekday:!1,d=Te(l)||l===!0,h={},f=n,u,g;if(d&&(f=+t.startOf(f,"isoWeek",l)),f=+t.startOf(f,d?"day":r),t.diff(o,n,r)>1e5*c)throw new Error(n+" and "+o+" are too far apart with stepSize of "+c+" "+r);let p=s.ticks.source==="data"&&this.getDataTimestamps();for(u=f,g=0;u<o;u=+t.add(u,c,r),g++)cr(h,u,p);return(u===o||s.bounds==="ticks"||g===1)&&cr(h,u,p),Object.keys(h).sort(sr).map(m=>+m)}getLabelForValue(t){let n=this._adapter,o=this.options.time;return o.tooltipFormat?n.format(t,o.tooltipFormat):n.format(t,o.displayFormats.datetime)}format(t,n){let s=this.options.time.displayFormats,a=this._unit,r=n||s[a];return this._adapter.format(t,r)}_tickFormatFunction(t,n,o,s){let a=this.options,r=a.ticks.callback;if(r)return U(r,[t,n,o],this);let c=a.time.displayFormats,l=this._unit,d=this._majorUnit,h=l&&c[l],f=d&&c[d],u=o[n],g=d&&f&&u&&u.major;return this._adapter.format(t,s||(g?f:h))}generateTickLabels(t){let n,o,s;for(n=0,o=t.length;n<o;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){let n=this._offsets,o=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+o)*n.factor)}getValueForPixel(t){let n=this._offsets,o=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+o*(this.max-this.min)}_getLabelSize(t){let n=this.options.ticks,o=this.ctx.measureText(t).width,s=Dt(this.isHorizontal()?n.maxRotation:n.minRotation),a=Math.cos(s),r=Math.sin(s),c=this._resolveTickFontOptions(0).size;return{w:o*a+c*r,h:o*r+c*a}}_getLabelCapacity(t){let n=this.options.time,o=n.displayFormats,s=o[n.unit]||o.millisecond,a=this._tickFormatFunction(t,0,lr(this,[t],this._majorUnit),s),r=this._getLabelSize(a),c=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return c>0?c:1}getDataTimestamps(){let t=this._cache.data||[],n,o;if(t.length)return t;let s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,o=s.length;n<o;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){let t=this._cache.labels||[],n,o;if(t.length)return t;let s=this.getLabels();for(n=0,o=s.length;n<o;++n)t.push(ar(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Zi(t.sort(sr))}}return e})();function yi(e,i,t){let n=0,o=e.length-1,s,a,r,c;t?(i>=e[n].pos&&i<=e[o].pos&&({lo:n,hi:o}=Et(e,"pos",i)),{pos:s,time:r}=e[n],{pos:a,time:c}=e[o]):(i>=e[n].time&&i<=e[o].time&&({lo:n,hi:o}=Et(e,"time",i)),{time:s,pos:r}=e[n],{time:a,pos:c}=e[o]);let l=a-s;return l?r+(c-r)*(i-s)/l:r}var Jo=class extends Ko{static id="timeseries";static defaults=Ko.defaults;constructor(i){super(i),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){let i=this._getTimestampsForTable(),t=this._table=this.buildLookupTable(i);this._minPos=yi(t,this.min),this._tableRange=yi(t,this.max)-this._minPos,super.initOffsets(i)}buildLookupTable(i){let{min:t,max:n}=this,o=[],s=[],a,r,c,l,d;for(a=0,r=i.length;a<r;++a)l=i[a],l>=t&&l<=n&&o.push(l);if(o.length<2)return[{time:t,pos:0},{time:n,pos:1}];for(a=0,r=o.length;a<r;++a)d=o[a+1],c=o[a-1],l=o[a],Math.round((d+c)/2)!==l&&s.push({time:l,pos:a/(r-1)});return s}_generate(){let i=this.min,t=this.max,n=super.getDataTimestamps();return(!n.includes(i)||!n.length)&&n.splice(0,0,i),(!n.includes(t)||n.length===1)&&n.push(t),n.sort((o,s)=>o-s)}_getTimestampsForTable(){let i=this._cache.all||[];if(i.length)return i;let t=this.getDataTimestamps(),n=this.getLabelTimestamps();return t.length&&n.length?i=this.normalize(t.concat(n)):i=t.length?t:n,i=this._cache.all=i,i}getDecimalForValue(i){return(yi(this._table,i)-this._minPos)/this._tableRange}getValueForPixel(i){let t=this._offsets,n=this.getDecimalForPixel(i)/t.factor-t.end;return yi(this._table,n*this._tableRange+this._minPos,!0)}},vf=Object.freeze({__proto__:null,CategoryScale:of,LinearScale:qo,LogarithmicScale:Uo,RadialLinearScale:Go,TimeScale:Ko,TimeSeriesScale:Jo}),Ar=[Il,oh,Qh,vf];var kn=(()=>{let i=class i{transform(n){if(n==null||n==="")return"00:00";let o=parseFloat(n);if(isNaN(o))return n;let s=Math.floor(o),a=Math.round((o-s)*60);return`${s.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`}};i.\u0275fac=function(o){return new(o||i)},i.\u0275pipe=is({name:"timeFormat",type:i,pure:!0});let e=i;return e})();var Df=(e,i,t)=>({"weekoff-row":e,"leave-row":i,"penalty-row":t});function Tf(e,i){if(e&1){let t=Mt();_(0,"button",7),Y("click",function(){let o=ft(t).$implicit,s=I();return ut(s.filterByPeriod(o))}),C(1),b()}if(e&2){let t=i.$implicit,n=I();Ct("active",n.selectedPeriod===t),M(),q(" ",t," ")}}function Af(e,i){e&1&&(Gt(0),_(1,"span",25),C(2,"LEAVE"),b(),Kt())}function If(e,i){e&1&&(Gt(0),_(1,"span",26),C(2,"W-OFF"),b(),Kt())}function Ef(e,i){e&1&&(Gt(0),_(1,"span",27),C(2,"NO ATTENDANCE LOGS"),b(),Kt())}function Lf(e,i){e&1&&(_(0,"p",30),C(1,"Full day week off "),b())}function Rf(e,i){if(e&1&&(_(0,"p",30),C(1),b()),e&2){let t=I(2).$implicit;M(),H(t.leaveType)}}function Ff(e,i){if(e&1&&(_(0,"ion-col",28),F(1,Lf,2,0,"p",29)(2,Rf,2,1,"p",29),b()),e&2){let t=I().$implicit;M(),S("ngIf",t.status==="weekend"),M(),S("ngIf",t.status==="on-leave")}}function zf(e,i){if(e&1&&A(0,"div",36),e&2){let t=i.$implicit;ze("width",t.widthPct,"%"),Ct("seg-work",t.type==="work")("seg-break",t.type==="break")}}function Bf(e,i){if(e&1&&(Gt(0),F(1,zf,1,6,"div",35),Kt()),e&2){let t=I(2).$implicit,n=I();M(),S("ngForOf",n.getAttendanceSegments(t))}}function Hf(e,i){e&1&&A(0,"div",37)}function Wf(e,i){e&1&&(_(0,"div",38),A(1,"span",39),_(2,"span",40),C(3,"Work"),b(),A(4,"span",41),_(5,"span",40),C(6,"Break"),b()())}function Nf(e,i){if(e&1&&(_(0,"ion-col",15)(1,"div",31)(2,"div",32),F(3,Bf,2,1,"ng-container",33)(4,Hf,1,0,"ng-template",null,0,Be),b(),F(6,Wf,7,0,"div",34),b()()),e&2){let t=Fe(5),n=I().$implicit,o=I();M(2),Ct("empty-bar",o.getAttendanceSegments(n).length===0),M(),S("ngIf",o.getAttendanceSegments(n).length>0)("ngIfElse",t),M(3),S("ngIf",o.getBreakHours(n))}}function Vf(e,i){if(e&1&&(_(0,"ion-col",14)(1,"div",42),A(2,"ion-icon",43),_(3,"span"),C(4),b()()()),e&2){let t=I().$implicit,n=I();M(2),S("name",n.islogToday(t.attendance_date)?"ellipse-outline":"ellipse"),M(2),H(n.formatHours(t.total_work_hours,t.attendance_date))}}function jf(e,i){if(e&1&&(_(0,"ion-col",14)(1,"div",42),A(2,"ion-icon",44),_(3,"span"),C(4),b()()()),e&2){let t=I().$implicit,n=I();M(2),S("name",n.islogToday(t.attendance_date)?"ellipse-outline":"ellipse"),M(2),H(n.formatHours(t.gross_hours,t.attendance_date))}}function $f(e,i){e&1&&A(0,"ion-icon",56)}function Yf(e,i){e&1&&A(0,"ion-icon",57)}function qf(e,i){e&1&&A(0,"ion-icon",58)}function Uf(e,i){e&1&&A(0,"ion-icon",59)}function Xf(e,i){e&1&&A(0,"ion-icon",60)}function Gf(e,i){if(e&1&&(_(0,"span",61),C(1),b()),e&2){let t=I(2).$implicit,n=I();M(),q(" ",n.getLateDuration(t)," ")}}function Kf(e,i){if(e&1){let t=Mt();_(0,"ion-button",62),Y("click",function(o){ft(t);let s=I(2).$implicit;return I().openRegularizeModal(s),ut(o.stopPropagation())}),A(1,"ion-icon",63),b()}}function Jf(e,i){if(e&1&&(_(0,"ion-col",14)(1,"div",45)(2,"div",42),Gt(3,46),F(4,$f,1,0,"ion-icon",47)(5,Yf,1,0,"ion-icon",48)(6,qf,1,0,"ion-icon",49)(7,Uf,1,0,"ion-icon",50)(8,Xf,1,0,"ion-icon",51),Kt(),_(9,"div",52)(10,"span",53),C(11),b(),F(12,Gf,2,1,"span",54),b()(),F(13,Kf,2,0,"ion-button",55),b()()),e&2){let t=I().$implicit,n=I();M(3),S("ngSwitch",n.getArrivalStatus(t)),M(),S("ngSwitchCase","Late Arrival"),M(),S("ngSwitchCase","regularlise"),M(),S("ngSwitchCase","On Time"),M(),S("ngSwitchCase","Penalty"),M(3),ze("color",n.getArrivalStatus(t)==="Late Arrival"?"#D97706":n.getArrivalStatus(t)==="regularlise"?"#2dd4bf":"inherit"),M(),q(" ",n.getArrivalStatus(t)," "),M(),S("ngIf",n.getLateDuration(t)),M(),S("ngIf",n.isHRView&&(t.status==="penalty"||t.status==="absent"))}}function Zf(e,i){if(e&1){let t=Mt();_(0,"ion-col",16)(1,"ion-button",64),Y("click",function(){ft(t);let o=I().$implicit,s=I();return ut(s.openLogDetails(o))}),A(2,"img",65),b()()}}function Qf(e,i){if(e&1&&(_(0,"ion-row",19)(1,"ion-col",14),C(2),Q(3,"date"),F(4,Af,3,0,"ng-container",20)(5,If,3,0,"ng-container",20)(6,Ef,3,0,"ng-container",20),b(),F(7,Ff,3,2,"ion-col",21)(8,Nf,7,5,"ion-col",22)(9,Vf,5,2,"ion-col",23)(10,jf,5,2,"ion-col",23)(11,Jf,14,10,"ion-col",23)(12,Zf,3,0,"ion-col",24),b()),e&2){let t=i.$implicit;S("ngClass",Rn(14,Df,t.status==="weekend",t.status==="on-leave",t.status==="penalty")),M(2),q(" ",lt(3,11,t.attendance_date,"EEE, dd MMM")," "),M(2),S("ngIf",t.status==="on-leave"),M(),S("ngIf",t.status==="weekend"),M(),S("ngIf",t.status==="penalty"),M(),S("ngIf",(t.status=="weekend"||t.status=="on-leave")&&t.noLogs),M(),S("ngIf",!((t.status==="weekend"||t.status==="on-leave")&&t.noLogs)),M(),S("ngIf",!((t.status==="weekend"||t.status==="on-leave")&&t.noLogs)),M(),S("ngIf",!((t.status==="weekend"||t.status==="on-leave")&&t.noLogs)),M(),S("ngIf",!((t.status==="weekend"||t.status==="on-leave")&&t.noLogs)),M(),S("ngIf",!((t.status==="weekend"||t.status==="on-leave")&&t.noLogs))}}function tu(e,i){if(e&1&&(_(0,"div",93),A(1,"ion-icon",94),_(2,"span"),C(3),b()()),e&2){let t=I().$implicit;M(3),H(t.location)}}function eu(e,i){if(e&1&&(_(0,"div",95),C(1),b()),e&2){let t=I().$implicit;M(),q(' "',t.notes,'" ')}}function nu(e,i){e&1&&(_(0,"div",93),A(1,"ion-icon",96),_(2,"span"),C(3,"Verified Active Log"),b()())}function iu(e,i){e&1&&(_(0,"div",97),C(1," Next break segment... "),b())}function ou(e,i){if(e&1&&(_(0,"div",81),A(1,"div",82),_(2,"div",83)(3,"div",84)(4,"div",85)(5,"span",86),C(6),Q(7,"date"),b(),_(8,"span",87),C(9),b()(),_(10,"span",88),C(11),b()(),_(12,"div",89),F(13,tu,4,1,"div",90)(14,eu,2,1,"div",91)(15,nu,4,0,"div",90),b(),F(16,iu,2,0,"div",92),b()()),e&2){let t=i.$implicit,n=i.last;M(),Ct("active",t.type==="IN"),M(5),H(lt(7,10,t.time,"h:mm a")),M(2),S("ngClass",t.type.toLowerCase()),M(),H(t.type),M(2),H(t.mode),M(2),S("ngIf",t.location),M(),S("ngIf",t.notes),M(),S("ngIf",!t.location&&!t.notes),M(),S("ngIf",t.type==="OUT"&&!n)}}function su(e,i){if(e&1&&(_(0,"div")(1,"div",73)(2,"div",74)(3,"div",75)(4,"span",76),C(5,"EFFECTIVE"),b(),_(6,"span",77),C(7),b()(),_(8,"div",78)(9,"span",76),C(10,"GROSS TIME"),b(),_(11,"span",77),C(12),b()()()(),_(13,"div",79),F(14,ou,17,13,"div",80),b()()),e&2){let t=I(3);M(7),H(t.formatHours(t.selectedLog.total_work_hours,t.selectedLog.attendance_date)),M(5),H(t.formatHours(t.selectedLog.gross_hours,t.selectedLog.attendance_date)),M(2),S("ngForOf",t.selectedLog.timeline)}}function au(e,i){e&1&&(_(0,"div",98),A(1,"ion-icon",99),_(2,"p",100),C(3,"No activity logs found for this date."),b()())}function ru(e,i){if(e&1&&(_(0,"div",72),F(1,su,15,3,"div",33)(2,au,4,0,"ng-template",null,2,Be),b()),e&2){let t=Fe(3),n=I(2);M(),S("ngIf",n.selectedLog==null||n.selectedLog.timeline==null?null:n.selectedLog.timeline.length)("ngIfElse",t)}}function cu(e,i){e&1&&(_(0,"div",101),A(1,"ion-spinner",102),_(2,"p",103),C(3,"Retrieving logs..."),b()())}function lu(e,i){if(e&1){let t=Mt();_(0,"ion-header",66)(1,"ion-toolbar")(2,"ion-title"),C(3,"Daily Activity Log"),b(),_(4,"ion-buttons",67)(5,"ion-button",68),Y("click",function(){ft(t);let o=I();return ut(o.closeSlider())}),A(6,"ion-icon",69),b()(),_(7,"p",70),C(8),Q(9,"date"),b()()(),_(10,"ion-content"),F(11,ru,4,2,"div",71)(12,cu,4,0,"ng-template",null,1,Be),b()}if(e&2){let t=Fe(13),n=I();M(8),q(" ",lt(9,3,n.selectedLog==null?null:n.selectedLog.attendance_date,"fullDate")," "),M(3),S("ngIf",n.selectedLog==null?null:n.selectedLog.prepared)("ngIfElse",t)}}var Ir=(()=>{let i=class i{ngOnChanges(n){n.refreshTrigger&&!n.refreshTrigger.firstChange&&this.reloadAttendance()}constructor(n,o,s,a,r,c,l){this.attendanceService=n,this.attendanceApi=o,this.leaveService=s,this.employeeService=a,this.adminService=r,this.alertCtrl=c,this.toastCtrl=l,this.employeeId=null,this.isHRView=!1,this.monthButtons=[],this.showSlider=!1,this.selectedLog=null,this.currentYear=new Date().getFullYear(),this.currentMonth=new Date().getMonth()+1,this.currentMonthreport=[],this.startDate=`${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,"0")}-01`,this.endDate=this.formatDateOnly(new Date(new Date().getFullYear(),new Date().getMonth()+1,0)),this.selectedPeriod="30DAYS",this.shiftPolicy=null,this.todayPunches=[],this.destroy$=new An,this.reloadInProgress=!1,this.leaveDaysMap=new Map,this.employeeProfile=null,this.weeklyOffPolicy=null,this.missingLogConfigs=[],this.initializeMonthButtons()}initializeMonthButtons(){let n=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],s=new Date().getMonth();this.monthButtons=[];for(let a=1;a<=6;a++){let r=s-a;r<0&&(r+=12),this.monthButtons.push(n[r])}}resetState(){if(this.currentMonthreport=[],this.todayPunches=[],this.selectedLog=null,this.showSlider=!1,!this.startDate||!this.endDate){let n=new Date;this.currentMonth=n.getMonth()+1,this.currentYear=n.getFullYear(),this.startDate=`${this.currentYear}-${String(this.currentMonth).padStart(2,"0")}-01`,this.endDate=this.formatDateOnly(new Date(this.currentYear,this.currentMonth,0))}}ngOnInit(){this.reloadAttendance()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}getAllDatesBetween(n,o){let s=[],[a,r,c]=n.split("-").map(Number),l=new Date(a,r-1,c),d=new Date;d.setHours(0,0,0,0);let[h,f,u]=o.split("-").map(Number),g=new Date(h,f-1,u),p=g>d?d:g;for(let m=new Date(l);m<=p;m.setDate(m.getDate()+1))s.push(this.formatDateOnly(new Date(m)));return s}formatDateOnly(n){let o=new Date(n);return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}reloadAttendance(){if(this.reloadInProgress)return;this.reloadInProgress=!0,this.resetState();let n=this.employeeId?this.employeeService.getEmployeeById(this.employeeId).pipe(Xt(()=>It(null))):this.employeeService.getMyProfile().pipe(Xt(()=>It(null))),o=this.adminService.getShiftPolicies().pipe(Xt(()=>It([]))),s=this.adminService.getWeeklyOffPolicies().pipe(Xt(()=>It([]))),a=this.employeeId?It([]):this.leaveService.getMyLeaves(this.currentYear).pipe(Xt(()=>It([]))),r=this.employeeId?It({punches:[]}):this.attendanceApi.getTodayAttendance().pipe(Xt(()=>It({punches:[]}))),c=this.adminService.getMissingLogTimes().pipe(Xt(()=>It([])));ts({profile:n,shiftPolicies:o,weekOffPolicies:s,leaves:a,today:r,missingLogs:c}).pipe(es(this.destroy$)).subscribe({next:l=>{this.employeeProfile=l.profile;let d=l.profile?.weekly_off_policy_id||l.profile?.WeeklyOffPolicyId,h=l.profile?.shift_policy_id||l.profile?.ShiftPolicyId,f=Array.isArray(l.weekOffPolicies)?l.weekOffPolicies:l.weekOffPolicies?.data||[];this.weeklyOffPolicy=(f||[]).find(p=>p.id===d)||null;let u=Array.isArray(l.shiftPolicies)?l.shiftPolicies:l.shiftPolicies?.data||[];this.shiftPolicy=(u||[]).find(p=>p.id===h)||null,this.todayPunches=l.today?.punches||[],this.missingLogConfigs=l.missingLogs||[];let g=Array.isArray(l.leaves)?l.leaves:l.leaves.data||l.leaves.leaves||[];this.processLeavesIntoMap(g),this.loadMonthlyReport(),this.reloadInProgress=!1},error:()=>{this.loadMonthlyReport(),this.reloadInProgress=!1}})}processLeavesIntoMap(n){this.leaveDaysMap=new Map,n.filter(s=>(s.status||"").toUpperCase()==="APPROVED").forEach(s=>{let a=s.type_name||s.type_code||s.leave_type||"Leave",r=s.start_date||s.from_date,c=s.end_date||s.to_date||r;if(!r)return;let l=new Date(r),d=new Date(c||r),h=new Date(l.getFullYear(),l.getMonth(),l.getDate()),f=new Date(d.getFullYear(),d.getMonth(),d.getDate());for(;h<=f;)this.leaveDaysMap.set(this.formatDateOnly(h),a),h.setDate(h.getDate()+1)})}loadMonthlyReport(){(this.employeeId?this.attendanceApi.getEmployeeReport(this.employeeId,{startDate:this.startDate,endDate:this.endDate,month:this.currentMonth,year:this.currentYear}):this.attendanceApi.getMonthlyReport({startDate:this.startDate,endDate:this.endDate,month:this.currentMonth,year:this.currentYear})).subscribe({next:o=>{let s=o?.attendance||[],a=new Map;s.forEach(l=>{a.set(this.formatDateOnly(l.attendance_date),l)});let r=this.getAllDatesBetween(this.startDate,this.endDate),c=[];this.weeklyOffPolicy&&(Number(this.weeklyOffPolicy.sunday_off)===1&&c.push(0),Number(this.weeklyOffPolicy.monday_off)===1&&c.push(1),Number(this.weeklyOffPolicy.tuesday_off)===1&&c.push(2),Number(this.weeklyOffPolicy.wednesday_off)===1&&c.push(3),Number(this.weeklyOffPolicy.thursday_off)===1&&c.push(4),Number(this.weeklyOffPolicy.friday_off)===1&&c.push(5),Number(this.weeklyOffPolicy.saturday_off)===1&&c.push(6)),this.currentMonthreport=r.map(l=>{let d=a.get(l),h=new Date(l).getDay(),f=this.leaveDaysMap.get(l),u=c.includes(h);if(f)return pt(gt({},d||{}),{attendance_date:l,status:"on-leave",leaveType:f,noLogs:!d});if(u)return pt(gt({},d||{}),{attendance_date:l,status:"weekend",leaveType:"Full day week off",noLogs:!d});if(d){let E=pt(gt({},d),{noLogs:!1});if(this.islogToday(l)&&this.todayPunches&&this.todayPunches.length>0){let z=this.todayPunches[this.todayPunches.length-1];if(z.punch_type==="in"){let ht=new Date(z.punch_time).getTime(),j=new Date().getTime(),X=(j-ht)/(1e3*60*60),Z=parseFloat(E.total_work_hours||0);Z+=X,E.total_work_hours=Z.toFixed(2);let yt=this.todayPunches[0],st=new Date(yt.punch_time).getTime(),Ut=(j-st)/(1e3*60*60);E.gross_hours=Ut.toFixed(2)}}return E}let g="absent",p=new Date,m=new Date(l),x=this.shiftPolicy?.start_time||"09:00:00",[y,v,O]=x.split(":").map(Number),P=new Date(m);P.setHours(y,v,O||0,0);let w=this.employeeProfile?.leave_plan_id||this.employeeProfile?.LeavePlanId,D=this.missingLogConfigs.find(E=>E.leave_plan_id===w),k=D?D.threshold_hours:24,T=new Date(P);return T.setHours(T.getHours()+k),p>T?g="penalty":p.getFullYear()===m.getFullYear()&&p.getMonth()===m.getMonth()&&p.getDate()===m.getDate()&&(g="not-in-yet"),{attendance_date:l,total_work_hours:null,gross_hours:null,status:g,records:[],noLogs:!0}}),this.currentMonthreport.reverse(),this.attendanceService.setMonthlyReport(this.currentMonthreport)},error:()=>{this.currentMonthreport=[]}})}filterByPeriod(n){this.selectedPeriod=n;let o=new Date;if(n==="30DAYS"){let s=new Date;s.setDate(o.getDate()-30),this.startDate=this.formatDateOnly(s),this.endDate=this.formatDateOnly(o)}else{let a=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"].indexOf(n);if(a!==-1){let r=o.getFullYear();a>o.getMonth()&&(r-=1),this.startDate=`${r}-${String(a+1).padStart(2,"0")}-01`,this.endDate=this.formatDateOnly(new Date(r,a+1,0)),this.currentMonth=a+1,this.currentYear=r}}this.loadMonthlyReport()}getSelectedPeriodLabel(){return this.selectedPeriod==="30DAYS"?"Last 30 Days":`${{JAN:"January",FEB:"February",MAR:"March",APR:"April",MAY:"May",JUN:"June",JUL:"July",AUG:"August",SEP:"September",OCT:"October",NOV:"November",DEC:"December"}[this.selectedPeriod]||this.selectedPeriod} ${this.currentYear}`}openLogDetails(n){let o=new Date().toDateString(),s=new Date(n.attendance_date).toDateString();o===s&&this.todayPunches.length?(this.selectedLog=pt(gt({},n),{records:this.mapPunches(this.todayPunches),prepared:!1}),this.processSelectedLogRecords()):(this.selectedLog=pt(gt({},n),{prepared:!1}),this.loadLogDetails(n)),this.showSlider=!0}closeSlider(){this.showSlider=!1,this.selectedLog=null}loadLogDetails(n){if(!n?.attendance_date)return;let o=this.formatDateOnly(n.attendance_date);this.attendanceApi.getAttendanceDetailsByDate(o,this.employeeId||void 0).subscribe({next:s=>{this.selectedLog=pt(gt({},n),{records:this.mapPunches(s?.punches||[]),prepared:!1}),this.processSelectedLogRecords()},error:()=>{this.selectedLog=pt(gt({},n),{records:[],prepared:!0,officeRecords:[],wfhRecords:[],remoteRecords:[]})}})}processSelectedLogRecords(){if(!this.selectedLog||!this.selectedLog.records)return;let n=this.selectedLog.records;this.selectedLog.officeRecords=n.filter(s=>{let a=s.location?.toLowerCase()||"";return s.work_mode==="Office"||a.includes("office")||a.includes("mumbai")}).slice().reverse(),this.selectedLog.wfhRecords=n.filter(s=>s.work_mode==="WFH"||s.location?.toLowerCase().includes("home")).slice().reverse(),this.selectedLog.remoteRecords=n.filter(s=>s.work_mode==="Remote").map(s=>pt(gt({},s),{pendingApproval:s.approved!==!0})).slice().reverse();let o=[];n.forEach(s=>{let a=s.location;a&&a.toLowerCase().includes("mumbai")?a=this.employeeProfile?.location_name||a:s.work_mode==="Office"&&!a&&(a=this.employeeProfile?.location_name);let r=s.notes,c=r?.toLowerCase().trim();(c==="morning shift"||c==="office clock-in")&&(r=this.shiftPolicy?.name||r),s.check_in&&o.push({type:"IN",time:s.check_in,mode:s.work_mode||"Office",location:a,notes:r,icon:"log-in-outline"}),s.check_out&&o.push({type:"OUT",time:s.check_out,mode:s.work_mode||"Office",location:a,notes:r,icon:"log-out-outline"})}),this.selectedLog.timeline=o.sort((s,a)=>new Date(s.time).getTime()-new Date(a.time).getTime()),this.selectedLog.prepared=!0}mapPunches(n){if(!Array.isArray(n))return[];let o=[],s=null;return n.forEach(a=>{let r=a.work_mode==="Remote"||a.location?.toLowerCase().includes("remote")||a.notes?.toLowerCase().includes("remote");a.punch_type==="in"&&(s={check_in:a.punch_time,check_out:null,work_mode:r?"Remote":a.work_mode||"Office",location:a.location,notes:a.notes,approved:a.approved},o.push(s)),a.punch_type==="out"&&s&&(s.check_out=a.punch_time,s=null)}),o}getOfficeRecords(n){return n.filter(o=>{let s=o.location?.toLowerCase()||"";return o.work_mode==="Office"||s.includes("office")||s.includes("mumbai")})}getWFHRecords(n){return n.filter(o=>o.work_mode==="WFH"||o.location?.toLowerCase().includes("home"))}getRemoteRecords(n){return n.filter(o=>o.work_mode==="Remote").map(o=>pt(gt({},o),{pendingApproval:o.approved!==!0}))}getArrivalStatus(n){if(!n?.status)return"Unknown";if(n.notes&&n.notes.includes("[REGULARIZED"))return"regularlise";let o={present:"On Time",absent:"Absent","half-day":"Half Day",late:"Late Arrival","on-leave":"On Leave","not-in-yet":"NOT-IN-YET",penalty:"No Attendance Logs"};if(n.status==="present"&&n.first_check_in&&this.shiftPolicy?.start_time)try{let s=new Date(n.first_check_in),[a,r,c]=this.shiftPolicy.start_time.split(":").map(Number),l=new Date(s);if(l.setHours(a,r+15,c||0,0),s>l)return"Late Arrival"}catch{}return o[n.status]||"Unknown"}formatHours(n,o){if(n==null||n==="-")return"-";let s=parseFloat(n);if(isNaN(s))return"-";let a=Math.floor(s),r=Math.round((s-a)*60),c=o&&this.islogToday(o)?" +":"";return`${a}h ${r}m${c}`}getAttendanceSegments(n){let o=parseFloat(n?.total_work_hours),s=parseFloat(n?.gross_hours);if(!n?.first_check_in||isNaN(o)||o<=0)return[];let a=Math.max(isNaN(s)?o:s,8),r=Math.min(o/a*100,100),c=isNaN(s)?r:Math.min(s/a*100,100),l=Math.max(c-r,0);if(l<.5)return[{type:"work",widthPct:r}];let d=r/2;return[{type:"work",widthPct:d},{type:"break",widthPct:l},{type:"work",widthPct:d}]}getBreakHours(n){let o=parseFloat(n?.gross_hours),s=parseFloat(n?.total_work_hours);if(isNaN(o)||isNaN(s)||o<=s)return"";let a=o-s,r=Math.floor(a),c=Math.round((a-r)*60);return r>0?`${r}h ${c}m`:`${c}m`}islogToday(n){if(!n)return!1;let o=new Date().toISOString().split("T")[0],s=new Date(n).toISOString().split("T")[0];return o===s}getLateDuration(n){if(!n||n.status!=="present"&&n.status!=="late"||!n.first_check_in||!this.shiftPolicy?.start_time||n.notes&&n.notes.includes("[REGULARIZED"))return"";try{let o=new Date(n.first_check_in),[s,a,r]=this.shiftPolicy.start_time.split(":").map(Number),c=new Date(o);c.setHours(s,a,r||0,0);let l=o.getTime()-c.getTime();if(l>15*60*1e3){let d=Math.floor(l/1e3),h=Math.floor(d/3600),f=Math.floor(d%3600/60),u=d%60;return`${h>0?`${h}:`:""}${String(f).padStart(h>0?2:1,"0")}:${String(u).padStart(2,"0")} late`}}catch{}return""}openRegularizeModal(n){return mt(this,null,function*(){yield(yield this.alertCtrl.create({header:"Regularize Attendance",subHeader:`Date: ${n.attendance_date}`,cssClass:"regularization-alert",inputs:[{name:"first_in",type:"time",value:"09:15",placeholder:"Punch In"},{name:"last_out",type:"time",value:"18:20",placeholder:"Punch Out"},{name:"reason",type:"textarea",placeholder:"Reason for regularization"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Regularize",handler:s=>{this.regularizePenalty(n,s)}}]})).present()})}regularizePenalty(n,o){let s={employee_id:this.employeeId||this.employeeProfile?.id,attendance_date:n.attendance_date,status:"present",first_check_in:o.first_in,last_check_out:o.last_out,work_mode:"Office",location:this.employeeProfile?.location_name||"Mumbai Office",reason:o.reason||"Regularized"};this.attendanceApi.backdateRegularization(s).subscribe({next:a=>mt(this,null,function*(){(yield this.toastCtrl.create({message:"Attendance regularized successfully",duration:2e3,color:"success",position:"top"})).present(),this.loadMonthlyReport(),this.selectedLog&&this.selectedLog.attendance_date===n.attendance_date&&this.closeSlider()}),error:a=>mt(this,null,function*(){(yield this.toastCtrl.create({message:a?.error?.error||"Failed to regularize attendance",duration:3e3,color:"danger",position:"top"})).present()})})}};i.\u0275fac=function(o){return new(o||i)(V(qn),V(he),V(Un),V($n),V(Yn),V(_s),V(de))},i.\u0275cmp=Pt({type:i,selectors:[["app-attendance-log"]],inputs:{refreshTrigger:"refreshTrigger",employeeId:"employeeId",isHRView:"isHRView"},features:[ns],decls:29,vars:6,consts:[["emptyBar",""],["loadingDetails",""],["noRecords",""],[1,"row-space-between"],[2,"font-weight","bold","color","#334155","font-size","14px","margin","0"],[1,"filters"],[1,"filter-block"],[1,"btn-secondry",3,"click"],["class","btn-secondry",3,"active","click",4,"ngFor","ngForOf"],[1,"outline-btns"],[1,"btn-secondry","active"],["name","list-outline"],[1,"attendance-table"],[1,"table-header"],["size","2"],["size","3"],["size","1"],["class","table-row",3,"ngClass",4,"ngFor","ngForOf"],[1,"side-custom-popup",3,"didDismiss","isOpen"],[1,"table-row",3,"ngClass"],[4,"ngIf"],["size","10","class","no-log",4,"ngIf"],["size","3",4,"ngIf"],["size","2",4,"ngIf"],["size","1",4,"ngIf"],[1,"badge-leave"],[1,"badge-woff"],[1,"badge-penalty"],["size","10",1,"no-log"],["style","color:#333;font-size:11px;font-weight:550;margin:0;",4,"ngIf"],[2,"color","#333","font-size","11px","font-weight","550","margin","0"],[1,"attendance-visual-wrap"],[1,"attendance-bar"],[4,"ngIf","ngIfElse"],["class","bar-legend",4,"ngIf"],["class","bar-segment",3,"seg-work","seg-break","width",4,"ngFor","ngForOf"],[1,"bar-segment"],[1,"bar-segment","seg-empty",2,"width","100%"],[1,"bar-legend"],[1,"legend-dot","dot-work"],[1,"legend-lbl"],[1,"legend-dot","dot-break"],[2,"display","flex","align-items","center","gap","8px"],[2,"color","#0EA5E9","font-size","14px",3,"name"],[2,"color","#334155","font-size","14px",3,"name"],[2,"display","flex","align-items","center","justify-content","space-between","gap","8px"],[3,"ngSwitch"],["name","alarm-outline","style","color:#D97706;font-size:18px;",4,"ngSwitchCase"],["name","checkmark-circle-outline","style","color:#2dd4bf;font-size:18px;",4,"ngSwitchCase"],["name","checkmark-circle-outline","style","color:#10B981;font-size:18px;",4,"ngSwitchCase"],["name","alert-circle-outline","style","color:#EF4444;font-size:18px;",4,"ngSwitchCase"],["name","ellipse-outline","style","color:#64748B;font-size:14px;",4,"ngSwitchDefault"],[2,"display","flex","flex-direction","column"],[2,"font-size","13px","font-weight","500","line-height","1"],["style","color:#64748B;font-size:10px;margin-top:2px;",4,"ngIf"],["fill","clear","color","primary","class","regularize-btn",3,"click",4,"ngIf"],["name","alarm-outline",2,"color","#D97706","font-size","18px"],["name","checkmark-circle-outline",2,"color","#2dd4bf","font-size","18px"],["name","checkmark-circle-outline",2,"color","#10B981","font-size","18px"],["name","alert-circle-outline",2,"color","#EF4444","font-size","18px"],["name","ellipse-outline",2,"color","#64748B","font-size","14px"],[2,"color","#64748B","font-size","10px","margin-top","2px"],["fill","clear","color","primary",1,"regularize-btn",3,"click"],["name","create-outline","slot","icon-only"],["color","primary",1,"log-btn",2,"cursor","pointer",3,"click"],["src","../../../../assets/logs.png","alt","logs"],[1,"log-modal-header"],["slot","end"],["color","medium","size","small",3,"click"],["name","close-circle-outline","slot","icon-only"],[1,"modal-date"],["class","modal-content-wrapper",4,"ngIf","ngIfElse"],[1,"modal-content-wrapper"],[1,"daily-summary-card"],[1,"summary-grid"],[1,"summary-item"],[1,"s-label"],[1,"s-value"],[1,"summary-item",2,"text-align","right"],[1,"timeline-container"],["class","timeline-item",4,"ngFor","ngForOf"],[1,"timeline-item"],[1,"timeline-dot"],[1,"timeline-content"],[1,"punch-header"],[1,"time-box"],[1,"time"],[1,"type-tag",3,"ngClass"],[1,"mode-badge"],[1,"record-card"],["class","location-info",4,"ngIf"],["class","note-text",4,"ngIf"],["class","duration-indicator",4,"ngIf"],[1,"location-info"],["name","location-outline"],[1,"note-text"],["name","shield-checkmark-outline"],[1,"duration-indicator"],[1,"ion-text-center",2,"padding","60px 20px"],["name","calendar-clear-outline",2,"font-size","48px","color","#cbd5e1"],[2,"color","#64748b","font-size","14px","margin-top","16px"],[1,"ion-text-center",2,"padding","100px 0"],["name","crescent","color","primary"],[2,"color","#64748b","font-size","14px","margin-top","16px","font-weight","500"]],template:function(o,s){o&1&&(_(0,"div",3)(1,"div")(2,"p",4),C(3),b()(),_(4,"div",5)(5,"div",6)(6,"button",7),Y("click",function(){return s.filterByPeriod("30DAYS")}),C(7," 30 DAYS "),b(),F(8,Tf,2,3,"button",8),b(),_(9,"div",9)(10,"button",10),A(11,"ion-icon",11),b()()()(),_(12,"ion-grid",12)(13,"ion-row",13)(14,"ion-col",14),C(15,"Date"),b(),_(16,"ion-col",15),C(17,"Attendance Visual"),b(),_(18,"ion-col",14),C(19,"Effective Hours"),b(),_(20,"ion-col",14),C(21,"Gross Hours"),b(),_(22,"ion-col",14),C(23,"Arrival"),b(),_(24,"ion-col",16),C(25,"Log"),b()(),F(26,Qf,13,18,"ion-row",17),b(),_(27,"ion-modal",18),Y("didDismiss",function(){return s.closeSlider()}),F(28,lu,14,6,"ng-template"),b()),o&2&&(M(3),H(s.getSelectedPeriodLabel()),M(3),Ct("active",s.selectedPeriod==="30DAYS"),M(2),S("ngForOf",s.monthButtons),M(18),S("ngForOf",s.currentMonthreport),M(),S("isOpen",s.showSlider))},dependencies:[kt,ee,ne,ie,oe,We,se,Ot,ae,re,ce,le,ms,wt,Zt,Qt,vt,os,ss,as,He,te],styles:[`@charset "UTF-8";



[_ngcontent-%COMP%]:root {
  --ion-color-primary: #1F74BB;
  --ion-color-primary-rgb:
    26,
    95,
    168;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-primary-shade: #1F74BB;
  --ion-color-primary-tint: #175191;
  --ion-color-secondary: #334155;
  --ion-color-secondary-rgb:
    51,
    65,
    85;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-secondary-shade: #1e293b;
  --ion-color-secondary-tint: #475569;
  --ion-color-tertiary: #4f46e5;
  --ion-color-tertiary-rgb:
    79,
    70,
    229;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-tertiary-shade: #4338ca;
  --ion-color-tertiary-tint: #6366f1;
  --ion-color-success: #16a34a;
  --ion-color-success-rgb:
    22,
    163,
    74;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb:
    255,
    255,
    255;
  --ion-color-success-shade: #15803d;
  --ion-color-success-tint: #22c55e;
  --ion-color-warning: #d97706;
  --ion-color-warning-rgb:
    217,
    119,
    6;
  --ion-color-warning-contrast: #ffffff;
  --ion-color-warning-contrast-rgb:
    255,
    255,
    255;
  --ion-color-warning-shade: #b45309;
  --ion-color-warning-tint: #f59e0b;
  --ion-color-danger: #dc2626;
  --ion-color-danger-rgb:
    220,
    38,
    38;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb:
    255,
    255,
    255;
  --ion-color-danger-shade: #b91c1c;
  --ion-color-danger-tint: #ef4444;
  --ion-color-dark: #0f172a;
  --ion-color-dark-rgb:
    15,
    23,
    42;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb:
    255,
    255,
    255;
  --ion-color-dark-shade: #020617;
  --ion-color-dark-tint: #1e293b;
  --ion-color-medium: #94a3b8;
  --ion-color-medium-rgb:
    148,
    163,
    184;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb:
    255,
    255,
    255;
  --ion-color-medium-shade: #64748b;
  --ion-color-medium-tint: #cbd5e1;
  --ion-color-light: #ffffff;
  --ion-color-light-rgb:
    255,
    255,
    255;
  --ion-color-light-contrast: #0f172a;
  --ion-color-light-contrast-rgb:
    15,
    23,
    42;
  --ion-color-light-shade: #f1f5f9;
  --ion-color-light-tint: #f8fafc;
  --ion-bg-color: #f4f7fb;
  --ion-bg-primary: #ffffff;
  --ion-text-color: #0f172a;
  --ion-border-color: #ABABAB;
  --ion-subtle-text: #64748b;
  --ion-white-color: #ffffff;
  --ion-side-bar-color: #0f2b4a;
  --ion-bg-color-primary: #ffffff;
  --clr-primary: #1F74BB;
  --clr-primary-light: #e8f0fb;
  --clr-primary-xlight: #f0f5ff;
  --clr-secondary: #334155;
  --clr-indigo: #4f46e5;
  --clr-success: #16a34a;
  --clr-success-bg: #f0fdf4;
  --clr-warning: #d97706;
  --clr-warning-bg: #fffbeb;
  --clr-danger: #dc2626;
  --clr-danger-bg: #fef2f2;
  --clr-info: #0284c7;
  --clr-info-bg: #f0f9ff;
  --clr-text: #0f172a;
  --clr-text-muted: #475569;
  --clr-text-subtle: #64748b;
  --clr-border: #ABABAB;
  --clr-border-light: #f1f5f9;
  --clr-bg-page: #f4f7fb;
  --clr-bg-card: #ffffff;
  --clr-bg-surface: #ffffff;
  --clr-bg-subtle: #f8fafc;
  --clr-sidebar: #0f2b4a;
  --clr-cosmic-bg: #0f2b4a;
  --clr-cosmic-card: #0d2240;
  --clr-neon-cyan: #38bdf8;
  --clr-neon-magenta: #818cf8;
  --clr-neon-blue: #1F74BB;
}
[_ngcontent-%COMP%]:root {
  font-size: 16px;
}
@media screen and (min-width: 1440px) {
  [_ngcontent-%COMP%]:root {
    font-size: 17px;
  }
}
@media screen and (max-width: 1280px) {
  [_ngcontent-%COMP%]:root {
    font-size: 15px;
  }
}
@media screen and (max-width: 1024px) {
  [_ngcontent-%COMP%]:root {
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  [_ngcontent-%COMP%]:root {
    font-size: 14px;
  }
}
@media screen and (max-width: 576px) {
  [_ngcontent-%COMP%]:root {
    font-size: 13px;
  }
}
body[_ngcontent-%COMP%] {
  font-family: "Inter";
  color: #0f172a;
  background-color: #f4f7fb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.filters[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  align-items: center;
}
.filter-block[_ngcontent-%COMP%] {
  display: flex;
}
.btn-secondry[_ngcontent-%COMP%] {
  padding: 8px 16px;
  background: #f8fafc;
  font-size: 11px;
  font-weight: 700;
  color: #1870B9;
  border-right: 1px solid rgba(171, 171, 171, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
}
.btn-secondry.active[_ngcontent-%COMP%] {
  background: #1870B9 !important;
  color: #fff;
  height: 44px;
  border-radius: 99px 0px 0px 99px;
  border: none;
}
.btn-secondry[_ngcontent-%COMP%]:hover:not(.active) {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
.outline-btns[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.outline-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.outline-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #1F74BB;
  color: #fff;
}
.outline-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.attendance-table[_ngcontent-%COMP%] {
  margin-top: 16px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.attendance-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  font-weight: 700;
  font-size: 11px;
  color: #475569;
  border-radius: 0;
  border-bottom: 2px solid #ABABAB;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.attendance-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding: 14px 16px;
  display: flex;
  align-items: center;
}
.attendance-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f8fafc;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  transition: all 0.2s ease;
  background: #ffffff;
}
.attendance-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.attendance-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  font-weight: 600;
}
.attendance-table[_ngcontent-%COMP%]   .table-row.weekoff-row[_ngcontent-%COMP%] {
  background: #f4f7fb;
  color: #94a3b8;
  border-left: 4px solid #cbd5e1;
}
.attendance-table[_ngcontent-%COMP%]   .table-row.leave-row[_ngcontent-%COMP%] {
  background: #e8f0fb;
  border-left: 4px solid #1F74BB;
}
.attendance-table[_ngcontent-%COMP%]   .table-row.penalty-row[_ngcontent-%COMP%] {
  background: #FEF2F2;
  border-left: 4px solid #dc2626;
}
.badge-leave[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge-woff[_ngcontent-%COMP%] {
  background: #475569;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge-penalty[_ngcontent-%COMP%] {
  background: #dc2626;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.no-log[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  color: #94a3b8;
}
.attendance-visual-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.attendance-bar[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  height: 8px;
  border-radius: 99px;
  overflow: hidden;
  background: #f8fafc;
  width: 100%;
  gap: 2px;
}
.attendance-bar.empty-bar[_ngcontent-%COMP%] {
  background: #f8fafc;
}
.bar-segment[_ngcontent-%COMP%] {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease;
  flex-shrink: 0;
}
.bar-segment.seg-work[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #38bdf8,
      #0ea5e9);
  box-shadow: 0 0 4px rgba(14, 165, 233, 0.4);
}
.bar-segment.seg-break[_ngcontent-%COMP%] {
  background: #4f74a3;
}
.bar-segment.seg-empty[_ngcontent-%COMP%] {
  background: #f1f5f9;
}
.bar-legend[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.legend-dot[_ngcontent-%COMP%] {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-dot.dot-work[_ngcontent-%COMP%] {
  background: #0ea5e9;
}
.legend-dot.dot-break[_ngcontent-%COMP%] {
  background: #cbd5e1;
}
.legend-lbl[_ngcontent-%COMP%] {
  font-size: 9px;
  color: #475569;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-right: 6px;
}
.clockin-out[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #f1f5f9;
}
.clockin-out[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 4px 0 0 0;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1F74BB;
}
.clockin-img[_ngcontent-%COMP%], 
.clockout-img[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
}
ion-modal.side-custom-popup[_ngcontent-%COMP%] {
  --height: 100%;
  --width: 440px;
  --border-radius: 0;
  --box-shadow: vars.$shadow-lg;
  --backdrop-opacity: 0.4;
  position: fixed;
  right: 0;
}
ion-modal.side-custom-popup[_ngcontent-%COMP%]::part(content) {
  background: #ffffff;
}
.log-modal-header[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-style: none;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}
.log-modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: transparent;
  padding: 0 16px;
}
.log-modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.log-modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   .modal-date[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  margin: -2px 0 10px 20px;
  font-weight: 700;
}
.modal-content-wrapper[_ngcontent-%COMP%] {
  padding: 24px;
}
.daily-summary-card[_ngcontent-%COMP%] {
  background: #0f2b4a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.daily-summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%] {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
  opacity: 0.8;
  margin-bottom: 16px;
  display: block;
}
.daily-summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
}
.daily-summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .s-label[_ngcontent-%COMP%] {
  font-size: 10px;
  opacity: 0.7;
  display: block;
  margin-bottom: 4px;
  text-transform: uppercase;
}
.daily-summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .s-value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
}
.timeline-container[_ngcontent-%COMP%] {
  position: relative;
  padding-left: 10px;
}
.timeline-container[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ABABAB;
}
.timeline-item[_ngcontent-%COMP%] {
  position: relative;
  padding: 0 0 32px 40px;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-dot[_ngcontent-%COMP%] {
  position: absolute;
  left: 16px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cbd5e1;
  border: 3px solid #fff;
  box-shadow: 0 0 0 4px #f4f7fb;
  z-index: 1;
  transition: all 0.2s ease;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-dot.active[_ngcontent-%COMP%] {
  background: #1F74BB;
  box-shadow:
    0 0 0 4px #e8f0fb,
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
  transform: scale(1.2);
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%]   .time-box[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%]   .time-box[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%]   .time-box[_ngcontent-%COMP%]   .type-tag[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  margin-left: 12px;
  letter-spacing: 0.5px;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%]   .time-box[_ngcontent-%COMP%]   .type-tag.in[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%]   .time-box[_ngcontent-%COMP%]   .type-tag.out[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .punch-header[_ngcontent-%COMP%]   .mode-badge[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(31, 116, 187, 0.1);
  text-transform: uppercase;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .record-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .record-card[_ngcontent-%COMP%]   .location-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #1e293b;
  margin-bottom: 4px;
  font-weight: 700;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .record-card[_ngcontent-%COMP%]   .location-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  margin-right: 8px;
  color: #1F74BB;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .record-card[_ngcontent-%COMP%]   .note-text[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-style: italic;
  padding-left: 24px;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .duration-indicator[_ngcontent-%COMP%] {
  margin: 16px 0 -16px -40px;
  padding-left: 40px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .duration-indicator[_ngcontent-%COMP%]::before {
  content: "";
  width: 16px;
  height: 1px;
  background: #ABABAB;
  margin-right: 12px;
}
.card-title[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  margin: 4px 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.log-btn[_ngcontent-%COMP%] {
  --ion-color-base: transparent !important;
  --box-shadow: none;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
}
.log-btn[_ngcontent-%COMP%]:hover {
  background: #e8f0fb;
  color: #1F74BB;
  border-color: #1F74BB;
}`]});let e=i;return e})();var du=(e,i,t)=>({"highlight-today":e,weekoffs:i,selected:t});function hu(e,i){if(e&1&&(_(0,"button",19),C(1),b()),e&2){let t=i.$implicit;M(),H(t)}}function fu(e,i){e&1&&(_(0,"div",23),C(1,"W-OFF"),b())}function uu(e,i){if(e&1){let t=Mt();_(0,"div",20),Y("click",function(){let o=ft(t).$implicit,s=I();return ut(s.selectDate(o))}),_(1,"div",21),C(2),b(),F(3,fu,2,0,"div",22),b()}if(e&2){let t=i.$implicit,n=I();S("ngClass",Rn(3,du,n.isTodayCalendarDay(t),t.isOff,n.selectedDate===t)),M(2),H(t.day),M(),S("ngIf",t.isOff)}}function gu(e,i){if(e&1&&(_(0,"span"),C(1),Q(2,"date"),Q(3,"date"),b()),e&2){let t=I();M(),Jt(" ( ",lt(2,2,t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.first_check_in,"HH:mm")," - ",lt(3,5,t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.last_check_out,"HH:mm")," ) ")}}function pu(e,i){e&1&&(_(0,"div",24),A(1,"ion-spinner"),b())}function mu(e,i){e&1&&(_(0,"div",24)(1,"p"),C(2,"No attendance record found"),b()())}function _u(e,i){if(e&1&&(_(0,"div",25)(1,"div")(2,"p"),C(3,"Gross Hours"),b(),_(4,"p"),C(5),Q(6,"timeFormat"),b()(),_(7,"div")(8,"p"),C(9,"Effective Hours"),b(),_(10,"p"),C(11),Q(12,"timeFormat"),b()()()),e&2){let t=I();M(5),q("",Ht(6,2,t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.gross_hours),"h"),M(6),q("",Ht(12,4,t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.total_work_hours),"h")}}function bu(e,i){if(e&1&&(_(0,"div",35)(1,"p"),C(2),Q(3,"date"),Q(4,"titlecase"),b()()),e&2){let t=i.$implicit;M(2),Jt(" ",lt(3,2,t.punch_time,"HH:mm:ss")," (",Ht(4,5,t.punch_type),") ")}}function xu(e,i){if(e&1&&(_(0,"div",26)(1,"div")(2,"p",27),A(3,"ion-icon",28),C(4),b(),_(5,"p",29),A(6,"ion-icon",30),C(7),b()(),_(8,"p",31),C(9,"Time-Logs"),b(),_(10,"ion-row",32)(11,"ion-col",33),F(12,bu,5,7,"div",34),b()()()),e&2){let t=I();M(3),S("name",(t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.status)==="present"?"checkmark-outline":"alert-circle-outline")("color",(t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.status)==="present"?"success":"warning"),M(),q(" ",t.getArrivalStatus(t.attendanceDetails==null?null:t.attendanceDetails.attendance)," "),M(3),q(" ",(t.attendanceDetails==null||t.attendanceDetails.attendance==null?null:t.attendanceDetails.attendance.location)||"Office"),M(5),S("ngForOf",t.attendanceDetails==null?null:t.attendanceDetails.punches)}}var Er=(()=>{let i=class i{constructor(n){this.attendanceApi=n,this.calendarDays=[],this.today=new Date,this.weekDays=["MON","TUE","WED","THU","FRI","SAT","SUN"],this.currentMonth=new Date,this.selectedDate=null,this.attendanceDetails=null,this.loadingDetails=!1}ngOnInit(){this.generateCalendar(new Date),setTimeout(()=>{let n=this.calendarDays.find(o=>o.date&&this.isToday(o.date));n&&this.selectDate(n)},100)}selectDate(n){n.date&&(this.selectedDate=n,this.loadDateDetails(n.date))}loadDateDetails(n){this.loadingDetails=!0;let o=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),a=String(n.getDate()).padStart(2,"0"),r=`${o}-${s}-${a}`;this.attendanceApi.getAttendanceDetailsByDate(r).subscribe({next:c=>{this.attendanceDetails=c,this.loadingDetails=!1},error:()=>{this.attendanceDetails=null,this.loadingDetails=!1}})}prevMonth(){this.currentMonth=new Date(this.currentMonth.setMonth(this.currentMonth.getMonth()-1)),this.generateCalendar(this.currentMonth)}nextMonth(){this.currentMonth=new Date(this.currentMonth.setMonth(this.currentMonth.getMonth()+1)),this.generateCalendar(this.currentMonth)}generateCalendar(n){this.calendarDays=[];let o=n.getFullYear(),s=n.getMonth(),a=new Date(o,s,1).getDay(),r=new Date(o,s+1,0).getDate();for(let c=0;c<(a===0?6:a-1);c++)this.calendarDays.push({day:"",timing:"",isOff:!1});for(let c=1;c<=r;c++){let l="9:30 AM - 6:30 PM",d=!1,h=new Date(o,s,c).getDay();(h===0||h===6)&&(l="",d=!0),this.calendarDays.push({day:c,timing:l,isOff:d,date:new Date(o,s,c)})}}isTodayCalendarDay(n){return n.date?n.date.getDate()===this.today.getDate()&&n.date.getMonth()===this.today.getMonth()&&n.date.getFullYear()===this.today.getFullYear():!1}isToday(n){return n.getDate()===this.today.getDate()&&n.getMonth()===this.today.getMonth()&&n.getFullYear()===this.today.getFullYear()}getArrivalStatus(n){return n&&{present:"Present",absent:"Absent","half-day":"Half Day",late:"Late Arrival","on-leave":"On Leave"}[n.status]||"Unknown"}};i.\u0275fac=function(o){return new(o||i)(V(he))},i.\u0275cmp=Pt({type:i,selectors:[["app-calendar"]],decls:29,vars:15,consts:[[1,"calendar-container"],[1,"row-space-between"],[1,"calendar-header"],[3,"click"],["name","chevron-back-outline"],["name","chevron-forward-outline"],[1,"calendar-details-block"],["size","12","size-sm","12","size-md","9","size-lg","9","size-xl","9",1,"calendar-grid"],[1,"day-header"],["class","day-header-cell",4,"ngFor","ngForOf"],[1,"day-cell-row"],["class","day-cell",3,"ngClass","click",4,"ngFor","ngForOf"],["size","12","size-sm","12","size-md","3","size-lg","3","size-xl","3",1,"details-container","ion-no-padding"],[1,"details-header"],[4,"ngIf"],[1,"details-block"],["class","ion-padding ion-text-center",4,"ngIf"],["class","hours-block",4,"ngIf"],["class","logs-block",4,"ngIf"],[1,"day-header-cell"],[1,"day-cell",3,"click","ngClass"],[1,"date"],["class","timing",4,"ngIf"],[1,"timing"],[1,"ion-padding","ion-text-center"],[1,"hours-block"],[1,"logs-block"],[1,"status"],[3,"name","color"],[1,"location"],["name","location"],[1,"card-title"],[1,"ion-no-padding"],["size","12",1,"clock-logs"],["class","d-flex",4,"ngFor","ngForOf"],[1,"d-flex"]],template:function(o,s){o&1&&(_(0,"div",0)(1,"div",1)(2,"div",2)(3,"button",3),Y("click",function(){return s.prevMonth()}),A(4,"ion-icon",4),b(),_(5,"span"),C(6),Q(7,"date"),b(),_(8,"button",3),Y("click",function(){return s.nextMonth()}),A(9,"ion-icon",5),b()()(),_(10,"ion-row",6)(11,"ion-col",7)(12,"div",8),F(13,hu,2,1,"button",9),b(),_(14,"div",10),F(15,uu,4,7,"div",11),b()(),_(16,"ion-col",12)(17,"div",13)(18,"p"),C(19,"Day Shift"),b(),_(20,"p"),C(21),Q(22,"date"),F(23,gu,4,8,"span",14),b()(),_(24,"div",15),F(25,pu,2,0,"div",16)(26,mu,3,0,"div",16)(27,_u,13,6,"div",17)(28,xu,13,5,"div",18),b()()()()),o&2&&(M(6),H(lt(7,9,s.currentMonth,"MMMM yyyy")),M(7),S("ngForOf",s.weekDays),M(2),S("ngForOf",s.calendarDays),M(6),q("",lt(22,12,s.selectedDate==null?null:s.selectedDate.date,"MMM d")||"Select a date"," "),M(2),S("ngIf",s.attendanceDetails==null||s.attendanceDetails.attendance==null?null:s.attendanceDetails.attendance.first_check_in),M(2),S("ngIf",s.loadingDetails),M(),S("ngIf",!s.loadingDetails&&!(s.attendanceDetails!=null&&s.attendanceDetails.has_attendance)),M(),S("ngIf",!s.loadingDetails&&(s.attendanceDetails==null?null:s.attendanceDetails.has_attendance)),M(),S("ngIf",!s.loadingDetails&&(s.attendanceDetails==null?null:s.attendanceDetails.has_attendance)))},dependencies:[kt,ie,Ot,ae,re,wt,Zt,Qt,vt,rs,te,kn],styles:[`

.calendar-container[_ngcontent-%COMP%] {
  padding: 16px;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.calendar-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.calendar-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  background: none;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.calendar-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.calendar-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: 16px;
  color: #334155;
}
.calendar-details-block[_ngcontent-%COMP%] {
  display: flex;
  gap: 0;
}
.calendar-grid[_ngcontent-%COMP%]   .day-header[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}
.calendar-grid[_ngcontent-%COMP%]   .day-header-cell[_ngcontent-%COMP%] {
  background: #f1f5f9;
  border: none;
  padding: 8px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  text-align: center;
  border-radius: 4px;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell[_ngcontent-%COMP%] {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 4px;
  min-height: 60px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {
  font-weight: 600;
  font-size: 14px;
  color: #334155;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell[_ngcontent-%COMP%]   .timing[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94A3B8;
  margin-top: 4px;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.highlight-today[_ngcontent-%COMP%] {
  background: #DBEAFE;
  border-color: #3B82F6;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.highlight-today[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {
  color: #1D4ED8;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.weekoffs[_ngcontent-%COMP%] {
  background: #fafafa;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.weekoffs[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {
  color: #ccc;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.weekoffs[_ngcontent-%COMP%]   .timing[_ngcontent-%COMP%] {
  color: #e74c3c;
  font-weight: 600;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.selected[_ngcontent-%COMP%] {
  background: #3498DB;
  border-color: #3498DB;
}
.calendar-grid[_ngcontent-%COMP%]   .day-cell.selected[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%], 
.calendar-grid[_ngcontent-%COMP%]   .day-cell.selected[_ngcontent-%COMP%]   .timing[_ngcontent-%COMP%] {
  color: #fff;
}
.details-container[_ngcontent-%COMP%] {
  border-left: 1px solid #e2e8f0;
  padding-left: 16px !important;
}
.details-container[_ngcontent-%COMP%]   .details-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.details-container[_ngcontent-%COMP%]   .details-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 13px;
  color: #64748B;
}
.details-container[_ngcontent-%COMP%]   .details-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-child {
  font-weight: 700;
  color: #334155;
  font-size: 15px;
  margin-bottom: 4px;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .hours-block[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .hours-block[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
  flex: 1;
  background: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .hours-block[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .hours-block[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-child {
  font-size: 11px;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .hours-block[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {
  font-weight: 700;
  font-size: 18px;
  color: #334155;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #64748B;
  margin: 4px 0;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: 14px;
  color: #334155;
  margin: 12px 0 8px;
}
.details-container[_ngcontent-%COMP%]   .details-block[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
  font-size: 13px;
  color: #475569;
}
.logs-block[_ngcontent-%COMP%] {
  max-height: 250px;
  overflow-y: auto;
  padding: 8px 0;
}`]});let e=i;return e})();function yu(e,i){if(e&1&&(_(0,"ion-row",10)(1,"ion-col",7)(2,"p"),C(3),b()(),_(4,"ion-col",7)(5,"p"),C(6),b()(),_(7,"ion-col",7)(8,"p"),C(9),b()(),_(10,"ion-col",7)(11,"span",11),C(12),b()(),_(13,"ion-col",12)(14,"p"),C(15),b()()()),e&2){let t=i.$implicit;M(3),H(t.date),M(3),H(t.request),M(3),H(t.requestedOn),M(2),S("ngClass",t.status.toLowerCase()),M(),q(" ",t.status," "),M(3),H(t.reason||"-")}}function Mu(e,i){if(e&1&&(Gt(0),_(1,"ion-grid",5)(2,"ion-row",6)(3,"ion-col",7),C(4,"Date"),b(),_(5,"ion-col",7),C(6,"Request"),b(),_(7,"ion-col",7),C(8,"Requested On"),b(),_(9,"ion-col",7),C(10,"Status"),b(),_(11,"ion-col",8),C(12,"Reason"),b()(),F(13,yu,16,6,"ion-row",9),b(),Kt()),e&2){let t=I().$implicit;M(13),S("ngForOf",t.records)}}function Cu(e,i){if(e&1&&(_(0,"div",13)(1,"p",14),A(2,"ion-icon",15),C(3),b()()),e&2){let t=I().$implicit;M(3),q(" No ",t.type," Available ")}}function Pu(e,i){if(e&1&&(_(0,"div",2)(1,"ion-card")(2,"ion-card-header",3)(3,"ion-card-title"),C(4),b(),_(5,"ion-card-subtitle"),C(6),b()(),_(7,"ion-card-content"),F(8,Mu,14,1,"ng-container",4)(9,Cu,4,1,"ng-template",null,0,Be),b()()()),e&2){let t=i.$implicit,n=Fe(10);M(4),H(t.type),M(2),H(t.dateRange),M(2),S("ngIf",t.records.length>0)("ngIfElse",n)}}var Rr=(()=>{let i=class i{constructor(n,o){this.wfhService=n,this.http=o,this.attendanceRequestsHistory=[]}ngOnInit(){this.initializeStaticSections(),this.loadWFHRequests(),this.loadRemoteClockinRequests()}initializeStaticSections(){this.attendanceRequestsHistory=[{type:"Work From Home / On Duty Requests",dateRange:"",records:[]},{type:"Regularization Requests",dateRange:"",records:[]},{type:"Remote Clock In Requests",dateRange:"",records:[]},{type:"Partial Day Requests",dateRange:"",records:[]}]}loadWFHRequests(){this.wfhService.getAllWFHRequests().subscribe({next:n=>{let o=Array.isArray(n)?n:n.data||n.requests||[],s=o.filter(r=>r.leave_type==="WFH").map(r=>this.mapWFHRecord(r,"WFH")),a=o.filter(r=>r.leave_type==="Remote").map(r=>this.mapWFHRecord(r,"Regularization"));this.assignGroup("Work From Home / On Duty Requests",s),this.assignGroup("Remote Clock In Requests",a)},error:()=>{this.assignGroup("Work From Home / On Duty Requests",[]),this.assignGroup("Remote Clock In Requests",[])}})}loadRemoteClockinRequests(){this.http.get("/api/remote-clockin/my-requests").subscribe({next:n=>{let o=n.map(s=>({date:this.formatDate(s.request_date),request:"Remote Clock In",requestedOn:this.formatRequestedOn(s.created_at),note:s.reason,reason:"Remote",status:this.formatStatus(s.status),lastAction:s.approved_by?`Approved by ${s.approved_by}`:"-",nextApprover:"-"}));this.assignGroup("Remote Clock In Requests",o)},error:()=>{this.assignGroup("Remote Clock In Requests",[])}})}mapWFHRecord(n,o){return{date:this.formatDate(n.applied_at),request:o,requestedOn:this.formatRequestedOn(n.created_at),note:n.reason,reason:n.reason,status:this.formatStatus(n.status),lastAction:n.updated_by||"-",nextApprover:n.next_approver||"-"}}assignGroup(n,o){let s=this.attendanceRequestsHistory.find(a=>a.type===n);s&&(s.records=o)}formatDate(n){return new Date(n).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}formatRequestedOn(n){return n?new Date(n).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"-"}formatStatus(n){return n?n.charAt(0).toUpperCase()+n.slice(1):"Pending"}};i.\u0275fac=function(o){return new(o||i)(V(Ve),V(cs))},i.\u0275cmp=Pt({type:i,selectors:[["app-attendance-request"]],decls:1,vars:1,consts:[["noRequests",""],["class","request-card",4,"ngFor","ngForOf"],[1,"request-card"],[1,"row-space-between"],[4,"ngIf","ngIfElse"],[1,"table-block"],[1,"table-header"],["size","2"],["size","4"],["class","table-list-row",4,"ngFor","ngForOf"],[1,"table-list-row"],[1,"status",3,"ngClass"],["size","4",1,"text-wrap"],[1,"no-leaves-img"],[1,"empty-data"],["name","document-text-outline",2,"font-size","40px","opacity","0.3","display","block","margin","0 auto 8px"]],template:function(o,s){o&1&&F(0,Pu,11,4,"div",1),o&2&&S("ngForOf",s.attendanceRequestsHistory)},dependencies:[kt,Hn,Wn,Nn,us,Vn,ie,We,Ot,ae,wt,Zt,Qt,vt],styles:[`

.request-card[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.request-card[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.request-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.request-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #334155;
}
.request-card[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #94A3B8;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  background: #f7f7f7;
  font-weight: 600;
  font-size: 12px;
  color: #475569;
  border-radius: 8px 8px 0 0;
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding: 8px;
}
.table-block[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%] {
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;
  color: #334155;
}
.table-block[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding: 8px;
}
.table-block[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 12px;
}
.text-wrap[_ngcontent-%COMP%] {
  white-space: normal;
  word-break: break-word;
}
.status[_ngcontent-%COMP%] {
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}
.status.approved[_ngcontent-%COMP%] {
  background: #e6f9f0;
  color: #0a8754;
}
.status.pending[_ngcontent-%COMP%] {
  background: #fff4e5;
  color: #d48806;
}
.status.rejected[_ngcontent-%COMP%] {
  background: #fdecea;
  color: #d93025;
}
.no-leaves-img[_ngcontent-%COMP%] {
  text-align: center;
  padding: 30px 16px;
}
.no-leaves-img[_ngcontent-%COMP%]   .empty-data[_ngcontent-%COMP%] {
  color: #94A3B8;
  font-size: 14px;
}`]});let e=i;return e})();function wu(e,i){e&1&&A(0,"ion-spinner",15)}var Fr=(()=>{let i=class i{constructor(n,o,s,a){this.modalCtrl=n,this.toastCtrl=o,this.wfhService=s,this.attendanceApi=a,this.reason="",this.loading=!1,this.existingWFHRequests=[],this.loadExistingWFHRequests()}loadExistingWFHRequests(){this.wfhService.getAllWFHRequests().subscribe({next:n=>{this.existingWFHRequests=(n||[]).filter(o=>["PENDING","APPROVED","pending","approved"].includes(o.status))},error:n=>console.error("Failed to load WFH requests:",n)})}hasWFHConflictForToday(n){return this.existingWFHRequests.some(o=>{let s=(o.start_date||o.from_date||"").split("T")[0],a=(o.end_date||o.to_date||s).split("T")[0];return n>=s&&n<=a})}submit(){return mt(this,null,function*(){if(!this.reason.trim())return;let n=new Date().toISOString().split("T")[0];if(this.hasWFHConflictForToday(n)){this.showToast("Conflict: You already have a WFH request for today.","warning");return}this.loading=!0,this.wfhService.remote({date:n,reason:this.reason}).subscribe({next:()=>{this.attendanceApi.getClockState()?this.finalize(!0):this.attendanceApi.apiPunchIn({work_mode:"Remote",location:"Remote",notes:"Remote Clock-In: "+this.reason}).subscribe({next:()=>this.finalize(!0),error:o=>{this.loading=!1,this.showToast(o?.error?.message||"Remote Punch-In failed","danger")}})},error:o=>{this.loading=!1,this.showToast(o?.error?.error||"Failed to submit remote request","danger")}})})}finalize(n){this.loading=!1,n&&(this.showToast("Remote Clock-In request submitted successfully!","success"),this.modalCtrl.dismiss({success:!0,reason:this.reason}))}close(){this.modalCtrl.dismiss()}showToast(n,o){return mt(this,null,function*(){yield(yield this.toastCtrl.create({message:n,duration:3e3,position:"top",color:o,cssClass:"custom-toast"})).present()})}};i.\u0275fac=function(o){return new(o||i)(V(Ne),V(de),V(Ve),V(he))},i.\u0275cmp=Pt({type:i,selectors:[["app-remote-clockin-modal"]],decls:22,vars:5,consts:[[1,"ion-no-border"],["color","primary"],["slot","end"],[3,"click"],["name","close-outline"],[1,"ion-padding"],[1,"modal-wrapper"],[1,"info-banner"],["name","information-circle-outline"],[1,"form-container"],[1,"input-group"],["placeholder","Explain why you are clocking in remotely...","rows","6",1,"custom-textarea",3,"ngModelChange","ngModel","disabled"],[1,"submit-action","ion-margin-top"],["expand","block",1,"primary-btn",3,"click","disabled"],["name","crescent","slot","start",4,"ngIf"],["name","crescent","slot","start"]],template:function(o,s){o&1&&(_(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),C(3,"Remote Clock-In Request"),b(),_(4,"ion-buttons",2)(5,"ion-button",3),Y("click",function(){return s.close()}),A(6,"ion-icon",4),b()()()(),_(7,"ion-content",5)(8,"div",6)(9,"div",7),A(10,"ion-icon",8),_(11,"p"),C(12,"This request will be sent to your manager for approval."),b()(),_(13,"div",9)(14,"div",10)(15,"label"),C(16,"Reason / Note"),b(),_(17,"ion-textarea",11),Ln("ngModelChange",function(r){return En(s.reason,r)||(s.reason=r),r}),b()(),_(18,"div",12)(19,"ion-button",13),Y("click",function(){return s.submit()}),F(20,wu,1,0,"ion-spinner",14),C(21),b()()()()()),o&2&&(M(17),In("ngModel",s.reason),S("disabled",s.loading),M(2),S("disabled",s.loading||!s.reason.trim()),M(),S("ngIf",s.loading),M(),q(" ",s.loading?"Submitting...":"Submit Request"," "))},dependencies:[kt,ee,ne,oe,se,Ot,re,jn,ce,le,Bn,wt,vt,He,Fn,zn],styles:[`

.modal-wrapper[_ngcontent-%COMP%] {
  padding: 10px 0;
}
.info-banner[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f0f7ff;
  border-radius: 12px;
  margin-bottom: 24px;
  color: #0c66e4;
}
.info-banner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
}
.info-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}
.input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-weight: 500;
  color: #444;
  margin-bottom: 12px;
  font-size: 14px;
}
.custom-textarea[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 20px;
}
.primary-btn[_ngcontent-%COMP%] {
  --background: #1870B9;
  --border-radius: 12px;
  --height: 52px;
  height: 52px;
  font-weight: 600;
  letter-spacing: 0.5px;
}`]});let e=i;return e})();function Ou(e,i){if(e&1){let t=Mt();_(0,"div",22)(1,"ion-datetime",23),Y("ionChange",function(o){ft(t);let s=I();return ut(s.onDateSelected(o))}),_(2,"div",24),C(3),b()()()}if(e&2){let t=I();M(),S("min",t.minDate)("value",t.activePicker==="from"?t.fromDate:t.toDate),M(2),q("Select ",t.activePicker==="from"?"Start":"End"," Date")}}function ku(e,i){e&1&&A(0,"ion-spinner",25)}var zr=(()=>{let i=class i{constructor(n,o,s){this.modalCtrl=n,this.wfhService=o,this.toastCtrl=s,this.fromDate=new Date().toISOString(),this.toDate=new Date().toISOString(),this.minDate=new Date().toISOString(),this.activePicker=null,this.reason="",this.totalDays=1,this.loading=!1,this.existingRequests=[]}ngOnInit(){this.calculateDays(),this.loadExistingRequests()}loadExistingRequests(){this.wfhService.getAllWFHRequests().subscribe({next:n=>this.existingRequests=n||[],error:n=>console.error("Error loading WFH requests",n)})}openPicker(n){this.activePicker=this.activePicker===n?null:n}onDateSelected(n){let o=n.detail.value;this.activePicker==="from"?(this.fromDate=o,new Date(this.toDate)<new Date(o)&&(this.toDate=o)):this.toDate=o,this.calculateDays(),this.activePicker=null}calculateDays(){let n=new Date(this.fromDate),o=new Date(this.toDate);if(n.setHours(0,0,0,0),o.setHours(0,0,0,0),o<n){this.totalDays=0;return}let s=Math.abs(o.getTime()-n.getTime());this.totalDays=Math.ceil(s/(1e3*60*60*24))+1}submit(){return mt(this,null,function*(){if(!this.reason.trim())return;this.loading=!0;let n={start_date:this.fromDate.split("T")[0],end_date:this.toDate.split("T")[0],total_days:this.totalDays,work_mode:"WFH",reason:this.reason};this.wfhService.wfh(n).subscribe({next:o=>{this.loading=!1,this.showToast("Work From Home request submitted successfully!","success"),this.modalCtrl.dismiss(o,"success")},error:o=>{this.loading=!1,this.showToast(o?.error?.error||"Failed to submit request","danger")}})})}close(){this.modalCtrl.dismiss()}showToast(n,o){return mt(this,null,function*(){yield(yield this.toastCtrl.create({message:n,duration:3e3,position:"top",color:o})).present()})}};i.\u0275fac=function(o){return new(o||i)(V(Ne),V(Ve),V(de))},i.\u0275cmp=Pt({type:i,selectors:[["app-work-from-home"]],decls:43,vars:19,consts:[[1,"ion-no-border"],["color","primary"],["slot","end"],[3,"click"],["name","close-outline"],[1,"ion-padding"],[1,"modal-wrapper"],[1,"calendar-card","ion-margin-bottom"],[1,"date-range-inputs"],[1,"date-input",3,"click"],[1,"value-box"],["name","calendar-outline"],["class","picker-container",4,"ngIf"],[1,"summary-info","ion-margin-bottom"],[1,"days-badge"],["name","time-outline"],[1,"form-container"],[1,"input-label"],["placeholder","Please provide a brief reason for working from home...","rows","4",1,"custom-textarea",3,"ngModelChange","ngModel"],[1,"submit-action"],["expand","block",1,"primary-btn",3,"click","disabled"],["name","crescent","slot","start",4,"ngIf"],[1,"picker-container"],["presentation","date",3,"ionChange","min","value"],["slot","title"],["name","crescent","slot","start"]],template:function(o,s){o&1&&(_(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),C(3,"Request Work from Home"),b(),_(4,"ion-buttons",2)(5,"ion-button",3),Y("click",function(){return s.close()}),A(6,"ion-icon",4),b()()()(),_(7,"ion-content",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"div",9),Y("click",function(){return s.openPicker("from")}),_(12,"label"),C(13,"From Date"),b(),_(14,"div",10),A(15,"ion-icon",11),_(16,"span"),C(17),Q(18,"date"),b()()(),_(19,"div",9),Y("click",function(){return s.openPicker("to")}),_(20,"label"),C(21,"To Date"),b(),_(22,"div",10),A(23,"ion-icon",11),_(24,"span"),C(25),Q(26,"date"),b()()()(),F(27,Ou,4,3,"div",12),b(),_(28,"div",13)(29,"div",14),A(30,"ion-icon",15),_(31,"span"),C(32,"Total Duration: "),_(33,"strong"),C(34),b()()()(),_(35,"div",16)(36,"label",17),C(37,"Reason for Request"),b(),_(38,"ion-textarea",18),Ln("ngModelChange",function(r){return En(s.reason,r)||(s.reason=r),r}),b(),_(39,"div",19)(40,"ion-button",20),Y("click",function(){return s.submit()}),F(41,ku,1,0,"ion-spinner",21),C(42),b()()()()()),o&2&&(M(14),Ct("active",s.activePicker==="from"),M(3),H(lt(18,13,s.fromDate,"mediumDate")),M(5),Ct("active",s.activePicker==="to"),M(3),H(lt(26,16,s.toDate,"mediumDate")),M(2),S("ngIf",s.activePicker),M(7),Jt("",s.totalDays," ",s.totalDays>1?"Days":"Day"),M(4),In("ngModel",s.reason),M(2),S("disabled",s.loading||!s.reason.trim()||s.totalDays<.5),M(),S("ngIf",s.loading),M(),q(" ",s.loading?"Submitting Request...":"Send Request"," "))},dependencies:[kt,ee,ne,oe,gs,se,Ot,re,jn,ce,le,hs,Bn,wt,vt,He,Fn,zn,te],styles:[`

.modal-wrapper[_ngcontent-%COMP%] {
  padding: 8px 0;
}
.calendar-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}
.date-range-inputs[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;
}
.date-input[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 6px;
  padding-left: 4px;
}
.date-input[_ngcontent-%COMP%]   .value-box[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  color: #1e293b;
  transition: all 0.2s;
}
.date-input[_ngcontent-%COMP%]   .value-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1870B9;
  font-size: 18px;
}
.date-input[_ngcontent-%COMP%]   .value-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
}
.date-input[_ngcontent-%COMP%]   .value-box.active[_ngcontent-%COMP%] {
  border-color: #1870B9;
  box-shadow: 0 0 0 3px rgba(24, 112, 185, 0.1);
}
.picker-container[_ngcontent-%COMP%] {
  margin-top: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}
.summary-info[_ngcontent-%COMP%]   .days-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f1f5f9;
  border-radius: 20px;
  color: #475569;
  font-size: 14px;
}
.summary-info[_ngcontent-%COMP%]   .days-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #1870B9;
}
.input-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8px;
}
.custom-textarea[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 15px;
}
.primary-btn[_ngcontent-%COMP%] {
  --background: #1870B9;
  --border-radius: 12px;
  --height: 52px;
  height: 52px;
  font-weight: 600;
}`]});let e=i;return e})();var Su=["attendanceChart"];function Du(e,i){e&1&&A(0,"ion-menu-button")}function Tu(e,i){if(e&1){let t=Mt();_(0,"ion-button",68),Y("click",function(){ft(t);let o=I();return ut(o.goBack())}),A(1,"ion-icon",69),b()}}function Au(e,i){if(e&1&&(_(0,"div",70)(1,"div",71),we(),_(2,"svg",72),A(3,"circle",73)(4,"line",74)(5,"line",75)(6,"line",76)(7,"line",77)(8,"line",78)(9,"line",79)(10,"line",80)(11,"line",81),b()(),Oe(),_(12,"span",82),C(13),Q(14,"timeFormat"),Q(15,"timeFormat"),b()()),e&2){let t=I();M(13),Jt("Shift : ",Ht(14,2,t.shift_policy.start_time)," - ",Ht(15,4,t.shift_policy.end_time))}}function Iu(e,i){if(e&1&&(_(0,"div",83),A(1,"div",84),_(2,"span",85),C(3),Q(4,"date"),b()()),e&2){let t=i.$implicit,n=I();M(),S("ngClass",n.getDayCapsuleClass(t)),M(2),H(lt(4,2,t,"EE"))}}function Eu(e,i){e&1&&(_(0,"div",86)(1,"p",87),C(2,"You have not check-in"),b(),_(3,"p",88),C(4,"Yourself as present today!"),b()())}function Lu(e,i){e&1&&(_(0,"div",86)(1,"p",87),C(2,"You are clocked in"),b(),_(3,"p",88),C(4,"Have a productive day!"),b()())}function Ru(e,i){if(e&1){let t=Mt();_(0,"div",89)(1,"app-clock-button",90),Y("statusChanged",function(o){ft(t);let s=I();return ut(s.onClockStatusChanged(o))}),b()()}}function Fu(e,i){if(e&1){let t=Mt();_(0,"div",91)(1,"button",92),Y("click",function(){ft(t);let o=I();return ut(o.openRemoteClockinModal())}),we(),_(2,"svg",38),A(3,"path",93)(4,"path",94)(5,"path",95)(6,"line",96),b(),Oe(),_(7,"span"),C(8,"Remote"),b()(),_(9,"button",92),Y("click",function(){ft(t);let o=I();return ut(o.wfhClockIn())}),we(),_(10,"svg",38),A(11,"path",97)(12,"polyline",98),b(),Oe(),_(13,"span"),C(14,"WFH"),b()(),_(15,"button",99),Y("click",function(){ft(t);let o=I();return ut(o.openWFHModal())}),we(),_(16,"svg",38),A(17,"circle",100)(18,"line",101)(19,"path",102),b(),Oe(),_(20,"span"),C(21,"WFH Request"),b()()()}if(e&2){let t=I();M(),S("disabled",t.clockButton==null?null:t.clockButton.isClockedIn),M(8),S("disabled",t.clockButton==null?null:t.clockButton.isClockedIn)}}function zu(e,i){if(e&1&&(_(0,"div"),A(1,"app-attendance-log",103),b()),e&2){let t=I();M(),S("refreshTrigger",t.attendanceRefresh)("employeeId",t.viewEmployeeId)("isHRView",t.isHRView)}}function Bu(e,i){e&1&&(_(0,"div"),A(1,"app-calendar"),b())}function Hu(e,i){e&1&&(_(0,"div"),A(1,"app-attendance-request"),b())}Di.register(...Ar);var Tg=(()=>{let i=class i{constructor(n,o,s,a,r,c,l,d,h){this.attendanceService=n,this.attendanceApi=o,this.adminService=s,this.employeeService=a,this.toastCtrl=r,this.leaveService=c,this.modalCtrl=l,this.route=d,this.navCtrl=h,this.destroy$=new An,this.attendanceRefresh=0,this.lateMinutes=0,this.totalBreakMinutes=0,this.effectiveMinutes=0,this.grossMinutes=0,this.allShiftPolicies=[],this.allWeekendPolicies=[],this.serverWeekOff=[],this.shiftDuration="9h 0m",this.breakMinutes=60,this.effectiveHours="00:00",this.grossHours="00:00",this.status="NOT In Yet",this.activeTab="log",this.progressValue=.85,this.workTimeTimer="00:00:00",this.shiftTimeLeft="10m06s",this.gaugeDashOffset="251.3",this.previousDayHours="9h 20m 30s",this.days=[],this.today=new Date,this.currentMonthName="",this.monthlySummary={total_days:0,present_days:0,absent_days:0,half_days:0,lop_days:0,avg_work_hours:0,total_effective_hours:0,total_gross_hours:0},this.lastAttendance=[],this.lastLeaves=[],this.isHRView=!1,this.viewEmployeeId=null,this.generateDays()}ngOnInit(){this.route.params.subscribe(n=>{n.id&&(this.viewEmployeeId=Number(n.id),this.isHRView=!0),this.loadAllData()})}loadAllData(){this.loadShiftPolicies(),this.loadWeekendPolicies(),this.loadEmployeeProfile(),this.loadTodayAttendance(),this.loadMonthlySummary()}ionViewWillEnter(){this.loadTodayAttendance(),this.loadMonthlySummary()}loadShiftPolicies(){this.adminService.getShiftPolicies().subscribe(n=>{this.allShiftPolicies=n||[],this.matchEmployeeShift()})}goBack(){this.navCtrl.back()}loadWeekendPolicies(){this.adminService.getWeeklyOffPolicies().subscribe(n=>{this.allWeekendPolicies=n||[],this.matchEmployeeWeekend()})}loadEmployeeProfile(){(this.viewEmployeeId?this.employeeService.getEmployeeById(this.viewEmployeeId):this.employeeService.getMyProfile()).subscribe(o=>{o&&(this.shift_id=o.shift_policy_id||o.ShiftPolicyId,this.weekend_id=o.weekly_off_policy_id||o.WeeklyOffPolicyId,this.matchEmployeeShift(),this.matchEmployeeWeekend())})}loadTodayAttendance(){this.attendanceApi.getTodayAttendance(!0).subscribe({next:n=>{this.status=n?.attendance?.status||"NOT In Yet";let o=n?.punches||[],s=new kn;if(n?.attendance){let a=parseFloat(n.attendance.gross_hours||0),r=parseFloat(n.attendance.total_work_hours||0);if(n.last_punch_type==="in"&&o.length>0){let c=o[o.length-1],l=new Date(c.punch_time).getTime(),d=new Date().getTime(),h=(d-l)/(1e3*60*60);r+=h;let f=o[0];a=(d-new Date(f.punch_time).getTime())/(1e3*60*60)}if(this.grossHours=s.transform(a),this.effectiveHours=s.transform(r),this.grossMinutes=Math.round(a*60),this.effectiveMinutes=Math.round(r*60),this.shift_policy&&o.length>0){let c=new Date(o[0].punch_time),l=this.shift_policy.start_time,[d,h]=l.split(":").map(Number),f=new Date(c);f.setHours(d,h,0,0),c>f?this.lateMinutes=Math.max(0,Math.round((c.getTime()-f.getTime())/6e4)):this.lateMinutes=0}this.createTimelineData(o),this.startLiveTimer(o,n.last_punch_type)}else this.grossHours="00:00",this.effectiveHours="00:00",this.lateMinutes=0,this.totalBreakMinutes=0,this.createTimelineData([]),this.startLiveTimer([],"")},error:()=>{this.status="NOT In Yet",this.grossHours="00:00",this.effectiveHours="00:00",this.lateMinutes=0,this.totalBreakMinutes=0,this.createTimelineData([]),this.startLiveTimer([],"")}})}createTimelineData(n){if(!n||n.length===0){this.chart&&this.chart.destroy();return}let o=[],s=[],a=[],r=0;for(let c=0;c<n.length;c++){let l=n[c],d=new Date(l.punch_time).getTime();if(l.punch_type==="in"){let h=n[c+1],u=((h?new Date(h.punch_time).getTime():Date.now())-d)/6e4;s.push(Math.round(u)),o.push(`In: ${new Date(d).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`)}else if(l.punch_type==="out"){let h=n[c+1];if(h){let u=(new Date(h.punch_time).getTime()-d)/6e4;r+=u,a.push(Math.round(u))}}}this.totalBreakMinutes=Math.round(r),this.updateChart(Math.round(s.reduce((c,l)=>c+l,0)),this.totalBreakMinutes)}ngAfterViewInit(){}updateChart(n,o){if(!this.attendanceChartCanvas)return;let s=this.attendanceChartCanvas.nativeElement.getContext("2d");if(!s)return;this.chart&&this.chart.destroy();let a=this.lateMinutes||0,r=n+o+a>0,c=f=>{if(f<60)return`${f}m`;let u=Math.floor(f/60),g=Math.round(f%60);return`${u}h ${g}m`},h={type:"doughnut",data:{labels:["Late","Effective","Break"],datasets:[{data:r?[a,n,o]:[0,0,1],backgroundColor:r?["#f59e0b","#06b6d4","#ec4899"]:["#f1f5f9"],hoverBackgroundColor:r?["#d97706","#0891b2","#db2777"]:["#e2e8f0"],borderWidth:2,borderColor:"#ffffff",cutout:"75%",borderRadius:10}]},plugins:[{id:"centerText",afterDatasetsDraw:f=>{let{ctx:u,chartArea:{top:g,left:p,width:m,height:x}}=f;u.save(),u.textAlign="center",u.textBaseline="middle";let y=p+m/2,v=g+x/2;u.font='bold 24px "Inter", sans-serif',u.fillStyle="#1e293b",u.fillText(this.grossHours||"00:00",y,v-5),u.font='700 10px "Inter", sans-serif',u.fillStyle="#64748b",u.fillText("GROSS HRS",y,v+18),u.restore()}}],options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{boxWidth:8,usePointStyle:!0,padding:12,color:"#475569",font:{size:10,weight:"700"}}},tooltip:{enabled:r,backgroundColor:"#ffffff",titleColor:"#1e293b",bodyColor:"#475569",borderColor:"#e2e8f0",borderWidth:1,padding:12,boxPadding:4,cornerRadius:10,callbacks:{label:f=>` ${f.label}: ${c(f.raw)}`}}}}};this.chart=new Di(s,h)}loadMonthlySummary(){let n=new Date,o=n.getFullYear(),s=n.getMonth()+1,a=`${o}-${s.toString().padStart(2,"0")}-01`,r=new Date(o,s,0).getDate(),c=`${o}-${s.toString().padStart(2,"0")}-${r}`;this.currentMonthName=n.toLocaleString("default",{month:"long"}),(this.viewEmployeeId?this.attendanceApi.getEmployeeReport(this.viewEmployeeId,{startDate:a,endDate:c,month:s,year:o}):this.attendanceApi.getMonthlyReport({startDate:a,endDate:c,month:s,year:o})).subscribe({next:d=>{d?.summary&&(this.monthlySummary=d.summary,this.lastAttendance=d?.attendance||[],this.calculatePreviousDayHours())},error:d=>console.error("Error loading monthly summary:",d)})}calculatePreviousDayHours(){if(!this.lastAttendance||this.lastAttendance.length===0){this.previousDayHours="9h 20m 30s";return}let n=new Date().toISOString().split("T")[0],o=this.lastAttendance.find(s=>s.date&&s.date!==n);if(o&&o.total_work_hours){let s=parseFloat(o.total_work_hours),a=Math.floor(s),r=Math.floor((s-a)*60),c=Math.round(((s-a)*60-r)*60);this.previousDayHours=`${a}h ${r}m ${c}s`}else this.previousDayHours="9h 20m 30s"}getDayCapsuleClass(n){if(this.isToday(n))return"is-today";if(this.isWeekOffDay(n))return"is-weekoff";let o=n.toISOString().split("T")[0],s=this.lastAttendance.find(a=>a.date===o);return s&&s.status==="Present","is-present"}isClockedIn(){return this.clockButton?.isClockedIn||!1}toggleClock(){this.clockButton&&(this.clockButton.isClockedIn?this.clockButton.clockOut():this.clockButton.clockIn("Office"))}startLiveTimer(n,o){this.timerInterval&&clearInterval(this.timerInterval);let s=()=>{let a=o==="in",r=0;for(let g=0;g<n.length;g+=2){let p=n[g],m=n[g+1];if(p){let x=new Date(p.punch_time).getTime(),y=m?new Date(m.punch_time).getTime():Date.now();r+=y-x}}let c=Math.floor(r/1e3),l=Math.floor(c/3600),d=Math.floor(c%3600/60),h=c%60;this.workTimeTimer=`${l.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`;let f=9*3600,u=Math.min(1,c/f);if(this.progressValue=u,this.gaugeDashOffset=(251.3*(1-u)).toFixed(1),a){let g=Math.max(0,f-c),p=Math.floor(g/3600),m=Math.floor(g%3600/60),x=g%60;this.shiftTimeLeft=`${p}h ${m}m ${x}s`}else if(this.shift_policy){let[g,p]=this.shift_policy.start_time.split(":").map(Number),m=new Date;if(m.setHours(g,p,0,0),Date.now()<m.getTime()){let x=Math.floor((m.getTime()-Date.now())/1e3),y=Math.floor(x/60),v=x%60;this.shiftTimeLeft=`${y}m${v.toString().padStart(2,"0")}s`}else this.shiftTimeLeft="10m06s"}else this.shiftTimeLeft="10m06s"};s(),this.timerInterval=setInterval(s,1e3)}ngOnDestroy(){this.timerInterval&&clearInterval(this.timerInterval),this.destroy$.next(),this.destroy$.complete()}matchEmployeeShift(){!this.shift_id||!this.allShiftPolicies.length||(this.shift_policy=this.allShiftPolicies.find(n=>n.id===this.shift_id))}matchEmployeeWeekend(){if(!this.weekend_id||!this.allWeekendPolicies.length)return;let n=this.allWeekendPolicies.find(s=>s.id===this.weekend_id);if(!n)return;let o=[{key:"sunday_off",label:"sunday"},{key:"monday_off",label:"monday"},{key:"tuesday_off",label:"tuesday"},{key:"wednesday_off",label:"wednesday"},{key:"thursday_off",label:"thursday"},{key:"friday_off",label:"friday"},{key:"saturday_off",label:"saturday"}];this.serverWeekOff=o.filter(s=>n[s.key]===1).map(s=>s.label)}trackByDate(n,o){return o.toDateString()}wfhClockIn(){this.attendanceApi.checkTodayWFH().subscribe({next:n=>{if(!n?.has_wfh){this.showToast("WFH not approved for today","warning");return}this.attendanceApi.apiPunchIn({work_mode:"WFH",location:"Home",notes:"WFH Clock-In"}).subscribe({next:()=>{this.showToast("WFH Clock-In successful","success"),this.loadTodayAttendance(),this.clockButton&&(this.clockButton.workMode="WFH",this.clockButton.isClockedIn=!0),this.attendanceRefresh=Date.now()},error:o=>this.showToast(o?.error?.message||"WFH Clock-In failed","danger")})},error:()=>this.showToast("WFH check failed","danger")})}openRemoteClockinModal(){return mt(this,null,function*(){let n=yield this.modalCtrl.create({component:Fr,cssClass:"side-custom-popup team-popup",backdropDismiss:!1});return n.onDidDismiss().then(o=>{o.data?.success&&(this.loadTodayAttendance(),this.attendanceRefresh=Date.now())}),yield n.present()})}openWFHModal(){return mt(this,null,function*(){let n=yield this.modalCtrl.create({component:zr,cssClass:"side-custom-popup team-popup",backdropDismiss:!1});return n.onDidDismiss().then(o=>{o.role==="success"&&(this.attendanceRefresh=Date.now())}),yield n.present()})}generateDays(){let n=new Date,o=n.getDay(),s=n.getDate()-o+(o===0?-6:1),a=new Date(n.setDate(s));this.days=[];for(let r=0;r<7;r++){let c=new Date(a);c.setDate(a.getDate()+r),this.days.push(c)}}isToday(n){return n.toDateString()===this.today.toDateString()}isWeekOffDay(n){let o=n.toLocaleDateString("en-US",{weekday:"long"}).toLowerCase();return(this.serverWeekOff?.length>0?this.serverWeekOff:["saturday","sunday"]).includes(o)}onClockStatusChanged(n){this.attendanceRefresh=Date.now(),this.loadTodayAttendance(),this.loadMonthlySummary()}setTab(n){this.activeTab=n,n==="log"&&(this.attendanceRefresh=Date.now())}showToast(n,o){return mt(this,null,function*(){yield(yield this.toastCtrl.create({message:n,duration:2500,position:"top",color:o})).present()})}};i.\u0275fac=function(o){return new(o||i)(V(qn),V(he),V(Yn),V($n),V(de),V(Un),V(Ne),V(ls),V(ds))},i.\u0275cmp=Pt({type:i,selectors:[["app-me"]],viewQuery:function(o,s){if(o&1&&(Ei(Fi,5),Ei(Su,5)),o&2){let a;Li(a=Ri())&&(s.clockButton=a.first),Li(a=Ri())&&(s.attendanceChartCanvas=a.first)}},decls:135,vars:49,consts:[[3,"translucent"],["slot","start"],[4,"ngIf"],[3,"click",4,"ngIf"],[3,"fullscreen"],[1,"ion-no-padding"],[1,"dashboard"],[1,"attendance-block"],["size","12","size-sm","12","size-md","6","size-lg","4","size-xl","4"],[1,"attendance-status"],[1,"today-status"],[3,"ngClass"],[1,"monthly-stats"],["size","3",1,"text-center"],[1,"stat-label"],[1,"stat-value","text-success"],[1,"stat-value","text-danger"],[1,"stat-value","text-info"],[1,"stat-value","text-warning"],[1,"today-summary"],[1,"label-box"],[1,"l-l"],[1,"l-v"],[1,"timings-card-new"],[1,"timings-header-row"],[1,"timings-title"],[1,"date-badge"],[1,"timings-body"],["class","shift-row-new",4,"ngIf"],[1,"days-row-capsules"],["class","day-capsule-item",4,"ngFor","ngForOf","ngForTrackBy"],[1,"today-progress-section"],[1,"today-progress-label"],[1,"progress-bar-container-new"],[1,"progress-bar-fill-new"],[1,"progress-footer-new"],[1,"duration-text"],[1,"break-text"],["viewBox","0 0 24 24","width","14","height","14","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",2,"margin-right","4px","vertical-align","middle"],["d","M18 8h1a4 4 0 0 1 0 8h-1"],["d","M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"],["x1","6","y1","1","x2","6","y2","4"],["x1","10","y1","1","x2","10","y2","4"],["x1","14","y1","1","x2","14","y2","4"],["size","12","size-sm","12","size-md","12","size-lg","4","size-xl","4"],[1,"today-actions-card"],[1,"today-card-grid"],[1,"today-left-col"],["class","status-msg-box",4,"ngIf"],["src","../../../../assets/Biometric.png","alt","Biometric","width","45px","height","45px"],[1,"time-left-box"],[1,"tl-label"],[1,"tl-value"],["class","main-clock-btn-wrapper",4,"ngIf"],["class","pills-row",4,"ngIf"],[1,"today-right-col"],[1,"gauge-container"],[1,"gauge-wrapper"],["viewBox","0 0 100 100",1,"gauge-svg"],["cx","50","cy","50","r","40",1,"gauge-bg"],["cx","50","cy","50","r","40",1,"gauge-fill"],[1,"gauge-text-box"],[1,"gauge-timer"],[1,"gauge-label"],[1,"prev-day-box"],[1,"prev-day-text"],[1,"attendance-log-card"],[1,"tabs-container","custom-tabs"],[3,"click"],["slot","icon-only","name","arrow-back-outline"],[1,"shift-row-new"],[1,"shift-icon-box"],["viewBox","0 0 24 24","width","18","height","18","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["cx","12","cy","12","r","5"],["x1","12","y1","1","x2","12","y2","3"],["x1","12","y1","21","x2","12","y2","23"],["x1","4.22","y1","4.22","x2","5.64","y2","5.64"],["x1","18.36","y1","18.36","x2","19.78","y2","19.78"],["x1","1","y1","12","x2","3","y2","12"],["x1","21","y1","12","x2","23","y2","12"],["x1","4.22","y1","19.78","x2","5.64","y2","18.36"],["x1","18.36","y1","5.64","x2","19.78","y2","4.22"],[1,"shift-text-label"],[1,"day-capsule-item"],[1,"day-capsule",3,"ngClass"],[1,"day-label"],[1,"status-msg-box"],[1,"status-main"],[1,"status-sub"],[1,"main-clock-btn-wrapper"],[3,"statusChanged"],[1,"pills-row"],[1,"pill-btn","outlined",3,"click","disabled"],["d","M5 12.55a11 11 0 0 1 14.08 0"],["d","M1.42 9a16 16 0 0 1 21.16 0"],["d","M8.53 16.11a6 6 0 0 1 6.95 0"],["x1","12","y1","20","x2","12.01","y2","20"],["d","M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],["points","9 22 9 12 15 12 15 22"],[1,"pill-btn","outlined",3,"click"],["cx","12","cy","12","r","10"],["x1","2","y1","12","x2","22","y2","12"],["d","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],[3,"refreshTrigger","employeeId","isHRView"]],template:function(o,s){o&1&&(_(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),F(3,Du,1,0,"ion-menu-button",2)(4,Tu,2,0,"ion-button",3),b(),_(5,"ion-title"),C(6),b()()(),_(7,"ion-content",4)(8,"ion-grid",5)(9,"div",6)(10,"ion-row",7)(11,"ion-col",8)(12,"ion-card",9)(13,"ion-card-header")(14,"ion-card-title"),C(15),b()(),_(16,"ion-card-content")(17,"div",10),C(18," Status today: "),_(19,"ion-badge",11),C(20),b()(),_(21,"div",12)(22,"ion-row")(23,"ion-col",13)(24,"p",14),C(25,"Present"),b(),_(26,"p",15),C(27),b()(),_(28,"ion-col",13)(29,"p",14),C(30,"Absent"),b(),_(31,"p",16),C(32),b()(),_(33,"ion-col",13)(34,"p",14),C(35,"Leaves"),b(),_(36,"p",17),C(37),b()(),_(38,"ion-col",13)(39,"p",14),C(40,"LOP"),b(),_(41,"p",18),C(42),b()()()(),_(43,"div",19)(44,"div",20)(45,"span",21),C(46,"Today:"),b()(),_(47,"div",20)(48,"span",21),C(49,"Gross:"),b(),_(50,"span",22),C(51),b()(),_(52,"div",20)(53,"span",21),C(54,"Effective:"),b(),_(55,"span",22),C(56),b()()()()()(),_(57,"ion-col",8)(58,"ion-card",23)(59,"div",24)(60,"span",25),C(61,"Timings"),b(),_(62,"span",26),C(63),Q(64,"date"),b()(),_(65,"div",27),F(66,Au,16,6,"div",28),_(67,"div",29),F(68,Iu,5,5,"div",30),b(),_(69,"div",31)(70,"p",32),C(71),Q(72,"timeFormat"),Q(73,"timeFormat"),b(),_(74,"div",33),A(75,"div",34),b(),_(76,"div",35)(77,"span",36),C(78),b(),_(79,"span",37),we(),_(80,"svg",38),A(81,"path",39)(82,"path",40)(83,"line",41)(84,"line",42)(85,"line",43),b(),C(86),b()()()()()(),Oe(),_(87,"ion-col",44)(88,"ion-card",45)(89,"ion-card-header")(90,"ion-card-title"),C(91,"Today"),b()(),_(92,"ion-card-content")(93,"div",46)(94,"div",47),F(95,Eu,5,0,"div",48)(96,Lu,5,0,"div",48),_(97,"div"),A(98,"img",49),b(),_(99,"div",50)(100,"span",51),C(101,"Time Left : "),b(),_(102,"span",52),C(103),b()(),F(104,Ru,2,0,"div",53)(105,Fu,22,2,"div",54),b(),_(106,"div",55)(107,"div",56)(108,"div",57),we(),_(109,"svg",58),A(110,"circle",59)(111,"circle",60),b(),Oe(),_(112,"div",61)(113,"span",62),C(114),b(),_(115,"span",63),C(116,"Work Time"),b()()(),_(117,"div",64)(118,"span",65),C(119,"Previous Day : "),_(120,"strong"),C(121),b()()()()()()()()()()()(),_(122,"div",66)(123,"h2"),C(124,"Logs & Requests"),b(),_(125,"div",67)(126,"button",68),Y("click",function(){return s.setTab("log")}),C(127," Attendance Log "),b(),_(128,"button",68),Y("click",function(){return s.setTab("calendar")}),C(129," Calendar "),b(),_(130,"button",68),Y("click",function(){return s.setTab("requests")}),C(131," Attendance Requests "),b()(),F(132,zu,2,3,"div",2)(133,Bu,2,0,"div",2)(134,Hu,2,0,"div",2),b()()),o&2&&(S("translucent",!0),M(3),S("ngIf",!s.isHRView),M(),S("ngIf",s.isHRView),M(2),H(s.isHRView?"Employee Attendance":"My Attendance"),M(),S("fullscreen",!0),M(8),q("Attendance Status - ",s.currentMonthName),M(4),S("ngClass",s.status?s.status.toLowerCase().split(" ").join("-").replace("(","").replace(")",""):""),M(),q(" ",s.status," "),M(7),H(s.monthlySummary.present_days),M(5),H(s.monthlySummary.absent_days),M(5),H(s.monthlySummary.leave_days),M(5),H(s.monthlySummary.lop_days),M(9),H(s.grossHours),M(5),H(s.effectiveHours),M(7),q("Date: ",lt(64,42,s.today,"dd-MM-yyyy")),M(3),S("ngIf",s.shift_policy),M(2),S("ngForOf",s.days)("ngForTrackBy",s.trackByDate),M(3),Jt("Today ( ",Ht(72,45,s.shift_policy==null?null:s.shift_policy.start_time)," - ",Ht(73,47,s.shift_policy==null?null:s.shift_policy.end_time)," )"),M(4),ze("width",s.progressValue*100||0,"%"),M(3),q("Duration : ",s.shiftDuration||"9hours"),M(8),q(" ",s.breakMinutes||60,"mins "),M(9),S("ngIf",!(s.clockButton!=null&&s.clockButton.isClockedIn)),M(),S("ngIf",s.clockButton==null?null:s.clockButton.isClockedIn),M(7),H(s.shiftTimeLeft||"10m06s"),M(),S("ngIf",!s.isHRView),M(),S("ngIf",!s.isHRView),M(6),ze("stroke-dashoffset",s.gaugeDashOffset),M(3),H(s.workTimeTimer||"00:00:00"),M(7),H(s.previousDayHours||"9h 20m 30s"),M(5),Ct("active",s.activeTab==="log"),M(2),Ct("active",s.activeTab==="calendar"),M(2),Ct("active",s.activeTab==="requests"),M(2),S("ngIf",s.activeTab==="log"),M(),S("ngIf",s.activeTab==="calendar"),M(),S("ngIf",s.activeTab==="requests"))},dependencies:[kt,fs,ee,ne,Hn,Wn,Nn,Vn,ie,oe,We,se,Ot,ps,ae,ce,le,wt,Zt,Qt,vt,Fi,Ir,Er,Rr,te,kn],styles:[`

[_ngcontent-%COMP%]:root {
  --ion-color-primary: #1F74BB;
  --ion-color-primary-rgb:
    26,
    95,
    168;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-primary-shade: #1F74BB;
  --ion-color-primary-tint: #175191;
  --ion-color-secondary: #334155;
  --ion-color-secondary-rgb:
    51,
    65,
    85;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-secondary-shade: #1e293b;
  --ion-color-secondary-tint: #475569;
  --ion-color-tertiary: #4f46e5;
  --ion-color-tertiary-rgb:
    79,
    70,
    229;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-tertiary-shade: #4338ca;
  --ion-color-tertiary-tint: #6366f1;
  --ion-color-success: #16a34a;
  --ion-color-success-rgb:
    22,
    163,
    74;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb:
    255,
    255,
    255;
  --ion-color-success-shade: #15803d;
  --ion-color-success-tint: #22c55e;
  --ion-color-warning: #d97706;
  --ion-color-warning-rgb:
    217,
    119,
    6;
  --ion-color-warning-contrast: #ffffff;
  --ion-color-warning-contrast-rgb:
    255,
    255,
    255;
  --ion-color-warning-shade: #b45309;
  --ion-color-warning-tint: #f59e0b;
  --ion-color-danger: #dc2626;
  --ion-color-danger-rgb:
    220,
    38,
    38;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb:
    255,
    255,
    255;
  --ion-color-danger-shade: #b91c1c;
  --ion-color-danger-tint: #ef4444;
  --ion-color-dark: #0f172a;
  --ion-color-dark-rgb:
    15,
    23,
    42;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb:
    255,
    255,
    255;
  --ion-color-dark-shade: #020617;
  --ion-color-dark-tint: #1e293b;
  --ion-color-medium: #94a3b8;
  --ion-color-medium-rgb:
    148,
    163,
    184;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb:
    255,
    255,
    255;
  --ion-color-medium-shade: #64748b;
  --ion-color-medium-tint: #cbd5e1;
  --ion-color-light: #ffffff;
  --ion-color-light-rgb:
    255,
    255,
    255;
  --ion-color-light-contrast: #0f172a;
  --ion-color-light-contrast-rgb:
    15,
    23,
    42;
  --ion-color-light-shade: #f1f5f9;
  --ion-color-light-tint: #f8fafc;
  --ion-bg-color: #f4f7fb;
  --ion-bg-primary: #ffffff;
  --ion-text-color: #0f172a;
  --ion-border-color: #ABABAB;
  --ion-subtle-text: #64748b;
  --ion-white-color: #ffffff;
  --ion-side-bar-color: #0f2b4a;
  --ion-bg-color-primary: #ffffff;
  --clr-primary: #1F74BB;
  --clr-primary-light: #e8f0fb;
  --clr-primary-xlight: #f0f5ff;
  --clr-secondary: #334155;
  --clr-indigo: #4f46e5;
  --clr-success: #16a34a;
  --clr-success-bg: #f0fdf4;
  --clr-warning: #d97706;
  --clr-warning-bg: #fffbeb;
  --clr-danger: #dc2626;
  --clr-danger-bg: #fef2f2;
  --clr-info: #0284c7;
  --clr-info-bg: #f0f9ff;
  --clr-text: #0f172a;
  --clr-text-muted: #475569;
  --clr-text-subtle: #64748b;
  --clr-border: #ABABAB;
  --clr-border-light: #f1f5f9;
  --clr-bg-page: #f4f7fb;
  --clr-bg-card: #ffffff;
  --clr-bg-surface: #ffffff;
  --clr-bg-subtle: #f8fafc;
  --clr-sidebar: #0f2b4a;
  --clr-cosmic-bg: #0f2b4a;
  --clr-cosmic-card: #0d2240;
  --clr-neon-cyan: #38bdf8;
  --clr-neon-magenta: #818cf8;
  --clr-neon-blue: #1F74BB;
}
[_ngcontent-%COMP%]:root {
  font-size: 16px;
}
@media screen and (min-width: 1440px) {
  [_ngcontent-%COMP%]:root {
    font-size: 17px;
  }
}
@media screen and (max-width: 1280px) {
  [_ngcontent-%COMP%]:root {
    font-size: 15px;
  }
}
@media screen and (max-width: 1024px) {
  [_ngcontent-%COMP%]:root {
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  [_ngcontent-%COMP%]:root {
    font-size: 14px;
  }
}
@media screen and (max-width: 576px) {
  [_ngcontent-%COMP%]:root {
    font-size: 13px;
  }
}
body[_ngcontent-%COMP%] {
  font-family: "Inter";
  color: #0f172a;
  background-color: #f4f7fb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.dashboard[_ngcontent-%COMP%] {
  background: #f4f7fb;
  padding: 32px 24px;
  gap: 24px;
  padding-bottom: 0;
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%] {
  margin-bottom: 32px;
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  margin: -12px;
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  background: #ffffff;
  margin: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 380px;
  overflow: hidden;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  padding: 24px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
  text-align: left;
  text-transform: uppercase;
}
.dashboard[_ngcontent-%COMP%]   .attendance-block[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.dashboard[_ngcontent-%COMP%]   .days-grid[_ngcontent-%COMP%] {
  padding: 0;
}
ion-progress-bar[_ngcontent-%COMP%] {
  height: 8px;
  border-radius: 9999px;
  --background: #f1f5f9 !important;
  --progress-background: #1F74BB !important;
  margin-top: 12px;
  margin-bottom: 12px;
  box-shadow: none;
}
.attendance-status[_ngcontent-%COMP%] {
  padding-bottom: 0;
}
.attendance-status[_ngcontent-%COMP%]   .today-status[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}
.attendance-status[_ngcontent-%COMP%]   .today-status[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {
  padding: 6px 14px;
  font-size: 11px;
  border-radius: 9999px;
  margin-left: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.attendance-status[_ngcontent-%COMP%]   .today-status[_ngcontent-%COMP%]   ion-badge.present[_ngcontent-%COMP%] {
  background: #f0fdf4 !important;
  color: #16a34a !important;
  border: 1px solid #bbf7d0;
}
.attendance-status[_ngcontent-%COMP%]   .today-status[_ngcontent-%COMP%]   ion-badge.absent[_ngcontent-%COMP%] {
  background: #fef2f2 !important;
  color: #dc2626 !important;
  border: 1px solid #fecaca;
}
.attendance-status[_ngcontent-%COMP%]   .today-status[_ngcontent-%COMP%]   ion-badge.not-in-yet[_ngcontent-%COMP%] {
  background: #fffbeb !important;
  color: #d97706 !important;
  border: 1px solid #fde68a;
}
.attendance-status[_ngcontent-%COMP%]   .today-status[_ngcontent-%COMP%]   ion-badge.leave[_ngcontent-%COMP%] {
  background: #e8f0fb !important;
  color: #1F74BB !important;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  margin-bottom: auto;
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  margin-bottom: 6px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%]   .text-success[_ngcontent-%COMP%] {
  color: #16a34a;
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%]   .text-danger[_ngcontent-%COMP%] {
  color: #dc2626;
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%]   .text-info[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.attendance-status[_ngcontent-%COMP%]   .monthly-stats[_ngcontent-%COMP%]   .text-warning[_ngcontent-%COMP%] {
  color: #d97706;
}
.attendance-status[_ngcontent-%COMP%]   .today-summary[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0;
  border-top: 1px solid #f1f5f9;
  margin-top: 20px;
}
.attendance-status[_ngcontent-%COMP%]   .today-summary[_ngcontent-%COMP%]   .label-box[_ngcontent-%COMP%] {
  text-align: center;
  flex: 1;
}
.attendance-status[_ngcontent-%COMP%]   .today-summary[_ngcontent-%COMP%]   .label-box[_ngcontent-%COMP%]   .l-l[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  display: block;
  margin-bottom: 6px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.attendance-status[_ngcontent-%COMP%]   .today-summary[_ngcontent-%COMP%]   .label-box[_ngcontent-%COMP%]   .l-v[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
}
.attendance-status[_ngcontent-%COMP%]   .today-summary[_ngcontent-%COMP%]   .label-box[_ngcontent-%COMP%]:not(:last-child) {
  border-right: 1px solid #f8fafc;
}
.cosmic-card-wrapper[_ngcontent-%COMP%] {
  position: relative;
  height: auto;
}
.cosmic-card-wrapper[_ngcontent-%COMP%]   .glow-flare[_ngcontent-%COMP%] {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  background:
    radial-gradient(
      circle,
      rgba(var(--ion-color-primary-rgb), 0.1) 0%,
      transparent 70%);
  z-index: 0;
  pointer-events: none;
  filter: blur(30px);
}
.premium-cosmic-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.95),
      rgba(243, 244, 246, 0.8)) !important;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.02) !important;
  height: auto !important;
  min-height: 420px !important;
  margin: 12px !important;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  overflow: visible !important;
  position: relative;
  z-index: 10;
  border-radius: 20px !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.08) !important;
  border-color: rgba(var(--ion-color-primary-rgb), 0.2) !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  background: transparent !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
  padding: 20px 24px !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.premium-cosmic-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .title-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #1F74BB;
  filter: drop-shadow(0 2px 4px rgba(var(--ion-color-primary-rgb), 0.2));
}
.premium-cosmic-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  color: #0f172a !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  margin: 0 !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 16px 20px !important;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .today-logs-status[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  margin-bottom: 8px;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .today-logs-status[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%] {
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  padding: 12px;
  overflow: hidden;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.01);
}
.premium-cosmic-card[_ngcontent-%COMP%]   .today-logs-status[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   .chart-glass-overlay[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 100%);
  pointer-events: none;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .today-logs-status[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   .chart-wrapper[_ngcontent-%COMP%] {
  height: 125px;
  position: relative;
  z-index: 1;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .clock-control[_ngcontent-%COMP%] {
  background: rgba(var(--ion-color-primary-rgb), 0.03);
  border-radius: 16px;
  padding: 6px;
  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .clock-control[_ngcontent-%COMP%]     .attendance-btn-container {
  padding: 0 !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .clock-control[_ngcontent-%COMP%]     .attendance-btn-container .modern-clock-btn {
  min-width: 160px !important;
  height: 48px !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 16px rgba(var(--ion-color-primary-rgb), 0.15) !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .clock-control[_ngcontent-%COMP%]     .attendance-btn-container .modern-clock-btn .btn-content {
  gap: 8px !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .clock-control[_ngcontent-%COMP%]     .attendance-btn-container .modern-clock-btn .btn-content ion-icon {
  font-size: 20px !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .clock-control[_ngcontent-%COMP%]     .attendance-btn-container .modern-clock-btn .btn-content .text {
  font-size: 14px !important;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%] {
  flex: 1;
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 12px 6px;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 70px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]   .btn-glow[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at center,
      rgba(var(--ion-color-primary-rgb), 0) 0%,
      transparent 70%);
  transition: all 0.4s ease;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #475569;
  transition: all 0.3s ease;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #475569;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]:hover:not([disabled]) {
  background: rgba(var(--ion-color-primary-rgb), 0.05);
  border-color: rgba(var(--ion-color-primary-rgb), 0.2);
  color: #1F74BB;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(var(--ion-color-primary-rgb), 0.1);
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]:hover:not([disabled])   ion-icon[_ngcontent-%COMP%] {
  transform: scale(1.1);
  color: #1F74BB;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]:hover:not([disabled])   span[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]:hover:not([disabled])   .btn-glow[_ngcontent-%COMP%] {
  background:
    radial-gradient(
      circle at center,
      rgba(var(--ion-color-primary-rgb), 0.1) 0%,
      transparent 70%);
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]:active:not([disabled]) {
  transform: scale(0.95);
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn[disabled][_ngcontent-%COMP%] {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f3f4f6;
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn.req[_ngcontent-%COMP%]:hover:not([disabled]) {
  border-color: #f472b6;
  background: rgba(244, 114, 182, 0.05);
}
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn.req[_ngcontent-%COMP%]:hover:not([disabled])   ion-icon[_ngcontent-%COMP%], 
.premium-cosmic-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .secondary-actions[_ngcontent-%COMP%]   .cosmic-action-btn.req[_ngcontent-%COMP%]:hover:not([disabled])   span[_ngcontent-%COMP%] {
  color: #f472b6;
}
app-clock-button[_ngcontent-%COMP%] {
  display: contents;
}
.premium-timings-card[_ngcontent-%COMP%] {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05) !important;
  color: #0f172a;
  height: auto !important;
  min-height: 420px !important;
  margin: 12px !important;
  overflow: visible !important;
  position: relative;
  border-radius: 20px !important;
}
.premium-timings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  background: #f8fafc !important;
  border-bottom: 1px solid #e2e8f0 !important;
  padding: 16px 24px !important;
}
.premium-timings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .header-flex[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.premium-timings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .header-flex[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #1F74BB;
}
.premium-timings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .header-flex[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  color: #0f172a !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  margin: 0 !important;
}
.premium-timings-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 24px !important;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.premium-timings-card[_ngcontent-%COMP%]   .shift-badge[_ngcontent-%COMP%] {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.premium-timings-card[_ngcontent-%COMP%]   .shift-badge[_ngcontent-%COMP%]   .pulse-dot[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  background: #16a34a;
  border-radius: 50%;
}
.premium-timings-card[_ngcontent-%COMP%]   .shift-badge[_ngcontent-%COMP%]   .shift-name[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 800;
  font-size: 13px;
}
.premium-timings-card[_ngcontent-%COMP%]   .shift-badge[_ngcontent-%COMP%]   .shift-hours[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  margin-left: auto;
  background: #ffffff;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .days-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .day-slot[_ngcontent-%COMP%] {
  flex: 1;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .day-slot[_ngcontent-%COMP%]   .day-name[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .day-slot.is-today[_ngcontent-%COMP%] {
  background: #1F74BB;
  border-color: #1F74BB;
  box-shadow: 0 4px 12px rgba(31, 116, 187, 0.25);
  transform: translateY(-2px);
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .day-slot.is-today[_ngcontent-%COMP%]   .day-name[_ngcontent-%COMP%] {
  color: #ffffff;
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .day-slot.is-today[_ngcontent-%COMP%]   .today-indicator[_ngcontent-%COMP%] {
  display: none;
}
.premium-timings-card[_ngcontent-%COMP%]   .days-grid-wrapper[_ngcontent-%COMP%]   .day-slot.is-weekoff[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-style: dashed;
  opacity: 0.6;
}
.premium-timings-card[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-labels[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.premium-timings-card[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-labels[_ngcontent-%COMP%]   .label-text[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #64748b;
  font-weight: 800;
  text-transform: uppercase;
}
.premium-timings-card[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-labels[_ngcontent-%COMP%]   .percentage-text[_ngcontent-%COMP%] {
  font-size: 15px;
  color: #1F74BB;
  font-weight: 900;
}
.premium-timings-card[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .premium-progress[_ngcontent-%COMP%] {
  height: 8px;
  border-radius: 9999px;
  --background: #f1f5f9 !important;
  --progress-background: #1F74BB !important;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  margin-top: auto;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #64748b;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-text[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-text[_ngcontent-%COMP%]   .s-label[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-text[_ngcontent-%COMP%]   .s-value[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 800;
  color: #1e293b;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item.duration[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: #ffffff;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item.duration[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item.break[_ngcontent-%COMP%]:hover {
  border-color: #f59e0b;
  background: #ffffff;
}
.premium-timings-card[_ngcontent-%COMP%]   .stats-footer[_ngcontent-%COMP%]   .stat-item.break[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: #f59e0b;
}
@keyframes _ngcontent-%COMP%_pulse-ring {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}
.custom-tabs[_ngcontent-%COMP%] {
  width: fit-content;
  display: flex;
  background: #f8fafc;
  padding: 4px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}
.custom-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.custom-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(.active) {
  color: #0f172a;
}
.custom-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {
  background: #1870B9;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 20px 0px 0px 20px;
  padding: 15px;
}
.attendance-log-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 24px;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}
.attendance-log-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mb-8[_ngcontent-%COMP%] {
  margin-bottom: 8px;
}
.mb-10[_ngcontent-%COMP%] {
  margin-bottom: 10px;
}
.mb-15[_ngcontent-%COMP%] {
  margin-bottom: 15px;
}
.mr-8[_ngcontent-%COMP%] {
  margin-right: 8px;
}
.pl-5[_ngcontent-%COMP%] {
  padding-left: 5px;
}
.text-center[_ngcontent-%COMP%] {
  text-align: center;
}
ion-modal[_ngcontent-%COMP%] {
  --height: 70%;
  --border-radius: 16px;
}
.timings-card-new[_ngcontent-%COMP%] {
  background: #ffffff !important;
  border: 1px solid #ABABAB !important;
  border-radius: 10px !important;
  padding: 20px !important;
  margin: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02) !important;
  display: flex;
  flex-direction: column;
  height: 380px !important;
  transition: all 0.3s ease;
}
.timings-card-new[_ngcontent-%COMP%]:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06) !important;
}
.timings-card-new[_ngcontent-%COMP%]   .timings-header-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.timings-card-new[_ngcontent-%COMP%]   .timings-header-row[_ngcontent-%COMP%]   .timings-title[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #212529;
}
.timings-card-new[_ngcontent-%COMP%]   .timings-header-row[_ngcontent-%COMP%]   .date-badge[_ngcontent-%COMP%] {
  background: #eff1f5;
  color: #1a2b3c;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 30px;
}
.timings-card-new[_ngcontent-%COMP%]   .timings-body[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}
.timings-card-new[_ngcontent-%COMP%]   .shift-row-new[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  padding: 12px 14px;
}
.timings-card-new[_ngcontent-%COMP%]   .shift-row-new[_ngcontent-%COMP%]   .shift-icon-box[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  background: #e8f4fd;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.1);
}
.timings-card-new[_ngcontent-%COMP%]   .shift-row-new[_ngcontent-%COMP%]   .shift-text-label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 400;
  color: #202020;
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  margin: 8px 0;
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%]   .day-capsule-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%]   .day-capsule[_ngcontent-%COMP%] {
  width: 100%;
  height: 15px;
  border-radius: 100px;
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%]   .day-capsule.is-present[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      180deg,
      #3498DB 0%,
      #7FCAFD 100%);
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%]   .day-capsule.is-today[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      180deg,
      #FF4B4B 0%,
      #FFCCCC 100%);
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%]   .day-capsule.is-weekoff[_ngcontent-%COMP%] {
  background: #e2e8f0;
}
.timings-card-new[_ngcontent-%COMP%]   .days-row-capsules[_ngcontent-%COMP%]   .day-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
}
.timings-card-new[_ngcontent-%COMP%]   .today-progress-section[_ngcontent-%COMP%] {
  margin-top: auto;
  padding-bottom: 4px;
}
.timings-card-new[_ngcontent-%COMP%]   .today-progress-section[_ngcontent-%COMP%]   .today-progress-label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #334155;
  margin: 0 0 10px 0;
}
.timings-card-new[_ngcontent-%COMP%]   .today-progress-section[_ngcontent-%COMP%]   .progress-bar-container-new[_ngcontent-%COMP%] {
  height: 13px;
  background: #3498DB;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
}
.timings-card-new[_ngcontent-%COMP%]   .today-progress-section[_ngcontent-%COMP%]   .progress-bar-container-new[_ngcontent-%COMP%]   .progress-bar-fill-new[_ngcontent-%COMP%] {
  height: 100%;
  background: #3498DB;
  border-radius: 6px;
  transition: width 0.4s ease;
}
.timings-card-new[_ngcontent-%COMP%]   .today-progress-section[_ngcontent-%COMP%]   .progress-footer-new[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}
.timings-card-new[_ngcontent-%COMP%]   .today-progress-section[_ngcontent-%COMP%]   .progress-footer-new[_ngcontent-%COMP%]   .break-text[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  color: #0d9488;
}
.today-actions-card[_ngcontent-%COMP%] {
  background: #ffffff !important;
  border: 1px solid #ABABAB !important;
  border-radius: 10px !important;
  padding: 20px !important;
  margin: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02) !important;
  display: flex;
  flex-direction: column;
  height: 380px !important;
  transition: all 0.3s ease;
}
.today-actions-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06) !important;
}
.today-actions-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  padding: 0 0 16px 0 !important;
  border-bottom: none !important;
}
.today-actions-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #212529 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
}
.today-actions-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 0 !important;
  flex: 1;
  display: flex;
}
.today-actions-card[_ngcontent-%COMP%]   .today-card-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 16px;
  width: 100%;
  height: 100%;
}
.today-actions-card[_ngcontent-%COMP%]   .today-left-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 4px;
}
.today-actions-card[_ngcontent-%COMP%]   .status-msg-box[_ngcontent-%COMP%] {
  padding-top: 24px;
}
.today-actions-card[_ngcontent-%COMP%]   .status-msg-box[_ngcontent-%COMP%]   .status-main[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}
.today-actions-card[_ngcontent-%COMP%]   .status-msg-box[_ngcontent-%COMP%]   .status-sub[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}
.today-actions-card[_ngcontent-%COMP%]   .time-left-box[_ngcontent-%COMP%] {
  margin: 8px 0;
  padding-left: 10px;
  border-left: 3px solid #ef4444;
  display: flex;
  align-items: center;
  gap: 6px;
}
.today-actions-card[_ngcontent-%COMP%]   .time-left-box[_ngcontent-%COMP%]   .tl-label[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}
.today-actions-card[_ngcontent-%COMP%]   .time-left-box[_ngcontent-%COMP%]   .tl-value[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #ef4444;
}
.today-actions-card[_ngcontent-%COMP%]   .main-clock-btn-wrapper[_ngcontent-%COMP%] {
  margin-top: auto;
  margin-bottom: 12px;
}
.today-actions-card[_ngcontent-%COMP%]   .main-clock-btn-wrapper[_ngcontent-%COMP%]   .img-clock-btn[_ngcontent-%COMP%] {
  width: 100%;
  height: 44px;
  background: #1870b9;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(24, 112, 185, 0.2);
}
.today-actions-card[_ngcontent-%COMP%]   .main-clock-btn-wrapper[_ngcontent-%COMP%]   .img-clock-btn[_ngcontent-%COMP%]:hover {
  background: #135994;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(24, 112, 185, 0.3);
}
.today-actions-card[_ngcontent-%COMP%]   .main-clock-btn-wrapper[_ngcontent-%COMP%]   .img-clock-btn[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.today-actions-card[_ngcontent-%COMP%]   .main-clock-btn-wrapper[_ngcontent-%COMP%]   .img-clock-btn.clocked-in[_ngcontent-%COMP%] {
  background: #ef4444;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}
.today-actions-card[_ngcontent-%COMP%]   .main-clock-btn-wrapper[_ngcontent-%COMP%]   .img-clock-btn.clocked-in[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
}
.today-actions-card[_ngcontent-%COMP%]   .pills-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.today-actions-card[_ngcontent-%COMP%]   .pills-row[_ngcontent-%COMP%]   .pill-btn[_ngcontent-%COMP%] {
  flex: 1;
  height: 34px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  padding: 0px 10px;
}
.today-actions-card[_ngcontent-%COMP%]   .pills-row[_ngcontent-%COMP%]   .pill-btn[_ngcontent-%COMP%]:hover:not([disabled]) {
  background: #f8fafc;
  border-color: #94a3b8;
  color: #1e293b;
}
.today-actions-card[_ngcontent-%COMP%]   .pills-row[_ngcontent-%COMP%]   .pill-btn[disabled][_ngcontent-%COMP%] {
  opacity: 0.5;
  cursor: not-allowed;
}
.today-actions-card[_ngcontent-%COMP%]   .today-right-col[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%] {
  position: relative;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%]   .gauge-svg[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  width: 215px;
  height: 235px;
  transform: rotate(-90deg);
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%]   .gauge-bg[_ngcontent-%COMP%] {
  stroke: #f1f5f9;
  stroke-width: 8;
  fill: none;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%]   .gauge-fill[_ngcontent-%COMP%] {
  stroke: #3b82f6;
  stroke-width: 9;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 251.3;
  stroke-dashoffset: 251.3;
  transition: stroke-dashoffset 0.3s ease;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%]   .gauge-text-box[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%]   .gauge-text-box[_ngcontent-%COMP%]   .gauge-timer[_ngcontent-%COMP%] {
  font-size: 17px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}
.today-actions-card[_ngcontent-%COMP%]   .gauge-wrapper[_ngcontent-%COMP%]   .gauge-text-box[_ngcontent-%COMP%]   .gauge-label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-top: 4px;
}
.today-actions-card[_ngcontent-%COMP%]   .prev-day-box[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}
.today-actions-card[_ngcontent-%COMP%]   .prev-day-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1e293b;
  font-weight: 700;
}`]});let e=i;return e})();export{Tg as MePage};
