import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { PopoverController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { EmployeeService } from '../../../core/services/employee.service';
import { environment } from '../../../../environments/environment';
import { SeparationService } from '../../../core/services/separation.service';
import { ResignationFormComponent } from './components/resignation-form/resignation-form.component';
import { ResignationTrackingComponent } from './components/resignation-tracking/resignation-tracking.component';
import { RouteGuardService } from '../../../core/services/route-guard.service';

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
  isOwnProfile: boolean = true;

  // Image Upload States
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;
  previewImageUrl: string | null = null;
  isUploading: boolean = false;

  /** The logged-in user's own employee ID (not user ID) — used for manager check */
  private myEmployeeId: number | null = null;

  /**
   * Returns true if the current logged-in user can see the restricted tabs
   * (PROFILE, JOB, DOCUMENTS, ASSETS).
   * Allowed when:
   *   1. Viewing own profile
   *   2. Logged-in user is the direct reporting manager of the viewed employee
   *   3. Logged-in user has the 'hr' or 'admin' role
   */
  get canViewPrivateTabs(): boolean {
    if (this.isOwnProfile) return true;

    const userRole = this.routeGuardService.userRole?.toLowerCase() || '';
    if (userRole === 'hr' || userRole === 'admin') return true;

    // Manager check: only allow if this user is the direct reporting manager of the viewed employee
    const reportingManagerId = this.currentEmployee?.reporting_manager_id;
    if (this.myEmployeeId && reportingManagerId &&
        Number(this.myEmployeeId) === Number(reportingManagerId)) {
      return true;
    }

    return false;
  }

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
    private separationService: SeparationService,
    private modalController: ModalController,
    private routeGuardService: RouteGuardService
  ) {}

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `http://${environment.apiURL}`;
    
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.loadProfile(params['id']);
    });

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

  async loadProfile(empId?: string) {
    const loading = await this.loadingController.create({
      message: 'Loading profile...',
      spinner: 'crescent'
    });
    await loading.present();

    const targetId = empId || this.route.snapshot.queryParams['id'];

    this.employeeService.getMyProfile().subscribe({
      next: (myProfile: any) => {
        const myId = myProfile?.id || myProfile?.data?.id || (Array.isArray(myProfile?.data) ? myProfile?.data[0]?.id : null);
        this.myEmployeeId = myId ? Number(myId) : null;
        this.isOwnProfile = !targetId || Number(targetId) === Number(myId);

        const profileObservable = this.isOwnProfile
          ? this.employeeService.getMyProfile()
          : forkJoin({
              basic: this.employeeService.getEmployeeById(+targetId),
              details: this.employeeService.getEmployeeDetails(+targetId)
            }).pipe(
              map(({ basic, details }) => {
                const employeeDetails = details?.employee || details;
                return {
                  ...basic,
                  ...employeeDetails,
                  attendance_status: basic?.attendance_status || employeeDetails?.attendance_status || 'Not In Yet',
                  AttendanceStatus: basic?.AttendanceStatus || employeeDetails?.AttendanceStatus
                };
              })
            );

        profileObservable.pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any) => {
            const employeeData = res?.employee || res;
            // Unwrap data if it's wrapped in { data: [...] } or { data: {...} }
            if (employeeData?.data) {
              this.currentEmployee = Array.isArray(employeeData.data) ? employeeData.data[0] : employeeData.data;
            } else {
              this.currentEmployee = employeeData;
            }
            loading.dismiss();
            // If the current segment is a private tab and user has no access, reset to 'about'
            if (!this.canViewPrivateTabs && ['profile', 'job', 'documents', 'assets'].includes(this.selectedSegment)) {
              this.selectedSegment = 'about';
            }
            this.cdr.detectChanges();
          },
          error: () => {
            loading.dismiss();
            this.showToast('Failed to load profile', 'danger');
          }
        });
      },
      error: () => {
        this.isOwnProfile = !targetId;
        const profileObservable = targetId
          ? forkJoin({
              basic: this.employeeService.getEmployeeById(+targetId),
              details: this.employeeService.getEmployeeDetails(+targetId)
            }).pipe(
              map(({ basic, details }) => {
                const employeeDetails = details?.employee || details;
                return {
                  ...basic,
                  ...employeeDetails,
                  attendance_status: basic?.attendance_status || employeeDetails?.attendance_status || 'Not In Yet',
                  AttendanceStatus: basic?.AttendanceStatus || employeeDetails?.AttendanceStatus
                };
              })
            )
          : this.employeeService.getMyProfile();

        profileObservable.pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any) => {
            const employeeData = res?.employee || res;
            if (employeeData?.data) {
              this.currentEmployee = Array.isArray(employeeData.data) ? employeeData.data[0] : employeeData.data;
            } else {
              this.currentEmployee = employeeData;
            }
            loading.dismiss();
            // If the current segment is a private tab and user has no access, reset to 'about'
            if (!this.canViewPrivateTabs && ['profile', 'job', 'documents', 'assets'].includes(this.selectedSegment)) {
              this.selectedSegment = 'about';
            }
            this.cdr.detectChanges();
          },
          error: () => {
            loading.dismiss();
            this.showToast('Failed to load profile', 'danger');
          }
        });
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
