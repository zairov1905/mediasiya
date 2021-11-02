import {
  CREATE_APPLY_FOR_CITIZEN,
  DELETE_APPLY_FOR_CITIZEN,
  FETCH_APPLY_FOR_CITIZEN,
  LISTEN_APPLY_FOR_CITIZEN,
  UPDATE_APPLY_FOR_CITIZEN,
} from "./citizenConstants";

const initialState = {
  applysOfCitizen: [],
  listenApplyOfCitizen: [],
  totalCount:null
};

export default function citizenReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applysOfCitizen: [payload, ...state.applysOfCitizen],
        totalCount: state.totalCount + 1,
      };
    case UPDATE_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applysOfCitizen: [
          ...state.applysOfCitizen.filter((apply) => apply.id !== payload.id),
          payload,
        ],
      };

    case DELETE_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applysOfCitizen: [
          ...state.applysOfCitizen.filter((apply) => apply.id !== payload),
        ],
      };
    case FETCH_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applysOfCitizen: payload,
        totalCount: totalCount,
      };
    case LISTEN_APPLY_FOR_CITIZEN:
      return {
        ...state,
        listenApplyOfCitizen: payload,
        totalCount: totalCount,
      };
    default:
      return state;
  }
}
