import React from 'react';
import Language from './Language';
import { languages } from '../utils/variables';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.initialState = {
      color: "red"
    };
    this.state = { ...this.initialState };
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-section">
          <img src={require("../me.jpg")} alt="me" className="sidebar-photo" />
          <h1 className="sidebar-heading">Andrew Torr</h1>
          <span className="sidebar-subHeading">
            <a
              className="sidebar-link"
              href="mailto:andrewrtorr@gmail.com"
            >
              andrewrtorr@gmail.com
            </a>
          </span>
          <span className="sidebar-subHeading">317.650.3193</span>
          <a
            className="sidebar-link sidebar-subHeading"
            href="https://www.linkedin.com/in/andrew-torr-a9305832/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <br />
        </div>
        <div className="sidebar-section">
          <h3 className="sidebar-sectionHeader">
            Skills
          </h3>
          <p className="sidebar-sectionContents">
            Firebase <br/>
            AWS <br/>
            UI/UX <br/>
            jQuery <br/>
            Node/npm <br/>
            Ruby on Rails <br/>
            Testing (CI, rspec, etc)
          </p>
        </div>
        <div className="sidebar-section">
          <h3 className="sidebar-sectionHeader">
            Languages
          </h3>
          <p className="sidebar-sectionContents">
            {languages.map(language =>
              <Language {...language} />
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
