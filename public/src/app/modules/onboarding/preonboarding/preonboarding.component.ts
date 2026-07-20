import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { OnboardingMainheaderComponent } from '../onboarding-mainheader/onboarding-mainheader.component';
import { CoreModule } from 'src/app/core/core.module';
import { Router } from '@angular/router';
import { CandiateCreateComponent } from '../candiate-create/candiate-create.component';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StartOnboardingComponent } from '../start-onboarding/start-onboarding.component';
import { HireEmployeesService } from 'src/app/core/services/hire-employees.service';

@Component({
  selector: 'app-preonboarding',
  templateUrl: './preonboarding.component.html',
  styleUrls: ['./preonboarding.component.scss'],
  standalone: true,
  imports: [
    OnboardingMainheaderComponent,
    CommonModule,
    IonicModule,
    CoreModule
  ]
})
export class PreonboardingComponent implements OnInit {

  // 👇 All candidates loaded from service
  candidates: any[] = [];
  hiddenCandidates: number[] = [];
  @Input() currentStage: number = 1;

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private candidateService: CandidateService,
    private hireEmployeeService: HireEmployeesService
  ) { }

  // Static fallback candidates for workflow testing
  private staticCandidates = [
    {
      id: 1,
      status: 'accepted',
      personalDetails: {
        FirstName: 'Rajesh Deshoju',
        LastName: 'Deshoju',
        email: 'rajesh.deshoju@example.com',
        PhoneNumber: '+91 9177671201',
        gender: 'male',
        initials: 'RD'
      },
      jobDetailsForm: {
        JobTitle: 'Sr. Software Engineer',
        Department: 'IT Development',
        JobLocation: 'Site 2 - Visakhapatnam - Day Shift',
        WorkType: 'Perminent',
        BussinessUnit: 'Tech Tammina Visakhapatnam'
      },
      offerDetails: { DOJ: '2025-08-11', offerValidity: '7', JoiningDate: '2025-08-11' }
    },
    {
      id: 2,
      status: 'pending',
      personalDetails: {
        FirstName: 'Sri Naga Sahithi',
        LastName: 'Chenna',
        email: 'sahithi@example.com',
        PhoneNumber: '+91 9392921373',
        gender: 'female',
        initials: 'SS'
      },
      jobDetailsForm: {
        JobTitle: 'Software Trainee',
        Department: 'IT Development',
        JobLocation: 'Site 1 - Hyderabad - Night Shift',
        WorkType: 'Perminent',
        BussinessUnit: 'Sri Tech Tammina Visakhapatnam'
      },
      offerDetails: { DOJ: '2025-08-04', offerValidity: '2', JoiningDate: '2025-08-04' }
    },
    {
      id: 3,
      status: 'accepted',
      personalDetails: {
        FirstName: 'Surya Satya Durga',
        LastName: 'Prasad',
        email: 'surya.satya@example.com',
        PhoneNumber: '+91 8885625367',
        gender: 'male',
        initials: 'SP'
      },
      jobDetailsForm: {
        JobTitle: 'SEO Analyst',
        Department: 'Marketing',
        JobLocation: 'Site 3 - Visakhapatnam - Day Shift',
        WorkType: 'Perminent',
        BussinessUnit: 'Tech Tammina Visakhapatnam'
      },
      offerDetails: { DOJ: '2025-07-28', offerValidity: '7', JoiningDate: '2025-07-28' }
    },
    {
      id: 4,
      status: 'pending',
      personalDetails: {
        FirstName: 'Asha Reddy',
        LastName: 'Reddy',
        email: 'asha.reddy@example.com',
        PhoneNumber: '+91 9876543210',
        gender: 'female',
        initials: 'AR'
      },
      jobDetailsForm: {
        JobTitle: 'UI/UX Designer',
        Department: 'IT Development',
        JobLocation: 'Site 2 - Visakhapatnam - Day Shift',
        WorkType: 'Perminent',
        BussinessUnit: 'Tech Tammina Visakhapatnam'
      },
      offerDetails: { DOJ: '2025-09-01', offerValidity: '7', JoiningDate: '2025-09-01' }
    }
  ];

  ngOnInit() {
    // Subscribe to candidates from service
    const service = this.candidateService as any;
    if (service && service.candidates$) {
      service.candidates$.subscribe({
        next: (data: any) => {
          this.candidates = (data && data.length > 0) ? data : this.staticCandidates;
          console.log('Candidates loaded from candidates$:', this.candidates.length);
        },
        error: (err: any) => {
          console.error(err);
          this.candidates = this.staticCandidates;
        }
      });
    } else if (service && typeof service.getAllCandidates === 'function') {
      service.getAllCandidates().subscribe({
        next: (data: any) => {
          this.candidates = (data && data.length > 0) ? data : this.staticCandidates;
          console.log('Candidates loaded from getAllCandidates:', this.candidates.length);
        },
        error: (err: any) => {
          console.error(err);
          this.candidates = this.staticCandidates;
        }
      });
    } else {
      this.candidates = this.staticCandidates;
    }
    this.hiddenCandidates = JSON.parse(sessionStorage.getItem('hiddenCandidates') || '[]');
  }

  // Navigate to candidate create (non-modal)
  addCandidate() {
    this.router.navigate(['/CandiateCreate']);
  }

  // Start Pre-Onboarding for a selected candidate
  async startpreonboarding(candidate: any) {
    const modal = await this.modalCtrl.create({
      component: StartOnboardingComponent,
      componentProps: {
        candidate: candidate,        // ✅ selected candidate’s ID
      }
    });

    await modal.present();
  }

  // Open form in modal
  async openCandidateForm() {
    const modal = await this.modalCtrl.create({
      component: CandiateCreateComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      console.log('Form Submitted Data:', data);
      // ✅ add candidate to array if needed
      // this.candidates.push(data);
    }
  }

  employee(candidate: any) {
    const settingData = {
      "id": candidate.id,
      "firstName": candidate.personalDetails.FirstName,
      "lastName": candidate.personalDetails.LastName,
      "email": candidate.personalDetails.email,
      "MiddleName": candidate.personalDetails.gender,
      "PhoneNumber": candidate.personalDetails.PhoneNumber,
      "gender": candidate.personalDetails.gender,
      "initials": candidate.personalDetails.initials,
      "JobTitle": candidate.jobDetailsForm.JobTitle,
      "Department": candidate.jobDetailsForm.Department,
      "JobLocation": candidate.jobDetailsForm.JobLocation,
      "WorkType": candidate.jobDetailsForm.WorkType,
      "BusinessUnit": candidate.jobDetailsForm.BussinessUnit
    };
    const service = this.candidateService as any;
    if (service && typeof service.createEmployee === 'function') {
      service.createEmployee(settingData).subscribe();
    } else {
      console.log('Mock: createEmployee', settingData);
    }
  }
  Rejectedemployee(candidate: any) {
    const settingData = {
      "id": candidate.id,
      "firstName": candidate.personalDetails.FirstName,
      "lastName": candidate.personalDetails.LastName,
      "email": candidate.personalDetails.email,
      "MiddleName": candidate.personalDetails.gender,
      "PhoneNumber": candidate.personalDetails.PhoneNumber,
      "gender": candidate.personalDetails.gender,
      "initials": candidate.personalDetails.initials,
      "JobTitle": candidate.jobDetailsForm.JobTitle,
      "Department": candidate.jobDetailsForm.Department,
      "JobLocation": candidate.jobDetailsForm.JobLocation,
      "WorkType": candidate.jobDetailsForm.WorkType,
      "BusinessUnit": candidate.jobDetailsForm.BussinessUnit
    };
    const service = this.candidateService as any;
    if (service && typeof service.createRejectedEmployee === 'function') {
      service.createRejectedEmployee(settingData).subscribe();
    } else {
      console.log('Mock: createRejectedEmployee', settingData);
    }
  }
  employeehire(candidate: any) {
    this.hireEmployeeService.setCandidate(candidate);
    this.candidates = this.candidates.filter(c => c.id !== candidate.id);
  }
}


