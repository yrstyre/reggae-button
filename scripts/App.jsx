import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import '../style/style.scss';
import StartPage from './StartPage.jsx';
import Player from './Player.jsx';
import { setSongs } from './actions';
import data from '../songs.json';

class App extends React.Component {
  constructor (props) {
    super(props);
    const shuffledSongs = this.shuffle(data.songs);
    props.setSongs(shuffledSongs);
  }

  shouldComponentUpdate () {
    return true;
  }

  shuffle (arr) {
    return arr.sort(() => (Math.random() - 0.5));
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

const mapDispatchToProps = dispatch => {
  return {
    setSongs: state => dispatch(setSongs(state))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
