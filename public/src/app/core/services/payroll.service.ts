import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface PayrollRun {
  id: number;
  payroll_month: string;
  payroll_year: number;
  status: 'draft' | 'finalized' | 'paid';
  total_employees: number;
  total_gross: number;
  total_deductions: number;
  total_net: number;
  generated_by: number;
  generated_at: string;
  finalized_at: string | null;
  paid_at: string | null;
}

export interface PayrollSlip {
  id: number;
  payroll_run_id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  month: string;
  year: number;
  basic_salary: number;
  hra: number;
  special_allowance: number;
  other_earnings: number;
  gross_salary: number;
  pf_deduction: number;
  tds: number;
  other_deductions: number;
  total_deductions: number;
  net_salary: number;
  working_days: number;
  present_days: number;
  leave_days: number;
  status: string;
}

export interface SalaryStructure {
  id: number;
  employee_id: number;
  basic_salary: number;
  hra: number;
  special_allowance: number;
  pf_contribution: number;
  effective_from: string;
  effective_to: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl = `${environment.apiUrl}/payroll`;

  constructor(private http: HttpClient) {}

  // Generate Payroll
  generatePayroll(month: number, year: number): Observable<{ success: boolean; message: string; payrollRun?: PayrollRun }> {
    return this.http.post<{ success: boolean; message: string; payrollRun?: PayrollRun }>(
      `${this.apiUrl}/generate`,
      { month, year }
    );
  }

  // Get Payroll Runs
  getPayrollRuns(month?: number, year?: number, status?: string): Observable<{ success: boolean; payrollRuns: PayrollRun[] }> {
    let params: any = {};
    if (month) params.month = month.toString();
    if (year) params.year = year.toString();
    if (status) params.status = status;

    return this.http.get<{ success: boolean; payrollRuns: PayrollRun[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get Payroll Run Details
  getPayrollRunDetails(runId: number): Observable<{ success: boolean; payrollRun: PayrollRun; slips: PayrollSlip[] }> {
    return this.http.get<{ success: boolean; payrollRun: PayrollRun; slips: PayrollSlip[] }>(
      `${this.apiUrl}/${runId}`
    );
  }

  // Get My Payslips
  getMyPayslips(): Observable<{ success: boolean; payslips: PayrollSlip[] }> {
    return this.http.get<{ success: boolean; payslips: PayrollSlip[] }>(
      `${this.apiUrl}/my-payslips`
    );
  }

  // Get Salary Structure
  getSalaryStructure(employeeId?: number): Observable<{ success: boolean; salaryStructure: SalaryStructure }> {
    const url = employeeId 
      ? `${this.apiUrl}/salary-structure/${employeeId}`
      : `${this.apiUrl}/my-salary-structure`;
    
    return this.http.get<{ success: boolean; salaryStructure: SalaryStructure }>(url);
  }

  // Update Salary Structure (Admin)
  updateSalaryStructure(employeeId: number, structure: Partial<SalaryStructure>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/salary-structure/${employeeId}`,
      structure
    );
  }

  // Finalize Payroll (Admin)
  finalizePayroll(runId: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${runId}/finalize`,
      {}
    );
  }

  // Mark as Paid (Admin)
  markAsPaid(runId: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${runId}/mark-paid`,
      {}
    );
  }
}
