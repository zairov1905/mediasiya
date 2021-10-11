import React, { useEffect, useState } from "react";
import $ from "jquery";
// import ModalWrapper from "../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik } from "formik";
// import { createOrder, sendToOperation, updateOrder } from "./orderActions";
// import { closeModal } from "../../../app/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import ModalWrapper from "../../../app/common/modal/ModalWrapper";
import { closeModal } from "../../../app/common/modal/modalReducer";
import { assignMediator, loadApply, loadMediatr } from "./applyActions";

export default function SelectMediatorModal({ auth, apply }) {
  console.log(apply, "requestId");
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    dispatch(loadMediatr(auth.currentUser.office.id));
  }, [dispatch]);
  const { applys } = useSelector((applys) => applys);
  console.log(applys.mediatrs, "oyeh");
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  // const { employees } = useSelector((state) => state.employees);

  let employeeOptions = [];
  // employeeOptions =
  //   employees &&
  //   employees.map((employee) => {
  //     return {
  //       value: employee.id,
  //       label: `${employee.name} ${employee.surname}`,
  //     };
  //   });
  const initialValues = {
    mediatrId: "",
    /////
  };
  const validationSchema = Yup.object({
    mediatrId: Yup.string().required("Mütləq doldurulmalıdır."),
  });
  const mediatorOptions =
    applys.mediatrs &&
    applys.mediatrs.map((mediatr) => {
      return {
        value: parseInt(mediatr.id),
        label: `${mediatr.firstName} ${mediatr.lastName} ${mediatr.middleName}`,
        ids: mediatr.mediatrProfessions.map((medik) => medik.id),
      };
    });
  return (
    <ModalWrapper size="modal-md" header={"Mediator təyin et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await dispatch(assignMediator(apply.id, values.mediatrId));
            await dispatch(loadApply({ pageSize: 20 }));
            setSubmitting(false);
            setModal(true);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            // console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors, values }) => (
          <Form>
            <div className="row">
              <div className="col-md-12">
                <MySearchableSelect
                  name="mediatrId"
                  id="mediatrId"
                  type="text"
                  options={mediatorOptions}
                  label="Mediator"
                  placeholder="Mediator seçin"
                />
              </div>
            </div>
            <button
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              // name="time"
              className="btn btn-primary float-right  btn-lg mt-3 "
            >
              {isSubmitting && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-loader spin mr-2"
                >
                  <line x1={12} y1={2} x2={12} y2={6} />
                  <line x1={12} y1={18} x2={12} y2={22} />
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                  <line x1={2} y1={12} x2={6} y2={12} />
                  <line x1={18} y1={12} x2={22} y2={12} />
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                </svg>
              )}
              İcra et
            </button>
            <button
              id="closeModal"
              onClick={() => {
                dispatch(closeModal());
              }}
              className="btn btn-lg float-right mt-3 mr-2"
              data-dismiss="modal"
            >
              <i className="flaticon-cancel-12" /> Ləğv et
            </button>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
