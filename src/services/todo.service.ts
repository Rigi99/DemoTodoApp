import axios from 'axios';
import { Todo, BaseTodo } from '../types/todo';
import {BACKEND_BASE_API_URL} from "../constants.ts";

export const fetchTodos = async (assignedTo: string): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(`${BACKEND_BASE_API_URL}/todos/${assignedTo}`);
    return response.data;
};

export const addTodo = async (newTodo: BaseTodo): Promise<Todo> => {
    const response = await axios.post<Todo>(`${BACKEND_BASE_API_URL}/todos`, newTodo);
    return response.data;
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
    const response = await axios.put<Todo>(`${BACKEND_BASE_API_URL}/todos/${updatedTodo._id}`, updatedTodo);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${BACKEND_BASE_API_URL}/todos/${id}`);
};
