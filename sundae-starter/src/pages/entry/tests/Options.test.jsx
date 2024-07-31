import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('scoops subtotal does not update for invalid scoop count', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
  const chocolateScoopInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

  // initial value
  expect(scoopsTotal).toHaveTextContent('0.00');

  // keep value in 0 with a invalid input
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '1.5');
  expect(scoopsTotal).toHaveTextContent('0.00');

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '-1');
  expect(scoopsTotal).toHaveTextContent('0.00');

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '11');
  expect(scoopsTotal).toHaveTextContent('0.00');

  // updates the value with a valid input
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '2');
  expect(scoopsTotal).toHaveTextContent('4.00');
});
