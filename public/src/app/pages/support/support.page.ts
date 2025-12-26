import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon, IonFab, IonFabButton,
  IonSegment, IonSegmentButton, IonSearchbar, IonChip,
  LoadingController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, ticketOutline, timeOutline, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { SupportService, SupportTicket } from '@core/services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon, IonFab, IonFabButton,
    IonSegment, IonSegmentButton, IonSearchbar, IonChip
  ]
})
export class SupportPage implements OnInit {
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  isLoading = false;
  selectedStatus: string = 'all';
  searchTerm = '';

  constructor(
    private supportService: SupportService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) {
    addIcons({ addOutline, ticketOutline, timeOutline, checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit() {
    this.loadTickets();
  }

  async loadTickets(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.supportService.getMyTickets().subscribe({
      next: (response) => {
        this.tickets = response.tickets.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.applyFilters();
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: Error) => {
        console.error('Error loading tickets:', error);
        this.showToast('Failed to load tickets', 'danger');
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  segmentChanged(event: any) {
    this.selectedStatus = event.detail.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.tickets];

    // Filter by status
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === this.selectedStatus);
    }

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.subject.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
      );
    }

    this.filteredTickets = filtered;
  }

  createTicket() {
    this.router.navigate(['/support/create']);
  }

  viewTicket(ticket: SupportTicket) {
    this.router.navigate(['/support', ticket.id]);
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'open': return 'warning';
      case 'in-progress': return 'primary';
      case 'resolved': return 'success';
      case 'closed': return 'medium';
      default: return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'checkmark-circle-outline';
      case 'closed': return 'close-circle-outline';
      default: return 'time-outline';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'medium';
    }
  }

  getCategoryColor(category: string): string {
    switch (category?.toLowerCase()) {
      case 'it': return 'primary';
      case 'hr': return 'secondary';
      case 'payroll': return 'success';
      case 'leave': return 'warning';
      case 'attendance': return 'tertiary';
      default: return 'medium';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
