import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon, IonSelect, IonSelectOption,
  IonProgressBar, IonText, IonGrid, IonRow, IonCol,
  LoadingController, ToastController, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, downloadOutline, checkmarkCircleOutline, closeCircleOutline, documentOutline } from 'ionicons/icons';
import { UploadService, UploadResult } from '@core/services/upload.service';

interface UploadType {
  id: string;
  name: string;
  description: string;
  templateFile: string;
}

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.page.html',
  styleUrls: ['./bulk-upload.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonSelect, IonSelectOption,
    IonProgressBar, IonText, IonGrid, IonRow, IonCol
  ]
})
export class BulkUploadPage implements OnInit {
  selectedType: string = '';
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
  uploadResult: UploadResult | null = null;

  uploadTypes: UploadType[] = [
    {
      id: 'employees',
      name: 'Employees',
      description: 'Upload employee master data (Name, Email, Department, Designation, etc.)',
      templateFile: 'employee_upload_template.xlsx'
    },
    {
      id: 'holidays',
      name: 'Holidays',
      description: 'Upload company holidays (Date, Name, Type, Location)',
      templateFile: 'holiday_upload_template.xlsx'
    },
    {
      id: 'payroll',
      name: 'Payroll Data',
      description: 'Upload payroll information (Employee ID, Salary Components, Deductions)',
      templateFile: 'payroll_upload_template.xlsx'
    }
  ];

  constructor(
    private uploadService: UploadService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      cloudUploadOutline,
      downloadOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      documentOutline
    });
  }

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (!validTypes.includes(file.type)) {
        this.showToast('Please select a valid Excel or CSV file', 'danger');
        return;
      }

      this.selectedFile = file;
      this.uploadResult = null;
    }
  }

  async downloadTemplate() {
    if (!this.selectedType) {
      this.showToast('Please select an upload type first', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Downloading template...'
    });
    await loading.present();

    this.uploadService.downloadTemplate(this.selectedType as 'employees' | 'holidays' | 'payroll').subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.selectedType}_template.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        loading.dismiss();
        this.showToast('Template downloaded successfully', 'success');
      },
      error: (error: Error) => {
        loading.dismiss();
        this.showToast('Failed to download template', 'danger');
      }
    });
  }

  async uploadFile() {
    if (!this.selectedType || !this.selectedFile) {
      this.showToast('Please select upload type and file', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Upload',
      message: `Are you sure you want to upload ${this.selectedFile.name}? This will process the data and may update records.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Upload',
          handler: () => {
            this.processUpload();
          }
        }
      ]
    });

    await alert.present();
  }

  async processUpload() {
    if (!this.selectedFile || !this.selectedType) return;

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadResult = null;

    const loading = await this.loadingController.create({
      message: 'Uploading and processing file...'
    });
    await loading.present();

    // Simulate progress
    const progressInterval = setInterval(() => {
      if (this.uploadProgress < 90) {
        this.uploadProgress += 10;
      }
    }, 200);

    let uploadObservable;
    switch (this.selectedType) {
      case 'employees':
        uploadObservable = this.uploadService.uploadEmployees(this.selectedFile);
        break;
      case 'holidays':
        uploadObservable = this.uploadService.uploadHolidays(this.selectedFile);
        break;
      case 'payroll':
        uploadObservable = this.uploadService.uploadPayrollData(this.selectedFile);
        break;
      default:
        clearInterval(progressInterval);
        loading.dismiss();
        this.isUploading = false;
        this.showToast('Invalid upload type', 'danger');
        return;
    }

    uploadObservable.subscribe({
      next: (result: UploadResult) => {
        clearInterval(progressInterval);
        this.uploadProgress = 100;
        this.uploadResult = result;
        this.isUploading = false;
        loading.dismiss();
        
        if (result.success) {
          this.showToast(`Successfully uploaded ${result.successCount} records`, 'success');
        } else {
          this.showToast(`Upload completed with ${result.errorCount} errors`, 'warning');
        }
        
        // Reset file input
        this.selectedFile = null;
      },
      error: (error: Error) => {
        clearInterval(progressInterval);
        this.uploadProgress = 0;
        this.isUploading = false;
        loading.dismiss();
        this.showToast('Upload failed: ' + error.message, 'danger');
      }
    });
  }

  resetUpload() {
    this.selectedFile = null;
    this.uploadResult = null;
    this.uploadProgress = 0;
    this.isUploading = false;
  }

  getSelectedTypeName(): string {
    const type = this.uploadTypes.find(t => t.id === this.selectedType);
    return type ? type.name : '';
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
