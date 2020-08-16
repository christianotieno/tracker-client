import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from '../actions/user';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      errors: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { user, isSignIn } = this.props;
    if (user !== prevProps.user && isSignIn) {
      const { history } = this.props;
      history.push('/');
    }
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit= async e => {
    e.preventDefault();
    const { name, password } = this.state;
    const { signInUser } = this.props;
    const response = await signInUser({ name, password });
    const { error } = this.props;

    if (response.data.status === 401) {
      console.log(response.data);
      this.setState({
        errors: error,
      });
    }
  }

  handleErrors = () => {
    const { errors } = this.state;
    setTimeout(() => this.setState(
      { errors: '' },
    ), 3000);
    if (errors.length > 0) {
      return (
        <div>
          <ul>
            {errors.map(
              error => (
                <li
                  key={error}
                >
                  {error}
                </li>
              ),
            )}
          </ul>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      name,
      errors,
      password,
    } = this.state;

    return (
      <section className="signin-page">
        <div className="signin-page-cover">
          <ul id="errors-div" className="errors-div">
            {errors ? this.handleErrors() : null}
          </ul>
        </div>
        <div className="signin-page-main">
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              className="signin-input"
              placeholder="name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChangeName}
            />
            <input
              className="signin-input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChangePassword}
            />
            <button
              className="signin-btn"
              type="submit"
            >
              Sign In
            </button>

            <p>Do not have an account?</p>

            <button
              type="button"
              className="signup-btn"
            >
              <Link
                to="/signup"
              >
                Create an account
              </Link>
            </button>

          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isSignIn: state.user.isSignIn,
  error: state.user.errors,
});

const mapDispatchToProps = dispatch => ({
  signInUser: data => dispatch(signInUser(data)),
});

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isSignIn: PropTypes.bool,
  user: PropTypes.shape({}),
  signInUser: PropTypes.func,
  error: PropTypes.instanceOf(Array),

};

SignIn.defaultProps = {
  user: {},
  error: [],
  history: {},
  isSignIn: false,
  signInUser: () => {},

};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignIn),
);
