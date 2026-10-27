import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, takeUntil, catchError, of } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import {
  ToastController,
  ModalController,
} from '@ionic/angular';

import { TimesheetService } from 'src/app/core/services/timesheet.service';
import { TimesheetPreviewComponent } from './timesheet-preview.component';
import { LeaverequestService, MyLeave } from 'src/app/core/services/leaverequest.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { WeeklyOffPolicyService, WeeklyOffPolicy } from 'src/app/core/services/weekly-off-policy.service';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-work-track',
  standalone: false,
  templateUrl: './work-track.page.html',
  styleUrls: ['./work-track.page.scss'],
})
export class WorkTrackPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  // Client timesheet upload state
  clientUploadFile: File | null = null;
  clientUploadMonth: number = new Date().getMonth() + 1;
  clientUploadYear: number = new Date().getFullYear();
  clientUploadProjectId: number | null = null;
  clientUploadLoading = false;
  /**
   * Handle file input change for client timesheet upload
   */
  onClientUploadFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.clientUploadFile = file;
    }
  }

  /**
   * Upload client timesheet for selected project
   */
  async uploadClientTimesheet(projectId: number) {
    if (!this.clientUploadFile) {
      this.showToast('Please select a file to upload');
      return;
    }
    this.clientUploadLoading = true;
    const formData = new FormData();
    formData.append('file', this.clientUploadFile);
    formData.append('month', this.clientUploadMonth.toString());
    formData.append('year', this.clientUploadYear.toString());
    formData.append('project_id', projectId.toString());
    this.timesheetService.uploadClientTimesheet(formData).subscribe({
      next: (res) => {
        this.clientUploadLoading = false;
        this.showToast(res?.message || 'Client timesheet uploaded successfully');
        this.clientUploadFile = null;
      },
      error: (err) => {
        this.clientUploadLoading = false;
        this.showToast('Failed to upload client timesheet');
      }
    });
  }

  /* ================= EXISTING ================= */
  workTrackForm!: FormGroup;
  loading = false;
  isEditing = false;
  editingTimesheetId: number | null = null;

  myTimesheets: any[] = [];
  loadingList = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  paginatedTimesheets: any[] = [];

  // Filters
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

  today = this.formatDate(new Date());
  todayDate = '';

  /* ================= ASSIGNMENT STATE ================= */
  loadingStatus = true;
  hasProject = false;
  assignments: any[] = [];
  timesheetType: 'regular' | 'project' = 'regular'; // fallback default
  shiftPolicy: any = null;

  /* ================= ATTENDANCE / LEAVE INFO ================= */
  highlightedDates: any[] = [];
  leaveTooltipMap: Map<string, string> = new Map();
  weekOffsMap: Set<string> = new Set();
  selectedDateStatus: string = '';

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private leaveService: LeaverequestService,
    private employeeService: EmployeeService,
    private weeklyOffService: WeeklyOffPolicyService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.initializeYears();
    this.setupDisplayDate();
    this.loadAllData();
  }

  setupDisplayDate() {
    const d = new Date();
    this.todayDate = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAllData() {
    const currentYear = new Date().getFullYear();
    this.loadingStatus = true;

    console.log('🚀 [WorkTrack] loadAllData() starting...');

    forkJoin({
      assignment: this.timesheetService.getAssignmentStatus().pipe(
        catchError(err => {
          console.error('❌ [WorkTrack] getAssignmentStatus error:', err);
          return of({ has_project: false, assignments: [], timesheet_type: 'regular' });
        })
      ),
      leaves: this.leaveService.getMyLeaves(currentYear).pipe(
        catchError(err => {
          console.error('❌ [WorkTrack] getMyLeaves error:', err);
          return of([]);
        })
      ),
      profile: this.employeeService.getMyProfile().pipe(
        catchError(err => {
          console.error('❌ [WorkTrack] getMyProfile error:', err);
          return of({ weekly_off_policy_id: null });
        })
      ),
      policies: this.weeklyOffService.getWeeklyOffPolicies().pipe(
        catchError(err => {
          console.error('❌ [WorkTrack] getWeeklyOffPolicies error:', err);
          return of([]);
        })
      ),
      shiftPolicies: this.adminService.getShiftPolicies().pipe(
        catchError(err => {
          console.error('❌ [WorkTrack] getShiftPolicies error:', err);
          return of([]);
        })
      )
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        try {
          console.log('🔍 [WorkTrack] Full forkJoin Response:', res);

          // Extract assignment data (forkJoin wraps it with 'assignment' key)
          const assignmentData = res?.assignment;
          console.log('📋 [WorkTrack] Assignment Data:', assignmentData);

          if (!assignmentData) {
            console.error('❌ [WorkTrack] Assignment data is null/undefined');
            this.hasProject = false;
            this.assignments = [];
            this.timesheetType = 'regular';
            this.loadingStatus = false;
            this.cdr.detectChanges();
            return;
          }

          // Set project status based on API response
          this.hasProject = assignmentData.has_project === true;
          this.timesheetType = assignmentData.timesheet_type || 'regular';
          this.assignments = assignmentData.assignments || [];
          this.loadingStatus = false;

          // Process shift policy
          const shiftId = res.profile?.shift_policy_id || res.profile?.ShiftPolicyId;
          const allShifts = Array.isArray(res.shiftPolicies) ? res.shiftPolicies : (res.shiftPolicies?.data || []);
          this.shiftPolicy = allShifts.find((p: any) => p.id === shiftId) || null;

          console.log('✅ [WorkTrack] State Updated:');
          console.log('  • hasProject:', this.hasProject);
          console.log('  • timesheetType:', this.timesheetType);
          console.log('  • assignments.length:', this.assignments.length);

          if (this.hasProject && this.assignments.length > 0) {
            console.log('✓ [WorkTrack] Project-based employee with assignments');
            console.log('  • First project:', this.assignments[0].project_name);
            this.workTrackForm.patchValue({ project_id: this.assignments[0].project_id });
          } else if (!this.hasProject) {
            console.log('ℹ️ [WorkTrack] Regular employee (no project assigned)');
          } else {
            console.log('⚠️ [WorkTrack] hasProject=true but no assignments found');
          }

          this.initializeFirstTimeSlot();
          this.loadMyTimesheets();

          // Leaves Logic
          this.processLeaves(res.leaves);

          // Week off Logic
          const policyId = res.profile?.weekly_off_policy_id;
          const policy = res.policies?.find((p: any) => p.id === policyId);
          if (policy) {
            this.mapWeekOffs(policy);
          }

          this.updateHighlightedDates();
          this.checkSelectedDateStatus(this.workTrackForm.get('date')?.value);

          // Force change detection
          this.cdr.detectChanges();
        } catch (error) {
          console.error('❌ [WorkTrack] Error processing response:', error);
          this.hasProject = false;
          this.assignments = [];
          this.loadingStatus = false;
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        console.error('❌ [WorkTrack] API Error:', err);
        this.loadingStatus = false;
        this.initializeFirstTimeSlot();
        this.loadMyTimesheets();
      }
    });

    // Listen to form value changes
    this.workTrackForm.get('date')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.checkSelectedDateStatus(val);
      });
  }

  processLeaves(leaves: MyLeave[]) {
    if (!Array.isArray(leaves)) return;
    const activeLeaves = leaves.filter(l => {
      const s = (l.status || '').toUpperCase();
      const rawType = (l as any).type_code || (l as any).type_name || l.leave_type || '';
      const upper = String(rawType).toUpperCase();
      if (upper === 'WFH' || upper === 'REMOTE') return false;
      return s === 'APPROVED' || s === 'PENDING';
    });
    activeLeaves.forEach(leave => {
      const isPending = (leave.status || '').toUpperCase() === 'PENDING';
      const baseType = leave.type_name || leave.type_code || leave.leave_type || 'Leave';
      const leaveType = isPending ? `${baseType} (Pending Approval)` : baseType;
      const fromRaw = leave.start_date || leave.from_date;
      const toRaw = leave.end_date || leave.to_date || fromRaw;
      if (!fromRaw) return;

      const from = new Date(fromRaw);
      const to = new Date(toRaw || fromRaw);
      let d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
      const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
      while (d <= end) {
        this.leaveTooltipMap.set(this.formatDate(d), leaveType);
        d.setDate(d.getDate() + 1);
      }
    });
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
      this.years.push(i);
    }
  }

  /* ================= FORM ================= */

  initForm() {
    this.workTrackForm = this.fb.group({
      date: [this.today, Validators.required],
      project_id: [null],
      hours_breakdown: this.fb.array([]),
      work_description: [''],
      notes: [''],
    });
  }

  get breakdowns(): FormArray {
    return this.workTrackForm.get('hours_breakdown') as FormArray;
  }

  /* Initialize first time slot based on shift timing */
  initializeFirstTimeSlot() {
    // Clear existing rows
    this.breakdowns.clear();

    let firstTimeSlot = '';

    if (this.shiftPolicy && this.shiftPolicy.start_time) {
      firstTimeSlot = this.generateTimeSlot(this.shiftPolicy.start_time);
    } else if (this.hasProject && (this.assignments?.length || 0) > 0) {
      // For project-based employees, use project shift timing
      const assignment = this.assignments[0];
      if (assignment.start_time) {
        firstTimeSlot = this.generateTimeSlot(assignment.start_time);
      }
    } else {
      // For regular employees, use default 09:00
      firstTimeSlot = this.generateTimeSlot('09:00');
    }

    // Add first row with calculated time slot
    this.breakdowns.push(
      this.fb.group({
        hour: [firstTimeSlot, Validators.required],
        task: ['', Validators.required],
        hours: ['1hr', Validators.required],
      })
    );
  }



  mapWeekOffs(policy: WeeklyOffPolicy) {
    this.weekOffsMap.clear();
    const offDays: number[] = [];
    if (policy.sunday_off) { this.weekOffsMap.add('0'); offDays.push(0); }
    if (policy.monday_off) { this.weekOffsMap.add('1'); offDays.push(1); }
    if (policy.tuesday_off) { this.weekOffsMap.add('2'); offDays.push(2); }
    if (policy.wednesday_off) { this.weekOffsMap.add('3'); offDays.push(3); }
    if (policy.thursday_off) { this.weekOffsMap.add('4'); offDays.push(4); }
    if (policy.friday_off) { this.weekOffsMap.add('5'); offDays.push(5); }
    if (policy.saturday_off) { this.weekOffsMap.add('6'); offDays.push(6); }

    // Generate specific week-off dates for the current year to highlight in calendar
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (offDays.includes(d.getDay())) {
        // This is a week off
        // We don't need to store all in weekOffsMap, just for highlighting
      }
    }
  }

  updateHighlightedDates() {
    const highlights: any[] = [];

    // 1. Add Leaves (Purple)
    this.leaveTooltipMap.forEach((type, dateStr) => {
      highlights.push({
        date: dateStr,
        textColor: '#ffffff',
        backgroundColor: '#b39ddb'
      });
    });

    // 2. Add Week Offs (Gray/Blue) - for the current month roughly
    // To keep it simple and performant, we only highlight weekoffs 
    // for a 6-month window around today
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 3, 1);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay().toString();
      const dateStr = this.formatDate(d);

      // Only highlight if it's NOT already a leave
      if (this.weekOffsMap.has(day) && !this.leaveTooltipMap.has(dateStr)) {
        highlights.push({
          date: dateStr,
          textColor: '#475569',
          backgroundColor: '#f1f5f9'
        });
      }
    }

    this.highlightedDates = highlights;
  }

  checkSelectedDateStatus(dateStr: string) {
    if (!dateStr) {
      this.selectedDateStatus = '';
      return;
    }

    const existing = this.findExistingTimesheetByDate(dateStr);
    if (existing && (this.editingTimesheetId === null || Number(existing.id) !== Number(this.editingTimesheetId))) {
      const displayStatus = this.getDisplayStatus(existing.status);
      this.selectedDateStatus = `⚠️ Already Submitted (Status: ${displayStatus})`;
      return;
    }

    const leave = this.leaveTooltipMap.get(dateStr);
    if (leave) {
      this.selectedDateStatus = `🏖️ On Leave: ${leave}`;
      return;
    }

    const day = new Date(dateStr).getDay().toString();
    if (this.weekOffsMap.has(day)) {
      this.selectedDateStatus = `🏠 Weekly Off`;
      return;
    }

    this.selectedDateStatus = '';
  }

  onDateChange(event: any) {
    const date = event.detail.value;
    if (date) {
      const formatted = date.split('T')[0];
      this.workTrackForm.get('date')?.setValue(formatted);
    }
    this.modalCtrl.dismiss();
  }

  /* Parse single time string into hours and minutes, handling AM/PM, dots, and 24-hr formats */
  parseSingleTimeString(tStr: string): { hours: number, minutes: number, hasMeridiem: boolean, isPM: boolean } | null {
    if (!tStr || !tStr.trim()) return null;

    const clean = tStr.trim().toUpperCase();
    const isPM = clean.includes('PM');
    const isAM = clean.includes('AM');
    const hasMeridiem = isPM || isAM;

    // Normalize dots between digits to colons (e.g. 10.30 -> 10:30)
    const normalized = clean.replace(/(\d{1,2})\.(\d{1,2})/, '$1:$2');
    const match = normalized.match(/(\d{1,2})(?::(\d{1,2}))?/);
    if (!match) return null;

    let h = parseInt(match[1], 10);
    const m = match[2] ? parseInt(match[2], 10) : 0;

    if (isNaN(h) || isNaN(m) || m < 0 || m >= 60) return null;
    if (h < 0 || h > 24) return null;

    if (hasMeridiem) {
      if (h > 12) return null;
      if (isPM && h < 12) {
        h += 12;
      } else if (isAM && h === 12) {
        h = 0;
      }
    }

    return { hours: h, minutes: m, hasMeridiem, isPM };
  }

  /* Parse time string (handles both AM/PM and 24-hour formats) */
  parseTimeToHoursMinutes(timeStr: string): { hours: number, minutes: number } {
    if (!timeStr) return { hours: 9, minutes: 0 };
    const parsed = this.parseSingleTimeString(timeStr);
    if (parsed) {
      return { hours: parsed.hours, minutes: parsed.minutes };
    }
    return { hours: 9, minutes: 0 };
  }

  /* Format minutes into exact hours and minutes string (e.g. 92 -> "1hr 32 minutes", 60 -> "1hr", 32 -> "32 minutes") */
  formatMinutesToHoursString(totalMins: number): string {
    if (!totalMins || isNaN(totalMins) || totalMins <= 0) return '0hr';
    const h = Math.floor(totalMins / 60);
    const m = Math.round(totalMins % 60);

    if (h > 0 && m > 0) {
      return `${h}hr ${m} minutes`;
    } else if (h > 0) {
      return `${h}hr`;
    } else {
      return `${m} minutes`;
    }
  }

  /* Parse duration from any input (e.g. "1hr 32 minutes", "1.5", "90 minutes", 2) into total minutes */
  parseDurationToMinutes(val: any): number {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') {
      return Math.round(val * 60);
    }

    const str = String(val).trim().toLowerCase();
    if (!str) return 0;

    // Pattern 1: e.g. "1hr 32 minutes", "1h 32m", "1 hr 32 mins", "2hr"
    const hrMinMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:hr|hour|h)s?(?:\s*(\d+)\s*(?:min|minute|m)s?)?/i);
    if (hrMinMatch) {
      const h = parseFloat(hrMinMatch[1]) || 0;
      const m = parseInt(hrMinMatch[2], 10) || 0;
      return Math.round(h * 60 + m);
    }

    // Pattern 2: e.g. "32 minutes", "45 mins", "30m"
    const minOnlyMatch = str.match(/^(\d+)\s*(?:min|minute|m)s?$/i);
    if (minOnlyMatch) {
      return parseInt(minOnlyMatch[1], 10) || 0;
    }

    // Pattern 3: e.g. "01:32"
    const colonMatch = str.match(/^(\d{1,2}):(\d{2})$/);
    if (colonMatch) {
      return parseInt(colonMatch[1], 10) * 60 + parseInt(colonMatch[2], 10);
    }

    // Pattern 4: raw number string like "1.5" or "2"
    const num = parseFloat(str);
    if (!isNaN(num) && num > 0) {
      return Math.round(num * 60);
    }

    return 0;
  }

  /* Calculate duration in exact minutes from a time slot string */
  calculateMinutesFromTimeSlot(slotStr: string): number | null {
    if (!slotStr || typeof slotStr !== 'string') return null;

    const parts = slotStr.split(/\s*(?:-|–|—|\bto\b)\s*/i);
    if (parts.length !== 2) return null;

    const startParsed = this.parseSingleTimeString(parts[0]);
    const endParsed = this.parseSingleTimeString(parts[1]);

    if (!startParsed || !endParsed) return null;

    let startH = startParsed.hours;
    let startM = startParsed.minutes;
    let endH = endParsed.hours;
    let endM = endParsed.minutes;

    // Context inference when one or both sides lack AM/PM:
    if (startParsed.hasMeridiem && !endParsed.hasMeridiem) {
      if (startParsed.isPM) {
        if (endH < 12) endH += 12;
      } else {
        if (endH < startH && endH < 12) {
          endH += 12;
        }
      }
    } else if (!startParsed.hasMeridiem && endParsed.hasMeridiem) {
      if (endParsed.isPM && startH <= endParsed.hours - 12) {
        startH += 12;
      }
    } else if (!startParsed.hasMeridiem && !endParsed.hasMeridiem) {
      if (endH < startH && endH < 12 && startH <= 12) {
        endH += 12;
      }
    }

    const startTotalMins = startH * 60 + startM;
    let endTotalMins = endH * 60 + endM;

    if (endTotalMins < startTotalMins) {
      // Overnight shift
      endTotalMins += 24 * 60;
    }

    const diffMins = endTotalMins - startTotalMins;

    // Must be positive duration and reasonable workday length (<= 16 hours)
    if (diffMins <= 0 || diffMins > 16 * 60) {
      return null;
    }

    return diffMins;
  }

  /* Calculate duration in hours as decimal number (e.g. 1.53) */
  calculateDurationFromTimeSlot(slotStr: string): number | null {
    const mins = this.calculateMinutesFromTimeSlot(slotStr);
    if (mins === null) return null;
    return Math.round((mins / 60) * 100) / 100;
  }

  /* Format time slot nicely into standard "HH:mm AM/PM - HH:mm AM/PM" format */
  formatTimeSlotNicely(slotStr: string): string | null {
    if (!slotStr || typeof slotStr !== 'string') return null;

    const parts = slotStr.split(/\s*(?:-|–|—|\bto\b)\s*/i);
    if (parts.length !== 2) return null;

    const startParsed = this.parseSingleTimeString(parts[0]);
    const endParsed = this.parseSingleTimeString(parts[1]);

    if (!startParsed || !endParsed) return null;

    let startH = startParsed.hours;
    let startM = startParsed.minutes;
    let endH = endParsed.hours;
    let endM = endParsed.minutes;

    if (startParsed.hasMeridiem && !endParsed.hasMeridiem) {
      if (startParsed.isPM) {
        if (endH < 12) endH += 12;
      } else {
        if (endH < startH && endH < 12) {
          endH += 12;
        }
      }
    } else if (!startParsed.hasMeridiem && endParsed.hasMeridiem) {
      if (endParsed.isPM && startH <= endParsed.hours - 12) {
        startH += 12;
      }
    } else if (!startParsed.hasMeridiem && !endParsed.hasMeridiem) {
      if (endH < startH && endH < 12 && startH <= 12) {
        endH += 12;
      }
    }

    const startDate = new Date();
    startDate.setHours(startH, startM, 0, 0);

    const endDate = new Date(startDate);
    let endMins = endH * 60 + endM;
    let startMins = startH * 60 + startM;
    if (endMins < startMins) {
      endMins += 24 * 60;
    }
    const diff = endMins - startMins;
    endDate.setMinutes(startDate.getMinutes() + diff);

    return `${this.formatTime(startDate)} - ${this.formatTime(endDate)}`;
  }

  /* Generate time slot from start time (e.g., "09:00" -> "09:00 AM - 10:00 AM") */
  generateTimeSlot(startTime: string): string {
    if (!startTime) return '';

    try {
      const { hours, minutes } = this.parseTimeToHoursMinutes(startTime);

      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(hours + 1, minutes, 0, 0);

      const startStr = this.formatTime(startDate);
      const endStr = this.formatTime(endDate);

      return `${startStr} - ${endStr}`;
    } catch (error) {
      console.error('Error generating time slot:', error);
      return '';
    }
  }

  /* Format time as HH:mm AM/PM */
  formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, '0');
    return `${hoursStr}:${minutes} ${ampm}`;
  }

  addRow() {
    // Get the last time slot to calculate the next one
    let nextTimeSlot = '';

    if (this.breakdowns.length > 0) {
      const lastRow = this.breakdowns.at(this.breakdowns.length - 1);
      const lastTimeSlot = lastRow.get('hour')?.value;

      if (lastTimeSlot) {
        const parts = lastTimeSlot.split(/\s*(?:-|–|—|\bto\b)\s*/i);
        const endTime = parts[1]?.trim();
        if (endTime) {
          // Calculate next slot with 1 hour duration
          nextTimeSlot = this.generateTimeSlotWithDuration(endTime, '1hr');
        }
      }
    }

    this.breakdowns.push(
      this.fb.group({
        hour: [nextTimeSlot, Validators.required],
        task: ['', Validators.required],
        hours: ['1hr', Validators.required],
      })
    );
  }

  /* Handle user adjusting Time Slot: recalculate duration and display in HR field as exact hours & minutes */
  onTimeSlotChange(index: number, event?: any) {
    const currentRow = this.breakdowns.at(index);
    if (!currentRow) return;

    const rawValue = event?.target?.value !== undefined ? event.target.value : currentRow.get('hour')?.value;
    const timeSlot = String(rawValue || '').trim();

    if (!timeSlot) return;

    const diffMins = this.calculateMinutesFromTimeSlot(timeSlot);

    if (diffMins !== null && diffMins > 0) {
      // Format as exact hours and minutes e.g. "1hr 32 minutes"
      const formattedDuration = this.formatMinutesToHoursString(diffMins);
      currentRow.patchValue({ hours: formattedDuration }, { emitEvent: false });

      // Update all subsequent rows so their start times match the adjusted end time
      this.updateSubsequentRows(index);

      this.cdr.markForCheck();
    }
  }

  /* On blur, nicely format the time slot if it represents a valid time range */
  onTimeSlotBlur(index: number) {
    const currentRow = this.breakdowns.at(index);
    if (!currentRow) return;

    const timeSlot = String(currentRow.get('hour')?.value || '').trim();
    if (!timeSlot) return;

    const diffMins = this.calculateMinutesFromTimeSlot(timeSlot);
    if (diffMins !== null && diffMins > 0) {
      const formattedDuration = this.formatMinutesToHoursString(diffMins);
      currentRow.patchValue({ hours: formattedDuration }, { emitEvent: false });

      const nicelyFormatted = this.formatTimeSlotNicely(timeSlot);
      if (nicelyFormatted && nicelyFormatted !== timeSlot) {
        currentRow.patchValue({ hour: nicelyFormatted }, { emitEvent: false });
      }
      this.updateSubsequentRows(index);
      this.cdr.markForCheck();
    }
  }

  /* Update time slots when hours/minutes change */
  onHoursChange(index: number, event?: any) {
    const currentRow = this.breakdowns.at(index);
    if (!currentRow) return;

    const targetVal = event?.target?.value !== undefined ? event.target.value : currentRow.get('hours')?.value;
    const minutes = this.parseDurationToMinutes(targetVal);

    if (minutes <= 0) return;

    const currentTimeSlot = currentRow.get('hour')?.value;

    if (currentTimeSlot) {
      const parts = currentTimeSlot.split(/\s*(?:-|–|—|\bto\b)\s*/i);
      const startTime = parts[0]?.trim();
      if (startTime) {
        const newTimeSlot = this.generateTimeSlotWithDuration(startTime, minutes);
        currentRow.patchValue({ hour: newTimeSlot }, { emitEvent: false });

        // Update all subsequent rows
        this.updateSubsequentRows(index);
        this.cdr.markForCheck();
      }
    }
  }

  /* Format hours input on blur into standard "1hr 32 minutes" format */
  onHoursBlur(index: number) {
    const currentRow = this.breakdowns.at(index);
    if (!currentRow) return;

    const val = currentRow.get('hours')?.value;
    const minutes = this.parseDurationToMinutes(val);
    if (minutes > 0) {
      const formatted = this.formatMinutesToHoursString(minutes);
      currentRow.patchValue({ hours: formatted }, { emitEvent: false });
    }
  }

  /* Update all rows after the changed one */
  updateSubsequentRows(fromIndex: number) {
    for (let i = fromIndex + 1; i < this.breakdowns.length; i++) {
      const prevRow = this.breakdowns.at(i - 1);
      const currentRow = this.breakdowns.at(i);

      const prevTimeSlot = prevRow.get('hour')?.value;

      if (prevTimeSlot) {
        const parts = prevTimeSlot.split(/\s*(?:-|–|—|\bto\b)\s*/i);
        const prevEndTime = parts[1]?.trim();
        if (prevEndTime) {
          const currentDuration = currentRow.get('hours')?.value || '1hr';
          const newTimeSlot = this.generateTimeSlotWithDuration(prevEndTime, currentDuration);

          currentRow.patchValue({ hour: newTimeSlot }, { emitEvent: false });
        }
      }
    }
  }

  /* Generate time slot with custom duration (accepts minutes, hours decimal, or formatted string) */
  generateTimeSlotWithDuration(startTime: string, duration: number | string): string {
    if (!startTime) return '';

    try {
      const { hours: startHours, minutes: startMinutes } = this.parseTimeToHoursMinutes(startTime);

      const startDate = new Date();
      startDate.setHours(startHours, startMinutes, 0, 0);

      let minutesToAdd = 0;
      if (typeof duration === 'number') {
        minutesToAdd = duration <= 24 ? Math.round(duration * 60) : Math.round(duration);
      } else {
        minutesToAdd = this.parseDurationToMinutes(duration);
      }

      const endDate = new Date(startDate);
      endDate.setMinutes(startDate.getMinutes() + minutesToAdd);

      const startStr = this.formatTime(startDate);
      const endStr = this.formatTime(endDate);

      return `${startStr} - ${endStr}`;
    } catch (error) {
      console.error('Error generating time slot:', error);
      return '';
    }
  }

  removeRow(i: number) {
    if (this.breakdowns.length > 1) {
      this.breakdowns.removeAt(i);
    }
  }

  calculateTotalHours(): number {
    const totalMinutes = this.breakdowns.controls.reduce(
      (sum, row) => sum + this.parseDurationToMinutes(row.get('hours')?.value),
      0
    );
    return Math.round((totalMinutes / 60) * 100) / 100;
  }

  calculateTotalHoursFormatted(): string {
    const totalMinutes = this.breakdowns.controls.reduce(
      (sum, row) => sum + this.parseDurationToMinutes(row.get('hours')?.value),
      0
    );
    return this.formatMinutesToHoursString(totalMinutes);
  }

  /* ================= SUBMIT ================= */

  submit() {
    if (this.workTrackForm.invalid) {
      this.showToast('Please fill all required fields');
      return;
    }

    const dateVal = this.workTrackForm.value.date;
    const existing = this.findExistingTimesheetByDate(dateVal);
    if (existing) {
      if (this.editingTimesheetId === null || Number(existing.id) === Number(this.editingTimesheetId)) {
        this.isEditing = true;
        this.editingTimesheetId = existing.id;
      } else {
        const displayStatus = this.getDisplayStatus(existing.status);
        this.showToast(`Already timesheet submitted for this date (Status: ${displayStatus})`);
        return;
      }
    }

    const breakdown = this.workTrackForm.value.hours_breakdown;
    const breakdownTasks = Array.isArray(breakdown)
      ? breakdown
          .map((b: any) => {
            const slot = b.hour || b.time_slot || '';
            const task = b.task || b.task_description || '';
            return slot ? `[${slot}] ${task}` : task;
          })
          .filter((t: string) => t && t.trim())
          .join(' • ')
      : '';

    const cleanDate = dateVal ? String(dateVal).split('T')[0] : this.today;

    const basePayload = {
      id: this.editingTimesheetId,
      timesheet_id: this.editingTimesheetId,
      date: cleanDate,
      hours_breakdown: breakdown,
      total_hours: this.calculateTotalHours(),
      notes: this.workTrackForm.value.notes || breakdownTasks,
      work_description: this.workTrackForm.value.work_description || breakdownTasks
    };

    const isResubmitting = this.isEditing || !!this.editingTimesheetId;
    this.loading = true;

    /* ================= PROJECT TIMESHEET ================= */
    if (this.hasProject) {

      const projectPayload = {
        ...basePayload,
        project_id: this.workTrackForm.value.project_id || this.assignments?.[0]?.project_id,
        work_description: this.workTrackForm.value.work_description || breakdownTasks || this.workTrackForm.value.notes
      };

      const request$ = isResubmitting
        ? this.timesheetService.resubmitProjectTimesheet(projectPayload)
        : this.timesheetService.submitProjectTimesheet(projectPayload);

      request$.subscribe({
        next: () => {
          this.loading = false;
          this.showToast(isResubmitting ? 'Project report resubmitted successfully' : 'Project work submitted successfully');
          this.resetForm();
          if (isResubmitting) {
            setTimeout(() => {
              this.router.navigate(['/inbox']);
            }, 600);
          }
        },
        error: (err) => {
          this.loading = false;
          const msg = err?.error?.error || 'Failed to submit project work';
          this.showToast(msg);
        },
      });

      return;
    }

    /* ================= REGULAR TIMESHEET ================= */
    const regRequest$ = isResubmitting
      ? this.timesheetService.resubmitRegularTimesheet(basePayload)
      : this.timesheetService.submitRegularTimesheet(basePayload);

    regRequest$.subscribe({
      next: () => {
        this.loading = false;
        this.showToast(isResubmitting ? 'Timesheet resubmitted successfully' : 'Timesheet submitted successfully');
        this.resetForm();
        if (isResubmitting) {
          setTimeout(() => {
            this.router.navigate(['/inbox']);
          }, 600);
        }
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.error || 'Failed to submit timesheet';
        this.showToast(msg);
      },
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingTimesheetId = null;
    this.resetForm();
  }

  resetForm() {
    this.isEditing = false;
    this.editingTimesheetId = null;
    this.workTrackForm.reset({ date: this.today });
    this.initializeFirstTimeSlot();
    // Delay loading to ensure hasProject is set
    setTimeout(() => this.loadMyTimesheets(), 100);
  }

  /* ================= EDIT / RESUBMIT ================= */
  editTimesheet(t: any) {
    this.isEditing = true;
    this.editingTimesheetId = t.id || null;

    // Scroll smoothly to the Daily Work Log card
    const formElement = document.getElementById('daily-work-log-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const formattedDate = new Date(t.date).toISOString().split('T')[0];
    this.workTrackForm.patchValue({
      date: formattedDate,
      project_id: t.project_id || null,
      work_description: t.work_description || '',
      notes: t.notes || ''
    });

    this.breakdowns.clear();

    let bd = t.hours_breakdown;
    let attempts = 0;
    while (typeof bd === 'string' && attempts < 5) {
      attempts++;
      try {
        bd = JSON.parse(bd);
      } catch (e) { bd = []; break; }
    }

    // 1. If hours_breakdown exists as a non-empty array
    if (bd && Array.isArray(bd) && bd.length > 0) {
      bd.forEach((b: any, idx: number) => {
        let hourVal = '';
        let taskVal = '';
        let hoursVal: any = '1hr';

        if (typeof b === 'string') {
          const parsed = this.parseTaskStringForEdit(b, idx + 1, Number(t.total_hours || 1) / bd.length);
          hourVal = parsed.hour;
          taskVal = parsed.task;
          hoursVal = parsed.hours;
        } else {
          hourVal = b.hour || b.time_slot || b.time || b.slot || b.timeSlot || '';
          taskVal = b.task || b.task_description || b.notes || b.description || b.work_description || b.details || '';
          if (b.hours !== undefined && b.hours !== null) {
            hoursVal = typeof b.hours === 'string' && (b.hours.includes('hr') || b.hours.includes('min'))
              ? b.hours
              : this.formatMinutesToHoursString(Number(b.hours) * 60);
          } else if (hourVal) {
            const mins = this.calculateMinutesFromTimeSlot(hourVal);
            hoursVal = mins ? this.formatMinutesToHoursString(mins) : '1hr';
          }
        }

        if (!hourVal) {
          const mins = this.parseDurationToMinutes(hoursVal) || 60;
          hourVal = this.generateSlotForIndex(idx, mins / 60);
        }

        this.breakdowns.push(
          this.fb.group({
            hour: [hourVal, Validators.required],
            task: [taskVal, Validators.required],
            hours: [hoursVal, Validators.required],
          })
        );
      });
      return;
    }

    // 2. Fallback: Parse work_description or notes into multiple form rows
    const summaryText = (t.work_description || t.notes || '').trim();
    if (summaryText) {
      const parsedSlots = this.parseSummaryTextForEdit(summaryText, Number(t.total_hours || 1));
      if (parsedSlots.length > 0) {
        parsedSlots.forEach((slot: any) => {
          this.breakdowns.push(
            this.fb.group({
              hour: [slot.hour, Validators.required],
              task: [slot.task, Validators.required],
              hours: [slot.hours, Validators.required],
            })
          );
        });
        return;
      }
    }

    // 3. Default fallback
    this.initializeFirstTimeSlot();
  }

  private parseSummaryTextForEdit(summaryText: string, totalHours: number): any[] {
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
      ? Math.round(((totalHours || 1) / taskStrings.length) * 100) / 100
      : (totalHours || 1);

    return taskStrings.map((t, idx) => {
      const parsed = this.parseTaskStringForEdit(t, idx + 1, calculatedHours);
      if (!parsed.hour || parsed.hour.startsWith('Slot ')) {
        parsed.hour = this.generateSlotForIndex(idx, calculatedHours);
      }
      return parsed;
    });
  }

  private parseTaskStringForEdit(text: string, slotIndex: number, defaultHours: number): any {
    const trimmed = text.trim();
    const slotMatch = trimmed.match(/^(?:\[([^\]]+)\]|([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?(?:\s*-\s*[0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?)?):?)\s*(.+)$/i);
    if (slotMatch) {
      const timeSlot = (slotMatch[1] || slotMatch[2] || '').trim();
      const taskDesc = slotMatch[3].trim();
      const calculatedMins = this.calculateMinutesFromTimeSlot(timeSlot);
      return {
        hour: timeSlot,
        hours: calculatedMins ? this.formatMinutesToHoursString(calculatedMins) : this.formatMinutesToHoursString(defaultHours * 60),
        task: taskDesc
      };
    }
    return {
      hour: '',
      hours: this.formatMinutesToHoursString(defaultHours * 60),
      task: trimmed
    };
  }

  private generateSlotForIndex(index: number, durationHours: number): string {
    let startHour = 9 + index * Math.max(1, Math.floor(durationHours));
    const startDate = new Date();
    startDate.setHours(startHour, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + Math.round(durationHours * 60));

    return `${this.formatTime(startDate)} - ${this.formatTime(endDate)}`;
  }

  /* ================= PREVIEW ================= */

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

  /* ================= LOAD LIST ================= */

  loadMyTimesheets() {
    this.loadingList = true;

    const filters = {
      month: this.selectedMonth,
      year: this.selectedYear
    };

    // Load project timesheets if user has project, otherwise regular timesheets
    const fetchObservable = this.hasProject
      ? this.timesheetService.getMyProjectTimesheets(filters)
      : this.timesheetService.getMyRegularTimesheets(filters);

    fetchObservable.subscribe({
      next: (res: any) => {
        this.myTimesheets = res?.data || res || [];
        this.currentPage = 1;
        this.updatePagination();
        this.loadingList = false;
        this.checkRouteParamsAndEdit();
      },
      error: () => {
        this.loadingList = false;
        this.showToast('Failed to load timesheets');
      },
    });
  }

  checkRouteParamsAndEdit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params && (params['date'] || params['id'])) {
        const targetDate = params['date'];
        const targetId = params['id'] ? parseInt(params['id'], 10) : null;

        if (targetDate) {
          const cleanDate = targetDate.split('T')[0];
          this.workTrackForm.patchValue({ date: cleanDate });
        }

        setTimeout(() => {
          if (this.myTimesheets && this.myTimesheets.length > 0) {
            const match = this.myTimesheets.find((t: any) => {
              if (targetId && t.id === targetId) return true;
              if (targetDate) {
                const cleanTDate = new Date(t.date).toISOString().split('T')[0];
                return cleanTDate === targetDate.split('T')[0];
              }
              return false;
            });

            if (match) {
              this.editTimesheet(match);
            } else {
              this.isEditing = true;
              if (targetId) this.editingTimesheetId = targetId;
              const formElement = document.getElementById('daily-work-log-card');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }
        }, 300);
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.myTimesheets.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTimesheets = this.myTimesheets.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  /* ================= FILTERS ================= */

  onMonthChange(event: any) {
    this.selectedMonth = Number(event.detail.value);
    this.loadMyTimesheets();
  }

  onYearChange(event: any) {
    this.selectedYear = Number(event.detail.value);
    this.loadMyTimesheets();
  }

  /* ================= DOWNLOAD EXCEL ================= */
  formatDateDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  downloadExcel(timesheet: any) {
    if (!timesheet || !timesheet.hours_breakdown?.length) {
      return;
    }

    let tableRows = '';

    timesheet.hours_breakdown.forEach((b: any, index: number) => {
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${b.hour || '-'}</td>
          <td>${b.task || '-'}</td>
          <td>${b.hours || '-'}</td>
        </tr>
      `;
    });
    timesheet.date = this.formatDateDDMMYYYY(new Date(timesheet.date));
    const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="UTF-8" />
    </head>
    <body>
      <table border="1">
        <tr><td>Date</td><td colspan="3">${timesheet.date}</td></tr>
        <tr>
          <th>S.No</th><th>Time</th><th>Task</th><th>Hours</th>
        </tr>
        ${tableRows}
        <tr><td>Note</td><td colspan="3">${timesheet.notes || '-'}</td></tr>
        <tr><td>Total</td><td colspan="3">${timesheet.total_hours}</td></tr>
      </table>
    </body>
    </html>
    `;

    const blob = new Blob([html], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Timesheet_${timesheet.date}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /* ================= UTILS ================= */

  getStatusColor(status: string): string {
    if (!status) return 'warning'; // pending/no status

    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'verified':
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'submitted':
      case 'pending':
        return 'warning';
      default:
        return 'medium';
    }
  }

  getDisplayStatus(status: string): string {
    if (!status) return 'Pending';
    const s = status.toLowerCase();
    if (s === 'submitted') return 'Submitted';
    if (s === 'approved' || s === 'verified') return 'Approved';
    if (s === 'rejected') return 'Rejected';
    return status;
  }

  findExistingTimesheetByDate(dateStr: string): any {
    if (!dateStr || !this.myTimesheets || !this.myTimesheets.length) return null;
    const clean = dateStr.split('T')[0];
    return this.myTimesheets.find((t: any) => {
      const d = t.date || t.week_start_date || t.created_at;
      return d ? new Date(d).toISOString().split('T')[0] === clean : false;
    }) || null;
  }

  getApprovedCount(): number {
    if (!this.myTimesheets) return 0;
    return this.myTimesheets.filter(t => (t.status || '').toLowerCase() === 'approved').length;
  }

  getPendingCount(): number {
    if (!this.myTimesheets) return 0;
    return this.myTimesheets.filter(t => (t.status || '').toLowerCase() === 'submitted' || (t.status || '').toLowerCase() === 'pending').length;
  }

  getTotalHoursSum(): number {
    if (!this.myTimesheets) return 0;
    return this.myTimesheets.reduce((sum, t) => sum + (parseFloat(t.total_hours) || 0), 0);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
