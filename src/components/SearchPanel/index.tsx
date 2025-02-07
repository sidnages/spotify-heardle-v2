import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { TextField } from '../TextField';
import { TextButton } from '../TextButton'
import { Track } from '../../interface/trackInterface';
import { getSuggestion } from '../../util/searchUtil';
import { PRIMARY_FOREGROUND_COLOR, SECONDARY_BACKGROUND_COLOR } from '../../constants/styleConstants';

type SearchPanelProps = {
    left: number,
    top: number,
    searchBarWidth: number,
    searchOptions: Map<string, Track>,
    isDisabled: boolean,
}

const SearchPanelDiv = styled.div<SearchPanelProps>`
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.searchBarWidth}px;
`

const SearchBarDiv = styled.div<SearchPanelProps>`
    position: relative;
    left: 0px;
    top: 10px;
    width: ${props => props.searchBarWidth}px;
    height: 40px;
    background-color: ${PRIMARY_FOREGROUND_COLOR};
    border-radius: 15px;
`

export function SearchPanel(props: SearchPanelProps) {
    const fontSize = 20;
    const defaultText = '[Enter a Song]';

    const [inputValue, setInputValue] = useState('');

    const [suggestion, setSuggestion] = useState('');
    const suggestionAlpha = (suggestion && !props.isDisabled) ? 1.0 : 0.0;

    useEffect(() => {
        setSuggestion('');
    }, []);

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
            <SearchBarDiv {...props}>
                <tr>
                <td style={{ width: '20px'}} />
                <td><div style={{ position: 'relative', top: '6px'}}><FaSearch /></div></td>
                <td>
                    <TextField 
                        left={20}
                        top={6}
                        width={props.searchBarWidth-70}
                        color={SECONDARY_BACKGROUND_COLOR}
                        fontSize={fontSize}
                        defaultText={defaultText}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onChangeCallback={updateSuggestions}
                        isDisabled={props.isDisabled}
                    />
                </td>
                </tr>
            </SearchBarDiv>
        </SearchPanelDiv>
    );
}

