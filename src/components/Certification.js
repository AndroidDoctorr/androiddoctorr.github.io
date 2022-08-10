import React from "react";
import classNames from "classnames";

export default function Certification(props) {
  return (
    <div className="certification" id={props.id}>
      <img src={props.icon} className="certification-icon" />
      <div className="certification-name">{props.title}</div>
    </div>
  );
}
