import type { LegalBlock, LegalSection, OpenItem } from '@/lib/legal/terms-of-service';
import styles from './LegalDocument.module.css';

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  meta: string[];
  versionNote?: string;
  isDraft: boolean;
  openItems: OpenItem[];
  sections: LegalSection[];
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'h3':
      return <h3 className={styles.h3}>{block.text}</h3>;
    case 'p':
      return block.strong ? (
        <p className={`body-md ${styles.p} ${styles.strong}`}>{block.text}</p>
      ) : (
        <p className={`body-md ${styles.p}`}>{block.text}</p>
      );
    case 'ul':
      return (
        <ul className={styles.ul}>
          {block.items.map((item) => (
            <li key={item} className="body-md">{item}</li>
          ))}
        </ul>
      );
    case 'callout':
      return <p className={`body-md ${styles.callout}`}>{block.text}</p>;
    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={`${row[0]}-${i}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function LegalDocument({
  eyebrow,
  title,
  meta,
  versionNote,
  isDraft,
  openItems,
  sections,
}: LegalDocumentProps) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '820px' }}>
        <p className="label" style={{ marginBottom: '0.75rem' }}>{eyebrow}</p>
        <h1 className="display-lg" style={{ marginBottom: '1rem' }}>{title}</h1>
        <p className={`body-md ${styles.meta}`}>{meta.join(' · ')}</p>
        {versionNote ? <p className={`body-md ${styles.meta}`}>{versionNote}</p> : null}

        {isDraft ? (
          <aside className={styles.draft} aria-label="Draft status">
            <p className={styles.draftTitle}>Draft for attorney review. Not in force.</p>
            <ul className={styles.draftList}>
              {openItems.map((item) => (
                <li key={item.key}>
                  <span className={styles.draftTag}>{item.status}</span> {item.note}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <nav className={styles.toc} aria-label="Sections">
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.number}. {s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="stack" style={{ gap: '2.25rem' }}>
          {sections.map((s) => (
            <article key={s.id} id={s.id} className={styles.section}>
              <h2 className="display-sm" style={{ marginBottom: '0.75rem' }}>
                <span className={styles.num}>{s.number}.</span> {s.title}
              </h2>
              {s.blocks.map((b, i) => (
                <Block key={`${s.id}-${i}`} block={b} />
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
