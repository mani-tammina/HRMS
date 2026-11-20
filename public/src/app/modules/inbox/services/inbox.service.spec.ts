import { HttpClient } from '@angular/common/http';
import { AgentCompletion, InboxService } from './inbox.service';

describe('InboxService agent stream', () => {
  let service: InboxService;
  let fetchSpy: jasmine.Spy;

  function sseResponse(events: Array<{ event: string; data: unknown }>): Response {
    const bytes = new TextEncoder().encode(events.map(({ event, data }) =>
      `event: ${event}\r\ndata: ${JSON.stringify(data)}\r\n\r\n`
    ).join(''));
    return new Response(new ReadableStream({
      start(controller) {
        // Exercise split SSE fields, JSON and multi-byte DSML characters.
        for (let offset = 0; offset < bytes.length; offset += 7) {
          controller.enqueue(bytes.slice(offset, offset + 7));
        }
        controller.close();
      },
    }), { headers: { 'Content-Type': 'text/event-stream' } });
  }

  beforeEach(() => {
    service = new InboxService(jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post']));
    fetchSpy = spyOn(window, 'fetch');
    spyOn(localStorage, 'getItem').and.returnValue('');
  });

  it('preserves completion tool failures while ignoring tool events', async () => {
    const text = '<｜｜DSML｜｜ calls>\n</｜｜DSML｜｜ calls>';
    const toolCalls = [{ name: 'Login', ok: false, error: 'UNSAFE_ENDPOINT' }];
    fetchSpy.and.resolveTo(sseResponse([
      { event: 'tool_result', data: { text: 'internal result' } },
      { event: 'token', data: { text: text.slice(0, 10) } },
      { event: 'token', data: { text: text.slice(10) } },
      { event: 'done', data: { fullText: text, toolCalls, rounds: 8 } },
    ]));
    const completed = jasmine.createSpy('onComplete');
    const result = await service.streamAgentResponse('request', { onComplete: completed });
    expect(result).toBe(text);
    expect(completed).toHaveBeenCalledOnceWith({ toolCalls });
  });

  it('treats the final fullText as authoritative, even when empty', async () => {
    fetchSpy.and.resolveTo(sseResponse([
      { event: 'token', data: { text: 'stale tool output' } },
      { event: 'done', data: { fullText: '', toolCalls: [{ ok: false }] } },
    ]));
    expect(await service.streamAgentResponse('request')).toBe('');
  });

  it('allows recovery after a non-fatal tool error', async () => {
    const finalText = 'root = Response([msg])\nmsg = TextBlock("Lookup unavailable", "warning")';
    fetchSpy.and.resolveTo(sseResponse([
      { event: 'error', data: { error: 'UNSAFE_ENDPOINT', fatal: false } },
      { event: 'token', data: { text: finalText } },
      { event: 'done', data: { fullText: finalText, toolCalls: [{ ok: false }] } },
    ]));
    expect(await service.streamAgentResponse('request')).toBe(finalText);
  });

  it('rejects fatal SSE errors', async () => {
    fetchSpy.and.resolveTo(sseResponse([
      { event: 'error', data: { error: 'Agent unavailable', fatal: true } },
    ]));
    await expectAsync(service.streamAgentResponse('request')).toBeRejectedWithError('Agent unavailable');
  });

  it('extracts tool failure metadata from non-streamed JSON responses too', async () => {
    fetchSpy.and.resolveTo(new Response(JSON.stringify({
      fullText: '', toolCalls: [{ name: 'GraphQL', ok: false, error: 'UNSAFE_ENDPOINT' }],
    }), { headers: { 'Content-Type': 'application/json' } }));
    let completion: AgentCompletion = {};
    expect(await service.streamAgentResponse('request', {
      onComplete: (result) => { completion = result; },
    })).toBe('');
    expect(completion.toolCalls?.[0].error).toBe('UNSAFE_ENDPOINT');
  });
});
