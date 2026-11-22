// Small HTML pages for the gate, sign-in and admin views. One shell so they match.

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

const STYLE =
  ':root{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0A0A0E;color:#F5F0FA;font:16px/1.5 system-ui,-apple-system,sans-serif;padding:16px}main{width:100%;max-width:520px}h1{font-size:20px;margin:0 0 8px;text-align:center}p{margin:0 0 12px;opacity:.8}span.o{color:#FF7515}a{color:#FF7515}form{display:flex;gap:8px;margin:12px 0}input,select{flex:1;min-width:0;padding:10px 12px;border-radius:8px;border:1px solid #3a3a46;background:#15151c;color:#F5F0FA;font:inherit}button{padding:10px 14px;border-radius:8px;border:0;background:#FF7515;color:#0A0A0E;font:inherit;font-weight:600;cursor:pointer}table{width:100%;border-collapse:collapse;margin:12px 0}td,th{text-align:left;padding:8px 6px;border-bottom:1px solid #2a2a34;font-size:14px}td form{margin:0}td button{padding:4px 10px;background:#2a2a34;color:#F5F0FA}.note{font-size:14px;opacity:.9}';

export function shell(status: number, title: string, inner: string): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)}</title><style>${STYLE}</style></head><body><main><h1><span class="o">Echo 1 Labs</span> Sales Academy</h1>${inner}</main></body></html>`;
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}
