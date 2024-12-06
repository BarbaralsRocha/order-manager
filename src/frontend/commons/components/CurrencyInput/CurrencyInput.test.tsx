import { render } from '@testing-library/react';
import CurrencyInput from './CurrencyInput';

test('renders CurrencyInput', () => {
  render(<CurrencyInput value={2} onChange={jest.fn()} label="teste" />);
});
