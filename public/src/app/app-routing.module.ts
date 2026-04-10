import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'Home',
    loadChildren: () => import('./modules/dashboard/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['employee', 'manager', 'hr', 'finance'] }
  },
  {
    path: 'administration',
    loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['admin', 'hr'] }
  },
  {
    path: 'admin/master-setup',
    loadChildren: () => import('./modules/administration/master-setup/master-setup.module').then(m => m.MasterSetupPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['admin', 'hr'] }
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnboardingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['admin', 'hr'] }
  },
  {
    path: 'leaves',
    loadChildren: () => import('./modules/attendance/leaves/leaves.module').then(m => m.LeavesPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['employee', 'manager', 'hr', 'finance'] }
  },
  {
    path: 'MyTeam',
    loadChildren: () => import('./modules/employee/my-team/my-team.module').then(m => m.MyTeamPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['manager', 'hr', 'employee', 'finance'] }
  },
  {
    path: 'workTrack',
    loadChildren: () => import('./modules/attendance/work-track/work-track.module').then(m => m.WorkTrackPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['employee', 'hr', 'finance'] }
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/employee/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'Me',
    loadComponent: () => import('./modules/attendance/me/me.page').then(m => m.MePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'MyPay',
    loadChildren: () => import('./modules/payroll/payslips/payslips.module').then(m => m.PayslipsPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['employee', 'manager', 'hr', 'finance'] }
  },
  {
    path: 'MyTax',
    loadChildren: () => import('./modules/payroll/my-tax/my-tax.module').then(m => m.MyTaxPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['employee', 'manager', 'hr', 'finance'] }
  },
  {
    path: 'finance',
    loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['admin', 'hr', 'finance'] }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
