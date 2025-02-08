import { styled } from 'styled-components';
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Text } from '../Text';
import { TextField } from '../TextField';
import { IconButton } from '../IconButton';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FOREGROUND_COLOR } from '../../constants/styleConstants';

type PlaylistHeaderProps = {
    left: number,
    top: number,
    width: number,
    playlistName: string,
    updatePlaylistCallback: (_: string) => void
}

const PlaylistHeaderDiv = styled.div<PlaylistHeaderProps>`
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    height: 40px;
    display: flex;
    align-items: center;
`

export function PlaylistHeader(props: PlaylistHeaderProps) {
    const [inputPlaylist, setInputPlaylist] = useState('');
    const [changingPlaylist, setChangingPlaylist] = useState(false);
    const icon = changingPlaylist ? FaCheck : FaEdit;

    return (
        <PlaylistHeaderDiv {...props}>
            <span style={{ display:(changingPlaylist ? 'none' : 'inline')}}>
                <Text 
                    left={0}
                    top={0}
                    width={props.width-30}
                    height={40}
                    borderRadius={0}
                    color={PRIMARY_FOREGROUND_COLOR} 
                    fontSize={25}
                    text={props.playlistName}
                    textAlign='left'
                    verticalAlign='top'
                    paddingLeft={0}
                />
            </span>
            <span style={{ display:(changingPlaylist ? 'inline' : 'none') }}>
                <TextField 
                    left={0}
                    top={-5}
                    width={props.width-30}
                    color={PRIMARY_FOREGROUND_COLOR}
                    fontSize={25}
                    defaultText='[Enter a new playlist ID]'
                    inputValue={inputPlaylist}
                    setInputValue={setInputPlaylist}
                    onChangeCallback={(_) => {}}
                    isDisabled={false}
                />
            </span>
            <IconButton
                left={0}
                top={-4}
                radius={15}
                icon={icon}
                iconSize={20}
                iconColor={PRIMARY_FOREGROUND_COLOR}
                backgroundColor={PRIMARY_BACKGROUND_COLOR}
                clickedIconColor={PRIMARY_FOREGROUND_COLOR}
                clickedBackgroundColor={PRIMARY_BACKGROUND_COLOR}
                onClickCallback = {() => {
                    setChangingPlaylist(!changingPlaylist);
                    props.updatePlaylistCallback(inputPlaylist);
                }}
                isDisabled={false}
            />
        </PlaylistHeaderDiv>
    );
}
