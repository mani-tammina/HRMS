import{a as rn}from"./chunk-RWRS6232.js";import{a as on}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{Ga as tn,H as W,R as Z,W as nn,X as en,a as V,b as D,c as f,d as j,e as G,h as R,i as X,j as U,m as Y,n as $,o as H,p as J,t as L,u as K,v as Q}from"./chunk-B3PLR2IL.js";import{Ba as O,Ca as g,Da as C,Eb as z,F as E,K as P,L as M,Ma as B,Oa as t,Pa as x,Qa as h,Ra as y,Vb as T,Zb as q,_ as i,ca as _,ea as S,fa as I,ja as b,pb as N,qb as A,ra as p,rb as F,sa as e,ta as n,ua as d}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as v,b as w,d as k}from"./chunk-JHI3MBHO.js";function sn(l,c){if(l&1){let r=O();e(0,"div",56)(1,"span",16),t(2),n(),e(3,"span",17),t(4),n(),e(5,"span",18),t(6),n(),e(7,"span",19)(8,"span",57),t(9),n()(),e(10,"span"),t(11),n(),e(12,"span",19)(13,"span",58),t(14),n()(),e(15,"span",59),t(16),n(),e(17,"span",19),d(18,"ion-icon",60),n(),e(19,"span",19),d(20,"ion-icon",60),n(),e(21,"span",19),t(22),n(),e(23,"span",20)(24,"ion-icon",61),g("click",function(){let s=P(r).$implicit,a=C();return M(a.editComponent(s))}),n(),e(25,"ion-icon",62),g("click",function(){let s=P(r).$implicit,a=C();return M(a.deleteComponent(s.id))}),n()()()}if(l&2){let r=c.$implicit;i(2),h("#",r.id),i(2),x(r.code),i(2),x(r.name),i(2),p("ngClass",r.component_type==null?null:r.component_type.toLowerCase()),i(),h(" ",r.component_type," "),i(2),x(r.calculation_type),i(3),y(" ",r.value,"",r.calculation_type==="PERCENTAGE"?"%":""," "),i(2),x(r.percentage_of_code||"-"),i(2),p("name",r.taxable?"shield-checkmark":"shield-outline")("color",r.taxable?"success":"medium"),i(2),p("name",r.prorated?"checkmark-circle":"close-circle-outline")("color",r.prorated?"primary":"medium"),i(2),x(r.sequence)}}function pn(l,c){l&1&&(e(0,"div",63),d(1,"ion-icon",64),e(2,"p"),t(3,"No components found. Create your first salary component to get started."),n()())}function dn(l,c){if(l&1&&(e(0,"div",65)(1,"div",66),t(2," Total Earnings Allocation: "),e(3,"strong"),t(4),n()()()),l&2){let r=C();i(4),h("",r.getTotal(),"%")}}function mn(l,c){if(l&1){let r=O();e(0,"div",67),g("click",function(){P(r);let s=C();return M(s.closeModal())}),n()}}function gn(l,c){if(l&1&&(e(0,"option",68),t(1),n()),l&2){let r=c.$implicit;p("value",r.id),i(),y(" ",r.structure_name," (",r.code,") ")}}function fn(l,c){l&1&&(e(0,"span",69),t(1,"%"),n())}function un(l,c){l&1&&(e(0,"div",31)(1,"label"),t(2,"Calculate % Of (Code)"),n(),d(3,"input",70),n())}var an=(()=>{let c=class c{constructor(o,s,a,m){this.fb=o,this.router=s,this.payrollService=a,this.toaster=m,this.components=[],this.isModalOpen=!1,this.isEditMode=!1,this.selectedComponentId=null,this.structures=[]}ngOnInit(){this.componentForm=this.fb.group({structure_id:[1,f.required],code:["",f.required],name:["",f.required],component_type:["EARNING",f.required],calculation_type:["FIXED",f.required],value:[0,[f.required,f.min(0)]],percentage_of_code:["BASIC"],taxable:[!0],prorated:[!1],sequence:[10,f.required],notes:[""]}),this.fetchComponents(),this.fetchStructures()}fetchStructures(){this.payrollService.getPayrollstructures().subscribe({next:o=>{this.structures=Array.isArray(o)?o:o.data||[],this.structures.length>0&&this.componentForm.patchValue({structure_id:this.structures[0].id})},error:o=>{console.error("Failed to fetch structures",o),this.toaster.showError("Could not load payroll structures")}})}fetchComponents(){this.payrollService.getPayrollComponents().subscribe({next:o=>{this.components=Array.isArray(o)?o:o.data||[]},error:o=>{console.error("Failed to fetch components",o),this.toaster.showError("Could not load payroll components")}})}openCreateModal(){this.isEditMode=!1,this.selectedComponentId=null,this.componentForm.reset({structure_id:this.structures.length>0?this.structures[0].id:1,component_type:"EARNING",calculation_type:"FIXED",percentage_of_code:"BASIC",taxable:!0,prorated:!1,sequence:10,value:0}),this.isModalOpen=!0}editComponent(o){this.isEditMode=!0,this.selectedComponentId=o.id||o.component_id||null,this.componentForm.patchValue({structure_id:o.structure_id,code:o.code,name:o.name,component_type:o.component_type,calculation_type:o.calculation_type,value:o.value,percentage_of_code:o.percentage_of_code,taxable:o.taxable,prorated:o.prorated,sequence:o.sequence,notes:o.notes}),this.isModalOpen=!0}deleteComponent(o){confirm("Are you sure you want to delete this component?")&&this.payrollService.deletePayrollComponent(o).subscribe({next:()=>{this.toaster.showSuccess("Component deleted successfully"),this.fetchComponents()},error:s=>{console.error("Delete failed",s),this.toaster.showError("Could not delete component")}})}saveComponent(){if(this.componentForm.invalid)return;let o=this.componentForm.value,s=w(v({},o),{value:Number(o.value),sequence:Number(o.sequence),structure_id:Number(o.structure_id)});if(this.isEditMode&&this.selectedComponentId!=null){let a=s,{structure_id:m}=a,u=k(a,["structure_id"]);isNaN(u.value)&&(u.value=0),isNaN(u.sequence)&&(u.sequence=0),this.payrollService.updatePayrollComponent(this.selectedComponentId,u).subscribe({next:()=>{this.toaster.showSuccess("Component updated successfully"),this.closeModal(),this.fetchComponents()},error:ln=>{console.error("Update failed",ln),this.toaster.showError("Could not update component")}})}else this.payrollService.createPayrollComponent(s).subscribe({next:()=>{this.toaster.showSuccess("Component created successfully"),this.closeModal(),this.fetchComponents()},error:m=>{console.error("Creation failed",m),this.toaster.showError("Could not create component")}})}closeModal(){this.isModalOpen=!1,this.isEditMode=!1,this.selectedComponentId=null}getTotal(){return this.components.reduce((o,s)=>o+Number(s.value),0)}goBack(){this.router.navigate(["/finance/admin"])}};c.\u0275fac=function(s){return new(s||c)(_(L),_(T),_(rn),_(on))},c.\u0275cmp=S({type:c,selectors:[["app-payroll-components"]],standalone:!1,decls:115,vars:15,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"bg-blob","blob-1"],[1,"bg-blob","blob-2"],[1,"payroll-container"],[1,"back-nav"],[1,"back-link",3,"click"],["name","arrow-back-outline"],[1,"header","fade-in"],[1,"header-info"],[1,"primary-btn",3,"click"],["name","add-outline","slot","start"],[1,"components-card","fade-in-up",2,"animation-delay","0.1s"],[1,"component-table-wrapper"],[1,"component-table"],[1,"table-head"],[1,"sticky-col","col-id"],[1,"sticky-col","col-code"],[1,"sticky-col","col-name"],[1,"justify-center"],[1,"sticky-action"],["class","table-row",4,"ngFor","ngForOf"],["class","empty-state-row",4,"ngIf"],["class","table-footer",4,"ngIf"],["class","side-modal-overlay pill-overlay",3,"click",4,"ngIf"],[1,"side-modal"],[1,"modal-header"],["name","close-outline",1,"close-icon",3,"click"],[1,"modal-body"],[1,"component-form-vertical",3,"ngSubmit","formGroup"],[1,"form-container"],[1,"form-group","glass-input-group"],["formControlName","structure_id",1,"glass-select"],[3,"value",4,"ngFor","ngForOf"],[1,"form-row"],["type","text","formControlName","code","placeholder","e.g. BASIC",1,"glass-input"],["type","number","formControlName","sequence","placeholder","0",1,"glass-input"],["type","text","formControlName","name","placeholder","e.g. Basic Salary",1,"glass-input"],["formControlName","component_type",1,"glass-select"],["value","EARNING"],["value","DEDUCTION"],["formControlName","calculation_type",1,"glass-select"],["value","FIXED"],["value","PERCENTAGE"],[1,"input-with-suffix"],["type","number","formControlName","value","placeholder","0.00",1,"glass-input"],["class","suffix",4,"ngIf"],["class","form-group glass-input-group",4,"ngIf"],[1,"form-group","checkbox-row"],[1,"glass-checkbox"],["type","checkbox","formControlName","taxable"],["type","checkbox","formControlName","prorated"],["formControlName","notes","rows","4","placeholder","Internal documentation or remarks regarding this component...",1,"glass-textarea"],[1,"form-footer"],["type","button","fill","clear","color","medium",3,"click"],["type","submit",1,"submit-btn",3,"disabled"],[1,"table-row"],[1,"badge",3,"ngClass"],[1,"value-pill"],[1,"text-muted"],[3,"name","color"],["name","create-outline","title","Edit",1,"edit-icon",3,"click"],["name","trash-outline","title","Delete",1,"delete-icon",3,"click"],[1,"empty-state-row"],["name","layers-outline",2,"font-size","3rem","opacity","0.2"],[1,"table-footer"],[1,"total-summary"],[1,"side-modal-overlay","pill-overlay",3,"click"],[3,"value"],[1,"suffix"],["type","text","formControlName","percentage_of_code","placeholder","e.g. BASIC",1,"glass-input"]],template:function(s,a){if(s&1&&(d(0,"ion-header",0),e(1,"ion-content",1),d(2,"div",2)(3,"div",3),e(4,"div",4)(5,"div",5)(6,"a",6),g("click",function(){return a.goBack()}),d(7,"ion-icon",7),t(8," Back to Payroll Dashboard "),n()(),e(9,"div",8)(10,"div",9)(11,"h2"),t(12,"Payroll Components"),n(),e(13,"p"),t(14,"Configure salary structure percentages, taxable rules and component definitions"),n()(),e(15,"ion-button",10),g("click",function(){return a.openCreateModal()}),d(16,"ion-icon",11),t(17," Create New Component "),n()(),e(18,"div",12)(19,"div",13)(20,"div",14)(21,"div",15)(22,"span",16),t(23,"ID"),n(),e(24,"span",17),t(25,"Code"),n(),e(26,"span",18),t(27,"Name"),n(),e(28,"span",19),t(29,"Type"),n(),e(30,"span"),t(31,"Calc Type"),n(),e(32,"span",19),t(33,"Value"),n(),e(34,"span"),t(35,"Base Code"),n(),e(36,"span",19),t(37,"Taxable"),n(),e(38,"span",19),t(39,"Prorated"),n(),e(40,"span",19),t(41,"Seq"),n(),e(42,"span",20),t(43,"Action"),n()(),b(44,sn,26,14,"div",21)(45,pn,4,0,"div",22),n()(),b(46,dn,5,1,"div",23),n()(),b(47,mn,1,0,"div",24),e(48,"div",25)(49,"div",26)(50,"h3"),t(51),n(),e(52,"ion-icon",27),g("click",function(){return a.closeModal()}),n()(),e(53,"div",28)(54,"form",29),g("ngSubmit",function(){return a.saveComponent()}),e(55,"div",30)(56,"div",31)(57,"label"),t(58,"Structure Assignment"),n(),e(59,"select",32),b(60,gn,2,3,"option",33),n()(),e(61,"div",34)(62,"div",31)(63,"label"),t(64,"Component Code"),n(),d(65,"input",35),n(),e(66,"div",31)(67,"label"),t(68,"Sort Sequence"),n(),d(69,"input",36),n()(),e(70,"div",31)(71,"label"),t(72,"Component Display Name"),n(),d(73,"input",37),n(),e(74,"div",34)(75,"div",31)(76,"label"),t(77,"Component Type"),n(),e(78,"select",38)(79,"option",39),t(80,"EARNING"),n(),e(81,"option",40),t(82,"DEDUCTION"),n()()(),e(83,"div",31)(84,"label"),t(85,"Calculation Method"),n(),e(86,"select",41)(87,"option",42),t(88,"FIXED AMOUNT"),n(),e(89,"option",43),t(90,"PERCENTAGE %"),n()()()(),e(91,"div",34)(92,"div",31)(93,"label"),t(94,"Numeric Value"),n(),e(95,"div",44),d(96,"input",45),b(97,fn,2,0,"span",46),n()(),b(98,un,4,0,"div",47),n(),e(99,"div",48)(100,"label",49),d(101,"input",50),t(102," Is Taxable Component "),n(),e(103,"label",49),d(104,"input",51),t(105," Enable Proration "),n()(),e(106,"div",31)(107,"label"),t(108,"Administrative Notes"),n(),d(109,"textarea",52),n()(),e(110,"div",53)(111,"ion-button",54),g("click",function(){return a.closeModal()}),t(112,"Cancel"),n(),e(113,"ion-button",55),t(114),n()()()()()()),s&2){let m,u;p("translucent",!0),i(),p("fullscreen",!0),i(43),p("ngForOf",a.components),i(),p("ngIf",a.components.length===0),i(),p("ngIf",a.components.length>0),i(),p("ngIf",a.isModalOpen),i(),B("open",a.isModalOpen),i(3),x(a.isEditMode?"Edit Component":"Create Component"),i(3),p("formGroup",a.componentForm),i(6),p("ngForOf",a.structures),i(37),p("ngIf",((m=a.componentForm.get("calculation_type"))==null?null:m.value)==="PERCENTAGE"),i(),p("ngIf",((u=a.componentForm.get("calculation_type"))==null?null:u.value)==="PERCENTAGE"),i(15),p("disabled",a.componentForm.invalid),i(),h(" ",a.isEditMode?"Save Changes":"Create Component"," ")}},dependencies:[N,A,F,R,H,J,D,X,V,$,j,G,U,Y,W,Z,nn,en],styles:[`

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
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.back-nav[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  padding: 10px 22px;
  border-radius: 9999px;
  color: #475569;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid #f1f5f9;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {
  color: #1F74BB;
  transform: translateX(-4px);
  border-color: #1F74BB;
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
  letter-spacing: -0.05em;
  margin: 0;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 500;
  margin-top: 8px;
}
.header[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --border-radius: 8px;
  --height: 48px;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
}
.header[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%]:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.components-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.component-table-wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
  margin: 0 -32px;
  padding: 0 32px;
}
.component-table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {
  height: 8px;
}
.component-table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f8fafc;
}
.component-table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.component-table[_ngcontent-%COMP%] {
  min-width: 1400px;
  display: grid;
  grid-template-columns: 80px 140px minmax(250px, 1fr) 120px 140px 100px 120px 90px 90px 80px 120px;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%] {
  display: contents;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  padding: 16px 20px;
  background: #f8fafc;
  color: #475569;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #ABABAB;
  position: sticky;
  top: 0;
  z-index: 10;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.sticky-col[_ngcontent-%COMP%] {
  left: 0;
  z-index: 20;
  border-right: 1px solid #ABABAB;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.col-id[_ngcontent-%COMP%] {
  left: 0;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.col-code[_ngcontent-%COMP%] {
  left: 80px;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.col-name[_ngcontent-%COMP%] {
  left: 220px;
}
.component-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span.sticky-action[_ngcontent-%COMP%] {
  right: 0;
  z-index: 20;
  border-left: 1px solid #ABABAB;
  text-align: center;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  display: contents;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  padding: 16px 20px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  color: #1e293b;
  transition: background 0.2s ease;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.sticky-col[_ngcontent-%COMP%] {
  position: sticky;
  left: 0;
  z-index: 5;
  border-right: 1px solid #f1f5f9;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-id[_ngcontent-%COMP%] {
  left: 0;
  color: #94a3b8;
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
  font-size: 11px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-code[_ngcontent-%COMP%] {
  left: 80px;
  font-weight: 700;
  color: #0f172a;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-name[_ngcontent-%COMP%] {
  left: 220px;
  color: #0f172a;
  font-weight: 700;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.sticky-action[_ngcontent-%COMP%] {
  position: sticky;
  right: 0;
  z-index: 5;
  border-left: 1px solid #f1f5f9;
  justify-content: center;
  gap: 8px;
  background: #ffffff;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.justify-center[_ngcontent-%COMP%] {
  justify-content: center;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .badge.earning[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .badge.deduction[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .value-pill[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 700;
  color: #1F74BB;
  font-size: 12px;
  border: 1px solid #f1f5f9;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #94a3b8;
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   ion-icon.edit-icon[_ngcontent-%COMP%]:hover {
  color: #1F74BB;
  transform: translateY(-2px);
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   ion-icon.delete-icon[_ngcontent-%COMP%]:hover {
  color: #dc2626;
  transform: translateY(-2px);
}
.component-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {
  background: #f1f5f9;
}
.empty-state-row[_ngcontent-%COMP%] {
  grid-column: 1/-1;
  padding: 80px 0;
  text-align: center;
}
.empty-state-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-weight: 700;
  margin-top: 16px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.table-footer[_ngcontent-%COMP%] {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}
.table-footer[_ngcontent-%COMP%]   .total-summary[_ngcontent-%COMP%] {
  background: #0f2b4a;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.table-footer[_ngcontent-%COMP%]   .total-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 12px;
  border-radius: 4px;
  color: white;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
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
  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;
}
.side-modal[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  right: -550px;
  width: 550px;
  height: 100%;
  background: white;
  z-index: 1001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
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
}
.side-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]:hover {
  color: #dc2626;
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
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%], 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 14px 18px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  color: #0f172a;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-select[_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  background: white;
  outline: none;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.side-modal[_ngcontent-%COMP%]   .input-with-suffix[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.side-modal[_ngcontent-%COMP%]   .input-with-suffix[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%] {
  width: 100%;
  padding-right: 60px !important;
}
.side-modal[_ngcontent-%COMP%]   .input-with-suffix[_ngcontent-%COMP%]   .suffix[_ngcontent-%COMP%] {
  position: absolute;
  right: 12px;
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.side-modal[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  min-height: 100px;
  resize: vertical;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 32px;
  padding: 20px;
  background: white;
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
  accent-color: #1F74BB;
  border-radius: 4px;
  cursor: pointer;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%] {
  padding: 24px 40px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  background: white;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 700;
  --padding-start: 24px;
  --padding-end: 24px;
  height: 48px;
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
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (max-width: 1024px) {
  .side-modal[_ngcontent-%COMP%] {
    width: 100%;
    right: -100%;
  }
  .header[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .components-card[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .payroll-container[_ngcontent-%COMP%] {
    padding: 16px;
  }
}`]});let l=c;return l})();var bn=[{path:"",component:an}],Nn=(()=>{let c=class c{};c.\u0275fac=function(s){return new(s||c)},c.\u0275mod=I({type:c}),c.\u0275inj=E({imports:[z,K,Q,tn,q.forChild(bn)]});let l=c;return l})();export{Nn as PayrollComponentsPageModule};
