import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import ScriptTag from 'react-script-tag';
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import { Form, Formik } from "formik";
import { listenToApply } from "./councilActions";
import { closeModal } from "../../../../../app/common/modal/modalReducer";
import MyTextArea from "../../../../../app/common/form/MyTextArea";

import ModalWrapper from "../../../../../app/common/modal/ModalWrapper";

export default function ViewModalForCouncil({ apply }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const async = useSelector((state) => state.async);
  const { listenedApplyForCouncil } = useSelector((state) => state.council);
  
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  useEffect(async () => {
    apply && (await dispatch(listenToApply(apply.id)));
  }, [dispatch]);

  const initialValues = {
    professionId:
      listenedApplyForCouncil.profession &&
      listenedApplyForCouncil.profession.professionName,
    districtIds:
      listenedApplyForCouncil.districts &&
      listenedApplyForCouncil.districts.map(
        (district) => ` ${district.districtName}`
      ),
    courtId: listenedApplyForCouncil.court && listenedApplyForCouncil.court.courtName,

    // mediatrIds: listenedApplyForCouncil.court && listenedApplyForCouncil.court.map(court=> ` ${court.courtName}`  ),
    officeId: "",
    sides: listenedApplyForCouncil.sides && listenedApplyForCouncil.sides,
    conflictInfo:  listenedApplyForCouncil.conflictInfo && listenedApplyForCouncil.conflictInfo,
    courtCaseInfo: listenedApplyForCouncil.courtCaseInfo && listenedApplyForCouncil.courtCaseInfo,
    prefferedSessionTime: listenedApplyForCouncil.prefferedSessionTime && listenedApplyForCouncil.prefferedSessionTime,
    requiredLangs: listenedApplyForCouncil.requiredLangs && listenedApplyForCouncil.requiredLangs,
    caseInAction: true,
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
    <ModalWrapper size="modal-xl" header={"M??raci??tim"}>
      {async.kind === "listenToApply" ? (
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
                          ??mumi m??lumatlar
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
                            <MyTextInput
                              id="professionId"
                              name="professionId"
                              type="text"
                              placeholder="??xtisas se??in"
                              className="form-control"
                              label={"Mediatorun ixtisas?? *"}
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MyTextInput
                              id="districtIds"
                              name="districtIds"
                              type="text"
                              isMulti
                              className="form-control"
                              placeholder="M??kan se??in"
                              label={
                                "Mediasiyan??n ke??irilm??si ??????n ??st??nl??k veril??n yer *"
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-12">
                            <MyTextInput
                              id="courtId"
                              name="courtId"
                              type="text"
                              className="form-control"
                              placeholder="M??hk??m?? se??in"
                              label={
                                "M??bahis?? h??ll olunmazsa m??bahis??nin bax??laca???? yer *"
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
                          Mediator se??imi
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
                        <ul className="list-group list-group-media">
                          {listenedApplyForCouncil.mediatrs &&
                            listenedApplyForCouncil.mediatrs.map((mediatr,index) => (
                              <li key={index} className="list-group-item list-group-item-action">
                                <div className="media">
                                  <div className="mr-3">
                                  <img
                                      alt="avatar"
                                      src={mediatr.imagePath ? `http://muraciet.mediasiya.gov.az:8080/${
                                        mediatr.imagePath
                                      }` : "/assets/img/90x90.jpg"}
                                      className="img-fluid rounded-circle"
                                    />
                                  </div>
                                  <div className="media-body">
                                    <h6 className="tx-inverse">{`${mediatr.firstName} ${mediatr.lastName}`}</h6>
                                    <p className="mg-b-0">
                                      {mediatr.registryNumber}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
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
                          T??r??flar bar??d?? m??lumatlar
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
                        {!listenedApplyForCouncil.sides && (
                          <div className="row">
                            <div className="col-md-12">
                              <h2 className="text-center">
                                He?? bir t??r??f daxil edilm??yib
                              </h2>
                            </div>
                          </div>
                        )}
                        {listenedApplyForCouncil.sides &&
                          listenedApplyForCouncil.sides.map((side, index) => (
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
                                      T??r??f :
                                      {` ${index + 1} - 
                                            ${
                                              side.sideLastName
                                            } 
                                            ${
                                              side.sideFirstName
          
                                            } ${
                                             side.sideMiddleName
                                            }`
                                      }
                                    </h5>
                                    {/* {console.log(values,'cins')} */}
                                    <p className="info-text">
                                      <div className="row mb-4">
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].sideLastName`}
                                            name={`sides[${index}].sideLastName`}
                                            type="text"

                                            className="form-control"
                                            placeholder="Soyad??n daxil edin"
                                            label={"Qar???? t??r??fin soyad?? *"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].sideFirstName`}
                                            name={`sides[${index}].sideFirstName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ad??n daxil edin"
                                            label={"Qar???? t??r??fin ad?? *"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].sideMiddleName`}
                                            name={`sides[${index}].sideMiddleName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ata ad??n daxil edin"
                                            label={"Qar???? t??r??fin ata ad?? *"}
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
                                            placeholder="Ad??n daxil edin"
                                            label={"N??may??nd??nin ad??"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].advocateLastName`}
                                            name={`sides[${index}].advocateLastName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Soyad??n daxil edin"
                                            label={"N??may??nd??nin soyad??"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            id={`sides[${index}].advocateMiddleName`}
                                            name={`sides[${index}].advocateMiddleName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ata ad??n daxil edin"
                                            label={"N??may??nd??nin ata ad??"}
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
                                            label="H??quq ??irk??ti"
                                            placeholder={
                                              "H??quq ??irk??t ad?? daxil edin"
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
                                            label="??nvan *"
                                            placeholder={"??nval daxil edin"}
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
                                            label="Telefon *"
                                            placeholder={
                                              "Telefon n??mr??si daxil edin"
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
                                            placeholder={"E-mail daxil edin"}
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
                          M??bahis?? v?? mediasiya sessiyas??
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
                              label="M??bahis??nin q??sa m??zmunu v?? mediasiyadan g??zl??nil??n n??tic??l??r *"
                              placeholder={"Q??sa m??lumat daxil edin"}
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
                                  Bu m??bahis?? haz??rda m??hk??m?? icraat??ndad??r?
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
                              label="M??hk??m?? v?? i?? bar??d?? mulamatlar *"
                              placeholder={
                                "M??hk??m?? v?? i?? bar??d?? m??lumat daxil edin"
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <MyTextInput
                              id="prefferedSessionTime"
                              name="prefferedSessionTime"
                              type="text"
                              isMulti
                              className="form-control"
                              label="Mediasiya sessiyalar??n??n ke??irilm??si ??????n ??st??nl??k veril??n vaxt *"
                              placeholder={"Siz?? uy??un vaxt?? daxil edin"}
                            />
                          </div>
                          <div className="col-md-6">
                            <MyTextInput
                              id="requiredLangs"
                              name="requiredLangs"
                              type="text"
                              isMulti
                              className="form-control"
                              label="Mediatordan t??l??b olunan dil biliyi *"
                              placeholder={
                                "Mediatordan t??l??b etdiyiniz dil biliyi"
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
                  <i className="flaticon-cancel-12" /> L????v et
                </button>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      )}
    </ModalWrapper>
  );
}
