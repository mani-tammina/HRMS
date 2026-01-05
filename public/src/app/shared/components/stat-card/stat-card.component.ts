import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonIcon]
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() iconColor: string = 'primary';
  @Input() trend?: 'up' | 'down' | 'neutral';
  @Input() trendValue?: string;
  @Input() loading: boolean = false;
  @Input() clickable: boolean = false;

  getTrendIcon(): string {
    switch (this.trend) {
      case 'up':
        return 'trending-up-outline';
      case 'down':
        return 'trending-down-outline';
      default:
        return 'remove-outline';
    }
  }

  getTrendColor(): string {
    switch (this.trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'medium';
    }
  }
}
