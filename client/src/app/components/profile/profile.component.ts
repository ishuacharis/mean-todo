import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { switchMap,map } from "rxjs/operators";


import { AuthService } from 'src/app/services/auth/auth-service.service';
import { TodoInterface } from 'src/app/models/todo/todo-interface';
import { UserInterface } from 'src/app/models/user/user-interface';
import { TodoService } from 'src/app/services/todo/todo-service.service';
import { AddTodoFormComponent } from '../add-todo-form/add-todo-form.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //@ViewChild(AddTodoFormComponent) child: AddTodoFormComponent;
  todos: TodoInterface[]
  isModalOpen: boolean
  user: string
  username: string
  isFetchingTodos: boolean = true
  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private route: ActivatedRoute
    ) { 
      /*this.route.params.pipe(
        switchMap((params: any) => this.todoService.getSingleTodo(params['user']))
      ).subscribe((value) => console.log(value))
      */
      
    }

    ngOnInit() {
      let user = localStorage.getItem("currentUser")
      if (user !== null || user !== undefined){
        const {id,username} = JSON.parse(user)
        this.user = id
        this.username = username
      }
      this.fetchMyTodos()
    }

  fetchMyTodos() {
    this.todoService.getMyTodos(this.user)
      .pipe(map((res) => res["todos"]))
      .subscribe(
        (data) => {
          this.todos = data
          console.log(data)
          this.isFetchingTodos = false
        },
        (err: HttpErrorResponse) => {
          this.isFetchingTodos = false
          if (err.error instanceof Error) {
            console.log(`Client-side error ${JSON.stringify(err)}`)
          } else {
            console.log(`Server-side error ${JSON.stringify(err)}`)
          }

        }
      )
  }

  openModal() {
    this.isModalOpen = true
  }
  onModalClosed(event: boolean) {
    this.isModalOpen = event
  }

  onTodoAdd(event){
    this.todoService.addTodo(event,this.user)
      .pipe(map((res) => res["todos"]))
      .subscribe(
        (data) => {
          this.fetchMyTodos()
          //this.todos = data
          console.log(data)
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Client-side error ${JSON.stringify(err)}`)
          } else {
            console.log(`Server-side error ${JSON.stringify(err)}`)
          }

        }
      )
    
  }

 
  onChecked(event: TodoInterface) {
    this.isFetchingTodos = true
    //event.updated_date = this.fullDate()
    this.todoService.updateTodo(event)
      .pipe(map((res) => res["todos"]))
      .subscribe(
        (data) => {
          setTimeout(() =>{
            this.fetchMyTodos()
            this.isFetchingTodos = false
          }, 5000) 
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Client-side error ${JSON.stringify(err)}`)
          } else {
            console.log(`Server-side error ${JSON.stringify(err)}`)
          }

        }
      )
  }

  onDeleted(event: string) {
    this.todoService.deleteTodoById(event)
      .pipe(map((res) => res["todos"]))
      .subscribe(
        (data) => {
          setTimeout(() => {
            this.fetchMyTodos()
            this.isFetchingTodos = false
          }, 5000) 
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Client-side error ${JSON.stringify(err)}`)
          } else {
            console.log(`Server-side error ${JSON.stringify(err)}`)
          }

        }
      )
  }


  onTagDeleted(event) {
    this.todoService.updateTodo(event)
    //this.fetchTodos()
    //console.log(event)
  }


  fullDate(): string {
    const date = new Date()
    const day = "0" + (date.getDay() + 1)
    const month = date.getMonth().toString().split("").length > 1 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    const year = date.getUTCFullYear()
    const time = date.toLocaleTimeString().split(" ")[0]
    const fullDate = year + "-" + month + "-" + day + " " + time
    return fullDate
  }


  








}
