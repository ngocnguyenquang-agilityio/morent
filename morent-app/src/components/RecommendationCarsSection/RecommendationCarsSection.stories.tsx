// Lib
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { RecommendationCarsSection } from './RecommendationCarsSection';

// Constants
import { CAR_KEYS } from '@/constants/queryKeys';
import { DEFAULT_PAGE_SIZE, RECOMMENDATION_CARS } from '@/constants/car';

const meta = {
  title: 'Components/RecommendationCarsSection',
  component: RecommendationCarsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RecommendationCarsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const queryKey = CAR_KEYS.RECOMMENDATION({ pageSize: DEFAULT_PAGE_SIZE });

const firstPage = {
  data: RECOMMENDATION_CARS,
  pagination: { page: 1, pageSize: 8, pageCount: 2, total: 16 },
};

const lastPage = {
  data: RECOMMENDATION_CARS,
  pagination: { page: 2, pageSize: 8, pageCount: 2, total: 16 },
};

export const Default: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
      });
      queryClient.setQueryData(queryKey, {
        pages: [firstPage],
        pageParams: [1],
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export const WithMorePages: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
      });
      queryClient.setQueryData(queryKey, {
        pages: [firstPage, lastPage],
        pageParams: [1, 2],
      });
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
        queryKey,
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
        queryKey,
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
