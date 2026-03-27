// Lib
import { Schema } from 'effect';

// Types
import { Review } from './review';

export enum HeroBannerVariant {
  Blue = 'blue',
  Dark = 'dark',
}

export const CarType = Schema.Literal(
  'Sport',
  'SUV',
  'MPV',
  'Sedan',
  'Coupe',
  'Hatchback',
);

export const Steering = Schema.Literal('Manual', 'Electric');

export const Car = Schema.Struct({
  name: Schema.String,
  description: Schema.String,
  type: CarType,
  steering: Steering,
  price: Schema.Number,
  capacity: Schema.Number,
  gasoline: Schema.Number,
  rate: Schema.Number,
  reviewer: Schema.Number,
  reviews: Schema.Array(Review),
  favorite: Schema.Boolean,
  discount: Schema.Number,
  image: Schema.String,
  title: Schema.String,
  subtitle: Schema.String,
  thumbnails: Schema.Array(Schema.String),
});

export type Car = typeof Car.Type;
export type CarType = typeof CarType.Type;
export type Steering = typeof Steering.Type;
