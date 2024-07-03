import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 10px;
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

export const NewTodoInput = styled.input.attrs({ type: 'text' })`
    margin-right: 10px;
`;

export const AddTodoButton = styled.button``;

export const Separator = styled.div`
    width: 1px;
    background-color: #ccc;
    margin: 0 10px;
`;
