import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import TaskHeader from './TaskHeader';
import '../styles/index.css';

const Home = () => (
  <div className="home-div">
    <ScheduleHeader />
    <TaskHeader />
    <div className="main-content">
      {/* <ul className="main-content">
        <li>
          <div className="content">
            Personal Development
          </div>
        </li>
        <li>
          <div className="content">
            Work
          </div>
        </li>
        <li>
          <div className="content">
            Social Life
          </div>
        </li>
        <li>
          <div className="content">
            Meetings
          </div>
        </li>
        <li>
          <div className="content">
            Reads
          </div>
        </li>
      </ul> */}
      <p>Please click on the + button to add your schedules</p>
    </div>
  </div>
);

export default Home;
