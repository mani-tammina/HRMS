// ...existing code...
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
      path: 'payroll-admin',
      loadComponent: () => import('./pages/payroll-admin/payroll-admin.page').then(m => m.PayrollAdminPage),
      canActivate: [adminGuard]
    },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./pages/attendance/attendance.page').then(m => m.AttendancePage)
      },
      {
        path: 'leaves',
        loadComponent: () => import('./pages/leaves/leaves.page').then(m => m.LeavesPage)
      },
      {
        path: 'timesheets',
        loadComponent: () => import('./pages/timesheets/timesheets.page').then(m => m.TimesheetsPage)
      },
      {
        path: 'team-compliance',
        loadComponent: () => import('./pages/team-compliance/team-compliance.page').then(m => m.TeamCompliancePage)
      },
      {
        path: 'manager-approvals',
        loadComponent: () => import('./pages/manager-approvals/manager-approvals.page').then(m => m.ManagerApprovalsPage)
      },
      {
        path: 'verification-queue',
        loadComponent: () => import('./pages/verification-queue/verification-queue.page').then(m => m.VerificationQueuePage)
      },
      {
        path: 'team',
        loadComponent: () => import('./pages/team/team.page').then(m => m.TeamPage)
      },
      {
        path: 'onboarding',
        loadComponent: () => import('./pages/onboarding/onboarding.page').then(m => m.OnboardingPage)
      },
      {
        path: 'payroll',
        loadComponent: () => import('./pages/admin-payroll-management/admin-payroll-management.page').then(m => m.AdminPayrollManagementPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'employees',
    loadComponent: () => import('./pages/employees/employees.page').then(m => m.EmployeesPage),
    canActivate: [authGuard]
  },
  {
    path: 'employee/:id',
    loadComponent: () => import('./pages/employee-detail/employee-detail.page').then(m => m.EmployeeDetailPage),
    canActivate: [authGuard]
  },
  {
    path: 'leave-request',
    loadComponent: () => import('./pages/leave-request/leave-request.page').then(m => m.LeaveRequestPage),
    canActivate: [authGuard]
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications/notifications.page').then(m => m.NotificationsPage),
    canActivate: [authGuard]
  },
  {
    path: 'work-updates',
    loadComponent: () => import('./pages/work-updates/work-updates.page').then(m => m.WorkUpdatesPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/timesheet/dashboard',
    loadComponent: () => import('./pages/admin-timesheet-dashboard/admin-timesheet-dashboard.page').then(m => m.AdminTimesheetDashboardPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/timesheet/verification-queue',
    loadComponent: () => import('./pages/verification-queue/verification-queue.page').then(m => m.VerificationQueuePage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/timesheet/client-timesheet/:id',
    loadComponent: () => import('./pages/client-timesheet-verification/client-timesheet-verification.page').then(m => m.ClientTimesheetVerificationPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/timesheet/verification-comparison/:id',
    loadComponent: () => import('./pages/verification-comparison/verification-comparison.page').then(m => m.VerificationComparisonPage),
    canActivate: [authGuard]
  },
  {
    path: 'payroll',
    loadComponent: () => import('./pages/payroll/payroll.page').then(m => m.PayrollPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/payroll',
    loadComponent: () => import('./pages/admin-payroll/admin-payroll.page').then(m => m.AdminPayrollPage),
    canActivate: [authGuard]
  },
  {
    path: 'timesheets',
    loadComponent: () => import('./pages/timesheets/timesheets.page').then(m => m.TimesheetsPage),
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports.page').then(m => m.ReportsPage),
    canActivate: [authGuard]
  },
  {
    path: 'holidays',
    loadComponent: () => import('./pages/holidays/holidays.page').then(m => m.HolidaysPage),
    canActivate: [authGuard]
  },
  {
    path: 'announcements',
    loadComponent: () => import('./pages/announcements/announcements.page').then(m => m.AnnouncementsPage),
    canActivate: [authGuard]
  },
  {
    path: 'support',
    loadComponent: () => import('./pages/support/support.page').then(m => m.SupportPage),
    canActivate: [authGuard]
  },
  {
    path: 'candidates',
    loadComponent: () => import('./pages/candidates/candidates.page').then(m => m.CandidatesPage),
    canActivate: [authGuard]
  },
  // Admin-only routes
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/compliance-dashboard',
    loadComponent: () => import('./pages/admin-compliance-dashboard/admin-compliance-dashboard.page').then(m => m.AdminComplianceDashboardPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/bulk-upload',
    loadComponent: () => import('./pages/bulk-upload/bulk-upload.page').then(m => m.BulkUploadPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/master-data',
    loadComponent: () => import('./pages/master-data/master-data.page').then(m => m.MasterDataPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/leave-plans',
    loadComponent: () => import('./pages/leave-plans/leave-plans.page').then(m => m.LeavePlansPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/leave-plans/:id',
    loadComponent: () => import('./pages/leave-plan-detail/leave-plan-detail.page').then(m => m.LeavePlanDetailPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/leave-types',
    loadComponent: () => import('./pages/leave-types/leave-types.page').then(m => m.LeaveTypesPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/leaves',
    loadComponent: () => import('./pages/manager-approvals/manager-approvals.page').then(m => m.ManagerApprovalsPage),
    canActivate: [adminGuard]
  },
  // Projects Management Routes
  {
    path: 'admin/projects',
    loadComponent: () => import('./pages/admin/projects/projects.page').then(m => m.ProjectsPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/projects/:id',
    loadComponent: () => import('./pages/admin/projects/project-detail/project-detail.page').then(m => m.ProjectDetailPage),
    canActivate: [adminGuard]
  },
  // Assets Management Routes
  {
    path: 'admin/assets',
    loadComponent: () => import('./pages/admin/assets/assets.page').then(m => m.AssetsPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/assets/allocate',
    loadComponent: () => import('./pages/admin/assets/asset-allocation/asset-allocation.page').then(m => m.AssetAllocationPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/assets/reports',
    loadComponent: () => import('./pages/admin/assets/asset-reports/asset-reports.page').then(m => m.AssetReportsPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/assets/:id',
    loadComponent: () => import('./pages/admin/assets/asset-detail/asset-detail.page').then(m => m.AssetDetailPage),
    canActivate: [adminGuard]
  },
  // Analytics Dashboard
  {
    path: 'admin/analytics',
    loadComponent: () => import('./pages/admin/analytics/analytics-dashboard.page').then(m => m.AnalyticsDashboardPage),
    canActivate: [adminGuard]
  },
  // Verification Queue (shorter path)
  {
    path: 'verification-queue',
    loadComponent: () => import('./pages/verification-queue/verification-queue.page').then(m => m.VerificationQueuePage),
    canActivate: [authGuard]
  }

];
