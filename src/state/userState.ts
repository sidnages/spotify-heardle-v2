import { create } from 'zustand';
import { Playlist, Track } from '../interface/trackInterface';
import { GameStatus } from '../interface/gameInterface';
import { saveUserState } from '../util/stateUtil';
import { log } from '../util/loggingUtil';
import { DEFAULT_SEED, PLACEHOLDER_PLAYLIST, PLACEHOLDER_TARGET_TRACK } from '../constants/defaultConstants';

export interface State {
    playlist: Playlist;
    seed: string;
    date: Date;
    guesses: Track[];
    targetTrack: Track;
    gameStatus: GameStatus;
}

interface Action {
    updatePlaylist: (playlist: State['playlist']) => void;
    updateSeed: (seed: State['seed']) => void;
    updateDate: (date: State['date']) => void;
    updateGuesses: (guesses: State['guesses']) => void;
    updateTargetTrack: (targetTrack: State['targetTrack']) => void;
    updateGameStatus: (gameStatus: State['gameStatus']) => void;
    saveCurrentState: () => void;
}

export const useUserState = create<State & Action>((set, get) => ({
    // Set these to placeholder defaults, and then make an async call to initialize after
    playlist: PLACEHOLDER_PLAYLIST,
    seed: DEFAULT_SEED,
    date: new Date(),
    guesses: [],
    targetTrack: PLACEHOLDER_TARGET_TRACK,
    gameStatus: GameStatus.IN_PROGRESS,
    updatePlaylist: (playlist) => {
        log.info(`Updated playlist in user state to ${playlist.title}`);
        set(() => ({ playlist: playlist }));
    },
    updateSeed: (seed) => {
        log.info(`Updated seed in user state to ${seed}`);
        set(() => ({ seed: seed }));
        get().saveCurrentState();
    },
    updateDate: (date) => {
       log.info(`Updated date in user state to ${date.toISOString()}`);
        set(() => ({ date: date }));
        get().saveCurrentState();
    },
    updateGuesses: (guesses) => {
        log.info(`Updated guesses in user state to ${JSON.stringify(guesses)}`);
        set(() => ({ guesses: guesses }));
        get().saveCurrentState();
    },
    updateTargetTrack: (targetTrack) => {
        log.info(`Updated target track in user state to ${JSON.stringify(targetTrack)}`);
        set(() => ({ targetTrack: targetTrack }));
        get().saveCurrentState();
    },
    updateGameStatus: (gameStatus) => {
        log.info(`Updated game status in user state to ${gameStatus}`);
        set(() => ({ gameStatus: gameStatus }));
        get().saveCurrentState();
    },
    saveCurrentState: () => {
        log.info('Saving user state to file');
        const currentStateAndActions = get();
        const currentState = {
            playlist: currentStateAndActions.playlist,
            seed: currentStateAndActions.seed,
            date: currentStateAndActions.date,
            guesses: currentStateAndActions.guesses,
            targetTrack: currentStateAndActions.targetTrack,
            gameStatus: currentStateAndActions.gameStatus
        };
        saveUserState(currentState);
    }
}));