import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { environment } from '../../../../../environments/environment';
import { ToasterService } from '../../../../core/services/toaster.service';

export interface PreviewPaymentRow {
  rowNumber: number;
  employee_number: string;
  employee_name: string;
  department?: string;
  employee_id?: number;
  payment_type: string;
  amount: number;
  amount_formatted: string;
  remarks: string;
  status: 'VALID' | 'INVALID' | 'SKIPPED';
  statusMessage: string;
}

export interface ValidationError {
  rowNumber: number;
  employeeNumber: string;
  fileEmployeeName: string;
  systemEmployeeName: string;
  reason: string;
}

export interface UploadedRecord {
  rowNumber: number;
  employee_id?: number;
  employee_number: string;
  employee_name: string;
  department?: string;
  payment_type: string;
  amount: number;
  remarks: string;
}

@Component({
  selector: 'app-import-one-time-payments',
  templateUrl: './import-one-time-payments.page.html',
  styleUrls: ['./import-one-time-payments.page.scss'],
  standalone: false
})
export class ImportOneTimePaymentsPage implements OnInit {
  private apiUrl = environment.apiURL || '';

  selectedMonth: string = '2026-11';
  monthLabel: string = 'NOV-2026';

  // Stepper state: 1 (Upload), 2 (Map Columns), 3 (Review & Import)
  currentStep: number = 1;

  isLoading: boolean = false;
  isImporting: boolean = false;

  // Active employees for validation
  workingEmployees: any[] = [];
  existingBonusCodes: Set<string> = new Set();

  // Uploaded file details
  selectedFile: File | null = null;
  selectedFileName: string = '';
  detectedHeaders: string[] = [];
  rawSheetRows: any[][] = [];

  // Step 2 Mapping selections
  empNoColumn: string = '';
  paymentTypeColumn: string = '';
  amountColumn: string = '';
  remarksColumn: string = '';

  // Step 3 Preview & Validation
  previewRows: PreviewPaymentRow[] = [];
  previewSearchTerm: string = '';
  totalRows: number = 0;
  validCount: number = 0;
  invalidCount: number = 0;
  skippedCount: number = 0;
  totalValidAmount: number = 0;

  // Tooltip
  showUploadInfo: boolean = false;

  // Validation State & Errors
  isValidating: boolean = false;
  validationErrors: ValidationError[] = [];
  showValidationModal: boolean = false;

  // Step 2: Uploaded records & CRUD state
  uploadedRecords: UploadedRecord[] = [];
  uploadedSearchTerm: string = '';

  // Add Record Modal State
  showAddRecordModal: boolean = false;
  newRecordEmpId: number | null = null;
  newRecordPaymentType: string = 'Performance Bonus';
  newRecordAmount: number | null = null;
  newRecordRemarks: string = '';

  // Edit Record Modal State
  showEditRecordModal: boolean = false;
  activeEditIndex: number = -1;
  activeEditRecord: UploadedRecord | null = null;
  editRecordPaymentType: string = '';
  editRecordAmount: number | null = null;
  editRecordRemarks: string = '';

  paymentTypeOptions: string[] = [
    'Performance Bonus',
    'Festival Bonus',
    'Variable Pay',
    'Joining Bonus',
    'Ex-Gratia',
    'adhocallowance_Incentives',
    'adhocallowance_other reimbursement',
    'reimbursement_SocialMedia Login Invoice'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['month']) {
        this.selectedMonth = params['month'];
        const [y, m] = this.selectedMonth.split('-');
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const mIdx = parseInt(m, 10) - 1;
        if (mIdx >= 0 && mIdx < 12) {
          this.monthLabel = `${monthNames[mIdx]}-${y}`;
        }
      }
      this.loadEmployeesAndExistingPayments();
    });
  }

  loadEmployeesAndExistingPayments() {
    this.isLoading = true;
    this.http.get<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime?month=${this.selectedMonth}`).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.workingEmployees = res.workingEmployees || [];
          const existingBonuses = res.bonusRecords || [];
          this.existingBonusCodes = new Set(
            existingBonuses.map((b: any) => (b.employee_code || '').trim().toUpperCase())
          );
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // =========================================================================
  // STEP 1: UPLOAD & TEMPLATE DOWNLOAD
  // =========================================================================

  async downloadTemplate() {
    try {
      const wb = new ExcelJS.Workbook();
      wb.creator = 'Tammina HRMS';
      wb.lastModifiedBy = 'Tammina HRMS';
      wb.created = new Date();
      wb.modified = new Date();

      const ws = wb.addWorksheet('One Time Payments', {
        views: [{ showGridLines: true }]
      });

      // Row 1: Merged A1:D1 with 'Employee One Time Payments'
      ws.mergeCells('A1:D1');
      const a1 = ws.getCell('A1');
      a1.value = 'Employee One Time Payments';
      a1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
      a1.alignment = { horizontal: 'center', vertical: 'middle' };
      a1.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFBDD7EE' }
      };

      const thinBorder: Partial<ExcelJS.Borders> = {
        top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
        left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
        bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
        right: { style: 'thin', color: { argb: 'FFD9D9D9' } }
      };

      ['A1', 'B1', 'C1', 'D1'].forEach(c => {
        ws.getCell(c).border = thinBorder;
      });

      // Row 2: Headers
      const headers = [
        { col: 'A', name: 'Employee Number', isRed: true, width: 20 },
        { col: 'B', name: 'Employee Name', isRed: true, width: 22 },
        { col: 'C', name: 'Amount', isRed: true, width: 16 },
        { col: 'D', name: 'One Time Payment Type', isRed: true, width: 44 },
        { col: 'E', name: 'Comment', isRed: false, width: 26 }
      ];

      headers.forEach(h => {
        ws.getColumn(h.col).width = h.width;
        const cell = ws.getCell(h.col + '2');
        cell.value = h.name;
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
        cell.font = {
          name: 'Calibri',
          size: 11,
          bold: true,
          color: { argb: h.isRed ? 'FFFF0000' : 'FF000000' }
        };
        cell.border = thinBorder;
        if (!h.isRed) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFBDD7EE' }
          };
        }
      });

      // Rows 3 to 16: Column D populated as per template image
      const paymentTypes = [
        'reimbursement_SocialMedia Login Invoice',
        'adhocallowance_other reimbursement',
        'adhocallowance_other reimbursement',
        'adhocallowance_other reimbursement',
        'adhocallowance_other reimbursement',
        'reimbursement_SocialMedia Login Invoice',
        'adhocallowance_Incentives',
        'reimbursement_SocialMedia Login Invoice',
        'adhocallowance_Incentives',
        'reimbursement_SocialMedia Login Invoice',
        'adhocallowance_other reimbursement',
        'adhocallowance_other reimbursement',
        'reimbursement_SocialMedia Login Invoice',
        'adhocallowance_other reimbursement'
      ];

      paymentTypes.forEach((pt, idx) => {
        const rowNum = idx + 3;
        ['A', 'B', 'C', 'D', 'E'].forEach(col => {
          const cell = ws.getCell(col + rowNum);
          cell.font = { name: 'Calibri', size: 11 };
          cell.border = thinBorder;
          if (col === 'D') {
            cell.value = pt;
          }
        });
      });

      const buffer = await wb.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const filename = 'Interact One Time Payments Import - Sree Tammina Software Solutions Pvt. Ltd..xlsx';
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      window.URL.revokeObjectURL(url);

      this.toaster.showSuccess(`Template downloaded: ${filename}`);
    } catch (err) {
      console.error('Download template error:', err);
      this.toaster.showError('Failed to generate template');
    }
  }

  toggleUploadInfo() {
    this.showUploadInfo = !this.showUploadInfo;
  }

  ensureEmployeesLoaded(): Promise<void> {
    return new Promise((resolve) => {
      if (this.workingEmployees && this.workingEmployees.length > 0) {
        resolve();
        return;
      }
      this.http.get<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime?month=${this.selectedMonth}`).subscribe({
        next: (res) => {
          if (res && res.success) {
            this.workingEmployees = res.workingEmployees || [];
            const existingBonuses = res.bonusRecords || [];
            this.existingBonusCodes = new Set(
              existingBonuses.map((b: any) => (b.employee_code || '').trim().toUpperCase())
            );
          }
          resolve();
        },
        error: () => resolve()
      });
    });
  }

  isNameMatching(fileName: string, systemName: string, firstName?: string, lastName?: string): boolean {
    if (!fileName || !systemName) return true;
    const clean = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    const fClean = clean(fileName);
    const sClean = clean(systemName);

    if (fClean === sClean) return true;

    const fTokens = fClean.split(' ').filter(t => t.length > 0);
    const sTokens = sClean.split(' ').filter(t => t.length > 0);

    // Exact tokens match in any order (e.g. "Hymavathi Sotta" vs "Sotta Hymavathi")
    if (fTokens.length === sTokens.length && fTokens.every(t => sTokens.includes(t))) {
      return true;
    }

    // Token subset / containment match (e.g. "Hymavathi" inside "Hymavathi Sotta")
    const commonTokens = fTokens.filter(t => sTokens.includes(t));
    if (commonTokens.length > 0 && (commonTokens.length === fTokens.length || commonTokens.length === sTokens.length)) {
      return true;
    }

    // Check first + last name combination
    if (firstName || lastName) {
      const combined = clean(`${firstName || ''} ${lastName || ''}`);
      if (fClean === combined) return true;
    }

    return false;
  }

  validateEmployeeNames(headers: string[], rows: any[][]): ValidationError[] {
    const errors: ValidationError[] = [];

    let empNoIdx = -1;
    let empNameIdx = -1;

    headers.forEach((h, idx) => {
      const lower = h.toLowerCase().trim();
      if (empNoIdx === -1 && (lower.includes('employee number') || lower.includes('emp no') || lower.includes('employee code') || lower.includes('emp id') || lower === 'employee')) {
        empNoIdx = idx;
      }
      if (empNameIdx === -1 && (lower.includes('employee name') || lower.includes('emp name') || lower === 'name')) {
        empNameIdx = idx;
      }
    });

    if (empNoIdx === -1) {
      errors.push({
        rowNumber: 2,
        employeeNumber: 'N/A',
        fileEmployeeName: 'N/A',
        systemEmployeeName: 'N/A',
        reason: 'Required column "Employee Number" was not found in the sheet headers.'
      });
      return errors;
    }

    // Lookup map
    const empMap = new Map<string, any>();
    for (const emp of this.workingEmployees) {
      if (emp.employee_code) {
        empMap.set(emp.employee_code.trim().toUpperCase(), emp);
      }
    }

    rows.forEach((row, idx) => {
      const excelRowNum = idx + 3;
      const rawEmpNo = String(row[empNoIdx] ?? '').trim();
      const rawEmpName = empNameIdx >= 0 ? String(row[empNameIdx] ?? '').trim() : '';

      // Skip blank placeholder rows where no employee number is provided
      if (!rawEmpNo) {
        return;
      }

      const empCodeUpper = rawEmpNo.toUpperCase();
      const matchedEmp = empMap.get(empCodeUpper);

      if (!matchedEmp) {
        errors.push({
          rowNumber: excelRowNum,
          employeeNumber: rawEmpNo,
          fileEmployeeName: rawEmpName || '(Blank)',
          systemEmployeeName: 'Not Registered',
          reason: `Employee Number "${rawEmpNo}" does not exist in company records.`
        });
        return;
      }

      // Check name match if employee name is provided in the Excel row
      if (rawEmpName) {
        const matches = this.isNameMatching(rawEmpName, matchedEmp.employee_name, matchedEmp.first_name, matchedEmp.last_name);
        if (!matches) {
          errors.push({
            rowNumber: excelRowNum,
            employeeNumber: rawEmpNo,
            fileEmployeeName: rawEmpName,
            systemEmployeeName: matchedEmp.employee_name,
            reason: `Employee Number "${rawEmpNo}" belongs to "${matchedEmp.employee_name}", but file has "${rawEmpName}".`
          });
        }
      }
    });

    return errors;
  }

  async onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedFile = file;
    this.selectedFileName = file.name;
    this.validationErrors = [];
    this.showValidationModal = false;
    this.isValidating = true;

    // Ensure company employees list is loaded
    if (this.workingEmployees.length === 0) {
      await this.ensureEmployeesLoaded();
    }

    const reader = new FileReader();
    reader.onload = async (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          this.isValidating = false;
          this.toaster.showError('The Excel file has no readable sheets');
          return;
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        if (!rawJson || rawJson.length === 0) {
          this.isValidating = false;
          this.toaster.showError('Uploaded sheet is empty');
          return;
        }

        // Detect header row (supports Row 1 or Row 2 like Interact One Time Payments template)
        let headerRowIndex = 0;
        for (let r = 0; r < Math.min(rawJson.length, 5); r++) {
          const rowVals = (rawJson[r] || []).map((v: any) => String(v || '').trim().toLowerCase());
          const hasEmp = rowVals.some(v => v.includes('employee number') || v.includes('emp no') || v.includes('employee code'));
          const hasAmt = rowVals.some(v => v.includes('amount') || v.includes('bonus amount') || v.includes('value'));
          if (hasEmp && hasAmt) {
            headerRowIndex = r;
            break;
          }
        }

        const headers = (rawJson[headerRowIndex] || [])
          .map((h: any) => String(h || '').trim())
          .filter((h: string) => h.length > 0);

        if (headers.length === 0) {
          this.isValidating = false;
          this.toaster.showError('No column headers detected in the uploaded file');
          return;
        }

        const dataRows = rawJson.slice(headerRowIndex + 1);

        // Visual delay for validation feedback (800ms)
        await new Promise(resolve => setTimeout(resolve, 800));

        // Validate Employee Number vs Employee Name
        const errors = this.validateEmployeeNames(headers, dataRows);

        if (errors.length > 0) {
          this.isValidating = false;
          this.validationErrors = errors;
          this.showValidationModal = true;
          this.toaster.showError(`Validation failed: ${errors.length} employee mismatch(es) detected.`);
          return;
        }

        // All matched successfully!
        this.isValidating = false;
        this.detectedHeaders = headers;
        this.rawSheetRows = dataRows;

        // Auto-match headers for Step 2
        this.autoMapHeaders(headers);

        // Populate uploaded records for Step 2 CRUD table
        this.generateUploadedRecordsFromSheet();

        this.toaster.showSuccess(`Employee numbers and names verified! Loaded ${this.uploadedRecords.length} records.`);
        // Navigate to Step 2: Map Columns
        this.currentStep = 2;

      } catch (err) {
        this.isValidating = false;
        console.error('File parsing error:', err);
        this.toaster.showError('Failed to parse Excel file. Please ensure it is a valid .xlsx or .xls file.');
      }
    };
    reader.readAsArrayBuffer(file);

    // Reset input so re-selecting same file fires change
    input.value = '';
  }

  closeValidationModal() {
    this.showValidationModal = false;
  }

  reuploadFile(inputElem: HTMLInputElement) {
    this.showValidationModal = false;
    inputElem.click();
  }

  autoMapHeaders(headers: string[]) {
    this.empNoColumn = '';
    this.paymentTypeColumn = '';
    this.amountColumn = '';
    this.remarksColumn = '';

    for (const h of headers) {
      const lower = h.toLowerCase();
      if (!this.empNoColumn && (lower.includes('employee number') || lower.includes('emp no') || lower.includes('employee code') || lower.includes('emp id') || lower.includes('employee'))) {
        this.empNoColumn = h;
      } else if (!this.paymentTypeColumn && (lower.includes('one time payment type') || lower.includes('payment type') || lower.includes('bonus type') || lower.includes('type') || lower.includes('category'))) {
        this.paymentTypeColumn = h;
      } else if (!this.amountColumn && (lower.includes('amount') || lower.includes('bonus amount') || lower.includes('payout') || lower.includes('value'))) {
        this.amountColumn = h;
      } else if (!this.remarksColumn && (lower.includes('comment') || lower.includes('remark') || lower.includes('reason') || lower.includes('note'))) {
        this.remarksColumn = h;
      }
    }

    // Fallbacks if not auto-matched
    if (!this.empNoColumn && headers.length > 0) this.empNoColumn = headers[0];
    if (!this.paymentTypeColumn && headers.length > 3) this.paymentTypeColumn = headers[3];
    else if (!this.paymentTypeColumn && headers.length > 1) this.paymentTypeColumn = headers[1];
    if (!this.amountColumn && headers.length > 2) this.amountColumn = headers[2];
    if (!this.remarksColumn && headers.length > 4) this.remarksColumn = headers[4];
  }

  // =========================================================================
  // STEP 2: MAP COLUMNS & CRUD OPERATIONS ON UPLOADED EMPLOYEES
  // =========================================================================

  get isMappingValid(): boolean {
    return Boolean(this.empNoColumn && this.paymentTypeColumn && this.amountColumn);
  }

  generateUploadedRecordsFromSheet() {
    if (!this.detectedHeaders.length || !this.rawSheetRows.length) {
      this.uploadedRecords = [];
      return;
    }

    const headerIndices: { [key: string]: number } = {};
    this.detectedHeaders.forEach((h, idx) => {
      headerIndices[h] = idx;
    });

    const empIdx = headerIndices[this.empNoColumn];
    const typeIdx = headerIndices[this.paymentTypeColumn];
    const amtIdx = headerIndices[this.amountColumn];
    const remIdx = this.remarksColumn ? headerIndices[this.remarksColumn] : -1;

    const empMap = new Map<string, any>();
    for (const emp of this.workingEmployees) {
      if (emp.employee_code) {
        empMap.set(emp.employee_code.trim().toUpperCase(), emp);
      }
    }

    const records: UploadedRecord[] = [];
    let rowCount = 0;

    this.rawSheetRows.forEach((row) => {
      if (!row || row.every((c: any) => c === '' || c === null || c === undefined)) {
        return;
      }

      const rawEmpNo = String(row[empIdx] ?? '').trim();
      const rawType = String(row[typeIdx] ?? '').trim() || 'Performance Bonus';
      const rawAmtStr = String(row[amtIdx] ?? '').replace(/[^0-9.-]/g, '');
      const parsedAmt = Math.round(parseFloat(rawAmtStr) || 0);
      const rawRemarks = remIdx >= 0 ? String(row[remIdx] ?? '').trim() : '';

      // Skip rows with neither employee number nor amount
      if (!rawEmpNo && parsedAmt <= 0) {
        return;
      }

      rowCount++;
      const empCodeUpper = rawEmpNo.toUpperCase();
      const matchedEmp = empMap.get(empCodeUpper);

      records.push({
        rowNumber: rowCount,
        employee_id: matchedEmp ? matchedEmp.id : undefined,
        employee_number: rawEmpNo,
        employee_name: matchedEmp ? matchedEmp.employee_name : 'Unknown Employee',
        department: matchedEmp ? (matchedEmp.department || 'General') : '-',
        payment_type: rawType,
        amount: parsedAmt,
        remarks: rawRemarks
      });
    });

    this.uploadedRecords = records;
  }

  onMappingChanged() {
    this.generateUploadedRecordsFromSheet();
  }

  get filteredUploadedRecords(): UploadedRecord[] {
    if (!this.uploadedSearchTerm.trim()) {
      return this.uploadedRecords;
    }
    const q = this.uploadedSearchTerm.toLowerCase().trim();
    return this.uploadedRecords.filter(r =>
      r.employee_number.toLowerCase().includes(q) ||
      r.employee_name.toLowerCase().includes(q) ||
      r.payment_type.toLowerCase().includes(q) ||
      (r.department && r.department.toLowerCase().includes(q)) ||
      (r.remarks && r.remarks.toLowerCase().includes(q))
    );
  }

  get totalUploadedAmount(): number {
    return this.uploadedRecords.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  }

  // CRUD: Add Record
  openAddRecordModal() {
    this.newRecordEmpId = null;
    this.newRecordPaymentType = 'Performance Bonus';
    this.newRecordAmount = null;
    this.newRecordRemarks = '';
    this.showAddRecordModal = true;
  }

  closeAddRecordModal() {
    this.showAddRecordModal = false;
  }

  saveNewRecord() {
    if (!this.newRecordEmpId) {
      this.toaster.showError('Please select an employee');
      return;
    }
    const amt = Number(this.newRecordAmount);
    if (!amt || amt <= 0) {
      this.toaster.showError('Please enter a valid amount greater than 0');
      return;
    }

    const emp = this.workingEmployees.find(e => e.id === Number(this.newRecordEmpId));
    if (!emp) {
      this.toaster.showError('Employee not found in active staff list');
      return;
    }

    const newRec: UploadedRecord = {
      rowNumber: this.uploadedRecords.length + 1,
      employee_id: emp.id,
      employee_number: emp.employee_code,
      employee_name: emp.employee_name,
      department: emp.department || 'General',
      payment_type: this.newRecordPaymentType || 'Performance Bonus',
      amount: Math.round(amt),
      remarks: (this.newRecordRemarks || '').trim()
    };

    this.uploadedRecords.push(newRec);
    this.reindexUploadedRows();
    this.toaster.showSuccess(`Added payment for ${emp.employee_name}`);
    this.closeAddRecordModal();
  }

  // CRUD: Edit Record
  openEditRecordModal(record: UploadedRecord) {
    this.activeEditIndex = this.uploadedRecords.indexOf(record);
    this.activeEditRecord = { ...record };
    this.editRecordPaymentType = record.payment_type;
    this.editRecordAmount = record.amount;
    this.editRecordRemarks = record.remarks || '';
    this.showEditRecordModal = true;
  }

  closeEditRecordModal() {
    this.showEditRecordModal = false;
    this.activeEditRecord = null;
    this.activeEditIndex = -1;
  }

  saveEditedRecord() {
    if (this.activeEditIndex < 0 || !this.activeEditRecord) return;
    const amt = Number(this.editRecordAmount);
    if (!amt || amt <= 0) {
      this.toaster.showError('Amount must be greater than 0');
      return;
    }

    this.uploadedRecords[this.activeEditIndex].payment_type = this.editRecordPaymentType || 'Performance Bonus';
    this.uploadedRecords[this.activeEditIndex].amount = Math.round(amt);
    this.uploadedRecords[this.activeEditIndex].remarks = (this.editRecordRemarks || '').trim();

    this.toaster.showSuccess(`Updated payment for ${this.activeEditRecord.employee_name}`);
    this.closeEditRecordModal();
  }

  // CRUD: Delete Record
  deleteUploadedRecord(record: UploadedRecord) {
    const idx = this.uploadedRecords.indexOf(record);
    if (idx >= 0) {
      const removed = this.uploadedRecords.splice(idx, 1)[0];
      this.reindexUploadedRows();
      this.toaster.showSuccess(`Removed ${removed.employee_number} - ${removed.employee_name} from list`);
    }
  }

  reindexUploadedRows() {
    this.uploadedRecords.forEach((r, idx) => {
      r.rowNumber = idx + 1;
    });
  }

  continueToReview() {
    if (!this.isMappingValid) {
      this.toaster.showError('Please map Employee Number, Payment Type, and Amount before proceeding.');
      return;
    }

    if (this.uploadedRecords.length === 0) {
      this.toaster.showError('No employee payment records found. Please add or upload records first.');
      return;
    }

    const empMap = new Map<string, any>();
    for (const emp of this.workingEmployees) {
      if (emp.employee_code) {
        empMap.set(emp.employee_code.trim().toUpperCase(), emp);
      }
    }

    this.previewRows = [];
    this.totalRows = 0;
    this.validCount = 0;
    this.invalidCount = 0;
    this.skippedCount = 0;
    this.totalValidAmount = 0;

    this.uploadedRecords.forEach((rec) => {
      this.totalRows++;
      const empCodeUpper = (rec.employee_number || '').trim().toUpperCase();
      const matchedEmp = empMap.get(empCodeUpper);

      let status: 'VALID' | 'INVALID' | 'SKIPPED' = 'VALID';
      let statusMessage = 'Ready to import';

      if (!rec.employee_number) {
        status = 'INVALID';
        statusMessage = 'Employee number is missing';
      } else if (!matchedEmp) {
        status = 'INVALID';
        statusMessage = `Employee code "${rec.employee_number}" not found in active staff`;
      } else if (Number(rec.amount) <= 0) {
        status = 'INVALID';
        statusMessage = 'Amount must be a positive number';
      } else if (this.existingBonusCodes.has(empCodeUpper)) {
        status = 'SKIPPED';
        statusMessage = 'Existing payment already found (updation not possible)';
      }

      const parsedAmt = Number(rec.amount) || 0;

      if (status === 'VALID') {
        this.validCount++;
        this.totalValidAmount += parsedAmt;
      } else if (status === 'SKIPPED') {
        this.skippedCount++;
      } else {
        this.invalidCount++;
      }

      this.previewRows.push({
        rowNumber: this.totalRows,
        employee_number: rec.employee_number,
        employee_name: matchedEmp ? matchedEmp.employee_name : (rec.employee_name || 'Unknown Employee'),
        department: matchedEmp ? matchedEmp.department : (rec.department || '-'),
        employee_id: matchedEmp ? matchedEmp.id : rec.employee_id,
        payment_type: rec.payment_type || 'Performance Bonus',
        amount: parsedAmt,
        amount_formatted: `INR ${parsedAmt.toLocaleString('en-IN')}`,
        remarks: rec.remarks || '',
        status,
        statusMessage
      });
    });

    this.currentStep = 3;
  }

  // =========================================================================
  // STEP 3: REVIEW & IMPORT
  // =========================================================================

  get filteredPreviewRows(): PreviewPaymentRow[] {
    if (!this.previewSearchTerm.trim()) {
      return this.previewRows;
    }
    const q = this.previewSearchTerm.toLowerCase().trim();
    return this.previewRows.filter(r =>
      r.employee_number.toLowerCase().includes(q) ||
      r.employee_name.toLowerCase().includes(q) ||
      r.payment_type.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  }

  importPayments() {
    const validRecords = this.previewRows
      .filter(r => r.status === 'VALID')
      .map(r => ({
        id: r.employee_id,
        employee_code: r.employee_number,
        employee_name: r.employee_name,
        payment_type: r.payment_type,
        amount: r.amount,
        comments: r.remarks
      }));

    if (validRecords.length === 0) {
      this.toaster.showError('No valid records to import. Please check invalid or skipped entries.');
      return;
    }

    this.isImporting = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/bulk-import-bonus`, {
      month: this.selectedMonth,
      records: validRecords
    }).subscribe({
      next: (res) => {
        this.isImporting = false;
        const count = res?.importedCount ?? validRecords.length;
        this.toaster.showSuccess(`Successfully imported ${count} one-time payments for ${this.monthLabel}!`);
        this.goBack();
      },
      error: (err) => {
        this.isImporting = false;
        console.error('Import payments error:', err);
        this.toaster.showError(err?.error?.error || 'Failed to import payments. Please try again.');
      }
    });
  }

  // Navigation
  goToStep(step: number) {
    if (step === 1) {
      this.currentStep = 1;
    } else if (step === 2 && this.detectedHeaders.length > 0) {
      this.currentStep = 2;
    } else if (step === 3 && this.previewRows.length > 0) {
      this.currentStep = 3;
    }
  }

  goBack() {
    this.router.navigate(['/finance/run-payroll/bonus-revisions-overtime'], {
      queryParams: { month: this.selectedMonth }
    });
  }
}
