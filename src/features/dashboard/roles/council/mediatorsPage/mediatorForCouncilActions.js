import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../../app/async/asyncReducer";

import { FETCH_MEDIATOR_FOR_COUNCIL, LISTEN_MEDIATOR_FOR_COUNCIL } from "./mediatorForCouncilConstants";
const url = "mediatrs";
export function loadMediator(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/Mediatr/all`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_MEDIATOR_FOR_COUNCIL,
          payload: datas.data.data.data,
          totalCount: datas.data.data.totalCount,
        });
        // dispatch(loadApply())
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function listenToMediator(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart("listenToMediator"));
    await axios
      .get(`/Mediatr/${data}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas);
        dispatch({
          type: LISTEN_MEDIATOR_FOR_COUNCIL,
          payload: datas.data.data,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}

