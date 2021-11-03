import React from "react";
import { useSelector } from "react-redux";
import ApplyPageModal from "../../../features/dashboard/applyPage/ApplyPageModal";
import SelectMediatorModal from "../../../features/dashboard/applyPage/SelectMediatorModal";
import AddModalForCitizen from "../../../features/dashboard/roles/citizen/citizenPage/AddModalForCitizen";
import ViewModalForCitizen from "../../../features/dashboard/roles/citizen/citizenPage/ViewModalForCitizen";
import ViewModalForCouncil from "../../../features/dashboard/roles/council/councilPage/ViewModalForCouncil";
import ViewMediatorModalForCouncil from "../../../features/dashboard/roles/council/mediatorsPage/ViewMediatorModalForCouncil";
import ViewModalForMediator from "../../../features/dashboard/roles/mediator/mediatorPage/ViewModalForMediator";

export default function ModalManager() {
  const modalLookup = {
    ApplyPageModal,
    SelectMediatorModal,
    AddModalForCitizen,
    ViewModalForCitizen,
    ViewModalForMediator,
    ViewModalForCouncil,
    ViewMediatorModalForCouncil
  };
  
  
  
  const currenModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currenModal) {
    const { modalType, modalProps } = currenModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
