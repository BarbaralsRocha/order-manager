import React from 'react';
import { render } from '@testing-library/react';
import OrderManager from './OrderManager';
import OrderList from '../OrderList';

test('renders OrderManager', () => {
  render(<OrderManager query="" component={OrderList} />);
});
