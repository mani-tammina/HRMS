import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OnboardingMainheaderComponent } from '../onboarding-mainheader/onboarding-mainheader.component';
import { CoreModule } from 'src/app/core/core.module';
@Component({
  selector: 'app-onboarding-tasks',
  templateUrl: './onboarding-tasks.component.html',
  styleUrls: ['./onboarding-tasks.component.scss'],
  standalone: true,
  imports: [IonicModule, OnboardingMainheaderComponent, CoreModule]
})
export class OnboardingTasksComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
