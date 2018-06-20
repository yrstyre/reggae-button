import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentSong } from './actions';
import { DURATIONS } from './constants';
import Filter from './Filter.jsx';
import Controls from './Controls.jsx';

const userInteractionEvents = ['keyup', 'mousedown', 'pointerdown', 'touchstart', 'mousemove'];

class Player extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isPaused: false,
      displayFilter: false,
      isMuted: false,
      isInactive: false,
      formIsOpen: false
    };

    this.timeoutHandle = 0;

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.muteSound = this.muteSound.bind(this);
    this.handleCloseFilterButton = this.handleCloseFilterButton.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrevious = this.playPrevious.bind(this);
    this.seekForward = this.seekForward.bind(this);
    this.seekBackwards = this.seekBackwards.bind(this);
    this.restartVideo = this.restartVideo.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleFormOpen = this.toggleFormOpen.bind(this);

    this.initYoutubePlayer();
    this.setCurrentSongIdFromHash();

    userInteractionEvents.forEach(e => document.addEventListener(e, this.handleTimeout, false));
  }

  componentWillUnmount () {
    clearTimeout(this.timeoutHandle);
    userInteractionEvents.forEach(e => document.removeEventListener(e, this.handleTimeout, false));
  }

  componentDidMount () {
    this.handleTimeout();
  }

  handleTimeout () {
    clearTimeout(this.timeoutHandle);
    if (this.state.isInactive) {
      this.setState({ isInactive: false });
    }

    this.timeoutHandle = setTimeout(() => {
      this.setState({ isInactive: true });
    }, DURATIONS.CONTROLS_VISIBLE);
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

  playNext () {
    const currentSongIndex = this.props.songs.indexOf(this.props.currentSong);
    let nextSongIndex = currentSongIndex + 1;

    if (this.props.songs.length - 1 === currentSongIndex) {
      nextSongIndex = 0;
    }

    const nextSong = this.props.songs[nextSongIndex];
    this.props.setCurrentSong(nextSong);
    this.props.history.push(`/${nextSong.videoId}`);
    this.setState({ isPaused: false });
    this.startVideo(nextSongIndex);
  }

  playPrevious () {
    const currentSongIndex = this.props.songs.indexOf(this.props.currentSong);
    let previousSongIndex = currentSongIndex - 1;

    if (currentSongIndex === 0) {
      previousSongIndex = this.props.songs.length - 1;
    }

    const previousSong = this.props.songs[previousSongIndex];
    this.props.setCurrentSong(previousSong);
    this.props.history.push(`/${previousSong.videoId}`);
    this.setState({ isPaused: false });
    this.startVideo(previousSongIndex);
  }

  muteSound () {
    const isMuted = this.player.isMuted();
    isMuted ? this.player.unMute() : this.player.mute();
    this.setState({ isMuted: !isMuted });
  }

  onPlayerStateChange (event) {
    switch (event.data) {
      case -1: // ready
        break;
      case 0: // end
        this.playNext();
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

  toggleFilter () {
    this.setState({ displayFilter: !this.state.displayFilter });
  }

  handleCloseFilterButton () {
    this.setState({ displayFilter: false });
  }

  handlePause () {
    if (this.state.isPaused) {
      this.setState({ isPaused: false });
      this.player.playVideo();
    } else {
      this.setState({ isPaused: true });
      this.player.pauseVideo();
    }
  }

  requestFullScreen () {
    const element = document.body;
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
      requestMethod.call(element);
    }
  }

  restartVideo () {
    this.startVideo(this.props.songs.indexOf(this.props.currentSong));
  }

  seekForward () {
    this.player.seekTo(this.player.getCurrentTime() + 5, true);
  }

  seekBackwards () {
    this.player.seekTo(this.player.getCurrentTime() - 5, true);
  }

  toggleFormOpen () {
    this.setState({ formIsOpen: !this.state.formIsOpen });
  }

  render () {
    return (
      <div>
        <div className="player">
          <div className="player__inner">
            <div id="player"></div>
          </div>
        </div>
        <Controls
          displayFilter={this.state.displayFilter}
          formIsOpen={this.state.formIsOpen}
          onHandlePause={this.handlePause}
          isInactive={this.state.isInactive}
          isMuted={this.state.isMuted}
          muteSound={this.muteSound}
          playNext={this.playNext}
          playPrevious={this.playPrevious}
          requestFullScreen={this.requestFullScreen}
          restartVideo={this.restartVideo}
          seekBackwards={this.seekBackwards}
          seekForward={this.seekForward}
          toggleFilter={this.toggleFilter}
          toggleFormOpen={this.toggleFormOpen}
        />
        <div className={`player__title ${this.state.isInactive ? 'player__title--hide' : ''}`}>
          <h3 className="player__title--artist">{this.props.currentSong.artist}</h3>
          <h4 className="player__title--song-title">{this.props.currentSong.title}</h4>
        </div>
        <Filter
          displayFilter={this.state.displayFilter}
          onCloseFilterClick={this.handleCloseFilterButton}
        />
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
