import{a as Rn}from"./chunk-JSLZV2FC.js";import{a as Un,b as nn}from"./chunk-K6CLB273.js";import{a as Gn}from"./chunk-HHMVNW2S.js";import{a as Yn}from"./chunk-DA4OVRGX.js";import{a as Wn}from"./chunk-GKMRXCVX.js";import{a as Nn}from"./chunk-C76DRQJT.js";import{a as X}from"./chunk-NDCRD3QG.js";import{A as hn,Aa as $n,B as vn,Ga as qn,H as wn,I as kn,J as yn,Q as Sn,R as En,V as In,W as Fn,X as zn,Y as Tn,_ as An,d as un,g as bn,ha as Bn,ja as Dn,ka as Ln,ra as Hn,ta as Vn,u as xn,ya as jn}from"./chunk-B3PLR2IL.js";import{$a as Q,A as S,Ba as w,Bb as Cn,Ca as b,Da as d,Eb as Pn,F as rn,K as M,Ka as en,L as O,La as V,M as F,Ma as Y,N as z,Oa as r,Pa as u,Qa as I,Ra as j,Sa as gn,Ta as G,Ua as Z,Va as J,Vb as Mn,Z as L,Zb as On,_ as l,bb as K,ca as T,d as cn,ea as ln,eb as tn,fa as sn,hb as dn,ja as P,pb as mn,qb as pn,ra as m,rb as _n,sa as e,ta as t,ua as _,ya as N,yb as fn,za as U}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as q,b as W,e as an}from"./chunk-JHI3MBHO.js";function Kn(o,s){if(o&1&&_(0,"img",119),o&2){let n=d();m("src",n.profileImageUrl,L)}}function Xn(o,s){o&1&&(e(0,"div",120),_(1,"ion-icon",121),t())}function ne(o,s){if(o&1&&(e(0,"span",122),r(1),t()),o&2){let n=d();l(),u(n.getStatusLabel())}}function ee(o,s){if(o&1&&(e(0,"span",123),r(1),t()),o&2){let n=d();l(),u(n.currentEmployee.location_name)}}function te(o,s){if(o&1){let n=w();e(0,"button",25),b("click",function(){M(n);let c=d();return O(c.attendance())}),_(1,"img",124),e(2,"span"),r(3,"My Attendance"),t()()}}function oe(o,s){if(o&1){let n=w();e(0,"button",25),b("click",function(){M(n);let c=d();return O(c.leaves())}),_(1,"img",125),e(2,"span"),r(3,"Apply Leave"),t()()}}function ie(o,s){o&1&&(e(0,"div",126),_(1,"app-clock-button"),t())}function ae(o,s){if(o&1&&_(0,"div",128),o&2){let n=s.$implicit;V("width",n.widthPct,"%"),Y("seg-work",n.type==="work")("seg-break",n.type==="break")}}function ce(o,s){if(o&1&&(N(0),P(1,ae,1,6,"div",127),U()),o&2){let n=d();l(),m("ngForOf",n.getAttendanceSegments(n.todayAttendance))}}function re(o,s){o&1&&_(0,"div",129)}function le(o,s){if(o&1&&(e(0,"div",130),_(1,"span",131),e(2,"span",132),r(3,"Work"),t(),_(4,"span",133),e(5,"span",132),r(6),t()()),o&2){let n=d();l(6),I("Break ",n.getBreakHours(n.todayAttendance))}}function se(o,s){if(o&1&&_(0,"img",141),o&2){let n=d(2).$implicit,i=d();m("src",i.env+n.icon_path,L)}}function ge(o,s){if(o&1&&_(0,"ion-icon",142),o&2){let n=d(2).$implicit;m("name",n.code==="CL"||n.code==="PL"?"umbrella":n.code==="SL"?"bed":"calendar")}}function de(o,s){if(o&1&&(N(0),e(1,"div",135),P(2,se,1,1,"img",136)(3,ge,1,1,"ion-icon",137),t(),e(4,"p",138),r(5),t(),e(6,"p",139)(7,"span",140),r(8),Q(9,"number"),Q(10,"number"),t(),r(11," days left "),t(),U()),o&2){let n=d().$implicit;l(),V("background-color",n.bg_color||"")("color",n.bg_color?"#ffffff":""),Y("leave-casual",n.code==="CL"||n.code==="PL")("leave-sick",n.code==="SL")("leave-compoff",n.code==="CO"),l(),m("ngIf",n.icon_path),l(),m("ngIf",!n.icon_path),l(2),u(n.title),l(3),j("",K(9,15,n.available,"2.0-0"),"/",K(10,18,n.allocated_days,"2.0-0"))}}function me(o,s){if(o&1&&(e(0,"div",134),P(1,de,12,21,"ng-container",117),t()),o&2){let n=s.$implicit;l(),m("ngIf",n.code!=="LOP")}}function pe(o,s){if(o&1&&(e(0,"div",39)(1,"span",143),r(2),t()()),o&2){let n=d();l(2),I("",n.announcements.length," new")}}function _e(o,s){o&1&&(e(0,"div",144)(1,"p"),r(2,"No new announcements at this time."),t()())}function fe(o,s){if(o&1&&(e(0,"div",145)(1,"div",146)(2,"div",147)(3,"div",148),_(4,"img",149),t(),e(5,"div",150)(6,"h4",151),r(7),t(),e(8,"p",152),r(9),t(),e(10,"div",153)(11,"span",154),r(12,"Active Announcement"),t(),e(13,"span",155),r(14,"\u2022"),t(),e(15,"div",156),_(16,"img",157),e(17,"span",158),r(18,"HR Team"),t()()()(),e(19,"div",159)(20,"div",160)(21,"span",161),r(22,"\u{1F44D}"),t(),e(23,"span",162),r(24,"24"),t()(),e(25,"div",160)(26,"span",161),r(27,"\u{1F4AC}"),t(),e(28,"span",162),r(29,"6"),t()()()()()()),o&2){let n=d();l(4),m("src",n.announcements[n.currentAnnounceIndex].image_url?n.env+n.announcements[n.currentAnnounceIndex].image_url:"assets/announcement_thumbnail.png",L),l(3),u(n.announcements[n.currentAnnounceIndex].title),l(2),u(n.announcements[n.currentAnnounceIndex].body)}}function Ce(o,s){if(o&1){let n=w();e(0,"span",165),b("click",function(){let c=M(n).index,a=d(2);return O(a.setAnnounce(c))}),t()}if(o&2){let n=s.index,i=d(2);Y("active",n===i.currentAnnounceIndex)}}function Pe(o,s){if(o&1&&(e(0,"div",163),P(1,Ce,1,2,"span",164),t()),o&2){let n=d();l(),m("ngForOf",n.announcements)}}function Me(o,s){if(o&1){let n=w();e(0,"div",166)(1,"a",167),b("click",function(){M(n);let c=d();return O(c.viewAllAnnouncements())}),r(2,"View All"),t()()}}function Oe(o,s){o&1&&(e(0,"div",173)(1,"div",174),F(),e(2,"svg",175),_(3,"path",176)(4,"path",177)(5,"path",178)(6,"path",179)(7,"path",180)(8,"path",181)(9,"circle",182)(10,"circle",183)(11,"rect",184)(12,"path",185)(13,"path",186)(14,"rect",187)(15,"path",188)(16,"rect",189)(17,"path",190)(18,"path",191)(19,"path",192),t()(),z(),e(20,"p",193),r(21,"No birthdays today."),t()())}function ue(o,s){if(o&1&&_(0,"img",209),o&2){let n=d().$implicit;m("src",n.fullImageUrl,L)("alt",n.FirstName)}}function be(o,s){if(o&1&&(e(0,"div",210),r(1),t()),o&2){let n=d().$implicit;V("background-color",n.avatarColor),l(),I(" ",n.initials," ")}}function xe(o,s){if(o&1){let n=w();e(0,"div",211)(1,"div",212),b("click",function(){M(n);let c=d().$implicit,a=d(3);return O(a.viewWishes(c))}),_(2,"ion-icon",213),e(3,"span"),r(4,"View Wishes"),t()()()}}function he(o,s){if(o&1){let n=w();e(0,"div",214)(1,"button",215),b("click",function(){M(n);let c=d().$implicit,a=d(3);return O(a.showWishInput(c.id))}),r(2," Send Wishes "),t()()}}function ve(o,s){if(o&1){let n=w();e(0,"div",216)(1,"ion-input",217),J("ngModelChange",function(c){M(n);let a=d().$implicit,g=d(3);return Z(g.wishMessages[a.id],c)||(g.wishMessages[a.id]=c),O(c)}),t(),e(2,"div",218)(3,"button",219),b("click",function(){M(n);let c=d(4);return O(c.hideWishInput())}),r(4,"Cancel"),t(),e(5,"button",220),b("click",function(){M(n);let c=d().$implicit,a=d(3);return O(a.sendWish(c.id))}),r(6,"Send"),t()()()}if(o&2){let n=d().$implicit,i=d(3);l(),G("ngModel",i.wishMessages[n.id])}}function we(o,s){if(o&1){let n=w();e(0,"div",196)(1,"div",197),_(2,"div",198),e(3,"div",199),P(4,ue,1,2,"img",200)(5,be,2,3,"div",201),t(),e(6,"div",202),b("click",function(c){return M(n),O(c.stopPropagation())}),e(7,"span",203),r(8),t(),e(9,"div",204)(10,"span",205),r(11,"\u{1F382} Birthday \u2022 Today"),t()()(),P(12,xe,5,0,"div",206)(13,he,3,0,"div",207),t(),P(14,ve,7,1,"div",208),t()}if(o&2){let n=s.$implicit,i=d(3);l(4),m("ngIf",n.fullImageUrl),l(),m("ngIf",!n.fullImageUrl),l(3),j("",n.FirstName," ",n.LastName),l(4),m("ngIf",i.activeWishEmployeeId!==n.id),l(),m("ngIf",i.activeWishEmployeeId!==n.id),l(),m("ngIf",i.activeWishEmployeeId===n.id)}}function ke(o,s){if(o&1&&(e(0,"div",194),P(1,we,15,7,"div",195),t()),o&2){let n=d(2);l(),m("ngForOf",n.todayBirthdays)("ngForTrackBy",n.trackById)}}function ye(o,s){if(o&1&&_(0,"img",231),o&2){let n=d().$implicit;m("src",n.fullImageUrl,L)("alt",n.FirstName)}}function Se(o,s){if(o&1&&(e(0,"div",232),r(1),t()),o&2){let n=d().$implicit;V("background-color",n.avatarColor),l(),I(" ",n.initials," ")}}function Ee(o,s){if(o&1&&(e(0,"div",224)(1,"div",225),P(2,ye,1,2,"img",226)(3,Se,2,3,"div",227),t(),e(4,"div",228)(5,"span",229),r(6),t(),e(7,"div")(8,"span",230),r(9),t()()()()),o&2){let n=s.$implicit,i=d(3);l(2),m("ngIf",n.fullImageUrl),l(),m("ngIf",!n.fullImageUrl),l(3),u(n.FirstName),l(3),u(i.getEventDateLabel(n.eventDate))}}function Ie(o,s){if(o&1&&(e(0,"div",221)(1,"h3",169),r(2,"Upcoming Birthdays"),t(),e(3,"div",222),P(4,Ee,10,4,"div",223),t()()),o&2){let n=d(2);l(4),m("ngForOf",n.upcomingBirthdays)("ngForTrackBy",n.trackById)}}function Fe(o,s){if(o&1&&(N(0),e(1,"div",168)(2,"h3",169),r(3,"Birthdays today"),t(),P(4,Oe,22,0,"div",170)(5,ke,2,2,"div",171),t(),P(6,Ie,5,2,"div",172),U()),o&2){let n=d();l(4),m("ngIf",n.todayBirthdays.length===0),l(),m("ngIf",n.todayBirthdays.length>0),l(),m("ngIf",n.upcomingBirthdays.length>0)}}function ze(o,s){o&1&&(e(0,"div",173)(1,"div",174),F(),e(2,"svg",175),_(3,"path",176)(4,"path",177)(5,"path",178)(6,"path",179)(7,"path",180)(8,"path",181)(9,"circle",182)(10,"circle",183)(11,"rect",184)(12,"path",185)(13,"path",186)(14,"rect",187)(15,"path",188)(16,"rect",189)(17,"path",190)(18,"path",191)(19,"path",192),t()(),z(),e(20,"p",193),r(21,"No work anniversaries today."),t()())}function Te(o,s){if(o&1&&_(0,"img",209),o&2){let n=d().$implicit;m("src",n.fullImageUrl,L)("alt",n.FirstName)}}function Ae(o,s){if(o&1&&(e(0,"div",210),r(1),t()),o&2){let n=d().$implicit;V("background-color",n.avatarColor),l(),I(" ",n.initials," ")}}function Be(o,s){if(o&1){let n=w();e(0,"div",211)(1,"div",212),b("click",function(){M(n);let c=d().$implicit,a=d(3);return O(a.viewWishes(c))}),_(2,"ion-icon",213),e(3,"span"),r(4,"View Wishes"),t()()()}}function De(o,s){if(o&1){let n=w();e(0,"div",214)(1,"button",215),b("click",function(){M(n);let c=d().$implicit,a=d(3);return O(a.showWishInput(c.id))}),r(2," Celebrate "),t()()}}function Le(o,s){if(o&1){let n=w();e(0,"div",216)(1,"ion-input",217),J("ngModelChange",function(c){M(n);let a=d().$implicit,g=d(3);return Z(g.wishMessages[a.id],c)||(g.wishMessages[a.id]=c),O(c)}),t(),e(2,"div",218)(3,"button",219),b("click",function(){M(n);let c=d(4);return O(c.hideWishInput())}),r(4,"Cancel"),t(),e(5,"button",220),b("click",function(){M(n);let c=d().$implicit,a=d(3);return O(a.sendWish(c.id))}),r(6,"Send"),t()()()}if(o&2){let n=d().$implicit,i=d(3);l(),G("ngModel",i.wishMessages[n.id])}}function He(o,s){if(o&1){let n=w();e(0,"div",234)(1,"div",197),_(2,"div",235),e(3,"div",199),P(4,Te,1,2,"img",200)(5,Ae,2,3,"div",201),t(),e(6,"div",202),b("click",function(c){return M(n),O(c.stopPropagation())}),e(7,"span",203),r(8),t(),e(9,"div",204)(10,"span",205),r(11),t()()(),P(12,Be,5,0,"div",206)(13,De,3,0,"div",207),t(),P(14,Le,7,1,"div",208),t()}if(o&2){let n=s.$implicit,i=d(3);l(4),m("ngIf",n.fullImageUrl),l(),m("ngIf",!n.fullImageUrl),l(3),j("",n.FirstName," ",n.LastName),l(3),j("\u{1F389} ",n.years," ",n.years>1?"years":"year"," anniversary \u2022 Today"),l(),m("ngIf",i.activeWishEmployeeId!==n.id),l(),m("ngIf",i.activeWishEmployeeId!==n.id),l(),m("ngIf",i.activeWishEmployeeId===n.id)}}function Ve(o,s){if(o&1&&(e(0,"div",194),P(1,He,15,9,"div",233),t()),o&2){let n=d(2);l(),m("ngForOf",n.todayAnniversaries)("ngForTrackBy",n.trackById)}}function je(o,s){if(o&1&&_(0,"img",231),o&2){let n=d().$implicit;m("src",n.fullImageUrl,L)("alt",n.FirstName)}}function $e(o,s){if(o&1&&(e(0,"div",232),r(1),t()),o&2){let n=d().$implicit;V("background-color",n.avatarColor),l(),I(" ",n.initials," ")}}function qe(o,s){if(o&1&&(e(0,"div",224)(1,"div",225),P(2,je,1,2,"img",226)(3,$e,2,3,"div",227),t(),e(4,"div",228)(5,"span",229),r(6),t(),e(7,"div")(8,"span",230),r(9),t()()()()),o&2){let n=s.$implicit,i=d(3);l(2),m("ngIf",n.fullImageUrl),l(),m("ngIf",!n.fullImageUrl),l(3),u(n.FirstName),l(3),gn("",i.getEventDateLabel(n.eventDate)," (",n.years," ",n.years>1?"yrs":"yr",")")}}function We(o,s){if(o&1&&(e(0,"div",221)(1,"h3",169),r(2,"Upcoming Work Anniversaries"),t(),e(3,"div",222),P(4,qe,10,6,"div",223),t()()),o&2){let n=d(2);l(4),m("ngForOf",n.upcomingAnniversaries)("ngForTrackBy",n.trackById)}}function Ne(o,s){if(o&1&&(N(0),e(1,"div",168)(2,"h3",169),r(3,"Work Anniversaries today"),t(),P(4,ze,22,0,"div",170)(5,Ve,2,2,"div",171),t(),P(6,We,5,2,"div",172),U()),o&2){let n=d();l(4),m("ngIf",n.todayAnniversaries.length===0),l(),m("ngIf",n.todayAnniversaries.length>0),l(),m("ngIf",n.upcomingAnniversaries.length>0)}}function Ue(o,s){if(o&1&&(e(0,"div",248)(1,"div",249)(2,"div",250),r(3),t(),e(4,"div",251)(5,"div",252)(6,"span",253),r(7),t(),e(8,"span",254),r(9),Q(10,"date"),t()(),e(11,"p",255),r(12),t()()()()),o&2){let n=s.$implicit;l(3),I(" ",(n.sender_name||"U").charAt(0)," "),l(4),u(n.sender_name),l(2),u(K(10,4,n.created_at,"MMM dd")),l(3),u(n.message)}}function Ye(o,s){if(o&1&&(e(0,"div",246),P(1,Ue,13,7,"div",247),t()),o&2){let n=d(2);l(),m("ngForOf",n.wishesToView)}}function Re(o,s){o&1&&(e(0,"div",256)(1,"div",257),_(2,"ion-icon",258),t(),e(3,"h2"),r(4,"No celebrations yet!"),t(),e(5,"p"),r(6,"Be the first to brighten their day with a warm message."),t()())}function Ge(o,s){if(o&1){let n=w();e(0,"div",236)(1,"ion-header",237)(2,"ion-toolbar",238)(3,"div",239),_(4,"ion-icon",240),e(5,"ion-title"),r(6),t()(),e(7,"ion-buttons",241)(8,"ion-button",242),b("click",function(){M(n);let c=d();return O(c.closeWishesModal())}),_(9,"ion-icon",243),t()()()(),e(10,"ion-content",244),P(11,Ye,2,1,"div",245)(12,Re,7,0,"ng-template",null,1,tn),t()()}if(o&2){let n=en(13),i=d();l(6),I("Celebration Wall for ",i.viewingMilestoneName),l(5),m("ngIf",i.wishesToView.length>0)("ngIfElse",n)}}var Zn=(()=>{let s=class s{get combinedLopDays(){return this.attendanceLopDays+this.namedLopDays}constructor(i,c,a,g,f,p,C,E,y){this.employeeService=i,this.alertController=c,this.router=a,this.attendanceService=g,this.attendanceApi=f,this.employeeLeaves=p,this.leaveRequestService=C,this.adminService=E,this.cdr=y,this.destroy$=new cn,this.activeWishEmployeeId=null,this.wishMessages={},this.birthdayWishes={},this.isViewingWishes=!1,this.wishesToView=[],this.viewingMilestoneName="",this.currentAnnounceIndex=0,this.greeting="",this.todayDate="",this.currentTime="",this.currentYear=new Date().getFullYear(),this.monthlyAttendanceReport=[],this.attendanceRate=0,this.currentEmployee=null,this.env="",this.leaveCards=[],this.userDesignation=null,this.leaveCodeIdMap={},this.todayAttendance=null,this.weeklyGrossHours="0h 0m",this.todayEffectivePercentage=0,this.weeklyAttendanceRate=0,this.avgStartTime="--:--",this.attendanceLopDays=0,this.namedLopDays=0,this.todayBirthdays=[],this.upcomingBirthdays=[],this.todayAnniversaries=[],this.upcomingAnniversaries=[],this.activeCelebrationTab="birthdays",this.announcements=[],this.days=[],this.hasPunchedToday=!1}ngOnInit(){this.setupEnvironment(),this.setupGreetingAndDate(),this.setupClock(),this.loadLeaveBalance(),this.loadCurrentMonthLOP(),this.loadCurrentMonthLeaves(),this.loadAnnouncements(),this.refreshAttendanceState();let i=new Date().getFullYear(),c=new Date().getMonth()+1;this.attendanceService.loadMonthlyReportOnAppStart(this.attendanceApi,i,c),this.attendanceService.monthlyReport$.pipe(S(this.destroy$)).subscribe(g=>{this.monthlyAttendanceReport=g;let f=new Date().toISOString().split("T")[0];if(this.todayAttendance=g.find(x=>{let k=x.attendance_date||x.date;return k&&k.startsWith(f)})||null,g.length){let x=g.filter(k=>k.status==="present").length;this.attendanceRate=Math.round(x/g.length*100)}let p=new Date,C=p.getDay(),E=new Date(p);E.setDate(p.getDate()-C);let y=g.filter(x=>{let k=new Date(x.attendance_date||x.date);return k>=E&&k<=p}),v=0;y.forEach(x=>{v+=(parseFloat(x.gross_hours||"0")||0)*60});let B=Math.floor(v/60),$=Math.round(v%60);if(this.weeklyGrossHours=`${B}h ${$}m`,y.length){let x=y.filter(k=>k.status==="present"||k.status==="on-time").length;this.weeklyAttendanceRate=Math.round(x/y.length*100)}if(this.todayAttendance){let x=parseFloat(this.todayAttendance.effective_hours)||0;this.todayEffectivePercentage=Math.round(x/8*100)}let on=g.filter(x=>x.first_check_in);if(on.length>0){let x=0,k=0;if(on.forEach(R=>{let h=R.first_check_in.toString().trim(),A=-1,H=-1;if(h.includes("-")&&(h.includes("T")||h.includes(" "))){let D=new Date(h);isNaN(D.getTime())||(A=D.getHours(),H=D.getMinutes())}else if(h.includes(":")){let D=h.split(":");A=parseInt(D[0],10),H=parseInt(D[1],10)}A>=0&&H>=0&&!isNaN(A)&&!isNaN(H)&&(x+=A*60+H,k++)}),k>0){let R=Math.round(x/k),h=Math.floor(R/60),A=R%60,H=h>=12?"PM":"AM";h=h%12,h=h||12;let D=h<10?"0"+h:h.toString(),Jn=A<10?"0"+A:A.toString();this.avgStartTime=`${D}:${Jn} ${H}`}else this.avgStartTime="--:--"}else this.avgStartTime="--:--";this.cdr.detectChanges()}),this.attendanceApi.punchRefresh$.pipe(S(this.destroy$)).subscribe(()=>{let g=new Date().getFullYear(),f=new Date().getMonth()+1;this.attendanceService.loadMonthlyReportOnAppStart(this.attendanceApi,g,f),this.refreshAttendanceState()}),this.attendanceApi.clockState$.pipe(S(this.destroy$)).subscribe(()=>{this.cdr.detectChanges()}),this.loadBirthdays(),localStorage.getItem("showLoginSuccess")==="true"&&(localStorage.removeItem("showLoginSuccess"),this.showLoginSuccessAlert()),this.employeeService.currentEmployee$.pipe(S(this.destroy$)).subscribe(g=>{g&&(this.currentEmployee=g,this.userDesignation=g.designation_name||g.designation||null,this.cdr.detectChanges())})}ionViewWillEnter(){this.loadEmployeeProfile(),this.loadBirthdays(),this.loadLeaveBalance(),this.loadCurrentMonthLOP(),this.loadCurrentMonthLeaves()}loadBirthdays(){let i=new Date;i.setHours(0,0,0,0);let c=["#ff9800","#2196f3","#4caf50","#f44336","#9c27b0","#e91e63"];this.employeeService.getBirthdays("upcoming").pipe(S(this.destroy$)).subscribe({next:a=>{let g=[],f=[];a.forEach(p=>{let C=p.DateOfBirth?new Date(p.DateOfBirth):null,E=((p.FirstName||"").charAt(0)+(p.LastName||"").charAt(0)).toUpperCase(),y=c[p.id%c.length];if(C){let v=new Date(C);v.setFullYear(i.getFullYear()),v<i&&v.setFullYear(i.getFullYear()+1);let B=W(q({},p),{uid:`${p.id}_Birthday`,eventType:"Birthday",eventDate:v,originalDate:C,isToday:v.toDateString()===i.toDateString(),initials:E,avatarColor:y,fullImageUrl:p.profile_image?`${this.env}${p.profile_image}`:null});B.isToday?g.push(B):f.push(B)}}),this.todayBirthdays=g,this.upcomingBirthdays=f.sort((p,C)=>p.eventDate.getTime()-C.eventDate.getTime()),this.cdr.detectChanges()},error:()=>{this.todayBirthdays=[],this.upcomingBirthdays=[],this.cdr.detectChanges()}}),this.employeeService.getAnniversaries("upcoming").pipe(S(this.destroy$)).subscribe({next:a=>{let g=[],f=[];a.forEach(p=>{let C=p.DateJoined?new Date(p.DateJoined):null,E=((p.FirstName||"").charAt(0)+(p.LastName||"").charAt(0)).toUpperCase(),y=c[p.id%c.length];if(C){let v=new Date(C);v.setFullYear(i.getFullYear()),v<i&&v.setFullYear(i.getFullYear()+1);let B=i.getFullYear()-C.getFullYear();if(B>0){let $=W(q({},p),{uid:`${p.id}_Anniversary`,eventType:"Anniversary",eventDate:v,originalDate:C,years:B,isToday:v.toDateString()===i.toDateString(),initials:E,avatarColor:y,fullImageUrl:p.profile_image?`${this.env}${p.profile_image}`:null});$.isToday?g.push($):f.push($)}}}),this.todayAnniversaries=g,this.upcomingAnniversaries=f.sort((p,C)=>p.eventDate.getTime()-C.eventDate.getTime()),this.cdr.detectChanges()},error:()=>{this.todayAnniversaries=[],this.upcomingAnniversaries=[],this.cdr.detectChanges()}})}getEventDateLabel(i){let c=new Date;c.setHours(0,0,0,0);let a=new Date(c);if(a.setDate(c.getDate()+1),i.toDateString()===c.toDateString())return"Today";if(i.toDateString()===a.toDateString())return"Tomorrow";{let g=i.getDate(),p=["January","February","March","April","May","June","July","August","September","October","November","December"][i.getMonth()];return`${g} ${p}`}}showWishInput(i){this.activeWishEmployeeId=i,this.wishMessages[i]||(this.wishMessages[i]="")}hideWishInput(){this.activeWishEmployeeId=null}sendWish(i){let c=this.wishMessages[i]?.trim();c&&this.employeeService.sendBirthdayWish(i,c).pipe(S(this.destroy$)).subscribe({next:()=>{this.birthdayWishes[i]||(this.birthdayWishes[i]=[]),this.birthdayWishes[i].push({message:c,sender_name:"Me"}),this.wishMessages[i]="",this.hideWishInput()},error:()=>alert("Failed to send wish")})}viewWishes(i){this.viewingMilestoneName=`${i.FirstName} ${i.LastName}`,this.employeeService.getBirthdayWishes(i.id).pipe(S(this.destroy$)).subscribe({next:c=>{this.wishesToView=c,this.isViewingWishes=!0,this.cdr.detectChanges()}})}closeWishesModal(){this.isViewingWishes=!1,this.wishesToView=[],this.viewingMilestoneName=""}setupEnvironment(){this.env=X.apiURL.startsWith("http")?X.apiURL:`http://${X.apiURL}`}loadEmployeeProfile(){this.currentEmployee=null,this.employeeService.getMyProfile().pipe(S(this.destroy$)).subscribe({next:i=>{this.currentEmployee=i,this.userDesignation=i.designation_name||i.designation||null,this.cdr.detectChanges()},error:()=>{this.currentEmployee=null}})}get profileImageUrl(){return this.currentEmployee?.profile_image?`${this.env}${this.currentEmployee.profile_image}`:"../../assets/user.png"}setupGreetingAndDate(){let i=new Date().getHours();i<12?this.greeting="Good Morning":i<17?this.greeting="Good Afternoon":this.greeting="Good Evening";let c=new Date;this.todayDate=c.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"2-digit"})}setupClock(){this.clockInterval&&clearInterval(this.clockInterval),this.clockInterval=setInterval(()=>{this.currentTime=new Date().toLocaleTimeString("en-US",{hour12:!0})},1e3)}showLoginSuccessAlert(){return an(this,null,function*(){yield(yield this.alertController.create({header:"Information",message:"Login Successful",backdropDismiss:!1,buttons:[{text:"OK"}]})).present()})}attendance(){this.router.navigate(["/Me"])}leaves(){this.router.navigate(["/leaves"])}myteam(){this.router.navigate(["/MyTeam"])}viewAllAnnouncements(){this.router.navigate(["/administration/org-setup"])}loadLeaveBalance(){this.employeeLeaves.getLeaveBalance(this.currentYear).pipe(S(this.destroy$)).subscribe({next:i=>{let c=i.balances||[];this.leaveCodeIdMap={},c.forEach(a=>{this.leaveCodeIdMap[a.type_code]=a.leave_type_id||a.id}),this.leaveCards=c.map(a=>{let g=Number(a.allocated_days)||0,f=Number(a.used_days)||0,p=(a.type_code||"").toUpperCase(),C=p==="LOP";return{title:a.type_name,code:p,allocated_days:C?0:g,used:C?this.combinedLopDays:f,available:C?0:Number(a.available_days)-(Number(a.pending_days)||0),usedPercent:C?0:g>0?Math.round(f/g*100):0,icon:this.getLeaveIcon(a.type_code),isLOP:C,bg_color:a.bg_color,icon_path:a.icon_path}})},error:i=>console.error(i)})}loadCurrentMonthLOP(){let i=new Date,c=i.getFullYear(),a=i.getMonth()+1,g=`${c}-${String(a).padStart(2,"0")}-01`,f=new Date(c,a,0).getDate(),p=`${c}-${String(a).padStart(2,"0")}-${String(f).padStart(2,"0")}`;this.attendanceApi.getMonthlyReport({startDate:g,endDate:p,month:a,year:c}).subscribe({next:C=>{this.attendanceLopDays=Number(C?.summary?.lop_days??C?.lop_days??0),this.recalculateLopCard()},error:C=>console.error("Error fetching LOP data:",C)})}loadCurrentMonthLeaves(){let i=new Date,c=i.getMonth(),a=i.getFullYear();this.leaveRequestService.getMyLeaves(this.currentYear).subscribe({next:g=>{this.namedLopDays=g.filter(f=>{if(f.status.toUpperCase()!=="APPROVED"||!(f.type_name?.toLowerCase().includes("loss of pay")||(f.type_code||"").toUpperCase()==="LOP"))return!1;let C=new Date(f.start_date||f.from_date);return C.getMonth()===c&&C.getFullYear()===a}).reduce((f,p)=>f+Number(p.total_days||p.days||0),0),this.recalculateLopCard()},error:g=>console.error("Error fetching leaves for LOP:",g)})}recalculateLopCard(){this.leaveCards=this.leaveCards.map(i=>i.isLOP?W(q({},i),{used:this.combinedLopDays,available:0,usedPercent:0}):i),this.cdr.detectChanges()}getLeaveIcon(i){return`assets/leave-icons/${{CL:"CL.svg",SL:"SL.svg",ML:"ML.svg",CO:"CO.svg",PL:"CL.svg",UL:"UL.svg"}[i]||"CL.svg"}`}isCEO(){return this.currentEmployee?.designation_name?.toLowerCase()==="ceo"}trackById(i,c){return c.uid||c.id||c.employee_id||i}loadAnnouncements(){this.adminService.getAnnouncements().pipe(S(this.destroy$)).subscribe({next:i=>{this.announcements=i,this.startAnnounceCarousel(),this.cdr.detectChanges()},error:()=>{}})}startAnnounceCarousel(){this.announceTimer&&clearInterval(this.announceTimer),this.announcements.length>1&&(this.announceTimer=setInterval(()=>{this.nextAnnounce()},5e3))}nextAnnounce(){this.currentAnnounceIndex=(this.currentAnnounceIndex+1)%this.announcements.length,this.cdr.detectChanges()}prevAnnounce(){this.currentAnnounceIndex=(this.currentAnnounceIndex-1+this.announcements.length)%this.announcements.length,this.cdr.detectChanges()}refreshAttendanceState(){this.attendanceApi.getTodayAttendance(!0).pipe(S(this.destroy$)).subscribe(i=>{let c=i?.punches||[];if(this.hasPunchedToday=c.length>0,this.hasPunchedToday){this.todayAttendance=W(q({},this.todayAttendance),{first_check_in:i.first_check_in||(c.length>0?c[0].punch_time:null),last_check_out:i.last_check_out||(c.length>0&&c[c.length-1].punch_type==="out"?c[c.length-1].punch_time:null),gross_hours:this.formatMinutesToHours(i.gross_hours),work_mode:i.work_mode||(c.length>0?c[0].work_mode:null),effective_hours:this.formatMinutesToHours(i.effective_hours)});let a=parseFloat(i.effective_hours)||0;this.todayEffectivePercentage=Math.round(a/(8*60)*100)}this.cdr.detectChanges()})}formatMinutesToHours(i){if(!i)return"0h 0 m";let c=typeof i=="number"?i:parseInt(i.toString().replace(/[^0-9]/g,""))||0,a=Math.floor(c/60),g=c%60;return`${a}h ${g} m`}setAnnounce(i){this.currentAnnounceIndex=i,this.startAnnounceCarousel(),this.cdr.detectChanges()}parseHours(i){if(i==null)return 0;if(typeof i=="number")return i;let c=i.toString().trim();if(!c)return 0;if(c.includes("h")){let g=c.split("h")[0].trim(),f=c.split("h")[1]?.replace(/[^0-9]/g,"").trim()||"0",p=parseFloat(g)||0,C=parseFloat(f)||0;return p+C/60}let a=parseFloat(c);return isNaN(a)?0:a}getAttendanceSegments(i){if(!i)return[];let c=i.total_work_hours!==void 0?i.total_work_hours:i.effective_hours,a=this.parseHours(c),g=this.parseHours(i.gross_hours);if(!i.first_check_in||a<=0)return[];let f=Math.max(g<=0?a:g,8),p=Math.min(a/f*100,100),C=g<=0?p:Math.min(g/f*100,100),E=Math.max(C-p,0);if(E<.5)return[{type:"work",widthPct:p}];let y=p/2;return[{type:"work",widthPct:y},{type:"break",widthPct:E},{type:"work",widthPct:y}]}getBreakHours(i){if(!i)return"";let c=this.parseHours(i.gross_hours),a=i.total_work_hours!==void 0?i.total_work_hours:i.effective_hours,g=this.parseHours(a);if(c<=0||g<=0||c<=g)return"";let f=c-g,p=Math.floor(f),C=Math.round((f-p)*60);return p>0?`${p}h ${C}m`:`${C}m`}getStatusLabel(){return this.attendanceApi.getClockState()?"In":this.hasPunchedToday?"Out":"Not In Yet"}getStatusClass(){let i=this.getStatusLabel();return i==="In"?"status-in":i==="Out"?"status-out":"status-pending"}formatClockTime(i){if(!i)return"--:--";let c=i.toString().trim();if(c.includes("-")&&(c.includes("T")||c.includes(" "))){let a=new Date(c);if(!isNaN(a.getTime()))return a.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}if(c.includes(":")){if(c.toLowerCase().includes("am")||c.toLowerCase().includes("pm"))return c;let a=c.split(":"),g=parseInt(a[0],10),f=parseInt(a[1],10);if(!isNaN(g)&&!isNaN(f)){let p=g>=12?"PM":"AM";g=g%12,g=g||12;let C=f<10?"0"+f:f.toString();return`${g<10?"0"+g:g.toString()}:${C} ${p}`}}return c}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.clockInterval&&clearInterval(this.clockInterval),this.announceTimer&&clearInterval(this.announceTimer)}};s.\u0275fac=function(c){return new(c||s)(T(Wn),T($n),T(Mn),T(Un),T(Yn),T(Rn),T(Gn),T(Nn),T(dn))},s.\u0275cmp=ln({type:s,selectors:[["app-home"]],standalone:!1,decls:251,vars:38,consts:[["emptyBar",""],["noWishes",""],[3,"fullscreen"],[1,"ion-margin","main-block"],["size","12",1,"welcome-block"],[1,"welcome-card-premium"],[1,"glass-overlay"],[1,"glow-flare","flare-1"],[1,"glow-flare","flare-2"],[1,"welcome-main-layout"],[1,"welcome-left-panel"],[1,"user-profile-group"],[1,"premium-avatar-wrapper"],[1,"avatar-glow"],["class","premium-avatar-img","alt","Profile","onerror","this.style.display='none'",3,"src",4,"ngIf"],["class","premium-avatar-placeholder",4,"ngIf"],[1,"premium-user-details"],[1,"premium-greeting"],[1,"premium-name-row"],[1,"premium-name"],["class","premium-status-badge",4,"ngIf"],[1,"premium-meta-info"],["class","site-name",4,"ngIf"],[1,"premium-action-row"],["class","glass-action-btn",3,"click",4,"ngIf"],[1,"glass-action-btn",3,"click"],["src","../../../../assets/team.png","width","16","height","16"],[1,"welcome-right-panel"],[1,"time-container"],[1,"time-label"],[1,"premium-clock-display"],["class","premium-clock-action",4,"ngIf"],[1,"dashboard-row"],["size-sm","12","size-md","12","size-lg","6","size-xl","6",1,"dashboard-col"],[1,"overview-block","modern-overview-card"],[1,"card-header-row"],[1,"header-text"],[1,"overview-title"],[1,"overview-subtitle"],[1,"header-badge"],[1,"badge-pill"],[1,"divider-line"],[1,"card-body-grid"],[1,"stats-left-col"],[1,"stat-item-row"],[1,"stat-label"],[1,"stat-value","bold-text"],[1,"status-badge-pill",3,"ngClass"],[1,"stat-item-row","effective-row"],[1,"effective-labels"],[1,"stat-value"],[1,"attendance-visual-wrap"],[1,"attendance-bar"],[4,"ngIf","ngIfElse"],["class","bar-legend",4,"ngIf"],[1,"mode-pill-row"],[1,"mode-pill",2,"text-transform","capitalize"],[1,"stats-right-col"],[1,"info-mini-card"],[1,"mini-card-content"],[1,"mini-card-label"],[1,"mini-card-value"],[1,"mini-card-icon","green-icon"],["viewBox","0 0 24 24","width","24","height","24","stroke","currentColor","stroke-width","2","fill","none","stroke-linecap","round","stroke-linejoin","round"],["cx","12","cy","12","r","10"],["points","12 6 12 12 16 14"],[1,"mini-card-icon","blue-icon"],["cx","12","cy","12","r","10","stroke-dasharray","3 3"],["points","12 6 12 12 15 9"],[1,"overview-block","modern-overview-card","quick-links-card"],[1,"quick-links-grid"],[1,"quick-link-tile",3,"click"],[1,"ql-icon-wrap"],["viewBox","0 0 24 24","width","24","height","24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["cx","17","cy","21","r","1"],["cx","9","cy","21","r","1"],["d","M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"],[1,"ql-text"],[1,"ql-title"],[1,"ql-desc"],[1,"quick-link-tile"],["d","M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],["points","14 2 14 8 20 8"],["x1","16","y1","13","x2","8","y2","13"],["x1","16","y1","17","x2","8","y2","17"],["points","10 9 9 9 8 9"],["d","M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],["d","M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l-.19.94a2 2 0 0 1 0 .92z"],["x","2","y","3","width","20","height","14","rx","2","ry","2"],["x1","8","y1","21","x2","16","y2","21"],["x1","12","y1","17","x2","12","y2","21"],[1,"overview-block","modern-overview-card","leave-balance-card-flat"],[1,"card-content","leave-balance-body"],[1,"leave-columns-row"],["class","leave-column",4,"ngFor","ngForOf","ngForTrackBy"],[1,"leave-footer-note"],[1,"overview-block","modern-overview-card","announcements-card-flat"],["class","header-badge",4,"ngIf"],[1,"card-content","announcements-list-body"],["class","no-announcements",4,"ngIf"],["class","announcements-carousel-wrapper",4,"ngIf"],["class","carousel-indicators",4,"ngIf"],["class","view-all-link-container",4,"ngIf"],[1,"overview-block","modern-overview-card","holidays-card"],[1,"holiday-banner"],[1,"holiday-banner-content"],[1,"holiday-date-block"],[1,"holiday-day"],[1,"holiday-month-year"],[1,"holiday-name"],[1,"holiday-banner-overlay"],[1,"overview-block","modern-overview-card","milestone-card"],[1,"badge-pill","milestone-badge"],[1,"card-content","milestone-card-body"],["mode","ios",1,"celebration-segment",3,"ngModelChange","ngModel"],["value","birthdays"],["value","anniversaries"],[4,"ngIf"],[1,"wishes-modal","premium-colorful-modal",3,"didDismiss","isOpen"],["alt","Profile","onerror","this.style.display='none'",1,"premium-avatar-img",3,"src"],[1,"premium-avatar-placeholder"],["name","person"],[1,"premium-status-badge"],[1,"site-name"],["src","../../../../assets/attendance.png","width","16","height","16"],["src","../../../../assets/leave.png","width","16","height","16"],[1,"premium-clock-action"],["class","bar-segment",3,"seg-work","seg-break","width",4,"ngFor","ngForOf"],[1,"bar-segment"],[1,"bar-segment","seg-empty",2,"width","100%"],[1,"bar-legend"],[1,"legend-dot","dot-work"],[1,"legend-lbl"],[1,"legend-dot","dot-break"],[1,"leave-column"],[1,"leave-icon-circle"],["class","uploaded-icon-small","alt","icon",3,"src",4,"ngIf"],[3,"name",4,"ngIf"],[1,"leave-type-title"],[1,"leave-days-left"],[1,"days-bold"],["alt","icon",1,"uploaded-icon-small",3,"src"],[3,"name"],[1,"badge-pill","light-blue"],[1,"no-announcements"],[1,"announcements-carousel-wrapper"],[1,"announcements-carousel-slides"],[1,"announcement-item-row","active-slide"],[1,"announcement-thumbnail"],["alt","Announcement Thumbnail",3,"src"],[1,"announcement-main-content"],[1,"announcement-title"],[1,"announcement-description"],[1,"announcement-footer-row"],[1,"time-ago"],[1,"separator-dot"],[1,"author-info"],["src","assets/user.png","alt","Author",1,"author-avatar"],[1,"author-name"],[1,"announcement-reactions"],[1,"reaction-item"],[1,"emoji"],[1,"count"],[1,"carousel-indicators"],["class","dot",3,"active","click",4,"ngFor","ngForOf"],[1,"dot",3,"click"],[1,"view-all-link-container"],[1,"view-all-link",3,"click"],[1,"birthdays-today-section"],[1,"milestone-section-title"],["class","empty-today",4,"ngIf"],["class","today-list",4,"ngIf"],["class","upcoming-birthdays-section",4,"ngIf"],[1,"empty-today"],[1,"empty-illustration-container"],["width","120","height","120","viewBox","0 0 120 120","fill","none","xmlns","http://www.w3.org/2000/svg",1,"cake-illustration"],["d","M20,20 C35,28 50,28 60,20 C70,28 85,28 100,20","stroke","#E2E8F0","stroke-width","1.5","stroke-linecap","round","fill","none"],["d","M25,23 L28,29 L22,29 Z","fill","#FEE2E2"],["d","M40,24 L43,30 L37,30 Z","fill","#E0F2FE"],["d","M58,22 L61,28 L55,28 Z","fill","#FEF3C7"],["d","M78,24 L81,30 L75,30 Z","fill","#FCE7F3"],["d","M92,23 L95,29 L89,29 Z","fill","#E0F2FE"],["cx","28","cy","65","r","10","fill","#F8FAFC"],["cx","95","cy","55","r","14","fill","#F8FAFC"],["x","58","y","38","width","4","height","14","rx","1","fill","#E2E8F0"],["d","M60,38 L60,34","stroke","#94A3B8","stroke-width","1.5"],["d","M60,34 C58,34 57.5,31 60,27 C62.5,31 62,34 60,34 Z","fill","#EF4444"],["x","40","y","52","width","40","height","18","rx","2","fill","#FFFFFF","stroke","#94A3B8","stroke-width","1.5"],["d","M40,58 C44,61 46,61 48,58 C50,55 52,62 55,58 C58,54 60,61 63,58 C66,55 68,61 70,58 C72,55 74,60 76,58 C78,56 79,59 80,58","stroke","#3B82F6","stroke-width","1.5","stroke-linecap","round","fill","none"],["x","30","y","70","width","60","height","22","rx","3","fill","#FFFFFF","stroke","#94A3B8","stroke-width","1.5"],["d","M30,78 C35,82 38,82 42,78 C46,74 50,83 55,78 C60,73 64,82 68,78 C72,74 76,82 80,78 C84,74 86,81 90,78","stroke","#3B82F6","stroke-width","1.5","stroke-linecap","round","fill","none"],["d","M20,92 L100,92","stroke","#94A3B8","stroke-width","2","stroke-linecap","round"],["d","M35,92 L42,98 L78,98 L85,92","fill","#E2E8F0","stroke","#94A3B8","stroke-width","1.5","stroke-linejoin","round"],[1,"empty-text"],[1,"today-list"],["class","milestone-item-flat today birthday-theme",4,"ngFor","ngForOf","ngForTrackBy"],[1,"milestone-item-flat","today","birthday-theme"],[1,"item-main"],[1,"blue-tab-prefix"],[1,"avatar-container"],["onerror","this.style.display='none'",3,"src","alt",4,"ngIf"],["class","fallback-initials-avatar",3,"backgroundColor",4,"ngIf"],[1,"milestone-info",3,"click"],[1,"emp-name"],[1,"event-meta"],[1,"event-badge"],["class","celebration-footer",4,"ngIf"],["class","milestone-action",4,"ngIf"],["class","milestone-wish-input-reveal",4,"ngIf"],["onerror","this.style.display='none'",3,"src","alt"],[1,"fallback-initials-avatar"],[1,"celebration-footer"],[1,"notes-link",3,"click"],["name","heart",1,"heart-pulse"],[1,"milestone-action"],[1,"action-btn-pill",3,"click"],[1,"milestone-wish-input-reveal"],["placeholder","Write a warm note...",3,"ngModelChange","ngModel"],[1,"reveal-btns"],[1,"cancel-btn",3,"click"],[1,"send-btn",3,"click"],[1,"upcoming-birthdays-section"],[1,"upcoming-scroll-container"],["class","upcoming-item-card",4,"ngFor","ngForOf","ngForTrackBy"],[1,"upcoming-item-card"],[1,"upcoming-avatar-wrapper"],["class","upcoming-avatar-img","onerror","this.style.display='none'",3,"src","alt",4,"ngIf"],["class","upcoming-initials-avatar",3,"backgroundColor",4,"ngIf"],[1,"upcoming-info"],[1,"upcoming-emp-name"],[1,"upcoming-event-date"],["onerror","this.style.display='none'",1,"upcoming-avatar-img",3,"src","alt"],[1,"upcoming-initials-avatar"],["class","milestone-item-flat today anniversary-theme",4,"ngFor","ngForOf","ngForTrackBy"],[1,"milestone-item-flat","today","anniversary-theme"],[1,"blue-tab-prefix",2,"background","#3b5bdb !important"],[1,"modal-wrapper"],[1,"ion-no-border"],[1,"colorful-header"],[1,"header-content"],["name","sparkles",1,"star-icon"],["slot","end"],[1,"close-circle",3,"click"],["slot","icon-only","name","close-circle"],[1,"modal-content-area"],["class","wishes-grid",4,"ngIf","ngIfElse"],[1,"wishes-grid"],["class","wish-glass-card",4,"ngFor","ngForOf"],[1,"wish-glass-card"],[1,"wish-card-inner"],[1,"sender-avatar-small"],[1,"wish-body"],[1,"wish-header"],[1,"sender-name"],[1,"wish-time"],[1,"wish-message"],[1,"empty-wishes-state"],[1,"empty-icon-box"],["name","heart-outline"]],template:function(c,a){if(c&1){let g=w();e(0,"ion-content",2)(1,"ion-grid",3)(2,"ion-row")(3,"ion-col",4)(4,"ion-card",5),_(5,"div",6)(6,"div",7)(7,"div",8),e(8,"div",9)(9,"div",10)(10,"div",11)(11,"div",12),_(12,"div",13),P(13,Kn,1,1,"img",14)(14,Xn,2,0,"div",15),t(),e(15,"div",16)(16,"p",17),r(17),t(),e(18,"div",18)(19,"h2",19),r(20),t(),P(21,ne,2,1,"span",20),t(),e(22,"p",21),r(23),P(24,ee,2,1,"span",22),t(),e(25,"div",23),P(26,te,4,0,"button",24)(27,oe,4,0,"button",24),e(28,"button",25),b("click",function(){return M(g),O(a.myteam())}),_(29,"img",26),e(30,"span"),r(31,"My Team"),t()()()()()(),e(32,"div",27)(33,"div",28)(34,"p",29),r(35,"Current Time"),t(),e(36,"p",30),r(37),t()(),P(38,ie,2,0,"div",31),t()()()()(),e(39,"ion-row",32)(40,"ion-col",33)(41,"ion-card",34)(42,"div",35)(43,"div",36)(44,"h3",37),r(45,"Today's Overview"),t(),e(46,"p",38),r(47,"Your attendance, progress, and status at a glance"),t()(),e(48,"div",39)(49,"span",40),r(50),t()()(),_(51,"div",41),e(52,"div",42)(53,"div",43)(54,"div",44)(55,"span",45),r(56,"Clock In"),t(),e(57,"span",46),r(58),t()(),e(59,"div",44)(60,"span",45),r(61,"Status"),t(),e(62,"span",47),r(63),t()(),e(64,"div",44)(65,"span",45),r(66,"Gross Hours"),t(),e(67,"span",46),r(68),t()(),e(69,"div",48)(70,"div",49)(71,"span",45),r(72,"Effective Hours"),t(),e(73,"span",50),r(74),t()(),e(75,"div",51)(76,"div",52),P(77,ce,2,1,"ng-container",53)(78,re,1,0,"ng-template",null,0,tn),t(),P(80,le,7,1,"div",54),t()(),e(81,"div",55)(82,"span",56),r(83),t()()(),e(84,"div",57)(85,"div",58)(86,"div",59)(87,"span",60),r(88,"Today"),t(),e(89,"span",61),r(90),t()(),e(91,"div",62),F(),e(92,"svg",63),_(93,"circle",64)(94,"polyline",65),t()()(),z(),e(95,"div",58)(96,"div",59)(97,"span",60),r(98,"Avg. Start Time"),t(),e(99,"span",61),r(100),t()(),e(101,"div",66),F(),e(102,"svg",63),_(103,"circle",67)(104,"polyline",68),t()()()()()()(),z(),e(105,"ion-col",33)(106,"ion-card",69)(107,"div",35)(108,"div",36)(109,"h3",37),r(110,"Quick links"),t(),e(111,"p",38),r(112,"Jump into the tools you use the most"),t()(),e(113,"div",39)(114,"span",40),r(115,"Shortcusts"),t()()(),_(116,"div",41),e(117,"div",70)(118,"div",71),b("click",function(){return M(g),O(a.leaves())}),e(119,"div",72),F(),e(120,"svg",73),_(121,"circle",74)(122,"circle",75)(123,"path",76),t()(),z(),e(124,"div",77)(125,"span",78),r(126,"WFH request"),t(),e(127,"span",79),r(128,"Request remote work"),t()()(),e(129,"div",80)(130,"div",72),F(),e(131,"svg",73),_(132,"path",81)(133,"polyline",82)(134,"line",83)(135,"line",84)(136,"polyline",85),t()(),z(),e(137,"div",77)(138,"span",78),r(139,"Documents"),t(),e(140,"span",79),r(141,"Payslips, letters, policies"),t()()(),e(142,"div",80)(143,"div",72),F(),e(144,"svg",73),_(145,"path",86),t()(),z(),e(146,"div",77)(147,"span",78),r(148,"Policies"),t(),e(149,"span",79),r(150,"HR, IT & security"),t()()(),e(151,"div",80)(152,"div",72),F(),e(153,"svg",73),_(154,"path",87),t()(),z(),e(155,"div",77)(156,"span",78),r(157,"Helpdesk"),t(),e(158,"span",79),r(159,"Raise a ticket"),t()()(),e(160,"div",80)(161,"div",72),F(),e(162,"svg",73),_(163,"rect",88)(164,"line",89)(165,"line",90),t()(),z(),e(166,"div",77)(167,"span",78),r(168,"Assets"),t(),e(169,"span",79),r(170,"Assigned hardware & more"),t()()()()()()(),e(171,"ion-row",32)(172,"ion-col",33)(173,"ion-card",91)(174,"div",35)(175,"div",36)(176,"h3",37),r(177,"Leave balance"),t(),e(178,"p",38),r(179,"Quick view of your available time off"),t()(),e(180,"div",39)(181,"span",40),r(182,"Cycle : Mar - Feb"),t()()(),_(183,"div",41),e(184,"div",92)(185,"div",93),P(186,me,2,1,"div",94),t(),e(187,"p",95),r(188,"Plan ahead: peak leave usage is expected during upcoming festival weeks."),t()()()(),e(189,"ion-col",33)(190,"ion-card",96)(191,"div",35)(192,"div",36)(193,"h3",37),r(194,"Announcements"),t(),e(195,"p",38),r(196,"Your attendance, progress, and status at a glance"),t()(),P(197,pe,3,1,"div",97),t(),_(198,"div",41),e(199,"div",98),P(200,_e,3,0,"div",99)(201,fe,30,3,"div",100)(202,Pe,2,1,"div",101)(203,Me,3,0,"div",102),t()()()(),e(204,"ion-row",32)(205,"ion-col",33)(206,"ion-card",103)(207,"div",35)(208,"div",36)(209,"h3",37),r(210,"Upcoming holidays"),t(),e(211,"p",38),r(212,"Next few company and regional holidays"),t()(),e(213,"div",39)(214,"span",40),r(215,"Location : Vizag"),t()()(),_(216,"div",41),e(217,"div",104)(218,"div",105)(219,"div",106)(220,"span",107),r(221,"25"),t(),e(222,"span",108),r(223,"December 2025"),t(),e(224,"span",109),r(225,"Happy Christmas"),t()()(),_(226,"div",110),t()()(),e(227,"ion-col",33)(228,"ion-card",111)(229,"div",35)(230,"div",36)(231,"h3",37),r(232,"Celebrations"),t(),e(233,"p",38),r(234,"Congratulate team members on their special milestones"),t()(),e(235,"div",39)(236,"span",112),r(237,"\u{1F389} Milestones"),t()()(),_(238,"div",41),e(239,"div",113)(240,"ion-segment",114),J("ngModelChange",function(p){return M(g),Z(a.activeCelebrationTab,p)||(a.activeCelebrationTab=p),O(p)}),e(241,"ion-segment-button",115)(242,"ion-label"),r(243,"\u{1F382} Birthdays"),t()(),e(244,"ion-segment-button",116)(245,"ion-label"),r(246,"\u{1F389} Anniversaries"),t()()(),P(247,Fe,7,3,"ng-container",117)(248,Ne,7,3,"ng-container",117),t()()()(),e(249,"ion-modal",118),b("didDismiss",function(){return M(g),O(a.closeWishesModal())}),P(250,Ge,14,3,"ng-template"),t()()()}if(c&2){let g=en(79);m("fullscreen",!0),l(13),m("ngIf",a.currentEmployee),l(),m("ngIf",!a.currentEmployee||!a.profileImageUrl),l(3),u(a.greeting),l(3),u((a.currentEmployee==null?null:a.currentEmployee.FullName)||"User"),l(),m("ngIf",a.getStatusLabel()),l(2),I(" ",a.todayDate," \xA0\u2022\xA0 "),l(),m("ngIf",a.currentEmployee),l(2),m("ngIf",!a.isCEO()),l(),m("ngIf",!a.isCEO()),l(10),u(a.currentTime),l(),m("ngIf",!a.isCEO()),l(12),I("Attendance Rate \u2022 ",a.attendanceRate,"% this month"),l(8),u(a.formatClockTime(a.todayAttendance==null?null:a.todayAttendance.first_check_in)),l(4),m("ngClass",a.getStatusClass()),l(),u(a.getStatusLabel()),l(5),u((a.todayAttendance==null?null:a.todayAttendance.gross_hours)||"0h 0m"),l(6),j("",(a.todayAttendance==null?null:a.todayAttendance.effective_hours)||"0h 0m"," (",a.todayEffectivePercentage||0,"%)"),l(2),Y("empty-bar",a.getAttendanceSegments(a.todayAttendance).length===0),l(),m("ngIf",a.getAttendanceSegments(a.todayAttendance).length>0)("ngIfElse",g),l(3),m("ngIf",a.getBreakHours(a.todayAttendance)),l(3),I("Mode : ",(a.todayAttendance==null?null:a.todayAttendance.work_mode)||"--"),l(7),u(a.weeklyGrossHours),l(10),u(a.avgStartTime),l(86),m("ngForOf",a.leaveCards)("ngForTrackBy",a.trackById),l(11),m("ngIf",a.announcements.length>0),l(3),m("ngIf",a.announcements.length===0),l(),m("ngIf",a.announcements.length>0),l(),m("ngIf",a.announcements.length>1),l(),m("ngIf",a.announcements.length>0),l(37),G("ngModel",a.activeCelebrationTab),l(7),m("ngIf",a.activeCelebrationTab==="birthdays"),l(),m("ngIf",a.activeCelebrationTab==="anniversaries"),l(),m("isOpen",a.isViewingWishes)}},dependencies:[mn,pn,_n,un,bn,wn,kn,yn,Sn,En,In,Fn,zn,Tn,An,Bn,Dn,Ln,Hn,Vn,jn,hn,vn,nn,Cn,fn],styles:[`@charset "UTF-8";



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
.row-space-between[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.row-center[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
}
.align-center[_ngcontent-%COMP%] {
  align-items: center;
}
.mb-30[_ngcontent-%COMP%] {
  margin-bottom: 30px;
}
.p-8[_ngcontent-%COMP%] {
  padding: 8px;
}
.pb-12[_ngcontent-%COMP%] {
  padding-bottom: 12px;
}
.mt-8[_ngcontent-%COMP%] {
  margin-top: 8px;
}
.mr-8[_ngcontent-%COMP%] {
  margin-right: 8px;
}
.w-auto[_ngcontent-%COMP%] {
  width: auto;
}
.border-bottom[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
  padding: 20px 20px;
}
.main-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #0f172a;
}
.main-block[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {
  margin: 0;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%] {
  background-image: url("./media/introduction-D2CN5ZFD.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #1b2d56;
  border-radius: 10px;
  border: none;
  position: relative;
  overflow: hidden;
  min-height: 150px;
  display: flex;
  align-items: stretch;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]::before {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 260px;
  background-image:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px);
  background-size: 18px 18px;
  pointer-events: none;
  z-index: 1;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .glass-overlay[_ngcontent-%COMP%] {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .glow-flare[_ngcontent-%COMP%] {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-main-layout[_ngcontent-%COMP%] {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  padding: 26px 32px;
  gap: 16px;
  align-items: center;
}
@media (max-width: 1024px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-main-layout[_ngcontent-%COMP%] {
    flex-direction: column;
    padding: 22px 20px;
    align-items: flex-start;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-left-panel[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 80%;
}
@media (max-width: 1024px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-left-panel[_ngcontent-%COMP%] {
    width: 100%;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .user-profile-group[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
@media (max-width: 680px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .user-profile-group[_ngcontent-%COMP%] {
    align-items: flex-start;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-avatar-wrapper[_ngcontent-%COMP%] {
  position: relative;
  width: 95px;
  height: 95px;
  flex-shrink: 0;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-avatar-wrapper[_ngcontent-%COMP%]   .avatar-glow[_ngcontent-%COMP%] {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-avatar-wrapper[_ngcontent-%COMP%]   .premium-avatar-img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 5px solid #224671;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-avatar-wrapper[_ngcontent-%COMP%]   .premium-avatar-placeholder[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #ffffff;
  position: relative;
  z-index: 2;
  border: 3px solid rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-greeting[_ngcontent-%COMP%] {
  color: #D5D3CE;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
  text-transform: none;
  padding-top: 34px;
}
@media (max-width: 680px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-greeting[_ngcontent-%COMP%] {
    padding-top: 0;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-name-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-name-row[_ngcontent-%COMP%]   .premium-name[_ngcontent-%COMP%] {
  color: #D5D3CE;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-name-row[_ngcontent-%COMP%]   .premium-status-badge[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  padding: 3px 12px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 11px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  letter-spacing: 0.3px;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-meta-info[_ngcontent-%COMP%] {
  color: #DA8F67;
  font-size: 18px;
  margin: 2px 0 0;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-user-details[_ngcontent-%COMP%]   .premium-meta-info[_ngcontent-%COMP%]   .site-name[_ngcontent-%COMP%] {
  color: #D5D3CE;
  font-weight: 600;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%] {
  margin-top: 24px;
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
}
@media (max-width: 680px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%] {
    width: calc(100% + 111px);
    margin-left: -111px;
    align-items: center;
    gap: 12px;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 78px;
  color: #1A2B3C;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  height: 36px;
  padding: 0 14px;
  font-size: 14px;
}
@media (max-width: 680px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%] {
    min-width: 160px;
    justify-content: center;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.88);
  flex-shrink: 0;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: #ffffff;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.97);
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-v-divider[_ngcontent-%COMP%] {
  width: 1px;
  background: rgba(255, 255, 255, 0.18);
  align-self: stretch;
  margin: 8px 12px;
  flex-shrink: 0;
}
@media (max-width: 1024px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-v-divider[_ngcontent-%COMP%] {
    width: 100%;
    height: 1px;
    align-self: auto;
    margin: 6px 0;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-right-panel[_ngcontent-%COMP%] {
  flex: 0 0 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  gap: 14px;
  text-align: center;
}
@media (max-width: 1024px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-right-panel[_ngcontent-%COMP%] {
    flex: 0 0 auto;
    width: 100%;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .time-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding-top: 30px;
}
@media (max-width: 680px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .time-container[_ngcontent-%COMP%] {
    align-items: center;
    padding-top: 15px;
  }
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .time-container[_ngcontent-%COMP%]   .time-label[_ngcontent-%COMP%] {
  color: #000;
  font-size: 20px;
  margin: 0 0 2px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .time-container[_ngcontent-%COMP%]   .time-label[_ngcontent-%COMP%]::before {
  content: "\\23f1";
  font-size: 20px;
  font-weight: 700;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .time-container[_ngcontent-%COMP%]   .premium-clock-display[_ngcontent-%COMP%] {
  color: #000;
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 2px;
}
.main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-clock-action[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
}
@media (max-width: 680px) {
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-clock-action[_ngcontent-%COMP%] {
    justify-content: center;
  }
}
.main-block[_ngcontent-%COMP%]   .dashboard-row[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
}
.main-block[_ngcontent-%COMP%]   .dashboard-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.main-block[_ngcontent-%COMP%]   .dashboard-col[_ngcontent-%COMP%]    > ion-card.overview-block[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  margin: 0 0 4px;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]::before {
  content: "";
  display: inline-block;
  width: 3px;
  height: 16px;
  background: #1F74BB;
  border-radius: 9999px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .card-dec[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  color: #475569;
  margin: 0 0 16px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
  margin-bottom: 24px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card[_ngcontent-%COMP%]   .card-header-group[_ngcontent-%COMP%] {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card[_ngcontent-%COMP%]   .card-dec[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #475569;
  margin: 4px 0 0 0;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  background: rgba(var(--ion-color-primary-rgb), 0.08);
  color: #1F74BB;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      145deg,
      #f0fdf4 0%,
      #ffffff 40%);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {
  padding: 16px 24px 28px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-chart-col[_ngcontent-%COMP%] {
  padding: 8px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 24px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  height: 100%;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.08);
  border-color: #10b981;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .donut-chart[_ngcontent-%COMP%] {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.04);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .donut-chart[_ngcontent-%COMP%]   .donut-hole[_ngcontent-%COMP%] {
  width: 70px;
  height: 70px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .donut-chart[_ngcontent-%COMP%]   .donut-hole[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .donut-chart[_ngcontent-%COMP%]   .donut-hole[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 8px;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: none;
  padding: 0;
  border: none;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .leave-name[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  text-align: center;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .simple-stats[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .simple-stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .simple-stats[_ngcontent-%COMP%]   .stat.used[_ngcontent-%COMP%] {
  color: #f43f5e;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .leave-donut-wrapper[_ngcontent-%COMP%]   .simple-stats[_ngcontent-%COMP%]   .stat.total[_ngcontent-%COMP%] {
  color: #475569;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .note[_ngcontent-%COMP%] {
  margin: 0 12px;
  padding: 12px 18px;
  background: rgba(16, 185, 129, 0.06);
  border-radius: 16px;
  color: #065f46;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(16, 185, 129, 0.08);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.leave-balance-card[_ngcontent-%COMP%]   .note[_ngcontent-%COMP%]::before {
  content: "\\2728";
  font-size: 14px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      145deg,
      #f5f3ff 0%,
      #ffffff 40%);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {
  padding: 12px 12px 32px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .Announcement-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  margin: 12px;
  display: flex;
  gap: 20px;
  align-items: center;
  border: 1px solid rgba(139, 92, 246, 0.08);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.04);
  transition: all 0.3s ease;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .Announcement-card[_ngcontent-%COMP%]:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(139, 92, 246, 0.08);
  border-color: #8b5cf6;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .Announcement-card[_ngcontent-%COMP%]   .announce-icon[_ngcontent-%COMP%] {
  width: 60px;
  height: 60px;
  background: #f5f3ff;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  flex-shrink: 0;
  box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.1);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .Announcement-card[_ngcontent-%COMP%]   .announce-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 32px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .Announcement-card[_ngcontent-%COMP%]   .announce-body[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 4px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .Announcement-card[_ngcontent-%COMP%]   .announce-body[_ngcontent-%COMP%]   .body-text[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%] {
  bottom: 12px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  background: rgba(139, 92, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.main-block[_ngcontent-%COMP%]   .overview-block.light-modern-card.announcement-carousel-card[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .dot.active[_ngcontent-%COMP%] {
  width: 24px;
  background: #8b5cf6;
  border-radius: 10px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%] {
  background:
    radial-gradient(
      circle at top right,
      #1a0b3a,
      #0d0124);
  padding: 24px;
  border-radius: 28px;
  height: auto;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%] {
  margin-top: 16px;
  max-height: 360px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 5px !important;
  height: 5px !important;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 9999px;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
  transition: background 0.2s ease;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {
  background: rgba(31, 116, 187, 0.5);
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%]::-webkit-scrollbar-button {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .empty-milestones[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px 16px;
  color: rgba(255, 255, 255, 0.4);
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .empty-milestones[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  margin-bottom: 16px;
  background:
    linear-gradient(
      135deg,
      #f093fb,
      #f5576c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(245, 87, 108, 0.4));
}
.main-block[_ngcontent-%COMP%]   .overview-block.milestone-container[_ngcontent-%COMP%]   .empty-milestones[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 500;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  z-index: 999999;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: transparent;
  transition: all 0.2s ease;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-3px) scale(1.01);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]:hover::before {
  background: #38bdf8;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]:hover.today::before {
  background: #f472b6;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item.today[_ngcontent-%COMP%] {
  background: rgba(244, 114, 182, 0.08);
  border-color: rgba(244, 114, 182, 0.2);
  box-shadow: inset 0 0 20px rgba(244, 114, 182, 0.05);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item.today[_ngcontent-%COMP%]   .cosmic-today-pill[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #f472b6,
      #fb7185);
  color: #fff;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item.today[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .avatar-ring[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_rotate-ring 4s linear infinite;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%] {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .avatar-ring[_ngcontent-%COMP%] {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid transparent;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .avatar-ring.birthday[_ngcontent-%COMP%] {
  border-top-color: #f472b6;
  border-right-color: #ec4899;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .avatar-ring.anniversary[_ngcontent-%COMP%] {
  border-top-color: #fbbf24;
  border-right-color: #f59e0b;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .cosmic-avatar[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 2px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .event-badge[_ngcontent-%COMP%] {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .event-badge.birthday-badge[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #f472b6,
      #ec4899);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .premium-avatar-box[_ngcontent-%COMP%]   .event-badge.anniversary-badge[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #fbbf24,
      #f59e0b);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%] {
  flex: 1;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .name-pill-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%] {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%]   .cosmic-event-type[_ngcontent-%COMP%] {
  font-weight: 600;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%]   .text-birthday[_ngcontent-%COMP%] {
  color: #f472b6;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%]   .text-anniversary[_ngcontent-%COMP%] {
  color: #fbbf24;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%]   .cosmic-dot[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.2);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%]   .years-pill[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
  cursor: pointer;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-actions[_ngcontent-%COMP%]   .cosmic-action-btn[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  color: #fff;
  border-color: #1F74BB;
  transform: scale(1.1);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-actions[_ngcontent-%COMP%]   .cosmic-action-btn.wish[_ngcontent-%COMP%]:hover {
  background: #f472b6;
  border-color: #f472b6;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%] {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  animation: _ngcontent-%COMP%_slideDown 0.3s ease-out;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {
  --background: rgba(255, 255, 255, 0.03);
  --color: #fff;
  --placeholder-color: rgba(255, 255, 255, 0.3);
  --padding-start: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  margin-bottom: 12px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  border: none;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:hover {
  color: #fff;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .cosmic-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  transform: translateY(-1px);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%] {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%]   .notes-link[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #f472b6;
  font-weight: 600;
  cursor: pointer;
}
.main-block[_ngcontent-%COMP%]   .overview-block[_ngcontent-%COMP%]   .cosmic-milestone-item[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%]   .notes-link[_ngcontent-%COMP%]   .heart-pulse[_ngcontent-%COMP%] {
  font-size: 16px;
  animation: _ngcontent-%COMP%_heartPulse 1.5s ease-in-out infinite;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-card-body[_ngcontent-%COMP%] {
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-card-body[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%] {
  --background: #f0f4ff;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 8px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-card-body[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --indicator-color: #1E73BB;
  --color: #64748b;
  --color-checked: #ffffff;
  --border-radius: 8px;
  font-weight: 600;
  min-height: 36px;
  text-transform: none;
  font-size: 18px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-card-body[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]::part(indicator-background) {
  background: #1E73BB !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-card-body[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%]   ion-segment-button.segment-button-checked[_ngcontent-%COMP%] {
  --background-checked: #1E73BB;
  --indicator-color: #1E73BB;
  color: #ffffff;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-section-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #1a2b3c;
  margin: 0 0 16px 0;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .birthdays-today-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .empty-today[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  text-align: center;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .empty-today[_ngcontent-%COMP%]   .cake-illustration[_ngcontent-%COMP%] {
  margin-bottom: 12px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .empty-today[_ngcontent-%COMP%]   .empty-text[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #707070;
  margin: 0;
  font-weight: 500;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .today-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .fallback-initials-avatar[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-birthdays-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f1f5f9;
  padding-top: 24px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-scroll-container[_ngcontent-%COMP%] {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 8px 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-scroll-container[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-item-card[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 80px;
  flex-shrink: 0;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-avatar-wrapper[_ngcontent-%COMP%] {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 8px;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-avatar-img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-initials-avatar[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-emp-name[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 84px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .upcoming-event-date[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #6b7280;
  font-weight: 400;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%] {
  background: #eef6fc;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(29, 96, 165, 0.08);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  position: relative;
  min-height: 80px;
  padding: 12px 16px 12px 104px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .blue-tab-prefix[_ngcontent-%COMP%] {
  width: 60px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #1d60a5;
  border-radius: 16px 0 0 16px;
  z-index: 1;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .blue-tab-prefix[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: #1d60a5;
  border-radius: 50%;
  z-index: 1;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .avatar-container[_ngcontent-%COMP%] {
  position: absolute;
  left: 36px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #fff;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .avatar-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #212529;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #555555;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-action[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-action[_ngcontent-%COMP%]   .action-btn-pill[_ngcontent-%COMP%] {
  background: #1b6cb9;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 24px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(27, 108, 185, 0.2);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-action[_ngcontent-%COMP%]   .action-btn-pill[_ngcontent-%COMP%]:hover {
  background: #155894;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(27, 108, 185, 0.3);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-action[_ngcontent-%COMP%]   .action-btn-pill[_ngcontent-%COMP%]:active {
  transform: scale(0.97);
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%] {
  margin: 0 16px 16px 104px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {
  --background: #f8fafc;
  --color: #212529;
  --placeholder-color: #94a3b8;
  --padding-start: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #475569;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:hover {
  background: #e2e8f0;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {
  background: #1b6cb9;
  color: #fff;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]:hover {
  background: #155894;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%] {
  padding-top: 8px;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%]   .notes-link[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #ec4899;
  font-weight: 600;
  cursor: pointer;
}
.main-block[_ngcontent-%COMP%]   .milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%]   .notes-link[_ngcontent-%COMP%]   .heart-pulse[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #ec4899;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-balance-body[_ngcontent-%COMP%] {
  padding: 16px 0 8px 0;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-columns-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle[_ngcontent-%COMP%] {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  background: #EDEDFB;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle[_ngcontent-%COMP%]:hover {
  transform: scale(1.05);
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle.leave-casual[_ngcontent-%COMP%] {
  background: #eee8fc;
  color: #7c3aed;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle.leave-sick[_ngcontent-%COMP%] {
  background: #e6f7f0;
  color: #10b981;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle.leave-compoff[_ngcontent-%COMP%] {
  background: #e1f3ff;
  color: #1870b9;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 30px;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-icon-circle[_ngcontent-%COMP%]   .uploaded-icon-small[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-type-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 6px 0;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-days-left[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #707070;
  margin: 0;
  font-weight: 500;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-days-left[_ngcontent-%COMP%]   .days-bold[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1870b9;
}
.main-block[_ngcontent-%COMP%]   .leave-balance-card-flat[_ngcontent-%COMP%]   .leave-footer-note[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #707070;
  margin: 16px 0 0 0;
  text-align: left;
  font-weight: 400;
  border-top: 1px solid #E2E8F0;
  padding-top: 16px;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%] {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  min-height: 350px;
  background:
    linear-gradient(
      135deg,
      #c0392b 0%,
      #e74c3c 40%,
      #c0392b 70%,
      #922b21 100%);
  display: flex;
  align-items: flex-end;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background:
    radial-gradient(
      ellipse 80px 40px at 15% 100%,
      #d6eaf8 50%,
      transparent 50%),
    radial-gradient(
      ellipse 70px 35px at 35% 100%,
      #e8f4f8 50%,
      transparent 50%),
    radial-gradient(
      ellipse 90px 45px at 55% 100%,
      #d6eaf8 50%,
      transparent 50%),
    radial-gradient(
      ellipse 80px 40px at 75% 100%,
      #e8f4f8 50%,
      transparent 50%),
    radial-gradient(
      ellipse 60px 35px at 95% 100%,
      #d6eaf8 50%,
      transparent 50%);
  background-color: #d6eaf8;
  pointer-events: none;
  z-index: 2;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.6) 1.5px,
      transparent 1.5px),
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.4) 1px,
      transparent 1px);
  background-size: 40px 40px, 20px 20px;
  background-position: 0 0, 10px 10px;
  pointer-events: none;
  z-index: 1;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-content[_ngcontent-%COMP%] {
  position: relative;
  z-index: 3;
  padding: 24px 24px 72px 24px;
  width: 60%;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%]   .holiday-day[_ngcontent-%COMP%] {
  font-size: 52px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -1px;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%]   .holiday-month-year[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 2px;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%]   .holiday-name[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 6px;
}
.main-block[_ngcontent-%COMP%]   .holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-overlay[_ngcontent-%COMP%] {
  display: none;
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 480px) {
  .main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #dce9f5;
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]:hover {
  background: #c8dcf0;
  border-color: #a8c8e8;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(29, 96, 165, 0.1);
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-icon-wrap[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #1d3557;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ffffff;
  transition: all 0.22s ease;
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-icon-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]:hover   .ql-icon-wrap[_ngcontent-%COMP%] {
  background: #1a2d45;
  transform: scale(1.05);
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-text[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-text[_ngcontent-%COMP%]   .ql-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #1a2b3c;
  line-height: 1.2;
}
.main-block[_ngcontent-%COMP%]   .quick-links-card[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-text[_ngcontent-%COMP%]   .ql-desc[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #4a6080;
  font-weight: 400;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-list-body[_ngcontent-%COMP%] {
  padding: 16px 0 8px 0;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-carousel-wrapper[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  width: 100%;
  margin-bottom: 16px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-carousel-wrapper[_ngcontent-%COMP%]   .announcements-carousel-slides[_ngcontent-%COMP%] {
  flex: 1;
  overflow: hidden;
  position: relative;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-carousel-wrapper[_ngcontent-%COMP%]   .carousel-control-btn[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: #4b5563;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-carousel-wrapper[_ngcontent-%COMP%]   .carousel-control-btn[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #1f2937;
  transform: scale(1.08);
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-carousel-wrapper[_ngcontent-%COMP%]   .carousel-control-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcements-carousel-wrapper[_ngcontent-%COMP%]   .carousel-control-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
  width: 100%;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .carousel-indicators[_ngcontent-%COMP%]   .dot.active[_ngcontent-%COMP%] {
  width: 24px;
  background: #3b82f6;
  border-radius: 10px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: stretch;
  gap: 16px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  background: #ffffff;
  transition: all 0.2s ease;
  position: relative;
  width: 100%;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row.active-slide[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_slideFadeIn 0.4s ease-out;
}
@keyframes _ngcontent-%COMP%_slideFadeIn {
  from {
    opacity: 0.8;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-thumbnail[_ngcontent-%COMP%] {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #f1f5f9;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-description[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #707070;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #707070;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .time-ago[_ngcontent-%COMP%] {
  font-weight: 400;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .separator-dot[_ngcontent-%COMP%] {
  color: #cbd5e1;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%]   .author-avatar[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%]   .author-name[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #555555;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  align-self: flex-end;
  padding-bottom: 2px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #1870b9;
  font-weight: 600;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%] {
  font-size: 14px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {
  font-weight: 600;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .view-all-link-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .view-all-link-container[_ngcontent-%COMP%]   .view-all-link[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #1870b9;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}
.main-block[_ngcontent-%COMP%]   .announcements-card-flat[_ngcontent-%COMP%]   .view-all-link-container[_ngcontent-%COMP%]   .view-all-link[_ngcontent-%COMP%]:hover {
  color: #155894;
  text-decoration: underline;
}
.wishes-modal[_ngcontent-%COMP%] {
  --height: 50%;
  --border-radius: 20px 20px 0 0;
  --box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
  align-items: flex-end;
}
.wishes-modal[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --color: #0f172a;
  border-bottom: 1px solid #f1f5f9;
}
.wishes-modal[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
}
.wishes-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {
  --background: #f8fafc;
}
.wishes-modal[_ngcontent-%COMP%]   .modal-wishes-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
}
.wishes-modal[_ngcontent-%COMP%]   .wish-card-item[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.wishes-modal[_ngcontent-%COMP%]   .wish-card-item[_ngcontent-%COMP%]   .wish-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.wishes-modal[_ngcontent-%COMP%]   .wish-card-item[_ngcontent-%COMP%]   .wish-header[_ngcontent-%COMP%]   .sender[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.wishes-modal[_ngcontent-%COMP%]   .wish-card-item[_ngcontent-%COMP%]   .wish-header[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%] {
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  color: #94a3b8;
}
.wishes-modal[_ngcontent-%COMP%]   .wish-card-item[_ngcontent-%COMP%]   .wish-text[_ngcontent-%COMP%] {
  margin: 0;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  line-height: 1.5;
}
.wishes-modal[_ngcontent-%COMP%]   .no-wishes-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  color: #94a3b8;
  text-align: center;
}
.wishes-modal[_ngcontent-%COMP%]   .no-wishes-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.35;
  display: block;
}
.wishes-modal[_ngcontent-%COMP%]   .no-wishes-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  margin: 0;
}
.attendance_active[_ngcontent-%COMP%] {
  margin-left: 8px;
  font-weight: 600;
}
.attendance_badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  margin-left: 8px;
  border-radius: 9999px;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 600;
  background-color: #ffffff;
  border: 1px solid #ABABAB;
  transition: all 0.2s ease;
}
.dot[_ngcontent-%COMP%] {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.modern-overview-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      180deg,
      #fcfcfc 0%,
      #ffffff 100%) !important;
  border: 1px solid #ABABAB !important;
  border-radius: 10px !important;
  padding: 20px 20px !important;
  margin: 0 0 0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 2px 8px rgba(0, 0, 0, 0.01) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.modern-overview-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.02) !important;
  border-color: #cbd5e1 !important;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .overview-title[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #212529;
  margin: 0;
  letter-spacing: -0.5px;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .overview-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #707070;
  margin: 6px 0 0 0;
  font-weight: 400;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-badge[_ngcontent-%COMP%]   .badge-pill[_ngcontent-%COMP%] {
  display: inline-block;
  background: #E8EBF2;
  color: #1A2B3C;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 30px;
  letter-spacing: 0.2px;
  border: 1px solid #e2e8f0;
}
.modern-overview-card[_ngcontent-%COMP%]   .divider-line[_ngcontent-%COMP%] {
  height: 1px;
  background: #BBBBBB;
  margin: 16px 0 24px 0;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 32px;
}
@media (max-width: 768px) {
  .modern-overview-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 24px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #707070;
  font-weight: 500;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #212529;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .stat-value.bold-text[_ngcontent-%COMP%] {
  font-weight: 700;
  font-size: 17px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .status-badge-pill[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 6px 20px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .status-badge-pill.active[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #1e40af;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .status-badge-pill.status-in[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #065f46;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .status-badge-pill.status-out[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #991b1b;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .status-badge-pill.status-pending[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #475569;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .effective-labels[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .effective-labels[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #334155;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%] {
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .attendance-bar[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  height: 8px;
  border-radius: 99px;
  overflow: hidden;
  background: #e2e8f0;
  width: 100%;
  gap: 2px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .attendance-bar.empty-bar[_ngcontent-%COMP%] {
  background: #e2e8f0;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .bar-segment[_ngcontent-%COMP%] {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease;
  flex-shrink: 0;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .bar-segment.seg-work[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #38bdf8,
      #0ea5e9);
  box-shadow: 0 0 4px rgba(14, 165, 233, 0.4);
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .bar-segment.seg-break[_ngcontent-%COMP%] {
  background: #4f74a3;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .bar-segment.seg-empty[_ngcontent-%COMP%] {
  background: #f1f5f9;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .bar-legend[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 6px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .legend-dot[_ngcontent-%COMP%] {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .legend-dot.dot-work[_ngcontent-%COMP%] {
  background: #0ea5e9;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .legend-dot.dot-break[_ngcontent-%COMP%] {
  background: #cbd5e1;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%]   .legend-lbl[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #707070;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-right: 6px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .mode-pill-row[_ngcontent-%COMP%] {
  margin-top: 12px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%]   .mode-pill-row[_ngcontent-%COMP%]   .mode-pill[_ngcontent-%COMP%] {
  display: inline-block;
  background: #E8EBF2;
  color: #212529;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 30px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%] {
  background: #EFF0F4;
  border-radius: 6px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  background: #f1f5f9;
  border-color: #cbd5e1;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-content[_ngcontent-%COMP%]   .mini-card-label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #1A2B3C;
  font-weight: 400;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-content[_ngcontent-%COMP%]   .mini-card-value[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #212529;
  line-height: 100%;
  letter-spacing: 2%;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon.green-icon[_ngcontent-%COMP%] {
  color: #10b981;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon.blue-icon[_ngcontent-%COMP%] {
  color: #3b82f6;
}
@keyframes _ngcontent-%COMP%_rotate-ring {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes _ngcontent-%COMP%_heartPulse {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}
#stars[_ngcontent-%COMP%] {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow:
    1744px 122px #FFF,
    134px 1321px #FFF,
    92px 859px #FFF;
  animation: _ngcontent-%COMP%_animStar 50s linear infinite;
}
#stars[_ngcontent-%COMP%]::after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow:
    1744px 122px #FFF,
    134px 1321px #FFF,
    92px 859px #FFF;
}
#stars2[_ngcontent-%COMP%] {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow:
    123px 456px #FFF,
    789px 123px #FFF,
    456px 789px #FFF;
  animation: _ngcontent-%COMP%_animStar 100s linear infinite;
}
#stars2[_ngcontent-%COMP%]::after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow:
    123px 456px #FFF,
    789px 123px #FFF,
    456px 789px #FFF;
}
#stars3[_ngcontent-%COMP%] {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow:
    10px 20px #FFF,
    500px 600px #FFF,
    900px 1000px #FFF;
  animation: _ngcontent-%COMP%_animStar 150s linear infinite;
}
#stars3[_ngcontent-%COMP%]::after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow:
    10px 20px #FFF,
    500px 600px #FFF,
    900px 1000px #FFF;
}
@keyframes _ngcontent-%COMP%_animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
@keyframes _ngcontent-%COMP%_badge-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _ngcontent-%COMP%_slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_pulseGlow {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0.9;
  }
}
@media screen and (max-width: 768px) {
  .Announcement-card[_ngcontent-%COMP%] {
    display: block !important;
  }
  .Announcement-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
    white-space: normal !important;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-main-layout[_ngcontent-%COMP%] {
    padding: 18px 16px;
    gap: 12px;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-name-row[_ngcontent-%COMP%]   .premium-name[_ngcontent-%COMP%] {
    font-size: 20px;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-clock-display[_ngcontent-%COMP%] {
    font-size: 30px;
    letter-spacing: 1px;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%] {
    gap: 6px;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%] {
    padding: 5px 12px;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .premium-action-row[_ngcontent-%COMP%]   .glass-action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .main-block[_ngcontent-%COMP%]   .welcome-block[_ngcontent-%COMP%]   .welcome-card-premium[_ngcontent-%COMP%]   .welcome-right-panel[_ngcontent-%COMP%] {
    flex: 0 0 auto;
    width: 100%;
  }
}
.modern-overview-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e8ecf0;
  border-radius: 18px;
  padding: 0;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}
.modern-overview-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.09);
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 20px 0;
}
@media (max-width: 680px) {
  .modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 12px;
  }
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .overview-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #1a2b3c;
  margin: 0 0 2px;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .overview-subtitle[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #8a94a6;
  margin: 0;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-badge[_ngcontent-%COMP%]   .badge-pill[_ngcontent-%COMP%] {
  display: inline-block;
  background: #f0f4ff;
  color: #3b5bdb;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid #d0dcff;
  white-space: nowrap;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   .header-badge[_ngcontent-%COMP%]   .badge-pill.light-blue[_ngcontent-%COMP%] {
  background: #e8f4fd;
  color: #1a78c2;
  border-color: #b8dcf5;
}
.modern-overview-card[_ngcontent-%COMP%]   .divider-line[_ngcontent-%COMP%] {
  height: 1px;
  background: #f0f2f5;
  margin: 14px 20px 0;
}
.modern-overview-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  padding: 16px 20px 20px;
}
@media (max-width: 680px) {
  .modern-overview-card[_ngcontent-%COMP%]   .card-body-grid[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 20px;
  }
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-left-col[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stats-right-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 160px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.modern-overview-card[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {
  color: #8a94a6;
  font-weight: 500;
}
.modern-overview-card[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {
  color: #1a2b3c;
  font-weight: 600;
}
.modern-overview-card[_ngcontent-%COMP%]   .stat-item-row[_ngcontent-%COMP%]   .stat-value.bold-text[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
}
.modern-overview-card[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%] {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
}
.modern-overview-card[_ngcontent-%COMP%]   .effective-row[_ngcontent-%COMP%]   .effective-labels[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
}
.modern-overview-card[_ngcontent-%COMP%]   .attendance-visual-wrap[_ngcontent-%COMP%] {
  margin-top: 6px;
  margin-bottom: 6px;
}
.modern-overview-card[_ngcontent-%COMP%]   .mode-pill-row[_ngcontent-%COMP%] {
  margin-top: 4px;
}
.modern-overview-card[_ngcontent-%COMP%]   .mode-pill-row[_ngcontent-%COMP%]   .mode-pill[_ngcontent-%COMP%] {
  display: inline-block;
  background: #f5f7fa;
  color: #5a6475;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid #e2e6ea;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 1px solid #e8ecf0;
  border-radius: 12px;
  padding: 12px 14px;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-content[_ngcontent-%COMP%]   .mini-card-label[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #8a94a6;
  font-weight: 500;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-content[_ngcontent-%COMP%]   .mini-card-value[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #1a2b3c;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon.green-icon[_ngcontent-%COMP%] {
  background: #e8faf0;
  color: #12a058;
}
.modern-overview-card[_ngcontent-%COMP%]   .info-mini-card[_ngcontent-%COMP%]   .mini-card-icon.blue-icon[_ngcontent-%COMP%] {
  background: #e8f0ff;
  color: #3b5bdb;
}
.modern-overview-card[_ngcontent-%COMP%]   .status-badge-pill[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.modern-overview-card[_ngcontent-%COMP%]   .status-badge-pill.status-in[_ngcontent-%COMP%] {
  background: #e8faf0;
  color: #12a058;
  border: 1px solid #b6ecd0;
}
.modern-overview-card[_ngcontent-%COMP%]   .status-badge-pill.status-out[_ngcontent-%COMP%] {
  background: #fff5f5;
  color: #e03131;
  border: 1px solid #fcc;
}
.modern-overview-card[_ngcontent-%COMP%]   .status-badge-pill.status-pending[_ngcontent-%COMP%] {
  background: #fff8e8;
  color: #d97706;
  border: 1px solid #fde68a;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-balance-body[_ngcontent-%COMP%] {
  padding: 16px 20px 20px;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-columns-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 72px;
  text-align: center;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%]   .leave-icon-circle[_ngcontent-%COMP%] {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%]   .leave-icon-circle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #fff;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%]   .leave-type-title[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #5a6475;
  margin: 0;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%]   .leave-days-left[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #8a94a6;
  margin: 0;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-column[_ngcontent-%COMP%]   .leave-days-left[_ngcontent-%COMP%]   .days-bold[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  color: #1a2b3c;
}
.leave-balance-card-flat[_ngcontent-%COMP%]   .leave-footer-note[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #8a94a6;
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px solid #f0f2f5;
  font-style: italic;
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%] {
  position: relative;
  margin: 16px 20px 20px;
  border-radius: 14px;
  overflow: hidden;
  min-height: 100px;
  background:
    linear-gradient(
      135deg,
      #1a2b3c 0%,
      #2c4a6e 100%);
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-overlay[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  background: url("./media/christmas_holiday-DMMK4PMQ.png") center/cover no-repeat;
  opacity: 0.35;
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-content[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  padding: 20px;
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-content[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-content[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%]   .holiday-day[_ngcontent-%COMP%] {
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-content[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%]   .holiday-month-year[_ngcontent-%COMP%] {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}
.holidays-card[_ngcontent-%COMP%]   .holiday-banner[_ngcontent-%COMP%]   .holiday-banner-content[_ngcontent-%COMP%]   .holiday-date-block[_ngcontent-%COMP%]   .holiday-name[_ngcontent-%COMP%] {
  font-size: 15px;
  color: #ffd700;
  font-weight: 700;
  margin-top: 4px;
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  padding: 16px 20px 20px;
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #f8fafc;
  border: 1px solid #e8ecf0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]:hover {
  background: #f0f4ff;
  border-color: #c5d3ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 91, 219, 0.1);
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-icon-wrap[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #e8f0ff;
  color: #3b5bdb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-text[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-text[_ngcontent-%COMP%]   .ql-title[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  color: #1a2b3c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.quick-links-card[_ngcontent-%COMP%]   .quick-links-grid[_ngcontent-%COMP%]   .quick-link-tile[_ngcontent-%COMP%]   .ql-text[_ngcontent-%COMP%]   .ql-desc[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #8a94a6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcements-list-body[_ngcontent-%COMP%] {
  padding: 12px 20px 16px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .no-announcements[_ngcontent-%COMP%] {
  text-align: center;
  padding: 28px 16px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .no-announcements[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #8a94a6;
  font-size: 13px;
  margin: 0;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcements-vertical-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #eef1f5;
  border-radius: 14px;
  transition: all 0.2s ease;
  cursor: default;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]:hover {
  background: #f0f4ff;
  border-color: #d0dcff;
  box-shadow: 0 3px 10px rgba(59, 91, 219, 0.07);
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-thumbnail[_ngcontent-%COMP%] {
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e6ea;
  background: #eef1f5;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  transition: transform 0.3s ease;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-thumbnail[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {
  transform: scale(1.05);
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #1a2b3c;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-description[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #5a6475;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .time-ago[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #8a94a6;
  font-weight: 500;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .separator-dot[_ngcontent-%COMP%] {
  color: #c0c8d4;
  font-size: 10px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 5px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%]   .author-avatar[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #d0d7e0;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-main-content[_ngcontent-%COMP%]   .announcement-footer-row[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%]   .author-name[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #5a6475;
  font-weight: 600;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 3px;
  background: #fff;
  border: 1px solid #e8ecf0;
  border-radius: 20px;
  padding: 3px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%]:hover {
  background: #f0f4ff;
  border-color: #c5d3ff;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%] {
  font-size: 13px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .announcement-item-row[_ngcontent-%COMP%]   .announcement-reactions[_ngcontent-%COMP%]   .reaction-item[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #5a6475;
}
.announcements-card-flat[_ngcontent-%COMP%]   .view-all-link-container[_ngcontent-%COMP%] {
  text-align: center;
  padding-top: 10px;
}
.announcements-card-flat[_ngcontent-%COMP%]   .view-all-link-container[_ngcontent-%COMP%]   .view-all-link[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
  color: #3b5bdb;
  cursor: pointer;
  text-decoration: none;
}
.announcements-card-flat[_ngcontent-%COMP%]   .view-all-link-container[_ngcontent-%COMP%]   .view-all-link[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
  color: #2a47c0;
}
.milestone-card[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%] {
  --background: #f1f5f9;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 8px;
}
.milestone-card[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --indicator-color: #1E73BB;
  --color: #64748b;
  --color-checked: #ffffff;
  --border-radius: 8px;
  font-weight: 600;
  min-height: 36px;
  text-transform: none;
}
.milestone-card[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]::part(indicator-background) {
  background: #1E73BB !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.milestone-card[_ngcontent-%COMP%]   .celebration-segment[_ngcontent-%COMP%]   ion-segment-button.segment-button-checked[_ngcontent-%COMP%] {
  --background-checked: #1E73BB;
  --indicator-color: #1E73BB;
  color: #ffffff;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-list[_ngcontent-%COMP%] {
  padding: 12px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.milestone-card[_ngcontent-%COMP%]   .empty-milestones[_ngcontent-%COMP%] {
  text-align: center;
  padding: 28px 16px;
  color: #8a94a6;
}
.milestone-card[_ngcontent-%COMP%]   .empty-milestones[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 36px;
  display: block;
  margin-bottom: 8px;
  opacity: 0.5;
}
.milestone-card[_ngcontent-%COMP%]   .empty-milestones[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  margin: 0;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%] {
  border-radius: 14px;
  border: 1px solid #eef1f5;
  background: #f8fafc;
  overflow: hidden;
  transition: all 0.2s ease;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat.today[_ngcontent-%COMP%] {
  background: #fff8f0;
  border-color: #fde8c8;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat.today[_ngcontent-%COMP%]   .blue-tab-prefix[_ngcontent-%COMP%] {
  background: #f59e0b !important;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .blue-tab-prefix[_ngcontent-%COMP%] {
  width: 4px;
  border-radius: 4px;
  background: #3b5bdb;
  flex-shrink: 0;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .avatar-container[_ngcontent-%COMP%] {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #d0d7e0;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .avatar-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #1a2b3c;
  display: block;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .event-meta[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #5a6475;
  margin-top: 2px;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .milestone-action[_ngcontent-%COMP%]   .action-btn-pill[_ngcontent-%COMP%] {
  background: #3b5bdb;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .item-main[_ngcontent-%COMP%]   .milestone-action[_ngcontent-%COMP%]   .action-btn-pill[_ngcontent-%COMP%]:hover {
  background: #2a47c0;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%] {
  padding: 10px 14px;
  border-top: 1px solid #eef1f5;
  display: flex;
  gap: 10px;
  align-items: center;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {
  flex: 1;
  --background: #fff;
  --border-radius: 10px;
  --padding-start: 12px;
  --padding-end: 12px;
  font-size: 13px;
  border: 1px solid #d0d7e0;
  border-radius: 10px;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button.send-btn[_ngcontent-%COMP%] {
  background: #3b5bdb;
  color: #fff;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button.send-btn[_ngcontent-%COMP%]:hover {
  background: #2a47c0;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {
  background: #f0f2f5;
  color: #5a6475;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .milestone-wish-input-reveal[_ngcontent-%COMP%]   .reveal-btns[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%]:hover {
  background: #e2e6ea;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%] {
  padding: 8px 14px 12px;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%]   .notes-link[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #d97706;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.milestone-card[_ngcontent-%COMP%]   .milestone-item-flat[_ngcontent-%COMP%]   .celebration-footer[_ngcontent-%COMP%]   .notes-link[_ngcontent-%COMP%]   ion-icon.heart-pulse[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_heartbeat 1.4s ease-in-out infinite;
}
@keyframes _ngcontent-%COMP%_heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(1);
  }
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%] {
  --border-radius: 24px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .modal-wrapper[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafbff;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .colorful-header[_ngcontent-%COMP%] {
  --background:
    linear-gradient(
      135deg,
      #3b5bdb,
      #6c8fff);
  --color: #fff;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .colorful-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .colorful-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .star-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #ffd700;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .colorful-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .colorful-header[_ngcontent-%COMP%]   .close-circle[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.85);
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .modal-content-area[_ngcontent-%COMP%] {
  --background: #fafbff;
  padding: 16px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wishes-grid[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%] {
  background: #fff;
  border: 1px solid #e0e8ff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(59, 91, 219, 0.07);
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%]   .sender-avatar-small[_ngcontent-%COMP%] {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background:
    linear-gradient(
      135deg,
      #3b5bdb,
      #6c8fff);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%]   .wish-body[_ngcontent-%COMP%] {
  flex: 1;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%]   .wish-body[_ngcontent-%COMP%]   .wish-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%]   .wish-body[_ngcontent-%COMP%]   .wish-header[_ngcontent-%COMP%]   .sender-name[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  color: #1a2b3c;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%]   .wish-body[_ngcontent-%COMP%]   .wish-header[_ngcontent-%COMP%]   .wish-time[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #8a94a6;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .wish-glass-card[_ngcontent-%COMP%]   .wish-card-inner[_ngcontent-%COMP%]   .wish-body[_ngcontent-%COMP%]   .wish-message[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #5a6475;
  margin: 0;
  line-height: 1.5;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .empty-wishes-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 48px 24px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .empty-wishes-state[_ngcontent-%COMP%]   .empty-icon-box[_ngcontent-%COMP%] {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .empty-wishes-state[_ngcontent-%COMP%]   .empty-icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 36px;
  color: #3b5bdb;
  opacity: 0.6;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .empty-wishes-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #1a2b3c;
  margin: 0 0 8px;
}
.wishes-modal.premium-colorful-modal[_ngcontent-%COMP%]   .empty-wishes-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #8a94a6;
  margin: 0;
}`]});let o=s;return o})();var Ze=[{path:"",component:Zn}],Pt=(()=>{let s=class s{};s.\u0275fac=function(c){return new(c||s)},s.\u0275mod=sn({type:s}),s.\u0275inj=rn({imports:[Pn,xn,qn,On.forChild(Ze),nn]});let o=s;return o})();export{Pt as HomePageModule};
