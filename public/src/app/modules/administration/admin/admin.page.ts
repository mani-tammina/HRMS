import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface AdminModuleItem {
  id: string;
  title: string;
  category: 'people' | 'operations' | 'governance';
  categoryLabel: string;
  description: string;
  icon: string;
  route: string;
  tags: string[];
  colorTheme: 'blue' | 'indigo' | 'purple' | 'teal' | 'amber' | 'emerald' | 'rose' | 'cyan' | 'slate' | 'orange';
  badge?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false,
})
export class AdminPage implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'all';

  categories = [
    { id: 'all', label: 'All Modules', icon: 'grid-outline' },
    { id: 'people', label: 'People & Org', icon: 'people-outline' },
    { id: 'governance', label: 'Security & Governance', icon: 'shield-checkmark-outline' },
    { id: 'operations', label: 'Operations & Policy', icon: 'options-outline' }
  ];

  modules: AdminModuleItem[] = [
    {
      id: 'employees',
      title: 'Employees Directory',
      category: 'people',
      categoryLabel: 'People & Org',
      description: 'Monitor, search, and maintain complete employee master profiles, employment records, and hierarchy.',
      icon: 'people-outline',
      route: '/administration/employees',
      tags: ['Directory', 'Profiles', 'Master Data'],
      colorTheme: 'blue',
      badge: 'Core HR'
    },
    {
      id: 'org-setup',
      title: 'Organization Master Data',
      category: 'people',
      categoryLabel: 'People & Org',
      description: 'Manage departments, designations, sub-departments, business units, and legal entities.',
      icon: 'business-outline',
      route: '/administration/org-setup',
      tags: ['Departments', 'Designations', 'Entities'],
      colorTheme: 'indigo',
      badge: 'Structure'
    },
    {
      id: 'company-branding',
      title: 'Company Branding & Offices',
      category: 'people',
      categoryLabel: 'People & Org',
      description: 'Upload corporate branding, company story, official logo, and branch office addresses.',
      icon: 'color-palette-outline',
      route: '/administration/company-branding',
      tags: ['Brand Identity', 'Office Locations', 'Story'],
      colorTheme: 'cyan',
      badge: 'Identity'
    },
    {
      id: 'roles',
      title: 'Role & Access Governance',
      category: 'governance',
      categoryLabel: 'Security & Governance',
      description: 'Configure role permissions, RBAC policies, and granular access matrices for HR, managers, and admins.',
      icon: 'shield-checkmark-outline',
      route: '/administration/roles',
      tags: ['RBAC', 'Permissions', 'Security'],
      colorTheme: 'purple',
      badge: 'Security'
    },
    {
      id: 'documents',
      title: 'Employee Documents Hub',
      category: 'governance',
      categoryLabel: 'Security & Governance',
      description: 'Centralized hub to verify, upload, and process identity proofs, payroll KYC, and Form 16s.',
      icon: 'folder-open-outline',
      route: '/administration/documents',
      tags: ['KYC', 'Form 16', 'Verification'],
      colorTheme: 'emerald',
      badge: 'Compliance'
    },
    {
      id: 'separation',
      title: 'Separation & Exit Management',
      category: 'governance',
      categoryLabel: 'Security & Governance',
      description: 'Oversee employee resignations, exit workflows, department clearances, and handover tracking.',
      icon: 'exit-outline',
      route: '/administration/separation',
      tags: ['Resignations', 'Clearance', 'Offboarding'],
      colorTheme: 'orange',
      badge: 'Lifecycle'
    },
    {
      id: 'leaves-admin',
      title: 'Leave Management & Rules',
      category: 'operations',
      categoryLabel: 'Operations & Policy',
      description: 'Configure leave types, accrual schemes, leave plan assignments, and balance initializations.',
      icon: 'calendar-outline',
      route: '/administration/leaves-admin',
      tags: ['Leave Plans', 'Accruals', 'Balances'],
      colorTheme: 'teal',
      badge: 'Policy'
    },
    {
      id: 'projects',
      title: 'Projects & Shifts Roster',
      category: 'operations',
      categoryLabel: 'Operations & Policy',
      description: 'Manage client accounts, project assignments, shift timings, and weekly roster policies.',
      icon: 'briefcase-outline',
      route: '/administration/projects',
      tags: ['Clients', 'Shift Timings', 'Rosters'],
      colorTheme: 'amber',
      badge: 'Operations'
    },
    {
      id: 'holidays',
      title: 'Holiday Calendars',
      category: 'operations',
      categoryLabel: 'Operations & Policy',
      description: 'Maintain annual holiday calendars, location-wise statutory holidays, and optional festival leaves.',
      icon: 'sparkles-outline',
      route: '/administration/holidays',
      tags: ['Statutory Holidays', 'Locations', 'Calendars'],
      colorTheme: 'rose',
      badge: 'Calendar'
    },
    {
      id: 'time-tracking',
      title: 'Time & Attendance Tracking',
      category: 'operations',
      categoryLabel: 'Operations & Policy',
      description: 'Manage attendance policies, biometric sync, punch capture rules, and shift timing thresholds.',
      icon: 'time-outline',
      route: '/administration/time-tracking',
      tags: ['Biometrics', 'Policies', 'Punches'],
      colorTheme: 'slate',
      badge: 'Attendance'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  get filteredModules(): AdminModuleItem[] {
    let list = this.modules;

    if (this.selectedCategory !== 'all') {
      list = list.filter(m => m.category === this.selectedCategory);
    }

    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q)) ||
        m.categoryLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }

  getCategoryCount(category: string): number {
    if (category === 'all') return this.modules.length;
    return this.modules.filter(m => m.category === category).length;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  clearSearch() {
    this.searchQuery = '';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Backward-compatible navigation methods if any other template/code invokes them
  emp() { this.navigateTo('/administration/employees'); }
  dep() { this.navigateTo('/administration/org-setup'); }
  adminleaves() { this.navigateTo('/administration/leaves-admin'); }
  adminsetup() { this.navigateTo('/administration/roles'); }
  projectsetup() { this.navigateTo('/administration/projects'); }
  documentsSetup() { this.navigateTo('/administration/documents'); }
  holidaySetup() { this.navigateTo('/administration/holidays'); }
  companyBrandingSetup() { this.navigateTo('/administration/company-branding'); }
}
