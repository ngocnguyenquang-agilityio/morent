'use client';

// Lib
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Components
import {
  FilterIcon,
  HeartIcon,
  MenuIcon,
  NotificationIcon,
  SettingIcon,
} from '@/components/icons';
import { Avatar } from '@/components/Avatar';
import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/ui';

// Constants
import { ROUTE } from '@/constants/route';

// Stores
import { useFilterSidebarStore } from '@/stores/filterSidebar';

// Hooks
import { useDebounce } from '@/hooks/useDebounce';

type HeaderProps = {
  onMenuClick?: () => void;
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  const router = useRouter();
  const openFilter = useFilterSidebarStore((state) => state.open);
  const [searchValue, setSearchValue] = useState('');

  /** Navigates to the cars listing page with an optional `name` query param. */
  const navigateWithSearch = (name: string) => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);

    const query = params.toString();
    router.push(`${ROUTE.CARS}${query ? `?${query}` : ''}`);
  };

  const debouncedNavigate = useDebounce(navigateWithSearch);

  /** Syncs the search input state and triggers a debounced navigation. */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedNavigate(value);
  };

  return (
    <header className="bg-white border-b border-secondary-100/40">
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between px-8 xl:pl-[60px] xl:pr-8 py-10">
        <div className="flex items-center w-full gap-[64px]">
          <Link
            href={ROUTE.HOME}
            className="text-primary text-xl font-bold leading-none tracking-tight"
          >
            MORENT
          </Link>

          <SearchInput
            className="rounded-full px-5 py-2 w-full max-w-[492px] mx-8 xl:ml-16"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="icon"
            size="icon-xl"
            icon={HeartIcon}
            aria-label="Favorites"
            iconClassName="fill-[#3D5278]"
          />
          <Button
            type="button"
            variant="icon"
            size="icon-xl"
            icon={NotificationIcon}
            aria-label="Notifications"
          >
            <span className="absolute top-2 right-2 size-[10px] bg-[#FF4423] rounded-full border-2 border-white" />
          </Button>
          <Button
            type="button"
            variant="icon"
            size="icon-xl"
            icon={SettingIcon}
            aria-label="Settings"
          />
          <Avatar />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          {onMenuClick && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              icon={MenuIcon}
              aria-label="Menu"
              onClick={onMenuClick}
            />
          )}
          <div className="ml-auto">
            <Avatar />
          </div>
        </div>

        <div className="px-6 pb-4">
          <Link
            href={ROUTE.HOME}
            className="text-primary text-2xl font-bold leading-none tracking-tight"
          >
            MORENT
          </Link>
        </div>

        <div className="flex items-center gap-4 px-6 pb-6">
          <SearchInput
            className="rounded-xl px-4 py-3 flex-1"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Button
            type="button"
            variant="icon"
            size="icon-xl"
            icon={FilterIcon}
            aria-label="Filter"
            className="rounded-lg"
            onClick={openFilter}
          />
        </div>
      </div>
    </header>
  );
};
