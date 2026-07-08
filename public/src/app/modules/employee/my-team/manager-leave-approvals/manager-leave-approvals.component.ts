import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { LeaverequestService } from '../../../../core/services/leaverequest.service';
import { LeaveTypeService } from '../../../../core/services/leavetype.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manager-leave-approvals',
  templateUrl: './manager-leave-approvals.component.html',
  styleUrls: ['./manager-leave-approvals.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ManagerLeaveApprovalsComponent implements OnInit {
  pendingLeaves: any[] = [];
  filteredLeaves: any[] = [];
  pendingCompOffs: any[] = [];
  filteredCompOffs: any[] = [];
  leaveTypes: any[] = [];
  isLoading = false;
  searchTerm = '';
  leaveTypeFilter = 'all';
  activeTab: 'leaves' | 'compoff' = 'leaves';
  rejectionReasons: { [id: number]: string } = {};

  constructor(
    private leaveRequestService: LeaverequestService,
    private leaveTypeService: LeaveTypeService,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadLeaveTypes();
    this.loadPendingLeaves();
    this.loadPendingCompOffs();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  loadLeaveTypes() {
    this.leaveTypeService.getLeaveTypes().subscribe({
      next: (types) => {
        this.leaveTypes = types.sort((a: any, b: any) => a.type_name.localeCompare(b.type_name));
      },
      error: (error) => {
        console.error('Error loading leave types:', error);
        this.showToast('Failed to load leave types', 'danger');
      }
    });
  }

  loadPendingLeaves() {
    this.isLoading = true;
    this.leaveRequestService.getPendingLeaveRequests().subscribe({
      next: (leaves) => {
        this.pendingLeaves = leaves;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pending leaves:', error);
        this.showToast('Failed to load pending leaves', 'danger');
        this.isLoading = false;
      }
    });
  }

  loadPendingCompOffs() {
    this.isLoading = true;
    this.leaveRequestService.getPendingCompOffRequests().subscribe({
      next: (requests) => {
        this.pendingCompOffs = requests;
        this.applyCompOffFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pending comp offs:', error);
        this.showToast('Failed to load pending comp off requests', 'danger');
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    this.filteredLeaves = this.pendingLeaves.filter(leave => {
      const matchesSearch = !this.searchTerm ||
        `${leave.FirstName} ${leave.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        leave.EmployeeNumber?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.leaveTypeFilter === 'all' || leave.type_code === this.leaveTypeFilter;
      return matchesSearch && matchesType;
    });
  }

  applyCompOffFilters() {
    this.filteredCompOffs = this.pendingCompOffs.filter(req => {
      const matchesSearch = !this.searchTerm ||
        `${req.FirstName} ${req.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.EmployeeNumber?.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.applyFilters();
    this.applyCompOffFilters();
  }

  onTypeFilterChange(event: any) {
    this.leaveTypeFilter = event.detail.value;
    this.applyFilters();
  }

  onTabChange(event: any) {
    this.activeTab = event.detail.value;
  }

  approveLeave(leave: any) {
    this.isLoading = true;
    this.leaveRequestService.approveLeave(leave.id, 'Approved').subscribe({
      next: () => {
        this.showToast('Leave approved successfully', 'success');
        this.loadPendingLeaves();
      },
      error: (error) => {
        console.error('Error approving leave:', error);
        this.showToast(error.error?.error || 'Failed to approve leave', 'danger');
        this.isLoading = false;
      }
    });
  }

  rejectLeave(leave: any) {
    const reason = (this.rejectionReasons[leave.id] || '').trim();
    if (!reason) {
      this.showToast('Please enter a rejection reason before rejecting.', 'warning');
      return;
    }
    this.isLoading = true;
    this.leaveRequestService.rejectLeave(leave.id, reason).subscribe({
      next: () => {
        this.showToast('Leave rejected successfully', 'success');
        this.rejectionReasons[leave.id] = '';
        this.loadPendingLeaves();
      },
      error: (error) => {
        console.error('Error rejecting leave:', error);
        this.showToast(error.error?.error || 'Failed to reject leave', 'danger');
        this.isLoading = false;
      }
    });
  }

  approveCompOff(req: any) {
    this.isLoading = true;
    this.leaveRequestService.approveCompOff(req.id).subscribe({
      next: () => {
        this.showToast('Comp Off request approved successfully', 'success');
        this.loadPendingCompOffs();
      },
      error: (error) => {
        console.error('Error approving Comp Off:', error);
        this.showToast(error.error?.error || 'Failed to approve Comp Off', 'danger');
        this.isLoading = false;
      }
    });
  }

  rejectCompOff(req: any) {
    const reason = (this.rejectionReasons[req.id] || '').trim();
    if (!reason) {
      this.showToast('Please enter a rejection reason before rejecting.', 'warning');
      return;
    }
    this.isLoading = true;
    this.leaveRequestService.rejectCompOff(req.id, reason).subscribe({
      next: () => {
        this.showToast('Comp Off request rejected successfully', 'success');
        this.loadPendingCompOffs();
      },
      error: (error) => {
        console.error('Error rejecting Comp Off:', error);
        this.showToast(error.error?.error || 'Failed to reject Comp Off', 'danger');
        this.isLoading = false;
      }
    });
    this.rejectionReasons[req.id] = '';
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({ message, duration: 3000, position: 'bottom', color });
    await toast.present();
  }

  handleRefresh(event: any) {
    this.loadPendingLeaves();
    this.loadPendingCompOffs();
    setTimeout(() => { event.target.complete(); }, 1000);
  }

  getStatusColor(status: string): string {
    const statusColors: any = { 'pending': 'pending', 'approved': 'accept', 'rejected': 'reject' };
    return statusColors[status?.toLowerCase()] || 'medium';
  }

  getProfileImage(leave: any): string {
    if (leave?.profile_image) {
      return `http://${environment.apiURL}${leave.profile_image}?t=${Date.now()}`;
    }
    return '../../assets/Profile_Picture.png';
  }

  async goBack() {
    await this.modalCtrl.dismiss();
  }
}
