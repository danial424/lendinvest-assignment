import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const { show, children, onClose, testId } = props;
  const [visible, setVisibleState] = useState(show);

  useEffect(() => {
    setVisibleState(show);
    if (!show) {
      onClose();
    }
  }, [show]);

  const toggleModalState = () => {
    onClose();
  };

  return (
    <div
      onClick={toggleModalState}
      id="myModal"
      data-testid={testId}
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
        <span
          data-testid="modal-cross-icon"
          onClick={toggleModalState}
          className="close"
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
