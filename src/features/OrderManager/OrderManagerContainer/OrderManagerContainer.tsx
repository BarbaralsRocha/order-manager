import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import * as S from './OrderManagerContainer.style';
import {
  ConfigButton,
  ManageOrders,
} from '../utils/constants/OrderManagerSection.constant';
import { ManageOrdersEnum } from '../utils/enums/ManageOrders.enum';
import { useMemo } from 'react';
import CustomersContainer from '../../Customers/CustomersContainer';
import { Add } from '@mui/icons-material';
import useDrawer from '../../../hooks/useDrawer';
import FormFormik from '../../../components/FormFormik';
import ProductsContainer from '../../Products/components/ProductsContainer';
import { RootState } from '../../../redux/store';
import OrdersContainer from '../../Orders/components/OrdersContainer';

const drawerWidth = 240;

const OrderManagerContainer: React.FC = () => {
  const { currentMenuSelected } = useSelector(
    (store: RootState) => store.ManagerOrdersReducer,
  );
  const { setComponentAtDrawer } = useDrawer();

  const sectionSelected = useMemo(
    () => ({
      [ManageOrdersEnum.CUSTOMERS]: <CustomersContainer />,
      [ManageOrdersEnum.ORDERS]: <OrdersContainer />,
      [ManageOrdersEnum.PRODUCTS]: <ProductsContainer />,
    }),
    [],
  );

  return (
    <S.Container>
      <Menu />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          backgroundColor: 'neutral.light.light',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="p">
            {ManageOrders[currentMenuSelected]}
          </Typography>

          <Button
            startIcon={<Add />}
            variant="contained"
            sx={{}}
            onClick={() =>
              setComponentAtDrawer({
                title: ConfigButton[currentMenuSelected].titleRegister,
                component: (
                  <FormFormik
                    initialValues={
                      ConfigButton[currentMenuSelected].initialValues
                    }
                    validationSchema={
                      ConfigButton[currentMenuSelected].validationSchema
                    }
                  >
                    {ConfigButton[currentMenuSelected].component}
                  </FormFormik>
                ),
              })
            }
          >
            {ConfigButton[currentMenuSelected].label}
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {sectionSelected[currentMenuSelected]}
      </Box>
    </S.Container>
  );
};

export default OrderManagerContainer;
