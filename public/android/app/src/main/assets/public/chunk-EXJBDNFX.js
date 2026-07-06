import{a as yn}from"./chunk-22POD724.js";import{a as bn}from"./chunk-AMUZ5UX4.js";import{a as _n}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{C as an,Ca as un,D as rn,Ga as hn,I as ln,R as sn,W as cn,X as dn,Z as pn,b as q,ba as fn,c as T,d as K,g as J,i as Q,n as X,na as gn,o as Z,p as nn,ra as mn,t as en,ta as xn,u as tn,v as on}from"./chunk-B3PLR2IL.js";import{$a as V,Ab as U,Ba as C,Ca as u,Da as f,Eb as W,F as z,K as _,Ka as R,L as b,La as Y,Ma as v,Na as j,Oa as a,Pa as m,Qa as h,Ra as k,Ta as S,Ua as w,Va as O,Vb as $,Zb as G,_ as r,ab as B,ca as y,ea as A,fa as L,ja as x,qb as H,ra as p,rb as N,sa as t,ta as i,ua as g}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as F,e as M}from"./chunk-JHI3MBHO.js";function Sn(l,c){if(l&1&&(t(0,"option",16),a(1),i()),l&2){let e=c.$implicit;p("value",e),r(),k(" FY ",e.split("-")[0]," - ",e.split("-")[1].slice(-2)," ")}}function wn(l,c){l&1&&(t(0,"div",21),g(1,"ion-spinner",22),i())}function On(l,c){if(l&1){let e=C();t(0,"div",23),g(1,"ion-icon",24),t(2,"h2",25),a(3,"No Data Found"),i(),t(4,"p",26),a(5),i(),t(6,"button",27),u("click",function(){_(e);let o=f(2);return b(o.loadTaxSummary())}),g(7,"ion-icon",28),a(8," Retry Load "),i()()}if(l&2){let e=f(2);r(5),h(" We couldn't find any tax summary for FY ",e.financialYear,". This might be because the payroll cycle hasn't started yet. ")}}function Tn(l,c){if(l&1&&(t(0,"div",52)(1,"div",53)(2,"span",54),a(3),i(),g(4,"ion-icon",55),i(),t(5,"h2",56),a(6),i(),t(7,"p",57),a(8," Planned Amount"),i()()),l&2){let e=c.$implicit,n=f(3);r(3),m(e.key),r(3),h("",n.formatCurrency(+e.value)," ")}}function En(l,c){if(l&1){let e=C();t(0,"div")(1,"div",29)(2,"div",30)(3,"div",31)(4,"div",32),g(5,"ion-icon",33),i(),t(6,"div")(7,"label",34),a(8,"Current Regime"),i(),t(9,"h2",35),a(10),i()()()(),t(11,"div",30)(12,"div",31)(13,"div",36),g(14,"ion-icon",37),i(),t(15,"div")(16,"label",34),a(17,"TDS Paid (YTD)"),i(),t(18,"h2",38),a(19),i()()()()(),t(20,"div",39)(21,"div",30)(22,"div",40)(23,"h4"),a(24,"Tax Savings Target"),i()(),t(25,"div",41),g(26,"div",42),i(),t(27,"div",43)(28,"span",44),a(29,"Declared: "),t(30,"strong"),a(31),i()(),t(32,"span",45),a(33,"Cap: \u20B92.0L"),i()()(),t(34,"div",30)(35,"div",40)(36,"h4"),a(37,"Change Regime"),i()(),t(38,"div",46)(39,"button",47),u("click",function(){_(e);let o=f(2);return b(o.changeRegime("OLD"))}),t(40,"strong"),a(41,"OLD"),i(),t(42,"span"),a(43,"Deductions"),i()(),t(44,"button",47),u("click",function(){_(e);let o=f(2);return b(o.changeRegime("NEW"))}),t(45,"strong"),a(46,"NEW"),i(),t(47,"span"),a(48,"Lower Slab"),i()()(),t(49,"button",48),u("click",function(){_(e);let o=f(2);return b(o.saveRegimeSelection())}),a(50),i()()(),t(51,"div",49)(52,"div",40)(53,"h4"),a(54,"Declared Key Highlights"),i()(),t(55,"div",50),x(56,Tn,9,2,"div",51),V(57,"keyvalue"),i()()()}if(l&2){let e=f(2);r(10),h("",e.taxSummary.tax_regime," "),r(9),m(e.formatCurrency(e.taxSummary.tds_paid_ytd)),r(7),Y("width",e.Math.min(100,e.getTotalDeclared()/2e5*100),"%"),r(5),m(e.formatCurrency(e.getTotalDeclared())),r(8),v("active-opt",e.selectedRegime==="OLD"),r(5),v("active-opt",e.selectedRegime==="NEW"),r(5),p("disabled",e.isSavingRegime),r(),h(" ",e.isSavingRegime?"Processing Selection...":"Confirm Selection"," "),r(6),p("ngForOf",B(57,12,e.taxSummary.declared_investments))}}function In(l,c){if(l&1&&(t(0,"div",17),x(1,wn,2,0,"div",18)(2,On,9,1,"div",19)(3,En,58,14,"div",20),i()),l&2){let e=f();r(),p("ngIf",e.isLoadingSummary),r(),p("ngIf",!e.taxSummary&&!e.isLoadingSummary),r(),p("ngIf",e.taxSummary)}}function kn(l,c){l&1&&(t(0,"div",21),g(1,"ion-spinner",22),i())}function Dn(l,c){if(l&1&&(t(0,"strong",62),a(1),i()),l&2){let e=f(3);r(),h("- ",e.formatCurrency(e.standardDeductionAmount))}}function Fn(l,c){l&1&&g(0,"ion-spinner",73)}function zn(l,c){if(l&1&&(t(0,"div",39)(1,"div",30)(2,"div",40)(3,"h4"),a(4,"Income Analysis"),i()(),t(5,"div",59)(6,"span"),a(7,"Gross Salary"),i(),t(8,"strong"),a(9),i()(),t(10,"div",59)(11,"span"),a(12,"Standard Deduction"),i(),x(13,Dn,2,1,"strong",60)(14,Fn,1,0,"ion-spinner",61),i(),t(15,"div",59)(16,"span"),a(17,"Total Deduction"),i(),t(18,"strong",62),a(19),i()(),t(20,"div",63)(21,"span",64),a(22,"Taxable Base"),i(),t(23,"strong",65),a(24),i()()(),t(25,"div",66)(26,"div",40)(27,"h4"),a(28,"Tax Liability Breakdown"),i()(),t(29,"div",59)(30,"span"),a(31,"Basic Income Tax"),i(),t(32,"strong"),a(33),i()(),t(34,"div",59)(35,"span"),a(36,"Cess Projection (4%)"),i(),t(37,"strong"),a(38),i()(),t(39,"div",67)(40,"span",68),a(41,"Net Tax Payable"),i(),t(42,"strong",69),a(43),i()(),t(44,"div",70)(45,"span",71),a(46,"Estimated Monthly TDS"),i(),t(47,"span",72),a(48),i()()()()),l&2){let e=f(2);r(9),m(e.formatCurrency(e.taxComputation.gross_annual_income)),r(4),p("ngIf",!e.isLoadingDeductions),r(),p("ngIf",e.isLoadingDeductions),r(5),h("- ",e.formatCurrency(e.taxComputation.total_deductions)),r(5),m(e.formatCurrency(e.getAdjustedTaxableIncome())),r(9),m(e.formatCurrency(e.taxComputation.income_tax)),r(5),m(e.formatCurrency(e.taxComputation.cess)),r(5),m(e.formatCurrency(e.taxComputation.total_tax_liability)),r(5),m(e.formatCurrency(e.taxComputation.monthly_tds))}}function An(l,c){if(l&1&&(t(0,"div",17),x(1,kn,2,0,"div",18)(2,zn,49,9,"div",58),i()),l&2){let e=f();r(),p("ngIf",e.isLoadingComputation),r(),p("ngIf",e.taxComputation)}}function Ln(l,c){if(l&1&&(t(0,"div",83)(1,"span",84),g(2,"ion-icon",85),a(3),i(),t(4,"span",86),g(5,"ion-icon",87),a(6),i()()),l&2){let e=f(2);r(3),h(" FY ",e.financialYear," "),r(3),h(" ",e.taxSummary.tax_regime," REGIME ")}}function Rn(l,c){l&1&&(t(0,"span"),g(1,"ion-icon",113),a(2," Attach File "),i())}function Yn(l,c){if(l&1&&(t(0,"span",114),g(1,"ion-icon",115),a(2),i()),l&2){let e=f().$implicit,n=f(2);r(2),h(" ",n.insightFormState[e.code].file==null||n.insightFormState[e.code].file.name==null?null:n.insightFormState[e.code].file.name.slice(0,15),"... ")}}function jn(l,c){l&1&&g(0,"ion-spinner",116)}function Vn(l,c){l&1&&(t(0,"span"),a(1,"Upload Proof"),i())}function Bn(l,c){if(l&1&&(t(0,"div",120)(1,"div",121)(2,"span",122),a(3),i(),t(4,"span",123),a(5),i()(),t(6,"span",124),a(7),i()()),l&2){let e=c.$implicit,n=f(4);r(3),m(n.formatCurrency(e.declared_amount)),r(),j(n.getProofStatusColor(e.verification_status)),r(),m(e.verification_status),r(2),m(e.original_filename)}}function Hn(l,c){if(l&1&&(t(0,"div",117)(1,"h5",105),a(2,"Uploaded Documents"),i(),t(3,"div",118),x(4,Bn,8,5,"div",119),i()()),l&2){let e=f().$implicit,n=f(2);r(4),p("ngForOf",n.getProofsForSection(e.code))}}function Nn(l,c){if(l&1){let e=C();t(0,"ion-accordion",88)(1,"ion-item",89)(2,"div",90)(3,"div",91),a(4),i(),t(5,"div",92)(6,"span",93),a(7),i(),t(8,"span",94),a(9),i()()()(),t(10,"div",95)(11,"div",96)(12,"div",97)(13,"label",80),a(14,"Planned Amount"),i(),t(15,"div",98)(16,"span",99),a(17,"\u20B9"),i(),t(18,"input",100),O("ngModelChange",function(o){let s=_(e).$implicit,d=f(2);return w(d.declarations[s.code],o)||(d.declarations[s.code]=o),b(o)}),i()(),t(19,"p",101),a(20),i()(),g(21,"div",102),i(),g(22,"div",103),t(23,"div",104)(24,"h5",105),a(25,"Upload Proof Document"),i(),t(26,"div",106)(27,"div",97)(28,"label",80),a(29,"Proof Amount"),i(),t(30,"div",98)(31,"span",99),a(32,"\u20B9"),i(),t(33,"input",100),O("ngModelChange",function(o){let s=_(e).$implicit,d=f(2);return w(d.insightFormState[s.code].amount,o)||(d.insightFormState[s.code].amount=o),b(o)}),i()()(),t(34,"div",97)(35,"label",80),a(36,"Select Document"),i(),t(37,"div",107),u("click",function(){_(e);let o=R(39);return b(o.click())}),t(38,"input",108,0),u("change",function(o){let s=_(e).$implicit,d=f(2);return b(d.onInsightFileSelected(o,s.code))}),i(),x(40,Rn,3,0,"span",20)(41,Yn,3,1,"span",109),i()()(),t(42,"button",110),u("click",function(){let o=_(e).$implicit,s=f(2);return b(s.uploadInsightProof(o.code))}),x(43,jn,1,0,"ion-spinner",111)(44,Vn,2,0,"span",20),i()(),x(45,Hn,5,1,"div",112),i()()}if(l&2){let e=c.$implicit,n=f(2);p("value",e.code),r(4),m(e.code),r(3),m(e.label),r(2),h("Planned: ",n.formatCurrency(n.declarations[e.code])),r(9),S("ngModel",n.declarations[e.code]),r(2),h("Limit: ",n.formatCurrency(e.maxHint)),r(13),S("ngModel",n.insightFormState[e.code].amount),r(7),p("ngIf",!n.insightFormState[e.code].file),r(),p("ngIf",n.insightFormState[e.code].file),r(),p("disabled",!n.insightFormState[e.code].file||(n.insightFormState[e.code].amount||0)<=0||n.isUploadingProof),r(),p("ngIf",n.isUploadingProof),r(),p("ngIf",!n.isUploadingProof),r(),p("ngIf",n.getProofsForSection(e.code).length>0)}}function Un(l,c){if(l&1){let e=C();t(0,"div",17)(1,"div",74)(2,"div",40)(3,"div",75)(4,"div")(5,"h4"),a(6,"Tax Declarations & Proofs"),i(),t(7,"p"),a(8,"Update your planned investments and upload supporting documents in one place."),i()(),x(9,Ln,7,2,"div",76),i()(),t(10,"ion-accordion-group",77),x(11,Nn,46,13,"ion-accordion",78),i(),t(12,"div",79)(13,"div")(14,"label",80),a(15,"Total Planned Savings"),i(),t(16,"h3",81),a(17),i()(),t(18,"button",82),u("click",function(){_(e);let o=f();return b(o.saveDeclared())}),a(19),i()()()()}if(l&2){let e=f();r(9),p("ngIf",e.taxSummary),r(),p("multiple",!0),r(),p("ngForOf",e.sectionMeta),r(6),m(e.formatCurrency(e.getTotalDeclared())),r(),p("disabled",e.isSavingDeclarations),r(),h(" ",e.isSavingDeclarations?"Processing...":"Confirm All Declarations"," ")}}function Wn(l,c){if(l&1&&(t(0,"div",127)(1,"div",128)(2,"div",129)(3,"span",130),a(4),i(),t(5,"span",131),a(6),i()(),t(7,"div")(8,"h3",132),a(9),i(),t(10,"div",133),g(11,"ion-icon",134),t(12,"span",135),a(13,"Credit Confirmed"),i()()()(),t(14,"div",136)(15,"h2",137),a(16),i(),t(17,"span",138),a(18,"Paid"),i()()()),l&2){let e=c.$implicit,n=f(2);r(4),m(n.getShortMonth(e.month)),r(2),m(e.year.toString().slice(-2)),r(3),k("",n.getMonthName(e.month)," ",e.year),r(7),m(n.formatCurrency(e.net_pay))}}function $n(l,c){if(l&1&&(t(0,"div",17)(1,"div",30)(2,"div",40)(3,"h4"),a(4,"Payment History"),i()(),t(5,"div",125),x(6,Wn,19,5,"div",126),i()()()),l&2){let e=f();r(6),p("ngForOf",e.payrollHistory)}}var E=[{code:"80C",label:"80C \u2014 Life Insurance / PPF / ELSS",maxHint:15e4},{code:"80D",label:"80D \u2014 Health Insurance",maxHint:25e3},{code:"HRA",label:"HRA \u2014 House Rent Allowance",maxHint:2e5},{code:"80G",label:"80G \u2014 Charitable Donations",maxHint:5e4},{code:"80TTA",label:"80TTA \u2014 Savings Account Interest",maxHint:1e4},{code:"NPS",label:"NPS \u2014 National Pension Scheme",maxHint:5e4}],vn=(()=>{let c=class c{constructor(n,o,s,d,P,Pn){this.fb=n,this.router=o,this.payrollApi=s,this.employeeService=d,this.toaster=P,this.loadingCtrl=Pn,this.activeTab="summary",this.Math=Math,this.employeeId=null,this.availableYears=[],this.taxSummary=null,this.isLoadingSummary=!1,this.taxComputation=null,this.isLoadingComputation=!1,this.standardDeductionAmount=0,this.isLoadingDeductions=!1,this.selectedRegime="NEW",this.isSavingRegime=!1,this.sectionMeta=E,this.declarations={},this.existingDeclaredAt="",this.existingRegime="",this.isLoadingDeclarations=!1,this.isSavingDeclarations=!1,this.selectedFile=null,this.isUploadingProof=!1,this.uploadResult=null,this.insightFormState={},this.payrollHistory=[],this.isLoadingHistory=!1,this.payslips=[],this.isLoadingPayslips=!1,this.isDownloadingPDF=!1,this.financialYear=this.payrollApi.getCurrentFinancialYear(),this.selectedPayslipMonth=this.payrollApi.getCurrentYearMonth();let Cn=new Date().getFullYear();this.availableYears=[];for(let I=-3;I<=1;I++){let D=Cn+I;this.availableYears.push(`${D}-${D+1}`)}}ngOnInit(){this.initForms(),this.loadEmployeeAndData()}initForms(){E.forEach(n=>{this.declarations[n.code]=0,this.insightFormState[n.code]={file:null,amount:0}}),this.proofForm=this.fb.group({section_code:["80C",T.required],declared_amount:[0,[T.required,T.min(1)]],financial_year:[this.financialYear]})}loadEmployeeAndData(){this.employeeService.getMyProfile().subscribe({next:n=>{this.employeeId=n?.id||null,this.employeeId&&(this.loadTaxSummary(),this.loadDeclarations(),this.loadPayslips())},error:()=>{}})}onFYChange(){this.taxSummary=null,this.taxComputation=null,E.forEach(n=>{this.declarations[n.code]=0,this.insightFormState[n.code]={file:null,amount:0}}),this.loadTaxSummary(),this.loadDeclarations(),this.activeTab==="computation"&&(this.loadTaxComputation(),this.loadStandardDeductions())}setTab(n){this.activeTab=n,n==="summary"&&!this.taxSummary&&this.loadTaxSummary(),n==="computation"&&(this.loadTaxComputation(),this.loadStandardDeductions()),n==="declarations"&&Object.values(this.declarations).every(o=>o===0)&&this.loadDeclarations(),n==="history"&&this.loadPayrollHistory()}loadTaxSummary(){this.employeeId&&(this.isLoadingSummary=!0,this.payrollApi.getMyTaxSummary(this.financialYear).subscribe({next:n=>{this.taxSummary=n,this.selectedRegime=n.tax_regime||"NEW",this.isLoadingSummary=!1,this.loadStandardDeductions()},error:()=>{this.isLoadingSummary=!1}}))}loadTaxComputation(){this.isLoadingComputation=!0,this.payrollApi.getTaxComputation(this.financialYear).subscribe({next:n=>{this.taxComputation=n,this.isLoadingComputation=!1,this.loadStandardDeductions()},error:()=>{this.isLoadingComputation=!1}})}getAdjustedTaxableIncome(){if(!this.taxComputation)return 0;let n=this.taxComputation.gross_annual_income||0,o=this.taxComputation.total_deductions||0,s=this.standardDeductionAmount||0;return Math.max(0,n-o-s)}loadStandardDeductions(){this.isLoadingDeductions=!0,this.payrollApi.getStandardDeductions(this.financialYear).subscribe({next:n=>{let s=(Array.isArray(n)?n:n.deductions||[]).find(d=>d.regime_type===this.selectedRegime);this.standardDeductionAmount=s?s.amount:0,this.isLoadingDeductions=!1},error:()=>{this.isLoadingDeductions=!1,this.standardDeductionAmount=5e4}})}changeRegime(n){this.selectedRegime=n,this.loadStandardDeductions()}saveRegimeSelection(){this.isSavingRegime=!0,this.payrollApi.selectTaxRegime(this.selectedRegime,this.financialYear).subscribe({next:n=>{this.toaster.showSuccess(`Tax regime set to ${n.tax_regime} for FY ${n.financial_year}`),this.isSavingRegime=!1,this.loadTaxSummary()},error:()=>{this.toaster.showError("Failed to update tax regime"),this.isSavingRegime=!1}})}loadDeclarations(){this.isLoadingDeclarations=!0,this.payrollApi.getDeclaredInvestments(this.financialYear).subscribe({next:n=>{E.forEach(o=>this.declarations[o.code]=0),n.declarations&&Object.keys(n.declarations).forEach(o=>{this.declarations.hasOwnProperty(o)&&(this.declarations[o]=n.declarations[o])}),this.existingRegime=n.tax_regime||"",this.existingDeclaredAt=n.updated_at||"",this.isLoadingDeclarations=!1},error:()=>{this.isLoadingDeclarations=!1}})}saveDeclared(){this.isSavingDeclarations=!0;let n={financial_year:this.financialYear,tax_regime:this.selectedRegime,declarations:F({},this.declarations)};this.payrollApi.submitInvestmentDeclarations(n).subscribe({next:()=>{this.toaster.showSuccess("Declarations submitted successfully"),this.isSavingDeclarations=!1},error:()=>{this.toaster.showError("Failed to submit declarations"),this.isSavingDeclarations=!1}})}getTotalDeclared(){return Object.values(this.declarations).reduce((n,o)=>n+(o||0),0)}onInsightFileSelected(n,o){let s=n.target.files?.[0];s&&(this.insightFormState[o].file=s)}getProofsForSection(n){return!this.taxSummary||!this.taxSummary.proofs?[]:this.taxSummary.proofs.filter(o=>o.section_code===n)}uploadInsightProof(n){return M(this,null,function*(){let o=this.insightFormState[n];if(!o.file||o.amount<=0){this.toaster.showError("Please select a file and enter a valid amount");return}this.isUploadingProof=!0;let s=yield this.loadingCtrl.create({message:`Uploading ${n} proof...`});yield s.present();let d=new FormData;d.append("document",o.file),d.append("section_code",n),d.append("declared_amount",String(o.amount)),d.append("financial_year",this.financialYear),this.payrollApi.uploadInvestmentProof(d).subscribe({next:P=>{o.file=null,o.amount=0,s.dismiss(),this.isUploadingProof=!1,this.toaster.showSuccess(`Proof for ${n} submitted!`),this.loadTaxSummary()},error:()=>{s.dismiss(),this.isUploadingProof=!1,this.toaster.showError("Failed to upload proof document")}})})}onFileSelected(n){let o=n.target.files?.[0];o&&(this.selectedFile=o)}uploadProof(){return M(this,null,function*(){if(!this.selectedFile||this.proofForm.invalid)return;this.isUploadingProof=!0;let n=yield this.loadingCtrl.create({message:"Uploading proof..."});yield n.present();let o=new FormData;o.append("document",this.selectedFile),o.append("section_code",this.proofForm.value.section_code),o.append("declared_amount",String(this.proofForm.value.declared_amount)),o.append("financial_year",this.proofForm.value.financial_year||this.financialYear),this.payrollApi.uploadInvestmentProof(o).subscribe({next:s=>{this.uploadResult=s,this.selectedFile=null,n.dismiss(),this.isUploadingProof=!1,this.toaster.showSuccess(`Proof submitted (ID: ${s.proof_id}) \u2014 Status: ${s.status}`)},error:()=>{n.dismiss(),this.isUploadingProof=!1,this.toaster.showError("Failed to upload proof document")}})})}loadPayrollHistory(){this.isLoadingHistory=!0,this.payrollApi.getPayrollHistory().subscribe({next:n=>{this.payrollHistory=n.history||[],this.isLoadingHistory=!1},error:()=>{this.isLoadingHistory=!1}})}loadPayslips(){this.employeeId&&(this.isLoadingPayslips=!0,this.payrollApi.getEmployeePayslips(this.employeeId).subscribe({next:n=>{this.payslips=Array.isArray(n)?n:n.payslips||[],this.isLoadingPayslips=!1},error:()=>{this.isLoadingPayslips=!1}}))}downloadPayslipPDF(){return M(this,null,function*(){if(!this.employeeId||!this.selectedPayslipMonth)return;this.isDownloadingPDF=!0;let n=yield this.loadingCtrl.create({message:"Generating PDF..."});yield n.present(),this.payrollApi.downloadPayslipPDF(this.employeeId,this.selectedPayslipMonth).subscribe({next:o=>{let s=URL.createObjectURL(o),d=document.createElement("a");d.href=s,d.download=`payslip_${this.selectedPayslipMonth}.pdf`,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(s),n.dismiss(),this.isDownloadingPDF=!1,this.toaster.showSuccess("Payslip downloaded!")},error:()=>{n.dismiss(),this.isDownloadingPDF=!1,this.toaster.showError("Could not download payslip PDF")}})})}formatCurrency(n){return"\u20B9"+(n||0).toLocaleString("en-IN",{maximumFractionDigits:0})}getStatusColor(n){let o=(n||"").toUpperCase();return o==="PAID"||o==="COMPLETED"?"success":o==="PENDING"?"warning":o==="FAILED"?"danger":"medium"}getMonthName(n){return new Date(2025,n-1,1).toLocaleString("default",{month:"long"})}getShortMonth(n){return new Date(2025,n-1,1).toLocaleString("default",{month:"short"}).toUpperCase()}getProofStatusColor(n){let o=(n||"").toUpperCase();return o==="AI_VERIFIED"||o==="APPROVED"?"success":o==="FLAGGED"?"warning":o==="REJECTED"?"danger":"medium"}goBack(){this.router.navigate(["/MyPay"])}};c.\u0275fac=function(o){return new(o||c)(y(en),y($),y(yn),y(_n),y(bn),y(un))},c.\u0275cmp=A({type:c,selectors:[["app-my-tax"]],standalone:!1,decls:32,vars:14,consts:[["insFileInput",""],[1,"my-tax-container"],[1,"my-tax-header","no-border"],["slot","start"],["slot","end"],[1,"fy-select",3,"ngModelChange","change","ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"tax-tabs"],[1,"tax-tab",3,"click"],["name","grid-outline"],[1,"tax-tab",2,"display","none",3,"click"],["name","calculator-outline"],["name","file-tray-full-outline"],["name","time-outline"],[1,"my-tax-content"],["class","tab-panel animate-in",4,"ngIf"],[3,"value"],[1,"tab-panel","animate-in"],["class","center-loader",4,"ngIf"],["class","glass-card animate-in","style","text-align: center; padding: 100px 40px;",4,"ngIf"],[4,"ngIf"],[1,"center-loader"],["name","crescent"],[1,"glass-card","animate-in",2,"text-align","center","padding","100px 40px"],["name","analytics-outline",2,"font-size","80px","color","#cbd5e1","margin-bottom","24px"],[2,"font-weight","800","color","#1e293b"],[2,"color","#64748b","font-size","16px","max-width","400px","margin","12px auto 32px"],[1,"neon-btn",3,"click"],["name","refresh-outline",2,"margin-right","8px"],[1,"regime-grid"],[1,"glass-card"],[2,"display","flex","align-items","center","gap","20px"],[2,"background","rgba(var(--ion-color-primary-rgb),0.08)","width","64px","height","64px","border-radius","18px","display","flex","align-items","center","justify-content","center"],["name","shield-checkmark",2,"color","var(--ion-color-primary)","font-size","32px"],[2,"display","block","font-size","12px","font-weight","700","color","#94a3b8","text-transform","uppercase","letter-spacing","0.8px"],[2,"margin","4px 0 0","font-size","24px","font-weight","800","color","#0f172a"],[2,"background","#fff7ed","width","64px","height","64px","border-radius","18px","display","flex","align-items","center","justify-content","center"],["name","wallet",2,"color","#f59e0b","font-size","32px"],[2,"margin","4px 0 0","font-size","24px","font-weight","800","color","#f59e0b"],[1,"comp-layout"],[1,"section-title"],[1,"iq-gauge"],[1,"gauge-fill"],[2,"display","flex","justify-content","space-between","align-items","center"],[2,"font-size","15px","color","#475569","font-weight","600"],[2,"font-size","13px","color","#94a3b8","font-weight","700"],[2,"display","grid","grid-template-columns","1fr 1fr","gap","16px","margin-bottom","24px"],[1,"regime-opt",3,"click"],[1,"neon-btn",2,"width","100%",3,"click","disabled"],[2,"margin-top","24px"],[1,"decl-tiles-grid"],["class","decl-tile",4,"ngFor","ngForOf"],[1,"decl-tile"],[2,"display","flex","justify-content","space-between","margin-bottom","16px"],[1,"code",2,"font-size","11px","font-weight","800","color","var(--ion-color-primary)","background","rgba(var(--ion-color-primary-rgb),0.1)","padding","4px 10px","border-radius","8px"],["name","chevron-forward",2,"color","#cbd5e1","font-size","16px"],[2,"margin","0","font-size","24px","font-weight","900","color","#0f172a"],[2,"margin","8px 0 0","font-size","11px","color","#94a3b8","font-weight","700","text-transform","uppercase"],["class","comp-layout",4,"ngIf"],[1,"val-row"],["style","color:#ef4444;",4,"ngIf"],["name","dots","style","height: 14px;",4,"ngIf"],[2,"color","#ef4444"],[1,"total-liability",2,"background","#f8fafc","border","1px solid #f1f5f9","margin-top","32px"],[2,"font-weight","700","color","#64748b"],[2,"font-size","24px","color","var(--ion-color-primary)","font-weight","800"],[1,"glass-card",2,"border-top","4px solid #ef4444"],[1,"total-liability",2,"background","#fef2f2","border","1px solid #fee2e2","margin-top","32px"],[2,"font-weight","800","color","#ef4444"],[2,"font-size","28px","color","#ef4444","font-weight","900"],[2,"margin-top","32px","padding","20px","background","#ffffff","border","1px solid #f1f5f9","border-radius","16px","display","flex","justify-content","space-between","align-items","center"],[2,"font-size","14px","color","#64748b","font-weight","500"],[2,"font-size","18px","font-weight","800","color","#0f172a"],["name","dots",2,"height","14px"],[1,"glass-card","insights-card"],[2,"display","flex","justify-content","space-between","align-items","flex-start"],["class","insight-meta-badges",4,"ngIf"],[1,"insights-accordion-group",3,"multiple"],["class","glass-accordion",3,"value",4,"ngFor","ngForOf"],[1,"decl-action-bar","sticky-bottom"],[1,"insight-label"],[1,"total-value"],[1,"neon-btn",3,"click","disabled"],[1,"insight-meta-badges"],[1,"meta-badge"],["name","calendar-outline"],[1,"meta-badge","primary"],["name","shield-outline"],[1,"glass-accordion",3,"value"],["slot","header","lines","none"],[1,"accordion-header-content"],[1,"section-badge"],[1,"section-info"],[1,"label"],[1,"value"],["slot","content",1,"accordion-body"],[1,"insight-row"],[1,"insight-col"],[1,"insight-input-wrap"],[1,"prefix"],["type","number","placeholder","0",3,"ngModelChange","ngModel"],[1,"insight-hint"],[1,"insight-col-action"],[1,"insight-divider"],[1,"insight-proof-section"],[1,"sub-heading"],[1,"proof-upload-grid"],[1,"mini-dropzone",3,"click"],["type","file","hidden","","accept",".pdf,.jpg,.jpeg,.png",3,"change"],["class","file-ready",4,"ngIf"],[1,"neon-btn","mini-btn",3,"click","disabled"],["name","crescent","size","small",4,"ngIf"],["class","proof-history",4,"ngIf"],["name","attach-outline"],[1,"file-ready"],["name","document-text-outline"],["name","crescent","size","small"],[1,"proof-history"],[1,"proof-pills"],["class","proof-pill",4,"ngFor","ngForOf"],[1,"proof-pill"],[1,"pill-info"],[1,"amount"],[1,"status"],[1,"filename"],[2,"display","grid","gap","16px"],["style","display:flex; justify-content:space-between; align-items:center; padding:32px; background:#ffffff; border:1px solid #f1f5f9; border-radius:24px; transition:all 0.2s; cursor:default;","onmouseover","this.style.background='#f8fafc'","onmouseout","this.style.background='#ffffff'",4,"ngFor","ngForOf"],["onmouseover","this.style.background='#f8fafc'","onmouseout","this.style.background='#ffffff'",2,"display","flex","justify-content","space-between","align-items","center","padding","32px","background","#ffffff","border","1px solid #f1f5f9","border-radius","24px","transition","all 0.2s","cursor","default"],[2,"display","flex","align-items","center","gap","24px"],[2,"width","64px","height","64px","background","rgba(var(--ion-color-primary-rgb),0.05)","border","1px solid rgba(var(--ion-color-primary-rgb),0.1)","border-radius","18px","display","flex","flex-direction","column","align-items","center","justify-content","center","color","var(--ion-color-primary)","font-weight","800"],[2,"font-size","11px","text-transform","uppercase","margin-bottom","2px","opacity","0.8"],[2,"font-size","20px"],[2,"margin","0","font-size","18px","color","#0f172a","font-weight","800"],[2,"display","flex","align-items","center","gap","6px","margin-top","4px"],["name","checkmark-done-circle",2,"color","#10b981","font-size","14px"],[2,"font-size","13px","color","#64748b","font-weight","500"],[2,"text-align","right"],[2,"margin","0","font-size","22px","color","#0f172a","font-weight","900"],[2,"display","inline-block","margin-top","8px","padding","4px 12px","border","1px solid #dcfce7","background","#f0fdf4","color","#16a34a","font-size","11px","font-weight","800","border-radius","10px","text-transform","uppercase","letter-spacing","0.5px"]],template:function(o,s){o&1&&(t(0,"div",1)(1,"ion-header",2)(2,"ion-toolbar")(3,"ion-buttons",3),g(4,"ion-menu-button"),i(),t(5,"ion-title"),a(6,"Tax Insights"),i(),t(7,"ion-buttons",4)(8,"select",5),O("ngModelChange",function(P){return w(s.financialYear,P)||(s.financialYear=P),P}),u("change",function(){return s.onFYChange()}),x(9,Sn,2,3,"option",6),i()()(),t(10,"div",7)(11,"button",8),u("click",function(){return s.setTab("summary")}),g(12,"ion-icon",9),t(13,"span"),a(14,"Overview"),i()(),t(15,"button",10),u("click",function(){return s.setTab("computation")}),g(16,"ion-icon",11),t(17,"span"),a(18,"Computation"),i()(),t(19,"button",10),u("click",function(){return s.setTab("declarations")}),g(20,"ion-icon",12),t(21,"span"),a(22,"Declarations"),i()(),t(23,"button",10),u("click",function(){return s.setTab("history")}),g(24,"ion-icon",13),t(25,"span"),a(26,"History"),i()()()(),t(27,"ion-content",14),x(28,In,4,3,"div",15)(29,An,3,2,"div",15)(30,Un,20,6,"div",15)(31,$n,7,1,"div",15),i()()),o&2&&(r(8),S("ngModel",s.financialYear),r(),p("ngForOf",s.availableYears),r(2),v("active",s.activeTab==="summary"),r(4),v("active",s.activeTab==="computation"),r(4),v("active",s.activeTab==="declarations"),r(4),v("active",s.activeTab==="history"),r(5),p("ngIf",s.activeTab==="summary"),r(),p("ngIf",s.activeTab==="computation"),r(),p("ngIf",s.activeTab==="declarations"),r(),p("ngIf",s.activeTab==="history"))},dependencies:[H,N,Z,nn,q,Q,X,K,J,an,rn,ln,sn,cn,dn,pn,fn,gn,mn,xn,U],styles:[`@charset "UTF-8";



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
.my-tax-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
  font-family: "Inter";
  color: #1e293b;
}
.my-tax-header[_ngcontent-%COMP%] {
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 100;
}
.my-tax-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --padding-start: 32px;
  --padding-end: 32px;
  --color: #0f172a;
  height: 80px;
  font-weight: 800;
}
.my-tax-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-size: 20px;
  letter-spacing: -0.5px;
}
.fy-select[_ngcontent-%COMP%] {
  background: #f1f5f9;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.fy-select[_ngcontent-%COMP%]:hover {
  background: #e2e8f0;
  color: #01172a;
}
.tax-tabs[_ngcontent-%COMP%] {
  display: flex;
  background: #ffffff;
  padding: 0 32px;
  gap: 40px;
  overflow-x: auto;
  scrollbar-width: none;
}
.tax-tabs[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.tax-tab[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
}
.tax-tab[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.tax-tab.active[_ngcontent-%COMP%] {
  color: var(--ion-color-primary);
  font-weight: 800;
}
.tax-tab.active[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--ion-color-primary);
  border-radius: 3px 3px 0 0;
}
.tax-tab[_ngcontent-%COMP%]:hover:not(.active) {
  color: #64748b;
}
.my-tax-content[_ngcontent-%COMP%] {
  --background: #f8fafc;
}
.tab-panel[_ngcontent-%COMP%] {
  padding: 48px 32px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 50px;
}
.glass-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 32px;
  padding: 48px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease;
}
.section-title[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 32px;
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.3px;
}
.iq-gauge[_ngcontent-%COMP%] {
  height: 12px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
  margin: 32px 0;
}
.iq-gauge[_ngcontent-%COMP%]   .gauge-fill[_ngcontent-%COMP%] {
  height: 100%;
  background:
    linear-gradient(
      90deg,
      var(--ion-color-primary),
      #60a5fa);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(var(--ion-color-primary-rgb), 0.2);
}
.regime-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
.decl-tiles-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.decl-tile[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.decl-tile[_ngcontent-%COMP%]:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
  border-color: #e2e8f0;
}
.comp-layout[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
.val-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f8fafc;
}
.val-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 15px;
  font-weight: 500;
}
.val-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1e293b;
  font-size: 16px;
  font-weight: 700;
}
.val-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.total-liability[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 32px;
  border-radius: 24px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.decl-grid-v2[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.decl-box[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
}
.decl-box[_ngcontent-%COMP%]   .box-head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.decl-box[_ngcontent-%COMP%]   .box-head[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {
  color: var(--ion-color-primary);
  font-weight: 800;
  font-size: 12px;
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  padding: 4px 12px;
  border-radius: 8px;
}
.decl-box[_ngcontent-%COMP%]   .box-head[_ngcontent-%COMP%]   .limit[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 700;
}
.v2-dropzone[_ngcontent-%COMP%] {
  border: 2px dashed #e2e8f0;
  border-radius: 32px;
  padding: 80px 40px;
  background: #f8fafc;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}
.v2-dropzone[_ngcontent-%COMP%]:hover {
  border-color: var(--ion-color-primary);
  background: rgba(var(--ion-color-primary-rgb), 0.02);
}
.neon-btn[_ngcontent-%COMP%] {
  background: #0f172a;
  color: #ffffff;
  padding: 20px 40px;
  border-radius: 18px;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s;
}
.neon-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  background: #000000;
}
.regime-opt[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.regime-opt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 16px;
  margin-bottom: 4px;
}
.regime-opt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
}
.regime-opt.active-opt[_ngcontent-%COMP%] {
  border-color: var(--ion-color-primary);
  background: rgba(var(--ion-color-primary-rgb), 0.05);
}
.regime-opt.active-opt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--ion-color-primary);
}
.animate-in[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes _ngcontent-%COMP%_slideIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.center-loader[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  padding: 60px;
}
.insights-card[_ngcontent-%COMP%] {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px !important;
}
.insights-accordion-group[_ngcontent-%COMP%] {
  margin: 24px 0 100px;
  background: transparent;
}
.glass-accordion[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 20px !important;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}
.glass-accordion[_ngcontent-%COMP%]:hover {
  border-color: #e2e8f0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
}
.glass-accordion.accordion-expanded[_ngcontent-%COMP%] {
  border-color: var(--ion-color-primary);
}
.glass-accordion[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%] {
  --padding-start: 24px;
  --padding-end: 24px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --background: #ffffff;
  --color: #0f172a;
}
.accordion-header-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}
.accordion-header-content[_ngcontent-%COMP%]   .section-badge[_ngcontent-%COMP%] {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  color: var(--ion-color-primary);
  font-weight: 800;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 10px;
  min-width: 60px;
  text-align: center;
}
.accordion-header-content[_ngcontent-%COMP%]   .section-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.accordion-header-content[_ngcontent-%COMP%]   .section-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}
.accordion-header-content[_ngcontent-%COMP%]   .section-info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}
.accordion-body[_ngcontent-%COMP%] {
  padding: 32px 40px;
  background: #fafbfc;
  border-top: 1px solid #f1f5f9;
}
.insight-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 40px;
}
@media (max-width: 600px) {
  .insight-row[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 20px;
  }
}
.insight-col[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.insight-label[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.insight-hint[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
  margin: 4px 0 0;
}
.insight-input-wrap[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.insight-input-wrap[_ngcontent-%COMP%]   .prefix[_ngcontent-%COMP%] {
  position: absolute;
  left: 16px;
  color: #94a3b8;
  font-weight: 700;
  font-size: 16px;
}
.insight-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px 14px 34px;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  outline: none;
  transition: all 0.2s;
}
.insight-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {
  border-color: var(--ion-color-primary);
  box-shadow: 0 0 0 4px rgba(var(--ion-color-primary-rgb), 0.1);
}
.insight-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {
  color: #cbd5e1;
}
.insight-divider[_ngcontent-%COMP%] {
  height: 1px;
  background: #f1f5f9;
  margin: 32px 0;
}
.insight-proof-section[_ngcontent-%COMP%]   .sub-heading[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 20px;
}
.proof-upload-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 24px;
  margin-bottom: 24px;
}
@media (max-width: 600px) {
  .proof-upload-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.mini-dropzone[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  height: 52px;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}
.mini-dropzone[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mini-dropzone[_ngcontent-%COMP%]:hover {
  border-color: var(--ion-color-primary);
  background: rgba(var(--ion-color-primary-rgb), 0.02);
  color: var(--ion-color-primary);
}
.mini-dropzone[_ngcontent-%COMP%]   .file-ready[_ngcontent-%COMP%] {
  color: #10b981;
  font-weight: 700;
}
.mini-btn[_ngcontent-%COMP%] {
  padding: 12px 24px !important;
  font-size: 13px !important;
  border-radius: 12px !important;
  width: auto !important;
}
.proof-history[_ngcontent-%COMP%] {
  margin-top: 32px;
}
.proof-history[_ngcontent-%COMP%]   .sub-heading[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  color: #94a3b8;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.proof-pills[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.proof-pill[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 160px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
}
.proof-pill[_ngcontent-%COMP%]   .pill-info[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.proof-pill[_ngcontent-%COMP%]   .pill-info[_ngcontent-%COMP%]   .amount[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
}
.proof-pill[_ngcontent-%COMP%]   .pill-info[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 5px;
}
.proof-pill[_ngcontent-%COMP%]   .pill-info[_ngcontent-%COMP%]   .status.success[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #15803d;
}
.proof-pill[_ngcontent-%COMP%]   .pill-info[_ngcontent-%COMP%]   .status.warning[_ngcontent-%COMP%] {
  background: #fff7ed;
  color: #c2410c;
}
.proof-pill[_ngcontent-%COMP%]   .pill-info[_ngcontent-%COMP%]   .status.danger[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #b91c1c;
}
.proof-pill[_ngcontent-%COMP%]   .filename[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.decl-action-bar.sticky-bottom[_ngcontent-%COMP%] {
  position: sticky;
  bottom: -48px;
  left: -48px;
  right: -48px;
  width: calc(100% + 96px);
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-top: 1px solid #f1f5f9;
  padding: 24px 48px;
  border-radius: 0 0 32px 32px;
  z-index: 10;
  margin-top: 40px;
}
.insight-meta-badges[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.meta-badge[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  color: #475569;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.meta-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.meta-badge.primary[_ngcontent-%COMP%] {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  color: var(--ion-color-primary);
}`]});let l=c;return l})();var Gn=[{path:"",component:vn}],ce=(()=>{let c=class c{};c.\u0275fac=function(o){return new(o||c)},c.\u0275mod=L({type:c}),c.\u0275inj=z({imports:[W,tn,on,hn,G.forChild(Gn)]});let l=c;return l})();export{ce as MyTaxPageModule};
