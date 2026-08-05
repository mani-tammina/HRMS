import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDocumentsPage } from './employee-documents.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDocumentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EmployeeDocumentsPage
  ]
})
export class EmployeeDocumentsPageModule {}
