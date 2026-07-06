import{a as Z}from"./chunk-22POD724.js";import{a as Wn}from"./chunk-DA4OVRGX.js";import{a as Q}from"./chunk-GKMRXCVX.js";import{a as Hn}from"./chunk-NDCRD3QG.js";import{A as Sn,Ca as Vn,Ga as Gn,H as q,I as kn,Q as Tn,R as In,V as An,W as Bn,X,_ as zn,ba as Fn,d as vn,g as wn,ha as Dn,ja as Ln,ka as Nn,la as Rn,ma as Yn,na as J,ra as Un,ta as jn,u as En,wa as K,ya as $n}from"./chunk-B3PLR2IL.js";import{$a as M,A as z,Ba as Y,Bb as H,Ca as D,Da as C,E as sn,Eb as Pn,F as dn,H as pn,Ib as Mn,K as L,Kb as yn,L as N,La as fn,Ma as U,Na as en,Oa as o,Pa as p,Qa as P,Ra as un,Ta as _n,Ua as bn,Va as hn,Wb as W,Zb as On,_ as i,bb as y,ca as R,d as j,ea as $,fa as mn,ja as E,qb as V,ra as x,rb as G,sa as n,ta as t,ua as m,ya as gn,yb as Cn,za as xn}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as ln,b as cn,e as tn}from"./chunk-JHI3MBHO.js";var nn=(()=>{let c=class c{constructor(a){this.http=a,this.env=Hn,this.payrollUrl=`http://${this.env.apiURL}/api/payroll-master/`}getHeaders(){let a=localStorage.getItem("token")||localStorage.getItem("access_token");return new Mn({Accept:"application/json",Authorization:`Bearer ${a}`})}getPayrollComponents(){return this.http.get(`${this.payrollUrl}components`,{headers:this.getHeaders()})}getPayrollstructures(){return this.http.get(`${this.payrollUrl}structures`,{headers:this.getHeaders()})}getPayrollStructureById(a){return this.http.get(`${this.payrollUrl}structures/${a}`,{headers:this.getHeaders()})}getPayrollTempletes(){return this.http.get(`${this.payrollUrl}templates`,{headers:this.getHeaders()})}getTemplateById(a){return this.http.get(`${this.payrollUrl}templates/${a}`,{headers:this.getHeaders()})}getTemplateComposition(a){return this.http.get(`${this.payrollUrl}templates/${a}/composition`,{headers:this.getHeaders()})}listContracts(a){let l=new URLSearchParams;return a.employee_id&&l.append("employee_id",a.employee_id),a.status&&l.append("status",a.status),this.http.get(`${this.payrollUrl}contracts?${l.toString()}`,{headers:this.getHeaders()})}};c.\u0275fac=function(l){return new(l||c)(pn(yn))},c.\u0275prov=sn({token:c,factory:c.\u0275fac,providedIn:"root"});let r=c;return r})();function et(r,c){r&1&&(n(0,"div",4),m(1,"ion-spinner",5),n(2,"p"),o(3,"Computing your tax liability..."),t()())}function ot(r,c){if(r&1&&(n(0,"th",28),o(1),m(2,"span",83),t()),r&2){let e=c.$implicit;i(),P(" ",e.label," "),i(),en(e.status.toLowerCase())}}function at(r,c){if(r&1&&(n(0,"td",28),o(1),M(2,"number"),t()),r&2){let e=c.$implicit;i(),p(y(2,1,e,"1.0-0"))}}function it(r,c){if(r&1&&(n(0,"tr")(1,"td",27),o(2),t(),n(3,"td",28)(4,"strong"),o(5),M(6,"number"),t()(),E(7,at,3,4,"td",29),t()),r&2){let e=c.$implicit;U("total-row-style",e.name==="Total Earnings"),i(2),p(e.name),i(3),p(y(6,5,e.total,"1.0-0")),i(2),x("ngForOf",e.values)}}function rt(r,c){if(r&1&&(n(0,"td",28)(1,"strong"),o(2),M(3,"number"),t()()),r&2){let e=c.$implicit;i(2),p(y(3,1,e,"1.0-0"))}}function lt(r,c){if(r&1&&(n(0,"div",45)(1,"span",46),o(2,"Less: Provident Fund Employer's Share"),t(),n(3,"span",84),o(4),t()()),r&2){let e=C(2);i(4),P("- ",e.formatCurrency(e.getEmployerPfValue()))}}function ct(r,c){r&1&&(n(0,"div",85)(1,"span"),o(2,"Less: Section 16 Tax Exemptions"),t()())}function st(r,c){if(r&1&&(n(0,"div",86)(1,"span",46)(2,"span",87),o(3,"Standard Deduction"),t()(),n(4,"span",12),o(5),t()()),r&2){let e=C(2);i(5),p(e.formatCurrency(e.taxComputation.standard_deduction))}}function dt(r,c){if(r&1&&(n(0,"div",86)(1,"span",46),o(2,"Professional Tax"),t(),n(3,"span",12),o(4),t()()),r&2){let e=C(2);i(4),p(e.formatCurrency(e.professionalTax))}}function pt(r,c){if(r&1&&(n(0,"div",88)(1,"span",46),o(2,"Total"),t(),n(3,"span",12),o(4),t()()),r&2){let e=C(2);i(4),p(e.formatCurrency((e.taxComputation.standard_deduction||0)+(e.taxComputation.regime_type==="OLD"&&e.professionalTax||0)))}}function mt(r,c){if(r&1&&(n(0,"div",60)(1,"span",46),o(2,"Less: Chapter VI-A Deductions"),t(),n(3,"span",84),o(4),t()()),r&2){let e=C(2);i(4),P("- ",e.formatCurrency(e.taxComputation.investment_deductions))}}function gt(r,c){if(r&1&&(n(0,"div",60)(1,"span",46),o(2),t(),n(3,"span",12),o(4),t()()),r&2){let e=c.$implicit,a=C(3);i(2),p(e.label),i(2),p(e.taxAmount>0?a.formatCurrency(e.taxAmount):"0")}}function xt(r,c){if(r&1&&(n(0,"div",60)(1,"span",46),o(2),t(),n(3,"span",12),o(4),t()()),r&2){let e=C(3);i(2),P("Tax Rebate-Section 87A When taxable income less than ",e.taxComputation.regime_type==="NEW"?"1200000":"500000"," or additional relief applicable"),i(2),p(e.rebate87A>0?"-"+e.formatCurrency(e.rebate87A):"0")}}function ft(r,c){if(r&1&&(n(0,"div",17)(1,"div",18),m(2,"ion-icon",89),n(3,"h2"),o(4,"Tax Calculation"),t()(),n(5,"div",59)(6,"div",90)(7,"span"),o(8,"TAXABLE INCOME SLABS"),t(),n(9,"span"),o(10,"TAX AMOUNT"),t()(),E(11,gt,5,2,"div",91)(12,xt,5,2,"div",53),n(13,"div",52)(14,"span",46),o(15,"Gross Income Tax"),t(),n(16,"span",12),o(17),t()()()()),r&2){let e=C(2);i(11),x("ngForOf",e.taxBreakdown),i(),x("ngIf",e.taxComputation),i(5),p(e.grossIncomeTax>0?e.formatCurrency(e.grossIncomeTax):"0")}}function ut(r,c){if(r&1&&(n(0,"th",28),o(1),m(2,"span",83),t()),r&2){let e=c.$implicit;i(),P(" ",e.label," "),i(),en(e.status.toLowerCase())}}function _t(r,c){if(r&1&&(n(0,"td",28),o(1),M(2,"number"),t()),r&2){let e=c.$implicit,a=C(2);i(),P(" ",y(2,1,e.status==="IMPORTED"?0:a.monthlyTaxValue,"1.0-0")," ")}}function bt(r,c){if(r&1&&(n(0,"div",6)(1,"div",7)(2,"div",8)(3,"div",9),m(4,"img",10),t(),n(5,"div",11)(6,"label"),o(7,"Taxable Income"),t(),n(8,"div",12),o(9),M(10,"number"),t()()(),n(11,"div",8)(12,"div",9),m(13,"img",13),t(),n(14,"div",11)(15,"label"),o(16,"Gross Income Tax"),t(),n(17,"div",12),o(18),M(19,"number"),t()()(),n(20,"div",8)(21,"div",9),m(22,"img",14),t(),n(23,"div",11)(24,"label"),o(25,"Surcharge & Cess"),t(),n(26,"div",12),o(27),M(28,"number"),t()()(),n(29,"div",8)(30,"div",9),m(31,"img",15),t(),n(32,"div",11)(33,"label"),o(34,"Net Tax Payable"),t(),n(35,"div",12),o(36),M(37,"number"),t()()(),n(38,"div",8)(39,"div",9),m(40,"img",16),t(),n(41,"div",11)(42,"label"),o(43,"Tax Due"),t(),n(44,"div",12),o(45),M(46,"number"),t()()()(),n(47,"div",17)(48,"div",18),m(49,"ion-icon",19),n(50,"h2"),o(51,"Gross Earnings from Employment"),t()(),n(52,"div",20)(53,"div",21),m(54,"span",22),n(55,"span"),o(56,"Income from Previous Employer"),t()(),n(57,"div",21),m(58,"span",23),n(59,"span"),o(60,"Income from Current Employer (imported)"),t()(),n(61,"div",21),m(62,"span",24),n(63,"span"),o(64,"Projected Salary"),t()()(),n(65,"div",25)(66,"table",26)(67,"thead")(68,"tr")(69,"th",27),o(70,"SALARY BREAKUP"),t(),n(71,"th",28),o(72,"TOTAL"),t(),E(73,ot,3,3,"th",29),t()(),n(74,"tbody"),E(75,it,8,8,"tr",30),n(76,"tr",31)(77,"td",27),o(78),t(),n(79,"td",28)(80,"strong"),o(81),M(82,"number"),t()(),E(83,rt,4,4,"td",29),t()()()(),n(84,"div",32)(85,"h3"),o(86,"Less : Employer Share"),t(),n(87,"div",33)(88,"div",34)(89,"span"),o(90,"Provident Fund Employer's Share"),t(),n(91,"a",35),o(92,"View Details"),t()(),n(93,"div",36),o(94),M(95,"number"),t()(),n(96,"div",37)(97,"div",34),o(98,"Total"),t(),n(99,"div",36),o(100),M(101,"number"),t()()()(),n(102,"div",17)(103,"div",18),m(104,"ion-icon",38),n(105,"h2"),o(106,"Tax Computation Breakdown"),t(),n(107,"span",39),o(108),t()(),n(109,"div",40)(110,"div",41),m(111,"ion-icon",42),n(112,"strong"),o(113,"Taxable Income from All Heads"),t()(),n(114,"div",43)(115,"div",44)(116,"strong"),o(117,"Income from Salaries"),t()(),n(118,"div",45)(119,"span",46),o(120,"Total Salary Received (Gross CTC)"),t(),n(121,"span",12),o(122),t()(),E(123,lt,5,1,"div",47),n(124,"div",48)(125,"span",46),o(126,"Total"),t(),n(127,"span",12),o(128),t()(),E(129,ct,3,0,"div",49)(130,st,6,1,"div",50)(131,dt,5,1,"div",50)(132,pt,5,1,"div",51),n(133,"div",52)(134,"span",46),o(135,'Taxable Amount under Head "Salaries"'),t(),n(136,"span",12),o(137),t()()(),n(138,"div",52)(139,"span",46),o(140,"Total Gross From all Heads"),t(),n(141,"span",12),o(142),t()(),E(143,mt,5,1,"div",53),t(),n(144,"div",54)(145,"div",55)(146,"span"),o(147,"TDS Paid (YTD)"),t(),n(148,"span"),o(149,"75%"),t()(),n(150,"div",56),m(151,"div",57),t()()(),n(152,"div",17)(153,"div",18),m(154,"ion-icon",58),n(155,"h2"),o(156,"Taxable Amount Summary"),t()(),n(157,"div",59)(158,"div",60)(159,"span",46),o(160,"Total Taxable Amount"),t(),n(161,"span",12),o(162),t()(),n(163,"div",61)(164,"span",46),o(165,"Net Taxable Income"),t(),n(166,"span",12),o(167),t()()()(),E(168,ft,18,3,"div",62),n(169,"div",17)(170,"div",18),m(171,"ion-icon",63),n(172,"h2"),o(173,"Surcharge & Cess"),t()(),n(174,"div",59)(175,"div",60)(176,"span",46),o(177,"Health and Education Cess - 4% of Gross Income Tax and Surcharge"),t(),n(178,"span",12),o(179),t()(),n(180,"div",64)(181,"span",46),o(182,"Total Surcharge & Cess"),t(),n(183,"span",12),o(184),t()()()(),n(185,"div",17)(186,"div",18),m(187,"ion-icon",65),n(188,"h2"),o(189,"Net Income Tax Payable"),t()(),n(190,"div",59)(191,"div",60)(192,"span",46)(193,"span",66),o(194,"P"),t(),o(195," Tax Calculation \xA0+\xA0 "),n(196,"span",67),o(197,"Q"),t(),o(198," Surcharge & Cess "),t(),n(199,"span",12),o(200),t()(),n(201,"div",61)(202,"span",46),o(203),M(204,"number"),t(),n(205,"span",12),o(206),t()()()(),n(207,"div",17)(208,"div",18),m(209,"ion-icon",68),n(210,"h2"),o(211,"Cumulative Tax Deductions Details"),t()(),n(212,"div",59)(213,"div",69)(214,"span",46),o(215,"Remaining Tax To Be Paid"),t(),n(216,"span",12),o(217),t()()()(),n(218,"div",17)(219,"div",18),m(220,"ion-icon",70),n(221,"h2"),o(222,"Month on Month Tax Deductions Details"),t()(),n(223,"div",25)(224,"table",26)(225,"thead")(226,"tr")(227,"th",27),o(228,"MONTH"),t(),E(229,ut,3,3,"th",29),t()(),n(230,"tbody")(231,"tr")(232,"td",27),o(233,"Monthly Total Tax"),t(),E(234,_t,3,4,"td",29),t()()()(),n(235,"div",71)(236,"div",21),m(237,"span",22),n(238,"span"),o(239,"Tax Deduction from previous employer"),t()(),n(240,"div",21),m(241,"span",23),n(242,"span"),o(243,"Imported Tax Deduction from current employer"),t()(),n(244,"div",21),m(245,"span",24),n(246,"span"),o(247,"Projected income tax"),t()()(),n(248,"div",72),o(249," * Projected Income Tax does not include any revisions, bonuses or other additional projected payments other than salary "),t()(),n(250,"div",17)(251,"div",18),m(252,"ion-icon",42),n(253,"h2"),o(254,"Investment Declarations"),t(),n(255,"button",73),o(256,"Edit Declarations"),t()(),n(257,"div",74)(258,"div",75)(259,"div",76),o(260,"Section 80C (Life Ins, PPF, etc.)"),t(),n(261,"div",77),o(262),t()(),n(263,"div",75)(264,"div",76),o(265,"Section 80D (Health Insurance)"),t(),n(266,"div",77),o(267),t()(),n(268,"div",75)(269,"div",76),o(270,"HRA Exemption Claimed"),t(),n(271,"div",77),o(272),t()()(),n(273,"div",78),m(274,"ion-icon",79),n(275,"span"),o(276,"3 declarations pending proof upload"),t()()(),n(277,"div",80)(278,"p"),o(279,"Looking for detailed history, proof upload, or Form-16?"),t(),n(280,"ion-button",81),o(281," Go to full tax portal "),m(282,"ion-icon",82),t()()()),r&2){let e=C();i(9),P("INR ",y(10,39,e.getTaxableIncomeFromAllHeads(),"1.0-0")),i(9),P("INR ",y(19,42,e.grossIncomeTax,"1.0-0")),i(9),P("INR ",y(28,45,e.totalCess,"1.0-0")),i(9),P("INR ",y(37,48,e.netTaxPayable,"1.0-0")),i(9),P("INR ",y(46,51,e.remainingTax,"1.0-0")),i(28),x("ngForOf",e.fiscalMonths),i(2),x("ngForOf",e.breakupRows),i(3),p(e.totalRow.name),i(3),p(y(82,54,e.totalRow.total,"1.0-0")),i(2),x("ngForOf",e.totalRow.values),i(11),P(" ",y(95,57,e.employerShareTotal,"1.0-0")," "),i(6),p(y(101,60,e.employerShareTotal,"1.0-0")),i(8),P("",e.taxComputation.regime_type," Regime"),i(14),p(e.formatCurrency(e.taxComputation.contract_ctc||e.taxComputation.gross_annual_income)),i(),x("ngIf",e.getEmployerPfValue()>0),i(5),p(e.formatCurrency(e.getGrossEarnings())),i(),x("ngIf",e.taxComputation.standard_deduction||e.professionalTax&&e.taxComputation.regime_type==="OLD"),i(),x("ngIf",e.taxComputation.standard_deduction),i(),x("ngIf",e.professionalTax&&e.taxComputation.regime_type==="OLD"),i(),x("ngIf",e.taxComputation.standard_deduction||e.professionalTax&&e.taxComputation.regime_type==="OLD"),i(5),p(e.formatCurrency(e.getTaxableIncomeFromAllHeads())),i(5),p(e.formatCurrency(e.getTaxableIncomeFromAllHeads())),i(),x("ngIf",e.taxComputation.investment_deductions>0),i(8),fn("width",75,"%"),i(11),p(e.formatCurrency(e.getTaxableIncomeFromAllHeads())),i(5),p(e.formatCurrency(e.getTaxableIncomeFromAllHeads())),i(),x("ngIf",e.taxBreakdown.length>0),i(11),p(e.totalCess>0?e.formatCurrency(e.totalCess):"0"),i(5),p(e.totalCess>0?e.formatCurrency(e.totalCess):"0"),i(16),p(e.formatCurrency(e.netTaxPayable)),i(3),P("Net tax amount of ",y(204,63,e.netTaxPayable,"1.0-0")," after round Off is"),i(3),p(e.formatCurrency(e.netTaxPayable)),i(11),p(e.formatCurrency(e.remainingTax)),i(12),x("ngForOf",e.fiscalMonths),i(5),x("ngForOf",e.fiscalMonths),i(28),P("",e.formatCurrency((e.taxSummary==null||e.taxSummary.declared_investments==null?null:e.taxSummary.declared_investments["80C"])||0)," / \u20B91.5L"),i(5),P("",e.formatCurrency((e.taxSummary==null||e.taxSummary.declared_investments==null?null:e.taxSummary.declared_investments["80D"])||0)," / \u20B925k"),i(5),p(e.formatCurrency((e.taxSummary==null||e.taxSummary.declared_investments==null?null:e.taxSummary.declared_investments.HRA)||0))}}function ht(r,c){if(r&1){let e=Y();n(0,"div",92),m(1,"ion-icon",93),n(2,"h2"),o(3,"Unable to load computation"),t(),n(4,"p"),o(5,"Please check your salary structure or visit the full portal."),t(),n(6,"ion-button",94),D("click",function(){L(e);let l=C();return N(l.loadTaxData())}),o(7,"Retry Computation"),t()()}}var Xn=(()=>{let c=class c{constructor(a,l,s){this.payrollApi=a,this.payrollService=l,this.employeeService=s,this.destroy$=new j,this.financialYear="",this.professionalTax=0,this.employerPf=0,this.isLoadingTax=!1,this.currentContractCtc=0,this.employerPfAnnual=0,this.taxSlabs=[],this.taxBreakdown=[],this.rebate87A=0,this.grossIncomeTax=0,this.totalCess=0,this.totalSurcharge=0,this.netTaxPayable=0,this.taxPaidTillNow=0,this.remainingTax=0,this.monthlyTaxValue=0,this.standardDeductionsList=[],this.standardDeductionAmount=0,this.fiscalMonths=[],this.breakupRows=[],this.totalRow={name:"Total Earnings",values:[],total:0},this.employerShareTotal=0,this.isLoadingBreakup=!1}ngOnInit(){this.financialYear||(this.financialYear=this.payrollApi.getCurrentFinancialYear()),this.generateFiscalMonths(),this.loadTaxData(),this.loadMonthlyBreakup()}generateFiscalMonths(){let[a]=this.financialYear.split("-").map(Number),l=[{name:"APR",year:a},{name:"MAY",year:a},{name:"JUN",year:a},{name:"JUL",year:a},{name:"AUG",year:a},{name:"SEP",year:a},{name:"OCT",year:a},{name:"NOV",year:a},{name:"DEC",year:a},{name:"JAN",year:a+1},{name:"FEB",year:a+1},{name:"MAR",year:a+1}],s=new Date().getMonth(),f=new Date().getFullYear();this.fiscalMonths=l.map(u=>{let b=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"].indexOf(u.name),O="PROJECTED";return(u.year<f||u.year===f&&b<s)&&(O="IMPORTED"),cn(ln({},u),{label:`${u.name} ${String(u.year).slice(2)}`,status:O})})}loadMonthlyBreakup(){this.isLoadingBreakup=!0,this.employeeService.getMyProfile().pipe(z(this.destroy$)).subscribe({next:a=>{if(!a?.id){this.isLoadingBreakup=!1;return}this.payrollService.listContracts({employee_id:a.id}).pipe(z(this.destroy$)).subscribe({next:l=>{let s=Array.isArray(l)?l.find(b=>(b.status||"").toLowerCase()==="active"):null,f=Array.isArray(l)&&l.length>0?l[0]:null,u=s||f;u?(this.currentContractCtc=Number(u.annual_ctc||0),this.taxComputation&&(this.taxComputation.contract_ctc=this.currentContractCtc,this.taxComputation.gross_annual_income=Number(this.taxComputation.contract_ctc||this.taxComputation.gross_annual_income||0)),this.payrollService.getTemplateComposition(u.template_id).pipe(z(this.destroy$)).subscribe({next:b=>{this.payrollService.getPayrollComponents().pipe(z(this.destroy$)).subscribe({next:O=>{let k=Array.isArray(O)?O:O.data||[],v=(b||[]).map(h=>{let g=k.find(S=>S.component_id===(h.master_component_id||h.component_id));return{code:h.component_code||g?.code||g?.component_code,name:h.component_name||g?.name||g?.component_name,value:h.formula_or_value,calculation_type:h.calculation_type||g?.calculation_type,percentage_of_code:h.percentage_of_code||g?.percentage_of_code||g?.base_code||null,component_type:h.component_type||g?.type||g?.component_type,sequence:h.sequence||g?.sequence}});this.calculateMonthlyGrid(u.annual_ctc,v),this.isLoadingBreakup=!1},error:()=>{this.isLoadingBreakup=!1}})},error:()=>{this.isLoadingBreakup=!1}})):this.isLoadingBreakup=!1},error:()=>{this.isLoadingBreakup=!1}})},error:()=>{this.isLoadingBreakup=!1}})}calculateMonthlyGrid(a,l){let s=Number(a)||0,f={CTC:s},u=[...l].sort((g,S)=>(g.sequence||0)-(S.sequence||0)),b=(g,S=[])=>{let d=(g.code||"").toUpperCase();if(d&&S.includes(d))return 0;let _=d?[...S,d]:S;if(g.calculation_type==="FIXED")return Number(g.value)||0;let w=String(g.value||"0").trim();if(g.calculation_type==="PERCENTAGE"||w.includes("%")){let B=parseFloat(w.replace(/[^0-9.]/g,""));if(isNaN(B))return 0;let A=(g.percentage_of_code||g.base_code||g.base_component||"").toUpperCase();if((!A||A==="-")&&w.toUpperCase().includes("OF ")){let I=w.toUpperCase().split("OF ");A=I[I.length-1].trim()}if((A==="GROSS"||A===d)&&(A="CTC"),A&&A!=="CTC"&&A!=="-"){let I=l.find(F=>(F.code||"").toUpperCase()===A||(F.name||"").toUpperCase()===A);if(I)return B/100*b(I,_)}return B/100*s}return Number(g.value)||0};u.forEach(g=>{f[g.code]=b(g)});let O=(g,S)=>{let d=(g||"").toUpperCase(),_=(S||"").toUpperCase();return d==="SPECIAL_ALLOWANCE"||d==="SA"||_.includes("SPECIAL ALLOWANCE")},k=u.find(g=>O(g.code,g.name));if(k){let g=0,S=0;u.forEach(d=>{if(d!==k){let _=(d.code||"").toUpperCase(),w=(d.name||"").toUpperCase(),T=_.includes("EMPLOYER")||w.includes("EMPLOYER")||_.includes("EMPLOYEER")||w.includes("EMPLOYEER")||_.includes("_ER");d.component_type?.toUpperCase()==="EARNING"&&!T?g+=f[d.code]||0:(T||_.includes("PF_")||_.includes("ESI_"))&&(S+=f[d.code]||0)}}),f[k.code]=Math.max(0,s-g-S)}this.breakupRows=[],this.totalRow={name:"Total Earnings",values:[],total:0},this.employerShareTotal=0,u.forEach(g=>{let S=(g.code||"").toUpperCase(),d=(g.name||"").toUpperCase(),_=S.includes("EMPLOYER")||d.includes("EMPLOYER")||S.includes("EMPLOYEER")||d.includes("EMPLOYEER")||S.includes("_ER"),w=g.component_type?.toUpperCase()==="EARNING",T=_&&(S.includes("PF")||d.includes("PF")||d.includes("Provident"));if(w&&!_||T){let B=Math.round(f[g.code]||0);if(B===0&&!T)return;let A=Math.round(B/12),I={name:g.name,values:new Array(12).fill(A),total:B,isER:_};this.breakupRows.push(I),T&&(this.employerShareTotal+=B)}});let v=new Map;this.breakupRows.forEach(g=>v.set(g.name,g)),this.breakupRows=Array.from(v.values());let h=0;for(let g=0;g<12;g++){let S=0;this.breakupRows.forEach(d=>S+=d.values[g]),this.totalRow.values.push(S),h+=S}this.totalRow.total=h,this.employerPfAnnual=this.employerShareTotal,!this.employerPf&&this.employerPfAnnual>0&&(this.employerPf=this.employerPfAnnual)}getEmployerPfValue(){return Math.max(0,Number(this.employerPf||this.employerPfAnnual||0))}loadTaxData(){this.isLoadingTax=!0,this.payrollApi.getTaxComputation(this.financialYear).pipe(z(this.destroy$)).subscribe({next:a=>{this.taxComputation=a,this.taxComputation&&(this.currentContractCtc>0&&(this.taxComputation.contract_ctc=this.currentContractCtc),this.taxComputation.gross_annual_income=Number(this.taxComputation.contract_ctc||this.taxComputation.gross_annual_income||0)),this.taxComputation&&this.taxComputation.cess&&(this.taxComputation.total_tax_liability=(this.taxComputation.total_tax_liability||0)-(this.taxComputation.cess||0),this.taxComputation.cess=0),this.taxComputation&&this.taxComputation.taxable_income&&(this.employerPf>0&&(this.taxComputation.taxable_income-=this.employerPf),this.taxComputation.regime_type==="OLD"&&this.professionalTax>0&&(this.taxComputation.taxable_income-=this.professionalTax),this.taxComputation.taxable_income=Math.max(0,this.taxComputation.taxable_income)),this.isLoadingTax=!1,this.loadSlabsAndCalculate(),this.updateStandardDeduction()},error:()=>{this.isLoadingTax=!1}}),this.payrollApi.getStandardDeductions(this.financialYear).pipe(z(this.destroy$)).subscribe({next:a=>{this.standardDeductionsList=a.deductions||[],this.updateStandardDeduction()},error:()=>{}}),this.payrollApi.getMyTaxSummary(this.financialYear).pipe(z(this.destroy$)).subscribe({next:a=>{this.taxSummary=a,this.calculateBreakdown()},error:()=>{}})}loadSlabsAndCalculate(){this.taxComputation&&this.payrollApi.getTaxSlabs(this.financialYear).pipe(z(this.destroy$)).subscribe({next:a=>{let s=(Array.isArray(a)?a:a.slabs||[]).filter(u=>u.regime_type===this.taxComputation.regime_type),f=new Map;s.forEach(u=>{let b=`${u.min_income}-${u.max_income}`;f.set(b,u)}),s=Array.from(f.values()),this.taxSlabs=s,this.taxSlabs.length===0&&(this.taxSlabs=this.getFallbackSlabs(this.taxComputation.regime_type)),this.calculateBreakdown()},error:()=>{this.taxSlabs=this.getFallbackSlabs(this.taxComputation.regime_type),this.calculateBreakdown()}})}getFallbackSlabs(a){return a==="NEW"?[{min_income:0,max_income:4e5,rate:0,cess_rate:4},{min_income:4e5,max_income:8e5,rate:5,cess_rate:4},{min_income:8e5,max_income:12e5,rate:10,cess_rate:4},{min_income:12e5,max_income:16e5,rate:15,cess_rate:4},{min_income:16e5,max_income:2e6,rate:20,cess_rate:4},{min_income:2e6,max_income:24e5,rate:25,cess_rate:4},{min_income:24e5,max_income:999999999,rate:30,cess_rate:4}]:[{min_income:0,max_income:25e4,rate:0,cess_rate:4},{min_income:25e4,max_income:5e5,rate:5,cess_rate:4},{min_income:5e5,max_income:1e6,rate:20,cess_rate:4},{min_income:1e6,max_income:999999999,rate:30,cess_rate:4}]}calculateBreakdown(){let a=this.getTaxableIncomeFromAllHeads();this.taxBreakdown=[];let l=0;this.taxSlabs.sort((f,u)=>f.min_income-u.min_income).forEach(f=>{let u=Number(f.min_income),b=Number(f.max_income),O=Number(f.rate),k=Number(f.cess_rate||0),v=0;a>u&&(v=Math.min(a,b)-u);let h=v*O/100;l+=h,this.taxBreakdown.push({label:O===0?`0% Tax on income up to ${b}`:`${O}% Tax on income between ${u+1} and ${b>1e7?"above":b}`,taxAmount:h,min:u,max:b,rate:O,cess:k})});let s=this.taxComputation.regime_type==="NEW"?12e5:5e5;a<=s?this.rebate87A=l:this.rebate87A=0,this.grossIncomeTax=Math.max(0,l-this.rebate87A),this.totalSurcharge=this.taxComputation?.surcharge||0,this.totalCess=Math.round((this.grossIncomeTax+this.totalSurcharge)*.04),this.netTaxPayable=Math.round(this.grossIncomeTax+this.totalSurcharge+this.totalCess),this.remainingTax=Math.max(0,this.netTaxPayable-this.taxPaidTillNow),this.monthlyTaxValue=Math.round(this.remainingTax/12),this.taxComputation&&(this.taxComputation.gross_income_tax_final=this.grossIncomeTax,this.taxComputation.total_surcharge_cess=this.totalSurcharge+this.totalCess,this.taxComputation.net_tax_payable=this.netTaxPayable,this.taxComputation.tax_paid_till_now=this.taxPaidTillNow,this.taxComputation.remaining_tax=this.remainingTax,this.taxComputation.total_tax_liability=this.netTaxPayable,this.taxComputation.monthly_tds=Math.round(this.remainingTax/12))}getGrossEarnings(){if(!this.taxComputation)return 0;let a=Number(this.currentContractCtc||this.taxComputation.contract_ctc||this.taxComputation.gross_annual_income||0);return Math.max(0,a-this.getEmployerPfValue())}updateStandardDeduction(){if(this.taxComputation&&this.standardDeductionsList.length>0){let a=this.taxComputation.regime_type||"NEW",l=this.standardDeductionsList.find(s=>s.regime_type===a);l&&(this.standardDeductionAmount=Number(l.amount),this.taxComputation.standard_deduction=this.standardDeductionAmount)}}getTaxableIncomeFromAllHeads(){if(!this.taxComputation)return 0;let a=this.getGrossEarnings(),l=this.taxComputation.standard_deduction||this.standardDeductionAmount||0;return l>0&&(a-=l),this.taxComputation.regime_type==="OLD"&&this.professionalTax>0&&(a-=this.professionalTax),Math.max(0,a)}formatCurrency(a){return(a||0).toLocaleString("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0})}getProgressBarColor(a){return a>80?"#ef4444":a>50?"#f59e0b":"#10b981"}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};c.\u0275fac=function(l){return new(l||c)(R(Z),R(nn),R(Q))},c.\u0275cmp=$({type:c,selectors:[["app-taxation"]],inputs:{financialYear:"financialYear",professionalTax:"professionalTax",employerPf:"employerPf"},standalone:!1,decls:4,vars:3,consts:[[1,"taxation-dashboard"],["class","tax-loader",4,"ngIf"],["class","tax-scroll-container",4,"ngIf"],["class","empty-tax-state",4,"ngIf"],[1,"tax-loader"],["name","crescent"],[1,"tax-scroll-container"],[1,"tax-summary-grid"],[1,"summary-card"],[1,"summary-icon-wrapper"],["src","assets/taxable.png",1,"section-icon","blue"],[1,"summary-text-wrapper"],[1,"value"],["src","assets/gross.png",1,"section-icon","blue"],["src","assets/cess.png",1,"section-icon","blue"],["src","assets/dollar.png",1,"section-icon","blue"],["src","assets/taxdue.png",1,"section-icon","blue"],[1,"tax-section-card","glass-card"],[1,"section-head"],["name","list-outline",1,"section-icon","blue"],[1,"earnings-legend"],[1,"legend-item"],[1,"sq","prev"],[1,"sq","current"],[1,"sq","projected"],[1,"monthly-table-wrapper"],[1,"monthly-breakup-table"],[1,"sticky-col"],[1,"text-right"],["class","text-right",4,"ngFor","ngForOf"],[3,"total-row-style",4,"ngFor","ngForOf"],[1,"grand-total-row"],[1,"employer-share-section"],[1,"share-row"],[1,"share-label"],[1,"view-details"],[1,"share-value"],[1,"share-row","total-share"],["name","analytics-outline",1,"section-icon","blue"],[1,"regime-badge"],[1,"structured-breakdown"],[1,"breakdown-group-header"],["name","document-text-outline",1,"section-icon","blue"],[1,"breakdown-subgroup"],[1,"breakdown-subgroup-header"],[1,"tax-row","sub-row"],[1,"label"],["class","tax-row sub-row",4,"ngIf"],[1,"tax-row","sub-row","bold-row"],["class","breakdown-section-title",4,"ngIf"],["class","tax-row exemption-row",4,"ngIf"],["class","tax-row exemption-row bold-row",4,"ngIf"],[1,"tax-row","bold-row","highlight-blue"],["class","tax-row",4,"ngIf"],[1,"tax-progress-bar"],[1,"progress-label"],[1,"progress-track"],[1,"progress-fill"],["name","cash-outline",1,"section-icon","blue"],[1,"structured-breakdown",2,"margin-bottom","0"],[1,"tax-row"],[1,"tax-row","highlight-blue","bold-row"],["class","tax-section-card glass-card",4,"ngIf"],["name","bar-chart-outline",1,"section-icon","green"],[1,"tax-row","highlight-green","bold-row"],["name","person-outline",1,"section-icon","blue"],[1,"label-badge","blue"],[1,"label-badge","orange"],["name","calendar-outline",1,"section-icon","orange"],[1,"tax-row","highlight-orange","bold-row"],["name","calendar-clear-outline",1,"section-icon","blue"],[1,"earnings-legend",2,"border-bottom","none","padding-bottom","0","margin-bottom","8px"],[1,"table-footnote"],["routerLink","/MyTax",1,"edit-declarations-btn"],[1,"investment-grid"],[1,"investment-box"],[1,"inv-title"],[1,"inv-value"],[1,"pending-upload-alert"],["name","alert-circle-outline"],[1,"portal-cta-mini"],["routerLink","/MyTax",1,"portal-cta-button"],["name","arrow-forward-outline","slot","end"],[1,"status-dot"],[1,"value","negative"],[1,"breakdown-section-title"],[1,"tax-row","exemption-row"],[1,"outline-pill"],[1,"tax-row","exemption-row","bold-row"],["name","calculator-outline",1,"section-icon","blue"],[1,"calc-header-row"],["class","tax-row",4,"ngFor","ngForOf"],[1,"empty-tax-state"],["name","refresh-circle-outline"],[3,"click"]],template:function(l,s){l&1&&(n(0,"div",0),E(1,et,4,0,"div",1)(2,bt,283,66,"div",2)(3,ht,8,0,"div",3),t()),l&2&&(i(),x("ngIf",s.isLoadingTax),i(),x("ngIf",!s.isLoadingTax&&s.taxComputation),i(),x("ngIf",!s.isLoadingTax&&!s.taxComputation))},dependencies:[V,G,q,X,J,K,W,H],styles:[`

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
.taxation-dashboard[_ngcontent-%COMP%] {
  padding: 32px 24px;
  background: #f4f7fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-loader[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-loader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-top: 16px;
  color: #475569;
  font-weight: 500;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-loader[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  --color: #1F74BB;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-scroll-container[_ngcontent-%COMP%] {
  width: 100%;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-summary-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
}
@media (max-width: 1024px) {
  .taxation-dashboard[_ngcontent-%COMP%]   .tax-summary-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .taxation-dashboard[_ngcontent-%COMP%]   .tax-summary-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .taxation-dashboard[_ngcontent-%COMP%]   .tax-summary-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.taxation-dashboard[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.taxation-dashboard[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.taxation-dashboard[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-icon-wrapper[_ngcontent-%COMP%] {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1F74BB;
  flex-shrink: 0;
  border-radius: 6px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-text-wrapper[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.taxation-dashboard[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-text-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 2px;
  text-transform: capitalize;
  display: block;
}
.taxation-dashboard[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-text-wrapper[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 24px;
  width: 100%;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .section-icon.blue[_ngcontent-%COMP%] {
  color: #2563eb;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .section-icon.green[_ngcontent-%COMP%] {
  color: #16a34a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .section-icon.orange[_ngcontent-%COMP%] {
  color: #ea580c;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  flex: 1;
  letter-spacing: -0.05em;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .regime-badge[_ngcontent-%COMP%] {
  background: #0f172a;
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 11px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .edit-declarations-btn[_ngcontent-%COMP%] {
  background: #ffffff;
  color: #334155;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.taxation-dashboard[_ngcontent-%COMP%]   .glass-card[_ngcontent-%COMP%]   .section-head[_ngcontent-%COMP%]   .edit-declarations-btn[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%] {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  background: #ffffff;
  margin-bottom: 20px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-group-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-group-header[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #2563eb;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-group-header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #0f172a;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-subgroup[_ngcontent-%COMP%] {
  padding: 0;
  border-bottom: 1px solid #e2e8f0;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-subgroup[_ngcontent-%COMP%]:last-of-type {
  border-bottom: none;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-subgroup[_ngcontent-%COMP%]   .breakdown-subgroup-header[_ngcontent-%COMP%] {
  padding: 10px 16px 10px 24px;
  background: #fdfdfd;
  border-bottom: 1px solid #f1f5f9;
  font-size: 12px;
  color: #475569;
  font-weight: 600;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-section-title[_ngcontent-%COMP%] {
  padding: 12px 16px 8px 32px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .breakdown-section-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .structured-breakdown[_ngcontent-%COMP%]   .calc-header-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
  color: #334155;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 600;
  text-align: right;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row[_ngcontent-%COMP%]   .value.negative[_ngcontent-%COMP%] {
  color: #dc2626;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.sub-row[_ngcontent-%COMP%] {
  padding-left: 32px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.sub-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-weight: 400;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.sub-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 500;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.sub-row.bold-row[_ngcontent-%COMP%] {
  background: #fdfdfd;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.sub-row.bold-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.sub-row.bold-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.exemption-row[_ngcontent-%COMP%] {
  padding-left: 48px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.exemption-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-weight: 400;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.exemption-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 500;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.exemption-row.bold-row[_ngcontent-%COMP%] {
  background: #fdfdfd;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.exemption-row.bold-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.exemption-row.bold-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-blue[_ngcontent-%COMP%] {
  background: #eff6ff;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-blue[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #2563eb;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-blue[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #2563eb;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-green[_ngcontent-%COMP%] {
  background: #f0fdf4;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-green[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #16a34a;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-green[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #16a34a;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-orange[_ngcontent-%COMP%] {
  background: #fffbeb;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-orange[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #ea580c;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.highlight-orange[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  color: #ea580c;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.bold-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-row.bold-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .outline-pill[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 600;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: capitalize;
}
.taxation-dashboard[_ngcontent-%COMP%]   .label-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  color: #ffffff;
}
.taxation-dashboard[_ngcontent-%COMP%]   .label-badge.blue[_ngcontent-%COMP%] {
  background: #2563eb;
}
.taxation-dashboard[_ngcontent-%COMP%]   .label-badge.orange[_ngcontent-%COMP%] {
  background: #ea580c;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-progress-bar[_ngcontent-%COMP%] {
  margin-top: 16px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-progress-bar[_ngcontent-%COMP%]   .progress-label[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-progress-bar[_ngcontent-%COMP%]   .progress-track[_ngcontent-%COMP%] {
  height: 6px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}
.taxation-dashboard[_ngcontent-%COMP%]   .tax-progress-bar[_ngcontent-%COMP%]   .progress-track[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .investment-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}
@media (max-width: 768px) {
  .taxation-dashboard[_ngcontent-%COMP%]   .investment-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.taxation-dashboard[_ngcontent-%COMP%]   .investment-box[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
}
.taxation-dashboard[_ngcontent-%COMP%]   .investment-box[_ngcontent-%COMP%]   .inv-title[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
}
.taxation-dashboard[_ngcontent-%COMP%]   .investment-box[_ngcontent-%COMP%]   .inv-value[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .pending-upload-alert[_ngcontent-%COMP%] {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b45309;
  font-size: 12px;
  font-weight: 600;
}
.taxation-dashboard[_ngcontent-%COMP%]   .pending-upload-alert[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #ea580c;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
  margin-bottom: 16px;
  -webkit-overflow-scrolling: touch;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {
  height: 6px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: transparent;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  min-width: 1000px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], 
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 12px 14px;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #f1f5f9;
  white-space: nowrap;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, 
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
  border-right: none;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   th.text-right[_ngcontent-%COMP%], 
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   td.text-right[_ngcontent-%COMP%] {
  text-align: right;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #f8fafc;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  color: #334155;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {
  border-bottom: none;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   .sticky-col[_ngcontent-%COMP%] {
  position: sticky;
  left: 0;
  background: #ffffff;
  text-align: left;
  font-weight: 600;
  color: #0f172a;
  border-right: 2px solid #cbd5e1;
  z-index: 2;
  width: 160px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  background: #f8fafc;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td.sticky-col[_ngcontent-%COMP%] {
  background: #f8fafc;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   .total-row-style[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
  background: #fafafa;
}
.taxation-dashboard[_ngcontent-%COMP%]   .monthly-table-wrapper[_ngcontent-%COMP%]   table.monthly-breakup-table[_ngcontent-%COMP%]   .grand-total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  font-weight: 800;
  color: #0f172a;
  background: #f8fafc;
  border-top: 2px solid #cbd5e1;
}
.taxation-dashboard[_ngcontent-%COMP%]   .earnings-legend[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 16px;
  padding-bottom: 12px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .earnings-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
}
.taxation-dashboard[_ngcontent-%COMP%]   .earnings-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .sq[_ngcontent-%COMP%] {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .earnings-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .sq.prev[_ngcontent-%COMP%] {
  background: #3b82f6;
}
.taxation-dashboard[_ngcontent-%COMP%]   .earnings-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .sq.current[_ngcontent-%COMP%] {
  background: #f97316;
}
.taxation-dashboard[_ngcontent-%COMP%]   .earnings-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .sq.projected[_ngcontent-%COMP%] {
  background: #22c55e;
}
.taxation-dashboard[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%] {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-left: 4px;
  vertical-align: middle;
}
.taxation-dashboard[_ngcontent-%COMP%]   .status-dot.imported[_ngcontent-%COMP%] {
  background: #f97316;
}
.taxation-dashboard[_ngcontent-%COMP%]   .status-dot.projected[_ngcontent-%COMP%] {
  background: #22c55e;
}
.taxation-dashboard[_ngcontent-%COMP%]   .table-footnote[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-style: italic;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%] {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 12px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row[_ngcontent-%COMP%]   .share-label[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #475569;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row[_ngcontent-%COMP%]   .share-label[_ngcontent-%COMP%]   .view-details[_ngcontent-%COMP%] {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row[_ngcontent-%COMP%]   .share-label[_ngcontent-%COMP%]   .view-details[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row[_ngcontent-%COMP%]   .share-value[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row.total-share[_ngcontent-%COMP%] {
  border-top: 1px solid #f1f5f9;
  margin-top: 4px;
  padding-top: 12px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row.total-share[_ngcontent-%COMP%]   .share-label[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
}
.taxation-dashboard[_ngcontent-%COMP%]   .employer-share-section[_ngcontent-%COMP%]   .share-row.total-share[_ngcontent-%COMP%]   .share-value[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #2563eb;
  font-weight: 700;
}
.taxation-dashboard[_ngcontent-%COMP%]   .portal-cta-mini[_ngcontent-%COMP%] {
  text-align: center;
  margin-top: 32px;
  margin-bottom: 16px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .portal-cta-mini[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 12px;
  font-weight: 500;
}
.taxation-dashboard[_ngcontent-%COMP%]   .portal-cta-mini[_ngcontent-%COMP%]   .portal-cta-button[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #ffffff;
  --border-radius: 6px;
  --padding-start: 24px;
  --padding-end: 24px;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
}
.taxation-dashboard[_ngcontent-%COMP%]   .empty-tax-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 80px 24px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .empty-tax-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #cbd5e1;
  margin-bottom: 16px;
  display: block;
  margin: 0 auto;
}
.taxation-dashboard[_ngcontent-%COMP%]   .empty-tax-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 6px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .empty-tax-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 24px;
}
.taxation-dashboard[_ngcontent-%COMP%]   .empty-tax-state[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}`]});let r=c;return r})();function Pt(r,c){if(r&1&&(n(0,"ion-select-option",36),o(1),t()),r&2){let e=c.$implicit;x("value",e),i(),P("Year ",e)}}function Mt(r,c){if(r&1){let e=Y();n(0,"button",37),M(1,"number"),D("click",function(){let l=L(e).$implicit,s=C(2);return N(s.selectMonth(l))}),o(2),t()}if(r&2){let e=c.$implicit,a=C(2);U("selected-month",a.selectedMonthStr===e.year+"-"+y(1,4,e.month,"2.0-0")),i(2),un(" ",a.getMonthName(e.month)," ",e.year," ")}}function yt(r,c){r&1&&(n(0,"div",38),o(1," No payslips found "),t())}function Ot(r,c){r&1&&(n(0,"div",39),m(1,"ion-spinner",40),n(2,"p"),o(3,"Loading details..."),t()())}function vt(r,c){if(r&1&&(n(0,"tr")(1,"td",80),o(2),t(),n(3,"td",81),o(4),M(5,"number"),t(),n(6,"td",81),o(7),M(8,"number"),t()()),r&2){let e=c.$implicit;i(2),p(e.name),i(2),P("\u20B9",y(5,3,e.paid,"1.0-0")),i(3),P("\u20B9",y(8,6,e.actual,"1.0-0"))}}function wt(r,c){if(r&1&&(n(0,"tr")(1,"td",80),o(2),t(),n(3,"td",81),o(4),M(5,"number"),t()()),r&2){let e=c.$implicit;i(2),p(e.name),i(2),P("\u20B9",y(5,2,e.paid,"1.0-0"))}}function Et(r,c){if(r&1&&(n(0,"tr")(1,"td",80),o(2),t(),n(3,"td",81),o(4),M(5,"number"),t()()),r&2){let e=c.$implicit;i(2),p(e.name),i(2),P("\u20B9",y(5,2,e.paid,"1.0-0"))}}function St(r,c){if(r&1){let e=Y();n(0,"div",43)(1,"div",44)(2,"div",45)(3,"div",46)(4,"div",47)(5,"span",48),o(6,"Payslip"),t(),n(7,"span",49),m(8,"img",50),o(9," Generated "),t()(),n(10,"span",51),o(11),M(12,"date"),t()(),n(13,"div",52)(14,"button",53),D("click",function(){L(e);let l=C(3);return N(l.downloadPayslip())}),m(15,"img",54),o(16," Download PDF "),t()()(),n(17,"div",55)(18,"div",56)(19,"h3",57),o(20,"Sree Tammina Software solutions Pvt. Ltd."),t(),n(21,"p",58),o(22," #49-24-64,Sri venkata Sai Towers,3rd Floor,, Sankaramata"),m(23,"br"),o(24," Road,Madhurnagar, Viskhapatnam, Andhra Pradesh,"),m(25,"br"),o(26," 530016. "),t()(),n(27,"div",59),m(28,"img",60),t()(),n(29,"div",61)(30,"div",62),m(31,"ion-icon",63),t(),n(32,"span",64),o(33,"Employee Details"),t()(),n(34,"div",65)(35,"div",66)(36,"span",67),o(37,"Employee Name"),t(),n(38,"span",68),o(39),t()(),n(40,"div",66)(41,"span",67),o(42,"Employee ID"),t(),n(43,"span",68),o(44),t()(),n(45,"div",66)(46,"span",67),o(47,"Department"),t(),n(48,"span",68),o(49),t()(),n(50,"div",66)(51,"span",67),o(52,"Designation"),t(),n(53,"span",68),o(54),t()(),n(55,"div",66)(56,"span",67),o(57,"Date Joined"),t(),n(58,"span",68),o(59),M(60,"date"),t()(),n(61,"div",66)(62,"span",67),o(63,"Payment Mode"),t(),n(64,"span",68),o(65,"Bank Transfer (NEFT)"),t()(),n(66,"div",66)(67,"span",67),o(68,"Bank Name"),t(),n(69,"span",68),o(70),t()(),n(71,"div",66)(72,"span",67),o(73,"Bank Account"),t(),n(74,"span",68),o(75),t()(),n(76,"div",66)(77,"span",67),o(78,"IFSC"),t(),n(79,"span",68),o(80),t()(),n(81,"div",66)(82,"span",67),o(83,"PAN"),t(),n(84,"span",68),o(85),t()(),n(86,"div",66)(87,"span",67),o(88,"UAN"),t(),n(89,"span",68),o(90),t()(),n(91,"div",66)(92,"span",67),o(93,"PF Number"),t(),n(94,"span",68),o(95),t()(),n(96,"div",66)(97,"span",67),o(98,"ESI Number"),t(),n(99,"span",68),o(100),t()(),n(101,"div",66)(102,"span",67),o(103,"Monthly Salary"),t(),n(104,"span",68),o(105),M(106,"number"),t()()(),n(107,"div",61)(108,"div",69),m(109,"ion-icon",70),t(),n(110,"span",64),o(111,"Attendance Summary"),t()(),n(112,"div",71)(113,"div",72)(114,"span",73),o(115,"Working Days"),t(),n(116,"span",74),o(117),t()(),n(118,"div",72)(119,"span",73),o(120,"Payable Days"),t(),n(121,"span",74),o(122),t()(),n(123,"div",72)(124,"span",73),o(125,"Present Days"),t(),n(126,"span",74),o(127),t()(),n(128,"div",72)(129,"span",73),o(130,"Loss of Pay"),t(),n(131,"span",75),o(132),t()()(),n(133,"div",76)(134,"div",77)(135,"div",78)(136,"table",79)(137,"thead")(138,"tr")(139,"th",80),o(140,"Earnings"),t(),n(141,"th",81),o(142,"Paid Amount"),t(),n(143,"th",81),o(144,"Actual Amount"),t()()(),n(145,"tbody"),E(146,vt,9,9,"tr",82),t(),n(147,"tfoot")(148,"tr",83)(149,"td",80),o(150,"Total Earnings (A)"),t(),n(151,"td",81),o(152),M(153,"number"),t(),n(154,"td",81),o(155),M(156,"number"),t()()()()()(),n(157,"div",77)(158,"div",84)(159,"table",79)(160,"thead")(161,"tr")(162,"th",80),o(163,"Contributions"),t(),n(164,"th",81),o(165,"Amount"),t()()(),n(166,"tbody"),E(167,wt,6,5,"tr",82),t(),n(168,"tfoot")(169,"tr",83)(170,"td",80),o(171,"Total Contributions (B)"),t(),n(172,"td",81),o(173),M(174,"number"),t()()()()(),n(175,"div",78)(176,"table",79)(177,"thead")(178,"tr")(179,"th",80),o(180,"Taxes & Deduction"),t(),n(181,"th",81),o(182,"Amount"),t()()(),n(183,"tbody"),E(184,Et,6,5,"tr",82),t(),n(185,"tfoot")(186,"tr",83)(187,"td",80),o(188,"Total Taxes & Deduction (C)"),t(),n(189,"td",81),o(190),M(191,"number"),t()()()()()()(),n(192,"div",85)(193,"div",86)(194,"span",87),o(195,"Net Salary Payable (A-B-C)"),t(),n(196,"span",88),o(197),M(198,"number"),t(),n(199,"span",89),o(200),t()(),n(201,"div",90),m(202,"img",91),t()(),n(203,"div",92)(204,"div",93)(205,"div",94),m(206,"ion-icon",95),n(207,"span",96),o(208,"System Generated Payslip"),t()(),n(209,"div",97)(210,"p",98),o(211,"**Note :"),t(),n(212,"ul")(213,"li"),o(214,"All amounts displayed in this payslip are in INR"),t(),n(215,"li"),o(216,"Paid Amount is the amount being paid after LOP adjustments"),t(),n(217,"li"),o(218,"Actual Amount is the amount as per the salary structure"),t()()()(),n(219,"div",99)(220,"span",100),o(221,"Generated on"),t(),n(222,"span",101),o(223),M(224,"date"),t()()()()()}if(r&2){let e=C(3);i(11),P("For ",y(12,28,e.selectedMonthStr,"MMMM yyyy")),i(28),p(e.currentEmployee==null?null:e.currentEmployee.FullName),i(5),p((e.currentEmployee==null?null:e.currentEmployee.EmployeeNumber)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.department_name)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.designation_name)||"-"),i(5),p(y(60,31,e.currentEmployee==null?null:e.currentEmployee.DateOfJoining,"dd MMM yyyy")),i(11),p((e.currentEmployee==null?null:e.currentEmployee.bank_name)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.AccountNumber)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.ifsc_code)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.PANNumber)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.uan_number)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.pf_number)||"-"),i(5),p((e.currentEmployee==null?null:e.currentEmployee.esi_number)||"\u2014"),i(5),P("\u20B9",y(106,34,e.monthlySalary,"1.0-0")),i(12),p(e.totalWorkingDays),i(5),p(e.daysPayable),i(5),p(e.actualPayableDays),i(5),p(e.lopDays),i(14),x("ngForOf",e.earnings),i(6),P("\u20B9",y(153,37,e.totalEarnings,"1.0-0")),i(3),P("\u20B9",y(156,40,e.totalActualEarnings,"1.0-0")),i(12),x("ngForOf",e.contributions),i(6),P("\u20B9",y(174,43,e.totalContributions,"1.0-0")),i(11),x("ngForOf",e.taxes),i(6),P("\u20B9",y(191,46,e.totalTaxes,"1.0-0")),i(7),P("\u20B9",y(198,49,e.netSalary,"1.0-0")),i(3),P("In Words: ",e.netSalaryInWords),i(23),P("",y(224,52,e.selectedMonthStr,"dd MMM yyyy, hh:mm a")," IST")}}function kt(r,c){if(r&1&&(n(0,"div",102)(1,"div",103)(2,"div",104),m(3,"img",105),t(),n(4,"h2"),o(5,"Your payslip is not generated"),t(),n(6,"p"),o(7),M(8,"date"),t(),n(9,"button",106),o(10,"Notify me"),t()()()),r&2){let e=C(3);i(7),P("The payroll for ",y(8,1,e.selectedMonthStr,"MMMM yyyy")," is currently under process or has not been finalized yet. Please check back later.")}}function Tt(r,c){if(r&1&&(gn(0),E(1,St,225,55,"div",41)(2,kt,11,4,"div",42),xn()),r&2){let e=C(2);i(),x("ngIf",e.isPayslipGenerated),i(),x("ngIf",!e.isPayslipGenerated)}}function It(r,c){if(r&1){let e=Y();n(0,"div",20)(1,"ion-grid",21)(2,"ion-row")(3,"ion-col",22)(4,"div",23)(5,"div",24)(6,"div",25),o(7,"FILTER"),t(),n(8,"div",26),m(9,"ion-icon",27),n(10,"ion-select",28),hn("ngModelChange",function(l){L(e);let s=C();return bn(s.selectedYear,l)||(s.selectedYear=l),N(l)}),D("ionChange",function(){L(e);let l=C();return N(l.onYearChange())}),E(11,Pt,2,2,"ion-select-option",29),t()()(),n(12,"div",30),o(13,"PAYSLIPS"),t(),n(14,"div",31),E(15,Mt,3,7,"button",32)(16,yt,2,0,"div",33),t()()(),n(17,"ion-col",34),E(18,Ot,4,0,"div",35)(19,Tt,3,2,"ng-container",16),t()()()()}if(r&2){let e=C();i(10),_n("ngModel",e.selectedYear),i(),x("ngForOf",e.availableYears),i(4),x("ngForOf",e.availableMonths),i(),x("ngIf",e.availableMonths.length===0),i(2),x("ngIf",e.loading),i(),x("ngIf",!e.loading)}}function At(r,c){if(r&1&&(n(0,"div"),m(1,"app-taxation",107),t()),r&2){let e=C();i(),x("financialYear",e.financialYear)("professionalTax",e.professionalTaxAmount)("employerPf",e.employerPfAmount)}}function Bt(r,c){r&1&&(n(0,"div",118),m(1,"ion-icon",119),n(2,"h3"),o(3,"No Contracts Found"),t(),n(4,"p"),o(5,"We couldn't find any salary contracts for you."),t()())}function zt(r,c){if(r&1){let e=Y();n(0,"div",120)(1,"div",121)(2,"div",122)(3,"span",123),o(4,"ANNUAL CTC"),t(),n(5,"div",124)(6,"span",125),o(7,"\u20B9"),t(),n(8,"span",126),o(9),t(),n(10,"span",127),o(11),t()()(),n(12,"div",128)(13,"span",129),m(14,"ion-icon",130),o(15," Current "),t()()(),m(16,"div",131),n(17,"div",132)(18,"div",133)(19,"span",123),o(20,"Effective Date"),t(),n(21,"span",134),o(22),M(23,"date"),t()(),n(24,"div",133)(25,"span",123),o(26,"Status"),t(),n(27,"span",135),m(28,"span",136),o(29),t()(),n(30,"div",133)(31,"span",123),o(32,"Template"),t(),n(33,"span",134),o(34),t()(),n(35,"div",137)(36,"button",138),D("click",function(){L(e);let l=C(2);return N(l.openBreakupModal(l.activeContractItem))}),m(37,"ion-icon",119),o(38," View Salary Breakup "),t()()()()}if(r&2){let e=C(2);i(9),p(e.formatAnnualCTC(e.activeContractItem.annual_ctc).integer.replace("\u20B9","")),i(2),p(e.formatAnnualCTC(e.activeContractItem.annual_ctc).decimal),i(11),p(y(23,7,e.activeContractItem.effective_from,"MMM dd, yyyy")),i(6),U("green",(e.activeContractItem.status==null?null:e.activeContractItem.status.toLowerCase())==="active"),i(),P(" ",e.activeContractItem.status," "),i(5),p(e.activeContractItem.template_name||"Standard Employee Package")}}function Ft(r,c){r&1&&(n(0,"div",143)(1,"p"),o(2,"No previous revisions to display."),t()())}function Dt(r,c){if(r&1){let e=Y();n(0,"div",146)(1,"div",147)(2,"div",148)(3,"span",123),o(4,"ANNUAL CTC"),t(),n(5,"span",134),o(6),t()(),n(7,"div",149)(8,"span",123),o(9,"Effective Date"),t(),n(10,"span",134),o(11),M(12,"date"),t()(),n(13,"div",149)(14,"span",123),o(15,"Status"),t(),n(16,"span",134),m(17,"span",136),o(18),t()(),n(19,"div",149)(20,"span",123),o(21,"Template"),t(),n(22,"span",134),o(23),t()(),n(24,"div",150)(25,"button",151),D("click",function(){let l=L(e).$implicit,s=C(4);return N(s.openBreakupModal(l))}),m(26,"ion-icon",119),o(27," View Salary Breakup "),t()()()()}if(r&2){let e=c.$implicit,a=C(4);i(6),p(a.formatCurrency(e.annual_ctc)),i(5),p(y(12,6,e.effective_from,"MMM dd, yyyy")),i(6),U("green",(e.status==null?null:e.status.toLowerCase())==="active"),i(),P(" ",e.status," "),i(5),p(e.template_name||"Standard Employee Package")}}function Lt(r,c){if(r&1&&(n(0,"div",144),E(1,Dt,28,9,"div",145),t()),r&2){let e=C(3);i(),x("ngForOf",e.revisionHistoryItems)}}function Nt(r,c){if(r&1&&(n(0,"div",139)(1,"h4",140),o(2,"REVISION HISTORY"),t(),E(3,Ft,3,0,"div",141)(4,Lt,2,1,"div",142),t()),r&2){let e=C(2);i(3),x("ngIf",e.revisionHistoryItems.length===0),i(),x("ngIf",e.revisionHistoryItems.length>0)}}function Rt(r,c){if(r&1&&(n(0,"div",108)(1,"div",109)(2,"div",110)(3,"div",111)(4,"div",112),m(5,"img",113),t(),n(6,"div",114)(7,"h2"),o(8,"Salary Contracts & Revisions"),t(),n(9,"p"),o(10,"Review your historical and current compensation details."),t()()()(),E(11,Bt,6,0,"div",115)(12,zt,39,10,"div",116)(13,Nt,5,2,"div",117),t()()),r&2){let e=C();i(11),x("ngIf",e.employeeContracts.length===0),i(),x("ngIf",e.activeContractItem),i(),x("ngIf",e.employeeContracts.length>0)}}function Yt(r,c){if(r&1&&(n(0,"p"),o(1),M(2,"date"),t()),r&2){let e=C(2);i(),P("Effective: ",y(2,1,e.selectedContractDetails.effective_date,"MMM dd, yyyy"))}}function Ut(r,c){r&1&&(n(0,"div",159),m(1,"ion-spinner",160),n(2,"p",161),o(3,"Computing structural breakup..."),t()())}function jt(r,c){if(r&1&&(n(0,"div",178)(1,"span"),o(2),t(),n(3,"strong"),o(4),t()()),r&2){let e=c.$implicit,a=C(3);i(2),p(e.name),i(2),p(a.formatCurrency(e.actual))}}function $t(r,c){if(r&1&&(n(0,"div",178)(1,"span"),o(2),t(),n(3,"strong"),o(4),t()()),r&2){let e=c.$implicit,a=C(3);i(2),p(e.name),i(2),p(a.formatCurrency(e.actual))}}function Vt(r,c){if(r&1&&(n(0,"div",178)(1,"span"),o(2),t(),n(3,"strong"),o(4),t()()),r&2){let e=c.$implicit,a=C(3);i(2),p(e.name),i(2),p(a.formatCurrency(e.actual))}}function Gt(r,c){if(r&1&&(n(0,"div",162)(1,"div",163)(2,"div",164)(3,"label"),o(4,"Annual CTC"),t(),n(5,"h3"),o(6),t()(),n(7,"div",165)(8,"label"),o(9,"Estimated Monthly Net"),t(),n(10,"h3"),o(11),t()()(),n(12,"div",166)(13,"div",167)(14,"div",168),m(15,"ion-icon",169),o(16," Monthly Earnings "),t(),n(17,"div",170)(18,"span"),o(19,"COMPONENT"),t(),n(20,"span"),o(21,"AMOUNT"),t()(),E(22,jt,5,2,"div",171),n(23,"div",172)(24,"span"),o(25,"Total Gross Earnings (A)"),t(),n(26,"strong"),o(27),t()()(),n(28,"div",167)(29,"div",173),m(30,"ion-icon",174),o(31," Deductions & Taxes "),t(),n(32,"div",170)(33,"span"),o(34,"COMPONENT"),t(),n(35,"span"),o(36,"AMOUNT"),t()(),E(37,$t,5,2,"div",171)(38,Vt,5,2,"div",171),n(39,"div",175)(40,"span"),o(41,"Total Deductions (B)"),t(),n(42,"strong"),o(43),t()()()(),n(44,"div",176),m(45,"ion-icon",177),n(46,"p"),o(47,"Breakup is a projection based on the assigned template. Taxes may vary."),t()()()),r&2){let e=C(2);i(6),p(e.formatCurrency(e.selectedContractDetails.annual_ctc)),i(5),p(e.formatCurrency(e.selectedContractBreakup.netSalary)),i(11),x("ngForOf",e.selectedContractBreakup.earnings),i(5),p(e.formatCurrency(e.selectedContractBreakup.totalEarnings)),i(10),x("ngForOf",e.selectedContractBreakup.contributions),i(),x("ngForOf",e.selectedContractBreakup.taxes),i(5),p(e.formatCurrency(e.selectedContractBreakup.totalDeductions))}}function Ht(r,c){if(r&1){let e=Y();n(0,"div",152)(1,"div",153)(2,"div")(3,"h2"),o(4,"Salary Breakup"),t(),E(5,Yt,3,4,"p",16),t(),n(6,"button",154),D("click",function(){L(e);let l=C();return N(l.closeBreakupModal())}),m(7,"ion-icon",155),t()(),n(8,"div",156),E(9,Ut,4,0,"div",157)(10,Gt,48,7,"div",158),t()()}if(r&2){let e=C();i(5),x("ngIf",e.selectedContractDetails),i(4),x("ngIf",e.isLoadingBreakup),i(),x("ngIf",!e.isLoadingBreakup&&e.selectedContractBreakup)}}function Wt(r,c){r&1&&(n(0,"div",179),m(1,"ion-spinner",160),n(2,"p"),o(3,"Loading payslip details..."),t()())}var Jn=(()=>{let c=class c{get activeContractItem(){return this.employeeContracts.find(a=>a.status?.toLowerCase()==="active")||this.employeeContracts[0]}get revisionHistoryItems(){let a=this.activeContractItem;return a?this.employeeContracts.filter(l=>l!==a):[]}constructor(a,l,s,f,u){this.employeeService=a,this.payrollService=l,this.payrollApi=s,this.attendanceApi=f,this.loadingController=u,this.destroy$=new j,this.currentTab="payslips",this.loading=!0,this.actualPayableDays=0,this.totalWorkingDays=0,this.lopDays=0,this.daysPayable=0,this.payableDays=0,this.salaryTemplates=[],this.availableMonths=[],this.selectedMonthStr="",this.selectedYear=new Date().getFullYear(),this.availableYears=[],this.isPayslipGenerated=!1,this.professionalTaxAmount=0,this.employerPfAmount=0,this.monthlySalary=null,this.earnings=[],this.contributions=[],this.taxes=[],this.totalEarnings=0,this.totalActualEarnings=0,this.totalContributions=0,this.totalActualContributions=0,this.totalTaxes=0,this.totalActualTaxes=0,this.totalDeductions=0,this.totalActualDeductions=0,this.netSalary=0,this.netSalaryInWords="",this.ones=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],this.tens=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],this.employeeContracts=[],this.isBreakupModalOpen=!1,this.selectedContractDetails=null,this.selectedContractBreakup=null,this.isLoadingBreakup=!1,this.financialYear=this.payrollApi.getCurrentFinancialYear()}ngOnInit(){this.loadData()}setTab(a){let l=a.detail.value;l&&(this.currentTab=l)}loadData(){return tn(this,null,function*(){this.loading=!0;let a=yield this.loadingController.create({message:"Fetching details..."});yield a.present(),this.employeeService.getMyProfile().pipe(z(this.destroy$)).subscribe({next:l=>{if(this.currentEmployee=l,!l?.id){a.dismiss(),this.loading=!1;return}this.availableYears=[2026,2025,2024],this.generateMonthList();let s=new Date;s.setMonth(s.getMonth()-1);let f=s.getMonth()+1,u=s.getFullYear();this.selectedMonthStr=`${u}-${String(f).padStart(2,"0")}`,this.fetchPayslipData(l.id,this.selectedMonthStr),this.payrollService.listContracts({employee_id:l.id}).pipe(z(this.destroy$)).subscribe({next:b=>{this.employeeContracts=(Array.isArray(b)?b:[]).sort((O,k)=>{let v=O.status?.toLowerCase()==="active",h=k.status?.toLowerCase()==="active";if(v&&!h)return-1;if(!v&&h)return 1;let g=new Date(O.effective_from||0).getTime();return new Date(k.effective_from||0).getTime()-g}),a.dismiss(),this.loading=!1},error:()=>{a.dismiss(),this.loading=!1}})},error:()=>{a.dismiss(),this.loading=!1}})})}generateMonthList(){let a=new Date,l=a.getFullYear(),s=a.getMonth()+1,f=[],u=this.selectedYear===l?s-1:12;for(let b=u;b>=1;b--)f.push({month:b,year:this.selectedYear});this.availableMonths=f}onYearChange(){this.generateMonthList(),this.availableMonths.length>0&&this.selectMonth(this.availableMonths[0])}fetchPayslipData(a,l){this.loading=!0,this.payrollApi.getEmployeeRunStatus(a,l).pipe(z(this.destroy$)).subscribe({next:s=>{if(s.success&&s.data){let f=s.data;this.actualPayableDays=f.total_days||0,this.totalWorkingDays=f.total_days||0,this.lopDays=f.lop_days||0,this.daysPayable=f.days_payable||0,this.payableDays=this.daysPayable,f.run&&f.run.runStatus==="COMPLETED"?(this.isPayslipGenerated=!0,this.activeContract=f.contract,this.mapComponentsToUI(f.contract,f.templateComponents||[],f.monthlyGross||0)):this.isPayslipGenerated=!1}else this.isPayslipGenerated=!1;this.loading=!1},error:()=>{this.isPayslipGenerated=!1,this.loading=!1}})}selectMonth(a){let l=`${a.year}-${String(a.month).padStart(2,"0")}`;this.selectedMonthStr=l,this.currentEmployee?.id&&this.fetchPayslipData(this.currentEmployee.id,l)}getMonthName(a){let l=new Date;return l.setMonth(a-1),l.toLocaleString("default",{month:"long"})}downloadPayslip(){let a=document.querySelector(".payslip-card");if(!a)return;let l={margin:[10,10],filename:`Payslip_${this.selectedMonthStr}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,logging:!1},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}};html2pdf().from(a).set(l).save()}mapComponentsToUI(a,l,s){this.monthlySalary=s,this.earnings=[],this.contributions=[],this.taxes=[],this.totalEarnings=0,this.totalActualEarnings=0,this.totalContributions=0,this.totalActualContributions=0,this.totalTaxes=0,this.totalActualTaxes=0;let f=0,u=0,b=0,O=0;l.forEach(k=>{let v=(k.component_code||"").toUpperCase(),h=(k.component_name||"").toUpperCase();(v.includes("EMPLOYER")||v.includes("EMPLOYEER")||v.includes("_ER")||h.includes("EMPLOYER"))&&(f+=Number(k.value||0),u+=Number(k.full_value||0),(v.includes("PF")||h.includes("PF"))&&(this.employerPfAmount=Number(k.full_value||0)*12)),(v.includes("PROF_TAX")||v==="PT"||h.includes("PROFESSIONAL TAX"))&&(b=Number(k.value||0),O=Number(k.full_value||0))}),l.forEach(k=>{let v=(k.component_code||"").toUpperCase(),h=k.component_name,g=(k.component_type||"").toUpperCase(),S=Math.round(Number(k.value||0)),d=Math.round(Number(k.full_value||0)),_=v.includes("EMPLOYER")||v.includes("EMPLOYEER")||v.includes("_ER")||(h||"").toUpperCase().includes("EMPLOYER"),w=v==="SPECIAL"||(h||"").toUpperCase().includes("SPECIAL ALLOWANCE"),T={name:h,actual:d,paid:S,isER:_};_||(g==="EARNING"?(this.earnings.push(T),this.totalEarnings+=S,this.totalActualEarnings+=d):g==="DEDUCTION"&&(v.includes("TAX")||v.includes("TDS")||(h||"").toUpperCase().includes("TAX")?(this.taxes.push(T),this.totalTaxes+=S,this.totalActualTaxes+=d,(v.includes("PROF_TAX")||v.includes("PT"))&&(this.professionalTaxAmount=d*12)):(this.contributions.push(T),this.totalContributions+=S,this.totalActualContributions+=d)))}),this.totalEarnings=Math.round(this.totalEarnings),this.totalActualEarnings=Math.round(this.totalActualEarnings),this.totalContributions=Math.round(this.totalContributions),this.totalActualContributions=Math.round(this.totalActualContributions),this.totalTaxes=Math.round(this.totalTaxes),this.totalActualTaxes=Math.round(this.totalActualTaxes),this.totalDeductions=this.totalContributions+this.totalTaxes,this.totalActualDeductions=this.totalActualContributions+this.totalActualTaxes,this.netSalary=Math.round(this.totalEarnings-this.totalDeductions),this.netSalaryInWords=this.toWords(this.netSalary)}openBreakupModal(a){return tn(this,null,function*(){this.selectedContractDetails=a,this.isBreakupModalOpen=!0,this.isLoadingBreakup=!0,this.selectedContractBreakup=null,this.payrollService.getPayrollComponents().pipe(z(this.destroy$)).subscribe({next:l=>{let s=Array.isArray(l)?l:l.data||[];this.payrollService.getTemplateComposition(a.template_id).pipe(z(this.destroy$)).subscribe({next:f=>{let u=(f||[]).map(b=>{let O=s.find(k=>k.component_id===(b.master_component_id||b.component_id));return{component_code:b.component_code||O?.code||O?.component_code,component_name:b.component_name||O?.name||O?.component_name,formula_or_value:b.formula_or_value,calculation_type:b.calculation_type||O?.calculation_type,percentage_of_code:b.percentage_of_code||O?.percentage_of_code||O?.base_code||null,component_type:b.component_type||O?.type||O?.component_type,sequence:b.sequence||O?.sequence}});this.selectedContractBreakup=this.calculateBreakupForModal(a.annual_ctc,u),this.isLoadingBreakup=!1},error:()=>{this.isLoadingBreakup=!1}})},error:()=>{this.isLoadingBreakup=!1}})})}closeBreakupModal(){this.isBreakupModalOpen=!1,this.selectedContractDetails=null,this.selectedContractBreakup=null}calculateBreakupForModal(a,l){let s=Number(a)||0,f=Math.round(s/12),u={CTC:s},b=[...l].sort((d,_)=>(d.sequence||0)-(_.sequence||0)),O=(d,_=[])=>{let w=(d.component_code||d.code||"").toUpperCase();if(w&&_.includes(w))return 0;let T=w?[..._,w]:_,B=d.formula_or_value||d.value||"0",A=d.calculation_type||"FIXED";if(A==="FIXED")return Number(B)||0;if(A==="PERCENTAGE"){let I=parseFloat(String(B).replace(/[^0-9.]/g,""));if(isNaN(I))return 0;let F=(d.percentage_of_code||"").toUpperCase();if(!F||F==="CTC"||F==="GROSS"||F==="-")return I/100*s;let an=l.find(rn=>(rn.component_code||rn.code||"").toUpperCase()===F);return an?I/100*O(an,T):I/100*s}return Number(B)||0};b.forEach(d=>{u[d.component_code||d.code]=O(d)});let k=(d,_)=>{let w=d.toUpperCase(),T=(_||"").toUpperCase();return w==="SPECIAL_ALLOWANCE"||w==="SA"||w==="SPECIAL"||T.includes("SPECIAL ALLOWANCE")},v=b.find(d=>k(d.component_code||d.code||"",d.component_name||d.name||""));if(v){let d=0;b.forEach(_=>{if(_!==v){let w=(_.component_code||_.code||"").toUpperCase(),T=(_.component_type||_.type||"").toUpperCase(),B=w.includes("EMPLOYER")||w.includes("EMPLOYEER")||w.includes("_ER");(T==="EARNING"||B)&&(d+=Math.round((u[_.component_code||_.code]||0)/12))}}),u[v.component_code||v.code]=Math.max(0,f-d)*12}let h={earnings:[],contributions:[],taxes:[],totalEarnings:0,totalContributions:0,totalTaxes:0,totalDeductions:0,netSalary:0},g=0,S=0;return b.forEach(d=>{let _=(d.component_code||d.code||"").toUpperCase(),w=(d.component_name||d.name||"").toUpperCase();(_.includes("EMPLOYER")||_.includes("EMPLOYEER")||_.includes("_ER")||w.includes("EMPLOYER"))&&(g+=Math.round((u[d.component_code||d.code]||0)/12)),(_.includes("PROF_TAX")||_==="PT"||w.includes("PROFESSIONAL TAX"))&&(S=Math.round((u[d.component_code||d.code]||0)/12))}),b.forEach(d=>{let _=(d.component_code||d.code||"").toUpperCase(),w=d.component_name||d.name,T=(d.component_type||d.type||"").toUpperCase(),B=_.includes("EMPLOYER")||_.includes("EMPLOYEER")||_.includes("_ER")||(w||"").toUpperCase().includes("EMPLOYER"),A=u[d.component_code||d.code]||0,I=Math.round(A/12);k(_,w)&&(I+=g+S);let F={name:w,actual:I,paid:I,isER:B};B||(T==="EARNING"?(h.earnings.push(F),h.totalEarnings+=I):T==="DEDUCTION"&&(_.includes("TAX")||_.includes("TDS")||w.toUpperCase().includes("TAX")?(h.taxes.push(F),h.totalTaxes+=I):(h.contributions.push(F),h.totalContributions+=I)))}),h.totalDeductions=h.totalContributions+h.totalTaxes,h.netSalary=Math.round(h.totalEarnings-h.totalDeductions),h}convertLessThanThousand(a){let l="";return a>=100&&(l+=this.ones[Math.floor(a/100)]+" Hundred ",a%=100),a>=20&&(l+=this.tens[Math.floor(a/10)]+" ",a%=10),a>0&&(l+=this.ones[a]+" "),l.trim()}convert(a){let l="";return a>=1e7&&(l+=this.convert(Math.floor(a/1e7))+" Crore ",a%=1e7),a>=1e5&&(l+=this.convert(Math.floor(a/1e5))+" Lakh ",a%=1e5),a>=1e3&&(l+=this.convert(Math.floor(a/1e3))+" Thousand ",a%=1e3),a>0&&(l+=this.convertLessThanThousand(a)),l.trim()}toWords(a){if(a===0)return"Zero Rupees Only";let l=Math.floor(a),s=Math.round((a-l)*100),f=this.convert(l)+" Rupees";return s>0&&(f+=" and "+this.convert(s)+" Paise"),f+" Only"}formatCurrency(a){return(a||0).toLocaleString("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0})}formatAnnualCTC(a){let s=(a||0).toLocaleString("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2,maximumFractionDigits:2}).split(".");return{integer:s[0],decimal:s[1]?"."+s[1]:".00"}}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};c.\u0275fac=function(l){return new(l||c)(R(Q),R(nn),R(Z),R(Wn),R(Vn))},c.\u0275cmp=$({type:c,selectors:[["app-payslips"]],standalone:!1,decls:31,vars:6,consts:[[1,"ion-no-border"],[1,"home-toolbar","payslips-toolbar"],["slot","start"],[1,"page-title-block"],[1,"page-main-title"],[1,"page-subtitle-text"],["slot","end"],["color","primary","routerLink","/MyTax","title","My Tax Portal","id","go-to-tax-portal-btn"],["name","shield-checkmark-outline","slot","icon-only"],[1,"header-segment-toolbar"],[1,"custom-segment",3,"ionChange","value"],["value","payslips"],["value","taxation"],["value","mySalary"],[1,"payroll-content"],["class","payslip-wrapper",4,"ngIf"],[4,"ngIf"],["class","my-salary-container animate-in",4,"ngIf"],[1,"salary-breakup-modal",3,"didDismiss","isOpen"],["class","loader-container","style","display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh;",4,"ngIf"],[1,"payslip-wrapper"],[1,"payslip-grid"],["size","12","size-md","3",1,"sidebar-col"],[1,"sidebar-content"],[1,"year-selector"],[1,"filter-label"],[1,"custom-select-wrapper"],["name","calendar-outline",1,"select-prefix-icon"],["interface","popover",1,"year-select-input",3,"ngModelChange","ionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"month-list-header"],[1,"month-list-container"],["class","month-btn",3,"selected-month","click",4,"ngFor","ngForOf"],["class","no-months",4,"ngIf"],["size","12","size-md","9",1,"main-content-col"],["class","empty-state-container",4,"ngIf"],[3,"value"],[1,"month-btn",3,"click"],[1,"no-months"],[1,"empty-state-container"],["name","crescent","color","light"],["class","payslip-container",4,"ngIf"],["class","not-generated-container",4,"ngIf"],[1,"payslip-container"],[1,"payslip-card","paper-effect"],[1,"payslip-card-header"],[1,"header-left"],[1,"title-badge-row"],[1,"payslip-title-text"],[1,"status-badge","generated"],["src","assets/savepayslipsSVG.png"],[1,"payslip-subtitle-text"],[1,"header-right"],[1,"download-pdf-btn",3,"click"],["src","assets/downloadbtn.png","alt","download pdf"],[1,"company-details-section"],[1,"company-info-left"],[1,"company-name-text"],[1,"company-address-text"],[1,"company-logo-right"],["src","assets/tt_blue_logo.png","alt","Company Logo",1,"company-logo-img"],[1,"payslip-section-title"],[1,"icon-box","blue-box"],["name","person-outline"],[1,"section-title-text"],[1,"employee-details-grid"],[1,"detail-cell"],[1,"detail-label"],[1,"detail-value"],[1,"icon-box","calendar-box"],["name","calendar-outline"],[1,"attendance-summary-bar"],[1,"attendance-card"],[1,"att-card-label"],[1,"att-card-value"],[1,"att-card-value","orange-value"],[1,"salary-tables-container"],[1,"salary-table-column"],[1,"payslip-table-wrapper"],[1,"payslip-data-table"],[1,"text-left"],[1,"text-right"],[4,"ngFor","ngForOf"],[1,"total-row"],[1,"payslip-table-wrapper","margin-bottom-16"],[1,"net-salary-card"],[1,"net-salary-left"],[1,"net-salary-label"],[1,"net-salary-value"],[1,"net-salary-words"],[1,"net-salary-right"],["alt","money","src","assets/money.png"],[1,"payslip-system-footer"],[1,"footer-left"],[1,"footer-note-header"],["name","document-text-outline",1,"note-icon"],[1,"note-header-text"],[1,"footer-note-content"],[1,"note-bold"],[1,"footer-right"],[1,"gen-on-label"],[1,"gen-on-value"],[1,"not-generated-container"],[1,"not-generated-card"],[1,"not-gen-illus"],["src","assets/notgenerated.png","alt","image"],["id","notify-me-payslip-btn",1,"notify-me-btn"],[3,"financialYear","professionalTax","employerPf"],[1,"my-salary-container","animate-in"],[1,"salary-main-card"],[1,"salary-header-section"],[1,"title-wrap"],[1,"header-icon-box"],["src","assets/calculator.png"],[1,"header-texts"],["class","no-data-card",4,"ngIf"],["class","current-contract-box",4,"ngIf"],["class","revision-history-section",4,"ngIf"],[1,"no-data-card"],["name","document-text-outline"],[1,"current-contract-box"],[1,"top-row"],[1,"ctc-section"],[1,"label-text"],[1,"ctc-value"],[1,"currency-symbol"],[1,"ctc-integer"],[1,"ctc-decimal"],[1,"badge-section"],[1,"current-pill"],["name","checkmark-circle"],[1,"divider-line"],[1,"bottom-row"],[1,"info-column"],[1,"value-text"],[1,"value-text","status-value"],[1,"status-dot"],[1,"action-column"],[1,"view-breakup-btn",3,"click"],[1,"revision-history-section"],[1,"section-title"],["class","empty-revisions-box",4,"ngIf"],["class","revisions-list",4,"ngIf"],[1,"empty-revisions-box"],[1,"revisions-list"],["class","revision-row-card",4,"ngFor","ngForOf"],[1,"revision-row-card"],[1,"revision-grid"],[1,"r-col","font-bold-ctc"],[1,"r-col"],[1,"r-col","action-btn-col"],[1,"view-breakup-btn","mini-btn",3,"click"],[1,"modal-wrapper"],[1,"modal-header"],[1,"close-btn",3,"click"],["name","close-outline"],[1,"modal-body"],["class","loader-container min-h","style","display: flex; flex-direction: column; align-items: center; justify-content: center;",4,"ngIf"],["class","breakup-details animate-in",4,"ngIf"],[1,"loader-container","min-h",2,"display","flex","flex-direction","column","align-items","center","justify-content","center"],["name","crescent","color","primary"],[2,"margin-top","16px","color","#64748b"],[1,"breakup-details","animate-in"],[1,"breakup-summary","glass-card"],[1,"sum-box"],[1,"sum-box","highlight"],[1,"breakup-table-wrap","glass-card"],[1,"brk-section"],[1,"sec-head","earn-head"],["name","trending-up-outline"],[1,"brk-row","header"],["class","brk-row",4,"ngFor","ngForOf"],[1,"brk-row","total","earn-total"],[1,"sec-head","ded-head"],["name","trending-down-outline"],[1,"brk-row","total","ded-total"],[1,"info-note"],["name","information-circle-outline"],[1,"brk-row"],[1,"loader-container",2,"display","flex","flex-direction","column","align-items","center","justify-content","center","min-height","50vh"]],template:function(l,s){l&1&&(n(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),m(3,"ion-menu-button"),t(),n(4,"ion-title")(5,"div",3)(6,"span",4),o(7,"Finance & Payroll"),t(),n(8,"span",5),o(9,"Manage your payslips, tax computation and salary details."),t()()(),n(10,"ion-buttons",6)(11,"ion-button",7),m(12,"ion-icon",8),t()()(),n(13,"ion-toolbar",9)(14,"ion-segment",10),D("ionChange",function(u){return s.setTab(u)}),n(15,"ion-segment-button",11)(16,"ion-label"),o(17,"Payslips"),t()(),n(18,"ion-segment-button",12)(19,"ion-label"),o(20,"Taxation"),t()(),n(21,"ion-segment-button",13)(22,"ion-label"),o(23,"My Salary"),t()()()()(),n(24,"ion-content",14),E(25,It,20,6,"div",15)(26,At,2,3,"div",16)(27,Rt,14,3,"div",17),n(28,"ion-modal",18),D("didDismiss",function(){return s.closeBreakupModal()}),E(29,Ht,11,3,"ng-template"),t(),E(30,Wt,4,0,"div",19),t()),l&2&&(i(14),x("value",s.currentTab),i(11),x("ngIf",s.currentEmployee&&s.currentTab==="payslips"),i(),x("ngIf",s.currentTab==="taxation"),i(),x("ngIf",s.currentTab==="mySalary"),i(),x("isOpen",s.isBreakupModalOpen),i(2),x("ngIf",s.loading))},dependencies:[V,G,vn,wn,q,kn,Tn,In,An,Bn,X,zn,Fn,Dn,Ln,Nn,Rn,Yn,J,Un,jn,$n,Sn,K,W,Xn,H,Cn],styles:[`@charset "UTF-8";



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
.payroll-content[_ngcontent-%COMP%] {
  --background: #f4f6fa;
}
.payslip-wrapper[_ngcontent-%COMP%] {
  background: #f4f6fa;
  min-height: calc(100vh - 120px);
}
.payslip-grid[_ngcontent-%COMP%] {
  padding: 24px;
  margin: 0 auto;
}
.payslips-toolbar[_ngcontent-%COMP%] {
  --min-height: 64px;
}
.payslips-toolbar[_ngcontent-%COMP%]   .page-title-block[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}
.payslips-toolbar[_ngcontent-%COMP%]   .page-title-block[_ngcontent-%COMP%]   .page-main-title[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  display: block;
}
.payslips-toolbar[_ngcontent-%COMP%]   .page-title-block[_ngcontent-%COMP%]   .page-subtitle-text[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 400;
  color: #64748b;
  display: block;
  margin-top: 2px;
}
.header-segment-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --border-color: transparent;
  border-bottom: 1px solid #e2e8f0;
}
.header-segment-toolbar[_ngcontent-%COMP%]   .custom-segment[_ngcontent-%COMP%] {
  background: transparent;
  padding: 0 16px;
  justify-content: flex-start;
  --background: transparent;
  grid-auto-columns: minmax(auto, auto);
}
.header-segment-toolbar[_ngcontent-%COMP%]   .custom-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --background: transparent;
  --background-checked: transparent;
  --background-hover: transparent;
  --color: #64748b;
  --color-checked: #1F74BB;
  --indicator-color: #1F74BB;
  --indicator-height: 2px;
  --border-radius: 0;
  --padding-start: 4px;
  --padding-end: 4px;
  --margin-start: 0;
  --margin-end: 0;
  min-width: auto;
  max-width: 120px;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  padding: 0 16px;
  padding-left: 0px;
}
.header-segment-toolbar[_ngcontent-%COMP%]   .custom-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 500;
}
.header-segment-toolbar[_ngcontent-%COMP%]   .custom-segment[_ngcontent-%COMP%]   ion-segment-button.segment-button-checked[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #1F74BB;
}
.sidebar-col[_ngcontent-%COMP%] {
  background: transparent;
  border-right: none;
  height: auto;
  box-shadow: none;
  z-index: 5;
}
.sidebar-content[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8eef5;
  margin-bottom: 20px;
}
.sidebar-content[_ngcontent-%COMP%]   .year-selector[_ngcontent-%COMP%] {
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}
.sidebar-content[_ngcontent-%COMP%]   .year-selector[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.sidebar-content[_ngcontent-%COMP%]   .year-selector[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  background: #ffffff;
  transition: all 0.2s ease;
}
.sidebar-content[_ngcontent-%COMP%]   .year-selector[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.sidebar-content[_ngcontent-%COMP%]   .year-selector[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]   .select-prefix-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #64748b;
  margin-right: 8px;
}
.sidebar-content[_ngcontent-%COMP%]   .year-selector[_ngcontent-%COMP%]   .custom-select-wrapper[_ngcontent-%COMP%]   .year-select-input[_ngcontent-%COMP%] {
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}
.sidebar-content[_ngcontent-%COMP%]   .month-list-header[_ngcontent-%COMP%] {
  padding: 20px 0 10px 0;
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
.sidebar-content[_ngcontent-%COMP%]   .month-list-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}
.sidebar-content[_ngcontent-%COMP%]   .month-list-container[_ngcontent-%COMP%]   .month-btn[_ngcontent-%COMP%] {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  padding: 12px 16px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}
.sidebar-content[_ngcontent-%COMP%]   .month-list-container[_ngcontent-%COMP%]   .month-btn.selected-month[_ngcontent-%COMP%] {
  background: #eff6ff;
  border: 1px solid #1F74BB;
  color: #1F74BB;
  font-weight: 600;
}
.sidebar-content[_ngcontent-%COMP%]   .month-list-container[_ngcontent-%COMP%]   .month-btn[_ngcontent-%COMP%]:hover:not(.selected-month) {
  background: #f8fafc;
  color: #0f172a;
}
.sidebar-content[_ngcontent-%COMP%]   .month-list-container[_ngcontent-%COMP%]   .no-months[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  padding: 12px 16px;
}
.main-content-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  background: transparent;
  height: calc(100vh - 120px);
  overflow-y: auto;
  position: relative;
}
.main-header[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
.main-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}
.main-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .download-btn[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: #ffffff;
  border: none;
  padding: 9px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(31, 116, 187, 0.2);
  transition: all 0.2s ease;
}
.main-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .download-btn[_ngcontent-%COMP%]:hover {
  background: #175191;
  box-shadow: 0 4px 12px rgba(31, 116, 187, 0.3);
  transform: translateY(-1px);
}
.main-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .download-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 17px;
}
.payslip-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
}
.payslip-card[_ngcontent-%COMP%] {
  background: #ffffff;
  width: 100%;
  max-width: 1280px;
  padding: 40px 48px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8eef5;
  font-family: "Inter";
  animation: _ngcontent-%COMP%_slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
  box-sizing: border-box;
}
.payslip-card.paper-effect[_ngcontent-%COMP%] {
  position: relative;
}
@keyframes _ngcontent-%COMP%_slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.payslip-card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 24px;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .title-badge-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .payslip-title-text[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .status-badge.generated[_ngcontent-%COMP%] {
  background: #ECFDF5;
  color: #2E7D32;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   .badge-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .payslip-subtitle-text[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  margin-top: 6px;
  display: block;
  font-weight: 500;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .download-pdf-btn[_ngcontent-%COMP%] {
  background: #1F74BB;
  color: #ffffff;
  border: none;
  padding: 15px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  transition: all 0.2s ease;
}
.payslip-card-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .download-pdf-btn[_ngcontent-%COMP%]:hover {
  background: #1d4ed8;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}
.payslip-card-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .download-pdf-btn[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.company-details-section[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}
.company-details-section[_ngcontent-%COMP%]   .company-info-left[_ngcontent-%COMP%]   .company-name-text[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}
.company-details-section[_ngcontent-%COMP%]   .company-info-left[_ngcontent-%COMP%]   .company-address-text[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
}
.company-details-section[_ngcontent-%COMP%]   .company-logo-right[_ngcontent-%COMP%]   .company-logo-img[_ngcontent-%COMP%] {
  object-fit: contain;
}
.payslip-section-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 36px;
  margin-bottom: 20px;
}
.payslip-section-title[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
}
.payslip-section-title[_ngcontent-%COMP%]   .icon-box.blue-box[_ngcontent-%COMP%] {
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}
.payslip-section-title[_ngcontent-%COMP%]   .icon-box.calendar-box[_ngcontent-%COMP%] {
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}
.payslip-section-title[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.payslip-section-title[_ngcontent-%COMP%]   .section-title-text[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.employee-details-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 4px 0;
}
.employee-details-grid[_ngcontent-%COMP%]   .detail-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.employee-details-grid[_ngcontent-%COMP%]   .detail-cell[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: capitalize;
}
.employee-details-grid[_ngcontent-%COMP%]   .detail-cell[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #0f172a;
  font-weight: 600;
}
.attendance-summary-bar[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  background: #f0f6ff;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.attendance-summary-bar[_ngcontent-%COMP%]   .attendance-card[_ngcontent-%COMP%] {
  flex: 1;
  background: #ffffff;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
.attendance-summary-bar[_ngcontent-%COMP%]   .attendance-card[_ngcontent-%COMP%]   .att-card-label[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 6px;
}
.attendance-summary-bar[_ngcontent-%COMP%]   .attendance-card[_ngcontent-%COMP%]   .att-card-value[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}
.attendance-summary-bar[_ngcontent-%COMP%]   .attendance-card[_ngcontent-%COMP%]   .att-card-value.orange-value[_ngcontent-%COMP%] {
  color: #ea580c;
}
.salary-tables-container[_ngcontent-%COMP%] {
  display: flex;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 24px;
}
.salary-tables-container[_ngcontent-%COMP%]   .salary-table-column[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-table-wrapper[_ngcontent-%COMP%] {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-table-wrapper.margin-bottom-16[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 12px 16px;
  font-size: 13px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 500;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {
  border-bottom: none;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {
  background: #eff6ff;
  font-weight: 700;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  color: #1F74BB;
  border-top: 1px solid #bfdbfe;
  font-weight: 700;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   .text-left[_ngcontent-%COMP%] {
  text-align: left;
}
.salary-tables-container[_ngcontent-%COMP%]   .payslip-data-table[_ngcontent-%COMP%]   .text-right[_ngcontent-%COMP%] {
  text-align: right;
}
.net-salary-card[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eff6ff;
  border-radius: 12px;
  padding: 24px 32px;
  border: 1px solid #1F74BB;
  margin-top: 36px;
  position: relative;
  overflow: hidden;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  z-index: 2;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-left[_ngcontent-%COMP%]   .net-salary-label[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  color: #1F74BB;
  margin-bottom: 6px;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-left[_ngcontent-%COMP%]   .net-salary-value[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 800;
  color: #1F74BB;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-left[_ngcontent-%COMP%]   .net-salary-words[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
  margin-top: 6px;
  font-weight: 500;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-right[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-right[_ngcontent-%COMP%]   .envelope-svg[_ngcontent-%COMP%] {
  opacity: 0.85;
  transition: all 0.3s ease;
}
.net-salary-card[_ngcontent-%COMP%]   .net-salary-right[_ngcontent-%COMP%]   .envelope-svg[_ngcontent-%COMP%]:hover {
  transform: scale(1.05);
  opacity: 1;
}
.payslip-system-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px dashed #e2e8f0;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-left[_ngcontent-%COMP%]   .footer-note-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  color: #64748b;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-left[_ngcontent-%COMP%]   .footer-note-header[_ngcontent-%COMP%]   .note-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-left[_ngcontent-%COMP%]   .footer-note-header[_ngcontent-%COMP%]   .note-header-text[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-left[_ngcontent-%COMP%]   .footer-note-content[_ngcontent-%COMP%]   .note-bold[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  margin: 0 0 6px 0;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-left[_ngcontent-%COMP%]   .footer-note-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  margin: 0;
  padding-left: 16px;
  font-size: 11px;
  color: #64748b;
  line-height: 1.6;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-left[_ngcontent-%COMP%]   .footer-note-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  margin-bottom: 4px;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-right[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 4px;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-right[_ngcontent-%COMP%]   .gen-on-label[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 500;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.payslip-system-footer[_ngcontent-%COMP%]   .footer-right[_ngcontent-%COMP%]   .gen-on-value[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
}
.empty-state-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 40px;
  text-align: center;
  color: #94a3b8;
}
.empty-state-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  margin-bottom: 16px;
  --color: #1F74BB;
}
.empty-state-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 500;
  color: #64748b;
}
.not-generated-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
}
.not-generated-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e8eef5;
  padding: 80px 48px;
  border-radius: 16px;
  max-width: 100%;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  animation: _ngcontent-%COMP%_slideUpFade 0.5s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.not-generated-card[_ngcontent-%COMP%]   .not-gen-illus[_ngcontent-%COMP%] {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.not-generated-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px 0;
}
.not-generated-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 28px 0;
  font-weight: 400;
  max-width: 520px;
}
.not-generated-card[_ngcontent-%COMP%]   .notify-me-btn[_ngcontent-%COMP%] {
  display: inline-block;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.not-generated-card[_ngcontent-%COMP%]   .notify-me-btn[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #0f172a;
}
@media (max-width: 768px) {
  .sidebar-col[_ngcontent-%COMP%] {
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  .main-content-col[_ngcontent-%COMP%] {
    height: auto;
  }
  .payslip-card[_ngcontent-%COMP%] {
    padding: 30px 20px;
  }
  .payslip-header[_ngcontent-%COMP%] {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
  }
  .payslip-header[_ngcontent-%COMP%]   .logo-box[_ngcontent-%COMP%] {
    margin-bottom: 20px;
  }
  .net-pay-footer[_ngcontent-%COMP%]   .net-row[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
.my-salary-container[_ngcontent-%COMP%] {
  padding: 40px;
  display: flex;
  justify-content: center;
}
.salary-main-card[_ngcontent-%COMP%] {
  background: #ffffff;
  width: 100%;
  max-width: 1000px;
  padding: 40px 48px;
  border-radius: 16px;
  border: 1px solid #e8eef5;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
}
.salary-header-section[_ngcontent-%COMP%] {
  margin-bottom: 32px;
}
.salary-header-section[_ngcontent-%COMP%]   .title-wrap[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.salary-header-section[_ngcontent-%COMP%]   .title-wrap[_ngcontent-%COMP%]   .header-icon-box[_ngcontent-%COMP%] {
  background: #e0effe;
  color: #1f74bb;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.salary-header-section[_ngcontent-%COMP%]   .title-wrap[_ngcontent-%COMP%]   .header-icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
}
.salary-header-section[_ngcontent-%COMP%]   .title-wrap[_ngcontent-%COMP%]   .header-texts[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}
.salary-header-section[_ngcontent-%COMP%]   .title-wrap[_ngcontent-%COMP%]   .header-texts[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}
.no-data-card[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
}
.no-data-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #94a3b8;
  margin-bottom: 16px;
}
.no-data-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #334155;
  font-weight: 600;
  margin: 0 0 8px 0;
}
.no-data-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  margin: 0;
}
.current-contract-box[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px 32px;
  margin-bottom: 40px;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .ctc-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .ctc-section[_ngcontent-%COMP%]   .label-text[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .ctc-section[_ngcontent-%COMP%]   .ctc-value[_ngcontent-%COMP%] {
  display: flex;
  align-items: baseline;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .ctc-section[_ngcontent-%COMP%]   .ctc-value[_ngcontent-%COMP%]   .currency-symbol[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin-right: 2px;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .ctc-section[_ngcontent-%COMP%]   .ctc-value[_ngcontent-%COMP%]   .ctc-integer[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .ctc-section[_ngcontent-%COMP%]   .ctc-value[_ngcontent-%COMP%]   .ctc-decimal[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 500;
  color: #64748b;
  margin-left: 1px;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .current-pill[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #e6f4ea;
  color: #137333;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.current-contract-box[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%]   .current-pill[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #137333;
}
.current-contract-box[_ngcontent-%COMP%]   .divider-line[_ngcontent-%COMP%] {
  border-top: 1px solid #e2e8f0;
  margin: 20px 0;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 20px;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .info-column[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .info-column[_ngcontent-%COMP%]   .label-text[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .info-column[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 6px;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .info-column[_ngcontent-%COMP%]   .value-text.status-value[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .info-column[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  background: #cbd5e1;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .info-column[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%]   .status-dot.green[_ngcontent-%COMP%] {
  background: #22c55e;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .action-column[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .action-column[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%] {
  background: #1f74bb;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .action-column[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .action-column[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%]:hover {
  background: #175191;
  transform: translateY(-1px);
}
.revision-history-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 0 0 16px 0;
}
.revision-history-section[_ngcontent-%COMP%]   .empty-revisions-box[_ngcontent-%COMP%] {
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  background: transparent;
}
.revision-history-section[_ngcontent-%COMP%]   .empty-revisions-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}
.revision-history-section[_ngcontent-%COMP%]   .revisions-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 24px;
  transition: all 0.2s ease;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 16px;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .r-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .r-col.font-bold-ctc[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .r-col[_ngcontent-%COMP%]   .label-text[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .r-col[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 500;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 6px;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .r-col[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background: #cbd5e1;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .r-col[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%]   .status-dot.green[_ngcontent-%COMP%] {
  background: #22c55e;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .action-btn-col[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .action-btn-col[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%] {
  background: transparent;
  color: #1f74bb;
  border: 1px solid #1f74bb;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .action-btn-col[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
}
.revision-history-section[_ngcontent-%COMP%]   .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .action-btn-col[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%]:hover {
  background: #eff6ff;
}
@media (max-width: 768px) {
  .my-salary-container[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .salary-main-card[_ngcontent-%COMP%] {
    padding: 24px 20px;
  }
  .current-contract-box[_ngcontent-%COMP%] {
    padding: 20px;
  }
  .current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .action-column[_ngcontent-%COMP%] {
    justify-content: flex-start;
  }
  .current-contract-box[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%]   .action-column[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
  .revision-row-card[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .action-btn-col[_ngcontent-%COMP%] {
    justify-content: flex-start;
  }
  .revision-row-card[_ngcontent-%COMP%]   .revision-grid[_ngcontent-%COMP%]   .action-btn-col[_ngcontent-%COMP%]   .view-breakup-btn[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
}
.salary-breakup-modal[_ngcontent-%COMP%] {
  --width: 700px;
  --height: 85vh;
  --border-radius: 16px;
}
.modal-wrapper[_ngcontent-%COMP%] {
  background: #f8fafc;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.modal-header[_ngcontent-%COMP%] {
  background: #ffffff;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}
.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}
.modal-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}
.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.2s;
}
.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  color: #ef4444;
}
.modal-body[_ngcontent-%COMP%] {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}
.breakup-summary[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
}
.breakup-summary[_ngcontent-%COMP%]   .sum-box[_ngcontent-%COMP%] {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.breakup-summary[_ngcontent-%COMP%]   .sum-box[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
}
.breakup-summary[_ngcontent-%COMP%]   .sum-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.breakup-summary[_ngcontent-%COMP%]   .sum-box.highlight[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #eff6ff 0%,
      #dbeafe 100%);
  border-color: #bfdbfe;
}
.breakup-summary[_ngcontent-%COMP%]   .sum-box.highlight[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #1d4ed8;
}
.breakup-summary[_ngcontent-%COMP%]   .sum-box.highlight[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #1e40af;
}
.breakup-table-wrap[_ngcontent-%COMP%] {
  padding: 20px;
  margin-bottom: 24px;
}
.brk-section[_ngcontent-%COMP%] {
  margin-bottom: 32px;
}
.brk-section[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.brk-section[_ngcontent-%COMP%]   .sec-head[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e2e8f0;
}
.brk-section[_ngcontent-%COMP%]   .sec-head.earn-head[_ngcontent-%COMP%] {
  color: #16a34a;
  border-color: #bbf7d0;
}
.brk-section[_ngcontent-%COMP%]   .sec-head.ded-head[_ngcontent-%COMP%] {
  color: #ef4444;
  border-color: #fecaca;
}
.brk-section[_ngcontent-%COMP%]   .brk-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  padding: 12px 8px;
  border-bottom: 1px dashed #e2e8f0;
  font-size: 13px;
}
.brk-section[_ngcontent-%COMP%]   .brk-row.header[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  border-bottom: none;
  padding-bottom: 4px;
}
.brk-section[_ngcontent-%COMP%]   .brk-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 500;
}
.brk-section[_ngcontent-%COMP%]   .brk-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1e293b;
  font-weight: 700;
}
.brk-section[_ngcontent-%COMP%]   .brk-row.total[_ngcontent-%COMP%] {
  margin-top: 8px;
  padding: 16px 8px;
  border-bottom: none;
  border-radius: 6px;
  font-size: 14px;
}
.brk-section[_ngcontent-%COMP%]   .brk-row.total.earn-total[_ngcontent-%COMP%] {
  background: #f0fdf4;
}
.brk-section[_ngcontent-%COMP%]   .brk-row.total.earn-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], 
.brk-section[_ngcontent-%COMP%]   .brk-row.total.earn-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #166534;
}
.brk-section[_ngcontent-%COMP%]   .brk-row.total.ded-total[_ngcontent-%COMP%] {
  background: #fef2f2;
}
.brk-section[_ngcontent-%COMP%]   .brk-row.total.ded-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], 
.brk-section[_ngcontent-%COMP%]   .brk-row.total.ded-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #991b1b;
}
.info-note[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 8px;
  color: #b45309;
}
.info-note[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.info-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}
@media (max-width: 768px) {
  .contract-grid[_ngcontent-%COMP%] {
    padding-right: 0;
  }
  .contract-grid[_ngcontent-%COMP%]   .c-col[_ngcontent-%COMP%] {
    margin-bottom: 12px;
  }
  .breakup-summary[_ngcontent-%COMP%] {
    flex-direction: column;
  }
}`]});let r=c;return r})();var qt=[{path:"",component:Jn}],xe=(()=>{let c=class c{};c.\u0275fac=function(l){return new(l||c)},c.\u0275mod=mn({type:c}),c.\u0275inj=dn({imports:[Pn,En,Gn,On.forChild(qt)]});let r=c;return r})();export{xe as PayslipsPageModule};
