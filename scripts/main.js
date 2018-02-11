import data from '../songs.json';

const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));
let currentSongIndex = 0;
let player;
let songs = shuffle(data.songs);
let videoIsPaused = false;

const setUrlHashId = () => {
    window.location.hash = `#${songs[currentSongIndex].videoId}`;
};

const playNext = () => {
    if (songs.length - 1 === currentSongIndex) {
        currentSongIndex = 0;
    }

    currentSongIndex++;
    setUrlHashId();
    startVideo();
    videoIsPaused = false;
};

const playPrevious = () => {
    if (currentSongIndex === 0) {
        currentSongIndex = songs.length - 1;
    }

    currentSongIndex--;
    setUrlHashId();
    startVideo();
};

const setTitle = (element) => {
    element.innerHTML = `<div><p class="artist">${songs[currentSongIndex].artist}</p>` +
    `<p class="title">${songs[currentSongIndex].title}</p></div>`;
};

const startVideo = () => {
    player.loadVideoById(songs[currentSongIndex].videoId);
};

const togglePauseVideo = () => {
    if (videoIsPaused) {
        videoIsPaused = false;
        player.playVideo();
    } else {
        videoIsPaused = true;
        player.pauseVideo();
        
    }
};

const addEvents = () => {
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const titleElement = document.getElementById('title-wrapper');

    playButton.addEventListener('click', () => {
        document.body.classList.add('playing');
        player.playVideo();

        setUrlHashId();
        setTitle(titleElement);
    });

    prevButton.addEventListener('click', () => {
        playPrevious();
        setTitle(titleElement);
    });

    nextButton.addEventListener('click', () => {
        playNext();
        setTitle(titleElement);
    });

    pauseButton.addEventListener('click', () => {
        togglePauseVideo();
    });
    
    document.addEventListener('hashchange', () => {
        console.log('hash changed');
    });

    document.addEventListener('DOMContentLoaded', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(() => {
                    console.info('service worker registered');
                }, errorInfo => {
                    console.error(`service worker registration failed: ${errorInfo}`);
                });
        }
    });
};

const onPlayerReady = (event) => {
    addEvents();
};

const onPlayerStateChange = (event) => {
    switch (event.data) {
        case -1: // ready
            break;
        case 0: // end
            playNext();
            break;
        case 1: // playing
            break;
        case 2: // paused
            break;
        case 3: // buffering
            break;
    }

    return false;
};

// Youtube API functions
window.onYouTubeIframeAPIReady = () => {
    if (window.location.hash) {
        // Takes song id from hash in url and sets currentSongIndex of song in list.
        const urlId = window.location.hash.replace('#', '');
        const songObject = songs.filter(song => song.videoId === urlId)[0];
        currentSongIndex = songs.indexOf(songObject);
    }

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId:  songs[currentSongIndex].videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            rel: 0, // does not show related videos
            showinfo: 0, // removes information like the video title and uploader
            controls: 0, //  player controls are not displayed
            autohide: 1,
            fs: 0, // removes fullscreen button
            iv_load_policy: 3, // removes video annotations
            modestbranding: 1 // does not show a YouTube logo
            // autoplay: 1 // will automatically start to play when the player loads
        }
    });
};