// Lib
import { Data, Effect, ParseResult, Schema } from 'effect';
import qs from 'qs';

// Types
import {
  Rental,
  StrapiRentalsResponse,
  RentalsApiResult,
} from '@/types/rental';

// Constants
import { PATH, STRAPI_BASE_URL } from '@/constants/route';
import { RENTAL_ERROR } from '@/constants/error';

export class FetchRentalsError extends Data.TaggedError('FetchRentalsError')<{
  message: string;
  cause: unknown;
}> {}

export class SchemaDecodeError extends Data.TaggedError('SchemaDecodeError')<{
  message: string;
  cause: ParseResult.ParseError;
}> {}

const fetchAndParseRentals = (
  path: string,
  fetchErrorMessage: string,
): Effect.Effect<RentalsApiResult, FetchRentalsError | SchemaDecodeError> =>
  Effect.tryPromise({
    try: () => fetch(`${STRAPI_BASE_URL}${path}`),
    catch: (cause) =>
      new FetchRentalsError({ message: fetchErrorMessage, cause }),
  }).pipe(
    Effect.filterOrFail(
      (res) => res.ok,
      (res) =>
        new FetchRentalsError({
          message: fetchErrorMessage,
          cause: res.statusText,
        }),
    ),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.json() as Promise<unknown>,
        catch: (cause) =>
          new FetchRentalsError({ message: fetchErrorMessage, cause }),
      }),
    ),
    Effect.flatMap((json) =>
      Schema.decodeUnknown(StrapiRentalsResponse)(json).pipe(
        Effect.mapError(
          (e) =>
            new SchemaDecodeError({
              message: RENTAL_ERROR.PARSE_RESPONSE,
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

const buildRecentRentalsQuery = (): string =>
  qs.stringify(
    {
      populate: ['car.image'],
      sort: ['createdAt:desc'],
      pagination: { page: 1, pageSize: 4 },
    },
    { encodeValuesOnly: true },
  );

const buildLatestRentalQuery = (): string =>
  qs.stringify(
    {
      populate: ['car.image'],
      sort: ['createdAt:desc'],
      pagination: { page: 1, pageSize: 1 },
    },
    { encodeValuesOnly: true },
  );

export const fetchRecentRentals = (): Promise<RentalsApiResult> =>
  Effect.runPromise(
    fetchAndParseRentals(
      `${PATH.RENTALS}?${buildRecentRentalsQuery()}`,
      RENTAL_ERROR.FETCH_RECENT,
    ),
  );

export const fetchLatestRental = (): Promise<Rental | null> =>
  Effect.runPromise(
    fetchAndParseRentals(
      `${PATH.RENTALS}?${buildLatestRentalQuery()}`,
      RENTAL_ERROR.FETCH_LATEST,
    ).pipe(
      Effect.map((result) => (result.data.length > 0 ? result.data[0] : null)),
    ),
  );
