export const formatCurrency = (value: number | null | undefined): string => {
  return value
    ? value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : '-';
};
