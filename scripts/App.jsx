import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import '../style/style.scss';
import StartPage from './StartPage.jsx';
import Player from './Player.jsx';
import { setSongs, setFilters } from './actions';
import data from '../songs.json';
import applyFilter from './filter-service';

class App extends React.Component {
  constructor (props) {
    super(props);
    const playlist = this.makePlaylist(data.songs);
    props.setSongs(playlist);
  }

  shouldComponentUpdate () {
    return true;
  }

  makePlaylist (songs) {
    // TODO Fetch filters from redux state
    const filters = ['Mellow'];
    const playlist = applyFilter(filters, songs);
    return playlist;
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route
          path="/:id"
          render={({ match }) => (
            <Player hashId={match.params.id} history={this.props.history} />
          )}
        />
      </Switch>
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
    setSongs: state => dispatch(setSongs(state)),
    setFilter: state => dispatch(setFilters(state))
  };
};

connect(mapStateToProps, mapDispatchToProps)(App);

export default withRouter(connect(null, mapDispatchToProps)(App));
