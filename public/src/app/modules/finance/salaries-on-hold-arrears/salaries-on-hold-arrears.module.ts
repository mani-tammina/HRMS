import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SalariesOnHoldArrearsPage } from './salaries-on-hold-arrears.page';

const routes: Routes = [
  {
    path: '',
    component: SalariesOnHoldArrearsPage
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
    SalariesOnHoldArrearsPage
  ]
})
export class SalariesOnHoldArrearsPageModule {}
