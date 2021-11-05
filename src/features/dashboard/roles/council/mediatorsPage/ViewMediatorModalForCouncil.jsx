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
import moment from "moment";

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
                <div className="layout-px-spacing">
                  <div className="row layout-spacing">
                    {/* Content */}
                    <div className="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
                      <div className="user-profile layout-spacing">
                        <div className="widget-content widget-content-area">
                          <div className="d-flex justify-content-between">
                            <h3>Şəxsi məlumatlar</h3>
                            <a
                              href="user_account_setting.html"
                              className="mt-2 edit-profile"
                            >
                              {" "}
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
                                className="feather feather-edit-3"
                              >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                              </svg>
                            </a>
                          </div>
                          <div className="text-center user-info">
                            <img
                              width="200px"
                              src={`http://muraciet.mediasiya.gov.az:8080/${
                                listenedMediator && listenedMediator.imagePath
                              }`}
                              alt="avatar"
                            />
                            <p>
                              {listenedMediator &&
                                `${listenedMediator.lastName} ${listenedMediator.firstName} ${listenedMediator.middleName}`}
                            </p>
                          </div>
                          <div className="user-info-list">
                            <div>
                              <ul className="contacts-block list-unstyled">
                                <li
                                  title="Şəxsiyyət vəsiqəsinin seriya və nömrəsi"
                                  className="contacts-block__item"
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
                                    className="feather feather-credit-card"
                                  >
                                    <rect
                                      x={1}
                                      y={4}
                                      width={22}
                                      height={16}
                                      rx={2}
                                      ry={2}
                                    />
                                    <line x1={1} y1={10} x2={23} y2={10} />
                                  </svg>
                                  {listenedMediator &&
                                    `${listenedMediator.docSeries}${listenedMediator.docNumber}`}
                                </li>
                                <li
                                  title="Fərdi identifikasiya nömrəsi"
                                  className="contacts-block__item"
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
                                    className="feather feather-user"
                                  >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  {listenedMediator &&
                                    `${listenedMediator.pin}`}
                                </li>
                                <li
                                  title="Doğum tarixi"
                                  className="contacts-block__item"
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
                                    className="feather feather-calendar"
                                  >
                                    <rect
                                      x={3}
                                      y={4}
                                      width={18}
                                      height={18}
                                      rx={2}
                                      ry={2}
                                    />
                                    <line x1={16} y1={2} x2={16} y2={6} />
                                    <line x1={8} y1={2} x2={8} y2={6} />
                                    <line x1={3} y1={10} x2={21} y2={10} />
                                  </svg>
                                  {listenedMediator &&
                                    `${moment(
                                      listenedMediator.dateOfBirth
                                    ).format("DD-MM-YYYY")} `}
                                </li>

                                <li
                                  title="Qeydiyyat ünvanı"
                                  className="contacts-block__item"
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
                                    className="feather feather-map-pin"
                                  >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  {listenedMediator &&
                                    `${listenedMediator.regAddress} `}
                                </li>
                                <li
                                  title="Elektron poçt ünvanı"
                                  className="contacts-block__item"
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
                                    className="feather feather-mail"
                                  >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                  </svg>
                                  {listenedMediator &&
                                    `${listenedMediator.email} `}
                                </li>
                                <li
                                  title="Mobil nömrəsi"
                                  className="contacts-block__item"
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
                                    className="feather feather-phone"
                                  >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>{" "}
                                  {listenedMediator &&
                                    `+994${listenedMediator.phone} `}
                                </li>
                                <li className="contacts-block__item">
                                  <ul className="list-inline text-center">
                                    {listenedMediator.mediatrsSocialMedias &&
                                      listenedMediator.mediatrsSocialMedias
                                        .filter(
                                          (social) =>
                                            social.linkToPage.length > 25
                                        )
                                        .map((social) => {
                                          switch (social.socialMediaName) {
                                            case "Facebook":
                                              return (
                                                <li className="list-inline-item">
                                                  <div className="social-icon">
                                                    <a
                                                      target="_blank"
                                                      href={social.linkToPage}
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
                                                        className="feather feather-facebook"
                                                      >
                                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                                      </svg>
                                                    </a>
                                                  </div>
                                                </li>
                                              );
                                            case "Instagram":
                                              return (
                                                <li className="list-inline-item">
                                                  <div className="social-icon">
                                                    <a
                                                      target="_blank"
                                                      href={social.linkToPage}
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
                                                        className="feather feather-instagram"
                                                      >
                                                        <rect
                                                          x={2}
                                                          y={2}
                                                          width={20}
                                                          height={20}
                                                          rx={5}
                                                          ry={5}
                                                        />
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                        <line
                                                          x1="17.5"
                                                          y1="6.5"
                                                          x2="17.51"
                                                          y2="6.5"
                                                        />
                                                      </svg>
                                                    </a>
                                                  </div>
                                                </li>
                                              );
                                            case "Twitter":
                                              return (
                                                <li className="list-inline-item">
                                                  <div className="social-icon">
                                                    <a
                                                      target="_blank"
                                                      href={social.linkToPage}
                                                    >
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
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                      </svg>
                                                    </a>
                                                  </div>
                                                </li>
                                              );
                                            case "Linkedin":
                                              return (
                                                <li className="list-inline-item">
                                                  <div className="social-icon">
                                                    <a
                                                      target="_blank"
                                                      href={social.linkToPage}
                                                    >
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
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                        <rect
                                                          x={2}
                                                          y={9}
                                                          width={4}
                                                          height={12}
                                                        />
                                                        <circle
                                                          cx={4}
                                                          cy={4}
                                                          r={2}
                                                        />
                                                      </svg>
                                                    </a>
                                                  </div>
                                                </li>
                                              );
                                            case "Digər":
                                              return (
                                                <li className="list-inline-item">
                                                  <div className="social-icon">
                                                    <a
                                                      target="_blank"
                                                      href={social.linkToPage}
                                                    >
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
                                                        <rect
                                                          x={3}
                                                          y={3}
                                                          width={18}
                                                          height={18}
                                                          rx={2}
                                                          ry={2}
                                                        />
                                                        <line
                                                          x1={3}
                                                          y1={9}
                                                          x2={21}
                                                          y2={9}
                                                        />
                                                        <line
                                                          x1={9}
                                                          y1={21}
                                                          x2={9}
                                                          y2={9}
                                                        />
                                                      </svg>
                                                    </a>
                                                  </div>
                                                </li>
                                              );

                                            default:
                                              return (
                                                <p className="text-center">
                                                  Social media hesabı yoxdur
                                                </p>
                                              );
                                          }
                                        })}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="education layout-spacing ">
                        <div className="widget-content widget-content-area">
                          <h3>Təhsil məlumatları</h3>
                          <div className="timeline-alter">
                            {listenedMediator.educations &&
                              listenedMediator.educations.map((edu, index) => (
                                <div key={index} className="item-timeline">
                                  <div className="t-meta-date">
                                    <p>
                                      {`${moment(edu.graduationDate).format(
                                        "YYYY"
                                      )}`} 
                                    </p>
                                  </div>
                                  <div
                                    className="t-dot"
                                    data-original-title
                                  ></div>
                                  <div className="t-text">
                                    <p>{edu.collegeName}</p>
                                    <p>{edu.majorName}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="work-experience layout-spacing ">
                        <div className="widget-content widget-content-area">
                          <h3>Sertifikatlar</h3>
                          <div className="timeline-alter">
                            {listenedMediator.certificates &&
                              listenedMediator.certificates.map(
                                (certificate, index) => (
                                  <div key={index} className="item-timeline">
                                    <div className="t-meta-date">
                                      <p>
                                        {moment(
                                          certificate.certificationDate
                                        ).format("DD-MM-YYYY")}
                                      </p>
                                    </div>
                                    <div
                                      className="t-dot"
                                      data-original-title
                                    ></div>
                                    <div className="t-text">
                                      <p>{certificate.issuerInstitution}</p>
                                      <p>{certificate.certificateName}</p>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing">
                      <div className="skills layout-spacing ">
                        <div className="widget-content widget-content-area">
                          <h3>İxtisaslar</h3>
                          {listenedMediator.mediatrProfessions &&
                            listenedMediator.mediatrProfessions.map(
                              (mediatrProfession, index) => (
                                <div key={index} className="progress br-30">
                                  <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: "100%" }}
                                    aria-valuenow={25}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <div className="progress-title">
                                      <span>
                                        {mediatrProfession.professionName}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div className="bio layout-spacing ">
                        <div className="widget-content widget-content-area">
                          <h3 className="mb-1">Fəaliyyətinə dair məlumatlar</h3>
                          <div className="bio-skill-box">
                            <div className="row">
                              <div className="col-12 col-xl-12 col-lg-12 mb-xl-12">
                                <div className="table-responsive">
                                  <table className="table table-hover">
                                    {/* <thead>
                                      <tr>
                                        <th>Təlim keçdiyi qurum</th>
                                        <th>
                                          Fəaliyyət göstərdiyi şəhər/rayon
                                        </th>
                                        <th>Fəaliyyət göstərdiyi ünvan</th>
                                        <th>Üzvlüyə qəbul edildiyi tarix</th>
                                        <th>Reyestr nömrəsi</th>
                                        <th>VÖEN</th>
                                      </tr>
                                    </thead> */}
                                    <tbody>
                                      <tr>
                                        <td className="text-info text-bold">
                                          Təlim keçdiyi qurum
                                        </td>
                                        <td>
                                          {listenedMediator.institutionName}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">
                                          Fəaliyyət göstərdiyi şəhər/rayon
                                        </td>
                                        <td>
                                          {" "}
                                          {listenedMediator.districts &&
                                            listenedMediator.districts.join(
                                              ", "
                                            )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">
                                          Fəaliyyət göstərdiyi ünvan
                                        </td>
                                        <td>
                                          {listenedMediator.actingAddress}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">
                                          Üzvlüyə qəbul edildiyi tarix
                                        </td>
                                        <td>
                                          {moment(
                                            listenedMediator.membershipDate
                                          ).format("DD-MM-YYYY")}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">
                                          Reyestr nömrəsi
                                        </td>
                                        <td>
                                          {listenedMediator.registryNumber}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">VÖEN</td>
                                        <td>{listenedMediator.voen}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bio layout-spacing ">
                        <div className="widget-content widget-content-area">
                          <h3 className="mb-1">Digər məlumatlar</h3>
                          <div className="bio-skill-box">
                            <div className="row">
                              <div className="col-12 col-xl-12 col-lg-12 mb-xl-12">
                                <div className="table-responsive">
                                  <table className="table table-hover  mb-4">
                                    {/* <thead>
                                      <tr>
                                        <th>Dil bilikləri</th>
                                        <th>
                                          Mediatorluqla yanaşı hazırda işlədiyi
                                          yer
                                        </th>
                                        <th>Vəzifə</th>
                                      </tr>
                                    </thead> */}
                                    <tbody>
                                      <tr>
                                        <td className="text-info">
                                          Mediatorluqla yanaşı hazırda işlədiyi
                                          yer
                                        </td>
                                        <td>
                                          {listenedMediator.otherWorkplace}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">Vəzifə</td>
                                        <td>
                                          {listenedMediator.otherPosition}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-info">
                                          Dil bilikləri
                                        </td>
                                        <td>
                                          {listenedMediator.languageSkills}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
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
