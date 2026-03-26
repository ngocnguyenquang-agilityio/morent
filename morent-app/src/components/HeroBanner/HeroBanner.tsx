// Lib
import Image from 'next/image';

// Components
import { Button } from '@/components/ui';

// Utils
import { cn } from '@/lib/utils';

// Types
import { HeroBannerVariant } from '@/types/car';

interface HeroBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  variant?: HeroBannerVariant;
  className?: string;
}

export const HeroBanner = ({
  title,
  description,
  imageUrl,
  variant = HeroBannerVariant.Blue,
  className,
}: HeroBannerProps) => {
  const isDarkVariant = variant === HeroBannerVariant.Dark;

  return (
    <section
      className={cn(
        'relative max-h-[232px] max-w-[327px] min-h-[232px] overflow-hidden rounded-[10px] lg:max-h-[360px] lg:max-w-[640px] lg:w-full lg:min-h-[360px] bg-information-500',
        {
          'bg-primary-500': isDarkVariant,
        },
        className,
      )}
    >
      {/* Decorative background */}
      <Image
        src={isDarkVariant ? '/images/chevrons-bg.png' : '/images/rings-bg.png'}
        alt="Background"
        fill
        className="object-cover"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[60%] p-4 lg:max-w-[55%] lg:p-6">
        <h2 className="text-base font-semibold leading-snug text-white lg:text-xl lg:leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-xs font-medium text-white/70 leading-relaxed lg:mt-4 lg:text-base">
          {description}
        </p>
        <Button
          className={cn(
            'mt-4 h-9 rounded-[4px] px-5 text-xs font-semibold text-white lg:mt-5 lg:h-11 lg:text-base bg-primary-500 hover:bg-primary-600',
            {
              'bg-information-500 hover:bg-information-400': isDarkVariant,
            },
          )}
        >
          Rental Car
        </Button>
      </div>

      {/* Car image */}
      <Image
        src={imageUrl}
        alt={title}
        width={406}
        height={116}
        className="absolute bottom-0 right-4 h-auto w-[50%] object-contain lg:right-20 lg:w-[55%]"
      />
    </section>
  );
};
