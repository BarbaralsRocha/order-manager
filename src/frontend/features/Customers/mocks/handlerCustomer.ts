import { delay, http, HttpResponse } from 'msw';
import { mockContract } from '../../../commons/interfaces/IMockContract';
import { responseCustomer } from './response';

export const handlerCustomer = [
  http.get(`${process.env.REACT_APP_API_URL}/api/customers`, async () => {
    // await delay(3000);
    // return new HttpResponse(null, {
    //   status: 500,
    // });

    return HttpResponse.json({
      ...mockContract({
        output: responseCustomer(),
      }),
    });
  }),

  http.put(`${process.env.REACT_APP_API_URL}/api/customer`, async () => {
    await delay(3000);
    return HttpResponse.json({
      ...mockContract({
        output: true,
      }),
    });
  }),

  http.post(`${process.env.REACT_APP_API_URL}/api/customer`, async () => {
    await delay(3000);
    return HttpResponse.json({
      ...mockContract({
        output: true,
      }),
    });
  }),

  http.delete(
    `${process.env.REACT_APP_API_URL}/api/customer/:customerId`,
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
