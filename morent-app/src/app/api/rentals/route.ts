import { Data, Effect } from 'effect';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { fetchStrapiUserByClerkId } from '@/services/user';
import { createRental } from '@/services/rentals';
import { RENTAL_ERROR } from '@/constants/error';

class AuthError extends Data.TaggedError('AuthError')<{
  message: string;
}> {}

class UserNotFoundError extends Data.TaggedError('UserNotFoundError')<{
  message: string;
}> {}

const toDateString = (date: string): string =>
  new Date(date).toISOString().split('T')[0];

export const POST = (req: NextRequest): Promise<NextResponse> =>
  Effect.runPromise(
    Effect.gen(function* () {
      const { userId } = yield* Effect.tryPromise({
        try: () => auth(),
        catch: () => new AuthError({ message: RENTAL_ERROR.CREATE_RENTAL }),
      });

      if (!userId) {
        return yield* Effect.fail(
          new AuthError({ message: RENTAL_ERROR.CREATE_RENTAL }),
        );
      }

      const strapiUser = yield* Effect.tryPromise({
        try: () => fetchStrapiUserByClerkId(userId),
        catch: () =>
          new UserNotFoundError({ message: RENTAL_ERROR.CREATE_RENTAL }),
      });

      if (!strapiUser) {
        return yield* Effect.fail(
          new UserNotFoundError({ message: RENTAL_ERROR.CREATE_RENTAL }),
        );
      }

      const body = yield* Effect.tryPromise({
        try: () => req.json() as Promise<Record<string, string | number>>,
        catch: () => new AuthError({ message: RENTAL_ERROR.CREATE_RENTAL }),
      });

      yield* createRental({
        carDocumentId: body.carDocumentId as string,
        carPrice: body.carPrice as number,
        pickUpLocation: body.pickUpLocation as string,
        pickUpDate: toDateString(body.pickUpDate as string),
        pickUpTime: body.pickUpTime as string,
        dropOffLocation: body.dropOffLocation as string,
        dropOffDate: toDateString(body.dropOffDate as string),
        dropOffTime: body.dropOffTime as string,
        strapiUserId: strapiUser.id,
      });

      return NextResponse.json({ success: true }, { status: 201 });
    }).pipe(
      Effect.catchAll((error) => {
        console.error(`[POST /api/rentals] failed [${error._tag}]:`, error);
        const status =
          error._tag === 'AuthError' || error._tag === 'UserNotFoundError'
            ? 401
            : 500;
        return Effect.succeed(
          NextResponse.json(
            { success: false, error: error.message },
            { status },
          ),
        );
      }),
    ),
  );
