import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useUserState } from './state/userState';
import { GlobalStyle } from './styles/GlobalStyle';
import { Text } from './components/Text';
import { GuessPanel } from './components/GuessPanel';
import { fetchUserState, saveUserState } from './util/stateUtil';
import { PRIMARY_FOREGROUND_COLOR } from './constants/styleConstants';
import { APP_CLOSE_EVENT_NAME } from './constants/ipcConstants';

// Import fonts for the app
import '@fontsource/lexend';

const ipcRenderer = window.require('electron').ipcRenderer;

function App() {
    const playlist = useUserState((state) => state.playlist);
    const seed = useUserState((state) => state.seed);
    const date = useUserState((state) => state.date);
    const guesses = useUserState((state) => state.guesses);
    const targetTrack = useUserState((state) => state.targetTrack);
    const gameStatus = useUserState((state) => state.gameStatus);
    const updatePlaylist = useUserState((state) => state.updatePlaylist);
    const updateSeed = useUserState((state) => state.updateSeed);
    const updateDate = useUserState((state) => state.updateDate);
    const updateGuesses = useUserState((state) => state.updateGuesses);
    const updateTargetTrack = useUserState((state) => state.updateTargetTrack);
    const updateGameStatus = useUserState((state) => state.updateGameStatus);

    // This effect will fetch the user state once on App mount, and save the user state once when app closes
    useEffect(() => {
        fetchUserState(
            date,
            updatePlaylist,
            updateSeed,
            updateDate,
            updateGuesses,
            updateTargetTrack,
            updateGameStatus
        );

        ipcRenderer.on(APP_CLOSE_EVENT_NAME, saveUserState);

        return () => {
            ipcRenderer.removeListener(APP_CLOSE_EVENT_NAME, saveUserState);
        }
    }, []);
    
    return (
        <>
            <GlobalStyle />
            <Text left={44} top={37} color={PRIMARY_FOREGROUND_COLOR} fontSize={40} text={'Spotify Heardle'} />
            <GuessPanel left={67} top={63} playlistName={playlist.title} guesses={guesses} />
        </>
    );
}

const root = createRoot(document.body);
root.render(<App />);