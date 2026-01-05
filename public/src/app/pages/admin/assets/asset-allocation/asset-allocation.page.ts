import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonDatetime, IonSegment, IonSegmentButton,
  ToastController, LoadingController, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, arrowBackOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { AssetsService, Asset, AssetAllocation } from '@core/services/assets.service';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-asset-allocation',
  templateUrl: './asset-allocation.page.html',
  styleUrls: ['./asset-allocation.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonTextarea,
    IonSelect, IonSelectOption, IonDatetime, IonSegment, IonSegmentButton, IonBadge,
    LoadingComponent
  ]
})
export class AssetAllocationPage implements OnInit {
  selectedView: 'allocate' | 'return' | 'active' = 'allocate';
  allocationForm!: FormGroup;
  returnForm!: FormGroup;
  
  availableAssets: Asset[] = [];
  employees: Employee[] = [];
  activeAllocations: AssetAllocation[] = [];
  selectedAllocation: AssetAllocation | null = null;
  
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private assetsService: AssetsService,
    private employeeService: EmployeeService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private loadingController: LoadingController
  ) {
    addIcons({ saveOutline, arrowBackOutline, checkmarkDoneOutline });
  }

  ngOnInit() {
    this.initForms();
    this.loadData();
  }

  initForms() {
    this.allocationForm = this.fb.group({
      asset_id: ['', Validators.required],
      employee_id: ['', Validators.required],
      allocation_date: [new Date().toISOString().split('T')[0], Validators.required],
      expected_return_date: [''],
      allocation_notes: ['']
    });

    this.returnForm = this.fb.group({
      return_condition: ['good', Validators.required],
      return_notes: ['']
    });
  }

  loadData() {
    this.loadAvailableAssets();
    this.loadEmployees();
    this.loadActiveAllocations();
  }

  loadAvailableAssets() {
    this.assetsService.getAssets('available').subscribe({
      next: (response) => {
        this.availableAssets = response.assets;
      },
      error: (error) => console.error('Error loading assets:', error)
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

  loadActiveAllocations() {
    this.assetsService.getAllocations('active').subscribe({
      next: (response) => {
        this.activeAllocations = response.allocations;
      },
      error: (error) => console.error('Error loading allocations:', error)
    });
  }

  onViewChange(event: any) {
    this.selectedView = event.detail.value;
    this.selectedAllocation = null;
    this.returnForm.reset({ return_condition: 'good' });
  }

  async allocateAsset() {
    if (this.allocationForm.invalid) {
      await this.errorHandler.handleWarning('Please fill all required fields');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Allocating asset...' });
    await loading.present();

    this.assetsService.allocateAsset(this.allocationForm.value).subscribe({
      next: async (response) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        this.allocationForm.reset({ allocation_date: new Date().toISOString().split('T')[0] });
        this.loadData();
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to allocate asset');
      }
    });
  }

  selectAllocationForReturn(allocation: AssetAllocation) {
    this.selectedAllocation = allocation;
    this.selectedView = 'return';
  }

  async returnAsset() {
    if (!this.selectedAllocation || this.returnForm.invalid) {
      await this.errorHandler.handleWarning('Please select an asset and fill return details');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Processing return...' });
    await loading.present();

    this.assetsService.returnAsset(this.selectedAllocation.id, this.returnForm.value).subscribe({
      next: async (response) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        this.selectedAllocation = null;
        this.returnForm.reset({ return_condition: 'good' });
        this.selectedView = 'active';
        this.loadData();
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to return asset');
      }
    });
  }

  formatDate(date: string | null): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  getStatusColor(status: string): string {
    return status === 'active' ? 'success' : 'medium';
  }
}
