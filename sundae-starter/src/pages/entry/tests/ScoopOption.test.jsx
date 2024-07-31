import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOptions from '../ScoopOption';

test('scoop input becomes red on invalid input values', async () => {
  const user = userEvent.setup();
  render(<ScoopOptions name="Chocolate" imagePath="" />);

  const chocolateScoopInput = screen.getByRole('spinbutton', { name: 'Chocolate' });

  // is not invalid initially
  expect(chocolateScoopInput).not.toHaveClass('is-invalid');

  // check negative number
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '-1');
  expect(chocolateScoopInput).toHaveClass('is-invalid');

  // check not integer number
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '1.5');
  expect(chocolateScoopInput).toHaveClass('is-invalid');

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '1.0');
  expect(chocolateScoopInput).not.toHaveClass('is-invalid');

  // check number greater than 10
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '11');
  expect(chocolateScoopInput).toHaveClass('is-invalid');

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, '10');
  expect(chocolateScoopInput).not.toHaveClass('is-invalid');
});
