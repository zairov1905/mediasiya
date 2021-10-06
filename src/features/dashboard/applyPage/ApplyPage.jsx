import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openModal } from "../../../app/common/modal/modalReducer";

import { deleteApply, loadApply } from "./applyActions";
export default function ApplyPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadApply({ take: 10 }));
    //   // return () => {
    //   //   // dispatch(loadOrder())
    //   // }
  }, [dispatch]);
  const [perPage, setPerPage] = useState(10);
  const [PageNumber, setPageNumber] = useState(1);
  const { applys, totalCount } = useSelector((state) => state.applys);
  const [hover, sethover] = useState(false);
  const [target, setTarget] = useState({ id: null, name: null });

  const data = [{
    date:'06/10/2021',
    mediator:"Teymurzade Abbas",
    court:"Bakı Apelyasiya Məhkəməsi",
    status:"İcra edilməkdədir"
  }];
  const buttonStyle = {
    padding: "9px",
    background: "#ffffff",
    fontSize:'0.8em',
    borderRadius: "5px",
    cursor: "pointer",
    // marginRight: "35px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 64%)",
    // width: "400px",
    // height: "41px",
    color: "#1b55e2",
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
    // marginRight: "2px",
    marginBottom: "10px",
    marginTop: "10px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 12%)",
    // width: "200px",
    // height: "34px",
    color: "#fe0040",
    fill: "rgba(232, 186, 183, 0.239)",
  };
  const buttonHover = {
    color: "#515365",
    fill: "#ffcacd",
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
        ...buttonStyle,
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
      selector:"date",
      sortable: true,
    },
    {
      name: "Mediator",
      selector:"mediator",
      sortable: true,
    },
    {
      name: "Məhkəmə",
      selector:"court",
      sortable: true,
    },
    {
      name: "Status",
      selector:"status",
      sortable: true,
    },
    // {
    //   name: "",
    //   cell: (apply) => (
    //     <div className="action-btn">
    //       <svg
    //         onClick={() => {
    //           dispatch(
    //             openModal({
    //               modalType: "ApplyPageModal",
    //               modalProps: { apply },
    //             })
    //           );
    //         }}
    //         data-name="edit"
    //         id={apply.id}
    //         onMouseEnter={(e) => {
    //           sethover(true);
    //           setTarget({
    //             ...target,
    //             id: e.target.id,
    //             name: e.target.getAttribute("data-name"),
    //           });
    //           // console.log(e.target.getAttribute('data-name'))
    //         }}
    //         onMouseLeave={() => {
    //           sethover(false);
    //           setTarget();
    //         }}
    //         style={{
    //           ...buttonStyle1,
    //           ...(hover &&
    //             target.id === `${apply.id}` &&
    //             target.name === "edit" &&
    //             buttonHover),
    //         }}
    //         type="button"
    //         className="icon-hover btn btn-rounded btn-primary mb-2 mr-4"
    //         data-toggle="modal"
    //         data-target="#exampleModal"
    //         xmlns="http://www.w3.org/2000/svg"
    //         width={24}
    //         height={24}
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="feather feather-edit-2 edit"
    //       >
    //         <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    //       </svg>
    //       <svg
    //         data-name="delete"
    //         id={apply.id}
    //         onClick={() => {
    //           if (
    //             prompt(`Zəhmət olmasa silmək üçün şifrəni daxil edin`) == 9519
    //           ) {
    //             dispatch(deleteApply(apply.id));
    //           } else {
    //             toast.info(
    //               "Silmək cəhtiniz uğursuzdur, silmək üçün düzgün şifrə daxil edin."
    //             );
    //           }
    //         }}
    //         onMouseEnter={(e) => {
    //           sethover(true);
    //           setTarget({
    //             ...target,
    //             id: e.target.id,
    //             name: e.target.getAttribute("data-name"),
    //           });
    //           // console.log(e.target.getAttribute('data-name'))
    //         }}
    //         onMouseLeave={() => {
    //           sethover(false);
    //           setTarget();
    //         }}
    //         style={{
    //           ...buttonStyle1,
    //           ...(hover &&
    //             target.id === `${apply.id}` &&
    //             target.name === "delete" &&
    //             buttonHover),
    //         }}
    //         xmlns="http://www.w3.org/2000/svg"
    //         width={24}
    //         height={24}
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="feather feather-user-minus delete"
    //       >
    //         <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    //         <circle cx="8.5" cy={7} r={4} />
    //         <line x1={23} y1={11} x2={17} y2={11} />
    //       </svg>
    //     </div>
    //   ),
    // },
  ];

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
                title="Müraciətlərim"
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
                actions={actions}
              />
            </div>
          </div>
        </div>
      </div>
      {/* END applyPAGE CONTAINER */}
    </React.Fragment>
  );
}
