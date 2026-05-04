// Lib
import { Effect, ParseResult, Schema } from 'effect';

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

// Utils
import {
  buildQuery,
  fetchAndParse,
  makeServiceError,
  SchemaDecodeError,
} from '@/utils/services';

const CAR_LIST_POPULATE = ['image', 'thumbnails'] as const;
const CAR_DETAIL_POPULATE = [...CAR_LIST_POPULATE, 'reviews'] as const;

export class FetchCarsError extends makeServiceError('FetchCarsError') {}

const toFetchCarsError = (message: string) => (cause: unknown) =>
  new FetchCarsError({ message, cause });

const toDecodeError = (e: ParseResult.ParseError) =>
  new SchemaDecodeError({ message: CAR_ERROR.PARSE_RESPONSE, cause: e });

const fetchCarsEndpoint = <A, I>(
  path: string,
  schema: Schema.Schema<A, I>,
  fetchErrorMessage: string,
): Effect.Effect<A, FetchCarsError | SchemaDecodeError> =>
  fetchAndParse(
    `${STRAPI_BASE_URL}${path}`,
    schema,
    toFetchCarsError(fetchErrorMessage),
    toDecodeError,
  );

const fetchAndParseCars = (
  path: string,
  fetchErrorMessage: string,
): Effect.Effect<CarsApiResult, FetchCarsError | SchemaDecodeError> =>
  fetchCarsEndpoint(path, StrapiCarsResponse, fetchErrorMessage).pipe(
    Effect.map((decoded) => ({
      data: decoded.data,
      pagination: decoded.meta.pagination,
    })),
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

const buildCarsQuery = (
  populate: readonly string[],
  params?: GetCarsParams,
): string =>
  buildQuery({
    populate,
    filters: carsFilterQuery(params?.filters),
    pagination: params?.pagination,
    sort: params?.sort,
  });

export const fetchPopularCars = (): Promise<CarsApiResult> =>
  Effect.runPromise(
    fetchAndParseCars(
      `${PATH.CARS_POPULAR}?${buildCarsQuery(CAR_LIST_POPULATE)}`,
      CAR_ERROR.FETCH_POPULAR,
    ),
  );

export const fetchRecommendationCars = (
  params?: GetCarListParams,
): Promise<CarsApiResult> =>
  Effect.runPromise(
    fetchAndParseCars(
      `${PATH.CARS}?${buildCarsQuery(CAR_LIST_POPULATE, { pagination: { page: params?.page, pageSize: params?.pageSize } })}`,
      CAR_ERROR.FETCH_RECOMMENDATION,
    ),
  );

export const fetchCars = (params?: GetCarsParams): Promise<CarsApiResult> =>
  Effect.runPromise(
    fetchAndParseCars(
      `${PATH.CARS}?${buildCarsQuery(CAR_LIST_POPULATE, params)}`,
      CAR_ERROR.FETCH_CARS,
    ),
  );

export const fetchCarById = (documentId: string): Promise<Car> =>
  Effect.runPromise(
    fetchCarsEndpoint(
      `${PATH.CAR(documentId)}?${buildCarsQuery(CAR_DETAIL_POPULATE)}`,
      StrapiCarResponse,
      CAR_ERROR.FETCH_CAR_DETAIL,
    ).pipe(Effect.map((decoded) => decoded.data)),
  );
