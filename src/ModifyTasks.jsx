import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
} from 'reactstrap';
var _ = require('lodash');

const ModifyTasks = () => {
  const [taskId, setTaskId] = useState('');
  const [storedTask, setStoredTask] = useState({});

  const handleChange = (event) => {
    event.preventDefault();
    let openRequest = indexedDB.open('taskApp', 9);

    openRequest.onsuccess = function () {
      let db = openRequest.result;
      let transaction = db.transaction('toDoList', 'readwrite');
      let taskData = transaction.objectStore('toDoList');

      let desiredObj = taskData.get(taskId);

      desiredObj.onsuccess = function () {
        let updatedObj = desiredObj.result;

        setStoredTask(updatedObj);
      };
    };
  };

  const deleteTask = () => {
    if (_.isEmpty(storedTask)) alert('There is no task to delete');
    else {

      let openRequest = indexedDB.open('taskApp', 8);
      openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction('toDoList', 'readwrite');
        let taskData = transaction.objectStore('toDoList');

        let deletedClient = taskData.delete(storedTask.taskName);
        deletedClient.onsuccess = function () {
          alert('taskDeleted');
          setTaskId('');
          setStoredTask({});
        };
      };
    }
  };

  return (
    <div>
      <form onSubmit={handleChange} className="formClass">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={taskId}
          onChange={(event) => setTaskId(event.target.value)}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>

      <Card  className="cardStyle">
        <CardBody>
          <CardTitle className="textStyle">
            {_.isEmpty(storedTask) === false ? storedTask.taskName : ''}
          </CardTitle>
          <Row>
            <Col lg={6}>
              <p className="textStyle">
                Date :{' '}
                {_.isEmpty(storedTask) === false
                  ? `${storedTask.years}-${storedTask.month}-${storedTask.day}-${storedTask.hours}-${storedTask.minutes}`
                  : ''}
              </p>
            </Col>
            <Button onClick={deleteTask}>Delete</Button>
          </Row>
          <Row>
            <Col lg={6}></Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default ModifyTasks;
