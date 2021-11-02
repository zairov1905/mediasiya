import {
  FETCH_APPLY_FOR_MEDIATOR,
  LISTEN_APPLY_FOR_MEDIATOR,
  REJECT_APPLY_FOR_MEDIATOR,
  APPROVE_APPLY_FOR_MEDIATOR,
} from "./mediatorConstants";

const initialState = {
  applysOfMediator: [],
  listenedApplyForMediator: [],
  rejectedApply: [],
  approvedApply: [],
};

export default function mediatorReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case FETCH_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        applys: payload,
        totalCount: totalCount,
      };
    case LISTEN_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        listenedApply: payload,
        totalCount: totalCount,
      };
    case REJECT_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        rejectedApply: payload,
        totalCount: totalCount,
      };
    case APPROVE_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        approvedApply: payload,
        totalCount: totalCount,
      };
      default:
      return state;
  }
}
