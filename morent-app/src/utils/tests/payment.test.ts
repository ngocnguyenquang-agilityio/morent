import {
  formatCardHolder,
  formatCardNumber,
  formatCvc,
  formatExpirationDate,
} from '../payment';

describe('formatCardNumber', () => {
  it('strips non-digit characters', () => {
    expect(formatCardNumber('1234-abcd-5678')).toBe('1234-5678');
  });

  it('inserts dashes every 4 digits', () => {
    expect(formatCardNumber('1234567812345678')).toBe('1234-5678-1234-5678');
  });

  it('limits to 16 digits', () => {
    expect(formatCardNumber('12345678123456789999')).toBe(
      '1234-5678-1234-5678',
    );
  });

  it('does not add a trailing dash for partial groups', () => {
    expect(formatCardNumber('123456')).toBe('1234-56');
  });

  it('returns empty string for empty input', () => {
    expect(formatCardNumber('')).toBe('');
  });
});

describe('formatExpirationDate', () => {
  it('returns digits as-is when 2 or fewer', () => {
    expect(formatExpirationDate('01')).toBe('01');
  });

  it('inserts slash after 2 digits', () => {
    expect(formatExpirationDate('0128')).toBe('01/28');
  });

  it('strips non-digit characters before formatting', () => {
    expect(formatExpirationDate('01/28')).toBe('01/28');
  });

  it('limits to 4 digits (MM + YY)', () => {
    expect(formatExpirationDate('012899')).toBe('01/28');
  });

  it('returns empty string for empty input', () => {
    expect(formatExpirationDate('')).toBe('');
  });

  it('handles single digit input', () => {
    expect(formatExpirationDate('1')).toBe('1');
  });
});

describe('formatCardHolder', () => {
  it('strips digits from the input', () => {
    expect(formatCardHolder('John123')).toBe('John');
  });

  it('strips special characters from the input', () => {
    expect(formatCardHolder('John! Doe@#')).toBe('John Doe');
  });

  it('preserves spaces between words', () => {
    expect(formatCardHolder('John Doe')).toBe('John Doe');
  });

  it('returns empty string for only digits and symbols', () => {
    expect(formatCardHolder('123!@#')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(formatCardHolder('')).toBe('');
  });
});

describe('formatCvc', () => {
  it('strips non-digit characters', () => {
    expect(formatCvc('12a3')).toBe('123');
  });

  it('limits to 3 digits', () => {
    expect(formatCvc('12345')).toBe('123');
  });

  it('returns digits as-is when 3 or fewer', () => {
    expect(formatCvc('12')).toBe('12');
  });

  it('returns empty string for empty input', () => {
    expect(formatCvc('')).toBe('');
  });
});
