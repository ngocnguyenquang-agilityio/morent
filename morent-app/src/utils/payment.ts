import {
  MAX_CARD_NUMBER_DIGITS,
  MAX_CVC_DIGITS,
  MAX_EXPIRATION_DATE_DIGITS,
  PAYMENT_PATTERNS,
} from '@/constants/payment';

/**
 * Formats a card number string by inserting dashes every 4 digits.
 * Strips all non-digit characters before formatting.
 * Example: "1234567812345678" → "1234-5678-1234-5678"
 */
export const formatCardNumber = (value: string): string => {
  const digits = value
    .replace(PAYMENT_PATTERNS.NON_DIGIT, '')
    .slice(0, MAX_CARD_NUMBER_DIGITS);

  return digits.replace(PAYMENT_PATTERNS.CARD_NUMBER_GROUP, '$1-');
};

/**
 * Formats an expiration date string as MM/YY.
 * Strips all non-digit characters before formatting.
 * Example: "0128" → "01/28"
 */
export const formatExpirationDate = (value: string): string => {
  const digits = value
    .replace(PAYMENT_PATTERNS.NON_DIGIT, '')
    .slice(0, MAX_EXPIRATION_DATE_DIGITS);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

/**
 * Strips any character that is not a letter or space from the input.
 * Example: "John123 Doe!" → "John Doe"
 */
export const formatCardHolder = (value: string): string =>
  value.replace(PAYMENT_PATTERNS.NON_LETTER_NON_SPACE, '');

/**
 * Strips all non-digit characters and limits to 3 digits.
 * Example: "12a3b" → "123"
 */
export const formatCvc = (value: string): string =>
  value.replace(PAYMENT_PATTERNS.NON_DIGIT, '').slice(0, MAX_CVC_DIGITS);
