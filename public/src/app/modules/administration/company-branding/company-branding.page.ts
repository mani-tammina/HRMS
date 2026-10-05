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

  // Logo Preview
  logoPreviewUrl: string | null = null;
  selectedLogoFile: File | null = null;
  previewBgDark = false;

  // Locations Data
  locations: LocationItem[] = [];
  filteredLocations: LocationItem[] = [];
  searchTerm = '';

  // Single Input: Add Location
  newLocationName = '';
  isAddingLocation = false;

  // Single Input: Add / Update Location Address
  editingAddressLocationId: number | null = null;
  locationAddressInput = '';
  isSavingAddress = false;

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
      const addr = (loc.address_line1 || '').toLowerCase();
      return name.includes(q) || addr.includes(q);
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
  addLocation() {
    const trimmed = (this.newLocationName || '').trim();
    if (!trimmed) {
      this.toaster.showError('Please enter a location name.');
      return;
    }

    this.isAddingLocation = true;
    this.brandingService
      .createLocation({ name: trimmed })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isAddingLocation = false;
          this.newLocationName = '';
          this.toaster.showSuccess(`Location "${trimmed}" added successfully!`);
          this.loadLocations();
        },
        error: (err) => {
          this.isAddingLocation = false;
          console.error('Error creating location', err);
          this.toaster.showError(err.error?.error || 'Failed to create location.');
        },
      });
  }

  /* ===================== SINGLE INPUT ADDRESS ACTIONS ===================== */
  startAddAddress(loc: LocationItem) {
    this.editingAddressLocationId = loc.id || null;
    this.locationAddressInput = loc.address_line1 || '';
  }

  cancelAddAddress() {
    this.editingAddressLocationId = null;
    this.locationAddressInput = '';
  }

  saveLocationAddress(loc: LocationItem) {
    if (!loc.id) return;
    const address = (this.locationAddressInput || '').trim();

    this.isSavingAddress = true;
    this.brandingService
      .updateLocation(loc.id, {
        name: loc.name,
        address_line1: address || '',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSavingAddress = false;
          loc.address_line1 = address;
          this.editingAddressLocationId = null;
          this.locationAddressInput = '';
          this.toaster.showSuccess(`Address for "${loc.name}" saved successfully!`);
          this.loadLocations();
        },
        error: (err) => {
          this.isSavingAddress = false;
          console.error('Error saving address', err);
          this.toaster.showError(err.error?.error || 'Failed to save address.');
        },
      });
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
