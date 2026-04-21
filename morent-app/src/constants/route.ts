export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export const ROUTE = {
  HASH: '#',
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  CARS: '/cars',
  CAR_DETAILS: (id: string) => `/cars/${id}`,
  PAYMENT: (carId: string) => `/cars/${carId}/payment`,
  DASHBOARD: '/dashboard',
  RENTED_LIST: '/rented-list',
  SIGN_IN_REDIRECT: (params: string) => `/sign-in?redirect_url=${params}`,
};

export const PATH = {
  CARS: '/api/cars',
  CARS_POPULAR: '/api/cars/popular',
  CAR: (documentId: string) => `/api/cars/${documentId}`,
  RENTALS: '/api/rentals',
  USERS: '/api/users',
};
