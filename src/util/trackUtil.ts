import { Playlist, Track, PlaylistEmbedResponseTrack } from '../interface/trackInterface';
import { GameStatus } from '../interface/gameInterface';
import { State } from '../state/userState';
import { generateHash } from './generalUtil';
import { FETCH_URL_EVENT_NAME } from '../constants/ipcConstants';

const ipcRenderer = window.require('electron').ipcRenderer;

export function resetPlaylist(
    playlistId: string,
    seed: string,
    date: Date,  
    updatePlaylist: (_: State['playlist']) => void,
    updateSeed: (_: State['seed']) => void,
    updateGuesses: (_: State['guesses']) => void,
    updateTargetTrack: (_: State['targetTrack']) => void,
    updateGameStatus: (_: State['gameStatus']) => void
): void {
    updateSeed(seed);
    readPlaylist(playlistId, (playlist) => {
        updatePlaylist(playlist);
        resetTargetTrack(playlist, seed, date, updateGuesses, updateTargetTrack, updateGameStatus);
    })
}

function readPlaylist(playlistId: string, callback: (_: Playlist) => void): void {
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;
    console.log(`Fetching data from URL ${embedUrl}`);
    const embedResponse: Promise<string> = ipcRenderer.invoke(FETCH_URL_EVENT_NAME, {
        url: embedUrl
    });
    embedResponse
        .then(function (data) {
            callback(extractPlaylistFromEmbedResponse(playlistId, data));
        })
        .catch(function (error) {
            console.warn('Could not retrieve playlist from embed link!')
            console.error(error);
        })
        .finally(function () {});
}

function extractPlaylistFromEmbedResponse(playlistId: string, response: string): Playlist {
    const titleRegex = /"name":.*?,/;
    const title = response.match(titleRegex)[0].slice(8, -2);
    const trackListRegex = /"trackList":\[.*?\]/;
    const trackListString = response.match(trackListRegex)[0]
    const rawTrackList = JSON.parse(trackListString.slice(12)) as PlaylistEmbedResponseTrack[];
    const trackList: Track[] = rawTrackList.map((rawTrack) => {
        return {
            id: rawTrack.uri.split(':')[2],
            title: rawTrack.title,
            artists: rawTrack.subtitle.split(', '),
            audioUrl: rawTrack.audioPreview.url
        }
    });
    return {
        id: playlistId,
        title: title,
        tracks: trackList
    };
}

export function resetTargetTrack(
    playlist: Playlist,
    seed: string,
    date: Date,
    updateGuesses: (_: State['guesses']) => void,
    updateTargetTrack: (_: State['targetTrack']) => void,
    updateGameStatus: (_: State['gameStatus']) => void
) {
    const tracks = playlist.tracks;
    const newTargetTrackIndex = generateTrackIndex(date, seed, tracks.length);
    console.log(`Switching target track to track index ${newTargetTrackIndex}`);
    const newTargetTrack = tracks[newTargetTrackIndex];
    readTrackThumbnailUrl(newTargetTrack.id, (thumbnailUrl) => {
        updateTargetTrack({
            id: newTargetTrack.id,
            title: newTargetTrack.title,
            artists: newTargetTrack.artists,
            audioUrl: newTargetTrack.audioUrl,
            thumbnailUrl: thumbnailUrl
        });
        updateGuesses([]);
        updateGameStatus(GameStatus.IN_PROGRESS);
    });
}

function readTrackThumbnailUrl(trackId: string, callback: (_: string) => void): void {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    console.log(`Fetching data from URL ${embedUrl}`);
    const embedResponse: Promise<string> = ipcRenderer.invoke(FETCH_URL_EVENT_NAME, {
        url: embedUrl
    });
    embedResponse
        .then(function (data) {
            callback(extractTrackThumbnailUrlFromEmbedResponse(data));
        })
        .catch(function (error) {
            console.warn('Could not retrieve track from embed link!')
            console.error(error);
        })
        .finally(function () {});
}

function extractTrackThumbnailUrlFromEmbedResponse(response: string): string {
    const thumbnailUrlRegex = /href=".*?"/;
    const thumbnailUrl = response.match(thumbnailUrlRegex)[0].slice(6, -1);
    return thumbnailUrl;
}

function generateTrackIndex(date: Date, seed: string, playlistLength: number): number {
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const saltedString = dateString + seed;
    return generateHash(saltedString) % playlistLength;
}