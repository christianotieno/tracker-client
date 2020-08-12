import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import TaskHeader from './TaskHeader';
import '../styles/home.css';

const Home = () => (
  <div className="home-div">
    <ScheduleHeader />
    <TaskHeader />
    <div className="main-content">
      <ul className="main-content">
        <li>
          <div className="content">
            first content
          </div>
        </li>
        <li>
          <div className="content">
            second content
          </div>
        </li>
        <li>
          <div className="content">
            third content
          </div>
        </li>
        <li>
          <div className="content">
            fourth content
          </div>
        </li>
        <li>
          <div className="content">
            fifth content
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default Home;
