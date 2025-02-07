import { Playlist, Track } from '../interface/trackInterface';
import { generateHash } from './generalUtil';
import { FETCH_URL_EVENT_NAME } from '../constants/ipcConstants';

const ipcRenderer = window.require('electron').ipcRenderer;

export function readPlaylist(playlistId: string): void {
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;
    console.log(`Fetching data from URL ${embedUrl}`);
    const embedResponse: Promise<string> = ipcRenderer.invoke(FETCH_URL_EVENT_NAME, {
        url: embedUrl
    })
    embedResponse
        .then(function (data) {
            console.log('Retrieved embedded playlist');
            console.log(data);
        })
        .catch(function (error) {
            console.warn('Could not retrieve playlist embed link!')
            console.error(error);
        })
        .finally(function () {});
}

export function selectTargetTrack(playlist: Playlist, date: Date, seed: string): Track {
    const tracks = playlist.tracks;
    const trackIndex = generateTrackIndex(date, seed, tracks.length);
    return tracks[trackIndex];
}

function generateTrackIndex(date: Date, seed: string, playlistLength: number): number {
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const saltedString = dateString + seed;
    return generateHash(saltedString) % playlistLength;
}