import { styled } from 'styled-components';
import { FONT_FAMILY } from '../../constants/styleConstants'

type TextProps = {
    left: number,
    top: number,
    width: number,
    height: number,
    borderRadius: number,
    color: string,
    fontSize: number,
    text: string,
    textAlign: string,
    verticalAlign: string,
    paddingLeft: number,
    backgroundColor?: string
}

const TextDiv = styled.div<TextProps>`
    color: ${props => props.color};   
    font-size: ${props => props.fontSize}px;
    font-family: ${FONT_FAMILY};
    font-weight: 400;
    word-wrap: break-word;
    justify-content: ${props => props.textAlign};
    display: flex;
    align-items: ${props => props.verticalAlign};
    padding-left: ${props => props.paddingLeft}px;
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-radius: ${props => props.borderRadius}px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;
`

export function Text(props: TextProps) {
    if (!props.backgroundColor) {
        return (
            <TextDiv {...props}>
                {props.text}
            </TextDiv>
        );
    } else {
        return (
            <TextDiv {...props} style={{ backgroundColor:props.backgroundColor }}>
                {props.text}
            </TextDiv>
        );
    }
}

