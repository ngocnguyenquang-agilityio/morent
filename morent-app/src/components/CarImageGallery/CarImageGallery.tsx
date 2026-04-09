'use client';

// Lib
import { useState } from 'react';
import Image from 'next/image';

// Utils
import { cn } from '@/lib/utils';

// Components
import { Button } from '@/components/ui/Button';

export interface CarImageGalleryProps {
  title: string;
  subtitle: string;
  thumbnails: readonly string[];
  className?: string;
}

export const CarImageGallery = ({
  title,
  subtitle,
  thumbnails,
  className,
}: CarImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)}>
      {selectedIndex === 0 ? (
        <div className="relative min-h-[360px] overflow-hidden rounded-[10px] bg-primary-500 p-6">
          <Image
            src="/images/chevrons-bg.png"
            alt=""
            fill
            className="object-cover pointer-events-none"
          />

          <div className="relative z-10 w-full space-y-4">
            <h2 className="text-base font-semibold text-white lg:text-xl">
              {title}
            </h2>
            <p className="text-xs font-medium text-white lg:text-base">
              {subtitle}
            </p>
          </div>

          <Image
            src={thumbnails[0]}
            alt={title}
            width={492}
            height={280}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[75%] h-auto object-contain"
          />
        </div>
      ) : (
        <div className="relative min-h-[360px] overflow-hidden rounded-[10px]">
          <Image
            src={thumbnails[selectedIndex]}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-5">
        {thumbnails.map((thumb, i) => {
          const isSelected = i === selectedIndex;
          const viewLabel = `${title} view ${i + 1}`;

          return (
            <Button
              key={i}
              variant="ghost"
              onClick={() => setSelectedIndex(i)}
              aria-label={viewLabel}
              aria-pressed={isSelected}
              className={cn(
                'h-[64px] lg:h-[124px] w-full rounded-[10px] hover:bg-transparent dark:hover:bg-transparent transition-none border-2 border-transparent p-0 opacity-70',
                {
                  'border-primary-500 p-2 opacity-100': isSelected,
                },
              )}
            >
              <div
                className={cn(
                  'relative h-full w-full overflow-hidden rounded-[8px]',
                  {
                    'rounded-[2px]': isSelected,
                  },
                )}
              >
                {!i ? (
                  <>
                    <div className="absolute inset-0 bg-primary-500" />
                    <Image
                      src="/images/chevrons-bg.png"
                      alt=""
                      fill
                      className="object-cover pointer-events-none"
                    />
                    <Image
                      src={thumb}
                      alt={viewLabel}
                      width={492}
                      height={280}
                      className="relative z-10 h-full w-full object-contain p-1"
                    />
                  </>
                ) : (
                  <Image
                    src={thumb}
                    alt={viewLabel}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
