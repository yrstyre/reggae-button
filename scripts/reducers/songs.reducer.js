import { SET_SONGS, SET_CURRENT_SONG, SET_FILTERS } from '../actions/action-types';
import { songModel } from '../models/song-model';

export const initialState = {
  songs: [],
  currentSong: songModel()
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONGS:
      return { ...state, songs: action.state };
    case SET_CURRENT_SONG:
      return { ...state, currentSong: action.state };
    case SET_FILTERS:
      return { ...state, filters: action.state };
    default:
      return state;
  }
};

export default songsReducer;
