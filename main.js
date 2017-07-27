(function(YT) {
    function startPlayer() {
        if (YT.loaded) {
            var player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'S3UqvWk8-uw',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        } else {
            console.log('api not loaded yet!');
        }
    };

    function addEvents() {
        var playButton = document.getElementById('play-button');
        playButton.addEventListener('click', function() {
            startPlayer();
        });
    };

    function init() {
        addEvents();
    };

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
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
    }

    return {
        init: init()
    };
})(YT);