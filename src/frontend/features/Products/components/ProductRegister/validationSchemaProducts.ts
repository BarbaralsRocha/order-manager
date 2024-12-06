import * as Yup from 'yup';
import { MeasurementEnum } from '../../../../commons/enums/Measurement.enum';
import { Measurement } from '../../../../commons/types/Measurement.type';

const validationSchemaProduct = Yup.object().shape({
  name: Yup.string().nonNullable().required('O nome do produto é obrigatório'),
  type: Yup.string().nonNullable().required('O tipo de medida é obrigatório'),
  unityPrice: Yup.number().when('type', {
    is: (type: Measurement) =>
      type === MeasurementEnum.UN || type === MeasurementEnum.UN_KG,
    then: () =>
      Yup.number()
        .required('O preço unitário é obrigatório')
        .min(0, 'O preço unitário não pode ser negativo'),
    otherwise: () => Yup.number().nullable(),
  }),
  unitaryWeight: Yup.number().when('type', {
    is: (type: Measurement) =>
      type === MeasurementEnum.KG || type === MeasurementEnum.UN_KG,
    then: () =>
      Yup.number()
        .required('O peso unitário é obrigatório')
        .min(0, 'O peso unitário não pode ser negativo'),
    otherwise: () => Yup.number().nullable(),
  }),
  weightPrice: Yup.number().when('type', {
    is: (type: Measurement) =>
      type === MeasurementEnum.KG || type === MeasurementEnum.UN_KG,
    then: () =>
      Yup.number()
        .required('O preço por peso é obrigatório')
        .min(0, 'O preço por peso não pode ser negativo'),
    otherwise: () => Yup.number().nullable(),
  }),
  additionalInformations: Yup.string()
    .max(500, 'As informações adicionais devem ter no máximo 500 caracteres')
    .nullable(),
});

export default validationSchemaProduct;
