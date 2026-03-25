import type { Preview } from '@storybook/nextjs-vite';
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google';
import React from 'react';
import '../src/app/globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className={`${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
