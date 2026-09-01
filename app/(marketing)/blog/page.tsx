import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, Badge } from '@/components/ds';
import { POSTS, BLOG_CATEGORIES, formatDate } from '@/lib/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Thinking on Business Lifecycle Management, agent operations, and building owner-led businesses at scale. From the Echo 1 Labs team.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="display-md" style={{ marginTop: '0.75rem' }}>
              Thinking on building businesses that run themselves.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px', marginTop: '1rem' }}>
              The BLM OS category, agent operations, and what it actually takes to remove the
              operator from the execution layer.
            </p>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {BLOG_CATEGORIES.map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: 'var(--e1-font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--e1-text-secondary)',
                  border: '1px solid var(--e1-border-subtle)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Post grid */}
          <div className="grid-3">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article
                  className="card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.15s',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ marginBottom: '0.75rem' }}>
                    <Badge tone="muted">{post.category}</Badge>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--e1-font-display)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      lineHeight: 1.35,
                      color: 'var(--e1-white)',
                      marginBottom: '0.75rem',
                      flex: 1,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--e1-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {post.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      fontFamily: 'var(--e1-font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--e1-text-muted)',
                      borderTop: '1px solid var(--e1-border-subtle)',
                      paddingTop: '0.75rem',
                    }}
                  >
                    <span>{formatDate(post.datePublished)}</span>
                    <span>{post.readingTime} read</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
