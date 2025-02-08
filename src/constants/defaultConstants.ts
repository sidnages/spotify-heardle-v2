export const DEFAULT_PLAYLIST_ID = '06fIJ0Q8SkYruBcJX2M6C8'; //'2D96SBkaSSdO57KYvw6SeP';
export const DEFAULT_SEED = 'random-seed';

export const PLACEHOLDER_PLAYLIST = {
    id: '123456',
    title: '[Awaiting Playlist Load]',
    tracks: [
        {
            id: '2ATDkfqprlNNe9mYWodgdc',
            title: 'Dancing Queen',
            artists: ['ABBA'],
            audioUrl: 'https://p.scdn.co/mp3-preview/a5bd4e4700d7e192ba6c4196dfce355d566d40a2',
            thumbnailUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273f7ecaf9daf2c1d5ca89f7312'
        }
    ]
};
export const PLACEHOLDER_TARGET_TRACK = {
    id: '2ATDkfqprlNNe9mYWodgdc',
    title: 'Dancing Queen',
    artists: ['ABBA'],
    audioUrl: 'https://p.scdn.co/mp3-preview/a5bd4e4700d7e192ba6c4196dfce355d566d40a2',
    thumbnailUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273f7ecaf9daf2c1d5ca89f7312'
};

export const SKIPPED_TRACK_ID = 'N/A';
export const SKIPPED_TRACK = {
    id: SKIPPED_TRACK_ID,
    title: '[SKIPPED]',
    artists: ['N/A'],
    audioUrl: 'N/A',
    thumbnailUrl: 'N/A'
};

export const MYSTERY_THUMBNAIL_URL = 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273806c160566580d6335d1f16c';
export const MYSTERY_TRACK_TITLE = '[Unidentified Track]';
export const MYSTERY_TRACK_ARTIST = '?????';