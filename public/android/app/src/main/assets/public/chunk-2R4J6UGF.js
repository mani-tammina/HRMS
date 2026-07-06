import{a as it}from"./chunk-22POD724.js";import{a as nt}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{G as Qe,Ga as tt,H as Ke,R as Xe,X as Je,na as et,u as qe}from"./chunk-B3PLR2IL.js";import{$ as Oe,A as W,Ba as ae,Ca as $,D as be,Da as w,E as C,Ea as Ve,Eb as Ue,F as b,Fa as Be,Fb as He,G as x,Ha as Z,I as d,Ia as Y,Ja as q,K as ie,L as re,La as Fe,Ma as Ae,O as xe,Oa as c,P as G,Pa as p,Qa as z,R as M,S as ye,T as Se,Tb as $e,U as Pe,Vb as Ze,X as k,Xa as T,Y as Ee,Zb as Ye,_ as f,a as fe,aa as oe,b as te,ba as De,c as ue,ca as R,d as m,da as Me,ea as U,f as ge,fa as y,g as pe,ga as P,hb as Le,ia as le,ib as Ne,j as D,ja as E,jb as je,ka as ke,l as N,la as I,ma as Re,qb as We,r as me,ra as v,rb as Ge,s as j,sa as a,ta as s,ua as H,v as _e,va as Ie,w as ve,wa as ze,x as we,xa as Te,y as ne,z as Ce}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import"./chunk-JHI3MBHO.js";function V(n,o=0){return vt(n)?Number(n):arguments.length===2?o:0}function vt(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function rt(n){return n instanceof k?n.nativeElement:n}var se;try{se=typeof Intl<"u"&&Intl.v8BreakIterator}catch{se=!1}var Q=(()=>{class n{_platformId=d(Ee);isBrowser=this._platformId?He(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||se)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var wt=new x("cdk-dir-doc",{providedIn:"root",factory:Ct});function Ct(){return d(G)}var bt=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function xt(n){let o=n?.toLowerCase()||"";return o==="auto"&&typeof navigator<"u"&&navigator?.language?bt.test(navigator.language)?"rtl":"ltr":o==="rtl"?"rtl":"ltr"}var ot=(()=>{class n{get value(){return this.valueSignal()}valueSignal=M("ltr");change=new ke;constructor(){let e=d(wt,{optional:!0});if(e){let t=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(xt(t||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(t){return new(t||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var _=function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n}(_||{}),K,S;function lt(){if(S==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return S=!1,S;if("scrollBehavior"in document.documentElement.style)S=!0;else{let n=Element.prototype.scrollTo;n?S=!/\{\s*\[native code\]\s*\}/.test(n.toString()):S=!1}}return S}function O(){if(typeof document!="object"||!document)return _.NORMAL;if(K==null){let n=document.createElement("div"),o=n.style;n.dir="rtl",o.width="1px",o.overflow="auto",o.visibility="hidden",o.pointerEvents="none",o.position="absolute";let e=document.createElement("div"),t=e.style;t.width="2px",t.height="1px",n.appendChild(e),document.body.appendChild(n),K=_.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,K=n.scrollLeft===0?_.NEGATED:_.INVERTED),n.remove()}return K}var ce=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=y({type:n});static \u0275inj=b({})}return n})();var X=class{};function at(n){return n&&typeof n.connect=="function"&&!(n instanceof ue)}var J=class extends X{_data;constructor(o){super(),this._data=o}connect(){return N(this._data)?this._data:D(this._data)}disconnect(){}},F=function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n}(F||{}),de=new x("_ViewRepeater"),ee=class{viewCacheSize=20;_viewCache=[];applyChanges(o,e,t,i,r){o.forEachOperation((l,u,h)=>{let g,L;if(l.previousIndex==null){let _t=()=>t(l,u,h);g=this._insertView(_t,h,e,i(l)),L=g?F.INSERTED:F.REPLACED}else h==null?(this._detachAndCacheView(u,e),L=F.REMOVED):(g=this._moveView(u,h,e,i(l)),L=F.MOVED);r&&r({context:g?.context,operation:L,record:l})})}detach(){for(let o of this._viewCache)o.destroy();this._viewCache=[]}_insertView(o,e,t,i){let r=this._insertViewFromCache(e,t);if(r){r.context.$implicit=i;return}let l=o();return t.createEmbeddedView(l.templateRef,l.context,l.index)}_detachAndCacheView(o,e){let t=e.detach(o);this._maybeCacheView(t,e)}_moveView(o,e,t,i){let r=t.get(o);return t.move(r,e),r.context.$implicit=i,r}_maybeCacheView(o,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(o);else{let t=e.indexOf(o);t===-1?o.destroy():e.remove(t)}}_insertViewFromCache(o,e){let t=this._viewCache.pop();return t&&e.insert(t,o),t||null}};var yt=["contentWrapper"],St=["*"],ht=new x("VIRTUAL_SCROLL_STRATEGY"),he=class{_scrolledIndexChange=new m;scrolledIndexChange=this._scrolledIndexChange.pipe(_e());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(o,e,t){this._itemSize=o,this._minBufferPx=e,this._maxBufferPx=t}attach(o){this._viewport=o,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(o,e,t){t<e,this._itemSize=o,this._minBufferPx=e,this._maxBufferPx=t,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(o,e){this._viewport&&this._viewport.scrollToOffset(o*this._itemSize,e)}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;let o=this._viewport.getRenderedRange(),e={start:o.start,end:o.end},t=this._viewport.getViewportSize(),i=this._viewport.getDataLength(),r=this._viewport.measureScrollOffset(),l=this._itemSize>0?r/this._itemSize:0;if(e.end>i){let h=Math.ceil(t/this._itemSize),g=Math.max(0,Math.min(l,i-h));l!=g&&(l=g,r=g*this._itemSize,e.start=Math.floor(l)),e.end=Math.max(0,Math.min(i,e.start+h))}let u=r-e.start*this._itemSize;if(u<this._minBufferPx&&e.start!=0){let h=Math.ceil((this._maxBufferPx-u)/this._itemSize);e.start=Math.max(0,e.start-h),e.end=Math.min(i,Math.ceil(l+(t+this._minBufferPx)/this._itemSize))}else{let h=e.end*this._itemSize-(r+t);if(h<this._minBufferPx&&e.end!=i){let g=Math.ceil((this._maxBufferPx-h)/this._itemSize);g>0&&(e.end=Math.min(i,e.end+g),e.start=Math.max(0,Math.floor(l-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(this._itemSize*e.start),this._scrolledIndexChange.next(Math.floor(l))}};function Pt(n){return n._scrollStrategy}var ft=(()=>{class n{get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=V(e)}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=V(e)}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=V(e)}_maxBufferPx=200;_scrollStrategy=new he(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=P({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[T([{provide:ht,useFactory:Pt,deps:[be(()=>n)]}]),Pe]})}return n})(),Et=20,Ot=(()=>{class n{_ngZone=d(I);_platform=d(Q);_renderer=d(oe).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new m;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=Et){return this._platform.isBrowser?new te(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(j(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):D()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let i=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(me(r=>!r||i.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((i,r)=>{this._scrollableContainsElement(r,e)&&t.push(r)}),t}_scrollableContainsElement(e,t){let i=rt(t),r=e.getElementRef().nativeElement;do if(i==r)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(t){return new(t||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ut=(()=>{class n{elementRef=d(k);scrollDispatcher=d(Ot);ngZone=d(I);dir=d(ot,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new m;_renderer=d(De);_cleanupScroll;_elementScrolled=new m;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let t=this.elementRef.nativeElement,i=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=i?e.end:e.start),e.right==null&&(e.right=i?e.start:e.end),e.bottom!=null&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),i&&O()!=_.NORMAL?(e.left!=null&&(e.right=t.scrollWidth-t.clientWidth-e.left),O()==_.INVERTED?e.left=e.right:O()==_.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let t=this.elementRef.nativeElement;lt()?t.scrollTo(e):(e.top!=null&&(t.scrollTop=e.top),e.left!=null&&(t.scrollLeft=e.left))}measureScrollOffset(e){let t="left",i="right",r=this.elementRef.nativeElement;if(e=="top")return r.scrollTop;if(e=="bottom")return r.scrollHeight-r.clientHeight-r.scrollTop;let l=this.dir&&this.dir.value=="rtl";return e=="start"?e=l?i:t:e=="end"&&(e=l?t:i),l&&O()==_.INVERTED?e==t?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:l&&O()==_.NEGATED?e==t?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:e==t?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}static \u0275fac=function(t){return new(t||n)};static \u0275dir=P({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),Dt=20,Mt=(()=>{class n{_platform=d(Q);_listeners;_viewportSize;_change=new m;_document=d(G,{optional:!0});constructor(){let e=d(I),t=d(oe).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=r=>this._change.next(r);this._listeners=[t.listen("window","resize",i),t.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+t,height:i,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),i=e.documentElement,r=i.getBoundingClientRect(),l=-r.top||e.body.scrollTop||t.scrollY||i.scrollTop||0,u=-r.left||e.body.scrollLeft||t.scrollX||i.scrollLeft||0;return{top:l,left:u}}change(e=Dt){return e>0?this._change.pipe(j(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),st=new x("VIRTUAL_SCROLLABLE"),kt=(()=>{class n extends ut{constructor(){super()}measureViewportSize(e){let t=this.elementRef.nativeElement;return e==="horizontal"?t.clientWidth:t.clientHeight}static \u0275fac=function(t){return new(t||n)};static \u0275dir=P({type:n,features:[le]})}return n})();function Rt(n,o){return n.start==o.start&&n.end==o.end}var It=typeof requestAnimationFrame<"u"?pe:ge,A=(()=>{class n extends kt{elementRef=d(k);_changeDetectorRef=d(Le);_scrollStrategy=d(ht,{optional:!0});scrollable=d(st,{optional:!0});_platform=d(Q);_detachedSubject=new m;_renderedRangeSubject=new m;get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}_orientation="vertical";appendOnly=!1;scrolledIndexChange=new te(e=>this._scrollStrategy.scrolledIndexChange.subscribe(t=>Promise.resolve().then(()=>this.ngZone.run(()=>e.next(t)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;_totalContentSize=0;_totalContentWidth=M("");_totalContentHeight=M("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=!1;_isChangeDetectionPending=!1;_runAfterChangeDetection=[];_viewportChanges=fe.EMPTY;_injector=d(xe);_isDestroyed=!1;constructor(){super();let e=d(Mt);this._scrollStrategy,this._viewportChanges=e.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this)}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(ne(null),j(0,It),W(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=!0,super.ngOnDestroy()}attach(e){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe(W(this._detachedSubject)).subscribe(t=>{let i=t.length;i!==this._dataLength&&(this._dataLength=i,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){Rt(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,t="to-start"){e=this.appendOnly&&t==="to-start"?0:e;let i=this.dir&&this.dir.value=="rtl",r=this.orientation=="horizontal",l=r?"X":"Y",h=`translate${l}(${Number((r&&i?-1:1)*e)}px)`;this._renderedContentOffset=e,t==="to-end"&&(h+=` translate${l}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=h&&(this._renderedContentTransform=h,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,t="auto"){let i={behavior:t};this.orientation==="horizontal"?i.start=e:i.top=e,this.scrollable.scrollTo(i)}scrollToIndex(e,t="auto"){this._scrollStrategy.scrollToIndex(e,t)}measureScrollOffset(e){let t;return this.scrollable==this?t=i=>super.measureScrollOffset(i):t=i=>this.scrollable.measureScrollOffset(i),Math.max(0,t(e??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let t,i="left",r="right",l=this.dir?.value=="rtl";e=="start"?t=l?r:i:e=="end"?t=l?i:r:e?t=e:t=this.orientation==="horizontal"?"left":"top";let u=this.scrollable.measureBoundingClientRectWithScrollOffset(t);return this.elementRef.nativeElement.getBoundingClientRect()[t]-u}measureRenderedContentSize(){let e=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),this._isChangeDetectionPending||(this._isChangeDetectionPending=!0,this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._doChangeDetection()})))}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,Re(()=>{this._isChangeDetectionPending=!1;let e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let t of e)t()},{injector:this._injector})})}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"")}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=U({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(t,i){if(t&1&&Z(yt,7),t&2){let r;Y(r=q())&&(i._contentWrapper=r.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(t,i){t&2&&Ae("cdk-virtual-scroll-orientation-horizontal",i.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",i.orientation!=="horizontal")},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",je]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[T([{provide:ut,useFactory:(e,t)=>e||t,deps:[[new Se,new ye(st)],n]}]),le],ngContentSelectors:St,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(t,i){t&1&&(Ve(),Ie(0,"div",1,0),Be(2),ze(),Te(3,"div",2)),t&2&&(f(3),Fe("width",i._totalContentWidth())("height",i._totalContentHeight()))},styles:[`cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}
`],encapsulation:2,changeDetection:0})}return n})();function ct(n,o,e){let t=e;if(!t.getBoundingClientRect)return 0;let i=t.getBoundingClientRect();return n==="horizontal"?o==="start"?i.left:i.right:o==="start"?i.top:i.bottom}var gt=(()=>{class n{_viewContainerRef=d(Me);_template=d(Oe);_differs=d(Ne);_viewRepeater=d(de);_viewport=d(A,{skipSelf:!0});viewChange=new m;_dataSourceChanges=new m;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,at(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new J(N(e)?e:Array.from(e||[])))}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(t,i)=>e(t+(this._renderedRange?this._renderedRange.start:0),i):void 0}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=V(e)}dataStream=this._dataSourceChanges.pipe(ne(null),ve(),Ce(([e,t])=>this._changeDataSource(e,t)),we(1));_differ=null;_data;_renderedItems;_renderedRange;_needsUpdate=!1;_destroyed=new m;constructor(){let e=d(I);this.dataStream.subscribe(t=>{this._data=t,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe(W(this._destroyed)).subscribe(t=>{this._renderedRange=t,this.viewChange.observers.length&&e.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}measureRangeSize(e,t){if(e.start>=e.end)return 0;e.start<this._renderedRange.start||e.end>this._renderedRange.end;let i=e.start-this._renderedRange.start,r=e.end-e.start,l,u;for(let h=0;h<r;h++){let g=this._viewContainerRef.get(h+i);if(g&&g.rootNodes.length){l=u=g.rootNodes[0];break}}for(let h=r-1;h>-1;h--){let g=this._viewContainerRef.get(h+i);if(g&&g.rootNodes.length){u=g.rootNodes[g.rootNodes.length-1];break}}return l&&u?ct(t,"end",u)-ct(t,"start",l):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,t)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,t):t)),this._needsUpdate=!0)}_changeDataSource(e,t){return e&&e.disconnect(this),this._needsUpdate=!0,t?t.connect(this):D()}_updateContext(){let e=this._data.length,t=this._viewContainerRef.length;for(;t--;){let i=this._viewContainerRef.get(t);i.context.index=this._renderedRange.start+t,i.context.count=e,this._updateComputedContextProperties(i.context),i.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(r,l,u)=>this._getEmbeddedViewArgs(r,u),r=>r.item),e.forEachIdentityChange(r=>{let l=this._viewContainerRef.get(r.currentIndex);l.context.$implicit=r.item});let t=this._data.length,i=this._viewContainerRef.length;for(;i--;){let r=this._viewContainerRef.get(i);r.context.index=this._renderedRange.start+i,r.context.count=t,this._updateComputedContextProperties(r.context)}}_updateComputedContextProperties(e){e.first=e.index===0,e.last=e.index===e.count-1,e.even=e.index%2===0,e.odd=!e.even}_getEmbeddedViewArgs(e,t){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:t}}static ngTemplateContextGuard(e,t){return!0}static \u0275fac=function(t){return new(t||n)};static \u0275dir=P({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"},features:[T([{provide:de,useClass:ee}])]})}return n})();var dt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=y({type:n});static \u0275inj=b({})}return n})(),pt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=y({type:n});static \u0275inj=b({imports:[ce,dt,ce,dt]})}return n})();function Tt(n,o){if(n&1&&(a(0,"div",10)(1,"ion-badge",11),c(2),s()()),n&2){let e=w();f(2),z("",e.fullDetailedPreview.length," Employees Loaded")}}function Vt(n,o){n&1&&(a(0,"div",12),H(1,"ion-spinner",13),a(2,"h3"),c(3,"Generating Detailed Forecast..."),s(),a(4,"p"),c(5,"Please wait while we calculate the full payroll breakdown."),s()())}function Bt(n,o){if(n&1&&(a(0,"div",31),c(1),s()),n&2){let e=o.$implicit;f(),z(" ",e," ")}}function Ft(n,o){if(n&1&&(a(0,"div",49),c(1),s()),n&2){let e=o.$implicit,t=w().$implicit,i=w(2);f(),z(" ",i.formatCurrency(i.getComponentAmount(t,e))," ")}}function At(n,o){if(n&1&&(a(0,"div",32)(1,"div",33)(2,"div",34)(3,"span",35),c(4),s(),a(5,"span",36),c(6),s()()(),a(7,"div",37)(8,"span",38),c(9),s()(),a(10,"div",39),c(11),s(),a(12,"div",40),c(13),s(),a(14,"div",41),c(15),s(),a(16,"div",42),c(17),s(),a(18,"div",43),c(19),s(),E(20,Ft,2,1,"div",44),a(21,"div",45),c(22),s(),a(23,"div",46),c(24),s(),a(25,"div",47),c(26),s(),a(27,"div",48),c(28),s()()),n&2){let e=o.$implicit,t=w(2);f(4),p(e.full_name),f(2),p(e.employee_number),f(3),p(e.template_name||"N/A"),f(2),p(t.formatCurrency(e.annual_ctc)),f(2),p(t.formatCurrency(e.monthly_gross)),f(2),p(e.calendar_days),f(2),p(e.lop_days),f(2),p(e.paid_days),f(),v("ngForOf",t.getPreviewComponentHeaders()),f(2),p(t.formatCurrency(e.total_earnings)),f(2),p(t.formatCurrency(e.total_deductions)),f(2),p(t.formatCurrency(e.total_net)),f(2),p(t.formatCurrency(e.total_net_payout))}}function Lt(n,o){if(n&1){let e=ae();a(0,"div",14)(1,"div",15)(2,"div",16)(3,"div",17),c(4,"Employee"),s(),a(5,"div",18),c(6,"Template"),s(),a(7,"div",19),c(8,"Annual CTC"),s(),a(9,"div",20),c(10,"Monthly Gross"),s(),a(11,"div",21),c(12,"Calendar"),s(),a(13,"div",22),c(14,"LOP"),s(),a(15,"div",23),c(16,"Paid"),s(),E(17,Bt,2,1,"div",24),a(18,"div",25),c(19,"Earnings"),s(),a(20,"div",26),c(21,"Deductions"),s(),a(22,"div",27),c(23,"Net Pay"),s(),a(24,"div",28),c(25,"Total Net"),s()(),a(26,"cdk-virtual-scroll-viewport",29),$("scrolledIndexChange",function(i){ie(e);let r=w();return re(r.onScrollIndexChange(i))}),E(27,At,29,13,"div",30),s()()()}if(n&2){let e=w();f(17),v("ngForOf",e.getPreviewComponentHeaders()),f(10),v("cdkVirtualForOf",e.fullDetailedPreview)("cdkVirtualForTrackBy",e.trackByEmpId)}}function Nt(n,o){if(n&1){let e=ae();a(0,"div",50),H(1,"ion-icon",51),a(2,"p"),c(3,"No preview data found for this month."),s(),a(4,"ion-button",52),$("click",function(){ie(e);let i=w();return re(i.goBack())}),c(5,"Go Back"),s()()}}var mt=(()=>{let o=class o{constructor(t,i,r,l){this.route=t,this.router=i,this.payrollApi=r,this.toaster=l,this.previewMonth="",this.isPreviewing=!1,this.previewData=null,this.fullDetailedPreview=[],this.previewPage=1,this.previewLimit=100,this.canLoadMorePreview=!0}ngOnInit(){this.route.queryParams.subscribe(t=>{this.previewMonth=t.month||this.payrollApi.getCurrentYearMonth(),this.startPreview()})}goBack(){this.router.navigate(["/finance/process"])}startPreview(){let[t,i]=this.previewMonth.split("-").map(Number);this.isPreviewing=!0,this.previewData=null,this.fullDetailedPreview=[],this.previewPage=1,this.canLoadMorePreview=!0,this.loadPreviewData(t,i)}loadPreviewData(t,i,r){this.payrollApi.previewPayroll({year:t,month:i,page:this.previewPage,limit:this.previewLimit}).subscribe({next:l=>{this.previewData=l;let u=l.data?.detailedPreview||[];this.fullDetailedPreview=[...this.fullDetailedPreview,...u],this.isPreviewing=!1;let h=l.data?.pagination;h?this.canLoadMorePreview=h.currentPage<h.pages:this.canLoadMorePreview=!1,r&&r.target.complete()},error:l=>{this.isPreviewing=!1,this.toaster.showError("Preview failed."),console.error(l),r&&r.target.complete()}})}loadMorePreview(t){if(!this.canLoadMorePreview||this.isPreviewing){t&&t.target&&t.target.complete();return}this.previewPage++;let[i,r]=this.previewMonth.split("-").map(Number);this.loadPreviewData(i,r,t)}onScrollIndexChange(t){if(!this.viewport||!this.canLoadMorePreview||this.isPreviewing)return;let i=this.fullDetailedPreview.length;this.viewport.getRenderedRange().end>i-10&&this.loadMorePreview()}formatCurrency(t){return"\u20B9"+(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:0})}getPreviewComponentHeaders(){let t=this.fullDetailedPreview;return!t||t.length===0?[]:t[0].components?.map(i=>i.name)||[]}getComponentAmount(t,i){let r=t.components?.find(l=>l.name===i);return r?r.amount:0}trackByEmpId(t,i){return i.employee_id}};o.\u0275fac=function(i){return new(i||o)(R($e),R(Ze),R(it),R(nt))},o.\u0275cmp=U({type:o,selectors:[["app-payroll-preview-all"]],viewQuery:function(i,r){if(i&1&&Z(A,5),i&2){let l;Y(l=q())&&(r.viewport=l.first)}},standalone:!1,decls:12,vars:6,consts:[[1,"glass-content",3,"fullscreen"],[1,"page-container"],[1,"header-group"],[1,"left"],["fill","clear",1,"back-btn",3,"click"],["name","chevron-back-outline","slot","icon-only"],["class","right",4,"ngIf"],["class","loading-state",4,"ngIf"],["class","virtual-table-wrapper",4,"ngIf"],["class","empty-state",4,"ngIf"],[1,"right"],["color","primary"],[1,"loading-state"],["name","crescent"],[1,"virtual-table-wrapper"],[1,"horizontal-scroll-container"],[1,"table-header"],[1,"header-cell","col-emp"],[1,"header-cell","col-template"],[1,"header-cell","col-ctc","num"],[1,"header-cell","col-gross","num"],[1,"header-cell","col-days","num","highlight-attendance"],[1,"header-cell","col-days","num","highlight-lop"],[1,"header-cell","col-days","num","highlight-paid"],["class","header-cell col-comp num",4,"ngFor","ngForOf"],[1,"header-cell","col-total","num","highlight-earnings"],[1,"header-cell","col-total","num","highlight-deductions"],[1,"header-cell","col-total","num","highlight-net"],[1,"header-cell","col-total","num","highlight-payout"],["itemSize","70",1,"viewport",3,"scrolledIndexChange"],["class","table-row",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"header-cell","col-comp","num"],[1,"table-row"],[1,"cell","col-emp"],[1,"emp-info"],[1,"emp-name"],[1,"emp-id"],[1,"cell","col-template"],[1,"template-badge"],[1,"cell","col-ctc","num"],[1,"cell","col-gross","num","bold"],[1,"cell","col-days","num","highlight-attendance"],[1,"cell","col-days","num","bold","lop-val","highlight-lop"],[1,"cell","col-days","num","bold","paid-val","highlight-paid"],["class","cell col-comp num",4,"ngFor","ngForOf"],[1,"cell","col-total","num","bold","earnings-val","highlight-earnings"],[1,"cell","col-total","num","bold","deductions-val","highlight-deductions"],[1,"cell","col-total","num","bold","net-val","highlight-net"],[1,"cell","col-total","num","bold","payout-val","highlight-payout"],[1,"cell","col-comp","num"],[1,"empty-state"],["name","document-text-outline"],["fill","outline",3,"click"]],template:function(i,r){i&1&&(a(0,"ion-content",0)(1,"div",1)(2,"header",2)(3,"div",3)(4,"ion-button",4),$("click",function(){return r.goBack()}),H(5,"ion-icon",5),s(),a(6,"h1"),c(7),s()(),E(8,Tt,3,1,"div",6),s(),E(9,Vt,6,0,"div",7)(10,Lt,28,3,"div",8)(11,Nt,6,0,"div",9),s()()),i&2&&(v("fullscreen",!0),f(7),z("Full Payroll Preview \u2014 ",r.previewMonth),f(),v("ngIf",r.previewData),f(),v("ngIf",r.isPreviewing&&r.fullDetailedPreview.length===0),f(),v("ngIf",r.fullDetailedPreview.length>0),f(),v("ngIf",!r.isPreviewing&&r.fullDetailedPreview.length===0))},dependencies:[We,Ge,Qe,Ke,Xe,Je,et,ft,gt,A],styles:[`

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
.glass-content[_ngcontent-%COMP%] {
  --background: #f8fafc;
  background:
    radial-gradient(
      circle at top right,
      #e0f2fe 0%,
      #f8fafc 40%);
}
.page-container[_ngcontent-%COMP%] {
  padding: 2rem;
  max-width: 100%;
  margin: 0 auto;
}
.header-group[_ngcontent-%COMP%] {
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}
.header-group[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.header-group[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {
  --color: #64748b;
  --padding-start: 0;
  margin: 0;
}
.header-group[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
}
.virtual-table-wrapper[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  min-height: 500px;
}
.horizontal-scroll-container[_ngcontent-%COMP%] {
  overflow-x: auto;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.table-header[_ngcontent-%COMP%] {
  display: flex;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  z-index: 10;
  min-width: 1800px;
}
.table-header[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
  padding: 1.25rem 1rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.table-header[_ngcontent-%COMP%]   .header-cell.num[_ngcontent-%COMP%] {
  justify-content: flex-end;
  text-align: right;
}
.viewport[_ngcontent-%COMP%] {
  flex: 1;
  width: 100%;
  min-width: 1800px;
}
.viewport[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 6px;
}
.viewport[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.viewport[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.table-row[_ngcontent-%COMP%] {
  display: flex;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  height: 70px;
  background: #fff;
}
.table-row[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
}
.table-row[_ngcontent-%COMP%]:hover   .cell[_ngcontent-%COMP%] {
  border-bottom-color: #6366f1;
}
.table-row[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%] {
  padding: 0.75rem 1rem;
  color: #334155;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-row[_ngcontent-%COMP%]   .cell.num[_ngcontent-%COMP%] {
  justify-content: flex-end;
  text-align: right;
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
}
.table-row[_ngcontent-%COMP%]   .cell.bold[_ngcontent-%COMP%] {
  font-weight: 700;
}
.col-emp[_ngcontent-%COMP%] {
  width: 250px;
  flex-shrink: 0;
}
.col-template[_ngcontent-%COMP%] {
  width: 200px;
  flex-shrink: 0;
}
.col-ctc[_ngcontent-%COMP%] {
  width: 140px;
  flex-shrink: 0;
}
.col-gross[_ngcontent-%COMP%] {
  width: 140px;
  flex-shrink: 0;
}
.col-days[_ngcontent-%COMP%] {
  width: 100px;
  flex-shrink: 0;
}
.col-comp[_ngcontent-%COMP%] {
  width: 130px;
  flex-shrink: 0;
}
.col-total[_ngcontent-%COMP%] {
  width: 150px;
  flex-shrink: 0;
}
.emp-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.emp-info[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%] {
  font-weight: 800;
  color: #1e293b;
  font-size: 0.95rem;
  line-height: 1.2;
}
.emp-info[_ngcontent-%COMP%]   .emp-id[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  margin-top: 2px;
}
.template-badge[_ngcontent-%COMP%] {
  padding: 0.3rem 0.7rem;
  background: #eef2ff;
  color: #6366f1;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid #c7d2fe;
}
.highlight-attendance[_ngcontent-%COMP%] {
  background: rgba(248, 250, 252, 0.5);
}
.highlight-lop[_ngcontent-%COMP%] {
  background: rgba(254, 242, 242, 0.5);
}
.highlight-paid[_ngcontent-%COMP%] {
  background: rgba(240, 253, 244, 0.5);
}
.highlight-earnings[_ngcontent-%COMP%] {
  background: rgba(239, 246, 255, 0.5);
}
.highlight-deductions[_ngcontent-%COMP%] {
  background: rgba(255, 241, 242, 0.5);
}
.highlight-net[_ngcontent-%COMP%] {
  background: rgba(245, 243, 255, 0.5);
}
.highlight-payout[_ngcontent-%COMP%] {
  background: rgba(236, 253, 245, 0.5);
}
.lop-val[_ngcontent-%COMP%] {
  color: #ef4444;
}
.paid-val[_ngcontent-%COMP%] {
  color: #10b981;
}
.earnings-val[_ngcontent-%COMP%] {
  color: #3b82f6;
}
.deductions-val[_ngcontent-%COMP%] {
  color: #f43f5e;
}
.net-val[_ngcontent-%COMP%] {
  color: #8b5cf6;
}
.payout-val[_ngcontent-%COMP%] {
  color: #10b981;
  font-size: 1.05rem;
  font-weight: 800;
}
.loading-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 5rem 0;
}
.loading-state[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  --color: #6366f1;
}
.loading-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin-top: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}
.empty-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 5rem 0;
  color: #94a3b8;
}
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 1.1rem;
}`]});let n=o;return n})();var jt=[{path:"",component:mt}],Ln=(()=>{let o=class o{};o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=y({type:o}),o.\u0275inj=b({imports:[Ue,qe,tt,pt,Ye.forChild(jt)]});let n=o;return n})();export{Ln as PayrollPreviewAllPageModule};
