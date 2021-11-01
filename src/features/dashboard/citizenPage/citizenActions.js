import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  CREATE_APPLY_FOR_CITIZEN,
  DELETE_APPLY_FOR_CITIZEN,
  FETCH_APPLY_FOR_CITIZEN,
  LISTEN_APPLY_FOR_CITIZEN,
  UPDATE_APPLY_FOR_CITIZEN,
} from "./citizenConstants";
const url = "customer";
export function loadApply(data) {
  return async function (dispatch) {
    let url = "citizens"
    dispatch(asyncActionStart());
    await axios
      .get(`/Request/${url}/all`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_APPLY_FOR_CITIZEN,
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
    dispatch(asyncActionStart("listenApply"));
    await axios
      .get(`/Request/${data}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: LISTEN_APPLY_FOR_CITIZEN,
          payload: datas.data.data,
          totalCount: datas.data.data.totalCount,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function createApply(createdData) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`/${"Request/new"}`, createdData, {
        withCredentials: true,
      })
      .then((data) => {
        if (data.data.succeeded === true) {
          dispatch({ type: CREATE_APPLY_FOR_CITIZEN, payload: data.data.data });
          dispatch(asyncActionFinish());
          toast.success(data.data.message);

        }

      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəhd edin.");
      });
  };
}

export function updateApply(updatedData) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, updatedData)
      .then((data) => {
        dispatch({
          type: UPDATE_APPLY_FOR_CITIZEN,
          payload: data.data.data,
        });
        dispatch(asyncActionFinish());
        toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function deleteApply(deletedDataId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${deletedDataId}`)
      .then((data) => {
        dispatch({ type: DELETE_APPLY_FOR_CITIZEN, payload: deletedDataId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
