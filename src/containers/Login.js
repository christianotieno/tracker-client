import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      errors: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { user, isLogin } = this.props;
    if (user !== prevProps.user && isLogin) {
      const { history } = this.props;
      history.push('/');
    }
  }

  handleChangeName = e => {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { name, password } = this.state;
    const { loginUser } = this.props;
    const response = await loginUser({ name, password });
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
          <div id="error" className="error">
            {errors ? this.handleErrors() : null}
          </div>
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
            <p>
              Do not have an account? Sign up
              <Link to="/signup"> here</Link>
              .
            </p>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isLogin: state.user.isLogin,
  error: state.user.errors,
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isLogin: PropTypes.bool,
  user: PropTypes.shape({}),
  loginUser: PropTypes.func,
  error: PropTypes.instanceOf(Array),

};

Login.defaultProps = {
  user: {},
  error: [],
  history: {},
  isLogin: false,
  loginUser: () => {},

};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
