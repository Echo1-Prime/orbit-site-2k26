'use server';

import { forwardContact } from '@/lib/n8n';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot — bots fill hidden fields; humans do not.
  if ((formData.get('company_website') as string)?.trim()) {
    return { status: 'success' };
  }

  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const company = (formData.get('company') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter your name and a valid email.' };
  }

  const { ok } = await forwardContact({ name, email, company, message });
  return ok
    ? { status: 'success' }
    : { status: 'error', message: 'Something went wrong. Email josh@mingma.io and we will pick it up.' };
}
