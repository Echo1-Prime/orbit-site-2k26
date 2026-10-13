#!/usr/bin/env python3
"""Generate the ten product subpage band components from the design handoff templates.

    python3 -I scripts/subpages-from-handoff/build_page.py <repo root> [handoff reference dir]

Each handoff page (a *.dc.html template) has a header, one to five <section data-band> bands and a footer nested in the last band.
Site chrome (header, concierge) is built once elsewhere, so only the bands and the footer inside the last band are converted.
Output per page: components/Subpages/generated/<Name>Bands.tsx, plus one shared CSS module with the
hover and focus rules. The pages bind only four names: vid (hero clip), badgeFill, act and start.
Everything else is static markup. Any other binding, sc-if, sc-for or unmapped link stops the run
(exit 2) rather than emitting a page that fails at runtime.

The converter functions are the ones in scripts/home-from-handoff/build_home.py, reduced to what these
pages need. Copy changes go to the handoff source and are re-applied by running this script."""
import html
import json
import re
import sys

_dumps = lambda x: json.dumps(x, ensure_ascii=False)

OUT = sys.argv[1] if len(sys.argv) > 1 else None
REF = sys.argv[2] if len(sys.argv) > 2 else '/Users/joshmeunier/Downloads/design_handoff_echo1labs_site/reference'
if not OUT:
    print('usage: build_page.py <repo root> [handoff reference dir]', file=sys.stderr)
    sys.exit(2)

# handoff file stem -> (component name, route slug). Slugs come from the keyword research recorded in the
# E1-SITE S3 brief (Semrush US, read 2026-10-12) and must match lib/subpages.ts.
PAGES = {
    'Engine': ('Engine', 'automated-lead-generation'),
    'RevOps': ('RevOps', 'crm-automation'),
    'Broadcast': ('Broadcast', 'content-marketing-automation'),
    'Signal': ('Signal', 'ma-deal-sourcing'),
    'Ledger': ('Ledger', 'month-end-close-automation'),
    'Titan': ('Titan', 'construction-estimating-software'),
    'Prime': ('Prime', 'ai-agent-governance'),
    'AI Readiness': ('AiReadiness', 'ai-readiness-assessment'),
    'Info Management': ('InfoManagement', 'document-processing-automation'),
    'Voice Agents': ('VoiceAgents', 'ai-voice-agents'),
}
ROUTE = {'Echo%201%20Labs%20' + stem.replace(' ', '%20') + '.dc.html': '/' + slug for stem, (_, slug) in PAGES.items()}
ROUTE['Echo%201%20Labs%20Home.dc.html#start'] = '/contact'
ROUTE['Echo%201%20Labs%20Home.dc.html'] = '/'

# One accent, one token set: handoff literals map to the live design system variables.
HEX = {'#0E0B1A': 'var(--ao-void)', '#FF7515': 'var(--ao-orbit)', '#FFFFFF': 'var(--e1-mark-white)'}

TAG = re.compile(r'<(/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+))?)*)\s*(/?)>|<!--.*?-->', re.S)
ATTR = re.compile(r'([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s>]+)))?')
VOID = {'input', 'img', 'br', 'hr'}
BIND = re.compile(r'\{\{\s*(.*?)\s*\}\}')
KNOWN = {'vid', 'badgeFill', 'act', 'start'}
IMPORTS = {
    'StatusBadge': "import { StatusBadge } from '@/components/ao/data/StatusBadge';",
    'NotificationItem': "import { NotificationItem } from '@/components/ao/feedback/NotificationItem';",
    'GhostButton': "import CtaLink from '@/components/Subpages/CtaLink';",
}
# The DS GhostButton renders a <button>. Page calls to action must be crawlable links, so it becomes CtaLink.
COMPONENT_NAME = {'GhostButton': 'CtaLink'}

hover_css = []
n_h = [0]


def die(msg):
    print('build_page: ' + msg, file=sys.stderr)
    sys.exit(2)


def camel(p):
    if p.startswith('--'):
        return p
    p = re.sub(r'^-(webkit|moz|ms)-', lambda m: m.group(1).capitalize() + '-', p)
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), p)


def val_expr(v):
    v = html.unescape(v)
    for h, r in HEX.items():
        v = v.replace(h, r).replace(h.lower(), r)
    m = BIND.fullmatch(v.strip())
    if m:
        e = m.group(1)
        if e not in KNOWN:
            die('unexpected binding {{ %s }}' % e)
        return e
    if '{{' in v:
        die('mixed binding in attribute: %s' % v[:80])
    return _dumps(v)


def split_decls(st):
    out, cur, depth = [], '', 0
    for c in st:
        if c == '(':
            depth += 1
        if c == ')':
            depth -= 1
        if c == ';' and depth == 0:
            out.append(cur)
            cur = ''
        else:
            cur += c
    if cur.strip():
        out.append(cur)
    return out


def style_obj(st):
    parts = []
    for d in split_decls(html.unescape(st)):
        if ':' not in d:
            continue
        k, v = d.split(':', 1)
        k, v = k.strip(), v.strip()
        if not k:
            continue
        parts.append((camel(k), f"{_dumps(camel(k)) if k.startswith('--') else camel(k)}: {val_expr(v)}"))
    last = {}
    for name, text in parts:  # a repeated declaration is legal CSS (the last one wins) but not a legal object literal
        last[name] = text
    return '{S({ ' + ', '.join(last.values()) + ' })}'


def attrs_of(raw):
    return [
        (m.group(1), m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else (m.group(4) if m.group(4) is not None else None)))
        for m in ATTR.finditer(raw)
    ]


def conv_attrs(raw, pfx):
    out, hover, focus = [], None, None
    for k, v in attrs_of(raw):
        if k.startswith('hint-') or k == 'component-from-global-scope':
            continue
        if k == 'style-hover':
            hover = v
            continue
        if k == 'style-focus':
            focus = v
            continue
        if k == 'style':
            out.append('style=' + style_obj(v))
            continue
        if k == 'class':
            k = 'className'
        if k == 'for':
            k = 'htmlFor'
        if k.startswith('aria-') or k.startswith('data-') or k in ('viewBox', 'preserveAspectRatio'):
            pass
        elif '-' in k:
            k = camel(k)
        if v is None:
            out.append(k)
            continue
        if k == 'href':
            if v.endswith('.dc.html') or '.dc.html#' in v:
                if v not in ROUTE:
                    die('unmapped link: ' + v)
                v = ROUTE[v]
            elif v.startswith(('Echo', 'media/', '_ds/')):
                die('unmapped relative link: ' + v)
        if k.startswith('on'):
            die('inline handler %s=%s' % (k, v))
        out.append(f'{k}={{{val_expr(v)}}}' if BIND.search(v) else f'{k}={_dumps(html.unescape(v))}')
    if hover or focus:
        n_h[0] += 1
        name = f'{pfx}H{n_h[0]}'
        if hover:
            hover_css.append('.%s:hover { %s }' % (name, '; '.join(x.strip() for x in split_decls(html.unescape(hover)))))
        if focus:
            hover_css.append('.%s:focus-visible { %s }' % (name, '; '.join(x.strip() for x in split_decls(html.unescape(focus)))))
        out.append(f'className={{styles.{name}}}')
    return ' '.join(out)


def conv(frag, pfx, used):
    res, stack, pos = [], [], 0

    def text_conv(t):
        def rep(mm):
            e = mm.group(1)
            if e not in KNOWN:
                die('unexpected text binding {{ %s }}' % e)
            return '{' + e + '}'
        return BIND.sub(rep, t)

    for m in TAG.finditer(frag):
        txt = frag[pos:m.start()]
        pos = m.end()
        if txt.strip() or (txt and '\n' not in txt):
            res.append(text_conv(txt))
        if m.group(0).startswith('<!--'):
            continue
        close, name, raw, selfc = m.group(1), m.group(2), m.group(3) or '', m.group(4)
        if name in ('sc-if', 'sc-for'):
            die('%s is not expected in a subpage' % name)
        if name == 'x-import':
            if close:
                res.append('</%s>' % stack.pop())
                continue
            comp = re.search(r'component-from-global-scope="[^"]*\.([A-Za-z]+)"', raw).group(1)
            if comp not in IMPORTS:
                die('unmapped component: ' + comp)
            used.add(comp)
            out_name = COMPONENT_NAME.get(comp, comp)
            if not selfc:
                stack.append(out_name)
            a = []
            dcp = [val_expr(v) for k, v in attrs_of(raw) if k == 'dc-props']
            for k, v in attrs_of(raw):
                if k.startswith('hint-') or k == 'component-from-global-scope':
                    continue
                if k == 'dc-props':
                    a.append('{...' + val_expr(v) + '}')
                    continue
                if k == 'style' and dcp:
                    a.append('style={{ ...(' + dcp[0] + ').style, ...' + style_obj(v)[1:-1] + ' }}')
                    continue
                if k == 'style':
                    a.append('style=' + style_obj(v))
                    continue
                if v is None:
                    a.append(k)
                    continue
                a.append(f'{k}={{{val_expr(v)}}}' if BIND.search(v) else f'{k}={_dumps(html.unescape(v))}')
            res.append(f'<{out_name} ' + ' '.join(a) + (' />' if selfc else '>'))
            continue
        if close:
            res.append(f'</{name}>')
        else:
            a = conv_attrs(raw, pfx)
            res.append(f'<{name} {a} />' if (name in VOID or selfc) else f'<{name} {a}>')
    tail = frag[pos:]
    if tail.strip():
        res.append(text_conv(tail))
    return ''.join(res)


def label_to_h2(sec):
    """The eyebrow line that names a band ("What Titan does") is a <p> in the handoff, so a band's h3 items sit
    straight under the h1. Make that line an h2 with the same inline style: no visual change, a valid outline."""
    label = re.search(r'aria-label="([^"]*)"', sec).group(1)
    if label == 'Next':
        return sec
    def swap(m):
        text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        if not text.startswith(html.unescape(label)):
            return m.group(0)
        return '<h2 %s>%s</h2>' % (m.group(1), m.group(2))
    return re.sub(r'<p ([^>]*)>(.*?)</p>', swap, sec, count=1, flags=re.S)


def bands_of(src):
    s = open(src, encoding='utf-8').read()
    i = s.find('<section data-band')
    j = s.find('</x-dc>')
    if i < 0 or j < i:
        die('no bands in ' + src)
    # The handoff footer (copyright and product list) sits inside the last band and is kept, as on the home page.
    body = s[i:j]
    secs = re.findall(r'<section data-band.*?</section>', body, flags=re.S)
    rest = re.sub(r'<section data-band.*?</section>', '', body, flags=re.S)
    if not secs or not re.fullmatch(r'\s*(</div>)?\s*', rest) or len(re.findall('<section', body)) != len(secs):
        die('unexpected markup between bands in ' + src + ': ' + rest.strip()[:120])
    return s, secs


def page_consts(s, src):
    sc = s[s.find('renderVals()'):]
    m = re.search(r'\n\s*act:\s*(\[.*?\]),\n', sc)
    act = json.loads(m.group(1)) if m else []
    badge = re.search(r"\n\s*badgeFill:\s*\{ style: \{ display: 'block', width: '100%', textAlign: 'center', boxSizing: 'border-box' \} \}", sc)
    st = re.search(r"\n\s*start:\s*\{ accent: 'var\(--ao-orbit\)', onClick: .*?, style: \{ fontSize: 12, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '15px 22px', minHeight: 50, borderRadius: 'var\(--ao-r-pill\)', background: 'var\(--ao-orbit-15\)', justifyContent: 'center', display: 'inline-flex', alignItems: 'center' \} \}", sc)
    if not st:
        die('start binding differs from the shared shape in ' + src)
    return act, bool(badge)


def main():
    out_files = []
    for stem, (comp, slug) in PAGES.items():
        src = f'{REF}/Echo 1 Labs {stem}.dc.html'
        s, secs = bands_of(src)
        act, has_badge = page_consts(s, src)
        used = set()
        pfx = comp[0].lower() + comp[1:]
        parts = [conv(sec if k == 0 else label_to_h2(sec), pfx, used) for k, sec in enumerate(secs)]
        text = '\n      '.join(parts)
        has_vid = '{vid}' in text
        lines = [
            "'use client';",
            '',
            "/* A client component only because the design system's NotificationItem attaches click handlers; it still renders on the server.",
            "   GENERATED from the design handoff template 'Echo 1 Labs %s.dc.html' by scripts/subpages-from-handoff/build_page.py." % stem,
            "   Layout values are static in the handoff, hover and focus rules (if any) are CSS module classes, and the call to action is a",
            "   crawlable link. Do not hand-edit copy here; change the source and run the script again. */",
            '',
            "import type { CSSProperties, ReactNode } from 'react';",
        ]
        for c in sorted(used):
            lines.append(IMPORTS[c])
        if 'styles.' in text:
            lines.append("import styles from './subpages.module.css';")
        lines += ['', 'const S = (o: Record<string, unknown>) => o as CSSProperties;']
        if has_badge:
            lines.append("const badgeFill = { style: S({ display: 'block', width: '100%', textAlign: 'center', boxSizing: 'border-box' }) };")
        if act:
            lines.append('const act = %s;' % _dumps(act))
        lines.append("const start = { accent: 'var(--ao-orbit)', href: '/contact', style: S({ fontSize: 12, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '15px 22px', minHeight: 50, borderRadius: 'var(--ao-r-pill)', background: 'var(--ao-orbit-15)', justifyContent: 'center', display: 'inline-flex', alignItems: 'center' }) };")
        lines += ['',
                  '/* eslint-disable @typescript-eslint/no-explicit-any */',
                  'export default function %sBands({ vid, afterHero, beforeLast }: { vid?: ReactNode; afterHero?: ReactNode; beforeLast?: ReactNode }) {' % comp,
                  '  return (', '    <>']
        first, rest = parts[0], parts[1:]
        lines.append('      ' + first)
        lines.append('      {afterHero}')
        multi = len(rest) > 0
        for k, p in enumerate(rest):
            if multi and k == len(rest) - 1:
                lines.append('      {beforeLast}')
            lines.append('      ' + p)
        lines += ['    </>', '  );', '}', '']
        body = '\n'.join(lines)
        sig = '{ vid, afterHero, beforeLast }: { vid?: ReactNode; afterHero?: ReactNode; beforeLast?: ReactNode }'
        if not has_vid:
            body = body.replace(sig, '{ afterHero, beforeLast }: { afterHero?: ReactNode; beforeLast?: ReactNode }')
        sig2 = sig if has_vid else '{ afterHero, beforeLast }: { afterHero?: ReactNode; beforeLast?: ReactNode }'
        if len(secs) < 2:
            body = body.replace(sig2, '{ vid, afterHero }: { vid?: ReactNode; afterHero?: ReactNode }' if has_vid else '{ afterHero }: { afterHero?: ReactNode }')
        open(f'{OUT}/components/Subpages/generated/{comp}Bands.tsx', 'w', encoding='utf-8').write(body)
        out_files.append((comp, slug, len(secs), has_vid, len(act)))
    if hover_css:
        open(f'{OUT}/components/Subpages/generated/subpages.module.css', 'w', encoding='utf-8').write('\n'.join(hover_css) + '\n')
    for r in out_files:
        print('%-15s /%-34s bands=%d vid=%s act=%d' % r)
    print('hover/focus rules:', len(hover_css))


main()
