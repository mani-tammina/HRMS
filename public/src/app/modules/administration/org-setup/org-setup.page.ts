import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminService, ShiftPolicyPayload, WeeklyOffPolicyPayload } from 'src/app/core/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-org-setup',
  templateUrl: './org-setup.page.html',
  styleUrls: ['./org-setup.page.scss'],
  standalone: false,
})
export class OrgSetupPage implements OnInit {
  activeTab: string = 'locations';
  userRole: string | null = null;
  env: string = '';
  selectedImageFile: File | null = null;
  imagePreviewUrl: string | null = null;

  get isAdminOrHR(): boolean {
    return this.userRole === 'admin' || this.userRole === 'hr';
  }

  // Lists
  locations: any[] = [];
  departments: any[] = [];
  shiftPolicies: any[] = [];
  announcements: any[] = [];
  designations: any[] = [];
  businessUnits: any[] = [];
  weeklyOffPolicies: any[] = [];
  leavePlans: any[] = [];

  // Backup Lists (for filtering)
  locationsBackup: any[] = [];
  departmentsBackup: any[] = [];
  shiftPoliciesBackup: any[] = [];
  announcementsBackup: any[] = [];
  designationsBackup: any[] = [];
  businessUnitsBackup: any[] = [];
  weeklyOffPoliciesBackup: any[] = [];

  // Paginated Lists
  paginatedLocations: any[] = [];
  paginatedDepartments: any[] = [];
  paginatedDesignations: any[] = [];
  paginatedBusinessUnits: any[] = [];
  paginatedShifts: any[] = [];
  paginatedWeeklyOff: any[] = [];
  paginatedAnnouncements: any[] = [];

  // Pagination State
  pageSize: number = 5;

  currentPage: any = {
    locations: 1,
    departments: 1,
    designations: 1,
    businessUnits: 1,
    shifts: 1,
    weeklyOff: 1,
    announcements: 1,
    penalties: 1
  };

  totalPages: any = {
    locations: 0,
    departments: 0,
    designations: 0,
    businessUnits: 0,
    shifts: 0,
    weeklyOff: 0,
    announcements: 0,
    penalties: 0
  };

  // Penalty Lists
  missingLogs: any[] = [];
  lateArrivals: any[] = [];
  penalties: any[] = []; // Combined or currently selected list
  penaltiesBackup: any[] = [];
  paginatedPenalties: any[] = [];
  penaltyType: 'missingLogs' | 'lateArrivals' | 'breaks' = 'missingLogs';

  // Form Models
  locationName: string = '';
  departmentName: string = '';
  designationName: string = '';
  businessUnitName: string = '';

  // Penalty Form
  penaltyForm: any = {
    leave_plan_id: null,
    threshold_hours: null,
    threshold_minutes: null
  };

  // Search Filter Terms
  searchLocationTerm: string = '';
  searchDepartmentTerm: string = '';
  searchDesignationTerm: string = '';
  searchBusinessUnitTerm: string = '';
  searchShiftTerm: string = '';
  searchWeeklyOffTerm: string = '';
  searchAnnouncementTerm: string = '';
  searchPenaltyTerm: string = '';

  shiftForm: ShiftPolicyPayload = {
    name: '',
    shift_type: 'general',
    start_time: '',
    end_time: '',
    break_duration_minutes: 60,
    timezone: 'Asia/Kolkata',
    description: '',
    is_active: 1
  };

  announcementForm = {
    title: '',
    body: '',
    starts_at: '',
    ends_at: '',
    image_url: null as string | null
  };

  weeklyOffPolicyForm: any = {
    policy_code: '',
    name: '',
    description: '',
    effective_date: '',
    is_active: 1,
    sunday_off: 0,
    monday_off: 0,
    tuesday_off: 0,
    wednesday_off: 0,
    thursday_off: 0,
    friday_off: 0,
    saturday_off: 0,
    is_payable: 0,
    sandwich_rule: 0,
    minimum_work_days: 0,
    holiday_overlap_rule: ''
  };

  // Editing IDs
  editingLocationId: number | null = null;
  editingDepartmentId: number | null = null;
  editingDesignationId: number | null = null;
  editingBusinessUnitId: number | null = null;
  editingShiftId: number | null = null;
  editingAnnouncementId: number | null = null;
  editingWeeklyOffId: number | null = null;
  editingPenaltyId: number | null = null;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.userRole = (localStorage.getItem('role') || '').toLowerCase();
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `http://${environment.apiURL}`;
    this.loadData();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    // Clear search term when switching tabs
    this.clearSearch();
    this.loadData();
  }

  // Clear search for current tab
  clearSearch() {
    const map: any = {
      locations: () => this.searchLocationTerm = '',
      departments: () => this.searchDepartmentTerm = '',
      designations: () => this.searchDesignationTerm = '',
      businessUnits: () => this.searchBusinessUnitTerm = '',
      shifts: () => this.searchShiftTerm = '',
      weeklyOff: () => this.searchWeeklyOffTerm = '',
      announcements: () => this.searchAnnouncementTerm = '',
      penalties: () => this.searchPenaltyTerm = ''
    };
    map[this.activeTab]?.();
  }

  loadData() {
    switch (this.activeTab) {
      case 'locations': this.loadLocations(); break;
      case 'departments': this.loadDepartments(); break;
      case 'shifts': this.loadShiftPolicies(); break;
      case 'designations': this.loadDesignations(); break;
      case 'businessUnits': this.loadBusinessUnits(); break;
      case 'weeklyOff': this.loadWeeklyOffPolicies(); break;
      case 'announcements': this.loadAnnouncements(); break;
      case 'penalties': this.loadPenalties(); break;
    }
  }

  /* Locations */
  loadLocations() {
    this.adminService.getLocations().subscribe(res => {
      this.locations = res || [];
      this.locationsBackup = JSON.parse(JSON.stringify(this.locations)); // Create backup
      this.calculatePagination('locations');
    });
  }
  saveLocation() {
    const action = this.editingLocationId
      ? this.adminService.updateLocation(this.editingLocationId, { name: this.locationName })
      : this.adminService.createLocation({ name: this.locationName });

    action.subscribe({
      next: () => {
        this.showToast(`Location ${this.editingLocationId ? 'updated' : 'saved'}`, 'success');
        this.loadLocations();
        this.cancelLocation();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error?.error || 'STSS_15 Already Exists please check';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editLocation(loc: any) { this.locationName = loc.name; this.editingLocationId = loc.id; }
  deleteLocation(id: number) { this.adminService.deleteLocation(id).subscribe(() => { this.showToast('Location deleted', 'success'); this.loadLocations(); }); }
  cancelLocation() { this.locationName = ''; this.editingLocationId = null; }

  /* Departments */
  loadDepartments() {
    this.adminService.getDepartments().subscribe(res => {
      this.departments = res || [];
      this.departmentsBackup = JSON.parse(JSON.stringify(this.departments)); // Create backup
      this.calculatePagination('departments');
    });
  }
  saveDepartment() {
    const action = this.editingDepartmentId
      ? this.adminService.updateDepartment(this.editingDepartmentId, { name: this.departmentName })
      : this.adminService.createDepartment({ name: this.departmentName });

    action.subscribe({
      next: () => {
        this.showToast(`Department ${this.editingDepartmentId ? 'updated' : 'saved'}`, 'success');
        this.loadDepartments();
        this.cancelDepartment();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error?.error || 'STSS_15 Already Exists please check';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editDepartment(dept: any) { this.departmentName = dept.name; this.editingDepartmentId = dept.id; }
  deleteDepartment(id: number) { this.adminService.deleteDepartment(id).subscribe(() => { this.showToast('Department deleted', 'success'); this.loadDepartments(); }); }
  cancelDepartment() { this.departmentName = ''; this.editingDepartmentId = null; }

  /* Designations */
  loadDesignations() {
    this.adminService.getDesignations().subscribe(res => {
      this.designations = res || [];
      this.designationsBackup = JSON.parse(JSON.stringify(this.designations)); // Create backup
      this.calculatePagination('designations');
    });
  }
  saveDesignation() {
    const action = this.editingDesignationId
      ? this.adminService.updateDesignation(this.editingDesignationId, { name: this.designationName })
      : this.adminService.createDesignation({ name: this.designationName });

    action.subscribe({
      next: () => {
        this.showToast(`Designation ${this.editingDesignationId ? 'updated' : 'saved'}`, 'success');
        this.loadDesignations();
        this.cancelDesignation();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error?.error || 'STSS_15 Already Exists please check';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editDesignation(des: any) { this.designationName = des.name; this.editingDesignationId = des.id; }
  deleteDesignation(id: number) { this.adminService.deleteDesignation(id).subscribe(() => { this.showToast('Designation deleted', 'success'); this.loadDesignations(); }); }
  cancelDesignation() { this.designationName = ''; this.editingDesignationId = null; }

  /* Business Units */
  loadBusinessUnits() {
    this.adminService.getBusinessUnits().subscribe(res => {
      this.businessUnits = res || [];
      this.businessUnitsBackup = JSON.parse(JSON.stringify(this.businessUnits)); // Create backup
      this.calculatePagination('businessUnits');
    });
  }
  saveBusinessUnit() {
    const action = this.editingBusinessUnitId
      ? this.adminService.updateBusinessUnit(this.editingBusinessUnitId, { name: this.businessUnitName })
      : this.adminService.createBusinessUnit({ name: this.businessUnitName });

    action.subscribe({
      next: () => {
        this.showToast(`Business Unit ${this.editingBusinessUnitId ? 'updated' : 'saved'}`, 'success');
        this.loadBusinessUnits();
        this.cancelBusinessUnit();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error?.error || 'STSS_15 Already Exists please check';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editBusinessUnit(bu: any) { this.businessUnitName = bu.name; this.editingBusinessUnitId = bu.id; }
  deleteBusinessUnit(id: number) { this.adminService.deleteBusinessUnit(id).subscribe(() => { this.showToast('Business Unit deleted', 'success'); this.loadBusinessUnits(); }); }
  cancelBusinessUnit() { this.businessUnitName = ''; this.editingBusinessUnitId = null; }

  /* Shift Policies */
  loadShiftPolicies() {
    this.adminService.getShiftPolicies().subscribe(res => {
      this.shiftPolicies = res || [];
      this.shiftPoliciesBackup = JSON.parse(JSON.stringify(this.shiftPolicies)); // Create backup
      this.calculatePagination('shifts');
    });
  }
  saveShift() {
    const action = this.editingShiftId
      ? this.adminService.updateShiftPolicy(this.editingShiftId, this.shiftForm)
      : this.adminService.createShiftPolicy(this.shiftForm);

    action.subscribe({
      next: () => {
        this.showToast(`Shift ${this.editingShiftId ? 'updated' : 'saved'}`, 'success');
        this.loadShiftPolicies();
        this.cancelShift();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error?.error || 'STSS_15 Already Exists please check';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editShift(shift: any) { this.shiftForm = { ...shift }; this.editingShiftId = shift.id; }
  deleteShift(id: number) { this.adminService.deleteShiftPolicy(id).subscribe(() => { this.showToast('Shift deleted', 'success'); this.loadShiftPolicies(); }); }
  cancelShift() {
    this.editingShiftId = null;
    this.shiftForm = { name: '', shift_type: 'general', start_time: '', end_time: '', break_duration_minutes: 60, timezone: 'Asia/Kolkata', is_active: 1, description: '' };
  }

  /* Weekly Off Policies */
  loadWeeklyOffPolicies() {
    this.adminService.getWeeklyOffPolicies().subscribe(res => {
      this.weeklyOffPolicies = res || [];
      this.weeklyOffPoliciesBackup = JSON.parse(JSON.stringify(this.weeklyOffPolicies)); // Create backup
      this.calculatePagination('weeklyOff');
    });
  }
  saveWeeklyOff() {
    const payload = { ...this.weeklyOffPolicyForm };

    // Some backends don't allow updating the code
    if (this.editingWeeklyOffId) {
      delete (payload as any).policy_code;
    }

    const action = this.editingWeeklyOffId
      ? this.adminService.updateWeeklyOffPolicy(this.editingWeeklyOffId, payload)
      : this.adminService.createWeeklyOffPolicy(payload);

    action.subscribe({
      next: () => {
        this.showToast(`Weekly Off Policy ${this.editingWeeklyOffId ? 'updated' : 'saved'}`, 'success');
        this.loadWeeklyOffPolicies();
        this.cancelWeeklyOff();
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Error saving policy';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editWeeklyOff(policy: any) { this.weeklyOffPolicyForm = { ...policy }; this.editingWeeklyOffId = policy.id; }
  deleteWeeklyOff(id: number) { this.adminService.deleteWeeklyOffPolicy(id).subscribe(() => { this.showToast('Policy deleted', 'success'); this.loadWeeklyOffPolicies(); }); }
  cancelWeeklyOff() {
    this.editingWeeklyOffId = null;
    this.weeklyOffPolicyForm = {
      policy_code: '',
      name: '',
      description: '',
      effective_date: new Date().toISOString().split('T')[0],
      is_active: 1,
      sunday_off: 0,
      monday_off: 0,
      tuesday_off: 0,
      wednesday_off: 0,
      thursday_off: 0,
      friday_off: 0,
      saturday_off: 0,
      is_payable: 1,
      sandwich_rule: 0,
      minimum_work_days: 5,
      holiday_overlap_rule: 'ignore'
    };
  }

  /* Announcements */
  loadAnnouncements() {
    this.adminService.getAnnouncements().subscribe(res => {
      this.announcements = res || [];
      this.announcementsBackup = JSON.parse(JSON.stringify(this.announcements)); // Create backup
      this.calculatePagination('announcements');
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
    if (this.editingAnnouncementId) {
      this.announcementForm.image_url = null;
    }
  }

  saveAnnouncement() {
    const formData = new FormData();
    formData.append('title', this.announcementForm.title);
    formData.append('body', this.announcementForm.body);
    if (this.announcementForm.starts_at) {
      formData.append('starts_at', this.announcementForm.starts_at);
    }
    if (this.announcementForm.ends_at) {
      formData.append('ends_at', this.announcementForm.ends_at);
    }
    
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    } else if (this.editingAnnouncementId && !this.announcementForm.image_url) {
      formData.append('remove_image', 'true');
    }

    const action = this.editingAnnouncementId
      ? this.adminService.updateAnnouncement(this.editingAnnouncementId, formData)
      : this.adminService.createAnnouncement(formData);

    action.subscribe({
      next: () => {
        this.showToast(`Announcement ${this.editingAnnouncementId ? 'updated' : 'saved'}`, 'success');
        this.loadAnnouncements();
        this.cancelAnnouncement();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error?.error || 'Failed to save announcement';
        this.showToast(errorMsg, 'danger');
      }
    });
  }
  editAnnouncement(ann: any) {
    this.announcementForm = { ...ann };
    this.editingAnnouncementId = ann.id;
    this.selectedImageFile = null;
    this.imagePreviewUrl = ann.image_url ? `${this.env}${ann.image_url}` : null;
  }
  deleteAnnouncement(id: number) { this.adminService.deleteAnnouncement(id).subscribe(() => { this.showToast('Announcement deleted', 'success'); this.loadAnnouncements(); }); }
  cancelAnnouncement() {
    this.editingAnnouncementId = null;
    this.announcementForm = { title: '', body: '', starts_at: '', ends_at: '', image_url: null };
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
  }

  /* Penalties */
  loadPenalties() {
    if (this.penaltyType === 'missingLogs') {
      this.adminService.getMissingLogTimes().subscribe(res => {
        this.penalties = res || [];
        this.penaltiesBackup = JSON.parse(JSON.stringify(this.penalties));
        this.calculatePagination('penalties');
      });
    } else if (this.penaltyType === 'lateArrivals') {
      this.adminService.getLateArrivals().subscribe(res => {
        this.penalties = res || [];
        this.penaltiesBackup = JSON.parse(JSON.stringify(this.penalties));
        this.calculatePagination('penalties');
      });
    } else if (this.penaltyType === 'breaks') {
      this.adminService.getBreakTimes().subscribe(res => {
        this.penalties = res || [];
        this.penaltiesBackup = JSON.parse(JSON.stringify(this.penalties));
        this.calculatePagination('penalties');
      });
    }
    // Load leave plans for dropdown
    if (this.leavePlans.length === 0) {
      this.loadLeavePlans();
    }
  }

  loadLeavePlans() {
    this.adminService.getLeavePlans().subscribe(res => {
      this.leavePlans = res || [];
    });
  }

  setPenaltyType(type: 'missingLogs' | 'lateArrivals' | 'breaks') {
    this.penaltyType = type;
    this.cancelPenalty();
    this.loadPenalties();
  }

  savePenalty() {
    const payload: any = { leave_plan_id: this.penaltyForm.leave_plan_id };
    let action: any;

    if (this.penaltyType === 'missingLogs') {
      payload.threshold_hours = this.penaltyForm.threshold_hours;
      action = this.editingPenaltyId
        ? this.adminService.updateMissingLogTime(this.editingPenaltyId, payload)
        : this.adminService.createMissingLogTime(payload);
    } else if (this.penaltyType === 'lateArrivals') {
      payload.threshold_minutes = this.penaltyForm.threshold_minutes;
      action = this.editingPenaltyId
        ? this.adminService.updateLateArrival(this.editingPenaltyId, payload)
        : this.adminService.createLateArrival(payload);
    } else if (this.penaltyType === 'breaks') {
      payload.break_time = this.penaltyForm.break_time;
      action = this.editingPenaltyId
        ? this.adminService.updateBreakTime(this.editingPenaltyId, payload)
        : this.adminService.createBreakTime(payload);
    }

    if (!action) return;

    action.subscribe({
      next: () => {
        this.showToast(`Penalty configuration ${this.editingPenaltyId ? 'updated' : 'saved'}`, 'success');
        this.loadPenalties();
        this.cancelPenalty();
      },
      error: (err: any) => {
        this.showToast(err.error?.message || 'Error saving penalty', 'danger');
      }
    });
  }

  editPenalty(p: any) {
    this.penaltyForm = { ...p };
    this.editingPenaltyId = p.id;
  }

  deletePenalty(id: number) {
    const action = this.penaltyType === 'missingLogs'
      ? this.adminService.deleteMissingLogTime(id)
      : this.penaltyType === 'lateArrivals'
      ? this.adminService.deleteLateArrival(id)
      : this.adminService.deleteBreakTime(id);

    action.subscribe(() => {
      this.showToast('Penalty configuration deleted', 'success');
      this.loadPenalties();
    });
  }

  cancelPenalty() {
    this.editingPenaltyId = null;
    this.penaltyForm = { leave_plan_id: null, threshold_hours: null, threshold_minutes: null, break_time: null };
  }

  // Common Pagination Methods
  calculatePagination(entity: string) {
    const dataMap: any = {
      locations: this.locations,
      departments: this.departments,
      designations: this.designations,
      businessUnits: this.businessUnits,
      shifts: this.shiftPolicies,
      weeklyOff: this.weeklyOffPolicies,
      announcements: this.announcements,
      penalties: this.penalties
    };

    const data = dataMap[entity];
    this.totalPages[entity] = Math.ceil(data.length / this.pageSize);
    this.updatePaginatedData(entity);
  }

  updatePaginatedData(entity: string) {
    const dataMap: any = {
      locations: this.locations,
      departments: this.departments,
      designations: this.designations,
      businessUnits: this.businessUnits,
      shifts: this.shiftPolicies,
      weeklyOff: this.weeklyOffPolicies,
      announcements: this.announcements,
      penalties: this.penalties
    };

    const paginatedMap: any = {
      locations: (d: any) => this.paginatedLocations = d,
      departments: (d: any) => this.paginatedDepartments = d,
      designations: (d: any) => this.paginatedDesignations = d,
      businessUnits: (d: any) => this.paginatedBusinessUnits = d,
      shifts: (d: any) => this.paginatedShifts = d,
      weeklyOff: (d: any) => this.paginatedWeeklyOff = d,
      announcements: (d: any) => this.paginatedAnnouncements = d,
      penalties: (d: any) => this.paginatedPenalties = d
    };

    const startIndex = (this.currentPage[entity] - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    paginatedMap[entity](dataMap[entity].slice(startIndex, endIndex));
  }

  nextPage(entity: string) {
    if (this.currentPage[entity] < this.totalPages[entity]) {
      this.currentPage[entity]++;
      this.updatePaginatedData(entity);
    }
  }

  prevPage(entity: string) {
    if (this.currentPage[entity] > 1) {
      this.currentPage[entity]--;
      this.updatePaginatedData(entity);
    }
  }

  // Search/Filter Method
  onSearch(searchTerm: string) {
    // Reset to first page when searching
    this.currentPage[this.activeTab] = 1;

    // Get the appropriate backup data list
    const backupMap: any = {
      locations: this.locationsBackup,
      departments: this.departmentsBackup,
      designations: this.designationsBackup,
      businessUnits: this.businessUnitsBackup,
      shifts: this.shiftPoliciesBackup,
      weeklyOff: this.weeklyOffPoliciesBackup,
      announcements: this.announcementsBackup,
      penalties: this.penaltiesBackup
    };

    // Restore from backup if search is cleared
    const restoreMap: any = {
      locations: () => this.locations = JSON.parse(JSON.stringify(this.locationsBackup)),
      departments: () => this.departments = JSON.parse(JSON.stringify(this.departmentsBackup)),
      designations: () => this.designations = JSON.parse(JSON.stringify(this.designationsBackup)),
      businessUnits: () => this.businessUnits = JSON.parse(JSON.stringify(this.businessUnitsBackup)),
      shifts: () => this.shiftPolicies = JSON.parse(JSON.stringify(this.shiftPoliciesBackup)),
      weeklyOff: () => this.weeklyOffPolicies = JSON.parse(JSON.stringify(this.weeklyOffPoliciesBackup)),
      announcements: () => this.announcements = JSON.parse(JSON.stringify(this.announcementsBackup)),
      penalties: () => this.penalties = JSON.parse(JSON.stringify(this.penaltiesBackup))
    };

    const originalData = backupMap[this.activeTab];

    if (!searchTerm || searchTerm.trim() === '') {
      // No search term, restore original backup data
      restoreMap[this.activeTab]();
      this.calculatePagination(this.activeTab);
      return;
    }

    const filteredData = originalData.filter((item: any) => {
      const searchLower = searchTerm.toLowerCase();

      if (this.activeTab === 'shifts') {
        return (item.name && item.name.toLowerCase().includes(searchLower)) ||
          (item.start_time && item.start_time.toLowerCase().includes(searchLower)) ||
          (item.end_time && item.end_time.toLowerCase().includes(searchLower)) ||
          (item.shift_type && item.shift_type.toLowerCase().includes(searchLower));
      }

      if (this.activeTab === 'announcements') {
        return (item.title && item.title.toLowerCase().includes(searchLower)) ||
          (item.body && item.body.toLowerCase().includes(searchLower));
      }

      if (this.activeTab === 'weeklyOff') {
        return (item.name && item.name.toLowerCase().includes(searchLower)) ||
          (item.policy_code && item.policy_code.toLowerCase().includes(searchLower)) ||
          (item.description && item.description.toLowerCase().includes(searchLower));
      }

      // Generic search for locations, departments, etc.
      if (this.activeTab === 'penalties') {
        const plan = this.leavePlans.find(p => p.id === item.leave_plan_id);
        const planNameFromList = item.leave_plan_name || '';
        return (plan && plan.name.toLowerCase().includes(searchLower)) ||
          (planNameFromList.toLowerCase().includes(searchLower)) ||
          (item.threshold_hours && item.threshold_hours.toString().includes(searchLower)) ||
          (item.threshold_minutes && item.threshold_minutes.toString().includes(searchLower)) ||
          (item.break_time && item.break_time.toString().includes(searchLower));
      }

      return (item.name && item.name.toLowerCase().includes(searchLower));
    });

    // Update the main data list with filtered results
    const updateMap: any = {
      locations: () => this.locations = filteredData,
      departments: () => this.departments = filteredData,
      designations: () => this.designations = filteredData,
      businessUnits: () => this.businessUnits = filteredData,
      shifts: () => this.shiftPolicies = filteredData,
      weeklyOff: () => this.weeklyOffPolicies = filteredData,
      announcements: () => this.announcements = filteredData,
      penalties: () => this.penalties = filteredData
    };

    updateMap[this.activeTab]();

    // Recalculate pagination with filtered data
    this.calculatePagination(this.activeTab);
  }

  // Get search term for current tab
  getSearchTerm(): string {
    const map: any = {
      locations: this.searchLocationTerm,
      departments: this.searchDepartmentTerm,
      designations: this.searchDesignationTerm,
      businessUnits: this.searchBusinessUnitTerm,
      shifts: this.searchShiftTerm,
      weeklyOff: this.searchWeeklyOffTerm,
      announcements: this.searchAnnouncementTerm,
      penalties: this.searchPenaltyTerm
    };
    return map[this.activeTab] || '';
  }

  // Set search term for current tab
  setSearchTerm(value: string) {
    const map: any = {
      locations: () => this.searchLocationTerm = value,
      departments: () => this.searchDepartmentTerm = value,
      designations: () => this.searchDesignationTerm = value,
      businessUnits: () => this.searchBusinessUnitTerm = value,
      shifts: () => this.searchShiftTerm = value,
      weeklyOff: () => this.searchWeeklyOffTerm = value,
      announcements: () => this.searchAnnouncementTerm = value,
      penalties: () => this.searchPenaltyTerm = value
    };
    map[this.activeTab]();
  }

  // Template Helper Methods
  getPlanName(id: number): string {
    const plan = this.leavePlans.find(p => p.id === id);
    return plan ? plan.name : 'Unknown Plan';
  }

  getTabIcon(): string {
    const icons: any = {
      locations: 'location-outline',
      departments: 'business-outline',
      designations: 'id-card-outline',
      businessUnits: 'layers-outline',
      shifts: 'time-outline',
      weeklyOff: 'calendar-outline',
      announcements: 'megaphone-outline',
      penalties: 'alert-circle-outline'
    };
    return icons[this.activeTab] || 'cube-outline';
  }

  getEntityList(): any[] {
    const map: any = {
      locations: this.locations,
      departments: this.departments,
      designations: this.designations,
      businessUnits: this.businessUnits,
      shifts: this.shiftPolicies,
      weeklyOff: this.weeklyOffPolicies,
      announcements: this.announcements,
      penalties: this.penalties
    };
    return map[this.activeTab] || [];
  }

  getPaginatedList(): any[] {
    const map: any = {
      locations: this.paginatedLocations,
      departments: this.paginatedDepartments,
      designations: this.paginatedDesignations,
      businessUnits: this.paginatedBusinessUnits,
      shifts: this.paginatedShifts,
      weeklyOff: this.paginatedWeeklyOff,
      announcements: this.paginatedAnnouncements,
      penalties: this.paginatedPenalties
    };
    return map[this.activeTab] || [];
  }

  getTabKey(): string {
    return this.activeTab;
  }

  handleEdit(item: any) {
    const map: any = {
      locations: () => this.editLocation(item),
      departments: () => this.editDepartment(item),
      designations: () => this.editDesignation(item),
      businessUnits: () => this.editBusinessUnit(item),
      shifts: () => this.editShift(item),
      weeklyOff: () => this.editWeeklyOff(item),
      announcements: () => this.editAnnouncement(item),
      penalties: () => this.editPenalty(item)
    };
    map[this.activeTab]();
  }

  handleDelete(id: number) {
    const map: any = {
      locations: () => this.deleteLocation(id),
      departments: () => this.deleteDepartment(id),
      designations: () => this.deleteDesignation(id),
      businessUnits: () => this.deleteBusinessUnit(id),
      shifts: () => this.deleteShift(id),
      weeklyOff: () => this.deleteWeeklyOff(id),
      announcements: () => this.deleteAnnouncement(id),
      penalties: () => this.deletePenalty(id)
    };
    map[this.activeTab]();
  }

  handleCancel() {
    const map: any = {
      locations: () => this.cancelLocation(),
      departments: () => this.cancelDepartment(),
      designations: () => this.cancelDesignation(),
      businessUnits: () => this.cancelBusinessUnit(),
      shifts: () => this.cancelShift(),
      weeklyOff: () => this.cancelWeeklyOff(),
      announcements: () => this.cancelAnnouncement(),
      penalties: () => this.cancelPenalty()
    };
    map[this.activeTab]();
  }

  handleSave() {
    const map: any = {
      locations: () => this.saveLocation(),
      departments: () => this.saveDepartment(),
      designations: () => this.saveDesignation(),
      businessUnits: () => this.saveBusinessUnit(),
      shifts: () => this.saveShift(),
      weeklyOff: () => this.saveWeeklyOff(),
      announcements: () => this.saveAnnouncement(),
      penalties: () => this.savePenalty()
    };
    map[this.activeTab]();
  }

  isEditing(): boolean {
    const map: any = {
      locations: !!this.editingLocationId,
      departments: !!this.editingDepartmentId,
      designations: !!this.editingDesignationId,
      businessUnits: !!this.editingBusinessUnitId,
      shifts: !!this.editingShiftId,
      weeklyOff: !!this.editingWeeklyOffId,
      announcements: !!this.editingAnnouncementId,
      penalties: !!this.editingPenaltyId
    };
    return map[this.activeTab];
  }

  canSave(): boolean {
    switch (this.activeTab) {
      case 'locations': return !!this.locationName;
      case 'departments': return !!this.departmentName;
      case 'designations': return !!this.designationName;
      case 'businessUnits': return !!this.businessUnitName;
      case 'shifts': return !!this.shiftForm.name && !!this.shiftForm.start_time && !!this.shiftForm.end_time;
      case 'weeklyOff': return !!this.weeklyOffPolicyForm.name && (this.editingWeeklyOffId ? true : !!this.weeklyOffPolicyForm.policy_code);
      case 'announcements': return !!this.announcementForm.title && !!this.announcementForm.body;
      case 'penalties':
        return !!this.penaltyForm.leave_plan_id &&
          (this.penaltyType === 'missingLogs' ? !!this.penaltyForm.threshold_hours : 
           this.penaltyType === 'lateArrivals' ? !!this.penaltyForm.threshold_minutes : 
           !!this.penaltyForm.break_time);
      default: return false;
    }
  }
  getShiftName(id: number) {
    return this.leavePlans.find(s => s.id === id)?.name || 
           'Unknown Plan';
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}