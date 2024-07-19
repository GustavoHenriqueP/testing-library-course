import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const confirmButtonElement = screen.getByRole('button', { name: /confirm order/i });

  expect(checkboxElement).not.toBeChecked();
  expect(confirmButtonElement).toBeDisabled();
});

test('Checked checkbox should enable the button, and unchecked checkbox, disable it', () => {
  render(<SummaryForm />);
  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const confirmButtonElement = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkboxElement);
  expect(confirmButtonElement).toBeEnabled();

  fireEvent.click(checkboxElement);
  expect(confirmButtonElement).toBeDisabled();
});
