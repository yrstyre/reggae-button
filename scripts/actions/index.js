import { setSongs, setCurrentSong, setFilters } from './songs.actions';

export {
  setSongs,
  setCurrentSong,
  setFilters
};

export function createSetStateAction (type) {
  return state => {
    return {
      type,
      state
    };
  };
}
