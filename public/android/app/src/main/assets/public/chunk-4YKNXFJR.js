import{Da as S,Ga as T,H as v,I as w,R as k,W as B,X as I,ra as z,ta as E}from"./chunk-B3PLR2IL.js";import{$a as x,Ca as C,Da as m,Eb as y,Oa as r,Pa as l,Qa as b,_ as i,bb as _,ca as h,ea as u,ja as p,qb as M,ra as d,rb as P,sa as n,ta as t,ua as f,yb as O}from"./chunk-27EUYVIP.js";function A(e,a){if(e&1&&(n(0,"div",16)(1,"div",17),f(2,"div",18),t(),n(3,"div",19)(4,"div",20)(5,"div",21)(6,"span",22),r(7),t(),n(8,"span",22),r(9),t()(),n(10,"p",23),r(11),t()()()()),e&2){let c=a.$implicit;i(7),l(c.hour),i(2),b("",c.hours,"h Logged"),i(2),l(c.task||"No description provided")}}function F(e,a){if(e&1&&(n(0,"div",14),p(1,A,12,3,"div",15),t()),e&2){let c=m();i(),d("ngForOf",c.data.hours_breakdown)}}function N(e,a){if(e&1&&(n(0,"div",24)(1,"div",25)(2,"div",26),f(3,"ion-icon",27),n(4,"span"),r(5,"Additional Notes"),t()(),n(6,"p",28),r(7),t()()()),e&2){let c=m();i(7),l(c.data.notes)}}function j(e,a){e&1&&(n(0,"div",29),f(1,"ion-icon",30),n(2,"p"),r(3,"No tasks logged for this day"),t()())}var X=(()=>{let a=class a{constructor(g){this.modalCtrl=g}close(){this.modalCtrl.dismiss()}};a.\u0275fac=function(s){return new(s||a)(h(S))},a.\u0275cmp=u({type:a,selectors:[["app-timesheet-preview"]],inputs:{data:"data"},decls:25,vars:12,consts:[[1,"ion-no-border"],["slot","end"],[1,"close-btn",3,"click"],["slot","icon-only","name","close-outline"],[1,"ion-no-padding"],[1,"preview-container"],[1,"header-summary","animate__animated","animate__fadeInDown"],[1,"date-info"],[1,"hours-badge"],[1,"count"],[1,"label"],["class","timeline-container",4,"ngIf"],["class","notes-container ion-padding-top animate__animated animate__fadeInUp",4,"ngIf"],["class","empty-state",4,"ngIf"],[1,"timeline-container"],["class","log-entry",4,"ngFor","ngForOf"],[1,"log-entry"],[1,"marker-col"],[1,"dot","shadow"],[1,"content-col"],[1,"task-card"],[1,"card-header"],[1,"hours-tag"],[1,"task-desc"],[1,"notes-container","ion-padding-top","animate__animated","animate__fadeInUp"],[1,"notes-card"],[1,"notes-header"],["name","document-text-outline"],[1,"notes-content"],[1,"empty-state"],["name","clipboard-outline"]],template:function(s,o){s&1&&(n(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),r(3,"Work Log Preview"),t(),n(4,"ion-buttons",1)(5,"ion-button",2),C("click",function(){return o.close()}),f(6,"ion-icon",3),t()()()(),n(7,"ion-content",4)(8,"div",5)(9,"div",6)(10,"div",7)(11,"h2"),r(12),x(13,"date"),t(),n(14,"p"),r(15),x(16,"date"),t()(),n(17,"div",8)(18,"span",9),r(19),t(),n(20,"span",10),r(21,"Total Logs"),t()()(),p(22,F,2,1,"div",11)(23,N,8,1,"div",12)(24,j,4,0,"div",13),t()()),s&2&&(i(12),l(_(13,6,o.data.date,"EEEE, MMM d")),i(3),l(_(16,9,o.data.date,"yyyy")),i(4),b("",o.data.total_hours,"h"),i(3),d("ngIf",o.data==null||o.data.hours_breakdown==null?null:o.data.hours_breakdown.length),i(),d("ngIf",o.data==null?null:o.data.notes),i(),d("ngIf",!(!(o.data==null||o.data.hours_breakdown==null)&&o.data.hours_breakdown.length)))},dependencies:[T,v,w,k,B,I,z,E,y,M,P,O],styles:[`

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
.preview-container[_ngcontent-%COMP%] {
  padding: 16px;
  background: #f4f7fb;
  min-height: 100%;
}
.header-summary[_ngcontent-%COMP%] {
  background: #0f2b4a;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  margin-bottom: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.header-summary[_ngcontent-%COMP%]   .date-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  letter-spacing: -0.05em;
}
.header-summary[_ngcontent-%COMP%]   .date-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  margin: 4px 0 0 0;
  opacity: 0.8;
  font-weight: 500;
}
.header-summary[_ngcontent-%COMP%]   .hours-badge[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.header-summary[_ngcontent-%COMP%]   .hours-badge[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {
  display: block;
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}
.header-summary[_ngcontent-%COMP%]   .hours-badge[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-top: 4px;
}
.timeline-container[_ngcontent-%COMP%] {
  position: relative;
  padding-left: 20px;
}
.timeline-container[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  left: 27px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: #f1f5f9;
}
.log-entry[_ngcontent-%COMP%] {
  display: flex;
  margin-bottom: 24px;
  position: relative;
}
.log-entry[_ngcontent-%COMP%]   .time-col[_ngcontent-%COMP%] {
  width: 80px;
  padding-top: 12px;
  text-align: right;
  padding-right: 24px;
}
.log-entry[_ngcontent-%COMP%]   .time-col[_ngcontent-%COMP%]   .time-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  white-space: nowrap;
  text-transform: uppercase;
}
.log-entry[_ngcontent-%COMP%]   .marker-col[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
  padding-top: 14px;
}
.log-entry[_ngcontent-%COMP%]   .marker-col[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #1F74BB;
  box-shadow: 0 0 0 4px #e8f0fb;
  transition: all 0.2s ease;
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%] {
  flex: 1;
  padding-left: 24px;
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%]   .task-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%]   .task-card[_ngcontent-%COMP%]:hover {
  transform: translateX(8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%]   .task-card[_ngcontent-%COMP%]:hover   .hours-tag[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: #ffffff;
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%]   .task-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%]   .task-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .hours-tag[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  background: #f8fafc;
  color: #1F74BB;
  padding: 4px 12px;
  border-radius: 9999px;
  transition: all 0.2s ease;
  border: 1px solid #f1f5f9;
  text-transform: uppercase;
}
.log-entry[_ngcontent-%COMP%]   .content-col[_ngcontent-%COMP%]   .task-card[_ngcontent-%COMP%]   .task-desc[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
}
.notes-container[_ngcontent-%COMP%] {
  margin-top: 16px;
  padding: 0 16px;
}
.notes-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px dashed #ABABAB;
}
.notes-card[_ngcontent-%COMP%]   .notes-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #475569;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.notes-card[_ngcontent-%COMP%]   .notes-header[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.notes-card[_ngcontent-%COMP%]   .notes-content[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  line-height: 1.6;
  font-style: italic;
  font-weight: 500;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 40px;
}
.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  color: #94a3b8;
  margin-bottom: 16px;
  opacity: 0.3;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  font-weight: 700;
}
ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-color: #f1f5f9;
  padding: 8px;
}
ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  color: #0f172a;
  font-weight: 700;
  letter-spacing: -0.05em;
}
.close-btn[_ngcontent-%COMP%] {
  --color: vars.$color-text-muted;
  --padding-start: 8px;
  --padding-end: 8px;
  font-size: 24px;
  transition: all 0.2s ease;
}
.close-btn[_ngcontent-%COMP%]:hover {
  --color: #dc2626;
}`]});let e=a;return e})();export{X as a};
