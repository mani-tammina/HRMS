import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiometricDashboardPage } from './biometric-dashboard/biometric-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: BiometricDashboardPage
  },
  {
    path: 'devices',
    component: BiometricDashboardPage
  },
  {
    path: 'mappings',
    component: BiometricDashboardPage
  },
  {
    path: 'raw-logs',
    component: BiometricDashboardPage
  },
  {
    path: 'daily-records',
    component: BiometricDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiometricRoutingModule {}

