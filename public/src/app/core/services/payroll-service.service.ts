import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private payrollUrl = `http://${environment.apiURL}/api/payroll-master/`;

  constructor(private http: HttpClient) { }

  // 🔐 Get Authorization Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token'); // Support both common naming conventions
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ POST - Set Default Payroll
  setDefaultPayroll(): Observable<any> {
    return this.http.post(
      `${this.payrollUrl}setup/defaults`,
      {},
      { headers: this.getHeaders() }
    );
  }

  // ❌ DELETE - Clear Payroll Setup
  clearPayrollSetup(): Observable<any> {
    return this.http.delete(
      `${this.payrollUrl}setup/clear`,
      { headers: this.getHeaders() }
    );
  }

  getPayrollComponents(): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}components`,
      { headers: this.getHeaders() }
    );
  }

  createPayrollComponent(payload: any): Observable<any> {
    return this.http.post(
      `${this.payrollUrl}components`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updatePayrollComponent(id: number | string, payload: any): Observable<any> {
    // Robust URL construction
    const baseUrl = this.payrollUrl.replace(/\/$/, '');
    const url = `${baseUrl}/components/${id}`;
    return this.http.put(url, payload, { headers: this.getHeaders() });
  }

  deletePayrollComponent(id: number): Observable<any> {
    return this.http.delete(
      `${this.payrollUrl}components/${id}`,
      { headers: this.getHeaders() }
    );
  }

  getPayrollTempletes(): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}templates`,
      { headers: this.getHeaders() }
    );
  }

  // 📄 Get Single Template Details
  getTemplateById(templateId: number): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}templates/${templateId}`,
      { headers: this.getHeaders() }
    );
  }

  // 📄 Get Template Composition
  getTemplateComposition(templateId: number): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}templates/${templateId}/composition`,
      { headers: this.getHeaders() }
    );
  }

  getPayrollstructures(): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}structures`,
      { headers: this.getHeaders() }
    );
  }

  getPayrollStructureById(structureId: number): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}structures/${structureId}`,
      { headers: this.getHeaders() }
    );
  }

  createPayrollStructure(payload: any): Observable<any> {
    return this.http.post(
      `${this.payrollUrl}structures`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updatePayrollStructure(id: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.payrollUrl}structures/${id}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  deletePayrollStructure(id: number): Observable<any> {
    return this.http.delete(
      `${this.payrollUrl}structures/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // 📄 Get Single Component by ID
  getComponentById(componentId: number): Observable<any> {
    return this.http.get(
      `${this.payrollUrl}components/${componentId}`,
      { headers: this.getHeaders() }
    );
  }

  deleteTemplate(id: number): Observable<any> {
    return this.http.delete(
      `${this.payrollUrl}templates/${id}`,
      { headers: this.getHeaders() }
    );
  }

  createTemplate(payload: any): Observable<any> {
    return this.http.post(
      `${this.payrollUrl}templates`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updateTemplate(id: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.payrollUrl}templates/${id}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  addComponentToTemplate(templateId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.payrollUrl}templates/${templateId}/composition`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updateTemplateComposition(templateId: number, compositionId: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.payrollUrl}templates/${templateId}/composition/${compositionId}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  deleteTemplateComposition(templateId: number, compositionId: number): Observable<any> {
    return this.http.delete(
      `${this.payrollUrl}templates/${templateId}/composition/${compositionId}`,
      { headers: this.getHeaders() }
    );
  }

  // 📄 Structure Composition Methods (Linked to salary_components table)
  addComponentToStructure(structureId: number, payload: any): Observable<any> {
    // For structures, components are direct entries with structure_id
    const finalPayload = { ...payload, structure_id: structureId };
    return this.http.post(`${this.payrollUrl}components`, finalPayload, { headers: this.getHeaders() });
  }

  updateStructureComposition(structureId: number, componentId: number, payload: any): Observable<any> {
    // For structures, we update the component record directly
    return this.http.put(`${this.payrollUrl}components/${componentId}`, payload, { headers: this.getHeaders() });
  }

  deleteStructureComposition(structureId: number, componentId: number): Observable<any> {
    return this.http.delete(`${this.payrollUrl}components/${componentId}`, { headers: this.getHeaders() });
  }

  // 📄 Contract Management (Employee Template Mapping)
  getContracts(employeeId?: number): Observable<any> {
    const url = employeeId ? `${this.payrollUrl}contracts?employee_id=${employeeId}` : `${this.payrollUrl}contracts`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createContract(payload: {
    employee_id: number;
    template_id: number;
    annual_ctc: number;
    effective_from: string;
    effective_to?: string;
  }): Observable<any> {
    return this.http.post(`${this.payrollUrl}contracts`, payload, { headers: this.getHeaders() });
  }
}
