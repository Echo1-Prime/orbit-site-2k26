// Shared block model for legal documents (Terms, Privacy). Edit the
// documents in their own modules; this file only carries types.

export type LegalBlock =
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string; strong?: boolean }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'callout'; text: string };

export interface LegalSection {
  number: string;
  title: string;
  id: string;
  blocks: LegalBlock[];
}

export interface OpenItem {
  key: string;
  status: 'CONFIRM' | 'COUNSEL' | 'OUTSTANDING';
  note: string;
}
