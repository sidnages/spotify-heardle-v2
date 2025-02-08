import savedUserState from '../data/savedUserState.json';
import { Playlist, Track } from '../interface/trackInterface';
import { State } from '../state/userState';
import { isSameDay } from '../util/generalUtil';
import { resetPlaylist, resetTargetTrack } from './trackUtil';
import { getGuessStatus } from './guessUtil';
import { GuessStatus, GameStatus } from '../interface/gameInterface';
import { DEFAULT_PLAYLIST_ID, DEFAULT_SEED, DEFAULT_USER_STATE_FILENAME } from '../constants/defaultConstants';
import { SAVE_TO_FILE_EVENT_NAME } from '../constants/ipcConstants';

const ipcRenderer = window.require('electron').ipcRenderer;

function readSavedState(): State {
    let playlist = undefined;
    let seed = undefined;
    let date = undefined;
    let guesses = undefined;
    let targetTrack = undefined;
    let gameStatus = undefined;
    if ("playlist" in savedUserState) {
        playlist = savedUserState.playlist;
    }
    if ("seed" in savedUserState) {
        seed = savedUserState.seed;
    }
    if ("date" in savedUserState) {
        date = new Date(savedUserState.date);
    }
    if ("guesses" in savedUserState) {
        guesses = savedUserState.guesses;
    }
    if ("targetTrack" in savedUserState) {
        targetTrack = savedUserState.targetTrack;
    }
    if ("gameStatus" in savedUserState) {
        gameStatus = savedUserState.gameStatus;
    }
    return {
        playlist,
        seed,
        date,
        guesses,
        targetTrack,
        gameStatus
    };
}

export function fetchUserState(
    date: Date,
    updatePlaylist: (_: State['playlist']) => void,
    updateSeed: (_: State['seed']) => void,
    updateDate: (_: State['date']) => void,
    updateGuesses: (_: State['guesses']) => void,
    updateTargetTrack: (_: State['targetTrack']) => void,
    updateGameStatus: (_: State['gameStatus']) => void,
): void {
    const savedState = readSavedState();
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
        console.log('Date has changed - resetting track and guesses');
        resetTargetTrack(
            savedState.playlist,
            savedState.seed,
            date,
            updateGuesses,
            updateTargetTrack,
            updateGameStatus
        );
        updateDate(date);
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

export function saveUserState(state: State): void {
    ipcRenderer.invoke(SAVE_TO_FILE_EVENT_NAME, {
        filename: DEFAULT_USER_STATE_FILENAME,
        content: JSON.stringify(state)
    });
}

export function copyStateToClipboard(
    playlist: Playlist,
    date: Date,
    guesses: Track[],
    targetTrack: Track,
    gameStatus: GameStatus
): void {
    let output = ''
    let result;
    switch (gameStatus) {
        case GameStatus.IN_PROGRESS:
            result = '🚧';
            break;
        case GameStatus.CORRECT:
            result = '✅';
            break;
        case GameStatus.OUT_OF_GUESSES:
            result = '❌';
            break;
    }
    output += `Spotify Heardle ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${result}\n`
    output += `${playlist.title}\n`
    for (let guess of guesses) {
        switch (getGuessStatus(guess, targetTrack)) {
            case GuessStatus.None:
            case GuessStatus.Skip:
            case GuessStatus.Incorrect:
                output += '⚫';
                break;
            case GuessStatus.Partial:
                output += '🟡';
                break;
            case GuessStatus.Correct:
                output += '🟢'
                break;
        }
    }

    navigator.clipboard.writeText(output);
}