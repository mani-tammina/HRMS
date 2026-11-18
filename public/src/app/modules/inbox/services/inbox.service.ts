import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InboxNotification } from '../models/notification.model';

export interface AgentCompletion {
  toolCalls?: Array<{
    name?: string;
    ok?: boolean;
    error?: string;
  }>;
}

export interface ChatHistoryMessageDto {
  id: string;
  sessionId?: string;
  sender: 'user' | 'bot';
  text: string;
  openuiResponse?: string;
  timestamp: string;
}

export interface ChatHistorySessionDto {
  id: string;
  title: string;
  isCustomTitle?: boolean;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
  messages?: ChatHistoryMessageDto[];
}

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  private env = environment;
  private readonly BASE_URL = `${this.env.apiURL}/api/inbox`;
  private readonly AI_AGENT_URL = `${this.env.apiURL}/api/update-me-integration/agent`;
  private readonly AI_CHAT_HISTORY_URL = `${this.env.apiURL}/api/update-me-integration/chat-history`;

  public refreshCount$ = new Subject<void>();

  notifyCountChanged() {
    this.refreshCount$.next();
  }

  constructor(private http: HttpClient) {}

  private getAuthToken(): string {
    return (
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('accessToken') ||
      ''
    );
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getNotifications(params: {
    page: number;
    limit: number;
    search?: string;
    tab?: string;
    month?: string;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    viewAll?: boolean;
    skipStats?: boolean;
  }): Observable<{ success: boolean; data: InboxNotification[]; total: number; unreadCount: number; stats?: any }> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('limit', params.limit.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.tab) {
      httpParams = httpParams.set('tab', params.tab);
    }
    if (params.month) {
      httpParams = httpParams.set('month', params.month);
    }
    if (params.sortField) {
      httpParams = httpParams.set('sortField', params.sortField);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }
    if (params.viewAll !== undefined) {
      httpParams = httpParams.set('viewAll', params.viewAll ? 'true' : 'false');
    }
    if (params.skipStats !== undefined) {
      httpParams = httpParams.set('skipStats', params.skipStats ? 'true' : 'false');
    }

    return this.http.get<{ success: boolean; data: InboxNotification[]; total: number; unreadCount: number; stats?: any }>(
      `${this.BASE_URL}`,
      { headers: this.getHeaders(), params: httpParams }
    );
  }

  getTeammatesOnLeave(employeeId: number, startDate: string, endDate?: string): Observable<{ success: boolean; count: number; teammates: any[] }> {
    let httpParams = new HttpParams()
      .set('employeeId', employeeId.toString())
      .set('startDate', startDate);
    if (endDate) {
      httpParams = httpParams.set('endDate', endDate);
    }
    return this.http.get<{ success: boolean; count: number; teammates: any[] }>(
      this.BASE_URL + '/teammates-on-leave',
      { headers: this.getHeaders(), params: httpParams }
    );
  }

  getNotificationById(id: number): Observable<{ success: boolean; data: InboxNotification }> {
    return this.http.get<{ success: boolean; data: InboxNotification }>(
      `${this.BASE_URL}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.BASE_URL}/read-all`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/read/${id}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  archiveNotification(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/archive/${id}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  actionAttendanceRegularization(payload: {
    notification_id: number;
    action: 'Approve' | 'Reject';
    remarks?: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/attendance/action`, payload, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  uploadMonthlyAttendance(formData: FormData): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.env.apiURL}/api/upload/monthly-attendance`, formData, { headers });
  }

  exportMonthlyAttendance(params: { startDate: string; endDate: string; month?: number; year?: number }): Observable<Blob> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    let httpParams = new HttpParams()
      .set('startDate', params.startDate)
      .set('endDate', params.endDate);
    if (params.month !== undefined && params.month !== null) {
      httpParams = httpParams.set('month', params.month.toString());
    }
    if (params.year !== undefined && params.year !== null) {
      httpParams = httpParams.set('year', params.year.toString());
    }
    return this.http.get(`${this.env.apiURL}/api/upload/monthly-attendance/export`, {
      headers,
      params: httpParams,
      responseType: 'blob'
    });
  }

  uploadYearlyLeaveBalances(formData: FormData): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.env.apiURL}/api/yearly-leave-balances/import`, formData, { headers });
  }

  exportYearlyLeaveBalances(): Observable<Blob> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.env.apiURL}/api/yearly-leave-balances/export/excel`, {
      headers,
      responseType: 'blob'
    });
  }

  exportTimesheets(params: { startDate: string; endDate: string; employeeId?: number }): Observable<Blob> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    let httpParams = new HttpParams()
      .set('startDate', params.startDate)
      .set('endDate', params.endDate);
    if (params.employeeId) {
      httpParams = httpParams.set('employeeId', params.employeeId.toString());
    }
    return this.http.get(`${this.BASE_URL}/timesheets/export`, {
      headers,
      params: httpParams,
      responseType: 'blob'
    });
  }

  getChatSessions(
    includeMessages = false
  ): Observable<{ success: boolean; data: ChatHistorySessionDto[] }> {
    let httpParams = new HttpParams();
    if (includeMessages) {
      httpParams = httpParams.set('includeMessages', 'true');
    }
    return this.http.get<{ success: boolean; data: ChatHistorySessionDto[] }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions`,
      { headers: this.getHeaders(), params: httpParams }
    );
  }

  getChatSession(
    sessionId: string
  ): Observable<{ success: boolean; data: ChatHistorySessionDto }> {
    return this.http.get<{ success: boolean; data: ChatHistorySessionDto }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions/${encodeURIComponent(sessionId)}`,
      { headers: this.getHeaders() }
    );
  }

  createChatSession(payload: {
    title?: string;
    isCustomTitle?: boolean;
    messages?: Array<{ sender: 'user' | 'bot'; text: string; openuiResponse?: string }>;
  }): Observable<{ success: boolean; data: ChatHistorySessionDto }> {
    return this.http.post<{ success: boolean; data: ChatHistorySessionDto }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updateChatSession(
    sessionId: string,
    payload: { title: string; isCustomTitle?: boolean }
  ): Observable<{ success: boolean; data: ChatHistorySessionDto }> {
    return this.http.put<{ success: boolean; data: ChatHistorySessionDto }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions/${encodeURIComponent(sessionId)}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  deleteChatSession(
    sessionId: string
  ): Observable<{ success: boolean; data: { id: string } }> {
    return this.http.delete<{ success: boolean; data: { id: string } }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions/${encodeURIComponent(sessionId)}`,
      { headers: this.getHeaders() }
    );
  }

  deleteAllChatSessions(): Observable<{ success: boolean; data: { deletedCount: number } }> {
    return this.http.delete<{ success: boolean; data: { deletedCount: number } }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions`,
      { headers: this.getHeaders() }
    );
  }

  addChatMessages(
    sessionId: string,
    payload: {
      messages: Array<{ sender: 'user' | 'bot'; text: string; openuiResponse?: string }>;
      title?: string;
      isCustomTitle?: boolean;
    }
  ): Observable<{
    success: boolean;
    data: { session: ChatHistorySessionDto; messages: ChatHistoryMessageDto[] };
  }> {
    return this.http.post<{
      success: boolean;
      data: { session: ChatHistorySessionDto; messages: ChatHistoryMessageDto[] };
    }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions/${encodeURIComponent(sessionId)}/messages`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updateChatMessage(
    sessionId: string,
    messageId: string,
    payload: { text?: string; openuiResponse?: string | null }
  ): Observable<{ success: boolean; data: ChatHistoryMessageDto }> {
    return this.http.put<{ success: boolean; data: ChatHistoryMessageDto }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  deleteChatMessage(
    sessionId: string,
    messageId: string
  ): Observable<{ success: boolean; data: { id: string; sessionId: string } }> {
    return this.http.delete<{ success: boolean; data: { id: string; sessionId: string } }>(
      `${this.AI_CHAT_HISTORY_URL}/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}`,
      { headers: this.getHeaders() }
    );
  }

  async streamAgentResponse(
    prompt: string,
    options?: {
      onChunk?: (accumulatedText: string) => void;
      onComplete?: (completion: AgentCompletion) => void;
      signal?: AbortSignal;
    }
  ): Promise<string> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(this.AI_AGENT_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt }),
      signal: options?.signal,
    });

    if (!response.ok) {
      let errorMessage = `Agent request failed (${response.status})`;
      try {
        const errorText = await response.text();
        if (errorText) {
          try {
            const parsed = JSON.parse(errorText) as Record<string, unknown>;
            const msg = parsed['message'] || parsed['error'];
            if (typeof msg === 'string' && msg.trim()) {
              errorMessage = msg.trim();
            } else {
              errorMessage = errorText.trim();
            }
          } catch {
            errorMessage = errorText.trim();
          }
        }
      } catch {
        // Keep default status error message
      }
      throw new Error(errorMessage);
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (contentType.includes('application/json')) {
      const jsonBody = (await response.json()) as unknown;
      const errorMessage = this.extractErrorFromAgentPayload(jsonBody);
      if (jsonBody && typeof jsonBody === 'object' && 'error' in jsonBody && errorMessage) {
        throw new Error(errorMessage);
      }
      options?.onComplete?.(this.extractAgentCompletion(jsonBody));
      const extracted = this.extractTextFromAgentPayload(jsonBody);
      if (extracted) {
        options?.onChunk?.(extracted);
      }
      return extracted;
    }

    if (!response.body) {
      const fallbackText = await response.text();
      if (fallbackText) {
        options?.onChunk?.(fallbackText);
      }
      return fallbackText;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let buffer = '';
    let accumulated = '';
    let currentEvent = '';
    let currentDataLines: string[] = [];
    let sawSseField = false;

    const ignoredTypes = new Set([
      'open',
      'ping',
      'heartbeat',
      'keepalive',
      'status',
      'progress',
      'thinking',
      'thought',
      'tool',
      'tool_call',
      'tool_start',
      'tool_result',
      'tool_end',
      'step',
      'node',
      'metadata',
      'start',
      'init',
      'session',
      'message_start',
      'content_block_start',
      'content_block_stop',
      'message_stop',
      'response.created',
      'response.in_progress',
      'response.output_item.added',
      'response.content_part.added',
    ]);

    const finalTypes = new Set([
      'done',
      'complete',
      'completed',
      'final',
      'result',
      'end',
      'finish',
      'response.output_text.done',
      'response.completed',
    ]);

    const applyExtractedText = (text: string, isFinal: boolean, isRawText = false): void => {
      if (!text) return;
      if (isFinal) {
        accumulated = text;
      } else {
        if (
          isRawText &&
          accumulated.length > 0 &&
          !accumulated.endsWith('\n') &&
          /^[a-zA-Z_$][\w$]*\s*=/.test(text)
        ) {
          accumulated += `\n${text}`;
        } else {
          accumulated += text;
        }
      }
      options?.onChunk?.(accumulated);
    };

    const handleEventPayload = (eventName: string, rawPayload: string): void => {
      const payload = rawPayload.trim();
      if (!payload || payload === '[DONE]') {
        return;
      }

      const eventLower = eventName.trim().toLowerCase();
      if (eventLower && ignoredTypes.has(eventLower)) {
        return;
      }

      let parsed: unknown;
      let isJson = false;
      try {
        parsed = JSON.parse(payload);
        isJson = true;
      } catch {
        isJson = false;
      }

      if (eventLower === 'error') {
        if (
          isJson &&
          parsed &&
          typeof parsed === 'object' &&
          !Array.isArray(parsed) &&
          (parsed as Record<string, unknown>)['fatal'] === false
        ) {
          // Non-fatal tool/agent error: let the stream continue so the agent can recover and emit tokens
          return;
        }
        const errMsg = isJson
          ? this.extractErrorFromAgentPayload(parsed) || payload
          : payload;
        throw new Error(errMsg);
      }

      if (isJson) {
        if (typeof parsed === 'string') {
          applyExtractedText(parsed, finalTypes.has(eventLower), true);
          return;
        }

        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          const obj = parsed as Record<string, unknown>;
          const typeValue = String(obj['type'] || obj['event'] || '').trim().toLowerCase();

          if (typeValue === 'error' || obj['error']) {
            if (obj['fatal'] === false) {
              return;
            }
            const errMsg = this.extractErrorFromAgentPayload(obj);
            if (errMsg) {
              throw new Error(errMsg);
            }
          }

          if (typeValue && ignoredTypes.has(typeValue)) {
            return;
          }

          const isFinal =
            finalTypes.has(eventLower) ||
            finalTypes.has(typeValue) ||
            obj['done'] === true ||
            obj['final'] === true ||
            obj['isFinal'] === true;

          if (isFinal) {
            options?.onComplete?.(this.extractAgentCompletion(obj));
          }
          const extracted = this.extractTextFromAgentPayload(obj);
          // A final fullText is authoritative, including an explicitly empty reply.
          if (isFinal && typeof obj['fullText'] === 'string' && !obj['fullText']) {
            accumulated = '';
          } else if (extracted) {
            applyExtractedText(extracted, isFinal, false);
          }
          return;
        }
      }

      applyExtractedText(rawPayload, finalTypes.has(eventLower), true);
    };

    const flushSseEvent = (): void => {
      if (currentDataLines.length === 0) {
        currentEvent = '';
        return;
      }
      const payload = currentDataLines.join('\n');
      const eventName = currentEvent;
      currentEvent = '';
      currentDataLines = [];
      handleEventPayload(eventName, payload);
    };

    const processLine = (rawLine: string): void => {
      const line = rawLine.replace(/\r$/, '');

      if (line === '') {
        if (sawSseField) {
          flushSseEvent();
        } else if (accumulated.length > 0 && !accumulated.endsWith('\n')) {
          accumulated += '\n';
        }
        return;
      }

      if (line.startsWith(':')) {
        sawSseField = true;
        return;
      }

      if (line.startsWith('event:')) {
        sawSseField = true;
        currentEvent = line.slice(6).trim();
        return;
      }

      if (line.startsWith('data:')) {
        sawSseField = true;
        currentDataLines.push(line.slice(5).replace(/^ /, ''));
        return;
      }

      if (line.startsWith('id:') || line.startsWith('retry:')) {
        sawSseField = true;
        return;
      }

      if (!sawSseField) {
        handleEventPayload('', line);
      } else if (currentDataLines.length > 0) {
        currentDataLines.push(line);
      }
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          processLine(line);
        }
      }

      buffer += decoder.decode();
      if (buffer.length > 0) {
        processLine(buffer);
      }
      if (sawSseField) {
        flushSseEvent();
      }
    } finally {
      reader.releaseLock();
    }

    return accumulated;
  }

  private extractErrorFromAgentPayload(payload: unknown): string {
    if (!payload) return '';
    if (typeof payload === 'string') return payload;
    if (typeof payload === 'object' && !Array.isArray(payload)) {
      const obj = payload as Record<string, unknown>;
      if (typeof obj['error'] === 'string' && obj['error'].trim()) {
        return obj['error'].trim();
      }
      if (obj['error'] && typeof obj['error'] === 'object') {
        const nested = obj['error'] as Record<string, unknown>;
        if (typeof nested['message'] === 'string' && nested['message'].trim()) {
          return nested['message'].trim();
        }
      }
      if (typeof obj['message'] === 'string' && obj['message'].trim()) {
        return obj['message'].trim();
      }
    }
    return '';
  }

  private extractAgentCompletion(payload: unknown): AgentCompletion {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return {};
    const toolCalls = (payload as Record<string, unknown>)['toolCalls'];
    if (!Array.isArray(toolCalls)) return {};
    return {
      toolCalls: toolCalls
        .filter((call) => call && typeof call === 'object' && !Array.isArray(call))
        .map((call: Record<string, unknown>) => ({
          name: typeof call['name'] === 'string' ? call['name'] : undefined,
          ok: typeof call['ok'] === 'boolean' ? call['ok'] : undefined,
          error: typeof call['error'] === 'string' ? call['error'] : undefined,
        })),
    };
  }

  private extractTextFromAgentPayload(payload: unknown): string {
    if (!payload) return '';
    if (typeof payload === 'string') return payload;
    if (typeof payload !== 'object' || Array.isArray(payload)) return '';

    const obj = payload as Record<string, unknown>;

    // OpenAI Chat Completions format: choices[0].delta.content / message.content / text
    const choices = obj['choices'];
    if (Array.isArray(choices) && choices.length > 0 && choices[0] && typeof choices[0] === 'object') {
      const first = choices[0] as Record<string, unknown>;
      const delta = first['delta'];
      if (delta && typeof delta === 'object') {
        const deltaContent = (delta as Record<string, unknown>)['content'];
        if (typeof deltaContent === 'string') return deltaContent;
      }
      const message = first['message'];
      if (message && typeof message === 'object') {
        const msgContent = (message as Record<string, unknown>)['content'];
        if (typeof msgContent === 'string') return msgContent;
      }
      if (typeof first['text'] === 'string') return first['text'];
    }

    // OpenAI Responses API completed output
    const responseObj = obj['response'];
    if (responseObj && typeof responseObj === 'object' && !Array.isArray(responseObj)) {
      const output = (responseObj as Record<string, unknown>)['output'];
      if (Array.isArray(output)) {
        const parts: string[] = [];
        for (const item of output) {
          if (item && typeof item === 'object') {
            const content = (item as Record<string, unknown>)['content'];
            if (Array.isArray(content)) {
              for (const block of content) {
                if (block && typeof block === 'object') {
                  const blockText = (block as Record<string, unknown>)['text'];
                  if (typeof blockText === 'string') parts.push(blockText);
                }
              }
            }
          }
        }
        if (parts.length > 0) return parts.join('');
      }
    }

    // Direct or nested delta field (Anthropic / Responses API / custom SSE)
    const deltaField = obj['delta'];
    if (typeof deltaField === 'string') return deltaField;
    if (deltaField && typeof deltaField === 'object' && !Array.isArray(deltaField)) {
      const deltaObj = deltaField as Record<string, unknown>;
      if (typeof deltaObj['text'] === 'string') return deltaObj['text'];
      if (typeof deltaObj['content'] === 'string') return deltaObj['content'];
    }

    // Common streaming/final text keys
    const directKeys = [
      'fullText',
      'token',
      'chunk',
      'text',
      'content',
      'output',
      'result',
      'response',
      'answer',
    ];
    for (const key of directKeys) {
      const value = obj[key];
      if (typeof value === 'string') return value;
    }

    const messageField = obj['message'];
    if (typeof messageField === 'string') return messageField;
    if (messageField && typeof messageField === 'object' && !Array.isArray(messageField)) {
      const msgObj = messageField as Record<string, unknown>;
      if (typeof msgObj['content'] === 'string') return msgObj['content'];
      if (typeof msgObj['text'] === 'string') return msgObj['text'];
    }

    const dataField = obj['data'];
    if (typeof dataField === 'string') return dataField;
    if (dataField && typeof dataField === 'object' && !Array.isArray(dataField)) {
      return this.extractTextFromAgentPayload(dataField);
    }

    return '';
  }
}
