'use client';

// Lib
import { PieChart, Pie } from 'recharts';

// Components
import { Button } from '@/components/ui/Button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui';

// Constants
import { CAR_DATA } from '@/constants/car';

// Types
import { ChartConfig } from '@/types/chart';

const chartConfig = CAR_DATA.reduce<ChartConfig>((acc, item) => {
  acc[item.label] = { label: item.label, color: item.color };
  return acc;
}, {});

const chartData = CAR_DATA.map((item) => ({
  name: item.label,
  value: item.value,
  fill: item.color,
}));

export const TopCars = () => {
  const totalCar = CAR_DATA.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 w-full max-w-[524px] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base lg:text-lg font-bold text-secondary-500">
          Top 5 Car Rental
        </h2>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-secondary-300 text-base tracking-tight leading-none"
        >
          •••
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
        <div className="relative w-full max-w-[220px] mx-auto md:mx-0 shrink-0">
          <ChartContainer config={chartConfig} className="aspect-square w-full">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="name" hideLabel />}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              />
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[22px] font-bold text-secondary-500 leading-tight">
              {totalCar.toLocaleString()}
            </span>
            <span className="text-xs text-secondary-300 mt-1">Rental Car</span>
          </div>
        </div>

        <ul className="mt-6 md:mt-0 flex flex-col gap-4 flex-1">
          {CAR_DATA.map((item) => (
            <li key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-secondary-300">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-secondary-500">
                {item.value.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
