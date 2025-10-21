import { delay, http, HttpResponse } from 'msw';
import { mockContract } from '../../../commons/interfaces/IMockContract';
import {
  responseCustomerList,
  responseOrders,
  responseTotalProducts,
  responseProducts,
} from './response';

export const handlerOrder = [
  http.get(
    `${process.env.REACT_APP_API_URL}/order-manager/api/v1/orders/summary`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: responseOrders(),
        }),
      });
    },
  ),

  http.get(
    `${process.env.REACT_APP_API_URL}/order-manager/api/v1/orders/products/summary`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: responseTotalProducts(),
        }),
      });
    },
  ),

  http.get(
    `${process.env.REACT_APP_API_URL}/order-manager/api/v1/orders/customers`,
    async () => {
      // await delay(3000);
      // return new HttpResponse(null, {
      //   status: 500,
      // });

      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: responseCustomerList(),
        }),
      });
    },
  ),

  http.get(
    `${process.env.REACT_APP_API_URL}/order-manager/api/v1/orders/products`,
    async () => {
      // await delay(3000);
      // return new HttpResponse(null, {
      //   status: 500,
      // });

      return HttpResponse.json({
        ...mockContract({
          output: responseProducts(),
        }),
      });
    },
  ),

  http.post(
    `${process.env.REACT_APP_API_URL}/order-manager/api/v1/order`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: true,
        }),
      });
    },
  ),

  http.delete(
    `${process.env.REACT_APP_API_URL}/order-manager/api/v1/order/:orderId`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: true,
        }),
      });
    },
  ),
];
