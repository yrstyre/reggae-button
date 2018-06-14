import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentSong } from './actions';

class StartPage extends React.Component {
  constructor (props) {
    super(props);

    props.setCurrentSong(props.songs[0]);
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>
        <Link to={`/${this.props.songs[0].videoId}`} className="play-button">Stir it up!</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songsState.songs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentSong: state => dispatch(setCurrentSong(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
