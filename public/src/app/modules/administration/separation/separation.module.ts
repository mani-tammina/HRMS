import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SeparationPage } from './separation.page';
import { SeparationDetailsPage } from './separation-details/separation-details.page';
import { ResignationTrackingComponent } from '../../employee/profile/components/resignation-tracking/resignation-tracking.component';
import { ResignationSettingsComponent } from './components/resignation-settings/resignation-settings.component';
import { NoticePeriodLeavesSettingsComponent } from './components/notice-period-leaves-settings/notice-period-leaves-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SeparationPage
  },
  {
    path: 'details/:id',
    component: SeparationDetailsPage
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ResignationTrackingComponent,
    ResignationSettingsComponent,
    NoticePeriodLeavesSettingsComponent
  ],
  declarations: [
    SeparationPage,
    SeparationDetailsPage
  ]
})
export class SeparationPageModule {}

