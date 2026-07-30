import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {
  TimeTrackingPolicyService,
  TimeTrackingPolicy
} from '../../../../core/services/time-tracking-policy.service';

@Component({
  selector: 'app-time-tracking-list',
  templateUrl: './time-tracking-list.page.html',
  styleUrls: ['./time-tracking-list.page.scss'],
  standalone: false
})
export class TimeTrackingListPage implements OnInit {
  policies: TimeTrackingPolicy[] = [];
  loading = false;

  constructor(
    private router: Router,
    private policyService: TimeTrackingPolicyService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadPolicies();
  }

  ionViewWillEnter() {
    // Refresh list when navigating back from wizard
    this.loadPolicies();
  }

  loadPolicies() {
    this.loading = true;
    this.policyService.getPolicies().subscribe({
      next: (res) => {
        this.policies = res || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  createPolicy() {
    this.router.navigate(['/administration/time-tracking/create']);
  }

  editPolicy(policy: TimeTrackingPolicy) {
    this.router.navigate(['/administration/time-tracking/edit', policy.id]);
  }

  async deletePolicy(policy: TimeTrackingPolicy) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Policy',
      message: `Are you sure you want to delete "${policy.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.policyService.deletePolicy(policy.id).subscribe({
              next: () => {
                this.showToast('Policy deleted successfully', 'success');
                this.loadPolicies();
              },
              error: () => this.showToast('Failed to delete policy', 'danger')
            });
          }
        }
      ]
    });
    alert.present();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: color as any,
      position: 'top'
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/administration']);
  }

  get activeCount(): number {
    return this.policies.filter(p => p.status === 'active').length;
  }

  getSiteNames(policy: TimeTrackingPolicy): string {
    if (policy.sites && policy.sites.length > 0) {
      return policy.sites.map((s: any) => s.name).join(', ');
    }
    return '—';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
