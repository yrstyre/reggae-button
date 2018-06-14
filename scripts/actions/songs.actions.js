import { createSetStateAction } from './index';
import { SET_SONGS, SET_CURRENT_SONG } from './action-types';

export const setSongs = createSetStateAction(SET_SONGS);
export const setCurrentSong = createSetStateAction(SET_CURRENT_SONG);
