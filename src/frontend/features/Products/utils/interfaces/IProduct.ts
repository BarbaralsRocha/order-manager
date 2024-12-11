import { Measurement } from '../../../../commons/types/Measurement.type';

export interface IProduct {
  id: number | null;
  name: string | null;
  type: Measurement | null;
  unityPrice: number | undefined;
  unitaryWeight: number | undefined;
  weightPrice: number | undefined;
  additionalInformation: string | null;
}
