import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { createParser } from '@openuidev/angular-lang';
import { InboxService } from '../../services/inbox.service';
import { ChatWindowComponent } from './chat-window.component';

describe('ChatWindowComponent agent output', () => {
  let component: ChatWindowComponent;
  let service: jasmine.SpyObj<InboxService>;
  const validUi = 'root = Response([msg])\nmsg = TextBlock("Ready", "info")';
  const toolProtocol = '<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="tool_example">\n' +
    '<｜｜DSML｜｜ parameter name="body" string="false">{"username":"manager"}' +
    '</｜｜DSML｜｜ parameter>\n</｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>';

  beforeEach(() => {
    service = jasmine.createSpyObj<InboxService>('InboxService', [
      'streamAgentResponse',
      'exportTimesheets',
      'exportMonthlyAttendance',
      'exportYearlyLeaveBalances',
      'getChatSessions',
      'getChatSession',
      'createChatSession',
      'updateChatSession',
      'deleteChatSession',
      'addChatMessages',
    ]);
    service.getChatSessions.and.returnValue(of({ success: true, data: [] }));
    const cdr = jasmine.createSpyObj<ChangeDetectorRef>('ChangeDetectorRef', ['detectChanges']);
    component = new ChatWindowComponent(cdr, new ElementRef(document.createElement('div')), service);
    spyOn<any>(component, 'scrollToBottom');
    component.currentSessionId = 'test-session';
  });

  afterEach(() => component.ngOnDestroy());

  it('withholds prose, tool markup and split protocol tokens during streaming', () => {
    for (const text of ['Hello', '<｜', '<｜｜DS', toolProtocol]) {
      expect(component['sanitizeStreamingOpenUi'](text)).toBe('');
    }
  });

  it('keeps progressive root-first streaming and strips markdown fences', () => {
    const partial = 'root = Response([msg])\nmsg = TextBlock("Hel';
    expect(component['sanitizeStreamingOpenUi'](partial)).toBe(partial);
    expect(component['finalizeOpenUiResponse']('```openui\n' + validUi + '\n```')).toBe(validUi);
  });

  it('renders a recovered UI answer after tool protocol', () => {
    expect(component['finalizeOpenUiResponse'](toolProtocol + '\n' + validUi)).toBe(validUi);
  });

  it('replaces leaked tool calls with a valid, useful warning', () => {
    const response = component['finalizeOpenUiResponse'](toolProtocol, {
      toolCalls: [{ name: 'Login', ok: false, error: 'UNSAFE_ENDPOINT' }],
    });
    expect(response).toContain("couldn't complete the HRMS data lookup");
    expect(response).toContain('Download Timesheets');
    expect(response).not.toContain('DSML');
    expect(response).not.toContain('username');
    const parsed = createParser(component.openuiLibrary.toJSONSchema(), 'Response').parse(response);
    expect(parsed.root?.typeName).toBe('Response');
    expect(parsed.meta.errors).toEqual([]);
  });

  it('does not render tool protocol embedded in an old plain-text OpenUI wrapper', () => {
    const wrapped = 'root = Response([msg])\nmsg = TextBlock(' + JSON.stringify(toolProtocol) + ', "default")';
    const response = component['finalizeOpenUiResponse'](wrapped);
    expect(response).toContain("couldn't complete the HRMS data lookup");
    expect(response).not.toContain('DSML');
    expect(component['finalizeOpenUiResponse']('<｜｜DS')).not.toContain('<｜');
  });

  it('rejects empty, unresolved, truncated and invalid component programs without displaying source', () => {
    for (const invalid of [
      'root = Response([])',
      'root = Response([missing])',
      'root = Response([msg])\nmsg = TextBlock("Hello',
      'root = Response([msg])\nmsg = InventedCard("Hello")',
      'root = Response([msg])\nmsg = TextBlock(123)',
    ]) {
      const response = component['finalizeOpenUiResponse'](invalid);
      expect(response).toContain("couldn't display");
      expect(response).not.toContain('InventedCard');
      expect(response).not.toContain('Response([missing])');
    }
  });

  it('still wraps ordinary prose, but not unconfirmed data after a failed lookup', () => {
    expect(component['finalizeOpenUiResponse']('Hello there')).toContain('TextBlock("Hello there"');
    expect(component['finalizeOpenUiResponse']('Retrieved 40 hours', {
      toolCalls: [{ ok: false, error: 'INVALID_TOOL_ARGUMENTS' }],
    })).not.toContain('Retrieved 40 hours');
  });

  it('preserves a valid recovery message after a non-fatal tool failure', () => {
    expect(component['finalizeOpenUiResponse'](validUi, {
      toolCalls: [{ ok: false, error: 'UNSAFE_ENDPOINT' }],
    })).toBe(validUi);
  });

  it('cleans previously saved tool output when restoring a session', () => {
    component.sessions = [{
      id: 'saved', title: 'Saved chat', dateGroup: 'Today', updatedAt: new Date(),
      messages: [{ id: 'bot-saved', sender: 'bot', text: toolProtocol, timestamp: new Date() }],
    }];
    component.ngOnInit();
    expect(component.messages[0].openuiResponse).toContain("couldn't complete");
    expect(component.messages[0].text).not.toContain('DSML');
  });

  it('includes grounded identity and data-access instructions in the agent prompt', () => {
    const prompt = component['buildAgentPrompt']('which model are you?');
    expect(prompt).toContain('not supplied verified model or provider metadata');
    expect(prompt).toContain('Never infer identity from prior assistant messages');
    expect(prompt).toContain('Do not guess login usernames or passwords');
    expect(prompt).toContain('zero Inbox timesheet count does not mean');
  });

  it('never displays raw tool chunks and uses completion failures for the final reply', async () => {
    service.streamAgentResponse.and.callFake(async (_prompt, options) => {
      options?.onChunk?.('<｜｜DS');
      options?.onChunk?.(toolProtocol);
      expect(component.messages).toEqual([]);
      expect(component.isTyping).toBeTrue();
      options?.onComplete?.({ toolCalls: [{ name: 'GraphQL', ok: false, error: 'UNSAFE_ENDPOINT' }] });
      return toolProtocol;
    });
    await component['requestAgentOpenUiReply']('get a timesheet');
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].openuiResponse).toContain("couldn't complete");
    expect(component.messages[0].isStreaming).toBeFalse();
    expect(component.isBusy).toBeFalse();
  });

  it('honors an empty final reply rather than resurrecting earlier tokens', async () => {
    service.streamAgentResponse.and.callFake(async (_prompt, options) => {
      options?.onChunk?.(validUi);
      options?.onComplete?.({ toolCalls: [{ ok: false, error: 'UNSAFE_ENDPOINT' }] });
      return '';
    });
    await component['requestAgentOpenUiReply']('get a timesheet');
    expect(component.messages[0].openuiResponse).toContain("couldn't complete");
    expect(component.messages[0].openuiResponse).not.toContain('"Ready"');
  });

  it('progressively renders valid UI and settles the final message', async () => {
    service.streamAgentResponse.and.callFake(async (_prompt, options) => {
      options?.onChunk?.('root = Response([msg])');
      expect(component.messages[0].isStreaming).toBeTrue();
      expect(component.isTyping).toBeFalse();
      options?.onChunk?.(validUi);
      return validUi;
    });
    await component['requestAgentOpenUiReply']('hello');
    expect(component.messages[0].openuiResponse).toBe(validUi);
    expect(component.messages[0].isStreaming).toBeFalse();
    expect(component.isBusy).toBeFalse();
  });

  it('does not append a late response to a different session', async () => {
    service.streamAgentResponse.and.callFake(async (_prompt, options) => {
      component.currentSessionId = 'different-session';
      options?.onChunk?.(validUi);
      return validUi;
    });
    await component['requestAgentOpenUiReply']('hello');
    expect(component.messages).toEqual([]);
  });

  it('accepts rich OpenUI responses with Tabs, BarChart, PieChart, DataTable, KeyValueList, ProgressList, Callout, and export actions', () => {
    const richProgram = [
      'root = Response([notice, summary, tabs, actions])',
      'notice = Callout("Export Ready", "January 2026 timesheet loaded.", "success")',
      'summary = SummaryCard("Jan 2026 Timesheet", "Emp 267", [{ label: "Records", value: "31", tone: "primary" }, { label: "Hours", value: "248.00", tone: "success" }])',
      'tabs = Tabs([t1, t2, t3])',
      't1 = TabItem("Charts", [chartGrid])',
      't2 = TabItem("Records", [tbl])',
      't3 = TabItem("Breakdown", [kv, prog])',
      'chartGrid = Grid([bar, pie], 2)',
      'bar = BarChart("Daily Hours", ["Jan 01", "Jan 02"], [{ name: "Hours", values: [8, 8], color: "#3f51b5" }], "2026-01", false, false, "Hours")',
      'pie = PieChart("Status Split", [{ label: "Verified", value: 31, color: "#10b981" }], "All records", true)',
      'tbl = DataTable("Timesheet Entries", ["Date", "Hours", "Status"], [["2026-01-01", 8, "verified"], ["2026-01-02", 8, "verified"]], "31 records", 10, "ts-267")',
      'kv = KeyValueList("Employee Info", [{ label: "Employee ID", value: "267", tone: "primary" }])',
      'prog = ProgressList("Activities", [{ label: "Development", value: 20, max: 31, displayValue: "20 days", tone: "primary" }])',
      'actions = ActionButtons([{ label: "Download Excel", prompt: "Download Excel", variant: "primary", actionType: "export_timesheet", params: { startDate: "2026-01-01", endDate: "2026-01-31", employeeId: 267 } }])',
    ].join('\n');

    expect(component['finalizeOpenUiResponse'](richProgram)).toBe(richProgram);
    const parsed = createParser(component.openuiLibrary.toJSONSchema(), 'Response').parse(richProgram);
    expect(parsed.meta.errors).toEqual([]);
    expect(parsed.meta.unresolved).toEqual([]);
    expect(parsed.meta.incomplete).toBeFalse();
  });

  it('caps agent prompt length under the 16000-character upstream limit even with large history', () => {
    const hugeRow = '["2026-01-01", 8, "verified", "Documentation | Research | Bug Fixing | Meeting | Development"]';
    const hugeResponse = `root = Response([tbl])\ntbl = DataTable("Timesheets", ["Date","Hours","Status","Work"], [${Array(80).fill(hugeRow).join(',')}])`;

    component.messages = [
      { id: 'u1', sender: 'user', text: 'Export Jan 2026', timestamp: new Date() },
      { id: 'b1', sender: 'bot', text: hugeResponse, openuiResponse: hugeResponse, timestamp: new Date() },
      { id: 'u2', sender: 'user', text: 'Export Feb 2026', timestamp: new Date() },
      { id: 'b2', sender: 'bot', text: hugeResponse, openuiResponse: hugeResponse, timestamp: new Date() },
      { id: 'u3', sender: 'user', text: 'present this data in bar chart', timestamp: new Date() },
    ];

    const built = component['buildAgentPrompt']('present this data in bar chart');
    expect(built.length).toBeLessThanOrEqual(14800);
    expect(built).toContain('## User Request\npresent this data in bar chart');
    expect(built).toContain('BarChart(');
    expect(built).toContain('DataTable(');
  });

  it('loads user chat history from DB without static demo sessions', async () => {
    const nowIso = new Date().toISOString();
    service.getChatSessions.and.returnValue(
      of({
        success: true,
        data: [
          {
            id: 'db-sess-1',
            title: 'My Saved Chat',
            isCustomTitle: true,
            createdAt: nowIso,
            updatedAt: nowIso,
            messageCount: 2,
          },
        ],
      })
    );
    service.getChatSession.and.returnValue(
      of({
        success: true,
        data: {
          id: 'db-sess-1',
          title: 'My Saved Chat',
          isCustomTitle: true,
          createdAt: nowIso,
          updatedAt: nowIso,
          messages: [
            { id: 'm1', sender: 'user', text: 'Hello DB', timestamp: nowIso },
            { id: 'm2', sender: 'bot', text: validUi, openuiResponse: validUi, timestamp: nowIso },
          ],
        },
      })
    );

    component.ngOnInit();
    await Promise.resolve();
    await Promise.resolve();

    expect(service.getChatSessions).toHaveBeenCalledWith(false);
    expect(service.getChatSession).toHaveBeenCalledWith('db-sess-1');
    expect(component.chatSessions.length).toBe(1);
    expect(component.chatSessions[0].id).toBe('db-sess-1');
    expect(component.messages.length).toBe(2);
    expect(component.messages[0].text).toBe('Hello DB');
  });

  it('creates session in DB on first message, persists bot reply, renames, and deletes', async () => {
    const nowIso = new Date().toISOString();
    service.createChatSession.and.returnValue(
      of({
        success: true,
        data: {
          id: 'db-new-1',
          title: 'Check my leaves',
          isCustomTitle: false,
          createdAt: nowIso,
          updatedAt: nowIso,
          messageCount: 1,
          messages: [{ id: 'db-msg-u1', sender: 'user', text: 'Check my leaves', timestamp: nowIso }],
        },
      })
    );
    service.addChatMessages.and.returnValue(
      of({
        success: true,
        data: {
          session: {
            id: 'db-new-1',
            title: 'Check my leaves',
            isCustomTitle: false,
            createdAt: nowIso,
            updatedAt: nowIso,
            messageCount: 2,
          },
          messages: [{ id: 'db-msg-b1', sender: 'bot', text: validUi, openuiResponse: validUi, timestamp: nowIso }],
        },
      })
    );
    service.streamAgentResponse.and.resolveTo(validUi);
    service.updateChatSession.and.returnValue(
      of({
        success: true,
        data: {
          id: 'db-new-1',
          title: 'Leave Inquiry',
          isCustomTitle: true,
          createdAt: nowIso,
          updatedAt: nowIso,
          messageCount: 2,
        },
      })
    );
    service.deleteChatSession.and.returnValue(of({ success: true, data: { id: 'db-new-1' } }));

    component.ngOnInit();
    await Promise.resolve();

    component.draftMessage = 'Check my leaves';
    component.sendMessage();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(service.createChatSession).toHaveBeenCalled();
    expect(service.addChatMessages).toHaveBeenCalledWith('db-new-1', jasmine.any(Object));
    expect(component.currentSessionId).toBe('db-new-1');

    component.renameDraft = 'Leave Inquiry';
    component.confirmRenameSession(component.chatSessions[0]);
    await Promise.resolve();
    expect(service.updateChatSession).toHaveBeenCalledWith('db-new-1', {
      title: 'Leave Inquiry',
      isCustomTitle: true,
    });

    component.deleteSession('db-new-1', new Event('click'));
    await Promise.resolve();
    expect(service.deleteChatSession).toHaveBeenCalledWith('db-new-1');
  });
});
