import{a as xn}from"./chunk-RWRS6232.js";import{a as Cn}from"./chunk-AMUZ5UX4.js";import{a as bn}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{Ga as z,H as mn,R as gn,W as un,X as fn,a as Q,b as Z,c as P,d as nn,e as en,h as tn,i as on,j as rn,m as an,n as cn,na as _n,o as ln,p as sn,t as dn,u as pn,v as T}from"./chunk-B3PLR2IL.js";import{$a as M,Ba as N,Ca as b,Cb as W,Da as C,Eb as A,F as R,K as y,L as E,Ma as F,Oa as i,Pa as _,Qa as h,Ra as j,Tb as H,Zb as K,_ as c,ab as S,ca as w,db as I,ea as G,fa as q,ja as x,pb as Y,qb as X,ra as p,rb as $,sa as e,ta as n,ua as m,wb as J,ya as U,za as L}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import"./chunk-JHI3MBHO.js";function Pn(s,d){if(s&1&&(e(0,"div",50)(1,"div",51)(2,"div",52),m(3,"ion-icon",53),n(),e(4,"div",54)(5,"span",55),i(6),M(7,"titlecase"),n(),e(8,"span",56),i(9),M(10,"currency"),n()()(),e(11,"div",57)(12,"div",52),m(13,"ion-icon",58),n(),e(14,"div",54)(15,"span",55),i(16),M(17,"titlecase"),n(),e(18,"span",56),i(19),M(20,"currency"),n()()(),e(21,"div",59)(22,"div",52),m(23,"ion-icon",60),n(),e(24,"div",54)(25,"span",55),i(26),M(27,"titlecase"),n(),e(28,"span",56),i(29),M(30,"currency"),n()()()()),s&2){let a=C();c(6),h("Gross Amount (",S(7,6,a.viewMode),")"),c(3),h(" ",I(10,8,a.viewMode==="annual"?a.structureInfo.ctc_amount:a.structureInfo.ctc_amount/12,"INR","symbol","1.0-0")),c(7),h("Total Deductions (",S(17,13,a.viewMode),")"),c(3),_(I(20,15,a.totalDeductions,"INR","symbol","1.0-0")),c(7),h("Net Salary (",S(27,20,a.viewMode),")"),c(3),_(I(30,22,a.totalEarnings,"INR","symbol","1.0-0"))}}function Mn(s,d){if(s&1&&(e(0,"span",61),i(1),n()),s&2){let a=C();c(),_(a.compositionData.length)}}function On(s,d){s&1&&(e(0,"div",62),m(1,"ion-spinner",63),n())}function vn(s,d){if(s&1&&(e(0,"div",64)(1,"div",65)(2,"span",55),i(3,"Structure Name"),n(),e(4,"span",56),i(5),n()(),e(6,"div",65)(7,"span",55),i(8),M(9,"titlecase"),n(),e(10,"span",56),i(11),M(12,"currency"),n()(),e(13,"div",65)(14,"span",55),i(15,"Employee"),n(),e(16,"span",56),i(17),n()(),e(18,"div",65)(19,"span",55),i(20,"Status"),n(),e(21,"span",66),i(22),n()()()),s&2){let a=C();c(5),_(a.structureInfo.structure_name),c(3),h("CTC Amount (",S(9,6,a.viewMode),")"),c(3),h(" ",I(12,8,a.viewMode==="annual"?a.structureInfo.ctc_amount:a.structureInfo.ctc_amount/12,"INR","symbol","1.0-0")," "),c(6),_(a.structureInfo.FullName||"-"),c(4),p("ngClass",a.structureInfo.is_active?"active":"inactive"),c(),h(" ",a.structureInfo.is_active?"Active":"Inactive"," ")}}function yn(s,d){if(s&1&&(e(0,"span",89),i(1),n()),s&2){let a=C().$implicit;c(),h(" of ",a.percentage_of_code," ")}}function En(s,d){if(s&1&&(e(0,"span",90),i(1),n()),s&2){let a=C().$implicit;c(),h(" (",a.value,"%) ")}}function wn(s,d){if(s&1){let a=N();e(0,"div",72)(1,"span",73),i(2),n(),e(3,"span",74)(4,"span",75),i(5),n(),e(6,"span",76),i(7),n()(),e(8,"span")(9,"span",66),i(10),n()(),e(11,"span")(12,"span",77),i(13),n(),x(14,yn,2,1,"span",78),n(),e(15,"span",79)(16,"span",80),i(17),M(18,"currency"),n(),x(19,En,2,1,"span",81),n(),e(20,"span",82),m(21,"ion-icon",83),n(),e(22,"span",84)(23,"button",85),b("click",function(){let r=y(a).$implicit,o=C(2);return E(o.editComponent(r))}),m(24,"ion-icon",86),n(),e(25,"button",87),b("click",function(){let r=y(a).$implicit,o=C(2);return E(o.deleteComponent(r.id))}),m(26,"ion-icon",88),n()()()}if(s&2){let a=d.$implicit,t=d.index;c(2),_(t+1),c(3),_(a.name),c(2),_(a.code),c(2),p("ngClass",a.component_type==null?null:a.component_type.toLowerCase()),c(),h(" ",a.component_type," "),c(3),_(a.calculation_type),c(),p("ngIf",a.percentage_of_code),c(3),_(I(18,11,a.calculated_amount,"INR","symbol","1.0-0")),c(2),p("ngIf",a.calculation_type==="PERCENTAGE"),c(2),p("name",a.taxable?"shield-checkmark":"shield-outline")("color",a.taxable?"success":"medium")}}function Sn(s,d){if(s&1&&(e(0,"div",67)(1,"div",68)(2,"div",69)(3,"span"),i(4,"#"),n(),e(5,"span"),i(6,"Component Name & Code"),n(),e(7,"span"),i(8,"Type"),n(),e(9,"span"),i(10,"Calculation"),n(),e(11,"span"),i(12,"Value"),n(),e(13,"span"),i(14,"Taxable"),n(),e(15,"span",70),i(16,"Actions"),n()(),x(17,wn,27,16,"div",71),n()()),s&2){let a=C();c(17),p("ngForOf",a.compositionData)}}function In(s,d){if(s&1){let a=N();e(0,"div",91)(1,"div",92),m(2,"ion-icon",93),n(),e(3,"h3"),i(4,"No Components Linked"),n(),e(5,"p"),i(6,"This structure currently has no components configured."),n(),e(7,"ion-button",94),b("click",function(){y(a);let r=C();return E(r.openAddModal())}),i(8," Add First Component "),n()()}}function kn(s,d){if(s&1){let a=N();e(0,"div",95),b("click",function(){y(a);let r=C();return E(r.closeModal())}),n()}}function Bn(s,d){if(s&1&&(e(0,"option",99),i(1),n()),s&2){let a=d.$implicit;p("value",a.id),c(),j(" ",a.name," (",a.code,") ")}}function Nn(s,d){if(s&1&&(e(0,"div",38)(1,"label"),i(2,"Select Master Component"),n(),e(3,"select",96)(4,"option",97),i(5,"Select Component"),n(),x(6,Bn,2,3,"option",98),n()()),s&2){let a=C();c(4),p("ngValue",null),c(2),p("ngForOf",a.availableComponents)}}function Fn(s,d){s&1&&(e(0,"div",38)(1,"label"),i(2,"Percentage of Code (Base)"),n(),m(3,"input",119),n())}function An(s,d){if(s&1&&(U(0),e(1,"div",38)(2,"label"),i(3,"Component Code"),n(),m(4,"input",100),n(),e(5,"div",38)(6,"label"),i(7,"Component Name"),n(),m(8,"input",101),n(),e(9,"div",102)(10,"div",103)(11,"label"),i(12,"Component Type"),n(),e(13,"select",104)(14,"option",105),i(15,"EARNING"),n(),e(16,"option",106),i(17,"DEDUCTION"),n(),e(18,"option",107),i(19,"CONTRIBUTION"),n()()(),e(20,"div",103)(21,"label"),i(22,"Calculation Type"),n(),e(23,"select",108)(24,"option",109),i(25,"FIXED"),n(),e(26,"option",110),i(27,"PERCENTAGE"),n()()()(),x(28,Fn,4,0,"div",36),e(29,"div",111)(30,"div",112),m(31,"input",113),e(32,"label",114),i(33,"Taxable"),n()(),e(34,"div",112),m(35,"input",115),e(36,"label",116),i(37,"Prorated"),n()()(),e(38,"div",38)(39,"label"),i(40,"Sequence (Sort Order)"),n(),m(41,"input",117),n(),e(42,"div",38)(43,"label"),i(44,"Notes"),n(),m(45,"textarea",118),n(),L()),s&2){let a,t=C();c(28),p("ngIf",((a=t.compositionForm.get("calculation_type"))==null?null:a.value)==="PERCENTAGE")}}function Tn(s,d){if(s&1){let a=N();e(0,"div",122),b("click",function(){let r=y(a).$implicit,o=C(2);return E(o.selectEmployee(r))}),e(1,"div",123),i(2),n(),e(3,"div",124)(4,"span",125),i(5),n(),e(6,"span",126),i(7),n()()()}if(s&2){let a=d.$implicit;c(2),_(a.FullName==null?null:a.FullName.charAt(0)),c(3),_(a.FullName),c(2),_(a.EmployeeNumber)}}function zn(s,d){if(s&1&&(e(0,"div",120),x(1,Tn,8,3,"div",121),n()),s&2){let a=C();c(),p("ngForOf",a.filteredEmployees)}}var V=(()=>{let d=class d{constructor(t,r,o,g,u){this.route=t,this.payrollService=r,this.fb=o,this.employeeService=g,this.toaster=u,this.structureId=null,this.structureInfo=null,this.compositionData=[],this.loading=!1,this.totalEarnings=0,this.totalDeductions=0,this.viewMode="annual",this.isModalOpen=!1,this.isEditMode=!1,this.selectedComponentId=null,this.availableComponents=[],this.filteredEmployees=[],this.employeeSearchTerm=""}ngOnInit(){this.initForm(),this.fetchEmployees(),this.fetchAvailableComponents(),this.route.paramMap.subscribe(t=>{let r=t.get("id");r&&(this.structureId=+r,this.fetchStructureDetails())})}initForm(){this.compositionForm=this.fb.group({component_id:[null],formula_or_value:["",P.required],code:["",P.required],name:["",P.required],component_type:["EARNING",P.required],calculation_type:["FIXED",P.required],value:[0,[P.required,P.min(0)]],percentage_of_code:["BASIC"],taxable:[!0],prorated:[!1],sequence:[10,P.required],notes:[""],created_by:[Number(localStorage.getItem("employee_id"))||1,P.required]}),this.compositionForm.get("calculation_type")?.valueChanges.subscribe(t=>{if(!this.compositionForm)return;let r=(this.compositionForm.get("formula_or_value")?.value||"").toString().trim(),o=r.includes("%");t==="PERCENTAGE"&&r&&!o?this.compositionForm.get("formula_or_value")?.setValue(r+"%",{emitEvent:!1}):t==="FIXED"&&o&&this.compositionForm.get("formula_or_value")?.setValue(r.replace("%","").trim(),{emitEvent:!1})}),this.compositionForm.get("formula_or_value")?.valueChanges.subscribe(t=>{if(!this.compositionForm)return;let r=(t||"").toString().trim(),o=this.compositionForm.get("calculation_type")?.value;r.includes("%")&&o!=="PERCENTAGE"?this.compositionForm.get("calculation_type")?.setValue("PERCENTAGE",{emitEvent:!1}):!r.includes("%")&&r!==""&&o==="PERCENTAGE"&&this.compositionForm.get("calculation_type")?.setValue("FIXED",{emitEvent:!1})})}fetchEmployees(){this.employeeService.getAllEmployees().subscribe(t=>{this.employees=t,this.filteredEmployees=t})}filterEmployees(t){let r=t.target.value.toLowerCase();if(this.employeeSearchTerm=r,!r){this.filteredEmployees=this.employees;return}this.filteredEmployees=Array.isArray(this.employees)?this.employees.filter(o=>o.FullName?.toLowerCase().includes(r)||o.EmployeeNumber?.toLowerCase().includes(r)):[]}selectEmployee(t){this.compositionForm.patchValue({created_by:t.id}),this.employeeSearchTerm=t.FullName||t.FirstName+" "+t.LastName,this.filteredEmployees=[]}fetchAvailableComponents(){this.payrollService.getPayrollComponents().subscribe(t=>{let r=Array.isArray(t)?t:t.data||[],o=[],g=new Set;r.forEach(u=>{g.has(u.code)||(g.add(u.code),o.push(u))}),this.availableComponents=o})}fetchStructureDetails(){this.structureId&&(this.loading=!0,this.payrollService.getPayrollStructureById(this.structureId).subscribe({next:t=>{let r=t.data||t;this.structureInfo=r.structure||r,this.compositionData=JSON.parse(JSON.stringify(r.components||r.salary_components||[])),this.calculateTotals(),this.loading=!1},error:t=>{console.error("Error fetching structure details:",t),this.loading=!1}}))}calculateTotals(){let t=Number(this.structureInfo?.ctc_amount)||0,r={CTC:t};this.compositionData.forEach(l=>{l.calculation_type==="FIXED"?r[l.code]=Number(l.value)||0:l.calculation_type==="PERCENTAGE"&&(l.percentage_of_code==="CTC"||!l.percentage_of_code)&&(r[l.code]=t*(Number(l.value)||0)/100)}),this.compositionData.forEach(l=>{if(l.calculation_type==="PERCENTAGE"&&l.percentage_of_code&&l.percentage_of_code!=="CTC"){let f=r[l.percentage_of_code]||0;r[l.code]=f*(Number(l.value)||0)/100}}),this.compositionData.forEach(l=>{let f=(l.code||"").toUpperCase();if(f.includes("ESI")&&!f.includes("EMPLOYER")){let B=0;Object.keys(r).forEach(O=>{O.toUpperCase().includes("PF")&&O.toUpperCase().includes("EMPLOYER")&&(B=r[O])}),r[l.code]=(t-B)*(3.25/103.25)}}),this.compositionData.forEach(l=>{let f=(l.code||"").toUpperCase(),k=(l.name||"").toUpperCase();if(f.includes("ESI")&&(f.includes("EMPLOYER")||k.includes("EMPLOYER"))){let O=0,D=0;Object.keys(r).forEach(v=>{v.toUpperCase().includes("PF")&&v.toUpperCase().includes("EMPLOYER")&&(O=r[v]),v.toUpperCase().includes("ESI")&&!v.toUpperCase().includes("EMPLOYER")&&(D=r[v])}),r[l.code]=(t-O-D)*(.75/100)}});let o=(l,f)=>{let k=(l||"").toUpperCase(),B=(f||"").toUpperCase();return k==="SPECIAL_ALLOWANCE"||k==="SA"||B.includes("SPECIAL ALLOWANCE")},g=this.compositionData.find(l=>o(l.code,l.name)),u=0;this.compositionData.forEach(l=>{l!==g&&(u+=r[l.code]||0)}),g&&(r[g.code]=Math.max(0,t-u)),this.totalEarnings=0,this.totalDeductions=0,this.compositionData.forEach(l=>{let f=r[l.code]||0;l.annual_amount=Math.round(f),l.monthly_amount=Math.round(f/12),l.calculated_amount=this.viewMode==="annual"?l.annual_amount:l.monthly_amount,l.component_type?.toUpperCase()==="EARNING"?this.totalEarnings+=l.calculated_amount:this.totalDeductions+=l.calculated_amount})}toggleView(t){this.viewMode=t,this.calculateTotals()}updateEmployeeCTC(){!this.structureInfo?.employee_id||!this.structureInfo?.ctc_amount||confirm(`Update CTC to ${this.structureInfo.ctc_amount}?`)&&this.employeeService.updateEmployeeProfile(this.structureInfo.employee_id,{lpa:Number(this.structureInfo.ctc_amount)}).subscribe(()=>{this.toaster.showSuccess("CTC updated successfully")})}openAddModal(){this.isEditMode=!1,this.selectedComponentId=null,this.isModalOpen=!0,this.employeeSearchTerm="",this.filteredEmployees=this.employees,this.compositionForm.get("component_id")?.setValidators([P.required]),this.compositionForm.get("code")?.clearValidators(),this.compositionForm.get("name")?.clearValidators(),this.compositionForm.updateValueAndValidity(),this.compositionForm.reset({component_id:null,formula_or_value:"",component_type:"EARNING",calculation_type:"FIXED",percentage_of_code:"BASIC",taxable:!0,prorated:!1,sequence:10,value:0,created_by:Number(localStorage.getItem("employee_id"))||1})}closeModal(){this.isModalOpen=!1}editComponent(t){this.isEditMode=!0,this.selectedComponentId=t.id,this.isModalOpen=!0,this.compositionForm.get("component_id")?.clearValidators(),this.compositionForm.get("code")?.setValidators([P.required]),this.compositionForm.get("name")?.setValidators([P.required]),this.compositionForm.updateValueAndValidity();let r=Number(t.created_by||localStorage.getItem("employee_id")),o=Array.isArray(this.employees)?this.employees.find(u=>Number(u.id)===r):null;this.employeeSearchTerm=o?o.FullName:"Unknown";let g=t.calculation_type==="PERCENTAGE"?t.value+"%":t.value.toString();this.compositionForm.patchValue({formula_or_value:g,code:t.code,name:t.name,component_type:t.component_type,calculation_type:t.calculation_type,value:t.value,percentage_of_code:t.code!=t.percentage_of_code?t.percentage_of_code:null,taxable:t.taxable===1||t.taxable===!0,prorated:t.prorated===1||t.prorated===!0,sequence:t.sequence||10,notes:t.notes||"",created_by:r})}saveComponent(){if(this.compositionForm.invalid||!this.structureId){console.warn("Form invalid",this.compositionForm.errors);return}let t=this.compositionForm.value,r=(t.formula_or_value||"").toString().trim(),o=this.isEditMode?t.calculation_type:r.includes("%")?"PERCENTAGE":"FIXED",g=r.includes("%")?parseFloat(r.replace("%","")):parseFloat(r)||0,u;if(this.isEditMode)u={structure_id:this.structureId,code:t.code,name:t.name,component_type:t.component_type,calculation_type:o,value:g,percentage_of_code:o==="PERCENTAGE"?t.percentage_of_code:null,taxable:t.taxable?1:0,prorated:t.prorated?1:0,sequence:Number(t.sequence),notes:t.notes,created_by:Number(t.created_by)},this.payrollService.updateStructureComposition(this.structureId,this.selectedComponentId,u).subscribe({next:()=>{this.toaster.showSuccess("Component updated successfully"),this.isModalOpen=!1,this.fetchStructureDetails()},error:l=>{console.error("Update failed",l),this.toaster.showError("Could not update component")}});else{let l=this.availableComponents.find(f=>Number(f.id)===Number(t.component_id));if(!l){this.toaster.showWarning("Select a valid master component");return}u={structure_id:this.structureId,code:l.code,name:l.name,component_type:l.component_type,calculation_type:o,value:g,percentage_of_code:o==="PERCENTAGE"?t.percentage_of_code:null,taxable:l.taxable!==void 0?l.taxable?1:0:1,prorated:l.prorated?1:0,sequence:l.sequence,notes:l.notes||"",created_by:Number(t.created_by)},this.payrollService.addComponentToStructure(this.structureId,u).subscribe({next:()=>{this.toaster.showSuccess("Component added to structure"),this.isModalOpen=!1,this.fetchStructureDetails()},error:f=>{console.error("Add failed",f),this.toaster.showError("Could not add component")}})}}deleteComponent(t){!this.structureId||!confirm("Are you sure you want to remove this component from the structure?")||this.payrollService.deleteStructureComposition(this.structureId,t).subscribe({next:()=>{this.toaster.showSuccess("Component removed"),this.fetchStructureDetails()},error:r=>{console.error("Delete failed",r),this.toaster.showError("Could not remove component")}})}goBack(){window.history.back()}};d.\u0275fac=function(r){return new(r||d)(w(H),w(xn),w(dn),w(bn),w(Cn))},d.\u0275cmp=G({type:d,selectors:[["app-structure-composition"]],decls:71,vars:28,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"bg-blob","blob-1"],[1,"bg-blob","blob-2"],[1,"payroll-container"],[1,"header"],[1,"header-info"],[1,"back-nav"],[1,"back-link",3,"click"],["name","arrow-back-outline"],[2,"margin-top","15px"],[1,"subtitle"],["name","information-circle-outline"],[1,"header-actions"],[1,"primary-btn",2,"margin-right","10px",3,"click"],["name","sync-outline","slot","start"],[1,"primary-btn",3,"click"],["name","add-circle-outline","slot","start"],["class","summary-cards",4,"ngIf"],[1,"view-toggle-container"],[1,"view-toggle"],[3,"click"],[1,"section-title"],[1,"title-with-count"],["class","count-badge",4,"ngIf"],["class","loading-spinner",4,"ngIf"],["class","info-grid",4,"ngIf"],["class","component-table-wrapper",4,"ngIf"],["class","empty-state",4,"ngIf"],["class","side-modal-overlay pill-overlay",3,"click",4,"ngIf"],[1,"side-modal","glass-modal"],[1,"modal-header"],["name","close-outline",1,"close-icon",3,"click"],[1,"modal-body"],[1,"form-vertical",3,"ngSubmit","formGroup"],[1,"form-continer"],["class","form-group",4,"ngIf"],[4,"ngIf"],[1,"form-group"],["type","text","formControlName","formula_or_value","placeholder","e.g. 40% or 5000"],[2,"color","#64748b"],[1,"form-group","dropdown-container"],[1,"search-box"],["name","search-outline"],["type","text","placeholder","Search Employee...",3,"input","focus","value"],["class","search-results",4,"ngIf"],["type","hidden","formControlName","created_by"],[1,"form-footer"],["type","button","fill","clear","color","medium",3,"click"],["type","submit",1,"submit-btn",3,"disabled"],[1,"summary-cards"],[1,"card","earnings"],[1,"card-icon"],["name","wallet-outline"],[1,"card-content"],[1,"label"],[1,"value"],[1,"card","deductions"],["name","trending-down-outline"],[1,"card","net"],["name","calculator-outline"],[1,"count-badge"],[1,"loading-spinner"],["name","crescent"],[1,"info-grid"],[1,"info-item"],[1,"badge",3,"ngClass"],[1,"component-table-wrapper"],[1,"component-table"],[1,"table-head"],[2,"text-align","right"],["class","table-row",4,"ngFor","ngForOf"],[1,"table-row"],[1,"comp-id"],[1,"name-block"],[1,"comp-name"],[1,"comp-code"],[1,"calc-type",2,"padding-left","0"],["class","base-code",4,"ngIf"],[1,"value-cell",2,"padding-left","0"],[1,"amt"],["class","sub-val","style","font-size: 11px; color: #64748b; display: block;",4,"ngIf"],[1,"icon-cell"],[3,"name","color"],[1,"actions"],[1,"icon-btn","edit",3,"click"],["name","create-outline"],[1,"icon-btn","delete",3,"click"],["name","trash-outline"],[1,"base-code"],[1,"sub-val",2,"font-size","11px","color","#64748b","display","block"],[1,"empty-state"],[1,"empty-icon"],["name","layers-outline"],[1,"primary-btn","outline",2,"margin","20px auto",3,"click"],[1,"side-modal-overlay","pill-overlay",3,"click"],["formControlName","component_id"],[3,"ngValue"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["type","text","formControlName","code","placeholder","e.g. BASIC"],["type","text","formControlName","name","placeholder","e.g. Basic Salary"],[1,"row-group",2,"display","flex","gap","15px"],[1,"form-group",2,"flex","1"],["formControlName","component_type"],["value","EARNING"],["value","DEDUCTION"],["value","CONTRIBUTION"],["formControlName","calculation_type"],["value","FIXED"],["value","PERCENTAGE"],[1,"checkbox-group"],[1,"check-item"],["type","checkbox","formControlName","taxable","id","taxableCheck"],["for","taxableCheck"],["type","checkbox","formControlName","prorated","id","proratedCheck"],["for","proratedCheck"],["type","number","formControlName","sequence"],["formControlName","notes","rows","2","placeholder","Internal notes..."],["type","text","formControlName","percentage_of_code","placeholder","e.g. BASIC"],[1,"search-results"],["class","result-item",3,"click",4,"ngFor","ngForOf"],[1,"result-item",3,"click"],[1,"emp-avatar"],[1,"emp-details"],[1,"name"],[1,"id"]],template:function(r,o){r&1&&(m(0,"ion-header",0),e(1,"ion-content",1),m(2,"div",2)(3,"div",3),e(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"a",8),b("click",function(){return o.goBack()}),m(9,"ion-icon",9),i(10," Back to Structures "),n()(),e(11,"div",10)(12,"h2"),i(13),n(),e(14,"p",11),m(15,"ion-icon",12),i(16),n()()(),e(17,"div",13)(18,"ion-button",14),b("click",function(){return o.updateEmployeeCTC()}),m(19,"ion-icon",15),i(20," Sync CTC to Profile "),n(),e(21,"ion-button",16),b("click",function(){return o.openAddModal()}),m(22,"ion-icon",17),i(23," Add Component "),n()()(),x(24,Pn,31,27,"div",18),e(25,"div",19)(26,"div",20)(27,"button",21),b("click",function(){return o.toggleView("annual")}),i(28,"Annual"),n(),e(29,"button",21),b("click",function(){return o.toggleView("monthly")}),i(30,"Monthly"),n()()(),e(31,"div",22)(32,"div",23)(33,"span"),i(34),M(35,"titlecase"),n(),x(36,Mn,2,1,"span",24),n(),x(37,On,2,0,"div",25),n(),x(38,vn,23,13,"div",26)(39,Sn,18,1,"div",27)(40,In,9,0,"div",28),n(),x(41,kn,1,0,"div",29),e(42,"div",30)(43,"div",31)(44,"h3"),i(45),n(),e(46,"ion-icon",32),b("click",function(){return o.closeModal()}),n()(),e(47,"div",33)(48,"form",34),b("ngSubmit",function(){return o.saveComponent()}),e(49,"div",35),x(50,Nn,7,2,"div",36)(51,An,46,1,"ng-container",37),e(52,"div",38)(53,"label"),i(54,"Formula or Value"),n(),m(55,"input",39),e(56,"small",40),i(57,"Specify a percentage (e.g., 40%) or a fixed amount."),n()(),e(58,"div",41)(59,"label"),i(60,"Assigned By (Administrator)"),n(),e(61,"div",42),m(62,"ion-icon",43),e(63,"input",44),b("input",function(u){return o.filterEmployees(u)})("focus",function(){return o.filteredEmployees=o.employees}),n()(),x(64,zn,2,1,"div",45),m(65,"input",46),n()(),e(66,"div",47)(67,"ion-button",48),b("click",function(){return o.closeModal()}),i(68,"Cancel"),n(),e(69,"ion-button",49),i(70),n()()()()()()),r&2&&(p("translucent",!0),c(),p("fullscreen",!0),c(12),_((o.structureInfo==null?null:o.structureInfo.structure_name)||"Structure Details"),c(3),h(" ",(o.structureInfo==null?null:o.structureInfo.description)||"Viewing details for structure "+(o.structureInfo==null?null:o.structureInfo.code)," "),c(8),p("ngIf",!o.loading&&o.compositionData.length>0),c(3),F("active",o.viewMode==="annual"),c(2),F("active",o.viewMode==="monthly"),c(5),h("Structure Breakdown (",S(35,26,o.viewMode),")"),c(2),p("ngIf",o.compositionData.length),c(),p("ngIf",o.loading),c(),p("ngIf",o.structureInfo),c(),p("ngIf",!o.loading&&o.compositionData.length>0),c(),p("ngIf",!o.loading&&o.compositionData.length===0),c(),p("ngIf",o.isModalOpen),c(),F("open",o.isModalOpen),c(3),_(o.isEditMode?"Edit Component Mapping":"Assign Master Component"),c(3),p("formGroup",o.compositionForm),c(2),p("ngIf",!o.isEditMode),c(),p("ngIf",o.isEditMode),c(12),p("value",o.employeeSearchTerm),c(),p("ngIf",o.filteredEmployees.length>0&&o.employeeSearchTerm.length>0),c(5),p("disabled",o.compositionForm.invalid),c(),h(" ",o.isEditMode?"Update Component":"Save mapping"," "))},dependencies:[A,Y,X,$,z,mn,gn,un,fn,_n,T,tn,ln,sn,Z,on,Q,cn,nn,en,rn,an,J,W],styles:[`

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
.header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {
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
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {
  color: #1F74BB;
  transform: translateX(-4px);
  border-color: #1F74BB;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.2rem;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.05em;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {
  margin: 8px 0 0;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 500;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 1.2rem;
}
.header-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.primary-btn[_ngcontent-%COMP%] {
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
.primary-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.primary-btn.outline[_ngcontent-%COMP%] {
  --background: transparent;
  border: 1px solid #1F74BB;
  border-radius: 8px;
  color: #1F74BB;
  box-shadow: none;
  --padding-start: 24px;
  --padding-end: 24px;
  font-weight: 700;
}
.primary-btn.outline[_ngcontent-%COMP%]:hover {
  --background: #e8f0fb;
  transform: translateY(-2px);
}
.view-toggle-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
}
.view-toggle-container[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 4px;
  border-radius: 12px;
  display: flex;
  gap: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}
.view-toggle-container[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #475569;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.view-toggle-container[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {
  background: #ffffff;
  color: #1F74BB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.summary-cards[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.summary-cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {
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
.summary-cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.summary-cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.summary-cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.summary-cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.summary-cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.summary-cards[_ngcontent-%COMP%]   .card.earnings[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.summary-cards[_ngcontent-%COMP%]   .card.deductions[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.summary-cards[_ngcontent-%COMP%]   .card.net[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.info-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 40px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .badge.active[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .badge.inactive[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.section-title[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.section-title[_ngcontent-%COMP%]   .title-with-count[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.section-title[_ngcontent-%COMP%]   .title-with-count[_ngcontent-%COMP%]   .count-badge[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #1F74BB;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid #f1f5f9;
}
.component-table-wrapper[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  overflow: hidden;
  margin-bottom: 40px;
}
.component-table[_ngcontent-%COMP%] {
  width: 100%;
  min-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 50px 2.5fr 1fr 1.5fr 1.5fr 100px 120px;
  padding: 12px 24px;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 50px 2.5fr 1fr 1.5fr 1.5fr 100px 120px;
  background: #ffffff;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 4px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  align-items: center;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
  padding: 16px 24px;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .comp-id[_ngcontent-%COMP%] {
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
  font-size: 12px;
  color: #94a3b8;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .name-block[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .name-block[_ngcontent-%COMP%]   .comp-name[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .name-block[_ngcontent-%COMP%]   .comp-code[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 600;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .badge.earning[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .badge.deduction[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .badge.contribution[_ngcontent-%COMP%] {
  background: #0f2b4a;
  color: white;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .calc-type[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .base-code[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 600;
  display: block;
  margin-top: 2px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .value-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .value-cell[_ngcontent-%COMP%]   .amt[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 4px 12px;
  border-radius: 8px;
  display: inline-block;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .value-cell[_ngcontent-%COMP%]   .sub-val[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
  margin-top: 4px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .icon-cell[_ngcontent-%COMP%] {
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #475569;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-right: 16px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%] {
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
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .icon-btn.edit[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .icon-btn.edit[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  color: white;
  border-color: #1F74BB;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .icon-btn.delete[_ngcontent-%COMP%] {
  color: #dc2626;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .icon-btn.delete[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.empty-state[_ngcontent-%COMP%] {
  padding: 80px 40px;
  text-align: center;
  color: #475569;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #ABABAB;
}
.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {
  font-size: 4rem;
  color: #94a3b8;
  margin-bottom: 24px;
  opacity: 0.4;
  display: block;
  margin: 0 auto;
}
.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  margin-bottom: 24px;
  font-weight: 500;
}
.empty-state[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  height: 48px;
  font-weight: 700;
  --border-radius: 8px;
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
  height: 100vh;
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
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  background: #f4f7fb;
}
.side-modal[_ngcontent-%COMP%]   .form-continer[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
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
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]::placeholder, 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]::placeholder, 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
  outline: none;
}
.side-modal[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  min-height: 100px;
  resize: vertical;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-group[_ngcontent-%COMP%] {
  display: flex;
  gap: 24px;
  margin: 8px 0;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-group[_ngcontent-%COMP%]   .check-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-group[_ngcontent-%COMP%]   .check-item[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  accent-color: #1F74BB;
  cursor: pointer;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-group[_ngcontent-%COMP%]   .check-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  text-transform: none;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%] {
  position: relative;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%] {
  position: relative;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.2rem;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  padding-left: 48px !important;
  width: 100%;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%] {
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
  max-height: 300px;
  overflow-y: auto;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 4px;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f8fafc;
}
.side-modal[_ngcontent-%COMP%]   .dropdown-container[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
@keyframes _ngcontent-%COMP%_fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`]});let s=d;return s})();var Vn=[{path:"",component:V}],ne=(()=>{let d=class d{};d.\u0275fac=function(r){return new(r||d)},d.\u0275mod=q({type:d}),d.\u0275inj=R({imports:[A,pn,T,z,K.forChild(Vn),V]});let s=d;return s})();export{ne as StructureCompositionPageModule};
