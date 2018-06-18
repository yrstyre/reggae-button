import React from 'react';
import PropTypes from 'prop-types';
import SVGIcon from './SVGIcon.jsx';

const Filter = props => {
  return (
    <div className={`filter ${props.displayFilter ? 'filter--show' : ''}`}>
      <div className="filter__inner">
        <button className="filter__cross-button" onClick={props.onCloseFilterClick}>
          <SVGIcon name="svg-cross" className="icon--svg-cross" />
        </button>
        <ul className="filter__items">
          <li className="filter__item">True Jamaican</li>
          <li className="filter__item">Mellow</li>
          <li className="filter__item">Political</li>
          <li className="filter__item">World wide</li>
        </ul>
      </div>
    </div>
  );
};

Filter.propTypes = {
  displayFilter: PropTypes.bool.isRequired,
  onCloseFilterClick: PropTypes.func.isRequired
};

export default Filter;
