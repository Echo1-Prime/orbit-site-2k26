import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '60svh', display: 'grid', placeItems: 'center' }}>
      <div className="container center">
        <p className="label mx-auto" style={{ justifyContent: 'center', marginBottom: '1rem' }}>404</p>
        <h1 className="display-md" style={{ marginBottom: '1rem' }}>This orbit is empty.</h1>
        <p className="body-lg mx-auto" style={{ maxWidth: '440px', marginBottom: '1.75rem' }}>
          The page you were looking for is not here. Head back to mission control.
        </p>
        <Link href="/" className="btn btn--primary">Return home</Link>
      </div>
    </section>
  );
}
