import{a as fe}from"./chunk-GKMRXCVX.js";import{a as _e}from"./chunk-C76DRQJT.js";import"./chunk-NDCRD3QG.js";import{$ as te,A as H,B as Q,Fa as me,Ga as ge,H as q,I as X,Q as Y,R as J,V as K,W as Z,X as $,Z as ee,_ as ne,d as j,g as R,ha as ie,ia as oe,la as ae,ma as re,na as le,ra as ce,ta as se,u as G,va as pe,ya as de}from"./chunk-B3PLR2IL.js";import{Ba as y,Ca as _,Da as d,Eb as W,F as k,Ha as L,Ia as T,Ja as V,K as m,Ka as M,L as g,Ma as D,Oa as r,Pa as x,Qa as O,Ra as F,Ta as b,Ua as P,Va as C,Vb as N,Zb as U,_ as l,ca as w,ea as I,fa as B,ja as u,qb as z,ra as p,rb as A,sa as t,ta as o,ua as f}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as S}from"./chunk-JHI3MBHO.js";var he=["uploadModal"];function ye(a,s){a&1&&(t(0,"div",27)(1,"div",28)(2,"div",29),f(3,"ion-spinner",30),o(),t(4,"h2"),r(5,"Uploading Employees"),o(),t(6,"p"),r(7,"Please wait while we process your file..."),o(),t(8,"div",31),f(9,"span",32)(10,"span",32)(11,"span",32),o()()())}function be(a,s){if(a&1){let e=y();t(0,"ion-row",33)(1,"ion-col",16),r(2),o(),t(3,"ion-col",17),r(4),o(),t(5,"ion-col",34),r(6),o(),t(7,"ion-col",19),r(8),o(),t(9,"ion-col",18),r(10),o(),t(11,"ion-col",18),r(12),o(),t(13,"ion-col",20)(14,"ion-button",35),_("click",function(){let n=m(e).$implicit,c=d();return g(c.selectEmployee(n))}),f(15,"ion-icon",36),o()()()}if(a&2){let e=s.$implicit;l(2),x(e.id),l(2),x(e.EmployeeNumber||"-"),l(2),x(e.FullName),l(2),x(e.WorkEmail),l(2),x(e.department_name||"-"),l(2),x(e.designation_name||"-")}}function Pe(a,s){a&1&&(t(0,"div",37),f(1,"ion-icon",38),t(2,"p",39),r(3,"No employees found"),o()())}function Ce(a,s){if(a&1){let e=y();t(0,"div",40)(1,"ion-button",41),_("click",function(){m(e);let n=d();return g(n.prevPage())}),f(2,"ion-icon",42),o(),t(3,"span",43),r(4),o(),t(5,"ion-button",41),_("click",function(){m(e);let n=d();return g(n.nextPage())}),f(6,"ion-icon",44),o()()}if(a&2){let e=d();l(),p("disabled",e.currentPage===1),l(3),F("Page ",e.currentPage," of ",e.totalPages),l(),p("disabled",e.currentPage===e.totalPages)}}function we(a,s){a&1&&f(0,"ion-icon",81)}function Me(a,s){if(a&1){let e=y();t(0,"div",78),_("click",function(){let n=m(e).$implicit,c=d(3);return g(c.selectManager(n.id))}),f(1,"ion-icon",79),t(2,"span"),r(3),o(),u(4,we,1,0,"ion-icon",80),o()}if(a&2){let e=s.$implicit,i=d(3);D("is-selected",i.updateData.reporting_manager_id===e.id),l(3),x(e.FullName),l(),p("ngIf",i.updateData.reporting_manager_id===e.id)}}function Ee(a,s){a&1&&(t(0,"div",82),f(1,"ion-icon",83),t(2,"span"),r(3,"No matches found"),o()())}function Oe(a,s){if(a&1){let e=y();t(0,"div",71)(1,"ion-searchbar",72),C("ngModelChange",function(n){m(e);let c=d(2);return P(c.managerSearchTerm,n)||(c.managerSearchTerm=n),g(n)}),_("ionInput",function(){m(e);let n=d(2);return g(n.filterManagers())}),o(),t(2,"div",73)(3,"div",74),_("click",function(){m(e);let n=d(2);return g(n.selectManager(null))}),f(4,"ion-icon",75),t(5,"span"),r(6,"No Manager"),o()(),u(7,Me,5,4,"div",76)(8,Ee,4,0,"div",77),o()()}if(a&2){let e=d(2);l(),b("ngModel",e.managerSearchTerm),p("debounce",150),l(6),p("ngForOf",e.filteredManagers),l(),p("ngIf",e.filteredManagers.length===0)}}function ve(a,s){if(a&1&&(t(0,"ion-select-option",84),r(1),o()),a&2){let e=s.$implicit;p("value",e.id),l(),x(e.name)}}function Se(a,s){if(a&1&&(t(0,"ion-select-option",84),r(1),o()),a&2){let e=s.$implicit;p("value",e.id),l(),x(e.name)}}function ke(a,s){if(a&1&&(t(0,"ion-select-option",84),r(1),o()),a&2){let e=s.$implicit;p("value",e.id),l(),x(e.name)}}function Ie(a,s){if(a&1&&(t(0,"ion-select-option",84),r(1),o()),a&2){let e=s.$implicit;p("value",e.id),l(),x(e.name)}}function Be(a,s){if(a&1&&(t(0,"ion-select-option",84),r(1),o()),a&2){let e=s.$implicit;p("value",e.id),l(),x(e.name)}}function Le(a,s){if(a&1){let e=y();t(0,"ion-header",3)(1,"ion-toolbar",45)(2,"ion-title"),r(3,"Update Employee Profile"),o(),t(4,"ion-buttons",7)(5,"ion-button",46),_("click",function(){m(e);let n=d();return g(n.selectedEmployee=null)}),f(6,"ion-icon",47),o()()()(),t(7,"ion-content",48)(8,"div",49)(9,"h3",50),r(10),o(),t(11,"p",51),r(12),o()(),t(13,"div",52)(14,"ion-list",53)(15,"div",54)(16,"ion-label",55),r(17,"Reporting Manager"),o(),t(18,"div",56),_("click",function(){m(e);let n=d();return g(n.toggleManagerDropdown())}),f(19,"ion-icon",57),t(20,"span",58),r(21),o(),f(22,"ion-icon",59),o(),u(23,Oe,9,4,"div",60),o(),t(24,"ion-item")(25,"ion-label",61),r(26,"Department"),o(),t(27,"ion-select",62),C("ngModelChange",function(n){m(e);let c=d();return P(c.updateData.DepartmentId,n)||(c.updateData.DepartmentId=n),g(n)}),u(28,ve,2,2,"ion-select-option",63),o()(),t(29,"ion-item")(30,"ion-label",61),r(31,"Leave Plan"),o(),t(32,"ion-select",64),C("ngModelChange",function(n){m(e);let c=d();return P(c.updateData.leave_plan_id,n)||(c.updateData.leave_plan_id=n),g(n)}),u(33,Se,2,2,"ion-select-option",63),o()(),t(34,"ion-item")(35,"ion-label",61),r(36,"Shift Policy"),o(),t(37,"ion-select",65),C("ngModelChange",function(n){m(e);let c=d();return P(c.updateData.shift_policy_id,n)||(c.updateData.shift_policy_id=n),g(n)}),u(38,ke,2,2,"ion-select-option",63),o()(),t(39,"ion-item")(40,"ion-label",61),r(41,"Attendance Policy"),o(),t(42,"ion-select",66),C("ngModelChange",function(n){m(e);let c=d();return P(c.updateData.attendance_policy_id,n)||(c.updateData.attendance_policy_id=n),g(n)}),u(43,Ie,2,2,"ion-select-option",63),o()(),t(44,"ion-item")(45,"ion-label",61),r(46,"Weekly Off Policy"),o(),t(47,"ion-select",67),C("ngModelChange",function(n){m(e);let c=d();return P(c.updateData.weekly_off_policy_id,n)||(c.updateData.weekly_off_policy_id=n),g(n)}),u(48,Be,2,2,"ion-select-option",63),o()()()(),t(49,"div",68)(50,"ion-button",69),_("click",function(){m(e);let n=d();return g(n.selectedEmployee=null)}),r(51,"Cancel"),o(),t(52,"ion-button",70),_("click",function(){m(e);let n=d();return g(n.updateEmployeeProfile())}),r(53,"Update Profile"),o()()()}if(a&2){let e=d();l(10),x(e.selectedEmployee==null?null:e.selectedEmployee.FullName),l(2),O("Employee ID: ",e.selectedEmployee==null?null:e.selectedEmployee.id),l(9),x(e.getManagerName(e.updateData.reporting_manager_id)),l(),p("name",e.managerDropdownOpen?"chevron-up-outline":"chevron-down-outline"),l(),p("ngIf",e.managerDropdownOpen),l(4),b("ngModel",e.updateData.DepartmentId),l(),p("ngForOf",e.departments),l(4),b("ngModel",e.updateData.leave_plan_id),l(),p("ngForOf",e.leavePlans),l(4),b("ngModel",e.updateData.shift_policy_id),l(),p("ngForOf",e.shiftPolicies),l(4),b("ngModel",e.updateData.attendance_policy_id),l(),p("ngForOf",e.attendancePolicies),l(4),b("ngModel",e.updateData.weekly_off_policy_id),l(),p("ngForOf",e.weeklyOffPolicies)}}function Te(a,s){a&1&&f(0,"ion-icon",98)}function Ve(a,s){a&1&&f(0,"ion-icon",99)}function De(a,s){a&1&&(t(0,"p"),r(1,"Click here to browse your computer."),o())}function Fe(a,s){if(a&1&&(t(0,"p",100),r(1),o()),a&2){let e=d(2);l(),x(e.EmployeeselectedFile.name)}}function ze(a,s){if(a&1){let e=y();t(0,"ion-header",3)(1,"ion-toolbar",45)(2,"ion-title"),r(3,"Upload Employee List"),o(),t(4,"ion-buttons",7)(5,"ion-button",46),_("click",function(){m(e),d();let n=M(47);return g(n.dismiss())}),f(6,"ion-icon",47),o()()()(),t(7,"ion-content",48)(8,"div",85),_("click",function(){m(e);let n=M(21);return g(n.click())}),f(9,"ion-icon",86),t(10,"p")(11,"strong"),r(12,"Upload a file"),o()(),t(13,"p",87),r(14,"Attach the employee data file below"),o(),t(15,"div",88),u(16,Te,1,0,"ion-icon",89)(17,Ve,1,0,"ion-icon",90)(18,De,2,0,"p",91)(19,Fe,2,1,"p",92),t(20,"input",93,1),_("change",function(n){m(e);let c=d();return g(c.EmployeeSelected(n))}),o()()(),t(22,"div",94)(23,"ion-button",95),_("click",function(){m(e);let n=d();return g(n.EmployeesUpload())}),r(24," Start Upload "),o(),t(25,"ion-button",96),_("click",function(){m(e),d();let n=M(47);return g(n.dismiss())}),r(26,"Cancel"),o()(),t(27,"div",97)(28,"p")(29,"strong"),r(30,"Instructions:"),o(),r(31," Use Excel formats (.xls, .xlsx). Ensure headers match the template provided in the admin guide."),o()()()}if(a&2){let e=d();l(16),p("ngIf",!e.EmployeeselectedFile),l(),p("ngIf",e.EmployeeselectedFile),l(),p("ngIf",!e.EmployeeselectedFile),l(),p("ngIf",e.EmployeeselectedFile),l(4),p("disabled",!e.EmployeeselectedFile)}}var ue=(()=>{let s=class s{constructor(i,n,c,h){this.employeeService=i,this.adminService=n,this.router=c,this.toastController=h,this.userRole=null,this.isHR=!1,this.searchTerm="",this.selectedEmployee=null,this.updateData={reporting_manager_id:null,leave_plan_id:null,shift_policy_id:null,attendance_policy_id:null,weekly_off_policy_id:null,PayGradeId:null,DepartmentId:null},this.shiftPolicies=[],this.attendancePolicies=[],this.leavePlans=[],this.weeklyOffPolicies=[],this.departments=[],this.allEmployees=[],this.filteredManagers=[],this.managerSearchTerm="",this.managerDropdownOpen=!1,this.allLoadedEmployees=[],this.filteredEmployees=[],this.pagedCandidates=[],this.pageSize=20,this.currentPage=1,this.totalPages=1,this.totalEmployees=0,this.EmployeeselectedFile=null,this.isUploading=!1}ngOnInit(){this.userRole=(localStorage.getItem("role")||"").toLowerCase(),this.isHR=this.userRole==="hr"||this.userRole==="admin",this.loadEmployees(),this.loadShiftPolicies(),this.loadAttendancePolicies(),this.loadLeavePlans(),this.loadWeeklyOffPolicies(),this.loadDepartments()}loadDepartments(){this.adminService.getDepartments().subscribe(i=>{this.departments=i||[]})}loadWeeklyOffPolicies(){this.adminService.getWeeklyOffPolicies().subscribe(i=>{this.weeklyOffPolicies=i||[]})}loadLeavePlans(){this.adminService.getLeavePlans().subscribe(i=>{this.leavePlans=i||[]})}loadAttendancePolicies(){this.adminService.getAttendancePolicies().subscribe(i=>{this.attendancePolicies=i||[]})}loadShiftPolicies(){this.adminService.getShiftPolicies().subscribe(i=>{this.shiftPolicies=i||[]})}loadEmployees(){this.employeeService.getAllEmployees(1,2e3,"").subscribe(i=>{this.allLoadedEmployees=i.data||[],this.allEmployees=[...this.allLoadedEmployees],this.filteredManagers=[...this.allEmployees],this.applySearch()})}applySearch(){this.currentPage=1;let i=(this.searchTerm||"").toLowerCase().trim();i?this.filteredEmployees=this.allLoadedEmployees.filter(n=>(n.FullName||"").toLowerCase().includes(i)||(n.WorkEmail||"").toLowerCase().includes(i)||(n.EmployeeNumber||"").toString().toLowerCase().includes(i)||(n.department_name||"").toLowerCase().includes(i)||(n.designation_name||"").toLowerCase().includes(i)||(n.id||"").toString().includes(i)):this.filteredEmployees=[...this.allLoadedEmployees],this.totalEmployees=this.filteredEmployees.length,this.totalPages=Math.ceil(this.totalEmployees/this.pageSize)||1,this.updatePagination()}updatePagination(){let i=(this.currentPage-1)*this.pageSize;this.pagedCandidates=this.filteredEmployees.slice(i,i+this.pageSize)}selectEmployee(i){this.selectedEmployee=i,this.updateData={reporting_manager_id:i.reporting_manager_id||null,leave_plan_id:i.leave_plan_id||null,shift_policy_id:i.shift_policy_id||null,attendance_policy_id:i.attendance_policy_id||null,weekly_off_policy_id:i.weekly_off_policy_id||null,PayGradeId:i.PayGradeId||null,DepartmentId:i.DepartmentId||null}}updateEmployeeProfile(){if(!this.selectedEmployee)return;let i={};Object.keys(this.updateData).forEach(n=>{this.updateData[n]!==null&&this.updateData[n]!==void 0&&(i[n]=this.updateData[n])}),this.employeeService.updateEmployeeProfile(this.selectedEmployee.id,i).subscribe({next:()=>{this.presentToast("Employee profile updated successfully","success"),this.selectedEmployee=null,this.loadEmployees()},error:n=>{this.presentToast("Update failed: "+(n?.error?.error||"Unknown error"),"danger")}})}EmployeeSelected(i){this.EmployeeselectedFile=i.target.files[0]}EmployeesUpload(){if(!this.EmployeeselectedFile){this.presentToast("Please select an Excel file","warning");return}this.isUploading=!0,this.uploadModal.dismiss(),this.adminService.uploadEmployees(this.EmployeeselectedFile).subscribe({next:()=>{this.isUploading=!1,this.presentToast("Employees uploaded successfully","success"),this.EmployeeselectedFile=null,this.loadEmployees()},error:()=>{this.isUploading=!1,this.presentToast("Employee upload failed","danger")}})}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.updatePagination())}prevPage(){this.currentPage>1&&(this.currentPage--,this.updatePagination())}toggleManagerDropdown(){this.managerDropdownOpen=!this.managerDropdownOpen,this.managerDropdownOpen&&(this.managerSearchTerm="",this.filteredManagers=[...this.allEmployees])}filterManagers(){let i=(this.managerSearchTerm||"").toLowerCase().trim();this.filteredManagers=i?this.allEmployees.filter(n=>(n.FullName||"").toLowerCase().includes(i)):[...this.allEmployees]}selectManager(i){this.updateData.reporting_manager_id=i,this.managerDropdownOpen=!1}getManagerName(i){if(!i)return"Select Reporting Manager";let n=this.allEmployees.find(c=>c.id===i);return n?n.FullName:"Select Reporting Manager"}presentToast(i,n){return S(this,null,function*(){(yield this.toastController.create({message:i,duration:2e3,color:n,position:"top"})).present()})}};s.\u0275fac=function(n){return new(n||s)(w(fe),w(_e),w(N),w(me))},s.\u0275cmp=I({type:s,selectors:[["app-employee-list"]],viewQuery:function(n,c){if(n&1&&L(he,5),n&2){let h;T(h=V())&&(c.uploadModal=h.first)}},standalone:!1,decls:49,vars:8,consts:[["uploadModal",""],["EmployeeInput",""],["class","upload-loading-overlay animate__animated animate__fadeIn",4,"ngIf"],[1,"ion-no-border"],["color","primary",1,"gradient-header"],["slot","start"],["defaultHref","/administration"],["slot","end"],["id","open-upload-modal",1,"primary-outline-btn",2,"--color","#fff","--border-color","#fff"],["slot","start","name","cloud-upload-outline"],["placeholder","Search Employees, Employee ID or Department","animated","true",1,"custom-searchbar",3,"ionInput","ngModelChange","ngModel"],[1,"admin-dashboard","ion-padding",3,"fullscreen"],[1,"top-bar"],[2,"font-size","16px","color","#71717a","font-weight","500"],[1,"table-block"],[1,"table-header"],["size","0.8"],["size","1.2"],["size","2"],["size","3"],["size","1",1,"ion-text-right"],[1,"table-list-container"],["class","table-list-row animate__animated animate__fadeIn",4,"ngFor","ngForOf"],["class","empty-state ion-text-center ion-padding",4,"ngIf"],["class","pagination-controls ion-padding-top",4,"ngIf"],[1,"side-custom-popup",3,"didDismiss","isOpen"],["trigger","open-upload-modal",1,"upload-main-block"],[1,"upload-loading-overlay","animate__animated","animate__fadeIn"],[1,"loading-content"],[1,"spinner-container"],["name","crescent","color","primary"],[1,"progress-dots"],[1,"dot"],[1,"table-list-row","animate__animated","animate__fadeIn"],["size","2",1,"emp-name-cell"],["fill","clear","color","primary",1,"ion-no-margin",3,"click"],["name","pencil-outline","slot","icon-only",2,"font-size","18px"],[1,"empty-state","ion-text-center","ion-padding"],["name","people-outline",2,"font-size","48px","color","#e4e4e7"],[2,"color","#71717a","margin-top","12px"],[1,"pagination-controls","ion-padding-top"],["fill","clear",3,"click","disabled"],["name","chevron-back-outline"],[1,"page-info"],["name","chevron-forward-outline"],["color","primary"],[3,"click"],["name","close-outline","slot","icon-only"],[1,"ion-padding"],[1,"employee-summary"],[2,"margin-top","0","font-weight","700"],[2,"color","#71717a","font-size","14px","margin-top","-4px"],[1,"form-container"],["lines","none"],[1,"manager-field-wrapper"],[1,"manager-field-label"],[1,"manager-trigger",3,"click"],["name","person-circle-outline",1,"trigger-icon"],[1,"trigger-text"],[1,"trigger-chevron",3,"name"],["class","manager-panel",4,"ngIf"],["position","stacked"],["placeholder","Select Department","interface","popover",3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Select Leave Plan","interface","popover",3,"ngModelChange","ngModel"],["placeholder","Select Shift Policy","interface","popover",3,"ngModelChange","ngModel"],["placeholder","Select Attendance Policy","interface","popover",3,"ngModelChange","ngModel"],["placeholder","Select Weekly Off","interface","popover",3,"ngModelChange","ngModel"],[1,"form-footer"],[1,"primary-outline-btn",3,"click"],[1,"primary-btn",3,"click"],[1,"manager-panel"],["placeholder","Search by name...","showCancelButton","never",1,"manager-search",3,"ngModelChange","ionInput","ngModel","debounce"],[1,"manager-list"],[1,"manager-option","clear-option",3,"click"],["name","close-circle-outline"],["class","manager-option",3,"is-selected","click",4,"ngFor","ngForOf"],["class","manager-option empty-msg",4,"ngIf"],[1,"manager-option",3,"click"],["name","person-outline"],["name","checkmark","class","check-icon",4,"ngIf"],["name","checkmark",1,"check-icon"],[1,"manager-option","empty-msg"],["name","search-outline"],[3,"value"],[1,"upload-block",3,"click"],["name","folder-open-outline",1,"folder-icon"],[2,"color","#71717a","font-size","13px"],[1,"drag-drop-area"],["name","arrow-down-circle-outline","class","upload-icon",4,"ngIf"],["name","document-text-outline","class","upload-icon","color","success",4,"ngIf"],[4,"ngIf"],["style","color: #18191c; font-weight: 600;",4,"ngIf"],["type","file","accept",".xlsx,.xls",2,"display","none",3,"change"],[1,"modal-actions",2,"margin-top","24px"],["expand","block",1,"primary-btn",3,"click","disabled"],["expand","block","fill","clear","color","medium",3,"click"],[1,"instructions","ion-padding-top",2,"font-size","13px","color","#71717a"],["name","arrow-down-circle-outline",1,"upload-icon"],["name","document-text-outline","color","success",1,"upload-icon"],[2,"color","#18191c","font-weight","600"]],template:function(n,c){if(n&1){let h=y();u(0,ye,12,0,"div",2),t(1,"ion-header",3)(2,"ion-toolbar",4)(3,"ion-buttons",5),f(4,"ion-back-button",6),o(),t(5,"ion-title"),r(6,"All Employees"),o(),t(7,"ion-buttons",7)(8,"ion-button",8),f(9,"ion-icon",9),r(10," Upload Employees "),o()()(),t(11,"ion-toolbar")(12,"ion-searchbar",10),_("ionInput",function(){return m(h),g(c.applySearch())}),C("ngModelChange",function(E){return m(h),P(c.searchTerm,E)||(c.searchTerm=E),g(E)}),o()()(),t(13,"ion-content",11)(14,"div",12)(15,"h1"),r(16,"Employees List "),t(17,"small",13),r(18),o()(),t(19,"p"),r(20,"Monitor and maintain employee records"),o()(),t(21,"div",14)(22,"div",15)(23,"ion-grid")(24,"ion-row")(25,"ion-col",16),r(26,"Emp ID"),o(),t(27,"ion-col",17),r(28,"Emp Number"),o(),t(29,"ion-col",18),r(30,"Name"),o(),t(31,"ion-col",19),r(32,"Email ID"),o(),t(33,"ion-col",18),r(34,"Department"),o(),t(35,"ion-col",18),r(36,"Designation"),o(),t(37,"ion-col",20),r(38,"Actions"),o()()()(),t(39,"div",21)(40,"ion-grid"),u(41,be,16,6,"ion-row",22),o()(),u(42,Pe,4,0,"div",23),o(),u(43,Ce,7,4,"div",24),t(44,"ion-modal",25),_("didDismiss",function(){return m(h),g(c.selectedEmployee=null)}),u(45,Le,54,15,"ng-template"),o(),t(46,"ion-modal",26,0),u(48,ze,32,5,"ng-template"),o()()}n&2&&(p("ngIf",c.isUploading),l(12),b("ngModel",c.searchTerm),l(),p("fullscreen",!0),l(5),O("(",c.totalEmployees,")"),l(23),p("ngForOf",c.pagedCandidates),l(),p("ngIf",c.pagedCandidates.length===0),l(),p("ngIf",c.totalPages>0),l(),p("isOpen",c.selectedEmployee!==null))},dependencies:[z,A,j,R,q,X,Y,J,K,Z,$,ee,ne,te,ie,oe,ae,re,le,ce,se,de,H,Q,pe],styles:[`

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
.admin-dashboard[_ngcontent-%COMP%] {
  --background: #f4f7fb;
  padding: 32px 24px;
}
.gradient-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.page-header[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  font-weight: 700;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.page-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: #1F74BB;
  cursor: pointer;
  transition: all 0.2s ease;
}
.page-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
  opacity: 0.8;
}
.page-header[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {
  color: #94a3b8;
}
.top-bar[_ngcontent-%COMP%] {
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.top-bar[_ngcontent-%COMP%]   .title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.05em;
}
.top-bar[_ngcontent-%COMP%]   .title-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  margin-top: 8px;
  font-weight: 500;
}
.table-block[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #ABABAB;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.table-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 16px 20px;
  border-bottom: 2px solid #ABABAB;
}
.table-header[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.table-list-row[_ngcontent-%COMP%] {
  padding: 16px 20px;
  border-bottom: 1px solid #ABABAB;
  align-items: center;
  transition: all 0.2s ease;
  background: #ffffff;
}
.table-list-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.table-list-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}
.table-list-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 600;
}
.emp-name-cell[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: #1F74BB;
}
.emp-name-cell[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border: 1px solid #f1f5f9;
}
.primary-btn[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  --border-radius: 8px;
  font-weight: 700;
  text-transform: none;
  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  height: 44px;
  letter-spacing: 0.5px;
}
.primary-btn[_ngcontent-%COMP%]:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.primary-outline-btn[_ngcontent-%COMP%] {
  --border-color: #1F74BB;
  --color: #1F74BB;
  --border-radius: 8px;
  font-weight: 700;
  text-transform: none;
  height: 44px;
  letter-spacing: 0.5px;
}
.primary-outline-btn[_ngcontent-%COMP%]:hover {
  --background: #e8f0fb;
}
.pagination-controls[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
}
.pagination-controls[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%] {
  color: #0f172a;
}
.side-custom-popup[_ngcontent-%COMP%] {
  --width: 500px;
  --height: 100%;
  --border-radius: 0;
  --max-height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  margin: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
}
.side-custom-popup[_ngcontent-%COMP%]::part(content) {
  background: #ffffff;
}
.form-container[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
}
.form-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 24px;
  --background: transparent;
  --border-color: transparent;
}
.form-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.form-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%], 
.form-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 0px 20px;
}
.form-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus, 
.form-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.form-footer[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  padding: 24px 32px;
  border-top: 1px solid #f1f5f9;
  background: #ffffff;
}
.manager-field-wrapper[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-trigger[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-trigger[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-trigger[_ngcontent-%COMP%]   .trigger-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #1F74BB;
  margin-right: 12px;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-trigger[_ngcontent-%COMP%]   .trigger-text[_ngcontent-%COMP%] {
  flex: 1;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #0f172a;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-trigger[_ngcontent-%COMP%]   .trigger-chevron[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #475569;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%] {
  border: 1px solid #ABABAB;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #ffffff;
  margin-top: -4px;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  z-index: 10;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-search[_ngcontent-%COMP%] {
  --padding-start: 12px;
  --padding-end: 12px;
  --background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%] {
  overflow-y: auto;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%]   .manager-option[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  color: #1e293b;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%]   .manager-option[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  color: #1F74BB;
  padding-left: 20px;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%]   .manager-option.is-selected[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  font-weight: 700;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%]   .manager-option.clear-option[_ngcontent-%COMP%] {
  color: #dc2626;
  border-bottom: 1px solid #f8fafc;
  font-weight: 700;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%]   .manager-option.empty-msg[_ngcontent-%COMP%] {
  justify-content: center;
  padding: 32px;
  color: #94a3b8;
  cursor: default;
  font-weight: 500;
}
.manager-field-wrapper[_ngcontent-%COMP%]   .manager-panel[_ngcontent-%COMP%]   .manager-list[_ngcontent-%COMP%]   .manager-option[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%] {
  margin-left: auto;
  color: #1F74BB;
  font-size: 18px;
}
.upload-main-block[_ngcontent-%COMP%] {
  --width: 500px;
  --height: 70%;
  --max-height: 90%;
  --border-radius: 16px;
}
.upload-main-block[_ngcontent-%COMP%]::part(content) {
  display: flex;
  flex-direction: column;
}
.upload-main-block[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {
  flex: 1;
  --overflow: auto;
}
.upload-block[_ngcontent-%COMP%] {
  min-height: 200px;
}
.upload-block[_ngcontent-%COMP%] {
  padding: 48px 32px;
  text-align: center;
  border: 2px dashed #ABABAB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
}
.upload-block[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: #ffffff;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
.upload-block[_ngcontent-%COMP%]   .folder-icon[_ngcontent-%COMP%] {
  font-size: 56px;
  color: #1F74BB;
  margin-bottom: 16px;
}
.upload-block[_ngcontent-%COMP%]   .drag-drop-area[_ngcontent-%COMP%] {
  margin-top: 16px;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
}
.upload-block[_ngcontent-%COMP%]   .upload-icon[_ngcontent-%COMP%] {
  font-size: 32px;
  color: #94a3b8;
  margin-bottom: 12px;
}
.upload-loading-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-loading-overlay[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%] {
  text-align: center;
}
.upload-loading-overlay[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 20px 0 8px;
  letter-spacing: -0.05em;
}
.upload-loading-overlay[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 500;
}
.upload-loading-overlay[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]   .spinner-container[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.upload-loading-overlay[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]   .spinner-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: #1F74BB;
}
.progress-dots[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}
.progress-dots[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cbd5e1;
  animation: _ngcontent-%COMP%_pulse 1.5s infinite ease-in-out;
}
.progress-dots[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]:nth-child(2) {
  animation-delay: 0.2s;
}
.progress-dots[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes _ngcontent-%COMP%_pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
    background: #1F74BB;
  }
}
@media (max-width: 768px) {
  .top-bar[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .admin-dashboard[_ngcontent-%COMP%] {
    padding: 20px;
  }
  .side-custom-popup[_ngcontent-%COMP%] {
    --width: 100%;
  }
}`]});let a=s;return a})();var Ae=[{path:"",component:ue}],Ze=(()=>{let s=class s{};s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=B({type:s}),s.\u0275inj=k({imports:[W,G,ge,U.forChild(Ae)]});let a=s;return a})();export{Ze as EmployeeListPageModule};
