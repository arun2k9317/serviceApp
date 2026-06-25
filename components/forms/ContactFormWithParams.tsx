'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ContactForm from './ContactForm';

export default function ContactFormWithParams() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  return <ContactForm initialService={initialService} />;
}
