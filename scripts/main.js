import data from '../songs.json';

const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));

const onPlayerReady = (event) => {
    event.target.playVideo();
};

const onPlayerStateChange = (event) => {
    switch (event.data) {
        case -1: // ready
            break;
        case 0: // end
            console.log('play next song!');
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

const startPlayer = () => {
    if (YT.loaded) {
        var player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: shuffle(data.songs)[0].videoId,
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
        startPlayer();
    });
};

addEvents();