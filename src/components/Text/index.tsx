import styled from 'styled-components';
import { FONT_FAMILY } from '../../constants/styleConstants'

export type TextProps = {
    left: number,
    top: number,
    color: string,
    fontSize: number,
    text: string
}

export const TextDiv = styled.div<TextProps>`
    color: ${props => props.color};   
    font-size: ${props => props.fontSize}px;
    font-family: ${FONT_FAMILY};
    font-weight: 400;
    word-wrap: break-word;
    text-align: left;
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`

export function Text(props: TextProps) {
    return (
        <TextDiv {...props}>
            {props.text}
        </TextDiv>
    );
}

