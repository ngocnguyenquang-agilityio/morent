import { generateTimeSlots } from '../generateTime';

describe('generateTimeSlots', () => {
  it('returns exactly 48 slots', () => {
    expect(generateTimeSlots()).toHaveLength(48);
  });

  it('starts with 00:00', () => {
    expect(generateTimeSlots()[0]).toBe('00:00');
  });

  it('ends with 23:30', () => {
    const slots = generateTimeSlots();
    expect(slots[slots.length - 1]).toBe('23:30');
  });

  it('slots alternate between :00 and :30 minutes', () => {
    const slots = generateTimeSlots();
    slots.forEach((slot, i) => {
      const minutes = slot.split(':')[1];
      expect(minutes).toBe(i % 2 === 0 ? '00' : '30');
    });
  });

  it('pads single-digit hours with a leading zero', () => {
    const slots = generateTimeSlots();
    expect(slots[2]).toBe('01:00');
    expect(slots[3]).toBe('01:30');
  });

  it('contains no duplicate slots', () => {
    const slots = generateTimeSlots();
    expect(new Set(slots).size).toBe(slots.length);
  });

  it('all slots match HH:MM format', () => {
    const timeFormat = /^\d{2}:\d{2}$/;
    generateTimeSlots().forEach((slot) => {
      expect(slot).toMatch(timeFormat);
    });
  });
});
