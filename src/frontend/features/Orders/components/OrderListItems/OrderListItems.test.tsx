import { render } from '@testing-library/react';
import OrderListItems from './OrderListItems';
import { responseOrders } from '../../mocks/response';

test('renders OrderListItems', () => {
  render(
    <OrderListItems
      rowData={responseOrders()[0].orderDetails[0]}
      editProduct={jest.fn()}
      deleteProduct={jest.fn()}
    />,
  );
});
