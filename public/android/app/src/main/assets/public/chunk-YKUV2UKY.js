import{a as V,b as _e}from"./chunk-X33SV3PD.js";import{a as ge}from"./chunk-2GEN2AVW.js";import"./chunk-GKMRXCVX.js";import{a as Be}from"./chunk-C76DRQJT.js";import"./chunk-NDCRD3QG.js";import{A as J,Aa as de,B as Q,Ca as D,Fa as F,Ga as q,H as X,I as K,Q as Z,R as $,V as ee,W as ne,X as j,Y as te,Z as Fe,_ as ie,a as U,b as Re,ba as Ve,d as R,g as T,ha as oe,ja as ae,ka as re,la as We,ma as Ne,qa as se,ra as ce,sa as Ae,ta as le,u as B,v as Te,va as ze,wa as Le,y as De,z as Y}from"./chunk-B3PLR2IL.js";import{$a as S,Ba as w,Ca as f,Da as d,Eb as L,F as be,K as _,L as p,Ma as E,Na as W,Oa as o,Pa as u,Qa as h,Ra as N,Sa as we,Ta as C,Tb as Se,Ua as x,Va as P,Vb as ke,Wb as Ee,Ya as H,Za as ye,Zb as Ie,_ as s,bb as k,ca as b,ea as I,fa as ve,ja as M,qb as A,ra as g,rb as z,sa as n,ta as t,ua as m,ya as xe,yb as G,za as Pe}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as Ce,e as y}from"./chunk-JHI3MBHO.js";var me=(()=>{let l=class l{constructor(a,i,r){this.separationService=a,this.toastController=i,this.loadingController=r,this.allowEmployeeResign=!0,this.allowEmployeeWithdraw=!0,this.allowEarlyLWD=!0,this.showReviewerStatus=!0,this.notallowholiday_weekend=!0,this.initialState=null}ngOnInit(){this.loadSettings()}loadSettings(){this.separationService.getResignationSettings().subscribe({next:a=>{a&&(this.allowEmployeeResign=a.allow_employee_resign??!0,this.allowEmployeeWithdraw=a.allow_employee_withdraw??!0,this.allowEarlyLWD=a.allow_early_lwd??!0,this.showReviewerStatus=a.show_reviewer_status??!0,this.notallowholiday_weekend=a.notallowholiday_weekend??!0,this.initialState=Ce({},a))},error:a=>{console.error("Error loading resignation settings:",a),this.presentToast("Failed to load resignation settings.","danger")}})}onCancel(){this.initialState&&(this.allowEmployeeResign=this.initialState.allow_employee_resign,this.allowEmployeeWithdraw=this.initialState.allow_employee_withdraw,this.allowEarlyLWD=this.initialState.allow_early_lwd,this.showReviewerStatus=this.initialState.show_reviewer_status,this.presentToast("Changes discarded.","medium"))}onSave(){return y(this,null,function*(){let a=yield this.loadingController.create({message:"Saving resignation settings...",spinner:"crescent"});yield a.present();let i={allow_employee_resign:this.allowEmployeeResign,allow_employee_withdraw:this.allowEmployeeWithdraw,allow_early_lwd:this.allowEarlyLWD,show_reviewer_status:this.showReviewerStatus,notallowholiday_weekend:this.notallowholiday_weekend};this.separationService.updateResignationSettings(i).subscribe({next:()=>{a.dismiss(),this.initialState=Ce({},i),this.presentToast("Settings saved successfully.","success")},error:r=>{a.dismiss(),console.error("Error saving settings:",r),this.presentToast(r.error?.error||"Failed to save settings.","danger")}})})}presentToast(a,i){return y(this,null,function*(){(yield this.toastController.create({message:a,duration:2e3,color:i,position:"top"})).present()})}};l.\u0275fac=function(i){return new(i||l)(b(V),b(F),b(D))},l.\u0275cmp=I({type:l,selectors:[["app-resignation-settings"]],decls:48,vars:5,consts:[[1,"settings-card","animate__animated","animate__fadeIn"],[1,"settings-header"],[1,"header-actions"],[1,"btn","btn-outline",3,"click"],[1,"btn","btn-primary",3,"click"],[1,"settings-body"],[1,"settings-option"],[1,"custom-checkbox-container"],["type","checkbox",3,"ngModelChange","ngModel"],[1,"checkmark"],[1,"option-text"],["title","If enabled, employees will see the 'Apply Resignation' button.",1,"info-icon"],["title","If enabled, employees can request an early exit date in the resignation form.",1,"info-icon"],["title","If enabled, the resignation last working day will automatically skip holidays and weekends.",1,"info-icon"],["title","If enabled, the employee timeline tracker will display the actual names of reviewers.",1,"info-icon"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"div",1)(2,"h2"),o(3,"Resignation settings"),t(),n(4,"div",2)(5,"button",3),f("click",function(){return r.onCancel()}),o(6,"Cancel"),t(),n(7,"button",4),f("click",function(){return r.onSave()}),o(8,"Save changes"),t()()(),n(9,"div",5)(10,"div",6)(11,"label",7)(12,"input",8),P("ngModelChange",function(O){return x(r.allowEmployeeResign,O)||(r.allowEmployeeResign=O),O}),t(),m(13,"span",9),n(14,"span",10),o(15,"Allow employee to resign"),t()(),n(16,"span",11),o(17,"\u24D8"),t()(),n(18,"div",6)(19,"label",7)(20,"input",8),P("ngModelChange",function(O){return x(r.allowEmployeeWithdraw,O)||(r.allowEmployeeWithdraw=O),O}),t(),m(21,"span",9),n(22,"span",10),o(23,"Allow employee to withdraw their resignation"),t()()(),n(24,"div",6)(25,"label",7)(26,"input",8),P("ngModelChange",function(O){return x(r.allowEarlyLWD,O)||(r.allowEarlyLWD=O),O}),t(),m(27,"span",9),n(28,"span",10),o(29,"Allow employees to choose the preference on an early last working day"),t()(),n(30,"span",12),o(31,"\u24D8"),t()(),n(32,"div",6)(33,"label",7)(34,"input",8),P("ngModelChange",function(O){return x(r.notallowholiday_weekend,O)||(r.notallowholiday_weekend=O),O}),t(),m(35,"span",9),n(36,"span",10),o(37,"Ensure the last working Day doesn't land on a holiday or weekly off"),t()(),n(38,"span",13),o(39,"\u24D8"),t()(),n(40,"div",6)(41,"label",7)(42,"input",8),P("ngModelChange",function(O){return x(r.showReviewerStatus,O)||(r.showReviewerStatus=O),O}),t(),m(43,"span",9),n(44,"span",10),o(45,"Show resignation approval/acknowledgement status to the employee in their profile (along with the names of the reviewers)"),t()(),n(46,"span",14),o(47,"\u24D8"),t()()()()),i&2&&(s(12),C("ngModel",r.allowEmployeeResign),s(8),C("ngModel",r.allowEmployeeWithdraw),s(6),C("ngModel",r.allowEarlyLWD),s(8),C("ngModel",r.notallowholiday_weekend),s(8),C("ngModel",r.showReviewerStatus))},dependencies:[L,B,U,R,T,q],styles:[`

.settings-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-top: 24px;
  font-family: "Inter", sans-serif;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: #374151;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-outline[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #4b5563;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-outline[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%] {
  background: #4f46e5;
  border: 1px solid #4f46e5;
  color: #ffffff;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%]:hover {
  background: #4338ca;
  border-color: #4338ca;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  font-size: 0.92rem;
  color: #374151;
  line-height: 1.4;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
  background-color: #ffffff;
  border: 2px solid #9ca3af;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%] {
  background-color: #4f46e5;
  border-color: #4f46e5;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%]:after {
  display: block;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%]    ~ .checkmark[_ngcontent-%COMP%] {
  border-color: #4f46e5;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {
  font-size: 0.88rem;
  color: #9ca3af;
  cursor: help;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%]:hover {
  color: #4b5563;
}`]});let c=l;return c})();function Je(c,l){if(c&1&&(n(0,"p",15),o(1),t()),c&2){let e=d().$implicit;s(),u(e.description)}}function Qe(c,l){if(c&1){let e=w();n(0,"div",16)(1,"label",17)(2,"input",18),P("ngModelChange",function(i){let r=_(e).$implicit;return x(r.is_allowed,i)||(r.is_allowed=i),p(i)}),t(),m(3,"span",19),n(4,"div",20)(5,"span",21),o(6),t(),n(7,"span",22),o(8),t()()()()}if(c&2){let e=l.$implicit;s(2),C("ngModel",e.is_allowed),s(4),u(e.type_name),s(),E("allowed",e.is_allowed)("restricted",!e.is_allowed),s(),h(" ",e.is_allowed?"Allowed":"Restricted"," ")}}function Xe(c,l){if(c&1&&(n(0,"div",10)(1,"div",11)(2,"h3"),o(3),t(),M(4,Je,2,1,"p",12),t(),n(5,"div",13),M(6,Qe,9,7,"div",14),t()()),c&2){let e=l.$implicit;s(3),u(e.name),s(),g("ngIf",e.description),s(2),g("ngForOf",e.leaves)}}function Ke(c,l){c&1&&(n(0,"div",23),m(1,"ion-icon",24),n(2,"h4"),o(3,"No Leave Plans Active"),t(),n(4,"p"),o(5,"Configure leave plans in the system to enable notice period policy mappings."),t()())}var fe=(()=>{let l=class l{constructor(a,i,r){this.separationService=a,this.toastController=i,this.loadingController=r,this.leavePlans=[],this.initialState="[]"}ngOnInit(){this.loadSettings()}loadSettings(){this.separationService.getNoticePeriodLeavesSettings().subscribe({next:a=>{a&&(this.leavePlans=a,this.initialState=JSON.stringify(a))},error:a=>{console.error("Error loading notice period leave settings:",a),this.presentToast("Failed to load notice period leave configurations.","danger")}})}onCancel(){this.leavePlans=JSON.parse(this.initialState),this.presentToast("Changes discarded.","medium")}onSave(){return y(this,null,function*(){let a=yield this.loadingController.create({message:"Saving leave policy settings...",spinner:"crescent"});yield a.present();let i=[];this.leavePlans.forEach(r=>{r.leaves.forEach(v=>{i.push({leave_plan_id:r.id,leave_type_id:v.leave_type_id,is_allowed:v.is_allowed?1:0})})}),this.separationService.updateNoticePeriodLeavesSettings(i).subscribe({next:()=>{a.dismiss(),this.initialState=JSON.stringify(this.leavePlans),this.presentToast("Leave policies updated successfully.","success")},error:r=>{a.dismiss(),console.error("Error saving leave policy settings:",r),this.presentToast(r.error?.error||"Failed to update leave policies.","danger")}})})}presentToast(a,i){return y(this,null,function*(){(yield this.toastController.create({message:a,duration:2e3,color:i,position:"top"})).present()})}};l.\u0275fac=function(i){return new(i||l)(b(V),b(F),b(D))},l.\u0275cmp=I({type:l,selectors:[["app-notice-period-leaves-settings"]],decls:15,vars:2,consts:[[1,"settings-card","animate__animated","animate__fadeIn"],[1,"settings-header"],[1,"header-title-section"],[1,"subtitle"],[1,"header-actions"],[1,"btn","btn-outline",3,"click"],[1,"btn","btn-primary",3,"click"],[1,"settings-body"],["class","plan-section",4,"ngFor","ngForOf"],["class","no-data-placeholder",4,"ngIf"],[1,"plan-section"],[1,"plan-header"],["class","plan-desc",4,"ngIf"],[1,"leaves-grid"],["class","settings-option",4,"ngFor","ngForOf"],[1,"plan-desc"],[1,"settings-option"],[1,"custom-checkbox-container"],["type","checkbox",3,"ngModelChange","ngModel"],[1,"checkmark"],[1,"option-details"],[1,"option-text"],[1,"badge"],[1,"no-data-placeholder"],["name","alert-circle-outline"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),o(4,"Notice Period Leave Policies"),t(),n(5,"p",3),o(6,"Specify which leave types can be applied for during an employee's notice period"),t()(),n(7,"div",4)(8,"button",5),f("click",function(){return r.onCancel()}),o(9,"Cancel"),t(),n(10,"button",6),f("click",function(){return r.onSave()}),o(11,"Save changes"),t()()(),n(12,"div",7),M(13,Xe,7,3,"div",8)(14,Ke,6,0,"div",9),t()()),i&2&&(s(13),g("ngForOf",r.leavePlans),s(),g("ngIf",r.leavePlans.length===0))},dependencies:[L,A,z,B,U,R,T,q,j],styles:[`

.settings-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-top: 24px;
  font-family: "Inter", sans-serif;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 16px;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-title-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0 0 4px 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-title-section[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-outline[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #4b5563;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-outline[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%] {
  background: #4f46e5;
  border: 1px solid #4f46e5;
  color: #ffffff;
}
.settings-card[_ngcontent-%COMP%]   .settings-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%]:hover {
  background: #4338ca;
  border-color: #4338ca;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .plan-section[_ngcontent-%COMP%] {
  border-bottom: 1px dashed #e5e7eb;
  padding-bottom: 20px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .plan-section[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .plan-section[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .plan-section[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 2px 0;
  font-size: 0.98rem;
  font-weight: 600;
  color: #374151;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .plan-section[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-desc[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.82rem;
  color: #8b949e;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .plan-section[_ngcontent-%COMP%]   .leaves-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  background: #f9fafb;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  border-color: #e5e7eb;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
  background-color: #ffffff;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%] {
  background-color: #4f46e5;
  border-color: #4f46e5;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%]:after {
  display: block;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%]    ~ .checkmark[_ngcontent-%COMP%] {
  border-color: #4f46e5;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .option-details[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 4px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .option-details[_ngcontent-%COMP%]   .option-text[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .option-details[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .option-details[_ngcontent-%COMP%]   .badge.allowed[_ngcontent-%COMP%] {
  background-color: #ecfdf5;
  color: #059669;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .settings-option[_ngcontent-%COMP%]   .custom-checkbox-container[_ngcontent-%COMP%]   .option-details[_ngcontent-%COMP%]   .badge.restricted[_ngcontent-%COMP%] {
  background-color: #fef2f2;
  color: #dc2626;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 40px;
  color: #9ca3af;
  margin-bottom: 12px;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
}
.settings-card[_ngcontent-%COMP%]   .settings-body[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
  max-width: 320px;
}`]});let c=l;return c})();var nn=c=>["/administration/separation/details",c];function tn(c,l){if(c&1){let e=w();n(0,"ion-toolbar",7)(1,"ion-segment",8),P("ngModelChange",function(i){_(e);let r=d();return x(r.selectedSegment,i)||(r.selectedSegment=i),p(i)}),f("ionChange",function(i){_(e);let r=d();return p(r.segmentChanged(i))}),n(2,"ion-segment-button",9)(3,"ion-label"),o(4,"RESIGNATION REQUESTS"),t()(),n(5,"ion-segment-button",10)(6,"ion-label"),o(7,"NOTICE CONFIGURATION"),t()(),n(8,"ion-segment-button",11)(9,"ion-label"),o(10,"RESIGNATION REASONS"),t()()()()}if(c&2){let e=d();s(),C("ngModel",e.selectedSegment)}}function on(c,l){if(c&1&&(n(0,"ion-select-option",37),o(1),t()),c&2){let e=l.$implicit;g("value",e.id),s(),u(e.name)}}function an(c,l){if(c&1){let e=w();n(0,"div",17)(1,"div",18)(2,"h3"),m(3,"ion-icon",19),o(4," Filter Requests"),t(),n(5,"ion-button",20),f("click",function(){_(e);let i=d(2);return p(i.clearFilters())}),o(6,"Clear Filters"),t()(),n(7,"ion-grid",21)(8,"ion-row")(9,"ion-col",22)(10,"ion-label"),o(11,"Search Employee"),t(),n(12,"ion-input",23),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.filters.employee,i)||(r.filters.employee=i),p(i)}),f("ionInput",function(){_(e);let i=d(2);return p(i.applyFilters())}),t()(),n(13,"ion-col",22)(14,"ion-label"),o(15,"Department"),t(),n(16,"ion-item",24)(17,"ion-select",25),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.filters.department,i)||(r.filters.department=i),p(i)}),f("ionChange",function(){_(e);let i=d(2);return p(i.applyFilters())}),n(18,"ion-select-option",26),o(19,"All Departments"),t(),M(20,on,2,2,"ion-select-option",27),t()()(),n(21,"ion-col",22)(22,"ion-label"),o(23,"Status"),t(),n(24,"ion-item",24)(25,"ion-select",28),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.filters.status,i)||(r.filters.status=i),p(i)}),f("ionChange",function(){_(e);let i=d(2);return p(i.applyFilters())}),n(26,"ion-select-option",26),o(27,"All Statuses"),t(),n(28,"ion-select-option",29),o(29,"Submitted"),t(),n(30,"ion-select-option",30),o(31,"Manager Review"),t(),n(32,"ion-select-option",31),o(33,"HR Review"),t(),n(34,"ion-select-option",32),o(35,"Exit Clearance"),t(),n(36,"ion-select-option",33),o(37,"Relieved"),t(),n(38,"ion-select-option",34),o(39,"Rejected"),t()()()(),n(40,"ion-col",22)(41,"ion-label"),o(42,"Applied Date Range"),t(),n(43,"div",35)(44,"input",36),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.filters.startDate,i)||(r.filters.startDate=i),p(i)}),f("change",function(){_(e);let i=d(2);return p(i.applyFilters())}),t(),n(45,"span"),o(46,"to"),t(),n(47,"input",36),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.filters.endDate,i)||(r.filters.endDate=i),p(i)}),f("change",function(){_(e);let i=d(2);return p(i.applyFilters())}),t()()()()()()}if(c&2){let e=d(2);s(12),C("ngModel",e.filters.employee),s(5),C("ngModel",e.filters.department),s(3),g("ngForOf",e.departments),s(5),C("ngModel",e.filters.status),s(19),C("ngModel",e.filters.startDate),s(3),C("ngModel",e.filters.endDate)}}function rn(c,l){if(c&1){let e=w();n(0,"tr")(1,"td")(2,"strong"),o(3),t()(),n(4,"td")(5,"div",41)(6,"span"),o(7),t()()(),n(8,"td"),o(9),t(),n(10,"td"),o(11),t(),n(12,"td"),o(13),S(14,"date"),t(),n(15,"td"),o(16),t(),n(17,"td")(18,"span",42),o(19),S(20,"date"),t()(),n(21,"td")(22,"span",42),o(23),S(24,"date"),t()(),n(25,"td")(26,"span",43),o(27),t()(),n(28,"td")(29,"div",44)(30,"ion-button",45),o(31," View Details "),t(),n(32,"ion-button",46),f("click",function(){let i=_(e).$implicit,r=d(3);return p(r.trackResignation(i))}),o(33," Track "),t()()()()}if(c&2){let e=l.$implicit;s(3),u(e.EmployeeNumber),s(4),N("",e.FirstName," ",e.LastName),s(2),u(e.department_name),s(2),u(e.designation_name),s(2),u(k(14,13,e.created_at,"mediumDate")),s(3),h("",e.hr_notice_period_days||e.notice_period_days," Days"),s(3),h(" ",k(20,16,e.calculated_last_working_date,"mediumDate")," "),s(4),h(" ",e.preferred_last_working_date?k(24,19,e.preferred_last_working_date,"mediumDate"):"N/A"," "),s(3),W(e.status==null?null:e.status.toLowerCase().replace(" ","_")),s(),h(" ",e.status," "),s(3),g("routerLink",ye(22,nn,e.id))}}function sn(c,l){if(c&1&&(n(0,"div",38)(1,"table",39)(2,"thead")(3,"tr")(4,"th"),o(5,"Employee ID"),t(),n(6,"th"),o(7,"Employee Name"),t(),n(8,"th"),o(9,"Department"),t(),n(10,"th"),o(11,"Designation"),t(),n(12,"th"),o(13,"Applied Date"),t(),n(14,"th"),o(15,"Notice (Days)"),t(),n(16,"th"),o(17,"Calculated LWD"),t(),n(18,"th"),o(19,"Preferred LWD"),t(),n(20,"th"),o(21,"Status"),t(),n(22,"th"),o(23,"Actions"),t()()(),n(24,"tbody"),M(25,rn,34,24,"tr",40),t()()()),c&2){let e=d(2);s(25),g("ngForOf",e.resignationRequests)}}function cn(c,l){c&1&&(n(0,"div",47),m(1,"ion-icon",48),n(2,"h4"),o(3,"No Resignation Requests"),t(),n(4,"p"),o(5,"No resignation requests match the current filters or search query."),t()())}function ln(c,l){if(c&1&&(n(0,"div",12),M(1,an,48,6,"div",13),n(2,"div",14),M(3,sn,26,1,"div",15)(4,cn,6,0,"div",16),t()()),c&2){let e=d();s(),g("ngIf",e.userRole!=="manager"),s(2),g("ngIf",e.resignationRequests.length>0),s(),g("ngIf",e.resignationRequests.length===0)}}function dn(c,l){if(c&1){let e=w();n(0,"ion-button",53),f("click",function(){_(e);let i=d(2);return p(i.openAddConfig())}),m(1,"ion-icon",54),o(2," Configure Notice "),t()}}function gn(c,l){if(c&1){let e=w();n(0,"tr")(1,"td")(2,"strong"),o(3),t()(),n(4,"td"),o(5),t(),n(6,"td")(7,"span",55),o(8),t()(),n(9,"td")(10,"div",56)(11,"ion-button",57),f("click",function(){let i=_(e).$implicit,r=d(3);return p(r.editConfig(i))}),m(12,"ion-icon",58),t(),n(13,"ion-button",59),f("click",function(){let i=_(e).$implicit,r=d(3);return p(r.deleteConfig(i.id))}),m(14,"ion-icon",60),t()()()()}if(c&2){let e=l.$implicit;s(3),u(e.department_name),s(2),h("",e.notice_period_days," Days"),s(2),E("inactive",!e.is_active),s(),h(" ",e.is_active?"Active":"Inactive"," ")}}function _n(c,l){if(c&1&&(n(0,"div",38)(1,"table",39)(2,"thead")(3,"tr")(4,"th"),o(5,"Department"),t(),n(6,"th"),o(7,"Notice Period Days"),t(),n(8,"th"),o(9,"Status"),t(),n(10,"th"),o(11,"Actions"),t()()(),n(12,"tbody"),M(13,gn,15,5,"tr",40),t()()()),c&2){let e=d(2);s(13),g("ngForOf",e.noticePeriods)}}function pn(c,l){c&1&&(n(0,"div",47),m(1,"ion-icon",61),n(2,"h4"),o(3,"No Notice Configurations"),t(),n(4,"p"),o(5,"No department notice rules defined. Default 30-day notice period will be applied."),t()())}function mn(c,l){if(c&1&&(n(0,"ion-select-option",37),o(1),t()),c&2){let e=l.$implicit;g("value",e.id),s(),u(e.name)}}function fn(c,l){if(c&1){let e=w();n(0,"ion-col",62)(1,"div",63)(2,"div",18)(3,"h2"),o(4),t(),n(5,"ion-button",64),f("click",function(){_(e);let i=d(2);return p(i.cancelConfigEdit())}),m(6,"ion-icon",65),t()(),n(7,"div",66)(8,"div",67)(9,"ion-label",68),o(10,"Department *"),t(),n(11,"ion-item",69)(12,"ion-select",70),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.configForm.department_id,i)||(r.configForm.department_id=i),p(i)}),M(13,mn,2,2,"ion-select-option",27),t()()(),n(14,"div",67)(15,"ion-label",68),o(16,"Notice Period (Days) *"),t(),n(17,"ion-input",71),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.configForm.notice_period_days,i)||(r.configForm.notice_period_days=i),p(i)}),t()(),n(18,"div",72)(19,"ion-label",68),o(20,"Is Active"),t(),n(21,"ion-toggle",73),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.configForm.is_active,i)||(r.configForm.is_active=i),p(i)}),t()(),n(22,"div",74)(23,"ion-button",75),f("click",function(){_(e);let i=d(2);return p(i.cancelConfigEdit())}),o(24,"Cancel"),t(),n(25,"ion-button",76),f("click",function(){_(e);let i=d(2);return p(i.saveConfig())}),o(26,"Save Settings"),t()()()()()}if(c&2){let e=d(2);s(4),u(e.editingConfigId?"Edit Configuration":"Add Configuration"),s(7),g("disabled",e.editingConfigId!==null),s(),C("ngModel",e.configForm.department_id),s(),g("ngForOf",e.departments),s(4),C("ngModel",e.configForm.notice_period_days),s(4),C("ngModel",e.configForm.is_active),g("checked",e.configForm.is_active===1)}}function un(c,l){if(c&1&&(n(0,"div",12)(1,"ion-grid",21)(2,"ion-row")(3,"ion-col",49)(4,"div",50)(5,"div",18)(6,"h2"),o(7,"Department notice configurations"),t(),M(8,dn,3,0,"ion-button",51),t(),M(9,_n,14,1,"div",15)(10,pn,6,0,"div",16),t()(),M(11,fn,27,7,"ion-col",52),t()()()),c&2){let e=d();s(8),g("ngIf",!e.showConfigForm),s(),g("ngIf",e.noticePeriods.length>0),s(),g("ngIf",e.noticePeriods.length===0),s(),g("ngIf",e.showConfigForm)}}function Cn(c,l){if(c&1){let e=w();n(0,"ion-button",53),f("click",function(){_(e);let i=d(2);return p(i.openAddReason())}),m(1,"ion-icon",54),o(2," Add Reason "),t()}}function xn(c,l){if(c&1){let e=w();n(0,"tr")(1,"td")(2,"strong"),o(3),t()(),n(4,"td"),o(5),t(),n(6,"td")(7,"span",55),o(8),t()(),n(9,"td")(10,"div",56)(11,"ion-button",57),f("click",function(){let i=_(e).$implicit,r=d(3);return p(r.editReason(i))}),m(12,"ion-icon",58),t(),n(13,"ion-button",59),f("click",function(){let i=_(e).$implicit,r=d(3);return p(r.deleteReason(i.id))}),m(14,"ion-icon",60),t()()()()}if(c&2){let e=l.$implicit;s(3),u(e.reason),s(2),u(e.description||"N/A"),s(2),E("inactive",!e.is_active),s(),h(" ",e.is_active?"Active":"Inactive"," ")}}function Pn(c,l){if(c&1&&(n(0,"div",38)(1,"table",39)(2,"thead")(3,"tr")(4,"th"),o(5,"Reason"),t(),n(6,"th"),o(7,"Description"),t(),n(8,"th"),o(9,"Status"),t(),n(10,"th"),o(11,"Actions"),t()()(),n(12,"tbody"),M(13,xn,15,5,"tr",40),t()()()),c&2){let e=d(2);s(13),g("ngForOf",e.reasons)}}function Mn(c,l){c&1&&(n(0,"div",47),m(1,"ion-icon",61),n(2,"h4"),o(3,"No Resignation Reasons Defined"),t(),n(4,"p"),o(5,"Create custom reasons to display to employees on the resignation form."),t()())}function hn(c,l){if(c&1){let e=w();n(0,"ion-col",62)(1,"div",63)(2,"div",18)(3,"h2"),o(4),t(),n(5,"ion-button",64),f("click",function(){_(e);let i=d(2);return p(i.cancelReasonEdit())}),m(6,"ion-icon",65),t()(),n(7,"div",66)(8,"div",67)(9,"ion-label",68),o(10,"Reason *"),t(),n(11,"ion-input",77),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.reasonForm.reason,i)||(r.reasonForm.reason=i),p(i)}),t()(),n(12,"div",67)(13,"ion-label",68),o(14,"Description"),t(),n(15,"ion-textarea",78),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.reasonForm.description,i)||(r.reasonForm.description=i),p(i)}),t()(),n(16,"div",72)(17,"ion-label",68),o(18,"Is Active"),t(),n(19,"ion-toggle",73),P("ngModelChange",function(i){_(e);let r=d(2);return x(r.reasonForm.is_active,i)||(r.reasonForm.is_active=i),p(i)}),t()(),n(20,"div",74)(21,"ion-button",75),f("click",function(){_(e);let i=d(2);return p(i.cancelReasonEdit())}),o(22,"Cancel"),t(),n(23,"ion-button",76),f("click",function(){_(e);let i=d(2);return p(i.saveReason())}),o(24,"Save Reason"),t()()()()()}if(c&2){let e=d(2);s(4),u(e.editingReasonId?"Edit Reason":"Add Reason"),s(7),C("ngModel",e.reasonForm.reason),s(4),C("ngModel",e.reasonForm.description),s(4),C("ngModel",e.reasonForm.is_active),g("checked",e.reasonForm.is_active===1)}}function On(c,l){if(c&1&&(n(0,"div",12)(1,"ion-grid",21)(2,"ion-row")(3,"ion-col",49)(4,"div",50)(5,"div",18)(6,"h2"),o(7,"Resignation Reasons Directory"),t(),M(8,Cn,3,0,"ion-button",51),t(),M(9,Pn,14,1,"div",15)(10,Mn,6,0,"div",16),t(),m(11,"app-resignation-settings")(12,"app-notice-period-leaves-settings"),t(),M(13,hn,25,5,"ion-col",52),t()()()),c&2){let e=d();s(8),g("ngIf",!e.showReasonForm),s(),g("ngIf",e.reasons.length>0),s(),g("ngIf",e.reasons.length===0),s(3),g("ngIf",e.showReasonForm)}}function bn(c,l){if(c&1){let e=w();n(0,"div",79)(1,"div",80)(2,"div",81)(3,"div",82)(4,"h3"),o(5,"Exit Timeline & Progress"),t(),n(6,"p"),o(7),t()(),n(8,"ion-button",83),f("click",function(){_(e);let i=d();return p(i.closeTracking())}),m(9,"ion-icon",65),t()(),n(10,"div",84),m(11,"app-resignation-tracking",85),t()()()}if(c&2){let e=d();s(7),we("",e.trackingResignation.FirstName," ",e.trackingResignation.LastName," (",e.trackingResignation.EmployeeNumber,")"),s(4),g("resignation",e.trackingResignation)}}var qe=(()=>{let l=class l{constructor(a,i,r,v,O,ue){this.separationService=a,this.adminService=i,this.routeGuardService=r,this.toastController=v,this.alertController=O,this.loadingController=ue,this.selectedSegment="requests",this.userRole=null,this.resignationRequests=[],this.noticePeriods=[],this.departments=[],this.reasons=[],this.showReasonForm=!1,this.editingReasonId=null,this.reasonForm={reason:"",description:"",is_active:1},this.trackingResignation=null,this.filters={employee:"",department:"",status:"",startDate:"",endDate:""},this.showConfigForm=!1,this.editingConfigId=null,this.configForm={department_id:"",notice_period_days:30,is_active:1}}ngOnInit(){this.userRole=this.routeGuardService.userRole?.toLowerCase()||null,this.loadRequests(),this.loadNoticePeriods(),this.loadDepartments(),this.loadReasons()}loadRequests(){this.separationService.getResignationRequests(this.filters).subscribe({next:a=>{this.resignationRequests=a},error:a=>{console.error("Error fetching resignation requests:",a),this.presentToast("Failed to load resignation requests.","danger")}})}loadNoticePeriods(){this.separationService.getNoticePeriods().subscribe({next:a=>{this.noticePeriods=a},error:a=>{console.error("Error fetching notice periods:",a)}})}loadDepartments(){this.adminService.getDepartments().subscribe({next:a=>{this.departments=a},error:a=>{console.error("Error fetching departments:",a)}})}applyFilters(){this.loadRequests()}clearFilters(){this.filters={employee:"",department:"",status:"",startDate:"",endDate:""},this.loadRequests()}segmentChanged(a){this.selectedSegment=a.detail.value}openAddConfig(){this.editingConfigId=null,this.configForm={department_id:"",notice_period_days:30,is_active:1},this.showConfigForm=!0}editConfig(a){this.editingConfigId=a.id,this.configForm={department_id:a.department_id.toString(),notice_period_days:a.notice_period_days,is_active:a.is_active},this.showConfigForm=!0}cancelConfigEdit(){this.showConfigForm=!1,this.editingConfigId=null}saveConfig(){return y(this,null,function*(){if(!this.configForm.department_id||this.configForm.notice_period_days===void 0){this.presentToast("Please fill all required fields.","danger");return}let a=yield this.loadingController.create({message:"Saving configuration...",spinner:"crescent"});yield a.present();let i={department_id:parseInt(this.configForm.department_id),notice_period_days:this.configForm.notice_period_days,is_active:this.configForm.is_active};this.separationService.saveNoticePeriod(i).subscribe({next:()=>{a.dismiss(),this.presentToast("Configuration saved successfully.","success"),this.showConfigForm=!1,this.loadNoticePeriods()},error:r=>{a.dismiss(),this.presentToast(r.error?.error||"Failed to save configuration.","danger")}})})}deleteConfig(a){return y(this,null,function*(){yield(yield this.alertController.create({header:"Delete Notice Period Rule",message:"Are you sure you want to delete this notice period policy? It will revert to the default 30 days notice period for this department.",buttons:[{text:"No",role:"cancel"},{text:"Yes, Delete",handler:()=>{this.separationService.deleteNoticePeriod(a).subscribe({next:()=>{this.presentToast("Notice period deleted successfully.","success"),this.loadNoticePeriods()},error:r=>{this.presentToast("Failed to delete notice period.","danger")}})}}]})).present()})}presentToast(a,i){return y(this,null,function*(){(yield this.toastController.create({message:a,duration:2e3,color:i,position:"top"})).present()})}getDeptName(a){let i=this.departments.find(r=>r.id===a);return i?i.name:"Unknown Department"}loadReasons(){this.separationService.getResignationReasons().subscribe({next:a=>{this.reasons=a},error:a=>{console.error("Error fetching resignation reasons:",a)}})}openAddReason(){this.editingReasonId=null,this.reasonForm={reason:"",description:"",is_active:1},this.showReasonForm=!0}editReason(a){this.editingReasonId=a.id,this.reasonForm={reason:a.reason,description:a.description||"",is_active:a.is_active},this.showReasonForm=!0}cancelReasonEdit(){this.showReasonForm=!1,this.editingReasonId=null}saveReason(){return y(this,null,function*(){if(!this.reasonForm.reason||this.reasonForm.reason.trim()===""){this.presentToast("Please fill all required fields.","danger");return}let a=yield this.loadingController.create({message:"Saving reason...",spinner:"crescent"});yield a.present();let i={reason:this.reasonForm.reason,description:this.reasonForm.description,is_active:this.reasonForm.is_active};this.editingReasonId?this.separationService.updateResignationReason(this.editingReasonId,i).subscribe({next:()=>{a.dismiss(),this.presentToast("Reason updated successfully.","success"),this.showReasonForm=!1,this.loadReasons()},error:r=>{a.dismiss(),this.presentToast(r.error?.error||"Failed to update reason.","danger")}}):this.separationService.createResignationReason(i).subscribe({next:()=>{a.dismiss(),this.presentToast("Reason created successfully.","success"),this.showReasonForm=!1,this.loadReasons()},error:r=>{a.dismiss(),this.presentToast(r.error?.error||"Failed to create reason.","danger")}})})}deleteReason(a){return y(this,null,function*(){yield(yield this.alertController.create({header:"Delete Resignation Reason",message:"Are you sure you want to delete this resignation reason? If in use, it will be deactivated.",buttons:[{text:"No",role:"cancel"},{text:"Yes, Delete",handler:()=>{this.separationService.deleteResignationReason(a).subscribe({next:r=>{this.presentToast(r.message||"Resignation reason deleted successfully.","success"),this.loadReasons()},error:r=>{this.presentToast("Failed to delete resignation reason.","danger")}})}}]})).present()})}trackResignation(a){this.trackingResignation=a}closeTracking(){this.trackingResignation=null}};l.\u0275fac=function(i){return new(i||l)(b(V),b(Be),b(ge),b(F),b(de),b(D))},l.\u0275cmp=I({type:l,selectors:[["app-separation"]],standalone:!1,decls:12,vars:5,consts:[[1,"ion-no-border"],[1,"home-toolbar"],["slot","start"],["class","header-segment-toolbar",4,"ngIf"],[1,"admin-separation-content","ion-padding"],["class","animate__animated animate__fadeIn",4,"ngIf"],["class","tracking-overlay animate__animated animate__fadeIn",4,"ngIf"],[1,"header-segment-toolbar"],["mode","md",1,"profile-segment",3,"ngModelChange","ionChange","ngModel"],["value","requests"],["value","notice_periods"],["value","reasons"],[1,"animate__animated","animate__fadeIn"],["class","filter-card",4,"ngIf"],[1,"list-card"],["class","table-container",4,"ngIf"],["class","no-data-placeholder",4,"ngIf"],[1,"filter-card"],[1,"card-header"],["name","funnel-outline"],["fill","clear","color","medium","size","small",3,"click"],[1,"ion-no-padding"],["size","12","size-md","3",1,"filter-col"],["placeholder","Name or Emp ID",1,"filter-input",3,"ngModelChange","ionInput","ngModel"],["lines","none",1,"filter-select-item"],["placeholder","All Departments",1,"filter-select",3,"ngModelChange","ionChange","ngModel"],["value",""],[3,"value",4,"ngFor","ngForOf"],["placeholder","All Statuses",1,"filter-select",3,"ngModelChange","ionChange","ngModel"],["value","Submitted"],["value","Manager Review"],["value","HR Review"],["value","Exit Clearance"],["value","Relieved"],["value","Rejected"],[1,"date-range-inputs"],["type","date",1,"filter-date-picker",3,"ngModelChange","change","ngModel"],[3,"value"],[1,"table-container"],[1,"premium-table"],[4,"ngFor","ngForOf"],[1,"emp-name-cell"],[1,"lwd-text"],[1,"status-tag"],[1,"action-buttons-cell"],["fill","outline","size","small","color","primary",1,"table-action-btn",3,"routerLink"],["fill","solid","size","small","color","secondary",1,"table-action-btn",3,"click"],[1,"no-data-placeholder"],["name","file-tray-outline"],["size","12","size-lg","8",1,"ion-padding-end"],[1,"list-card","notice-list-card"],["size","small","color","primary",3,"click",4,"ngIf"],["size","12","size-lg","4","class","animate__animated animate__slideInRight",4,"ngIf"],["size","small","color","primary",3,"click"],["name","plus-outline","slot","start"],[1,"active-badge"],[1,"action-icons"],["fill","clear","size","small","color","primary",3,"click"],["name","pencil-outline","slot","icon-only"],["fill","clear","size","small","color","danger",3,"click"],["name","trash-outline","slot","icon-only"],["name","alert-circle-outline"],["size","12","size-lg","4",1,"animate__animated","animate__slideInRight"],[1,"list-card","form-pane-card"],["fill","clear","color","medium",3,"click"],["name","close-outline","slot","icon-only"],[1,"form-content"],[1,"form-group"],[1,"field-label"],["lines","none",1,"form-select-item",3,"disabled"],["placeholder","Select Department","interface","popover",1,"form-select",3,"ngModelChange","ngModel"],["type","number","placeholder","Notice Period Days",1,"form-input",3,"ngModelChange","ngModel"],[1,"form-group","toggle-group"],[3,"ngModelChange","ngModel","checked"],[1,"form-actions-pane"],["fill","outline","color","medium","expand","block",3,"click"],["color","primary","expand","block",3,"click"],["type","text","placeholder","Reason Title",1,"form-input",3,"ngModelChange","ngModel"],["placeholder","Optional description...","rows","3",1,"form-textarea",3,"ngModelChange","ngModel"],[1,"tracking-overlay","animate__animated","animate__fadeIn"],[1,"tracking-modal-card"],[1,"tracking-modal-header"],[1,"header-title"],["fill","clear","color","dark",3,"click"],[1,"tracking-modal-body","ion-padding"],[3,"resignation"]],template:function(i,r){i&1&&(n(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),m(3,"ion-menu-button"),t(),n(4,"ion-title"),o(5,"Exit & Separation Management"),t()(),M(6,tn,11,1,"ion-toolbar",3),t(),n(7,"ion-content",4),M(8,ln,5,3,"div",5)(9,un,12,4,"div",5)(10,On,14,4,"div",5)(11,bn,12,4,"div",6),t()),i&2&&(s(6),g("ngIf",r.userRole!=="manager"),s(2),g("ngIf",r.selectedSegment==="requests"),s(),g("ngIf",r.selectedSegment==="notice_periods"),s(),g("ngIf",r.selectedSegment==="reasons"),s(),g("ngIf",r.trackingResignation))},dependencies:[A,z,Re,R,T,X,K,Z,$,ee,ne,j,te,Fe,ie,Ve,oe,ae,re,We,Ne,se,ce,Ae,le,De,Y,J,Q,Le,Ee,_e,me,fe,G],styles:[`

.admin-separation-content[_ngcontent-%COMP%] {
  --background: #f3f4f6;
  font-family: "Inter", sans-serif;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 10px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 6px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%] {
  padding: 0 8px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 0.78rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 6px;
  display: block;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  --padding-start: 12px;
  font-size: 0.85rem;
  min-height: 40px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   .filter-select-item[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  --min-height: 40px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   .filter-select-item[_ngcontent-%COMP%]   .filter-select[_ngcontent-%COMP%] {
  width: 100%;
  font-size: 0.85rem;
  --padding-start: 12px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   .date-range-inputs[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   .date-range-inputs[_ngcontent-%COMP%]   .filter-date-picker[_ngcontent-%COMP%] {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.82rem;
  color: #374151;
  flex: 1;
  outline: none;
  max-width: 110px;
}
.admin-separation-content[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-col[_ngcontent-%COMP%]   .date-range-inputs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: #9ca3af;
}
.admin-separation-content[_ngcontent-%COMP%]   .list-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 24px;
}
.admin-separation-content[_ngcontent-%COMP%]   .list-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
}
.admin-separation-content[_ngcontent-%COMP%]   .list-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}
.admin-separation-content[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {
  overflow-x: auto;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #f9fafb;
  padding: 14px 18px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e7eb;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 14px 18px;
  font-size: 0.85rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  background-color: #f9fafb;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .emp-name-cell[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .lwd-text[_ngcontent-%COMP%] {
  color: #ef4444;
  font-weight: 600;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag.submitted[_ngcontent-%COMP%], 
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag.manager_review[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #d97706;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag.hr_review[_ngcontent-%COMP%] {
  background: #ede9fe;
  color: #6d28d9;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag.exit_clearance[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #1d4ed8;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag.relieved[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #047857;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-tag.rejected[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .table-action-btn[_ngcontent-%COMP%] {
  --border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  margin: 0;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .action-icons[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
}
.admin-separation-content[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .action-icons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --padding-start: 4px;
  --padding-end: 4px;
  margin: 0;
}
.admin-separation-content[_ngcontent-%COMP%]   .active-badge[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 6px;
  border-radius: 4px;
  background: #d1fae5;
  color: #065f46;
}
.admin-separation-content[_ngcontent-%COMP%]   .active-badge.inactive[_ngcontent-%COMP%] {
  background: #f3f4f6;
  color: #374151;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 16px 20px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 15px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 6px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-select-item[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  --min-height: 42px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-select-item[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {
  width: 100%;
  font-size: 0.88rem;
  --padding-start: 12px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  --padding-start: 12px;
  font-size: 0.88rem;
  min-height: 42px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {
  margin-bottom: 0;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .form-actions-pane[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-pane-card[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]   .form-actions-pane[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  flex: 1;
  --border-radius: 8px;
  font-weight: 600;
  margin: 0;
}
.admin-separation-content[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
}
.admin-separation-content[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 3rem;
  margin-bottom: 12px;
}
.admin-separation-content[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
}
.admin-separation-content[_ngcontent-%COMP%]   .no-data-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.82rem;
}
.admin-separation-content[_ngcontent-%COMP%]   .action-buttons-cell[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: center;
}
.admin-separation-content[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  --padding-start: 12px;
  --padding-top: 10px;
  font-size: 0.88rem;
  min-height: 80px;
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%]   .tracking-modal-card[_ngcontent-%COMP%] {
  background: #ffffff;
  width: 90%;
  max-width: 650px;
  height: 90%;
  max-height: 600px;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%]   .tracking-modal-card[_ngcontent-%COMP%]   .tracking-modal-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%]   .tracking-modal-card[_ngcontent-%COMP%]   .tracking-modal-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 2px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%]   .tracking-modal-card[_ngcontent-%COMP%]   .tracking-modal-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%]   .tracking-modal-card[_ngcontent-%COMP%]   .tracking-modal-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  margin: 0;
}
.admin-separation-content[_ngcontent-%COMP%]   .tracking-overlay[_ngcontent-%COMP%]   .tracking-modal-card[_ngcontent-%COMP%]   .tracking-modal-body[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}`]});let c=l;return c})();var He=()=>["Submitted","Manager Review","HR Review"],vn=()=>["IT","Admin","Finance","HR","Security"];function wn(c,l){if(c&1){let e=w();n(0,"ion-toolbar",6)(1,"ion-segment",7),P("ngModelChange",function(i){_(e);let r=d();return x(r.selectedTab,i)||(r.selectedTab=i),p(i)}),n(2,"ion-segment-button",8)(3,"ion-label"),o(4,"DETAILS & APPROVAL"),t()(),n(5,"ion-segment-button",9)(6,"ion-label"),o(7,"EXIT CLEARANCE"),t()(),n(8,"ion-segment-button",10)(9,"ion-label"),o(10,"F&F SETTLEMENT"),t()()()()}if(c&2){let e=d();s(),C("ngModel",e.selectedTab),s(4),g("disabled",H(3,He).includes(e.resignation.status)),s(3),g("disabled",H(4,He).includes(e.resignation.status))}}function yn(c,l){if(c&1&&(n(0,"div",46)(1,"span",27),o(2,"Discussion Summary"),t(),n(3,"div",47)(4,"p"),o(5),t()()()),c&2){let e=d(3);s(5),u(e.resignation.discussion_summary)}}function Sn(c,l){if(c&1&&(n(0,"div",26)(1,"span",27),o(2,"Preferred Last Working Date"),t(),n(3,"span",48),o(4),S(5,"date"),t()()),c&2){let e=d(3);s(4),u(k(5,1,e.resignation.preferred_last_working_date,"mediumDate"))}}function kn(c,l){if(c&1&&(n(0,"div",46)(1,"span",27),o(2,"Employee Comments"),t(),n(3,"div",47)(4,"p"),o(5),t()()()),c&2){let e=d(3);s(5),u(e.resignation.additional_comments)}}function En(c,l){if(c&1){let e=w();n(0,"div",49)(1,"div",23),m(2,"ion-icon",50),n(3,"h2"),o(4,"Workflow Action"),t()(),n(5,"div",51)(6,"p",52),o(7,"Current Step: "),n(8,"strong"),o(9,"Manager Approval"),t()(),n(10,"div",53)(11,"ion-label",54),o(12,"Approval Remarks *"),t(),n(13,"ion-textarea",55),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.managerRemarks,i)||(r.managerRemarks=i),p(i)}),t()(),n(14,"div",56)(15,"ion-button",57),f("click",function(){_(e);let i=d(3);return p(i.submitManagerAction("Send Back"))}),o(16,"Send Back"),t(),n(17,"ion-button",58),f("click",function(){_(e);let i=d(3);return p(i.submitManagerAction("Approve"))}),o(18,"Approve"),t()()()()}if(c&2){let e=d(3);s(13),C("ngModel",e.managerRemarks)}}function In(c,l){if(c&1){let e=w();xe(0),n(1,"div",53)(2,"ion-label",54),o(3,"Notice Period (Days)"),t(),n(4,"ion-input",60),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.hrNoticeDays,i)||(r.hrNoticeDays=i),p(i)}),t()(),n(5,"div",53)(6,"ion-label",54),o(7,"Final Last Working Date"),t(),n(8,"ion-input",61),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.hrLastWorkingDate,i)||(r.hrLastWorkingDate=i),p(i)}),t()(),n(9,"div",53)(10,"ion-label",54),o(11,"HR Review Remarks"),t(),n(12,"ion-textarea",62),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.hrRemarks,i)||(r.hrRemarks=i),p(i)}),t()(),n(13,"div",63)(14,"ion-button",64),f("click",function(){_(e);let i=d(4);return p(i.submitHRAction("Approve"))}),o(15,"Approve Resignation"),t(),n(16,"div",65)(17,"ion-button",66),f("click",function(){_(e);let i=d(4);return p(i.submitHRAction("Return"))}),o(18,"Return to Employee"),t(),n(19,"ion-button",67),f("click",function(){_(e);let i=d(4);return p(i.submitHRAction("Reject"))}),o(20,"Reject"),t()()(),Pe()}if(c&2){let e=d(4);s(4),C("ngModel",e.hrNoticeDays),s(4),C("ngModel",e.hrLastWorkingDate),s(4),C("ngModel",e.hrRemarks)}}function Rn(c,l){if(c&1){let e=w();xe(0),n(1,"p",68),m(2,"ion-icon",69),o(3," Manager sent this back for HR review. "),t(),n(4,"div",53)(5,"ion-label",54),o(6,"Notice Period (Days)"),t(),n(7,"ion-input",60),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.hrNoticeDays,i)||(r.hrNoticeDays=i),p(i)}),t()(),n(8,"div",53)(9,"ion-label",54),o(10,"Final Last Working Date"),t(),n(11,"ion-input",61),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.hrLastWorkingDate,i)||(r.hrLastWorkingDate=i),p(i)}),t()(),n(12,"div",53)(13,"ion-label",54),o(14,"HR Review Remarks"),t(),n(15,"ion-textarea",62),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.hrRemarks,i)||(r.hrRemarks=i),p(i)}),t()(),n(16,"div",63)(17,"ion-button",64),f("click",function(){_(e);let i=d(4);return p(i.submitHRAction("Approve"))}),o(18,"Approve Resignation"),t(),n(19,"div",65)(20,"ion-button",66),f("click",function(){_(e);let i=d(4);return p(i.submitHRAction("Return"))}),o(21,"Return to Employee"),t(),n(22,"ion-button",67),f("click",function(){_(e);let i=d(4);return p(i.submitHRAction("Reject"))}),o(23,"Reject"),t()()(),Pe()}if(c&2){let e=d(4);s(7),C("ngModel",e.hrNoticeDays),s(4),C("ngModel",e.hrLastWorkingDate),s(4),C("ngModel",e.hrRemarks)}}function Tn(c,l){if(c&1&&(n(0,"div",49)(1,"div",23),m(2,"ion-icon",59),n(3,"h2"),o(4,"HR Action"),t()(),n(5,"div",51)(6,"p",52),o(7,"Current Step: "),n(8,"strong"),o(9,"HR Approval & Date Override"),t()(),M(10,In,21,3,"ng-container",44)(11,Rn,24,3,"ng-container",44),t()()),c&2){let e=d(3);s(10),g("ngIf",e.resignation.manager_action==="Approve"),s(),g("ngIf",e.resignation.manager_action==="Send Back")}}function Dn(c,l){if(c&1&&(n(0,"p"),o(1),S(2,"date"),t()),c&2){let e=d(3);s(),h("Approved by manager on ",k(2,1,e.resignation.manager_action_at,"short"))}}function Fn(c,l){if(c&1&&(n(0,"p"),o(1),S(2,"date"),t()),c&2){let e=d(3);s(),h("Sent Back by manager on ",k(2,1,e.resignation.manager_action_at,"short"))}}function Vn(c,l){c&1&&(n(0,"p"),o(1,"Awaiting approval from reporting manager"),t())}function Wn(c,l){if(c&1&&(n(0,"p",70),o(1),t()),c&2){let e=d(3);s(),h('"',e.resignation.manager_remarks,'"')}}function Nn(c,l){if(c&1&&(n(0,"p"),o(1),S(2,"date"),t()),c&2){let e=d(3);s(),h("Approved by HR on ",k(2,1,e.resignation.hr_action_at,"short"))}}function An(c,l){if(c&1&&(n(0,"p"),o(1),S(2,"date"),t()),c&2){let e=d(3);s(),h("Returned to Employee by HR on ",k(2,1,e.resignation.hr_action_at,"short"))}}function zn(c,l){if(c&1&&(n(0,"p"),o(1),S(2,"date"),t()),c&2){let e=d(3);s(),h("Rejected by HR on ",k(2,1,e.resignation.hr_action_at,"short"))}}function Ln(c,l){c&1&&(n(0,"p"),o(1,"Pending final signoff by HR department"),t())}function Bn(c,l){if(c&1&&(n(0,"p",70),o(1),t()),c&2){let e=d(3);s(),h('"',e.resignation.hr_remarks,'"')}}function jn(c,l){if(c&1&&(n(0,"div",19)(1,"ion-grid",20)(2,"ion-row")(3,"ion-col",21)(4,"div",22)(5,"div",23),m(6,"ion-icon",24),n(7,"h2"),o(8,"Employee General Info"),t()(),n(9,"div",25)(10,"div",26)(11,"span",27),o(12,"Date of Joining"),t(),n(13,"span",28),o(14),S(15,"date"),t()(),n(16,"div",26)(17,"span",27),o(18,"Work Email"),t(),n(19,"span",28),o(20),t()(),n(21,"div",26)(22,"span",27),o(23,"Reporting Manager"),t(),n(24,"span",28),o(25),t()()()(),n(26,"div",22)(27,"div",23),m(28,"ion-icon",29),n(29,"h2"),o(30,"Resignation Request Details"),t()(),n(31,"div",30)(32,"div",26)(33,"span",27),o(34,"Applied Date"),t(),n(35,"span",28),o(36),S(37,"date"),t()(),n(38,"div",26)(39,"span",27),o(40,"Resignation Reason"),t(),n(41,"span",31),o(42),t()(),n(43,"div",26)(44,"span",27),o(45,"Notice Period Days"),t(),n(46,"span",28),o(47),t()(),n(48,"div",26)(49,"span",27),o(50,"Calculated Last Working Date"),t(),n(51,"span",32),o(52),S(53,"date"),t()(),n(54,"div",26)(55,"span",27),o(56,"Discussed with Manager?"),t(),n(57,"span",28),o(58),t()(),M(59,yn,6,1,"div",33),n(60,"div",26)(61,"span",27),o(62,"Early Relieving Requested?"),t(),n(63,"span",28),o(64),t()(),M(65,Sn,6,4,"div",34)(66,kn,6,1,"div",33),t()()(),n(67,"ion-col",35),M(68,En,19,1,"div",36)(69,Tn,12,2,"div",36),n(70,"div",37)(71,"div",23),m(72,"ion-icon",38),n(73,"h2"),o(74,"Workflow History"),t()(),n(75,"div",39)(76,"div",40)(77,"span",41),o(78,"\u2713"),t(),n(79,"div",42)(80,"h4"),o(81,"Resignation Submitted"),t(),n(82,"p"),o(83),S(84,"date"),t()()(),n(85,"div",43)(86,"span",41),o(87),t(),n(88,"div",42)(89,"h4"),o(90,"Manager Review"),t(),M(91,Dn,3,4,"p",44)(92,Fn,3,4,"p",44)(93,Vn,2,0,"p",44)(94,Wn,2,1,"p",45),t()(),n(95,"div",43)(96,"span",41),o(97),t(),n(98,"div",42)(99,"h4"),o(100,"HR Approval"),t(),M(101,Nn,3,4,"p",44)(102,An,3,4,"p",44)(103,zn,3,4,"p",44)(104,Ln,2,0,"p",44)(105,Bn,2,1,"p",45),t()()()()()()()()),c&2){let e=d(2);s(14),u(k(15,35,e.resignation.DateJoined,"mediumDate")),s(6),u(e.resignation.WorkEmail),s(5),N("",e.resignation.manager_first_name," ",e.resignation.manager_last_name),s(11),u(k(37,38,e.resignation.created_at,"mediumDate")),s(6),u(e.resignation.reason),s(5),h("",e.resignation.hr_notice_period_days||e.resignation.notice_period_days," Days"),s(5),u(k(53,41,e.resignation.hr_last_working_date||e.resignation.calculated_last_working_date,"mediumDate")),s(6),u(e.resignation.discussed_with_manager),s(),g("ngIf",e.resignation.discussed_with_manager==="Yes"),s(5),u(e.resignation.early_relieving_request),s(),g("ngIf",e.resignation.early_relieving_request==="Yes"),s(),g("ngIf",e.resignation.additional_comments),s(2),g("ngIf",e.showManagerActionCard()),s(),g("ngIf",e.showHrActionCard()),s(14),h("Employee initiated request on ",k(84,44,e.resignation.created_at,"mediumDate")),s(2),E("completed",e.resignation.manager_action==="Approve"||e.resignation.manager_action==="Send Back")("active",e.resignation.current_workflow_step==="Manager Review"),s(2),u(e.resignation.manager_action==="Approve"||e.resignation.manager_action==="Send Back"?"\u2713":"\u2022"),s(4),g("ngIf",e.resignation.manager_action==="Approve"),s(),g("ngIf",e.resignation.manager_action==="Send Back"),s(),g("ngIf",e.resignation.manager_action==="Pending"),s(),g("ngIf",e.resignation.manager_remarks),s(),E("completed",e.resignation.hr_action==="Approve"||e.resignation.hr_action==="Return"||e.resignation.hr_action==="Reject")("active",e.resignation.current_workflow_step==="HR Approval"),s(2),u(e.resignation.hr_action==="Approve"||e.resignation.hr_action==="Return"||e.resignation.hr_action==="Reject"?"\u2713":"\u2022"),s(4),g("ngIf",e.resignation.hr_action==="Approve"),s(),g("ngIf",e.resignation.hr_action==="Return"),s(),g("ngIf",e.resignation.hr_action==="Reject"),s(),g("ngIf",e.resignation.hr_action==="Pending"),s(),g("ngIf",e.resignation.hr_remarks)}}function qn(c,l){if(c&1){let e=w();n(0,"tr",83),f("dblclick",function(){let i=_(e).$implicit,r=d(4);return p(r.toggleTaskStatus(i))}),n(1,"td")(2,"strong"),o(3),t()(),n(4,"td")(5,"span",84),o(6),t()(),n(7,"td"),o(8),t(),n(9,"td"),o(10),t(),n(11,"td"),o(12),S(13,"date"),t()()}if(c&2){let e=l.$implicit;s(3),u(e.task_name),s(2),W(e.status==null?null:e.status.toLowerCase().replace(" ","_")),s(),h(" ",e.status," "),s(2),u(e.remarks||"-"),s(2),u(e.cleared_by_name||"-"),s(2),u(k(13,7,e.cleared_at,"short")||"-")}}function Hn(c,l){if(c&1&&(n(0,"div",77)(1,"div",78)(2,"h3"),o(3),t(),n(4,"span",79),o(5),t()(),n(6,"div",80)(7,"table",81)(8,"thead")(9,"tr")(10,"th"),o(11,"Task Description"),t(),n(12,"th"),o(13,"Status"),t(),n(14,"th"),o(15,"Remarks"),t(),n(16,"th"),o(17,"Signed Off By"),t(),n(18,"th"),o(19,"Signed Off Date"),t()()(),n(20,"tbody"),M(21,qn,14,10,"tr",82),t()()()()),c&2){let e=l.$implicit,a=d(3);s(3),h("",e," Department"),s(),E("completed",a.getDeptClearanceStatus(e)==="Completed"),s(),h(" ",a.getDeptClearanceStatus(e)," "),s(16),g("ngForOf",a.getTasksByDept(e))}}function Gn(c,l){if(c&1&&(n(0,"div",19)(1,"div",71)(2,"div",72)(3,"div",23),m(4,"ion-icon",73),n(5,"h2"),o(6,"Department Clearances Sign-Off"),t()(),n(7,"span",74),o(8," Tasks Cleared: "),n(9,"strong"),o(10),t()()(),n(11,"div",75),M(12,Hn,22,5,"div",76),t()()()),c&2){let e=d(2);s(10),N("",e.getCompletedClearanceCount()," / ",e.clearanceTasks.length),s(2),g("ngForOf",H(3,vn))}}function Un(c,l){c&1&&(n(0,"div",87),m(1,"ion-icon",88),n(2,"div",89)(3,"h3"),o(4,"F&F Settlement Blocked"),t(),n(5,"p"),o(6,"You can only process the Full & Final Settlement once all department clearance tasks are completed."),t()()())}function Yn(c,l){if(c&1){let e=w();n(0,"div",114)(1,"ion-button",115),f("click",function(){_(e);let i=d(4);return p(i.saveSettlement())}),o(2,"Calculate & Process F&F"),t()()}}function Jn(c,l){if(c&1){let e=w();n(0,"div",116)(1,"p"),o(2,"Provide a bank transaction or cheque reference to finalize the relieving formalities."),t(),n(3,"div",53)(4,"ion-label",54),o(5,"Payment Reference Number *"),t(),n(6,"ion-input",117),P("ngModelChange",function(i){_(e);let r=d(4);return x(r.paymentRef,i)||(r.paymentRef=i),p(i)}),t()(),n(7,"ion-button",118),f("click",function(){_(e);let i=d(4);return p(i.paySettlement())}),m(8,"ion-icon",119),o(9," Confirm Payment & Relieve "),t()()}if(c&2){let e=d(4);s(6),C("ngModel",e.paymentRef)}}function Qn(c,l){if(c&1&&(n(0,"div",120),m(1,"ion-icon",121),n(2,"h3"),o(3,"Settlement Paid"),t(),n(4,"p"),o(5,"Transaction Reference: "),n(6,"strong"),o(7),t()(),n(8,"p"),o(9,"Paid On: "),n(10,"strong"),o(11),S(12,"date"),t()(),n(13,"p"),o(14,"Processed By: "),n(15,"strong"),o(16),t()()()),c&2){let e=d(4);s(7),u(e.settlement.payment_reference),s(4),u(k(12,3,e.settlement.paid_at,"medium")),s(5),u(e.settlement.processed_by_name)}}function Xn(c,l){if(c&1){let e=w();n(0,"ion-grid",20)(1,"ion-row")(2,"ion-col",90)(3,"div",91)(4,"div",23),m(5,"ion-icon",92),n(6,"h2"),o(7,"Full & Final Settlement Calculator"),t()(),n(8,"div",93)(9,"div",94),o(10,"Additions / Earnings"),t(),n(11,"div",95)(12,"ion-label"),o(13,"Pending Salary (\u20B9)"),t(),n(14,"ion-input",96),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.settlementForm.pending_salary,i)||(r.settlementForm.pending_salary=i),p(i)}),t()(),n(15,"div",95)(16,"ion-label"),o(17,"Leave Encashment (\u20B9)"),t(),n(18,"ion-input",96),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.settlementForm.leave_encashment,i)||(r.settlementForm.leave_encashment=i),p(i)}),t()(),n(19,"div",95)(20,"ion-label"),o(21,"Bonus (\u20B9)"),t(),n(22,"ion-input",96),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.settlementForm.bonus,i)||(r.settlementForm.bonus=i),p(i)}),t()(),n(23,"div",97),o(24,"Deductions / Recoveries"),t(),n(25,"div",95)(26,"ion-label"),o(27,"Assets Recoveries (\u20B9)"),t(),n(28,"ion-input",96),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.settlementForm.recoveries,i)||(r.settlementForm.recoveries=i),p(i)}),t()(),n(29,"div",95)(30,"ion-label"),o(31,"Statutory / Other Deductions (\u20B9)"),t(),n(32,"ion-input",96),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.settlementForm.deductions,i)||(r.settlementForm.deductions=i),p(i)}),t()(),n(33,"div",98)(34,"ion-label"),o(35,"Remarks / Notes"),t(),n(36,"ion-textarea",99),P("ngModelChange",function(i){_(e);let r=d(3);return x(r.settlementForm.remarks,i)||(r.settlementForm.remarks=i),p(i)}),t()(),M(37,Yn,3,0,"div",100),t()()(),n(38,"ion-col",101)(39,"div",102)(40,"div",23),m(41,"ion-icon",103),n(42,"h2"),o(43,"Settlement Summary"),t()(),n(44,"div",104)(45,"div",105)(46,"span"),o(47,"Gross Additions:"),t(),n(48,"span",106),o(49),t()(),n(50,"div",105)(51,"span"),o(52,"Gross Deductions:"),t(),n(53,"span",107),o(54),t()(),n(55,"div",108)(56,"span"),o(57,"Net Payable Amount:"),t(),n(58,"span",109),o(59),t()(),n(60,"div",110)(61,"span"),o(62,"Settlement Status:"),t(),n(63,"span",111),o(64),t()()(),M(65,Jn,10,1,"div",112)(66,Qn,17,6,"div",113),t()()()()}if(c&2){let e=d(3);s(14),C("ngModel",e.settlementForm.pending_salary),s(4),C("ngModel",e.settlementForm.leave_encashment),s(4),C("ngModel",e.settlementForm.bonus),s(6),C("ngModel",e.settlementForm.recoveries),s(4),C("ngModel",e.settlementForm.deductions),s(4),C("ngModel",e.settlementForm.remarks),s(),g("ngIf",!e.settlement||e.settlement.status!=="Paid"),s(12),h("+ \u20B9",e.getGrossAdditions().toFixed(2)),s(5),h("- \u20B9",e.getGrossDeductions().toFixed(2)),s(5),h("\u20B9",e.getCalculatedNetPayable().toFixed(2)),s(4),W(e.settlement==null||e.settlement.status==null?null:e.settlement.status.toLowerCase()),s(),u((e.settlement==null?null:e.settlement.status)||"Pending"),s(),g("ngIf",e.settlement&&e.settlement.status==="Processed"),s(),g("ngIf",e.settlement&&e.settlement.status==="Paid")}}function Kn(c,l){if(c&1&&(n(0,"div",19),M(1,Un,7,0,"div",85)(2,Xn,67,15,"ion-grid",86),t()),c&2){let e=d(2);s(),g("ngIf",!e.allClearanceCompleted()),s(),g("ngIf",e.allClearanceCompleted())}}function Zn(c,l){if(c&1&&(n(0,"ion-content",11)(1,"div",12)(2,"div",13)(3,"div",14)(4,"div",15)(5,"h1"),o(6),t(),n(7,"p"),o(8),n(9,"strong"),o(10),t(),o(11),t()(),n(12,"div",16)(13,"span",17),o(14),t()()()(),M(15,jn,106,47,"div",18)(16,Gn,13,4,"div",18)(17,Kn,3,2,"div",18),t()()),c&2){let e=d();s(6),N("",e.resignation.FirstName," ",e.resignation.LastName),s(2),h("",e.resignation.designation_name," | "),s(2),u(e.resignation.department_name),s(),h(" (",e.resignation.EmployeeNumber,")"),s(2),W(e.resignation.status==null?null:e.resignation.status.toLowerCase().replace(" ","_")),s(),h(" ",e.resignation.status," "),s(),g("ngIf",e.selectedTab==="details"),s(),g("ngIf",e.selectedTab==="clearance"),s(),g("ngIf",e.selectedTab==="settlement")}}var Ge=(()=>{let l=class l{constructor(a,i,r,v,O,ue,Ue){this.route=a,this.router=i,this.separationService=r,this.routeGuardService=v,this.toastController=O,this.alertController=ue,this.loadingController=Ue,this.resignation=null,this.clearanceTasks=[],this.settlement=null,this.selectedTab="details",this.currentUserRole=null,this.currentUserEmployeeId=null,this.managerRemarks="",this.hrRemarks="",this.hrNoticeDays=null,this.hrLastWorkingDate="",this.settlementForm={pending_salary:0,leave_encashment:0,bonus:0,recoveries:0,deductions:0,remarks:""},this.paymentRef=""}ngOnInit(){this.resignationId=parseInt(this.route.snapshot.paramMap.get("id")||"0",10),this.currentUserRole=this.routeGuardService.userRole,this.currentUserEmployeeId=this.routeGuardService.employeeID?parseInt(this.routeGuardService.employeeID):null,this.resignationId&&this.loadAllData()}loadAllData(){this.loadResignationDetails(),this.loadClearanceTasks(),this.loadSettlement()}loadResignationDetails(){this.separationService.getResignationDetails(this.resignationId).subscribe({next:a=>{this.resignation=a,this.hrNoticeDays=a.hr_notice_period_days||a.notice_period_days,this.hrLastWorkingDate=a.hr_last_working_date||a.calculated_last_working_date},error:a=>{console.error("Error loading resignation details:",a),this.presentToast("Failed to load resignation details.","danger")}})}loadClearanceTasks(){this.separationService.getClearanceTasks(this.resignationId).subscribe({next:a=>{this.clearanceTasks=a},error:a=>{console.error("Error loading clearance tasks:",a)}})}loadSettlement(){this.separationService.getFFSettlement(this.resignationId).subscribe({next:a=>{this.settlement=a,a&&(this.settlementForm={pending_salary:a.pending_salary,leave_encashment:a.leave_encashment,bonus:a.bonus,recoveries:a.recoveries,deductions:a.deductions,remarks:a.remarks||""})},error:a=>{console.error("Error loading settlement details:",a)}})}submitManagerAction(a){return y(this,null,function*(){let i=yield this.loadingController.create({message:"Processing action...",spinner:"crescent"});yield i.present();let r={action:a,remarks:this.managerRemarks};this.separationService.actionResignation(this.resignationId,r).subscribe({next:()=>{i.dismiss(),this.presentToast(`Resignation successfully updated: ${a}`,"success"),this.managerRemarks="",this.loadAllData()},error:v=>{i.dismiss(),this.presentToast(v.error?.error||"Action failed.","danger")}})})}submitHRAction(a){return y(this,null,function*(){let i=yield this.loadingController.create({message:"Processing action...",spinner:"crescent"});yield i.present();let r={action:a,remarks:this.hrRemarks,hr_notice_period_days:this.hrNoticeDays,hr_last_working_date:this.hrLastWorkingDate};this.separationService.actionResignation(this.resignationId,r).subscribe({next:()=>{i.dismiss(),this.presentToast(`Resignation successfully updated: ${a}`,"success"),this.hrRemarks="",this.loadAllData()},error:v=>{i.dismiss(),this.presentToast(v.error?.error||"Action failed.","danger")}})})}toggleTaskStatus(a){return y(this,null,function*(){let r=a.status==="Completed"?"Pending":"Completed";yield(yield this.alertController.create({header:"Clearance Sign-Off",message:`Set task "${a.task_name}" status to ${r}?`,inputs:[{name:"remarks",type:"text",placeholder:"Enter remarks (optional)",value:a.remarks||""}],buttons:[{text:"Cancel",role:"cancel"},{text:"Confirm",handler:O=>{this.updateClearanceTask(a.id,r,O.remarks)}}]})).present()})}updateClearanceTask(a,i,r){let v={status:i,remarks:r};this.separationService.updateClearanceTask(this.resignationId,a,v).subscribe({next:()=>{this.presentToast("Clearance task updated.","success"),this.loadClearanceTasks(),this.loadSettlement()},error:O=>{this.presentToast(O.error?.error||"Failed to update clearance task.","danger")}})}getCalculatedNetPayable(){let a=this.settlementForm;return Number(a.pending_salary)+Number(a.leave_encashment)+Number(a.bonus)-(Number(a.recoveries)+Number(a.deductions))}saveSettlement(){return y(this,null,function*(){let a=yield this.loadingController.create({message:"Saving Full & Final calculations...",spinner:"crescent"});yield a.present(),this.separationService.processFFSettlement(this.resignationId,this.settlementForm).subscribe({next:()=>{a.dismiss(),this.presentToast("Settlement processed successfully.","success"),this.loadSettlement(),this.loadResignationDetails()},error:i=>{a.dismiss(),this.presentToast(i.error?.error||"Failed to save settlement.","danger")}})})}paySettlement(){return y(this,null,function*(){if(!this.paymentRef.trim()){this.presentToast("Please provide a payment reference number.","danger");return}yield(yield this.alertController.create({header:"Complete Relieving Formalities",message:"Confirming payment will finalize this exit. The employee status will be set to Relieved. Do you want to proceed?",buttons:[{text:"Cancel",role:"cancel"},{text:"Yes, Complete Exit",handler:()=>{this.executePayment()}}]})).present()})}executePayment(){let a={status:"Paid",payment_reference:this.paymentRef};this.separationService.updateSettlementStatus(this.resignationId,a).subscribe({next:()=>{this.presentToast("Full & Final Settlement Paid. Exit completed.","success"),this.paymentRef="",this.loadAllData()},error:i=>{this.presentToast(i.error?.error||"Payment signoff failed.","danger")}})}allClearanceCompleted(){return this.clearanceTasks.length===0?!1:this.clearanceTasks.every(a=>a.status==="Completed")}getTasksByDept(a){return this.clearanceTasks.filter(i=>i.department===a)}getDeptClearanceStatus(a){let i=this.getTasksByDept(a);return i.length===0?"Pending":i.every(r=>r.status==="Completed")?"Completed":"Pending"}showManagerActionCard(){return this.resignation?this.resignation.current_workflow_step==="Manager Review"&&(this.currentUserRole==="manager"||!!this.currentUserEmployeeId&&!!this.resignation.reporting_manager_id&&this.currentUserEmployeeId===this.resignation.reporting_manager_id):!1}showHrActionCard(){return this.resignation?this.resignation.current_workflow_step==="HR Approval"&&(this.currentUserRole==="hr"||this.currentUserRole==="admin"):!1}getCompletedClearanceCount(){return this.clearanceTasks?this.clearanceTasks.filter(a=>a.status==="Completed").length:0}getGrossAdditions(){let a=this.settlementForm;return Number(a.pending_salary||0)+Number(a.leave_encashment||0)+Number(a.bonus||0)}getGrossDeductions(){let a=this.settlementForm;return Number(a.recoveries||0)+Number(a.deductions||0)}presentToast(a,i){return y(this,null,function*(){(yield this.toastController.create({message:a,duration:2e3,color:i,position:"top"})).present()})}};l.\u0275fac=function(i){return new(i||l)(b(Se),b(ke),b(V),b(ge),b(F),b(de),b(D))},l.\u0275cmp=I({type:l,selectors:[["app-separation-details"]],standalone:!1,decls:8,vars:2,consts:[[1,"ion-no-border"],[1,"home-toolbar"],["slot","start"],["defaultHref","/administration/separation","text","Back to Dashboard"],["class","header-segment-toolbar",4,"ngIf"],["class","separation-details-content ion-padding",4,"ngIf"],[1,"header-segment-toolbar"],["mode","md",1,"profile-segment",3,"ngModelChange","ngModel"],["value","details"],["value","clearance",3,"disabled"],["value","settlement",3,"disabled"],[1,"separation-details-content","ion-padding"],[1,"workspace-wrapper","animate__animated","animate__fadeIn"],[1,"workspace-header-card"],[1,"emp-profile-row"],[1,"emp-info-block"],[1,"status-badge-block"],[1,"status-tag"],["class","tab-pane-content",4,"ngIf"],[1,"tab-pane-content"],[1,"ion-no-padding"],["size","12","size-lg","8",1,"ion-padding-end"],[1,"details-card"],[1,"card-title"],["name","person-outline"],[1,"info-grid"],[1,"info-item"],[1,"label"],[1,"value"],["name","document-text-outline"],[1,"info-grid","text-fields-grid"],[1,"value","highlight-reason"],[1,"value","highlight-lwd"],["class","info-item full-width",4,"ngIf"],["class","info-item",4,"ngIf"],["size","12","size-lg","4"],["class","details-card workflow-card",4,"ngIf"],[1,"details-card","workflow-card","static-workflow-card"],["name","checkmark-done-circle-outline"],[1,"timeline-trail"],[1,"trail-item","completed"],[1,"bullet"],[1,"trail-info"],[1,"trail-item"],[4,"ngIf"],["class","remarks",4,"ngIf"],[1,"info-item","full-width"],[1,"narrative-box"],[1,"value","highlighted-pref-lwd"],[1,"details-card","workflow-card"],["name","git-pull-request-outline"],[1,"workflow-actions-block"],[1,"subtitle"],[1,"form-group"],[1,"field-label"],["placeholder","Enter review remarks...","rows","3",1,"custom-textarea",3,"ngModelChange","ngModel"],[1,"workflow-btn-group"],["color","warning","expand","block","fill","outline",3,"click"],["color","success","expand","block",3,"click"],["name","shield-checkmark-outline"],["type","number",1,"form-input",3,"ngModelChange","ngModel"],["type","date",1,"form-input",3,"ngModelChange","ngModel"],["placeholder","Enter HR comments...","rows","3",1,"custom-textarea",3,"ngModelChange","ngModel"],[1,"workflow-btn-group",2,"display","flex","flex-direction","column","gap","8px"],["color","success","expand","block",2,"margin","0",3,"click"],[2,"display","flex","gap","8px","width","100%"],["color","warning","expand","block","fill","outline",2,"flex","1","margin","0",3,"click"],["color","danger","expand","block","fill","outline",2,"flex","1","margin","0",3,"click"],[2,"color","var(--ion-color-warning, #e0ac08)","font-size","13px","font-weight","500","margin-bottom","15px","display","flex","align-items","center","gap","5px"],["name","alert-circle-outline",2,"font-size","16px"],[1,"remarks"],[1,"details-card","clearance-card"],[1,"card-header-row"],["name","checkbox-outline"],[1,"progress-indicator"],[1,"clearance-sections"],["class","clearance-dept-group",4,"ngFor","ngForOf"],[1,"clearance-dept-group"],[1,"dept-header-row"],[1,"dept-status-tag"],[1,"tasks-table-wrapper"],[1,"clearance-tasks-table"],["class","clickable-task-row",3,"dblclick",4,"ngFor","ngForOf"],[1,"clickable-task-row",3,"dblclick"],[1,"task-status-tag"],["class","warning-banner",4,"ngIf"],["class","ion-no-padding",4,"ngIf"],[1,"warning-banner"],["name","alert-circle"],[1,"banner-text"],["size","12","size-lg","7",1,"ion-padding-end"],[1,"details-card","settlement-card"],["name","calculator-outline"],[1,"settlement-form"],[1,"form-sub-header"],[1,"form-row-group"],["type","number",1,"calc-input",3,"ngModelChange","ngModel"],[1,"form-sub-header","deductions-header"],[1,"form-row-group","full-width"],["placeholder","Enter settlement references or calculations...","rows","2",1,"custom-textarea",3,"ngModelChange","ngModel"],["class","settlement-actions-row",4,"ngIf"],["size","12","size-lg","5"],[1,"details-card","settlement-summary-card"],["name","receipt-outline"],[1,"settlement-breakdown"],[1,"breakdown-row"],[1,"addition"],[1,"deduction"],[1,"breakdown-row","total-row"],[1,"total-payable"],[1,"breakdown-row","status-row"],[1,"status-tag-text"],["class","payment-trigger-form",4,"ngIf"],["class","payment-completed-block",4,"ngIf"],[1,"settlement-actions-row"],["color","primary",3,"click"],[1,"payment-trigger-form"],["placeholder","UTN / IMPS / CHQ Reference",1,"form-input",3,"ngModelChange","ngModel"],["color","success","expand","block",1,"complete-btn",3,"click"],["name","wallet-outline","slot","start"],[1,"payment-completed-block"],["name","checkmark-done-circle",1,"paid-icon"]],template:function(i,r){i&1&&(n(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),m(3,"ion-back-button",3),t(),n(4,"ion-title"),o(5,"Resignation Workspace"),t()(),M(6,wn,11,5,"ion-toolbar",4),t(),M(7,Zn,18,11,"ion-content",5)),i&2&&(s(6),g("ngIf",r.resignation&&r.currentUserRole!=="manager"),s(),g("ngIf",r.resignation))},dependencies:[A,z,R,T,X,K,Z,$,ee,ne,j,te,ie,oe,ae,re,se,ce,le,Y,J,Q,ze,G],styles:[`

.separation-details-content[_ngcontent-%COMP%] {
  --background: #f3f4f6;
  font-family: "Inter", sans-serif;
}
.separation-details-content[_ngcontent-%COMP%]   .workspace-wrapper[_ngcontent-%COMP%] {
  max-width: 1200px;
  margin: 0 auto;
}
.separation-details-content[_ngcontent-%COMP%]   .workspace-header-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.separation-details-content[_ngcontent-%COMP%]   .workspace-header-card[_ngcontent-%COMP%]   .emp-profile-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.separation-details-content[_ngcontent-%COMP%]   .workspace-header-card[_ngcontent-%COMP%]   .emp-profile-row[_ngcontent-%COMP%]   .emp-info-block[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.separation-details-content[_ngcontent-%COMP%]   .workspace-header-card[_ngcontent-%COMP%]   .emp-profile-row[_ngcontent-%COMP%]   .emp-info-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 6px 0 0 0;
  font-size: 0.9rem;
  color: #4b5563;
}
.separation-details-content[_ngcontent-%COMP%]   .workspace-header-card[_ngcontent-%COMP%]   .emp-profile-row[_ngcontent-%COMP%]   .emp-info-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1f2937;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 24px;
  overflow: hidden;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 12px;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.3rem;
  color: #ef4444;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 0.78rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: 0.92rem;
  font-weight: 500;
  color: #1f2937;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .highlight-reason[_ngcontent-%COMP%] {
  color: #ef4444;
  font-weight: 600;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .highlight-lwd[_ngcontent-%COMP%] {
  color: #ef4444;
  font-weight: 700;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .narrative-box[_ngcontent-%COMP%] {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.88rem;
  line-height: 1.4;
  color: #374151;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .narrative-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.separation-details-content[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {
  grid-column: span 2;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%] {
  border-left: 4px solid #ef4444;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {
  font-size: 0.88rem;
  color: #4b5563;
  margin-bottom: 15px;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  --min-height: 40px;
  --padding-start: 12px;
  font-size: 0.88rem;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .custom-textarea[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.88rem;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .workflow-btn-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
.separation-details-content[_ngcontent-%COMP%]   .workflow-card[_ngcontent-%COMP%]   .workflow-actions-block[_ngcontent-%COMP%]   .workflow-btn-group[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 600;
  margin: 0;
  font-size: 0.9rem;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%] {
  position: relative;
  padding-left: 20px;
  margin-left: 5px;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 5px;
  bottom: 5px;
  width: 2px;
  background: #e5e7eb;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item[_ngcontent-%COMP%] {
  position: relative;
  margin-bottom: 20px;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item[_ngcontent-%COMP%]   .bullet[_ngcontent-%COMP%] {
  position: absolute;
  left: -20px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item[_ngcontent-%COMP%]   .trail-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 2px 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: #9ca3af;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item[_ngcontent-%COMP%]   .trail-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.78rem;
  color: #9ca3af;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item[_ngcontent-%COMP%]   .trail-info[_ngcontent-%COMP%]   .remarks[_ngcontent-%COMP%] {
  margin-top: 4px;
  font-style: italic;
  color: #6b7280;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item.completed[_ngcontent-%COMP%]   .bullet[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #059669;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item.completed[_ngcontent-%COMP%]   .trail-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  color: #111827;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item.completed[_ngcontent-%COMP%]   .trail-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #4b5563;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item.active[_ngcontent-%COMP%]   .bullet[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #2563eb;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item.active[_ngcontent-%COMP%]   .trail-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  color: #111827;
  font-weight: 700;
}
.separation-details-content[_ngcontent-%COMP%]   .timeline-trail[_ngcontent-%COMP%]   .trail-item[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 12px;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .progress-indicator[_ngcontent-%COMP%] {
  font-size: 0.85rem;
  color: #4b5563;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%] {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .dept-header-row[_ngcontent-%COMP%] {
  background: #f9fafb;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .dept-header-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: #1f2937;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .dept-header-row[_ngcontent-%COMP%]   .dept-status-tag[_ngcontent-%COMP%] {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  background: #fee2e2;
  color: #b91c1c;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .dept-header-row[_ngcontent-%COMP%]   .dept-status-tag.completed[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #065f46;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .tasks-table-wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 10px 16px;
  font-size: 0.82rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   .clickable-task-row[_ngcontent-%COMP%] {
  cursor: pointer;
  transition: background 0.15s ease;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   .clickable-task-row[_ngcontent-%COMP%]:hover {
  background-color: #f9fafb;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   .task-status-tag[_ngcontent-%COMP%] {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 9999px;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   .task-status-tag.pending[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   .task-status-tag.in_progress[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #b45309;
}
.separation-details-content[_ngcontent-%COMP%]   .clearance-card[_ngcontent-%COMP%]   .clearance-sections[_ngcontent-%COMP%]   .clearance-dept-group[_ngcontent-%COMP%]   .clearance-tasks-table[_ngcontent-%COMP%]   .task-status-tag.completed[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #065f46;
}
.separation-details-content[_ngcontent-%COMP%]   .warning-banner[_ngcontent-%COMP%] {
  display: flex;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-left: 4px solid #d97706;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  align-items: center;
}
.separation-details-content[_ngcontent-%COMP%]   .warning-banner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 2rem;
  color: #d97706;
  margin-right: 14px;
}
.separation-details-content[_ngcontent-%COMP%]   .warning-banner[_ngcontent-%COMP%]   .banner-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #92400e;
}
.separation-details-content[_ngcontent-%COMP%]   .warning-banner[_ngcontent-%COMP%]   .banner-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 4px 0 0 0;
  font-size: 0.82rem;
  color: #b45309;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-sub-header[_ngcontent-%COMP%] {
  font-size: 0.85rem;
  font-weight: 700;
  color: #059669;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 4px;
  margin-top: 8px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .deductions-header[_ngcontent-%COMP%] {
  color: #ef4444;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-row-group[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-row-group[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
  flex: 1;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-row-group[_ngcontent-%COMP%]   .calc-input[_ngcontent-%COMP%] {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  --min-height: 38px;
  --padding-start: 10px;
  max-width: 180px;
  font-size: 0.88rem;
  text-align: right;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-row-group.full-width[_ngcontent-%COMP%] {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-row-group.full-width[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  width: 100%;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .form-row-group.full-width[_ngcontent-%COMP%]   .custom-textarea[_ngcontent-%COMP%] {
  width: 100%;
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.85rem;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .settlement-actions-row[_ngcontent-%COMP%] {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-card[_ngcontent-%COMP%]   .settlement-form[_ngcontent-%COMP%]   .settlement-actions-row[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 600;
  margin: 0;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%] {
  border-top: 4px solid #059669;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: #4b5563;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row[_ngcontent-%COMP%]   .addition[_ngcontent-%COMP%] {
  color: #059669;
  font-weight: 600;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row[_ngcontent-%COMP%]   .deduction[_ngcontent-%COMP%] {
  color: #ef4444;
  font-weight: 600;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.total-row[_ngcontent-%COMP%] {
  border-top: 1px solid #d1d5db;
  padding-top: 12px;
  margin-top: 6px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.total-row[_ngcontent-%COMP%]   .total-payable[_ngcontent-%COMP%] {
  color: #059669;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.status-row[_ngcontent-%COMP%] {
  font-size: 0.82rem;
  font-weight: 600;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.status-row[_ngcontent-%COMP%]   .status-tag-text[_ngcontent-%COMP%] {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.status-row[_ngcontent-%COMP%]   .status-tag-text.pending[_ngcontent-%COMP%] {
  color: #b45309;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.status-row[_ngcontent-%COMP%]   .status-tag-text.processed[_ngcontent-%COMP%] {
  color: #2563eb;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .settlement-breakdown[_ngcontent-%COMP%]   .breakdown-row.status-row[_ngcontent-%COMP%]   .status-tag-text.paid[_ngcontent-%COMP%] {
  color: #059669;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-trigger-form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 12px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-trigger-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  margin-bottom: 14px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-trigger-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-trigger-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  --background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  --min-height: 38px;
  --padding-start: 10px;
  font-size: 0.88rem;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-trigger-form[_ngcontent-%COMP%]   .complete-btn[_ngcontent-%COMP%] {
  --background: #059669;
  --background-hover: #047857;
  --border-radius: 8px;
  font-weight: 700;
  margin: 0;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-completed-block[_ngcontent-%COMP%] {
  text-align: center;
  padding: 15px 10px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-completed-block[_ngcontent-%COMP%]   .paid-icon[_ngcontent-%COMP%] {
  font-size: 3rem;
  color: #059669;
  margin-bottom: 10px;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-completed-block[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #059669;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-completed-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 4px 0;
  font-size: 0.85rem;
  color: #4b5563;
}
.separation-details-content[_ngcontent-%COMP%]   .settlement-summary-card[_ngcontent-%COMP%]   .payment-completed-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #111827;
}
.separation-details-content[_ngcontent-%COMP%]   .status-tag[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.separation-details-content[_ngcontent-%COMP%]   .status-tag.submitted[_ngcontent-%COMP%], 
.separation-details-content[_ngcontent-%COMP%]   .status-tag.manager_review[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #d97706;
}
.separation-details-content[_ngcontent-%COMP%]   .status-tag.hr_review[_ngcontent-%COMP%] {
  background: #ede9fe;
  color: #6d28d9;
}
.separation-details-content[_ngcontent-%COMP%]   .status-tag.exit_clearance[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #1d4ed8;
}
.separation-details-content[_ngcontent-%COMP%]   .status-tag.relieved[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #047857;
}
.separation-details-content[_ngcontent-%COMP%]   .status-tag.rejected[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
}`]});let c=l;return c})();var $n=[{path:"",component:qe},{path:"details/:id",component:Ge}],bt=(()=>{let l=class l{};l.\u0275fac=function(i){return new(i||l)},l.\u0275mod=ve({type:l}),l.\u0275inj=be({imports:[L,B,Te,q,Ie.forChild($n),_e,me,fe]});let c=l;return c})();export{bt as SeparationPageModule};
