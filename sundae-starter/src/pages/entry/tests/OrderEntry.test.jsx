import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { expect } from 'vitest';

const errorHandlers = [
  http.get('http://localhost:3030/scoops', () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.get('http://localhost:3030/toppings', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];

//* Se tivermos vários testes, e quisermos debugar apenas um, é possível faazer isso com:
// test.only

//* Já se quisermos pular apenas um teste, para focar nos outros, é possível fazer isso com:
// test.skip

test('handles error for scoops and toppings routes', async () => {
  // Overwriting the default handlers at the beginning of the test
  server.resetHandlers(...errorHandlers);

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole('alert');

  expect(alerts).toHaveLength(2);
});
