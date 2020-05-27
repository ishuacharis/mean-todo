import { TodoInterface } from "./models/todo/todo-interface";
import { UserInterface } from './models/user/user-interface';


export interface AppState {
    readonly todos: TodoInterface[]
}