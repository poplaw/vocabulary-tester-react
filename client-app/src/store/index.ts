import { combineReducers } from "redux";
import application from "./application/applicationSlice";

const rootReducer = combineReducers({
    application,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
