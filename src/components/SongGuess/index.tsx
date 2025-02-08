import { Track } from '../../interface/trackInterface';
import { 
    PRIMARY_BACKGROUND_COLOR,
    SECONDARY_BACKGROUND_COLOR,
    SECONDARY_FOREGROUND_COLOR,
    GREEN_ACCENT_COLOR,
    YELLOW_ACCENT_COLOR
} from '../../constants/styleConstants';
import { Text } from '../Text';
import { getGuessStatus } from '../../util/guessUtil';
import { GuessStatus } from '../../interface/gameInterface';
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
    switch (getGuessStatus(props.guess, props.target)) {
        case GuessStatus.None:
            backgroundColor = SECONDARY_BACKGROUND_COLOR;
            textColor = SECONDARY_BACKGROUND_COLOR;
            break;
        case GuessStatus.Skip:
            backgroundColor = SECONDARY_FOREGROUND_COLOR;
            textColor = PRIMARY_BACKGROUND_COLOR;
            break;
        case GuessStatus.Incorrect:
            backgroundColor = SECONDARY_FOREGROUND_COLOR;
            textColor = PRIMARY_BACKGROUND_COLOR;
            break;
        case GuessStatus.Partial:
            backgroundColor = YELLOW_ACCENT_COLOR;
            textColor = PRIMARY_BACKGROUND_COLOR;
            break;
        case GuessStatus.Correct:
            backgroundColor = GREEN_ACCENT_COLOR;
            textColor = PRIMARY_BACKGROUND_COLOR;
            break;
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

