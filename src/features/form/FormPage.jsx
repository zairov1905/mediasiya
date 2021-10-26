import { Form, Formik, setFieldValue } from "formik";
import moment from "moment";
import * as Yup from "yup";

import React, { useEffect, useState } from "react";
// import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import MySearchableSelect from "../../app/common/form/MySearchableSelect";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import {
  createMediatr,
  getPerson,
  loadDistrict,
  loadInstitution,
  loadOffice,
  loadProfession,
  loadSocialMedia,
} from "./formActions";
// import { Redirect } from "react-router";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { openModal } from "../../../app/common/modal/modalReducer";
// import MyTextArea from "../../app/common/form/MyTextArea";

export default function FormPage(form) {
  const auth = useSelector((state) => state.auth);
  const async = useSelector((state) => state.async);
  const forms = useSelector((state) => state.forms);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfession());
    dispatch(loadInstitution());
    dispatch(loadDistrict());
    dispatch(loadSocialMedia());
    dispatch(loadOffice());
  }, [dispatch]);

  const seriaTypes = [
    { label: "AA", value: "AA" },
    { label: "AZE", value: "AZE" },
  ];
  //   sertifikat

  const [certificate, setCertificate] = useState([
    {
      issuerInstitution: "",
      certificateName: "",
      certificationDate: "",
    },
  ]);
  const handleAddCertificate = () => {
    setCertificate([
      ...certificate,
      {
        issuerInstitution: "",
        certificateName: "",
        certificationDate: "",
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
      collegeName: "",
      majorName: "",
      graduationDate: "",
    },
  ]);
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        collegeName: "",
        majorName: "",
        graduationDate: "",
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
  //   social

  const [social, setSocial] = useState([
    {
      socialMediaId: "",
      linkToPage: "",
    },
  ]);
  const handleAddSocial = () => {
    setSocial([
      ...social,
      {
        socialMediaId: "",
        linkToPage: "",
      },
    ]);
  };
  const handleRemoveSocial = () => {
    if (social.length > 1) {
      let lastIndex = social.length - 1;
      let values = [...social];
      values.splice(lastIndex, 1);
      setSocial(values);
    }
  };
  // profession loading ...
  const professionOptions =
    forms.professions &&
    forms.professions.map((profession) => {
      return {
        value: parseInt(profession.id),
        label: `${profession.professionName}`,
      };
    });

  // profession loading ...
  const institutionOptions =
    forms.institutions &&
    forms.institutions.map((institution) => {
      return {
        value: parseInt(institution.id),
        label: `${institution.institutionName}`,
      };
    });
  // district loading ...
  const districtOptions =
    forms.districts &&
    forms.districts.map((district) => {
      return {
        value: parseInt(district.id),
        label: `${district.districtName}`,
      };
    });
  // Social media loading ...
  const socialMediaOptions =
    forms.socialMedias &&
    forms.socialMedias.map((socialMedia) => {
      return {
        value: parseInt(socialMedia.id),
        label: `${socialMedia.socialMediaName}`,
      };
    });
  console.log(forms.socialMedias && forms.socialMedias, "social");
  // Social media loading ...
  const officeOptions =
    forms.offices &&
    forms.offices.map((office) => {
      return {
        value: parseInt(office.id),
        label: `${office.officeName}`,
      };
    });
  console.log(forms.socialMedias && forms.socialMedias, "social");

  // lang knowledge loading ...

  const languageKnowledgeOptions = [
    { label: "Azərbaycan", value: "Azərbaycan" },
    { label: "Rus", value: "Rus" },
    { label: "İngilis", value: "İngilis" },
  ];

  // getPerson data
  const getPersonData = async (docSeries, docNumber, pin) => {
    await dispatch(getPerson({ docSeries, docNumber, pin }));
  };
  const initialValues = 
  {
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    pin: "",
    docSeries: "",
    docNumber: "",
    regAddress: "",
    actingAddress: "",
    membershipDate: "",
    languageSkills: "",
    voen: "",
    registryNumber: "",
    email: "",
    phone: "",
    personalPageLink: "",
    otherWorkplace: "",
    otherPosition: "",
    officeId: "",
    institutionId: "",
    mediatrProfessions: [],
    districtMediatrs: [],
    mediatrsSocialMedias: social,
    educations: education,
    certificates: certificate
  }

  const validationSchema = Yup.object({});

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
          dispatch(createMediatr({
            firstName:forms.person && forms.person.firstName ,
            lastName:forms.person && forms.person.lastName,
            middleName: forms.person && forms.person.middleName,
            dateOfBirth: forms.person && forms.person.dateOfBirth,
            image:forms.person && forms.person.image,
            pin: values.pin,
            docSeries: values.docSeries,
            docNumber: values.docNumber,
            regAddress: forms.person && forms.person.regAddress,
            actingAddress: values.actingAddress,
            membershipDate: values.membershipDate,
            languageSkills: values.languageSkills,
            voen: values.voen,
            registryNumber: values.registryNumber,
            email: values.email,
            phone: values.phone,
            personalPageLink: values.personalPageLink,
            otherWorkplace: values.otherWorkplace,
            otherPosition: values.otherPosition,
            officeId: values.officeId,
            institutionId: values.institutionId ,
            mediatrProfessions: values.mediatrProfessions,
            districtMediatrs: [values.districtMediatrs],
            mediatrsSocialMedias: values.mediatrsSocialMedias,
            educations: values.educations,
            certificates: values.certificates
          }));
          //   rejectApply(apply.id, {
          //     rejectText: values.reasonOfReject,
          //   })
          // setModal(true);
          // dispatch(closeModal());
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, errors, values }) => (
          <Form className="text-left mt-4">
            <div className="helpdesk container">
              <div className="helpdesk layout-spacing">
                <div className="hd-header-wrapper">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h4 className>
                        Mediator məlumatlarının toplanması üçün sorğu
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
                                    id="docSeries"
                                    name="docSeries"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    // className="form-control"
                                    placeholder="Seriya"
                                    label={"Ş/V seriyası *"}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <MyTextInput
                                    id="docNumber"
                                    name="docNumber"
                                    type="docNumber"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Nömrə"
                                    label={"Ş/V nömrəsi *"}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <MyTextInput
                                    id="pin"
                                    name="pin"
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
                                    <button
                                      onClick={() =>
                                        getPersonData(
                                          values.docSeries,
                                          values.docNumber,
                                          values.pin
                                        )
                                      }
                                      className="w-100 btn btn-outline-primary btn-lg mt-4"
                                    >
                                      Axtar
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-5">
                                <div className="col-md-3">
                                  <MyTextInput
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    
                                    value={
                                      forms.person && forms.person.firstName
                                    }
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
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={
                                      forms.person && forms.person.lastName
                                    }
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
                                    id="middleName"
                                    name="middleName"
                                    type="text"
                                    value={
                                      forms.person && forms.person.middleName
                                    }
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
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={
                                      forms.person && forms.person.dateOfBirth
                                    }
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
                                    id="regAddress"
                                    name="regAddress"
                                    type="text"
                                    value={
                                      forms.person && forms.person.regAddress
                                    }
                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Qeydiyyat ünvanı"
                                    label={"Qeydiyyat ünvanı *"}
                                  />
                                </div>
                              </div>
                              {/* <div className="row mt-5 d-none">
                                <div className="col-md-12 mv-4 pt-1">
                                  <MyTextArea
                                    id="regAddress"
                                    name="regAddress"
                                    type="text"
                                    value={forms.person && forms.person.regAddress}

                                    readOnly
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Qeydiyyat ünvanı"
                                    label={"Qeydiyyat ünvanı *"}
                                  />
                                </div>
                              </div> */}
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
                                    id="mediatrProfessions"
                                    name="mediatrProfessions"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={professionOptions}
                                    isMulti
                                    // className="form-control"
                                    placeholder="İxtisas"
                                    label={"İxtisas *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="institutionId"
                                    name="institutionId"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={institutionOptions}
                                    // className="form-control"
                                    placeholder="Təlim keçdiyi qurum"
                                    label={"Təlim keçdiyi qurum *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="districtMediatrs"
                                    name="districtMediatrs"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={districtOptions}
                                    // className="form-control"
                                    placeholder="Ərazi Rayonlar"
                                    label={"Ərazi Rayonlar *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MySearchableSelect
                                    id="officeId"
                                    name="officeId"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={officeOptions}
                                    // className="form-control"
                                    placeholder="Mediasiya təşkilatı"
                                    label={"Mediasiya təşkilatı"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextArea
                                    id="actingAddress"
                                    name="actingAddress"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Fəliyyət göstərdiyi ünvan"
                                    label={"Fəaliyyət göstərdiyi ünvan *"}
                                  />
                                </div>

                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="membershipDate"
                                    name="membershipDate"
                                    type="date"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Üzvlüyə qəbul edildiyi tarix"
                                    label={"Üzvlüyə qəbul edildiyi tarix *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="registryNumber"
                                    name="registryNumber"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Reyestr nömrəsi"
                                    label={"Reyestr nömrəsi *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="voen"
                                    name="voen"
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
                                          id={`certificates[${index}].issuerInstitution`}
                                          name={`certificates[${index}].issuerInstitution`}
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Sertifikati verən qurum"
                                          label={"Sertifikati verən qurum"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id={`certificates[${index}].certificateName`}
                                          name={`certificates[${index}].certificateName`}
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Sertifikatın adı, növü"
                                          label={"Sertifikatın adı, növü"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id={`certificates[${index}].certificationDate`}
                                          name={`certificates[${index}].certificationDate`}
                                          type="date"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Sertifikatın verilmə tarixi"
                                          label={"Sertifikatın verilmə tarixi"}
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
                                    id="languageSkills"
                                    name="languageSkills"
                                    type="text"
                                    options={languageKnowledgeOptions}
                                    // isMulti
                                    //   isDisabled={apply ? true : false}
                                    placeholder="Dil bilikləri"
                                    label={"Dil bilikləri *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="otherWorkplace"
                                    name="otherWorkplace"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Mediatorluqla yanaşı hazırda işlədiyi yer"
                                    label={
                                      "Mediatorluqla yanaşı hazırda işlədiyi yer"
                                    }
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="otherPosition"
                                    name="otherPosition"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Vəzifə"
                                    label={"Vəzifə"}
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
                                          id={`educations[${index}].collegeName`}
                                          name={`educations[${index}].collegeName`}
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Təhsil müəssisəsinin adı"
                                          label={"Təhsil müəssisəsinin adı *"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id={`educations[${index}].majorName`}
                                          name={`educations[${index}].majorName`}
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="İxtisas"
                                          label={"İxtisas *"}
                                        />
                                      </div>
                                      <div className="col-md-4 mb-4">
                                        <MyTextInput
                                          id={`educations[${index}].graduationDate`}
                                          name={`educations[${index}].graduationDate`}
                                          type="date"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="il"
                                          label={"Bitirdiyi il *"}
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
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    options={seriaTypes}
                                    className="form-control"
                                    placeholder="Telefon nömrəsi"
                                    label={"Telefon nömrəsi *"}
                                  />
                                </div>

                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="email"
                                    name="email"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Elektron poçt ünvanı"
                                    label={"Elektron poçt ünvanı *"}
                                  />
                                </div>
                                <div className="col-md-12 mb-4">
                                  <MyTextInput
                                    id="personalPageLink"
                                    name="personalPageLink"
                                    type="text"
                                    //   isDisabled={apply ? true : false}
                                    className="form-control"
                                    placeholder="Rəsmi veb səhifəsi"
                                    label={"Rəsmi veb səhifəsi"}
                                  />
                                </div>
                              </div>
                              <div className="row mt-4">
                                <div className="col-md-2 offset-10 text-right">
                                  <div className="icon-container">
                                    <button
                                      title="Sosial media əlavə et"
                                      type="button"
                                      className="close"
                                      onClick={() => handleAddSocial()}
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
                                      onClick={() => handleRemoveSocial()}
                                      className="close"
                                      title="Sosial media sil"
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
                              {social &&
                                social.map((soci, index) => (
                                  <React.Fragment key={index}>
                                    <div className="row">
                                      <div className="col-md-6 mb-4">
                                        <MySearchableSelect
                                          id={`mediatrsSocialMedias[${index}].socialMediaId`}
                                          name={`mediatrsSocialMedias[${index}].socialMediaId`}
                                          type="text"
                                          options={socialMediaOptions}
                                          //   isDisabled={apply ? true : false}
                                          // className="form-control"
                                          placeholder="Social media hesabı"
                                          label={"Social media hesabı *"}
                                        />
                                      </div>
                                      <div className="col-md-6 mb-4">
                                        <MyTextInput
                                          id={`mediatrsSocialMedias[${index}].linkToPage`}
                                          name={`mediatrsSocialMedias[${index}].linkToPage`}
                                          type="text"
                                          //   isDisabled={apply ? true : false}
                                          className="form-control"
                                          placeholder="Social media hesabının linki"
                                          label={
                                            "Social media hesabının linki *"
                                          }
                                        />
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ))}
                              {console.log(values)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="row">
                <div className="col-md-12">
                <button
                  disabled={!isValid || !dirty || isSubmitting}
                  type="submit"
                  // name="time"
                  className="btn btn-primary float-right   btn-lg"
                >
                  Əlavə et
                </button>
                </div>
              </div>

              </div>
            </div>
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
