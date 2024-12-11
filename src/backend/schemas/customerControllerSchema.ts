import * as yup from 'yup';

export const createCustomerSchema = yup.object({
  name: yup.string().required('name is required'),
  additionalInformation: yup.string().nullable(),
  fantasyName: yup.string().required('fantasyName is required'),
  address: yup.string().required('address is required'),
  cnpj: yup.string().required('cnpj is required'),
  stateRegistration: yup.string().required('stateRegistration is required'),
  phoneNumber: yup.string().required('phoneNumber is required'),
});
