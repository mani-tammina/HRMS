import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from '../../../core/services/timesheet.service';
import { TimesheetPreviewComponent } from '../../../modules/attendance/work-track/timesheet-preview.component';
import { UpdateMeAnalyticsService } from '../../../core/analytics/update-me.analytics';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manager-timesheet-approvals',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './manager-timesheet-approvals.component.html',
  styleUrls: ['./manager-timesheet-approvals.component.scss'],
})
export class ManagerTimesheetApprovalsComponent implements OnInit {
  pendingTimesheets: any[] = [];
  filteredTimesheets: any[] = [];
  loading = false;
  searchText = '';

  // Team statistics
  teamSize = 0;
  submittedCount = 0;
  notSubmittedCount = 0;
  pendingApprovalsCount = 0;
  statisticsLoading = false;

  // Date tracking
  currentDate = '';

  // Filter options
  filterType = 'all';
  startDate = '';
  endDate = '';

  constructor(
    private timesheetService: TimesheetService,
    private analyticsService: UpdateMeAnalyticsService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.loadPendingTimesheets();
    this.loadTeamStatistics();
  }

  /* ================= LOAD TEAM STATISTICS ================= */

  loadTeamStatistics() {
    this.statisticsLoading = true;
    const filters: any = {};
    if (this.startDate) filters.start_date = this.startDate;
    if (this.endDate) filters.end_date = this.endDate;

    this.timesheetService.getManagerTeamStatistics(filters).subscribe({
      next: (res: any) => {
        this.teamSize = res.team_size || 0;
        this.submittedCount = res.submitted_count || 0;
        this.notSubmittedCount = res.not_submitted_count || 0;
        this.pendingApprovalsCount = res.pending_approvals || 0;
        this.statisticsLoading = false;
      },
      error: () => {
        this.showToast('Error loading team statistics', 'danger');
        this.statisticsLoading = false;
      }
    });
  }

  /* ================= LOAD PENDING TIMESHEETS ================= */

  loadPendingTimesheets() {
    this.loading = true;
    const filters: any = {};
    if (this.startDate) filters.start_date = this.startDate;
    if (this.endDate) filters.end_date = this.endDate;
    if (this.filterType !== 'all') filters.timesheet_type = this.filterType;

    this.timesheetService.getManagerPendingTimesheets(filters).subscribe({
      next: (res: any[]) => {
        this.pendingTimesheets = (res || []).map(t => ({
          ...t,
          ai_analytics_loading: true,
          ai_analytics_loaded: false,
          ai_flag: false,
          ai_summary: ''
        }));
        this.filteredTimesheets = [...this.pendingTimesheets];
        this.loading = false;
        this.fetchAiAnalyticsForTimesheets(this.pendingTimesheets);
      },
      error: () => { this.loading = false; }
    });
  }

  fetchAiAnalyticsForTimesheets(timesheets: any[]) {
    if (!timesheets || timesheets.length === 0) return;

    const dateGroups: { [dateStr: string]: Set<number | string> } = {};
    timesheets.forEach(t => {
      if (!t.date || !t.employee_id) return;
      const d = typeof t.date === 'string' ? t.date.split('T')[0] : new Date(t.date).toISOString().split('T')[0];
      if (!dateGroups[d]) {
        dateGroups[d] = new Set();
      }
      dateGroups[d].add(Number(t.employee_id));
    });

    Object.keys(dateGroups).forEach(dateStr => {
      const empIds = Array.from(dateGroups[dateStr]);
      this.analyticsService.getPendingTimesheetsAnalytics({
        tableName: 'pending_timesheets',
        employee_id: empIds,
        date: dateStr
      }).subscribe({
        next: (res: any) => {
          if (res?.success && res?.data) {
            Object.entries(res.data).forEach(([empId, data]: [string, any]) => {
              timesheets.forEach(t => {
                const tDate = typeof t.date === 'string' ? t.date.split('T')[0] : '';
                if (String(t.employee_id) === String(empId) && tDate === dateStr) {
                  t.ai_analytics_loading = false;
                  t.ai_analytics_loaded = true;
                  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    t.ai_flag = data.flag === true;
                    t.ai_summary = data.ai_summary || (t.ai_flag ? 'Anomalies detected in timesheet.' : 'Timesheet verified clean.');
                    t.ai_analytics = data;
                  } else {
                    t.ai_flag = false;
                    t.ai_summary = 'No anomalies detected in timesheet.';
                  }
                }
              });
            });
          } else {
            this.markDateGroupLoaded(timesheets, dateStr);
          }
        },
        error: () => {
          this.markDateGroupLoaded(timesheets, dateStr);
        }
      });
    });
  }

  private markDateGroupLoaded(timesheets: any[], dateStr: string) {
    timesheets.forEach(t => {
      const tDate = typeof t.date === 'string' ? t.date.split('T')[0] : '';
      if (tDate === dateStr && !t.ai_analytics_loaded) {
        t.ai_analytics_loading = false;
        t.ai_analytics_loaded = true;
        t.ai_flag = false;
        t.ai_summary = 'No anomalies detected in timesheet.';
      }
    });
  }

  /* ================= APPROVE TIMESHEET ================= */

  async approveTimesheet(timesheet: any) {
    const confirm = await this.showConfirmDialog(
      'Approve Timesheet',
      `Approve timesheet for ${timesheet.FirstName} ${timesheet.LastName}?`
    );
    if (!confirm) return;

    this.loading = true;
    this.timesheetService.approveTimesheet(timesheet.id).subscribe({
      next: () => {
        this.showToast('Timesheet approved successfully', 'success');
        this.loadPendingTimesheets();
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Error approving timesheet', 'danger');
        this.loading = false;
      }
    });
  }

  /* ================= REJECT TIMESHEET ================= */

  async rejectTimesheet(timesheet: any) {
    const reason = await this.showReasonDialog(
      'Reject Timesheet',
      `Reject timesheet for ${timesheet.FirstName} ${timesheet.LastName}?`
    );
    if (!reason) return;

    this.loading = true;
    this.timesheetService.rejectTimesheet(timesheet.id, reason).subscribe({
      next: () => {
        this.showToast('Timesheet rejected', 'success');
        this.loadPendingTimesheets();
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Error rejecting timesheet', 'danger');
        this.loading = false;
      }
    });
  }

  /* ================= FILTER METHODS ================= */

  onFilterTypeChange(event: any) {
    this.filterType = event.detail.value;
    this.loadPendingTimesheets();
  }

  onDateRangeChange() {
    if (this.startDate && this.endDate) {
      this.loadPendingTimesheets();
      this.loadTeamStatistics();
    }
  }

  clearFilters() {
    this.filterType = 'all';
    this.startDate = '';
    this.endDate = '';
    this.searchText = '';
    this.loadPendingTimesheets();
    this.loadTeamStatistics();
  }

  /* ================= SEARCH ================= */

  filterTimesheets() {
    const text = this.searchText.toLowerCase();
    this.filteredTimesheets = this.pendingTimesheets.filter(t =>
      t.FirstName?.toLowerCase().includes(text) ||
      t.LastName?.toLowerCase().includes(text) ||
      t.WorkEmail?.toLowerCase().includes(text) ||
      t.project_name?.toLowerCase().includes(text)
    );
  }

  async openAiSummary(timesheet: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const isFlagged = timesheet.ai_flag === true;
    const summaryText = timesheet.ai_summary || (isFlagged ? 'Anomalies detected in this timesheet.' : 'No anomalies detected. Timesheet looks clean!');
    const headerTitle = isFlagged ? 'AI Flagged Anomaly' : 'AI Verified Clean';

    const alert = await this.alertController.create({
      header: headerTitle,
      subHeader: `${timesheet.FirstName} ${timesheet.LastName} • ${this.formatDate(timesheet.date)}`,
      message: summaryText,
      cssClass: isFlagged ? 'ai-alert-flagged' : 'ai-alert-clean',
      buttons: [
        {
          text: 'View Timesheet',
          handler: () => {
            this.openPreview(timesheet);
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async openPreview(timesheet: any) {
    const ts = { ...timesheet };
    let attempts = 0;
    while (typeof ts.hours_breakdown === 'string' && attempts < 5) {
      attempts++;
      try {
        ts.hours_breakdown = JSON.parse(ts.hours_breakdown);
      } catch (e) {
        break;
      }
    }
    const modal = await this.modalCtrl.create({
      component: TimesheetPreviewComponent,
      cssClass: 'side-custom-popup view-work-log',
      componentProps: { data: ts },
    });
    await modal.present();
  }

  downloadTimesheet(timesheet: any) {
    if (!timesheet) {
      this.showToast('No timesheet data available to download', 'warning');
      return;
    }

    let breakdown = timesheet.hours_breakdown;
    let attempts = 0;
    while (typeof breakdown === 'string' && attempts < 3) {
      attempts++;
      try { breakdown = JSON.parse(breakdown); } catch { breakdown = null; break; }
    }

    let tableRows = '';
    if (Array.isArray(breakdown) && breakdown.length > 0) {
      breakdown.forEach((b: any, index: number) => {
        tableRows += `<tr><td>${index + 1}</td><td>${b.hour || '-'}</td><td>${b.task || b.task_description || b.description || '-'}</td><td>${b.hours !== undefined ? b.hours : '-'}</td></tr>`;
      });
    } else {
      const summaryText = timesheet.work_description || timesheet.notes || '-';
      tableRows = `<tr><td>1</td><td>Daily Summary</td><td>${summaryText}</td><td>${timesheet.total_hours || 0}</td></tr>`;
    }

    const formattedDate = this.formatDateDDMMYYYY(new Date(timesheet.date));
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head><meta charset="UTF-8" /></head>
    <body><table border="1">
      <tr><td>Employee</td><td colspan="3">${timesheet.FirstName} ${timesheet.LastName}</td></tr>
      <tr><td>Date</td><td colspan="3">${formattedDate}</td></tr>
      <tr><th>S.No</th><th>Time</th><th>Task</th><th>Hours</th></tr>
      ${tableRows}
      <tr><td>Note</td><td colspan="3">${timesheet.notes || '-'}</td></tr>
      <tr><td>Total</td><td colspan="3">${timesheet.total_hours}</td></tr>
    </table></body></html>`;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Timesheet_${timesheet.FirstName}_${formattedDate}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
    this.showToast('Timesheet downloaded successfully', 'success');
  }

  /* ================= UTILITY METHODS ================= */

  getTimesheetTypeIcon(type: string): string {
    return type === 'project' ? 'briefcase-outline' : 'time-outline';
  }

  formatDate(date: string | null): string {
    if (!date) return '--';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatDateDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getProfileImage(timesheet: any): string {
    if (timesheet?.profile_image) {
      return `${environment.apiURL}${timesheet.profile_image}?t=${Date.now()}`;
    }
    return '../../assets/Profile_Picture.png';
  }

  getDateRangeText(): string {
    if (this.startDate && this.endDate) {
      return `${this.formatDate(this.startDate)} - ${this.formatDate(this.endDate)}`;
    }
    return 'Current Month';
  }

  getTodayFormatted(): string {
    return this.formatDate(this.currentDate);
  }

  /* ================= DIALOG HELPERS ================= */

  private async showConfirmDialog(header: string, message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header, message,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Confirm', role: 'confirm' }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }

  private async showReasonDialog(header: string, message: string): Promise<string | null> {
    const alert = await this.alertController.create({
      header, message,
      inputs: [{ name: 'rejection_reason', type: 'textarea', placeholder: 'Rejection reason (required)' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject', role: 'reject',
          handler: (data) => {
            if (!data.rejection_reason?.trim()) {
              this.showToast('Rejection reason is required', 'warning');
              return false;
            }
            return true;
          }
        }
      ]
    });
    await alert.present();
    const { data, role } = await alert.onDidDismiss();
    if (role === 'reject' && data?.values?.rejection_reason?.trim()) {
      return data.values.rejection_reason;
    }
    return null;
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({ message, duration: 2000, color, position: 'top' });
    await toast.present();
  }

  /* ================= REFRESH ================= */

  handleRefresh(event: any) {
    this.loadPendingTimesheets();
    this.loadTeamStatistics();
    setTimeout(() => event.target.complete(), 1000);
  }

  async goBack() {
    await this.modalCtrl.dismiss();
  }
}
