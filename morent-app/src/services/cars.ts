// Lib
import { Data, Effect, ParseResult, Schema } from 'effect';
import qs from 'qs';

// Types
import {
  Car,
  StrapiCarsResponse,
  StrapiCarResponse,
  CarsApiResult,
  GetCarListParams,
  GetCarsParams,
} from '@/types/car';

// Constants
import { PATH, STRAPI_BASE_URL } from '@/constants/route';
import { CAR_ERROR } from '@/constants/error';

export class FetchCarsError extends Data.TaggedError('FetchCarsError')<{
  message: string;
  cause: unknown;
}> {}

export class SchemaDecodeError extends Data.TaggedError('SchemaDecodeError')<{
  message: string;
  cause: ParseResult.ParseError;
}> {}

const fetchAndParseCars = (
  path: string,
  fetchErrorMessage: string,
): Effect.Effect<CarsApiResult, FetchCarsError | SchemaDecodeError> =>
  Effect.tryPromise({
    try: () => fetch(`${STRAPI_BASE_URL}${path}`),
    catch: (cause) => new FetchCarsError({ message: fetchErrorMessage, cause }),
  }).pipe(
    Effect.filterOrFail(
      (res) => res.ok,
      (res) =>
        new FetchCarsError({
          message: fetchErrorMessage,
          cause: res.statusText,
        }),
    ),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.json() as Promise<unknown>,
        catch: (cause) =>
          new FetchCarsError({ message: fetchErrorMessage, cause }),
      }),
    ),
    Effect.flatMap((json) =>
      Schema.decodeUnknown(StrapiCarsResponse)(json).pipe(
        Effect.mapError(
          (e) =>
            new SchemaDecodeError({
              message: CAR_ERROR.PARSE_RESPONSE,
              cause: e,
            }),
        ),
        Effect.map((decoded) => ({
          data: decoded.data,
          pagination: decoded.meta.pagination,
        })),
      ),
    ),
  );

const carsFilterQuery = (
  filters?: GetCarsParams['filters'],
): Record<string, unknown> => {
  if (!filters) return {};

  const strapiFilters: Record<string, unknown> = {};

  if (filters.name) {
    strapiFilters.name = { $containsi: filters.name };
  }

  if (filters.type && filters.type.length > 0) {
    strapiFilters.type = { $in: filters.type };
  }

  if (filters.capacity && filters.capacity.length > 0) {
    strapiFilters.capacity = { $in: filters.capacity };
  }

  if (filters.price?.max !== undefined) {
    strapiFilters.price = { $lte: filters.price.max };
  }

  return strapiFilters;
};

const buildCarsQuery = (params?: GetCarsParams): string =>
  qs.stringify(
    {
      populate: ['image', 'thumbnails'],
      filters: carsFilterQuery(params?.filters),
      pagination: params?.pagination,
      sort: params?.sort,
    },
    { encodeValuesOnly: true },
  );

export const fetchPopularCars = (): Promise<CarsApiResult> =>
  Effect.runPromise(
    fetchAndParseCars(
      `${PATH.CARS_POPULAR}?${buildCarsQuery()}`,
      CAR_ERROR.FETCH_POPULAR,
    ),
  );

export const fetchRecommendationCars = (
  params?: GetCarListParams,
): Promise<CarsApiResult> =>
  Effect.runPromise(
    fetchAndParseCars(
      `${PATH.CARS}?${buildCarsQuery({ pagination: { page: params?.page, pageSize: params?.pageSize } })}`,
      CAR_ERROR.FETCH_RECOMMENDATION,
    ),
  );

export const fetchCars = (params?: GetCarsParams): Promise<CarsApiResult> =>
  Effect.runPromise(
    fetchAndParseCars(
      `${PATH.CARS}?${buildCarsQuery(params)}`,
      CAR_ERROR.FETCH_CARS,
    ),
  );

const fetchAndParseCar = (
  path: string,
  fetchErrorMessage: string,
): Effect.Effect<Car, FetchCarsError | SchemaDecodeError> =>
  Effect.tryPromise({
    try: () => fetch(`${STRAPI_BASE_URL}${path}`),
    catch: (cause) => new FetchCarsError({ message: fetchErrorMessage, cause }),
  }).pipe(
    Effect.filterOrFail(
      (res) => res.ok,
      (res) =>
        new FetchCarsError({
          message: fetchErrorMessage,
          cause: res.statusText,
        }),
    ),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.json() as Promise<unknown>,
        catch: (cause) =>
          new FetchCarsError({ message: fetchErrorMessage, cause }),
      }),
    ),
    Effect.flatMap((json) =>
      Schema.decodeUnknown(StrapiCarResponse)(json).pipe(
        Effect.mapError(
          (e) =>
            new SchemaDecodeError({
              message: CAR_ERROR.PARSE_RESPONSE,
              cause: e,
            }),
        ),
        Effect.map((decoded) => decoded.data),
      ),
    ),
  );

const buildCarQuery = (): string =>
  qs.stringify(
    { populate: ['image', 'thumbnails', 'reviews'] },
    { encodeValuesOnly: true },
  );

export const fetchCarById = (documentId: string): Promise<Car> =>
  Effect.runPromise(
    fetchAndParseCar(
      `${PATH.CAR(documentId)}?${buildCarQuery()}`,
      CAR_ERROR.FETCH_CAR_DETAIL,
    ),
  );
