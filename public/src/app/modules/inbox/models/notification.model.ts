export interface InboxNotification {
  notification_id: number;
  employee_id: number;
  manager_id: number;
  request_type: string; // 'Leave Request', 'Attendance Regularization', 'Timesheet Request', 'Resignation Request'
  request_id: number;
  title: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  is_read: number; // 0 or 1
  is_archived: number; // 0 or 1
  metadata?: string;
  created_at: string;
  updated_at: string;
  action_taken_by?: number;
  action_taken_on?: string;

  // Join fields
  employee_name?: string;
  employee_number?: string;
  department_name?: string;
}
