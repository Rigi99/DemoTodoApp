import styled from 'styled-components';
import { Colors } from '../utils/colors';

interface CardContainerProps {
    status: 'open' | 'inProgress' | 'done';
}

const getBackgroundColor = (status: 'open' | 'inProgress' | 'done'): string => {
    switch (status) {
        case 'open':
            return Colors.LIGHT_GREY;
        case 'inProgress':
            return Colors.BLUE;
        case 'done':
            return Colors.GREEN;
        default:
            return Colors.LIGHT_GREY;
    }
};

export const CardContainer = styled.div<CardContainerProps>`
    background-color: ${props => getBackgroundColor(props.status)};
    border-radius: 8px;
    padding: 10px;
    margin: 16px;
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.4);
    min-width: 300px;
    align-content: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
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

export const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const baseButtonStyles = `
    color: ${Colors.WHITE};
    border: none;
    cursor: pointer;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.25);
`;

export const DoneButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.GREEN};
    margin: 2px;

    &:hover {
        background-color: ${Colors.DARK_GREEN};
    }
`;

export const InProgressButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.BLUE};
    margin: 2px;

    &:hover {
        background-color: ${Colors.DARK_BLUE};
    }
`;

export const DeleteButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.RED};
    margin: 2px;

    &:hover {
        background-color: ${Colors.DARK_RED};
    }
`;

export const EditButton = styled.button`
    ${baseButtonStyles};
    width: 30px;
    height: 30px;
    background-color: ${Colors.ORANGE};
    margin: 2px;
    padding: 1px;

    &:hover {
        background-color: ${Colors.DARK_ORANGE};
    }
    
    svg{
        font-size: 18px;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Input = styled.input`
    display: flex;
    padding: 8px;
    margin: 8px;
    border: 1px solid ${Colors.GREY};
    border-radius: 4px;
`;

export const TextArea = styled.textarea`
    display: flex;
    padding: 8px;
    margin: 8px;
    border: 1px solid ${Colors.GREY};
    border-radius: 4px;
`;

export const Select = styled.select`
    display: flex;
    padding: 8px;
    margin: 8px;
    border: 1px solid ${Colors.GREY};
    border-radius: 4px;
`;
