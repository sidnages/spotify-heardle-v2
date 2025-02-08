import { styled } from 'styled-components';
import { useState } from 'react';
import { GameStatus } from '../../interface/gameInterface';
import { playAudio } from '../../util/audioUtil';
import { Track } from '../../interface/trackInterface';
import { Text } from '../Text';
import { IconButton } from '../IconButton';
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { MYSTERY_THUMBNAIL_URL, MYSTERY_TRACK_TITLE, MYSTERY_TRACK_ARTIST } from '../../constants/defaultConstants';
import { SECONDARY_BACKGROUND_COLOR, PRIMARY_FOREGROUND_COLOR } from '../../constants/styleConstants';

type MusicPlayerProps = {
    left: number,
    top: number,
    width: number,
    targetTrack: Track,
    playDuration: number
    gameStatus: GameStatus
}

const MusicPlayerDiv = styled.div<MusicPlayerProps>`
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
`

export function MusicPlayer(props: MusicPlayerProps) {
    const thumbnailUrl = (props.gameStatus === GameStatus.IN_PROGRESS) ? MYSTERY_THUMBNAIL_URL : props.targetTrack.thumbnailUrl;
    const title = (props.gameStatus === GameStatus.IN_PROGRESS) ? MYSTERY_TRACK_TITLE : props.targetTrack.title;
    const artists = (props.gameStatus === GameStatus.IN_PROGRESS) ? MYSTERY_TRACK_ARTIST : props.targetTrack.artists.join(', ');

    const [audio, setAudio] = useState(undefined);
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);
    const icon = audioIsPlaying ? FaStop : FaPlay;

    return (
        <MusicPlayerDiv {...props}>
            <img src={thumbnailUrl} width={200} height={200} alt="Track Thumbnail" />;
            <Text 
                top={0}
                left={0}
                width={200}
                height={20}
                borderRadius={0}
                color={PRIMARY_FOREGROUND_COLOR}
                fontSize={18}
                text={title}
                textAlign='center'
                verticalAlign='center'
                paddingLeft={0}
            />
            <Text 
                top={0}
                left={0}
                width={200}
                height={20}
                borderRadius={0}
                color={PRIMARY_FOREGROUND_COLOR}
                fontSize={15}
                text={artists}
                textAlign='center'
                verticalAlign='center'
                paddingLeft={0}
            />
            <IconButton
                left={80}
                top={15}
                radius={20}
                icon={icon}
                iconSize={15}
                iconColor={PRIMARY_FOREGROUND_COLOR}
                backgroundColor={SECONDARY_BACKGROUND_COLOR}
                clickedIconColor={SECONDARY_BACKGROUND_COLOR}
                clickedBackgroundColor={PRIMARY_FOREGROUND_COLOR}
                onClickCallback = {() => {
                    if (!audioIsPlaying) {
                        const audio = new Audio(props.targetTrack.audioUrl);
                        setAudioIsPlaying(true);
                        setAudio(audio);
                        playAudio(audio, props.playDuration, () => {
                            setAudioIsPlaying(false);
                        });
                    } else {
                        if (audio !== undefined) {
                            audio.pause();
                            setAudioIsPlaying(false);
                            setAudio(undefined);
                        }
                    } 
                }}
                isDisabled={false}
            />
        </MusicPlayerDiv>
    );
}
