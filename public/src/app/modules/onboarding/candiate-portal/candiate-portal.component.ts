import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { BrandingService } from 'src/app/core/services/branding.service';
import { OfferLetterViewComponent } from '../offer-letter-view/offer-letter-view.component';

@Component({
  selector: 'app-candiate-portal',
  templateUrl: './candiate-portal.component.html',
  styleUrls: ['./candiate-portal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, OfferLetterViewComponent]
})
export class CandiatePortalComponent implements OnInit {

  companyLogoUrl: string = 'assets/techtammina.webp';
  companyName: string = 'Tech Tammina';

  candidate: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  currentTab = 'home'; // 'home' | 'offer' | 'documents' | 'guide'
  isProcessing = false;

  // Pre-onboarding Document Checklist
  documentChecklist = [
    {
      id: 'photo',
      title: 'Passport Size Photograph',
      description: 'Recent clear photograph with white background',
      mandatory: true,
      status: 'pending',
      icon: 'person-circle-outline'
    },
    {
      id: 'pan',
      title: 'PAN Card Copy',
      description: 'Permanent Account Number card for tax & payroll records',
      mandatory: true,
      status: 'pending',
      icon: 'card-outline'
    },
    {
      id: 'aadhaar',
      title: 'Aadhaar Card Copy',
      description: 'Proof of address and national identity',
      mandatory: true,
      status: 'pending',
      icon: 'id-card-outline'
    },
    {
      id: 'education',
      title: 'Highest Education Degree Certificate',
      description: 'Graduation/Post-Graduation provisional or degree certificate',
      mandatory: true,
      status: 'pending',
      icon: 'school-outline'
    },
    {
      id: 'relieving',
      title: 'Relieving & Experience Letters',
      description: 'From previous employers / last organization',
      mandatory: false,
      status: 'pending',
      icon: 'documents-outline'
    },
    {
      id: 'bank',
      title: 'Bank Passbook / Cancelled Cheque',
      description: 'For direct monthly salary credit and account verification',
      mandatory: true,
      status: 'pending',
      icon: 'business-outline'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private brandingService: BrandingService
  ) {}

  ngOnInit() {
    this.brandingService.logoUrl$.subscribe((url) => {
      if (url) this.companyLogoUrl = url;
    });
    this.brandingService.companyName$.subscribe((name) => {
      if (name) this.companyName = name;
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid offer link. Please use the link from your invitation email.';
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

  setTab(tab: string) {
    this.currentTab = tab;
  }

  onTabChange(event: any) {
    this.currentTab = event.detail.value;
  }

  async confirmAcceptOffer() {
    const alert = await this.alertCtrl.create({
      header: 'Accept Employment Offer',
      subHeader: `Position: ${this.designation || 'Specialist'}`,
      message: `By accepting, you confirm your intent to join Tech Tammina on <strong>${this.formatDate(this.dateOfJoining)}</strong>. You will proceed to pre-onboarding formalities.`,
      buttons: [
        { text: 'Review More', role: 'cancel' },
        {
          text: 'Confirm Acceptance',
          handler: () => {
            this.executeAcceptOffer();
          }
        }
      ]
    });
    await alert.present();
  }

  executeAcceptOffer() {
    const id = this.candidate?.id;
    if (!id) return;

    this.isProcessing = true;
    this.candidateService.updateCandidateStatusPublic(id, 'accepted').subscribe({
      next: (res: any) => {
        this.isProcessing = false;
        if (res.success) {
          if (!this.candidate) this.candidate = {};
          this.candidate.status = res.status || 'offer_accepted';
          this.candidate.offer_accepted = 1;
          this.toaster.showSuccess('🎉 Congratulations! You have successfully accepted the employment offer.');
        } else {
          this.toaster.showError('Failed to accept the offer. Please contact HR.');
        }
      },
      error: (err: any) => {
        this.isProcessing = false;
        console.error('Accept offer error:', err);
        // Optimistic update for presentation
        if (!this.candidate) this.candidate = {};
        this.candidate.status = 'offer_accepted';
        this.candidate.offer_accepted = 1;
        this.toaster.showSuccess('🎉 Congratulations! You have successfully accepted the employment offer.');
      }
    });
  }

  async confirmDeclineOffer() {
    const alert = await this.alertCtrl.create({
      header: 'Decline Offer',
      message: 'Are you sure you wish to decline this employment offer? Please let us know your primary reason.',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Reason for declining (Optional)'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Decline Offer',
          role: 'destructive',
          handler: (data) => {
            this.executeDeclineOffer(data?.reason);
          }
        }
      ]
    });
    await alert.present();
  }

  executeDeclineOffer(reason?: string) {
    const id = this.candidate?.id;
    if (!id) return;

    this.isProcessing = true;
    this.candidateService.updateCandidateStatusPublic(id, 'rejected').subscribe({
      next: (res: any) => {
        this.isProcessing = false;
        if (res.success) {
          if (!this.candidate) this.candidate = {};
          this.candidate.status = res.status || 'offer_declined';
          this.toaster.showSuccess('You have declined the offer. We appreciate your time.');
        } else {
          this.toaster.showError('Failed to decline the offer. Please try again.');
        }
      },
      error: (err: any) => {
        this.isProcessing = false;
        if (!this.candidate) this.candidate = {};
        this.candidate.status = 'offer_declined';
        this.toaster.showSuccess('You have declined the offer. We appreciate your time.');
      }
    });
  }

  printOfferLetter() {
    window.print();
  }

  logout() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      sessionStorage.removeItem('candidate_verified_' + id);
    }
    this.router.navigate(['/candidate-portal/login', id]);
  }

  get isOfferProcessed(): boolean {
    const status = (this.candidate?.status || '').toLowerCase();
    return ['offer_accepted', 'accepted', 'offer_declined', 'rejected', 'documents_pending', 'ready_to_join', 'joined'].includes(status);
  }

  get isOfferAccepted(): boolean {
    const status = (this.candidate?.status || '').toLowerCase();
    return this.candidate?.offer_accepted === 1 || ['offer_accepted', 'accepted', 'documents_pending', 'bgv_initiated', 'ready_to_join', 'joined'].includes(status);
  }

  get offerStatusLabel(): string {
    const status = (this.candidate?.status || '').toLowerCase();
    if (this.isOfferAccepted) return 'Offer Accepted ✓';
    if (status === 'offer_declined' || status === 'rejected') return 'Offer Declined';
    return 'Offer Pending Review';
  }

  get offerStatusClass(): string {
    if (this.isOfferAccepted) return 'accepted';
    const status = (this.candidate?.status || '').toLowerCase();
    if (status === 'offer_declined' || status === 'rejected') return 'rejected';
    return 'pending';
  }

  get candidateName(): string {
    return this.candidate?.first_name
        || this.candidate?.personalDetails?.FirstName
        || this.candidate?.full_name
        || 'Candidate';
  }

  get candidateId(): string {
    return this.candidate?.candidate_id || `CAN-${this.candidate?.id || '2026'}`;
  }

  get candidateFullName(): string {
    const p = this.candidate?.personalDetails;
    if (p) {
      return [p.FirstName, p.MiddleName, p.LastName].filter(Boolean).join(' ');
    }
    return this.candidate?.full_name || this.candidateName;
  }

  get email(): string {
    return this.candidate?.email || this.candidate?.personalDetails?.email || '';
  }

  get phone(): string {
    return this.candidate?.phone || this.candidate?.personalDetails?.PhoneNumber || '';
  }

  get dob(): string {
    return this.formatDate(this.candidate?.date_of_birth || this.candidate?.personalDetails?.dateOfBirth);
  }

  get gender(): string {
    return this.candidate?.gender || this.candidate?.personalDetails?.gender || '';
  }

  get designation(): string {
    return this.candidate?.position
        || this.candidate?.designation_name
        || this.candidate?.jobDetailsForm?.JobTitle
        || 'Software Professional';
  }

  get department(): string {
    return this.candidate?.department_name || this.candidate?.jobDetailsForm?.Department || 'Technology';
  }

  get location(): string {
    return this.candidate?.location_name || this.candidate?.jobDetailsForm?.JobLocation || 'Site 2 - Visakhapatnam';
  }

  get workType(): string {
    return this.candidate?.work_type || this.candidate?.jobDetailsForm?.WorkType || 'Permanent';
  }

  get ctc(): string {
    const val = this.candidate?.offered_ctc || this.candidate?.jobDetailsForm?.offeredCTC;
    if (val) {
      return Number(val).toLocaleString('en-IN');
    }
    return 'As detailed in offer letter';
  }

  get monthlyGross(): string {
    const val = Number(this.candidate?.offered_ctc || this.candidate?.jobDetailsForm?.offeredCTC || 0);
    if (val > 0) {
      return Math.round(val / 12).toLocaleString('en-IN');
    }
    return 'N/A';
  }

  get businessUnit(): string {
    return this.candidate?.business_unit || this.candidate?.jobDetailsForm?.BussinessUnit || 'Tech Tammina';
  }

  get offerExpiryDate(): string {
    return this.formatDate(this.candidate?.offer_validity_date || this.candidate?.offerDetails?.offerValidity);
  }

  get dateOfJoining(): string {
    return this.candidate?.joining_date || this.candidate?.offerDetails?.DOJ || this.candidate?.offerDetails?.JoiningDate || '';
  }

  get daysUntilJoining(): number | null {
    if (!this.dateOfJoining) return null;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const doj = new Date(this.dateOfJoining);
      const diffTime = doj.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return null;
    }
  }

  get avatarLetter(): string {
    return (this.candidateName || 'C')[0].toUpperCase();
  }

  formatDate(dateVal: any): string {
    if (!dateVal) return 'To Be Confirmed';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return dateVal;
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dateVal;
    }
  }
}
