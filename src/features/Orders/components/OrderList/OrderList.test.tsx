import React from 'react';
import { render } from '@testing-library/react';
import OrderList from './OrderList';
import { responseOrders } from '../../mocks/response';
import { mockContract } from '../../../../interfaces/IMockContract';

test('renders OrderList', () => {
  render(
    <OrderList
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
