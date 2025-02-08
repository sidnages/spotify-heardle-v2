import { Playlist, Track } from '../interface/trackInterface';
import { stripAll } from '../util/generalUtil';

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