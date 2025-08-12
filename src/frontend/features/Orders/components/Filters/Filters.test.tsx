import { render } from '@testing-library/react';
import Filters from './Filters';
import { INITIAL_VALUES_FILTERS } from '../../utils/constants/Order.constant';

test('renders Filters', () => {
  render(
    <Filters
      setFilters={jest.fn()}
      filters={INITIAL_VALUES_FILTERS}
      hasFilter={{ customer: true, products: true, date: true, time: true }}
    />,
  );
});
