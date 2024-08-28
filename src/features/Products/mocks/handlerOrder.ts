import { delay, http, HttpResponse } from 'msw';
import { mockContract } from '../../../interfaces/IMockContract';
import { responseProducts } from './response';

export const handlerOrder = [
  http.get(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/products`,
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
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/product`,
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
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/order/:orderId`,
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
