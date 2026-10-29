import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
  standalone: false,
})
export class EmployeeListPage implements OnInit {
  userRole: string | null = null;
  isHR: boolean = false;
  searchTerm: string = '';
  selectedEmployee: any = null;
  updateData: any = {
    reporting_manager_id: null,
    leave_plan_id: null,
    shift_policy_id: null,
    attendance_policy_id: null,
    attendance_capture_scheme_id: null,
    weekly_off_policy_id: null,
    PayGradeId: null,
    DepartmentId: null,
    LocationId: null,
    EmploymentStatus: 'Working',
    exit_date: null,
    exit_status: null
  };

  shiftPolicies: any[] = [];
  attendancePolicies: any[] = [];
  attendanceCaptureSchemes: any[] = [];
  leavePlans: any[] = [];
  weeklyOffPolicies: any[] = [];
  departments: any[] = [];
  locations: any[] = [];
  allEmployees: any[] = []; // For reporting manager selection (only active/working employees)
  filteredManagers: any[] = []; // Filtered list for searchable dropdown
  managerSearchTerm: string = '';
  managerDropdownOpen: boolean = false;

  selectedTab: 'WORKING' | 'RELIEVED' = 'WORKING';
  totalEmployeesCount: number = 0;
  workingEmployeesCount: number = 0;
  relievedEmployeesCount: number = 0;

  allLoadedEmployees: any[] = [];
  filteredEmployees: any[] = [];
  pagedCandidates: any[] = [];
  pageSize = 20;
  currentPage = 1;
  totalPages = 1;
  totalEmployees = 0;

  EmployeeselectedFile: File | null = null;
  isUploading = false;
  @ViewChild('uploadModal') uploadModal!: IonModal;

  constructor(
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userRole = (localStorage.getItem('role') || '').toLowerCase();
    this.isHR = this.userRole === 'hr' || this.userRole === 'admin';
    this.loadEmployees();
    this.loadShiftPolicies();
    this.loadAttendancePolicies();
    this.loadAttendanceCaptureSchemes();
    this.loadLeavePlans();
    this.loadWeeklyOffPolicies();
    this.loadDepartments();
    this.loadLocations();
  }

  loadDepartments() {
    this.adminService.getDepartments().subscribe(deps => {
      this.departments = deps || [];
    });
  }

  loadLocations() {
    this.adminService.getLocations().subscribe(locs => {
      this.locations = locs || [];
    });
  }

  loadWeeklyOffPolicies() {
    this.adminService.getWeeklyOffPolicies().subscribe(policies => {
      this.weeklyOffPolicies = policies || [];
    });
  }

  loadLeavePlans() {
    this.adminService.getLeavePlans().subscribe(plans => {
      this.leavePlans = plans || [];
    });
  }

  loadAttendancePolicies() {
    this.adminService.getAttendancePolicies().subscribe(policies => {
      this.attendancePolicies = policies || [];
    });
  }

  loadAttendanceCaptureSchemes() {
    this.adminService.getAttendanceCaptureSchemes().subscribe(schemes => {
      this.attendanceCaptureSchemes = schemes || [];
    });
  }

  loadShiftPolicies() {
    this.adminService.getShiftPolicies().subscribe(policies => {
      this.shiftPolicies = policies || [];
    });
  }

  loadEmployees() {
    // Fetch a large number of employees to support local filtering like app-roles
    this.employeeService.getAllEmployees(1, 2000, '').subscribe((res: any) => {
      this.allLoadedEmployees = (res.data || []).sort((a: any, b: any) => Number(a.id) - Number(b.id));
      
      // Calculate counts for Total, Working and Relieved employees
      this.totalEmployeesCount = this.allLoadedEmployees.length;
      this.workingEmployeesCount = this.allLoadedEmployees.filter(e => (e.EmploymentStatus || '').toLowerCase() !== 'relieved').length;
      this.relievedEmployeesCount = this.allLoadedEmployees.filter(e => (e.EmploymentStatus || '').toLowerCase() === 'relieved').length;

      // Only working employees can be assigned as reporting managers
      this.allEmployees = this.allLoadedEmployees.filter(e => (e.EmploymentStatus || '').toLowerCase() !== 'relieved');
      this.filteredManagers = [...this.allEmployees];
      this.applySearch();
    });
  }

  selectTab(tab: 'WORKING' | 'RELIEVED') {
    if (this.selectedTab === tab) return;
    this.selectedTab = tab;
    this.currentPage = 1;
    this.applySearch();
  }

  applySearch() {
    this.currentPage = 1;
    const term = (this.searchTerm || '').toLowerCase().trim();
    
    // 1. Filter by selected Tab (Working vs Relieved)
    const tabFiltered = this.allLoadedEmployees.filter(emp => {
      const isRelieved = (emp.EmploymentStatus || '').toLowerCase() === 'relieved';
      return this.selectedTab === 'RELIEVED' ? isRelieved : !isRelieved;
    });

    // 2. Filter by search term
    if (term) {
      this.filteredEmployees = tabFiltered.filter(emp => {
        return (emp.FullName || '').toLowerCase().includes(term) ||
               (emp.WorkEmail || '').toLowerCase().includes(term) ||
               (emp.EmployeeNumber || '').toString().toLowerCase().includes(term) ||
               (emp.department_name || '').toLowerCase().includes(term) ||
               (emp.designation_name || '').toLowerCase().includes(term) ||
               (emp.id || '').toString().includes(term);
      });
    } else {
      this.filteredEmployees = [...tabFiltered];
    }
    
    this.totalEmployees = this.filteredEmployees.length;
    this.totalPages = Math.ceil(this.totalEmployees / this.pageSize) || 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedCandidates = this.filteredEmployees.slice(startIndex, startIndex + this.pageSize);
  }

  formatDisplayDate(dateVal: any): string {
    if (!dateVal) return '—';
    if (typeof dateVal === 'string') {
      const parts = dateVal.split('T')[0].split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (!isNaN(day) && !isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12 && !isNaN(year)) {
          const dd = String(day).padStart(2, '0');
          return `${dd} ${months[monthIndex]} ${year}`;
        }
      }
    }
    if (dateVal instanceof Date) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dd = String(dateVal.getDate()).padStart(2, '0');
      const mmm = months[dateVal.getMonth()];
      const yyyy = dateVal.getFullYear();
      return `${dd} ${mmm} ${yyyy}`;
    }
    return String(dateVal);
  }

  selectEmployee(emp: any) {
    this.selectedEmployee = emp;
    let formattedExitDate: string | null = null;
    if (emp.exit_date) {
      if (typeof emp.exit_date === 'string') {
        formattedExitDate = emp.exit_date.split('T')[0];
      } else if (emp.exit_date instanceof Date) {
        const yyyy = emp.exit_date.getFullYear();
        const mm = String(emp.exit_date.getMonth() + 1).padStart(2, '0');
        const dd = String(emp.exit_date.getDate()).padStart(2, '0');
        formattedExitDate = `${yyyy}-${mm}-${dd}`;
      }
    }

    this.updateData = {
      reporting_manager_id: emp.reporting_manager_id || null,
      leave_plan_id: emp.leave_plan_id || null,
      shift_policy_id: emp.shift_policy_id || null,
      attendance_policy_id: emp.attendance_policy_id || null,
      attendance_capture_scheme_id: emp.attendance_capture_scheme_id || null,
      weekly_off_policy_id: emp.weekly_off_policy_id || null,
      PayGradeId: emp.PayGradeId || null,
      DepartmentId: emp.DepartmentId || null,
      LocationId: emp.LocationId || null,
      EmploymentStatus: emp.EmploymentStatus || 'Working',
      exit_date: formattedExitDate,
      exit_status: emp.exit_status || null
    };
  }

  updateEmployeeProfile() {
    if (!this.selectedEmployee) return;

    const payload: any = {};
    Object.keys(this.updateData).forEach(key => {
      const val = this.updateData[key];
      if (val !== undefined) {
        payload[key] = val;
      }
    });

    this.employeeService.updateEmployeeProfile(this.selectedEmployee.id, payload).subscribe({
      next: () => {
        this.presentToast('Employee profile updated successfully', 'success');
        this.selectedEmployee = null;
        this.loadEmployees();
      },
      error: (err) => {
        this.presentToast('Update failed: ' + (err?.error?.error || 'Unknown error'), 'danger');
      }
    });
  }

  EmployeeSelected(event: any) {
    this.EmployeeselectedFile = event.target.files[0];
  }

  EmployeesUpload() {
    if (!this.EmployeeselectedFile) {
      this.presentToast('Please select an Excel file', 'warning');
      return;
    }

    this.isUploading = true;
    this.uploadModal.dismiss();

    this.adminService.uploadEmployees(this.EmployeeselectedFile).subscribe({
      next: () => {
        this.isUploading = false;
        this.presentToast('Employees uploaded successfully', 'success');
        this.EmployeeselectedFile = null;
        this.loadEmployees();
      },
      error: () => {
        this.isUploading = false;
        this.presentToast('Employee upload failed', 'danger');
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  /* Searchable Manager Dropdown Logic */
  toggleManagerDropdown() {
    this.managerDropdownOpen = !this.managerDropdownOpen;
    if (this.managerDropdownOpen) {
      this.managerSearchTerm = '';
      this.filteredManagers = [...this.allEmployees];
    }
  }

  filterManagers() {
    const term = (this.managerSearchTerm || '').toLowerCase().trim();
    this.filteredManagers = term
      ? this.allEmployees.filter(e => (e.FullName || '').toLowerCase().includes(term))
      : [...this.allEmployees];
  }

  selectManager(id: number | null) {
    this.updateData.reporting_manager_id = id;
    this.managerDropdownOpen = false;
  }

  getManagerName(id: number | null): string {
    if (!id) return 'Select Reporting Manager';
    const found = this.allEmployees.find(e => e.id === id);
    return found ? found.FullName : 'Select Reporting Manager';
  }

  getInitials(name: string | null | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  getAvatarColor(name: string | null | undefined): string {
    const colors = [
      '#1e70cd', '#0e4fa3', '#7c3aed', '#059669',
      '#d97706', '#dc2626', '#0891b2', '#7c3aed'
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
