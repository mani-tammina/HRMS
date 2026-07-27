import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, IonPopover } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { CreateOfferHeaderComponent } from '../create-offer-header/create-offer-header.component';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    CoreModule,
    CreateOfferHeaderComponent
  ]
})
export class CreateOfferComponent implements OnInit {
  @Input() candidate: any = null;
  offerForm!: FormGroup;
  selectedDate: string = '';
  departments: any[] = [];
  designations: any[] = [];
  locations: any[] = [];
  businessUnits: any[] = [];
  managers: any[] = [];
  filteredManagers: any[] = [];
  selectedManagerName: string = '';
  showManagerSuggestions: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private candidateService: CandidateService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.candidate = nav?.extras.state?.['candidate'] || null;
    console.log('Candidate from navigation state:', this.candidate);
  }

  ngOnInit() {
    // Initialize form controls
    this.offerForm = this.fb.group({
      DOJ: [''],
      offerValidity: [''],
      reportingManagerId: [''],
      BussinessUnit: ['', Validators.required],
      JobTitle: ['', Validators.required],
      Department: ['', Validators.required],
      JobLocation: ['', Validators.required],
      WorkType: ['', Validators.required]
    });

    // Fetch master lists from backend APIs
    this.candidateService.getLocations().subscribe({
      next: (data: any) => this.locations = data || [],
      error: (err: any) => console.error('Failed to load locations:', err)
    });

    this.candidateService.getDepartments().subscribe({
      next: (data: any) => this.departments = data || [],
      error: (err: any) => console.error('Failed to load departments:', err)
    });

    this.candidateService.getDesignations().subscribe({
      next: (data: any) => this.designations = data || [],
      error: (err: any) => console.error('Failed to load designations:', err)
    });

    this.candidateService.getBusinessUnits().subscribe({
      next: (data: any) => this.businessUnits = data || [],
      error: (err: any) => console.error('Failed to load business units:', err)
    });

    this.candidateService.getEmployees(2000, '').subscribe({
      next: (data: any) => {
        const list = (data && data.data) ? data.data : (data || []);
        this.managers = list;
        this.filteredManagers = list;

        // Pre-fill selectedManagerName now that managers list is loaded
        if (this.candidate && this.candidate.jobDetailsForm && this.candidate.jobDetailsForm.reportingManagerId) {
          const managerId = this.candidate.jobDetailsForm.reportingManagerId;
          const found = this.managers.find(m => m.id === Number(managerId));
          if (found) {
            this.selectedManagerName = `${found.FirstName} ${found.LastName}`;
          }
        }
      },
      error: (err: any) => console.error('Failed to load employees:', err)
    });

    // Load candidate details if route parameter id is present
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.candidateService.getCandidateById(Number(id)).subscribe({
        next: (data: any) => {
          // The API response is { candidate, documents, tasks, completion_percentage }
          this.candidate = data.candidate || data;
          this.patchFormValues();
        },
        error: (err: any) => {
          console.error('Failed to fetch candidate details:', err);
          if (this.candidate) {
            this.patchFormValues();
          }
        }
      });
    } else if (this.candidate) {
      this.patchFormValues();
    }
  }

  private patchFormValues() {
    if (!this.candidate) return;

    if (!this.candidate.offerDetails) {
      this.candidate.offerDetails = { DOJ: '', offerValidity: '' };
    }
    if (!this.candidate.jobDetailsForm) {
      this.candidate.jobDetailsForm = { JobTitle: '', Department: '', JobLocation: '', WorkType: '', BussinessUnit: '' };
    }

    this.offerForm.patchValue({
      DOJ: this.candidate.offerDetails.DOJ || '',
      offerValidity: this.candidate.offerDetails.offerValidity || '',
      reportingManagerId: this.candidate.jobDetailsForm.reportingManagerId || '',
      BussinessUnit: this.candidate.jobDetailsForm.BussinessUnit || '',
      JobTitle: this.candidate.jobDetailsForm.JobTitle || '',
      Department: this.candidate.jobDetailsForm.Department || '',
      JobLocation: this.candidate.jobDetailsForm.JobLocation || '',
      WorkType: this.candidate.jobDetailsForm.WorkType || ''
    });

    this.selectedDate = this.candidate.offerDetails.DOJ || '';
  }

  onDateChange(event: any, popover: IonPopover) {
    const value = event.detail.value;
    if (value) {
      const date = new Date(value);
      const formatted = date.toLocaleDateString('en-GB');
      this.selectedDate = formatted;
      this.candidate.offerDetails.DOJ = formatted;
      this.offerForm.patchValue({ DOJ: formatted });
    }
    popover.dismiss();
  }

  onManagerSearch(event: any) {
    const val = event.target.value?.toLowerCase() || '';
    if (!val) {
      this.filteredManagers = [];
      this.showManagerSuggestions = false;
      this.offerForm.patchValue({ reportingManagerId: '' });
      this.selectedManagerName = '';
    } else {
      this.showManagerSuggestions = true;
      this.filteredManagers = this.managers.filter(m => 
        m.FirstName?.toLowerCase().includes(val) || 
        m.LastName?.toLowerCase().includes(val) ||
        (m.FirstName + ' ' + m.LastName).toLowerCase().includes(val)
      );
    }
  }

  selectManager(manager: any) {
    this.selectedManagerName = `${manager.FirstName} ${manager.LastName}`;
    this.offerForm.patchValue({ reportingManagerId: manager.id });
    this.showManagerSuggestions = false;
  }

  submitOfferForm() {
    if (this.offerForm.valid) {

      // Helper to parse DD/MM/YYYY → YYYY-MM-DD
      const formatDate = (dateStr: string | undefined): string | null => {
        if (!dateStr) return null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      // Update candidate offerDetails and jobDetailsForm from form
      if (!this.candidate.offerDetails) this.candidate.offerDetails = {};
      this.candidate.offerDetails.DOJ = this.offerForm.value.DOJ || '';
      this.candidate.offerDetails.offerValidity = this.offerForm.value.offerValidity || '';

      if (!this.candidate.jobDetailsForm) this.candidate.jobDetailsForm = {};
      this.candidate.jobDetailsForm.BussinessUnit = this.offerForm.value.BussinessUnit;
      this.candidate.jobDetailsForm.JobTitle = this.offerForm.value.JobTitle;
      this.candidate.jobDetailsForm.Department = this.offerForm.value.Department;
      this.candidate.jobDetailsForm.JobLocation = this.offerForm.value.JobLocation;
      this.candidate.jobDetailsForm.WorkType = this.offerForm.value.WorkType;
      this.candidate.jobDetailsForm.reportingManagerId = this.offerForm.value.reportingManagerId || null;

      // Optional: if you have JoiningDate field in form, format it
      if (this.candidate.offerDetails.JoiningDate) {
        this.candidate.offerDetails.JoiningDate = formatDate(this.candidate.offerDetails.JoiningDate) || undefined;
      }

      // Format DOJ for service if it exists
      if (this.candidate.offerDetails.DOJ) {
        this.candidate.offerDetails.DOJ = formatDate(this.candidate.offerDetails.DOJ) || '';
      }

      const service = this.candidateService as any;
      const updateCall = (service && typeof service.updateCandidate === 'function')
        ? service.updateCandidate(this.candidate.id, this.candidate) // matches service method signature: updateCandidate(id: number, data: any)
        : service.updateCandidate(this.candidate);

      updateCall.subscribe({
        next: (res: any) => {
          console.log('Candidate updated on server:', res);
          alert('Job details saved successfully!');
          this.router.navigate(
            ['/onboarding/salaryStaructure', this.candidate.id, encodeURIComponent(this.candidate.personalDetails.FirstName)],
            { state: { candidate: this.candidate } }
          );
        },
        error: (err: any) => {
          console.error('Error updating candidate:', err);
          alert('Failed to save job details.');
        }
      });
    } else {
      alert('Please fill in all required job details!');
    }
  }

}
