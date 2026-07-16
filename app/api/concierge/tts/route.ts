// ElevenLabs low-latency TTS proxy. The vendor key stays server-side; the client
// POSTs a sentence and streams back audio/mpeg. Returns 503 when unconfigured so
// the concierge degrades gracefully to captions-only.

export const maxDuration = 30;

const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // ElevenLabs stock voice; override with ELEVENLABS_VOICE_ID

export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'tts_unconfigured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { text } = (await req.json()) as { text?: string };
  if (!text || !text.trim()) {
    return new Response(JSON.stringify({ error: 'empty_text' }), { status: 400 });
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?optimize_streaming_latency=3&output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: text.slice(0, 800),
        model_id: 'eleven_flash_v2_5',
        voice_settings: { stability: 0.4, similarity_boost: 0.7, style: 0.2 },
      }),
    },
  );

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    console.error('ElevenLabs TTS error:', upstream.status, detail.slice(0, 200));
    return new Response(JSON.stringify({ error: 'tts_upstream_error' }), { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  });
}
