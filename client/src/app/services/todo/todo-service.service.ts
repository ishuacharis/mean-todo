import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse,} from '@angular/common/http'
import { BehaviorSubject, from } from 'rxjs';
import { Observable, pipe, of } from 'rxjs'
import {  map, } from 'rxjs/operators'


import { TodoInterface } from '../../models/todo/todo-interface'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  item: TodoInterface[] = [
    {
    "id": 1,
    "title": "Universal homogeneous ability",
    "desc": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    "tags": [
      "Life Insurance",
      "WC"
    ],
    "created_date": "2020-04-07 02:46:04",
    "updated_date": "2020-04-07 02:46:03",
    "is_completed": false
  },{
    "id": 2,
    "title": "Vision-oriented bandwidth-monitored adapter",
    "desc": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    "tags": [
      "Identity Theft",
      "VSEO",
      "Oil & amp; Gas Exploration"
    ],
    "created_date": "2020-04-07 02:49:04",
    "updated_date": "2020-04-07 02:49:05",
    "is_completed": true
  }
]
private lastTodoId: number
private todos  = new BehaviorSubject<TodoInterface[] | null>(null)
private id  = new BehaviorSubject<number| null>(null)
private myTodos = new BehaviorSubject<TodoInterface[] | null>(null)
private currentUser: any
  constructor(private http: HttpClient) { 
  }

  lastId(): Observable<number> {
    const todoData  =  localStorage.getItem('currentUser')
    if (todoData !== null) {
      if ( Object.keys(JSON.parse(todoData)).includes('todos') ) {
        const todos =  JSON.parse(todoData).todos
        if (todos.length > 0) {
          this.lastTodoId  = todos[0].todoId + 1
        }
        else{
          this.lastTodoId = 1
        }
      } else {
        this.lastTodoId = 1
      }
    } 
    this.id.next(this.lastTodoId)
    return this.id.asObservable()
  }

   getAllTodos(): Observable<TodoInterface[]>{
     const headerOptions = { 
       headers: new HttpHeaders({
      'Content-Type': 'application/json'
     })
    }

     return this.http.get<TodoInterface[]>('http://localhost:3000/todos', 
       {
         headers: headerOptions.headers,
         observe: 'response'
       }).pipe(map((res: HttpResponse<TodoInterface[]>) => res["body"]))
     
     // TODO delete below code
    return;
    const todoData =  localStorage.getItem('todoData')
    if (todoData !== null) { 
      this.item =   JSON.parse(localStorage.getItem('todoData'))
    } else{
      localStorage.setItem('todoData', JSON.stringify(this.item))
      this.item =  JSON.parse(localStorage.getItem('todoData'))
    }
    this.todos.next(this.item)
    return this.todos.asObservable()
    
  }
  getMyTodos(userId: string): Observable<TodoInterface[]> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.get<TodoInterface[]>('http://localhost:3000/user/'+userId,
      {
        headers: headerOptions.headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<TodoInterface[]>) => res["body"]))
      


    return;
    const myTodoData  = localStorage.getItem('currentUser')
    let myTodos = []
    if (myTodoData !== null) {
      if ( Object.keys(JSON.parse(myTodoData)).includes('todos') ) {
        myTodos = [...JSON.parse(myTodoData).todos]
      } 
    } 

    this.myTodos.next(myTodos)
    return this.myTodos.asObservable()
    
  }

  getSingleTodo(todoId: string): any{
   const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.get<TodoInterface[]>('http://localhost:3000/todos/' + todoId,
      {
        headers: headerOptions.headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<TodoInterface[]>) => res["body"]))
    return;
    //return this.todos.getValue().filter(todo => todo.id === id).pop()
  }

  addTodo(newTodo: TodoInterface, user: string): Observable<TodoInterface> {
    
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
    const {title,desc,tags} = newTodo
    const body = {
      title: title,
      desc: desc,
      tags: tags
    }

    
    return this.http.post<TodoInterface>('http://localhost:3000/todos/'+user, body,{
      headers: headerOptions.headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<TodoInterface>) => res["body"]))

    return;
    this.currentUser  = localStorage.getItem('currentUser')
    if (this.currentUser !== null) {
      if (Object.keys(JSON.parse(this.currentUser)).includes('todos')) {
        const newData = [newTodo, ...JSON.parse(this.currentUser).todos]
        this.currentUser = JSON.parse(this.currentUser)
        this.currentUser.todos =  newData
      } else{
        this.currentUser = JSON.parse(this.currentUser)
        this.currentUser.todos  = [newTodo]
      }  
    } 

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    this.currentUser = localStorage.getItem('currentUser')
    this.myTodos.next(this.currentUser.todos)
  }

  updateTodo(oldTodo: TodoInterface): Observable<TodoInterface> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
    const { _id ,title, desc, tags,created_date, is_completed } = oldTodo
    const id  = _id
    const body = {
      title: title,
      desc: desc,
      tags: tags,
      created_date: created_date,
      is_completed : is_completed
    }
    return this.http.put<TodoInterface>('http://localhost:3000/todos/' + id, body,{
      headers: headerOptions.headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<TodoInterface>) => res["body"]))


    return;
    this.currentUser = JSON.parse (localStorage.getItem('currentUser'))
    const todos  = this.currentUser.todos
    todos.filter(todo => {
      if (todo.id  === oldTodo.id){
        Object.assign(todo, oldTodo)
      }
    })
    this.currentUser.todos  = todos
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    
    this.todos.next(JSON.parse(localStorage.getItem('currentUser')))
  }

  
  deleteTodoById(id: string): Observable<TodoInterface> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }    
    return this.http.delete<TodoInterface>('http://localhost:3000/todos/'+id, {
      headers: headerOptions.headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<TodoInterface>) => res["body"]))

    return;
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let todos =  this.currentUser.todos
    const totalTodos  = todos.length
    if (totalTodos > 0) {
      todos = todos.filter(todo => todo.todoId !== id)
      this.currentUser.todos  = todos
    }

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    this.todos.next(JSON.parse(localStorage.getItem('currentUser')).todos)


  }

  
}
