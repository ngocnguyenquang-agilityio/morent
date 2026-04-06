// Lib
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { PopularCarsSection } from './PopularCarsSection';

// Constants
import { CAR_KEYS } from '@/constants/queryKeys';
import { POPULAR_CARS } from '@/constants/car';

const meta = {
  title: 'Components/PopularCarsSection',
  component: PopularCarsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PopularCarsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const successData = {
  data: POPULAR_CARS,
  pagination: { page: 1, pageSize: 4, pageCount: 1, total: 4 },
};

export const Default: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
      });
      queryClient.setQueryData(CAR_KEYS.POPULAR(), successData);
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      // Fire-and-forget: synchronously sets the query to pending/fetching state
      queryClient.fetchQuery({
        queryKey: CAR_KEYS.POPULAR(),
        queryFn: () => new Promise<never>(() => {}),
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export const Error: Story = {
  loaders: [
    async () => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      // prefetchQuery catches the rejection and stores the error in cache
      await queryClient.prefetchQuery({
        queryKey: CAR_KEYS.POPULAR(),
        queryFn: () => Promise.reject(new globalThis.Error('Network error')),
        retry: false,
      });
      return { queryClient };
    },
  ],
  decorators: [
    (Story, { loaded: { queryClient } }) => (
      <QueryClientProvider client={queryClient as QueryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};
