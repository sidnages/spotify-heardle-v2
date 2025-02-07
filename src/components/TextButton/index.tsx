import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { FONT_FAMILY } from '../../constants/styleConstants'

type TextButtonProps = {
    left: number,
    top: number,
    textAlign: string,
    width: number,
    height: number,
    textColor: string,
    backgroundColor: string,
    clickedTextColor: string,
    clickedBackgroundColor: string,
    fontSize: number,
    text: string
    onClickCallback: () => void,
    isDisabled: boolean
}
const Button = styled.button<TextButtonProps>`
    text-align: ${props => props.textAlign};
    vertical-align: center;
    position: relative;
    background-color: ${props => props.backgroundColor}
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-radius: 15px;
    font-size: ${props => props.fontSize}px;
    font-family: ${FONT_FAMILY};
    font-weight: 400;
    word-wrap: break-word;

    &:active {
        background-color: ${props => props.clickedBackgroundColor}
    }
`

const TextSpan = styled.span<TextButtonProps>`
    color: ${props => props.textColor};   
`

export function TextButton(props: TextButtonProps) {
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        setTextColor(props.textColor);
    }, []);

    return (
        <Button{...props} disabled={props.isDisabled}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                props.onClickCallback();
            }}
            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                setTextColor(props.clickedTextColor)
            }}
            onMouseUp={(e: React.MouseEvent<HTMLButtonElement>) => {
                setTextColor(props.textColor)
            }}
        >
            <span style={{ color: textColor }}>{props.text}</span>
        </Button>
    );
}

