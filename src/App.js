import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import CreateTask from './CreateTask';
import ModifyTasks from './ModifyTasks';
import { loadDBSettings } from './util';

function App() {
  loadDBSettings();

  return (
    <div className="App">
      <Header />
      <Router>
        <div className="bodyContainer">
          <SideBar />
          <div className="appComponents">
            <Route path="/createTask" component={CreateTask} />
            <Route path="/modifyTasks" component={ModifyTasks} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
