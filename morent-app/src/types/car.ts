// Lib
import { Schema } from 'effect';

// Types
import { Review } from './review';
import { PaginationParams } from './common';

// Utils
import { getMediaUrl } from '@/utils/media';

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

const StrapiMedia = Schema.Struct({ url: Schema.String });

const StrapiCarData = Schema.Struct({
  ...Car.fields,
  id: Schema.Number,
  documentId: Schema.String,
  reviews: Schema.optionalWith(Schema.Array(Review), { default: () => [] }),
  image: StrapiMedia,
  thumbnails: Schema.Array(StrapiMedia),
});

const TransformCarData = Schema.transform(StrapiCarData, Car, {
  strict: false,
  decode: ({ image, thumbnails, ...rest }) => ({
    ...rest,
    image: getMediaUrl(image.url),
    thumbnails: thumbnails.map((t) => getMediaUrl(t.url)),
  }),
  encode: ({ image, thumbnails, ...rest }) => ({
    ...rest,
    id: 0,
    documentId: '',
    image: { url: image },
    thumbnails: thumbnails.map((url) => ({ url })),
  }),
});

export const StrapiCarsResponse = Schema.Struct({
  data: Schema.Array(TransformCarData),
  meta: Schema.Struct({
    pagination: Schema.Struct({
      page: Schema.Number,
      pageSize: Schema.Number,
      pageCount: Schema.Number,
      total: Schema.Number,
    }),
  }),
});

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface GetCarsParams {
  filters?: {
    type?: string;
    steering?: string;
    capacity?: number;
    price?: { min?: number; max?: number };
  };
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
}

export type GetCarListParams = PaginationParams;

export interface CarsApiResult {
  data: ReadonlyArray<Car>;
  pagination: PaginationMeta;
}
