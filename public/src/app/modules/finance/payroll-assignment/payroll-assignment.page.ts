import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceAdminService, EmployeeInfo } from '../../../core/services/finance-admin.service';
import { PayrollService } from '../../../core/services/payroll-service.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-assignment',
  templateUrl: './payroll-assignment.page.html',
  styleUrls: ['./payroll-assignment.page.scss'],
  standalone: false
})
export class PayrollAssignmentPage implements OnInit {
  allEmployees: EmployeeInfo[] = [];
  filteredEmployees: EmployeeInfo[] = [];
  templates: any[] = [];
  cachedContracts: any[] = [];
  isLoading = false;
  searchQuery = '';
  activeTab: 'all' | 'skipped' | 'uploadErrors' = 'all';
  uploadErrors: string[] = [];

  // Mapping State
  isModalOpen = false;
  editingContractId: number | null = null;
  selectedEmployee: EmployeeInfo | null = null;
  employeeContracts: any[] = [];
  isLoadingContracts = false;
  assignmentForm: FormGroup;
  isSaving = false;
  private searchSubject = new Subject<string>();

  constructor(
    private financeService: FinanceAdminService,
    private payrollService: PayrollService,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.assignmentForm = this.fb.group({
      template_id: ['', Validators.required],
      annual_ctc: ['', [Validators.required, Validators.min(0)]],
      effective_from: [new Date().toISOString().split('T')[0], Validators.required],
      effective_to: [''],
      status: ['Active', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTemplatesAndContracts();
    this.setupSearch();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(q => {
      if (!q) {
        this.loadEmployees();
        return;
      }
      this.performSearch(q);
    });
  }

  loadTemplatesAndContracts() {
    this.isLoading = true;
    this.payrollService.getPayrollTempletes().subscribe({
      next: (res) => {
        this.templates = Array.isArray(res) ? res : (res.data || []);
        this.financeService.getAllContracts().subscribe({
          next: (contractsRes) => {
            this.cachedContracts = contractsRes || [];
            this.loadEmployees();
          },
          error: () => {
            this.loadEmployees();
          }
        });
      },
      error: () => {
        this.loadEmployees();
      }
    });
  }

  refreshContracts(callback?: () => void) {
    this.financeService.getAllContracts().subscribe({
      next: (contractsRes) => {
        this.cachedContracts = contractsRes || [];
        this.allEmployees = this.mapEmployeeContracts(this.allEmployees);
        this.applyFilter();
        if (callback) callback();
      },
      error: () => {
        if (callback) callback();
      }
    });
  }

  mapEmployeeContracts(employees: EmployeeInfo[]): EmployeeInfo[] {
    return employees.map(emp => {
      const empContracts = this.cachedContracts.filter((c: any) => c.employee_id === emp.id);
      const activeContract = empContracts.find((c: any) => c.status?.toLowerCase() === 'active');
      const pendingContract = empContracts.find((c: any) => c.status?.toLowerCase() === 'pending');
      
      let assignmentStatus = 'Not Assigned';
      let assignedStructureName = 'Senior Structure';
      let annualCtc = 0;
      
      if (activeContract) {
        assignmentStatus = 'Assigned';
        assignedStructureName = activeContract.template_name || 'Senior Structure';
        annualCtc = activeContract.annual_ctc;
      } else if (pendingContract) {
        assignmentStatus = 'Pending';
        assignedStructureName = pendingContract.template_name || 'Senior Structure';
        annualCtc = pendingContract.annual_ctc;
      } else if (empContracts.length > 0) {
        const latestContract = empContracts[0];
        assignmentStatus = latestContract.status || 'Inactive';
        assignedStructureName = latestContract.template_name || 'Senior Structure';
        annualCtc = latestContract.annual_ctc;
      }
      
      return {
        ...emp,
        assignmentStatus,
        assignedStructureName,
        annualCtc,
        contractsCount: empContracts.length
      };
    });
  }

  loadEmployees() {
    this.isLoading = true;
    this.financeService.getWorkingEmployees(1, 1000, '').subscribe({
      next: (res) => {
        this.allEmployees = this.mapEmployeeContracts(res.data || []);
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toaster.showError('Failed to load employees');
      }
    });
  }

  onSearch(event: any) {
    const q = (event.target.value || '').trim();
    this.searchSubject.next(q);
  }

  performSearch(q: string) {
    this.searchQuery = q;
    this.isLoading = true;
    this.financeService.searchEmployees(q).subscribe({
      next: (res) => {
        const searched = this.mapEmployeeContracts(res.data || []);
        if (this.activeTab === 'skipped') {
          this.filteredEmployees = searched.filter(emp => emp.assignmentStatus !== 'Assigned');
        } else {
          this.filteredEmployees = searched;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toaster.showError('Search failed');
      }
    });
  }

  applyFilter() {
    let list = [...this.allEmployees];
    if (this.activeTab === 'skipped') {
      list = list.filter(emp => emp.assignmentStatus !== 'Assigned');
    }
    this.filteredEmployees = list;
  }

  setTab(tab: 'all' | 'skipped' | 'uploadErrors') {
    this.activeTab = tab;
    this.applyFilter();
  }

  clearUploadErrors() {
    this.uploadErrors = [];
    if (this.activeTab === 'uploadErrors') {
      this.activeTab = 'all';
    }
    this.applyFilter();
  }

  async selectEmployee(emp: EmployeeInfo) {
    this.selectedEmployee = emp;
    this.loadEmployeeContracts(emp.id);
  }

  loadEmployeeContracts(employeeId: number) {
    this.isLoadingContracts = true;
    this.financeService.getEmployeeContracts(employeeId).subscribe({
      next: (res) => {
        this.employeeContracts = res.data || res || [];
        this.isLoadingContracts = false;
      },
      error: () => {
        this.isLoadingContracts = false;
        this.toaster.showError('Failed to load employee contracts');
      }
    });
  }

  openAssignmentModal(contract?: any) {
    if (!this.selectedEmployee) return;

    if (contract) {
      this.editingContractId = contract.id || contract.contract_id;
      this.assignmentForm.patchValue({
        template_id: contract.template_id,
        annual_ctc: contract.annual_ctc,
        effective_from: contract.effective_from?.split('T')[0],
        effective_to: contract.effective_to?.split('T')[0],
        status: contract.status || 'Active'
      });
    } else {
      this.editingContractId = null;
      this.assignmentForm.reset({
        template_id: '',
        annual_ctc: this.selectedEmployee.salary || '',
        effective_from: new Date().toISOString().split('T')[0],
        effective_to: '',
        status: 'Active'
      });
    }
    this.isModalOpen = true;
  }

  async saveAssignment() {
    if (this.assignmentForm.invalid || !this.selectedEmployee) return;

    this.isSaving = true;
    const loading = await this.loadingCtrl.create({
      message: this.editingContractId ? 'Updating Contract...' : 'Creating Contract...',
      cssClass: 'glass-loading'
    });
    await loading.present();

    const payload = {
      employee_id: this.selectedEmployee.id,
      ...this.assignmentForm.value
    };

    const request = this.editingContractId
      ? this.financeService.updateContract(this.editingContractId, payload)
      : this.financeService.createContract(payload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.isModalOpen = false;
        loading.dismiss();
        this.toaster.showSuccess(`Contract ${this.editingContractId ? 'updated' : 'created'} successfully.`);
        this.refreshContracts(() => {
          if (this.selectedEmployee) {
            this.loadEmployeeContracts(this.selectedEmployee.id);
          }
        });
      },
      error: (err) => {
        this.isSaving = false;
        loading.dismiss();
        this.toaster.showError(err.error?.message || 'Operation failed');
      }
    });
  }

  async deleteContract(contractId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Terminate Contract',
      message: 'Setting an end date will deactivate this payroll structure for the employee. Please select the effective last date.',
      inputs: [
        {
          name: 'effective_to',
          type: 'date',
          value: new Date().toISOString().split('T')[0],
          placeholder: 'Effective Last Date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => true
        },
        {
          text: 'Terminate Now',
          handler: (data: any) => {
            if (data && data.effective_to) {
              this.executeTermination(contractId, data.effective_to);
              return true;
            } else {
              this.toaster.showWarning('Please select a valid termination date');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async executeTermination(contractId: number, effectiveTo: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Processing Termination...',
      cssClass: 'glass-loading'
    });
    await loading.present();

    this.financeService.terminateContract(contractId, { effective_to: effectiveTo }).subscribe({
      next: () => {
        loading.dismiss();
        this.toaster.showSuccess('Contract terminated successfully');
        this.refreshContracts(() => {
          if (this.selectedEmployee) {
            this.loadEmployeeContracts(this.selectedEmployee.id);
          }
        });
      },
      error: (err) => {
        loading.dismiss();
        this.toaster.showError(err.error?.message || 'Termination failed');
      }
    });
  }

  formatCurrency(val: number): string {
    return '₹' + (val || 0).toLocaleString('en-IN');
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingContractId = null;
  }


  deselectEmployee() {
    this.selectedEmployee = null;
    this.employeeContracts = [];
  }

  // --- Bulk Import ---
  selectedTemplateForBulk: number | null = null;
  isImporting = false;
  dragOver = false;

  handleDrop(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.importContracts(event.dataTransfer.files[0]);
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.importContracts(file);
      // Reset input so same file can be uploaded again if needed
      event.target.value = '';
    }
  }

  async importContracts(file: File) {
    this.isImporting = true;
    const loading = await this.loadingCtrl.create({
      message: 'Uploading and Mapping Contracts...',
      cssClass: 'glass-loading'
    });
    await loading.present();

    this.financeService.uploadBulkContracts(file).subscribe({
      next: (res) => {
        this.isImporting = false;
        loading.dismiss();
        if (res.success) {
          this.toaster.showSuccess(`Successfully mapped ${res.inserted} contracts. ${res.skipped} skipped.`);
          this.uploadErrors = res.errors || [];
          this.refreshContracts();
          if (res.skipped > 0 && this.uploadErrors.length > 0) {
            this.activeTab = 'uploadErrors';
          }
        } else {
          this.toaster.showError(res.message || 'Import failed');
        }
      },
      error: (err) => {
        this.isImporting = false;
        loading.dismiss();
        this.toaster.showError(err.error?.message || 'Upload failed');
      }
    });
  }

  downloadTemplate() {
    // Basic CSV template for mapping
    const headers = ['EmployeeNumber', 'remuneration_amount', 'template_name'];
    const rows = [
      ['EMP001', '500000', 'Standard Employee Package'],
      ['EMP002', '750000', 'Senior Employee Package']
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payroll_mapping_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
