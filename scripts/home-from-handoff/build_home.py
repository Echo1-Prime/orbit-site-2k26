#!/usr/bin/env python3
"""Assemble components/Home/HomeBands.tsx from the handoff home template.
Responsive bindings become CSS variables (SSR-safe, mobile first); sc-if on responsive
flags become display wrappers; style-hover becomes CSS-module classes."""
import re, sys, json, html
_dumps = lambda x: json.dumps(x, ensure_ascii=False)

SRC = '/Users/joshmeunier/Downloads/design_handoff_echo1labs_site/reference/Echo 1 Labs Home.dc.html'
OUTDIR = sys.argv[1]  # worktree root

RESP = {  # name: (mobile <760, tablet 760-1099, wide >=1100)
 'heroCols': ('1fr', '1fr', 'minmax(0,7fr) minmax(0,5fr)'),
 'artS': ('calc(100vw - 2 * clamp(16px, 4vw, 48px))', '460px', 'min(540px, calc((min(100vw - 2 * clamp(16px, 4vw, 48px), 1240px) - 56px) * 5 / 12))'),
 'artMargin': ('8px auto 0', '24px auto 0', '0'),
 'aoArt': ('276px', '368px', '460px'),
 'diagCols': ('1fr', '1fr', 'minmax(0,5fr) minmax(0,7fr)'),
 'diagStick': ('static', 'static', 'sticky'),
 'cmpCols': ('1fr', 'minmax(110px,0.8fr) minmax(0,1.3fr) minmax(0,1.3fr) minmax(140px,1fr)', 'minmax(160px,1fr) minmax(0,1.5fr) minmax(0,1.5fr) minmax(190px,1.05fr)'),
 'cmpGap': ('10px', '28px', '28px'),
 'flowDir': ('column', 'column', 'row'),
 'linkW': ('1px', '1px', '40px'), 'linkH': ('24px', '24px', '1px'),
 'linkOrigin': ('center top', 'center top', 'left center'),
 'ladderCols': ('1fr', '1fr', 'minmax(0,4fr) minmax(0,8fr)'),
 'trustCols': ('1fr', 'repeat(3, minmax(0,1fr))', 'repeat(3, minmax(0,1fr))'),
 'lcCols': ('1fr', '1fr', 'repeat(7, minmax(0, 1fr))'),
 'lcGap': ('30px', '30px', '20px'),
 'lcDir': ('row', 'row', 'column'),
 'wbCols': ('1fr', 'repeat(2, minmax(0,1fr))', 'minmax(0,0.85fr) repeat(3, minmax(0,1fr))'),
 'aoCols': ('1fr', '1fr', 'minmax(0,1fr) auto'),
 'shotCols': ('1fr', '1fr', '48px minmax(0,1fr) 264px'),
 'drawerBL': ('0', '0', '1px solid var(--ao-bd-0)'),
 'drawerBT': ('1px solid var(--ao-bd-0)', '1px solid var(--ao-bd-0)', '0'),
 'govCols': ('1fr', '1fr', 'minmax(0,5fr) minmax(0,7fr)'),
 'blsCols': ('1fr', '1fr', 'minmax(0,1fr) minmax(0,1fr)'),
 'blsCardCols': ('1fr', 'repeat(2, minmax(0,1fr))', 'repeat(2, minmax(0,1fr))'),
 'blsLabW': ('76px', '110px', '110px'),
 'blsNameDisp': ('none', 'block', 'block'),
 'linkHide': ('scaleY(0)', 'scaleY(0)', 'scaleX(0)'),
 'lcHide': ('scaleY(0)', 'scaleY(0)', 'scaleX(0)'),
 'trustMt0': ('0px', '56px', '56px'), 'trustMt1': ('0px', '28px', '28px'), 'trustMt2': ('0px', '0px', '0px'),
 'blsNameSize': ('26px', 'clamp(30px,3vw,44px)', 'clamp(30px,3vw,44px)'),
}
COND = {'shotRail': 'rW', 'showReadout': 'rW', 'lcH': 'rW', 'lcV': 'rN', 'cmpHead': 'rD'}
ALWAYS = {'swOn': 'true', 'linesReady': 'linesReady'}

TAG = re.compile(r'<(/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+))?)*)\s*(/?)>|<!--.*?-->', re.S)
ATTR = re.compile(r'([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s>]+)))?')
VOID = {'input', 'img', 'br', 'hr'}
BIND = re.compile(r'\{\{\s*(.*?)\s*\}\}')

ids = set(); hover_css = []; used_comps = set(); n_h = [0]
HEX = {'#0E0B1A': 'var(--ao-void)', '#FF7515': 'var(--ao-orbit)', '#FFFFFF': 'var(--e1-mark-white)'}

def camel(p):
    if p.startswith('--'): return p
    p = re.sub(r'^-(webkit|moz|ms)-', lambda m: m.group(1).capitalize() + '-', p)
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), p)

def note(expr):
    m = re.match(r'[!(\s]*([A-Za-z_$][\w$]*)', expr)
    if m: ids.add(m.group(1))

def val_expr(v, fors):
    v = html.unescape(v)
    for h, r in HEX.items(): v = v.replace(h, r).replace(h.lower(), r)
    m = BIND.fullmatch(v.strip())
    if m:
        e = m.group(1)
        if e in RESP: return _dumps('var(--r-%s)' % e)
        if e in ALWAYS and e == 'swOn': return 'true'
        first = re.match(r'[!(\s]*([A-Za-z_$][\w$]*)', e)
        if not first or first.group(1) not in fors: note(e)
        return e
    if '{{' in v:
        def rep(mm):
            e = mm.group(1)
            if e in RESP: return 'var(--r-%s)' % e
            first = re.match(r'[!(\s]*([A-Za-z_$][\w$]*)', e)
            if not first or first.group(1) not in fors: note(e)
            return '${' + e + '}'
        return '`' + BIND.sub(rep, v).replace('`', '\\`') + '`'
    return _dumps(v)

def split_decls(st):
    out = []; cur = ''; depth = 0; br = 0; k = 0
    while k < len(st):
        c = st[k]
        if st.startswith('{{', k): br += 1; cur += '{{'; k += 2; continue
        if st.startswith('}}', k): br -= 1; cur += '}}'; k += 2; continue
        if c == '(' and not br: depth += 1
        if c == ')' and not br: depth -= 1
        if c == ';' and depth == 0 and br == 0: out.append(cur); cur = ''
        else: cur += c
        k += 1
    if cur.strip(): out.append(cur)
    return out

def style_obj(st, fors):
    parts = []
    for d in split_decls(html.unescape(st)):
        if ':' not in d: continue
        k, v = d.split(':', 1); k = k.strip(); v = v.strip()
        if not k: continue
        parts.append(f"{_dumps(camel(k)) if k.startswith('--') else camel(k)}: {val_expr(v, fors)}")
    return '{S({ ' + ', '.join(parts) + ' })}'

def attrs_of(raw):
    return [(m.group(1), m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else (m.group(4) if m.group(4) is not None else None))) for m in ATTR.finditer(raw)]

ROUTE = {'/titan': '/products/titan', '/signal': '/products/signal', '/agent-orbit': '/#agent-orbit'}

def conv_attrs(raw, fors, pfx):
    out = []; hover = None; focus = None
    for k, v in attrs_of(raw):
        if k.startswith('hint-') or k == 'component-from-global-scope': continue
        if k == 'style-hover': hover = v; continue
        if k == 'style-focus': focus = v; continue
        if k == 'style': out.append('style=' + style_obj(v, fors)); continue
        if k == 'class': k = 'className'
        if k == 'for': k = 'htmlFor'
        if k.startswith('aria-') or k.startswith('data-') or k in ('viewBox', 'preserveAspectRatio'): pass
        elif '-' in k: k = camel(k)
        if v is None: out.append(k); continue
        if k == 'href' and v in ROUTE: v = ROUTE[v]
        if k in ('onClick',) and BIND.fullmatch(v.strip()) and BIND.fullmatch(v.strip()).group(1) in ('goPricing', 'goSignal', 'goTitan', 'goOrbit', 'goCohort'):
            continue  # the handoff stubbed navigation; real hrefs navigate
        out.append(f'{k}={{{val_expr(v, fors)}}}' if BIND.search(v) else f'{k}={_dumps(html.unescape(v))}')
    if hover or focus:
        n_h[0] += 1; name = f'{pfx}H{n_h[0]}'
        if hover: hover_css.append('.%s:hover { %s }' % (name, '; '.join(x.strip() for x in split_decls(html.unescape(hover)))))
        if focus: hover_css.append('.%s:focus-visible { %s }' % (name, '; '.join(x.strip() for x in split_decls(html.unescape(focus)))))
        out.append(f'className={{styles.{name}}}')
    return ' '.join(out)

def conv(frag, pfx):
    res = []; stack = []; fors = []; pos = 0
    def text_conv(t):
        def rep(mm):
            e = mm.group(1); first = re.match(r'[!(\s]*([A-Za-z_$][\w$]*)', e)
            if not first or first.group(1) not in fors: note(e)
            return '{' + e + '}'
        return BIND.sub(rep, t)
    for m in TAG.finditer(frag):
        txt = frag[pos:m.start()]; pos = m.end()
        if txt.strip() or (txt and '\n' not in txt): res.append(text_conv(txt))
        if m.group(0).startswith('<!--'): continue
        close, name, raw, selfc = m.group(1), m.group(2), m.group(3) or '', m.group(4)
        if name == 'sc-if':
            if close:
                k = stack.pop()
                res.append('</>)}' if k == 'if' else ('</div>)}' if k == 'ifdiv' else '</div>')); continue
            mv = re.search(r'value\s*=\s*"([^"]*)"', raw); ex = BIND.search(mv.group(1)).group(1).strip() if mv else 'true'
            if ex in COND:
                res.append('<div className="%s">' % COND[ex]); stack.append('div'); continue
            if ex.endswith('.showWhy'):
                res.append('{(' + ex + ') && (<div className="rN">'); stack.append('ifdiv'); continue
            if ex == 'swOn': ex = 'true'
            else:
                first = re.match(r'[!(\s]*([A-Za-z_$][\w$]*)', ex)
                if not first or first.group(1) not in fors: note(ex)
            res.append('{(' + ex + ') && (<>'); stack.append('if'); continue
        if name == 'sc-for':
            if close: res.append('</Fragment>))}'); stack.pop(); continue
            L = BIND.search(re.search(r'list\s*=\s*"([^"]*)"', raw).group(1)).group(1)
            AS = re.search(r'as\s*=\s*"([^"]*)"', raw).group(1)
            fl = re.match(r'[!(\s]*([A-Za-z_$][\w$]*)', L)
            if not fl or fl.group(1) not in fors: note(L)
            fors.append(AS); stack.append('for')
            res.append('{' + L + '.map((' + AS + ': any, _i: number) => (<Fragment key={_i}>'); continue
        if name == 'x-import':
            if close: res.append('</%s>' % stack.pop()); continue
            comp = re.search(r'component-from-global-scope="[^"]*\.([A-Za-z]+)"', raw).group(1); used_comps.add(comp)
            if not selfc: stack.append(comp)
            a = []
            dcp = [val_expr(v, fors) for k, v in attrs_of(raw) if k == 'dc-props']
            for k, v in attrs_of(raw):
                if k.startswith('hint-') or k == 'component-from-global-scope': continue
                if k == 'dc-props': a.append('{...' + val_expr(v, fors) + '}'); continue
                if k == 'style' and dcp:
                    a.append('style={{ ...(' + dcp[0] + ').style, ...' + style_obj(v, fors)[1:-1] + ' }}'); continue
                if k == 'style': a.append('style=' + style_obj(v, fors)); continue
                if v is None: a.append(k); continue
                a.append(f'{k}={{{val_expr(v, fors)}}}' if BIND.search(v) else f'{k}={_dumps(html.unescape(v))}')
            res.append(f'<{comp} ' + ' '.join(a) + (' />' if selfc else '>')); continue
        if close:
            res.append(f'</{name}>')
        else:
            a = conv_attrs(raw, fors, pfx)
            res.append(f'<{name} {a} />' if (name in VOID or selfc) else f'<{name} {a}>')
    tail = frag[pos:]
    if tail.strip(): res.append(text_conv(tail))
    return ''.join(res)

s = open(SRC, encoding='utf-8').read()
body = s[s.find('<div id="top"'):s.find('</x-dc>')]
def cut(a, b):
    i = body.find(a); j = body.find(b, i + 1); return body[i:j]

hero = cut('<section data-band="dark" aria-label="Echo 1 Labs"', '<section id="bls"')
hero = re.sub(r'<x-import[^>]*OrbitLauncher[^>]*></x-import><sc-if value="\{\{ launcherOn \}\}".*?</sc-if>', '', hero, flags=re.S)
bands = [
 ('hero', hero),
 ('bls', cut('<section id="bls"', '<section id="diagnosis"')),
 ('diag', cut('<section id="diagnosis"', '<section id="ai"')),
 ('ai', cut('<section id="ai"', '<section id="process"')),
 ('proc', cut('<section id="process"', '<section id="lifecycle"')),
 ('life', cut('<section id="lifecycle"', '<section id="use-cases"')),
 # use-cases band is replaced by the E1-MARKETING showcase row (Josh, option A / 2)
 ('orbit', cut('<section id="agent-orbit"', '<section id="governance"')),
 ('gov', cut('<section id="governance"', '<section id="start"')),
 ('start', cut('<section id="start"', '<sc-if value="{{ menuOn }}"')),
]
# [STAT:*] fleet-count tokens are unverified placeholders in the handoff (README open item 6):
# the whole line is omitted until Josh supplies verified counts.
# Josh, 2026-10-12: 16 agents out of the box per client, 141 to upgrade to (matches the live /orbit-info page).
FLEET = ('<p style="margin:20px 0 0;display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-family:var(--ao-f-mono);font-weight:300;font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--ao-t1)">'
         'Agent Fleet ·<span style="color:var(--ao-tdata)">16</span>agents out of the box ·<span style="color:var(--ao-tdata)">141</span>to upgrade to</p>')
bands = [(n, re.sub(r'<p [^>]*>Agent Fleet ·.*?Agent Kits</p>', lambda m: FLEET, f, flags=re.S) if n == 'orbit' else f) for n, f in bands]
parts = {}
for n, frag in bands:
    parts[n] = conv(frag, n)

# the dark nav tile and footer marks use hex fills in the handoff; tokens only here
for n in parts:
    for h, r in HEX.items():
        parts[n] = parts[n].replace('"%s"' % h, '"%s"' % r)

declared = sorted(i for i in ids if i not in RESP and i not in COND)
comps = sorted(used_comps)
imp = {
 'AccentLines': "import { AccentLines } from '@/components/ao/core/AccentLines';",
 'GhostButton': "import { GhostButton } from '@/components/ao/feedback/GhostButton';",
 'OrbitMark': "import { OrbitMark } from '@/components/ao/core/OrbitMark';",
 'MetricCard': "import { MetricCard, MetricRow } from '@/components/ao/data/MetricCard';",
 'MetricRow': None,
 'NotificationItem': "import { NotificationItem, NotificationList } from '@/components/ao/feedback/NotificationItem';",
 'NotificationList': None,
 'DomainPanel': "import { DomainPanel } from '@/components/ao/data/DomainPanel';",
 'AltitudeRail': "import { AltitudeRail } from '@/components/ao/navigation/AltitudeRail';",
 'AltitudePills': "import { AltitudePills } from '@/components/ao/navigation/AltitudePill';",
}
lines = ["'use client';", '', "/* GENERATED from the design handoff home template (Echo 1 Labs Home.dc.html) by build_home.py.",
         "   Layout switches are CSS variables (styles/ao/home.css), so the HTML is SSR-safe and mobile first.",
         "   State and data live in useHomeVals.ts and home-data.ts. Do not hand-edit copy here without updating the source. */",
         '', "import { Fragment, type CSSProperties } from 'react';"]
for c in comps:
    if imp.get(c): lines.append(imp[c])
lines += ["import { UseCaseShowcase } from '@/components/UseCaseShowcase';",
          "import styles from './HomeBands.module.css';", "import { useHomeVals } from './useHomeVals';", '',
          '/* eslint-disable @typescript-eslint/no-explicit-any */',
          'export default function HomeBands() {',
          '  const v: any = useHomeVals();',
          '  const S = (o: Record<string, unknown>) => o as CSSProperties;',
          '  const { ' + ', '.join(declared) + ' } = v;',
          '  return (', '    <>']
order = ['hero', 'SHOWCASE', 'bls', 'diag', 'ai', 'proc', 'life', 'orbit', 'gov', 'start']
for k in order:
    if k == 'SHOWCASE': lines.append('      <UseCaseShowcase />')
    else: lines.append('      ' + parts[k])
lines += ['    </>', '  );', '}', '']
open(OUTDIR + '/components/Home/HomeBands.tsx', 'w').write('\n'.join(lines))
open(OUTDIR + '/components/Home/HomeBands.module.css', 'w').write('\n'.join(hover_css) + '\n')
# responsive css
css = ['/* Responsive values for the home bands (from the handoff layout logic).',
       '   Mobile first: <760 base, 760+ tablet, 1100+ wide. */', ':root {']
for k, (m, t, w) in RESP.items(): css.append('  --r-%s: %s;' % (k, m))
css += ['}', '@media (min-width: 760px) {', '  :root {']
for k, (m, t, w) in RESP.items(): css.append('    --r-%s: %s;' % (k, t))
css += ['  }', '}', '@media (min-width: 1100px) {', '  :root {']
for k, (m, t, w) in RESP.items(): css.append('    --r-%s: %s;' % (k, w))
css += ['  }', '}',
        '.rW { display: none; } .rN { display: contents; } .rD { display: none; }',
        '@media (min-width: 760px) { .rD { display: contents; } }',
        '@media (min-width: 1100px) { .rW { display: contents; } .rN { display: none; } }', '']
css += [':root { --cmp-p-personal: flex; --cmp-p-institutional: flex; --cmp-i-personal: flex; --cmp-i-institutional: flex; }',
        '@media (max-width: 759px) { :root { --cmp-p-institutional: none; --cmp-i-personal: none; } }',
        '.e1-feed { display: grid; grid-template-columns: 1fr; gap: 8px; }',
        '@media (min-width: 760px) { .e1-feed { grid-template-columns: repeat(2, minmax(0, 1fr)); } }',
        '@media (min-width: 1100px) { .e1-feed { grid-template-columns: repeat(4, minmax(0, 1fr)); } }',
        '.e1-feed-item { display: flex; gap: 12px; min-width: 0; padding: 14px 16px; border-radius: 6px; background: var(--ao-sf-0); border: 1px solid var(--ao-bd-0); }',
        '@media (max-width: 759px) { .e1-feed-4 { display: none; } }', '']
open(OUTDIR + '/styles/ao/home.css', 'w').write('\n'.join(css))
open('/tmp/claude/home_ids.txt', 'w').write(','.join(declared))
print('bands ok;', len(declared), 'bindings;', len(hover_css), 'hover;', comps)
print(','.join(declared))
