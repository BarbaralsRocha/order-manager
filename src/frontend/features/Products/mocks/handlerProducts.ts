import { delay, http, HttpResponse } from 'msw';
import { mockContract } from '../../../commons/interfaces/IMockContract';
import { responseProducts } from './response';

export const handlerProducts = [
  http.get(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/products/summary`,
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

  http.put(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/product?startDate`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: true,
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
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/product/:productId`,
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
