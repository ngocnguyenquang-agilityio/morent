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

export interface CreateRentalParams {
  carDocumentId: string;
  carPrice: number;
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
  strapiUserId: number;
}

export type CreateRentalPayload = Omit<CreateRentalParams, 'strapiUserId'>;

export class CreateRentalError extends Data.TaggedError('CreateRentalError')<{
  message: string;
  cause: unknown;
}> {}

export const createRental = (
  input: CreateRentalParams,
): Effect.Effect<void, CreateRentalError> =>
  Effect.tryPromise({
    try: () =>
      fetch(`${STRAPI_BASE_URL}${PATH.RENTALS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            car: input.carDocumentId,
            user: input.strapiUserId,
            pickUpLocation: input.pickUpLocation,
            pickUpDate: input.pickUpDate,
            pickUpTime: input.pickUpTime,
            dropOffLocation: input.dropOffLocation,
            dropOffDate: input.dropOffDate,
            dropOffTime: input.dropOffTime,
            totalPrice: input.carPrice,
          },
        }),
      }).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      }),
    catch: (cause) =>
      new CreateRentalError({ message: RENTAL_ERROR.CREATE_RENTAL, cause }),
  }).pipe(Effect.asVoid);

export const submitRental = (input: CreateRentalPayload): Promise<void> =>
  Effect.runPromise(
    Effect.tryPromise({
      try: () =>
        fetch(PATH.RENTALS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        }).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }),
      catch: (cause) =>
        new CreateRentalError({ message: RENTAL_ERROR.CREATE_RENTAL, cause }),
    }).pipe(Effect.asVoid),
  );

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

const buildMyRentalsQuery = (strapiUserId: number, page: number): string =>
  qs.stringify(
    {
      filters: { user: { id: { $eq: strapiUserId } } },
      populate: { car: { populate: ['image'] } },
      sort: ['createdAt:desc'],
      pagination: { page, pageSize: 6 },
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

export const fetchMyRentals = (
  strapiUserId: number,
  page: number,
): Promise<RentalsApiResult> =>
  Effect.runPromise(
    Effect.tryPromise({
      try: () =>
        fetch(
          `${STRAPI_BASE_URL}${PATH.RENTALS}?${buildMyRentalsQuery(strapiUserId, page)}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
          },
        ),
      catch: (cause) =>
        new FetchRentalsError({
          message: RENTAL_ERROR.FETCH_MY_RENTALS,
          cause,
        }),
    }).pipe(
      Effect.filterOrFail(
        (res) => res.ok,
        (res) =>
          new FetchRentalsError({
            message: RENTAL_ERROR.FETCH_MY_RENTALS,
            cause: res.statusText,
          }),
      ),
      Effect.flatMap((res) =>
        Effect.tryPromise({
          try: () => res.json() as Promise<unknown>,
          catch: (cause) =>
            new FetchRentalsError({
              message: RENTAL_ERROR.FETCH_MY_RENTALS,
              cause,
            }),
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
    ),
  );
