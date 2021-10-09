import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  CREATE_APPLY,
  DELETE_APPLY,
  FETCH_APPLY,
  FETCH_DISTRICT,
  FETCH_COURT,
  FETCH_PROFESSION,
  UPDATE_APPLY,
  FETCH_MEDIATOR,
  FETCH_OFFICE,
  FETCH_PRINT
} from "./applyConstants";
const url = "customer";
export function loadApply(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Request/citizens/all"}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas.data.data.data, "MURACIET");
        dispatch({
          type: FETCH_APPLY,
          payload: datas.data.data.data,
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
        console.log(datas.data.data);
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
        console.log(datas.data.data);
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
export function loadProfession(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/professions"}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas.data.data, "profession");
        dispatch({
          type: FETCH_PROFESSION,
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

export function loadMediatr(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/mediatrs"}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas.data.data, "profession");
        dispatch({
          type: FETCH_MEDIATOR,
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
export function loadOffice(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/offices"}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas.data.data, "offices");
        dispatch({
          type: FETCH_OFFICE,
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

export function loadPrint(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/Request/print/${data}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_PRINT,
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
      .post(`/${"Request/new"}`, createdData, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_APPLY, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
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
