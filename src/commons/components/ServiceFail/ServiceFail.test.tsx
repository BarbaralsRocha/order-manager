import React from 'react';
import { render } from '@testing-library/react';
import ServiceFail from './ServiceFail';

test('renders ServiceFail', () => {
  render(<ServiceFail refetch={jest.fn()} />);
});
