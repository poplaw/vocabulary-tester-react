import { combineReducers, Action } from "redux";
import application from "./application/applicationSlice";
import dictionary from "./dictionary/dictionarySlice";
import currentTest from "./currentTest/currentTestSlice";
import error from "./error/errorSlice";
import { ThunkAction } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    application,
    dictionary,
    currentTest,
    error,
});

export default rootReducer;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof rootReducer>;
