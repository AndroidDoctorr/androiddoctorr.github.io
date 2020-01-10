import React from 'react';
// import logo from './logo.svg';
import './index.css';
import Resume from './components/Resume';

function App() {
  return (
    <div className="container">
      <Resume />
      <a className="downloadLink" href="../public/Andrew_Torr_Resume.pdf" download>Download Resume</a>
    </div>
  );
}

export default App;
