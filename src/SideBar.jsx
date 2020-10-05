import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sideBarContainer">
      <Link to="/createTask" className="">
        Create Tasks
      </Link>
      <Link to="/modifyTasks" className="">
        Search | Delete Tasks
      </Link>
      <Link to="/updateTasks" className="">
        List All | Update Tasks
      </Link>
    </div>
  );
};

export default SideBar;
