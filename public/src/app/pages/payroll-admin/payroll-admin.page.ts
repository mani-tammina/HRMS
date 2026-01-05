import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonIcon, IonButton, IonButtons, IonBackButton, IonBadge, IonChip, IonAvatar, IonSelect, IonSelectOption, IonRefresher, IonRefresherContent, IonSpinner, IonInput, IonGrid, IonRow, IonCol, IonModal, IonItemDivider
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-payroll-admin',
  templateUrl: './payroll-admin.page.html',
  styleUrls: ['./payroll-admin.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonIcon, IonButton, IonButtons, IonBackButton, IonBadge, IonChip, IonAvatar, IonSelect, IonSelectOption, IonRefresher, IonRefresherContent, IonSpinner, IonInput, IonGrid, IonRow, IonCol, IonModal, IonItemDivider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PayrollAdminPage implements OnInit {
  // Salary Components
  components: any[] = [];
  componentForm: any = { code: '', name: '', description: '', type: 'earning', is_taxable: true, is_active: true };

  // Templates
  templates: any[] = [];
  templateForm: any = { template_name: '', description: '', is_active: true };

  // Structure Composition
  selectedTemplate: any = null;
  composition: any[] = [];
  compositionForm: any = { component_id: '', amount_type: 'fixed', value: 0, sort_order: 1, is_active: true };

  // Employee Contracts
  contracts: any[] = [];
  contractForm: any = { employee_id: '', template_id: '', contract_start_date: '', contract_end_date: '', is_active: true };

  // Payroll Periods
  periods: any[] = [];
  periodForm: any = { period_code: '', period_start: '', period_end: '', status: 'open' };

  // Payslips
  payslips: any[] = [];
  payslipItems: any[] = [];
  selectedPayslip: any = null;

  // UI State
  tab: string = 'components';
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.getComponents();
    this.getTemplates();
    this.getContracts();
    this.getPeriods();
    this.getPayslips();
  }

  // Salary Components CRUD
  getComponents() {
    this.http.get(environment.apiUrl + '/payroll/components').subscribe((res: any) => this.components = res);
  }
  addComponent() {
    this.http.post(environment.apiUrl + '/payroll/components', this.componentForm).subscribe(() => { this.getComponents(); this.componentForm = { code: '', name: '', description: '', type: 'earning', is_taxable: true, is_active: true }; });
  }
  updateComponent(id: number) {
    this.http.put(environment.apiUrl + '/payroll/components/' + id, this.componentForm).subscribe(() => this.getComponents());
  }
  deleteComponent(id: number) {
    this.http.delete(environment.apiUrl + '/payroll/components/' + id).subscribe(() => this.getComponents());
  }

  // Templates CRUD
  getTemplates() {
    this.http.get(environment.apiUrl + '/payroll/templates').subscribe((res: any) => this.templates = res);
  }
  addTemplate() {
    this.http.post(environment.apiUrl + '/payroll/templates', this.templateForm).subscribe(() => { this.getTemplates(); this.templateForm = { template_name: '', description: '', is_active: true }; });
  }
  updateTemplate(id: number) {
    this.http.put(environment.apiUrl + '/payroll/templates/' + id, this.templateForm).subscribe(() => this.getTemplates());
  }
  deleteTemplate(id: number) {
    this.http.delete(environment.apiUrl + '/payroll/templates/' + id).subscribe(() => this.getTemplates());
  }

  // Structure Composition CRUD
  selectTemplate(template: any) {
    this.selectedTemplate = template;
    this.getComposition(template.id);
  }
  getComposition(templateId: number) {
    this.http.get(environment.apiUrl + '/payroll/template/' + templateId + '/components').subscribe((res: any) => this.composition = res);  
  }
  addComposition(templateId: number) {
    this.http.post(environment.apiUrl + '/payroll/template/' + templateId + '/components', this.compositionForm).subscribe(() => { this.getComposition(templateId); this.compositionForm = { component_id: '', amount_type: 'fixed', value: 0, sort_order: 1, is_active: true }; });    
  }
  updateComposition(templateId: number, id: number) {
    this.http.put(environment.apiUrl + '/payroll/template/' + templateId + '/components/' + id, this.compositionForm).subscribe(() => this.getComposition(templateId));
  }
  deleteComposition(templateId: number, id: number) {
    this.http.delete(environment.apiUrl + '/payroll/template/' + templateId + '/components/' + id).subscribe(() => this.getComposition(templateId));
  }

  // Employee Contracts CRUD
  getContracts() {
    this.http.get(environment.apiUrl + '/payroll/contracts').subscribe((res: any) => this.contracts = res);
  }
  addContract() {
    this.http.post(environment.apiUrl + '/payroll/contracts', this.contractForm).subscribe(() => { this.getContracts(); this.contractForm = { employee_id: '', template_id: '', contract_start_date: '', contract_end_date: '', is_active: true }; });
  }
  updateContract(id: number) {
    this.http.put(environment.apiUrl + '/payroll/contracts/' + id, this.contractForm).subscribe(() => this.getContracts());
  }
  deleteContract(id: number) {
    this.http.delete(environment.apiUrl + '/payroll/contracts/' + id).subscribe(() => this.getContracts());
  }

  // Payroll Periods CRUD
  getPeriods() {
    this.http.get(environment.apiUrl + '/payroll/periods').subscribe((res: any) => this.periods = res);
  }
  addPeriod() {
    this.http.post(environment.apiUrl + '/payroll/periods', this.periodForm).subscribe(() => { this.getPeriods(); this.periodForm = { period_code: '', period_start: '', period_end: '', status: 'open' }; });   
  }
  updatePeriod(id: number) {
    this.http.put(environment.apiUrl + '/payroll/periods/' + id, this.periodForm).subscribe(() => this.getPeriods());
  }
  deletePeriod(id: number) {
    this.http.delete(environment.apiUrl + '/payroll/periods/' + id).subscribe(() => this.getPeriods());
  }

  // Payslips (summary and itemized)
  getPayslips() {
    this.http.get(environment.apiUrl + '/payroll/payslips').subscribe((res: any) => this.payslips = res);
  }
  viewPayslipItems(payslip: any) {
    this.selectedPayslip = payslip;
    this.http.get(environment.apiUrl + '/payroll/payslips/' + payslip.id + '/items').subscribe((res: any) => this.payslipItems = res);     
  }

  // Run Payroll
  runPayroll(periodId: number) {
    this.loading = true;
    this.http.post(environment.apiUrl + '/payroll/run', { period_id: periodId }).subscribe({
      next: () => { this.getPayslips(); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
