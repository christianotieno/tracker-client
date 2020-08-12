import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loader from 'react-loader-spinner';
import { removeErrors } from '../actions';
import { loginUser } from '../actions/auth';

const SignIn = () => {
  const initialSignInState = {
    email: '',
    password: '',
  };

  const error = useSelector(store => store.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const [signInCredentials, setSignInCredentials] = useState(initialSignInState);
  const [loginCoverClass, setLoginCoverClass] = useState('login-loading-cover');
  const [loginError, setLoginError] = useState(null);

  const { email, password } = signInCredentials;

  useEffect(() => {
    setLoginError(error.loginError);
    setLoginCoverClass('login-loading-cover');
  }, [error]);

  const handleChange = event => {
    setSignInCredentials({
      ...signInCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setLoginCoverClass('login-loading-cover open');
    setLoginError(null);
    dispatch(removeErrors());

    const user = {
      email,
      password,
    };
    loginUser(user, history)(dispatch);
    signInCredentials(initialSignInState);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <p>Already have an account? Log in</p>

      <form onSubmit={handleSubmit}>
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
        {
          loginError && <div className="error">{loginError}</div>
        }
        <input
          type="submit"
          value="Sign in"
          className="login-btn"
        />
        <div className={loginCoverClass}>
          <Loader
            type="Oval"
            color="rgb(255, 75, 4)"
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
