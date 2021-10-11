import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SubHeader() {
  const location = useLocation();
  console.log(location);
  let currentLocation;
  switch (location.pathname) {
    case "/apply":
      currentLocation = "Müraciətlər";
      break;
    case "/doc":
      currentLocation = "Daxil olan sənədlər";
      break;
    case "/information":
      currentLocation = "Xəbərdarlıq və məlumatlandırma";
      break;
    case "/operation":
      currentLocation = "Əməliyyatlər";
      break;
    case "/legislation":
      currentLocation = "Qanunvericilik";
      break;

    default:
      return "Ana səhifə";
  }
  return (
    <div className="sub-header-container">
      <header className="header navbar navbar-expand-sm">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="sidebarCollapse"
          data-placement="bottom"
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
            className="feather feather-menu"
          >
            <line x1={3} y1={12} x2={21} y2={12} />
            <line x1={3} y1={6} x2={21} y2={6} />
            <line x1={3} y1={18} x2={21} y2={18} />
          </svg>
        </a>
        <ul className="navbar-nav flex-row">
          <li>
            <div className="page-header">
              <nav className="breadcrumb-one" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Ana Səhifə</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <span>{currentLocation}</span>
                  </li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
        {/* <ul className="navbar-nav flex-row ml-auto ">
          <li className="nav-item more-dropdown">
            <div className="dropdown  custom-dropdown-icon">
              <a
                className="dropdown-toggle btn"
                href="#"
                role="button"
                id="customDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Settings</span>{" "}
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
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="customDropdown"
              >
                <a
                  className="dropdown-item"
                  data-value="Settings"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Settings
                </a>
                <a
                  className="dropdown-item"
                  data-value="Mail"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Mail
                </a>
                <a
                  className="dropdown-item"
                  data-value="Print"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Print
                </a>
                <a
                  className="dropdown-item"
                  data-value="Download"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Download
                </a>
                <a
                  className="dropdown-item"
                  data-value="Share"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Share
                </a>
              </div>
            </div>
          </li>
        </ul>
       */}
      </header>
    </div>
  );
}
