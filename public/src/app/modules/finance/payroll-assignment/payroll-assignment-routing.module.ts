import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollAssignmentPage } from './payroll-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollAssignmentPageRoutingModule {}
