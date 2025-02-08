import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useUserState } from './state/userState';
import { GlobalStyle } from './styles/GlobalStyle';
import { MdOutlineIosShare } from "react-icons/md";
import { Text } from './components/Text';
import { IconButton } from './components/IconButton';
import { PlaylistHeader } from './components/PlaylistHeader';
import { GuessPanel } from './components/GuessPanel';
import { SearchPanel } from './components/SearchPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { GameStatus } from './interface/gameInterface';
import { resetPlaylist } from './util/trackUtil';
import { makeGuessFunction } from './util/guessUtil';
import { fetchUserState, saveUserState, copyStateToClipboard } from './util/stateUtil';
import { constructSearchOptions } from './util/guessUtil';
import { getPlayDurationMs } from './util/audioUtil';
import { 
    PRIMARY_BACKGROUND_COLOR,
    SECONDARY_BACKGROUND_COLOR,
    PRIMARY_FOREGROUND_COLOR 
} from './constants/styleConstants';
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
    const saveCurrentState = useUserState((state) => state.saveCurrentState);
    const gameInProgress = (gameStatus === GameStatus.IN_PROGRESS);

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

        ipcRenderer.on(APP_CLOSE_EVENT_NAME, saveCurrentState);

        return () => {
            ipcRenderer.removeListener(APP_CLOSE_EVENT_NAME, saveCurrentState);
        }
    }, []);
    
    return (
        <>
            <GlobalStyle />
            <div style={{ display:'flex', alignItems:'center' }}>
                <Text 
                    left={44}
                    top={27}
                    width={760}
                    height={60}
                    borderRadius={0}
                    color={PRIMARY_FOREGROUND_COLOR}
                    fontSize={40}
                    text={'Spotify Heardle'}
                    textAlign='left'
                    verticalAlign='top'
                    paddingLeft={0}
                />
                <IconButton
                    left={0}
                    top={22}
                    radius={20}
                    icon={MdOutlineIosShare}
                    iconSize={25}
                    iconColor={PRIMARY_BACKGROUND_COLOR}
                    backgroundColor={PRIMARY_FOREGROUND_COLOR}
                    clickedIconColor={PRIMARY_FOREGROUND_COLOR}
                    clickedBackgroundColor={SECONDARY_BACKGROUND_COLOR}
                    onClickCallback = {() => {
                        copyStateToClipboard(
                            playlist,
                            date,
                            guesses,
                            targetTrack,
                            gameStatus
                        );
                    }}
                    isDisabled={false}
                />
            </div>
            <div style={{ display:'flex' }}>
                <div style={{ width:550 }}>
                    <PlaylistHeader 
                        left={67}
                        top={45}
                        width={400}
                        playlistName={playlist.title}
                        updatePlaylistCallback={(playlistId) =>
                            resetPlaylist(
                                playlistId,
                                seed,
                                date,  
                                updatePlaylist,
                                updateSeed,
                                updateGuesses,
                                updateTargetTrack,
                                updateGameStatus
                            )
                        }
                    />
                    <GuessPanel 
                        left={67}
                        top={60}
                        width={400}
                        targetTrack={targetTrack}
                        guesses={guesses}
                    />
                </div>
                <div style={{ width:200 }}>
                    <MusicPlayer
                        left={0}
                        top={48}
                        width={200}
                        targetTrack={targetTrack}
                        playDuration={getPlayDurationMs(guesses.length, gameStatus !== GameStatus.IN_PROGRESS)}
                        gameStatus={gameStatus}
                    />
                </div>
            </div>
            <SearchPanel 
                left={44}
                top={55}
                searchBarWidth={540}
                searchOptions={constructSearchOptions(playlist)}
                makeGuessCallback={makeGuessFunction(targetTrack, guesses, updateGuesses, updateGameStatus)}
                isDisabled={!gameInProgress}
            />
        </>
    );
}

const root = createRoot(document.body);
root.render(<App />);