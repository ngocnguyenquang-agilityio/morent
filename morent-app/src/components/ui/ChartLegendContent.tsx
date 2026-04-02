// Types
import type { ComponentProps } from 'react';
import type { DefaultLegendContentProps } from 'recharts';

// Utils
import { cn } from '@/lib/utils';
import { getPayloadConfigFromPayload } from '@/lib/chartUtils';

// Hooks
import { useChart } from './ChartContainer';

export const ChartLegendContent = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: ComponentProps<'div'> & {
  hideIcon?: boolean;
  nameKey?: string;
} & DefaultLegendContentProps) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 pt-3',
        {
          'pb-3': verticalAlign === 'top',
        },
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== 'none')
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
};
