import { createSlice } from '@reduxjs/toolkit';
import { IDrawer } from '../../interfaces/IDrawer';
import { ISnackbar } from '../../interfaces/ISnackbar';
import { IModal } from '../../interfaces/IModal';

interface ISharedSlice {
  drawer: IDrawer;
  snackbar: ISnackbar;
  modal: IModal;
}

const initialState: ISharedSlice = {
  drawer: {
    isOpen: false,
    component: null,
    title: '',
  },
  snackbar: {
    message: '',
    type: undefined,
    open: false,
  },
  modal: {
    open: false,
    component: undefined,
  },
};

const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    setDrawer: (state, { payload }: { payload: IDrawer }): void => {
      state.drawer = { ...state.drawer, ...payload };
    },
    setSnackbar: (state, { payload }: { payload: ISnackbar }): void => {
      state.snackbar = { ...state.snackbar, ...payload };
    },
    setModal: (state, { payload }: { payload: IModal }): void => {
      state.modal = { ...state.modal, ...payload };
    },
  },
});

export const SharedActions = sharedSlice.actions;
export const { reducer: SharedReducer } = sharedSlice;
