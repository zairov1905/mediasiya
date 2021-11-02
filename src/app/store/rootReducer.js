import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import applyReducer from "../../features/dashboard/applyPage/applyReducer";
import citizenReducer from "../../features/dashboard/citizenPage/citizenReducer";
import councilReducer from "../../features/dashboard/councilPage/councilReducer";
import mediatorReducer from "../../features/dashboard/mediatorPage/mediatorReducer";
import formReducer from "../../features/form/formReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modal/modalReducer";

const rootReducer = combineReducers({
    async:asyncReducer,
    modals:modalReducer,
    auth:authReducer,
    citizen:citizenReducer,
    mediator:mediatorReducer,
    council:councilReducer,
    applys:applyReducer,
    forms:formReducer
})

export default rootReducer;
