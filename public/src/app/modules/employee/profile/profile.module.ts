import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { RouterModule, Routes } from '@angular/router';

// Standalone Tab Components
import { AboutTabComponent } from './tabs/about/about.component';
import { ProfileTabComponent } from './tabs/profile/profile.component';
import { JobTabComponent } from './tabs/job/job.component';
import { DocumentTabComponent } from './tabs/document/document.component';
import { AssetsTabComponent } from './tabs/assets/assets.component';
import { LeavesTabComponent } from './tabs/leaves/leaves.component';
import { ResignationFormComponent } from './components/resignation-form/resignation-form.component';
import { ResignationTrackingComponent } from './components/resignation-tracking/resignation-tracking.component';
import { IdCardModalComponent } from './components/id-card-modal/id-card-modal.component';
import { LeaveBalanceModalComponent } from './components/leave-balance-modal/leave-balance-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // Standard standalone component imports
    AboutTabComponent,
    ProfileTabComponent,
    JobTabComponent,
    DocumentTabComponent,
    AssetsTabComponent,
    LeavesTabComponent,
    ResignationFormComponent,
    ResignationTrackingComponent,
    IdCardModalComponent,
    LeaveBalanceModalComponent
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
