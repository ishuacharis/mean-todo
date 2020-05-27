import { Component, OnInit,  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import {Store, select  } from "@ngrx/store";
import { map, }  from 'rxjs/operators'
import { Subscription, Observable } from 'rxjs'

import { Todo } from '../../todo'
import { TodoInterface } from '../../models/todo/todo-interface';
import { TodoService } from '../../services/todo/todo-service.service'


import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TodoSingleComponent } from '../todo-single/todo-single.component';
import { AddTodoFormComponent } from '../add-todo-form/add-todo-form.component';
import { UserInterface } from 'src/app/models/user/user-interface';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { GetTodos } from 'src/app/actions/todos/todo.actions';
import { AppState } from 'src/app/app.state';


@Component({
  selector: 'app-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.css']
})
export class TodoRootComponent implements OnInit {
  user: UserInterface
  username: string
  todos: Observable<TodoInterface[]>;
  singleTodo: TodoInterface;
  private first: string
  private subscription: Subscription
  
  constructor(private todoService: TodoService, 
    private authService: AuthService,
    private store: Store<AppState>
    ) {
    this.fetchTodos()
    this.todos = this.store.pipe(select((state) => state.todos))
  }
  
  ngOnInit() {
    this.authService.currentUser.subscribe((user) => this.username = user.username)
  }


  //functions to be called on initializtion

  fetchTodos() {
    this.todoService.getAllTodos()
      .pipe(map((res ) => res["todos"]))
      .subscribe(
        (data) => {
          this.store.dispatch(new GetTodos(data))
         //this.todos = data
          //console.log(data)
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.error(`Client-side error ${JSON.stringify(err)}`)
          } else {
            console.error(`Server-side error ${JSON.stringify(err)}`)
          }

        }
      )
  }

  onChecked(event: TodoInterface) {
    this.todoService.updateTodo(event)
    this.fetchTodos()
  }

  /*onDeleted(event: number) {
    this.todoService.deleteTodoById(event)
  }*/

  onTagDeleted(event){
    this.todoService.updateTodo(event)
    //this.fetchTodos()
    //console.log(event)
  }

  

}
