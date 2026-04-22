// Lib
import Link from 'next/link';

// Constant
import { ROUTE } from '@/constants/route';

// Util
import { cn } from '@/lib/utils';

const footerLinks = {
  About: ['How it works', 'Featured', 'Partnership', 'Bussiness Relation'],
  Community: ['Events', 'Blog', 'Podcast', 'Invite a friend'],
  Socials: ['Discord', 'Instagram', 'Twitter', 'Facebook'],
} as const;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="px-6 lg:px-8 xl:px-[60px] pt-8 lg:pt-20 pb-6 lg:pb-[60px]">
        <div className="lg:flex lg:justify-between">
          <div className="lg:max-w-[292px]">
            <Link
              href={ROUTE.HOME}
              className="text-primary text-[24px] lg:text-xl font-bold leading-none tracking-tight"
            >
              MORENT
            </Link>
            <p className="mt-3 lg:mt-4 text-secondary-300 text-xs lg:text-base leading-relaxed">
              Our vision is to provide convenience
              <br />
              and help increase your sales business.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-10 mt-10 lg:mt-0 lg:flex lg:gap-[60px]">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div
                key={title}
                className={cn(
                  'lg:min-w-[152px]',
                  title === 'Community' && 'order-1 lg:order-none col-span-2',
                )}
              >
                <h3 className="text-lg font-semibold text-secondary mb-4 lg:mb-6">
                  {title}
                </h3>
                <ul className="space-y-3 lg:space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href={ROUTE.HASH}
                        className="text-base text-secondary-300 hover:text-secondary-500 transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="hidden lg:block border-secondary-100/40 mt-16 mb-8" />

        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between mt-10 lg:mt-0">
          <p className="mt-8 lg:mt-0 text-xs lg:text-base font-semibold text-secondary-500">
            ©{currentYear} MORENT. All rights reserved
          </p>
          <div className="flex items-center justify-between lg:gap-[60px]">
            <Link
              href={ROUTE.HASH}
              className="text-xs lg:text-base font-semibold text-secondary-500 hover:text-secondary-400 transition-colors"
            >
              Privacy & Policy
            </Link>
            <Link
              href={ROUTE.HASH}
              className="text-xs lg:text-base font-semibold text-secondary-500 hover:text-secondary-400 transition-colors"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
