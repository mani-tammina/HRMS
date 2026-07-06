import{a as Q}from"./chunk-RWRS6232.js";import{a as L}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{Ga as K,H as q,R as H,W as J,X,a as A,b as I,c as N,d as V,e as j,h as D,j as G,m as $,t as R,u as U,v as Y}from"./chunk-B3PLR2IL.js";import{$a as y,Ba as C,Ca as m,Da as x,Eb as E,F as M,K as b,L as u,Ma as v,Oa as i,Pa as P,Qa as g,Vb as F,Zb as z,_ as c,bb as k,ca as _,ea as O,fa as w,ja as h,qb as B,ra as f,rb as T,sa as n,ta as e,ua as d,yb as S}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import"./chunk-JHI3MBHO.js";function nn(l,a){if(l&1){let s=C();n(0,"div",43)(1,"span",17),i(2),e(),n(3,"span",44),m("click",function(){let r=b(s).$implicit,o=x();return u(o.viewComposition(r.template_id||r.id))}),i(4),e(),n(5,"span",45),i(6),e(),n(7,"span",20)(8,"div",46),d(9,"ion-icon",47),i(10),e()(),n(11,"span",21),i(12),y(13,"date"),e(),n(14,"span",22)(15,"div",48)(16,"button",49),m("click",function(){let r=b(s).$implicit,o=x();return u(o.editTemplate(r))}),d(17,"ion-icon",50),e(),n(18,"button",51),m("click",function(){let r=b(s).$implicit,o=x();return u(o.deleteTemplate(r.template_id||r.id))}),d(19,"ion-icon",52),e()()()()}if(l&2){let s=a.$implicit;c(2),P(s.template_id||s.id),c(2),g(" ",s.template_name," "),c(2),g(" ",s.description||"-"," "),c(4),g(" User #",s.created_by," "),c(2),g(" ",k(13,5,s.created_at||s.createdAt,"mediumDate")," ")}}function en(l,a){l&1&&(n(0,"div",53),d(1,"ion-icon",54),n(2,"p"),i(3,"No templates found. Create your first template to get started."),e()())}function tn(l,a){if(l&1){let s=C();n(0,"div",55),m("click",function(){b(s);let r=x();return u(r.isModalOpen=!1)}),e()}}function on(l,a){l&1&&(n(0,"small",56),i(1," Template name is required. "),e())}var W=(()=>{let a=class a{constructor(t,r,o,p){this.payrollService=t,this.router=r,this.fb=o,this.toaster=p,this.templates=[],this.isModalOpen=!1,this.isEditMode=!1,this.selectedTemplateId=null}ngOnInit(){this.initForm(),this.fetchTemplates()}initForm(){this.templateForm=this.fb.group({template_name:["",N.required],description:[""],is_active:[!0]})}fetchTemplates(){this.payrollService.getPayrollTempletes().subscribe({next:t=>{this.templates=Array.isArray(t)?t:t.data||[]},error:t=>{console.error("Failed to fetch templates",t),this.toaster.showError("Could not load payroll templates")}})}viewComposition(t){this.router.navigate(["/finance/templates/composition",t])}goBack(){this.router.navigate(["/finance/admin"])}openCreateModal(){this.isEditMode=!1,this.selectedTemplateId=null,this.templateForm.reset({template_name:"",description:"",is_active:!0}),this.isModalOpen=!0}editTemplate(t){this.isEditMode=!0,this.selectedTemplateId=t.template_id||t.id,this.templateForm.patchValue({template_name:t.template_name||t.name,description:t.description,is_active:!!t.is_active}),this.isModalOpen=!0}saveTemplate(){if(this.templateForm.invalid)return;let t=this.templateForm.value,r={template_name:t.template_name,description:t.description,created_by:Number(localStorage.getItem("employee_id"))||1};this.isEditMode&&this.selectedTemplateId?this.payrollService.updateTemplate(this.selectedTemplateId,r).subscribe({next:()=>{this.toaster.showSuccess("Template updated successfully"),this.isModalOpen=!1,this.fetchTemplates()},error:o=>{console.error("Update failed",o),this.toaster.showError("Failed to update template")}}):this.payrollService.createTemplate(r).subscribe({next:()=>{this.toaster.showSuccess("Template created successfully"),this.isModalOpen=!1,this.fetchTemplates()},error:o=>{console.error("Creation failed",o),this.toaster.showError("Failed to create template")}})}deleteTemplate(t){confirm("Are you sure you want to delete this template?")&&this.payrollService.deleteTemplate(t).subscribe({next:()=>{this.toaster.showSuccess("Template deleted successfully"),this.fetchTemplates()},error:r=>{console.error("Delete failed",r),this.toaster.showError("Could not delete template")}})}};a.\u0275fac=function(r){return new(r||a)(_(Q),_(F),_(R),_(L))},a.\u0275cmp=O({type:a,selectors:[["app-payroll-templates"]],standalone:!1,decls:69,vars:12,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"bg-blob","blob-1"],[1,"bg-blob","blob-2"],[1,"payroll-container"],[1,"back-nav"],[1,"back-link",3,"click"],["name","arrow-back-outline"],[1,"header"],[1,"header-info"],[1,"primary-btn",3,"click"],["name","add-outline","slot","start"],[1,"templates-card","glass-card"],[1,"card-header"],[1,"table-wrapper"],[1,"custom-table"],[1,"table-head"],[1,"col-id"],[1,"col-name"],[1,"col-desc"],[1,"col-creator"],[1,"col-date"],[1,"col-action"],["class","table-row fade-in",4,"ngFor","ngForOf"],["class","empty-state-row",4,"ngIf"],["class","side-modal-overlay",3,"click",4,"ngIf"],[1,"side-modal","glass-modal"],[1,"modal-header"],["name","close-outline",1,"close-icon",3,"click"],[1,"modal-body"],[1,"template-form-vertical",3,"ngSubmit","formGroup"],[1,"form-container"],[1,"form-group","glass-input-group"],["type","text","formControlName","template_name","placeholder","e.g. Standard Executive Package",1,"glass-input"],["class","error-text",4,"ngIf"],["formControlName","description","rows","5","placeholder","Briefly describe the purpose of this template...",1,"glass-textarea"],[1,"form-group","checkbox-row"],[1,"glass-checkbox"],["type","checkbox","formControlName","is_active"],[1,"checkmark"],[1,"form-footer"],["type","button","fill","clear","color","medium",3,"click"],["type","submit",1,"submit-btn",3,"disabled"],[1,"table-row","fade-in"],[1,"col-name","template-name",3,"click"],[1,"col-desc","text-muted"],[1,"creator-badge"],["name","person-circle-outline"],[1,"action-buttons"],["title","Edit Template",1,"action-icon","edit",3,"click"],["name","create-outline"],["title","Delete Template",1,"action-icon","delete",3,"click"],["name","trash-outline"],[1,"empty-state-row"],["name","file-tray-outline"],[1,"side-modal-overlay",3,"click"],[1,"error-text"]],template:function(r,o){if(r&1&&(d(0,"ion-header",0),n(1,"ion-content",1),d(2,"div",2)(3,"div",3),n(4,"div",4)(5,"div",5)(6,"a",6),m("click",function(){return o.goBack()}),d(7,"ion-icon",7),i(8," Back to Payroll Setup "),e()(),n(9,"div",8)(10,"div",9)(11,"h2"),i(12,"Payroll Templates"),e(),n(13,"p"),i(14,"Manage and configure salary structure templates for different employee groups"),e()(),n(15,"ion-button",10),m("click",function(){return o.openCreateModal()}),d(16,"ion-icon",11),i(17," Create New Template "),e()(),n(18,"div",12)(19,"div",13)(20,"h3"),i(21,"Configured Templates"),e(),n(22,"p"),i(23,"Click on the template name to view its composition"),e()(),n(24,"div",14)(25,"div",15)(26,"div",16)(27,"span",17),i(28,"ID"),e(),n(29,"span",18),i(30,"Template Name"),e(),n(31,"span",19),i(32,"Description"),e(),n(33,"span",20),i(34,"Created By"),e(),n(35,"span",21),i(36,"Created At"),e(),n(37,"span",22),i(38,"Actions"),e()(),h(39,nn,20,8,"div",23)(40,en,4,0,"div",24),e()()()(),h(41,tn,1,0,"div",25),n(42,"div",26)(43,"div",27)(44,"h3"),i(45),e(),n(46,"ion-icon",28),m("click",function(){return o.isModalOpen=!1}),e()(),n(47,"div",29)(48,"form",30),m("ngSubmit",function(){return o.saveTemplate()}),n(49,"div",31)(50,"div",32)(51,"label"),i(52,"Template Name"),e(),d(53,"input",33),h(54,on,2,0,"small",34),e(),n(55,"div",32)(56,"label"),i(57,"Description (Optional)"),e(),d(58,"textarea",35),e(),n(59,"div",36)(60,"label",37),d(61,"input",38)(62,"span",39),i(63," Is Template Active? "),e()()(),n(64,"div",40)(65,"ion-button",41),m("click",function(){return o.isModalOpen=!1}),i(66,"Cancel"),e(),n(67,"ion-button",42),i(68),e()()()()()()),r&2){let p;f("translucent",!0),c(),f("fullscreen",!0),c(38),f("ngForOf",o.templates),c(),f("ngIf",o.templates.length===0),c(),f("ngIf",o.isModalOpen),c(),v("open",o.isModalOpen),c(3),P(o.isEditMode?"Edit Template":"Create New Template"),c(3),f("formGroup",o.templateForm),c(6),f("ngIf",((p=o.templateForm.get("template_name"))==null?null:p.invalid)&&((p=o.templateForm.get("template_name"))==null?null:p.touched)),c(13),f("disabled",o.templateForm.invalid),c(),g(" ",o.isEditMode?"Update":"Save"," Template ")}},dependencies:[B,T,D,I,A,V,j,G,$,q,H,J,X,S],styles:[`

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
.back-nav[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {
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
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {
  color: #1F74BB;
  transform: translateX(-4px);
  border-color: #1F74BB;
}
.back-nav[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.1rem;
}
.header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(1.375rem, 2vw + 0.5rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.05em;
}
.header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  margin: 4px 0 0;
  font-weight: 500;
}
.header[_ngcontent-%COMP%]   .primary-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #ffffff;
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
.templates-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  margin-bottom: 32px;
}
.templates-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.templates-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 4px 0;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.templates-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  color: #475569;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
.table-wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
  margin: 0 -32px;
  padding: 0 32px;
}
.table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {
  height: 8px;
}
.table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f8fafc;
}
.table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #ABABAB;
  border-radius: 4px;
}
.custom-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  min-width: 1000px;
}
.custom-table[_ngcontent-%COMP%]   .table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  padding: 12px 20px;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  padding: 16px 20px;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {
  border-left: 1px solid #f1f5f9;
  border-radius: 8px 0 0 8px;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {
  border-right: 1px solid #f1f5f9;
  border-radius: 0 8px 8px 0;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-id[_ngcontent-%COMP%] {
  font-family:
    "JetBrains Mono",
    "Courier New",
    monospace;
  font-size: 12px;
  color: #94a3b8;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   span.col-desc[_ngcontent-%COMP%] {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #475569;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .template-name[_ngcontent-%COMP%] {
  cursor: pointer;
  color: #1F74BB;
  font-weight: 700;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  transition: all 0.12s ease;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .template-name[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
  color: #1F74BB;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .creator-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #e8f0fb;
  padding: 4px 12px;
  border-radius: 9999px;
  color: #1F74BB;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .creator-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .action-icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
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
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .action-icon.edit[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  color: white;
  border-color: #1F74BB;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .action-icon.delete[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .action-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.2rem;
}
.custom-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.empty-state-row[_ngcontent-%COMP%] {
  padding: 80px 40px;
  text-align: center;
  color: #94a3b8;
  background: #f8fafc;
  border-radius: 16px;
  margin-top: 24px;
  border: 2px dashed #ABABAB;
}
.empty-state-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.4;
  display: block;
  margin: 0 auto;
}
.empty-state-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  margin-top: 16px;
}
.side-modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 1000;
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  right: -540px;
  width: 540px;
  height: 100%;
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
  letter-spacing: -0.05em;
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
  padding: 32px;
  overflow-y: auto;
  flex: 1;
  background: #ffffff;
}
.side-modal[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
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
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 14px 18px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #0f172a;
  font-weight: 600;
  transition: all 0.2s ease;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]::placeholder, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
  font-weight: 500;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]:focus, 
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
  outline: none;
  background: #ffffff;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  min-height: 100px;
  resize: vertical;
}
.side-modal[_ngcontent-%COMP%]   .glass-input-group[_ngcontent-%COMP%]   .error-text[_ngcontent-%COMP%] {
  color: #dc2626;
  font-size: 11px;
  font-weight: 700;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.side-modal[_ngcontent-%COMP%]   .checkbox-row[_ngcontent-%COMP%] {
  margin: 8px 0;
  background: #f8fafc;
  padding: 18px 24px;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
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
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #1F74BB;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%] {
  padding: 24px 32px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  height: 44px;
  --border-radius: 8px;
  font-weight: 700;
  --padding-start: 24px;
  --padding-end: 24px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button.submit-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: white;
}
.side-modal[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   ion-button.submit-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
  transform: translateY(-1px);
}
@media (max-width: 1024px) {
  .side-modal[_ngcontent-%COMP%] {
    width: 100%;
    right: -100%;
  }
}`]});let l=a;return l})();var rn=[{path:"",component:W}],Cn=(()=>{let a=class a{};a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=w({type:a}),a.\u0275inj=M({imports:[E,U,Y,K,z.forChild(rn)]});let l=a;return l})();export{Cn as PayrollTemplatesPageModule};
