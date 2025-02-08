import { Playlist, Track } from '../interface/trackInterface';
import { GameStatus, GuessStatus } from '../interface/gameInterface';
import { State } from '../state/userState';
import { stripAll } from './generalUtil';
import { SKIPPED_TRACK_ID } from '../constants/defaultConstants';

export function constructSearchOptions(playlist: Playlist): Map<string, Track> {
    const tracks = playlist.tracks;
    return new Map(tracks.map(track => [track.title, track]));
}

export function getSuggestion(input: string, searchOptions: Map<string, Track>): string | undefined {
    const strippedInput = stripAll(input);
    const searchOptionKeys = searchOptions.keys();
    let leftmostIndex = 999;
    let bestMatch: string | undefined = undefined;
    for (const key of searchOptionKeys) {
        if (input === key) {
            return undefined;
        }
        const strippedKey = stripAll(key);
        if (strippedInput.length > strippedKey.length) {
            continue;
        } 
        const index = strippedKey.indexOf(strippedInput);
        if (index >= 0 && index < leftmostIndex) {
            leftmostIndex = index;
            bestMatch = key;
        }
    }
    return bestMatch;
}

export function getGuessStatus(guess: Track, target: Track): GuessStatus {
    if (!guess) {
        return GuessStatus.None;
    } else if (guess.id === SKIPPED_TRACK_ID) {
        return GuessStatus.Skip;
    } else if (guess.id === target.id) {
        return GuessStatus.Correct;
    } else if (guess.artists.filter((artist) => target.artists.includes(artist)).length > 0) {
        return GuessStatus.Partial;
    } else {
        return GuessStatus.Incorrect;
    }
}

export function makeGuessFunction(
    target: Track,
    guesses: Track[],
    updateGuesses: (_: State['guesses']) => void,
    updateGameStatus: (_: State['gameStatus']) => void
): (_: Track) => void {
    return (guess: Track) => {
        if (guesses.length >= 6) {
            console.error('Cant make guess - already at max guesses');
            return;
        }
        const newGuesses = guesses.concat(guess);
        updateGuesses(newGuesses);
        if (guess.id === target.id) {
            updateGameStatus(GameStatus.CORRECT);
        } else if (newGuesses.length >= 6) {
            updateGameStatus(GameStatus.OUT_OF_GUESSES);
        }
    };
}