export interface BaseTodo {
    title: string;
    description: string;
    deadline: Date;
    status: 'open' | 'inProgress' | 'done';
}

export interface Todo extends BaseTodo {
    _id: string;
}
