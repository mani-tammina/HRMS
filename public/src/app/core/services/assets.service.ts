import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Asset {
  id: number;
  asset_name: string;
  asset_type: string;
  asset_tag: string;
  serial_number: string | null;
  manufacturer: string | null;
  model: string | null;
  purchase_date: string | null;
  warranty_expiry: string | null;
  status: 'available' | 'allocated' | 'under_maintenance' | 'retired';
  condition: 'new' | 'good' | 'fair' | 'poor' | 'damaged';
  purchase_cost: number | null;
  current_value: number | null;
  location: string | null;
  description: string | null;
}

export interface AssetAllocation {
  id: number;
  asset_id: number;
  asset_name?: string;
  asset_type?: string;
  asset_tag?: string;
  employee_id: number;
  employee_code?: string;
  employee_name?: string;
  allocated_by: number;
  allocated_by_name?: string;
  allocation_date: string;
  expected_return_date: string | null;
  actual_return_date: string | null;
  allocation_status: 'active' | 'returned' | 'lost' | 'damaged';
  return_condition: string | null;
  return_notes: string | null;
  allocation_notes: string | null;
}

export interface AssetReport {
  total_assets: number;
  available_assets: number;
  allocated_assets: number;
  maintenance_assets: number;
  by_type: Array<{
    asset_type: string;
    count: number;
  }>;
  by_status: Array<{
    status: string;
    count: number;
  }>;
  recent_allocations: AssetAllocation[];
  overdue_returns: AssetAllocation[];
}

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private apiUrl = `${environment.apiUrl}/assets`;

  constructor(private http: HttpClient) {}

  // Get All Assets
  getAssets(status?: string, type?: string): Observable<{ success: boolean; assets: Asset[] }> {
    let params: any = {};
    if (status) params.status = status;
    if (type) params.type = type;

    return this.http.get<{ success: boolean; assets: Asset[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get Asset by ID
  getAssetById(id: number): Observable<{ success: boolean; asset: Asset }> {
    return this.http.get<{ success: boolean; asset: Asset }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Create Asset
  createAsset(asset: {
    asset_name: string;
    asset_type: string;
    asset_tag: string;
    serial_number?: string;
    purchase_date?: string;
    warranty_expiry?: string;
    condition?: string;
    purchase_cost?: number;
    location?: string;
    description?: string;
  }): Observable<{ success: boolean; message: string; asset?: Asset }> {
    return this.http.post<{ success: boolean; message: string; asset?: Asset }>(
      this.apiUrl,
      asset
    );
  }

  // Update Asset
  updateAsset(id: number, asset: Partial<Asset>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`,
      asset
    );
  }

  // Delete Asset
  deleteAsset(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Allocate Asset to Employee
  allocateAsset(allocation: {
    asset_id: number;
    employee_id: number;
    allocation_date: string;
    expected_return_date?: string;
    allocation_notes?: string;
  }): Observable<{ success: boolean; message: string; allocation?: AssetAllocation }> {
    return this.http.post<{ success: boolean; message: string; allocation?: AssetAllocation }>(
      `${this.apiUrl}/allocate`,
      allocation
    );
  }

  // Return Asset
  returnAsset(allocationId: number, data: {
    return_condition: string;
    return_notes?: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${allocationId}/return`,
      data
    );
  }

  // Get Employee's Assets
  getEmployeeAssets(employeeId: number): Observable<{ success: boolean; allocations: AssetAllocation[] }> {
    return this.http.get<{ success: boolean; allocations: AssetAllocation[] }>(
      `${this.apiUrl}/employee/${employeeId}`
    );
  }

  // Get My Assets (Current User)
  getMyAssets(): Observable<{ success: boolean; allocations: AssetAllocation[] }> {
    return this.http.get<{ success: boolean; allocations: AssetAllocation[] }>(
      `${this.apiUrl}/my-assets`
    );
  }

  // Get All Allocations
  getAllocations(status?: string, employeeId?: number): Observable<{ success: boolean; allocations: AssetAllocation[] }> {
    let params: any = {};
    if (status) params.status = status;
    if (employeeId) params.employee_id = employeeId.toString();

    return this.http.get<{ success: boolean; allocations: AssetAllocation[] }>(
      `${this.apiUrl}/allocations`,
      { params }
    );
  }

  // Get Asset Reports
  getAssetReports(): Observable<{ success: boolean; report: AssetReport }> {
    return this.http.get<{ success: boolean; report: AssetReport }>(
      `${this.apiUrl}/reports`
    );
  }

  // Get Asset History
  getAssetHistory(assetId: number): Observable<{ success: boolean; history: AssetAllocation[] }> {
    return this.http.get<{ success: boolean; history: AssetAllocation[] }>(
      `${this.apiUrl}/${assetId}/history`
    );
  }

  // Update Allocation Status
  updateAllocationStatus(allocationId: number, status: string, notes?: string): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/allocations/${allocationId}`,
      { allocation_status: status, notes }
    );
  }
}
