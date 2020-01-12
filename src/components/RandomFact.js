import React from 'react';
import { getRandomFact } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

class RandomFact extends React.Component {
  constructor() {
    super();
    this.state = { randomFact: getRandomFact() };
    this.timeout = setTimeout(() => this.getNewFact(), 30000);
  }

  getNewFact() {
    this.setState({ randomFact: getRandomFact() });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.getNewFact(), 30000);
  }

  render() {
    return (
      <span className="randomFact">
        {this.state.randomFact}
        <button
          title="New Random Fact"
          onClick={() => this.getNewFact()}
          className="button-clear"
        >
          <FontAwesomeIcon icon={faRandom} />
        </button>
      </span>
    );
  }
}

export default RandomFact;
