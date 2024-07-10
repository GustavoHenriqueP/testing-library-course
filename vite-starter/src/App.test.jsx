import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

//* A instrutora comenta que no backend é realmente interessante deixar cada teste o mais unitário e separado possível.
//* Porém, no frontend isso não é exatamente necessário, já que normalmente queremos testar um "fluxo";
test('button click flow', () => {
  //* logRoles é útil quanda temos um componente mais complexo e não sabemos todas as roles que temos
  // const { container } = render(<App />);
  // logRoles(container);

  // render the app
  render(<App />); // RTL

  // find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i }); // regex with case insensitive (i) - RTL

  // check initial color
  expect(buttonElement).toHaveClass('red'); // Expect: Vitest - .toHaveClass(): Matcher from jest-DOM

  // click the button
  fireEvent.click(buttonElement);

  // check the button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // check the button color
  expect(buttonElement).toHaveClass('blue');
});

test('checkbox flow', () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});
