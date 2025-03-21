import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { FONT_FAMILY } from '../../constants/styleConstants'

type TextButtonProps = {
    left: number,
    top: number,
    textAlign: string,
    width: number,
    height: number,
    borderRadius: number,
    textColor: string,
    backgroundColor: string,
    clickedTextColor: string,
    clickedBackgroundColor: string,
    fontSize: number,
    text: string
    onClickCallback: () => void,
    isDisabled: boolean
}
const TextButtonDiv = styled.div<TextButtonProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.textAlign};
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-radius: ${props => props.borderRadius}px;
    font-size: ${props => props.fontSize}px;
    font-family: ${FONT_FAMILY};
    font-weight: 400;
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;

    &:hover {
        cursor: pointer;
    }
`

const TextSpan = styled.span<TextButtonProps>`
    color: ${props => props.textColor};   
`

export function TextButton(props: TextButtonProps) {
    const [textColor, setTextColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    useEffect(() => {
        setTextColor(props.textColor);
        setBackgroundColor(props.backgroundColor);
    }, []);

    return (
        <TextButtonDiv{...props}
            style={{ backgroundColor:backgroundColor }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!props.isDisabled) {
                    props.onClickCallback();
                }
            }}
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!props.isDisabled) {
                    setTextColor(props.clickedTextColor);
                    setBackgroundColor(props.clickedBackgroundColor);
                }
            }}
            onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!props.isDisabled) {
                    setTextColor(props.textColor);
                    setBackgroundColor(props.backgroundColor);
                }
            }}
        >
            <span style={{ color:textColor, userSelect:'none' }}>{props.text}</span>
        </TextButtonDiv>
    );
}

