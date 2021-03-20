import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const { show, children, onClose = () => {} } = props;
  const [visible, setVisibleState] = useState(show);

  useEffect(() => {
    setVisibleState(show);
    if (!show) {
      onClose();
    }
  }, [show]);

  const toggleModalState = () => {
    setVisibleState(!visible);
    if (visible) {
      onClose();
    }
  };

  return (
    <div
      onClick={toggleModalState}
      id="myModal"
      className="modal"
      style={{ display: visible ? "block" : "none" }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <span onClick={toggleModalState} className="close">
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
