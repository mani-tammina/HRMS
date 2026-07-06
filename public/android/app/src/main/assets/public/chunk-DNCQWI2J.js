import{a as Mn}from"./chunk-22POD724.js";import{a as Cn}from"./chunk-AMUZ5UX4.js";import"./chunk-NDCRD3QG.js";import{Aa as yn,Ca as Pn,G as dn,Ga as hn,I as pn,R as mn,W as un,X as gn,b as Y,c as x,d as U,e as H,g as J,h as K,i as Q,j as X,m as Z,n as nn,na as fn,o as en,p as tn,q as on,r as rn,ra as _n,sa as xn,t as an,ta as vn,u as ln,v as cn,va as bn,y as sn}from"./chunk-B3PLR2IL.js";import{$a as D,Ba as P,Bb as q,Ca as f,Da as m,Eb as G,F as V,K as v,L as b,Ma as y,Oa as o,Pa as _,Qa as h,Ra as I,Ta as R,Ua as T,Va as F,Vb as $,Ya as A,Zb as W,_ as r,bb as B,ca as M,ea as j,fa as z,ja as u,qb as L,ra as s,rb as N,sa as t,ta as e,ua as d}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as O,b as w,e as C}from"./chunk-JHI3MBHO.js";var En=()=>["execute","payout","finalize"],Sn=()=>["payout","finalize"];function kn(i,c){if(i&1&&(t(0,"span",39),o(1),e()),i&2){let n=m(2);r(),h("Run ID: #",n.activeRunId)}}function In(i,c){if(i&1){let n=P();t(0,"button",40),f("click",function(){v(n);let l=m(2);return b(l.resetWorkflow())}),o(1,"Reset"),e()}}function Rn(i,c){if(i&1){let n=P();t(0,"form",41)(1,"div",42)(2,"div",43)(3,"label"),o(4,"Select Payroll Month"),e(),d(5,"input",44),e(),t(6,"div",43)(7,"label"),o(8,"Processing Mode"),e(),t(9,"div",45)(10,"span"),o(11,"Legacy"),e(),d(12,"ion-toggle",46),t(13,"span"),o(14,"Standard V2"),e()()()(),t(15,"button",47),f("click",function(){v(n);let l=m(2);return b(l.onRunPayroll())}),o(16," Start Processing "),d(17,"ion-icon",48),e()()}if(i&2){let n=m(2);s("formGroup",n.runForm),r(10),y("muted",n.runForm.value.use_v2),r(3),y("muted",!n.runForm.value.use_v2),r(2),s("disabled",n.isRunning||n.runForm.invalid)}}function Tn(i,c){i&1&&(t(0,"div",52),d(1,"ion-spinner",53),t(2,"p"),o(3,"Validating employee data, bank records, and tax regimes..."),e()())}function Fn(i,c){if(i&1&&(t(0,"li",62),d(1,"ion-icon",63),o(2),e()),i&2){let n=c.$implicit;r(2),h(" ",n)}}function An(i,c){if(i&1&&(t(0,"li",64),d(1,"ion-icon",65),o(2),e()),i&2){let n=c.$implicit;r(2),h(" ",n)}}function Vn(i,c){if(i&1&&(t(0,"div",66)(1,"div",67),o(2),e(),t(3,"div",67),o(4),e()()),i&2){let n=m(4);r(2),h("Bank A/Cs: ",n.validationResult.missing_bank_accounts),r(2),h("Tax Regimes: ",n.validationResult.missing_tax_regimes)}}function jn(i,c){if(i&1){let n=P();t(0,"button",68),f("click",function(){v(n);let l=m(4);return b(l.resetWorkflow())}),o(1,"Fix Errors"),e()}}function zn(i,c){if(i&1&&(t(0,"div",54)(1,"div",55),d(2,"ion-icon",56),t(3,"span"),o(4),e()(),t(5,"ul",57),u(6,Fn,3,1,"li",58)(7,An,3,1,"li",59),e(),u(8,Vn,5,2,"div",60)(9,jn,2,0,"button",61),e()),i&2){let n=m(3);r(),y("danger",!n.validationResult.can_proceed),r(),s("name",n.validationResult.can_proceed?"checkmark-circle":"close-circle"),r(2),_(n.validationResult.can_proceed?"Validation Successful":"Validation Failed"),r(2),s("ngForOf",n.validationResult.errors),r(),s("ngForOf",n.validationResult.warnings),r(),s("ngIf",n.validationResult.can_proceed),r(),s("ngIf",!n.validationResult.can_proceed)}}function Dn(i,c){if(i&1&&(t(0,"div",49),u(1,Tn,4,0,"div",50)(2,zn,10,8,"div",51),e()),i&2){let n=m(2);r(),s("ngIf",n.isValidating),r(),s("ngIf",!n.isValidating&&n.validationResult)}}function Bn(i,c){i&1&&(t(0,"div",52),d(1,"ion-spinner",70),t(2,"p"),o(3,"Generating payroll preview (Dry Run)..."),e()())}function Ln(i,c){if(i&1){let n=P();t(0,"div",71)(1,"div",72)(2,"div",73)(3,"span"),o(4,"Employees"),e(),t(5,"strong"),o(6),e()(),t(7,"div",73)(8,"span"),o(9,"Gross Sum"),e(),t(10,"strong"),o(11),e()(),t(12,"div",73)(13,"span"),o(14,"Tax Sum"),e(),t(15,"strong"),o(16),e()(),t(17,"div",74)(18,"span"),o(19,"Net Payout"),e(),t(20,"strong"),o(21),e()()(),t(22,"div",75)(23,"button",76),f("click",function(){v(n);let l=m(3);return b(l.resetWorkflow())}),o(24,"Cancel"),e(),t(25,"button",77),f("click",function(){v(n);let l=m(3);return b(l.executeV2Run())}),d(26,"ion-icon",15),o(27," Confirm & Execute "),e()()()}if(i&2){let n=m(3);r(6),_(n.previewData.total_employees),r(5),_(n.formatCurrency(n.previewData.gross_sum)),r(5),_(n.formatCurrency(n.previewData.tax_sum)),r(5),_(n.formatCurrency(n.previewData.net_sum))}}function Nn(i,c){if(i&1&&(t(0,"div",49),u(1,Bn,4,0,"div",50)(2,Ln,28,4,"div",69),e()),i&2){let n=m(2);r(),s("ngIf",n.isPreviewing),r(),s("ngIf",!n.isPreviewing&&n.previewData)}}function qn(i,c){i&1&&d(0,"ion-spinner",53)}function Gn(i,c){i&1&&d(0,"ion-icon",85)}function $n(i,c){if(i&1){let n=P();t(0,"div",49)(1,"div",78),d(2,"ion-icon",79),t(3,"h3"),o(4,"Payroll Run Completed!"),e(),t(5,"p"),o(6,"Run ID: "),t(7,"strong"),o(8),e(),o(9," has been calculated. Ready for bank transfer."),e()(),t(10,"div",80)(11,"div",81)(12,"span"),o(13,"Total Net Payout:"),e(),t(14,"strong"),o(15),e()(),t(16,"div",81)(17,"span"),o(18,"Employees:"),e(),t(19,"strong"),o(20),e()()(),t(21,"button",82),f("click",function(){v(n);let l=m(2);return b(l.initiatePayout())}),u(22,qn,1,0,"ion-spinner",83)(23,Gn,1,0,"ion-icon",84),o(24),e()()}if(i&2){let n=m(2);r(8),h("#",n.activeRunId),r(7),_(n.formatCurrency(n.lastRunResult.total_net)),r(5),_(n.lastRunResult.processed_employees),r(),s("disabled",n.isInitiatingPayout),r(),s("ngIf",n.isInitiatingPayout),r(),s("ngIf",!n.isInitiatingPayout),r(),h(" ",n.isInitiatingPayout?"Initiating Transfers...":"Initiate Bank Payout"," ")}}function Wn(i,c){i&1&&d(0,"ion-spinner",53)}function Yn(i,c){if(i&1){let n=P();t(0,"div",49)(1,"div",86),d(2,"ion-icon",87),t(3,"h3"),o(4,"Finalize & Notify"),e(),t(5,"p"),o(6,"Payout instructions sent. Release payslips to employees?"),e(),t(7,"button",88),f("click",function(){v(n);let l=m(2);return b(l.finalizeRun())}),u(8,Wn,1,0,"ion-spinner",83),o(9," Release Payslips & Notify "),e()()()}if(i&2){let n=m(2);r(7),s("disabled",n.isNotifying),r(),s("ngIf",n.isNotifying)}}function Un(i,c){i&1&&d(0,"ion-spinner",89)}function Hn(i,c){i&1&&d(0,"ion-icon",90)}function Jn(i,c){if(i&1&&(t(0,"tr")(1,"td"),o(2),e(),t(3,"td"),o(4),e(),t(5,"td",94),o(6),e(),t(7,"td",94),o(8),e()()),i&2){let n=c.$implicit;r(2),_(n.FullName),r(2),_(n.EmployeeNumber),r(2),_(n.lop_days),r(2),_(n.unpaid_days)}}function Kn(i,c){if(i&1&&(t(0,"div",91)(1,"table",92)(2,"thead")(3,"tr")(4,"th"),o(5,"Employee"),e(),t(6,"th"),o(7,"Emp No."),e(),t(8,"th"),o(9,"LOP Days"),e(),t(10,"th"),o(11,"Unpaid Days"),e()()(),t(12,"tbody"),u(13,Jn,9,4,"tr",93),e()()()),i&2){let n=m(2);r(13),s("ngForOf",n.lopSummary)}}function Qn(i,c){i&1&&(t(0,"p",95),o(1,"No LOP records loaded. Select a month and click Fetch."),e())}function Xn(i,c){i&1&&d(0,"ion-spinner",89)}function Zn(i,c){i&1&&d(0,"ion-icon",90)}function ne(i,c){if(i&1&&(t(0,"p",103),d(1,"ion-icon",104),o(2),e()),i&2){let n=m(3);r(2),h(" Detailed reconciliation for ",n.reconciliation.details.length," employees available in run details. ")}}function ee(i,c){if(i&1&&(t(0,"div",96)(1,"div",97)(2,"div",98)(3,"div",99),o(4,"Calculated"),e(),t(5,"div",100),o(6),e()(),t(7,"div",98)(8,"div",99),o(9,"Adjustments"),e(),t(10,"div",100),o(11),e()(),t(12,"div",101)(13,"div",99),o(14,"Final Payout"),e(),t(15,"div",100),o(16),e()(),t(17,"div",98)(18,"div",99),o(19,"Employees"),e(),t(20,"div",100),o(21),e()()(),u(22,ne,3,1,"p",102),e()),i&2){let n=m(2);r(6),_(n.formatCurrency(n.reconciliation.summary.total_calculated)),r(4),y("negative",n.reconciliation.summary.total_adjustments<0),r(),I(" ",n.reconciliation.summary.total_adjustments>0?"+":"","",n.formatCurrency(n.reconciliation.summary.total_adjustments)," "),r(5),_(n.formatCurrency(n.reconciliation.summary.total_final)),r(5),_(n.reconciliation.summary.employee_count),r(),s("ngIf",n.reconciliation.details==null?null:n.reconciliation.details.length)}}function te(i,c){i&1&&(t(0,"p",95),o(1,"Select a month and click Fetch to load reconciliation data."),e())}function ie(i,c){if(i&1){let n=P();t(0,"div",11)(1,"div",12)(2,"div",13)(3,"div",14),d(4,"ion-icon",15),e(),t(5,"div")(6,"h2"),o(7,"Payroll Suite "),t(8,"span",16),o(9,"V2"),e()(),t(10,"p"),o(11,"Stepped execution for 100% accuracy "),u(12,kn,2,1,"span",17),e()(),u(13,In,2,0,"button",18),e(),t(14,"div",19)(15,"div",20),o(16,"1"),e(),d(17,"div",21),t(18,"div",20),o(19,"2"),e(),d(20,"div",21),t(21,"div",20),o(22,"3"),e(),d(23,"div",21),t(24,"div",20),o(25,"4"),e()(),u(26,Rn,18,6,"form",22)(27,Dn,3,2,"div",23)(28,Nn,3,2,"div",23)(29,$n,25,7,"div",23)(30,Yn,10,2,"div",23),e(),t(31,"div",24)(32,"div",13)(33,"div",25),d(34,"ion-icon",26),e(),t(35,"div")(36,"h2"),o(37,"LOP Summary"),e(),t(38,"p"),o(39,"Loss of Pay records for a month"),e()()(),t(40,"div",27)(41,"input",28),F("ngModelChange",function(l){v(n);let p=m();return T(p.lopMonth,l)||(p.lopMonth=l),b(l)}),e(),t(42,"button",29),f("click",function(){v(n);let l=m();return b(l.loadLOPSummary())}),u(43,Un,1,0,"ion-spinner",30)(44,Hn,1,0,"ion-icon",31),o(45," Fetch "),e()(),u(46,Kn,14,1,"div",32)(47,Qn,2,0,"p",33),e(),t(48,"div",24)(49,"div",13)(50,"div",34),d(51,"ion-icon",35),e(),t(52,"div")(53,"h2"),o(54,"Reconciliation Report"),e(),t(55,"p"),o(56,"Calculated vs. paid comparison"),e()()(),t(57,"div",27)(58,"input",36),F("ngModelChange",function(l){v(n);let p=m();return T(p.reconcileMonth,l)||(p.reconcileMonth=l),b(l)}),e(),t(59,"button",37),f("click",function(){v(n);let l=m();return b(l.loadReconciliation())}),u(60,Xn,1,0,"ion-spinner",30)(61,Zn,1,0,"ion-icon",31),o(62," Fetch "),e()(),u(63,ee,23,8,"div",38)(64,te,2,0,"p",33),e()()}if(i&2){let n=m();r(12),s("ngIf",n.activeRunId),r(),s("ngIf",n.currentStep!=="setup"),r(2),y("active",n.currentStep==="validate")("completed",n.currentStep!=="setup"&&n.currentStep!=="validate"),r(3),y("active",n.currentStep==="preview")("completed",A(33,En).includes(n.currentStep)),r(3),y("active",n.currentStep==="execute")("completed",A(34,Sn).includes(n.currentStep)),r(3),y("active",n.currentStep==="payout")("completed",n.currentStep==="finalize"),r(2),s("ngIf",n.currentStep==="setup"),r(),s("ngIf",n.currentStep==="validate"),r(),s("ngIf",n.currentStep==="preview"),r(),s("ngIf",n.currentStep==="payout"),r(),s("ngIf",n.currentStep==="finalize"),r(11),R("ngModel",n.lopMonth),r(2),s("ngIf",n.isLoadingLOP),r(),s("ngIf",!n.isLoadingLOP),r(2),s("ngIf",n.lopSummary.length>0),r(),s("ngIf",!n.isLoadingLOP&&n.lopSummary.length===0),r(11),R("ngModel",n.reconcileMonth),r(2),s("ngIf",n.isLoadingRecon),r(),s("ngIf",!n.isLoadingRecon),r(2),s("ngIf",n.reconciliation),r(),s("ngIf",!n.isLoadingRecon&&!n.reconciliation)}}function oe(i,c){i&1&&(t(0,"div",110),d(1,"ion-spinner",53),e())}function re(i,c){i&1&&(t(0,"div",95),o(1," No payroll runs found. "),e())}function ae(i,c){if(i&1){let n=P();t(0,"div",113)(1,"div",114)(2,"span",115),o(3),D(4,"number"),e(),t(5,"ion-badge",116),o(6),e()(),t(7,"div",117)(8,"div",118)(9,"span"),o(10,"Run ID"),e(),t(11,"strong"),o(12),e()(),t(13,"div",118)(14,"span"),o(15,"Employees"),e(),t(16,"strong"),o(17),e()(),t(18,"div",118)(19,"span"),o(20,"Total Payout"),e(),t(21,"strong"),o(22),e()()(),t(23,"div",119)(24,"button",120),f("click",function(){let l=v(n).$implicit,p=m(3);return b(p.viewRunDetails(l.id))}),d(25,"ion-icon",121),e(),t(26,"button",122),f("click",function(){let l=v(n).$implicit,p=m(3);return b(p.lockRun(l.id))}),d(27,"ion-icon",123),e()()()}if(i&2){let n=c.$implicit,a=m(3);r(3),I("",n.year,"-",B(4,7,n.month,"2.0")),r(2),s("color",a.getStatusColor(n.status)),r(),_(n.status),r(6),h("#",n.id),r(5),_(n.slip_count??"\u2014"),r(5),_(a.formatCurrency(n.total_payout))}}function le(i,c){if(i&1&&(t(0,"div",111),u(1,ae,28,10,"div",112),e()),i&2){let n=m(2);r(),s("ngForOf",n.payrollRuns)}}function ce(i,c){if(i&1){let n=P();t(0,"div",11)(1,"div",24)(2,"div",13)(3,"div",105),d(4,"ion-icon",6),e(),t(5,"div")(6,"h2"),o(7,"Payroll Run History"),e(),t(8,"p"),o(9,"All past payroll runs and their statuses"),e()(),t(10,"button",106),f("click",function(){v(n);let l=m();return b(l.loadPayrollRuns())}),d(11,"ion-icon",107),e()(),u(12,oe,2,0,"div",108)(13,re,2,0,"div",33)(14,le,2,1,"div",109),e()()}if(i&2){let n=m();r(12),s("ngIf",n.isLoadingRuns),r(),s("ngIf",!n.isLoadingRuns&&n.payrollRuns.length===0),r(),s("ngIf",!n.isLoadingRuns&&n.payrollRuns.length>0)}}function se(i,c){i&1&&(t(0,"div",110),d(1,"ion-spinner",53),e())}function de(i,c){i&1&&d(0,"ion-spinner",53)}function pe(i,c){i&1&&d(0,"ion-icon",133)}function me(i,c){if(i&1){let n=P();t(0,"form",125)(1,"div",126)(2,"div",43)(3,"label"),o(4,"PF Percentage (%)"),e(),d(5,"input",127),e(),t(6,"div",43)(7,"label"),o(8,"ESI Percentage (%)"),e(),d(9,"input",128),e(),t(10,"div",43)(11,"label"),o(12,"Professional Tax (\u20B9/month)"),e(),d(13,"input",129),e(),t(14,"div",43)(15,"label"),o(16,"Variable Pay Percentage (%)"),e(),d(17,"input",130),e()(),t(18,"button",131),f("click",function(){v(n);let l=m(2);return b(l.saveDefaults())}),u(19,de,1,0,"ion-spinner",83)(20,pe,1,0,"ion-icon",132),o(21),e()()}if(i&2){let n=m(2);s("formGroup",n.defaultsForm),r(18),s("disabled",n.isSavingDefaults||n.defaultsForm.invalid),r(),s("ngIf",n.isSavingDefaults),r(),s("ngIf",!n.isSavingDefaults),r(),h(" ",n.isSavingDefaults?"Saving...":"Save Defaults"," ")}}function ue(i,c){if(i&1&&(t(0,"div",11)(1,"div",24)(2,"div",13)(3,"div",105),d(4,"ion-icon",7),e(),t(5,"div")(6,"h2"),o(7,"Payroll Defaults"),e(),t(8,"p"),o(9,"Configure PF %, ESI %, Professional Tax, Variable Pay %"),e()()(),u(10,se,2,0,"div",108)(11,me,22,5,"form",124),e()()),i&2){let n=m();r(10),s("ngIf",n.isLoadingDefaults),r(),s("ngIf",!n.isLoadingDefaults)}}function ge(i,c){if(i&1&&(t(0,"option",146),o(1),e()),i&2){let n=c.$implicit;s("value",n),r(),_(n)}}function fe(i,c){if(i&1){let n=P();t(0,"div",147),f("click",function(){let l=v(n).$implicit,p=m(2);return b(p.adjustmentForm.patchValue({adjustment_type:l}))}),o(1),e()}if(i&2){let n=c.$implicit,a=m(2);y("active",a.adjustmentForm.value.adjustment_type===n),r(),_(n)}}function _e(i,c){i&1&&d(0,"ion-spinner",53)}function xe(i,c){i&1&&d(0,"ion-icon",148)}function ve(i,c){if(i&1){let n=P();t(0,"div",11)(1,"div",24)(2,"div",13)(3,"div",134),d(4,"ion-icon",8),e(),t(5,"div")(6,"h2"),o(7,"Ad-hoc Payroll Adjustment"),e(),t(8,"p"),o(9,"Add a one-time bonus, deduction, arrear, or reimbursement"),e()()(),t(10,"form",135)(11,"div",126)(12,"div",43)(13,"label"),o(14,"Employee ID"),e(),d(15,"input",136),e(),t(16,"div",43)(17,"label"),o(18,"Payroll Month"),e(),d(19,"input",137),e(),t(20,"div",43)(21,"label"),o(22,"Adjustment Type"),e(),t(23,"select",138),u(24,ge,2,2,"option",139),e()(),t(25,"div",43)(26,"label"),o(27,"Amount (\u20B9)"),e(),d(28,"input",140),e()(),t(29,"div",43)(30,"label"),o(31,"Reason"),e(),d(32,"textarea",141),e(),t(33,"div",142),u(34,fe,2,3,"div",143),e(),t(35,"button",144),f("click",function(){v(n);let l=m();return b(l.saveAdjustment())}),u(36,_e,1,0,"ion-spinner",83)(37,xe,1,0,"ion-icon",145),o(38),e()()()()}if(i&2){let n=m();r(10),s("formGroup",n.adjustmentForm),r(14),s("ngForOf",n.adjustmentTypes),r(10),s("ngForOf",n.adjustmentTypes),r(),s("disabled",n.isSavingAdjustment||n.adjustmentForm.invalid),r(),s("ngIf",n.isSavingAdjustment),r(),s("ngIf",!n.isSavingAdjustment),r(),h(" ",n.isSavingAdjustment?"Saving...":"Save Adjustment"," ")}}var On=(()=>{let c=class c{constructor(a,l,p,g,E,S){this.fb=a,this.router=l,this.payrollApi=p,this.toaster=g,this.alertCtrl=E,this.loadingCtrl=S,this.activeTab="run",this.isRunning=!1,this.lastRunResult=null,this.payrollRuns=[],this.v2Runs=[],this.isLoadingRuns=!1,this.defaultsId=null,this.isLoadingDefaults=!1,this.isSavingDefaults=!1,this.isSavingAdjustment=!1,this.adjustmentTypes=["BONUS","DEDUCTION","ARREAR","ADVANCE_RECOVERY","REIMBURSEMENT"],this.lopSummary=[],this.lopMonth="",this.isLoadingLOP=!1,this.reconciliation=null,this.reconcileMonth="",this.isLoadingRecon=!1,this.currentStep="setup",this.validationResult=null,this.previewData=null,this.activeRunId=null,this.isValidating=!1,this.isPreviewing=!1,this.isInitiatingPayout=!1,this.isNotifying=!1,this.currentMonthStr=this.payrollApi.getCurrentYearMonth()}ngOnInit(){this.initForms(),this.loadPayrollDefaults(),this.loadPayrollRuns()}initForms(){let a=new Date;this.runForm=this.fb.group({payroll_month:[this.currentMonthStr,x.required],notes:[""],use_v2:[!0]}),this.defaultsForm=this.fb.group({pf_percent:[12,[x.required,x.min(0),x.max(100)]],esi_percent:[.75,[x.required,x.min(0),x.max(100)]],professional_tax:[200,[x.required,x.min(0)]],variable_pay_percent:[10,[x.required,x.min(0),x.max(100)]]}),this.adjustmentForm=this.fb.group({employee_id:[null,[x.required,x.min(1)]],payroll_month:[this.currentMonthStr,x.required],adjustment_type:["BONUS",x.required],amount:[0,[x.required,x.min(1)]],reason:["",x.required]}),this.lopMonth=this.currentMonthStr,this.reconcileMonth=this.currentMonthStr}setTab(a){this.activeTab=a,a==="history"&&this.loadPayrollRuns(),a==="defaults"&&this.loadPayrollDefaults()}loadPayrollDefaults(){this.isLoadingDefaults=!0,this.payrollApi.getPayrollDefaults().subscribe({next:a=>{this.defaultsId=a.id||null,this.defaultsForm.patchValue({pf_percent:parseFloat(a.pf_percent)||12,esi_percent:parseFloat(a.esi_percent)||.75,professional_tax:parseFloat(a.professional_tax)||200,variable_pay_percent:parseFloat(a.variable_pay_percent)||10}),this.isLoadingDefaults=!1},error:()=>{this.isLoadingDefaults=!1}})}saveDefaults(){if(this.defaultsForm.invalid)return;this.isSavingDefaults=!0;let a=this.defaultsForm.value;(this.defaultsId?this.payrollApi.updatePayrollDefaults(this.defaultsId,a):this.payrollApi.createPayrollDefaults(a)).subscribe({next:p=>{p?.id&&(this.defaultsId=p.id),this.toaster.showSuccess("Payroll defaults saved successfully"),this.isSavingDefaults=!1},error:()=>{this.toaster.showError("Failed to save payroll defaults"),this.isSavingDefaults=!1}})}onRunPayroll(){return C(this,null,function*(){if(this.runForm.invalid)return;let{payroll_month:a,notes:l,use_v2:p}=this.runForm.value;yield(yield this.alertCtrl.create({header:"Confirm Payroll Run",message:`Are you sure you want to run payroll for <strong>${a}</strong>? This will process all employee salaries.`,buttons:[{text:"Cancel",role:"cancel"},{text:"Run Payroll",handler:()=>this.executePayrollRun(a,l,p)}]})).present()})}executePayrollRun(a,l,p){return C(this,null,function*(){let g=yield this.loadingCtrl.create({message:"Running payroll..."});yield g.present(),this.isRunning=!0,this.lastRunResult=null;let[E,S]=a.split("-").map(Number);p?(this.currentStep="validate",this.validaPayrollStep(a)):this.payrollApi.generatePayroll({month:S,year:E}).subscribe({next:k=>{this.lastRunResult=w(O({},k),{type:"legacy"}),g.dismiss(),this.isRunning=!1,this.toaster.showSuccess(`Payroll generated. Run ID: ${k.run_id}, ${k.processed} employees processed.`),this.loadPayrollRuns()},error:()=>{g.dismiss(),this.isRunning=!1,this.toaster.showError("Failed to run payroll")}})})}validaPayrollStep(a){return C(this,null,function*(){this.isValidating=!0,this.payrollApi.validatePayroll(a).subscribe({next:l=>{this.validationResult=l,this.isValidating=!1,l.runId&&(this.activeRunId=l.runId),l.valid?(this.currentStep="preview",this.previewPayrollStep(a)):this.toaster.showError("Validation failed. Please fix errors before proceeding.")},error:()=>{this.isValidating=!1,this.currentStep="setup",this.toaster.showError("Validation API failed")}})})}previewPayrollStep(a){return C(this,null,function*(){this.isPreviewing=!0;let[l,p]=a.split("-").map(Number);this.payrollApi.previewPayroll({year:l,month:p}).subscribe({next:g=>{this.previewData=g,g.validation?.runId&&(this.activeRunId=g.validation.runId),this.isPreviewing=!1},error:()=>{this.isPreviewing=!1,this.toaster.showError("Preview failed")}})})}executeV2Run(){return C(this,null,function*(){let{payroll_month:a}=this.runForm.value,[l,p]=a.split("-").map(Number);this.isRunning=!0,this.payrollApi.runV2Payroll({year:l,month:p}).subscribe({next:g=>{this.activeRunId=g.data?.runId??null,this.lastRunResult=g,this.isRunning=!1,this.currentStep="payout",this.toaster.showSuccess("Payroll executed successfully. Ready for Payout.")},error:()=>{this.isRunning=!1,this.toaster.showError("Execution failed")}})})}initiatePayout(){return C(this,null,function*(){this.activeRunId&&(this.isInitiatingPayout=!0,this.payrollApi.initiatePayouts({run_id:this.activeRunId,payout_date:new Date().toISOString().split("T")[0],payment_mode:"BANK_TRANSFER"}).subscribe({next:()=>{this.isInitiatingPayout=!1,this.currentStep="finalize",this.toaster.showSuccess("Payout initiated successfully")},error:()=>{this.isInitiatingPayout=!1,this.toaster.showError("Payout initiation failed")}}))})}finalizeRun(){return C(this,null,function*(){this.activeRunId&&(this.isNotifying=!0,this.payrollApi.notifyEmployees(this.activeRunId).subscribe({next:()=>{this.isNotifying=!1,this.resetWorkflow(),this.toaster.showSuccess("Employees notified and payslips released."),this.loadPayrollRuns()},error:()=>{this.isNotifying=!1,this.toaster.showError("Finalization failed")}}))})}resetWorkflow(){this.currentStep="setup",this.validationResult=null,this.previewData=null,this.activeRunId=null,this.lastRunResult=null}tryAdvancedRun(a,l,p){this.payrollApi.calculateAndRunPayroll({payroll_month:a,notes:l}).subscribe({next:g=>{this.lastRunResult=w(O({},g),{type:"advanced"}),p.dismiss(),this.isRunning=!1,this.toaster.showSuccess(`Payroll calculated. ${g.processed_employees} employees processed.`),this.loadPayrollRuns()},error:()=>{p.dismiss(),this.isRunning=!1,this.toaster.showError("Failed to run payroll")}})}loadPayrollRuns(){this.isLoadingRuns=!0,this.payrollApi.getPayrollRuns().subscribe({next:a=>{this.payrollRuns=Array.isArray(a)?a:[],this.isLoadingRuns=!1},error:()=>{this.isLoadingRuns=!1}})}lockRun(a){return C(this,null,function*(){yield(yield this.alertCtrl.create({header:"Lock Payroll Run",message:"Locking this run prevents any further changes. Continue?",buttons:[{text:"Cancel",role:"cancel"},{text:"Lock",handler:()=>{this.payrollApi.lockPayrollRun(a).subscribe({next:()=>{this.toaster.showSuccess("Payroll run locked"),this.loadPayrollRuns()},error:()=>this.toaster.showError("Failed to lock run")})}}]})).present()})}viewRunDetails(a){this.payrollApi.getPayrollRunDetails(a).subscribe({next:l=>C(this,null,function*(){yield(yield this.alertCtrl.create({header:`Run #${a} Details`,message:`<pre style="text-align:left;font-size:12px">${JSON.stringify(l,null,2)}</pre>`,buttons:["Close"]})).present()}),error:()=>this.toaster.showError("Could not load run details")})}loadLOPSummary(){this.lopMonth&&(this.isLoadingLOP=!0,this.payrollApi.getLOPSummary(this.lopMonth).subscribe({next:a=>{this.lopSummary=a.lop_records||[],this.isLoadingLOP=!1},error:()=>{this.isLoadingLOP=!1,this.toaster.showError("Could not load LOP summary")}}))}loadReconciliation(){this.reconcileMonth&&(this.isLoadingRecon=!0,this.payrollApi.getReconciliationReport(this.reconcileMonth).subscribe({next:a=>{this.reconciliation=a,this.isLoadingRecon=!1},error:()=>{this.isLoadingRecon=!1,this.toaster.showError("Could not load reconciliation data")}}))}saveAdjustment(){if(this.adjustmentForm.invalid)return;this.isSavingAdjustment=!0;let a=w(O({},this.adjustmentForm.value),{employee_id:Number(this.adjustmentForm.value.employee_id)});this.payrollApi.createPayrollAdjustment(a).subscribe({next:l=>{this.toaster.showSuccess(`Adjustment created (ID: ${l.adjustment_id})`),this.adjustmentForm.patchValue({amount:0,reason:"",employee_id:null}),this.isSavingAdjustment=!1},error:()=>{this.toaster.showError("Failed to save adjustment"),this.isSavingAdjustment=!1}})}formatCurrency(a){return"\u20B9"+(a||0).toLocaleString("en-IN",{maximumFractionDigits:0})}getStatusColor(a){let l=(a||"").toLowerCase();return l==="completed"?"success":l==="processing"?"warning":l==="failed"?"danger":"medium"}goBack(){this.router.navigate(["/finance/admin"])}};c.\u0275fac=function(l){return new(l||c)(M(an),M($),M(Mn),M(Cn),M(yn),M(Pn))},c.\u0275cmp=j({type:c,selectors:[["app-payroll-execution"]],standalone:!1,decls:24,vars:12,consts:[[1,"payroll-exec-header"],["slot","start"],["defaultHref","/finance/admin",3,"click"],[1,"exec-tabs"],[1,"exec-tab",3,"click"],["name","play-circle-outline"],["name","time-outline"],["name","settings-outline"],["name","add-circle-outline"],[1,"payroll-exec-content"],["class","tab-panel",4,"ngIf"],[1,"tab-panel"],[1,"glass-card","run-card"],[1,"card-header"],[1,"card-icon","run-icon"],["name","flash-outline"],[1,"v2-tag"],["class","run-id-pill",4,"ngIf"],["class","text-btn",3,"click",4,"ngIf"],[1,"step-indicator"],[1,"step"],[1,"step-line"],["class","run-form animate-in",3,"formGroup",4,"ngIf"],["class","step-content animate-in",4,"ngIf"],[1,"glass-card"],[1,"card-icon","warning-icon"],["name","alert-circle-outline"],[1,"inline-search-row"],["type","month","id","lop-month-input",1,"glass-input",3,"ngModelChange","ngModel"],["id","lop-fetch-btn",1,"fetch-btn",3,"click"],["name","crescent","class","btn-spinner",4,"ngIf"],["name","search-outline",4,"ngIf"],["class","mini-table-wrap",4,"ngIf"],["class","empty-msg",4,"ngIf"],[1,"card-icon","info-icon"],["name","document-text-outline"],["type","month","id","recon-month-input",1,"glass-input",3,"ngModelChange","ngModel"],["id","recon-fetch-btn",1,"fetch-btn",3,"click"],["class","recon-summary",4,"ngIf"],[1,"run-id-pill"],[1,"text-btn",3,"click"],[1,"run-form","animate-in",3,"formGroup"],[1,"form-row"],[1,"form-group"],["type","month","formControlName","payroll_month","id","payroll-month-input",1,"glass-input"],[1,"toggle-row"],["formControlName","use_v2","color","primary"],["id","run-payroll-btn",1,"run-btn","primary",3,"click","disabled"],["name","arrow-forward-outline"],[1,"step-content","animate-in"],["class","loading-state",4,"ngIf"],["class","validation-report",4,"ngIf"],[1,"loading-state"],["name","crescent"],[1,"validation-report"],[1,"report-summary"],[3,"name"],[1,"error-list"],["class","err",4,"ngFor","ngForOf"],["class","warn",4,"ngFor","ngForOf"],["class","missing-stats",4,"ngIf"],["class","run-btn secondary",3,"click",4,"ngIf"],[1,"err"],["name","close-outline"],[1,"warn"],["name","alert-outline"],[1,"missing-stats"],[1,"stat-pill"],[1,"run-btn","secondary",3,"click"],["class","preview-report",4,"ngIf"],["name","lines"],[1,"preview-report"],[1,"preview-grid"],[1,"p-item"],[1,"p-item","highlight"],[1,"action-footer"],[1,"run-btn","ghost",3,"click"],[1,"run-btn","primary",3,"click"],[1,"success-check"],["name","checkmark-done-circle","color","success"],[1,"payout-box","glass-sub-card"],[1,"p-row"],[1,"run-btn","payout",3,"click","disabled"],["name","crescent",4,"ngIf"],["name","card-outline",4,"ngIf"],["name","card-outline"],[1,"finalize-state"],["name","notifications-outline"],[1,"run-btn","success",3,"click","disabled"],["name","crescent",1,"btn-spinner"],["name","search-outline"],[1,"mini-table-wrap"],[1,"mini-table"],[4,"ngFor","ngForOf"],[1,"lop-days"],[1,"empty-msg"],[1,"recon-summary"],[1,"recon-grid"],[1,"recon-card","glass-sub-card"],[1,"recon-label"],[1,"recon-value"],[1,"recon-card","glass-sub-card","final"],["class","recon-note",4,"ngIf"],[1,"recon-note"],["name","information-circle-outline"],[1,"card-icon"],["id","refresh-runs-btn",1,"refresh-btn",3,"click"],["name","refresh-outline"],["class","center-loader",4,"ngIf"],["class","runs-grid",4,"ngIf"],[1,"center-loader"],[1,"runs-grid"],["class","run-item glass-sub-card",4,"ngFor","ngForOf"],[1,"run-item","glass-sub-card"],[1,"run-meta"],[1,"run-period"],[3,"color"],[1,"run-stats"],[1,"stat"],[1,"run-actions"],["title","View Details",1,"icon-btn",3,"click"],["name","eye-outline"],["title","Lock Run",1,"icon-btn","danger",3,"click"],["name","lock-closed-outline"],["class","defaults-form",3,"formGroup",4,"ngIf"],[1,"defaults-form",3,"formGroup"],[1,"form-grid-2"],["type","number","formControlName","pf_percent","id","pf-percent-input","step","0.01","min","0","max","100",1,"glass-input"],["type","number","formControlName","esi_percent","id","esi-percent-input","step","0.01","min","0","max","100",1,"glass-input"],["type","number","formControlName","professional_tax","id","professional-tax-input","min","0",1,"glass-input"],["type","number","formControlName","variable_pay_percent","id","variable-pay-input","step","0.01","min","0","max","100",1,"glass-input"],["id","save-defaults-btn",1,"save-btn",3,"click","disabled"],["name","save-outline",4,"ngIf"],["name","save-outline"],[1,"card-icon","success-icon"],[1,"adjustment-form",3,"formGroup"],["type","number","formControlName","employee_id","id","adj-employee-id","placeholder","e.g. 5",1,"glass-input"],["type","month","formControlName","payroll_month","id","adj-payroll-month",1,"glass-input"],["formControlName","adjustment_type","id","adj-type-select",1,"glass-input"],[3,"value",4,"ngFor","ngForOf"],["type","number","formControlName","amount","id","adj-amount","min","1",1,"glass-input"],["formControlName","reason","rows","2","id","adj-reason","placeholder","e.g. Performance award Q4",1,"glass-input"],[1,"adjustment-info"],["class","info-chip",3,"active","click",4,"ngFor","ngForOf"],["id","save-adjustment-btn",1,"save-btn",3,"click","disabled"],["name","checkmark-circle-outline",4,"ngIf"],[3,"value"],[1,"info-chip",3,"click"],["name","checkmark-circle-outline"]],template:function(l,p){l&1&&(t(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-back-button",2),f("click",function(){return p.goBack()}),e()(),t(4,"ion-title"),o(5,"Payroll Execution"),e()(),t(6,"div",3)(7,"button",4),f("click",function(){return p.setTab("run")}),d(8,"ion-icon",5),o(9," Run Payroll "),e(),t(10,"button",4),f("click",function(){return p.setTab("history")}),d(11,"ion-icon",6),o(12," History "),e(),t(13,"button",4),f("click",function(){return p.setTab("defaults")}),d(14,"ion-icon",7),o(15," Defaults "),e(),t(16,"button",4),f("click",function(){return p.setTab("adjustments")}),d(17,"ion-icon",8),o(18," Adjustments "),e()()(),t(19,"ion-content",9),u(20,ie,65,35,"div",10)(21,ce,15,3,"div",10)(22,ue,12,2,"div",10)(23,ve,39,7,"div",10),e()),l&2&&(r(7),y("active",p.activeTab==="run"),r(3),y("active",p.activeTab==="history"),r(3),y("active",p.activeTab==="defaults"),r(3),y("active",p.activeTab==="adjustments"),r(4),s("ngIf",p.activeTab==="run"),r(),s("ngIf",p.activeTab==="history"),r(),s("ngIf",p.activeTab==="defaults"),r(),s("ngIf",p.activeTab==="adjustments"))},dependencies:[L,N,K,en,tn,Y,Q,nn,U,H,rn,on,J,X,Z,dn,pn,mn,un,gn,fn,_n,xn,vn,sn,bn,q],styles:[`@charset "UTF-8";



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
[_nghost-%COMP%] {
  --primary: #1F74BB;
  --primary-light: #e8f0fb;
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;
  --info: #0284c7;
  --text-primary: #0f172a;
  --text-secondary: #1e293b;
  font-family: "Inter";
}
.payroll-exec-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --color: var(--text-primary);
  --border-color: #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}
.exec-tabs[_ngcontent-%COMP%] {
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #ABABAB;
  padding: 0 16px;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.exec-tabs[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.exec-tab[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #475569;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.exec-tab[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.exec-tab.active[_ngcontent-%COMP%] {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background: #e8f0fb;
}
.exec-tab[_ngcontent-%COMP%]:hover:not(.active) {
  color: var(--text-primary);
  background: #f8fafc;
}
.payroll-exec-content[_ngcontent-%COMP%] {
  --background: #f4f7fb;
}
.tab-panel[_ngcontent-%COMP%] {
  padding: 32px 24px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.glass-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.glass-sub-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-sub-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: var(--primary);
}
.card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}
.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: -0.05em;
}
.card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  margin: 0;
  font-weight: 500;
}
.card-header[_ngcontent-%COMP%]   .refresh-btn[_ngcontent-%COMP%] {
  margin-left: auto;
  background: #ffffff;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 8px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-header[_ngcontent-%COMP%]   .refresh-btn[_ngcontent-%COMP%]:hover {
  color: var(--primary);
  border-color: var(--primary);
  background: var(--primary-light);
}
.card-header[_ngcontent-%COMP%]   .refresh-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.card-icon[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f0fb;
  color: var(--primary);
  flex-shrink: 0;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.card-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 22px;
}
.card-icon.run-icon[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: var(--primary);
}
.card-icon.warning-icon[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: var(--warning);
  border-color: #fde68a;
}
.card-icon.info-icon[_ngcontent-%COMP%] {
  background: #f0f9ff;
  color: var(--info);
  border-color: #bae6fd;
}
.card-icon.success-icon[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: var(--success);
  border-color: #bbf7d0;
}
.form-row[_ngcontent-%COMP%], 
.form-grid-2[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
@media (max-width: 600px) {
  .form-row[_ngcontent-%COMP%], 
   .form-grid-2[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.glass-input[_ngcontent-%COMP%] {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #ABABAB;
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 600;
  outline: none;
  transition: all 0.2s ease;
}
.glass-input[_ngcontent-%COMP%]:focus {
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.glass-input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.glass-input[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  background: white;
  color: black;
}
textarea.glass-input[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
}
.toggle-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
}
.toggle-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 500;
}
.toggle-row[_ngcontent-%COMP%]   span.muted[_ngcontent-%COMP%] {
  color: #94a3b8;
}
.run-btn[_ngcontent-%COMP%], 
.save-btn[_ngcontent-%COMP%], 
.fetch-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 16px;
  text-transform: none;
}
.run-btn[_ngcontent-%COMP%] {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.run-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #1F74BB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
}
.run-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.v2-tag[_ngcontent-%COMP%] {
  font-size: 10px;
  background: var(--ion-color-primary);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  vertical-align: middle;
  margin-left: 8px;
  text-transform: uppercase;
  font-weight: 800;
}
.step-indicator[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0 32px;
  padding: 0 20px;
}
.step-indicator[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.step-indicator[_ngcontent-%COMP%]   .step.active[_ngcontent-%COMP%] {
  background: var(--ion-color-primary);
  border-color: var(--ion-color-primary);
  color: white;
  box-shadow: 0 0 15px rgba(var(--ion-color-primary-rgb), 0.4);
  transform: scale(1.1);
}
.step-indicator[_ngcontent-%COMP%]   .step.completed[_ngcontent-%COMP%] {
  background: var(--ion-color-success);
  border-color: var(--ion-color-success);
  color: white;
}
.step-indicator[_ngcontent-%COMP%]   .step-line[_ngcontent-%COMP%] {
  flex-grow: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 10px;
}
.step-content[_ngcontent-%COMP%] {
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.animate-in[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fadeIn 0.4s ease-out;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.loading-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px 20px;
}
.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.7);
  margin-top: 16px;
  font-size: 14px;
}
.validation-report[_ngcontent-%COMP%]   .report-summary[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(45, 211, 111, 0.1);
  color: var(--ion-color-success);
  margin-bottom: 20px;
  font-weight: 600;
}
.validation-report[_ngcontent-%COMP%]   .report-summary.danger[_ngcontent-%COMP%] {
  background: rgba(235, 68, 90, 0.1);
  color: var(--ion-color-danger);
}
.validation-report[_ngcontent-%COMP%]   .report-summary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
}
.validation-report[_ngcontent-%COMP%]   .error-list[_ngcontent-%COMP%] {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}
.validation-report[_ngcontent-%COMP%]   .error-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.validation-report[_ngcontent-%COMP%]   .error-list[_ngcontent-%COMP%]   li.err[_ngcontent-%COMP%] {
  color: var(--ion-color-danger);
}
.validation-report[_ngcontent-%COMP%]   .error-list[_ngcontent-%COMP%]   li.warn[_ngcontent-%COMP%] {
  color: var(--ion-color-warning);
}
.validation-report[_ngcontent-%COMP%]   .error-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  margin-top: 2px;
}
.validation-report[_ngcontent-%COMP%]   .missing-stats[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}
.validation-report[_ngcontent-%COMP%]   .missing-stats[_ngcontent-%COMP%]   .stat-pill[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.preview-report[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}
.preview-report[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%]   .p-item[_ngcontent-%COMP%] {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
.preview-report[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%]   .p-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 6px;
}
.preview-report[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%]   .p-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 18px;
  color: white;
}
.preview-report[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%]   .p-item.highlight[_ngcontent-%COMP%] {
  background: rgba(var(--ion-color-primary-rgb), 0.05);
  border-color: rgba(var(--ion-color-primary-rgb), 0.2);
  grid-column: span 2;
}
.preview-report[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%]   .p-item.highlight[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 28px;
  color: var(--ion-color-primary);
}
.action-footer[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
}
.action-footer[_ngcontent-%COMP%]   .run-btn[_ngcontent-%COMP%] {
  flex: 1;
}
.success-check[_ngcontent-%COMP%] {
  text-align: center;
  padding: 20px 0;
}
.success-check[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  margin-bottom: 16px;
}
.success-check[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 8px;
}
.success-check[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}
.payout-box[_ngcontent-%COMP%] {
  padding: 20px;
  margin-bottom: 32px;
}
.payout-box[_ngcontent-%COMP%]   .p-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
}
.payout-box[_ngcontent-%COMP%]   .p-row[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.payout-box[_ngcontent-%COMP%]   .p-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.6);
}
.finalize-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 30px 20px;
}
.finalize-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 50px;
  color: var(--ion-color-warning);
  margin-bottom: 16px;
}
.finalize-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin-bottom: 8px;
}
.finalize-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.6);
}
.text-btn[_ngcontent-%COMP%] {
  background: none;
  border: none;
  color: var(--ion-color-primary);
  font-size: 13px;
  padding: 8px;
  cursor: pointer;
}
.text-btn[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.run-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.run-btn.primary[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      var(--ion-color-primary),
      #7d4cfc);
  color: white;
  box-shadow: 0 8px 20px rgba(var(--ion-color-primary-rgb), 0.3);
}
.run-btn.secondary[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.run-btn.ghost[_ngcontent-%COMP%] {
  font-size: 14px;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}
.run-btn.payout[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #00d2ff,
      #3a7bd5);
  color: white;
  box-shadow: 0 8px 20px rgba(0, 210, 255, 0.3);
}
.run-btn.success[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #2dd36f,
      #22a356);
  color: white;
  box-shadow: 0 8px 20px rgba(45, 211, 111, 0.3);
}
.run-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.save-btn[_ngcontent-%COMP%] {
  background: var(--success);
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.save-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #15803d;
  transform: translateY(-2px);
}
.save-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.fetch-btn[_ngcontent-%COMP%] {
  width: auto;
  margin-top: 0;
  padding: 10px 20px;
  background: #ffffff;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.fetch-btn[_ngcontent-%COMP%]:hover {
  background: var(--primary-light);
}
.fetch-btn[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: var(--primary);
  width: 18px;
  height: 18px;
}
.result-banner[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
}
.result-banner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  flex-shrink: 0;
}
.success-banner[_ngcontent-%COMP%] {
  background: var(--success-light);
  border: 1px solid var(--success-border);
}
.success-banner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: var(--success);
}
.result-details[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.result-details[_ngcontent-%COMP%]   .result-title[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: var(--success);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.result-details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  font-weight: 500;
}
.result-details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--text-primary);
  font-weight: 700;
}
.inline-search-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.inline-search-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  flex: 1;
  max-width: 250px;
  margin: 0;
}
.mini-table-wrap[_ngcontent-%COMP%] {
  overflow-x: auto;
  margin-top: 16px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  background: #ffffff;
}
.mini-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
}
.mini-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #475569;
  text-align: left;
  padding: 12px 16px;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #f1f5f9;
}
.mini-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 14px 16px;
  color: var(--text-primary);
  border-bottom: 1px solid #f8fafc;
  font-weight: 600;
}
.mini-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {
  border-bottom: none;
}
.mini-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  background: #f1f5f9;
}
.mini-table[_ngcontent-%COMP%]   .lop-days[_ngcontent-%COMP%] {
  color: var(--danger);
  font-weight: 700;
}
.recon-summary[_ngcontent-%COMP%] {
  margin-top: 32px;
}
.recon-summary[_ngcontent-%COMP%]   .recon-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .recon-summary[_ngcontent-%COMP%]   .recon-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(4, 1fr);
  }
}
.recon-summary[_ngcontent-%COMP%]   .recon-card[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.recon-summary[_ngcontent-%COMP%]   .recon-card.final[_ngcontent-%COMP%] {
  border-color: var(--primary);
  background: var(--primary-light);
  border-width: 2px;
}
.recon-summary[_ngcontent-%COMP%]   .recon-card[_ngcontent-%COMP%]   .recon-label[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.recon-summary[_ngcontent-%COMP%]   .recon-card[_ngcontent-%COMP%]   .recon-value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
}
.recon-summary[_ngcontent-%COMP%]   .recon-card[_ngcontent-%COMP%]   .recon-value.negative[_ngcontent-%COMP%] {
  color: var(--danger);
}
.recon-summary[_ngcontent-%COMP%]   .recon-note[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #e8f0fb;
  border-radius: 8px;
  border: 1px solid rgba(var(--primary), 0.1);
}
.recon-summary[_ngcontent-%COMP%]   .recon-note[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: var(--info);
}
.runs-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 8px;
}
.run-item[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.run-item[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: var(--primary);
  transform: translateY(-2px);
}
.run-item[_ngcontent-%COMP%]   .run-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.run-item[_ngcontent-%COMP%]   .run-meta[_ngcontent-%COMP%]   .run-period[_ngcontent-%COMP%] {
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: var(--text-primary);
}
.run-item[_ngcontent-%COMP%]   .run-stats[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  background: #f8fafc;
  padding: 12px;
  border-radius: 8px;
}
.run-item[_ngcontent-%COMP%]   .run-stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.run-item[_ngcontent-%COMP%]   .run-stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: var(--text-primary);
  font-weight: 700;
}
.run-item[_ngcontent-%COMP%]   .run-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.icon-btn[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}
.icon-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.icon-btn[_ngcontent-%COMP%]:hover {
  background: var(--primary-light);
  color: var(--primary);
  border-color: var(--primary);
}
.icon-btn.danger[_ngcontent-%COMP%]:hover {
  background: var(--danger-light);
  color: var(--danger);
  border-color: var(--danger);
}
.adjustment-info[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.info-chip[_ngcontent-%COMP%] {
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #ABABAB;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.info-chip.active[_ngcontent-%COMP%], 
.info-chip[_ngcontent-%COMP%]:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.empty-msg[_ngcontent-%COMP%] {
  text-align: center;
  color: #94a3b8;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  padding: 48px 0;
  font-weight: 500;
}
.center-loader[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  padding: 48px;
}
.center-loader[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: var(--primary);
}
.run-form[_ngcontent-%COMP%], 
.defaults-form[_ngcontent-%COMP%], 
.adjustment-form[_ngcontent-%COMP%] {
  margin-top: 8px;
}`]});let i=c;return i})();var be=[{path:"",component:On}],Ae=(()=>{let c=class c{};c.\u0275fac=function(l){return new(l||c)},c.\u0275mod=z({type:c}),c.\u0275inj=V({imports:[G,ln,cn,hn,W.forChild(be)]});let i=c;return i})();export{Ae as PayrollExecutionPageModule};
