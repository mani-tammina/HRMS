import{a as ln}from"./chunk-4YKNXFJR.js";import{a as Te}from"./chunk-VD3H5WUS.js";import{a as an}from"./chunk-7NMYRTZJ.js";import{a as on}from"./chunk-HHMVNW2S.js";import{a as we}from"./chunk-DA4OVRGX.js";import{a as rn}from"./chunk-6KXWZ6DT.js";import{a as be}from"./chunk-GKMRXCVX.js";import{a as W}from"./chunk-NDCRD3QG.js";import{$ as Xe,A as G,Aa as Oe,B as ne,Da as j,F as te,Fa as he,G as ye,Ga as Z,H as A,I as J,J as ce,K as se,L as de,N as me,P as Ue,Q as pe,R as D,S as Ye,T as Ge,V as Je,W as L,X as R,Y as Qe,Z as Pe,_ as Q,d as H,fa as oe,g as U,ga as ie,ha as ge,ia as re,ja as Ke,ka as Ze,la as fe,ma as ue,na as z,qa as en,ra as X,ta as K,u as Y,va as _e,w as He,ya as nn,za as tn}from"./chunk-B3PLR2IL.js";import{$a as P,Ba as y,Ca as f,Da as u,Eb as $,F as Le,K as b,Ka as ze,L as x,La as Be,Ma as le,Oa as a,Pa as _,Qa as O,Ra as I,Ta as w,Ua as T,Va as S,Vb as qe,Ya as je,Z as ee,Zb as $e,_ as l,ab as V,bb as k,ca as v,ea as E,eb as We,fa as Re,ja as C,pb as N,qb as B,ra as m,rb as F,sa as n,t as De,ta as t,ua as g,wb as Ve,xb as Ne,yb as q}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as Fe,b as Ae,e as M}from"./chunk-JHI3MBHO.js";function _n(c,s){if(c&1&&(n(0,"ion-select-option",15),a(1),t()),c&2){let r=s.$implicit;m("value",r.type_code),l(),O(" ",r.type_name," ")}}function hn(c,s){c&1&&(n(0,"div",16),g(1,"ion-spinner",17),n(2,"p"),a(3,"Loading pending leave requests..."),t()())}function bn(c,s){c&1&&(n(0,"ion-row",18)(1,"ion-col",19),g(2,"img",20),n(3,"p",21),a(4,"No Pending Leaves."),t()()())}function xn(c,s){if(c&1&&(n(0,"div",40)(1,"label"),a(2,"Reason:"),t(),n(3,"p"),a(4),t()()),c&2){let r=u().$implicit;l(4),_(r.reason)}}function Cn(c,s){if(c&1){let r=y();n(0,"ion-card",24)(1,"ion-card-header")(2,"div",25)(3,"div",26)(4,"ion-avatar",27),g(5,"img",28),t(),n(6,"div",29)(7,"ion-card-title"),a(8),t(),n(9,"p",30),a(10),t()()(),n(11,"ion-badge",31),a(12),t()()(),n(13,"ion-card-content")(14,"div",32)(15,"div")(16,"label"),a(17,"Leave Type:"),t(),n(18,"p"),a(19),t()(),n(20,"div")(21,"label"),a(22,"Start Date - End Date"),t(),n(23,"p"),a(24),P(25,"date"),P(26,"date"),t()(),n(27,"div")(28,"label"),a(29,"Duration:"),t(),n(30,"p",33),a(31),t()(),n(32,"div")(33,"label"),a(34,"Applied On:"),t(),n(35,"p"),a(36),P(37,"date"),t()()(),C(38,xn,5,1,"div",34),n(39,"div",35)(40,"ion-textarea",36),S("ngModelChange",function(i){let o=b(r).$implicit,d=u(2);return T(d.rejectionReasons[o.id],i)||(d.rejectionReasons[o.id]=i),x(i)}),t()(),n(41,"div",37)(42,"ion-button",38),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.rejectLeave(i))}),a(43,"Reject"),t(),n(44,"ion-button",39),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.approveLeave(i))}),a(45,"Approve"),t()()()()}if(c&2){let r=s.$implicit,e=u(2);l(5),m("src",e.getProfileImage(r),ee),l(3),I("",r.FirstName," ",r.LastName),l(2),_(r.EmployeeNumber),l(),m("ngClass",e.getStatusColor(r.status)),l(),O(" ",r.status||"pending"," "),l(7),I("",r.type_name," (",r.type_code,")"),l(5),I("",k(25,14,r.start_date,"mediumDate")," - ",k(26,17,r.end_date,"mediumDate")),l(7),O("",r.total_days," day(s)"),l(5),_(V(37,20,r.applied_at)),l(2),m("ngIf",r.reason),l(2),w("ngModel",e.rejectionReasons[r.id])}}function vn(c,s){if(c&1&&(n(0,"div",22),C(1,Cn,46,22,"ion-card",23),t()),c&2){let r=u();l(),m("ngForOf",r.filteredLeaves)}}var cn=(()=>{let s=class s{constructor(e,i,o,d){this.leaveRequestService=e,this.leaveTypeService=i,this.toastController=o,this.modalCtrl=d,this.pendingLeaves=[],this.filteredLeaves=[],this.leaveTypes=[],this.isLoading=!1,this.searchTerm="",this.leaveTypeFilter="all",this.rejectionReasons={}}ngOnInit(){this.loadLeaveTypes(),this.loadPendingLeaves()}ionViewWillEnter(){this.ngOnInit()}loadLeaveTypes(){this.leaveTypeService.getLeaveTypes().subscribe({next:e=>{this.leaveTypes=e.sort((i,o)=>i.type_name.localeCompare(o.type_name))},error:e=>{console.error("Error loading leave types:",e),this.showToast("Failed to load leave types","danger")}})}loadPendingLeaves(){this.isLoading=!0,this.leaveRequestService.getPendingLeaveRequests().subscribe({next:e=>{this.pendingLeaves=e,this.applyFilters(),this.isLoading=!1},error:e=>{console.error("Error loading pending leaves:",e),this.showToast("Failed to load pending leaves","danger"),this.isLoading=!1}})}applyFilters(){this.filteredLeaves=this.pendingLeaves.filter(e=>{let i=!this.searchTerm||`${e.FirstName} ${e.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())||e.EmployeeNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()),o=this.leaveTypeFilter==="all"||e.type_code===this.leaveTypeFilter;return i&&o})}onSearchChange(e){this.searchTerm=e.detail.value||"",this.applyFilters()}onTypeFilterChange(e){this.leaveTypeFilter=e.detail.value,this.applyFilters()}approveLeave(e){this.isLoading=!0,this.leaveRequestService.approveLeave(e.id,"Approved").subscribe({next:()=>{this.showToast("Leave approved successfully","success"),this.loadPendingLeaves()},error:i=>{console.error("Error approving leave:",i),this.showToast(i.error?.error||"Failed to approve leave","danger"),this.isLoading=!1}})}rejectLeave(e){let i=(this.rejectionReasons[e.id]||"").trim();if(!i){this.showToast("Please enter a rejection reason before rejecting.","warning");return}this.isLoading=!0,this.leaveRequestService.rejectLeave(e.id,i).subscribe({next:()=>{this.showToast("Leave rejected successfully","success"),this.rejectionReasons[e.id]="",this.loadPendingLeaves()},error:o=>{console.error("Error rejecting leave:",o),this.showToast(o.error?.error||"Failed to reject leave","danger"),this.isLoading=!1}})}showToast(e,i="dark"){return M(this,null,function*(){yield(yield this.toastController.create({message:e,duration:3e3,position:"bottom",color:i})).present()})}handleRefresh(e){this.loadPendingLeaves(),setTimeout(()=>{e.target.complete()},1e3)}getStatusColor(e){return{pending:"pending",approved:"accept",rejected:"reject"}[e?.toLowerCase()]||"medium"}getProfileImage(e){return e?.profile_image?`http://${W.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}goBack(){return M(this,null,function*(){yield this.modalCtrl.dismiss()})}};s.\u0275fac=function(i){return new(i||s)(v(on),v(rn),v(he),v(j))},s.\u0275cmp=E({type:s,selectors:[["app-manager-leave-approvals"]],decls:27,vars:6,consts:[["slot","start"],["defaultHref","/MyTeam",3,"click"],["slot","end"],[3,"click"],["name","refresh","slot","icon-only"],["placeholder","Search employee...",3,"ionInput","debounce"],["lines","none"],[1,"select-tag","row-right"],["interface","popover","toggleIcon","chevron-down","expandedIcon","chevron-up",3,"ngModelChange","ionChange","ngModel"],["value","all"],[3,"value",4,"ngFor","ngForOf"],["slot","fixed",3,"ionRefresh"],["class","loading-container",4,"ngIf"],["class","no-leaves",4,"ngIf"],["class","requests-container",4,"ngIf"],[3,"value"],[1,"loading-container"],["name","crescent"],[1,"no-leaves"],["size","12",1,"ion-text-center"],["src","assets/icon/no_leavedata_img.svg","onerror","this.src='../../assets/Profile_Picture.png'"],[1,"no-data-text"],[1,"requests-container"],["class","wfh-card",4,"ngFor","ngForOf"],[1,"wfh-card"],[1,"card-header-content","row-space-between"],[1,"row-left"],[1,"employee-avatar","mr-8"],[3,"src"],[1,"employee-info"],[1,"employee-number"],[3,"ngClass"],[1,"row-space-between"],[1,"total-days"],["class","info-row",4,"ngIf"],[1,"rejection-reason-block"],["placeholder","Enter rejection reason (required to reject)...","rows","2","auto-grow","false",1,"rejection-textarea",3,"ngModelChange","ngModel"],[1,"row-right","action-btns"],[1,"primary-outline-btn",3,"click"],[1,"primary-btn",3,"click"],[1,"info-row"]],template:function(i,o){i&1&&(n(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-back-button",1),f("click",function(){return o.goBack()}),t()(),n(4,"ion-title"),a(5,"Leave Approvals"),t(),n(6,"ion-buttons",2)(7,"ion-button",3),f("click",function(){return o.loadPendingLeaves()}),g(8,"ion-icon",4),t()()(),n(9,"ion-toolbar")(10,"ion-searchbar",5),f("ionInput",function(p){return o.onSearchChange(p)}),t()(),n(11,"ion-toolbar")(12,"ion-item",6)(13,"div",7)(14,"ion-label"),a(15,"Leave Type:"),t(),n(16,"div")(17,"ion-select",8),S("ngModelChange",function(p){return T(o.leaveTypeFilter,p)||(o.leaveTypeFilter=p),p}),f("ionChange",function(p){return o.onTypeFilterChange(p)}),n(18,"ion-select-option",9),a(19,"Select Leaves"),t(),C(20,_n,2,2,"ion-select-option",10),t()()()()()(),n(21,"ion-content")(22,"ion-refresher",11),f("ionRefresh",function(p){return o.handleRefresh(p)}),g(23,"ion-refresher-content"),t(),C(24,hn,4,0,"div",12)(25,bn,5,0,"ion-row",13)(26,vn,2,1,"div",14),t()),i&2&&(l(10),m("debounce",300),l(7),w("ngModel",o.leaveTypeFilter),l(3),m("ngForOf",o.leaveTypes),l(4),m("ngIf",o.isLoading),l(),m("ngIf",!o.isLoading&&o.filteredLeaves.length===0),l(),m("ngIf",!o.isLoading&&o.filteredLeaves.length>0))},dependencies:[$,N,B,F,Y,H,U,Z,te,ye,A,J,ce,se,de,me,pe,D,L,R,Pe,Q,oe,ie,ge,re,fe,ue,z,en,X,K,G,ne,_e,q],styles:[`

.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #555;
  font-size: 15px;
}
.no-leaves[_ngcontent-%COMP%] {
  margin-top: 40px;
}
.no-leaves[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 180px;
  opacity: 0.7;
}
.no-leaves[_ngcontent-%COMP%]   .no-data-text[_ngcontent-%COMP%] {
  color: #888;
  font-size: 14px;
  margin-top: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 8px;
  border: 0.74px solid #ABABAB;
  box-shadow: none;
  margin: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #707070;
  font-size: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #333333;
  margin: 4px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  background: #E6F4FF;
  border-radius: 6px;
  padding: 8px;
  margin: 12px 0;
  width: 100%;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 14px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  min-height: 30px;
  height: 36px;
  font-size: 14px;
  text-transform: capitalize;
}
.primary-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #fff;
  --border-radius: 8px;
  margin-left: 8px;
}
.primary-outline-btn[_ngcontent-%COMP%] {
  --background: transparent;
  --color: #1A2B3C;
  --border-radius: 8px;
  border: 1px solid #1A2B3C;
}
.action-btns[_ngcontent-%COMP%] {
  margin-top: 12px;
}
.reject[_ngcontent-%COMP%] {
  background: #FFD8D8;
  color: #C80000;
  border-radius: 8px;
}
.accept[_ngcontent-%COMP%] {
  background: #d4f8e8;
  color: #0a7d44;
  border-radius: 8px;
}
.pending[_ngcontent-%COMP%] {
  background: #fff3cd;
  color: #856404;
  border-radius: 8px;
}
.total-days[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-weight: 600;
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
.rejection-textarea[_ngcontent-%COMP%] {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 8px;
  --background: #fafafa;
}
ion-searchbar[_ngcontent-%COMP%] {
  --background: #fff;
  border-radius: 8px;
  --box-shadow: none;
  border: 1px solid #ABABAB;
  height: 42px;
  margin-left: 8px;
  width: 95%;
}
ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 600;
}
.employee-number[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #888;
  margin: 0;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.mr-8[_ngcontent-%COMP%] {
  margin-right: 8px;
}`]});let c=s;return c})();function yn(c,s){if(c&1&&(n(0,"ion-chip",24)(1,"ion-label"),a(2),t()()),c&2){let r=u();l(2),O("",r.filteredTimesheets.length," Pending Request(s)")}}function Pn(c,s){c&1&&(n(0,"div",25),g(1,"ion-spinner"),n(2,"p"),a(3,"Loading pending timesheets..."),t()())}function On(c,s){if(c&1&&(n(0,"div",44)(1,"label"),a(2,"Project:"),t(),n(3,"p"),a(4),t()()),c&2){let r=u().$implicit;l(4),I("",r.project_name," (",r.project_code,")")}}function wn(c,s){if(c&1&&(n(0,"div",45)(1,"label"),a(2,"Client:"),t(),n(3,"p"),a(4),t()()),c&2){let r=u().$implicit;l(4),_(r.client_name)}}function Tn(c,s){if(c&1){let r=y();n(0,"ion-card",28)(1,"ion-card-header")(2,"div",29)(3,"div",30)(4,"ion-avatar",31),g(5,"img",32),t(),n(6,"div",33)(7,"ion-card-title"),a(8),t(),n(9,"p"),a(10),t()()(),n(11,"ion-chip",34),g(12,"ion-icon",35),n(13,"ion-label"),a(14),P(15,"titlecase"),t()()()(),n(16,"ion-card-content")(17,"div",36)(18,"div")(19,"label"),a(20,"Work Log Date:"),t(),n(21,"p"),a(22),t()(),n(23,"div")(24,"label"),a(25,"Submitted On:"),t(),n(26,"p"),a(27),t()(),n(28,"div")(29,"label"),a(30,"Total Hours:"),t(),n(31,"p"),a(32),t()()(),n(33,"div",30),C(34,On,5,2,"div",37)(35,wn,5,1,"div",38),t(),n(36,"div",39)(37,"ion-button",40),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.downloadTimesheet(i))}),g(38,"ion-icon",41),t(),n(39,"ion-button",42),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.rejectTimesheet(i))}),a(40," Reject "),t(),n(41,"ion-button",43),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.approveTimesheet(i))}),a(42," Approve "),t()()()()}if(c&2){let r=s.$implicit,e=u(2);l(5),m("src",e.getProfileImage(r),ee),l(3),I("",r.FirstName," ",r.LastName),l(2),_(r.WorkEmail),l(),m("color",r.timesheet_type==="project"?"primary":"secondary"),l(),m("name",e.getTimesheetTypeIcon(r.timesheet_type)),l(2),_(V(15,15,r.timesheet_type)),l(8),_(e.formatDate(r.date)),l(5),_(e.formatDate(r.submission_date)),l(5),O("",r.total_hours,"h"),l(2),m("ngIf",r.project_name),l(),m("ngIf",r.client_name),l(2),m("disabled",e.loading),l(2),m("disabled",e.loading),l(2),m("disabled",e.loading)}}function Sn(c,s){if(c&1&&(n(0,"div",26),C(1,Tn,43,17,"ion-card",27),t()),c&2){let r=u();l(),m("ngForOf",r.filteredTimesheets)}}function In(c,s){c&1&&(n(0,"ion-row",46)(1,"ion-col",47),g(2,"img",48),n(3,"p",49),a(4,"No Pending Timesheets."),t()()())}var sn=(()=>{let s=class s{constructor(e,i,o,d){this.timesheetService=e,this.alertController=i,this.toastController=o,this.modalCtrl=d,this.pendingTimesheets=[],this.filteredTimesheets=[],this.loading=!1,this.searchText="",this.teamSize=0,this.submittedCount=0,this.notSubmittedCount=0,this.pendingApprovalsCount=0,this.statisticsLoading=!1,this.currentDate="",this.filterType="all",this.startDate="",this.endDate=""}ngOnInit(){this.currentDate=new Date().toISOString().split("T")[0],this.loadPendingTimesheets(),this.loadTeamStatistics()}loadTeamStatistics(){this.statisticsLoading=!0;let e={};this.startDate&&(e.start_date=this.startDate),this.endDate&&(e.end_date=this.endDate),this.timesheetService.getManagerTeamStatistics(e).subscribe({next:i=>{this.teamSize=i.team_size||0,this.submittedCount=i.submitted_count||0,this.notSubmittedCount=i.not_submitted_count||0,this.pendingApprovalsCount=i.pending_approvals||0,this.statisticsLoading=!1},error:i=>{console.error("Error fetching team statistics:",i),this.showToast("Error loading team statistics","danger"),this.statisticsLoading=!1}})}loadPendingTimesheets(){this.loading=!0;let e={};this.startDate&&(e.start_date=this.startDate),this.endDate&&(e.end_date=this.endDate),this.filterType!=="all"&&(e.timesheet_type=this.filterType),this.timesheetService.getManagerPendingTimesheets(e).subscribe({next:i=>{this.pendingTimesheets=i||[],this.filteredTimesheets=[...this.pendingTimesheets],this.loading=!1},error:i=>{console.error("Error fetching pending timesheets:",i),this.loading=!1}})}approveTimesheet(e){return M(this,null,function*(){(yield this.showConfirmDialog("Approve Timesheet",`Approve timesheet for ${e.FirstName} ${e.LastName}?`))&&(this.loading=!0,this.timesheetService.approveTimesheet(e.id).subscribe({next:()=>{this.showToast("Timesheet approved successfully","success"),this.loadPendingTimesheets()},error:o=>{this.showToast(o.error?.error||"Error approving timesheet","danger"),this.loading=!1}}))})}rejectTimesheet(e){return M(this,null,function*(){let i=yield this.showReasonDialog("Reject Timesheet",`Reject timesheet for ${e.FirstName} ${e.LastName}?`);i&&(this.loading=!0,this.timesheetService.rejectTimesheet(e.id,i).subscribe({next:()=>{this.showToast("Timesheet rejected","success"),this.loadPendingTimesheets()},error:o=>{this.showToast(o.error?.error||"Error rejecting timesheet","danger"),this.loading=!1}}))})}onFilterTypeChange(e){this.filterType=e.detail.value,this.loadPendingTimesheets()}onDateRangeChange(){this.startDate&&this.endDate&&(this.loadPendingTimesheets(),this.loadTeamStatistics())}clearFilters(){this.filterType="all",this.startDate="",this.endDate="",this.searchText="",this.loadPendingTimesheets(),this.loadTeamStatistics()}filterTimesheets(){let e=this.searchText.toLowerCase();this.filteredTimesheets=this.pendingTimesheets.filter(i=>i.FirstName?.toLowerCase().includes(e)||i.LastName?.toLowerCase().includes(e)||i.WorkEmail?.toLowerCase().includes(e)||i.project_name?.toLowerCase().includes(e))}getStatusColor(e){switch(e){case"submitted":return"warning";case"approved":return"success";case"rejected":return"danger";default:return"medium"}}getTimesheetTypeIcon(e){return e==="project"?"briefcase-outline":"time-outline"}formatTime(e){return e?new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"--:--"}formatDate(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"--"}formatDateDDMMYYYY(e){let i=String(e.getDate()).padStart(2,"0"),o=String(e.getMonth()+1).padStart(2,"0"),d=e.getFullYear();return`${i}-${o}-${d}`}getProfileImage(e){return e?.profile_image?`http://${W.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}getDateRangeText(){return this.startDate&&this.endDate?`${this.formatDate(this.startDate)} - ${this.formatDate(this.endDate)}`:"Current Month"}getTodayFormatted(){return this.formatDate(this.currentDate)}downloadTimesheet(e){if(!e||!e.hours_breakdown?.length){this.showToast("No timesheet data available to download","warning");return}let i="";e.hours_breakdown.forEach((ae,Ce)=>{i+=`<tr><td>${Ce+1}</td><td>${ae.hour||"-"}</td><td>${ae.task||"-"}</td><td>${ae.hours||"-"}</td></tr>`});let o=this.formatDateDDMMYYYY(new Date(e.date)),d=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"/></head><body><table border="1"><tr><td>Employee</td><td colspan="3">${e.FirstName} ${e.LastName}</td></tr><tr><td>Date</td><td colspan="3">${o}</td></tr><tr><th>S.No</th><th>Time</th><th>Task</th><th>Hours</th></tr>${i}<tr><td>Note</td><td colspan="3">${e.notes||"-"}</td></tr><tr><td>Total</td><td colspan="3">${e.total_hours}</td></tr></table></body></html>`,p=new Blob([d],{type:"application/vnd.ms-excel;charset=utf-8;"}),h=document.createElement("a");h.href=URL.createObjectURL(p),h.download=`Timesheet_${e.FirstName}_${o}.xls`,h.click(),URL.revokeObjectURL(h.href),this.showToast("Timesheet downloaded successfully","success")}handleRefresh(e){this.loadPendingTimesheets(),this.loadTeamStatistics(),setTimeout(()=>{e.target.complete()},1e3)}showConfirmDialog(e,i){return M(this,null,function*(){let o=yield this.alertController.create({header:e,message:i,buttons:[{text:"Cancel",role:"cancel"},{text:"Confirm",role:"confirm"}]});yield o.present();let{role:d}=yield o.onDidDismiss();return d==="confirm"})}showReasonDialog(e,i){return M(this,null,function*(){let o=yield this.alertController.create({header:e,message:i,inputs:[{name:"rejection_reason",type:"textarea",placeholder:"Rejection reason (required)"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Reject",role:"reject",handler:h=>h.rejection_reason?.trim()?!0:(this.showToast("Rejection reason is required","warning"),!1)}]});yield o.present();let{data:d,role:p}=yield o.onDidDismiss();return p==="reject"&&d?.values?.rejection_reason?.trim()?d.values.rejection_reason:null})}showToast(e,i){return M(this,null,function*(){yield(yield this.toastController.create({message:e,duration:2e3,color:i,position:"top"})).present()})}goBack(){return M(this,null,function*(){yield this.modalCtrl.dismiss()})}};s.\u0275fac=function(i){return new(i||s)(v(Te),v(Oe),v(he),v(j))},s.\u0275cmp=E({type:s,selectors:[["app-manager-timesheet-approvals"]],decls:50,vars:10,consts:[["slot","start"],["defaultHref","/MyTeam",3,"click"],["slot","end"],[3,"click"],["slot","icon-only","name","refresh-outline"],[3,"ngModelChange","ionChange","ngModel"],["value","all"],["value","regular"],["value","project"],[1,"ion-padding"],["slot","fixed",3,"ionRefresh"],["placeholder","Search by name, email, or project","animated","",3,"ngModelChange","ionInput","ngModel"],[1,"filter-block"],["placeholder","Start Date","type","date",3,"ngModelChange","ionChange","ngModel"],["placeholder","","type","date",3,"ngModelChange","ionChange","ngModel"],[1,"ion-align-self-end"],["fill","clear",3,"click"],[1,"row-left","my-15"],["color","medium","size","small"],["color","primary","size","small"],["color","warning",4,"ngIf"],["class","loading-container",4,"ngIf"],["class","requests-container",4,"ngIf"],["class","no-leaves",4,"ngIf"],["color","warning"],[1,"loading-container"],[1,"requests-container"],["class","timesheet-card",4,"ngFor","ngForOf"],[1,"timesheet-card"],[1,"card-header-content","row-space-between"],[1,"row-left"],[1,"employee-avatar","mr-8"],[3,"src"],[1,"employee-info"],[3,"color"],[3,"name"],[1,"row-space-between"],["class","info-row mr-15",4,"ngIf"],["class","info-row",4,"ngIf"],[1,"row-right"],["fill","clear","color","medium",3,"click","disabled"],["slot","icon-only","name","download-outline"],[1,"primary-outline-btn",3,"click","disabled"],[1,"primary-btn",3,"click","disabled"],[1,"info-row","mr-15"],[1,"info-row"],[1,"no-leaves"],["size","12",1,"ion-text-center"],["src","../../assets/Profile_Picture.png",2,"width","120px","opacity","0.4"],[1,"no-data-text"]],template:function(i,o){i&1&&(n(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-back-button",1),f("click",function(){return o.goBack()}),t()(),n(4,"ion-title"),a(5,"Timesheet Approvals"),t(),n(6,"ion-buttons",2)(7,"ion-button",3),f("click",function(){return o.loadPendingTimesheets()}),g(8,"ion-icon",4),t()()(),n(9,"ion-toolbar")(10,"ion-segment",5),S("ngModelChange",function(p){return T(o.filterType,p)||(o.filterType=p),p}),f("ionChange",function(p){return o.onFilterTypeChange(p)}),n(11,"ion-segment-button",6)(12,"ion-label"),a(13,"All"),t()(),n(14,"ion-segment-button",7)(15,"ion-label"),a(16,"Regular"),t()(),n(17,"ion-segment-button",8)(18,"ion-label"),a(19,"Project"),t()()()()(),n(20,"ion-content",9)(21,"ion-refresher",10),f("ionRefresh",function(p){return o.handleRefresh(p)}),g(22,"ion-refresher-content"),t(),n(23,"ion-searchbar",11),S("ngModelChange",function(p){return T(o.searchText,p)||(o.searchText=p),p}),f("ionInput",function(){return o.filterTimesheets()}),t(),n(24,"ion-grid",12)(25,"ion-row")(26,"ion-col")(27,"div")(28,"label"),a(29,"Start Date"),t(),n(30,"ion-input",13),S("ngModelChange",function(p){return T(o.startDate,p)||(o.startDate=p),p}),f("ionChange",function(){return o.onDateRangeChange()}),t()()(),n(31,"ion-col")(32,"div")(33,"label"),a(34,"End Date"),t(),n(35,"ion-input",14),S("ngModelChange",function(p){return T(o.endDate,p)||(o.endDate=p),p}),f("ionChange",function(){return o.onDateRangeChange()}),t()()(),n(36,"ion-col",15)(37,"ion-button",16),f("click",function(){return o.clearFilters()}),a(38,"Clear All"),t()()()(),n(39,"div",17)(40,"ion-chip",18)(41,"ion-label"),a(42),t()(),n(43,"ion-chip",19)(44,"ion-label"),a(45),t()(),C(46,yn,3,1,"ion-chip",20),t(),C(47,Pn,4,0,"div",21)(48,Sn,2,1,"div",22)(49,In,5,0,"ion-row",23),t()),i&2&&(l(10),w("ngModel",o.filterType),l(13),w("ngModel",o.searchText),l(7),w("ngModel",o.startDate),l(5),w("ngModel",o.endDate),l(7),O("Today: ",o.getTodayFormatted()),l(3),O("Period: ",o.getDateRangeText()),l(),m("ngIf",!o.loading&&o.filteredTimesheets.length>0),l(),m("ngIf",o.loading),l(),m("ngIf",!o.loading&&o.filteredTimesheets.length>0),l(),m("ngIf",!o.loading&&o.filteredTimesheets.length===0))},dependencies:[Z,te,A,J,ce,se,de,me,Ue,pe,D,Je,L,R,Qe,Q,oe,ie,ge,re,Ke,Ze,z,X,K,G,ne,_e,$,B,F,Y,H,U,Ve],styles:[`

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
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 15px;
}
.no-leaves[_ngcontent-%COMP%] {
  margin-top: 40px;
}
.no-leaves[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 180px;
  opacity: 0.7;
}
.no-leaves[_ngcontent-%COMP%]   .no-data-text[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 14px;
  margin-top: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 12px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  margin: 12px 0;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #0f172a;
  margin: 4px 0;
  font-weight: 500;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  background: #e8f0fb;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 12px 0;
  width: 100%;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 13px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  min-height: 30px;
  height: 36px;
  font-size: 13px;
  text-transform: capitalize;
}
.primary-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #fff;
  --border-radius: 8px;
  margin-left: 8px;
  font-weight: 600;
}
.primary-btn[_ngcontent-%COMP%]:hover {
  --background: #175191;
}
.primary-outline-btn[_ngcontent-%COMP%] {
  --background: transparent;
  --color: #0f2b4a;
  --border-radius: 8px;
  border: 1px solid #0f2b4a;
  font-weight: 600;
}
.primary-outline-btn[_ngcontent-%COMP%]:hover {
  --background: #f1f5f9;
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
ion-searchbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  border-radius: 8px;
  --box-shadow: none;
  border: 1px solid #ABABAB;
  height: 42px;
  margin-bottom: 15px;
  --placeholder-color: #94a3b8;
  --color: #0f172a;
}
ion-searchbar[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.12);
}
ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.employee-number[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  margin: 0;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.mr-8[_ngcontent-%COMP%] {
  margin-right: 8px;
}
.mr-15[_ngcontent-%COMP%] {
  margin-right: 15px;
}
.my-15[_ngcontent-%COMP%] {
  margin-top: 15px;
  margin-bottom: 15px;
}`]});let c=s;return c})();function kn(c,s){c&1&&(n(0,"div",10),g(1,"ion-spinner",11),n(2,"p"),a(3,"Loading pending WFH requests..."),t()())}function En(c,s){c&1&&(n(0,"ion-row",12)(1,"ion-col",13),g(2,"img",14),n(3,"p",15),a(4,"No Pending Requests."),t()()())}function Bn(c,s){if(c&1&&(n(0,"div",32)(1,"div")(2,"label"),a(3,"Reason"),t(),n(4,"p"),a(5),t()()()),c&2){let r=u().$implicit;l(5),_(r.reason)}}function Fn(c,s){if(c&1){let r=y();n(0,"ion-card",18)(1,"ion-card-header")(2,"div",19)(3,"div",20)(4,"ion-avatar",21),g(5,"img",22),t(),n(6,"div",23)(7,"ion-card-title"),a(8),t(),n(9,"p",24),a(10),t()()(),n(11,"div",25)(12,"ion-badge",26),a(13),t()()()(),n(14,"ion-card-content")(15,"div",27)(16,"div")(17,"label"),a(18,"Start Date"),t(),n(19,"p"),a(20),P(21,"date"),t()(),n(22,"div")(23,"label"),a(24,"End Date"),t(),n(25,"p"),a(26),P(27,"date"),t()(),n(28,"div")(29,"label"),a(30,"Requested On"),t(),n(31,"p"),a(32),P(33,"date"),t()(),n(34,"div")(35,"label"),a(36,"Duration"),t(),n(37,"p"),a(38),t()()(),C(39,Bn,6,1,"div",28),n(40,"div",29)(41,"ion-button",30),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.rejectWFH(i))}),a(42," Reject "),t(),n(43,"ion-button",31),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.approveWFH(i))}),a(44," Approve "),t()()()()}if(c&2){let r=s.$implicit,e=u(2);l(5),m("src",e.getProfileImage(r),ee),l(3),I("",r.FirstName," ",r.LastName),l(2),_(r.EmployeeNumber),l(2),m("ngClass",e.getStatusColor(r.status)),l(),O(" ",r.status||"pending"," "),l(7),_(V(21,11,r.start_date)),l(6),_(V(27,13,r.end_date)),l(6),_(V(33,15,r.created_at)),l(6),_(r.total_days),l(),m("ngIf",r.reason)}}function An(c,s){if(c&1&&(n(0,"div",16),C(1,Fn,45,17,"ion-card",17),t()),c&2){let r=u();l(),m("ngForOf",r.filteredRequests)}}var dn=(()=>{let s=class s{constructor(e,i,o,d){this.wfhService=e,this.alertController=i,this.toastController=o,this.modalCtrl=d,this.pendingWFHRequests=[],this.filteredRequests=[],this.isLoading=!1,this.searchTerm="",this.modeFilter="all"}ngOnInit(){this.loadPendingWFHRequests()}loadPendingWFHRequests(){this.isLoading=!0,this.wfhService.getPendingWFHRequests().subscribe({next:e=>{e&&e.length>0?this.pendingWFHRequests=e.map(i=>Ae(Fe({},i),{work_mode:i.leave_type==="WFH"?"WFH":"WFO"})):this.pendingWFHRequests=[],this.applyFilters(),this.isLoading=!1},error:e=>{console.error("[WFH-APPROVALS] Error:",e),this.showToast("Failed to load pending WFH requests","danger"),this.isLoading=!1}})}applyFilters(){this.filteredRequests=this.pendingWFHRequests.filter(e=>{let i=!this.searchTerm||`${e.FirstName} ${e.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())||e.EmployeeNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()),o=this.modeFilter==="all"||e.work_mode===this.modeFilter;return i&&o})}onSearchChange(e){this.searchTerm=e.detail.value||"",this.applyFilters()}approveWFH(e){return M(this,null,function*(){yield(yield this.alertController.create({header:"Approve WFH Request",message:`Approve ${e.FirstName} ${e.LastName}'s request?`,buttons:[{text:"Cancel",role:"cancel"},{text:"Approve",handler:()=>this.performApprove(e)}]})).present()})}rejectWFH(e){return M(this,null,function*(){yield(yield this.alertController.create({header:"Reject WFH Request",message:"Are you sure you want to reject this WFH request?",inputs:[{name:"remarks",type:"textarea",placeholder:"Enter rejection reason"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Reject",handler:o=>o.remarks?(this.performReject(e,o.remarks),!0):(this.showToast("Rejection reason required","warning"),!1)}]})).present()})}performApprove(e){this.isLoading=!0,this.wfhService.approveWFHRequest(e.id,"Approved").subscribe({next:()=>{this.showToast("WFH request approved","success"),this.loadPendingWFHRequests()},error:()=>{this.showToast("Failed to approve request","danger"),this.isLoading=!1}})}performReject(e,i){this.isLoading=!0,this.wfhService.rejectWFHRequest(e.id,i).subscribe({next:()=>{this.showToast("WFH request rejected","success"),this.loadPendingWFHRequests()},error:()=>{this.showToast("Failed to reject request","danger"),this.isLoading=!1}})}handleRefresh(e){this.loadPendingWFHRequests(),setTimeout(()=>e.target.complete(),1e3)}getStatusColor(e){return{pending:"pending",approved:"accept",rejected:"reject"}[e?.toLowerCase()]||"medium"}getProfileImage(e){return e?.profile_image?`http://${W.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}showToast(e,i="dark"){return M(this,null,function*(){yield(yield this.toastController.create({message:e,duration:3e3,position:"bottom",color:i})).present()})}goBack(){return M(this,null,function*(){yield this.modalCtrl.dismiss()})}};s.\u0275fac=function(i){return new(i||s)(v(an),v(Oe),v(he),v(j))},s.\u0275cmp=E({type:s,selectors:[["app-manager-wfh-approvals"]],decls:17,vars:4,consts:[["slot","start"],["defaultHref","/MyTeam",3,"click"],["slot","end"],[3,"click"],["name","refresh","slot","icon-only"],["placeholder","Search employee...",3,"ionInput","debounce"],["slot","fixed",3,"ionRefresh"],["class","loading-container",4,"ngIf"],["class","no-leaves",4,"ngIf"],["class","requests-container",4,"ngIf"],[1,"loading-container"],["name","crescent"],[1,"no-leaves"],["size","12",1,"ion-text-center"],["src","assets/icon/no_leavedata_img.svg","onerror","this.src='../../assets/Profile_Picture.png'"],[1,"no-data-text"],[1,"requests-container"],["class","wfh-card",4,"ngFor","ngForOf"],[1,"wfh-card"],[1,"card-header-content","row-space-between"],[1,"row-left"],[1,"employee-avatar","mr-8"],[3,"src"],[1,"employee-info"],[1,"employee-number"],[1,"badges"],[3,"ngClass"],[1,"row-space-between"],["class","info-row",4,"ngIf"],[1,"row-right"],[1,"primary-outline-btn",3,"click"],[1,"primary-btn",3,"click"],[1,"info-row"]],template:function(i,o){i&1&&(n(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-back-button",1),f("click",function(){return o.goBack()}),t()(),n(4,"ion-title"),a(5,"WFH Approvals"),t(),n(6,"ion-buttons",2)(7,"ion-button",3),f("click",function(){return o.loadPendingWFHRequests()}),g(8,"ion-icon",4),t()()(),n(9,"ion-toolbar")(10,"ion-searchbar",5),f("ionInput",function(p){return o.onSearchChange(p)}),t()()(),n(11,"ion-content")(12,"ion-refresher",6),f("ionRefresh",function(p){return o.handleRefresh(p)}),g(13,"ion-refresher-content"),t(),C(14,kn,4,0,"div",7)(15,En,5,0,"ion-row",8)(16,An,2,1,"div",9),t()),i&2&&(l(10),m("debounce",300),l(4),m("ngIf",o.isLoading),l(),m("ngIf",!o.isLoading&&o.filteredRequests.length===0),l(),m("ngIf",!o.isLoading&&o.filteredRequests.length>0))},dependencies:[$,N,B,F,Y,Z,te,ye,A,J,ce,se,de,me,pe,D,L,R,oe,ie,ge,re,z,X,K,ne,_e,q],styles:[`

.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  margin-bottom: 16px;
  transform: scale(1.3);
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #555;
  font-size: 15px;
  font-weight: 500;
}
.no-leaves[_ngcontent-%COMP%] {
  margin-top: 40px;
}
.no-leaves[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 180px;
  opacity: 0.7;
  margin-bottom: 20px;
}
.no-leaves[_ngcontent-%COMP%]   .no-data-text[_ngcontent-%COMP%] {
  color: #888;
  font-size: 14px;
}
ion-searchbar[_ngcontent-%COMP%] {
  --background: #fff;
  border-radius: 8px;
  --box-shadow: none;
  border: 1px solid #ABABAB;
  height: 42px;
  margin-left: 8px;
  width: 95%;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  border-radius: 8px;
  border: 0.74px solid #ABABAB;
  box-shadow: none;
  margin: 15px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #707070;
  font-size: 12px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #333333;
  margin: 4px 0;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  background: #E6F4FF;
  border-radius: 6px;
  padding: 8px;
  margin: 15px 0px;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.requests-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  min-height: 30px;
  height: 36px;
  font-size: 14px;
  text-transform: capitalize;
}
.primary-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #fff;
  --border-radius: 8px;
  margin-left: 8px;
}
.primary-outline-btn[_ngcontent-%COMP%] {
  --background: transparent;
  color: #1A2B3C;
  --border-radius: 8px;
  border: 1px solid #1A2B3C;
}
.reject[_ngcontent-%COMP%] {
  background: #FFD8D8;
  color: #C80000;
  border-radius: 8px;
  padding: 4px 8px;
}
.accept[_ngcontent-%COMP%] {
  background: #d4f8e8;
  color: #0a7d44;
  border-radius: 8px;
  padding: 4px 8px;
}
.pending[_ngcontent-%COMP%] {
  background: #fff3cd;
  color: #856404;
  border-radius: 8px;
  padding: 4px 8px;
}
ion-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 600;
}
.employee-number[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #888;
  margin: 0;
}
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}
.row-right[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.mr-8[_ngcontent-%COMP%] {
  margin-right: 8px;
}`]});let c=s;return c})();var Ln=()=>[2024,2025,2026];function Rn(c,s){if(c&1&&(n(0,"ion-select-option",12),a(1),t()),c&2){let r=s.$implicit;m("value",r.id),l(),I(" ",r.FirstName," ",r.LastName," ")}}function zn(c,s){if(c&1&&(n(0,"ion-select-option",12),a(1),t()),c&2){let r=s.$implicit;m("value",r),l(),_(r)}}function jn(c,s){if(c&1){let r=y();n(0,"div",20)(1,"ion-button",21),f("click",function(){b(r);let i=u();return x(i.downloadAttendanceReport())}),g(2,"ion-icon",22),t()()}}function Wn(c,s){if(c&1&&(n(0,"div",23)(1,"div",24)(2,"div",25),g(3,"ion-icon",26),t(),n(4,"span",27),a(5,"Total Days"),t(),n(6,"span",28),a(7),t()(),n(8,"div",29)(9,"div",25),g(10,"ion-icon",30),t(),n(11,"span",27),a(12,"Present"),t(),n(13,"span",28),a(14),t()(),n(15,"div",31)(16,"div",25),g(17,"ion-icon",32),t(),n(18,"span",27),a(19,"Absent"),t(),n(20,"span",28),a(21),t()(),n(22,"div",33)(23,"div",25),g(24,"ion-icon",34),t(),n(25,"span",27),a(26,"On Leave"),t(),n(27,"span",28),a(28),t()(),n(29,"div",35)(30,"div",25),g(31,"ion-icon",36),t(),n(32,"span",27),a(33,"Total Hours"),t(),n(34,"span",28),a(35),t()()()),c&2){let r=u();l(7),_(r.summary.total_days),l(7),_(r.summary.present_days),l(7),_(r.summary.absent_days),l(7),_(r.summary.half_days),l(7),_(r.summary.total_work_hours)}}function Vn(c,s){c&1&&(n(0,"div",37),g(1,"ion-spinner",38),n(2,"p"),a(3,"Generating report..."),t()())}function Nn(c,s){c&1&&(n(0,"div",39),g(1,"ion-icon",40),n(2,"h3"),a(3,"No data found"),t(),n(4,"p"),a(5,"There are no attendance records for the selected period."),t()())}function qn(c,s){c&1&&g(0,"ion-icon",32)}function $n(c,s){if(c&1){let r=y();n(0,"div",52)(1,"div",43)(2,"span",53),a(3),P(4,"date"),t(),n(5,"span",54),a(6),P(7,"date"),t()(),n(8,"div",44)(9,"span",55),C(10,qn,1,0,"ion-icon",56),a(11),P(12,"uppercase"),t()(),n(13,"div",45),a(14),P(15,"date"),t(),n(16,"div",46),a(17),P(18,"date"),t(),n(19,"div",48),a(20),t(),n(21,"div",49)(22,"ion-button",57),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.openAttendanceDetails(i))}),g(23,"ion-icon",58),t()()()}if(c&2){let r=s.$implicit,e=u(2);l(3),_(k(4,9,r.attendance_date,"EEE")),l(3),_(k(7,12,r.attendance_date,"dd MMM")),l(3),m("ngClass",e.getStatusClass(r.status)),l(),m("ngIf",(r.status==null?null:r.status.toLowerCase())==="absent"),l(),O(" ",V(12,15,r.status)," "),l(3),I(" ",k(15,17,r.first_check_in,"hh:mm a")||"--:--"," ",r.gross_hours||"0.00"," hrs "),l(3),O(" ",k(18,20,r.last_check_out,"hh:mm a")||"--:--"," "),l(3),O(" ",r.work_mode||"OFFICE"," ")}}function Hn(c,s){if(c&1&&(n(0,"div",41)(1,"div",42)(2,"div",43),a(3,"Date"),t(),n(4,"div",44),a(5,"Status"),t(),n(6,"div",45),a(7,"First In"),t(),n(8,"div",46),a(9,"Last Out"),t(),n(10,"div",47),a(11,"Hours"),t(),n(12,"div",48),a(13,"Mode"),t(),n(14,"div",49),a(15,"View"),t()(),n(16,"div",50),C(17,$n,24,23,"div",51),t()()),c&2){let r=u();l(17),m("ngForOf",r.reportData)}}var pn=(()=>{let s=class s{constructor(e,i,o){this.modalCtrl=e,this.attendanceService=i,this.employeeService=o,this.teamMembers=[],this.reportData=null,this.summary=null,this.isLoading=!1,this.startDate="",this.endDate="",this.month=new Date().getMonth()+1,this.year=new Date().getFullYear()}ngOnInit(){this.setDefaultDates(),this.loadTeamMembers(),this.employeeId&&(this.selectedEmployeeId=this.employeeId,this.fetchReport())}setDefaultDates(){let e=new Date,i=new Date(e.getFullYear(),e.getMonth(),1),o=new Date(e.getFullYear(),e.getMonth()+1,0);this.startDate=this.formatDate(i),this.endDate=this.formatDate(o),this.month=e.getMonth()+1,this.year=e.getFullYear()}formatDate(e){let i=new Date(e),o=""+(i.getMonth()+1),d=""+i.getDate();return[i.getFullYear(),o,d].join("-")}loadTeamMembers(){this.employeeService.getMyTeamList().subscribe({next:e=>{this.teamMembers=e.team||e||[],!this.selectedEmployeeId&&this.teamMembers.length>0&&(this.selectedEmployeeId=this.teamMembers[0].id,this.fetchReport())},error:e=>console.error("Failed to load team members",e)})}onEmployeeChange(e){this.selectedEmployeeId=e.detail.value,this.fetchReport()}onDateChange(){this.updateDateRange(),this.fetchReport()}updateDateRange(){let e=new Date(this.year,this.month-1,1),i=new Date(this.year,this.month,0);this.startDate=this.formatDate(e),this.endDate=this.formatDate(i)}fetchReport(){if(!this.selectedEmployeeId)return;this.isLoading=!0;let e={startDate:this.startDate,endDate:this.endDate,month:this.month,year:this.year},i=this.attendanceService.getEmployeeReport?"getEmployeeReport":"getEmployeeAttendanceReport";this.attendanceService[i](this.selectedEmployeeId,e).subscribe({next:o=>{this.reportData=o.attendance||[],this.summary=o.summary||null,this.isLoading=!1},error:o=>{console.error("Failed to fetch report",o),this.isLoading=!1}})}dismiss(){this.modalCtrl.dismiss()}getStatusClass(e){return e=e?.toLowerCase()||"",e==="present"?"status-present":e==="absent"?"status-absent":e==="on-leave"||e==="on_leave"?"status-leave":e==="half-day"?"status-half":""}openAttendanceDetails(e){return M(this,null,function*(){e.status?.toLowerCase()!=="absent"&&console.log("Viewing details for",e.attendance_date)})}downloadAttendanceReport(){if(!this.reportData||this.reportData.length===0)return;let e="data:text/csv;charset=utf-8,";e+=`Date,Status,First In,Last Out,Hours,Mode
`,this.reportData.forEach(h=>{let ae=new Date(h.attendance_date).toLocaleDateString(),Ce=h.status||"---",Ie=h.first_check_in?new Date(h.first_check_in).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"---",ke=h.last_check_out?new Date(h.last_check_out).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"---",Ee=h.gross_hours||"0.00",un=h.work_mode||"OFFICE";e+=`${ae},${Ce},${Ie},${ke},${Ee},${un}
`});let i=encodeURI(e),o=document.createElement("a");o.setAttribute("href",i);let d=this.teamMembers.find(h=>h.id===this.selectedEmployeeId),p=d?`${d.FirstName}_${d.LastName}`:"AttendanceReport";o.setAttribute("download",`${p}_Attendance_${this.month}_${this.year}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)}};s.\u0275fac=function(i){return new(i||s)(v(j),v(we),v(be))},s.\u0275cmp=E({type:s,selectors:[["app-team-report"]],inputs:{employeeId:"employeeId"},standalone:!1,decls:53,vars:23,consts:[[1,"ion-no-border"],[1,"report-header"],["slot","end"],[3,"click"],["name","close-outline"],[1,"filters-toolbar"],[1,"filter-container"],[1,"filter-item"],["placeholder","Select Employee","interface","popover",1,"custom-select",3,"ionChange","value"],[3,"value",4,"ngFor","ngForOf"],[1,"filter-item","short-item"],["placeholder","Month","interface","popover",1,"custom-select",3,"ngModelChange","ionChange","ngModel"],[3,"value"],["placeholder","Year","interface","popover",1,"custom-select",3,"ngModelChange","ionChange","ngModel"],["class","download-section",4,"ngIf"],[1,"report-content"],["class","summary-section",4,"ngIf"],["class","loading-state",4,"ngIf"],["class","empty-state",4,"ngIf"],["class","table-container",4,"ngIf"],[1,"download-section"],["fill","clear",1,"download-btn",3,"click"],["name","download-outline","slot","icon-only"],[1,"summary-section"],[1,"summary-card","total"],[1,"card-header-icon"],["name","people-outline"],[1,"label"],[1,"value"],[1,"summary-card","present"],["name","checkmark-circle-outline"],[1,"summary-card","absent"],["name","alert-circle-outline"],[1,"summary-card","leave"],["name","airplane-outline"],[1,"summary-card","total-hours"],["name","time-outline"],[1,"loading-state"],["name","crescent"],[1,"empty-state"],["name","document-text-outline"],[1,"table-container"],[1,"table-header"],[1,"col","col-date"],[1,"col","col-status"],[1,"col","col-in"],[1,"col","col-out"],[1,"col","col-hours"],[1,"col","col-mode"],[1,"col","col-view"],[1,"table-body"],["class","table-row",4,"ngFor","ngForOf"],[1,"table-row"],[1,"day"],[1,"date"],[1,"status-badge",3,"ngClass"],["name","alert-circle-outline",4,"ngIf"],["fill","clear","color","primary",3,"click"],["name","eye-outline","slot","icon-only"]],template:function(i,o){i&1&&(n(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),a(3,"Team Attendance Reports"),t(),n(4,"ion-buttons",2)(5,"ion-button",3),f("click",function(){return o.dismiss()}),g(6,"ion-icon",4),t()()(),n(7,"ion-toolbar",5)(8,"div",6)(9,"div",7)(10,"ion-label"),a(11,"Member"),t(),n(12,"ion-select",8),f("ionChange",function(p){return o.onEmployeeChange(p)}),C(13,Rn,2,3,"ion-select-option",9),t()(),n(14,"div",10)(15,"ion-label"),a(16,"Month"),t(),n(17,"ion-select",11),S("ngModelChange",function(p){return T(o.month,p)||(o.month=p),p}),f("ionChange",function(){return o.onDateChange()}),n(18,"ion-select-option",12),a(19,"January"),t(),n(20,"ion-select-option",12),a(21,"February"),t(),n(22,"ion-select-option",12),a(23,"March"),t(),n(24,"ion-select-option",12),a(25,"April"),t(),n(26,"ion-select-option",12),a(27,"May"),t(),n(28,"ion-select-option",12),a(29,"June"),t(),n(30,"ion-select-option",12),a(31,"July"),t(),n(32,"ion-select-option",12),a(33,"August"),t(),n(34,"ion-select-option",12),a(35,"September"),t(),n(36,"ion-select-option",12),a(37,"October"),t(),n(38,"ion-select-option",12),a(39,"November"),t(),n(40,"ion-select-option",12),a(41,"December"),t()()(),n(42,"div",10)(43,"ion-label"),a(44,"Year"),t(),n(45,"ion-select",13),S("ngModelChange",function(p){return T(o.year,p)||(o.year=p),p}),f("ionChange",function(){return o.onDateChange()}),C(46,zn,2,2,"ion-select-option",9),t()(),C(47,jn,3,0,"div",14),t()()(),n(48,"ion-content",15),C(49,Wn,36,5,"div",16)(50,Vn,4,0,"div",17)(51,Nn,6,0,"div",18)(52,Hn,18,1,"div",19),t()),i&2&&(l(12),m("value",o.selectedEmployeeId),l(),m("ngForOf",o.teamMembers),l(4),w("ngModel",o.month),l(),m("value",1),l(2),m("value",2),l(2),m("value",3),l(2),m("value",4),l(2),m("value",5),l(2),m("value",6),l(2),m("value",7),l(2),m("value",8),l(2),m("value",9),l(2),m("value",10),l(2),m("value",11),l(2),m("value",12),l(5),w("ngModel",o.year),l(),m("ngForOf",je(22,Ln)),l(),m("ngIf",!o.isLoading&&o.reportData&&o.reportData.length>0),l(2),m("ngIf",o.summary&&!o.isLoading),l(),m("ngIf",o.isLoading),l(),m("ngIf",!o.isLoading&&(!o.reportData||o.reportData.length===0)),l(),m("ngIf",!o.isLoading&&o.reportData&&o.reportData.length>0))},dependencies:[N,B,F,H,U,A,J,D,L,R,Q,fe,ue,z,X,K,G,Ne,q],styles:[`

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
.report-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.report-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  letter-spacing: -0.05em;
}
.report-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.filters-toolbar[_ngcontent-%COMP%] {
  --background: #f4f7fb;
  --border-width: 0 0 1px 0;
  --border-color: #f1f5f9;
  padding: 8px 16px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 4px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item.short-item[_ngcontent-%COMP%] {
  min-width: 100px;
  flex: 1;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  color: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  --placeholder-color: #94a3b8;
  --icon-color: #1F74BB;
  transition: all 0.2s ease;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%]::part(icon) {
  opacity: 1;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .download-section[_ngcontent-%COMP%] {
  margin-top: 16px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .download-section[_ngcontent-%COMP%]   .download-btn[_ngcontent-%COMP%] {
  --color: #1F74BB;
  --padding-start: 16px;
  --padding-end: 16px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-transform: none;
  font-weight: 700;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .download-section[_ngcontent-%COMP%]   .download-btn[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #1F74BB;
}
.report-content[_ngcontent-%COMP%] {
  --background: #f4f7fb;
  padding: 16px;
}
.summary-section[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  padding: 16px;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  margin-top: 8px;
  text-align: center;
  letter-spacing: 0.5px;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .card-header-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #94a3b8;
  margin-bottom: 4px;
  transition: all 0.2s ease;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.total[_ngcontent-%COMP%] {
  border-left: 4px solid #1F74BB;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.present[_ngcontent-%COMP%] {
  border-left: 4px solid #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.present[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.verified[_ngcontent-%COMP%] {
  border-left: 4px solid #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.verified[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.absent[_ngcontent-%COMP%] {
  border-left: 4px solid #dc2626;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.absent[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #dc2626;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.leave[_ngcontent-%COMP%] {
  border-left: 4px solid #d97706;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.leave[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #d97706;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.total-hours[_ngcontent-%COMP%] {
  border-left: 4px solid #0284c7;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.total-hours[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #0284c7;
}
.table-container[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  margin: 0 16px 24px;
  overflow: hidden;
  border: 1px solid #ABABAB;
}
.table-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  background: #f8fafc;
  display: flex;
  padding: 16px 20px;
  border-bottom: 2px solid #ABABAB;
}
.table-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.table-container[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid #f8fafc;
  align-items: center;
  transition: all 0.2s ease;
  background: #ffffff;
}
.table-container[_ngcontent-%COMP%]   .table-row.clickable-row[_ngcontent-%COMP%] {
  cursor: pointer;
}
.table-container[_ngcontent-%COMP%]   .table-row.clickable-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}
.table-container[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.table-container[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 600;
}
.table-container[_ngcontent-%COMP%]   .col.col-date[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.table-container[_ngcontent-%COMP%]   .col.col-date[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  font-weight: 700;
  text-transform: uppercase;
}
.table-container[_ngcontent-%COMP%]   .col.col-date[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
}
.table-container[_ngcontent-%COMP%]   .col.col-project[_ngcontent-%COMP%] {
  flex: 1.5;
  color: #1F74BB;
  font-weight: 700;
}
.table-container[_ngcontent-%COMP%]   .col.col-status[_ngcontent-%COMP%] {
  flex: 1;
}
.table-container[_ngcontent-%COMP%]   .col.col-hours[_ngcontent-%COMP%] {
  flex: 0.8;
  font-weight: 700;
  color: #1F74BB;
}
.table-container[_ngcontent-%COMP%]   .col.col-desc[_ngcontent-%COMP%] {
  flex: 2;
  font-size: 12px;
  color: #475569;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}
.table-container[_ngcontent-%COMP%]   .col.col-action[_ngcontent-%COMP%] {
  flex: 0.5;
  text-align: right;
}
.table-container[_ngcontent-%COMP%]   .col.col-action[_ngcontent-%COMP%]   .row-view-btn[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  margin: 0;
}
.status-badge[_ngcontent-%COMP%] {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid transparent;
}
.status-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.status-badge.status-verified[_ngcontent-%COMP%], 
.status-badge.status-approved[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
}
.status-badge.status-rejected[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}
.status-badge.status-submitted[_ngcontent-%COMP%], 
.status-badge.status-pending[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border-color: #fde68a;
}
.loading-state[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
}
.loading-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  color: #94a3b8;
  margin-bottom: 24px;
  opacity: 0.3;
}
.loading-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
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
ion-spinner[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  --color: #1F74BB;
  margin-bottom: 24px;
}
@media (max-width: 600px) {
  .table-container[_ngcontent-%COMP%]   .col-desc[_ngcontent-%COMP%] {
    display: none;
  }
  .table-container[_ngcontent-%COMP%]   .col-project[_ngcontent-%COMP%] {
    flex: 1;
  }
  .filters-toolbar[_ngcontent-%COMP%] {
    padding: 16px 20px;
  }
  .filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%] {
    min-width: 100%;
  }
  .filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item.short-item[_ngcontent-%COMP%] {
    min-width: 45%;
    flex: 1;
  }
  .summary-section[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
  .summary-section[_ngcontent-%COMP%]   .summary-card.total-hours[_ngcontent-%COMP%] {
    grid-column: span 2;
  }
}`]});let c=s;return c})();function Un(c,s){if(c&1&&(n(0,"ion-select-option",20),a(1),t()),c&2){let r=s.$implicit;m("value",r.id),l(),I(" ",r.FirstName," ",r.LastName," ")}}function Yn(c,s){if(c&1){let r=y();n(0,"div",18)(1,"ion-label"),a(2,"Member"),t(),n(3,"ion-select",19),S("ngModelChange",function(i){b(r);let o=u();return T(o.selectedEmployeeId,i)||(o.selectedEmployeeId=i),x(i)}),f("ionChange",function(i){b(r);let o=u();return x(o.onEmployeeChange(i))}),C(4,Un,2,3,"ion-select-option",10),t()()}if(c&2){let r=u();l(3),w("ngModel",r.selectedEmployeeId),l(),m("ngForOf",r.teamMembers)}}function Gn(c,s){if(c&1&&(n(0,"ion-select-option",20),a(1),t()),c&2){let r=s.$implicit;m("value",r.value),l(),_(r.name)}}function Jn(c,s){if(c&1&&(n(0,"ion-select-option",20),a(1),t()),c&2){let r=s.$implicit;m("value",r),l(),_(r)}}function Qn(c,s){if(c&1){let r=y();n(0,"div",21)(1,"ion-button",22),f("click",function(){b(r);let i=u();return x(i.downloadReport())}),g(2,"ion-icon",23),t()()}}function Xn(c,s){if(c&1&&(n(0,"div",24)(1,"div",25)(2,"div",26),g(3,"ion-icon",27),t(),n(4,"span",28),a(5,"Total Hours"),t(),n(6,"span",29),a(7),t()(),n(8,"div",30)(9,"div",26),g(10,"ion-icon",31),t(),n(11,"span",28),a(12,"Days Logged"),t(),n(13,"span",29),a(14),t()(),n(15,"div",32)(16,"div",26),g(17,"ion-icon",33),t(),n(18,"span",28),a(19,"Verified"),t(),n(20,"span",29),a(21),t()(),n(22,"div",34)(23,"div",26),g(24,"ion-icon",35),t(),n(25,"span",28),a(26,"Pending"),t(),n(27,"span",29),a(28),t()(),n(29,"div",36)(30,"div",26),g(31,"ion-icon",37),t(),n(32,"span",28),a(33,"Avg Hours/Day"),t(),n(34,"span",29),a(35),t()()()),c&2){let r=u();l(7),_(r.summary.total_hours),l(7),_(r.summary.days_logged),l(7),_(r.summary.verified_logs),l(7),_(r.summary.pending_logs),l(7),_(r.summary.avg_hours)}}function Kn(c,s){c&1&&(n(0,"div",38),g(1,"ion-spinner",39),n(2,"p"),a(3,"Generating work report..."),t()())}function Zn(c,s){c&1&&(n(0,"div",40),g(1,"ion-icon",41),n(2,"h3"),a(3,"No Work Logs Found"),t(),n(4,"p"),a(5,"No work reports submitted for the selected period."),t()())}function et(c,s){if(c&1){let r=y();n(0,"div",52),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.openPreview(i))}),n(1,"div",44)(2,"span",53),a(3),P(4,"date"),t(),n(5,"span",54),a(6),P(7,"date"),t()(),n(8,"div",45),a(9),t(),n(10,"div",46)(11,"span",55),a(12),t()(),n(13,"div",47),a(14),t(),n(15,"div",48),a(16),t(),n(17,"div",49)(18,"ion-button",56),g(19,"ion-icon",57),t()()()}if(c&2){let r=s.$implicit;l(3),_(k(4,7,r.date,"EEE")),l(3),_(k(7,10,r.date,"dd MMM")),l(3),O(" ",r.project_name||"Regular Work"," "),l(2),m("ngClass","status-"+((r.status==null?null:r.status.toLowerCase())||"submitted")),l(),O(" ",r.status||"Submitted"," "),l(2),O(" ",r.total_hours," hrs "),l(2),O(" ",r.work_description||r.notes||"---"," ")}}function nt(c,s){if(c&1&&(n(0,"div",42)(1,"div",43)(2,"div",44),a(3,"Date"),t(),n(4,"div",45),a(5,"Project"),t(),n(6,"div",46),a(7,"Status"),t(),n(8,"div",47),a(9,"Hours"),t(),n(10,"div",48),a(11,"Description"),t(),n(12,"div",49),a(13,"View"),t()(),n(14,"div",50),C(15,et,20,13,"div",51),t()()),c&2){let r=u();l(15),m("ngForOf",r.reportData)}}var gn=(()=>{let s=class s{constructor(e,i,o){this.modalCtrl=e,this.timesheetService=i,this.employeeService=o,this.teamMembers=[],this.reportData=[],this.summary=null,this.isLoading=!1,this.month=new Date().getMonth()+1,this.year=new Date().getFullYear(),this.isManager=!1,this.userRole=null,this.months=[{value:1,name:"January"},{value:2,name:"February"},{value:3,name:"March"},{value:4,name:"April"},{value:5,name:"May"},{value:6,name:"June"},{value:7,name:"July"},{value:8,name:"August"},{value:9,name:"September"},{value:10,name:"October"},{value:11,name:"November"},{value:12,name:"December"}],this.years=[];let d=new Date().getFullYear();for(let p=d;p>=d-5;p--)this.years.push(p)}ngOnInit(){this.updateRole(),this.loadTeamMembers(),this.employeeId?(this.selectedEmployeeId=this.employeeId,this.fetchReport()):this.isManager||this.fetchReport()}updateRole(){this.userRole=(localStorage.getItem("role")||"").toLowerCase(),this.isManager=this.userRole==="manager"||this.userRole==="hr"}loadTeamMembers(){this.employeeService.getMyTeamList().subscribe({next:e=>{this.teamMembers=e.team||e||[],!this.selectedEmployeeId&&this.teamMembers.length>0&&(this.selectedEmployeeId=this.teamMembers[0].id,this.fetchReport())},error:e=>console.error("Failed to load team members",e)})}onEmployeeChange(e){this.selectedEmployeeId=e.detail.value,this.fetchReport()}onFilterChange(){this.fetchReport()}fetchReport(){this.isLoading=!0;let e={month:this.month,year:this.year},i;this.selectedEmployeeId?i=this.timesheetService.getTeamMemberTimesheets(this.selectedEmployeeId,e):i=this.timesheetService.getMyProjectTimesheets(e).pipe(De(()=>this.timesheetService.getMyRegularTimesheets(e))),i.subscribe({next:o=>{this.reportData=o?.data||o||[],this.calculateSummary(),this.isLoading=!1},error:o=>{console.error("Failed to fetch report",o),this.isLoading=!1}})}calculateSummary(){if(!this.reportData||this.reportData.length===0){this.summary=null;return}let e=this.reportData.reduce((p,h)=>p+Number(h.total_hours||0),0),i=new Set(this.reportData.map(p=>p.date?.split("T")[0])).size,o=this.reportData.filter(p=>["verified","approved"].includes(p.status?.toLowerCase())).length,d=this.reportData.filter(p=>["submitted","pending"].includes(p.status?.toLowerCase())).length;this.summary={total_hours:e.toFixed(2),days_logged:i,verified_logs:o,pending_logs:d,avg_hours:i>0?(e/i).toFixed(2):"0.00"}}downloadReport(){if(!this.reportData||this.reportData.length===0)return;let e="data:text/csv;charset=utf-8,";e+=`Date,Project,Status,Total Hours,Work Description
`,this.reportData.forEach(h=>{let ae=new Date(h.date).toLocaleDateString(),Ce=h.project_name||"Regular",Ie=h.status||"Submitted",ke=h.total_hours,Ee=(h.work_description||h.notes||"").replace(/,/g," ");e+=`${ae},${Ce},${Ie},${ke},${Ee}
`});let i=encodeURI(e),o=document.createElement("a");o.setAttribute("href",i);let d=this.teamMembers.find(h=>h.id===this.selectedEmployeeId),p=d?`${d.FirstName}_${d.LastName}`:"WorkReport";o.setAttribute("download",`${p}_${this.month}_${this.year}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)}openPreview(e){return M(this,null,function*(){if(typeof e.hours_breakdown=="string")try{e.hours_breakdown=JSON.parse(e.hours_breakdown)}catch{}yield(yield this.modalCtrl.create({component:ln,cssClass:"side-custom-popup view-work-log",componentProps:{data:e}})).present()})}dismiss(){this.modalCtrl.dismiss()}getStatusColor(e){return e?(e=e.toLowerCase(),e==="verified"||e==="approved"?"success":e==="submitted"||e==="pending"?"primary":e==="rejected"?"danger":"medium"):"medium"}parseBreakdown(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return[]}return Array.isArray(e)?e:[]}};s.\u0275fac=function(i){return new(i||s)(v(j),v(Te),v(be))},s.\u0275cmp=E({type:s,selectors:[["app-team-work-report"]],inputs:{employeeId:"employeeId"},decls:26,vars:11,consts:[[1,"ion-no-border"],[1,"report-header"],["slot","end"],[3,"click"],["name","close-outline"],[1,"filters-toolbar"],[1,"filter-container"],["class","filter-item",4,"ngIf"],[1,"filter-item","short-item"],["placeholder","Month","interface","popover",1,"custom-select",3,"ngModelChange","ionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Year","interface","popover",1,"custom-select",3,"ngModelChange","ionChange","ngModel"],["class","download-section",4,"ngIf"],[1,"report-content"],["class","summary-section",4,"ngIf"],["class","loading-state",4,"ngIf"],["class","empty-state",4,"ngIf"],["class","table-container",4,"ngIf"],[1,"filter-item"],["placeholder","Select Employee","interface","popover",1,"custom-select",3,"ngModelChange","ionChange","ngModel"],[3,"value"],[1,"download-section"],["fill","clear",1,"download-btn",3,"click"],["name","download-outline","slot","icon-only"],[1,"summary-section"],[1,"summary-card","total"],[1,"card-header-icon"],["name","time-outline"],[1,"label"],[1,"value"],[1,"summary-card","present"],["name","calendar-outline"],[1,"summary-card","verified"],["name","checkmark-circle-outline"],[1,"summary-card","leave"],["name","hourglass-outline"],[1,"summary-card","total-hours"],["name","stats-chart-outline"],[1,"loading-state"],["name","crescent"],[1,"empty-state"],["name","document-text-outline",1,"big-icon"],[1,"table-container"],[1,"table-header"],[1,"col","col-date"],[1,"col","col-project"],[1,"col","col-status"],[1,"col","col-hours"],[1,"col","col-desc"],[1,"col","col-action"],[1,"table-body"],["class","table-row clickable-row",3,"click",4,"ngFor","ngForOf"],[1,"table-row","clickable-row",3,"click"],[1,"day"],[1,"date"],[1,"status-badge",3,"ngClass"],["fill","clear","color","primary",1,"row-view-btn"],["name","eye-outline","slot","icon-only"]],template:function(i,o){i&1&&(n(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),a(3),t(),n(4,"ion-buttons",2)(5,"ion-button",3),f("click",function(){return o.dismiss()}),g(6,"ion-icon",4),t()()(),n(7,"ion-toolbar",5)(8,"div",6),C(9,Yn,5,2,"div",7),n(10,"div",8)(11,"ion-label"),a(12,"Month"),t(),n(13,"ion-select",9),S("ngModelChange",function(p){return T(o.month,p)||(o.month=p),p}),f("ionChange",function(){return o.onFilterChange()}),C(14,Gn,2,2,"ion-select-option",10),t()(),n(15,"div",8)(16,"ion-label"),a(17,"Year"),t(),n(18,"ion-select",11),S("ngModelChange",function(p){return T(o.year,p)||(o.year=p),p}),f("ionChange",function(){return o.onFilterChange()}),C(19,Jn,2,2,"ion-select-option",10),t()(),C(20,Qn,3,0,"div",12),t()()(),n(21,"ion-content",13),C(22,Xn,36,5,"div",14)(23,Kn,4,0,"div",15)(24,Zn,6,0,"div",16)(25,nt,16,1,"div",17),t()),i&2&&(l(3),_(o.isManager?"Team Work Report":"My Work Report"),l(6),m("ngIf",o.isManager),l(4),w("ngModel",o.month),l(),m("ngForOf",o.months),l(4),w("ngModel",o.year),l(),m("ngForOf",o.years),l(),m("ngIf",!o.isLoading&&o.reportData.length>0),l(2),m("ngIf",o.summary&&!o.isLoading),l(),m("ngIf",o.isLoading),l(),m("ngIf",!o.isLoading&&o.reportData.length===0),l(),m("ngIf",!o.isLoading&&o.reportData.length>0))},dependencies:[$,N,B,F,Y,H,U,Z,A,J,D,L,R,Q,fe,ue,z,X,K,G,q],styles:[`

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
.report-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.report-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  letter-spacing: -0.05em;
}
.report-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.filters-toolbar[_ngcontent-%COMP%] {
  --background: #f8fafc;
  --border-width: 0 0 1px 0;
  --border-color: #e2e8f0;
  padding: 8px 16px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 180px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 4px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item.short-item[_ngcontent-%COMP%] {
  min-width: 100px;
  flex: 1;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  color: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  --placeholder-color: #94a3b8;
  --icon-color: #1F74BB;
  transition: all 0.2s ease;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .custom-select[_ngcontent-%COMP%]::part(icon) {
  opacity: 1;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .download-section[_ngcontent-%COMP%] {
  margin-top: 16px;
}
.filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .download-section[_ngcontent-%COMP%]   .download-btn[_ngcontent-%COMP%] {
  --color: #1e40af;
  --padding-start: 12px;
  --padding-end: 12px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}
.report-content[_ngcontent-%COMP%] {
  --background: #f8fafc;
  padding: 16px;
}
.summary-section[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  padding: 16px;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  margin-top: 8px;
  text-align: center;
  letter-spacing: 0.5px;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .card-header-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #94a3b8;
  margin-bottom: 4px;
  transition: all 0.2s ease;
}
.summary-section[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.total[_ngcontent-%COMP%] {
  border-left: 4px solid #1F74BB;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.present[_ngcontent-%COMP%] {
  border-left: 4px solid #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.present[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.verified[_ngcontent-%COMP%] {
  border-left: 4px solid #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.verified[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #16a34a;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.absent[_ngcontent-%COMP%] {
  border-left: 4px solid #dc2626;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.absent[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #dc2626;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.leave[_ngcontent-%COMP%] {
  border-left: 4px solid #d97706;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.leave[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #d97706;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.total-hours[_ngcontent-%COMP%] {
  border-left: 4px solid #0284c7;
}
.summary-section[_ngcontent-%COMP%]   .summary-card.total-hours[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #0284c7;
}
.table-container[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  margin: 0 16px 24px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
}
.table-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  background: #f1f5f9;
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}
.table-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.table-container[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {
  display: flex;
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
  transition: background 0.2s;
}
.table-container[_ngcontent-%COMP%]   .table-row.clickable-row[_ngcontent-%COMP%] {
  cursor: pointer;
}
.table-container[_ngcontent-%COMP%]   .table-row.clickable-row[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.table-container[_ngcontent-%COMP%]   .table-row.clickable-row[_ngcontent-%COMP%]:active {
  background: #e2e8f0;
}
.table-container[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.table-container[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #334155;
  font-weight: 500;
}
.table-container[_ngcontent-%COMP%]   .col.col-date[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.table-container[_ngcontent-%COMP%]   .col.col-date[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%] {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
}
.table-container[_ngcontent-%COMP%]   .col.col-date[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1e293b;
}
.table-container[_ngcontent-%COMP%]   .col.col-project[_ngcontent-%COMP%] {
  flex: 1.5;
}
.table-container[_ngcontent-%COMP%]   .col.col-status[_ngcontent-%COMP%] {
  flex: 1;
}
.table-container[_ngcontent-%COMP%]   .col.col-hours[_ngcontent-%COMP%] {
  flex: 0.8;
  font-weight: 600;
  color: #1e3a8a;
}
.table-container[_ngcontent-%COMP%]   .col.col-desc[_ngcontent-%COMP%] {
  flex: 2;
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-container[_ngcontent-%COMP%]   .col.col-action[_ngcontent-%COMP%] {
  flex: 0.5;
  text-align: right;
}
.table-container[_ngcontent-%COMP%]   .col.col-action[_ngcontent-%COMP%]   .row-view-btn[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  margin: 0;
}
.status-badge[_ngcontent-%COMP%] {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  text-transform: uppercase;
}
.status-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 0.9rem;
}
.status-badge.status-verified[_ngcontent-%COMP%], 
.status-badge.status-approved[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #15803d;
}
.status-badge.status-rejected[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
}
.status-badge.status-submitted[_ngcontent-%COMP%], 
.status-badge.status-pending[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #b45309;
}
.loading-state[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
}
.loading-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  color: #cbd5e1;
  margin-bottom: 16px;
}
.loading-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #334155;
  margin-bottom: 8px;
}
.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], 
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 0.95rem;
}
ion-spinner[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  color: #3b82f6;
  margin-bottom: 16px;
}
@media (max-width: 600px) {
  .table-container[_ngcontent-%COMP%]   .col-desc[_ngcontent-%COMP%] {
    display: none;
  }
  .table-container[_ngcontent-%COMP%]   .col-project[_ngcontent-%COMP%] {
    flex: 1;
  }
  .filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%] {
    min-width: 100%;
  }
  .filters-toolbar[_ngcontent-%COMP%]   .filter-container[_ngcontent-%COMP%]   .filter-item.short-item[_ngcontent-%COMP%] {
    min-width: 45%;
    flex: 1;
  }
  .summary-section[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
  .summary-section[_ngcontent-%COMP%]   .summary-card.total-hours[_ngcontent-%COMP%] {
    grid-column: span 2;
  }
}`]});let c=s;return c})();function tt(c,s){if(c&1){let r=y();n(0,"div",44)(1,"div",45)(2,"button",46),f("click",function(){b(r);let i=u();return x(i.navigateToTimesheetApprovals())}),g(3,"ion-icon",47),n(4,"span"),a(5,"Timesheet Approval"),t()(),n(6,"button",46),f("click",function(){b(r);let i=u();return x(i.navigateToLeaveApprovals())}),g(7,"ion-icon",36),n(8,"span"),a(9,"Leaves Approval"),t()(),n(10,"button",46),f("click",function(){b(r);let i=u();return x(i.navigateToAttendanceApprovals())}),g(11,"ion-icon",48),n(12,"span"),a(13,"Attendance Approval"),t()(),n(14,"button",49),g(15,"ion-icon",50),n(16,"span"),a(17,"Team Reports"),t(),g(18,"ion-icon",51),t()()()}}function ot(c,s){if(c&1){let r=y();n(0,"div",52)(1,"ion-searchbar",53),S("ngModelChange",function(i){b(r);let o=u();return T(o.globalSearchQuery,i)||(o.globalSearchQuery=i),x(i)}),f("ionInput",function(){b(r);let i=u();return x(i.onGlobalSearch())})("ionClear",function(){b(r);let i=u();return x(i.resetGlobalSearch())}),t()()}if(c&2){let r=u();l(),w("ngModel",r.globalSearchQuery)}}function it(c,s){if(c&1){let r=y();n(0,"ion-button",54),f("click",function(){b(r);let i=u();return x(i.resetToToday())}),g(1,"ion-icon",55),a(2," Back to Today "),t()}}function rt(c,s){if(c&1){let r=y();n(0,"ion-datetime",56),S("ngModelChange",function(i){b(r);let o=u();return T(o.selectedDate,i)||(o.selectedDate=i),x(i)}),f("ionChange",function(i){b(r);let o=u();return x(o.onDateChange(i))}),t()}if(c&2){let r=u();w("ngModel",r.selectedDate),m("max",r.maxDate)}}function at(c,s){c&1&&(n(0,"span",82),a(1,"You"),t())}function lt(c,s){if(c&1&&(n(0,"span",83),a(1),t()),c&2){let r=u().$implicit;l(),_(r.ProcessName)}}function ct(c,s){if(c&1){let r=y();n(0,"div",59),f("click",function(){let i=b(r).$implicit,o=u(2);return x(o.viewEmployeeAttendance(i))}),n(1,"div",60),g(2,"div",61),n(3,"div",62)(4,"div",63)(5,"div",64)(6,"ion-avatar",65),g(7,"img",66),t()(),n(8,"div",67)(9,"div",68)(10,"span",69),a(11),t(),C(12,at,2,0,"span",70),t(),n(13,"span",71),a(14),t(),C(15,lt,2,1,"span",72),t(),n(16,"div",73),g(17,"span",74),n(18,"span",75),a(19),t()()(),g(20,"div",76),n(21,"div",77)(22,"div",78),g(23,"ion-icon",79),n(24,"span"),a(25),t()(),n(26,"div",78),g(27,"ion-icon",80),n(28,"span",81),a(29),t()()()()()()}if(c&2){let r=s.$implicit,e=u(2);l(),le("current-user-card",e.isCurrentUser(r)),l(),Be("background",e.getAccentColor(r.id)),l(3),Be("border-color",e.getAccentColor(r.id)),l(2),m("src",e.getProfileImage(r),ee),l(4),I("",r.FirstName," ",r.LastName),l(),m("ngIf",e.isCurrentUser(r)),l(2),_(r.EmployeeNumber||"\u2014"),l(),m("ngIf",r.ProcessName),l(),m("ngClass",e.getDisplayStatusClass(r.id)),l(3),_(e.getDisplayStatusText(r.id)),l(6),_(r.LocationName||"Site 1 - TSN"),l(4),_(r.WorkEmail)}}function st(c,s){if(c&1&&(n(0,"div",57),C(1,ct,30,16,"div",58),t()),c&2){let r=u();l(),m("ngForOf",r.filteredTeam)}}function dt(c,s){c&1&&(n(0,"div",84),g(1,"ion-icon",85),n(2,"h3"),a(3,"No matches found"),t(),n(4,"p"),a(5,"Try refining your search keyword"),t()())}function mt(c,s){c&1&&(n(0,"div",86),g(1,"ion-spinner",87),n(2,"p"),a(3,"Updating attendance list..."),t()())}function pt(c,s){if(c&1){let r=y();n(0,"ion-content")(1,"ion-list",88)(2,"ion-item",89),f("click",function(){b(r);let i=u();return x(i.navigateToTeamReports())}),g(3,"ion-icon",90),n(4,"ion-label"),a(5,"Team Attendance Reports"),t()(),n(6,"ion-item",89),f("click",function(){b(r);let i=u();return x(i.navigateToTeamWorkReports())}),g(7,"ion-icon",91),n(8,"ion-label"),a(9,"Team Work Report"),t()()()()}}var fn=(()=>{let s=class s{constructor(e,i,o,d,p){this.employeeService=e,this.attendanceService=i,this.navCtrl=o,this.modalCtrl=d,this.router=p,this.teamMembers=[],this.filteredTeam=[],this.isLoading=!1,this.attendanceStatuses={},this.searchTerm="",this.isManager=!1,this.userRole=null,this.teamAttendanceSummary=null,this.currentUserId=null,this.isHR=!1,this.globalSearchQuery="",this.originalTeam=[],this.env=W.apiURL.startsWith("http")?W.apiURL:`http://${W.apiURL}/`,this.selectedDate=new Date().toISOString(),this.maxDate=new Date().toISOString(),this.currentFilter="all",this.counts={total:0,present:0,absent:0,onLeave:0,notPunched:0}}ngOnInit(){this.updateRole(),this.loadTeamMembers()}updateRole(){this.userRole=(localStorage.getItem("role")||"").toLowerCase(),this.isManager=this.userRole==="manager"||this.userRole==="hr"||this.userRole==="admin",this.isHR=this.userRole==="hr"||this.userRole==="admin"}setFilter(e){this.currentFilter=e,this.applyFilters()}applyFilters(){let e=[...this.teamMembers];if(this.currentFilter!=="all"&&(e=e.filter(i=>{let d=(this.getRealTimeStatus(i.id).status||"").toLowerCase();return this.currentFilter==="present"?d==="in"||d==="present"||d.includes("in")||d==="wfh":this.currentFilter==="absent"?d==="absent":this.currentFilter==="on_leave"?d.includes("leave")||d==="on_leave":this.currentFilter==="not_punched"?d==="not_punched"||d==="not_checked_in"||d==="out"||!d:!0})),this.searchTerm){let i=this.searchTerm.toLowerCase();e=e.filter(o=>o.FirstName?.toLowerCase().includes(i)||o.LastName?.toLowerCase().includes(i)||o.WorkEmail?.toLowerCase().includes(i)||o.DesignationCode?.toLowerCase().includes(i))}this.filteredTeam=e,console.log(this.filteredTeam)}ionViewWillEnter(){this.startAttendancePolling()}ionViewWillLeave(){this.stopAttendancePolling()}ngOnDestroy(){this.stopAttendancePolling()}loadTeamMembers(){this.isLoading=!0;let e=this.selectedDate.split("T")[0];this.employeeService.getTeamAttendanceReport(e).subscribe({next:i=>{if(i?.current_user_id&&(this.currentUserId=i.current_user_id),i?.team_members)this.teamMembers=i.team_members;else if(this.teamMembers.length===0){this.fetchBaseTeamList(e);return}this.processAttendanceData(i)},error:i=>{console.error("Error fetching team report:",i),this.fetchBaseTeamList(e)}})}fetchBaseTeamList(e){this.employeeService.getMyTeamList().subscribe({next:i=>{this.teamMembers=i?.team||(Array.isArray(i)?i:[]),this.employeeService.getTeamAttendanceReport(e).subscribe({next:o=>this.processAttendanceData(o),error:()=>this.processAttendanceData({})})},error:i=>{console.error("Failed to load team list:",i),this.isLoading=!1}})}processAttendanceData(e){let i=e.attendance||[],o=e.on_leave||[],d={},p=this.isTodaySelected();this.teamMembers.forEach(h=>{d[h.id]={status:p?"not_punched":"absent"}}),i.forEach(h=>{d[h.employee_id]={status:h.status||(p?"in":"present"),first_in:h.first_in,last_out:h.last_out,total_hours:h.total_hours}}),o.forEach(h=>{d[h.employee_id]={status:"on_leave",leave_type:h.leave_type}}),this.attendanceStatuses=d,this.originalTeam.length===0&&(this.originalTeam=[...this.teamMembers]),this.applyFilters(),e.summary&&!p?this.counts={total:e.summary.total_team||this.teamMembers.length,present:e.summary.present||0,absent:e.summary.absent||0,onLeave:e.summary.on_leave||0,notPunched:0}:this.calculateCounts(),this.applyFilters(),this.isLoading=!1}calculateCounts(){let e=this.isTodaySelected();this.counts={total:this.teamMembers.length,present:0,absent:0,onLeave:0,notPunched:0},this.teamMembers.forEach(i=>{let d=(this.getRealTimeStatus(i.id).status||"").toLowerCase();d==="in"||d==="present"||d.includes("in")||d==="wfh"?this.counts.present++:d.includes("leave")||d==="on_leave"?this.counts.onLeave++:d==="absent"?this.counts.absent++:e?this.counts.notPunched++:this.counts.absent++})}getProfileImage(e){return e?.profile_image?e.profile_image.startsWith("http")?e.profile_image:`http://${W.apiURL}${e.profile_image}?t=${Date.now()}`:"../../assets/Profile_Picture.png"}handleRefresh(e){this.loadTeamMembers(),setTimeout(()=>{e.target.complete()},1500)}filterTeam(e){this.searchTerm=e.target.value||"",this.applyFilters()}getInitials(e,i){return`${e?.charAt(0)||""}${i?.charAt(0)||""}`.toUpperCase()}getAvatarColor(e){let i=["#1F74BB","#BB2C1F","#00983D"];return i[e%i.length]}getAccentColor(e){let i=(this.getRealTimeStatus(e).status||"").toLowerCase();return i==="in"||i==="present"||i.includes("in")||i==="wfh"?"rgb(0, 152, 61)":i.includes("leave")||i==="on_leave"?"rgb(31, 116, 187)":i==="absent"?"rgb(187, 44, 31)":"#1f74bb"}navigateToLeaveApprovals(){return M(this,null,function*(){yield(yield this.modalCtrl.create({component:cn,cssClass:"side-custom-popup team-popup",backdropDismiss:!1})).present()})}navigateToTimesheetApprovals(){return M(this,null,function*(){yield(yield this.modalCtrl.create({component:sn,cssClass:"side-custom-popup timesheet-popup",backdropDismiss:!1})).present()})}navigateToAttendanceApprovals(){return M(this,null,function*(){yield(yield this.modalCtrl.create({component:dn,cssClass:"side-custom-popup team-popup",backdropDismiss:!1})).present()})}navigateToTeamReports(){return M(this,null,function*(){yield(yield this.modalCtrl.create({component:pn,cssClass:"side-custom-popup team-report-popup",backdropDismiss:!1})).present()})}navigateToTeamWorkReports(){return M(this,null,function*(){yield(yield this.modalCtrl.create({component:gn,cssClass:"side-custom-popup team-report-popup",backdropDismiss:!1})).present()})}navigateToMyTeam(){this.currentFilter="all",this.resetToToday()}onDateChange(e){e.detail.value&&(this.selectedDate=e.detail.value,this.loadTeamMembers())}resetToToday(){this.selectedDate=new Date().toISOString(),this.loadTeamMembers()}isTodaySelected(){let e=new Date().toISOString().split("T")[0],i=this.selectedDate.split("T")[0];return e===i}startAttendancePolling(){this.pollingInterval=setInterval(()=>{this.isTodaySelected()&&this.loadTeamMembers()},18e4)}stopAttendancePolling(){this.pollingInterval&&clearInterval(this.pollingInterval)}getRealTimeStatus(e){return this.attendanceStatuses[e]||{status:this.isTodaySelected()?"not_punched":"absent"}}getDisplayStatusText(e){let i=(this.getRealTimeStatus(e).status||"").toLowerCase();return i==="in"||i==="present"||i.includes("in")||i==="wfh"?"PRESENT":i.includes("leave")||i==="on_leave"?"ON LEAVE":i==="absent"?"ABSENT":i==="not_punched"?"NOT PUNCHED":"OUT"}getDisplayStatusClass(e){let i=(this.getRealTimeStatus(e).status||"").toLowerCase();return i==="in"||i==="present"||i.includes("in")||i==="wfh"?"present":i.includes("leave")||i==="on_leave"?"leave-status":i==="absent"?"absent":"not-punched-status"}onGlobalSearch(){let e=this.globalSearchQuery.trim();e.length>2?(this.isLoading=!0,this.employeeService.searchEmployees(e,1,50).subscribe({next:i=>{this.teamMembers=i.data||[],this.applyFilters(),this.isLoading=!1},error:()=>this.isLoading=!1})):e.length===0&&this.resetGlobalSearch()}resetGlobalSearch(){this.globalSearchQuery="",this.teamMembers=[...this.originalTeam],this.applyFilters()}viewEmployeeAttendance(e){let i=e.id||e.employee_id||e.EmployeeId;i&&this.navCtrl.navigateForward([`/Attendance/employee/${i}`])}isCurrentUser(e){let i=e.id||e.employee_id;return this.currentUserId!==null&&i===this.currentUserId}};s.\u0275fac=function(i){return new(i||s)(v(be),v(we),v(He),v(j),v(qe))},s.\u0275cmp=E({type:s,selectors:[["app-my-team"]],standalone:!1,decls:89,vars:28,consts:[["loadingState",""],[1,"ion-no-border"],["slot","fixed",3,"ionRefresh"],[1,"reports-container"],["class","manager-approval-bar",4,"ngIf"],[1,"reports-header-card"],[1,"header-main"],[1,"header-title-block"],[1,"current-date-label"],["class","global-search-wrapper",4,"ngIf"],[1,"date-selector"],[1,"team-search"],["placeholder","Filter team...",1,"compact-team-search",3,"ionInput","ngModelChange","ngModel"],["fill","clear","color","primary","class","reset-btn",3,"click",4,"ngIf"],[1,"date-picker-wrapper"],["datetime","datetime"],[3,"keepContentsMounted"],[1,"summary-scroll-wrapper"],[1,"premium-summary-grid"],[1,"premium-card","total",3,"click"],[1,"card-content"],[1,"card-icon"],["name","people"],[1,"card-info"],[1,"label"],[1,"value"],[1,"card-illustration"],["name","people-circle-outline"],[1,"premium-card","present",3,"click"],["name","person-add"],["name","checkmark-done-circle-outline"],[1,"premium-card","absent",3,"click"],["name","calendar-clear"],["name","calendar-outline"],[1,"premium-card","leave",3,"click"],["name","airplane"],["name","airplane-outline"],[1,"premium-card","not-punched",3,"click"],["name","hand-right"],["name","hand-right-outline"],[1,"team-section"],["class","premium-team-grid",4,"ngIf","ngIfElse"],["class","empty-state",4,"ngIf"],["trigger","team-reports-trigger","triggerAction","click",1,"reports-popover",3,"dismissOnSelect"],[1,"manager-approval-bar"],[1,"approval-pills-container"],[1,"approval-pill",3,"click"],["name","time-outline"],["name","person-circle-outline"],["id","team-reports-trigger",1,"approval-pill"],["name","bar-chart-outline"],["name","chevron-down-outline",2,"font-size","10px","margin-left","4px"],[1,"global-search-wrapper"],["placeholder","Search employee globally...",1,"premium-global-search",3,"ngModelChange","ionInput","ionClear","ngModel"],["fill","clear","color","primary",1,"reset-btn",3,"click"],["name","today-outline","slot","start"],["id","datetime","presentation","date",3,"ngModelChange","ionChange","ngModel","max"],[1,"premium-team-grid"],["class","employee-card-wrapper",3,"click",4,"ngFor","ngForOf"],[1,"employee-card-wrapper",3,"click"],[1,"premium-emp-card"],[1,"card-accent"],[1,"card-body"],[1,"card-header-row"],[1,"avatar-wrap"],[1,"emp-avatar"],["onerror","this.src='../../assets/Profile_Picture.png'",3,"src"],[1,"emp-info"],[1,"name-row"],[1,"emp-name"],["class","you-badge",4,"ngIf"],[1,"emp-number"],["class","emp-dept",4,"ngIf"],[1,"status-badge",3,"ngClass"],[1,"dot"],[1,"text"],[1,"card-divider"],[1,"card-meta"],[1,"meta-item"],["name","location-outline"],["name","mail-outline"],[1,"meta-mail"],[1,"you-badge"],[1,"emp-dept"],[1,"empty-state"],["name","search-outline"],[1,"loading-container"],["name","crescent"],["lines","none",1,"popover-list"],["button","",3,"click"],["name","calendar-clear-outline","slot","start"],["name","briefcase-outline","slot","start"]],template:function(i,o){if(i&1){let d=y();g(0,"ion-header",1),n(1,"ion-content")(2,"ion-refresher",2),f("ionRefresh",function(h){return b(d),x(o.handleRefresh(h))}),g(3,"ion-refresher-content"),t(),n(4,"div",3),C(5,tt,19,0,"div",4),n(6,"div",5)(7,"div",6)(8,"div",7)(9,"h3"),a(10,"Attendance Reports"),t(),n(11,"p",8),a(12,"Showing results for: "),n(13,"strong"),a(14),P(15,"date"),t()()(),C(16,ot,2,1,"div",9),n(17,"div",10)(18,"div",11)(19,"ion-searchbar",12),f("ionInput",function(h){return b(d),x(o.filterTeam(h))}),S("ngModelChange",function(h){return b(d),T(o.searchTerm,h)||(o.searchTerm=h),x(h)}),t()(),C(20,it,3,0,"ion-button",13),n(21,"div",14),g(22,"ion-datetime-button",15),n(23,"ion-modal",16),C(24,rt,1,2,"ng-template"),t()()()()(),n(25,"div",17)(26,"div",18)(27,"div",19),f("click",function(){return b(d),x(o.setFilter("all"))}),n(28,"div",20)(29,"div",21),g(30,"ion-icon",22),t(),n(31,"div",23)(32,"span",24),a(33,"Total Team"),t(),n(34,"span",25),a(35),t()()(),n(36,"div",26),g(37,"ion-icon",27),t()(),n(38,"div",28),f("click",function(){return b(d),x(o.setFilter("present"))}),n(39,"div",20)(40,"div",21),g(41,"ion-icon",29),t(),n(42,"div",23)(43,"span",24),a(44,"Present"),t(),n(45,"span",25),a(46),t()()(),n(47,"div",26),g(48,"ion-icon",30),t()(),n(49,"div",31),f("click",function(){return b(d),x(o.setFilter("absent"))}),n(50,"div",20)(51,"div",21),g(52,"ion-icon",32),t(),n(53,"div",23)(54,"span",24),a(55,"Absent"),t(),n(56,"span",25),a(57),t()()(),n(58,"div",26),g(59,"ion-icon",33),t()(),n(60,"div",34),f("click",function(){return b(d),x(o.setFilter("on_leave"))}),n(61,"div",20)(62,"div",21),g(63,"ion-icon",35),t(),n(64,"div",23)(65,"span",24),a(66,"On Leave"),t(),n(67,"span",25),a(68),t()()(),n(69,"div",26),g(70,"ion-icon",36),t()(),n(71,"div",37),f("click",function(){return b(d),x(o.setFilter("not_punched"))}),n(72,"div",20)(73,"div",21),g(74,"ion-icon",38),t(),n(75,"div",23)(76,"span",24),a(77,"Not Punched"),t(),n(78,"span",25),a(79),t()()(),n(80,"div",26),g(81,"ion-icon",39),t()()()(),n(82,"div",40),C(83,st,2,1,"div",41)(84,dt,6,0,"div",42),t()(),C(85,mt,4,0,"ng-template",null,0,We),n(87,"ion-popover",43),C(88,pt,10,0,"ng-template"),t()()}if(i&2){let d=ze(86);l(5),m("ngIf",o.isManager),l(9),_(k(15,25,o.selectedDate,"fullDate")),l(2),m("ngIf",o.isHR),l(3),w("ngModel",o.searchTerm),l(),m("ngIf",!o.isTodaySelected()),l(3),m("keepContentsMounted",!0),l(4),le("active",o.currentFilter==="all"),l(8),_(o.counts.total||0),l(3),le("active",o.currentFilter==="present"),l(8),_(o.counts.present||0),l(3),le("active",o.currentFilter==="absent"),l(8),_(o.counts.absent||0),l(3),le("active",o.currentFilter==="on_leave"),l(8),_(o.counts.onLeave||0),l(3),le("active",o.currentFilter==="not_punched"),l(8),_(o.counts.notPunched||0),l(4),m("ngIf",!o.isLoading)("ngIfElse",d),l(),m("ngIf",o.filteredTeam.length===0&&!o.isLoading),l(3),m("dismissOnSelect",!0)}},dependencies:[N,B,F,H,U,te,A,D,Ye,Ge,L,R,Pe,Q,Xe,oe,ie,re,z,nn,tn,G,ne,q],styles:[`@charset "UTF-8";



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
.reports-container[_ngcontent-%COMP%] {
  padding: 32px 24px;
  background: #f4f7fb;
}
.manager-approval-bar[_ngcontent-%COMP%] {
  padding: 0 0 32px 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.manager-approval-bar[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pills-container[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  padding: 2px;
  min-width: max-content;
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pill[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  border-radius: 9999px;
  border: 1px solid #ABABAB;
  background: #ffffff;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pill[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #94a3b8;
  transition: all 0.2s ease;
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pill.active[_ngcontent-%COMP%] {
  background: #0f2b4a;
  border-color: #0f2b4a;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pill.active[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #ffffff;
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pill[_ngcontent-%COMP%]:hover:not(.active) {
  background: #f8fafc;
  border-color: #1F74BB;
  color: #1F74BB;
  transform: translateY(-2px);
}
.manager-approval-bar[_ngcontent-%COMP%]   .approval-pill[_ngcontent-%COMP%]:hover:not(.active)   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.reports-header-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.reports-header-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}
.reports-header-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .header-title-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.reports-header-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .header-title-block[_ngcontent-%COMP%]   .current-date-label[_ngcontent-%COMP%] {
  margin: 6px 0 0 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  font-weight: 500;
}
.reports-header-card[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .header-title-block[_ngcontent-%COMP%]   .current-date-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-weight: 700;
}
.reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%]   .reset-btn[_ngcontent-%COMP%] {
  --padding-start: 16px;
  --padding-end: 16px;
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  height: 40px;
  border-radius: 8px;
  --background: #f8fafc;
  --color: #1F74BB;
}
.reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%]   .reset-btn[_ngcontent-%COMP%]:hover {
  opacity: 0.8;
}
.reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%]   .date-picker-wrapper[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 8px;
  padding: 4px 16px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%]   .date-picker-wrapper[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%]   .date-picker-wrapper[_ngcontent-%COMP%]   ion-datetime-button[_ngcontent-%COMP%] {
  --background: transparent;
  --color: #0f172a;
  font-weight: 700;
}
.summary-scroll-wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
  margin-bottom: 32px;
  padding-bottom: 8px;
  scrollbar-width: thin;
}
.summary-scroll-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {
  height: 4px;
}
.premium-summary-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  min-width: 1000px;
}
@media (max-width: 1100px) {
  .premium-summary-grid[_ngcontent-%COMP%] {
    min-width: unset;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 480px) {
  .premium-summary-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.premium-card[_ngcontent-%COMP%] {
  height: 110px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 24px;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  background: #122E44;
}
.premium-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.premium-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 2;
}
.premium-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1F74BB;
}
.premium-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.premium-card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.premium-card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 1px;
}
.premium-card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  margin-top: 2px;
}
.premium-card[_ngcontent-%COMP%]   .card-illustration[_ngcontent-%COMP%] {
  position: absolute;
  right: -5px;
  bottom: -10px;
  opacity: 0.1;
  z-index: 1;
}
.premium-card[_ngcontent-%COMP%]   .card-illustration[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 60px;
  color: #fff;
  padding: 18px 18px;
}
.team-section[_ngcontent-%COMP%]   .section-actions[_ngcontent-%COMP%] {
  padding: 0 0 32px 0;
}
.team-section[_ngcontent-%COMP%]   .section-actions[_ngcontent-%COMP%]   .custom-searchbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-radius: 8px;
  --box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #ABABAB;
  padding: 0;
}
.team-section[_ngcontent-%COMP%]   .section-actions[_ngcontent-%COMP%]   .custom-searchbar[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.premium-team-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
}
@media (max-width: 600px) {
  .premium-team-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.premium-emp-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  border: 1px solid #edf0f5;
}
.premium-emp-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.premium-emp-card[_ngcontent-%COMP%]   .card-accent[_ngcontent-%COMP%] {
  width: 5px;
  flex-shrink: 0;
  border-radius: 16px 0 0 16px;
  transition: background 0.3s ease;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  flex: 1;
  padding: 18px 20px 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
}
.premium-emp-card[_ngcontent-%COMP%]   .avatar-wrap[_ngcontent-%COMP%] {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2.5px solid transparent;
  padding: 2px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}
.premium-emp-card[_ngcontent-%COMP%]   .avatar-wrap[_ngcontent-%COMP%]   .emp-avatar[_ngcontent-%COMP%] {
  width: 100% !important;
  height: 100% !important;
  min-width: unset !important;
  min-height: unset !important;
  border-radius: 50% !important;
  overflow: hidden;
}
.premium-emp-card[_ngcontent-%COMP%]   .avatar-wrap[_ngcontent-%COMP%]   .emp-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  display: block;
  width: 100% !important;
  height: 100% !important;
  border-radius: 50% !important;
  object-fit: cover;
  object-position: center;
}
.premium-emp-card[_ngcontent-%COMP%]   .emp-info[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.premium-emp-card[_ngcontent-%COMP%]   .emp-info[_ngcontent-%COMP%]   .name-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.premium-emp-card[_ngcontent-%COMP%]   .emp-info[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #1a2535;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.premium-emp-card[_ngcontent-%COMP%]   .emp-info[_ngcontent-%COMP%]   .emp-number[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #7a8aa0;
  letter-spacing: 0.3px;
}
.premium-emp-card[_ngcontent-%COMP%]   .emp-info[_ngcontent-%COMP%]   .emp-dept[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #a0afc0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
  align-self: flex-start;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.present[_ngcontent-%COMP%] {
  background: #e6f9ee;
  color: #00983d;
  border: 1px solid #b3eacc;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.present[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #00983d;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.absent[_ngcontent-%COMP%] {
  background: #fdecea;
  color: #bb2c1f;
  border: 1px solid #f5b8b3;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.absent[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #bb2c1f;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.leave-status[_ngcontent-%COMP%] {
  background: #e8f3fc;
  color: #1f74bb;
  border: 1px solid #b3d4f0;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.leave-status[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #1f74bb;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.not-punched-status[_ngcontent-%COMP%] {
  background: #f0f4f8;
  color: #5a6f85;
  border: 1px solid #cbd5e0;
}
.premium-emp-card[_ngcontent-%COMP%]   .status-badge.not-punched-status[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #8099b0;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-divider[_ngcontent-%COMP%] {
  height: 1px;
  background: #edf0f5;
  margin: 0 -2px;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #5a6f85;
  font-weight: 500;
  min-width: 0;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #8099b0;
  flex-shrink: 0;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.premium-emp-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-mail[_ngcontent-%COMP%] {
  color: #1f74bb;
  font-weight: 500;
}
.current-user-card[_ngcontent-%COMP%] {
  box-shadow:
    0 0 0 4px rgba(31, 116, 187, 0.12),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04) !important;
}
.you-badge[_ngcontent-%COMP%] {
  display: inline-block;
  margin-left: 8px;
  padding: 1px 8px;
  background: #1F74BB;
  color: #fff;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  vertical-align: middle;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  margin-top: 20px;
  font-weight: 700;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: #1F74BB;
}
.empty-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 100px 32px;
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
}
.section-actions[_ngcontent-%COMP%] {
  padding: 0 0 32px 0;
}
.employee-card-wrapper[_ngcontent-%COMP%] {
  cursor: pointer;
}
.global-search-wrapper[_ngcontent-%COMP%] {
  flex: 1;
  max-width: 450px;
  margin: 0 40px;
}
.premium-global-search[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-radius: 12px;
  border: 1px solid #e2e8f0;
  height: 48px;
}
.global-search-dropdown[_ngcontent-%COMP%] {
  --width: 450px;
  --border-radius: 16px;
}
.date-selector[_ngcontent-%COMP%]   .team-search[_ngcontent-%COMP%] {
  width: 240px;
}
.compact-team-search[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-radius: 10px;
  height: 40px;
}
@media (max-width: 767px) {
  .premium-team-grid[_ngcontent-%COMP%] {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 20px;
  }
  .reports-header-card[_ngcontent-%COMP%]   .date-selector[_ngcontent-%COMP%] {
    display: block;
  }
}`]});let c=s;return c})();var gt=[{path:"",component:fn}],ao=(()=>{let s=class s{};s.\u0275fac=function(i){return new(i||s)},s.\u0275mod=Re({type:s}),s.\u0275inj=Le({imports:[$,Y,Z,$e.forChild(gt)]});let c=s;return c})();export{ao as MyTeamPageModule};
