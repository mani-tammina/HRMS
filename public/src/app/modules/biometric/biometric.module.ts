import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BiometricRoutingModule } from './biometric-routing.module';
import { BiometricDashboardPage } from './biometric-dashboard/biometric-dashboard.page';
import { BiometricDevicesComponent } from './components/biometric-devices/biometric-devices.component';
import { BiometricMappingsComponent } from './components/biometric-mappings/biometric-mappings.component';
import { BiometricRawLogsComponent } from './components/biometric-raw-logs/biometric-raw-logs.component';
import { BiometricDailyRecordsComponent } from './components/biometric-daily-records/biometric-daily-records.component';

@NgModule({
  declarations: [
    BiometricDashboardPage,
    BiometricDevicesComponent,
    BiometricMappingsComponent,
    BiometricRawLogsComponent,
    BiometricDailyRecordsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BiometricRoutingModule
  ]
})
export class BiometricModule {}

