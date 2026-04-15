import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayslipsPage } from './payslips.page';
import { RouterModule, Routes } from '@angular/router';
import { TaxationComponent } from './components/taxation/taxation.component';

const routes: Routes = [
  {
    path: '',
    component: PayslipsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayslipsPage, TaxationComponent]
})
export class PayslipsPageModule {}
