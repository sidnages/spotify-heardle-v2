import savedUserState from '../data/savedUserState.json';
import { Track } from '../interface/trackInterface';
import { GameStatus } from '../interface/gameInterface';
import { State } from '../state/userState';
import { isSameDay } from '../util/generalUtil';
import { readPlaylist, selectTargetTrack } from './trackUtil';
import { DEFAULT_PLAYLIST_ID, DEFAULT_SEED, PLACEHOLDER_PLAYLIST } from '../constants/defaultConstants';

export function fetchUserState(): State {
    var state = savedUserState as State;
    if (state.playlist === undefined ||
        state.seed === undefined ||
        state.date === undefined ||
        state.guesses === undefined ||
        state.targetTrack === undefined ||
        state.gameStatus === undefined
    ) {
        state = initializeUserState();
    }
    const currentDate = new Date();
    console.log(state.date);
    console.log(currentDate);
    if (!isSameDay(state.date, currentDate)) {
        const newTargetTrack = selectTargetTrack(state.playlist, state.date, state.seed);
        state.targetTrack = newTargetTrack;
        state.date = currentDate;
        state.guesses = [];
        state.gameStatus = GameStatus.IN_PROGRESS;
    }
    return state;
}

// To be called if there is no saved state
function initializeUserState(): State {
    readPlaylist(DEFAULT_PLAYLIST_ID);
    const playlist = PLACEHOLDER_PLAYLIST;
    const seed = DEFAULT_SEED;
    const date = new Date();
    const targetTrack = selectTargetTrack(playlist, date, seed);
    const guesses: Track[] = [];
    const gameStatus = GameStatus.IN_PROGRESS;
    return {
        playlist,
        seed,
        date,
        targetTrack,
        guesses,
        gameStatus
    };
}