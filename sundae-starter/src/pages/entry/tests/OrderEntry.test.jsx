import { render, screen } from '../../../test-utils/testing-library-utils';
import { HttpResponse, http } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole('alert');
  expect(alerts).toHaveLength(2);
});

test('order button is disabled when there are no scoops selected, and enable when at least one is selected', async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={vi.fn()} />);

  const chocolateScoopInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  const orderButton = screen.getByRole('button', { name: /order sundae/i });

  // button is disabled initially
  expect(orderButton).toBeDisabled();

  // select one scoop
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '1');
  expect(orderButton).toBeEnabled();

  // clear scoop selection
  await user.clear(chocolateScoopInput);
  expect(orderButton).toBeDisabled();

  // set 0 to scoop selection
  await user.type(chocolateScoopInput, '0');
  expect(orderButton).toBeDisabled();
});
