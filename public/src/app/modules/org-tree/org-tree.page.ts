import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { EmployeeService } from '../../core/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-org-tree',
  templateUrl: './org-tree.page.html',
  styleUrls: ['./org-tree.page.scss'],
  standalone: false
})
export class OrgTreePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isLoading = false;
  treeData: any = null;
  currentUserEmployee: any = null;

  // Search variables
  searchQuery = '';
  searchResults: any[] = [];
  showSearchDropdown = false;

  // Expand / collapse states
  isManagerBranchExpanded = true;
  isEmployeeBranchExpanded = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadInitialTree();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadInitialTree() {
    this.isLoading = true;
    this.cdr.detectChanges();

    // Fetch user profile first to establish the current context, then load tree
    this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
      next: (profile) => {
        this.currentUserEmployee = profile;
        this.loadOrgTree();
      },
      error: (err) => {
        console.error('Error fetching own profile:', err);
        this.loadOrgTree(); // Try loading tree anyway
      }
    });
  }

  loadOrgTree(employeeId?: number) {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.employeeService.getOrgTree(employeeId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.treeData = data;
        this.isManagerBranchExpanded = true;
        this.isEmployeeBranchExpanded = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading org tree:', err);
        this.isLoading = false;
        this.showToast('Failed to load organization tree structure.');
        this.cdr.detectChanges();
      }
    });
  }

  toggleManagerBranch(event: Event) {
    event.stopPropagation();
    this.isManagerBranchExpanded = !this.isManagerBranchExpanded;
    this.cdr.detectChanges();
  }

  toggleEmployeeBranch(event: Event) {
    event.stopPropagation();
    this.isEmployeeBranchExpanded = !this.isEmployeeBranchExpanded;
    this.cdr.detectChanges();
  }

  onSearchInput(event: any) {
    const value = event.target.value;
    this.searchQuery = value;
    if (value && value.trim().length >= 2) {
      this.employeeService.searchEmployees(value.trim()).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.searchResults = res.data || [];
          this.showSearchDropdown = this.searchResults.length > 0;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error searching employees:', err);
          this.searchResults = [];
          this.showSearchDropdown = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.searchResults = [];
      this.showSearchDropdown = false;
      this.cdr.detectChanges();
    }
  }

  selectSearchEmployee(employee: any) {
    this.searchQuery = '';
    this.searchResults = [];
    this.showSearchDropdown = false;
    this.loadOrgTree(employee.id);
  }

  reCenter(employeeId: number) {
    if (employeeId) {
      this.loadOrgTree(employeeId);
    }
  }

  viewProfile(event: Event, employeeId: number) {
    event.stopPropagation(); // Avoid triggering reCenter card click
    this.router.navigate(['/profile'], { queryParams: { id: employeeId } });
  }

  getProfileImage(emp: any): string {
    if (emp?.profile_image) {
      if (emp.profile_image.startsWith('http')) return emp.profile_image;
      return `http://${environment.apiURL}${emp.profile_image}?t=${Date.now()}`;
    }
    return 'assets/Profile_Picture.png';
  }

  getInitials(emp: any): string {
    if (!emp) return '';
    const first = emp.FirstName ? emp.FirstName.charAt(0) : '';
    const last = emp.LastName ? emp.LastName.charAt(0) : '';
    return (first + last).toUpperCase() || 'EE';
  }

  getAvatarColor(emp: any): string {
    if (!emp) return '#6b7280';
    const id = emp.id || 0;
    const colors = [
      '#3b82f6',
      '#10b981',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#06b6d4',
      '#f97316'
    ];
    return colors[id % colors.length];
  }

  isDirectReport(employeeId: number): boolean {
    if (!this.treeData?.directReports) return false;
    return this.treeData.directReports.some((r: any) => r.id === employeeId);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
