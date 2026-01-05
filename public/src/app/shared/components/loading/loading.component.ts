import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule, IonSpinner]
})
export class LoadingComponent {
  @Input() message: string = 'Loading...';
  @Input() type: 'spinner' | 'skeleton' | 'dots' = 'spinner';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
