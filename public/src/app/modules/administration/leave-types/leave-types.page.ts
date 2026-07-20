import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LeaveTypeService } from '../../../core/services/leavetype.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leave-types',
  templateUrl: './leave-types.page.html',
  styleUrls: ['./leave-types.page.scss'],
  standalone: false
})
export class LeaveTypesPage implements OnInit {
  leaveTypeForm!: FormGroup;
  leaveTypes: any[] = [];
  loading = false;
  listLoading = false;
  isModalOpen = false;
  isEditMode = false;
  selectedLeaveTypeId: number | null = null;

  env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
  selectedFile: File | null = null;
  selectedFileName = '';
  currentIconUrl = '';
  removeIconFlag = false;

  constructor(
    private fb: FormBuilder,
    private leaveTypesService: LeaveTypeService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadLeaveTypes();
  }

  private initForm() {
    this.leaveTypeForm = this.fb.group({
      type_name: ['', Validators.required],
      type_code: ['', Validators.required],
      is_paid: [true],
      requires_approval: [true],
      can_carry_forward: [false],
      max_carry_forward_days: [0],
      description: [''],
      bg_color: ['#1976d2'],
    });
  }

  loadLeaveTypes() {
    this.listLoading = true;
    this.leaveTypesService.getLeaveTypes().subscribe({
      next: (res) => {
        this.leaveTypes = res || [];
        this.listLoading = false;
      },
      error: () => this.listLoading = false
    });
  }

  openCreateForm() {
    this.isEditMode = false;
    this.selectedLeaveTypeId = null;
    this.selectedFile = null;
    this.selectedFileName = '';
    this.currentIconUrl = '';
    this.removeIconFlag = false;
    this.leaveTypeForm.reset({
      is_paid: true,
      requires_approval: true,
      can_carry_forward: false,
      max_carry_forward_days: 0,
      bg_color: '#1976d2'
    });
    this.isModalOpen = true;
  }

  editLeaveType(type: any) {
    this.isEditMode = true;
    this.selectedLeaveTypeId = type.id;
    this.selectedFile = null;
    this.selectedFileName = '';
    this.currentIconUrl = type.icon_path || '';
    this.removeIconFlag = false;
    this.leaveTypeForm.patchValue({
      type_name: type.type_name,
      type_code: type.type_code,
      is_paid: type.is_paid === 1 || type.is_paid === true,
      requires_approval: type.requires_approval === 1 || type.requires_approval === true,
      can_carry_forward: type.can_carry_forward === 1 || type.can_carry_forward === true,
      max_carry_forward_days: type.max_carry_forward_days,
      description: type.description,
      bg_color: type.bg_color || '#1976d2'
    });
    this.isModalOpen = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.removeIconFlag = false;
    }
  }

  clearSelectedFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.selectedFileName = '';
    this.currentIconUrl = '';
    this.removeIconFlag = true;
  }

  onColorChange(event: any) {
    this.leaveTypeForm.patchValue({ bg_color: event.target.value });
  }

  submit() {
    if (this.leaveTypeForm.invalid) return;

    this.loading = true;

    const formData = new FormData();
    formData.append('type_name', this.leaveTypeForm.get('type_name')?.value || '');
    formData.append('type_code', this.leaveTypeForm.get('type_code')?.value || '');
    formData.append('is_paid', this.leaveTypeForm.get('is_paid')?.value ? '1' : '0');
    formData.append('requires_approval', this.leaveTypeForm.get('requires_approval')?.value ? '1' : '0');
    formData.append('can_carry_forward', this.leaveTypeForm.get('can_carry_forward')?.value ? '1' : '0');
    formData.append('max_carry_forward_days', String(this.leaveTypeForm.get('max_carry_forward_days')?.value || 0));
    formData.append('description', this.leaveTypeForm.get('description')?.value || '');
    formData.append('bg_color', this.leaveTypeForm.get('bg_color')?.value || '');

    if (this.selectedFile) {
      formData.append('icon', this.selectedFile);
    }
    if (this.removeIconFlag) {
      formData.append('remove_icon', 'true');
    }

    const action = this.isEditMode
      ? this.leaveTypesService.updateLeaveType(this.selectedLeaveTypeId!, formData)
      : this.leaveTypesService.createLeaveType(formData);

    action.subscribe({
      next: () => {
        this.showToast(`Leave type ${this.isEditMode ? 'updated' : 'created'} successfully`, 'success');
        this.loading = false;
        this.isModalOpen = false;
        this.loadLeaveTypes();
      },
      error: () => {
        this.loading = false;
        this.showToast('Operation failed', 'danger');
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: color as any, position: 'top' });
    toast.present();
  }

  cancelCreate() {
    this.isModalOpen = false;
    this.isEditMode = false;
  }

  goBack() {
    this.router.navigate(['/administration/leaves-admin']);
  }
}
