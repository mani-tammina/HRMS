import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopoverController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { EmployeeService } from '../../../core/services/employee.service';
import { environment } from '../../../../environments/environment';
import { SeparationService } from '../../../core/services/separation.service';
import { ResignationFormComponent } from './components/resignation-form/resignation-form.component';
import { ResignationTrackingComponent } from './components/resignation-tracking/resignation-tracking.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentEmployee: any;
  selectedSegment = 'about';
  env: string = '';
  myResignation: any = null;
  resSettings: any = null;
  
  // Image Upload States
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;
  previewImageUrl: string | null = null;
  isUploading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
    private separationService: SeparationService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `http://${environment.apiURL}`;
    this.loadProfile();
    this.loadMyResignation();
    this.loadResSettings();

    // Listen for profile image updates from the service
    this.employeeService.profileImageUpdate$
      .pipe(takeUntil(this.destroy$))
      .subscribe((imagePath) => {
        if (imagePath && this.currentEmployee) {
          this.currentEmployee.profile_image = imagePath;
          this.cdr.detectChanges();
        }
      });
  }

  loadMyResignation() {
    this.separationService.getMyResignation().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.myResignation = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching resignation status:', err);
      }
    });
  }

  loadResSettings() {
    this.separationService.getResignationSettings().subscribe({
      next: (settings) => {
        this.resSettings = settings;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching resignation settings:', err);
      }
    });
  }

  async loadProfile() {
    const loading = await this.loadingController.create({
      message: 'Loading profile...',
      spinner: 'crescent'
    });
    await loading.present();

    this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        // Unwrap data if it's wrapped in { data: [...] } or { data: {...} }
        if (res?.data) {
          this.currentEmployee = Array.isArray(res.data) ? res.data[0] : res.data;
        } else {
          this.currentEmployee = res;
        }
        loading.dismiss();
        this.cdr.detectChanges();
      },
      error: () => {
        loading.dismiss();
        this.showToast('Failed to load profile', 'danger');
      }
    });
  }

  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImageUrl = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadProfilePic() {
    if (!this.selectedFile) {
      this.showToast('Please select an image first', 'warning');
      return;
    }

    this.isUploading = true;
    this.employeeService.uploadProfileImage(this.selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (res: any) => {
          this.isUploading = false;
          this.previewImageUrl = null;
          this.selectedFile = null;
          
          // Close popover if triggered from one
          await this.popoverController.dismiss();
          this.showToast('Profile picture updated successfully', 'success');
          this.cdr.detectChanges();
        },
        error: async (err) => {
          this.isUploading = false;
          await this.popoverController.dismiss();
          this.showToast('Failed to upload profile picture', 'danger');
          console.error('Upload error:', err);
        }
      });
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle'
    });
    await toast.present();
  }

  async openResignationModal() {
    if (!this.currentEmployee) return;

    const modal = await this.modalController.create({
      component: ResignationFormComponent,
      componentProps: {
        currentEmployee: this.currentEmployee
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.submitted) {
      this.loadProfile(); // Reload profile to update EmploymentStatus
      this.loadMyResignation(); // Reload resignation request status
    }
  }

  async openTrackingModal() {
    if (!this.myResignation) return;

    const modal = await this.modalController.create({
      component: ResignationTrackingComponent,
      componentProps: {
        resignation: this.myResignation
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && (data.cancelled || data.submitted)) {
      this.loadProfile(); // Reload profile to update EmploymentStatus
      this.loadMyResignation(); // Reload resignation request status
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
