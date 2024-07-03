import React, { useState } from 'react';
import {
    CardContainer,
    CardTitle,
    CardDescription,
    DoneButton,
    InProgressButton,
    DeleteButton,
    ButtonContainer,
    EditButton,
    TitleContainer,
    Input,
    TextArea,
    Select
} from './TodoCard.style';
import { Todo } from '../types/todo';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface TodoCardProps {
    todo: Todo;
    onUpdateStatus: (id: string, updatedTodo: Todo) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, updatedTodo: Todo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onUpdateStatus, onDelete, onEdit }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description);
    const [editedStatus, setEditedStatus] = useState<'open' | 'inProgress' | 'done'>(todo.status);
    const [editedDeadline, setEditedDeadline] = useState(new Date(todo.deadline).toISOString().slice(0, 16));

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleInProgress = () => {
        onUpdateStatus(todo._id, { ...todo, status: 'inProgress' });
    };

    const handleDone = () => {
        onUpdateStatus(todo._id, { ...todo, status: 'done' });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(todo._id, {
            ...todo,
            title: editedTitle,
            description: editedDescription,
            status: editedStatus,
            deadline: new Date(editedDeadline),
        });
        setIsEditing(false);
    };

    return (
        <CardContainer status={todo.status}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                    <TitleContainer>
                        {isEditing ? (
                            <Input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        ) : (
                            <CardTitle>{todo.title}</CardTitle>
                        )}
                        <EditButton onClick={isEditing ? handleSave : handleEdit}>
                            {isEditing ? <SaveIcon /> : <EditIcon />}
                        </EditButton>
                    </TitleContainer>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <div style={{ color: "black" }}>
                        <span style={{ fontWeight: 'bold' }}>Deadline: </span>
                        {isEditing ? (
                            <Input
                                type="datetime-local"
                                value={editedDeadline}
                                onChange={(e) => setEditedDeadline(e.target.value)}
                            />
                        ) : (
                            `${new Date(todo.deadline).toISOString().slice(0, 10)} ${new Date(todo.deadline).toISOString().slice(11, 16)}`
                        )}
                        {isEditing ? (
                            <>
                                <Select
                                    value={editedStatus}
                                    onChange={(e) => setEditedStatus(e.target.value as 'open' | 'inProgress' | 'done')}
                                >
                                    <option value="open">Open</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="done">Done</option>
                                </Select>
                                <TextArea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                            </>
                        ) : (
                            showDetails && todo.description && (
                                <CardDescription>{todo.description}</CardDescription>
                            )
                        )}
                        {!isEditing && (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={toggleDetails}
                            >
                                {showDetails ? 'Hide' : 'Details'}
                            </div>
                        )}
                    </div>
                </div>
                {!isEditing && (
                    <ButtonContainer>
                        {todo.status === 'open' && (
                            <InProgressButton onClick={handleInProgress}>
                                <PlayArrowIcon />
                            </InProgressButton>
                        )}
                        {todo.status === 'inProgress' && (
                            <DoneButton onClick={handleDone}>
                                <DoneIcon />
                            </DoneButton>
                        )}
                        <DeleteButton onClick={() => onDelete(todo._id)}>
                            <DeleteIcon />
                        </DeleteButton>
                    </ButtonContainer>
                )}
            </div>
        </CardContainer>
    );
};

export default TodoCard;
