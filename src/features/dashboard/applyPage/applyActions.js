import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { CREATE_APPLY, DELETE_APPLY, FETCH_APPLY,FETCH_DISTRICT,FETCH_COURT, UPDATE_APPLY } from "./applyConstants";
const url = "customer";
export function loadApply(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas)
        dispatch({
          type: FETCH_APPLY,
          payload: datas.data.data,
          totalCount: datas.data.message,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}

export function loadDistrict(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/districts"}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas.data.data)
        dispatch({
          type: FETCH_DISTRICT,
          payload: datas.data.data,
          totalCount: datas.data.message,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function loadCourt(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/courts"}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas.data.data)
        dispatch({
          type: FETCH_COURT,
          payload: datas.data.data,
          totalCount: datas.data.message,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function listenToApply(data) {
  return {
    type: FETCH_APPLY,
    payload: data,
  };
}

export function createApply(createdData) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, createdData, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_APPLY, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
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
          type: UPDATE_APPLY,
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
        dispatch({ type: DELETE_APPLY, payload: deletedDataId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
