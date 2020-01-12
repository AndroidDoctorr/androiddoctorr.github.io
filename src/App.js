import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './index.css';
import Resume from './components/Resume';
import RandomFact from './components/RandomFact';
import { colorThemes } from './utils/variables';
import { setColor, setIsNinetiesMode } from './utils/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faClock } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorMode: "blue",
    };
  }

  swapColors() {
    const colorModes = Object.keys(colorThemes);
    const currentIndex = colorModes.indexOf(this.state.colorMode);
    if (currentIndex < (colorModes.length - 1)) {
      this.setState({ colorMode: colorModes[currentIndex + 1] });
    } else {
      this.setState({ colorMode: colorModes[0] });
    }
  }

  render() {
    return (
      <div
        className={classNames("container", {
          containerNineties: this.props.isNinetiesMode,
        })}
        style={{
          fontFamily: this.props.isNinetiesMode ? "monospace" : "sans-serif",
        }}
      >
        <RandomFact />
        <Resume colorTheme={colorThemes[this.state.colorMode]} />
        <div className="styleContainer">
          <div className="styleButtonGroup">
            <button
              className="button-clear styleButton"
              onClick={() => this.swapColors()}
            >
              <span className="styleButtonIcon">
                <FontAwesomeIcon icon={faRandom} />
                <span style={{ marginLeft: "0.5rem" }}>{"Change Color Theme"}</span>
              </span>
            </button>
            <button
              className="button-clear styleButton"
              onClick={() => this.props.setIsNinetiesMode(!this.props.isNinetiesMode)}
            >
              <span className="styleButtonIcon">
                <FontAwesomeIcon icon={faClock} />
                <span style={{ marginLeft: "0.5rem" }}>{"90's Mode"}</span>
              </span>
            </button>
          </div>
        </div>
        <div className="downloadLink">
          <a
            href={require("./Andrew_Torr_Resume.pdf")}
            download
          >
            Download Resume
          </a>
        </div>
        {this.props.isNinetiesMode &&
          <div className="visitorCounter">
            <div>{"You are visitor number"}</div>
            <div className="visitorCounter-number">{"000003"}</div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    color: state.color,
    isNinetiesMode: state.isNinetiesMode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setColor: color =>
      dispatch(setColor(color)),
    setIsNinetiesMode: isNinetiesMode =>
      dispatch(setIsNinetiesMode(isNinetiesMode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
