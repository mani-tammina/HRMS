import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  ActionEvent,
  BuiltinActionType,
  OpenUIError,
  OpenUiToolProvider,
  Renderer,
  createParser,
} from '@openuidev/angular-lang';
import { InboxNotification } from '../../models/notification.model';
import {
  getInboxOpenUiSystemPrompt,
  inboxOpenUiLibrary,
} from '../../openui/library';
import { firstValueFrom } from 'rxjs';
import {
  AgentCompletion,
  ChatHistoryMessageDto,
  ChatHistorySessionDto,
  InboxService,
} from '../../services/inbox.service';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  openuiResponse?: string;
  isStreaming?: boolean;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  dateGroup: string;
  updatedAt: Date;
  messages: ChatMessage[];
  isCustomTitle?: boolean;
  isPersisted?: boolean;
  messagesLoaded?: boolean;
  messageCount?: number;
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, Renderer],
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() isOpen = true;
  @Input() selectedNotification: InboxNotification | null = null;
  @Input() stats: any = null;
  @Input() isEmployee = false;
  @Input() isHR = false;
  @Input() isManager = false;
  @Input() rejectedCount = 0;
  @Input() userName = '';
  @Input() messages: ChatMessage[] = [];
  @Input() sessions: ChatSession[] | null = null;
  @Input() activeSessionId: string | null = null;
  @Input() isFullScreen = false;
  @Input() onMessagesChange?: (msgs: ChatMessage[]) => void;
  @Input() onSessionsChange?: (sessions: ChatSession[], activeSessionId: string) => void;
  @Input() onFullScreenChange?: (isFullScreen: boolean) => void;

  @Output() closeChat = new EventEmitter<void>();

  @ViewChild('messagesContainer') private messagesContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') private messageInput?: ElementRef<HTMLTextAreaElement>;
  @ViewChildren('renameInput') private renameInputs?: QueryList<ElementRef<HTMLInputElement>>;

  readonly openuiLibrary = inboxOpenUiLibrary;
  private readonly openuiParser = createParser(
    this.openuiLibrary.toJSONSchema(),
    this.openuiLibrary.root
  );
  readonly toolProvider: OpenUiToolProvider = {
    get_inbox_stats: async () => this.stats || {},
    get_selected_request: async () => this.selectedNotification || null,
  };

  chatSessions: ChatSession[] = [];
  currentSessionId = '';
  draftMessage = '';
  isTyping = false;
  isStreamingReply = false;
  isLoadingHistory = false;
  isLoadingMessages = false;
  showMobileSidebar = false;

  openMenuSessionId: string | null = null;
  renamingSessionId: string | null = null;
  renameDraft = '';

  private activeAbortController: AbortController | null = null;
  private focusTimer: ReturnType<typeof setTimeout> | null = null;
  private isDestroyed = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private hostElement: ElementRef<HTMLElement>,
    private inboxService: InboxService,
    @Optional() private modalCtrl?: ModalController
  ) {}

  ngOnInit(): void {
    this.initSessions();
    this.syncModalFullScreenClass();
  }

  ngAfterViewInit(): void {
    this.syncModalFullScreenClass();
    this.scrollToBottom();
    this.scheduleInputFocus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['userName'] || changes['isEmployee']) &&
      this.messages.length === 1 &&
      this.messages[0]?.id?.startsWith('bot-welcome')
    ) {
      const welcome = this.buildWelcomeMessage();
      this.messages = [welcome];
      this.updateActiveSessionMessages(this.messages);
    }
    if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
      this.scrollToBottom();
      this.scheduleInputFocus();
    }
    if (changes['isFullScreen']) {
      this.syncModalFullScreenClass();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.cancelActiveRequest();
    this.clearTimers();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.openMenuSessionId) {
      const target = event.target as HTMLElement;
      if (!target.closest('.history-menu-wrapper')) {
        this.openMenuSessionId = null;
      }
    }
  }

  get isBusy(): boolean {
    return this.isTyping || this.isStreamingReply;
  }

  get activeSessionTitle(): string {
    const active = this.chatSessions.find((s) => s.id === this.currentSessionId);
    return active?.title || 'HRMS Support Chat';
  }

  get activeSessionDateGroup(): string {
    const active = this.chatSessions.find((s) => s.id === this.currentSessionId);
    return active?.dateGroup || 'Today';
  }

  get quickSuggestions(): string[] {
    const suggestions: string[] = [];
    if (this.isEmployee) {
      suggestions.push('My request status');
    } else {
      suggestions.push('Pending summary');
    }
    if (this.selectedNotification) {
      suggestions.push('Selected request details');
    }
    suggestions.push('How to approve/reject?');
    if (!this.isEmployee) {
      suggestions.push('Export reports');
    } else {
      suggestions.push('How to resubmit?');
    }
    return suggestions;
  }

  get contextSummary(): string {
    if (!this.selectedNotification) return '';
    const emp = this.selectedNotification.employee_name || 'Employee';
    const type =
      this.selectedNotification._displayType ||
      this.selectedNotification.request_type ||
      'Request';
    const status = this.selectedNotification.status || 'Pending';
    return `${emp} • ${type} (${status})`;
  }

  get userInitials(): string {
    if (!this.userName) return 'ME';
    const parts = this.userName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return this.userName.slice(0, 2).toUpperCase();
  }

  onMinimize(): void {
    this.openMenuSessionId = null;
    this.notifyStateChanged();
    if (this.modalCtrl) {
      this.modalCtrl
        .dismiss(
          {
            messages: this.messages,
            sessions: this.chatSessions,
            activeSessionId: this.currentSessionId,
            isFullScreen: this.isFullScreen,
          },
          'minimize'
        )
        .catch(() => {});
    }
    this.closeChat.emit();
  }

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
    if (!this.isFullScreen) {
      this.showMobileSidebar = false;
      this.openMenuSessionId = null;
      this.renamingSessionId = null;
    }
    this.syncModalFullScreenClass();
    if (this.onFullScreenChange) {
      this.onFullScreenChange(this.isFullScreen);
    }
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  onClose(): void {
    this.cancelActiveRequest();
    this.clearTimers();
    this.isTyping = false;
    this.isStreamingReply = false;
    this.openMenuSessionId = null;
    this.renamingSessionId = null;
    this.draftMessage = '';
    this.messages = [];
    this.chatSessions = [];
    this.currentSessionId = '';
    this.isFullScreen = false;
    this.syncModalFullScreenClass();
    this.notifyMessagesChanged();
    if (this.onSessionsChange) {
      this.onSessionsChange([], '');
    }
    if (this.onFullScreenChange) {
      this.onFullScreenChange(false);
    }
    if (this.modalCtrl) {
      this.modalCtrl.dismiss(null, 'close').catch(() => {});
    }
    this.closeChat.emit();
  }

  handleEscapeKey(): void {
    if (this.openMenuSessionId) {
      this.openMenuSessionId = null;
      return;
    }
    if (this.renamingSessionId) {
      this.cancelRenameSession();
      return;
    }
    this.onMinimize();
  }

  toggleMobileSidebar(): void {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  createNewChat(): void {
    this.cancelActiveRequest();
    this.clearTimers();
    this.isTyping = false;
    this.isStreamingReply = false;
    this.isLoadingMessages = false;
    this.openMenuSessionId = null;
    this.renamingSessionId = null;
    this.showMobileSidebar = false;

    const existingDraft = this.chatSessions.find(
      (s) =>
        s.isPersisted === false &&
        !s.isCustomTitle &&
        s.messages.every((m) => m.id.startsWith('bot-welcome'))
    );
    if (existingDraft) {
      this.currentSessionId = existingDraft.id;
      this.messages = [...existingDraft.messages];
      this.notifyStateChanged();
      this.scrollToBottom();
      this.scheduleInputFocus();
      return;
    }

    const newSession = this.buildDraftSession();
    this.chatSessions = [newSession, ...this.chatSessions];
    this.currentSessionId = newSession.id;
    this.messages = [...newSession.messages];
    this.notifyStateChanged();
    this.scrollToBottom();
    this.scheduleInputFocus();
  }

  selectSession(session: ChatSession): void {
    if (this.renamingSessionId === session.id) {
      return;
    }
    this.cancelActiveRequest();
    this.clearTimers();
    this.isTyping = false;
    this.isStreamingReply = false;
    this.openMenuSessionId = null;
    this.showMobileSidebar = false;
    this.currentSessionId = session.id;

    if (session.isPersisted !== false && !session.messagesLoaded) {
      this.messages = [];
      this.notifyStateChanged();
      void this.loadSessionMessagesFromDb(session.id);
      return;
    }

    this.messages =
      session.messages.length > 0
        ? session.messages.map((m) => this.restoreMessage(m))
        : [this.buildWelcomeMessage()];
    this.notifyStateChanged();
    this.scrollToBottom();
    this.scheduleInputFocus();
  }

  toggleHistoryMenu(sessionId: string, event: Event): void {
    event.stopPropagation();
    this.openMenuSessionId = this.openMenuSessionId === sessionId ? null : sessionId;
  }

  startRenameSession(session: ChatSession, event: Event): void {
    event.stopPropagation();
    this.openMenuSessionId = null;
    this.renamingSessionId = session.id;
    this.renameDraft = session.title;
    this.cdr.detectChanges();

    setTimeout(() => {
      const inputEl = this.renameInputs?.first?.nativeElement;
      if (inputEl) {
        inputEl.focus();
        inputEl.select();
      }
    }, 0);
  }

  confirmRenameSession(session: ChatSession, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const trimmed = this.renameDraft.trim();
    this.renamingSessionId = null;
    this.renameDraft = '';

    if (!trimmed) {
      return;
    }

    const previousTitle = session.title;
    const previousCustom = session.isCustomTitle;
    const targetId = session.id;
    const isPersisted = session.isPersisted !== false;

    this.chatSessions = this.chatSessions.map((s) =>
      s.id === targetId ? { ...s, title: trimmed, isCustomTitle: true } : s
    );
    this.notifyStateChanged();

    void this.persistSessionRename(targetId, trimmed, isPersisted, previousTitle, previousCustom);
  }

  cancelRenameSession(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.renamingSessionId = null;
    this.renameDraft = '';
  }

  deleteSession(sessionId: string, event: Event): void {
    event.stopPropagation();
    this.openMenuSessionId = null;
    if (this.renamingSessionId === sessionId) {
      this.renamingSessionId = null;
      this.renameDraft = '';
    }

    const target = this.chatSessions.find((s) => s.id === sessionId);
    const remaining = this.chatSessions.filter((s) => s.id !== sessionId);

    if (target?.isPersisted !== false) {
      void this.persistSessionDelete(sessionId);
    }

    if (remaining.length === 0) {
      this.chatSessions = [];
      this.createNewChat();
      return;
    }

    this.chatSessions = remaining;
    if (this.currentSessionId === sessionId) {
      this.cancelActiveRequest();
      this.isTyping = false;
      this.isStreamingReply = false;
      const nextActive = remaining[0];
      this.currentSessionId = nextActive.id;
      if (nextActive.isPersisted !== false && !nextActive.messagesLoaded) {
        this.messages = [];
        this.notifyStateChanged();
        void this.loadSessionMessagesFromDb(nextActive.id);
        return;
      }
      this.messages =
        nextActive.messages.length > 0
          ? nextActive.messages.map((m) => this.restoreMessage(m))
          : [this.buildWelcomeMessage()];
    }
    this.notifyStateChanged();
    this.scrollToBottom();
  }

  sendQuickPrompt(prompt: string): void {
    if (this.isBusy) return;
    this.draftMessage = prompt;
    this.sendMessage();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!this.isBusy) {
        this.sendMessage();
      }
    }
  }

  handleOpenUiAction(event: ActionEvent): void {
    if (event.type === BuiltinActionType.ContinueConversation && event.humanFriendlyMessage) {
      this.sendQuickPrompt(event.humanFriendlyMessage);
      return;
    }
    if (
      (event.type === BuiltinActionType.OpenUrl || event.type === 'open_url') &&
      typeof event.params?.['url'] === 'string'
    ) {
      const url = event.params['url'].trim();
      if (/^https?:\/\//i.test(url)) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      return;
    }
    if (event.type === 'export_timesheet') {
      this.handleExportTimesheetAction(event.params || {});
      return;
    }
    if (event.type === 'export_attendance') {
      this.handleExportAttendanceAction(event.params || {});
      return;
    }
    if (event.type === 'export_leaves') {
      this.handleExportLeavesAction();
    }
  }

  handleOpenUiError(errors: OpenUIError[]): void {
    if (Array.isArray(errors) && errors.length > 0) {
      console.warn('[OpenUI Renderer]', errors);
    }
  }

  sendMessage(): void {
    const trimmed = this.draftMessage.trim();
    if (!trimmed || this.isBusy) return;

    if (!this.currentSessionId || !this.chatSessions.some((s) => s.id === this.currentSessionId)) {
      const draft = this.buildDraftSession();
      this.chatSessions = [draft, ...this.chatSessions];
      this.currentSessionId = draft.id;
      this.messages = [...draft.messages];
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    this.messages = [...this.messages, userMsg];
    this.updateActiveSessionMessages(this.messages, trimmed);

    this.draftMessage = '';
    this.scrollToBottom();
    void this.sendAndPersistTurn(trimmed, userMsg);
  }

  formatTime(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  trackByMessageId(_index: number, msg: ChatMessage): string {
    return msg.id;
  }

  trackBySessionId(_index: number, session: ChatSession): string {
    return session.id;
  }

  private initSessions(): void {
    if (this.sessions && this.sessions.length > 0) {
      this.chatSessions = this.sessions.map((s) => ({
        ...s,
        dateGroup: this.computeDateGroup(s.updatedAt),
        messages: s.messages.map((m) => this.restoreMessage(m)),
      }));
      const found = this.chatSessions.find((s) => s.id === this.activeSessionId);
      const target = found || this.chatSessions[0];
      this.currentSessionId = target.id;
      this.messages =
        target.messages.length > 0
          ? [...target.messages]
          : [this.buildWelcomeMessage()];
      if (target.isPersisted !== false && !target.messagesLoaded && target.messages.length === 0) {
        void this.loadSessionMessagesFromDb(target.id);
      }
      return;
    }

    const draft = this.buildDraftSession(
      this.messages && this.messages.length > 0
        ? this.messages.map((m) => this.restoreMessage(m))
        : undefined
    );
    this.chatSessions = [draft];
    this.currentSessionId = draft.id;
    this.messages = [...draft.messages];
    this.notifyStateChanged();

    void this.loadSessionsFromDb();
  }

  private buildDraftSession(initialMessages?: ChatMessage[]): ChatSession {
    const msgs =
      initialMessages && initialMessages.length > 0
        ? initialMessages
        : [this.buildWelcomeMessage()];
    return {
      id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: 'New Chat',
      dateGroup: 'Today',
      updatedAt: new Date(),
      messages: msgs,
      isCustomTitle: false,
      isPersisted: false,
      messagesLoaded: true,
    };
  }

  private async loadSessionsFromDb(): Promise<void> {
    const obs = this.inboxService?.getChatSessions?.(false);
    if (!obs) {
      return;
    }

    this.isLoadingHistory = true;
    this.cdr.detectChanges();

    try {
      const response = await firstValueFrom(obs);
      if (this.isDestroyed) {
        return;
      }

      const dtos = Array.isArray(response?.data) ? response.data : [];
      if (dtos.length === 0) {
        // Keep the fresh welcome draft session until the user sends a message
        this.isLoadingHistory = false;
        this.cdr.detectChanges();
        return;
      }

      const loadedSessions = dtos.map((dto) => this.mapDtoToSession(dto));

      // Preserve an active unsaved draft if the user already started typing/sending while loading
      const currentSession = this.chatSessions.find((s) => s.id === this.currentSessionId);
      const hasUserStartedDraft =
        currentSession &&
        currentSession.isPersisted === false &&
        currentSession.messages.some((m) => m.sender === 'user');

      if (hasUserStartedDraft && currentSession) {
        this.chatSessions = [currentSession, ...loadedSessions];
        this.notifyStateChanged();
        this.isLoadingHistory = false;
        this.cdr.detectChanges();
        return;
      }

      this.chatSessions = loadedSessions;
      const preferred = loadedSessions.find((s) => s.id === this.activeSessionId);
      const target = preferred || loadedSessions[0];
      this.currentSessionId = target.id;
      this.isLoadingHistory = false;
      this.notifyStateChanged();
      this.cdr.detectChanges();

      await this.loadSessionMessagesFromDb(target.id);
    } catch (err) {
      console.warn('[ChatWindow] Could not load chat history from DB:', err);
      if (!this.isDestroyed) {
        this.isLoadingHistory = false;
        this.cdr.detectChanges();
      }
    }
  }

  private async loadSessionMessagesFromDb(sessionId: string): Promise<void> {
    const obs = this.inboxService?.getChatSession?.(sessionId);
    if (!obs) {
      return;
    }

    this.isLoadingMessages = true;
    this.cdr.detectChanges();

    try {
      const response = await firstValueFrom(obs);
      if (this.isDestroyed) {
        return;
      }

      const dto = response?.data;
      if (!dto) {
        return;
      }

      const restoredMessages = Array.isArray(dto.messages)
        ? dto.messages.map((m) => this.restoreMessage(this.mapDtoToMessage(m)))
        : [];
      const displayMessages =
        restoredMessages.length > 0 ? restoredMessages : [this.buildWelcomeMessage()];

      this.chatSessions = this.chatSessions.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              title: dto.title || s.title,
              isCustomTitle: dto.isCustomTitle ?? s.isCustomTitle,
              updatedAt: new Date(dto.updatedAt || s.updatedAt),
              dateGroup: this.computeDateGroup(dto.updatedAt || s.updatedAt),
              messages: displayMessages,
              isPersisted: true,
              messagesLoaded: true,
              messageCount: restoredMessages.length,
            }
          : s
      );

      if (this.currentSessionId === sessionId) {
        this.messages = [...displayMessages];
        this.notifyStateChanged();
        this.scrollToBottom();
        this.scheduleInputFocus();
      }
    } catch (err) {
      console.warn('[ChatWindow] Could not load messages for session:', sessionId, err);
      if (!this.isDestroyed && this.currentSessionId === sessionId && this.messages.length === 0) {
        this.messages = [this.buildWelcomeMessage()];
      }
    } finally {
      if (!this.isDestroyed) {
        this.isLoadingMessages = false;
        this.cdr.detectChanges();
      }
    }
  }

  private async sendAndPersistTurn(userText: string, optimisticUserMsg: ChatMessage): Promise<void> {
    const startingSessionId = this.currentSessionId;
    this.isTyping = true;
    this.isStreamingReply = true;
    this.cdr.detectChanges();

    const persistedSessionId = await this.persistUserMessageToDb(
      startingSessionId,
      optimisticUserMsg
    );

    if (this.isDestroyed) {
      return;
    }

    if (this.currentSessionId !== persistedSessionId && this.currentSessionId !== startingSessionId) {
      this.isTyping = false;
      this.isStreamingReply = false;
      this.cdr.detectChanges();
      return;
    }

    await this.requestAgentOpenUiReply(userText, persistedSessionId);
  }

  private async persistUserMessageToDb(
    sessionId: string,
    optimisticUserMsg: ChatMessage
  ): Promise<string> {
    const session = this.chatSessions.find((s) => s.id === sessionId);
    if (!session) {
      return sessionId;
    }

    try {
      if (session.isPersisted === false) {
        const createObs = this.inboxService?.createChatSession?.({
          title: session.isCustomTitle ? session.title : undefined,
          isCustomTitle: Boolean(session.isCustomTitle),
          messages: [{ sender: 'user', text: optimisticUserMsg.text }],
        });
        if (!createObs) {
          return sessionId;
        }

        const res = await firstValueFrom(createObs);
        const saved = res?.data;
        if (!saved?.id || this.isDestroyed) {
          return sessionId;
        }

        const savedUserMsg = saved.messages?.[0];
        const nextMessages = this.messages.map((m) =>
          m.id === optimisticUserMsg.id && savedUserMsg
            ? {
                ...m,
                id: savedUserMsg.id,
                timestamp: new Date(savedUserMsg.timestamp),
              }
            : m
        );

        const updatedSession: ChatSession = {
          ...session,
          id: saved.id,
          title: saved.title,
          isCustomTitle: Boolean(saved.isCustomTitle),
          updatedAt: new Date(saved.updatedAt),
          dateGroup: this.computeDateGroup(saved.updatedAt),
          messages:
            this.currentSessionId === sessionId
              ? nextMessages
              : session.messages.map((m) =>
                  m.id === optimisticUserMsg.id && savedUserMsg
                    ? { ...m, id: savedUserMsg.id, timestamp: new Date(savedUserMsg.timestamp) }
                    : m
                ),
          isPersisted: true,
          messagesLoaded: true,
          messageCount: saved.messageCount ?? 1,
        };

        this.chatSessions = [
          updatedSession,
          ...this.chatSessions.filter((s) => s.id !== sessionId && s.id !== saved.id),
        ];

        if (this.currentSessionId === sessionId) {
          this.currentSessionId = saved.id;
          this.messages = nextMessages;
        }
        this.notifyStateChanged();
        this.cdr.detectChanges();
        return saved.id;
      }

      const addObs = this.inboxService?.addChatMessages?.(sessionId, {
        messages: [{ sender: 'user', text: optimisticUserMsg.text }],
      });
      if (!addObs) {
        return sessionId;
      }

      const res = await firstValueFrom(addObs);
      const savedData = res?.data;
      if (!savedData || this.isDestroyed) {
        return sessionId;
      }

      const savedUserMsg = savedData.messages?.[0];
      if (savedUserMsg) {
        this.replaceMessageId(sessionId, optimisticUserMsg.id, savedUserMsg);
      }
      if (savedData.session) {
        this.applySessionMetadataFromDto(savedData.session, true);
      }
      return sessionId;
    } catch (err) {
      console.warn('[ChatWindow] Failed to persist user message:', err);
      return sessionId;
    }
  }

  private async persistBotMessageToDb(
    sessionId: string,
    optimisticBotMsg: ChatMessage
  ): Promise<void> {
    const session = this.chatSessions.find((s) => s.id === sessionId);
    if (!session || session.isPersisted === false) {
      return;
    }

    const addObs = this.inboxService?.addChatMessages?.(sessionId, {
      messages: [
        {
          sender: 'bot',
          text: optimisticBotMsg.text,
          openuiResponse: optimisticBotMsg.openuiResponse,
        },
      ],
    });
    if (!addObs) {
      return;
    }

    try {
      const res = await firstValueFrom(addObs);
      const savedData = res?.data;
      if (!savedData || this.isDestroyed) {
        return;
      }
      const savedBotMsg = savedData.messages?.[0];
      if (savedBotMsg) {
        this.replaceMessageId(sessionId, optimisticBotMsg.id, savedBotMsg);
      }
      if (savedData.session) {
        this.applySessionMetadataFromDto(savedData.session, true);
      }
    } catch (err) {
      console.warn('[ChatWindow] Failed to persist bot message:', err);
    }
  }

  private async persistSessionRename(
    sessionId: string,
    newTitle: string,
    isPersisted: boolean,
    previousTitle: string,
    previousCustom?: boolean
  ): Promise<void> {
    try {
      if (!isPersisted) {
        const createObs = this.inboxService?.createChatSession?.({
          title: newTitle,
          isCustomTitle: true,
        });
        if (!createObs) {
          return;
        }
        const res = await firstValueFrom(createObs);
        const saved = res?.data;
        if (!saved?.id || this.isDestroyed) {
          return;
        }
        this.chatSessions = this.chatSessions.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                id: saved.id,
                title: saved.title,
                isCustomTitle: true,
                updatedAt: new Date(saved.updatedAt),
                dateGroup: this.computeDateGroup(saved.updatedAt),
                isPersisted: true,
                messagesLoaded: true,
              }
            : s
        );
        if (this.currentSessionId === sessionId) {
          this.currentSessionId = saved.id;
        }
        this.notifyStateChanged();
        this.cdr.detectChanges();
        return;
      }

      const updateObs = this.inboxService?.updateChatSession?.(sessionId, {
        title: newTitle,
        isCustomTitle: true,
      });
      if (!updateObs) {
        return;
      }
      const res = await firstValueFrom(updateObs);
      if (res?.data && !this.isDestroyed) {
        this.applySessionMetadataFromDto(res.data, false);
      }
    } catch (err) {
      console.warn('[ChatWindow] Failed to rename chat session in DB:', err);
      if (!this.isDestroyed) {
        this.chatSessions = this.chatSessions.map((s) =>
          s.id === sessionId
            ? { ...s, title: previousTitle, isCustomTitle: previousCustom }
            : s
        );
        this.notifyStateChanged();
        this.cdr.detectChanges();
      }
    }
  }

  private async persistSessionDelete(sessionId: string): Promise<void> {
    const deleteObs = this.inboxService?.deleteChatSession?.(sessionId);
    if (!deleteObs) {
      return;
    }
    try {
      await firstValueFrom(deleteObs);
    } catch (err) {
      console.warn('[ChatWindow] Failed to delete chat session from DB:', err);
    }
  }

  private replaceMessageId(
    sessionId: string,
    optimisticId: string,
    saved: ChatHistoryMessageDto
  ): void {
    const updateList = (list: ChatMessage[]): ChatMessage[] =>
      list.map((m) =>
        m.id === optimisticId
          ? {
              ...m,
              id: saved.id,
              timestamp: new Date(saved.timestamp),
            }
          : m
      );

    this.chatSessions = this.chatSessions.map((s) =>
      s.id === sessionId ? { ...s, messages: updateList(s.messages) } : s
    );

    if (this.currentSessionId === sessionId) {
      this.messages = updateList(this.messages);
    }
    this.notifyStateChanged();
    this.cdr.detectChanges();
  }

  private applySessionMetadataFromDto(dto: ChatHistorySessionDto, moveToTop: boolean): void {
    const idx = this.chatSessions.findIndex((s) => s.id === dto.id);
    if (idx === -1) {
      return;
    }

    const existing = this.chatSessions[idx];
    const updated: ChatSession = {
      ...existing,
      title: dto.title || existing.title,
      isCustomTitle: dto.isCustomTitle ?? existing.isCustomTitle,
      updatedAt: new Date(dto.updatedAt || existing.updatedAt),
      dateGroup: this.computeDateGroup(dto.updatedAt || existing.updatedAt),
      isPersisted: true,
      messageCount: dto.messageCount ?? existing.messageCount,
    };

    if (moveToTop) {
      this.chatSessions = [updated, ...this.chatSessions.filter((s) => s.id !== dto.id)];
    } else {
      const next = [...this.chatSessions];
      next[idx] = updated;
      this.chatSessions = next;
    }
    this.notifyStateChanged();
    this.cdr.detectChanges();
  }

  private mapDtoToSession(dto: ChatHistorySessionDto): ChatSession {
    const updatedAt = new Date(dto.updatedAt || dto.createdAt || Date.now());
    const hasMessages = Array.isArray(dto.messages);
    const messages = hasMessages
      ? dto.messages!.map((m) => this.restoreMessage(this.mapDtoToMessage(m)))
      : [];
    return {
      id: dto.id,
      title: dto.title || 'New Chat',
      dateGroup: this.computeDateGroup(updatedAt),
      updatedAt,
      messages,
      isCustomTitle: Boolean(dto.isCustomTitle),
      isPersisted: true,
      messagesLoaded: hasMessages,
      messageCount: dto.messageCount ?? messages.length,
    };
  }

  private mapDtoToMessage(dto: ChatHistoryMessageDto): ChatMessage {
    return {
      id: dto.id,
      sender: dto.sender,
      text: dto.text,
      openuiResponse: dto.openuiResponse || undefined,
      isStreaming: false,
      timestamp: new Date(dto.timestamp || Date.now()),
    };
  }

  private computeDateGroup(value: Date | string): string {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return 'Today';
    }
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const diffDays = Math.round((startOfToday - startOfTarget) / (24 * 60 * 60 * 1000));

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return 'Previous 7 Days';
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }

  private buildWelcomeMessage(): ChatMessage {
    const greetingName = this.userName ? `, ${this.userName.split(' ')[0]}` : '';
    const roleHint = this.isEmployee
      ? 'I can help you understand rejected requests, resubmit timesheets, or answer Inbox questions.'
      : 'I can summarize pending requests, explain selected items, or guide you through approvals and report exports.';

    const welcomeText = `Hi${greetingName}! Welcome to HRMS Inbox Support.\n${roleHint}`;
    const welcomeButtons = this.isEmployee
      ? [
          { label: 'My request status', prompt: 'My request status', variant: 'primary' },
          { label: 'How to resubmit?', prompt: 'How to resubmit?', variant: 'outline' },
        ]
      : [
          { label: 'Pending summary', prompt: 'Pending summary', variant: 'primary' },
          { label: 'How to approve/reject?', prompt: 'How to approve/reject?', variant: 'outline' },
        ];

    const openuiResponse = [
      'root = Response([welcome, actions])',
      `welcome = TextBlock(${JSON.stringify(welcomeText)}, "default")`,
      `actions = ActionButtons(${JSON.stringify(welcomeButtons)})`,
    ].join('\n');

    return {
      id: `bot-welcome-${Date.now()}`,
      sender: 'bot',
      text: welcomeText,
      openuiResponse,
      isStreaming: false,
      timestamp: new Date(),
    };
  }

  private async requestAgentOpenUiReply(
    userText: string,
    sessionIdOverride?: string
  ): Promise<void> {
    this.cancelActiveRequest();

    const controller = new AbortController();
    this.activeAbortController = controller;
    const requestSessionId = sessionIdOverride || this.currentSessionId;
    const botMsgId = `bot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    this.isTyping = true;
    this.isStreamingReply = true;
    this.cdr.detectChanges();
    this.scrollToBottom();

    let botMsgCreated = false;
    let completion: AgentCompletion = {};
    let settledBotMsg: ChatMessage | null = null;

    const upsertBotMessage = (openuiResponse: string, isStreaming: boolean): ChatMessage => {
      if (!botMsgCreated) {
        botMsgCreated = true;
        const botMsg: ChatMessage = {
          id: botMsgId,
          sender: 'bot',
          text: openuiResponse,
          openuiResponse,
          isStreaming,
          timestamp: new Date(),
        };
        this.messages = [...this.messages, botMsg];
        return botMsg;
      }
      let updatedMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text: openuiResponse,
        openuiResponse,
        isStreaming,
        timestamp: new Date(),
      };
      this.messages = this.messages.map((m) => {
        if (m.id === botMsgId) {
          updatedMsg = {
            ...m,
            text: openuiResponse,
            openuiResponse,
            isStreaming,
          };
          return updatedMsg;
        }
        return m;
      });
      return updatedMsg;
    };

    try {
      const fullPrompt = this.buildAgentPrompt(userText);

      const finalRaw = await this.inboxService.streamAgentResponse(fullPrompt, {
        signal: controller.signal,
        onChunk: (accumulated) => {
          if (controller.signal.aborted || this.currentSessionId !== requestSessionId) {
            return;
          }
          const sanitized = this.sanitizeStreamingOpenUi(accumulated);
          if (!sanitized) {
            return;
          }
          this.isTyping = false;
          upsertBotMessage(sanitized, true);
          this.cdr.detectChanges();
          this.scrollToBottom();
        },
        onComplete: (result) => {
          completion = result;
        },
      });

      if (controller.signal.aborted || this.currentSessionId !== requestSessionId) {
        return;
      }

      const finalOpenUi = this.finalizeOpenUiResponse(finalRaw, completion);
      this.isTyping = false;
      this.isStreamingReply = false;
      settledBotMsg = upsertBotMessage(finalOpenUi, false);
      this.updateActiveSessionMessages(this.messages);
      this.cdr.detectChanges();
      this.scrollToBottom();
    } catch (error: unknown) {
      if (
        controller.signal.aborted ||
        (error instanceof Error && error.name === 'AbortError') ||
        this.currentSessionId !== requestSessionId
      ) {
        return;
      }

      const errMessage =
        error instanceof Error && error.message
          ? error.message
          : 'Unable to reach the AI assistant right now. Please try again.';
      const errorOpenUi = this.buildErrorOpenUiResponse(errMessage);
      this.isTyping = false;
      this.isStreamingReply = false;
      settledBotMsg = upsertBotMessage(errorOpenUi, false);
      this.updateActiveSessionMessages(this.messages);
      this.cdr.detectChanges();
      this.scrollToBottom();
    } finally {
      if (this.activeAbortController === controller) {
        this.activeAbortController = null;
        this.isTyping = false;
        this.isStreamingReply = false;
      }
    }

    if (settledBotMsg && !this.isDestroyed) {
      await this.persistBotMessageToDb(requestSessionId, settledBotMsg);
    }
  }

  private static readonly MAX_AGENT_PROMPT_CHARS = 14800;

  private buildAgentPrompt(userPrompt: string): string {
    const openUiSystemPrompt = getInboxOpenUiSystemPrompt();
    const inboxContext = this.buildInboxContextPayload();

    const dataAccessSection = [
      '## Data Access, Identity & OpenUI Guidelines',
      '- The Inbox context is a snapshot, not an employee timesheet database. A zero Inbox timesheet count does not mean an employee has no timesheets.',
      '- Use only successful authorized tool results for employee records and date-range reports. Never invent records, hours, approvals, or a successful export.',
      '- Do not guess login usernames or passwords, request credentials in chat, or put tokens in your response. User authentication is managed by the application.',
      '- If a tool fails with UNSAFE_ENDPOINT or INVALID_TOOL_ARGUMENTS, do not repeat the same failed call or bypass endpoint restrictions. Explain that the data lookup could not be completed and suggest the Inbox Download Timesheets action or contacting the system administrator.',
      '- Tool calls and internal protocol markup (including DSML) are not a final answer. After tool execution, always return a user-facing OpenUI response, even when tools fail.',
      '- The application has not supplied verified model or provider metadata. If asked which model you are, identify yourself as the HRMS Inbox Support Assistant and say the underlying model/provider is not available in this chat. Never infer identity from prior assistant messages.',
      '- Fully utilize the OpenUI component library: use DataTable for any tabular records (timesheets, attendance, leaves, employee lists), BarChart / LineChart / PieChart / ProgressList for charts, comparisons, trends, or distributions, Tabs + TabItem or Section / Grid to organize multi-part reports, KeyValueList for metadata, and Callout for notices or warnings. Never put pipe-separated tables or ASCII charts inside TextBlock.',
      '- Use only components listed in Component Signatures; do not invent unlisted component names or tools.',
    ].join('\n');

    const contextSection = `## Current HRMS Inbox Context\n${JSON.stringify(inboxContext)}`;
    const userRequestSection = `## User Request\n${userPrompt}\n\nRespond strictly with valid OpenUI Lang starting with \`root = Response([...])\` and no markdown code fences or extra text outside OpenUI statements.`;

    const fixedSections = [openUiSystemPrompt, dataAccessSection, contextSection, userRequestSection];
    const fixedLength = fixedSections.join('\n\n').length;
    const historyHeader = '## Recent Conversation History\n';
    const historyBudget = Math.max(
      0,
      ChatWindowComponent.MAX_AGENT_PROMPT_CHARS - fixedLength - historyHeader.length - 4
    );

    const recentHistory = this.buildRecentHistorySummary(historyBudget);

    const sections: string[] = [openUiSystemPrompt, dataAccessSection, contextSection];
    if (recentHistory) {
      sections.push(`${historyHeader}${recentHistory}`);
    }
    sections.push(userRequestSection);

    return sections.join('\n\n');
  }

  private buildInboxContextPayload(): Record<string, unknown> {
    const selected = this.selectedNotification
      ? {
          employee_name: this.selectedNotification.employee_name || null,
          request_type:
            this.selectedNotification._displayType ||
            this.selectedNotification.request_type ||
            null,
          status: this.selectedNotification.status || null,
          created_at: this.selectedNotification.created_at || null,
          description: this.selectedNotification.description || null,
          meta: this.selectedNotification._parsedMeta || null,
        }
      : null;

    return {
      userName: this.userName || '',
      role: this.isHR ? 'HR' : this.isManager ? 'Manager' : this.isEmployee ? 'Employee' : 'User',
      isEmployee: this.isEmployee,
      isHR: this.isHR,
      isManager: this.isManager,
      rejectedCount: this.rejectedCount || 0,
      stats: this.stats || null,
      selectedNotification: selected,
    };
  }

  private buildRecentHistorySummary(maxChars = 4800): string {
    if (maxChars <= 80) {
      return '';
    }

    // Exclude the just-appended latest user message and initial welcome banner
    const priorMessages = this.messages
      .slice(0, -1)
      .filter((m) => !m.id.startsWith('bot-welcome'))
      .slice(-6);

    if (priorMessages.length === 0) {
      return '';
    }

    // Walk newest -> oldest so the immediately preceding data turn is preserved for follow-ups (e.g. "present this data in bar chart")
    const selectedEntries: string[] = [];
    let usedChars = 0;

    for (let i = priorMessages.length - 1; i >= 0; i--) {
      const msg = priorMessages[i];
      const isLatestTurn = i >= priorMessages.length - 2;
      const prefix = `${msg.sender === 'user' ? 'User' : 'Assistant'}: `;
      const rawContent = (msg.openuiResponse || msg.text || '').trim();
      if (!rawContent) {
        continue;
      }

      const separatorCost = selectedEntries.length > 0 ? 2 : 0;
      const remaining = maxChars - usedChars - separatorCost - prefix.length;
      if (remaining < 120) {
        break;
      }

      const perMsgCap =
        msg.sender === 'user'
          ? Math.min(remaining, 800)
          : isLatestTurn
          ? Math.min(remaining, 3600)
          : Math.min(remaining, 900);

      const compacted = this.compactHistoryContent(rawContent, perMsgCap);
      const entry = `${prefix}${compacted}`;
      selectedEntries.unshift(entry);
      usedChars += entry.length + separatorCost;
    }

    return selectedEntries.join('\n\n');
  }

  private compactHistoryContent(content: string, maxLen: number): string {
    const normalized = content.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    if (normalized.length <= maxLen) {
      return normalized;
    }
    const suffix = '\n... [truncated for length]';
    const sliceLen = Math.max(0, maxLen - suffix.length);
    return normalized.slice(0, sliceLen).replace(/\s+$/, '') + suffix;
  }

  private handleExportTimesheetAction(params: Record<string, unknown>): void {
    const startDate = typeof params['startDate'] === 'string' ? params['startDate'].trim() : '';
    const endDate = typeof params['endDate'] === 'string' ? params['endDate'].trim() : '';
    const employeeIdRaw = params['employeeId'];
    const employeeId =
      typeof employeeIdRaw === 'number' && Number.isFinite(employeeIdRaw) && employeeIdRaw > 0
        ? employeeIdRaw
        : typeof employeeIdRaw === 'string' && /^\d+$/.test(employeeIdRaw.trim())
        ? Number(employeeIdRaw.trim())
        : undefined;

    if (!startDate || !endDate) {
      this.appendSystemCallout(
        'Missing Export Dates',
        'Please specify a start date and end date to download the timesheet Excel workbook.',
        'warning'
      );
      return;
    }

    this.inboxService.exportTimesheets({ startDate, endDate, employeeId }).subscribe({
      next: (blob) => {
        const suffix = employeeId ? `-emp-${employeeId}` : '';
        this.saveBlobFile(blob, `timesheets${suffix}-${startDate}-to-${endDate}.xlsx`);
      },
      error: () => {
        this.appendSystemCallout(
          'Export Failed',
          'Could not download the timesheet Excel file from the server. You can also export directly from the table Excel button above or the Inbox Download Timesheets toolbar.',
          'warning'
        );
      },
    });
  }

  private handleExportAttendanceAction(params: Record<string, unknown>): void {
    const startDate = typeof params['startDate'] === 'string' ? params['startDate'].trim() : '';
    const endDate = typeof params['endDate'] === 'string' ? params['endDate'].trim() : '';
    if (!startDate || !endDate) {
      this.appendSystemCallout(
        'Missing Export Dates',
        'Please specify a start date and end date to download the attendance report.',
        'warning'
      );
      return;
    }

    this.inboxService.exportMonthlyAttendance({ startDate, endDate }).subscribe({
      next: (blob) => {
        this.saveBlobFile(blob, `attendance-${startDate}-to-${endDate}.xlsx`);
      },
      error: () => {
        this.appendSystemCallout(
          'Export Failed',
          'Could not download the attendance report right now. Please try from the Inbox Reports menu.',
          'warning'
        );
      },
    });
  }

  private handleExportLeavesAction(): void {
    this.inboxService.exportYearlyLeaveBalances().subscribe({
      next: (blob) => {
        this.saveBlobFile(blob, `leave-balances-${new Date().toISOString().slice(0, 10)}.xlsx`);
      },
      error: () => {
        this.appendSystemCallout(
          'Export Failed',
          'Could not download the leave balance report right now. Please check HR export permissions.',
          'warning'
        );
      },
    });
  }

  private saveBlobFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private appendSystemCallout(
    title: string,
    content: string,
    tone: 'info' | 'success' | 'warning' | 'danger'
  ): void {
    const openuiResponse = [
      'root = Response([notice])',
      `notice = Callout(${JSON.stringify(title)}, ${JSON.stringify(content)}, ${JSON.stringify(tone)})`,
    ].join('\n');
    const msg: ChatMessage = {
      id: `bot-action-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'bot',
      text: `${title}: ${content}`,
      openuiResponse,
      isStreaming: false,
      timestamp: new Date(),
    };
    this.messages = [...this.messages, msg];
    this.updateActiveSessionMessages(this.messages);
    this.cdr.detectChanges();
    this.scrollToBottom();
    if (this.currentSessionId) {
      void this.persistBotMessageToDb(this.currentSessionId, msg);
    }
  }

  private sanitizeStreamingOpenUi(raw: string): string {
    let cleaned = raw.trim();
    if (!cleaned) return '';

    // Strip opening markdown code fence if the agent emits one
    cleaned = cleaned.replace(/^```(?:openui(?:-lang)?|lang|txt|text)?\s*\r?\n/i, '');
    // Strip closing markdown code fence if already present
    cleaned = cleaned.replace(/\r?\n?```\s*$/, '');

    // Only UI statements belong in the renderer. Skip leading tool output so
    // a later, recovered UI answer can render, and withhold protocol in the UI.
    const rootMatch = cleaned.match(/^\s*root\s*=\s*Response\s*\(/m);
    if (!rootMatch || typeof rootMatch.index !== 'number') return '';
    cleaned = cleaned.slice(rootMatch.index).trim();
    const protocolIndex = cleaned.search(/<\/?(?:[｜|]{1,2}|tool_?calls?\b|function_?calls?\b|invoke\b|parameter\b)/i);
    if (protocolIndex >= 0) {
      cleaned = cleaned.slice(0, protocolIndex).trim();
    }
    return cleaned;
  }

  private finalizeOpenUiResponse(raw: string, completion: AgentCompletion = {}): string {
    const trimmedRaw = (raw || '').trim();
    const failedLookup = completion.toolCalls?.some((call) => call.ok === false) || false;
    if (!trimmedRaw) {
      if (failedLookup) return this.buildLookupFailureOpenUi();
      return this.wrapTextAsOpenUi(
        'The AI assistant returned an empty response. Please try asking again.',
        'warning'
      );
    }

    const candidate = this.sanitizeStreamingOpenUi(trimmedRaw);
    if (candidate) {
      try {
        const parsed = this.openuiParser.parse(candidate);
        const children = parsed.root?.props['children'];
        if (
          parsed.root?.typeName === 'Response' &&
          Array.isArray(children) && children.length > 0 &&
          !parsed.meta.incomplete &&
          parsed.meta.unresolved.length === 0 &&
          parsed.meta.errors.length === 0
        ) {
          return candidate;
        }
      } catch {
        // Reject invalid UI rather than exposing its source code in the chat.
      }
    }

    if (failedLookup || this.containsToolProtocol(trimmedRaw)) {
      return this.buildLookupFailureOpenUi();
    }
    if (candidate || /\b\w+\s*=\s*[A-Z]\w*\s*\(/.test(trimmedRaw)) {
      return this.wrapTextAsOpenUi(
        "I couldn't display the assistant's response. Please try asking again.",
        'warning'
      );
    }

    const plainText = trimmedRaw
      .replace(/^```[a-zA-Z0-9_-]*\s*\r?\n/, '')
      .replace(/\r?\n?```\s*$/, '')
      .trim();

    return this.wrapTextAsOpenUi(plainText || trimmedRaw, 'default');
  }

  private containsToolProtocol(raw: string): boolean {
    return /[｜|]{2}DSML|<\/?(?:[｜|]{1,2}|tool_?calls?\b|function_?calls?\b|invoke\b|parameter\b)/i.test(raw);
  }

  private buildLookupFailureOpenUi(): string {
    const nextStep = this.isEmployee
      ? 'Open the relevant timesheet request in your Inbox to review or download it.'
      : "Use Download Timesheets in the Inbox toolbar to export your accessible team's records, or open the relevant timesheet request to review it.";
    return this.wrapTextAsOpenUi(
      `I couldn't complete the HRMS data lookup, so I can't confirm the requested records. The assistant's data connection may be unavailable or blocked.\n${nextStep} If the problem continues, contact your system administrator.`,
      'warning'
    );
  }

  private restoreMessage(message: ChatMessage): ChatMessage {
    if (message.sender !== 'bot') return { ...message, isStreaming: false };
    const response = this.finalizeOpenUiResponse(message.openuiResponse || message.text);
    return { ...message, text: response, openuiResponse: response, isStreaming: false };
  }

  private buildErrorOpenUiResponse(errorMessage: string): string {
    if (this.containsToolProtocol(errorMessage) || /UNSAFE_ENDPOINT|INVALID_TOOL_ARGUMENTS/.test(errorMessage)) {
      return this.buildLookupFailureOpenUi();
    }
    return this.wrapTextAsOpenUi(
      `Sorry, I couldn't complete your request right now.\n${errorMessage}`,
      'warning'
    );
  }

  private wrapTextAsOpenUi(
    content: string,
    tone: 'default' | 'info' | 'success' | 'warning'
  ): string {
    return [
      'root = Response([msg, actions])',
      `msg = TextBlock(${JSON.stringify(content)}, ${JSON.stringify(tone)})`,
      `actions = ActionButtons(${JSON.stringify(this.getDefaultActions())})`,
    ].join('\n');
  }

  private getDefaultActions(): Array<{
    label: string;
    prompt: string;
    variant: 'primary' | 'secondary' | 'outline';
  }> {
    return this.isEmployee
      ? [
          { label: 'My request status', prompt: 'My request status', variant: 'primary' },
          { label: 'How to resubmit?', prompt: 'How to resubmit?', variant: 'secondary' },
          { label: 'Selected request details', prompt: 'Selected request details', variant: 'outline' },
        ]
      : [
          { label: 'Pending summary', prompt: 'Pending summary', variant: 'primary' },
          { label: 'Selected request details', prompt: 'Selected request details', variant: 'secondary' },
          { label: 'How to approve/reject?', prompt: 'How to approve/reject?', variant: 'outline' },
          { label: 'Export reports', prompt: 'Export reports', variant: 'outline' },
        ];
  }

  private cancelActiveRequest(): void {
    if (this.activeAbortController) {
      this.activeAbortController.abort();
      this.activeAbortController = null;
    }
  }

  private updateActiveSessionMessages(messages: ChatMessage[], firstUserPrompt?: string): void {
    const idx = this.chatSessions.findIndex((s) => s.id === this.currentSessionId);
    if (idx === -1) {
      this.notifyStateChanged();
      return;
    }

    const session = this.chatSessions[idx];
    let updatedTitle = session.title;
    if (
      firstUserPrompt &&
      !session.isCustomTitle &&
      (session.title === 'New Chat' || session.title === 'Current Conversation')
    ) {
      updatedTitle =
        firstUserPrompt.length > 36
          ? `${firstUserPrompt.slice(0, 36).trim()}...`
          : firstUserPrompt;
    }

    const updatedSession: ChatSession = {
      ...session,
      title: updatedTitle,
      updatedAt: new Date(),
      dateGroup: 'Today',
      messages: [...messages],
    };

    const nextSessions = [...this.chatSessions];
    nextSessions[idx] = updatedSession;
    this.chatSessions = nextSessions;
    this.notifyStateChanged();
  }

  private notifyStateChanged(): void {
    this.notifyMessagesChanged();
    if (this.onSessionsChange) {
      this.onSessionsChange(this.chatSessions, this.currentSessionId);
    }
  }

  private notifyMessagesChanged(): void {
    if (this.onMessagesChange) {
      this.onMessagesChange(this.messages);
    }
  }

  private syncModalFullScreenClass(): void {
    const modalEl = this.hostElement?.nativeElement?.closest('ion-modal');
    if (modalEl) {
      if (this.isFullScreen) {
        modalEl.classList.add('inbox-chat-modal--fullscreen');
      } else {
        modalEl.classList.remove('inbox-chat-modal--fullscreen');
      }
    }
  }

  private scheduleInputFocus(): void {
    if (this.focusTimer) {
      clearTimeout(this.focusTimer);
    }
    this.focusTimer = setTimeout(() => {
      this.messageInput?.nativeElement?.focus();
    }, 220);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.messagesContainer?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 30);
  }

  private clearTimers(): void {
    if (this.focusTimer) {
      clearTimeout(this.focusTimer);
      this.focusTimer = null;
    }
  }
}
