'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      router.push('/thank-you');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate={false}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-grey-700 dark:text-grey-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="glass-input w-full px-4 py-3 rounded-lg"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-grey-700 dark:text-grey-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="glass-input w-full px-4 py-3 rounded-lg"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-grey-700 dark:text-grey-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="glass-input w-full px-4 py-3 rounded-lg resize-none"
          required
          disabled={isSubmitting}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <LiquidButton
        type="submit"
        size="xxl"
        className="text-black dark:text-white font-semibold uppercase tracking-wider text-sm sm:text-base shadow-lg shadow-black/5 dark:shadow-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
        data-cursor-hover
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </LiquidButton>
    </form>
  );
}
