import React from "react";
import { connect } from "react-redux";
import { certifications } from "../utils/variables";
import Certification from "./Certification";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.initialState = {
      color: "blue",
    };
    this.state = { ...this.initialState };
  }

  render() {
    let imageSource;
    if (this.props.color === "red") {
      imageSource = require("../images/portraits/me-red.jpg");
    } else if (this.props.color === "green") {
      imageSource = require("../images/portraits/me-green.jpg");
    } else {
      imageSource = require("../images/portraits/me-blue.jpg");
    }

    return (
      <div
        className="sidebar"
        style={{ backgroundColor: this.props.colorTheme.primary }}
      >
        <div className="sidebar-section">
          <img src={imageSource} alt="me" className="sidebar-photo" />
          <h1 className="sidebar-heading">Andrew Torr</h1>
          <a
            className="sidebar-link sidebar-subHeading"
            href="mailto:andrewrtorr@gmail.com"
          >
            atorr@elevenfifty.org
          </a>
          <a
            className="sidebar-link sidebar-subHeading"
            href="https://www.linkedin.com/in/andrew-torr-a9305832/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="sidebar-link sidebar-subHeading"
            href="https://github.com/AndroidDoctorr"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <br />
        </div>
        <div className="sidebar-section">
          <h3
            className="sidebar-sectionHeader"
            style={{ backgroundColor: this.props.colorTheme.primaryDark }}
          >
            Certifications
          </h3>
          <div className="sidebar-sectionContents">
            {certifications.map((language) => (
              <Certification {...language} key={language.id} />
            ))}
          </div>
        </div>
        <div className="sidebar-section">
          <h3
            className="sidebar-sectionHeader"
            style={{ backgroundColor: this.props.colorTheme.primaryDark }}
          >
            Skills
          </h3>
          <p className="sidebar-sectionContents">
            Firebase <br />
            AWS <br />
            UI/UX <br />
            jQuery <br />
            Node/npm <br />
            SQL <br />
            Unit Testing
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isNinetiesMode: state.isNinetiesMode,
    color: state.color,
  };
};

export default connect(mapStateToProps)(Sidebar);
