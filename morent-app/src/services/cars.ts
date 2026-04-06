// Lib
import { Data, Effect, ParseResult, Schema } from 'effect';
import qs from 'qs';

// Types
import {
  StrapiCarsResponse,
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

const buildCarsQuery = (params?: object): string =>
  qs.stringify(
    { populate: ['image', 'thumbnails'], ...params },
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
