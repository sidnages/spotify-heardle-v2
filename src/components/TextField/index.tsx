import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { FONT_FAMILY } from '../../constants/styleConstants'

type TextFieldProps = {
    left: number,
    top: number,
    width: number,
    color: string,
    fontSize: number,
    defaultText: string,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    onChangeCallback: (_: string) => void,
    isDisabled: boolean
}

const TextInputDiv = styled.div<TextFieldProps>`
    text-align: left;
    vertical-align: top;
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
`

const TextInput = styled.input<TextFieldProps>`
    color: ${props => props.color};   
    font-size: ${props => props.fontSize}px;
    font-family: ${FONT_FAMILY};
    font-weight: 400;
    word-wrap: break-word;
    border-width: 0px;
    outline: none;
    width: ${props => props.width}px;
`

export function TextField(props: TextFieldProps) {
    useEffect(() => {
        props.setInputValue(props.defaultText);
    }, []);

    return (
        <TextInputDiv {...props}>
            <TextInput {...props} 
                type='text' 
                value={props.inputValue} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.value) {
                        props.setInputValue(props.defaultText);
                    } else if (e.target.value === props.defaultText.slice(0, -1)) {
                        props.setInputValue('');
                        props.onChangeCallback('');
                        return;
                    } else {
                        props.setInputValue(e.target.value);
                    }
                    props.onChangeCallback(e.target.value);
                }}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                    if (props.inputValue === props.defaultText) {
                        props.setInputValue('');
                    }
                }}
                disabled={props.isDisabled}
            />
        </TextInputDiv>
    );
}

