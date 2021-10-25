import {
  CREATE_APPLY,
  DELETE_APPLY,
  FETCH_APPLY,
  FETCH_COURT,
  FETCH_DISTRICT,
  FETCH_PROFESSION,
  FETCH_MEDIATOR,
  UPDATE_APPLY,
  FETCH_OFFICE,
  FETCH_PRINT,
  LISTEN_APPLY,
  REJECT_APPLY,
  APPROVE_APPLY,
  ASSING_MEADIATR,
} from "./applyConstants";

const initialState = {
  applys: [],
  courts: [],
  professions: [],
  mediatrs: [],
  prints: [],
  listenedApply: [],
  rejectedApply: [],
  approvedApply: [],
  assignedMediatr: [],
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
    case LISTEN_APPLY:
      return {
        ...state,
        listenedApply: payload,
        totalCount: totalCount,
      };
    case REJECT_APPLY:
      return {
        ...state,
        rejectedApply: payload,
        totalCount: totalCount,
      };
    case APPROVE_APPLY:
      return {
        ...state,
        approvedApply: payload,
        totalCount: totalCount,
      };
    case ASSING_MEADIATR:
      return {
        ...state,
        assignedMediatr: payload,
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
    case FETCH_PROFESSION:
      return {
        ...state,
        professions: payload,
        totalCount: totalCount,
      };
    case FETCH_MEDIATOR:
      return {
        ...state,
        mediatrs: payload,
        totalCount: totalCount,
      };
    case FETCH_OFFICE:
      return {
        ...state,
        offices: payload,
        totalCount: totalCount,
      };
    case FETCH_PRINT:
      return {
        ...state,
        prints: payload,
        totalCount: totalCount,
      };
    default:
      return state;
  }
}
