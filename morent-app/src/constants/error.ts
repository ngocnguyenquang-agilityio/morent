export const USER_ERROR = {
  FETCH_USER: 'Failed to fetch user',
  PARSE_RESPONSE: 'Failed to parse user data from server',
} as const;

export const CAR_ERROR = {
  FETCH_POPULAR: 'Failed to fetch popular cars',
  FETCH_RECOMMENDATION: 'Failed to fetch recommendation cars',
  FETCH_CARS: 'Failed to fetch cars',
  FETCH_CAR_DETAIL: 'Failed to fetch car details',
  PARSE_RESPONSE: 'Failed to parse car data from server',
} as const;

export const RENTAL_ERROR = {
  FETCH_RECENT: 'Failed to fetch recent rentals',

  FETCH_LATEST: 'Failed to fetch latest rental',
  PARSE_RESPONSE: 'Failed to parse rental data from server',
} as const;
