import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import { userEvent } from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const confirmButtonElement = screen.getByRole('button', { name: /confirm order/i });

  expect(checkboxElement).not.toBeChecked();
  expect(confirmButtonElement).toBeDisabled();
});

test('Checked checkbox should enable the button, and unchecked checkbox, disable it', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const confirmButtonElement = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkboxElement);
  expect(confirmButtonElement).toBeEnabled();

  await user.click(checkboxElement);
  expect(confirmButtonElement).toBeDisabled();
});

test('Popover response to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of the checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
