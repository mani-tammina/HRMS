import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReimbursementAdhocDeductionPage } from './reimbursement-adhoc-deduction.page';

const routes: Routes = [
  {
    path: '',
    component: ReimbursementAdhocDeductionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReimbursementAdhocDeductionPage
  ]
})
export class ReimbursementAdhocDeductionPageModule {}
