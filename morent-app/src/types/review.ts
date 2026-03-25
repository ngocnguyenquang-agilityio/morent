import { Schema } from 'effect';

export const Review = Schema.Struct({
  avatar: Schema.String,
  name: Schema.String,
  title: Schema.String,
  date: Schema.String,
  rating: Schema.Number,
  comment: Schema.String,
});

export type Review = typeof Review.Type;
