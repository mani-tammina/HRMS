import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
  }
];
