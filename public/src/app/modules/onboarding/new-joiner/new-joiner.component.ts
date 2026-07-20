import { Component, OnInit } from '@angular/core';
import { OnboardingMainheaderComponent } from '../onboarding-mainheader/onboarding-mainheader.component';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HireEmployeesService } from 'src/app/core/services/hire-employees.service';

@Component({
  selector: 'app-new-joiner',
  templateUrl: './new-joiner.component.html',
  styleUrls: ['./new-joiner.component.scss'],
  standalone: true,
  imports: [OnboardingMainheaderComponent, CommonModule, IonicModule, CoreModule]
})
export class NewJoinerComponent implements OnInit {
  hiredascandidate: any = [];
  candidateList: any[] = [
    // Static fallback data for workflow testing
    {
      personalDetails: {
        FirstName: 'Rajesh',
        MiddleName: 'Kumar',
        LastName: 'Deshoju',
        email: 'rajesh.deshoju@example.com',
        PhoneNumber: '+91 9177671201',
        initials: 'RD'
      },
      jobDetailsForm: {
        JobTitle: 'Sr. Software Engineer',
        Department: 'IT Development',
        JobLocation: 'Visakhapatnam'
      },
      offerDetails: { DOJ: '2025-08-11' }
    },
    {
      personalDetails: {
        FirstName: 'Asha',
        MiddleName: '',
        LastName: 'Reddy',
        email: 'asha.reddy@example.com',
        PhoneNumber: '+91 9876543210',
        initials: 'AR'
      },
      jobDetailsForm: {
        JobTitle: 'UI/UX Designer',
        Department: 'IT Development',
        JobLocation: 'Hyderabad'
      },
      offerDetails: { DOJ: '2025-09-01' }
    }
  ];

  constructor(private hireEmployeeService: HireEmployeesService) { }

  ngOnInit() {
    this.hireEmployeeService.currentCandidate.subscribe((candidate: any) => {
      if (candidate) {
        this.hiredascandidate = candidate;
        // Only push if not already in list (avoid duplicates on re-subscription)
        const exists = this.candidateList.some(c => c.personalDetails?.email === candidate.personalDetails?.email);
        if (!exists) {
          this.candidateList.push(this.hiredascandidate);
        }
        console.log('Received candidate:', this.hiredascandidate);
      }
    });
  }

}

