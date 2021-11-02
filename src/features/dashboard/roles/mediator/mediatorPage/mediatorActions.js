import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../../app/async/asyncReducer";
import {
  FETCH_APPLY_FOR_MEDIATOR,
  LISTEN_APPLY_FOR_MEDIATOR,
  REJECT_APPLY_FOR_MEDIATOR,
  APPROVE_APPLY_FOR_MEDIATOR,
} from "./mediatorConstants";
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
export function rejectApply(data, text) {
  return async function (dispatch) {
    dispatch(asyncActionStart("reject"));
    await axios
      .post(`/Request/reject/${data}`, {
        // params: { body:text },
      })
      .then((datas) => {
        if (datas.data.succeeded === true) {
          toast.success(datas.data.message);

          dispatch({
            type: REJECT_APPLY_FOR_MEDIATOR,
            payload: datas.data.data,
          });
        }

        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function approveApply(data) {
  return async function (dispatch) {
    console.log(data);

    dispatch(asyncActionStart("approve"));
    await axios
      .get(`/Request/approve/${data}`, {
        params: { ...data },
      })
      .then((datas) => {
        if (datas.data.succeeded === true) {
          toast.success(datas.data.message);

          dispatch({
            type: APPROVE_APPLY_FOR_MEDIATOR,
            payload: datas.data.data,
          });
        }

        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
