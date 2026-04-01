'use client';

// Lib
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Components
import { BriefcaseIcon } from '@/components/icons/Briefcase';
import { LogoutIcon } from '@/components/icons/Logout';
import { MoonIcon } from '@/components/icons/Moon';
import { SunIcon } from '@/components/icons/Sun';
import { NavItem } from '@/components/NavItem/NavItem';
import { Button } from '@/components/ui/Button';

// Constants
import { MAIN_MENU_ITEMS, PREFERENCE_ITEMS } from '@/constants/navigation';

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={cn(
          'flex h-full w-[286px] shrink-0 flex-col border-r border-[#f3f5f7] bg-white py-9',
          'fixed inset-y-0 left-0 z-30 transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex-1 overflow-y-auto space-y-[60px]">
          {/* Main Menu */}
          <section>
            <p className="mb-7 px-8 text-xs font-semibold tracking-[-0.02em] text-[#94A7CB]/40 uppercase">
              Main menu
            </p>
            <ul className="flex flex-col">
              {MAIN_MENU_ITEMS.map(({ href, label, Icon }) => (
                <NavItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                />
              ))}
            </ul>
          </section>

          {/* Preferences */}
          <section>
            <p className="mb-7 px-8 text-xs font-semibold tracking-[-0.02em] text-[#94A7CB]/40 uppercase">
              Preferences
            </p>
            <ul className="flex flex-col">
              {PREFERENCE_ITEMS.map(({ href, label, Icon }) => (
                <NavItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                />
              ))}

              {/* Dark Mode toggle row */}
              <li className="relative flex p-4 items-center justify-between">
                <div className="flex items-center gap-3 px-8 text-secondary-300">
                  <BriefcaseIcon />
                  <span className="text-base font-medium tracking-[-0.02em]">
                    Dark Mode
                  </span>
                </div>
                <button
                  onClick={handleToggleDarkMode}
                  className="relative flex items-center rounded-full bg-[#f6f7f9]"
                  aria-label="Toggle dark mode"
                  type="button"
                >
                  <span
                    className={cn(
                      'absolute h-7 w-7 rounded-full bg-primary-500 transition-transform duration-200 translate-x-[3px]',
                      {
                        'translate-x-[37px]': isDarkMode,
                      },
                    )}
                  />
                  <span
                    className={cn(
                      'relative z-10 ml-[3px] flex h-7 w-7 items-center justify-center',
                      {
                        '[&_path]:fill-secondary-300 [&_path]:stroke-secondary-300':
                          isDarkMode,
                      },
                    )}
                  >
                    <SunIcon />
                  </span>
                  <span
                    className={cn(
                      'relative z-10 ml-auto mr-[3px] flex h-7 w-7 items-center justify-center',
                      {
                        '[&_path]:stroke-white': isDarkMode,
                      },
                    )}
                  >
                    <MoonIcon />
                  </span>
                </button>
              </li>
            </ul>
          </section>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          className="flex shrink-0 items-center gap-3 px-8 text-secondary-300 h-auto rounded-none justify-start"
        >
          <LogoutIcon />
          <span className="text-base font-medium tracking-[-0.02em]">
            Log Out
          </span>
        </Button>
      </nav>
    </>
  );
};
