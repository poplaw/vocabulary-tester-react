import { RootState } from "..";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DictionaryEntry from "../../utils/DictionaryEntry";

export interface DictionaryState {
    [key: string]: string;
}

const initialState: DictionaryState = {};

export const dictionarySlice = createSlice({
    name: "dictionary",
    initialState: initialState,
    reducers: {
        set: (state, action: PayloadAction<DictionaryEntry>): void => {
            state[action.payload.first.trim()] = action.payload.second.trim();
        },
        clear: (): DictionaryState => ({}),
    },
});

export const getDictionarySize = (state: RootState): number =>
    Object.keys(state.dictionary).length;

export const getAnswer = (state: RootState): DictionaryState =>
    state.dictionary;

export default dictionarySlice.reducer;
