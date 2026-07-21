import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateMeAnalyticsService } from '../../../../core/analytics/update-me.analytics';
import { EmployeeService } from '../../../../core/services/employee.service';
import { RouteGuardService } from '../../../../core/services/route-guard.service';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  htmlContent?: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-overview',
  templateUrl: './ai-overview.component.html',
  styleUrls: ['./ai-overview.component.scss'],
  standalone: false
})
export class AiOverviewComponent implements OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  @Input() employeeId?: number | string;
  @Input() hideEmployeeSelect: boolean = false;
  @Input() reportDate?: string;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  
  isManager: boolean = false;
  userRole: string | null = null;
  currentUserEmployeeId: string = '';
  selectedEmployeeId: string = '';
  selectedTarget: string = 'timesheet'; // Default synced data target

  teamMembers: any[] = [];
  prompts: Array<{ text: string; label: string }> = [];

  constructor(
    private modalCtrl: ModalController,
    private analyticsService: UpdateMeAnalyticsService,
    private employeeService: EmployeeService,
    private routeGuard: RouteGuardService
  ) { }

  ngOnInit() {
    this.initializeContext();
    this.addSystemGreeting();
    this.triggerAutoQuery();
  }

  private triggerAutoQuery() {
    if (this.reportDate) {
      const dateStr = this.reportDate.split('T')[0];
      const autoQuery = `Summarize the work logs for ${dateStr}`;
      
      // Delay slightly to allow the greeting bubble to render smoothly first
      setTimeout(() => {
        this.sendMessage(autoQuery);
      }, 400);
    }
  }

  private initializeContext() {
    // Retrieve user details from session
    this.userRole = (this.routeGuard.userRole || '').toLowerCase();
    this.currentUserEmployeeId = this.routeGuard.employeeID || '';
    
    // Apply dynamic input binding if provided
    if (this.employeeId) {
      this.selectedEmployeeId = this.employeeId.toString();
    } else {
      this.selectedEmployeeId = this.currentUserEmployeeId;
    }
    
    this.isManager = (this.userRole === 'manager' || this.userRole === 'hr' || this.userRole === 'admin');

    this.updatePrompts();

    if (this.isManager) {
      this.loadTeamMembers();
    }
  }

  private addSystemGreeting() {
    const greetingText = `Hello! I am your AI HR Assistant. I can help you analyze verified timesheets and attendance data. Ask me anything!`;
    this.messages.push({
      sender: 'ai',
      text: greetingText,
      htmlContent: greetingText,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private loadTeamMembers() {
    this.employeeService.getMyTeamList().subscribe({
      next: (res: any) => {
        this.teamMembers = res.team || (Array.isArray(res) ? res : []);
        if (!this.employeeId && this.teamMembers.length > 0) {
          this.selectedEmployeeId = this.teamMembers[0].id.toString();
        }
        this.updatePrompts();
      },
      error: (err: any) => {
        console.error('Failed to load team list for AI assistant:', err);
      }
    });
  }

  get activeEmployeeId(): string {
    return this.selectedEmployeeId || this.currentUserEmployeeId;
  }

  updatePrompts() {
    const selectedEmp = this.teamMembers.find(m => m.id === parseInt(this.selectedEmployeeId, 10));
    const name = selectedEmp ? `${selectedEmp.FirstName}` : 'this employee';
    
    if (this.selectedEmployeeId && this.selectedEmployeeId !== this.currentUserEmployeeId) {
      this.prompts = [
        { text: `Summarize ${name}'s verified timesheets`, label: 'Timesheet Summary' },
        { text: `Check for anomalies in ${name}'s working hours`, label: 'Anomalies Check' },
        { text: `What is ${name}'s average working hours?`, label: 'Average Hours' },
      ];
    } else {
      this.prompts = [
        { text: 'Summarize my verified timesheets', label: 'My Timesheet Summary' },
        { text: 'Check for anomalies in my working hours', label: 'Anomalies Check' },
        { text: 'What is my average daily working hours?', label: 'Average Hours' },
      ];
    }
  }

  onEmployeeChange(event: any) {
    const val = event.detail.value;
    if (val === undefined || val === null) return;
    
    const newId = val.toString();
    // Guard to prevent recursive updates and change-detection loops
    if (newId === this.selectedEmployeeId.toString()) {
      return;
    }
    
    this.selectedEmployeeId = newId;
    this.messages = [];
    this.addSystemGreeting();
    this.updatePrompts();
  }

  sendMessage(textToSend?: string) {
    const queryText = (textToSend || this.userInput || '').trim();
    if (!queryText || this.isLoading) return;

    // Add user query message
    this.messages.push({
      sender: 'user',
      text: queryText,
      timestamp: new Date()
    });

    if (!textToSend) {
      this.userInput = '';
    }

    this.isLoading = true;
    this.scrollToBottom();

    // Construct request payload matching GetSummaryRequest schema
    const payload = {
      metadata: {
        target: this.selectedTarget,
        identifier_name: 'employee_id',
        identifier_value: parseInt(this.activeEmployeeId, 10) || this.activeEmployeeId,
        query: queryText,
        history: this.messages.slice(0, -1).map(m => ({
          sender: m.sender,
          text: m.text
        }))
      },
      history: this.messages.slice(0, -1).map(m => ({
        sender: m.sender,
        text: m.text
      }))
    };

    this.analyticsService.getSummary(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const replyText = res?.data?.summary || res?.summary || 'No response generated by the AI agent.';
        
        this.messages.push({
          sender: 'ai',
          text: replyText,
          htmlContent: this.parseMarkdown(replyText),
          timestamp: new Date()
        });
        this.scrollToBottom();
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('AI assistant communication error:', err);
        const errorMsg = 'I could not connect to the AI agent service. Please ensure the AI backend is running on port 7860.';
        
        this.messages.push({
          sender: 'ai',
          text: errorMsg,
          htmlContent: errorMsg,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }
    });
  }

  selectPrompt(promptText: string) {
    this.sendMessage(promptText);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  private scrollToBottom() {
    // Run outside the current change-detection pass to avoid loop conditions
    setTimeout(() => {
      try {
        if (this.scrollContainer && this.scrollContainer.nativeElement) {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
      } catch (err) {
        console.warn('Auto-scroll failed:', err);
      }
    }, 100);
  }

  private parseMarkdown(text: string): string {
    if (!text) return '';
    
    // Escaping HTML characters to prevent XSS
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // 1. Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 2. Italics: *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 3. Bullet lists: lines starting with "- " or "* " -> <li>
    const lines = html.split('\n');
    let inList = false;
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.substring(2);
        if (!inList) {
          inList = true;
          return '<ul><li>' + content + '</li>';
        }
        return '<li>' + content + '</li>';
      } else {
        if (inList) {
          inList = false;
          return '</ul>' + line;
        }
        return line;
      }
    });
    
    if (inList) {
      processedLines.push('</ul>');
    }
    
    html = processedLines.join('\n');
    
    // 4. Line breaks: \n -> <br> (excluding block elements to maintain formatting)
    html = html.replace(/\n/g, '<br>');
    html = html.replace(/<\/ul><br>/g, '</ul>');
    html = html.replace(/<\/li><br>/g, '</li>');
    html = html.replace(/<ul><br>/g, '<ul>');
    
    return html;
  }
}
