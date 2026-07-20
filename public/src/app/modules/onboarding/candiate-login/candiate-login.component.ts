import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-candiate-login',
  templateUrl: './candiate-login.component.html',
  styleUrls: ['./candiate-login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class CandiateLoginComponent implements OnInit {
  loginForm!: FormGroup;
  candidateId: string | null = null;
  candidateData: any = null;
  isLoading = true;
  isVerifying = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.candidateId = this.route.snapshot.paramMap.get('id');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.candidateId) {
      this.candidateService.getCandidateByIdPublic(Number(this.candidateId)).subscribe({
        next: (data: any) => {
          this.candidateData = data?.candidate || data;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Failed to load candidate information:', err);
          this.errorMessage = 'Unable to verify invitation link. Please check the URL or contact HR.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Invalid link. Please use the link provided in the invitation email.';
      this.isLoading = false;
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const inputEmail = this.loginForm.value.email.trim().toLowerCase();
    const actualEmail = (this.candidateData?.email || this.candidateData?.personalDetails?.email || '').trim().toLowerCase();

    if (!actualEmail) {
      this.toaster.showError('Unable to retrieve candidate email for verification. Please contact HR.');
      return;
    }

    this.isVerifying = true;

    // Simulate verification delay for better UX
    setTimeout(() => {
      this.isVerifying = false;
      if (inputEmail === actualEmail) {
        sessionStorage.setItem('candidate_verified_' + this.candidateId, 'true');
        this.toaster.showSuccess('Verification successful! Accessing portal...');
        this.router.navigate(['/candidate-portal', this.candidateId]);
      } else {
        this.toaster.showError('Verification failed. Please enter the email address where you received the offer.');
      }
    }, 800);
  }
}
