export const applyFilter = (filters, playlist) => {
  if (filters) {
    const songsWithScores = playlist.map(song => {
      return {
        videoId: song.videoId,
        artist: song.artist,
        title: song.title,
        score: getMatchCount(filters.map(filter => filter.toLowerCase()), song)
      };
    })
    // TODO Shuffle within same score
      .sort((a, b) => a.score - b.score);

    const filteredPlaylist = songsWithScores.filter(song => song.score > 0);
    const filterCount = filters.length;

    if (filterCount >= 4) {
      filteredPlaylist.filter(song => song.score >= (filterCount / 2));
    }

    return filteredPlaylist;
  } else {
    return playlist;
  }
};

const getMatchCount = (filters, song) => {
  let count = 0;
  filters.forEach(filter => {
    if (song.tags.includes(filter)) {
      count++;
    }
  });
  return count;
};

export default applyFilter;
