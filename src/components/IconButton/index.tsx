import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';

type IconButtonProps = {
    left: number,
    top: number,
    radius: number,
    icon: IconType
    iconSize: number,
    iconColor: string
    backgroundColor: string,
    clickedIconColor: string
    clickedBackgroundColor: string,
    onClickCallback: () => void,
    isDisabled: boolean
}
const IconButtonDiv = styled.div<IconButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => 2 * props.radius}px;
    height: ${props => 2 * props.radius}px;
    border-radius: ${props => props.radius}px;
    border-width:0;

    &:hover {
        cursor: pointer;
    }
`

const TextSpan = styled.span<IconButtonProps>`
    color: ${props => props.iconColor};   
`

export function IconButton(props: IconButtonProps) {
    const [iconColor, setIconColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    useEffect(() => {
        setIconColor(props.iconColor);
        setBackgroundColor(props.backgroundColor);
    }, []);

    return (
        <IconButtonDiv{...props}
            style={{ backgroundColor:backgroundColor }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!props.isDisabled) {
                    props.onClickCallback();
                }
            }}
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!props.isDisabled) {
                    setIconColor(props.clickedIconColor);
                    setBackgroundColor(props.clickedBackgroundColor);
                }
            }}
            onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!props.isDisabled) {
                    setIconColor(props.iconColor);
                    setBackgroundColor(props.backgroundColor);
                }
            }}
        >
            <props.icon color={iconColor} size={props.iconSize} />
        </IconButtonDiv>
    );
}

