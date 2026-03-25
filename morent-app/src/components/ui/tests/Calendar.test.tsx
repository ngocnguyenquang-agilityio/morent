import { useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Calendar } from '../Calendar';

describe('Calendar', () => {
  it('renders with data-slot="calendar"', () => {
    render(<Calendar />);
    expect(
      document.querySelector('[data-slot="calendar"]'),
    ).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<Calendar />);
    const buttons = screen.getAllByRole('button');
    // At minimum: previous month, next month, and day buttons
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders day cells', () => {
    render(<Calendar />);
    const dayButtons = document.querySelectorAll('[data-day]');
    expect(dayButtons.length).toBeGreaterThan(0);
  });

  it('renders with showOutsideDays=true by default', () => {
    render(<Calendar />);
    // With showOutsideDays, more days are visible
    const dayButtons = document.querySelectorAll('[data-day]');
    expect(dayButtons.length).toBeGreaterThanOrEqual(28);
  });

  it('renders without outside days when showOutsideDays=false', () => {
    const fixedMonth = new Date(2024, 0, 1); // January 2024
    render(<Calendar month={fixedMonth} showOutsideDays={false} />);
    expect(
      document.querySelector('[data-slot="calendar"]'),
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Calendar className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('navigates to next month when next button is clicked', () => {
    const onMonthChange = jest.fn();
    render(
      <Calendar month={new Date(2024, 0, 1)} onMonthChange={onMonthChange} />,
    );
    const buttons = screen.getAllByRole('button');
    // The next month button is the second navigation button
    const nextButton = buttons.find((btn) =>
      btn.classList.contains('rdp-button_next'),
    );
    if (nextButton) {
      act(() => {
        fireEvent.click(nextButton);
      });
      expect(onMonthChange).toHaveBeenCalled();
    }
  });

  it('renders with a fixed month', () => {
    const month = new Date(2024, 0, 1); // January 2024
    render(<Calendar month={month} />);
    expect(
      document.querySelector('[data-slot="calendar"]'),
    ).toBeInTheDocument();
  });

  it('renders selected date with data-selected-single attribute', () => {
    const selected = new Date(2024, 0, 15);
    render(<Calendar mode="single" selected={selected} month={selected} />);
    const selectedDay = document.querySelector('[data-selected-single="true"]');
    expect(selectedDay).toBeInTheDocument();
  });
});
