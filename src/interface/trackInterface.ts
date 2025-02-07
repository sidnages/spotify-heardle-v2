export interface Track {
    id: string;
    title: string;
    artists: string[];
    audioUrl: string;
    thumbnailUrl: string;
}

export interface Playlist {
    id: string;
    title: string;
    tracks: Track[]
}