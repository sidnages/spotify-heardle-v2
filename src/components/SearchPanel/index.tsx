import { styled } from 'styled-components';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { TextField } from '../TextField';
import { TextButton } from '../TextButton'
import { IconButton } from '../IconButton'
import { Track } from '../../interface/trackInterface';
import { getSuggestion } from '../../util/guessUtil';
import { 
    PRIMARY_BACKGROUND_COLOR, 
    PRIMARY_FOREGROUND_COLOR,
    SECONDARY_BACKGROUND_COLOR,
    GREEN_ACCENT_COLOR
} from '../../constants/styleConstants';
import { SKIPPED_TRACK } from '../../constants/defaultConstants';

type SearchPanelProps = {
    left: number,
    top: number,
    searchBarWidth: number,
    searchOptions: Map<string, Track>,
    makeGuessCallback: (_: Track) => void,
    isDisabled: boolean,
}

const SearchPanelDiv = styled.div<SearchPanelProps>`
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`

const SearchBarDiv = styled.div<SearchPanelProps>`
    position: relative;
    left: 0px;
    top: 5px;
    width: ${props => props.searchBarWidth}px;
    height: 40px;
    background-color: ${PRIMARY_FOREGROUND_COLOR};
    border-radius: 20px;
`

export function SearchPanel(props: SearchPanelProps) {
    const fontSize = 20;
    const defaultText = '[Enter a Song]';

    const [inputValue, setInputValue] = useState('');

    const [suggestion, setSuggestion] = useState('');
    const suggestionAlpha = (suggestion && !props.isDisabled) ? 1.0 : 0.0;


    const updateSuggestions = (input: string) => {
        if (!input || input === defaultText) {
            setSuggestion('');
            return;
        }
        const suggestion = getSuggestion(input, props.searchOptions);
        if (suggestion !== undefined) {
            setSuggestion(suggestion);
        } else {
            setSuggestion('');
        }
    }

    return (
        <SearchPanelDiv {...props}>
            <span style={{ opacity:suggestionAlpha }}>
                <TextButton
                    left={0}
                    top={0}
                    textAlign='left'
                    width={props.searchBarWidth}
                    height={40}
                    borderRadius={20}
                    textColor={SECONDARY_BACKGROUND_COLOR}
                    backgroundColor={PRIMARY_FOREGROUND_COLOR}
                    clickedTextColor={PRIMARY_FOREGROUND_COLOR}
                    clickedBackgroundColor={SECONDARY_BACKGROUND_COLOR}
                    fontSize={fontSize}
                    text={'\u00a0\u00a0'+suggestion}
                    onClickCallback = {() => { 
                        if (suggestion) {
                            setInputValue(suggestion);
                            setSuggestion('');
                        }
                    }}
                    isDisabled={props.isDisabled}
                />
            </span>
            <tr>
            <td>
                <SearchBarDiv {...props}>
                    <tr>
                    <td style={{ width: '20px'}} />
                    <td><div style={{ position: 'relative', top: '7px'}}><FaSearch /></div></td>
                    <td>
                        <TextField 
                            left={20}
                            top={6}
                            width={props.searchBarWidth-95}
                            color={SECONDARY_BACKGROUND_COLOR}
                            fontSize={fontSize}
                            defaultText={defaultText}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            onChangeCallback={updateSuggestions}
                            isDisabled={props.isDisabled}
                        />
                    </td>
                    <td style={{ width: '30px'}} />
                    <td>
                        <IconButton
                            left={0}
                            top={7}
                            radius={7}
                            icon={MdCancel}
                            iconSize={15}
                            iconColor={SECONDARY_BACKGROUND_COLOR}
                            backgroundColor={PRIMARY_FOREGROUND_COLOR}
                            clickedIconColor={PRIMARY_FOREGROUND_COLOR}
                            clickedBackgroundColor={SECONDARY_BACKGROUND_COLOR}
                            onClickCallback = {() => {
                                setInputValue(defaultText);
                                updateSuggestions('');
                            }}
                            isDisabled={props.isDisabled}
                        />
                    </td>
                    </tr>
                </SearchBarDiv>
            </td>
            <td style={{ width: '30px'}} />
            <td>
                <TextButton
                    left={0}
                    top={10}
                    textAlign='center'
                    width={80}
                    height={40}
                    borderRadius={8}
                    textColor={PRIMARY_BACKGROUND_COLOR}
                    backgroundColor={GREEN_ACCENT_COLOR}
                    clickedTextColor={PRIMARY_BACKGROUND_COLOR}
                    clickedBackgroundColor={PRIMARY_FOREGROUND_COLOR}
                    fontSize={fontSize-2}
                    text='Guess'
                    onClickCallback = {() => {
                        const isValidGuess = props.searchOptions.has(inputValue);
                        setInputValue(defaultText)
                        updateSuggestions(''); 
                        if (isValidGuess) {
                            props.makeGuessCallback(props.searchOptions.get(inputValue));
                        }
                    }}
                    isDisabled={props.isDisabled}
                />
            </td>
            <td style={{ width: '10px'}} />
            <td>
                <TextButton
                    left={0}
                    top={10}
                    textAlign='center'
                    width={60}
                    height={40}
                    borderRadius={8}
                    textColor={PRIMARY_FOREGROUND_COLOR}
                    backgroundColor={SECONDARY_BACKGROUND_COLOR}
                    clickedTextColor={PRIMARY_BACKGROUND_COLOR}
                    clickedBackgroundColor={PRIMARY_FOREGROUND_COLOR}
                    fontSize={fontSize-2}
                    text='Skip'
                    onClickCallback = {() => { 
                        setInputValue(defaultText)
                        updateSuggestions('');
                        props.makeGuessCallback(SKIPPED_TRACK);
                    }}
                    isDisabled={props.isDisabled}
                />
            </td>
            </tr>
        </SearchPanelDiv>
    );
}

