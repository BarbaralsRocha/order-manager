import { render } from '@testing-library/react';
import DecimalInput from './DecimalInput';

test('renders DecimalInput', () => {
  render(<DecimalInput value={2} onChange={jest.fn()} label="teste" />);
});
