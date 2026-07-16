import {
  streamText,
  tool,
  stepCountIs,
  convertToModelMessages,
  type UIMessage,
} from 'ai';
import { z } from 'zod';
import { buildSystemPrompt } from '@/lib/concierge/system-prompt';
import { searchKnowledge, type KbTopic } from '@/lib/concierge/knowledge';
import { DASHBOARD_SLUGS, NAV_ROUTES } from '@/lib/concierge/routes';
import { forwardContact } from '@/lib/n8n';
import { SITE_URL, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/site';

export const maxDuration = 30;

// Latest Claude via the Vercel AI Gateway (fetched live at build time, not memorized).
const MODEL = 'anthropic/claude-sonnet-5';

const KB_TOPICS = ['company', 'products', 'pricing', 'process', 'team', 'security', 'contact'] as const;

// Coarse abuse guard. Production hardening (per-IP rate limit, Vercel Firewall/
// BotID on /api/concierge/*) is tracked as a launch item.
const MAX_TURNS = 24;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!Array.isArray(messages) || messages.length > MAX_TURNS) {
    return new Response(
      JSON.stringify({ error: 'This session is too long. Please start a new one or reach us at ' + CONTACT_EMAIL }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const result = streamText({
    model: MODEL,
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(6),
    maxOutputTokens: 700,
    tools: {
      // ── Server tools (execute here) ──
      answerFromKnowledgeBase: tool({
        description: 'Look up grounded facts about Echo 1 Labs (company, products, pricing, process, team, security, contact). Use before answering any factual question.',
        inputSchema: z.object({
          query: z.string().describe('The user question or topic to look up.'),
          topic: z.enum(KB_TOPICS).optional().describe('Optional topic filter.'),
        }),
        execute: async ({ query, topic }) => ({
          entries: searchKnowledge(query, topic as KbTopic | undefined),
        }),
      }),
      bookCall: tool({
        description: 'Give the user the link to book a discovery call with the team.',
        inputSchema: z.object({}),
        execute: async () => ({
          url: process.env.SCHEDULER_URL || `${SITE_URL}/contact`,
          note: 'Share this link so they can book a short discovery call.',
        }),
      }),
      captureLead: tool({
        description: 'Capture a lead once you have at least a name and email. Read details back to the user before calling this.',
        inputSchema: z.object({
          name: z.string(),
          email: z.string(),
          company: z.string().optional(),
          interest: z.string().optional().describe('Which product or stage they care about.'),
          summary: z.string().optional().describe('One line on what they are trying to solve.'),
        }),
        execute: async ({ name, email, company, interest, summary }) => {
          const { ok } = await forwardContact({
            name,
            email,
            company,
            message: [interest && `Interest: ${interest}`, summary].filter(Boolean).join(' — '),
            source: 'orbit-concierge',
          });
          return ok
            ? { ok: true, message: 'Lead captured. The team will follow up within one business day.' }
            : { ok: false, message: `Could not reach the system. Ask them to email ${CONTACT_EMAIL}.` };
        },
      }),
      escalateToHuman: tool({
        description: 'Hand off to a person when the user asks for a human or you cannot help.',
        inputSchema: z.object({ reason: z.string() }),
        execute: async ({ reason }) => {
          await forwardContact({
            name: 'Concierge escalation',
            email: CONTACT_EMAIL,
            message: `Escalation from Orbit: ${reason}`,
            source: 'orbit-escalation',
          });
          return { email: CONTACT_EMAIL, phone: CONTACT_PHONE_DISPLAY };
        },
      }),

      // ── Client tools (no execute — handled in the browser via onToolCall) ──
      showDashboard: tool({
        description: 'Surface an in-page demo panel for a product so the user can see it. Then narrate briefly.',
        inputSchema: z.object({
          product: z.enum(DASHBOARD_SLUGS as [string, ...string[]]).describe('Product slug to demo.'),
        }),
      }),
      navigateTo: tool({
        description: 'Navigate the user to a page on the site.',
        inputSchema: z.object({
          route: z.enum(NAV_ROUTES as unknown as [string, ...string[]]).describe('Allowlisted site route.'),
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error('concierge chat error:', error);
      return `Orbit is offline right now. Reach the team at ${CONTACT_EMAIL} or ${CONTACT_PHONE_DISPLAY}.`;
    },
  });
}
