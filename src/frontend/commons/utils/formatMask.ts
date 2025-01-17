export const formatCNPJ = (value?: string) => {
  if (!value) return '-';
  const cnpj = value.padStart(14, '0');
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  );
};

export const formatIE = (value?: string) => {
  if (!value) return '-';
  const ie = value.toString().padStart(12, '0');
  return ie.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3.$4');
};

export const formatPhoneNumber = (value?: string) => {
  if (!value) return '-';
  const phone = value.toString().padStart(11, '0');
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
};
