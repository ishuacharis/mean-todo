import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { switchMap,map } from "rxjs/operators";

import { TodoService } from 'src/app/services/todo/todo-service.service';
import { TodoInterface } from "../../models/todo/todo-interface";

@Component({
  selector: 'app-status',
  templateUrl: './todo-status.component.html',
  styleUrls: ['./todo-status.component.css']
})
export class TodoStatusComponent implements OnInit {
  todo: TodoInterface

  constructor(private route: ActivatedRoute, private todoService: TodoService) { 
    
    }


  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => this.todoService.getSingleTodo(params['todoId']))
    )
      .pipe(map((res) => res["todo"]))
      .subscribe((data) => {
        this.todo = data
        console.log(this.todo)
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Client-side error ${JSON.stringify(err)}`)
          }
          else {
            console.log(`Server-side error ${JSON.stringify(err)}`)
          }
        })
        
  }
}
   
