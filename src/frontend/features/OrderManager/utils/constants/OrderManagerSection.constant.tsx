import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  OrderManagerSectionType,
  OrderManagerSectionValue,
} from '../types/OrderManagerSection.type';
import type * as Yup from 'yup';
import validationSchemaCustomer from '../../../Customers/components/CustomersContainer/validationSchemaCustomer';
import { INITIAL_VALUES_ORDERS } from '../../../Orders/utils/constants/Order.constant';
import validationSchemaOrders from '../../../Orders/components/OrderRegister/validationSchemaOrders';
import OrderRegister from '../../../Orders/components/OrderRegister';
import ProductRegister from '../../../Products/components/ProductRegister';
import validationSchemaProducts from '../../../Products/components/ProductRegister/validationSchemaProducts';
import { INITIAL_VALUES_PRODUCTS } from '../../../Products/utils/constants/Products.constants';
import CustomersRegister from '../../../Customers/components/CustomersRegister';

export const ColumnItems: {
  id: OrderManagerSectionType;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    id: 'orders',
    label: 'Encomendas',
    icon: <CalendarMonthIcon />,
  },
  {
    id: 'customers',
    label: 'Clientes',
    icon: <PersonIcon />,
  },
  {
    id: 'products',
    label: 'Produtos',
    icon: <ShoppingCartIcon />,
  },
];

export const ManageOrders: Record<
  OrderManagerSectionType,
  OrderManagerSectionValue
> = {
  customers: 'Clientes',
  orders: 'Encomendas',
  products: 'Produtos',
};

export const ConfigButton: Record<
  OrderManagerSectionType,
  {
    label: string;
    initialValues: object;
    validationSchema: Yup.AnyObjectSchema;
    component: JSX.Element;
    titleRegister: string;
  }
> = {
  customers: {
    label: 'ADICIONAR CLIENTE',
    titleRegister: 'Cadastro de cliente',
    initialValues: {},
    validationSchema: validationSchemaCustomer,
    component: <CustomersRegister />,
  },
  orders: {
    label: 'ADICIONAR ENCOMENDA',
    titleRegister: 'Cadastro de encomenda',
    initialValues: INITIAL_VALUES_ORDERS,
    validationSchema: validationSchemaOrders,
    component: <OrderRegister />,
  },
  products: {
    label: 'ADICIONAR PRODUTO',
    titleRegister: 'Cadastro de produto',
    initialValues: INITIAL_VALUES_PRODUCTS,
    validationSchema: validationSchemaProducts,
    component: <ProductRegister />,
  },
};
