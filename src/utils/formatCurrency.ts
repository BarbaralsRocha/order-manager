export const formatCurrency = (value: number | null | undefined): string => {
  return value
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(value))
    : '-';
};
