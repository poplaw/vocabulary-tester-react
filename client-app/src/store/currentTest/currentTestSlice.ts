import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "..";
import * as d3 from "d3";

export interface CurrentTestState {
    dictQueue: string[];
    currentKey: string;
    passed: string[];
    failed: string[];
    rawMaterial: string;
}

const initialState: CurrentTestState = {
    dictQueue: [],
    currentKey: null,
    passed: [],
    failed: [],
    rawMaterial: "",
};

export const currentTestSlice = createSlice({
    name: "currentTest",
    initialState: initialState,
    reducers: {
        setTestQueue: (state, action: PayloadAction<string[]>): void => {
            state.dictQueue = action.payload;
        },

        fetchNext: (state): void => {
            state.currentKey = state.dictQueue.pop();
        },

        clean: (state): CurrentTestState => ({
            ...initialState,
            rawMaterial: state.rawMaterial,
        }),

        clearRaw: (): CurrentTestState => ({
            ...initialState,
        }),

        pass: (state, action: PayloadAction<string>): void => {
            state.passed.push(action.payload);
        },

        fail: (state, action: PayloadAction<string>): void => {
            state.failed.push(action.payload);
        },

        setRawMaterial: (state, action: PayloadAction<string>): void => {
            state.rawMaterial = action.payload;
        },
    },
});

const { reducer, actions } = currentTestSlice;

export const shuffleNewTest = (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.clean());
    const dictionary: string[] = Object.keys(getState().dictionary);
    const shuffledDictionary: string[] = d3.shuffle(dictionary);
    dispatch(actions.setTestQueue(shuffledDictionary));
};

export const getRawMaterial = (store: RootState): string =>
    store.currentTest.rawMaterial;
export const getPassed = (store: RootState): string[] =>
    store.currentTest.passed;
export const getFailed = (store: RootState): string[] =>
    store.currentTest.failed;
export const getTestedKey = (store: RootState): string =>
    store.currentTest.currentKey;

export default reducer;
