import { createRoot } from 'react-dom/client';
import { useUserState } from './state/userState';
import { GlobalStyle } from './styles/GlobalStyle';
import { Text } from './components/Text';
import { GuessPanel } from './components/GuessPanel';
import { PRIMARY_FOREGROUND_COLOR } from './constants/styleConstants';

// Import fonts for the app
import '@fontsource/lexend';

function App() {
    const playlist = useUserState((state) => state.playlist);
    // const seed = useUserState((state) => state.seed);
    const guesses = useUserState((state) => state.guesses);
    // const targetTrack = useUserState((state) => state.targetTrack);
    // const gameStatus = useUserState((state) => state.gameStatus);
    // const updatePlaylist = useUserState((state) => state.updatePlaylist);
    // const updateSeed = useUserState((state) => state.updateSeed);
    // const updateGuesses = useUserState((state) => state.updateGuesses);
    // const updateTargetTrack = useUserState((state) => state.updateTargetTrack);
    // const updateGameStatus = useUserState((state) => state.updateGameStatus);

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