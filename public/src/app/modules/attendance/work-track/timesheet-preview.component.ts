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
            <h3 *ngIf="data?.FirstName" style="margin: 0 0 6px 0; font-size: 15px; font-weight: 600; color: rgba(255, 255, 255, 0.95); letter-spacing: 0.3px;">
              {{ data?.FirstName }} {{ data?.LastName }}
            </h3>
            <h2>{{ (data?.date || data?.week_start_date || data?.created_at) | date: 'EEEE, MMM d' }}</h2>
            <p>{{ (data?.date || data?.week_start_date || data?.created_at) | date: 'yyyy' }}</p>
          </div>
          <div class="hours-badge">
            <span class="count">{{ data?.total_hours || 0 }}h</span>
            <span class="label">Total Logs</span>
          </div>
        </div>

        <!-- AI Insights Banner if available -->
        <div
          class="ai-preview-banner animate__animated animate__fadeIn"
          *ngIf="data?.ai_summary"
          [ngClass]="data?.ai_flag ? 'ai-banner-danger' : 'ai-banner-success'"
        >
          <div class="ai-preview-icon">
            <ion-icon [name]="data?.ai_flag ? 'alert-circle' : 'checkmark-circle'"></ion-icon>
          </div>
          <div class="ai-preview-text">
            <h4>{{ data?.ai_flag ? 'AI Flagged Anomaly' : 'AI Verified Clean' }}</h4>
            <p>{{ data?.ai_summary }}</p>
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
                  <span class="hours-tag" *ngIf="item.hours !== undefined && item.hours !== null">{{ item.hours }}h Logged</span>
                </div>
                <p class="task-desc">{{ item.task || 'No description provided' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Notes Section if present and not duplicate -->
        <div class="notes-container ion-padding-top animate__animated animate__fadeInUp" *ngIf="hasExtraNotes()">
          <div class="notes-card">
            <div class="notes-header">
              <ion-icon name="document-text-outline"></ion-icon>
              <span>Notes / Description</span>
            </div>
            <p class="notes-content">{{ getNoteContent() }}</p>
          </div>
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

  close() {
    this.modalCtrl.dismiss().catch(err => console.error('Error closing modal:', err));
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
        const hoursNum = b.hours !== undefined && b.hours !== null ? Number(b.hours) : (b.hours_worked !== undefined ? Number(b.hours_worked) : (b.duration || 0));
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


