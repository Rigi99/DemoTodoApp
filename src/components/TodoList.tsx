import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../services/todo.service';
import { Container, Column, List, Separator, NewTodoInput, AddTodoButton } from './TodoList.style';
import TodoCard from './TodoCard';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        fetchData().then(()=>null);
    }, []);

    const fetchData = async () => {
        const todosData = await fetchTodos();
        setTodos(todosData);
    };

    const handleAddTodo = async () => {
        if (newTodo.trim() === '') return;

        const addedTodo = await addTodo({
            title: newTodo,
            description: "smth",
            status: 'open',
            deadline: "",
        });

        setTodos([...todos, addedTodo]);
        setNewTodo('');
    };

    const handleUpdateTodo = async (id: string, updatedTodo: Todo) => {
        try {
            const responseTodo = await updateTodo({
                ...updatedTodo,
                _id: id,
            });

            const updatedTodos = todos.map(todo => (todo._id === id ? responseTodo : todo));
            setTodos(updatedTodos);
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
                    <h2>Open</h2>
                    <List>
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <NewTodoInput
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New Todo"
                />
                <AddTodoButton onClick={handleAddTodo}>Add</AddTodoButton>
            </div>
        </>
    );
};

export default TodoList;
