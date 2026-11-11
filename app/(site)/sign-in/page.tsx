import type { Metadata } from 'next';
import SiteChrome from '@/components/Site/SiteChrome';
import { SIGN_IN_APPS, SIGN_IN_PATH, SITE_NAME } from '@/lib/site';
import styles from './sign-in.module.css';

const TITLE = 'Sign in';
const DESC = 'Choose your Echo 1 Labs app to sign in.';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  robots: { index: false, follow: false },
  alternates: { canonical: SIGN_IN_PATH },
  openGraph: { title: TITLE, description: DESC, siteName: SITE_NAME, type: 'website' },
};

/** Routes people to the right app. Each app runs its own sign-in; nothing is entered or stored here. */
export default function SignInPage() {
  return (
    <>
      <SiteChrome />
      <main id="main" data-band="dark" className={styles.main}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Sign in</p>
          <h1 className={styles.title}>Choose your app.</h1>
          <p className={styles.intro}>You will sign in on the app&apos;s own page.</p>

          <ul className={styles.grid}>
            {SIGN_IN_APPS.map((app) => (
              <li key={app.href}>
                <a href={app.href} className={styles.card}>
                  <span className={styles.body}>
                    <span className={styles.name}>{app.name}</span>
                    {app.line && <span className={styles.line}>{app.line}</span>}
                    <span className={styles.host}>{new URL(app.href).host}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
