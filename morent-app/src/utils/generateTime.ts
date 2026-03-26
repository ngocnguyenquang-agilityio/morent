/**
 * Generates a list of time slots for every 30 minutes across a 24-hour period.
 *
 * @returns An array of 48 time strings in "HH:MM" format (e.g., "00:00", "00:30", ..., "23:30").
 */
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
};
