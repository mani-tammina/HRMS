import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, 
  IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonList, IonItem, IonIcon, IonButton, IonButtons, 
  IonBackButton, IonBadge, IonChip, IonAvatar, IonSelect, IonSelectOption,
  IonRefresher, IonRefresherContent, IonSpinner, IonInput, IonGrid,
  IonRow, IonCol, IonModal, IonItemDivider, AlertController, ToastController
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { 
  cash, people, documentText, calendar, barChart, 
  addCircle, download, lockClosed, lockOpen, refresh,
  eye, create, checkmarkCircle
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-payroll-management',
  templateUrl: './admin-payroll-management.page.html',
  styleUrls: ['./admin-payroll-management.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, 
    IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonList, IonItem, IonIcon, IonButton, IonButtons, 
    IonBackButton, IonBadge, IonChip, IonAvatar, IonSelect, IonSelectOption,
    IonRefresher, IonRefresherContent, IonSpinner, IonInput, IonGrid,
    IonRow, IonCol, IonModal, IonItemDivider
  ]
})
export class AdminPayrollManagementPage implements OnInit {
  selectedSegment: string = 'runs';
  
  // Data
  payrollRuns: any[] = [];
  allPayslips: any[] = [];
  employees: any[] = [];
  salaryStructures: any[] = [];
  payrollDefaults: any = {};
  loading = false;
  
  // Generate Payroll Form
  generateForm = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };
  
  // Salary Structure Form
  salaryForm: any = {
    employee_id: null,
    basic: 0,
    hra: 0,
    conveyance: 0,
    special_allowance: 0,
    pf: 0,
    esi: 0,
    professional_tax: 0,
    other_deductions: 0,
    gross_salary: 0,
    net_salary: 0
  };
  
  showSalaryModal = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ 
      cash, people, documentText, calendar, barChart, 
      addCircle, download, lockClosed, lockOpen, refresh,
      eye, create, checkmarkCircle
    });
  }

  ngOnInit() {
    this.loadData();
    this.loadEmployees();
    this.loadPayrollDefaults();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    if (this.selectedSegment === 'runs') {
      this.loadPayrollRuns();
    } else if (this.selectedSegment === 'slips') {
      this.loadAllPayslips();
    } else if (this.selectedSegment === 'structures') {
      this.loadSalaryStructures();
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.loadData();
  }

  loadPayrollRuns() {
    this.loading = true;
    const token = localStorage.getItem('token');
    
    this.http.get<any[]>(`${environment.apiUrl}/payroll/runs`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.payrollRuns = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading payroll runs:', err);
        this.loading = false;
      }
    });
  }

  loadAllPayslips() {
    this.loading = true;
    const token = localStorage.getItem('token');
    
    this.http.get<any[]>(`${environment.apiUrl}/payroll/slips/all`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.allPayslips = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading payslips:', err);
        this.loading = false;
      }
    });
  }

  loadSalaryStructures() {
    this.loading = true;
    // Load all employees with their salary structures
    this.loadEmployees();
    this.loading = false;
  }

  loadEmployees() {
    const token = localStorage.getItem('token');
    
    this.http.get<any[]>(`${environment.apiUrl}/employees`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  loadPayrollDefaults() {
    const token = localStorage.getItem('token');
    
    this.http.get<any>(`${environment.apiUrl}/payroll/defaults`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.payrollDefaults = data;
      },
      error: (err) => {
        console.error('Error loading payroll defaults:', err);
      }
    });
  }

  async generatePayroll() {
    const alert = await this.alertController.create({
      header: 'Generate Payroll',
      message: `Generate payroll for ${this.getMonthName(this.generateForm.month)} ${this.generateForm.year}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Generate',
          handler: () => {
            this.performPayrollGeneration();
          }
        }
      ]
    });
    await alert.present();
  }

  performPayrollGeneration() {
    this.loading = true;
    const token = localStorage.getItem('token');
    
    this.http.post(`${environment.apiUrl}/payroll/generate`, this.generateForm, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: async (response: any) => {
        this.loading = false;
        const toast = await this.toastController.create({
          message: `Payroll generated successfully! Processed ${response.processed} employees.`,
          duration: 3000,
          color: 'success'
        });
        await toast.present();
        this.loadPayrollRuns();
      },
      error: async (err) => {
        console.error('Error generating payroll:', err);
        this.loading = false;
        const toast = await this.toastController.create({
          message: 'Failed to generate payroll',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  viewRunDetails(runId: number) {
    this.router.navigate(['/payroll-run-details', runId]);
  }

  viewPayslip(slipId: number) {
    this.router.navigate(['/payslip', slipId]);
  }

  openSalaryStructureModal(employee?: any) {
    if (employee) {
      // Load existing structure
      const token = localStorage.getItem('token');
      this.http.get<any>(`${environment.apiUrl}/payroll/salary/structure/${employee.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data) => {
          if (data) {
            this.salaryForm = { ...data, employee_id: employee.id };
          } else {
            this.salaryForm = { employee_id: employee.id };
          }
          this.showSalaryModal = true;
        },
        error: (err) => {
          console.error('Error loading salary structure:', err);
          this.salaryForm = { employee_id: employee.id };
          this.showSalaryModal = true;
        }
      });
    } else {
      this.salaryForm = {
        employee_id: null,
        basic: 0,
        hra: 0,
        conveyance: 0,
        special_allowance: 0,
        pf: 0,
        esi: 0,
        professional_tax: 0,
        other_deductions: 0
      };
      this.showSalaryModal = true;
    }
  }

  calculateSalary() {
    const basic = parseFloat(this.salaryForm.basic || 0);
    const hra = parseFloat(this.salaryForm.hra || 0);
    const conveyance = parseFloat(this.salaryForm.conveyance || 0);
    const special = parseFloat(this.salaryForm.special_allowance || 0);
    
    const pf = parseFloat(this.salaryForm.pf || 0);
    const esi = parseFloat(this.salaryForm.esi || 0);
    const pt = parseFloat(this.salaryForm.professional_tax || 0);
    const other = parseFloat(this.salaryForm.other_deductions || 0);
    
    this.salaryForm.gross_salary = basic + hra + conveyance + special;
    this.salaryForm.net_salary = this.salaryForm.gross_salary - (pf + esi + pt + other);
  }

  async saveSalaryStructure() {
    if (!this.salaryForm.employee_id) {
      const toast = await this.toastController.create({
        message: 'Please select an employee',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const token = localStorage.getItem('token');
    
    this.http.post(
      `${environment.apiUrl}/payroll/salary/structure/${this.salaryForm.employee_id}`,
      this.salaryForm,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Salary structure saved successfully',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.showSalaryModal = false;
        this.loadSalaryStructures();
      },
      error: async (err) => {
        console.error('Error saving salary structure:', err);
        const toast = await this.toastController.create({
          message: 'Failed to save salary structure',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'generated': return 'primary';
      case 'paid': return 'success';
      default: return 'medium';
    }
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
