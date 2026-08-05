import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListPageModule)
  },
  {
    path: 'org-setup',
    loadChildren: () => import('./org-setup/org-setup.module').then(m => m.OrgSetupPageModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesPageModule)
  },
  {
    path: 'leaves-admin',
    loadChildren: () => import('./leaves-admin/leaves-admin.module').then(m => m.LeavesAdminPageModule)
  },
  {
    path: 'leave-types',
    loadChildren: () => import('./leave-types/leave-types.module').then(m => m.LeaveTypesPageModule)
  },
  {
    path: 'leave-plans',
    loadChildren: () => import('./leave-plans/leave-plans.module').then(m => m.LeavePlansPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsPageModule)
  },
  {
    path: 'projects/details/:id',
    loadComponent: () => import('./projects/project-details/project-details.page').then(m => m.ProjectDetailsPage)
  },
  {
    path: 'separation',
    loadChildren: () => import('./separation/separation.module').then(m => m.SeparationPageModule)
  },
  {
    path: 'time-tracking',
    loadChildren: () => import('./time-tracking/time-tracking.module').then(m => m.TimeTrackingModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./employee-documents/employee-documents.module').then(m => m.EmployeeDocumentsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
