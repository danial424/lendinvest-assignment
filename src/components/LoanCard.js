import React from "react";
import Card from "./common/Card";
import "./LoanCard.css";

const LoanCard = (props) => {
  const { loan } = props;
  const { title, tranche, available, annualised_return } = loan;
  return (
    <Card
      style={{
        marginBottom: 20,
        width: 600,
        display: "flex",
        padding: 10,
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
      <div className="invest-cta-container"></div>
    </Card>
  );
};

export default LoanCard;
