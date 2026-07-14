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
  expandedNodes = new Set<number>();

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
        this.expandedNodes.clear();
        if (data && data.root) {
          this.initializeExpandedStates(data.root);
        }
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

  initializeExpandedStates(node: any) {
    if (!node) return;
    
    // Expand nodes on the path, including the focus employee if they have reports
    if (node.isPathNode) {
      if (!node.isFocusEmployee || (node.employee.reports_count > 0)) {
        this.expandedNodes.add(node.employee.id);
      }
    }
    
    if (node.directReports) {
      for (const child of node.directReports) {
        this.initializeExpandedStates(child);
      }
    }
  }

  isExpanded(employeeId: number): boolean {
    return this.expandedNodes.has(employeeId);
  }

  toggleNode(event: Event, node: any, parentList?: any[]) {
    event.stopPropagation();
    const employeeId = node.employee.id;
    if (this.expandedNodes.has(employeeId)) {
      this.expandedNodes.delete(employeeId);
      this.cdr.detectChanges();
    } else {
      // Collapse all other managers in the same row
      if (parentList) {
        for (const sibling of parentList) {
          if (sibling.employee.id !== employeeId) {
            this.expandedNodes.delete(sibling.employee.id);
            this.collapseAllChildren(sibling);
          }
        }
      }
      
      if (node.employee.has_reports && (!node.directReports || node.directReports.length === 0) && !node.loading) {
        node.loading = true;
        this.cdr.detectChanges();
        this.employeeService.getReportingEmployees(employeeId).subscribe({
          next: (res: any) => {
            const reports = Array.isArray(res) ? res : (res.data || []);
            node.directReports = reports.map((emp: any) => ({
              employee: emp,
              isPathNode: false,
              isFocusEmployee: false,
              directReports: []
            }));
            this.expandedNodes.add(employeeId);
            node.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error fetching reporting employees:', err);
            node.loading = false;
            this.cdr.detectChanges();
          }
        });
      } else if (!node.loading) {
        this.expandedNodes.add(employeeId);
        this.cdr.detectChanges();
      }
    }
  }

  collapseAllChildren(node: any) {
    if (!node) return;
    this.expandedNodes.delete(node.employee.id);
    if (node.directReports) {
      for (const child of node.directReports) {
        this.collapseAllChildren(child);
      }
    }
  }

  onCardClick(event: Event, node: any, parentList?: any[]) {
    event.stopPropagation();
    if (node.employee.has_reports) {
      if (node.isFocusEmployee || !this.isExpanded(node.employee.id)) {
        this.toggleNode(event, node, parentList);
      }
    } else {
      this.reCenter(node.employee.id);
    }
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
