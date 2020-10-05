import React, {useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
  } from 'reactstrap';
  var _ = require('lodash');

const UpdateTasks = () => {
    const [selectedTaskName, setSelectedTaskName] = useState('');
    const [updatedTaskDecription, setUpdatedTaskDecription] = useState('');
    const [storedTaskList, setStoredTaskList] = useState([]);

    useEffect(() => {
        let openRequest = indexedDB.open('taskApp', 9);
        openRequest.onsuccess = function () {
          let db = openRequest.result;
          let transaction = db.transaction('toDoList', 'readwrite');
          let taskData = transaction.objectStore('toDoList');
          let desiredList = taskData.getAll();
          desiredList.onsuccess = function () {
              console.log(desiredList);
              setStoredTaskList(desiredList.result);
          };
        };
      }, []);

    const submitHandler = (event) => {
        event.preventDefault();

        let openRequest = indexedDB.open('taskApp', 9);


        openRequest.onsuccess = function() {
            let db = openRequest.result;
            let transaction = db.transaction("toDoList", "readwrite");
            let taskData = transaction.objectStore('toDoList');
            
            
            let desiredObj = taskData.get(selectedTaskName);

            desiredObj.onsuccess = function() {
                let objToBeUpdated = desiredObj.result;
                objToBeUpdated['taskDescription'] = updatedTaskDecription;
                taskData.put(objToBeUpdated);
                alert('task updated successfully');
                setSelectedTaskName('');
                setUpdatedTaskDecription('');
            }  
        };

    }

    const handleTaskClick = (taskObj) => {
        setSelectedTaskName(taskObj.taskName);
        setUpdatedTaskDecription(taskObj.taskDescription);
    }


    return (
        <div>
            <form onSubmit={submitHandler} className="formClass">
                <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={updatedTaskDecription}
                onChange={(event) => setUpdatedTaskDecription(event.target.value)}
                />
                <br />
                <Button type="submit">Submit</Button>
            </form>
            { storedTaskList.length > 0 ?
            
             storedTaskList.map(task => (
                <Card key={task.taskName}  onClick={() => handleTaskClick(task)} className="cardStyle">
                <CardBody>
                  <CardTitle className="textStyle">
                    {_.isEmpty(task) === false ? task.taskName : ''}
                  </CardTitle>
                  <Row>
                    <Col lg={6}>
                      <p className="textStyle">
                        Date :{' '}
                        {_.isEmpty(task) === false
                          ? `${task.years}-${task.month}-${task.day}-${task.hours}-${task.minutes}`
                          : ''}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}></Col>
                  </Row>
                </CardBody>
              </Card>
             )) : ''
            }
        </div>
    )
}

export default UpdateTasks
