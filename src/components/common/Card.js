import React from "react";
import "./Card.css";

const Card = (props) => {
  const { children, style = {} } = props;
  return (
    <div className="card" style={{ ...style }}>
      {children}
    </div>
  );
};

export default Card;
