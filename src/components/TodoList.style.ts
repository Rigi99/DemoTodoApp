import styled from 'styled-components';
import {Colors} from "../utils/colors.ts";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px;
`;

export const Column = styled.div`
    flex: 1;
    margin: 0 10px;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
`;

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const Separator = styled.div`
    width: 5px;
    background-color: ${Colors.GREY};
    margin: 0 10px;
    border-radius: 10px;
`;

const baseButtonStyles = `
    color: ${Colors.WHITE};
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.25);
`;

export const AddButton = styled.button`
    ${baseButtonStyles};
    background-color: ${Colors.CYAN};
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;

    &:hover {
        background-color: ${Colors.DARK_CYAN};
    }
`;
