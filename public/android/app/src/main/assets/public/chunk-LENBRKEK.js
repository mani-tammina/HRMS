import{a as A}from"./chunk-U5P7UGNE.js";import{a as F}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{Aa as E,Ca as w,Ga as k,H as _,R as O,W as y,X as v,u as h,wa as S}from"./chunk-B3PLR2IL.js";import{Ca as f,Eb as C,F as p,Oa as t,Wb as M,Zb as P,_ as b,ca as l,ea as u,fa as x,ra as m,sa as n,ta as e,ua as a}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as d}from"./chunk-JHI3MBHO.js";var z=(()=>{let o=class o{constructor(i,r,s,g){this.financeService=i,this.toaster=r,this.alertCtrl=s,this.loadingCtrl=g,this.isLoading=!1}ngOnInit(){}onRestoreDefaults(){return d(this,null,function*(){yield(yield this.alertCtrl.create({header:"Restore Defaults",message:"Are you sure you want to restore the payroll setup to its default settings? This operation cannot be easily undone.",cssClass:"glass-alert",buttons:[{text:"Cancel",role:"cancel"},{text:"Restore",handler:()=>this.executeRestore()}]})).present()})}onClearSetup(){return d(this,null,function*(){yield(yield this.alertCtrl.create({header:"Clear Setup",message:"Warning: You are about to clear all payroll master setup data. This will reset everything. Are you absolutely certain?",cssClass:"glass-alert danger-alert",buttons:[{text:"Cancel",role:"cancel"},{text:"Clear All",handler:()=>this.executeClear()}]})).present()})}executeRestore(){return d(this,null,function*(){let i=yield this.loadingCtrl.create({message:"Restoring defaults...",cssClass:"glass-loading"});yield i.present(),this.financeService.restoreDefaults().subscribe({next:r=>{i.dismiss(),this.toaster.showSuccess("Payroll master setup restored successfully")},error:r=>{i.dismiss(),console.error("Restore failed",r),this.toaster.showError("Failed to restore defaults")}})})}executeClear(){return d(this,null,function*(){let i=yield this.loadingCtrl.create({message:"Cleaning up setup...",cssClass:"glass-loading"});yield i.present(),this.financeService.clearSetup().subscribe({next:r=>{i.dismiss(),this.toaster.showSuccess("Payroll setup cleared successfully")},error:r=>{i.dismiss(),console.error("Clear failed",r),this.toaster.showError("Failed to clear setup")}})})}};o.\u0275fac=function(r){return new(r||o)(l(A),l(F),l(E),l(w))},o.\u0275cmp=u({type:o,selectors:[["app-financial-admin"]],standalone:!1,decls:175,vars:2,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"page-container"],[1,"header-section","fade-in"],[1,"header-top"],[1,"header-text"],[1,"header-actions"],["fill","outline",1,"action-btn","clear-btn",3,"click"],["name","trash-outline","slot","start"],[1,"action-btn","restore-btn",3,"click"],["name","checkmark-circle","slot","start"],[1,"info-banner","fade-in-up",2,"animation-delay","0.05s"],[1,"info-icon"],["name","alert-circle-outline"],[1,"info-text"],[1,"badge","badge-warning"],[1,"dashboard-grid"],[1,"management-card","fade-in-up",2,"animation-delay","0.1s"],[1,"card-accent","accent-blue"],[1,"card-body"],[1,"card-header-row"],[1,"card-icon","icon-blue"],["src","../../../../assets/fone.png","alt","finance"],[1,"status-badge","badge-green"],[1,"card-footer"],[1,"stats"],[1,"stat-label"],[1,"stat-value"],["fill","clear","routerLink","/finance/components",1,"manage-btn"],["name","arrow-forward-outline","slot","end"],[1,"management-card","fade-in-up",2,"animation-delay","0.15s"],[1,"card-accent","accent-purple"],[1,"card-icon","icon-purple"],["src","../../../../assets/ftwo.png","alt","finance"],["fill","clear","routerLink","/finance/templates",1,"manage-btn"],[1,"management-card","fade-in-up",2,"animation-delay","0.2s"],[1,"card-accent","accent-pink"],[1,"card-icon","icon-pink"],["src","../../../../assets/fthree.png","alt","finance"],[1,"status-badge","badge-orange"],["fill","clear","routerLink","/finance/structure",1,"manage-btn"],[1,"management-card","fade-in-up",2,"animation-delay","0.25s"],[1,"card-accent","accent-red"],[1,"card-icon","icon-red"],["src","../../../../assets/f4.png","alt","finance"],[1,"status-badge","badge-blue"],["fill","clear","routerLink","/finance/assignment",1,"manage-btn"],[1,"management-card","fade-in-up",2,"animation-delay","0.3s"],["src","../../../../assets/f5.png","alt","finance"],["fill","clear","routerLink","/finance/process",1,"manage-btn"],[1,"management-card","fade-in-up",2,"animation-delay","0.35s"],[1,"card-accent","accent-green"],[1,"card-icon","icon-green"],["src","../../../../assets/f6.png","alt","finance"],["fill","clear","routerLink","/finance/execution",1,"manage-btn"],[1,"management-card","fade-in-up",2,"animation-delay","0.4s"],[1,"card-accent","accent-orange"],[1,"card-icon","icon-orange"],["src","../../../../assets/f7.png","alt","finance"],["fill","clear","routerLink","/finance/tax-admin",1,"manage-btn"]],template:function(r,s){r&1&&(a(0,"ion-header",0),n(1,"ion-content",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h1"),t(7,"Payroll Master Setup"),e(),n(8,"p"),t(9,"Configure and manage global payroll components, templates, structures and statutory rules from a single command center."),e()(),n(10,"div",6)(11,"ion-button",7),f("click",function(){return s.onClearSetup()}),a(12,"ion-icon",8),t(13," Clear All Setup "),e(),n(14,"ion-button",9),f("click",function(){return s.onRestoreDefaults()}),a(15,"ion-icon",10),t(16," Set Default Payroll "),e()()()(),n(17,"div",11)(18,"div",12),a(19,"ion-icon",13),e(),n(20,"div",14)(21,"h3"),t(22," System Maintenance Notice "),n(23,"span",15),t(24,"Scheduled"),e()(),n(25,"p"),t(26,"Payroll engine maintenance scheduled for Sunday, 2:00 AM \u2013 4:00 AM IST. Generation may be temporarily unavailable."),e()()(),n(27,"div",16)(28,"div",17),a(29,"div",18),n(30,"div",19)(31,"div",20)(32,"div",21),a(33,"img",22),e(),n(34,"span",23),t(35,"Healthy"),e()(),n(36,"h3"),t(37,"Payroll Components"),e(),n(38,"p"),t(39,"Define earnings, deductions and statutory components for your organization."),e(),n(40,"div",24)(41,"div",25)(42,"span",26),t(43,"Active Components"),e(),n(44,"span",27),t(45,"24"),e()(),n(46,"ion-button",28),t(47," Configure "),a(48,"ion-icon",29),e()()()(),n(49,"div",30),a(50,"div",31),n(51,"div",19)(52,"div",20)(53,"div",32),a(54,"img",33),e(),n(55,"span",23),t(56,"Up to date"),e()(),n(57,"h3"),t(58,"Payroll Templates"),e(),n(59,"p"),t(60,"Create and manage reusable salary structure templates for different roles."),e(),n(61,"div",24)(62,"div",25)(63,"span",26),t(64,"Total Templates"),e(),n(65,"span",27),t(66,"12"),e()(),n(67,"ion-button",34),t(68," Manage "),a(69,"ion-icon",29),e()()()(),n(70,"div",35),a(71,"div",36),n(72,"div",19)(73,"div",20)(74,"div",37),a(75,"img",38),e(),n(76,"span",39),t(77,"Review needed"),e()(),n(78,"h3"),t(79,"Payroll Structure"),e(),n(80,"p"),t(81,"Map your components to templates and define hierarchy and dependencies."),e(),n(82,"div",24)(83,"div",25)(84,"span",26),t(85,"Structures Defined"),e(),n(86,"span",27),t(87,"8"),e()(),n(88,"ion-button",40),t(89," Configure "),a(90,"ion-icon",29),e()()()(),n(91,"div",41),a(92,"div",42),n(93,"div",19)(94,"div",20)(95,"div",43),a(96,"img",44),e(),n(97,"span",45),t(98,"HR / Finance"),e()(),n(99,"h3"),t(100,"Employee Salary Setup"),e(),n(101,"p"),t(102,"Map employees to salary templates and define Annual CTC with effective dates."),e(),n(103,"div",24)(104,"div",25)(105,"span",26),t(106,"Employees Mapped"),e(),n(107,"span",27),t(108,"486"),e()(),n(109,"ion-button",46),t(110," Map Salary "),a(111,"ion-icon",29),e()()()(),n(112,"div",47),a(113,"div",18),n(114,"div",19)(115,"div",20)(116,"div",21),a(117,"img",48),e(),n(118,"span",45),t(119,"Ready"),e()(),n(120,"h3"),t(121,"Payroll Generation"),e(),n(122,"p"),t(123,"Automated stepped generation using forecasting, validation and real-time processing."),e(),n(124,"div",24)(125,"div",25)(126,"span",26),t(127,"Engine Model"),e(),n(128,"span",27),t(129,"V2"),e()(),n(130,"ion-button",49),t(131," Process "),a(132,"ion-icon",29),e()()()(),n(133,"div",50),a(134,"div",51),n(135,"div",19)(136,"div",20)(137,"div",52),a(138,"img",53),e(),n(139,"span",23),t(140,"Completed"),e()(),n(141,"h3"),t(142,"Payroll Execution"),e(),n(143,"p"),t(144,"Run payroll, view history, manage defaults, LOP summary and adjustments."),e(),n(145,"div",24)(146,"div",25)(147,"span",26),t(148,"Last Run"),e(),n(149,"span",27),t(150,"Mar 2024"),e()(),n(151,"ion-button",54),t(152," Execute "),a(153,"ion-icon",29),e()()()(),n(154,"div",55),a(155,"div",56),n(156,"div",19)(157,"div",20)(158,"div",57),a(159,"img",58),e(),n(160,"span",39),t(161,"Action needed"),e()(),n(162,"h3"),t(163,"Tax Administration"),e(),n(164,"p"),t(165,"Manage statutory rules, tax slabs, limits, proofs and payouts."),e(),n(166,"div",24)(167,"div",25)(168,"span",26),t(169,"Pending Verifications"),e(),n(170,"span",27),t(171,"15"),e()(),n(172,"ion-button",59),t(173," Manage "),a(174,"ion-icon",29),e()()()()()()()),r&2&&(m("translucent",!0),b(),m("fullscreen",!0))},dependencies:[_,O,y,v,S,M],styles:[`

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
  --background: #f8fafc;
}
.header-section[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  border: 1px solid #E5E7EB;
  padding: 25px 40px;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 30px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.03em;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  margin-top: 8px;
  max-width: 600px;
  font-weight: 500;
  line-height: 1.5;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
  --border-radius: 8px;
  --padding-start: 20px;
  --padding-end: 20px;
  font-weight: 600;
  height: 42px;
  margin: 0;
  font-size: 13px;
  text-transform: none;
  letter-spacing: 0;
  --box-shadow: none;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn.restore-btn[_ngcontent-%COMP%] {
  --background: #1e73bb;
  --color: white;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn.restore-btn[_ngcontent-%COMP%]:hover {
  --background: #175191;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn.clear-btn[_ngcontent-%COMP%] {
  --background: #ffffff;
  --color: #334155;
  --border-color: #cbd5e1;
  --border-style: solid;
  --border-width: 1px;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn.clear-btn[_ngcontent-%COMP%]:hover {
  --background: #f8fafc;
  --border-color: #94a3b8;
}
.info-banner[_ngcontent-%COMP%] {
  background: #fffbeb;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #fde68a;
  margin-bottom: 40px;
  animation-duration: 0.5s;
  margin: 10px 40px;
}
.info-banner[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  background: #fef3c7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.info-banner[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #d97706;
}
.info-banner[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%] {
  flex: 1;
}
.info-banner[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.info-banner[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
}
.info-banner[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .badge.badge-warning[_ngcontent-%COMP%] {
  color: #d97706;
  background: #fef3c7;
  border: 1px solid #fde68a;
}
.info-banner[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
  font-weight: 500;
}
.dashboard-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  margin: 10px 40px;
}
.management-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.management-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
  border-color: #cbd5e1;
}
.management-card[_ngcontent-%COMP%]   .card-accent[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}
.management-card[_ngcontent-%COMP%]   .card-accent.accent-blue[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #00BCFF 0%,
      #1D80C4 100%);
}
.management-card[_ngcontent-%COMP%]   .card-accent.accent-purple[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #A684FF 0%,
      #7F22FE 100%);
}
.management-card[_ngcontent-%COMP%]   .card-accent.accent-pink[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #ED6AFF 0%,
      #C800DE 100%);
}
.management-card[_ngcontent-%COMP%]   .card-accent.accent-red[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #FF637E 0%,
      #EC003F 100%);
}
.management-card[_ngcontent-%COMP%]   .card-accent.accent-green[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #00D492 0%,
      #009966 100%);
}
.management-card[_ngcontent-%COMP%]   .card-accent.accent-orange[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #FFB900 0%,
      #E17100 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 32px 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 22px;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-blue[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #00BCFF 0%,
      #1D80C4 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-purple[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #A684FF 0%,
      #7F22FE 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-pink[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #ED6AFF 0%,
      #C800DE 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-red[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #FF637E 0%,
      #EC003F 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-green[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #00D492 0%,
      #009966 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-green[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #16a34a;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-orange[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #FFB900 0%,
      #E17100 100%);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-icon.icon-orange[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #ea580c;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
  height: 27px;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .status-badge.badge-green[_ngcontent-%COMP%] {
  color: #007A55;
  background: #ECFDF5;
  border: 1px solid #A4F4CF;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .status-badge.badge-orange[_ngcontent-%COMP%] {
  color: #ea580c;
  background: #fffbeb;
  border: 1px solid #fde68a;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .status-badge.badge-blue[_ngcontent-%COMP%] {
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 24px 0;
  font-weight: 500;
  flex: 1;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 2px;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .manage-btn[_ngcontent-%COMP%] {
  --background: #eff6ff;
  --color: #2563eb;
  --border-radius: 9999px;
  --padding-start: 16px;
  --padding-end: 16px;
  font-weight: 700;
  font-size: 13px;
  text-transform: none;
  margin: 0;
  height: 36px;
  --box-shadow: none;
  transition: all 0.2s ease;
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .manage-btn[_ngcontent-%COMP%]:hover {
  --background: #dbeafe;
  transform: translateY(-1px);
}
.management-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .manage-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  margin-left: 4px;
  font-size: 14px;
}
@media (max-width: 1024px) {
  .page-container[_ngcontent-%COMP%] {
    padding: 24px;
  }
  .dashboard-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
@media (max-width: 768px) {
  .header-top[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .header-actions[_ngcontent-%COMP%] {
    width: 100%;
  }
  .header-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
    flex: 1;
  }
}`]});let c=o;return c})();var D=[{path:"",component:z}],W=(()=>{let o=class o{};o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=x({type:o}),o.\u0275inj=p({imports:[C,h,k,P.forChild(D)]});let c=o;return c})();export{W as FinancialAdminPageModule};
