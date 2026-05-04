// Lib
import { Effect } from 'effect';

// Types
import {
  Rental,
  StrapiRentalsResponse,
  RentalsApiResult,
} from '@/types/rental';

// Constants
import { PATH, STRAPI_BASE_URL } from '@/constants/route';
import { RENTAL_ERROR } from '@/constants/error';

// Utils
import {
  buildQuery,
  fetchAndParse,
  makeServiceError,
  SchemaDecodeError,
} from '@/utils/services';

const RENTAL_LIST_POPULATE = ['car.image'] as const;
const RENTAL_LIST_SORT = ['createdAt:desc'] as const;
const MY_RENTALS_PAGE_SIZE = 6;

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

export class CreateRentalError extends makeServiceError('CreateRentalError') {}

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

export class FetchRentalsError extends makeServiceError('FetchRentalsError') {}

const fetchAndParseRentals = (
  path: string,
  fetchErrorMessage: string,
): Effect.Effect<RentalsApiResult, FetchRentalsError | SchemaDecodeError> =>
  fetchAndParse(
    `${STRAPI_BASE_URL}${path}`,
    StrapiRentalsResponse,
    (cause) => new FetchRentalsError({ message: fetchErrorMessage, cause }),
    (e) =>
      new SchemaDecodeError({ message: RENTAL_ERROR.PARSE_RESPONSE, cause: e }),
  ).pipe(
    // Reshape decoded response into the { data, pagination } result shape
    Effect.map((decoded) => ({
      data: decoded.data,
      pagination: decoded.meta.pagination,
    })),
  );

export const fetchRecentRentals = (): Promise<RentalsApiResult> =>
  Effect.runPromise(
    fetchAndParseRentals(
      `${PATH.RENTALS}?${buildQuery({ populate: RENTAL_LIST_POPULATE, sort: RENTAL_LIST_SORT, pagination: { page: 1, pageSize: 4 } })}`,
      RENTAL_ERROR.FETCH_RECENT,
    ),
  );

export const fetchLatestRental = (): Promise<Rental | null> =>
  Effect.runPromise(
    fetchAndParseRentals(
      `${PATH.RENTALS}?${buildQuery({ populate: RENTAL_LIST_POPULATE, sort: RENTAL_LIST_SORT, pagination: { page: 1, pageSize: 1 } })}`,
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
    fetchAndParse(
      `${STRAPI_BASE_URL}${PATH.RENTALS}?${buildQuery({ filters: { user: { id: { $eq: strapiUserId } } }, populate: { car: { populate: RENTAL_LIST_POPULATE } }, sort: RENTAL_LIST_SORT, pagination: { page, pageSize: MY_RENTALS_PAGE_SIZE } })}`,
      StrapiRentalsResponse,
      (cause) =>
        new FetchRentalsError({
          message: RENTAL_ERROR.FETCH_MY_RENTALS,
          cause,
        }),
      (e) =>
        new SchemaDecodeError({
          message: RENTAL_ERROR.PARSE_RESPONSE,
          cause: e,
        }),
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } }, // auth header
    ).pipe(
      Effect.map((decoded) => ({
        data: decoded.data,
        pagination: decoded.meta.pagination,
      })),
    ),
  );
