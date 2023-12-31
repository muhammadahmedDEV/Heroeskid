import React from "react";
// STYLES
import './styles.scss'
const Error = ({ touched, message }) => {
  if (!touched) {
    return <div className="form-message invalid">&nbsp;</div>;
  }
  if (message) {
    return <div className="form-message invalid">{message}</div>;
  }
  return <div className="form-message valid">&nbsp;</div>;
};

export default Error;
