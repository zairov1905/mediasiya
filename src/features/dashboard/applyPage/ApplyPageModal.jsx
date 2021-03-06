import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import ScriptTag from 'react-script-tag';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Field, FieldArray, Form, Formik } from "formik";
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
// import './tree.css'
import { closeModal } from "../../../app/common/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";

import ModalWrapper from "../../../app/common/modal/ModalWrapper";
import Button from "../../../app/common/modal/Button";
import MyCheckbox from "../../../app/common/form/MyCheckbox";
import { toast } from "react-toastify";

// const Demo = props => (
//   <ScriptTag type="text/javascript" src="/custom-jstree.js" />
//   )
export default function ApplyPageModal({ apply }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [rejectForm, setRejectForm] = useState(false);
  const nodes = [
    {
      value: "mars",
      label: "Mars",
      children: [
        { value: "phobos", label: "Phobos" },
        { value: "deimos", label: "Deimos" },
      ],
    },
  ];
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const async = useSelector((state) => state.async);
  const auth = useSelector((state) => state.auth);

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

  const officeOptions =
    applys.offices &&
    applys.offices.map((office) => {
      return {
        value: parseInt(office.id),
        label: `${office.officeName}`,
      };
    });

  const languageKnowledgeOptions = [
    { label: "Az??rbaycan", value: "Az??rbaycan" },
    { label: "Rus", value: "Rus" },
    { label: "??ngilis", value: "??ngilis" },
  ];
  const genderOptions = [
    { label: "Ki??i", value: parseInt(1) },
    { label: "Qad??n", value:parseInt (2) },
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
        mediatorNames: [],
      };
  const validationSchema = Yup.object({});

  // const [professionId, setProfessionId] = useState();
  // const [courtId, setCourtId] = useState();
  const onChangeProfId = async (profId, courtId) => {
    dispatch(loadMediatr({ professionId: profId, courtId: courtId }));
  };
  const groupStyles = {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.2em",
    justifyContent: "space-between",
    borderBottom: "1px dotted #7091e6",
  };
  const groupBadgeStyles = {
    backgroundColor: "#7091e6",
    borderRadius: "2em",
    color: "#fff",
    display: "inline-block",
    fontSize: 12,
    marginLeft: "10px",
    fontWeight: "bold",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  // const mediatorOptions =
  //   applys.mediatrs &&
  //   applys.mediatrs.map((mediatr) => {
  //     return {
  //       value: parseInt(mediatr.id),
  //       label: `${mediatr.firstName} ${mediatr.lastName} ${mediatr.middleName}`,
  //       ids: mediatr.mediatrProfessions.map((medik) => medik.id),
  //     };
  //   });
  const groupedOptions =
    check === "mediator" &&
    applys.mediatrs.map((mediatr) => {
      return {
        value: parseInt(mediatr.districtId),
        label: `${mediatr.districtName}`,
        mediatrs: mediatr.mediatrs.map((medik) => {
          return {
            label: `${medik.firstName} ${medik.lastName} ${medik.middleName}`,
            value: parseInt(medik.mediatrId),
          };
        }),
        // ids: mediatr.mediatrProfessions.map((medik) => medik.id),
      };
    });

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
  // let medik =
  // if(medik[0] !== undefined){
  //   let mediator = medik[0]
  //   console.log(mediator.map(medi=>medi.label))
  // }
  //medik[0].forEach(med => console.log(med))
  //console.log(medik[0])

  // const groupByRegion =
  //   check === "mediator" &&
  //   apply.mediatrs.map((mediatrs) => {
  //     mediatrs.map((mediatr) => {
  //       return {
  //         label: `${mediatr.firstName} ${mediatr.lastName} ${mediatr.middleName}`,
  //         value: parseInt(mediatr.mediatrId),
  //       };
  //     });
  //   });
  // console.log(groupByRegion);
  // [
  //   {
  //     label: "Colours",
  //     options: colourOptions,
  //   },
  //   {
  //     label: "Flavours",
  //     options: flavourOptions,
  //   },
  // ];

  const formatGroupLabel = (groupedOptions) => (
    <div style={groupStyles}>
      <span>{groupedOptions.label}</span>
      <span style={groupBadgeStyles}>{groupedOptions.options.length}</span>
    </div>
  );

  const [mediatorName, setMediatorName] = useState([]);
  return (
    <ModalWrapper
      size="modal-xl"
      header={
        apply
          ? "Mediatora m??raci??t - n??z??rd??n ke??ir "
          : "Mediatora m??raci??t - yeni"
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
                            <MySearchableSelect
                              id="professionId"
                              name="professionId"
                              type="text"
                              // loadOptions={onChangeProfId}
                              // onInputChange={(values) => {

                              //     onChangeProfId(values.professionId);

                              // }}
                              defaultValue={
                                apply && {
                                  value: parseInt(
                                    listenedApply.profession &&
                                      listenedApply.profession.id
                                  ),
                                  label: listenedApply.profession
                                    ? listenedApply.profession.professionName
                                    : "T??yin edilm??yib",
                                }
                              }
                              isDisabled={apply ? true : false}
                              options={professionOptions}
                              // className="form-control"
                              placeholder="??xtisas se??in"
                              label={"Mediatorun ixtisas?? *"}
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
                              placeholder="M??kan se??in"
                              label={
                                "Mediasiyan??n ke??irilm??si ??????n ??st??nl??k veril??n yer*"
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
                                    : "T??yin edilm??yib",
                                }
                              }
                              placeholder="M??hk??m?? se??in"
                              label={
                                "M??bahis?? h??ll olunmazsa m??bahis??nin bax??laca???? yer*"
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
                          Mediator se??imi:{" "}
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
                                    Mediasiya t????kilatlar??
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
                                    F??rdi qaydada f??aliyy??t g??st??r??n mediatorlar
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
                                      : "T??yin edilm??yib",
                                  }
                                }
                                options={officeOptions}
                                isMulti={check === "office" && false}
                                // className="form-control"
                                placeholder="Mediator t????kilat?? se??in"
                                label={"Mediator t????kilatlar??*"}
                              />
                            </div>
                          </div>
                        )}
                        {(check === "mediator" || listenedApply.mediatrs) && (
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
                                                {/* {console.log(
                                                  mediatorName.find(
                                                    (mediator) =>
                                                      mediator ===
                                                      `${name.firstName} ${name.lastName}`
                                                  )
                                                )} */}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                            {/* <div className="col-md-12">
                              <p>medikler</p>
                            </div> */}
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
                        {!apply && (
                          <div className="row mb-4">
                            <div className="col-md-2 offset-10 text-right">
                              <div className="icon-container">
                                <button
                                  title="T??r??f ??lav?? et"
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
                                  title="T??r??fi sil"
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
                                He?? bir t??r??f daxil edilm??yib
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
                                      T??r??f :
                                      {!apply &&
                                        `${index + 2} - ${
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
                                                values.sides[index]
                                                  .sideMiddleName
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
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].sideLastName`}
                                            name={`sides[${index}].sideLastName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Soyad??n daxil edin"
                                            label={"Qar???? t??r??fin soyad??*"}
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <MyTextInput
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].sideFirstName`}
                                            name={`sides[${index}].sideFirstName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ad??n daxil edin"
                                            label={"Qar???? t??r??fin ad??*"}
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <MyTextInput
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].sideMiddleName`}
                                            name={`sides[${index}].sideMiddleName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ata ad??n daxil edin"
                                            label={"Qar???? t??r??fin ata ad??*"}
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <MySearchableSelect
                                            isDisabled={apply ? true : false}
                                            id={`sides[${index}].sideGender`}
                                            name={`sides[${index}].sideGender`}
                                            type="text"
                                            // className="form-control"
                                            // defaultValue={
                                            //   apply && {
                                            //     label:
                                            //       sides[index] &&
                                            //       sides[index].sideGender === 1
                                            //         ? "Ki??i"
                                            //         : "Qad??n",
                                            //   }
                                            // }
                                            options={genderOptions}
                                            placeholder="Cinsin daxil edin"
                                            label={"Qar???? t??r??f cinsi*"}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col-md-4">
                                          <MyTextInput
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].advocateFirstName`}
                                            name={`sides[${index}].advocateFirstName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ad??n daxil edin"
                                            label={"N??may??nd??nin ad??*"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].advocateLastName`}
                                            name={`sides[${index}].advocateLastName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Soyad??n daxil edin"
                                            label={"N??may??nd??nin soyad??*"}
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <MyTextInput
                                            disabled={apply ? true : false}
                                            id={`sides[${index}].advocateMiddleName`}
                                            name={`sides[${index}].advocateMiddleName`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ata ad??n daxil edin"
                                            label={"N??may??nd??nin ata ad??*"}
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
                                            label="H??quq ??irk??ti"
                                            placeholder={
                                              "H??quq ??irk??t ad?? daxil edin*"
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
                                            label="??nvan"
                                            placeholder={"??nval daxil edin*"}
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
                                              "Telefon n??mr??si daxil edin*"
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
                              disabled={apply ? true : false}
                              className="form-control"
                              label="M??bahis??nin q??sa m??zmunu v?? mediasiyadan g??zl??nil??n n??tic??l??r*"
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
                                  disabled={apply ? true : false}
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
                              disabled={apply ? true : false}
                              type="text"
                              className="form-control"
                              label="M??hk??m?? v?? i?? bar??d?? mulamatlar*"
                              placeholder={
                                "M??hk??m?? v?? i?? bar??d?? m??lumat daxil edin"
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
                              label="Mediasiya sessiyalar??n??n ke??irilm??si ??????n ??st??nl??k veril??n vaxt*"
                              placeholder={
                                apply && listenedApply.prefferedSessionTime
                                  ? listenedApply.prefferedSessionTime
                                  : "Siz?? uy??un vaxt?? daxil edin"
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
                              label="Mediatordan t??l??b olunan dil biliyi*"
                              placeholder={
                                "Mediatordan t??l??b etdiyiniz dil biliyi"
                              }
                              placeholder={
                                apply && listenedApply.requiredLangs
                                  ? listenedApply.requiredLangs
                                  : "Mediatordan t??l??b etdiyiniz dil biliyi"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <ul className="file-tree">
                    <li className="file-tree-folder">
                      CSS
                      <ul>
                        <li>style.css</li>
                      </ul>
                    </li>
                    <li className="file-tree-folder empty">Images</li>
                    <li className="file-tree-folder">
                      HTML
                      <ul>
                        <li className="file-tree-folder">
                          PAGES
                          <ul>
                            <li>file name </li>
                            <li>file name </li>
                            <li>file name </li>
                          </ul>
                        </li>
                        <li>file name </li>
                        <li>file name </li>
                      </ul>
                    </li>
                    <li>index.html </li>
                    <li>components.html </li>
                  </ul> */}
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
                    G??nd??r
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
                  <i className="flaticon-cancel-12" /> L????v et
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
              <i className="flaticon-cancel-12" /> L????v et
            </button> */}
              </Form>
            )}
          </Formik>
          {apply &&
            apply.status.id === 1 &&
            auth.currentUser.role === "Mediatr" && (
              <div className="row">
                {!rejectForm && (
                  <div className="col-md-12">
                    <div className="button-setting">
                      <Button
                        onClick={() => {
                          setRejectForm(true);
                          toast.info(
                            "??mtina etm??k ??????n s??b??b daxil edilm??lidir."
                          );
                        }}
                        className="btn btn-danger float-right  btn-lg mr-1 ml-2 mt-2 mb-4"
                      >
                        ??mtina et
                      </Button>

                      <Formik
                        initialValues={{ id: apply.id }}
                        validationSchema={Yup.object({
                          id: Yup.number().required(
                            "Bu sah?? m??tl??q doldurulmal??d??r."
                          ),
                        })}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                          // console.log('ugurludur')
                          dispatch(approveApply(apply.id));
                          setModal(true);
                          dispatch(closeModal());
                          setSubmitting(false);
                        }}
                      >
                        {({ isSubmitting, isValid, dirty, errors }) => (
                          <Form className="text-left mt-4">
                            <div className="form">
                              <MyTextArea
                                id="id"
                                name="id"
                                type="text"
                                className="form-control"
                                value={apply.id}
                                style={{ display: "none" }}
                                // placeholder="??mtina s??b??bini daxil edin"
                                // label="??mtina s??b??bi"
                              />

                              <div
                                style={{ float: "right" }}
                                className="d-sm-flex text-right justify-content-between"
                              >
                                <div className="">
                                  <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    // name="time"
                                    className="btn btn-success float-right  btn-lg mt-2 ml-2 mt-2 mb-4 "
                                  >
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
                                    Q??bul et
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {/* <Button
                        onClick={() => {
                        }}
                        className="btn btn-success float-right  btn-lg mt-2 ml-2 mt-2 mb-4"
                      >
                        {" "}
                        Q??bul et
                      </Button>
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
                      </button> */}
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
                              "Bu sah?? m??tl??q doldurulmal??d??r."
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
                                    placeholder="??mtina s??b??bini daxil edin"
                                    label="??mtina s??b??bi"
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
                                      ??mtina et
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
