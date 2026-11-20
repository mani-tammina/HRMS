import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { BonusRevisionsOvertimePage } from './bonus-revisions-overtime.page';
import { ImportOneTimePaymentsPage } from './import-one-time-payments/import-one-time-payments.page';

const routes: Routes = [
  {
    path: '',
    component: BonusRevisionsOvertimePage
  },
  {
    path: 'import',
    component: ImportOneTimePaymentsPage
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
    BonusRevisionsOvertimePage,
    ImportOneTimePaymentsPage
  ]
})
export class BonusRevisionsOvertimePageModule {}
