import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { BrandingService, CompanyBranding, LocationItem } from 'src/app/core/services/branding.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-branding',
  templateUrl: './company-branding.page.html',
  styleUrls: ['./company-branding.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class CompanyBrandingPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  activeTab: 'identity' | 'locations' = 'identity';
  isLoading = false;
  isSaving = false;
  isUploadingLogo = false;

  // Branding Data
  branding: CompanyBranding = {
    company_name: 'Tech Tammina',
    legal_name: '',
    tagline: '',
    website: '',
    email: '',
    phone: '',
    tax_id: '',
    registration_number: '',
    logo_url: '',
    primary_color: '#2563eb',
    secondary_color: '#1e40af',
    about_us: '',
    mission: '',
    vision: '',
    core_values: '',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
  };

  // Forms
  identityForm!: FormGroup;
  locationForm!: FormGroup;

  // Logo Preview
  logoPreviewUrl: string | null = null;
  selectedLogoFile: File | null = null;
  previewBgDark = false;

  // Locations Data
  locations: LocationItem[] = [];
  filteredLocations: LocationItem[] = [];
  searchTerm = '';
  showLocationModal = false;
  editingLocation: LocationItem | null = null;
  locationModalTitle = 'Add New Location';

  // Supported Timezones
  timezones: string[] = [
    'America/New_York (EST/EDT)',
    'America/Chicago (CST/CDT)',
    'America/Denver (MST/MDT)',
    'America/Los_Angeles (PST/PDT)',
    'Asia/Kolkata (IST +5:30)',
    'Europe/London (GMT/BST)',
    'Europe/Paris (CET/CEST)',
    'Asia/Dubai (GST +4:00)',
    'Asia/Singapore (SGT +8:00)',
    'Asia/Tokyo (JST +9:00)',
    'Australia/Sydney (AEST/AEDT)',
  ];

  // Countries
  countries: string[] = [
    'United States',
    'India',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'United Arab Emirates',
    'Singapore',
    'Japan',
    'Mexico',
    'Brazil',
    'South Africa',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private brandingService: BrandingService,
    private toaster: ToasterService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.loadBranding();
    this.loadLocations();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForms() {
    this.identityForm = this.fb.group({
      company_name: ['', [Validators.required, Validators.maxLength(150)]],
      legal_name: ['', [Validators.maxLength(150)]],
      tagline: ['', [Validators.maxLength(255)]],
      website: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)]],
    });

    this.locationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['United States', [Validators.required]],
      address_line1: ['', [Validators.required]],
      address_line2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone_number: [''],
      email: ['', [Validators.email]],
      timezone: ['America/New_York (EST/EDT)'],
      is_headquarters: [false],
    });
  }

  /* ===================== LOAD DATA ===================== */
  loadBranding() {
    this.isLoading = true;
    this.brandingService
      .getBranding()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res) {
            this.branding = res;
            this.identityForm.patchValue({
              company_name: res.company_name || '',
              legal_name: res.legal_name || '',
              tagline: res.tagline || '',
              website: res.website || '',
            });

            if (res.logo_url) {
              this.logoPreviewUrl = this.getFullImageUrl(res.logo_url);
            }
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Failed to load company branding', err);
          this.toaster.showError('Failed to load branding data');
        },
      });
  }

  loadLocations() {
    this.brandingService
      .getLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.locations = res || [];
          this.filterLocations();
        },
        error: (err) => {
          console.error('Failed to load locations', err);
          this.toaster.showError('Failed to load locations');
        },
      });
  }

  filterLocations() {
    const q = (this.searchTerm || '').trim().toLowerCase();
    if (!q) {
      this.filteredLocations = [...this.locations];
      return;
    }
    this.filteredLocations = this.locations.filter((loc) => {
      const name = (loc.name || '').toLowerCase();
      const city = (loc.city || '').toLowerCase();
      const state = (loc.state || '').toLowerCase();
      const country = (loc.country || '').toLowerCase();
      const address = (loc.address_line1 || '').toLowerCase();
      return (
        name.includes(q) ||
        city.includes(q) ||
        state.includes(q) ||
        country.includes(q) ||
        address.includes(q)
      );
    });
  }

  /* ===================== LOGO MANAGEMENT ===================== */
  onLogoSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.toaster.showError('Image size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    this.selectedLogoFile = file;

    // Local Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  cancelLogoSelection(fileInput?: HTMLInputElement) {
    this.selectedLogoFile = null;
    this.logoPreviewUrl = this.branding.logo_url ? this.getFullImageUrl(this.branding.logo_url) : null;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  uploadLogo(fileInput?: HTMLInputElement) {
    if (!this.selectedLogoFile) return;

    this.isUploadingLogo = true;
    this.brandingService
      .uploadLogo(this.selectedLogoFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isUploadingLogo = false;
          this.selectedLogoFile = null;
          if (fileInput) {
            fileInput.value = '';
          }
          if (res && res.logo_url) {
            this.branding.logo_url = res.logo_url;
            this.logoPreviewUrl = this.getFullImageUrl(res.logo_url);
          }
          this.toaster.showSuccess('Company logo uploaded and saved successfully!');
        },
        error: (err) => {
          this.isUploadingLogo = false;
          console.error('Logo upload error', err);
          this.toaster.showError(err.error?.error || 'Failed to upload logo.');
        },
      });
  }

  getFullImageUrl(path: string | undefined | null): string {
    return this.brandingService.getFullImageUrl(path, 'assets/tt_blue_logo.png');
  }

  /* ===================== SAVE BRANDING ===================== */
  saveIdentity() {
    if (this.identityForm.invalid) {
      this.identityForm.markAllAsTouched();
      this.toaster.showError('Please check required fields in Brand Identity form.');
      return;
    }

    this.isSaving = true;
    const payload: Partial<CompanyBranding> = {
      ...this.identityForm.value,
      logo_url: this.branding.logo_url,
    };

    this.brandingService
      .updateBranding(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isSaving = false;
          this.branding = { ...this.branding, ...payload };
          this.toaster.showSuccess('Brand Identity settings saved successfully!');
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Error saving brand identity', err);
          this.toaster.showError(err.error?.error || 'Failed to save brand identity.');
        },
      });
  }



  /* ===================== LOCATION ACTIONS ===================== */
  openAddLocationModal() {
    this.editingLocation = null;
    this.locationModalTitle = 'Add Office Location';
    this.locationForm.reset({
      name: '',
      country: 'United States',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      phone_number: '',
      email: '',
      timezone: 'America/New_York (EST/EDT)',
      is_headquarters: false,
    });
    this.showLocationModal = true;
  }

  openEditLocationModal(location: LocationItem) {
    this.editingLocation = location;
    this.locationModalTitle = `Edit Location: ${location.name}`;
    this.locationForm.patchValue({
      name: location.name || '',
      country: location.country || 'United States',
      address_line1: location.address_line1 || '',
      address_line2: location.address_line2 || '',
      city: location.city || '',
      state: location.state || '',
      postal_code: location.postal_code || '',
      phone_number: location.phone_number || '',
      email: location.email || '',
      timezone: location.timezone || 'America/New_York (EST/EDT)',
      is_headquarters: !!location.is_headquarters,
    });
    this.showLocationModal = true;
  }

  closeLocationModal() {
    this.showLocationModal = false;
    this.editingLocation = null;
    this.locationForm.reset();
  }

  saveLocation() {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      this.toaster.showError('Please fill all mandatory location address fields.');
      return;
    }

    this.isSaving = true;
    const formVal = this.locationForm.value;
    const payload: LocationItem = {
      name: formVal.name,
      country: formVal.country,
      address_line1: formVal.address_line1,
      address_line2: formVal.address_line2,
      city: formVal.city,
      state: formVal.state,
      postal_code: formVal.postal_code,
      phone_number: formVal.phone_number,
      email: formVal.email,
      timezone: formVal.timezone,
      is_headquarters: formVal.is_headquarters ? 1 : 0,
    };

    if (this.editingLocation && this.editingLocation.id) {
      this.brandingService
        .updateLocation(this.editingLocation.id, payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isSaving = false;
            this.toaster.showSuccess('Location address updated successfully!');
            this.closeLocationModal();
            this.loadLocations();
          },
          error: (err) => {
            this.isSaving = false;
            console.error('Error updating location', err);
            this.toaster.showError(err.error?.error || 'Failed to update location.');
          },
        });
    } else {
      this.brandingService
        .createLocation(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isSaving = false;
            this.toaster.showSuccess('New office location added successfully!');
            this.closeLocationModal();
            this.loadLocations();
          },
          error: (err) => {
            this.isSaving = false;
            console.error('Error creating location', err);
            this.toaster.showError(err.error?.error || 'Failed to create location.');
          },
        });
    }
  }

  async confirmDeleteLocation(loc: LocationItem) {
    if (!loc.id) return;
    const alert = await this.alertController.create({
      header: 'Delete Location',
      subHeader: loc.name,
      message: `Are you sure you want to delete the location "${loc.name}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteLocation(loc.id!);
          },
        },
      ],
    });
    await alert.present();
  }

  private deleteLocation(id: number) {
    this.brandingService
      .deleteLocation(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toaster.showSuccess('Location deleted successfully.');
          this.loadLocations();
        },
        error: (err) => {
          console.error('Error deleting location', err);
          this.toaster.showError(err.error?.error || 'Failed to delete location.');
        },
      });
  }

  toggleDarkPreview() {
    this.previewBgDark = !this.previewBgDark;
  }
}
