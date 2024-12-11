import { createSlice } from '@reduxjs/toolkit';

interface IProductSlice {
  refetchList(): void;
}

const initialState: IProductSlice = {
  refetchList: () => undefined,
};

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    setRefetchList: (state, { payload }: { payload: IProductSlice }): void => {
      state.refetchList = payload.refetchList;
    },
  },
});

export const ProductsActions = productsSlice.actions;
export const { reducer: ProductsReducer } = productsSlice;
