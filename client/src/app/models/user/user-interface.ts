import { TodoInterface } from '../todo/todo-interface';

export interface UserInterface{
    username?: string;
    email?: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
    todos?: TodoInterface[];
}