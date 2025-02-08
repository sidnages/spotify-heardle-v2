import { Track } from '../../interface/trackInterface';
import { 
    PRIMARY_BACKGROUND_COLOR,
    SECONDARY_BACKGROUND_COLOR,
    SECONDARY_FOREGROUND_COLOR,
    GREEN_ACCENT_COLOR,
    YELLOW_ACCENT_COLOR
} from '../../constants/styleConstants';
import { Text } from '../Text';
import { SKIPPED_TRACK_ID } from '../../constants/defaultConstants';

type SongGuessProps = {
    left: number,
    top: number,
    width: number,
    guess: Track | undefined,
    target: Track,
}

export function SongGuess(props: SongGuessProps) {
    let backgroundColor: string;
    let textColor: string;
    if (!props.guess) {
        backgroundColor = SECONDARY_BACKGROUND_COLOR;
        textColor = SECONDARY_BACKGROUND_COLOR;
    } else if (props.guess.id === SKIPPED_TRACK_ID) {
        backgroundColor = SECONDARY_FOREGROUND_COLOR;
        textColor = PRIMARY_BACKGROUND_COLOR;
    } else if (props.guess.id === props.target.id) {
        backgroundColor = GREEN_ACCENT_COLOR;
        textColor = PRIMARY_BACKGROUND_COLOR;
    } else if (props.guess.artists.filter((artist) => props.target.artists.includes(artist)).length > 0) {
        backgroundColor = YELLOW_ACCENT_COLOR;
        textColor = PRIMARY_BACKGROUND_COLOR;
    } else {
        backgroundColor = SECONDARY_FOREGROUND_COLOR;
        textColor = PRIMARY_BACKGROUND_COLOR;
    }

    const text = props.guess ? props.guess.title : ''

    return (
        <Text 
            top={props.top}
            left={props.left}
            width={props.width}
            height={35}
            borderRadius={8}
            color={textColor}
            fontSize={18}
            text={text}
            textAlign='left'
            verticalAlign='center'
            paddingLeft={15}
            backgroundColor={backgroundColor}
        />
    );
}

