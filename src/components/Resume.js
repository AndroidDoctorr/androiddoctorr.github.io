import React from 'react';
import Sidebar from './Sidebar';
import Experience from './Experience';
import Education from './Education';
import { experiences, educations } from '../utils/variables';

class Resume extends React.Component {
  constructor() {
    super();
    this.initialState = {
      color: "red"
    };
    this.state = { ...this.initialState };
  }

  render() {
    return (
      <div className="resume">
        <Sidebar />
        <div className="main">
          <div className="main-intro">
            {"Full-stack (primarily front-end) developer with 5 years professional experience."}
          </div>
          <h3 className="main-sectionHeader">
            {"Experience"}
          </h3>
          <div className="main-sectionContainer">
            {experiences.map(experience =>
              <Experience {...experience} />
            )}
          </div>
          <h3 className="main-sectionHeader">
            {"Education"}
          </h3>
          <div className="main-sectionContainer">
            {educations.map(education =>
              <Education {...education} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;
