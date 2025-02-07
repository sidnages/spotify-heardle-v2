import savedUserState from '../data/savedUserState.json';
import { State } from '../state/userState';
import { isSameDay } from '../util/generalUtil';
import { resetPlaylist, resetTargetTrack } from './trackUtil';
import { useUserState } from '../state/userState';
import { DEFAULT_PLAYLIST_ID, DEFAULT_SEED } from '../constants/defaultConstants';
import { SAVE_TO_FILE_EVENT_NAME } from '../constants/ipcConstants';

const ipcRenderer = window.require('electron').ipcRenderer;

export function fetchUserState(
    date: Date,
    updatePlaylist: (_: State['playlist']) => void,
    updateSeed: (_: State['seed']) => void,
    updateDate: (_: State['date']) => void,
    updateGuesses: (_: State['guesses']) => void,
    updateTargetTrack: (_: State['targetTrack']) => void,
    updateGameStatus: (_: State['gameStatus']) => void,
): void {
    var savedState = savedUserState as State;
    if (savedState.playlist === undefined ||
        savedState.seed === undefined ||
        savedState.date === undefined ||
        savedState.guesses === undefined ||
        savedState.targetTrack === undefined ||
        savedState.gameStatus === undefined
    ) {
        console.log('Could not read saved user state, initializing from defaults');
        initializeUserState(
            date,
            updatePlaylist,
            updateSeed,
            updateGuesses,
            updateTargetTrack,
            updateGameStatus
        );
        return;
    }
    if (!isSameDay(savedState.date, date)) {
        resetTargetTrack(
            savedState.playlist,
            savedState.seed,
            date,
            updateGuesses,
            updateTargetTrack,
            updateGameStatus
        );
        updateDate(savedState.date);
    } else {
        updateTargetTrack(savedState.targetTrack);
        updateGuesses(savedState.guesses);
        updateGameStatus(savedState.gameStatus);
    }
    updatePlaylist(savedState.playlist);
    updateSeed(savedState.seed);
}

// To be called if there is no saved state
function initializeUserState(
    date: Date,
    updatePlaylist: (_: State['playlist']) => void,
    updateSeed: (_: State['seed']) => void,
    updateGuesses: (_: State['guesses']) => void,
    updateTargetTrack: (_: State['targetTrack']) => void,
    updateGameStatus: (_: State['gameStatus']) => void
): void {
    resetPlaylist(
        DEFAULT_PLAYLIST_ID,
        DEFAULT_SEED,
        date,
        updatePlaylist,
        updateSeed,
        updateGuesses,
        updateTargetTrack,
        updateGameStatus
    );
}

export function saveUserState(): void {
    const playlist = useUserState((state) => state.playlist);
    const seed = useUserState((state) => state.seed);
    const date = useUserState((state) => state.date);
    const guesses = useUserState((state) => state.guesses);
    const targetTrack = useUserState((state) => state.targetTrack);
    const gameStatus = useUserState((state) => state.gameStatus);
    const finalState = {
        playlist,
        seed,
        date,
        guesses,
        targetTrack,
        gameStatus
    }
    ipcRenderer.invoke(SAVE_TO_FILE_EVENT_NAME, {
        filename: './src/data/savedUserState.json',
        content: JSON.stringify(finalState)
    });
}