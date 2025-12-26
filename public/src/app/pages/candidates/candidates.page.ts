import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonSearchbar, IonSelect, IonSelectOption, IonFab, IonFabButton,
  LoadingController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, personOutline, mailOutline, callOutline, businessOutline, calendarOutline } from 'ionicons/icons';
import { CandidatesService, Candidate } from '@core/services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.page.html',
  styleUrls: ['./candidates.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
    IonSearchbar, IonSelect, IonSelectOption, IonFab, IonFabButton
  ]
})
export class CandidatesPage implements OnInit {
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  isLoading = false;
  searchTerm = '';
  selectedStatus = '';
  selectedDepartment = '';

  constructor(
    private candidatesService: CandidatesService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) {
    addIcons({ addOutline, personOutline, mailOutline, callOutline, businessOutline, calendarOutline });
  }

  ngOnInit() {
    this.loadCandidates();
  }

  async loadCandidates(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.candidatesService.getAllCandidates().subscribe({
      next: (response) => {
        this.candidates = response.candidates.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.applyFilters();
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: Error) => {
        console.error('Error loading candidates:', error);
        this.showToast('Failed to load candidates', 'danger');
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.candidates];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.candidate_name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.position_applied.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(c => c.current_status === this.selectedStatus);
    }

    // Department filter
    if (this.selectedDepartment) {
      filtered = filtered.filter(c => c.department === this.selectedDepartment);
    }

    this.filteredCandidates = filtered;
  }

  viewCandidate(candidate: Candidate) {
    this.router.navigate(['/candidates', candidate.id]);
  }

  createCandidate() {
    this.router.navigate(['/candidates/create']);
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'hired': return 'success';
      case 'offered': return 'success';
      case 'interviewing': return 'warning';
      case 'shortlisted': return 'primary';
      case 'screening': return 'tertiary';
      case 'rejected': return 'danger';
      case 'withdrawn': return 'medium';
      default: return 'medium';
    }
  }

  getOfferStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'accepted': return 'success';
      case 'sent': return 'warning';
      case 'rejected': return 'danger';
      default: return 'medium';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
