import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, Badge, ButtonLink } from '@/components/ds';
import { getPost, POST_SLUGS, formatDate, type BlogSection } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2
          key={index}
          style={{
            fontFamily: 'var(--oa-font-display)',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'var(--oa-white)',
            margin: '2.5rem 0 0.9rem',
          }}
        >
          {section.content}
        </h2>
      );
    case 'pullquote':
      return (
        <blockquote
          key={index}
          style={{
            borderLeft: '3px solid var(--oa-ember)',
            padding: '1rem 1.5rem',
            margin: '1.75rem 0',
            background: 'rgba(224,123,39,0.07)',
            borderRadius: '0 6px 6px 0',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--oa-font-display)',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--oa-white)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {section.content}
          </p>
        </blockquote>
      );
    case 'p':
    default:
      return (
        <p
          key={index}
          style={{
            fontSize: '1rem',
            color: 'var(--oa-text-secondary)',
            lineHeight: 1.85,
            marginBottom: '1.25rem',
          }}
        >
          {section.content}
        </p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    url: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Header */}
      <header
        style={{
          paddingTop: '6rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--oa-border-subtle)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '760px' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--oa-font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--oa-ember)',
                marginBottom: '1.25rem',
                textDecoration: 'none',
              }}
            >
              ← Blog
            </Link>
            <div style={{ marginBottom: '1rem' }}>
              <Badge tone="muted">{post.category}</Badge>
            </div>
            <h1
              className="display-lg"
              style={{ marginBottom: '1.25rem', textWrap: 'balance' } as React.CSSProperties}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                fontFamily: 'var(--oa-font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--oa-text-muted)',
              }}
            >
              <span>{formatDate(post.datePublished)}</span>
              <span>{post.readingTime} read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <section style={{ padding: '3.25rem 0 4.5rem' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            {post.body.map((section, i) => renderSection(section, i))}

            {/* CTA */}
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginTop: '3rem',
                borderColor: 'rgba(224,123,39,0.25)',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--oa-white)',
                    marginBottom: '0.35rem',
                  }}
                >
                  See the BLM OS in action.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--oa-text-secondary)', margin: 0 }}>
                  Join the Founding Cohort for early access and locked-in pricing.
                </p>
              </div>
              <ButtonLink href="/founding-cohort" variant="ember">
                Join Founding Cohort
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Post footer */}
      <div
        style={{
          background: 'var(--oa-panel)',
          borderTop: '1px solid var(--oa-border-subtle)',
          padding: '1.75rem 0',
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '720px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: 'var(--oa-font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--oa-text-secondary)',
                textDecoration: 'none',
              }}
            >
              ← Back to Blog
            </Link>
            <ButtonLink href="/founding-cohort" variant="ember" size="sm">
              Join Founding Cohort
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
