import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todo.service';
import { Container, Column, List, Separator, NewTodoInput, AddTodoButton } from './TodoList.style';
import TodoCard from './TodoCard';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const todosData = await fetchTodos();
            setTodos(todosData);
        };
        fetchData().then(() => null);
    }, []);

    const handleAddTodo = async () => {
        if (newTodo.trim() === '') return;

        const addedTodo = await addTodo({
            text: newTodo,
            done: false,
            status: 'open',
        });

        setTodos([...todos, addedTodo]);
        setNewTodo('');
    };

    const handleUpdateTodo = async (updatedTodo: Todo) => {
        const updated = await updateTodo(updatedTodo);
        const updatedTodos = todos.map(todo => (todo._id === updated._id ? updated : todo));
        setTodos(updatedTodos);
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
                                onMarkAsDone={() => handleUpdateTodo({ ...todo, done: !todo.done })}
                                onDelete={() => handleDeleteTodo(todo._id)}
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
                                onMarkAsDone={() => handleUpdateTodo({ ...todo, done: !todo.done })}
                                onDelete={() => handleDeleteTodo(todo._id)}
                            />
                        ))}
                    </List>
                </Column>
                <Separator />
                <Column>
                    <h2>Closed</h2>
                    <List>
                        {filterTodosByStatus('done').map(todo => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onMarkAsDone={() => handleUpdateTodo({ ...todo, done: !todo.done })}
                                onDelete={() => handleDeleteTodo(todo._id)}
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
