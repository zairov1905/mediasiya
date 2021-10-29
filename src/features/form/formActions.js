import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { FETCH_OFFICE } from "../dashboard/applyPage/applyConstants";
import {
  CREATE_MEDIATR,
  FETCH_DISTRICT,
  FETCH_INSTITUTION,
  FETCH_PERSON,
  FETCH_PROFESSION,
  FETCH_SOCIAL_MEDIA,
} from "./formConstants";
export function createMediatr(history,formData) {
  return async function (dispatch) {
    dispatch(asyncActionStart("createMediatr"));
    await axios
      .post(`/${"Mediatr/new"}`, formData,
      // {
      //   headers: { "Content-Type": "multipart/form-data" }
      // }
      )
      .then((data) => {
        dispatch({ type: CREATE_MEDIATR, payload: data.data.data, message:data.data.message });
        dispatch(asyncActionFinish());
        toast.success(data.data.message);
      })
      .catch((err) => {
        dispatch(asyncActionError(err.Message));
        toast.info("Xəta baş verdi, yenidən cəhd edin.");
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
        dispatch({
          type: FETCH_PROFESSION,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function loadInstitution(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/institutions"}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_INSTITUTION,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
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
      .get(`/${"Data/child-districts"}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_DISTRICT,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function loadSocialMedia(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/social-medias"}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_SOCIAL_MEDIA,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
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
        dispatch({
          type: FETCH_OFFICE,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function getPerson(getPerson) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`/${"Data/person/by-id-card"}`, getPerson)
      .then((data) => {
        if(data.data.Succeeded === false){
        toast.info(data.data.Message);
        }
        dispatch({ type: FETCH_PERSON, payload: data.data.data });
        dispatch(asyncActionFinish());
        // toast.success("Daxil etdiyiniz şəxsin məlumatları müvafiq xanalara dolduruldu.");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəhd edin.");
      });
  };
}