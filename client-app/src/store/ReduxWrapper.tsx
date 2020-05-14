import React, { FC } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";

const store = configureStore({ reducer: rootReducer });

export default ({ element }): FC => (
    <Provider store={store}>{element}</Provider>
);
