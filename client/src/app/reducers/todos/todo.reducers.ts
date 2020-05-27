import { TodoInterface } from "../../models/todo/todo-interface";
import {ActionEx , TodoActionTypes} from '../../actions/todos/todo.actions'

export const todoInitialState = []
export const debug = true
export function GetTodoReducer(state: TodoInterface[] = todoInitialState, action: ActionEx) {
    switch(action.type){
        case TodoActionTypes.Get:
            if(debug) {
                console.log("debug turned on")
                
            }
            return [...state, ...action.payload]
        default:
            return state
    }
}

