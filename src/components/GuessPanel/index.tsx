import { styled } from 'styled-components';
import { Text } from '../../components/Text';
import { Track } from '../../interface/trackInterface';
import { PRIMARY_FOREGROUND_COLOR } from '../../constants/styleConstants';

export type GuessPanelProps = {
    left: number,
    top: number,
    playlistName: string,
    guesses: Track[]
}

export const GuessPanelDiv = styled.div<GuessPanelProps>`
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`

export function GuessPanel(props: GuessPanelProps) {
    return (
        <GuessPanelDiv {...props}>
            <Text left={0} top={0} color={PRIMARY_FOREGROUND_COLOR} fontSize={25} text={props.playlistName} />
        </GuessPanelDiv>
    );
}

