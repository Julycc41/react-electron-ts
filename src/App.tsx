import React from 'react';
import './App.css';
import GetImage from './component/GetImage';
import WindowBar from './component/WindowBar';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {
          process.env.REACT_APP_MSG
        }
        {
          process.env.REACT_APP_MSGS
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
       <WindowBar leftContent="无人机智能巡检系统" />
      {/* <RealTimeControl></RealTimeControl> */}
      <GetImage />
    </div>
  );
}

export default App;
