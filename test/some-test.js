import test from 'ava';
 
test('that arrays deeply equal', t => {
    t.deepEqual([1, 2], [1, 2]);
});

// should play video from url song id
// should play video from url song id when clicking browser back button
// should play video from url song id when clicking browser forward button
// should play next video when video ends
// should set video id as hash in url when playing video
// should start over with first song in list if all songs has played and last song ends