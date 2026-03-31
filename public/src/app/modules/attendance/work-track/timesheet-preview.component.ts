import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';

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
            <h2>{{ data.date | date: 'EEEE, MMM d' }}</h2>
            <p>{{ data.date | date: 'yyyy' }}</p>
          </div>
          <div class="hours-badge">
            <span class="count">{{ data.total_hours }}h</span>
            <span class="label">Total Logs</span>
          </div>
        </div>

        <!-- Timeline Section -->
        <div class="timeline-container" *ngIf="data?.hours_breakdown?.length">
          <div class="log-entry" *ngFor="let item of data.hours_breakdown; let i = index">
            <!-- Marker -->
            <div class="marker-col">
              <div class="dot shadow"></div>
            </div>

            <!-- Content Card -->
            <div class="content-col">
              <div class="task-card">
                <div class="card-header">
                  <span class="hours-tag">{{ item.hour }}</span>
                  <span class="hours-tag">{{ item.hours }}h Logged</span>
                </div>
                <p class="task-desc">{{ item.task || 'No description provided' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div *ngIf="data?.notes" class="notes-container ion-padding-top animate__animated animate__fadeInUp">
          <div class="notes-card">
             <div class="notes-header">
                <ion-icon name="document-text-outline"></ion-icon>
                <span>Additional Notes</span>
             </div>
             <p class="notes-content">{{ data.notes }}</p>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!data?.hours_breakdown?.length" class="empty-state">
           <ion-icon name="clipboard-outline"></ion-icon>
           <p>No tasks logged for this day</p>
        </div>
      </div>
    </ion-content>
  `,
})
export class TimesheetPreviewComponent {
  @Input() data: any;

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
