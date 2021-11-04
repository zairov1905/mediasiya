import {
  FETCH_MEDIATOR_FOR_COUNCIL,
  LISTEN_MEDIATOR_FOR_COUNCIL,
} from "./mediatorForCouncilConstants";

const initialState = {
  mediators: [],
  listenedMediator: [],
  totalCount: null,
};

export default function mediatorForCouncilReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case FETCH_MEDIATOR_FOR_COUNCIL:
      return {
        ...state,
        mediators: payload,
        totalCount: totalCount,
      };
    case LISTEN_MEDIATOR_FOR_COUNCIL:
      return {
        ...state,
        listenedMediator: payload,
      };
    default:
      return state;
  }
}
