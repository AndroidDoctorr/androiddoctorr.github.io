import React from 'react';
import './index.css';
import Resume from './components/Resume';
import RandomFact from './components/RandomFact';

function App() {
  return (
    <div className="container">
      <RandomFact />
      <Resume />
      <a className="downloadLink" href="../public/Andrew_Torr_Resume.pdf" download>Download Resume</a>
    </div>
  );
}

export default App;
