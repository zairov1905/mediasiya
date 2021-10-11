import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Form, Formik } from "formik";
import {
  approveApply,
  createApply,
  listenToApply,
  loadApply,
  loadCourt,
  loadDistrict,
  loadMediatr,
  loadOffice,
  loadProfession,
  rejectApply,
  updateApply,
} from "./applyActions";
import { closeModal } from "../../../app/common/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";
import moment from "moment";
import ModalWrapper from "../../../app/common/modal/ModalWrapper";
import Button from "../../../app/common/modal/Button";
import { applyMiddleware } from "redux";
import { toast } from "react-toastify";

export default function ApplyPageModal({ apply }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [rejectForm, setRejectForm] = useState(false);

  const async = useSelector((state) => state.async);
  const auth = useSelector((state) => state.auth);
  console.log(auth.currentUser.role, "auth");

  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  const [check, setCheck] = useState();
  useEffect(async () => {
    apply && (await dispatch(listenToApply(apply.id)));
    dispatch(loadDistrict());
    dispatch(loadCourt());
    dispatch(loadProfession());
    dispatch(loadMediatr());
    dispatch(loadOffice());
  }, [dispatch]);
  const applys = useSelector((state) => state.applys);
  const { listenedApply } = useSelector((state) => state.applys);
  console.log(listenedApply);
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

  const mediatorOptions =
    applys.mediatrs &&
    applys.mediatrs.map((mediatr) => {
      return {
        value: parseInt(mediatr.id),
        label: `${mediatr.firstName} ${mediatr.lastName} ${mediatr.middleName}`,
        ids: mediatr.mediatrProfessions.map((medik) => medik.id),
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

  const [sides, setSides] = useState(
    apply && listenedApply.sides
      ? listenedApply.sides
      : [
          {
            fullName: "",
            advocateFullName: "",
            organizationName: "",
            address: "",
            phone: "",
            email: "",
          },
        ]
  );
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

  const initialValues = apply
    ? {
        professionId: listenedApply.professionId && listenedApply.professionId,
        districtIds: listenedApply.districtIds && listenedApply.districtIds,
        mediatrIds: listenedApply.mediatrIds && listenedApply.mediatrIds,
        officeId: listenedApply.officeId && listenedApply.officeId,
        courtId: listenedApply.courtId && listenedApply.courtId,
        sides: listenedApply.sides && listenedApply.sides,
        conflictInfo: listenedApply.conflictInfo && listenedApply.conflictInfo,
        courtCaseInfo:
          listenedApply.courtCaseInfo && listenedApply.courtCaseInfo,
        prefferedSessionTime:
          listenedApply.prefferedSessionTime &&
          listenedApply.prefferedSessionTime,
        requiredLangs:
          listenedApply.requiredLangs && listenedApply.requiredLangs,
        caseInAction: listenedApply.caseInAction && listenedApply.caseInAction,
      }
    : {
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
      };
  const validationSchema = Yup.object({});

  return (
    <ModalWrapper
      size="modal-xl"
      header={
        apply
          ? "Mediatora müraciət - nəzərdən keçir "
          : "Mediatora müraciət - yeni"
      }
    >
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
                apply
                  ? await dispatch(
                      updateApply({
                        ...values,
                        id: apply.id,
                      })
                    )
                  : await dispatch(
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
                              defaultValue={
                                apply && {
                                  value: parseInt(
                                    listenedApply.profession &&
                                      listenedApply.profession.id
                                  ),
                                  label: listenedApply.profession
                                    ? listenedApply.profession.professionName
                                    : "Təyin edilməyib",
                                }
                              }
                              isDisabled={apply ? true : false}
                              options={professionOptions}
                              // className="form-control"
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
                              isDisabled={apply ? true : false}
                              defaultValue={
                                apply &&
                                listenedApply.districts &&
                                listenedApply.districts.map((district) => {
                                  return {
                                    label: `${district.districtName}`,
                                  };
                                })
                              }
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
                              isDisabled={apply ? true : false}
                              type="text"
                              options={courtsOptions}
                              defaultValue={
                                apply && {
                                  value: parseInt(
                                    listenedApply.court &&
                                      listenedApply.court.id
                                  ),
                                  label: listenedApply.court
                                    ? listenedApply.court.courtName
                                    : "Təyin edilməyib",
                                }
                              }
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
                          Mediator seçimi
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
                        <div className="row mb-4">
                          {apply ? (
                            ""
                          ) : (
                            <div className="col-md-12">
                              <div className="form-check mb-2">
                                <div className="custom-control custom-radio classic-radio-info">
                                  <input
                                    type="radio"
                                    // checked={apply && listenedApply. }
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
                                    onClick={() => setCheck("mediator")}
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
                          )}
                        </div>
                        {(check === "office" || listenedApply.office) && (
                          <div className="row mb-4">
                            <div className="col-md-12">
                              <MySearchableSelect
                                id="officeId"
                                name="officeId"
                                type="text"
                                defaultValue={
                                  apply && {
                                    value: parseInt(
                                      listenedApply.office &&
                                        listenedApply.office.id
                                    ),
                                    label: listenedApply.office
                                      ? listenedApply.office.officeName
                                      : "Təyin edilməyib",
                                  }
                                }
                                options={officeOptions}
                                isMulti={check === "office" && false}
                                // className="form-control"
                                placeholder="Mediator təşkilatı seçin"
                                label={"Mediator təşkilatları*"}
                              />
                            </div>
                          </div>
                        )}
                        {(check === "mediator" || listenedApply.mediatrs) && (
                          <div className="row mb-4">
                            <div className="col-md-12">
                              <MySearchableSelect
                                id="mediatrIds"
                                name="mediatrIds"
                                type="text"
                                options={mediatorOptions.filter((medik) =>
                                  medik.ids.includes(values.professionId)
                                )}
                                defaultValue={
                                  apply &&
                                  listenedApply.mediatrs.map((medik) => {
                                    return {
                                      label: `${medik.firstName} ${medik.lastName} ${medik.middleName}`,
                                    };
                                  })
                                }
                                isDisabled={apply ? true : false}
                                isMulti
                                // className="form-control"
                                placeholder="Mediator seçin"
                                label={"Mediatorlar*"}
                              />
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
                        {!apply && (
                          <div className="row mb-4">
                            <div className="col-md-2 offset-10 text-right">
                              <div className="icon-container">
                                <button
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
                        )}

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
                                      {/* Tərəf :
                                {`${index + 2} - ${
                                  values.sides[index]
                                    ? values.sides[index].fullName
                                    : ""
                                }`}{" "} */}
                                    </h5>
                                    <p className="info-text">
                                      <div className="row mb-4">
                                        <div className="col-md-12">
                                          <MyTextInput
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].fullName`}
                                            name={`sides[${index}].fullName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ad soyad daxil edin"
                                            label={"Soyadı, adı*"}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col-md-12">
                                          <MyTextInput
                                            id={`sides[${index}].advocateFullName`}
                                            name={`sides[${index}].advocateFullName`}
                                            disabled={apply ? true : false}
                                            type="text"
                                            className="form-control"
                                            placeholder="Nümayəndənin / Vəkilin adı, soyadı və atasının adı"
                                            label={"Ad, soyad, ata adı*"}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col-md-12">
                                          <MyTextInput
                                            id={`sides[${index}].organizationName`}
                                            name={`sides[${index}].organizationName`}
                                            disabled={apply ? true : false}
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
                                            disabled={apply ? true : false}
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
                                            disabled={apply ? true : false}
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
                                            disabled={apply ? true : false}
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
                          Mübahisə və mediasiya seansı
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
                              disabled={apply ? true : false}
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
                                  disabled={apply ? true : false}
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
                              disabled={apply ? true : false}
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
                              isDisabled={apply ? true : false}
                              // className="form-control"
                              label="Mediasiya sessiyalarının keçirilməsi üçün üstünlük verilən vaxt*"
                              placeholder={
                                apply && listenedApply.prefferedSessionTime
                                  ? listenedApply.prefferedSessionTime
                                  : "Sizə uyğun vaxtı daxil edin"
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <MySearchableSelect
                              id="requiredLangs"
                              name="requiredLangs"
                              type="text"
                              isMulti
                              isDisabled={apply ? true : false}
                              options={languageKnowledgeOptions}
                              // className="form-control"
                              label="Mediatordan tələb olunan dil biliyi*"
                              placeholder={
                                "Mediatordan tələb etdiyiniz dil biliyi"
                              }
                              placeholder={
                                apply && listenedApply.requiredLangs
                                  ? listenedApply.requiredLangs
                                  : "Mediatordan tələb etdiyiniz dil biliyi"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!apply && (
                  <Button
                    // style={{ position: "fixed", bottom: "11.8%", right: "21vw" }}
                    disabled={!isValid || !dirty || isSubmitting}
                    type="submit"
                    // name="time"
                    className="btn btn-primary float-right  btn-lg mt-2 mb-4"
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
                    Göndər
                  </Button>
                )}

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
                {/* <button
            style={{position:"fixed",bottom:"12%",right:"12%"}}
              id="closeModal"
              onClick={() => {
                dispatch(closeModal());
              }}
              className="btn btn-lg float-right mt-3 mr-2"
              data-dismiss="modal"
            >
              <i className="flaticon-cancel-12" /> Ləğv et
            </button> */}
              </Form>
            )}
          </Formik>
          {apply &&
            apply.status.id === 1  &&  auth.currentUser.role === "Mediatr" &&(
              <div className="row">
                {!rejectForm && (
                  <div className="col-md-12">
                    <div className="button-setting">
                      <Button
                        onClick={() => setRejectForm(true)}
                        className="btn btn-danger float-right  btn-lg mr-1 ml-2 mt-2 mb-4"
                      >
                        İmtina et
                      </Button>

                      <Button
                        onClick={() => {
                          dispatch(approveApply(apply.id));
                          setModal(true);
                          dispatch(closeModal());
                        }}
                        className="btn btn-success float-right  btn-lg mt-2 ml-2 mt-2 mb-4"
                      >
                        {" "}
                        {async.kind === "approve" && (
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
                        Qəbul et
                      </Button>
                    </div>
                  </div>
                )}
                <div className="col-md-12">
                  {rejectForm === true && (
                    <div className="row">
                      <div className="col-md-12">
                        <Formik
                          initialValues={{ username: "", password: "" }}
                          validationSchema={Yup.object({
                            reasonOfReject: Yup.string().required(
                              "Bu sahə mütləq doldurulmalıdır."
                            ),
                          })}
                          onSubmit={(values, { setSubmitting, setErrors }) => {
                            // console.log('ugurludur')
                            dispatch(
                              rejectApply(apply.id, {
                                rejectText: values.reasonOfReject,
                              })
                            );
                            setModal(true);
                            dispatch(closeModal());
                            setSubmitting(false);
                          }}
                        >
                          {({ isSubmitting, isValid, dirty, errors }) => (
                            <Form className="text-left mt-4">
                              <div className="form">
                                <div
                                  id="username-field"
                                  className="field-wrapper input"
                                >
                                  <MyTextArea
                                    id="reasonOfReject"
                                    name="reasonOfReject"
                                    type="text"
                                    className="form-control"
                                    placeholder="İmtina səbəbini daxil edin"
                                    label="İmtina səbəbi"
                                  />
                                </div>

                                <div
                                  style={{ float: "right" }}
                                  className="d-sm-flex text-right justify-content-between"
                                >
                                  <div className="">
                                    <button
                                      disabled={
                                        !isValid || !dirty || isSubmitting
                                      }
                                      type="submit"
                                      // name="time"
                                      className="btn btn-danger text-right  btn-lg mt-3 "
                                    >
                                      İmtina et
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
        </React.Fragment>
      )}
    </ModalWrapper>
  );
}

// const nodes = [
//   {
//     value: "mars",
//     label: "Mars",
//     children: [
//       { value: "phobos", label: "Phobos" },
//       { value: "deimos", label: "Deimos" },
//       { value: "deimos", label: "Deimos" },
//       { value: "deimos", label: "Deimos" },
//       { value: "deimos", label: "Deimos" },
//       { value: "deimos", label: "Deimos" },
//       { value: "deimos", label: "Deimos" },
//       { value: "deimos", label: "Deimos" },

//     ],
//   },
// ];

// class ApplyPageModal extends React.Component {
//   state = {
//     checked: [],
//     expanded: [],
//   };

//   render() {
//     return (
//       <ModalWrapper>
//         <CheckboxTree
//           nodes={nodes}
//           checked={this.state.checked}
//           expanded={this.state.expanded}
//           onCheck={(checked) => this.setState({ checked })}
//           onExpand={(expanded) => this.setState({ expanded })}
//         />
//       </ModalWrapper>
//     );
//   }
// }
// export default ApplyPageModal;
