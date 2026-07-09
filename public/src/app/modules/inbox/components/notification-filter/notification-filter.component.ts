import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-filter',
  templateUrl: './notification-filter.component.html',
  styleUrls: ['./notification-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class NotificationFilterComponent {
  @Input() searchQuery = '';
  @Input() sortField = 'created_at';
  @Input() sortOrder: 'ASC' | 'DESC' = 'DESC';
  @Input() showViewAll = false;
  @Input() viewAll = false;

  @Output() filterChanged = new EventEmitter<{
    search: string;
    sortField: string;
    sortOrder: 'ASC' | 'DESC';
    viewAll: boolean;
  }>();

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value || '';
    this.emitChange();
  }

  onSortChange(event: any) {
    this.sortField = event.detail.value;
    this.emitChange();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.emitChange();
  }

  onViewAllChange(event: any) {
    this.viewAll = event.detail.checked;
    this.emitChange();
  }

  private emitChange() {
    this.filterChanged.emit({
      search: this.searchQuery,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      viewAll: this.viewAll
    });
  }
}
