'use client';

import { useActionState, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import LeadConversion from '@/components/Analytics/LeadConversion';
import { readAttribution, trackPath, type Attribution } from '@/lib/attribution';
import { submitContact, type ContactState } from './actions';

const initialState: ContactState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }} disabled={pending}>
      {pending ? 'Sending…' : 'Send message'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const pathname = usePathname();
  const [attr, setAttr] = useState<Attribution>({ src: '', cta: '', from: '', landing: '', ref: '', utm: '' });

  /* Read where the visitor came from once the page is on screen. trackPath is safe to repeat, so the order of
     this effect and the layout's own tracker does not matter. */
  useEffect(() => {
    trackPath(pathname);
    setAttr(readAttribution());
  }, [pathname]);

  if (state.status === 'success') {
    return (
      <div className="form__success" role="status">
        <LeadConversion source={`contact_form:${attr.src || 'direct'}`} legacy={false} />
        Message received. We&apos;ll be in touch within one business day.
      </div>
    );
  }

  return (
    <form className="form" action={formAction}>
      {/* Honeypot (visually hidden, not display:none, so bots still fill it) */}
      <input className="form__hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {/* Where the visitor came from: sent with the message so the team knows which page and button led here. */}
      <input type="hidden" name="a_src" value={attr.src} />
      <input type="hidden" name="a_cta" value={attr.cta} />
      <input type="hidden" name="a_from" value={attr.from} />
      <input type="hidden" name="a_landing" value={attr.landing} />
      <input type="hidden" name="a_ref" value={attr.ref} />
      <input type="hidden" name="a_utm" value={attr.utm} />

      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="form__field">
          <label className="form__label" htmlFor="name">Name</label>
          <input className="form__input" type="text" id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="email">Email</label>
          <input className="form__input" type="email" id="email" name="email" required placeholder="you@company.com" />
        </div>
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="company">Company</label>
        <input className="form__input" type="text" id="company" name="company" placeholder="Company name" />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="message">What are you working on?</label>
        <textarea className="form__textarea" id="message" name="message" placeholder="Tell us where you are in your AI lifecycle and what you're trying to solve…" />
      </div>

      {state.status === 'error' && (
        <p role="alert" style={{ color: 'var(--red)', fontSize: '0.85rem' }}>{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
