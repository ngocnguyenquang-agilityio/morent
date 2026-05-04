// Lib
import { Effect } from 'effect';

// Types
import { StrapiUser, StrapiUsersResponse } from '@/types/user';

// Constants
import { PATH, STRAPI_BASE_URL } from '@/constants/route';
import { USER_ERROR } from '@/constants/error';

// Utils
import {
  buildQuery,
  fetchAndParse,
  makeServiceError,
  SchemaDecodeError,
} from '@/utils/services';

export class FetchUserError extends makeServiceError('FetchUserError') {}

export const fetchStrapiUserByClerkId = (
  clerkId: string,
): Promise<StrapiUser | null> =>
  Effect.runPromise(
    fetchAndParse(
      `${STRAPI_BASE_URL}${PATH.USERS}?${buildQuery({ filters: { clerkId: { $eq: clerkId } }, populate: ['role'] })}`,
      StrapiUsersResponse,
      (cause) => new FetchUserError({ message: USER_ERROR.FETCH_USER, cause }),
      (e) =>
        new SchemaDecodeError({ message: USER_ERROR.PARSE_RESPONSE, cause: e }),
    ).pipe(
      Effect.map((users) => (users.length > 0 ? users[0] : null)), // return first or null
      Effect.catchAll((error) => {
        console.error(`Failed to fetch Strapi user [${error._tag}]:`, error);
        return Effect.succeed(null);
      }),
    ),
  );
