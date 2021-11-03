import {
  FETCH_APPLY_FOR_COUNCIL,
  LISTEN_APPLY_FOR_COUNCIL,
  ASSIGN_MEDIATOR_FOR_COUNCIL,
} from "./councilConstants";

const initialState = {
  applysOfCouncil: [],
  listenedApplyForCouncil: [],
};

export default function councilReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case FETCH_APPLY_FOR_COUNCIL:
      return {
        ...state,
        applysOfCouncil: payload,
        totalCount: totalCount,
      };
    case LISTEN_APPLY_FOR_COUNCIL:
      return {
        ...state,
        listenedApplyForCouncil: payload,
        totalCount: totalCount,
      };
    case ASSIGN_MEDIATOR_FOR_COUNCIL:
      return {
        ...state,
        applysOfCouncil: [
          payload,
          ...state.applysOfCouncil.filter((apply) => apply.id !== payload.id),
        ],
      };

    default:
      return state;
  }
}
