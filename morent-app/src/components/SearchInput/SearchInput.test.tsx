// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders without crashing', () => {
    const { container } = render(<SearchInput />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the search icon', () => {
    const { container } = render(<SearchInput />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders the input with placeholder', () => {
    render(<SearchInput />);

    expect(
      screen.getByPlaceholderText('Search something here'),
    ).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'SUV');
    expect(input).toHaveValue('SUV');
  });

  it('applies custom className', () => {
    const { container } = render(<SearchInput className="rounded-full px-5" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('rounded-full');
    expect(wrapper.className).toContain('px-5');
  });

  it('keeps base styles when custom className is applied', () => {
    const { container } = render(<SearchInput className="rounded-xl" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('flex');
    expect(wrapper.className).toContain('items-center');
    expect(wrapper.className).toContain('gap-3');
  });
});
