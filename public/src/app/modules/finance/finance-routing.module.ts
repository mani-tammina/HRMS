import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./financial-admin/financial-admin.module').then(m => m.FinancialAdminPageModule)
  },
  {
    path: 'components',
    loadChildren: () => import('./payroll-components/payroll-components.module').then(m => m.PayrollComponentsPageModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./payroll-templates/payroll-templates.module').then(m => m.PayrollTemplatesPageModule)
  },
  {
    path: 'templates/composition/:id',
    loadChildren: () => import('./payroll-templates/template-composition/template-composition.module').then(m => m.TemplateCompositionPageModule)
  },
  {
    path: 'structure',
    loadChildren: () => import('./payroll-structure/payroll-structure.module').then(m => m.PayrollStructurePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
