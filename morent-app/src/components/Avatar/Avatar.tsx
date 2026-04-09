// Lib
import Image from 'next/image';

// Utils
import { cn } from '@/lib/utils';
import { getColorFromName, getInitials } from '@/utils/avatar';

type AvatarProps = {
  imageUrl?: string | null;
  name?: string | null;
  className?: string;
};

export const Avatar = ({ imageUrl, name, className }: AvatarProps) => {
  const baseClasses = cn(
    'size-11 rounded-full overflow-hidden flex items-center justify-center shrink-0',
    className,
  );

  if (imageUrl) {
    return (
      <div className={baseClasses}>
        <Image
          src={imageUrl}
          alt={name ?? 'User avatar'}
          width={44}
          height={44}
          className="size-full object-cover"
        />
      </div>
    );
  }

  if (name) {
    const initials = getInitials(name);
    const bgColor = getColorFromName(name);

    return (
      <div
        className={cn(baseClasses, bgColor, 'text-white text-sm font-semibold')}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        'bg-gradient-to-br from-primary via-primary/80 to-blue-400 shadow-[0_0_12px_rgba(53,99,233,0.45)]',
      )}
    />
  );
};
