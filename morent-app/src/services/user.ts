// Lib
import { Data, Effect, Schema } from 'effect';
import qs from 'qs';

// Types
import { StrapiUser, StrapiUsersResponse } from '@/types/user';

// Constants
import { PATH, STRAPI_BASE_URL } from '@/constants/route';
import { USER_ERROR } from '@/constants/error';

export class FetchUserError extends Data.TaggedError('FetchUserError')<{
  message: string;
  cause: unknown;
}> {}

export class SchemaDecodeError extends Data.TaggedError('SchemaDecodeError')<{
  message: string;
  cause: unknown;
}> {}

const buildUserQuery = (clerkId: string): string =>
  qs.stringify(
    {
      filters: { clerkId: { $eq: clerkId } },
      populate: ['role'],
    },
    { encodeValuesOnly: true },
  );

export const fetchStrapiUserByClerkId = (
  clerkId: string,
): Promise<StrapiUser | null> =>
  Effect.runPromise(
    Effect.tryPromise({
      try: () =>
        fetch(`${STRAPI_BASE_URL}${PATH.USERS}?${buildUserQuery(clerkId)}`),
      catch: (cause) =>
        new FetchUserError({ message: USER_ERROR.FETCH_USER, cause }),
    }).pipe(
      Effect.filterOrFail(
        (res) => res.ok,
        (res) =>
          new FetchUserError({
            message: USER_ERROR.FETCH_USER,
            cause: res.statusText,
          }),
      ),
      Effect.flatMap((res) =>
        Effect.tryPromise({
          try: () => res.json() as Promise<unknown>,
          catch: (cause) =>
            new FetchUserError({ message: USER_ERROR.FETCH_USER, cause }),
        }),
      ),
      Effect.flatMap((json) =>
        Schema.decodeUnknown(StrapiUsersResponse)(json).pipe(
          Effect.mapError(
            (e) =>
              new SchemaDecodeError({
                message: USER_ERROR.PARSE_RESPONSE,
                cause: e,
              }),
          ),
        ),
      ),
      Effect.map((users) => (users.length > 0 ? users[0] : null)),
      Effect.catchAll((error) => {
        console.error(`Failed to fetch Strapi user [${error._tag}]:`, error);
        return Effect.succeed(null);
      }),
    ),
  );
