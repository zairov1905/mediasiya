import {
  CREATE_APPLY_FOR_CITIZEN,
  DELETE_APPLY_FOR_CITIZEN,
  FETCH_APPLY_FOR_CITIZEN,
  LISTEN_APPLY_FOR_CITIZEN,
  UPDATE_APPLY_FOR_CITIZEN,

} from "./citizenConstants";

const initialState = {
  applys: [],
  listenedApply: [],

};

export default function citizenReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applys: [...state.applys, payload],
      };
    case UPDATE_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applys: [
          ...state.applys.filter((apply) => apply.id !== payload.id),
          payload,
        ],
      };

    case DELETE_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applys: [...state.applys.filter((apply) => apply.id !== payload)],
      };
    case FETCH_APPLY_FOR_CITIZEN:
      return {
        ...state,
        applys: payload,
        totalCount: totalCount,
      };
    case LISTEN_APPLY_FOR_CITIZEN:
      return {
        ...state,
        listenedApply: payload,
        totalCount: totalCount,
      };
    default:
      return state;
  }
}
