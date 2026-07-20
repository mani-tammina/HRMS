import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { IonPopover } from '@ionic/angular';

@Component({
  selector: 'app-candiate-create',
  templateUrl: './candiate-create.component.html',
  styleUrls: ['./candiate-create.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CandiateCreateComponent implements OnInit {
  candidateForm!: FormGroup;
  selectedDate: string | null = null;
  departments: any[] = [];
  designations: any[] = [];
  locations: any[] = [];
  businessUnits: any[] = [];
  managers: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.candidateForm = this.fb.group({
      personalDetails: this.fb.group({
        firstName: ['', Validators.required],
        MiddleName: [''], // Optional
        lastName: ['', Validators.required],
        PhoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        alternatePhone: [''],
        dateOfBirth: [''],
        initials: ['']
      }),
      jobDetailsForm: this.fb.group({
        JobTitle: ['', Validators.required],
        Department: ['', Validators.required],
        JobLocation: ['', Validators.required],
        WorkType: ['', Validators.required],
        BussinessUnit: ['', Validators.required],
        offeredCTC: ['', Validators.required],
        joiningDate: ['', Validators.required],
        reportingManagerId: [''],
        recruiterName: [''],
        recruitmentSource: ['']
      })
    });

    // Load master data from backend APIs
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

    this.candidateService.getEmployees().subscribe({
      next: (data: any) => this.managers = (data && data.data) ? data.data : (data || []),
      error: (err: any) => console.error('Failed to load employees:', err)
    });

    const personal = this.candidateForm.get('personalDetails');

    personal?.valueChanges.subscribe((values) => {
      const first = values.FirstName?.charAt(0)?.toUpperCase() || '';
      const last = values.LastName?.charAt(0)?.toUpperCase() || '';
    });
  }

  submitForm() {
    if (this.candidateForm.valid) {
      const formData = this.candidateForm.value;
      console.log('Form Data:', formData);

      this.candidateService.createCandidate(formData).subscribe({
        next: () => {
          console.log('✅ Candidate created');
          console.log('Form Data:', formData);
          this.modalCtrl.dismiss();
          window.location.reload();
        },
        error: (err: any) => console.error('❌ Error:', err)
      });
    } else {
      this.candidateForm.markAllAsTouched();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  selectedDOB: string | null = null;

  onDOBChange(event: any, popover: IonPopover) {
    const value = event.detail.value;
    if (value) {
      const date = new Date(value);
      const formatted = date.toLocaleDateString('en-GB'); // dd/MM/yyyy
      this.candidateForm.get('personalDetails.dateOfBirth')?.setValue(formatted);
      this.selectedDOB = formatted;
    }
    popover.dismiss();
  }

  onDateChange(event: any, popover: IonPopover) {
    const value = event.detail.value;
    if (value) {
      const date = new Date(value);
      const formatted = date.toLocaleDateString('en-GB'); // dd/MM/yyyy
      this.candidateForm.get('jobDetailsForm.joiningDate')?.setValue(formatted);
      this.selectedDate = formatted;
    }
    popover.dismiss();
  }
}
