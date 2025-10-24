import { Box, Tab, Tabs } from '@mui/material';
import OrderList from '../OrderList';
import { OrdersEnum } from '../../enum/Order.enum';
import { useMemo, useState } from 'react';
import { OrderSectionType } from '../../types/Order.type';
import OrderCustomers from '../OrderCustomers';
import OrderProducts from '../OrderProducts';
import {
  INITIAL_VALUES_FILTERS,
  OrderSection,
} from '../../constants/Order.constant';
import objetToQueryString from '../../../../../utils/queryString';
import Filters from '../Filters';
import OrderManager from '../OrderManager';
import { IFilters } from '../../interfaces/IOrder.interface';

const OrdersContainer: React.FC = () => {
  const [filters, setFilters] = useState<IFilters>(INITIAL_VALUES_FILTERS);
  const query = objetToQueryString(filters);
  const [tabSelected, setTabSelected] = useState<OrderSectionType>(
    OrdersEnum.ORDERS,
  );

  const renderComponentSelected = useMemo(
    () => ({
      [OrdersEnum.ORDERS]: (
        <>
          <Filters
            setFilters={setFilters}
            filters={filters}
            hasFilter={{
              customer: true,
              products: true,
              date: true,
              time: true,
            }}
          />
          <OrderManager query={query} component={OrderList} />
        </>
      ),
      [OrdersEnum.ORDERS_CUSTOMERS]: (
        <>
          <Filters
            setFilters={setFilters}
            filters={filters}
            hasFilter={{
              customer: true,
              products: false,
              date: true,
              time: true,
            }}
          />
          <OrderManager query={query} component={OrderCustomers} />
        </>
      ),
      [OrdersEnum.ORDERS_PRODUCTS]: (
        <>
          <Filters
            setFilters={setFilters}
            filters={filters}
            hasFilter={{
              customer: false,
              products: true,
              date: true,
              time: false,
            }}
          />
          <OrderProducts filters={filters} />
        </>
      ),
    }),
    [filters, query],
  );

  return (
    <Box
      sx={{
        p: 3,
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabSelected}
          onChange={(_, newValue: OrderSectionType) => setTabSelected(newValue)}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'uppercase',
              minWidth: 120,
              '&.Mui-selected': {
                color: 'neutral.dark.contrastText',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'neutral.dark.contrastText',
            },
          }}
        >
          <Tab label={OrderSection.orders} value={OrdersEnum.ORDERS} />
          <Tab
            label={OrderSection.customers}
            value={OrdersEnum.ORDERS_CUSTOMERS}
          />
          <Tab
            label={OrderSection.products}
            value={OrdersEnum.ORDERS_PRODUCTS}
          />
        </Tabs>
      </Box>
      {renderComponentSelected[tabSelected]}
    </Box>
  );
};

export default OrdersContainer;
