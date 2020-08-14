import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Schedules from '../containers/Schedules';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Home from './Home';

function App() {
  const isAuth = useSelector(store => store.auth.isAuth);

  return (
    <div>
      <Router>
        <Switch>
          {
          isAuth ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/schedules/">
                <Schedules />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
            </>
          )
        }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
