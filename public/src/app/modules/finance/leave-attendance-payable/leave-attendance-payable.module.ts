import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { LeaveAttendancePayablePage } from './leave-attendance-payable.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveAttendancePayablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaveAttendancePayablePage]
})
export class LeaveAttendancePayablePageModule {}

