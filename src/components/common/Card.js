import React from "react";
import "./Card.css";

const Card = (props) => {
  const { children, style, ...rest } = props;
  return (
    <div className="card" style={{ ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Card;
