// Types
import type { ReactNode, ComponentType } from 'react';

export const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;
