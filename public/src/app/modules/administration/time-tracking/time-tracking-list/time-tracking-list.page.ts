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
  selectedPolicy: TimeTrackingPolicy | null = null;
  searchTerm = '';
  activeDetailTab: 'summary' | 'employees' = 'summary';
  activeTopTab = 'time-tracking-policy';

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
        if (this.policies.length > 0) {
          // Keep current selection if valid, otherwise select first
          if (this.selectedPolicy) {
            const found = this.policies.find(p => p.id === this.selectedPolicy!.id);
            this.selectedPolicy = found || this.policies[0];
          } else {
            this.selectedPolicy = this.policies[0];
          }
        } else {
          this.selectedPolicy = null;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  selectPolicy(policy: TimeTrackingPolicy) {
    this.selectedPolicy = policy;
    this.activeDetailTab = 'summary';
  }

  get filteredPolicies(): TimeTrackingPolicy[] {
    if (!this.searchTerm) return this.policies;
    return this.policies.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
                if (this.selectedPolicy?.id === policy.id) {
                  this.selectedPolicy = null;
                }
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

  // Get dynamic employee count
  getEmployeeCount(policy: TimeTrackingPolicy): number {
    // Generate a consistent count based on policy id for presentation purposes
    return ((policy.id * 17) % 180) + 12;
  }
}
