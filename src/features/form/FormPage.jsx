import { Form, Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { Redirect, useHistory } from "react-router";
import React, { useEffect, useState } from "react";
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
import Button from "../../app/common/modal/Button";
import MyTextInputWithMask from "../../app/common/form/MyTextInputWithMask";

export default function FormPage(form) {
  const history = useHistory();

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
  const prefixTypes = [
    { label: "050", value: "050" },
    { label: "051", value: "051" },
    { label: "055", value: "055" },
    { label: "060", value: "060" },
    { label: "070", value: "070" },
    { label: "070", value: "070" },
    { label: "099", value: "099" },
  ];
  //   sertifikat

  const [certificate, setCertificate] = useState([
    {
      issuerInstitution: "",
      certificateName: "",
      certificationDate: "",
      imageData: "",
    },
  ]);
  const handleAddCertificate = () => {
    setCertificate([
      ...certificate,
      {
        issuerInstitution: "",
        certificateName: "",
        certificationDate: "",
        imageData: "",
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
  // Social media loading ...
  const officeOptions =
    forms.offices &&
    forms.offices.map((office) => {
      return {
        value: parseInt(office.id),
        label: `${office.officeName}`,
      };
    });

  // lang knowledge loading ...

  const languageKnowledgeOptions = [
    { label: "Az??rbaycan", value: "Az??rbaycan" },
    { label: "Rus", value: "Rus" },
    { label: "??ngilis", value: "??ngilis" },
  ];

  // getPerson data
  const getPersonData = async (docSeries, docNumber, pin) => {
    await dispatch(getPerson({ docSeries, docNumber, pin }));
  };
  const initialValues = {
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
    // officeId: "",

    institutionId: "",
    mediatrProfessions: [],
    districtMediatrs: "",
    mediatrsSocialMedias: social,
    educations: education,
    certificates: certificate,
  };

  const validationSchema = Yup.object({
    pin: Yup.string()
      .min(5, "F??N d??zg??n daxil edilm??yib")
      .max(7, "F??N d??zg??n daxil edilm??yib")
      .required("Bu xana bo?? qoyula bilm??z"),
    docSeries: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    docNumber: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    actingAddress: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    membershipDate: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    languageSkills: Yup.array()
      .min(1, "Bu xana bo?? qoyula bilm??z")
      .required("Bu xana bo?? qoyula bilm??z"),
    prefix: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    voen: Yup.string()
      .min(10, "V??EN d??zg??n daxil edilm??yib")
      .max(10, "V??EN d??zg??n daxil edilm??yib")
      .required("Bu xana bo?? qoyula bilm??z"),
    registryNumber: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    email: Yup.string()
      .email("Elektron po??t ??nvan?? d??zg??n daxil edilm??yib")
      .required("Bu xana bo?? qoyula bilm??z"),
    phone: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    otherWorkplace: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    otherPosition: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    institutionId: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    mediatrProfessions: Yup.array()
      .min(1, "Bu xana bo?? qoyula bilm??z")
      .required("Bu xana bo?? qoyula bilm??z"),
    districtMediatrs: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
    educations: Yup.array()
      .of(
        Yup.object().shape({
          collegeName: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
          majorName: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
          graduationDate: Yup.date().required("Bu xana bo?? qoyula bilm??z"),
        })
      )
      .required("Bu xana bo?? qoyula bilm??z"),
    // certificates: Yup.string().required("Bu xana bo?? qoyula bilm??z"),
  });

  // file upload
  // file.size / 1024 / 1024 > 1
  const [baseImageErr, setBaseImageErr] = useState("");
  const [page, setPage] = useState();

  const convertBase64 = (file) => {
    if (file.size / 1024 / 1024 > 1) {
      setBaseImageErr("Fayl??n ??l????s?? 1MB-dan b??y??k ola bilm??z");
    } else {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result.split(",")[1]);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          dispatch(
            createMediatr(history, {
              firstName: forms.person && forms.person.firstName,
              lastName: forms.person && forms.person.lastName,
              middleName: forms.person && forms.person.middleName,
              dateOfBirth: forms.person && forms.person.dateOfBirth,

              imagePath: forms.person && forms.person.imagePath,
              pin: values.pin.toUpperCase(),
              docSeries: values.docSeries,
              docNumber: values.docNumber,
              regAddress: forms.person && forms.person.regAddress,
              actingAddress: values.actingAddress,
              membershipDate: values.membershipDate,
              languageSkills: values.languageSkills.toString(),
              voen: values.voen,
              registryNumber: values.registryNumber,
              email: values.email,
              phone: `${values.prefix}${values.phone}`,
              personalPageLink: values.personalPageLink,
              otherWorkplace: values.otherWorkplace,
              otherPosition: values.otherPosition,
              officeId: values.officeId,
              institutionId: values.institutionId,
              mediatrProfessions: values.mediatrProfessions,
              districtMediatrs: [values.districtMediatrs],
              mediatrsSocialMedias: values.mediatrsSocialMedias,
              educations: values.educations,
              certificates: values.certificates,
            })
          );
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, errors, values, setFieldValue }) => (
          <Form className="text-left mt-4">
            <div className="helpdesk container">
              <div className="helpdesk layout-spacing">
                <div className="hd-header-wrapper">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h4 className>
                        Mediatorun reyestr m??lumatlar?? ??????n sor??u
                      </h4>
                      <p className>Mediasiya ??uras??</p>
                    </div>
                  </div>
                </div>
                <div className="hd-tab-section">
                  <div className="row">
                    <div className="col-md-12 mb-5 mt-5">
                      {forms.message ? (
                        <div className="row mt-5">
                          <div className="col-md-12 mt-5">
                            <h3 className="text-info text-center mt-5">
                              {forms.message}
                            </h3>
                          </div>
                        </div>
                      ) : (
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
                                  ????xsi m??lumatlar
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
                                      label={"??/V seriyas?? *"}
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
                                      placeholder="N??mr??"
                                      label={"??/V n??mr??si *"}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <MyTextInput
                                      style={{ textTransform: "uppercase" }}
                                      id="pin"
                                      name="pin"
                                      type="text"
                                      //   isDisabled={apply ? true : false}
                                      options={seriaTypes}
                                      className="form-control"
                                      placeholder="F??N"
                                      label={"F??N *"}
                                    />
                                  </div>
                                  <div className="col-md-2 pt-1">
                                    <div>
                                      <Button
                                        type="button"
                                        disabled={
                                          !values.pin ||
                                          !values.docNumber ||
                                          !values.docSeries
                                        }
                                        onClick={() =>
                                          getPersonData(
                                            values.docSeries,
                                            values.docNumber,
                                            values.pin
                                          )
                                        }
                                        className="w-100 btn btn-outline-primary btn-lg mt-4"
                                      >
                                        {async.loading && (
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
                                            <line
                                              x1={12}
                                              y1={2}
                                              x2={12}
                                              y2={6}
                                            />
                                            <line
                                              x1={12}
                                              y1={18}
                                              x2={12}
                                              y2={22}
                                            />
                                            <line
                                              x1="4.93"
                                              y1="4.93"
                                              x2="7.76"
                                              y2="7.76"
                                            />
                                            <line
                                              x1="16.24"
                                              y1="16.24"
                                              x2="19.07"
                                              y2="19.07"
                                            />
                                            <line
                                              x1={2}
                                              y1={12}
                                              x2={6}
                                              y2={12}
                                            />
                                            <line
                                              x1={18}
                                              y1={12}
                                              x2={22}
                                              y2={12}
                                            />
                                            <line
                                              x1="4.93"
                                              y1="19.07"
                                              x2="7.76"
                                              y2="16.24"
                                            />
                                            <line
                                              x1="16.24"
                                              y1="7.76"
                                              x2="19.07"
                                              y2="4.93"
                                            />
                                          </svg>
                                        )}
                                        Axtar
                                      </Button>
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
                                      placeholder="Ata ad??"
                                      label={"Ata ad?? *"}
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
                                      placeholder="Do??um tarixi"
                                      label={"Do??um tarixi *"}
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
                                      placeholder="Qeydiyyat ??nvan??"
                                      label={"Qeydiyyat ??nvan?? *"}
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
                                  F??aliyy??tin?? dair m??lumatlar
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
                                      placeholder="??xtisasla??ma"
                                      label={"??xtisasla??ma *"}
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
                                      placeholder="T??lim ke??diyi qurum"
                                      label={"T??lim ke??diyi qurum *"}
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
                                      placeholder="F??aliyy??t g??st??rdiyi ????h??r/rayon *"
                                      label={
                                        "F??aliyy??t g??st??rdiyi ????h??r/rayon *"
                                      }
                                    />
                                  </div>
                                  {/* <div className="col-md-12 mb-4">
                                            <MySearchableSelect
                                              id="officeId"
                                              name="officeId"
                                              type="text"
                                              //   isDisabled={apply ? true : false}
                                              options={officeOptions}
                                              // className="form-control"
                                              placeholder="Mediasiya t????kilat??"
                                              label={"Mediasiya t????kilat??"}
                                            />
                                          </div> */}
                                  <div className="col-md-12 mb-4">
                                    <MyTextArea
                                      id="actingAddress"
                                      name="actingAddress"
                                      type="text"
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="F??liyy??t g??st??rdiyi ??nvan"
                                      label={"F??aliyy??t g??st??rdiyi ??nvan *"}
                                    />
                                  </div>

                                  <div className="col-md-12 mb-4">
                                    <MyTextInput
                                      id="membershipDate"
                                      name="membershipDate"
                                      type="date"
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="??zvl??y?? q??bul edildiyi tarix"
                                      label={"??zvl??y?? q??bul edildiyi tarix *"}
                                    />
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <MyTextInputWithMask
                                      id="registryNumber"
                                      name="registryNumber"
                                      type="text"
                                      mask="M-99999"
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="Reyestr n??mr??si *"
                                      label={"Reyestr n??mr??si *"}
                                    />
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <MyTextInputWithMask
                                      mask="9999999999"
                                      id="voen"
                                      name="voen"
                                      type="text"
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="V??EN"
                                      label={"V??EN *"}
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
                                  T??hsil m??lumatlar??
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
                                        title="Sertifikat ??lav?? et"
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
                                          <line
                                            x1={12}
                                            y1={8}
                                            x2={12}
                                            y2={16}
                                          />
                                          <line
                                            x1={8}
                                            y1={12}
                                            x2={16}
                                            y2={12}
                                          />
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
                                          <line
                                            x1={8}
                                            y1={12}
                                            x2={16}
                                            y2={12}
                                          />
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
                                            placeholder="T??hsil m????ssis??sinin ad??"
                                            label={"T??hsil m????ssis??sinin ad?? *"}
                                          />
                                        </div>
                                        <div className="col-md-4 mb-4">
                                          <MyTextInput
                                            id={`educations[${index}].majorName`}
                                            name={`educations[${index}].majorName`}
                                            type="text"
                                            //   isDisabled={apply ? true : false}
                                            className="form-control"
                                            placeholder="??xtisas"
                                            label={"??xtisas *"}
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
                                  Sertifikat bar??d?? m??lumatlar
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
                                        title="Sertifikat ??lav?? et"
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
                                          <line
                                            x1={12}
                                            y1={8}
                                            x2={12}
                                            y2={16}
                                          />
                                          <line
                                            x1={8}
                                            y1={12}
                                            x2={16}
                                            y2={12}
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveCertificate()
                                        }
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
                                          <line
                                            x1={8}
                                            y1={12}
                                            x2={16}
                                            y2={12}
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {certificate &&
                                  certificate.map((certi, index) => (
                                    <React.Fragment key={index}>
                                      <div className="row">
                                        <div className="col-md-3 mb-4">
                                          <MyTextInput
                                            id={`certificates[${index}].issuerInstitution`}
                                            name={`certificates[${index}].issuerInstitution`}
                                            type="text"
                                            //   isDisabled={apply ? true : false}
                                            className="form-control"
                                            placeholder="Sertifikati ver??n qurum"
                                            label={"Sertifikati ver??n qurum"}
                                          />
                                        </div>
                                        <div className="col-md-3 mb-4">
                                          <MyTextInput
                                            id={`certificates[${index}].certificateName`}
                                            name={`certificates[${index}].certificateName`}
                                            type="text"
                                            //   isDisabled={apply ? true : false}
                                            className="form-control"
                                            placeholder="Sertifikat??n ad??, n??v??"
                                            label={"Sertifikat??n ad??, n??v??"}
                                          />
                                        </div>
                                        <div className="col-md-3 mb-4">
                                          <MyTextInput
                                            id={`certificates[${index}].certificationDate`}
                                            name={`certificates[${index}].certificationDate`}
                                            type="date"
                                            //   isDisabled={apply ? true : false}
                                            className="form-control"
                                            placeholder="Verilm?? tarixi"
                                            label={"Verilm?? tarixi"}
                                          />
                                        </div>
                                        <div className="col-md-3 mb-4">
                                          <label
                                            htmlFor={`certificates[${index}].imageData`}
                                          >
                                            Sertifikat?? y??kl?? (jpg,png,pdf)
                                          </label>
                                          <input
                                            id={`certificates[${index}].imageData`}
                                            name={`certificates[${index}].imageData`}
                                            type="file"
                                            accept="image/jpg,image/png,application/pdf"
                                            onChange={async (e) => {
                                              // uploadImage(e);
                                              const base64 =
                                                await convertBase64(
                                                  e.target.files[0]
                                                );
                                              setFieldValue(
                                                `certificates[${index}].imageData`,
                                                base64
                                              );
                                            }}
                                            //   isDisabled={apply ? true : false}
                                            className="form-control"
                                            placeholder="Sertifikat"
                                            label={"Sertifikat"}
                                          />
                                          <div className="invalid-feedback">
                                            {baseImageErr && baseImageErr}
                                          </div>
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
                                  Dig??r
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
                                      isMulti
                                      options={languageKnowledgeOptions}
                                      // isMulti
                                      //   isDisabled={apply ? true : false}
                                      placeholder="Dil bilikl??ri"
                                      label={"Dil bilikl??ri *"}
                                    />
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <MyTextInput
                                      id="otherWorkplace"
                                      name="otherWorkplace"
                                      type="text"
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="Mediatorluqla yana???? haz??rda i??l??diyi yer*"
                                      label={
                                        "Mediatorluqla yana???? haz??rda i??l??diyi yer*"
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
                                      placeholder="V??zif??"
                                      label={"V??zif??*"}
                                    />
                                  </div>
                                </div>
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
                                  ??laq??
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
                                  <div className="col-md-2 mb-4">
                                    <MySearchableSelect
                                      id={`prefix`}
                                      name={`prefix`}
                                      type="text"
                                      options={prefixTypes}
                                      //   isDisabled={apply ? true : false}
                                      // className="form-control"
                                      placeholder="Prefiks"
                                      label={"Prefiks* "}
                                    />
                                  </div>
                                  <div className="col-md-10 mb-4">
                                    <MyTextInputWithMask
                                      id="phone"
                                      name="phone"
                                      type="text"
                                      mask="9999999"
                                      //   isDisabled={apply ? true : false}
                                      options={seriaTypes}
                                      className="form-control"
                                      placeholder="Telefon n??mr??si"
                                      label={"Telefon n??mr??si *"}
                                    />
                                  </div>

                                  <div className="col-md-12 mb-4">
                                    <MyTextInputWithMask
                                      id="email"
                                      name="email"
                                      type="text"
                                      // mask='+4\9 99 999 99'
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="Elektron po??t ??nvan?? *"
                                      label={"Elektron po??t ??nvan?? *"}
                                    />
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <MyTextInput
                                      id="personalPageLink"
                                      name="personalPageLink"
                                      type="text"
                                      //   isDisabled={apply ? true : false}
                                      className="form-control"
                                      placeholder="R??smi veb s??hif??si"
                                      label={"R??smi veb s??hif??si"}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-md-2 offset-10 text-right">
                                    <div className="icon-container">
                                      <button
                                        title="Sosial media ??lav?? et"
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
                                          <line
                                            x1={12}
                                            y1={8}
                                            x2={12}
                                            y2={16}
                                          />
                                          <line
                                            x1={8}
                                            y1={12}
                                            x2={16}
                                            y2={12}
                                          />
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
                                          <line
                                            x1={8}
                                            y1={12}
                                            x2={16}
                                            y2={12}
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {social &&
                                  social.map((soci, index) => (
                                    <React.Fragment key={index}>
                                      <div className="row">
                                        <div className="col-md-3 mb-4">
                                          <MySearchableSelect
                                            id={`mediatrsSocialMedias[${index}].socialMediaId`}
                                            name={`mediatrsSocialMedias[${index}].socialMediaId`}
                                            type="text"
                                            options={socialMediaOptions}
                                            //   isDisabled={apply ? true : false}
                                            // className="form-control"
                                            placeholder="Social media hesab??"
                                            label={"Social media hesab?? "}
                                          />
                                        </div>
                                        <div className="col-md-9 mb-4">
                                          <MyTextInput
                                            id={`mediatrsSocialMedias[${index}].linkToPage`}
                                            name={`mediatrsSocialMedias[${index}].linkToPage`}
                                            type="text"
                                            //   isDisabled={apply ? true : false}
                                            className="form-control"
                                            placeholder="Social media hesab??n??n linki"
                                            label={
                                              "Social media hesab??n??n linki "
                                            }
                                          />
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  ))}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <button
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit"
                                className="btn btn-primary float-right   btn-lg"
                              >
                                {async.kind === "createMediatr" && (
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
                                    <line
                                      x1="4.93"
                                      y1="4.93"
                                      x2="7.76"
                                      y2="7.76"
                                    />
                                    <line
                                      x1="16.24"
                                      y1="16.24"
                                      x2="19.07"
                                      y2="19.07"
                                    />
                                    <line x1={2} y1={12} x2={6} y2={12} />
                                    <line x1={18} y1={12} x2={22} y2={12} />
                                    <line
                                      x1="4.93"
                                      y1="19.07"
                                      x2="7.76"
                                      y2="16.24"
                                    />
                                    <line
                                      x1="16.24"
                                      y1="7.76"
                                      x2="19.07"
                                      y2="4.93"
                                    />
                                  </svg>
                                )}
                                G??nd??r
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
