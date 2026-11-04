import * as ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timesheet-preview',
  standalone: true,
  imports: [IonicModule, CommonModule],
  styleUrls: ['./timesheet-preview.component.scss'],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Work Log Preview</ion-title>
        <ion-buttons slot="end">
          <ion-button class="download-btn" (click)="downloadExcel()" title="Download Timesheet">
            <ion-icon slot="icon-only" name="download-outline"></ion-icon>
          </ion-button>
          <ion-button class="close-btn" (click)="close()">
            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-no-padding">
      <div class="preview-container">
        <!-- Date Summary Section -->
        <div class="header-summary animate__animated animate__fadeInDown">
          <div class="date-info">
            <h2>{{ (data?.date || data?.week_start_date || data?.created_at) | date: 'EEEE, MMM d' }}</h2>
            <p>{{ (data?.date || data?.week_start_date || data?.created_at) | date: 'yyyy' }}</p>
          </div>
          <div class="hours-badge">
            <span class="count">{{ data?.total_hours || 0 }}h</span>
            <span class="label">Total Logs</span>
          </div>
        </div>

        <!-- Timeline Section -->
        <div class="timeline-container" *ngIf="parsedLogs?.length">
          <div class="log-entry" *ngFor="let item of parsedLogs; let i = index">
            <!-- Marker -->
            <div class="marker-col">
              <div class="dot shadow"></div>
            </div>

            <!-- Content Card -->
            <div class="content-col">
              <div class="task-card">
                <div class="card-header">
                  <span class="hours-tag" *ngIf="item.hour">{{ item.hour }}</span>
                  <span class="hours-tag" *ngIf="item.hours !== undefined && item.hours !== null">{{ formatHoursDisplay(item.hours) }}</span>
                </div>
                <p class="task-desc">{{ item.task || 'No description provided' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Notes Section if present and not duplicate -->
        <div class="notes-container ion-padding-top animate__animated animate__fadeInUp" *ngIf="hasExtraNotes()">
         
        </div>

        <!-- Empty State -->
        <div *ngIf="!parsedLogs?.length && !data?.notes && !data?.work_description" class="empty-state">
           <ion-icon name="clipboard-outline"></ion-icon>
           <p>No tasks logged for this day</p>
        </div>
      </div>
    </ion-content>
  `,
})
export class TimesheetPreviewComponent implements OnInit, OnChanges {
  @Input() data: any;
  parsedLogs: any[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.updateLogs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updateLogs();
    }
  }

  async downloadExcel() {
    if (!this.data) return;
    const timesheet = this.data;
    const logs = this.parsedLogs && this.parsedLogs.length ? this.parsedLogs : [];

    const rawDate = timesheet.date || timesheet.week_start_date || timesheet.created_at;
    let formattedDate = rawDate;
    try {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        formattedDate = `${day}-${month}-${year}`;
      }
    } catch {}

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

    // Rows 5+
    if (logs.length > 0) {
      logs.forEach((b: any, index: number) => {
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
      const row = ws.addRow([
        1,
        timesheet.notes || timesheet.work_description || '-',
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
  }

  close() {
    this.modalCtrl.dismiss().catch(err => console.error('Error closing modal:', err));
  }

  formatHoursDisplay(hours: any): string {
    if (hours === undefined || hours === null || hours === '') return '0hr Logged';
    const str = String(hours).trim();
    if (str.includes('hr') || str.includes('min')) {
      return `${str} Logged`;
    }
    return `${str}h Logged`;
  }

  getNoteContent(): string {
    const rawData = this.data?.timesheet || this.data?.data || this.data;
    return (rawData?.notes || rawData?.work_description || '').trim();
  }

  hasExtraNotes(): boolean {
    const noteText = this.getNoteContent();
    if (!noteText || !this.parsedLogs?.length) return false;

    // If there is only 1 entry and its task description is equal to noteText, hide redundant notes box
    if (this.parsedLogs.length === 1 && this.parsedLogs[0].task.trim() === noteText) {
      return false;
    }

    // If joined tasks equal noteText, hide redundant notes box
    const joinedTasks = this.parsedLogs.map(l => l.task).join(' • ').trim();
    if (joinedTasks === noteText) {
      return false;
    }

    return true;
  }

  private updateLogs() {
    if (!this.data) {
      this.parsedLogs = [];
      return;
    }

    // Support nested data structures (e.g. data.timesheet or data.data)
    const rawData = this.data.timesheet || this.data.data || this.data;

    let breakdown = rawData.hours_breakdown;
    let attempts = 0;
    while (typeof breakdown === 'string' && attempts < 5) {
      attempts++;
      try {
        breakdown = JSON.parse(breakdown);
      } catch (e) {
        break;
      }
    }

    // 1. Array of hours breakdown slots
    if (Array.isArray(breakdown) && breakdown.length > 0) {
      this.parsedLogs = breakdown.map((b: any, idx: number) => {
        if (typeof b === 'string') {
          return this.parseSingleTaskText(b, idx + 1, 0);
        }
        const hourLabel = b.hour || b.time_slot || b.time || b.slot || b.timeSlot || b.hours_slot || `Slot ${idx + 1}`;
        const hoursNum = b.hours !== undefined && b.hours !== null
          ? (typeof b.hours === 'string' && (b.hours.includes('hr') || b.hours.includes('min')) ? b.hours : Number(b.hours))
          : (b.hours_worked !== undefined ? (typeof b.hours_worked === 'string' && (b.hours_worked.includes('hr') || b.hours_worked.includes('min')) ? b.hours_worked : Number(b.hours_worked)) : (b.duration || 0));
        const taskText = b.task || b.task_description || b.notes || b.description || b.work_description || b.details || b.summary || b.task_name || b.comment || 'No description provided';

        return {
          hour: hourLabel,
          hours: hoursNum,
          task: taskText
        };
      });
      return;
    }

    // 2. Array of entries
    if (Array.isArray(rawData.entries) && rawData.entries.length > 0) {
      this.parsedLogs = rawData.entries.map((e: any, idx: number) => ({
        hour: e.hour || e.time_slot || (e.project_name ? `${e.project_name}` : (e.work_date ? new Date(e.work_date).toLocaleDateString() : `Slot ${idx + 1}`)),
        hours: e.hours_worked !== undefined ? Number(e.hours_worked) : (e.hours || 0),
        task: e.task_description || e.task || e.notes || e.description || e.project_name || 'No description provided'
      }));
      return;
    }

    // 3. Fallback: Parse work_description or notes summary string into slots
    const summaryText = rawData.work_description || rawData.notes;
    if (summaryText && typeof summaryText === 'string' && summaryText.trim()) {
      this.parsedLogs = this.parseSummaryIntoTasks(summaryText, rawData.total_hours || 0);
      return;
    }

    this.parsedLogs = [];
  }

  private parseSingleTaskText(text: string, defaultSlotIndex: number, defaultHours: number): any {
    const trimmed = text.trim();
    // Check if string contains embedded slot time like "[09:00 AM - 10:00 AM] Task text" or "09:00 AM - 10:00 AM: Task text"
    const slotMatch = trimmed.match(/^(?:\[([^\]]+)\]|([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?(?:\s*-\s*[0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?)?):?)\s*(.+)$/i);
    if (slotMatch) {
      const timeSlot = (slotMatch[1] || slotMatch[2] || '').trim();
      const taskDesc = slotMatch[3].trim();
      return {
        hour: timeSlot || `Slot ${defaultSlotIndex}`,
        hours: defaultHours,
        task: taskDesc
      };
    }
    return {
      hour: `Slot ${defaultSlotIndex}`,
      hours: defaultHours,
      task: trimmed
    };
  }

  private parseSummaryIntoTasks(summaryText: string, totalHours: number): any[] {
    if (!summaryText || !summaryText.trim()) return [];

    const text = summaryText.trim();
    let taskStrings: string[] = [];

    if (text.includes(' • ')) {
      taskStrings = text.split(' • ').map(t => t.trim()).filter(Boolean);
    } else if (text.includes('\n')) {
      taskStrings = text.split('\n').map(t => t.trim()).filter(Boolean);
    } else if (text.includes(';')) {
      taskStrings = text.split(';').map(t => t.trim()).filter(Boolean);
    } else if (/\b\d+[\.\)]\s+/.test(text)) {
      taskStrings = text.split(/\b\d+[\.\)]\s+/).map(t => t.trim()).filter(Boolean);
    } else {
      taskStrings = [text];
    }

    const calculatedHours = taskStrings.length > 0
      ? Math.round(((totalHours || 0) / taskStrings.length) * 100) / 100
      : (totalHours || 0);

    return taskStrings.map((t, idx) => this.parseSingleTaskText(t, idx + 1, calculatedHours));
  }
}


