import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'ethankunder@gmail.com';
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const resend = getResendClient();

  if (!resend) {
    return NextResponse.json(
      { error: 'Contact form is not configured. Please try again later.' },
      { status: 503 }
    );
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: 'Message is too long. Please keep it under 5000 characters.' },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again later.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
