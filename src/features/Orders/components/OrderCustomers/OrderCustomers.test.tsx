import React from 'react';
import { render } from '@testing-library/react';
import OrderCustomers from './OrderCustomers';
import { mockContract } from '../../../../commons/interfaces/IMockContract';
import { responseOrders } from '../../mocks/response';

test('renders OrderCustomers', () => {
  render(
    <OrderCustomers
      currentData={{
        ...mockContract,
        output: responseOrders(),
        success: true,
        exception: null,
      }}
      isFetching={false}
      isErrorGetOrder={false}
      refetch={jest.fn()}
    />,
  );
});
