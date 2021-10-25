import { Form, Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

import React, { useEffect, useState } from "react";
// import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import MySearchableSelect from "../../app/common/form/MySearchableSelect";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
// import { Redirect } from "react-router";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { openModal } from "../../../app/common/modal/modalReducer";
// import MyTextArea from "../../app/common/form/MyTextArea";

export default function FormPage(form) {
  const auth = useSelector((state) => state.auth);
  const async = useSelector((state) => state.async);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  const initialValues = form
    ? {
        professionId: "",
      }
    : {
        professionId: "",
      };
  const validationSchema = Yup.object({});

  const seriaTypes = [
    { label: "AA", value: "AA" },
    { label: "AZE", value: "AZE" },
  ];
  //   sertifikat

  const [certificate, setCertificate] = useState([
    {
      giver: "",
      name: "",
      date: "",
    },
  ]);
  const handleAddCertificate = () => {
    setCertificate([
      ...certificate,
      {
        fullName: "",
        advocateFullName: "",
        organizationName: "",
        address: "",
        phone: "",
        email: "",
      },
    ]);
  };
  const handleRemoveCertificate = () => {
    if (certificate.length > 1) {
      let lastIndex = certificate.length - 1;
      let values = [...certificate];
      values.splice(lastIndex, 1);
      setCertificate(values);
    }
  };
  //   education
  const [education, setEducation] = useState([
    {
      giver: "",
      name: "",
      date: "",
    },
  ]);
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        fullName: "",
        advocateFullName: "",
        organizationName: "",
      },
    ]);
  };
  const handleRemoveEducation = () => {
    if (education.length > 1) {
      let lastIndex = education.length - 1;
      let values = [...education];
      values.splice(lastIndex, 1);
      setEducation(values);
    }
  };
  return (
    <React.Fragment>
      {/* BEGIN FORMPAGE CONTAINER */}
      {/* <div className="layout-px-spacing">
        <div className="row layout-top-spacing">
          <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div className="widget-content widget-content-area br-6">
               */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          // console.log('ugurludur')
          dispatch();
          //   rejectApply(apply.id, {
          //     rejectText: values.reasonOfReject,
          //   })
          // setModal(true);
          // dispatch(closeModal());
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="text-left mt-4">
            <div className="helpdesk container">
              <div className="helpdesk layout-spacing">
                <div className="hd-header-wrapper">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h4 className>
                        Mediator məlumatların toplanması üçün sorğu
                      </h4>
                      <p className>Mediasiya Şurası</p>
                    </div>
                  </div>
                </div>
                <div className="hd-tab-section">
                  <div className="row">
                    <div className="col-md-12 mb-5 mt-5">
                      <div className="accordion" id="hd-statistics">
                        <div className="card">
                          <div className="card-header" id="hd-statistics-1">
                            <div className="mb-0">
                              <div
                                className="collapsed"
                                data-toggle="collapse"
                                role="navigation"
                                data-target="#collapse-hd-statistics-1"
                                aria-expanded="false"
                                aria-controls="collapse-hd-statistics-1"
                              >
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
                                  className="feather feather-help-circle"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <line x1={12} y1={17} x2={12} y2={17} />
                                </svg>
                                Şəxsi məlumatlar
                              </div>
                            </div>
                          </div>
                          <div
                            id="collapse-hd-statistics-1"
                            className="collapse"
                            aria-labelledby="hd-statistics-1"
                            data-parent="#hd-statistics"
                            style={{}}
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-2">
                                  <MySearchableSelect
                                    id="1"
                                    name="1"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    // className="form-control"
                                    placeholder="ŞV seriyası"
                                    label={"ŞV seriyası *"}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <MyTextInput
                                    id="2"
                                    name="2"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="ŞV nömrəsi"
                                    label={"ŞV nömrəsi *"}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="FİN"
                                    label={"FİN *"}
                                  />
                                </div>
                                <div className="col-md-2 pt-1">
                                  <div>
                                    <button className="w-100 btn btn-outline-primary btn-lg mt-4">
                                      Axtar
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-5">
                                <div className="col-md-3">
                                  <MyTextInput
                                    id="1"
                                    name="1"
                                    type="text"
                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Ad"
                                    label={"Ad *"}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <MyTextInput
                                    id="2"
                                    name="2"
                                    type="text"
                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Soyad"
                                    label={"Soyad *"}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Ata adı"
                                    label={"Ata adı *"}
                                  />
                                </div>
                                <div className="col-md-3 pt-1">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Doğum tarixi"
                                    label={"Doğum tarixi *"}
                                  />
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="col-md-12 mv-4 pt-1">
                                  <MyTextArea
                                    id="3"
                                    name="3"
                                    type="text"
                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Qeydiyyat ünvanı"
                                    label={"Doğum tarixi *"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="hd-statistics-2">
                            <div className="mb-0">
                              <div
                                className="collapsed"
                                data-toggle="collapse"
                                role="navigation"
                                data-target="#collapse-hd-statistics-2"
                                aria-expanded="false"
                                aria-controls="collapse-hd-statistics-2"
                              >
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
                                  className="feather feather-help-circle"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <line x1={12} y1={17} x2={12} y2={17} />
                                </svg>
                                Fəaliyyətinə dair məlumatlar
                              </div>
                            </div>
                          </div>
                          <div
                            id="collapse-hd-statistics-2"
                            className="collapse"
                            aria-labelledby="hd-statistics-2"
                            data-parent="#hd-statistics"
                            style={{}}
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="1"
                                    name="1"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    isMulti
                                    // className="form-control"
                                    placeholder="İxtisas"
                                    label={"İxtisas *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="1"
                                    name="1"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    // className="form-control"
                                    placeholder="Təlim keçdiyi qurum"
                                    label={"Təlim keçdiyi qurum *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="1"
                                    name="1"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    // className="form-control"
                                    placeholder="Ərazi Rayonlar"
                                    label={"Ərazi Rayonlar *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="1"
                                    name="1"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    // className="form-control"
                                    placeholder="Təşkilat"
                                    label={"Təşkilat *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextArea
                                    id="2"
                                    name="2"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Fəliyyət göstərdiyi ünvan"
                                    label={"Fəaliyyət göstərdiyi ünvan *"}
                                  />
                                </div>

                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="date"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Üzvlüyə qəbul edildiyi tarix"
                                    label={"Üzvlüyə qəbul edildiyi tarix *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Reyestr nömrəsi"
                                    label={"Reyestr nömrəsi *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="VÖEN"
                                    label={"VÖEN *"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="hd-statistics-3">
                            <div className="mb-0">
                              <div
                                className="collapsed"
                                data-toggle="collapse"
                                role="navigation"
                                data-target="#collapse-hd-statistics-3"
                                aria-expanded="false"
                                aria-controls="collapse-hd-statistics-3"
                              >
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
                                  className="feather feather-help-circle"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <line x1={12} y1={17} x2={12} y2={17} />
                                </svg>
                                Sertifikat barədə məlumatlar
                              </div>
                            </div>
                          </div>
                          <div
                            id="collapse-hd-statistics-3"
                            className="collapse"
                            aria-labelledby="hd-statistics-3"
                            data-parent="#hd-statistics"
                            style={{}}
                          >
                            <div className="card-body">
                              <div className="row mb-4">
                                <div className="col-md-2 offset-10 text-right">
                                  <div className="icon-container">
                                    <button
                                      title="Sertifikat əlavə et"
                                      type="button"
                                      className="close"
                                      onClick={() => handleAddCertificate()}
                                    >
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
                                        className="feather feather-plus-circle"
                                      >
                                        <circle cx={12} cy={12} r={10} />
                                        <line x1={12} y1={8} x2={12} y2={16} />
                                        <line x1={8} y1={12} x2={16} y2={12} />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveCertificate()}
                                      className="close"
                                      title="Sertifikat sil"
                                    >
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
                                        className="feather feather-minus-circle"
                                      >
                                        <circle cx={12} cy={12} r={10} />
                                        <line x1={8} y1={12} x2={16} y2={12} />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {certificate &&
                                certificate.map((certi, index) => (
                                  <React.Fragment key={index}>
                                    <div className="row">
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id="3"
                                          name="3"
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Sertifikati verən qurum"
                                          label={"Sertifikati verən qurum *"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id="3"
                                          name="3"
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Sertifikatın adı, növü"
                                          label={"Sertifikatın adı, növü *"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id="3"
                                          name="3"
                                          type="date"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Sertifikatın verilmə tarixi"
                                          label={
                                            "Sertifikatın verilmə tarixi *"
                                          }
                                        />
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="hd-performance-1">
                            <div className="mb-0">
                              <div
                                className
                                data-toggle="collapse"
                                role="navigation"
                                data-target="#collapse-hd-performance-1"
                                aria-expanded="false"
                                aria-controls="collapse-hd-performance-1"
                              >
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
                                  className="feather feather-help-circle"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <line x1={12} y1={17} x2={12} y2={17} />
                                </svg>
                                Əlaqə
                              </div>
                            </div>
                          </div>
                          <div
                            id="collapse-hd-performance-1"
                            className="collapse"
                            aria-labelledby="hd-performance-1"
                            data-parent="#hd-statistics"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="2"
                                    name="2"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Telefon"
                                    label={"Telefon *"}
                                  />
                                </div>

                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Email"
                                    label={"Email *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Whatsapp"
                                    label={"Whatsapp *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Facebook"
                                    label={"Facebook *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Instagram"
                                    label={"Instagram *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="İnternet səhifəsi"
                                    label={"İnternet səhifəsi *"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="hd-performance-2">
                            <div className="mb-0">
                              <div
                                className=" collapsed"
                                data-toggle="collapse"
                                role="navigation"
                                data-target="#collapse-hd-performance-2"
                                aria-expanded="false"
                                aria-controls="collapse-hd-performance-2"
                              >
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
                                  className="feather feather-help-circle"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <line x1={12} y1={17} x2={12} y2={17} />
                                </svg>
                                Təhsil məlumatları
                              </div>
                            </div>
                          </div>
                          <div
                            id="collapse-hd-performance-2"
                            className="collapse"
                            aria-labelledby="hd-performance-2"
                            data-parent="#hd-statistics"
                          >
                            <div className="card-body">
                              <div className="row mb-4">
                                <div className="col-md-2 offset-10 text-right">
                                  <div className="icon-container">
                                    <button
                                      title="Sertifikat əlavə et"
                                      type="button"
                                      className="close"
                                      onClick={() => handleAddEducation()}
                                    >
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
                                        className="feather feather-plus-circle"
                                      >
                                        <circle cx={12} cy={12} r={10} />
                                        <line x1={12} y1={8} x2={12} y2={16} />
                                        <line x1={8} y1={12} x2={16} y2={12} />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveEducation()}
                                      className="close"
                                      title="Sertifikat sil"
                                    >
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
                                        className="feather feather-minus-circle"
                                      >
                                        <circle cx={12} cy={12} r={10} />
                                        <line x1={8} y1={12} x2={16} y2={12} />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {education &&
                                education.map((edu, index) => (
                                  <React.Fragment key={index}>
                                    <div className="row">
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id="3"
                                          name="3"
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Təhsil müəssisəsinin adı"
                                          label={"Təhsil müəssisəsinin adı *"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id="3"
                                          name="3"
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="İxtisas"
                                          label={"İxtisas *"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id="3"
                                          name="3"
                                          type="date"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="il"
                                          label={"İl *"}
                                        />
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="hd-performance-3">
                            <div className="mb-0">
                              <div
                                className=" collapsed"
                                data-toggle="collapse"
                                role="navigation"
                                data-target="#collapse-hd-performance-3"
                                aria-expanded="false"
                                aria-controls="collapse-hd-performance-3"
                              >
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
                                  className="feather feather-help-circle"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <line x1={12} y1={17} x2={12} y2={17} />
                                </svg>
                                Digər
                              </div>
                            </div>
                          </div>
                          <div
                            id="collapse-hd-performance-3"
                            className="collapse"
                            aria-labelledby="hd-performance-3"
                            data-parent="#hd-statistics"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="3"
                                    name="3"
                                    type="text"
                                    isMulti
                                    //   isDisabled={apply ? true : false}
                                    placeholder="Dil bilikləri"
                                    label={"Dil bilikləri *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="İşlədiyi digər yer"
                                    label={"İşlədiyi digər yer *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="3"
                                    name="3"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Vəzifə"
                                    label={"Vəzifə *"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
                            disabled={!isValid || !dirty || isSubmitting}
                            type="submit"
                            // name="time"
                            className="btn btn-danger text-right  btn-lg mt-3 "
                          >
                            İmtina et
                          </button> */}
          </Form>
        )}
      </Formik>
      {/* </div>
          </div>
        </div>
      </div> */}
      {/* END FORMPAGE CONTAINER */}
    </React.Fragment>
  );
}
