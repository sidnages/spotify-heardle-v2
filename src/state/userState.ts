import { create } from 'zustand';
import { Playlist, Track } from '../interface/trackInterface';
import { GameStatus } from '../interface/gameInterface';
import { fetchUserState } from '../util/stateUtil';

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

const initialState = fetchUserState();

export const useUserState = create<State & Action>((set) => ({
    playlist: initialState.playlist,
    seed: initialState.seed,
    date: initialState.date,
    guesses: initialState.guesses,
    targetTrack: initialState.targetTrack,
    gameStatus: initialState.gameStatus,
    updatePlaylist: (playlist) => set(() => ({ playlist: playlist })),
    updateSeed: (seed) => set(() => ({ seed: seed })),
    updateDate: (date) => set(() => ({ date: date })),
    updateGuesses: (guesses) => set(() => ({ guesses: guesses })),
    updateTargetTrack: (targetTrack) => set(() => ({ targetTrack: targetTrack })),
    updateGameStatus: (gameStatus) => set(() => ({ gameStatus: gameStatus }))
}));