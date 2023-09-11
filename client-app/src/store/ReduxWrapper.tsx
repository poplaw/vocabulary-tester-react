import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";

const store = configureStore({ reducer: rootReducer });

export default function ReduxWrapper({ element }) {
    return <Provider store={store}>{element}</Provider>;
}
