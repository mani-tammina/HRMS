import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { StructureCompositionPage } from './structure-composition.page';

const routes: Routes = [
  {
    path: '',
    component: StructureCompositionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StructureCompositionPage
  ]
})
export class StructureCompositionPageModule {}
