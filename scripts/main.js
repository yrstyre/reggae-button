import data from '../songs.json';

let currentSongIndex = 0;
let player;
let songs;

const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));

const onPlayerReady = (event) => {
    event.target.playVideo();
};

const setUrlHashId = () => {
    window.location.hash = `#${songs[currentSongIndex].videoId}`;
};

const playNext = () => {
    if (songs.length -1 === currentSongIndex) {
        currentSongIndex = 0;
    }

    currentSongIndex++;
    setUrlHashId();
    startVideo();
};

const startVideo = () => {
    player.loadVideoById(songs[currentSongIndex].videoId);
};

const onPlayerStateChange = (event) => {
    switch (event.data) {
        case -1: // ready
            break;
        case 0: // end
            console.log('play next song!');
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

const startPlayer = (videoId) => {
    if (YT.loaded) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoId || songs[0].videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        console.log('api not loaded yet!');
    }
};

const addEvents = () => {
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', () => {
        setUrlHashId();
        startPlayer();
    });

    window.addEventListener('hashchange', () => {
        console.log('hash changed');
    });
};

const init = () => {
    songs = shuffle(data.songs);

    if (window.location.hash) {
        const videoId = window.location.hash.replace('#', '');
        startPlayer(videoId);
    }

    addEvents();
}

init();