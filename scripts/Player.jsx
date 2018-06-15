import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentSong } from './actions';
import SVGIcon from './SVGIcon.jsx';

class Player extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      videoIsPaused: false,
      filterOpen: false
    };

    this.handlePauseButton = this.handlePauseButton.bind(this);
    this.handlePreviousButton = this.handlePreviousButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleFilterButton = this.handleFilterButton.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

    this.initYoutubePlayer();
    this.setCurrentSongIdFromHash();
  }

  initYoutubePlayer () {
    // insert Youtube script tag element
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // init Youtube API player when ready
    window['onYouTubeIframeAPIReady'] = e => {
      this.player = new window['YT'].Player('player', {
        height: '100%',
        width: '100%',
        videoId: this.props.currentSong.videoId,
        events: {
          'onStateChange': this.onPlayerStateChange
        },
        playerVars: {
          rel: 0, // does not show related videos
          showinfo: 0, // removes information like the video title and uploader
          controls: 0, //  player controls are not displayed
          autohide: 1,
          fs: 0, // removes fullscreen button
          iv_load_policy: 3, // removes video annotations
          modestbranding: 1, // does not show a YouTube logo
          autoplay: 1 // will automatically start to play when the player loads
        }
      });
    };
  }

  setCurrentSongIdFromHash () {
    const songObject = this.props.songs.filter(song => song.videoId === this.props.hashId)[0];

    if (songObject) {
      this.props.setCurrentSong(songObject);
    } else { // Hash id doesn't exist in songs array
      this.props.setCurrentSong(this.props.songs[0]);
      this.props.history.push(`/${this.props.songs[0].videoId}`);
    }
  }

  startVideo (songIndex) {
    this.player.loadVideoById(this.props.songs[songIndex].videoId);
  }

  onPlayerStateChange (event) {
    switch (event.data) {
      case -1: // ready
        break;
      case 0: // end
        this.handleNextButton();
        break;
      case 1: // playing
        break;
      case 2: // paused
        break;
      case 3: // buffering
        break;
    }
    return false;
  }

  handleNextButton () {
    const currentSongIndex = this.props.songs.indexOf(this.props.currentSong);
    let nextSongIndex = currentSongIndex + 1;

    if (this.props.songs.length - 1 === currentSongIndex) {
      nextSongIndex = 0;
    }

    const nextSong = this.props.songs[nextSongIndex];
    this.props.setCurrentSong(nextSong);
    this.props.history.push(`/${nextSong.videoId}`);
    this.setState({ videoIsPaused: false });
    this.startVideo(nextSongIndex);
  }

  handlePreviousButton () {
    const currentSongIndex = this.props.songs.indexOf(this.props.currentSong);
    let previousSongIndex = currentSongIndex - 1;

    if (currentSongIndex === 0) {
      previousSongIndex = this.props.songs.length - 1;
    }

    const previousSong = this.props.songs[previousSongIndex];
    this.props.setCurrentSong(previousSong);
    this.props.history.push(`/${previousSong.videoId}`);
    this.setState({ videoIsPaused: false });
    this.startVideo(previousSongIndex);
  }

  handlePauseButton () {
    if (this.state.videoIsPaused) {
      this.setState({ videoIsPaused: false });
      this.player.playVideo();
    } else {
      this.setState({ videoIsPaused: true });
      this.player.pauseVideo();
    }
  }

  handleFilterButton () {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  render () {
    return (
      <div>
        <div className="player">
          <div className="player__inner">
            <div id="player"></div>
          </div>
        </div>
        <div className="controls">
          <div className="controls__inner">
            <button className="controls__prev-button" onClick={this.handlePreviousButton}>
              <SVGIcon name="svg-arrow" className="icon--svg-arrow" />
            </button>
            <button className="controls__next-button" onClick={this.handleNextButton}>
              <SVGIcon name="svg-arrow" className="icon--svg-arrow icon--svg-arrow-right" />
            </button>
            <button className="controls__pause-button" onClick={this.handlePauseButton}>
              <SVGIcon name="svg-pause" className="icon--svg-pause" />
            </button>
            <button className="btn btn--purple controls__filter-button" onClick={this.handleFilterButton}>
              Filter button
            </button>
            <div className="controls__title">
              <p className="controls__title--artist">{this.props.currentSong.artist}</p>
              <p className="controls__title--song-title">{this.props.currentSong.title}</p>
            </div>
          </div>
          <div className={`filter ${this.state.filterOpen ? 'filter--show' : ''}`}>
            <p>True Jamaican</p>
            <p>Mellow</p>
            <p>Political</p>
            <p>World wide</p>
          </div>
        </div>
      </div>
    );
  }
}

Player.defaultProps = {
  hashId: ''
};

Player.propTypes = {
  hashId: PropTypes.string
};

const mapStateToProps = state => {
  return {
    songs: state.songsState.songs,
    currentSong: state.songsState.currentSong
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentSong: state => dispatch(setCurrentSong(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
