import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { RouteGuardService } from '../../services/route-guard.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: any[] = [];
  results: string[] = [];

  isSearchPopoverOpen: boolean = false;
  selectedIndex: number = -1;
  filteredQuickActions: any[] = [];

  quickActions = [

    {
      title: 'Attendance',
      description: 'View & manage attendance',
      icon: 'calendar-outline',
      action: 'attendance'
    },
    {
      title: 'Apply Leave',
      description: 'Request for time-off.',
      icon: 'document-text-outline',
      action: 'apply-leave'
    },
    {
      title: 'Payslips',
      description: 'View & download your payslips.',
      icon: 'receipt-outline',
      action: 'payslips'
    },
    {
      title: 'Leaves',
      description: 'View leave summary.',
      icon: 'git-network-outline',
      action: 'leaves'
    },
    {
      title: 'Work Track',
      description: 'Access logs detailing your working hours.',
      icon: 'list-outline',
      action: 'attendance-logs'
    }
  ];

  isViewingEmployeeModal: boolean = false;
  selectedEmployee: any = null;

  openEmployeeDetailsModal(emp: any) {
    const id = emp.id || emp.employee_id || emp.EmployeeId;
    if (id) {
      this.router.navigate(['/profile'], { queryParams: { id } });
    }
    this.closePopover();
  }

  // Profile state
  currentEmployee: any;
  profileImageUrl: string = '../../assets/user.png';
  env: string = '';
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  // Master Data
  departments: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private routeGuardService: RouteGuardService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
    this.isAdmin = this.routeGuardService.userRole?.toLowerCase() === 'admin';
    this.filteredQuickActions = this.quickActions;

    const currentUrl = this.router.url;
    const isLoginPage = currentUrl.includes('/login');

    if (isLoginPage) {
      this.isAuthenticated = false;
      return;
    }

    this.isAuthenticated = this.routeGuardService.isLoggedIn;

    if (this.isAuthenticated) {
      this.employeeService.getMyProfile()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.currentEmployee = res;
              this.updateProfileImageUrl();
              this.cdr.detectChanges();
            }
          },
          error: (err) => {
            console.error('Header profile load failed:', err);
          }
        });

      this.employeeService.currentEmployee$
        .pipe(takeUntil(this.destroy$))
        .subscribe(emp => {
          if (emp) {
            this.currentEmployee = emp;
            this.updateProfileImageUrl();
            this.cdr.detectChanges();
          }
        });

      // Load master data to map IDs for search results
      this.adminService.getDepartments()
        .pipe(takeUntil(this.destroy$))
        .subscribe(deps => {
          this.departments = deps || [];
        });
    }
  }

  private updateProfileImageUrl() {
    if (this.currentEmployee?.profile_image) {
      this.profileImageUrl = `${this.env}${this.currentEmployee.profile_image}`;
    } else {
      this.profileImageUrl = '../../assets/user.png';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  viewProfile() {
    // Navigate to profile details page if available and clear query params to load own profile
    this.router.navigate(['/profile'], { queryParams: {} });
  }

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query.length === 0) {
      this.isSearchPopoverOpen = false;
      this.searchResults = [];
      this.results = [];
      this.selectedIndex = -1;
      return;
    }

    this.isSearchPopoverOpen = true;

    this.filteredQuickActions = this.quickActions.filter(action =>
      action.title.toLowerCase().includes(query) ||
      action.description.toLowerCase().includes(query)
    );

    if (query.length > 2) {
      this.employeeService.searchEmployees(this.searchQuery.trim(), 1, 10).subscribe({
        next: (res: any) => {
          this.searchResults = res.data || [];
          this.results = this.searchResults.map(emp => emp.FullName || `${emp.FirstName} ${emp.LastName}`);
          this.selectedIndex = -1;
        }
      });
    } else {
      this.searchResults = [];
      this.results = [];
      this.selectedIndex = -1;
    }
  }

  onSearchFocus() {
    if (this.searchQuery.trim().length > 0) {
      this.isSearchPopoverOpen = true;
      this.onSearch();
    }
  }

  closePopover() {
    this.isSearchPopoverOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
    this.results = [];
    this.selectedIndex = -1;
    this.filteredQuickActions = this.quickActions;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isSearchPopoverOpen) {
      event.preventDefault();
      this.closePopover();
    }
  }

  get allItems() {
    return [...this.filteredQuickActions, ...this.searchResults];
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePopover();
      return;
    }
    const items = this.allItems;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % items.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.selectedIndex >= 0 && this.selectedIndex < items.length) {
        const selected = items[this.selectedIndex];
        if (selected.action) {
          this.handleQuickAction(selected.action);
        } else {
          this.openEmployeeDetailsModal(selected);
        }
      }
    }
  }

  handleQuickAction(action: string) {
    this.closePopover();

    switch (action) {
      case 'clock-in':
      case 'clock-out':
      case 'attendance':
        this.router.navigate(['/Me']);
        break;
      case 'apply-leave':
      case 'leaves':
        this.router.navigate(['/leaves']);
        break;
      case 'payslips':
        this.router.navigate(['/MyPay']);
        break;
      case 'attendance-logs':
        this.router.navigate(['/workTrack']);
        break;
      default:
        break;
    }
  }

  handleImageError(event: any) {
    event.target.src = '../../assets/user.png';
  }



  closeEmployeeDetailsModal() {
    this.isViewingEmployeeModal = false;
    this.selectedEmployee = null;
  }

  getDepartmentName(departmentId: any, fallbackName: string): string {
    if (departmentId) {
      const found = this.departments.find(d => d.id === departmentId);
      if (found) return found.name;
    }
    return fallbackName || 'N/A';
  }

  openEmployeeListModal() {
    // Handle opening modern ionic modal / navigating to search results page
  }
}
