const applyFilter = (filters, playlist) => {
    const songsWithScores = playlist.map(song => {
        return {
            videoId: song.id,
            artist: song.artist,
            title: song.title,
            score: getMatchCount(filters, song)
        };
    })
        .shuffle()
        .sort((a, b) => a.score - b.score);

    const filterCount = filters.length;

    if (filterCount >= 4) {
        songsWithScores.filter(song => song.score >= (filterCount / 2));
    }

    return songsWithScores;
}

const getMatchCount = (filters, song) => {
    let count = 0;
    filters.forEach(filter => {
        if(song.tags.indexOf(filter) > -1) {
            count++;
        }
    });
    return count;
}

const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));
