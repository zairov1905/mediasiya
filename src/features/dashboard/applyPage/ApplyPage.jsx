import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { openModal } from "../../../app/common/modal/modalReducer";

import {
  assignMediator,
  deleteApply,
  loadApply,
  loadPrint,
} from "./applyActions";
export default function ApplyPage() {
  const auth = useSelector((state) => state.auth);
  const async = useSelector((state) => state.async);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadApply({ pageSize: 100 }));
  }, dispatch);
  const [perPage, setPerPage] = useState(10);
  const [PageNumber, setPageNumber] = useState(1);
  const { applys, totalCount } = useSelector((state) => state.applys);
  const print = useSelector((state) => state.applys.prints);
  const [hover, sethover] = useState(false);
  const [target, setTarget] = useState({ id: null, name: null });

  const data = applys;
  const buttonStyleAdd = {
    padding: "9px",
    background: "#ffffff",
    // fontSize: "0.8em",
    borderRadius: "5px",
    cursor: "pointer",
    // marginRight: "35px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 64%)",
    // width: "400px",
    // height: "41px",
    color: "#1b55e2",
    fill: "rgba(232, 186, 183, 0.239)",
  };
  const buttonStyle = {
    padding: "9px",
    background: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "35px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 12%)",
    width: "43px",
    height: "41px",
    color: "#fe0040",
    fill: "rgba(232, 186, 183, 0.239)",
  };
  const buttonStyle1 = {
    //   '&:hover':{
    //     background:'#sdsdss'
    //   },
    padding: "9px",
    background: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "2px",
    marginBottom: "10px",
    marginTop: "10px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 12%)",
    width: "36px",
    height: "34px",
    // color: "#1b55e2",
    // fill: "rgba(232, 186, 183, 0.239)",
  };
  const buttonHover = {
    color: "#1b55e2",
    fill: "rgba(27, 85, 226, 0.23921568627450981)",
  };
  const handlePageChange = (page) => {
    dispatch(loadApply({ s: page, take: perPage }));
    setPageNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(loadApply({ s: page, take: newPerPage }));
    setPerPage(newPerPage);
  };

  const actions = (
    <span
      type="button"
      data-toggle="modal"
      data-target="#exampleModal"
      data-name="add"
      onClick={() => {
        dispatch(
          openModal({
            modalType: "ApplyPageModal",
            modalProps: null,
          })
        );
      }}
      onMouseEnter={(e) => {
        sethover(true);
        setTarget({
          ...target,
          name: e.target.getAttribute("data-name"),
        });
      }}
      onMouseLeave={() => {
        sethover(false);
        setTarget(null);
      }}
      style={{
        ...buttonStyleAdd,
        ...(hover && target.name === "add" && buttonHover),
      }}
    >
      Mediatora müraciət
      <svg
        // type="button"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-plus icon-container"
      >
        <line x1={12} y1={5} x2={12} y2={19} />
        <line x1={5} y1={12} x2={19} y2={12} />
      </svg>
    </span>
  );

  const columns = [
    {
      name: "Müraciət tarixi",
      cell: (apply) => <p>{moment(apply.createdDate).format("DD-MM-YYYY")}</p>,
      maxWidth: "150px",
      sortable: true,
    },
    {
      name:
        auth.currentUser && auth.currentUser.mediatr
          ? "Müraciət edən şəxs"
          : "Mediator / Mediasiya təşkilatı",
      cell: (apply) => {
        // for user
        if (apply.selectedMediatr && auth.currentUser.person) {
          return `${apply.selectedMediatr.firstName} ${apply.selectedMediatr.lastName}`;
        } else if (apply.mediatrs.length > 0 && auth.currentUser.person) {
          let medArr = [];
          apply.mediatrs.forEach((item) => {
            medArr.push(`${item.firstName} ${item.lastName}`);
          });
          return (
            <p>
                {medArr.join(", ")}
            </p>
          );
        } else if (apply.office && auth.currentUser.person) {
          return <p>{apply.office.officeName}</p>;
        }
        // for office
        else if (apply.selectedMediatr && auth.currentUser.office) {
          return `${apply.selectedMediatr.firstName} ${apply.selectedMediatr.lastName}`;
        } else if (!apply.selectedMediatr > 0 && auth.currentUser.office) {
          return <p>Mediator təyin edilməyib</p>;
        }
        // for mediator
        else if (auth.currentUser.mediatr && apply.person) {
          return `${apply.person.firstName} ${apply.person.lastName} ${apply.person.middleName}`;
        } else if (!apply.selectedMediatr > 0 && auth.currentUser.office) {
          return <p>Mediator təyin edilməyib</p>;
        }
      },
      sortable: true,
    },
    {
      name: "Məhkəmə",
      selector: "courtName",
      sortable: true,
    },
    {
      name: "Status",
      // selector: "status",
      cell: (apply) => <p>{apply.status.statusName}</p>,
      maxWidth: "164px",

      sortable: true,
    },

    {
      name: "",
      cell: (apply) => (
        <div className="action-btn">
          <svg
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            data-name="edit"
            onClick={() => {
              dispatch(
                openModal({
                  modalType: "ApplyPageModal",
                  modalProps: { apply },
                })
              );
            }}
            id={apply.id}
            onMouseEnter={(e) => {
              sethover(true);
              setTarget({
                ...target,
                id: e.target.id,
                name: e.target.getAttribute("data-name"),
              });
              // console.log(e.target.getAttribute('data-name'))
            }}
            onMouseLeave={() => {
              sethover(false);
              setTarget();
            }}
            style={{
              ...buttonStyle1,
              ...(hover &&
                target.id === `${apply.id}` &&
                target.name === "edit" &&
                buttonHover),
            }}
            className="icon-hover btn btn-rounded btn-primary mb-2 mr-4"
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
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx={12} cy={12} r={3} />
          </svg>
          {auth.currentUser && auth.currentUser.role === "Office" && (
            <svg
              type="button"
              data-toggle="modal"
              data-target="#exampleModal"
              data-name="assignMediatr"
              id={apply.id}
              onClick={() => {
                if (apply.selectedMediatr) {
                  let mediatorName = `${apply.selectedMediatr.firstName} ${apply.selectedMediatr.lastName}`;
                  toast.error(
                    <p>
                      Bu muraciətə artıq <b>{mediatorName}</b> mediator kimi
                      təyin edilmişdir
                    </p>
                  );
                } else {
                  dispatch(
                    openModal({
                      modalType: "SelectMediatorModal",
                      modalProps: { auth, apply },
                    })
                  );
                }
              }}
              onMouseEnter={(e) => {
                sethover(true);
                setTarget({
                  ...target,
                  id: e.target.id,
                  name: e.target.getAttribute("data-name"),
                });
                // console.log(e.target.getAttribute('data-name'))
              }}
              onMouseLeave={() => {
                sethover(false);
                setTarget();
              }}
              style={{
                ...buttonStyle1,
                ...(hover &&
                  target.id === `${apply.id}` &&
                  target.name === "assignMediatr" &&
                  buttonHover),
              }}
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user-plus"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy={7} r={4} />
              <line x1={20} y1={8} x2={20} y2={14} />
              <line x1={23} y1={11} x2={17} y2={11} />
            </svg>
          )}
          {async.kind === "print" && target.id === `${apply.id}` ? (
            <svg
              style={buttonStyle1}
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
          ) : (
            <svg
              type="button"
              data-name="print"
              id={apply.id}
              onClick={(e) => {
                if (apply.selectedMediatr) {
                  dispatch(loadPrint(apply.id));
                } else {
                  toast.error(
                    "Seçdiyiniz müraciətə mediator təyin olunmadığı üçün çap versiyası mövcud deyildir."
                  );
                }
              }}
              onMouseEnter={(e) => {
                sethover(true);
                setTarget({
                  ...target,
                  id: e.target.id,
                  name: e.target.getAttribute("data-name"),
                });
                // console.log(e.target.getAttribute('data-name'))
              }}
              onMouseLeave={() => {
                sethover(false);
                setTarget();
              }}
              style={{
                ...buttonStyle1,
                ...(hover &&
                  target.id === `${apply.id}` &&
                  target.name === "print" &&
                  buttonHover),
              }}
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-printer"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x={6} y={14} width={12} height={8} />
            </svg>
          )}
        </div>
      ),
    },
  ];
  // let title;
  // // switch (auth.currentUser.role) {
  // //   case "Citizen":
  // //     title = "Müraciətlər"
  // //     break;
  // //   case ""
  // //   default:
  // //     break;
  // // }

  return (
    <React.Fragment>
      {/* BEGIN applyPAGE CONTAINER */}
      <div className="layout-px-spacing">
        <div className="row layout-top-spacing">
          <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div className="widget-content widget-content-area br-6">
              <DataTable
                // className="dataTables_wrapper container-fluid dt-bootstrap4 table-responsive"
                // selectableRows
                title={"Müraciətlər"}
                columns={columns}
                data={data}
                pagination
                paginationServer
                paginationTotalRows={totalCount}
                paginationDefaultPage={PageNumber}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                highlightOnHover
                Clicked
                actions={
                  auth.currentUser &&
                  auth.currentUser.role === "Citizen" &&
                  actions
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* END applyPAGE CONTAINER */}
    </React.Fragment>
  );
}
