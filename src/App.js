import React, { useState } from "react";
import "./App.css";
import InvestModal from "./components/InvestModal";
import LoanCard from "./components/LoanCard";
import CurrentLoansData from "./dataService/current-loans.json";

function App() {
  const { loans } = CurrentLoansData;
  const [loansData, updateLoansData] = useState(
    loans.map((l) => {
      return { ...l, available: l.available.replace(/,/g, ""), invested: 0 };
    })
  );
  const [selectedLoanToInvest, selectLoanToInvest] = useState({});

  const onInvest = (loan) => {
    selectLoanToInvest(loan);
  };
  const onInvestModalClose = () => {
    selectLoanToInvest({});
  };
  const handleOnInvest = (loanToInvestIn, amount) => {
    let updatedData = [...loansData];
    updateLoansData(
      updatedData.map((d) => {
        if (d.id == loanToInvestIn.id) {
          return {
            ...d,
            available: parseInt(d.available) - parseInt(amount),
            invested: parseInt(d.invested) + parseInt(amount),
          };
        }
        return d;
      })
    );
    selectLoanToInvest({});
  };
  const getTotalAvailableAmount = () => {
    return loansData.reduce((a, b) => {
      return parseInt(a) + parseInt(b.available);
    }, 0);
  };
  return (
    <div className="app">
      <div className="grey-box">
        <h1 className="heading">Current Loans</h1>
        {loansData.map((loan) => {
          return <LoanCard loan={loan} callback={onInvest} />;
        })}
        <div className="total-available-container">
          <p className="total-available-label">{`Total amount available for investments:`}</p>
          <p className="total-available-value">{`£${getTotalAvailableAmount()}`}</p>
        </div>
      </div>
      <InvestModal
        onInvestCallback={handleOnInvest}
        loan={selectedLoanToInvest}
        show={!!selectedLoanToInvest?.id}
        onClose={onInvestModalClose}
      />
    </div>
  );
}

export default App;
