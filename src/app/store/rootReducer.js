import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../async/asyncReducer";

const rootReducer = combineReducers({
    async:asyncReducer,
    auth:authReducer,
})

export default rootReducer;