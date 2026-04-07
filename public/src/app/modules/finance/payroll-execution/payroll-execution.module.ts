import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { PayrollExecutionPage } from './payroll-execution.page';

const routes: Routes = [{ path: '', component: PayrollExecutionPage }];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [PayrollExecutionPage]
})
export class PayrollExecutionPageModule {}
