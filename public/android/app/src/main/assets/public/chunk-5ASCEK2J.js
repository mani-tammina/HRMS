import{a as mn}from"./chunk-RWRS6232.js";import{a as dn}from"./chunk-AMUZ5UX4.js";import{a as sn}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{Ga as ln,H as tn,R as on,W as rn,X as an,a as U,b as R,c as O,d as W,e as X,h as H,i as J,j as K,m as Q,na as cn,t as Z,u as nn,v as en}from"./chunk-B3PLR2IL.js";import{$a as N,Ba as P,Ca as f,Da as u,Eb as q,F as B,K as C,L as b,Ma as T,Oa as o,Pa as g,Qa as h,Ra as A,Vb as G,Z as I,Zb as L,_ as c,bb as V,ca as M,d as w,ea as F,fa as z,ja as _,pb as D,qb as j,ra as p,rb as $,sa as t,ta as n,u as S,ua as m,v as k,yb as Y,z as E}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as y,b as v}from"./chunk-JHI3MBHO.js";function fn(l,s){if(l&1&&(t(0,"div",61)(1,"div",62)(2,"div",63),m(3,"ion-icon",64),n(),t(4,"div",65)(5,"span",66),o(6,"Total Structures"),n(),t(7,"span",67),o(8),n()()(),t(9,"div",68)(10,"div",63),m(11,"ion-icon",69),n(),t(12,"div",65)(13,"span",66),o(14,"Active"),n(),t(15,"span",67),o(16),n()()(),t(17,"div",70)(18,"div",63),m(19,"ion-icon",71),n(),t(20,"div",65)(21,"span",66),o(22,"Inactive"),n(),t(23,"span",67),o(24),n()()()()),l&2){let i=u();c(8),g(i.structures.length),c(8),g(i.activeCount),c(8),g(i.inactiveCount)}}function _n(l,s){if(l&1&&(t(0,"span",72),o(1),n()),l&2){let i=u();c(),g(i.structures.length)}}function xn(l,s){l&1&&(t(0,"div",73),m(1,"ion-spinner",74),t(2,"span"),o(3,"Updating records..."),n()())}function Cn(l,s){if(l&1&&(t(0,"span",104),o(1),n()),l&2){let i=u().$implicit;c(),g(i.notes)}}function bn(l,s){if(l&1){let i=P();t(0,"div",87)(1,"span",88),o(2),n(),t(3,"span",89),f("click",function(){let a=C(i).$implicit,r=u(2);return b(r.viewDetails(a.id))}),t(4,"div",90)(5,"span",91),o(6),n(),_(7,Cn,2,1,"span",92),n()(),t(8,"span",80)(9,"div",93)(10,"span",94),o(11),n(),t(12,"span",95),o(13),n()()(),t(14,"span",96),o(15),n(),t(16,"span",82)(17,"span",97),o(18),n()(),t(19,"span",83),o(20),N(21,"date"),n(),t(22,"span",84)(23,"span",98),o(24),n()(),t(25,"span",85)(26,"div",99)(27,"button",100),f("click",function(){let a=C(i).$implicit,r=u(2);return b(r.editStructure(a))}),m(28,"ion-icon",101),n(),t(29,"button",102),f("click",function(){let a=C(i).$implicit,r=u(2);return b(r.deleteStructure(a.id))}),m(30,"ion-icon",103),n()()()()}if(l&2){let i=s.$implicit,e=u(2);c(2),h("#",i.id),c(4),g(i.structure_name),c(),p("ngIf",i.notes),c(4),g(i.FullName||"Not Assigned"),c(2),g(i.EmployeeNumber||"-"),c(2),g(e.formatCurrency(i.ctc_amount)),c(3),h("v",i.version||1),c(2),g(V(21,10,i.effective_from,"mediumDate")),c(3),p("ngClass",i.is_active?"active":"inactive"),c(),h(" ",e.getStatusLabel(i.is_active)," ")}}function Pn(l,s){if(l&1&&(t(0,"div",75)(1,"div",76)(2,"div",77)(3,"span",78),o(4,"ID"),n(),t(5,"span",79),o(6,"Structure Name"),n(),t(7,"span",80),o(8,"Employee"),n(),t(9,"span",81),o(10,"CTC Amount"),n(),t(11,"span",82),o(12,"Ver."),n(),t(13,"span",83),o(14,"Effective From"),n(),t(15,"span",84),o(16,"Status"),n(),t(17,"span",85),o(18,"Actions"),n()(),_(19,bn,31,13,"div",86),n()()),l&2){let i=u();c(19),p("ngForOf",i.structures)("ngForTrackBy",i.trackById)}}function hn(l,s){if(l&1){let i=P();t(0,"div",105)(1,"div",106),m(2,"ion-icon",107),n(),t(3,"h3"),o(4,"No Structures Configured"),n(),t(5,"p"),o(6,"You haven't set up any employee salary structures yet. Start by creating a CTC breakdown."),n(),t(7,"ion-button",108),f("click",function(){C(i);let a=u();return b(a.openCreateModal())}),m(8,"ion-icon",109),o(9," Create First Structure "),n()()}}function Mn(l,s){if(l&1){let i=P();t(0,"div",110),f("click",function(){C(i);let a=u();return b(a.isModalOpen=!1)}),n()}}function On(l,s){l&1&&m(0,"ion-spinner",111)}function yn(l,s){if(l&1){let i=P();t(0,"div",116),f("click",function(){let a=C(i).$implicit,r=u(2);return b(r.selectEmployee(a))}),t(1,"div",117)(2,"img",118),f("error",function(a){C(i);let r=u(2);return b(r.handleImageError(a))}),n()(),t(3,"div",119)(4,"div",120)(5,"span",121),o(6),n(),t(7,"span",122),o(8),n()(),t(9,"div",123)(10,"span",124),o(11),n(),t(12,"span",125),o(13,"|"),n(),t(14,"span",126),o(15),n()()()()}if(l&2){let i=s.$implicit,e=u(2);c(2),p("src",i.profile_image?e.env+i.profile_image:"../../../assets/Profile_Picture.png",I),c(4),g(i.FullName||i.FirstName+" "+i.LastName),c(2),h("#",i.EmployeeNumber||i.id),c(3),g(i.designation_name||i.designation||"Staff"),c(4),g(i.WorkEmail||i.email||"-")}}function vn(l,s){if(l&1&&(t(0,"div",112)(1,"div",113),o(2,"Matching Employees"),n(),t(3,"div",114),_(4,yn,16,5,"div",115),n()()),l&2){let i=u();c(4),p("ngForOf",i.filteredEmployees)}}function wn(l,s){if(l&1){let i=P();t(0,"div",127)(1,"div",128)(2,"span",129),o(3),n(),t(4,"span",130),o(5),n()(),t(6,"button",131),f("click",function(){let a=C(i).index,r=u();return b(r.removeComponent(a))}),m(7,"ion-icon",71),n()()}if(l&2){let i=s.$implicit;c(3),g(i.name),c(2),A("",i.component_type," \u2022 ",i.calculation_type)}}function Sn(l,s){l&1&&(t(0,"div",132),m(1,"ion-icon",133),t(2,"p"),o(3,"No components linked to this structure yet."),n()())}function kn(l,s){if(l&1){let i=P();t(0,"div",134),f("click",function(){let a=C(i).$implicit,r=u();return b(r.addComponent(a))}),t(1,"div",135)(2,"span",136),o(3),n(),t(4,"span",137),o(5),n()(),m(6,"ion-icon",138),n()}if(l&2){let i=s.$implicit;c(3),g(i.name),c(2),h("(",i.code,")")}}var pn=(()=>{let s=class s{constructor(e,a,r,d,x){this.payrollService=e,this.router=a,this.fb=r,this.employeeService=d,this.toaster=x,this.structures=[],this.loading=!0,this.activeCount=0,this.inactiveCount=0,this.isModalOpen=!1,this.employees=[],this.filteredEmployees=[],this.availableComponents=[],this.selectedComponents=[],this.employeeSearchTerm="",this.isEditMode=!1,this.selectedStructureId=null,this.env="http://localhost:4203",this.isSearching=!1,this.employeeSearch$=new w}ngOnInit(){this.initForm(),this.fetchStructures(),this.fetchComponents(),this.setupEmployeeSearch()}setupEmployeeSearch(){this.employeeSearch$.pipe(S(300),k(),E(e=>!e||e.length<2?(this.isSearching=!1,[]):(this.isSearching=!0,this.employeeService.searchEmployees(e,1,1e3)))).subscribe({next:e=>{this.filteredEmployees=Array.isArray(e)?e:e.data||[],this.isSearching=!1},error:e=>{console.error("Search error:",e),this.filteredEmployees=[],this.isSearching=!1}})}onSearchFocus(){this.employeeSearchTerm.length>=2&&this.filteredEmployees.length===0&&this.employeeSearch$.next(this.employeeSearchTerm)}handleImageError(e){e.target.src="../../../assets/Profile_Picture.png"}initForm(){this.structureForm=this.fb.group({employee_id:[null,O.required],structure_name:["",O.required],ctc_amount:[0,[O.required,O.min(0)]],effective_from:[new Date().toISOString().split("T")[0],O.required],effective_to:[null],is_active:[!0],notes:[""]})}fetchStructures(){this.loading=!0,this.payrollService.getPayrollstructures().subscribe({next:e=>{this.structures=Array.isArray(e)?e:e.data||[],this.activeCount=this.structures.filter(a=>!!a.is_active).length,this.inactiveCount=this.structures.filter(a=>!a.is_active).length,this.loading=!1},error:e=>{console.error("Failed to load structures:",e),this.toaster.showError("Could not load structures"),this.loading=!1}})}fetchEmployees(){this.filteredEmployees=[]}filterEmployees(e){let a=e.target.value;this.employeeSearchTerm=a,this.employeeSearch$.next(a)}selectEmployee(e){this.structureForm.patchValue({employee_id:e.id}),this.employeeSearchTerm=e.FullName,this.filteredEmployees=[]}fetchComponents(){this.payrollService.getPayrollComponents().subscribe({next:e=>{this.availableComponents=Array.isArray(e)?e:e.data||[]},error:()=>this.toaster.showError("Could not load available components")})}addComponent(e){this.selectedComponents.find(a=>a.id===e.id)?this.toaster.showWarning("Component already added"):(this.selectedComponents.push(e),this.toaster.showSuccess(`${e.name} added to structure`))}removeComponent(e){this.selectedComponents.splice(e,1)}openCreateModal(){this.isModalOpen=!0,this.isEditMode=!1,this.selectedStructureId=null,this.selectedComponents=[],this.employeeSearchTerm="",this.filteredEmployees=this.employees,this.structureForm.reset({employee_id:null,structure_name:"",ctc_amount:0,effective_from:new Date().toISOString().split("T")[0],effective_to:null,is_active:!0,notes:""})}editStructure(e){if(!e)return;this.isModalOpen=!0,this.isEditMode=!0,this.selectedStructureId=e.id||e.structure_id;let a=this.employees.find(r=>r.id===Number(e.employee_id));this.employeeSearchTerm=a?a.FullName:e.FullName||"",this.structureForm.patchValue({employee_id:e.employee_id,structure_name:e.structure_name,ctc_amount:e.ctc_amount,effective_from:this.formatDate(e.effective_from),effective_to:this.formatDate(e.effective_to),is_active:!!e.is_active,notes:e.notes}),this.selectedComponents=e.components||[],this.payrollService.getPayrollStructureById(this.selectedStructureId).subscribe({next:r=>{let d=r.data||r,x=d.structure||d,gn=d.components||[];x&&(this.structureForm.patchValue({employee_id:x.employee_id,structure_name:x.structure_name,ctc_amount:x.ctc_amount,effective_from:this.formatDate(x.effective_from),effective_to:this.formatDate(x.effective_to),is_active:!!x.is_active,notes:x.notes}),this.selectedComponents=gn)},error:r=>{console.error("Error fetching full structure details:",r)}})}formatDate(e){return e?typeof e=="string"&&e.includes("T")?e.split("T")[0]:e:""}deleteStructure(e){confirm("Are you sure you want to delete this payroll structure?")&&this.payrollService.deletePayrollStructure(e).subscribe({next:()=>{this.toaster.showSuccess("Structure deleted successfully"),this.fetchStructures()},error:a=>{console.error("Error deleting structure:",a),this.toaster.showError("Failed to delete structure")}})}saveStructure(){if(this.structureForm.invalid)return;let e=this.structureForm.value,a=v(y({},e),{employee_id:Number(e.employee_id),ctc_amount:Number(e.ctc_amount),created_by:Number(localStorage.getItem("employee_id"))||1,components:this.selectedComponents.map(d=>({code:d.code||d.component_code,name:d.name||d.component_name,component_type:d.component_type,calculation_type:d.calculation_type,value:Number(d.value),percentage_of_code:d.percentage_of_code,taxable:!!(d.taxable??d.is_taxable),prorated:!!(d.prorated??d.is_prorated),sequence:Number(d.sequence),notes:d.notes}))});(this.isEditMode&&this.selectedStructureId?this.payrollService.updatePayrollStructure(this.selectedStructureId,a):this.payrollService.createPayrollStructure(a)).subscribe({next:()=>{this.toaster.showSuccess(`Structure ${this.isEditMode?"updated":"created"} successfully`),this.isModalOpen=!1,this.fetchStructures()},error:d=>{console.error("Error saving structure:",d),this.toaster.showError("Failed to save structure")}})}formatCurrency(e){let a=Number(e);return isNaN(a)?"-":"\u20B9"+a.toLocaleString("en-IN",{maximumFractionDigits:0})}getStatusLabel(e){return e?"Active":"Inactive"}viewDetails(e){this.router.navigate(["/finance/structure/composition",e])}goBack(){this.router.navigate(["/finance/admin"])}trackById(e,a){return a.id||e}};s.\u0275fac=function(a){return new(a||s)(M(mn),M(G),M(Z),M(sn),M(dn))},s.\u0275cmp=F({type:s,selectors:[["app-payroll-structure"]],standalone:!1,decls:96,vars:21,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"bg-blob","blob-1"],[1,"bg-blob","blob-2"],[1,"payroll-container"],[1,"header"],[1,"header-info"],[1,"back-nav"],[1,"back-link",3,"click"],["name","arrow-back-outline"],[1,"brief-info"],[1,"subtitle"],["name","briefcase-outline"],[1,"header-actions"],[1,"primary-btn",3,"click"],["name","add-circle-outline","slot","start"],["class","summary-grid",4,"ngIf"],[1,"structures-card","glass-card"],[1,"card-header"],[1,"title-with-count"],["class","count-badge",4,"ngIf"],["class","loading-state",4,"ngIf"],["class","table-container",4,"ngIf"],["class","empty-layout",4,"ngIf"],["class","side-modal-overlay pill-overlay",3,"click",4,"ngIf"],[1,"side-modal","glass-modal",2,"width","550px"],[1,"modal-header"],["name","close-outline",1,"close-icon",3,"click"],[1,"modal-body"],[1,"structure-form-vertical",3,"ngSubmit","formGroup"],[1,"form-container"],[1,"form-group","glass-input-group","dropdown-stack","employee-search-container"],[1,"search-input-wrapper"],["name","search-outline",1,"search-prefix"],["type","text","placeholder","Start typing to search employee...",1,"glass-input","search-field",3,"input","focus","value"],["name","crescent","class","field-spinner",4,"ngIf"],["class","search-dropdown-popover fade-in-sm",4,"ngIf"],[1,"form-group","glass-input-group"],["type","text","formControlName","structure_name","placeholder","e.g. 2026 Annual Growth Plan",1,"glass-input"],[1,"input-with-prefix"],[1,"prefix"],["type","number","formControlName","ctc_amount","placeholder","0.00",1,"glass-input"],[1,"form-row"],["type","date","formControlName","effective_from",1,"glass-input"],["type","date","formControlName","effective_to",1,"glass-input"],[1,"form-group","checkbox-row"],[1,"glass-checkbox"],["type","checkbox","formControlName","is_active"],[1,"checkmark"],[1,"components-section"],[1,"section-divider"],[1,"badge"],[1,"selected-list"],["class","selected-comp-row fade-in-sm",4,"ngFor","ngForOf"],["class","empty-selection",4,"ngIf"],[1,"master-selector"],["class","master-item ripple-effect",3,"click",4,"ngFor","ngForOf"],["formControlName","notes","rows","2","placeholder","Internal remarks about this structure...",1,"glass-textarea"],[1,"form-footer"],["type","button","fill","clear","color","medium",3,"click"],["type","submit",1,"submit-btn",3,"disabled"],[1,"summary-grid"],[1,"summary-card","total"],[1,"summary-icon"],["name","layers-outline"],[1,"summary-content"],[1,"summary-label"],[1,"summary-value"],[1,"summary-card","active"],["name","checkmark-circle-outline"],[1,"summary-card","inactive"],["name","close-circle-outline"],[1,"count-badge"],[1,"loading-state"],["name","crescent","size","small"],[1,"table-container"],[1,"custom-table"],[1,"table-head"],[1,"col-id"],[1,"col-name"],[1,"col-emp"],[1,"col-ctc"],[1,"col-ver"],[1,"col-date"],[1,"col-status"],[1,"col-action"],["class","table-row fade-in",4,"ngFor","ngForOf","ngForTrackBy"],[1,"table-row","fade-in"],[1,"col-id","text-muted"],[1,"col-name",3,"click"],[1,"info-cell","clickable"],[1,"main-text"],["class","sub-text",4,"ngIf"],[1,"info-cell"],[1,"name-text"],[1,"id-text"],[1,"col-ctc","highlight-amount"],[1,"ver-badge"],[1,"status-pill",3,"ngClass"],[1,"action-buttons"],["title","Edit Structure",1,"icon-btn","edit",3,"click"],["name","create-outline"],["title","Delete Structure",1,"icon-btn","delete",3,"click"],["name","trash-outline"],[1,"sub-text"],[1,"empty-layout"],[1,"empty-visual"],["name","document-text-outline"],["fill","outline",1,"start-btn",3,"click"],["name","add-outline","slot","start"],[1,"side-modal-overlay","pill-overlay",3,"click"],["name","crescent",1,"field-spinner"],[1,"search-dropdown-popover","fade-in-sm"],[1,"dropdown-header"],[1,"dropdown-results-container"],["class","dropdown-item employee-row",3,"click",4,"ngFor","ngForOf"],[1,"dropdown-item","employee-row",3,"click"],[1,"emp-avatar-container"],[1,"emp-modal-avatar",3,"error","src"],[1,"emp-info-main"],[1,"name-row"],[1,"emp-name"],[1,"emp-id-badge"],[1,"detail-row"],[1,"emp-designation"],[1,"divider"],[1,"emp-email"],[1,"selected-comp-row","fade-in-sm"],[1,"comp-meta"],[1,"comp-title"],[1,"comp-details"],["type","button",1,"remove-icon",3,"click"],[1,"empty-selection"],["name","add-outline"],[1,"master-item","ripple-effect",3,"click"],[1,"master-info"],[1,"m-name"],[1,"m-code"],["name","add-outline",1,"add-icon"]],template:function(a,r){a&1&&(m(0,"ion-header",0),t(1,"ion-content",1),m(2,"div",2)(3,"div",3),t(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"a",8),f("click",function(){return r.goBack()}),m(9,"ion-icon",9),o(10," Back to Payroll Setup "),n()(),t(11,"div",10)(12,"h2"),o(13,"Payroll Structures"),n(),t(14,"p",11),m(15,"ion-icon",12),o(16," Configure employee-specific salary structures with CTC breakdowns "),n()()(),t(17,"div",13)(18,"ion-button",14),f("click",function(){return r.openCreateModal()}),m(19,"ion-icon",15),o(20," Create New Structure "),n()()(),_(21,fn,25,3,"div",16),t(22,"div",17)(23,"div",18)(24,"div",19)(25,"h3"),o(26,"Configured Structures"),n(),_(27,_n,2,1,"span",20),n(),_(28,xn,4,0,"div",21),n(),_(29,Pn,20,2,"div",22)(30,hn,10,0,"div",23),n()(),_(31,Mn,1,0,"div",24),t(32,"div",25)(33,"div",26)(34,"h3"),o(35),n(),t(36,"ion-icon",27),f("click",function(){return r.isModalOpen=!1}),n()(),t(37,"div",28)(38,"form",29),f("ngSubmit",function(){return r.saveStructure()}),t(39,"div",30)(40,"div",31)(41,"label"),o(42,"Employee Assignment"),n(),t(43,"div",32),m(44,"ion-icon",33),t(45,"input",34),f("input",function(x){return r.filterEmployees(x)})("focus",function(){return r.onSearchFocus()}),n(),_(46,On,1,0,"ion-spinner",35),n(),_(47,vn,5,1,"div",36),n(),t(48,"div",37)(49,"label"),o(50,"Structure Name"),n(),m(51,"input",38),n(),t(52,"div",37)(53,"label"),o(54,"CTC Amount (Annual)"),n(),t(55,"div",39)(56,"span",40),o(57,"\u20B9"),n(),m(58,"input",41),n()(),t(59,"div",42)(60,"div",37)(61,"label"),o(62,"Effective From"),n(),m(63,"input",43),n(),t(64,"div",37)(65,"label"),o(66,"Effective To (Optional)"),n(),m(67,"input",44),n()(),t(68,"div",45)(69,"label",46),m(70,"input",47)(71,"span",48),o(72," Is Structure Currently Active? "),n()(),t(73,"div",49)(74,"div",50)(75,"span"),o(76,"Pinned Components"),n(),t(77,"span",51),o(78),n()(),t(79,"div",52),_(80,wn,8,3,"div",53)(81,Sn,4,0,"div",54),n(),t(82,"div",50)(83,"span"),o(84,"Available Master Components"),n()(),t(85,"div",55),_(86,kn,7,2,"div",56),n()(),t(87,"div",37)(88,"label"),o(89,"Administrative Notes"),n(),m(90,"textarea",57),n()(),t(91,"div",58)(92,"ion-button",59),f("click",function(){return r.isModalOpen=!1}),o(93,"Cancel"),n(),t(94,"ion-button",60),o(95),n()()()()()()),a&2&&(p("translucent",!0),c(),p("fullscreen",!0),c(20),p("ngIf",!r.loading&&r.structures.length>0),c(6),p("ngIf",r.structures.length),c(),p("ngIf",r.loading),c(),p("ngIf",!r.loading&&r.structures.length>0),c(),p("ngIf",!r.loading&&r.structures.length===0),c(),p("ngIf",r.isModalOpen),c(),T("open",r.isModalOpen),c(3),g(r.isEditMode?"Edit Structure":"Create New Structure"),c(3),p("formGroup",r.structureForm),c(7),p("value",r.employeeSearchTerm),c(),p("ngIf",r.isSearching),c(),p("ngIf",r.filteredEmployees.length>0),c(31),g(r.selectedComponents.length),c(2),p("ngForOf",r.selectedComponents),c(),p("ngIf",r.selectedComponents.length===0),c(5),p("ngForOf",r.availableComponents),c(8),p("disabled",r.structureForm.invalid||r.selectedComponents.length===0),c(),h(" ",r.isEditMode?"Update":"Save"," Structure "))},dependencies:[D,j,$,H,R,J,U,W,X,K,Q,tn,on,rn,an,cn,Y],styles:[`

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
  --background: #f4f7fb;
  position: relative;
}
.payroll-container[_ngcontent-%COMP%] {
  padding: 32px;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.back-nav[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-weight: 700;
  text-decoration: none;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
  padding: 8px 16px;
  border-radius: 9999px;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {
  color: #1F74BB;
  transform: translateX(-4px);
  border-color: #1F74BB;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.2rem;
}
.header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.05em;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  margin: 8px 0 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.2rem;
  color: #1F74BB;
}
.header[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: white;
  --border-radius: 8px;
  --padding-start: 24px;
  --padding-end: 24px;
  font-weight: 700;
  --height: 48px;
  margin: 0;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  text-transform: none;
}
.header[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.summary-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-content[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-content[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card.total[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.summary-grid[_ngcontent-%COMP%]   .summary-card.active[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card.inactive[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.structures-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
}
.card-header[_ngcontent-%COMP%] {
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header[_ngcontent-%COMP%]   .title-with-count[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.card-header[_ngcontent-%COMP%]   .title-with-count[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-header[_ngcontent-%COMP%]   .title-with-count[_ngcontent-%COMP%]   .count-badge[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #1F74BB;
  font-weight: 700;
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid #f1f5f9;
}
.card-header[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
}
.table-container[_ngcontent-%COMP%] {
  overflow-x: auto;
  margin: 0 -32px;
  padding: 0 32px;
}
.table-container[_ngcontent-%COMP%]::-webkit-scrollbar {
  height: 8px;
}
.table-container[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f8fafc;
}
.table-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  min-width: 1100px;
  display: table;
}
.custom-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%] {
  display: table-row;
}
.custom-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: table-cell;
  padding: 12px 24px;
  color: #475569;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
  background: transparent;
}
.custom-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.col-action[_ngcontent-%COMP%] {
  text-align: right;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  display: table-row;
  background: white;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: table-cell;
  padding: 16px 24px;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {
  border-left: 1px solid #f1f5f9;
  border-radius: 12px 0 0 12px;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {
  border-right: 1px solid #f1f5f9;
  border-radius: 0 12px 12px 0;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-id[_ngcontent-%COMP%] {
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
  font-size: 12px;
  color: #94a3b8;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-action[_ngcontent-%COMP%] {
  text-align: right;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .clickable[_ngcontent-%COMP%] {
  cursor: pointer;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .clickable[_ngcontent-%COMP%]:hover   .main-text[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .main-text[_ngcontent-%COMP%] {
  display: block;
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  transition: color 0.2s;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .sub-text[_ngcontent-%COMP%], 
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .id-text[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  display: block;
  margin-top: 4px;
  font-weight: 600;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .name-text[_ngcontent-%COMP%] {
  display: block;
  font-weight: 700;
  color: #0f172a;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .highlight-amount[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-weight: 700;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  background: #e8f0fb;
  padding: 4px 12px;
  border-radius: 8px;
  display: inline-block;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .ver-badge[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #1F74BB;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  border: 1px solid #f1f5f9;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .status-pill.active[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .status-pill.inactive[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f1f5f9;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn.edit[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn.edit[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  color: white;
  border-color: #1F74BB;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn.delete[_ngcontent-%COMP%] {
  color: #dc2626;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn.delete[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.empty-layout[_ngcontent-%COMP%] {
  padding: 80px 40px;
  text-align: center;
  color: #475569;
  background: #f8fafc;
  border-radius: 16px;
  margin-top: 32px;
  border: 2px dashed #ABABAB;
}
.empty-layout[_ngcontent-%COMP%]   .empty-visual[_ngcontent-%COMP%] {
  font-size: 4rem;
  color: #94a3b8;
  margin-bottom: 24px;
  opacity: 0.4;
  display: block;
  margin: 0 auto;
}
.empty-layout[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}
.empty-layout[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  margin-bottom: 24px;
  font-weight: 500;
}
.empty-layout[_ngcontent-%COMP%]   .start-btn[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 700;
  --padding-start: 24px;
  --padding-end: 24px;
  height: 48px;
  text-transform: none;
}
.side-modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: _ngcontent-%COMP%_fadeInOverlay 0.3s ease-out;
}
.side-modal[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  right: -600px;
  width: 600px !important;
  height: 100%;
  background: white;
  z-index: 1001;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  transition: right 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.side-modal.open[_ngcontent-%COMP%] {
  right: 0;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {
  padding: 32px 40px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  z-index: 10;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
  padding: 8px;
  border-radius: 50%;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]:hover {
  color: white;
  background: #dc2626;
}
.side-modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {
  padding: 40px;
  overflow-y: auto;
  flex: 1;
  background: #f4f7fb;
}
.side-modal[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.side-modal[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 14px 18px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #0f172a;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]::placeholder, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%]::placeholder, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
  outline: none;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  min-height: 100px;
  resize: vertical;
}
.side-modal[_ngcontent-%COMP%]   .input-with-prefix[_ngcontent-%COMP%] {
  position: relative;
}
.side-modal[_ngcontent-%COMP%]   .input-with-prefix[_ngcontent-%COMP%]   .prefix[_ngcontent-%COMP%] {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  color: #1F74BB;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.side-modal[_ngcontent-%COMP%]   .input-with-prefix[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%] {
  padding-left: 36px;
  width: 100%;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%] {
  position: relative;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-input-wrapper[_ngcontent-%COMP%] {
  position: relative;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-input-wrapper[_ngcontent-%COMP%]   .search-prefix[_ngcontent-%COMP%] {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #94a3b8;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-input-wrapper[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {
  padding-left: 48px !important;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-input-wrapper[_ngcontent-%COMP%]   .field-spinner[_ngcontent-%COMP%] {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  scale: 0.8;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%] {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  padding: 8px;
  margin-top: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  z-index: 100;
  border: 1px solid #ABABAB;
  overflow: hidden;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .dropdown-header[_ngcontent-%COMP%] {
  padding: 12px 16px 8px;
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .dropdown-results-container[_ngcontent-%COMP%] {
  max-height: 280px;
  overflow-y: auto;
  padding-right: 4px;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .dropdown-results-container[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 4px;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .dropdown-results-container[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f8fafc;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .dropdown-results-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-avatar-container[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-modal-avatar[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-info-main[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-info-main[_ngcontent-%COMP%]   .name-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-info-main[_ngcontent-%COMP%]   .name-row[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-info-main[_ngcontent-%COMP%]   .name-row[_ngcontent-%COMP%]   .emp-id-badge[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #1F74BB;
  font-weight: 700;
  background: #e8f0fb;
  padding: 2px 8px;
  border-radius: 4px;
}
.side-modal[_ngcontent-%COMP%]   .employee-search-container[_ngcontent-%COMP%]   .search-dropdown-popover[_ngcontent-%COMP%]   .employee-row[_ngcontent-%COMP%]   .emp-info-main[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 500;
  display: flex;
  gap: 8px;
  margin-top: 2px;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-row[_ngcontent-%COMP%] {
  margin: 8px 0;
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ABABAB;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-row[_ngcontent-%COMP%]   .glass-checkbox[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-weight: 700;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.side-modal[_ngcontent-%COMP%]   .checkbox-row[_ngcontent-%COMP%]   .glass-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #1F74BB;
}
.side-modal[_ngcontent-%COMP%]   .components-section[_ngcontent-%COMP%] {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #ABABAB;
}
.side-modal[_ngcontent-%COMP%]   .section-divider[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 16px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.side-modal[_ngcontent-%COMP%]   .section-divider[_ngcontent-%COMP%]   span.badge[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: white;
  padding: 2px 10px;
  border-radius: 9999px;
}
.side-modal[_ngcontent-%COMP%]   .section-divider[_ngcontent-%COMP%]::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #f1f5f9;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%] {
  background: white;
  padding: 14px 18px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%]   .comp-meta[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%]   .comp-meta[_ngcontent-%COMP%]   .comp-title[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%]   .comp-meta[_ngcontent-%COMP%]   .comp-details[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 600;
  margin-top: 2px;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%]   .remove-icon[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .selected-comp-row[_ngcontent-%COMP%]   .remove-icon[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  color: white;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .empty-selection[_ngcontent-%COMP%] {
  padding: 32px;
  text-align: center;
  color: #94a3b8;
  font-weight: 700;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .empty-selection[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 2.5rem;
  margin-bottom: 12px;
  opacity: 0.3;
  color: #475569;
}
.side-modal[_ngcontent-%COMP%]   .selected-list[_ngcontent-%COMP%]   .empty-selection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px;
  margin: 0;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]   .master-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]   .master-info[_ngcontent-%COMP%]   .m-name[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: 12px;
  color: #1e293b;
  transition: color 0.2s;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]   .master-info[_ngcontent-%COMP%]   .m-code[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 700;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]:hover   .m-name[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.side-modal[_ngcontent-%COMP%]   .master-selector[_ngcontent-%COMP%]   .master-item[_ngcontent-%COMP%]:hover   .add-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%] {
  padding: 24px 40px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  background: white;
  z-index: 10;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  height: 48px;
  --border-radius: 8px;
  font-weight: 700;
  --padding-start: 24px;
  --padding-end: 24px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  text-transform: none;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button.submit-btn[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button.submit-btn[_ngcontent-%COMP%]:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
@keyframes _ngcontent-%COMP%_fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (max-width: 1024px) {
  .summary-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .side-modal[_ngcontent-%COMP%] {
    width: 100% !important;
    right: -100%;
  }
}`]});let l=s;return l})();var En=[{path:"",component:pn}],Wn=(()=>{let s=class s{};s.\u0275fac=function(a){return new(a||s)},s.\u0275mod=z({type:s}),s.\u0275inj=B({imports:[q,nn,en,ln,L.forChild(En)]});let l=s;return l})();export{Wn as PayrollStructurePageModule};
