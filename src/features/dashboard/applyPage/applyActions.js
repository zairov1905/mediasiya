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
  LISTEN_APPLY,
  REJECT_APPLY,
  FETCH_DISTRICT,
  FETCH_COURT,
  FETCH_PROFESSION,
  UPDATE_APPLY,
  FETCH_MEDIATOR,
  FETCH_OFFICE,
  FETCH_PRINT,
  APPROVE_APPLY,
  ASSING_MEADIATR,
} from "./applyConstants";
const url = "customer";
export function loadApply(data, type) {
  return async function (dispatch, getState) {
    let url = getState().auth.currentUser.role ? getState().auth.currentUser.role.toLowerCase():null;
    dispatch(asyncActionStart());
    await axios
      .get(`/Request/${url}s/all`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_APPLY,
          payload: datas.data.data.data,
          totalCount: datas.data.totalCount,
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
          type: LISTEN_APPLY,
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
export function rejectApply(data, text) {
  return async function (dispatch) {
    dispatch(asyncActionStart("reject"));
    await axios
      .post(`/Request/reject/${data}`, {
        // params: { body:text },
      })
      .then((datas) => {
        dispatch({
          type: REJECT_APPLY,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
        });
        dispatch(loadApply());

        toast.error(datas.data.message);
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.data.message));
        dispatch(loadApply());
        toast.info("Siz daha öncə müraciətdən imtina etmisiniz");
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
        dispatch({
          type: APPROVE_APPLY,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
        });
        dispatch(loadApply());

        dispatch(asyncActionFinish());
        // window.location.reload();
        toast.success(datas.data.message);

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
          type: ASSING_MEADIATR,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
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
export function loadCourt(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${"Data/courts"}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_COURT,
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

export function loadMediatr(data) {
  return async function (dispatch, getState) {
    const modalType = getState().modals.modalType;
    let officeIdModal;
    if (modalType === "SelectMediatorModal") {
      officeIdModal = getState().auth.currentUser.office.id;

      data = officeIdModal;
    }

    let url;
    if (officeIdModal) {
      url = `Data/mediatrs/${data}`;
    } else {
      url = `Data/district-mediatrs`;
    }
    dispatch(asyncActionStart());
    await axios
      .get(url, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_MEDIATOR,
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

export function loadPrint(data) {
  return async function (dispatch, getState) {
    dispatch(asyncActionStart("print"));
    await axios
      .get(`/Request/print/${data}`, {
        params: { ...data },
      })
      .then((datas) => {
        if (datas.data.Succeeded === false) {
          dispatch(asyncActionError(datas.data.Message));
        }
        dispatch({
          type: FETCH_PRINT,
          payload: datas.data.data,
          totalCount: datas.data.totalCount,
        });
        dispatch(asyncActionFinish("print"));
        const loadedPrint = getState().applys.prints;
        const err = getState().async.error;

        if (loadedPrint) {
          window.open(`http://muraciet.mediasiya.gov.az:8080/${loadedPrint}`);
          // // return <Redirect to={`http://172.16.2.45/${print}`} />;
        } else {
          toast.info(`${err}`);
        }
      })
      .catch((err) => {
        dispatch(asyncActionError(err.Message));
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
        dispatch({ type: CREATE_APPLY, payload: data.data.data });
        dispatch(loadApply());
        dispatch(asyncActionFinish());
        toast.success("Müraciətiniz uğurla qeydə alındı");
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
