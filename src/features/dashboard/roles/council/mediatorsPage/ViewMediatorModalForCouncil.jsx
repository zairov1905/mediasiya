import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import ScriptTag from 'react-script-tag';
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import { Form, Formik } from "formik";
import { closeModal } from "../../../../../app/common/modal/modalReducer";
import MyTextArea from "../../../../../app/common/form/MyTextArea";

import ModalWrapper from "../../../../../app/common/modal/ModalWrapper";
import { listenToMediator } from "./mediatorForCouncilActions";

export default function ViewMediatorModalForCouncil({ mediator }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const async = useSelector((state) => state.async);
  const { listenedMediator } = useSelector((state) => state.mediatorForCouncil);
  
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  useEffect(async () => {
    mediator && (await dispatch(listenToMediator(mediator.id)));
  }, [dispatch]);

  const initialValues = {

    // mediatorNames: [],
  };
  const validationSchema = Yup.object({});

  useEffect(() => {
    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  }, []);
  return (
    <ModalWrapper size="modal-xl" header={"Mediator"}>
      {async.kind === "listenToMediator" ? (
        <div className="loader text-center">
          {" "}
          <div className="loader-content">
            <div className="spinner-grow align-self-center"></div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form id="emp">
                <p></p>
                <button
                  style={{ display: "none" }}
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
        </React.Fragment>
      )}
    </ModalWrapper>
  );
}
