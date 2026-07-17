import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetupComponent } from './setup/setup.component';
import { PreonboardingComponent } from './preonboarding/preonboarding.component';
import { NewJoinerComponent } from './new-joiner/new-joiner.component';
import { PastOffersComponent } from './past-offers/past-offers.component';
import { OnboardingTasksComponent } from './onboarding-tasks/onboarding-tasks.component';
import { TaskTemplatesComponent } from './task-templates/task-templates.component';
import { PostPage } from './pre.page';
import { CreateOfferComponent } from './create-offer/create-offer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full'
  },
  {
    path: 'setup',
    component: SetupComponent
  },
  {
    path: 'preOnboarding',
    component: PreonboardingComponent
  },
  {
    path: 'NewJoiner',
    component: NewJoinerComponent
  },
  {
    path: 'pastOffers',
    component: PastOffersComponent
  },
  {
    path: 'onboarding_Tasks',
    component: OnboardingTasksComponent
  },
  {
    path: 'Task_Template',
    component: TaskTemplatesComponent
  },
  {
    path: 'pre',
    component: PostPage
  },
  {
    path: 'CreateOffer/:id/:name',
    component: CreateOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingModule { }
