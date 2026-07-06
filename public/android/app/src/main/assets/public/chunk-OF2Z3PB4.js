import{a as ue}from"./chunk-6KXWZ6DT.js";import{a as y}from"./chunk-NDCRD3QG.js";import{B as $,Fa as ge,G as H,Ga as _e,H as W,I as J,J as X,K as Y,L as K,N as Q,O as Z,Q as ee,R as ne,V as te,W as ie,X as oe,Y as re,Z as ae,_ as le,c as C,d as N,e as A,h as z,ha as ce,j as V,m as U,na as se,qa as de,ra as pe,t as q,ta as me,u as j,v as R,va as fe,y as G,z as D}from"./chunk-B3PLR2IL.js";import{Ba as x,Ca as f,Da as m,Eb as E,F as M,K as g,Ka as F,L as _,Oa as l,Pa as v,Qa as h,Vb as L,Z as T,Zb as B,_ as c,ca as b,ea as I,fa as O,ja as u,qb as S,ra as s,rb as k,sa as i,ta as t,ua as d}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as P}from"./chunk-JHI3MBHO.js";function ve(o,a){o&1&&(i(0,"ion-item",13)(1,"ion-label",14),l(2,"Max CF Days"),t(),d(3,"ion-input",40),t())}function he(o,a){o&1&&(i(0,"div",41),d(1,"ion-icon",42),i(2,"p"),l(3,"Click to choose icon image (SVG, PNG, JPG)"),t()())}function ye(o,a){if(o&1&&(i(0,"div",43),d(1,"ion-icon",44),i(2,"p"),l(3),t()()),o&2){let r=m(2);c(3),v(r.selectedFileName)}}function Ce(o,a){if(o&1&&(i(0,"div",45),d(1,"img",46),i(2,"p"),l(3,"Click to change current icon"),t()()),o&2){let r=m(2);c(),s("src",r.env+r.currentIconUrl,T)}}function we(o,a){if(o&1){let r=x();i(0,"div",47)(1,"ion-button",48),f("click",function(n){g(r);let p=m(2);return _(p.clearSelectedFile(n))}),d(2,"ion-icon",49),l(3," Remove Icon "),t()()}}function Pe(o,a){if(o&1){let r=x();i(0,"ion-card",10)(1,"ion-card-header")(2,"ion-card-title"),l(3),t()(),i(4,"ion-card-content")(5,"form",11),f("ngSubmit",function(){g(r);let n=m();return _(n.submit())}),i(6,"div",12)(7,"ion-item",13)(8,"ion-label",14),l(9,"Type Name"),t(),d(10,"ion-input",15),t(),i(11,"ion-item",13)(12,"ion-label",14),l(13,"Type Code"),t(),d(14,"ion-input",16),t(),i(15,"ion-item",17)(16,"ion-label"),l(17,"Is Paid Leave"),t(),d(18,"ion-checkbox",18),t(),i(19,"ion-item",17)(20,"ion-label"),l(21,"Requires Approval"),t(),d(22,"ion-checkbox",19),t(),i(23,"ion-item",17)(24,"ion-label"),l(25,"Can Carry Forward"),t(),d(26,"ion-checkbox",20),t(),u(27,ve,4,0,"ion-item",21),i(28,"div",22)(29,"ion-item",23)(30,"ion-label",14),l(31,"Background Color"),t(),d(32,"ion-input",24),t(),i(33,"div",25)(34,"input",26),f("input",function(n){g(r);let p=m();return _(p.onColorChange(n))}),t()()(),i(35,"div",27)(36,"ion-label",28),l(37,"Leave Type Icon"),t(),i(38,"div",29),f("click",function(){g(r);let n=F(43);return _(n.click())}),u(39,he,4,0,"div",30)(40,ye,4,1,"div",31)(41,Ce,4,1,"div",32),i(42,"input",33,0),f("change",function(n){g(r);let p=m();return _(p.onFileSelected(n))}),t()(),u(44,we,4,0,"div",34),t(),i(45,"ion-item",35)(46,"ion-label",14),l(47,"Description"),t(),d(48,"ion-textarea",36),t()(),i(49,"div",37)(50,"ion-button",38),l(51),t(),i(52,"ion-button",39),f("click",function(){g(r);let n=m();return _(n.cancelCreate())}),l(53,"Cancel"),t()()()()()}if(o&2){let r,e,n=m();c(3),h("",n.isEditMode?"Edit":"Add"," Leave Type"),c(2),s("formGroup",n.leaveTypeForm),c(22),s("ngIf",(r=n.leaveTypeForm.get("can_carry_forward"))==null?null:r.value),c(7),s("value",(e=n.leaveTypeForm.get("bg_color"))==null?null:e.value),c(5),s("ngIf",!n.selectedFileName&&!n.currentIconUrl),c(),s("ngIf",n.selectedFileName),c(),s("ngIf",n.currentIconUrl&&!n.selectedFileName),c(3),s("ngIf",n.selectedFileName||n.currentIconUrl),c(6),s("disabled",n.loading),c(),h(" ",n.loading?"Please Wait...":n.isEditMode?"Update":"Save"," ")}}function Me(o,a){o&1&&(i(0,"div",58),d(1,"ion-spinner",59),t())}function Te(o,a){if(o&1){let r=x();i(0,"ion-row",61)(1,"ion-col",52)(2,"b"),l(3),t()(),i(4,"ion-col",53),l(5),t(),i(6,"ion-col",54)(7,"ion-badge",62),l(8),t()(),i(9,"ion-col",52)(10,"ion-button",63),f("click",function(){let n=g(r).$implicit,p=m(3);return _(p.editLeaveType(n))}),d(11,"ion-icon",64),t()()()}if(o&2){let r=a.$implicit;c(3),v(r.type_code),c(2),v(r.type_name),c(2),s("color",r.is_paid?"success":"medium"),c(),h(" ",r.is_paid?"Yes":"No"," ")}}function Ie(o,a){o&1&&(i(0,"div",58),l(1," No records found. "),t())}function Oe(o,a){if(o&1&&(i(0,"ion-grid"),u(1,Te,12,4,"ion-row",60)(2,Ie,2,0,"div",56),t()),o&2){let r=m(2);c(),s("ngForOf",r.leaveTypes),c(),s("ngIf",r.leaveTypes.length===0)}}function Fe(o,a){if(o&1&&(i(0,"div",50)(1,"div",51)(2,"ion-grid")(3,"ion-row")(4,"ion-col",52),l(5,"Code"),t(),i(6,"ion-col",53),l(7,"Name"),t(),i(8,"ion-col",54),l(9,"Is Paid"),t(),i(10,"ion-col",52),l(11,"Actions"),t()()()(),i(12,"div",55),u(13,Me,2,0,"div",56)(14,Oe,3,2,"ion-grid",57),t()()),o&2){let r=m();c(13),s("ngIf",r.listLoading),c(),s("ngIf",!r.listLoading)}}var be=(()=>{let a=class a{constructor(e,n,p,w){this.fb=e,this.leaveTypesService=n,this.toastCtrl=p,this.router=w,this.leaveTypes=[],this.loading=!1,this.listLoading=!1,this.showCreateForm=!1,this.isEditMode=!1,this.selectedLeaveTypeId=null,this.env=y.apiURL.startsWith("http")?y.apiURL:`http://${y.apiURL}`,this.selectedFile=null,this.selectedFileName="",this.currentIconUrl="",this.removeIconFlag=!1}ngOnInit(){this.initForm(),this.loadLeaveTypes()}initForm(){this.leaveTypeForm=this.fb.group({type_name:["",C.required],type_code:["",C.required],is_paid:[!0],requires_approval:[!0],can_carry_forward:[!1],max_carry_forward_days:[0],description:[""],bg_color:["#1976d2"]})}loadLeaveTypes(){this.listLoading=!0,this.leaveTypesService.getLeaveTypes().subscribe({next:e=>{this.leaveTypes=e||[],this.listLoading=!1},error:()=>this.listLoading=!1})}openCreateForm(){this.isEditMode=!1,this.selectedLeaveTypeId=null,this.selectedFile=null,this.selectedFileName="",this.currentIconUrl="",this.removeIconFlag=!1,this.leaveTypeForm.reset({is_paid:!0,requires_approval:!0,can_carry_forward:!1,max_carry_forward_days:0,bg_color:"#1976d2"}),this.showCreateForm=!0}editLeaveType(e){this.isEditMode=!0,this.selectedLeaveTypeId=e.id,this.selectedFile=null,this.selectedFileName="",this.currentIconUrl=e.icon_path||"",this.removeIconFlag=!1,this.leaveTypeForm.patchValue({type_name:e.type_name,type_code:e.type_code,is_paid:e.is_paid===1||e.is_paid===!0,requires_approval:e.requires_approval===1||e.requires_approval===!0,can_carry_forward:e.can_carry_forward===1||e.can_carry_forward===!0,max_carry_forward_days:e.max_carry_forward_days,description:e.description,bg_color:e.bg_color||"#1976d2"}),this.showCreateForm=!0}onFileSelected(e){let n=e.target.files[0];n&&(this.selectedFile=n,this.selectedFileName=n.name,this.removeIconFlag=!1)}clearSelectedFile(e){e.stopPropagation(),this.selectedFile=null,this.selectedFileName="",this.currentIconUrl="",this.removeIconFlag=!0}onColorChange(e){this.leaveTypeForm.patchValue({bg_color:e.target.value})}submit(){if(this.leaveTypeForm.invalid)return;this.loading=!0;let e=new FormData;e.append("type_name",this.leaveTypeForm.get("type_name")?.value||""),e.append("type_code",this.leaveTypeForm.get("type_code")?.value||""),e.append("is_paid",this.leaveTypeForm.get("is_paid")?.value?"1":"0"),e.append("requires_approval",this.leaveTypeForm.get("requires_approval")?.value?"1":"0"),e.append("can_carry_forward",this.leaveTypeForm.get("can_carry_forward")?.value?"1":"0"),e.append("max_carry_forward_days",String(this.leaveTypeForm.get("max_carry_forward_days")?.value||0)),e.append("description",this.leaveTypeForm.get("description")?.value||""),e.append("bg_color",this.leaveTypeForm.get("bg_color")?.value||""),this.selectedFile&&e.append("icon",this.selectedFile),this.removeIconFlag&&e.append("remove_icon","true"),(this.isEditMode?this.leaveTypesService.updateLeaveType(this.selectedLeaveTypeId,e):this.leaveTypesService.createLeaveType(e)).subscribe({next:()=>{this.showToast(`Leave type ${this.isEditMode?"updated":"created"} successfully`,"success"),this.loading=!1,this.showCreateForm=!1,this.loadLeaveTypes()},error:()=>{this.loading=!1,this.showToast("Operation failed","danger")}})}showToast(e,n){return P(this,null,function*(){(yield this.toastCtrl.create({message:e,duration:2e3,color:n,position:"top"})).present()})}cancelCreate(){this.showCreateForm=!1,this.isEditMode=!1}};a.\u0275fac=function(n){return new(n||a)(b(q),b(ue),b(ge),b(L))},a.\u0275cmp=I({type:a,selectors:[["app-leave-types"]],standalone:!1,decls:12,vars:3,consts:[["fileInput",""],["color","primary",1,"gradient-header"],["slot","start"],["defaultHref","/administration"],["slot","end"],[3,"click","disabled"],["name","add-outline","slot","icon-only"],[1,"ion-padding","page-containerOn"],["class","form-card",4,"ngIf"],["class","table-block",4,"ngIf"],[1,"form-card"],[3,"ngSubmit","formGroup"],[1,"form-grid"],["lines","outline"],["position","floating"],["formControlName","type_name"],["formControlName","type_code"],["lines","none"],["slot","start","formControlName","is_paid"],["slot","start","formControlName","requires_approval"],["slot","start","formControlName","can_carry_forward"],["lines","outline",4,"ngIf"],[1,"color-picker-item"],["lines","outline",2,"flex","1"],["formControlName","bg_color","placeholder","#1976d2"],[1,"color-preview-box"],["type","color",1,"native-color-picker",3,"input","value"],[1,"file-upload-item","full-width"],[1,"upload-title"],[1,"upload-zone",3,"click"],["class","upload-placeholder",4,"ngIf"],["class","upload-selected",4,"ngIf"],["class","upload-preview",4,"ngIf"],["type","file","accept","image/*",2,"display","none",3,"change"],["class","remove-btn-container",4,"ngIf"],["lines","outline",1,"full-width"],["formControlName","description"],[1,"actions","mt-20"],["expand","block","type","submit",3,"disabled"],["expand","block","fill","clear","color","medium",3,"click"],["type","number","formControlName","max_carry_forward_days"],[1,"upload-placeholder"],["name","cloud-upload-outline"],[1,"upload-selected"],["name","document-attach-outline","color","success"],[1,"upload-preview"],["alt","current icon",1,"icon-img-preview",3,"src"],[1,"remove-btn-container"],["size","small","fill","clear","color","danger",3,"click"],["name","trash-outline","slot","start"],[1,"table-block"],[1,"table-header"],["size","3"],["size","4"],["size","2"],[1,"table-list-container"],["class","ion-text-center ion-padding",4,"ngIf"],[4,"ngIf"],[1,"ion-text-center","ion-padding"],["name","crescent"],["class","table-list-row",4,"ngFor","ngForOf"],[1,"table-list-row"],[3,"color"],["fill","clear",3,"click"],["name","create-outline"]],template:function(n,p){n&1&&(i(0,"ion-header")(1,"ion-toolbar",1)(2,"ion-buttons",2),d(3,"ion-back-button",3),t(),i(4,"ion-title"),l(5,"Manage Leave Types"),t(),i(6,"ion-buttons",4)(7,"ion-button",5),f("click",function(){return p.openCreateForm()}),d(8,"ion-icon",6),t()()()(),i(9,"ion-content",7),u(10,Pe,54,10,"ion-card",8)(11,Fe,15,2,"div",9),t()),n&2&&(c(7),s("disabled",p.showCreateForm),c(3),s("ngIf",p.showCreateForm),c(),s("ngIf",!p.showCreateForm))},dependencies:[S,k,z,N,A,V,U,H,W,J,X,Y,K,Q,Z,ee,ne,te,ie,oe,re,ae,le,ce,se,de,pe,me,G,D,$,fe],styles:[`

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
.gradient-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.gradient-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  letter-spacing: -0.05em;
}
.gradient-header[_ngcontent-%COMP%]   ion-back-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.table-block[_ngcontent-%COMP%] {
  margin-top: 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #ABABAB;
}
.table-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 16px 20px;
  border-bottom: 2px solid #ABABAB;
}
.table-header[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1px;
}
.table-list-container[_ngcontent-%COMP%] {
  max-height: 500px;
  overflow-y: auto;
}
.table-list-row[_ngcontent-%COMP%] {
  padding: 16px 20px;
  border-bottom: 1px solid #f8fafc;
  align-items: center;
  transition: all 0.2s ease;
  background: #ffffff;
}
.table-list-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}
.table-list-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.table-list-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --background: transparent;
  --border-color: transparent;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 20px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 12px 16px !important;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus, 
.form-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.full-width[_ngcontent-%COMP%] {
  grid-column: span 2;
}
.actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}
@media (max-width: 768px) {
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .full-width[_ngcontent-%COMP%] {
    grid-column: span 1;
  }
  .table-header[_ngcontent-%COMP%] {
    display: none;
  }
  .table-list-row[_ngcontent-%COMP%] {
    flex-direction: column;
    padding: 24px 16px;
    align-items: flex-start;
  }
  .table-list-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
    width: 100%;
    padding: 6px 0;
  }
}
.full-width[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {
  border: 1px solid #ABABAB;
  border-radius: 8px;
}
.color-picker-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.color-picker-item[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  margin-top: 0 !important;
  flex: 1;
}
.color-picker-item[_ngcontent-%COMP%]   .color-preview-box[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #ABABAB;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  margin-top: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.color-picker-item[_ngcontent-%COMP%]   .color-preview-box[_ngcontent-%COMP%]   .native-color-picker[_ngcontent-%COMP%] {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 68px;
  height: 68px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.file-upload-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}
.file-upload-item[_ngcontent-%COMP%]   .upload-title[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #475569;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.file-upload-item[_ngcontent-%COMP%]   .upload-zone[_ngcontent-%COMP%] {
  border: 2px dashed #ABABAB;
  border-radius: 8px;
  background: #f8fafc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.file-upload-item[_ngcontent-%COMP%]   .upload-zone[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: rgba(var(--ion-color-primary-rgb, 25, 118, 210), 0.05);
}
.file-upload-item[_ngcontent-%COMP%]   .upload-zone[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 28px;
  color: #475569;
  margin-bottom: 6px;
}
.file-upload-item[_ngcontent-%COMP%]   .upload-zone[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  color: #1e293b;
  font-weight: 600;
}
.file-upload-item[_ngcontent-%COMP%]   .upload-zone[_ngcontent-%COMP%]   .icon-img-preview[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 6px;
  border-radius: 4px;
}
.file-upload-item[_ngcontent-%COMP%]   .remove-btn-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
}`]});let o=a;return o})();var Se=[{path:"",component:be}],$e=(()=>{let a=class a{};a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=O({type:a}),a.\u0275inj=M({imports:[E,j,R,_e,B.forChild(Se)]});let o=a;return o})();export{$e as LeaveTypesPageModule};
