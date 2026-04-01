import { CalendarIcon } from '@/components/icons/Calendar';
import { CarIcon } from '@/components/icons/Car';
import { ChartIcon } from '@/components/icons/Chart';
import { EmptyWalletIcon } from '@/components/icons/EmptyWallet';
import { HomeIcon } from '@/components/icons/Home';
import { InfoCircleIcon } from '@/components/icons/InfoCircle';
import { MessageIcon } from '@/components/icons/Message';
import { SettingAdminIcon } from '@/components/icons/SettingAdmin';
import { NavItemProps } from '@/components/NavItem/NavItem';

export type NavItemConfig = Omit<NavItemProps, 'isActive'>;

export const MAIN_MENU_ITEMS: NavItemConfig[] = [
  { href: '/dashboard', label: 'Dashboard', Icon: HomeIcon },
  { href: '/car-rent', label: 'Car Rent', Icon: CarIcon },
  { href: '/insight', label: 'Insight', Icon: ChartIcon },
  { href: '/reimburse', label: 'Reimburse', Icon: EmptyWalletIcon },
  { href: '/inbox', label: 'Inbox', Icon: MessageIcon },
  { href: '/calender', label: 'Calender', Icon: CalendarIcon },
];

export const PREFERENCE_ITEMS: NavItemConfig[] = [
  { href: '/settings', label: 'Settings', Icon: SettingAdminIcon },
  { href: '/help', label: 'Help & Center', Icon: InfoCircleIcon },
];
