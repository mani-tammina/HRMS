import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notification-empty',
  templateUrl: './notification-empty.component.html',
  styleUrls: ['./notification-empty.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class NotificationEmptyComponent {
  @Input() message = 'No notifications found';
  @Input() subMessage = 'Check back later for new requests or updates.';
}
