import React, { useState, useEffect } from 'react';
import {Todo} from '../types/todo';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../services/todo.service';
import { Container, Column, List, Separator, AddButton } from './TodoList.style';
import TodoCard from './TodoCard';
import AddIcon from '@mui/icons-material/Add';

interface TodoListProps {
    userId: string;
}

const TodoList: React.FC<TodoListProps> = ({ userId }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<Todo | undefined>();
    const [addingTodo, setAddingTodo] = useState(false);
    const [newTodoIsEditing, setNewTodoIsEditing] = useState(false);

    useEffect(() => {
        fetchData().then(() => null);
    });

    const fetchData = async () => {
        const todosData = await fetchTodos(userId);
        console.log(todosData);
        setTodos(todosData);
    };

    const handleAddTodo = async () => {
        const addedTodo = await addTodo({
            title: '',
            description: '',
            status: 'open',
            deadline: '',
            assignedTo: userId
        });

        setNewTodo(addedTodo);
        setAddingTodo(true);
        setNewTodoIsEditing(true);
    };

    const handleUpdateTodo = async (id: string, updatedTodo: Todo) => {
        try {
            await updateTodo({
                ...updatedTodo,
                _id: id,
            });

            const todosData = await fetchTodos(userId);
            setTodos(todosData);
            setNewTodoIsEditing(false);
            setAddingTodo(false);
        } catch (error) {
            console.error("Error updating todo status:", error);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
    };

    const filterTodosByStatus = (status: string) => {
        return todos.filter(todo => todo.status === status);
    };

    return (
        <>
            <Container>
                <Column>
                    <h2 style={{ display: 'flex', alignItems: 'center' }}>
                        Open
                        <AddButton onClick={handleAddTodo}>
                            <AddIcon />
                        </AddButton>
                    </h2>
                    <List>
                        {addingTodo && newTodoIsEditing && (
                            <TodoCard
                                key="new"
                                todo={newTodo}
                                onUpdateStatus={() => {}}
                                onDelete={() => {}}
                                onEdit={handleUpdateTodo}
                                initialEditing={true}
                            />
                        )}
                        {filterTodosByStatus('open').map(todo => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onUpdateStatus={handleUpdateTodo}
                                onDelete={handleDeleteTodo}
                                onEdit={handleUpdateTodo}
                            />
                        ))}
                    </List>
                </Column>
                <Separator />
                <Column>
                    <h2>In Progress</h2>
                    <List>
                        {filterTodosByStatus('inProgress').map(todo => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onUpdateStatus={handleUpdateTodo}
                                onDelete={handleDeleteTodo}
                                onEdit={handleUpdateTodo}
                            />
                        ))}
                    </List>
                </Column>
                <Separator />
                <Column>
                    <h2>Done</h2>
                    <List>
                        {filterTodosByStatus('done').map(todo => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onUpdateStatus={handleUpdateTodo}
                                onDelete={handleDeleteTodo}
                                onEdit={handleUpdateTodo}
                            />
                        ))}
                    </List>
                </Column>
            </Container>
        </>
    );
};

export default TodoList;
