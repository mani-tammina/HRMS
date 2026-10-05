import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

/**
 * Reusable offer letter viewer.
 * Used in both PreviewSendComponent (HR side) and CandiatePortalComponent (Candidate side).
 *
 * Renders the same previewText that PreviewSendComponent.updatePreview() builds,
 * but in a polished A4-style letter layout.
 */
@Component({
  selector: 'app-offer-letter-view',
  templateUrl: './offer-letter-view.component.html',
  styleUrls: ['./offer-letter-view.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class OfferLetterViewComponent implements OnChanges {
  @Input() candidate: any = {};
  /** Show the template selector controls (HR side only) */
  @Input() showControls = false;

  selectedTemplate = 'SVS';
  previewText = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['candidate']) {
      this.updatePreview();
    }
  }

  updatePreview() {
    const firstName = this.candidate?.personalDetails?.FirstName
                   || this.candidate?.first_name
                   || 'Candidate';
    const designation = this.candidate?.jobDetailsForm?.JobTitle
                     || this.candidate?.position
                     || 'the offered role';
    const ctc         = this.candidate?.jobDetailsForm?.offeredCTC || '';
    const doj         = this.candidate?.offerDetails?.JoiningDate
                     || this.candidate?.offerDetails?.DOJ
                     || '';
    const validity    = this.candidate?.offerDetails?.offerValidity || '';
    const department  = this.candidate?.jobDetailsForm?.Department || '';
    const location    = this.candidate?.jobDetailsForm?.JobLocation || '';

    if (this.selectedTemplate === 'SVS') {
      this.previewText = `
        <p>Dear <strong>${firstName}</strong>,</p>
        <br>
        <p>Welcome to <b>Tech Tammina Family</b>!! 🎉</p>
        <br>
        <p>It was a pleasure interacting with you during our hiring process and
        we believe you would make a great asset to <b>Sree Tammina Software Solutions Pvt. Ltd.</b></p>
        <br>
        <p>We are pleased to offer you the position of <b>${designation}</b>
        ${department ? `in the <b>${department}</b> department` : ''}
        ${location ? `at <b>${location}</b>` : ''}.
        ${ctc ? `<br>Your annual cost to company (CTC) will be <b>₹${ctc}</b>.` : ''}
        ${doj ? `<br>Your date of joining is scheduled to be <b>${doj}</b>.` : ''}
        ${validity ? `<br><br>Kindly accept this offer by <b>${validity}</b>.` : ''}
        </p>
        <br>
        <p>This offer is subject to the verification of your educational qualifications,
        past employment, and reference checks. Please bring all relevant original documents
        on your date of joining.</p>
        <br>
        <p>We look forward to welcoming you to our team!</p>
        <br>
        <p>Warm regards,<br>
        <b>HR Team</b><br>
        Sree Tammina Software Solutions Pvt. Ltd.</p>
      `;
    } else {
      this.previewText = `
        <p>Dear <strong>${firstName}</strong>,</p>
        <br>
        <p>Welcome to <b>Tech Tammina Family</b>!! 🎉</p>
        <br>
        <p>We are excited to have you onboard as <b>${designation}</b> and look forward
        to seeing the best of your capabilities.
        ${ctc ? `<br>Your annual CTC will be <b>₹${ctc}</b>.` : ''}
        ${doj ? `<br>Your joining date is <b>${doj}</b>.` : ''}
        ${validity ? `<br>Kindly accept this offer by <b>${validity}</b>.` : ''}
        </p>
        <br>
        <p>Regards,<br>
        <b>HR Team</b><br>
        Sree Tammina Software Solutions Pvt. Ltd.</p>
      `;
    }
  }

  onTemplateChange(event: any) {
    this.selectedTemplate = event.detail.value;
    this.updatePreview();
  }
}
