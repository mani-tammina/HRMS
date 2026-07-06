import{a as On}from"./chunk-VD3H5WUS.js";import{a as yn}from"./chunk-7NMYRTZJ.js";import{a as je}from"./chunk-JSLZV2FC.js";import{a as xe}from"./chunk-HHMVNW2S.js";import{a as Mn}from"./chunk-DA4OVRGX.js";import{a as Pn}from"./chunk-6KXWZ6DT.js";import{a as Cn}from"./chunk-2GEN2AVW.js";import{a as Re}from"./chunk-GKMRXCVX.js";import{a as xn}from"./chunk-C76DRQJT.js";import{a as N}from"./chunk-NDCRD3QG.js";import{$ as un,A as le,Aa as ze,B as K,Da as ie,F as ce,Fa as j,G as Le,Ga as q,H as z,I as Q,J as de,K as pe,L as ge,N as me,P as mn,Q as fe,R as X,S as fn,V as _n,W as Z,X as R,Y as Ie,Z as _e,_ as ee,c as Oe,d as se,e as sn,fa as ue,g as Se,ga as he,h as ln,ha as ve,ia as be,j as cn,ja as De,ka as Ee,la as Fe,m as dn,ma as Ae,na as ne,qa as Be,ra as te,sa as hn,t as pn,ta as oe,u as J,v as Te,va as Ce,y as gn,ya as vn,za as bn}from"./chunk-B3PLR2IL.js";import{$a as w,Ba as T,Ca as f,Da as m,Eb as B,F as Ke,K as b,Ka as re,L as C,La as nn,M as Qe,Ma as ke,N as Xe,Oa as s,Pa as h,Qa as O,Ra as L,Sa as tn,Ta as $,Ua as W,Va as H,Vb as an,Z as V,Zb as rn,_ as l,ab as Y,bb as I,ca as v,d as Je,ea as E,eb as He,fa as Ze,ja as u,ka as en,pb as U,qb as F,ra as g,rb as A,sa as o,ta as i,ua as _,wb as on,yb as G}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as Ue,b as Ge,e as P}from"./chunk-JHI3MBHO.js";function Dn(r,c){if(r&1&&(o(0,"ion-chip",25)(1,"ion-label"),s(2),i()()),r&2){let a=m();l(2),O("",a.filteredTimesheets.length," Pending Request(s)")}}function En(r,c){r&1&&(o(0,"div",26),_(1,"ion-spinner"),o(2,"p"),s(3,"Loading pending timesheets..."),i()())}function Fn(r,c){if(r&1&&(o(0,"div",44)(1,"label"),s(2,"Project:"),i(),o(3,"p"),s(4),i()()),r&2){let a=m().$implicit;l(4),L("",a.project_name," (",a.project_code,")")}}function An(r,c){if(r&1&&(o(0,"div",45)(1,"label"),s(2,"Client:"),i(),o(3,"p"),s(4),i()()),r&2){let a=m().$implicit;l(4),h(a.client_name)}}function Bn(r,c){if(r&1){let a=T();o(0,"ion-card",29)(1,"ion-card-header")(2,"div",30)(3,"div",11)(4,"ion-avatar",31),_(5,"img",32),i(),o(6,"div",33)(7,"ion-card-title"),s(8),i(),o(9,"p"),s(10),i()()(),o(11,"div")(12,"ion-chip",34),_(13,"ion-icon",35),o(14,"ion-label"),s(15),w(16,"titlecase"),i()()()()(),o(17,"ion-card-content")(18,"div",36)(19,"div")(20,"label"),s(21,"Work Log Date:"),i(),o(22,"p"),s(23),i()(),o(24,"div")(25,"label"),s(26,"Submitted On:"),i(),o(27,"p"),s(28),i()(),o(29,"div")(30,"label"),s(31,"Total Hours:"),i(),o(32,"p"),s(33),i()()(),o(34,"div",11),u(35,Fn,5,2,"div",37)(36,An,5,1,"div",38),i(),o(37,"div",39)(38,"ion-button",40),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.downloadTimesheet(n))}),_(39,"ion-icon",41),i(),o(40,"ion-button",42),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.rejectTimesheet(n))}),s(41," Reject "),i(),o(42,"ion-button",43),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.approveTimesheet(n))}),s(43," Approve "),i()()()()}if(r&2){let a=c.$implicit,e=m(2);l(5),g("src",e.getProfileImage(a),V),l(3),L("",a.FirstName," ",a.LastName),l(2),h(a.WorkEmail),l(2),g("color",a.timesheet_type==="project"?"primary":"secondary"),l(),g("name",e.getTimesheetTypeIcon(a.timesheet_type)),l(2),h(Y(16,15,a.timesheet_type)),l(8),h(e.formatDate(a.date)),l(5),h(e.formatDate(a.submission_date)),l(5),O("",a.total_hours,"h"),l(2),g("ngIf",a.project_name),l(),g("ngIf",a.client_name),l(2),g("disabled",e.loading),l(2),g("disabled",e.loading),l(2),g("disabled",e.loading)}}function zn(r,c){if(r&1&&(o(0,"div",27),u(1,Bn,44,17,"ion-card",28),i()),r&2){let a=m();l(),g("ngForOf",a.filteredTimesheets)}}function Rn(r,c){r&1&&(o(0,"ion-row",46)(1,"ion-col",47),_(2,"ion-icon",48),o(3,"p",49),s(4,"No Pending Timesheets."),i()()())}var kn=(()=>{let c=class c{constructor(e,n,t,d){this.timesheetService=e,this.alertController=n,this.toastController=t,this.modalCtrl=d,this.pendingTimesheets=[],this.filteredTimesheets=[],this.loading=!1,this.searchText="",this.teamSize=0,this.submittedCount=0,this.notSubmittedCount=0,this.pendingApprovalsCount=0,this.statisticsLoading=!1,this.currentDate="",this.filterType="all",this.startDate="",this.endDate=""}ngOnInit(){this.currentDate=new Date().toISOString().split("T")[0],this.loadPendingTimesheets(),this.loadTeamStatistics()}loadTeamStatistics(){this.statisticsLoading=!0;let e={};this.startDate&&(e.start_date=this.startDate),this.endDate&&(e.end_date=this.endDate),this.timesheetService.getManagerTeamStatistics(e).subscribe({next:n=>{this.teamSize=n.team_size||0,this.submittedCount=n.submitted_count||0,this.notSubmittedCount=n.not_submitted_count||0,this.pendingApprovalsCount=n.pending_approvals||0,this.statisticsLoading=!1},error:()=>{this.showToast("Error loading team statistics","danger"),this.statisticsLoading=!1}})}loadPendingTimesheets(){this.loading=!0;let e={};this.startDate&&(e.start_date=this.startDate),this.endDate&&(e.end_date=this.endDate),this.filterType!=="all"&&(e.timesheet_type=this.filterType),this.timesheetService.getManagerPendingTimesheets(e).subscribe({next:n=>{this.pendingTimesheets=n||[],this.filteredTimesheets=[...this.pendingTimesheets],this.loading=!1},error:()=>{this.loading=!1}})}approveTimesheet(e){return P(this,null,function*(){(yield this.showConfirmDialog("Approve Timesheet",`Approve timesheet for ${e.FirstName} ${e.LastName}?`))&&(this.loading=!0,this.timesheetService.approveTimesheet(e.id).subscribe({next:()=>{this.showToast("Timesheet approved successfully","success"),this.loadPendingTimesheets()},error:t=>{this.showToast(t.error?.error||"Error approving timesheet","danger"),this.loading=!1}}))})}rejectTimesheet(e){return P(this,null,function*(){let n=yield this.showReasonDialog("Reject Timesheet",`Reject timesheet for ${e.FirstName} ${e.LastName}?`);n&&(this.loading=!0,this.timesheetService.rejectTimesheet(e.id,n).subscribe({next:()=>{this.showToast("Timesheet rejected","success"),this.loadPendingTimesheets()},error:t=>{this.showToast(t.error?.error||"Error rejecting timesheet","danger"),this.loading=!1}}))})}onFilterTypeChange(e){this.filterType=e.detail.value,this.loadPendingTimesheets()}onDateRangeChange(){this.startDate&&this.endDate&&(this.loadPendingTimesheets(),this.loadTeamStatistics())}clearFilters(){this.filterType="all",this.startDate="",this.endDate="",this.searchText="",this.loadPendingTimesheets(),this.loadTeamStatistics()}filterTimesheets(){let e=this.searchText.toLowerCase();this.filteredTimesheets=this.pendingTimesheets.filter(n=>n.FirstName?.toLowerCase().includes(e)||n.LastName?.toLowerCase().includes(e)||n.WorkEmail?.toLowerCase().includes(e)||n.project_name?.toLowerCase().includes(e))}downloadTimesheet(e){if(!e||!e.hours_breakdown?.length){this.showToast("No timesheet data available to download","warning");return}let n="";e.hours_breakdown.forEach((M,y)=>{n+=`<tr><td>${y+1}</td><td>${M.hour||"-"}</td><td>${M.task||"-"}</td><td>${M.hours||"-"}</td></tr>`});let t=this.formatDateDDMMYYYY(new Date(e.date)),d=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head><meta charset="UTF-8" /></head>
    <body><table border="1">
      <tr><td>Employee</td><td colspan="3">${e.FirstName} ${e.LastName}</td></tr>
      <tr><td>Date</td><td colspan="3">${t}</td></tr>
      <tr><th>S.No</th><th>Time</th><th>Task</th><th>Hours</th></tr>
      ${n}
      <tr><td>Note</td><td colspan="3">${e.notes||"-"}</td></tr>
      <tr><td>Total</td><td colspan="3">${e.total_hours}</td></tr>
    </table></body></html>`,p=new Blob([d],{type:"application/vnd.ms-excel;charset=utf-8;"}),x=document.createElement("a");x.href=URL.createObjectURL(p),x.download=`Timesheet_${e.FirstName}_${t}.xls`,x.click(),URL.revokeObjectURL(x.href),this.showToast("Timesheet downloaded successfully","success")}getTimesheetTypeIcon(e){return e==="project"?"briefcase-outline":"time-outline"}formatDate(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"--"}formatDateDDMMYYYY(e){let n=String(e.getDate()).padStart(2,"0"),t=String(e.getMonth()+1).padStart(2,"0"),d=e.getFullYear();return`${n}-${t}-${d}`}getProfileImage(e){return e?.profile_image?`http://${N.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}getDateRangeText(){return this.startDate&&this.endDate?`${this.formatDate(this.startDate)} - ${this.formatDate(this.endDate)}`:"Current Month"}getTodayFormatted(){return this.formatDate(this.currentDate)}showConfirmDialog(e,n){return P(this,null,function*(){let t=yield this.alertController.create({header:e,message:n,buttons:[{text:"Cancel",role:"cancel"},{text:"Confirm",role:"confirm"}]});yield t.present();let{role:d}=yield t.onDidDismiss();return d==="confirm"})}showReasonDialog(e,n){return P(this,null,function*(){let t=yield this.alertController.create({header:e,message:n,inputs:[{name:"rejection_reason",type:"textarea",placeholder:"Rejection reason (required)"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Reject",role:"reject",handler:x=>x.rejection_reason?.trim()?!0:(this.showToast("Rejection reason is required","warning"),!1)}]});yield t.present();let{data:d,role:p}=yield t.onDidDismiss();return p==="reject"&&d?.values?.rejection_reason?.trim()?d.values.rejection_reason:null})}showToast(e,n){return P(this,null,function*(){yield(yield this.toastController.create({message:e,duration:2e3,color:n,position:"top"})).present()})}handleRefresh(e){this.loadPendingTimesheets(),this.loadTeamStatistics(),setTimeout(()=>e.target.complete(),1e3)}goBack(){return P(this,null,function*(){yield this.modalCtrl.dismiss()})}};c.\u0275fac=function(n){return new(n||c)(v(On),v(ze),v(j),v(ie))},c.\u0275cmp=E({type:c,selectors:[["app-manager-timesheet-approvals"]],decls:51,vars:10,consts:[["slot","start"],["defaultHref","/leaves",3,"click"],["slot","end"],[3,"click"],["slot","icon-only","name","refresh-outline"],[3,"ngModelChange","ionChange","ngModel"],["value","all"],["value","regular"],["value","project"],[1,"ion-padding"],["slot","fixed",3,"ionRefresh"],[1,"row-left"],["placeholder","Search by name, email, or project","animated","",1,"ml-8",3,"ngModelChange","ionInput","ngModel"],[1,"filter-block"],["placeholder","Start Date","type","date",3,"ngModelChange","ionChange","ngModel"],["placeholder","","type","date",3,"ngModelChange","ionChange","ngModel"],[1,"ion-align-self-end"],["fill","clear",3,"click"],[1,"row-left","my-15"],["color","medium","size","small"],["color","primary","size","small"],["color","warning",4,"ngIf"],["class","loading-container",4,"ngIf"],["class","requests-container",4,"ngIf"],["class","no-leaves",4,"ngIf"],["color","warning"],[1,"loading-container"],[1,"requests-container"],["class","timesheet-card",4,"ngFor","ngForOf"],[1,"timesheet-card"],[1,"card-header-content","row-space-between"],[1,"employee-avatar","mr-8"],[3,"src"],[1,"employee-info"],[3,"color"],[3,"name"],[1,"row-space-between"],["class","info-row mr-15",4,"ngIf"],["class","info-row",4,"ngIf"],[1,"row-right"],["fill","clear","color","medium",3,"click","disabled"],["slot","icon-only","name","download-outline"],[1,"primary-outline-btn",3,"click","disabled"],[1,"primary-btn",3,"click","disabled"],[1,"info-row","mr-15"],[1,"info-row"],[1,"no-leaves"],["size","12",1,"ion-text-center"],["name","document-text-outline",2,"font-size","48px","color","#ccc","display","block","margin","0 auto 8px"],[1,"no-data-text"]],template:function(n,t){n&1&&(o(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-back-button",1),f("click",function(){return t.goBack()}),i()(),o(4,"ion-title"),s(5,"Timesheet Approvals"),i(),o(6,"ion-buttons",2)(7,"ion-button",3),f("click",function(){return t.loadPendingTimesheets()}),_(8,"ion-icon",4),i()()(),o(9,"ion-toolbar")(10,"ion-segment",5),H("ngModelChange",function(p){return W(t.filterType,p)||(t.filterType=p),p}),f("ionChange",function(p){return t.onFilterTypeChange(p)}),o(11,"ion-segment-button",6)(12,"ion-label"),s(13,"All"),i()(),o(14,"ion-segment-button",7)(15,"ion-label"),s(16,"Regular"),i()(),o(17,"ion-segment-button",8)(18,"ion-label"),s(19,"Project"),i()()()()(),o(20,"ion-content",9)(21,"ion-refresher",10),f("ionRefresh",function(p){return t.handleRefresh(p)}),_(22,"ion-refresher-content"),i(),o(23,"div",11)(24,"ion-searchbar",12),H("ngModelChange",function(p){return W(t.searchText,p)||(t.searchText=p),p}),f("ionInput",function(){return t.filterTimesheets()}),i()(),o(25,"ion-grid",13)(26,"ion-row")(27,"ion-col")(28,"div")(29,"label"),s(30,"Start Date"),i(),o(31,"ion-input",14),H("ngModelChange",function(p){return W(t.startDate,p)||(t.startDate=p),p}),f("ionChange",function(){return t.onDateRangeChange()}),i()()(),o(32,"ion-col")(33,"div")(34,"label"),s(35,"End Date"),i(),o(36,"ion-input",15),H("ngModelChange",function(p){return W(t.endDate,p)||(t.endDate=p),p}),f("ionChange",function(){return t.onDateRangeChange()}),i()()(),o(37,"ion-col",16)(38,"ion-button",17),f("click",function(){return t.clearFilters()}),s(39,"Clear All"),i()()()(),o(40,"div",18)(41,"ion-chip",19)(42,"ion-label"),s(43),i()(),o(44,"ion-chip",20)(45,"ion-label"),s(46),i()(),u(47,Dn,3,1,"ion-chip",21),i(),u(48,En,4,0,"div",22)(49,zn,2,1,"div",23)(50,Rn,5,0,"ion-row",24),i()),n&2&&(l(10),$("ngModel",t.filterType),l(14),$("ngModel",t.searchText),l(7),$("ngModel",t.startDate),l(5),$("ngModel",t.endDate),l(7),O("Today: ",t.getTodayFormatted()),l(3),O("Period: ",t.getDateRangeText()),l(),g("ngIf",!t.loading&&t.filteredTimesheets.length>0),l(),g("ngIf",t.loading),l(),g("ngIf",!t.loading&&t.filteredTimesheets.length>0),l(),g("ngIf",!t.loading&&t.filteredTimesheets.length===0))},dependencies:[q,ce,z,Q,de,pe,ge,me,mn,fe,X,_n,Z,R,Ie,ee,ue,he,ve,be,De,Ee,ne,te,oe,le,K,Ce,B,F,A,J,se,Se,on],styles:[`

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
ion-content[_ngcontent-%COMP%] {
  --background: #ffffff;
}
ion-chip[_ngcontent-%COMP%] {
  margin-left: 5px;
  padding: 0 12px;
}
.filter-block[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 16px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.filter-block[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%] {
  align-items: center;
}
.filter-block[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {
  padding: 6px 12px;
}
.filter-block[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: 6px;
}
.filter-block[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {
  border: 1px solid #ABABAB;
  border-radius: 8px;
  background: #f8fafc;
  --background: #f8fafc;
  --padding-start: 14px;
  --padding-end: 14px;
  font-family: "Inter";
  font-weight: 500;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  height: 42px;
  transition: all 0.2s ease;
  --highlight-height: 0;
}
.filter-block[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
  background: #f1f5f9;
  --background: #f1f5f9;
}
.filter-block[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  background: #ffffff;
  --background: #ffffff;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.12);
}
.filter-block[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  height: 42px;
  margin: 0;
  font-weight: 600;
  --color: #475569;
  text-transform: none;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.filter-block[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:hover {
  --color: #0f172a;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 50px;
  height: 50px;
  --color: var(--ion-color-primary);
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-top: 16px;
  font-size: 0.95rem;
  color: var(--ion-color-medium);
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 8px;
  border: 0.74px solid #ABABAB;
  box-shadow: none;
  margin: 15px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #707070;
  font-size: 11px;
  font-weight: 600;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #333333;
  margin: 4px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  background: #E6F4FF;
  border-radius: 6px;
  padding: 8px;
  margin: 15px 0px;
  width: 100%;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 13px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  min-height: 30px;
  height: 36px;
  font-size: 13px;
  text-transform: capitalize;
}
ion-searchbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  border-radius: 8px;
  --box-shadow: none;
  border: 1px solid #ABABAB;
  height: 42px;
  margin-left: 8px;
  width: 95%;
  --placeholder-color: #94a3b8;
  --color: #0f172a;
}
ion-searchbar[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.12);
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}
.row-right[_ngcontent-%COMP%]   ion-button[fill=clear][_ngcontent-%COMP%] {
  --padding-start: 8px;
  --padding-end: 8px;
  margin: 0;
}
.row-right[_ngcontent-%COMP%]   ion-button[fill=clear][_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 1.4rem;
}
.timesheet-card[_ngcontent-%COMP%] {
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}
.employee-avatar[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
}
.employee-info[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
}
.employee-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px !important;
  color: #707070 !important;
}
.no-leaves[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
}
.no-leaves[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #707070;
  font-weight: bold;
  font-size: 12px;
}
.no-data-text[_ngcontent-%COMP%] {
  color: #94A3B8;
  font-size: 14px;
}`]});let r=c;return r})();function jn(r,c){if(r&1&&(o(0,"ion-select-option",15),s(1),i()),r&2){let a=c.$implicit;g("value",a.type_code),l(),O(" ",a.type_name," ")}}function qn(r,c){r&1&&(o(0,"div",16),_(1,"ion-spinner",17),o(2,"p"),s(3,"Loading pending leave requests..."),i()())}function Nn(r,c){r&1&&(o(0,"ion-row",18)(1,"ion-col",19),_(2,"ion-icon",20),o(3,"p",21),s(4,"No Pending Leaves."),i()()())}function Vn(r,c){if(r&1&&(o(0,"ion-badge",41),s(1),i()),r&2){let a=m().$implicit;l(),O(" ",a.half_day_session," ")}}function $n(r,c){if(r&1&&(o(0,"div",42)(1,"label"),s(2,"Reason:"),i(),o(3,"p"),s(4),i()()),r&2){let a=m().$implicit;l(4),h(a.reason)}}function Wn(r,c){if(r&1){let a=T();o(0,"ion-card",24)(1,"ion-card-header")(2,"div",25)(3,"div",26)(4,"ion-avatar",27),_(5,"img",28),i(),o(6,"div",29)(7,"ion-card-title"),s(8),i(),o(9,"p",30),s(10),i()()(),o(11,"ion-badge",31),s(12),i()()(),o(13,"ion-card-content")(14,"div",32)(15,"div")(16,"label"),s(17,"Leave Type:"),i(),o(18,"p"),s(19),i()(),o(20,"div")(21,"label"),s(22,"Start Date - End Date"),i(),o(23,"p"),s(24),w(25,"date"),w(26,"date"),i()(),o(27,"div")(28,"label"),s(29,"Duration:"),i(),o(30,"p",33),s(31),u(32,Vn,2,1,"ion-badge",34),i()(),o(33,"div")(34,"label"),s(35,"Applied On:"),i(),o(36,"p"),s(37),w(38,"date"),i()()(),u(39,$n,5,1,"div",35),o(40,"div",36)(41,"ion-textarea",37),H("ngModelChange",function(n){let t=b(a).$implicit,d=m(2);return W(d.rejectionReasons[t.id],n)||(d.rejectionReasons[t.id]=n),C(n)}),i()(),o(42,"div",38)(43,"ion-button",39),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.rejectLeave(n))}),s(44,"Reject"),i(),o(45,"ion-button",40),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.approveLeave(n))}),s(46,"Approve"),i()()()()}if(r&2){let a=c.$implicit,e=m(2);l(5),g("src",e.getProfileImage(a),V),l(3),L("",a.FirstName," ",a.LastName),l(2),h(a.EmployeeNumber),l(),g("ngClass",e.getStatusColor(a.status)),l(),O(" ",a.status||"pending"," "),l(7),L("",a.type_name," (",a.type_code,")"),l(5),L("",I(25,15,a.start_date,"mediumDate")," - ",I(26,18,a.end_date,"mediumDate")),l(7),O(" ",a.total_days," day(s) "),l(),g("ngIf",a.is_half_day),l(5),h(Y(38,21,a.applied_at)),l(2),g("ngIf",a.reason),l(2),$("ngModel",e.rejectionReasons[a.id])}}function Hn(r,c){if(r&1&&(o(0,"div",22),u(1,Wn,47,23,"ion-card",23),i()),r&2){let a=m();l(),g("ngForOf",a.filteredLeaves)}}var Tn=(()=>{let c=class c{constructor(e,n,t,d){this.leaveRequestService=e,this.leaveTypeService=n,this.toastController=t,this.modalCtrl=d,this.pendingLeaves=[],this.filteredLeaves=[],this.leaveTypes=[],this.isLoading=!1,this.searchTerm="",this.leaveTypeFilter="all",this.rejectionReasons={}}ngOnInit(){this.loadLeaveTypes(),this.loadPendingLeaves()}ionViewWillEnter(){this.ngOnInit()}loadLeaveTypes(){this.leaveTypeService.getLeaveTypes().subscribe({next:e=>{this.leaveTypes=e.sort((n,t)=>n.type_name.localeCompare(t.type_name))},error:()=>this.showToast("Failed to load leave types","danger")})}loadPendingLeaves(){this.isLoading=!0,this.leaveRequestService.getPendingLeaveRequests().subscribe({next:e=>{this.pendingLeaves=e,this.applyFilters(),this.isLoading=!1},error:()=>{this.showToast("Failed to load pending leaves","danger"),this.isLoading=!1}})}applyFilters(){this.filteredLeaves=this.pendingLeaves.filter(e=>{let n=!this.searchTerm||`${e.FirstName} ${e.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())||e.EmployeeNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()),t=this.leaveTypeFilter==="all"||e.type_code===this.leaveTypeFilter;return n&&t})}onSearchChange(e){this.searchTerm=e.detail.value||"",this.applyFilters()}onTypeFilterChange(e){this.leaveTypeFilter=e.detail.value,this.applyFilters()}approveLeave(e){this.isLoading=!0,this.leaveRequestService.approveLeave(e.id,"Approved").subscribe({next:()=>{this.showToast("Leave approved successfully","success"),this.loadPendingLeaves()},error:n=>{this.showToast(n.error?.error||"Failed to approve leave","danger"),this.isLoading=!1}})}rejectLeave(e){let n=(this.rejectionReasons[e.id]||"").trim();if(!n){this.showToast("Please enter a rejection reason before rejecting.","warning");return}this.isLoading=!0,this.leaveRequestService.rejectLeave(e.id,n).subscribe({next:()=>{this.showToast("Leave rejected successfully","success"),this.loadPendingLeaves()},error:t=>{this.showToast(t.error?.error||"Failed to reject leave","danger"),this.isLoading=!1}}),this.rejectionReasons[e.id]=""}showToast(e,n="dark"){return P(this,null,function*(){yield(yield this.toastController.create({message:e,duration:3e3,position:"bottom",color:n})).present()})}handleRefresh(e){this.loadPendingLeaves(),setTimeout(()=>e.target.complete(),1e3)}getStatusColor(e){return{pending:"pending",approved:"accept",rejected:"reject"}[e?.toLowerCase()]||"medium"}getProfileImage(e){return e?.profile_image?`http://${N.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}goBack(){return P(this,null,function*(){yield this.modalCtrl.dismiss()})}};c.\u0275fac=function(n){return new(n||c)(v(xe),v(Pn),v(j),v(ie))},c.\u0275cmp=E({type:c,selectors:[["app-manager-leave-approvals"]],decls:27,vars:6,consts:[["slot","start"],["defaultHref","/leaves",3,"click"],["slot","end"],[3,"click"],["name","refresh","slot","icon-only"],["placeholder","Search employee...",3,"ionInput","debounce"],["lines","none"],[1,"select-tag","row-right"],["interface","popover","toggleIcon","chevron-down","expandedIcon","chevron-up",3,"ngModelChange","ionChange","ngModel"],["value","all"],[3,"value",4,"ngFor","ngForOf"],["slot","fixed",3,"ionRefresh"],["class","loading-container",4,"ngIf"],["class","no-leaves",4,"ngIf"],["class","requests-container",4,"ngIf"],[3,"value"],[1,"loading-container"],["name","crescent"],[1,"no-leaves"],["size","12",1,"ion-text-center"],["name","document-text-outline",2,"font-size","48px","color","#ccc","display","block","margin","0 auto 8px"],[1,"no-data-text"],[1,"requests-container"],["class","leave-card",4,"ngFor","ngForOf"],[1,"leave-card"],[1,"card-header-content","row-space-between"],[1,"row-left"],[1,"employee-avatar","mr-8"],[3,"src"],[1,"employee-info"],[1,"employee-number"],[3,"ngClass"],[1,"row-space-between"],[1,"total-days"],["color","secondary","style","font-size: 10px; margin-left: 4px;",4,"ngIf"],["class","info-row",4,"ngIf"],[1,"rejection-reason-block"],["placeholder","Enter rejection reason (required to reject)...","rows","2","auto-grow","false",1,"rejection-textarea",3,"ngModelChange","ngModel"],[1,"row-right","action-btns"],[1,"primary-outline-btn",3,"click"],[1,"primary-btn",3,"click"],["color","secondary",2,"font-size","10px","margin-left","4px"],[1,"info-row"]],template:function(n,t){n&1&&(o(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-back-button",1),f("click",function(){return t.goBack()}),i()(),o(4,"ion-title"),s(5,"Leave Approvals"),i(),o(6,"ion-buttons",2)(7,"ion-button",3),f("click",function(){return t.loadPendingLeaves()}),_(8,"ion-icon",4),i()()(),o(9,"ion-toolbar")(10,"ion-searchbar",5),f("ionInput",function(p){return t.onSearchChange(p)}),i()(),o(11,"ion-toolbar")(12,"ion-item",6)(13,"div",7)(14,"ion-label"),s(15,"Leave Type:"),i(),o(16,"div")(17,"ion-select",8),H("ngModelChange",function(p){return W(t.leaveTypeFilter,p)||(t.leaveTypeFilter=p),p}),f("ionChange",function(p){return t.onTypeFilterChange(p)}),o(18,"ion-select-option",9),s(19,"Select Leaves"),i(),u(20,jn,2,2,"ion-select-option",10),i()()()()()(),o(21,"ion-content")(22,"ion-refresher",11),f("ionRefresh",function(p){return t.handleRefresh(p)}),_(23,"ion-refresher-content"),i(),u(24,qn,4,0,"div",12)(25,Nn,5,0,"ion-row",13)(26,Hn,2,1,"div",14),i()),n&2&&(l(10),g("debounce",300),l(7),$("ngModel",t.leaveTypeFilter),l(3),g("ngForOf",t.leaveTypes),l(4),g("ngIf",t.isLoading),l(),g("ngIf",!t.isLoading&&t.filteredLeaves.length===0),l(),g("ngIf",!t.isLoading&&t.filteredLeaves.length>0))},dependencies:[B,U,F,A,J,se,Se,q,ce,Le,z,Q,de,pe,ge,me,fe,X,Z,R,_e,ee,ue,he,ve,be,Fe,Ae,ne,Be,te,oe,le,K,Ce,G],styles:[`

ion-content[_ngcontent-%COMP%] {
  --background: #ffffff;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 16px;
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 50px;
  height: 50px;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: var(--ion-color-medium);
  font-size: 14px;
}
.requests-container[_ngcontent-%COMP%] {
  padding: 0 16px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 8px;
  border: 0.74px solid #ABABAB;
  box-shadow: none;
  margin: 15px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #707070;
  font-size: 11px;
  font-weight: 600;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #333333;
  margin: 4px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  background: #E6F4FF;
  border-radius: 6px;
  padding: 8px;
  margin: 15px 0px;
  width: 100%;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 13px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  min-height: 30px;
  height: 36px;
  font-size: 13px;
  text-transform: capitalize;
}
.rejection-reason-block[_ngcontent-%COMP%] {
  margin: 10px 0 6px 0;
}
.rejection-reason-block[_ngcontent-%COMP%]   .rejection-textarea[_ngcontent-%COMP%] {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-size: 13px;
  --placeholder-color: #9ca3af;
  --background: #f9fafb;
  width: 100%;
}
.action-btns[_ngcontent-%COMP%] {
  gap: 8px;
  margin-top: 4px;
}
.select-tag[_ngcontent-%COMP%] {
  width: 100%;
  margin-right: 10px;
}
.select-tag[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  width: max-content;
  margin-right: 12px;
}
.select-tag[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  width: 150px;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 0 8px;
}
ion-searchbar[_ngcontent-%COMP%] {
  --background: var(--ion-background-color, #fff);
  border-radius: 8px;
  --box-shadow: none;
  border: 1px solid #ABABAB;
  --min-height: 36px;
  height: 42px;
  width: 95%;
  margin: 0 auto;
}
.employee-avatar[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
}
.employee-info[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
}
.employee-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px !important;
  color: #707070 !important;
}
ion-badge.pending[_ngcontent-%COMP%] {
  background: #FFE9D2;
  border: 1px solid #C56305;
  color: #C56305;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
}
ion-badge.accept[_ngcontent-%COMP%] {
  background: #C7FFEA;
  border: 1px solid #2E9D74;
  color: #2E9D74;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
}
ion-badge.reject[_ngcontent-%COMP%] {
  background: #FFE0E0;
  border: 1px solid #EF4444;
  color: #EF4444;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
}
.no-leaves[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
}
.no-leaves[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #707070;
  font-weight: bold;
  font-size: 12px;
}
.no-data-text[_ngcontent-%COMP%] {
  color: #94A3B8;
  font-size: 14px;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}`]});let r=c;return r})();function Yn(r,c){r&1&&(o(0,"div",10),_(1,"ion-spinner",11),o(2,"p"),s(3,"Loading pending attendance requests..."),i()())}function Un(r,c){r&1&&(o(0,"ion-row",12)(1,"ion-col",13),_(2,"ion-icon",14),o(3,"p",15),s(4,"No Pending Requests."),i()()())}function Gn(r,c){if(r&1&&(o(0,"div",32)(1,"div")(2,"label"),s(3,"Reason"),i(),o(4,"p"),s(5),i()()()),r&2){let a=m().$implicit;l(5),h(a.reason)}}function Jn(r,c){if(r&1){let a=T();o(0,"ion-card",18)(1,"ion-card-header")(2,"div",19)(3,"div",20)(4,"ion-avatar",21),_(5,"img",22),i(),o(6,"div",23)(7,"ion-card-title"),s(8),i(),o(9,"p",24),s(10),i()()(),o(11,"div",25)(12,"ion-badge",26),s(13),i()()()(),o(14,"ion-card-content")(15,"div",27)(16,"div")(17,"label"),s(18,"Start Date"),i(),o(19,"p"),s(20),w(21,"date"),i()(),o(22,"div")(23,"label"),s(24,"End Date"),i(),o(25,"p"),s(26),w(27,"date"),i()(),o(28,"div")(29,"label"),s(30,"Requested On"),i(),o(31,"p"),s(32),w(33,"date"),i()(),o(34,"div")(35,"label"),s(36,"Duration"),i(),o(37,"p"),s(38),i()()(),u(39,Gn,6,1,"div",28),o(40,"div",29)(41,"ion-button",30),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.rejectWFH(n))}),s(42,"Reject"),i(),o(43,"ion-button",31),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.approveWFH(n))}),s(44,"Approve"),i()()()()}if(r&2){let a=c.$implicit,e=m(2);l(5),g("src",e.getProfileImage(a),V),l(3),L("",a.FirstName," ",a.LastName),l(2),h(a.EmployeeNumber),l(2),g("ngClass",e.getStatusColor(a.status)),l(),O(" ",a.status||"pending"," "),l(7),h(Y(21,11,a.start_date)),l(6),h(Y(27,13,a.end_date)),l(6),h(Y(33,15,a.created_at)),l(6),h(a.total_days),l(),g("ngIf",a.reason)}}function Kn(r,c){if(r&1&&(o(0,"div",16),u(1,Jn,45,17,"ion-card",17),i()),r&2){let a=m();l(),g("ngForOf",a.filteredRequests)}}var Ln=(()=>{let c=class c{constructor(e,n,t,d){this.wfhService=e,this.alertController=n,this.toastController=t,this.modalCtrl=d,this.pendingWFHRequests=[],this.filteredRequests=[],this.isLoading=!1,this.searchTerm="",this.modeFilter="all"}ngOnInit(){this.loadPendingWFHRequests()}loadPendingWFHRequests(){this.isLoading=!0,this.wfhService.getPendingWFHRequests().subscribe({next:e=>{this.pendingWFHRequests=e.map(n=>Ge(Ue({},n),{work_mode:n.leave_type==="WFH"?"WFH":"WFO"})),this.applyFilters(),this.isLoading=!1},error:()=>{this.showToast("Failed to load pending WFH requests","danger"),this.isLoading=!1}})}applyFilters(){this.filteredRequests=this.pendingWFHRequests.filter(e=>{let n=!this.searchTerm||`${e.FirstName} ${e.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())||e.EmployeeNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()),t=this.modeFilter==="all"||e.work_mode===this.modeFilter;return n&&t})}onSearchChange(e){this.searchTerm=e.detail.value||"",this.applyFilters()}approveWFH(e){return P(this,null,function*(){yield(yield this.alertController.create({header:"Approve WFH Request",message:`Approve ${e.FirstName} ${e.LastName}'s request?`,buttons:[{text:"Cancel",role:"cancel"},{text:"Approve",handler:()=>this.performApprove(e)}]})).present()})}rejectWFH(e){return P(this,null,function*(){yield(yield this.alertController.create({header:"Reject WFH Request",message:"Are you sure you want to reject this WFH request?",inputs:[{name:"remarks",type:"textarea",placeholder:"Enter rejection reason"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Reject",handler:t=>t.remarks?(this.performReject(e,t.remarks),!0):(this.showToast("Rejection reason required","warning"),!1)}]})).present()})}performApprove(e){this.isLoading=!0,this.wfhService.approveWFHRequest(e.id,"Approved").subscribe({next:()=>{this.showToast("WFH request approved","success"),this.loadPendingWFHRequests()},error:()=>{this.showToast("Failed to approve request","danger"),this.isLoading=!1}})}performReject(e,n){this.isLoading=!0,this.wfhService.rejectWFHRequest(e.id,n).subscribe({next:()=>{this.showToast("WFH request rejected","success"),this.loadPendingWFHRequests()},error:()=>{this.showToast("Failed to reject request","danger"),this.isLoading=!1}})}handleRefresh(e){this.loadPendingWFHRequests(),setTimeout(()=>e.target.complete(),1e3)}getStatusColor(e){return{pending:"pending",approved:"accept",rejected:"reject"}[e?.toLowerCase()]||"medium"}getProfileImage(e){return e?.profile_image?`http://${N.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}showToast(e,n="dark"){return P(this,null,function*(){yield(yield this.toastController.create({message:e,duration:3e3,position:"bottom",color:n})).present()})}goBack(){return P(this,null,function*(){yield this.modalCtrl.dismiss()})}};c.\u0275fac=function(n){return new(n||c)(v(yn),v(ze),v(j),v(ie))},c.\u0275cmp=E({type:c,selectors:[["app-manager-wfh-approvals"]],decls:17,vars:4,consts:[["slot","start"],["defaultHref","/leaves",3,"click"],["slot","end"],[3,"click"],["name","refresh","slot","icon-only"],["placeholder","Search employee...",3,"ionInput","debounce"],["slot","fixed",3,"ionRefresh"],["class","loading-container",4,"ngIf"],["class","no-leaves",4,"ngIf"],["class","requests-container",4,"ngIf"],[1,"loading-container"],["name","crescent"],[1,"no-leaves"],["size","12",1,"ion-text-center"],["name","document-text-outline",2,"font-size","48px","color","#ccc","display","block","margin","0 auto 8px"],[1,"no-data-text"],[1,"requests-container"],["class","wfh-card",4,"ngFor","ngForOf"],[1,"wfh-card"],[1,"card-header-content","row-space-between"],[1,"row-left"],[1,"employee-avatar","mr-8"],[3,"src"],[1,"employee-info"],[1,"employee-number"],[1,"badges"],[3,"ngClass"],[1,"row-space-between"],["class","info-row",4,"ngIf"],[1,"row-right"],[1,"primary-outline-btn",3,"click"],[1,"primary-btn",3,"click"],[1,"info-row"]],template:function(n,t){n&1&&(o(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-back-button",1),f("click",function(){return t.goBack()}),i()(),o(4,"ion-title"),s(5,"Attendance Approvals"),i(),o(6,"ion-buttons",2)(7,"ion-button",3),f("click",function(){return t.loadPendingWFHRequests()}),_(8,"ion-icon",4),i()()(),o(9,"ion-toolbar")(10,"ion-searchbar",5),f("ionInput",function(p){return t.onSearchChange(p)}),i()()(),o(11,"ion-content")(12,"ion-refresher",6),f("ionRefresh",function(p){return t.handleRefresh(p)}),_(13,"ion-refresher-content"),i(),u(14,Yn,4,0,"div",7)(15,Un,5,0,"ion-row",8)(16,Kn,2,1,"div",9),i()),n&2&&(l(10),g("debounce",300),l(4),g("ngIf",t.isLoading),l(),g("ngIf",!t.isLoading&&t.filteredRequests.length===0),l(),g("ngIf",!t.isLoading&&t.filteredRequests.length>0))},dependencies:[B,U,F,A,J,q,ce,Le,z,Q,de,pe,ge,me,fe,X,Z,R,ue,he,ve,be,ne,te,oe,K,Ce,G],styles:[`

ion-content[_ngcontent-%COMP%] {
  --background: #ffffff;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 16px;
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 50px;
  height: 50px;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: var(--ion-color-medium);
  font-size: 14px;
}
.requests-container[_ngcontent-%COMP%] {
  padding: 0 16px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 8px;
  border: 0.74px solid #ABABAB;
  box-shadow: none;
  margin: 15px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #707070;
  font-size: 11px;
  font-weight: 600;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #333333;
  margin: 4px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  background: #E6F4FF;
  border-radius: 6px;
  padding: 8px;
  margin: 15px 0px;
  width: 100%;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 13px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  min-height: 30px;
  height: 36px;
  font-size: 13px;
  text-transform: capitalize;
}
ion-searchbar[_ngcontent-%COMP%] {
  --background: var(--ion-background-color, #fff);
  border-radius: 8px;
  --box-shadow: none;
  border: 1px solid #ABABAB;
  --min-height: 36px;
  height: 42px;
  width: 95%;
  margin: 0 auto;
}
.employee-avatar[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
}
.employee-info[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
}
.employee-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 12px !important;
  color: #707070 !important;
}
ion-badge.pending[_ngcontent-%COMP%] {
  background: #FFE9D2;
  border: 1px solid #C56305;
  color: #C56305;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
}
ion-badge.accept[_ngcontent-%COMP%] {
  background: #C7FFEA;
  border: 1px solid #2E9D74;
  color: #2E9D74;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
}
ion-badge.reject[_ngcontent-%COMP%] {
  background: #FFE0E0;
  border: 1px solid #EF4444;
  color: #EF4444;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
}
.no-leaves[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
}
.no-leaves[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #707070;
  font-weight: bold;
  font-size: 12px;
}
.no-data-text[_ngcontent-%COMP%] {
  color: #94A3B8;
  font-size: 14px;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}`]});let r=c;return r})();function Zn(r,c){if(r&1&&(o(0,"ion-select-option",31),s(1),i()),r&2){let a=c.$implicit;g("value",a.id)("disabled",a.available<=0&&a.code.toUpperCase()!=="LOP"),l(),tn(" ",a.name," (",a.code.toUpperCase()==="LOP"?"Unlimited":a.available," ",a.code.toUpperCase()==="LOP"?"":"available",") ")}}function et(r,c){r&1&&(o(0,"div",32)(1,"label",7),s(2,"Select Session"),i(),o(3,"ion-segment",33)(4,"ion-segment-button",34)(5,"ion-label"),s(6,"First Half"),i()(),o(7,"ion-segment-button",35)(8,"ion-label"),s(9,"Second Half"),i()()()())}function nt(r,c){if(r&1){let a=T();o(0,"ion-datetime",36),f("ionChange",function(n){b(a);let t=m(),d=re(30);return C(t.onDateChangeFrom(n,d))}),i(),_(1,"div",37)}if(r&2){let a=m();g("isDateEnabled",a.isDateEnabled)("highlightedDates",a.highlightedDates)}}function tt(r,c){if(r&1){let a=T();o(0,"ion-datetime",42),f("ionChange",function(n){b(a),m();let t=re(8),d=m();return C(d.onDateChangeTo(n,t))}),i(),o(1,"div",37),_(2,"span",43),i()}if(r&2){let a=m(2);g("min",a.leaveForm.value.start_date)("isDateEnabled",a.isDateEnabled)("highlightedDates",a.highlightedDates)}}function ot(r,c){if(r&1&&(o(0,"div",38)(1,"label",7),s(2,"To Date"),i(),o(3,"div",18),_(4,"ion-icon",39)(5,"ion-input",40),w(6,"date"),i(),o(7,"ion-popover",41,1),u(9,tt,3,3,"ng-template"),i()()),r&2){let a=m();l(5),g("value",a.selectedDateTo?I(6,1,a.selectedDateTo,"dd MMM yyyy"):"")}}function it(r,c){if(r&1&&(o(0,"div",44)(1,"div",45),_(2,"ion-icon",46),i(),o(3,"div",47)(4,"span",48),s(5,"Duration"),i(),o(6,"span",49),s(7),i()()()),r&2){let a=m();l(7),L("",a.total_days," ",a.total_days===1?"Day":"Days")}}var Ve=(()=>{let c=class c{constructor(e,n,t,d,p,x){this.fb=e,this.employeeLeaves=n,this.leaveRequestService=t,this.adminService=d,this.employeeService=p,this.toastController=x,this.leaveSubmitted=new en,this.currentYear=new Date().getFullYear(),this.leaveTypes=[],this.total_days=0,this.wordsCount=0,this.selectedDateFrom="",this.selectedDateTo="",this.minDate=new Date().toISOString().split("T")[0],this.existingLeaves=[],this.weekOffDays=[],this.highlightedDates=[],this.isDateEnabled=M=>{let y=this.parseLocalDate(M);return isNaN(y.getTime())?!0:!this.weekOffDays.includes(y.getDay())}}ngOnInit(){this.buildForm(),this.loadLeaveBalance(),this.handleDateChanges(),this.loadPendingLeaves(),this.loadWeeklyOffPolicy()}loadPendingLeaves(){this.leaveRequestService.getMyLeaves(this.currentYear).subscribe({next:e=>{this.existingLeaves=e.filter(n=>["PENDING","APPROVED","pending","approved"].includes(n.status)).map(n=>({from_date:n.start_date||n.from_date,to_date:n.end_date||n.to_date||n.start_date||n.from_date,status:n.status,is_half_day:n.is_half_day,half_day_session:n.half_day_session}))},error:()=>{this.existingLeaves=[]}})}buildForm(){this.leaveForm=this.fb.group({leave_type:["",Oe.required],is_half_day:[!1],half_day_session:["First Half"],start_date:["",Oe.required],end_date:["",Oe.required],remarks:["",Oe.required],notify:[""]})}onHalfDayToggle(){if(this.leaveForm.get("is_half_day")?.value){let n=this.leaveForm.get("start_date")?.value;this.leaveForm.patchValue({end_date:n}),this.selectedDateTo=this.selectedDateFrom}this.recalculateTotalDays()}handleDateChanges(){this.leaveForm.valueChanges.subscribe(()=>this.recalculateTotalDays())}recalculateTotalDays(){let e=this.leaveForm.value;if(e.is_half_day){this.total_days=e.start_date?.5:0;return}if(e.start_date&&e.end_date){let n=this.parseLocalDate(e.start_date),t=this.parseLocalDate(e.end_date);if(n&&t&&t>=n&&!isNaN(n.getTime())&&!isNaN(t.getTime())){let d=0,p=new Date(n);for(;p<=t;)this.weekOffDays.includes(p.getDay())||d++,p.setDate(p.getDate()+1);this.total_days=d}else this.total_days=0}else this.total_days=0}parseLocalDate(e){if(!e)return new Date(NaN);let t=e.substring(0,10).split("-");return t.length!==3?new Date(NaN):new Date(parseInt(t[0]),parseInt(t[1])-1,parseInt(t[2]))}formatLocalDate(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}loadWeeklyOffPolicy(){this.adminService.getWeeklyOffPolicies().subscribe(e=>{this.employeeService.getMyProfile().subscribe({next:n=>{let t=e.find(d=>d.id===n.weekly_off_policy_id);t&&(this.weekOffDays=[],Number(t.sunday_off)===1&&this.weekOffDays.push(0),Number(t.monday_off)===1&&this.weekOffDays.push(1),Number(t.tuesday_off)===1&&this.weekOffDays.push(2),Number(t.wednesday_off)===1&&this.weekOffDays.push(3),Number(t.thursday_off)===1&&this.weekOffDays.push(4),Number(t.friday_off)===1&&this.weekOffDays.push(5),Number(t.saturday_off)===1&&this.weekOffDays.push(6),this.generateHighlightedDates(),this.recalculateTotalDays())},error:()=>{this.weekOffDays=[0],this.generateHighlightedDates(),this.recalculateTotalDays()}})})}generateHighlightedDates(){let e=[],n=new Date,t=new Date(n.getFullYear()-1,0,1),d=new Date(n.getFullYear()+1,11,31);for(let p=new Date(t);p<=d;p.setDate(p.getDate()+1))this.weekOffDays.includes(p.getDay())&&e.push({date:this.formatLocalDate(p),textColor:"#2563eb",backgroundColor:"#eff6ff"});this.highlightedDates=e}loadLeaveBalance(){this.employeeLeaves.getLeaveBalance(this.currentYear).subscribe({next:e=>{let n=e.balances||[];this.leaveTypes=n.map(t=>({id:t.leave_type_id,name:t.type_name,code:t.type_code,available:Number(t.available_days)||0,pending:Number(t.pending_days)||0}))}})}submitRequest(){if(this.leaveForm.invalid){this.presentToast("Please fill all required fields","warning");return}if(this.total_days<=0){this.presentToast("Selected dates are week off, please check the dates","warning");return}let e=this.leaveForm.value,n=this.leaveTypes.find(S=>S.id===e.leave_type);if(!n){this.presentToast("Invalid leave type","danger");return}let t=(n.code||"").toUpperCase()==="LOP",d=n.available-n.pending;if(!t&&this.total_days>d){n.available<=0||d<=0?this.presentToast("Your assigned leaves are applied please check","warning"):this.presentToast(`Only ${d} days available (considering pending requests)`,"warning");return}let p=this.parseLocalDate(e.start_date),x=this.parseLocalDate(e.end_date),M=S=>{if(!S)return"";if(typeof S=="string"&&S.length===10)return S;let D=new Date(S);return`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}-${String(D.getDate()).padStart(2,"0")}`},y=!1,Me="A leave request already exists for at least one of these dates.",k=new Date(p);for(;k<=x;){let S=M(k);for(let D of this.existingLeaves){let Ye=this.parseLocalDate(D.from_date),We=this.parseLocalDate(D.to_date),ae=new Date(Ye);for(;ae<=We;){if(M(ae)===S)if(e.is_half_day)if(D.is_half_day){if(D.half_day_session===e.half_day_session){y=!0,Me=`There is already a half-day leave request for the ${e.half_day_session} on ${S}.`;break}}else{y=!0;break}else{y=!0;break}ae.setDate(ae.getDate()+1)}if(y)break}if(y)break;k.setDate(k.getDate()+1)}if(y){this.presentToast(Me,"danger");return}if((n.code||"").toUpperCase()==="CL"){let S=new Date,D=this.parseLocalDate(e.start_date).getMonth();if(this.parseLocalDate(e.start_date).getFullYear()===S.getFullYear()&&D>S.getMonth()){this.presentToast("CL allocations are granted monthly. You cannot apply for future months in advance.","warning");return}let We=this.parseLocalDate(e.start_date),ae=this.parseLocalDate(e.is_half_day?e.start_date:e.end_date),Pe=new Date(We);for(;Pe<=ae;){if(Pe.getFullYear()===S.getFullYear()&&Pe.getMonth()>S.getMonth()){this.presentToast("CL allocations are granted monthly. You cannot apply for future months in advance.","warning");return}Pe.setDate(Pe.getDate()+1)}}let we={leave_type_id:e.leave_type,start_date:e.start_date,end_date:e.is_half_day?e.start_date:e.end_date,total_days:this.total_days,reason:e.remarks,is_half_day:e.is_half_day,half_day_session:e.is_half_day?e.half_day_session:null};this.leaveRequestService.applyLeave(we).subscribe({next:()=>{this.leaveForm.reset(),this.total_days=0,this.selectedDateFrom="",this.selectedDateTo="",this.presentToast("Leave request submitted successfully","success"),this.leaveSubmitted.emit(),this.loadPendingLeaves()},error:S=>{this.presentToast(S?.error?.error||"Failed to submit leave","danger"),this.loadPendingLeaves()}})}validateWordLimit(e){let n=e.target.value||"",t=n.trim()?n.trim().split(/\s+/):[];this.wordsCount=t.length,t.length>100&&(this.leaveForm.patchValue({remarks:t.slice(0,100).join(" ")}),this.wordsCount=100)}presentToast(e,n){return P(this,null,function*(){(yield this.toastController.create({message:e,duration:2e3,color:n,position:"top"})).present()})}onDateChangeFrom(e,n){this.leaveForm.patchValue({start_date:e.detail.value}),this.selectedDateFrom=e.detail.value,n.dismiss()}onDateChangeTo(e,n){this.leaveForm.patchValue({end_date:e.detail.value}),this.selectedDateTo=e.detail.value,n.dismiss()}};c.\u0275fac=function(n){return new(n||c)(v(pn),v(je),v(xe),v(xn),v(Re),v(j))},c.\u0275cmp=E({type:c,selectors:[["app-leave-request"]],outputs:{leaveSubmitted:"leaveSubmitted"},decls:47,vars:16,consts:[["fromPopover",""],["toPopover",""],[1,"premium-form-container",3,"formGroup"],[1,"form-header-premium"],[1,"header-text"],[1,"form-section"],[1,"input-group","full-width"],[1,"premium-label"],[1,"custom-select-wrapper"],["formControlName","leave_type","placeholder","Select Leave Type","interface","popover",1,"premium-input"],[3,"value","disabled",4,"ngFor","ngForOf"],["name","chevron-down-outline",1,"input-icon","select-chevron"],[1,"half-day-row"],["lines","none",1,"half-day-item"],["formControlName","is_half_day",3,"ionChange"],["class","session-row fade-in",4,"ngIf"],[1,"date-row"],[1,"input-group",3,"ngClass"],[1,"premium-input-wrapper"],["name","calendar-clear-outline",1,"input-icon-left"],["id","from-input","readonly","",1,"premium-input","with-left-icon","with-cursor",3,"placeholder","value"],["trigger","from-input","triggerAction","click",1,"premium-popover"],["class","input-group half-width",4,"ngIf"],["class","total-days-badge fade-in",4,"ngIf"],[1,"required-asterisk"],[1,"premium-textarea-wrapper"],["placeholder","Please elaborate on the reason for this request...","formControlName","remarks","rows","4",1,"premium-textarea",3,"ionInput"],[1,"word-count"],[1,"form-actions"],["expand","block",1,"submit-btn",3,"click","disabled"],["name","arrow-forward-outline","slot","end"],[3,"value","disabled"],[1,"session-row","fade-in"],["formControlName","half_day_session",1,"premium-segment"],["value","First Half"],["value","Second Half"],["presentation","date",3,"ionChange","isDateEnabled","highlightedDates"],[1,"datetime-footer"],[1,"input-group","half-width"],["name","calendar-outline",1,"input-icon-left"],["id","to-input","placeholder","End Date","readonly","",1,"premium-input","with-left-icon","with-cursor",3,"value"],["trigger","to-input","triggerAction","click",1,"premium-popover"],["presentation","date",3,"ionChange","min","isDateEnabled","highlightedDates"],[1,"highlight-off"],[1,"total-days-badge","fade-in"],[1,"badge-icon"],["name","time-outline"],[1,"badge-content"],[1,"badge-title"],[1,"badge-value"]],template:function(n,t){if(n&1){let d=T();o(0,"form",2)(1,"div",3)(2,"div",4)(3,"h2"),s(4,"New Leave Request"),i(),o(5,"p"),s(6,"Please provide the details for your time off"),i()()(),o(7,"div",5)(8,"div",6)(9,"label",7),s(10,"Leave Type"),i(),o(11,"div",8)(12,"ion-select",9),u(13,Zn,2,5,"ion-select-option",10),i(),_(14,"ion-icon",11),i()(),o(15,"div",12)(16,"ion-item",13)(17,"ion-label"),s(18,"Half Day"),i(),o(19,"ion-toggle",14),f("ionChange",function(){return b(d),C(t.onHalfDayToggle())}),i()()(),u(20,et,10,0,"div",15),o(21,"div",16)(22,"div",17)(23,"label",7),s(24),i(),o(25,"div",18),_(26,"ion-icon",19)(27,"ion-input",20),w(28,"date"),i(),o(29,"ion-popover",21,0),u(31,nt,2,2,"ng-template"),i()(),u(32,ot,10,4,"div",22),i(),u(33,it,8,2,"div",23),o(34,"div",6)(35,"label",7),s(36,"Reason for Leave "),o(37,"span",24),s(38,"*"),i()(),o(39,"div",25)(40,"ion-textarea",26),f("ionInput",function(x){return b(d),C(t.validateWordLimit(x))}),i(),o(41,"div",27),s(42),i()()()(),o(43,"div",28)(44,"ion-button",29),f("click",function(){return b(d),C(t.submitRequest())}),s(45," Submit Leave Request "),_(46,"ion-icon",30),i()()()}if(n&2){let d,p,x,M,y;g("formGroup",t.leaveForm),l(13),g("ngForOf",t.leaveTypes),l(7),g("ngIf",(d=t.leaveForm.get("is_half_day"))==null?null:d.value),l(2),g("ngClass",(p=t.leaveForm.get("is_half_day"))!=null&&p.value?"full-width":"half-width"),l(2),h((x=t.leaveForm.get("is_half_day"))!=null&&x.value?"Date":"From Date"),l(3),g("placeholder",(M=t.leaveForm.get("is_half_day"))!=null&&M.value?"Select Date":"Start Date")("value",t.selectedDateFrom?I(28,13,t.selectedDateFrom,"dd MMM yyyy"):""),l(5),g("ngIf",!((y=t.leaveForm.get("is_half_day"))!=null&&y.value)),l(),g("ngIf",t.total_days>0),l(8),ke("warning",t.wordsCount>90),l(),O(" ",t.wordsCount," / 100 "),l(2),g("disabled",t.leaveForm.invalid)}},dependencies:[q,z,fn,R,Ie,_e,ee,De,Ee,Fe,Ae,Be,hn,bn,gn,le,K,B,U,F,A,Te,ln,se,sn,cn,dn,G],styles:[`

.premium-form-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 10px 0;
}
.premium-form-container[_ngcontent-%COMP%]   .form-header-premium[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      to right,
      #f8fafc,
      #ffffff);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 8px;
  border: 1px solid #e2e8f0;
}
.premium-form-container[_ngcontent-%COMP%]   .form-header-premium[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%] {
  padding: 16px 20px;
}
.premium-form-container[_ngcontent-%COMP%]   .form-header-premium[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
}
.premium-form-container[_ngcontent-%COMP%]   .form-header-premium[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 4px 0 0;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}
.premium-form-container[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.premium-form-container[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.premium-form-container[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .premium-label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.premium-form-container[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .premium-label[_ngcontent-%COMP%]   .required-asterisk[_ngcontent-%COMP%] {
  color: #ef4444;
}
.premium-form-container[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .premium-label[_ngcontent-%COMP%]   .optional-label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 400;
}
.premium-form-container[_ngcontent-%COMP%]   .date-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
}
.premium-form-container[_ngcontent-%COMP%]   .date-row[_ngcontent-%COMP%]   .half-width[_ngcontent-%COMP%] {
  flex: 1;
}
.premium-form-container[_ngcontent-%COMP%]   .date-row[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {
  flex: 1;
}
.premium-form-container[_ngcontent-%COMP%]   .half-day-row[_ngcontent-%COMP%] {
  margin-bottom: -10px;
}
.premium-form-container[_ngcontent-%COMP%]   .half-day-row[_ngcontent-%COMP%]   .half-day-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --background: transparent;
  --inner-padding-end: 0;
}
.premium-form-container[_ngcontent-%COMP%]   .half-day-row[_ngcontent-%COMP%]   .half-day-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
}
.premium-form-container[_ngcontent-%COMP%]   .half-day-row[_ngcontent-%COMP%]   .half-day-item[_ngcontent-%COMP%]   ion-toggle[_ngcontent-%COMP%] {
  --handle-background: #ffffff;
  --handle-background-checked: #ffffff;
  --background: #e5e7eb;
  --background-checked: #2563eb;
}
.premium-form-container[_ngcontent-%COMP%]   .session-row[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 4px;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-segment[_ngcontent-%COMP%] {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 4px;
  --background: transparent;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --indicator-color: #ffffff;
  --color: #64748b;
  --color-checked: #1e293b;
  --border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  min-height: 36px;
  text-transform: none;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]::part(indicator-background) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.premium-form-container[_ngcontent-%COMP%]   .premium-input-wrapper[_ngcontent-%COMP%], 
.premium-form-container[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%], 
.premium-form-container[_ngcontent-%COMP%]   .premium-textarea-wrapper[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.premium-form-container[_ngcontent-%COMP%]   .premium-input-wrapper[_ngcontent-%COMP%]:focus-within, 
.premium-form-container[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]:focus-within, 
.premium-form-container[_ngcontent-%COMP%]   .premium-textarea-wrapper[_ngcontent-%COMP%]:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
.premium-form-container[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --padding-end: 40px;
  --padding-top: 14px;
  --padding-bottom: 14px;
  width: 100%;
  height: 48px;
}
.premium-form-container[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]   .select-chevron[_ngcontent-%COMP%] {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #6b7280;
  pointer-events: none;
  z-index: 2;
}
.premium-form-container[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]::part(icon) {
  display: none;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-input[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --padding-end: 40px;
  --padding-top: 14px;
  --padding-bottom: 14px;
  font-size: 15px;
  color: #1f2937;
  --placeholder-color: #9ca3af;
  --background: transparent;
  margin: 0;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-input.with-left-icon[_ngcontent-%COMP%] {
  --padding-start: 44px;
  --padding-end: 16px;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-input.with-cursor[_ngcontent-%COMP%] {
  cursor: pointer;
}
.premium-form-container[_ngcontent-%COMP%]   .premium-textarea[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 30px;
  font-size: 15px;
  color: #1f2937;
  --placeholder-color: #9ca3af;
  --background: transparent;
  margin: 0;
}
.premium-form-container[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%] {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #6b7280;
  pointer-events: none;
  z-index: 2;
}
.premium-form-container[_ngcontent-%COMP%]   .input-icon-left[_ngcontent-%COMP%] {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #6b7280;
  pointer-events: none;
  z-index: 2;
}
.premium-form-container[_ngcontent-%COMP%]   .word-count[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  color: #9ca3af;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
}
.premium-form-container[_ngcontent-%COMP%]   .word-count.warning[_ngcontent-%COMP%] {
  color: #ef4444;
  background: #fef2f2;
}
.premium-form-container[_ngcontent-%COMP%]   .total-days-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #eff6ff;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px dashed #bfdbfe;
  align-self: flex-start;
  margin-top: -8px;
}
.premium-form-container[_ngcontent-%COMP%]   .total-days-badge[_ngcontent-%COMP%]   .badge-icon[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
.premium-form-container[_ngcontent-%COMP%]   .total-days-badge[_ngcontent-%COMP%]   .badge-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #2563eb;
}
.premium-form-container[_ngcontent-%COMP%]   .total-days-badge[_ngcontent-%COMP%]   .badge-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.premium-form-container[_ngcontent-%COMP%]   .total-days-badge[_ngcontent-%COMP%]   .badge-content[_ngcontent-%COMP%]   .badge-title[_ngcontent-%COMP%] {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #3b82f6;
  font-weight: 600;
}
.premium-form-container[_ngcontent-%COMP%]   .total-days-badge[_ngcontent-%COMP%]   .badge-content[_ngcontent-%COMP%]   .badge-value[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #1e3a8a;
}
.premium-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {
  margin-top: 10px;
}
.premium-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%] {
  --background:
    linear-gradient(
      135deg,
      #2563eb,
      #1d4ed8);
  --background-hover: #1e40af;
  --box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  --padding-top: 18px;
  --padding-bottom: 18px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
  height: 54px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.premium-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]::part(native) {
  border-radius: 14px;
}
.premium-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.premium-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .submit-btn[disabled][_ngcontent-%COMP%] {
  --background: #f3f4f6;
  --color: #9ca3af;
  --box-shadow: none;
  opacity: 0.8;
}
.premium-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  margin-left: 8px;
  font-size: 18px;
}
.premium-form-container[_ngcontent-%COMP%]   .fade-in[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.premium-form-container[_ngcontent-%COMP%]   .datetime-footer[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}
.premium-form-container[_ngcontent-%COMP%]   .datetime-footer[_ngcontent-%COMP%]   .highlight-off[_ngcontent-%COMP%] {
  width: 12px;
  height: 12px;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
  display: inline-block;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
ion-datetime[_ngcontent-%COMP%] {
  --background: #ffffff;
  --background-rgb:
    255,
    255,
    255;
  border-radius: 16px;
  overflow: hidden;
}
ion-datetime[_ngcontent-%COMP%]::part(calendar-day) {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  border-radius: 10px;
}
ion-datetime[_ngcontent-%COMP%]::part(calendar-day-active) {
  background: #2563eb !important;
  color: #ffffff !important;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}
ion-datetime[_ngcontent-%COMP%]::part(calendar-day-today) {
  color: #2563eb;
  background: #eff6ff;
  font-weight: 700;
}
ion-datetime[_ngcontent-%COMP%]::part(header) {
  background: #f9fafb;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}
ion-datetime[_ngcontent-%COMP%]::part(month-year-button) {
  font-weight: 700;
  color: #111827;
}
.premium-popover[_ngcontent-%COMP%] {
  --width: 320px;
  --box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.premium-popover[_ngcontent-%COMP%]::part(content) {
  border-radius: 20px;
  border: 1px solid rgba(229, 231, 235, 0.5);
}
[_nghost-%COMP%] {
  display: block;
}`]});let r=c;return r})();function rt(r,c){r&1&&_(0,"ion-spinner",39)}function st(r,c){r&1&&_(0,"ion-icon",40)}function lt(r,c){if(r&1){let a=T();o(0,"ion-button",36),f("click",function(){b(a);let n=m();return C(n.initializeLeaves())}),u(1,rt,1,0,"ion-spinner",37)(2,st,1,0,"ion-icon",38),s(3," Initialize Balance "),i()}if(r&2){let a=m();g("disabled",a.initializingLeaves),l(),g("ngIf",a.initializingLeaves),l(),g("ngIf",!a.initializingLeaves)}}function ct(r,c){if(r&1&&_(0,"img",52),r&2){let a=m().$implicit,e=m();g("src",e.env+a.icon_path,V)}}function dt(r,c){if(r&1&&_(0,"ion-icon",53),r&2){let a=m().$implicit;g("name",a.title!=null&&a.title.toLowerCase().includes("sick")?"medkit-outline":a.title!=null&&a.title.toLowerCase().includes("vacation")||a.title!=null&&a.title.toLowerCase().includes("earned")?"airplane-outline":a.title!=null&&a.title.toLowerCase().includes("casual")?"umbrella-outline":"calendar-outline")}}function pt(r,c){if(r&1&&(o(0,"div",41)(1,"h3",42),s(2),i(),o(3,"div",43)(4,"div",44),u(5,ct,1,1,"img",45)(6,dt,1,1,"ion-icon",46),i()(),o(7,"div",47)(8,"span",48),s(9),i(),o(10,"span",49),s(11,"/"),i(),o(12,"span",50),s(13),i()(),o(14,"p",51),s(15,"days available"),i()()),r&2){let a=c.$implicit,e=m();l(2),h(a.title),l(2),nn("background-color",a.bg_color||"")("border-color",a.bg_color||""),ke("has-custom-bg",!!a.bg_color),l(),g("ngIf",a.icon_path),l(),g("ngIf",!a.icon_path),l(3),h(a.isLOP?e.combinedLopDays:a.available),l(4),h(a.allocated_days)}}function gt(r,c){if(r&1&&(o(0,"div",54),s(1),i()),r&2){let a=m();l(),O("",a.pendingLeaves.length," Requests")}}function mt(r,c){if(r&1&&(o(0,"div",68),s(1),i()),r&2){let a=m().$implicit;l(),h(a.half_day_session)}}function ft(r,c){if(r&1){let a=T();o(0,"tr",57),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.openPopup(n))}),o(1,"td")(2,"div",58)(3,"div"),s(4),w(5,"date"),w(6,"date"),i()()(),o(7,"td",59)(8,"div",60)(9,"span",61),s(10),i()()(),o(11,"td",62),s(12),u(13,mt,2,1,"div",63),i(),o(14,"td",64),s(15),i(),o(16,"td",65),s(17),w(18,"date"),i(),o(19,"td",66),s(20,"HR Legalists"),i(),o(21,"td")(22,"span",67),s(23,"Pending"),i()()()}if(r&2){let a=c.$implicit,e=m(2);l(4),L("",I(5,8,a.from_date,"MMM d")," - ",I(6,11,a.to_date,"MMM d")),l(4),g("ngClass","leave-badge "+e.getLeaveTypeClass(a.leave_type)),l(2),h(a.leave_type),l(2),O(" ",a.days," "),l(),g("ngIf",a.is_half_day),l(2),h(a.reason||"-"),l(2),h(I(18,14,a.applied_on,"dd-MM-yyyy"))}}function _t(r,c){if(r&1&&(o(0,"div",55)(1,"table")(2,"thead")(3,"tr")(4,"th"),s(5,"Period"),i(),o(6,"th"),s(7,"Type"),i(),o(8,"th"),s(9,"Days"),i(),o(10,"th"),s(11,"Reason"),i(),o(12,"th"),s(13,"Submitted On"),i(),o(14,"th"),s(15,"Applied to"),i(),o(16,"th"),s(17,"Status"),i()()(),o(18,"tbody"),u(19,ft,24,17,"tr",56),i()()()),r&2){let a=m();l(19),g("ngForOf",a.pendingLeaves)}}function ut(r,c){r&1&&(o(0,"div",69)(1,"h3"),s(2,"All Caught Up!"),i(),o(3,"p"),s(4,"You have no pending leave requests at the moment."),i()())}function ht(r,c){if(r&1&&(o(0,"div",68),s(1),i()),r&2){let a=m().$implicit;l(),h(a.half_day_session)}}function vt(r,c){if(r&1){let a=T();o(0,"tr",57),f("click",function(){let n=b(a).$implicit,t=m(2);return C(t.openPopup(n))}),o(1,"td")(2,"div",58)(3,"div"),s(4),w(5,"date"),w(6,"date"),i(),o(7,"small"),s(8,"Processed"),i()()(),o(9,"td",70),s(10),i(),o(11,"td",62),s(12),u(13,ht,2,1,"div",63),i(),o(14,"td")(15,"span",71),s(16),i()()()}if(r&2){let a=c.$implicit;l(4),L("",I(5,7,a.from_date,"MMM d")," - ",I(6,10,a.to_date,"MMM d")),l(6),h(a.leave_type),l(2),O(" ",a.days," "),l(),g("ngIf",a.is_half_day),l(2),g("ngClass",a.status),l(),O(" ",a.status," ")}}function bt(r,c){if(r&1&&(o(0,"div",55)(1,"table")(2,"thead")(3,"tr")(4,"th"),s(5,"Period"),i(),o(6,"th"),s(7,"Type"),i(),o(8,"th"),s(9,"Days"),i(),o(10,"th"),s(11,"Status"),i()()(),o(12,"tbody"),u(13,vt,17,13,"tr",56),i()()()),r&2){let a=m();l(13),g("ngForOf",a.historyLeaves)}}function Ct(r,c){r&1&&(o(0,"div",72),_(1,"ion-icon",73),o(2,"h3"),s(3,"No History Found"),i(),o(4,"p"),s(5,"Your processed leave history will appear here."),i()())}function xt(r,c){if(r&1){let a=T();o(0,"ion-header")(1,"ion-toolbar",74)(2,"ion-title"),s(3,"Create Leave Request"),i(),o(4,"ion-buttons",75)(5,"ion-button",57),f("click",function(){b(a);let n=m();return C(n.closeleavePopup())}),_(6,"ion-icon",76),i()()()(),o(7,"ion-content",77)(8,"app-leave-request",78),f("leaveSubmitted",function(){b(a);let n=m();return C(n.onLeaveSubmitted())}),i()()}}function Mt(r,c){if(r&1&&(o(0,"span"),s(1),w(2,"date"),i()),r&2){let a=m(2);l(),O("\u2014 ",I(2,1,a.selectedLeave==null?null:a.selectedLeave.to_date,"MMMM d, y"))}}function Pt(r,c){if(r&1&&(o(0,"span",86),s(1),i()),r&2){let a=m(2);l(),O("(",a.selectedLeave==null?null:a.selectedLeave.half_day_session,")")}}function Ot(r,c){if(r&1){let a=T();o(0,"ion-header")(1,"ion-toolbar",79)(2,"ion-title"),s(3,"Leave Detail"),i(),o(4,"ion-buttons",75)(5,"ion-button",57),f("click",function(){b(a);let n=m();return C(n.closePopup())}),_(6,"ion-icon",76),i()()()(),o(7,"ion-content",77)(8,"div",80)(9,"div",81)(10,"h3",60),s(11),i(),o(12,"p"),s(13),i()(),o(14,"ion-list",82)(15,"ion-item")(16,"ion-label")(17,"p"),s(18),w(19,"date"),u(20,Mt,3,4,"span",83),i(),o(21,"p")(22,"strong"),s(23),i(),u(24,Pt,2,1,"span",84),i()()(),o(25,"ion-item")(26,"ion-label")(27,"h2"),s(28,"Reason"),i(),o(29,"p",85),s(30),i()()()()()()}if(r&2){let a=m();l(10),g("ngClass",a.selectedLeave==null?null:a.selectedLeave.status),l(),h(a.selectedLeave==null?null:a.selectedLeave.status),l(2),h(a.selectedLeave==null?null:a.selectedLeave.leave_type),l(5),O("",I(19,9,a.selectedLeave==null?null:a.selectedLeave.from_date,"MMMM d, y")," "),l(2),g("ngIf",!(a.selectedLeave!=null&&a.selectedLeave.is_half_day)),l(3),L("",a.selectedLeave==null?null:a.selectedLeave.days," ",(a.selectedLeave==null?null:a.selectedLeave.days)===.5?"Half Day":"Days Total"),l(),g("ngIf",a.selectedLeave==null?null:a.selectedLeave.is_half_day),l(6),h((a.selectedLeave==null?null:a.selectedLeave.reason)||"No reason provided")}}var In=(()=>{let c=class c{constructor(e,n,t,d,p,x,M,y){this.employeeLeaves=e,this.leaveRequestService=n,this.routeGuardService=t,this.employeeService=d,this.attendanceApi=p,this.toastCtrl=x,this.modalCtrl=M,this.router=y,this.destroy$=new Je,this.currentYear=new Date().getFullYear(),this.IsOpenleavePopup=!1,this.isPopupOpen=!1,this.selectedLeave=null,this.currentMonthFirstDateText="",this.leaveCards=[],this.leaveRequestsDetails=[],this.teamAttendanceSummary=null,this.attendanceLopDays=0,this.pendingLeaves=[],this.historyLeaves=[],this.combinedLopDays=0,this.isManager=!1,this.userRole=null,this.initializingLeaves=!1,this.needsInitialization=!1,this.env=""}ngOnInit(){this.env=N.apiURL.startsWith("http")?N.apiURL:`http://${N.apiURL}`,this.updateRole(),this.loadLeaveBalance(),this.getAllLeaves(),this.loadCurrentMonthLOP(),this.setCurrentMonthFirstDate(),this.isManager&&this.loadTeamAttendanceSummary()}updateRole(){this.userRole=this.routeGuardService.userRole?.toLowerCase()||null,this.isManager=this.userRole==="manager"||this.userRole==="hr"}loadLeaveBalance(){this.employeeLeaves.getLeaveBalance(this.currentYear).subscribe({next:e=>{let n=e.balances||[];this.needsInitialization=e.needs_initialization||!1,this.leaveCards=n.map(t=>{let d=(t.type_code||"").toUpperCase(),p=d==="LOP",x=Number(t.allocated_days)||0,M=Number(t.used_days)||0,y=(Number(t.available_days)||0)-(Number(t.pending_days)||0);return{title:t.type_name,code:d,allocated_days:p?"0":x,used:M,available:p?"0":y,isLOP:p,usedPercent:p?0:x>0?Math.round(M/x*100):0,bg_color:t.bg_color,icon_path:t.icon_path}})},error:e=>console.error(e)})}loadTeamAttendanceSummary(){this.employeeService.getTeamAttendanceReport().subscribe({next:e=>{this.teamAttendanceSummary=e},error:e=>console.error("Error fetching team attendance summary:",e)})}getAllLeaves(){this.leaveRequestService.getMyLeaves(this.currentYear).subscribe({next:e=>{this.leaveRequestsDetails=e.map(n=>({id:n.id,leave_type:n.type_name,type_code:(n.type_code||"").toUpperCase(),from_date:n.start_date,to_date:n.end_date,days:Number(n.total_days),status:n.status.toUpperCase(),applied_on:n.applied_at,reason:n.reason,is_half_day:n.is_half_day,half_day_session:n.half_day_session})),this.updateHistoryAndPendingLeaves()},error:e=>console.error("Error fetching leave details:",e)})}loadCurrentMonthLOP(){let e=new Date,n=e.getFullYear(),t=e.getMonth()+1,d=`${n}-${String(t).padStart(2,"0")}-01`,p=new Date(n,t,0).getDate(),x=`${n}-${String(t).padStart(2,"0")}-${String(p).padStart(2,"0")}`;this.attendanceApi.getMonthlyReport({startDate:d,endDate:x,month:t,year:n}).subscribe({next:M=>{this.attendanceLopDays=Number(M?.summary?.lop_days??M?.lop_days??0),this.updateHistoryAndPendingLeaves()},error:M=>console.error("Error fetching LOP data:",M)})}openLeaveModal(){this.IsOpenleavePopup=!0}closeleavePopup(){this.IsOpenleavePopup=!1}openPopup(e){this.selectedLeave=e,this.isPopupOpen=!0}closePopup(){this.isPopupOpen=!1,this.selectedLeave=null}initializeLeaves(){return P(this,null,function*(){if(this.initializingLeaves=!0,!Number(this.routeGuardService.employeeID)){this.presentToast("User ID not found","danger"),this.initializingLeaves=!1;return}this.employeeService.getMyProfile().subscribe({next:n=>{let t=n.leave_plan_id||1;this.employeeLeaves.initializeBalance(this.currentYear).subscribe({next:()=>{this.presentToast("Leave balances initialized successfully","success"),this.loadLeaveBalance(),this.initializingLeaves=!1},error:d=>{console.error("Initialization error:",d),this.presentToast("Initialization failed","danger"),this.initializingLeaves=!1}})},error:n=>{console.error("Profile fetch error:",n),this.presentToast("Could not find leave plan info","danger"),this.initializingLeaves=!1}})})}onLeaveSubmitted(){this.getAllLeaves(),this.loadLeaveBalance(),this.closeleavePopup()}navigateToTimesheetApprovals(){return P(this,null,function*(){yield(yield this.modalCtrl.create({component:kn,cssClass:"side-custom-popup timesheet-popup",backdropDismiss:!1})).present()})}navigateToLeaveApprovals(){return P(this,null,function*(){yield(yield this.modalCtrl.create({component:Tn,cssClass:"side-custom-popup team-popup",backdropDismiss:!1})).present()})}navigateToAttendanceApprovals(){return P(this,null,function*(){yield(yield this.modalCtrl.create({component:Ln,cssClass:"side-custom-popup team-popup",backdropDismiss:!1})).present()})}navigateToMyTeam(){this.router.navigate(["/MyTeam"])}navigateToTeamReports(){this.router.navigate(["/attendance/reports/team"])}setCurrentMonthFirstDate(){let e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1);this.currentMonthFirstDateText=n.toLocaleDateString("en-US",{month:"short",day:"numeric"})}getLeaveTypeClass(e){let n=e?.toLowerCase()||"";return n.includes("sick")?"sick":n.includes("casual")?"casual":n.includes("marriage")?"marriage":n.includes("comp")||n.includes("comp off")?"comp-offs":n.includes("unpaid")?"unpaid":"default"}updateHistoryAndPendingLeaves(){let e=new Date,n=e.getMonth(),t=e.getFullYear();this.pendingLeaves=this.leaveRequestsDetails.filter(k=>k.status==="PENDING");let d=this.leaveRequestsDetails.filter(k=>{if(k.status!=="APPROVED"||!(k.leave_type?.toLowerCase().includes("loss of pay")||k.type_code==="LOP"))return!1;let we=new Date(k.from_date);return we.getMonth()===n&&we.getFullYear()===t}).reduce((k,$e)=>k+$e.days,0);this.combinedLopDays=this.attendanceLopDays+d;let p=`${t}-${String(n+1).padStart(2,"0")}-01`,x=new Date(t,n+1,0).getDate(),M=`${t}-${String(n+1).padStart(2,"0")}-${String(x).padStart(2,"0")}`,y=this.combinedLopDays>0?{id:"lop-current",leave_type:"Loss of Pay",from_date:p,to_date:M,days:this.combinedLopDays,status:null,is_lop:!0}:null,Me=this.leaveRequestsDetails.filter(k=>(k.status==="APPROVED"||k.status==="REJECTED")&&!(k.leave_type?.toLowerCase().includes("loss of pay")||k.type_code==="LOP"));this.historyLeaves=y?[y,...Me]:Me}presentToast(e,n="success"){return P(this,null,function*(){(yield this.toastCtrl.create({message:e,duration:2e3,color:n,position:"top"})).present()})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};c.\u0275fac=function(n){return new(n||c)(v(je),v(xe),v(Cn),v(Re),v(Mn),v(j),v(ie),v(an))},c.\u0275cmp=E({type:c,selectors:[["app-leaves"]],standalone:!1,decls:52,vars:11,consts:[["noPending",""],["noHistory",""],["fullscreen","",1,"leaves-block"],[1,"content-wrapper"],[1,"page-header"],[1,"header-left"],[1,"header-actions"],["fill","outline","class","init-btn",3,"disabled","click",4,"ngIf"],[1,"request-btn",3,"click"],["name","add-circle","slot","start"],[1,"glass-dashboard"],[1,"balances-section"],[1,"section-header"],[1,"icon-box"],["name","bar-chart"],[1,"balances-grid"],["class","leave-card",4,"ngFor","ngForOf"],[1,"dashboard-grid"],[1,"pending-section"],[1,"pending-card"],[1,"pending-header"],[1,"title-group"],[1,"icon"],["name","time-outline"],["class","pill",4,"ngIf"],["class","history-table",4,"ngIf","ngIfElse"],[1,"history-column"],[1,"history-card"],[1,"history-header"],[1,"count"],["width","0","height","0",2,"position","absolute"],["id","purpleGradient","x1","0%","y1","0%","x2","100%","y2","100%"],["offset","0%","stop-color","#8b5cf6"],["offset","100%","stop-color","#d946ef"],[1,"cute-side-popup",3,"didDismiss","isOpen","animated"],[1,"custom-popup",3,"didDismiss","isOpen"],["fill","outline",1,"init-btn",3,"click","disabled"],["name","crescent","slot","start",4,"ngIf"],["name","sparkles-outline","slot","start",4,"ngIf"],["name","crescent","slot","start"],["name","sparkles-outline","slot","start"],[1,"leave-card"],[1,"card-title"],[1,"icon-container"],[1,"icon-background"],["class","uploaded-icon","alt","icon",3,"src",4,"ngIf"],[3,"name",4,"ngIf"],[1,"days-display"],[1,"available"],[1,"separator"],[1,"total"],[1,"label"],["alt","icon",1,"uploaded-icon",3,"src"],[3,"name"],[1,"pill"],[1,"history-table"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"period"],[1,"type-cell"],[3,"ngClass"],[1,"badge-label"],[1,"days"],["class","half-day-tag",4,"ngIf"],[1,"reason"],[1,"submitted-on"],[1,"applied-to"],[1,"status-pill","PENDING"],[1,"half-day-tag"],[1,"empty-state"],[1,"type"],[1,"status-pill",3,"ngClass"],[1,"no-data"],["name","archive-outline"],[1,"leave-header-toolbar"],["slot","end"],["name","close-outline"],[1,"ion-padding"],[3,"leaveSubmitted"],["color","primary"],[1,"detail-card"],[1,"detail-header"],["lines","full"],[4,"ngIf"],["class","session-badge",4,"ngIf"],[2,"white-space","normal"],[1,"session-badge"]],template:function(n,t){if(n&1){let d=T();o(0,"ion-content",2)(1,"div",3)(2,"header",4)(3,"div",5)(4,"h3"),s(5,"Leaves"),i()(),o(6,"div",6),u(7,lt,4,3,"ion-button",7),o(8,"ion-button",8),f("click",function(){return b(d),C(t.openLeaveModal())}),_(9,"ion-icon",9),s(10," New Request "),i()()(),o(11,"div",10)(12,"section",11)(13,"div",12)(14,"div",13),_(15,"ion-icon",14),i(),o(16,"h2"),s(17,"Leave Balances"),i()(),o(18,"div",15),u(19,pt,16,11,"div",16),i()(),o(20,"div",17)(21,"section",18)(22,"div",19)(23,"div",20)(24,"div",21)(25,"div",22),_(26,"ion-icon",23),i(),o(27,"h2"),s(28,"Pending Approvals"),i()(),u(29,gt,2,1,"div",24),i(),u(30,_t,20,1,"div",25)(31,ut,5,0,"ng-template",null,0,He),i()(),o(33,"div",26)(34,"div",27)(35,"div",28)(36,"h2"),s(37,"Recent History"),i(),o(38,"span",29),s(39),i()(),u(40,bt,14,1,"div",25)(41,Ct,6,0,"ng-template",null,1,He),i()()()()(),Qe(),o(43,"svg",30)(44,"defs")(45,"linearGradient",31),_(46,"stop",32)(47,"stop",33),i()()(),Xe(),o(48,"ion-modal",34),f("didDismiss",function(){return b(d),C(t.closeleavePopup())}),u(49,xt,9,0,"ng-template"),i(),o(50,"ion-modal",35),f("didDismiss",function(){return b(d),C(t.closePopup())}),u(51,Ot,31,12,"ng-template"),i()()}if(n&2){let d=re(32),p=re(42);l(7),g("ngIf",t.needsInitialization),l(12),g("ngForOf",t.leaveCards),l(10),g("ngIf",t.pendingLeaves.length>0),l(),g("ngIf",t.pendingLeaves.length>0)("ngIfElse",d),l(9),O("",t.historyLeaves.length," Records"),l(),g("ngIf",t.historyLeaves.length>0)("ngIfElse",p),l(8),g("isOpen",t.IsOpenleavePopup)("animated",!0),l(2),g("isOpen",t.isPopupOpen)}},dependencies:[U,F,A,z,Q,X,Z,R,_e,ee,un,ne,te,oe,vn,Ve,G],styles:[`

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
.leaves-block[_ngcontent-%COMP%] {
  position: relative;
}
.leaves-block[_ngcontent-%COMP%]::part(background) {
  background: #f4f7fb;
}
.leaves-block[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {
  position: relative;
  z-index: 10;
  margin: 0 auto;
  padding: 32px 24px;
  padding-bottom: 80px;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 8px;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: clamp(1.375rem, 2vw + 0.5rem, 1.25rem) !important;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px 0;
  letter-spacing: -0.05em;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  margin: 0;
  font-weight: 500;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --border-radius: 8px;
  --padding-start: 20px;
  --padding-end: 20px;
  --box-shadow: none;
  font-weight: 600;
  height: 44px;
  margin: 0;
  text-transform: none;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   ion-button.init-btn[_ngcontent-%COMP%] {
  --color: #1F74BB;
  --border-color: #ABABAB;
  --background: #ffffff;
  border: 1px solid #ABABAB;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   ion-button.request-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #ffffff;
}
.leaves-block[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   ion-button.request-btn[_ngcontent-%COMP%]:hover {
  --background: #1F74BB;
}
.leaves-block[_ngcontent-%COMP%]   .glass-dashboard[_ngcontent-%COMP%]   .dashboard-grid[_ngcontent-%COMP%] {
  display: grid;
  gap: 24px;
}
@media (max-width: 1200px) {
  .leaves-block[_ngcontent-%COMP%]   .glass-dashboard[_ngcontent-%COMP%]   .dashboard-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.leaves-block[_ngcontent-%COMP%]   .balances-section[_ngcontent-%COMP%] {
  margin-bottom: 40px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  padding-top: 0px;
}
.leaves-block[_ngcontent-%COMP%]   .balances-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.leaves-block[_ngcontent-%COMP%]   .balances-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #e8f0fb;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
}
.leaves-block[_ngcontent-%COMP%]   .balances-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 18px;
}
.leaves-block[_ngcontent-%COMP%]   .balances-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  color: #212529;
  font-size: 18px;
  font-weight: 700;
}
.leaves-block[_ngcontent-%COMP%]   .balances-section[_ngcontent-%COMP%]   .balances-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 14px;
  padding: 28px 24px;
  border: 1px solid #ABABAB;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 280px;
  justify-content: space-between;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%] {
  color: #ffffff;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  color: #ffffff;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%]   .available[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%]   .total[_ngcontent-%COMP%] {
  color: #ffffff;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.85);
}
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]   .icon-background[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.leaves-block[_ngcontent-%COMP%]   .leave-card.has-custom-bg[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]   .icon-background[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #ffffff;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 16px 0;
  letter-spacing: 0.3px;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {
  margin: 8px 0 20px 0;
  display: flex;
  justify-content: center;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]   .icon-background[_ngcontent-%COMP%] {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.15);
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]   .icon-background[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 36px;
  color: #a855f7;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]   .icon-background[_ngcontent-%COMP%]   .uploaded-icon[_ngcontent-%COMP%] {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%] {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 12px;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%]   .available[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #1870B9;
  font-weight: 700;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #1870B9;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .days-display[_ngcontent-%COMP%]   .total[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #1870B9;
  font-weight: 700;
}
.leaves-block[_ngcontent-%COMP%]   .leave-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #626262;
  text-transform: lowercase;
}
.leaves-block[_ngcontent-%COMP%]   .pending-card[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.leaves-block[_ngcontent-%COMP%]   .pending-header[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0px 16px;
}
.leaves-block[_ngcontent-%COMP%]   .pending-header[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.leaves-block[_ngcontent-%COMP%]   .pending-header[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #1F74BB;
}
.leaves-block[_ngcontent-%COMP%]   .pending-header[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  color: #0f172a;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  margin: 0;
}
.leaves-block[_ngcontent-%COMP%]   .pending-header[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .pending-header[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 700;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 12px 16px;
  text-align: left;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 14px 16px;
  color: #1e293b;
  font-size: 13px;
  border-top: 1px solid #ABABAB;
  text-align: left;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .period[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: 13px;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  font-size: 13px;
  text-align: center;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .reason[_ngcontent-%COMP%] {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .submitted-on[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #1e293b;
}
.leaves-block[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .applied-to[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #1e293b;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: capitalize;
  white-space: nowrap;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge[_ngcontent-%COMP%]   .badge-label[_ngcontent-%COMP%] {
  display: block;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge.sick[_ngcontent-%COMP%] {
  background: #d4f5f1;
  color: #0b8a78;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge.casual[_ngcontent-%COMP%] {
  background: #f3e5f5;
  color: #6a1b9a;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge.marriage[_ngcontent-%COMP%] {
  background: #ffe0b2;
  color: #e65100;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge.comp-offs[_ngcontent-%COMP%] {
  background: #bbdefb;
  color: #1565c0;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge.unpaid[_ngcontent-%COMP%] {
  background: #f8bbd0;
  color: #c2185b;
}
.leaves-block[_ngcontent-%COMP%]   .leave-badge.default[_ngcontent-%COMP%] {
  background: #e0e0e0;
  color: #424242;
}
.leaves-block[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  display: inline-block;
}
.leaves-block[_ngcontent-%COMP%]   .status-pill.APPROVED[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.leaves-block[_ngcontent-%COMP%]   .status-pill.PENDING[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
.leaves-block[_ngcontent-%COMP%]   .status-pill.REJECTED[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.leaves-block[_ngcontent-%COMP%]   .status-pill.CANCELLED[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #475569;
  border: 1px solid #ABABAB;
}
.leaves-block[_ngcontent-%COMP%]   .status-pill.LOP[_ngcontent-%COMP%] {
  background: #fff3e0;
  color: #e65100;
  border: 1px solid #ffcc80;
}
.leaves-block[_ngcontent-%COMP%]   .half-day-tag[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 2px 8px;
  background: #e8f0fb;
  color: #1F74BB;
  border-radius: 4px;
  font-size: 9px;
  margin-top: 4px;
  font-weight: 700;
  text-transform: uppercase;
}
.leaves-block[_ngcontent-%COMP%]   .session-badge[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #1e293b;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  margin-left: 8px;
  font-weight: 600;
}
.leaves-block[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%] {
  text-align: center;
  padding: 48px 0;
}
.leaves-block[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 40px;
  color: #94a3b8;
  margin-bottom: 16px;
}
.leaves-block[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}
.leaves-block[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], 
.leaves-block[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.custom-popup[_ngcontent-%COMP%], 
.cute-side-popup[_ngcontent-%COMP%] {
  --border-radius: 16px;
  --box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
}
.custom-popup[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%], 
.cute-side-popup[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --color: #0f172a;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 20px;
  --padding-end: 20px;
  border-bottom: 1px solid #f1f5f9;
}
.custom-popup[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%], 
.cute-side-popup[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
}
.custom-popup[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.cute-side-popup[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 22px;
}
.custom-popup[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%], 
.cute-side-popup[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {
  --background: #f4f7fb;
}
.detail-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #ABABAB;
}
.detail-card[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%] {
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 24px;
}
.detail-card[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.detail-card[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.detail-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {
  --padding-start: 0;
  --background: transparent;
  margin-bottom: 16px;
}
.detail-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.detail-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
}
.history-card[_ngcontent-%COMP%] {
  width: 50%;
}`]});let r=c;return r})();var yt=[{path:"",component:In}],vo=(()=>{let c=class c{};c.\u0275fac=function(n){return new(n||c)},c.\u0275mod=Ze({type:c}),c.\u0275inj=Ke({imports:[B,J,Te,q,rn.forChild(yt),Ve]});let r=c;return r})();export{vo as LeavesPageModule};
