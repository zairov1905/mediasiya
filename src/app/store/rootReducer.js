import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import applyReducer from "../../features/dashboard/applyPage/applyReducer";
import citizenReducer from "../../features/dashboard/citizenPage/citizenReducer";
import formReducer from "../../features/form/formReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modal/modalReducer";

const rootReducer = combineReducers({
    async:asyncReducer,
    modals:modalReducer,
    auth:authReducer,
    citizen:citizenReducer,
    applys:applyReducer,
    forms:formReducer
})

export default rootReducer;
