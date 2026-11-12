import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FinancialAdminPage } from './financial-admin.page';
import { EmployeeBankUploadModalComponent } from './components/employee-bank-upload-modal/employee-bank-upload-modal.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialAdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EmployeeBankUploadModalComponent
  ],
  declarations: [FinancialAdminPage]
})
export class FinancialAdminPageModule {}
