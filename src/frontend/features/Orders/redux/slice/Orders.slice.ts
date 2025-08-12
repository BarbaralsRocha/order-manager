import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  refecth: (() => void) | undefined;
}

const initialState: IInitialState = {
  refecth: undefined,
};

const OrdersSlice = createSlice({
  name: 'OrdersSlice',
  initialState,
  reducers: {
    setRefetchOrdersList: (
      state,
      { payload }: { payload: (() => void) | undefined },
    ): void => {
      state.refecth = payload;
    },
  },
});

export const OrdersActions = OrdersSlice.actions;
export const { reducer: OrdersReducer } = OrdersSlice;
