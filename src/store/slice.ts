import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface FormState {
  selectedItem?: Item;
  step: 0 | 1 | 2 | 3;
  formFields: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

const initialState: FormState = {
  step: 0,
  formFields: {},
};

export const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },
    setStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.step = action.payload;
    },
    setFormFields: (
      state,
      action: PayloadAction<{ name?: string; phone?: string; email?: string }>
    ) => {
      state.formFields = { ...state.formFields, ...action.payload };
    },
  },
});

export const { selectItem, setStep, setFormFields } = slice.actions;
export const getSelectedItem = (state: RootState) => state.root.selectedItem;
export const getStep = (state: RootState) => state.root.step;
export const getFormFields = (state: RootState) => state.root.formFields;
