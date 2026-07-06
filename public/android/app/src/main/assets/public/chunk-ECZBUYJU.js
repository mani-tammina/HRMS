import{a as Z}from"./chunk-AMUZ5UX4.js";import{a as Cn,b as vn}from"./chunk-NS4WUDBR.js";import"./chunk-2GEN2AVW.js";import"./chunk-GKMRXCVX.js";import{a as L}from"./chunk-NDCRD3QG.js";import{$ as te,A as fn,Aa as bn,B as mn,Ba as se,Da as xn,G as Qn,Ga as pe,H as T,I as Q,O as Xn,R as F,S as Kn,W as z,X as A,Y as Zn,Z as ne,_ as ee,b as An,c as P,d as Y,e as Vn,fa as ie,g as gn,ga as oe,h as Ln,i as $n,ia as re,j as jn,ja as ae,ka as ce,la as _n,m as Nn,ma as un,n as Un,na as V,o as qn,p as Rn,ra as X,t as Gn,ta as K,u as Wn,v as Hn,va as hn,wa as de,y as Jn,z as Yn,za as le}from"./chunk-B3PLR2IL.js";import{$a as y,A as M,Ba as O,Bb as H,Ca as m,Da as g,Db as sn,E as on,Eb as Tn,F as rn,H as an,K as u,Ka as En,Kb as pn,L as h,La as N,Oa as r,Pa as b,Qa as x,Ra as In,Sa as Bn,Ta as S,Tb as Fn,Ua as w,Va as k,Vb as J,Wb as zn,Zb as Pn,_ as l,ab as U,bb as q,ca as v,cb as nn,d as R,ea as E,fa as cn,ha as wn,ja as f,pb as Dn,qa as kn,qb as G,ra as s,rb as D,sa as e,ta as n,ua as p,wb as dn,xb as ln,ya as I,yb as W,za as B}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{a as en,b as tn,e as Sn}from"./chunk-JHI3MBHO.js";var j=(()=>{let d=class d{constructor(t){this.http=t,this.apiUrl=`http://${L.apiURL}/api/candidates`}getAllCandidates(){return this.http.get(this.apiUrl)}getCandidateById(t){return this.http.get(`${this.apiUrl}/${t}`)}createCandidate(t){return this.http.post(this.apiUrl,t)}updateCandidate(t,i){return this.http.put(`${this.apiUrl}/${t}`,i)}getDashboardStats(){return this.http.get(`${this.apiUrl}/stats/dashboard`)}startPreonboarding(t){return this.http.post(`${this.apiUrl}/${t}/start-preonboarding`,{})}createOffer(t,i){return this.http.post(`${this.apiUrl}/${t}/create-offer`,i)}previewSendOffer(t){return this.http.post(`${this.apiUrl}/${t}/preview-send-offer`,{})}sendOffer(t){return this.http.post(`${this.apiUrl}/${t}/send-offer`,{})}viewOffer(t,i){return this.http.get(`${this.apiUrl}/${t}/view-offer/${i}`)}acceptOffer(t,i){return this.http.post(`${this.apiUrl}/${t}/accept-offer/${i}`,{})}approveOffer(t,i){return this.http.post(`${this.apiUrl}/${t}/approve-offer/${i}`,{})}rejectOffer(t,i,c){return this.http.post(`${this.apiUrl}/${t}/reject-offer/${i}`,{reason:c})}declineOffer(t,i){return this.http.post(`${this.apiUrl}/${t}/decline-offer`,{reason:i})}uploadDocument(t,i,c,_=!0){let C=new FormData;return C.append("file",i),C.append("document_type",c),C.append("required",_?"1":"0"),this.http.post(`${this.apiUrl}/${t}/documents`,C)}verifyDocument(t,i){return this.http.put(`${this.apiUrl}/documents/${t}/verify`,{remarks:i})}initiateBGV(t){return this.http.post(`${this.apiUrl}/${t}/bgv/initiate`,{})}updateBGVStatus(t,i,c){return this.http.put(`${this.apiUrl}/${t}/bgv/status`,{bgv_status:i,remarks:c})}updateCandidateStatus(t,i,c=""){return this.http.post(`${this.apiUrl}/${t}/update-status`,{status:i,remarks:c})}convertToEmployee(t,i){return this.http.post(`${this.apiUrl}/${t}/convert-to-employee`,{employee_number:i})}hireAsEmployee(t){return this.http.post(`${this.apiUrl}/${t}/hire-as-employee`,{})}putOnHold(t,i){return this.http.post(`${this.apiUrl}/${t}/put-on-hold`,{reason:i})}getDepartments(){return this.http.get(`http://${L.apiURL}/api/departments`)}getLocations(){return this.http.get(`http://${L.apiURL}/api/locations`)}getDesignations(){return this.http.get(`http://${L.apiURL}/api/designations`)}getEmployees(t=1e3,i="Working"){return this.http.get(`http://${L.apiURL}/api/employees?limit=${t}&status=${i}`)}};d.\u0275fac=function(i){return new(i||d)(an(pn))},d.\u0275prov=on({token:d,factory:d.\u0275fac,providedIn:"root"});let o=d;return o})();function ye(o,d){o&1&&(e(0,"span"),r(1,"First name is required"),n())}function Se(o,d){o&1&&(e(0,"span"),r(1,"Must be at least 2 chars"),n())}function we(o,d){if(o&1&&(e(0,"div",54),f(1,ye,2,0,"span",44)(2,Se,2,0,"span",44),n()),o&2){let a=g();l(),s("ngIf",a.f.first_name.errors==null?null:a.f.first_name.errors.required),l(),s("ngIf",a.f.first_name.errors==null?null:a.f.first_name.errors.minlength)}}function ke(o,d){o&1&&(e(0,"span"),r(1,"Last name is required"),n())}function Ee(o,d){o&1&&(e(0,"span"),r(1,"Must be at least 2 chars"),n())}function Ie(o,d){if(o&1&&(e(0,"div",54),f(1,ke,2,0,"span",44)(2,Ee,2,0,"span",44),n()),o&2){let a=g();l(),s("ngIf",a.f.last_name.errors==null?null:a.f.last_name.errors.required),l(),s("ngIf",a.f.last_name.errors==null?null:a.f.last_name.errors.minlength)}}function Be(o,d){if(o&1&&(e(0,"option",55),r(1),n()),o&2){let a=d.$implicit;s("value",a),l(),x(" ",a," ")}}function De(o,d){o&1&&(e(0,"div",54),r(1," Gender is required "),n())}function Te(o,d){o&1&&(e(0,"span"),r(1,"Email is required"),n())}function Fe(o,d){o&1&&(e(0,"span"),r(1,"Please enter a valid email"),n())}function ze(o,d){if(o&1&&(e(0,"div",54),f(1,Te,2,0,"span",44)(2,Fe,2,0,"span",44),n()),o&2){let a=g();l(),s("ngIf",a.f.email.errors==null?null:a.f.email.errors.required),l(),s("ngIf",a.f.email.errors==null?null:a.f.email.errors.email)}}function Ae(o,d){o&1&&(e(0,"span"),r(1,"Phone number is required"),n())}function Ve(o,d){o&1&&(e(0,"span"),r(1,"Enter a valid 10-digit number"),n())}function Le(o,d){if(o&1&&(e(0,"div",54),f(1,Ae,2,0,"span",44)(2,Ve,2,0,"span",44),n()),o&2){let a=g();l(),s("ngIf",a.f.phone.errors==null?null:a.f.phone.errors.required),l(),s("ngIf",a.f.phone.errors==null?null:a.f.phone.errors.pattern)}}function $e(o,d){o&1&&(e(0,"div",54),r(1," Date of Birth is required "),n())}function je(o,d){o&1&&(e(0,"div",54),r(1," Enter a valid 10-digit number "),n())}function Ne(o,d){o&1&&(e(0,"div",54),r(1," Position is required "),n())}function Ue(o,d){o&1&&(e(0,"option",56),r(1,"Loading..."),n())}function qe(o,d){if(o&1&&(e(0,"option",55),r(1),n()),o&2){let a=d.$implicit;s("value",a.id),l(),x(" ",a.name," ")}}function Re(o,d){o&1&&(e(0,"div",54),r(1," Designation is required "),n())}function Ge(o,d){o&1&&(e(0,"option",56),r(1,"Loading..."),n())}function We(o,d){if(o&1&&(e(0,"option",55),r(1),n()),o&2){let a=d.$implicit;s("value",a.id),l(),x(" ",a.name," ")}}function He(o,d){o&1&&(e(0,"div",54),r(1," Department is required "),n())}function Je(o,d){o&1&&(e(0,"option",56),r(1,"Loading..."),n())}function Ye(o,d){if(o&1&&(e(0,"option",55),r(1),n()),o&2){let a=d.$implicit;s("value",a.id),l(),x(" ",a.name," ")}}function Qe(o,d){o&1&&(e(0,"div",54),r(1," Location is required "),n())}function Xe(o,d){o&1&&(e(0,"span"),r(1,"Offered CTC is required"),n())}function Ke(o,d){o&1&&(e(0,"span"),r(1,"CTC must be at least 100,000"),n())}function Ze(o,d){if(o&1&&(e(0,"div",54),f(1,Xe,2,0,"span",44)(2,Ke,2,0,"span",44),n()),o&2){let a=g();l(),s("ngIf",a.f.offered_ctc.errors==null?null:a.f.offered_ctc.errors.required),l(),s("ngIf",a.f.offered_ctc.errors==null?null:a.f.offered_ctc.errors.min)}}function nt(o,d){o&1&&(e(0,"div",54),r(1," Joining Date is required "),n())}function et(o,d){if(o&1){let a=O();e(0,"ion-icon",57),m("click",function(){u(a);let i=g();return h(i.filterManagers(""))}),n()}}function tt(o,d){o&1&&(e(0,"option",56),r(1,"Loading Management staff..."),n())}function it(o,d){if(o&1&&(e(0,"option",56),r(1),n()),o&2){let a=g(2);l(),x(' No results for "',a.managerSearchQuery,'" ')}}function ot(o,d){if(o&1&&(e(0,"option",55),r(1),n()),o&2){let a=d.$implicit;s("value",a.id),l(),Bn(" ",a.full_name," \u2014 ",a.designation||"Manager"," (",a.employee_number,") ")}}function rt(o,d){if(o&1&&(I(0),f(1,it,2,1,"option",29)(2,ot,2,4,"option",20),B()),o&2){let a=g();l(),s("ngIf",a.filteredManagers.length===0&&a.managerSearchQuery),l(),s("ngForOf",a.filteredManagers)}}function at(o,d){if(o&1&&(e(0,"div",58),p(1,"ion-icon",59),r(2),n()),o&2){let a=g();l(2),In(" ",a.filteredManagers.length," of ",a.reportingManagers.length," manager(s) shown ")}}function ct(o,d){if(o&1&&(e(0,"option",55),r(1),n()),o&2){let a=d.$implicit;s("value",a),l(),x(" ",a," ")}}function dt(o,d){o&1&&(e(0,"div",54),r(1," Source is required "),n())}function lt(o,d){o&1&&p(0,"ion-spinner",60)}function st(o,d){o&1&&(e(0,"span"),r(1,"Create Candidate"),n())}var me=(()=>{let d=class d{constructor(t,i,c,_,C){this.modalController=t,this.formBuilder=i,this.candidateService=c,this.toasterService=_,this.alertController=C,this.destroy$=new R,this.isSubmitting=!1,this.isLoadingMasterData=!1,this.departments=[],this.locations=[],this.designations=[],this.reportingManagers=[],this.filteredManagers=[],this.managerSearchQuery="",this.genderOptions=["Male","Female","Other"],this.sources=["LinkedIn","Referral","Job Portal","Walk-in","Interview","Other"]}ngOnInit(){this.initializeForm(),this.loadMasterData()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initializeForm(){this.candidateForm=this.formBuilder.group({first_name:["",[P.required,P.minLength(2)]],middle_name:[""],last_name:["",[P.required,P.minLength(2)]],email:["",[P.required,P.email]],phone:["",[P.required,P.pattern(/^\d{10}$/)]],alternate_phone:["",P.pattern(/^\d{10}$/)],date_of_birth:["",P.required],gender:["",P.required],position:["",P.required],designation_id:["",P.required],department_id:["",P.required],location_id:["",P.required],offered_ctc:["",[P.required,P.min(1e5)]],joining_date:["",P.required],reporting_manager_id:[""],recruiter_name:[""],recruitment_source:["",P.required]})}loadMasterData(){this.isLoadingMasterData=!0,this.candidateService.getDepartments().pipe(M(this.destroy$)).subscribe({next:t=>{this.departments=Array.isArray(t)?t:t.data||[]},error:t=>{console.error("Error loading departments:",t),this.toasterService.showError("Failed to load departments")}}),this.candidateService.getLocations().pipe(M(this.destroy$)).subscribe({next:t=>{this.locations=Array.isArray(t)?t:t.data||[]},error:t=>{console.error("Error loading locations:",t),this.toasterService.showError("Failed to load locations")}}),this.candidateService.getDesignations().pipe(M(this.destroy$)).subscribe({next:t=>{this.designations=Array.isArray(t)?t:t.data||[]},error:t=>{console.error("Error loading designations:",t),this.toasterService.showError("Failed to load designations")}}),this.candidateService.getEmployees().pipe(M(this.destroy$)).subscribe({next:t=>{let c=(Array.isArray(t)?t:t.data||[]).filter(_=>(_.department_name||"").toLowerCase()==="management");this.reportingManagers=c.map(_=>({id:_.id,employee_number:_.EmployeeNumber,first_name:_.FirstName,last_name:_.LastName,full_name:`${_.FirstName} ${_.LastName}`,designation:_.designation_name||""})),this.filteredManagers=[...this.reportingManagers],this.isLoadingMasterData=!1},error:t=>{console.error("Error loading employees:",t),this.toasterService.showError("Failed to load reporting managers"),this.isLoadingMasterData=!1}})}filterManagers(t){this.managerSearchQuery=t;let i=t.trim().toLowerCase();i?this.filteredManagers=this.reportingManagers.filter(c=>c.full_name.toLowerCase().includes(i)||(c.employee_number||"").toLowerCase().includes(i)||(c.designation||"").toLowerCase().includes(i)):this.filteredManagers=[...this.reportingManagers]}get f(){return this.candidateForm.controls}dismiss(){this.modalController.dismiss()}compareSelect(t,i){return t===i||(t&&i?t.id===i.id:!1)}onSubmit(){if(this.candidateForm.invalid){this.toasterService.showError("Please fill all required fields");return}this.isSubmitting=!0;let t=this.candidateForm.value,i=tn(en({},t),{date_of_birth:t.date_of_birth?t.date_of_birth.split("T")[0]:null,joining_date:t.joining_date?t.joining_date.split("T")[0]:null,department_id:t.department_id?Number(t.department_id):null,location_id:t.location_id?Number(t.location_id):null,designation_id:t.designation_id?Number(t.designation_id):null,reporting_manager_id:t.reporting_manager_id?Number(t.reporting_manager_id):null,full_name:`${t.first_name}${t.middle_name?" "+t.middle_name:""} ${t.last_name}`.trim()});this.candidateService.createCandidate(i).subscribe({next:c=>{this.isSubmitting=!1,this.toasterService.showSuccess("Candidate created successfully"),this.modalController.dismiss(c.data)},error:c=>{this.isSubmitting=!1,console.error("Error creating candidate:",c),this.toasterService.showError(c.error?.message||"Failed to create candidate")}})}};d.\u0275fac=function(i){return new(i||d)(v(xn),v(Gn),v(j),v(Z),v(bn))},d.\u0275cmp=E({type:d,selectors:[["app-create-candidate-modal"]],standalone:!1,decls:189,vars:32,consts:[[1,"ion-no-border"],["slot","end"],["aria-label","Close",3,"click"],["name","close"],[1,"ion-padding","glass-content"],[1,"modal-form-container"],[1,"beauty-form",3,"formGroup"],[1,"form-section"],[1,"section-title"],["name","person-outline"],[1,"grid-row"],[1,"form-group-lux"],[1,"required"],["type","text","formControlName","first_name","placeholder","e.g. John",1,"lux-input"],["class","error-msg-lux",4,"ngIf"],["type","text","formControlName","last_name","placeholder","e.g. Doe",1,"lux-input"],["type","text","formControlName","middle_name","placeholder","e.g. Robert",1,"lux-input"],[1,"select-wrapper"],["formControlName","gender",1,"lux-input"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["name","chevron-down-outline",1,"select-chevron"],["type","email","formControlName","email","placeholder","e.g. john.doe@example.com",1,"lux-input"],["type","tel","formControlName","phone","placeholder","e.g. 9876543210",1,"lux-input"],["type","date","formControlName","date_of_birth",1,"lux-input"],["type","tel","formControlName","alternate_phone","placeholder","e.g. 8765432109",1,"lux-input"],["name","briefcase-outline"],["type","text","formControlName","position","placeholder","e.g. Software Engineer",1,"lux-input"],["formControlName","designation_id",1,"lux-input"],["disabled","",4,"ngIf"],["formControlName","department_id",1,"lux-input"],["formControlName","location_id",1,"lux-input"],[1,"input-wrapper-lux"],[1,"curr-prefix"],["type","number","formControlName","offered_ctc","placeholder","e.g. 800000",1,"lux-input"],["type","date","formControlName","joining_date",1,"lux-input"],[1,"dept-badge"],[1,"manager-search-wrapper"],[1,"manager-search-bar"],["name","search-outline",1,"search-icon-sm"],["type","text","placeholder","Search by name, ID or designation...","autocomplete","off",1,"manager-search-input",3,"input","value"],["name","close-circle","class","clear-search-icon",3,"click",4,"ngIf"],["formControlName","reporting_manager_id",1,"lux-input"],["value",""],[4,"ngIf"],["name","people-outline",1,"select-chevron"],["class","manager-count-hint",4,"ngIf"],["name","people-outline"],["formControlName","recruitment_source",1,"lux-input"],["type","text","formControlName","recruiter_name","placeholder","e.g. Sarah Jenkins",1,"lux-input"],[1,"button-footer"],["type","button",1,"btn-cancel",3,"click","disabled"],["type","button",1,"btn-submit",3,"click","disabled"],["name","crescent","class","btn-spinner",4,"ngIf"],[1,"error-msg-lux"],[3,"value"],["disabled",""],["name","close-circle",1,"clear-search-icon",3,"click"],[1,"manager-count-hint"],["name","checkmark-circle-outline"],["name","crescent",1,"btn-spinner"]],template:function(i,c){i&1&&(e(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),r(3,"Create New Candidate"),n(),e(4,"ion-buttons",1)(5,"ion-button",2),m("click",function(){return c.dismiss()}),p(6,"ion-icon",3),n()()()(),e(7,"ion-content",4)(8,"div",5)(9,"form",6)(10,"div",7)(11,"div",8),p(12,"ion-icon",9),r(13," Personal Information "),n(),e(14,"div",10)(15,"div",11)(16,"label"),r(17,"First Name "),e(18,"span",12),r(19,"*"),n()(),p(20,"input",13),f(21,we,3,2,"div",14),n(),e(22,"div",11)(23,"label"),r(24,"Last Name "),e(25,"span",12),r(26,"*"),n()(),p(27,"input",15),f(28,Ie,3,2,"div",14),n()(),e(29,"div",10)(30,"div",11)(31,"label"),r(32,"Middle Name"),n(),p(33,"input",16),n(),e(34,"div",11)(35,"label"),r(36,"Gender "),e(37,"span",12),r(38,"*"),n()(),e(39,"div",17)(40,"select",18)(41,"option",19),r(42,"Select gender"),n(),f(43,Be,2,2,"option",20),n(),p(44,"ion-icon",21),n(),f(45,De,2,0,"div",14),n()(),e(46,"div",10)(47,"div",11)(48,"label"),r(49,"Email "),e(50,"span",12),r(51,"*"),n()(),p(52,"input",22),f(53,ze,3,2,"div",14),n(),e(54,"div",11)(55,"label"),r(56,"Phone Number "),e(57,"span",12),r(58,"*"),n()(),p(59,"input",23),f(60,Le,3,2,"div",14),n()(),e(61,"div",10)(62,"div",11)(63,"label"),r(64,"Date of Birth "),e(65,"span",12),r(66,"*"),n()(),p(67,"input",24),f(68,$e,2,0,"div",14),n(),e(69,"div",11)(70,"label"),r(71,"Alternate Phone"),n(),p(72,"input",25),f(73,je,2,0,"div",14),n()()(),e(74,"div",7)(75,"div",8),p(76,"ion-icon",26),r(77," Job Information "),n(),e(78,"div",10)(79,"div",11)(80,"label"),r(81,"Position Name "),e(82,"span",12),r(83,"*"),n()(),p(84,"input",27),f(85,Ne,2,0,"div",14),n(),e(86,"div",11)(87,"label"),r(88,"Designation "),e(89,"span",12),r(90,"*"),n()(),e(91,"div",17)(92,"select",28)(93,"option",19),r(94,"Select designation"),n(),f(95,Ue,2,0,"option",29)(96,qe,2,2,"option",20),n(),p(97,"ion-icon",21),n(),f(98,Re,2,0,"div",14),n()(),e(99,"div",10)(100,"div",11)(101,"label"),r(102,"Department "),e(103,"span",12),r(104,"*"),n()(),e(105,"div",17)(106,"select",30)(107,"option",19),r(108,"Select department"),n(),f(109,Ge,2,0,"option",29)(110,We,2,2,"option",20),n(),p(111,"ion-icon",21),n(),f(112,He,2,0,"div",14),n(),e(113,"div",11)(114,"label"),r(115,"Office Location "),e(116,"span",12),r(117,"*"),n()(),e(118,"div",17)(119,"select",31)(120,"option",19),r(121,"Select location"),n(),f(122,Je,2,0,"option",29)(123,Ye,2,2,"option",20),n(),p(124,"ion-icon",21),n(),f(125,Qe,2,0,"div",14),n()(),e(126,"div",10)(127,"div",11)(128,"label"),r(129,"Offered CTC (Gross Annual) "),e(130,"span",12),r(131,"*"),n()(),e(132,"div",32)(133,"span",33),r(134,"\u20B9"),n(),p(135,"input",34),n(),f(136,Ze,3,2,"div",14),n(),e(137,"div",11)(138,"label"),r(139,"Joining Date "),e(140,"span",12),r(141,"*"),n()(),p(142,"input",35),f(143,nt,2,0,"div",14),n()(),e(144,"div",11)(145,"label"),r(146," Reporting Manager "),e(147,"span",36),r(148,"Management Dept."),n()(),e(149,"div",37)(150,"div",38),p(151,"ion-icon",39),e(152,"input",40),m("input",function(C){return c.filterManagers(C.target.value)}),n(),f(153,et,1,0,"ion-icon",41),n(),e(154,"div",17)(155,"select",42)(156,"option",43),r(157,"No Manager Assigned"),n(),f(158,tt,2,0,"option",29)(159,rt,3,2,"ng-container",44),n(),p(160,"ion-icon",45),n(),f(161,at,3,2,"div",46),n()()(),e(162,"div",7)(163,"div",8),p(164,"ion-icon",47),r(165," Recruitment Information "),n(),e(166,"div",10)(167,"div",11)(168,"label"),r(169,"Recruitment Source "),e(170,"span",12),r(171,"*"),n()(),e(172,"div",17)(173,"select",48)(174,"option",19),r(175,"Select source"),n(),f(176,ct,2,2,"option",20),n(),p(177,"ion-icon",21),n(),f(178,dt,2,0,"div",14),n(),e(179,"div",11)(180,"label"),r(181,"Recruiter Name"),n(),p(182,"input",49),n()()(),e(183,"div",50)(184,"button",51),m("click",function(){return c.dismiss()}),r(185," Cancel "),n(),e(186,"button",52),m("click",function(){return c.onSubmit()}),f(187,lt,1,0,"ion-spinner",53)(188,st,2,0,"span",44),n()()()()()),i&2&&(l(9),s("formGroup",c.candidateForm),l(12),s("ngIf",c.f.first_name.touched&&c.f.first_name.invalid),l(7),s("ngIf",c.f.last_name.touched&&c.f.last_name.invalid),l(15),s("ngForOf",c.genderOptions),l(2),s("ngIf",c.f.gender.touched&&c.f.gender.invalid),l(8),s("ngIf",c.f.email.touched&&c.f.email.invalid),l(7),s("ngIf",c.f.phone.touched&&c.f.phone.invalid),l(8),s("ngIf",c.f.date_of_birth.touched&&c.f.date_of_birth.invalid),l(5),s("ngIf",c.f.alternate_phone.touched&&c.f.alternate_phone.invalid),l(12),s("ngIf",c.f.position.touched&&c.f.position.invalid),l(10),s("ngIf",c.isLoadingMasterData),l(),s("ngForOf",c.designations),l(2),s("ngIf",c.f.designation_id.touched&&c.f.designation_id.invalid),l(11),s("ngIf",c.isLoadingMasterData),l(),s("ngForOf",c.departments),l(2),s("ngIf",c.f.department_id.touched&&c.f.department_id.invalid),l(10),s("ngIf",c.isLoadingMasterData),l(),s("ngForOf",c.locations),l(2),s("ngIf",c.f.location_id.touched&&c.f.location_id.invalid),l(11),s("ngIf",c.f.offered_ctc.touched&&c.f.offered_ctc.invalid),l(7),s("ngIf",c.f.joining_date.touched&&c.f.joining_date.invalid),l(9),s("value",c.managerSearchQuery),l(),s("ngIf",c.managerSearchQuery),l(5),s("ngIf",c.isLoadingMasterData),l(),s("ngIf",!c.isLoadingMasterData),l(2),s("ngIf",!c.isLoadingMasterData),l(15),s("ngForOf",c.sources),l(2),s("ngIf",c.f.recruitment_source.touched&&c.f.recruitment_source.invalid),l(6),s("disabled",c.isSubmitting),l(2),s("disabled",c.isSubmitting||c.candidateForm.invalid),l(),s("ngIf",c.isSubmitting),l(),s("ngIf",!c.isSubmitting))},dependencies:[G,D,Ln,qn,Rn,An,$n,Un,Y,Vn,jn,Nn,T,Q,F,z,A,V,X,K],styles:[`@charset "UTF-8";



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
ion-header[_ngcontent-%COMP%] {
  border-bottom: 1px solid #eef2f6;
}
ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {
  --background: #ffffff;
  --color: #0f172a;
  --padding-start: 24px;
  --padding-end: 24px;
  --height: 64px;
}
ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
  --padding-start: 0;
}
ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --color: #64748b;
  margin: 0;
  --height: 40px;
  --width: 40px;
  --border-radius: 50%;
  --padding-start: 0;
  --padding-end: 0;
}
ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:hover {
  --color: #1F74BB;
  --background: #f1f5f9;
}
.glass-content[_ngcontent-%COMP%] {
  --background: #f8fafc;
}
.modal-form-container[_ngcontent-%COMP%] {
  padding: 16px 8px;
}
.beauty-form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-section[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #eef2f6;
  padding: 28px 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.form-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: #1F74BB;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}
.form-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.form-group-lux[_ngcontent-%COMP%] {
  margin-bottom: 20px;
  position: relative;
}
.form-group-lux[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 13px;
  color: #475569;
  margin-bottom: 8px;
  font-weight: 700;
}
.form-group-lux[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {
  color: #dc2626;
  margin-left: 2px;
}
.lux-input[_ngcontent-%COMP%] {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  color: #0f172a;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
.lux-input[_ngcontent-%COMP%]:focus {
  border-color: #1F74BB;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.lux-input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
  font-weight: 500;
}
input[type=date][_ngcontent-%COMP%]::-webkit-datetime-edit-text, 
input[type=date][_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, 
input[type=date][_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, 
input[type=date][_ngcontent-%COMP%]::-webkit-datetime-edit-year-field {
  color: #0f172a;
}
input[type=date][_ngcontent-%COMP%]:invalid::-webkit-datetime-edit {
  color: #94a3b8;
}
.input-wrapper-lux[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.input-wrapper-lux[_ngcontent-%COMP%]   .curr-prefix[_ngcontent-%COMP%] {
  position: absolute;
  left: 14px;
  color: #1F74BB;
  font-weight: 800;
  font-size: 15px;
  pointer-events: none;
}
.input-wrapper-lux[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  padding-left: 32px !important;
}
.select-wrapper[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.select-wrapper[_ngcontent-%COMP%]   .select-chevron[_ngcontent-%COMP%] {
  position: absolute;
  right: 14px;
  color: #64748b;
  pointer-events: none;
  font-size: 16px;
}
.select-wrapper[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  appearance: none;
  cursor: pointer;
  padding-right: 36px;
  background-image: none;
}
.select-wrapper[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:invalid, 
.select-wrapper[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]   option[value=""][_ngcontent-%COMP%] {
  color: #94a3b8;
}
.grid-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 600px) {
  .grid-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
.dept-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  background: #e8f0fb;
  color: #1F74BB;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid rgba(31, 116, 187, 0.15);
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  vertical-align: middle;
}
.manager-search-wrapper[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0 12px;
  gap: 8px;
  transition: all 0.2s;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(31, 116, 187, 0.08);
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%]   .search-icon-sm[_ngcontent-%COMP%] {
  font-size: 15px;
  color: #94a3b8;
  flex-shrink: 0;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%]   .manager-search-input[_ngcontent-%COMP%] {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  padding: 10px 0;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%]   .manager-search-input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%]   .clear-search-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #94a3b8;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-search-bar[_ngcontent-%COMP%]   .clear-search-icon[_ngcontent-%COMP%]:hover {
  color: #dc2626;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-count-hint[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: #16a34a;
  padding: 0 2px;
}
.manager-search-wrapper[_ngcontent-%COMP%]   .manager-count-hint[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 13px;
}
.error-msg-lux[_ngcontent-%COMP%] {
  color: #dc2626;
  font-size: 11px;
  font-weight: 700;
  margin-top: 6px;
  padding-left: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.button-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #eef2f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}
.button-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  height: 44px;
  padding: 0 24px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.button-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.button-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #475569;
}
.button-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #e2e8f0;
  color: #0f172a;
}
.button-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {
  background: #1F74BB;
  border: 1px solid #1F74BB;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.button-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #175191;
  border-color: #175191;
  transform: translateY(-1px);
}
.button-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:active:not(:disabled) {
  transform: translateY(0);
}
.button-footer[_ngcontent-%COMP%]   .btn-spinner[_ngcontent-%COMP%] {
  --color: #ffffff;
  width: 20px;
  height: 20px;
}`]});let o=d;return o})();function pt(o,d){if(o&1&&(e(0,"span",51),r(1),n()),o&2){let a=g();l(),b(a.stats.total_candidates)}}function gt(o,d){o&1&&p(0,"ion-spinner",52)}function ft(o,d){if(o&1&&(e(0,"span",51),r(1),n()),o&2){let a=g();l(),b(a.stats.offer_accepted)}}function mt(o,d){o&1&&p(0,"ion-spinner",52)}function _t(o,d){if(o&1&&(e(0,"span",51),r(1),n()),o&2){let a=g();l(),b(a.stats.ready_to_join)}}function ut(o,d){o&1&&p(0,"ion-spinner",52)}var ue=(()=>{let d=class d{constructor(t,i,c){this.candidateService=t,this.router=i,this.modalController=c,this.stats={total_candidates:0,offer_accepted:0,documents_pending:0,bgv_pending:0,ready_to_join:0},this.isLoading=!0}ngOnInit(){this.loadStats()}openCreateCandidateModal(){return Sn(this,null,function*(){let t=yield this.modalController.create({component:me,cssClass:"side-custom-popup"});return t.onDidDismiss().then(i=>{i.data&&this.loadStats()}),yield t.present()})}loadStats(){this.isLoading=!0,this.candidateService.getAllCandidates().subscribe({next:t=>{Array.isArray(t)&&(this.stats.total_candidates=t.length,this.stats.offer_accepted=t.filter(i=>i.status==="offer_accepted").length,this.stats.documents_pending=t.filter(i=>i.status==="documents_pending").length,this.stats.bgv_pending=t.filter(i=>i.status==="bgv_pending").length,this.stats.ready_to_join=t.filter(i=>i.status==="ready_to_join").length),this.isLoading=!1},error:t=>{console.error("Error loading candidates for stats:",t),this.isLoading=!1}})}navigateToPreonboarding(t){this.router.navigate(["/onboarding/preonboarding"],{queryParams:{status:t}})}};d.\u0275fac=function(i){return new(i||d)(v(j),v(J),v(xn))},d.\u0275cmp=E({type:d,selectors:[["app-onboarding-dashboard"]],standalone:!1,decls:102,vars:12,consts:[[1,"ion-no-border",3,"translucent"],[1,"glass-content",3,"fullscreen"],[1,"page-container"],[1,"header-section","fade-in"],[1,"header-top"],[1,"header-text"],[1,"header-actions"],[1,"action-btn","restore-btn",3,"click"],["name","person-add-outline","slot","start"],[1,"stats-grid"],[1,"stat-item","total",3,"click"],[1,"item-overlay"],[1,"item-content"],[1,"icon-box"],["name","people-outline"],[1,"text-box"],[1,"label"],["class","value",4,"ngIf"],["name","crescent",4,"ngIf"],[1,"decoration"],["name","people-circle-outline"],[1,"stat-item","accepted",3,"click"],["name","mail-unread-outline"],["name","mail-outline"],[1,"stat-item","success",3,"click"],["name","checkmark-done-circle-outline"],["name","rocket-outline"],[1,"action-section"],[1,"section-header"],[1,"line"],[1,"action-grid"],[1,"action-card","warning",3,"click"],[1,"card-icon"],["name","document-text-outline"],[1,"card-body"],[1,"count-pill"],[1,"card-arrow"],["name","chevron-forward-outline"],[1,"action-card","danger",3,"click"],["name","finger-print-outline"],[1,"quick-nav-section"],[1,"nav-grid"],["routerLink","/onboarding/preonboarding",1,"nav-tile"],[1,"tile-icon","pulse-blue"],["name","list-outline"],[1,"nav-tile",3,"click"],[1,"tile-icon","pulse-green"],["name","add-circle-outline"],[1,"nav-tile","disabled"],[1,"tile-icon"],["name","settings-outline"],[1,"value"],["name","crescent"]],template:function(i,c){i&1&&(p(0,"ion-header",0),e(1,"ion-content",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h1"),r(7,"Candidate Onboarding"),n(),e(8,"p"),r(9,"Streamline your hiring process, track candidate experience, and manage the pre-onboarding pipeline."),n()(),e(10,"div",6)(11,"ion-button",7),m("click",function(){return c.openCreateCandidateModal()}),p(12,"ion-icon",8),r(13," New Candidate "),n()()()(),e(14,"div",9)(15,"div",10),m("click",function(){return c.navigateToPreonboarding("all")}),p(16,"div",11),e(17,"div",12)(18,"div",13),p(19,"ion-icon",14),n(),e(20,"div",15)(21,"span",16),r(22,"Total Pipeline"),n(),f(23,pt,2,1,"span",17)(24,gt,1,0,"ion-spinner",18),n()(),e(25,"div",19),p(26,"ion-icon",20),n()(),e(27,"div",21),m("click",function(){return c.navigateToPreonboarding("offer_accepted")}),p(28,"div",11),e(29,"div",12)(30,"div",13),p(31,"ion-icon",22),n(),e(32,"div",15)(33,"span",16),r(34,"Offer Accepted"),n(),f(35,ft,2,1,"span",17)(36,mt,1,0,"ion-spinner",18),n()(),e(37,"div",19),p(38,"ion-icon",23),n()(),e(39,"div",24),m("click",function(){return c.navigateToPreonboarding("ready_to_join")}),p(40,"div",11),e(41,"div",12)(42,"div",13),p(43,"ion-icon",25),n(),e(44,"div",15)(45,"span",16),r(46,"Ready to Join"),n(),f(47,_t,2,1,"span",17)(48,ut,1,0,"ion-spinner",18),n()(),e(49,"div",19),p(50,"ion-icon",26),n()()(),e(51,"div",27)(52,"div",28)(53,"h2"),r(54,"Action Required"),n(),p(55,"div",29),n(),e(56,"div",30)(57,"div",31),m("click",function(){return c.navigateToPreonboarding("documents_pending")}),e(58,"div",32),p(59,"ion-icon",33),n(),e(60,"div",34)(61,"h3"),r(62,"Documents Pending"),n(),e(63,"p"),r(64),n(),e(65,"div",35),r(66),n()(),e(67,"div",36),p(68,"ion-icon",37),n()(),e(69,"div",38),m("click",function(){return c.navigateToPreonboarding("bgv_pending")}),e(70,"div",32),p(71,"ion-icon",39),n(),e(72,"div",34)(73,"h3"),r(74,"BGV Pending"),n(),e(75,"p"),r(76),n(),e(77,"div",35),r(78),n()(),e(79,"div",36),p(80,"ion-icon",37),n()()()(),e(81,"div",40)(82,"div",28)(83,"h2"),r(84,"Quick Access"),n(),p(85,"div",29),n(),e(86,"div",41)(87,"div",42)(88,"div",43),p(89,"ion-icon",44),n(),e(90,"span"),r(91,"Pre-Onboarding List"),n()(),e(92,"div",45),m("click",function(){return c.openCreateCandidateModal()}),e(93,"div",46),p(94,"ion-icon",47),n(),e(95,"span"),r(96,"Create New Candidate"),n()(),e(97,"div",48)(98,"div",49),p(99,"ion-icon",50),n(),e(100,"span"),r(101,"Onboarding Settings"),n()()()()()()),i&2&&(s("translucent",!0),l(),s("fullscreen",!0),l(22),s("ngIf",!c.isLoading),l(),s("ngIf",c.isLoading),l(11),s("ngIf",!c.isLoading),l(),s("ngIf",c.isLoading),l(11),s("ngIf",!c.isLoading),l(),s("ngIf",c.isLoading),l(16),x("Verification pending for ",c.stats.documents_pending," candidates"),l(2),b(c.stats.documents_pending),l(10),x("Background verification required for ",c.stats.bgv_pending," candidates"),l(2),b(c.stats.bgv_pending))},dependencies:[D,T,F,z,A,V,de,zn],styles:[`@charset "UTF-8";



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
.page-container[_ngcontent-%COMP%] {
  padding: 32px 40px;
  margin: 0 auto;
}
.header-section[_ngcontent-%COMP%] {
  margin-bottom: 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #eef2f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  padding: 24px 32px;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #64748b;
  margin: 6px 0 0;
  max-width: 650px;
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
  font-weight: 700;
  height: 42px;
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  text-transform: none;
  letter-spacing: 0;
  --box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]::part(native) {
  border-radius: 8px;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn.restore-btn[_ngcontent-%COMP%] {
  --background: #1F74BB;
  --color: #ffffff;
}
.header-section[_ngcontent-%COMP%]   .header-top[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .action-btn.restore-btn[_ngcontent-%COMP%]:hover {
  --background: #175191;
}
.stats-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {
  position: relative;
  border-radius: 16px;
  padding: 32px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  border: 1px solid #eef2f6;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .item-content[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 24px;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .item-content[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.2s ease;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .item-content[_ngcontent-%COMP%]   .text-box[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .item-content[_ngcontent-%COMP%]   .text-box[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .item-content[_ngcontent-%COMP%]   .text-box[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .decoration[_ngcontent-%COMP%] {
  position: absolute;
  right: -10px;
  bottom: -10px;
  font-size: 80px;
  opacity: 0.03;
  transform: rotate(-15deg);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  color: #0f172a;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.total[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #0f172a;
  border: 1px solid #f1f5f9;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.total[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.total[_ngcontent-%COMP%]:hover   .decoration[_ngcontent-%COMP%] {
  transform: rotate(0deg) scale(1.1);
  opacity: 0.06;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.accepted[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.accepted[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.accepted[_ngcontent-%COMP%]:hover   .decoration[_ngcontent-%COMP%] {
  transform: rotate(0deg) scale(1.1);
  opacity: 0.06;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.success[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.success[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #16a34a;
}
.stats-grid[_ngcontent-%COMP%]   .stat-item.success[_ngcontent-%COMP%]:hover   .decoration[_ngcontent-%COMP%] {
  transform: rotate(0deg) scale(1.1);
  opacity: 0.06;
}
.action-section[_ngcontent-%COMP%] {
  margin-bottom: 40px;
}
.action-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.action-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.action-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {
  height: 1px;
  flex-grow: 1;
  background: #f1f5f9;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  border: 1px solid #eef2f6;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  flex-grow: 1;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 4px 0 0;
  font-size: 11px;
  color: #475569;
  line-height: 1.4;
  font-weight: 500;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .count-pill[_ngcontent-%COMP%] {
  display: inline-block;
  margin-top: 12px;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.warning[_ngcontent-%COMP%] {
  border-left: 4px solid #d97706;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.warning[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.warning[_ngcontent-%COMP%]   .count-pill[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.warning[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(8px);
  border-color: #d97706;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.danger[_ngcontent-%COMP%] {
  border-left: 4px solid #dc2626;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.danger[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.danger[_ngcontent-%COMP%]   .count-pill[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card.danger[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  transform: translateX(8px);
  border-color: #dc2626;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]   .card-arrow[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 20px;
  transition: all 0.2s ease;
}
.action-section[_ngcontent-%COMP%]   .action-grid[_ngcontent-%COMP%]   .action-card[_ngcontent-%COMP%]:hover   .card-arrow[_ngcontent-%COMP%] {
  transform: translateX(4px);
  color: #1F74BB;
}
.quick-nav-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.quick-nav-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.quick-nav-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {
  height: 1px;
  flex-grow: 1;
  background: #f1f5f9;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  border: 1px solid #eef2f6;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%]   .tile-icon[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 4px;
  border: 1px solid transparent;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%]   .tile-icon.pulse-blue[_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border-color: rgba(31, 116, 187, 0.1);
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%]   .tile-icon.pulse-green[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%]:hover:not(.disabled) {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile[_ngcontent-%COMP%]:hover:not(.disabled)   span[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile.disabled[_ngcontent-%COMP%] {
  opacity: 0.5;
  cursor: not-allowed;
}
.quick-nav-section[_ngcontent-%COMP%]   .nav-grid[_ngcontent-%COMP%]   .nav-tile.disabled[_ngcontent-%COMP%]   .tile-icon[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #94a3b8;
}
@media (max-width: 900px) {
  .stats-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
  .action-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .stats-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .nav-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
  .header-content[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 16px;
    padding: 24px 20px;
  }
  .header-content[_ngcontent-%COMP%]   .premium-btn[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
  .dashboard-wrap[_ngcontent-%COMP%] {
    padding: 32px 20px;
  }
}`]});let o=d;return o})();function ht(o,d){if(o&1&&(e(0,"ion-select-option",16),r(1),n()),o&2){let a=d.$implicit;s("value",a.value),l(),x(" ",a.label," ")}}function bt(o,d){o&1&&(e(0,"div",17),p(1,"ion-spinner",18),e(2,"p"),r(3,"Retrieving candidate pipeline..."),n()())}function xt(o,d){if(o&1){let a=O();e(0,"div",19)(1,"div",20),p(2,"ion-icon",21),n(),e(3,"h2"),r(4,"No Candidates Found"),n(),e(5,"p"),r(6,"We couldn't find any candidates matching your criteria"),n(),e(7,"ion-button",22),m("click",function(){u(a);let i=g();return i.selectedStatus="all",h(i.filterCandidates())}),r(8," Clear All Filters "),n()()}}function Ct(o,d){if(o&1){let a=O();e(0,"div",25),m("click",function(){let i=u(a).$implicit,c=g(2);return h(c.onCandidateClick(i))}),e(1,"div",26)(2,"div",27)(3,"div",28),r(4),y(5,"slice"),n(),e(6,"div",29)(7,"h2"),r(8),n(),e(9,"p",30),r(10),n()()(),e(11,"div",31),p(12,"span",32),r(13),n()(),e(14,"div",33)(15,"div",34)(16,"div",35)(17,"span",36),r(18,"Department"),n(),e(19,"span",37),r(20),n()(),e(21,"div",35)(22,"span",36),r(23,"Date of joining"),n(),e(24,"span",37),r(25),y(26,"date"),n()(),e(27,"div",35)(28,"span",36),r(29,"Contact Email"),n(),e(30,"span",38),r(31),n()(),e(32,"div",35)(33,"span",36),r(34,"Offered package"),n(),e(35,"span",37),r(36),y(37,"number"),n()()(),e(38,"div",39)(39,"div",40)(40,"span",41),r(41,"Workflow progress"),n(),e(42,"span",42),r(43),n()(),e(44,"div",43),p(45,"div",44),n()()(),e(46,"div",45)(47,"ion-button",46),r(48," View Detail Profile "),p(49,"ion-icon",47),n()()()}if(o&2){let a=d.$implicit,t=g(2);l(3),N("background-color",t.getStatusColor(a.status)),l(),x(" ",nn(5,16,a.full_name,0,1)," "),l(4),b(a.full_name),l(2),b(a.position),l(),kn("data-status",a.status),l(2),x(" ",t.getStatusLabel(a.status)," "),l(7),b(a.department_name||a.department||"Non-assigned"),l(5),b(q(26,20,a.joining_date,"dd MMM, yyyy")),l(6),b(a.email),l(5),x("\u20B9",U(37,23,a.offered_ctc)),l(7),x("",a.progress||0,"%"),l(2),N("width",a.progress||0,"%")("background-color",t.getStatusColor(a.status))}}function vt(o,d){if(o&1&&(e(0,"div",23),f(1,Ct,50,25,"div",24),n()),o&2){let a=g();l(),s("ngForOf",a.filteredCandidates)}}var he=(()=>{let d=class d{constructor(t,i,c){this.candidateService=t,this.router=i,this.toasterService=c,this.destroy$=new R,this.candidates=[],this.filteredCandidates=[],this.isLoading=!0,this.searchTerm="",this.selectedStatus="all",this.statusOptions=[{label:"All Candidates",value:"all"},{label:"Offer Accepted",value:"offer_accepted"},{label:"Documents Pending",value:"documents_pending"},{label:"BGV Pending",value:"bgv_pending"},{label:"Ready to Join",value:"ready_to_join"}]}ngOnInit(){this.loadCandidates()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadCandidates(){this.isLoading=!0,this.candidateService.getAllCandidates().pipe(M(this.destroy$)).subscribe({next:t=>{Array.isArray(t)?this.candidates=t:t&&t.candidates?this.candidates=t.candidates:t&&t.data?this.candidates=t.data:this.candidates=[],this.filterCandidates(),this.isLoading=!1},error:t=>{console.error("Error loading candidates:",t),this.toasterService.showError("Failed to load candidates"),this.isLoading=!1}})}onRefresh(t){this.candidateService.getAllCandidates().pipe(M(this.destroy$)).subscribe({next:i=>{Array.isArray(i)?this.candidates=i:i&&i.candidates?this.candidates=i.candidates:i&&i.data&&(this.candidates=i.data),this.filterCandidates(),t.target.complete()},error:i=>{console.error("Error refreshing candidates:",i),t.target.complete()}})}onSearchChange(t){this.searchTerm=t.detail.value.toLowerCase(),this.filterCandidates()}onStatusChange(t){this.selectedStatus=t.detail.value,this.filterCandidates()}filterCandidates(){this.filteredCandidates=this.candidates.filter(t=>{let i=!this.searchTerm||t.full_name?.toLowerCase().includes(this.searchTerm)||t.email?.toLowerCase().includes(this.searchTerm),c=this.selectedStatus==="all"||t.status===this.selectedStatus;return i&&c})}getStatusColor(t){return{offer_accepted:"primary",documents_pending:"danger",bgv_pending:"warning",ready_to_join:"success",hired:"success",on_hold:"medium"}[t]||"medium"}getStatusLabel(t){return{offer_accepted:"Offer Accepted",documents_pending:"Docs Pending",bgv_pending:"BGV Pending",ready_to_join:"Ready to Join",hired:"Hired",on_hold:"On Hold"}[t]||t.replace("_"," ")}onCandidateClick(t){this.router.navigate(["/onboarding/preonboarding",t.id])}compareSelect(t,i){return t===i}};d.\u0275fac=function(i){return new(i||d)(v(j),v(J),v(Z))},d.\u0275cmp=E({type:d,selectors:[["app-preonboarding-list"]],standalone:!1,decls:19,vars:6,consts:[[1,"ion-no-border"],[1,"gradient-header"],["slot","start"],["defaultHref","/onboarding","color","light"],[1,"search-filter-sub"],[1,"search-section"],["placeholder","Search candidate...","mode","md",1,"custom-search",3,"ionChange"],[1,"filter-pill"],["name","funnel-outline"],["interface","popover",3,"ngModelChange","ionChange","compareWith","ngModel"],[3,"value",4,"ngFor","ngForOf"],["class","loading-overlay",4,"ngIf"],["slot","fixed",3,"ionRefresh"],["pullingIcon","chevron-down-circle-outline","refreshingSpinner","dots"],["class","empty-wrap",4,"ngIf"],["class","candidates-list",4,"ngIf"],[3,"value"],[1,"loading-overlay"],["name","crescent","color","primary"],[1,"empty-wrap"],[1,"empty-icon"],["name","search-outline"],["fill","outline","color","primary",3,"click"],[1,"candidates-list"],["class","candidate-card",3,"click",4,"ngFor","ngForOf"],[1,"candidate-card",3,"click"],[1,"card-header"],[1,"header-main"],[1,"avatar-circle"],[1,"name-block"],[1,"position"],[1,"status-badge"],[1,"dot"],[1,"card-body"],[1,"info-grid"],[1,"info-cell"],[1,"label"],[1,"value"],[1,"value","email-link"],[1,"progress-box"],[1,"progress-details"],[1,"p-label"],[1,"p-value"],[1,"progress-bar-wrap"],[1,"progress-fill"],[1,"card-footer"],["fill","clear","size","small","color","primary"],["name","arrow-forward-outline","slot","end"]],template:function(i,c){i&1&&(e(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),p(3,"ion-back-button",3),n(),e(4,"ion-title"),r(5,"Pre-onboarding Pipeline"),n()(),e(6,"ion-toolbar",4)(7,"div",5)(8,"ion-searchbar",6),m("ionChange",function(C){return c.onSearchChange(C)}),n(),e(9,"div",7),p(10,"ion-icon",8),e(11,"ion-select",9),k("ngModelChange",function(C){return w(c.selectedStatus,C)||(c.selectedStatus=C),C}),m("ionChange",function(C){return c.onStatusChange(C)}),f(12,ht,2,2,"ion-select-option",10),n()()()()(),e(13,"ion-content"),f(14,bt,4,0,"div",11),e(15,"ion-refresher",12),m("ionRefresh",function(C){return c.onRefresh(C)}),p(16,"ion-refresher-content",13),n(),f(17,xt,9,0,"div",14)(18,vt,2,1,"div",15),n()),i&2&&(l(11),s("compareWith",c.compareSelect),S("ngModel",c.selectedStatus),l(),s("ngForOf",c.statusOptions),l(2),s("ngIf",c.isLoading),l(3),s("ngIf",!c.isLoading&&c.filteredCandidates.length===0),l(),s("ngIf",!c.isLoading&&c.filteredCandidates.length>0))},dependencies:[G,D,Y,gn,T,Q,F,z,A,ie,oe,re,_n,un,V,X,K,fn,mn,hn,sn,H,W],styles:[`

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
.gradient-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.gradient-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  letter-spacing: -0.05em;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  color: #ffffff;
}
.search-filter-sub[_ngcontent-%COMP%] {
  --background: #ffffff;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .custom-search[_ngcontent-%COMP%] {
  --box-shadow: none;
  --background: #f8fafc;
  --border-radius: 8px;
  --padding-start: 12px;
  padding: 0;
  flex-grow: 1;
  border: 1px solid #ABABAB;
  border-radius: 8px;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .custom-search[_ngcontent-%COMP%]:focus-within {
  border-color: #1F74BB;
  --background: #ffffff;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .filter-pill[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  padding: 8px 16px;
  border-radius: 8px;
  color: #1e293b;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  border: 1px solid #ABABAB;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .filter-pill[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #475569;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .filter-pill[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {
  --padding-start: 0;
  --padding-end: 0;
  padding: 0;
  min-height: auto;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
}
.search-filter-sub[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .filter-pill[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}
.loading-overlay[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}
.loading-overlay[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-top: 16px;
  color: #475569;
  font-weight: 500;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
.empty-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
}
.empty-wrap[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  background: #f8fafc;
  color: #94a3b8;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 24px;
  border: 1px solid #f1f5f9;
}
.empty-wrap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  font-weight: 700;
  color: #0f172a;
}
.empty-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 10px 0 24px;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  color: #475569;
  max-width: 280px;
}
.empty-wrap[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --border-radius: 8px;
  font-weight: 700;
  text-transform: none;
  height: 44px;
}
.candidates-list[_ngcontent-%COMP%] {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f4f7fb;
  min-height: 100%;
}
.candidate-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 0;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  overflow: hidden;
}
.candidate-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border-color: #1F74BB;
}
.candidate-card[_ngcontent-%COMP%]:hover   .card-footer[_ngcontent-%COMP%] {
  background: #f8fafc;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  padding: 20px 24px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .avatar-circle[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .name-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-main[_ngcontent-%COMP%]   .name-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%] {
  margin: 2px 0 0;
  font-size: clamp(0.625rem, 0.2vw + 0.3rem, 0.75rem);
  font-weight: 600;
  color: #475569;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #f1f5f9;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #94a3b8;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=offer_accepted][_ngcontent-%COMP%] {
  background: #e8f0fb;
  color: #1F74BB;
  border-color: rgba(31, 116, 187, 0.15);
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=offer_accepted][_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #1F74BB;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=documents_pending][_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border-color: #fde68a;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=documents_pending][_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #d97706;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=bgv_pending][_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=bgv_pending][_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #dc2626;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=ready_to_join][_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
}
.candidate-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .status-badge[data-status=ready_to_join][_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {
  background: #16a34a;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 24px;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-cell[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-cell[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-cell[_ngcontent-%COMP%]   .value.email-link[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .progress-box[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .progress-box[_ngcontent-%COMP%]   .progress-details[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .progress-box[_ngcontent-%COMP%]   .progress-details[_ngcontent-%COMP%]   .p-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #1e293b;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .progress-box[_ngcontent-%COMP%]   .progress-details[_ngcontent-%COMP%]   .p-value[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .progress-box[_ngcontent-%COMP%]   .progress-bar-wrap[_ngcontent-%COMP%] {
  width: 100%;
  height: 6px;
  background: #ABABAB;
  border-radius: 9999px;
  overflow: hidden;
}
.candidate-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .progress-box[_ngcontent-%COMP%]   .progress-bar-wrap[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {
  height: 100%;
  border-radius: 9999px;
  transition: width 1s ease-in-out;
}
.candidate-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {
  padding: 12px 24px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  transition: all 0.2s ease;
}
.candidate-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
  --padding-start: 12px;
  --padding-end: 12px;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  margin: 0;
  text-transform: none;
}
.candidate-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  margin-left: 6px;
  font-size: 18px;
}
@media (max-width: 600px) {
  .search-section[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch !important;
  }
  .search-section[_ngcontent-%COMP%]   .filter-pill[_ngcontent-%COMP%] {
    width: 100%;
  }
  .card-header[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 16px;
  }
  .card-header[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
  .info-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr !important;
    gap: 16px;
  }
}`]});let o=d;return o})();var be=(()=>{let d=class d{constructor(t){this.http=t,this.apiUrl=`http://${L.apiURL}/api/preonboarding`}getAllTasks(){return this.http.get(`${this.apiUrl}/tasks`)}createTask(t){return this.http.post(`${this.apiUrl}/tasks`,t)}updateTask(t,i){return this.http.put(`${this.apiUrl}/tasks/${t}`,i)}deleteTask(t){return this.http.delete(`${this.apiUrl}/tasks/${t}`)}assignTasks(t,i){return this.http.post(`${this.apiUrl}/assign/${t}`,{task_ids:i})}getProgress(t){return this.http.get(`${this.apiUrl}/progress/${t}`)}updateProgress(t,i,c=""){return this.http.put(`${this.apiUrl}/progress/${t}`,{status:i,remarks:c})}setupDefaultTasks(){return this.http.post(`${this.apiUrl}/tasks/setup-defaults`,{})}};d.\u0275fac=function(i){return new(i||d)(an(pn))},d.\u0275prov=on({token:d,factory:d.\u0275fac,providedIn:"root"});let o=d;return o})();var xe=(()=>{let d=class d{transform(t,i,c){return t&&t.replace(new RegExp(i,"g"),c)}};d.\u0275fac=function(i){return new(i||d)},d.\u0275pipe=wn({name:"replace",type:d,pure:!0});let o=d;return o})();function Ot(o,d){o&1&&(e(0,"div",7),p(1,"ion-spinner",8),e(2,"p"),r(3,"Loading candidate details..."),n()())}function yt(o,d){if(o&1){let a=O();I(0),e(1,"div",37)(2,"div",38)(3,"div",39)(4,"div",40),p(5,"ion-icon",41),n(),e(6,"h2"),r(7,"Candidate Information"),n()()(),e(8,"div",42)(9,"div",43)(10,"label"),r(11,"Phone Number"),n(),e(12,"span"),r(13),n()(),e(14,"div",43)(15,"label"),r(16,"Designation"),n(),e(17,"span"),r(18),n()(),e(19,"div",43)(20,"label"),r(21,"Current Location"),n(),e(22,"span"),r(23),n()(),e(24,"div",43)(25,"label"),r(26,"Offered Package (CTC)"),n(),e(27,"span"),r(28),y(29,"number"),n()(),e(30,"div",43)(31,"label"),r(32,"Reporting Manager"),n(),e(33,"span"),r(34),n()()()(),e(35,"div",44)(36,"div",45)(37,"h3"),r(38,"Lifecycle Management"),n(),e(39,"p"),r(40,"Initiate the pre-onboarding workflow for this candidate."),n(),e(41,"div",46)(42,"ion-button",47),m("click",function(){u(a);let i=g(2);return h(i.startPreonboarding())}),p(43,"ion-icon",48),r(44," Start Workflow "),n()()(),e(45,"div",45)(46,"h3"),r(47,"Final Decision"),n(),e(48,"p"),r(49,"Complete the hiring process once all criteria are met."),n(),e(50,"div",46)(51,"ion-button",49),m("click",function(){u(a);let i=g(2);return h(i.hireAsEmployee())}),p(52,"ion-icon",50),r(53," Hire Employee "),n(),e(54,"ion-button",51),m("click",function(){u(a);let i=g(2);return h(i.putOnHold())}),p(55,"ion-icon",52),r(56," Hold Process "),n()()()(),B()}if(o&2){let a=g(2);l(13),b(a.candidate.phone),l(5),b(a.candidate.designation_name||"Not Provided"),l(5),b(a.candidate.location_name||"Remote"),l(5),x("\u20B9",U(29,5,a.candidate.offered_ctc)),l(6),b(a.candidate.manager_name||"N/A")}}function St(o,d){o&1&&(e(0,"ion-badge",65),r(1,"Mandatory"),n())}function wt(o,d){if(o&1){let a=O();e(0,"div",57)(1,"div",58)(2,"div",59),p(3,"ion-icon",60),n(),e(4,"div",61)(5,"h4"),r(6),n(),e(7,"p"),r(8),n()()(),e(9,"div",62),f(10,St,2,0,"ion-badge",63),e(11,"ion-checkbox",64),m("ionChange",function(){let i=u(a).$implicit,c=g(3);return h(c.completeTask(i))}),n()()()}if(o&2){let a=d.$implicit;l(3),s("name",a.status==="completed"?"checkmark-circle":"ellipse-outline"),l(3),b(a.task_name),l(2),b(a.task_category),l(2),s("ngIf",a.is_mandatory),l(),s("checked",a.status==="completed")}}function kt(o,d){o&1&&(e(0,"div",66),p(1,"ion-icon",67),e(2,"p"),r(3,"No tasks assigned to this candidate yet."),n()())}function Et(o,d){if(o&1&&(I(0),e(1,"div",37)(2,"div",38)(3,"div",39)(4,"div",40),p(5,"ion-icon",53),n(),e(6,"h2"),r(7,"Pre-onboarding Checklist"),n()(),e(8,"div",54),r(9,"Refresh List"),n()(),f(10,wt,12,5,"div",55)(11,kt,4,0,"div",56),n(),B()),o&2){let a=g(2);l(10),s("ngForOf",a.preonboardingTasks),l(),s("ngIf",a.preonboardingTasks.length===0)}}function It(o,d){if(o&1){let a=O();e(0,"div",37)(1,"div",38)(2,"div",39)(3,"div",40),p(4,"ion-icon",69),n(),e(5,"h2"),r(6,"Offer Management"),n()()(),e(7,"div",70)(8,"div",45)(9,"h3"),r(10,"Generation"),n(),e(11,"p"),r(12,"Generate a new job offer with detailed salary breakup."),n(),e(13,"ion-button",47),m("click",function(){u(a);let i=g(3);return h(i.openOfferForm())}),p(14,"ion-icon",71),r(15," Create New Offer "),n()(),e(16,"div",45)(17,"h3"),r(18,"Communication"),n(),e(19,"p"),r(20,"Email the generated offer letter to the candidate."),n(),e(21,"ion-button",72),m("click",function(){u(a);let i=g(3);return h(i.sendOffer())}),p(22,"ion-icon",73),r(23," Send to Candidate "),n()()()()}}function Bt(o,d){if(o&1){let a=O();e(0,"ion-datetime",92),k("ngModelChange",function(i){u(a);let c=g(4);return w(c.offerData.joining_date,i)||(c.offerData.joining_date=i),h(i)}),n()}if(o&2){let a=g(4);S("ngModel",a.offerData.joining_date),s("showDefaultButtons",!0)}}function Dt(o,d){if(o&1){let a=O();e(0,"div",37)(1,"div",38)(2,"div",39)(3,"div",40),p(4,"ion-icon",74),n(),e(5,"h2"),r(6,"Generate Offer Letter"),n()()(),e(7,"div",75)(8,"ion-list",76)(9,"ion-item",77)(10,"ion-label",78),r(11,"Designation Position"),n(),e(12,"ion-input",79),k("ngModelChange",function(i){u(a);let c=g(3);return w(c.offerData.position,i)||(c.offerData.position=i),h(i)}),n()(),e(13,"div",80)(14,"ion-item",77)(15,"ion-label",78),r(16,"Annual CTC"),n(),e(17,"ion-input",81),k("ngModelChange",function(i){u(a);let c=g(3);return w(c.offerData.offered_ctc,i)||(c.offerData.offered_ctc=i),h(i)}),n()(),e(18,"ion-item",77)(19,"ion-label",78),r(20,"Joining Date"),n(),p(21,"ion-input",82),y(22,"date"),e(23,"ion-popover",83),f(24,Bt,1,2,"ng-template"),n()()(),e(25,"div",84)(26,"h4",85),r(27,"MONTHLY BREAKUP"),n(),e(28,"div",86)(29,"ion-item",87)(30,"ion-label",78),r(31,"Basic"),n(),e(32,"ion-input",88),k("ngModelChange",function(i){u(a);let c=g(3);return w(c.offerData.salary_breakup.basic,i)||(c.offerData.salary_breakup.basic=i),h(i)}),n()(),e(33,"ion-item",87)(34,"ion-label",78),r(35,"HRA"),n(),e(36,"ion-input",88),k("ngModelChange",function(i){u(a);let c=g(3);return w(c.offerData.salary_breakup.hra,i)||(c.offerData.salary_breakup.hra=i),h(i)}),n()(),e(37,"ion-item",87)(38,"ion-label",78),r(39,"Special"),n(),e(40,"ion-input",88),k("ngModelChange",function(i){u(a);let c=g(3);return w(c.offerData.salary_breakup.special,i)||(c.offerData.salary_breakup.special=i),h(i)}),n()()()()(),e(41,"div",89)(42,"ion-button",90),m("click",function(){u(a);let i=g(3);return h(i.createOffer())}),r(43," Save and Generate "),n(),e(44,"ion-button",91),m("click",function(){u(a);let i=g(3);return h(i.showOfferForm=!1)}),r(45," Cancel "),n()()()()}if(o&2){let a=g(3);l(12),S("ngModel",a.offerData.position),l(5),S("ngModel",a.offerData.offered_ctc),l(4),s("value",q(22,6,a.offerData.joining_date,"dd MMM yyyy")),l(11),S("ngModel",a.offerData.salary_breakup.basic),l(4),S("ngModel",a.offerData.salary_breakup.hra),l(4),S("ngModel",a.offerData.salary_breakup.special)}}function Tt(o,d){if(o&1&&(I(0),f(1,It,24,0,"div",68)(2,Dt,46,9,"div",68),B()),o&2){let a=g(2);l(),s("ngIf",!a.showOfferForm),l(),s("ngIf",a.showOfferForm)}}function Ft(o,d){o&1&&(e(0,"div",107),r(1,"Click to upload new document"),n())}function zt(o,d){if(o&1&&(e(0,"div",108),r(1),n()),o&2){let a=g(3);l(),b(a.selectedFile.name)}}function At(o,d){if(o&1&&(e(0,"ion-select-option",109),r(1),n()),o&2){let a=d.$implicit;s("value",a.value),l(),x(" ",a.label," ")}}function Vt(o,d){if(o&1){let a=O();e(0,"ion-button",113),m("click",function(){u(a);let i=g().$implicit,c=g(3);return h(c.verifyDocument(i.id))}),r(1," Verify "),n()}}function Lt(o,d){if(o&1&&(e(0,"div",57)(1,"div",58)(2,"div",59),p(3,"ion-icon",110),n(),e(4,"div",61)(5,"h4"),r(6),y(7,"titlecase"),n(),e(8,"p"),r(9),n()()(),e(10,"div",62)(11,"div",111),r(12),n(),f(13,Vt,2,0,"ion-button",112),n()()),o&2){let a=d.$implicit;l(6),b(U(7,5,a.document_type)),l(3),b(a.file_name),l(2),s("ngClass",a.verified?"verified":"pending"),l(),x(" ",a.verified?"Verified":"Pending"," "),l(),s("ngIf",!a.verified)}}function $t(o,d){o&1&&(e(0,"div",114)(1,"p"),r(2,"No documents available yet."),n()())}function jt(o,d){if(o&1){let a=O();I(0),e(1,"div",37)(2,"div",38)(3,"div",39)(4,"div",40),p(5,"ion-icon",93),n(),e(6,"h2"),r(7,"Document Repository"),n()()(),e(8,"div",94),m("click",function(){u(a);let i=En(10);return h(i.click())}),e(9,"input",95,0),m("change",function(i){u(a);let c=g(2);return h(c.onFileSelected(i))}),n(),e(11,"div",96),p(12,"ion-icon",60),n(),f(13,Ft,2,0,"div",97)(14,zt,2,1,"div",98),n(),e(15,"div",99)(16,"ion-item",100)(17,"ion-label",78),r(18,"Category"),n(),e(19,"ion-select",101),k("ngModelChange",function(i){u(a);let c=g(2);return w(c.documentType,i)||(c.documentType=i),h(i)}),f(20,At,2,2,"ion-select-option",102),n()(),e(21,"ion-button",103),m("click",function(){u(a);let i=g(2);return h(i.uploadDocument())}),r(22),n()()(),e(23,"div",37)(24,"div",38)(25,"div",39)(26,"div",104),p(27,"ion-icon",105),n(),e(28,"h2"),r(29,"Uploaded Files"),n()()(),f(30,Lt,14,7,"div",55)(31,$t,3,0,"div",106),n(),B()}if(o&2){let a=g(2);l(12),s("name",a.selectedFile?"checkmark-circle":"cloud-upload-outline"),l(),s("ngIf",!a.selectedFile),l(),s("ngIf",a.selectedFile),l(5),S("ngModel",a.documentType),l(),s("ngForOf",a.documentTypes),l(),s("disabled",!a.selectedFile||a.uploadingDocument),l(),x(" ",a.uploadingDocument?"Uploading...":"Confirm Upload"," "),l(8),s("ngForOf",a.documents),l(),s("ngIf",!a.documents||a.documents.length===0)}}function Nt(o,d){if(o&1){let a=O();I(0),e(1,"div",37)(2,"div",38)(3,"div",39)(4,"div",40),p(5,"ion-icon",115),n(),e(6,"h2"),r(7,"Background Verification Check"),n()()(),e(8,"div",42)(9,"div",43)(10,"label"),r(11,"Current Status"),n(),e(12,"div",116),r(13),y(14,"uppercase"),n()(),e(15,"div",43)(16,"label"),r(17,"Date Started"),n(),e(18,"span"),r(19),y(20,"date"),n()(),e(21,"div",43)(22,"label"),r(23,"Date Completed"),n(),e(24,"span"),r(25),y(26,"date"),n()()(),p(27,"hr",117),e(28,"h3"),r(29,"Update Verification"),n(),e(30,"div",44)(31,"div",45)(32,"p"),r(33,"Start a new BGV check with external partners."),n(),e(34,"ion-button",118),m("click",function(){u(a);let i=g(2);return h(i.initiateBGV())}),r(35," Initiate BGV "),n()(),e(36,"div",45)(37,"p"),r(38,"Upload investigation report and verify info."),n(),e(39,"ion-button",49),m("click",function(){u(a);let i=g(2);return h(i.updateBGVStatus("completed"))}),r(40," Mark Verified "),n()()()(),B()}if(o&2){let a=g(2);l(12),N("background-color",((a.progress==null?null:a.progress.bgv_status)==="completed"?"#22c55e":"#f59e0b")+"15")("color",(a.progress==null?null:a.progress.bgv_status)==="completed"?"#22c55e":"#f59e0b"),l(),x(" ",U(14,7,(a.progress==null?null:a.progress.bgv_status)||"NOT INITIATED")," "),l(6),b(q(20,9,a.progress==null?null:a.progress.bgv_initiated_date,"dd MMM, yyyy")||"N/A"),l(6),b(q(26,12,a.progress==null?null:a.progress.bgv_completed_date,"dd MMM, yyyy")||"N/A")}}function Ut(o,d){if(o&1){let a=O();e(0,"div",9)(1,"div",10)(2,"div",11)(3,"div",12)(4,"div",13),r(5),y(6,"slice"),n(),e(7,"div",14)(8,"h2"),r(9),n(),e(10,"p",15),r(11),n()()(),e(12,"div",16),p(13,"ion-icon",17),r(14),y(15,"uppercase"),y(16,"replace"),n()(),e(17,"div",18)(18,"div",19)(19,"span",20),r(20,"Department"),n(),e(21,"span",21),r(22),n()(),e(23,"div",19)(24,"span",20),r(25,"Joining Date"),n(),e(26,"span",21),p(27,"ion-icon",22),r(28),y(29,"date"),n()(),e(30,"div",19)(31,"span",20),r(32,"Contact Email"),n(),e(33,"span",21),p(34,"ion-icon",23),r(35),n()()(),e(36,"div",24)(37,"div",25)(38,"span"),r(39,"Onboarding Progress"),n(),e(40,"strong"),r(41),n()(),e(42,"div",26),p(43,"div",27),n()()(),e(44,"div",28)(45,"ion-segment",29),m("ionChange",function(i){u(a);let c=g();return h(c.onSegmentChange(i))}),e(46,"ion-segment-button",30)(47,"ion-label"),r(48,"Overview"),n()(),e(49,"ion-segment-button",31)(50,"ion-label"),r(51,"Tasks"),n()(),e(52,"ion-segment-button",32)(53,"ion-label"),r(54,"Offers"),n()(),e(55,"ion-segment-button",33)(56,"ion-label"),r(57,"Documents"),n()(),e(58,"ion-segment-button",34)(59,"ion-label"),r(60,"BGV"),n()()()(),e(61,"div",35),f(62,yt,57,7,"ng-container",36)(63,Et,12,2,"ng-container",36)(64,Tt,3,2,"ng-container",36)(65,jt,32,9,"ng-container",36)(66,Nt,41,15,"ng-container",36),n()()}if(o&2){let a=g();l(5),x(" ",nn(6,20,a.candidate.full_name,0,1)," "),l(4),b(a.candidate.full_name),l(2),b(a.candidate.position),l(),N("background-color",a.getStatusColor(a.candidate.status)+"15")("color",a.getStatusColor(a.candidate.status)),l(2),x(" ",nn(16,26,U(15,24,a.candidate.status),"_"," ")," "),l(8),b(a.candidate.department_name||a.candidate.department||"N/A"),l(6),x(" ",q(29,30,a.candidate.joining_date,"dd MMM, yyyy")," "),l(7),x(" ",a.candidate.email," "),l(6),x("",a.getProgressPercentage(),"%"),l(2),N("width",a.getProgressPercentage(),"%"),l(2),s("value",a.selectedSegment),l(17),s("ngIf",a.selectedSegment==="overview"),l(),s("ngIf",a.selectedSegment==="tasks"),l(),s("ngIf",a.selectedSegment==="offers"),l(),s("ngIf",a.selectedSegment==="documents"),l(),s("ngIf",a.selectedSegment==="bgv")}}var Ce=(()=>{let d=class d{constructor(t,i,c,_,C,Me,Pe){this.route=t,this.router=i,this.candidateService=c,this.preonboardingService=_,this.toasterService=C,this.alertController=Me,this.actionSheetController=Pe,this.destroy$=new R,this.candidateId=null,this.candidate=null,this.preonboardingTasks=[],this.progress=null,this.documents=[],this.isLoading=!0,this.selectedSegment="overview",this.selectedFile=null,this.uploadingDocument=!1,this.documentType="resume",this.showOfferForm=!1,this.offerData={position:"",designation_id:"",department_id:"",location_id:"",reporting_manager_id:"",joining_date:"",offered_ctc:"",annual_salary:"",salary_breakup:{basic:"",hra:"",special:""},offer_validity_date:"",probation_period:3,notice_period:2,work_mode:"Hybrid",special_terms:"",benefits:""},this.documentTypes=[{label:"Resume",value:"resume"},{label:"Aadhar",value:"aadhar"},{label:"PAN Card",value:"pancard"},{label:"Driving License",value:"driving_license"},{label:"Passport",value:"passport"},{label:"Education Certificate",value:"education_certificate"},{label:"Experience Letter",value:"experience_letter"},{label:"Medical Report",value:"medical_report"}]}ngOnInit(){this.candidateId=Number(this.route.snapshot.paramMap.get("candidateId")),this.candidateId&&this.loadData()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadData(){this.candidateId&&(this.isLoading=!0,this.candidateService.getCandidateById(this.candidateId).pipe(M(this.destroy$)).subscribe({next:t=>{t&&(this.candidate=t.candidate||t.data||(t.id?t:null),this.documents=t.documents||this.candidate?.documents||[])},error:t=>{console.error("Error loading candidate:",t),this.toasterService.showError("Failed to load candidate details")}}),this.preonboardingService.getProgress(this.candidateId).pipe(M(this.destroy$)).subscribe({next:t=>{if(t){let i=t.data||t;this.preonboardingTasks=i.tasks||[],this.progress=i.progress||i.stats||{}}this.isLoading=!1},error:t=>{console.error("Error loading pre-onboarding progress:",t),this.isLoading=!1}}))}getStatusColor(t){return{pending:"warning",in_progress:"primary",completed:"success",rejected:"danger",offer_created:"warning",offer_approved:"success",documents_pending:"danger",bgv_pending:"warning",ready_to_join:"success"}[t]||"medium"}getProgressPercentage(){if(this.progress&&this.progress.completion_percentage!==void 0)return Number(this.progress.completion_percentage);if(!this.preonboardingTasks||this.preonboardingTasks.length===0)return 0;let t=this.preonboardingTasks.filter(i=>i.status==="completed").length;return Math.round(t/this.preonboardingTasks.length*100)}onSegmentChange(t){this.selectedSegment=t.detail.value}startPreonboarding(){this.candidateId&&this.candidateService.startPreonboarding(this.candidateId).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Pre-onboarding started"),this.loadData()},error:t=>{console.error("Error starting pre-onboarding:",t),this.toasterService.showError("Failed to start pre-onboarding")}})}openOfferForm(){if(this.showOfferForm=!this.showOfferForm,this.showOfferForm&&this.candidate){if(this.offerData.position=this.candidate.position||"",this.offerData.designation_id=this.candidate.designation_id||"",this.offerData.department_id=this.candidate.department_id||"",this.offerData.location_id=this.candidate.location_id||"",this.offerData.reporting_manager_id=this.candidate.reporting_manager_id||"",this.offerData.joining_date=this.candidate.joining_date||"",this.offerData.offered_ctc=this.candidate.offered_ctc||"",this.offerData.offered_ctc){let i=Number(this.offerData.offered_ctc);this.offerData.annual_salary=i,this.offerData.salary_breakup.basic=Math.round(i*.4/12),this.offerData.salary_breakup.hra=Math.round(i*.2/12),this.offerData.salary_breakup.special=Math.round(i/12-this.offerData.salary_breakup.basic-this.offerData.salary_breakup.hra)}let t=new Date;t.setDate(t.getDate()+7),this.offerData.offer_validity_date=t.toISOString()}}createOffer(){if(!this.candidateId)return;let t=tn(en({},this.offerData),{joining_date:this.offerData.joining_date?typeof this.offerData.joining_date=="string"?this.offerData.joining_date.split("T")[0]:this.offerData.joining_date:null,offer_validity_date:this.offerData.offer_validity_date?typeof this.offerData.offer_validity_date=="string"?this.offerData.offer_validity_date.split("T")[0]:this.offerData.offer_validity_date:null,offered_ctc:Number(this.offerData.offered_ctc),annual_salary:Number(this.offerData.annual_salary),salary_breakup:{basic:Number(this.offerData.salary_breakup.basic),hra:Number(this.offerData.salary_breakup.hra),special:Number(this.offerData.salary_breakup.special)},probation_period:Number(this.offerData.probation_period),notice_period:Number(this.offerData.notice_period)});this.candidateService.createOffer(this.candidateId,t).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Offer created successfully"),this.showOfferForm=!1,this.loadData()},error:i=>{console.error("Error creating offer:",i),this.toasterService.showError(i.error?.message||"Failed to create offer")}})}sendOffer(){this.candidateId&&this.candidateService.sendOffer(this.candidateId).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Offer sent to candidate"),this.loadData()},error:t=>{console.error("Error sending offer:",t),this.toasterService.showError("Failed to send offer")}})}onFileSelected(t){let i=t.target.files;i&&i.length>0&&(this.selectedFile=i[0])}uploadDocument(){if(!this.candidateId||!this.selectedFile){this.toasterService.showError("Please select a file");return}this.uploadingDocument=!0,this.candidateService.uploadDocument(this.candidateId,this.selectedFile,this.documentType,!0).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Document uploaded successfully"),this.selectedFile=null,this.uploadingDocument=!1,this.loadData()},error:t=>{this.uploadingDocument=!1,console.error("Error uploading document:",t),this.toasterService.showError("Failed to upload document")}})}verifyDocument(t){this.alertController.create({header:"Verify Document",message:"Add remarks for document verification",inputs:[{name:"remarks",type:"textarea",placeholder:"Enter verification remarks"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Verify",handler:i=>{let c=i.remarks||"Document verified successfully";this.candidateService.verifyDocument(t,c).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Document verified"),this.loadData()},error:_=>{console.error("Error verifying document:",_),this.toasterService.showError("Failed to verify document")}})}}]}).then(i=>i.present())}initiateBGV(){this.candidateId&&this.actionSheetController.create({header:"Initiate BGV",buttons:[{text:"Confirm BGV Initiation",icon:"checkmark-circle",handler:()=>{this.candidateService.initiateBGV(this.candidateId).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("BGV initiated successfully"),this.loadData()},error:t=>{console.error("Error initiating BGV:",t),this.toasterService.showError("Failed to initiate BGV")}})}},{text:"Cancel",icon:"close",role:"cancel"}]}).then(t=>t.present())}updateBGVStatus(t){if(!this.candidateId)return;let i=t==="completed"?"Completed":t;this.alertController.create({header:`Mark BGV as ${i}`,message:"Add remarks for BGV status update",inputs:[{name:"remarks",type:"textarea",placeholder:"Enter BGV remarks"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Update",handler:c=>{let _=c.remarks||"BGV status updated";this.candidateService.updateBGVStatus(this.candidateId,t,_).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("BGV status updated"),this.loadData()},error:C=>{console.error("Error updating BGV status:",C),this.toasterService.showError("Failed to update BGV status")}})}}]}).then(c=>c.present())}hireAsEmployee(){this.candidateId&&this.alertController.create({header:"Hire as Employee",message:"This will convert the candidate to an employee. Proceed?",inputs:[{name:"employee_number",type:"text",placeholder:"Enter Employee Number (e.g., EMP001)"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Confirm",handler:t=>t.employee_number?(this.candidateService.convertToEmployee(this.candidateId,t.employee_number).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Candidate converted to employee"),this.router.navigate(["/onboarding/preonboarding"])},error:i=>{console.error("Error hiring candidate:",i),this.toasterService.showError("Failed to hire candidate")}}),!0):(this.toasterService.showError("Please enter employee number"),!1)}]}).then(t=>t.present())}putOnHold(){this.candidateId&&this.alertController.create({header:"Put on Hold",message:"Provide reason for putting candidate on hold",inputs:[{name:"reason",type:"textarea",placeholder:"Enter reason"}],buttons:[{text:"Cancel",role:"cancel"},{text:"Confirm",handler:t=>{let i=t.reason||"Candidate put on hold";this.candidateService.putOnHold(this.candidateId,i).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Candidate put on hold"),this.loadData()},error:c=>{console.error("Error putting candidate on hold:",c),this.toasterService.showError("Failed to put on hold")}})}}]}).then(t=>t.present())}completeTask(t){if(!this.candidateId)return;let i=t.status==="completed"?"pending":"completed";this.preonboardingService.updateProgress(this.candidateId,i,`Task: ${t.task_name}`).pipe(M(this.destroy$)).subscribe({next:()=>{this.toasterService.showSuccess("Task status updated"),this.loadData()},error:c=>{console.error("Error updating task:",c),this.toasterService.showError("Failed to update task")}})}compareSelect(t,i){return t===i}};d.\u0275fac=function(i){return new(i||d)(v(Fn),v(J),v(j),v(be),v(Z),v(bn),v(se))},d.\u0275cmp=E({type:d,selectors:[["app-preonboarding-detail"]],standalone:!1,decls:9,vars:2,consts:[["fileInput",""],[1,"ion-no-border"],[1,"gradient-header"],["slot","start"],["defaultHref","/onboarding/preonboarding"],["class","loading-wrap",4,"ngIf"],["class","detail-wrap",4,"ngIf"],[1,"loading-wrap"],["name","crescent","color","primary"],[1,"detail-wrap"],[1,"profile-hero"],[1,"hero-main"],[1,"candidate-id-wrap"],[1,"avatar-wrap"],[1,"info-block"],[1,"position"],[1,"premium-badge","transition-all"],["name","ellipse",2,"font-size","8px","margin-right","8px"],[1,"hero-stats"],[1,"h-stat"],[1,"label"],[1,"value"],["name","calendar-outline"],["name","mail-outline"],[1,"progress-bar-container"],[1,"progress-meta"],[1,"p-track"],[1,"p-fill"],[1,"segment-container"],["mode","ios",3,"ionChange","value"],["value","overview"],["value","tasks"],["value","offers"],["value","documents"],["value","bgv"],[1,"tab-pane"],[4,"ngIf"],[1,"content-card"],[1,"card-top"],[1,"title-set"],[1,"icon-box"],["name","person-outline"],[1,"info-stack"],[1,"stack-item"],[1,"action-board"],[1,"action-box"],[1,"btn-wrap"],["expand","block","color","primary",3,"click"],["name","play-circle","slot","start"],["expand","block","color","success",3,"click"],["name","checkmark-done","slot","start"],["expand","block","color","warning","fill","outline",3,"click"],["name","pause-circle","slot","start"],["name","list-outline"],[1,"premium-pill-btn"],["class","item-record",4,"ngFor","ngForOf"],["class","empty-list",4,"ngIf"],[1,"item-record"],[1,"record-info"],[1,"r-icon"],[3,"name"],[1,"r-text"],[1,"record-action"],["color","danger","mode","ios",4,"ngIf"],["color","primary",3,"ionChange","checked"],["color","danger","mode","ios"],[1,"empty-list"],["name","list-circle-outline"],["class","content-card",4,"ngIf"],["name","document-text-outline"],[1,"action-board",2,"grid-template-columns","1fr"],["name","add-circle","slot","start"],["expand","block","color","secondary",3,"click"],["name","send","slot","start"],["name","create-outline"],[1,"offer-form-stack"],["mode","md"],[1,"ion-no-padding"],["position","floating"],["type","text","placeholder","Enter target position",3,"ngModelChange","ngModel"],[1,"form-grid",2,"display","grid","grid-template-columns","1fr 1fr","gap","20px","margin","20px 0"],["type","number","placeholder","0.00",3,"ngModelChange","ngModel"],["readonly","","id","j-date-pick",3,"value"],["trigger","j-date-pick","mode","ios"],[1,"salary-box",2,"background","#f1f5f9","padding","20px","border-radius","16px","margin-bottom","20px"],[2,"margin","0 0 15px","font-size","14px","font-weight","800","color","#475569"],[1,"form-grid",2,"display","grid","grid-template-columns","repeat(3, 1fr)","gap","15px"],[1,"ion-no-padding",2,"--background","transparent"],["type","number",3,"ngModelChange","ngModel"],[1,"form-footer",2,"padding-top","20px","display","flex","gap","15px"],["expand","block","color","primary",2,"flex","1",3,"click"],["expand","block","color","medium","fill","outline",2,"flex","1",3,"click"],["presentation","date",3,"ngModelChange","ngModel","showDefaultButtons"],["name","cloud-upload-outline"],[1,"upload-zone",3,"click"],["type","file",2,"display","none",3,"change"],[1,"up-icon"],["class","up-text",4,"ngIf"],["class","file-name",4,"ngIf"],[1,"upload-options",2,"margin-top","20px"],[1,"ion-no-padding",2,"--border-color","#f1f5f9"],["interface","popover",3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["expand","block","color","primary",2,"margin-top","20px",3,"click","disabled"],[1,"icon-box",2,"background","#e0f2fe","color","#3b82f6"],["name","folder-open-outline"],["class","empty-list","style","text-align: center; padding: 30px; color: #94a3b8;",4,"ngIf"],[1,"up-text"],[1,"file-name"],[3,"value"],["name","document-attach-outline"],[1,"r-badge",3,"ngClass"],["size","small","fill","outline","color","primary","mode","ios",3,"click",4,"ngIf"],["size","small","fill","outline","color","primary","mode","ios",3,"click"],[1,"empty-list",2,"text-align","center","padding","30px","color","#94a3b8"],["name","shield-checkmark-outline"],[1,"premium-badge","transition-all",2,"width","fit-content","margin-top","5px"],[2,"margin","30px 0","border","0","border-top","1px solid #f1f5f9"],["expand","block","color","warning",3,"click"]],template:function(i,c){i&1&&(e(0,"ion-header",1)(1,"ion-toolbar",2)(2,"ion-buttons",3),p(3,"ion-back-button",4),n(),e(4,"ion-title"),r(5,"Candidate Profile"),n()()(),e(6,"ion-content"),f(7,Ot,4,0,"div",5)(8,Ut,67,33,"div",6),n()),i&2&&(l(7),s("ngIf",c.isLoading),l(),s("ngIf",!c.isLoading&&c.candidate))},dependencies:[Dn,G,D,Y,gn,Qn,T,Q,Xn,F,Kn,z,A,Zn,ne,ee,te,ae,ce,_n,un,V,X,K,le,Jn,Yn,fn,mn,hn,ln,sn,H,dn,W,xe],styles:[`@charset "UTF-8";



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
.gradient-header[_ngcontent-%COMP%] {
  --background: #0f2b4a;
  --color: #ffffff;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.gradient-header[_ngcontent-%COMP%]   ion-back-button[_ngcontent-%COMP%] {
  --color: #ffffff;
}
.gradient-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {
  font-weight: 700;
  letter-spacing: -0.05em;
  font-size: clamp(0.9375rem, 0.75vw + 0.2rem, 1.25rem);
  color: #ffffff;
}
.detail-wrap[_ngcontent-%COMP%] {
  background: #f4f7fb;
  min-height: 100vh;
  padding: 32px 24px;
}
.profile-hero[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%]   .candidate-id-wrap[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 24px;
}
.profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%]   .candidate-id-wrap[_ngcontent-%COMP%]   .avatar-wrap[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  background: #e8f0fb;
  color: #1F74BB;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  border: 1px solid rgba(31, 116, 187, 0.1);
}
.profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%]   .candidate-id-wrap[_ngcontent-%COMP%]   .info-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(1.125rem, 1.5vw + 0.3rem, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%]   .candidate-id-wrap[_ngcontent-%COMP%]   .info-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%] {
  margin: 4px 0 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%]   .premium-badge[_ngcontent-%COMP%] {
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #f1f5f9;
}
.profile-hero[_ngcontent-%COMP%]   .hero-stats[_ngcontent-%COMP%] {
  display: flex;
  gap: 48px;
  padding-top: 32px;
  border-top: 1px solid #f1f5f9;
}
.profile-hero[_ngcontent-%COMP%]   .hero-stats[_ngcontent-%COMP%]   .h-stat[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.profile-hero[_ngcontent-%COMP%]   .hero-stats[_ngcontent-%COMP%]   .h-stat[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.profile-hero[_ngcontent-%COMP%]   .hero-stats[_ngcontent-%COMP%]   .h-stat[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.profile-hero[_ngcontent-%COMP%]   .hero-stats[_ngcontent-%COMP%]   .h-stat[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #1F74BB;
  font-size: 18px;
}
.profile-hero[_ngcontent-%COMP%]   .progress-bar-container[_ngcontent-%COMP%] {
  padding-top: 8px;
}
.profile-hero[_ngcontent-%COMP%]   .progress-bar-container[_ngcontent-%COMP%]   .progress-meta[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.profile-hero[_ngcontent-%COMP%]   .progress-bar-container[_ngcontent-%COMP%]   .progress-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #475569;
}
.profile-hero[_ngcontent-%COMP%]   .progress-bar-container[_ngcontent-%COMP%]   .progress-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1F74BB;
}
.profile-hero[_ngcontent-%COMP%]   .progress-bar-container[_ngcontent-%COMP%]   .p-track[_ngcontent-%COMP%] {
  width: 100%;
  height: 8px;
  background: #f8fafc;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
}
.profile-hero[_ngcontent-%COMP%]   .progress-bar-container[_ngcontent-%COMP%]   .p-track[_ngcontent-%COMP%]   .p-fill[_ngcontent-%COMP%] {
  height: 100%;
  background: #1F74BB;
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.segment-container[_ngcontent-%COMP%] {
  margin-bottom: 32px;
  background: #ffffff;
  padding: 6px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}
.segment-container[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {
  --background: transparent;
}
.segment-container[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {
  --background-checked: #0f2b4a;
  --color-checked: #ffffff;
  --indicator-color: transparent;
  margin: 0;
  border-radius: 8px;
  font-weight: 700;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-height: 44px;
  transition: all 0.2s ease;
}
.segment-container[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button.segment-button-checked[_ngcontent-%COMP%] {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.segment-container[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]:hover:not(.segment-button-checked) {
  background: #f1f5f9;
}
.tab-pane[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.content-card[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #ABABAB;
}
.content-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.content-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .title-set[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.content-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .title-set[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  background: #f8fafc;
  color: #1F74BB;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid #f1f5f9;
}
.content-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .title-set[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.content-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .premium-pill-btn[_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #1F74BB;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  border: 1px solid #f1f5f9;
}
.content-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .premium-pill-btn[_ngcontent-%COMP%]:hover {
  background: #1F74BB;
  color: #ffffff;
  border-color: #1F74BB;
}
.content-card[_ngcontent-%COMP%]   .info-stack[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.content-card[_ngcontent-%COMP%]   .info-stack[_ngcontent-%COMP%]   .stack-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content-card[_ngcontent-%COMP%]   .info-stack[_ngcontent-%COMP%]   .stack-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.content-card[_ngcontent-%COMP%]   .info-stack[_ngcontent-%COMP%]   .stack-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #1e293b;
}
.action-board[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.action-board[_ngcontent-%COMP%]   .action-box[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #ABABAB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.action-board[_ngcontent-%COMP%]   .action-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.05em;
}
.action-board[_ngcontent-%COMP%]   .action-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  color: #475569;
  line-height: 1.6;
  font-weight: 500;
}
.action-board[_ngcontent-%COMP%]   .action-box[_ngcontent-%COMP%]   .btn-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.upload-zone[_ngcontent-%COMP%] {
  border: 2px dashed #ABABAB;
  border-radius: 16px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.upload-zone[_ngcontent-%COMP%]:hover {
  border-color: #1F74BB;
  background: #ffffff;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
.upload-zone[_ngcontent-%COMP%]   .up-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #1F74BB;
}
.upload-zone[_ngcontent-%COMP%]   .up-text[_ngcontent-%COMP%] {
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.upload-zone[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #1F74BB;
  background: #e8f0fb;
  padding: 6px 16px;
  border-radius: 4px;
}
.item-record[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f8fafc;
  transition: all 0.2s ease;
}
.item-record[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.item-record[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.item-record[_ngcontent-%COMP%]   .record-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.item-record[_ngcontent-%COMP%]   .record-info[_ngcontent-%COMP%]   .r-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #1F74BB;
}
.item-record[_ngcontent-%COMP%]   .record-info[_ngcontent-%COMP%]   .r-text[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0;
  font-size: clamp(0.75rem, 0.3vw + 0.4rem, 0.8125rem);
  font-weight: 700;
  color: #0f172a;
}
.item-record[_ngcontent-%COMP%]   .record-info[_ngcontent-%COMP%]   .r-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 4px 0 0;
  font-size: 11px;
  color: #475569;
  font-weight: 700;
}
.item-record[_ngcontent-%COMP%]   .record-action[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.item-record[_ngcontent-%COMP%]   .record-action[_ngcontent-%COMP%]   .r-badge[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.item-record[_ngcontent-%COMP%]   .record-action[_ngcontent-%COMP%]   .r-badge.verified[_ngcontent-%COMP%] {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.item-record[_ngcontent-%COMP%]   .record-action[_ngcontent-%COMP%]   .r-badge.pending[_ngcontent-%COMP%] {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
@media (max-width: 768px) {
  .profile-hero[_ngcontent-%COMP%]   .hero-main[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  .hero-stats[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr) !important;
    display: grid !important;
    gap: 24px;
  }
  .info-stack[_ngcontent-%COMP%] {
    grid-template-columns: 1fr !important;
  }
  .action-board[_ngcontent-%COMP%] {
    grid-template-columns: 1fr !important;
  }
}`]});let o=d;return o})();var qt=[{path:"",component:ue,canActivate:[Cn,vn],data:{role:["admin","hr"]}},{path:"preonboarding",component:he,canActivate:[Cn,vn],data:{role:["admin","hr"]}},{path:"preonboarding/:candidateId",component:Ce,canActivate:[Cn,vn],data:{role:["admin","hr"]}}],ve=(()=>{let d=class d{};d.\u0275fac=function(i){return new(i||d)},d.\u0275mod=cn({type:d}),d.\u0275inj=rn({imports:[Pn.forChild(qt),Pn]});let o=d;return o})();var yi=(()=>{let d=class d{};d.\u0275fac=function(i){return new(i||d)},d.\u0275mod=cn({type:d}),d.\u0275inj=rn({providers:[W,ln,dn,H],imports:[Tn,Wn,Hn,pe,ve]});let o=d;return o})();export{yi as OnboardingModule};
