import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { TimeTrackingListPage } from './time-tracking-list/time-tracking-list.page';
import { TimeTrackingWizardPage } from './time-tracking-wizard/time-tracking-wizard.page';
import { Step1BasicInfoComponent } from './time-tracking-wizard/steps/step1-basic-info/step1-basic-info.component';
import { Step2BiometricComponent } from './time-tracking-wizard/steps/step2-biometric/step2-biometric.component';
import { Step3RemotePunchesComponent } from './time-tracking-wizard/steps/step3-remote-punches/step3-remote-punches.component';
import { Step4WfhOnDutyComponent } from './time-tracking-wizard/steps/step4-wfh-on-duty/step4-wfh-on-duty.component';
import { Step5RegularizationComponent } from './time-tracking-wizard/steps/step5-regularization/step5-regularization.component';

const routes: Routes = [
  { path: '', component: TimeTrackingListPage },
  { path: 'create', component: TimeTrackingWizardPage },
  { path: 'edit/:id', component: TimeTrackingWizardPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TimeTrackingListPage,
    TimeTrackingWizardPage,
    Step1BasicInfoComponent,
    Step2BiometricComponent,
    Step3RemotePunchesComponent,
    Step4WfhOnDutyComponent,
    Step5RegularizationComponent
  ]
})
export class TimeTrackingModule {}
