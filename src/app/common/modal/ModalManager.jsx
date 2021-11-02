import React from "react";
import { useSelector } from "react-redux";
import ApplyPageModal from "../../../features/dashboard/applyPage/ApplyPageModal";
import SelectMediatorModal from "../../../features/dashboard/applyPage/SelectMediatorModal";
import AddModalForCitizen from "../../../features/dashboard/citizenPage/AddModalForCitizen";
import ViewModalForCitizen from "../../../features/dashboard/citizenPage/ViewModalForCitizen";
import ViewModalForMediator from "../../../features/dashboard/mediatorPage/ViewModalForMediator";

export default function ModalManager() {
  const modalLookup = {
    ApplyPageModal,
    SelectMediatorModal,
    AddModalForCitizen,
    ViewModalForCitizen,
    ViewModalForMediator
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
