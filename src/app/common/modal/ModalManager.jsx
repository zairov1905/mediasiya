import React from "react";
import { useSelector } from "react-redux";
import ApplyPageModal from "../../../features/dashboard/applyPage/ApplyPageModal";
import SelectMediatorModal from "../../../features/dashboard/applyPage/SelectMediatorModal";

export default function ModalManager() {
  const modalLookup = {
    ApplyPageModal,
    SelectMediatorModal
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
