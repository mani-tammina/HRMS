import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import * as XLSX from 'xlsx';
import {
  HolidayService,
  Holiday,
  HolidayListMaster,
  HolidaySummary,
  HolidayMeta,
  BulkUploadResponse
} from 'src/app/core/services/holiday.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

interface CalendarMonth {
  name: string;
  monthIndex: number;
  holidays: Holiday[];
}

@Component({
  selector: 'app-holidays-admin',
  templateUrl: './holidays-admin.page.html',
  styleUrls: ['./holidays-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class HolidaysAdminPage implements OnInit, OnDestroy {
  isLoading = false;
  isSaving = false;
  isUploading = false;
  isExporting = false;

  // Data
  holidays: Holiday[] = [];
  filteredHolidays: Holiday[] = [];
  meta: HolidayMeta = {
    locations: [],
    shiftPolicies: [],
    projectShifts: [],
    holidayLists: []
  };
  summary: HolidaySummary = {
    year: new Date().getFullYear(),
    total: 0,
    public_count: 0,
    optional_count: 0,
    upcoming_count: 0,
    locations_count: 0,
    shifts_count: 0
  };

  // Filter States
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  selectedLocationIds: number[] = [];
  selectedShiftPolicyIds: number[] = [];
  selectedHolidayListIds: number[] = [];
  selectedType: string = '';
  searchQuery: string = '';
  viewMode: 'table' | 'cards' | 'calendar' = 'table';

  // Filter Dropdown Open States
  isLocationFilterOpen = false;
  isShiftFilterOpen = false;
  isHolidayListFilterOpen = false;

  // Multi-Selection (for bulk action on holidays)
  selectedIds = new Set<number>();
  selectAll = false;

  // Calendar View Data
  calendarMonths: CalendarMonth[] = [];

  // Modals
  showUploadModal = false;
  showAddEditModal = false;
  showManageListsModal = false;
  showAssignModal = false;
  showDeleteConfirm = false;
  itemToDelete: Holiday | null = null;
  isBulkDelete = false;

  // Add / Edit Form State
  isEditing = false;
  holidayModel: Partial<Holiday> = {
    holiday_date: '',
    holiday_name: '',
    day_name: '',
    holiday_type: 'public',
    description: '',
    holiday_list_id: null,
    location_id: null,
    shift_policy_id: null,
    is_active: 1
  };
  addEditLocationIds: number[] = [];
  addEditAllLocations = true;
  addEditShiftPolicyIds: number[] = [];
  addEditAllShifts = true;
  isAddEditLocDropdownOpen = false;
  isAddEditShiftDropdownOpen = false;

  // Bulk / Quick Assign Form State
  assignSelectedHolidayIds: number[] = [];
  assignSelectedHolidaysList: Holiday[] = [];
  assignLocationIds: number[] = [];
  assignAllLocations = true;
  assignShiftPolicyIds: number[] = [];
  assignAllShifts = true;
  assignHolidayListId: number | null = null;
  isAssigning = false;
  isAssignLocDropdownOpen = false;
  isAssignShiftDropdownOpen = false;

  // Upload Form State
  uploadFile: File | null = null;
  uploadFileName: string = '';
  uploadTargetHolidayListId: string | number = '';
  uploadTargetLocationId: string | number = '';
  uploadTargetShiftPolicyId: string | number = '';
  uploadOverwrite = true;
  previewRows: Array<{
    date: string;
    name: string;
    type: string;
    location: string;
    shift: string;
    holidayList: string;
    isValid: boolean;
    errorMsg?: string;
  }> = [];
  uploadResult: BulkUploadResponse | null = null;

  // Holiday List Group Form State
  editingListId: number | null = null;
  holidayListModel: Partial<HolidayListMaster> = {
    name: '',
    description: '',
    location_id: null,
    shift_policy_id: null,
    is_active: 1
  };

  private searchSubject = new Subject<string>();
  private searchSub?: Subscription;

  constructor(
    private holidayService: HolidayService,
    private toaster: ToasterService,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.years = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];
    this.selectedYear = currentYear;
  }

  ngOnInit() {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe(() => {
        this.applyLocalFilters();
      });

    this.loadMeta();
    this.loadData();
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  // Close all custom dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multiselect-dropdown')) {
      this.isLocationFilterOpen = false;
      this.isShiftFilterOpen = false;
      this.isHolidayListFilterOpen = false;
      this.isAddEditLocDropdownOpen = false;
      this.isAddEditShiftDropdownOpen = false;
      this.isAssignLocDropdownOpen = false;
      this.isAssignShiftDropdownOpen = false;
    }
  }

  goBack() {
    this.router.navigate(['/administration']);
  }

  /* ============ DATA FETCHING ============ */

  loadMeta() {
    this.holidayService.getMeta().subscribe({
      next: (meta) => {
        this.meta = meta;
      },
      error: (err) => {
        console.warn('Could not load metadata:', err);
      }
    });
  }

  loadData() {
    this.isLoading = true;
    this.selectedIds.clear();
    this.selectAll = false;

    this.holidayService.getSummary(this.selectedYear).subscribe({
      next: (sum) => {
        this.summary = sum;
      },
      error: (err) => {
        console.warn('Could not load summary:', err);
      }
    });

    this.holidayService.getHolidays({
      year: this.selectedYear,
      location_ids: this.selectedLocationIds.length > 0 ? this.selectedLocationIds : undefined,
      shift_policy_ids: this.selectedShiftPolicyIds.length > 0 ? this.selectedShiftPolicyIds : undefined,
      holiday_list_ids: this.selectedHolidayListIds.length > 0 ? this.selectedHolidayListIds : undefined,
      holiday_type: this.selectedType
    }).subscribe({
      next: (data) => {
        this.holidays = data || [];
        this.applyLocalFilters();
        this.buildCalendarMonths();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toaster.showError('Failed to load holidays: ' + (err.error?.error || err.message));
      }
    });
  }

  /* ============ FILTER MULTI-SELECT HANDLERS ============ */

  onSearchChange(val: string) {
    this.searchSubject.next(val);
  }

  onFilterChange() {
    this.loadData();
  }

  // Location Filter
  toggleLocationFilterDropdown(event: Event) {
    event.stopPropagation();
    this.isLocationFilterOpen = !this.isLocationFilterOpen;
    this.isShiftFilterOpen = false;
    this.isHolidayListFilterOpen = false;
  }

  toggleAllLocationsFilter() {
    if (this.selectedLocationIds.length === 0) {
      // If was All Locations, keep all
      this.selectedLocationIds = [];
    } else {
      this.selectedLocationIds = [];
    }
    this.loadData();
  }

  toggleLocationFilter(locId: number) {
    const idx = this.selectedLocationIds.indexOf(locId);
    if (idx > -1) {
      this.selectedLocationIds.splice(idx, 1);
    } else {
      this.selectedLocationIds.push(locId);
    }
    this.loadData();
  }

  isLocationFilterSelected(locId: number): boolean {
    if (this.selectedLocationIds.length === 0) return true;
    return this.selectedLocationIds.includes(locId);
  }

  get isAllLocationsFilterActive(): boolean {
    return this.selectedLocationIds.length === 0;
  }

  getLocationFilterSummary(): string {
    if (this.selectedLocationIds.length === 0 || this.selectedLocationIds.length === this.meta.locations.length) {
      return 'All Locations';
    }
    if (this.selectedLocationIds.length === 1) {
      const found = this.meta.locations.find(l => l.id === this.selectedLocationIds[0]);
      return found ? found.name : '1 Location';
    }
    return `${this.selectedLocationIds.length} Locations`;
  }

  // Shift Policy Filter
  toggleShiftFilterDropdown(event: Event) {
    event.stopPropagation();
    this.isShiftFilterOpen = !this.isShiftFilterOpen;
    this.isLocationFilterOpen = false;
    this.isHolidayListFilterOpen = false;
  }

  toggleAllShiftsFilter() {
    this.selectedShiftPolicyIds = [];
    this.loadData();
  }

  toggleShiftFilter(shiftId: number) {
    const idx = this.selectedShiftPolicyIds.indexOf(shiftId);
    if (idx > -1) {
      this.selectedShiftPolicyIds.splice(idx, 1);
    } else {
      this.selectedShiftPolicyIds.push(shiftId);
    }
    this.loadData();
  }

  isShiftFilterSelected(shiftId: number): boolean {
    if (this.selectedShiftPolicyIds.length === 0) return true;
    return this.selectedShiftPolicyIds.includes(shiftId);
  }

  get isAllShiftsFilterActive(): boolean {
    return this.selectedShiftPolicyIds.length === 0;
  }

  getShiftFilterSummary(): string {
    if (this.selectedShiftPolicyIds.length === 0 || this.selectedShiftPolicyIds.length === this.meta.shiftPolicies.length) {
      return 'All Shift Policies';
    }
    if (this.selectedShiftPolicyIds.length === 1) {
      const found = this.meta.shiftPolicies.find(s => s.id === this.selectedShiftPolicyIds[0]);
      return found ? found.name : '1 Shift Policy';
    }
    return `${this.selectedShiftPolicyIds.length} Shift Policies`;
  }

  // Holiday List Filter
  toggleHolidayListFilterDropdown(event: Event) {
    event.stopPropagation();
    this.isHolidayListFilterOpen = !this.isHolidayListFilterOpen;
    this.isLocationFilterOpen = false;
    this.isShiftFilterOpen = false;
  }

  toggleAllHolidayListsFilter() {
    this.selectedHolidayListIds = [];
    this.loadData();
  }

  toggleHolidayListFilter(hListId: number) {
    const idx = this.selectedHolidayListIds.indexOf(hListId);
    if (idx > -1) {
      this.selectedHolidayListIds.splice(idx, 1);
    } else {
      this.selectedHolidayListIds.push(hListId);
    }
    this.loadData();
  }

  isHolidayListFilterSelected(hListId: number): boolean {
    if (this.selectedHolidayListIds.length === 0) return true;
    return this.selectedHolidayListIds.includes(hListId);
  }

  get isAllHolidayListsFilterActive(): boolean {
    return this.selectedHolidayListIds.length === 0;
  }

  getHolidayListFilterSummary(): string {
    if (this.selectedHolidayListIds.length === 0 || this.selectedHolidayListIds.length === this.meta.holidayLists.length) {
      return 'All Holiday Lists';
    }
    if (this.selectedHolidayListIds.length === 1) {
      const found = this.meta.holidayLists.find(h => h.id === this.selectedHolidayListIds[0]);
      return found ? found.name : '1 Holiday List';
    }
    return `${this.selectedHolidayListIds.length} Holiday Lists`;
  }

  applyLocalFilters() {
    if (!this.searchQuery || !this.searchQuery.trim()) {
      this.filteredHolidays = [...this.holidays];
    } else {
      const q = this.searchQuery.toLowerCase().trim();
      this.filteredHolidays = this.holidays.filter(h =>
        (h.holiday_name && h.holiday_name.toLowerCase().includes(q)) ||
        (h.description && h.description.toLowerCase().includes(q)) ||
        (h.day_name && h.day_name.toLowerCase().includes(q)) ||
        (h.holiday_list_name && h.holiday_list_name.toLowerCase().includes(q)) ||
        (h.location_name && h.location_name.toLowerCase().includes(q)) ||
        (h.shift_policy_name && h.shift_policy_name.toLowerCase().includes(q))
      );
    }
    this.buildCalendarMonths();
  }

  buildCalendarMonths() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    this.calendarMonths = monthNames.map((name, index) => {
      const mHolidays = this.filteredHolidays.filter(h => {
        if (!h.holiday_date) return false;
        const d = new Date(h.holiday_date);
        return d.getMonth() === index;
      }).sort((a, b) => new Date(a.holiday_date).getTime() - new Date(b.holiday_date).getTime());

      return {
        name,
        monthIndex: index,
        holidays: mHolidays
      };
    });
  }

  /* ============ MULTI-SELECT ACTIONS ============ */

  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    this.selectedIds.clear();
    if (this.selectAll) {
      this.filteredHolidays.forEach(h => {
        if (h.id) this.selectedIds.add(h.id);
      });
    }
  }

  toggleSelectItem(id?: number) {
    if (!id) return;
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.selectAll = this.selectedIds.size === this.filteredHolidays.length && this.filteredHolidays.length > 0;
  }

  confirmBulkDelete() {
    if (this.selectedIds.size === 0) return;
    this.isBulkDelete = true;
    this.showDeleteConfirm = true;
  }

  /* ============ BULK ASSIGN HOLIDAYS ============ */

  openBulkAssignModal(singleItem?: Holiday) {
    if (singleItem && singleItem.id) {
      this.assignSelectedHolidayIds = [singleItem.id];
      this.assignSelectedHolidaysList = [singleItem];
    } else {
      this.assignSelectedHolidayIds = Array.from(this.selectedIds);
      this.assignSelectedHolidaysList = this.filteredHolidays.filter(h => h.id && this.selectedIds.has(h.id));
    }

    if (this.assignSelectedHolidayIds.length === 0) {
      this.toaster.showWarning('Please select at least one holiday to assign.');
      return;
    }

    // Default to All or first item's settings
    this.assignAllLocations = true;
    this.assignLocationIds = [];
    this.assignAllShifts = true;
    this.assignShiftPolicyIds = [];
    this.assignHolidayListId = null;

    if (singleItem) {
      if (singleItem.applicable_locations) {
        try {
          const parsed = typeof singleItem.applicable_locations === 'string' ? JSON.parse(singleItem.applicable_locations) : singleItem.applicable_locations;
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.assignLocationIds = parsed.map(Number);
            this.assignAllLocations = false;
          }
        } catch (e) {
          if (singleItem.location_id) {
            this.assignLocationIds = [singleItem.location_id];
            this.assignAllLocations = false;
          }
        }
      } else if (singleItem.location_id) {
        this.assignLocationIds = [singleItem.location_id];
        this.assignAllLocations = false;
      }

      if (singleItem.applicable_shifts) {
        try {
          const parsed = typeof singleItem.applicable_shifts === 'string' ? JSON.parse(singleItem.applicable_shifts) : singleItem.applicable_shifts;
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.assignShiftPolicyIds = parsed.map(Number);
            this.assignAllShifts = false;
          }
        } catch (e) {
          if (singleItem.shift_policy_id) {
            this.assignShiftPolicyIds = [singleItem.shift_policy_id];
            this.assignAllShifts = false;
          }
        }
      } else if (singleItem.shift_policy_id) {
        this.assignShiftPolicyIds = [singleItem.shift_policy_id];
        this.assignAllShifts = false;
      }

      if (singleItem.holiday_list_id) {
        this.assignHolidayListId = singleItem.holiday_list_id;
      }
    }

    this.showAssignModal = true;
  }

  toggleAssignAllLocations() {
    this.assignAllLocations = !this.assignAllLocations;
    if (this.assignAllLocations) {
      this.assignLocationIds = [];
    } else {
      this.assignLocationIds = this.meta.locations.map(l => l.id);
    }
  }

  toggleAssignLocation(locId: number) {
    this.assignAllLocations = false;
    const idx = this.assignLocationIds.indexOf(locId);
    if (idx > -1) {
      this.assignLocationIds.splice(idx, 1);
    } else {
      this.assignLocationIds.push(locId);
    }
    if (this.assignLocationIds.length === this.meta.locations.length || this.assignLocationIds.length === 0) {
      this.assignAllLocations = true;
      this.assignLocationIds = [];
    }
  }

  isAssignLocationChecked(locId: number): boolean {
    return this.assignAllLocations || this.assignLocationIds.includes(locId);
  }

  toggleAssignAllShifts() {
    this.assignAllShifts = !this.assignAllShifts;
    if (this.assignAllShifts) {
      this.assignShiftPolicyIds = [];
    } else {
      this.assignShiftPolicyIds = this.meta.shiftPolicies.map(s => s.id);
    }
  }

  toggleAssignShift(shiftId: number) {
    this.assignAllShifts = false;
    const idx = this.assignShiftPolicyIds.indexOf(shiftId);
    if (idx > -1) {
      this.assignShiftPolicyIds.splice(idx, 1);
    } else {
      this.assignShiftPolicyIds.push(shiftId);
    }
    if (this.assignShiftPolicyIds.length === this.meta.shiftPolicies.length || this.assignShiftPolicyIds.length === 0) {
      this.assignAllShifts = true;
      this.assignShiftPolicyIds = [];
    }
  }

  isAssignShiftChecked(shiftId: number): boolean {
    return this.assignAllShifts || this.assignShiftPolicyIds.includes(shiftId);
  }

  executeBulkAssign() {
    if (this.assignSelectedHolidayIds.length === 0) return;

    this.isAssigning = true;
    const locIds = this.assignAllLocations ? null : this.assignLocationIds;
    const shiftIds = this.assignAllShifts ? null : this.assignShiftPolicyIds;

    this.holidayService.bulkAssignHolidays({
      holiday_ids: this.assignSelectedHolidayIds,
      location_ids: locIds || undefined,
      shift_policy_ids: shiftIds || undefined,
      holiday_list_id: this.assignHolidayListId
    }).subscribe({
      next: (res) => {
        this.isAssigning = false;
        this.showAssignModal = false;
        this.toaster.showSuccess(res.message || 'Holidays successfully assigned to employees!');
        this.loadData();
      },
      error: (err) => {
        this.isAssigning = false;
        this.toaster.showError('Assignment failed: ' + (err.error?.error || err.message));
      }
    });
  }

  /* ============ SINGLE ADD / EDIT MODAL ============ */

  openAddModal() {
    this.isEditing = false;
    this.holidayModel = {
      holiday_date: '',
      holiday_name: '',
      day_name: '',
      holiday_type: 'public',
      description: '',
      holiday_list_id: this.selectedHolidayListIds.length === 1 ? this.selectedHolidayListIds[0] : null,
      location_id: null,
      shift_policy_id: null,
      is_active: 1
    };
    this.addEditAllLocations = true;
    this.addEditLocationIds = [];
    this.addEditAllShifts = true;
    this.addEditShiftPolicyIds = [];
    this.showAddEditModal = true;
  }

  openEditModal(item: Holiday) {
    this.isEditing = true;
    let formattedDate = item.holiday_date;
    if (formattedDate) {
      formattedDate = new Date(formattedDate).toISOString().split('T')[0];
    }
    this.holidayModel = {
      ...item,
      holiday_date: formattedDate,
      holiday_list_id: item.holiday_list_id ? Number(item.holiday_list_id) : null,
      location_id: item.location_id ? Number(item.location_id) : null,
      shift_policy_id: item.shift_policy_id ? Number(item.shift_policy_id) : null,
      is_active: item.is_active ? 1 : 0
    };

    // Parse applicable_locations
    if (item.applicable_locations) {
      try {
        const parsed = typeof item.applicable_locations === 'string' ? JSON.parse(item.applicable_locations) : item.applicable_locations;
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.addEditLocationIds = parsed.map(Number);
          this.addEditAllLocations = false;
        } else {
          this.addEditAllLocations = true;
          this.addEditLocationIds = [];
        }
      } catch (e) {
        if (item.location_id) {
          this.addEditLocationIds = [item.location_id];
          this.addEditAllLocations = false;
        } else {
          this.addEditAllLocations = true;
          this.addEditLocationIds = [];
        }
      }
    } else if (item.location_id) {
      this.addEditLocationIds = [item.location_id];
      this.addEditAllLocations = false;
    } else {
      this.addEditAllLocations = true;
      this.addEditLocationIds = [];
    }

    // Parse applicable_shifts
    if (item.applicable_shifts) {
      try {
        const parsed = typeof item.applicable_shifts === 'string' ? JSON.parse(item.applicable_shifts) : item.applicable_shifts;
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.addEditShiftPolicyIds = parsed.map(Number);
          this.addEditAllShifts = false;
        } else {
          this.addEditAllShifts = true;
          this.addEditShiftPolicyIds = [];
        }
      } catch (e) {
        if (item.shift_policy_id) {
          this.addEditShiftPolicyIds = [item.shift_policy_id];
          this.addEditAllShifts = false;
        } else {
          this.addEditAllShifts = true;
          this.addEditShiftPolicyIds = [];
        }
      }
    } else if (item.shift_policy_id) {
      this.addEditShiftPolicyIds = [item.shift_policy_id];
      this.addEditAllShifts = false;
    } else {
      this.addEditAllShifts = true;
      this.addEditShiftPolicyIds = [];
    }

    this.onDateChange();
    this.showAddEditModal = true;
  }

  toggleAddEditAllLocations() {
    this.addEditAllLocations = !this.addEditAllLocations;
    if (this.addEditAllLocations) {
      this.addEditLocationIds = [];
    } else {
      this.addEditLocationIds = this.meta.locations.map(l => l.id);
    }
  }

  toggleAddEditLocation(locId: number) {
    this.addEditAllLocations = false;
    const idx = this.addEditLocationIds.indexOf(locId);
    if (idx > -1) {
      this.addEditLocationIds.splice(idx, 1);
    } else {
      this.addEditLocationIds.push(locId);
    }
    if (this.addEditLocationIds.length === this.meta.locations.length || this.addEditLocationIds.length === 0) {
      this.addEditAllLocations = true;
      this.addEditLocationIds = [];
    }
  }

  isAddEditLocationChecked(locId: number): boolean {
    return this.addEditAllLocations || this.addEditLocationIds.includes(locId);
  }

  toggleAddEditAllShifts() {
    this.addEditAllShifts = !this.addEditAllShifts;
    if (this.addEditAllShifts) {
      this.addEditShiftPolicyIds = [];
    } else {
      this.addEditShiftPolicyIds = this.meta.shiftPolicies.map(s => s.id);
    }
  }

  toggleAddEditShift(shiftId: number) {
    this.addEditAllShifts = false;
    const idx = this.addEditShiftPolicyIds.indexOf(shiftId);
    if (idx > -1) {
      this.addEditShiftPolicyIds.splice(idx, 1);
    } else {
      this.addEditShiftPolicyIds.push(shiftId);
    }
    if (this.addEditShiftPolicyIds.length === this.meta.shiftPolicies.length || this.addEditShiftPolicyIds.length === 0) {
      this.addEditAllShifts = true;
      this.addEditShiftPolicyIds = [];
    }
  }

  isAddEditShiftChecked(shiftId: number): boolean {
    return this.addEditAllShifts || this.addEditShiftPolicyIds.includes(shiftId);
  }

  onDateChange() {
    if (this.holidayModel.holiday_date) {
      const d = new Date(this.holidayModel.holiday_date);
      if (!isNaN(d.getTime())) {
        this.holidayModel.day_name = d.toLocaleDateString('en-US', { weekday: 'long' });
      }
    }
  }

  saveHoliday() {
    if (!this.holidayModel.holiday_date || !this.holidayModel.holiday_name?.trim()) {
      this.toaster.showWarning('Please enter both Holiday Date and Holiday Name');
      return;
    }

    this.isSaving = true;

    const locIds = this.addEditAllLocations ? null : this.addEditLocationIds;
    const shiftIds = this.addEditAllShifts ? null : this.addEditShiftPolicyIds;

    const payload = {
      ...this.holidayModel,
      holiday_name: this.holidayModel.holiday_name.trim(),
      holiday_list_id: this.holidayModel.holiday_list_id || null,
      location_id: (locIds && locIds.length === 1) ? locIds[0] : null,
      shift_policy_id: (shiftIds && shiftIds.length === 1) ? shiftIds[0] : null,
      applicable_locations: locIds,
      applicable_shifts: shiftIds
    };

    if (this.isEditing && this.holidayModel.id) {
      this.holidayService.updateHoliday(this.holidayModel.id, payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.showAddEditModal = false;
          this.toaster.showSuccess('Holiday updated successfully!');
          this.loadData();
        },
        error: (err) => {
          this.isSaving = false;
          this.toaster.showError('Update failed: ' + (err.error?.error || err.message));
        }
      });
    } else {
      this.holidayService.createHoliday(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.showAddEditModal = false;
          this.toaster.showSuccess('Holiday created successfully!');
          this.loadData();
        },
        error: (err) => {
          this.isSaving = false;
          this.toaster.showError('Creation failed: ' + (err.error?.error || err.message));
        }
      });
    }
  }

  /* ============ DELETE ACTIONS ============ */

  openDeleteConfirm(item: Holiday) {
    this.itemToDelete = item;
    this.isBulkDelete = false;
    this.showDeleteConfirm = true;
  }

  executeDelete() {
    if (this.isBulkDelete) {
      const ids = Array.from(this.selectedIds);
      this.holidayService.bulkDeleteHolidays(ids).subscribe({
        next: (res) => {
          this.showDeleteConfirm = false;
          this.toaster.showSuccess(res.message || 'Deleted successfully');
          this.loadData();
        },
        error: (err) => {
          this.toaster.showError('Bulk delete failed: ' + (err.error?.error || err.message));
        }
      });
    } else if (this.itemToDelete?.id) {
      this.holidayService.deleteHoliday(this.itemToDelete.id).subscribe({
        next: () => {
          this.showDeleteConfirm = false;
          this.toaster.showSuccess('Holiday deleted successfully');
          this.loadData();
        },
        error: (err) => {
          this.toaster.showError('Delete failed: ' + (err.error?.error || err.message));
        }
      });
    }
  }

  /* ============ BULK UPLOAD WITH PREVIEW ============ */

  openUploadModal() {
    this.uploadFile = null;
    this.uploadFileName = '';
    this.previewRows = [];
    this.uploadResult = null;
    this.uploadTargetHolidayListId = this.selectedHolidayListIds.length === 1 ? this.selectedHolidayListIds[0] : '';
    this.uploadTargetLocationId = this.selectedLocationIds.length === 1 ? this.selectedLocationIds[0] : '';
    this.uploadTargetShiftPolicyId = this.selectedShiftPolicyIds.length === 1 ? this.selectedShiftPolicyIds[0] : '';
    this.uploadOverwrite = true;
    this.showUploadModal = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (file) {
      this.processSelectedFile(file);
    }
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.processSelectedFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  private processSelectedFile(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(ext || '')) {
      this.toaster.showError('Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.');
      return;
    }

    this.uploadFile = file;
    this.uploadFileName = file.name;
    this.uploadResult = null;

    // Parse locally for instantaneous interactive preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        // Find actual column header row (skips title headers like 'Teach Tammina Holidays list')
        const rawRows: any[][] = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
        let headerRowIndex = 0;
        for (let i = 0; i < Math.min(20, rawRows.length); i++) {
          const nonNullCount = (rawRows[i] || []).filter((cell: any) => cell !== null && cell !== undefined && String(cell).trim() !== '').length;
          if (nonNullCount >= 3) {
            headerRowIndex = i;
            break;
          }
        }

        const rawJson: any[] = XLSX.utils.sheet_to_json(firstSheet, { range: headerRowIndex, defval: '' });

        const parsePreviewDate = (val: any): string => {
          if (!val) return '';
          if (val instanceof Date) {
            if (isNaN(val.getTime())) return '';
            const yyyy = val.getFullYear();
            const mm = String(val.getMonth() + 1).padStart(2, '0');
            const dd = String(val.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
          }
          if (typeof val === 'number') {
            if (val > 1000 && val < 100000) {
              const d = new Date(Math.round((val - 25569) * 86400 * 1000));
              if (!isNaN(d.getTime())) {
                const yyyy = d.getUTCFullYear();
                const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
                const dd = String(d.getUTCDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
              }
            }
          }
          const str = String(val).trim();
          if (!str) return '';

          // 1. YYYY-MM-DD
          const matchYMD = str.match(/^(\d{4})[-/. ](\d{1,2})[-/. ](\d{1,2})/);
          if (matchYMD) {
            const [, y, m, d] = matchYMD;
            return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
          }

          // 2. DD-MM-YYYY
          const matchDMY = str.match(/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{4})/);
          if (matchDMY) {
            let [, p1, p2, y] = matchDMY;
            let d = parseInt(p1, 10);
            let m = parseInt(p2, 10);
            if (m > 12 && d <= 12) {
              const tmp = d;
              d = m;
              m = tmp;
            }
            return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          }

          // 3. Named month
          const monthMap: Record<string, string> = {
            jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
            jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
          };
          const matchNamed1 = str.match(/^(\d{1,2})[-/. ]([A-Za-z]+)[-/. ](\d{4})/);
          if (matchNamed1) {
            const [, d, mStr, y] = matchNamed1;
            const m = monthMap[mStr.toLowerCase().substring(0, 3)];
            if (m) return `${y}-${m}-${d.padStart(2, '0')}`;
          }

          const matchNamed2 = str.match(/^([A-Za-z]+)[-/. ](\d{1,2})[-,. ]+(\d{4})/);
          if (matchNamed2) {
            const [, mStr, d, y] = matchNamed2;
            const m = monthMap[mStr.toLowerCase().substring(0, 3)];
            if (m) return `${y}-${m}-${d.padStart(2, '0')}`;
          }

          const d = new Date(str);
          if (!isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
          }
          return str;
        };

        this.previewRows = rawJson.map((row) => {
          const rawDate = row['Holiday Date (YYYY-MM-DD)'] || row['Holiday Date'] || row['holiday_date'] || row['Date'] || row['date'] || '';
          const rawName = row['Holiday Name'] || row['holiday_name'] || row['Name'] || row['name'] || '';
          const rawType = row['Holiday Type (public/optional/restricted)'] || row['Holiday Type'] || row['holiday_type'] || row['Type'] || 'public';
          const rawLoc = row['Location'] || row['location'] || 'All Locations';
          const rawShift = row['Shift Policy'] || row['shift_policy'] || 'All Shifts';
          const rawList = row['Holiday List Name'] || row['Holiday List'] || row['holiday_list'] || 'General';

          const parsedDateStr = parsePreviewDate(rawDate);

          const isValid = !!(parsedDateStr && rawName.toString().trim());
          const errorMsg = !parsedDateStr
            ? 'Missing date'
            : !rawName.toString().trim()
            ? 'Missing name'
            : undefined;

          return {
            date: parsedDateStr,
            name: String(rawName).trim(),
            type: String(rawType).toLowerCase().trim() || 'public',
            location: String(rawLoc),
            shift: String(rawShift),
            holidayList: String(rawList),
            isValid,
            errorMsg
          };
        });
      } catch (err) {
        console.warn('Preview parse warning:', err);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  submitUpload() {
    if (!this.uploadFile) {
      this.toaster.showWarning('Please select an Excel or CSV file to upload.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.uploadFile);
    if (this.uploadTargetHolidayListId) {
      formData.append('target_holiday_list_id', String(this.uploadTargetHolidayListId));
    }
    if (this.uploadTargetLocationId) {
      formData.append('target_location_id', String(this.uploadTargetLocationId));
    }
    if (this.uploadTargetShiftPolicyId) {
      formData.append('target_shift_policy_id', String(this.uploadTargetShiftPolicyId));
    }
    formData.append('overwrite', String(this.uploadOverwrite));

    this.holidayService.uploadHolidays(formData).subscribe({
      next: (res) => {
        this.isUploading = false;
        this.uploadResult = res;
        this.toaster.showSuccess(res.message || 'Holidays uploaded successfully!');
        this.loadMeta();
        this.loadData();
      },
      error: (err) => {
        this.isUploading = false;
        this.toaster.showError('Upload failed: ' + (err.error?.error || err.message));
      }
    });
  }

  downloadTemplate() {
    this.holidayService.downloadTemplate().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Teach_Tammina_Holidays_Template.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Template downloaded successfully');
      },
      error: (err) => {
        this.toaster.showError('Could not download template: ' + err.message);
      }
    });
  }

  exportToExcel() {
    this.isExporting = true;
    this.holidayService.exportHolidays({
      year: this.selectedYear,
      location_ids: this.selectedLocationIds.length > 0 ? this.selectedLocationIds : undefined,
      shift_policy_ids: this.selectedShiftPolicyIds.length > 0 ? this.selectedShiftPolicyIds : undefined,
      holiday_list_ids: this.selectedHolidayListIds.length > 0 ? this.selectedHolidayListIds : undefined,
      holiday_type: this.selectedType
    }).subscribe({
      next: (blob) => {
        this.isExporting = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Holidays_${this.selectedYear}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Holidays exported successfully');
      },
      error: (err) => {
        this.isExporting = false;
        this.toaster.showError('Export failed: ' + err.message);
      }
    });
  }

  /* ============ HOLIDAY LISTS MASTER MODAL ============ */

  openManageListsModal() {
    this.editingListId = null;
    this.holidayListModel = {
      name: '',
      description: '',
      location_id: null,
      shift_policy_id: null,
      is_active: 1
    };
    this.showManageListsModal = true;
    this.loadMeta();
  }

  editHolidayList(list: HolidayListMaster) {
    this.editingListId = list.id || null;
    this.holidayListModel = {
      name: list.name,
      description: list.description,
      location_id: list.location_id ? Number(list.location_id) : null,
      shift_policy_id: list.shift_policy_id ? Number(list.shift_policy_id) : null,
      is_active: list.is_active ? 1 : 0
    };
  }

  resetHolidayListForm() {
    this.editingListId = null;
    this.holidayListModel = {
      name: '',
      description: '',
      location_id: null,
      shift_policy_id: null,
      is_active: 1
    };
  }

  saveHolidayList() {
    if (!this.holidayListModel.name?.trim()) {
      this.toaster.showWarning('Please enter a name for the Holiday List');
      return;
    }

    if (this.editingListId) {
      this.holidayService.updateHolidayList(this.editingListId, this.holidayListModel).subscribe({
        next: () => {
          this.toaster.showSuccess('Holiday List updated');
          this.resetHolidayListForm();
          this.loadMeta();
        },
        error: (err) => {
          this.toaster.showError('Update failed: ' + (err.error?.error || err.message));
        }
      });
    } else {
      this.holidayService.createHolidayList(this.holidayListModel).subscribe({
        next: () => {
          this.toaster.showSuccess('Holiday List created');
          this.resetHolidayListForm();
          this.loadMeta();
        },
        error: (err) => {
          this.toaster.showError('Creation failed: ' + (err.error?.error || err.message));
        }
      });
    }
  }

  deleteHolidayList(list: HolidayListMaster) {
    if (!list.id) return;
    if (confirm(`Are you sure you want to delete the holiday list "${list.name}"?`)) {
      this.holidayService.deleteHolidayList(list.id).subscribe({
        next: () => {
          this.toaster.showSuccess('Holiday List deleted');
          this.loadMeta();
        },
        error: (err) => {
          this.toaster.showError('Delete failed: ' + (err.error?.error || err.message));
        }
      });
    }
  }

  /* ============ HELPERS ============ */

  formatDate(dateStr?: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getDayNumber(dateStr?: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : String(d.getDate()).padStart(2, '0');
  }

  getMonthShort(dateStr?: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short' });
  }

  isUpcoming(dateStr?: string): boolean {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(dateStr);
    return d >= today;
  }
}
