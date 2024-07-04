export interface BaseTodo {
    title: string;
    description: string;
    deadline: string;
    status: 'open' | 'inProgress' | 'done';
}

export interface Todo extends BaseTodo {
    _id: string;
}
