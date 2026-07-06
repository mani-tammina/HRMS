import{a as Z}from"./chunk-NDCRD3QG.js";import{Aa as J,Da as K,Fa as Q,Ga as X,H as j,I as B,R as q,W as V,X as G,ra as W,ta as Y}from"./chunk-B3PLR2IL.js";import{$a as v,Ba as T,Ca as O,Da as _,E as b,Eb as U,H as y,Ib as F,Jb as z,K as x,Kb as N,L as S,La as w,Ma as p,Na as A,Oa as s,Pa as u,Qa as h,Ra as D,Ya as f,_ as r,bb as k,ca as C,ea as R,ja as m,qb as H,ra as l,rb as $,sa as o,ta as n,ua as g,ya as I,yb as L,za as E}from"./chunk-27EUYVIP.js";import{e as M}from"./chunk-JHI3MBHO.js";var ee=(()=>{let c=class c{constructor(e){this.http=e,this.env=Z,this.API_URL=`http://${this.env.apiURL}/api/separation`}getHeaders(){let e=localStorage.getItem("token")||localStorage.getItem("access_token");return new F({Authorization:`Bearer ${e}`,"Content-Type":"application/json"})}getNoticePeriods(){return this.http.get(`${this.API_URL}/notice-periods`,{headers:this.getHeaders()})}getNoticePeriodById(e){return this.http.get(`${this.API_URL}/notice-periods/${e}`,{headers:this.getHeaders()})}saveNoticePeriod(e){return this.http.post(`${this.API_URL}/notice-periods`,e,{headers:this.getHeaders()})}updateNoticePeriod(e,i){return this.http.put(`${this.API_URL}/notice-periods/${e}`,i,{headers:this.getHeaders()})}deleteNoticePeriod(e){return this.http.delete(`${this.API_URL}/notice-periods/${e}`,{headers:this.getHeaders()})}getResignationReasons(){return this.http.get(`${this.API_URL}/reasons`,{headers:this.getHeaders()})}getActiveResignationReasons(){return this.http.get(`${this.API_URL}/reasons/active`,{headers:this.getHeaders()})}getResignationReasonById(e){return this.http.get(`${this.API_URL}/reasons/${e}`,{headers:this.getHeaders()})}createResignationReason(e){return this.http.post(`${this.API_URL}/reasons`,e,{headers:this.getHeaders()})}updateResignationReason(e,i){return this.http.put(`${this.API_URL}/reasons/${e}`,i,{headers:this.getHeaders()})}deleteResignationReason(e){return this.http.delete(`${this.API_URL}/reasons/${e}`,{headers:this.getHeaders()})}getResignationSettings(){return this.http.get(`${this.API_URL}/settings`,{headers:this.getHeaders()})}updateResignationSettings(e){return this.http.put(`${this.API_URL}/settings`,e,{headers:this.getHeaders()})}getNoticePeriodLeavesSettings(){return this.http.get(`${this.API_URL}/notice-period-leaves`,{headers:this.getHeaders()})}updateNoticePeriodLeavesSettings(e){return this.http.put(`${this.API_URL}/notice-period-leaves`,e,{headers:this.getHeaders()})}applyResignation(e){return this.http.post(`${this.API_URL}/apply`,e,{headers:this.getHeaders()})}getMyResignation(){return this.http.get(`${this.API_URL}/my`,{headers:this.getHeaders()})}cancelResignation(){return this.http.post(`${this.API_URL}/cancel`,{},{headers:this.getHeaders()})}getResignationRequests(e={}){let i=new z;return e.employee&&(i=i.set("employee",e.employee)),e.department&&(i=i.set("department",e.department)),e.status&&(i=i.set("status",e.status)),e.startDate&&(i=i.set("startDate",e.startDate)),e.endDate&&(i=i.set("endDate",e.endDate)),this.http.get(`${this.API_URL}/requests`,{params:i,headers:this.getHeaders()})}getResignationDetails(e){return this.http.get(`${this.API_URL}/requests/${e}`,{headers:this.getHeaders()})}actionResignation(e,i){return this.http.post(`${this.API_URL}/requests/${e}/action`,i,{headers:this.getHeaders()})}getClearanceTasks(e){return this.http.get(`${this.API_URL}/clearance/${e}`,{headers:this.getHeaders()})}updateClearanceTask(e,i,t){return this.http.put(`${this.API_URL}/clearance/${e}/task/${i}`,t,{headers:this.getHeaders()})}getFFSettlement(e){return this.http.get(`${this.API_URL}/settlement/${e}`,{headers:this.getHeaders()})}processFFSettlement(e,i){return this.http.post(`${this.API_URL}/settlement/${e}`,i,{headers:this.getHeaders()})}updateSettlementStatus(e,i){return this.http.put(`${this.API_URL}/settlement/${e}/status`,i,{headers:this.getHeaders()})}};c.\u0275fac=function(i){return new(i||c)(y(N))},c.\u0275prov=b({token:c,factory:c.\u0275fac,providedIn:"root"});let a=c;return a})();var ae=()=>["Exit Clearance","Relieved"],oe=()=>["Submitted","Manager Review","HR Review"],re=()=>["IT","Admin","Finance","HR","Security"];function se(a,c){if(a&1&&(o(0,"p"),s(1),n()),a&2){let d=_();r(),h("Approved by ",(d.resSettings==null?null:d.resSettings.show_reviewer_status)!==!1?d.resignation.manager_first_name+" "+d.resignation.manager_last_name:"Manager",".")}}function ce(a,c){if(a&1&&(o(0,"p"),s(1),n()),a&2){let d=_();r(),h("Pending review with ",(d.resSettings==null?null:d.resSettings.show_reviewer_status)!==!1?"your reporting manager":"Manager",".")}}function le(a,c){if(a&1&&(o(0,"p",25),s(1),n()),a&2){let d=_();r(),h('"',d.resignation.manager_remarks,'"')}}function de(a,c){a&1&&(o(0,"p"),s(1,"Approved by HR."),n())}function ge(a,c){a&1&&(o(0,"p"),s(1,"Pending final approval from HR."),n())}function me(a,c){if(a&1&&(o(0,"p",25),s(1),n()),a&2){let d=_();r(),h('"',d.resignation.hr_remarks,'"')}}function pe(a,c){if(a&1&&(I(0),o(1,"div",26)(2,"div",27),g(3,"div",28),n(),o(4,"div",29)(5,"span"),s(6),n(),o(7,"span"),s(8),n()()(),E()),a&2){let d=_();r(3),w("width",d.progressPercentage,"%"),r(3),h("",d.daysServed," Days Served"),r(2),D("",d.remainingDays," Days Remaining (",d.progressPercentage,"%)")}}function _e(a,c){a&1&&(o(0,"p"),s(1,"Completed notice period."),n())}function ue(a,c){a&1&&(o(0,"p"),s(1,"Notice period starts after HR approval."),n())}function he(a,c){if(a&1&&(o(0,"div",32),g(1,"ion-icon",17),o(2,"span"),s(3),n()()),a&2){let d=c.$implicit,e=_(2);p("done",e.getDepartmentStatus(d)==="Completed"),r(),l("name",e.getDepartmentStatus(d)==="Completed"?"checkmark-done":"time-outline"),r(2),u(d)}}function Ce(a,c){a&1&&(o(0,"div",30),m(1,he,4,4,"div",31),n()),a&2&&(r(),l("ngForOf",f(1,re)))}function Pe(a,c){a&1&&(o(0,"p",33),s(1,"Clearance checklist will appear here upon HR approval."),n())}function fe(a,c){a&1&&(o(0,"p"),s(1,"Settlement paid successfully."),n())}function Me(a,c){a&1&&(o(0,"p"),s(1,"Settlement calculated, awaiting bank payment."),n())}function Oe(a,c){a&1&&(o(0,"p"),s(1,"F&F settlement is calculated after clearances are completed."),n())}function ve(a,c){a&1&&(o(0,"p"),s(1,"Relieved from duty. Goodbye and good luck! \u{1F44B}"),n())}function ke(a,c){a&1&&(o(0,"p"),s(1,"Final relieving document and letter will be processed."),n())}function be(a,c){if(a&1){let d=T();o(0,"div",34)(1,"ion-button",35),O("click",function(){x(d);let i=_();return S(i.cancelResignation())}),g(2,"ion-icon",36),s(3," Cancel Resignation Request "),n()()}}var we=(()=>{let c=class c{constructor(e,i,t,P){this.modalController=e,this.separationService=i,this.toastController=t,this.alertController=P,this.clearanceTasks=[],this.settlementDetails=null,this.resSettings=null,this.daysServed=0,this.remainingDays=0,this.progressPercentage=0}ngOnInit(){this.loadSettings(),this.resignation&&(this.calculateNoticePeriodProgress(),this.loadClearanceTasks(),this.loadSettlementDetails())}loadSettings(){this.separationService.getResignationSettings().subscribe({next:e=>{this.resSettings=e},error:e=>{console.error("Error fetching resignation settings:",e)}})}calculateNoticePeriodProgress(){if(!this.resignation.hr_action_at&&!this.resignation.created_at)return;let e=new Date(this.resignation.hr_action_at||this.resignation.created_at),i=new Date,t=this.resignation.hr_notice_period_days||this.resignation.notice_period_days||30,P=Math.abs(i.getTime()-e.getTime()),te=Math.ceil(P/(1e3*60*60*24));this.daysServed=Math.min(te,t),this.remainingDays=Math.max(0,t-this.daysServed),this.progressPercentage=Math.round(this.daysServed/t*100)}loadClearanceTasks(){this.separationService.getClearanceTasks(this.resignation.id).subscribe({next:e=>{this.clearanceTasks=e},error:e=>{console.error("Error loading clearance tasks:",e)}})}loadSettlementDetails(){this.separationService.getFFSettlement(this.resignation.id).subscribe({next:e=>{this.settlementDetails=e},error:e=>{console.error("Error loading settlement:",e)}})}getTasksByDepartment(e){return this.clearanceTasks.filter(i=>i.department===e)}getDepartmentStatus(e){let i=this.getTasksByDepartment(e);return i.length===0?"Pending":i.every(t=>t.status==="Completed")?"Completed":"Pending"}isStepCompleted(e){let i=this.resignation.status;switch(e){case 1:return["Submitted","Manager Review","HR Review","Approved","Exit Clearance","Relieved"].includes(i);case 2:return["HR Review","Approved","Exit Clearance","Relieved"].includes(i)&&this.resignation.manager_action==="Approve";case 3:return["Approved","Exit Clearance","Relieved"].includes(i)&&this.resignation.hr_action==="Approve";case 4:return["Exit Clearance","Relieved"].includes(i);case 5:return this.clearanceTasks.length>0&&this.clearanceTasks.every(t=>t.status==="Completed");case 6:return this.settlementDetails&&this.settlementDetails.status==="Paid";case 7:return i==="Relieved";default:return!1}}cancelResignation(){return M(this,null,function*(){yield(yield this.alertController.create({header:"Cancel Resignation",message:"Are you sure you want to cancel your resignation request? This will restore your active employment status.",buttons:[{text:"No",role:"cancel"},{text:"Yes, Cancel It",handler:()=>{this.separationService.cancelResignation().subscribe({next:()=>{this.presentToast("Resignation request cancelled successfully.","success"),this.modalController.dismiss({cancelled:!0})},error:i=>{this.presentToast(i.error?.error||"Failed to cancel resignation.","danger")}})}}]})).present()})}dismiss(){this.modalController.dismiss()}presentToast(e,i){return M(this,null,function*(){(yield this.toastController.create({message:e,duration:2e3,color:i,position:"top"})).present()})}};c.\u0275fac=function(i){return new(i||c)(C(K),C(ee),C(Q),C(J))},c.\u0275cmp=R({type:c,selectors:[["app-resignation-tracking"]],inputs:{resignation:"resignation"},decls:97,vars:64,consts:[[1,"ion-no-border"],[1,"modal-toolbar"],["slot","end"],[3,"click"],["name","close-outline","slot","icon-only"],[1,"ion-padding","tracking-modal-content"],[1,"tracking-container"],[1,"summary-card","animate__animated","animate__fadeIn"],[1,"summary-header"],[1,"status-badge"],[1,"summary-details"],[1,"detail-item"],[1,"label"],[1,"value"],[1,"timeline","animate__animated","animate__fadeIn"],[1,"timeline-step"],[1,"timeline-icon"],[3,"name"],[1,"timeline-content"],[4,"ngIf"],["class","remarks",4,"ngIf"],["class","clearance-grid",4,"ngIf"],["class","no-tasks",4,"ngIf"],[1,"timeline-step","last-step"],["class","cancel-container",4,"ngIf"],[1,"remarks"],[1,"progress-container"],[1,"progress-bar-wrapper"],[1,"progress-bar-fill"],[1,"progress-stats"],[1,"clearance-grid"],["class","dept-badge",3,"done",4,"ngFor","ngForOf"],[1,"dept-badge"],[1,"no-tasks"],[1,"cancel-container"],["expand","block","fill","outline","color","danger",1,"cancel-btn",3,"click"],["name","trash-outline","slot","start"]],template:function(i,t){i&1&&(o(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),s(3,"Resignation Progress"),n(),o(4,"ion-buttons",2)(5,"ion-button",3),O("click",function(){return t.dismiss()}),g(6,"ion-icon",4),n()()()(),o(7,"ion-content",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"h2"),s(12,"Exit Formalities"),n(),o(13,"span",9),s(14),n()(),o(15,"div",10)(16,"div",11)(17,"span",12),s(18,"Reason:"),n(),o(19,"span",13),s(20),n()(),o(21,"div",11)(22,"span",12),s(23,"Applied Date:"),n(),o(24,"span",13),s(25),v(26,"date"),n()(),o(27,"div",11)(28,"span",12),s(29,"Last Working Date:"),n(),o(30,"span",13),s(31),v(32,"date"),n()()()(),o(33,"div",14)(34,"div",15)(35,"div",16),g(36,"ion-icon",17),n(),o(37,"div",18)(38,"h3"),s(39,"Resignation Submitted"),n(),o(40,"p"),s(41,"Request sent to reporting manager and HR."),n()()(),o(42,"div",15)(43,"div",16),g(44,"ion-icon",17),n(),o(45,"div",18)(46,"h3"),s(47,"Manager Approval"),n(),m(48,se,2,1,"p",19)(49,ce,2,1,"p",19)(50,le,2,1,"p",20),n()(),o(51,"div",15)(52,"div",16),g(53,"ion-icon",17),n(),o(54,"div",18)(55,"h3"),s(56,"HR Approval"),n(),m(57,de,2,0,"p",19)(58,ge,2,0,"p",19)(59,me,2,1,"p",20),n()(),o(60,"div",15)(61,"div",16),g(62,"ion-icon",17),n(),o(63,"div",18)(64,"h3"),s(65,"Notice Period running"),n(),m(66,pe,9,5,"ng-container",19)(67,_e,2,0,"p",19)(68,ue,2,0,"p",19),n()(),o(69,"div",15)(70,"div",16),g(71,"ion-icon",17),n(),o(72,"div",18)(73,"h3"),s(74,"Clearance Pending"),n(),o(75,"p"),s(76,"Exit clearance status across departments:"),n(),m(77,Ce,2,2,"div",21)(78,Pe,2,0,"p",22),n()(),o(79,"div",15)(80,"div",16),g(81,"ion-icon",17),n(),o(82,"div",18)(83,"h3"),s(84,"Settlement Pending"),n(),m(85,fe,2,0,"p",19)(86,Me,2,0,"p",19)(87,Oe,2,0,"p",19),n()(),o(88,"div",23)(89,"div",16),g(90,"ion-icon",17),n(),o(91,"div",18)(92,"h3"),s(93,"Exit Completed"),n(),m(94,ve,2,0,"p",19)(95,ke,2,0,"p",19),n()()(),m(96,be,4,0,"div",24),n()()),i&2&&(r(13),A(t.resignation.status==null?null:t.resignation.status.toLowerCase()),r(),u(t.resignation.status),r(6),u(t.resignation.reason),r(5),u(k(26,56,t.resignation.created_at,"mediumDate")),r(6),u(k(32,59,t.resignation.hr_last_working_date||t.resignation.calculated_last_working_date,"mediumDate")),r(3),p("completed",t.isStepCompleted(1))("active",t.resignation.status==="Submitted"),r(2),l("name",t.isStepCompleted(1)?"checkmark-circle":"ellipse-outline"),r(6),p("completed",t.isStepCompleted(2))("active",t.resignation.status==="Manager Review"),r(2),l("name",t.isStepCompleted(2)?"checkmark-circle":"ellipse-outline"),r(4),l("ngIf",t.resignation.manager_action==="Approve"),r(),l("ngIf",t.resignation.manager_action==="Pending"),r(),l("ngIf",t.resignation.manager_remarks),r(),p("completed",t.isStepCompleted(3))("active",t.resignation.status==="HR Review"),r(2),l("name",t.isStepCompleted(3)?"checkmark-circle":"ellipse-outline"),r(4),l("ngIf",t.resignation.hr_action==="Approve"),r(),l("ngIf",t.resignation.hr_action==="Pending"&&t.resignation.status==="HR Review"),r(),l("ngIf",t.resignation.hr_remarks),r(),p("completed",t.isStepCompleted(4))("active",t.resignation.status==="Exit Clearance"),r(2),l("name",t.isStepCompleted(4)?"checkmark-circle":"ellipse-outline"),r(4),l("ngIf",t.resignation.status==="Exit Clearance"),r(),l("ngIf",t.resignation.status==="Relieved"),r(),l("ngIf",!f(62,ae).includes(t.resignation.status)),r(),p("completed",t.isStepCompleted(5))("active",t.resignation.status==="Exit Clearance"&&!t.isStepCompleted(5)),r(2),l("name",t.isStepCompleted(5)?"checkmark-circle":"ellipse-outline"),r(6),l("ngIf",t.clearanceTasks.length>0),r(),l("ngIf",t.clearanceTasks.length===0),r(),p("completed",t.isStepCompleted(6))("active",t.isStepCompleted(5)&&!t.isStepCompleted(6)),r(2),l("name",t.isStepCompleted(6)?"checkmark-circle":"ellipse-outline"),r(4),l("ngIf",(t.settlementDetails==null?null:t.settlementDetails.status)==="Paid"),r(),l("ngIf",(t.settlementDetails==null?null:t.settlementDetails.status)==="Processed"),r(),l("ngIf",!t.settlementDetails||t.settlementDetails.status==="Pending"),r(),p("completed",t.isStepCompleted(7)),r(2),l("name",t.isStepCompleted(7)?"checkmark-circle":"ellipse-outline"),r(4),l("ngIf",t.isStepCompleted(7)),r(),l("ngIf",!t.isStepCompleted(7)),r(),l("ngIf",(t.resSettings==null?null:t.resSettings.allow_employee_withdraw)!==!1&&f(63,oe).includes(t.resignation.status)))},dependencies:[U,H,$,X,j,B,q,V,G,W,Y,L],styles:[`

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
}
.modal-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.tracking-modal-content[_ngcontent-%COMP%] {
  --background: #f9fafb;
  font-family: "Inter", sans-serif;
}
.tracking-modal-content[_ngcontent-%COMP%]   .tracking-container[_ngcontent-%COMP%] {
  max-width: 600px;
  margin: 0 auto;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.submitted[_ngcontent-%COMP%], 
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.manager_review[_ngcontent-%COMP%], 
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.hr_review[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #d97706;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.approved[_ngcontent-%COMP%], 
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.exit_clearance[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #2563eb;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.relieved[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #059669;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   .status-badge.rejected[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #dc2626;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-details[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #6b7280;
}
.tracking-modal-content[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%] {
  position: relative;
  padding-left: 28px;
  margin-bottom: 30px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: #e5e7eb;
  z-index: 1;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%] {
  position: relative;
  margin-bottom: 24px;
  z-index: 2;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: -28px;
  top: 2px;
  width: 22px;
  height: 22px;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #d1d5db;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 4px 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #9ca3af;
  transition: all 0.3s ease;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.82rem;
  color: #9ca3af;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .remarks[_ngcontent-%COMP%] {
  margin-top: 6px;
  font-size: 0.8rem;
  font-style: italic;
  color: #6b7280;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%] {
  margin-top: 10px;
  background: #f3f4f6;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar-wrapper[_ngcontent-%COMP%] {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar-wrapper[_ngcontent-%COMP%]   .progress-bar-fill[_ngcontent-%COMP%] {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-stats[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #4b5563;
  margin-top: 6px;
  font-weight: 500;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .clearance-grid[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .clearance-grid[_ngcontent-%COMP%]   .dept-badge[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6b7280;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .clearance-grid[_ngcontent-%COMP%]   .dept-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 0.95rem;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .clearance-grid[_ngcontent-%COMP%]   .dept-badge.done[_ngcontent-%COMP%] {
  border-color: rgba(5, 150, 105, 0.2);
  background: rgba(5, 150, 105, 0.05);
  color: #059669;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step.completed[_ngcontent-%COMP%]   .timeline-icon[_ngcontent-%COMP%] {
  color: #059669;
  background: #ffffff;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step.completed[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #1f2937;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step.completed[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #4b5563;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step.active[_ngcontent-%COMP%]   .timeline-icon[_ngcontent-%COMP%] {
  color: #2563eb;
  background: #ffffff;
  animation: _ngcontent-%COMP%_pulse 2s infinite;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step.active[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #111827;
  font-weight: 700;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .timeline-step.active[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #374151;
}
.tracking-modal-content[_ngcontent-%COMP%]   .timeline[_ngcontent-%COMP%]   .last-step[_ngcontent-%COMP%] {
  margin-bottom: 0;
}
.tracking-modal-content[_ngcontent-%COMP%]   .cancel-container[_ngcontent-%COMP%] {
  margin-top: 30px;
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
}
.tracking-modal-content[_ngcontent-%COMP%]   .cancel-container[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
}
@keyframes _ngcontent-%COMP%_pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
}`]});let a=c;return a})();export{ee as a,we as b};
