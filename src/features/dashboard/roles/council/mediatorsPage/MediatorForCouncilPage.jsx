import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openModal } from "../../../../../app/common/modal/modalReducer";

import { loadMediator } from "./mediatorForCouncilActions";
export default function MediatorForCouncilPage() {
  const auth = useSelector((state) => state.auth);
  const async = useSelector((state) => state.async);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMediator());
  }, dispatch);
  const [perPage, setPerPage] = useState(10);
  const [PageNumber, setPageNumber] = useState(1);
  const { mediators, totalCount } = useSelector(
    (state) => state.mediatorForCouncil
  );
  const [hover, sethover] = useState(false);
  const [target, setTarget] = useState({ id: null, name: null });

  const data = mediators;

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
    dispatch(loadMediator({ PageNumber: page, PageSize: perPage }));
    setPageNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(loadMediator({ PageNumber: page, PageSize: newPerPage }));
    setPerPage(newPerPage);
  };

  const columns = [
    {
      name: "Soyad, ad, ata adı ",
      cell: (mediator) => (
        <p>
          {`${mediator.lastName} ${mediator.firstName} ${mediator.middleName}`}
        </p>
      ),
    },
    {
      name: "FİN",
      // selector: "registryNumber",
      // maxWidth: "164px",
      cell: (mediator) => <p>{`${mediator.pin}`}</p>,
    },
    {
      name: "Reyestr nömrəsi",
      // selector: "registryNumber",
      // maxWidth: "164px",
      cell: (mediator) => <p>{`${mediator.registryNumber}`}</p>,
    },
    {
      name: "Ərazi",
      cell: (mediator) => <p>{`${mediator.districts}`}</p>,
    },

    {
      name: "Ətraflı",
      cell: (mediator) => (
        <div className="action-btn">
          <svg
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            data-name="edit"
            onClick={() => {
              dispatch(
                openModal({
                  modalType: "ViewMediatorModalForCouncil",
                  modalProps: { mediator },
                })
              );
            }}
            id={mediator.id}
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
                target.id === `${mediator.id}` &&
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
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      {/* BEGIN mediatorPAGE CONTAINER */}
      <div className="layout-px-spacing">
        <div className="row layout-top-spacing">
          <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div className="widget-content widget-content-area br-6">
              <DataTable
                // className="dataTables_wrapper container-fluid dt-bootstrap4 table-responsive"
                // selectableRows
                title={"Mediatorlar"}
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
              />
            </div>
          </div>
        </div>
      </div>
      {/* END mediatorPAGE CONTAINER */}
    </React.Fragment>
  );
}
