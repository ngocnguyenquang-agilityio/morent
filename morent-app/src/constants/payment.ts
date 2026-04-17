export const MAX_CARD_NUMBER_DIGITS = 16;
export const MAX_EXPIRATION_DATE_DIGITS = 4;
export const MAX_CVC_DIGITS = 3;
export const MIN_PHONE_NUMBER_DIGITS = 8;
export const MAX_PHONE_NUMBER_DIGITS = 10;

export const PAYMENT_MESSAGES = {
  PICK_UP_LOCATION_REQUIRED: 'Pick-up location is required',
  PICK_UP_DATE_REQUIRED: 'Pick-up date is required',
  PICK_UP_TIME_REQUIRED: 'Pick-up time is required',
  DROP_OFF_LOCATION_REQUIRED: 'Drop-off location is required',
  DROP_OFF_DATE_REQUIRED: 'Drop-off date is required',
  DROP_OFF_TIME_REQUIRED: 'Drop-off time is required',
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: 'Name must be at least 2 characters',
  ADDRESS_REQUIRED: 'Address is required',
  PHONE_NUMBER_REQUIRED: 'Phone number is required',
  PHONE_NUMBER_INVALID: 'Phone number must be between 8 and 10 digits',
  CITY_REQUIRED: 'City is required',
  CARD_NUMBER_REQUIRED: 'Card number is required',
  CARD_NUMBER_INVALID: 'Card number must be 16 digits',
  CARD_HOLDER_REQUIRED: 'Cardholder name is required',
  CARD_HOLDER_INVALID: 'Card holder must contain only letters',
  CARD_HOLDER_MIN_LENGTH: 'Card holder must be at least 2 characters',
  EXPIRATION_DATE_REQUIRED: 'Expiration date is required',
  EXPIRATION_DATE_INVALID: 'Expiration date must be in MM/YY format',
  CVC_REQUIRED: 'CVC is required',
  CVC_INVALID: 'CVC must be exactly 3 digits',
  AGREE_TERMS_REQUIRED: 'You must agree to terms',
} as const;

export const PAYMENT_PATTERNS = {
  CARD_NUMBER: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
  CARD_HOLDER: /^[a-zA-Z\s]+$/,
  EXPIRATION_DATE: /^(0[1-9]|1[0-2])\/\d{2}$/,
  CVC: /^\d{3}$/,
  PHONE_NUMBER: /^\d{8,10}$/,
  NON_DIGIT: /\D/g,
  CARD_NUMBER_GROUP: /(\d{4})(?=\d)/g,
  NON_LETTER_NON_SPACE: /[^a-zA-Z\s]/g,
} as const;
