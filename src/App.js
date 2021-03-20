import React, { useState } from "react";
import "./App.css";
import LoanCard from "./components/LoanCard";
import CurrentLoansData from "./dataService/current-loans.json";

function App() {
  const { loans } = CurrentLoansData;
  const [loansData, updateLoansData] = useState(loans);
  return (
    <div className="app">
      <div className="grey-box">
        <h1 className="heading">Current Loans</h1>
        {loansData.map((loan) => {
          return <LoanCard loan={loan} />;
        })}
      </div>
    </div>
  );
}

export default App;
