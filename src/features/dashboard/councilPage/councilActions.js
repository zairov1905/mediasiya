import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  ASSIGN_MEDIATOR_FOR_COUNCIL,
  FETCH_APPLY_FOR_MEDIATOR,
  LISTEN_APPLY_FOR_MEDIATOR,
} from "./councilConstants";
const url = "mediatrs";
export function loadApply(data, type) {
  return async function (dispatch, getState) {
    dispatch(asyncActionStart());
    await axios
      .get(`/Request/${url}/all`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_APPLY_FOR_MEDIATOR,
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
export function listenToApply(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart("listenToApply"));
    await axios
      .get(`/Request/${data}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: LISTEN_APPLY_FOR_MEDIATOR,
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
export function assignMediator(requestId, mediatrId) {
  return async function (dispatch) {
    dispatch(asyncActionStart("approve"));
    let url;
    if (!mediatrId) {
      url = `/Request/assign-mediatr/${requestId}`;
    } else {
      url = `/Request/assign-mediatr/${requestId}/${mediatrId}`;
    }
    await axios
      .get(url)
      .then((datas) => {
        dispatch({
          type: ASSIGN_MEDIATOR_FOR_COUNCIL,
          payload: datas.data.data,
        });
        toast.success(datas.data.totalCount);
        dispatch(loadApply());

        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info(err.message);
      });
  };
}