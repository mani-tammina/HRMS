import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Candidate {
  id: number;
  candidate_name: string;
  email: string;
  phone: string;
  position_applied: string;
  department: string;
  expected_joining_date: string;
  recruiter_name: string;
  current_status: string;
  offer_status: string | null;
  offer_sent_at: string | null;
  offer_accepted_at: string | null;
  converted_to_employee_id: number | null;
  created_at: string;
}

export interface OfferDetails {
  id: number;
  candidate_id: number;
  designation: string;
  department: string;
  location: string;
  joining_date: string;
  ctc: number;
  basic_salary: number;
  hra: number;
  special_allowance: number;
  other_allowances: number;
  bond_required: boolean;
  bond_duration_months: number | null;
  bond_amount: number | null;
  notice_period_days: number;
  probation_period_months: number;
  offer_valid_till: string;
  additional_terms: string | null;
  status: string;
}

export interface PreonboardingTask {
  id: number;
  task_name: string;
  task_type: string;
  description: string;
  is_mandatory: boolean;
  sequence_order: number;
  expected_days: number;
}

export interface CandidateTaskProgress {
  id: number;
  candidate_id: number;
  task_id: number;
  task_name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'verified';
  submission_data: any;
  submitted_at: string | null;
  verified_by: number | null;
  verified_at: string | null;
  verification_notes: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private apiUrl = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) {}

  // Get All Candidates (HR/Admin)
  getAllCandidates(status?: string, department?: string): 
    Observable<{ success: boolean; candidates: Candidate[] }> {
    let params: any = {};
    if (status) params.status = status;
    if (department) params.department = department;

    return this.http.get<{ success: boolean; candidates: Candidate[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get Candidate by ID
  getCandidate(id: number): Observable<{ success: boolean; candidate: Candidate }> {
    return this.http.get<{ success: boolean; candidate: Candidate }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Create Candidate
  createCandidate(candidate: {
    candidate_name: string;
    email: string;
    phone: string;
    position_applied: string;
    department: string;
    expected_joining_date: string;
    recruiter_name: string;
  }): Observable<{ success: boolean; message: string; candidate?: Candidate }> {
    return this.http.post<{ success: boolean; message: string; candidate?: Candidate }>(
      this.apiUrl,
      candidate
    );
  }

  // Update Candidate Status
  updateCandidateStatus(id: number, status: string, notes?: string): 
    Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}/status`,
      { status, notes }
    );
  }

  // Start Pre-onboarding
  startPreonboarding(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}/start-preonboarding`,
      {}
    );
  }

  // Create Offer (Step 1: Basic Details)
  createOfferStep1(candidateId: number, data: {
    designation: string;
    department: string;
    location: string;
    joining_date: string;
  }): Observable<{ success: boolean; message: string; offerId?: number }> {
    return this.http.post<{ success: boolean; message: string; offerId?: number }>(
      `${this.apiUrl}/${candidateId}/offer/step1`,
      data
    );
  }

  // Create Offer (Step 2: CTC Breakup)
  createOfferStep2(offerId: number, data: {
    ctc: number;
    basic_salary: number;
    hra: number;
    special_allowance: number;
    other_allowances: number;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/offer/${offerId}/step2`,
      data
    );
  }

  // Create Offer (Step 3: Terms & Conditions)
  createOfferStep3(offerId: number, data: {
    bond_required: boolean;
    bond_duration_months?: number;
    bond_amount?: number;
    notice_period_days: number;
    probation_period_months: number;
    offer_valid_till: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/offer/${offerId}/step3`,
      data
    );
  }

  // Create Offer (Step 4: Additional Terms)
  createOfferStep4(offerId: number, data: {
    additional_terms?: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/offer/${offerId}/step4`,
      data
    );
  }

  // Send Offer to Candidate
  sendOffer(offerId: number): Observable<{ success: boolean; message: string; offerLink?: string }> {
    return this.http.post<{ success: boolean; message: string; offerLink?: string }>(
      `${this.apiUrl}/offer/${offerId}/send`,
      {}
    );
  }

  // View Offer (Public - No Auth Required)
  viewOffer(offerId: number, token: string): Observable<{ success: boolean; offer: OfferDetails; candidate: Candidate }> {
    return this.http.get<{ success: boolean; offer: OfferDetails; candidate: Candidate }>(
      `${this.apiUrl}/offer/${offerId}/view?token=${token}`
    );
  }

  // Accept Offer (Public - No Auth Required)
  acceptOffer(offerId: number, token: string, signature?: string): 
    Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/offer/${offerId}/accept?token=${token}`,
      { signature }
    );
  }

  // Reject Offer (Public - No Auth Required)
  rejectOffer(offerId: number, token: string, reason?: string): 
    Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/offer/${offerId}/reject?token=${token}`,
      { reason }
    );
  }

  // Upload Document
  uploadDocument(candidateId: number, formData: FormData): 
    Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${candidateId}/documents/upload`,
      formData
    );
  }

  // Get Candidate Documents
  getDocuments(candidateId: number): Observable<{ success: boolean; documents: any[] }> {
    return this.http.get<{ success: boolean; documents: any[] }>(
      `${this.apiUrl}/${candidateId}/documents`
    );
  }

  // Verify Document
  verifyDocument(documentId: number, verified: boolean, notes?: string): 
    Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/documents/${documentId}/verify`,
      { verified, notes }
    );
  }

  // Update BGV Status
  updateBGVStatus(candidateId: number, bgvStatus: string, bgvNotes?: string): 
    Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${candidateId}/bgv-status`,
      { bgv_status: bgvStatus, bgv_notes: bgvNotes }
    );
  }

  // Get Pre-onboarding Tasks
  getPreonboardingTasks(): Observable<{ success: boolean; tasks: PreonboardingTask[] }> {
    return this.http.get<{ success: boolean; tasks: PreonboardingTask[] }>(
      `${this.apiUrl}/preonboarding/tasks`
    );
  }

  // Get Candidate Task Progress
  getCandidateTaskProgress(candidateId: number): 
    Observable<{ success: boolean; taskProgress: CandidateTaskProgress[]; candidate: Candidate }> {
    return this.http.get<{ success: boolean; taskProgress: CandidateTaskProgress[]; candidate: Candidate }>(
      `${this.apiUrl}/${candidateId}/tasks`
    );
  }

  // Submit Task (By Candidate)
  submitTask(candidateId: number, taskId: number, submissionData: any): 
    Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${candidateId}/tasks/${taskId}/submit`,
      submissionData
    );
  }

  // Verify Task (By HR/Admin)
  verifyTask(progressId: number, verified: boolean, notes?: string): 
    Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/tasks/${progressId}/verify`,
      { status: verified ? 'verified' : 'rejected', verification_notes: notes }
    );
  }

  // Convert to Employee
  convertToEmployee(candidateId: number): Observable<{ success: boolean; message: string; employeeId?: number }> {
    return this.http.post<{ success: boolean; message: string; employeeId?: number }>(
      `${this.apiUrl}/${candidateId}/convert-to-employee`,
      {}
    );
  }

  // Create/Update Pre-onboarding Task (Admin)
  createTask(task: Partial<PreonboardingTask>): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/preonboarding/tasks`,
      task
    );
  }

  // Delete Pre-onboarding Task (Admin)
  deleteTask(taskId: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/preonboarding/tasks/${taskId}`
    );
  }
}
