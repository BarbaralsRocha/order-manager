/* eslint-disable @typescript-eslint/no-explicit-any */
const formatQueryString = (key: string, value: any) => {
  if (value instanceof Date) {
    value = value.toISOString().split('T')[0];
  }

  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const objetToQueryString = (obj: any) =>
  Object.entries(obj)
    .flatMap(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return [];
      }
      if (key === 'date') {
        const getDate = (value as string).split('T')[0];
        return [formatQueryString('date', getDate)];
      }
      if (Array.isArray(value)) {
        return value.map((item) => formatQueryString(key, item));
      }
      return formatQueryString(key, value);
    })
    .filter((param) => param !== '')
    .join('&');

export default objetToQueryString;
