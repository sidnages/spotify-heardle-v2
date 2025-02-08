import { styled } from 'styled-components';
import { SongGuess } from '../SongGuess';
import { Track } from '../../interface/trackInterface';

type GuessPanelProps = {
    left: number,
    top: number,
    width: number,
    targetTrack: Track,
    guesses: Track[]
}

const GuessPanelDiv = styled.div<GuessPanelProps>`
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`

export function GuessPanel(props: GuessPanelProps) {
    return (
        <GuessPanelDiv {...props}>
            <SongGuess left={0} top={0} width={props.width} guess={props.guesses[0]} target={props.targetTrack} />
            <SongGuess left={0} top={10} width={props.width} guess={props.guesses[1]} target={props.targetTrack} />
            <SongGuess left={0} top={20} width={props.width} guess={props.guesses[2]} target={props.targetTrack} />
            <SongGuess left={0} top={30} width={props.width} guess={props.guesses[3]} target={props.targetTrack} />
            <SongGuess left={0} top={40} width={props.width} guess={props.guesses[4]} target={props.targetTrack} />
            <SongGuess left={0} top={50} width={props.width} guess={props.guesses[5]} target={props.targetTrack} />
        </GuessPanelDiv>
    );
}

