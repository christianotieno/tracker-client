import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ScheduleHeader from './ScheduleHeader';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Schedule from '../containers/Schedule';
import Tasks from '../containers/Tasks';
import Footer from './Footer';
import { signInStatus } from '../actions/auth';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addForm: false,
    };
  }

  componentDidMount() {
    const { signInStatus } = this.props;
    signInStatus();
  }

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  render() {
    const { isSignIn } = this.props;
    const { addForm } = this.state;

    return (
      <Router>
        <div className="App">
          <ScheduleHeader />
          <Footer displayForm={this.displayForm} addForm={addForm} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                isSignIn ? (
                  <Schedule />
                ) : (
                  <SignIn />
                )
              )}
            />
            <Route
              exact
              path="/sign-in"
              render={() => (
                <SignIn />

              )}
            />
            <Route
              exact
              path="/sign-up"
              render={() => (
                <SignUp />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                isSignIn ? (
                  <Schedule />
                )
                  : (
                    <div className="sign-in-access">
                      <p>You need to Sign In to access this feature</p>
                    </div>
                  )
              )}

            />
            <Route
              path="/schedule/:id"
              render={({ match }) => (
                isSignIn ? (
                  <div className="route-tasks">
                    <Tasks
                      match={match}
                      displayForm={this.displayForm}
                      addForm={addForm}
                    />
                    <Footer
                      displayForm={this.displayForm}
                      addForm={addForm}
                      match={match}
                    />
                  </div>
                )

                  : (
                    <div className="sign-in-access">
                      <p>You need to Sign In to access here</p>
                    </div>
                  )
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  signInStatus: PropTypes.func,
  isSignIn: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number,
    password: PropTypes.string,
    name: PropTypes.string,
  }),
};

App.defaultProps = {
  isSignIn: false,
  signInStatus: () => {},
  user: {},
};

const mapStateToProps = state => ({
  isSignIn: state.user.isSignIn,
  schedule: state.schedule,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signInStatus: () => dispatch(signInStatus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
