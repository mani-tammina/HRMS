import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Project {
  id: number;
  project_code: string;
  project_name: string;
  client_name: string;
  project_manager_id: number | null;
  manager_name?: string;
  start_date: string;
  end_date: string | null;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  description: string | null;
  total_employees?: number;
  created_at?: string;
}

export interface ProjectShift {
  id: number;
  project_id: number;
  shift_type: 'day' | 'night' | 'rotational' | 'flexible';
  shift_name: string;
  start_time: string;
  end_time: string;
  timezone: string;
  is_active: boolean;
}

export interface ProjectAssignment {
  id: number;
  project_id: number;
  employee_id: number;
  employee_code?: string;
  employee_name?: string;
  FirstName?:string;
  LastName?:string;
  role_in_project: string;
  allocation_percentage: number;
  shift_id: number | null;
  shift_name?: string;
  assignment_start_date: string;
  assignment_end_date: string | null;
  status: 'active' | 'completed' | 'on_hold';
}

export interface ProjectDetails extends Project {
  shifts: ProjectShift[];
  assignments: ProjectAssignment[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  // Get All Projects
  getProjects(status?: string, managerId?: number): Observable<{ success: boolean; projects: Project[] }> {
    let params: any = {};
    if (status) params.status = status;
    if (managerId) params.manager_id = managerId.toString();

    return this.http.get<{ success: boolean; projects: Project[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get Project by ID with Details
  getProjectById(id: number): Observable<{ success: boolean; project: ProjectDetails }> {
    return this.http.get<{ success: boolean; project: ProjectDetails }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Create New Project
  createProject(project: {
    project_code: string;
    project_name: string;
    client_name: string;
    project_manager_id?: number;
    start_date: string;
    end_date?: string;
    status?: string;
    description?: string;
  }): Observable<{ success: boolean; message: string; project?: Project }> {
    return this.http.post<{ success: boolean; message: string; project?: Project }>(
      this.apiUrl,
      project
    );
  }

  // Update Project
  updateProject(id: number, project: Partial<Project>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`,
      project
    );
  }

  // Delete Project
  deleteProject(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Get Project Assignments
  getProjectAssignments(projectId: number): Observable<{ success: boolean; assignments: ProjectAssignment[] }> {
    return this.http.get<{ success: boolean; assignments: ProjectAssignment[] }>(
      `${this.apiUrl}/${projectId}/assignments`
    );
  }

  // Assign Employee to Project
  assignEmployee(assignment: {
    project_id: number;
    employee_id: number;
    role_in_project: string;
    allocation_percentage: number;
    shift_id?: number;
    assignment_start_date: string;
    assignment_end_date?: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${assignment.project_id}/assignments`,
      assignment
    );
  }

  // Update Assignment
  updateAssignment(assignmentId: number, assignment: Partial<ProjectAssignment>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/assignments/${assignmentId}`,
      assignment
    );
  }

  // Remove Assignment
  removeAssignment(assignmentId: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/assignments/${assignmentId}`
    );
  }

  // Get Project Shifts
  getProjectShifts(projectId: number): Observable<{ success: boolean; shifts: ProjectShift[] }> {
    return this.http.get<{ success: boolean; shifts: ProjectShift[] }>(
      `${this.apiUrl}/${projectId}/shifts`
    );
  }

  // Add Shift to Project
  addShift(projectId: number, shift: {
    shift_type: string;
    shift_name: string;
    start_time: string;
    end_time: string;
    timezone: string;
  }): Observable<{ success: boolean; message: string; shift?: ProjectShift }> {
    return this.http.post<{ success: boolean; message: string; shift?: ProjectShift }>(
      `${this.apiUrl}/${projectId}/shifts`,
      shift
    );
  }

  // Update Shift
  updateShift(shiftId: number, shift: Partial<ProjectShift>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/shifts/${shiftId}`,
      shift
    );
  }

  // Delete Shift
  deleteShift(shiftId: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/shifts/${shiftId}`
    );
  }

  // Assign Manager to Project
  assignManager(projectId: number, managerId: number): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${projectId}/assign-manager`,
      { manager_id: managerId }
    );
  }

  // Get My Projects (as employee)
  getMyProjects(): Observable<{ success: boolean; projects: Project[] }> {
    return this.http.get<{ success: boolean; projects: Project[] }>(
      `${this.apiUrl}/my-projects`
    );
  }

  // Get Projects I Manage
  getManagedProjects(): Observable<{ success: boolean; projects: Project[] }> {
    return this.http.get<{ success: boolean; projects: Project[] }>(
      `${this.apiUrl}/managed-projects`
    );
  }
}
