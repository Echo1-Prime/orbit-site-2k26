import Link from 'next/link';

interface CTAProps {
  eyebrow?: string;
  headline: string;
  sub?: string;
  buttonLabel: string;
  buttonHref: string;
  dark?: boolean;
}

export default function CTA({ eyebrow, headline, sub, buttonLabel, buttonHref, dark }: CTAProps) {
  return (
    <section className={`section--sm${dark ? ' band--dark' : ''}`}>
      <div className="container center">
        {eyebrow && <p className="label mx-auto" style={{ marginBottom: '1rem', justifyContent: 'center' }}>{eyebrow}</p>}
        <h2 className="display-md" style={{ marginBottom: sub ? '1rem' : '1.75rem' }}>{headline}</h2>
        {sub && (
          <p className="body-lg mx-auto" style={{ maxWidth: '480px', marginBottom: '1.75rem' }}>{sub}</p>
        )}
        <Link href={buttonHref} className="btn btn--primary">{buttonLabel}</Link>
      </div>
    </section>
  );
}
