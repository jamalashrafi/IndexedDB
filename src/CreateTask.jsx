import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Form,
} from 'reactstrap';
import { formatDate } from './util';

const CreateTask = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const submitTask = () => {
    let dueDate = formatDate(startDate);
    let taskObj = {
      taskName: taskName,
      taskDescription : taskDescription,
      years: dueDate.years,
      month: dueDate.month,
      day: dueDate.day,
      hours: dueDate.hours,
      minutes: dueDate.minutes,
    };
    let openRequest = indexedDB.open('taskApp', 9);

    openRequest.onsuccess = function () {
      let db = openRequest.result;
      let transaction = db.transaction('toDoList', 'readwrite');
      let taskData = transaction.objectStore('toDoList');
      let request = taskData.add(taskObj);

      request.onsuccess = function () {
        alert('task created successfully');
        setTaskName('');
        setTaskDescription('');
        setStartDate(new Date());
        console.log('task added to the store', request.result);
      };
    };
  };


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Timer App</CardTitle>
          <Row>
            <Col lg={6}>
              <Form>
                <FormGroup>
                  <Input
                    type="text"
                    value={taskName}
                    className="taskName"
                    placeholder="Task Name"
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                   <Input
                    type="text"
                    value={taskDescription}
                    className="taskName"
                    placeholder="Description"
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="datePicker"
              />
            </Col>

            <Button onClick={submitTask}>Create Task</Button>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateTask;
