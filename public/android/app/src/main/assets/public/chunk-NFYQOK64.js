import{a as _e,b as xe}from"./chunk-X33SV3PD.js";import{a as K}from"./chunk-GKMRXCVX.js";import{a as Qe}from"./chunk-C76DRQJT.js";import{a as fe}from"./chunk-NDCRD3QG.js";import{$ as ze,A as re,B as G,Ca as ge,Da as ue,Ea as Ye,F as ae,Fa as Z,Ga as M,H as F,I as le,Q as U,R as ce,V as q,W as se,X as E,Y as H,Z as pe,_ as J,ba as je,c as V,d as L,da as We,e as te,ea as Le,f as Ne,g as ie,h as oe,ha as Y,j as Re,ja as Ge,ka as Ue,la as qe,m as Ve,ma as He,qa as Q,ra as me,t as Ae,ta as de,u as D,v as B,za as Je}from"./chunk-B3PLR2IL.js";import{$a as z,A as $,Ba as h,Ca as x,Da as m,Eb as P,F as Ie,K as f,L as _,Oa as r,Pa as u,Qa as I,Ra as Te,Ta as S,U as A,Ua as T,Va as k,Z as Me,Zb as Be,_ as c,bb as j,ca as C,d as we,ea as v,fa as Se,hb as ke,ja as g,qb as ne,ra as p,rb as w,sa as i,sb as De,ta as t,tb as Fe,ua as d,ya as Ee,yb as W,za as Oe}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as O}from"./chunk-JHI3MBHO.js";function tn(n,l){n&1&&(i(0,"div",28),r(1," Discussion summary is required. "),t())}function on(n,l){if(n&1&&(i(0,"div",11)(1,"ion-label",12),r(2,"Discussion Summary *"),t(),d(3,"ion-textarea",27),g(4,tn,2,0,"div",21),t()),n&2){let e,a=m();c(4),p("ngIf",((e=a.resignationForm.get("discussion_summary"))==null?null:e.touched)&&((e=a.resignationForm.get("discussion_summary"))==null?null:e.invalid))}}function rn(n,l){if(n&1&&(i(0,"ion-select-option",29),r(1),t()),n&2){let e=l.$implicit;p("value",e),c(),u(e)}}function an(n,l){n&1&&(i(0,"div",28),r(1," Please select a reason. "),t())}function ln(n,l){n&1&&(i(0,"div",28),r(1," Preferred last working date is required. "),t())}function cn(n,l){n&1&&(i(0,"div",28),r(1," Reason for early relieving is required. "),t())}function sn(n,l){if(n&1&&(Ee(0),i(1,"div",11)(2,"ion-label",12),r(3,"Preferred Last Working Date *"),t(),i(4,"ion-item",31),d(5,"ion-input",32),t(),g(6,ln,2,0,"div",21),t(),i(7,"div",11)(8,"ion-label",12),r(9,"Reason for Early Relieving *"),t(),d(10,"ion-textarea",33),g(11,cn,2,0,"div",21),t(),Oe()),n&2){let e,a,o=m(2);c(5),p("min",o.minPreferredDate),c(),p("ngIf",((e=o.resignationForm.get("preferred_last_working_date"))==null?null:e.touched)&&((e=o.resignationForm.get("preferred_last_working_date"))==null?null:e.invalid)),c(5),p("ngIf",((a=o.resignationForm.get("reason_for_early_relieving"))==null?null:a.touched)&&((a=o.resignationForm.get("reason_for_early_relieving"))==null?null:a.invalid))}}function pn(n,l){if(n&1&&(Ee(0),i(1,"div",11)(2,"ion-label",12),r(3,"Do you request Early Relieving? *"),t(),i(4,"ion-radio-group",30)(5,"ion-item",14)(6,"ion-radio",15),r(7,"Yes"),t()(),i(8,"ion-item",14)(9,"ion-radio",16),r(10,"No"),t()()()(),g(11,sn,12,3,"ng-container",22),Oe()),n&2){let e,a=m();c(11),p("ngIf",((e=a.resignationForm.get("early_relieving_request"))==null?null:e.value)==="Yes")}}var be=(()=>{let l=class l{constructor(a,o,s,b,y,R){this.fb=a,this.modalController=o,this.separationService=s,this.toastController=b,this.loadingController=y,this.adminService=R,this.noticePeriodDays=30,this.calculatedLastWorkingDate=new Date,this.minPreferredDate="",this.resSettings=null,this.weekOffDays=[0,6],this.reasons=["Career Growth","Better Opportunity","Higher Studies","Relocation","Personal Reasons","Health Reasons","Work Environment","Compensation","Family Commitments","Other"]}ngOnInit(){this.initForm(),this.setupMinDate(),this.loadNoticePeriod(),this.loadReasons(),this.loadResSettings(),this.loadWeeklyOffPolicy()}loadReasons(){this.separationService.getActiveResignationReasons().subscribe({next:a=>{a&&a.length>0&&(this.reasons=a.map(o=>o.reason))},error:a=>{console.error("Error fetching resignation reasons:",a)}})}loadResSettings(){this.separationService.getResignationSettings().subscribe({next:a=>{this.resSettings=a},error:a=>{console.error("Error fetching resignation settings:",a)}})}initForm(){this.resignationForm=this.fb.group({discussed_with_manager:["No",V.required],discussion_summary:[""],reason:["",V.required],early_relieving_request:["No",V.required],preferred_last_working_date:[""],reason_for_early_relieving:[""],additional_comments:[""]}),this.resignationForm.get("discussed_with_manager")?.valueChanges.subscribe(a=>{let o=this.resignationForm.get("discussion_summary");a==="Yes"?o?.setValidators([V.required]):(o?.clearValidators(),o?.setValue("")),o?.updateValueAndValidity()}),this.resignationForm.get("early_relieving_request")?.valueChanges.subscribe(a=>{let o=this.resignationForm.get("preferred_last_working_date"),s=this.resignationForm.get("reason_for_early_relieving");a==="Yes"?(o?.setValidators([V.required]),s?.setValidators([V.required])):(o?.clearValidators(),o?.setValue(""),s?.clearValidators(),s?.setValue("")),o?.updateValueAndValidity(),s?.updateValueAndValidity()}),this.resignationForm.get("preferred_last_working_date")?.valueChanges.subscribe(a=>{if(a&&(this.resSettings?.notallowholiday_weekend??!0)){let s=new Date(a).getDay();this.weekOffDays.includes(s)&&(this.presentToast("We can't select last working day on weekends","danger"),setTimeout(()=>{this.resignationForm.get("preferred_last_working_date")?.setValue(null,{emitEvent:!1})}))}})}loadWeeklyOffPolicy(){this.adminService.getWeeklyOffPolicies().subscribe(a=>{let o=this.currentEmployee?.weekly_off_policy_id;if(o&&a&&a.length>0){let s=a.find(b=>b.id===o);s&&(this.weekOffDays=[],Number(s.sunday_off)===1&&this.weekOffDays.push(0),Number(s.monday_off)===1&&this.weekOffDays.push(1),Number(s.tuesday_off)===1&&this.weekOffDays.push(2),Number(s.wednesday_off)===1&&this.weekOffDays.push(3),Number(s.thursday_off)===1&&this.weekOffDays.push(4),Number(s.friday_off)===1&&this.weekOffDays.push(5),Number(s.saturday_off)===1&&this.weekOffDays.push(6))}})}setupMinDate(){let a=new Date;a.setDate(a.getDate()+1),this.minPreferredDate=a.toISOString().split("T")[0]}loadNoticePeriod(){this.currentEmployee?.DepartmentId?this.separationService.getNoticePeriods().subscribe({next:a=>{let o=a.find(s=>s.department_id===this.currentEmployee.DepartmentId);o&&(this.noticePeriodDays=o.notice_period_days),this.calculateLastWorkingDate()},error:a=>{console.error("Error fetching notice periods:",a),this.calculateLastWorkingDate()}}):this.calculateLastWorkingDate()}calculateLastWorkingDate(){let a=new Date;a.setDate(a.getDate()+this.noticePeriodDays),this.calculatedLastWorkingDate=a}onSubmit(){return O(this,null,function*(){if(this.resignationForm.invalid){this.presentToast("Please check all required fields.","danger");return}let a=yield this.loadingController.create({message:"Submitting resignation request...",spinner:"crescent"});yield a.present();let o={discussed_with_manager:this.resignationForm.value.discussed_with_manager,discussion_summary:this.resignationForm.value.discussion_summary,reason:this.resignationForm.value.reason,early_relieving_request:this.resignationForm.value.early_relieving_request,preferred_last_working_date:this.resignationForm.value.preferred_last_working_date,additional_comments:this.resignationForm.value.additional_comments};this.separationService.applyResignation(o).subscribe({next:s=>{a.dismiss(),this.presentToast("Resignation submitted successfully.","success"),this.modalController.dismiss({submitted:!0})},error:s=>{a.dismiss(),this.presentToast(s.error?.error||"Failed to submit resignation request.","danger")}})})}dismiss(){this.modalController.dismiss()}presentToast(a,o){return O(this,null,function*(){(yield this.toastController.create({message:a,duration:2e3,color:o,position:"top"})).present()})}};l.\u0275fac=function(o){return new(o||l)(C(Ae),C(ue),C(_e),C(Z),C(ge),C(Qe))},l.\u0275cmp=v({type:l,selectors:[["app-resignation-form"]],inputs:{currentEmployee:"currentEmployee"},decls:53,vars:11,consts:[[1,"ion-no-border"],[1,"modal-toolbar"],["slot","end"],[3,"click"],["name","close-outline","slot","icon-only"],[1,"ion-padding","resignation-modal-content"],[3,"ngSubmit","formGroup"],[1,"info-banner","animate__animated","animate__fadeIn"],[1,"info-banner-icon"],["name","information-circle-outline"],[1,"info-banner-text"],[1,"form-section"],[1,"field-label"],["formControlName","discussed_with_manager","mode","md",1,"radio-row"],["lines","none",1,"radio-item"],["value","Yes","labelPlacement","end"],["value","No","labelPlacement","end"],["class","form-section",4,"ngIf"],["lines","none",1,"select-item"],["formControlName","reason","placeholder","Select a reason","interface","popover",1,"custom-select"],[3,"value",4,"ngFor","ngForOf"],["class","error-msg",4,"ngIf"],[4,"ngIf"],["formControlName","additional_comments","placeholder","Any additional feedback or information (optional)...","rows","3",1,"custom-textarea"],[1,"form-actions"],["type","button","fill","clear","color","medium",1,"cancel-btn",3,"click"],["type","submit",1,"submit-btn",3,"disabled"],["formControlName","discussion_summary","placeholder","Briefly summarize your discussion with your manager...","rows","3",1,"custom-textarea"],[1,"error-msg"],[3,"value"],["formControlName","early_relieving_request","mode","md",1,"radio-row"],["lines","none",1,"input-item"],["type","date","formControlName","preferred_last_working_date",1,"custom-date-input",3,"min"],["formControlName","reason_for_early_relieving","placeholder","State your reasons for requesting an early exit...","rows","3",1,"custom-textarea"]],template:function(o,s){if(o&1&&(i(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),r(3,"Apply Resignation"),t(),i(4,"ion-buttons",2)(5,"ion-button",3),x("click",function(){return s.dismiss()}),d(6,"ion-icon",4),t()()()(),i(7,"ion-content",5)(8,"form",6),x("ngSubmit",function(){return s.onSubmit()}),i(9,"div",7)(10,"div",8),d(11,"ion-icon",9),t(),i(12,"div",10)(13,"h3"),r(14,"Notice Period Information"),t(),i(15,"p"),r(16,"Notice Period: "),i(17,"strong"),r(18),t(),r(19," (based on your department)"),t(),i(20,"p"),r(21,"Calculated Last Working Date: "),i(22,"strong"),r(23),z(24,"date"),t()()()(),i(25,"div",11)(26,"ion-label",12),r(27,"Have you discussed your resignation with your manager? *"),t(),i(28,"ion-radio-group",13)(29,"ion-item",14)(30,"ion-radio",15),r(31,"Yes"),t()(),i(32,"ion-item",14)(33,"ion-radio",16),r(34,"No"),t()()()(),g(35,on,5,1,"div",17),i(36,"div",11)(37,"ion-label",12),r(38,"Reason for Resignation *"),t(),i(39,"ion-item",18)(40,"ion-select",19),g(41,rn,2,2,"ion-select-option",20),t()(),g(42,an,2,0,"div",21),t(),g(43,pn,12,1,"ng-container",22),i(44,"div",11)(45,"ion-label",12),r(46,"Additional Comments"),t(),d(47,"ion-textarea",23),t(),i(48,"div",24)(49,"ion-button",25),x("click",function(){return s.dismiss()}),r(50,"Cancel"),t(),i(51,"ion-button",26),r(52,"Submit Resignation"),t()()()()),o&2){let b,y;c(8),p("formGroup",s.resignationForm),c(10),I("",s.noticePeriodDays," Days"),c(5),u(j(24,8,s.calculatedLastWorkingDate,"fullDate")),c(12),p("ngIf",((b=s.resignationForm.get("discussed_with_manager"))==null?null:b.value)==="Yes"),c(6),p("ngForOf",s.reasons),c(),p("ngIf",((y=s.resignationForm.get("reason"))==null?null:y.touched)&&((y=s.resignationForm.get("reason"))==null?null:y.invalid)),c(),p("ngIf",(s.resSettings==null?null:s.resSettings.allow_early_lwd)!==!1),c(8),p("disabled",s.resignationForm.invalid)}},dependencies:[P,ne,w,M,F,le,ce,se,E,H,pe,J,We,Le,qe,He,Q,me,de,re,G,D,oe,L,te,B,Re,Ve,W],styles:[`

.modal-toolbar[_ngcontent-%COMP%] {
  --background:
    linear-gradient(
      135deg,
      #1f2937,
      #111827);
  --color: #ffffff;
  --border-color: transparent;
}
.modal-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.modal-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.resignation-modal-content[_ngcontent-%COMP%] {
  --background: #f9fafb;
  font-family: "Inter", sans-serif;
}
.resignation-modal-content[_ngcontent-%COMP%]   .info-banner[_ngcontent-%COMP%] {
  display: flex;
  background:
    linear-gradient(
      135deg,
      rgba(239, 68, 68, 0.05),
      rgba(239, 68, 68, 0.02));
  border: 1px dashed rgba(239, 68, 68, 0.2);
  border-left: 4px solid #ef4444;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.resignation-modal-content[_ngcontent-%COMP%]   .info-banner[_ngcontent-%COMP%]   .info-banner-icon[_ngcontent-%COMP%] {
  font-size: 1.6rem;
  color: #ef4444;
  margin-right: 12px;
  display: flex;
  align-items: center;
}
.resignation-modal-content[_ngcontent-%COMP%]   .info-banner[_ngcontent-%COMP%]   .info-banner-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 4px 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}
.resignation-modal-content[_ngcontent-%COMP%]   .info-banner[_ngcontent-%COMP%]   .info-banner-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 2px 0;
  font-size: 0.85rem;
  color: #4b5563;
}
.resignation-modal-content[_ngcontent-%COMP%]   .info-banner[_ngcontent-%COMP%]   .info-banner-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #111827;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%] {
  margin-bottom: 18px;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .radio-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .radio-row[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-radius: 8px;
  border: 1px solid #e5e7eb;
  --padding-start: 12px;
  --min-height: 44px;
  flex: 1;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .radio-row[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%]   ion-radio[_ngcontent-%COMP%] {
  --color: #d1d5db;
  --color-checked: #ef4444;
  font-size: 0.9rem;
  font-weight: 500;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .custom-textarea[_ngcontent-%COMP%], 
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .custom-date-input[_ngcontent-%COMP%] {
  --background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.9rem;
  color: #1f2937;
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .custom-textarea[_ngcontent-%COMP%]:focus-within, 
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .custom-date-input[_ngcontent-%COMP%]:focus-within {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%], 
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .input-item[_ngcontent-%COMP%] {
  --background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  --min-height: 46px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%], 
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .input-item[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%] {
  width: 100%;
  --padding-start: 12px;
  font-size: 0.9rem;
  color: #1f2937;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%]   .custom-date-input[_ngcontent-%COMP%], 
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .input-item[_ngcontent-%COMP%]   .custom-date-input[_ngcontent-%COMP%] {
  border: none;
  box-shadow: none;
  padding: 0;
  --padding-start: 12px;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .error-msg[_ngcontent-%COMP%] {
  font-size: 0.78rem;
  color: #ef4444;
  margin-top: 4px;
  font-weight: 500;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #f3f4f6;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {
  --color: #4b5563;
  font-weight: 500;
  font-size: 0.9rem;
}
.resignation-modal-content[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%] {
  --background: #ef4444;
  --background-hover: #dc2626;
  --background-activated: #b91c1c;
  --color: #ffffff;
  --border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);
}`]});let n=l;return n})();function mn(n,l){if(n&1&&(i(0,"ion-item",6)(1,"ion-avatar",7),d(2,"img",8),t(),i(3,"ion-label")(4,"h2"),r(5),t(),i(6,"p"),r(7),t()(),i(8,"ion-button",9),d(9,"ion-icon",10),t()()),n&2){let e=l.$implicit;c(5),u(e.full_name||e.FirstName+" "+e.LastName),c(2),u(e.job_title||e.designation_name)}}function dn(n,l){if(n&1&&(i(0,"div",1)(1,"div",2),r(2," Reporting Team "),i(3,"span",3),r(4),t()(),i(5,"ion-list",4),g(6,mn,10,2,"ion-item",5),t()()),n&2){let e=m();c(4),I("(",e.teamCount,")"),c(2),p("ngForOf",e.team)}}var Xe=(()=>{let l=class l{constructor(a){this.employeeService=a,this.team=[],this.teamCount=0}ngOnInit(){this.currentEmployee?.employee_id&&this.loadReportingTeam(this.currentEmployee.employee_id)}loadReportingTeam(a){this.employeeService.getReportingEmployees(a).subscribe({next:o=>{this.team=Array.isArray(o)?o:o.data||[],this.teamCount=this.team.length},error:o=>console.error("Error loading reporting team:",o)})}};l.\u0275fac=function(o){return new(o||l)(C(K))},l.\u0275cmp=v({type:l,selectors:[["app-reporting-team"]],inputs:{currentEmployee:"currentEmployee"},decls:1,vars:1,consts:[["class","reporting-team-card",4,"ngIf"],[1,"reporting-team-card"],[1,"team-header"],[1,"team-count"],["lines","none",1,"team-list"],["class","team-member-item",4,"ngFor","ngForOf"],[1,"team-member-item"],["slot","start"],["src","assets/user.svg"],["fill","clear","slot","end","color","medium"],["name","ellipsis-vertical-outline","slot","icon-only"]],template:function(o,s){o&1&&g(0,dn,7,2,"div",0),o&2&&p("ngIf",s.team&&s.team.length>0)},dependencies:[P,ne,w,M,ae,F,E,pe,J,ze],styles:[`

.reporting-team-card[_ngcontent-%COMP%] {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1.25px solid #E4E4E7;
  margin-top: 10px;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-header[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: #3f51b5;
  margin-bottom: 16px;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-header[_ngcontent-%COMP%]   .team-count[_ngcontent-%COMP%] {
  color: #71717a;
  font-weight: 400;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-list[_ngcontent-%COMP%] {
  max-height: 400px;
  overflow-y: auto;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-member-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --inner-padding-end: 0;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-member-item[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-member-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 500;
  color: #18191c;
  margin: 0;
}
.reporting-team-card[_ngcontent-%COMP%]   .team-member-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #71717a;
  margin: 2px 0 0 0;
}`]});let n=l;return n})();function gn(n,l){n&1&&(i(0,"div",23),d(1,"ion-textarea",24),t())}function un(n,l){if(n&1&&(i(0,"p",25),r(1),t()),n&2){let e=m(2);c(),I(" ",(e.currentEmployee==null?null:e.currentEmployee.personal_summary)||"Experienced professional with a passion for excellence and a track record of success in corporate environments."," ")}}function fn(n,l){if(n&1&&(i(0,"span",19),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.business_unit_name)||"-")}}function _n(n,l){if(n&1&&d(0,"ion-input",26),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.business_unit_name)}}function xn(n,l){if(n&1&&(i(0,"span",19),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.department_name)||"-")}}function bn(n,l){if(n&1&&d(0,"ion-input",26),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.department_name)}}function Cn(n,l){if(n&1&&(i(0,"div",27)(1,"ion-avatar",28),d(2,"img",29),t(),i(3,"span",19),r(4),t()()),n&2){let e=m(2);c(4),Te("",e.currentEmployee==null?null:e.currentEmployee.manager_first_name," ",e.currentEmployee==null?null:e.currentEmployee.manager_last_name)}}function yn(n,l){if(n&1&&d(0,"ion-input",26),n&2){let e=m(2);p("value",(e.currentEmployee==null?null:e.currentEmployee.manager_first_name)+" "+(e.currentEmployee==null?null:e.currentEmployee.manager_last_name))}}function hn(n,l){if(n&1){let e=h();i(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),r(4," Personal Summary "),i(5,"ion-button",5),x("click",function(){f(e);let o=m();return _(o.isEditSummary())}),d(6,"ion-icon",6),t()(),i(7,"div",7),g(8,gn,2,0,"div",8)(9,un,2,1,"p",9),t()(),i(10,"div",3)(11,"div",4),r(12," Organizational Details "),i(13,"ion-button",5),x("click",function(){f(e);let o=m();return _(o.isEditOrg())}),d(14,"ion-icon",6),t()(),i(15,"div",7)(16,"div",10)(17,"div",11)(18,"span",12),r(19,"Business Unit"),t(),g(20,fn,2,1,"span",13)(21,_n,1,1,"ion-input",14),t(),i(22,"div",15)(23,"span",12),r(24,"Department"),t(),g(25,xn,2,1,"span",13)(26,bn,1,1,"ion-input",14),t(),i(27,"div",11)(28,"span",12),r(29,"Reporting Manager"),t(),g(30,Cn,5,2,"div",16)(31,yn,1,1,"ion-input",14),t()()()()(),i(32,"div",2)(33,"div",3)(34,"div",4),r(35,"Primary Details"),t(),i(36,"div",7)(37,"ion-grid",17)(38,"ion-row")(39,"ion-col",18)(40,"span",12),r(41,"Employee ID"),t(),i(42,"span",19),r(43),t()(),i(44,"ion-col",18)(45,"span",12),r(46,"Date of Birth"),t(),i(47,"span",19),r(48),z(49,"date"),t()(),i(50,"ion-col",18)(51,"span",12),r(52,"Gender"),t(),i(53,"span",19),r(54),t()()(),i(55,"ion-row",20)(56,"ion-col",18)(57,"span",12),r(58,"Nationality"),t(),i(59,"span",19),r(60),t()(),i(61,"ion-col",18)(62,"span",12),r(63,"Marital Status"),t(),i(64,"span",19),r(65),t()(),i(66,"ion-col",18)(67,"span",12),r(68,"Blood Group"),t(),i(69,"span",19),r(70),t()()()()()(),i(71,"div",21),d(72,"app-reporting-team",22),t()()()}if(n&2){let e=m();c(8),p("ngIf",e.viewEditor),c(),p("ngIf",!e.viewEditor),c(11),p("ngIf",!e.IsOrg),c(),p("ngIf",e.IsOrg),c(4),p("ngIf",!e.IsOrg),c(),p("ngIf",e.IsOrg),c(4),p("ngIf",!e.IsOrg),c(),p("ngIf",e.IsOrg),c(12),u((e.currentEmployee==null?null:e.currentEmployee.EmployeeNumber)||"-"),c(5),u(j(49,15,e.currentEmployee==null?null:e.currentEmployee.DateOfBirth,"dd-MM-yyyy")||"-"),c(6),u((e.currentEmployee==null?null:e.currentEmployee.Gender)||"-"),c(6),u((e.currentEmployee==null?null:e.currentEmployee.Nationality)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.MaritalStatus)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.BloodGroup)||"-"),c(2),p("currentEmployee",e.currentEmployee)}}var Ce=(()=>{let l=class l{constructor(){this.currentEmployee=null,this.IsSummary=!1,this.IsOrg=!1,this.viewEditor=!1}ngOnChanges(a){if(a.currentEmployee?.currentValue&&(console.log("\u2705 AboutTabComponent received employee:",this.currentEmployee),this.currentEmployee?.DateOfBirth)){let o=this.currentEmployee.DateOfBirth,s=typeof o=="string"&&o.includes("T")?o.split("T")[0]:String(o),[b,y,R]=s.split("-").map(Number);b&&y&&R&&(this.currentEmployee.DateOfBirth=s)}}isEditSummary(){this.IsSummary=!this.IsSummary,this.viewEditor=this.IsSummary}isEditOrg(){this.IsOrg=!this.IsOrg}};l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=v({type:l,selectors:[["app-about-tab"]],inputs:{currentEmployee:"currentEmployee"},features:[A],decls:1,vars:1,consts:[["class","about-container",4,"ngIf"],[1,"about-container"],[1,"detail-row"],[1,"details-card"],[1,"card-header"],["fill","clear","color","medium",3,"click"],["name","pencil-outline","slot","icon-only"],[1,"card-content"],["class","editor-container",4,"ngIf"],["class","summary-text",4,"ngIf"],[1,"org-details"],[1,"info-group"],[1,"label"],["class","value",4,"ngIf"],["class","custom-input",3,"value",4,"ngIf"],[1,"info-group","border-separator"],["class","manager-info",4,"ngIf"],[1,"ion-no-padding"],["size","4",1,"info-group"],[1,"value"],[1,"ion-margin-top"],[1,"details-card","no-border","bg-transparent"],[3,"currentEmployee"],[1,"editor-container"],["placeholder","Tell us about yourself...",1,"custom-textarea"],[1,"summary-text"],[1,"custom-input",3,"value"],[1,"manager-info"],[1,"small-avatar"],["src","../assets/Profile_Picture.png","alt","Manager"]],template:function(o,s){o&1&&g(0,hn,73,18,"div",0),o&2&&p("ngIf",s.currentEmployee)},dependencies:[P,w,M,ae,F,U,q,E,H,Y,Q,G,D,B,Xe,W],styles:[`

.about-container[_ngcontent-%COMP%] {
  padding: 10px;
}
.about-container[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 300px;
  background: #fff;
  border: 1.25px solid #E4E4E7;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.about-container[_ngcontent-%COMP%]   .details-card.no-border[_ngcontent-%COMP%] {
  border: none;
  padding: 0;
  box-shadow: none;
}
.about-container[_ngcontent-%COMP%]   .details-card.bg-transparent[_ngcontent-%COMP%] {
  background: transparent;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #3f51b5;
  margin-bottom: 20px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  margin: 0;
  height: 32px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .summary-text[_ngcontent-%COMP%] {
  font-size: 14px;
  line-height: 1.6;
  color: #3f3f46;
  margin: 0;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #71717a;
  font-weight: 500;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #18191c;
  font-weight: 500;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group.border-separator[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f4f4f5;
  padding-bottom: 16px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .manager-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .manager-info[_ngcontent-%COMP%]   .small-avatar[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .custom-textarea[_ngcontent-%COMP%] {
  --background: #fff;
  --border-color: #e4e4e7;
  --border-radius: 4px;
  --border-style: solid;
  --border-width: 1px;
  --padding-start: 12px;
  --padding-end: 12px;
  font-size: 14px;
  min-height: 100px;
}
.about-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%] {
  --background: #fff;
  --padding-start: 12px;
  border: 1px solid #e4e4e7;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 4px;
  height: 40px;
}
@media (max-width: 768px) {
  .details-card[_ngcontent-%COMP%] {
    width: 100% !important;
  }
}`]});let n=l;return n})();function Pn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u(e.currentEmployee.FullName)}}function Mn(n,l){if(n&1){let e=h();i(0,"ion-input",22),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.FullName,o)||(s.currentEmployee.FullName=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.FullName)}}function En(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.Gender)||"-")}}function On(n,l){if(n&1){let e=h();i(0,"ion-input",23),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.Gender,o)||(s.currentEmployee.Gender=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.Gender)}}function wn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.MaritalStatus)||"-")}}function In(n,l){if(n&1){let e=h();i(0,"ion-input",24),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.MaritalStatus,o)||(s.currentEmployee.MaritalStatus=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.MaritalStatus)}}function Sn(n,l){if(n&1&&(i(0,"h6"),r(1),z(2,"date"),t()),n&2){let e=m(2);c(),u(j(2,1,e.currentEmployee==null?null:e.currentEmployee.DateOfBirth,"dd-MM-yyyy")||"-")}}function Tn(n,l){if(n&1){let e=h();i(0,"ion-input",25),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.DateOfBirth,o)||(s.currentEmployee.DateOfBirth=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.DateOfBirth)}}function kn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.LastName)||"-")}}function Dn(n,l){if(n&1){let e=h();i(0,"ion-input",26),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.LastName,o)||(s.currentEmployee.LastName=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.LastName)}}function Fn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u(e.currentEmployee.BloodGroup||"-")}}function Bn(n,l){if(n&1){let e=h();i(0,"ion-input",27),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.BloodGroup,o)||(s.currentEmployee.BloodGroup=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.BloodGroup)}}function Nn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.PhysicallyHandicapped)||"-")}}function Rn(n,l){if(n&1){let e=h();i(0,"ion-input",28),k("ngModelChange",function(o){f(e);let s=m(2);return T(s.currentEmployee.PhysicallyHandicapped,o)||(s.currentEmployee.PhysicallyHandicapped=o),_(o)}),t()}if(n&2){let e=m(2);S("ngModel",e.currentEmployee.PhysicallyHandicapped)}}function Vn(n,l){n&1&&(i(0,"ion-button",29),r(1," Submit "),t())}function An(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.WorkEmail)||"-")}}function zn(n,l){if(n&1&&d(0,"ion-input",30),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.WorkEmail)}}function jn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.AadhaarNumber)||"-")}}function Wn(n,l){if(n&1&&d(0,"ion-input",30),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.AadhaarNumber)}}function Ln(n,l){n&1&&(i(0,"h6"),r(1,"-"),t())}function Gn(n,l){if(n&1&&d(0,"ion-input",30),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.ResidenceNumber)}}function Un(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.Email)||"-")}}function qn(n,l){if(n&1&&d(0,"ion-input",30),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.Email)}}function Hn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.pf_number)||"-")}}function Jn(n,l){if(n&1&&d(0,"ion-input",30),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.pf_number)}}function Yn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.uan_number)||"-")}}function Qn(n,l){if(n&1&&d(0,"ion-input",30),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.uan_number)}}function Zn(n,l){if(n&1){let e=h();i(0,"ion-button",31),x("click",function(){f(e);let o=m(2);return _(o.Isedit=!1)}),r(1," Submit "),t()}}function Kn(n,l){if(n&1){let e=h();i(0,"div",2)(1,"div",3)(2,"p",4),r(3," Primary Details "),i(4,"img",5),x("click",function(){f(e);let o=m();return _(o.isEditDetails())}),t()(),i(5,"form",6),x("ngSubmit",function(){f(e);let o=m();return _(o.onSubmitDetails())}),i(6,"ion-grid",7)(7,"ion-row")(8,"ion-col",8)(9,"div",9)(10,"p"),r(11,"First Name"),t(),g(12,Pn,2,1,"h6",10)(13,Mn,1,1,"ion-input",11),t(),i(14,"div",9)(15,"p"),r(16,"Gender"),t(),g(17,En,2,1,"h6",10)(18,On,1,1,"ion-input",12),t(),i(19,"div",9)(20,"p"),r(21,"Marital Status"),t(),g(22,wn,2,1,"h6",10)(23,In,1,1,"ion-input",13),t(),i(24,"div",9)(25,"p"),r(26,"Date of Birth"),t(),g(27,Sn,3,4,"h6",10)(28,Tn,1,1,"ion-input",14),t()(),i(29,"ion-col",8)(30,"div",9)(31,"p"),r(32,"Last Name"),t(),g(33,kn,2,1,"h6",10)(34,Dn,1,1,"ion-input",15),t(),i(35,"div",9)(36,"p"),r(37,"Blood Group"),t(),g(38,Fn,2,1,"h6",10)(39,Bn,1,1,"ion-input",16),t(),i(40,"div",9)(41,"p"),r(42,"Physically Handicapped"),t(),g(43,Nn,2,1,"h6",10)(44,Rn,1,1,"ion-input",17),t(),g(45,Vn,2,0,"ion-button",18),t()()()()(),i(46,"div",3)(47,"p",4),r(48," Contact Details "),i(49,"ion-icon",19),x("click",function(){f(e);let o=m();return _(o.isEditForm())}),t()(),i(50,"form")(51,"ion-grid",7)(52,"ion-row")(53,"ion-col",8)(54,"div",9)(55,"p"),r(56,"Work Email"),t(),g(57,An,2,1,"h6",10)(58,zn,1,1,"ion-input",20),t(),i(59,"div",9)(60,"p"),r(61,"Aadhaar Number"),t(),g(62,jn,2,1,"h6",10)(63,Wn,1,1,"ion-input",20),t(),i(64,"div",9)(65,"p"),r(66,"Residence Number"),t(),g(67,Ln,2,0,"h6",10)(68,Gn,1,1,"ion-input",20),t()(),i(69,"ion-col",8)(70,"div",9)(71,"p"),r(72,"Personal Email"),t(),g(73,Un,2,1,"h6",10)(74,qn,1,1,"ion-input",20),t(),i(75,"div",9)(76,"p"),r(77,"PF Number"),t(),g(78,Hn,2,1,"h6",10)(79,Jn,1,1,"ion-input",20),t(),i(80,"div",9)(81,"p"),r(82,"UAN Number"),t(),g(83,Yn,2,1,"h6",10)(84,Qn,1,1,"ion-input",20),t(),g(85,Zn,2,0,"ion-button",21),t()()()()()()}if(n&2){let e=m();c(12),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(4),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(4),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(4),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(5),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(4),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(4),p("ngIf",!e.IsDetails),c(),p("ngIf",e.IsDetails),c(),p("ngIf",e.IsDetails),c(12),p("ngIf",!e.Isedit),c(),p("ngIf",e.Isedit),c(4),p("ngIf",!e.Isedit),c(),p("ngIf",e.Isedit),c(4),p("ngIf",!e.Isedit),c(),p("ngIf",e.Isedit),c(5),p("ngIf",!e.Isedit),c(),p("ngIf",e.Isedit),c(4),p("ngIf",!e.Isedit),c(),p("ngIf",e.Isedit),c(4),p("ngIf",!e.Isedit),c(),p("ngIf",e.Isedit),c(),p("ngIf",e.Isedit)}}function Xn(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.current_address_line1)||"-")}}function $n(n,l){if(n&1&&d(0,"ion-textarea",35),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.current_address_line1)}}function et(n,l){if(n&1&&(i(0,"h6"),r(1),t()),n&2){let e=m(2);c(),u((e.currentEmployee==null?null:e.currentEmployee.permanent_address_line1)||"-")}}function nt(n,l){if(n&1&&d(0,"ion-textarea",35),n&2){let e=m(2);p("value",e.currentEmployee==null?null:e.currentEmployee.permanent_address_line1)}}function tt(n,l){if(n&1){let e=h();i(0,"ion-row")(1,"ion-col")(2,"ion-button",31),x("click",function(){f(e);let o=m(2);return _(o.isAdress=!1)}),r(3," Submit "),t()()()}}function it(n,l){if(n&1){let e=h();i(0,"div",32)(1,"div",33)(2,"p",4),r(3," Addresses "),i(4,"ion-icon",19),x("click",function(){f(e);let o=m();return _(o.isEditAddress())}),t()(),i(5,"form")(6,"ion-grid",7)(7,"ion-row")(8,"ion-col",8)(9,"div",9)(10,"p"),r(11,"Current Address"),t(),g(12,Xn,2,1,"h6",10)(13,$n,1,1,"ion-textarea",34),t()(),i(14,"ion-col",8)(15,"div",9)(16,"p"),r(17,"Permanent Address"),t(),g(18,et,2,1,"h6",10)(19,nt,1,1,"ion-textarea",34),t()()(),g(20,tt,4,0,"ion-row",10),t()()()()}if(n&2){let e=m();c(12),p("ngIf",!e.isAdress),c(),p("ngIf",e.isAdress),c(5),p("ngIf",!e.isAdress),c(),p("ngIf",e.isAdress),c(),p("ngIf",e.isAdress)}}var ye=(()=>{let l=class l{constructor(a,o){this.employeeService=a,this.toastController=o,this.IsDetails=!1,this.Isedit=!1,this.isAdress=!1}ngOnChanges(a){if(a.currentEmployee?.currentValue&&(console.log("\u2705 ProfileTabComponent received employee:",this.currentEmployee),this.currentEmployee?.DateOfBirth)){let o=this.currentEmployee.DateOfBirth,s=typeof o=="string"&&o.includes("T")?o.split("T")[0]:String(o),[b,y,R]=s.split("-").map(Number);b&&y&&R&&(this.currentEmployee.DateOfBirth=s)}}isEditDetails(){this.IsDetails=!this.IsDetails}isEditForm(){this.Isedit=!this.Isedit}isEditAddress(){this.isAdress=!this.isAdress}onSubmitDetails(){this.currentEmployee&&this.employeeService.updateMyProfile(this.currentEmployee).subscribe({next:()=>{this.presentToast("Profile updated successfully!","success"),this.IsDetails=!1},error:a=>{this.presentToast("Failed to update profile.","danger"),console.error("Failed to update profile:",a)}})}presentToast(a,o){return O(this,null,function*(){(yield this.toastController.create({message:a,duration:2e3,color:o,position:"top"})).present()})}};l.\u0275fac=function(o){return new(o||l)(C(K),C(Z))},l.\u0275cmp=v({type:l,selectors:[["app-profile-tab"]],inputs:{currentEmployee:"currentEmployee"},features:[A],decls:2,vars:2,consts:[["class","row-left content-detail-block",4,"ngIf"],["class","row-left content-detail-block address-section",4,"ngIf"],[1,"row-left","content-detail-block"],[1,"ion-card"],[1,"header-text","row-space-between"],["src","../../../../assets/edit.jpg","alt","edit","width","50px","height","50px",3,"click"],[3,"ngSubmit"],[1,"ion-no-padding"],["size","6"],[1,"info-group"],[4,"ngIf"],["name","FullName","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["name","Gender","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["name","MaritalStatus","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["type","date","name","DateOfBirth","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["name","LastName","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["name","BloodGroup","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["name","PhysicallyHandicapped","class","custom-input",3,"ngModel","ngModelChange",4,"ngIf"],["class","primary-btn row-right","type","submit",4,"ngIf"],["name","pencil-outline",1,"edit-icon",3,"click"],["class","custom-input",3,"value",4,"ngIf"],["class","primary-btn row-right","type","submit",3,"click",4,"ngIf"],["name","FullName",1,"custom-input",3,"ngModelChange","ngModel"],["name","Gender",1,"custom-input",3,"ngModelChange","ngModel"],["name","MaritalStatus",1,"custom-input",3,"ngModelChange","ngModel"],["type","date","name","DateOfBirth",1,"custom-input",3,"ngModelChange","ngModel"],["name","LastName",1,"custom-input",3,"ngModelChange","ngModel"],["name","BloodGroup",1,"custom-input",3,"ngModelChange","ngModel"],["name","PhysicallyHandicapped",1,"custom-input",3,"ngModelChange","ngModel"],["type","submit",1,"primary-btn","row-right"],[1,"custom-input",3,"value"],["type","submit",1,"primary-btn","row-right",3,"click"],[1,"row-left","content-detail-block","address-section"],[1,"ion-card","full-width"],["class","custom-textarea",3,"value",4,"ngIf"],[1,"custom-textarea",3,"value"]],template:function(o,s){o&1&&g(0,Kn,86,28,"div",0)(1,it,21,5,"div",1),o&2&&(p("ngIf",s.currentEmployee),c(),p("ngIf",s.currentEmployee))},dependencies:[P,w,M,F,U,q,E,H,Y,Q,G,D,oe,L,te,ie,Ne,B,W],styles:[`

.content-detail-block[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}
.content-detail-block.address-section[_ngcontent-%COMP%] {
  margin-top: -10px;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%] {
  padding: 16px;
  border: 1.25px solid #E4E4E7;
  background: #fff;
  margin: 0;
  width: 49.5%;
  border-radius: 8px;
  box-shadow: none;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card.full-width[_ngcontent-%COMP%] {
  width: 100%;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: #3f51b5;
  margin: 0 0 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .edit-icon[_ngcontent-%COMP%] {
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  font-size: 18px;
  color: #71717a;
  transition: all 0.2s ease-in-out;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .edit-icon[_ngcontent-%COMP%]:hover {
  background: #f4f4f5;
  color: #3f51b5;
  transform: scale(1.1);
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%] {
  margin-bottom: 15px;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #71717a;
  font-weight: 600;
  margin: 0 0 4px 0;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #18191c;
  font-weight: 400;
  margin: 0;
  min-height: 20px;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%] {
  --padding-start: 12px;
  --padding-end: 12px;
  border: 1px solid #e4e4e7;
  border-radius: 4px;
  font-size: 14px;
  height: 40px;
  margin-top: 4px;
  --background: #fff;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   .custom-textarea[_ngcontent-%COMP%] {
  --padding-start: 12px;
  --padding-end: 12px;
  border: 1px solid #e4e4e7;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  margin-top: 4px;
  --background: #fff;
}
.content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%] {
  --background: #3f51b5;
  --border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  float: right;
  height: 36px;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
}
@media (max-width: 768px) {
  .content-detail-block[_ngcontent-%COMP%]   .ion-card[_ngcontent-%COMP%] {
    width: 100% !important;
    margin-bottom: 16px;
  }
}`]});let n=l;return n})();function rt(n,l){if(n&1&&(i(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),r(4,"Job Information"),t(),i(5,"div",5)(6,"div",6)(7,"div",7)(8,"span",8),r(9,"Job Title"),t(),i(10,"span",9),r(11),t()(),i(12,"div",7)(13,"span",8),r(14,"Department"),t(),i(15,"span",9),r(16),t()()()()(),i(17,"div",3)(18,"div",4),r(19,"Employment Details"),t(),i(20,"div",5)(21,"div",6)(22,"div",7)(23,"span",8),r(24,"Employment Status"),t(),i(25,"span",9),r(26),t()(),i(27,"div",7)(28,"span",8),r(29,"Worker Type"),t(),i(30,"span",9),r(31),t()(),i(32,"div",10)(33,"span",8),r(34,"Contract Type"),t(),i(35,"span",9),r(36),t()(),i(37,"div",10)(38,"span",8),r(39,"Status"),t(),i(40,"span",9),r(41,"Default Notice period - 3 months"),t()()()()()(),i(42,"div",2)(43,"div",3)(44,"div",4),r(45,"Work Schedule"),t(),i(46,"div",5)(47,"div",6)(48,"div",7)(49,"span",8),r(50,"Work Shift"),t(),i(51,"span",9),r(52),t()(),i(53,"div",7)(54,"span",8),r(55,"Weekly Hours"),t(),i(56,"span",9),r(57,"-"),t()(),i(58,"div",7)(59,"span",8),r(60,"Work Days"),t(),i(61,"span",9),r(62),t()(),i(63,"div",7)(64,"span",8),r(65,"Time Zone"),t(),i(66,"span",9),r(67,"-"),t()()()()(),i(68,"div",3)(69,"div",4),r(70,"Work Location"),t(),i(71,"div",5)(72,"div",6)(73,"div",7)(74,"span",8),r(75,"Primary Location"),t(),i(76,"span",9),r(77),t()(),i(78,"div",7)(79,"span",8),r(80,"Work Mode"),t(),i(81,"span",9),r(82),t()(),i(83,"div",7)(84,"span",8),r(85,"Office Address"),t(),i(86,"span",9),r(87),t()(),i(88,"div",7)(89,"span",8),r(90,"Desk Number"),t(),i(91,"span",9),r(92,"-"),t()()()()()()()),n&2){let e=m();c(11),u((e.currentEmployee==null?null:e.currentEmployee.designation_name)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.department_name)||"-"),c(10),u((e.currentEmployee==null?null:e.currentEmployee.EmploymentStatus)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.worker_type)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.time_type)||"-"),c(16),u((e.currentEmployee==null?null:e.currentEmployee.business_unit)||"-"),c(10),u((e.currentEmployee==null?null:e.currentEmployee.job_title)||"-"),c(15),u((e.currentEmployee==null?null:e.currentEmployee.location_name)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.worker_type)||"-"),c(5),u((e.currentEmployee==null?null:e.currentEmployee.worker_type)||"-")}}var he=(()=>{let l=class l{constructor(){this.currentEmployee=null,this.IseditJob=!1}ngOnChanges(a){a.currentEmployee?.currentValue&&console.log("\u2705 JobTabComponent received employee:",this.currentEmployee)}isEditJob(){this.IseditJob=!this.IseditJob}};l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=v({type:l,selectors:[["app-job-tab"]],inputs:{currentEmployee:"currentEmployee"},features:[A],decls:1,vars:1,consts:[["class","job-container",4,"ngIf"],[1,"job-container"],[1,"detail-row"],[1,"details-card"],[1,"card-header"],[1,"card-content"],[1,"info-grid"],[1,"info-group"],[1,"label"],[1,"value"],[1,"info-group","border-separator"]],template:function(o,s){o&1&&g(0,rt,93,10,"div",0),o&2&&p("ngIf",s.currentEmployee)},dependencies:[P,w,M,D,B],styles:[`

.job-container[_ngcontent-%COMP%] {
  padding: 10px;
}
.job-container[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 300px;
  background: #fff;
  border: 1.25px solid #E4E4E7;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: #3f51b5;
  margin-bottom: 20px;
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #71717a;
  font-weight: 500;
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #18191c;
  font-weight: 500;
}
.job-container[_ngcontent-%COMP%]   .details-card[_ngcontent-%COMP%]   .info-group.border-separator[_ngcontent-%COMP%] {
  padding-top: 10px;
  border-top: 1px solid #f4f4f5;
}
@media (max-width: 768px) {
  .info-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr !important;
  }
}`]});let n=l;return n})();var ve=(()=>{let l=class l{};l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=v({type:l,selectors:[["app-document-tab"]],inputs:{currentEmployee:"currentEmployee"},decls:6,vars:0,consts:[[1,"placeholder-container"],["name","document-attach-outline"]],template:function(o,s){o&1&&(i(0,"div",0),d(1,"ion-icon",1),i(2,"h3"),r(3,"No Documents Found"),t(),i(4,"p"),r(5,"There are currently no documents uploaded for this employee."),t()())},dependencies:[P,M,E],styles:[`

.placeholder-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #71717a;
}
.placeholder-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  margin-bottom: 20px;
  color: #e4e4e7;
}
.placeholder-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #18191c;
}
.placeholder-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  max-width: 300px;
}`]});let n=l;return n})();var Pe=(()=>{let l=class l{};l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=v({type:l,selectors:[["app-assets-tab"]],inputs:{currentEmployee:"currentEmployee"},decls:6,vars:0,consts:[[1,"placeholder-container"],["name","library-outline"]],template:function(o,s){o&1&&(i(0,"div",0),d(1,"ion-icon",1),i(2,"h3"),r(3,"No Assets Found"),t(),i(4,"p"),r(5,"There are currently no assets assigned to this employee."),t()())},dependencies:[P,M,E],styles:[`

.placeholder-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #71717a;
}
.placeholder-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  margin-bottom: 20px;
  color: #e4e4e7;
}
.placeholder-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #18191c;
}
.placeholder-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  max-width: 300px;
}`]});let n=l;return n})();function st(n,l){if(n&1){let e=h();i(0,"ion-button",39),x("click",function(){f(e);let o=m();return _(o.openResignationModal())}),d(1,"ion-icon",40),r(2," Apply Resignation "),t()}}function pt(n,l){if(n&1){let e=h();i(0,"ion-button",41),x("click",function(){f(e);let o=m();return _(o.openTrackingModal())}),d(1,"ion-icon",42),r(2," Track Resignation "),t()}}function mt(n,l){n&1&&(i(0,"p",51),r(1,"Preview"),t())}function dt(n,l){if(n&1){let e=h();i(0,"div",43)(1,"p",44),r(2,"Choose profile photo"),t(),i(3,"div",45),d(4,"img",46),g(5,mt,2,0,"p",47),t(),i(6,"label",48)(7,"input",49),x("change",function(o){f(e);let s=m();return _(s.onFileSelected(o))}),t(),i(8,"span"),r(9,"Browse files"),t()(),i(10,"ion-button",50),x("click",function(){f(e);let o=m();return _(o.uploadProfilePic())}),r(11),t()()}if(n&2){let e=m();c(4),p("src",e.previewImageUrl||(e.currentEmployee!=null&&e.currentEmployee.profile_image?e.env+e.currentEmployee.profile_image:"assets/user.svg"),Me),c(),p("ngIf",e.previewImageUrl),c(5),p("disabled",!e.selectedFile||e.isUploading),c(),I(" ",e.isUploading?"Uploading...":"Upload Profile"," ")}}function gt(n,l){if(n&1&&d(0,"app-about-tab",52),n&2){let e=m();p("currentEmployee",e.currentEmployee)}}function ut(n,l){if(n&1&&d(0,"app-profile-tab",52),n&2){let e=m();p("currentEmployee",e.currentEmployee)}}function ft(n,l){if(n&1&&d(0,"app-job-tab",52),n&2){let e=m();p("currentEmployee",e.currentEmployee)}}function _t(n,l){if(n&1&&d(0,"app-document-tab",52),n&2){let e=m();p("currentEmployee",e.currentEmployee)}}function xt(n,l){if(n&1&&d(0,"app-assets-tab",52),n&2){let e=m();p("currentEmployee",e.currentEmployee)}}var $e=(()=>{let l=class l{constructor(a,o,s,b,y,R,en){this.employeeService=a,this.popoverController=o,this.toastController=s,this.loadingController=b,this.cdr=y,this.separationService=R,this.modalController=en,this.destroy$=new we,this.selectedSegment="about",this.env="",this.myResignation=null,this.resSettings=null,this.selectedFile=null,this.uploadedImageUrl=null,this.previewImageUrl=null,this.isUploading=!1}ngOnInit(){this.env=fe.apiURL.startsWith("http")?fe.apiURL:`http://${fe.apiURL}`,this.loadProfile(),this.loadMyResignation(),this.loadResSettings(),this.employeeService.profileImageUpdate$.pipe($(this.destroy$)).subscribe(a=>{a&&this.currentEmployee&&(this.currentEmployee.profile_image=a,this.cdr.detectChanges())})}loadMyResignation(){this.separationService.getMyResignation().pipe($(this.destroy$)).subscribe({next:a=>{this.myResignation=a,this.cdr.detectChanges()},error:a=>{console.error("Error fetching resignation status:",a)}})}loadResSettings(){this.separationService.getResignationSettings().subscribe({next:a=>{this.resSettings=a,this.cdr.detectChanges()},error:a=>{console.error("Error fetching resignation settings:",a)}})}loadProfile(){return O(this,null,function*(){let a=yield this.loadingController.create({message:"Loading profile...",spinner:"crescent"});yield a.present(),this.employeeService.getMyProfile().pipe($(this.destroy$)).subscribe({next:o=>{o?.data?this.currentEmployee=Array.isArray(o.data)?o.data[0]:o.data:this.currentEmployee=o,a.dismiss(),this.cdr.detectChanges()},error:()=>{a.dismiss(),this.showToast("Failed to load profile","danger")}})})}segmentChanged(a){this.selectedSegment=a.detail.value}onFileSelected(a){let o=a.target.files&&a.target.files[0];if(o){this.selectedFile=o;let s=new FileReader;s.onload=b=>{this.previewImageUrl=b.target?.result,this.cdr.detectChanges()},s.readAsDataURL(o)}}uploadProfilePic(){return O(this,null,function*(){if(!this.selectedFile){this.showToast("Please select an image first","warning");return}this.isUploading=!0,this.employeeService.uploadProfileImage(this.selectedFile).pipe($(this.destroy$)).subscribe({next:a=>O(this,null,function*(){this.isUploading=!1,this.previewImageUrl=null,this.selectedFile=null,yield this.popoverController.dismiss(),this.showToast("Profile picture updated successfully","success"),this.cdr.detectChanges()}),error:a=>O(this,null,function*(){this.isUploading=!1,yield this.popoverController.dismiss(),this.showToast("Failed to upload profile picture","danger"),console.error("Upload error:",a)})})})}showToast(a,o="success"){return O(this,null,function*(){yield(yield this.toastController.create({message:a,duration:2e3,position:"bottom",color:o,icon:o==="success"?"checkmark-circle":"alert-circle"})).present()})}openResignationModal(){return O(this,null,function*(){if(!this.currentEmployee)return;let a=yield this.modalController.create({component:be,componentProps:{currentEmployee:this.currentEmployee}});yield a.present();let{data:o}=yield a.onDidDismiss();o&&o.submitted&&(this.loadProfile(),this.loadMyResignation())})}openTrackingModal(){return O(this,null,function*(){if(!this.myResignation)return;let a=yield this.modalController.create({component:xe,componentProps:{resignation:this.myResignation}});yield a.present();let{data:o}=yield a.onDidDismiss();o&&(o.cancelled||o.submitted)&&(this.loadProfile(),this.loadMyResignation())})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};l.\u0275fac=function(o){return new(o||l)(C(K),C(Ye),C(Z),C(ge),C(ke),C(_e),C(ue))},l.\u0275cmp=v({type:l,selectors:[["app-profile"]],standalone:!1,decls:66,vars:15,consts:[[1,"ion-no-border"],[1,"home-toolbar"],["slot","start"],["slot","end"],["color","primary",3,"click"],["name","refresh-outline","slot","icon-only"],[1,"header-segment-toolbar"],["mode","md",1,"profile-segment",3,"ngModelChange","ionChange","ngModel"],["value","about"],["value","profile"],["value","job"],["value","documents"],["value","assets"],[1,"profile-page-content"],[1,"header-banner"],[1,"profile-top-section","ion-padding","animate__animated","animate__fadeIn"],[1,"ion-no-padding"],[1,"ion-align-items-center"],["size","12","size-md","4",1,"ion-text-center"],[1,"avatar-block"],["alt","Profile Picture",1,"profile-pic",3,"src"],["size","12","size-md","8"],[1,"content-block"],[1,"employee-name"],[1,"employee-designation"],[1,"employee-id"],[1,"basic-info"],[1,"info-row"],["name","location-outline"],["name","mail-outline"],[1,"action-buttons"],["fill","outline","color","primary","id","image-upload-trigger",1,"upload-btn"],["slot","start","name","cloud-upload-outline"],["fill","solid","color","danger","class","upload-btn",3,"click",4,"ngIf"],["fill","solid","color","warning","class","upload-btn",3,"click",4,"ngIf"],["trigger","image-upload-trigger",1,"upload-popover"],[1,"tab-content-container","ion-padding","animate__animated","animate__fadeIn"],[3,"ngSwitch"],[3,"currentEmployee",4,"ngSwitchCase"],["fill","solid","color","danger",1,"upload-btn",3,"click"],["slot","start","name","exit-outline"],["fill","solid","color","warning",1,"upload-btn",3,"click"],["slot","start","name","time-outline"],[1,"ion-padding","popover-content"],[1,"popover-title"],[1,"preview-box"],[1,"preview-img",3,"src"],["class","preview-text",4,"ngIf"],[1,"file-upload-label"],["type","file","accept","image/*",3,"change"],["expand","block",1,"upload-submit",3,"click","disabled"],[1,"preview-text"],[3,"currentEmployee"]],template:function(o,s){o&1&&(i(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),d(3,"ion-menu-button"),t(),i(4,"ion-title"),r(5,"My Profile"),t(),i(6,"ion-buttons",3)(7,"ion-button",4),x("click",function(){return s.loadProfile()}),d(8,"ion-icon",5),t()()(),i(9,"ion-toolbar",6)(10,"ion-segment",7),k("ngModelChange",function(y){return T(s.selectedSegment,y)||(s.selectedSegment=y),y}),x("ionChange",function(y){return s.segmentChanged(y)}),i(11,"ion-segment-button",8)(12,"ion-label"),r(13,"ABOUT"),t()(),i(14,"ion-segment-button",9)(15,"ion-label"),r(16,"PROFILE"),t()(),i(17,"ion-segment-button",10)(18,"ion-label"),r(19,"JOB"),t()(),i(20,"ion-segment-button",11)(21,"ion-label"),r(22,"Documents"),t()(),i(23,"ion-segment-button",12)(24,"ion-label"),r(25,"Assets"),t()()()()(),i(26,"ion-content",13),d(27,"div",14),i(28,"div",15)(29,"ion-grid",16)(30,"ion-row",17)(31,"ion-col",18)(32,"div",19),d(33,"img",20),t()(),i(34,"ion-col",21)(35,"div",22)(36,"h1",23),r(37),t(),i(38,"p",24),r(39),i(40,"span",25),r(41),t()(),i(42,"div",26)(43,"div",27),d(44,"ion-icon",28),i(45,"span"),r(46),t()(),i(47,"div",27),d(48,"ion-icon",29),i(49,"span"),r(50),t()()(),i(51,"div",30)(52,"ion-button",31),d(53,"ion-icon",32),r(54," Upload Image "),t(),g(55,st,3,0,"ion-button",33)(56,pt,3,0,"ion-button",34),t()(),i(57,"ion-popover",35),g(58,dt,12,4,"ng-template"),t()()()()(),i(59,"div",36)(60,"div",37),g(61,gt,1,1,"app-about-tab",38)(62,ut,1,1,"app-profile-tab",38)(63,ft,1,1,"app-job-tab",38)(64,_t,1,1,"app-document-tab",38)(65,xt,1,1,"app-assets-tab",38),t()()()),o&2&&(c(10),S("ngModel",s.selectedSegment),c(23),p("src",s.currentEmployee!=null&&s.currentEmployee.profile_image?s.env+s.currentEmployee.profile_image:"../../assets/Profile_Picture.png",Me),c(4),u(s.currentEmployee==null?null:s.currentEmployee.FullName),c(2),I(" ",s.currentEmployee==null?null:s.currentEmployee.designation_name," "),c(2),I("(",s.currentEmployee==null?null:s.currentEmployee.EmployeeNumber,")"),c(5),u((s.currentEmployee==null?null:s.currentEmployee.location_name)||"Global HQ"),c(4),u(s.currentEmployee==null?null:s.currentEmployee.WorkEmail),c(5),p("ngIf",(s.resSettings==null?null:s.resSettings.allow_employee_resign)!==!1&&(s.currentEmployee==null?null:s.currentEmployee.EmploymentStatus)==="Working"&&(!s.myResignation||s.myResignation.status==="Rejected")),c(),p("ngIf",s.myResignation&&s.myResignation.status!=="Rejected"&&s.myResignation.status!=="Relieved"),c(4),p("ngSwitch",s.selectedSegment),c(),p("ngSwitchCase","about"),c(),p("ngSwitchCase","profile"),c(),p("ngSwitchCase","job"),c(),p("ngSwitchCase","documents"),c(),p("ngSwitchCase","assets"))},dependencies:[w,De,Fe,L,ie,F,le,U,ce,q,se,E,J,je,Y,Ge,Ue,me,de,Je,re,Ce,ye,he,ve,Pe],styles:[`

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
.profile-page-content[_ngcontent-%COMP%] {
  --background: #f4f7fb;
  position: relative;
  min-height: calc(100vh - 705px);
  overflow: auto;
}
.profile-page-content[_ngcontent-%COMP%]   .header-banner[_ngcontent-%COMP%] {
  height: 140px;
  background: #0f2b4a;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}
.profile-page-content[_ngcontent-%COMP%]   .header-banner[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px);
  background-size: 24px 24px;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
  background: #ffffff;
  margin: 60px 24px 24px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  overflow: hidden;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .avatar-block[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  margin-top: -60px;
  position: relative;
  z-index: 2;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .avatar-block[_ngcontent-%COMP%]   .profile-pic[_ngcontent-%COMP%] {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  object-fit: cover;
  background: #f8fafc;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%] {
  padding: 24px 32px 32px;
  text-align: center;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .employee-name[_ngcontent-%COMP%] {
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.05em;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .employee-designation[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 600;
  color: #1F74BB;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .employee-designation[_ngcontent-%COMP%]   .employee-id[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 500;
  background: #f8fafc;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .basic-info[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .basic-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .basic-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #1F74BB;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
}
.profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .upload-btn[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 700;
  --background: #e8f0fb;
  --color: #1F74BB;
  --box-shadow: none;
  height: 40px;
  text-transform: none;
  margin: 0;
}
.profile-page-content[_ngcontent-%COMP%]   .tab-content-container[_ngcontent-%COMP%] {
  margin: 0 24px 40px;
  background: transparent;
}
.profile-segment[_ngcontent-%COMP%] {
  max-width: 600px;
  margin: 0 auto 24px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 4px;
  border: 1px solid #f1f5f9;
}
.profile-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --indicator-height: 0;
  --color: #475569;
  --color-checked: #1F74BB;
  --background-checked: #ffffff;
  --border-radius: 8px;
  font-weight: 700;
  min-height: 40px;
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  transition: all 0.2s ease;
}
.profile-segment[_ngcontent-%COMP%]   ion-segment-button.segment-button-checked[_ngcontent-%COMP%] {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: #1F74BB;
}
.upload-popover[_ngcontent-%COMP%] {
  --width: 280px;
  --border-radius: 12px;
  --box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: #ffffff;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .popover-title[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .preview-box[_ngcontent-%COMP%] {
  width: 120px;
  height: 120px;
  border: 2px dashed #ABABAB;
  border-radius: 12px;
  padding: 6px;
  text-align: center;
  position: relative;
  background: #f8fafc;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .preview-box[_ngcontent-%COMP%]   .preview-img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .preview-box[_ngcontent-%COMP%]   .preview-text[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #1F74BB;
  margin: 6px 0 0 0;
  font-weight: 700;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .file-upload-label[_ngcontent-%COMP%] {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 12px;
  border: 2px dashed #1F74BB;
  background: #e8f0fb;
  border-radius: 8px;
  color: #1F74BB;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  transition: all 0.2s ease;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .file-upload-label[_ngcontent-%COMP%]:hover {
  background: rgba(31, 116, 187, 0.1);
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .file-upload-label[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {
  display: none;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .upload-submit[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #ffffff;
  --border-radius: 8px;
  font-weight: 700;
  margin: 0;
  width: 100%;
  height: 44px;
  text-transform: none;
}
.upload-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]   .upload-submit[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
}
@media (min-width: 768px) {
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%] {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: 40px;
  }
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .avatar-block[_ngcontent-%COMP%] {
    margin-top: 0;
    margin-right: 40px;
  }
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .avatar-block[_ngcontent-%COMP%]   .profile-pic[_ngcontent-%COMP%] {
    width: 160px;
    height: 160px;
  }
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%] {
    padding: 0;
    text-align: left;
    flex: 1;
  }
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .employee-designation[_ngcontent-%COMP%] {
    justify-content: flex-start;
    font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  }
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .basic-info[_ngcontent-%COMP%] {
    justify-content: flex-start;
    margin-top: 24px;
    padding-top: 24px;
    gap: 32px;
  }
  .profile-page-content[_ngcontent-%COMP%]   .profile-top-section[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {
    justify-content: flex-start;
    margin-top: 32px;
  }
}`]});let n=l;return n})();var bt=[{path:"",component:$e}],ci=(()=>{let l=class l{};l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=Se({type:l}),l.\u0275inj=Ie({imports:[P,D,M,Be.forChild(bt),Ce,ye,he,ve,Pe,be,xe]});let n=l;return n})();export{ci as ProfilePageModule};
