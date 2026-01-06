import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSearchbar,
  IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption,
  ToastController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, briefcaseOutline, peopleOutline, timeOutline,
  checkmarkCircleOutline, pauseCircleOutline, closeCircleOutline, searchOutline
} from 'ionicons/icons';
import { ProjectsService, Project } from '@core/services/projects.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSearchbar,
    IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption,
    LoadingComponent
  ]
})
export class ProjectsPage implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  searchTerm = '';
  filterStatus = 'all';

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({
      addOutline, briefcaseOutline, peopleOutline, timeOutline,
      checkmarkCircleOutline, pauseCircleOutline, closeCircleOutline, searchOutline
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  ionViewWillEnter() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    const status = this.filterStatus !== 'all' ? this.filterStatus : undefined;

    this.projectsService.getProjects(status).subscribe({
      next: (response) => {
        this.projects = response.projects;
        this.filterProjects();
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load projects');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadProjects();
    setTimeout(() => event.target.complete(), 1000);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value?.toLowerCase() || '';
    this.filterProjects();
  }

  onFilterChange(event: any) {
    this.filterStatus = event.detail.value;
    this.loadProjects();
  }

  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = this.projects;
      return;
    }

    this.filteredProjects = this.projects.filter(project =>
      project.project_name.toLowerCase().includes(this.searchTerm) ||
      project.project_code.toLowerCase().includes(this.searchTerm) ||
      project.client_name.toLowerCase().includes(this.searchTerm)
    );
  }

  viewProject(id: number) {
    this.router.navigate(['/admin/projects', id]);
  }

  addProject() {
    this.router.navigate(['/admin/projects/new']);
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

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'active': 'checkmark-circle-outline',
      'completed': 'checkmark-circle-outline',
      'on_hold': 'pause-circle-outline',
      'cancelled': 'close-circle-outline'
    };
    return icons[status] || 'briefcase-outline';
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

  formatDate(date: string | null): string {
    if (!date) return 'Ongoing';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
