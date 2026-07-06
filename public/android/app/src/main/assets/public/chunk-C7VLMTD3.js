import{a as un}from"./chunk-C76DRQJT.js";import"./chunk-NDCRD3QG.js";import{A as L,B as j,Fa as bn,G as H,Ga as hn,H as D,I as q,J as G,K as X,L as J,N as K,Q,R as Y,V as Z,W as $,X as nn,Y as en,Z as tn,_ as on,d as W,g as V,ha as rn,ia as an,ja as ln,ka as cn,la as sn,ma as dn,na as mn,ra as gn,ta as fn,u as N,va as pn}from"./chunk-B3PLR2IL.js";import{$a as E,Ba as P,Ca as h,Da as g,Eb as R,F as S,K as p,L as b,Oa as i,Pa as O,Qa as y,Ta as u,Ua as _,Va as x,Vb as F,Zb as z,_ as s,ab as B,ca as M,ea as k,fa as I,ja as C,qb as U,ra as m,rb as T,sa as n,ta as e,ua as w,xb as A}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as v}from"./chunk-JHI3MBHO.js";function Cn(l,c){if(l&1){let r=P();n(0,"div",19)(1,"ion-card",20)(2,"ion-card-header")(3,"ion-card-title"),i(4,"Create New User Login"),e()(),n(5,"ion-card-content")(6,"div",21)(7,"ion-item",22)(8,"ion-label",23),i(9,"Email Address"),e(),n(10,"ion-input",24),x("ngModelChange",function(t){p(r);let o=g();return _(o.newUser.email,t)||(o.newUser.email=t),b(t)}),e()(),n(11,"ion-item",22)(12,"ion-label",23),i(13,"Temporary Password"),e(),n(14,"ion-input",25),x("ngModelChange",function(t){p(r);let o=g();return _(o.newUser.password,t)||(o.newUser.password=t),b(t)}),e()(),n(15,"ion-item",22)(16,"ion-label"),i(17,"Target Role"),e(),n(18,"ion-select",26),x("ngModelChange",function(t){p(r);let o=g();return _(o.newUser.role,t)||(o.newUser.role=t),b(t)}),n(19,"ion-select-option",16),i(20,"Employee"),e(),n(21,"ion-select-option",15),i(22,"Manager"),e(),n(23,"ion-select-option",14),i(24,"HR"),e(),n(25,"ion-select-option",13),i(26,"Financial Admin"),e(),n(27,"ion-select-option",12),i(28,"Admin"),e()()()(),n(29,"ion-button",27),h("click",function(){p(r);let t=g();return b(t.createUser())}),i(30," Create Access "),e()()()()}if(l&2){let r=g();s(10),u("ngModel",r.newUser.email),s(4),u("ngModel",r.newUser.password),s(4),u("ngModel",r.newUser.role)}}function wn(l,c){l&1&&(n(0,"div",28),w(1,"ion-spinner",29),e())}function Mn(l,c){if(l&1){let r=P();n(0,"ion-row",38)(1,"ion-col",32)(2,"div",39)(3,"strong"),i(4),e(),n(5,"small"),i(6),e()()(),n(7,"ion-col",33),i(8),e(),n(9,"ion-col",40)(10,"ion-badge",41),i(11),E(12,"uppercase"),e()(),n(13,"ion-col",33)(14,"ion-select",42),h("ionChange",function(t){let o=p(r).$implicit,d=g(2);return b(d.changeRole(t,o.id))}),n(15,"ion-select-option",16),i(16,"Make Employee"),e(),n(17,"ion-select-option",15),i(18,"Make Manager"),e(),n(19,"ion-select-option",14),i(20,"Make HR"),e(),n(21,"ion-select-option",13),i(22,"Make Financial Admin"),e(),n(23,"ion-select-option",12),i(24,"Make Admin"),e()()()()}if(l&2){let r=c.$implicit;s(4),O(r.full_name||"N/A"),s(2),y("ID: ",r.EmployeeNumber||"N/A"),s(2),O(r.username),s(2),m("color",r.role==="admin"?"danger":r.role==="finance"?"warning":r.role==="hr"?"tertiary":r.role==="manager"?"success":"primary"),s(),y(" ",B(12,6,r.role==="finance"?"Financial Admin":r.role)," "),s(3),m("value",r.role)}}function yn(l,c){l&1&&(n(0,"div",43),w(1,"ion-icon",44),n(2,"p"),i(3,"No users found matching your criteria"),e()())}function Pn(l,c){if(l&1&&(n(0,"div",30)(1,"div",31)(2,"ion-grid")(3,"ion-row")(4,"ion-col",32),i(5,"Full Name"),e(),n(6,"ion-col",33),i(7,"Username/Email"),e(),n(8,"ion-col",34),i(9,"Current Role"),e(),n(10,"ion-col",33),i(11,"Actions"),e()()()(),n(12,"div",35)(13,"ion-grid"),C(14,Mn,25,8,"ion-row",36),e()(),C(15,yn,4,0,"div",37),e()),l&2){let r=g();s(14),m("ngForOf",r.filteredUsers),s(),m("ngIf",r.filteredUsers.length===0)}}var _n=(()=>{let c=class c{constructor(a,t,o){this.adminService=a,this.toastCtrl=t,this.router=o,this.users=[],this.filteredUsers=[],this.loading=!1,this.showCreateUser=!1,this.searchText="",this.selectedRole="all",this.newUser={email:"",password:"",role:"employee"}}ngOnInit(){this.loadUsers()}loadUsers(){this.loading=!0,this.adminService.getUsers().subscribe({next:a=>{this.users=Array.isArray(a?.users)?a.users:[],this.applyFilter(),this.loading=!1},error:()=>{this.loading=!1,this.showToast("Failed to load users","danger")}})}applyFilter(){this.filteredUsers=this.users.filter(a=>{let t=(a.full_name||"").toLowerCase().includes(this.searchText.toLowerCase())||(a.username||"").toLowerCase().includes(this.searchText.toLowerCase())||(a.EmployeeNumber||"").toString().includes(this.searchText),o=this.selectedRole==="all"||a.role===this.selectedRole;return t&&o})}changeRole(a,t){let o=a.detail.value,d;switch(o){case"admin":d=this.adminService.makeAdmin(t);break;case"finance":d=this.adminService.makeFinance(t);break;case"manager":d=this.adminService.makeManager(t);break;case"hr":d=this.adminService.makeHR(t);break;case"employee":d=this.adminService.makeEmployee(t);break}d&&d.subscribe({next:()=>{this.showToast(`User role updated to ${o}`,"success"),this.loadUsers()},error:()=>this.showToast("Failed to update role","danger")})}createUser(){if(!this.newUser.email||!this.newUser.password){this.showToast("Email and Password are required","warning");return}this.adminService.createUser(this.newUser).subscribe({next:()=>{this.showToast("User created successfully","success"),this.resetCreateUserForm(),this.showCreateUser=!1,this.loadUsers()},error:()=>this.showToast("Failed to create user","danger")})}resetCreateUserForm(){this.newUser={email:"",password:"",role:"employee"}}showToast(a,t="primary"){return v(this,null,function*(){(yield this.toastCtrl.create({message:a,duration:2e3,color:t,position:"top"})).present()})}};c.\u0275fac=function(t){return new(t||c)(M(un),M(bn),M(F))},c.\u0275cmp=k({type:c,selectors:[["app-roles"]],standalone:!1,decls:30,vars:7,consts:[["color","primary",1,"gradient-header"],["slot","start"],["defaultHref","/administration"],["slot","end"],[1,"primary-outline-btn",3,"click"],["slot","start",3,"name"],["placeholder","Search by name, ID or username...","animated","true",3,"ngModelChange","ionInput","ngModel"],[1,"ion-padding","page-containerOn"],["class","create-user-container",4,"ngIf"],[1,"role-filter"],[3,"ngModelChange","ionChange","ngModel"],["value","all"],["value","admin"],["value","finance"],["value","hr"],["value","manager"],["value","employee"],["class","loading-overlay",4,"ngIf"],["class","table-block mt-20",4,"ngIf"],[1,"create-user-container"],[1,"form-card"],[1,"form-grid"],["lines","outline"],["position","floating"],["type","email",3,"ngModelChange","ngModel"],["type","password",3,"ngModelChange","ngModel"],["interface","popover",3,"ngModelChange","ngModel"],["expand","block",1,"primary-btn","mt-20",3,"click"],[1,"loading-overlay"],["name","crescent"],[1,"table-block","mt-20"],[1,"table-header"],["size","4"],["size","3"],["size","2"],[1,"table-list-container"],["class","table-list-row",4,"ngFor","ngForOf"],["class","empty-state",4,"ngIf"],[1,"table-list-row"],[1,"user-cell"],["size","2",1,"role-col"],[3,"color"],["interface","popover","placeholder","Change Role",1,"role-select",3,"ionChange","value"],[1,"empty-state"],["name","person-outline"]],template:function(t,o){t&1&&(n(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),w(3,"ion-back-button",2),e(),n(4,"ion-title"),i(5,"Roles & Access Management"),e(),n(6,"ion-buttons",3)(7,"ion-button",4),h("click",function(){return o.showCreateUser=!o.showCreateUser}),w(8,"ion-icon",5),i(9),e()()(),n(10,"ion-toolbar")(11,"ion-searchbar",6),x("ngModelChange",function(f){return _(o.searchText,f)||(o.searchText=f),f}),h("ionInput",function(){return o.applyFilter()}),e()()(),n(12,"ion-content",7),C(13,Cn,31,3,"div",8),n(14,"div",9)(15,"ion-segment",10),x("ngModelChange",function(f){return _(o.selectedRole,f)||(o.selectedRole=f),f}),h("ionChange",function(){return o.applyFilter()}),n(16,"ion-segment-button",11),i(17,"All"),e(),n(18,"ion-segment-button",12),i(19,"Admins"),e(),n(20,"ion-segment-button",13),i(21,"Finance"),e(),n(22,"ion-segment-button",14),i(23,"HR"),e(),n(24,"ion-segment-button",15),i(25,"Managers"),e(),n(26,"ion-segment-button",16),i(27,"Employees"),e()()(),C(28,wn,2,0,"div",17)(29,Pn,16,2,"div",18),e()),t&2&&(s(8),m("name",o.showCreateUser?"close-outline":"person-add-outline"),s(),y(" ",o.showCreateUser?"Cancel":"Create Login"," "),s(2),u("ngModel",o.searchText),s(2),m("ngIf",o.showCreateUser),s(2),u("ngModel",o.selectedRole),s(13),m("ngIf",o.loading),s(),m("ngIf",!o.loading))},dependencies:[U,T,W,V,H,D,q,G,X,J,K,Q,Y,Z,$,nn,en,tn,on,rn,an,ln,cn,sn,dn,mn,gn,fn,L,j,pn,A],styles:[`

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
.create-user-container[_ngcontent-%COMP%] {
  margin-bottom: 32px;
}
.role-filter[_ngcontent-%COMP%] {
  margin: 16px 0 24px 0;
}
.role-filter[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {
  background: #ffffff;
  --background: #f8fafc;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}
.role-filter[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --background-checked: #0f2b4a;
  --color-checked: #ffffff;
  --indicator-color: transparent;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-height: 40px;
  transition: all 0.2s ease;
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
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
.table-block[_ngcontent-%COMP%]   .role-col[_ngcontent-%COMP%] {
  justify-content: center;
}
.user-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.user-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
}
.user-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 11px;
  font-weight: 500;
}
.role-select[_ngcontent-%COMP%] {
  width: 100%;
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.role-select[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.loading-overlay[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  padding: 60px;
}
.loading-overlay[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: #1F74BB;
  width: 48px;
  height: 48px;
}
.empty-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 80px 40px;
  color: #94a3b8;
}
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;
}
.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
  color: #475569;
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
}`]});let l=c;return l})();var On=[{path:"",component:_n}],Wn=(()=>{let c=class c{};c.\u0275fac=function(t){return new(t||c)},c.\u0275mod=I({type:c}),c.\u0275inj=S({imports:[R,N,hn,z.forChild(On)]});let l=c;return l})();export{Wn as RolesPageModule};
