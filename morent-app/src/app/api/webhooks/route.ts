import { Data, Effect } from 'effect';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

import { STRAPI_BASE_URL } from '@/constants/route';

interface ClerkUserData {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  image_url: string | null;
}

class WebhookVerificationError extends Data.TaggedError(
  'WebhookVerificationError',
)<{
  cause: unknown;
}> {}

class StrapiSyncError extends Data.TaggedError('StrapiSyncError')<{
  message: string;
  cause: unknown;
}> {}

interface StrapiRole {
  id: number;
  type: string;
}

const handleStrapiResponse = (
  res: Response,
): Effect.Effect<unknown, StrapiSyncError> =>
  res.ok
    ? Effect.tryPromise({
        try: () => res.json() as Promise<unknown>,
        catch: (cause) =>
          new StrapiSyncError({ message: 'Failed to parse response', cause }),
      })
    : Effect.tryPromise({
        try: () => res.json() as Promise<unknown>,
        catch: () =>
          new StrapiSyncError({
            message: `Strapi responded with ${res.status}`,
            cause: res.statusText,
          }),
      }).pipe(
        Effect.flatMap((body) =>
          Effect.fail(
            new StrapiSyncError({
              message: `Strapi responded with ${res.status}`,
              cause: body,
            }),
          ),
        ),
      );

const fetchAuthenticatedRoleId = (): Effect.Effect<number, StrapiSyncError> =>
  Effect.tryPromise({
    try: () => fetch(`${STRAPI_BASE_URL}/api/users-permissions/roles`),
    catch: (cause) =>
      new StrapiSyncError({ message: 'Failed to fetch roles', cause }),
  }).pipe(
    Effect.flatMap(handleStrapiResponse),
    Effect.map((data) => {
      const roles = (data as { roles: StrapiRole[] }).roles;
      const authenticated = roles.find((r) => r.type === 'authenticated');
      return authenticated?.id ?? 1;
    }),
  );

const syncUserToStrapi = (
  userData: ClerkUserData,
): Effect.Effect<void, StrapiSyncError> => {
  const email = userData.email_addresses[0]?.email_address ?? '';
  const username = userData.username ?? userData.id;

  return fetchAuthenticatedRoleId().pipe(
    Effect.flatMap((roleId) =>
      Effect.tryPromise({
        try: () =>
          fetch(`${STRAPI_BASE_URL}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkId: userData.id,
              email,
              username,
              firstName: userData.first_name,
              lastName: userData.last_name,
              imageUrl: userData.image_url,
              password: userData.id,
              confirmed: true,
              role: roleId,
            }),
          }),
        catch: (cause) =>
          new StrapiSyncError({ message: 'Failed to reach Strapi', cause }),
      }),
    ),
    Effect.flatMap(handleStrapiResponse),
    Effect.asVoid,
  );
};

const handleWebhook = (
  req: NextRequest,
): Effect.Effect<Response, WebhookVerificationError | StrapiSyncError> =>
  Effect.tryPromise({
    try: () => verifyWebhook(req),
    catch: (cause) => new WebhookVerificationError({ cause }),
  }).pipe(
    Effect.flatMap((evt) => {
      if (evt.type === 'user.created') {
        return syncUserToStrapi(evt.data as ClerkUserData).pipe(
          Effect.map(
            () => new Response('User synced to Strapi', { status: 200 }),
          ),
        );
      }

      return Effect.succeed(new Response('Webhook received', { status: 200 }));
    }),
  );

export const POST = (req: NextRequest): Promise<Response> =>
  Effect.runPromise(
    handleWebhook(req).pipe(
      Effect.catchAll((error) =>
        Effect.sync(() => {
          console.error(`Webhook error [${error._tag}]:`, error);
          const status = error._tag === 'WebhookVerificationError' ? 400 : 500;
          return new Response(error._tag, { status });
        }),
      ),
    ),
  );
