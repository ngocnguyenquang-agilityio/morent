// Lib
import { Schema } from 'effect';

const nonEmptyString = (message: string) =>
  Schema.NonEmptyString.annotations({ message: () => message });

const PickUpSectionSchema = Schema.Struct({
  location: nonEmptyString('Pick-up location is required'),
  date: Schema.DateFromSelf.annotations({
    message: () => 'Pick-up date is required',
  }),
  time: nonEmptyString('Pick-up time is required'),
});

const DropOffSectionSchema = Schema.Struct({
  location: nonEmptyString('Drop-off location is required'),
  date: Schema.DateFromSelf.annotations({
    message: () => 'Drop-off date is required',
  }),
  time: nonEmptyString('Drop-off time is required'),
});

export const PaymentFormSchema = Schema.Struct({
  // Pick-up / Drop-off (synced from PickAndDrop via onChange → setValue)
  pickUp: PickUpSectionSchema,
  dropOff: DropOffSectionSchema,
  // Billing
  name: Schema.NonEmptyString.annotations({
    message: () => 'Name is required',
  }).pipe(
    Schema.minLength(2, {
      message: () => 'Name must be at least 2 characters',
    }),
  ),
  address: nonEmptyString('Address is required'),
  phoneNumber: nonEmptyString('Phone number is required'),
  city: nonEmptyString('City is required'),
  // Payment
  cardNumber: nonEmptyString('Card number is required'),
  cardHolder: nonEmptyString('Cardholder name is required'),
  expirationDate: nonEmptyString('Expiration date is required'),
  cvc: nonEmptyString('CVC is required'),
  // Confirmation
  agreeMarketing: Schema.Boolean,
  agreeTerms: Schema.Literal(true).annotations({
    message: () => 'You must agree to terms',
  }),
});

export type PaymentFormValues = typeof PaymentFormSchema.Type;
