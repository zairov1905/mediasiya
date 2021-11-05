import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
// import useScript from "../../../app/common/loadJs/loadJs";
import { signOutUser } from "../../auth/authActions";

export default function Header() {
  const dispatch = useDispatch();
  // useScript("../../../../public/assets/js/app.js");
  const auth = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (auth.authenticated === false) {
  //     return <Redirect to="/" />;

  //   }
  // }, []);
  // if (auth.authenticated === false) {
  //   return <Redirect to="/" />;
  // }
  if (auth.authenticated === false) {
    return <Redirect to="/" />;
  }
  let imgPath;
  let roleName;
  switch (auth.currentUser.role) {
    case "Council":
      roleName = "Mediasiya Şurası";
      break;
    case "Citizen":
      roleName = `${
        auth.currentUser.person && auth.currentUser.person.firstName
      }  ${auth.currentUser.person && auth.currentUser.person.lastName}`;
      imgPath = `data:image/png;base64,${auth.currentUser.person.image}`;

      break;

    case "Mediatr":
      roleName = `${
        auth.currentUser.mediatr && auth.currentUser.mediatr.firstName
      }  ${auth.currentUser.mediatr && auth.currentUser.mediatr.lastName}`;
      imgPath = `http://muraciet.mediasiya.gov.az:8080/${
        auth.currentUser.mediatr.imagePath
      }`
      break;
    case "Office":
      roleName = `${
        auth.currentUser.office && auth.currentUser.office.officeName
      }`;
      break;
    default:
      break;
  }

  return (
    <div className="header-container fixed-top">
      <header className="header navbar navbar-expand-sm">
        <ul className="navbar-item theme-brand flex-row  text-center">
          <li className="nav-item theme-logo">
            <a href="index.html">
              <img
                src="/assets/img/logo.png"
                className="navbar-logo"
                alt="logo"
              />
            </a>
          </li>
          <li className="nav-item theme-text">
            <a href="index.html" className="nav-link">
              {" "}
              {/* Mediasiya şurası{" "} */}
              Mediasiya Şurası
            </a>
          </li>
        </ul>
        {/* <ul className="navbar-item flex-row ml-md-0 ml-auto">
          <li className="nav-item align-self-center search-animated">
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
              className="feather feather-search toggle-search"
            >
              <circle cx={11} cy={11} r={8} />
              <line x1={21} y1={21} x2="16.65" y2="16.65" />
            </svg>
            <form
              className="form-inline search-full form-inline search"
              role="search"
            >
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control search-form-control  ml-lg-auto"
                  placeholder="Axtar"
                />
              </div>
            </form>
          </li>
        </ul> */}
        <ul className="navbar-item flex-row ml-md-auto">
          <li className="nav-item">
            <p className="text-white pt-1 mt-2">{roleName}</p>
          </li>
          <li className="nav-item dropdown user-profile-dropdown">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle user"
              id="userProfileDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                style={{
                  background:!imgPath && 'white',
                  border:imgPath &&  "1px solid white",
                  boxShadow: "rgb(243 237 237) 0px 1px 6px",
                }}
                src={imgPath ? imgPath : "/assets/img/logo.png"}
                alt="avatar"
              />
            </a>
            <div
              className="dropdown-menu position-absolute"
              aria-labelledby="userProfileDropdown"
            >
              <div>
                <div className="dropdown-item">
                  <a href="/apply" style={{ padding: "9px 6px" }}>
                    {auth.currentUser.role === "Citizen" ? (
                      <div
                        className="rounded-circle"
                        style={{
                          backgroundColor: "#ebedf2",

                          float: "left",
                          // padding: "2px",
                          marginRight: "5px",
                          marginTop: "-7px",
                          width: "35px",
                          height: "35px",
                          overflow: "hidden",
                          boxShadow: "0px 1px 2px #000",
                        }}
                      >
                        <img
                          style={{ margin: "0px 3px" }}
                          width="30px"
                          className="img-fluid text-center"
                          src={`data:image/png;base64, ${
                            auth.currentUser.person &&
                            auth.currentUser.person.image
                          }`}
                          alt="Red dot"
                        />
                      </div>
                    ) : (
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
                    )}
                    {roleName}
                  </a>
                </div>
                {/* <div className="dropdown-item">
                  <a href="apps_mailbox.html">
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
                      className="feather feather-inbox"
                    >
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    </svg>{" "}
                    Inbox
                  </a>
                </div>
                <div className="dropdown-item">
                  <a href="auth_lockscreen.html">
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
                      className="feather feather-lock"
                    >
                      <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>{" "}
                    Lock Screen
                  </a>
                </div>
                */}
                <div className="dropdown-item">
                  <Link
                    to="#"
                    onClick={() => dispatch(signOutUser())}
                    style={{ padding: "9px 6px" }}
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
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1={21} y1={12} x2={9} y2={12} />
                    </svg>{" "}
                    Çıxış
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
}
