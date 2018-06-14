import { setSongs, setCurrentSong } from './songs.actions';

export {
  setSongs,
  setCurrentSong
};

export function createSetStateAction (type) {
  return state => {
    return {
      type,
      state
    };
  };
}
