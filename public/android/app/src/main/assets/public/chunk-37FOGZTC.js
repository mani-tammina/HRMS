import{a as Ie}from"./chunk-7N2ZIRKX.js";import{a as je}from"./chunk-DA4OVRGX.js";import{a as Ee}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{$ as _e,A as ie,Aa as ve,B as oe,F as re,Fa as Se,G as ae,Ga as we,H as se,I as le,R as ce,W as me,X as de,Y as pe,Z as ge,_ as fe,c as h,d as H,e as W,g as Q,h as X,j as Y,la as he,m as J,ma as ue,na as xe,pa as Pe,ra as Ce,sa as be,t as K,ta as Me,u as Z,v as ee,va as Oe,y as ne,ya as ye,z as te}from"./chunk-B3PLR2IL.js";import{$a as S,Ba as y,Ca as g,Da as p,Eb as q,K as f,Kb as $,L as _,Ma as A,Oa as r,Pa as x,Qa as b,Ra as v,Ta as k,Tb as G,Ua as B,Va as T,Vb as U,Ya as D,_ as a,ab as F,bb as j,ca as P,ea as I,ja as u,pb as V,qb as z,ra as d,rb as N,sa as n,ta as t,ua as c,xb as L,yb as R}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as E,e as C}from"./chunk-JHI3MBHO.js";var Te=()=>({standalone:!0});function De(s,m){s&1&&(n(0,"div",6),c(1,"ion-spinner",7),n(2,"p"),r(3,"Loading project data..."),t()())}function Fe(s,m){if(s&1){let e=y();n(0,"div",42)(1,"div",43),c(2,"ion-icon",44),n(3,"div",45)(4,"strong"),r(5),t(),n(6,"span"),r(7),t()()(),n(8,"div",46)(9,"ion-button",47),g("click",function(){let o=f(e).$implicit,l=p(2);return _(l.openShiftModal(o))}),c(10,"img",48),t(),n(11,"ion-button",49),g("click",function(){let o=f(e).$implicit,l=p(2);return _(l.deleteShift(o.id))}),c(12,"img",50),t()()()}if(s&2){let e=m.$implicit;A("night",e.shift_type==="night"),a(2),d("name",e.shift_type==="day"?"sunny-outline":"moon-outline"),a(3),x(e.shift_name),a(2),v("",e.start_time," - ",e.end_time)}}function Ve(s,m){s&1&&(n(0,"div",51),c(1,"ion-icon",52),n(2,"p"),r(3,"No shifts configured."),t()())}function ze(s,m){if(s&1){let e=y();n(0,"tr")(1,"td")(2,"div",53)(3,"ion-avatar"),c(4,"img",54),t(),n(5,"div",55)(6,"strong"),r(7),t(),n(8,"span"),r(9),t()()()(),n(10,"td")(11,"div",56),c(12,"span",57),r(13),t()(),n(14,"td")(15,"div",58),r(16),t()(),n(17,"td"),r(18),t(),n(19,"td")(20,"span",59),r(21),t()(),n(22,"td",60)(23,"div",61)(24,"ion-button",62),g("click",function(){let o=f(e).$implicit,l=p(2);return _(l.openAssignModal(o))}),c(25,"img",48),t(),n(26,"ion-button",63),g("click",function(){let o=f(e).$implicit,l=p(2);return _(l.deleteAssignment(o.id))}),c(27,"img",50),t()()()()}if(s&2){let e=m.$implicit,i=p(2);a(7),x(e.employee_name),a(2),x(e.designation_name),a(2),d("ngClass",i.getDisplayStatusClass(e.employee_id)),a(2),b(" ",i.getDisplayStatusText(e.employee_id)," "),a(3),x(e.role_in_project),a(2),x(e.shift_name||"--"),a(3),b("",e.allocation_percentage,"%")}}function Ne(s,m){s&1&&(n(0,"div",64),c(1,"ion-icon",65),n(2,"p"),r(3,"No employees assigned to this project yet."),t()())}function Le(s,m){if(s&1){let e=y();n(0,"div",8)(1,"div",9)(2,"div",10)(3,"div",11),c(4,"ion-icon",12),t(),n(5,"div",13)(6,"div",14)(7,"h1"),r(8),t(),n(9,"ion-badge",15),r(10),S(11,"uppercase"),t()(),n(12,"div",16)(13,"div",17),c(14,"ion-icon",18),n(15,"span"),r(16),t()(),n(17,"div",17),c(18,"ion-icon",19),n(19,"span"),r(20),S(21,"date"),S(22,"date"),t()(),n(23,"div",17),c(24,"ion-icon",20),n(25,"span"),r(26),t()()()()()(),n(27,"div",21)(28,"div",22)(29,"div",23)(30,"div",24)(31,"div",25),c(32,"ion-icon",26),n(33,"h3"),r(34,"Project Shifts"),t()(),n(35,"ion-button",27),g("click",function(){f(e);let o=p();return _(o.openShiftModal())}),c(36,"ion-icon",28),t()(),n(37,"div",29),u(38,Fe,13,6,"div",30)(39,Ve,4,0,"div",31),t()()(),n(40,"div",32)(41,"div",33)(42,"div",24)(43,"div",25),c(44,"ion-icon",34),n(45,"h3"),r(46,"Assigned Team"),t()(),n(47,"ion-button",35),g("click",function(){f(e);let o=p();return _(o.openAssignModal())}),c(48,"ion-icon",36),r(49," Assign "),t()(),n(50,"div",37)(51,"div",38)(52,"table",39)(53,"thead")(54,"tr")(55,"th"),r(56,"Employee"),t(),n(57,"th"),r(58,"Status"),t(),n(59,"th"),r(60,"Role"),t(),n(61,"th"),r(62,"Shift"),t(),n(63,"th"),r(64,"Alloc."),t(),n(65,"th"),r(66,"Actions"),t()()(),n(67,"tbody"),u(68,ze,28,7,"tr",40),t()(),u(69,Ne,4,0,"div",41),t()()()()()()}if(s&2){let e=p();a(8),x(e.project.project_name),a(),d("color",e.project.status==="active"?"success":"medium"),a(),b(" ",F(11,12,e.project.status)," "),a(6),v("",e.project.client_name," (",e.project.project_code,")"),a(4),v("",j(21,14,e.project.start_date,"mediumDate")," to ",j(22,17,e.project.end_date,"mediumDate")),a(6),x(e.project.project_manager_name||"Not assigned"),a(12),d("ngForOf",e.shifts),a(),d("ngIf",e.shifts.length===0),a(29),d("ngForOf",e.assignments),a(),d("ngIf",e.assignments.length===0)}}function Re(s,m){if(s&1){let e=y();n(0,"ion-header",66)(1,"ion-toolbar",67)(2,"ion-title"),r(3),t(),n(4,"ion-buttons",68)(5,"ion-button",69),g("click",function(){f(e);let o=p();return _(o.showShiftModal=!1)}),c(6,"ion-icon",70),t()()()(),n(7,"ion-content",71)(8,"form",72),g("ngSubmit",function(){f(e);let o=p();return _(o.saveShift())}),n(9,"div",73)(10,"ion-item",74)(11,"ion-label",75),r(12,"Shift Name*"),t(),c(13,"ion-input",76),t()(),n(14,"div",77)(15,"ion-item",78)(16,"ion-label",75),r(17,"Type"),t(),n(18,"ion-select",79)(19,"ion-select-option",80),r(20,"Day"),t(),n(21,"ion-select-option",81),r(22,"Night"),t(),n(23,"ion-select-option",82),r(24,"General"),t()()(),n(25,"ion-item",78)(26,"ion-label",75),r(27,"Timezone"),t(),c(28,"ion-input",83),t()(),n(29,"div",77)(30,"ion-item",78)(31,"ion-label",75),r(32,"Start Time*"),t(),c(33,"ion-input",84),t(),n(34,"ion-item",78)(35,"ion-label",75),r(36,"End Time*"),t(),c(37,"ion-input",85),t()(),n(38,"div",77)(39,"ion-item",86)(40,"ion-label"),r(41,"Active Status"),t(),c(42,"ion-toggle",87),t()(),n(43,"div",88)(44,"ion-button",89),r(45),t()()()()}if(s&2){let e=p();a(3),b("",e.editingShiftId?"Edit":"Add"," Shift"),a(5),d("formGroup",e.shiftForm),a(36),d("disabled",e.submittingShift),a(),b(" ",e.submittingShift?"Saving...":e.editingShiftId?"Update Shift":"Create Shift"," ")}}function qe(s,m){if(s&1){let e=y();n(0,"ion-button",104),g("click",function(){f(e);let o=p(2);return o.selectedEmployee=null,_(o.employeeSearchTerm="")}),c(1,"ion-icon",105),t()}}function $e(s,m){s&1&&(n(0,"div",106)(1,"ion-text",107)(2,"p"),c(3,"ion-icon",108),r(4," Type at least 3 characters to search"),t()()())}function Ge(s,m){s&1&&(n(0,"div",109),c(1,"ion-spinner",7),n(2,"p"),r(3,"Searching employees..."),t()())}function Ue(s,m){if(s&1&&(n(0,"span",119),r(1),t()),s&2){let e=p().$implicit;a(),x(e.email)}}function He(s,m){if(s&1&&(n(0,"span",120),r(1),t()),s&2){let e=p().$implicit;a(),x(e.designation_name)}}function We(s,m){if(s&1){let e=y();n(0,"ion-item",113),g("click",function(){let o=f(e).$implicit,l=p(3);return _(l.selectEmployee(o))}),n(1,"ion-avatar",114),c(2,"img",54),t(),n(3,"ion-label")(4,"h2"),r(5),t(),n(6,"p",115)(7,"span",116),r(8),t(),u(9,Ue,2,1,"span",117)(10,He,2,1,"span",118),t()()()}if(s&2){let e=m.$implicit;a(5),v("",e.FirstName," ",e.LastName),a(3),b("ID: ",e.id),a(),d("ngIf",e.email),a(),d("ngIf",e.designation_name)}}function Qe(s,m){if(s&1&&(n(0,"div",110)(1,"ion-list",111),u(2,We,11,5,"ion-item",112),t()()),s&2){let e=p(2);a(2),d("ngForOf",e.filteredEmployees)}}function Xe(s,m){s&1&&c(0,"div",121)}function Ye(s,m){if(s&1&&(n(0,"ion-select-option",122),r(1),t()),s&2){let e=m.$implicit;d("value",e.id),a(),x(e.shift_name)}}function Je(s,m){if(s&1){let e=y();n(0,"ion-header",66)(1,"ion-toolbar",67)(2,"ion-title"),r(3),t(),n(4,"ion-buttons",68)(5,"ion-button",69),g("click",function(){f(e);let o=p();return _(o.showAssignModal=!1)}),c(6,"ion-icon",70),t()()()(),n(7,"ion-content",71)(8,"form",72),g("ngSubmit",function(){f(e);let o=p();return _(o.saveAssignment())}),n(9,"div",90)(10,"ion-item",74)(11,"ion-label",75),r(12,"Employee* (Search by name or ID)"),t(),n(13,"ion-input",91),T("ngModelChange",function(o){f(e);let l=p();return B(l.employeeSearchTerm,o)||(l.employeeSearchTerm=o),_(o)}),g("ionInput",function(o){f(e);let l=p();return _(l.onEmployeeSearch(o))}),t(),u(14,qe,2,0,"ion-button",92),t(),u(15,$e,5,0,"div",93)(16,Ge,4,0,"div",94)(17,Qe,3,1,"div",95)(18,Xe,1,0,"div",96),t(),n(19,"ion-item",97)(20,"ion-label",75),r(21,"Role in Project*"),t(),c(22,"ion-input",98),t(),n(23,"div",77)(24,"ion-item",78)(25,"ion-label",75),r(26,"Shift*"),t(),n(27,"ion-select",99),u(28,Ye,2,2,"ion-select-option",100),t()(),n(29,"ion-item",78)(30,"ion-label",75),r(31,"Allocation %*"),t(),c(32,"ion-input",101),t()(),n(33,"div",77)(34,"ion-item",78)(35,"ion-label",75),r(36,"Start Date*"),t(),c(37,"ion-input",102),t(),n(38,"ion-item",78)(39,"ion-label",75),r(40,"End Date*"),t(),c(41,"ion-input",103),t()(),n(42,"div",88)(43,"ion-button",89),r(44),t()()()()}if(s&2){let e=p();a(3),b("",e.editingAssignId?"Edit":"Assign"," Employee"),a(5),d("formGroup",e.assignForm),a(5),k("ngModel",e.employeeSearchTerm),d("ngModelOptions",D(13,Te))("readonly",!!e.selectedEmployee),a(),d("ngIf",e.selectedEmployee),a(),d("ngIf",e.employeeSearchTerm.length<3&&e.employeeSearchTerm.length>0),a(),d("ngIf",e.employeeSearching),a(),d("ngIf",e.filteredEmployees.length>0&&!e.employeeSearching),a(),d("ngIf",e.employeeSearchTerm.length>=3&&e.filteredEmployees.length===0&&!e.employeeSearching),a(10),d("ngForOf",e.shifts),a(15),d("disabled",e.submittingAssign||!e.selectedEmployee),a(),b(" ",e.submittingAssign?"Processing...":e.editingAssignId?"Update Assignment":"Confirm Assignment"," ")}}var dn=(()=>{let m=class m{constructor(i,o,l,M,O,w,Ae,ke,Be){this.route=i,this.router=o,this.projectService=l,this.employeeService=M,this.fb=O,this.toastCtrl=w,this.alertCtrl=Ae,this.http=ke,this.attendanceApiService=Be,this.project=null,this.shifts=[],this.assignments=[],this.isLoading=!0,this.showShiftModal=!1,this.showAssignModal=!1,this.submittingShift=!1,this.submittingAssign=!1,this.editingShiftId=null,this.editingAssignId=null,this.allEmployees=[],this.filteredEmployees=[],this.employeeSearchTerm="",this.selectedEmployee=null,this.employeeSearching=!1,this.employeesCurrentPage=1,this.employeesLimit=10,this.employeeStatusMap={},this.statusRefreshInterval=null}ngOnInit(){let i=this.route.snapshot.paramMap.get("id");i?(this.projectId=+i,this.initForms(),this.loadProjectData(),this.statusRefreshInterval=setInterval(()=>{this.loadBulkAttendanceStatus()},12e4)):(this.showToast("Invalid Project ID","danger"),this.router.navigate(["/administration/projects"]))}ngOnDestroy(){this.statusRefreshInterval&&clearInterval(this.statusRefreshInterval)}initForms(){this.shiftForm=this.fb.group({shift_type:["day",h.required],shift_name:["",h.required],start_time:["",h.required],end_time:["",h.required],timezone:["UTC",h.required],is_active:[!0]}),this.assignForm=this.fb.group({employee_id:["",h.required],role_in_project:["",h.required],allocation_percentage:[100,[h.required,h.min(1),h.max(100)]],shift_id:["",h.required],assignment_start_date:["",h.required],assignment_end_date:["",h.required]})}loadProjectData(){return C(this,null,function*(){this.isLoading=!0;try{let i=yield this.projectService.getProjectById(this.projectId).toPromise();i.success&&i.project?this.project=i.project:Array.isArray(i)?this.project=i[0]:this.project=i,this.project&&(yield Promise.all([this.loadShifts(),this.loadAssignments()]))}catch{this.showToast("Failed to load project details","danger")}finally{this.isLoading=!1}})}loadShifts(){return C(this,null,function*(){this.shifts=(yield this.projectService.getProjectShifts(this.projectId).toPromise())||[]})}loadAssignments(){return C(this,null,function*(){this.assignments=(yield this.projectService.getAssignments(this.projectId).toPromise())||[],this.assignments.length>0&&this.loadBulkAttendanceStatus()})}loadEmployees(){this.employeeService.getAllEmployees(1,1e3).subscribe({next:i=>{this.allEmployees=i.data||[]}})}onEmployeeSearch(i){let o=i.detail.value?.trim()||"";if(console.log("\u{1F50D} [Employee Search] Query:",o),o.length<3){this.filteredEmployees=[],this.employeesCurrentPage=1;return}this.employeeSearching=!0,this.employeesCurrentPage=1,console.log("\u{1F4E1} [Employee Search] Calling API with query:",o),this.employeeService.searchEmployees(o,this.employeesCurrentPage,this.employeesLimit).subscribe({next:l=>{console.log("\u2705 [Employee Search] Response:",l),this.filteredEmployees=l.data||l.employees||[],this.employeeSearching=!1,console.log("\u{1F4CA} [Employee Search] Found",this.filteredEmployees.length,"employees")},error:l=>{console.error("\u274C [Employee Search] Error:",l),this.filteredEmployees=[],this.employeeSearching=!1,this.showToast("Failed to search employees","danger")}})}selectEmployee(i){this.selectedEmployee=i,this.employeeSearchTerm=`${i.FirstName} ${i.LastName||""}`,this.assignForm.patchValue({employee_id:i.id}),this.filteredEmployees=[],console.log("\u2713 [Employee Selected]:",i.FirstName,i.LastName,"(ID: "+i.id+")")}openShiftModal(i){i?(this.editingShiftId=i.id,this.shiftForm.patchValue(i)):(this.editingShiftId=null,this.shiftForm.reset({shift_type:"day",timezone:"UTC",is_active:!0})),this.showShiftModal=!0}saveShift(){return C(this,null,function*(){if(this.shiftForm.invalid)return;this.submittingShift=!0,(this.editingShiftId?this.projectService.updateProjectShift(this.editingShiftId,this.shiftForm.value):this.projectService.createProjectShift(this.projectId,this.shiftForm.value)).subscribe({next:()=>{this.showToast("Shift saved successfully","success"),this.showShiftModal=!1,this.loadShifts(),this.submittingShift=!1},error:()=>{this.showToast("Failed to save shift","danger"),this.submittingShift=!1}})})}deleteShift(i){return C(this,null,function*(){(yield this.alertCtrl.create({header:"Confirm Delete",message:"Are you sure you want to delete this shift?",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",role:"destructive",handler:()=>{this.projectService.deleteProjectShift(i).subscribe({next:()=>{this.showToast("Shift deleted","success"),this.loadShifts()}})}}]})).present()})}openAssignModal(i){i?(this.editingAssignId=i.id,this.assignForm.patchValue({employee_id:i.employee_id,role_in_project:i.role_in_project,allocation_percentage:i.allocation_percentage,shift_id:i.shift_id,assignment_start_date:this.formatDate(i.assignment_start_date),assignment_end_date:this.formatDate(i.assignment_end_date)}),this.selectedEmployee={FirstName:i.employee_name,id:i.employee_id},this.employeeSearchTerm=i.employee_name):(this.editingAssignId=null,this.assignForm.reset({allocation_percentage:100}),this.selectedEmployee=null,this.employeeSearchTerm="",this.filteredEmployees=[]),this.showAssignModal=!0}saveAssignment(){return C(this,null,function*(){if(this.assignForm.invalid)return;this.submittingAssign=!0;let i;if(this.editingAssignId){let{role_in_project:o,allocation_percentage:l,shift_id:M,assignment_end_date:O}=this.assignForm.value,w={role_in_project:o,allocation_percentage:l,shift_id:M,assignment_end_date:this.formatDate(O)};i=this.projectService.updateAssignment(this.editingAssignId,w)}else i=this.projectService.assignEmployee(this.projectId,this.assignForm.value);i.subscribe({next:()=>{this.showToast(this.editingAssignId?"Member details updated":"Member assigned successfully","success"),this.showAssignModal=!1,this.loadAssignments(),this.submittingAssign=!1},error:o=>{console.error("Assignment error:",o),this.showToast("Failed to process assignment","danger"),this.submittingAssign=!1}})})}deleteAssignment(i){return C(this,null,function*(){(yield this.alertCtrl.create({header:"Remove Employee",message:"Are you sure you want to remove this employee from the project?",buttons:[{text:"Cancel",role:"cancel"},{text:"Remove",role:"destructive",handler:()=>{this.projectService.deleteAssignment(i).subscribe({next:()=>{this.showToast("Employee removed","success"),this.loadAssignments()}})}}]})).present()})}loadBulkAttendanceStatus(){if(this.assignments.length===0)return;let i=this.assignments.map(o=>o.employee_id);this.attendanceApiService.bulkStatusCheck(i).subscribe({next:o=>{let l=o.statuses||o.data||[];if(l){let M={};l.forEach(O=>{M[O.employee_id]={status:(O.attendance_status||O.status)?.toLowerCase(),work_mode:O.work_mode}}),this.employeeStatusMap=E(E({},this.employeeStatusMap),M)}},error:o=>console.error("Bulk status check failed",o)})}getRealTimeStatus(i){return this.employeeStatusMap[i]||{status:"out"}}getDisplayStatusText(i){let o=(this.getRealTimeStatus(i).status||"").toLowerCase();return o==="in"||o==="present"||o.includes("in")||o==="wfh"?"IN":o.includes("leave")?"On Leave":o==="absent"?"Absent":"OUT"}getDisplayStatusClass(i){let o=(this.getRealTimeStatus(i).status||"").toLowerCase();return o==="in"||o==="present"||o.includes("in")||o==="wfh"?"active":o.includes("leave")?"on-leave-status":""}formatDate(i){return i?new Date(i).toISOString().split("T")[0]:""}showToast(i,o){return C(this,null,function*(){(yield this.toastCtrl.create({message:i,duration:2e3,color:o,position:"top"})).present()})}goBack(){this.router.navigate(["/administration/projects"])}};m.\u0275fac=function(o){return new(o||m)(P(G),P(U),P(Ie),P(Ee),P(K),P(Se),P(ve),P($),P(je))},m.\u0275cmp=I({type:m,selectors:[["app-project-details"]],decls:9,vars:4,consts:[["slot","start",1,"margin-10"],["defaultHref","/administration/projects"],[1,"ion-padding","page-containerOn"],["class","loading-container",4,"ngIf"],["class","premium-content",4,"ngIf"],[1,"side-modal",3,"didDismiss","isOpen"],[1,"loading-container"],["name","crescent"],[1,"premium-content"],[1,"project-summary-card"],[1,"header-main"],[1,"icon-box"],["name","business"],[1,"details"],[1,"title-row"],[3,"color"],[1,"meta-row"],[1,"meta-item"],["name","business-outline"],["name","calendar-outline"],["name","person-circle-outline"],[1,"grid-layout"],[1,"shifts-column"],[1,"glass-card"],[1,"card-header"],[1,"title"],["name","time-outline"],["fill","clear","color","primary",1,"add-btn",3,"click"],["name","add-circle","slot","icon-only"],[1,"shifts-list"],["class","shift-mini-card",3,"night",4,"ngFor","ngForOf"],["class","empty-state-mini",4,"ngIf"],[1,"assignments-column"],[1,"glass-card","full-height"],["name","people-outline"],[1,"primary-btn-mini",3,"click"],["name","person-add-outline","slot","start"],[1,"team-container"],[1,"team-scrollbox"],[1,"premium-team-table"],[4,"ngFor","ngForOf"],["class","empty-state",4,"ngIf"],[1,"shift-mini-card"],[1,"shift-info"],[3,"name"],[1,"text"],[1,"shift-actions"],["fill","clear",1,"edit-btn",3,"click"],["src","../../../../../assets/edit.jpg","alt","edit"],["fill","clear",1,"delete-btn",3,"click"],["src","../../../../../assets/delete.webp","alt","edit"],[1,"empty-state-mini"],["name","alert-circle-outline"],[1,"member-cell"],["src","../../assets/Profile_Picture.png"],[1,"info"],[1,"status-pill",3,"ngClass"],[1,"dot"],[1,"role-tag"],[1,"alloc-val"],[1,"table-actions"],[1,"action-flex"],["fill","clear",1,"edit-icon-btn",3,"click"],["fill","clear",1,"delete-icon-btn",3,"click"],[1,"empty-state"],["name","people-circle-outline"],[1,"ion-no-border"],[1,"modal-toolbar"],["slot","end"],[3,"click"],["name","close"],[1,"ion-padding","modal-content"],[1,"premium-form",3,"ngSubmit","formGroup"],[1,"form-item"],["lines","none",1,"custom-input"],["position","stacked"],["formControlName","shift_name","placeholder","e.g. Morning Shift"],[1,"form-row"],["lines","none",1,"custom-input","half"],["formControlName","shift_type","interface","popover"],["value","day"],["value","night"],["value","general"],["formControlName","timezone"],["type","time","formControlName","start_time"],["type","time","formControlName","end_time"],["lines","none",1,"custom-input","toggle-item","full"],["slot","end","formControlName","is_active"],[1,"modal-footer"],["expand","block","type","submit",1,"submit-btn",3,"disabled"],[1,"search-section"],["placeholder","Type at least 3 characters...",3,"ngModelChange","ionInput","ngModel","ngModelOptions","readonly"],["slot","end","fill","clear","color","danger",3,"click",4,"ngIf"],["class","search-info",4,"ngIf"],["class","search-loading",4,"ngIf"],["class","search-dropdown",4,"ngIf"],["class","search-empty",4,"ngIf"],["lines","none",1,"custom-input","mt-15"],["formControlName","role_in_project","placeholder","e.g. Lead Developer"],["formControlName","shift_id","placeholder","Select shift"],[3,"value",4,"ngFor","ngForOf"],["type","number","formControlName","allocation_percentage"],["type","date","formControlName","assignment_start_date"],["type","date","formControlName","assignment_end_date"],["slot","end","fill","clear","color","danger",3,"click"],["name","close-circle"],[1,"search-info"],["color","medium"],["name","information-circle-outline"],[1,"search-loading"],[1,"search-dropdown"],[1,"results-list"],["button","","lines","full","class","employee-result",3,"click",4,"ngFor","ngForOf"],["button","","lines","full",1,"employee-result",3,"click"],["slot","start"],[1,"employee-details"],[1,"emp-id"],["class","emp-email",4,"ngIf"],["class","emp-designation",4,"ngIf"],[1,"emp-email"],[1,"emp-designation"],[1,"search-empty"],[3,"value"]],template:function(o,l){o&1&&(n(0,"ion-buttons",0),c(1,"ion-back-button",1),t(),n(2,"ion-content",2),u(3,De,4,0,"div",3)(4,Le,70,20,"div",4),n(5,"ion-modal",5),g("didDismiss",function(){return l.showShiftModal=!1}),u(6,Re,46,4,"ng-template"),t(),n(7,"ion-modal",5),g("didDismiss",function(){return l.showAssignModal=!1}),u(8,Je,45,14,"ng-template"),t()()),o&2&&(a(3),d("ngIf",l.isLoading),a(),d("ngIf",!l.isLoading&&l.project),a(),d("isOpen",l.showShiftModal),a(2),d("isOpen",l.showAssignModal))},dependencies:[q,V,z,N,we,re,ae,se,le,ce,me,de,pe,ge,fe,_e,he,ue,xe,Pe,Ce,be,Me,ye,ne,te,ie,oe,Oe,Z,X,H,W,Q,ee,Y,J,L,R],styles:[`

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
.premium-content[_ngcontent-%COMP%] {
  background: #f4f7fb;
  min-height: 100vh;
  padding-bottom: 40px;
}
.project-summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  border: 1px solid #ABABAB;
  position: relative;
  overflow: hidden;
}
.project-summary-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #1F74BB;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%] {
  display: flex;
  gap: 32px;
  align-items: center;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  background: #e8f0fb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 32px;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {
  flex: 1;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  --background: #e8f0fb;
  --color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .meta-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .meta-row[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .meta-row[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #1F74BB;
}
.project-summary-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .meta-row[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {
  width: 1px;
  height: 14px;
  background: #ABABAB;
}
.grid-layout[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
}
@media (max-width: 1024px) {
  .grid-layout[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.glass-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 24px;
  height: min-content;
}
.glass-card.full-height[_ngcontent-%COMP%] {
  height: 100%;
  min-height: 500px;
}
.glass-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}
.glass-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.glass-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #1F74BB;
}
.glass-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.shifts-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f1f5f9;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-info[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  align-items: center;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #d97706;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-info[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-info[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #0f172a;
  font-weight: 700;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-info[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  margin-top: 2px;
  font-weight: 500;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card.night[_ngcontent-%COMP%]   .shift-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], 
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  margin: 0;
  --border-radius: 4px;
  transition: all 0.2s ease;
  --padding-start: 0;
  --padding-end: 0;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {
  --color: #1F74BB;
  --background: transparent;
  border: 1px solid #f1f5f9;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]:hover {
  --background: #e8f0fb;
  border-color: #1F74BB;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%] {
  --color: #dc2626;
  --background: transparent;
  border: 1px solid #f1f5f9;
}
.shifts-list[_ngcontent-%COMP%]   .shift-mini-card[_ngcontent-%COMP%]   .shift-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%]:hover {
  --background: #fef2f2;
  border-color: #dc2626;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: center;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .edit-icon-btn[_ngcontent-%COMP%], 
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .delete-icon-btn[_ngcontent-%COMP%] {
  height: 36px;
  margin: 0;
  --border-radius: 8px;
  transition: all 0.2s ease;
  --padding-start: 8px;
  --padding-end: 8px;
  width: 50px;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .edit-icon-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .delete-icon-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .edit-icon-btn[_ngcontent-%COMP%] {
  --color: #1F74BB;
  --background: transparent;
  border: 1px solid #f1f5f9;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .edit-icon-btn[_ngcontent-%COMP%]:hover {
  --background: #e8f0fb;
  border-color: #1F74BB;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .delete-icon-btn[_ngcontent-%COMP%] {
  --color: #dc2626;
  --background: transparent;
  border: 1px solid #f1f5f9;
}
.table-actions[_ngcontent-%COMP%]   .action-flex[_ngcontent-%COMP%]   .delete-icon-btn[_ngcontent-%COMP%]:hover {
  --background: #fef2f2;
  border-color: #dc2626;
}
.premium-team-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.premium-team-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  text-align: left;
  padding: 16px;
  font-size: 10px;
  text-transform: uppercase;
  color: #475569;
  font-weight: 700;
  border-bottom: 2px solid #ABABAB;
  letter-spacing: 1px;
  background: #f8fafc;
}
.premium-team-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  transition: all 0.2s ease;
}
.premium-team-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background-color: #f1f5f9;
}
.premium-team-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  vertical-align: middle;
  font-weight: 600;
}
.premium-team-table[_ngcontent-%COMP%]   .member-cell[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.premium-team-table[_ngcontent-%COMP%]   .member-cell[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.premium-team-table[_ngcontent-%COMP%]   .member-cell[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.premium-team-table[_ngcontent-%COMP%]   .member-cell[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-team-table[_ngcontent-%COMP%]   .member-cell[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  text-transform: uppercase;
  margin-top: 2px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.premium-team-table[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: #f8fafc;
  color: #475569;
  font-size: 10px;
  font-weight: 700;
  border: 1px solid #f1f5f9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.premium-team-table[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #94a3b8;
}
.premium-team-table[_ngcontent-%COMP%]   .status-pill.active[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
}
.premium-team-table[_ngcontent-%COMP%]   .status-pill.active[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #16a34a;
}
.premium-team-table[_ngcontent-%COMP%]   .role-tag[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #1e293b;
  display: inline-block;
  border: 1px solid #f1f5f9;
}
.premium-team-table[_ngcontent-%COMP%]   .alloc-val[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 4px 10px;
  border-radius: 4px;
}
.empty-state-mini[_ngcontent-%COMP%] {
  text-align: center;
  padding: 48px 24px;
  color: #94a3b8;
}
.empty-state-mini[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.3;
}
.empty-state-mini[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
}
.search-section[_ngcontent-%COMP%] {
  position: relative;
  margin-bottom: 24px;
}
.search-section[_ngcontent-%COMP%]   .search-dropdown[_ngcontent-%COMP%] {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  margin-top: 8px;
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid #ABABAB;
}
.premium-form[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 20px;
  margin-bottom: 4px;
}
.premium-form[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 8px;
  padding: 0;
  border: 1px solid #ABABAB;
  margin-bottom: 20px;
  transition: all 0.2s ease;
}
.premium-form[_ngcontent-%COMP%]   .custom-input.half[_ngcontent-%COMP%] {
  flex: 1;
}
.premium-form[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.premium-form[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 700;
  font-size: 10px;
  margin-bottom: 4px !important;
  padding-left: 16px;
  padding-top: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.premium-form[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], 
.premium-form[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  font-weight: 600;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #0f172a;
  --padding-start: 16px;
  --padding-end: 16px;
}
.modal-footer[_ngcontent-%COMP%] {
  margin-top: 32px;
}
.submit-btn[_ngcontent-%COMP%] {
  --color: white;
  height: 48px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: none;
  --border-radius: 20px;
}
.submit-btn[_ngcontent-%COMP%]:hover {
  opacity: 0.9;
}
.results-list[_ngcontent-%COMP%] {
  padding: 8px;
  margin: 0;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-bottom: 1px solid #f8fafc;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 8px;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]:hover {
  background-color: #f1f5f9;
  transform: translateX(4px);
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  object-fit: cover;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]   .employee-details[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #475569;
  margin-top: 4px;
  font-weight: 500;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]   .employee-details[_ngcontent-%COMP%]   .emp-id[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1F74BB;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]   .employee-details[_ngcontent-%COMP%]   .emp-email[_ngcontent-%COMP%] {
  color: #94a3b8;
}
.results-list[_ngcontent-%COMP%]   .employee-result[_ngcontent-%COMP%]   .employee-details[_ngcontent-%COMP%]   .emp-designation[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 2px 8px;
  border-radius: 4px;
  color: #1e293b;
  font-weight: 700;
  text-transform: uppercase;
}
.search-info[_ngcontent-%COMP%], 
.search-empty[_ngcontent-%COMP%] {
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}
.search-info[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], 
.search-empty[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}
.search-info[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.search-empty[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.search-info[_ngcontent-%COMP%] {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
}
.search-info[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #0284c7;
}
.search-empty[_ngcontent-%COMP%] {
  background: #fef2f2;
  border: 1px solid #fecaca;
}
.search-empty[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #dc2626;
}
.search-loading[_ngcontent-%COMP%] {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.search-loading[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  height: 24px;
  width: 24px;
  --color: #1F74BB;
}
.search-loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  font-weight: 500;
}`]});let s=m;return s})();export{dn as ProjectDetailsPage};
