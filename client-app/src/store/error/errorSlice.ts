import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ErrorState {
    modal: boolean;
    text: string;
    show: boolean;
}

const initialState: ErrorState = {
    modal: false,
    text: "",
    show: false,
};

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showError: (state, action: PayloadAction<string>): void => {
            state.show = true;
            state.text = action.payload;
        },
        hideError: (state): void => {
            state.show = false;
        },
        showModalError: (state, action: PayloadAction<string>): void => {
            state.show = true;
            state.text = action.payload;
            state.modal = true;
        },
    },
});

export const isModal = (state: RootState): boolean => state.error.modal;
export const isError = (state: RootState): boolean => state.error.show;
export const getErrorMessage = (state: RootState): string => state.error.text;

export default errorSlice.reducer;
