import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonRefresher, IonRefresherContent, IonSearchbar, IonSelect, IonSelectOption,
  LoadingController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { downloadOutline, calendarOutline, cashOutline, documentTextOutline } from 'ionicons/icons';
import { PayrollService, PayrollSlip } from '@core/services/payroll.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonSearchbar, IonSelect, IonSelectOption
  ]
})
export class PayrollPage implements OnInit {
  payslips: PayrollSlip[] = [];
  filteredPayslips: PayrollSlip[] = [];
  isLoading = false;
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];

  constructor(
    private payrollService: PayrollService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ downloadOutline, calendarOutline, cashOutline, documentTextOutline });
    
    // Generate years list (current year and 2 years back)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.years.push(currentYear - i);
    }
  }

  ngOnInit() {
    this.loadPayslips();
  }

  async loadPayslips(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.payrollService.getMyPayslips().subscribe({
      next: (response) => {
        this.payslips = response.payslips;
        this.applyFilter();
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: Error) => {
        console.error('Error loading payslips:', error);
        this.showToast('Failed to load payslips', 'danger');
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  applyFilter() {
    this.filteredPayslips = this.payslips.filter(slip => slip.year === this.selectedYear);
  }

  onYearChange() {
    this.applyFilter();
  }

  getMonthName(month: string): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNum = parseInt(month);
    return months[monthNum - 1] || month;
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'paid': return 'success';
      case 'finalized': return 'warning';
      case 'draft': return 'medium';
      default: return 'medium';
    }
  }

  async downloadPayslip(payslip: PayrollSlip) {
    const loading = await this.loadingController.create({
      message: 'Downloading payslip...'
    });
    await loading.present();

    // Note: You'll need to implement the download endpoint
    // For now, show a message
    await loading.dismiss();
    this.showToast('Payslip download will be available soon', 'warning');
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
