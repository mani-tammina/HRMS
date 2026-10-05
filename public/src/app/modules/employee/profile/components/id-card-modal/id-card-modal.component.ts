import { Component, Input, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { environment } from '../../../../../../environments/environment';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-id-card-modal',
  templateUrl: './id-card-modal.component.html',
  styleUrls: ['./id-card-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class IdCardModalComponent implements OnInit {
  @Input() currentEmployee: any;
  @ViewChild('idCardFrontRef', { static: false }) idCardFrontRef!: ElementRef;
  @ViewChild('idCardBackRef', { static: false }) idCardBackRef!: ElementRef;

  env: string = '';
  isDownloading = false;
  isFlipped = false;

  get hasProfileImage(): boolean {
    return !!this.currentEmployee?.profile_image;
  }

  get profileImageUrl(): string {
    if (this.currentEmployee?.profile_image) {
      return this.env + this.currentEmployee.profile_image;
    }
    return '';
  }

  get resAddressLine1(): string {
    return this.currentEmployee?.current_address_line1 ||
           this.currentEmployee?.permanent_address_line1 ||
           '';
  }

  get resAddressLine2(): string {
    return this.currentEmployee?.current_address_line2 ||
           this.currentEmployee?.permanent_address_line2 ||
           '';
  }

  get resCity(): string {
    return this.currentEmployee?.current_city ||
           this.currentEmployee?.permanent_city ||
           '';
  }

  get resStateZip(): string {
    const state = this.currentEmployee?.current_state || this.currentEmployee?.permanent_state || '';
    const country = this.currentEmployee?.current_country || this.currentEmployee?.permanent_country || '';
    const zip = this.currentEmployee?.current_zip || this.currentEmployee?.permanent_zip || '';

    const parts = [state, country, zip].filter(Boolean);
    return parts.join(' ');
  }

  get hasAnyAddress(): boolean {
    return !!(this.resAddressLine1 || this.resAddressLine2 || this.resCity || this.resStateZip);
  }

  get aadhaarNumber(): string {
    return this.currentEmployee?.AadhaarNumber ||
           this.currentEmployee?.aadhaar_number ||
           '582249097271';
  }

  get emergencyContact(): string {
    return this.currentEmployee?.emergency_contact_phone ||
           this.currentEmployee?.residence_number ||
           this.currentEmployee?.PhoneNumber ||
           this.currentEmployee?.mobile_number ||
           '8688613873';
  }

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
    this.cdr.detectChanges();
  }

  setFlipped(flipped: boolean) {
    this.isFlipped = flipped;
    this.cdr.detectChanges();
  }

  async downloadBothSides() {
    if (!this.hasProfileImage) {
      const toast = await this.toastController.create({
        message: 'Please upload a profile picture first to generate your ID Card.',
        duration: 3000,
        color: 'warning',
        position: 'top',
        icon: 'alert-circle'
      });
      await toast.present();
      return;
    }

    if (!this.idCardFrontRef?.nativeElement || !this.idCardBackRef?.nativeElement) {
      return;
    }

    this.isDownloading = true;

    try {
      const empNum = this.currentEmployee?.EmployeeNumber || 'Employee';

      // 1. Capture Front Side
      const frontEl = this.idCardFrontRef.nativeElement;
      const origFrontTransform = frontEl.style.transform;
      frontEl.style.transform = 'none';

      const frontCanvas = await html2canvas(frontEl, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: frontEl.offsetWidth,
        height: frontEl.offsetHeight,
      });
      frontEl.style.transform = origFrontTransform;

      const frontLink = document.createElement('a');
      frontLink.download = `ID_Card_Front_${empNum}.png`;
      frontLink.href = frontCanvas.toDataURL('image/png');
      frontLink.click();

      // Delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 600));

      // 2. Capture Back Side
      const backEl = this.idCardBackRef.nativeElement;
      const origBackTransform = backEl.style.transform;
      backEl.style.transform = 'none';

      const backCanvas = await html2canvas(backEl, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: backEl.offsetWidth,
        height: backEl.offsetHeight,
      });
      backEl.style.transform = origBackTransform;

      const backLink = document.createElement('a');
      backLink.download = `ID_Card_Back_${empNum}.png`;
      backLink.href = backCanvas.toDataURL('image/png');
      backLink.click();

      const toast = await this.toastController.create({
        message: 'ID Card (Both Front & Back sides) downloaded successfully!',
        duration: 2500,
        color: 'success',
        position: 'top',
        icon: 'checkmark-circle'
      });
      await toast.present();
    } catch (err) {
      console.error('Error generating ID card:', err);
      const toast = await this.toastController.create({
        message: 'Failed to download ID Card. Please try again.',
        duration: 2500,
        color: 'danger',
        position: 'top',
        icon: 'alert-circle'
      });
      await toast.present();
    } finally {
      this.isDownloading = false;
      this.cdr.detectChanges();
    }
  }
}
