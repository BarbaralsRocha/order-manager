import { Box, Tab, Tabs } from '@mui/material';
import { ManageOrdersEnum } from '../utils/enums/ManageOrders.enum';
import { OrderManagerSectionType } from '../utils/types/OrderManagerSection.type';
import { useMemo, useState } from 'react';
import { ManageOrders } from '../utils/constants/OrderManagerSection.constant';
import OrderList from './OrderList';
import Customers from '../Customers';
import Products from '../Products';

const Orders: React.FC = () => {
  const [tabSelected, setTabSelected] = useState<OrderManagerSectionType>(
    ManageOrdersEnum.ORDERS,
  );

  const renderComponentSelected = useMemo(
    () => ({
      [ManageOrdersEnum.ORDERS]: <OrderList />,
      [ManageOrdersEnum.CUSTOMERS]: <Customers />,
      [ManageOrdersEnum.PRODUCTS]: <Products />,
    }),
    [],
  );

  return (
    <Box sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabSelected}
          onChange={(_, newValue: OrderManagerSectionType) =>
            setTabSelected(newValue)
          }
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
          <Tab label={ManageOrders.orders} value={ManageOrdersEnum.ORDERS} />
          <Tab
            label={ManageOrders.customers}
            value={ManageOrdersEnum.CUSTOMERS}
          />
          <Tab
            label={ManageOrders.products}
            value={ManageOrdersEnum.PRODUCTS}
          />
        </Tabs>
      </Box>
      {renderComponentSelected[tabSelected]}
    </Box>
  );
};

export default Orders;
