// Lib
import { Schema } from 'effect';

export const StrapiRole = Schema.Struct({
  id: Schema.Number,
  type: Schema.String,
});

export const StrapiUser = Schema.Struct({
  id: Schema.Number,
  clerkId: Schema.String,
  email: Schema.String,
  username: Schema.String,
  firstName: Schema.optionalWith(Schema.String, { nullable: true }),
  lastName: Schema.optionalWith(Schema.String, { nullable: true }),
  imageUrl: Schema.optionalWith(Schema.String, { nullable: true }),
  role: StrapiRole,
});

export const StrapiUsersResponse = Schema.Array(StrapiUser);

export type StrapiUser = typeof StrapiUser.Type;
export type StrapiRole = typeof StrapiRole.Type;
