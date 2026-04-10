// Lib
import { Schema } from 'effect';

// Types
import { CarType } from './car';
import { PaginationMeta } from './car';

// Utils
import { getMediaUrl } from '@/utils/media';

const StrapiMedia = Schema.Struct({ url: Schema.String });

const RentalCarRaw = Schema.Struct({
  documentId: Schema.String,
  name: Schema.String,
  type: CarType,
  image: StrapiMedia,
});

const RentalCar = Schema.Struct({
  documentId: Schema.String,
  name: Schema.String,
  type: CarType,
  image: Schema.String,
});

export type RentalCar = typeof RentalCar.Type;

const TransformRentalCar = Schema.transform(RentalCarRaw, RentalCar, {
  strict: false,
  decode: ({ image, ...rest }) => ({
    ...rest,
    image: getMediaUrl(image.url),
  }),
  encode: ({ image, ...rest }) => ({
    ...rest,
    image: { url: image },
  }),
});

const StrapiRentalData = Schema.Struct({
  documentId: Schema.String,
  car: TransformRentalCar,
  pickUpLocation: Schema.String,
  pickUpDate: Schema.String,
  pickUpTime: Schema.String,
  dropOffLocation: Schema.String,
  dropOffDate: Schema.String,
  dropOffTime: Schema.String,
  totalPrice: Schema.Number,
  createdAt: Schema.String,
});

export const Rental = StrapiRentalData;
export type Rental = Schema.Schema.Type<typeof Rental>;

export const StrapiRentalsResponse = Schema.Struct({
  data: Schema.Array(StrapiRentalData),
  meta: Schema.Struct({
    pagination: Schema.Struct({
      page: Schema.Number,
      pageSize: Schema.Number,
      pageCount: Schema.Number,
      total: Schema.Number,
    }),
  }),
});

export interface RentalsApiResult {
  data: ReadonlyArray<Rental>;
  pagination: PaginationMeta;
}
