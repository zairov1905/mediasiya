import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import ScriptTag from 'react-script-tag';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Form, Formik } from "formik";
import {
  createApply,
  // loadCourt,
  // loadDistrict,
  // loadMediatr,
  // loadOffice,
  // loadProfession,


} from "./citizenActions";
import { closeModal } from "../../../app/common/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";

import ModalWrapper from "../../../app/common/modal/ModalWrapper";
import Button from "../../../app/common/modal/Button";
import MyCheckbox from "../../../app/common/form/MyCheckbox";
import { loadCourt, loadDistrict, loadMediatr, loadOffice, loadProfession } from "../applyPage/applyActions";
export default function ViewModalForCitizen() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [check, setCheck] = useState();

  const async = useSelector((state) => state.async);
  const applys = useSelector((state) => state.applys);


  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  useEffect(async () => {
    dispatch(loadDistrict());
    dispatch(loadCourt());
    dispatch(loadProfession());
    dispatch(loadMediatr());
    dispatch(loadOffice());
  }, [dispatch]);

  const districtsOptions =
    applys.districts &&
    applys.districts.map((district) => {
      return {
        value: parseInt(district.id),
        label: `${district.districtName}`,
      };
    });
  const courtsOptions =
    applys.courts &&
    applys.courts.map((court) => {
      return {
        value: parseInt(court.id),
        label: `${court.courtName}`,
      };
    });
  const professionOptions =
    applys.professions &&
    applys.professions.map((profession) => {
      return {
        value: parseInt(profession.id),
        label: `${profession.professionName}`,
      };
    });

  const officeOptions =
    applys.offices &&
    applys.offices.map((office) => {
      return {
        value: parseInt(office.id),
        label: `${office.officeName}`,
      };
    });

  const languageKnowledgeOptions = [
    { label: "Azərbaycan", value: "Azərbaycan" },
    { label: "Rus", value: "Rus" },
    { label: "İngilis", value: "İngilis" },
  ];
  const genderOptions = [
    { label: "Kişi", value: parseInt(1) },
    { label: "Qadın", value: parseInt(20) },
  ];
  const datesOptions = [
    { label: "9:00 - 9:30", value: "9:00 - 9:30" },
    { label: "10:00 - 10:30", value: "10:00 - 10:30" },
    { label: "11:00 - 11:30", value: "11:00 - 11:30" },
    { label: "12:00 - 12:30", value: "12:00 - 12:30" },
    { label: "13:00 - 13:30", value: "13:00 - 13:30" },
    { label: "14:00 - 14:30", value: "14:00 - 14:30" },
    { label: "15:00 - 15:30", value: "15:00 - 15:30" },
    { label: "16:00 - 16:30", value: "16:00 - 16:30" },
    { label: "17:00 - 17:30", value: "17:00 - 17:30" },
  ];


  // ADD sides
  const [sides, setSides] = useState([
    {
      sideFirstName: "",
      sideLastName: "",
      sideMiddleName: "",
      sideGender: "",
      advocateFirstName: "",
      advocateLastName: "",
      advocateMiddleName: "",
      organizationName: "",
      address: "",
      phone: "",
      email: "",
    },
  ]);
  const handleAddSide = () => {
    setSides([
      ...sides,
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
  const handleRemoveSide = () => {
    if (sides.length > 1) {
      let lastIndex = sides.length - 1;
      let values = [...sides];
      values.splice(lastIndex, 1);
      setSides(values);
    }
  };

  const initialValues = {
    professionId: "",
    districtIds: [],
    mediatrIds: [],
    officeId: "",
    courtId: "",
    sides: sides,
    conflictInfo: "",
    courtCaseInfo: "",
    prefferedSessionTime: "",
    requiredLangs: "",
    caseInAction: true,
    mediatorNames: [],
  };
  const validationSchema = Yup.object({});
  const onChangeProfId = async (profId, courtId) => {
    dispatch(loadMediatr({ professionId: profId, courtId: courtId }));
  };

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
  const [mediatorName, setMediatorName] = useState([]);
  return (
    <ModalWrapper size="modal-xl" header={"Müraciətim"}>
      {async.kind === "listenApply" && async.loading ? (
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
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await dispatch(
                  createApply({
                    professionId: values.professionId,
                    districtIds: values.districtIds,
                    mediatrIds: values.mediatrIds,
                    officeId: values.officeId,
                    courtId: values.courtId,
                    sides: values.sides,
                    conflictInfo: values.conflictInfo,
                    courtCaseInfo: values.courtCaseInfo,
                    prefferedSessionTime:
                      values.prefferedSessionTime.toString(),
                    requiredLangs: values.requiredLangs.toString(),
                    caseInAction: values.caseInAction,
                  })
                );
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
              <Form id="emp">
                <div id="iconsAccordion" className="accordion-icons">
                  <div className="card">
                    <div className="card-header" id="headingTwo3">
                      <section className="mb-0 mt-0">
                        <div
                          role="menu"
                          className="show"
                          data-toggle="collapse"
                          data-target="#iconAccordionTwo"
                          aria-expanded="false"
                          aria-controls="iconAccordionTwo"
                        >
                          <div className="accordion-icon">
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
                              className="feather feather-box"
                            >
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                              <line x1={12} y1="22.08" x2={12} y2={12} />
                            </svg>
                          </div>
                          Ümumi məlumatlar
                          <div className="icons">
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
                              className="feather feather-chevron-down"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div
                      id="iconAccordionTwo"
                      className="collapsed show"
                      aria-labelledby="headingTwo3"
                      data-parent="#iconsAccordion"
                    >
                      <div className="card-body">
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MySearchableSelect
                              id="professionId"
                              name="professionId"
                              type="text"
                              options={professionOptions}
                              placeholder="İxtisas seçin"
                              label={"Mediatorun ixtisası *"}
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MySearchableSelect
                              id="districtIds"
                              name="districtIds"
                              type="text"
                              options={districtsOptions}
                              isMulti
                              // className="form-control"
                              placeholder="Məkan seçin"
                              label={
                                "Mediasiyanın keçirilməsi üçün üstünlük verilən yer*"
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MySearchableSelect
                              id="courtId"
                              name="courtId"
                              type="text"
                              options={courtsOptions}
                              placeholder="Məhkəmə seçin"
                              label={
                                "Mübahisə həll olunmazsa mübahisənin baxılacağı yer*"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingOne3">
                      <section className="mb-0 mt-0">
                        <div
                          role="menu"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#iconAccordionOne"
                          aria-expanded="false"
                          aria-controls="iconAccordionOne"
                        >
                          <div className="accordion-icon">
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
                              className="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                          </div>
                          Mediator seçimi:{" "}
                          {mediatorName &&
                            mediatorName.map((medik) => ` ${medik}`)}
                          <div className="icons">
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
                              className="feather feather-chevron-down"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div
                      id="iconAccordionOne"
                      className="collapse"
                      aria-labelledby="headingOne3"
                      data-parent="#iconsAccordion"
                    >
                      <div className="card-body">
                        <div className="row"></div>
                        <div className="row mb-4">
 
                            <div className="col-md-12">
                              <div className="form-check mb-2">
                                <div className="custom-control custom-radio classic-radio-info">
                                  <input
                                    type="radio"
                                    id="hRadio2"
                                    name="classicRadio"
                                    onClick={() => setCheck("office")}
                                    className="custom-control-input"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="hRadio2"
                                  >
                                    Mediasiya təşkilatları
                                  </label>
                                </div>
                              </div>
                              <div className="form-check mb-2">
                                <div className="custom-control custom-radio classic-radio-info">
                                  <input
                                    type="radio"
                                    id="hRadio1"
                                    name="classicRadio"
                                    onClick={() => {
                                      setCheck("mediator");
                                      onChangeProfId(
                                        values.professionId,
                                        values.courtId
                                      );
                                    }}
                                    className="custom-control-input"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="hRadio1"
                                  >
                                    Fərdi qaydada fəaliyyət göstərən mediatorlar
                                  </label>
                                </div>
                              </div>
                            </div>
                        </div>
                        {check === "office"  && (
                          <div className="row mb-4">
                            <div className="col-md-12">
                              <MySearchableSelect
                                id="officeId"
                                name="officeId"
                                type="text"
                                options={officeOptions}
                                isMulti={check === "office" && false}
                                // className="form-control"
                                placeholder="Mediator təşkilatı seçin"
                                label={"Mediator təşkilatları*"}
                              />
                            </div>
                          </div>
                        )}
                        {check === "mediator" && (
                          <div className="row mb-4">
                            <div className="col-md-12">
                              <div id="toggleAccordion">
                                {applys &&
                                  applys.mediatrs.map((tree, index) => (
                                    <div className="card">
                                      <div className="card-header" id="...">
                                        <section className="mb-0 mt-0">
                                          <div
                                            role="menu"
                                            className="collapsed"
                                            data-toggle="collapse"
                                            data-target={`#defaultAccordion${index}`}
                                            aria-expanded="true"
                                            aria-controls={`#defaultAccordion${index}`}
                                          >
                                            {tree.districtName}
                                            <div className="icons">
                                              <svg> ... </svg>
                                            </div>
                                          </div>
                                        </section>
                                      </div>
                                      <div
                                        id={`defaultAccordion${index}`}
                                        className="collapse"
                                        aria-labelledby="..."
                                        data-parent="#toggleAccordion"
                                      >
                                        <div className="card-body">
                                          <div className="row">
                                            {tree.mediatrs.map((name) => (
                                              <div className="col-md-12">
                                                <MyCheckbox
                                                  name="mediatrIds"
                                                  value={name.mediatrId}
                                                  label={`${name.firstName} ${name.lastName}`}
                                                  onClick={(e) => {
                                                    if (
                                                      e.target.checked ===
                                                        true &&
                                                      !mediatorName.includes(
                                                        `${name.firstName} ${name.lastName}`
                                                      )
                                                    ) {
                                                      setMediatorName(
                                                        (state) => [
                                                          ...state,
                                                          `${name.firstName} ${name.lastName}`,
                                                        ]
                                                      );
                                                    } else if (
                                                      e.target.checked ===
                                                        false &&
                                                      mediatorName.includes(
                                                        `${name.firstName} ${name.lastName}`
                                                      )
                                                    ) {
                                                      setMediatorName(
                                                        (state) => [
                                                          ...state.filter(
                                                            (medik) =>
                                                              medik !==
                                                              `${name.firstName} ${name.lastName}`
                                                          ),
                                                        ]
                                                      );
                                                      console.log(
                                                        values.mediatrIds.find(
                                                          (name) =>
                                                            name ===
                                                            e.target.value
                                                        ),
                                                        "medname"
                                                      );
                                                    }
                                                  }}
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header " id="headingTwo3">
                      <section className="mb-0 mt-0">
                        <div
                          role="menu"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#iconAccordionThree"
                          aria-expanded="false"
                          aria-controls="iconAccordionThree"
                        >
                          <div className="accordion-icon">
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
                              className="feather feather-users"
                            >
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx={9} cy={7} r={4} />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                          Tərəflar barədə məlumatlar
                          <div className="icons">
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
                              className="feather feather-chevron-down"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div
                      id="iconAccordionThree"
                      className="collapse"
                      aria-labelledby="headingTwo3"
                      data-parent="#iconsAccordion"
                    >
                      <div className="card-body">
                        <div className="row mb-4">
                          <div className="col-md-2 offset-10 text-right">
                            <div className="icon-container">
                              <button
                                title="Tərəf əlavə et"
                                type="button"
                                className="close"
                                onClick={() => handleAddSide()}
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
                                onClick={() => handleRemoveSide()}
                                className="close"
                                title="Tərəfi sil"
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

                        {!sides && (
                          <div className="row">
                            <div className="col-md-12">
                              <h2 className="text-center">
                                Heç bir tərəf daxil edilməyib
                              </h2>
                            </div>
                          </div>
                        )}
                        {sides &&
                          sides.map((side, index) => (
                            <React.Fragment key={index}>
                              <div className="row">
                                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                  <div
                                    className="infobox-3 mb-4"
                                    style={{ width: "100%" }}
                                  >
                                    <div className="info-icon">
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
                                        className="feather feather-user"
                                      >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx={12} cy={7} r={4} />
                                      </svg>
                                    </div>
                                    <h5 className="info-heading">
                                      Tərəf :
                                      {`${index + 2} - ${
                                        values.sides[index]
                                          ? `
                                            ${
                                              values.sides[index].sideLastName
                                                ? values.sides[index]
                                                    .sideLastName
                                                : ""
                                            } 
                                            ${
                                              values.sides[index].sideFirstName
                                                ? values.sides[index]
                                                    .sideFirstName
                                                : ""
                                            } ${
                                              values.sides[index].sideMiddleName
                                                ? values.sides[index]
                                                    .sideMiddleName
                                                : ""
                                            }`
                                          : ""
                                      }`}{" "}
                                    </h5>
                                    {/* {console.log(values,'cins')} */}
                                    <p className="info-text">
                                      <div className="row mb-4">
                                        <div className="col-md-3">
                                          <MyTextInput
                                            id={`sides[${index}].sideLastName`}
                                            name={`sides[${index}].sideLastName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Soyadın daxil edin"
                                            label={"Qarşı tərəfin soyadı*"}
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <MyTextInput
                                            id={`sides[${index}].sideFirstName`}
                                            name={`sides[${index}].sideFirstName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Adın daxil edin"
                                            label={"Qarşı tərəfin adı*"}
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <MyTextInput
                                            id={`sides[${index}].sideMiddleName`}
                                            name={`sides[${index}].sideMiddleName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ata adın daxil edin"
                                            label={"Qarşı tərəfin ata adı*"}
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <MySearchableSelect
                                            id={`sides[${index}].sideGender`}
                                            name={`sides[${index}].sideGender`}
                                            type="text"
                                            // className="form-control"
                                            // defaultValue={
                                            //   apply && {
                                            //     label:
                                            //       sides[index] &&
                                            //       sides[index].sideGender === 1
                                            //         ? "Kişi"
                                            //         : "Qadın",
                                            //   }
                                            // }
                                            options={genderOptions}
                                            placeholder="Cinsin daxil edin"
                                            label={"Qarşı tərəf cinsi*"}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].advocateFirstName`}
                                            name={`sides[${index}].advocateFirstName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Adın daxil edin"
                                            label={"Nümayəndənin adı*"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].advocateLastName`}
                                            name={`sides[${index}].advocateLastName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Soyadın daxil edin"
                                            label={"Nümayəndənin soyadı*"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].advocateMiddleName`}
                                            name={`sides[${index}].advocateMiddleName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ata adın daxil edin"
                                            label={"Nümayəndənin ata adı*"}
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-4">
                                        <div className="col-md-12">
                                          <MyTextInput
                                            id={`sides[${index}].organizationName`}
                                            name={`sides[${index}].organizationName`}
                                            type="text"
                                            className="form-control"
                                            label="Hüquq şirkəti"
                                            placeholder={
                                              "Hüquq şirkət adı daxil edin*"
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col-md-12">
                                          <MyTextInput
                                            id={`sides[${index}].address`}
                                            name={`sides[${index}].address`}
                                            type="text"
                                            className="form-control"
                                            label="Ünvan"
                                            placeholder={"Ünval daxil edin*"}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col-md-6">
                                          <MyTextInput
                                            id={`sides[${index}].phone`}
                                            name={`sides[${index}].phone`}
                                            type="text"
                                            className="form-control"
                                            label="Telefon"
                                            placeholder={
                                              "Telefon nömrəsi daxil edin*"
                                            }
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <MyTextInput
                                            id={`sides[${index}].email`}
                                            name={`sides[${index}].email`}
                                            type="text"
                                            className="form-control"
                                            label="E-mail"
                                            placeholder={"e-mail daxil edin*"}
                                          />
                                        </div>
                                      </div>
                                    </p>
                                    {/* <a class="info-link" href="">
                                Discover <svg> ... </svg>
                              </a> */}
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingTwo3">
                      <section className="mb-0 mt-0">
                        <div
                          role="menu"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#iconAccordionForth"
                          aria-expanded="false"
                          aria-controls="iconAccordionForth"
                        >
                          <div className="accordion-icon">
                            <svg
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="css-i6dzq1"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                          </div>
                          Mübahisə və mediasiya sessiyası
                          <div className="icons">
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
                              className="feather feather-chevron-down"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div
                      id="iconAccordionForth"
                      className="collapse"
                      aria-labelledby="headingTwo3"
                      data-parent="#iconsAccordion"
                    >
                      <div className="card-body">
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MyTextArea
                              id="conflictInfo"
                              name="conflictInfo"
                              type="text"
                              className="form-control"
                              label="Mübahisənin qısa məzmunu və mediasiyadan gözlənilən nəticələr*"
                              placeholder={"Qısa məlumat daxil edin"}
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <div className="form-group form-check pl-0">
                              <div className="custom-control custom-checkbox checkbox-info">
                                <MyTextInput
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="caseInAction"
                                  name="caseInAction"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="caseInAction"
                                >
                                  Bu mübahisə hazırda məhkəmə icraatındadır?
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MyTextArea
                              id="courtCaseInfo"
                              name="courtCaseInfo"
                              type="text"
                              className="form-control"
                              label="Məhkəmə və iş barədə mulamatlar*"
                              placeholder={
                                "Məhkəmə və iş barədə məlumat daxil edin"
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <MySearchableSelect
                              id="prefferedSessionTime"
                              name="prefferedSessionTime"
                              type="text"
                              isMulti
                              options={datesOptions}
                              // className="form-control"
                              label="Mediasiya sessiyalarının keçirilməsi üçün üstünlük verilən vaxt*"
                              placeholder={"Sizə uyğun vaxtı daxil edin"}
                            />
                          </div>
                          <div className="col-md-6">
                            <MySearchableSelect
                              id="requiredLangs"
                              name="requiredLangs"
                              type="text"
                              isMulti
                              options={languageKnowledgeOptions}
                              // className="form-control"
                              label="Mediatordan tələb olunan dil biliyi*"
                              placeholder={
                                "Mediatordan tələb etdiyiniz dil biliyi"
                              }
                              placeholder={
                                "Mediatordan tələb etdiyiniz dil biliyi"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
