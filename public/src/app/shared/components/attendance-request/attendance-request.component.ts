import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WorkFromHomeService } from '../../../core/services/work-from-home.service';

interface AttendanceRequestHistory {
  date: string;
  request: string;
  requestedOn: string;
  note: string;
  reason?: string;
  status: string;
  lastAction: string;
  startDate: string;
  totaldays: number;
  endDate?: string;
  nextApprover?: string;
}

@Component({
  selector: 'app-attendance-request',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './attendance-request.component.html',
  styleUrls: ['./attendance-request.component.scss'],
})
export class AttendanceRequestComponent implements OnInit, OnChanges {
  @Input() employeeId: number | null = null;
  @Input() isHRView: boolean = false;

  attendanceRequestsHistory: { type: string; dateRange: string; records: AttendanceRequestHistory[] }[] = [];

  constructor(
    private wfhService: WorkFromHomeService
  ) { }

  ngOnInit() {
    this.initializeStaticSections();
    this.loadWFHRequests();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeId'] && !changes['employeeId'].firstChange) {
      this.loadWFHRequests();
    }
  }

  private initializeStaticSections() {
    this.attendanceRequestsHistory = [
      { type: 'Work From Home / On Duty Requests', dateRange: '', records: [] },
      { type: 'Regularization Requests', dateRange: '', records: [] },
      { type: 'Remote Clock In Requests', dateRange: '', records: [] },
      { type: 'Partial Day Requests', dateRange: '', records: [] },
    ];
  }

  private loadWFHRequests() {
    const empId = this.employeeId ? this.employeeId : undefined;
    this.wfhService.getAllWFHRequests(empId).subscribe({
      next: (res: any) => {
        const resData = Array.isArray(res) ? res : (res.data || res.requests || []);
        const wfhRecords = resData.filter((item: any) => item.leave_type === 'WFH').map((item: any) => this.mapWFHRecord(item, 'Work From Home'));
        const remoteRecords = resData.filter((item: any) => item.leave_type === 'Remote').map((item: any) => this.mapWFHRecord(item, 'Remote Clock In'));
        this.assignGroup('Work From Home / On Duty Requests', wfhRecords);
        this.assignGroup('Remote Clock In Requests', remoteRecords);
      },
      error: () => {
        this.assignGroup('Work From Home / On Duty Requests', []);
        this.assignGroup('Remote Clock In Requests', []);
      },
    });
  }

  private mapWFHRecord(item: any, requestLabel: string): AttendanceRequestHistory {
    return {
      date: this.formatDate(item.applied_at || item.created_at || item.start_date),
      request: requestLabel,
      requestedOn: this.formatRequestedOn(item.created_at || item.applied_at),
      note: item.reason,
      reason: item.reason,
      totaldays: item.total_days || 1,
      status: this.formatStatus(item.status),
      lastAction: item.approved_by ? `Approved by ${item.approved_by}` : (item.updated_by || '-'),
      startDate: this.formatRequestedOn(item.start_date),
      endDate: this.formatRequestedOn(item.end_date || item.start_date),
      nextApprover: item.next_approver || '-',
    };
  }

  private assignGroup(type: string, records: AttendanceRequestHistory[]) {
    const group = this.attendanceRequestsHistory.find(g => g.type === type);
    if (group) group.records = records;
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private formatRequestedOn(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private formatStatus(status: string): string {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
  }
}
