import { create } from 'zustand';
import { Playlist, Track } from '../interface/trackInterface';
import { GameStatus } from '../interface/gameInterface';
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
}

export const useUserState = create<State & Action>((set) => ({
    // Set these to placeholder defaults, and then make an async call to initialize after
    playlist: PLACEHOLDER_PLAYLIST,
    seed: DEFAULT_SEED,
    date: new Date(),
    guesses: [],
    targetTrack: PLACEHOLDER_TARGET_TRACK,
    gameStatus: GameStatus.IN_PROGRESS,
    updatePlaylist: (playlist) => {
        console.log(`Updated playlist in user state to ${playlist.title}`);
        set(() => ({ playlist: playlist }));
    },
    updateSeed: (seed) => {
        console.log(`Updated seed in user state to ${seed}`);
        set(() => ({ seed: seed }))
    },
    updateDate: (date) => {
        console.log(`Updated date in user state to ${date.toISOString()}`);
        set(() => ({ date: date }));
    },
    updateGuesses: (guesses) => {
        console.log(`Updated guesses in user state to ${JSON.stringify(guesses)}`);
        set(() => ({ guesses: guesses }));
    },
    updateTargetTrack: (targetTrack) => {
        console.log(`Updated target track in user state to ${JSON.stringify(targetTrack)}`);
        set(() => ({ targetTrack: targetTrack }));
    },
    updateGameStatus: (gameStatus) => {
        console.log(`Updated game status in user state to ${gameStatus}`);
        set(() => ({ gameStatus: gameStatus }));
    }
}));