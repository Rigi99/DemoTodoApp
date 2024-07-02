import React, {useState, useEffect} from 'react';
import {Todo} from '../types/todo';
import {fetchTodos, addTodo, updateTodo, deleteTodo} from '../services/todo.service';

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

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} className="card">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleUpdateTodo({ ...todo, done: !todo.done })}
                        />
                        <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New Todo"
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
        </div>
    );
};

export default TodoList;
