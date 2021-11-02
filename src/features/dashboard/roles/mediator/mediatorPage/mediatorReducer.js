import {
  FETCH_APPLY_FOR_MEDIATOR,
  LISTEN_APPLY_FOR_MEDIATOR,
  REJECT_APPLY_FOR_MEDIATOR,
  APPROVE_APPLY_FOR_MEDIATOR,
} from "./mediatorConstants";

const initialState = {
  applysOfMediator: [],
  listenedApplyForMediator: [],
};

export default function mediatorReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case FETCH_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        applysOfMediator: payload,
        totalCount: totalCount,
      };
    case LISTEN_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        listenedApplyForMediator: payload,
        totalCount: totalCount,
      };
    case REJECT_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        applysOfMediator: [
          payload, ...state.applysOfMediator.filter(
            (apply) => apply.id !== payload.id
          ),
        ],
      };
    case APPROVE_APPLY_FOR_MEDIATOR:
      return {
        ...state,
        applysOfMediator: [
          payload, ...state.applysOfMediator.filter(
            (apply) => apply.id !== payload.id
          ),
        ],
      };
    default:
      return state;
  }
}
