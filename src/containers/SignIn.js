import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from '../actions/auth';

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
      <section className="sign-in">
        <div>
          <ul id="errors-div" className="errors-div">
            {errors ? this.handleErrors() : null}
          </ul>
        </div>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChangeName}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <button
            className="btn-sign-in"
            placeholder="submit"
            type="submit"
          >
            Sign In
          </button>

          <p>OR</p>

          <button
            type="button"
            className="btn-signup"
          >
            <Link
              to="/signup"
            >
              Create an account
            </Link>
          </button>

        </form>

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
  history: {},
  signInUser: () => {},
  user: {},
  isSignIn: false,
  error: [],
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignIn),
);
