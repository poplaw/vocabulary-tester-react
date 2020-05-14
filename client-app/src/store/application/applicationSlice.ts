import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export const applicationSlice = createSlice({
    name: "application",
    initialState: {
        name: "Vocabulary tester",
    },
    reducers: {
        name: (state, action: PayloadAction<string>): void => {
            state.name = action.payload;
        },
    },
});

export const getApplicationName = (state: RootState): string =>
    state.application.name;

export default applicationSlice.reducer;
