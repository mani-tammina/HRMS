import{a as An}from"./chunk-4YKNXFJR.js";import{a as zn}from"./chunk-VD3H5WUS.js";import{a as Wn}from"./chunk-HHMVNW2S.js";import{a as In}from"./chunk-GKMRXCVX.js";import{a as jn}from"./chunk-NDCRD3QG.js";import{A as Cn,Da as Bn,Fa as Fn,Ga as Dn,J as Pn,K as xn,L as Mn,N as On,R as bn,S as vn,X as wn,Z as yn,b as rn,c as O,d as an,e as cn,g as sn,h as ln,i as pn,j as mn,k as dn,l as gn,la as kn,m as un,ma as Tn,na as Sn,t as _n,u as fn,v as hn,ya as En}from"./chunk-B3PLR2IL.js";import{$a as v,A as D,Ba as b,Ca as x,Da as g,E as Y,Eb as en,F as $,H as N,K as h,Kb as tn,L as C,Na as q,Oa as s,Pa as _,Qa as T,Ra as G,Ta as j,Ua as I,Va as W,Zb as on,_ as c,ab as z,bb as w,ca as k,d as L,ea as R,fa as H,hb as J,j as E,ja as P,p as U,pb as X,qb as K,ra as p,rb as Q,sa as i,t as B,ta as o,ua as m,wb as Z,yb as nn}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as A,b as V,e as F}from"./chunk-JHI3MBHO.js";var Ln=(()=>{let l=class l{constructor(n){this.http=n,this.apiUrl=`http://${jn.apiURL}/api/weekly-off-policies`}getWeeklyOffPolicies(){return this.http.get(this.apiUrl)}};l.\u0275fac=function(t){return new(t||l)(N(tn))},l.\u0275prov=Y({token:l,factory:l.\u0275fac,providedIn:"root"});let a=l;return a})();function Nn(a,l){a&1&&(i(0,"span"),s(1,"Select File"),o())}function Rn(a,l){if(a&1&&(i(0,"span",88),s(1),o()),a&2){let e=g(3);c(),_(e.clientUploadFile.name)}}function Hn(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e.value),c(),_(e.name)}}function qn(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e),c(),_(e)}}function Gn(a,l){if(a&1){let e=b();i(0,"ion-card",67)(1,"ion-card-content")(2,"div",68)(3,"div",69)(4,"div",70),m(5,"ion-icon",71),o(),i(6,"div",72)(7,"label"),s(8,"Project Name"),o(),i(9,"p"),s(10),o()()(),i(11,"div",69)(12,"div",70),m(13,"ion-icon",73),o(),i(14,"div",72)(15,"label"),s(16,"Project Code"),o(),i(17,"p"),s(18),o()()(),i(19,"div",69)(20,"div",70),m(21,"ion-icon",74),o(),i(22,"div",72)(23,"label"),s(24,"Client"),o(),i(25,"p"),s(26),o()()(),i(27,"div",69)(28,"div",70),m(29,"ion-icon",23),o(),i(30,"div",72)(31,"label"),s(32,"Duration"),o(),i(33,"p"),s(34),v(35,"date"),v(36,"date"),o()()()(),i(37,"div",75)(38,"div",76),s(39,"Upload Client Timesheet"),o(),i(40,"div",77)(41,"div",78),m(42,"ion-icon",79),P(43,Nn,2,0,"span",80)(44,Rn,2,1,"span",81),i(45,"input",82),x("change",function(t){h(e);let r=g(2);return C(r.onClientUploadFileChange(t))}),o()(),i(46,"div",83)(47,"ion-item",84)(48,"ion-select",85),W("ngModelChange",function(t){h(e);let r=g(2);return I(r.clientUploadMonth,t)||(r.clientUploadMonth=t),C(t)}),P(49,Hn,2,2,"ion-select-option",61),o()(),i(50,"ion-item",84)(51,"ion-select",86),W("ngModelChange",function(t){h(e);let r=g(2);return I(r.clientUploadYear,t)||(r.clientUploadYear=t),C(t)}),P(52,qn,2,2,"ion-select-option",61),o()()(),i(53,"button",87),x("click",function(){let t=h(e).$implicit,r=g(2);return C(r.uploadClientTimesheet(t.project_id))}),m(54,"ion-icon",43),i(55,"span"),s(56),o()()()()()()}if(a&2){let e=l.$implicit,n=g(2);c(10),_(e.project_name),c(8),_(e.project_code),c(8),_(e.client_name),c(8),G("",w(35,14,e.start_date,"mediumDate")," - ",w(36,17,e.end_date,"mediumDate")),c(9),p("ngIf",!n.clientUploadFile),c(),p("ngIf",n.clientUploadFile),c(4),j("ngModel",n.clientUploadMonth),c(),p("ngForOf",n.months),c(2),j("ngModel",n.clientUploadYear),c(),p("ngForOf",n.years),c(),p("disabled",!n.clientUploadFile||n.clientUploadLoading),c(),p("name",n.clientUploadLoading?"refresh-outline":"cloud-upload"),c(2),_(n.clientUploadLoading?"Uploading...":"Upload")}}function Jn(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e.value),c(),_(e.name)}}function Xn(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e),c(),_(e)}}function Kn(a,l){if(a&1&&(i(0,"div",90)(1,"div",91),m(2,"ion-icon",23),i(3,"div")(4,"span",92),s(5),o(),i(6,"span",93),s(7,"Entries"),o()()(),i(8,"div",94),m(9,"ion-icon",95),i(10,"div")(11,"span",92),s(12),o(),i(13,"span",93),s(14,"Approved"),o()()(),i(15,"div",96),m(16,"ion-icon",13),i(17,"div")(18,"span",92),s(19),o(),i(20,"span",93),s(21,"Pending"),o()()(),i(22,"div",97),m(23,"ion-icon",98),i(24,"div")(25,"span",92),s(26),o(),i(27,"span",93),s(28,"Total Hrs"),o()()()()),a&2){let e=g(2);c(5),_(e.myTimesheets.length),c(7),_(e.getApprovedCount()),c(7),_(e.getPendingCount()),c(7),_(e.getTotalHoursSum())}}function Qn(a,l){a&1&&(i(0,"div",99),m(1,"ion-spinner",100),i(2,"p"),s(3,"Loading timesheets..."),o()())}function Zn(a,l){if(a&1){let e=b();i(0,"button",120),x("click",function(){h(e);let t=g().$implicit,r=g(3);return C(r.editTimesheet(t))}),m(1,"ion-icon",18),o()}}function ne(a,l){if(a&1){let e=b();i(0,"div",103)(1,"div",104)(2,"div",105)(3,"span",106),s(4),v(5,"date"),o(),i(6,"span",107),s(7),v(8,"date"),o()()(),i(9,"div",108)(10,"div",109)(11,"span",110),s(12),o(),i(13,"span",111),s(14),v(15,"titlecase"),o()(),i(16,"div",112)(17,"span",113),m(18,"ion-icon",13),s(19),o(),i(20,"span",113),m(21,"ion-icon",23),s(22),v(23,"date"),o()()(),i(24,"div",114),P(25,Zn,2,0,"button",115),i(26,"button",116),x("click",function(){let t=h(e).$implicit,r=g(3);return C(r.openPreview(t))}),m(27,"ion-icon",117),o(),i(28,"button",118),x("click",function(){let t=h(e).$implicit,r=g(3);return C(r.downloadExcel(t))}),m(29,"ion-icon",119),o()()()}if(a&2){let e=l.$implicit,n=g(3);p("ngClass",n.getStatusColor(e.status)),c(4),_(w(5,9,e.date,"dd")),c(3),_(w(8,12,e.date,"MMM")),c(5),_(e.work_description||e.notes||"No description"),c(),p("ngClass",n.getStatusColor(e.status)),c(),_(z(15,15,e.status||"pending")),c(5),T(" ",e.total_hours," hrs "),c(3),T(" ",w(23,17,e.date,"EEEE, MMM d yyyy")," "),c(3),p("ngIf",e.status&&(e.status.toLowerCase()==="submitted"||e.status.toLowerCase()==="pending"||e.status.toLowerCase()==="rejected"))}}function ee(a,l){if(a&1&&(i(0,"div",101),P(1,ne,30,20,"div",102),o()),a&2){let e=g(2);c(),p("ngForOf",e.paginatedTimesheets)}}function te(a,l){if(a&1){let e=b();i(0,"div",121)(1,"button",122),x("click",function(){h(e);let t=g(2);return C(t.previousPage())}),m(2,"ion-icon",123),o(),i(3,"div",124)(4,"span",125),s(5),o(),i(6,"span",126),s(7,"of"),o(),i(8,"span"),s(9),o()(),i(10,"button",122),x("click",function(){h(e);let t=g(2);return C(t.nextPage())}),m(11,"ion-icon",127),o()()}if(a&2){let e=g(2);c(),p("disabled",e.currentPage===1),c(4),_(e.currentPage),c(4),_(e.totalPages),c(),p("disabled",e.currentPage===e.totalPages)}}function ie(a,l){a&1&&(i(0,"div",128)(1,"div",129),m(2,"ion-icon",130),o(),i(3,"h3"),s(4,"No Reports Found"),o(),i(5,"p"),s(6,"No project reports found for the selected period."),o()())}function oe(a,l){if(a&1){let e=b();i(0,"div",45)(1,"div",46)(2,"div",47),m(3,"ion-icon",48),i(4,"div",49)(5,"h2"),s(6,"Active Project Assignment"),o(),i(7,"p"),s(8,"Complete your daily logs to stay compliant"),o()()()(),P(9,Gn,57,20,"ion-card",50),i(10,"ion-card",51),m(11,"div",52),i(12,"ion-card-header")(13,"div",53)(14,"div",54)(15,"div",55),m(16,"ion-icon",56),o(),i(17,"div")(18,"ion-card-title"),s(19,"My Project Reports"),o(),i(20,"p",57),s(21,"Review your submitted project work logs"),o()()(),i(22,"div",58)(23,"ion-item",59)(24,"ion-select",60),x("ionChange",function(t){h(e);let r=g();return C(r.onMonthChange(t))}),P(25,Jn,2,2,"ion-select-option",61),o()(),i(26,"ion-item",59)(27,"ion-select",60),x("ionChange",function(t){h(e);let r=g();return C(r.onYearChange(t))}),P(28,Xn,2,2,"ion-select-option",61),o()()()()(),i(29,"ion-card-content"),P(30,Kn,29,4,"div",62)(31,Qn,4,0,"div",63)(32,ee,2,1,"div",64)(33,te,12,4,"div",65)(34,ie,7,0,"div",66),o()()()}if(a&2){let e=g();c(9),p("ngForOf",e.assignments),c(15),p("value",e.selectedMonth),c(),p("ngForOf",e.months),c(2),p("value",e.selectedYear),c(),p("ngForOf",e.years),c(2),p("ngIf",!e.loadingList&&e.myTimesheets.length),c(),p("ngIf",e.loadingList),c(),p("ngIf",!e.loadingList&&e.paginatedTimesheets.length),c(),p("ngIf",!e.loadingList&&e.myTimesheets.length>e.itemsPerPage),c(),p("ngIf",!e.loadingList&&!e.myTimesheets.length)}}function re(a,l){if(a&1&&(i(0,"div",131)(1,"span"),s(2),o()()),a&2){let e=g();c(),q(e.selectedDateStatus.toLowerCase().includes("leave")?"status-leave":"status-off"),c(),_(e.selectedDateStatus)}}function ae(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e.project_id),c(),_(e.project_name)}}function ce(a,l){if(a&1&&(i(0,"div",21)(1,"label"),s(2,"Assigned Project"),o(),i(3,"div",132)(4,"ion-item",84)(5,"ion-select",133),P(6,ae,2,2,"ion-select-option",61),o()()()()),a&2){let e=g();c(6),p("ngForOf",e.assignments)}}function se(a,l){if(a&1){let e=b();i(0,"ion-content")(1,"ion-datetime",134),x("ionChange",function(t){h(e);let r=g();return C(r.onDateChange(t))}),i(2,"div",135),s(3,"Select Work Date"),o()()()}if(a&2){let e,n=g();c(),p("max",n.today)("highlightedDates",n.highlightedDates)("value",(e=n.workTrackForm.get("date"))==null?null:e.value)}}function le(a,l){if(a&1){let e=b();i(0,"div",136)(1,"div",137)(2,"label",138),s(3,"Time Slot"),o(),m(4,"input",139),o(),i(5,"div",140)(6,"label",138),s(7,"Task Description"),o(),m(8,"textarea",141),o(),i(9,"div",142)(10,"label",138),s(11,"Hrs"),o(),i(12,"input",143),x("ionChange",function(){let t=h(e).index,r=g();return C(r.onHoursChange(t))}),o()(),i(13,"div",144)(14,"button",145),x("click",function(){let t=h(e).index,r=g();return C(r.removeRow(t))}),m(15,"ion-icon",146),i(16,"span",147),s(17,"Remove"),o()()()()}if(a&2){let e=l.index,n=g();p("formGroupName",e),c(14),p("disabled",n.breakdowns.length<=1)}}function pe(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e.value),c(),_(e.name)}}function me(a,l){if(a&1&&(i(0,"ion-select-option",89),s(1),o()),a&2){let e=l.$implicit;p("value",e),c(),_(e)}}function de(a,l){if(a&1&&(i(0,"div",90)(1,"div",91),m(2,"ion-icon",23),i(3,"div")(4,"span",92),s(5),o(),i(6,"span",93),s(7,"Entries"),o()()(),i(8,"div",94),m(9,"ion-icon",95),i(10,"div")(11,"span",92),s(12),o(),i(13,"span",93),s(14,"Approved"),o()()(),i(15,"div",96),m(16,"ion-icon",13),i(17,"div")(18,"span",92),s(19),o(),i(20,"span",93),s(21,"Pending"),o()()(),i(22,"div",97),m(23,"ion-icon",98),i(24,"div")(25,"span",92),s(26),o(),i(27,"span",93),s(28,"Total Hrs"),o()()()()),a&2){let e=g(2);c(5),_(e.myTimesheets.length),c(7),_(e.getApprovedCount()),c(7),_(e.getPendingCount()),c(7),_(e.getTotalHoursSum())}}function ge(a,l){a&1&&(i(0,"div",99),m(1,"ion-spinner",100),i(2,"p"),s(3,"Loading timesheets..."),o()())}function ue(a,l){if(a&1){let e=b();i(0,"button",120),x("click",function(){h(e);let t=g().$implicit,r=g(3);return C(r.editTimesheet(t))}),m(1,"ion-icon",18),o()}}function _e(a,l){if(a&1){let e=b();i(0,"div",103)(1,"div",104)(2,"div",105)(3,"span",106),s(4),v(5,"date"),o(),i(6,"span",107),s(7),v(8,"date"),o()()(),i(9,"div",108)(10,"div",109)(11,"span",149),m(12,"ion-icon",13),s(13),o(),i(14,"span",111),s(15),v(16,"titlecase"),o()(),i(17,"div",112)(18,"span",113),m(19,"ion-icon",23),s(20),v(21,"date"),o()()(),i(22,"div",114),P(23,ue,2,0,"button",115),i(24,"button",116),x("click",function(){let t=h(e).$implicit,r=g(3);return C(r.openPreview(t))}),m(25,"ion-icon",117),o(),i(26,"button",118),x("click",function(){let t=h(e).$implicit,r=g(3);return C(r.downloadExcel(t))}),m(27,"ion-icon",119),o()()()}if(a&2){let e=l.$implicit,n=g(3);p("ngClass",n.getStatusColor(e.status)),c(4),_(w(5,8,e.date,"dd")),c(3),_(w(8,11,e.date,"MMM")),c(6),T(" ",e.total_hours," hrs "),c(),p("ngClass",n.getStatusColor(e.status)),c(),_(z(16,14,e.status||"pending")),c(5),T(" ",w(21,16,e.date,"EEEE, MMM d yyyy")," "),c(3),p("ngIf",e.status&&(e.status.toLowerCase()==="submitted"||e.status.toLowerCase()==="pending"||e.status.toLowerCase()==="rejected"))}}function fe(a,l){if(a&1&&(i(0,"div",101),P(1,_e,28,19,"div",102),o()),a&2){let e=g(2);c(),p("ngForOf",e.paginatedTimesheets)}}function he(a,l){if(a&1){let e=b();i(0,"div",121)(1,"button",122),x("click",function(){h(e);let t=g(2);return C(t.previousPage())}),m(2,"ion-icon",123),o(),i(3,"div",124)(4,"span",125),s(5),o(),i(6,"span",126),s(7,"of"),o(),i(8,"span"),s(9),o()(),i(10,"button",122),x("click",function(){h(e);let t=g(2);return C(t.nextPage())}),m(11,"ion-icon",127),o()()}if(a&2){let e=g(2);c(),p("disabled",e.currentPage===1),c(4),_(e.currentPage),c(4),_(e.totalPages),c(),p("disabled",e.currentPage===e.totalPages)}}function Ce(a,l){a&1&&(i(0,"div",128)(1,"div",129),m(2,"ion-icon",148),o(),i(3,"h3"),s(4,"No Timesheets Yet"),o(),i(5,"p"),s(6,"Submit your daily work log above to get started."),o()())}function Pe(a,l){if(a&1){let e=b();i(0,"ion-card",51),m(1,"div",52),i(2,"ion-card-header")(3,"div",53)(4,"div",54)(5,"div",55),m(6,"ion-icon",148),o(),i(7,"div")(8,"ion-card-title"),s(9,"My Timesheets"),o(),i(10,"p",57),s(11,"Manage your submitted work logs"),o()()(),i(12,"div",58)(13,"ion-item",59)(14,"ion-select",60),x("ionChange",function(t){h(e);let r=g();return C(r.onMonthChange(t))}),P(15,pe,2,2,"ion-select-option",61),o()(),i(16,"ion-item",59)(17,"ion-select",60),x("ionChange",function(t){h(e);let r=g();return C(r.onYearChange(t))}),P(18,me,2,2,"ion-select-option",61),o()()()()(),i(19,"ion-card-content"),P(20,de,29,4,"div",62)(21,ge,4,0,"div",63)(22,fe,2,1,"div",64)(23,he,12,4,"div",65)(24,Ce,7,0,"div",66),o()()}if(a&2){let e=g();c(14),p("value",e.selectedMonth),c(),p("ngForOf",e.months),c(2),p("value",e.selectedYear),c(),p("ngForOf",e.years),c(2),p("ngIf",!e.loadingList&&e.myTimesheets.length),c(),p("ngIf",e.loadingList),c(),p("ngIf",!e.loadingList&&e.paginatedTimesheets.length),c(),p("ngIf",!e.loadingList&&e.myTimesheets.length>e.itemsPerPage),c(),p("ngIf",!e.loadingList&&!e.myTimesheets.length)}}var Un=(()=>{let l=class l{onClientUploadFileChange(n){let t=n.target.files[0];t&&(this.clientUploadFile=t)}uploadClientTimesheet(n){return F(this,null,function*(){if(!this.clientUploadFile){this.showToast("Please select a file to upload");return}this.clientUploadLoading=!0;let t=new FormData;t.append("file",this.clientUploadFile),t.append("month",this.clientUploadMonth.toString()),t.append("year",this.clientUploadYear.toString()),t.append("project_id",n.toString()),this.timesheetService.uploadClientTimesheet(t).subscribe({next:r=>{this.clientUploadLoading=!1,this.showToast(r?.message||"Client timesheet uploaded successfully"),this.clientUploadFile=null},error:r=>{this.clientUploadLoading=!1,this.showToast("Failed to upload client timesheet")}})})}constructor(n,t,r,d,u,f,M,y){this.fb=n,this.timesheetService=t,this.toastCtrl=r,this.modalCtrl=d,this.leaveService=u,this.employeeService=f,this.weeklyOffService=M,this.cdr=y,this.destroy$=new L,this.clientUploadFile=null,this.clientUploadMonth=new Date().getMonth()+1,this.clientUploadYear=new Date().getFullYear(),this.clientUploadProjectId=null,this.clientUploadLoading=!1,this.loading=!1,this.myTimesheets=[],this.loadingList=!1,this.currentPage=1,this.itemsPerPage=5,this.totalPages=0,this.paginatedTimesheets=[],this.selectedMonth=new Date().getMonth()+1,this.selectedYear=new Date().getFullYear(),this.months=[{value:1,name:"January"},{value:2,name:"February"},{value:3,name:"March"},{value:4,name:"April"},{value:5,name:"May"},{value:6,name:"June"},{value:7,name:"July"},{value:8,name:"August"},{value:9,name:"September"},{value:10,name:"October"},{value:11,name:"November"},{value:12,name:"December"}],this.years=[],this.today=this.formatDate(new Date),this.todayDate="",this.loadingStatus=!0,this.hasProject=!1,this.assignments=[],this.timesheetType="regular",this.highlightedDates=[],this.leaveTooltipMap=new Map,this.weekOffsMap=new Set,this.selectedDateStatus=""}ngOnInit(){this.initForm(),this.initializeYears(),this.setupDisplayDate(),this.loadAllData()}setupDisplayDate(){let n=new Date;this.todayDate=n.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"2-digit"})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadAllData(){let n=new Date().getFullYear();this.loadingStatus=!0,console.log("\u{1F680} [WorkTrack] loadAllData() starting..."),U({assignment:this.timesheetService.getAssignmentStatus().pipe(B(t=>(console.error("\u274C [WorkTrack] getAssignmentStatus error:",t),E({has_project:!1,assignments:[],timesheet_type:"regular"})))),leaves:this.leaveService.getMyLeaves(n).pipe(B(t=>(console.error("\u274C [WorkTrack] getMyLeaves error:",t),E([])))),profile:this.employeeService.getMyProfile().pipe(B(t=>(console.error("\u274C [WorkTrack] getMyProfile error:",t),E({weekly_off_policy_id:null})))),policies:this.weeklyOffService.getWeeklyOffPolicies().pipe(B(t=>(console.error("\u274C [WorkTrack] getWeeklyOffPolicies error:",t),E([]))))}).pipe(D(this.destroy$)).subscribe({next:t=>{try{console.log("\u{1F50D} [WorkTrack] Full forkJoin Response:",t);let r=t?.assignment;if(console.log("\u{1F4CB} [WorkTrack] Assignment Data:",r),!r){console.error("\u274C [WorkTrack] Assignment data is null/undefined"),this.hasProject=!1,this.assignments=[],this.timesheetType="regular",this.loadingStatus=!1,this.cdr.detectChanges();return}this.hasProject=r.has_project===!0,this.timesheetType=r.timesheet_type||"regular",this.assignments=r.assignments||[],this.loadingStatus=!1,console.log("\u2705 [WorkTrack] State Updated:"),console.log("  \u2022 hasProject:",this.hasProject),console.log("  \u2022 timesheetType:",this.timesheetType),console.log("  \u2022 assignments.length:",this.assignments.length),this.hasProject&&this.assignments.length>0?(console.log("\u2713 [WorkTrack] Project-based employee with assignments"),console.log("  \u2022 First project:",this.assignments[0].project_name),this.workTrackForm.patchValue({project_id:this.assignments[0].project_id})):this.hasProject?console.log("\u26A0\uFE0F [WorkTrack] hasProject=true but no assignments found"):console.log("\u2139\uFE0F [WorkTrack] Regular employee (no project assigned)"),this.initializeFirstTimeSlot(),this.loadMyTimesheets(),this.processLeaves(t.leaves);let d=t.profile?.weekly_off_policy_id,u=t.policies?.find(f=>f.id===d);u&&this.mapWeekOffs(u),this.updateHighlightedDates(),this.checkSelectedDateStatus(this.workTrackForm.get("date")?.value),this.cdr.detectChanges()}catch(r){console.error("\u274C [WorkTrack] Error processing response:",r),this.hasProject=!1,this.assignments=[],this.loadingStatus=!1,this.cdr.detectChanges()}},error:t=>{console.error("\u274C [WorkTrack] API Error:",t),this.loadingStatus=!1,this.initializeFirstTimeSlot(),this.loadMyTimesheets()}}),this.workTrackForm.get("date")?.valueChanges.pipe(D(this.destroy$)).subscribe(t=>{this.checkSelectedDateStatus(t)})}processLeaves(n){n.filter(r=>(r.status||"").toUpperCase()==="APPROVED").forEach(r=>{let d=r.type_name||r.type_code||r.leave_type||"Leave",u=r.start_date||r.from_date,f=r.end_date||r.to_date||u;if(!u)return;let M=new Date(u),y=new Date(f||u),S=new Date(M.getFullYear(),M.getMonth(),M.getDate()),Yn=new Date(y.getFullYear(),y.getMonth(),y.getDate());for(;S<=Yn;)this.leaveTooltipMap.set(this.formatDate(S),d),S.setDate(S.getDate()+1)})}initializeYears(){let n=new Date().getFullYear();for(let t=n;t>=n-5;t--)this.years.push(t)}initForm(){this.workTrackForm=this.fb.group({date:[this.today,O.required],project_id:[null],hours_breakdown:this.fb.array([]),work_description:[""],notes:[""]})}get breakdowns(){return this.workTrackForm.get("hours_breakdown")}initializeFirstTimeSlot(){this.breakdowns.clear();let n="";if(this.hasProject&&(this.assignments?.length||0)>0){let t=this.assignments[0];t.start_time&&(n=this.generateTimeSlot(t.start_time))}else n="09:00-10:00";this.breakdowns.push(this.fb.group({hour:[n,O.required],task:["",O.required],hours:[1,[O.required,O.min(.5)]]}))}mapWeekOffs(n){this.weekOffsMap.clear();let t=[];n.sunday_off&&(this.weekOffsMap.add("0"),t.push(0)),n.monday_off&&(this.weekOffsMap.add("1"),t.push(1)),n.tuesday_off&&(this.weekOffsMap.add("2"),t.push(2)),n.wednesday_off&&(this.weekOffsMap.add("3"),t.push(3)),n.thursday_off&&(this.weekOffsMap.add("4"),t.push(4)),n.friday_off&&(this.weekOffsMap.add("5"),t.push(5)),n.saturday_off&&(this.weekOffsMap.add("6"),t.push(6));let r=new Date().getFullYear(),d=new Date(r,0,1),u=new Date(r,11,31);for(let f=new Date(d);f<=u;f.setDate(f.getDate()+1))t.includes(f.getDay())}updateHighlightedDates(){let n=[];this.leaveTooltipMap.forEach((u,f)=>{n.push({date:f,textColor:"#ffffff",backgroundColor:"#b39ddb"})});let t=new Date,r=new Date(t.getFullYear(),t.getMonth()-3,1),d=new Date(t.getFullYear(),t.getMonth()+3,1);for(let u=new Date(r);u<=d;u.setDate(u.getDate()+1)){let f=u.getDay().toString(),M=this.formatDate(u);this.weekOffsMap.has(f)&&!this.leaveTooltipMap.has(M)&&n.push({date:M,textColor:"#475569",backgroundColor:"#f1f5f9"})}this.highlightedDates=n}checkSelectedDateStatus(n){if(!n){this.selectedDateStatus="";return}let t=this.leaveTooltipMap.get(n);if(t){this.selectedDateStatus=`\u{1F3D6}\uFE0F On Leave: ${t}`;return}let r=new Date(n).getDay().toString();if(this.weekOffsMap.has(r)){this.selectedDateStatus="\u{1F3E0} Weekly Off";return}this.selectedDateStatus=""}onDateChange(n){let t=n.detail.value;if(t){let r=t.split("T")[0];this.workTrackForm.get("date")?.setValue(r)}this.modalCtrl.dismiss()}generateTimeSlot(n){if(!n)return"";try{let[t,r]=n.split(":").map(Number),d=new Date;d.setHours(t,r,0,0);let u=new Date(d);u.setHours(t+1,r,0,0);let f=this.formatTime(d),M=this.formatTime(u);return`${f}-${M}`}catch(t){return console.error("Error generating time slot:",t),""}}formatTime(n){let t=n.getHours().toString().padStart(2,"0"),r=n.getMinutes().toString().padStart(2,"0");return`${t}:${r}`}addRow(){let n="";if(this.breakdowns.length>0){let r=this.breakdowns.at(this.breakdowns.length-1).get("hour")?.value;if(r&&r.includes("-")){let d=r.split("-")[1];n=this.generateTimeSlotWithDuration(d,1)}}this.breakdowns.push(this.fb.group({hour:[n,O.required],task:["",O.required],hours:[1,[O.required,O.min(.5)]]}))}onHoursChange(n){let t=this.breakdowns.at(n),r=Number(t.get("hours")?.value||1),d=t.get("hour")?.value;if(d&&d.includes("-")){let u=d.split("-")[0],f=this.generateTimeSlotWithDuration(u,r);t.patchValue({hour:f},{emitEvent:!1}),this.updateSubsequentRows(n)}}updateSubsequentRows(n){for(let t=n+1;t<this.breakdowns.length;t++){let r=this.breakdowns.at(t-1),d=this.breakdowns.at(t),u=r.get("hour")?.value;if(u&&u.includes("-")){let f=u.split("-")[1],M=Number(d.get("hours")?.value||1),y=this.generateTimeSlotWithDuration(f,M);d.patchValue({hour:y},{emitEvent:!1})}}}generateTimeSlotWithDuration(n,t){if(!n)return"";try{let r=n.split(":").map(Number),d=r[0],u=r[1]||0,f=new Date;f.setHours(d,u,0,0);let M=new Date(f);M.setMinutes(f.getMinutes()+t*60);let y=this.formatTime(f),S=this.formatTime(M);return`${y}-${S}`}catch(r){return console.error("Error generating time slot:",r),""}}removeRow(n){this.breakdowns.length>1&&this.breakdowns.removeAt(n)}calculateTotalHours(){return this.breakdowns.controls.reduce((n,t)=>n+Number(t.get("hours")?.value||0),0)}submit(){if(this.workTrackForm.invalid){this.showToast("Please fill all required fields");return}let n={date:this.workTrackForm.value.date,hours_breakdown:this.workTrackForm.value.hours_breakdown,total_hours:this.calculateTotalHours(),notes:this.workTrackForm.value.notes};if(this.loading=!0,this.hasProject){let t=V(A({},n),{project_id:this.workTrackForm.value.project_id||this.assignments?.[0]?.project_id,work_description:this.workTrackForm.value.work_description||this.workTrackForm.value.notes});this.timesheetService.submitProjectTimesheet(t).subscribe({next:()=>{this.loading=!1,this.showToast("Project work submitted successfully"),this.resetForm()},error:()=>{this.loading=!1,this.showToast("Failed to submit project work")}});return}this.timesheetService.submitRegularTimesheet(n).subscribe({next:()=>{this.loading=!1,this.showToast("Timesheet submitted successfully"),this.resetForm()},error:()=>{this.loading=!1,this.showToast("Failed to submit timesheet")}})}resetForm(){this.workTrackForm.reset({date:this.today}),this.initializeFirstTimeSlot(),setTimeout(()=>this.loadMyTimesheets(),100)}editTimesheet(n){let t=document.getElementById("daily-work-log-card");t?t.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0,behavior:"smooth"});let r=new Date(n.date).toISOString().split("T")[0];this.workTrackForm.patchValue({date:r,project_id:n.project_id,work_description:n.work_description||"",notes:n.notes||""}),this.breakdowns.clear();let d=n.hours_breakdown;if(typeof d=="string")try{d=JSON.parse(d)}catch{d=[]}d&&Array.isArray(d)&&d.length>0?d.forEach(u=>{this.breakdowns.push(this.fb.group({hour:[u.hour,O.required],task:[u.task,O.required],hours:[Number(u.hours),[O.required,O.min(.5)]]}))}):this.initializeFirstTimeSlot()}openPreview(n){return F(this,null,function*(){yield(yield this.modalCtrl.create({component:An,cssClass:"side-custom-popup view-work-log",componentProps:{data:n}})).present()})}loadMyTimesheets(){this.loadingList=!0;let n={month:this.selectedMonth,year:this.selectedYear};(this.hasProject?this.timesheetService.getMyProjectTimesheets(n):this.timesheetService.getMyRegularTimesheets(n)).subscribe({next:r=>{this.myTimesheets=r?.data||r||[],this.currentPage=1,this.updatePagination(),this.loadingList=!1},error:()=>{this.loadingList=!1,this.showToast("Failed to load timesheets")}})}updatePagination(){this.totalPages=Math.ceil(this.myTimesheets.length/this.itemsPerPage);let n=(this.currentPage-1)*this.itemsPerPage,t=n+this.itemsPerPage;this.paginatedTimesheets=this.myTimesheets.slice(n,t)}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.updatePagination())}previousPage(){this.currentPage>1&&(this.currentPage--,this.updatePagination())}goToPage(n){n>=1&&n<=this.totalPages&&(this.currentPage=n,this.updatePagination())}onMonthChange(n){this.selectedMonth=Number(n.detail.value),this.loadMyTimesheets()}onYearChange(n){this.selectedYear=Number(n.detail.value),this.loadMyTimesheets()}formatDateDDMMYYYY(n){let t=String(n.getDate()).padStart(2,"0"),r=String(n.getMonth()+1).padStart(2,"0"),d=n.getFullYear();return`${t}-${r}-${d}`}downloadExcel(n){if(!n||!n.hours_breakdown?.length)return;let t="";n.hours_breakdown.forEach((f,M)=>{t+=`
        <tr>
          <td>${M+1}</td>
          <td>${f.hour||"-"}</td>
          <td>${f.task||"-"}</td>
          <td>${f.hours||"-"}</td>
        </tr>
      `}),n.date=this.formatDateDDMMYYYY(new Date(n.date));let r=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="UTF-8" />
    </head>
    <body>
      <table border="1">
        <tr><td>Date</td><td colspan="3">${n.date}</td></tr>
        <tr>
          <th>S.No</th><th>Time</th><th>Task</th><th>Hours</th>
        </tr>
        ${t}
        <tr><td>Note</td><td colspan="3">${n.notes||"-"}</td></tr>
        <tr><td>Total</td><td colspan="3">${n.total_hours}</td></tr>
      </table>
    </body>
    </html>
    `,d=new Blob([r],{type:"application/vnd.ms-excel;charset=utf-8;"}),u=document.createElement("a");u.href=URL.createObjectURL(d),u.download=`Timesheet_${n.date}.xls`,u.click(),URL.revokeObjectURL(u.href)}getStatusColor(n){if(!n)return"warning";switch(n.toLowerCase()){case"verified":case"approved":return"success";case"rejected":return"danger";case"submitted":case"pending":return"warning";default:return"medium"}}getApprovedCount(){return this.myTimesheets?this.myTimesheets.filter(n=>(n.status||"").toLowerCase()==="approved").length:0}getPendingCount(){return this.myTimesheets?this.myTimesheets.filter(n=>(n.status||"").toLowerCase()==="submitted"||(n.status||"").toLowerCase()==="pending").length:0}getTotalHoursSum(){return this.myTimesheets?this.myTimesheets.reduce((n,t)=>n+(parseFloat(t.total_hours)||0),0):0}formatDate(n){let t=n.getFullYear(),r=String(n.getMonth()+1).padStart(2,"0"),d=String(n.getDate()).padStart(2,"0");return`${t}-${r}-${d}`}showToast(n){return F(this,null,function*(){(yield this.toastCtrl.create({message:n,duration:2e3})).present()})}};l.\u0275fac=function(t){return new(t||l)(k(_n),k(zn),k(Fn),k(Bn),k(Wn),k(In),k(Ln),k(J))},l.\u0275cmp=R({type:l,selectors:[["app-work-track"]],standalone:!1,decls:72,vars:15,consts:[[1,"ion-padding","premium-page-container"],[1,"glass-background"],[1,"glass-overlay"],[1,"glow-flare","flare-1"],[1,"glow-flare","flare-2"],[1,"bokeh-sparkle"],[1,"page-content-wrapper"],[1,"premium-top-bar"],[1,"title-group"],[1,"main-title"],[1,"sub-title"],[1,"top-actions"],[1,"status-pill","highlight"],["name","time-outline"],["class","animate-in",4,"ngIf"],[1,"animate-in","delay-1"],["id","daily-work-log-card",1,"glass-card","worklog-premium"],[1,"header-content"],["name","create-outline"],[1,"premium-form",3,"formGroup"],[1,"form-grid"],[1,"input-card"],["id","open-date-modal",1,"custom-datepicker"],["name","calendar-outline"],["name","chevron-down-outline",1,"chevron"],["class","date-status",4,"ngIf"],["class","input-card",4,"ngIf"],["trigger","open-date-modal",1,"premium-datepicker-modal"],["formArrayName","hours_breakdown",1,"log-cards-container"],[1,"log-cards-header"],[1,"col-time"],[1,"col-task"],[1,"col-hrs"],[1,"col-action"],["class","log-card-row",3,"formGroupName",4,"ngFor","ngForOf"],[1,"form-footer"],[1,"total-hours-hero"],["name","pulse-outline"],[1,"text"],[1,"footer-actions"],["type","button",1,"premium-action-btn","secondary",3,"click"],["name","add-outline"],["type","button",1,"premium-action-btn","primary","large",3,"click","disabled"],[3,"name"],["class","glass-card timesheets-premium",4,"ngIf"],[1,"animate-in"],[1,"project-banner-card"],[1,"banner-inner"],["name","briefcase",1,"banner-icon"],[1,"banner-text"],["class","glass-card project-assignment-premium ion-margin-bottom",4,"ngFor","ngForOf"],[1,"glass-card","timesheets-premium"],[1,"ts-accent-bar"],[1,"ts-card-header"],[1,"ts-header-left"],[1,"ts-icon-box"],["name","documents-outline"],[1,"ts-subtitle"],[1,"ts-filter-bar"],["lines","none",1,"glass-select","mini"],["interface","popover",3,"ionChange","value"],[3,"value",4,"ngFor","ngForOf"],["class","ts-summary-bar",4,"ngIf"],["class","ts-loading",4,"ngIf"],["class","ts-row-list",4,"ngIf"],["class","ts-pagination",4,"ngIf"],["class","ts-empty",4,"ngIf"],[1,"glass-card","project-assignment-premium","ion-margin-bottom"],[1,"project-info-grid"],[1,"info-item"],[1,"icon-wrap"],["name","rocket-outline"],[1,"content"],["name","code-slash-outline"],["name","business-outline"],[1,"premium-upload-section"],[1,"section-title"],[1,"upload-controls"],[1,"file-drop-zone"],["name","cloud-upload-outline"],[4,"ngIf"],["class","selected-filename",4,"ngIf"],["type","file","accept",".pdf,.xlsx,.xls,.jpg,.jpeg,.png",3,"change"],[1,"select-group"],["lines","none",1,"glass-select"],["interface","popover","placeholder","Month",3,"ngModelChange","ngModel"],["interface","popover","placeholder","Year",3,"ngModelChange","ngModel"],[1,"premium-action-btn","primary",3,"click","disabled"],[1,"selected-filename"],[3,"value"],[1,"ts-summary-bar"],[1,"ts-stat-chip","total"],[1,"chip-val"],[1,"chip-lbl"],[1,"ts-stat-chip","approved"],["name","checkmark-circle-outline"],[1,"ts-stat-chip","pending"],[1,"ts-stat-chip","hours"],["name","hourglass-outline"],[1,"ts-loading"],[1,"center-spinner"],[1,"ts-row-list"],["class","ts-row-card",3,"ngClass",4,"ngFor","ngForOf"],[1,"ts-row-card",3,"ngClass"],[1,"ts-row-left"],[1,"ts-date-badge"],[1,"day"],[1,"mon"],[1,"ts-row-body"],[1,"ts-row-top"],[1,"ts-desc"],[1,"status-pill",3,"ngClass"],[1,"ts-row-meta"],[1,"meta-item"],[1,"ts-row-actions"],["class","icon-btn edit","title","Edit",3,"click",4,"ngIf"],["title","Preview",1,"icon-btn","view",3,"click"],["name","eye-outline"],["title","Download",1,"icon-btn","download",3,"click"],["name","download-outline"],["title","Edit",1,"icon-btn","edit",3,"click"],[1,"ts-pagination"],[1,"page-btn",3,"click","disabled"],["name","chevron-back-outline"],[1,"page-indicator"],[1,"active-page"],[1,"sep"],["name","chevron-forward-outline"],[1,"ts-empty"],[1,"ts-empty-icon"],["name","document-text-outline"],[1,"date-status"],[1,"glass-select-wrap"],["formControlName","project_id","interface","popover","placeholder","Select Project"],["presentation","date",3,"ionChange","max","highlightedDates","value"],["slot","title"],[1,"log-card-row",3,"formGroupName"],[1,"card-field","col-time"],[1,"mobile-label"],["formControlName","hour","placeholder","e.g. 10 AM",1,"glass-input"],[1,"card-field","col-task"],["formControlName","task","placeholder","Describe your task...","rows","1",1,"glass-textarea"],[1,"card-field","col-hrs"],["type","number","formControlName","hours",1,"glass-input","center",3,"ionChange"],[1,"card-field","col-action"],[1,"remove-btn",3,"click","disabled"],["name","trash-outline"],[1,"mobile-remove-text"],["name","receipt-outline"],[1,"ts-hours-pill"]],template:function(t,r){if(t&1&&(i(0,"ion-content",0)(1,"div",1),m(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),o(),i(6,"div",6)(7,"div",7)(8,"div",8)(9,"h3",9),s(10,"Work Track"),o(),i(11,"p",10),s(12,"Track your daily work hours and manage timesheets"),o()(),i(13,"div",11)(14,"div",12),m(15,"ion-icon",13),i(16,"span"),s(17),o()()()(),P(18,oe,35,10,"div",14),i(19,"div",15)(20,"ion-card",16)(21,"ion-card-header")(22,"div",17)(23,"ion-card-title"),m(24,"ion-icon",18),s(25," Daily Work Log "),o(),i(26,"p"),s(27,"Define your tasks and track accurate hours"),o()()(),i(28,"ion-card-content")(29,"form",19)(30,"div",20)(31,"div",21)(32,"label"),s(33,"Work Date"),o(),i(34,"div",22),m(35,"ion-icon",23),i(36,"span"),s(37),v(38,"date"),o(),m(39,"ion-icon",24),o(),P(40,re,3,3,"div",25),o(),P(41,ce,7,1,"div",26),o(),i(42,"ion-modal",27),P(43,se,4,3,"ng-template"),o(),i(44,"div",28)(45,"div",29)(46,"div",30),s(47,"Time Slot"),o(),i(48,"div",31),s(49,"Task Description"),o(),i(50,"div",32),s(51,"Hrs"),o(),m(52,"div",33),o(),P(53,le,18,2,"div",34),o(),i(54,"div",35)(55,"div",36),m(56,"ion-icon",37),i(57,"div",38)(58,"span"),s(59,"Total Calculated"),o(),i(60,"h2"),s(61),o()()(),i(62,"div",39)(63,"button",40),x("click",function(){return r.addRow()}),m(64,"ion-icon",41),i(65,"span"),s(66,"Add Slot"),o()(),i(67,"button",42),x("click",function(){return r.submit()}),m(68,"ion-icon",43),i(69,"span"),s(70),o()()()()()()(),P(71,Pe,25,9,"ion-card",44),o()()()),t&2){let d;c(17),T("Today: ",r.todayDate),c(),p("ngIf",r.hasProject),c(11),p("formGroup",r.workTrackForm),c(8),_(w(38,12,(d=r.workTrackForm.get("date"))==null?null:d.value,"longDate")),c(3),p("ngIf",r.selectedDateStatus),c(),p("ngIf",r.hasProject),c(12),p("ngForOf",r.breakdowns.controls),c(8),T("",r.calculateTotalHours()," Hours"),c(6),p("disabled",r.loading),c(),p("name",r.loading?"refresh-outline":"send-outline"),c(2),_(r.loading?"Submitting...":"Submit Log"),c(),p("ngIf",!r.hasProject)}},dependencies:[X,K,Q,ln,rn,pn,an,cn,sn,mn,un,dn,gn,Pn,xn,Mn,On,bn,vn,wn,yn,kn,Tn,Sn,En,Cn,Z,nn],styles:[`@charset "UTF-8";



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
.premium-page-container[_ngcontent-%COMP%] {
  --background: #f4f7fb;
  position: relative;
  min-height: 100vh;
  padding: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .glass-background[_ngcontent-%COMP%] {
  display: none;
}
.premium-page-container[_ngcontent-%COMP%]   .page-content-wrapper[_ngcontent-%COMP%] {
  position: relative;
  z-index: 10;
  margin: 0 auto;
  padding: 32px 24px;
  padding-bottom: 80px;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .page-content-wrapper[_ngcontent-%COMP%] {
    padding: 16px 12px;
    padding-bottom: 60px;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .premium-top-bar[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-top-bar[_ngcontent-%COMP%]   .main-title[_ngcontent-%COMP%] {
  font-size: clamp(1.375rem, 2vw + 0.5rem, 1.25rem) !important;
  font-weight: 500;
  color: #0f172a;
  margin: 0 0 4px 0;
  letter-spacing: -0.05em;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-top-bar[_ngcontent-%COMP%]   .sub-title[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  margin: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-top-bar[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid #ABABAB;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0f172a;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-top-bar[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 18px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-top-bar[_ngcontent-%COMP%]   .status-pill.highlight[_ngcontent-%COMP%] {
  border-color: #1F74BB;
  background: #e8f0fb;
  color: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin-bottom: 24px;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f1f5f9;
  padding: 24px;
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  color: #0f172a;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 20px;
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  margin: 4px 0 0 0;
}
.premium-page-container[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 24px;
}
.premium-page-container[_ngcontent-%COMP%]   .project-banner-card[_ngcontent-%COMP%] {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
}
.premium-page-container[_ngcontent-%COMP%]   .project-banner-card[_ngcontent-%COMP%]   .banner-inner[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.premium-page-container[_ngcontent-%COMP%]   .project-banner-card[_ngcontent-%COMP%]   .banner-inner[_ngcontent-%COMP%]   .banner-icon[_ngcontent-%COMP%] {
  font-size: 28px;
  color: #16a34a;
}
.premium-page-container[_ngcontent-%COMP%]   .project-banner-card[_ngcontent-%COMP%]   .banner-inner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  color: #15803d;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  margin: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .project-banner-card[_ngcontent-%COMP%]   .banner-inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  margin: 2px 0 0 0;
}
.premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .icon-wrap[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f1f5f9;
}
.premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .icon-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #475569;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.8px;
}
.premium-page-container[_ngcontent-%COMP%]   .project-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  margin: 2px 0 0 0;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  border: 1.5px dashed #ABABAB;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 20px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .file-drop-zone[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 240px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .file-drop-zone[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: #e8f0fb;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .file-drop-zone[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #475569;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .file-drop-zone[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #1e293b;
  font-weight: 600;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .file-drop-zone[_ngcontent-%COMP%]   .selected-filename[_ngcontent-%COMP%] {
  color: #16a34a;
  font-weight: 700;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .file-drop-zone[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-upload-section[_ngcontent-%COMP%]   .upload-controls[_ngcontent-%COMP%]   .select-group[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table-container[_ngcontent-%COMP%] {
  overflow-x: auto;
  position: relative;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 10px 16px;
  text-align: left;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 16px;
  color: #1e293b;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
  border-left: 1px solid #f1f5f9;
  border-radius: 8px 0 0 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
  border-right: 1px solid #f1f5f9;
  border-radius: 0 8px 8px 0;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .date-text[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .desc-cell[_ngcontent-%COMP%] {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .hours-badge[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-pill.success[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-pill.warning[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-pill.danger[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-table[_ngcontent-%COMP%]   .status-pill.primary[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.15);
}
.premium-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #ABABAB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  color: #1F74BB;
  background: #e8f0fb;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .custom-datepicker[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .glass-select-wrap[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #0f172a;
  transition: all 0.2s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .custom-datepicker[_ngcontent-%COMP%]:hover, 
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .glass-select-wrap[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: #f8fafc;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .custom-datepicker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .glass-select-wrap[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  flex: 1;
  font-weight: 700;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .custom-datepicker[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .glass-select-wrap[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 14px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .custom-datepicker[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .glass-select-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 20px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .date-status[_ngcontent-%COMP%] {
  margin-top: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .date-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .date-status[_ngcontent-%COMP%]   .status-leave[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-form[_ngcontent-%COMP%]   .input-card[_ngcontent-%COMP%]   .date-status[_ngcontent-%COMP%]   .status-off[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #475569;
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .log-cards-header[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 15% 65% 10% 10%;
  padding: 0 16px 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .log-cards-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .log-cards-header[_ngcontent-%COMP%] {
    display: none;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .log-card-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 15% 65% 10% 10%;
  gap: 12px;
  align-items: center;
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .log-card-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 16px;
    align-items: flex-start;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .card-field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .card-field.col-action[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .card-field.col-action[_ngcontent-%COMP%] {
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 8px;
    border-top: 1px solid #f1f5f9;
    padding-top: 16px;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .mobile-label[_ngcontent-%COMP%] {
  display: none;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .mobile-label[_ngcontent-%COMP%] {
    display: block;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .mobile-remove-text[_ngcontent-%COMP%] {
  display: none;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .mobile-remove-text[_ngcontent-%COMP%] {
    display: inline;
    margin-left: 6px;
    font-size: 13px;
    font-weight: 700;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%] {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 10px 14px;
  color: #0f172a;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 500;
  transition: all 0.12s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-input[_ngcontent-%COMP%]:focus, 
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-textarea[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  background: #ffffff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.1);
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-input.center[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-textarea.center[_ngcontent-%COMP%] {
  text-align: center;
  font-weight: 700;
  color: #1F74BB;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-input.center[_ngcontent-%COMP%], 
   .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .glass-textarea.center[_ngcontent-%COMP%] {
    text-align: left;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #fef2f2;
  border: none;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%] {
    width: auto;
    padding: 0 16px;
    height: 36px;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.premium-page-container[_ngcontent-%COMP%]   .log-cards-container[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: scale(1.05);
}
.premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  padding: 24px 32px;
  border-radius: 16px;
  border: 1px solid #ABABAB;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 24px;
    padding: 20px;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .total-hours-hero[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .total-hours-hero[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 40px;
  color: #16a34a;
}
.premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .total-hours-hero[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: block;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .total-hours-hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  color: #0f172a;
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
  font-weight: 700;
  margin: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%] {
    flex-direction: column;
    width: 100%;
  }
  .premium-page-container[_ngcontent-%COMP%]   .form-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn[_ngcontent-%COMP%] {
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn.primary[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: #ffffff;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn.primary[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  transform: translateY(-2px);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn.primary.large[_ngcontent-%COMP%] {
  padding: 16px 40px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn.secondary[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  color: #1e293b;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn.secondary[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-action-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.premium-page-container[_ngcontent-%COMP%]   ion-item.glass-select[_ngcontent-%COMP%] {
  --background: transparent;
  --padding-start: 0;
  --inner-padding-end: 0;
  --min-height: auto;
  width: 100%;
}
.premium-page-container[_ngcontent-%COMP%]   ion-item.glass-select[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  width: 100%;
  color: #0f172a;
  font-weight: 700;
  --padding-start: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   ion-item.glass-select.mini[_ngcontent-%COMP%] {
  height: 38px;
  padding: 0 12px;
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   ion-item.glass-select.mini[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-pagination[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #ABABAB;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: #1F74BB;
  color: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%]   .premium-pagination[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .premium-pagination[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {
  color: #0f172a;
}
.premium-page-container[_ngcontent-%COMP%]   .center-spinner[_ngcontent-%COMP%] {
  --color: #1F74BB;
}
.premium-datepicker-modal[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-radius: 16px;
  --box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
  --width: 380px;
  --height: 480px;
}
.premium-datepicker-modal[_ngcontent-%COMP%]   ion-datetime[_ngcontent-%COMP%] {
  --background: #ffffff;
  color: #0f172a;
  --ion-color-primary: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%] {
}
.premium-page-container[_ngcontent-%COMP%]   .ts-accent-bar[_ngcontent-%COMP%] {
  height: 4px;
  background: #1F74BB;
  border-radius: 16px 16px 0 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%]   .ts-header-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%]   .ts-header-left[_ngcontent-%COMP%]   .ts-icon-box[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #e8f0fb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%]   .ts-header-left[_ngcontent-%COMP%]   .ts-icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 22px;
  color: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%]   .ts-header-left[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%]   .ts-header-left[_ngcontent-%COMP%]   .ts-subtitle[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  margin: 4px 0 0 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-card-header[_ngcontent-%COMP%]   .ts-filter-bar[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%] {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 120px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #ABABAB;
  transition: all 0.2s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 22px;
  flex-shrink: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip[_ngcontent-%COMP%]   .chip-val[_ngcontent-%COMP%] {
  display: block;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip[_ngcontent-%COMP%]   .chip-lbl[_ngcontent-%COMP%] {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #475569;
  margin-top: 2px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.total[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.total[_ngcontent-%COMP%]   .chip-val[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.approved[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #16a34a;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.approved[_ngcontent-%COMP%]   .chip-val[_ngcontent-%COMP%] {
  color: #16a34a;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.pending[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #d97706;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.pending[_ngcontent-%COMP%]   .chip-val[_ngcontent-%COMP%] {
  color: #d97706;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.hours[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #0284c7;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-summary-bar[_ngcontent-%COMP%]   .ts-stat-chip.hours[_ngcontent-%COMP%]   .chip-val[_ngcontent-%COMP%] {
  color: #0284c7;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-loading[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  border-left: 4px solid #cbd5e1;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card.success[_ngcontent-%COMP%] {
  border-left-color: #16a34a;
  background:
    linear-gradient(
      to right,
      #f0fdf4 0%,
      #ffffff 60px);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card.warning[_ngcontent-%COMP%], 
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card.primary[_ngcontent-%COMP%] {
  border-left-color: #d97706;
  background:
    linear-gradient(
      to right,
      #fffbeb 0%,
      #ffffff 60px);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card.danger[_ngcontent-%COMP%] {
  border-left-color: #dc2626;
  background:
    linear-gradient(
      to right,
      #fef2f2 0%,
      #ffffff 60px);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-left[_ngcontent-%COMP%] {
  flex-shrink: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-date-badge[_ngcontent-%COMP%] {
  width: 52px;
  height: 56px;
  border-radius: 12px;
  background: #e8f0fb;
  border: 1px solid rgba(31, 116, 187, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-date-badge[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%] {
  font-size: clamp(1rem, 1vw + 0.25rem, 1.375rem);
  font-weight: 800;
  color: #1F74BB;
  line-height: 1.1;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-date-badge[_ngcontent-%COMP%]   .mon[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1F74BB;
  opacity: 0.8;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-top[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-top[_ngcontent-%COMP%]   .ts-desc[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-top[_ngcontent-%COMP%]   .ts-hours-pill[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #e8f0fb;
  color: #1F74BB;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  padding: 4px 12px;
  border-radius: 9999px;
  flex-shrink: 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-top[_ngcontent-%COMP%]   .ts-hours-pill[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-body[_ngcontent-%COMP%]   .ts-row-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #94a3b8;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
@media (max-width: 768px) {
  .premium-page-container[_ngcontent-%COMP%]   .ts-row-card[_ngcontent-%COMP%]   .ts-row-actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: flex-end;
    padding-top: 12px;
    border-top: 1px dashed #f1f5f9;
  }
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #ABABAB;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: #1F74BB;
  color: #1F74BB;
  background: #e8f0fb;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%]   .page-indicator[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  font-weight: 500;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%]   .page-indicator[_ngcontent-%COMP%]   .active-page[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #1F74BB;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 700;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-pagination[_ngcontent-%COMP%]   .page-indicator[_ngcontent-%COMP%]   .sep[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.premium-page-container[_ngcontent-%COMP%]   .ts-empty[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 24px;
  text-align: center;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-empty[_ngcontent-%COMP%]   .ts-empty-icon[_ngcontent-%COMP%] {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e8f0fb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-empty[_ngcontent-%COMP%]   .ts-empty-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 36px;
  color: #1F74BB;
  opacity: 0.6;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}
.premium-page-container[_ngcontent-%COMP%]   .ts-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  margin: 0;
  max-width: 280px;
}`]});let a=l;return a})();var xe=[{path:"",component:Un}],Ve=(()=>{let l=class l{};l.\u0275fac=function(t){return new(t||l)},l.\u0275mod=H({type:l}),l.\u0275inj=$({imports:[en,fn,hn,Dn,on.forChild(xe)]});let a=l;return a})();export{Ve as WorkTrackPageModule};
