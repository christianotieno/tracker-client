import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { removeErrors } from '../actions/index';
import { signInUser } from '../actions/auth';
import '../styles/sign_in.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const SignIn = () => {
  const initialSignInState = {
    email: '',
    password: '',
  };

  const error = useSelector(
    store => store.error,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [
    signInCredentials,
    setSignInCredentials,
  ] = useState(initialSignInState);

  const [
    signInCoverClass,
    setSignInCoverClass,
  ] = useState('login-loading-cover');

  const [
    signInError,
    setSignInError,
  ] = useState(null);

  const {
    email,
    password,
  } = signInCredentials;

  useEffect(() => {
    setSignInError(error.signInError);
    setSignInCoverClass('login-loading-cover');
  }, [error]);

  const handleChange = event => {
    setSignInCredentials({
      ...signInCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSignInCoverClass('login-loading-cover open');
    setSignInError(null);
    dispatch(removeErrors());

    const user = {
      email,
      password,
    };

    signInUser(user, history)(dispatch);
    signInCredentials(initialSignInState);
  };

  return (
    <div className="login-page">
      <div className="login-page-cover">
        <div className="login-page-main">
          <h1>Sign In</h1>
          <p>Already have an account? Log in</p>

          <form onSubmit={handleSubmit}>
            <input
              className="login-input"

              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"

              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
            {
          signInError && <div className="error">{signInError}</div>
        }
            <input
              type="submit"
              value="Sign in"
              className="login-btn"
            />
            <div className={signInCoverClass}>
              <Loader
                type="Oval"
                color="rgb(255, 75, 4)"
              />
            </div>
          </form>
          <Link className="auth-redirect" to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
