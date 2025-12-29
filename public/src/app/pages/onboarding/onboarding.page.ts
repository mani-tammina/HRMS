import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, 
  IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonList, IonItem, IonIcon, IonButton, IonButtons, 
  IonBackButton, IonBadge, IonProgressBar, IonChip, IonAvatar,
  IonRefresher, IonRefresherContent, IonSpinner, IonModal, IonInput,
  IonSelect, IonSelectOption, IonTextarea, IonItemDivider, IonText,
  IonFab, IonFabButton, IonFooter, IonSearchbar, AlertController, ToastController, ActionSheetController
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { 
  checkmarkCircle, hourglass, closeCircle, documentText, 
  person, calendar, listOutline, arrowForward, addCircle,
  mail, personAdd, shieldCheckmark, eye, create, trash,
  cloudUpload, checkmarkDone, chevronForward, refresh,
  send, warning, document, briefcase, cash, play, people, list, arrowBack
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, 
    IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonList, IonItem, IonIcon, IonButton, IonButtons, 
    IonBackButton, IonBadge, IonProgressBar, IonChip, IonAvatar,
    IonRefresher, IonRefresherContent, IonSpinner, IonModal, IonInput,
    IonSelect, IonSelectOption, IonTextarea, IonItemDivider, IonText,
    IonFab, IonFabButton, IonFooter, IonSearchbar
  ]
})
export class OnboardingPage implements OnInit {
  selectedSegment: string = 'candidates';
  userRole: string = 'employee';
  isHR: boolean = false;
  
  // Data
  candidates: any[] = [];
  selectedCandidate: any = null;
  candidateProgress: any[] = [];
  candidateDocuments: any[] = [];
  candidateStats: any = null;
  
  // Master Data
  departments: any[] = [];
  designations: any[] = [];
  locations: any[] = [];
  managers: any[] = [];
  filteredManagers: any[] = [];
  taskTemplates: any[] = [];
  managerSearchText: string = '';
  
  loading = false;

  // Modals
  showCandidateModal = false;
  showTaskModal = false;
  showDocumentModal = false;
  showOfferModal = false;
  showProgressModal = false;
  offerStep = 1;

  // Forms
  candidateForm: any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: '',
    alternate_phone: '',
    date_of_birth: '',
    gender: 'Male',
    position: '',
    designation_id: null,
    department_id: null,
    location_id: null,
    offered_ctc: '',
    joining_date: '',
    reporting_manager_id: null,
    recruiter_name: '',
    recruitment_source: ''
  };

  taskForm: any = {
    task_name: '',
    description: '',
    task_category: 'document_submission',
    is_mandatory: 1,
    task_order: 1,
    auto_assign: 1,
    assigned_to_role: 'candidate'
  };

  documentForm: any = {
    document_type: 'resume',
    required: 1
  };
  selectedFile: File | null = null;

  offerForm: any = {
    position: '',
    designation_id: null,
    department_id: null,
    location_id: null,
    reporting_manager_id: null,
    work_mode: 'Office',
    joining_date: '',
    offered_ctc: '',
    annual_salary: '',
    salary_breakup: { basic: 0, hra: 0, special_allowance: 0 },
    offer_validity_date: '',
    probation_period: 3,
    notice_period: 2,
    special_terms: '',
    benefits: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    addIcons({ 
      checkmarkCircle, hourglass, closeCircle, documentText, 
      person, calendar, listOutline, arrowForward, addCircle,
      mail, personAdd, shieldCheckmark, eye, create, trash,
      cloudUpload, checkmarkDone, chevronForward, refresh,
      send, warning, document, briefcase, cash, play, people, list, arrowBack
    });
  }

  ngOnInit() {
    this.checkUserRole();
    this.loadData();
    if (this.isHR) {
      this.loadMasterData();
    }
  }

  ionViewWillEnter() {
    this.checkUserRole();
    this.loadData();
  }

  checkUserRole() {
    const userStr = localStorage.getItem('user');
    let role = null;
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        role = user.role;
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
    
    this.userRole = role || 'employee';
    this.isHR = role === 'admin' || role === 'hr';
    this.selectedSegment = this.isHR ? 'candidates' : 'progress';
  }

  loadData() {
    if (this.selectedSegment === 'candidates') {
      this.loadCandidates();
      this.loadCandidateStats();
    } else if (this.selectedSegment === 'tasks') {
      this.loadTaskTemplates();
    }
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.loadData();
  }

  // ============ MASTER DATA ============
  loadMasterData() {
    console.log('=== LOADING MASTER DATA ===');
    
    this.http.get(`${environment.apiUrl}/departments`).subscribe({
      next: (data: any) => {
        this.departments = data;
        console.log('Departments loaded:', this.departments.length, data);
      },
      error: (err) => console.error('Error loading departments:', err)
    });

    this.http.get(`${environment.apiUrl}/designations`).subscribe({
      next: (data: any) => {
        this.designations = data;
        console.log('Designations loaded:', this.designations.length, data);
      },
      error: (err) => console.error('Error loading designations:', err)
    });

    this.http.get(`${environment.apiUrl}/locations`).subscribe({
      next: (data: any) => {
        this.locations = data;
        console.log('Locations loaded:', this.locations.length, data);
      },
      error: (err) => console.error('Error loading locations:', err)
    });

    this.http.get(`${environment.apiUrl}/employees`).subscribe({
      next: (data: any) => {
        this.managers = data || [];
        this.filteredManagers = this.managers;
        console.log('Managers loaded:', this.managers.length, data?.slice(0, 2));
      },
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  filterManagers(event: any) {
    const searchText = event.detail.value.toLowerCase();
    this.managerSearchText = searchText;
    
    if (!searchText) {
      this.filteredManagers = this.managers;
      return;
    }
    
    this.filteredManagers = this.managers.filter((mgr: any) => 
      mgr.FullName?.toLowerCase().includes(searchText) ||
      mgr.EmployeeCode?.toLowerCase().includes(searchText) ||
      mgr.WorkEmail?.toLowerCase().includes(searchText)
    );
  }

  // ============ CANDIDATES ============
  loadCandidates() {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/candidates`).subscribe({
      next: (data: any) => {
        this.candidates = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.showToast('Failed to load candidates', 'danger');
      }
    });
  }

  loadCandidateStats() {
    this.http.get(`${environment.apiUrl}/candidates/stats/dashboard`).subscribe({
      next: (data: any) => this.candidateStats = data,
      error: (err) => console.error('Error:', err)
    });
  }

  openCandidateModal(candidate?: any) {
    if (candidate) {
      this.candidateForm = { ...candidate };
    } else {
      this.resetCandidateForm();
    }
    this.loadMasterData();
    this.showCandidateModal = true;
  }

  closeCandidateModal() {
    this.showCandidateModal = false;
    this.resetCandidateForm();
  }

  resetCandidateForm() {
    this.candidateForm = {
      first_name: '', middle_name: '', last_name: '', email: '', phone: '',
      alternate_phone: '', date_of_birth: '', gender: 'Male', position: '',
      designation_id: null, department_id: null, location_id: null,
      offered_ctc: '', joining_date: '', reporting_manager_id: null,
      recruiter_name: '', recruitment_source: ''
    };
  }

  async saveCandidate() {
    if (!this.candidateForm.first_name || !this.candidateForm.last_name || 
        !this.candidateForm.email || !this.candidateForm.position) {
      this.showToast('Please fill all required fields', 'warning');
      return;
    }

    this.candidateForm.full_name = `${this.candidateForm.first_name} ${this.candidateForm.middle_name || ''} ${this.candidateForm.last_name}`.trim();

    const url = this.candidateForm.id 
      ? `${environment.apiUrl}/candidates/${this.candidateForm.id}` 
      : `${environment.apiUrl}/candidates`;
    const method = this.candidateForm.id ? 'put' : 'post';

    this.http[method](url, this.candidateForm).subscribe({
      next: (response: any) => {
        this.showToast(response.message || 'Candidate saved', 'success');
        this.closeCandidateModal();
        this.loadCandidates();
      },
      error: (err) => {
        console.error('Error:', err);
        this.showToast('Failed to save candidate', 'danger');
      }
    });
  }

  async viewCandidateDetails(candidate: any) {
    this.selectedCandidate = candidate;
    this.loading = true;

    this.http.get(`${environment.apiUrl}/candidates/${candidate.id}`).subscribe({
      next: (data: any) => {
        this.selectedCandidate = data.candidate;
        this.candidateDocuments = data.documents || [];
        this.candidateProgress = data.tasks || [];
        this.loading = false;
        this.showProgressModal = true;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.showToast('Failed to load details', 'danger');
      }
    });
  }

  async startPreOnboarding(candidate: any) {
    const alert = await this.alertController.create({
      header: 'Start Pre-onboarding',
      message: `Start pre-onboarding for ${candidate.full_name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Start',
          handler: () => {
            this.http.post(`${environment.apiUrl}/candidates/${candidate.id}/start-preonboarding`, {}).subscribe({
              next: () => {
                this.showToast('Pre-onboarding started', 'success');
                this.loadCandidates();
              },
              error: () => this.showToast('Failed to start', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async createOffer(candidate: any) {
    this.selectedCandidate = candidate;
    this.offerForm = {
      position: candidate.position || '',
      designation_id: candidate.designation_id,
      department_id: candidate.department_id,
      location_id: candidate.location_id,
      reporting_manager_id: candidate.reporting_manager_id,
      work_mode: 'Office',
      joining_date: candidate.joining_date || '',
      offered_ctc: candidate.offered_ctc || '',
      annual_salary: candidate.offered_ctc || '',
      salary_breakup: { basic: 0, hra: 0, special_allowance: 0 },
      offer_validity_date: '',
      probation_period: 3,
      notice_period: 2,
      special_terms: '',
      benefits: ''
    };
    this.loadMasterData();
    this.offerStep = 1;
    this.showOfferModal = true;
  }

  nextOfferStep() {
    if (this.offerStep < 4) this.offerStep++;
  }

  prevOfferStep() {
    if (this.offerStep > 1) this.offerStep--;
  }

  calculateSalaryBreakup() {
    const ctc = parseFloat(this.offerForm.offered_ctc) || 0;
    this.offerForm.salary_breakup.basic = Math.round(ctc * 0.5);
    this.offerForm.salary_breakup.hra = Math.round(ctc * 0.25);
    this.offerForm.salary_breakup.special_allowance = Math.round(ctc * 0.25);
  }

  async saveOffer() {
    if (!this.selectedCandidate) return;

    this.http.post(`${environment.apiUrl}/candidates/${this.selectedCandidate.id}/create-offer`, this.offerForm).subscribe({
      next: () => {
        this.showToast('Offer created', 'success');
        this.showOfferModal = false;
        this.loadCandidates();
      },
      error: () => this.showToast('Failed to create offer', 'danger')
    });
  }

  async sendOffer(candidate: any) {
    const alert = await this.alertController.create({
      header: 'Send Offer',
      message: `Send offer to ${candidate.full_name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: () => {
            this.http.post(`${environment.apiUrl}/candidates/${candidate.id}/send-offer`, {}).subscribe({
              next: () => {
                this.showToast('Offer sent', 'success');
                this.loadCandidates();
              },
              error: () => this.showToast('Failed to send offer', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async initiateBGV(candidate: any) {
    const alert = await this.alertController.create({
      header: 'Initiate BGV',
      message: `Initiate BGV for ${candidate.full_name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Initiate',
          handler: () => {
            this.http.post(`${environment.apiUrl}/candidates/${candidate.id}/bgv/initiate`, {}).subscribe({
              next: () => {
                this.showToast('BGV initiated', 'success');
                this.loadCandidates();
              },
              error: () => this.showToast('Failed', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async updateBGVStatus(candidate: any) {
    const alert = await this.alertController.create({
      header: 'Update BGV Status',
      inputs: [
        { type: 'radio', label: 'Initiated', value: 'initiated' },
        { type: 'radio', label: 'In Progress', value: 'in_progress' },
        { type: 'radio', label: 'Completed', value: 'completed', checked: true },
        { type: 'radio', label: 'Failed', value: 'failed' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: (status) => {
            this.http.put(`${environment.apiUrl}/candidates/${candidate.id}/bgv/status`, { 
              bgv_status: status, remarks: 'Updated by HR'
            }).subscribe({
              next: () => {
                this.showToast('BGV status updated', 'success');
                this.loadCandidates();
              },
              error: () => this.showToast('Failed', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async convertToEmployee(candidate: any) {
    const alert = await this.alertController.create({
      header: 'Convert to Employee',
      message: `Convert ${candidate.full_name}? This creates employee record and user account.`,
      inputs: [{ name: 'employee_number', type: 'text', placeholder: 'Employee Number (optional)' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Convert',
          handler: (data) => {
            this.http.post(`${environment.apiUrl}/candidates/${candidate.id}/convert-to-employee`, {
              employee_number: data.employee_number
            }).subscribe({
              next: (response: any) => {
                this.showToast(response.message || 'Converted successfully', 'success');
                this.loadCandidates();
              },
              error: (err) => {
                this.showToast(err.error?.message || 'Failed', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showCandidateActions(candidate: any) {
    const buttons: any[] = [];

    if (candidate.status === 'offered') {
      buttons.push({ text: 'Start Pre-onboarding', icon: 'play', handler: () => this.startPreOnboarding(candidate) });
      buttons.push({ text: 'Create Offer', icon: 'document-text', handler: () => this.createOffer(candidate) });
      buttons.push({ text: 'Send Offer', icon: 'send', handler: () => this.sendOffer(candidate) });
    }

    if (['offer_accepted', 'documents_pending', 'bgv_initiated', 'bgv_completed'].includes(candidate.status)) {
      buttons.push({ text: 'Assign Tasks', icon: 'list', handler: () => this.assignTasks(candidate) });
      buttons.push({ text: 'Upload Document', icon: 'cloud-upload', handler: () => this.openDocumentUpload(candidate) });
    }

    if (['documents_pending', 'bgv_initiated'].includes(candidate.status)) {
      buttons.push({ text: 'Initiate BGV', icon: 'shield-checkmark', handler: () => this.initiateBGV(candidate) });
    }

    if (candidate.status === 'bgv_initiated' || candidate.bgv_status !== 'not_started') {
      buttons.push({ text: 'Update BGV Status', icon: 'shield-checkmark', handler: () => this.updateBGVStatus(candidate) });
    }

    if (['bgv_completed', 'ready_to_join'].includes(candidate.status)) {
      buttons.push({ text: 'Convert to Employee', icon: 'person-add', handler: () => this.convertToEmployee(candidate) });
    }

    buttons.push({ text: 'View Details', icon: 'eye', handler: () => this.viewCandidateDetails(candidate) });
    buttons.push({ text: 'Edit', icon: 'create', handler: () => this.openCandidateModal(candidate) });
    buttons.push({ text: 'Cancel', icon: 'close', role: 'cancel' });

    const actionSheet = await this.actionSheetController.create({
      header: candidate.full_name,
      buttons: buttons
    });
    await actionSheet.present();
  }

  // ============ TASKS ============
  loadTaskTemplates() {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/preonboarding/tasks`).subscribe({
      next: (data: any) => {
        this.taskTemplates = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  openTaskModal(task?: any) {
    this.taskForm = task ? { ...task } : {
      task_name: '', description: '', task_category: 'document_submission',
      is_mandatory: 1, task_order: 1, auto_assign: 1, assigned_to_role: 'candidate'
    };
    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
  }

  async saveTask() {
    if (!this.taskForm.task_name) {
      this.showToast('Please enter task name', 'warning');
      return;
    }

    const url = this.taskForm.id 
      ? `${environment.apiUrl}/preonboarding/tasks/${this.taskForm.id}` 
      : `${environment.apiUrl}/preonboarding/tasks`;
    const method = this.taskForm.id ? 'put' : 'post';

    this.http[method](url, this.taskForm).subscribe({
      next: () => {
        this.showToast('Task saved', 'success');
        this.closeTaskModal();
        this.loadTaskTemplates();
      },
      error: () => this.showToast('Failed to save task', 'danger')
    });
  }

  async deleteTask(task: any) {
    const alert = await this.alertController.create({
      header: 'Delete Task',
      message: `Delete "${task.task_name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.http.delete(`${environment.apiUrl}/preonboarding/tasks/${task.id}`).subscribe({
              next: () => {
                this.showToast('Task deleted', 'success');
                this.loadTaskTemplates();
              },
              error: () => this.showToast('Failed', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async setupDefaultTasks() {
    const alert = await this.alertController.create({
      header: 'Setup Default Tasks',
      message: 'Create 15 default pre-onboarding tasks?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Setup',
          handler: () => {
            this.http.post(`${environment.apiUrl}/preonboarding/tasks/setup-defaults`, {}).subscribe({
              next: (response: any) => {
                this.showToast(response.message, 'success');
                this.loadTaskTemplates();
              },
              error: () => this.showToast('Failed', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async assignTasks(candidate: any) {
    this.selectedCandidate = candidate;
    
    this.http.get(`${environment.apiUrl}/preonboarding/tasks`).subscribe({
      next: async (data: any) => {
        const tasks = data || [];
        
        const alert = await this.alertController.create({
          header: `Assign Tasks to ${candidate.full_name}`,
          inputs: tasks.map((task: any) => ({
            type: 'checkbox',
            label: task.task_name,
            value: task.id,
            checked: task.auto_assign === 1
          })),
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Assign',
              handler: (taskIds) => {
                this.http.post(`${environment.apiUrl}/preonboarding/assign/${candidate.id}`, {
                  task_ids: taskIds
                }).subscribe({
                  next: (response: any) => {
                    this.showToast(response.message, 'success');
                    this.loadCandidates();
                  },
                  error: () => this.showToast('Failed', 'danger')
                });
              }
            }
          ]
        });
        await alert.present();
      },
      error: () => this.showToast('Failed to load tasks', 'danger')
    });
  }

  // ============ DOCUMENTS ============
  openDocumentUpload(candidate: any) {
    this.selectedCandidate = candidate;
    this.documentForm = { document_type: 'resume', required: 1 };
    this.selectedFile = null;
    this.showDocumentModal = true;
  }

  closeDocumentModal() {
    this.showDocumentModal = false;
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadDocument() {
    if (!this.selectedFile) {
      this.showToast('Please select a file', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('document_type', this.documentForm.document_type);
    formData.append('required', this.documentForm.required);

    this.http.post(`${environment.apiUrl}/candidates/${this.selectedCandidate.id}/documents`, formData).subscribe({
      next: () => {
        this.showToast('Document uploaded', 'success');
        this.closeDocumentModal();
        if (this.showProgressModal) {
          this.viewCandidateDetails(this.selectedCandidate);
        }
      },
      error: () => this.showToast('Failed to upload', 'danger')
    });
  }

  async verifyDocument(doc: any) {
    const alert = await this.alertController.create({
      header: 'Verify Document',
      message: `Verify ${doc.document_type}?`,
      inputs: [{ name: 'remarks', type: 'text', placeholder: 'Remarks (optional)' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Verify',
          handler: (data) => {
            this.http.put(`${environment.apiUrl}/candidates/documents/${doc.id}/verify`, {
              remarks: data.remarks
            }).subscribe({
              next: () => {
                this.showToast('Document verified', 'success');
                if (this.selectedCandidate) {
                  this.viewCandidateDetails(this.selectedCandidate);
                }
              },
              error: () => this.showToast('Failed', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // ============ UTILITIES ============
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message, duration: 3000, color, position: 'top'
    });
    toast.present();
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'offered': 'primary', 'offer_accepted': 'success', 'offer_declined': 'danger',
      'documents_pending': 'warning', 'bgv_initiated': 'secondary', 'bgv_completed': 'success',
      'ready_to_join': 'success', 'joined': 'success', 'dropped_out': 'danger'
    };
    return colors[status] || 'medium';
  }

  getBGVColor(status: string): string {
    const colors: any = {
      'not_started': 'medium', 'initiated': 'warning', 'in_progress': 'secondary',
      'completed': 'success', 'failed': 'danger'
    };
    return colors[status] || 'medium';
  }

  formatDate(date: string): string {
    return date ? new Date(date).toLocaleDateString() : '';
  }
}
