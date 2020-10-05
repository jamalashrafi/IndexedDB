import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import CreateTask from './CreateTask';
import ModifyTasks from './ModifyTasks';
import { loadDBSettings } from './util';
import UpdateTasks from './UpdateTasks';

function App() {
  loadDBSettings();

  return (
    <div className="App">
      <Header />
      <Router>
        <div className="bodyContainer">
          <SideBar />
          <div className="appComponents">
            <Route path="/" exact component={CreateTask} />
            <Route path="/createTask" component={CreateTask} />
            <Route path="/modifyTasks" component={ModifyTasks} />
            <Route path="/updateTasks" component={UpdateTasks} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
