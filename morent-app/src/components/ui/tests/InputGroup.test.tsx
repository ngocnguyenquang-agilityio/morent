import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '../InputGroup';

describe('InputGroup', () => {
  it('renders with role="group" and data-slot="input-group"', () => {
    render(<InputGroup />);
    const group = screen.getByRole('group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('data-slot', 'input-group');
  });

  it('renders children', () => {
    render(
      <InputGroup>
        <span>content</span>
      </InputGroup>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<InputGroup className="custom-class" />);
    expect(screen.getByRole('group')).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    render(<InputGroup aria-label="search group" />);
    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-label',
      'search group',
    );
  });
});

describe('InputGroupAddon', () => {
  it('renders with data-slot="input-group-addon"', () => {
    render(<InputGroupAddon>addon</InputGroupAddon>);
    const addon = screen.getByText('addon');
    expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  });

  it('defaults to inline-start align', () => {
    render(<InputGroupAddon>addon</InputGroupAddon>);
    expect(screen.getByText('addon')).toHaveAttribute(
      'data-align',
      'inline-start',
    );
  });

  it('applies the specified align', () => {
    render(<InputGroupAddon align="inline-end">addon</InputGroupAddon>);
    expect(screen.getByText('addon')).toHaveAttribute(
      'data-align',
      'inline-end',
    );
  });

  it('applies block-start align', () => {
    render(<InputGroupAddon align="block-start">label</InputGroupAddon>);
    expect(screen.getByText('label')).toHaveAttribute(
      'data-align',
      'block-start',
    );
  });
});

describe('InputGroupInput', () => {
  it('renders a text input with data-slot="input-group-control"', () => {
    render(<InputGroupInput />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input-group-control');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<InputGroupInput />);
    await user.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('renders with placeholder', () => {
    render(<InputGroupInput placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<InputGroupInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

describe('InputGroupTextarea', () => {
  it('renders a textarea with data-slot="input-group-control"', () => {
    render(<InputGroupTextarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-slot', 'input-group-control');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<InputGroupTextarea />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });
});

describe('InputGroupButton', () => {
  it('renders a button', () => {
    render(<InputGroupButton>Click</InputGroupButton>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<InputGroupButton onClick={onClick}>Click</InputGroupButton>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <InputGroupButton disabled onClick={onClick}>
        Click
      </InputGroupButton>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('InputGroupText', () => {
  it('renders text content', () => {
    render(<InputGroupText>Label</InputGroupText>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<InputGroupText className="custom-class">Label</InputGroupText>);
    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });
});
