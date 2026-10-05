import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { BrandingService, CompanyBranding, LocationItem } from '../../../../../core/services/branding.service';
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
export class IdCardModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() currentEmployee: any;
  @ViewChild('idCardFrontRef', { static: false }) idCardFrontRef!: ElementRef;
  @ViewChild('idCardBackRef', { static: false }) idCardBackRef!: ElementRef;

  env: string = '';
  isDownloading = false;
  isFlipped = false;

  // Dynamic Location & Branding Data for THIS specific employee
  siteAddress: string = '';
  sitePhone: string = '';
  siteFax: string = '0891-2555201';
  companyName: string = 'SREE TAMMINA SOFTWARE SOLUTIONS PVT. LTD.';
  companyWebsite: string = 'www.techtammina.com';

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

  /**
   * Dynamically formats the location address lines below the company title
   * derived STRICTLY from this employee's assigned site location.
   */
  get locationAddressLines(): string[] {
    if (this.siteAddress && this.siteAddress.trim()) {
      const raw = this.siteAddress.trim();
      if (raw.includes('\n')) {
        return raw.split('\n').map(s => s.trim()).filter(Boolean);
      }

      // If comma-separated long string, split into 2 neat lines
      if (raw.length > 38 && raw.includes(',')) {
        const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
        const mid = Math.ceil(parts.length / 2);
        return [
          parts.slice(0, mid).join(', ') + ',',
          parts.slice(mid).join(', ')
        ];
      }

      return [raw];
    }

    // Default Fallback
    return [
      '# 49-24-64, Sri Venkata Sai Towers, 3rd Floor,',
      'Sankaramatam Road, Madhuranagar, Visakhapatnam'
    ];
  }

  get companyNameDisplay(): string {
    return this.companyName || 'SREE TAMMINA SOFTWARE SOLUTIONS PVT. LTD.';
  }

  get locationPhone(): string {
    return this.sitePhone || '0891-2555200';
  }

  get locationFax(): string {
    return this.siteFax || '0891-2555201';
  }

  get companyWebsiteDisplay(): string {
    return this.companyWebsite || 'www.techtammina.com';
  }

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
    private brandingService: BrandingService
  ) {}

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
    this.initDynamicBrandingAndLocation();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initDynamicBrandingAndLocation() {
    const empLocId = this.currentEmployee?.LocationId || this.currentEmployee?.location_id;
    const empLocName = (
      this.currentEmployee?.location_name ||
      this.currentEmployee?.Location ||
      this.currentEmployee?.location ||
      ''
    ).trim().toLowerCase();

    // 1. Direct assignment from employee object if already populated by backend query
    if (this.currentEmployee?.location_address_line1 && this.currentEmployee.location_address_line1.trim()) {
      this.siteAddress = this.currentEmployee.location_address_line1.trim();
      if (this.currentEmployee.location_phone_number) {
        this.sitePhone = this.currentEmployee.location_phone_number.trim();
      }
    }

    // 2. Query Locations from Branding Service to match ONLY this employee's assigned location
    this.brandingService
      .getLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (locations: LocationItem[]) => {
          if (!locations || locations.length === 0) return;

          // Find ONLY the location that matches THIS employee's LocationId or location_name
          let matchedLoc: LocationItem | undefined;
          if (empLocId) {
            matchedLoc = locations.find(l => Number(l.id) === Number(empLocId));
          }
          if (!matchedLoc && empLocName) {
            matchedLoc = locations.find(l => (l.name || '').trim().toLowerCase() === empLocName);
          }

          if (matchedLoc) {
            // ONLY apply the address if THIS employee's assigned location has an address configured
            if (matchedLoc.address_line1 && matchedLoc.address_line1.trim()) {
              this.siteAddress = matchedLoc.address_line1.trim();
            } else {
              this.siteAddress = '';
            }

            if (matchedLoc.phone_number && matchedLoc.phone_number.trim()) {
              this.sitePhone = matchedLoc.phone_number.trim();
            }
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.warn('Could not load locations for ID Card', err);
        }
      });

    // 3. Query Branding Data for company title & website
    this.brandingService
      .getBranding()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (brand: CompanyBranding) => {
          if (brand) {
            if (brand.legal_name) {
              this.companyName = brand.legal_name.toUpperCase();
            } else if (brand.company_name) {
              this.companyName = brand.company_name.toUpperCase();
            }
            if (brand.website) {
              this.companyWebsite = brand.website.replace(/^https?:\/\//, '');
            }
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.warn('Could not load company branding for ID card', err);
        }
      });
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
