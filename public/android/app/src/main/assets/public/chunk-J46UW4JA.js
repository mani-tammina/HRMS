import{a as ln}from"./chunk-3266ON7Q.js";import{a as sn}from"./chunk-2GEN2AVW.js";import{a as an}from"./chunk-GKMRXCVX.js";import"./chunk-NDCRD3QG.js";import{Ca as tn,Fa as on,Ga as rn,R as Z,X as nn,a as Y,b as q,c as _,d as D,e as G,g as U,h as W,j as X,m as $,na as en,s as H,t as K,u as J,v as Q}from"./chunk-B3PLR2IL.js";import{Ba as x,Ca as h,Da as c,Eb as N,F as S,K as m,L as f,Ma as E,Oa as s,Ta as I,Ua as z,Va as L,Vb as R,Ya as A,Zb as B,_ as g,ca as y,ea as T,fa as F,j as M,ja as v,ra as l,rb as j,sa as o,t as k,ta as r,ua as u,z as V}from"./chunk-27EUYVIP.js";import"./chunk-X6B7PUDI.js";import"./chunk-QUJFQN2Y.js";import"./chunk-MSPXX6WM.js";import"./chunk-GJ76CRA2.js";import"./chunk-DXNKAAKP.js";import"./chunk-6J55XCPC.js";import"./chunk-ZIUATYQZ.js";import"./chunk-R2JHLMPZ.js";import"./chunk-D5HDMW3X.js";import"./chunk-URXYOCRV.js";import"./chunk-ECI6HFVW.js";import"./chunk-7FY2OE2O.js";import"./chunk-XZX6QUUV.js";import"./chunk-5MJGDBZQ.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-6PIRYP44.js";import"./chunk-CKP3SGE2.js";import"./chunk-6LYI7TA2.js";import{e as P}from"./chunk-JHI3MBHO.js";var gn=()=>({standalone:!0});function pn(i,d){if(i&1){let e=x();o(0,"div",16)(1,"label",34),s(2,"Password"),r(),o(3,"div",35)(4,"input",36),h("focus",function(){m(e);let n=c(2);return f(n.passwordFocused=!0)})("blur",function(){m(e);let n=c(2);return f(n.passwordFocused=!1)}),r(),o(5,"button",37),h("click",function(){m(e);let n=c(2);return f(n.showPasswordText=!n.showPasswordText)}),u(6,"ion-icon",38),r()()()}if(i&2){let e=c(2);g(4),l("type",e.showPasswordText?"text":"password"),g(2),l("name",e.showPasswordText?"eye-outline":"eye-off-outline")}}function mn(i,d){if(i&1){let e=x();o(0,"div",16)(1,"div",39)(2,"label",40),s(3,"OTP Verification"),r(),o(4,"a",41),h("click",function(){m(e);let n=c(2);return f(n.resendOtp())}),s(5,"Resend OTP"),r()(),u(6,"input",42),r()}}function fn(i,d){i&1&&(o(0,"div",43),u(1,"ion-icon",44),s(2," OTP Verified Successfully "),r())}function un(i,d){if(i&1){let e=x();o(0,"div",16)(1,"label",45),s(2,"Create Password"),r(),o(3,"div",35)(4,"input",46),h("focus",function(){m(e);let n=c(2);return f(n.createPwFocused=!0)})("blur",function(){m(e);let n=c(2);return f(n.createPwFocused=!1)}),r(),o(5,"button",37),h("click",function(){m(e);let n=c(2);return f(n.showPasswordText=!n.showPasswordText)}),u(6,"ion-icon",38),r()()()}if(i&2){let e=c(2);g(4),l("type",e.showPasswordText?"text":"password"),g(2),l("name",e.showPasswordText?"eye-outline":"eye-off-outline")}}function hn(i,d){if(i&1){let e=x();o(0,"div",47)(1,"label",48)(2,"input",49),L("ngModelChange",function(n){m(e);let a=c(2);return z(a.rememberMe,n)||(a.rememberMe=n),f(n)}),r(),u(3,"span",50),s(4," Remember me "),r(),o(5,"a",51),h("click",function(){m(e);let n=c(2);return f(n.toggleForgotPassword())}),s(6,"Forgot Password?"),r()()}if(i&2){let e=c(2);g(2),I("ngModel",e.rememberMe),l("ngModelOptions",A(2,gn))}}function _n(i,d){if(i&1){let e=x();o(0,"button",52),h("click",function(){m(e);let n=c(2);return f(n.onNext())}),s(1," Continue \u2192 "),r()}if(i&2){let e,t=c(2);l("disabled",(e=t.loginForm.get("email"))==null?null:e.invalid)}}function xn(i,d){i&1&&(o(0,"span"),s(1,"Continue \u2192"),r())}function wn(i,d){i&1&&u(0,"ion-spinner",56)}function bn(i,d){if(i&1&&(o(0,"button",53),v(1,xn,2,0,"span",54)(2,wn,1,0,"ion-spinner",55),r()),i&2){let e=c(2);l("disabled",e.loading),g(),l("ngIf",!e.loading),g(),l("ngIf",e.loading)}}function Pn(i,d){if(i&1){let e=x();o(0,"button",57),h("click",function(){m(e);let n=c(2);return f(n.verifyOtp())}),s(1," Verify OTP "),r()}if(i&2){let e,t=c(2);l("disabled",t.loading||((e=t.loginForm.get("otp"))==null?null:e.invalid))}}function Cn(i,d){if(i&1&&(o(0,"button",58),s(1," Create & Sign In "),r()),i&2){let e,t=c(2);l("disabled",t.loading||((e=t.loginForm.get("password"))==null?null:e.invalid))}}function On(i,d){if(i&1){let e=x();o(0,"div",10)(1,"div",11),u(2,"img",12),r(),o(3,"h1",13),s(4,"Welcome!"),r(),o(5,"p",14),s(6,"Sign in to continue to Master HRMS"),r(),o(7,"form",15),h("ngSubmit",function(){m(e);let n=c();return f(n.onSubmit())}),o(8,"div",16)(9,"label",17),s(10,"Email Address"),r(),o(11,"div",18),u(12,"ion-icon",19),o(13,"input",20),h("focus",function(){m(e);let n=c();return f(n.usernameFocused=!0)})("blur",function(){m(e);let n=c();return f(n.usernameFocused=!1)})("keydown.enter",function(){m(e);let n=c();return f(n.emailChecked?null:n.onNext())}),r()()(),v(14,pn,7,2,"div",21)(15,mn,7,0,"div",21)(16,fn,3,0,"div",22)(17,un,7,2,"div",21)(18,hn,7,3,"div",23)(19,_n,2,1,"button",24)(20,bn,3,3,"button",25)(21,Pn,2,1,"button",26)(22,Cn,2,1,"button",27),o(23,"div",28)(24,"span"),s(25,"or"),r()(),o(26,"button",29),u(27,"ion-icon",30),s(28," Continue with SSO "),r()(),o(29,"div",31),u(30,"ion-icon",32),o(31,"span"),s(32,"Your data is secure with us"),r()(),o(33,"div",33),s(34,"\xA9 2024 Tech Tammina. All rights reserved."),r()()}if(i&2){let e=c();g(7),l("formGroup",e.loginForm),g(7),l("ngIf",e.showPassword),g(),l("ngIf",e.showCreatePassword&&!e.otpVerified),g(),l("ngIf",e.showCreatePassword&&e.otpVerified),g(),l("ngIf",e.showCreatePassword&&e.otpVerified),g(),l("ngIf",e.showPassword||e.showCreatePassword&&e.otpVerified),g(),l("ngIf",!e.emailChecked),g(),l("ngIf",e.showPassword),g(),l("ngIf",e.showCreatePassword&&!e.otpVerified),g(),l("ngIf",e.showCreatePassword&&e.otpVerified)}}function yn(i,d){if(i&1){let e=x();o(0,"div",16)(1,"div",39)(2,"label",65),s(3,"OTP Verification"),r(),o(4,"a",41),h("click",function(){m(e);let n=c(2);return f(n.resendForgotPasswordOtp())}),s(5,"Resend OTP"),r()(),u(6,"input",66),r()}}function vn(i,d){i&1&&(o(0,"div",43),u(1,"ion-icon",44),s(2," OTP Verified Successfully "),r())}function Mn(i,d){i&1&&(o(0,"div",16)(1,"label",67),s(2,"New Password"),r(),u(3,"input",68),r())}function kn(i,d){if(i&1){let e=x();o(0,"button",69),h("click",function(){m(e);let n=c(2);return f(n.sendForgotPasswordOtp())}),s(1," Send OTP "),r()}if(i&2){let e,t=c(2);l("disabled",(e=t.forgotPasswordForm.get("employee_id"))==null?null:e.invalid)}}function Vn(i,d){if(i&1){let e=x();o(0,"button",69),h("click",function(){m(e);let n=c(2);return f(n.verifyForgotPasswordOtp())}),s(1," Verify OTP "),r()}if(i&2){let e,t=c(2);l("disabled",(e=t.forgotPasswordForm.get("otp"))==null?null:e.invalid)}}function Sn(i,d){if(i&1&&(o(0,"button",70),s(1," Reset Password "),r()),i&2){let e=c(2);l("disabled",e.forgotPasswordForm.invalid)}}function Tn(i,d){if(i&1){let e=x();o(0,"div",10)(1,"div",11)(2,"div",11),u(3,"img",12),r()(),o(4,"h1",13),s(5,"Reset Password"),r(),o(6,"p",14),s(7,"Enter your Employee Email to reset"),r(),o(8,"form",15),h("ngSubmit",function(){m(e);let n=c();return f(n.onForgotPasswordSubmit())}),o(9,"div",16)(10,"label",59),s(11,"Employee Email"),r(),u(12,"input",60),r(),v(13,yn,7,0,"div",21)(14,vn,3,0,"div",22)(15,Mn,4,0,"div",21)(16,kn,2,1,"button",61)(17,Vn,2,1,"button",61)(18,Sn,2,1,"button",62),o(19,"div",28)(20,"span"),s(21,"or"),r()(),o(22,"button",63),h("click",function(){m(e);let n=c();return f(n.toggleForgotPassword())}),u(23,"ion-icon",64),s(24," Back to Sign In "),r()(),o(25,"div",33),s(26,"\xA9 2024 Tech Tammina. All rights reserved."),r()()}if(i&2){let e=c();g(8),l("formGroup",e.forgotPasswordForm),g(4),l("readonly",e.forgotPasswordOtpSent),g(),l("ngIf",e.forgotPasswordOtpSent&&!e.forgotPasswordOtpVerified),g(),l("ngIf",e.forgotPasswordOtpSent&&e.forgotPasswordOtpVerified),g(),l("ngIf",e.forgotPasswordOtpSent&&e.forgotPasswordOtpVerified),g(),l("ngIf",!e.forgotPasswordOtpSent),g(),l("ngIf",e.forgotPasswordOtpSent&&!e.forgotPasswordOtpVerified),g(),l("ngIf",e.forgotPasswordOtpSent&&e.forgotPasswordOtpVerified)}}var dn=(()=>{let d=class d{constructor(t,n,a,p,w,b,C){this.fb=t,this.authService=n,this.employeeService=a,this.router=p,this.routeGuardService=w,this.toastController=b,this.loadingController=C,this.emailChecked=!1,this.showPassword=!1,this.showCreatePassword=!1,this.otpVerified=!1,this.loading=!1,this.isAdmin=!1,this.isEmpId=!1,this.empId=null,this.rolePreviewData=null,this.showForgotPassword=!1,this.forgotPasswordSuccess=!1,this.showPasswordText=!1,this.rememberMe=!1,this.usernameFocused=!1,this.passwordFocused=!1,this.createPwFocused=!1,this.forgotPasswordOtpSent=!1,this.forgotPasswordOtpVerified=!1}ngOnInit(){this.initForms()}initForms(){this.loginForm=this.fb.group({email:["",[_.required]],password:[""],otp:[""]}),this.loginForm.get("email")?.valueChanges.subscribe(()=>{this.emailChecked&&this.resetState()}),this.forgotPasswordForm=this.fb.group({employee_id:["",_.required],otp:[""],password:[""]})}resetState(){this.emailChecked=!1,this.showPassword=!1,this.showCreatePassword=!1,this.otpVerified=!1,this.isAdmin=!1,this.isEmpId=!1,this.empId=null,this.rolePreviewData=null,this.loginForm.get("password")?.clearValidators(),this.loginForm.get("password")?.setErrors(null),this.loginForm.get("password")?.setValue(""),this.loginForm.get("password")?.updateValueAndValidity(),this.loginForm.get("otp")?.clearValidators(),this.loginForm.get("otp")?.setErrors(null),this.loginForm.get("otp")?.setValue(""),this.loginForm.get("otp")?.updateValueAndValidity()}ionViewWillEnter(){this.resetState(),this.loginForm.get("email")?.setValue("")}isAdminLogin(t){return t.toLowerCase().trim()==="admin"}onNext(){return P(this,null,function*(){let t=this.loginForm.get("email")?.value;if(!t)return;if(t=t.trim().toLowerCase(),this.loginForm.get("email")?.setValue(t),this.isAdmin=this.isAdminLogin(t),this.isAdmin){this.setupPasswordStep();return}this.isEmpId=/^\d+$/.test(t);let n=yield this.loadingController.create({message:"Verifying..."});yield n.present(),this.authService.checkEmployee(t).subscribe({next:a=>{if(n.dismiss(),!a.found){this.presentToast("Employee not found","warning");return}this.empId=a.employee?.id||(this.isEmpId?parseInt(t):null),this.fetchRolePreview(t),a.hasUserAccount?(this.emailChecked=!0,this.showPassword=!0,this.loginForm.get("password")?.setValidators(_.required),this.loginForm.get("password")?.updateValueAndValidity()):this.sendCreatePasswordOtp(t)},error:a=>{n.dismiss();let p=a.error?.message||a.message||`Failed to verify employee (${a.status||"no connection"})`;this.presentToast(p,"danger")}})})}sendCreatePasswordOtp(t){return P(this,null,function*(){let n=yield this.loadingController.create({message:"Sending OTP to email..."});yield n.present(),this.authService.sendOtp(t).subscribe({next:a=>{n.dismiss(),a?.warning?this.presentToast(a.message,"warning"):this.presentToast("OTP sent to your email address","success"),this.emailChecked=!0,this.showCreatePassword=!0,this.otpVerified=!1,this.loginForm.get("otp")?.setValidators([_.required,_.minLength(6),_.maxLength(6)]),this.loginForm.get("otp")?.updateValueAndValidity(),this.loginForm.get("password")?.clearValidators(),this.loginForm.get("password")?.setValue(""),this.loginForm.get("password")?.updateValueAndValidity()},error:a=>{n.dismiss();let p=a.error?.error||"Failed to send OTP. Please try again.";this.presentToast(p,"danger")}})})}verifyOtp(){return P(this,null,function*(){let t=this.loginForm.get("email")?.value?.trim().toLowerCase(),n=this.loginForm.get("otp")?.value?.trim();if(!t||!n||n.length!==6){this.presentToast("Please enter a valid 6-digit OTP","warning");return}let a=yield this.loadingController.create({message:"Verifying OTP..."});yield a.present(),this.authService.verifyOtp(t,n).subscribe({next:p=>{a.dismiss(),this.presentToast("OTP verified successfully! Please set your new password.","success"),this.otpVerified=!0,this.loginForm.get("password")?.setValidators(_.required),this.loginForm.get("password")?.updateValueAndValidity()},error:p=>{a.dismiss();let w=p.error?.error||"Invalid or expired OTP. Please try again.";this.presentToast(w,"danger")}})})}resendOtp(){let t=this.loginForm.get("email")?.value;t&&this.sendCreatePasswordOtp(t.trim().toLowerCase())}setupPasswordStep(){this.emailChecked=!0,this.showPassword=!0,this.loginForm.get("password")?.setValidators(_.required),this.loginForm.get("password")?.updateValueAndValidity()}fetchRolePreview(t){this.authService.previewRole(t).subscribe({next:n=>{this.rolePreviewData=n,(n.hasTeam||n.reportingMembers?.length>0)&&sessionStorage.setItem("hasTeam","true")},error:n=>console.warn("Failed to fetch role preview:",n)})}onSubmit(){return P(this,null,function*(){if(!this.emailChecked){this.onNext();return}if(this.showCreatePassword&&!this.otpVerified){this.presentToast("Please verify your OTP first","warning");return}if(this.loginForm.invalid){this.presentToast("Please fill all fields","warning");return}let{email:t,password:n,otp:a}=this.loginForm.value,p=yield this.loadingController.create({message:"Signing in..."});if(yield p.present(),this.isAdmin){this.authService.login({username:t,password:n}).subscribe({next:()=>{p.dismiss(),this.navigateBasedOnRole()},error:C=>{p.dismiss();let O=C.error?.message||C.message||`Login failed (${C.status||"no connection"})`;this.presentToast(O,"danger")}});return}let w=this.showCreatePassword,b;w?b=(this.empId?this.authService.autoCreateUser(this.empId,n,a):this.authService.createUser(t,n,a)).pipe(V(O=>O?.token?M(O):this.authService.login({username:t,password:n})),k(O=>(console.warn("Fallback to login:",O),this.authService.login({username:t,password:n})))):b=this.authService.login({username:t,password:n}),b.pipe(V(()=>this.employeeService.getMyProfile(!0).pipe(k(()=>M(null))))).subscribe({next:()=>{p.dismiss(),this.navigateBasedOnRole()},error:C=>{p.dismiss();let O=C.error?.message||"Authentication failed. Please check credentials.";this.presentToast(O,"danger")}})})}sendForgotPasswordOtp(){return P(this,null,function*(){let t=this.forgotPasswordForm.get("employee_id")?.value?.trim().toLowerCase();if(!t){this.presentToast("Please enter your employee email address","warning");return}let n=yield this.loadingController.create({message:"Sending OTP..."});yield n.present(),this.authService.sendOtp(t,!0).subscribe({next:a=>{n.dismiss(),a?.warning?this.presentToast(a.message,"warning"):this.presentToast("OTP sent to your email address","success"),this.forgotPasswordOtpSent=!0,this.forgotPasswordForm.get("otp")?.setValidators([_.required,_.minLength(6),_.maxLength(6)]),this.forgotPasswordForm.get("otp")?.updateValueAndValidity(),this.forgotPasswordForm.get("password")?.clearValidators(),this.forgotPasswordForm.get("password")?.updateValueAndValidity()},error:a=>{n.dismiss();let p=a.error?.error||"Failed to send OTP. Please try again.";this.presentToast(p,"danger")}})})}verifyForgotPasswordOtp(){return P(this,null,function*(){let t=this.forgotPasswordForm.get("employee_id")?.value?.trim().toLowerCase(),n=this.forgotPasswordForm.get("otp")?.value?.trim();if(!t||!n||n.length!==6){this.presentToast("Please enter a valid 6-digit OTP","warning");return}let a=yield this.loadingController.create({message:"Verifying OTP..."});yield a.present(),this.authService.verifyOtp(t,n).subscribe({next:p=>{a.dismiss(),this.presentToast("OTP verified successfully! Please enter your new password.","success"),this.forgotPasswordOtpVerified=!0,this.forgotPasswordForm.get("password")?.setValidators(_.required),this.forgotPasswordForm.get("password")?.updateValueAndValidity()},error:p=>{a.dismiss();let w=p.error?.error||"Invalid or expired OTP. Please try again.";this.presentToast(w,"danger")}})})}resendForgotPasswordOtp(){this.sendForgotPasswordOtp()}onForgotPasswordSubmit(){return P(this,null,function*(){if(this.forgotPasswordForm.invalid)return;let t=yield this.loadingController.create({message:"Resetting password..."});yield t.present();let{employee_id:n,password:a,otp:p}=this.forgotPasswordForm.value;this.authService.createPassword(n,a,"",p).subscribe({next:w=>{this.forgotPasswordSuccess=!0,this.showForgotPassword=!1,this.presentToast("Password reset successful! Logging you in...","success");let b=w?.username||n;this.authService.login({username:b,password:a}).subscribe({next:()=>{t.dismiss(),this.navigateBasedOnRole()},error:()=>{t.dismiss(),this.presentToast("Password reset successfully! Please log in with your new password.","success"),this.showForgotPassword=!1}})},error:w=>{t.dismiss();let b=w.error?.error||"Failed to reset password.";this.presentToast(b,"danger")}})})}navigateBasedOnRole(){let n=this.routeGuardService.userRole?.toLowerCase()==="admin"?"/administration":"/Home";this.router.navigate([n],{replaceUrl:!0})}presentToast(t,n="primary"){return P(this,null,function*(){yield(yield this.toastController.create({message:t,duration:3e3,color:n,position:"top"})).present()})}toggleForgotPassword(){this.showForgotPassword=!this.showForgotPassword,this.showForgotPassword&&(this.forgotPasswordForm.reset(),this.forgotPasswordOtpSent=!1,this.forgotPasswordOtpVerified=!1)}onKeyPress(t){t.key==="Enter"&&!this.emailChecked&&this.onNext()}};d.\u0275fac=function(n){return new(n||d)(y(K),y(ln),y(an),y(R),y(sn),y(on),y(tn))},d.\u0275cmp=T({type:d,selectors:[["app-login"]],standalone:!1,decls:18,vars:5,consts:[[1,"ion-no-border","login-content",3,"fullscreen"],[1,"login-page-wrapper"],[1,"left-panel"],["src","assets/login.png","alt","Manage better, Empower faster",1,"illustration-img"],[1,"left-caption"],[1,"caption-title"],[1,"caption-accent"],[1,"caption-subtitle"],[1,"right-panel"],["class","form-card",4,"ngIf"],[1,"form-card"],[1,"brand-header"],["src","assets/tt_blue_logo.png","alt","Tech Tammina",1,"brand-logo-img"],[1,"form-heading"],[1,"form-subheading"],[1,"login-form",3,"ngSubmit","formGroup"],[1,"field-group"],["for","login-email",1,"field-label"],[1,"input-with-icon-left"],["name","mail-outline",1,"left-icon"],["id","login-email","type","text","formControlName","email","placeholder","Enter your email address",1,"form-input","has-left-icon",3,"focus","blur","keydown.enter"],["class","field-group",4,"ngIf"],["class","otp-success-alert","style","background-color: #e8f5e9; color: #2e7d32; padding: 12px; border-radius: 8px; border: 1px solid #c8e6c9; margin-bottom: 20px; display: flex; align-items: center; font-size: 14px; font-weight: 500;",4,"ngIf"],["class","remember-forgot-row",4,"ngIf"],["id","btn-continue-email","class","btn-primary","type","button",3,"disabled","click",4,"ngIf"],["id","btn-continue-password","class","btn-primary","type","submit",3,"disabled",4,"ngIf"],["id","btn-verify-otp","class","btn-primary","type","button",3,"disabled","click",4,"ngIf"],["id","btn-create-signin","class","btn-primary","type","submit",3,"disabled",4,"ngIf"],[1,"or-divider"],["type","button","id","btn-sso",1,"btn-sso"],["name","logo-google",1,"sso-google-icon"],[1,"secure-data-notice"],["name","shield-checkmark-outline"],[1,"copyright"],["for","login-password",1,"field-label"],[1,"input-with-toggle"],["id","login-password","formControlName","password","placeholder","Enter your password",1,"form-input",3,"focus","blur","type"],["type","button","tabindex","-1",1,"eye-toggle",3,"click"],[3,"name"],[1,"label-row",2,"display","flex","justify-content","space-between","align-items","center","margin-bottom","5px"],["for","login-otp",1,"field-label",2,"margin-bottom","0"],[2,"font-size","11px","color","#1565c0","cursor","pointer","font-weight","600","text-decoration","none",3,"click"],["id","login-otp","type","text","formControlName","otp","placeholder","Enter 6-digit OTP","maxlength","6",1,"form-input"],[1,"otp-success-alert",2,"background-color","#e8f5e9","color","#2e7d32","padding","12px","border-radius","8px","border","1px solid #c8e6c9","margin-bottom","20px","display","flex","align-items","center","font-size","14px","font-weight","500"],["name","checkmark-circle",2,"font-size","20px","margin-right","8px","color","#2e7d32"],["for","login-create-password",1,"field-label"],["id","login-create-password","formControlName","password","placeholder","Create a new password",1,"form-input",3,"focus","blur","type"],[1,"remember-forgot-row"],[1,"remember-label"],["type","checkbox",3,"ngModelChange","ngModel","ngModelOptions"],[1,"checkmark"],[1,"forgot-link",3,"click"],["id","btn-continue-email","type","button",1,"btn-primary",3,"click","disabled"],["id","btn-continue-password","type","submit",1,"btn-primary",3,"disabled"],[4,"ngIf"],["name","crescent","style","--color:#fff; width:18px; height:18px;",4,"ngIf"],["name","crescent",2,"--color","#fff","width","18px","height","18px"],["id","btn-verify-otp","type","button",1,"btn-primary",3,"click","disabled"],["id","btn-create-signin","type","submit",1,"btn-primary",3,"disabled"],["for","reset-email",1,"field-label"],["id","reset-email","type","text","formControlName","employee_id","placeholder","Enter your employee ID or email",1,"form-input",3,"readonly"],["class","btn-primary","type","button",3,"disabled","click",4,"ngIf"],["class","btn-primary","type","submit",3,"disabled",4,"ngIf"],["type","button",1,"btn-sso",3,"click"],["name","arrow-back-outline"],["for","reset-otp",1,"field-label",2,"margin-bottom","0"],["id","reset-otp","type","text","formControlName","otp","placeholder","Enter 6-digit OTP","maxlength","6",1,"form-input"],["for","reset-password",1,"field-label"],["id","reset-password","type","password","formControlName","password","placeholder","Enter new password",1,"form-input"],["type","button",1,"btn-primary",3,"click","disabled"],["type","submit",1,"btn-primary",3,"disabled"]],template:function(n,a){n&1&&(o(0,"ion-content",0)(1,"div",1)(2,"div",2),u(3,"img",3),o(4,"div",4)(5,"h2",5),s(6,"Manage better."),u(7,"br"),o(8,"span",6),s(9,"Empower"),r(),s(10," faster."),r(),o(11,"p",7),s(12,"A unified platform to manage your workforce,"),u(13,"br"),s(14,"attendance, payroll, and more \u2014 all in one place."),r()()(),o(15,"div",8),v(16,On,35,10,"div",9)(17,Tn,27,8,"div",9),r()()()),n&2&&(l("fullscreen",!0),g(),E("forgot-mode",a.showForgotPassword),g(15),l("ngIf",!a.showForgotPassword),g(),l("ngIf",a.showForgotPassword))},dependencies:[j,W,q,Y,D,G,H,U,X,$,Z,nn,en],styles:[`

[_nghost-%COMP%]   ion-content.login-content[_ngcontent-%COMP%] {
  --background: #ffffff !important;
  --ion-background-color: #ffffff !important;
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  --padding-end: 0;
}
ion-content.login-content[_ngcontent-%COMP%] {
  --background: #ffffff !important;
  --ion-background-color: #ffffff !important;
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  --padding-end: 0;
  height: 100%;
}
.login-page-wrapper[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  font-family:
    "Inter",
    "Roboto",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background: #ffffff;
  overflow-x: hidden;
}
.left-panel[_ngcontent-%COMP%] {
  flex: 0 0 55%;
  background-color: #1964A2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  min-height: 100vh;
  padding: 40px 32px;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}
.illustration-img[_ngcontent-%COMP%] {
  width: 72%;
  max-width: 500px;
  margin: auto;
  object-fit: contain;
  z-index: 2;
}
.deco-card[_ngcontent-%COMP%] {
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  padding: 12px 18px 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
  animation: _ngcontent-%COMP%_floatCard 6s ease-in-out infinite alternate;
}
.deco-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
  flex-shrink: 0;
}
.deco-card[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.deco-card[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: block;
  height: 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.4);
}
.deco-card[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {
  width: 72px;
}
.deco-card[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {
  width: 52px;
}
.deco-card[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {
  width: 62px;
}
.deco-card.deco-card-top[_ngcontent-%COMP%] {
  top: 4%;
  left: 3%;
  animation-delay: 0s;
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%] {
  bottom: 2%;
  right: -10px;
  animation-delay: 2s;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px 16px;
  width: 150px;
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-icon-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-icon-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%] {
  width: 100%;
  gap: 8px;
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  height: 9px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.35);
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {
  width: 100%;
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {
  width: 75%;
}
.deco-card.deco-card-bottom[_ngcontent-%COMP%]   .deco-lines[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {
  display: none;
}
@keyframes _ngcontent-%COMP%_floatCard {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-12px);
  }
}
.paper-plane[_ngcontent-%COMP%] {
  position: absolute;
  z-index: 2;
}
.paper-plane[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 26px;
  color: #ffffff;
}
.paper-plane.plane-top[_ngcontent-%COMP%] {
  top: 7%;
  right: 8%;
  opacity: 0.85;
  animation: _ngcontent-%COMP%_floatPlane 8s ease-in-out infinite alternate;
}
.paper-plane.plane-top[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 38px;
}
.paper-plane.plane-bottom[_ngcontent-%COMP%] {
  bottom: 22%;
  left: 6%;
  opacity: 0.5;
  animation: _ngcontent-%COMP%_floatPlane 7s ease-in-out infinite alternate-reverse;
}
.paper-plane.plane-bottom[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 22px;
}
@keyframes _ngcontent-%COMP%_floatPlane {
  0% {
    transform: translateY(0) rotate(-15deg);
  }
  100% {
    transform: translateY(-18px) rotate(-5deg);
  }
}
.left-caption[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
  margin-bottom: 28px;
}
.left-caption[_ngcontent-%COMP%]   .caption-title[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 10px;
  letter-spacing: -0.2px;
}
.left-caption[_ngcontent-%COMP%]   .caption-title[_ngcontent-%COMP%]   .caption-accent[_ngcontent-%COMP%] {
  color: #3ba4ff;
}
.left-caption[_ngcontent-%COMP%]   .caption-subtitle[_ngcontent-%COMP%] {
  font-size: 13px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  max-width: 320px;
}
.right-panel[_ngcontent-%COMP%] {
  flex: 0 0 45%;
  background: #ffffff !important;
  background-color: #ffffff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}
.form-card[_ngcontent-%COMP%] {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brand-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.brand-header[_ngcontent-%COMP%]   .brand-logo-circle[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  background: #1565c0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);
}
.brand-header[_ngcontent-%COMP%]   .brand-logo-circle[_ngcontent-%COMP%]   .brand-logo-img[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
.brand-header[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%]   .brand-name-main[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #1a237e;
  line-height: 1.2;
}
.brand-header[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%]   .brand-name-sub[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #1565c0;
  line-height: 1.2;
}
.brand-header[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%]   .brand-tagline[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #9e9e9e;
  letter-spacing: 0.04em;
  margin-top: 2px;
  text-transform: lowercase;
}
.form-heading[_ngcontent-%COMP%] {
  font-size: 26px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 8px;
  letter-spacing: -0.4px;
  text-align: center;
}
.form-subheading[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #757575;
  margin: 0 0 28px;
  text-align: center;
  line-height: 1.5;
}
.login-form[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.field-group[_ngcontent-%COMP%] {
  width: 100%;
  margin-bottom: 14px;
}
.field-group[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #555555;
  margin-bottom: 5px;
  letter-spacing: 0.01em;
}
.form-input[_ngcontent-%COMP%] {
  width: 100%;
  height: 44px;
  background: #ffffff;
  border: 1px solid #d4d4d4;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  color: #212121;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}
.form-input[_ngcontent-%COMP%]::placeholder {
  color: #b0b0b0;
  font-weight: 400;
}
.form-input[_ngcontent-%COMP%]:focus {
  border-color: #1565c0;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.08);
}
.input-with-toggle[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
}
.input-with-toggle[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  padding-right: 44px;
}
.input-with-toggle[_ngcontent-%COMP%]   .eye-toggle[_ngcontent-%COMP%] {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-with-toggle[_ngcontent-%COMP%]   .eye-toggle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #9e9e9e;
  transition: color 0.2s;
}
.input-with-toggle[_ngcontent-%COMP%]   .eye-toggle[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: #616161;
}
.input-with-icon-left[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
}
.input-with-icon-left[_ngcontent-%COMP%]   .form-input.has-left-icon[_ngcontent-%COMP%] {
  padding-left: 44px;
}
.input-with-icon-left[_ngcontent-%COMP%]   .left-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #9e9e9e;
  pointer-events: none;
  z-index: 1;
}
.remember-forgot-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
}
.remember-forgot-row[_ngcontent-%COMP%]   .remember-label[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  font-size: 12.5px;
  color: #616161;
  cursor: pointer;
  position: relative;
  padding-left: 24px;
  -webkit-user-select: none;
  user-select: none;
  gap: 0;
}
.remember-forgot-row[_ngcontent-%COMP%]   .remember-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.remember-forgot-row[_ngcontent-%COMP%]   .remember-label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%] {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 1.5px solid #bdbdbd;
  border-radius: 3px;
  transition: all 0.2s ease;
}
.remember-forgot-row[_ngcontent-%COMP%]   .remember-label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  display: none;
  left: 4px;
  top: 0px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.remember-forgot-row[_ngcontent-%COMP%]   .remember-label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%] {
  background: #1565c0;
  border-color: #1565c0;
}
.remember-forgot-row[_ngcontent-%COMP%]   .remember-label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%]::after {
  display: block;
}
.remember-forgot-row[_ngcontent-%COMP%]   .forgot-link[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #1565c0;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}
.remember-forgot-row[_ngcontent-%COMP%]   .forgot-link[_ngcontent-%COMP%]:hover {
  color: #0d47a1;
  text-decoration: underline;
}
.btn-primary[_ngcontent-%COMP%] {
  width: 100%;
  height: 48px;
  background:
    linear-gradient(
      90deg,
      #486df0 0%,
      #584df5 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  letter-spacing: 0.02em;
  transition: background 0.2s ease, transform 0.15s ease;
  box-shadow: none;
  margin-bottom: 0;
}
.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #14305a;
  transform: translateY(-1px);
}
.btn-primary[_ngcontent-%COMP%]:active:not(:disabled) {
  transform: scale(0.98);
}
.btn-primary[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.or-divider[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 18px 0;
}
.or-divider[_ngcontent-%COMP%]::before, 
.or-divider[_ngcontent-%COMP%]::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}
.or-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  font-size: 12px;
  color: #757575;
  background: #fff;
  margin: 0 16px;
  padding: 0;
}
.btn-sso[_ngcontent-%COMP%] {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  color: #424242;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.btn-sso[_ngcontent-%COMP%]   .sso-google-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #ea4335;
}
.btn-sso[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #555555;
}
.btn-sso[_ngcontent-%COMP%]:hover {
  border-color: #bdbdbd;
  background: #f8f8f8;
}
.secure-data-notice[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  background: #f4f6f9;
  padding: 14px;
  border-radius: 12px;
  color: #1a237e;
  font-size: 12px;
  font-weight: 600;
  width: 100%;
}
.secure-data-notice[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #3f51b5;
}
.copyright[_ngcontent-%COMP%] {
  margin-top: 12px;
  font-size: 11px;
  color: #9e9e9e;
  text-align: center;
  letter-spacing: 0.01em;
}
@media (max-width: 900px) {
  .left-panel[_ngcontent-%COMP%] {
    flex: 0 0 50%;
    padding: 32px 20px;
  }
  .right-panel[_ngcontent-%COMP%] {
    flex: 0 0 50%;
    padding: 32px 20px;
  }
  .illustration-img[_ngcontent-%COMP%] {
    max-height: 240px !important;
  }
  .left-caption[_ngcontent-%COMP%]   .caption-title[_ngcontent-%COMP%] {
    font-size: 22px;
  }
}
@media screen and (max-width: 680px) {
  .login-page-wrapper[_ngcontent-%COMP%] {
    flex-direction: column;
    background: #ffffff;
    min-height: 100vh;
  }
  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .left-panel[_ngcontent-%COMP%] {
    flex: none;
    width: 100%;
    height: auto;
    min-height: 400px;
    background:
      linear-gradient(
        -45deg,
        #535af6,
        #298af4,
        #00d2ff,
        #3a7bd5);
    background-size: 400% 400%;
    animation: gradientFlow 10s ease infinite;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px 80px;
    position: relative;
    z-index: 1;
  }
  .illustration-img[_ngcontent-%COMP%] {
    width: 50%;
    max-width: 350px;
    height: auto;
    object-fit: contain;
    display: block;
    z-index: 2;
    margin-bottom: 0;
    margin-top: 0;
  }
  .deco-card[_ngcontent-%COMP%], 
   .paper-plane.plane-bottom[_ngcontent-%COMP%], 
   .paper-plane.plane-top[_ngcontent-%COMP%] {
    display: none;
  }
  .left-caption[_ngcontent-%COMP%] {
    margin: 0;
    text-align: center;
    position: relative;
    z-index: 2;
    width: 100%;
  }
  .left-caption[_ngcontent-%COMP%]   .caption-title[_ngcontent-%COMP%] {
    font-size: 28px;
    line-height: 1.25;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 12px;
    letter-spacing: -0.2px;
  }
  .left-caption[_ngcontent-%COMP%]   .caption-title[_ngcontent-%COMP%]   .caption-accent[_ngcontent-%COMP%] {
    color: #ffffff;
  }
  .left-caption[_ngcontent-%COMP%]   .caption-subtitle[_ngcontent-%COMP%] {
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    margin: auto;
    display: none;
  }
  .right-panel[_ngcontent-%COMP%] {
    flex: 1;
    width: 90%;
    margin-top: -120px;
    background: #ffffff;
    border-radius: 40px 40px 40px 40px;
    padding: 14px 24px 0px;
    position: relative;
    z-index: 20;
    box-shadow: none;
    min-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    max-height: calc(100vh - 310px);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  .form-card[_ngcontent-%COMP%] {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  .brand-header[_ngcontent-%COMP%] {
    margin-top: 0;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .brand-logo-img[_ngcontent-%COMP%] {
    width: 150px;
    height: auto;
    display: block;
  }
  .form-heading[_ngcontent-%COMP%] {
    font-size: 26px;
    color: #0b1134;
    font-weight: 800;
    margin-bottom: 8px;
    text-align: center;
  }
  .form-subheading[_ngcontent-%COMP%] {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 30px;
    text-align: center;
  }
  .field-group[_ngcontent-%COMP%] {
    margin-bottom: 20px;
    width: 100%;
  }
  .field-label[_ngcontent-%COMP%] {
    font-size: 13px !important;
    margin-bottom: 8px !important;
    color: #374151;
    font-weight: 500;
    display: block;
  }
  .form-input[_ngcontent-%COMP%] {
    height: 48px;
    border-radius: 8px;
    font-size: 14px;
    padding-left: 42px;
    border: 1px solid #d1d5db;
    color: #111827;
    width: 100%;
  }
  .input-with-icon-left[_ngcontent-%COMP%]   .form-input.has-left-icon[_ngcontent-%COMP%] {
    padding-left: 42px;
  }
  .input-with-icon-left[_ngcontent-%COMP%]   .left-icon[_ngcontent-%COMP%] {
    left: 14px !important;
    font-size: 20px !important;
    color: #9ca3af;
  }
  .btn-primary[_ngcontent-%COMP%] {
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
    box-shadow: none;
    background:
      linear-gradient(
        90deg,
        #4f5af5 0%,
        #466BF5 100%);
    width: 100%;
  }
  .or-divider[_ngcontent-%COMP%] {
    margin: 24px 0;
    width: 100%;
  }
  .or-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
    font-size: 12px;
    width: 32px;
    height: 32px;
    color: #9ca3af;
    border: 1px solid #e5e7eb;
    background: #ffffff;
  }
  .btn-sso[_ngcontent-%COMP%] {
    height: 48px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: none;
    border: 1px solid #d1d5db;
    color: #374151;
    width: 100%;
    background: #ffffff;
  }
  .secure-data-notice[_ngcontent-%COMP%] {
    margin-top: 28px;
    height: 44px;
    border-radius: 8px;
    background: #f3f4f6;
    font-size: 12px;
    font-weight: 500;
    color: #1e3a8a;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .copyright[_ngcontent-%COMP%] {
    margin-top: 24px;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
    width: 100%;
  }
}
.login-page-wrapper.forgot-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%] {
  transform: translateX(81.8181818182%);
}
.login-page-wrapper.forgot-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%] {
  transform: translateX(-122.2222222222%);
}
@media (max-width: 900px) {
  .login-page-wrapper.forgot-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%] {
    transform: translateX(100%);
  }
  .login-page-wrapper.forgot-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%] {
    transform: translateX(-100%);
  }
}
@media (max-width: 680px) {
  .login-page-wrapper.forgot-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%] {
    transform: none;
  }
  .login-page-wrapper.forgot-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%] {
    transform: none;
  }
}`]});let i=d;return i})();var Fn=[{path:"",component:dn}],Hn=(()=>{let d=class d{};d.\u0275fac=function(n){return new(n||d)},d.\u0275mod=F({type:d}),d.\u0275inj=S({imports:[N,J,Q,rn,B.forChild(Fn)]});let i=d;return i})();export{Hn as LoginPageModule};
