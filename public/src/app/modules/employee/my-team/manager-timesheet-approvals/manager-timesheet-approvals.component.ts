import * as ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController, ModalController } from '@ionic/angular';
import { TimesheetService } from '../../../../core/services/timesheet.service';
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

  teamSize: number = 0;
  submittedCount: number = 0;
  notSubmittedCount: number = 0;
  pendingApprovalsCount: number = 0;
  statisticsLoading = false;

  currentDate: string = '';
  filterType: string = 'all';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private timesheetService: TimesheetService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.loadPendingTimesheets();
    this.loadTeamStatistics();
  }

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
      error: (err) => {
        console.error('Error fetching team statistics:', err);
        this.showToast('Error loading team statistics', 'danger');
        this.statisticsLoading = false;
      }
    });
  }

  loadPendingTimesheets() {
    this.loading = true;
    const filters: any = {};
    if (this.startDate) filters.start_date = this.startDate;
    if (this.endDate) filters.end_date = this.endDate;
    if (this.filterType !== 'all') filters.timesheet_type = this.filterType;

    this.timesheetService.getManagerPendingTimesheets(filters).subscribe({
      next: (res: any[]) => {
        this.pendingTimesheets = res || [];
        this.filteredTimesheets = [...this.pendingTimesheets];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching pending timesheets:', err);
        this.loading = false;
      }
    });
  }

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

  filterTimesheets() {
    const text = this.searchText.toLowerCase();
    this.filteredTimesheets = this.pendingTimesheets.filter(t =>
      t.FirstName?.toLowerCase().includes(text) ||
      t.LastName?.toLowerCase().includes(text) ||
      t.WorkEmail?.toLowerCase().includes(text) ||
      t.project_name?.toLowerCase().includes(text)
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'submitted': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'medium';
    }
  }

  getTimesheetTypeIcon(type: string): string {
    return type === 'project' ? 'briefcase-outline' : 'time-outline';
  }

  formatTime(time: string | null): string {
    if (!time) return '--:--';
    return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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

  getTodayFormatted(): string { return this.formatDate(this.currentDate); }

  async downloadTimesheet(timesheet: any) {
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

    const formattedDate = this.formatDateDDMMYYYY(new Date(timesheet.date));
    let empDisplayName = timesheet.FullName || 
                         (timesheet.FirstName ? `${timesheet.FirstName} ${timesheet.LastName || ''}`.trim() : '') || 
                         'Employee';
    if (empDisplayName.startsWith('Meerasa ')) {
      empDisplayName = empDisplayName.replace(/^Meerasa\s+/, 'M.');
    }

    const techDisplay = ''; // Empty as of now

    const parseHourSlot = (hourStr: string): { from: string; to: string } => {
      if (!hourStr || typeof hourStr !== 'string') return { from: '-', to: '-' };
      const clean = hourStr.replace(/^[\[\s]+|[\]\s]+$/g, '').trim();
      const parts = clean.split(/\s*[-–—]\s*|\s+to\s+/i);
      if (parts.length >= 2) {
        return { from: parts[0].trim() || '-', to: parts[1].trim() || '-' };
      }
      return { from: clean || '-', to: '-' };
    };

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Work Report');

    ws.columns = [
      { key: 'colA', width: 14 },
      { key: 'colB', width: 85 },
      { key: 'colC', width: 18 },
      { key: 'colD', width: 18 }
    ];

    const thinBorder: Partial<ExcelJS.Borders> = {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } }
    };

    // Row 1
    const r1 = ws.addRow(['Name', empDisplayName, 'Date', formattedDate]);
    r1.getCell(1).font = { bold: true };
    r1.getCell(3).font = { bold: true };

    // Row 2
    const r2 = ws.addRow(['Technology', techDisplay, '', '']);
    r2.getCell(1).font = { bold: true };

    // Row 3
    const r3 = ws.addRow(['', '', 'Duration (HH:MI to HH:MI)', '']);
    ws.mergeCells('C3:D3');
    r3.getCell(3).font = { bold: true };
    r3.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };

    // Row 4
    const r4 = ws.addRow(['Sl. No', 'Work Completed', 'From', 'To']);
    r4.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    if (Array.isArray(breakdown) && breakdown.length > 0) {
      breakdown.forEach((b: any, index: number) => {
        const timeSlot = parseHourSlot(b.hour || b.time_slot || b.time || '');
        const row = ws.addRow([
          index + 1,
          b.task || b.task_description || b.description || '-',
          timeSlot.from,
          timeSlot.to
        ]);
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(2).alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
        row.getCell(3).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'top' };
      });
    } else {
      const summaryText = timesheet.work_description || timesheet.notes || '-';
      const row = ws.addRow([
        1,
        summaryText,
        'Full Day',
        '-'
      ]);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'top' };
      row.getCell(2).alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      row.getCell(3).alignment = { horizontal: 'center', vertical: 'top' };
      row.getCell(4).alignment = { horizontal: 'center', vertical: 'top' };
    }

    for (let r = 1; r <= ws.rowCount; r++) {
      const row = ws.getRow(r);
      for (let c = 1; c <= 4; c++) {
        row.getCell(c).border = thinBorder;
      }
    }

    const safeEmp = (empDisplayName || 'Employee').trim().replace(/[\/\\:*?"<>|]/g, '');
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${safeEmp}-WorkReport-${formattedDate}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    this.showToast('Timesheet downloaded successfully', 'success');
  }

  handleRefresh(event: any) {
    this.loadPendingTimesheets();
    this.loadTeamStatistics();
    setTimeout(() => { event.target.complete(); }, 1000);
  }

  private async showConfirmDialog(header: string, message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header, message,
      buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Confirm', role: 'confirm' }]
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
            if (!data.rejection_reason?.trim()) { this.showToast('Rejection reason is required', 'warning'); return false; }
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

  async goBack() {
    await this.modalCtrl.dismiss();
  }
}
