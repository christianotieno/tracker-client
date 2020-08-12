import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Home from './Home';
import ScheduleHeader from './ScheduleHeader';
import TaskHeader from './TaskHeader';

function App() {
  return (
    <div>
      <Router>
        <ScheduleHeader />
        <TaskHeader />
        <SignUp />
        <SignIn />
        <Home />
      </Router>
    </div>
  );
}

export default App;
