import React from 'react';

export default function Education(props) {
  return (
    <div className="education">
      <div className="education-title">
        {props.title}
      </div>
      <div className="education-location">
        {props.location}
      </div>
      <ul className="education-points">
        {props.points.map(point =>
          <li className="education-point">
            {point}
          </li>
        )}
      </ul>
    </div>
  );
}
