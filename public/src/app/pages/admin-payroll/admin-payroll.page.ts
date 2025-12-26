import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSegment, IonSegmentButton,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon, IonInput,
  IonRefresher, IonRefresherContent, IonSpinner, IonSelect, IonSelectOption,
  AlertController, ToastController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  settingsOutline, cashOutline, documentTextOutline, playCircleOutline,
  checkmarkCircleOutline, downloadOutline, refreshOutline, saveOutline
} from 'ionicons/icons';
import { PayrollService, PayrollDefaults } from '@core/services/payroll.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-admin-payroll',
  templateUrl: './admin-payroll.page.html',
  styleUrls: ['./admin-payroll.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSegment, IonSegmentButton,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon, IonInput,
    IonRefresher, IonRefresherContent, IonSpinner, IonSelect, IonSelectOption
  ]
})
export class AdminPayrollPage implements OnInit {
  segment: 'defaults' | 'runs' | 'slips' = 'defaults';
  isLoading = false;
  isAdmin = false;
  isHR = false;

  // Payroll Defaults
  defaults: PayrollDefaults = {
    pf_percent: 12,
    esi_percent: 0.75,
    professional_tax: 200,
    variable_pay_percent: 10
  };
  defaultsId?: number;

  // Payroll Runs
  payrollRuns: any[] = [];
  
  // Generate Payroll
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  years: number[] = [];

  // All Slips
  allSlips: any[] = [];

  constructor(
    private payrollService: PayrollService,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({
      settingsOutline, cashOutline, documentTextOutline, playCircleOutline,
      checkmarkCircleOutline, downloadOutline, refreshOutline, saveOutline
    });

    // Generate years
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.years.push(currentYear - i);
    }
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAdmin = user?.role === 'admin';
      this.isHR = user?.role === 'hr';
    });
    
    this.loadData();
  }

  loadData() {
    if (this.segment === 'defaults') {
      this.loadDefaults();
    } else if (this.segment === 'runs') {
      this.loadPayrollRuns();
    } else if (this.segment === 'slips') {
      this.loadAllSlips();
    }
  }

  onSegmentChange(event: any) {
    this.segment = event.detail.value;
    this.loadData();
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  // ========== PAYROLL DEFAULTS ==========
  loadDefaults() {
    this.isLoading = true;
    this.payrollService.getPayrollDefaults().subscribe({
      next: (data) => {
        if (data && data.id) {
          this.defaults = data;
          this.defaultsId = data.id;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading defaults:', error);
        this.isLoading = false;
        this.showToast('Error loading payroll defaults', 'danger');
      }
    });
  }

  async saveDefaults() {
    if (!this.isAdmin) {
      this.showToast('Only admins can update payroll defaults', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Saving defaults...'
    });
    await loading.present();

    const observable = this.defaultsId
      ? this.payrollService.updatePayrollDefaults(this.defaultsId, this.defaults)
      : this.payrollService.createPayrollDefaults(this.defaults);

    observable.subscribe({
      next: (response: any) => {
        loading.dismiss();
        if (!this.defaultsId && response.id) {
          this.defaultsId = response.id;
        }
        this.showToast('Payroll defaults saved successfully', 'success');
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error saving defaults:', error);
        this.showToast('Error saving defaults', 'danger');
      }
    });
  }

  // ========== PAYROLL RUNS ==========
  loadPayrollRuns() {
    this.isLoading = true;
    this.payrollService.getAllPayrollRuns().subscribe({
      next: (runs) => {
        this.payrollRuns = runs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading payroll runs:', error);
        this.isLoading = false;
        this.showToast('Error loading payroll runs', 'danger');
      }
    });
  }

  async generatePayroll() {
    if (!this.isAdmin) {
      this.showToast('Only admins can generate payroll', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Generate Payroll',
      message: `Generate payroll for ${this.getMonthName(this.selectedMonth)} ${this.selectedYear}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Generate',
          handler: () => {
            this.executeGeneratePayroll();
          }
        }
      ]
    });
    await alert.present();
  }

  async executeGeneratePayroll() {
    const loading = await this.loadingController.create({
      message: 'Generating payroll...'
    });
    await loading.present();

    this.payrollService.generatePayroll(this.selectedMonth, this.selectedYear).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast('Payroll generated successfully', 'success');
        this.loadPayrollRuns();
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error generating payroll:', error);
        this.showToast(error.error?.error || 'Error generating payroll', 'danger');
      }
    });
  }

  getRunStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'paid': return 'success';
      case 'finalized': return 'warning';
      case 'draft': return 'medium';
      default: return 'medium';
    }
  }

  // ========== ALL SLIPS ==========
  loadAllSlips() {
    this.isLoading = true;
    this.payrollService.getAllPayslips().subscribe({
      next: (data) => {
        this.allSlips = data.slips || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading slips:', error);
        this.isLoading = false;
        this.showToast('Error loading salary slips', 'danger');
      }
    });
  }

  // ========== UTILITIES ==========
  getMonthName(month: number): string {
    return this.months.find(m => m.value === month)?.name || month.toString();
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
