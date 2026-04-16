import type { Location } from '@/types/pickAndDrop';

export const DATE_FORMAT = 'd MMMM yyyy';

export const PICK_DROP_PARAMS = {
  PICK_UP_LOCATION: 'pickUpLocation',
  PICK_UP_DATE: 'pickUpDate',
  PICK_UP_TIME: 'pickUpTime',
  DROP_OFF_LOCATION: 'dropOffLocation',
  DROP_OFF_DATE: 'dropOffDate',
  DROP_OFF_TIME: 'dropOffTime',
} as const;

export const DEFAULT_LOCATIONS: Location[] = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'miami', label: 'Miami' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'denver', label: 'Denver' },
  { value: 'boston', label: 'Boston' },
];
