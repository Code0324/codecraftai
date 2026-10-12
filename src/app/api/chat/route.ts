import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Convert messages to Gemini format
    // Gemini requires history to start with a user turn; drop the leading assistant welcome message.
    const prior = messages.slice(0, -1);
    const firstUser = prior.findIndex((m: { role: string }) => m.role === 'user');
    const history = (firstUser === -1 ? [] : prior.slice(firstUser)).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    // Google returns 503 under high demand: retry, then fall back to the lite model.
    const attempts = ['gemini-flash-latest', 'gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-flash-lite-latest'];
    let result;
    for (let i = 0; i < attempts.length; i++) {
      try {
        const m = genAI.getGenerativeModel({ model: attempts[i], systemInstruction: systemPrompt || '' });
        result = await m.startChat({ history }).sendMessageStream(lastMessage.content);
        break;
      } catch (err) {
        const msg = err instanceof Error ? err.message : '';
        const retryable = /\b(503|429|500)\b/.test(msg);
        if (!retryable || i === attempts.length - 1) throw err;
        await new Promise((r) => setTimeout(r, 600 * (i + 1)));
      }
    }
    if (!result) throw new Error('No response from model');

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
