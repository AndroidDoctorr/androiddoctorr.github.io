import React from 'react';
import classNames from 'classnames';

function getProficiencyName(proficiency) {
  switch (proficiency) {
    case 1:
      return "Novice";
    case 2:
      return "Some";
    case 3:
    case 4:
      return "Moderate";
    case 5:
      return "Strong";
    default:
      return "None";
  }
}

function getProficiencyClass(proficiency) {
  return "language-proficiencyBar--" + getProficiencyName(proficiency).toLowerCase();
}

function getWidth(proficiency) {
  return (proficiency * 20) + "%";
}

export default function Language(props) {
  return (
    <div className="language">
      <div className="language-name">
        {props.name}
      </div>
      <div className="language-proficiencyContainer" style={{ width: getWidth(props.proficiency) }}>
        <div className={classNames("language-proficiencyBar", getProficiencyClass(props.proficiency))} />
        <div className="language-proficiency">
          {getProficiencyName(props.proficiency)}
        </div>
      </div>
    </div>
  );
}
