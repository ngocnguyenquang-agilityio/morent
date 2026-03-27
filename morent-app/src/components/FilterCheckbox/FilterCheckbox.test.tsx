// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { FilterCheckbox } from './FilterCheckbox';

describe('FilterCheckbox', () => {
  const defaultProps = {
    label: 'Sport',
    count: 12,
    checked: false,
    onChange: () => {},
  };

  it('renders without crashing', () => {
    const { container } = render(<FilterCheckbox {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<FilterCheckbox {...defaultProps} />);

    expect(screen.getByText('Sport')).toBeInTheDocument();
  });

  it('renders the count', () => {
    render(<FilterCheckbox {...defaultProps} />);

    expect(screen.getByText('(12)')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<FilterCheckbox {...defaultProps} onChange={onChange} />);

    await user.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('reflects checked state', () => {
    render(<FilterCheckbox {...defaultProps} checked={true} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('reflects unchecked state', () => {
    render(<FilterCheckbox {...defaultProps} checked={false} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
