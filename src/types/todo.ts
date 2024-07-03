export interface BaseTodo {
    text: string;
    done: boolean;
    status: 'open' | 'inProgress' | 'closed';
    createdAt: Date;
    updatedAt: Date;
}

export interface Todo extends BaseTodo {
    _id: string;
    __v?: number;
}
