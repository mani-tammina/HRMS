import{a as H}from"./chunk-DA4OVRGX.js";import{a as F}from"./chunk-NDCRD3QG.js";import{Fa as $,Ga as j,X as B}from"./chunk-B3PLR2IL.js";import{A as O,Ba as f,Ca as g,Da as m,E as M,Eb as A,H as y,K as p,Kb as T,L as h,Ma as S,Oa as k,Vb as V,_ as d,ca as _,d as w,e as v,ea as I,ja as b,ka as P,ra as u,rb as R,sa as c,ta as a,ua as l}from"./chunk-27EUYVIP.js";import{e as x}from"./chunk-JHI3MBHO.js";var Q=(()=>{let n=class n{constructor(e){this.http=e,this.env=F,this.monthlyReportSource=new v([]),this.monthlyReport$=this.monthlyReportSource.asObservable()}loadMonthlyReportOnAppStart(e,t,i){let s=new Date(t,i,0).getDate(),E=`${t}-${i.toString().padStart(2,"0")}-01`,z=`${t}-${i.toString().padStart(2,"0")}-${s}`;e.getMonthlyReport({startDate:E,endDate:z,month:i,year:t}).subscribe({next:C=>{let D=C?.attendance||[];this.monthlyReportSource.next(D)},error:C=>{console.error("Monthly report failed",C),this.monthlyReportSource.next([])}})}setMonthlyReport(e){this.monthlyReportSource.next(e)}getMonthlyReports(){return this.monthlyReportSource.getValue()}};n.\u0275fac=function(t){return new(t||n)(y(T))},n.\u0275prov=M({token:n,factory:n.\u0275fac,providedIn:"root"});let o=n;return o})();function U(o,n){if(o&1){let r=f();c(0,"div",2)(1,"button",3),g("click",function(){p(r);let t=m();return h(t.clockIn("Office"))}),l(2,"div",4),c(3,"div",5)(4,"span",6),k(5,"Clock In"),a()()()()}}function Y(o,n){if(o&1){let r=f();c(0,"button",10),g("click",function(){p(r);let t=m(2);return h(t.clockOut())}),l(1,"div",11),c(2,"div",5)(3,"span",6),k(4,"Clock Out"),a()()()}}function L(o,n){if(o&1){let r=f();c(0,"button",12),g("click",function(){p(r);let t=m(2);return h(t.remoteClockOut())}),l(1,"div",13),c(2,"div",5),l(3,"ion-icon",14),c(4,"span",6),k(5,"Remote Out"),a()()()}}function N(o,n){if(o&1){let r=f();c(0,"button",15),g("click",function(){p(r);let t=m(2);return h(t.clockOut())}),l(1,"div",16),c(2,"div",5),l(3,"ion-icon",17),c(4,"span",6),k(5,"WFH Out"),a()()()}}function G(o,n){if(o&1&&(c(0,"div",2),b(1,Y,5,0,"button",7)(2,L,6,0,"button",8)(3,N,6,0,"button",9),a()),o&2){let r=m();d(),u("ngIf",r.workMode==="Office"),d(),u("ngIf",r.workMode==="Remote"),d(),u("ngIf",r.workMode==="WFH")}}var dt=(()=>{let n=class n{constructor(e,t,i){this.router=e,this.attendanceApi=t,this.toastCtrl=i,this.statusChanged=new P,this.isClockedIn=!1,this.workMode="Office",this.remoteActive=!1,this.loading=!1,this.destroy$=new w}ngOnInit(){this.currentUrl=this.router.url,this.attendanceApi.clockState$.pipe(O(this.destroy$)).subscribe(e=>{this.isClockedIn=e,this.remoteActive=localStorage.getItem("remoteActive")==="true",this.remoteActive&&(this.workMode="Remote")}),this.loadLastPunch()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadLastPunch(){this.attendanceApi.getTodayAttendance(!0).subscribe({next:e=>{let t=e?.punches||[];if(!t.length){this.isClockedIn=!1,this.workMode="Office",this.remoteActive=!1,localStorage.removeItem("remoteActive");return}let i=t[t.length-1];this.isClockedIn=i.punch_type==="in",this.workMode=i.work_mode||"Office",localStorage.setItem("todayPunches",JSON.stringify(t)),this.isClockedIn&&this.workMode==="Remote"?(this.remoteActive=!0,localStorage.setItem("remoteActive","true")):(this.remoteActive=!1,localStorage.removeItem("remoteActive"))},error:()=>{this.isClockedIn=!1,this.workMode="Office",this.remoteActive=!1}})}clockIn(e){if(this.isClockedIn)return;this.loading=!0;let t="Mumbai Office",i="Office Clock-In";e==="Remote"?(t="Remote",i="Remote Clock-In",this.workMode="Remote",this.remoteActive=!0):e==="WFH"?(t="Home",i="WFH Clock-In",this.workMode="WFH"):this.workMode="Office",this.isClockedIn=!0,this.statusChanged.emit({punch_type:"in",work_mode:e}),this.attendanceApi.apiPunchIn({work_mode:e,location:t,notes:i}).subscribe({next:s=>{this.loading=!1,s?.success&&(this.showToast(s?.message||"Clocked in successfully","success"),this.statusChanged.emit({punch_type:"in",work_mode:e}))},error:s=>{this.loading=!1,s?.error?.message?.includes("active punch-in")?(this.showToast("You already have an active punch-in. Please clock out first.","warning"),this.isClockedIn=!0):(this.showToast(s?.error?.message||"Clock-In failed. Please try again.","danger"),this.isClockedIn=!1)}})}clockOut(){this.loading=!0,this.isClockedIn=!1,this.statusChanged.emit({punch_type:"out",work_mode:this.workMode});let e=this.workMode==="WFH";this.attendanceApi.apiPunchOut({notes:e?"WFH Clock-Out":"Going for lunch"}).subscribe({next:t=>{this.loading=!1,t?.success&&(this.showToast(t?.message||"Clocked out successfully","danger"),this.statusChanged.emit({punch_type:"out",work_mode:this.workMode}),e&&(this.workMode="Office"))},error:t=>{this.loading=!1,this.showToast(t?.error?.message||"Clock-Out failed. Please try again.","danger")}})}remoteClockOut(){this.loading=!0,this.isClockedIn=!1,this.remoteActive=!1,this.workMode="Office",localStorage.removeItem("remoteActive"),this.statusChanged.emit({punch_type:"out",work_mode:"Remote"}),this.attendanceApi.apiPunchOut({notes:"Remote Clock-Out"}).subscribe({next:e=>{this.loading=!1,e?.success&&(this.showToast(e?.message||"Remote clocked out successfully","danger"),this.statusChanged.emit({punch_type:"out",work_mode:"Remote"}))},error:e=>{this.loading=!1,this.showToast(e?.error?.message||"Remote Clock-Out failed.","danger")}})}showToast(e,t="success"){return x(this,null,function*(){yield(yield this.toastCtrl.create({message:e,duration:3e3,position:"top",color:t})).present()})}};n.\u0275fac=function(t){return new(t||n)(_(V),_(H),_($))},n.\u0275cmp=I({type:n,selectors:[["app-clock-button"]],inputs:{record:"record"},outputs:{statusChanged:"statusChanged"},decls:3,vars:4,consts:[[1,"attendance-btn-container"],["class","row-center",4,"ngIf"],[1,"row-center"],[1,"modern-clock-btn","in",3,"click"],[1,"inner-pulse"],[1,"btn-content"],[1,"text"],["class","modern-clock-btn out",3,"click",4,"ngIf"],["class","modern-clock-btn remote",3,"click",4,"ngIf"],["class","modern-clock-btn wfh",3,"click",4,"ngIf"],[1,"modern-clock-btn","out",3,"click"],[1,"inner-pulse","red"],[1,"modern-clock-btn","remote",3,"click"],[1,"inner-pulse","orange"],["name","cloud-offline-outline"],[1,"modern-clock-btn","wfh",3,"click"],[1,"inner-pulse","cyan"],["name","home-outline"]],template:function(t,i){t&1&&(c(0,"div",0),b(1,U,6,0,"div",1)(2,G,4,3,"div",1),a()),t&2&&(S("mini-layout",i.currentUrl==="/Me"),d(),u("ngIf",!i.isClockedIn),d(),u("ngIf",i.isClockedIn))},dependencies:[A,R,j,B],styles:[`

.attendance-btn-container.mini-layout[_ngcontent-%COMP%]   .modern-clock-btn[_ngcontent-%COMP%] {
  height: 44px;
  padding: 0 16px;
}
.attendance-btn-container.mini-layout[_ngcontent-%COMP%]   .modern-clock-btn[_ngcontent-%COMP%]   .btn-content[_ngcontent-%COMP%] {
  gap: 8px;
}
.attendance-btn-container.mini-layout[_ngcontent-%COMP%]   .modern-clock-btn[_ngcontent-%COMP%]   .btn-content[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.attendance-btn-container.mini-layout[_ngcontent-%COMP%]   .modern-clock-btn[_ngcontent-%COMP%]   .btn-content[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
}
.modern-clock-btn[_ngcontent-%COMP%] {
  position: relative;
  min-width: 188px;
  height: 38px;
  border: none;
  border-radius: 64px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  background: #f8fafc;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
.modern-clock-btn[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.modern-clock-btn[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
}
.modern-clock-btn[_ngcontent-%COMP%]:hover::after {
  opacity: 0.05;
}
.modern-clock-btn[_ngcontent-%COMP%]:hover   .inner-pulse[_ngcontent-%COMP%] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}
.modern-clock-btn[_ngcontent-%COMP%]:active {
  transform: translateY(0) scale(0.98);
}
.modern-clock-btn[_ngcontent-%COMP%]   .btn-content[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
}
.modern-clock-btn[_ngcontent-%COMP%]   .btn-content[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
.modern-clock-btn[_ngcontent-%COMP%]   .btn-content[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
}
.modern-clock-btn.in[_ngcontent-%COMP%] {
  background: #1E73BB;
  color: #10b981;
}
.modern-clock-btn.out[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
  color: #ef4444;
}
.modern-clock-btn.remote[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #f59e0b 0%,
      #d97706 100%);
  color: #f59e0b;
}
.modern-clock-btn.wfh[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #0ea5e9 0%,
      #0284c7 100%);
  color: #0ea5e9;
  box-shadow: 0 10px 20px -5px rgba(14, 165, 233, 0.4);
}
.modern-clock-btn[_ngcontent-%COMP%]   .inner-pulse[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  padding-bottom: 150%;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%);
  transform: translate(-50%, -50%) scale(0.1);
  transition: all 0.6s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  animation: _ngcontent-%COMP%_breathing 4s ease-in-out infinite;
}
@keyframes _ngcontent-%COMP%_breathing {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.3;
  }
}
.row-center[_ngcontent-%COMP%] {
  display: flex;
  justify-content: left;
  align-items: center;
}`]});let o=n;return o})();export{Q as a,dt as b};
