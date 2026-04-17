// Lib
import { Schema } from 'effect';

// Constants
import { PAYMENT_MESSAGES, PAYMENT_PATTERNS } from '@/constants/payment';

const nonEmptyString = (message: string) =>
  Schema.NonEmptyString.annotations({ message: () => message });

const PickUpSectionSchema = Schema.Struct({
  location: nonEmptyString(PAYMENT_MESSAGES.PICK_UP_LOCATION_REQUIRED),
  date: Schema.DateFromSelf.annotations({
    message: () => PAYMENT_MESSAGES.PICK_UP_DATE_REQUIRED,
  }),
  time: nonEmptyString(PAYMENT_MESSAGES.PICK_UP_TIME_REQUIRED),
});

const DropOffSectionSchema = Schema.Struct({
  location: nonEmptyString(PAYMENT_MESSAGES.DROP_OFF_LOCATION_REQUIRED),
  date: Schema.DateFromSelf.annotations({
    message: () => PAYMENT_MESSAGES.DROP_OFF_DATE_REQUIRED,
  }),
  time: nonEmptyString(PAYMENT_MESSAGES.DROP_OFF_TIME_REQUIRED),
});

export const PaymentFormSchema = Schema.Struct({
  // Pick-up / Drop-off (synced from PickAndDrop via onChange → setValue)
  pickUp: PickUpSectionSchema,
  dropOff: DropOffSectionSchema,
  // Billing
  name: Schema.NonEmptyString.annotations({
    message: () => PAYMENT_MESSAGES.NAME_REQUIRED,
  }).pipe(
    Schema.minLength(2, {
      message: () => PAYMENT_MESSAGES.NAME_MIN_LENGTH,
    }),
  ),
  address: nonEmptyString(PAYMENT_MESSAGES.ADDRESS_REQUIRED),
  phoneNumber: nonEmptyString(PAYMENT_MESSAGES.PHONE_NUMBER_REQUIRED).pipe(
    Schema.pattern(PAYMENT_PATTERNS.PHONE_NUMBER, {
      message: () => PAYMENT_MESSAGES.PHONE_NUMBER_INVALID,
    }),
  ),
  city: nonEmptyString(PAYMENT_MESSAGES.CITY_REQUIRED),
  // Payment
  cardNumber: nonEmptyString(PAYMENT_MESSAGES.CARD_NUMBER_REQUIRED).pipe(
    Schema.pattern(PAYMENT_PATTERNS.CARD_NUMBER, {
      message: () => PAYMENT_MESSAGES.CARD_NUMBER_INVALID,
    }),
  ),
  cardHolder: nonEmptyString(PAYMENT_MESSAGES.CARD_HOLDER_REQUIRED).pipe(
    Schema.pattern(PAYMENT_PATTERNS.CARD_HOLDER, {
      message: () => PAYMENT_MESSAGES.CARD_HOLDER_INVALID,
    }),
    Schema.minLength(2, {
      message: () => PAYMENT_MESSAGES.CARD_HOLDER_MIN_LENGTH,
    }),
  ),
  expirationDate: nonEmptyString(
    PAYMENT_MESSAGES.EXPIRATION_DATE_REQUIRED,
  ).pipe(
    Schema.pattern(PAYMENT_PATTERNS.EXPIRATION_DATE, {
      message: () => PAYMENT_MESSAGES.EXPIRATION_DATE_INVALID,
    }),
  ),
  cvc: nonEmptyString(PAYMENT_MESSAGES.CVC_REQUIRED).pipe(
    Schema.pattern(PAYMENT_PATTERNS.CVC, {
      message: () => PAYMENT_MESSAGES.CVC_INVALID,
    }),
  ),
  // Confirmation
  agreeMarketing: Schema.Boolean,
  agreeTerms: Schema.Literal(true).annotations({
    message: () => PAYMENT_MESSAGES.AGREE_TERMS_REQUIRED,
  }),
});

export type PaymentFormValues = typeof PaymentFormSchema.Type;
