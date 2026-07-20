import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { EmailService } from 'src/app/core/services/email.service';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-offer-header',
  templateUrl: './create-offer-header.component.html',
  styleUrls: ['./create-offer-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CreateOfferHeaderComponent implements OnInit {
  @Input() candidate: any = {};
  @Output() continueClick = new EventEmitter<void>();
  @Output() createOfferClick = new EventEmitter<void>();

  activeTab = '';
  isPreviewSend = false;
  candidateId: string | null = null;
  firstName: string | null = null;
  isSending = false;

  currentRoute: string = '';

  constructor(
    private router: Router,
    private email: EmailService,
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) {
    // Track active tab by URL
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.urlAfterRedirects.split('/');
        this.activeTab = segments[segments.length - 1];
        this.isPreviewSend = this.activeTab === 'preview_send';
      });
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.candidate = nav?.extras.state?.['candidate'] || {};

    // Get id & firstName from parent route
    this.candidateId = this.route.snapshot.paramMap.get('id');
    this.firstName = this.route.snapshot.paramMap.get('FirstName');
  }

  onContinue() {
    this.continueClick.emit();
  }

  onCreateOffer() {
    this.createOfferClick.emit();
  }

  navigate(tab: string) {
    if (this.candidateId && this.firstName) {
      this.router.navigate(['/onboarding', tab, this.candidateId, this.firstName], {
        state: { candidate: this.candidate }
      });
    } else {
      console.error('Missing route params: id or firstName');
    }
  }

  // ─── Build the email HTML (matching provided template image) ──────────────
  private buildOfferEmailHtml(candidate: any, portalUrl: string): string {
    const firstName = candidate?.first_name
      || candidate?.personalDetails?.FirstName
      || 'Candidate';
    const designation = candidate?.position
      || candidate?.jobDetailsForm?.JobTitle
      || candidate?.designation
      || 'the offered role';
    const offerValidity = candidate?.offer_expiry_date
      || candidate?.offerDetails?.offerValidity
      || '';

    const validityLine = offerValidity
      ? `signing/acknowledging on or before &nbsp;<strong>${offerValidity}</strong>`
      : 'signing/acknowledging at the earliest';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offer Letter</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

    <!-- Blue header bar -->
    <div style="background:#1976D2;height:14px;"></div>

    <!-- Body -->
    <div style="padding:36px 48px 28px;">

      <p style="font-size:15px;color:#222;margin:0 0 20px;">Hello ${firstName} ,</p>

      <p style="font-size:15px;color:#D32F2F;margin:0 0 18px;line-height:1.6;">
        It was great interacting with you as part of our hiring process and we
        are excited to bring you onboard as <strong>${designation}</strong>.
      </p>

      <p style="font-size:15px;color:#333;margin:0 0 24px;line-height:1.6;">
        We are just a few formalities away from getting down to work. Please
        have a look at the offer letter attached to this mail and indicate your
        agreement with these terms and accept the offer letter by
        ${validityLine}
      </p>

      <!-- View Offer Button -->
      <div style="text-align:center;margin:28px 0;">
        <a href="${portalUrl}"
           style="display:inline-block;background:#42A5F5;color:#ffffff;
                  padding:13px 40px;border-radius:8px;text-decoration:none;
                  font-size:16px;font-weight:600;letter-spacing:0.3px;">
          View offer
        </a>
      </div>

      <p style="font-size:15px;color:#333;margin:24px 0 4px;">Regards,</p>
      <p style="font-size:15px;color:#333;margin:0 0 24px;">
        Sree Tammina Software Solutions Pvt. Ltd. Hiring Team
      </p>

      <hr style="border:none;border-top:1px solid #e0e0e0;margin:0;" />
    </div>
  </div>
</body>
</html>`;
  }

  // ─── Main handler: send offer email ──────────────────────────────────────
  onCreateOfferemail() {
    if (this.isSending) return;

    // Resolve candidate email
    const toEmail = this.candidate?.email
      || this.candidate?.personalDetails?.email
      || '';

    if (!toEmail) {
      this.toaster.showError('Candidate email address not found. Please fill in the candidate details first.');
      return;
    }

    // Build the "View Offer" URL pointing to the candidate portal login
    const origin = environment.apiURL        // e.g. http://localhost:8100
    const candidateId = this.candidateId || this.candidate?.id || '';
    const portalUrl = `${origin}/candidate-portal/login/${candidateId}`;

    const htmlBody = this.buildOfferEmailHtml(this.candidate, portalUrl);
    const firstName = this.candidate?.first_name
      || this.candidate?.personalDetails?.FirstName
      || 'Candidate';
    const subject = `Offer Letter – Welcome to Sree Tammina Software Solutions, ${firstName}!`;

    this.isSending = true;

    this.email.sendOfferEmail(toEmail, subject, htmlBody).subscribe({
      next: (res: any) => {
        this.isSending = false;
        if (res?.success) {
          this.toaster.showSuccess('Offer email sent successfully to ' + toEmail);
          this.createOfferClick.emit();
        } else {
          this.toaster.showError('Failed to send offer email. Please try again.');
        }
      },
      error: (err: any) => {
        this.isSending = false;
        console.error('Email send error:', err);
        this.toaster.showError('Error sending email: ' + (err?.error?.message || err?.message || 'Unknown error'));
      }
    });
  }
}
