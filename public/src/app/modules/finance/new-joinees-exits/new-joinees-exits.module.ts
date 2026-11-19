import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NewJoineesExitsPage } from './new-joinees-exits.page';

const routes: Routes = [
  {
    path: '',
    component: NewJoineesExitsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewJoineesExitsPage]
})
export class NewJoineesExitsPageModule {}

