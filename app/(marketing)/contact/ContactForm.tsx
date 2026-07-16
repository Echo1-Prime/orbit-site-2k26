'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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

  if (state.status === 'success') {
    return (
      <div className="form__success" role="status">
        Message received. We&apos;ll be in touch within one business day.
      </div>
    );
  }

  return (
    <form className="form" action={formAction}>
      {/* Honeypot (visually hidden, not display:none, so bots still fill it) */}
      <input className="form__hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

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
