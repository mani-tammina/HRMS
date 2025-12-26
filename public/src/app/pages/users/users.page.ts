import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonSearchbar, IonList, IonItem, IonLabel, IonBadge, IonIcon,
  IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonButton,
  IonSelect, IonSelectOption, AlertController, ToastController, IonSpinner
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { UserService, User } from '@core/services/user.service';
import { addIcons } from 'ionicons';
import { 
  personOutline, shieldOutline, briefcaseOutline, peopleOutline,
  checkmarkCircleOutline, refreshOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonSearchbar, IonList, IonItem, IonLabel, IonBadge, IonIcon,
    IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonButton,
    IonSelect, IonSelectOption, IonSpinner
  ]
})
export class UsersPage implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  isLoading = false;

  roleColors: { [key: string]: string } = {
    admin: 'danger',
    hr: 'warning',
    manager: 'primary',
    employee: 'medium'
  };

  roleIcons: { [key: string]: string } = {
    admin: 'shield-outline',
    hr: 'briefcase-outline',
    manager: 'people-outline',
    employee: 'person-outline'
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ 
      personOutline, shieldOutline, briefcaseOutline, peopleOutline,
      checkmarkCircleOutline, refreshOutline
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        this.showToast('Error loading users', 'danger');
      }
    });
  }

  handleRefresh(event: any) {
    this.loadUsers();
    setTimeout(() => event.target.complete(), 1000);
  }

  filterUsers(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.full_name?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  }

  async changeUserRole(user: User) {
    const alert = await this.alertController.create({
      header: 'Change User Role',
      subHeader: `Current: ${user.role}`,
      message: `Select new role for ${user.username || user.full_name}`,
      inputs: [
        {
          name: 'admin',
          type: 'radio',
          label: 'Admin',
          value: 'admin',
          checked: user.role === 'admin'
        },
        {
          name: 'hr',
          type: 'radio',
          label: 'HR',
          value: 'hr',
          checked: user.role === 'hr'
        },
        {
          name: 'manager',
          type: 'radio',
          label: 'Manager',
          value: 'manager',
          checked: user.role === 'manager'
        },
        {
          name: 'employee',
          type: 'radio',
          label: 'Employee',
          value: 'employee',
          checked: user.role === 'employee'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (role) => {
            this.updateRole(user, role);
          }
        }
      ]
    });

    await alert.present();
  }

  updateRole(user: User, newRole: string) {
    if (!newRole || newRole === user.role) {
      return;
    }

    let updateObservable;
    
    switch (newRole) {
      case 'admin':
        updateObservable = this.userService.makeAdmin(user.id);
        break;
      case 'hr':
        updateObservable = this.userService.makeHR(user.id);
        break;
      case 'manager':
        updateObservable = this.userService.makeManager(user.id);
        break;
      case 'employee':
        updateObservable = this.userService.makeEmployee(user.id);
        break;
      default:
        updateObservable = this.userService.updateUserRole(user.id, newRole);
    }

    updateObservable.subscribe({
      next: () => {
        this.showToast(`User role updated to ${newRole}`, 'success');
        this.loadUsers(); // Reload to get updated data
      },
      error: (error) => {
        console.error('Error updating role:', error);
        this.showToast('Error updating user role', 'danger');
      }
    });
  }

  async quickActionMakeHR(user: User) {
    const confirm = await this.confirmAction(user, 'HR');
    if (confirm) {
      this.userService.makeHR(user.id).subscribe({
        next: () => {
          this.showToast(`${user.username} is now HR`, 'success');
          this.loadUsers();
        },
        error: () => this.showToast('Error updating role', 'danger')
      });
    }
  }

  async quickActionMakeManager(user: User) {
    const confirm = await this.confirmAction(user, 'Manager');
    if (confirm) {
      this.userService.makeManager(user.id).subscribe({
        next: () => {
          this.showToast(`${user.username} is now a Manager`, 'success');
          this.loadUsers();
        },
        error: () => this.showToast('Error updating role', 'danger')
      });
    }
  }

  async quickActionMakeEmployee(user: User) {
    const confirm = await this.confirmAction(user, 'Employee');
    if (confirm) {
      this.userService.makeEmployee(user.id).subscribe({
        next: () => {
          this.showToast(`${user.username} is now an Employee`, 'success');
          this.loadUsers();
        },
        error: () => this.showToast('Error updating role', 'danger')
      });
    }
  }

  async confirmAction(user: User, newRole: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm Role Change',
        message: `Change ${user.username || user.full_name} from ${user.role} to ${newRole}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Confirm',
            handler: () => resolve(true)
          }
        ]
      });

      await alert.present();
    });
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  getRoleStats() {
    return {
      total: this.users.length,
      admin: this.users.filter(u => u.role === 'admin').length,
      hr: this.users.filter(u => u.role === 'hr').length,
      manager: this.users.filter(u => u.role === 'manager').length,
      employee: this.users.filter(u => u.role === 'employee').length
    };
  }
}
