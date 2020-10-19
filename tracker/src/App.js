import React from 'react';
import User from "./components/User";
import Exercise from "./components/Exercise";
import UserLog from "./components/UserLog";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Tracker</h1>
      </header>
      <div id="form-container">
        <User />
        <Exercise />
        <UserLog />
      </div>
    </div>
  );
}

export default App;
