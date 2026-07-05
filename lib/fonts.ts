import { Outfit } from 'next/font/google';

/** Primary site typeface — geometric sans used on most creative/engineering portfolios. */
export const fontSans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
