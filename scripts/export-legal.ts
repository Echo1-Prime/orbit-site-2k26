// Renders the legal single-source modules to Markdown so the web routes and
// the exports share one source and cannot drift.
//
// Run:  npm run export-legal
// Then (optional, needs pandoc):
//   pandoc docs/legal-out/terms-of-service.md -o docs/legal-out/terms-of-service.docx
//   pandoc docs/legal-out/privacy-policy.md -o docs/legal-out/privacy-policy.docx

import fs from 'node:fs';
import path from 'node:path';
import type { LegalBlock, LegalSection, OpenItem } from '../lib/legal/types';
import {
  CHANGES,
  OPEN_ITEMS,
  TERMS_IS_DRAFT,
  TERMS_META,
  TERMS_SECTIONS,
} from '../lib/legal/terms-of-service';
import {
  PRIVACY_CHANGES,
  PRIVACY_IS_DRAFT,
  PRIVACY_META,
  PRIVACY_OPEN_ITEMS,
  PRIVACY_SECTIONS,
} from '../lib/legal/privacy-policy';

interface Doc {
  file: string;
  title: string;
  entity: string;
  version: string;
  effectiveDate: string;
  versionNote: string;
  metaExtra: string[];
  isDraft: boolean;
  openItems: OpenItem[];
  changes: string[];
  changesHeading: string;
  sections: LegalSection[];
}

function cell(s: string): string {
  return s.replace(/\|/g, '\\|');
}

function block(b: LegalBlock): string {
  switch (b.type) {
    case 'h3':
      return `### ${b.text}\n`;
    case 'p':
      return b.strong ? `**${b.text}**\n` : `${b.text}\n`;
    case 'callout':
      return `> **${b.text}**\n`;
    case 'ul':
      return b.items.map((i) => `- ${i}`).join('\n') + '\n';
    case 'table': {
      const head = `| ${b.head.map(cell).join(' | ')} |`;
      const sep = `| ${b.head.map(() => '---').join(' | ')} |`;
      const rows = b.rows.map((r) => `| ${r.map(cell).join(' | ')} |`);
      return [head, sep, ...rows].join('\n') + '\n';
    }
  }
}

function render(d: Doc): string {
  const effective =
    d.effectiveDate === 'CONFIRM' ? 'Effective date to be confirmed' : `Effective ${d.effectiveDate}`;
  const out: string[] = [];
  out.push(`# ${d.entity}`);
  out.push(`## ${d.title}`);
  out.push([`Version ${d.version}`, effective, d.entity, ...d.metaExtra].join(' · ') + '\n');
  out.push(`${d.versionNote}\n`);
  if (d.isDraft) {
    out.push('> **DRAFT FOR ATTORNEY REVIEW. NOT IN FORCE.**');
    for (const item of d.openItems) out.push(`> - **${item.status}** ${item.note}`);
    out.push('');
  }
  for (const s of d.sections) {
    out.push(`## ${s.number}. ${s.title}\n`);
    for (const b of s.blocks) out.push(block(b));
  }
  if (d.isDraft) {
    out.push('---\n');
    out.push(`## ${d.changesHeading}\n`);
    for (const c of d.changes) out.push(`- ${c}`);
    out.push('');
  }
  return out.join('\n');
}

const docs: Doc[] = [
  {
    file: 'terms-of-service.md',
    title: TERMS_META.title,
    entity: TERMS_META.entity,
    version: TERMS_META.version,
    effectiveDate: TERMS_META.effectiveDate,
    versionNote: TERMS_META.versionNote,
    metaExtra: [`Governed by ${TERMS_META.governingLaw} law`],
    isDraft: TERMS_IS_DRAFT,
    openItems: OPEN_ITEMS,
    changes: CHANGES,
    changesHeading: 'Change log against Echo1Labs_Terms_of_Service_v2.docx (2026-07-29)',
    sections: TERMS_SECTIONS,
  },
  {
    file: 'privacy-policy.md',
    title: PRIVACY_META.title,
    entity: PRIVACY_META.entity,
    version: PRIVACY_META.version,
    effectiveDate: PRIVACY_META.effectiveDate,
    versionNote: PRIVACY_META.versionNote,
    metaExtra: [],
    isDraft: PRIVACY_IS_DRAFT,
    openItems: PRIVACY_OPEN_ITEMS,
    changes: PRIVACY_CHANGES,
    changesHeading: 'Change log against Echo1Labs_Privacy_Policy_v2.docx (2026-07-29)',
    sections: PRIVACY_SECTIONS,
  },
];

const outDir = path.join(process.cwd(), 'docs', 'legal-out');
fs.mkdirSync(outDir, { recursive: true });
for (const d of docs) {
  const text = render(d);
  const outFile = path.join(outDir, d.file);
  fs.writeFileSync(outFile, text, 'utf8');
  console.log(`wrote ${path.relative(process.cwd(), outFile)} (${text.length} chars)`);
}
