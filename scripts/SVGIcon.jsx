import React from 'react';
import PropTypes from 'prop-types';
import '../assets/icons.svg';

const SVGIcon = props => (
  <svg className={`icon ${props.className}`}>
    <use xlinkHref={`#icons_${props.name}`} />
  </svg>
);

SVGIcon.defaultProps = {
  className: ''
};

SVGIcon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default SVGIcon;
