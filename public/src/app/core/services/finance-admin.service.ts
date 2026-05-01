import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface EmployeeInfo {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  joinDate: string;
  status: string;
  profile_image?: string;
}

export interface DashboardStats {
  totalWorkingEmployees: number;
  activePayrollStructures: number;
  pendingPayrolls: number;
  totalPayrollValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceAdminService {
  private env = environment;
  private baseUrl = `http://${this.env.apiURL}/api`;

  private workingEmployeesSubject = new BehaviorSubject<EmployeeInfo[]>([]);
  public workingEmployees$ = this.workingEmployeesSubject.asObservable();

  private dashboardStatsSubject = new BehaviorSubject<DashboardStats | null>(null);
  public dashboardStats$ = this.dashboardStatsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Get all working employees
   * @param page Page number (1-indexed)
   * @param pageSize Number of records per page
   * @param search Search term for name/email
   */
  getWorkingEmployees(page: number = 1, pageSize: number = 20, search: string = ''): Observable<any> {
    const url = `${this.baseUrl}/employees`;
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString())
      .set('status', 'Working');

    if (search?.trim()) {
      params = params.set('q', search.trim());
    }

    return this.http.get<any>(url, { params, headers: this.getHeaders() }).pipe(
      map(res => {
        const rawList = res.data || res || [];
        const normalized = rawList.map((emp: any) => ({
          id: emp.id || emp.EmployeeId,
          name: emp.name || `${emp.FirstName || ''} ${emp.LastName || ''}`.trim() || 'Unknown',
          email: emp.email || emp.Email || '',
          department: emp.department || emp.DepartmentName || emp.Department || 'General',
          designation: emp.designation || emp.DesignationName || emp.Designation || 'Staff',
          salary: Number(emp.salary || emp.BaseSalary || 0),
          joinDate: emp.joinDate || emp.DateJoined || '',
          status: emp.status || emp.EmploymentStatus || 'Working',
          profile_image: emp.profile_image || emp.ProfileImage || ''
        }));
        return { ...res, data: normalized };
      })
    );
  }

  /**
   * Search employees with specific query API
   */
  searchEmployees(query: string, page: number = 1, limit: number = 10006): Observable<any> {
    const url = `${this.baseUrl}/employees/search/query`;
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(url, { params, headers: this.getHeaders() }).pipe(
      map(res => {
        const rawList = res.data || res || [];
        const normalized = rawList.map((emp: any) => ({
          id: emp.id || emp.EmployeeId,
          name: emp.name || `${emp.FirstName || ''} ${emp.LastName || ''}`.trim() || 'Unknown',
          email: emp.email || emp.Email || '',
          department: emp.department || emp.DepartmentName || emp.Department || 'General',
          designation: emp.designation || emp.DesignationName || emp.Designation || 'Staff',
          salary: Number(emp.salary || emp.BaseSalary || 0),
          joinDate: emp.joinDate || emp.DateJoined || '',
          status: emp.status || emp.EmploymentStatus || 'Working',
          profile_image: emp.profile_image || emp.ProfileImage || ''
        }));
        return { ...res, data: normalized };
      })
    );
  }

  /**
   * Get count of working employees
   */
  getWorkingEmployeesCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/count?status=Working`, { headers: this.getHeaders() });
  }

  /**
   * Get dashboard summary for finance admin
   */
  getDashboardSummary(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/finance-admin/dashboard`, { headers: this.getHeaders() });
  }

  /**
   * Get employee payroll details
   * @param employeeId Employee ID
   */
  getEmployeePayrollDetails(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/payroll/employee/${employeeId}`, { headers: this.getHeaders() });
  }

  /**
   * Restore default payroll setup
   */
  restoreDefaults(): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/setup/defaults`;
    return this.http.post<any>(url, {}, { headers: this.getHeaders() });
  }

  /**
   * Clear payroll setup
   */
  clearSetup(): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/setup/clear`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  /**
   * Update working employees in memory
   */
  updateWorkingEmployees(employees: EmployeeInfo[]): void {
    this.workingEmployeesSubject.next(employees);
  }

  /**
   * Update dashboard stats in memory
   */
  updateDashboardStats(stats: DashboardStats): void {
    this.dashboardStatsSubject.next(stats);
  }

  // ─────────────────────────────────────────────
  // Section: Payroll Contract Management
  // ─────────────────────────────────────────────

  /**
   * List contracts for an employee
   */
  getEmployeeContracts(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/contracts`;
    const params = new HttpParams().set('employee_id', employeeId.toString());
    return this.http.get<any>(url, { params, headers: this.getHeaders() });
  }

  /**
   * Get specific contract by ID
   */
  getContractById(contractId: number): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/contracts/${contractId}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  /**
   * Create new contract
   */
  createContract(payload: any): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/contracts`;
    return this.http.post<any>(url, payload, { headers: this.getHeaders() });
  }

  /**
   * Update existing contract (PUT)
   */
  updateContract(contractId: number, payload: any): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/contracts/${contractId}`;
    return this.http.put<any>(url, payload, { headers: this.getHeaders() });
  }

  terminateContract(contractId: number, payload: any): Observable<any> {
    const url = `${this.baseUrl}/payroll-master/contracts/${contractId}`;
    return this.http.delete<any>(url, { body: payload, headers: this.getHeaders() });
  }

  /**
   * Bulk upload contracts from Excel
   */
  uploadBulkContracts(file: File, templateId: number): Observable<any> {
    const url = `${this.baseUrl}/upload/payroll-contracts`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('template_id', templateId.toString());

    return this.http.post<any>(url, formData, { headers: this.getHeaders() });
  }
}
