import { GetCarListParams, GetCarsParams } from '@/types/car';

export const CAR_KEYS = {
  ALL: ['cars'] as const,
  POPULAR: () => [...CAR_KEYS.ALL, 'popular'] as const,
  RECOMMENDATION: (params?: GetCarListParams) =>
    [...CAR_KEYS.ALL, 'recommendation', params] as const,
  LIST: (params?: GetCarsParams) => [...CAR_KEYS.ALL, 'list', params] as const,
};
