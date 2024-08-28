import { Measurement } from '../../../Orders/utils/types/Order.type';

export interface IProduct {
  id: number | null;
  name: string | null;
  type: Measurement[];
  unityPrice: number | null;
  unitaryWeight: number | null;
  totalWeight: number | null;
  additionalInformations: string | null;
}
