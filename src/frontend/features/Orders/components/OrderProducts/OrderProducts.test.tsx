import { render } from '@testing-library/react';
import OrderProducts from './OrderProducts';

test('renders OrderProducts', () => {
  render(
    <OrderProducts
      filters={{
        startDate: new Date('2021-10-10'),
        customerId: 1,
        products: ['1'],
        time: '10:00',
      }}
    />,
  );
});
