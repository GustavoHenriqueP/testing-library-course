import { render, screen } from '../../../test-utils/testing-library-utils';
import OrderConfirmation from '../OrderConfirmation';
import { HttpResponse, http, delay } from 'msw';
import { server } from '../../../mocks/server';

const errorHandlers = [
  http.post('http://localhost:3030/order', async () => {
    await delay(400);
    return new HttpResponse(null, { status: 500 });
  }),
];

test('an alert is shown on a server error on confirmation page', async () => {
  server.resetHandlers(...errorHandlers);
  render(<OrderConfirmation />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('An unexpected error occurred. Please try again later.');
});
