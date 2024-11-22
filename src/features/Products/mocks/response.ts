import { MeasurementEnum } from '../../../commons/enums/Measurement.enum';
import { IProduct } from '../utils/interfaces/IProduct';

export const responseProducts = (): IProduct[] => [
  {
    id: 1,
    name: 'Pao de sal',
    type: MeasurementEnum.UN_KG,
    unityPrice: 0.69,
    unitaryWeight: 0.05,
    weightPrice: 0.4,
    additionalInformations: null,
  },
  {
    id: 1,
    name: 'Manteiga',
    type: MeasurementEnum.UN,
    unityPrice: 0.69,
    unitaryWeight: undefined,
    weightPrice: undefined,
    additionalInformations: 'teste',
  },
];
