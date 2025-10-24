import * as Yup from 'yup';

export const createCustomerSchema = Yup.object().shape({
  name: Yup.string().nonNullable().required('Razão social é obrigatório'),
  fantasyName: Yup.string()
    .nonNullable()
    .required('Nome fantasia é obrigatório'),
  address: Yup.string().nonNullable().required('Endereço é obrigatório'),
  cnpj: Yup.string()
    .nonNullable()
    .matches(/^\d{14}$/, 'CNPJ deve ter 14 dígitos')
    .required('CNPJ é obrigatório'),
  phoneNumber: Yup.string()
    .nonNullable()
    .matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .required('Telefone é obrigatório'),
  isStateRegistrationExempt: Yup.boolean().required(
    '"Inscrição Estadual isenta" é obrigatória quando não existe nenhum valor selecionado',
  ),
  stateRegistration: Yup.string().when('isStateRegistrationExempt', {
    is: false,
    then: () =>
      Yup.string()
        .nonNullable()
        .matches(/^\d{12}$/, 'Inscrição Estadual inválida')
        .required('Inscrição Estadual é obrigatória quando não isento'),
    otherwise: () => Yup.string().nullable(),
  }),
  additionalInformation: Yup.string()
    .max(500, 'As informações adicionais devem ter no máximo 500 caracteres')
    .nullable(),
});
