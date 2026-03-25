import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '../Command';

describe('Command', () => {
  it('renders with data-slot="command"', () => {
    render(<Command />);
    expect(document.querySelector('[data-slot="command"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Command className="custom-class" />);
    expect(document.querySelector('[data-slot="command"]')).toHaveClass(
      'custom-class',
    );
  });
});

describe('CommandInput', () => {
  it('renders with data-slot="command-input"', () => {
    render(
      <Command>
        <CommandInput />
      </Command>,
    );
    expect(
      document.querySelector('[data-slot="command-input"]'),
    ).toBeInTheDocument();
  });

  it('renders with a placeholder', () => {
    render(
      <Command>
        <CommandInput placeholder="Search commands..." />
      </Command>,
    );
    expect(
      screen.getByPlaceholderText('Search commands...'),
    ).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="apple">Apple</CommandItem>
          <CommandItem value="banana">Banana</CommandItem>
        </CommandList>
      </Command>,
    );
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'app');
    expect(input).toHaveValue('app');
  });
});

describe('CommandList', () => {
  it('renders with data-slot="command-list"', () => {
    render(
      <Command>
        <CommandList>content</CommandList>
      </Command>,
    );
    expect(
      document.querySelector('[data-slot="command-list"]'),
    ).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Command>
        <CommandList>
          <span>list content</span>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText('list content')).toBeInTheDocument();
  });
});

describe('CommandEmpty', () => {
  it('renders with data-slot="command-empty"', () => {
    render(
      <Command>
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
        </CommandList>
      </Command>,
    );
    expect(
      document.querySelector('[data-slot="command-empty"]'),
    ).toBeInTheDocument();
  });

  it('shows empty message when no items match', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandItem value="apple">Apple</CommandItem>
        </CommandList>
      </Command>,
    );
    await user.type(screen.getByPlaceholderText('Search...'), 'xyz');
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});

describe('CommandGroup', () => {
  it('renders with data-slot="command-group"', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem value="item">Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    expect(
      document.querySelector('[data-slot="command-group"]'),
    ).toBeInTheDocument();
  });

  it('renders group heading', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem value="item">Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
  });
});

describe('CommandItem', () => {
  it('renders with data-slot="command-item"', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="test">Test Item</CommandItem>
        </CommandList>
      </Command>,
    );
    expect(
      document.querySelector('[data-slot="command-item"]'),
    ).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="item">My Item</CommandItem>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText('My Item')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <Command>
        <CommandList>
          <CommandItem value="item" onSelect={onSelect}>
            Click Me
          </CommandItem>
        </CommandList>
      </Command>,
    );
    await user.click(screen.getByText('Click Me'));
    expect(onSelect).toHaveBeenCalledWith('item');
  });
});

describe('CommandShortcut', () => {
  it('renders with data-slot="command-shortcut"', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="item">
            Open
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>,
    );
    expect(
      document.querySelector('[data-slot="command-shortcut"]'),
    ).toBeInTheDocument();
  });

  it('renders shortcut text', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="item">
            Save
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText('⌘S')).toBeInTheDocument();
  });
});
