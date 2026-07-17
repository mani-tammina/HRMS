import { Component, OnInit } from '@angular/core';
import { OnboardingMainheaderComponent } from '../onboarding-mainheader/onboarding-mainheader.component';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-past-offers',
  templateUrl: './past-offers.component.html',
  styleUrls: ['./past-offers.component.scss'],
  standalone: true,
  imports: [OnboardingMainheaderComponent, IonicModule, CoreModule]
})
export class PastOffersComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
