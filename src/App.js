import React, { useState } from "react";
import "./App.css";
import Modal from "./components/common/Modal";
import InvestModal from "./components/InvestModal";
import LoanCard from "./components/LoanCard";
import CurrentLoansData from "./dataService/current-loans.json";

function App() {
  const { loans } = CurrentLoansData;
  const [loansData, updateLoansData] = useState(loans);
  const [selectedLoanToInvest, selectLoanToInvest] = useState({});

  const onInvest = (loan) => {
    selectLoanToInvest(loan);
  };
  const onInvestModalClose = () => {
    selectLoanToInvest({});
  };
  return (
    <div className="app">
      <div className="grey-box">
        <h1 className="heading">Current Loans</h1>
        {loansData.map((loan) => {
          return <LoanCard loan={loan} callback={onInvest} />;
        })}
      </div>
      <InvestModal
        loan={selectedLoanToInvest}
        show={!!selectedLoanToInvest?.id}
        onClose={onInvestModalClose}
      />
    </div>
  );
}

export default App;
