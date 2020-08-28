import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PathComponent = ({
  path, linkText, handleClick,
}) => (
  <Link to={`/${path}`} onClick={e => handleClick && handleClick(e)}>
    <div className="link-text">
      <p>{linkText}</p>
    </div>

  </Link>
);

PathComponent.propTypes = {
  path: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  handleClick: PropTypes.func,
};

PathComponent.defaultProps = {
  linkText: '',
  handleClick: () => {},

};
export default PathComponent;
