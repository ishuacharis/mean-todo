import { Action } from "@ngrx/store";

export enum TodoActionTypes {
    Get = "Get"
}

export class ActionEx implements Action {
   readonly type
   payload: any
}

export class GetTodos implements ActionEx  {
    readonly type  =  TodoActionTypes.Get
    constructor(public payload: any) {

    }
}