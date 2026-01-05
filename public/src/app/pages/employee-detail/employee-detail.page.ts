import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge, IonSpinner,
  IonModal, IonInput, IonFooter, IonDatetime, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { MasterDataService, MasterDataItem } from '@core/services/master-data.service';
import { PayrollService, SalaryStructure } from '@core/services/payroll.service';
import { addIcons } from 'ionicons';
import { 
  mailOutline, callOutline, businessOutline, briefcaseOutline, calendarOutline,
  locationOutline, cardOutline, personOutline, cashOutline, shieldOutline,
  clipboardOutline, timeOutline, alertCircleOutline, homeOutline
} from 'ionicons/icons';
import { ToastController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge, IonSpinner,
    IonModal, IonInput, IonFooter, IonDatetime,
    IonSelect, IonSelectOption
  ]
})
export class EmployeeDetailPage implements OnInit {
    payrollDefaults: any = {};
  employee: any = null;
  isLoading = false;
  isHR = false;
  showEditModal = false;
  editForm: any = {};
  masterData: any = {
    leavePlans: [],
    shiftPolicies: [],
    attendancePolicies: [],
    payGrades: [],
    managers: []
  };
  salaryStructure: SalaryStructure | null = null;
  managerSearch: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private toastController: ToastController,
    private masterDataService: MasterDataService,
    private payrollService: PayrollService
  ) {
    addIcons({ 
      mailOutline, callOutline, businessOutline, briefcaseOutline, calendarOutline,
      locationOutline, cardOutline, personOutline, cashOutline, shieldOutline,
      clipboardOutline, timeOutline, alertCircleOutline, homeOutline
    });
  }

  ngOnInit() {
        // Load payroll defaults for HRA calculation
        this.payrollService.getPayrollDefaults().subscribe(defaults => {
          this.payrollDefaults = defaults || {};
        });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
      this.loadSalaryStructure(id);
    }
    // Check HR role (assume user object in localStorage)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isHR = user.role === 'hr' || user.role === 'admin';
    this.loadAllMasterData();
  }

  loadAllMasterData() {
    this.masterDataService.getLeavePlans().subscribe(data => {
      console.log('Leave Plans:', data);
      this.masterData.leavePlans = data || [];
    });
    this.masterDataService.getShiftPolicies().subscribe(data => {
      console.log('Shift Policies:', data);
      this.masterData.shiftPolicies = data || [];
    });
    this.masterDataService.getAttendancePolicies().subscribe(data => {
      console.log('Attendance Policies:', data);
      this.masterData.attendancePolicies = data || [];
    });
    this.masterDataService.getPayGrades().subscribe(data => {
      console.log('Pay Grades:', data);
      this.masterData.payGrades = data || [];
    });
    this.employeeService.getEmployees().subscribe(data => {
      console.log('Managers:', data);
      this.masterData.managers = data || [];
    });
  }

  get filteredManagers() {
    if (!this.managerSearch) return this.masterData.managers;
    const search = this.managerSearch.toLowerCase();
    return this.masterData.managers.filter((mgr: any) =>
      (mgr.name && mgr.name.toLowerCase().includes(search)) ||
      (mgr.EmployeeNumber && mgr.EmployeeNumber.toLowerCase().includes(search))
    );
  }

  loadEmployee(id: string) {
    this.isLoading = true;
    this.employeeService.getEmployeeDetails(id).subscribe({
      next: (response: any) => {
        this.employee = response.employee || response;
        this.isLoading = false;
        // Prepare edit form with current values
        this.editForm = {
          reporting_manager_id: this.employee.reporting_manager_id || '',
          leave_plan_id: this.employee.leave_plan_id || '',
          shift_policy_id: this.employee.shift_policy_id || '',
          attendance_policy_id: this.employee.attendance_policy_id || '',
          PayGradeId: this.employee.PayGradeId || ''
        };
      },
      error: (error) => {
        console.error('Error loading employee details:', error);
        this.isLoading = false;
      }
    });
  }

  loadSalaryStructure(employeeId: string) {
    this.payrollService.getSalaryStructure(Number(employeeId)).subscribe({
      next: (res) => { this.salaryStructure = res.salaryStructure; },
      error: () => { this.salaryStructure = null; }
    });
  }

  openEditModal() {
    // Always map existing salary structure fields to modal form
    this.salaryStructure = {
      id: this.salaryStructure?.id ?? 0,
      employee_id: this.salaryStructure?.employee_id ?? this.employee?.id ?? 0,
      basic_salary: this.salaryStructure?.basic_salary ?? 0,
      hra: this.salaryStructure?.hra ?? 0,
      conveyance: this.salaryStructure?.conveyance ?? 0,
      special_allowance: this.salaryStructure?.special_allowance ?? 0,
      pf_contribution: this.salaryStructure?.pf_contribution ?? 0,
      esi: this.salaryStructure?.esi ?? 0,
      professional_tax: this.salaryStructure?.professional_tax ?? 0,
      other_deductions: this.salaryStructure?.other_deductions ?? 0,
      effective_from: this.salaryStructure?.effective_from ?? '',
      effective_to: this.salaryStructure?.effective_to ?? null
    };
    // Autocalculate HRA if payrollDefaults.hra_percent exists
    if (
      this.payrollDefaults &&
      this.payrollDefaults.hra_percent &&
      this.salaryStructure &&
      this.salaryStructure.basic_salary
    ) {
      this.salaryStructure.hra = (this.salaryStructure.basic_salary * this.payrollDefaults.hra_percent) / 100;
    }
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  async saveEdits() {
    if (!this.employee?.id) return;
    // Convert empty string values to null for integer fields
    const formToSubmit = { ...this.editForm };
    if (formToSubmit.PayGradeId === '') formToSubmit.PayGradeId = null;
    if (formToSubmit.leave_plan_id === '') formToSubmit.leave_plan_id = null;
    if (formToSubmit.shift_policy_id === '') formToSubmit.shift_policy_id = null;
    if (formToSubmit.attendance_policy_id === '') formToSubmit.attendance_policy_id = null;
    if (formToSubmit.reporting_manager_id === '') formToSubmit.reporting_manager_id = null;

    // Map salary structure fields to backend expected fields
    let salaryPayload = null;
    if (this.salaryStructure) {
      salaryPayload = {
        basic: this.salaryStructure.basic_salary || 0,
        hra: this.salaryStructure.hra || 0,
        conveyance: this.salaryStructure.conveyance || 0,
        special_allowance: this.salaryStructure.special_allowance || 0,
        pf: this.salaryStructure.pf_contribution || 0,
        esi: this.salaryStructure.esi || 0,
        professional_tax: this.salaryStructure.professional_tax || 0,
        other_deductions: this.salaryStructure.other_deductions || 0
      };
    }

    try {
      await this.employeeService.updateEmployee(this.employee.id, formToSubmit).toPromise();
      if (this.isHR && salaryPayload) {
        // If salaryStructure is present, check if it has an id or not
        if ((this.salaryStructure as any)?.id) {
          await this.payrollService.updateSalaryStructure(Number(this.employee.id), salaryPayload).toPromise();
        } else {
          await this.payrollService.createSalaryStructure(Number(this.employee.id), salaryPayload).toPromise();
        }
      }
      this.showEditModal = false;
      this.loadEmployee(this.employee.id);
      this.loadSalaryStructure(this.employee.id);
      this.presentToast('Employee details updated successfully', 'success');
    } catch (err) {
      this.presentToast('Failed to update employee details', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar-placeholder.png';
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active': return 'success';
      case 'inactive': return 'medium';
      case 'on leave': return 'warning';
      case 'terminated': return 'danger';
      default: return 'medium';
    }
  }
}
