import{a as wn}from"./chunk-22POD724.js";import{a as Sn}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{Aa as yn,Ca as On,G as un,Ga as Mn,I as fn,R as _n,W as xn,X as bn,b as U,c as g,d as J,e as K,g as X,h as Z,i as nn,j as en,k as tn,l as on,m as rn,n as an,na as vn,o as cn,p as sn,q as ln,r as dn,ra as hn,t as mn,ta as Pn,u as pn,v as gn,va as Cn}from"./chunk-B3PLR2IL.js";import{$a as R,Ba as h,Ca as u,Da as p,Eb as $,F as N,K as f,L as _,Ma as y,Oa as r,Pa as P,Qa as v,Sa as z,Ta as E,Ua as T,Va as k,Vb as Q,Zb as H,_ as c,ab as q,ca as w,ea as D,fa as L,ja as b,pb as G,qa as B,qb as Y,ra as s,rb as W,sa as t,ta as e,ua as d,ya as I,za as F,zb as j}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as M,b as S,e as V}from"./chunk-JHI3MBHO.js";function kn(o,m){if(o&1&&(t(0,"option",20),r(1),e()),o&2){let n=m.$implicit;s("value",n),c(),v("FY ",n)}}function An(o,m){o&1&&(t(0,"div",27),d(1,"ion-spinner",28),e())}function In(o,m){if(o&1){let n=h();t(0,"div",38)(1,"div",39)(2,"div",40)(3,"label"),r(4,"Type"),e(),t(5,"select",41)(6,"option",42),r(7,"PF"),e(),t(8,"option",43),r(9,"ESI"),e(),t(10,"option",44),r(11,"PT"),e()()(),t(12,"div",40)(13,"label"),r(14,"State Code"),e(),d(15,"input",45),e(),t(16,"div",40)(17,"label"),r(18,"% Rate"),e(),d(19,"input",46),e(),t(20,"div",40)(21,"label"),r(22,"Ceiling (\u20B9)"),e(),d(23,"input",47),e(),t(24,"div",40)(25,"label"),r(26,"Effective From"),e(),d(27,"input",48),e()(),t(28,"button",49),u("click",function(){let a=f(n).index,l=p(3);return _(l.removeRule(a))}),d(29,"ion-icon",50),e()()}if(o&2){let n=m.index;s("formGroupName",n),c(5),s("id","rule-type-"+n),c(10),s("id","rule-state-"+n),c(4),s("id","rule-pct-"+n),c(4),s("id","rule-ceiling-"+n),c(4),s("id","rule-date-"+n)}}function Fn(o,m){o&1&&d(0,"ion-spinner",28)}function Vn(o,m){o&1&&d(0,"ion-icon",51)}function Nn(o,m){if(o&1){let n=h();t(0,"form",29)(1,"div",30),b(2,In,30,6,"div",31),e(),t(3,"div",32)(4,"button",33),u("click",function(){f(n);let a=p(2);return _(a.addRule())}),d(5,"ion-icon",34),r(6," Add Rule "),e(),t(7,"button",35),u("click",function(){f(n);let a=p(2);return _(a.saveStatutoryRules())}),b(8,Fn,1,0,"ion-spinner",36)(9,Vn,1,0,"ion-icon",37),r(10),e()()()}if(o&2){let n=p(2);s("formGroup",n.statutoryForm),c(2),s("ngForOf",n.ruleControls.controls),c(5),s("disabled",n.isSavingStatutory),c(),s("ngIf",n.isSavingStatutory),c(),s("ngIf",!n.isSavingStatutory),c(),v(" ",n.isSavingStatutory?"Saving...":"Save Rules"," ")}}function Dn(o,m){if(o&1&&(t(0,"div",21)(1,"div",22)(2,"div",23)(3,"div",24),d(4,"ion-icon",9),e(),t(5,"div")(6,"h2"),r(7,"Statutory Rules (PF / ESI / PT)"),e(),t(8,"p"),r(9,"Configure contribution percentages and ceiling limits"),e()()(),b(10,An,2,0,"div",25)(11,Nn,11,6,"form",26),e()()),o&2){let n=p();c(10),s("ngIf",n.isLoadingStatutory),c(),s("ngIf",!n.isLoadingStatutory)}}function Ln(o,m){o&1&&(t(0,"div",27),d(1,"ion-spinner",28),e())}function Bn(o,m){if(o&1){let n=h();t(0,"div",86)(1,"div",73),d(2,"input",87),e(),t(3,"div",74),d(4,"input",88),e(),t(5,"div",75),d(6,"input",89),e(),t(7,"div",76),d(8,"input",90),e(),t(9,"div",77)(10,"button",91),u("click",function(){f(n);let a=p().index,l=p(3);return _(l.removeTaxSlab(a))}),d(11,"ion-icon",92),e()()()}if(o&2){let n=p().index;s("formGroupName",n)}}function zn(o,m){if(o&1&&(I(0),b(1,Bn,12,1,"div",85),F()),o&2){let n=m.$implicit;c(),s("ngIf",n.value.regime_type==="NEW")}}function Rn(o,m){o&1&&d(0,"ion-spinner",28)}function qn(o,m){o&1&&d(0,"ion-icon",51)}function Gn(o,m){if(o&1){let n=h();t(0,"div",86)(1,"div",73),d(2,"input",87),e(),t(3,"div",74),d(4,"input",88),e(),t(5,"div",75),d(6,"input",89),e(),t(7,"div",76),d(8,"input",90),e(),t(9,"div",77)(10,"button",91),u("click",function(){f(n);let a=p().index,l=p(3);return _(l.removeTaxSlab(a))}),d(11,"ion-icon",92),e()()()}if(o&2){let n=p().index;s("formGroupName",n)}}function Yn(o,m){if(o&1&&(I(0),b(1,Gn,12,1,"div",85),F()),o&2){let n=m.$implicit;c(),s("ngIf",n.value.regime_type==="OLD")}}function Wn(o,m){o&1&&d(0,"ion-spinner",28)}function jn(o,m){o&1&&d(0,"ion-icon",51)}function $n(o,m){if(o&1){let n=h();t(0,"form",64)(1,"div",65)(2,"div",66)(3,"div",67),d(4,"ion-icon",68),t(5,"h3"),r(6,"New Tax Regime"),e()(),t(7,"button",69),u("click",function(){f(n);let a=p(2);return _(a.addTaxSlab("NEW"))}),d(8,"ion-icon",70),r(9," Add Slab "),e()(),t(10,"div",71)(11,"div",72)(12,"span",73),r(13,"Min Amount (\u20B9)"),e(),t(14,"span",74),r(15,"Max Amount (\u20B9)"),e(),t(16,"span",75),r(17,"Tax %"),e(),t(18,"span",76),r(19,"Cess %"),e(),d(20,"span",77),e(),b(21,zn,2,1,"ng-container",78),e(),t(22,"div",79)(23,"div",80),r(24,"Slabs for New Regime are usually set once per FY"),e(),t(25,"button",81),u("click",function(){f(n);let a=p(2);return _(a.saveRegimeSlabs("NEW"))}),b(26,Rn,1,0,"ion-spinner",36)(27,qn,1,0,"ion-icon",37),r(28),e()()(),t(29,"div",82)(30,"div",66)(31,"div",67),d(32,"ion-icon",83),t(33,"h3"),r(34,"Old Tax Regime"),e()(),t(35,"button",69),u("click",function(){f(n);let a=p(2);return _(a.addTaxSlab("OLD"))}),d(36,"ion-icon",70),r(37," Add Slab "),e()(),t(38,"div",71)(39,"div",72)(40,"span",73),r(41,"Min Amount (\u20B9)"),e(),t(42,"span",74),r(43,"Max Amount (\u20B9)"),e(),t(44,"span",75),r(45,"Tax %"),e(),t(46,"span",76),r(47,"Cess %"),e(),d(48,"span",77),e(),b(49,Yn,2,1,"ng-container",78),e(),t(50,"div",79)(51,"div",80),r(52,"Configure Old Regime slabs based on latest tax laws"),e(),t(53,"button",84),u("click",function(){f(n);let a=p(2);return _(a.saveRegimeSlabs("OLD"))}),b(54,Wn,1,0,"ion-spinner",36)(55,jn,1,0,"ion-icon",37),r(56),e()()()()}if(o&2){let n=p(2);s("formGroup",n.taxSlabsForm),c(21),s("ngForOf",n.taxSlabControls.controls),c(4),s("disabled",n.isSavingNewSlabs),c(),s("ngIf",n.isSavingNewSlabs),c(),s("ngIf",!n.isSavingNewSlabs),c(),v(" ",n.isSavingNewSlabs?"Saving...":"Save New Regime Slabs"," "),c(21),s("ngForOf",n.taxSlabControls.controls),c(4),s("disabled",n.isSavingOldSlabs),c(),s("ngIf",n.isSavingOldSlabs),c(),s("ngIf",!n.isSavingOldSlabs),c(),v(" ",n.isSavingOldSlabs?"Saving...":"Save Old Regime Slabs"," ")}}function Qn(o,m){o&1&&(t(0,"div",27),d(1,"ion-spinner",28),e())}function Hn(o,m){if(o&1){let n=h();t(0,"div",99),d(1,"input",100)(2,"input",101)(3,"input",102)(4,"input",103),t(5,"button",104),u("click",function(){let a=f(n).index,l=p(3);return _(l.removePTSlab(a))}),d(6,"ion-icon",105),e()()}if(o&2){let n=m.index;s("formGroupName",n)}}function Un(o,m){o&1&&d(0,"ion-spinner",28)}function Jn(o,m){o&1&&d(0,"ion-icon",51)}function Kn(o,m){if(o&1){let n=h();t(0,"form",93)(1,"div",94)(2,"div",95)(3,"div"),r(4,"State"),e(),t(5,"div"),r(6,"Ceiling (\u20B9)"),e(),t(7,"div"),r(8,"Fixed Amt (\u20B9)"),e(),t(9,"div"),r(10,"Effective Date"),e(),d(11,"div"),e(),b(12,Hn,7,1,"div",96),e(),t(13,"div",32)(14,"button",97),u("click",function(){f(n);let a=p(2);return _(a.addPTSlab())}),d(15,"ion-icon",34),r(16," Add PT Slab "),e(),t(17,"button",98),u("click",function(){f(n);let a=p(2);return _(a.savePTSlabs())}),b(18,Un,1,0,"ion-spinner",36)(19,Jn,1,0,"ion-icon",37),r(20),e()()()}if(o&2){let n=p(2);s("formGroup",n.ptSlabsForm),c(12),s("ngForOf",n.ptSlabControls.controls),c(5),s("disabled",n.isSavingPT),c(),s("ngIf",n.isSavingPT),c(),s("ngIf",!n.isSavingPT),c(),v(" ",n.isSavingPT?"Saving...":"Save PT Slabs"," ")}}function Xn(o,m){o&1&&(t(0,"p",106),r(1,"No PT slabs found"),e())}function Zn(o,m){if(o&1){let n=h();t(0,"div",52)(1,"div",53)(2,"div",54)(3,"div",55),d(4,"ion-icon",10),e(),t(5,"div")(6,"h2"),r(7,"Tax Slabs Configuration"),e(),t(8,"p"),r(9,"Define salary ranges and tax percentages for "),t(10,"strong"),r(11),e()()()(),t(12,"button",56),u("click",function(){f(n);let a=p();return _(a.loadTaxSlabs())}),d(13,"ion-icon",57),t(14,"span"),r(15,"Reload All"),e()()(),b(16,Ln,2,0,"div",25)(17,$n,57,11,"form",58),t(18,"div",22)(19,"div",23)(20,"div",59),d(21,"ion-icon",60),e(),t(22,"div")(23,"h2"),r(24,"Professional Tax Slabs"),e(),t(25,"p"),r(26,"State-wise PT ceiling and fixed amounts"),e()(),t(27,"button",61),u("click",function(){f(n);let a=p();return _(a.loadPTSlabs())}),d(28,"ion-icon",57),e()(),b(29,Qn,2,0,"div",25)(30,Kn,21,6,"form",62)(31,Xn,2,0,"p",63),e()()}if(o&2){let n=p();c(11),v("FY ",n.financialYear),c(5),s("ngIf",n.isLoadingSlabs),c(),s("ngIf",!n.isLoadingSlabs),c(12),s("ngIf",n.isLoadingPT),c(),s("ngIf",!n.isLoadingPT),c(),s("ngIf",!n.isLoadingPT&&!n.ptSlabControls.length)}}function ne(o,m){if(o&1){let n=h();t(0,"button",136),u("click",function(){f(n);let a=p().index,l=p(2);return _(l.removeSection(a))}),d(1,"ion-icon",92),e()}if(o&2){let n=p().index;s("id","remove-section-"+n)}}function ee(o,m){if(o&1&&(t(0,"div",137)(1,"div",138),r(2,"Maximum Limit"),e(),t(3,"div",139),r(4),e(),t(5,"div",140),r(6),e()()),o&2){let n=p().$implicit,i=p(2);c(4),P(i.formatCurrency(n.max_limit)),c(2),v("FY ",n.financial_year||i.financialYear)}}function te(o,m){if(o&1&&(t(0,"option",20),r(1),e()),o&2){let n=m.$implicit;s("value",n),c(),P(n)}}function ie(o,m){o&1&&d(0,"ion-spinner",147)}function oe(o,m){o&1&&d(0,"ion-icon",148)}function re(o,m){if(o&1){let n=h();t(0,"div",141)(1,"div",40)(2,"label"),r(3,"Section Code"),e(),t(4,"input",142),k("ngModelChange",function(a){f(n);let l=p().index,x=p(2);return T(x.sectionLimits[l].section_code,a)||(x.sectionLimits[l].section_code=a),_(a)}),e()(),t(5,"div",40)(6,"label"),r(7,"Max Limit (\u20B9)"),e(),t(8,"input",143),k("ngModelChange",function(a){f(n);let l=p().index,x=p(2);return T(x.sectionLimits[l].max_limit,a)||(x.sectionLimits[l].max_limit=a),_(a)}),e()(),t(9,"div",40)(10,"label"),r(11,"Financial Year"),e(),t(12,"select",144),k("ngModelChange",function(a){f(n);let l=p().index,x=p(2);return T(x.sectionLimits[l].financial_year,a)||(x.sectionLimits[l].financial_year=a),_(a)}),b(13,te,2,2,"option",6),e()(),t(14,"button",145),u("click",function(){f(n);let a=p().index,l=p(2);return _(l.saveSingleSection(a))}),b(15,ie,1,0,"ion-spinner",124)(16,oe,1,0,"ion-icon",146),r(17),e()()}if(o&2){let n=p(),i=n.$implicit,a=n.index,l=p(2);c(4),E("ngModel",l.sectionLimits[a].section_code),s("id","code-edit-"+a),c(4),E("ngModel",l.sectionLimits[a].max_limit),B("id","limit-edit-"+i.section_code),c(4),E("ngModel",l.sectionLimits[a].financial_year),s("id","fy-edit-"+a),c(),s("ngForOf",l.availableYears),c(),s("disabled",l.isSavingSection[a])("id","save-single-"+i.section_code),c(),s("ngIf",l.isSavingSection[a]),c(),s("ngIf",!l.isSavingSection[a]),c(),v(" ",l.isSavingSection[a]?"Saving\u2026":"Save This Section"," ")}}function ae(o,m){if(o&1){let n=h();t(0,"div",125)(1,"div",126)(2,"div",127),r(3),e(),t(4,"div",128)(5,"button",129),u("click",function(){let a=f(n).index,l=p(2);return _(l.toggleSectionActive(a))}),d(6,"ion-icon",130),t(7,"span"),r(8),e()(),t(9,"button",131),u("click",function(){let a=f(n).index,l=p(2);return _(l.toggleSectionEdit(a))}),d(10,"ion-icon",130),e(),b(11,ne,2,1,"button",132),e()(),t(12,"div",133),r(13),e(),b(14,ee,7,2,"div",134)(15,re,18,12,"div",135),e()}if(o&2){let n=m.$implicit,i=m.index,a=p(2);y("edit-active",a.sectionEditModes[i])("is-inactive",!n.is_active),c(2),s("ngClass",a.getSectionColorClass(n.section_code)),c(),v(" ",n.section_code||"NEW"," "),c(2),y("is-on",n.is_active),s("id","toggle-active-"+i),c(),s("name",n.is_active?"toggle":"toggle-outline"),c(2),P(n.is_active?"Active":"Inactive"),c(),y("editing",a.sectionEditModes[i]),s("id","edit-section-"+i),c(),s("name",a.sectionEditModes[i]?"close-outline":"pencil-outline"),c(),s("ngIf",a.sectionEditModes[i]),c(2),P(a.getSectionDescription(n.section_code)),c(),s("ngIf",!a.sectionEditModes[i]),c(),s("ngIf",a.sectionEditModes[i])}}function ce(o,m){o&1&&d(0,"ion-spinner",147)}function se(o,m){o&1&&d(0,"ion-icon",51)}function le(o,m){if(o&1){let n=h();t(0,"div",107)(1,"div",108)(2,"div",109)(3,"div",110),d(4,"ion-icon",9),e(),t(5,"div")(6,"h2"),r(7,"Section Deduction Limits"),e(),t(8,"p"),r(9,"Configure maximum allowed investment amounts per section for "),t(10,"strong"),r(11),e()()()(),t(12,"div",111)(13,"div",112)(14,"div",113),r(15),e(),t(16,"div",114),r(17,"Total Sections"),e()(),t(18,"div",115)(19,"div",113),r(20),e(),t(21,"div",114),r(22,"Active"),e()(),t(23,"div",116)(24,"div",113),r(25),e(),t(26,"div",114),r(27,"Inactive"),e()()()(),t(28,"div",117),b(29,ae,16,19,"div",118),t(30,"button",119),u("click",function(){f(n);let a=p();return _(a.addNewSection())}),d(31,"ion-icon",70),t(32,"span"),r(33,"Add New Section"),e()()(),t(34,"div",120)(35,"div",121),d(36,"ion-icon",122),t(37,"span"),r(38,"Saving all will push "),t(39,"strong"),r(40),e(),r(41," to the backend in one request."),e()(),t(42,"button",123),u("click",function(){f(n);let a=p();return _(a.saveSectionLimits())}),b(43,ce,1,0,"ion-spinner",124)(44,se,1,0,"ion-icon",37),r(45),e()()()}if(o&2){let n=p();c(11),v("FY ",n.financialYear),c(4),P(n.sectionLimits.length),c(5),P(n.activeSectionsCount),c(5),P(n.sectionLimits.length-n.activeSectionsCount),c(4),s("ngForOf",n.sectionLimits),c(11),v("all ",n.sectionLimits.length," sections"),c(2),s("disabled",n.isSavingSections),c(),s("ngIf",n.isSavingSections),c(),s("ngIf",!n.isSavingSections),c(),v(" ",n.isSavingSections?"Saving All\u2026":"Save All Section Limits"," ")}}function de(o,m){if(o&1){let n=h();t(0,"button",155),u("click",function(){let a=f(n).$implicit,l=p(2);return l.queueFilter=a,_(l.loadVerificationQueue())}),r(1),e()}if(o&2){let n=m.$implicit,i=p(2);y("active",i.queueFilter===n),s("id","queue-filter-"+n),c(),P(n)}}function me(o,m){o&1&&(t(0,"div",27),d(1,"ion-spinner",28),e())}function pe(o,m){o&1&&(t(0,"div",106),r(1," No proofs in this queue. "),e())}function ge(o,m){if(o&1&&(t(0,"div",164)(1,"span"),r(2,"Extracted"),e(),t(3,"strong"),r(4),e()()),o&2){let n=p().$implicit,i=p(3);c(4),P(i.formatCurrency(n.extracted_amount))}}function ue(o,m){if(o&1&&(t(0,"div",164)(1,"span"),r(2,"AI Confidence"),e(),t(3,"strong"),r(4),e()()),o&2){let n=p().$implicit;c(4),v("",n.ai_confidence,"%")}}function fe(o,m){if(o&1){let n=h();t(0,"div",158)(1,"div",159)(2,"div")(3,"div",160),r(4),e(),t(5,"div",161),r(6),e()(),t(7,"ion-badge",162),r(8),e()(),t(9,"div",163)(10,"div",164)(11,"span"),r(12,"File"),e(),t(13,"strong"),r(14),e()(),t(15,"div",164)(16,"span"),r(17,"Declared"),e(),t(18,"strong"),r(19),e()(),b(20,ge,5,1,"div",165)(21,ue,5,1,"div",165),e(),t(22,"button",166),u("click",function(){let a=f(n).$implicit,l=p(3);return _(l.openVerifyModal(a))}),d(23,"ion-icon",167),r(24," Verify "),e()()}if(o&2){let n=m.$implicit,i=p(3);c(4),P(n.FullName),c(2),z("",n.EmployeeNumber," \xB7 ",n.section_code," \xB7 FY ",n.financial_year),c(),s("color",i.getVerificationColor(n.verification_status)),c(),P(n.verification_status),c(6),P(n.original_filename),c(5),P(i.formatCurrency(n.declared_amount)),c(),s("ngIf",n.extracted_amount),c(),s("ngIf",n.ai_confidence),c(),s("id","verify-btn-"+n.id)}}function _e(o,m){if(o&1&&(t(0,"div",156),b(1,fe,25,11,"div",157),e()),o&2){let n=p(2);c(),s("ngForOf",n.verificationQueue)}}function xe(o,m){if(o&1){let n=h();t(0,"div",168),u("click",function(){f(n);let a=p(2);return _(a.closeVerifyModal())}),e()}}function be(o,m){o&1&&d(0,"ion-spinner",28)}function ve(o,m){o&1&&d(0,"ion-icon",12)}function he(o,m){if(o&1){let n=h();t(0,"div",169)(1,"div",170)(2,"h3"),r(3),e(),t(4,"button",171),u("click",function(){f(n);let a=p(2);return _(a.closeVerifyModal())}),d(5,"ion-icon",105),e()(),t(6,"div",172)(7,"span")(8,"strong"),r(9,"Employee:"),e(),r(10),e(),t(11,"span")(12,"strong"),r(13,"Section:"),e(),r(14),e(),t(15,"span")(16,"strong"),r(17,"Declared:"),e(),r(18),e(),t(19,"span")(20,"strong"),r(21,"File:"),e(),r(22),e()(),t(23,"form",173)(24,"div",174)(25,"div",40)(26,"label"),r(27,"Extracted Amount (\u20B9)"),e(),d(28,"input",175),e(),t(29,"div",40)(30,"label"),r(31,"AI Confidence (%)"),e(),d(32,"input",176),e()(),t(33,"div",40)(34,"label"),r(35,"Override Status"),e(),t(36,"select",177)(37,"option",178),r(38,"AI_VERIFIED \u2705"),e(),t(39,"option",179),r(40,"FLAGGED \u26A0\uFE0F"),e(),t(41,"option",180),r(42,"APPROVED \u2705"),e(),t(43,"option",181),r(44,"REJECTED \u274C"),e()()(),t(45,"div",40)(46,"label"),r(47,"Notes"),e(),d(48,"textarea",182),e(),t(49,"button",183),u("click",function(){f(n);let a=p(2);return _(a.submitVerification())}),b(50,be,1,0,"ion-spinner",36)(51,ve,1,0,"ion-icon",184),r(52),e()()()}if(o&2){let n=p(2);c(3),v("Verify Proof #",n.selectedProof.id),c(7),v(" ",n.selectedProof.FullName),c(4),v(" ",n.selectedProof.section_code),c(4),v(" ",n.formatCurrency(n.selectedProof.declared_amount)),c(4),v(" ",n.selectedProof.original_filename),c(),s("formGroup",n.verifyForm),c(26),s("disabled",n.isSubmittingVerification),c(),s("ngIf",n.isSubmittingVerification),c(),s("ngIf",!n.isSubmittingVerification),c(),v(" ",n.isSubmittingVerification?"Submitting...":"Submit Verification"," ")}}function Pe(o,m){if(o&1&&(t(0,"div",21)(1,"div",22)(2,"div",23)(3,"div",149),d(4,"ion-icon",12),e(),t(5,"div")(6,"h2"),r(7,"Proof Verification Queue"),e(),t(8,"p"),r(9,"Review employee-submitted tax proof documents"),e()()(),t(10,"div",150),b(11,de,2,4,"button",151),e(),b(12,me,2,0,"div",25)(13,pe,2,0,"div",63)(14,_e,2,1,"div",152),e(),b(15,xe,1,0,"div",153)(16,he,53,10,"div",154),e()),o&2){let n=p();c(11),s("ngForOf",n.queueFilters),c(),s("ngIf",n.isLoadingQueue),c(),s("ngIf",!n.isLoadingQueue&&n.verificationQueue.length===0),c(),s("ngIf",!n.isLoadingQueue),c(),s("ngIf",n.selectedProof),c(),s("ngIf",n.selectedProof)}}function Ce(o,m){if(o&1&&(t(0,"option",20),r(1),e()),o&2){let n=m.$implicit;s("value",n),c(),P(n)}}function ye(o,m){o&1&&d(0,"ion-spinner",28)}function Oe(o,m){o&1&&d(0,"ion-icon",51)}function Me(o,m){if(o&1){let n=h();t(0,"div",21)(1,"div",22)(2,"div",23)(3,"div",185),d(4,"ion-icon",13),e(),t(5,"div")(6,"h2"),r(7,"Proof Submission Window"),e(),t(8,"p"),r(9,"Open or close the window for employees to submit investment proofs"),e()()(),t(10,"form",186)(11,"div",174)(12,"div",40)(13,"label"),r(14,"Window Type"),e(),d(15,"input",187),e(),t(16,"div",40)(17,"label"),r(18,"Financial Year"),e(),t(19,"select",188),b(20,Ce,2,2,"option",6),e()(),t(21,"div",40)(22,"label"),r(23,"Start Date & Time"),e(),d(24,"input",189),e(),t(25,"div",40)(26,"label"),r(27,"End Date & Time"),e(),d(28,"input",190),e()(),t(29,"div",40)(30,"label"),r(31,"Status"),e(),t(32,"div",191)(33,"button",192),u("click",function(){f(n);let a=p();return _(a.windowForm.patchValue({status:"OPEN"}))}),d(34,"ion-icon",193),r(35," OPEN "),e(),t(36,"button",194),u("click",function(){f(n);let a=p();return _(a.windowForm.patchValue({status:"CLOSED"}))}),d(37,"ion-icon",195),r(38," CLOSED "),e()()(),t(39,"div",40)(40,"label"),r(41,"Notes"),e(),d(42,"textarea",196),e(),t(43,"button",197),u("click",function(){f(n);let a=p();return _(a.saveWindow())}),b(44,ye,1,0,"ion-spinner",36)(45,Oe,1,0,"ion-icon",37),r(46),e()()()()}if(o&2){let n=p();c(10),s("formGroup",n.windowForm),c(10),s("ngForOf",n.availableYears),c(13),y("active-open",n.windowForm.value.status==="OPEN"),c(3),y("active-closed",n.windowForm.value.status==="CLOSED"),c(7),s("disabled",n.isSavingWindow),c(),s("ngIf",n.isSavingWindow),c(),s("ngIf",!n.isSavingWindow),c(),v(" ",n.isSavingWindow?"Saving...":"Save Window Configuration"," ")}}function Se(o,m){o&1&&d(0,"ion-spinner",28)}function we(o,m){o&1&&d(0,"ion-icon",219)}function Ee(o,m){if(o&1&&(t(0,"option",20),r(1),e()),o&2){let n=m.$implicit;s("value",n),c(),P(n)}}function Te(o,m){o&1&&(t(0,"div",27),d(1,"ion-spinner",28),e())}function ke(o,m){if(o&1&&(t(0,"pre",220),r(1),R(2,"json"),e()),o&2){let n=p(2);c(),P(q(2,1,n.payouts))}}function Ae(o,m){o&1&&(t(0,"p",106),r(1,"Enter a Run ID and click Fetch"),e())}function Ie(o,m){if(o&1){let n=h();t(0,"div",21)(1,"div",22)(2,"div",23)(3,"div",198),d(4,"ion-icon",14),e(),t(5,"div")(6,"h2"),r(7,"Initiate Salary Payouts"),e(),t(8,"p"),r(9,"Initiate actual fund disbursements after payroll is finalized"),e()()(),t(10,"form",199)(11,"div",174)(12,"div",40)(13,"label"),r(14,"Payroll Run ID"),e(),d(15,"input",200),e(),t(16,"div",40)(17,"label"),r(18,"Payout Date"),e(),d(19,"input",201),e(),t(20,"div",40)(21,"label"),r(22,"Payment Mode"),e(),t(23,"select",202)(24,"option",203),r(25,"BANK_TRANSFER"),e(),t(26,"option",204),r(27,"CHEQUE"),e(),t(28,"option",205),r(29,"CASH"),e()()()(),t(30,"button",206),u("click",function(){f(n);let a=p();return _(a.initiatePayouts())}),b(31,Se,1,0,"ion-spinner",36)(32,we,1,0,"ion-icon",207),r(33),e()()(),t(34,"div",22)(35,"div",23)(36,"div",208),d(37,"ion-icon",209),e(),t(38,"div")(39,"h2"),r(40,"Update Payout Status"),e(),t(41,"p"),r(42,"Mark individual payouts as completed, failed, etc."),e()()(),t(43,"form",199)(44,"div",174)(45,"div",40)(46,"label"),r(47,"Payout ID"),e(),d(48,"input",210),e(),t(49,"div",40)(50,"label"),r(51,"New Status"),e(),t(52,"select",211),b(53,Ee,2,2,"option",6),e()()(),t(54,"div",40)(55,"label"),r(56,"Remarks"),e(),d(57,"textarea",212),e(),t(58,"button",213),u("click",function(){f(n);let a=p();return _(a.updatePayoutStatus())}),d(59,"ion-icon",12),r(60," Update Status "),e()()(),t(61,"div",22)(62,"div",23)(63,"div",208),d(64,"ion-icon",11),e(),t(65,"div")(66,"h2"),r(67,"Payouts for Run"),e()()(),t(68,"div",214)(69,"input",215),k("ngModelChange",function(a){f(n);let l=p();return T(l.payoutRunId,a)||(l.payoutRunId=a),_(a)}),e(),t(70,"button",216),u("click",function(){f(n);let a=p();return _(a.loadPayoutsForRun())}),d(71,"ion-icon",217),r(72," Fetch "),e()(),b(73,Te,2,0,"div",25)(74,ke,3,3,"pre",218)(75,Ae,2,0,"p",63),e()()}if(o&2){let n=p();c(10),s("formGroup",n.payoutForm),c(20),s("disabled",n.isSavingPayout||n.payoutForm.invalid),c(),s("ngIf",n.isSavingPayout),c(),s("ngIf",!n.isSavingPayout),c(),v(" ",n.isSavingPayout?"Initiating...":"Initiate Payouts"," "),c(10),s("formGroup",n.payoutStatusForm),c(10),s("ngForOf",n.payoutStatuses),c(5),s("disabled",n.payoutStatusForm.invalid),c(11),E("ngModel",n.payoutRunId),c(4),s("ngIf",n.isLoadingPayouts),c(),s("ngIf",!n.isLoadingPayouts&&n.payouts.length),c(),s("ngIf",!n.isLoadingPayouts&&!n.payouts.length)}}function Fe(o,m){if(o&1&&(t(0,"option",20),r(1),e()),o&2){let n=m.$implicit;s("value",n),c(),P(n)}}function Ve(o,m){o&1&&d(0,"ion-spinner",28)}function Ne(o,m){o&1&&d(0,"ion-icon",51)}function De(o,m){o&1&&(t(0,"div",27),d(1,"ion-spinner",28),e())}function Le(o,m){if(o&1&&(t(0,"div",236)(1,"div",237),d(2,"ion-icon",238),e(),t(3,"h3"),r(4),e(),t(5,"p"),r(6,"Use the form above to initialize the deduction amounts."),e()()),o&2){let n=p(3);c(4),v("No standard deductions defined for FY ",n.financialYear)}}function Be(o,m){if(o&1){let n=h();t(0,"div",239)(1,"div",240)(2,"div",241),d(3,"ion-icon",130),r(4),e(),t(5,"div",242),r(6),e()(),t(7,"div",243)(8,"div",244),r(9,"Applicable Standard Deduction"),e(),t(10,"div",245),r(11),e()(),t(12,"div",246)(13,"button",247),u("click",function(){let a=f(n).$implicit,l=p(3);return _(l.deleteStandardDeduction(a.id))}),d(14,"ion-icon",92),e()()()}if(o&2){let n=m.$implicit,i=p(3);y("new-deduction",n.regime_type==="NEW")("old-deduction",n.regime_type==="OLD"),c(3),s("name",n.regime_type==="NEW"?"flash":"time"),c(),v(" ",n.regime_type==="NEW"?"New Tax Regime":"Old Tax Regime"," "),c(2),P(n.financial_year),c(5),P(i.formatCurrency(n.amount))}}function ze(o,m){if(o&1&&(t(0,"div",233),b(1,Le,7,1,"div",234)(2,Be,15,8,"div",235),e()),o&2){let n=p(2);c(),s("ngIf",!n.standardDeductions.length),c(),s("ngForOf",n.standardDeductions)}}function Re(o,m){if(o&1){let n=h();t(0,"div",21)(1,"div",221)(2,"div",54)(3,"div",55),d(4,"ion-icon",15),e(),t(5,"div")(6,"h2"),r(7,"Standard Deduction Management"),e(),t(8,"p"),r(9,"Configure the standard deduction amount applicable for employees under "),t(10,"strong"),r(11),e()()()(),t(12,"button",56),u("click",function(){f(n);let a=p();return _(a.loadStandardDeductions())}),d(13,"ion-icon",57),t(14,"span"),r(15,"Refresh"),e()()(),t(16,"div",222)(17,"div",223),d(18,"ion-icon",70),t(19,"h3"),r(20,"Add or Update Deduction"),e()(),t(21,"form",29)(22,"div",224)(23,"div",40)(24,"label"),r(25,"Regime Type"),e(),t(26,"select",225)(27,"option",226),r(28,"\u{1F680} New Tax Regime"),e(),t(29,"option",227),r(30,"\u{1F4DC} Old Tax Regime"),e()()(),t(31,"div",40)(32,"label"),r(33,"Deduction Amount (\u20B9)"),e(),d(34,"input",228),e(),t(35,"div",40)(36,"label"),r(37,"Financial Year"),e(),t(38,"select",229),u("change",function(a){f(n);let l=p();return _(l.syncFinancialYear(a))}),b(39,Fe,2,2,"option",6),e()()(),t(40,"div",230)(41,"button",231),u("click",function(){f(n);let a=p();return _(a.createStandardDeduction())}),b(42,Ve,1,0,"ion-spinner",36)(43,Ne,1,0,"ion-icon",37),r(44),e()()()(),b(45,De,2,0,"div",25)(46,ze,3,2,"div",232),e()}if(o&2){let n=p();c(11),v("FY ",n.financialYear),c(10),s("formGroup",n.deductionForm),c(18),s("ngForOf",n.availableYears),c(2),s("disabled",n.isSavingDeductions),c(),s("ngIf",n.isSavingDeductions),c(),s("ngIf",!n.isSavingDeductions),c(),v(" ",n.isSavingDeductions?"Saving...":"Save Configuration"," "),c(),s("ngIf",n.isLoadingDeductions),c(),s("ngIf",!n.isLoadingDeductions)}}var En=(()=>{let m=class m{constructor(i,a,l,x,C,A){this.fb=i,this.router=a,this.payrollApi=l,this.toaster=x,this.alertCtrl=C,this.loadingCtrl=A,this.activeTab="statutory",this.availableYears=[],this.statutoryRules=[],this.isLoadingStatutory=!1,this.isSavingStatutory=!1,this.taxSlabs=[],this.isLoadingSlabs=!1,this.isSavingNewSlabs=!1,this.isSavingOldSlabs=!1,this.ptSlabs=[],this.isLoadingPT=!1,this.isSavingPT=!1,this.sectionLimits=[{section_code:"80C",max_limit:15e4,financial_year:"",is_active:!0},{section_code:"80D",max_limit:25e3,financial_year:"",is_active:!0},{section_code:"HRA",max_limit:2e5,financial_year:"",is_active:!0},{section_code:"80G",max_limit:5e4,financial_year:"",is_active:!0},{section_code:"80TTA",max_limit:1e4,financial_year:"",is_active:!0},{section_code:"NPS",max_limit:5e4,financial_year:"",is_active:!0}],this.isLoadingSections=!1,this.isSavingSections=!1,this.sectionEditModes=[],this.isSavingSection=[],this.verificationQueue=[],this.queueFilter="PENDING",this.isLoadingQueue=!1,this.selectedProof=null,this.isSubmittingVerification=!1,this.queueFilters=["PENDING","AI_VERIFIED","FLAGGED","APPROVED","REJECTED"],this.isSavingWindow=!1,this.payouts=[],this.payoutRunId=null,this.isLoadingPayouts=!1,this.isSavingPayout=!1,this.payoutStatuses=["PENDING","PROCESSING","COMPLETED","FAILED"],this.standardDeductions=[],this.isLoadingDeductions=!1,this.isSavingDeductions=!1,this.financialYear=this.payrollApi.getCurrentFinancialYear();let O=new Date().getFullYear();this.availableYears=[`${O-2}-${O-1}`,`${O-1}-${O}`,`${O}-${O+1}`,`${O+1}-${O+2}`]}ngOnInit(){this.initForms(),this.loadActiveTabData()}onYearChange(){this.deductionForm&&this.deductionForm.patchValue({financial_year:this.financialYear},{emitEvent:!1}),this.loadActiveTabData()}syncFinancialYear(i){let a=i?.target?.value;a&&(this.financialYear=a,this.loadActiveTabData())}loadActiveTabData(){this.setTab(this.activeTab)}initForms(){this.statutoryForm=this.fb.group({rules:this.fb.array([this.createRuleGroup("PF","DEFAULT",12,15e3,"2025-04-01"),this.createRuleGroup("ESI","DEFAULT",.75,21e3,"2025-04-01")])}),this.verifyForm=this.fb.group({extracted_amount:[0,[g.required,g.min(0)]],confidence:[90,[g.required,g.min(0),g.max(100)]],verification_status:["AI_VERIFIED"],notes:[""]});let i=new Date,a=new Date(i.getFullYear(),0,1).toISOString(),l=new Date(i.getFullYear(),1,28,23,59,59).toISOString();this.windowForm=this.fb.group({window_type:["proof_submission",g.required],financial_year:[this.financialYear,g.required],start_at:[a.slice(0,16),g.required],end_at:[l.slice(0,16),g.required],status:["OPEN",g.required],notes:[""]}),this.taxSlabsForm=this.fb.group({slabs:this.fb.array([])}),this.ptSlabsForm=this.fb.group({slabs:this.fb.array([])}),this.payoutForm=this.fb.group({run_id:[null,[g.required,g.min(1)]],payout_date:[new Date().toISOString().split("T")[0],g.required],payment_mode:["BANK_TRANSFER",g.required]}),this.payoutStatusForm=this.fb.group({payout_id:[null,[g.required,g.min(1)]],status:["COMPLETED",g.required],remarks:["",g.required]}),this.deductionForm=this.fb.group({regime_type:["NEW",g.required],amount:[5e4,[g.required,g.min(0)]],financial_year:[this.financialYear,g.required]})}get ruleControls(){return this.statutoryForm.get("rules")}get taxSlabControls(){return this.taxSlabsForm.get("slabs")}get ptSlabControls(){return this.ptSlabsForm.get("slabs")}createRuleGroup(i,a,l,x,C){return this.fb.group({provider_type:[i,g.required],state_code:[a,g.required],percentage:[l,[g.required,g.min(0),g.max(100)]],ceiling_limit:[x,[g.required,g.min(0)]],effective_from:[C,g.required]})}createTaxSlabGroup(i){return this.fb.group({regime_type:[i?.regime_type||"NEW",g.required],min_income:[i?.min_income||0,[g.required,g.min(0)]],max_income:[i?.max_income||null],rate:[i?.rate||0,[g.required,g.min(0),g.max(100)]],cess_rate:[i?.cess_rate||4,[g.required,g.min(0)]],financial_year:[i?.financial_year||this.financialYear,g.required]})}createPTSlabGroup(i){return this.fb.group({state_code:[i?.state_code||"DEFAULT",g.required],ceiling_limit:[i?.ceiling_limit||0,[g.required,g.min(0)]],fixed_amount:[i?.fixed_amount||0,[g.required,g.min(0)]],effective_from:[i?.effective_from||new Date().toISOString().split("T")[0],g.required]})}addRule(){this.ruleControls.push(this.createRuleGroup("PF","DEFAULT",12,15e3,new Date().toISOString().split("T")[0]))}removeRule(i){this.ruleControls.removeAt(i)}addTaxSlab(i="NEW"){this.taxSlabControls.push(this.createTaxSlabGroup({regime_type:i,min_income:0,max_income:0,rate:0,cess_rate:4,financial_year:this.financialYear}))}removeTaxSlab(i){this.taxSlabControls.removeAt(i)}addPTSlab(){this.ptSlabControls.push(this.createPTSlabGroup())}removePTSlab(i){this.ptSlabControls.removeAt(i)}setTab(i){this.activeTab=i,i==="statutory"&&this.loadStatutoryRules(),i==="slabs"&&(this.loadTaxSlabs(),this.loadPTSlabs()),i==="sections"&&this.loadSectionLimits(),i==="queue"&&this.loadVerificationQueue(),i==="deductions"&&this.loadStandardDeductions()}loadStatutoryRules(){this.isLoadingStatutory=!0,this.payrollApi.getStatutoryRules().subscribe({next:i=>{let a=i.rules||[];this.statutoryRules=a;let l=this.ruleControls;for(;l.length;)l.removeAt(0);a.length?a.forEach(x=>l.push(this.createRuleGroup(x.provider_type,x.state_code,x.percentage,x.ceiling_limit,x.effective_from))):(l.push(this.createRuleGroup("PF","DEFAULT",12,15e3,"2025-04-01")),l.push(this.createRuleGroup("ESI","DEFAULT",.75,21e3,"2025-04-01"))),this.isLoadingStatutory=!1},error:()=>{this.isLoadingStatutory=!1}})}saveStatutoryRules(){this.statutoryForm.invalid||(this.isSavingStatutory=!0,this.payrollApi.updateStatutoryRules(this.statutoryForm.value.rules).subscribe({next:()=>{this.toaster.showSuccess("Statutory rules updated"),this.isSavingStatutory=!1},error:()=>{this.toaster.showError("Failed to update statutory rules"),this.isSavingStatutory=!1}}))}loadTaxSlabs(){this.isLoadingSlabs=!0,this.payrollApi.getTaxSlabs(this.financialYear).subscribe({next:i=>{let a=i.slabs||[],l=new Map;a.forEach(C=>{let A=`${C.regime_type}-${Number(C.min_income)}-${Number(C.max_income)}`;l.set(A,C)}),a=Array.from(l.values()),a.sort((C,A)=>Number(C.min_income)-Number(A.min_income)),this.taxSlabs=a;let x=this.taxSlabControls;for(;x.length;)x.removeAt(0);a.forEach(C=>x.push(this.createTaxSlabGroup(C))),this.isLoadingSlabs=!1},error:()=>{this.isLoadingSlabs=!1}})}saveRegimeSlabs(i){if(this.taxSlabsForm.invalid)return;i==="NEW"?this.isSavingNewSlabs=!0:this.isSavingOldSlabs=!0;let l=this.taxSlabsForm.value.slabs.filter(x=>x.regime_type===i).map(x=>S(M({},x),{financial_year:this.financialYear}));if(l.length===0){this.toaster.showWarning(`No ${i} regime slabs to save`),this.isSavingNewSlabs=!1,this.isSavingOldSlabs=!1;return}this.payrollApi.createTaxSlabs(l).subscribe({next:()=>{this.toaster.showSuccess(`${i} regime tax slabs updated successfully`),i==="NEW"?this.isSavingNewSlabs=!1:this.isSavingOldSlabs=!1,this.loadTaxSlabs()},error:()=>{this.toaster.showError(`Failed to update ${i} regime tax slabs`),i==="NEW"?this.isSavingNewSlabs=!1:this.isSavingOldSlabs=!1}})}loadPTSlabs(){this.isLoadingPT=!0,this.payrollApi.getPTSlabs().subscribe({next:i=>{let a=i.slabs||[];this.ptSlabs=a;let l=this.ptSlabControls;for(;l.length;)l.removeAt(0);a.forEach(x=>l.push(this.createPTSlabGroup(x))),this.isLoadingPT=!1},error:()=>{this.isLoadingPT=!1}})}savePTSlabs(){this.ptSlabsForm.invalid||(this.isSavingPT=!0,this.toaster.showInfo("PT slab direct update pending backend confirmation. Mapping to statutory system."),this.isSavingPT=!1)}getNewSlabControls(){return this.taxSlabControls.controls.filter(i=>i.value.regime_type==="NEW")}getOldSlabControls(){return this.taxSlabControls.controls.filter(i=>i.value.regime_type==="OLD")}getNewSlabs(){return this.taxSlabs.filter(i=>i.regime_type==="NEW")}getOldSlabs(){return this.taxSlabs.filter(i=>i.regime_type==="OLD")}loadSectionLimits(){this.sectionLimits.forEach(i=>{i.financial_year=this.financialYear}),this.sectionEditModes=this.sectionLimits.map(()=>!1),this.isSavingSection=this.sectionLimits.map(()=>!1)}get activeSectionsCount(){return this.sectionLimits.filter(i=>i.is_active!==!1).length}getSectionDescription(i){return{"80C":"Life Insurance, PPF, ELSS, EPF & Home Loan Principal","80D":"Health Insurance Premium (Self, Spouse & Children)",HRA:"House Rent Allowance Exemption","80G":"Donations to Approved Charitable Organisations","80TTA":"Interest on Savings Account (Banks/Co-ops)",NPS:"National Pension System \u2013 Additional Deduction","80CCD":"NPS Employer Contribution (Section 80CCD(2))","80E":"Education Loan Interest Deduction","24B":"Home Loan Interest (Self-Occupied Property)","80EEA":"Additional Home Loan Interest (Affordable Housing)"}[i]||"Income Tax Deduction Section"}getSectionColorClass(i){return{"80C":"badge-blue","80D":"badge-green",HRA:"badge-purple","80G":"badge-orange","80TTA":"badge-teal",NPS:"badge-indigo","80CCD":"badge-pink","80E":"badge-amber","24B":"badge-red","80EEA":"badge-rose"}[i]||"badge-gray"}toggleSectionEdit(i){this.sectionEditModes[i]=!this.sectionEditModes[i]}toggleSectionActive(i){this.sectionLimits[i]=S(M({},this.sectionLimits[i]),{is_active:!this.sectionLimits[i].is_active})}saveSingleSection(i){this.isSavingSection[i]=!0;let a=[S(M({},this.sectionLimits[i]),{financial_year:this.financialYear})];this.payrollApi.updateSectionLimits(a).subscribe({next:()=>{this.toaster.showSuccess(`${a[0].section_code} limit saved successfully`),this.isSavingSection[i]=!1,this.sectionEditModes[i]=!1},error:()=>{this.toaster.showError("Failed to save section limit"),this.isSavingSection[i]=!1}})}addNewSection(){this.sectionLimits.push({section_code:"",max_limit:0,financial_year:this.financialYear,is_active:!0}),this.sectionEditModes.push(!0),this.isSavingSection.push(!1)}removeSection(i){this.sectionLimits.splice(i,1),this.sectionEditModes.splice(i,1),this.isSavingSection.splice(i,1)}saveSectionLimits(){this.isSavingSections=!0;let i=this.sectionLimits.map(a=>S(M({},a),{financial_year:this.financialYear}));this.payrollApi.updateSectionLimits(i).subscribe({next:()=>{this.toaster.showSuccess("All section limits updated successfully"),this.isSavingSections=!1,this.sectionEditModes=this.sectionLimits.map(()=>!1)},error:()=>{this.toaster.showError("Failed to update section limits"),this.isSavingSections=!1}})}loadVerificationQueue(){this.isLoadingQueue=!0,this.payrollApi.getVerificationQueue(this.queueFilter,this.financialYear).subscribe({next:i=>{this.verificationQueue=i.queue||[],this.isLoadingQueue=!1},error:()=>{this.isLoadingQueue=!1}})}openVerifyModal(i){this.selectedProof=i,this.verifyForm.patchValue({extracted_amount:i.declared_amount,confidence:90,verification_status:"AI_VERIFIED",notes:""})}closeVerifyModal(){this.selectedProof=null}submitVerification(){if(!this.selectedProof||this.verifyForm.invalid)return;this.isSubmittingVerification=!0;let i=M({proof_id:this.selectedProof.id},this.verifyForm.value);this.payrollApi.submitAIVerificationResult(i).subscribe({next:a=>{this.toaster.showSuccess(`Proof #${a.proof_id} verified: ${a.verification_status}`),this.isSubmittingVerification=!1,this.selectedProof=null,this.loadVerificationQueue()},error:()=>{this.toaster.showError("Verification failed"),this.isSubmittingVerification=!1}})}getVerificationColor(i){let a=(i||"").toUpperCase();return a==="AI_VERIFIED"||a==="APPROVED"?"success":a==="FLAGGED"?"warning":a==="REJECTED"?"danger":"medium"}saveWindow(){if(this.windowForm.invalid)return;this.isSavingWindow=!0;let i=this.windowForm.value,a=S(M({},i),{start_at:new Date(i.start_at).toISOString(),end_at:new Date(i.end_at).toISOString()});this.payrollApi.setConfigWindow(a).subscribe({next:l=>{this.toaster.showSuccess(`Window ${l.status}: ${l.window_type} for ${l.financial_year}`),this.isSavingWindow=!1},error:()=>{this.toaster.showError("Failed to update window"),this.isSavingWindow=!1}})}initiatePayouts(){if(this.payoutForm.invalid)return;this.isSavingPayout=!0;let i=S(M({},this.payoutForm.value),{run_id:Number(this.payoutForm.value.run_id)});this.payrollApi.initiatePayouts(i).subscribe({next:a=>{this.toaster.showSuccess("Payouts initiated successfully"),this.isSavingPayout=!1,this.loadPayoutsForRun(i.run_id)},error:()=>{this.toaster.showError("Failed to initiate payouts"),this.isSavingPayout=!1}})}loadPayoutsForRun(i){let a=i||this.payoutRunId;a&&(this.payoutRunId=a,this.isLoadingPayouts=!0,this.payrollApi.getPayoutsForRun(a).subscribe({next:l=>{this.payouts=Array.isArray(l)?l:l.payouts||[],this.isLoadingPayouts=!1},error:()=>{this.isLoadingPayouts=!1}}))}updatePayoutStatus(){if(this.payoutStatusForm.invalid)return;let{payout_id:i,status:a,remarks:l}=this.payoutStatusForm.value;this.payrollApi.updatePayoutStatus(Number(i),{status:a,remarks:l}).subscribe({next:()=>{this.toaster.showSuccess("Payout status updated"),this.payoutRunId&&this.loadPayoutsForRun(this.payoutRunId)},error:()=>this.toaster.showError("Failed to update payout status")})}loadStandardDeductions(){this.isLoadingDeductions=!0,this.payrollApi.getStandardDeductions(this.financialYear).subscribe({next:i=>{this.standardDeductions=Array.isArray(i)?i:i.deductions||[],this.isLoadingDeductions=!1},error:()=>{this.isLoadingDeductions=!1,this.toaster.showError("Failed to load standard deductions")}})}createStandardDeduction(){this.deductionForm.invalid||(this.isSavingDeductions=!0,this.payrollApi.createStandardDeduction(this.deductionForm.value).subscribe({next:()=>{this.toaster.showSuccess("Standard deduction created successfully"),this.isSavingDeductions=!1,this.loadStandardDeductions(),this.deductionForm.patchValue({amount:5e4})},error:()=>{this.isSavingDeductions=!1,this.toaster.showError("Failed to create standard deduction")}}))}deleteStandardDeduction(i){return V(this,null,function*(){yield(yield this.alertCtrl.create({header:"Confirm Delete",message:"Are you sure you want to delete this standard deduction?",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",role:"destructive",handler:()=>{this.payrollApi.deleteStandardDeduction(i).subscribe({next:()=>{this.toaster.showSuccess("Standard deduction deleted"),this.loadStandardDeductions()},error:()=>this.toaster.showError("Failed to delete standard deduction")})}}]})).present()})}formatCurrency(i){return"\u20B9"+(i||0).toLocaleString("en-IN",{maximumFractionDigits:0})}goBack(){this.router.navigate(["/finance/admin"])}};m.\u0275fac=function(a){return new(a||m)(w(mn),w(Q),w(wn),w(Sn),w(yn),w(On))},m.\u0275cmp=D({type:m,selectors:[["app-tax-admin"]],standalone:!1,decls:40,vars:23,consts:[[1,"tax-admin-header"],["slot","start"],["defaultHref","/finance/admin",3,"click"],["slot","end",1,"buttons-last-slot"],[1,"fy-selector"],["id","fy-select",1,"fy-select",3,"ngModelChange","change","ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"admin-tabs"],[1,"admin-tab",3,"click"],["name","shield-checkmark-outline"],["name","layers-outline"],["name","list-outline"],["name","checkmark-circle-outline"],["name","calendar-outline"],["name","cash-outline"],["name","calculator-outline"],[1,"tax-admin-content"],["class","tab-panel",4,"ngIf"],["class","tab-panel slabs-admin-tab",4,"ngIf"],["class","tab-panel sections-tab",4,"ngIf"],[3,"value"],[1,"tab-panel"],[1,"glass-card"],[1,"card-header"],[1,"card-icon","shield-icon"],["class","center-loader",4,"ngIf"],[3,"formGroup",4,"ngIf"],[1,"center-loader"],["name","crescent"],[3,"formGroup"],["formArrayName","rules"],["class","rule-row",3,"formGroupName",4,"ngFor","ngForOf"],[1,"action-row"],["type","button","id","add-rule-btn",1,"add-rule-btn",3,"click"],["name","add-outline"],["id","save-statutory-btn",1,"save-btn",3,"click","disabled"],["name","crescent",4,"ngIf"],["name","save-outline",4,"ngIf"],[1,"rule-row",3,"formGroupName"],[1,"form-grid-5"],[1,"form-group"],["formControlName","provider_type",1,"glass-input",3,"id"],["value","PF"],["value","ESI"],["value","PT"],["formControlName","state_code","placeholder","DEFAULT",1,"glass-input",3,"id"],["type","number","formControlName","percentage","step","0.01",1,"glass-input",3,"id"],["type","number","formControlName","ceiling_limit",1,"glass-input",3,"id"],["type","date","formControlName","effective_from",1,"glass-input",3,"id"],["type","button",1,"remove-btn",3,"click"],["name","close-circle-outline"],["name","save-outline"],[1,"tab-panel","slabs-admin-tab"],[1,"slabs-hero","glass-card"],[1,"hero-content"],[1,"hero-icon"],[1,"refresh-btn-premium",3,"click"],["name","refresh-outline"],["class","slabs-master-form",3,"formGroup",4,"ngIf"],[1,"card-icon","pt-icon"],["name","business-outline"],["id","refresh-pt-btn",1,"refresh-btn",3,"click"],["class","pt-slabs-form",3,"formGroup",4,"ngIf"],["class","empty-msg",4,"ngIf"],[1,"slabs-master-form",3,"formGroup"],[1,"regime-premium-card","new-regime-card"],[1,"rpc-header"],[1,"rpc-title"],["name","flash-outline"],["type","button",1,"add-btn-small",3,"click"],["name","add-circle-outline"],["formArrayName","slabs",1,"slab-grid-container"],[1,"slab-grid-header"],[1,"col-min"],[1,"col-max"],[1,"col-tax"],[1,"col-cess"],[1,"col-action"],[4,"ngFor","ngForOf"],[1,"rpc-footer"],[1,"footer-hint"],[1,"rpc-save-btn","new-save",3,"click","disabled"],[1,"regime-premium-card","old-regime-card"],["name","time-outline"],[1,"rpc-save-btn","old-save",3,"click","disabled"],["class","slab-grid-row",3,"formGroupName",4,"ngIf"],[1,"slab-grid-row",3,"formGroupName"],["type","number","formControlName","min_income","placeholder","0",1,"slab-input"],["type","number","formControlName","max_income","placeholder","No Limit",1,"slab-input"],["type","number","formControlName","rate","step","0.1",1,"slab-input","center"],["type","number","formControlName","cess_rate",1,"slab-input","center"],["type","button",1,"slab-delete-btn",3,"click"],["name","trash-outline"],[1,"pt-slabs-form",3,"formGroup"],["formArrayName","slabs",1,"slab-rows"],[1,"slab-row-header-pt"],["class","slab-edit-row-pt",3,"formGroupName",4,"ngFor","ngForOf"],["type","button",1,"add-slab-btn",3,"click"],["id","save-pt-btn",1,"save-btn",3,"click","disabled"],[1,"slab-edit-row-pt",3,"formGroupName"],["type","text","formControlName","state_code","placeholder","e.g. MH",1,"glass-input"],["type","number","formControlName","ceiling_limit",1,"glass-input"],["type","number","formControlName","fixed_amount",1,"glass-input"],["type","date","formControlName","effective_from",1,"glass-input"],[1,"remove-tiny",3,"click"],["name","close-outline"],[1,"empty-msg"],[1,"tab-panel","sections-tab"],[1,"sections-hero-card","glass-card"],[1,"sections-hero-left"],[1,"hero-icon-wrap"],[1,"sections-hero-stats"],[1,"hero-stat"],[1,"hero-stat-value"],[1,"hero-stat-label"],[1,"hero-stat","hero-stat-success"],[1,"hero-stat","hero-stat-muted"],[1,"sections-premium-grid"],["class","section-premium-card",3,"edit-active","is-inactive",4,"ngFor","ngForOf"],["id","add-section-btn","type","button",1,"add-section-card",3,"click"],[1,"sections-global-actions","glass-card"],[1,"global-save-info"],["name","information-circle-outline"],["id","save-sections-btn",1,"save-all-sections-btn",3,"click","disabled"],["name","crescent","class","small-spinner",4,"ngIf"],[1,"section-premium-card"],[1,"spc-top"],[1,"section-badge",3,"ngClass"],[1,"spc-actions"],["type","button",1,"active-toggle-btn",3,"click","id"],[3,"name"],["type","button",1,"spc-edit-btn",3,"click","id"],["class","spc-remove-btn","type","button",3,"id","click",4,"ngIf"],[1,"spc-description"],["class","spc-limit-view",4,"ngIf"],["class","spc-limit-edit",4,"ngIf"],["type","button",1,"spc-remove-btn",3,"click","id"],[1,"spc-limit-view"],[1,"limit-label"],[1,"limit-amount"],[1,"limit-fy"],[1,"spc-limit-edit"],["type","text","placeholder","e.g. 80C",1,"glass-input",3,"ngModelChange","ngModel","id"],["type","number","min","0",1,"glass-input",3,"ngModelChange","ngModel"],[1,"glass-input",3,"ngModelChange","ngModel","id"],[1,"save-single-btn",3,"click","disabled","id"],["name","cloud-upload-outline",4,"ngIf"],["name","crescent",1,"small-spinner"],["name","cloud-upload-outline"],[1,"card-icon","verify-icon"],[1,"filter-chips"],["class","filter-chip",3,"active","id","click",4,"ngFor","ngForOf"],["class","queue-list",4,"ngIf"],["class","overlay",3,"click",4,"ngIf"],["class","verify-modal glass-card",4,"ngIf"],[1,"filter-chip",3,"click","id"],[1,"queue-list"],["class","queue-item glass-sub-card",4,"ngFor","ngForOf"],[1,"queue-item","glass-sub-card"],[1,"queue-top"],[1,"queue-name"],[1,"queue-meta"],[3,"color"],[1,"queue-body"],[1,"queue-info"],["class","queue-info",4,"ngIf"],[1,"verify-btn",3,"click","id"],["name","checkmark-done-outline"],[1,"overlay",3,"click"],[1,"verify-modal","glass-card"],[1,"modal-header"],[1,"close-btn",3,"click"],[1,"proof-summary"],[1,"verify-form",3,"formGroup"],[1,"form-grid-2"],["type","number","formControlName","extracted_amount","id","extracted-amount","min","0",1,"glass-input"],["type","number","formControlName","confidence","id","ai-confidence","min","0","max","100",1,"glass-input"],["formControlName","verification_status","id","verify-status-select",1,"glass-input"],["value","AI_VERIFIED"],["value","FLAGGED"],["value","APPROVED"],["value","REJECTED"],["formControlName","notes","rows","2","id","verify-notes","placeholder","Optional reviewer notes",1,"glass-input"],["id","submit-verify-btn",1,"save-btn",3,"click","disabled"],["name","checkmark-circle-outline",4,"ngIf"],[1,"card-icon","calendar-icon"],[1,"window-form",3,"formGroup"],["formControlName","window_type","id","window-type","placeholder","proof_submission",1,"glass-input"],["formControlName","financial_year","id","window-fy",1,"glass-input"],["type","datetime-local","formControlName","start_at","id","window-start",1,"glass-input"],["type","datetime-local","formControlName","end_at","id","window-end",1,"glass-input"],[1,"status-toggle"],["type","button","id","window-open-btn",1,"status-btn",3,"click"],["name","lock-open-outline"],["type","button","id","window-close-btn",1,"status-btn",3,"click"],["name","lock-closed-outline"],["formControlName","notes","rows","2","id","window-notes","placeholder","Optional notes for employees",1,"glass-input"],["id","save-window-btn",1,"save-btn",3,"click","disabled"],[1,"card-icon","cash-icon"],[1,"payout-form",3,"formGroup"],["type","number","formControlName","run_id","id","payout-run-id","placeholder","e.g. 15",1,"glass-input"],["type","date","formControlName","payout_date","id","payout-date",1,"glass-input"],["formControlName","payment_mode","id","payout-mode",1,"glass-input"],["value","BANK_TRANSFER"],["value","CHEQUE"],["value","CASH"],["id","initiate-payout-btn",1,"save-btn","initiate-btn",3,"click","disabled"],["name","send-outline",4,"ngIf"],[1,"card-icon"],["name","pencil-outline"],["type","number","formControlName","payout_id","id","update-payout-id","placeholder","e.g. 7",1,"glass-input"],["formControlName","status","id","update-payout-status",1,"glass-input"],["formControlName","remarks","rows","2","id","payout-remarks","placeholder","e.g. Transferred via NEFT batch 001",1,"glass-input"],["id","update-payout-btn",1,"save-btn",3,"click","disabled"],[1,"inline-search-row"],["type","number","id","view-payouts-run-id","placeholder","Run ID",1,"glass-input","small-input",3,"ngModelChange","ngModel"],["id","view-payouts-btn",1,"fetch-btn",3,"click"],["name","search-outline"],["class","json-block",4,"ngIf"],["name","send-outline"],[1,"json-block"],[1,"deductions-hero","glass-card"],[1,"deduction-form-premium","glass-card"],[1,"form-header-small"],[1,"form-grid-3"],["formControlName","regime_type",1,"glass-input"],["value","NEW"],["value","OLD"],["type","number","formControlName","amount","placeholder","e.g. 50000",1,"glass-input"],["formControlName","financial_year",1,"glass-input",3,"change"],[1,"action-row",2,"justify-content","flex-end","margin-top","10px"],[1,"save-btn",3,"click","disabled"],["class","deductions-display-grid",4,"ngIf"],[1,"deductions-display-grid"],["class","empty-deductions-placeholder",4,"ngIf"],["class","deduction-regime-card",3,"new-deduction","old-deduction",4,"ngFor","ngForOf"],[1,"empty-deductions-placeholder"],[1,"placeholder-icon"],["name","file-tray-outline"],[1,"deduction-regime-card"],[1,"drc-banner"],[1,"regime-label"],[1,"drc-fy"],[1,"drc-body"],[1,"deduction-label"],[1,"deduction-amount"],[1,"drc-actions"],["title","Remove Configuration",1,"slab-delete-btn",3,"click"]],template:function(a,l){a&1&&(t(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-back-button",2),u("click",function(){return l.goBack()}),e()(),t(4,"ion-title"),r(5,"Tax Administration"),e(),t(6,"ion-buttons",3)(7,"div",4)(8,"select",5),k("ngModelChange",function(C){return T(l.financialYear,C)||(l.financialYear=C),C}),u("change",function(){return l.onYearChange()}),b(9,kn,2,2,"option",6),e()()()(),t(10,"div",7)(11,"button",8),u("click",function(){return l.setTab("statutory")}),d(12,"ion-icon",9),r(13," Statutory "),e(),t(14,"button",8),u("click",function(){return l.setTab("slabs")}),d(15,"ion-icon",10),r(16," Tax Slabs "),e(),t(17,"button",8),u("click",function(){return l.setTab("sections")}),d(18,"ion-icon",11),r(19," 80C/80D Limits "),e(),t(20,"button",8),u("click",function(){return l.setTab("queue")}),d(21,"ion-icon",12),r(22," Verify Queue "),e(),t(23,"button",8),u("click",function(){return l.setTab("window")}),d(24,"ion-icon",13),r(25," Proof Window "),e(),t(26,"button",8),u("click",function(){return l.setTab("payout")}),d(27,"ion-icon",14),r(28," Payouts "),e(),t(29,"button",8),u("click",function(){return l.setTab("deductions")}),d(30,"ion-icon",15),r(31," Standard Deduction "),e()()(),t(32,"ion-content",16),b(33,Dn,12,2,"div",17)(34,Zn,32,6,"div",18)(35,le,46,10,"div",19)(36,Pe,17,6,"div",17)(37,Me,47,10,"div",17)(38,Ie,76,12,"div",17)(39,Re,47,9,"div",17),e()),a&2&&(c(8),E("ngModel",l.financialYear),c(),s("ngForOf",l.availableYears),c(2),y("active",l.activeTab==="statutory"),c(3),y("active",l.activeTab==="slabs"),c(3),y("active",l.activeTab==="sections"),c(3),y("active",l.activeTab==="queue"),c(3),y("active",l.activeTab==="window"),c(3),y("active",l.activeTab==="payout"),c(3),y("active",l.activeTab==="deductions"),c(4),s("ngIf",l.activeTab==="statutory"),c(),s("ngIf",l.activeTab==="slabs"),c(),s("ngIf",l.activeTab==="sections"),c(),s("ngIf",l.activeTab==="queue"),c(),s("ngIf",l.activeTab==="window"),c(),s("ngIf",l.activeTab==="payout"),c(),s("ngIf",l.activeTab==="deductions"))},dependencies:[G,Y,W,Z,cn,sn,U,nn,an,J,K,dn,ln,X,en,rn,tn,on,un,fn,_n,xn,bn,vn,hn,Pn,Cn,j],styles:[`@charset "UTF-8";



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
[_nghost-%COMP%] {
  --primary: #1F74BB;
  --primary-light: #e8f0fb;
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;
  --info: #0284c7;
  --text-primary: #0f172a;
  --text-secondary: #1e293b;
  font-family: "Inter";
}
.tax-admin-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --color: var(--text-primary);
  --border-color: #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}
.tax-admin-header[_ngcontent-%COMP%]   .fy-selector[_ngcontent-%COMP%] {
  padding-right: 8px;
}
.tax-admin-header[_ngcontent-%COMP%]   .fy-selector[_ngcontent-%COMP%]   .fy-select[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 6px 12px;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
  outline: none;
  transition: all 0.2s ease;
}
.tax-admin-header[_ngcontent-%COMP%]   .fy-selector[_ngcontent-%COMP%]   .fy-select[_ngcontent-%COMP%]:focus {
  border-color: var(--primary);
}
.tax-admin-header[_ngcontent-%COMP%]   .fy-selector[_ngcontent-%COMP%]   .fy-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  background: white;
  color: black;
}
.admin-tabs[_ngcontent-%COMP%] {
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #ABABAB;
  padding: 0 16px;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.admin-tabs[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.admin-tab[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.admin-tab[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.admin-tab.active[_ngcontent-%COMP%] {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background: #e8f0fb;
}
.admin-tab[_ngcontent-%COMP%]:hover:not(.active) {
  color: var(--text-primary);
  background: #f8fafc;
}
.tax-admin-content[_ngcontent-%COMP%] {
  --background: #f4f7fb;
}
.tab-panel[_ngcontent-%COMP%] {
  padding: 32px 24px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.glass-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.glass-sub-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 24px;
}
.card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}
.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: -0.05em;
}
.card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  margin: 0;
  font-weight: 500;
}
.card-header[_ngcontent-%COMP%]   .refresh-btn[_ngcontent-%COMP%] {
  margin-left: auto;
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 8px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-header[_ngcontent-%COMP%]   .refresh-btn[_ngcontent-%COMP%]:hover {
  color: var(--primary);
  border-color: var(--primary);
  background: var(--primary-light);
}
.card-header[_ngcontent-%COMP%]   .refresh-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.card-icon[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f0fb;
  color: var(--primary);
  flex-shrink: 0;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.card-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 22px;
}
.card-icon.shield-icon[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: var(--info);
  border-color: rgba(var(--info), 0.1);
}
.card-icon.layers-icon[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: var(--primary);
  border-color: rgba(var(--primary), 0.1);
}
.card-icon.pt-icon[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: var(--warning);
  border-color: #fde68a;
}
.card-icon.list-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: var(--success);
  border-color: #bbf7d0;
}
.card-icon.verify-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: var(--success);
  border-color: #bbf7d0;
}
.card-icon.calendar-icon[_ngcontent-%COMP%] {
  background: #f0f9ff;
  color: var(--info);
  border-color: #bae6fd;
}
.card-icon.cash-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: var(--success);
  border-color: #bbf7d0;
}
.form-group[_ngcontent-%COMP%] {
  margin-bottom: 20px;
}
.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.form-grid-2[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 600px) {
  .form-grid-2[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.form-grid-5[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  flex: 1;
}
@media (max-width: 768px) {
  .form-grid-5[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .form-grid-5[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.glass-input[_ngcontent-%COMP%] {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  outline: none;
  transition: all 0.2s ease;
}
.glass-input[_ngcontent-%COMP%]:focus {
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.glass-input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.glass-input[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  background: white;
  color: black;
}
textarea.glass-input[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
}
.rule-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 16px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.rule-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  margin-bottom: 0;
}
.remove-btn[_ngcontent-%COMP%] {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 10px;
  color: var(--danger);
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.remove-btn[_ngcontent-%COMP%]:hover {
  background: var(--danger);
  color: white;
}
.remove-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.action-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}
@media (max-width: 600px) {
  .action-row[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
}
.add-rule-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px dashed #1F74BB;
  border-radius: 8px;
  padding: 12px 20px;
  color: var(--primary);
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.add-rule-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.add-rule-btn[_ngcontent-%COMP%]:hover {
  background: var(--primary-light);
}
.save-btn[_ngcontent-%COMP%], 
.fetch-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
}
.save-btn[_ngcontent-%COMP%] {
  width: 100%;
  max-width: 320px;
  padding: 14px 24px;
  background: var(--success);
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.save-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.save-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.save-btn[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
}
.initiate-btn[_ngcontent-%COMP%] {
  background: var(--primary) !important;
}
.initiate-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #1F74BB !important;
}
.fetch-btn[_ngcontent-%COMP%] {
  width: auto;
  padding: 12px 20px;
  background: #ffffff;
  border: 1px solid var(--primary);
  color: var(--primary);
}
.fetch-btn[_ngcontent-%COMP%]:hover {
  background: var(--primary-light);
}
.slabs-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.regime-section[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.slab-rows[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
.slab-row-header[_ngcontent-%COMP%], 
.slab-edit-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 40px;
  gap: 12px;
  align-items: center;
}
.slab-row-header-pt[_ngcontent-%COMP%], 
.slab-edit-row-pt[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.5fr 40px;
  gap: 12px;
  align-items: center;
}
.slab-row-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], 
.slab-row-header-pt[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-left: 8px;
}
.slab-edit-row[_ngcontent-%COMP%], 
.slab-edit-row-pt[_ngcontent-%COMP%] {
  padding: 4px 0;
}
.slab-edit-row[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%], 
.slab-edit-row-pt[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%] {
  padding: 10px 14px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.remove-tiny[_ngcontent-%COMP%] {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--danger);
  cursor: pointer;
  transition: all 0.2s ease;
}
.remove-tiny[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.remove-tiny[_ngcontent-%COMP%]:hover {
  background: var(--danger);
  color: white;
}
.add-slab-btn[_ngcontent-%COMP%] {
  margin-top: 16px;
  background: #f8fafc;
  border: 1px dashed #ABABAB;
  border-radius: 8px;
  padding: 12px;
  color: #1e293b;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}
.add-slab-btn[_ngcontent-%COMP%]:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}
.regime-title[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 16px;
  padding: 6px 16px;
  border-radius: 9999px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.regime-title.new-regime[_ngcontent-%COMP%] {
  background: var(--primary-light);
  color: var(--primary);
  border: 1px solid rgba(var(--primary), 0.15);
}
.regime-title.old-regime[_ngcontent-%COMP%] {
  background: var(--warning-light);
  color: var(--warning);
  border: 1px solid var(--warning-border);
}
.slab-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.slab-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #475569;
  text-align: left;
  padding: 12px 16px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #f1f5f9;
}
.slab-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 14px 16px;
  color: var(--text-primary);
  border-bottom: 1px solid #f8fafc;
  font-weight: 600;
}
.slab-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {
  border-bottom: none;
}
.slab-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  background: #f1f5f9;
}
.rate-chip[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 700;
  border: 1px solid rgba(var(--primary), 0.15);
}
.rate-chip.old-chip[_ngcontent-%COMP%] {
  background: var(--warning-light);
  color: var(--warning);
  border-color: var(--warning-border);
}
.sections-tab[_ngcontent-%COMP%] {
  gap: 28px;
}
.sections-hero-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 32px;
  background:
    linear-gradient(
      135deg,
      #f0fdf4 0%,
      #ecfdf5 50%,
      #f0f4ff 100%);
  border: 1px solid #d1fae5;
}
@media (max-width: 640px) {
  .sections-hero-card[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
  }
}
.sections-hero-card[_ngcontent-%COMP%]   .sections-hero-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
}
.sections-hero-card[_ngcontent-%COMP%]   .sections-hero-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.05em;
}
.sections-hero-card[_ngcontent-%COMP%]   .sections-hero-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  margin: 0;
  font-weight: 500;
}
.sections-hero-card[_ngcontent-%COMP%]   .sections-hero-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--primary);
  font-weight: 700;
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-icon-wrap[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #1F74BB,
      #16a34a);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(31, 116, 187, 0.3);
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-icon-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 26px;
  color: white;
}
.sections-hero-card[_ngcontent-%COMP%]   .sections-hero-stats[_ngcontent-%COMP%] {
  display: flex;
  gap: 20px;
  flex-shrink: 0;
}
@media (max-width: 640px) {
  .sections-hero-card[_ngcontent-%COMP%]   .sections-hero-stats[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: flex-start;
  }
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-stat[_ngcontent-%COMP%] {
  text-align: center;
  min-width: 70px;
  padding: 14px 18px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-stat[_ngcontent-%COMP%]   .hero-stat-value[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-stat[_ngcontent-%COMP%]   .hero-stat-label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #475569;
  margin-top: 6px;
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-stat.hero-stat-success[_ngcontent-%COMP%] {
  border-color: #d1fae5;
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-stat.hero-stat-success[_ngcontent-%COMP%]   .hero-stat-value[_ngcontent-%COMP%] {
  color: #16a34a;
}
.sections-hero-card[_ngcontent-%COMP%]   .hero-stat.hero-stat-muted[_ngcontent-%COMP%]   .hero-stat-value[_ngcontent-%COMP%] {
  color: #94a3b8;
}
.sections-premium-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
@media (max-width: 680px) {
  .sections-premium-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.section-premium-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
}
.section-premium-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background:
    linear-gradient(
      90deg,
      var(--primary),
      #16a34a);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.section-premium-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: rgba(31, 116, 187, 0.2);
}
.section-premium-card[_ngcontent-%COMP%]:hover::before {
  opacity: 1;
}
.section-premium-card.edit-active[_ngcontent-%COMP%] {
  border-color: #1F74BB;
  box-shadow:
    0 0 0 3px rgba(31, 116, 187, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 2px 4px rgba(0, 0, 0, 0.04);
}
.section-premium-card.edit-active[_ngcontent-%COMP%]::before {
  opacity: 1;
}
.section-premium-card.is-inactive[_ngcontent-%COMP%] {
  opacity: 0.6;
  background: #f8fafc;
}
.section-premium-card.is-inactive[_ngcontent-%COMP%]::before {
  background:
    linear-gradient(
      90deg,
      #475569,
      #94a3b8);
}
.section-premium-card[_ngcontent-%COMP%]   .spc-top[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 9999px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-blue[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-green[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-purple[_ngcontent-%COMP%] {
  background: #f3e8ff;
  color: #7c3aed;
  border: 1px solid #e9d5ff;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-orange[_ngcontent-%COMP%] {
  background: #ffedd5;
  color: #c2410c;
  border: 1px solid #fed7aa;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-teal[_ngcontent-%COMP%] {
  background: #ccfbf1;
  color: #0f766e;
  border: 1px solid #99f6e4;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-indigo[_ngcontent-%COMP%] {
  background: #e0e7ff;
  color: #4338ca;
  border: 1px solid #c7d2fe;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-pink[_ngcontent-%COMP%] {
  background: #fce7f3;
  color: #be185d;
  border: 1px solid #fbcfe8;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-amber[_ngcontent-%COMP%] {
  background: #fef9c3;
  color: #a16207;
  border: 1px solid #fde68a;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-red[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-rose[_ngcontent-%COMP%] {
  background: #ffe4e6;
  color: #be123c;
  border: 1px solid #fecdd3;
}
.section-premium-card[_ngcontent-%COMP%]   .section-badge.badge-gray[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #ABABAB;
}
.section-premium-card[_ngcontent-%COMP%]   .active-toggle-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 9999px;
  border: 1px solid #ABABAB;
  background: #f8fafc;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.section-premium-card[_ngcontent-%COMP%]   .active-toggle-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.section-premium-card[_ngcontent-%COMP%]   .active-toggle-btn.is-on[_ngcontent-%COMP%] {
  background: #dcfce7;
  border-color: #86efac;
  color: #15803d;
}
.section-premium-card[_ngcontent-%COMP%]   .active-toggle-btn[_ngcontent-%COMP%]:hover:not(.is-on) {
  border-color: #cbd5e1;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-edit-btn[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #ABABAB;
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-edit-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-edit-btn[_ngcontent-%COMP%]:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}
.section-premium-card[_ngcontent-%COMP%]   .spc-edit-btn.editing[_ngcontent-%COMP%] {
  border-color: #fca5a5;
  color: #b91c1c;
  background: #fee2e2;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-remove-btn[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: var(--danger);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-remove-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-remove-btn[_ngcontent-%COMP%]:hover {
  background: var(--danger);
  color: white;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-description[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  font-weight: 500;
  line-height: 1.5;
  border-left: 3px solid #ABABAB;
  padding-left: 10px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-view[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px 20px;
  border: 1px solid #f1f5f9;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-view[_ngcontent-%COMP%]   .limit-label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #475569;
  margin-bottom: 6px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-view[_ngcontent-%COMP%]   .limit-amount[_ngcontent-%COMP%] {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-view[_ngcontent-%COMP%]   .limit-fy[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 4px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-edit[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: _ngcontent-%COMP%_slideInEdit 0.2s ease-out;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-edit[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  margin-bottom: 14px;
}
.section-premium-card[_ngcontent-%COMP%]   .spc-limit-edit[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.section-premium-card[_ngcontent-%COMP%]   .save-single-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  background:
    linear-gradient(
      135deg,
      #1F74BB,
      #16a34a);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.section-premium-card[_ngcontent-%COMP%]   .save-single-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.section-premium-card[_ngcontent-%COMP%]   .save-single-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(31, 116, 187, 0.35);
}
.section-premium-card[_ngcontent-%COMP%]   .save-single-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.section-premium-card[_ngcontent-%COMP%]   .save-single-btn[_ngcontent-%COMP%]   .small-spinner[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  --color: white;
}
.add-section-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 2px dashed #ABABAB;
  border-radius: 16px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 180px;
}
.add-section-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 36px;
}
.add-section-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
}
.add-section-card[_ngcontent-%COMP%]:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}
.sections-global-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  background: #ffffff;
}
@media (max-width: 640px) {
  .sections-global-actions[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
}
.sections-global-actions[_ngcontent-%COMP%]   .global-save-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 500;
}
.sections-global-actions[_ngcontent-%COMP%]   .global-save-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: var(--primary);
  flex-shrink: 0;
}
.sections-global-actions[_ngcontent-%COMP%]   .global-save-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--text-primary);
  font-weight: 700;
}
.sections-global-actions[_ngcontent-%COMP%]   .save-all-sections-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  white-space: nowrap;
  flex-shrink: 0;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.sections-global-actions[_ngcontent-%COMP%]   .save-all-sections-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.sections-global-actions[_ngcontent-%COMP%]   .save-all-sections-btn[_ngcontent-%COMP%]   .small-spinner[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  --color: white;
}
.sections-global-actions[_ngcontent-%COMP%]   .save-all-sections-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.sections-global-actions[_ngcontent-%COMP%]   .save-all-sections-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
@media (max-width: 640px) {
  .sections-global-actions[_ngcontent-%COMP%]   .save-all-sections-btn[_ngcontent-%COMP%] {
    width: 100%;
  }
}
@keyframes _ngcontent-%COMP%_slideInEdit {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.filter-chips[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.filter-chip[_ngcontent-%COMP%] {
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #ABABAB;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.filter-chip.active[_ngcontent-%COMP%] {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.filter-chip[_ngcontent-%COMP%]:hover:not(.active) {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: var(--text-primary);
}
.queue-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.queue-item[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.queue-item[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: var(--primary);
}
.queue-item[_ngcontent-%COMP%]   .queue-top[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}
.queue-item[_ngcontent-%COMP%]   .queue-name[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: var(--text-primary);
}
.queue-item[_ngcontent-%COMP%]   .queue-meta[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  margin-top: 4px;
  font-weight: 500;
}
.queue-item[_ngcontent-%COMP%]   .queue-body[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
}
.queue-item[_ngcontent-%COMP%]   .queue-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.queue-item[_ngcontent-%COMP%]   .queue-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.queue-item[_ngcontent-%COMP%]   .queue-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: var(--text-primary);
  font-weight: 700;
}
.queue-item[_ngcontent-%COMP%]   .verify-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--success-light);
  border: 1px solid var(--success-border);
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--success);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}
.queue-item[_ngcontent-%COMP%]   .verify-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.queue-item[_ngcontent-%COMP%]   .verify-btn[_ngcontent-%COMP%]:hover {
  background: var(--success);
  color: white;
}
.overlay[_ngcontent-%COMP%] {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  animation: _ngcontent-%COMP%_fadeInOverlay 0.3s ease-out;
}
.verify-modal[_ngcontent-%COMP%] {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: white;
  border-radius: 24px 24px 0 0;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
}
.verify-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.verify-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.05em;
}
.verify-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: none;
  border-radius: 4px;
  padding: 8px;
  color: #475569;
  cursor: pointer;
  display: flex;
}
.verify-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  color: white;
}
.verify-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.verify-modal[_ngcontent-%COMP%]   .proof-summary[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}
.verify-modal[_ngcontent-%COMP%]   .proof-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 500;
}
.verify-modal[_ngcontent-%COMP%]   .proof-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--text-primary);
  font-weight: 700;
}
.verify-modal[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {
  max-width: 100%;
  height: 52px;
}
.status-toggle[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.status-toggle[_ngcontent-%COMP%]   .status-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #ABABAB;
  background: #ffffff;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.status-toggle[_ngcontent-%COMP%]   .status-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.status-toggle[_ngcontent-%COMP%]   .status-btn.active-open[_ngcontent-%COMP%] {
  background: var(--success-light);
  border-color: var(--success);
  color: var(--success);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.status-toggle[_ngcontent-%COMP%]   .status-btn.active-closed[_ngcontent-%COMP%] {
  background: var(--danger-light);
  border-color: var(--danger);
  color: var(--danger);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.payout-form[_ngcontent-%COMP%] {
  padding: 4px 0;
}
.inline-search-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.small-input[_ngcontent-%COMP%] {
  max-width: 180px;
}
.json-block[_ngcontent-%COMP%] {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  color: #7dd3fc;
  font-size: 12px;
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
  overflow-x: auto;
  white-space: pre-wrap;
  max-height: 350px;
  overflow-y: auto;
}
.json-block[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 6px;
}
.json-block[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
@keyframes _ngcontent-%COMP%_fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.slabs-admin-tab[_ngcontent-%COMP%] {
  gap: 32px;
}
.slabs-hero[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #f1f5f9 100%);
  border: 1px solid var(--primary-light);
}
.slabs-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
}
.slabs-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   .hero-icon[_ngcontent-%COMP%] {
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(31, 116, 187, 0.2);
}
.slabs-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   .hero-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 26px;
}
.slabs-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px;
}
.slabs-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  margin: 0;
}
.slabs-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--primary);
  font-weight: 700;
}
.slabs-hero[_ngcontent-%COMP%]   .refresh-btn-premium[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #ABABAB;
  border-radius: 9999px;
  padding: 10px 20px;
  color: #1e293b;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.slabs-hero[_ngcontent-%COMP%]   .refresh-btn-premium[_ngcontent-%COMP%]:hover {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transform: rotate(5deg) scale(1.05);
}
.regime-premium-card[_ngcontent-%COMP%] {
  background: white;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}
.regime-premium-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  border-color: rgba(var(--primary), 0.2);
}
.regime-premium-card.new-regime-card[_ngcontent-%COMP%] {
  border-top: 4px solid var(--primary);
}
.regime-premium-card.old-regime-card[_ngcontent-%COMP%] {
  border-top: 4px solid var(--warning);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: #f8fafc;
  border-bottom: 2px solid #f1f5f9;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-header[_ngcontent-%COMP%]   .rpc-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-header[_ngcontent-%COMP%]   .rpc-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: var(--primary);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-header[_ngcontent-%COMP%]   .rpc-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-header[_ngcontent-%COMP%]   .add-btn-small[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-header[_ngcontent-%COMP%]   .add-btn-small[_ngcontent-%COMP%]:hover {
  background: var(--primary);
  color: white;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%] {
  padding: 24px 32px;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-header[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 60px;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 16px;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 60px;
  gap: 16px;
  margin-bottom: 12px;
  align-items: center;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%]   .slab-input[_ngcontent-%COMP%] {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%]   .slab-input[_ngcontent-%COMP%]:focus {
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(var(--primary), 0.1);
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%]   .slab-input.center[_ngcontent-%COMP%] {
  text-align: center;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%]   .slab-delete-btn[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  background: #fef2f2;
  color: var(--danger);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.regime-premium-card[_ngcontent-%COMP%]   .slab-grid-container[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%]   .slab-delete-btn[_ngcontent-%COMP%]:hover {
  background: var(--danger);
  color: white;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .footer-hint[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 500;
  max-width: 300px;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn.new-save[_ngcontent-%COMP%] {
  background: var(--primary);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn.new-save[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #1F74BB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn.old-save[_ngcontent-%COMP%] {
  background: var(--warning);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn.old-save[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #d97706;
  filter: brightness(0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.regime-premium-card[_ngcontent-%COMP%]   .rpc-footer[_ngcontent-%COMP%]   .rpc-save-btn[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  --color: white;
}
.form-grid-3[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 768px) {
  .form-grid-3[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.deductions-list[_ngcontent-%COMP%]   .slab-grid-header[_ngcontent-%COMP%], 
.deductions-list[_ngcontent-%COMP%]   .slab-grid-row[_ngcontent-%COMP%] {
  grid-template-columns: 1.5fr 1.5fr 1.5fr 60px !important;
}
.empty-msg[_ngcontent-%COMP%] {
  text-align: center;
  color: #94a3b8;
  padding: 40px 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
}
.center-loader[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.center-loader[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: var(--primary);
  width: 32px;
  height: 32px;
}
.deductions-hero[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background:
    linear-gradient(
      135deg,
      #fdfcf0 0%,
      #fef9c3 100%);
  border: 1px solid #fde68a;
  margin-bottom: 24px;
}
.deductions-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
}
.deductions-hero[_ngcontent-%COMP%]   .hero-icon[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #fbbf24,
      #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
}
.deductions-hero[_ngcontent-%COMP%]   .hero-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 26px;
  color: white;
}
.deductions-hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #92400e;
  margin: 0 0 4px;
}
.deductions-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #b45309;
  margin: 0;
  max-width: 400px;
}
.deduction-form-premium[_ngcontent-%COMP%] {
  padding: 24px;
  margin-bottom: 32px;
  border: 1px dashed #ABABAB;
  background: #f8fafc;
  border-radius: 12px;
}
.deduction-form-premium[_ngcontent-%COMP%]   .form-header-small[_ngcontent-%COMP%] {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
}
.deduction-form-premium[_ngcontent-%COMP%]   .form-header-small[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
}
.deduction-form-premium[_ngcontent-%COMP%]   .form-header-small[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.deductions-display-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
@media (max-width: 600px) {
  .deductions-display-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.deduction-regime-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.deduction-regime-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-banner[_ngcontent-%COMP%] {
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-banner[_ngcontent-%COMP%]   .regime-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-banner[_ngcontent-%COMP%]   .drc-fy[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 700;
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-body[_ngcontent-%COMP%] {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  flex: 1;
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-body[_ngcontent-%COMP%]   .deduction-amount[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-body[_ngcontent-%COMP%]   .deduction-label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  font-weight: 500;
}
.deduction-regime-card[_ngcontent-%COMP%]   .drc-actions[_ngcontent-%COMP%] {
  padding: 10px 16px;
  display: flex;
  justify-content: flex-end;
  background: #f8fafc;
  border-top: 1px solid #f8fafc;
}
.deduction-regime-card.new-deduction[_ngcontent-%COMP%] {
  border-top: 4px solid var(--primary);
}
.deduction-regime-card.new-deduction[_ngcontent-%COMP%]   .regime-label[_ngcontent-%COMP%] {
  color: var(--primary);
}
.deduction-regime-card.old-deduction[_ngcontent-%COMP%] {
  border-top: 4px solid var(--warning);
}
.deduction-regime-card.old-deduction[_ngcontent-%COMP%]   .regime-label[_ngcontent-%COMP%] {
  color: var(--warning);
}
.empty-deductions-placeholder[_ngcontent-%COMP%] {
  grid-column: 1/-1;
  padding: 40px;
  text-align: center;
  background: #ffffff;
  border-radius: 16px;
  border: 2px dashed #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.empty-deductions-placeholder[_ngcontent-%COMP%]   .placeholder-icon[_ngcontent-%COMP%] {
  font-size: 40px;
  color: #94a3b8;
}
.empty-deductions-placeholder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  color: #475569;
  font-size: 14px;
}`]});let o=m;return o})();var qe=[{path:"",component:En}],tt=(()=>{let m=class m{};m.\u0275fac=function(a){return new(a||m)},m.\u0275mod=L({type:m}),m.\u0275inj=N({imports:[$,pn,gn,Mn,H.forChild(qe)]});let o=m;return o})();export{tt as TaxAdminPageModule};
