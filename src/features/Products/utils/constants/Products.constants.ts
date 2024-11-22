import { IFilters } from '../interfaces/IFilters';
import { IProduct } from '../interfaces/IProduct';

export const INITIAL_VALUES_FILTERS: IFilters = {
  products: [],
};

export const INITIAL_VALUES_PRODUCTS: IProduct = {
  id: null,
  name: null,
  type: null,
  unityPrice: undefined,
  unitaryWeight: undefined,
  weightPrice: undefined,
  additionalInformations: null,
};
