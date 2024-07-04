export interface BaseTodo {
    title: string;
    description: string;
    deadline: string;
    status: 'open' | 'inProgress' | 'done';
    assignedTo: string;
}

export interface Todo extends BaseTodo {
    _id: string;
}
