import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Loader } from 'react-loader-spinner';
import { registerUser } from '../actions/auth';
import { removeErrors } from '../actions';

const SignUp = () => {
  const initialSignUpState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const error = useSelector(store => store.error);

  const [signUpCredentials, setSignUpCredentials] = useState(initialSignUpState);
  const {
    name, email, password, confirmPassword,
  } = signUpCredentials;
  const dispatch = useDispatch();
  const history = useHistory();

  const [signupCoverClass, setSignupCoverClass] = useState('login-loading-cover');
  const [signupError, setSignupError] = useState(null);

  const errorCheck = Object.keys(error).length;

  useEffect(() => {
    dispatch(removeErrors());
  }, [errorCheck, dispatch]);

  useEffect(() => {
    setSignupError(error.signupError);
    setSignupCoverClass('login-loading-cover');
  }, [error]);

  const handleChange = event => {
    setSignUpCredentials({
      ...signUpCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSignupCoverClass('login-loading-cover open');
    setSignupError(null);
    dispatch(removeErrors());

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    registerUser(user, history)(dispatch);
    setSignUpCredentials(initialSignUpState);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Sign Up to set and track your daily schedules</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Consfirm Password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        {
          signupError && <div>{signupError}</div>
        }

        <input
          type="submit"
          value="Register Account"
        />
        <div className={signupCoverClass}>
          <Loader
            type="Oval"
            color="rgb(0,0,0)"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
