import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PayrollPreviewAllPage } from './payroll-preview-all.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollPreviewAllPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayrollPreviewAllPage]
})
export class PayrollPreviewAllPageModule {}
