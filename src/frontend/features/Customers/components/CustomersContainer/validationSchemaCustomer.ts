import * as Yup from 'yup';

const validationSchemaCustomer = Yup.object().shape({
  name: Yup.string().nonNullable().required('Razão social é obrigatório'),
  fantasyName: Yup.string()
    .nonNullable()
    .required('Nome fantasia é obrigatório'),
  address: Yup.string().nonNullable().required('Razão social é obrigatório'),
  cnpj: Yup.string()
    .nonNullable()
    .matches(/^\d{14}$/, 'CNPJ deve ter 14 dígitos')
    .required('CNPJ é obrigatório'),
  phoneNumber: Yup.string()
    .nonNullable()
    .matches(/^\d{10}$/, 'Telefone inválido')
    .required('Telefone é obrigatório'),
  stateRegistration: Yup.string()
    .matches(/^\d{12}$/, 'Inscrição Estadual inválida')
    .required('Inscrição Estadual é obrigatório'),
  additionalInformation: Yup.string()
    .max(500, 'As informações adicionais devem ter no máximo 500 caracteres')
    .nullable(),
});

export default validationSchemaCustomer;
