import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import PathComponent from './PathComponent';
import { logOutUser } from '../actions/user';
import '../styles/footer.css';

const Footer = ({
  isLogin,
  logOut,
  history,
  displayForm,
  match,
}) => {
  const handleClick = async e => {
    e.preventDefault();
    const response = await logOut();
    if (response.data.logged_out) {
      history.push('/');
    }
  };

  const displayAddForm = () => {
    displayForm();
  };

  return (
    <nav className="menu">
      {/* <PathComponent
        path="main"
        icon="fa-bar-chart"
        linkText="Schedules"
      /> */}

      {isLogin && match.path === '/schedule/:id' ? (
        <div
          className="icons icon-btn"
        >
          <button
            type="button"
            onClick={displayAddForm}
          >
            <i
              className="fa fa-line-chart"
            />
            <p
              className="add-tasks"
            >
              Add Tasks

            </p>
          </button>
        </div>
      ) : null}

      { !isLogin
        && (
        <>
          <PathComponent
            path="login"
            linkText="Log In"
          />
          <PathComponent
            path="signup"
            linkText="Sign Up"
          />
        </>
        )}
      { isLogin && (
      <PathComponent
        path="logout"
        linkText="Log Out"
        handleClick={e => handleClick(e)}
      />
      )}
    </nav>

  );
};

Footer.propTypes = {
  isLogin: PropTypes.bool,
  logOut: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),

  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  displayForm: PropTypes.func,
};

Footer.defaultProps = {
  isLogin: false,
  logOut: () => {},
  history: {},
  match: {},
  displayForm: () => {},

};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  task: state.task,

});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Footer),
);
