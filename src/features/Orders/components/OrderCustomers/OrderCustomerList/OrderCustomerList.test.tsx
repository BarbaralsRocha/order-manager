import { render } from '@testing-library/react';
import OrderCustomerList from './OrderCustomerList';
import { responseOrders } from '../../../mocks/response';

test('renders OrderCustomerList', () => {
  render(<OrderCustomerList order={responseOrders()[0]} refetch={jest.fn()} />);
});
