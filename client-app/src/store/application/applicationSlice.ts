import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export enum ApplicationState {
    DictionarySelection,
    Test,
    TestResult,
}

export const applicationSlice = createSlice({
    name: "application",
    initialState: {
        name: "Vocabulary tester",
        state: ApplicationState.DictionarySelection,
    },
    reducers: {
        name: (state, action: PayloadAction<string>): void => {
            state.name = action.payload;
        },

        testStage: (state, action: PayloadAction<ApplicationState>): void => {
            state.state = action.payload;
        },
    },
});

export const getApplicationName = (state: RootState): string =>
    state.application.name;

export const getState = (state: RootState): ApplicationState =>
    state.application.state;

export default applicationSlice.reducer;
