import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Proptypes from 'prop-types';
import '../../styles/RightNav.css';

const RightNav = ({
  isLogin,
  rightNavOpen,
  handleLogout,
}) => {
  let menuClasses = 'side-menu';

  if (rightNavOpen) {
    menuClasses = 'side-menu open';
  }

  const location = useLocation();

  const paths = {
    home: '/',
    login: '/login',
    signup: '/signup',
  };

  const classNames = {
    home: 'menu-item',
    login: 'menu-item',
    signup: 'menu-item',
  };

  const current = Object.keys(paths).filter(x => paths[x] === location.pathname);
  classNames[current] = 'menu-item active';

  return (
    <div className={menuClasses}>
      <h3>Schedule Tracker</h3>
      {
        isLogin ? (
          <div className="side-menu-user">
            <div className="side-menu-user-top">
              <Link className={classNames.home} to={paths.home}>Home</Link>
            </div>
            <div className="side-menu-user-bottom">
              <button type="button" className="side-menu-logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : null
}
      {!isLogin && (
      <div className="side-menu-non-user">
        <Link className={classNames.home} to={paths.home}>Home</Link>
        <Link className={classNames.login} to={paths.login}>Log in</Link>
        <Link className={classNames.signup} to={paths.signup}>Sign up</Link>
      </div>
      )}
    </div>
  );
};

RightNav.propTypes = {
  rightNavOpen: Proptypes.bool.isRequired,
  isLogin: Proptypes.bool,
  handleLogout: Proptypes.func.isRequired,
};

RightNav.defaultProps = {
  isLogin: false,
};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
});

export default connect(mapStateToProps)(RightNav);
