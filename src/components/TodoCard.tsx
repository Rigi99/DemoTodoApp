import React from 'react';
import {
    CardContainer,
    CardTitle,
    CardDescription,
    DoneButton,
    InProgressButton,
    DeleteButton,
} from './TodoCard.style';
import {Todo} from '../types/todo';

interface TodoCardProps {
    todo: Todo;
    onMarkAsDone: () => void;
    onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({todo, onMarkAsDone, onDelete}) => {
    return (
        <CardContainer done={todo.done}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <CardTitle>
                        {todo.text} - {new Date(todo.createdAt).toLocaleDateString()} {new Date(todo.createdAt).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit'
                    })}
                    </CardTitle>
                </div>
                <CardDescription>{todo.text}</CardDescription>
                {todo.status === 'open' && (
                    <InProgressButton onClick={onMarkAsDone}>In Progress</InProgressButton>
                )}
                {todo.status === 'inProgress' && (
                    <DoneButton onClick={onMarkAsDone}>Done</DoneButton>
                )}
                {todo.status === 'closed' && (
                    <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: 'black' }}>
                        Well done!
                    </div>
                )}
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            </div>
        </CardContainer>
    );
};

export default TodoCard;
