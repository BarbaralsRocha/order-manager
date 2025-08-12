import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  refecth: (() => void) | undefined;
}

const initialState: IInitialState = {
  refecth: undefined,
};

const CustomersSlice = createSlice({
  name: 'CustomersSlice',
  initialState,
  reducers: {
    setRefetchCustomersList: (
      state,
      { payload }: { payload: (() => void) | undefined },
    ): void => {
      state.refecth = payload;
    },
  },
});

export const CustomersActions = CustomersSlice.actions;
export const { reducer: CustomersReducer } = CustomersSlice;
