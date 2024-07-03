import styled from 'styled-components';
import { Colors } from '../utils/colors';

export const CardContainer = styled.div<{ done: boolean }>`
    background-color: ${props => (props.done ? 'lightgreen' : Colors.LIGHT_GREY)};
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const CardTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: ${Colors.BLACK};
`;

export const CardDescription = styled.p`
    font-size: 16px;
    color: ${Colors.GREY};
`;

const baseButtonStyles = `
    color: ${Colors.WHITE};
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    box-sizing: border-box;
`;

export const DoneButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.GREEN};

    &:hover {
        background-color: ${Colors.DARK_GREEN};
    }
`;

export const InProgressButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.LIGHT_BLUE};

    &:hover {
        background-color: ${Colors.DARK_BLUE};
    }
`;

export const DeleteButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.RED};
    margin-top: 5px;

    &:hover {
        background-color: ${Colors.DARK_RED};
    }
`;
