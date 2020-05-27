import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {} from "../dictionary/dictionarySlice";
import { RootState, AppThunk } from "..";
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

        clean: (state): void => {
            state = {
                ...initialState,
                rawMaterial: state.rawMaterial,
            };
        },

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
export const getAmountOfPassed = (store: RootState): number =>
    store.currentTest.passed.length;
export const getAmountOfFailed = (store: RootState): number =>
    store.currentTest.failed.length;
export const getTestedKey = (store: RootState): string =>
    store.currentTest.currentKey;

export default reducer;
