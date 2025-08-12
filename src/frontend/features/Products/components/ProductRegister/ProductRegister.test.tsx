/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from '@testing-library/react';
import OrderRegister from '.';
import { Formik, FormikConfig } from 'formik';

import useDrawer from '../../../../commons/hooks/useDrawer';
import useRegister from '../../../Orders/hooks/useRegister';
import useSnackBar from '../../../../commons/hooks/useSnackbar';

import { changeInput, changeSelect } from '../../../../../utils/functions';
import dayjs from 'dayjs';
import {
  responseCustomerList,
  responseOrders,
  responseProducts,
} from '../../../Orders/mocks/response';
import { INITIAL_VALUES_ORDERS } from '../../../Orders/utils/constants/Order.constant';
import {
  useGetCustomerListQuery,
  useSendOrderMutation,
} from '../../../Orders/redux/Orders.api';
import getDrawerMock from '../../../../commons/mockTest/getDrawerMock';
import getRegisterMock from '../../../../commons/mockTest/getRegisterMock';
import getSnackbarMock from '../../../../commons/mockTest/getSnackbarMock';
import { useGetProductsQuery } from '../../redux/Products.api';

interface CustomFormikProps extends FormikConfig<any> {
  onSubmit: jest.Mock<any, any>;
}

const mockFormikProps: CustomFormikProps = {
  initialValues: INITIAL_VALUES_ORDERS,
  onSubmit: jest.fn(),
};

const mockFormikPropsWithValue: CustomFormikProps = {
  initialValues: responseOrders()[1],
  onSubmit: jest.fn(),
};

jest.mock('../../../../hooks/useDrawer', () => jest.fn());
jest.mock('../../../../hooks/useRegister', () => jest.fn());
jest.mock('../../../../hooks/useSnackbar', () => jest.fn());
jest.mock('../../redux/Orders.api', () => ({
  useGetCustomerListQuery: jest.fn(),
  useGetProductsListQuery: jest.fn(),
  useSendOrderMutation: jest.fn(),
}));

const useGetCustomerListQueryMock = useGetCustomerListQuery as jest.Mock;
const useGetProductsListQueryMock = useGetProductsQuery as jest.Mock;
const useSendOrderMutationMock = useSendOrderMutation as jest.Mock;
const useDrawerMock = useDrawer as jest.Mock;
const useRegisterMock = useRegister as jest.Mock;
const useSnackBarMock = useSnackBar as jest.Mock;

describe('<OrderRegister />', () => {
  it('should render the component', () => {
    useDrawerMock.mockReturnValue(getDrawerMock({}));
    useRegisterMock.mockReturnValue(getRegisterMock({}));
    useSnackBarMock.mockReturnValue(getSnackbarMock({}));
    useGetCustomerListQueryMock.mockReturnValue({
      currentData: {
        output: responseCustomerList(),
      },
      isError: false,
    });
    useGetProductsListQueryMock.mockReturnValue({
      currentData: {
        output: responseProducts(),
      },
      isError: false,
    });
    useSendOrderMutationMock.mockReturnValue([
      jest.fn(),
      {
        data: {
          output: true,
        },
        isError: false,
      },
    ]);
    const { container } = render(
      <Formik {...mockFormikProps}>
        <OrderRegister />
      </Formik>,
    );
    expect(container).toBeInTheDocument();
  });

  it('shouldnt be able to save the component if doesnt have anything filled', () => {
    useDrawerMock.mockReturnValue(getDrawerMock({}));
    useRegisterMock.mockReturnValue(getRegisterMock({}));
    useSnackBarMock.mockReturnValue(getSnackbarMock({}));
    useGetCustomerListQueryMock.mockReturnValue({
      currentData: {
        output: responseCustomerList(),
      },
      isError: false,
    });
    useGetProductsListQueryMock.mockReturnValue({
      currentData: {
        output: responseProducts(),
      },
      isError: false,
    });
    useSendOrderMutationMock.mockReturnValue([
      jest.fn(),
      {
        data: {
          output: true,
        },
        isError: false,
      },
    ]);
    const container = render(
      <Formik {...mockFormikProps}>
        <OrderRegister />
      </Formik>,
    );
    expect(container.getByTestId('register-order')).toBeDisabled();
  });

  it('should fill the inputs and enable the button', async () => {
    useDrawerMock.mockReturnValue(getDrawerMock({}));
    useRegisterMock.mockReturnValue(getRegisterMock({}));
    useSnackBarMock.mockReturnValue(getSnackbarMock({}));
    useGetCustomerListQueryMock.mockReturnValue({
      currentData: {
        output: responseCustomerList(),
      },
      isError: false,
    });
    useGetProductsListQueryMock.mockReturnValue({
      currentData: {
        output: responseProducts(),
      },
      isError: false,
    });
    useSendOrderMutationMock.mockReturnValue([
      jest.fn(),
      {
        data: {
          output: true,
        },
        isError: false,
      },
    ]);

    const container = render(
      <Formik {...mockFormikProps}>
        <OrderRegister />
      </Formik>,
    );
    await changeSelect(container, 'customer', 'Murilo');
    await changeSelect(container, 'product', 'Pao de sal');
    await changeSelect(container, 'type', 'UN');
    await changeInput(container, 'quantity', 100);
    await changeInput(container, 'additionalInformations', 'cortado');
    fireEvent.click(container.getByTestId('add-product'));
    fireEvent.click(container.getByTestId('register-order'));
  });

  it('should be able to save it', async () => {
    useDrawerMock.mockReturnValue(getDrawerMock({}));
    useRegisterMock.mockReturnValue(getRegisterMock({}));
    useSnackBarMock.mockReturnValue(getSnackbarMock({}));
    useGetCustomerListQueryMock.mockReturnValue({
      currentData: {
        output: responseCustomerList(),
      },
      isError: false,
    });
    useGetProductsListQueryMock.mockReturnValue({
      currentData: {
        output: responseProducts(),
      },
      isError: false,
    });
    useSendOrderMutationMock.mockReturnValue([
      jest.fn(),
      {
        data: {
          output: true,
        },
        isError: false,
      },
    ]);

    const container = render(
      <Formik {...mockFormikPropsWithValue}>
        <OrderRegister />
      </Formik>,
    );

    fireEvent.click(container.getByTestId('register-order'));
  });
});
