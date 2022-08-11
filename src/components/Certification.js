import React from "react";
import classNames from "classnames";

export default function Certification(props) {
  return (
    <a
      className="certification"
      id={props.id}
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={props.icon} className="certification-icon" />
      <div className="certification-name">{props.title}</div>
      <span className="certification-link-icon">⧉</span>
    </a>
  );
}
