import React from 'react';
import SVGIcon from './SVGIcon.jsx';
import { connect } from 'react-redux';
import { setFilters } from './actions';

export default class Filter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filters: []
    };
  }

  handleOnClick (filter) {
    if (this.state.filters.includes(filter)) {
      this.setState({
        filters: this.state.filters.filter(item => item !== filter)
      });
    } else {
      this.setState({
        filters: [...this.state.filters, filter]
      });
    }
  }

  filterIsActive (filter) {
    return this.state.filters.includes(filter) ? 'filter__item--active' : 'filter__item';
  }

  render () {
    return (
      <div className={`filter ${this.props.displayFilter ? 'filter--show' : ''}`}>
        <div className="filter__inner">
          <button className="filter__cross-button" onClick={this.props.onCloseFilterClick}>
            <SVGIcon name="svg-cross" className="icon--svg-cross" />
          </button>
          <ul className="filter__items">
            <li className={this.filterIsActive('trueJamaican')} onClick={() => this.handleOnClick('trueJamaican')} >True Jamaican</li>
            <li className={this.filterIsActive('mellow')} onClick={() => this.handleOnClick('mellow')} >Mellow</li>
            <li className={this.filterIsActive('political')} onClick={() => this.handleOnClick('political')} >Political</li>
            <li className={this.filterIsActive('worldWide')} onClick={() => this.handleOnClick('worldWide')} >World wide</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: state => dispatch(setFilters(state))
  };
};

connect(mapStateToProps, mapDispatchToProps)(Filter);
