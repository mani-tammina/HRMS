import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step1-basic-info',
  templateUrl: './step1-basic-info.component.html',
  styleUrls: ['./step1-basic-info.component.scss'],
  standalone: false
})
export class Step1BasicInfoComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() allLocations: any[] = [];
  @Input() selectedSiteIds: number[] = [];

  ngOnInit() {}

  // ─── Site Selection ───────────────────────────────────────────────
  isSiteSelected(siteId: number): boolean {
    return this.selectedSiteIds.includes(siteId);
  }

  toggleSite(siteId: number, event: any) {
    const checked = event.target.checked;
    if (checked) {
      if (!this.selectedSiteIds.includes(siteId)) {
        this.selectedSiteIds.push(siteId);
      }
    } else {
      const idx = this.selectedSiteIds.indexOf(siteId);
      if (idx > -1) this.selectedSiteIds.splice(idx, 1);
    }
  }

  toggleAllSites(event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedSiteIds.splice(0, this.selectedSiteIds.length, ...this.allLocations.map(l => l.id));
    } else {
      this.selectedSiteIds.splice(0, this.selectedSiteIds.length);
    }
  }

  get allSitesSelected(): boolean {
    return this.allLocations.length > 0 && this.selectedSiteIds.length === this.allLocations.length;
  }

  get someSitesSelected(): boolean {
    return this.selectedSiteIds.length > 0 && this.selectedSiteIds.length < this.allLocations.length;
  }

  get selectedSiteNames(): string {
    if (this.selectedSiteIds.length === 0) return 'None selected';
    if (this.selectedSiteIds.length === this.allLocations.length) return 'All Sites';
    return this.allLocations
      .filter(l => this.selectedSiteIds.includes(l.id))
      .map(l => l.name)
      .join(', ');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  setStatus(status: string) {
    this.formGroup.get('status')?.setValue(status);
  }
}
