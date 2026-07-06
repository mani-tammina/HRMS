import{a as yn}from"./chunk-RWRS6232.js";import{a as vn}from"./chunk-U5P7UGNE.js";import{a as On}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{Aa as Pn,Ca as hn,Ga as Mn,H as dn,I as pn,R as gn,W as mn,X as _n,b as J,c as k,d as K,e as X,h as Z,i as nn,j as en,m as tn,n as on,na as un,o as an,p as rn,ra as fn,t as cn,ta as xn,u as ln,v as sn,xa as bn,ya as Cn}from"./chunk-B3PLR2IL.js";import{$a as F,Ba as P,Ca as u,Da as p,Eb as H,F as I,K as m,Ka as z,L as _,Ma as w,Na as V,Oa as a,Pa as b,Qa as C,Wb as W,Zb as j,_ as c,bb as L,ca as y,d as D,ea as $,fa as A,ja as x,qb as q,ra as g,rb as Y,sa as e,ta as t,u as B,ua as d,v as U,ya as R,yb as Q,za as G}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as T,b as N,e as v}from"./chunk-JHI3MBHO.js";function En(r,s){if(r&1){let i=P();e(0,"ion-toolbar")(1,"ion-buttons",7)(2,"ion-button",8),u("click",function(){m(i);let o=p();return _(o.deselectEmployee())}),d(3,"ion-icon",9),e(4,"span",10),a(5,"Back to Employee List"),t()()(),e(6,"ion-title"),a(7),t()()}if(r&2){let i=p();c(7),C("Manage Contracts - ",i.selectedEmployee.name)}}function In(r,s){r&1&&(e(0,"div",47),d(1,"ion-spinner",48),e(2,"p"),a(3,"Fetching workforce records..."),t()())}function An(r,s){r&1&&(e(0,"div",49),d(1,"ion-icon",43),e(2,"h3"),a(3,"No Employees Found"),t(),e(4,"p"),a(5,"Adjust your search filters or check system records."),t()())}function Tn(r,s){if(r&1){let i=P();e(0,"button",70),u("click",function(o){m(i);let l=p().$implicit;return p(3).selectEmployee(l),_(o.stopPropagation())}),d(1,"ion-icon",71),a(2," View Contracts "),t()}}function zn(r,s){if(r&1){let i=P();R(0),e(1,"button",72),u("click",function(o){m(i);let l=p().$implicit;return p(3).selectEmployee(l),_(o.stopPropagation())}),d(2,"ion-icon",71),a(3," View Contracts "),t(),e(4,"button",73),u("click",function(o){m(i);let l=p().$implicit,f=p(3);return f.selectEmployee(l),f.openAssignmentModal(),_(o.stopPropagation())}),d(5,"ion-icon",74),a(6," Assign Structure "),t(),G()}}function Vn(r,s){if(r&1){let i=P();e(0,"div",52),u("click",function(){let o=m(i).$implicit,l=p(3);return _(l.selectEmployee(o))}),e(1,"div",53)(2,"div",54)(3,"div"),a(4),t(),e(5,"div",55)(6,"span",56),a(7),t(),e(8,"span",57),a(9),t()()(),e(10,"div"),a(11),t()(),e(12,"div",58)(13,"div",59)(14,"span",60),a(15,"DEPARTMENT"),t(),e(16,"div",61),d(17,"ion-icon",62),e(18,"span"),a(19),t()()(),e(20,"div",59)(21,"span",60),a(22,"DESIGNATION"),t(),e(23,"div",61),d(24,"ion-icon",63),e(25,"span"),a(26),t()()()(),e(27,"div",64)(28,"div",65),d(29,"ion-icon",66),e(30,"span"),a(31,"Structure"),t()(),e(32,"div",67),a(33),t()(),e(34,"div",68),x(35,Tn,3,0,"button",69)(36,zn,7,0,"ng-container",2),t()()}if(r&2){let i,n=s.$implicit;c(3),V("avatar-box color-"+n.name.charCodeAt(0)%7),c(),C(" ",n.name.charAt(0)," "),c(3),b(n.name),c(2),b(n.employeeNumber||"EMP"+(100+n.id)),c(),V("status-badge "+((n.assignmentStatus==null||(i=n.assignmentStatus.toLowerCase())==null?null:i.replace(" ","-"))||"not-assigned")),c(),C(" ",n.assignmentStatus||"Not Assigned"," "),c(8),b(n.department||"Engineering"),c(7),b(n.designation||"Senior Developer"),c(7),C(" ",n.assignedStructureName||"Senior Structure"," "),c(2),g("ngIf",n.assignmentStatus==="Assigned"),c(),g("ngIf",n.assignmentStatus!=="Assigned")}}function Fn(r,s){if(r&1&&(e(0,"div",50),x(1,Vn,37,13,"div",51),t()),r&2){let i=p(2);c(),g("ngForOf",i.filteredEmployees)}}function Ln(r,s){if(r&1){let i=P();e(0,"div")(1,"div",11)(2,"a",12),d(3,"ion-icon",9),a(4," Back to Payroll Dashboard "),t(),e(5,"div",13)(6,"span"),a(7,"Payroll Master Setup"),t(),d(8,"ion-icon",14),e(9,"span",15),a(10,"Employee Salary Setup"),t()(),e(11,"h1",16),a(12,"Employee Salary Setup"),t(),e(13,"p",17),a(14,"Map employees to salary templates and define Annual CTC with effective dates."),t()(),e(15,"div",18)(16,"div",19)(17,"div",20),d(18,"ion-icon",21),t(),e(19,"div",22)(20,"h2"),a(21,"Bulk Assignment Mapping"),t(),e(22,"p"),a(23,"Upload employee salary contracts using Excel templates for bulk payroll assignment."),t(),e(24,"div",23)(25,"span",24)(26,"span",25),a(27,"\u2022"),t(),a(28," Employee ID"),t(),e(29,"span",24)(30,"span",25),a(31,"\u2022"),t(),a(32," Annual CTC"),t(),e(33,"span",24)(34,"span",25),a(35,"\u2022"),t(),a(36," Payroll Structure"),t()()()(),e(37,"div",26),u("dragover",function(o){m(i);let l=p();return o.preventDefault(),_(l.dragOver=!0)})("dragleave",function(){m(i);let o=p();return _(o.dragOver=!1)})("drop",function(o){m(i);let l=p();return o.preventDefault(),l.dragOver=!1,_(l.handleDrop(o))})("click",function(){m(i);let o=z(51);return _(o.click())}),d(38,"ion-icon",27),e(39,"span",28),a(40,"Drop Excel file here"),t(),e(41,"span",29),a(42,"or click to browse - .xlsx, .xls"),t()(),e(43,"div",30)(44,"button",31),u("click",function(o){return m(i),p().downloadTemplate(),_(o.stopPropagation())}),d(45,"ion-icon",32),a(46," Download Template "),t(),e(47,"button",33),u("click",function(o){return m(i),z(51).click(),_(o.stopPropagation())}),d(48,"ion-icon",27),a(49," Upload & Map Contracts "),t()(),e(50,"input",34,0),u("change",function(o){m(i);let l=p();return _(l.onFileSelected(o))}),t()(),e(52,"div",35)(53,"div",36),d(54,"ion-icon",37),e(55,"input",38),u("input",function(o){m(i);let l=p();return _(l.onSearch(o))}),t()(),e(56,"div",39)(57,"button",40),d(58,"ion-icon",41),a(59," Filter "),t(),e(60,"button",40),d(61,"ion-icon",32),a(62," Export "),t(),e(63,"button",42),d(64,"ion-icon",43),a(65),t()()(),x(66,In,4,0,"div",44)(67,An,6,0,"div",45)(68,Fn,2,1,"div",46),t()}if(r&2){let i=p();c(37),w("drag-over",i.dragOver),c(18),g("value",i.searchQuery),c(10),C(" ",i.filteredEmployees.length," Employees "),c(),g("ngIf",i.isLoading),c(),g("ngIf",!i.isLoading&&i.filteredEmployees.length===0),c(),g("ngIf",!i.isLoading&&i.filteredEmployees.length>0)}}function jn(r,s){r&1&&(e(0,"div",47),d(1,"ion-spinner",89),e(2,"p"),a(3,"Assembling fiscal timeline..."),t()())}function Nn(r,s){if(r&1){let i=P();e(0,"div",90),d(1,"div",91)(2,"ion-icon",66),e(3,"h3"),a(4,"No active assignments"),t(),e(5,"p"),a(6,"This employee is currently outside the payroll cycle. Initiate an assignment to begin tracking."),t(),e(7,"button",92),u("click",function(){m(i);let o=p(2);return _(o.openAssignmentModal())}),a(8," Assign Initial Structure "),t()()}}function Dn(r,s){if(r&1){let i=P();e(0,"button",116),u("click",function(){m(i);let o=p().$implicit,l=p(3);return _(l.deleteContract(o.id||o.contract_id))}),d(1,"ion-icon",117),e(2,"span"),a(3,"Terminate"),t()()}}function Bn(r,s){if(r&1){let i=P();e(0,"div",96)(1,"div",97),d(2,"div",98),t(),e(3,"div",99)(4,"div",100)(5,"div",101)(6,"span",102),a(7,"PAYROLL PATTERN"),t(),e(8,"h3"),a(9),t()(),e(10,"div",103)(11,"span",104),d(12,"ion-icon",105),a(13),t()()(),e(14,"div",106)(15,"div",107),d(16,"ion-icon",108),e(17,"div",109)(18,"label"),a(19,"Annual CTC"),t(),e(20,"span"),a(21),t()()(),e(22,"div",107),d(23,"ion-icon",110),e(24,"div",109)(25,"label"),a(26,"Effective Period"),t(),e(27,"span"),a(28),F(29,"date"),d(30,"ion-icon",111),a(31),F(32,"date"),t()()(),e(33,"div",112)(34,"button",113),u("click",function(){let o=m(i).$implicit,l=p(3);return _(l.openAssignmentModal(o))}),d(35,"ion-icon",114),e(36,"span"),a(37,"Manage"),t()(),x(38,Dn,4,0,"button",115),t()()()()}if(r&2){let i=s.$implicit,n=p(3);w("active-strip",(i.status==null?null:i.status.toLowerCase())==="active"),c(),w("dot-active",(i.status==null?null:i.status.toLowerCase())==="active"),c(8),b(i.template_name||"Individual Structure"),c(2),w("st-active",(i.status==null?null:i.status.toLowerCase())==="active"),c(2),C(" ",i.status," "),c(8),b(n.formatCurrency(i.annual_ctc)),c(7),C(" ",L(29,12,i.effective_from,"MMM yyyy")," "),c(3),C(" ",i.effective_to?L(32,15,i.effective_to,"MMM yyyy"):"Ongoing"," "),c(7),g("ngIf",(i.status==null?null:i.status.toLowerCase())==="active")}}function Un(r,s){if(r&1&&(e(0,"div",93),d(1,"div",94),x(2,Bn,39,18,"div",95),t()),r&2){let i=p(2);c(2),g("ngForOf",i.employeeContracts)}}function $n(r,s){if(r&1){let i=P();e(0,"div",75)(1,"div",76)(2,"div",77)(3,"div",78),d(4,"div",79),e(5,"span"),a(6),t()(),e(7,"div",80)(8,"h2"),a(9),t(),e(10,"div",81)(11,"span",82),d(12,"ion-icon",83),a(13),t(),d(14,"span",84),e(15,"span",82),d(16,"ion-icon",85),a(17),t()()()(),e(18,"button",86),u("click",function(){m(i);let o=p();return _(o.openAssignmentModal())}),d(19,"ion-icon",74),a(20," Create New Assignment "),t()(),x(21,jn,4,0,"div",44)(22,Nn,9,0,"div",87)(23,Un,3,1,"div",88),t()}if(r&2){let i=p();c(6),b(i.selectedEmployee.name.charAt(0)),c(3),b(i.selectedEmployee.name),c(4),C(" ",i.selectedEmployee.email),c(4),C(" ID: ",i.selectedEmployee.id),c(4),g("ngIf",i.isLoadingContracts),c(),g("ngIf",!i.isLoadingContracts&&i.employeeContracts.length===0),c(),g("ngIf",!i.isLoadingContracts&&i.employeeContracts.length>0)}}function Rn(r,s){if(r&1&&(e(0,"div",153)(1,"div",154),a(2),t(),e(3,"div",155)(4,"span",156),a(5),t(),e(6,"span",157),a(7),t()(),e(8,"div",158),a(9,"EMPLOYEE"),t()()),r&2){let i=p(2);c(2),b(i.selectedEmployee.name.charAt(0)),c(3),b(i.selectedEmployee.name),c(2),b(i.selectedEmployee.email)}}function Gn(r,s){if(r&1&&(e(0,"option",159),a(1),t()),r&2){let i=s.$implicit;g("value",i.template_id||i.id),c(),C(" ",i.template_name||i.name," ")}}function qn(r,s){if(r&1&&(e(0,"div",160),a(1," Est. Monthly Gross: "),e(2,"strong"),a(3),t()()),r&2){let i,n=p(2);c(3),b(n.formatCurrency(((i=n.assignmentForm.get("annual_ctc"))==null?null:i.value)/12))}}function Yn(r,s){if(r&1){let i=P();e(0,"div",161)(1,"div",132),d(2,"ion-icon",162),a(3," Lifecycle Management "),t(),e(4,"div",133)(5,"label"),a(6,"Contract Status"),t(),e(7,"div",163)(8,"button",164),u("click",function(){m(i);let o=p(2);return _(o.assignmentForm.patchValue({status:"Active"}))}),a(9," Active "),t(),e(10,"button",165),u("click",function(){m(i);let o=p(2);return _(o.assignmentForm.patchValue({status:"Inactive"}))}),a(11," Inactive "),t()()()()}if(r&2){let i,n,o=p(2);c(8),w("active-st",((i=o.assignmentForm.get("status"))==null?null:i.value)==="Active"),c(2),w("active-st-inv",((n=o.assignmentForm.get("status"))==null?null:n.value)==="Inactive")}}function Qn(r,s){r&1&&d(0,"ion-spinner",48)}function Hn(r,s){if(r&1&&(e(0,"span"),a(1),t()),r&2){let i=p(2);c(),C(" ",i.editingContractId?"Update Assignment":"Assign Structure"," ")}}function Wn(r,s){if(r&1){let i=P();e(0,"div",118)(1,"div",119)(2,"div",120)(3,"div",121),d(4,"ion-icon",122),t(),e(5,"div",123)(6,"h2"),a(7),t(),e(8,"p"),a(9,"Define salary structure and fiscal commitment"),t()()(),e(10,"div",124)(11,"ion-button",125),u("click",function(){m(i);let o=p();return _(o.closeModal())}),d(12,"ion-icon",126),t()()(),e(13,"ion-content",127)(14,"div",128),x(15,Rn,10,3,"div",129),e(16,"form",130)(17,"div",131)(18,"div",132),d(19,"ion-icon",66),a(20," Payroll Configuration "),t(),e(21,"div",133)(22,"label"),a(23,"Salary Template"),t(),e(24,"div",134)(25,"select",135)(26,"option",136),a(27,"Choose a Template..."),t(),x(28,Gn,2,2,"option",137),t(),d(29,"ion-icon",138),t(),e(30,"p",139),a(31,"Map components based on the selected pattern."),t()()(),e(32,"div",131)(33,"div",132),d(34,"ion-icon",108),a(35," Compensation Details "),t(),e(36,"div",133)(37,"label"),a(38,"Annual CTC (Gross)"),t(),e(39,"div",140)(40,"span",141),a(41,"\u20B9"),t(),d(42,"input",142),t(),x(43,qn,4,1,"div",143),t(),e(44,"div",144)(45,"div",133)(46,"label"),a(47,"Valid From"),t(),d(48,"input",145),t(),e(49,"div",133)(50,"label"),a(51,"Valid Until"),t(),d(52,"input",146),t()()(),x(53,Yn,12,4,"div",147),t()()(),e(54,"div",148)(55,"div",149),d(56,"ion-icon",150),a(57),t(),e(58,"button",151),u("click",function(){m(i);let o=p();return _(o.saveAssignment())}),x(59,Qn,1,0,"ion-spinner",152)(60,Hn,2,1,"span",2),t()()()}if(r&2){let i,n=p();c(4),g("name",n.editingContractId?"create-outline":"sparkles-outline"),c(3),b(n.editingContractId?"Edit Contract":"New Assignment"),c(8),g("ngIf",n.selectedEmployee),c(),g("formGroup",n.assignmentForm),c(12),g("ngForOf",n.templates),c(15),g("ngIf",(i=n.assignmentForm.get("annual_ctc"))==null?null:i.value),c(10),g("ngIf",n.editingContractId),c(4),C(" ",n.editingContractId?"Changes will reflect in the next payroll execution.":"A new assignment replaces any previous active pattern."," "),c(),g("disabled",n.assignmentForm.invalid||n.isSaving),c(),g("ngIf",n.isSaving),c(),g("ngIf",!n.isSaving)}}var kn=(()=>{let s=class s{constructor(n,o,l,f,h,O){this.financeService=n,this.payrollService=o,this.toaster=l,this.fb=f,this.loadingCtrl=h,this.alertCtrl=O,this.allEmployees=[],this.filteredEmployees=[],this.templates=[],this.cachedContracts=[],this.isLoading=!1,this.searchQuery="",this.isModalOpen=!1,this.editingContractId=null,this.selectedEmployee=null,this.employeeContracts=[],this.isLoadingContracts=!1,this.isSaving=!1,this.searchSubject=new D,this.selectedTemplateForBulk=null,this.isImporting=!1,this.dragOver=!1,this.assignmentForm=this.fb.group({template_id:["",k.required],annual_ctc:["",[k.required,k.min(0)]],effective_from:[new Date().toISOString().split("T")[0],k.required],effective_to:[""],status:["Active",k.required]})}ngOnInit(){this.loadTemplatesAndContracts(),this.setupSearch()}setupSearch(){this.searchSubject.pipe(B(400),U()).subscribe(n=>{if(!n){this.loadEmployees();return}this.performSearch(n)})}loadTemplatesAndContracts(){this.isLoading=!0,this.payrollService.getPayrollTempletes().subscribe({next:n=>{this.templates=Array.isArray(n)?n:n.data||[],this.financeService.getAllContracts().subscribe({next:o=>{this.cachedContracts=o||[],this.loadEmployees()},error:()=>{this.loadEmployees()}})},error:()=>{this.loadEmployees()}})}refreshContracts(n){this.financeService.getAllContracts().subscribe({next:o=>{this.cachedContracts=o||[],this.allEmployees=this.mapEmployeeContracts(this.allEmployees),this.applyFilter(),n&&n()},error:()=>{n&&n()}})}mapEmployeeContracts(n){return n.map(o=>{let l=this.cachedContracts.filter(M=>M.employee_id===o.id),f=l.find(M=>M.status?.toLowerCase()==="active"),h=l.find(M=>M.status?.toLowerCase()==="pending"),O="Not Assigned",S="Senior Structure",E=0;if(f)O="Assigned",S=f.template_name||"Senior Structure",E=f.annual_ctc;else if(h)O="Pending",S=h.template_name||"Senior Structure",E=h.annual_ctc;else if(l.length>0){let M=l[0];O=M.status||"Inactive",S=M.template_name||"Senior Structure",E=M.annual_ctc}return N(T({},o),{assignmentStatus:O,assignedStructureName:S,annualCtc:E,contractsCount:l.length})})}loadEmployees(){this.isLoading=!0,this.financeService.getWorkingEmployees(1,1e3,"").subscribe({next:n=>{this.allEmployees=this.mapEmployeeContracts(n.data||[]),this.applyFilter(),this.isLoading=!1},error:()=>{this.isLoading=!1,this.toaster.showError("Failed to load employees")}})}onSearch(n){let o=(n.target.value||"").trim();this.searchSubject.next(o)}performSearch(n){this.searchQuery=n,this.isLoading=!0,this.financeService.searchEmployees(n).subscribe({next:o=>{this.filteredEmployees=this.mapEmployeeContracts(o.data||[]),this.isLoading=!1},error:()=>{this.isLoading=!1,this.toaster.showError("Search failed")}})}applyFilter(){this.searchQuery||(this.filteredEmployees=[...this.allEmployees])}selectEmployee(n){return v(this,null,function*(){this.selectedEmployee=n,this.loadEmployeeContracts(n.id)})}loadEmployeeContracts(n){this.isLoadingContracts=!0,this.financeService.getEmployeeContracts(n).subscribe({next:o=>{this.employeeContracts=o.data||o||[],this.isLoadingContracts=!1},error:()=>{this.isLoadingContracts=!1,this.toaster.showError("Failed to load employee contracts")}})}openAssignmentModal(n){this.selectedEmployee&&(n?(this.editingContractId=n.id||n.contract_id,this.assignmentForm.patchValue({template_id:n.template_id,annual_ctc:n.annual_ctc,effective_from:n.effective_from?.split("T")[0],effective_to:n.effective_to?.split("T")[0],status:n.status||"Active"})):(this.editingContractId=null,this.assignmentForm.reset({template_id:"",annual_ctc:this.selectedEmployee.salary||"",effective_from:new Date().toISOString().split("T")[0],effective_to:"",status:"Active"})),this.isModalOpen=!0)}saveAssignment(){return v(this,null,function*(){if(this.assignmentForm.invalid||!this.selectedEmployee)return;this.isSaving=!0;let n=yield this.loadingCtrl.create({message:this.editingContractId?"Updating Contract...":"Creating Contract...",cssClass:"glass-loading"});yield n.present();let o=T({employee_id:this.selectedEmployee.id},this.assignmentForm.value);(this.editingContractId?this.financeService.updateContract(this.editingContractId,o):this.financeService.createContract(o)).subscribe({next:()=>{this.isSaving=!1,this.isModalOpen=!1,n.dismiss(),this.toaster.showSuccess(`Contract ${this.editingContractId?"updated":"created"} successfully.`),this.refreshContracts(()=>{this.selectedEmployee&&this.loadEmployeeContracts(this.selectedEmployee.id)})},error:f=>{this.isSaving=!1,n.dismiss(),this.toaster.showError(f.error?.message||"Operation failed")}})})}deleteContract(n){return v(this,null,function*(){yield(yield this.alertCtrl.create({header:"Terminate Contract",message:"Setting an end date will deactivate this payroll structure for the employee. Please select the effective last date.",inputs:[{name:"effective_to",type:"date",value:new Date().toISOString().split("T")[0],placeholder:"Effective Last Date"}],buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:()=>!0},{text:"Terminate Now",handler:l=>l&&l.effective_to?(this.executeTermination(n,l.effective_to),!0):(this.toaster.showWarning("Please select a valid termination date"),!1)}]})).present()})}executeTermination(n,o){return v(this,null,function*(){let l=yield this.loadingCtrl.create({message:"Processing Termination...",cssClass:"glass-loading"});yield l.present(),this.financeService.terminateContract(n,{effective_to:o}).subscribe({next:()=>{l.dismiss(),this.toaster.showSuccess("Contract terminated successfully"),this.refreshContracts(()=>{this.selectedEmployee&&this.loadEmployeeContracts(this.selectedEmployee.id)})},error:f=>{l.dismiss(),this.toaster.showError(f.error?.message||"Termination failed")}})})}formatCurrency(n){return"\u20B9"+(n||0).toLocaleString("en-IN")}closeModal(){this.isModalOpen=!1,this.editingContractId=null}deselectEmployee(){this.selectedEmployee=null,this.employeeContracts=[]}handleDrop(n){n.dataTransfer&&n.dataTransfer.files.length>0&&this.importContracts(n.dataTransfer.files[0])}onFileSelected(n){return v(this,null,function*(){let o=n.target.files[0];o&&(this.importContracts(o),n.target.value="")})}importContracts(n){return v(this,null,function*(){this.isImporting=!0;let o=yield this.loadingCtrl.create({message:"Uploading and Mapping Contracts...",cssClass:"glass-loading"});yield o.present(),this.financeService.uploadBulkContracts(n).subscribe({next:l=>{this.isImporting=!1,o.dismiss(),l.success?(this.toaster.showSuccess(`Successfully mapped ${l.inserted} contracts. ${l.skipped} skipped.`),this.refreshContracts()):this.toaster.showError(l.message||"Import failed")},error:l=>{this.isImporting=!1,o.dismiss(),this.toaster.showError(l.error?.message||"Upload failed")}})})}downloadTemplate(){let n=["EmployeeNumber","remuneration_amount","template_name"],o=[["EMP001","500000","Standard Employee Package"],["EMP002","750000","Senior Employee Package"]],l="data:text/csv;charset=utf-8,"+n.join(",")+`
`+o.map(O=>O.join(",")).join(`
`),f=encodeURI(l),h=document.createElement("a");h.setAttribute("href",f),h.setAttribute("download","payroll_mapping_template.csv"),document.body.appendChild(h),h.click(),document.body.removeChild(h)}};s.\u0275fac=function(o){return new(o||s)(y(vn),y(yn),y(On),y(cn),y(hn),y(Pn))},s.\u0275cmp=$({type:s,selectors:[["app-payroll-assignment"]],standalone:!1,decls:8,vars:4,consts:[["fileInput",""],[1,"assignment-header"],[4,"ngIf"],[1,"assignment-content"],[1,"assignment-container"],["class","manage-view animate-in",4,"ngIf"],[1,"assignment-modal","glass-modal",3,"didDismiss","isOpen"],["slot","start"],[3,"click"],["name","arrow-back-outline"],[2,"margin-left","8px"],[1,"custom-page-header"],["routerLink","/finance/admin",1,"back-link"],[1,"breadcrumb-trail"],["name","chevron-forward-outline"],[1,"active-crumb"],[1,"page-main-title"],[1,"page-sub-title"],[1,"bulk-assignment-card"],[1,"bulk-left-info"],[1,"bulk-icon-wrapper"],["name","document-text"],[1,"bulk-text-details"],[1,"bulk-bullets"],[1,"bullet-item"],[1,"bullet-dot"],[1,"bulk-drag-drop",3,"dragover","dragleave","drop","click"],["name","cloud-upload-outline"],[1,"drop-title"],[1,"drop-subtitle"],[1,"bulk-actions-stack"],[1,"btn-download-template",3,"click"],["name","download-outline"],[1,"btn-upload-map",3,"click"],["type","file","accept",".xlsx, .xls, .csv","hidden","",3,"change"],[1,"search-filter-toolbar"],[1,"search-box-wrapper"],["name","search-outline",1,"search-icon"],["type","text","placeholder","Search components",3,"input","value"],[1,"toolbar-actions"],[1,"btn-toolbar-action"],["name","funnel-outline"],[1,"btn-toolbar-badge"],["name","people-outline"],["class","loader-wrap",4,"ngIf"],["class","empty-wrap",4,"ngIf"],["class","employee-grid",4,"ngIf"],[1,"loader-wrap"],["name","crescent"],[1,"empty-wrap"],[1,"employee-grid"],["class","employee-card animate-in",3,"click",4,"ngFor","ngForOf"],[1,"employee-card","animate-in",3,"click"],[1,"card-header"],[1,"card-header-left"],[1,"name-id-meta"],[1,"employee-name"],[1,"employee-id"],[1,"card-body-grid"],[1,"meta-column"],[1,"meta-label"],[1,"meta-val-icon"],["name","business-outline"],["name","briefcase-outline"],[1,"structure-info-box"],[1,"struct-left"],["name","layers-outline"],[1,"struct-right"],[1,"card-footer-actions"],["class","btn-view-contracts-full",3,"click",4,"ngIf"],[1,"btn-view-contracts-full",3,"click"],["name","eye-outline"],[1,"btn-view-contracts-half",3,"click"],[1,"btn-assign-structure-half",3,"click"],["name","add-circle-outline"],[1,"manage-view","animate-in"],[1,"view-header-detail"],[1,"emp-profile-luxe"],[1,"profile-avatar-box"],[1,"avatar-glow"],[1,"profile-meta-luxe"],[1,"sub-meta"],[1,"m-item"],["name","mail-outline"],[1,"m-divider"],["name","finger-print-outline"],[1,"neon-btn","mini",3,"click"],["class","empty-timeline",4,"ngIf"],["class","contracts-stack",4,"ngIf"],["name","bubbles","color","primary"],[1,"empty-timeline"],[1,"empty-glow"],[1,"glass-btn-large",3,"click"],[1,"contracts-stack"],[1,"stack-line"],["class","contract-strip-card",3,"active-strip",4,"ngFor","ngForOf"],[1,"contract-strip-card"],[1,"timeline-dot"],[1,"dot-inner"],[1,"strip-content","glass-card"],[1,"strip-header"],[1,"title-group"],[1,"category-tag"],[1,"badge-group"],[1,"strip-status"],["name","radio-button-on-outline"],[1,"strip-body"],[1,"info-metric"],["name","cash-outline"],[1,"m-val"],["name","calendar-clear-outline"],["name","arrow-forward-outline",1,"date-sep"],[1,"strip-actions"],["title","Edit Parameters",1,"action-circle","edit",3,"click"],["name","create-outline"],["class","action-circle term","title","Terminate Membership",3,"click",4,"ngIf"],["title","Terminate Membership",1,"action-circle","term",3,"click"],["name","trash-outline"],[1,"modal-wrapper","animate-in"],[1,"modal-header-gradient"],[1,"header-main","d-flex"],[1,"modal-icon-badge"],[3,"name"],[2,"margin-left","15px"],[1,"header-action","close-algn"],["fill","clear",3,"click"],["name","close-outline","slot","icon-only"],[1,"modal-body-content"],[1,"form-container"],["class","emp-summary-card",4,"ngIf"],[1,"beauty-form",3,"formGroup"],[1,"form-section"],[1,"section-title"],[1,"form-group-lux"],[1,"select-wrapper"],["formControlName","template_id",1,"lux-input"],["value",""],[3,"value",4,"ngFor","ngForOf"],["name","chevron-down-outline",1,"select-chevron"],[1,"input-hint"],[1,"input-wrapper-lux"],[1,"curr-prefix"],["type","number","formControlName","annual_ctc","placeholder","e.g. 15,00,000",1,"lux-input"],["class","monthly-preview",4,"ngIf"],[1,"grid-row"],["type","date","formControlName","effective_from",1,"lux-input"],["type","date","formControlName","effective_to","placeholder","Ongoing",1,"lux-input"],["class","form-section no-border",4,"ngIf"],[1,"modal-footer-lux"],[1,"footer-note"],["name","information-circle-outline"],[1,"prime-action-btn",3,"click","disabled"],["name","crescent",4,"ngIf"],[1,"emp-summary-card"],[1,"s-avatar"],[1,"s-meta"],[1,"s-name"],[1,"s-sub"],[1,"s-badge"],[3,"value"],[1,"monthly-preview"],[1,"form-section","no-border"],["name","shield-checkmark-outline"],[1,"status-grid"],["type","button",1,"st-option",3,"click"],["type","button",1,"st-option","inv",3,"click"]],template:function(o,l){o&1&&(e(0,"ion-header",1),x(1,En,8,1,"ion-toolbar",2),t(),e(2,"ion-content",3)(3,"div",4),x(4,Ln,69,7,"div",2)(5,$n,24,7,"div",5),t(),e(6,"ion-modal",6),u("didDismiss",function(){return l.closeModal()}),x(7,Wn,61,11,"ng-template"),t()()),o&2&&(c(),g("ngIf",l.selectedEmployee),c(3),g("ngIf",!l.selectedEmployee),c(),g("ngIf",l.selectedEmployee),c(),g("isOpen",l.isModalOpen))},dependencies:[q,Y,Z,an,rn,J,nn,on,K,X,en,tn,dn,pn,gn,mn,_n,un,fn,xn,Cn,bn,W,Q],styles:[`@charset "UTF-8";



.assignment-content[_ngcontent-%COMP%] {
  --background: #f8fbfd;
}
.assignment-container[_ngcontent-%COMP%] {
  padding: 32px 40px;
  margin: 0 auto;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
}
.custom-page-header[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.custom-page-header[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 12px;
}
.custom-page-header[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.custom-page-header[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {
  color: #1a73e8;
}
.custom-page-header[_ngcontent-%COMP%]   .breadcrumb-trail[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.custom-page-header[_ngcontent-%COMP%]   .breadcrumb-trail[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 10px;
}
.custom-page-header[_ngcontent-%COMP%]   .breadcrumb-trail[_ngcontent-%COMP%]   .active-crumb[_ngcontent-%COMP%] {
  color: #1a73e8;
  font-weight: 500;
}
.custom-page-header[_ngcontent-%COMP%]   .page-main-title[_ngcontent-%COMP%] {
  font-size: 32px;
  font-weight: 800;
  color: #0c1a30;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}
.custom-page-header[_ngcontent-%COMP%]   .page-sub-title[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}
.bulk-assignment-card[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #eef2f6;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 32px;
}
@media (max-width: 1024px) {
  .bulk-assignment-card[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 24px;
  }
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%]   .bulk-icon-wrapper[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  background: #eef3fc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
  font-size: 26px;
  flex-shrink: 0;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%]   .bulk-text-details[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #0c1a30;
  margin: 0 0 6px 0;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%]   .bulk-text-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 12px 0;
  line-height: 1.4;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%]   .bulk-text-details[_ngcontent-%COMP%]   .bulk-bullets[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%]   .bulk-text-details[_ngcontent-%COMP%]   .bulk-bullets[_ngcontent-%COMP%]   .bullet-item[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 6px;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-left-info[_ngcontent-%COMP%]   .bulk-text-details[_ngcontent-%COMP%]   .bulk-bullets[_ngcontent-%COMP%]   .bullet-item[_ngcontent-%COMP%]   .bullet-dot[_ngcontent-%COMP%] {
  color: #1a73e8;
  font-size: 14px;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop[_ngcontent-%COMP%] {
  width: 280px;
  height: 96px;
  border: 2px dashed #cbd5e1;
  background: #f8fafc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
}
@media (max-width: 1024px) {
  .bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop[_ngcontent-%COMP%] {
    width: 100%;
  }
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #1a73e8;
  margin-bottom: 4px;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop[_ngcontent-%COMP%]   .drop-title[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: #334155;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop[_ngcontent-%COMP%]   .drop-subtitle[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 2px;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop.drag-over[_ngcontent-%COMP%], 
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-drag-drop[_ngcontent-%COMP%]:hover {
  background: #eef3fc;
  border-color: #1a73e8;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 220px;
  flex-shrink: 0;
}
@media (max-width: 1024px) {
  .bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%] {
    width: 100%;
    flex-direction: row;
  }
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
}
@media (max-width: 1024px) {
  .bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    flex: 1;
  }
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%]   .btn-download-template[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%]   .btn-download-template[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%]   .btn-upload-map[_ngcontent-%COMP%] {
  background: #1a73e8;
  border: none;
  color: white;
  box-shadow: 0 4px 10px rgba(26, 115, 232, 0.15);
}
.bulk-assignment-card[_ngcontent-%COMP%]   .bulk-actions-stack[_ngcontent-%COMP%]   .btn-upload-map[_ngcontent-%COMP%]:hover {
  background: #1557b0;
  box-shadow: 0 6px 14px rgba(26, 115, 232, 0.25);
}
.search-filter-toolbar[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
@media (max-width: 768px) {
  .search-filter-toolbar[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
}
.search-filter-toolbar[_ngcontent-%COMP%]   .search-box-wrapper[_ngcontent-%COMP%] {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .search-box-wrapper[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  font-size: 20px;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .search-box-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 100%;
  height: 42px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 16px 0 44px;
  font-size: 14px;
  color: #334155;
  outline: none;
  transition: border-color 0.2s;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .search-box-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .search-box-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.08);
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%]   .btn-toolbar-action[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 0 16px;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%]   .btn-toolbar-action[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%]   .btn-toolbar-action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%]   .btn-toolbar-badge[_ngcontent-%COMP%] {
  background: #e8f0fe;
  border: 1px solid transparent;
  color: #1a73e8;
  padding: 0 18px;
  cursor: default;
}
.search-filter-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%]   .btn-toolbar-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.loader-wrap[_ngcontent-%COMP%], 
.empty-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #94a3b8;
  background: white;
  border-radius: 20px;
  border: 1px solid #eef2f6;
}
.loader-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.empty-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  margin-bottom: 16px;
  color: #cbd5e1;
}
.loader-wrap[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], 
.empty-wrap[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #475569;
  margin: 0 0 6px 0;
}
.loader-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], 
.empty-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  margin: 0;
}
.employee-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}
.employee-card[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #eef2f6;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.015);
  padding: 20px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}
.employee-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  border-color: #1a73e8;
  box-shadow: 0 12px 24px rgba(26, 115, 232, 0.06);
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-header-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-0[_ngcontent-%COMP%] {
  background: #1a73e8;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-1[_ngcontent-%COMP%] {
  background: #6870fa;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-2[_ngcontent-%COMP%] {
  background: #0f9d58;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-3[_ngcontent-%COMP%] {
  background: #f4b400;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-4[_ngcontent-%COMP%] {
  background: #db4437;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-5[_ngcontent-%COMP%] {
  background: #ab47bc;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .avatar-box.color-6[_ngcontent-%COMP%] {
  background: #ec407a;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .name-id-meta[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .name-id-meta[_ngcontent-%COMP%]   .employee-name[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0c1a30;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .name-id-meta[_ngcontent-%COMP%]   .employee-id[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 2px;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: capitalize;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge.assigned[_ngcontent-%COMP%] {
  background: #e6f4ea;
  color: #137333;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge.pending[_ngcontent-%COMP%] {
  background: #fef7e0;
  color: #b06000;
}
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge.not-assigned[_ngcontent-%COMP%], 
.employee-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge.inactive[_ngcontent-%COMP%] {
  background: #fce8e6;
  color: #c5221f;
}
.employee-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.employee-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%]   .meta-column[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.employee-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%]   .meta-column[_ngcontent-%COMP%]   .meta-label[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.employee-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%]   .meta-column[_ngcontent-%COMP%]   .meta-val-icon[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
}
.employee-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%]   .meta-column[_ngcontent-%COMP%]   .meta-val-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 15px;
  color: #94a3b8;
}
.employee-card[_ngcontent-%COMP%]   .structure-info-box[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 18px;
}
.employee-card[_ngcontent-%COMP%]   .structure-info-box[_ngcontent-%COMP%]   .struct-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
}
.employee-card[_ngcontent-%COMP%]   .structure-info-box[_ngcontent-%COMP%]   .struct-left[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 15px;
}
.employee-card[_ngcontent-%COMP%]   .structure-info-box[_ngcontent-%COMP%]   .struct-right[_ngcontent-%COMP%] {
  color: #334155;
  font-size: 13px;
  font-weight: 700;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  height: 38px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .btn-view-contracts-full[_ngcontent-%COMP%] {
  width: 100%;
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .btn-view-contracts-full[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .btn-view-contracts-half[_ngcontent-%COMP%] {
  flex: 1;
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .btn-view-contracts-half[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .btn-assign-structure-half[_ngcontent-%COMP%] {
  flex: 1;
  background: #e8f0fe;
  border: 1px solid transparent;
  color: #1a73e8;
}
.employee-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .btn-assign-structure-half[_ngcontent-%COMP%]:hover {
  background: #d2e3fc;
}
.view-header-detail[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 20px;
}
@media (max-width: 768px) {
  .view-header-detail[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
  }
}
.view-header-detail[_ngcontent-%COMP%]   .neon-btn.mini[_ngcontent-%COMP%] {
  background: #1a73e8;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(26, 115, 232, 0.15);
}
.view-header-detail[_ngcontent-%COMP%]   .neon-btn.mini[_ngcontent-%COMP%]:hover {
  background: #1557b0;
}
.emp-profile-luxe[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 24px;
  background: white;
  padding: 28px;
  border-radius: 24px;
  border: 1px solid #eef2f6;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
}
.emp-profile-luxe[_ngcontent-%COMP%]   .profile-avatar-box[_ngcontent-%COMP%] {
  width: 68px;
  height: 68px;
  background: #eef3fc;
  border: 2px solid #1a73e8;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
  font-size: 28px;
  font-weight: 800;
}
.emp-profile-luxe[_ngcontent-%COMP%]   .profile-meta-luxe[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #0c1a30;
  letter-spacing: -0.5px;
}
.emp-profile-luxe[_ngcontent-%COMP%]   .profile-meta-luxe[_ngcontent-%COMP%]   .sub-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
}
.emp-profile-luxe[_ngcontent-%COMP%]   .profile-meta-luxe[_ngcontent-%COMP%]   .sub-meta[_ngcontent-%COMP%]   .m-item[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.emp-profile-luxe[_ngcontent-%COMP%]   .profile-meta-luxe[_ngcontent-%COMP%]   .sub-meta[_ngcontent-%COMP%]   .m-divider[_ngcontent-%COMP%] {
  width: 1px;
  height: 12px;
  background: #cbd5e1;
}
.contracts-stack[_ngcontent-%COMP%] {
  position: relative;
  padding-left: 44px;
  margin-top: 40px;
}
.stack-line[_ngcontent-%COMP%] {
  position: absolute;
  left: 9px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}
.contract-strip-card[_ngcontent-%COMP%] {
  position: relative;
  margin-bottom: 24px;
}
.contract-strip-card[_ngcontent-%COMP%]   .timeline-dot[_ngcontent-%COMP%] {
  position: absolute;
  left: -44px;
  top: 28px;
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #cbd5e1;
  border-radius: 50%;
  z-index: 2;
}
.contract-strip-card[_ngcontent-%COMP%]   .timeline-dot.dot-active[_ngcontent-%COMP%] {
  border-color: #0f9d58;
  box-shadow: 0 0 0 6px rgba(15, 157, 88, 0.1);
}
.contract-strip-card[_ngcontent-%COMP%]   .strip-content[_ngcontent-%COMP%] {
  background: white;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.015);
  transition: all 0.2s;
}
.contract-strip-card[_ngcontent-%COMP%]   .strip-content[_ngcontent-%COMP%]:hover {
  border-color: #1a73e8;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.03);
}
.contract-strip-card.active-strip[_ngcontent-%COMP%]   .strip-content[_ngcontent-%COMP%] {
  border-left: 5px solid #1a73e8;
  background:
    linear-gradient(
      90deg,
      #f3f7fd 0%,
      rgba(255, 255, 255, 0) 100%);
}
.strip-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.strip-header[_ngcontent-%COMP%]   .category-tag[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 800;
  color: #1a73e8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.strip-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 800;
  color: #0c1a30;
}
.strip-header[_ngcontent-%COMP%]   .strip-status[_ngcontent-%COMP%] {
  padding: 4px 10px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.strip-header[_ngcontent-%COMP%]   .strip-status.st-active[_ngcontent-%COMP%] {
  color: #0f9d58;
  background: #e6f4ea;
  border: 1px solid #ceebe0;
}
.strip-body[_ngcontent-%COMP%] {
  display: flex;
  gap: 40px;
  align-items: center;
}
@media (max-width: 768px) {
  .strip-body[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}
.strip-body[_ngcontent-%COMP%]   .info-metric[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.strip-body[_ngcontent-%COMP%]   .info-metric[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #94a3b8;
}
.strip-body[_ngcontent-%COMP%]   .info-metric[_ngcontent-%COMP%]   .m-val[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  font-weight: 700;
  margin-bottom: 2px;
  text-transform: uppercase;
}
.strip-body[_ngcontent-%COMP%]   .info-metric[_ngcontent-%COMP%]   .m-val[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 800;
  color: #334155;
}
.strip-actions[_ngcontent-%COMP%] {
  margin-left: auto;
  display: flex;
  gap: 12px;
}
@media (max-width: 768px) {
  .strip-actions[_ngcontent-%COMP%] {
    margin-left: 0;
    width: 100%;
    border-top: 1px solid #f1f5f9;
    padding-top: 16px;
  }
}
.strip-actions[_ngcontent-%COMP%]   .action-circle[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
}
.strip-actions[_ngcontent-%COMP%]   .action-circle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}
.strip-actions[_ngcontent-%COMP%]   .action-circle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
}
.strip-actions[_ngcontent-%COMP%]   .action-circle[_ngcontent-%COMP%]:hover {
  color: #1a73e8;
}
.strip-actions[_ngcontent-%COMP%]   .action-circle[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  background: white;
  border-color: #1a73e8;
  transform: scale(1.05);
}
.strip-actions[_ngcontent-%COMP%]   .action-circle.term[_ngcontent-%COMP%]:hover {
  color: #db4437;
}
.strip-actions[_ngcontent-%COMP%]   .action-circle.term[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  background: #fce8e6;
  border-color: #db4437;
}
.glass-modal[_ngcontent-%COMP%] {
  --background: transparent;
  --width: 600px;
  --height: 85%;
  --border-radius: 24px;
}
.modal-wrapper[_ngcontent-%COMP%] {
  background: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.modal-header-gradient[_ngcontent-%COMP%] {
  padding: 32px 32px 0;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  position: relative;
}
.modal-header-gradient[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
}
.modal-header-gradient[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .modal-icon-badge[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  background: #1a73e8;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);
}
.modal-header-gradient[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #0c1a30;
  letter-spacing: -0.5px;
}
.modal-header-gradient[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 6px 0 24px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}
.modal-body-content[_ngcontent-%COMP%] {
  --background: #ffffff;
  flex: 1;
}
.emp-summary-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  margin: 24px 32px;
}
.emp-summary-card[_ngcontent-%COMP%]   .s-avatar[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  background: #0c1a30;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 18px;
}
.emp-summary-card[_ngcontent-%COMP%]   .s-meta[_ngcontent-%COMP%] {
  flex: 1;
}
.emp-summary-card[_ngcontent-%COMP%]   .s-meta[_ngcontent-%COMP%]   .s-name[_ngcontent-%COMP%] {
  display: block;
  color: #0c1a30;
  font-weight: 700;
  font-size: 15px;
}
.emp-summary-card[_ngcontent-%COMP%]   .s-meta[_ngcontent-%COMP%]   .s-sub[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
}
.emp-summary-card[_ngcontent-%COMP%]   .s-badge[_ngcontent-%COMP%] {
  padding: 4px 10px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #1a73e8;
  letter-spacing: 0.5px;
}
.beauty-form[_ngcontent-%COMP%] {
  padding: 0 32px 32px;
}
.form-section[_ngcontent-%COMP%] {
  padding: 24px 0;
  border-bottom: 1px solid #f1f5f9;
}
.form-section[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.form-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 800;
  color: #1a73e8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.form-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.form-group-lux[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.form-group-lux[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.form-group-lux[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 13px;
  color: #334155;
  margin-bottom: 8px;
  font-weight: 700;
}
.lux-input[_ngcontent-%COMP%] {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  color: #0c1a30;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  outline: none;
}
.lux-input[_ngcontent-%COMP%]:focus {
  border-color: #1a73e8;
  background: white;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.06);
}
.lux-input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.input-wrapper-lux[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.input-wrapper-lux[_ngcontent-%COMP%]   .curr-prefix[_ngcontent-%COMP%] {
  position: absolute;
  left: 16px;
  color: #1a73e8;
  font-weight: 700;
  font-size: 16px;
  pointer-events: none;
}
.input-wrapper-lux[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  padding-left: 36px;
}
.select-wrapper[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.select-wrapper[_ngcontent-%COMP%]   .select-chevron[_ngcontent-%COMP%] {
  position: absolute;
  right: 16px;
  color: #94a3b8;
  pointer-events: none;
  font-size: 18px;
}
.select-wrapper[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  appearance: none;
  cursor: pointer;
}
.grid-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.status-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.st-option[_ngcontent-%COMP%] {
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  text-align: center;
  cursor: pointer;
}
.st-option[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.st-option.active-st[_ngcontent-%COMP%] {
  background: #e6f4ea;
  border-color: #0f9d58;
  color: #137333;
  box-shadow: 0 2px 8px rgba(15, 157, 88, 0.1);
}
.st-option.active-st-inv[_ngcontent-%COMP%] {
  background: #fce8e6;
  border-color: #db4437;
  color: #c5221f;
  box-shadow: 0 2px 8px rgba(219, 68, 55, 0.1);
}
.monthly-preview[_ngcontent-%COMP%] {
  margin-top: 10px;
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.monthly-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f9d58;
  font-weight: 700;
}
.modal-footer-lux[_ngcontent-%COMP%] {
  padding: 24px 32px 32px;
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
}
.modal-footer-lux[_ngcontent-%COMP%]   .footer-note[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 20px;
}
.modal-footer-lux[_ngcontent-%COMP%]   .footer-note[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1a73e8;
  font-size: 18px;
}
.prime-action-btn[_ngcontent-%COMP%] {
  width: 100%;
  padding: 16px;
  background: #1a73e8;
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  border: none;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.15);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}
.prime-action-btn[_ngcontent-%COMP%]:hover {
  background: #1557b0;
  box-shadow: 0 6px 16px rgba(26, 115, 232, 0.25);
}
.prime-action-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}
.close-algn[_ngcontent-%COMP%] {
  position: absolute;
  right: 16px;
  top: 16px;
}
.animate-in[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_slideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes _ngcontent-%COMP%_slideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`]});let r=s;return r})();var Jn=[{path:"",component:kn}],Sn=(()=>{let s=class s{};s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=A({type:s}),s.\u0275inj=I({imports:[j.forChild(Jn),j]});let r=s;return r})();var be=(()=>{let s=class s{};s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=A({type:s}),s.\u0275inj=I({imports:[H,ln,sn,Mn,Sn]});let r=s;return r})();export{be as PayrollAssignmentPageModule};
