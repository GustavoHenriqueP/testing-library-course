import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  // setup user events and render app
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const chocolateScoopInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  const mmsToppingInput = await screen.findByRole('checkbox', { name: 'M&Ms' });

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '1');
  await user.click(mmsToppingInput);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderButton);

  // check summary subtotals
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  const listItems = screen.getAllByRole('listitem');
  const items = listItems.map((listItem) => listItem.textContent);
  expect(items).toEqual(['1 Chocolate', 'M&Ms']);

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(tcCheckbox);
  await user.click(confirmOrderButton);

  // expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText('Your order number is', { exact: false });
  expect(orderNumber).toHaveTextContent('123456789');

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // umount
  unmount();
});
