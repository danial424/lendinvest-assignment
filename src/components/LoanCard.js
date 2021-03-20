import React from "react";
import Card from "./common/Card";
import "./LoanCard.css";

const LoanCard = (props) => {
  const { loan, callback } = props;
  const { title, tranche, available, annualised_return } = loan;

  const onInvestClick = () => {
    callback(loan);
  };
  return (
    <Card
      style={{
        marginBottom: 20,
        width: 500,
        display: "flex",
        padding: 15,
        flex: 1,
        flexDirection: "row",
      }}
    >
      <div className="info-container">
        <h3 className="title">{title}</h3>
        <p className="details">{`Tranche: ${tranche}`}</p>
        <p className="details">{`Available Amount: ${available}`}</p>
        <p className="details">{`Annualized Return: ${annualised_return}`}</p>
      </div>
      <div className="invest-cta-container">
        <p className="invested-check">{"Invested"}</p>
        <button onClick={onInvestClick} className="invest-button">
          INVEST
        </button>
      </div>
    </Card>
  );
};

export default LoanCard;
