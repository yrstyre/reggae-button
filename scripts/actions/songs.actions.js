import { createSetStateAction } from './index';
import { SET_SONGS, SET_CURRENT_SONG, SET_FILTERS } from './action-types';

export const setSongs = createSetStateAction(SET_SONGS);
export const setCurrentSong = createSetStateAction(SET_CURRENT_SONG);
export const setFilters = createSetStateAction(SET_FILTERS);
