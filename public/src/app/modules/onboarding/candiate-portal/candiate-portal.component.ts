import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { OfferLetterViewComponent } from '../offer-letter-view/offer-letter-view.component';

@Component({
  selector: 'app-candiate-portal',
  templateUrl: './candiate-portal.component.html',
  styleUrls: ['./candiate-portal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, OfferLetterViewComponent]
})
export class CandiatePortalComponent implements OnInit {

  candidate: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  currentTab = 'home';
  isProcessing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid offer link. Please use the link from your email.';
      this.isLoading = false;
      return;
    }

    // Verify if candidate has verified their email address
    const isVerified = sessionStorage.getItem('candidate_verified_' + id) === 'true';
    if (!isVerified) {
      this.router.navigate(['/candidate-portal/login', id]);
      return;
    }

    this.candidateService.getCandidateByIdPublic(Number(id)).subscribe({
      next: (data: any) => {
        this.candidate = data?.candidate || data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load candidate:', err);
        this.errorMessage = 'Unable to load your offer details. Please contact HR.';
        this.isLoading = false;
      }
    });
  }

  onTabChange(event: any) {
    this.currentTab = event.detail.value;
  }

  acceptOffer() {
    const id = this.candidate?.id;
    if (!id) return;

    this.isProcessing = true;
    this.candidateService.updateCandidateStatusPublic(id, 'accepted').subscribe({
      next: (res: any) => {
        this.isProcessing = false;
        if (res.success) {
          if (!this.candidate) this.candidate = {};
          // Use DB ENUM value returned from API
          this.candidate.status = res.status || 'offer_accepted';
          this.toaster.showSuccess('Congratulations! You have successfully accepted the offer.');
        } else {
          this.toaster.showError('Failed to accept the offer. Please try again or contact HR.');
        }
      },
      error: (err: any) => {
        this.isProcessing = false;
        console.error('Accept offer error:', err);
        this.toaster.showError('Error accepting offer. Please check your network and try again.');
      }
    });
  }

  declineOffer() {
    const id = this.candidate?.id;
    if (!id) return;

    this.isProcessing = true;
    this.candidateService.updateCandidateStatusPublic(id, 'rejected').subscribe({
      next: (res: any) => {
        this.isProcessing = false;
        if (res.success) {
          if (!this.candidate) this.candidate = {};
          // Use DB ENUM value returned from API
          this.candidate.status = res.status || 'offer_declined';
          this.toaster.showSuccess('You have declined the offer. We appreciate your time.');
        } else {
          this.toaster.showError('Failed to decline the offer. Please try again.');
        }
      },
      error: (err: any) => {
        this.isProcessing = false;
        console.error('Decline offer error:', err);
        this.toaster.showError('Error declining offer. Please try again.');
      }
    });
  }

  get isOfferProcessed(): boolean {
    const status = (this.candidate?.status || '').toLowerCase();
    // DB ENUM values: 'offer_accepted', 'offer_declined'
    return ['offer_accepted', 'offer_declined'].includes(status);
  }

  get offerStatusLabel(): string {
    const status = (this.candidate?.status || '').toLowerCase();
    if (status === 'offer_accepted') return 'Offer Accepted ✓';
    if (status === 'offer_declined') return 'Offer Declined';
    return 'Offer Pending';
  }

  get offerStatusClass(): string {
    const status = (this.candidate?.status || '').toLowerCase();
    if (status === 'offer_accepted') return 'accepted';
    if (status === 'offer_declined') return 'rejected';
    return '';
  }

  /** Returns candidate first name for display */
  get candidateName(): string {
    return this.candidate?.first_name
        || this.candidate?.personalDetails?.FirstName
        || this.candidate?.full_name
        || 'Candidate';
  }

  get candidateId(): string {
    return this.candidate?.candidate_id || '';
  }

  get candidateFullName(): string {
    const p = this.candidate?.personalDetails;
    if (!p) return '';
    return [p.FirstName, p.MiddleName, p.LastName].filter(Boolean).join(' ');
  }

  get email(): string {
    return this.candidate?.personalDetails?.email || '';
  }

  get phone(): string {
    return this.candidate?.personalDetails?.PhoneNumber || '';
  }

  get dob(): string {
    return this.candidate?.personalDetails?.dateOfBirth || '';
  }

  get gender(): string {
    return this.candidate?.personalDetails?.gender || '';
  }

  get designation(): string {
    return this.candidate?.position
        || this.candidate?.designation
        || this.candidate?.jobDetailsForm?.JobTitle
        || '';
  }

  get department(): string {
    return this.candidate?.jobDetailsForm?.Department || '';
  }

  get location(): string {
    return this.candidate?.jobDetailsForm?.JobLocation || '';
  }

  get workType(): string {
    return this.candidate?.jobDetailsForm?.WorkType || '';
  }

  get ctc(): string {
    return this.candidate?.jobDetailsForm?.offeredCTC || '';
  }

  get businessUnit(): string {
    return this.candidate?.jobDetailsForm?.BussinessUnit || '';
  }

  get recruiterName(): string {
    return this.candidate?.jobDetailsForm?.recruiterName || '';
  }

  get recruitmentSource(): string {
    return this.candidate?.jobDetailsForm?.recruitmentSource || '';
  }

  /** Returns formatted offer expiry date */
  get offerExpiryDate(): string {
    return this.candidate?.offer_expiry_date
        || this.candidate?.offerDetails?.offerValidity
        || '';
  }

  /** Returns date of joining */
  get dateOfJoining(): string {
    return this.candidate?.date_of_joining
        || this.candidate?.offerDetails?.dateOfJoining
        || '';
  }

  /** First letter of name for avatar */
  get avatarLetter(): string {
    return (this.candidateName || 'C')[0].toUpperCase();
  }

  get currentFormattedDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
