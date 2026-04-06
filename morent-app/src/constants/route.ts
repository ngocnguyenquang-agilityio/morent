export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export const ROUTE = {
  HASH: '#',
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  CARS: '/cars',
  CAR_DETAILS: (id: string) => `/cars/${id}`,
  PAYMENT: '/payment',
  DASHBOARD: '/dashboard',
};

export const PATH = {
  CARS: '/api/cars',
  CARS_POPULAR: '/api/cars/popular',
};
