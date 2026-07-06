import{a as ln}from"./chunk-JFCT74NZ.js";import{a as sn}from"./chunk-6KXWZ6DT.js";import{a as zn}from"./chunk-GKMRXCVX.js";import{a as z}from"./chunk-C76DRQJT.js";import"./chunk-NDCRD3QG.js";import{$ as In,A as J,B as X,Da as B,Fa as cn,Ga as Bn,H as v,I as U,J as y,K as Z,L as nn,N as Un,O as yn,Q as Fn,R as F,U as tn,V as An,W as A,X as I,Y as on,Z as E,_ as k,b as bn,c as h,d as q,e as V,g as G,h as H,ha as En,i as Mn,j as W,k as Pn,l as On,la as en,m as R,ma as an,na as rn,qa as kn,ra as L,sa as Ln,t as Q,ta as T,u as wn,v as xn,va as Tn,y as $,z as vn}from"./chunk-B3PLR2IL.js";import{Ba as x,Ca as m,Da as C,Eb as _n,F as pn,K as P,L as O,Oa as a,Pa as b,Ra as Cn,Ta as S,Ua as D,Va as Y,Vb as un,Ya as j,Zb as hn,_ as s,ca as p,ea as w,fa as mn,ja as u,m as fn,qb as K,ra as g,rb as N,sa as n,ta as t,ua as d}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as M}from"./chunk-JHI3MBHO.js";var Hn=()=>({standalone:!0});function Wn(r,c){if(r&1&&(n(0,"ion-select-option",23),a(1),t()),r&2){let l=c.$implicit;g("value",l.id),s(),b(l.name)}}function Rn(r,c){if(r&1&&(n(0,"ion-select-option",23),a(1),t()),r&2){let l=c.$implicit;g("value",l.id),s(),b(l.type_name)}}function Qn(r,c){if(r&1){let l=x();n(0,"div",32)(1,"div",33),d(2,"div",34),n(3,"span"),a(4),t()(),n(5,"div",35)(6,"div",36),d(7,"input",37),n(8,"span",38),a(9,"Days"),t()(),n(10,"div",39),d(11,"ion-checkbox",40),t(),n(12,"ion-button",41),m("click",function(){let i=P(l).index,e=C(2);return O(e.removeAllocation(i))}),d(13,"ion-icon",42),t()()()}if(r&2){let l,o=c.$implicit,i=c.index,e=C(2);g("formGroupName",i),s(4),b(e.getTypeName((l=o.get("leave_type_id"))==null?null:l.value))}}function $n(r,c){if(r&1){let l=x();n(0,"div",24)(1,"h3",25),a(2,"Leave Type Allocations"),t(),n(3,"div",26)(4,"ion-select",27),Y("ngModelChange",function(i){P(l);let e=C();return D(e.selectedNewTypeId,i)||(e.selectedNewTypeId=i),O(i)}),u(5,Rn,2,2,"ion-select-option",12),t(),n(6,"ion-button",28),m("click",function(){P(l);let i=C();return O(i.addNewAllocation())}),d(7,"ion-icon",29),a(8," Add Type "),t()(),n(9,"div",30),u(10,Qn,14,2,"div",31),t()()}if(r&2){let l=C();s(4),S("ngModel",l.selectedNewTypeId),g("ngModelOptions",j(4,Hn)),s(),g("ngForOf",l.leaveTypes),s(5),g("ngForOf",l.allocations.controls)}}function Jn(r,c){r&1&&(n(0,"div",43),d(1,"ion-icon",44),n(2,"p"),a(3,"Please select a "),n(4,"strong"),a(5,"Leave Plan"),t(),a(6," to manage allocations."),t()())}function Xn(r,c){r&1&&d(0,"ion-spinner",45)}function Zn(r,c){r&1&&(n(0,"span"),a(1,"Save & Allocate Leaves"),t())}var Yn=(()=>{let c=class c{constructor(o,i,e,f,_,gn){this.fb=o,this.modalCtrl=i,this.toastCtrl=e,this.leavePlanService=f,this.leaveTypeService=_,this.adminService=gn,this.selectedPlanId=null,this.loading=!1,this.leavePlans=[],this.leaveTypes=[],this.selectedNewTypeId=null}ngOnInit(){this.allocationForm=this.fb.group({name:[""],description:[""],allocations:this.fb.array([])}),this.loadData()}loadData(){this.leavePlanService.getLeavePlans().subscribe({next:o=>this.leavePlans=o||[]}),this.leaveTypeService.getLeaveTypes().subscribe({next:o=>this.leaveTypes=o||[]})}get allocations(){return this.allocationForm.get("allocations")}onPlanChange(o){let i=o.detail.value,e=this.leavePlans.find(f=>f.id===Number(i));e&&(this.selectedPlanId=Number(i),this.allocationForm.patchValue({name:e.name,description:e.description}),this.allocations.clear(),this.leavePlanService.getLeavePlanById(this.selectedPlanId).subscribe({next:f=>{f.allocations&&f.allocations.length&&f.allocations.forEach(_=>{this.allocations.push(this.fb.group({leave_type_id:[_.leave_type_id,h.required],days_allocated:[_.days_allocated,[h.required,h.min(1)]],prorate_on_joining:[_.prorate_on_joining===1||_.prorate_on_joining===!0]}))})}}))}addNewAllocation(){if(this.selectedNewTypeId){if(this.allocations.controls.some(o=>o.value.leave_type_id===Number(this.selectedNewTypeId))){this.showToast("This leave type is already added","warning");return}this.allocations.push(this.fb.group({leave_type_id:[Number(this.selectedNewTypeId),h.required],days_allocated:[0,[h.required,h.min(1)]],prorate_on_joining:[!0]})),this.selectedNewTypeId=null}}removeAllocation(o){this.allocations.removeAt(o)}getTypeName(o){return this.leaveTypes.find(i=>i.id===Number(o))?.type_name||"Unknown Type"}submit(){if(!this.selectedPlanId){this.showToast("Please select a Leave Plan first","warning");return}if(this.allocations.length===0){this.showToast("Please add at least one allocation before saving","danger");return}if(this.allocationForm.invalid){this.allocationForm.markAllAsTouched(),this.showToast("Please fill all required fields in the allocations (Minimum 1 day)","danger");return}this.loading=!0,this.adminService.updateBulkLeaveAllocation(this.selectedPlanId,this.allocationForm.value).subscribe({next:()=>{this.loading=!1,this.showToast("Leave allocation updated successfully","success"),this.dismiss()},error:()=>{this.loading=!1,this.showToast("Failed to update leave allocation","danger")}})}dismiss(){this.modalCtrl.dismiss()}showToast(o,i){return M(this,null,function*(){(yield this.toastCtrl.create({message:o,duration:2e3,color:i,position:"top"})).present()})}};c.\u0275fac=function(i){return new(i||c)(p(Q),p(B),p(cn),p(ln),p(sn),p(z))},c.\u0275cmp=w({type:c,selectors:[["app-leaves-allocation-modal"]],standalone:!1,decls:42,vars:8,consts:[["color","primary"],["slot","end"],[3,"click"],[1,"ion-padding","page-containerOn"],[1,"welcome-section","mb-20"],[1,"page-title"],[1,"sub-text"],[1,"form-card"],[3,"formGroup"],["lines","outline",1,"mb-20"],["position","stacked"],["placeholder","Select Leave Plan","interface","popover",3,"ionChange","value"],[3,"value",4,"ngFor","ngForOf"],["formControlName","name","readonly","true"],["formControlName","description","rows","3","readonly","true"],["style","margin-top: 24px;",4,"ngIf"],["class","empty-state",4,"ngIf"],[1,"footer-toolbar"],[1,"action-buttons"],["fill","outline","color","medium",3,"click"],["color","primary",3,"click","disabled"],["name","crescent",4,"ngIf"],[4,"ngIf"],[3,"value"],[2,"margin-top","24px"],[1,"section-title"],[1,"add-allocation-box"],["placeholder","-- Select Leave Type --",1,"leave-select",3,"ngModelChange","ngModel","ngModelOptions"],["color","primary",3,"click"],["name","add","slot","start"],["formArrayName","allocations"],["class","allocation-row",3,"formGroupName",4,"ngFor","ngForOf"],[1,"allocation-row",3,"formGroupName"],[1,"allocation-name"],[1,"blue-dot"],[1,"allocation-actions"],[1,"days-input-group"],["type","number","formControlName","days_allocated",1,"days-input"],[1,"days-label"],[1,"prorate-group",2,"display","none"],["formControlName","prorate_on_joining"],["fill","clear","color","danger",1,"trash-btn",3,"click"],["name","trash-outline","slot","icon-only"],[1,"empty-state"],["name","layers-outline"],["name","crescent"]],template:function(i,e){i&1&&(n(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),a(3,"Leave Allocation"),t(),n(4,"ion-buttons",1)(5,"ion-button",2),m("click",function(){return e.dismiss()}),a(6,"Close"),t()()()(),n(7,"ion-content",3)(8,"div",4)(9,"h4",5),a(10,"Leave Allocation"),t(),n(11,"p",6),a(12,"Allocate leaves to employees"),t()(),n(13,"ion-card",7)(14,"ion-card-header")(15,"ion-card-title"),a(16,"Leave Plan Details"),t()(),n(17,"ion-card-content")(18,"form",8)(19,"ion-item",9)(20,"ion-label",10),a(21,"Leave Plan"),t(),n(22,"ion-select",11),m("ionChange",function(_){return e.onPlanChange(_)}),u(23,Wn,2,2,"ion-select-option",12),t()(),n(24,"ion-item",9)(25,"ion-label",10),a(26,"Leave Plan Name"),t(),d(27,"ion-input",13),t(),n(28,"ion-item",9)(29,"ion-label",10),a(30,"Description"),t(),d(31,"ion-textarea",14),t(),u(32,$n,11,5,"div",15)(33,Jn,7,0,"div",16),t()()()(),n(34,"ion-footer")(35,"ion-toolbar",17)(36,"div",18)(37,"ion-button",19),m("click",function(){return e.dismiss()}),a(38,"Cancel"),t(),n(39,"ion-button",20),m("click",function(){return e.submit()}),u(40,Xn,1,0,"ion-spinner",21)(41,Zn,2,0,"span",22),t()()()()),i&2&&(s(18),g("formGroup",e.allocationForm),s(4),g("value",e.selectedPlanId),s(),g("ngForOf",e.leavePlans),s(9),g("ngIf",e.selectedPlanId),s(),g("ngIf",!e.selectedPlanId),s(6),g("disabled",e.loading||!e.selectedPlanId),s(),g("ngIf",e.loading),s(),g("ngIf",!e.loading))},dependencies:[K,N,H,bn,Mn,q,V,G,W,R,Pn,On,v,U,y,Z,nn,Un,yn,F,tn,A,I,on,E,k,en,an,rn,kn,L,T,$,J,X],styles:[`

.mb-20[_ngcontent-%COMP%] {
  margin-bottom: 20px;
}
.page-containerOn[_ngcontent-%COMP%] {
  --background: #f8f9fc;
}
.welcome-section[_ngcontent-%COMP%] {
  margin-bottom: 15px;
}
.page-title[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-size: 1.5rem;
}
.sub-text[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 5px;
}
.form-card[_ngcontent-%COMP%] {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.section-title[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #334155;
  margin-bottom: 12px;
  font-size: 1.1rem;
  border-left: 4px solid #3b82f6;
  padding-left: 12px;
}
.add-allocation-box[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.leave-select[_ngcontent-%COMP%] {
  flex: 1;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: white;
  padding-left: 10px;
}
.allocation-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.allocation-name[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}
.blue-dot[_ngcontent-%COMP%] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.4);
}
.allocation-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
}
.allocation-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.days-input-group[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.days-input[_ngcontent-%COMP%] {
  width: 70px;
  text-align: center;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  outline: none;
  background: #f1f5f9;
}
.days-label[_ngcontent-%COMP%] {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.trash-btn[_ngcontent-%COMP%] {
  border-left: 1px solid #e2e8f0;
  padding-left: 12px;
  margin: 0;
}
.empty-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
  margin-top: 20px;
}
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #cbd5e1;
  margin-bottom: 12px;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 1rem;
}
.footer-toolbar[_ngcontent-%COMP%] {
  padding: 10px;
}
.action-buttons[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}`]});let r=c;return r})();var nt=()=>({standalone:!0});function tt(r,c){if(r&1){let l=x();n(0,"ion-item",31),m("click",function(){let i=P(l).$implicit,e=C(3);return O(e.selectEmp(i))}),a(1),t()}if(r&2){let l=c.$implicit;s(),Cn(" ",l.FullName," (",l.id,") ")}}function ot(r,c){if(r&1&&(n(0,"div",29),u(1,tt,2,2,"ion-item",30),t()),r&2){let l=C(2);s(),g("ngForOf",l.filteredEmps)}}function et(r,c){if(r&1&&(n(0,"div",32),d(1,"ion-icon",33),a(2," Selected: "),n(3,"b"),a(4),t()()),r&2){let l=C(2);s(4),b(l.selectedEmp.FullName)}}function it(r,c){if(r&1){let l=x();n(0,"div",24)(1,"ion-item",25)(2,"ion-label",14),a(3,"Employee"),t(),n(4,"ion-input",26),Y("ngModelChange",function(i){P(l);let e=C();return D(e.empSearch,i)||(e.empSearch=i),O(i)}),m("ionInput",function(i){P(l);let e=C();return O(e.searchEmp(i))}),t()(),u(5,ot,2,1,"div",27)(6,et,5,1,"div",28),t()}if(r&2){let l=C();s(4),S("ngModel",l.empSearch),g("ngModelOptions",j(4,nt)),s(),g("ngIf",l.filteredEmps.length>0),s(),g("ngIf",l.selectedEmp)}}function at(r,c){if(r&1&&(n(0,"ion-select-option",34),a(1),t()),r&2){let l=c.$implicit;g("value",l.id),s(),b(l.name)}}function rt(r,c){r&1&&d(0,"ion-spinner",35)}function ct(r,c){r&1&&(n(0,"span"),a(1,"Initialize Leave Balance"),t())}var jn=(()=>{let c=class c{constructor(o,i,e,f,_,gn){this.fb=o,this.modalCtrl=i,this.toastCtrl=e,this.leavePlanService=f,this.adminService=_,this.employeeService=gn,this.loading=!1,this.applyForAll=!1,this.leavePlans=[],this.allEmps=[],this.filteredEmps=[],this.selectedEmp=null,this.empSearch=""}ngOnInit(){this.initForm=this.fb.group({employee_id:["",h.required],leave_plan_id:[null,h.required],leave_year:[new Date().getFullYear(),h.required]}),this.loadData()}loadData(){this.leavePlanService.getLeavePlans().subscribe(o=>this.leavePlans=o||[]),this.employeeService.getAllEmployees(1,1e3).subscribe(o=>this.allEmps=o.data||[])}onToggleAll(o){this.applyForAll=o.detail.checked,this.applyForAll?(this.initForm.get("employee_id")?.disable(),this.selectedEmp=null,this.empSearch=""):this.initForm.get("employee_id")?.enable()}searchEmp(o){let i=o.detail.value?.toLowerCase()||"";if(i.length<2){this.filteredEmps=[];return}this.filteredEmps=this.allEmps.filter(e=>e.FullName?.toLowerCase().includes(i)||e.id.toString().includes(i)).slice(0,10)}selectEmp(o){this.selectedEmp=o,this.empSearch=o.FullName,this.initForm.patchValue({employee_id:o.id}),this.filteredEmps=[]}submit(){return M(this,null,function*(){if(!this.applyForAll&&this.initForm.invalid){this.showToast("Please fill all required fields.","warning");return}this.loading=!0;let o={leave_plan_id:this.initForm.get("leave_plan_id")?.value,leave_year:this.initForm.get("leave_year")?.value};if(this.applyForAll)try{yield Promise.all(this.allEmps.map(i=>fn(this.adminService.initializeLeaveBalance(i.id,o)))),this.showToast("Leave balance initialized for all employees","success"),this.dismiss()}catch{this.showToast("Some employees failed to initialize","warning"),this.dismiss()}finally{this.loading=!1}else{let i=this.initForm.get("employee_id")?.value;this.adminService.initializeLeaveBalance(i,o).subscribe({next:()=>{this.loading=!1,this.showToast("Leave balance initialized","success"),this.dismiss()},error:()=>{this.loading=!1,this.showToast("Operation failed","danger")}})}})}dismiss(){this.modalCtrl.dismiss()}showToast(o,i){return M(this,null,function*(){(yield this.toastCtrl.create({message:o,duration:2e3,color:i,position:"top"})).present()})}};c.\u0275fac=function(i){return new(i||c)(p(Q),p(B),p(cn),p(ln),p(z),p(zn))},c.\u0275cmp=w({type:c,selectors:[["app-leave-initialize-modal"]],standalone:!1,decls:39,vars:6,consts:[["color","primary"],["slot","end"],[3,"click"],[1,"ion-padding","page-containerOn"],[1,"initializationhead","mb-20"],[1,"page-title"],[1,"sub-text"],[1,"form-card"],[3,"formGroup"],["lines","none",1,"allocation-ipt","form-continer"],["color","light",1,"toggle-item","mb-20",2,"border-radius","8px"],[3,"ionChange"],["class","mb-20",4,"ngIf"],["lines","outline",1,"mb-20"],["position","stacked"],["formControlName","leave_plan_id","placeholder","Select Leave Plan","interface","popover","toggleIcon","chevron-down","expandedIcon","chevron-up"],[3,"value",4,"ngFor","ngForOf"],["type","number","formControlName","leave_year"],[1,"footer-toolbar"],[1,"action-buttons"],["fill","outline","color","medium",3,"click"],["color","primary",3,"click","disabled"],["name","crescent",4,"ngIf"],[4,"ngIf"],[1,"mb-20"],["lines","outline"],["placeholder","Search Name or ID",3,"ngModelChange","ionInput","ngModel","ngModelOptions"],["class","emp-dropdown",4,"ngIf"],["class","selected-badge mt-10",4,"ngIf"],[1,"emp-dropdown"],["button","","detail","false",3,"click",4,"ngFor","ngForOf"],["button","","detail","false",3,"click"],[1,"selected-badge","mt-10"],["name","checkmark-circle","color","success",1,"mr-2"],[3,"value"],["name","crescent"]],template:function(i,e){i&1&&(n(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),a(3,"Leave balance setup"),t(),n(4,"ion-buttons",1)(5,"ion-button",2),m("click",function(){return e.dismiss()}),a(6,"Close"),t()()()(),n(7,"ion-content",3)(8,"div",4)(9,"h4",5),a(10,"Configure Leave Initialization"),t(),n(11,"p",6),a(12,"Setup leave balances for employees"),t()(),n(13,"ion-card",7)(14,"ion-card-content")(15,"form",8)(16,"ion-list",9)(17,"ion-item",10)(18,"ion-label"),a(19,"Apply for all employees"),t(),n(20,"ion-toggle",11),m("ionChange",function(_){return e.onToggleAll(_)}),t()(),u(21,it,7,5,"div",12),n(22,"ion-item",13)(23,"ion-label",14),a(24,"Leave Plan"),t(),n(25,"ion-select",15),u(26,at,2,2,"ion-select-option",16),t()(),n(27,"ion-item",13)(28,"ion-label",14),a(29,"Leave Year"),t(),d(30,"ion-input",17),t()()()()()(),n(31,"ion-footer")(32,"ion-toolbar",18)(33,"div",19)(34,"ion-button",20),m("click",function(){return e.dismiss()}),a(35,"Cancel"),t(),n(36,"ion-button",21),m("click",function(){return e.submit()}),u(37,rt,1,0,"ion-spinner",22)(38,ct,2,0,"span",23),t()()()()),i&2&&(s(15),g("formGroup",e.initForm),s(6),g("ngIf",!e.applyForAll),s(5),g("ngForOf",e.leavePlans),s(10),g("disabled",e.loading),s(),g("ngIf",e.loading),s(),g("ngIf",!e.loading))},dependencies:[K,N,H,q,V,G,W,R,v,U,y,Z,F,tn,A,I,on,E,k,In,en,an,rn,L,Ln,T,$,vn,J,X],styles:[`

.mb-20[_ngcontent-%COMP%] {
  margin-bottom: 20px;
}
.mt-10[_ngcontent-%COMP%] {
  margin-top: 10px;
}
.mr-2[_ngcontent-%COMP%] {
  margin-right: 8px;
  vertical-align: middle;
}
.page-containerOn[_ngcontent-%COMP%] {
  --background: #f8f9fc;
}
.initializationhead[_ngcontent-%COMP%] {
  margin-bottom: 20px;
}
.page-title[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-size: 1.5rem;
}
.sub-text[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 5px;
}
.form-card[_ngcontent-%COMP%] {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 0;
}
.emp-dropdown[_ngcontent-%COMP%] {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background: white;
  z-index: 10;
  margin-top: -5px;
}
.selected-badge[_ngcontent-%COMP%] {
  background: #f0fdf4;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  color: #166534;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}
.footer-toolbar[_ngcontent-%COMP%] {
  padding: 10px;
}
.action-buttons[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}`]});let r=c;return r})();var Kn=(()=>{let c=class c{constructor(o,i,e,f){this.router=o,this.adminService=i,this.leaveTypesService=e,this.modalCtrl=f,this.totalLeaveTypes=0,this.totalLeavePlans=0,this.loading=!1}ngOnInit(){this.loadStats()}ionViewWillEnter(){this.loadStats()}loadStats(){this.loading=!0,this.adminService.getLeavePlans().subscribe({next:o=>{this.totalLeavePlans=o?.length||0}}),this.leaveTypesService.getLeaveTypes().subscribe({next:o=>{this.totalLeaveTypes=o?.length||0,this.loading=!1},error:()=>this.loading=!1})}navigateTo(o){this.router.navigate([o])}openAllocationModal(){return M(this,null,function*(){return yield(yield this.modalCtrl.create({component:Yn})).present()})}openInitializeModal(){return M(this,null,function*(){return yield(yield this.modalCtrl.create({component:jn})).present()})}showToast(o){return M(this,null,function*(){console.log(o)})}};c.\u0275fac=function(i){return new(i||c)(p(un),p(z),p(sn),p(B))},c.\u0275cmp=w({type:c,selectors:[["app-leaves-admin"]],standalone:!1,decls:90,vars:2,consts:[["color","primary",1,"gradient-header"],["slot","start"],["defaultHref","/administration"],[1,"ion-padding","page-containerOn"],[1,"welcome-section"],[1,"page-title"],[1,"sub-text"],[1,"leave-cards"],["size","6"],[1,"summary-card"],[1,"card-top"],[1,"card-subtitle"],["name","list-outline",1,"card-icon"],[1,"card-value"],["name","calendar-outline",1,"card-icon"],[1,"mt-20"],["size-sm","12","size-md","6"],[1,"section-title-block"],[1,"config-card"],["lines","none",1,"interact-item"],["name","options-outline","slot","start","color","primary"],["fill","clear","slot","end",3,"click"],["name","arrow-forward-circle-outline"],["name","bookmarks-outline","slot","start","color","secondary"],["name","add-circle-outline","slot","start","color","success"],["name","open-outline"],["name","refresh-circle-outline","slot","start","color","warning"],[1,"tip-banner","mt-20"],["name","information-circle-outline"]],template:function(i,e){i&1&&(n(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),d(3,"ion-back-button",2),t(),n(4,"ion-title"),a(5,"Leave Configuration Dashboard"),t()()(),n(6,"ion-content",3)(7,"div",4)(8,"h1",5),a(9,"Leaves Admin Dashboard"),t(),n(10,"p",6),a(11,"Configure leave types, plans, and employee balances"),t()(),n(12,"ion-grid")(13,"ion-row",7)(14,"ion-col",8)(15,"ion-card",9)(16,"ion-card-header")(17,"div",10)(18,"span",11),a(19,"Leave Types"),t(),d(20,"ion-icon",12),t(),n(21,"h2",13),a(22),t()()()(),n(23,"ion-col",8)(24,"ion-card",9)(25,"ion-card-header")(26,"div",10)(27,"span",11),a(28,"Active Plans"),t(),d(29,"ion-icon",14),t(),n(30,"h2",13),a(31),t()()()()()(),n(32,"ion-grid",15)(33,"ion-row")(34,"ion-col",16)(35,"div",17)(36,"h3"),a(37,"Leave Configuration"),t(),n(38,"p"),a(39,"Set up and manage leave categories"),t()(),n(40,"ion-card",18)(41,"ion-item",19),d(42,"ion-icon",20),n(43,"ion-label")(44,"h2"),a(45,"Manage Leave Types"),t(),n(46,"p"),a(47,"Categories like Casual, Sick, etc."),t()(),n(48,"ion-button",21),m("click",function(){return e.navigateTo("/administration/leave-types")}),d(49,"ion-icon",22),t()()(),n(50,"ion-card",18)(51,"ion-item",19),d(52,"ion-icon",23),n(53,"ion-label")(54,"h2"),a(55,"Manage Leave Plans"),t(),n(56,"p"),a(57,"Yearly plans and assignment rules"),t()(),n(58,"ion-button",21),m("click",function(){return e.navigateTo("/administration/leave-plans")}),d(59,"ion-icon",22),t()()()(),n(60,"ion-col",16)(61,"div",17)(62,"h3"),a(63,"Leave Administration"),t(),n(64,"p"),a(65,"Manage employee balances & allocations"),t()(),n(66,"ion-card",18)(67,"ion-item",19),d(68,"ion-icon",24),n(69,"ion-label")(70,"h2"),a(71,"Bulk Allocation"),t(),n(72,"p"),a(73,"Assign leaves to groups"),t()(),n(74,"ion-button",21),m("click",function(){return e.openAllocationModal()}),d(75,"ion-icon",25),t()()(),n(76,"ion-card",18)(77,"ion-item",19),d(78,"ion-icon",26),n(79,"ion-label")(80,"h2"),a(81,"Initialize Balance"),t(),n(82,"p"),a(83,"Set starting quotas for year"),t()(),n(84,"ion-button",21),m("click",function(){return e.openInitializeModal()}),d(85,"ion-icon",25),t()()()()()(),n(86,"div",27),d(87,"ion-icon",28),n(88,"p"),a(89,"Configure leave types first before creating leave plans for accuracy."),t()()()),i&2&&(s(22),b(e.totalLeaveTypes),s(9),b(e.totalLeavePlans))},dependencies:[v,U,y,nn,Fn,F,An,A,I,E,k,En,L,T,Tn],styles:[`@charset "UTF-8";



[_ngcontent-%COMP%]:root {
  --ion-color-primary: #0054e9;
  --ion-color-primary-rgb:
    0,
    84,
    233;
  --ion-color-primary-contrast: #fff;
  --ion-color-primary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-primary-shade: #004acd;
  --ion-color-primary-tint: #1a65eb;
  --ion-color-secondary: #0163aa;
  --ion-color-secondary-rgb:
    1,
    99,
    170;
  --ion-color-secondary-contrast: #fff;
  --ion-color-secondary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-secondary-shade: #015796;
  --ion-color-secondary-tint: #1a73b3;
  --ion-color-tertiary: #6030ff;
  --ion-color-tertiary-rgb:
    96,
    48,
    255;
  --ion-color-tertiary-contrast: #fff;
  --ion-color-tertiary-contrast-rgb:
    255,
    255,
    255;
  --ion-color-tertiary-shade: #542ae0;
  --ion-color-tertiary-tint: #7045ff;
  --ion-color-success: #2dd55b;
  --ion-color-success-rgb:
    45,
    213,
    91;
  --ion-color-success-contrast: #000;
  --ion-color-success-contrast-rgb:
    0,
    0,
    0;
  --ion-color-success-shade: #28bb50;
  --ion-color-success-tint: #42d96b;
  --ion-color-warning: #ffc409;
  --ion-color-warning-rgb:
    255,
    196,
    9;
  --ion-color-warning-contrast: #000;
  --ion-color-warning-contrast-rgb:
    0,
    0,
    0;
  --ion-color-warning-shade: #e0ac08;
  --ion-color-warning-tint: #ffca22;
  --ion-color-danger: #c5000f;
  --ion-color-danger-rgb:
    197,
    0,
    15;
  --ion-color-danger-contrast: #fff;
  --ion-color-danger-contrast-rgb:
    255,
    255,
    255;
  --ion-color-danger-shade: #ad000d;
  --ion-color-danger-tint: #cb1a27;
  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb:
    244,
    245,
    248;
  --ion-color-light-contrast: #000;
  --ion-color-light-contrast-rgb:
    0,
    0,
    0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;
  --ion-color-medium: #636469;
  --ion-color-medium-rgb:
    99,
    100,
    105;
  --ion-color-medium-contrast: #fff;
  --ion-color-medium-contrast-rgb:
    255,
    255,
    255;
  --ion-color-medium-shade: #57585c;
  --ion-color-medium-tint: #737478;
  --ion-color-dark: #222428;
  --ion-color-dark-rgb:
    34,
    36,
    40;
  --ion-color-dark-contrast: #fff;
  --ion-color-dark-contrast-rgb:
    255,
    255,
    255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;
}
html.ios[_ngcontent-%COMP%] {
  --ion-default-font:
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Roboto",
    sans-serif;
}
html.md[_ngcontent-%COMP%] {
  --ion-default-font:
    "Roboto",
    "Helvetica Neue",
    sans-serif;
}
html[_ngcontent-%COMP%] {
  --ion-dynamic-font: -apple-system-body;
  --ion-font-family: var(--ion-default-font);
}
body[_ngcontent-%COMP%] {
  background: var(--ion-background-color);
  color: var(--ion-text-color);
}
body.backdrop-no-scroll[_ngcontent-%COMP%] {
  overflow: hidden;
}
html.ios[_ngcontent-%COMP%]   ion-modal.modal-card[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:first-of-type, 
html.ios[_ngcontent-%COMP%]   ion-modal.modal-sheet[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:first-of-type, 
html.ios[_ngcontent-%COMP%]   ion-modal[_ngcontent-%COMP%]   ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:first-of-type, 
html.ios[_ngcontent-%COMP%]   ion-footer.modal-footer-moving[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:first-of-type {
  padding-top: 6px;
}
html.ios[_ngcontent-%COMP%]   ion-modal.modal-card[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:last-of-type, 
html.ios[_ngcontent-%COMP%]   ion-modal.modal-sheet[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:last-of-type {
  padding-bottom: 6px;
}
html.ios[_ngcontent-%COMP%]   ion-modal[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%], 
html.ios[_ngcontent-%COMP%]   .modal-footer-moving[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  padding-right: calc(var(--ion-safe-area-right) + 8px);
  padding-left: calc(var(--ion-safe-area-left) + 8px);
}
@media screen and (min-width: 768px) {
  html.ios[_ngcontent-%COMP%]   ion-modal.modal-card[_ngcontent-%COMP%]:first-of-type {
    --backdrop-opacity: 0.18;
  }
}
ion-modal.modal-default.show-modal[_ngcontent-%COMP%]    ~ ion-modal.modal-default[_ngcontent-%COMP%] {
  --backdrop-opacity: 0;
  --box-shadow: none;
}
html.ios[_ngcontent-%COMP%]   ion-modal.modal-card[_ngcontent-%COMP%]   .ion-page[_ngcontent-%COMP%] {
  border-top-left-radius: var(--border-radius);
}
.ion-color-primary[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-primary, #0054e9) !important;
  --ion-color-base-rgb: var(--ion-color-primary-rgb, 0, 84, 233) !important;
  --ion-color-contrast: var(--ion-color-primary-contrast, #fff) !important;
  --ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-primary-shade, #004acd) !important;
  --ion-color-tint: var(--ion-color-primary-tint, #1a65eb) !important;
}
.ion-color-secondary[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-secondary, #0163aa) !important;
  --ion-color-base-rgb: var(--ion-color-secondary-rgb, 1, 99, 170) !important;
  --ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;
  --ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-secondary-shade, #015796) !important;
  --ion-color-tint: var(--ion-color-secondary-tint, #1a73b3) !important;
}
.ion-color-tertiary[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-tertiary, #6030ff) !important;
  --ion-color-base-rgb: var(--ion-color-tertiary-rgb, 96, 48, 255) !important;
  --ion-color-contrast: var(--ion-color-tertiary-contrast, #fff) !important;
  --ion-color-contrast-rgb: var(--ion-color-tertiary-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-tertiary-shade, #542ae0) !important;
  --ion-color-tint: var(--ion-color-tertiary-tint, #7045ff) !important;
}
.ion-color-success[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-success, #2dd55b) !important;
  --ion-color-base-rgb: var(--ion-color-success-rgb, 45, 213, 91) !important;
  --ion-color-contrast: var(--ion-color-success-contrast, #000) !important;
  --ion-color-contrast-rgb: var(--ion-color-success-contrast-rgb, 0, 0, 0) !important;
  --ion-color-shade: var(--ion-color-success-shade, #28bb50) !important;
  --ion-color-tint: var(--ion-color-success-tint, #42d96b) !important;
}
.ion-color-warning[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-warning, #ffc409) !important;
  --ion-color-base-rgb: var(--ion-color-warning-rgb, 255, 196, 9) !important;
  --ion-color-contrast: var(--ion-color-warning-contrast, #000) !important;
  --ion-color-contrast-rgb: var(--ion-color-warning-contrast-rgb, 0, 0, 0) !important;
  --ion-color-shade: var(--ion-color-warning-shade, #e0ac08) !important;
  --ion-color-tint: var(--ion-color-warning-tint, #ffca22) !important;
}
.ion-color-danger[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-danger, #c5000f) !important;
  --ion-color-base-rgb: var(--ion-color-danger-rgb, 197, 0, 15) !important;
  --ion-color-contrast: var(--ion-color-danger-contrast, #fff) !important;
  --ion-color-contrast-rgb: var(--ion-color-danger-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-danger-shade, #ad000d) !important;
  --ion-color-tint: var(--ion-color-danger-tint, #cb1a27) !important;
}
.ion-color-light[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-light, #f4f5f8) !important;
  --ion-color-base-rgb: var(--ion-color-light-rgb, 244, 245, 248) !important;
  --ion-color-contrast: var(--ion-color-light-contrast, #000) !important;
  --ion-color-contrast-rgb: var(--ion-color-light-contrast-rgb, 0, 0, 0) !important;
  --ion-color-shade: var(--ion-color-light-shade, #d7d8da) !important;
  --ion-color-tint: var(--ion-color-light-tint, #f5f6f9) !important;
}
.ion-color-medium[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-medium, #636469) !important;
  --ion-color-base-rgb: var(--ion-color-medium-rgb, 99, 100, 105) !important;
  --ion-color-contrast: var(--ion-color-medium-contrast, #fff) !important;
  --ion-color-contrast-rgb: var(--ion-color-medium-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-medium-shade, #57585c) !important;
  --ion-color-tint: var(--ion-color-medium-tint, #737478) !important;
}
.ion-color-dark[_ngcontent-%COMP%] {
  --ion-color-base: var(--ion-color-dark, #222428) !important;
  --ion-color-base-rgb: var(--ion-color-dark-rgb, 34, 36, 40) !important;
  --ion-color-contrast: var(--ion-color-dark-contrast, #fff) !important;
  --ion-color-contrast-rgb: var(--ion-color-dark-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-dark-shade, #1e2023) !important;
  --ion-color-tint: var(--ion-color-dark-tint, #383a3e) !important;
}
.ion-page[_ngcontent-%COMP%] {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  contain: layout size style;
  z-index: 0;
}
ion-modal[_ngcontent-%COMP%]    > .ion-page[_ngcontent-%COMP%] {
  position: relative;
  contain: layout style;
  height: 100%;
}
.split-pane-visible[_ngcontent-%COMP%]    > .ion-page.split-pane-main[_ngcontent-%COMP%] {
  position: relative;
}
ion-route[_ngcontent-%COMP%], 
ion-route-redirect[_ngcontent-%COMP%], 
ion-router[_ngcontent-%COMP%], 
ion-select-option[_ngcontent-%COMP%], 
ion-nav-controller[_ngcontent-%COMP%], 
ion-menu-controller[_ngcontent-%COMP%], 
ion-action-sheet-controller[_ngcontent-%COMP%], 
ion-alert-controller[_ngcontent-%COMP%], 
ion-loading-controller[_ngcontent-%COMP%], 
ion-modal-controller[_ngcontent-%COMP%], 
ion-picker-controller[_ngcontent-%COMP%], 
ion-popover-controller[_ngcontent-%COMP%], 
ion-toast-controller[_ngcontent-%COMP%], 
.ion-page-hidden[_ngcontent-%COMP%] {
  display: none !important;
}
.ion-page-invisible[_ngcontent-%COMP%] {
  opacity: 0;
}
.can-go-back[_ngcontent-%COMP%]    > ion-header[_ngcontent-%COMP%]   ion-back-button[_ngcontent-%COMP%] {
  display: block;
}
html.plt-ios.plt-hybrid[_ngcontent-%COMP%], 
html.plt-ios.plt-pwa[_ngcontent-%COMP%] {
  --ion-statusbar-padding: 20px;
}
@supports (padding-top: 20px) {
  html[_ngcontent-%COMP%] {
    --ion-safe-area-top: var(--ion-statusbar-padding);
  }
}
@supports (padding-top: env(safe-area-inset-top)) {
  html[_ngcontent-%COMP%] {
    --ion-safe-area-top: env(safe-area-inset-top);
    --ion-safe-area-bottom: env(safe-area-inset-bottom);
    --ion-safe-area-left: env(safe-area-inset-left);
    --ion-safe-area-right: env(safe-area-inset-right);
  }
}
ion-card.ion-color[_ngcontent-%COMP%]   .ion-inherit-color[_ngcontent-%COMP%], 
ion-card-header.ion-color[_ngcontent-%COMP%]   .ion-inherit-color[_ngcontent-%COMP%] {
  color: inherit;
}
.menu-content[_ngcontent-%COMP%] {
  transform: translate3d(0, 0, 0);
}
.menu-content-open[_ngcontent-%COMP%] {
  cursor: pointer;
  touch-action: manipulation;
  pointer-events: none;
  overflow-y: hidden;
}
.menu-content-open[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {
  --overflow: hidden;
}
.menu-content-open[_ngcontent-%COMP%]   .ion-content-scroll-host[_ngcontent-%COMP%] {
  overflow: hidden;
}
.ios[_ngcontent-%COMP%]   .menu-content-reveal[_ngcontent-%COMP%] {
  box-shadow: -8px 0 42px rgba(0, 0, 0, .08);
}
[dir=rtl].ios[_ngcontent-%COMP%]   .menu-content-reveal[_ngcontent-%COMP%] {
  box-shadow: 8px 0 42px rgba(0, 0, 0, .08);
}
.md[_ngcontent-%COMP%]   .menu-content-reveal[_ngcontent-%COMP%] {
  box-shadow: 4px 0px 16px rgba(0, 0, 0, .18);
}
.md[_ngcontent-%COMP%]   .menu-content-push[_ngcontent-%COMP%] {
  box-shadow: 4px 0px 16px rgba(0, 0, 0, .18);
}
ion-accordion-group.accordion-group-expand-inset[_ngcontent-%COMP%]    > ion-accordion[_ngcontent-%COMP%]:first-of-type {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
ion-accordion-group.accordion-group-expand-inset[_ngcontent-%COMP%]    > ion-accordion[_ngcontent-%COMP%]:last-of-type {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
ion-accordion-group[_ngcontent-%COMP%]    > ion-accordion[_ngcontent-%COMP%]:last-of-type   ion-item[slot=header][_ngcontent-%COMP%] {
  --border-width: 0px;
}
ion-accordion.accordion-animated[_ngcontent-%COMP%]    > [slot=header][_ngcontent-%COMP%]   .ion-accordion-toggle-icon[_ngcontent-%COMP%] {
  transition: 300ms transform cubic-bezier(0.25, 0.8, 0.5, 1);
}
@media (prefers-reduced-motion: reduce) {
  ion-accordion[_ngcontent-%COMP%]   .ion-accordion-toggle-icon[_ngcontent-%COMP%] {
    transition: none !important;
  }
}
ion-accordion.accordion-expanding[_ngcontent-%COMP%]    > [slot=header][_ngcontent-%COMP%]   .ion-accordion-toggle-icon[_ngcontent-%COMP%], 
ion-accordion.accordion-expanded[_ngcontent-%COMP%]    > [slot=header][_ngcontent-%COMP%]   .ion-accordion-toggle-icon[_ngcontent-%COMP%] {
  transform: rotate(180deg);
}
ion-accordion-group.accordion-group-expand-inset.md[_ngcontent-%COMP%]    > ion-accordion.accordion-previous[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%] {
  --border-width: 0px;
  --inner-border-width: 0px;
}
ion-accordion-group.accordion-group-expand-inset.md[_ngcontent-%COMP%]    > ion-accordion.accordion-expanding[_ngcontent-%COMP%]:first-of-type, 
ion-accordion-group.accordion-group-expand-inset.md[_ngcontent-%COMP%]    > ion-accordion.accordion-expanded[_ngcontent-%COMP%]:first-of-type {
  margin-top: 0;
}
ion-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-date-and-time-value {
  text-align: start;
}
.ion-datetime-button-overlay[_ngcontent-%COMP%] {
  --width: fit-content;
  --height: fit-content;
}
.ion-datetime-button-overlay[_ngcontent-%COMP%]   ion-datetime.datetime-grid[_ngcontent-%COMP%] {
  width: 320px;
  min-height: 320px;
}
[ion-last-focus][_ngcontent-%COMP%], 
header[tabindex="-1"][_ngcontent-%COMP%]:focus, 
[role=banner][tabindex="-1"][_ngcontent-%COMP%]:focus, 
main[tabindex="-1"][_ngcontent-%COMP%]:focus, 
[role=main][tabindex="-1"][_ngcontent-%COMP%]:focus, 
h1[tabindex="-1"][_ngcontent-%COMP%]:focus, 
[role=heading][aria-level="1"][tabindex="-1"][_ngcontent-%COMP%]:focus {
  outline: none;
}
.popover-viewport[_ngcontent-%COMP%]:has(> ion-content) {
  overflow: hidden;
}
@supports not selector(:has(> ion-content)) {
  .popover-viewport[_ngcontent-%COMP%] {
    overflow: hidden;
  }
}



audio[_ngcontent-%COMP%], 
canvas[_ngcontent-%COMP%], 
progress[_ngcontent-%COMP%], 
video[_ngcontent-%COMP%] {
  vertical-align: baseline;
}
audio[_ngcontent-%COMP%]:not([controls]) {
  display: none;
  height: 0;
}
b[_ngcontent-%COMP%], 
strong[_ngcontent-%COMP%] {
  font-weight: bold;
}
img[_ngcontent-%COMP%] {
  max-width: 100%;
}
hr[_ngcontent-%COMP%] {
  height: 1px;
  border-width: 0;
  box-sizing: content-box;
}
pre[_ngcontent-%COMP%] {
  overflow: auto;
}
code[_ngcontent-%COMP%], 
kbd[_ngcontent-%COMP%], 
pre[_ngcontent-%COMP%], 
samp[_ngcontent-%COMP%] {
  font-family: monospace, monospace;
  font-size: 1em;
}
label[_ngcontent-%COMP%], 
input[_ngcontent-%COMP%], 
select[_ngcontent-%COMP%], 
textarea[_ngcontent-%COMP%] {
  font-family: inherit;
  line-height: normal;
}
textarea[_ngcontent-%COMP%] {
  overflow: auto;
  height: auto;
  font: inherit;
  color: inherit;
}
textarea[_ngcontent-%COMP%]::placeholder {
  padding-left: 2px;
}
form[_ngcontent-%COMP%], 
input[_ngcontent-%COMP%], 
optgroup[_ngcontent-%COMP%], 
select[_ngcontent-%COMP%] {
  margin: 0;
  font: inherit;
  color: inherit;
}
html[_ngcontent-%COMP%]   input[type=button][_ngcontent-%COMP%], 
input[type=reset][_ngcontent-%COMP%], 
input[type=submit][_ngcontent-%COMP%] {
  cursor: pointer;
  -webkit-appearance: button;
}
a[_ngcontent-%COMP%], 
a[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], 
a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], 
a[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
a[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], 
button[_ngcontent-%COMP%], 
button[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], 
button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], 
button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
button[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], 
.ion-tappable[_ngcontent-%COMP%], 
[tappable][_ngcontent-%COMP%], 
[tappable][_ngcontent-%COMP%]   div[_ngcontent-%COMP%], 
[tappable][_ngcontent-%COMP%]   span[_ngcontent-%COMP%], 
[tappable][_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
[tappable][_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], 
input[_ngcontent-%COMP%], 
textarea[_ngcontent-%COMP%] {
  touch-action: manipulation;
}
a[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], 
button[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  pointer-events: none;
}
button[_ngcontent-%COMP%] {
  padding: 0;
  border: 0;
  border-radius: 0;
  font-family: inherit;
  font-style: inherit;
  font-variant: inherit;
  line-height: 1;
  text-transform: none;
  cursor: pointer;
  -webkit-appearance: button;
}
[tappable][_ngcontent-%COMP%] {
  cursor: pointer;
}
a[disabled][_ngcontent-%COMP%], 
button[disabled][_ngcontent-%COMP%], 
html[_ngcontent-%COMP%]   input[disabled][_ngcontent-%COMP%] {
  cursor: default;
}
button[_ngcontent-%COMP%]::-moz-focus-inner, 
input[_ngcontent-%COMP%]::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button, 
input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button {
  height: auto;
}
input[type=search][_ngcontent-%COMP%]::-webkit-search-cancel-button, 
input[type=search][_ngcontent-%COMP%]::-webkit-search-decoration {
  -webkit-appearance: none;
}
table[_ngcontent-%COMP%] {
  border-collapse: collapse;
  border-spacing: 0;
}
td[_ngcontent-%COMP%], 
th[_ngcontent-%COMP%] {
  padding: 0;
}



*[_ngcontent-%COMP%] {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
html[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
html.ion-ce[_ngcontent-%COMP%]   body[_ngcontent-%COMP%] {
  display: block;
}
html.plt-pwa[_ngcontent-%COMP%] {
  height: 100vh;
}
body[_ngcontent-%COMP%] {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  position: fixed;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  transform: translateZ(0);
  text-rendering: optimizeLegibility;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-user-drag: none;
  -ms-content-zooming: none;
  word-wrap: break-word;
  overscroll-behavior-y: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}



html[_ngcontent-%COMP%] {
  font-family: var(--ion-font-family);
}
@supports (-webkit-touch-callout: none) {
  html[_ngcontent-%COMP%] {
    font: var(--ion-dynamic-font, 16px var(--ion-font-family));
  }
}
a[_ngcontent-%COMP%] {
  background-color: transparent;
  color: var(--ion-color-primary, #0054e9);
}
h1[_ngcontent-%COMP%], 
h2[_ngcontent-%COMP%], 
h3[_ngcontent-%COMP%], 
h4[_ngcontent-%COMP%], 
h5[_ngcontent-%COMP%], 
h6[_ngcontent-%COMP%] {
  margin-top: 16px;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.2;
}
h1[_ngcontent-%COMP%] {
  margin-top: 20px;
  font-size: 1.625rem;
}
h2[_ngcontent-%COMP%] {
  margin-top: 18px;
  font-size: 1.5rem;
}
h3[_ngcontent-%COMP%] {
  font-size: 1.375rem;
}
h4[_ngcontent-%COMP%] {
  font-size: 1.25rem;
}
h5[_ngcontent-%COMP%] {
  font-size: 1.125rem;
}
h6[_ngcontent-%COMP%] {
  font-size: 1rem;
}
small[_ngcontent-%COMP%] {
  font-size: 75%;
}
sub[_ngcontent-%COMP%], 
sup[_ngcontent-%COMP%] {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}
sup[_ngcontent-%COMP%] {
  top: -0.5em;
}
sub[_ngcontent-%COMP%] {
  bottom: -0.25em;
}



.ion-hide[_ngcontent-%COMP%] {
  display: none !important;
}
.ion-hide-up[_ngcontent-%COMP%] {
  display: none !important;
}
.ion-hide-down[_ngcontent-%COMP%] {
  display: none !important;
}
@media (min-width: 576px) {
  .ion-hide-sm-up[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (max-width: 575.98px) {
  .ion-hide-sm-down[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (min-width: 768px) {
  .ion-hide-md-up[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (max-width: 767.98px) {
  .ion-hide-md-down[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (min-width: 992px) {
  .ion-hide-lg-up[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (max-width: 991.98px) {
  .ion-hide-lg-down[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .ion-hide-xl-up[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (max-width: 1199.98px) {
  .ion-hide-xl-down[_ngcontent-%COMP%] {
    display: none !important;
  }
}



.ion-no-padding[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.ion-padding[_ngcontent-%COMP%] {
  --padding-start: var(--ion-padding, 16px);
  --padding-end: var(--ion-padding, 16px);
  --padding-top: var(--ion-padding, 16px);
  --padding-bottom: var(--ion-padding, 16px);
  -webkit-padding-start: var(--ion-padding, 16px);
  padding-inline-start: var(--ion-padding, 16px);
  -webkit-padding-end: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
}
.ion-padding-top[_ngcontent-%COMP%] {
  --padding-top: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
}
.ion-padding-start[_ngcontent-%COMP%] {
  --padding-start: var(--ion-padding, 16px);
  -webkit-padding-start: var(--ion-padding, 16px);
  padding-inline-start: var(--ion-padding, 16px);
}
.ion-padding-end[_ngcontent-%COMP%] {
  --padding-end: var(--ion-padding, 16px);
  -webkit-padding-end: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
}
.ion-padding-bottom[_ngcontent-%COMP%] {
  --padding-bottom: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
}
.ion-padding-vertical[_ngcontent-%COMP%] {
  --padding-top: var(--ion-padding, 16px);
  --padding-bottom: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
}
.ion-padding-horizontal[_ngcontent-%COMP%] {
  --padding-start: var(--ion-padding, 16px);
  --padding-end: var(--ion-padding, 16px);
  -webkit-padding-start: var(--ion-padding, 16px);
  padding-inline-start: var(--ion-padding, 16px);
  -webkit-padding-end: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
}
.ion-no-margin[_ngcontent-%COMP%] {
  --margin-start: 0;
  --margin-end: 0;
  --margin-top: 0;
  --margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.ion-margin[_ngcontent-%COMP%] {
  --margin-start: var(--ion-margin, 16px);
  --margin-end: var(--ion-margin, 16px);
  --margin-top: var(--ion-margin, 16px);
  --margin-bottom: var(--ion-margin, 16px);
  -webkit-margin-start: var(--ion-margin, 16px);
  margin-inline-start: var(--ion-margin, 16px);
  -webkit-margin-end: var(--ion-margin, 16px);
  margin-inline-end: var(--ion-margin, 16px);
  margin-top: var(--ion-margin, 16px);
  margin-bottom: var(--ion-margin, 16px);
}
.ion-margin-top[_ngcontent-%COMP%] {
  --margin-top: var(--ion-margin, 16px);
  margin-top: var(--ion-margin, 16px);
}
.ion-margin-start[_ngcontent-%COMP%] {
  --margin-start: var(--ion-margin, 16px);
  -webkit-margin-start: var(--ion-margin, 16px);
  margin-inline-start: var(--ion-margin, 16px);
}
.ion-margin-end[_ngcontent-%COMP%] {
  --margin-end: var(--ion-margin, 16px);
  -webkit-margin-end: var(--ion-margin, 16px);
  margin-inline-end: var(--ion-margin, 16px);
}
.ion-margin-bottom[_ngcontent-%COMP%] {
  --margin-bottom: var(--ion-margin, 16px);
  margin-bottom: var(--ion-margin, 16px);
}
.ion-margin-vertical[_ngcontent-%COMP%] {
  --margin-top: var(--ion-margin, 16px);
  --margin-bottom: var(--ion-margin, 16px);
  margin-top: var(--ion-margin, 16px);
  margin-bottom: var(--ion-margin, 16px);
}
.ion-margin-horizontal[_ngcontent-%COMP%] {
  --margin-start: var(--ion-margin, 16px);
  --margin-end: var(--ion-margin, 16px);
  -webkit-margin-start: var(--ion-margin, 16px);
  margin-inline-start: var(--ion-margin, 16px);
  -webkit-margin-end: var(--ion-margin, 16px);
  margin-inline-end: var(--ion-margin, 16px);
}



.ion-float-left[_ngcontent-%COMP%] {
  float: left !important;
}
.ion-float-right[_ngcontent-%COMP%] {
  float: right !important;
}
.ion-float-start[_ngcontent-%COMP%] {
  float: left !important;
}
[dir=rtl][_nghost-%COMP%]   .ion-float-start[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-start[_ngcontent-%COMP%] {
  float: right !important;
}
[dir=rtl][_ngcontent-%COMP%]   .ion-float-start[_ngcontent-%COMP%] {
  float: right !important;
}
@supports selector(:dir(rtl)) {
  .ion-float-start[_ngcontent-%COMP%]:dir(rtl) {
    float: right !important;
  }
}
.ion-float-end[_ngcontent-%COMP%] {
  float: right !important;
}
[dir=rtl][_nghost-%COMP%]   .ion-float-end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-end[_ngcontent-%COMP%] {
  float: left !important;
}
[dir=rtl][_ngcontent-%COMP%]   .ion-float-end[_ngcontent-%COMP%] {
  float: left !important;
}
@supports selector(:dir(rtl)) {
  .ion-float-end[_ngcontent-%COMP%]:dir(rtl) {
    float: left !important;
  }
}
@media (min-width: 576px) {
  .ion-float-sm-left[_ngcontent-%COMP%] {
    float: left !important;
  }
  .ion-float-sm-right[_ngcontent-%COMP%] {
    float: right !important;
  }
  .ion-float-sm-start[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-sm-start[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-sm-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-sm-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-sm-start[_ngcontent-%COMP%]:dir(rtl) {
      float: right !important;
    }
  }
  .ion-float-sm-end[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-sm-end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-sm-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-sm-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-sm-end[_ngcontent-%COMP%]:dir(rtl) {
      float: left !important;
    }
  }
}
@media (min-width: 768px) {
  .ion-float-md-left[_ngcontent-%COMP%] {
    float: left !important;
  }
  .ion-float-md-right[_ngcontent-%COMP%] {
    float: right !important;
  }
  .ion-float-md-start[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-md-start[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-md-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-md-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-md-start[_ngcontent-%COMP%]:dir(rtl) {
      float: right !important;
    }
  }
  .ion-float-md-end[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-md-end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-md-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-md-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-md-end[_ngcontent-%COMP%]:dir(rtl) {
      float: left !important;
    }
  }
}
@media (min-width: 992px) {
  .ion-float-lg-left[_ngcontent-%COMP%] {
    float: left !important;
  }
  .ion-float-lg-right[_ngcontent-%COMP%] {
    float: right !important;
  }
  .ion-float-lg-start[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-lg-start[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-lg-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-lg-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-lg-start[_ngcontent-%COMP%]:dir(rtl) {
      float: right !important;
    }
  }
  .ion-float-lg-end[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-lg-end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-lg-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-lg-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-lg-end[_ngcontent-%COMP%]:dir(rtl) {
      float: left !important;
    }
  }
}
@media (min-width: 1200px) {
  .ion-float-xl-left[_ngcontent-%COMP%] {
    float: left !important;
  }
  .ion-float-xl-right[_ngcontent-%COMP%] {
    float: right !important;
  }
  .ion-float-xl-start[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-xl-start[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-xl-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-xl-start[_ngcontent-%COMP%] {
    float: right !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-xl-start[_ngcontent-%COMP%]:dir(rtl) {
      float: right !important;
    }
  }
  .ion-float-xl-end[_ngcontent-%COMP%] {
    float: right !important;
  }
  [dir=rtl][_nghost-%COMP%]   .ion-float-xl-end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .ion-float-xl-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  [dir=rtl][_ngcontent-%COMP%]   .ion-float-xl-end[_ngcontent-%COMP%] {
    float: left !important;
  }
  @supports selector(:dir(rtl)) {
    .ion-float-xl-end[_ngcontent-%COMP%]:dir(rtl) {
      float: left !important;
    }
  }
}



.ion-text-center[_ngcontent-%COMP%] {
  text-align: center !important;
}
.ion-text-justify[_ngcontent-%COMP%] {
  text-align: justify !important;
}
.ion-text-start[_ngcontent-%COMP%] {
  text-align: start !important;
}
.ion-text-end[_ngcontent-%COMP%] {
  text-align: end !important;
}
.ion-text-left[_ngcontent-%COMP%] {
  text-align: left !important;
}
.ion-text-right[_ngcontent-%COMP%] {
  text-align: right !important;
}
.ion-text-nowrap[_ngcontent-%COMP%] {
  white-space: nowrap !important;
}
.ion-text-wrap[_ngcontent-%COMP%] {
  white-space: normal !important;
}
@media (min-width: 576px) {
  .ion-text-sm-center[_ngcontent-%COMP%] {
    text-align: center !important;
  }
  .ion-text-sm-justify[_ngcontent-%COMP%] {
    text-align: justify !important;
  }
  .ion-text-sm-start[_ngcontent-%COMP%] {
    text-align: start !important;
  }
  .ion-text-sm-end[_ngcontent-%COMP%] {
    text-align: end !important;
  }
  .ion-text-sm-left[_ngcontent-%COMP%] {
    text-align: left !important;
  }
  .ion-text-sm-right[_ngcontent-%COMP%] {
    text-align: right !important;
  }
  .ion-text-sm-nowrap[_ngcontent-%COMP%] {
    white-space: nowrap !important;
  }
  .ion-text-sm-wrap[_ngcontent-%COMP%] {
    white-space: normal !important;
  }
}
@media (min-width: 768px) {
  .ion-text-md-center[_ngcontent-%COMP%] {
    text-align: center !important;
  }
  .ion-text-md-justify[_ngcontent-%COMP%] {
    text-align: justify !important;
  }
  .ion-text-md-start[_ngcontent-%COMP%] {
    text-align: start !important;
  }
  .ion-text-md-end[_ngcontent-%COMP%] {
    text-align: end !important;
  }
  .ion-text-md-left[_ngcontent-%COMP%] {
    text-align: left !important;
  }
  .ion-text-md-right[_ngcontent-%COMP%] {
    text-align: right !important;
  }
  .ion-text-md-nowrap[_ngcontent-%COMP%] {
    white-space: nowrap !important;
  }
  .ion-text-md-wrap[_ngcontent-%COMP%] {
    white-space: normal !important;
  }
}
@media (min-width: 992px) {
  .ion-text-lg-center[_ngcontent-%COMP%] {
    text-align: center !important;
  }
  .ion-text-lg-justify[_ngcontent-%COMP%] {
    text-align: justify !important;
  }
  .ion-text-lg-start[_ngcontent-%COMP%] {
    text-align: start !important;
  }
  .ion-text-lg-end[_ngcontent-%COMP%] {
    text-align: end !important;
  }
  .ion-text-lg-left[_ngcontent-%COMP%] {
    text-align: left !important;
  }
  .ion-text-lg-right[_ngcontent-%COMP%] {
    text-align: right !important;
  }
  .ion-text-lg-nowrap[_ngcontent-%COMP%] {
    white-space: nowrap !important;
  }
  .ion-text-lg-wrap[_ngcontent-%COMP%] {
    white-space: normal !important;
  }
}
@media (min-width: 1200px) {
  .ion-text-xl-center[_ngcontent-%COMP%] {
    text-align: center !important;
  }
  .ion-text-xl-justify[_ngcontent-%COMP%] {
    text-align: justify !important;
  }
  .ion-text-xl-start[_ngcontent-%COMP%] {
    text-align: start !important;
  }
  .ion-text-xl-end[_ngcontent-%COMP%] {
    text-align: end !important;
  }
  .ion-text-xl-left[_ngcontent-%COMP%] {
    text-align: left !important;
  }
  .ion-text-xl-right[_ngcontent-%COMP%] {
    text-align: right !important;
  }
  .ion-text-xl-nowrap[_ngcontent-%COMP%] {
    white-space: nowrap !important;
  }
  .ion-text-xl-wrap[_ngcontent-%COMP%] {
    white-space: normal !important;
  }
}



.ion-text-uppercase[_ngcontent-%COMP%] {
  text-transform: uppercase !important;
}
.ion-text-lowercase[_ngcontent-%COMP%] {
  text-transform: lowercase !important;
}
.ion-text-capitalize[_ngcontent-%COMP%] {
  text-transform: capitalize !important;
}
@media (min-width: 576px) {
  .ion-text-sm-uppercase[_ngcontent-%COMP%] {
    text-transform: uppercase !important;
  }
  .ion-text-sm-lowercase[_ngcontent-%COMP%] {
    text-transform: lowercase !important;
  }
  .ion-text-sm-capitalize[_ngcontent-%COMP%] {
    text-transform: capitalize !important;
  }
}
@media (min-width: 768px) {
  .ion-text-md-uppercase[_ngcontent-%COMP%] {
    text-transform: uppercase !important;
  }
  .ion-text-md-lowercase[_ngcontent-%COMP%] {
    text-transform: lowercase !important;
  }
  .ion-text-md-capitalize[_ngcontent-%COMP%] {
    text-transform: capitalize !important;
  }
}
@media (min-width: 992px) {
  .ion-text-lg-uppercase[_ngcontent-%COMP%] {
    text-transform: uppercase !important;
  }
  .ion-text-lg-lowercase[_ngcontent-%COMP%] {
    text-transform: lowercase !important;
  }
  .ion-text-lg-capitalize[_ngcontent-%COMP%] {
    text-transform: capitalize !important;
  }
}
@media (min-width: 1200px) {
  .ion-text-xl-uppercase[_ngcontent-%COMP%] {
    text-transform: uppercase !important;
  }
  .ion-text-xl-lowercase[_ngcontent-%COMP%] {
    text-transform: lowercase !important;
  }
  .ion-text-xl-capitalize[_ngcontent-%COMP%] {
    text-transform: capitalize !important;
  }
}



.ion-align-self-start[_ngcontent-%COMP%] {
  align-self: flex-start !important;
}
.ion-align-self-end[_ngcontent-%COMP%] {
  align-self: flex-end !important;
}
.ion-align-self-center[_ngcontent-%COMP%] {
  align-self: center !important;
}
.ion-align-self-stretch[_ngcontent-%COMP%] {
  align-self: stretch !important;
}
.ion-align-self-baseline[_ngcontent-%COMP%] {
  align-self: baseline !important;
}
.ion-align-self-auto[_ngcontent-%COMP%] {
  align-self: auto !important;
}
.ion-wrap[_ngcontent-%COMP%] {
  flex-wrap: wrap !important;
}
.ion-nowrap[_ngcontent-%COMP%] {
  flex-wrap: nowrap !important;
}
.ion-wrap-reverse[_ngcontent-%COMP%] {
  flex-wrap: wrap-reverse !important;
}
.ion-justify-content-start[_ngcontent-%COMP%] {
  justify-content: flex-start !important;
}
.ion-justify-content-center[_ngcontent-%COMP%] {
  justify-content: center !important;
}
.ion-justify-content-end[_ngcontent-%COMP%] {
  justify-content: flex-end !important;
}
.ion-justify-content-around[_ngcontent-%COMP%] {
  justify-content: space-around !important;
}
.ion-justify-content-between[_ngcontent-%COMP%] {
  justify-content: space-between !important;
}
.ion-justify-content-evenly[_ngcontent-%COMP%] {
  justify-content: space-evenly !important;
}
.ion-align-items-start[_ngcontent-%COMP%] {
  align-items: flex-start !important;
}
.ion-align-items-center[_ngcontent-%COMP%] {
  align-items: center !important;
}
.ion-align-items-end[_ngcontent-%COMP%] {
  align-items: flex-end !important;
}
.ion-align-items-stretch[_ngcontent-%COMP%] {
  align-items: stretch !important;
}
.ion-align-items-baseline[_ngcontent-%COMP%] {
  align-items: baseline !important;
}



@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwkT9nA2.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwAT9nA2.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwgT9nA2.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwcT9nA2.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwsT9nA2.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwoT9nA2.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwQT9g.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwkT9nA2.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwAT9nA2.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwgT9nA2.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwcT9nA2.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwsT9nA2.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwoT9nA2.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnUwQT9g.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvvYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0460-052F,
    U+1C80-1C8A,
    U+20B4,
    U+2DE0-2DFF,
    U+A640-A69F,
    U+FE2E-FE2F;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvmYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0301,
    U+0400-045F,
    U+0490-0491,
    U+04B0-04B1,
    U+2116;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvuYwYL8g.woff2) format("woff2");
  unicode-range: U+1F00-1FFF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvhYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0370-0377,
    U+037A-037F,
    U+0384-038A,
    U+038C,
    U+038E-03A1,
    U+03A3-03FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvtYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0102-0103,
    U+0110-0111,
    U+0128-0129,
    U+0168-0169,
    U+01A0-01A1,
    U+01AF-01B0,
    U+0300-0301,
    U+0303-0304,
    U+0308-0309,
    U+0323,
    U+0329,
    U+1EA0-1EF9,
    U+20AB;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYL8g.woff2) format("woff2");
  unicode-range:
    U+0100-02BA,
    U+02BD-02C5,
    U+02C7-02CC,
    U+02CE-02D7,
    U+02DD-02FF,
    U+0304,
    U+0308,
    U+0329,
    U+1D00-1DBF,
    U+1E00-1E9F,
    U+1EF2-1EFF,
    U+2020,
    U+20A0-20AB,
    U+20AD-20C0,
    U+2113,
    U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2) format("woff2");
  unicode-range:
    U+0000-00FF,
    U+0131,
    U+0152-0153,
    U+02BB-02BC,
    U+02C6,
    U+02DA,
    U+02DC,
    U+0304,
    U+0308,
    U+0329,
    U+2000-206F,
    U+20AC,
    U+2122,
    U+2191,
    U+2193,
    U+2212,
    U+2215,
    U+FEFF,
    U+FFFD;
}



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
html.md[_ngcontent-%COMP%] {
  --ion-default-font: Inter;
}
html[_ngcontent-%COMP%], 
body[_ngcontent-%COMP%] {
  font-family: "Inter";
  color: #0f172a;
  background-color: #f4f7fb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "cv11", "ss01";
}
.fw-thin[_ngcontent-%COMP%] {
  font-weight: 300;
}
.fw-regular[_ngcontent-%COMP%] {
  font-weight: 400;
}
.fw-medium[_ngcontent-%COMP%] {
  font-weight: 500;
}
.fw-semibold[_ngcontent-%COMP%] {
  font-weight: 600;
}
.fw-bold[_ngcontent-%COMP%] {
  font-weight: 700;
}
.fw-extrabold[_ngcontent-%COMP%] {
  font-weight: 800;
}
.fw-black[_ngcontent-%COMP%] {
  font-weight: 900;
}
.fs-display[_ngcontent-%COMP%] {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 3rem);
}
.fs-heading-xl[_ngcontent-%COMP%] {
  font-size: clamp(1.375rem, 2vw + 0.5rem, 1.25rem);
}
.fs-heading-lg[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
}
.fs-heading-md[_ngcontent-%COMP%] {
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
}
.fs-heading-sm[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
}
.fs-body[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.fs-body-lg[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.4vw + 0.6rem, 1.0625rem);
}
.fs-small[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.fs-xs[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
}
.ls-tight[_ngcontent-%COMP%] {
  letter-spacing: -0.05em;
}
.ls-normal[_ngcontent-%COMP%] {
  letter-spacing: 0;
}
.ls-wide[_ngcontent-%COMP%] {
  letter-spacing: 0.025em;
}
.ls-wider[_ngcontent-%COMP%] {
  letter-spacing: 0.05em;
}
.ls-widest[_ngcontent-%COMP%] {
  letter-spacing: 0.1em;
}
.lh-tight[_ngcontent-%COMP%] {
  line-height: 1.2;
}
.lh-snug[_ngcontent-%COMP%] {
  line-height: 1.35;
}
.lh-normal[_ngcontent-%COMP%] {
  line-height: 1.5;
}
.lh-relaxed[_ngcontent-%COMP%] {
  line-height: 1.65;
}
.lh-loose[_ngcontent-%COMP%] {
  line-height: 2;
}
.text-display[_ngcontent-%COMP%] {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 3rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.2;
  font-family: "Inter";
}
.text-heading-xl[_ngcontent-%COMP%] {
  font-size: clamp(1.375rem, 2vw + 0.5rem, 1.25rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.2;
}
.text-heading-lg[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  line-height: 1.35;
}
.text-heading-md[_ngcontent-%COMP%] {
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
  font-weight: 700;
  line-height: 1.35;
}
.text-heading-sm[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 600;
  line-height: 1.5;
}
.text-body[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 400;
  line-height: 1.5;
}
.text-body-bold[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 600;
  line-height: 1.5;
}
.text-small[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 400;
  line-height: 1.5;
}
.text-small-bold[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  line-height: 1.5;
}
.text-xs[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  line-height: 1.5;
}
.text-label[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 700;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}
.text-mono[_ngcontent-%COMP%] {
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
}
ion-split-pane[_ngcontent-%COMP%] {
  --side-min-width: 88px !important;
  --side-max-width: 88px !important;
  --side-width: 88px !important;
}
ion-list[_ngcontent-%COMP%] {
  padding: 0 !important;
}
ion-list-header[_ngcontent-%COMP%], 
ion-item[_ngcontent-%COMP%] {
  border: none;
  border-radius: 0 !important;
  min-height: 0;
  --padding: 0px !important;
  --padding-end: 0px !important;
}
#main-content[_ngcontent-%COMP%] {
  --background: #f4f7fb;
}
ion-menu[_ngcontent-%COMP%]   ion-content.sidenav-content[_ngcontent-%COMP%] {
  --background: #0f2b4a;
}
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --background: transparent;
  --color: #a0b4cc;
  margin-bottom: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}
ion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #ffffff;
  border-radius: 12px;
}
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .row-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  gap: 4px;
}
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .row-left[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 9px;
  text-align: center;
  white-space: normal;
}
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .row-left[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .row-left[_ngcontent-%COMP%]   lord-icon[_ngcontent-%COMP%] {
  font-size: 22px;
}
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .active-menu[_ngcontent-%COMP%] {
  display: none;
}
ion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .inactive-menu[_ngcontent-%COMP%] {
  display: block;
}
ion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%]   .active-menu[_ngcontent-%COMP%] {
  display: block;
}
ion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%]   .inactive-menu[_ngcontent-%COMP%] {
  display: none;
}
ion-menu.side-menu-list[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%] {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 !important;
  background: #0f2b4a;
}
.main-content-block[_ngcontent-%COMP%] {
  --ion-background-color: #f4f7fb;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
}
.row-center[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.d-flex[_ngcontent-%COMP%] {
  display: flex;
}
.d-block[_ngcontent-%COMP%] {
  display: block !important;
}
.d-none[_ngcontent-%COMP%] {
  display: none !important;
}
.text-center[_ngcontent-%COMP%] {
  text-align: center;
}
.w-100[_ngcontent-%COMP%] {
  width: 100%;
}
.pl-5[_ngcontent-%COMP%] {
  padding-left: 5px;
}
.pl-15[_ngcontent-%COMP%] {
  padding-left: 15px;
}
.pl-30[_ngcontent-%COMP%] {
  padding-left: 30px;
}
.pr-5[_ngcontent-%COMP%] {
  padding-right: 5px;
}
.pr-15[_ngcontent-%COMP%] {
  padding-right: 15px;
}
.pr-30[_ngcontent-%COMP%] {
  padding-right: 30px;
}
.mb-30[_ngcontent-%COMP%] {
  margin-bottom: 30px !important;
}
.mt-30[_ngcontent-%COMP%] {
  margin-top: 30px !important;
}
.mb-10[_ngcontent-%COMP%] {
  margin-bottom: 10px !important;
}
.mb-15[_ngcontent-%COMP%] {
  margin-bottom: 15px !important;
}
.p-8[_ngcontent-%COMP%] {
  padding: 8px;
}
.pb-8[_ngcontent-%COMP%] {
  padding-bottom: 8px;
}
.m-auto[_ngcontent-%COMP%] {
  margin: auto !important;
}
.mt-0[_ngcontent-%COMP%] {
  margin: 0 !important;
}
.mt-8[_ngcontent-%COMP%] {
  margin-top: 8px !important;
}
.mt-10[_ngcontent-%COMP%] {
  margin-top: 10px !important;
}
.mt-15[_ngcontent-%COMP%] {
  margin-top: 15px !important;
}
.my-15[_ngcontent-%COMP%] {
  margin-top: 15px !important;
  margin-bottom: 15px !important;
}
.ml-15[_ngcontent-%COMP%] {
  margin-left: 15px !important;
}
.mr-15[_ngcontent-%COMP%] {
  margin-right: 15px !important;
}
.mr-8[_ngcontent-%COMP%] {
  margin-right: 8px !important;
}
.mx-30[_ngcontent-%COMP%] {
  margin-left: 30px;
  margin-right: 30px;
}
.m-0[_ngcontent-%COMP%] {
  margin: 0px;
}
.custom-button[_ngcontent-%COMP%], 
.danger-btn[_ngcontent-%COMP%], 
.danger-outline-btn[_ngcontent-%COMP%], 
.primary-outline-btn[_ngcontent-%COMP%], 
.primary-btn[_ngcontent-%COMP%] {
  padding: 3px 7px;
  border-radius: 9999px;
  height: 38px;
  --box-shadow: none;
  --background: transparent;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
}
.primary-btn[_ngcontent-%COMP%] {
  --color: #ffffff;
  --background: #1F74BB;
  background: #1F74BB;
}
.primary-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
}
.primary-outline-btn[_ngcontent-%COMP%] {
  background: #ffffff;
  --color: #1F74BB;
  color: #1F74BB;
  border: 1.5px solid #1F74BB;
}
.primary-outline-btn[_ngcontent-%COMP%]:hover {
  background: #e8f0fb;
}
.danger-outline-btn[_ngcontent-%COMP%] {
  border: 1.5px solid #dc2626;
  color: #dc2626;
}
.danger-btn[_ngcontent-%COMP%] {
  --color: #ffffff;
  --background: #dc2626;
}
ion-modal[_ngcontent-%COMP%] {
  --border-radius: 20px;
}
ion-modal.big-modal[_ngcontent-%COMP%] {
  justify-content: right !important;
  --max-height: 100vh;
  --height: 100vh;
  --border-radius: 0;
  --width: 650px;
}
ion-modal.date-modal[_ngcontent-%COMP%] {
  --width: auto;
  --height: fit-content;
  --backdrop-opacity: 0.3 !important;
}
ion-modal.side-custom-popup[_ngcontent-%COMP%] {
  --width: 630px;
  --height: 100vh;
  --max-height: 100vh;
  --border-radius: 0;
  justify-content: right;
}
ion-modal.side-custom-popup.checkinInfo-popup[_ngcontent-%COMP%] {
  --width: 460px;
}
ion-modal.side-custom-popup.team-popup[_ngcontent-%COMP%] {
  --width: 500px;
}
ion-modal.side-custom-popup.timesheet-popup[_ngcontent-%COMP%] {
  --width: 560px;
}
ion-modal.side-custom-popup.team-report-popup[_ngcontent-%COMP%] {
  --width: 800px;
}
.profile-modal[_ngcontent-%COMP%] {
  --height: 80%;
  --border-radius: 20px 20px 0 0;
  --box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.12);
  align-items: flex-end;
}
.profile-modal[_ngcontent-%COMP%]::part(backdrop) {
  opacity: 0.4 !important;
}
.table-block[_ngcontent-%COMP%] {
  border: 1px solid #ABABAB;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
  padding: 0;
}
.table-block[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding-left: 20px;
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  align-items: center;
  background: #f8fafc;
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
.table-block[_ngcontent-%COMP%]   .table-row-list[_ngcontent-%COMP%] {
  height: auto;
  min-height: 44px;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
  transition: all 0.12s ease;
}
.table-block[_ngcontent-%COMP%]   .table-row-list[_ngcontent-%COMP%]:nth-child(odd) {
  background: #f8fafc;
}
.table-block[_ngcontent-%COMP%]   .table-row-list[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.table-block[_ngcontent-%COMP%]   .table-row-list[_ngcontent-%COMP%]:last-child {
  border-bottom: 0;
}
ion-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%] {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
ion-popover[_ngcontent-%COMP%]   .popover-content[_ngcontent-%COMP%]::-webkit-scrollbar, 
ion-popover[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
ion-popover[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {
  --overflow: auto;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.custom-submenu-popover[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --width: 188px;
  --box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
  --border-radius: 12px;
}
.custom-submenu-popover[_ngcontent-%COMP%]::part(content) {
  background: #0f2b4a;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
}
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%] {
  background: #0f2b4a;
  padding: 8px 8px !important;
}
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%]   .submenu-popover-item[_ngcontent-%COMP%] {
  --background: transparent;
  --color: #a0b4cc;
  --min-height: 40px;
  margin: 2px 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%]   .submenu-popover-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  margin: 0;
  color: #a0b4cc;
  font-weight: 500;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%]   .submenu-popover-item[_ngcontent-%COMP%]:hover, 
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%]   .submenu-popover-item.selected[_ngcontent-%COMP%] {
  --background: #1a3d65;
  --color: #ffffff;
}
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%]   .submenu-popover-item[_ngcontent-%COMP%]:hover   ion-label[_ngcontent-%COMP%], 
.custom-submenu-popover[_ngcontent-%COMP%]   .submenu-popover-list[_ngcontent-%COMP%]   .submenu-popover-item.selected[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  color: #ffffff;
  font-weight: 600;
}
ion-content[_ngcontent-%COMP%]::part(scroll) {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
ion-content[_ngcontent-%COMP%]::part(scroll)::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
ion-content[_ngcontent-%COMP%]::part(scroll)::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
ion-content[_ngcontent-%COMP%]::part(scroll)::-webkit-scrollbar-thumb:hover {
  background: rgba(31, 116, 187, 0.4);
}
.menu-dropdown[_ngcontent-%COMP%] {
  --width: 180px;
  --offset-x: 8px;
}
.badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 600;
  letter-spacing: 0.06em;
}
.badge.badge-success[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.badge.badge-warning[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
.badge.badge-danger[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.badge.badge-info[_ngcontent-%COMP%] {
  background: #f0f9ff;
  color: #0284c7;
  border: 1px solid #bae6fd;
}
.badge.badge-primary[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.2);
}
.page-header-block[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}
.page-header-block[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}
.page-header-block[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%]   span.title-icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  background: #e8f0fb;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.page-header-block[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%]   span.title-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 1.25rem;
}
.page-header-block[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  margin: 2px 0 0 0;
}
.section-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin-bottom: 20px;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.section-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.section-card[_ngcontent-%COMP%]   .section-card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}
.section-card[_ngcontent-%COMP%]   .section-card-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.section-card[_ngcontent-%COMP%]   .section-card-header[_ngcontent-%COMP%]   .section-subtitle[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  color: #475569;
  margin: 2px 0 0 0;
}
@media (max-width: 768px) {
  ion-split-pane[_ngcontent-%COMP%] {
    --side-min-width: 0px !important;
    --side-max-width: 0px !important;
  }
  ion-modal[_ngcontent-%COMP%] {
    --width: 100%;
    --height: 100%;
    --border-radius: 0;
  }
  ion-modal.side-custom-popup[_ngcontent-%COMP%] {
    --width: 100%;
    --height: 100%;
  }
}
.liquid-button[_ngcontent-%COMP%] {
  --btn-color: #16a34a;
  --btn-text: #fff;
  position: relative;
  padding: 10px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  text-decoration: none;
  color: var(--btn-text);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  overflow: hidden;
  border-radius: 40px;
  border: 2px solid var(--btn-color);
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease, transform 0.1s ease;
}
.liquid-button[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], 
.liquid-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}
.liquid-button[_ngcontent-%COMP%]   .liquid[_ngcontent-%COMP%] {
  position: absolute;
  top: -80px;
  left: 0;
  width: 250px;
  height: 250px;
  background: var(--btn-color);
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
  transition: 0.5s ease;
  z-index: 1;
}
.liquid-button[_ngcontent-%COMP%]   .liquid[_ngcontent-%COMP%]::before, 
.liquid-button[_ngcontent-%COMP%]   .liquid[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
}
.liquid-button[_ngcontent-%COMP%]   .liquid[_ngcontent-%COMP%]::before {
  border-radius: 45%;
  background: rgba(20, 20, 20, 0.7);
  animation: _ngcontent-%COMP%_rotate-liquid 5s linear infinite;
}
.liquid-button[_ngcontent-%COMP%]   .liquid[_ngcontent-%COMP%]::after {
  border-radius: 40%;
  background: rgba(20, 20, 20, 0.3);
  animation: _ngcontent-%COMP%_rotate-liquid 10s linear infinite;
}
.liquid-button[_ngcontent-%COMP%]:hover {
  box-shadow: 0 0 16px var(--btn-color);
}
.liquid-button[_ngcontent-%COMP%]:hover   .liquid[_ngcontent-%COMP%] {
  top: -120px;
}
.liquid-button[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%] {
  position: absolute;
  bottom: -20px;
  border-radius: 50%;
  opacity: 0;
  animation: _ngcontent-%COMP%_rise var(--rise-duration) ease-in infinite var(--rise-delay);
  z-index: 1;
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]:nth-child(1) {
  left: 10%;
  width: 20px;
  height: 20px;
  --rise-duration: 4s;
  --rise-delay: 0s;
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]:nth-child(2) {
  left: 25%;
  width: 15px;
  height: 15px;
  --rise-duration: 3.5s;
  --rise-delay: 0.5s;
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]:nth-child(3) {
  left: 40%;
  width: 10px;
  height: 10px;
  --rise-duration: 3s;
  --rise-delay: 1s;
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]:nth-child(4) {
  left: 55%;
  width: 22px;
  height: 22px;
  --rise-duration: 4.5s;
  --rise-delay: 1.5s;
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]:nth-child(5) {
  left: 70%;
  width: 18px;
  height: 18px;
  --rise-duration: 3.8s;
  --rise-delay: 2s;
}
.liquid-button[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]:nth-child(6) {
  left: 85%;
  width: 12px;
  height: 12px;
  --rise-duration: 3.2s;
  --rise-delay: 2.5s;
}
@keyframes _ngcontent-%COMP%_rotate-liquid {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
@keyframes _ngcontent-%COMP%_rise {
  0% {
    bottom: -20px;
    opacity: 0;
  }
  5% {
    opacity: 0.7;
  }
  95% {
    opacity: 0.7;
  }
  100% {
    bottom: 120%;
    opacity: 0;
  }
}
.searchbar-input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  line-height: 28px !important;
}
.welcome-section[_ngcontent-%COMP%] {
  margin: 16px 0 24px 0;
}
.welcome-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
  font-weight: 700;
  line-height: 1.35;
  font-size: 24px;
  color: var(--ion-color-dark);
  margin-bottom: 4px;
}
.welcome-section[_ngcontent-%COMP%]   .sub-text[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 400;
  line-height: 1.35;
  color: var(--ion-color-medium);
  font-size: 14px;
}
.summary-card[_ngcontent-%COMP%] {
  margin: 0;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
.summary-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.summary-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .card-subtitle[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 600;
  line-height: 1.5;
  font-size: 13px;
  color: var(--ion-color-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.summary-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: var(--ion-color-primary);
  opacity: 0.7;
}
.summary-card[_ngcontent-%COMP%]   .card-value[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 800;
  color: var(--ion-color-dark);
}
.section-title-block[_ngcontent-%COMP%] {
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid var(--ion-color-primary);
}
.section-title-block[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--ion-color-dark);
}
.section-title-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: var(--ion-color-medium);
}
.config-card[_ngcontent-%COMP%] {
  margin: 0 0 16px 0;
  border-radius: 12px;
  border: 1px solid #edf2f7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}
.config-card[_ngcontent-%COMP%]:hover {
  transform: translateX(4px);
  border-color: var(--ion-color-primary);
}
.config-card[_ngcontent-%COMP%]   .interact-item[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  padding: 12px 0;
}
.config-card[_ngcontent-%COMP%]   .interact-item[_ngcontent-%COMP%]   ion-icon[slot=start][_ngcontent-%COMP%] {
  font-size: 24px;
  margin-right: 16px;
}
.config-card[_ngcontent-%COMP%]   .interact-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--ion-color-dark);
}
.config-card[_ngcontent-%COMP%]   .interact-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--ion-color-medium);
}
.config-card[_ngcontent-%COMP%]   .interact-item[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  font-size: 24px;
}
.tip-banner[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff8f1;
  border: 1px solid #ffd7b5;
  border-radius: 12px;
  color: #c2410c;
}
.tip-banner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  flex-shrink: 0;
}
.tip-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 13px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 400;
  line-height: 1.35;
}
.mt-20[_ngcontent-%COMP%] {
  margin-top: 20px;
}
@media (max-width: 768px) {
  .page-title[_ngcontent-%COMP%] {
    font-size: 20px;
  }
}`]});let r=c;return r})();var lt=[{path:"",component:Kn}],kt=(()=>{let c=class c{};c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=mn({type:c}),c.\u0275inj=pn({imports:[_n,wn,xn,Bn,hn.forChild(lt)]});let r=c;return r})();export{kt as LeavesAdminPageModule};
