import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openModal } from "../../../app/common/modal/modalReducer";
export default function Sidebar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div className="shadow-bottom" />
        <ul
          className="list-unstyled menu-categories ps ps--active-y"
          id="accordionExample"
        >
          {auth.currentUser && auth.currentUser.person && (
            <li className="menu">
              <a
                type="button"
                style={{
                  background: "rgb(27, 85, 226)",
                  color: "white",
                  borderRadius: " 6px",
                }}
                data-toggle="modal"
                data-target="#exampleModal"
                data-name="add"
                onClick={() => {
                  dispatch(
                    openModal({
                      modalType: "ViewModalForCitizen",
                      modalProps: null,
                    })
                  );
                }}
                activeStyle={{
                  background: "#bfc9d4",
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                  borderRadius: " 6px",
                }}
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="#fff"
                    style={{ color: "rgb(233 233 233)" }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="css-i6dzq1"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1={10} y1={14} x2={21} y2={3} />
                  </svg>
                  <span>Mediatora müraciət et</span>
                </div>
              </a>
            </li>
          )}

          <li className="menu">
            <NavLink
              to="/dashboard/apply"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div>
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
                <span>Müraciətlər</span>
              </div>
            </NavLink>
          </li>
          {auth.currentUser && auth.currentUser.role === "Council" && (
            <li className="menu">
              <NavLink
                to="/dashboard/mediators"
                activeStyle={{
                  background: "#bfc9d4",
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                  borderRadius: " 6px",
                }}
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <div>
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
                  <span>Mediatorlar</span>
                </div>
              </NavLink>
            </li>
          )}
          <li className="menu">
            <NavLink
              to="/doc"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1={16} y1={13} x2={8} y2={13} />
                  <line x1={16} y1={17} x2={8} y2={17} />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Daxil olan sənədlər</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/information"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
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
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1={12} y1={9} x2={12} y2={13} />
                  <line x1={12} y1={17} x2="12.01" y2={17} />
                </svg>

                <span>
                  Xəbərdarlıq və <br />
                  &nbsp; &nbsp; &nbsp;&nbsp; məlumatlandırma
                </span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/legislation"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
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
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1={16} y1={8} x2={2} y2={22} />
                  <line x1="17.5" y1={15} x2={9} y2={15} />
                </svg>
                <span>Qanunvericilik</span>
              </div>
            </NavLink>
          </li>

          <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
            <div
              className="ps__thumb-x"
              tabIndex={0}
              style={{ left: 0, width: 0 }}
            />
          </div>
          <div
            className="ps__rail-y"
            style={{ top: 0, height: 560, right: "-4px" }}
          >
            <div
              className="ps__thumb-y"
              tabIndex={0}
              style={{ top: 0, height: 300 }}
            />
          </div>
        </ul>
        {/* <div className="shadow-bottom"></div> */}
      </nav>
    </div>
  );
}
