export interface Track {
    id: string;
    title: string;
    artists: string[];
    audioUrl: string;
    thumbnailUrl?: string;
}

export interface Playlist {
    id: string;
    title: string;
    tracks: Track[]
}

export interface PlaylistEmbedResponseTrack {
    uri: string,
    uid: string,
    title: string,
    subtitle: string,
    isExplicit: boolean,
    duration: number,
    isPlayable: true,
    audioPreview: {
        format: string,
        url: string
    }
}