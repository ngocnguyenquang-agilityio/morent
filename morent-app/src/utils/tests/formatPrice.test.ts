import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  describe('without discount', () => {
    it('formats a whole number to two decimal places', () => {
      expect(formatPrice(90)).toBe('90.00');
    });

    it('preserves existing decimal places', () => {
      expect(formatPrice(86.59)).toBe('86.59');
    });

    it('rounds to two decimal places', () => {
      expect(formatPrice(86.555)).toBe('86.56');
    });

    it('formats zero', () => {
      expect(formatPrice(0)).toBe('0.00');
    });
  });

  describe('with discount', () => {
    it('applies percentage discount to a whole number price', () => {
      expect(formatPrice(90, 10)).toBe('81.00');
    });

    it('applies percentage discount and formats decimals', () => {
      expect(formatPrice(86.59, 20)).toBe('69.27');
    });

    it('applies 0% discount and returns the original price', () => {
      expect(formatPrice(90, 0)).toBe('90.00');
    });

    it('applies 100% discount and returns 0.00', () => {
      expect(formatPrice(90, 100)).toBe('0.00');
    });
  });
});
