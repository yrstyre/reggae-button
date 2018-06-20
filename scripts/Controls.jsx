import React from 'react';
import PropTypes from 'prop-types';
import SVGIcon from './SVGIcon.jsx';

class Controls extends React.Component {
  constructor (props) {
    super(props);

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePreviousButton = this.handlePreviousButton.bind(this);
    this.handleMuteButton = this.handleMuteButton.bind(this);
    this.handleFilterButton = this.handleFilterButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener('keydown', this.handleKeyPress);
  }

  shouldComponentUpdate () {
    return true;
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleNextButton (event) {
    event.stopPropagation();
    this.props.playNext();
  }

  handlePreviousButton (event) {
    event.stopPropagation();
    this.props.playPrevious();
  }

  handleMuteButton (event) {
    event.stopPropagation();
    this.props.muteSound();
  }

  handleFilterButton (event) {
    event.stopPropagation();
    this.props.toggleFilter();
  }

  handleKeyPress (event) {
    switch (event.keyCode) {
      case 32: // Space bar - Pause video
        this.props.onHandlePause();
        break;
      case 37: // Left arrow - Seek backwards 5 seconds
        this.props.seekBackwards();
        break;
      case 39: // Right arrow - Seek forward 5 seconds
        this.props.seekForward();
        break;
      case 48: // 0 - restart video
        this.props.restartVideo();
        break;
      case 70: // F - Fullscreen mode
        this.props.requestFullScreen();
        break;
      case 77: { // M - mute sound
        this.props.muteSound();
        break;
      }
      case 78: // Shift + N - Play next song
        this.props.playNext();
        break;
      case 80: // Shift + P - Play previous song
        this.props.playPrevious();
        break;
    }
    return false;
  }

  render () {
    return (
      <div className={`controls ${this.props.isInactive ? 'controls--hide' : ''}`}>
        <div className="controls__inner" onClick={this.props.onHandlePause}>
          <button className="controls__prev-button icon icon--yellow" onClick={this.handlePreviousButton}>
            <SVGIcon name="svg-arrow" className="icon--svg-arrow" />
          </button>
          <button className="controls__next-button icon icon--yellow" onClick={this.handleNextButton}>
            <SVGIcon name="svg-arrow" className="icon--svg-arrow icon--svg-arrow-right" />
          </button>
          { this.props.displayFilter
            ? null
            : (
              <button className="btn btn--yellow controls__filter-button" onClick={this.handleFilterButton}>
                Filter button
              </button>
            )
          }
          <button className="controls__volume icon--yellow" onClick={this.handleMuteButton}>
            { this.props.isMuted
              ? <SVGIcon name="svg-volume-muted" className="icon--svg-volume-muted" />
              : <SVGIcon name="svg-volume-high" className="icon--svg-volume-high" /> }
          </button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  displayFilter: PropTypes.bool.isRequired,
  isInactive: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  muteSound: PropTypes.func.isRequired,
  onHandlePause: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  requestFullScreen: PropTypes.func.isRequired,
  restartVideo: PropTypes.func.isRequired,
  seekBackwards: PropTypes.func.isRequired,
  seekForward: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired
};

export default Controls;
