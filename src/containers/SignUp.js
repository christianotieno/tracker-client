import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { removeErrors } from '../actions/index';
import { signUpUser } from '../actions/auth';

import '../styles/sign_in.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const SignUp = () => {
  const initialSignUpState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const error = useSelector(
    store => store.error,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [
    signUpCredentials,
    setSignUpCredentials,
  ] = useState(initialSignUpState);

  const [
    signupCoverClass,
    setSignupCoverClass,
  ] = useState('signin-loading-cover');

  const [
    signupError,
    setSignupError,
  ] = useState(null);

  const {
    name,
    email,
    password,
    confirmPassword,
  } = signUpCredentials;

  const errorCheck = Object.keys(error).length;

  useEffect(() => {
    dispatch(removeErrors());
  }, [errorCheck, dispatch]);

  useEffect(() => {
    setSignupError(error.signupError);
    setSignupCoverClass('signin-loading-cover');
  }, [error]);

  const handleChange = event => {
    setSignUpCredentials({
      ...signUpCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSignupCoverClass('signin-loading-cover open');
    setSignupError(null);
    dispatch(removeErrors());

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    signUpUser(user, history)(dispatch);
    setSignUpCredentials(initialSignUpState);
  };

  return (
    <div className="signin-page">
      <div className="signin-page-cover">
        <div className="signin-page-main">
          <h1>Sign up</h1>
          <p>Sign up to set and track your daily schedules</p>
          <form onSubmit={handleSubmit}>
            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="Name:"
              value={name}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="Email:"
              value={email}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="Password:"
              value={password}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password:"
              value={confirmPassword}
              onChange={handleChange}
              required
            />

            { signupError && <div className="error">{signupError}</div>}
            <input
              type="submit"
              value="Register Account"
              className="signup-btn"
            />
            <div className={signupCoverClass}>
              <Loader
                type="Oval"
                color="rgb(0,0,0)"
              />
            </div>
          </form>
          <Link className="auth-redirect" to="signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
