import {
  CREATE_APPLY,
  DELETE_APPLY,
  FETCH_APPLY,
  FETCH_COURT,
  FETCH_DISTRICT,
  UPDATE_APPLY,
} from "./applyConstants";

const initialState = {
  applys: [],
  courts: [],
};

export default function applyReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_APPLY:
      return {
        ...state,
        applys: [...state.applys, payload],
      };
    case UPDATE_APPLY:
      return {
        ...state,
        applys: [
          ...state.applys.filter((apply) => apply.id !== payload.id),
          payload,
        ],
      };

    case DELETE_APPLY:
      return {
        ...state,
        applys: [...state.applys.filter((apply) => apply.id !== payload)],
      };
    case FETCH_APPLY:
      return {
        ...state,
        applys: payload,
        totalCount: totalCount,
      };
    case FETCH_DISTRICT:
      return {
        ...state,
        districts: payload,
        totalCount: totalCount,
      };
    case FETCH_COURT:
      return {
        ...state,
        courts: payload,
        totalCount: totalCount,
      };

    default:
      return state;
  }
}
