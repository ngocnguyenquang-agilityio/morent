// Lib
import { type ComponentType } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Types
import { IconProps } from '@/types/icon';

export type NavItemProps = {
  href: string;
  label: string;
  Icon: ComponentType<IconProps>;
  isActive: boolean;
  disabled?: boolean;
};

export const NavItem = ({
  href,
  label,
  Icon,
  isActive,
  disabled,
}: NavItemProps) => {
  const content = (
    <>
      <span
        className={cn(
          isActive && !disabled && '[&_path]:fill-white [&_path]:stroke-white',
        )}
      >
        <Icon />
      </span>
      <span className="text-base font-medium tracking-[-0.02em]">{label}</span>
    </>
  );

  return (
    <li className="relative flex p-4 items-center">
      {isActive && !disabled && (
        <span className="absolute bottom-[2px] left-4 right-4 top-[2px] rounded-[10px] bg-primary-500" />
      )}
      {disabled ? (
        <span
          aria-disabled
          className="relative flex h-full w-full cursor-not-allowed items-center gap-3 px-8 opacity-40 text-secondary-300"
        >
          {content}
        </span>
      ) : (
        <Link
          href={href}
          className={cn(
            'relative flex h-full w-full items-center gap-3 px-8 text-secondary-300',
            {
              'text-white': isActive,
            },
          )}
        >
          {content}
        </Link>
      )}
    </li>
  );
};
