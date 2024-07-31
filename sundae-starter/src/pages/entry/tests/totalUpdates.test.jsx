import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // starts with value of 0
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  // checks one checkbox
  const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
  await user.click(cherriesInput);
  expect(toppingsTotal).toHaveTextContent('1.50');

  // checks two checkboxes
  const mmsInput = screen.getByRole('checkbox', { name: 'M&Ms' });
  await user.click(mmsInput);
  expect(toppingsTotal).toHaveTextContent('3.00');

  // unchecks one checkbox
  await user.click(cherriesInput);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent('0.00');

    unmount();
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    const vanillaScoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const cherriesToppingInput = await screen.findByRole('checkbox', { name: 'Cherries' });

    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');
    await user.click(cherriesToppingInput);
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    const cherriesToppingInput = await screen.findByRole('checkbox', { name: 'Cherries' });
    const vanillaScoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    await user.click(cherriesToppingInput);
    expect(grandTotal).toHaveTextContent('1.50');
    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    const vanillaScoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const cherriesToppingInput = await screen.findByRole('checkbox', { name: 'Cherries' });
    const mmsToppingInput = await screen.findByRole('checkbox', { name: 'M&Ms' });

    // Add items
    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, '2');
    await user.click(cherriesToppingInput);
    await user.click(mmsToppingInput);

    // Remove part of these items
    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, '1');
    console.log(vanillaScoopInput.textContent);
    await user.click(cherriesToppingInput);

    expect(grandTotal).toHaveTextContent('3.50');
  });
});
