import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import applyReducer from "../../features/dashboard/applyPage/applyReducer";
import citizenReducer from "../../features/dashboard/roles/citizen/citizenPage/citizenReducer";
import councilReducer from "../../features/dashboard/roles/council/councilPage/councilReducer";
import mediatorReducer from "../../features/dashboard/roles/mediator/mediatorPage/mediatorReducer";
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
