import{a as yn}from"./chunk-RWRS6232.js";import{a as hn}from"./chunk-AMUZ5UX4.js";import{a as bn}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{Ga as Cn,H as dn,R as gn,W as fn,X as un,b as Z,c as I,d as nn,e as en,h as tn,j as on,m as an,n as rn,na as _n,o as ln,p as cn,t as sn,u as pn,v as mn,xa as xn}from"./chunk-B3PLR2IL.js";import{$a as S,Ba as k,Bb as H,Ca as b,Da as _,Eb as J,F as L,K as O,L as v,Ma as $,Oa as r,Pa as y,Qa as h,Ra as G,Tb as X,Wb as K,Zb as Q,_ as l,bb as B,ca as w,ea as R,fa as j,j as D,ja as C,p as V,pb as Y,qb as q,ra as g,rb as W,sa as t,t as U,ta as e,ua as f}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as z,b as N}from"./chunk-JHI3MBHO.js";function vn(s,m){if(s&1&&(t(0,"div",47)(1,"div",48)(2,"div",49),f(3,"ion-icon",50),e(),t(4,"div",51)(5,"span",52),r(6,"Total Earnings"),e(),t(7,"span",53),r(8),S(9,"number"),e()()(),t(10,"div",54)(11,"div",49),f(12,"ion-icon",55),e(),t(13,"div",51)(14,"span",52),r(15,"Total Deductions"),e(),t(16,"span",53),r(17),S(18,"number"),e()()(),t(19,"div",56)(20,"div",49),f(21,"ion-icon",16),e(),t(22,"div",51)(23,"span",52),r(24,"Net Pay"),e(),t(25,"span",53),r(26),S(27,"number"),e()()()()),s&2){let a=_();l(8),h("\u20B9",B(9,3,a.totalEarnings,"1.0-0")),l(9),h("\u20B9",B(18,6,a.totalDeductions,"1.0-0")),l(9),h("\u20B9",B(27,9,a.totalEarnings-a.totalDeductions,"1.0-0"))}}function wn(s,m){if(s&1&&(t(0,"span",57),r(1),e()),s&2){let a=_();l(),h("",a.compositionData.length," Items")}}function En(s,m){s&1&&(t(0,"div",58),f(1,"ion-spinner",59),t(2,"span"),r(3,"Fetching details..."),e()())}function kn(s,m){if(s&1&&(t(0,"span",75),r(1),e()),s&2){let a=_().$implicit;l(),h("of ",a.percentage_of_code)}}function Sn(s,m){if(s&1&&(t(0,"span",75),r(1),e()),s&2){let a=_().$implicit,n=_(2);l(),h(" ",n.getCalculationLabel(a)," ")}}function Bn(s,m){if(s&1){let a=k();t(0,"div",71)(1,"span",72),r(2),e(),t(3,"span",64)(4,"div",73)(5,"span",74),r(6),e(),t(7,"span",75),r(8),e()()(),t(9,"span",65)(10,"span",76),r(11),e()(),t(12,"span",66)(13,"div",73)(14,"span",77),r(15),e(),C(16,kn,2,1,"span",78),e()(),t(17,"span",67)(18,"div",79)(19,"span",80),r(20),S(21,"number"),e(),C(22,Sn,2,1,"span",78),e()(),t(23,"span",81),f(24,"ion-icon",82),e(),t(25,"span",81),f(26,"ion-icon",82),e(),t(27,"span",69)(28,"div",83)(29,"button",84),b("click",function(){let o=O(a).$implicit,i=_(2);return v(i.editComposition(o))}),f(30,"ion-icon",85),e(),t(31,"button",86),b("click",function(){let o=O(a).$implicit,i=_(2);return v(i.deleteComposition(o.composition_id))}),f(32,"ion-icon",87),e()()()()}if(s&2){let a=m.$implicit,n=_(2);l(2),y(a.component_id),l(4),y(a.component_name),l(2),y(a.component_code),l(2),g("ngClass",a.component_type==null?null:a.component_type.toLowerCase()),l(),h(" ",a.component_type," "),l(4),y(a.calculation_type),l(),g("ngIf",a.percentage_of_code),l(4),h("\u20B9",B(21,13,n.getCalculatedAmount(a),"1.0-0")),l(2),g("ngIf",n.getCalculationLabel(a)),l(2),g("name",a.is_taxable?"shield-checkmark":"shield-outline")("color",a.is_taxable?"success":"medium"),l(2),g("name",a.is_prorated?"checkmark-circle":"close-circle-outline")("color",a.is_prorated?"primary":"medium")}}function Tn(s,m){if(s&1&&(t(0,"div",60)(1,"div",61)(2,"div",62)(3,"span",63),r(4,"#"),e(),t(5,"span",64),r(6,"Component Detail"),e(),t(7,"span",65),r(8,"Type"),e(),t(9,"span",66),r(10,"Calculation"),e(),t(11,"span",67),r(12,"Formula/Value"),e(),t(13,"span",68),r(14,"Taxable"),e(),t(15,"span",68),r(16,"Prorated"),e(),t(17,"span",69),r(18,"Actions"),e()(),C(19,Bn,33,16,"div",70),e()()),s&2){let a=_();l(19),g("ngForOf",a.compositionData)("ngForTrackBy",a.trackById)}}function In(s,m){if(s&1){let a=k();t(0,"div",88)(1,"div",89),f(2,"ion-icon",90),e(),t(3,"h3"),r(4,"No Components Linked"),e(),t(5,"p"),r(6,"This template currently has no components configured in its composition."),e(),t(7,"ion-button",91),b("click",function(){O(a);let o=_();return v(o.openAddModal())}),f(8,"ion-icon",92),r(9," Attach First Component "),e()()}}function An(s,m){if(s&1){let a=k();t(0,"div",93),b("click",function(){O(a);let o=_();return v(o.isModalOpen=!1)}),e()}}function Fn(s,m){if(s&1&&(t(0,"option",94),r(1),e()),s&2){let a=m.$implicit;g("value",a.component_id),l(),G(" ",a.name," (",a.code,") ")}}function zn(s,m){if(s&1){let a=k();t(0,"div",97),b("click",function(){let o=O(a).$implicit,i=_(2);return v(i.selectEmployee(o))}),t(1,"div",98),r(2),e(),t(3,"div",99)(4,"span",100),r(5),e(),t(6,"span",101),r(7),e()()()}if(s&2){let a=m.$implicit;l(2),y(a.FullName==null?null:a.FullName.charAt(0)),l(3),y(a.FullName),l(2),y(a.EmployeeNumber)}}function Nn(s,m){if(s&1&&(t(0,"div",95),C(1,zn,8,3,"div",96),e()),s&2){let a=_();l(),g("ngForOf",a.filteredEmployees)}}var Pn=(()=>{let m=class m{constructor(n,o,i,c,p){this.route=n,this.payrollService=o,this.fb=i,this.employeeService=c,this.toaster=p,this.templateId=null,this.templateInfo=null,this.compositionData=[],this.loading=!1,this.totalEarnings=0,this.totalDeductions=0,this.sampleCTC=8e5,this.isModalOpen=!1,this.isEditMode=!1,this.selectedCompositionId=null,this.availableComponents=[],this.employees=[],this.filteredEmployees=[],this.employeeSearchTerm=""}trackById(n,o){return o.composition_id||o.component_id||n}ngOnInit(){this.initForm(),this.fetchEmployees(),this.fetchAvailableComponents(),this.route.paramMap.subscribe(n=>{let o=n.get("id");o&&(this.templateId=+o,this.fetchTemplateDetails(),this.fetchComposition())})}initForm(){this.compositionForm=this.fb.group({component_id:[null,I.required],formula_or_value:["",I.required],created_by:[Number(localStorage.getItem("employee_id"))||1,I.required]})}fetchEmployees(){this.employeeService.getAllEmployees().subscribe({next:n=>{let o=Array.isArray(n)?n:n.data||[];this.employees=o,this.filteredEmployees=o},error:()=>{this.employees=[],this.filteredEmployees=[],this.toaster.showError("Could not load employees")}})}filterEmployees(n){let o=n.target.value.toLowerCase();if(this.employeeSearchTerm=o,!o){this.filteredEmployees=this.employees;return}this.filteredEmployees=this.employees.filter(i=>i.FullName?.toLowerCase().includes(o)||i.EmployeeNumber?.toLowerCase().includes(o))}selectEmployee(n){this.compositionForm.patchValue({created_by:n.id}),this.employeeSearchTerm=n.FullName,this.filteredEmployees=[]}fetchAvailableComponents(){this.payrollService.getPayrollComponents().subscribe({next:n=>{this.availableComponents=Array.isArray(n)?n:n.data||[]},error:()=>this.toaster.showError("Could not load components")})}openAddModal(){this.isEditMode=!1,this.selectedCompositionId=null,this.isModalOpen=!0,this.employeeSearchTerm="",this.filteredEmployees=this.employees,this.compositionForm.reset({component_id:null,formula_or_value:"",created_by:Number(localStorage.getItem("employee_id"))||1})}editComposition(n){this.isEditMode=!0,this.selectedCompositionId=n.composition_id,this.isModalOpen=!0;let i=(Array.isArray(this.employees)?this.employees:[]).find(c=>Number(c.id)===Number(n.created_by));this.employeeSearchTerm=i?i.FullName||i.name:`User #${n.created_by}`,this.filteredEmployees=[],this.compositionForm.patchValue({component_id:n.master_component_id||n.component_id,formula_or_value:n.formula_or_value,created_by:n.created_by})}deleteComposition(n){this.templateId&&confirm("Are you sure you want to remove this component from the template?")&&this.payrollService.deleteTemplateComposition(this.templateId,n).subscribe({next:()=>{this.toaster.showSuccess("Component removed from template"),this.fetchComposition()},error:o=>{console.error("Error deleting composition:",o),this.toaster.showError("Failed to remove component")}})}saveComposition(){if(this.compositionForm.invalid||!this.templateId)return;let n={formula_or_value:this.compositionForm.value.formula_or_value.toString(),master_component_id:Number(this.compositionForm.value.component_id),created_by:Number(this.compositionForm.value.created_by)};this.isEditMode&&this.selectedCompositionId?this.payrollService.updateTemplateComposition(this.templateId,this.selectedCompositionId,n).subscribe({next:()=>{this.toaster.showSuccess("Composition updated"),this.isModalOpen=!1,this.fetchComposition()},error:o=>{console.error("Error updating component in template:",o),this.toaster.showError("Failed to update composition")}}):this.payrollService.addComponentToTemplate(this.templateId,n).subscribe({next:()=>{this.toaster.showSuccess("Component added to template"),this.isModalOpen=!1,this.fetchComposition()},error:o=>{console.error("Error adding component to template:",o),this.toaster.showError("Failed to add component")}})}fetchTemplateDetails(){this.templateId&&this.payrollService.getTemplateById(this.templateId).subscribe({next:n=>{this.templateInfo=n.data||n},error:n=>console.error("Error fetching template details:",n)})}fetchComposition(){this.templateId&&(this.loading=!0,this.payrollService.getTemplateComposition(this.templateId).subscribe({next:n=>{let o=Array.isArray(n)?n:n.data||[];if(console.log("Raw Composition Data:",o),o.length===0){this.compositionData=[],this.totalEarnings=0,this.totalDeductions=0,this.loading=!1;return}let i=o.map(c=>{let p=c.master_component_id||c.component_id;return this.payrollService.getComponentById(p).pipe(U(()=>D(null)))});V(i).subscribe({next:c=>{this.compositionData=o.map((p,P)=>{let u=c[P],d=Array.isArray(u)?u[0]:u?.data||u;return N(z({},p),{component_name:d?.name||d?.component_name||`Component #${p.component_id}`,component_code:d?.code||d?.component_code||"-",component_type:d?.type||d?.component_type||"-",calculation_type:d?.calculation_type||"-",percentage_of_code:d?.percentage_of_code||d?.base_code||null,value:p.formula_or_value||d?.value||0,is_taxable:d?.taxable??d?.is_taxable??!1,is_prorated:d?.prorated??d?.is_prorated??!1,sequence:d?.sequence||0,notes:d?.notes||""})}),this.calculateTotals(),this.loading=!1},error:c=>{console.error("Error fetching component details:",c),this.compositionData=o,this.loading=!1}})},error:n=>{console.error("Error fetching composition:",n),this.loading=!1}}))}calculateTotals(){let n={CTC:this.sampleCTC};this.compositionData.forEach(c=>{n[c.component_code]=this.getCalculatedAmount(c)});let o=(c,p)=>{let P=(c||"").toUpperCase(),u=(p||"").toUpperCase();return P==="SPECIAL_ALLOWANCE"||P==="SA"||u.includes("SPECIAL ALLOWANCE")},i=this.compositionData.find(c=>o(c.component_code,c.component_name));if(i){let c=0,p=0;this.compositionData.forEach(u=>{if(u!==i){let d=(u.component_code||"").toUpperCase(),M=(u.component_name||"").toUpperCase(),x=d.includes("EMPLOYER")||M.includes("EMPLOYER")||d.includes("_ER")||M.includes("_ER");u.component_type?.toUpperCase()==="EARNING"?c+=n[u.component_code]||0:(x||d.includes("PF_")||M.includes("PF_")||d.includes("ESI_")||M.includes("ESI_"))&&(p+=n[u.component_code]||0)}});let P=Math.max(0,this.sampleCTC-c-p);i.formula_or_value=P.toString()}this.totalEarnings=this.compositionData.filter(c=>c.component_type?.toUpperCase()==="EARNING").reduce((c,p)=>c+this.getCalculatedAmount(p),0),this.totalDeductions=this.compositionData.filter(c=>c.component_type?.toUpperCase()==="DEDUCTION").reduce((c,p)=>c+this.getCalculatedAmount(p),0)}getCalculatedAmount(n,o=[]){let i=n.component_code;if(i&&o.includes(i))return 0;let c=i?[...o,i]:o,p=String(n.formula_or_value||n.value||"0").trim();if((n.calculation_type||"").toUpperCase()==="PERCENTAGE"||p.includes("%")){let M=parseFloat(p.replace(/[^0-9.]/g,""));if(isNaN(M))return 0;let x=(n.percentage_of_code||"").toUpperCase();if((!x||x==="-")&&p.toUpperCase().includes("OF ")){let E=p.toUpperCase().split("OF ");x=E[E.length-1].trim()}if(x==="GROSS"&&(x="CTC"),x===i?.toUpperCase()&&(x="CTC"),x&&x!=="CTC"&&x!=="-"){let E=this.compositionData.find(F=>{let A=(F.component_code||"").toUpperCase(),Mn=(F.component_name||"").toUpperCase(),T=x.toUpperCase();return A===T||Mn===T||A===T.replace(/\s/g,"_")||T===A.replace(/\s/g,"_")});if(E)return M/100*this.getCalculatedAmount(E,c)}return M/100*this.sampleCTC}let d=parseFloat(p.replace(/[^0-9.]/g,""));return isNaN(d)?0:d}getCalculationLabel(n){let o=String(n.formula_or_value||n.value||"0").trim();if(n.calculation_type==="PERCENTAGE"||o.includes("%")){let c=parseFloat(o.replace(/[^0-9.]/g,"")),p=(n.percentage_of_code||"").toUpperCase();if((!p||p==="-")&&o.toUpperCase().includes("OF ")){let u=o.toUpperCase().split("OF ");p=u[u.length-1].trim()}let P=(n.component_code||"").toUpperCase();return(p==="GROSS"||p===P)&&(p="CTC"),`${isNaN(c)?0:c}% of ${p&&p!=="CTC"&&p!=="-"?p:"Gross"}`}return"Fixed Amount"}onSampleCTCChange(n){let o=parseFloat(n.target.value);!isNaN(o)&&o>0&&(this.sampleCTC=o,this.calculateTotals())}};m.\u0275fac=function(o){return new(o||m)(w(X),w(yn),w(sn),w(bn),w(hn))},m.\u0275cmp=R({type:m,selectors:[["app-template-composition"]],standalone:!1,decls:68,vars:21,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"payroll-container"],[1,"header"],[1,"header-info"],[1,"back-nav"],["routerLink","/finance/templates",1,"back-link"],["name","arrow-back-outline"],[1,"template-brief"],[1,"subtitle"],["name","information-circle-outline"],[1,"header-actions"],[1,"primary-btn",3,"click"],["name","add-circle-outline","slot","start"],[1,"ctc-preview-wrap"],[1,"ctc-label"],["name","calculator-outline"],["type","number","placeholder","e.g. 800000",1,"ctc-input",3,"change","value"],["class","summary-grid",4,"ngIf"],[1,"composition-card","glass-card"],[1,"card-header"],[1,"title-block"],["class","item-count",4,"ngIf"],["class","loading-state",4,"ngIf"],["class","table-container",4,"ngIf"],["class","empty-layout",4,"ngIf"],["class","side-modal-overlay pill-overlay",3,"click",4,"ngIf"],[1,"side-modal","glass-modal"],[1,"modal-header"],["name","close-outline",1,"close-icon",3,"click"],[1,"modal-body"],[1,"composition-form-vertical",3,"ngSubmit","formGroup"],[1,"form-container"],[1,"form-group","glass-input-group"],["formControlName","component_id",1,"glass-select"],[3,"ngValue"],[3,"value",4,"ngFor","ngForOf"],["type","text","formControlName","formula_or_value","placeholder","e.g. 40% or 5000",1,"glass-input"],[1,"hint-text"],[1,"form-group","glass-input-group","dropdown-stack"],[1,"search-input-wrapper"],["name","search-outline",1,"search-prefix"],["type","text","placeholder","Search administrator...",1,"glass-input","search-field",3,"input","focus","value"],["class","search-dropdown fade-in-sm",4,"ngIf"],[1,"form-footer"],["type","button","fill","clear","color","medium",3,"click"],["type","submit",1,"submit-btn",3,"disabled"],[1,"summary-grid"],[1,"summary-card","earnings"],[1,"summary-icon"],["name","wallet-outline"],[1,"summary-content"],[1,"summary-label"],[1,"summary-value"],[1,"summary-card","deductions"],["name","trending-down-outline"],[1,"summary-card","net"],[1,"item-count"],[1,"loading-state"],["name","crescent","size","small"],[1,"table-container"],[1,"composition-table"],[1,"table-head"],[1,"col-id"],[1,"col-name"],[1,"col-type"],[1,"col-calc"],[1,"col-value"],[1,"col-status"],[1,"col-action"],["class","table-row fade-in",4,"ngFor","ngForOf","ngForTrackBy"],[1,"table-row","fade-in"],[1,"col-id","text-muted"],[1,"info-cell"],[1,"main-text"],[1,"sub-text"],[1,"badge",3,"ngClass"],[1,"calc-text"],["class","sub-text",4,"ngIf"],[1,"value-cell"],[1,"amt-text"],[1,"col-status","text-center"],[3,"name","color"],[1,"action-cell"],["title","Edit Mapping",1,"icon-btn","edit",3,"click"],["name","create-outline"],["title","Remove Component",1,"icon-btn","delete",3,"click"],["name","trash-outline"],[1,"empty-layout"],[1,"empty-visual"],["name","layers-outline"],["fill","outline",1,"attach-btn",3,"click"],["name","link-outline","slot","start"],[1,"side-modal-overlay","pill-overlay",3,"click"],[3,"value"],[1,"search-dropdown","fade-in-sm"],["class","dropdown-item",3,"click",4,"ngFor","ngForOf"],[1,"dropdown-item",3,"click"],[1,"item-avatar"],[1,"item-info"],[1,"item-primary"],[1,"item-secondary"]],template:function(o,i){o&1&&(f(0,"ion-header",0),t(1,"ion-content",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"a",6),f(7,"ion-icon",7),r(8," Back to Templates "),e()(),t(9,"div",8)(10,"h2"),r(11),e(),t(12,"p",9),f(13,"ion-icon",10),r(14),e()()(),t(15,"div",11)(16,"ion-button",12),b("click",function(){return i.openAddModal()}),f(17,"ion-icon",13),r(18," Add Component "),e(),t(19,"div",14)(20,"label",15),f(21,"ion-icon",16),r(22," Preview CTC (\u20B9) "),e(),t(23,"input",17),b("change",function(p){return i.onSampleCTCChange(p)}),e()()()(),C(24,vn,28,12,"div",18),t(25,"div",19)(26,"div",20)(27,"div",21)(28,"h3"),r(29,"Component Breakdown"),e(),C(30,wn,2,1,"span",22),e(),C(31,En,4,0,"div",23),e(),C(32,Tn,20,2,"div",24)(33,In,10,0,"div",25),e()(),C(34,An,1,0,"div",26),t(35,"div",27)(36,"div",28)(37,"h3"),r(38),e(),t(39,"ion-icon",29),b("click",function(){return i.isModalOpen=!1}),e()(),t(40,"div",30)(41,"form",31),b("ngSubmit",function(){return i.saveComposition()}),t(42,"div",32)(43,"div",33)(44,"label"),r(45,"Master Component"),e(),t(46,"select",34)(47,"option",35),r(48,"Choose Component..."),e(),C(49,Fn,2,3,"option",36),e()(),t(50,"div",33)(51,"label"),r(52,"Override Value / Formula"),e(),f(53,"input",37),t(54,"small",38),r(55,"Specify a custom percentage or fixed amount for this template mapping."),e()(),t(56,"div",39)(57,"label"),r(58,"Assigned By"),e(),t(59,"div",40),f(60,"ion-icon",41),t(61,"input",42),b("input",function(p){return i.filterEmployees(p)})("focus",function(){return i.filteredEmployees=i.employees}),e()(),C(62,Nn,2,1,"div",43),e()(),t(63,"div",44)(64,"ion-button",45),b("click",function(){return i.isModalOpen=!1}),r(65,"Cancel"),e(),t(66,"ion-button",46),r(67),e()()()()()()),o&2&&(g("translucent",!0),l(),g("fullscreen",!0),l(10),y((i.templateInfo==null?null:i.templateInfo.template_name)||"Loading Template..."),l(3),h(" ",(i.templateInfo==null?null:i.templateInfo.description)||"Managing salary components for this template structure"," "),l(9),g("value",i.sampleCTC),l(),g("ngIf",!i.loading&&i.compositionData.length>0),l(6),g("ngIf",i.compositionData.length),l(),g("ngIf",i.loading),l(),g("ngIf",!i.loading&&i.compositionData.length>0),l(),g("ngIf",!i.loading&&i.compositionData.length===0),l(),g("ngIf",i.isModalOpen),l(),$("open",i.isModalOpen),l(3),y(i.isEditMode?"Edit Composition Mapping":"Add Composition"),l(3),g("formGroup",i.compositionForm),l(6),g("ngValue",null),l(2),g("ngForOf",i.availableComponents),l(12),g("value",i.employeeSearchTerm),l(),g("ngIf",i.filteredEmployees.length>0&&i.employeeSearchTerm.length>0),l(4),g("disabled",i.compositionForm.invalid),l(),h(" ",i.isEditMode?"Update Mapping":"Save Mapping"," "))},dependencies:[Y,q,W,tn,ln,cn,Z,rn,nn,en,on,an,dn,gn,fn,un,_n,xn,K,H],styles:[`

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
.bg-blob[_ngcontent-%COMP%] {
  display: none;
}
.payroll-container[_ngcontent-%COMP%] {
  padding: 32px 24px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-weight: 600;
  text-decoration: none;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
  padding: 6px 16px;
  border-radius: 9999px;
  width: fit-content;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {
  color: #1F74BB;
  transform: translateX(-4px);
  border-color: #1F74BB;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.1rem;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .template-brief[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(1.375rem, 2vw + 0.5rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.05em;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .template-brief[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  margin: 4px 0 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .template-brief[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
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
  text-transform: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.header[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.summary-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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
  letter-spacing: 1px;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-content[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
  font-weight: 700;
  color: #0f172a;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card.earnings[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card.deductions[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
}
.summary-grid[_ngcontent-%COMP%]   .summary-card.net[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
}
.composition-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
}
.composition-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  margin-bottom: 24px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.composition-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .title-block[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.composition-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .title-block[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.composition-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .title-block[_ngcontent-%COMP%]   .item-count[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  font-weight: 700;
  font-size: 10px;
  padding: 4px 12px;
  border-radius: 9999px;
  text-transform: uppercase;
}
.composition-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
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
  background: #ABABAB;
  border-radius: 4px;
}
.composition-table[_ngcontent-%COMP%] {
  width: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.composition-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 80px 1.5fr 120px 160px 180px 100px 100px 120px;
  padding: 8px 16px;
}
.composition-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
}
.composition-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.col-action[_ngcontent-%COMP%] {
  text-align: right;
}
.composition-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.col-status[_ngcontent-%COMP%] {
  text-align: center;
}
.composition-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 80px 1.5fr 120px 160px 180px 100px 100px 120px;
  background: #ffffff;
  padding: 0;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  align-items: center;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}
.composition-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.composition-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
  padding: 16px;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  vertical-align: middle;
}
.composition-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]    > span.col-id[_ngcontent-%COMP%] {
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
  font-size: 12px;
  color: #94a3b8;
}
.composition-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]    > span.col-status[_ngcontent-%COMP%] {
  text-align: center;
}
.composition-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]    > span.col-action[_ngcontent-%COMP%] {
  text-align: right;
}
.info-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.info-cell[_ngcontent-%COMP%]   .main-text[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.2px;
}
.info-cell[_ngcontent-%COMP%]   .sub-text[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 500;
  margin-top: 2px;
}
.info-cell[_ngcontent-%COMP%]   .calc-text[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1e293b;
  font-size: 11px;
  text-transform: uppercase;
}
.badge[_ngcontent-%COMP%] {
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}
.badge.earning[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.badge.deduction[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.badge.contribution[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
span.col-value[_ngcontent-%COMP%] {
  display: flex !important;
  align-items: baseline;
  gap: 4px;
}
.amt-text[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 4px 10px;
  border-radius: 8px;
  display: inline-block;
}
.unit[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  color: #475569;
  font-weight: 700;
}
.action-cell[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.action-cell[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%] {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ABABAB;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #475569;
}
.action-cell[_ngcontent-%COMP%]   .icon-btn.edit[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  color: white;
  border-color: #1F74BB;
}
.action-cell[_ngcontent-%COMP%]   .icon-btn.delete[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}
.action-cell[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.empty-layout[_ngcontent-%COMP%] {
  padding: 80px 32px;
  text-align: center;
  color: #94a3b8;
  background: #f8fafc;
  border-radius: 16px;
  margin-top: 24px;
  border: 2px dashed #ABABAB;
}
.empty-layout[_ngcontent-%COMP%]   .empty-visual[_ngcontent-%COMP%] {
  font-size: 3.5rem;
  color: #94a3b8;
  margin-bottom: 20px;
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
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  margin-bottom: 24px;
  font-weight: 500;
}
.empty-layout[_ngcontent-%COMP%]   .attach-btn[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 700;
  --padding-start: 24px;
  --padding-end: 24px;
  height: 44px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  text-transform: none;
}
.side-modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 1000;
}
.side-modal[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  right: -540px;
  width: 540px !important;
  height: 100vh;
  background: #ffffff;
  z-index: 1001;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.side-modal.open[_ngcontent-%COMP%] {
  right: 0;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {
  padding: 24px 32px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
  padding: 6px;
  border-radius: 50%;
  border: 1px solid #ABABAB;
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]:hover {
  color: #dc2626;
  border-color: #dc2626;
  transform: rotate(90deg);
}
.side-modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: #ffffff;
}
.form-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.glass-input-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.glass-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%], 
.glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 14px 18px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #0f172a;
  font-weight: 600;
  transition: all 0.2s ease;
}
.glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]::placeholder, 
.glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
  font-weight: 500;
}
.glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]:focus, 
.glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
  outline: none;
  background: #ffffff;
}
.glass-input-group[_ngcontent-%COMP%]   .hint-text[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  font-weight: 500;
  margin-top: 4px;
}
.dropdown-stack[_ngcontent-%COMP%] {
  position: relative;
}
.search-input-wrapper[_ngcontent-%COMP%] {
  position: relative;
}
.search-input-wrapper[_ngcontent-%COMP%]   .search-prefix[_ngcontent-%COMP%] {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #94a3b8;
}
.search-input-wrapper[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {
  padding-left: 48px !important;
  width: 100%;
}
.search-dropdown[_ngcontent-%COMP%] {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 8px;
  margin-top: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
  z-index: 100;
  border: 1px solid #ABABAB;
  overflow: hidden;
  max-height: 280px;
  overflow-y: auto;
}
.dropdown-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.dropdown-item[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  transform: translateX(4px);
}
.dropdown-item[_ngcontent-%COMP%]   .item-avatar[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e8f0fb;
  color: #1F74BB;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
}
.dropdown-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.dropdown-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .item-primary[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.dropdown-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .item-secondary[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #1F74BB;
  font-weight: 700;
  background: #e8f0fb;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 3px;
  width: fit-content;
}
.form-footer[_ngcontent-%COMP%] {
  padding: 24px 32px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
}
.form-footer[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: white;
  --border-radius: 8px;
  font-weight: 700;
  --padding-start: 24px;
  --padding-end: 24px;
  height: 44px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.form-footer[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
  transform: translateY(-1px);
}
@keyframes _ngcontent-%COMP%_fadeInRow {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 1024px) {
  .side-modal[_ngcontent-%COMP%] {
    width: 100% !important;
    right: -100%;
  }
}
.header-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.ctc-preview-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ctc-preview-wrap[_ngcontent-%COMP%]   .ctc-label[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.ctc-preview-wrap[_ngcontent-%COMP%]   .ctc-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #1F74BB;
}
.ctc-preview-wrap[_ngcontent-%COMP%]   .ctc-input[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1.5px solid #ABABAB;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
  width: 160px;
  transition: all 0.2s ease;
}
.ctc-preview-wrap[_ngcontent-%COMP%]   .ctc-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.1);
  background: #ffffff;
}
.value-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.value-cell[_ngcontent-%COMP%]   .amt-text[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 4px 10px;
  border-radius: 8px;
  display: inline-block;
}
.value-cell[_ngcontent-%COMP%]   .sub-text[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  font-weight: 500;
  margin-top: 1px;
}`]});let s=m;return s})();var Dn=[{path:"",component:Pn}],ee=(()=>{let m=class m{};m.\u0275fac=function(o){return new(o||m)},m.\u0275mod=j({type:m}),m.\u0275inj=L({imports:[J,pn,mn,Cn,Q.forChild(Dn)]});let s=m;return s})();export{ee as TemplateCompositionPageModule};
