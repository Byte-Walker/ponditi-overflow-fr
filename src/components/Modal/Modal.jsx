import React from "react";
import { createPortal } from "react-dom";
import { VscClose } from "react-icons/vsc";

const Modal = ({ openModal, setOpenModal, children, title }) => {
  if (!openModal) {
    return null;
  }
  const closeModal = () => {
    setOpenModal(false);
  };

  return createPortal(
    // modal overlay
    <div className="centerXY modal" onClick={closeModal}>
      {/* modal body */}
      <div className="bg-white min-w-[550px] h-fit rounded" onClick={(e) => e.stopPropagation()}>
        {/* modals header */}
        <header className="border-b border-gray-300 centerY justify-between p-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button
            className="w-[30px] h-[30px] rounded-full bg-gray-400 centerXY text-white"
            onClick={closeModal}
          >
            {<VscClose />}
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
