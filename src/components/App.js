import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <SignUp />
        <SignIn />
      </Router>
    </div>
  );
}

export default App;
