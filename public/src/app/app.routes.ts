import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
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
  }
];
