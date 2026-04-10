import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayrollAssignmentPageRoutingModule } from './payroll-assignment-routing.module';
import { PayrollAssignmentPage } from './payroll-assignment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PayrollAssignmentPageRoutingModule
  ],
  declarations: [PayrollAssignmentPage]
})
export class PayrollAssignmentPageModule {}
