import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { environment } from '../../../../../../environments/environment';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-id-card-modal',
  templateUrl: './id-card-modal.component.html',
  styleUrls: ['./id-card-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class IdCardModalComponent implements OnInit {
  @Input() currentEmployee: any;
  @ViewChild('idCardRef', { static: false }) idCardRef!: ElementRef;

  env: string = '';
  isDownloading = false;

  get hasProfileImage(): boolean {
    return !!this.currentEmployee?.profile_image;
  }

  get profileImageUrl(): string {
    if (this.currentEmployee?.profile_image) {
      return this.env + this.currentEmployee.profile_image;
    }
    return '';
  }

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async downloadIdCard() {
    if (!this.hasProfileImage) {
      const toast = await this.toastController.create({
        message: 'Please upload a profile picture first to generate your ID Card.',
        duration: 3000,
        color: 'warning',
        position: 'top',
        icon: 'alert-circle'
      });
      await toast.present();
      return;
    }

    this.isDownloading = true;

    try {
      const element = this.idCardRef.nativeElement;
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const link = document.createElement('a');
      link.download = `ID_Card_${this.currentEmployee?.EmployeeNumber || 'Employee'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      const toast = await this.toastController.create({
        message: 'ID Card downloaded successfully!',
        duration: 2000,
        color: 'success',
        position: 'top',
        icon: 'checkmark-circle'
      });
      await toast.present();
    } catch (err) {
      console.error('Error generating ID card:', err);
      const toast = await this.toastController.create({
        message: 'Failed to download ID Card. Please try again.',
        duration: 2000,
        color: 'danger',
        position: 'top',
        icon: 'alert-circle'
      });
      await toast.present();
    } finally {
      this.isDownloading = false;
    }
  }
}
