// import "./App.css";
import { Route } from "react-router";
import Login from "../../features/auth/Login";
import Header from "../../features/dashboard/commonPage/Header";
import Sidebar from "../../features/dashboard/commonPage/Sidebar";
import SubHeader from "../../features/dashboard/commonPage/SubHeader";
// import HomePage from "../../features/dashboard/homePage/HomePage";
import Footer from "../../features/dashboard/commonPage/Footer";
import { ToastContainer } from "react-toastify";
import ModalManager from "../common/modal/ModalManager";
import React from "react";
import ApplyPage from "../../features/dashboard/applyPage/ApplyPage";
import FormPage from "../../features/form/FormPage";
import { useSelector } from "react-redux";
import ApplyPageForCitizen from "../../features/dashboard/roles/citizen/citizenPage/ApplyPageForCitizen";
import ApplyPageForMediator from "../../features/dashboard/roles/mediator/mediatorPage/ApplyPageForMediator";
import ApplyPageForCouncil from "../../features/dashboard/roles/council/councilPage/ApplyPageForCouncil";
function App() {
  const auth = useSelector((state) => state.auth);

  // const { initialized } = useSelector((state) => state.async);
  // useScript("../../../public/assets/js/app.js")
  // useScript("../../../public/assets/js/custom.js")
  // if(!initialized) return (
  //   <div id="load_screen"> <div class="loader"> <div class="loader-content">
  //       <div class="spinner-grow align-self-center"></div>
  //   </div></div></div>
  //  )

  let role;
  switch (auth.currentUser && auth.currentUser.role) {
    case "Citizen":
      role = ApplyPageForCitizen;
      break;
    case "Mediatr":
      role = ApplyPageForMediator;

      break;
    case "Council":
      role = ApplyPageForCouncil;
    default:
      break;
  }
  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" />
      <ModalManager />

      <Route exact path="/" component={Login} />
      <Route exact path="/form" component={FormPage} />

      <Route
        path={"/dashboard/(.+)"}
        render={() => (
          <React.Fragment>
            <Header />
            <SubHeader />
            {/* BEGIN MAIN CONTAINER */}
            <div className="main-container" id="container">
              <div className="overlay"></div>
              <div className="search-overlay"></div>
              {/* BEGIN SIDEBAR */}
              <Sidebar />
              {/* END SIDEBAR */}

              {/* BEGIN PAGE CONTENT */}
              <div id="content" className="main-content">
                <Route exact path="/dashboard/apply" component={role} />
                <Footer />
              </div>

              {/* END PAGE CONTENT */}
            </div>
            {/* END MAIN CONTAINER */}
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
}

export default App;
