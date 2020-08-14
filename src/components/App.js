import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Home from './Home';
import ScheduleForm from './ScheduleForm';
import TaskForm from './TaskForm';

function App() {
  return (
    <div>
      <Router>
        {/* <SignUp />
        <SignIn />
        <Home />
        <TaskForm /> */}
        <ScheduleForm />
      </Router>
    </div>
  );
}

export default App;
