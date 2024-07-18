import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { kebabCaseToTitleCase } from './helpers';

//* A instrutora comenta que no backend é realmente interessante deixar cada teste o mais unitário e separado possível.
//* Porém, no frontend isso não é exatamente necessário, já que normalmente queremos testar um "fluxo";

//* Veremos bastante código repetido. Mas quando estamos testando código, é menos importante aplicar o DRY
//* do que ser capoaz de depurar rapidamente o código que falha
test('button click flow', () => {
  //* logRoles é útil quanda temos um componente mais complexo e não sabemos todas as roles que temos
  // const { container } = render(<App />);
  // logRoles(container);

  // render the app
  render(<App />); // RTL

  // find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i }); // regex with case insensitive (i) - RTL

  // check initial color
  expect(buttonElement).toHaveClass('medium-violet-red'); // Expect: Vitest - .toHaveClass(): Matcher from jest-DOM

  // click the button
  fireEvent.click(buttonElement);

  // check the button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // check the button color
  expect(buttonElement).toHaveClass('midnight-blue');
});

test('checkbox flow', () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass('gray');

  // click on checkbox again - re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass('medium-violet-red');
});

test('checkbox flow after button click', () => {
  // render the app
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // change button color
  fireEvent.click(buttonElement);

  // disable blue button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass('gray');

  // re-enable blue button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass('midnight-blue');
});

//* Unit testing
describe('kebabCaseToTitleCase', () => {
  test('works for no hyphens', () => {
    expect(kebabCaseToTitleCase('red')).toBe('Red');
  });
  test('works for one hyphen', () => {
    expect(kebabCaseToTitleCase('midnight-blue')).toBe('Midnight Blue');
  });
  test('works for multiple hyphens', () => {
    expect(kebabCaseToTitleCase('medium-violet-red')).toBe('Medium Violet Red');
  });
});
