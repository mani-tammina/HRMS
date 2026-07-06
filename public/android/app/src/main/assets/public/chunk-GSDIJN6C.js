import{a as vn}from"./chunk-7N2ZIRKX.js";import{a as wn}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{$ as fn,A as J,B as K,Fa as Mn,G as Q,Ga as On,H as Y,I as Z,J as nn,K as en,L as tn,N as on,Q as rn,R as an,V as cn,W as ln,X as sn,Y as dn,Z as mn,_ as gn,c as u,d as q,e as G,g as L,h as H,ha as pn,j as R,la as _n,m as W,ma as un,na as bn,qa as hn,ra as xn,t as $,ta as Cn,u as U,v as X,va as Pn}from"./chunk-B3PLR2IL.js";import{$a as F,Ba as C,Ca as _,Da as g,Eb as V,F as w,K as f,L as p,Oa as r,Pa as P,Qa as x,Ra as y,Ta as S,Ua as I,Va as E,Vb as z,Ya as k,Zb as D,_ as s,ab as B,ca as h,ea as v,fa as j,ja as b,qb as T,ra as d,rb as N,sa as t,ta as n,ua as m,xb as A}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as O}from"./chunk-JHI3MBHO.js";var In=()=>({standalone:!0});function En(a,l){if(a&1){let o=C();t(0,"ion-button",42),_("click",function(){f(o);let i=g(2);return p(i.clearManagerSelection())}),m(1,"ion-icon",43),n()}}function kn(a,l){if(a&1){let o=C();t(0,"ion-item",46),_("click",function(){let i=f(o).$implicit,c=g(3);return p(c.selectManager(i))}),t(1,"ion-label")(2,"h2"),r(3),n(),t(4,"p"),r(5),n()()()}if(a&2){let o=l.$implicit;s(3),P(o.FullName),s(2),y("ID: ",o.id," | ",o.WorkEmail)}}function Fn(a,l){if(a&1&&(t(0,"div",44)(1,"ion-list"),b(2,kn,6,3,"ion-item",45),n()()),a&2){let o=g(2);s(2),d("ngForOf",o.filteredManagers)}}function Bn(a,l){if(a&1){let o=C();t(0,"div",18)(1,"ion-card",19)(2,"ion-card-header")(3,"ion-card-title"),r(4),n()(),t(5,"ion-card-content")(6,"form",20),_("ngSubmit",function(){f(o);let i=g();return p(i.submit())}),t(7,"div",21)(8,"ion-item",22)(9,"ion-label",23),r(10,"Project Code*"),n(),m(11,"ion-input",24),n(),t(12,"ion-item",22)(13,"ion-label",23),r(14,"Project Name*"),n(),m(15,"ion-input",25),n(),t(16,"ion-item",22)(17,"ion-label",23),r(18,"Client Name*"),n(),m(19,"ion-input",26),n(),t(20,"ion-item",22)(21,"ion-label",23),r(22,"Start Date*"),n(),m(23,"ion-input",27),n(),t(24,"ion-item",22)(25,"ion-label",23),r(26,"End Date*"),n(),m(27,"ion-input",28),n(),t(28,"ion-item",22)(29,"ion-label"),r(30,"Status"),n(),t(31,"ion-select",29)(32,"ion-select-option",30),r(33,"Active"),n(),t(34,"ion-select-option",31),r(35,"On Hold"),n(),t(36,"ion-select-option",32),r(37,"Completed"),n(),t(38,"ion-select-option",33),r(39,"Cancelled"),n()()(),t(40,"div",34)(41,"ion-item",22)(42,"ion-label",23),r(43,"Project Manager*"),n(),t(44,"ion-input",35),E("ngModelChange",function(i){f(o);let c=g();return I(c.managerSearchTerm,i)||(c.managerSearchTerm=i),p(i)}),_("ionInput",function(i){f(o);let c=g();return p(c.onManagerSearch(i))}),n(),b(45,En,2,0,"ion-button",36),n(),b(46,Fn,3,1,"div",37),n(),t(47,"ion-item",38)(48,"ion-label",23),r(49,"Description"),n(),m(50,"ion-textarea",39),n()(),t(51,"div",40)(52,"ion-button",41),r(53),n()()()()()()}if(a&2){let o=g();d("@slideIn",void 0),s(4),x("",o.isEditMode?"Edit":"Create"," Project"),s(2),d("formGroup",o.projectForm),s(38),S("ngModel",o.managerSearchTerm),d("ngModelOptions",k(9,In)),s(),d("ngIf",o.selectedManager),s(),d("ngIf",o.filteredManagers.length>0),s(6),d("disabled",o.submitting||o.projectForm.invalid),s(),x(" ",o.submitting?"Processing...":o.isEditMode?"Update Project":"Create Project"," ")}}function Tn(a,l){a&1&&(t(0,"div",47),m(1,"ion-spinner",48),n())}function Nn(a,l){if(a&1){let o=C();t(0,"ion-row",50)(1,"ion-col",10),r(2),n(),t(3,"ion-col",51),_("click",function(){let i=f(o).$implicit,c=g(2);return p(c.navigateToDetails(i))}),r(4),n(),t(5,"ion-col",12),r(6),n(),t(7,"ion-col",10)(8,"ion-badge",52),r(9),F(10,"uppercase"),n()(),t(11,"ion-col",13)(12,"ion-button",53),_("click",function(){let i=f(o).$implicit,c=g(2);return p(c.openEditForm(i))}),m(13,"ion-icon",54),n()()()}if(a&2){let o=l.$implicit;s(2),P(o.project_code),s(2),x(" ",o.project_name," "),s(2),P(o.client_name),s(2),d("color",o.status==="active"?"success":o.status==="on_hold"?"warning":o.status==="completed"?"primary":"danger"),s(),x(" ",B(10,5,o.status)," ")}}function An(a,l){if(a&1&&(t(0,"ion-grid"),b(1,Nn,14,7,"ion-row",49),n()),a&2){let o=g();s(),d("ngForOf",o.projects)}}function Vn(a,l){a&1&&(t(0,"div",55),m(1,"ion-icon",56),t(2,"p"),r(3,"No projects configured"),n()())}var jn=(()=>{let l=class l{constructor(e,i,c,M,yn){this.fb=e,this.projectService=i,this.employeeService=c,this.toastCtrl=M,this.router=yn,this.submitting=!1,this.projects=[],this.loadingProjects=!1,this.showCreateForm=!1,this.isEditMode=!1,this.selectedProjectId=null,this.allEmployees=[],this.filteredManagers=[],this.managerSearchTerm="",this.selectedManager=null}ngOnInit(){this.initForm(),this.getProjects(),this.loadEmployees()}initForm(){this.projectForm=this.fb.group({project_code:["",u.required],project_name:["",u.required],client_name:["",u.required],start_date:["",u.required],end_date:["",u.required],status:["active",u.required],description:[""],project_manager_id:["",u.required]})}getProjects(){this.loadingProjects=!0,this.projectService.getProjects().subscribe({next:e=>{this.projects=e.projects||e||[],this.loadingProjects=!1},error:()=>{this.showToast("Failed to load projects","danger"),this.loadingProjects=!1}})}loadEmployees(){this.employeeService.getAllEmployees(1,1e3).subscribe({next:e=>{this.allEmployees=e.data||[]}})}submit(){if(this.projectForm.invalid){this.showToast("Please fill all required fields","warning");return}this.submitting=!0,(this.isEditMode&&this.selectedProjectId?this.projectService.updateProject(this.selectedProjectId,this.projectForm.value):this.projectService.createProject(this.projectForm.value)).subscribe({next:()=>{this.showToast(this.isEditMode?"Project updated":"Project created","success"),this.submitting=!1,this.showCreateForm=!1,this.getProjects(),this.cancelCreate()},error:()=>{this.showToast("Operation failed","danger"),this.submitting=!1}})}openEditForm(e){if(this.isEditMode=!0,this.selectedProjectId=e.id||null,this.showCreateForm=!0,e.project_manager_id){let i=this.allEmployees.find(c=>c.id===e.project_manager_id);i&&(this.selectedManager=i,this.managerSearchTerm=`${i.FullName}`)}this.projectForm.patchValue({project_code:e.project_code,project_name:e.project_name,client_name:e.client_name,start_date:this.formatDate(e.start_date),end_date:this.formatDate(e.end_date),status:e.status,description:e.description,project_manager_id:e.project_manager_id})}cancelCreate(){this.showCreateForm=!1,this.isEditMode=!1,this.selectedProjectId=null,this.projectForm.reset({status:"active"}),this.selectedManager=null,this.managerSearchTerm=""}onManagerSearch(e){let i=e.detail.value?.toLowerCase()||"";if(i.length<2){this.filteredManagers=[];return}this.filteredManagers=this.allEmployees.filter(c=>c.FullName?.toLowerCase().includes(i)||c.id.toString().includes(i)).slice(0,10)}selectManager(e){this.selectedManager=e,this.managerSearchTerm=e.FullName,this.projectForm.patchValue({project_manager_id:e.id}),this.filteredManagers=[]}clearManagerSelection(){this.selectedManager=null,this.managerSearchTerm="",this.projectForm.patchValue({project_manager_id:""}),this.filteredManagers=[]}navigateToDetails(e){e.id&&this.router.navigate(["/administration/projects/details",e.id])}formatDate(e){return e?new Date(e).toISOString().split("T")[0]:""}showToast(e,i="primary"){return O(this,null,function*(){(yield this.toastCtrl.create({message:e,duration:2e3,color:i,position:"top"})).present()})}};l.\u0275fac=function(i){return new(i||l)(h($),h(vn),h(wn),h(Mn),h(z))},l.\u0275cmp=v({type:l,selectors:[["app-projects"]],standalone:!1,decls:30,vars:6,consts:[["color","primary",1,"gradient-header"],["slot","start"],["defaultHref","/administration"],["slot","end"],[1,"primary-outline-btn",3,"click"],["slot","start",3,"name"],[1,"ion-padding","page-containerOn"],["class","create-form-container",4,"ngIf"],[1,"table-block","mt-20"],[1,"table-header"],["size","2"],["size","4"],["size","3"],["size","1"],[1,"table-list-container"],["class","loading-state",4,"ngIf"],[4,"ngIf"],["class","empty-state",4,"ngIf"],[1,"create-form-container"],[1,"form-card"],[1,"form-txt",3,"ngSubmit","formGroup"],[1,"form-grid"],["lines","outline"],["position","floating"],["formControlName","project_code"],["formControlName","project_name"],["formControlName","client_name"],["type","date","formControlName","start_date"],["type","date","formControlName","end_date"],["formControlName","status","interface","popover"],["value","active"],["value","on_hold"],["value","completed"],["value","cancelled"],[1,"manager-search-group"],["placeholder","Search by name...",3,"ngModelChange","ionInput","ngModel","ngModelOptions"],["slot","end","fill","clear","color","medium",3,"click",4,"ngIf"],["class","search-results",4,"ngIf"],["lines","outline",1,"full-width"],["formControlName","description","rows","3"],[1,"actions","mt-20"],["expand","block","type","submit",1,"primary-btn",3,"disabled"],["slot","end","fill","clear","color","medium",3,"click"],["name","close-circle-outline"],[1,"search-results"],["button","",3,"click",4,"ngFor","ngForOf"],["button","",3,"click"],[1,"loading-state"],["name","crescent"],["class","table-list-row",4,"ngFor","ngForOf"],[1,"table-list-row"],["size","4",1,"proj-name-cell","clickable-name",3,"click"],[3,"color"],["fill","clear",3,"click"],["name","create-outline"],[1,"empty-state"],["name","folder-open-outline"]],template:function(i,c){i&1&&(t(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),m(3,"ion-back-button",2),n(),t(4,"ion-title"),r(5,"Project Management"),n(),t(6,"ion-buttons",3)(7,"ion-button",4),_("click",function(){return c.showCreateForm=!c.showCreateForm}),m(8,"ion-icon",5),r(9),n()()()(),t(10,"ion-content",6),b(11,Bn,54,10,"div",7),t(12,"div",8)(13,"div",9)(14,"ion-grid")(15,"ion-row")(16,"ion-col",10),r(17,"Code"),n(),t(18,"ion-col",11),r(19,"Project Name"),n(),t(20,"ion-col",12),r(21,"Client"),n(),t(22,"ion-col",10),r(23,"Status"),n(),t(24,"ion-col",13),r(25,"Edit"),n()()()(),t(26,"div",14),b(27,Tn,2,0,"div",15)(28,An,2,1,"ion-grid",16)(29,Vn,4,0,"div",17),n()()()),i&2&&(s(8),d("name",c.showCreateForm?"close-outline":"add-outline"),s(),x(" ",c.showCreateForm?"Cancel":"New Project"," "),s(2),d("ngIf",c.showCreateForm),s(16),d("ngIf",c.loadingProjects),s(),d("ngIf",!c.loadingProjects),s(),d("ngIf",!c.loadingProjects&&c.projects.length===0))},dependencies:[T,N,H,q,G,L,R,W,Q,Y,Z,nn,en,tn,on,rn,an,cn,ln,sn,dn,mn,gn,fn,pn,_n,un,bn,hn,xn,Cn,J,K,Pn,A],styles:[`

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
.create-form-container[_ngcontent-%COMP%] {
  margin-bottom: 32px;
}
.form-card[_ngcontent-%COMP%] {
  margin: 0;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  background: #ffffff;
  overflow: hidden;
}
.form-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  background: #0f2b4a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 24px 32px;
}
.form-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  color: #ffffff;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  letter-spacing: -0.05em;
}
.form-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 32px;
  background: #f4f7fb;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.form-grid[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --background: transparent;
  --border-color: transparent;
  margin-bottom: 0;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 8px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 12px 16px !important;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  --padding-top: 12px;
  --padding-bottom: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus, 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus, 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.manager-search-group[_ngcontent-%COMP%] {
  position: relative;
}
.manager-search-group[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%] {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  max-height: 300px;
  overflow-y: auto;
  margin-top: -1px;
}
.manager-search-group[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.manager-search-group[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2px;
}
.manager-search-group[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #475569;
  font-weight: 700;
}
.manager-search-group[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:hover {
  --background: #f1f5f9;
  color: #1F74BB;
}
.table-block[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-bottom: 2px solid #ABABAB;
  padding: 16px 20px;
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%] {
  padding: 0;
}
.table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #475569;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%] {
  max-height: calc(100vh - 400px);
  overflow-y: auto;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f8fafc;
  min-height: 64px;
  transition: all 0.2s ease;
  align-items: center;
  padding: 0 12px;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding: 12px 8px;
  display: flex;
  align-items: center;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 600;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   .proj-name-cell[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1F74BB;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   .proj-name-cell.clickable-name[_ngcontent-%COMP%] {
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}
.table-block[_ngcontent-%COMP%]   .table-list-container[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   .proj-name-cell.clickable-name[_ngcontent-%COMP%]:hover {
  opacity: 0.8;
  text-decoration: underline;
}
.loading-state[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 80px 40px;
  color: #94a3b8;
}
.loading-state[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: #1F74BB;
  height: 48px;
  width: 48px;
}
.loading-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;
}
.loading-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
}
.mt-20[_ngcontent-%COMP%] {
  margin-top: 24px;
}
@media (max-width: 768px) {
  .table-block[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
    display: none;
  }
  .table-block[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%] {
    flex-direction: column;
    padding: 24px 16px;
    align-items: flex-start;
  }
  .table-block[_ngcontent-%COMP%]   .table-list-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
    width: 100% !important;
    max-width: 100% !important;
    flex: none !important;
    padding: 6px 0;
  }
}
.form-txt[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], 
.form-txt[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {
  margin-top: 10px !important;
}`]});let a=l;return a})();var zn=[{path:"",component:jn}],Zn=(()=>{let l=class l{};l.\u0275fac=function(i){return new(i||l)},l.\u0275mod=j({type:l}),l.\u0275inj=w({imports:[V,U,X,On,D.forChild(zn)]});let a=l;return a})();export{Zn as ProjectsPageModule};
