import { TodoInterface } from './models/todo/todo-interface'

export class Todo {
    todo: TodoInterface
    constructor(public todoValue: TodoInterface){
        this.todo = todoValue
        //Object.assign(this, todo)
    }
}

