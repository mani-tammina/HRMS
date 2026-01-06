import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSegment, IonSegmentButton,
  IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime,
  ToastController, AlertController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  saveOutline, trashOutline, addOutline, peopleOutline, timeOutline,
  createOutline, personAddOutline
} from 'ionicons/icons';
import { ProjectsService, ProjectDetails, ProjectShift, ProjectAssignment } from '@core/services/projects.service';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSegment, IonSegmentButton,
    IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime,
    LoadingComponent
  ]
})
export class ProjectDetailPage implements OnInit {
  projectId: number | null = null;
  project: ProjectDetails | null = null;
  isLoading = false;
  selectedSegment: 'details' | 'shifts' | 'team' = 'details';
  
  // Modals
  showEditModal = false;
  showShiftModal = false;
  showAssignModal = false;
  
  // Forms
  projectForm!: FormGroup;
  shiftForm!: FormGroup;
  assignForm!: FormGroup;
  
  // Data
  employees: Employee[] = [];
  editingShift: ProjectShift | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private employeeService: EmployeeService,
    private errorHandler: ErrorHandlerService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({
      saveOutline, trashOutline, addOutline, peopleOutline, timeOutline,
      createOutline, personAddOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.projectId = parseInt(id);
      this.loadProject();
    } else {
      this.initNewProject();
    }
    
    this.initForms();
    this.loadEmployees();
  }

  initForms() {
    this.projectForm = this.fb.group({
      project_code: ['', Validators.required],
      project_name: ['', Validators.required],
      client_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      status: ['active', Validators.required],
      description: ['']
    });

    this.shiftForm = this.fb.group({
      shift_type: ['day', Validators.required],
      shift_name: ['', Validators.required],
      start_time: ['09:00', Validators.required],
      end_time: ['18:00', Validators.required],
      timezone: ['UTC', Validators.required]
    });

    this.assignForm = this.fb.group({
      employee_id: ['', Validators.required],
      role_in_project: ['', Validators.required],
      allocation_percentage: [100, [Validators.required, Validators.min(0), Validators.max(100)]],
      shift_id: [''],
      assignment_start_date: ['', Validators.required],
      assignment_end_date: ['']
    });
  }

  loadProject() {
    if (!this.projectId) return;
    
    this.isLoading = true;
    this.projectsService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.project = response.project;
        this.projectForm.patchValue(this.project);
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load project');
        this.isLoading = false;
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees.filter(e => e.EmploymentStatus === 'Working');
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  initNewProject() {
    this.project = null;
    this.projectForm.reset({
      status: 'active'
    });
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active': 'Active',
      'completed': 'Completed',
      'on_hold': 'On Hold',
      'cancelled': 'Cancelled'
    };
    return labels[status] || status;
  }

  async saveProject() {
    if (this.projectForm.invalid) {
      await this.errorHandler.handleWarning('Please fill all required fields');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Saving project...' });
    await loading.present();

    const projectData = this.projectForm.value;

    const operation = this.projectId
      ? this.projectsService.updateProject(this.projectId, projectData)
      : this.projectsService.createProject(projectData);

    operation.subscribe({
      next: async (response: any) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        
        if (!this.projectId && response.project) {
          this.router.navigate(['/admin/projects', response.project.id]);
        } else {
          this.showEditModal = false;
          this.loadProject();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to save project');
      }
    });
  }

  async saveShift() {
    if (this.shiftForm.invalid || !this.projectId) {
      await this.errorHandler.handleWarning('Please fill all required fields');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Saving shift...' });
    await loading.present();

    this.projectsService.addShift(this.projectId, this.shiftForm.value).subscribe({
      next: async (response) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        this.showShiftModal = false;
        this.shiftForm.reset({ shift_type: 'day', start_time: '09:00', end_time: '18:00', timezone: 'UTC' });
        this.loadProject();
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to save shift');
      }
    });
  }

  async assignEmployee() {
    if (this.assignForm.invalid || !this.projectId) {
      await this.errorHandler.handleWarning('Please fill all required fields');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Assigning employee...' });
    await loading.present();

    const assignmentData = {
      ...this.assignForm.value,
      project_id: this.projectId
    };

    this.projectsService.assignEmployee(assignmentData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        this.showAssignModal = false;
        this.assignForm.reset({ allocation_percentage: 100 });
        this.loadProject();
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to assign employee');
      }
    });
  }

  async deleteProject() {
    if (!this.projectId) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.confirmDelete()
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete() {
    if (!this.projectId) return;

    const loading = await this.loadingController.create({ message: 'Deleting project...' });
    await loading.present();

    this.projectsService.deleteProject(this.projectId).subscribe({
      next: async (response) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        this.router.navigate(['/admin/projects']);
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to delete project');
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active': 'success',
      'completed': 'primary',
      'on_hold': 'warning',
      'cancelled': 'danger'
    };
    return colors[status] || 'medium';
  }

  formatDate(date: string | null): string {
    if (!date) return 'Ongoing';
    return new Date(date).toLocaleDateString();
  }
}
