import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
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

  const submitTask = () => {
    let dueDate = formatDate(startDate);
    let taskObj = {
      taskName: taskName,
      years: dueDate.years,
      month: dueDate.month,
      day: dueDate.day,
      hours: dueDate.hours,
      minutes: dueDate.minutes,
    };
    let openRequest = indexedDB.open('taskApp', 8);

    openRequest.onsuccess = function () {
      let db = openRequest.result;
      let transaction = db.transaction('toDoList', 'readwrite');
      let taskData = transaction.objectStore('toDoList');
      let request = taskData.add(taskObj);

      request.onsuccess = function () {
        alert('task created successfully');
        setTaskName('');
        console.log('task added to the store', request.result);
      };
    };
  };

  //   let d1 = formatDate(startDate);
  //   let d2 = formatDate(new Date());

  //   if (
  //     d1.year == d2.year &&
  //     d1.month == d2.month &&
  //     d1.day == d2.day &&
  //     d1.hour == d2.hour &&
  //     d1.minute == d2.minute
  //   )
  //     alert('same');
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
                    onChange={(e) => setTaskName(e.target.value)}
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
