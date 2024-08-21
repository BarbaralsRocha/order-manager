export interface IProduct {
  id: number | null;
  name: string | null;
  type: 'un' | 'kg'[];
  price: number | null;
  totalPrice: number | null;
  unitaryWeight: number | null;
  totalWeight: number | null;
  additionalInformations: string | null;
}
