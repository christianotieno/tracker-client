import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Schedule from '../containers/Schedule';
import Tasks from '../containers/Tasks';
import Footer from './Footer';
import { loginStatus } from '../actions/user';
import Header from './Header';
import '../styles/user.css';
import '../styles/index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addForm: false,
    };
  }

  componentDidMount() {
    const { loginStatus } = this.props;
    loginStatus();
  }

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  render() {
    const { isLogin } = this.props;
    const { addForm } = this.state;

    return (
      <Router>
        <div className="App">
          <Header />
          <Footer
            displayForm={this.displayForm}
            addForm={addForm}
          />

          <Switch>
            <Route
              exact
              path="/login"
              render={() => (
                <Login />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <SignUp />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                isLogin ? (
                  <Schedule />
                )
                  : (
                    <div className="sign-in-access">
                      <p>
                        {' '}
                        Welcome to the Schedule Tracker App! Before we proceed,
                        {' '}
                        <br />
                        you are first required to log in to access these awesome tracking features.
                        <br />
                        When you are ready, click the top right menu or the sign in links below
                      </p>
                    </div>
                  )
              )}

            />
            <Route
              path="/schedule/:id"
              render={({ match }) => (
                isLogin ? (
                  <div
                    className="route-tasks"
                  >
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
  loginStatus: PropTypes.func,
  isLogin: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
  }),
};

App.defaultProps = {
  isLogin: false,
  loginStatus: () => {},
  user: {},
};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  schedule: state.schedule,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginStatus: () => dispatch(loginStatus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
