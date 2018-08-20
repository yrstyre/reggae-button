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

  FilterList () {
    // TODO: Get filters from a central source
    const filters = ['True Jamaican', 'Mellow', 'Political', 'World Wide'];
    const listItems = filters.map(filter =>
      <li key={filter.toString()} className={this.filterIsActive(filter)} onClick={() => this.handleOnClick(filter)} >{filter}</li>
    );
    return (
      <ul className="filter__items">{listItems}</ul>
    );
  }

  render () {
    return (
      <div className={`filter ${this.props.displayFilter ? 'filter--show' : ''}`}>
        <div className="filter__inner">
          <button className="filter__cross-button" onClick={this.props.onCloseFilterClick}>
            <SVGIcon name="svg-cross" className="icon--svg-cross" />
          </button>
          {this.FilterList()}
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
