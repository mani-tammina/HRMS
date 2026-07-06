import{a as On}from"./chunk-JFCT74NZ.js";import{a as In}from"./chunk-6KXWZ6DT.js";import"./chunk-NDCRD3QG.js";import{A as Q,Aa as yn,B as X,Fa as wn,Ga as Mn,H as Y,I as Z,J as nn,K as en,L as tn,M as on,N as an,O as rn,Q as ln,R as cn,V as sn,W as dn,X as mn,Y as fn,Z as gn,_ as pn,c as w,d as j,e as W,g as D,h as G,ha as _n,j as q,la as un,m as H,ma as bn,na as hn,qa as xn,ra as vn,t as J,ta as Pn,u as R,v as U,va as Cn,y as $,z as K}from"./chunk-B3PLR2IL.js";import{Ba as x,Ca as u,Da as m,Eb as V,F as T,K as f,L as g,Oa as s,Pa as b,Qa as k,Ra as A,Ta as v,Ua as P,Va as C,Ya as y,Zb as z,_ as c,ca as h,ea as E,fa as F,ja as p,qb as B,ra as d,rb as N,sa as o,ta as t,ua as _}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as S,b as L,e as M}from"./chunk-JHI3MBHO.js";var O=()=>({standalone:!0});function En(a,l){if(a&1&&(o(0,"ion-select-option",32),s(1),t()),a&2){let e=l.$implicit,i=l.index;d("value",i+1),c(),b(e)}}function Fn(a,l){if(a&1&&(o(0,"ion-select-option",32),s(1),t()),a&2){let e=l.$implicit;d("value",e.id),c(),b(e.type_name)}}function kn(a,l){if(a&1){let e=x();o(0,"ion-row",33)(1,"ion-col",25),s(2),t(),o(3,"ion-col",26)(4,"ion-input",34),C("ngModelChange",function(n){let r=f(e).$implicit;return P(r.days_allocated,n)||(r.days_allocated=n),g(n)}),t()(),o(5,"ion-col",27)(6,"ion-checkbox",21),C("ngModelChange",function(n){let r=f(e).$implicit;return P(r.prorate_on_joining,n)||(r.prorate_on_joining=n),g(n)}),t()(),o(7,"ion-col",26)(8,"ion-button",35),u("click",function(){let n=f(e).index,r=m(2);return g(r.removeAllocation(n))}),_(9,"ion-icon",36),t()()()}if(a&2){let e=l.$implicit;c(2),b(e.type_name),c(2),v("ngModel",e.days_allocated),d("ngModelOptions",y(5,O)),c(2),v("ngModel",e.prorate_on_joining),d("ngModelOptions",y(6,O))}}function An(a,l){if(a&1){let e=x();o(0,"ion-card",9)(1,"ion-card-header")(2,"ion-card-title"),s(3),t()(),o(4,"ion-card-content")(5,"form",10),u("ngSubmit",function(){f(e);let n=m();return g(n.submit())}),o(6,"div",11)(7,"ion-item",12)(8,"ion-label",13),s(9,"Plan Name"),t(),_(10,"ion-input",14),t(),o(11,"ion-item",12)(12,"ion-label"),s(13,"Start Month"),t(),o(14,"ion-select",15),p(15,En,2,2,"ion-select-option",16),t()(),o(16,"ion-item",17)(17,"ion-label",13),s(18,"Description"),t(),_(19,"ion-textarea",18),t()(),o(20,"div",19)(21,"h6"),s(22,"Leave Allocations"),t(),o(23,"div",20)(24,"ion-item",12)(25,"ion-label"),s(26,"Select Leave Type"),t(),o(27,"ion-select",21),C("ngModelChange",function(n){f(e);let r=m();return P(r.selectedNewLeaveTypeId,n)||(r.selectedNewLeaveTypeId=n),g(n)}),p(28,Fn,2,2,"ion-select-option",16),t()(),o(29,"ion-button",22),u("click",function(){f(e);let n=m();return g(n.addAllocation())}),s(30,"Add"),t()(),o(31,"div",23)(32,"ion-grid")(33,"ion-row",24)(34,"ion-col",25),s(35,"Leave Type"),t(),o(36,"ion-col",26),s(37,"Days"),t(),o(38,"ion-col",27),s(39,"Prorate"),t(),_(40,"ion-col",26),t(),p(41,kn,10,7,"ion-row",28),t()()(),o(42,"div",29)(43,"ion-button",30),s(44),t(),o(45,"ion-button",31),u("click",function(){f(e);let n=m();return g(n.cancelCreate())}),s(46,"Cancel"),t()()()()()}if(a&2){let e=m();c(3),k("",e.isEditMode?"Edit":"Create"," Leave Plan"),c(2),d("formGroup",e.leavePlanForm),c(10),d("ngForOf",e.months),c(12),v("ngModel",e.selectedNewLeaveTypeId),d("ngModelOptions",y(9,O)),c(),d("ngForOf",e.allLeaveTypes),c(13),d("ngForOf",e.editingPlanAllocations),c(2),d("disabled",e.loading),c(),b(e.loading?"Please Wait...":e.isEditMode?"Update Plan":"Create Plan")}}function Bn(a,l){a&1&&(o(0,"div",40),_(1,"ion-spinner",41),t())}function Nn(a,l){if(a&1){let e=x();o(0,"ion-col",43)(1,"ion-card",44)(2,"ion-card-header")(3,"ion-card-title"),s(4),t(),o(5,"ion-card-subtitle"),s(6),t()(),o(7,"ion-card-content")(8,"p"),s(9),t(),o(10,"div",45)(11,"ion-button",46),u("click",function(){let n=f(e).$implicit,r=m(3);return g(r.editPlan(n))}),s(12,"Edit"),t(),o(13,"ion-button",47),u("click",function(){let n=f(e).$implicit,r=m(3);return g(r.deletePlan(n.id))}),s(14,"Delete"),t()()()()()}if(a&2){let e=l.$implicit,i=m(3);c(4),b(e.name),c(2),A("Starts: ",i.getMonthName(e.leave_year_start_month)," (Total Employees: ",e.employees_count||0,")"),c(3),b(e.description||"No description provided.")}}function Vn(a,l){a&1&&(o(0,"div",40),s(1,"No leave plans found."),t())}function zn(a,l){if(a&1&&(o(0,"ion-grid")(1,"ion-row"),p(2,Nn,15,4,"ion-col",42),t(),p(3,Vn,2,0,"div",38),t()),a&2){let e=m(2);c(2),d("ngForOf",e.leavePlans),c(),d("ngIf",e.leavePlans.length===0)}}function jn(a,l){if(a&1&&(o(0,"div",37),p(1,Bn,2,0,"div",38)(2,zn,4,2,"ion-grid",39),t()),a&2){let e=m();c(),d("ngIf",e.loadingPlans),c(),d("ngIf",!e.loadingPlans)}}var Sn=(()=>{let l=class l{constructor(i,n,r,I,Ln){this.fb=i,this.leavePlanService=n,this.leaveTypeService=r,this.toastCtrl=I,this.alertCtrl=Ln,this.loading=!1,this.loadingPlans=!1,this.showCreateForm=!1,this.isEditMode=!1,this.editingPlanId=null,this.leavePlans=[],this.allLeaveTypes=[],this.selectedNewLeaveTypeId=null,this.editingPlanAllocations=[],this.months=["January","February","March","April","May","June","July","August","September","October","November","December"]}ngOnInit(){this.initForm(),this.loadLeavePlans(),this.loadAllLeaveTypes()}initForm(){this.leavePlanForm=this.fb.group({name:["",w.required],leave_year_start_month:[1,w.required],leave_year_start_day:[1,w.required],description:[""],is_active:[!0]})}loadLeavePlans(){this.loadingPlans=!0,this.leavePlanService.getLeavePlans().subscribe({next:i=>{this.leavePlans=i||[],this.loadingPlans=!1},error:()=>this.loadingPlans=!1})}loadAllLeaveTypes(){this.leaveTypeService.getLeaveTypes().subscribe({next:i=>this.allLeaveTypes=i||[]})}openCreateForm(){this.isEditMode=!1,this.editingPlanId=null,this.editingPlanAllocations=[],this.leavePlanForm.reset({leave_year_start_month:1,leave_year_start_day:1,is_active:!0}),this.showCreateForm=!0}editPlan(i){this.isEditMode=!0,this.editingPlanId=i.id,this.loading=!0,this.leavePlanService.getLeavePlanById(i.id).subscribe({next:n=>{this.editingPlanAllocations=n.allocations||[],this.leavePlanForm.patchValue({name:n.name,leave_year_start_month:n.leave_year_start_month,leave_year_start_day:n.leave_year_start_day,description:n.description,is_active:n.is_active}),this.loading=!1,this.showCreateForm=!0},error:()=>{this.loading=!1,this.showToast("Failed to load plan details","danger")}})}addAllocation(){if(!this.selectedNewLeaveTypeId)return;if(this.editingPlanAllocations.find(r=>r.leave_type_id===Number(this.selectedNewLeaveTypeId))){this.showToast("This leave type is already added.","warning");return}let n=this.allLeaveTypes.find(r=>r.id===Number(this.selectedNewLeaveTypeId));n&&(this.editingPlanAllocations.push({leave_type_id:n.id,type_name:n.type_name,days_allocated:0,prorate_on_joining:!0}),this.selectedNewLeaveTypeId=null)}removeAllocation(i){this.editingPlanAllocations.splice(i,1)}submit(){if(this.leavePlanForm.invalid)return;let i=L(S({},this.leavePlanForm.value),{allocations:this.editingPlanAllocations.map(r=>({leave_type_id:r.leave_type_id,days_allocated:r.days_allocated,prorate_on_joining:r.prorate_on_joining}))});this.loading=!0,(this.isEditMode?this.leavePlanService.updateLeavePlan(this.editingPlanId,i):this.leavePlanService.createLeavePlan(i)).subscribe({next:()=>{this.showToast(this.isEditMode?"Plan updated":"Plan created","success"),this.loading=!1,this.showCreateForm=!1,this.loadLeavePlans()},error:()=>{this.loading=!1,this.showToast("Failed to save plan","danger")}})}deletePlan(i){return M(this,null,function*(){(yield this.alertCtrl.create({header:"Delete Plan",message:"Are you sure you want to delete this leave plan?",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",role:"destructive",handler:()=>{this.leavePlanService.deleteLeavePlan(i).subscribe(()=>this.loadLeavePlans())}}]})).present()})}cancelCreate(){this.showCreateForm=!1}showToast(i,n){return M(this,null,function*(){(yield this.toastCtrl.create({message:i,duration:2e3,color:n,position:"top"})).present()})}getMonthName(i){return this.months[i-1]||"Unknown"}};l.\u0275fac=function(n){return new(n||l)(h(J),h(On),h(In),h(wn),h(yn))},l.\u0275cmp=E({type:l,selectors:[["app-leave-plans"]],standalone:!1,decls:12,vars:3,consts:[["color","primary",1,"gradient-header"],["slot","start"],["defaultHref","/administration"],["slot","end"],[3,"click","disabled"],["name","add-outline","slot","icon-only"],[1,"ion-padding","page-containerOn"],["class","form-card",4,"ngIf"],["class","plans-list",4,"ngIf"],[1,"form-card"],[3,"ngSubmit","formGroup"],[1,"form-grid"],["lines","outline"],["position","floating"],["formControlName","name"],["formControlName","leave_year_start_month","interface","popover"],[3,"value",4,"ngFor","ngForOf"],["lines","outline",1,"full-width"],["formControlName","description"],[1,"allocations-section","mt-20"],[1,"add-allocation-bar"],[3,"ngModelChange","ngModel","ngModelOptions"],["fill","solid",3,"click"],[1,"allocation-list","mt-10"],[1,"allocation-header"],["size","5"],["size","2"],["size","3"],["class","allocation-row",4,"ngFor","ngForOf"],[1,"actions","mt-20"],["expand","block","type","submit",3,"disabled"],["expand","block","fill","clear","color","medium",3,"click"],[3,"value"],[1,"allocation-row"],["type","number",3,"ngModelChange","ngModel","ngModelOptions"],["fill","clear","color","danger",3,"click"],["name","trash-outline"],[1,"plans-list"],["class","ion-text-center ion-padding",4,"ngIf"],[4,"ngIf"],[1,"ion-text-center","ion-padding"],["name","crescent"],["size","12","size-md","6",4,"ngFor","ngForOf"],["size","12","size-md","6"],[1,"plan-card"],[1,"plan-actions","mt-10"],["size","small",3,"click"],["size","small","color","danger",3,"click"]],template:function(n,r){n&1&&(o(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),_(3,"ion-back-button",2),t(),o(4,"ion-title"),s(5,"Manage Leave Plans"),t(),o(6,"ion-buttons",3)(7,"ion-button",4),u("click",function(){return r.openCreateForm()}),_(8,"ion-icon",5),t()()()(),o(9,"ion-content",6),p(10,An,47,10,"ion-card",7)(11,jn,3,2,"div",8),t()),n&2&&(c(7),d("disabled",r.showCreateForm),c(3),d("ngIf",r.showCreateForm),c(),d("ngIf",!r.showCreateForm))},dependencies:[B,N,G,j,W,D,q,H,Y,Z,nn,en,tn,on,an,rn,ln,cn,sn,dn,mn,fn,gn,pn,_n,un,bn,hn,xn,vn,Pn,$,K,Q,X,Cn],styles:[`

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
.gradient-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.gradient-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  letter-spacing: -0.05em;
}
.gradient-header[_ngcontent-%COMP%]   ion-back-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.page-containerOn[_ngcontent-%COMP%] {
  --background: #f4f7fb;
}
.plan-card[_ngcontent-%COMP%] {
  margin: 24px 0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  border: 1px solid #ABABAB;
  overflow: hidden;
}
.plan-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  padding: 24px 32px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}
.plan-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
}
.add-allocation-bar[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;
}
.add-allocation-bar[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  flex: 1;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --background: transparent;
  --border-color: transparent;
}
.add-allocation-bar[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 8px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.add-allocation-bar[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], 
.add-allocation-bar[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 10px 16px !important;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.add-allocation-bar[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus, 
.add-allocation-bar[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.allocation-list[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #ABABAB;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.allocation-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  font-weight: 700;
  padding: 12px 16px;
  border-bottom: 2px solid #ABABAB;
  font-size: 10px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.allocation-row[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-bottom: 1px solid #f8fafc;
  align-items: center;
  transition: all 0.2s ease;
}
.allocation-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.allocation-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.allocation-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 600;
}
.plan-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --background: transparent;
  --border-color: transparent;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 8px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 12px 16px !important;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus, 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus, 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.full-width[_ngcontent-%COMP%] {
  grid-column: span 2;
}
@media (max-width: 768px) {
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .full-width[_ngcontent-%COMP%] {
    grid-column: span 1;
  }
  .allocation-header[_ngcontent-%COMP%] {
    display: none;
  }
  .allocation-row[_ngcontent-%COMP%] {
    flex-direction: column;
    padding: 20px 16px;
    align-items: flex-start;
  }
  .allocation-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
    width: 100%;
    padding: 4px 0;
  }
}`]});let a=l;return a})();var Wn=[{path:"",component:Sn}],ne=(()=>{let l=class l{};l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=F({type:l}),l.\u0275inj=T({imports:[V,R,U,Mn,z.forChild(Wn)]});let a=l;return a})();export{ne as LeavePlansPageModule};
