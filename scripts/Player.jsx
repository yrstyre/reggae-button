import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentSong } from './actions';

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
      <div className="playing">
        {/* TODO: move svg to separate file */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <symbol id="skip-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 42 42" xml:space="preserve">
                  <path d="M35.965,0.114c-0.329-0.171-0.726-0.148-1.033,0.063L7.5,19.095V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v40c0,0.553,0.448,1,1,1
                  s1-0.447,1-1V22.905l27.432,18.919C35.103,41.94,35.301,42,35.5,42c0.159,0,0.319-0.038,0.465-0.114
                  C36.294,41.713,36.5,41.372,36.5,41V1C36.5,0.628,36.294,0.287,35.965,0.114z"/>
          </symbol>
          <symbol id="svg-pause" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 535.578 535.578" xml:space="preserve">
              <g>
                  <path d="M231.6,516.278c0,10.658-8.641,19.3-19.3,19.3H106.15c-10.659,0-19.3-8.641-19.3-19.3V19.3
                      c0-10.659,8.641-19.3,19.3-19.3h106.15c10.659,0,19.3,8.641,19.3,19.3V516.278z"/>
                  <path d="M448.728,516.278c0,10.658-8.641,19.3-19.3,19.3h-106.15c-10.659,0-19.3-8.641-19.3-19.3V19.3
                      c0-10.659,8.641-19.3,19.3-19.3h106.15c10.659,0,19.3,8.641,19.3,19.3V516.278z"/>
              </g>
          </symbol>
        </svg> */}

        <div className="player-background">
          <div className="player-foreground">
            <div id="player"></div>
          </div>
        </div>
        <div className="player-top-content">
          <div className="controls">
            <button className="prev-button" onClick={this.handlePreviousButton}>
              <svg className="skip-arrow left"><use xlinkHref="#skip-arrow" /></svg>
            </button>
            <button className="next-button" onClick={this.handleNextButton}>
              <svg className="skip-arrow right"><use xlinkHref="#skip-arrow" /></svg>
            </button>
            <button className="pause-button" onClick={this.handlePauseButton}>
              <svg className="svg-pause"><use xlinkHref="#svg-pause" /></svg>
            </button>
            <button className="filter-button" onClick={this.handleFilterButton}>
              Filter button
            </button>
            <div className="title-wrapper">
              <p className="artist">{this.props.currentSong.artist}</p>
              <p className="title">{this.props.currentSong.title}</p>
            </div>
          </div>
          <div className={`filter ${this.state.filterOpen ? 'show' : ''}`}>
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
