import React from 'react';
import { connect } from 'react-redux';
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
    let imageSource;
    if (this.props.color === "red") {
      imageSource = require("../me-red.jpg");
    } else if (this.props.color === "green") {
      imageSource = require("../me-green.jpg");
    } else {
      imageSource = require("../me-blue.jpg");
    }

    return (
      <div className="sidebar" style={{ backgroundColor: this.props.colorTheme.primary }}>
        <div className="sidebar-section">
          <img src={imageSource} alt="me" className="sidebar-photo" />
          <h1 className="sidebar-heading">Andrew Torr</h1>
          <span className="sidebar-subHeading">
            <a
              className="sidebar-link"
              href="mailto:andrewrtorr@gmail.com"
            >
              atorr@elevenfifty.org
            </a>
          </span>
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
          <h3 className="sidebar-sectionHeader" style={{ backgroundColor: this.props.colorTheme.primaryDark }}>
            Skills
          </h3>
          <p className="sidebar-sectionContents">
            Firebase <br/>
            AWS <br/>
            UI/UX <br/>
            jQuery <br/>
            Node/npm <br/>
            Ruby on Rails <br/>
            ASP.NET <br/>
            Testing (CI, rspec, etc)
          </p>
        </div>
        <div className="sidebar-section">
          <h3 className="sidebar-sectionHeader" style={{ backgroundColor: this.props.colorTheme.primaryDark }}>
            Languages
          </h3>
          <div className="sidebar-sectionContents">
            {languages.map(language =>
              <Language {...language} key={language.id} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isNinetiesMode: state.isNinetiesMode,
    color: state.color,
  }
}

export default connect(mapStateToProps)(Sidebar)
