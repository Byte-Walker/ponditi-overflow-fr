import React from "react";
import { createPortal } from "react-dom";
import { VscChromeClose } from "react-icons/vsc";

const Modal = ({ openModal, setOpenModal, children, title }) => {
  if (!openModal) {
    return null;
  }
  const closeModal = () => {
    setOpenModal(false);
  };

  return createPortal(
    // modal overlay
    <div className="centerXY modal transition" onClick={closeModal}>
      {/* modal body */}
      <div className="bg-white  w-[550px] h-fit rounded" onClick={(e) => e.stopPropagation()}>
        {/* modals header */}
        <header className="border-b border-gray-300 centerY justify-between p-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button
            className="w-[30px] h-[30px] rounded-full hover:bg-gray-600 bg-gray-400 centerXY text-white transitionClass"
            onClick={closeModal}
          >
            {<VscChromeClose className="text-xl" />}
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
