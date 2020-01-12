import React from 'react';

export default function Experience(props) {
  return (
    <div className="experience">
      <div className="experience-dates">
        <span>{props.dates}</span>
      </div>
      <div className="experience-details">
        <div className="experience-titleRow">
          <div className="experience-title">
            {props.title}
          </div>
          <button
            className="experience-projectLink button-clear"
            onClick={() => props.showProjectModal(props.id)}
          >
            {"[Projects]"}
          </button>
        </div>
        <div className="experience-location">
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.company}
          </a>
          {" - " + props.location}
        </div>
        <ul className="experience-points">
          {props.points.map(point =>
            <li className="experience-point" key={point.substring(0,16)}>
              {point}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
