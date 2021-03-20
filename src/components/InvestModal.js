import React, { useEffect } from "react";
import Modal from "./common/Modal";

const InvestModal = (props) => {
  const { loan, show, onClose } = props;
  debugger;
  return (
    <Modal show={show} onClose={onClose}>
      <p>Invest In Loan</p>
    </Modal>
  );
};

export default InvestModal;
