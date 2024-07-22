export interface IOrder {
  id: number | null;
  customer: {
    id: number | null;
    value: string | null;
  };
  deliveryDate: string | null;
  products: IProductOrder[];
}

export interface IProductOrder {
  id: number | null;
  productId: number | null;
  name: string | null;
  quantity: number | null;
  type: 'un' | 'kg' | null;
  additionalInformations: string | null;
}
