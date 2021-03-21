import React, { useState } from "react";
import Modal from "../common/Modal";
import "./InvestModal.css";
import "../LoanCard/LoanCard.css";

const InvestModal = (props) => {
  const { loan, show, onClose, onInvestCallback } = props;
  const { title, available, annualised_return } = loan;
  const [amount, updateAmount] = useState("");

  const onInvestmentAmountChange = (e) => {
    let val = e.target.value;
    val = val.replace(/\D/g, "");
    if (parseInt(val) > parseInt(available)) {
      val = available;
    }
    updateAmount(val);
  };

  const onInvest = () => {
    onInvestCallback(loan, amount);
    updateAmount("");
  };
  return (
    <Modal show={show} onClose={onClose}>
      <p className="invest-modal-heading">Invest in Loan</p>
      <p className="invest-modal-title">{title}</p>
      <div className="invest-modal-info-row">
        <p className="invest-modal-info-label">{"Amount Available: "}</p>
        <p className="invest-modal-info-value">{`£${available}`}</p>
      </div>
      <div className="invest-modal-info-row">
        <p className="invest-modal-info-label">{"Annualized Return: "}</p>
        <p className="invest-modal-info-value">{`${annualised_return}`}</p>
      </div>
      <p className="invest-amount-input-label">{"Investment amount (£)"}</p>
      <div className="invest-amount-row">
        <input
          className="invest-amount-input"
          value={amount}
          onChange={onInvestmentAmountChange}
        />
        <button onClick={onInvest} className="invest-button" disabled={!amount}>
          INVEST
        </button>
      </div>
    </Modal>
  );
};

export default InvestModal;
