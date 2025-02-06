import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyle';
import { Text } from './components/Text';
import { PRIMARY_FOREGROUND_COLOR } from './constants/styleConstants';

// Import fonts for the app
import '@fontsource/lexend';

function App() {
    return (
        <>
            <GlobalStyle />
            <Text left={42} top={37} color={PRIMARY_FOREGROUND_COLOR} fontSize={40} text={'Spotify Heardle'}/>
        </>
    );
}

const root = createRoot(document.body);
root.render(<App />);