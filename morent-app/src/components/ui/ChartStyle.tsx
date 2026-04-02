import { ChartConfig, THEMES } from '@/types/chart';

export const ChartStyle = ({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme ?? cfg.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  const cssVariables = (theme: string) =>
    colorConfig
      .map(([key, itemConfig]) => {
        const color =
          itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
          itemConfig.color;
        return color ? `  --color-${key}: ${color};` : null;
      })
      .join('\n');

  const cssBlocks = Object.entries(THEMES)
    .map(
      ([theme, prefix]) =>
        `${prefix} [data-chart=${id}] {${cssVariables(theme)}}`,
    )
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: cssBlocks }} />;
};
