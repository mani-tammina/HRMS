import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-start-onboarding',
  templateUrl: './start-onboarding.component.html',
  styleUrls: ['./start-onboarding.component.scss'],
  standalone: true,
  imports: [IonicModule,]
})
export class StartOnboardingComponent implements OnInit {
  @Input() candidate: any;

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    console.log(this.candidate)
  }
  close() {
    this.modalCtrl.dismiss();
  }
  createOffer() {
    // Navigate to CreateOffer page with candidate data passed via router state
    this.router.navigate(['/onboarding/CreateOffer', this.candidate.id, encodeURIComponent(this.candidate.personalDetails.FirstName)], {
      state: { candidate: this.candidate }   // pass candidate via state
    });
    this.modalCtrl.dismiss();
  }
}
