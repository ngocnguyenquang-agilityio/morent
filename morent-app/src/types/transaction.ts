import { Schema } from 'effect';

export const Transaction = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  type: Schema.String,
  date: Schema.String,
  price: Schema.Number,
  image: Schema.String,
});

export type Transaction = Schema.Schema.Type<typeof Transaction>;
