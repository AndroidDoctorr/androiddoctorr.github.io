import React from 'react';

export default function Experience(props) {
  return (
    <div className="experience">
      <div className="experience-dates">
        <span>{props.dates}</span>
      </div>
      <div className="experience-details">
        <div className="experience-title">
          {props.title}
        </div>
        <div className="experience-location">
          {props.location}
        </div>
        <ul className="experience-points">
          {props.points.map(point =>
            <li className="experience-point">
              {point}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
